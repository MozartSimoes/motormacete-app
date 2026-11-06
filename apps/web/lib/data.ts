import type { Category, Severity, Tip } from '@/lib/types'

function makeId(str: string) {
  let h = 5381
  for (let i = 0; i < str.length; i++) h = (h * 33) ^ str.charCodeAt(i)
  return 'mm_' + Math.abs(h).toString(36)
}

export type YearRange = { from?: number; to?: number }

export type TipSeed = {
  severity:  Severity
  title:     string
  body:      string
  yearRange?: YearRange
}

/** Parse year number from Parallelum yearCode e.g. "2021-4" → 2021, "32000-1" → current year */
export function parseModelYear(yearCode: string): number | null {
  if (!yearCode) return null
  const raw = parseInt(yearCode.split('-')[0], 10)
  if (isNaN(raw)) return null
  if (raw === 32000) return new Date().getFullYear() // Parallelum code for 0km
  if (raw < 1950 || raw > 2100) return null
  return raw
}

function passesYearFilter(seed: TipSeed, year: number | null): boolean {
  if (!seed.yearRange || year === null) return true
  const { from, to } = seed.yearRange
  if (from !== undefined && year < from) return false
  if (to !== undefined && year > to) return false
  return true
}

export const defaultTips: Record<Category, TipSeed[]> = {
  MACETES: [
    { severity: 'OK',   title: 'Partida a frio',        body: 'Evite acelerar o motor logo após a partida. Aguarde 30 segundos para o óleo circular e lubrificar as peças antes de engatar a marcha.' },
    { severity: 'OK',   title: 'Embreagem no trânsito', body: 'Não deixe o pé apoiado na embreagem enquanto espera no semáforo. O hábito desgasta o rolamento de pressão prematuramente.' },
    { severity: 'WARN', title: 'Freio motor',           body: 'Em descidas longas, use o freio motor para poupar as pastilhas e evitar o superaquecimento do sistema de freios.' },
    { severity: 'OK',   title: 'Pneus calibrados',      body: 'Pneus com 20% abaixo da pressão ideal aumentam o consumo em até 5% e reduzem a vida útil pela metade. Calibre semanalmente.' },
  ],
  PROBLEMAS: [
    { severity: 'DANGER', title: 'Desgaste de pastilhas',     body: 'A maioria dos veículos nacionais tem pastilhas originais de menor durabilidade. Verifique a cada 20.000 km sem falta.' },
    { severity: 'WARN',   title: 'Mangotes de borracha',      body: 'Mangotes do sistema de resfriamento têm vida útil de 5 anos. Trincas internas causam superaquecimento silencioso.' },
    { severity: 'OK',     title: 'Bateria em climas quentes', body: 'Baterias duram menos em cidades quentes. Faça um teste de carga anual para evitar surpresas na hora H.' },
  ],
  MANUTENCAO: [
    { severity: 'OK',   title: 'Óleo do motor',            body: 'Troca a cada 10.000 km ou 12 meses (o que ocorrer primeiro). Sempre use a viscosidade indicada no manual do veículo.' },
    { severity: 'OK',   title: 'Filtro de combustível',    body: 'Troque a cada 30.000 km. Em motores flex com uso majoritário de etanol, considere intervalos de 20.000 km.' },
    { severity: 'WARN', title: 'Correia/corrente dentada', body: 'Siga o intervalo do fabricante à risca. Ruptura de correia = motor destruído. Este é o item mais crítico de manutenção.' },
    { severity: 'OK',   title: 'Fluido de freio',          body: 'Troque o fluido a cada 2 anos. O DOT 3 e DOT 4 absorvem umidade com o tempo, reduzindo o ponto de ebulição.' },
  ],
}

export const modelTips: Record<string, Partial<Record<Category, TipSeed[]>>> = {

  // ── VOLKSWAGEN ────────────────────────────────────────────────────────────

  Gol: {
    MACETES: [
      { severity: 'OK',   title: 'Macete da bobina',    body: 'O Gol G6 tem falha conhecida nas bobinas de ignição. Ao sentir engasgos, teste cada bobina individualmente antes de trocar velas.' },
      { severity: 'OK',   title: 'Velas NGK Iridium',   body: 'O motor 1.0 MSI agradece velas NGK Iridium para melhor partida a frio e combustão. Troque a cada 30.000 km.' },
      { severity: 'WARN', title: 'Válvula EGR',         body: 'A válvula EGR entope com frequência no motor 1.6. Limpe a cada 40.000 km para evitar perda de potência e fumaça preta.' },
      { severity: 'OK',   title: 'Suspensão dianteira', body: 'Buchas do triângulo inferior se desgastam rápido em pavimento ruim. Inspecione ao sentir ruído na direção.' },
    ],
    PROBLEMAS: [
      // Motor EA111 — G5/G6 (2009-2014)
      { severity: 'DANGER', title: 'Consumo excessivo de óleo EA111',  yearRange: { from: 2009, to: 2014 },
        body: 'Problema crônico do motor EA111 (G5/G6): consumo de até 2L a cada 5.000 km por falha nos anéis do pistão. Monitoramento semanal obrigatório para evitar gripamento do motor.' },
      // Motor de partida — G6 (2012-2016)
      { severity: 'WARN',   title: 'Motor de partida — pinhão desgastado', yearRange: { from: 2012, to: 2016 },
        body: 'O pinhão de 9 dentes do motor de arranque do G6 desgasta precocemente, causando dificuldade na partida a quente. Troca pelo modelo de 11 dentes resolve definitivamente.' },
      // Bobina — G6/G7 MSI (2013+)
      { severity: 'DANGER', title: 'Bobina de ignição MSI falha prematura', yearRange: { from: 2013 },
        body: 'A bobina de ignição do motor 1.6 MSI (G6/G7) tem vida útil reduzida, causando engasgos e falhas de combustão. Troca preventiva a cada 60.000 km é recomendada.' },
      // Rolamento — todas as gerações
      { severity: 'WARN',   title: 'Rolamento de roda dianteiro precoce',
        body: 'Rolamentos dianteiros com alta taxa de falha antes dos 60.000 km, especialmente em vias com buracos. Sintoma: ronco que aumenta com a velocidade.' },
    ],
    MANUTENCAO: [],
  },

  Polo: {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Consumo de óleo no TSI',      yearRange: { from: 2018 },
        body: 'O motor 1.0 TSI (2018+) apresenta consumo de até 2L por 5.000 km por falha nos segmentos do pistão. Risco de gripamento sem monitoramento constante do nível de óleo.' },
      { severity: 'DANGER', title: 'Trinca no eixo traseiro MQB', yearRange: { from: 2018, to: 2022 },
        body: 'Defeito estrutural na plataforma MQB causa trincas espontâneas no eixo de torção traseiro sem impacto prévio, comprometendo a segurança em curvas. Consulte a VW para verificar se há recall para o seu chassi.' },
      { severity: 'WARN',   title: 'Bobina de ignição precoce',   yearRange: { from: 2018 },
        body: 'As bobinas do motor TSI tendem a falhar entre 80.000–120.000 km, gerando engasgos e falhas de aceleração, especialmente em veículos abastecidos principalmente com etanol.' },
      { severity: 'WARN',   title: 'Câmbio DCT com solavanco',    yearRange: { from: 2018 },
        body: 'O câmbio de dupla embreagem apresenta solavancos e hesitação em manobras lentas (engarrafamento, estacionamento). Atualização de software ameniza, mas não elimina completamente.' },
    ],
    MANUTENCAO: [],
  },

  Virtus: {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Trinca no eixo traseiro MQB',   yearRange: { from: 2017, to: 2022 },
        body: 'Defeito estrutural documentado na plataforma MQB provoca trincas espontâneas no eixo traseiro. Risco de perda de controle em curvas. Verifique se há recall aberto para o seu chassi.' },
      { severity: 'WARN',   title: 'Consumo de óleo TSI',           yearRange: { from: 2017 },
        body: 'Motor 1.0 TSI com consumo elevado acima de 60.000 km. Monitore a cada tanque cheio e exija análise em caso de consumo acima de 1L por 5.000 km.' },
      { severity: 'OK',     title: 'Ruído do canister na partida',  yearRange: { from: 2017 },
        body: 'A válvula de controle de vapores do canister emite barulho audível na partida e aceleração. Defeito de projeto confirmado pela VW, sem impacto na segurança.' },
    ],
    MANUTENCAO: [],
  },

  'T-Cross': {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Eixo traseiro — recall oficial', yearRange: { from: 2019, to: 2021 },
        body: 'Unidades de 2019–2021 foram convocadas por recall oficial (DENATRAN) por risco de trinca no eixo de torção traseiro. Consulte urgentemente a VW com seu número de chassi.' },
      { severity: 'WARN',   title: 'Ar-condicionado com falha',     yearRange: { from: 2019 },
        body: 'Falha frequente no compressor ou condensador do A/C entre 40.000–80.000 km. Custo de troca R$ 2.000–5.000 com alta taxa de reincidência.' },
      { severity: 'WARN',   title: 'Embaçamento interno dos faróis', yearRange: { from: 2019, to: 2023 },
        body: 'Condensação interna nos faróis compromete visibilidade noturna. Problema recorrente mesmo após substituição em garantia, afetando principalmente modelos 2019–2023.' },
      { severity: 'WARN',   title: 'Câmbio DCT solavanco',           yearRange: { from: 2019 },
        body: 'Câmbio de dupla embreagem com solavanco na saída de semáforos e manobras de baixa velocidade. Problema compartilhado com Polo e Virtus da plataforma MQB.' },
    ],
    MANUTENCAO: [],
  },

  Saveiro: {
    PROBLEMAS: [
      { severity: 'WARN', title: 'Transmissão com ruído e trepidação', yearRange: { from: 2021, to: 2023 },
        body: 'Modelos 2021–2023 apresentam barulho e trepidação na troca de marchas, com falhas precoces relatadas com menos de 40.000 km. Indica fraqueza no projeto da caixa de câmbio.' },
      { severity: 'WARN', title: 'Retentores de óleo motor 1.6 MSI',  yearRange: { from: 2012 },
        body: 'Os retentores de óleo e anéis do pistão do motor 1.6 MSI permitem migração de óleo para a câmara de combustão, gerando fumaça azulada a partir de 60.000 km.' },
      { severity: 'OK',   title: 'Direção eletro-hidráulica pesada',
        body: 'A direção fica consideravelmente mais pesada abaixo de 15°C. Normaliza após aquecimento, mas pode indicar desgaste do módulo em veículos com mais de 80.000 km.' },
    ],
    MANUTENCAO: [],
  },

  Amarok: {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Bomba de alta pressão CP4',           yearRange: { from: 2010 },
        body: 'A bomba Bosch CP4 do motor 2.0 TDI gera limalha metálica que contamina todo o sistema de injeção. Quando falha, exige troca dos bicos, bomba, trilhos e limpeza do tanque — custo R$ 20.000–50.000. Use somente diesel S10.' },
      { severity: 'DANGER', title: 'Contaminação por troca de filtro',    yearRange: { from: 2010 },
        body: 'A entrada de ar durante troca do filtro de combustível contamina o sistema common rail, exigindo substituição completa. Somente oficinas especializadas em diesel de alta pressão devem realizar esse serviço.' },
      { severity: 'WARN',   title: 'Velas de aquecimento prematuras',     yearRange: { from: 2010 },
        body: 'As velas de aquecimento falham prematuramente, causando dificuldade de partida a frio e fumaça branca excessiva. Troca preventiva a cada 80.000 km recomendada.' },
    ],
    MANUTENCAO: [],
  },

  Up: {
    PROBLEMAS: [
      { severity: 'WARN', title: 'Câmbio I-Motion solavanca',      yearRange: { from: 2014, to: 2022 },
        body: 'O câmbio automatizado I-Motion (ASG) é lento e solavanca em baixa velocidade. Problema de projeto sem solução definitiva — afeta todos os Up! com essa transmissão.' },
      { severity: 'WARN', title: 'Superaquecimento em trânsito com A/C', yearRange: { from: 2014 },
        body: 'O motor TSI de 3 cilindros tende ao superaquecimento em tráfego parado com A/C ligado. Verifique o arrefecimento regularmente e inspecione a tampa do radiador a cada 30.000 km.' },
      { severity: 'OK',   title: 'Ruído de corrente a frio',       yearRange: { from: 2014 },
        body: 'Ruído de corrente de distribuição nos primeiros segundos após a partida indica tensionador com folga. Inspecione a cada revisão para evitar desgaste acelerado.' },
    ],
    MANUTENCAO: [],
  },

  // ── FORD ─────────────────────────────────────────────────────────────────

  Ka: {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Correia dentada Dragon prematura',    yearRange: { from: 2015, to: 2021 },
        body: 'Motor 1.0 e 1.5 Dragon com ruptura de correia dentada documentada antes de 60.000 km. Dano catastrófico ao motor em caso de ruptura. Troca preventiva a cada 50.000 km é essencial.' },
      { severity: 'WARN',   title: 'Infiltração d\'água no porta-malas', yearRange: { from: 2014, to: 2021 },
        body: 'Vedação das lanternas traseiras resseca e permite entrada de água no porta-malas, causando mofo e mau cheiro. Problema recorrente mesmo após troca das vedações.' },
      { severity: 'WARN',   title: 'Câmbio PowerShift Ka Sedan',         yearRange: { from: 2016, to: 2021 },
        body: 'O câmbio automatizado PowerShift do Ka+ Sedan apresenta solavancos e trocas erráticas. Atualizações de software parcialmente eficazes; alta taxa de reincidência.' },
      { severity: 'OK',     title: 'Marcador de combustível impreciso',
        body: 'O sensor boia do tanque apresenta leitura oscilante. A reserva real começa antes do indicado no painel — atenção para não ficar a pé.' },
    ],
    MANUTENCAO: [],
  },

  EcoSport: {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Correia dentada 1.5 Dragon',          yearRange: { from: 2017, to: 2022 },
        body: 'Ruptura prematura da correia dentada no motor 1.5 Dragon — casos documentados com menos de 60.000 km e dano severo ao motor. Não confie no intervalo do manual: troque a cada 50.000 km.' },
      { severity: 'DANGER', title: 'Câmbio PowerShift superaquece',        yearRange: { from: 2015, to: 2022 },
        body: 'Câmbio PowerShift superaquece em uso urbano intenso, gerando vibração, ruídos e travamentos. Entrada de água nos atuadores por vedação deficiente afeta modelos 2015–2022.' },
      { severity: 'WARN',   title: 'Ventoinha — falha na 2ª velocidade', yearRange: { from: 2013 },
        body: 'A segunda velocidade da ventoinha do radiador não funciona em muitas unidades, mascarando superaquecimento lento. Diagnóstico exige teste específico na oficina.' },
      { severity: 'WARN',   title: 'Suspensão dianteira desgasta rápido', yearRange: { from: 2013 },
        body: 'Bandejas e buchas dianteiras com desgaste acelerado, gerando ruídos e instabilidade entre 50.000–80.000 km.' },
    ],
    MANUTENCAO: [],
  },

  Ranger: {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Injetores diesel travados',         yearRange: { from: 2012 },
        body: 'Os bicos injetores do motor 3.2 diesel travam na posição aberta, causando funcionamento irregular. Inspeção a cada 50.000 km e substituição preventiva a cada 100.000 km são recomendadas.' },
      { severity: 'WARN',   title: 'Câmbio automático com trepidação', yearRange: { from: 2012 },
        body: 'Trepidação suave que se intensifica até inviabilizar o uso — relatado entre 40.000–80.000 km. Alta taxa de reincidência mesmo após trocas em garantia.' },
      { severity: 'WARN',   title: 'Consumo de óleo sem vazamento',    yearRange: { from: 2012 },
        body: 'Consumo crônico de óleo no motor 3.2 diesel sem vazamento externo visível. Indica falha nos retentores internos da válvula de respiro. Monitore a cada 2.000 km.' },
    ],
    MANUTENCAO: [],
  },

  Territory: {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Falha na transmissão — defeito de projeto', yearRange: { from: 2020 },
        body: 'Problema crônico e documentado na caixa de câmbio: vibração intensa, ruídos e travamento completo relatados com menos de 40.000 km. Alta reincidência mesmo após trocas em garantia — indica defeito de projeto.' },
      { severity: 'DANGER', title: 'Perda repentina de potência',              yearRange: { from: 2020 },
        body: 'Quedas bruscas de potência com alertas de arrefecimento em rodovias. Envolve sensores eletrônicos, termostato e chicote elétrico — risco de pane em alta velocidade.' },
      { severity: 'WARN',   title: 'Suspensão com batidas desde 0 km',         yearRange: { from: 2020 },
        body: 'Ruídos e batidas na suspensão relatados desde veículos novos, persistindo mesmo após recall e substituição de peças.' },
    ],
    MANUTENCAO: [],
  },

  // ── CHEVROLET / GM ────────────────────────────────────────────────────────

  Onix: {
    MACETES: [
      { severity: 'OK',   title: 'Filtro de ar = resposta', body: 'O motor 1.0 turbo é sensível à qualidade do ar. Troque o filtro a cada 15.000 km para manter potência e consumo.' },
      { severity: 'OK',   title: 'Óleo 5W30 sintético',    body: 'Use sempre óleo sintético 5W30. O turbo exige lubrificação de alta qualidade, especialmente em arranques frequentes.' },
      { severity: 'WARN', title: 'Câmbio automático CVT',  body: 'Evite aceleração brusca do 0. O CVT responde melhor com aceleração progressiva — prolonga a vida útil das correias.' },
      { severity: 'OK',   title: 'Dreno do bujão',         body: 'Ao trocar o óleo, deixe drenar por pelo menos 10 minutos. O motor turbo retém mais resíduos que o aspirado.' },
    ],
    PROBLEMAS: [
      // Turbo Onix = geração 2020+
      { severity: 'DANGER', title: 'Vela de ignição falha prematura',    yearRange: { from: 2020 },
        body: 'Velas que falham antes dos 20.000 km no motor 1.0 turbo (geração 2020+), gerando tranco, consumo elevado e luz de injeção. A GM trocou em garantia várias vezes sem resolver a causa raiz em alguns lotes.' },
      { severity: 'DANGER', title: 'Coxim do motor desgasta cedo',       yearRange: { from: 2020 },
        body: 'Os coxins (calços) do motor 1.0 turbo se desgastam rapidamente em uso urbano intenso, gerando vibração no painel e volante entre 30.000–60.000 km.' },
      { severity: 'WARN',   title: 'Sensor MAP instável',                yearRange: { from: 2020 },
        body: 'O sensor MAP falha entre 60.000–80.000 km no motor turbo, causando marcha lenta instável e acendimento da luz de injeção.' },
      { severity: 'WARN',   title: 'Bomba d\'água com trinca',           yearRange: { from: 2020 },
        body: 'Relatos de trinca na bomba d\'água em motores turbo com mais de 80.000 km. Monitore a temperatura do motor e inspecione o arrefecimento a cada revisão.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 5W30 sintético',         body: 'Troca a cada 10.000 km obrigatoriamente. O turbo é crítico para a lubrificação — nunca estenda o prazo.' },
      { severity: 'OK',   title: 'Filtro de ar',                body: 'Troque a cada 15.000 km. Filtro sujo no turbo causa perda de potência visível e aumento de consumo.' },
      { severity: 'WARN', title: 'Fluido do câmbio automático', body: 'Troque o fluido CVT a cada 60.000 km. Muitos proprietários ignoram isso e pagam caro no câmbio.' },
      { severity: 'OK',   title: 'Velas de ignição',            body: 'Troca a cada 30.000 km com velas NGK ou Bosch. Velas ruins prejudicam especialmente o motor turbo.' },
    ],
  },

  Tracker: {
    MACETES: [
      { severity: 'OK',   title: 'Turbo 1.0 Ecotec',    body: 'O turbo 1.0 Ecotec tem bom rendimento, mas exige partidas suaves. Aguarde 1 minuto antes de desligar após uso em rodovias.' },
      { severity: 'WARN', title: 'Software de injeção', body: 'Mantenha o software de injeção atualizado na concessionária. Bugs no mapa de injeção causam consumo elevado.' },
      { severity: 'OK',   title: 'Pneu 215/60R16',      body: 'Os pneus originais 215/60R16 têm boa relação de compressão. Não suba para aro 18 sem recalibrar o barômetro TPMS.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Consumo de óleo 1.0 turbo Ecotec', yearRange: { from: 2020 },
        body: 'Problema herdado do Onix: consumo elevado de óleo no motor 1.0 turbo Ecotec acima de 50.000 km. Verifique mensalmente.' },
      { severity: 'WARN', title: 'CVT — solavanco na saída',         yearRange: { from: 2020 },
        body: 'O câmbio CVT apresenta solavanco perceptível na saída do repouso, especialmente com A/C ligado. Múltiplas atualizações de software com melhora parcial.' },
      { severity: 'OK',   title: 'Multimídia trava e reinicia',      yearRange: { from: 2020 },
        body: 'A central multimídia trava espontaneamente ao conectar celulares via Bluetooth ou CarPlay. Atualização de firmware resolve parcialmente.' },
    ],
    MANUTENCAO: [],
  },

  S10: {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Código P0087 — pressão de combustível', yearRange: { from: 2012 },
        body: 'Problema crônico no motor 2.8 Duramax: código P0087 (baixa pressão de combustível) com diesel de qualidade variável. Impacta o desempenho e pode danificar a bomba de alta pressão.' },
      { severity: 'WARN',   title: 'Câmbio automático deficiente 2018–2020', yearRange: { from: 2018, to: 2020 },
        body: 'Câmbio automático com patinagem, barulhos, trepidação e trocas irregulares. Defeito crônico documentado nesse período — trocas em garantia com alta taxa de reincidência.' },
      { severity: 'OK',     title: 'Descascamento de pintura precoce',       yearRange: { from: 2012, to: 2015 },
        body: 'Descascamento da pintura no capô e teto em modelos 2012–2015. Defeito de aderência documentado — exija cobertura dentro do prazo de garantia.' },
    ],
    MANUTENCAO: [],
  },

  Cruze: {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Seguidor de válvula quebra no cabeçote', yearRange: { from: 2017, to: 2019 },
        body: 'O seguidor de válvula que aciona a bomba de alta pressão quebra e cai dentro do motor (Cruze 1.4 turbo 2017–2019), causando dano interno severo. Exige troca do motor ou reforma completa do cabeçote.' },
      { severity: 'DANGER', title: 'Sistema de injeção com engasgo',         yearRange: { from: 2017, to: 2019 },
        body: 'Motor 1.4 turbo com engasgos e trepidação parado em marcha D, com necessidade de troca dos bicos injetores ainda na garantia. Alta taxa de reincidência após a primeira troca.' },
      { severity: 'WARN',   title: 'Turbo com desgaste prematuro',           yearRange: { from: 2012 },
        body: 'Rotor do turbo com folga excessiva e desgaste no vedador entre 80.000–120.000 km. Fumaça azulada e perda de potência são os sintomas. Custo de troca: R$ 3.000–6.000.' },
    ],
    MANUTENCAO: [],
  },

  Spin: {
    PROBLEMAS: [
      { severity: 'WARN', title: 'Trepidação em marcha D sem código', yearRange: { from: 2013 },
        body: 'Veículo trepida com câmbio em D parado, sem acionar a luz de injeção nem gerar código de falha. Dificulta muito o diagnóstico e a cobertura em garantia.' },
      { severity: 'WARN', title: 'Câmbio automático com trocas erráticas', yearRange: { from: 2013 },
        body: 'Trocas de marcha instáveis e solavancos em uso urbano. Problema de projeto relatado com frequência em toda a vida útil do modelo.' },
      { severity: 'OK',   title: 'Multimídia trava em dias quentes',        yearRange: { from: 2016 },
        body: 'A central multimídia de 7" trava e fica lenta em altas temperaturas. A GM lançou atualizações de firmware com melhora parcial.' },
    ],
    MANUTENCAO: [],
  },

  Montana: {
    PROBLEMAS: [
      { severity: 'WARN', title: 'CVT com desgaste em uso intenso', yearRange: { from: 2022 },
        body: 'A Montana 2022+ com CVT tem relatos de ruído e solavanco similares ao Onix. Fluido CVT deve ser trocado a cada 60.000 km sem exceção.' },
      { severity: 'WARN', title: 'Vela de ignição turbo 1.2',       yearRange: { from: 2022 },
        body: 'Velas do motor 1.2 turbo com vida útil reduzida no uso brasileiro com etanol. Falhas antes dos 20.000 km — problema herdado da família Ecotec.' },
      { severity: 'OK',   title: 'Ajuste das portas traseiras',      yearRange: { from: 2022 },
        body: 'Folga e barulho nas portas traseiras em modelos novos — problema de ajuste de fábrica. A concessionária pode corrigir o alinhamento no pós-venda.' },
    ],
    MANUTENCAO: [],
  },

  Prisma: {
    PROBLEMAS: [
      { severity: 'WARN', title: 'Válvula canister com falha crônica', yearRange: { from: 2013, to: 2020 },
        body: 'A válvula de purga do canister falha com frequência no Prisma 1.0 e 1.4, gerando luz de injeção e tranco ao acelerar. Problema documentado acima de 50.000 km.' },
      { severity: 'WARN', title: 'Sensor de temperatura instável',     yearRange: { from: 2013, to: 2020 },
        body: 'Falha no sensor de temperatura com leituras erráticas no painel e interferência no mapa de injeção. Troca simples, mas reincidente.' },
      { severity: 'OK',   title: 'Buchas da suspensão desgastam rápido', yearRange: { from: 2013, to: 2020 },
        body: 'Buchas do braço inferior desgastam em uso urbano, gerando barulho na dianteira. Inspecione a cada 40.000 km ou ao sentir ruído em lombadas.' },
    ],
    MANUTENCAO: [],
  },

  // ── CITROËN ───────────────────────────────────────────────────────────────

  C3: {
    MACETES: [
      { severity: 'OK',   title: 'Motor 1.4/1.6 — revisão preventiva', body: 'O motor Fire/TU5 do C3 agradece trocas de óleo religiosas a cada 10.000 km. Use óleo 10W30 semissintético no mínimo para evitar depósitos de carbono prematuro.' },
      { severity: 'WARN', title: 'Válvula EGR — limpeza periódica',   body: 'A válvula EGR do C3 entope com frequência em uso urbano. Limpeza a cada 40.000 km evita perda de potência, consumo elevado e marcha lenta irregular.' },
      { severity: 'OK',   title: 'Câmbio automático — modo manual',  body: 'Se equipado com câmbio automático, use frequentemente o modo manual em tráfego pesado. Isto reduz o calor e prolonga a vida das embreagens internas.' },
      { severity: 'WARN', title: 'Vidro elétrico — movimentos lentos', body: 'Movimentos lentos dos vidros elétricos indicam motor do vidro desgastado. Lubrifique os trilhos com graxa de silicone a cada revisão.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Consumo excessivo de óleo — motor Fire', yearRange: { from: 2003, to: 2012 },
        body: 'Motor 1.0/1.4 Fire com consumo crônico de óleo — até 2L a cada 5.000 km documentado. Causa: anéis do pistão e retentores desgastados prematuramente. Monitoramento semanal obrigatório para evitar gripamento do motor.' },
      { severity: 'WARN',   title: 'Câmbio automático solavancando',   yearRange: { from: 2010, to: 2020 },
        body: 'Câmbio automático (versões equipadas) apresenta solavancos e hesitação nas trocas, especialmente em baixa velocidade. Fluido degradado é a causa mais comum — troque a cada 40.000 km.' },
      { severity: 'WARN',   title: 'Válvula EGR entope com frequência', yearRange: { from: 2003, to: 2020 },
        body: 'Problema crônico no C3: válvula EGR entope causando marcha lenta irregular, consumo elevado e luz de injeção acesa. Limpeza a cada 40.000 km é necessária para manter a eficiência.' },
      { severity: 'WARN',   title: 'Vidros elétricos travando',        yearRange: { from: 2010, to: 2020 },
        body: 'Vidros elétricos travam e deixam de funcionar, especialmente depois de dias chuvosos. Problema de vedação dos interruptores da porta — aplicar vaselina nos contatos ameniza temporariamente.' },
      { severity: 'OK',     title: 'Infiltração de água no porta-malas', yearRange: { from: 2003, to: 2015 },
        body: 'Vedação ineficaz do porta-malas permite entrada de umidade após chuvas. Hidrate as borrachas de vedação regularmente com silicone.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo do motor',           body: 'Troque a cada 10.000 km com óleo 10W30 semissintético no mínimo. Motor Fire desgasta rápido com óleo de qualidade inferior.' },
      { severity: 'WARN', title: 'Válvula EGR — limpeza',  body: 'Limpeza a cada 40.000 km é recomendada, não apenas troca. A remoção de carbono prolonga a vida útil do componente.' },
      { severity: 'OK',   title: 'Filtro de combustível',  body: 'Troque a cada 20.000 km em uso com etanol. Troca negligenciada causa engasgos e marcha lenta.' },
    ],
  },

  'C4 Cactus': {
    MACETES: [
      { severity: 'WARN', title: 'Freio motor em descidas',        body: 'Descidas longas exigem freio motor acionado pela alavanca de câmbio. O sistema de freios do C4 Cactus não é dos melhores — preserve as pastilhas.' },
      { severity: 'OK',   title: 'Suspensão — amortecimento firme', body: 'A suspensão é intencionalmente firme para conforto em estradas esburacadas. É normal sentir mais impactos que em sedãs — não é sinal de falha.' },
      { severity: 'WARN', title: 'Pressão do óleo — monitorar',     body: 'Monitore regularmente a pressão do óleo no computador de bordo. Valores abaixo de 2,5 bar em marcha lenta indicam desgaste do motor.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Motor 1.6 — hesitação e perda de potência', yearRange: { from: 2016, to: 2023 },
        body: 'Motor 1.6 16V VTi com hesitação crônica ao acelerar, especialmente com etanol. Envolve sistema de injeção entupido por depósitos de carbono. Reprogramação da ECU pela concessionária ameniza, mas não resolve completamente.' },
      { severity: 'WARN',   title: 'Câmbio automático solavancando',           yearRange: { from: 2016, to: 2023 },
        body: 'Câmbio automático (versões equipadas) com solavancos e trocas irregulares. Fluido que não foi trocado regularmente é a causa mais comum — leve para diagnóstico em scanner Citroën.' },
      { severity: 'WARN',   title: 'Suspensão com barulhos prematuros',        yearRange: { from: 2016, to: 2023 },
        body: 'Barulhos e batidas na suspensão dianteira com menos de 50.000 km. Buchas e amortecedores se desgastam rapidamente em pavimento urbano brasileiro.' },
      { severity: 'OK',     title: 'Acúmulo de carbono — injeção direta',      yearRange: { from: 2016, to: 2023 },
        body: 'Motor 1.6 com injeção direta acumula carbono nas válvulas de admissão. Limpeza por "walnut blasting" recomendada a cada 60.000 km para manter a eficiência.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN', title: 'Óleo do motor — viscosidade correta', body: 'Use 5W30 ou 5W40 conforme recomendado no manual. Motor 1.6 VTi é sensível a óleos fora da especificação.' },
      { severity: 'OK',   title: 'Fluido do câmbio automático',       body: 'Troque a cada 40.000 km. Muitos proprietários ignoram e pagam caro quando o câmbio falha prematuramente.' },
    ],
  },

  Aircross: {
    MACETES: [
      { severity: 'WARN', title: 'Consumo elevado de óleo — esperado', body: 'O Aircross 1.6 tem consumo de óleo elevado — até 1L a cada 3.000 km é considerado "dentro do normal" pela Citroën. Monitore semanalmente para não deixar o óleo abaixo do mínimo.' },
      { severity: 'OK',   title: 'Filtro de ar — manutenção frequente', body: 'Ar urbano entope o filtro rapidamente. Troque ou limpe a cada 15.000 km para manter a potência do motor.' },
      { severity: 'WARN', title: 'Pneus importados — calibração crítica', body: 'Os pneus originais Michelin do Aircross são importados e sensíveis a desequilíbrio. Calibre conforme especificado (nunca use pressão padrão de pneu genérico).' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Consumo de óleo crônico — motor 1.6',     yearRange: { from: 2010, to: 2023 },
        body: 'Consumo excessivo de óleo no motor 1.6 — até 1L a cada 3.000 km documentado. Falha dos anéis do pistão e retentores deficientes. Acompanhamento constante obrigatório para evitar travamento do motor.' },
      { severity: 'WARN',   title: 'Câmbio automático com falhas',            yearRange: { from: 2010, to: 2023 },
        body: 'Câmbio automático com solavancos, hesitação e barulhos. Problema intensificado em climas quentes e tráfego intenso por falta de resfriamento adequado.' },
      { severity: 'WARN',   title: 'Suspensão dianteira — desgaste precoce', yearRange: { from: 2010, to: 2023 },
        body: 'Amortecedores e buchas da suspensão dianteira desgastam antes de 60.000 km, gerando ruído e instabilidade em curvas. Uso de peças de qualidade superior (Sachs, Monroe) melhora a durabilidade.' },
      { severity: 'OK',     title: 'Direção hidráulica — barulho',           yearRange: { from: 2010, to: 2023 },
        body: 'Barulho da bomba de direção hidráulica em manobras — aumenta com o tempo. Não afeta a segurança, mas indica desgaste próximo da bomba.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN', title: 'Óleo do motor — monitoramento semanal', body: 'Motor 1.6 consome óleo rapidamente. Verifique o nível a cada 2 abastecimentos e nunca deixe abaixo do mínimo.' },
      { severity: 'OK',   title: 'Filtro de combustível',                body: 'Troque a cada 30.000 km ou mais frequentemente em uso com etanol. Filtro entupido causa hesitação e partida lenta.' },
    ],
  },

  'C4 Picasso': {
    PROBLEMAS: [
      { severity: 'WARN', title: 'Motor 2.0 — marcha lenta irregular', yearRange: { from: 2007, to: 2018 },
        body: 'Motor 2.0 16V com marcha lenta instável e consumo elevado por falha da válvula EGR. Problema compartilhado com gerações antigas de diversos veículos Citroën.' },
      { severity: 'WARN', title: 'Câmbio automático — trocas com trepidação', yearRange: { from: 2007, to: 2018 },
        body: 'Câmbio automático com trocas rígidas e trepidação, especialmente de 1ª para 2ª marcha. Fluido degradado é a causa mais provável — troque regularmente.' },
      { severity: 'WARN', title: 'Porta traseira — falha no trinco',          yearRange: { from: 2007, to: 2018 },
        body: 'Trinco elétrico da porta traseira falha, impedindo abertura com o botão. Pode ser ativado manualmente, mas indica desgaste do motor do trinco.' },
    ],
    MANUTENCAO: [],
  },

  Berlingo: {
    MACETES: [
      { severity: 'WARN', title: 'Carga útil — não ultrapasse limites', body: 'Berlingo tem capacidade de carga generosa, mas cargas desequilibradas danificam a suspensão rapidamente. Distribua o peso uniformemente.' },
      { severity: 'OK',   title: 'Revisão do sistema de freios',       body: 'Por ser usado frequentemente como veículo de trabalho, o desgaste dos freios é acelerado. Verifique as pastilhas a cada 30.000 km em uso intenso.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Embreagem com desgaste prematuro',  yearRange: { from: 2008, to: 2020 },
        body: 'Embreagem desgasta rapidamente em uso com carga, especialmente em cidades montanhosas. Troca necessária entre 80.000–120.000 km de forma recorrente em uso laboral intenso.' },
      { severity: 'WARN', title: 'Suspensão — deformação por sobrecarga', yearRange: { from: 2008, to: 2020 },
        body: 'Suspensão deforma precocemente quando submetida a cargas frequentes acima do limite recomendado. Verificar alinhamento e balanceamento a cada 20.000 km em uso com carga.' },
      { severity: 'OK',   title: 'Correias e correntes — desgaste acelerado',  yearRange: { from: 2008, to: 2020 },
        body: 'Correias de transmissão desgastam mais rápido que em uso doméstico. Inspeção visual a cada revisão é recomendada.' },
    ],
    MANUTENCAO: [],
  },

  Xsara: {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Corrosão estrutural — oxidação precoce', yearRange: { from: 1997, to: 2005 },
        body: 'Problema crônico do Xsara de primeira geração: corrosão severa do chassis e painéis laterais aparecendo com apenas 5–7 anos. Pintura com aderência deficiente em Brasil. Proteção anticorrosiva anual é essencial.' },
      { severity: 'WARN',   title: 'Sistema elétrico frágil',               yearRange: { from: 1997, to: 2005 },
        body: 'Fiação com isolamento frágil, conectores oxidados e chicotes quebrando facilmente. Problemas recorrentes de faróis, vidros e cintos de segurança erráteis com umidade.' },
      { severity: 'WARN',   title: 'Câmbio manual duro em dias frios',      yearRange: { from: 1997, to: 2005 },
        body: 'Dificuldade para engrenar marchas nos primeiros minutos após partida em temperatura baixa. Viscosidade do fluido da caixa é alta — normal do veículo, diminui após aquecimento.' },
    ],
    MANUTENCAO: [],
  },

  // ── FIAT ─────────────────────────────────────────────────────────────────

  Argo: {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Direção elétrica — falha crônica', yearRange: { from: 2017 },
        body: 'A caixa de direção elétrica falha e exige troca completa (~R$ 2.800), com reincidência em até 18 meses. Defeito confirmado pela Fiat, mas cobertura pós-garantia é frequentemente contestada na justiça.' },
      { severity: 'WARN',   title: 'Ruído metálico motor Firefly',    yearRange: { from: 2017, to: 2023 },
        body: 'O motor 1.0 e 1.3 Firefly emite ruído metálico em baixa rotação durante aceleração leve, especialmente com etanol (pré-2023). A Fiat nunca apresentou solução definitiva.' },
      { severity: 'WARN',   title: 'Vazamento de óleo Firefly',       yearRange: { from: 2017 },
        body: 'Vazamento de óleo pela válvula anti-chama e pelo respiro do motor Firefly. Problema recorrente especialmente após 60.000 km.' },
      { severity: 'OK',     title: 'Central multimídia travando',     yearRange: { from: 2017 },
        body: 'A central multimídia congela e tem toques fantasma na tela. Atualizações parcialmente eficazes — não afeta segurança, mas compromete a experiência de uso.' },
    ],
    MANUTENCAO: [],
  },

  Cronos: {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Cinto traseiro — recall 2023',         yearRange: { from: 2022, to: 2023 },
        body: 'Recall oficial Fiat 2023: falha no mecanismo de retração do cinto traseiro que pode não travar numa freada brusca. Consulte imediatamente a Fiat com seu chassi.' },
      { severity: 'WARN',   title: 'Câmbio com ruído a 90–100 km/h',      yearRange: { from: 2018 },
        body: 'Ruídos e trepidação entre 90–100 km/h em câmbios manuais e automáticos. Problema de projeto relatado a partir de 50.000 km, sem geração de códigos de falha.' },
      { severity: 'WARN',   title: 'Vazamento de óleo motor GSE',          yearRange: { from: 2018 },
        body: 'Motor 1.3 GSE com vazamento de óleo pela válvula de respiro e anti-chama — falha compartilhada com Argo e Strada. Monitore o nível mensalmente.' },
    ],
    MANUTENCAO: [],
  },

  Strada: {
    PROBLEMAS: [
      { severity: 'WARN', title: 'Dificuldade de partida a frio',      yearRange: { from: 2023 },
        body: 'Motor 1.3 GSE demora para dar a primeira partida do dia (abaixo de 20°C), exigindo 3–5 tentativas. Relatado em veículos novos desde 2023 — indica falha no sistema de partida ou calibração do injetor.' },
      { severity: 'WARN', title: 'Vazamento de óleo Firefly/GSE',      yearRange: { from: 2018 },
        body: 'Vazamento de óleo pelo respiro é herança de toda a linha Fiat com motores Firefly e GSE. Monitore a cada abastecimento.' },
      { severity: 'OK',   title: 'Crepitação no câmbio manual no frio', yearRange: { from: 2018 },
        body: 'Dificuldade de engate de marchas nos primeiros 5 minutos após a partida a frio. Diminui após aquecimento — indica viscosidade do fluido da caixa.' },
    ],
    MANUTENCAO: [],
  },

  Toro: {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Check Engine crônico no diesel',     yearRange: { from: 2016 },
        body: 'Luz de injeção e falhas eletrônicas crônicas no motor 2.0 diesel com reincidência a cada 5 dias mesmo após reparos em garantia. Problema de design no gerenciamento eletrônico, amplamente relatado no Reclame AQUI.' },
      { severity: 'WARN',   title: 'Filtro de partículas DPF entupido', yearRange: { from: 2016 },
        body: 'DPF entope em uso majoritariamente urbano, gerando perda severa de potência. A regeneração exige percursos de rodovia em rotação elevada — proprietários em cidades grandes relatam ciclos repetitivos de entupimento.' },
      { severity: 'WARN',   title: 'Consumo de óleo sem vazamento',     yearRange: { from: 2016 },
        body: 'Consumo de óleo significativo no motor diesel sem vazamento externo identificável. Relatado logo após revisões — indica falha nos vedadores internos do motor 2.0.' },
      { severity: 'OK',     title: 'Falso alerta de ARLA baixo',        yearRange: { from: 2016 },
        body: 'O sensor de nível de ARLA 32 acusa nível baixo com o reservatório quase cheio. Problema de sensor documentado que gera alertas desnecessários no painel.' },
    ],
    MANUTENCAO: [],
  },

  Pulse: {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Bomba de combustível — recall',    yearRange: { from: 2021 },
        body: 'A bomba de alta pressão do motor 1.0 turbo (T200) falha e destrói velas, podendo desligar o veículo em movimento. A Fiat emitiu recall — verifique se seu chassi está incluído imediatamente.' },
      { severity: 'WARN',   title: 'CVT trava na posição P',           yearRange: { from: 2021 },
        body: 'O câmbio CVT trava na posição P com o motor ligado, impedindo a retirada da chave. Defeito de projeto documentado — a alavanca fica presa e o motorista não consegue encerrar o veículo normalmente.' },
      { severity: 'WARN',   title: 'Bomba de óleo Bosch prematura',    yearRange: { from: 2021 },
        body: 'A bomba de óleo de fabricação Bosch pode exigir substituição prematura. Inspecione nível e pressão de óleo a cada revisão.' },
    ],
    MANUTENCAO: [],
  },

  Mobi: {
    PROBLEMAS: [
      { severity: 'WARN', title: 'Ruído metálico motor 1.0 Firefly', yearRange: { from: 2017 },
        body: 'O motor 1.0 Firefly emite batida metálica leve em baixa rotação — problema comum à família Firefly. Persiste mesmo após ajustes de válvulas.' },
      { severity: 'OK',   title: 'Vidro elétrico falha após chuva',  yearRange: { from: 2017 },
        body: 'Os vidros elétricos param de funcionar após exposição à chuva por falha no interruptor da porta do motorista. Problema de vedação que afeta todas as gerações.' },
      { severity: 'WARN', title: 'Ar-condicionado perde gás cedo',   yearRange: { from: 2017 },
        body: 'As vedações do A/C perdem gás refrigerante antes de 50.000 km. Recarga e verificação das conexões devem ser feitas anualmente em climas quentes.' },
    ],
    MANUTENCAO: [],
  },

  Uno: {
    PROBLEMAS: [
      { severity: 'WARN', title: 'Correia do alternador parte precocemente', yearRange: { from: 2010 },
        body: 'A correia do alternador/acessórios do motor 1.0 e 1.4 Fire se desgasta e parte antes do prazo, deixando o carro sem carga. Inspecione a cada 30.000 km.' },
      { severity: 'OK',   title: 'Infiltração no porta-malas',              yearRange: { from: 2010 },
        body: 'Vedação deficiente nas versões hatch permite entrada de umidade no porta-malas. Hidrate a borracha com vaselina e inspecione após chuvas fortes.' },
      { severity: 'WARN', title: 'Buchas da bandeja inferior desgastam',    yearRange: { from: 2010 },
        body: 'Buchas da bandeja inferior desgastam rapidamente em pavimento urbano, gerando estalos. Reincidência rápida se não usar peças de boa procedência.' },
    ],
    MANUTENCAO: [],
  },

  Palio: {
    PROBLEMAS: [
      { severity: 'WARN', title: 'Câmbio manual com ruído e patinagem', yearRange: { from: 2012, to: 2018 },
        body: 'A caixa de câmbio do Palio 1.0 e 1.4 emite ruído em ponto morto e patina com mais de 80.000 km. Rolamento do eixo de entrada desgastado é a causa mais comum.' },
      { severity: 'OK',   title: 'Borracha do para-brisa ressecando',  yearRange: { from: 2012, to: 2018 },
        body: 'Vedação do para-brisa resseca prematuramente em climas quentes, causando whistling em velocidade. Aplique hidratante de borracha anualmente.' },
      { severity: 'WARN', title: 'Sistema elétrico com fusíveis',      yearRange: { from: 2012, to: 2018 },
        body: 'Fusíveis que queimam repetidamente e janelas com comportamento errático são relatos frequentes acima de 100.000 km. Inspecione o chicote por oxidação.' },
    ],
    MANUTENCAO: [],
  },

  // ── HONDA ─────────────────────────────────────────────────────────────────

  Civic: {
    PROBLEMAS: [
      // 10th gen 1.5T (2017-2021)
      { severity: 'DANGER', title: 'Bomba de combustível — recall Honda', yearRange: { from: 2017, to: 2021 },
        body: 'A Honda emitiu recall (2024) para o Civic Touring 1.5 turbo 10ª geração: rotor da bomba racha, reduz fluxo de combustível e pode desligar o motor em movimento. Consulte urgentemente a Honda com seu chassi.' },
      { severity: 'WARN',   title: 'Coxim hidráulico desgasta precoce', yearRange: { from: 2017, to: 2021 },
        body: 'O coxim hidráulico do motor 1.5 turbo se desgasta com casos relatados com apenas 38.000 km. Sintoma: batida seca no capô ao soltar o acelerador. Troca custa R$ 800–1.200.' },
      { severity: 'WARN',   title: 'Suspensão dianteira com desgaste',  yearRange: { from: 2017 },
        body: 'Componentes da suspensão dianteira apresentam desgaste acima da média para o segmento, com barulhos e perda de estabilidade a partir de 50.000 km.' },
    ],
    MANUTENCAO: [],
  },

  Fit: {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'CVT com falha prematura',        yearRange: { from: 2015, to: 2020 },
        body: 'CVT com ruídos e travamentos relatados com menos de 20.000 km em casos documentados. Troca do conjunto CVT custa R$ 8.000–15.000 — incidência alta fora do prazo de garantia.' },
      { severity: 'WARN',   title: 'Ferrugem precoce no capô e teto', yearRange: { from: 2015, to: 2020 },
        body: 'Bolhas de ferrugem sob a pintura no capô e teto com apenas 50.000 km. Indica falha na proteção anticorrosiva de fábrica.' },
      { severity: 'WARN',   title: 'Motor de arranque — escovas',     yearRange: { from: 2015, to: 2019 },
        body: 'O porta-escovas do motor de arranque falha causando partidas lentas ou difíceis. Problema de desgaste prematuro documentado nos Fit 2015–2019.' },
    ],
    MANUTENCAO: [],
  },

  'HR-V': {
    PROBLEMAS: [
      { severity: 'WARN', title: 'Tensionador da correia dentada',     yearRange: { from: 2015 },
        body: 'O tensionador da correia de distribuição do motor 1.8 i-VTEC apresenta desgaste precoce a partir de 80.000 km. Troca preventiva no intervalo recomendado é essencial.' },
      { severity: 'WARN', title: 'Depósito de carbono — injeção GDI',  yearRange: { from: 2015 },
        body: 'Acúmulo de carbono nas válvulas de admissão (problema típico de motores GDI) causa perda de potência e falhas de aceleração entre 60.000–80.000 km.' },
      { severity: 'OK',   title: 'CVT com resposta lenta',             yearRange: { from: 2015 },
        body: 'O CVT do HR-V tem resposta lenta à aceleração — limitação de projeto. Programar no modo S melhora a resposta em ultrapassagens.' },
    ],
    MANUTENCAO: [],
  },

  'WR-V': {
    PROBLEMAS: [
      { severity: 'WARN', title: 'CVT solavancando em baixa velocidade', yearRange: { from: 2017 },
        body: 'O CVT apresenta solavanco perceptível na saída e em manobras de baixa velocidade. Comportamento confirmado como limitação do sistema, sem solução definitiva.' },
      { severity: 'WARN', title: 'Desembaçador do para-brisa insuficiente', yearRange: { from: 2017 },
        body: 'O sistema de ventilação/desembaçamento do para-brisa é insuficiente em dias úmidos — limitação do projeto do HVAC para as condições brasileiras.' },
      { severity: 'OK',   title: 'Acabamento interno com folgas',         yearRange: { from: 2017 },
        body: 'Painéis internos da porta e console central com folgas e chiados, especialmente em estradas com pavimento irregular. Relatado nas primeiras revisões.' },
    ],
    MANUTENCAO: [],
  },

  City: {
    PROBLEMAS: [
      { severity: 'WARN', title: 'Motor de arranque com desgaste',     yearRange: { from: 2009, to: 2019 },
        body: 'O porta-escovas do motor de arranque falha causando partidas lentas ou difíceis nos City 2009–2019. Problema compartilhado com o Honda Fit da mesma geração.' },
      { severity: 'WARN', title: 'Perda de potência por filtro entupido', yearRange: { from: 2009 },
        body: 'Filtro de combustível entupindo causa perda brusca de potência e alertas do sistema de emissões. Problema intensificado quando o intervalo de troca não é respeitado com uso de etanol.' },
      { severity: 'OK',   title: 'Sensor de combustível impreciso',    yearRange: { from: 2009 },
        body: 'O indicador de nível de combustível perde precisão com o tempo, indicando reserva antes do esperado. Exige atenção para não ficar a pé.' },
    ],
    MANUTENCAO: [],
  },

  // ── RENAULT ───────────────────────────────────────────────────────────────

  Kwid: {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Coluna de direção quebra em movimento', yearRange: { from: 2017, to: 2022 },
        body: 'Defeito gravíssimo: o suporte da coluna de direção elétrica quebra durante a condução causando perda de controle. Acidentes foram registrados no Brasil. A Renault emitiu recall — confirme com a concessionária.' },
      { severity: 'DANGER', title: 'Trinca na solda do eixo traseiro',      yearRange: { from: 2021, to: 2023 },
        body: 'Soldagem deficiente no eixo traseiro provoca trincas e instabilidade em curvas. Recall emitido pela Renault para Kwids 2021–2023 — verifique se seu veículo foi convocado.' },
      { severity: 'WARN',   title: 'Freios subdimensionados (pré-2020)',    yearRange: { from: 2017, to: 2019 },
        body: 'Discos de freio sólidos (não ventilados) nos Kwids até 2019 são subdimensionados, com tendência ao empenamento em uso intenso. A Renault adotou discos ventilados a partir de 2020.' },
    ],
    MANUTENCAO: [],
  },

  Sandero: {
    PROBLEMAS: [
      { severity: 'WARN', title: 'Câmbio EDC solavancando',          yearRange: { from: 2015 },
        body: 'O câmbio automatizado EDC solavanca em manobras lentas e engarrafamentos. Problema crônico e de projeto — a Renault já atualizou o software várias vezes com melhora parcial.' },
      { severity: 'WARN', title: 'Motor SCe sensível à manutenção',  yearRange: { from: 2015 },
        body: 'O motor 1.0 SCe apresenta quedas perceptíveis de desempenho a partir de 40.000 km sem manutenção rigorosa. Troque as velas a cada 30.000 km sem falta.' },
      { severity: 'OK',   title: 'Ruído metálico no compressor A/C', yearRange: { from: 2015 },
        body: 'O compressor de A/C emite ruído metálico ao acionar, especialmente no frio. Comum em toda a linha Renault 1.0/1.6 — monitore para identificar desgaste.' },
    ],
    MANUTENCAO: [],
  },

  Logan: {
    PROBLEMAS: [
      { severity: 'WARN', title: 'Câmbio EDC — trocas bruscas',        yearRange: { from: 2015 },
        body: 'O câmbio EDC tem comportamento brusco na troca de 1ª para 2ª marcha. Atualizações de software melhoram, mas não eliminam o problema em todos os casos.' },
      { severity: 'WARN', title: 'Bomba de combustível ruidosa',       yearRange: { from: 2007 },
        body: 'A bomba de combustível emite zumbido perceptível no interior, especialmente com o tanque abaixo de 1/4. Nunca ande com nível muito baixo — o combustível resfria e lubrifica a bomba.' },
      { severity: 'OK',   title: 'Amortecedores traseiros frágeis',   yearRange: { from: 2007 },
        body: 'Amortecedores traseiros perdem eficiência rapidamente em pavimento ruim. Inspecione a partir de 50.000 km, especialmente se o veículo carregar peso com frequência.' },
    ],
    MANUTENCAO: [],
  },

  Duster: {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Direção travando — recall Renault',     yearRange: { from: 2011 },
        body: 'Recall Renault por falha na caixa de direção que pode emperrar momentaneamente. Verificação urgente na concessionária com número de chassi.' },
      { severity: 'WARN',   title: 'Ar-condicionado com falha crônica',    yearRange: { from: 2011 },
        body: 'Falha no compressor ou evaporador do A/C com menos de 2 anos de uso. A taxa de substituição desse componente no Duster é significativamente maior que a média do segmento.' },
      { severity: 'WARN',   title: 'Câmbio manual/automático irregular',   yearRange: { from: 2011 },
        body: 'Trocas irregulares e barulhos tanto no câmbio manual quanto no automático. Alta taxa de repetição mesmo após trocas em garantia.' },
    ],
    MANUTENCAO: [],
  },

  Oroch: {
    PROBLEMAS: [
      { severity: 'WARN', title: 'Consumo de óleo excessivo SCe 2.0',  yearRange: { from: 2015 },
        body: 'Motor 2.0 SCe com consumo de óleo elevado — nível abaixo do mínimo com apenas 1.800 km rodados relatado. Indica falha de fabricação nos vedadores internos. Monitore a cada abastecimento.' },
      { severity: 'WARN', title: 'Direção com rigidez intermitente',   yearRange: { from: 2015 },
        body: 'Rigidez repentina na direção hidráulica em uso normal. Compartilha a vulnerabilidade da caixa de direção do Duster.' },
      { severity: 'OK',   title: 'Vibração em rodovias 80–100 km/h',  yearRange: { from: 2015 },
        body: 'Vibração no volante entre 80–100 km/h relacionada ao desequilíbrio dos pneus originais. Balanceamento a cada 10.000 km reduz o problema.' },
    ],
    MANUTENCAO: [],
  },

  // ── PEUGEOT ───────────────────────────────────────────────────────────────

  // "2008" must be listed BEFORE "208" to prevent "2008" matching the "208" key
  // (because "2008 1.6 THP".toLowerCase().includes("208") === true)
  '2008': {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Bomba de alta pressão THP falha',      yearRange: { from: 2013 },
        body: 'A bomba de alta pressão do motor 1.6 THP falha antes dos 70.000 km (custo R$ 8.000–12.000). Problema crônico documentado no 2008 e no 208 com o motor PSA THP.' },
      { severity: 'DANGER', title: 'Corrente de distribuição THP',         yearRange: { from: 2013 },
        body: 'O kit de corrente de distribuição falha precocemente no motor THP — casos documentados abaixo de 70.000 km. Uma corrente rompida causa dano catastrófico ao motor.' },
      { severity: 'WARN',   title: 'Ar-condicionado com reincidência',    yearRange: { from: 2013 },
        body: 'O A/C resfria inicialmente mas passa a apenas ventilar, por falha no compressor ou na caixa evaporadora. Alta taxa de reincidência mesmo após reparo em garantia.' },
      { severity: 'OK',     title: 'Multimídia com toques fantasma',      yearRange: { from: 2013 },
        body: 'Central multimídia com toques involuntários, congelamentos e desconexões espontâneas. Atualizações de software parcialmente eficazes.' },
    ],
    MANUTENCAO: [],
  },

  '208': {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Furo no bloco do motor 1.5',           yearRange: { from: 2013, to: 2019 },
        body: 'Defeito gravíssimo: trinca ou furo no bloco do motor 1.5 — falha de fundição confirmada pela Peugeot em alguns casos com negativa de cobertura em garantia em outros. Causa perda total do motor.' },
      { severity: 'DANGER', title: 'Corrente de distribuição THP 1.6',     yearRange: { from: 2013, to: 2023 },
        body: 'Corrente de distribuição com ruptura documentada antes de 70.000 km. Troca do kit completo custa R$ 7.000–10.000 e é considerada manutenção preventiva obrigatória.' },
      { severity: 'WARN',   title: 'Bomba de alta pressão THP',            yearRange: { from: 2013, to: 2023 },
        body: 'A bomba de alta pressão falha prematuramente gerando perda de potência, engasgos e luz de injeção. Use apenas combustível de boa procedência e troque o filtro rigorosamente.' },
      { severity: 'OK',     title: 'Ar-condicionado com falhas crônicas', yearRange: { from: 2013 },
        body: 'Falhas crônicas no sistema de A/C (compressor, condensador ou evaporador) relatadas mesmo em veículos com menos de 3 anos. Comum a toda a linha PSA no Brasil.' },
    ],
    MANUTENCAO: [],
  },

  // ── BMW ──────────────────────────────────────────────────────────────────

  // BMW 320i — E90 (2006-2011) · F30/F31 (2012-2018) · G20 (2019+)
  '320i': {
    PROBLEMAS: [
      // E90 (2006-2011) — motor N46/N43
      { severity: 'WARN', title: 'Queima de óleo pelos retentores',   yearRange: { from: 2006, to: 2011 },
        body: 'O motor N46/N43 do E90 queima óleo pelos retentores das válvulas, gerando fumaça azulada no escapamento. Consumo acima de 0,5L por 1.000 km indica desgaste dos retentores.' },
      { severity: 'OK',   title: 'Bobinas de ignição queimando',      yearRange: { from: 2006, to: 2011 },
        body: 'Bobinas de ignição do motor 6-cilindros falham prematuramente, causando engasgos e falta de cilindros. Múltiplas trocas são comuns ao longo da vida do veículo.' },
      { severity: 'WARN', title: 'Bomba d\'água elétrica falha',      yearRange: { from: 2006, to: 2011 },
        body: 'A bomba d\'água elétrica falha após uso prolongado, causando superaquecimento do motor. É um componente crítico que deve ser substituído preventivamente a cada 80.000 km.' },
      // F30 N20 (2012-2015) — problema crônico da corrente
      { severity: 'DANGER', title: 'Barulho "tec-tec" — corrente N20',  yearRange: { from: 2012, to: 2015 },
        body: 'O motor N20 (320i F30) tem desgaste prematuro nas guias e tensionador da corrente de distribuição, gerando barulho metálico "tec-tec" na partida a frio. Corrente que salta pode destruir o motor completamente — não ignore o barulho.' },
      { severity: 'DANGER', title: 'Corrente de distribuição N20',      yearRange: { from: 2012, to: 2015 },
        body: 'A corrente de distribuição do motor N20 estica e pode saltar entre 60.000–100.000 km, especialmente com combustível de qualidade inferior. Falha catastrófica do motor em caso de ruptura. Troca preventiva obrigatória.' },
      // F30 geral (2012-2018)
      { severity: 'WARN', title: 'Vazamento no sistema de arrefecimento', yearRange: { from: 2012, to: 2018 },
        body: 'Vazamentos no radiador e bomba d\'água são frequentes entre 60.000–100.000 km. Falhas nos O-rings das linhas de resfriamento do turbo causam perda de liquido de arrefecimento sem vazamento externo visível.' },
      { severity: 'WARN', title: 'Painel de instrumentos apaga',         yearRange: { from: 2012, to: 2018 },
        body: 'O display do painel de instrumentos apaga intermitentemente ou falha completamente. Troca do conjunto do painel custa R$ 2.500+. Problema relatado em múltiplos exemplares do F30.' },
      // G20 (2019+) — diferencial
      { severity: 'DANGER', title: 'Diferencial traseiro — falha precoce', yearRange: { from: 2019 },
        body: 'Falha prematura do diferencial traseiro do G20 com barulho em 110–140 km/h, relatada com menos de 20.000 km. Reparo custa ~R$ 25.000. As falhas se concentram suspeitosamente após o vencimento da garantia de 2 anos.' },
    ],
    MANUTENCAO: [],
  },

  // BMW 328i — motor N20 F30 (2012-2016), mesma plataforma que 320i F30
  '328i': {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Barulho "tec-tec" — corrente N20',    yearRange: { from: 2012, to: 2015 },
        body: 'Guias e tensionador da corrente do motor N20 se desgastam precocemente, gerando barulho metálico na partida a frio. Ruptura da corrente causa dano catastrófico ao motor.' },
      { severity: 'DANGER', title: 'Corrente de distribuição N20',         yearRange: { from: 2012, to: 2015 },
        body: 'A corrente de distribuição do motor N20 estica prematuramente entre 60.000–100.000 km. Use somente combustível premium (aditivado) para reduzir o risco de depósitos no tensionador.' },
      { severity: 'WARN',   title: 'Vazamento no sistema de arrefecimento', yearRange: { from: 2012, to: 2016 },
        body: 'Mesmo problema que afeta o 320i F30: radiador e bomba d\'água falham entre 60.000–100.000 km, com risco de superaquecimento silencioso por falha dos O-rings do turbo.' },
      { severity: 'WARN',   title: 'Consumo de óleo elevado',               yearRange: { from: 2012, to: 2016 },
        body: 'O motor N20 do 328i consome óleo acima do normal a partir de 60.000 km por desgaste dos anéis do pistão. Monitore o nível quinzenalmente para evitar dano ao motor.' },
    ],
    MANUTENCAO: [],
  },

  // BMW 330i — G20 (2019+)
  '330i': {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Diferencial traseiro — falha precoce', yearRange: { from: 2019 },
        body: 'Mesma falha crônica do 320i G20: diferencial traseiro falha com menos de 20.000 km gerando barulho em altas velocidades. Reparo ~R$ 25.000. Falhas pós-garantia são frequentemente negadas pela BMW.' },
      { severity: 'WARN', title: 'Consumo de óleo motor B48',              yearRange: { from: 2019 },
        body: 'O motor B48 do 330i apresenta consumo de óleo relatado acima de 60.000 km. Monitore o nível a cada 2.000 km e use somente óleo BMW LL-14 FE+ para manter a validade da garantia.' },
      { severity: 'OK',   title: 'Painel de vidro — teto solar infiltra',  yearRange: { from: 2019 },
        body: 'Infiltração de água pelo teto panorâmico, especialmente após lavagens a pressão. Problema de vedação documentado no G20 — drenos do teto solar devem ser limpos semestralmente.' },
    ],
    MANUTENCAO: [],
  },

  // BMW Série 1 — F20 (2012-2019): motores N13 (116i/118i) e B38 (118i/120i 2016+)
  '116i': {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Corrente distribuição N13 desgasta',  yearRange: { from: 2012, to: 2019 },
        body: 'O motor N13 do 116i/118i F20 tem corrente de distribuição com desgaste prematuro entre 60.000–100.000 km, com barulho na partida a frio. Falha catastrófica do motor em caso de ruptura.' },
      { severity: 'WARN',   title: 'Vazamento de óleo — tampa da válvula', yearRange: { from: 2012, to: 2019 },
        body: 'Vazamento de óleo pela tampa da válvula e pelos retentores do eixo a cames é frequente acima de 60.000 km. Visível como mancha de óleo no bloco e cheiro de queimado.' },
      { severity: 'WARN',   title: 'Falha no turbocompressor',             yearRange: { from: 2012, to: 2019 },
        body: 'O turbo dos motores N13/B38 falha tipicamente entre 60.000–100.000 km com perda de potência e fumaça azulada. Custo de troca R$ 4.000–5.000 em oficinas especializadas.' },
      { severity: 'WARN',   title: 'Vazamento arrefecimento do turbo',     yearRange: { from: 2012, to: 2015 },
        body: 'Falha nos O-rings das mangueiras de resfriamento do turbo causa perda de líquido de arrefecimento sem vazamento externo visível. Leva ao superaquecimento em tráfego intenso.' },
    ],
    MANUTENCAO: [],
  },

  '118i': {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Corrente distribuição N13/B38',       yearRange: { from: 2012, to: 2019 },
        body: 'Corrente de distribuição com desgaste prematuro nos motores N13 (2012–2015) e B38 (2016+). Barulho metálico na partida a frio indica tensionador desgastado. Troca preventiva antes dos 80.000 km é recomendada.' },
      { severity: 'WARN',   title: 'Vazamento de óleo — tampa da válvula', yearRange: { from: 2012, to: 2019 },
        body: 'Vazamento de óleo pela tampa da válvula frequente acima de 60.000 km. Causa cheiro de queimado e manchas no motor. Troca da junta resolve, mas reincide se não usar óleo BMW original.' },
      { severity: 'WARN',   title: 'Falha no turbocompressor',             yearRange: { from: 2012, to: 2019 },
        body: 'Turbo falha entre 60.000–100.000 km com perda de potência e fumaça azulada. Custo de substituição elevado — use somente óleo BMW aprovado e troque a cada 10.000 km.' },
    ],
    MANUTENCAO: [],
  },

  '120i': {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Corrente distribuição B38/B46',       yearRange: { from: 2012, to: 2019 },
        body: 'Corrente de distribuição dos motores B38/B46 apresenta esticamento prematuro. Troca do kit completo (corrente + tensionador + guias) necessária antes dos 100.000 km para evitar falha catastrófica.' },
      { severity: 'WARN',   title: 'Consumo de óleo acima do normal',     yearRange: { from: 2016, to: 2019 },
        body: 'O motor B46 do 120i apresenta consumo de óleo elevado a partir de 60.000 km. BMW considera até 0,5L/1.000 km como normal — acima disso, exija análise da concessionária.' },
      { severity: 'WARN',   title: 'Suspensão — ruídos e batidas',        yearRange: { from: 2012, to: 2019 },
        body: 'Buchas e amortecedores dianteiros desgastam precocemente em uso urbano brasileiro, gerando ruídos e batidas. Inspecione a cada 40.000 km.' },
    ],
    MANUTENCAO: [],
  },

  // BMW X1 — E84 (2009-2015) · F48 (2015-2022)
  X1: {
    PROBLEMAS: [
      // E84 (2009-2015) — motor N20 com barulho
      { severity: 'DANGER', title: 'Barulho "tec-tec" motor N20',          yearRange: { from: 2012, to: 2015 },
        body: 'O motor N20 do X1 E84 (2012+) sofre do mesmo desgaste crônico nas guias da corrente de distribuição que afeta o 320i F30. Barulho "tec-tec" na partida a frio indica corrente frouxa — não ignore.' },
      { severity: 'WARN',   title: 'Coxim do motor quebra precocemente',   yearRange: { from: 2009, to: 2015 },
        body: 'O coxim superior (apoio do motor) quebra frequentemente com baixa quilometragem, causando vibração excessiva. Casos relatados com apenas 20.000 km. Reparo ~R$ 2.500.' },
      { severity: 'WARN',   title: 'Vazamento de óleo — cabeçote e vácuo', yearRange: { from: 2009, to: 2015 },
        body: 'Vazamento de óleo pela junta do cabeçote e retentores da bomba de vácuo é frequente acima de 50.000 km. Gera cheiro de queimado no habitáculo e manchas sob o veículo.' },
      { severity: 'OK',     title: 'Persiana do teto solar se solta',      yearRange: { from: 2009, to: 2015 },
        body: 'A persiana (proteção) do teto panorâmico pende ou se desprende por falha no trilho, relatada com apenas 17.000 km. Reparo coberto pela garantia, mas reincide.' },
      // F48 (2015-2022) — plataforma UKL
      { severity: 'WARN',   title: 'Módulo câmbio Steptronic com erro',    yearRange: { from: 2015, to: 2022 },
        body: 'O módulo eletrônico do câmbio Steptronic gera erros ao selecionar a posição P, exigindo reprogramação na concessionária. Problema relatado em múltiplas versões do F48.' },
      { severity: 'WARN',   title: 'Turbo/intercooler com vazamento',      yearRange: { from: 2015, to: 2022 },
        body: 'Assobio ao acelerar indica vazamento no sistema de pressurização do turbo ou intercooler trincado. Filtro de ar entupido pode causar sintoma similar — inspecione periodicamente.' },
      { severity: 'OK',     title: 'Ruídos crônicos na suspensão',         yearRange: { from: 2015, to: 2022 },
        body: 'Ruídos e batidas na suspensão são amplamente relatados no X1 F48, mesmo em veículos novos. Persistem em alguns casos mesmo após visitas à concessionária.' },
    ],
    MANUTENCAO: [],
  },

  // BMW X3 — F25 (2011-2017) · G01 (2017+)
  X3: {
    PROBLEMAS: [
      // F25 N20 (2011-2015)
      { severity: 'DANGER', title: 'Barulho "tec-tec" motor N20',          yearRange: { from: 2011, to: 2015 },
        body: 'O motor N20 do X3 F25 sofre do mesmo desgaste das guias da corrente de distribuição. Barulho metálico na partida a frio é sinal de tensionador desgastado — risco de destruição do motor se ignorado.' },
      { severity: 'WARN',   title: 'Vazamento no sistema de arrefecimento', yearRange: { from: 2011, to: 2017 },
        body: 'Falhas crônicas na carcaça do termostato e no resfriador de óleo causam perda de líquido de arrefecimento. Difícil de detectar por não gerar poça no chão — monitore o nível regularmente.' },
      { severity: 'WARN',   title: 'Coluna de direção com vibração cara',   yearRange: { from: 2011, to: 2017 },
        body: 'A coluna de direção do X3 F25 produz vibrações e ruídos que são extremamente caros de reparar (até R$ 15.000), pois exigem remoção e substituição de múltiplos componentes integrados.' },
      { severity: 'OK',     title: 'Amortecedores com desgaste antecipado', yearRange: { from: 2011, to: 2017 },
        body: 'Os amortecedores do X3 se deterioram antes do esperado, especialmente em uso urbano brasileiro. Trocas necessárias entre 60.000–80.000 km geram custo elevado de manutenção.' },
      // G01 (2017+)
      { severity: 'WARN',   title: 'Consumo de óleo motor B48',             yearRange: { from: 2017 },
        body: 'O motor B48 do X3 G01 apresenta consumo de óleo relatado acima de 60.000 km. BMW considera até 0,5L/1.000 km como dentro do normal — monitore e exija análise se ultrapassar esse limite.' },
    ],
    MANUTENCAO: [],
  },

  // BMW X5 — E70 (2007-2013) · F15 (2013-2018)
  X5: {
    PROBLEMAS: [
      { severity: 'WARN',   title: 'Suspensão a ar com falha',             yearRange: { from: 2007, to: 2018 },
        body: 'O sistema de suspensão pneumática falha em torno de 80.000 km — compressor e bolsas de ar se desgastam, causando altura irregular e perda de conforto. Reparo caro com peças BMW originais.' },
      { severity: 'WARN',   title: 'DPF entupindo (versões diesel)',        yearRange: { from: 2007, to: 2018 },
        body: 'O filtro de partículas diesel (DPF) entope em uso urbano intenso, acionando o modo de emergência e perda de potência. Regeneração exige percurso de rodovia — problema grave em cidades grandes.' },
      { severity: 'OK',     title: 'Faróis Xenon com falha',               yearRange: { from: 2007, to: 2018 },
        body: 'As lâmpadas e reatores do farol Xenon falham entre 60.000–80.000 km. Custo de substituição R$ 1.500–2.500 por conjunto. Problema mais frequente no E70 (2007–2013).' },
      { severity: 'OK',     title: 'Sistema iDrive com falhas eletrônicas', yearRange: { from: 2007, to: 2018 },
        body: 'O sistema iDrive apresenta falhas eletrônicas e travamentos acima de 100.000 km. Atualizações de software ajudam. O sistema de entrada sem chave (Comfort Access) também é propenso a falhas.' },
    ],
    MANUTENCAO: [],
  },

  // BMW 528i — F10 (2011-2016), motor N20
  '528i': {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Corrente distribuição N20',            yearRange: { from: 2011, to: 2016 },
        body: 'O motor N20 do 528i F10 sofre do mesmo problema crônico que o 320i F30: corrente de distribuição com desgaste prematuro e risco de destruição do motor. Troca preventiva antes dos 80.000 km é obrigatória.' },
      { severity: 'WARN',   title: 'Bomba de combustível de alta pressão', yearRange: { from: 2011, to: 2016 },
        body: 'A bomba de alta pressão (HPFP) do motor N20 falha entre 80.000–100.000 km, causando partidas longas, engasgos e perda de potência. Custo de substituição elevado.' },
      { severity: 'WARN',   title: 'Bomba d\'água elétrica falha',         yearRange: { from: 2011, to: 2016 },
        body: 'A bomba d\'água eletricamente acionada do motor N20 é um ponto fraco conhecido, falhando e causando superaquecimento. Troca preventiva a cada 80.000 km é recomendada.' },
      { severity: 'WARN',   title: 'Consumo de óleo elevado N20',          yearRange: { from: 2011, to: 2016 },
        body: 'O motor N20 do F10 apresenta consumo de óleo elevado por desgaste dos anéis do pistão. Monitore quinzenalmente para evitar dano ao motor por falta de lubrificação.' },
    ],
    MANUTENCAO: [],
  },

  // BMW 530i — G30 (2017+), motor B48
  '530i': {
    PROBLEMAS: [
      { severity: 'WARN', title: 'Consumo de óleo motor B48',            yearRange: { from: 2017 },
        body: 'O motor B48 do 530i G30 apresenta consumo de óleo relatado acima de 60.000 km, similar ao 320i G20. Monitore o nível a cada 2.000 km e use somente óleo BMW LL-14 FE+.' },
      { severity: 'OK',   title: 'Sistema de infotainment iDrive trava', yearRange: { from: 2017 },
        body: 'O iDrive 6/7 pode travar e reiniciar espontaneamente, especialmente ao usar CarPlay. Atualizações de software pela concessionária reduzem a frequência do problema.' },
      { severity: 'WARN', title: 'Vedações do motor com vazamento',      yearRange: { from: 2017 },
        body: 'Vazamentos de óleo pelos retentores do virabrequim e pela junta da tampa de válvulas são reportados no B48 acima de 80.000 km. Inspecione na revisão anual.' },
    ],
    MANUTENCAO: [],
  },

  // BMW M3/M4 — F80/F82 (2014-2020), motor S55
  M3: {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Recall eixo cardã fibra de carbono',  yearRange: { from: 2016, to: 2016 },
        body: 'Recall oficial BMW para 33 unidades fabricadas entre 30/06 e 26/09/2016: o eixo de transmissão traseiro em fibra de carbono pode fraturar. Verificação urgente com a BMW pelo número de chassi.' },
      { severity: 'DANGER', title: 'Crank hub pode escorregar — S55',    yearRange: { from: 2014, to: 2020 },
        body: 'O cubo do virabrequim (crank hub) do motor S55 pode escorregar sob uso agressivo, desalinhando a distribuição e causando falha catastrófica do motor. Risco elevado em uso em pista ou com tune.' },
      { severity: 'WARN',   title: 'Câmbio DCT com desgaste no abuso',   yearRange: { from: 2014, to: 2020 },
        body: 'O câmbio DCT de 7 velocidades superaquece o fluido e apresenta desgaste acelerado em uso intenso ou em pista. Troca do fluido a cada 40.000 km é recomendada para prolongar a vida útil.' },
    ],
    MANUTENCAO: [],
  },

  M4: {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Recall eixo cardã fibra de carbono',  yearRange: { from: 2016, to: 2016 },
        body: 'Recall oficial BMW para unidades fabricadas entre 30/06 e 26/09/2016: eixo de transmissão em fibra de carbono pode fraturar. Verifique com a BMW pelo número de chassi.' },
      { severity: 'DANGER', title: 'Crank hub pode escorregar — S55',    yearRange: { from: 2014, to: 2020 },
        body: 'O cubo do virabrequim do motor S55 pode escorregar sob condução agressiva, desalinhando a distribuição e causando destruição do motor. Problema amplamente documentado na comunidade M.' },
      { severity: 'WARN',   title: 'Câmbio DCT 7v — fluido superaquece', yearRange: { from: 2014, to: 2020 },
        body: 'O câmbio DCT de dupla embreagem superaquece em uso intenso ou em pista, causando desgaste das embreagens. Troca de fluido a cada 40.000 km e uso de resfriador adicional são recomendados.' },
    ],
    MANUTENCAO: [],
  },

  // ── AUDI ─────────────────────────────────────────────────────────────────
  // IMPORTANTE: A3, A4, A5, Q3, Q5, Q7 devem vir ANTES de "TT"
  // pois "quattro" (presente em muitos modelos Audi) contém "tt"
  // e o find() retornaria "TT" incorretamente se viesse antes.

  // Audi A3 — 8P (2004-2012) · 8V (2013-2020)
  A3: {
    PROBLEMAS: [
      { severity: 'WARN',   title: 'S-Tronic DQ200 — falha mecatrônica',    yearRange: { from: 2013, to: 2020 },
        body: 'Problema crônico documentado no câmbio S-Tronic DQ200 (7 marchas, seco): a unidade mecatrônica falha causando hesitação, solavancos e travamento nas trocas. Recall emitido na Europa e EUA, mas com cobertura limitada no Brasil. Recondicionamento custa R$ 20.000+.' },
      { severity: 'WARN',   title: 'Bomba d\'água com vazamento',            yearRange: { from: 2013, to: 2020 },
        body: 'A bomba d\'água falha causando vazamentos de arrefecimento e risco de superaquecimento. Problema mais frequente em modelos 8V iniciais.' },
      { severity: 'WARN',   title: 'Consumo de óleo TFSI elevado',           yearRange: { from: 2013, to: 2018 },
        body: 'Os motores 1.4 e 1.8 TFSI apresentam consumo elevado de óleo por desgaste dos anéis do pistão — problema herdado da família TFSI compartilhada com o A4 B8.' },
      { severity: 'OK',     title: 'Acúmulo de carbono nas válvulas',        yearRange: { from: 2013, to: 2020 },
        body: 'A injeção direta (TFSI) não lava as válvulas de admissão, causando acúmulo de carbono que gera marcha lenta irregular e perda de potência. Limpeza por "walnut blasting" a cada 60.000 km.' },
    ],
    MANUTENCAO: [],
  },

  // Audi A4 — B8 (2008-2016) · B9 (2016+)
  A4: {
    PROBLEMAS: [
      // B8 — problema gravíssimo de consumo de óleo
      { severity: 'DANGER', title: 'Consumo excessivo de óleo TFSI B8',    yearRange: { from: 2008, to: 2014 },
        body: 'Defeito gravíssimo documentado: falha nos anéis do pistão do motor 1.8/2.0 TFSI causa consumo de até 1L de óleo a cada 500 km. Risco de gripamento do motor. A Audi reconheceu o erro de engenharia internacionalmente, mas resistiu a recall no Brasil. Exija análise formal da concessionária.' },
      { severity: 'WARN',   title: 'Bobinas de ignição TFSI queimam',      yearRange: { from: 2008, to: 2016 },
        body: 'As bobinas de ignição dos motores TFSI queimam prematuramente, causando falta de cilindros e perda de potência. Cada troca custa ~R$ 1.000 na concessionária. Múltiplas trocas são comuns ao longo da vida do veículo.' },
      { severity: 'WARN',   title: 'Embreagem S-Tronic cara',              yearRange: { from: 2008, to: 2016 },
        body: 'Problema conhecido no câmbio S-Tronic do A4 B8: as embreagens falham precocemente com custo de reparo superior a R$ 20.000. A Audi cobriu alguns casos em garantia, mas muitos proprietários arcaram com o custo.' },
      { severity: 'OK',     title: 'Acúmulo de carbono — injeção direta', yearRange: { from: 2008, to: 2016 },
        body: 'A injeção direta do motor TFSI não limpa as válvulas de admissão, acumulando carbono que causa marcha lenta irregular e hesitação. Limpeza por "walnut blasting" recomendada a cada 60.000 km.' },
      // B9 (2016+)
      { severity: 'WARN',   title: 'Consumo de óleo TFSI B9 continua',    yearRange: { from: 2016 },
        body: 'A geração B9 continuou com relatos de consumo de óleo elevado no motor 2.0 TFSI — até 1L a cada 500 km em casos documentados no Reclame AQUI. A Audi continua negando o defeito sistemático.' },
      { severity: 'WARN',   title: 'S-Tronic câmbio com trocas erráticas', yearRange: { from: 2016 },
        body: 'O câmbio S-Tronic do A4 B9 desenvolve trocas abruptas e desgaste da mecatrônica entre 60.000–80.000 km. Custo de reparo elevado.' },
    ],
    MANUTENCAO: [],
  },

  // Audi A5 — B8 (2008-2017), mesmo motor TFSI que o A4 B8
  A5: {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Consumo excessivo de óleo TFSI',      yearRange: { from: 2008, to: 2014 },
        body: 'Mesmo defeito gravíssimo do A4 B8: anéis do pistão do motor 1.8/2.0 TFSI falham causando consumo de até 1L a cada 500 km. Risco de gripamento. Proprietários brasileiros relatam o problema no Reclame AQUI sem solução definitiva da Audi.' },
      { severity: 'WARN',   title: 'Bobinas de ignição TFSI queimam',     yearRange: { from: 2008, to: 2017 },
        body: 'Bobinas de ignição falham prematuramente nos motores TFSI do A5, causando engasgos e falta de cilindros. Custo ~R$ 1.000 por bobina — múltiplas trocas ao longo da vida útil.' },
      { severity: 'WARN',   title: 'Turbocompressor com desgaste precoce', yearRange: { from: 2008, to: 2017 },
        body: 'O turbo falha por volta de 100.000 km com perda de potência e fumaça. Custo de substituição ~R$ 5.000 + mão de obra. Troca de óleo rigorosa a cada 10.000 km prolonga a vida útil.' },
      { severity: 'OK',     title: 'Sistema multimídia MMI lento/falhas', yearRange: { from: 2008, to: 2017 },
        body: 'O sistema MMI do A5 é lento e propenso a travamentos, frustrando proprietários acostumados com tecnologia atual. Atualizações de firmware melhoram parcialmente.' },
    ],
    MANUTENCAO: [],
  },

  // Audi Q3 — 8U (2011-2018) · F3 (2019+)
  Q3: {
    PROBLEMAS: [
      // 8U (2011-2018)
      { severity: 'WARN',   title: 'Queda de nível de arrefecimento',      yearRange: { from: 2011, to: 2018 },
        body: 'Os motores TFSI/TSI (1.4 e 2.0) do Q3 8U apresentam queda constante de nível de arrefecimento sem vazamento visível, dificultando o diagnóstico. Pode indicar microtrinca no cabeçote.' },
      { severity: 'WARN',   title: 'S-Tronic com vazamento — manutenção cara', yearRange: { from: 2011, to: 2018 },
        body: 'Embora o Q3 use a versão DQ250/DQ500 (mais robusta), o câmbio S-Tronic apresenta vazamentos frequentes e manutenção muito cara. Troca completa ultrapassa R$ 15.000.' },
      { severity: 'DANGER', title: 'Correia distribuição TDI',             yearRange: { from: 2011, to: 2018 },
        body: 'Nas versões diesel (2.0 TDI), a correia de distribuição falha com o envelhecimento, causando dano catastrófico no motor interferente. Troca preventiva a cada 60.000 km ou 4 anos é obrigatória.' },
      { severity: 'OK',     title: 'Válvula EGR com acúmulo de carbono',   yearRange: { from: 2011, to: 2018 },
        body: 'A válvula EGR acumula carbono pelo combustível brasileiro, causando marcha lenta irregular e perda de rendimento. Limpeza a cada 40.000 km é recomendada.' },
      // F3 (2019+)
      { severity: 'WARN',   title: 'Luz EPC — falhas elétricas crônicas', yearRange: { from: 2019 },
        body: 'A luz de gestão do motor (EPC) acende crônicamente no Q3 F3 com perda de potência e RPM errático — em alguns casos, o veículo para completamente. Problema elétrico documentado no Reclame AQUI com baixa resolução pela Audi.' },
      { severity: 'WARN',   title: 'S-Tronic não engata as marchas',       yearRange: { from: 2019 },
        body: 'O câmbio S-Tronic falha e se recusa a engatar marchas à frente ou à ré, exibindo erro de câmbio no painel. Recall emitido na Europa e EUA — sem cobertura equivalente no Brasil.' },
      { severity: 'WARN',   title: 'Consumo de óleo 1.4 TFSI',            yearRange: { from: 2019 },
        body: 'O motor 1.4 TFSI do Q3 F3 apresenta queda de nível de óleo a cada 2 meses, provavelmente ligado a problemas no turbo ou nos retentores.' },
    ],
    MANUTENCAO: [],
  },

  // Audi Q5 — 8R (2008-2017) · FY (2017+)
  Q5: {
    PROBLEMAS: [
      // 8R (2008-2017)
      { severity: 'DANGER', title: 'Tensor da corrente de distribuição',   yearRange: { from: 2008, to: 2017 },
        body: 'O tensor da corrente de distribuição do motor 2.0 TFSI falha prematuramente, podendo causar dano catastrófico ao motor. Barulho metálico ao ligar o motor a frio é sinal de alerta. Troca preventiva recomendada antes dos 80.000 km.' },
      { severity: 'WARN',   title: 'Bomba d\'água com falha e vazamento',  yearRange: { from: 2008, to: 2017 },
        body: 'A bomba d\'água falha causando vazamentos de arrefecimento e superaquecimento. Componente propenso a falhas no 8R — troca preventiva a cada 80.000 km é uma boa prática.' },
      { severity: 'WARN',   title: 'Consumo de óleo TFSI elevado',         yearRange: { from: 2008, to: 2014 },
        body: 'Mesmo defeito dos motores TFSI do A4/A5 B8: anéis do pistão com consumo de óleo acima de 1L por 1.000 km. Monitore quinzenalmente.' },
      // FY (2017+)
      { severity: 'WARN',   title: 'Recall moldura do para-lama solta',    yearRange: { from: 2017, to: 2020 },
        body: 'Recall emitido pela Audi para o Q5 2018–2020: os parafusos da moldura traseira podem soltar e o painel se desprender em movimento, representando risco para outros veículos. Verifique com a concessionária.' },
      { severity: 'OK',     title: 'Teto panorâmico com ruído de vento',   yearRange: { from: 2017 },
        body: 'Ruído intenso de vento pelo teto panorâmico acima de 50 km/h, relatado por proprietários desde os primeiros anos. Problema de vedação sem solução definitiva confirmada pela Audi.' },
    ],
    MANUTENCAO: [],
  },

  // Audi Q7 — 4L (2006-2015)
  Q7: {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Tensor da corrente de distribuição',  yearRange: { from: 2006, to: 2015 },
        body: 'O tensor da corrente de distribuição do Q7 4L falha causando barulho e risco de ruptura da corrente. Falha catastrófica do motor se a corrente pular. Troca preventiva recomendada antes dos 80.000 km.' },
      { severity: 'WARN',   title: 'Suspensão a ar com falha',            yearRange: { from: 2006, to: 2015 },
        body: 'O sistema de suspensão pneumática falha (compressor e bolsas de ar), causando aviso de nivelamento e perda do ajuste de altura. Manutenção muito cara com peças Audi originais.' },
      { severity: 'WARN',   title: 'Conversor de torque — trepidação',    yearRange: { from: 2006, to: 2015 },
        body: 'O conversor de torque da transmissão automática causa trepidação e escorregamento, impactando a aceleração. Problema que se intensifica progressivamente com o uso.' },
      { severity: 'OK',     title: 'Descarga rápida da bateria',          yearRange: { from: 2006, to: 2015 },
        body: 'A bateria descarrega completamente se o carro ficar parado por ~3 dias por drenagem elétrica de fundo. Problema de parasita elétrico documentado no Q7 4L — instale um desconectador de bateria se o veículo ficar parado.' },
      { severity: 'OK',     title: 'Freio de mão eletrônico falha',       yearRange: { from: 2006, to: 2015 },
        body: 'O freio de estacionamento eletrônico torna-se inoperante por falha elétrica. Problema recorrente em Q7 acima de 100.000 km.' },
    ],
    MANUTENCAO: [],
  },

  // Audi TT — 8J (2006-2014), motor 2.0 TFSI
  // DEVE ser o último modelo Audi no objeto pois "tt" é substring de "quattro"
  TT: {
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Tensor da corrente de distribuição',  yearRange: { from: 2006, to: 2014 },
        body: 'O tensor da corrente de distribuição do motor 2.0 TFSI falha, podendo causar ruptura da corrente e dano catastrófico ao motor. Barulho metálico ao ligar é sinal de alerta — troca preventiva antes dos 80.000 km.' },
      { severity: 'WARN',   title: 'Consumo de óleo 2.0 TFSI',            yearRange: { from: 2006, to: 2014 },
        body: 'Os primeiros motores 2.0 TFSI do TT (pré-2010) são especialmente propensos ao consumo excessivo de óleo. Mesmo problema dos anéis do pistão que afeta A4 B8 e A5 B8.' },
      { severity: 'WARN',   title: 'DSG mecatrônica com hesitação',       yearRange: { from: 2006, to: 2014 },
        body: 'A unidade mecatrônica do câmbio DSG de 2ª geração falha causando hesitação e caça nas trocas. Recondicionamento custa R$ 5.000+.' },
      { severity: 'WARN',   title: 'Bomba d\'água com desgaste',          yearRange: { from: 2006, to: 2014 },
        body: 'A bomba d\'água falha com o uso causando perda de arrefecimento. Componente de vida útil limitada que deve ser substituído preventivamente a cada 80.000 km.' },
      { severity: 'OK',     title: 'Acúmulo de carbono nas válvulas',     yearRange: { from: 2006, to: 2014 },
        body: 'Injeção direta do TFSI acumula carbono nas válvulas de admissão, causando marcha lenta irregular. Limpeza por "walnut blasting" é necessária a cada 60.000 km.' },
    ],
    MANUTENCAO: [],
  },

  // ── HYUNDAI / OUTROS ─────────────────────────────────────────────────────

  HB20: {
    MACETES: [
      { severity: 'OK',   title: 'Correia dentada',    body: 'Troque a correia dentada a cada 60.000 km ou 5 anos. O HB20 não tem motor interferente, mas o dano ao câmbio é caro.' },
      { severity: 'WARN', title: 'Válvula de respiro', body: 'O coletor do motor 1.0 acumula fuligem pela válvula de respiro. Limpeza a cada 40.000 km evita consumo de óleo elevado.' },
      { severity: 'OK',   title: 'Fluido de freio',    body: 'Troque o fluido de freio a cada 2 anos independente do km. O DOT 3 absorve umidade e perde a capacidade de fervura.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Válvula PCV entupida',             yearRange: { from: 2012 },
        body: 'A válvula PCV entope com frequência, gerando consumo de óleo elevado e fumaça azulada. Troque a cada 30.000 km.' },
      { severity: 'WARN',   title: 'Mola dianteira frágil 2013–2016', yearRange: { from: 2013, to: 2016 },
        body: 'As molas dianteiras do HB20 2013–2016 são frágeis. Ao ouvir estralo na suspensão, inspecione imediatamente.' },
      { severity: 'OK',     title: 'Trava elétrica da porta',
        body: 'Falha na trava elétrica da porta do motorista comum após 3 anos de uso. Problema no atuador elétrico.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Correia dentada', body: 'Troca a cada 60.000 km ou 5 anos. O motor é de interferência em algumas versões — confirme no manual.' },
      { severity: 'OK',   title: 'Vela de ignição', body: 'Troca a cada 30.000 km. Use NGK ou Bosch originais. Velas inadequadas causam partida difícil no frio.' },
      { severity: 'WARN', title: 'Embreagem',       body: 'O disco de embreagem do HB20 manual dura entre 60–80.000 km com uso urbano. Teste ao sentir escorregamento.' },
    ],
  },

  // ── TOYOTA ───────────────────────────────────────────────────────────────────

  Corolla: {
    MACETES: [
      { severity: 'OK',   title: 'Óleo 0W20 sintético — gerações 2019+',  body: 'O motor M20A (2019+) exige 0W20 sintético. Gerações 2015–2018 (3ZR-FAE) aceitam 5W30 sintético. Use a viscosidade correta — óleo mais grosso prejudica o VVT-i.' },
      { severity: 'OK',   title: 'Velas de iridium — 100.000 km',          body: 'Velas iridium originais duram até 100.000 km. Não substitua por convencionais — há perda de potência, consumo e eficiência.' },
      { severity: 'WARN', title: 'Fluido do CVT Toyota WS — não é vitalício', body: 'A Toyota classifica o fluido CVT como "vitalício" em alguns mercados, mas no Brasil com calor e uso urbano intenso, troque a cada 60.000 km. Fluido degradado causa solavanco e patinação.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN',   title: 'Consumo de óleo — motor 2ZR-FE',
        yearRange: { from: 2009, to: 2014 },
        body: 'O motor 1.8 2ZR-FE (10ª geração, 2009–2014) consome até 1L de óleo a cada 5.000 km por falha nos anéis do pistão em exemplares de baixo estoque de fábrica. Toyota reconheceu o problema em outros mercados. Verificação semanal do nível é obrigatória.' },
      { severity: 'DANGER', title: 'Bomba de combustível — recall Corolla 1.8T',
        yearRange: { from: 2017, to: 2021 },
        body: 'A Toyota emitiu recall para o Corolla Touring 1.8 turbo 10ª geração (2017–2021): rotor da bomba de combustível racha, reduz o fluxo e pode desligar o motor em movimento. Consulte urgentemente a concessionária Toyota com o chassi do veículo.' },
      { severity: 'WARN',   title: 'Coxim hidráulico do motor — desgaste precoce',
        yearRange: { from: 2017, to: 2021 },
        body: 'O coxim hidráulico dianteiro do motor desgasta antes dos 80.000 km, causando vibração perceptível no câmbio em marcha lenta e ao ligar o A/C. Substituição resolve definitivamente.' },
      { severity: 'WARN',   title: 'Tampa da válvula — trinca pelo calor',
        yearRange: { from: 2015, to: 2018 },
        body: 'A tampa da válvula de plástico do motor 3ZR-FAE trinca com o tempo pelo calor do motor, causando vazamento de óleo. Sintoma: cheiro de óleo queimando e respingo escuro abaixo da tampa. Troca por peça original ou aftermarket em alumínio resolve.' },
      { severity: 'OK',     title: 'Display MID — falha de software',
        yearRange: { from: 2015, to: 2017 },
        body: 'O display de informações do motorista (MID) trava ou exibe dados incorretos. Atualização de software pela concessionária resolve na maioria dos casos sem custo.' },
      { severity: 'WARN',   title: 'CVT — solavanco ao sair do repouso',
        yearRange: { from: 2019 },
        body: 'O câmbio CVT do Corolla 2019+ apresenta solavanco perceptível ao sair do repouso com o motor frio. Comportamento que melhora com fluido trocado dentro do prazo (60.000 km). Aceleração progressiva minimiza o sintoma.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 0W20 sintético — 10.000 km',     body: 'Gerações 2019+: 0W20 sintético API SN/SP. Gerações 2009–2018: 5W30 sintético. Troca a cada 10.000 km ou 12 meses.' },
      { severity: 'OK',   title: 'Velas iridium — 100.000 km',           body: 'Vida útil de 100.000 km. Troca cara mas necessária apenas uma vez. Não substitua por convencionais.' },
      { severity: 'WARN', title: 'Fluido CVT Toyota WS — 60.000 km',    body: 'Troca a cada 60.000 km. Use exclusivamente Toyota WS ou equivalente certificado. Não use ATF genérico.' },
      { severity: 'OK',   title: 'Corrente de distribuição',             body: 'Todos os motores usam corrente — sem troca periódica. Inspecione o tensionador a cada 80.000 km.' },
    ],
  },

  Hilux: {
    MACETES: [
      { severity: 'WARN', title: 'Diesel S10 — obrigatório para o Common Rail', body: 'Use exclusivamente diesel S10 aditivado. O sistema Common Rail do motor 2.8 GD-6 é sensível a combustível contaminado — diesel comum entope injetores em 30.000–50.000 km.' },
      { severity: 'WARN', title: 'DPF — ciclo de estrada mensal obrigatório',   body: 'O filtro de partículas (DPF) precisa de ciclos de alta temperatura para se regenerar. Faça ao menos 30 minutos de rodovia por mês. Ignorar a luz de regeneração leva ao entupimento completo — reparo de R$ 8.000+.' },
      { severity: 'OK',   title: 'Nunca abaixo de 1/4 no tanque',               body: 'A bomba de combustível Denso é refrigerada e lubrificada pelo diesel. Operar abaixo de 1/4 frequentemente superaquece e desgasta a bomba prematuramente.' },
      { severity: 'OK',   title: 'Fluido dos diferenciais — 40.000 km',         body: 'Troque o fluido do diferencial dianteiro e traseiro a cada 40.000 km com GL-5 75W90. Negligência gera ruído progressivo e reparo caro.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Injetores 2.8 GD-6 — entupimento com diesel ruim',
        yearRange: { from: 2016 },
        body: 'Os injetores piezoelétricos do motor 2.8 GD-6 são extremamente sensíveis à qualidade do diesel. Com diesel S500 ou contaminado, entopem entre 30.000–60.000 km. Cada injetor custa R$ 1.500–2.500. Filtro de combustível trocado a cada 20.000 km e diesel S10 são a única prevenção.' },
      { severity: 'WARN',   title: 'DPF — entupimento em uso urbano',
        yearRange: { from: 2016 },
        body: 'O DPF entope com uso predominantemente urbano em percursos curtos, sem atingir temperatura suficiente para a regeneração ativa. Sintoma: luz laranja no painel. Atenda imediatamente em rodovia — demore demais e o DPF trava permanentemente.' },
      { severity: 'WARN',   title: 'Turbo 3.0 D-4D — vazamento de óleo pelo retorno',
        yearRange: { from: 2005, to: 2015 },
        body: 'O turbo do motor 3.0 TDI vaza óleo pelo retorno quando o motor é desligado quente após uso intenso. Deixar em marcha lenta por 2 minutos antes de desligar evita o problema. Vazamento contínuo indica desgaste do retentor do turbo.' },
      { severity: 'WARN',   title: 'Oxidação do chassi traseiro — regiões úmidas',
        yearRange: { from: 2005, to: 2015 },
        body: 'A travessa traseira do chassi da Hilux 7ª geração (2005–2015) corrói severamente em regiões úmidas e costeiras. Inspeção anual por baixo do veículo e aplicação de anticorrosivo são fundamentais.' },
      { severity: 'WARN',   title: 'Diferencial dianteiro — desgaste por fluido negligenciado',
        yearRange: { from: 2005 },
        body: 'O diferencial dianteiro desgasta coroas e satélites quando o fluido não é trocado. Problema documentado em exemplares com mais de 100.000 km sem manutenção do diferencial.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN',   title: 'Correia dentada — 90.000 km',              body: 'Motor 2.8 GD-6: correia dentada interferente. Troca obrigatória a cada 90.000 km ou 4 anos com tensor e bomba d\'água. Motor 3.0 TDI: 100.000 km.' },
      { severity: 'WARN',   title: 'Filtro de combustível — 20.000 km',        body: 'Troque a cada 20.000 km. Diesel de qualidade variável no Brasil exige troca mais frequente. Filtro entupido mata a bomba de alta pressão.' },
      { severity: 'OK',     title: 'Óleo 5W30 diesel API CI-4 — 10.000 km',   body: 'Use sintético ou semissintético 5W30 API CI-4 ou superior. Troca a cada 10.000 km.' },
      { severity: 'WARN',   title: 'Fluido dos diferenciais — 40.000 km',      body: 'GL-5 75W90 nos diferenciais dianteiro e traseiro. Item crítico para quem usa off-road.' },
    ],
  },

  SW4: {
    MACETES: [
      { severity: 'WARN', title: 'Diesel S10 — mesma restrição da Hilux',   body: 'O SW4 usa o mesmo motor 2.8 GD-6 da Hilux. Diesel S10 é obrigatório — injetores piezo sensíveis a combustível contaminado.' },
      { severity: 'WARN', title: 'DPF — ciclo de estrada mensal',            body: 'Mesma necessidade da Hilux: ao menos 30 minutos de rodovia por mês para regenerar o DPF. Atenda imediatamente a luz de regeneração.' },
      { severity: 'OK',   title: 'Fluido dos diferenciais — 40.000 km',     body: 'Troque o fluido dos diferenciais dianteiro e traseiro a cada 40.000 km com GL-5 75W90.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Injetores 2.8 GD-6 — mesmo problema da Hilux',
        yearRange: { from: 2016 },
        body: 'O motor 2.8 GD-6 do SW4 é idêntico ao da Hilux. Injetores piezoelétricos entopem com diesel S500 ou contaminado entre 30.000–60.000 km. Diesel S10 e filtro trocado a cada 20.000 km são obrigatórios.' },
      { severity: 'WARN',   title: 'Compressor do A/C — falha prematura no 4.0 V6',
        yearRange: { from: 2008, to: 2015 },
        body: 'O compressor do ar-condicionado do SW4 com motor 4.0 V6 falha com frequência antes dos 80.000 km em regiões quentes. Sintoma: A/C gelando de forma intermitente e ruído metálico ao acionar. Compressor Denso remanufaturado tem boa relação custo-benefício.' },
      { severity: 'WARN',   title: 'Bucha do braço Panhard traseiro — barulho',
        yearRange: { from: 2005, to: 2015 },
        body: 'A bucha do braço Panhard traseiro desgasta causando barulho e imprecisão na traseira em trocas de faixa. Troca simples com bucha poliuretano de aftermarket resolve e dura mais que a original.' },
      { severity: 'WARN',   title: 'Oxidação do chassi — regiões úmidas',
        yearRange: { from: 2005, to: 2015 },
        body: 'Mesma corrosão do chassi da Hilux 7ª geração. Inspeção anual por baixo do veículo e tratamento anticorrosivo são fundamentais.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN', title: 'Correia dentada 2.8 GD-6 — 90.000 km',    body: 'Motor interferente. Troca obrigatória a cada 90.000 km ou 4 anos com tensor e bomba d\'água.' },
      { severity: 'WARN', title: 'Filtro de combustível — 20.000 km',        body: 'Diesel brasileiro de qualidade variável. Troque a cada 20.000 km para proteger os injetores.' },
      { severity: 'OK',   title: 'Óleo 5W30 diesel CI-4 — 10.000 km',       body: 'Sintético ou semissintético 5W30 API CI-4. Troca a cada 10.000 km.' },
    ],
  },

  Yaris: {
    MACETES: [
      { severity: 'OK',   title: 'Óleo 0W20 sintético',                      body: 'Motor 1.5 2NR-FBE aceita 0W20 sintético conforme manual. Troca a cada 10.000 km.' },
      { severity: 'WARN', title: 'CVT — fluido Toyota WS a cada 60.000 km',  body: 'A Toyota considera o fluido "vitalício" em alguns mercados, mas no Brasil troque a cada 60.000 km. Fluido degradado causa solavanco e hesitação.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'CVT — hesitação em ultrapassagens',
        yearRange: { from: 2018 },
        body: 'O câmbio CVT apresenta hesitação perceptível ao acelerar forte para ultrapassagens. Comportamento inerente ao CVT — aceleração progressiva e fluido em dia minimizam o sintoma.' },
      { severity: 'WARN', title: 'Rolamento superior do amortecedor — ruído em irregularidades',
        yearRange: { from: 2018 },
        body: 'O rolamento superior do amortecedor dianteiro produz ruído tipo "clac" ao passar em irregularidades com menos de 60.000 km. Troca do rolamento (strut bearing) resolve definitivamente — peça de custo baixo.' },
      { severity: 'OK',   title: 'Sistema multimídia — lentidão com uso prolongado',
        yearRange: { from: 2018 },
        body: 'O sistema multimídia fica lento após meses de uso. Reinicialização pelo menu de configurações ou desconectando a bateria por 5 minutos restaura o desempenho temporariamente.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Corrente de distribuição',          body: 'Motor 1.5 usa corrente — sem troca periódica. Inspecione o tensionador a cada 80.000 km.' },
      { severity: 'WARN', title: 'Fluido CVT Toyota WS — 60.000 km', body: 'Use Toyota WS ou equivalente certificado. Nunca use ATF genérico. Troca a cada 60.000 km.' },
      { severity: 'OK',   title: 'Óleo 0W20 sintético — 10.000 km',  body: 'Sintético 0W20 API SN/SP. Troca a cada 10.000 km ou 12 meses.' },
    ],
  },

  Etios: {
    MACETES: [
      { severity: 'OK',   title: 'Óleo 5W30 semissintético',              body: 'Motores 1.3 1NR-FE e 1.5 2NR-FBE aceitam semissintético 5W30. Troca a cada 10.000 km.' },
      { severity: 'WARN', title: 'Pastilhas — vida curta, troque cedo',   body: 'As pastilhas dianteiras do Etios duram apenas 20.000–25.000 km em uso urbano. Troque por marca aftermarket de qualidade (Bosch, Textar) para obter melhor durabilidade.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Pastilhas dianteiras — desgaste acelerado',
        yearRange: { from: 2012, to: 2022 },
        body: 'Uma das reclamações mais frequentes do Etios: pastilhas dianteiras originais duram apenas 20.000–25.000 km em uso urbano intenso. Troca por Bosch ou Textar dobra a vida útil e melhora a performance de frenagem.' },
      { severity: 'WARN', title: 'Bucha da bandeja inferior — barulho em irregularidades',
        yearRange: { from: 2012, to: 2022 },
        body: 'A bucha da bandeja inferior dianteira desgasta antes de 60.000 km em uso urbano com pavimento ruim, causando ruído ao passar em irregularidades e imprecisão na direção. Troca simples e custo baixo.' },
      { severity: 'WARN', title: 'Amortecedor traseiro — barulho com carga',
        yearRange: { from: 2012, to: 2022 },
        body: 'O amortecedor traseiro produz barulho tipo "clac" ao passar em irregularidades, especialmente com passageiros ou carga atrás. Problema documentado em vários exemplares — troca do amortecedor por Monroe ou Cofap resolve.' },
      { severity: 'OK',   title: 'Câmbio manual — duro no frio',
        yearRange: { from: 2012, to: 2022 },
        body: 'O câmbio manual fica difícil de engrenar nos primeiros minutos em temperatura baixa. Comportamento normal do projeto — desaparece após o aquecimento do câmbio.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Corrente de distribuição',          body: 'Motores 1.3 e 1.5 usam corrente — sem troca periódica. Inspecione o tensionador a cada 80.000 km.' },
      { severity: 'OK',   title: 'Óleo 5W30 — 10.000 km',           body: 'Semissintético 5W30 API SN. Troca a cada 10.000 km.' },
      { severity: 'WARN', title: 'Pastilhas dianteiras — 20.000 km', body: 'Troca mais frequente que outros modelos. Use aftermarket de qualidade para economizar no longo prazo.' },
    ],
  },

  'Corolla Cross': {
    MACETES: [
      { severity: 'OK',   title: 'Óleo 0W20 sintético obrigatório',         body: 'Motor 2.0 M20A exige sintético 0W20. Motor híbrido 2ZR-FXE também. Não use óleo mais grosso — prejudica o VVT-i e a eficiência do ciclo Atkinson no híbrido.' },
      { severity: 'OK',   title: 'Modo EV em congestionamentos — híbrido',  body: 'Ative o modo EV em congestionamentos e estacionamentos. Economiza combustível e reduz desgaste do motor a combustão em baixa velocidade.' },
      { severity: 'WARN', title: 'CVT Toyota WS — 60.000 km',               body: 'Fluido CVT Toyota WS não é vitalício no Brasil. Troca a cada 60.000 km. Versão híbrida tem transmissão e-CVT com fluido próprio.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'CVT — solavanco ao sair do repouso',
        yearRange: { from: 2021 },
        body: 'O câmbio CVT do Corolla Cross 2.0 apresenta solavanco ao sair do repouso em aceleração moderada, especialmente com o motor frio. Comportamento que melhora com fluido trocado no prazo. Aceleração progressiva minimiza.' },
      { severity: 'OK',   title: 'Assistente de permanência em faixa — intervenções bruscas',
        yearRange: { from: 2021 },
        body: 'O Lane Tracing Assist intervém bruscamente em estradas com marcações apagadas ou em curvas. Pode ser desativado pelo painel — recomendado em rodovias com marcações precárias.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 0W20 sintético — 10.000 km',     body: 'Sintético 0W20 API SN/SP para todos os motores (2.0 Flex e 1.8 híbrido). Troca a cada 10.000 km.' },
      { severity: 'WARN', title: 'Fluido CVT Toyota WS — 60.000 km',    body: 'Toyota WS exclusivo. Versão híbrida usa fluido e-CVT próprio — consulte o manual para o tipo correto.' },
      { severity: 'OK',   title: 'Corrente de distribuição',             body: 'Motores M20A e 2ZR-FXE usam corrente — sem troca periódica. Inspecione tensionador a cada 80.000 km.' },
    ],
  },

  RAV4: {
    MACETES: [
      { severity: 'OK',   title: 'Óleo 0W20 sintético',                body: 'Motor 2.0 e 2.5 exigem sintético 0W20. Troca a cada 10.000 km.' },
      { severity: 'WARN', title: 'AWD — fluido do diferencial traseiro', body: 'Versões AWD têm diferencial traseiro (acoplamento eletrônico) com fluido próprio. Troca a cada 60.000 km com fluido Toyota especificado.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Acoplamento AWD — barulho em manobras lentas',
        yearRange: { from: 2019 },
        body: 'O acoplamento eletrônico do eixo traseiro produz barulho e trepidação ao manobrar em baixa velocidade com AWD ativo em asfalto. Troca do fluido do acoplamento resolve na maioria dos casos.' },
      { severity: 'OK',   title: 'Sistema multimídia — travamento ocasional',
        yearRange: { from: 2019 },
        body: 'O sistema de infotainment trava ocasionalmente, especialmente com Apple CarPlay wireless. Reinicialização via menu ou desconexão da bateria resolve.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Corrente de distribuição',              body: 'Motores 2.0 e 2.5 usam corrente — sem troca periódica. Inspecione tensionador a cada 80.000 km.' },
      { severity: 'WARN', title: 'Fluido do acoplamento AWD — 60.000 km', body: 'Use fluido Toyota especificado para o diferencial traseiro. Troca a cada 60.000 km.' },
      { severity: 'OK',   title: 'Óleo 0W20 sintético — 10.000 km',      body: 'Sintético 0W20 API SN/SP. Troca a cada 10.000 km.' },
    ],
  },

  Creta: {
    MACETES: [
      { severity: 'OK',   title: 'Motor 2.0 aspirado',       body: 'O motor 2.0 da Creta é mais confiável que o 1.0 turbo. Use óleo 5W30 sintético e troque a cada 10.000 km.' },
      { severity: 'WARN', title: 'Câmbio automático 6v',     body: 'O câmbio automático de 6 velocidades exige troca de fluido a cada 60.000 km. Versões com muito uso urbano, cada 40.000 km.' },
      { severity: 'OK',   title: 'Sensor de estacionamento', body: 'Os sensores traseiros da Creta são sensíveis a sujeira. Limpe o para-choque ao lavar o carro para evitar falsos alarmes.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Motor 1.0 turbo com consumo de óleo', yearRange: { from: 2022 },
        body: 'O motor 1.0 turbo da Creta (geração 2022+) tem relatos de consumo de óleo elevado após 60.000 km. Monitore mensalmente.' },
      { severity: 'WARN',   title: 'Câmbio DCT com solavanco',            yearRange: { from: 2022 },
        body: 'O câmbio de dupla embreagem apresenta solavanco em manobras lentas. Atualização de software melhora parcialmente.' },
      { severity: 'OK',     title: 'Para-choque traseiro deforma no calor', yearRange: { from: 2017, to: 2021 },
        body: 'O plástico do para-choque traseiro da Creta 2017–2021 se deforma com o calor em cidades quentes. Estacionar na sombra ajuda a preservar a forma.' },
    ],
    MANUTENCAO: [],
  },

  // ── BYD ──────────────────────────────────────────────────────────────────

  Dolphin: {
    MACETES: [
      { severity: 'OK',   title: 'Pré-condicionamento da bateria', body: 'Antes de carregar em DC rápido, ative o pré-condicionamento da bateria pelo app para aumentar a velocidade de carga e prolongar a vida útil.' },
      { severity: 'WARN', title: 'Suspensão e lombadas',           body: 'A suspensão traseira do Dolphin é sensível a lombadas e buracos. Reduza a velocidade com antecedência para evitar impactos que afetam amortecedores.' },
      { severity: 'OK',   title: 'Atualizações OTA',               body: 'Mantenha o software atualizado via OTA. As atualizações corrigem bugs do sistema multimídia e podem otimizar a gestão da bateria.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Bateria de 12V falha precocemente',   yearRange: { from: 2023, to: 2025 },
        body: 'Proprietários relatam falha na bateria auxiliar de 12V com menos de 5.000 km, imobilizando o veículo. Alguns casos com vazamento e odor forte. Exija substituição em garantia imediatamente.' },
      { severity: 'WARN',   title: 'Suspensão traseira fundo com facilidade', yearRange: { from: 2023, to: 2025 },
        body: 'A suspensão traseira com eixo de torção bate fundo em lombadas e buracos fundos, especialmente com passageiros atrás. BYD corrigiu a calibração no modelo 2026.' },
      { severity: 'WARN',   title: 'Direção com folga ou ruído',          yearRange: { from: 2023, to: 2025 },
        body: 'Relatos de problemas na coluna de direção com necessidade de substituição. Peças têm prazo de entrega longo nas concessionárias.' },
      { severity: 'OK',     title: 'Conectividade do app intermitente',
        body: 'O aplicativo BYD frequentemente perde conexão com o veículo, impedindo monitoramento remoto e acionamento do ar condicionado. Reiniciar o aplicativo ou o carro resolve temporariamente.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Freios regenerativos',        body: 'Os freios do Dolphin regeneram energia. As pastilhas duram mais que em carros convencionais — inspecione a cada 30.000 km mesmo sem desgaste perceptível.' },
      { severity: 'WARN', title: 'Fluido de freio',             body: 'Troque o fluido de freio a cada 2 anos. Veículos elétricos usam menos o freio mecânico, mas o fluido absorve umidade com o tempo.' },
      { severity: 'OK',   title: 'Pneus — desgaste irregular',  body: 'Verifique o alinhamento e balanceamento a cada 10.000 km. O peso da bateria aumenta o desgaste dos pneus em relação a carros convencionais.' },
    ],
  },

  'Dolphin Mini': {
    MACETES: [
      { severity: 'OK',   title: 'Velocidade máxima de carga',  body: 'O Dolphin Mini aceita até 40 kW em DC. Carregadores rápidos de maior potência são limitados automaticamente pelo sistema.' },
      { severity: 'WARN', title: 'Autonomia real no calor',     body: 'Em cidades quentes com ar-condicionado ligado, a autonomia cai 25–30%. Planeje recargas com margem de segurança.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Suspensão fundo em obstáculos',     yearRange: { from: 2024, to: 2025 },
        body: 'Suspensão traseira bate fundo em lombadas com frequência, gerando impactos violentos e risco de perda de controle. Grupo de proprietários abriu petição de recall. BYD revisou no modelo 2026.' },
      { severity: 'WARN',   title: 'Bateria 12V descarrega inesperadamente', yearRange: { from: 2024 },
        body: 'Falhas na bateria auxiliar de 12V reportadas com poucos km rodados, imobilizando o veículo. Exija substituição em garantia.' },
      { severity: 'OK',     title: 'Limpador de para-brisa ineficiente',
        body: 'O limpador de braço único não cobre adequadamente o para-brisa em chuva forte. Troque a borracha por uma de marca reconhecida (Bosch, Trico) ao primeiro sinal de risco.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Bateria auxiliar 12V',        body: 'Monitore a tensão da bateria auxiliar regularmente. Em elétricos, a falha da 12V pode impedir a partida do sistema de alta tensão.' },
      { severity: 'OK',   title: 'Ar condicionado',             body: 'Limpe o filtro do ar condicionado a cada 15.000 km. O Dolphin Mini usa bomba de calor — mantê-la limpa preserva a eficiência e a autonomia.' },
    ],
  },

  Seal: {
    MACETES: [
      { severity: 'OK',   title: 'Modo One-Pedal',              body: 'Ative o modo one-pedal para regeneração máxima. Em rodovias, reduza a regeneração para evitar travamentos bruscos ao soltar o acelerador.' },
      { severity: 'WARN', title: 'Autonomia em alta velocidade', body: 'A 120–130 km/h, a autonomia real cai para ~350 km (vs. 520 km CLTC anunciados). Planeje paradas de recarga em viagens longas.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Defeitos de fabricação no zero-km',  yearRange: { from: 2023 },
        body: 'Proprietários relatam múltiplos problemas já na entrega: detritos abrasivos no sistema de freios (ruído intenso ao frear), soltas na guarnição do teto e falhas na maçaneta. Concessão deve inspecionar antes da entrega.' },
      { severity: 'WARN',   title: 'Ruído no ar condicionado',           yearRange: { from: 2023 },
        body: 'Rangido metálico no duto de ar do lado do passageiro mesmo com ventilação baixa. As concessionárias reconhecem o problema mas têm dificuldade em localizar a origem. Pode persistir mesmo após reparo.' },
      { severity: 'WARN',   title: 'Autonomia muito abaixo do anunciado', yearRange: { from: 2023 },
        body: 'Autonomia real de 330–380 km contra 520 km CLTC anunciados em condições normais; abaixo de 300 km em velocidades acima de 120 km/h. Diferença significativa em relação ao prometido.' },
      { severity: 'WARN',   title: 'Suspensão com ruídos recorrentes',   yearRange: { from: 2023 },
        body: 'Estalos e batidas na suspensão surgem e retornam mesmo após reparos. As concessionárias reconhecem ser defeito conhecido do modelo.' },
      { severity: 'OK',     title: 'Falha no carregamento indutivo',
        body: 'O carregador por indução do celular apresenta falhas intermitentes. Solução temporária: reposicionar o aparelho no suporte ou usar cabo USB-C.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Pneus Continental originais',  body: 'O Seal usa pneus Continental específicos. Reposição pode ser difícil em algumas cidades — consulte disponibilidade antes de precisar.' },
      { severity: 'WARN', title: 'Freios — inspeção periódica',  body: 'Apesar da frenagem regenerativa reduzir o uso mecânico, inspecione os discos a cada 20.000 km. Detritos nos canais são um problema documentado nesse modelo.' },
    ],
  },

  'Song Plus': {
    MACETES: [
      { severity: 'OK',   title: 'Modo elétrico no trânsito',   body: 'No DM-i, priorize o modo EV em baixa velocidade. O motor a gasolina só entra quando necessário, economizando combustível e reduzindo desgaste.' },
      { severity: 'WARN', title: 'Bateria de tração — temperatura', body: 'Evite carregar a bateria de tração no calor extremo logo após uso intenso. Aguarde o resfriamento para prolongar a vida útil das células.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Falha na bateria de tração DM-i',       yearRange: { from: 2023, to: 2024 },
        body: 'Falha na bateria de tração com menos de 24.000 km, imobilizando o veículo. BYD não tinha baterias reserva em estoque; proprietários ficaram sem carro por meses. Modelo correlato (Qin Plus DM-i) teve recall na China por risco de superaquecimento.' },
      { severity: 'WARN',   title: 'Pastilhas e discos desgastam precocemente', yearRange: { from: 2023 },
        body: 'Desgaste prematuro do sistema de freios relatado a partir de 10.000 km. As concessionárias tendem a negar garantia alegando "mau uso". Documente o uso normal e exija a cobertura.' },
      { severity: 'WARN',   title: 'Sistema multimídia — falhas e atualizações', yearRange: { from: 2023 },
        body: 'Falhas na conectividade do multimídia, impossibilidade de atualizar o sistema OTA e CarPlay sem fio não funcionando. Requer visita à concessionária para intervenção manual.' },
      { severity: 'OK',     title: 'Chave digital NFC difícil de ativar',
        body: 'A chave digital por NFC (celular/smartwatch) frequentemente precisa de múltiplas visitas à concessionária para ser ativada corretamente. Leve o celular e o veículo juntos ao atendimento.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN', title: 'Filtro do motor a gasolina',   body: 'No DM-i, o motor a gasolina funciona em ciclos curtos. Troque o óleo e filtros a cada 10.000 km mesmo com baixo consumo de combustível.' },
      { severity: 'OK',   title: 'Sistema de arrefecimento',     body: 'Verifique o nível e a qualidade do fluido de arrefecimento anualmente. O DM-i usa circuitos separados para motor e bateria — ambos precisam de atenção.' },
    ],
  },

  'Atto 3': {
    MACETES: [
      { severity: 'OK',   title: 'App e conectividade remota',  body: 'O aplicativo BYD pode perder conexão com o veículo. Reiniciar o app ou realizar reset do módulo de conectividade pelo menu do carro geralmente resolve.' },
      { severity: 'WARN', title: 'Carga em alta temperatura',   body: 'Evite cargas DC rápidas sequenciais em dias quentes sem intervalo de resfriamento da bateria. Isso preserva a saúde das células a longo prazo.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN',   title: 'Suspensão com ruídos',                yearRange: { from: 2023 },
        body: 'Proprietários brasileiros relatam barulhos na suspensão dianteira e traseira, especialmente em pisos irregulares. As concessionárias confirmam ser defeito recorrente.' },
      { severity: 'WARN',   title: 'Coluna de direção — atenção ao recall', yearRange: { from: 2023, to: 2024 },
        body: 'Na China, foram chamados ~97.000 unidades por microfissuras no controlador da direção elétrica com risco de curto e aquecimento. A BYD Brasil afirma que as versões nacionais usam componentes diferentes. Confirme com a concessionária se seu veículo está coberto.' },
      { severity: 'OK',     title: 'Multimídia — lentidão e bugs',
        body: 'O sistema Android do multimídia apresenta lentidão e travamentos ocasionais, especialmente com múltiplos apps abertos. Atualizações OTA geralmente melhoram a estabilidade.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Freios regenerativos',        body: 'Inspecione as pastilhas a cada 30.000 km. O Atto 3 usa predominantemente frenagem regenerativa, então as pastilhas mecânicas duram mais.' },
      { severity: 'WARN', title: 'Verificação de recalls',      body: 'Consulte periodicamente o site da DENATRAN/SENATRAN ou a concessionária BYD para verificar se algum recall foi emitido para o seu chassis.' },
    ],
  },

  King: {
    MACETES: [
      { severity: 'OK',   title: 'Modo de condução',            body: 'O BYD King oferece modos Eco, Normal e Sport. No trânsito urbano, o modo Eco reduz o consumo do motor e preserva a bateria de alta tensão.' },
      { severity: 'WARN', title: 'Peso e pressão dos pneus',    body: 'O King é um SUV pesado. Mantenha os pneus sempre na pressão recomendada — pneus subcalibrados aceleram desgaste irregular, problema documentado nesse modelo.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Bandeja de suspensão — defeito recorrente', yearRange: { from: 2023 },
        body: 'A bandeja dianteira de suspensão apresenta defeito crônico, com ruídos e instabilidade mesmo após trocas em garantia. A própria concessionária confirma ser problema recorrente e as peças frequentemente ficam sem estoque.' },
      { severity: 'WARN',   title: 'Desgaste irregular de pneus',               yearRange: { from: 2023 },
        body: 'O desgaste irregular dos pneus está diretamente ligado à geometria de suspensão defeituosa. Verifique o alinhamento periodicamente e documente o padrão de desgaste para embasar reclamação na garantia.' },
      { severity: 'WARN',   title: 'Controle de tração requer calibração',      yearRange: { from: 2023 },
        body: 'O sistema de controle de tração pode precisar de recalibração pelo software da concessionária. Em piso molhado, o sistema pode apresentar respostas inconsistentes.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN', title: 'Suspensão — inspeção frequente',  body: 'Dada a alta incidência de defeitos nas bandejas, inspecione a suspensão a cada 15.000 km e ao primeiro sinal de estralo ou batida.' },
      { severity: 'OK',   title: 'Alinhamento e balanceamento',     body: 'Realize alinhamento e balanceamento a cada 10.000 km ou ao trocar pneus. Essencial para minimizar o desgaste irregular relatado nesse modelo.' },
    ],
  },

  Han: {
    MACETES: [
      { severity: 'OK',   title: 'Pré-condicionamento para carga rápida', body: 'Ative o pré-condicionamento da bateria pelo app antes de chegar a um carregador DC. O Han suporta até 120 kW — a bateria precisa estar na temperatura ideal para atingir essa velocidade.' },
      { severity: 'WARN', title: 'Direção esportiva — desgaste dos pneus', body: 'O Han tem aceleração intensa. A tendência de dirigir agressivamente acelera o desgaste dos pneus traseiros — verifique a calibragem e o estado mensalmente.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Conectividade veicular não funciona na entrega', yearRange: { from: 2024 },
        body: 'Proprietários relatam que a conectividade integrada do veículo (internet embutida) não é ativada na entrega. As concessionárias não têm suporte adequado para ativar o serviço. Exija ativação completa antes de assinar o protocolo de entrega.' },
      { severity: 'OK',   title: 'Multimídia — integração com apps',
        body: 'A integração com Google Maps e outros aplicativos pode apresentar instabilidade. Manter o sistema atualizado via OTA melhora a estabilidade.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Fluido de freio',                body: 'Troque a cada 2 anos. O Han usa frenagem regenerativa, mas o fluido mecânico ainda absorve umidade e precisa de substituição periódica.' },
      { severity: 'WARN', title: 'Bateria de alta tensão — temperatura', body: 'Evite deixar o veículo com bateria acima de 90% por longos períodos estacionado em sol forte. Use o limite de carga de 80% para uso diário.' },
    ],
  },

  // ── CAOA CHERY ───────────────────────────────────────────────────────────

  'Tiggo 2': {
    MACETES: [
      { severity: 'OK',   title: 'Aquecimento antes de rodar',    body: 'O motor Acteco Flex precisa de pelo menos 30 segundos parado antes de engatar a marcha. Evita desgaste prematuro em partidas a frio.' },
      { severity: 'WARN', title: 'Câmbio automático — ponto morto no trânsito', body: 'Em congestionamentos longos, coloque o câmbio em N (neutro). O automático de primeira geração aquece em paradas prolongadas.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Motor apaga em movimento',           yearRange: { from: 2018, to: 2021 },
        body: 'Falhas no sistema de combustível causam desligamento súbito do motor durante a marcha. Veículos afetados de 2018–2021 com motor Acteco 1.5 Flex. Exija diagnóstico do sistema de injeção na concessionária.' },
      { severity: 'WARN',   title: 'Câmbio automático — falha de engate', yearRange: { from: 2018, to: 2021 },
        body: 'Dificuldade para engatar D ou R, solavancos e patinação da transmissão. Problema recorrente na 1ª geração. Troca de câmbio em garantia foi a solução adotada pela CAOA.' },
      { severity: 'WARN',   title: 'Amortecedores com vida curta',        yearRange: { from: 2018, to: 2021 },
        body: 'Amortecedores traseiros falham entre 13.000 e 40.000 km. A garantia cobre apenas 12 meses ou 40.000 km — muitos proprietários arcam com a troca no próprio bolso.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Troca de óleo',         body: 'Use óleo 5W30 sintético. Intervalo de 10.000 km recomendado pelo fabricante, mas com uso de etanol ou cidade quente, prefira 7.500 km.' },
      { severity: 'WARN', title: 'Correia do acessório',   body: 'Inspecione a correia do alternador/ar-condicionado a cada 20.000 km. Troca preventiva recomendada a cada 60.000 km.' },
      { severity: 'OK',   title: 'Filtro de cabine',       body: 'Troque a cada 15.000 km. O sistema de ar condicionado do Tiggo 2 não tem alerta — verifique por cronograma.' },
    ],
  },

  'Tiggo 2 Pro': {
    MACETES: [
      { severity: 'OK',   title: 'Central multimídia — atualização',  body: 'Verifique periodicamente atualizações de firmware da central na concessionária. As atualizações corrigem travamentos e melhoram o CarPlay.' },
      { severity: 'WARN', title: 'Consumo real vs. anunciado',         body: 'O consumo real do 1.0T pode ser 15–20% maior que o INMETRO em uso urbano intenso. Calibre os pneus semanalmente e evite aceleradas bruscas.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Câmbio CVT — solavancos e superaquecimento', yearRange: { from: 2022 },
        body: 'CVT apresenta solavancos em baixa velocidade e aquecimento excessivo em subidas ou trânsito lento. Problema mais frequente em versões 2022–2023. Leve à concessionária ao primeiro sinal.' },
      { severity: 'WARN', title: 'Amortecedores dianteiros desgastam cedo',    yearRange: { from: 2022 },
        body: 'Amortecedores dianteiros com vida útil abaixo do esperado para o segmento. Proprietários relatam necessidade de troca antes de 50.000 km com uso em estradas esburacadas.' },
      { severity: 'OK',   title: 'Central multimídia trava e tela preta',
        body: 'Tela preta e travamentos frequentes na central de entretenimento. Atualização de software via concessionária geralmente resolve. Se persistir, exija substituição da unidade em garantia.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN', title: 'CVT — troca de fluido',   body: 'Troque o fluido do CVT a cada 40.000 km mesmo que o manual não especifique. CVTs sem manutenção do fluido falham prematuramente em climas quentes.' },
      { severity: 'OK',   title: 'Pneus — desgaste',        body: 'Os pneus originais têm durabilidade menor que a média. Calibre semanalmente e faça rodízio a cada 10.000 km.' },
    ],
  },

  'Tiggo 3X': {
    MACETES: [
      { severity: 'OK',   title: 'Uso de gasolina em cidades quentes', body: 'Em regiões com temperatura acima de 35°C, prefira gasolina aditivada para evitar o calor de vaporização no motor Acteco 1.5 aspirado.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Motor apaga em trânsito',                yearRange: { from: 2018, to: 2022 },
        body: 'Motor Acteco 1.5 desliga inesperadamente enquanto o veículo está em movimento — problema idêntico ao Tiggo 2 da mesma geração. Diagnóstico do sistema de injeção eletrônica é obrigatório.' },
      { severity: 'WARN',   title: 'Câmbio automático — engate e patinação',  yearRange: { from: 2018, to: 2022 },
        body: 'Transmissão automática escorrega e trava para engatar D ou R. Falha de projeto herdada do Tiggo 2. Transmissão nova ou recondicionada foi a solução utilizada pelas concessionárias.' },
      { severity: 'WARN',   title: 'Suspensão — ruídos e desgaste prematuro', yearRange: { from: 2018, to: 2022 },
        body: 'Barulhos na suspensão dianteira surgem antes de 30.000 km. Amortecedores e buchas de qualidade inferior ao esperado para o segmento.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo do motor',      body: 'Troca a cada 10.000 km com 5W30 sintético. Motor aspirado tolera pior o óleo degradado em climas quentes — não ultrapasse o prazo.' },
      { severity: 'WARN', title: 'Sistema de freios',  body: 'Inspecione pastilhas a cada 20.000 km. Relatos de desgaste acelerado nas primeiras gerações. Troque por marcas de qualidade (Fremax, Bosch) ao substituir.' },
    ],
  },

  'Tiggo 5X': {
    MACETES: [
      { severity: 'WARN', title: 'DCT — aquecimento em trânsito lento', body: 'O câmbio DCT seco do Tiggo 5X não foi projetado para trânsito urbano pesado. Em engarrafamentos longos, coloque em N. Modelos 2022+ com CVT são mais adequados para cidade.' },
      { severity: 'OK',   title: 'Recall do motor — verifique seu chassi', body: 'Veículos fabricados entre jan–abr/2019 tiveram recall para substituição de balancins do motor 1.5T. Consulte a CAOA com o número do chassi para confirmar se seu veículo foi atendido.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Recall — balancins do motor 1.5T TGDI',   yearRange: { from: 2019, to: 2019 },
        body: 'Recall oficial (março/2021) para veículos fabricados entre jan–abr/2019 (chassi LB000224 a LB001159). Desgaste excessivo dos balancins causa perda de torque, ruído anormal e risco de parada súbita. Leve à concessionária se ainda não realizou.' },
      { severity: 'DANGER', title: 'Falha elétrica — perda de freio e direção', yearRange: { from: 2018, to: 2022 },
        body: 'Falhas no painel elétrico durante a marcha causam endurecimento da direção e perda de assistência de freio. Risco grave de acidente. Ao surgir qualquer alerta elétrico no painel, pare o carro com segurança e chame assistência.' },
      { severity: 'WARN',   title: 'Câmbio DCT — solavanco e superaquecimento', yearRange: { from: 2018, to: 2021 },
        body: 'DCT de embreagem seca apresenta trancos e engasgos em baixa velocidade, especialmente no arranque. Em climas quentes, o superaquecimento acelera o desgaste das embreagens.' },
      { severity: 'WARN',   title: 'CVT — falhas com poucos quilômetros',       yearRange: { from: 2022, to: 2025 },
        body: 'Proprietários do Tiggo 5X com CVT (2022+) relatam falhas de transmissão com menos de 5.000 km. Problema documentado nas primeiras lotes do CVT. Exija diagnóstico se surgir hesitação ou perca de tração.' },
      { severity: 'WARN',   title: 'Bateria 48V hybrid — recall de superaquecimento', yearRange: { from: 2022, to: 2025 },
        body: 'Recall (dez/2025) para versões Hybrid 48V: conexões do terminal da bateria podem causar superaquecimento localizado e risco de incêndio. Verifique com a CAOA se seu chassi está na lista.' },
      { severity: 'WARN',   title: 'Bateria de 12V descarrega inesperadamente',  yearRange: { from: 2018, to: 2022 },
        body: 'Corrente parasita drena a bateria convencional em 2–3 dias parado. Chave de presença (keyless) é apontada como uma das causas. Desative o keyless entry se o carro ficará estacionado por mais de 2 dias.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN', title: 'Fluido do DCT/CVT',          body: 'Troque o fluido da transmissão a cada 40.000 km. Câmbios DCT e CVT da Chery são sensíveis a fluido degradado — manutenção preventiva reduz muito o risco de falha.' },
      { severity: 'OK',   title: 'Filtro de combustível',       body: 'Troque o filtro de combustível a cada 30.000 km. A bomba de combustível da 1ª geração tem pressão abaixo do especificado — filtro limpo minimiza o problema.' },
      { severity: 'WARN', title: 'Sistema de freios — inspeção', body: 'Pastilhas desgastam com rangido a partir de 2.000 km nas primeiras gerações. Inspecione ao ouvir qualquer chiado e troque por marcas premium (Bosch, Fremax).' },
    ],
  },

  'Tiggo 7': {
    MACETES: [
      { severity: 'OK',   title: 'Recall do motor — confirme o seu',    body: 'O Tiggo 7 de fev–mar/2019 (chassi LB000187 a LB000650) faz parte do recall dos balancins. Consulte a CAOA com o chassi antes de qualquer reparo no motor.' },
      { severity: 'WARN', title: 'DCT seco — evite trânsito lento',     body: 'O DCT de 6 velocidades do Tiggo 7 1.5T não é adequado para trânsito congestionado. Ao perceber engasgo ou solavanco no arranque, leve para inspeção antes que o desgaste evolua.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Recall — balancins do motor 1.5T TGDI',   yearRange: { from: 2019, to: 2020 },
        body: 'Recall oficial (março/2021) para chassi LB000187 a LB000650 (fabricação fev–mar/2019). Balancins com desgaste excessivo causam ruído anormal, perda de potência e risco de parada súbita do motor.' },
      { severity: 'WARN',   title: 'DCT — solavanco e desgaste precoce',      yearRange: { from: 2019, to: 2021 },
        body: 'Câmbio DCT de embreagem seca apresenta solavancos crônicos no arranque e em manobras. O design não é adequado para as condições de trânsito urbano brasileiro. Troca por versões com CVT é a solução definitiva.' },
      { severity: 'WARN',   title: 'Coluna de direção — folga e ruído',       yearRange: { from: 2019 },
        body: 'Barulho "toc-toc" transmitido para o volante em pisos irregulares. Troca da caixa de direção é a solução, mas o problema pode reaparecer em alguns casos.' },
      { severity: 'OK',     title: 'Volante — revestimento descasca',
        body: 'O revestimento do volante começa a descascar com menos de 30.000 km em regiões quentes. Problema estético, mas recorrente. Suor das mãos + calor aceleram a degradação do material.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN', title: 'DCT — fluido e inspeção',  body: 'Troque o fluido do DCT a cada 40.000 km. Leve para inspeção ao menor sinal de solavanco ou dificuldade no arranque — diagnóstico precoce evita troca completa.' },
      { severity: 'OK',   title: 'Correia dentada 1.5T',     body: 'Motor 1.5T TGDI usa corrente de distribuição. Inspecione o tensionador a cada 60.000 km. Não há troca de correia como item de manutenção, mas o tensionador pode falhar.' },
    ],
  },

  'Tiggo 7 Pro': {
    MACETES: [
      { severity: 'WARN', title: 'CVT — trânsito lento e temperatura', body: 'Em cidades quentes, o CVT do Tiggo 7 Pro pode superaquecer em engarrafamentos prolongados. Evite uso de A/C máximo junto com trânsito lento por mais de 40 minutos sem pausa.' },
      { severity: 'OK',   title: 'Autonomia híbrida — dados reais',    body: 'As versões Hybrid 48V frequentemente ficam bem abaixo do consumo anunciado. Use os dados do computador de bordo após um tanque completo para ter a referência real do seu uso.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Motor 1.6T — parada súbita em movimento',       yearRange: { from: 2021 },
        body: 'Proprietários relatam desligamento súbito do motor 1.6T GDI durante a marcha, com perda de tração. Falhas no sistema de gerenciamento do motor (ECU) ou combustível são os gatilhos mais frequentes. Ao ocorrer, puxe para o acostamento com segurança.' },
      { severity: 'WARN',   title: 'CVT — falha com poucos quilômetros',            yearRange: { from: 2021 },
        body: 'Falhas de CVT registradas desde a entrega — um caso documentado com apenas 247 km, 8 dias após compra, exigiu 40 dias para reposição da transmissão. Exija teste extensivo antes de assinar a entrega.' },
      { severity: 'DANGER', title: 'Recall bateria 48V Hybrid — risco de incêndio', yearRange: { from: 2022, to: 2025 },
        body: 'Recall (dez/2025) nas versões Hybrid 48V: terminais da bateria de 48V podem superaquecer e causar incêndio. Confirme com a CAOA se o seu chassi está na lista de recall e exija atendimento prioritário.' },
      { severity: 'OK',     title: 'Multimídia — tela preta e CarPlay',
        body: 'Tela da central apaga durante o uso e o CarPlay perde conexão com frequência. Atualizações de firmware pela concessionária melhoram a estabilidade, mas pode ser necessário trocar a unidade em casos recorrentes.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN', title: 'CVT — fluido preventivo',    body: 'Troque o fluido do CVT a cada 40.000 km independente de sintomas. Fluido degradado é a principal causa das falhas precoces documentadas nesse modelo.' },
      { severity: 'OK',   title: 'Sistema híbrido 48V',        body: 'Leve para inspeção da bateria 48V a cada 30.000 km ou anualmente. Baterias de 48V têm vida útil de ciclos limitada e precisam de verificação periódica.' },
    ],
  },

  'Tiggo 8': {
    MACETES: [
      { severity: 'WARN', title: 'Coxim do motor — atenção à garantia', body: 'A CAOA cobre motor e câmbio por 5 anos, mas o coxim do motor NÃO está coberto. Ao surgir vibração excessiva após 40.000 km, o coxim é o primeiro suspeito — verifique antes que danifique componentes adjacentes.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Motor — parada súbita e alertas no painel', yearRange: { from: 2020 },
        body: 'Falhas no sistema do motor causam acendimento de múltiplos alertas no painel e desligamento inesperado. Documentado em diferentes gerações do Tiggo 8. Qualquer alerta de motor deve ser investigado imediatamente.' },
      { severity: 'WARN',   title: 'Coxim do motor — vibração após 40.000 km', yearRange: { from: 2020 },
        body: 'O coxim do motor falha frequentemente após 40.000 km gerando vibração e ruído incômodo. O problema é agravado pelo fato de o coxim não estar coberto pela garantia de 5 anos do motor.' },
      { severity: 'WARN',   title: 'DCT 7 velocidades — falhas com baixo km',  yearRange: { from: 2020 },
        body: 'A transmissão DCT de 7 marchas registra falhas com baixa quilometragem. Solavancos, dificuldade de engate e troca de marcha brusca são os sintomas mais comuns.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN', title: 'DCT 7v — fluido e embreagens',   body: 'Troque o fluido do DCT a cada 40.000 km. O câmbio de 7 marchas do Tiggo 8 exige fluido específico — nunca use ATF genérico sem verificar a especificação da CAOA.' },
      { severity: 'OK',   title: 'Filtro de ar do motor',           body: 'Troque a cada 15.000 km. Em cidades com muito pó ou terra, antecipe para 10.000 km. Motor turbinado é sensível a filtro saturado.' },
      { severity: 'OK',   title: 'Coxins — inspeção periódica',    body: 'Inspecione os coxins do motor a cada 30.000 km. A substituição preventiva aos 60.000 km é mais econômica do que aguardar a falha.' },
    ],
  },

  'Arrizo 5': {
    MACETES: [
      { severity: 'OK',   title: 'Recall do motor — verifique',     body: 'Veículos Arrizo 5 fabricados entre jan–fev/2019 (chassi KA008975 a KA011279) estão no recall dos balancins do motor 1.5T. Confira com a CAOA se já foi realizado.' },
      { severity: 'WARN', title: 'Câmbio — aquecimento preventivo', body: 'O câmbio CVT/automático do Arrizo 5 é sensível ao calor. Em viagens longas com subidas, deixe o câmbio em modo manual para controlar as marchas e evitar superaquecimento.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Recall — balancins do motor 1.5T TGDI', yearRange: { from: 2019, to: 2019 },
        body: 'Recall oficial (março/2021) para chassi KA008975 a KA011279 (fabricação jan–fev/2019). Balancins com desgaste excessivo causam ruído anormal, perda de potência e risco de parada súbita do motor.' },
      { severity: 'WARN',   title: 'Motor — hesitação e perda de potência',  yearRange: { from: 2018, to: 2022 },
        body: 'Motor 1.5T apresenta hesitação no acelerador e perda de potência intermitente. Reprogramação da ECU pela concessionária é a primeira tentativa de correção.' },
      { severity: 'WARN',   title: 'Amortecedores com desgaste precoce',     yearRange: { from: 2018, to: 2022 },
        body: 'Amortecedores traseiros falham antes de 40.000 km, gerando ruído e perda de controle em curvas. Peças de reposição de qualidade superior (Monroe, Sachs) melhoram a durabilidade.' },
      { severity: 'WARN',   title: 'ECU — falhas eletrônicas múltiplas',     yearRange: { from: 2018, to: 2022 },
        body: 'Falhas na ECU causam acendimento de múltiplos alertas e comportamento errático do motor. Casos documentados de veículos com mais de 80 dias em conserto esperando diagnóstico e peças.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Velas de ignição',      body: 'Troque as velas a cada 30.000 km com NGK iridium. O motor 1.5T turbo é sensível a velas desgastadas — detonação e hesitação são sintomas de vela fora do prazo.' },
      { severity: 'WARN', title: 'Corrente de distribuição', body: 'O motor 1.5T TGDI usa corrente. Inspecione o tensor a cada 60.000 km. Ruído metálico na partida a frio é sinal de tensionador desgastado.' },
    ],
  },

  Arrizo6: {
    MACETES: [
      { severity: 'WARN', title: 'Alinhamento — verifique frequentemente', body: 'O Arrizo 6 tem tendência crônica de puxar para a direita, documentada por proprietários e mecânicos. Verifique o alinhamento a cada 10.000 km e exija garantia no serviço.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Freios — pedal duro e falha de assistência', yearRange: { from: 2021 },
        body: 'Falhas no sistema de freios causam pedal extremamente duro e perda de assistência de frenagem, especialmente a frio. Risco real de acidente. Inspecione o servo-freio e o ABS ao menor sinal de comportamento anormal.' },
      { severity: 'WARN',   title: 'Câmbio — solavancos e falha de troca',       yearRange: { from: 2021 },
        body: 'Transmissão com solavancos crônicos ("socos") nas trocas e perda de tração ocasional. Proprietários relatam trocas completas de câmbio com baixa quilometragem.' },
      { severity: 'WARN',   title: 'Tração — puxão crônico para a direita',      yearRange: { from: 2021 },
        body: 'Desvio de trajetória para a direita relatado como problema estrutural em grande parte dos Arrizo 6. Alinhamentos sucessivos não resolvem definitivamente — pode ser problema de geometria de fábrica.' },
      { severity: 'WARN',   title: 'Sensor de ponto cego — falha constante',     yearRange: { from: 2021 },
        body: 'O sensor de ponto cego (BSM) desativa aleatoriamente e exibe alertas de falha constantes. Problema eletrônico no módulo sensor. Leve para diagnóstico com scanner para identificar o código de falha.' },
      { severity: 'WARN',   title: 'Suspensão — ruídos e desgaste',              yearRange: { from: 2021 },
        body: 'Barulhos na suspensão dianteira e traseira com menos de 30.000 km. Em versões híbridas, o peso adicional acelera o desgaste dos amortecedores.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN', title: 'Câmbio — fluido preventivo',   body: 'Troque o fluido do câmbio a cada 40.000 km. Fluido degradado é a causa mais comum dos solavancos crônicos documentados no Arrizo 6.' },
      { severity: 'OK',   title: 'Pastilhas de freio',            body: 'Use pastilhas de qualidade comprovada (Fremax, Bosch) na reposição. As originais são apontadas como de baixa resistência a altas temperaturas.' },
      { severity: 'OK',   title: 'Alinhamento e balanceamento',   body: 'Realize alinhamento e balanceamento a cada 10.000 km. Dado o puxão crônico relatado, o alinhamento frequente é essencial para preservar os pneus.' },
    ],
  },

  // ── MOTOS ─────────────────────────────────────────────────────────────────

  'CG 160': {
    MACETES: [
      { severity: 'OK',   title: 'Regulagem de válvulas',   body: 'A CG 160 pede regulagem de válvulas a cada 8.000 km. O batido metálico em frio é sinal claro de folga excessiva.' },
      { severity: 'OK',   title: 'Tensionador de corrente', body: 'Verifique o tensionador da corrente a cada 10.000 km. O ruído de corrente solta é clássico nesse modelo.' },
      { severity: 'WARN', title: 'Carburador e etanol',     body: 'Nas versões carburadas, o boia entorta com etanol de baixa qualidade. Prefira postos de confiança e faça limpeza anual.' },
      { severity: 'OK',   title: 'Pastilha de freio',       body: 'A pastilha dianteira da CG 160 dura em média 15.000 km em uso urbano. Verifique ao ouvir rangido ao frear.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Corrente fora da tensão correta', yearRange: { from: 2015 },
        body: 'A corrente fora de regulagem pode pular de dente e travar a roda traseira em alta velocidade. Nunca negligencie a manutenção desse item.' },
      { severity: 'WARN',   title: 'Rolamento de roda desgasta cedo', yearRange: { from: 2015 },
        body: 'Rolamentos traseiros costumam desgastar antes de 30.000 km em uso urbano intenso com buracos.' },
      { severity: 'OK',     title: 'Embreagem escorregando',
        body: 'O disco de embreagem começa a escorregar após 40.000 km. Ajuste o cabo antes de trocar o disco.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 10W30',            body: 'Troca a cada 3.000 km ou 6 meses. Use óleo para motos (JASO MA2). Óleo de carro danifica a embreagem molhada.' },
      { severity: 'OK',   title: 'Vela de ignição',       body: 'Troca a cada 6.000 km. Use NGK DR8EA. Vela gasta dificulta a partida e aumenta o consumo de combustível.' },
      { severity: 'WARN', title: 'Regulagem de válvulas', body: 'A cada 8.000 km verifique a folga das válvulas. O batido metálico em frio é sintoma claro de folga excessiva.' },
      { severity: 'OK',   title: 'Filtro de ar',          body: 'Troca a cada 8.000 km. Em estradas de terra, troque a cada 4.000 km. Filtro sujo prejudica muito o motor pequeno.' },
    ],
  },

  'Fazer 250': {
    MACETES: [
      { severity: 'OK',   title: 'Corrente lubrificada', body: 'A corrente da Fazer 250 se estica rápido. Lubrifique a cada 500 km e regule a tensão a cada 5.000 km.' },
      { severity: 'OK',   title: 'Vela de ignição',      body: 'Troque a vela a cada 6.000 km. A NGK CR8E é a recomendada. Vela gasta aumenta o consumo e dificulta a partida a frio.' },
      { severity: 'WARN', title: 'Filtro de ar',         body: 'A vedação do filtro de ar racha com o tempo, permitindo entrada de água e poeira. Inspecione a cada revisão.' },
      { severity: 'OK',   title: 'Cabo de embreagem',   body: 'O cabo perde tensão com o uso. Ajuste a folga de 2 a 3mm conforme o manual a cada 6.000 km.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Corrente fora da tensão — risco de pulo', yearRange: { from: 2015 },
        body: 'A corrente se estica rapidamente e pode pular de dente. Regule a cada 5.000 km sem falta.' },
      { severity: 'WARN',   title: 'Bengala dianteira perde óleo',            yearRange: { from: 2015 },
        body: 'As bengalas perdem óleo após 30.000 km. O retentor é simples de trocar — não ignore o vazamento.' },
      { severity: 'OK',     title: 'Medidor de combustível impreciso',
        body: 'O medidor de nível de combustível é impreciso. A reserva real começa bem antes da indicação no painel.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 10W40',             body: 'Troca a cada 4.000 km. Use JASO MA2 — a embreagem molhada é sensível a óleos sem a certificação.' },
      { severity: 'WARN', title: 'Pneu traseiro',          body: 'O pneu traseiro da Fazer 250 desgasta mais rápido que o dianteiro. Inspecione o perfil a cada 5.000 km.' },
      { severity: 'OK',   title: 'Relação de transmissão', body: 'Inspecione as coroas e pinhão junto com a corrente. Troque o kit completo — trocar só a corrente desgasta as peças novas.' },
    ],
  },

  // ── TROLLER ─────────────────────────────────────────────────────────────────

  'T-4': {
    MACETES: [
      { severity: 'WARN', title: 'Diesel S10 — proteção obrigatória ao Common Rail',  body: 'A T-4 3.0 e 3.2 TDI usa injeção Common Rail com injetores sensíveis. Use sempre diesel S10 aditivado. Diesel comum entope e corrói os injetores — reparo de um injetor 3.2 custa R$ 1.800–3.500.' },
      { severity: 'WARN', title: 'Óleo a cada 5.000 km em uso off-road',              body: 'Em uso off-road intenso (trilhas, lama, subidas), encurte o intervalo de troca de óleo para 5.000 km. O motor trabalha em condições severas e o óleo degrada mais rápido.' },
      { severity: 'OK',   title: 'Verificar fluido da direção semanalmente',           body: 'As mangueiras da direção hidráulica da T-4 envelhecem e vazam. Verifique o nível semanalmente e inspecione as mangueiras visualmente a cada revisão.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Injetores piezoelétricos 3.2 TDI — custo de reparo elevado',
        yearRange: { from: 2012, to: 2021 },
        body: 'Os injetores piezoelétricos do motor 3.2 PUMA (Ford/Bosch) custam R$ 1.800–3.500 cada — são 5 cilindros. Diesel de baixa qualidade ou filtro de combustível entupido acelera o desgaste. Uso exclusivo de diesel S10 e troca do filtro a cada 15.000 km são as únicas formas de prevenção.' },
      { severity: 'WARN',   title: 'Válvula EGR 3.0 Duratorq — entupimento por fuligem',
        yearRange: { from: 2009, to: 2015 },
        body: 'A válvula EGR do motor 3.0 entope com fuligem após 40.000 km de uso off-road, causando perda de potência progressiva e fumaça preta. Limpeza preventiva a cada 40.000 km evita custos maiores.' },
      { severity: 'WARN',   title: 'DPF — entupimento em uso predominantemente urbano',
        yearRange: { from: 2017, to: 2021 },
        body: 'O filtro de partículas (DPF) das versões 2017+ entope quando o veículo é usado quase exclusivamente em cidade a baixa velocidade, sem completar os ciclos de regeneração ativa. Inclua ao menos uma rodovia de 30 minutos por semana para permitir a regeneração.' },
      { severity: 'WARN',   title: 'Parafusos de fixação da carroceria — corrosão severa',
        yearRange: { from: 1997, to: 2021 },
        body: 'A carroceria de fibra de vidro não enferruja, mas os parafusos, brackets e ganchos de fixação ao chassi se corroem severamente, especialmente em regiões úmidas e costeiras. Inspeção e tratamento anticorrosivo anual de todos os fixadores é obrigatória.' },
      { severity: 'WARN',   title: 'Retentores dos diferenciais — vazamento frequente',
        yearRange: { from: 1997, to: 2021 },
        body: 'Os retentores dos diferenciais dianteiro e traseiro vazam com frequência após 60.000 km em uso off-road intenso. Sintoma: mancha de óleo no piso abaixo do diferencial. Substituição simples e custo baixo — não ignore para evitar dano às coroas.' },
      { severity: 'WARN',   title: 'Rótulas e buchas da suspensão — desgaste acelerado em trilhas',
        yearRange: { from: 1997, to: 2021 },
        body: 'As rótulas e buchas da suspensão dianteira (eixo rígido) desgastam rapidamente em uso off-road intenso. Sintoma: imprecisão na direção e ruído ao passar em irregularidades. Inspeção a cada 20.000 km ou após uso intenso em trilhas.' },
      { severity: 'WARN',   title: 'Sistema elétrico — oxidação de conectores',
        yearRange: { from: 1997, to: 2021 },
        body: 'O ambiente semi-aberto da T-4 expõe conectores elétricos à umidade e poeira de trilhas. Conectores oxidados causam falhas intermitentes de sensores e acionamentos. Limpeza anual com spray de contato elétrico e vedação com vaselina técnica nos conectores expostos é preventiva.' },
    ],
    MANUTENCAO: [
      { severity: 'DANGER', title: 'Correia dentada 2.8 TD — 80.000 km',          body: 'Motor MWM/Ford 2.8 interferente. Ruptura destrói cabeçote e pistões. Troca obrigatória a cada 80.000 km ou 4 anos com tensor e bomba d\'água.' },
      { severity: 'DANGER', title: 'Correia dentada 3.0 Duratorq — 100.000 km',   body: 'Motor Ford 3.0 interferente. Troca obrigatória a cada 100.000 km ou 5 anos com tensor e bomba d\'água. Nunca postergue.' },
      { severity: 'OK',     title: 'Motor 3.2 TDI — corrente de distribuição',    body: 'O motor 3.2 PUMA usa corrente de distribuição — sem correia a trocar. Inspecione o tensionador a cada 60.000 km. Ruído metálico a frio indica desgaste.' },
      { severity: 'WARN',   title: 'Filtro de combustível — 15.000 km',           body: 'Troque a cada 15.000 km. Filtro entupido é a causa mais comum de falha nos injetores Common Rail da T-4 3.0 e 3.2.' },
      { severity: 'WARN',   title: 'Fluido dos diferenciais — 30.000 km off-road', body: 'Em uso off-road intenso, troque o fluido dos diferenciais dianteiro e traseiro a cada 30.000 km com GL-5 75W90. Em uso normal, 40.000 km.' },
      { severity: 'OK',     title: 'Óleo 15W40 sintético diesel',                 body: 'Use sintético ou semissintético 15W40 API CI-4 ou superior. Em uso normal: troca a cada 10.000 km. Em off-road intenso: 5.000 km.' },
    ],
  },

  Pantanal: {
    MACETES: [
      { severity: 'OK',   title: 'Óleo 15W40 diesel',                body: 'Motor 3.0 TDI aceita semissintético 15W40. Troca a cada 10.000 km em uso normal, 5.000 km em off-road.' },
      { severity: 'WARN', title: 'Modelo raro — peças com prazo de entrega longo', body: 'O Pantanal foi produzido em baixo volume (2000-2004). Peças específicas podem ter prazo de entrega longo. Mantenha estoque de filtros, correia e retentores.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Correia dentada 3.0 TDI — ruptura destrutiva',
        yearRange: { from: 2000, to: 2004 },
        body: 'Motor 3.0 TDI interferente. A correia dentada deve ser trocada a cada 80.000 km. Ruptura destrói o motor — reparo em veículo raro tem custo elevado e peças difíceis de encontrar.' },
      { severity: 'WARN', title: 'Vazamento de óleo — retentores envelhecidos',
        yearRange: { from: 2000, to: 2004 },
        body: 'Com mais de 20 anos de uso, os retentores de óleo do motor e dos diferenciais estão no limite de vida útil. Inspeção completa e substituição preventiva de todos os retentores é recomendada em qualquer Pantanal com mais de 100.000 km.' },
      { severity: 'OK',   title: 'Fiação — conexões ressecadas por idade',
        yearRange: { from: 2000, to: 2004 },
        body: 'O isolamento da fiação original se resseca e racha com o tempo, especialmente em climas quentes. Inspeção visual da fiação e substituição de trechos comprometidos evita curtos e falhas elétricas.' },
    ],
    MANUTENCAO: [
      { severity: 'DANGER', title: 'Correia dentada 3.0 — 80.000 km',          body: 'Motor interferente. Troca obrigatória com tensor e bomba d\'água. Veículo raro — não arrisque.' },
      { severity: 'WARN',   title: 'Fluido dos diferenciais — 40.000 km',      body: 'GL-5 75W90 nos diferenciais dianteiro e traseiro. Verifique o retentor por vazamentos a cada troca.' },
      { severity: 'OK',     title: 'Óleo 15W40 diesel — 10.000 km',           body: 'Semissintético 15W40 API CI-4. Troca a cada 10.000 km.' },
    ],
  },

  'RF Esport': {
    MACETES: [
      { severity: 'OK',   title: 'Óleo 5W30 semissintético',              body: 'Motor Ford Zetec 2.0 16V aceita semissintético 5W30. Troca a cada 10.000 km.' },
      { severity: 'WARN', title: 'Correia dentada Zetec — atenção ao intervalo', body: 'Motor 2.0 Zetec interferente. Troca obrigatória a cada 60.000 km. A correia é a mesma do Ford Escort/Focus — peça disponível no mercado.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Módulo de injeção — falha a quente',
        yearRange: { from: 1997, to: 2004 },
        body: 'O módulo de injeção eletrônica (ECU) fica próximo ao motor e falha por superaquecimento, causando dificuldade de partida a quente ou desligamento inesperado. Reposicionamento com isolamento térmico ou substituição por módulo reprogramado resolve.' },
      { severity: 'WARN', title: 'Painel dianteiro — infiltração de água',
        yearRange: { from: 1997, to: 2004 },
        body: 'A vedação do painel dianteiro permite infiltração de água no interior durante chuva intensa ou lavagem. Vedação com silicone neutro nas juntas do painel resolve.' },
      { severity: 'OK',   title: 'Caixa de transferência — ruído ao engajar 4x4',
        yearRange: { from: 1997, to: 2004 },
        body: 'A caixa de transferência emite ruído ao engajar o 4x4 quando o fluido está degradado ou ao engajar com o carro em movimento. Troque o fluido a cada 40.000 km e sempre engaje completamente parado.' },
    ],
    MANUTENCAO: [
      { severity: 'DANGER', title: 'Correia dentada Zetec 2.0 — 60.000 km',      body: 'Motor interferente. Ruptura destrói o motor. Troca a cada 60.000 km com tensor e bomba d\'água.' },
      { severity: 'WARN',   title: 'Fluido da caixa de transferência — 40.000 km', body: 'GL-4 75W90 a cada 40.000 km. Fluido degradado causa ruído e dificuldade de engate do 4x4.' },
      { severity: 'OK',     title: 'Óleo 5W30 — 10.000 km',                      body: 'Semissintético 5W30 API SN. Troca a cada 10.000 km.' },
    ],
  },

  'CB 300R': {
    MACETES: [
      { severity: 'OK',   title: 'Óleo 10W30 semissintético', body: 'A CB 300R aceita óleo 10W30 semissintético. Não precisa de sintético full, mas evite mineral — o motor fica mais quente.' },
      { severity: 'WARN', title: 'Bengala dianteira',          body: 'As bengalas dessa geração têm vedação frágil. Ao ver resíduo oleoso, troque os retentores imediatamente.' },
      { severity: 'OK',   title: 'Freio ABS',                 body: 'O ABS é de anel magnético. Mantenha o anel limpo e sem riscos profundos para evitar falha no sistema.' },
    ],
    PROBLEMAS: [],
    MANUTENCAO: [],
  },

  // ── NISSAN ─────────────────────────────────────────────────────────────────

  Kicks: {
    MACETES: [
      { severity: 'OK',   title: 'Óleo semissintético — economia',    body: 'O Kicks 1.6 aceita óleo semissintético 10W30. Não precisa de sintético full — use semissintético de marca confiável para equilibrar custo e proteção.' },
      { severity: 'WARN', title: 'Embreagem — pedal pesado com idade', body: 'A embreagem fica progressivamente mais pesada com o tempo. Sintoma: dificuldade ao colocar o carro em ponto morto em marcha lenta. Troca necessária em média a cada 120.000 km.' },
      { severity: 'OK',   title: 'CVT — dirigir com suavidade',       body: 'O câmbio CVT do Kicks não gosta de acelerações bruscas. Acelere suavemente do repouso para evitar desgaste prematuro das polias e corrente.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Câmbio CVT — falha com hesitação',     yearRange: { from: 2018, to: 2023 },
        body: 'O câmbio CVT apresenta hesitação ao sair do repouso (D) ou ao passar de D para R. Problema documentado em múltiplos exemplares a partir de 40.000 km. Pode indicar desgaste da corrente ou redução de pressão hidráulica.' },
      { severity: 'WARN', title: 'Vazamento de óleo traseiro',           yearRange: { from: 2018 },
        body: 'Retentor traseiro do motor vaza óleo frequentemente a partir de 50.000 km, manchando o local onde o veículo foi estacionado. Troca simples mas recorrente em alguns exemplares — use óleo que atenda à especificação Nissan.' },
      { severity: 'WARN', title: 'Sensor MAP — marcha lenta irregular',  yearRange: { from: 2018, to: 2022 },
        body: 'Sensor MAP (pressão absoluta do coletor) falha entre 60.000–100.000 km, causando marcha lenta irregular e consumo elevado. Diagnóstico por scanner identifica facilmente. Troca custa ~R$ 200–300 e resolve o problema.' },
      { severity: 'OK',   title: 'Suspensão — amortecedor duro',         yearRange: { from: 2018 },
        body: 'A suspensão é propositalmente firme para conforto em estradas esburacadas. Amortecedores começam a degradar após 80.000 km em uso urbano intenso — normal para essa faixa de quilometragem.' },
      { severity: 'WARN', title: 'Rolamento de roda dianteiro',          yearRange: { from: 2018, to: 2021 },
        body: 'Casos isolados de rolamento dianteiro falhando antes de 60.000 km com barulho ronco que aumenta com velocidade. Problema não generalizado, mas monitorar é recomendado em uso intenso.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN', title: 'Fluido do CVT — troca preventiva',      body: 'Troque o fluido do CVT a cada 50.000 km. Fluido degradado é a principal causa da hesitação reportada — troca preventiva garante funcionamento suave.' },
      { severity: 'OK',   title: 'Correia dentada',                       body: 'O motor 1.6 (HR16) usa corrente de distribuição com vida útil esperada de 150.000 km. Inspecione o tensionador a cada 60.000 km para detectar desgaste precoce.' },
      { severity: 'OK',   title: 'Filtro de ar — ambiente urbano',        body: 'Troque a cada 15.000 km em cidades com muito pó. Motor 1.6 é sensível a filtro entupido — mantém o ar mais limpo possível para manter a potência.' },
    ],
  },

  Frontier: {
    MACETES: [
      { severity: 'DANGER', title: 'YD25 — nível de óleo é questão de sobrevivência', body: 'O motor 2.5 TD (YD25DDTi) destrói a biela se o nível de óleo cair. Verifique o nível visualmente toda semana e nunca saia com o nível abaixo do mínimo. Esse motor não avisa — ele quebra.' },
      { severity: 'WARN',   title: 'RPM máximo em subidas — 3.500 rpm',               body: 'Em subidas longas ou com carga pesada, mantenha o motor abaixo de 3.500 rpm. RPM alto com carga é a combinação mais destrutiva para as bielas do YD25.' },
      { severity: 'OK',     title: 'Diesel S10 aditivado — obrigatório',               body: 'Use sempre diesel S10 aditivado. Diesel de baixa qualidade entope os bicos injetores e danifica a bomba de alta pressão do Common Rail.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Motor YD25 — biela dobra com baixo nível de óleo',
        yearRange: { from: 2008, to: 2016 },
        body: 'O motor 2.5 TD YD25DDTi tem bielas de diâmetro reduzido que dobram quando o motor opera com nível de óleo baixo ou óleo degradado. Reparo custa R$ 15.000–25.000. Troca de óleo a cada 5.000 km e verificação semanal do nível são as únicas formas de prevenção.' },
      { severity: 'WARN',   title: 'Intercooler — mangueira colapsa internamente',
        yearRange: { from: 2008, to: 2016 },
        body: 'A mangueira do intercooler colapsa internamente sem apresentar trinca visível por fora, reduzindo a pressão de turbo e causando perda de potência progressiva. Trocar preventivamente a cada 60.000 km.' },
      { severity: 'WARN',   title: 'Diferencial dianteiro — rolamento precoce',
        yearRange: { from: 2008, to: 2023 },
        body: 'O rolamento do diferencial dianteiro falha entre 60.000–80.000 km, especialmente em uso off-road. Sintoma: ronco ao acionar o 4x4. Troca relativamente simples mas frequentemente negligenciada.' },
      { severity: 'WARN',   title: 'Chicote do motor — derretimento pelo escapamento',
        yearRange: { from: 2008, to: 2016 },
        body: 'O chicote de fiação passa próximo ao coletor de escapamento e derrete parcialmente com o tempo. Causa curtos e falhas elétricas intermitentes difíceis de diagnosticar. Afastar e proteger o chicote com manta térmica é preventivo.' },
      { severity: 'WARN',   title: 'Corrosão do assoalho — regiões úmidas',
        yearRange: { from: 1998, to: 2007 },
        body: 'A Frontier da 1ª geração (plataforma D22) apresenta corrosão severa do assoalho e longarinas em regiões úmidas ou costeiras. Inspecionar por baixo anualmente e aplicar anticorrosivo é essencial.' },
    ],
    MANUTENCAO: [
      { severity: 'DANGER', title: 'Óleo YD25 — troca a cada 5.000 km',       body: 'O intervalo do manual (10.000 km) é longo demais para o YD25 no Brasil. Troque a cada 5.000 km com óleo 15W40 sintético API CI-4. Monitorar o nível semanalmente é obrigatório.' },
      { severity: 'WARN',   title: 'Correia dentada YD25 — 100.000 km',       body: 'Motor interferente. Troca obrigatória a cada 100.000 km ou 5 anos, incluindo tensor e bomba d\'água. Ruptura destrói o motor.' },
      { severity: 'WARN',   title: 'Filtro de combustível — 15.000 km',       body: 'Troque a cada 15.000 km. Use sempre diesel S10. Filtro entupido mata a bomba de alta pressão — peça cara e difícil de encontrar.' },
      { severity: 'OK',     title: 'Fluido do diferencial — 40.000 km',       body: 'Troque o fluido do diferencial dianteiro e traseiro a cada 40.000 km com GL-5 75W90. Fundamental para quem usa off-road.' },
    ],
  },

  Versa: {
    MACETES: [
      { severity: 'OK',   title: 'CVT — fluido Jatco NS-2 ou NS-3',      body: 'O câmbio CVT do Versa usa fluido Jatco NS-2 (modelos até 2018) ou NS-3 (2019+). Nunca use ATF genérico — danifica as polias. Troca a cada 40.000 km.' },
      { severity: 'OK',   title: 'Óleo 5W30 semissintético',              body: 'O motor 1.6 HR16 aceita semissintético 5W30. Troca a cada 10.000 km.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'CVT — patinação ao acelerar forte',
        yearRange: { from: 2011, to: 2019 },
        body: 'O câmbio CVT apresenta patinação e hesitação ao acelerar com força, especialmente em ultrapassagens. O problema se acentua com fluido degradado. Troca de fluido a cada 40.000 km e aceleração progressiva minimizam o sintoma.' },
      { severity: 'WARN', title: 'Motor de arranque — falha em dias quentes',
        yearRange: { from: 2011, to: 2019 },
        body: 'O motor de arranque falha prematuramente em cidades quentes, especialmente após 80.000 km. Sintoma: dificuldade na partida a quente. Troca do porta-escovas resolve sem necessidade de trocar o motor de arranque completo.' },
      { severity: 'OK',   title: 'Pastilhas dianteiras — vida curta',
        yearRange: { from: 2011, to: 2023 },
        body: 'As pastilhas dianteiras originais duram apenas 25.000–30.000 km em uso urbano intenso. Troca por marca aftermarket de qualidade (Textar, Bosch) estende a vida em até 40%.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN', title: 'Fluido CVT — 40.000 km obrigatório',   body: 'Fluido Jatco NS-2 (até 2018) ou NS-3 (2019+). Nunca use ATF genérico. Troca a cada 40.000 km — fluido degradado causa patinação e falha prematura.' },
      { severity: 'OK',   title: 'Corrente de distribuição HR16',        body: 'O motor 1.6 HR16 usa corrente — não há correia. Inspecione o tensionador a cada 60.000 km. Vida útil esperada de 150.000 km.' },
      { severity: 'OK',   title: 'Óleo 5W30 — 10.000 km',              body: 'Semissintético 5W30 API SN. Troca a cada 10.000 km ou 12 meses.' },
    ],
  },

  March: {
    MACETES: [
      { severity: 'OK',   title: 'Óleo 5W30 semissintético',              body: 'Motor 1.0 HR10 e 1.6 HR16 aceitam semissintético 5W30. Troca a cada 10.000 km.' },
      { severity: 'WARN', title: 'Direção elétrica — nunca deixar no batente', body: 'Não mantenha o volante virado até o batente por mais de 2 segundos. O módulo da direção elétrica superaquece e pode falhar prematuramente.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Rolamento de roda dianteiro — falha precoce',
        yearRange: { from: 2011, to: 2022 },
        body: 'Alta taxa de falha do rolamento dianteiro antes de 50.000 km, especialmente em cidades com pavimento ruim. Sintoma: ronco que aumenta com a velocidade e piora nas curvas. Uma das reclamações mais frequentes do modelo.' },
      { severity: 'WARN', title: 'Direção elétrica — perda de assistência',
        yearRange: { from: 2016, to: 2022 },
        body: 'O módulo da direção elétrica falha causando perda repentina de assistência, tornando o volante pesado. Problema documentado em vários exemplares. Substituição do módulo é necessária — não tem reparo.' },
      { severity: 'WARN', title: 'Câmbio automático — trocas bruscas',
        yearRange: { from: 2011, to: 2016 },
        body: 'O câmbio automático de 4 velocidades apresenta trocas bruscas ao frear e ao sair do repouso. Troca de fluido ATF a cada 40.000 km e atualização de software pelo dealer atenuam o comportamento.' },
      { severity: 'OK',   title: 'Amortecedor dianteiro — vazamento precoce',
        yearRange: { from: 2011, to: 2022 },
        body: 'Os amortecedores dianteiros começam a vazar entre 60.000–70.000 km em cidades com pavimento ruim. Substituição por marca aftermarket (Monroe, Cofap) tem boa relação custo-benefício.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Corrente HR10/HR16 — sem troca periódica', body: 'Ambos os motores usam corrente de distribuição. Inspecione o tensionador a cada 60.000 km. Vida útil esperada acima de 150.000 km com óleo em dia.' },
      { severity: 'OK',   title: 'Óleo 5W30 — 10.000 km',                   body: 'Semissintético 5W30 API SN. Troca a cada 10.000 km. Motor 1.0 HR10 é especialmente sensível a óleo degradado.' },
      { severity: 'WARN', title: 'Fluido do câmbio automático — 40.000 km', body: 'ATF Nissan ou equivalente a cada 40.000 km. Fluido degradado é a causa das trocas bruscas relatadas.' },
    ],
  },

  Sentra: {
    MACETES: [
      { severity: 'OK',   title: 'Óleo 0W20 sintético — modelos 2014+',  body: 'O motor 2.0 MR20DD (2014–2019) exige óleo sintético 0W20 conforme manual. Modelos anteriores (MR20DE) aceitam 5W30 semissintético.' },
      { severity: 'OK',   title: 'CVT — fluido Jatco NS-3 exclusivo',    body: 'O câmbio CVT do Sentra 2.0 usa fluido Jatco NS-3. Nunca use ATF genérico. Troca a cada 40.000 km.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Junta do cabeçote — vazamento MR20DE',
        yearRange: { from: 2006, to: 2013 },
        body: 'O motor 2.0 MR20DE (2006–2013) apresenta vazamento pela junta do cabeçote entre 80.000–120.000 km. Sintomas: consumo gradual de água sem poça visível e vapor leve no escapamento frio. Diagnóstico por teste de pressão no radiador.' },
      { severity: 'WARN', title: 'CVT — hesitação na 2ª marcha',
        yearRange: { from: 2014, to: 2019 },
        body: 'O câmbio CVT apresenta hesitação e solavanco ao sair da 1ª para a 2ª fase da variação, especialmente em arrancadas moderadas. Problema de calibração — atualização de software pelo dealer atenua. Troca de fluido a cada 40.000 km ajuda.' },
      { severity: 'OK',   title: 'Sensor de temperatura — leitura errática',
        yearRange: { from: 2006, to: 2019 },
        body: 'O sensor de temperatura do líquido de arrefecimento falha causando leitura errada no painel. Motor não superaquece — é falha do sensor. Substituição simples e barata.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN', title: 'Fluido CVT NS-3 — 40.000 km',          body: 'Troca obrigatória a cada 40.000 km com Jatco NS-3. CVT bem mantido dura mais de 200.000 km. Fluido degradado causa hesitação e falha prematura.' },
      { severity: 'OK',   title: 'Óleo 0W20 sintético (2014+)',          body: 'Motor MR20DD exige 0W20 sintético. Use marca confiável e troque a cada 10.000 km. Não use óleo mais grosso que o especificado.' },
      { severity: 'OK',   title: 'Velas de ignição — iridium',           body: 'Troca a cada 60.000 km. Use NGK Iridium para melhor eficiência. Não substitua por velas convencionais.' },
    ],
  },

  Livina: {
    MACETES: [
      { severity: 'WARN', title: 'Correia do A/C — monitorar sempre',    body: 'A correia do compressor de A/C tem vida curta e, quando rompe, pode ser sugada para dentro do motor. Inspecione visualmente a cada 10.000 km e troque a cada 30.000 km preventivamente.' },
      { severity: 'OK',   title: 'Óleo 5W30 semissintético',              body: 'Motores 1.6 HR16 e 1.8 MR18 aceitam semissintético 5W30. Troca a cada 10.000 km.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Correia do compressor A/C — ruptura e dano ao motor',
        yearRange: { from: 2006, to: 2016 },
        body: 'A correia do compressor de A/C tem vida curta (30.000–40.000 km) e, quando rompe, pode ser sugada pelo motor causando danos severos. Troca preventiva é obrigatória.' },
      { severity: 'WARN', title: 'Sonda lambda — falha frequente',
        yearRange: { from: 2006, to: 2013 },
        body: 'A sonda lambda (sensor de oxigênio) falha com frequência, causando aumento de consumo, marcha lenta irregular e acendimento da luz do motor. Códigos P0135 ou P0141 no scanner. Troca com peça de reposição nacional resolve.' },
      { severity: 'OK',   title: 'Suspensão traseira — barulho de bucha',
        yearRange: { from: 2006, to: 2016 },
        body: 'As buchas do eixo traseiro semi-independente desgastam causando barulho em irregularidades e imprecisão direcional. Troca simples e frequente após 60.000 km em uso urbano.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN', title: 'Correia do A/C — 30.000 km',           body: 'Troca preventiva a cada 30.000 km. Inspecione em cada revisão. Ruptura pode ser catastrófica para o motor.' },
      { severity: 'OK',   title: 'Corrente de distribuição HR16/MR18',   body: 'Ambos os motores usam corrente. Inspecione tensionador a cada 60.000 km. Vida útil acima de 150.000 km com óleo em dia.' },
      { severity: 'OK',   title: 'Óleo 5W30 — 10.000 km',              body: 'Semissintético 5W30 API SN. Troca a cada 10.000 km ou 12 meses.' },
    ],
  },

  Tiida: {
    MACETES: [
      { severity: 'OK',   title: 'Óleo 5W30 semissintético',             body: 'Motor 1.8 MR18 aceita semissintético 5W30. Troca a cada 10.000 km.' },
      { severity: 'WARN', title: 'Câmbio automático — troca de fluido essencial', body: 'O câmbio automático de 4 velocidades é sensível à qualidade do fluido. Troca de ATF a cada 40.000 km previne os solavancos relatados.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Câmbio automático — patinação na 3ª marcha',
        yearRange: { from: 2006, to: 2014 },
        body: 'O câmbio automático de 4 velocidades apresenta patinação intermitente na 3ª marcha com fluido degradado ou em temperaturas altas. Troca de fluido ATF a cada 40.000 km resolve na maioria dos casos.' },
      { severity: 'WARN', title: 'Correia dentada MR18 — item crítico',
        yearRange: { from: 2006, to: 2014 },
        body: 'O motor 1.8 MR18 usa correia dentada interferente. Troca obrigatória a cada 80.000 km. Ruptura destrói válvulas e pistões — reparo custa R$ 6.000–10.000.' },
      { severity: 'OK',   title: 'Pastilhas dianteiras — vida curta',
        yearRange: { from: 2006, to: 2014 },
        body: 'As pastilhas dianteiras originais duram apenas 25.000–30.000 km. Troca por Textar ou Bosch prolonga a vida útil e melhora a performance de frenagem.' },
    ],
    MANUTENCAO: [
      { severity: 'DANGER', title: 'Correia dentada MR18 — 80.000 km',  body: 'Motor interferente. Ruptura = motor destruído. Troca obrigatória a cada 80.000 km ou 4 anos com tensor e bomba d\'água.' },
      { severity: 'WARN',   title: 'Fluido do câmbio automático — 40.000 km', body: 'ATF Nissan ou equivalente a cada 40.000 km. Fluido degradado causa patinação e trocas bruscas.' },
      { severity: 'OK',     title: 'Óleo 5W30 — 10.000 km',            body: 'Semissintético 5W30 API SN. Troca a cada 10.000 km ou 12 meses.' },
    ],
  },

  // ── SUZUKI ──────────────────────────────────────────────────────────────────

  'Grand Vitara': {
    MACETES: [
      { severity: 'OK',   title: 'Óleo 5W30 sintético — J20A',                body: 'O motor 2.0 J20A exige sintético 5W30. Troca a cada 10.000 km. O motor é confiável, mas sensível a óleo degradado em climas quentes.' },
      { severity: 'WARN', title: 'Pneus iguais nos 4 cantos — AWD',            body: 'O sistema AWD do Grand Vitara é sensível a pneus com desgaste desigual. Diferença de circunferência entre eixos danifica o diferencial central. Sempre use os 4 pneus com o mesmo desgaste.' },
      { severity: 'OK',   title: 'Câmbio automático — fluido Dexron III/VI',   body: 'Troque o fluido do câmbio automático a cada 40.000 km com Dexron III ou VI. Câmbio bem mantido dura mais de 200.000 km sem problemas.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Sensor CKP — falha de partida a quente',
        yearRange: { from: 2005, to: 2016 },
        body: 'O sensor de posição do virabrequim (CKP) falha com frequência, causando dificuldade de partida a quente ou falha de partida aleatória. Código P0335 no scanner. Peça de baixo custo e substituição simples.' },
      { severity: 'WARN', title: 'Acoplamento viscoso AWD — trepidação em manobras',
        yearRange: { from: 2005, to: 2016 },
        body: 'O acoplamento viscoso do sistema AWD desgasta causando trepidação ao manobrar em baixa velocidade — sensação de freio aplicado ao virar. Comum após 80.000 km. Substituição do acoplamento é necessária.' },
      { severity: 'WARN', title: 'Bomba d\'água J20A — vazamento precoce',
        yearRange: { from: 2005, to: 2016 },
        body: 'A bomba d\'água do motor J20A perde vedação antes dos 80.000 km em climas quentes. Troca preventiva durante a revisão da correia dentada evita superaquecimento posterior.' },
      { severity: 'OK',   title: 'Fiação — oxidação de conectores',
        yearRange: { from: 1997, to: 2005 },
        body: 'Conectores da fiação do motor se oxidam rapidamente em regiões costeiras ou úmidas, causando falhas elétricas intermitentes difíceis de diagnosticar. Limpeza com contato elétrico e vedação preventiva resolve.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN',   title: 'Correia dentada J20A — 80.000 km',          body: 'Motor interferente. Troca obrigatória a cada 80.000 km ou 4 anos incluindo tensor e bomba d\'água. Ruptura destrói o motor.' },
      { severity: 'OK',     title: 'Óleo 5W30 sintético — 10.000 km',           body: 'Use sintético 5W30 API SN. Troca a cada 10.000 km.' },
      { severity: 'WARN',   title: 'Fluido do diferencial — 40.000 km',         body: 'Troque o fluido do diferencial dianteiro e traseiro a cada 40.000 km com GL-5 75W90. Essencial para manter o AWD funcionando corretamente.' },
    ],
  },

  Jimny: {
    MACETES: [
      { severity: 'DANGER', title: 'Nunca engajar 4x4 com o carro em movimento — Jimny antigo', body: 'O Jimny antigo (até 2013) tem caixa de transferência de engate seco. Engajar o 4x4 com o carro em movimento destrói a caixa. Sempre parar completamente antes de mudar entre 2H e 4H.' },
      { severity: 'OK',     title: 'CVT Jimny Sierra — pausas em off-road intenso',             body: 'O CVT do Jimny Sierra (2021+) aquece em uso off-road prolongado em baixa velocidade. Faça pausas de 5 minutos a cada 30 minutos de off-road intenso para o câmbio resfriar.' },
      { severity: 'OK',     title: 'Óleo 5W30 semissintético',                                   body: 'Motor G13BB (1.3 antigo) e K15B (1.5 novo) aceitam semissintético 5W30. Troca a cada 10.000 km.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Motor G13BB — superaquecimento por correia ou radiador',
        yearRange: { from: 1998, to: 2013 },
        body: 'O motor 1.3 G13BB superaquece facilmente quando a correia dentada está desgastada ou o radiador está parcialmente entupido. Motor pequeno com baixa tolerância ao superaquecimento — troca preventiva da correia a cada 60.000 km é obrigatória.' },
      { severity: 'WARN', title: 'Caixa de transferência — barulho ao engajar 4x4',
        yearRange: { from: 1998, to: 2013 },
        body: 'A caixa de transferência emite barulho metálico ao engajar o 4x4 quando há qualquer movimento do veículo, ou quando o fluido está degradado. Engaje sempre completamente parado e troque o fluido a cada 40.000 km.' },
      { severity: 'WARN', title: 'Rolamento de roda traseira — desgaste em off-road',
        yearRange: { from: 1998, to: 2013 },
        body: 'Os rolamentos das rodas traseiras desgastam rapidamente em uso off-road intenso, especialmente com pneus maiores que o original. Sintoma: ronco traseiro que aumenta com a velocidade.' },
      { severity: 'WARN', title: 'CVT Jimny Sierra — aquecimento em subidas lentas',
        yearRange: { from: 2021 },
        body: 'O CVT do Jimny Sierra (2021+) entra em modo de proteção (limitação de potência) em subidas longas em baixa velocidade com 4WD. Use a marcha baixa da caixa de transferência em subidas exigentes para preservar o CVT.' },
    ],
    MANUTENCAO: [
      { severity: 'DANGER', title: 'Correia dentada G13BB — 60.000 km',        body: 'Motor interferente. Ruptura destrói o motor. Troca obrigatória a cada 60.000 km ou 4 anos com tensor e bomba d\'água.' },
      { severity: 'WARN',   title: 'Fluido da caixa de transferência — 40.000 km', body: 'Troque com GL-4 75W90 a cada 40.000 km. Fluido degradado causa barulho e dificuldade de engate do 4x4.' },
      { severity: 'OK',     title: 'Fluido do diferencial — 40.000 km',        body: 'Diferencial dianteiro e traseiro: GL-5 75W90 a cada 40.000 km. Fundamental para uso off-road.' },
      { severity: 'OK',     title: 'Óleo 5W30 — 10.000 km',                   body: 'Semissintético 5W30 API SN. Troca a cada 10.000 km.' },
    ],
  },

  Vitara: {
    MACETES: [
      { severity: 'OK',   title: 'Óleo 0W20 sintético — motor 1.4 turbo',   body: 'O motor 1.4 BoosterJet Turbo (K14C) exige sintético 0W20 ou 5W30 conforme o manual. Troca a cada 10.000 km. Não use óleo mais grosso que o especificado.' },
      { severity: 'WARN', title: 'Verificar nível de óleo mensalmente',      body: 'O motor 1.4 turbo com injeção direta tem consumo natural de óleo entre 0,5–1L a cada 5.000 km. Monitoramento mensal do nível evita danos por baixo nível.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Motor 1.4 BoosterJet — consumo de óleo',
        yearRange: { from: 2015, to: 2021 },
        body: 'O motor 1.4 turbo com injeção direta apresenta consumo de óleo entre 0,5–1L a cada 5.000 km. Comportamento documentado pela Suzuki como dentro da especificação. Verificação mensal do nível é obrigatória para evitar danos.' },
      { severity: 'WARN', title: 'Injeção direta — depósito de carbono nas válvulas',
        yearRange: { from: 2015, to: 2021 },
        body: 'O motor 1.4 com injeção direta acumula depósito de carbono nas válvulas de admissão após 60.000 km, causando marcha lenta irregular e perda de potência leve. Decarbonização a cada 60.000 km resolve.' },
      { severity: 'WARN', title: 'CVT — aquecimento em trânsito lento e calor',
        yearRange: { from: 2015, to: 2021 },
        body: 'O câmbio CVT aquece em congestionamentos em dias quentes, causando limitação de potência temporária. Troca de fluido a cada 40.000 km com fluido Suzuki CVTf Green 1 é fundamental para minimizar o problema.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Corrente de distribuição K14C',             body: 'Motor 1.4 turbo usa corrente — sem troca periódica. Inspecione tensionador a cada 60.000 km.' },
      { severity: 'WARN', title: 'Fluido CVT Suzuki CVTf Green 1 — 40.000 km', body: 'Use exclusivamente fluido Suzuki CVTf Green 1 ou equivalente certificado. Nunca use ATF genérico. Troca a cada 40.000 km.' },
      { severity: 'OK',   title: 'Óleo sintético 0W20 — 10.000 km',          body: 'Use sintético 0W20 ou 5W30 conforme manual. Troca a cada 10.000 km. Motor turbo exige sintético.' },
    ],
  },

  'S-Cross': {
    MACETES: [
      { severity: 'OK',   title: 'Óleo 5W30 semissintético — motor 1.6',   body: 'Motor 1.6 M16A aceita semissintético 5W30. Troca a cada 10.000 km.' },
      { severity: 'WARN', title: 'CVT — fluido Suzuki CVTf exclusivo',      body: 'O câmbio CVT exige fluido Suzuki CVTf Green 1 ou equivalente certificado. Nunca use ATF genérico. Troca a cada 40.000 km.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'CVT — hesitação ao sair do repouso',
        yearRange: { from: 2013, to: 2023 },
        body: 'O câmbio CVT apresenta hesitação e leve solavanco ao sair do repouso e em acelerações moderadas. Fluido trocado regularmente e aceleração progressiva minimizam o sintoma. Atualização de software pelo dealer pode ajudar.' },
      { severity: 'OK',   title: 'Sensor de estacionamento — ativação falsa',
        yearRange: { from: 2013, to: 2023 },
        body: 'Os sensores de ré ativam falsamente em superfícies com textura irregular. Limpeza dos sensores com pano úmido ou reajuste de sensibilidade pelo dealer resolve temporariamente.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Corrente de distribuição M16A',             body: 'Motor 1.6 M16A usa corrente — sem troca periódica. Inspecione tensionador a cada 60.000 km.' },
      { severity: 'WARN', title: 'Fluido CVT — 40.000 km',                   body: 'Suzuki CVTf Green 1 ou equivalente certificado. Troca a cada 40.000 km.' },
      { severity: 'OK',   title: 'Óleo 5W30 — 10.000 km',                   body: 'Semissintético 5W30 API SN. Troca a cada 10.000 km.' },
    ],
  },

  Swift: {
    MACETES: [
      { severity: 'OK',   title: 'Óleo 5W30 semissintético',                  body: 'Motores 1.3 M13A e 1.6 M16A aceitam semissintético 5W30. Troca a cada 10.000 km.' },
      { severity: 'WARN', title: 'Correia dentada M13A — atenção no intervalo', body: 'O motor 1.3 usa correia dentada interferente. Troca obrigatória a cada 60.000 km. O motor 1.6 usa corrente — sem preocupação.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Correia dentada M13A — ruptura catastrófica',
        yearRange: { from: 2005, to: 2017 },
        body: 'O motor 1.3 M13A é interferente. A correia dentada deve ser trocada a cada 60.000 km — ruptura destrói válvulas e pistões. Custo de reparo em torno de R$ 6.000–10.000. Item mais crítico do Swift 1.3.' },
      { severity: 'WARN', title: 'Câmbio automático — trocas bruscas com fluido degradado',
        yearRange: { from: 2005, to: 2017 },
        body: 'O câmbio automático de 4 velocidades apresenta trocas bruscas e solavancos quando o fluido ATF está degradado. Troca a cada 40.000 km elimina o problema na maioria dos casos.' },
      { severity: 'OK',   title: 'Pastilhas dianteiras — vida curta',
        yearRange: { from: 2005, to: 2017 },
        body: 'As pastilhas dianteiras originais duram apenas 25.000–30.000 km em uso urbano. Troca por Textar ou Bosch prolonga a durabilidade e melhora a performance de frenagem.' },
    ],
    MANUTENCAO: [
      { severity: 'DANGER', title: 'Correia dentada M13A — 60.000 km',        body: 'Motor interferente. Ruptura = motor destruído. Troca obrigatória a cada 60.000 km ou 4 anos com tensor. Motor 1.6 M16A usa corrente — sem troca periódica.' },
      { severity: 'WARN',   title: 'Fluido do câmbio automático — 40.000 km', body: 'ATF Dexron III ou equivalente a cada 40.000 km. Fluido degradado causa trocas bruscas.' },
      { severity: 'OK',     title: 'Óleo 5W30 — 10.000 km',                  body: 'Semissintético 5W30 API SN. Troca a cada 10.000 km.' },
    ],
  },

  SX4: {
    MACETES: [
      { severity: 'OK',   title: 'Óleo 5W30 semissintético',              body: 'Motor 2.0 J20A aceita semissintético 5W30. Troca a cada 10.000 km.' },
      { severity: 'WARN', title: 'AWD — pneus iguais nos 4 cantos',       body: 'O sistema AWD do SX4 é sensível a pneus com circunferências diferentes entre eixos. Use sempre 4 pneus com o mesmo desgaste para não danificar o diferencial.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Acoplamento AWD — desgaste em manobras',
        yearRange: { from: 2006, to: 2014 },
        body: 'O acoplamento do sistema AWD desgasta ao manobrar em baixa velocidade com tração integral ativa em asfalto — causa trepidação similar ao freio aplicado. Desative o AWD em manobras em terreno duro.' },
      { severity: 'WARN', title: 'Correia dentada J20A — item crítico',
        yearRange: { from: 2006, to: 2014 },
        body: 'O motor 2.0 J20A usa correia dentada interferente. Troca obrigatória a cada 80.000 km. Ruptura destrói válvulas e pistões.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN', title: 'Correia dentada J20A — 80.000 km',        body: 'Motor interferente. Troca a cada 80.000 km ou 4 anos com tensor e bomba d\'água.' },
      { severity: 'OK',   title: 'Fluido do diferencial AWD — 40.000 km',   body: 'GL-5 75W90 a cada 40.000 km. Fundamental para manter o AWD funcionando corretamente.' },
      { severity: 'OK',   title: 'Óleo 5W30 — 10.000 km',                  body: 'Semissintético 5W30 API SN. Troca a cada 10.000 km.' },
    ],
  },

  // ── MITSUBISHI ──────────────────────────────────────────────────────────────

  Lancer: {
    MACETES: [
      { severity: 'OK',   title: 'Fluido CVT — Diamond SP-III obrigatório', body: 'O câmbio CVT Jatco JF011E do Lancer exige fluido Mitsubishi Diamond SP-III ou equivalente certificado Jatco. Nunca use ATF genérico — contamina o sistema e acelera a falha das polias.' },
      { severity: 'OK',   title: 'Óleo 5W30 sintético',                     body: 'O motor 2.0 MIVEC (4B11) aceita 5W30 sintético. Troca a cada 10.000 km. Motor sensível a óleo degradado — não postergue.' },
      { severity: 'WARN', title: 'Sensor TPS — aceleração errática',        body: 'O sensor de posição de borboleta (TPS) falha com frequência, causando aceleração irregular e marcha lenta instável. Leitura por scanner revela o código — peça genérica resolve a custo baixo.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'CVT JF011E — falha de polia primária',
        yearRange: { from: 2007, to: 2013 },
        body: 'O câmbio CVT Jatco JF011E é o principal ponto fraco do Lancer no Brasil. A polia primária falha entre 60.000–100.000 km quando o fluido não é trocado regularmente, causando patinação e perda total de tração. Reparo custa R$ 4.000–8.000. Troca de fluido a cada 40.000 km é a única prevenção eficaz.' },
      { severity: 'WARN',   title: 'Compressor do A/C — falha prematura',
        yearRange: { from: 2007, to: 2013 },
        body: 'O compressor do ar-condicionado falha com frequência antes dos 80.000 km. Sintoma: A/C gelando de forma intermitente e ruído metálico ao acionar. Prefira compressor Sanden remanufaturado em vez de genérico Delphi.' },
      { severity: 'WARN',   title: 'Tensionador da corrente — ruído a frio',
        yearRange: { from: 2007, to: 2010 },
        body: 'O tensionador hidráulico da corrente de distribuição emite ruído metálico nos primeiros segundos após a partida a frio, indicando desgaste prematuro. Substituição preventiva evita falha da corrente.' },
      { severity: 'WARN',   title: 'Sensor MAP — marcha lenta irregular',
        body: 'O sensor de pressão do coletor (MAP) falha causando marcha lenta irregular e engasgos leves, especialmente em temperatura alta. Substituição simples com peça genérica a R$ 80–120.' },
    ],
    MANUTENCAO: [
      { severity: 'DANGER', title: 'Fluido CVT — troca a cada 40.000 km',  body: 'Fluido CVT degradado é a principal causa de falha do câmbio JF011E. Use Mitsubishi Diamond SP-III ou Idemitsu K17. Nunca use ATF genérico. Troca a cada 40.000 km sem exceção.' },
      { severity: 'OK',     title: 'Corrente de distribuição',              body: 'O motor 2.0 4B11 usa corrente — não há correia para trocar. Inspecione o tensionador a cada 60.000 km. Ruído metálico a frio é o primeiro sinal de desgaste.' },
      { severity: 'OK',     title: 'Óleo 5W30 sintético — 10.000 km',      body: 'Use sintético 5W30 API SN ou superior. Troca a cada 10.000 km ou 12 meses.' },
    ],
  },

  ASX: {
    MACETES: [
      { severity: 'OK',   title: 'Fluido CVT — mesma regra do Lancer',    body: 'O ASX usa o mesmo câmbio CVT Jatco JF011E do Lancer. Fluido Diamond SP-III é obrigatório a cada 40.000 km. Não use ATF genérico.' },
      { severity: 'WARN', title: 'Fluido do diferencial traseiro (AWC)',   body: 'Versões com tração integral AWC têm diferencial traseiro com fluido próprio (Dia Queen PSF-II). Troca a cada 40.000 km — item frequentemente esquecido nas revisões de concessionária.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'CVT — hesitação na saída do repouso',
        yearRange: { from: 2011, to: 2018 },
        body: 'O câmbio CVT do ASX apresenta hesitação ao sair do repouso, especialmente em subidas. O problema se acentua com fluido degradado. Troca regular do fluido minimiza o sintoma.' },
      { severity: 'WARN', title: 'Sensor do AWC — luz de falha espúria',
        yearRange: { from: 2011 },
        body: 'O sensor do sistema de tração integral AWC falha causando ativação indevida da luz de falha no painel. Problema documentado em vários exemplares — leitura por scanner identifica o código exato.' },
      { severity: 'OK',   title: 'Suspensão traseira — buchas da barra estabilizadora',
        yearRange: { from: 2011 },
        body: 'As buchas e ponteiras da barra estabilizadora traseira falham frequentemente a partir de 50.000 km em uso urbano, causando barulho em curvas. Troca simples e barata.' },
    ],
    MANUTENCAO: [
      { severity: 'DANGER', title: 'Fluido CVT — 40.000 km obrigatório',  body: 'Mesmo câmbio JF011E do Lancer. Fluido Diamond SP-III a cada 40.000 km sem exceção. Principal prevenção contra falha do câmbio.' },
      { severity: 'OK',     title: 'Velas NGK Iridium — 60.000 km',       body: 'Motor 2.0 MIVEC usa velas iridium. Troca a cada 60.000 km. Não substitua por velas convencionais — há perda de potência e eficiência.' },
      { severity: 'OK',     title: 'Fluido AWC a cada 40.000 km',         body: 'Versões AWC: troque o fluido do acoplador traseiro com Dia Queen PSF-II. Fluido degradado causa falha na ativação do 4WD.' },
    ],
  },

  'Pajero Sport': {
    MACETES: [
      { severity: 'OK',   title: 'Pré-aquecimento 4D56 — obrigatório',    body: 'Espere a luz de pré-aquecimento apagar antes de dar a partida no motor 4D56. Partidas forçadas no frio desgastam bronzinas e pistões prematuramente.' },
      { severity: 'WARN', title: 'Resfriamento do turbo após uso intenso', body: 'Nunca desligue o motor imediatamente após uso off-road ou alta rotação. Deixe em marcha lenta por 2 minutos para o turbo resfriar e o óleo circular — previne vazamento pelo retorno.' },
      { severity: 'OK',   title: 'Óleo 15W40 sintético diesel',            body: 'Use sintético ou semissintético 15W40 API CI-4 ou CJ-4. Troca a cada 10.000 km. O motor 4D56 é robusto mas sensível à qualidade do lubrificante.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Bomba injetora Bosch VE — contaminação por limalha',
        yearRange: { from: 2001, to: 2016 },
        body: 'A bomba injetora do motor 4D56 falha catastroficamente nos rolamentos internos após 120.000 km, liberando limalha metálica no sistema de injeção. O reparo exige limpeza completa dos bicos, rail e bomba — custo elevado. Manter o filtro de combustível em dia é a principal prevenção.' },
      { severity: 'WARN',   title: 'Turbo — vazamento de óleo pelo retorno',
        yearRange: { from: 2001, to: 2016 },
        body: 'O turbo do 4D56 vaza óleo pelo retorno quando o motor é desligado quente sem resfriamento adequado. Sintoma: fumaça azul leve no arranque. Deixar em marcha lenta por 2 minutos antes de desligar resolve na maioria dos casos.' },
      { severity: 'WARN',   title: 'Diferencial dianteiro — desgaste de buchas',
        yearRange: { from: 2001, to: 2019 },
        body: 'O diferencial dianteiro consome buchas rapidamente em uso off-road (40.000–60.000 km). Sintoma: barulho e vibração em curvas com 4x4 ativado. Substituição preventiva a cada 40.000 km em uso intenso.' },
      { severity: 'WARN',   title: 'Câmbio automático — solavanco 1ª para 2ª',
        yearRange: { from: 2016, to: 2019 },
        body: 'O câmbio automático do Pajero Sport 2.4 TD (3ª geração) apresenta solavanco ao trocar do 1º para o 2º quando frio. Atualização de firmware da TCU na concessionária atenua o problema.' },
    ],
    MANUTENCAO: [
      { severity: 'DANGER', title: 'Correia dentada 4D56 — 80.000 km obrigatório', body: 'Motor interferente. Ruptura da correia destrói cabeçote e pistões. Troca obrigatória a cada 80.000 km ou 4 anos — inclua tensor, esticador e bomba d\'água na mesma revisão. Nunca postergue.' },
      { severity: 'WARN',   title: 'Filtro de combustível — troca a cada 20.000 km', body: 'Diesel de qualidade variável no Brasil entope filtros rapidamente. Troque a cada 20.000 km (vs. 30.000 do manual) para proteger a bomba injetora.' },
      { severity: 'OK',     title: 'Óleo 15W40 sintético — 10.000 km',               body: 'Use sintético 15W40 API CI-4/CJ-4. Troca a cada 10.000 km. Verifique o nível visualmente a cada abastecimento.' },
    ],
  },

  'Pajero Full': {
    MACETES: [
      { severity: 'OK',   title: 'Óleo 5W30 sintético — respeite o intervalo', body: 'O motor V6 3.5/3.8 (6G74/6G75) é confiável, mas sensível a óleo degradado. Use sintético 5W30 e troque a cada 10.000 km sem exceção.' },
      { severity: 'OK',   title: 'Câmbio INVECS-II — fluido Diamond SP-III',   body: 'O câmbio automático INVECS-II exige fluido Mitsubishi Diamond SP-III. Troca a cada 40.000 km mantém as trocas suaves e prolonga a vida útil.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Sensor de temperatura — oscilação do ponteiro',
        yearRange: { from: 1997, to: 2006 },
        body: 'O sensor de temperatura do motor falha causando oscilação ou leitura errada do ponteiro no painel. O motor não superaquece de fato — é falha do sensor. Substituição resolve definitivamente.' },
      { severity: 'WARN', title: 'Bomba d\'água — perda de vedação precoce',
        yearRange: { from: 1997 },
        body: 'A bomba d\'água do V6 3.5/3.8 perde vedação antes dos 80.000 km em climas quentes. Troca preventiva durante a revisão da correia de acessórios evita superaquecimento posterior.' },
      { severity: 'OK',   title: 'Câmbio — solavanco ao dar ré no frio',
        yearRange: { from: 2007, to: 2015 },
        body: 'O câmbio INVECS-II apresenta solavanco pontual ao engrenar ré com o motor frio. Comportamento normal do projeto — desaparece após o aquecimento.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN', title: 'Correia de acessórios e tensor — 60.000 km', body: 'Troca a cada 60.000 km incluindo tensor e esticador. Ruptura danifica a bomba d\'água e o alternador — inclua a bomba d\'água preventivamente na mesma revisão.' },
      { severity: 'OK',   title: 'Velas V6 — NGK Iridium — 40.000 km',        body: 'O V6 usa 6 velas. Prefira NGK Iridium. Troca a cada 40.000 km.' },
      { severity: 'OK',   title: 'Fluido do câmbio automático — 40.000 km',    body: 'Diamond SP-III a cada 40.000 km. Câmbio INVECS-II bem mantido dura mais de 200.000 km sem problemas.' },
    ],
  },

  'Pajero TR4': {
    MACETES: [
      { severity: 'OK',   title: 'Óleo 5W30 semissintético',       body: 'O motor 2.0 16V (4G63/4G94) aceita semissintético 5W30 — não é necessário sintético full. Troca a cada 10.000 km.' },
      { severity: 'WARN', title: 'Correia dentada — item crítico',  body: 'Motor 2.0 interferente. Troca a cada 60.000 km é obrigatória — ruptura destrói o motor. Inclua tensor na mesma revisão.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Bobina de ignição — falha individual',
        yearRange: { from: 2002, to: 2015 },
        body: 'As bobinas de ignição falham individualmente, causando falha de cilindro, vibração e perda de potência. Teste cada bobina com scanner antes de substituir em grupo — economiza dinheiro.' },
      { severity: 'WARN', title: 'Junta do coletor de admissão — vazamento',
        yearRange: { from: 2002, to: 2010 },
        body: 'A junta do coletor de admissão do motor 4G63/4G94 perde vedação antes dos 80.000 km. Sintomas: pequeno consumo de água e fumaça branca leve no escapamento frio.' },
      { severity: 'OK',   title: 'Braço de controle traseiro — bucha interna',
        yearRange: { from: 2002, to: 2015 },
        body: 'A bucha interna do braço de controle traseiro desgasta rapidamente em uso urbano, causando barulho em irregularidades e trepidação nas freadas. Troca frequente é normal para o modelo.' },
    ],
    MANUTENCAO: [
      { severity: 'DANGER', title: 'Correia dentada 2.0 — 60.000 km',     body: 'Motor interferente. Troca obrigatória a cada 60.000 km ou 4 anos com tensor e bomba d\'água. Ruptura = motor destruído.' },
      { severity: 'OK',     title: 'Óleo semissintético 5W30 — 10.000 km', body: 'Semissintético 5W30 de marca confiável. Troca a cada 10.000 km. Motor não exige sintético full.' },
    ],
  },

  L200: {
    MACETES: [
      { severity: 'OK',   title: 'Pré-aquecimento diesel — obrigatório',       body: 'Sempre aguarde a luz de pré-aquecimento apagar antes de dar a partida. Motor diesel sensível a partidas forçadas no frio — desgasta bronzinas prematuramente.' },
      { severity: 'WARN', title: 'Diesel S10 — proteção ao sistema de injeção', body: 'Use sempre diesel S10 aditivado. O Common Rail do Triton é sensível a combustível contaminado — diesel de baixa qualidade entope injetores e danifica a bomba de alta pressão.' },
      { severity: 'OK',   title: 'Óleo 15W40 sintético diesel',                body: 'Use sintético ou semissintético 15W40 API CI-4/CJ-4. Troca a cada 10.000 km. Verifique o nível a cada abastecimento.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Correia dentada 4M41 — ruptura catastrófica',
        yearRange: { from: 2007, to: 2016 },
        body: 'O motor 3.2 TD (4M41) usa correia dentada interferente. Ruptura destrói cabeçote, válvulas e pistões — reparo custa R$ 15.000–25.000. Troca obrigatória a cada 90.000 km com tensor e bomba d\'água. É o item de segurança número 1 da L200 Triton.' },
      { severity: 'WARN',   title: 'Injetores Common Rail — entupimento por combustível',
        yearRange: { from: 2007, to: 2016 },
        body: 'Os injetores Common Rail do 4M41 entopem com uso de diesel de baixa qualidade. Sintoma: dificuldade de partida, fumaça excessiva e perda de potência. Limpeza por ultrassom a cada 60.000 km é preventiva.' },
      { severity: 'WARN',   title: 'Diferencial traseiro — fluido negligenciado',
        yearRange: { from: 2007 },
        body: 'O diferencial traseiro desgasta coroas e satélites quando o fluido não é trocado. Verificar nível e qualidade a cada 20.000 km é essencial — principalmente em uso off-road.' },
      { severity: 'WARN',   title: 'Bomba da direção hidráulica — vazamento pelo retorno',
        yearRange: { from: 2007, to: 2013 },
        body: 'A bomba da direção hidráulica vaza óleo pelo mangote de retorno após 80.000 km. Sintoma: respingo oleoso abaixo da bomba. Substituição da bomba e do mangote resolve definitivamente.' },
    ],
    MANUTENCAO: [
      { severity: 'DANGER', title: 'Correia dentada — prioridade máxima',    body: 'Motor 4M41: troca a cada 90.000 km. Motor 4N15: troca a cada 100.000 km. Inclua tensor hidráulico, esticador e bomba d\'água. Nunca postergue — ruptura destrói o motor.' },
      { severity: 'WARN',   title: 'Filtro de combustível — 15.000 km',      body: 'Troque a cada 15.000 km. Diesel brasileiro contamina rapidamente os filtros do Common Rail — filtro entupido danifica a bomba de alta pressão.' },
      { severity: 'OK',     title: 'Fluido do diferencial — 4WD e traseiro', body: 'Troca a cada 40.000 km com fluido Mitsubishi GL-5 75W90. Verifique o retentor da coroa traseira para detectar vazamentos.' },
    ],
  },

  Outlander: {
    MACETES: [
      { severity: 'WARN', title: 'CVT em subidas — modo de proteção',     body: 'O câmbio CVT entra em modo de proteção (limitação de potência) em subidas longas com carga. Acelere progressivamente — evite aceleração forte sustentada em aclives.' },
      { severity: 'OK',   title: 'Fluido do acoplador AWD — não esqueça', body: 'O sistema de tração integral do Outlander tem acoplador traseiro com fluido próprio. Troca a cada 40.000 km com fluido Mitsubishi específico — item frequentemente esquecido.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'CVT — superaquecimento em uso intenso',
        yearRange: { from: 2008, to: 2015 },
        body: 'O CVT aquece excessivamente em subidas longas com carga ou em congestionamentos em dias quentes, causando limitação de potência temporária. Troca regular do fluido e condução suave minimizam o problema.' },
      { severity: 'WARN', title: 'Sistema AWD — falha na ativação',
        yearRange: { from: 2008, to: 2020 },
        body: 'O sistema de tração integral falha na ativação intermitentemente. Scanner identifica códigos P0500 ou U0101. Atualização da ECU ou substituição do acoplador elétrico traseiro resolve.' },
      { severity: 'OK',   title: 'Pastilhas dianteiras — vida curta',
        yearRange: { from: 2008, to: 2015 },
        body: 'As pastilhas dianteiras originais têm vida curta (30.000–40.000 km). Troca por marca aftermarket de qualidade (Textar, Brembo) estende a durabilidade em até 50%.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN', title: 'Fluido CVT Diamond SP-III — 40.000 km', body: 'Troca a cada 40.000 km com Diamond SP-III. Fluido degradado é a causa principal de superaquecimento e falha do CVT.' },
      { severity: 'OK',   title: 'Fluido do acoplador AWD — 40.000 km',   body: 'Fluido próprio Mitsubishi. Troca a cada 40.000 km. Fluido degradado causa falha na ativação do 4WD.' },
    ],
  },

  'Eclipse Cross': {
    MACETES: [
      { severity: 'OK',   title: 'Óleo 0W20 sintético — obrigatório', body: 'O motor 1.5 MIVEC Turbo (4B40) exige óleo sintético 0W20 ou 5W20 conforme o manual. Troca a cada 10.000 km.' },
      { severity: 'WARN', title: 'CVT JF016E — fluido NS-3 exclusivo', body: 'O câmbio CVT JF016E exige fluido Jatco NS-3 ou equivalente certificado. Nunca use ATF genérico. Troca a cada 40.000 km.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'CVT — trepidação em manobras lentas',
        yearRange: { from: 2018 },
        body: 'O câmbio CVT apresenta trepidação e solavancos em manobras a baixa velocidade (estacionamento, saída em filas). Problema relatado com frequência — atualização de software da TCU na concessionária atenua o sintoma.' },
      { severity: 'WARN', title: 'Sensores de estacionamento — ativação falsa',
        yearRange: { from: 2018 },
        body: 'Os sensores traseiros de estacionamento ativam falsamente em superfícies planas. Problema de calibração — reajuste via software pelo dealer resolve temporariamente.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo sintético 0W20 — 10.000 km', body: 'Motor turbo exige sintético. Troca a cada 10.000 km ou 12 meses. Não use óleo mais grosso que o especificado.' },
      { severity: 'WARN', title: 'Fluido CVT NS-3 — 40.000 km',     body: 'Use exclusivamente Jatco NS-3 ou equivalente certificado. Troca a cada 40.000 km. Fluido degradado causa trepidação e falha prematura.' },
    ],
  },

  Colt: {
    MACETES: [
      { severity: 'OK', title: 'Óleo 5W30 semissintético', body: 'Motor 1.3 (4A90) e 1.5 (4A91) aceitam semissintético 5W30. Troca a cada 10.000 km.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Câmbio automático — trocas abruptas',
        yearRange: { from: 2006, to: 2013 },
        body: 'O câmbio automático de 4 velocidades apresenta trocas abruptas quando o fluido está degradado. Troca de fluido ATF a cada 40.000 km elimina o problema na maioria dos casos.' },
      { severity: 'OK',   title: 'Sensor TPS — marcha lenta errática',
        yearRange: { from: 2006, to: 2013 },
        body: 'O sensor de posição de borboleta (TPS) falha causando marcha lenta instável. Peça de baixo custo (~R$ 80) com substituição simples.' },
    ],
    MANUTENCAO: [
      { severity: 'DANGER', title: 'Correia dentada — 60.000 km obrigatório', body: 'Os motores 1.3 e 1.5 usam correia dentada interferente. Ruptura destrói o motor. Troca a cada 60.000 km com tensor.' },
      { severity: 'OK',     title: 'Óleo 5W30 — 10.000 km',                  body: 'Semissintético 5W30 de marca confiável. Troca a cada 10.000 km.' },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  // MOTOS
  // ════════════════════════════════════════════════════════════════════════════

  // ── HONDA MOTOS ───────────────────────────────────────────────────────────

  'CG 125': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Carburador entupindo com etanol degradado', yearRange: { from: 1983, to: 2014 },
        body: 'O carburador da CG 125 Fan (versões não injetadas) entope com etanol degradado ou contaminado com água, causando marcha lenta irregular e dificuldade de partida a frio. Limpeza anual preventiva é essencial.' },
      { severity: 'OK', title: 'Escapamento com ferrugem interna', yearRange: { from: 1983, to: 2014 },
        body: 'O tubo do escapamento da CG 125 apodrece internamente pelo acúmulo de condensação, especialmente em motos usadas em percursos curtos. Inspeccione anualmente.' },
    ],
    MANUTENCAO: [],
  },

  'NXR 160 BROS': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Injeção eletrônica sensível ao combustível', yearRange: { from: 2015 },
        body: 'O sistema PGM-FI da Bros 160 apresenta falhas com etanol de procedência duvidosa ou com baixo nível de álcool na mistura. Luz de injeção acende e há perda de potência. Abasteça em postos confiáveis.' },
      { severity: 'OK', title: 'Amortecedor traseiro monoshock — desgaste', yearRange: { from: 2015 },
        body: 'O amortecedor traseiro monoshock perde eficiência em uso off-road ou com sobrecarga. Inspecione a cada 20.000 km e substitua se houver vazamento de óleo ou perda de firmeza.' },
      { severity: 'OK', title: 'Protetor de motor e carenagem frágeis', yearRange: { from: 2015 },
        body: 'A carenagem dianteira da Bros 160 se quebra facilmente em quedas leves. Instalar capa de guidão e protetor de motor aftermarket antes do primeiro uso off-road é altamente recomendável.' },
    ],
    MANUTENCAO: [],
  },

  'XRE 300': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Válvula de cabeçote — regulagem obrigatória', yearRange: { from: 2009 },
        body: 'O motor monocilíndrico DOHC da XRE 300 exige regulagem de válvulas a cada 12.000 km. Omissão gera batida metálica progressiva, perda de compressão e dano ao cabeçote. Custo de reparo preventivo: ~R$ 200.' },
      { severity: 'WARN', title: 'Amortecedor traseiro — perda de pressão', yearRange: { from: 2009 },
        body: 'O amortecedor traseiro hidráulico perde pressão e eficiência após 30.000–40.000 km, gerando instabilidade em trilhas. Troca recomendada por um modelo de melhor qualidade (YSS, Showa).' },
      { severity: 'WARN', title: 'Vedações do garfo dianteiro — vazamento', yearRange: { from: 2009 },
        body: 'As vedações dos garfos teleskópicos dianteiros falham entre 30.000–50.000 km com uso misto (asfalto + terra), causando vazamento de óleo do garfo e perda de amortecimento. Revisão semestral recomendada.' },
      { severity: 'OK', title: 'Pastilha de freio dianteiro — desgaste rápido', yearRange: { from: 2009 },
        body: 'As pastilhas dianteiras originais têm vida útil curta (~8.000–10.000 km) com uso intenso. Substitua por Braking ou EBC para maior durabilidade.' },
    ],
    MANUTENCAO: [],
  },

  'CB 300': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Regulagem de válvulas — 12.000 km', yearRange: { from: 2010 },
        body: 'O motor monocilíndrico da CB 300 (R e Twister) exige regulagem de folga de válvulas a cada 12.000 km. A maioria dos proprietários negligencia e sofre com batidas metálicas e perda de desempenho.' },
      { severity: 'WARN', title: 'Garfo dianteiro — vedação com vazamento', yearRange: { from: 2010, to: 2022 },
        body: 'As vedações do garfo dianteiro da CB 300R (geração 2010–2022) falham entre 30.000–40.000 km, com manchas de óleo visíveis na haste. Revisão preventiva a cada 20.000 km recomendada.' },
      { severity: 'OK', title: 'Corrente de transmissão — kit relação', yearRange: { from: 2010 },
        body: 'O kit relação (corrente, coroa e pinhão) desgasta rapidamente sem lubrificação regular. Lubrificue a cada 500–800 km e troque o kit completo a cada 20.000–25.000 km.' },
    ],
    MANUTENCAO: [],
  },

  'CB 500': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Regulagem de válvulas — custo elevado', yearRange: { from: 2013 },
        body: 'O motor paralelo bicilíndrico da CB 500 F/X requer regulagem de válvulas a cada 16.000 km. Por ser motor de 2 cilindros com DOHC, o processo é mais trabalhoso e caro que um monocilíndrico (~R$ 350–500).' },
      { severity: 'OK', title: 'Vedações do garfo — desgaste normal', yearRange: { from: 2013 },
        body: 'As vedações do garfo dianteiro da CB 500 falham entre 30.000–50.000 km. Óleo escorrendo pela haste do garfo é sinal de substituição imediata das vedações.' },
      { severity: 'OK', title: 'Pinça de freio traseiro — travamento', yearRange: { from: 2013 },
        body: 'A pinça do freio traseiro trava parcialmente em uso urbano intenso com longos períodos sem uso. Limpeza e lubrificação dos êmbolos a cada 20.000 km previne o problema.' },
    ],
    MANUTENCAO: [],
  },

  'PCX': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Motor de arranque — desgaste do motor', yearRange: { from: 2013, to: 2019 },
        body: 'O motor de partida da PCX 150 (geração 2013–2019) sofre desgaste precoce do enrolamento, causando partidas lentas ou falhas de acionamento. Troca do motor de partida (~R$ 350–500) é a solução definitiva.' },
      { severity: 'WARN', title: 'Correia/variador CVT — desgaste acelerado', yearRange: { from: 2013 },
        body: 'A correia de transmissão CVT desgasta aceleradamente com uso urbano intenso (paradas e arrancadas frequentes). Troca recomendada a cada 20.000 km ou antes se houver solavanco na saída.' },
      { severity: 'OK', title: 'Filtro de ar — entupimento em ambiente urbano', yearRange: { from: 2013 },
        body: 'O filtro de ar da PCX entope rapidamente em uso urbano com trânsito intenso. Limpeza a cada 6.000 km e troca a cada 12.000–15.000 km mantém o motor respirando bem.' },
    ],
    MANUTENCAO: [],
  },

  'Biz': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Correia CVT — ruptura antes do prazo', yearRange: { from: 2015 },
        body: 'A correia de transmissão da Biz 125 se rompe prematuramente quando não trocada no intervalo recomendado (a cada 20.000 km). Ruptura em movimento paralisa a moto instantaneamente.' },
      { severity: 'OK', title: 'Rolos do variador — desgaste oval', yearRange: { from: 2015 },
        body: 'Os rolos do variador CVT ficam ovalados após 15.000–20.000 km, causando engajamento brusco e perda de suavidade na aceleração. Troca do kit de rolos (~R$ 80) restaura o funcionamento normal.' },
    ],
    MANUTENCAO: [],
  },

  'Pop 110': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Variador CVT — rolos ovalados', yearRange: { from: 2008 },
        body: 'Os rolos do variador CVT da Pop 110i ovalizam rapidamente em uso urbano com frequentes acelerações bruscas. Troca a cada 15.000–18.000 km é essencial para manter a suavidade de aceleração.' },
      { severity: 'OK', title: 'Filtro de ar e velas sensíveis ao etanol', yearRange: { from: 2008 },
        body: 'O motor monocilíndrico da Pop 110 é sensível à qualidade do etanol. Etanol adulterado causa falhas de combustão, marcha lenta irregular e dificuldade de partida a frio. Use apenas postos de confiança.' },
    ],
    MANUTENCAO: [],
  },

  // ── YAMAHA MOTOS ──────────────────────────────────────────────────────────

  'YBR 125': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Carburador — entupimento com etanol', yearRange: { from: 2000, to: 2016 },
        body: 'O carburador da YBR 125 entope com facilidade quando a moto fica parada por mais de 2 semanas com etanol no tanque. O álcool fermenta e forma verniz nas passagens do carburador. Esvazie o flutuador antes de guardar a moto.' },
      { severity: 'OK', title: 'Amortecedor traseiro com desgaste precoce', yearRange: { from: 2000, to: 2016 },
        body: 'Os amortecedores traseiros duplos da YBR 125 perdem eficiência rapidamente em uso com garupa frequente. Substitua por modelo KYB ou similar a partir de 30.000–40.000 km.' },
    ],
    MANUTENCAO: [],
  },

  'Factor': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Injeção PGM-FI sensível ao combustível ruim', yearRange: { from: 2011 },
        body: 'O sistema de injeção eletrônica da Factor 125i/150 apresenta falhas com etanol de baixa qualidade ou adulterado. Sintomas: marcha lenta instável, dificuldade de partida a frio e acendimento da luz de injeção.' },
      { severity: 'WARN', title: 'Vazamento de óleo pelo respiro do motor', yearRange: { from: 2011 },
        body: 'O respiro do cárter solta névoa de óleo que mancha o motor e o bloco, especialmente após troca com óleo acima do nível máximo. Confirme o nível com a vareta após cada troca.' },
      { severity: 'OK', title: 'Corrente de transmissão — desgaste rápido', yearRange: { from: 2011 },
        body: 'A corrente original da Factor desgasta mais rapidamente que as de marcas equivalentes. Lubrificação a cada 500–800 km e troca do kit relação a cada 20.000–25.000 km são indispensáveis.' },
    ],
    MANUTENCAO: [],
  },

  'Fazer': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Vedações do garfo dianteiro — vazamento', yearRange: { from: 2014 },
        body: 'As vedações do garfo dianteiro da Fazer 150/250 falham entre 25.000–40.000 km, com óleo escorrendo pela haste. Substitua imediatamente ao detectar — garfo com óleo comprometido reduz drasticamente o frenamento dianteiro.' },
      { severity: 'WARN', title: 'Vazamento de óleo no cabeçote', yearRange: { from: 2014 },
        body: 'A junta do cabeçote e as vedações das velas apresentam micro-vazamentos de óleo a partir de 40.000–60.000 km. Visível como mancha escura ao redor da cabeça dos cilindros. Revisão preventiva elimina o problema antes que piore.' },
      { severity: 'OK', title: 'Sensor TPS — marcha lenta irregular', yearRange: { from: 2014 },
        body: 'O sensor de posição da borboleta (TPS) da Fazer 150 perde calibração, causando marcha lenta instável e engasgos leves na aceleração. Reajuste pelo dealer ou troca do sensor (~R$ 150) resolve.' },
    ],
    MANUTENCAO: [],
  },

  'Crosser': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Corrente — desgaste muito acelerado', yearRange: { from: 2014 },
        body: 'A corrente de transmissão da Crosser 150 desgasta significativamente mais rápido que em modelos concorrentes, especialmente com uso misto (asfalto + terra). Lubrificação a cada 400 km e troca do kit relação a cada 15.000–18.000 km em uso off-road.' },
      { severity: 'OK', title: 'Filtro de ar — suja rapidamente em trilhas', yearRange: { from: 2014 },
        body: 'O filtro de ar da Crosser entope muito rapidamente em uso fora de asfalto. Em trilhas, inspecione a cada 1.000–2.000 km e troque a cada 6.000 km em uso misto (vs. 12.000 km em asfalto).' },
    ],
    MANUTENCAO: [],
  },

  'MT-03': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Regulagem de válvulas — intervalo curto e caro', yearRange: { from: 2015 },
        body: 'O motor paralelo bicilíndrico da MT-03 exige regulagem de válvulas a cada 6.000 km de acordo com o manual Yamaha (bem mais curto que os concorrentes). O custo de ~R$ 300–450 por revisão onera o custo de manutenção ao longo da vida da moto.' },
      { severity: 'WARN', title: 'Pneus originais — baixa aderência no molhado', yearRange: { from: 2015 },
        body: 'Os pneus IRC originais da MT-03 têm aderência insatisfatória em piso molhado, especialmente em curvas. A maioria dos proprietários substitui por Pirelli Diablo Rosso ou Michelin Pilot Street Radial logo nas primeiras revisões.' },
      { severity: 'OK', title: 'Proteção do motor — quedas leves causam dano', yearRange: { from: 2015 },
        body: 'Quedas mesmo a baixa velocidade danificam a capa do motor, o suporte do manete e a tampa do alternador. Instale sliders e protetores de manete logo após a compra.' },
    ],
    MANUTENCAO: [],
  },

  'MT-07': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Pinça de freio traseiro — arrasto', yearRange: { from: 2014 },
        body: 'A pinça do freio traseiro da MT-07 trava parcialmente após longos períodos sem uso, causando aquecimento do disco e arrasto. Revisão anual da pinça traseira com limpeza dos êmbolos é essencial.' },
      { severity: 'OK', title: 'Vibração do guidão em 4.000–5.500 rpm', yearRange: { from: 2014, to: 2020 },
        body: 'O motor CP2 (crossplane 270°) transmite vibração perceptível no guidão na faixa de 4.000–5.500 rpm no primeiro modelo (2014–2020). Pesos do guidão aftermarket reduzem significativamente o problema.' },
    ],
    MANUTENCAO: [],
  },

  'Lander': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Carburador — entupimento com etanol parado', yearRange: { from: 2008, to: 2019 },
        body: 'O carburador da Lander 250 (versões não injetadas até 2019) entope quando a moto fica sem uso por mais de 2 semanas com etanol no tanque. A solução definitiva é esvaziar o tanque e o flutuador ao guardar a moto por período prolongado.' },
      { severity: 'WARN', title: 'Vela de ignição sensível à qualidade do etanol', yearRange: { from: 2008 },
        body: 'A vela de ignição da Lander 250 carboniza prematuramente com etanol de baixa qualidade, causando falhas de ignição e dificuldade de partida. Use sempre NGK CPR8EA-9 e troque a cada 8.000 km.' },
      { severity: 'OK', title: 'Suspensão dianteira telescópica — conforto limitado', yearRange: { from: 2008 },
        body: 'A suspensão dianteira telescópica simples da Lander é básica para uma adventure 250. Não tem regulagem de pré-carga e perda de eficiência é notada a partir de 30.000 km. Troca das vedações resolve.' },
    ],
    MANUTENCAO: [],
  },

  'Tenere': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Tanque de combustível — corrosão interna', yearRange: { from: 2011, to: 2020 },
        body: 'O tanque de aço da Ténéré 250 (versões pré-injeção eletrônica) sofre corrosão interna quando etanol fica parado por mais de 3 semanas. Partículas de ferrugem entopem o filtro e o carburador. Tratamento interno preventivo a cada 2 anos é recomendado.' },
      { severity: 'WARN', title: 'Carburador — entupimento crônico', yearRange: { from: 2011, to: 2020 },
        body: 'Mesmo problema que a Lander: o carburador da Ténéré 250 entope com facilidade com etanol degradado. Limpeza semestral é a solução, ou migração para kit de injeção aftermarket.' },
      { severity: 'OK', title: 'Protetor do motor — ausência de fábrica', yearRange: { from: 2011 },
        body: 'A Ténéré 250 de fábrica não tem protetor de motor. Em uso off-road, pedras e galhos danificam o cárter. Instale protetor de motor aftermarket antes do primeiro off-road.' },
    ],
    MANUTENCAO: [],
  },

  'XTZ 700': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Tela do painel sensível a poeira e chuva', yearRange: { from: 2021 },
        body: 'A central de navegação/TFT da Ténéré 700 apresenta falhas de funcionamento por infiltração de poeira e água no conector USB. Proteja a porta USB quando não estiver em uso.' },
      { severity: 'OK', title: 'Freios — pastilhas originais com desgaste médio', yearRange: { from: 2021 },
        body: 'As pastilhas originais da Ténéré 700 têm desempenho adequado, mas vida útil de ~15.000 km em uso misto. Pastilhas Galfer ou Brembo aumentam a durabilidade e o poder de frenagem.' },
    ],
    MANUTENCAO: [],
  },

  // ── KAWASAKI MOTOS ────────────────────────────────────────────────────────

  'Ninja 400': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Cavaquinho metálico em baixa rotação', yearRange: { from: 2018, to: 2020 },
        body: 'Alguns lotes da Ninja 400 (2018–2020) apresentam ruído metálico tipo "cavaquinho" em baixas rotações ao sair do ponto morto. A Kawasaki atualizou o software da injeção em revisões de garantia, com resolução parcial.' },
      { severity: 'OK', title: 'Pneus originais — aderência mediana no molhado', yearRange: { from: 2018 },
        body: 'Os pneus Dunlop SPORTMAX originais têm aderência mediana em piso molhado. Substitua por Pirelli Diablo Rosso III ou Michelin Road 5 para melhor segurança em condições adversas.' },
    ],
    MANUTENCAO: [],
  },

  'Ninja 650': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Bomba de combustível — falha intermitente', yearRange: { from: 2017, to: 2020 },
        body: 'Relatos de falha intermitente na bomba de combustível da Ninja 650 (2017–2020) causando perda de potência e falhas de marcha em alta temperatura. A Kawasaki substituiu a unidade em garantia na maioria dos casos.' },
      { severity: 'OK', title: 'Proteção do painel — risco de arranhões', yearRange: { from: 2017 },
        body: 'O painel TFT da Ninja 650 (2017+) risca facilmente com panos inadequados. Use sempre flanela de microfibra úmida para limpeza e aplique película protetora logo após a compra.' },
    ],
    MANUTENCAO: [],
  },

  'Z 400': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Vibração de guidão em média rotação', yearRange: { from: 2019 },
        body: 'O motor paralelo bicilíndrico da Z 400 transmite vibração perceptível no guidão entre 5.000–6.500 rpm — mais acentuada que na Ninja 400 (mesma mecânica) pela posição de guidão naked. Pesos do guidão aftermarket reduzem o problema.' },
      { severity: 'OK', title: 'Slider de proteção — ausente de fábrica', yearRange: { from: 2019 },
        body: 'A Z 400 não vem com sliders de proteção de fábrica. Quedas a baixa velocidade danificam o carenamento, suporte do manete e tampa do alternador. Instale um kit de sliders logo após a compra.' },
    ],
    MANUTENCAO: [],
  },

  'Z 650': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Sistema de freio dianteiro — pressão inconsistente', yearRange: { from: 2017 },
        body: 'A alavanca do freio dianteiro da Z 650 pode apresentar pressão levemente esponjosa após longos períodos sem uso, indicando ar na linha hidráulica. Revisão dos freios com troca do fluido DOT 4 a cada 2 anos mantém a performance.' },
      { severity: 'OK', title: 'Escapamento original — limitado em performance', yearRange: { from: 2017 },
        body: 'O escapamento original da Z 650 é restritivo e limitante para a característica naked da moto. Muitos proprietários trocam por Akrapovic ou Yoshimura logo nas primeiras semanas, o que melhora visualmente e sonoramente a moto.' },
    ],
    MANUTENCAO: [],
  },

  'Z 900': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Vibração excessiva no guidão — 1ª geração', yearRange: { from: 2017, to: 2019 },
        body: 'A Z 900 de primeira geração (2017–2019) apresenta vibração excessiva no guidão entre 4.500–6.000 rpm. A Kawasaki reduziu o problema a partir de 2020 com atualizações nos pesos do guidão e no mapa de injeção. Para as primeiras gerações, pesos aftermarket de guidão são a solução mais eficaz.' },
      { severity: 'OK', title: 'Selim — desconforto em longas distâncias', yearRange: { from: 2017 },
        body: 'O selim original da Z 900 é firme e causa desconforto em viagens acima de 200 km. Substitua por selim Saddlemen Step-up ou adicione espuma viscoelástica aftermarket.' },
    ],
    MANUTENCAO: [],
  },

  'Versys': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Fixações das proteções laterais — fragilidade', yearRange: { from: 2010 },
        body: 'As fixações plásticas das proteções laterais e do bico dianteiro da Versys 650 são frágeis e quebram com facilidade em quedas e traquejo off-road. Reforce os pontos com abraçadeiras de nylon e tenha peças de reposição em viagens longas.' },
      { severity: 'OK', title: 'Freio traseiro com desgaste acelerado', yearRange: { from: 2010 },
        body: 'As pastilhas do freio traseiro da Versys desgastam mais rapidamente que as dianteiras no uso de viagem (frenagem de estabilização em descidas). Inspecione a cada 10.000 km.' },
    ],
    MANUTENCAO: [],
  },

  // ── BMW MOTOS ─────────────────────────────────────────────────────────────

  'R 1200 GS': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Bomba de combustível — falha em alta temperatura', yearRange: { from: 2013, to: 2016 },
        body: 'A bomba de combustível da R 1200 GS LC (2013–2016, motor arrefecido a líquido) falha em alta temperatura ambiente, causando perda de potência gradual e eventual parada do motor. Problema amplamente documentado nos fóruns de GS. Troca preventiva com kit BMW é recomendada acima de 50.000 km.' },
      { severity: 'WARN', title: 'Eixo cardã — desgaste da rótula', yearRange: { from: 2004 },
        body: 'A rótula do eixo cardã da GS desgasta antes do esperado (casos com 50.000–70.000 km), gerando batida ao engrenar e perda de potência na transmissão. Fluido do cardã deve ser trocado a cada 20.000 km para retardar o desgaste.' },
      { severity: 'WARN', title: 'Radiador frontal vulnerável a pedras', yearRange: { from: 2013 },
        body: 'O radiador frontal da R 1200 GS LC é vulnerável a impactos de pedras em off-road e em estradas sem pavimento. Instale protetor de radiador aftermarket (SW-Motech, Wunderlich) antes do primeiro off-road.' },
      { severity: 'OK', title: 'Custo de manutenção elevado fora da garantia', yearRange: { from: 2004 },
        body: 'Velas, filtros de ar e revisões de válvulas da GS boxer têm custo significativamente mais alto que motos equivalentes. Planeje orçamento anual de R$ 2.000–4.000 para manutenção preventiva.' },
    ],
    MANUTENCAO: [],
  },

  'R 1250 GS': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Vazamento de óleo pelo retentor do motor Boxer', yearRange: { from: 2019 },
        body: 'Relatos frequentes de vazamento de óleo pelos retentores externos do motor Boxer (R 1250 GS), especialmente no cilindro esquerdo. A BMW cobre em garantia mas o problema pode reaparecer. Monitore mensalmente.' },
      { severity: 'WARN', title: 'Sistema ASA (câmbio automático) — calibração', yearRange: { from: 2022 },
        body: 'O sistema ASA (Automated Shift Assistant) da R 1250 GS 2022+ apresenta hesitação na troca de marchas em baixas temperaturas. A BMW publicou atualização de software — verifique na concessionária.' },
      { severity: 'OK', title: 'Parabarro traseiro — sujeira no motor', yearRange: { from: 2019 },
        body: 'O parabarro original da R 1250 GS não protege adequadamente o motor e a caixa de câmbio em trilhas lamaceiras. Extensores de parabarro (Touratech, Wunderlich) são acessório fundamental para uso off-road.' },
    ],
    MANUTENCAO: [],
  },

  'F 800 GS': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Vibração característica do bicilíndrico em meia rotação', yearRange: { from: 2008, to: 2016 },
        body: 'O motor bicilíndrico paralelo da F 800 GS transmite vibração perceptível no guidão e nos pedais entre 3.500–5.000 rpm. É uma característica de projeto, mas incomoda em viagens longas. Pesos de guidão aftermarket e manoplas com amortecimento reduzem o efeito.' },
      { severity: 'WARN', title: 'Sensor ABS traseiro — falha com barro', yearRange: { from: 2008, to: 2016 },
        body: 'O sensor de ABS da roda traseira da F 800 GS falha com barro acumulado em uso off-road, ativando a luz de ABS e desabilitando o sistema. Limpeza do sensor após trilhas com alta quantidade de lama é essencial.' },
      { severity: 'OK', title: 'Tampa lateral direita — trava frágil', yearRange: { from: 2008, to: 2016 },
        body: 'A trava da tampa lateral direita (acesso ao filtro de ar) da F 800 GS quebra com facilidade em quedas ou manuseio brusco. Tenha uma trava reserva ou reforce com abraçadeira antes de viagens longas.' },
    ],
    MANUTENCAO: [],
  },

  'F 850 GS': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Corrente de transmissão — vida curta', yearRange: { from: 2018 },
        body: 'A F 850 GS (transmissão por corrente, ao contrário da R 1250 GS) desgasta rapidamente a corrente em uso off-road sem lubrificação adequada. Lubrificação a cada 600 km e troca do kit relação a cada 20.000 km.' },
      { severity: 'OK', title: 'Protetor de motor — necessário imediatamente', yearRange: { from: 2018 },
        body: 'A F 850 GS não tem protetor de motor de série adequado para uso off-road. Instale protetor de alumínio (Hepco & Becker, SW-Motech) antes do primeiro uso fora de asfalto.' },
    ],
    MANUTENCAO: [],
  },

  'S 1000 RR': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Custo de manutenção — revisão de válvulas', yearRange: { from: 2009 },
        body: 'A revisão de válvulas da S 1000 RR a cada 12.000 km custa R$ 3.000–6.000 em concessionária BMW. O motor de alta performance exige ajuste preciso das folgas — negligência causa desgaste prematuro do cabeçote.' },
      { severity: 'WARN', title: 'Pastilhas de freio dianteiro — vida curta em pista', yearRange: { from: 2009 },
        body: 'As pastilhas Brembo originais da S 1000 RR duram apenas 5.000–8.000 km em uso misto (rua + pista). Em uso exclusivo de pista, podem durar apenas 2.000–3.000 km. Mantenha sempre um conjunto reserva.' },
      { severity: 'WARN', title: 'Bomba de água — desgaste após 60.000 km', yearRange: { from: 2009 },
        body: 'A bomba d\'água da S 1000 RR apresenta desgaste do retentor de vedação a partir de 60.000 km, causando micro-vazamento de líquido de arrefecimento. Troca preventiva evita superaquecimento do motor de alta compressão.' },
    ],
    MANUTENCAO: [],
  },

  'G 310': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Superaquecimento em trânsito parado', yearRange: { from: 2018 },
        body: 'O motor monocilíndrico da G 310 GS/R superaquece em engarrafamentos com A/C em dias quentes (temperatura do motor acima de 100°C). Desengaje a embreagem em paradas longas para reduzir o aquecimento.' },
      { severity: 'WARN', title: 'Sistema elétrico — massa deficiente nos primeiros lotes', yearRange: { from: 2018, to: 2020 },
        body: 'Relatos de falhas elétricas nos primeiros lotes da G 310 (2018–2020), incluindo instabilidade do painel e falhas intermitentes do sensor de temperatura. A BMW atualizou os pontos de massa em revisões de garantia.' },
      { severity: 'OK', title: 'Protetor de motor — ausente de série', yearRange: { from: 2018 },
        body: 'A G 310 GS não tem protetor de motor de fábrica. Instale um protetor de alumínio ou polietileno para uso off-road básico — o cárter é vulnerável a pedras.' },
    ],
    MANUTENCAO: [],
  },

  // ── HARLEY-DAVIDSON MOTOS ─────────────────────────────────────────────────

  'XL 883': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Superaquecimento do motor Evolution em trânsito lento', yearRange: { from: 2004 },
        body: 'O motor Evolution 883cc (ar + óleo) da Sportster 883 Iron/Custom superaquece em engarrafamentos em dias quentes. O cilindro traseiro chega a 200°C+ e o calor no lado direito da perna é intenso. Evite exposição prolongada ao sol parado com o motor ligado.' },
      { severity: 'WARN', title: 'Vazamento de óleo pelos retentores dos árvores de cames', yearRange: { from: 2004, to: 2015 },
        body: 'O motor Evolution da Sportster 883 (geração anterior ao Milwaukee-Eight) tem vazamento crônico pelos retentores externos dos árvores de cames a partir de 40.000–60.000 km. Troca dos retentores resolve mas reincide — produto de vedação (Loctite 518) aplicado preventivamente reduz a frequência.' },
      { severity: 'OK', title: 'Sistema elétrico — massa deficiente (pré-2014)', yearRange: { from: 2004, to: 2013 },
        body: 'As Sportster pré-2014 têm pontos de massa do sistema elétrico deficientes que causam chicotinhos intermitentes: painel piscando, luz apagando em solavancos. Limpeza e reforço dos pontos de massa resolve.' },
    ],
    MANUTENCAO: [],
  },

  'XL 1200': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Superaquecimento extremo do motor 1200 no tráfego', yearRange: { from: 2004 },
        body: 'O motor Evolution 1200cc arrefecido a ar + óleo atinge temperaturas extremas em engarrafamentos. O calor irradiado do cilindro traseiro para o lado direito da perna chega a ser insuportável. Instale deflectores de calor e evite o trânsito parado em dias quentes.' },
      { severity: 'WARN', title: 'Vazamento de óleo pela tampa dos balancins', yearRange: { from: 2004 },
        body: 'A tampa dos balancins do motor XL 1200 apresenta vazamento crônico de óleo pela junta, especialmente após a moto aquecer. Troca da junta (conjunto com borracha de vedação) resolve temporariamente — procedimento repetido a cada 40.000–60.000 km.' },
      { severity: 'OK', title: 'Transmissão com barulho ao engatar a 1ª marcha', yearRange: { from: 2004 },
        body: 'O câmbio das Sportster emite um clunk alto ao engatar a primeira marcha parado. É uma característica de projeto da caixa separada HD — não indica defeito. O som reduz com o motor quente.' },
    ],
    MANUTENCAO: [],
  },

  'Sportster S': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Motor Revolution Max 1250T — superaquecimento no modo Rain', yearRange: { from: 2021 },
        body: 'O motor líquido Revolution Max da Sportster S superaquece no modo de condução "Rain" em engarrafamentos, pois a limitação de potência mantém o motor em rotação baixa por mais tempo. Use o modo "Sport" para maior refrigeração em paradas prolongadas.' },
      { severity: 'OK', title: 'Painel TFT — reflexo do sol em uso diurno', yearRange: { from: 2021 },
        body: 'O painel TFT da Sportster S tem brilho insuficiente em sol forte, tornando a leitura difícil. Instale uma viseira anti-reflexo aftermarket ou configure o brilho no máximo via menu do cluster.' },
    ],
    MANUTENCAO: [],
  },

  'Softail': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Primária — ruído do tensor da corrente', yearRange: { from: 2000, to: 2017 },
        body: 'A corrente de primária das Softail Milwaukee-Eight (pré-2018) e Twin-Cam apresenta ruído metálico quando o tensor desgasta, tipicamente entre 40.000–60.000 km. Troca do tensor de sapata e fluido de primária (Harley Formula +) a cada 20.000 km retarda o problema.' },
      { severity: 'WARN', title: 'Regulador de tensão/alternador — falha precoce', yearRange: { from: 2000, to: 2017 },
        body: 'O regulador de tensão das Softail Twin-Cam e primeiros Milwaukee-Eight falha prematuramente, causando oscilações de tensão que danificam o sistema elétrico e a bateria. Troca preventiva a cada 60.000 km ou ao detectar cargas acima de 14,8V ou abaixo de 13V.' },
      { severity: 'OK', title: 'Protetor de primária — risco em curvas fechadas', yearRange: { from: 2000 },
        body: 'A tampa da primária das Softail pode tocar no chão em curvas fechadas e inclinadas, especialmente com pegs traseiros lowered. Não reclame do chicote, reclame do piloto.' },
    ],
    MANUTENCAO: [],
  },

  'Road King': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Sistema de áudio — interferência de rádio', yearRange: { from: 2014 },
        body: 'O sistema de áudio da Road King apresenta interferências de rádio FM na frequência de outros veículos e chiados ao ligar o A/C da moto. Problema de aterramento do amplificador — ponto de massa reforçado resolve.' },
      { severity: 'OK', title: 'Para-brisa — vibração em alta velocidade', yearRange: { from: 2014 },
        body: 'O para-brisa desmontável da Road King vibra perceptivelmente acima de 110 km/h. A Harley oferece para-brisas de alturas diferentes — encontrar a altura ideal para sua estatura elimina a turbulência no capacete.' },
    ],
    MANUTENCAO: [],
  },

  'Dyna': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Vibração característica do Twin-Cam', yearRange: { from: 2000, to: 2017 },
        body: 'As Dyna com motor Twin-Cam (2000–2017) vibram de forma característica e intensa abaixo de 2.500 rpm. É uma característica de projeto do motor V-Twin de 45°, não um defeito — mas manoplas de gel e punhos com absorção reduzem a fadiga nas mãos.' },
      { severity: 'WARN', title: 'Regulador de tensão — superaquecimento e falha', yearRange: { from: 2000, to: 2014 },
        body: 'O regulador de tensão das Dyna pré-2015 falha por superaquecimento em uso urbano intenso com temperatura ambiente acima de 35°C. Reposicione o regulador para local com mais fluxo de ar ou instale modelo de maior qualidade (Cycle Electric).' },
      { severity: 'OK', title: 'Suporte do parafuso da pinça traseira soltar', yearRange: { from: 2000, to: 2017 },
        body: 'O parafuso da pinça de freio traseira pode soltar por vibração excessiva do motor. Aplique Loctite 243 e verifique o torque a cada 20.000 km.' },
    ],
    MANUTENCAO: [],
  },

  // ── KTM MOTOS ─────────────────────────────────────────────────────────────

  'DUKE 200': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Superaquecimento em tráfego urbano lento', yearRange: { from: 2012 },
        body: 'O motor monocilíndrico LC4c da Duke 200 superaquece rapidamente em engarrafamentos com temperatura ambiente acima de 30°C. O ventilador do radiador aciona com frequência e o calor no lado direito é desconfortável. Evite manter o motor em marcha lenta por mais de 5 minutos parado.' },
      { severity: 'WARN', title: 'Sistema elétrico — fiação com falhas (1ª geração)', yearRange: { from: 2012, to: 2016 },
        body: 'A Duke 200 de primeira geração (2012–2016) apresenta falhas elétricas por conexões fora de tolerância na fiação: painel piscando, sensor de temperatura errático e falhas de partida intermitentes. Revisão das conexões elétricas resolve.' },
      { severity: 'OK', title: 'Quebra de slider — queda inevitável para iniciantes', yearRange: { from: 2012 },
        body: 'A Duke 200 é muito popular entre iniciantes. As quedas são inevitáveis e danificam cárter, manete e espelho. Instale sliders, protetores de manete e espelhos corta-vento robustos desde o início.' },
    ],
    MANUTENCAO: [],
  },

  'DUKE 390': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Vela de ignição afogando — motor apagando', yearRange: { from: 2013, to: 2016 },
        body: 'Problema documentado na Duke 390 1ª geração (2013–2016): a vela NGK LMAR8A-9 afoga com combustível de qualidade inferior ou com uso intenso de etanol, causando o motor apagar subitamente. A KTM atualizou a especificação de vela e o mapa de injeção — verifique se a sua moto recebeu o update.' },
      { severity: 'WARN', title: 'Superaquecimento em trânsito lento', yearRange: { from: 2013 },
        body: 'Igual à Duke 200: o motor monocilíndrico da Duke 390 superaquece em engarrafamentos. O radiador aciona frequentemente e a temperatura pode tocar no limite superior do indicador. Ideal para uso em trânsito fluente ou com breve exposição a engarrafamentos.' },
      { severity: 'WARN', title: 'Bomba de combustível — falha intermitente', yearRange: { from: 2017, to: 2020 },
        body: 'Relatos de falha intermitente na bomba de combustível da Duke 390 2ª geração (2017–2020) causando perda de potência e morte do motor em temperaturas extremas. A KTM substituiu a bomba em garantia na maioria dos casos documentados.' },
    ],
    MANUTENCAO: [],
  },

  'DUKE 690': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Consumo de óleo elevado — motor LC4', yearRange: { from: 2012 },
        body: 'O motor LC4 monocilíndrico de alta performance da Duke 690 consome óleo acima do normal (até 0,5L por 3.000 km) por design. Monitore o nível a cada 1.000 km e nunca deixe abaixo do mínimo — motor danifica rapidamente com óleo insuficiente.' },
      { severity: 'WARN', title: 'Bomba de óleo — falha sem manutenção rigorosa', yearRange: { from: 2012 },
        body: 'A bomba de óleo da Duke 690 falha prematuramente se o intervalo de troca de óleo (5.000 km com sintético 10W50) não for respeitado rigorosamente. Manutenção atrasada pode causar dano catastrófico ao motor monocilíndrico de alto desempenho.' },
    ],
    MANUTENCAO: [],
  },

  'Super Adventure': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Caixa de câmbio — estalo ao engatar', yearRange: { from: 2015 },
        body: 'A Super Adventure 1290 emite estalo/clunk pronunciado ao engatar a primeira marcha com a moto parada. É uma característica da embreagem anti-deslizamento com auxílio slipper clutch — não indica defeito mecânico.' },
      { severity: 'OK', title: 'Custo de revisão das válvulas', yearRange: { from: 2015 },
        body: 'A revisão de válvulas a cada 15.000 km do motor V-Twin LC8 da Super Adventure 1290 custa R$ 4.000–6.000 em concessionária KTM. Planeje preventivamente.' },
    ],
    MANUTENCAO: [],
  },

  // ── TRIUMPH MOTOS ─────────────────────────────────────────────────────────

  'Bonneville': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Regulagem de válvulas — 12.000 km obrigatório', yearRange: { from: 2001 },
        body: 'O motor paralelo bicilíndrico da Bonneville T100/T120 exige regulagem de válvulas a cada 12.000 km. Custo de ~R$ 400–600 em oficina especializada. Negligência gera ruído metálico progressivo e perda de desempenho.' },
      { severity: 'OK', title: 'Sistema de carburação (pré-injeção) — entupimento', yearRange: { from: 2001, to: 2012 },
        body: 'As Bonneville carburadas (pré-2013) têm carburadores Amal/Keihin sensíveis ao etanol degradado. Esvazie o reservatório antes de guardar por mais de 2 semanas.' },
      { severity: 'OK', title: 'Temperatura do banco em dias quentes', yearRange: { from: 2016 },
        body: 'O motor paralelo bicilíndrico da Bonneville moderna irradia calor considerável para o assento em dias quentes. Usar short ou roupa respirável minimiza o desconforto.' },
    ],
    MANUTENCAO: [],
  },

  'Street Triple': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Custo de revisão — motor 3 cilindros', yearRange: { from: 2007 },
        body: 'A revisão de válvulas da Street Triple (motor 3 cilindros 675/765cc) a cada 16.000 km custa R$ 1.500–2.500 em oficinas especializadas pelo acesso limitado ao cabeçote. Comparativamente alto para o segmento.' },
      { severity: 'OK', title: 'Tampa do radiador — perda de líquido em calor extremo', yearRange: { from: 2007, to: 2019 },
        body: 'A tampa do radiador da Street Triple libera líquido de arrefecimento quando a temperatura ambiente ultrapassa 40°C com a moto em plena carga. É uma válvula de segurança funcionando corretamente — complete o nível após o resfriamento.' },
    ],
    MANUTENCAO: [],
  },

  'Speed Triple': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Radiador vulnerável a pedras em uso urbano', yearRange: { from: 2011 },
        body: 'O radiador da Speed Triple fica exposto na parte frontal da moto e é atingido por pedras e detritos em uso urbano. Instale tela protetora de radiador para evitar danos que exigem troca do conjunto (R$ 2.500+).' },
      { severity: 'OK', title: 'Pastilhas de freio — desgaste rápido na frente', yearRange: { from: 2011 },
        body: 'As pinças Brembo da Speed Triple oferecem frenagem excepcional mas desgastam as pastilhas rapidamente, especialmente em uso misto rua + pista. Use pastilhas Ferodo ou EBC Racing para maior durabilidade.' },
    ],
    MANUTENCAO: [],
  },

  'Tiger 800': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Sensor de ABS traseiro — falha com lama', yearRange: { from: 2011 },
        body: 'O sensor de velocidade traseiro do ABS da Tiger 800 XC (versão off-road) acumula lama e falha em trilhas, ativando a luz de ABS e desabilitando o sistema. Limpeza do sensor após uso off-road é essencial.' },
      { severity: 'WARN', title: 'Proteções plásticas — fixações frágeis', yearRange: { from: 2011 },
        body: 'As fixações das proteções laterais e do bico dianteiro da Tiger 800 são plásticas e quebram em quedas ou traquejo de trilha. Reforce os pontos com suportes metálicos aftermarket.' },
      { severity: 'OK', title: 'Custo de revisão do motor 3 cilindros', yearRange: { from: 2011 },
        body: 'A manutenção do motor 3 cilindros 800cc da Tiger (revisão de válvulas a cada 24.000 km) é relativamente econômica para uma moto premium, mas exige mecânico especializado em Triumph.' },
    ],
    MANUTENCAO: [],
  },

  'Tiger 900': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Sistema de tração — calibração em piso misto', yearRange: { from: 2020 },
        body: 'O sistema de controle de tração e ABS off-road da Tiger 900 apresenta intervenção excessiva em piso de terra com brita, reduzindo a performance nas subidas. Selecione o modo "Enduro" ou "Unroad" para reduzir as intervenções eletrônicas.' },
      { severity: 'OK', title: 'Manoplas originais — material inferior', yearRange: { from: 2020 },
        body: 'As manoplas originais da Tiger 900 desgastam rapidamente, especialmente nas extremidades. Substitua por Oxford Hotgrips ou Grip Puppies para melhor conforto e durabilidade.' },
    ],
    MANUTENCAO: [],
  },

  // ── DUCATI MOTOS ─────────────────────────────────────────────────────────

  'Monster 821': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Embreagem a seco — desgaste rápido no tráfego', yearRange: { from: 2014, to: 2020 },
        body: 'A embreagem a seco da Monster 821 (pré-2021) se desgasta de 3 a 5× mais rápido em uso urbano com tráfego lento do que em uso esportivo. Custo de troca completa do kit de embreagem: R$ 2.500–4.000. O ruído metálico característico ao embreagem fria é normal, mas ranger ao fechar é sinal de desgaste.' },
      { severity: 'DANGER', title: 'Revisão Desmodromica — custo elevadíssimo', yearRange: { from: 2014, to: 2020 },
        body: 'O sistema de distribuição Desmodromico exige revisão a cada 15.000 km com custo de R$ 4.000–8.000 em concessionária Ducati. Negligência destrói o motor — as válvulas sem mola se chocam contra o pistão se as folgas ficarem fora de especificação.' },
      { severity: 'WARN', title: 'Superaquecimento do cilindro traseiro — radiação para perna direita', yearRange: { from: 2014 },
        body: 'O cilindro traseiro do motor L-Twin da Monster 821 emite calor intenso para a perna direita do piloto em temperatura acima de 30°C. É uma característica de design do V-Twin Ducati — use calça de couro com protetor térmico ou evite tráfego lento prolongado.' },
    ],
    MANUTENCAO: [],
  },

  'Monster 1200': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Revisão Desmodromica — 15.000 km', yearRange: { from: 2014 },
        body: 'O sistema Desmodromico do Monster 1200 exige revisão completa a cada 15.000 km com custo de R$ 5.000–10.000. Pular essa revisão é a principal causa de destruição de motores Ducati. Planeje financeiramente antes de comprar.' },
      { severity: 'WARN', title: 'Embreagem a seco — ruído e desgaste', yearRange: { from: 2014, to: 2021 },
        body: 'Mesmo problema que o Monster 821: a embreagem a seco se desgasta aceleradamente em tráfego urbano. Considere conversão para embreagem a óleo (banhada) com kit aftermarket se usar majoritariamente em cidade.' },
    ],
    MANUTENCAO: [],
  },

  'Monster 937': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Revisão Desmodromica — 24.000 km', yearRange: { from: 2021 },
        body: 'A nova geração do Monster 937 (2021+) usa embreagem molhada e tem intervalo de revisão Desmodromica aumentado para 24.000 km, com custo estimado de R$ 3.500–6.000. Ainda caro, mas melhor que as gerações anteriores.' },
      { severity: 'OK', title: 'Assento esportivo — desconforto em longas distâncias', yearRange: { from: 2021 },
        body: 'O assento original do Monster 937 é baixo e esportivo (820mm), causando desconforto em viagens acima de 150 km. Existe opção de assento alto (840mm) para melhorar a posição.' },
    ],
    MANUTENCAO: [],
  },

  'Panigale': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Revisão Desmodromica V4 — custo extremo', yearRange: { from: 2018 },
        body: 'A revisão Desmodromica do motor V4 da Panigale V4/V4S a cada 24.000 km custa R$ 8.000–15.000 em concessionária Ducati. É necessário desmontar praticamente toda a moto para acessar o motor. Custo de propriedade extremamente elevado — considere extensão de garantia.' },
      { severity: 'WARN', title: 'Pastilhas de freio — vida curta em uso misto', yearRange: { from: 2018 },
        body: 'As pastilhas Brembo Stylema originais da Panigale V4 têm vida útil de apenas 5.000–8.000 km em uso misto (rua + pista). Em trackday, podem durar apenas 1.500–2.000 km. Mantenha sempre um par reserva.' },
    ],
    MANUTENCAO: [],
  },

  'Multistrada': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Revisão Desmodromica — 12.000–15.000 km', yearRange: { from: 2010 },
        body: 'A Multistrada 950/1200/1260/V2 usa motor Testastretta com Desmodromica, exigindo revisão cara a cada 12.000–15.000 km. A versão V2 2022+ ampliou o intervalo para 30.000 km — verifique o manual do seu modelo.' },
      { severity: 'WARN', title: 'Proteções de carenagem — fragilidade em quedas', yearRange: { from: 2010 },
        body: 'A carenagem da Multistrada é cara e frágil. Quedas a baixa velocidade (estacionamento) podem custar R$ 3.000–8.000 em peças. Instale sliders de plástico e protetores de motor antes de qualquer uso.' },
    ],
    MANUTENCAO: [],
  },

  // ── SUZUKI MOTOS ──────────────────────────────────────────────────────────

  'Burgman': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Variador CVT — rolos com desgaste oval', yearRange: { from: 2010 },
        body: 'Os rolos do variador CVT do Burgman 125/200 desgastam e ficam ovalados entre 15.000–20.000 km, causando engajamento brusco e solavancos na saída. Troca do kit de rolos (~R$ 100–150) restaura a suavidade.' },
      { severity: 'WARN', title: 'Correia CVT — ruptura sem aviso', yearRange: { from: 2010 },
        body: 'A correia CVT do Burgman deve ser trocada a cada 20.000 km. Ruptura paralisa o scooter instantaneamente. Não há vibração ou ruído de aviso prévio na maioria dos casos — siga rigorosamente o intervalo de troca.' },
      { severity: 'OK', title: 'Trava do compartimento traseiro — desgaste', yearRange: { from: 2010 },
        body: 'A trava elétrica do compartimento sob o selim do Burgman 200 apresenta desgaste do mecanismo entre 30.000–50.000 km, exigindo força extra para fechar. Lubrificação semestral prolonga a vida útil.' },
    ],
    MANUTENCAO: [],
  },

  'V-Strom': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Corrosão nos parafusos do cabeçote', yearRange: { from: 2004, to: 2016 },
        body: 'Os parafusos externos do cabeçote da V-Strom DL 650 (2004–2016) corroem por eletrólise entre o alumínio do bloco e o aço dos parafusos, especialmente em regiões litorâneas. Aplique anticorrosivo e inspecione anualmente.' },
      { severity: 'OK', title: 'Suspensão traseira — pré-carga insuficiente para piloto pesado', yearRange: { from: 2004 },
        body: 'A suspensão traseira original da V-Strom 650 é subdimensionada para pilotos acima de 90 kg com bagagem, causando afundamento e instabilidade. Ajuste a pré-carga no máximo ou instale amortecedor aftermarket (YSS, Öhlins).' },
    ],
    MANUTENCAO: [],
  },

  'Bandit': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Bobina de ignição — falha em alta temperatura', yearRange: { from: 2007, to: 2012 },
        body: 'As bobinas de ignição da Bandit 650 e 1200 (2007–2012) falham em dias quentes após uso prolongado, causando falta de cilindro e trepidação. Troca do conjunto de bobinas (~R$ 600–900) resolve definitivamente.' },
      { severity: 'WARN', title: 'Aro traseiro — empenamento com uso prolongado', yearRange: { from: 2007 },
        body: 'O aro traseiro da Bandit (especialmente 1200/1250) empena com uso pesado e vibração excessiva do motor. Balanceamento estático a cada 10.000 km e troca de aro antes de 80.000 km são recomendados.' },
    ],
    MANUTENCAO: [],
  },

  'GSX-S': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Vibração do guidão em 4.000–6.000 rpm', yearRange: { from: 2015 },
        body: 'O motor 4 cilindros em linha da GSX-S 750 vibra perceptivelmente no guidão entre 4.000–6.000 rpm. Pesos de guidão aftermarket (Raximo, R&G) reduzem significativamente o problema.' },
      { severity: 'OK', title: 'Escapamento original — som abafado', yearRange: { from: 2015 },
        body: 'O escapamento original da GSX-S é muito restritivo para a característica esportiva da moto. A maioria dos proprietários troca por Akrapovic ou Yoshimura nas primeiras semanas, o que melhora tanto o som quanto levemente a performance.' },
    ],
    MANUTENCAO: [],
  },

  // ── ROYAL ENFIELD MOTOS ───────────────────────────────────────────────────

  'Classic 350': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Vazamento de óleo pelo inspetor (visor de óleo)', yearRange: { from: 2020 },
        body: 'O visor de inspeção de óleo da Classic 350 (2020+, geração J) apresenta micro-vazamento pela vedação de borracha, especialmente em climas quentes. Reapertar o anel de borracha ou substituir o visor (~R$ 50) resolve.' },
      { severity: 'WARN', title: 'Sistema elétrico — erros no painel TFT', yearRange: { from: 2021, to: 2022 },
        body: 'O painel TFT da Classic 350 Signals (2021–2022) apresentou erros de leitura de velocidade e tela congelada nos primeiros lotes. A Royal Enfield publicou atualização de firmware — verifique com o dealer.' },
      { severity: 'OK', title: 'Vibração característica — motor monocilíndrico', yearRange: { from: 2020 },
        body: 'O motor monocilíndrico de baixa rotação da Classic 350 transmite vibração suave e característica nas manoplas e pedais. É intencional e faz parte da identidade da moto — não indica defeito.' },
    ],
    MANUTENCAO: [],
  },

  'Himalayan': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Bomba de combustível — falha em alguns lotes', yearRange: { from: 2022, to: 2023 },
        body: 'Relatos documentados de falha na bomba de combustível da Himalayan 450 (2022–2023, motor Sherpa 450) causando morte súbita do motor em temperatura alta. A Royal Enfield substituiu as unidades afetadas em garantia — verifique o chassi no site da marca.' },
      { severity: 'WARN', title: 'Painel digital — falhas de conexão Bluetooth', yearRange: { from: 2022 },
        body: 'O painel TFT da Himalayan 450 perde conexão com o aplicativo Royal Enfield intermitentemente. Atualização de firmware via dealer resolve parcialmente, mas o problema pode reaparecer.' },
      { severity: 'OK', title: 'Suspensão traseira — dura para pilotos leves', yearRange: { from: 2022 },
        body: 'A suspensão traseira da Himalayan 450 é calibrada para uso off-road com carga, sendo dura para pilotos abaixo de 70 kg em uso exclusivo na cidade. Regulagem da pré-carga e compressão para o menor valor melhora o conforto urbano.' },
    ],
    MANUTENCAO: [],
  },

  'Meteor 350': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'OK', title: 'Banco — desconforto em viagens longas', yearRange: { from: 2022 },
        body: 'O banco da Meteor 350 é firme e pouco acolchoado para viagens acima de 200 km. Adicionar capa de gel ou espuma de memória aftermarket melhora significativamente o conforto.' },
      { severity: 'OK', title: 'Retrovisor — vibração em alta velocidade', yearRange: { from: 2022 },
        body: 'Os retrovisores originais da Meteor vibram acima de 100 km/h, dificultando a visão traseira. Retrovisores esféricos aftermarket (CRG, Rizoma) eliminam completamente o problema.' },
    ],
    MANUTENCAO: [],
  },

  'Interceptor 650': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Vibração do motor paralelo bicilíndrico', yearRange: { from: 2019 },
        body: 'O motor paralelo bicilíndrico de 648cc (270° de fase) transmite vibração suave ao selim e manoplas em rotações acima de 5.000 rpm. É intencional e característica da moto — manoplas de gel reduzem a percepção nas mãos.' },
      { severity: 'OK', title: 'Qualidade do acabamento — primeiros lotes', yearRange: { from: 2019, to: 2021 },
        body: 'Folgas no acabamento cromado do escapamento e nas proteções laterais foram relatadas nos primeiros lotes da Interceptor 650 no Brasil. A Royal Enfield melhorou o controle de qualidade a partir de 2022.' },
    ],
    MANUTENCAO: [],
  },

  // ── BAJAJ MOTOS ───────────────────────────────────────────────────────────

  'Pulsar 150': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Regulagem de válvulas — batida por falta de ajuste', yearRange: { from: 2010 },
        body: 'O motor DTS-i da Pulsar 150 gera ruído metálico característico (batida de válvula) quando a regulagem de folga não é feita a cada 10.000 km. A maioria das oficinas genéricas não tem tabela de ajuste Bajaj — use apenas serviços autorizados.' },
      { severity: 'WARN', title: 'Sistema elétrico — massa insuficiente', yearRange: { from: 2010, to: 2019 },
        body: 'As Pulsar 150 pré-2020 têm pontos de massa do sistema elétrico deficientes, causando falhas de iluminação e instabilidade do painel em solavancos. Reforço dos pontos de terra resolve definitivamente.' },
    ],
    MANUTENCAO: [],
  },

  'Pulsar NS 200': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Superaquecimento — radiador sem proteção', yearRange: { from: 2012 },
        body: 'O radiador da NS 200 fica exposto e é atingido por pedras em uso urbano e estradas ruins. Uma pedra no radiador gera vazamento de líquido de arrefecimento e superaquecimento rápido. Instale tela protetora de radiador aftermarket.' },
      { severity: 'WARN', title: 'Sensor TPS — marcha lenta irregular após aquecimento', yearRange: { from: 2012 },
        body: 'O sensor de posição da borboleta (TPS) perde calibração após aquecimento prolongado, causando marcha lenta instável entre 800–1.500 rpm. Reajuste do TPS na autorizada resolve, mas pode reaparecer.' },
    ],
    MANUTENCAO: [],
  },

  'Dominar 400': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Vibração excessiva em alta velocidade', yearRange: { from: 2019 },
        body: 'A Dominar 400 apresenta vibração intensa no guidão e no selim acima de 110 km/h, limitando conforto em viagens longas. Balanceamento rigoroso das rodas e troca por pneus Michelin Pilot Street Radial reduzem o problema.' },
      { severity: 'OK', title: 'Farol de LED — sem ajuste de altura', yearRange: { from: 2019 },
        body: 'O farol LED da Dominar 400 não tem ajuste de altura de série. Com garupa ou bagagem, a inclinação da moto muda o feixe de luz e pode encandelar outros motoristas. Verifique o ajuste no dealer.' },
    ],
    MANUTENCAO: [],
  },

  // ── BENELLI MOTOS ─────────────────────────────────────────────────────────

  'TRK 502': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Sistema elétrico — falhas no painel (2017–2019)', yearRange: { from: 2017, to: 2019 },
        body: 'A TRK 502 dos primeiros anos no Brasil (2017–2019) apresenta falhas no painel digital: tela congelada, velocímetro errático e erros de OBD. A Benelli publicou atualização de ECU que resolve a maioria dos casos — verifique com a autorizada.' },
      { severity: 'WARN', title: 'Corrente de transmissão — desgaste acelerado', yearRange: { from: 2017 },
        body: 'A corrente de transmissão da TRK 502 desgasta mais rápido que a média do segmento. Lubrificação a cada 500 km e troca do kit relação a cada 18.000–22.000 km são recomendados.' },
      { severity: 'OK', title: 'Peças de reposição — disponibilidade limitada', yearRange: { from: 2017 },
        body: 'A rede autorizada Benelli no Brasil ainda é pequena e o estoque de peças pode demorar. Verifique a disponibilidade de uma autorizada na sua cidade e mantenha itens consumíveis (filtros, corrente, pastilhas) em estoque.' },
    ],
    MANUTENCAO: [],
  },

  'TNT 300': {
    MACETES: [],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Vibração do motor — faixa de 5.000–7.000 rpm', yearRange: { from: 2015 },
        body: 'O motor paralelo bicilíndrico 300cc da TNT vibra de forma perceptível na faixa de 5.000–7.000 rpm, transmitindo formigamento nas manoplas em viagens longas. Pesos de guidão aftermarket reduzem o efeito.' },
      { severity: 'OK', title: 'Escapamento original — calor excessivo na perna', yearRange: { from: 2015 },
        body: 'O escapamento lateral da TNT 300 emite calor excessivo para a perna direita. Instale heat shield (protetor térmico) aftermarket para proteger calça e bota.' },
    ],
    MANUTENCAO: [],
  },

  // ════════════════════════════════════════════════════════════════════════════
  // MODELOS ADICIONAIS (gerados offline — sem custo de API)
  // ════════════════════════════════════════════════════════════════════════════

  // ── VOLKSWAGEN ──────────────────────────────────────────────────────────────

  Fox: {
    MACETES: [
      { severity: 'OK',   title: 'Motor AP: aceita óleo 15W-40 mineral',      body: 'O motor 1.0 e 1.6 do Fox aceitam 15W-40 mineral em climas quentes. Semissintético 10W-40 é o ideal para uso misto.' },
      { severity: 'OK',   title: 'Carburador Solex: etanol degradado',         body: 'No Fox carburado (pré-2009), o etanol velho entope o giclê principal. Limpe o carburador anualmente com ultrassom para evitar falha na partida a frio.' },
      { severity: 'WARN', title: 'Freio de mão apertado no verão',             body: 'O cabo do freio de mão se dilata no calor e trava o tambor traseiro. Nunca puxe com força máxima — ajuste a cada 30.000 km.' },
      { severity: 'OK',   title: 'Amortecedores: Monroe ou Cofap',             body: 'Os amortecedores originais do Fox têm vida útil curta. Troca por Monroe Reflex ou Cofap a cada 80.000 km melhora a estabilidade.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Junta do cabeçote — superaquecimento',     body: 'O motor 1.0 EA111 do Fox G1 (2004–2009) tem junta do cabeçote fraca. Superaquecimento por qualquer razão = junta queimada. Monitore a temperatura sempre.' },
      { severity: 'WARN',   title: 'Rolamento de roda dianteiro',              body: 'Alta taxa de falha antes dos 60.000 km. Ronco que cresce com a velocidade e aumenta nas curvas é sintoma claro — troque logo.' },
      { severity: 'WARN',   title: 'Bico injetor entupido (1.6 flex)',         body: 'O motor 1.6 flex tem bicos injetores sensíveis à qualidade do combustível. Limpeza a cada 40.000 km previne falhas de combustão.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 10W-40 semissintético — 10.000 km',    body: 'Troca a cada 10.000 km. O motor EA111 aceita mineral mas o semissintético protege melhor em verão quente.' },
      { severity: 'WARN', title: 'Correia dentada — 60.000 km obrigatório',   body: 'Motor interferente: ruptura da correia = pistões batendo nas válvulas = motor destruído. Nunca adie além do prazo.' },
      { severity: 'OK',   title: 'Filtro de combustível — 30.000 km',         body: 'Com etanol brasileiro, troque a cada 20.000 km se abastecer majoritariamente com álcool. Filtro sujo = partida difícil.' },
    ],
  },

  // ── CHEVROLET ───────────────────────────────────────────────────────────────

  'Onix Plus': {
    MACETES: [
      { severity: 'OK',   title: 'Turbo 1.0 Ecotec: óleo 5W-30 sintético',    body: 'O turbo exige sintético 5W-30 API SP. Troca a cada 10.000 km sem negociação — o turbo é o componente mais sensível desse motor.' },
      { severity: 'WARN', title: 'CVT: aceleração gradual sempre',             body: 'O câmbio CVT responde melhor com aceleração progressiva. Arranques bruscos do semáforo desgastam as correias de forma acelerada.' },
      { severity: 'OK',   title: 'Dreno completo do óleo no turbo',            body: 'Ao trocar o óleo, aguarde pelo menos 10 minutos para drenar completamente. O turbo retém mais resíduo que motores aspirados.' },
      { severity: 'OK',   title: 'Resfriamento antes de desligar',             body: 'Após trechos de rodovia, deixe o motor em marcha lenta por 1 minuto antes de desligar. O turbo precisa resfriar com circulação de óleo.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Vela de ignição com falha prematura',      body: 'Problema crônico: velas que falham antes dos 20.000 km no motor 1.0 turbo, causando tranco e luz de injeção. Troca preventiva com NGK.' },
      { severity: 'WARN',   title: 'Calço do motor — vibração no painel',     body: 'Os calços do motor se desgastam em uso urbano intenso, gerando vibração perceptível no volante e no painel.' },
      { severity: 'WARN',   title: 'Sensor MAP — marcha lenta errática',      body: 'Falha no sensor de pressão do coletor entre 60–80.000 km. Causa marcha lenta instável e falhas de combustão.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 5W-30 sintético — 10.000 km',          body: 'Obrigatório. O turbo do Onix Plus não tolera óleo de qualidade inferior. Use sempre API SP ou superior.' },
      { severity: 'WARN', title: 'Fluido CVT — 60.000 km',                    body: 'Troque o fluido CVT específico a cada 60.000 km. Fluido degradado provoca escorregamento e solavanco.' },
      { severity: 'OK',   title: 'Velas NGK iridium — 30.000 km',             body: 'Troca a cada 30.000 km. Use NGK ILZKR7B11 para reduzir a incidência de falhas prematuras no motor turbo.' },
    ],
  },

  // ── RENAULT ─────────────────────────────────────────────────────────────────

  Kardian: {
    MACETES: [
      { severity: 'OK',   title: 'Motor 1.0 turbo TCe: aquecimento antes de exigir', body: 'O TCe 90 de 3 cilindros precisa de pelo menos 2 minutos de aquecimento antes de fazer rodovia. O turbo é sensível a partidas bruscas.' },
      { severity: 'WARN', title: 'CVT X-Tronic: aceleração suave',                   body: 'Assim como outros CVT, o X-Tronic do Kardian não tolera arranques bruscos frequentes. Aceleração progressiva preserva as correias.' },
      { severity: 'OK',   title: 'Pneus 195/60R16 — calibragem 33 PSI',              body: 'A pressão de fábrica é 33 PSI em todos os pneus. Com duas ou mais pessoas, suba para 35 PSI no eixo traseiro.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'CVT — aquecimento em trânsito lento',     body: 'Em congestionamentos longos, o CVT X-Tronic pode aquecer e reduzir desempenho. Use o modo manual com as borboletas para controlar melhor.' },
      { severity: 'OK',   title: 'Sistema multimídia — travamento',          body: 'O sistema Easy Link pode travar ocasionalmente. Reinicialização via botão de liga/desliga por 10 segundos resolve sem perda de dados.' },
      { severity: 'WARN', title: 'Motor 3 cilindros — vibração em marcha',  body: 'O TCe 90 tem vibração mais perceptível em marcha lenta que motores de 4 cilindros — é característica de projeto. Calços bem regulados minimizam.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 5W-30 sintético — 10.000 km',  body: 'O motor turbo de 3 cilindros exige sintético 5W-30. Intervalo de 10.000 km ou 12 meses — não estenda.' },
      { severity: 'WARN', title: 'Fluido CVT X-Tronic — 60.000 km',   body: 'Troque o fluido CVT específico Renault. Fluido genérico pode causar escorregamento e solavanco irreversíveis.' },
      { severity: 'OK',   title: 'Filtro de ar — 15.000 km',           body: 'O turbo TCe é sensível. Troca obrigatória a cada 15.000 km para manter pressão de boost correta.' },
    ],
  },

  // ── JEEP ────────────────────────────────────────────────────────────────────

  Renegade: {
    MACETES: [
      { severity: 'OK',   title: 'Motor 1.3 turbo: óleo 0W-30 sintético',    body: 'O motor Global Small Engine (GSE) 1.3 T270 exige 0W-30 sintético Mopar ou equivalente API SP. Troca a cada 10.000 km.' },
      { severity: 'WARN', title: 'Câmbio DDCT: clutch wear em uso urbano',   body: 'O câmbio de dupla embreagem DDCT desgasta as embreagens em trânsito intenso. Aceleração progressiva em baixa velocidade é essencial.' },
      { severity: 'WARN', title: 'Teto solar — vedação e drenos',            body: 'O teto solar do Renegade tem vedação suscetível a entupimento. Limpe os drenos com ar comprimido a cada 6 meses para evitar goteiras.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'DDCT — solavanco e falha de engate',     body: 'O câmbio DDCT é o maior problema crônico do Renegade. Solavanco em 1ª marcha, dificuldade de engate e travamento. Exija cobertura via garantia.' },
      { severity: 'WARN',   title: 'Teto solar — vazamento',                 body: 'Drenos entupidos causam infiltração d\'água na cabine. Sintoma: cheiro de mofo e manchas no forro. Manutenção preventiva semestral dos drenos evita.' },
      { severity: 'OK',     title: 'Sistema start-stop: bateria AGM',        body: 'O sistema start-stop exige bateria AGM. Substituir por convencional danifica o alternador e o sistema de carga.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 0W-30 sintético Mopar — 10.000 km', body: 'Obrigatório. O GSE 1.3 turbo foi projetado para 0W-30 — viscosidade diferente invalida a garantia e danifica o turbo.' },
      { severity: 'WARN', title: 'Fluido DDCT — 60.000 km',                 body: 'Troca do fluido de embreagem DDCT com fluido Mopar original. Negligenciar é a principal causa de falha prematura do câmbio.' },
      { severity: 'WARN', title: 'Pastilhas dianteiras — 30.000 km',        body: 'O Renegade tem pastilhas com desgaste acelerado em uso urbano. Inspecione a espessura a cada 20.000 km para evitar dano ao disco.' },
    ],
  },

  Compass: {
    MACETES: [
      { severity: 'OK',   title: 'Motor 2.0 flex: óleo 5W-30 sintético',    body: 'O motor 2.0 flex exige 5W-30 sintético Mopar ou equivalente. Troca a cada 10.000 km. Nunca use mineral nesse motor.' },
      { severity: 'WARN', title: 'AT9: aprenda a usar o kickdown',           body: 'O câmbio automático de 9 velocidades retrasa a resposta em retomadas. Use o kickdown (pedal fundo) para forçar troca antecipada.' },
      { severity: 'OK',   title: 'UConnect: atualização via USB',            body: 'Mantenha o software UConnect atualizado via USB (disponível no site Jeep Brasil). Versões antigas travam e perdem configurações.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'AT9 — solavanco 1ª para 2ª marcha',     body: 'O câmbio AT9 do Compass 2017–2021 tem problema crônico de solavanco entre 1ª e 2ª marcha. Exija todas as service actions de software na revisão.' },
      { severity: 'WARN',   title: 'Motor 2.0 — consumo de óleo elevado',   body: 'Consumo acima de 1L a cada 5.000 km reportado em motores com mais de 60.000 km. Monitore mensalmente.' },
      { severity: 'WARN',   title: 'Teto solar — drenos entupidos',          body: 'O teto solar panorâmico tem drenos que entopem com folhas e sujeira. Limpe os quatro cantos com ar comprimido a cada 6 meses.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 5W-30 sintético Mopar — 10.000 km', body: 'Troca a cada 10.000 km. Mopar 5W-30 Synthetic é o especificado — equivalente API SP pode ser usado se certificado.' },
      { severity: 'WARN', title: 'Fluido AT9 — 60.000 km',                  body: 'O câmbio AT9 tem histórico de falhas. Troca preventiva do fluido ATF+4 a cada 60.000 km reduz significativamente o risco.' },
      { severity: 'OK',   title: 'Fluido de freio DOT 4 — 2 anos',          body: 'Troca a cada 2 anos. O sistema de freio com discos em todos os eixos exige fluido em boas condições.' },
    ],
  },

  Commander: {
    MACETES: [
      { severity: 'OK',   title: 'Motor 1.3 turbo: aquecimento obrigatório', body: 'O GSE 1.3 T270 de 3 cilindros precisa de 1 minuto de aquecimento antes de engatar a marcha. O turbo e os mancais agradecem.' },
      { severity: 'WARN', title: 'AT6: kickdown para ultrapassagens',        body: 'O câmbio automático de 6 velocidades responde bem ao kickdown em ultrapassagens em rodovia.' },
      { severity: 'OK',   title: 'Terceira fileira: capacidade de 80 kg',    body: 'Cada banco da terceira fileira suporta 80 kg. Não ultrapasse o peso total indicado no manual — o eixo traseiro sofre com sobrecarga.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Motor 3 cilindros — vibração em marcha',  body: 'O motor 1.3 de 3 cilindros vibra mais que o 4 cilindros em marcha lenta. Os calços do motor se desgastam e amplificam a vibração com o tempo.' },
      { severity: 'WARN', title: 'AT6 — solavanco em 1ª marcha',            body: 'Solavanco ao engatar 1ª em manobras lentas é relatado em vários Commanders 2022. Atualização de software na concessionária costuma resolver.' },
      { severity: 'OK',   title: 'Bateria AGM obrigatória no start-stop',   body: 'A bateria original é AGM. Se substituir por convencional, o sistema start-stop sobrecarrega o alternador — dura menos de 1 ano.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 0W-30 sintético — 10.000 km',  body: 'O GSE 1.3 T270 exige 0W-30. Troca obrigatória a cada 10.000 km — o turbo é crítico para a lubrificação.' },
      { severity: 'WARN', title: 'Fluido AT6 — 60.000 km',             body: 'Troca preventiva do fluido ATF+4 a cada 60.000 km. Câmbio automático com fluido degradado tem vida útil reduzida.' },
      { severity: 'OK',   title: 'Pastilhas traseiras — 40.000 km',    body: 'O Commander tem eixo traseiro pesado. Inspecione pastilhas traseiras a cada 40.000 km — desgastam mais rápido que em carros menores.' },
    ],
  },

  // ── MERCEDES-BENZ ───────────────────────────────────────────────────────────

  C180: {
    MACETES: [
      { severity: 'OK',   title: 'Motor M264 1.5T: óleo 0W-20 MB 229.71',   body: 'O motor 1.5T EQ Boost exige óleo com aprovação Mercedes-Benz 229.71. Outros óleos 0W-20 podem causar falhas no sistema BSG.' },
      { severity: 'WARN', title: 'Sistema BSG (mild hybrid): bateria de 48V', body: 'O C180 2019+ tem sistema mild hybrid com bateria de 48V além da de 12V. Falha na bateria de 48V paralisa o BSG — manutenção exclusiva na concessionária.' },
      { severity: 'OK',   title: 'MBUX: atualização via concessionária',     body: 'O sistema MBUX recebe atualizações que corrigem bugs. Solicite na revisão — é gratuito na garantia.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Bateria de 48V — alto custo de substituição', body: 'A bateria de 48V do EQ Boost custa R$ 4.000–7.000 para trocar fora da garantia. Mantenha a garantia em dia.' },
      { severity: 'OK',   title: 'MBUX — travamentos ocasionais',               body: 'O sistema MBUX trava com atualizações pendentes. Mantenha o software atualizado pela concessionária para evitar telas pretas.' },
      { severity: 'WARN', title: 'Custo de manutenção: orçamento elevado',      body: 'O C180 tem revisões de 20.000 km custando R$ 2.500–5.000. Peças Mercedes são exclusivas e caras — reserve para manutenção.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 0W-20 MB 229.71 — 20.000 km',      body: 'O intervalo é de 20.000 km com LL de qualidade MB 229.71. Nunca substitua por óleo sem aprovação Mercedes.' },
      { severity: 'WARN', title: 'Velas — 40.000 km',                      body: 'O motor turbo de alta compressão exige troca de velas a cada 40.000 km. Use NGK ou Bosch aprovados para o M264.' },
      { severity: 'WARN', title: 'Fluido de freio — 2 anos',               body: 'Troca bienal obrigatória. O sistema integrado ao EQ Boost exige fluido DOT 4 de alta qualidade.' },
    ],
  },

  GLC: {
    MACETES: [
      { severity: 'OK',   title: 'Motor OM654d 2.0 diesel: AdBlue obrigatório', body: 'O motor diesel OM654d usa AdBlue (uréia). Nunca deixe o nível zerar — o motor entra em modo de proteção e não liga após 3 ciclos de aviso ignorados.' },
      { severity: 'WARN', title: 'Suspensão AIRMATIC: desative em off-road',    body: 'A suspensão AIRMATIC não é para trilhas pesadas. Pedras podem furar a bolsa de ar — dano de R$ 3.000+ por bolsa.' },
      { severity: 'OK',   title: '9G-Tronic: não force neutro em movimento',    body: 'Nunca coloque o câmbio 9G-Tronic em N com o carro em movimento — causa desgaste instantâneo nas embreagens.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN',   title: 'Suspensão AIRMATIC — vazamento nas bolsas', body: 'As bolsas de ar têm vida útil de 100–150.000 km. Vazamento causa queda de um lado do carro — reparo de R$ 2.000–4.000 por bolsa.' },
      { severity: 'DANGER', title: 'Injetor diesel — entupimento com diesel ruim', body: 'Os injetores Bosch do OM654d são sensíveis à qualidade do diesel. Use sempre diesel S10 de postos de bandeira. Injetor danificado = R$ 3.500 por unidade.' },
      { severity: 'OK',     title: 'Custo de manutenção: previsão R$ 6.000/ano', body: 'GLC fora de garantia tem revisões custando R$ 2.000–4.000. Planeje R$ 4.000–6.000/ano para manutenção preventiva.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 0W-30 MB 229.51/229.71 — 15.000 km', body: 'Use apenas óleo com aprovação Mercedes 229.51 ou 229.71. O intervalo de 15.000 km é válido apenas com esses óleos.' },
      { severity: 'WARN', title: 'AdBlue — reabastecimento a cada 15.000 km', body: 'O consumo médio é de 1,5L a cada 1.000 km de diesel. Reabasteça na concessionária ou em postos selecionados.' },
      { severity: 'OK',   title: 'Filtro de partículas (DPF) — regeneração',  body: 'Faça pelo menos 30 km de rodovia por semana para regenerar o DPF. Uso 100% urbano entope o filtro — limpeza custa R$ 1.500.' },
    ],
  },

  // ── TESLA ───────────────────────────────────────────────────────────────────

  'Model 3': {
    MACETES: [
      { severity: 'OK',   title: 'Regeneração: ative o modo One Pedal',      body: 'O modo One Pedal (freio regenerativo máximo) aumenta a autonomia em até 20% em uso urbano e reduz o desgaste das pastilhas ao mínimo.' },
      { severity: 'WARN', title: 'Supercharger: não carregue acima de 80%',  body: 'Carregar além de 80% aquece a bateria e reduz a longevidade das células. Reserve cargas acima de 90% para viagens longas.' },
      { severity: 'OK',   title: 'AC pré-condicionado via app',               body: 'Ligue o AC pelo app 15 minutos antes de sair usando carga da rede elétrica — preserva autonomia e conforto térmico.' },
      { severity: 'WARN', title: 'Pneus: rodízio a cada 10.000 km',          body: 'A tração elétrica (especialmente AWD) desgasta os pneus traseiros mais rápido. Rodízio a cada 10.000 km é essencial.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Paint quality — pintura sensível a arranhões', body: 'A pintura do Model 3 é mais fina que a média. PPF (película protetora) ou ceramic coating são recomendados imediatamente após a compra.' },
      { severity: 'OK',   title: 'Autonomia no calor: bateria perde 15–20%',   body: 'Em dias acima de 35°C com AC ativo, a autonomia cai 15–20%. Planejar percursos com margem de segurança é essencial no Brasil.' },
      { severity: 'WARN', title: 'Alinhamento a cada 20.000 km',               body: 'O torque elétrico causa desgaste assimétrico se o alinhamento não for feito regularmente. Pneu fora do alinhamento = perda de autonomia.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Fluido de freio — 2 anos',            body: 'O carro elétrico freia pouco com as pastilhas, mas o fluido DOT 3 absorve umidade independentemente do uso. Troca bienal obrigatória.' },
      { severity: 'OK',   title: 'Filtro de cabine HEPA — 2 anos',       body: 'O filtro de cabine deve ser trocado a cada 2 anos. Tesla recomenda na tela de serviço.' },
      { severity: 'WARN', title: 'Pneus — rodízio a cada 10.000 km',     body: 'O torque elétrico destrói pneus assimétricos. Rodízio é a manutenção preventiva mais importante do Model 3.' },
      { severity: 'OK',   title: 'Refrigerante da bateria — 4 anos',     body: 'O líquido de arrefecimento da bateria deve ser trocado a cada 4 anos. Serviço exclusivo Tesla.' },
    ],
  },

  'Model Y': {
    MACETES: [
      { severity: 'OK',   title: 'One Pedal + Long Range: autonomia máxima', body: 'Com regeneração máxima e cruise de 110 km/h, o Model Y Long Range atinge até 90% da autonomia divulgada em condições reais no Brasil.' },
      { severity: 'WARN', title: 'Carregamento noturno: programação via app', body: 'Programe o carregamento para encerrar às 80% via app Tesla. Manter na tomada com 100% por horas degrada a bateria gradualmente.' },
      { severity: 'WARN', title: 'Teto de vidro panorâmico: proteção térmica', body: 'O teto de vidro panorâmico aumenta o ganho de calor solar no Brasil. Película solar de proteção UV é recomendada logo após a compra.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Alinhamento de painéis — qualidade de montagem', body: 'O Model Y tem histórico de desalinhamento de painéis e vedações nas janelas. Inspecione todos os gaps antes de sair da entrega.' },
      { severity: 'OK',   title: 'Ruídos internos — plásticos e vedações',         body: 'Rangidos em plásticos e vedações são relatados frequentemente em viagens longas. Espuma de vedação nos pontos de contato resolve.' },
      { severity: 'WARN', title: 'Autonomia real: 20–25% abaixo do WLTP',          body: 'Em uso real brasileiro (AC, velocidade, calor), o Model Y entrega 75–80% da autonomia WLTP. Planeje percursos com essa margem.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Fluido de freio — 2 anos',           body: 'Mesmo com pouco uso das pastilhas (regeneração faz o trabalho), o fluido DOT 3 absorve umidade. Troca bienal obrigatória.' },
      { severity: 'WARN', title: 'Pneus — rodízio a cada 10.000 km',   body: 'O Model Y Performance e AWD desgastam pneus traseiros mais rapidamente. Rodízio regular é essencial para igualar o desgaste.' },
      { severity: 'OK',   title: 'Refrigerante da bateria — 4 anos',   body: 'Fluido de arrefecimento da bateria de alta tensão. Substituição exclusiva em centros Tesla.' },
    ],
  },

}

// ── Tips lookup ──────────────────────────────────────────────────────────────

export function getTips(
  modelName: string,
  category: Category,
  yearCode?: string,
): { tips: Tip[]; isSpecific: boolean } {
  const norm = modelName.trim().toLowerCase()
  const key  = Object.keys(modelTips).find((k) =>
    norm.includes(k.toLowerCase()),
  )
  const allSeeds: TipSeed[] | undefined = key ? modelTips[key]?.[category] : undefined
  const modelHasData = !!(allSeeds && allSeeds.length > 0)

  const modelYear = yearCode ? parseModelYear(yearCode) : null

  // Filter by year when model has specific data
  const filtered = modelHasData
    ? allSeeds!.filter((s) => passesYearFilter(s, modelYear))
    : null

  // isSpecific: model has data AND at least one problem applies to the selected year
  const isSpecific = !!(filtered && filtered.length > 0)
  // PROBLEMAS never falls back to defaults — only show verified specific data
  const seeds: TipSeed[] = isSpecific
    ? filtered!
    : category === 'PROBLEMAS' ? [] : defaultTips[category]

  return {
    isSpecific,
    tips: seeds.map((s, i) => ({
      id:       makeId(`${modelName}:${category}:${i}:${yearCode ?? ''}`),
      modelId:  null,
      category,
      severity: s.severity,
      title:    s.title,
      body:     s.body,
      order:    i,
    })),
  }
}
