import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

// ─── Vehicle catalogue ────────────────────────────────────────────────────────

const vehicleData = {
  carro: {
    Chevrolet: ['Onix', 'Onix Plus', 'Cruze', 'S10', 'Tracker', 'Montana', 'Spin'],
    Volkswagen: ['Gol', 'Polo', 'Virtus', 'T-Cross', 'Amarok', 'Saveiro', 'Fox'],
    Fiat:       ['Argo', 'Cronos', 'Pulse', 'Strada', 'Toro', 'Mobi', 'Uno'],
    Toyota:     ['Corolla', 'Hilux', 'Yaris', 'SW4', 'Corolla Cross'],
    Ford:       ['Ka', 'EcoSport', 'Ranger'],
    Hyundai:    ['HB20', 'Creta'],
    Renault:    ['Kwid', 'Sandero', 'Logan', 'Duster', 'Oroch', 'Kardian'],
    Honda:      ['Civic', 'City', 'Fit', 'HR-V', 'WR-V'],
    Jeep:       ['Renegade', 'Compass', 'Commander'],
    Nissan:     ['Sentra', 'Kicks', 'Frontier', 'Versa', 'March', 'Tiida', 'Livina'],
    Citroën:    ['C3', 'C3 Aircross', 'C4 Hatch', 'C4 Pallas', 'C4 Cactus', 'C4 Lounge', 'C5', 'Xsara', 'Xsara Picasso', 'C3 Picasso', 'Berlingo'],
    Peugeot:    ['208', '2008', '3008', '307', '408'],
    BMW:        ['328i', '330i', '116i', '118i', '120i', 'X1', 'X3', 'X5'],
    Audi:       ['A3', 'A4', 'A5', 'Q3', 'Q5'],
    Mercedes:   ['C180', 'C300', 'GLC', 'GLE'],
    Tesla:      ['Model 3', 'Model S', 'Model Y'],
    BYD:        ['Dolphin', 'Seal', 'Song Plus', 'Atto 3', 'Han', 'Tang'],
  },
  moto: {
    Honda:  ['CG 160', 'CB 300R', 'Twister', 'Biz 125', 'PCX 160', 'NXR 160', 'XRE 300', 'Pop 110i'],
    Yamaha: ['Fazer 250', 'XTZ 150', 'Factor 150'],
    Suzuki: ['Intruder 125'],
    Dafra:             ['Apache 200', 'Riva 150', 'Kansas 150'],
    'Harley-Davidson': ['883N', '1200NS', 'Forty Eight', 'Fat Boy', 'Road King', 'Low Rider S', 'Sportster S', 'Pan America'],
  },
}

// ─── Types ───────────────────────────────────────────────────────────────────

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'
type TipInput = { severity: Sev; title: string; body: string; yearFrom?: number; yearTo?: number }
type ModelTips = Partial<Record<Cat, TipInput[]>>

// ─── Default tips (all models) ────────────────────────────────────────────────

const defaultTips: Record<Cat, TipInput[]> = {
  MACETES: [
    { severity: 'OK',   title: 'Partida a frio',        body: 'Evite acelerar o motor logo após a partida. Aguarde 30 segundos para o óleo circular e lubrificar as peças antes de engatar a marcha.' },
    { severity: 'OK',   title: 'Embreagem no trânsito', body: 'Não deixe o pé apoiado na embreagem enquanto espera no semáforo. O hábito desgasta o rolamento de pressão prematuramente, custando R$ 300–500 na troca.' },
    { severity: 'WARN', title: 'Freio motor',           body: 'Em descidas longas, use o freio motor para poupar as pastilhas e evitar superaquecimento. Reduza a marcha antes da descida, não durante.' },
    { severity: 'OK',   title: 'Pneus calibrados',      body: 'Pneus com 20% abaixo da pressão ideal aumentam o consumo em até 5% e reduzem a vida útil pela metade. Calibre semanalmente, sempre com pneu frio.' },
    { severity: 'OK',   title: 'Ar condicionado eficiente', body: 'Antes de ligar o AC em carro parado no sol, abra as janelas por 2 minutos para expulsar o ar quente. O AC refrigera muito mais rápido e gasta menos combustível.' },
  ],
  PROBLEMAS: [
    { severity: 'DANGER', title: 'Desgaste de pastilhas',     body: 'A maioria dos veículos nacionais tem pastilhas originais de menor durabilidade. Verifique a cada 20.000 km. Pastilhas gastas danificam os discos (R$ 800–1.500 a mais).' },
    { severity: 'WARN',   title: 'Mangotes de borracha',      body: 'Mangotes do sistema de arrefecimento têm vida útil de 5 anos. Trincas internas causam superaquecimento silencioso e motor destruído.' },
    { severity: 'WARN',   title: 'Bateria em climas quentes', body: 'Baterias duram menos em cidades quentes (média 2–3 anos). Faça um teste de carga anual para evitar surpresas.' },
    { severity: 'WARN',   title: 'Filtro de ar entupido',     body: 'Filtro sujo reduz potência em até 10% e aumenta o consumo. Inspecione visualmente a cada troca de óleo — troque se estiver escurecido.' },
  ],
  MANUTENCAO: [
    { severity: 'OK',   title: 'Óleo do motor',            body: 'Troca a cada 10.000 km ou 12 meses (o que ocorrer primeiro). Sempre use a viscosidade indicada na tampa do motor ou no manual.' },
    { severity: 'OK',   title: 'Filtro de combustível',    body: 'Troque a cada 30.000 km. Em motores flex com uso majoritário de etanol, considere intervalos de 20.000 km.' },
    { severity: 'DANGER', title: 'Correia/corrente dentada', body: 'Siga o intervalo do fabricante à risca. Ruptura de correia = motor destruído em motores interferentes. Este é o item mais crítico da manutenção.' },
    { severity: 'OK',   title: 'Fluido de freio',          body: 'Troque a cada 2 anos, independente da quilometragem. DOT 3 e DOT 4 absorvem umidade, reduzindo o ponto de ebulição e causando freio esponjoso.' },
    { severity: 'OK',   title: 'Filtro de ar da cabine',   body: 'Troque a cada 15.000 km. Filtro saturado reduz a eficiência do AC em até 30% e piora a qualidade do ar interno.' },
  ],
}

// ─── Model-specific tips ──────────────────────────────────────────────────────

const modelTips: Record<string, ModelTips> = {

  // ══ CHEVROLET ═══════════════════════════════════════════════════════════════

  Onix: {
    MACETES: [
      { severity: 'OK',   title: 'Óleo 5W30 sintético obrigatório', body: 'O motor 1.0 turbo exige óleo sintético 5W30 API SP. Nunca use semissintético — o turbo opera a alta temperatura e degrada óleo inferior rapidamente.' },
      { severity: 'WARN', title: 'Câmbio CVT: acelere suavemente',  body: 'Evite aceleração brusca do ponto parado. O CVT responde muito melhor com aceleração progressiva e aumenta sua vida útil em 30%.' },
      { severity: 'OK',   title: 'Reset da injeção pós-troca de óleo', body: 'Após cada troca de óleo, ligue o carro e deixe em marcha lenta por 3 minutos antes de sair. O turbo precisa pressurizar o novo óleo gradualmente.' },
      { severity: 'OK',   title: 'Dreno lento do óleo usado',       body: 'Ao trocar o óleo, deixe drenar por pelo menos 10 minutos. O motor turbo retém mais resíduos que aspirados — óleo velho contamina o novo.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Velas de ignição falham antes dos 20k km', body: 'Problema crônico amplamente reportado: velas do motor 1.0 turbo falham precocemente, causando tranco, consumo elevado e luz de injeção. Troque preventivamente a cada 20.000 km com NGK IFR6T11.' },
      { severity: 'DANGER', title: 'Coxim do motor desgasta rápido',  body: 'Os coxins (calços) do motor Onix turbo se desgastam rapidamente em uso urbano intenso, gerando vibração excessiva no volante e painel. Reparo: R$ 400–700.' },
      { severity: 'WARN',   title: 'Sensor MAP instável',             body: 'O sensor MAP (pressão do coletor de admissão) costuma falhar entre 60–80.000 km, causando marcha lenta instável, falhas de ignição e consumo elevado.' },
      { severity: 'WARN',   title: 'Bomba d\'água com trinca',        body: 'Relatos de trinca na bomba d\'água em motores turbo acima de 80.000 km. Monitore a temperatura — superaquecimento é sinal claro.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 5W30 sintético',              body: 'Troca a cada 10.000 km obrigatoriamente. Com turbo, nunca estenda para 15.000 km — risco de depósitos no turbo.' },
      { severity: 'OK',   title: 'Filtro de ar a cada 15.000 km',    body: 'Filtro sujo prejudica o turbo diretamente. Troca o filtro junto com o óleo a cada segunda revisão.' },
      { severity: 'WARN', title: 'Fluido CVT a cada 60.000 km',      body: 'Muitos proprietários ignoram isso. Fluido velho do CVT causa solavancos e pode destruir o câmbio (reparo R$ 3.000–6.000).' },
      { severity: 'OK',   title: 'Velas NGK a cada 20.000 km',       body: 'Dada a falha crônica conhecida, antecipe a troca para 20.000 km. Use NGK IFR6T11 (iridium) para melhor durabilidade.' },
    ],
  },

  'Onix Plus': {
    MACETES: [
      { severity: 'OK',   title: 'Mesmo motor do Onix hatch',      body: 'O Onix Plus usa o mesmo motor 1.0 turbo do hatch. Todas as recomendações de manutenção e problemas conhecidos do Onix se aplicam.' },
      { severity: 'WARN', title: 'Porta-malas com infiltração',    body: 'Versões 2020–2021 têm relato de infiltração no porta-malas pelo friso cromado traseiro. Verifique a vedação ao lavar o carro.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Velas de ignição prematuras',  body: 'Mesma falha crônica do Onix: velas do 1.0 turbo falham antes dos 20.000 km. Troque preventivamente com NGK IFR6T11.' },
      { severity: 'WARN',   title: 'Sensor MAP — mesma falha',     body: 'Sensor MAP falha entre 60–80k km, causando marcha lenta instável. Problema idêntico ao Onix hatch.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Mesma tabela do Onix',           body: 'Siga a mesma tabela de manutenção do Onix: óleo 5W30 a cada 10k, velas a cada 20k, CVT a cada 60k.' },
    ],
  },

  Tracker: {
    MACETES: [
      { severity: 'OK',   title: 'Turbo 1.0 Ecotec: aguarde antes de desligar', body: 'Após uso em rodovias ou subidas longas, deixe o motor em marcha lenta por 1–2 minutos antes de desligar. O turbo precisa resfriar com óleo circulando.' },
      { severity: 'WARN', title: 'Atualização de software da injeção',          body: 'Mantenha o software de injeção atualizado na concessionária. Bugs conhecidos no mapa de injeção causam consumo elevado em versões pré-2022.' },
      { severity: 'OK',   title: 'TPMS: não suba de aro sem recalibrar',        body: 'Se trocar para aro 18, recalibre o sistema TPMS (monitoramento de pressão). Pneus fora do padrão geram alarme falso constante.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN',   title: 'Motor com marcha lenta instável',           body: 'Alguns Trackers 2020–2021 apresentam marcha lenta irregular abaixo de 800 rpm, especialmente ao ligar o AC. Atualização de firmware resolve.' },
      { severity: 'WARN',   title: 'Câmera de ré com névoa interna',            body: 'A câmera de ré do Tracker acumula condensação interna em climas úmidos. Problema cosmético que a Chevrolet substitui em garantia.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 5W30 sintético a cada 10.000 km',        body: 'O motor 1.0 Ecotec turbo exige sintético 5W30 API SP. Não use semissintético nem estenda intervalos.' },
      { severity: 'OK',   title: 'Filtro de ar a cada 20.000 km',               body: 'Filtro original dura 20.000 km. Em cidades com muito tráfego e poluição, troque a cada 15.000 km.' },
      { severity: 'WARN', title: 'Fluido do câmbio automático a cada 60.000 km', body: 'O câmbio de 6 velocidades usa fluido Dexron VI. Troca obrigatória a cada 60.000 km — troca negligenciada é causa frequente de reparo caro.' },
    ],
  },

  S10: {
    MACETES: [
      { severity: 'DANGER', title: 'Apenas diesel S10 — nunca S500',   body: 'O motor Duramax 2.8 foi projetado para diesel de alta qualidade. Diesel S500 entope os injetores common rail em menos de 30.000 km. Reparo de injetores: R$ 800–1.500 por injetor.' },
      { severity: 'WARN',   title: 'DPF: faça ciclo de regeneração mensal', body: 'Em uso urbano intenso, o filtro de partículas (DPF) entope. Uma vez por mês, faça pelo menos 20 km em rodovia acima de 80 km/h para regenerar o filtro automaticamente.' },
      { severity: 'OK',     title: 'Drene o separador de água semanalmente', body: 'Se você usa muito a S10, drene o filtro separador de água semanalmente. Água no diesel danifica bomba injetora (R$ 3.000–8.000 de reparo).' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Injetores danificados por combustível ruim', body: 'Principal problema relatado: injetores Bosch entopem e falham com diesel de baixa qualidade. Sintoma: fumaça preta, perda de potência, consumo alto.' },
      { severity: 'WARN',   title: 'Sensor de pedal de embreagem com defeito',   body: 'Relatos de sensor de pedal de embreagem causando arranque abrupto e erros na central eletrônica. Componente de R$ 150–300.' },
      { severity: 'WARN',   title: 'Escapamento com ferrugem prematura',         body: 'O sistema de escapamento da S10 ferruja rapidamente em regiões costeiras. Proteção com tinta de alta temperatura ajuda.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 5W30 API CI-4 a cada 10.000 km',        body: 'Use exclusivamente óleo para diesel (API CI-4 ou CJ-4). Óleo de gasolina danifica o motor diesel.' },
      { severity: 'WARN', title: 'Filtro de combustível diesel a cada 20.000 km', body: 'Com diesel de qualidade variável no Brasil, antecipe a troca para 15–20.000 km. Filtro entupido mata a bomba injetora.' },
      { severity: 'OK',   title: 'Correia dentada a cada 90.000 km',            body: 'Motor interferente — ruptura = motor destruído. Leve à concessionária para o tensionamento hidráulico correto.' },
      { severity: 'OK',   title: 'Fluidos dos diferenciais a cada 40.000 km',   body: 'Diferencial traseiro e, nas versões 4x4, o diferencial dianteiro. Essencial para quem usa off-road frequentemente.' },
    ],
  },

  // ══ VOLKSWAGEN ══════════════════════════════════════════════════════════════

  Gol: {
    MACETES: [
      { severity: 'OK',   title: 'Teste cada bobina individualmente',  body: 'O Gol G5/G6 tem falha conhecida nas bobinas de ignição. Ao sentir engasgos, teste cada bobina uma a uma antes de trocar velas. Bobina defeituosa custa R$ 80–150.' },
      { severity: 'OK',   title: 'Velas NGK Iridium no 1.0 MSI',       body: 'O motor 1.0 MSI agradece velas NGK Iridium (ILKAR7L11) para melhor partida a frio e combustão. Durabilidade 30.000 km.' },
      { severity: 'WARN', title: 'Limpe a válvula EGR a cada 40.000 km', body: 'A válvula EGR entope com frequência no motor 1.6. Limpeza evita perda de potência, fumaça preta e luz de motor. Custo da limpeza: R$ 150–250.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Bobina de ignição com falha crônica', body: 'A bobina do motor 1.6 MSI tem vida útil reduzida. Troca preventiva a cada 60.000 km evita engasgos na estrada.' },
      { severity: 'WARN',   title: 'Rolamento de roda dianteiro prematuro', body: 'Rolamentos dianteiros têm alta taxa de substituição antes de 60.000 km, especialmente em rodovias com buracos. Sintoma: ronco que aumenta com a velocidade.' },
      { severity: 'WARN',   title: 'Sensor de temperatura com leitura errada', body: 'Falha conhecida no sensor de temperatura: painel mostra temperatura incorreta, causando erros de injeção e consumo alto.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 5W30 a cada 10.000 km',          body: 'Motor 1.0 MSI: use 5W30. Motor 1.6 MSI: use 5W40. Nunca use mineral — motores MSI são sensíveis à qualidade do óleo.' },
      { severity: 'OK',   title: 'Velas a cada 30.000 km',               body: 'Use NGK ou Bosch originais. Velas inadequadas causam engasgo e consumo alto no motor MSI.' },
      { severity: 'WARN', title: 'Correia dentada a cada 60.000 km',     body: 'Motor interferente. Não adie — ruptura da correia destrói o motor. Troca: R$ 500–800 na oficina.' },
    ],
  },

  Polo: {
    MACETES: [
      { severity: 'OK',   title: 'Câmbio DSG 7 marchas: nunca use semi-ponto', body: 'O câmbio DQ200 (7 marchas, embreagem seca) NÃO suporta o hábito de "ficar no semi-ponto". Em paradas no trânsito, use o freio, não a embreagem — preserva o atuador hidráulico.' },
      { severity: 'WARN', title: 'Calibração do DSG a cada 20.000 km',          body: 'O câmbio DQ200 precisa de recalibração periódica na concessionária ou oficina especializada. Sem calibração, os solavancos pioram progressivamente.' },
      { severity: 'OK',   title: 'Motor EA211: limpeza do coletor a cada 40k',  body: 'A injeção direta do EA211 não limpa as válvulas de admissão com combustível. A cada 40.000 km, faça limpeza de carvão (induction service). Custo: R$ 300–500.' },
      { severity: 'OK',   title: 'Óleo 5W40 sintético obrigatório',             body: 'Use exclusivamente 5W40 sintético (VW 504 00 ou 507 00). Óleo fora de especificação anula a garantia e prejudica o motor turbo.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'DSG DQ200 com solavanco — problema mundial', body: 'O câmbio DQ200 de embreagem seca é reconhecidamente problemático em manobras lentas e arranque em subidas. A VW global enfrentou processos e fez recall em vários países. Atualização de software ajuda, mas não elimina totalmente.' },
      { severity: 'WARN',   title: 'Consumo de óleo acima de 80.000 km',         body: 'O motor EA211 turbo tende a consumir óleo elevado após 80.000 km (até 500ml a cada 3.000 km). Verifique o nível mensalmente.' },
      { severity: 'WARN',   title: 'Acúmulo de carbono nas válvulas de admissão', body: 'A injeção direta não lava as válvulas de admissão. Após 60.000 km sem limpeza, perda de potência e consumo alto são sintomas claros.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 5W40 VW a cada 10.000 km',               body: 'Usar especificação VW 504/507. Intervalo máximo de 10.000 km com motor turbo.' },
      { severity: 'WARN', title: 'Fluido do câmbio DSG a cada 60.000 km',        body: 'Fluido DSG G052182A2. Troca obrigatória — câmbio com fluido velho apresenta solavancos graves e possível falha total (R$ 5.000–12.000).' },
      { severity: 'OK',   title: 'Correia do acessório a cada 100.000 km',       body: 'Inspecione visualmente a cada revisão. Ruptura da correia do alternador pode danificar o turbo por superaquecimento.' },
    ],
  },

  Virtus: {
    MACETES: [
      { severity: 'OK',   title: 'Motor e câmbio idênticos ao Polo',   body: 'O Virtus usa o mesmo conjunto mecânico do Polo (motor EA211 + câmbio DQ200). Todas as dicas e problemas do Polo se aplicam.' },
      { severity: 'OK',   title: 'Porta-malas com infiltração',         body: 'Versões 2018–2020 têm relatos de infiltração no friso do porta-malas em chuva intensa. Verifique a vedação ao lavar.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'DSG DQ200 — mesmo problema do Polo', body: 'Câmbio DQ200 com os mesmos solavancos crônicos do Polo. Soluções idênticas: calibração periódica e não usar semi-ponto.' },
    ],
    MANUTENCAO: [
      { severity: 'OK', title: 'Mesma tabela do Polo', body: 'Siga a tabela de manutenção do Polo: óleo 5W40 a cada 10k, DSG a cada 60k, correia do acessório a cada 100k.' },
    ],
  },

  'T-Cross': {
    MACETES: [
      { severity: 'OK',   title: 'Suspensão traseira simples (torção)',    body: 'O T-Cross usa eixo de torção na traseira, não suspensão independente. Em curvas rápidas, isso é perceptível. É normal — não é defeito.' },
      { severity: 'WARN', title: 'Câmera de ré: recalibre após trocar vidro', body: 'Se trocar o para-brisa, recalibre a câmera do sistema de assistência de frenagem (AEB). Câmera descalibrada pode acionar freio de emergência erroneamente.' },
      { severity: 'OK',   title: 'Injeção direta: limpeza das válvulas',   body: 'Mesmo problema do Polo: sem limpeza de carvão a cada 40.000 km, as válvulas de admissão acumulam depósitos e a potência cai.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Câmbio DQ200 com solavanco — idêntico ao Polo', body: 'O T-Cross usa o mesmo câmbio DSG 7 marchas do Polo. Solavancos a baixa velocidade são amplamente relatados. Calibração periódica é essencial.' },
      { severity: 'WARN',   title: 'Sunroof com ruído de vento acima de 100 km/h', body: 'Versões com teto solar panorâmico apresentam ruído de vento acima de 100 km/h. Revisão do vedante pelo zero-quilômetro é recomendada.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Mesma manutenção do Polo',               body: 'Óleo 5W40 a cada 10k, fluido DSG a cada 60k, limpeza de coletor a cada 40k.' },
      { severity: 'OK',   title: 'Filtro de ar da cabine a cada 15.000 km', body: 'O filtro de cabine fica atrás do porta-luvas — troca fácil sem ferramenta. Melhora significativamente o AC e o ar interno.' },
    ],
  },

  Saveiro: {
    MACETES: [
      { severity: 'OK',   title: 'Calibre o traseiro para 50 PSI com carga', body: 'Com carga acima de 300kg, calibre os pneus traseiros para 50 PSI (veja a plaqueta na soleira da porta). Pneu calibrado só para passeio com carga desgasta desigualmente.' },
      { severity: 'WARN', title: 'Filtro de ar: use apenas original',        body: 'Filtros de ar de reposição de baixa qualidade para a Saveiro têm vedação ruim — poeira entra no motor diretamente. Use Mahle ou Fram original.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Bobina de ignição do 1.6 MSI — falha crônica', body: 'Mesma falha do Gol: a bobina do motor 1.6 MSI falha precocemente. Troca preventiva a cada 60.000 km.' },
      { severity: 'WARN',   title: 'Amortecedor traseiro com desgaste por carga',  body: 'Uso frequente com carga acima de 400kg acelera o desgaste dos amortecedores traseiros. Troca a cada 50.000 km em uso intenso de carga.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 5W30 a cada 10.000 km',               body: 'Motor 1.6 MSI sem turbo: 5W30 semissintético mínimo. Sintético prolonga a vida do motor.' },
      { severity: 'OK',   title: 'Regulagem de válvulas a cada 30.000 km',   body: 'O motor 1.6 MSI pede regulagem de válvulas periódica. Barulho metálico a frio é sinal de folga excessiva.' },
    ],
  },

  // ══ FIAT ════════════════════════════════════════════════════════════════════

  Argo: {
    MACETES: [
      { severity: 'DANGER', title: 'Correia dentada: NUNCA passe de 60.000 km', body: 'O motor 1.3 Firefly usa correia dentada (não corrente). Intervalo de troca: 60.000 km ou 4 anos — o que ocorrer primeiro. Motor é interferente: ruptura = motor destruído. Custo da troca: R$ 600–900.' },
      { severity: 'OK',     title: 'Filtro de combustível integrado na bomba',  body: 'O Argo não tem filtro de combustível externo separado. O filtro fica dentro do tanque, junto com a bomba. Troca apenas com a bomba (a cada 100.000 km ou em falhas).' },
      { severity: 'WARN',   title: 'Sistema de injeção sensível ao etanol ruim', body: 'O motor 1.3 Firefly tem dificuldade com etanol de baixa qualidade (abaixo de 95 INPM). Se sentir engasgo com etanol, tente misturar 30% de gasolina.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Correia dentada com desgaste precoce — lote 2017–2019', body: 'Relatos de desgaste prematuro da correia em motores 1.3 fabricados entre 2017–2019. Se seu Argo é desta faixa, faça inspeção antes dos 50.000 km.' },
      { severity: 'WARN',   title: 'Chicote elétrico da porta com curto em chuva', body: 'A vedação do chicote elétrico na dobra da porta do motorista é deficiente. Em chuva forte, pode causar curto que afeta travas e vidros elétricos.' },
      { severity: 'OK',     title: 'Retrovisor elétrico com falha no motor',        body: 'O motor do retrovisor elétrico falha após 3–4 anos de uso. Componente de R$ 150–300 — fácil de trocar.' },
    ],
    MANUTENCAO: [
      { severity: 'DANGER', title: 'Correia dentada a cada 60.000 km / 4 anos',  body: 'Item mais crítico do Argo. Não adie — motor interferente destrói válvulas e pistões se a correia romper.' },
      { severity: 'OK',     title: 'Óleo 5W30 sintético a cada 10.000 km',        body: 'O motor Firefly aceita 5W30 sintético API SN ou superior. Intervalo máximo de 10.000 km.' },
      { severity: 'OK',     title: 'Velas NGK a cada 30.000 km',                  body: 'Use NGK BKR5EYA ou equivalente. Troca simples que melhora resposta e consumo.' },
    ],
  },

  Cronos: {
    MACETES: [
      { severity: 'OK',   title: 'Motor Firefly 1.3: mesmas dicas do Argo', body: 'O motor 1.3 Firefly do Cronos é idêntico ao do Argo. Todas as recomendações de correia, óleo e combustível se aplicam.' },
      { severity: 'WARN', title: 'CVT Punch: monitore o nível de fluido',    body: 'O câmbio CVT Punch é relativamente novo no mercado. Verifique o nível de fluido mensalmente e troque a cada 60.000 km sem falta.' },
      { severity: 'OK',   title: 'Painel digital com travamento: reset simples', body: 'Se o cluster digital travar, pressione e segure o botão de reset do hodômetro por 5 segundos com o carro ligado. Resolve na maioria dos casos.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Correia dentada — mesma criticidade do Argo', body: 'Motor interferente com correia de 60.000 km. Não negligencie — consequências idênticas ao Argo.' },
      { severity: 'WARN',   title: 'CVT com solavanco em baixas velocidades',     body: 'Relatos frequentes de solavanco do CVT em manobras a menos de 20 km/h. Atualização de software e troca de fluido ajudam.' },
      { severity: 'WARN',   title: 'Infiltração no para-brisa — modelos 2018–2019', body: 'A vedação do para-brisa de alguns Cronos 2018–2019 apresenta infiltração em chuva forte. Verifique o tapete do banco do motorista se cheirar bolor.' },
    ],
    MANUTENCAO: [
      { severity: 'DANGER', title: 'Correia dentada a cada 60.000 km',            body: 'Mesmo intervalo e criticidade do Argo. Motor interferente — não adie.' },
      { severity: 'OK',     title: 'Fluido CVT a cada 60.000 km',                 body: 'Use fluido CVT Fiat/Punch original. Fluido genérico pode danificar o câmbio.' },
      { severity: 'OK',     title: 'Óleo 5W30 a cada 10.000 km',                  body: 'Mesmo protocolo do Argo. Sintético 5W30 API SN ou superior.' },
    ],
  },

  Strada: {
    MACETES: [
      { severity: 'DANGER', title: 'Correia dentada: use com carga = maior desgaste', body: 'O motor 1.3 Firefly com carga frequente desgasta a correia mais rápido. Se você usa a Strada para trabalho com carga diária, considere trocar a correia a cada 45.000 km, não 60.000 km.' },
      { severity: 'OK',     title: 'Calibragem com carga: traseiro 44 PSI',          body: 'Com carga na caçamba, calibre os traseiros para 44 PSI (veja a plaqueta na soleira). Pneu subcalibrado com carga aumenta risco de estouro e desgaste anormal.' },
      { severity: 'OK',     title: 'Protetor de caçamba evita ferrugem',             body: 'Instale um revestimento de borracha ou polietileno na caçamba. Sem proteção, a pintura raspa e enferruja em 1–2 anos de uso com carga.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Trava da caçamba com desgaste cosmético',      body: 'A trava da caçamba (versão cabine dupla) apresenta dificuldade de abertura após 2 anos de uso. Lubrificação com WD-40 resolve temporariamente; a trava precisa ser substituída.' },
      { severity: 'WARN', title: 'Freio traseiro a tambor: ajuste frequente',    body: 'Os freios traseiros a tambor da Strada pedem ajuste a cada 20.000 km. Tambores mal ajustados causam frenagem desigual e desgaste acelerado.' },
    ],
    MANUTENCAO: [
      { severity: 'DANGER', title: 'Correia dentada a cada 60.000 km (ou menos com carga)', body: 'Prioridade máxima. Com uso intenso de carga, antecipe a inspeção para 45.000 km.' },
      { severity: 'OK',     title: 'Pastilhas dianteiras a cada 25.000 km',     body: 'Uso comercial desgasta as pastilhas mais rápido. Inspecione visualmente a cada 15.000 km.' },
      { severity: 'OK',     title: 'Ajuste de tambores a cada 20.000 km',        body: 'Leve a uma oficina para ajuste do freio traseiro. Previne desequilíbrio de frenagem e poupa os tambores.' },
    ],
  },

  Toro: {
    MACETES: [
      { severity: 'DANGER', title: 'Motor diesel: SOMENTE diesel S10',          body: 'O motor 2.0 Multijet 2 usa injetores Bosch common rail de altíssima precisão. Diesel S500 entope e destrói os injetores. Troca de um injetor: R$ 1.200–2.000.' },
      { severity: 'WARN',   title: '4WD Low Lock: apenas para off-road pesado', body: 'Use o 4WD Low Lock apenas para off-road com obstáculos sérios. Na estrada ou em terra firme, use 2WD ou 4WD Auto — 4WD Lock na estrada danifica o diferencial central.' },
      { severity: 'OK',     title: 'Câmbio ZF 9: aguarde o "acoplamento"',      body: 'O câmbio automático ZF 9 marchas tem solavanco característica nas marchas 1→2 no trânsito lento. Isso é normal em todos os modelos com esse câmbio mundialmente.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'ZF 9 com solavanco 1→2 marchas no trânsito', body: 'Problema global do câmbio ZF 9 HP em carros como a Toro, Compass e Jeep Cherokee. Atualização de software pela Fiat/Jeep ameniza, mas não elimina totalmente.' },
      { severity: 'OK',   title: 'Sensor de nível impreciso — indicação de cheio até 1/4 do tanque', body: 'O sensor de nível do combustível é impreciso: indica "cheio" até cerca de 1/4 do tanque real. Problema cosmético, sem solução definitiva — aprenda o ciclo real do seu carro.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 0W30 diesel a cada 10.000 km',           body: 'Especificação Fiat 9.55535-S1. Use apenas óleo de qualidade certificada para motores diesel.' },
      { severity: 'OK',   title: 'Fluido do câmbio ZF a cada 60.000 km',        body: 'Fluido ZF Lifeguard 9. Troca obrigatória — câmbio seco é causa de falha prematura.' },
      { severity: 'WARN', title: 'Filtro de diesel a cada 20.000 km',            body: 'Drene a água do filtro separador mensalmente. Troca completa a cada 20.000 km.' },
    ],
  },

  Uno: {
    MACETES: [
      { severity: 'OK',   title: 'Motor 1.0 Fire: o mais simples e confiável',   body: 'O motor 1.0 Fire (carburado ou injetado) é famoso pela confiabilidade. Manutenção em dia e ele dura 300.000 km sem problemas sérios.' },
      { severity: 'OK',   title: 'Carburador: limpeza a cada 30.000 km',          body: 'Nas versões carburadas, o carburador entope com etanol de baixa qualidade. Limpeza ultrassônica a cada 30.000 km mantém o desempenho original.' },
      { severity: 'WARN', title: 'Suspensão dianteira: buchas MacPherson desgastam', body: 'As buchas da suspensão MacPherson do Uno desgastam rapidamente em uso urbano com buracos. Inspecione ao ouvir barulho seco nas irregularidades.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Cabo de embreagem parte com frequência',        body: 'O cabo de embreagem do Uno tem vida útil curta em uso urbano intenso (stop-and-go). Mantenha um cabo reserva — é barato (R$ 50–80) e a troca é simples.' },
      { severity: 'OK',   title: 'Bomba d\'água com vazamento após 80.000 km',   body: 'A bomba d\'água original do Uno costuma vazar após 80.000 km. Substituição preventiva junto com a correia: R$ 200–350.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 5W30 ou 10W30 a cada 10.000 km',          body: 'Motor Fire aceita tanto 5W30 quanto 10W30. Sintético não é obrigatório, mas prolonga a vida.' },
      { severity: 'WARN', title: 'Correia dentada a cada 60.000 km',              body: 'Motor interferente. Troca junto com a bomba d\'água e tensionador. Custo: R$ 400–600.' },
    ],
  },

  Mobi: {
    MACETES: [
      { severity: 'OK',   title: 'Motor Firefly 1.0: leve e econômico',        body: 'O motor 1.0 Firefly do Mobi é simples e confiável. A principal atenção deve ser na correia dentada — intervalo de 60.000 km ou 4 anos.' },
      { severity: 'WARN', title: 'Pneus 175/65 R14: calibre corretamente',      body: 'O Mobi tem pneus pequenos e o peso do carro pede calibragem precisa. Frontais: 29 PSI, traseiros: 28 PSI com carro vazio. Com 4 passageiros: +3 PSI em todos.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Câmbio manual com ranger ao engatar 1ª a frio', body: 'O câmbio manual do Mobi pode ranger ao engatar a 1ª marcha com motor frio. Normal nos primeiros minutos — melhora após o óleo do câmbio aquecer.' },
    ],
    MANUTENCAO: [
      { severity: 'DANGER', title: 'Correia dentada a cada 60.000 km / 4 anos', body: 'Motor interferente — ruptura da correia = motor destruído. Não negligencie.' },
      { severity: 'OK',     title: 'Óleo 5W30 a cada 10.000 km',                body: 'Motor Firefly 1.0 sem turbo. Sintético 5W30 API SN.' },
    ],
  },

  Pulse: {
    MACETES: [
      { severity: 'OK',   title: 'Motor T200 (1.0 turbo): mesma base do Argo 1.3', body: 'O motor T200 1.0 turbo do Pulse usa correia dentada, não corrente. Intervalo de 60.000 km ou 4 anos. É interferente — não adie.' },
      { severity: 'WARN', title: 'CVT: fluido específico Fiat',                     body: 'O câmbio CVT do Pulse usa fluido próprio Fiat. Fluido genérico pode danificar o câmbio. Troca a cada 60.000 km.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Motor turbo: aguarde antes de desligar',          body: 'Após uso intenso, aguarde 1–2 minutos antes de desligar o motor para o turbo resfriar com óleo circulando.' },
    ],
    MANUTENCAO: [
      { severity: 'DANGER', title: 'Correia dentada a cada 60.000 km',              body: 'Motor interferente com turbo. Criticidade alta.' },
      { severity: 'OK',     title: 'Óleo 5W30 sintético a cada 10.000 km',          body: 'Motor turbo exige sintético. Intervalo máximo: 10.000 km.' },
    ],
  },

  // ══ TOYOTA ══════════════════════════════════════════════════════════════════

  Corolla: {
    MACETES: [
      { severity: 'DANGER', title: 'Apenas óleo 0W20 full sintético',       body: 'Use exclusivamente óleo sintético 0W20 (API SP ou SN+). O sistema VVT-i é calibrado para essa viscosidade. Óleo mais grosso reduz a eficiência do sistema de variação de fase e aumenta o consumo.' },
      { severity: 'OK',     title: 'Velas de iridium: 100.000 km de vida',   body: 'As velas de iridium originais (NGK ILKAR7L11) duram até 100.000 km. Não substitua por convencionais — perda de eficiência, consumo alto e possível dano à ignição.' },
      { severity: 'WARN',   title: 'Câmbio CVT: fluido não é "vitalício"',   body: 'Ao contrário do que a Toyota diz em outros países, o câmbio CVT do Corolla vendido no Brasil não é lacrado vitalício. Troque o fluido a cada 60.000 km para evitar solavancos e falha prematura.' },
      { severity: 'OK',     title: 'Hybrid: não deixe a bateria descarregar', body: 'No Corolla Hybrid, a bateria de tração não deve ser descarregada totalmente. Evite estacionamentos prolongados (mais de 30 dias) sem usar o carro — pode danificar o banco de baterias.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN',   title: 'Motor 2ZR-FE (2009–2014): consumo de óleo elevado', body: 'O motor 2ZR-FE de algumas versões tem consumo de óleo acima do normal (até 1L a cada 3.000 km). A Toyota emitiu TSB (boletim técnico) em vários mercados. Verifique o nível mensalmente.' },
      { severity: 'OK',     title: 'Display MID com travamento',             body: 'Falha no display multifuncional do painel nos Corolla 2015–2017. Atualização de software gratuita na concessionária resolve.' },
      { severity: 'WARN',   title: 'Bomba de óleo: monitorar a pressão',     body: 'Motores com mais de 150.000 km sem trocas de óleo no prazo podem ter desgaste na bomba de óleo. Monitore o indicador de pressão — luz acesa = pare imediatamente.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 0W20 full sintético a cada 10.000 km', body: 'Use exclusivamente 0W20. O sistema VVT-i é calibrado para essa viscosidade — não use 5W30.' },
      { severity: 'OK',   title: 'Velas de iridium a cada 100.000 km',        body: 'Não substitua por convencionais. A troca é cara mas necessária apenas uma vez a cada 100k.' },
      { severity: 'WARN', title: 'Fluido do câmbio CVT a cada 60.000 km',     body: 'Troca obrigatória no Brasil. Use fluido Toyota CVTF TC ou equivalente aprovado.' },
      { severity: 'OK',   title: 'Filtro de ar da cabine a cada 15.000 km',   body: 'Fácil de trocar — fica atrás do porta-luvas. Melhora significativamente a eficiência do AC.' },
    ],
  },

  Hilux: {
    MACETES: [
      { severity: 'DANGER', title: 'Diesel S10 SEMPRE — injetores agradecem', body: 'O motor 2.8 GD-6 usa injetores Denso de alta pressão (2.000 bar). Diesel S500 entope em menos de 30.000 km. Troca de injetores: R$ 1.000–2.500 cada. Use diesel S10 de postos de confiança.' },
      { severity: 'WARN',   title: 'DPF: regenere mensalmente em rodovia',    body: 'O filtro de partículas (DPF) da Hilux Euro 6 entope com uso puramente urbano. Faça pelo menos 20 km em rodovia a mais de 80 km/h mensalmente para regeneração automática.' },
      { severity: 'OK',     title: 'Diferencial traseiro: troca de óleo nos off-roads', body: 'A cada travessia de rio ou uso off-road intenso, verifique se entrou água no diferencial (óleo com aparência leitosa = água). Troque imediatamente se contaminado.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Injetores Denso danificados por combustível ruim', body: 'Principal causa de falha da Hilux diesel no Brasil. Fumaça preta, perda de potência e consumo alto são os primeiros sintomas. Prevenção: apenas diesel S10 de postos confiáveis.' },
      { severity: 'WARN',   title: 'DPF entupido — luz de regeneração no painel',     body: 'Ao acender a luz de regeneração do DPF, vá imediatamente para uma rodovia e acelere. Ignorar essa luz por mais de 2 dias pode entupir permanentemente o filtro (R$ 5.000–15.000 de reparo).' },
      { severity: 'WARN',   title: 'Diferencial dianteiro ruidoso',                   body: 'O diferencial dianteiro da versão 4x4 exige troca de óleo a cada 40.000 km. Negligência causa ruído crescente e falha do diferencial (R$ 3.000–6.000).' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 5W30 API CJ-4 a cada 10.000 km',          body: 'Use óleo para diesel. O GD-6 aceita 5W30 ou 0W30 com especificação Toyota Diesel.' },
      { severity: 'WARN', title: 'Filtro de combustível diesel a cada 20.000 km', body: 'Com diesel S10 de qualidade variável no Brasil, antecipe para 15–20k km. Drene a água semanalmente.' },
      { severity: 'OK',   title: 'Correia dentada a cada 90.000 km',              body: 'Motor diesel interferente. Leve à concessionária Toyota.' },
      { severity: 'OK',   title: 'Fluidos dos diferenciais e transferência a cada 40.000 km', body: 'Essencial para quem usa 4x4 e off-road. Diferencial traseiro, dianteiro e caixa de transferência.' },
    ],
  },

  Yaris: {
    MACETES: [
      { severity: 'OK',   title: 'Motor 1NZ-FE/1KR: simples e confiável',   body: 'O Yaris tem um dos motores mais simples e confiáveis do mercado. Manutenção em dia e ele dura facilmente 300.000 km sem problemas sérios.' },
      { severity: 'WARN', title: 'CVT Toyota: fluido específico obrigatório', body: 'Use exclusivamente fluido Toyota CVTF TC. Fluido genérico causa solavancos e pode danificar o câmbio prematuramente.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'CVT com ruído ao engatar Ré a frio',        body: 'Ruído característico ao engatar a Ré com o motor frio em Yaris 2019–2020. Desaparece após o câmbio aquecer. Normal conforme Toyota — não é defeito.' },
      { severity: 'OK',   title: 'Manopla de câmbio manual com desgaste cosmético', body: 'A borracha da manopla do câmbio manual do Yaris se degrada visivelmente após 3–4 anos. Troca cosmética de R$ 80–150.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 5W30 a cada 10.000 km',               body: '5W30 sintético API SN. Motor simples, mas mantenha o intervalo correto.' },
      { severity: 'WARN', title: 'Fluido CVT a cada 60.000 km',               body: 'Troca obrigatória. Use Toyota CVTF TC original.' },
      { severity: 'OK',   title: 'Filtro de ar a cada 20.000 km',             body: 'Motor aspirado simples. Filtro sujo reduz potência perceptivelmente no Yaris, que já tem potência moderada.' },
    ],
  },

  // ══ FORD ════════════════════════════════════════════════════════════════════

  Ka: {
    MACETES: [
      { severity: 'WARN', title: 'Câmbio PowerShift: NUNCA use semi-ponto',   body: 'O câmbio de dupla embreagem PowerShift do Ka NÃO aceita o hábito de deixar no semi-ponto. Use freio de mão em rampas — nunca segure no semi-ponto. O kit de embreagem custa R$ 2.500–4.000.' },
      { severity: 'OK',   title: 'Motor EcoBoost: vibração em marcha lenta é normal', body: 'O motor tri-cilindro 1.0 EcoBoost vibra visivelmente em marcha lenta. Não é defeito — é característica de motor de 3 cilindros. A vibração some acima de 1.200 rpm.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Câmbio PowerShift — problema crônico e mundial', body: 'O câmbio PowerShift (dupla embreagem) do Ka é amplamente reconhecido como defeituoso. Solavancos, arranques abruptos e troca precoce da embreagem. A Ford fez recall parcial mas o problema persiste. Custo de reparo: R$ 3.500–6.000.' },
      { severity: 'WARN',   title: 'Motor 1.0 EcoBoost com consumo de óleo',        body: 'Relatos de consumo de óleo elevado acima de 60.000 km (até 500ml a cada 3.000 km). Monitore o nível mensalmente.' },
      { severity: 'WARN',   title: 'Mangote do turbo com ressecamento precoce',     body: 'Em regiões quentes (Nordeste, Centro-Oeste), o mangote do turbo resseca e racha antes de 60.000 km. Inspecione visualmente a cada revisão.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 5W30 sintético a cada 10.000 km',            body: 'Motor EcoBoost turbo exige sintético. Intervalo máximo: 10.000 km.' },
      { severity: 'WARN', title: 'Fluido do PowerShift a cada 60.000 km',           body: 'Fluido Motorcraft Full Synthetic MTX específico. Troca é obrigatória para preservar o câmbio.' },
    ],
  },

  EcoSport: {
    MACETES: [
      { severity: 'OK',   title: 'Estepe externo: calibre a 60 PSI',        body: 'O estepe externo (stépão) do EcoSport deve ser calibrado a 60 PSI. Muitos motoristas esquecem e encontram um estepe furado quando precisam. Verifique mensalmente.' },
      { severity: 'WARN', title: 'Motor 2.0 Dragon: calha de teto entope',  body: 'Versões com teto sem calha têm acúmulo de água na soleira da porta. Limpe os ralos das canaletas a cada 3 meses para evitar infiltração.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN',   title: 'Câmbio PowerShift — mesma falha do Ka',         body: 'As versões com câmbio PowerShift têm os mesmos problemas crônicos do Ka. Mesmas soluções e cuidados.' },
      { severity: 'OK',     title: 'Poça d\'água sob o carro é normal',             body: 'O EcoSport e muitos outros carros com AC formam uma poça de água sob o carro (condensação do evaporador). É normal — não é vazamento.' },
      { severity: 'WARN',   title: 'Lona do estepe traseiro com deterioração',      body: 'A capa que protege o estepe externo deteriora com UV. Sem proteção, o pneu resseca precocemente. Troque a capa a cada 4–5 anos.' },
    ],
    MANUTENCAO: [
      { severity: 'OK', title: 'Óleo 5W20 (motor 1.5 Dragon) ou 5W30 (2.0)', body: 'Verifique no manual a viscosidade correta para sua versão. Use sintético.' },
    ],
  },

  Ranger: {
    MACETES: [
      { severity: 'DANGER', title: 'Diesel S10 apenas — injetores common rail',    body: 'O motor TDCi da Ranger usa injetores common rail Delphi de alta pressão. Diesel S500 causa entupimento e falha dos injetores em menos de 30.000 km.' },
      { severity: 'WARN',   title: 'Calibragem com carga traseira: 50 PSI',        body: 'Com carga na caçamba (acima de 300kg), calibre o traseiro para 50 PSI. Sem carga: 36 PSI. Veja a plaqueta na soleira da porta.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Diferencial traseiro com ruído após off-road',   body: 'Uso off-road intenso sem troca do fluido do diferencial causa ruído progressivo. Troque o fluido diferencial a cada 40.000 km ou após uso em lama/água.' },
    ],
    MANUTENCAO: [
      { severity: 'OK', title: 'Óleo 5W30 API CJ-4 a cada 10.000 km',             body: 'Use óleo para diesel certificado. Motor TDCi é exigente.' },
      { severity: 'OK', title: 'Filtro de diesel a cada 20.000 km',                body: 'Drene a água do separador mensalmente se usar o carro com frequência.' },
    ],
  },

  // ══ HYUNDAI ═════════════════════════════════════════════════════════════════

  HB20: {
    MACETES: [
      { severity: 'OK',   title: 'Correia dentada: troque sem falta',        body: 'Troque a correia dentada a cada 60.000 km ou 5 anos. O motor 1.0 do HB20 é interferente em algumas versões — confirme no manual. O dano ao motor é de R$ 3.000–8.000.' },
      { severity: 'WARN', title: 'Coletor: limpeza da válvula PCV',           body: 'O coletor acumula fuligem pela válvula de respiro (PCV). Limpeza a cada 40.000 km evita consumo de óleo elevado e fumaça azulada.' },
      { severity: 'OK',   title: 'Fluido de freio a cada 2 anos',             body: 'Troque independentemente da quilometragem. O DOT 3 absorve umidade e perde capacidade de ebulição, causando freio esponjoso.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Válvula PCV entupida — consumo de óleo', body: 'A válvula PCV entope com frequência, gerando consumo excessivo de óleo (até 1L a cada 3.000 km) e fumaça azulada. Troque a válvula a cada 30.000 km preventivamente.' },
      { severity: 'WARN',   title: 'Mola dianteira frágil (2013–2016)',       body: 'As molas dianteiras do HB20 2013–2016 são frágeis em pavimento ruim. Ao ouvir estralo da suspensão, inspecione imediatamente — mola quebrada pode danificar o pneu.' },
      { severity: 'OK',     title: 'Trava da porta do motorista com falha elétrica', body: 'Falha no atuador elétrico da trava da porta do motorista após 3–4 anos. Componente de R$ 120–200.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN', title: 'Correia dentada a cada 60.000 km / 5 anos', body: 'Motor interferente em algumas versões — confirme no manual. Troca junto com a bomba d\'água.' },
      { severity: 'OK',   title: 'Vela de ignição a cada 30.000 km',          body: 'Use NGK ou Bosch originais. Velas inadequadas causam partida difícil no frio.' },
      { severity: 'OK',   title: 'Embreagem: inspecione o disco acima de 60k', body: 'O disco de embreagem do HB20 manual dura entre 60–80k em uso urbano intenso. Ao sentir "escorregamento" na aceleração: troque.' },
    ],
  },

  Creta: {
    MACETES: [
      { severity: 'OK',   title: 'Motor 2.0 aspirado: mais confiável que o 1.0 turbo', body: 'O motor 2.0 aspirado da Creta (versão mais básica) tem histórico mais confiável que o 1.0 turbo. Use óleo 5W30 sintético e troque a cada 10.000 km.' },
      { severity: 'WARN', title: 'Câmbio automático 6v: fluido a cada 40.000 km com uso intenso', body: 'O câmbio automático de 6 velocidades exige troca de fluido a cada 60.000 km em uso normal, ou 40.000 km em uso urbano intenso (muito stop-and-go).' },
      { severity: 'OK',   title: 'Sensores de estacionamento: mantenha o para-choque limpo', body: 'Os sensores traseiros são sensíveis a sujeira e ceras de silicone. Limpe o para-choque corretamente ao lavar o carro para evitar falsos alarmes.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Motor 1.0 turbo com consumo de óleo',    body: 'O motor 1.0 turbo da Creta 2022+ apresenta relatos de consumo de óleo elevado após 60.000 km. Monitore o nível mensalmente.' },
      { severity: 'WARN',   title: 'Câmbio DCT com solavanco lento',         body: 'O câmbio de dupla embreagem (DCT) do HB20 e Creta apresenta solavanco característico em manobras lentas abaixo de 20 km/h. Atualização de software da Hyundai ameniza.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 5W30 sintético a cada 10.000 km',     body: 'Versão 2.0: 5W30 API SN. Versão 1.0 turbo: 5W30 API SP. Sintético obrigatório no turbo.' },
      { severity: 'WARN', title: 'Fluido do câmbio automático a cada 60k',   body: 'Troca obrigatória. Use fluido Hyundai/Kia SP-IV H.' },
      { severity: 'OK',   title: 'Filtro de ar a cada 20.000 km',            body: 'Inspecione visualmente a cada troca de óleo. Troque se estiver visivelmente sujo.' },
    ],
  },

  // ══ RENAULT ═════════════════════════════════════════════════════════════════

  Kwid: {
    MACETES: [
      { severity: 'OK',   title: 'Motor SCe 1.0: simples e econômico',       body: 'O motor SCe 1.0 do Kwid é aspirado e simples — um dos motores mais fáceis de manter. Com manutenção em dia, dura facilmente 200.000 km.' },
      { severity: 'OK',   title: 'Consumo real: gasolina vs etanol',          body: 'Com gasolina: ~14 km/l (cidade). Com etanol: ~10 km/l. O ponto de equilíbrio etanol/gasolina é 70% do preço da gasolina — abaixo disso, prefira gasolina.' },
      { severity: 'WARN', title: 'Pneus 165/70 R14: calibre semanalmente',   body: 'Os pneus pequenos do Kwid são sensíveis à calibragem. Pneu subcalibrado prejudica muito a estabilidade e o consumo. Calibre frontais a 28 PSI e traseiros a 28 PSI.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Câmbio manual com ranger ao engatar 1ª a frio', body: 'O câmbio manual do Kwid pode ranger ou ser duro ao engatar a 1ª marcha com o motor frio. É comum nos primeiros minutos — some após aquecer.' },
      { severity: 'WARN', title: 'Para-brisa com infiltração (modelos 2017)',      body: 'A vedação do para-brisa de alguns Kwid 2017 apresenta infiltração em chuva forte. Verifique o tapete do lado do passageiro.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN', title: 'Correia dentada a cada 60.000 km / 4 anos',     body: 'Motor interferente. Troca a cada 60.000 km ou 4 anos. Custo: R$ 400–600.' },
      { severity: 'OK',   title: 'Óleo 5W30 a cada 10.000 km',                    body: 'Semissintético ou sintético 5W30 API SN.' },
      { severity: 'OK',   title: 'Filtro de ar a cada 15.000 km',                 body: 'Simples de trocar. Em cidades com muita poeira, inspecione a cada 10.000 km.' },
    ],
  },

  Sandero: {
    MACETES: [
      { severity: 'OK',   title: 'Motor D4F / H4M: simples e robusto',       body: 'O motor do Sandero é simples e confiável. A principal atenção: correia dentada rigorosamente no intervalo e fluido de câmbio.' },
      { severity: 'WARN', title: 'EDC (câmbio robotizado): não use semi-ponto', body: 'O câmbio EDC do Sandero é um câmbio manual robotizado — não suporta o hábito de semi-ponto em rampas. Use freio de mão em subidas.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'EDC com solavanco em manobras lentas',      body: 'O câmbio robotizado EDC do Sandero é notoriamente solavancante em tráfego lento. Atualização de software ameniza — leve à concessionária.' },
      { severity: 'OK',   title: 'Sensor de temperatura com oscilação',       body: 'Alguns Sanderos apresentam oscilação no indicador de temperatura do motor. Geralmente é o sensor de temperatura (R$ 50–100) — não o motor aquecendo.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN', title: 'Correia dentada a cada 60.000 km',          body: 'Motor interferente. Não adie.' },
      { severity: 'OK',   title: 'Óleo 5W30 a cada 10.000 km',                body: 'Sintético 5W30 API SN.' },
    ],
  },

  Logan: {
    MACETES: [
      { severity: 'OK',   title: 'Motor K7M/K4M: confiabilidade acima da média', body: 'O motor do Logan é reconhecido pela durabilidade. Com manutenção em dia, facilmente passa dos 300.000 km.' },
      { severity: 'OK',   title: 'Porta-malas espaçoso: distribuição de peso',   body: 'O Logan tem 510L de porta-malas. Distribua a carga uniformemente — concentrar peso num lado prejudica os amortecedores traseiros.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Radiador com entupimento após 100.000 km',  body: 'O radiador original do Logan entope com líquido de arrefecimento degradado. Troque o fluido a cada 2 anos e o radiador se notar temperatura subindo.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN', title: 'Correia dentada a cada 60.000 km',          body: 'Motor interferente. Essencial.' },
      { severity: 'OK',   title: 'Óleo 5W30 a cada 10.000 km',                body: 'Semissintético mínimo para os motores Logan.' },
    ],
  },

  Duster: {
    MACETES: [
      { severity: 'OK',   title: 'Protetor de cárter é essencial para off-road',  body: 'O motor do Duster fica baixo. Se você usa trilhas, instale um protetor de cárter de aço antes de ir. Custo: R$ 300–500. Sem ele, uma pedra pode furar o cárter.' },
      { severity: 'WARN', title: 'CVT: não force subidas longas com AC ligado',   body: 'O câmbio CVT do Duster aquece excessivamente em subidas longas com ar condicionado. Se o carro "travar" a potência, desligue o AC temporariamente.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Motor 2.0 16V com consumo de óleo acima de 80k', body: 'O motor 2.0 16V (F4R) do Duster apresenta consumo de óleo após 80.000 km (anel de segmento). Monitore o nível mensalmente.' },
      { severity: 'WARN', title: 'Diferencial traseiro com ruído em off-road intenso', body: 'Uso off-road intenso sem troca do fluido do diferencial traseiro causa ruído progressivo. Troca a cada 40.000 km.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 5W30 a cada 10.000 km',                    body: 'Motor 1.6 ou 2.0. Sintético 5W30 API SN.' },
      { severity: 'OK',   title: 'Fluido diferencial traseiro a cada 40.000 km', body: 'Essencial para uso off-road. Diferencial seco = reparo caro.' },
      { severity: 'WARN', title: 'Correia dentada a cada 60.000 km (1.6) ou 90.000 km (2.0)', body: 'Confirme o intervalo no manual para sua versão. Motor interferente nos dois casos.' },
    ],
  },

  // ══ HONDA ═══════════════════════════════════════════════════════════════════

  Civic: {
    MACETES: [
      { severity: 'DANGER', title: 'SOMENTE óleo 0W20 full sintético',             body: 'O motor 1.5 VTEC turbo do Civic tem problema documentado de diluição do óleo com combustível (especialmente com etanol). Óleo mais grosso piora o problema. Use 0W20 full sintético API SN+ e NUNCA use semissintético.' },
      { severity: 'WARN',   title: 'Troca de óleo a cada 7.500 km — não 10.000 km', body: 'Devido à diluição de óleo com combustível (problema crônico do 1.5 turbo flex), antecipe a troca para 7.500 km. Óleo diluído não lubrifica adequadamente o turbo.' },
      { severity: 'OK',     title: 'Modo ECON desativa AC parcialmente',            body: 'O modo ECON reduz a potência do compressor do AC. Em cidades quentes ou em subidas longas, desative o ECON — o motor vai trabalhar mais eficientemente.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Diluição de óleo com combustível — problema grave e documentado', body: 'O motor 1.5 VTEC turbo flex do Civic dilui o óleo com combustível, especialmente com etanol. Honda reconheceu o problema mundialmente. Sintoma: odor de gasolina no óleo, nível acima do máximo. Solução: troca mais frequente de óleo (7.500 km) e uso de gasolina preferencialmente.' },
      { severity: 'WARN',   title: 'Recall de airbag Takata — verifique seu carro',   body: 'Varios Civics 2013–2019 estão na lista do recall do airbag Takata (estilhaços que podem ferir os ocupantes). Verifique no site do Detran pelo chassi (RENAVAM).' },
      { severity: 'WARN',   title: 'CVT com solavanco na aceleração suave',            body: 'O câmbio CVT do Civic 1.5 turbo apresenta solavanco característico na aceleração moderada de cruzeiro. Atualização de software da Honda ameniza — leve à concessionária.' },
    ],
    MANUTENCAO: [
      { severity: 'DANGER', title: 'Óleo 0W20 full sintético a cada 7.500 km',     body: 'NÃO estenda para 10.000 km. Diluição de óleo é real neste motor. Troca frequente é a principal forma de proteção.' },
      { severity: 'WARN',   title: 'Fluido CVT Honda a cada 40.000 km',            body: 'Use apenas fluido Honda CVT. Fluido genérico ou troca negligenciada destrói o câmbio (R$ 5.000–12.000).' },
      { severity: 'OK',     title: 'Velas de iridium a cada 100.000 km',           body: 'Use NGK ILZKAR7G11DS originais. Não substitua por convencionais.' },
    ],
  },

  'HR-V': {
    MACETES: [
      { severity: 'DANGER', title: 'Fluido CVT Honda: NUNCA use genérico',         body: 'O CVT Honda usa fluido proprietário com aditivos específicos. Fluido genérico causa desgaste acelerado das correias e polias. Use Honda CVT Fluid ou equivalente aprovado pela Honda.' },
      { severity: 'OK',     title: 'Modo Sport: use em ultrapassagens',             body: 'O modo Sport ativa respostas mais rápidas do CVT e melhora a resposta do acelerador. Ideal para ultrapassagens — não precisa usar no dia a dia.' },
      { severity: 'OK',     title: 'Filtro de cabine: troca simples sem ferramenta', body: 'O filtro de cabine do HR-V fica atrás do porta-luvas e pode ser trocado em 5 minutos sem ferramentas. Tutorial disponível no YouTube.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'CVT com aquecimento em uso urbano intenso',       body: 'O CVT do HR-V pode superaquecer em tráfego lento intenso com muito stop-and-go. Sintoma: perda de potência temporária. Solução: troca do fluido em dia e evitar uso intenso prolongado.' },
      { severity: 'WARN', title: 'Rolamento de roda dianteiro com desgaste precoce', body: 'Relatos de desgaste do rolamento dianteiro antes de 60.000 km em uso urbano intenso. Sintoma: ronco que muda conforme a curvatura da pista.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 0W20 a cada 7.500 km (1ª geração)',         body: '1ª geração (2016–2021): 0W20 a cada 7.500 km. 2ª geração (2022+): confirme no manual.' },
      { severity: 'WARN', title: 'Fluido CVT Honda a cada 40.000 km',              body: 'Troca obrigatória. Use Honda CVT Fluid original. Intervalo máximo recomendado: 40.000 km.' },
    ],
  },

  Fit: {
    MACETES: [
      { severity: 'OK',   title: 'VTEC ativa acima de 2.500 rpm — é normal',       body: 'Ao acelerar além de 2.500 rpm, o Fit muda visivelmente de personalidade (sistema i-VTEC). O carro "acorda" — isso é o sistema de variação de fase funcionando. Normal.' },
      { severity: 'OK',   title: 'Magic Seat: lubrifique as dobradiças',            body: 'O sistema Magic Seat do Fit tem dobradiças que podem ranger após 2–3 anos. Aplique graxa branca nos pivôs a cada 20.000 km.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'CVT Honda com aquecimento em uso intenso',        body: 'O CVT do Fit aquece em uso urbano muito intenso. Troca do fluido em dia (40.000 km) é a principal prevenção.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 0W20 a cada 7.500 km',                      body: '0W20 full sintético. Motor i-VTEC é sensível à qualidade do óleo.' },
      { severity: 'WARN', title: 'Fluido CVT Honda a cada 40.000 km',              body: 'Não use genérico. Fluido Honda CVT original.' },
    ],
  },

  City: {
    MACETES: [
      { severity: 'OK',   title: 'Motor 1.5 i-VTEC: mesmas dicas do Fit',         body: 'O City usa o mesmo motor i-VTEC do Fit. Mesmas recomendações de óleo e cuidados se aplicam.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'CVT com solavanco no arranque',                  body: 'O CVT do City (especialmente 2015–2018) apresenta solavanco característico no arranque em subidas. Atualização de software ajuda.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 0W20 a cada 7.500 km',                     body: '0W20 full sintético. Mesmo protocolo do Fit.' },
      { severity: 'WARN', title: 'Fluido CVT Honda a cada 40.000 km',             body: 'Obrigatório. Fluido original Honda.' },
    ],
  },

  // ══ JEEP ════════════════════════════════════════════════════════════════════

  Renegade: {
    MACETES: [
      { severity: 'OK',   title: 'Motor T270: reset do câmbio DDCT',         body: 'Se sentir solavanco excessivo no câmbio DDCT, tente o reset: desligue o carro, espere 30s, ligue sem dar partida, espere 5s, então dê a partida. Isso recalibra o atuador do câmbio.' },
      { severity: 'WARN', title: '4x4: use Lock apenas para off-road pesado', body: 'O modo 4WD Lock é para off-road com obstáculos. Na estrada ou asfalto molhado, use 4WD Auto — o sistema distribui a tração automaticamente sem danificar o diferencial.' },
      { severity: 'OK',   title: 'Óleo 0W20 full sintético obrigatório',      body: 'O motor T270 (Tigershark 2.0) exige 0W20 sintético. Não use óleo de viscosidade superior — prejudica o VVT.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Ruído da corrente de distribuição a frio — problema crônico', body: 'O motor T270 tem ruído característico de corrente nos primeiros 5–10 segundos após a partida a frio. É um problema crônico amplamente documentado. A Jeep emitiu TSBs, mas não fez recall. Monitoramento constante é necessário.' },
      { severity: 'DANGER', title: 'Câmbio DDCT com solavanco — idêntico ao DSG',                 body: 'O câmbio de dupla embreagem DDCT do Renegade tem os mesmos problemas do DSG da VW. Solavancos abaixo de 40 km/h são amplamente relatados. Atualização de software é paliativa.' },
      { severity: 'WARN',   title: 'Vazamento de óleo na tampa da corrente',                      body: 'Relatos de vazamento de óleo pelo vedante frontal do motor T270 (próximo à corrente). Se notar mancha de óleo no chão, leve à assistência imediatamente.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 0W20 a cada 7.500 km',                body: 'Motor T270 exige 0W20 full sintético. Intervalo máximo: 7.500 km.' },
      { severity: 'WARN', title: 'Fluido do DDCT a cada 60.000 km',          body: 'Fluido Mopar CVTF+4. Troca negligenciada é causa frequente de falha do câmbio.' },
    ],
  },

  Compass: {
    MACETES: [
      { severity: 'OK',   title: 'Sistema Select Terrain: use os modos corretos', body: 'Auto: asfalto e terra firme. Snow: chuva forte e gelo. Sand: areia e praia. Mud: lama. Não use Snow no asfalto seco — aumenta o consumo sem benefício.' },
      { severity: 'WARN', title: 'Válvula PCV: inspecione a cada 30k km',        body: 'A válvula PCV do motor T270 entope com frequência, causando consumo de óleo e pressurização do cárter. Troca preventiva: R$ 80–150.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Motor T270 com ruído de corrente — mesma falha do Renegade', body: 'O Compass usa o mesmo motor T270 do Renegade. Ruído de corrente a frio é o problema mais comum e documentado.' },
      { severity: 'WARN',   title: 'Touchscreen com travamento',              body: 'O sistema Uconnect do Compass pode travar. Soft reset: pressione os botões volume e avanço simultaneamente por 10 segundos.' },
    ],
    MANUTENCAO: [
      { severity: 'OK', title: 'Óleo 0W20 a cada 7.500 km',                   body: 'Motor T270 exige 0W20 full sintético.' },
      { severity: 'OK', title: 'Fluido do câmbio automático 6v a cada 60k',    body: 'Câmbio 6 velocidades ZF. Fluido Mopar ATF+4.' },
    ],
  },

  // ══ NISSAN ══════════════════════════════════════════════════════════════════

  Sentra: {
    MACETES: [
      { severity: 'WARN', title: 'CVT NS-3: fluido obrigatório a cada 50.000 km',        body: 'O CVT Xtronic (Jatco JF015) usa fluido Nissan NS-3 — não existe equivalente genérico aprovado. O manual diz 100.000 km, mas no Brasil (calor + trânsito) mecânicos especializados recomendam 50.000 km para o B17 e 60.000 km para o B18. Fluido degradado causa shudder e pode destruir a caixa (R$ 15.000+ de reparo).' },
      { severity: 'WARN', title: 'Reaprendizado do corpo de borboleta após limpeza',      body: 'Após limpar o corpo de borboleta (faça a cada 30.000 km), execute o reaprendizado: com o motor frio, gire a chave sem ligar por 2 s, pressione o acelerador 5x, aguarde 7 s, segure fundo por 10 s até o Check Engine piscar, solte 2 s, segure novamente 12 s. Sem o reaprendizado, a marcha lenta fica irregular e o carro pode "morrer" nos semáforos.' },
      { severity: 'OK',   title: 'Óleo 5W30 sintético API SN — nunca semissintético',    body: 'Motor HR16DE (1.6) e MRA8DE (2.0) exigem sintético 100% 5W30 API SN ou superior. Capacidade: 3,4 L (1.6) e 4,4 L (2.0 B17) ou 5,0 L (2.0 B18). Nunca use semissintético — o calor do motor brasileiro degrada óleo inferior rapidamente.' },
      { severity: 'OK',   title: 'Ligar o AC antes de entrar no carro parado ao sol',    body: 'Antes de entrar, ligue a ignição e acione o AC enquanto ainda está do lado de fora (ou use o controle remoto). O carro começa a refrigerar com o motor menos quente. O eletroventilador do Sentra B17 2013–2014 é fraco — menos demanda inicial prolonga sua vida.' },
      { severity: 'OK',   title: 'Motor tem corrente de distribuição — sem troca',       body: 'HR16DE e MRA8DE usam corrente de distribuição (não correia). Sem troca programada. No entanto, barulho metálico a frio indica corrente esticada — inspecione ao primeiro sinal.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'CVT sem kit de tropicalização (B17 até 2013)',       body: 'A Nissan não instalou o resfriador de óleo da transmissão no Sentra B17 fabricado antes de 2014. Nos EUA esse kit foi tornado obrigatório por agências reguladoras; no Brasil a Nissan negou o recall. Resultado: transmissão superaquece em trânsito lento e calor intenso. Kit Nissan 21606-ET89B existe para retrofitting — exija da concessionária em caso de falha.', yearFrom: 2013, yearTo: 2013 },
      { severity: 'DANGER', title: 'Eletroventilador do radiador — queima prematura',    body: 'O motor da ventoinha do radiador nos modelos 2013–2014 tem escovas de carvão de baixa qualidade que se desgastam rapidamente. Sintoma: AC para de resfriar, cheiro de queimado, motor pode superaquecer sem alerta no painel. Solução econômica: trocar apenas as escovas com eletricista automotivo (R$ 50–150). Troca do conjunto completo Nissan: R$ 1.900. Se ignorado, pode queimar o compressor do AC (R$ 5.000 em peças).', yearFrom: 2013, yearTo: 2014 },
      { severity: 'WARN',   title: 'CVT — trepidação (shudder) ao partir',              body: 'Vibração/tremor ao acelerar suavemente entre 1.200–1.500 rpm, especialmente em aclives. Principal causa: fluido CVT NS-3 degradado por intervalos longos. 1ª medida: troca do fluido. 2ª: reprogramação do conversor de torque na concessionária. 3ª: troca do conversor (R$ 3.000–5.000). Quarta opção — transmissão completa — supera R$ 15.000.' },
      { severity: 'WARN',   title: 'Corpo de borboleta — carbonização',                 body: 'Acúmulo de borra de carbono no corpo de borboleta é muito comum em motores Flex com uso misto de álcool e gasolina. Sintomas: marcha lenta irregular, engasgos ao soltar o acelerador, carro "morre" na frenagem. Limpeza com spray Motul Throttle Body Clean a cada 30.000 km, seguida do reaprendizado. Custo na oficina: R$ 80–200.' },
      { severity: 'WARN',   title: 'Consumo elevado de óleo (MRA8DE 2.0) acima de 100k', body: 'O motor 2.0 MRA8DE apresenta consumo progressivo de óleo acima de 100.000 km — velas carbonizadas e sem vazamento visível indicam anéis de pistão. Solução inicial: flush de motor + óleo sintético 5W30 de qualidade superior. Em casos graves, retífica (R$ 4.000–6.000). Monitorar o nível a cada abastecimento.' },
      { severity: 'WARN',   title: 'Suspensão dianteira — barulho "toc toc" em lombadas', body: 'Barulhos ao passar em irregularidades indicam buchas da bandeja dianteira e/ou batentes dos amortecedores desgastados. Acima de 80.000 km é quase inevitável. Custo: R$ 400–1.200 dependendo das peças. Se persistir após buchas, investigar cubo de roda empenado.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',     title: 'Óleo 5W30 API SN sintético a cada 10.000 km',       body: 'Intervalo máximo 10.000 km ou 6 meses. Em uso severo (trânsito intenso, calor extremo): antecipar para 7.500 km. Marcas aprovadas: Castrol Edge, Mobil 1, Shell Helix Ultra, Lubrax Excellium — todas 5W30 sintético.' },
      { severity: 'WARN',   title: 'Fluido CVT NS-3 a cada 50.000 km (B17) / 60.000 km (B18)', body: 'O manual Nissan indica 100.000 km, mas foi desenvolvido para o clima americano. No Brasil, a recomendação de mecânicos especializados é: B17 (2013–2019) a cada 50.000 km; B18 (2020+) a cada 60.000 km. Troca completa com máquina inclui limpeza do carter, filtro interno e ímãs — R$ 1.200–1.400 na concessionária.' },
      { severity: 'OK',     title: 'Velas iridium a cada 100.000 km',                   body: 'HR16DE: NGK PLZKAR6A-11D. MRA8DE: NGK LFR5AIX-11. Com uso frequente de etanol, inspecionar a cada 20.000 km — etanol é mais corrosivo para eletrodos. Nunca use velas não-iridium no Sentra.' },
      { severity: 'OK',     title: 'Limpeza do corpo de borboleta a cada 30.000 km',    body: 'Item crítico no Sentra Flex. Use spray específico (Motul, 3M ou equivalente) e execute o reaprendizado eletrônico após a limpeza. Custo total na oficina: R$ 80–200.' },
      { severity: 'OK',     title: 'Fluido de arrefecimento a cada 80.000 km',          body: 'Use Nissan Coolant (azul) ou Long Life Coolant compatível. NUNCA misture cores — o azul Nissan é à base de silicato e o verde universal é OAT; a mistura forma geleia e entope o radiador. Capacidade: ~6 litros.' },
      { severity: 'OK',     title: 'Correia dos acessórios: inspecionar a cada 40.000 km e trocar a cada 80.000 km', body: 'Correia dos acessórios (alternador, compressor, bomba de direção) de borracha EPDM. Trincas e fissuras indicam troca imediata — ruptura deixa o motor superaquecer e mata a bateria enquanto você dirige.' },
    ],
  },

  Tiida: {
    MACETES: [
      { severity: 'DANGER', title: 'Dois termostatos — troque preventivamente juntos',  body: 'O motor MR18DE 1.8 do Tiida tem dois termostatos independentes: um no cabeçote e outro no bloco. Quando um falha travado fechado, o sistema de arrefecimento fica parcialmente bloqueado sem alerta evidente no painel. Resultado: queima de junta do cabeçote (R$ 3.000–6.000). Troque os dois preventivamente a cada 60.000 km. Custo do par na concessionária: acima de R$ 1.000 — vale cada centavo.' },
      { severity: 'WARN',   title: 'Tensionador de corrente de nylon — vigie acima de 100k', body: 'O motor MR18DE usa corrente de distribuição (não correia), mas o tensionador tem bucha de nylon que se desgasta. Sintoma: barulho metálico "traquejo" a frio que desaparece após aquecer. Ignorar leva a corrente pulando e motor destruído. Kit completo (2 correntes + 2 guias + 2 tensionadores + 3 engrenagens): R$ 800–1.500 aftermarket ou R$ 2.500–3.500 Nissan original.' },
      { severity: 'OK',     title: 'Câmbio automático 4v usa Nissan Matic-S — não NS-3', body: 'O câmbio automático convencional 4v do Tiida NÃO é CVT. Usa fluido Nissan Matic-S (ou Matic-W). Trocar a cada 40.000 km. NUNCA use fluido CVT NS-2/NS-3 neste câmbio — são incompatíveis e causam danos irreversíveis.' },
      { severity: 'OK',     title: 'Limpeza do corpo de borboleta a cada 30.000 km',    body: 'MR18DE compartilha o mesmo problema de carbonização dos demais motores Nissan Flex. Faça o reaprendizado após a limpeza — mesmo procedimento do Sentra.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Termostatos duplos — superaquecimento silencioso',  body: 'Principal problema crônico do Tiida. Os dois termostatos falham em momentos diferentes, e o segundo falhar pode não acionar o alerta de temperatura por subir muito devagar. O cabeçote empenado não tem sintoma óbvio até a junta queimar. Monitore a temperatura diariamente e troque os dois termostatos preventivamente a cada 60.000 km.' },
      { severity: 'WARN',   title: 'Tensionador de corrente — "traquejo" a frio',       body: 'Barulho metálico nos primeiros 30 segundos após a partida que desaparece com o aquecimento. Indica tensionador com bucha de nylon desgastada. Se ignorado: corrente pula e destrói válvulas e pistões (retífica completa R$ 4.000–8.000). Kit corrente completo: R$ 800–1.500.' },
      { severity: 'WARN',   title: 'Compressor de AC — travamento acima de 100.000 km', body: 'Compressor DENSO original do Tiida trava quando o nível de gás R-134a cai (por vazamento lento de vedação). O AC para abruptamente com barulho ao tentar ligar. Custo: recarga de gás R$ 150–300 + verificação de vazamento. Compressor travado: R$ 1.500–2.500.' },
      { severity: 'WARN',   title: 'Câmbio automático — solavanco 1ª para 2ª',         body: 'Tranco característico ao engrazar a 2ª marcha no câmbio automático 4v. Causa: fluido ATF degradado + desgaste do kit de embreagem interna. Primeira medida: troca do fluido Matic-S a cada 40.000 km (R$ 200–400). Em casos graves: kit de embreagem (R$ 1.500–3.000).' },
      { severity: 'WARN',   title: 'Consumo excessivo de óleo (produção 2007–2010)',    body: 'Tiidas fabricados no México de 2007 a 2010 apresentam consumo de óleo progressivo acima de 80.000 km. Nível baixa sem vazamento visível. Solução inicial: motor flush + sintético 5W30 de qualidade. Consumo normal: até 200 ml/1.000 km. Acima disso, inspecionar anéis.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 5W30 sintético a cada 10.000 km',              body: 'Capacidade: 4,4 litros (motor MR18DE 1.8). API SN ou superior. Nunca exceder 10.000 km — motor MR18DE sem turbo mas sensível à qualidade do óleo.' },
      { severity: 'DANGER', title: 'Termostatos: troque os DOIS a cada 60.000 km',    body: 'Item único do Tiida — dois termostatos. Trocar preventivamente os dois juntos a cada 60.000 km. Nunca troque só um — o outro falha logo depois e você já pagou a mão de obra. Custo par: acima de R$ 1.000.' },
      { severity: 'WARN', title: 'Fluido do câmbio automático (Matic-S) a cada 40.000 km', body: 'Use Nissan Matic-S ou Matic-W. Nunca fluido CVT. Troca parcial: R$ 200–400. Troca total com flush: R$ 400–600.' },
      { severity: 'WARN', title: 'Kit de corrente: inspecionar a cada 80.000 km',     body: 'Não precisa trocar a corrente, mas inspecionar o tensionador. Ao primeiro sinal de traquejo a frio, trocar o kit completo imediatamente.' },
      { severity: 'OK',   title: 'Velas iridium a cada 100.000 km',                   body: 'NGK ILZKAR7B11 para o motor MR18DE. Em uso majoritário com etanol, inspecionar a cada 20.000 km.' },
      { severity: 'OK',   title: 'Limpeza do corpo de borboleta a cada 30.000 km',    body: 'Faça o reaprendizado após a limpeza — o procedimento é o mesmo dos demais Nissans Flex.' },
    ],
  },

  Livina: {
    MACETES: [
      { severity: 'DANGER', title: 'Motor 1.6 tem CORREIA dentada — troque a cada 80.000 km', body: 'A Livina 1.6 usa o motor Renault K4M — com CORREIA dentada (não corrente). Motor de interferência: se a correia arrebentar, válvulas colidem com pistões e o motor é destruído (retífica R$ 4.000–8.000). Troque obrigatoriamente a cada 80.000 km ou 4 anos, SEMPRE com tensor e polia tensora. Custo preventivo: R$ 600–1.200.' },
      { severity: 'WARN',   title: 'Motor 1.8 tem CORRENTE — tensionador de nylon é o ponto fraco', body: 'A Livina 1.8 usa motor Nissan MR18DE com corrente de distribuição. Não precisa troca programada, mas o tensionador tem bucha de nylon que desgasta. Sintoma: barulho metálico a frio. Kit corrente completo se aparecer o sintoma: R$ 800–1.500.' },
      { severity: 'OK',     title: 'Câmbio automático 4v: fluido Nissan Matic-S obrigatório', body: 'O câmbio automático convencional da Livina NÃO é CVT. Fluido correto: Nissan Matic-S ou Matic-W. Trocar a cada 40.000 km. Fluido degradado causa trancos e escorregamento sob aceleração.' },
      { severity: 'OK',     title: 'Capacidade do porta-malas: distribua o peso corretamente', body: 'Livina pode ser configurada com 7 lugares. Com 3ª fileira ocupada e bagageiro no teto, o traseiro fica sobrecarregado. Calibre o pneu traseiro para carga (ver plaqueta na porta do motorista) e verifique o nível de óleo do câmbio com mais frequência.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Correia dentada do motor 1.6 K4M — ruptura sem aviso', body: 'A correia do motor Renault K4M pode partir sem sintomas prévios claros. Não espere o barulho ou a perda de potência — troque preventivamente no prazo. Muitos proprietários não sabem que a Livina 1.6 tem correia (diferente da 1.8 com corrente). Confira o tipo de motor na nota fiscal ou no manual.', yearFrom: 2007, yearTo: 2016 },
      { severity: 'WARN',   title: 'Tensionador de corrente (motor 1.8) — traquejo a frio', body: 'Mesmo problema do Tiida 1.8. Barulho metálico na partida a frio que some após aquecer. Ignorar leva à quebra da corrente e destruição do motor.' },
      { severity: 'WARN',   title: 'Câmbio automático — escorregamento e trancos',      body: 'Acima de 80.000 km com fluido nunca trocado, o câmbio automático apresenta escorregamento sob aceleração intensa e trancos ao mudar de marcha. Troca de fluido Matic-S a cada 40.000 km é a prevenção. Reparo: R$ 1.500–3.000.' },
      { severity: 'WARN',   title: 'Rack de direção — folga e barulho acima de 120k',   body: 'Rack de direção hidráulica desgasta e desenvolve folga perceptível em curvas e ao manobrar. Custo de retífica do rack: R$ 600–1.500. Troca por novo: R$ 1.500–3.000. Sintoma: leve imprecisão na direção e barulho em baixa velocidade.' },
      { severity: 'WARN',   title: 'Termostatos duplos (motor 1.8) — superaquecimento', body: 'O motor MR18DE 1.8 da Livina tem os mesmos dois termostatos do Tiida. Mesma recomendação: trocar os dois preventivamente a cada 60.000 km.' },
    ],
    MANUTENCAO: [
      { severity: 'DANGER', title: 'Correia dentada motor 1.6 K4M a cada 80.000 km',   body: 'Trocar com tensor + polia tensora obrigatoriamente. Motor de interferência — correia partida = motor destruído. Custo: R$ 600–1.200.' },
      { severity: 'OK',     title: 'Óleo 5W30 sintético a cada 10.000 km',             body: 'Motor K4M 1.6: capacidade 4,8 L. Motor MR18DE 1.8: capacidade 4,4 L. API SN sintético. Intervalo máximo 10.000 km ou 6 meses.' },
      { severity: 'WARN',   title: 'Fluido câmbio automático (Matic-S) a cada 40.000 km', body: 'Nissan Matic-S ou Matic-W. Nunca fluido CVT. Troca: R$ 250–400.' },
      { severity: 'WARN',   title: 'Termostatos motor 1.8: trocar os dois a cada 60.000 km', body: 'Mesmo procedimento do Tiida. Custo: acima de R$ 1.000 pelo par. Risco de não fazer: queima de junta do cabeçote (R$ 4.000–6.000).' },
      { severity: 'OK',     title: 'Velas iridium a cada 60.000 km',                   body: 'Motor 1.6 K4M e 1.8 MR18DE. Inspecionar a cada 20.000 km em uso com etanol.' },
    ],
  },

  Kicks: {
    MACETES: [
      { severity: 'WARN', title: 'CVT NS-3: único fluido aprovado — troque a cada 60.000 km', body: 'O CVT Xtronic do Kicks usa 9 litros de fluido Nissan NS-3 no sistema completo. Fluido genérico ou NS-2 em CVTs mais antigos causam desgaste e falha prematura. O manual diz 100.000 km — no Brasil (calor + trânsito), a recomendação de especialistas é 60.000 km. Troca completa com máquina na concessionária: R$ 1.000–1.400.' },
      { severity: 'OK',   title: 'Modo "S": use em subidas, ultrapassagens e reboque', body: 'O modo S do câmbio mantém a faixa de rotação mais alta, dando resposta imediata. Ideal para subidas longas, ultrapassagens e quando estiver rebocando bicicletas ou trailer leve. No dia a dia em trânsito plano, o modo D é mais eficiente.' },
      { severity: 'OK',   title: 'Óleo 5W30 sintético — inspecionar o nível mensalmente', body: 'Motor HR16DE 1.6 Flex: capacidade 4,4 L, óleo 5W30 API SN sintético. O HR16DE fabricado no México (2017–2019) tem histórico de consumo de óleo acima de 80.000 km. Inspecione o nível mensalmente e não espere a luz acender.' },
      { severity: 'OK',   title: 'Motor 1.0 Turbo (2022+): cooling period do turbo',   body: 'Após uso intenso (subidas, trânsito lento com AC no máximo), aguarde 60 segundos com o motor em marcha lenta antes de desligar. O turbo continua quente após o motor parar — o óleo ainda circulando resfria os mancais e evita "coking" (carbonização do óleo no turbo).', yearFrom: 2022, yearTo: null },
      { severity: 'OK',   title: 'Limpeza do corpo de borboleta a cada 30.000 km',     body: 'HR16DE acumula carbono no corpo de borboleta por uso de combustível Flex. Sintoma: marcha lenta irregular, engasgos. Limpeza + reaprendizado: R$ 80–200 na oficina.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'CVT com vazamento de óleo (Kicks 2022)',           body: 'Múltiplos relatos de manchas de óleo sob o veículo em Kicks 2022, causadas por falha de vedação na transmissão CVT. A Nissan Brasil negou cobertura de garantia em vários casos documentados. Se identificar vazamento, acione o Procon/DECON. Custo do reparo fora de garantia: R$ 3.000–8.000.', yearFrom: 2022, yearTo: 2022 },
      { severity: 'WARN',   title: 'CVT — trepidação e solavanco ao desacelerar',      body: 'Vibração ao partir de semáforo e solavanco ao reduzir para baixo de 30 km/h é o problema mais relatado do Kicks. Causa principal: fluido NS-3 degradado por intervalos longos. Troca do fluido resolve na maioria dos casos. Se persistir: reprogramação da unidade de controle do CVT na concessionária.' },
      { severity: 'WARN',   title: 'Consumo de óleo elevado (HR16DE acima de 80k)',    body: 'O motor HR16DE Flex apresenta consumo progressivo de óleo acima de 80.000 km — entre 300–500 ml a cada 3.000 km. Sem vazamento visível. Causa: anéis de pistão com folga. Solução inicial: motor flush + sintético 5W30 superior. Inspecione o nível a cada abastecimento.' },
      { severity: 'WARN',   title: 'Suspensão — estalos em lombadas acima de 60k',    body: 'Batentes (buffers) dos amortecedores dianteiros desgastam prematuramente. Barulho "estalo" ao passar em lombadas ou sarjetas. Troca do par de batentes: R$ 200–500. Se persistir, verificar buchas da bandeja.' },
      { severity: 'WARN',   title: 'Compressor de AC: ciclagem excessiva (liga/desliga)', body: 'O compressor do Kicks cicla com frequência maior que o normal, especialmente em temperatura acima de 35°C. Causas: gás abaixo do nível ideal ou sensor de pressão com defeito. Verifique a carga de gás R-134a (recarga: R$ 150–300) antes de substituir o sensor.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 5W30 API SN sintético a cada 10.000 km',       body: 'Motor HR16DE 1.6: 4,4 L. Motor 1.0 Turbo: confirmar capacidade no manual (3,8–4,0 L). Intervalo máximo: 10.000 km ou 6 meses.' },
      { severity: 'WARN', title: 'Fluido CVT Nissan NS-3 a cada 60.000 km',           body: '9 litros no sistema completo. Troca com máquina na concessionária: R$ 1.000–1.400. Inspeção visual de vazamento a cada 20.000 km — especialmente em Kicks 2022.' },
      { severity: 'OK',   title: 'Filtro de ar e de cabine a cada 20.000 km',         body: 'Filtro de cabine sujo reduz eficiência do AC em até 30%. Em regiões com poluição ou estradas de terra, antecipe para 15.000 km.' },
      { severity: 'OK',   title: 'Velas iridium a cada 100.000 km',                   body: 'HR16DE: NGK PLZKAR6A-11D. Motor 1.0 Turbo: verificar especificação no manual do ano. Em uso com etanol: inspecionar a cada 20.000 km.' },
      { severity: 'OK',   title: 'Limpeza do corpo de borboleta a cada 30.000 km',    body: 'HR16DE acumula carbono. Faça o reaprendizado após a limpeza.' },
    ],
  },

  Frontier: {
    MACETES: [
      { severity: 'DANGER', title: 'Motor YD25: diesel S10 é obrigatório',             body: 'O motor YD25 2.5 dCi usa bomba injetora Bosch VP44 sensível à qualidade do combustível. Diesel S500 causa falha da bomba em menos de 50.000 km. Reparo: R$ 4.000–8.000.' },
      { severity: 'WARN',   title: 'Drene o separador de água semanalmente',           body: 'A Frontier YD25 tem separador de água no filtro de combustível. Em regiões com diesel de qualidade ruim, a água no diesel corrói a bomba VP44 rapidamente. Drene o separador semanalmente — botão vermelho embaixo do filtro.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Bomba injetora VP44 — falha crônica',              body: 'A bomba injetora VP44 do motor YD25 2.5 é o calcanhar de Aquiles da Frontier. Combustível ruim e falta de troca de filtro de diesel causam falha prematura. Sintomas: dificuldade de partida, perda de potência, fumaça preta. Reparo: R$ 4.000–8.000.' },
      { severity: 'WARN',   title: 'Correia do comando acima de 200k — troque preventivamente', body: 'A Frontier YD25 tem correia do comando com intervalo de 200.000 km ou 4 anos. Muitos proprietários ignoram por achar muito longo. Com diesel de qualidade ruim e uso severo, antecipe para 150.000 km.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 5W30 API CI-4 diesel a cada 10.000 km',        body: 'Motor diesel YD25. Use óleo certificado para diesel (CI-4 ou superior). Capacidade: ~7 litros com filtro.' },
      { severity: 'WARN', title: 'Filtro de diesel a cada 15.000 km',                 body: 'Com diesel de qualidade variável, antecipe a troca. Drene o separador de água mensalmente. Filtro entupido mata a bomba VP44.' },
      { severity: 'OK',   title: 'Fluido da caixa de transferência (4x4) a cada 40.000 km', body: 'Use fluido específico para transfer case Nissan. Não negligencie — desgasto silencioso sem sintomas óbvios até a caixa travar.' },
    ],
  },

  Versa: {
    MACETES: [
      { severity: 'WARN', title: 'CVT 2012–2014: troque o fluido NS-3 a cada 40.000 km', body: 'O CVT do Versa 2012–2014 foi alvo de class-action nos EUA por falha prematura. No Brasil, centenas de reclamações no Reclame Aqui. A causa principal é sempre o fluido NS-3 degradado. Para esses anos, intervalo de 40.000 km é o máximo recomendado — não arrisque os R$ 8.000–15.000 de uma transmissão nova.', yearFrom: 2012, yearTo: 2014 },
      { severity: 'OK',   title: 'Óleo 5W30 sintético — nunca semissintético',         body: 'Motor HR10DE 1.0 (3,4 L) e HR16DE 1.6 (4,4 L). API SN sintético obrigatório. Intervalo: 10.000 km ou 6 meses.' },
      { severity: 'OK',   title: 'Motor tem corrente de distribuição — sem troca programada', body: 'Ambos os motores (HR10DE e HR16DE) usam corrente. Ao ouvir barulho metálico a frio, inspecionar imediatamente — sinal de corrente esticada.' },
      { severity: 'OK',   title: 'Limpeza do corpo de borboleta a cada 30.000 km',     body: 'HR16DE acumula carbono em uso Flex. Sintoma: marcha lenta irregular, carro morre nos semáforos. Limpeza + reaprendizado: R$ 80–200.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'CVT 2012–2014 — falha prematura documentada',      body: 'O CVT do Versa 1.6 dos anos 2012–2014 falha prematuramente com erros P0846, P0965, P2859 e P0715 (sensores da valve body). Solução: troca da valve body (R$ 2.000–4.000). Em casos graves, transmissão completa (acima de R$ 8.000). Prevenção: fluido NS-3 a cada 40.000 km sem falta.', yearFrom: 2012, yearTo: 2014 },
      { severity: 'WARN',   title: 'CVT — shudder e solavanco (todos os anos)',        body: 'Vibração ao partir e solavanco ao reduzir velocidade é o problema mais relatado do Versa. Fluido NS-3 degradado é quase sempre a causa. Troca do fluido + limpeza do filtro CVT resolve em 80% dos casos.' },
      { severity: 'WARN',   title: 'Consumo de óleo (HR16DE 2013–2015)',               body: 'Motor 1.6 de produção mexicana apresenta consumo de óleo entre 300–500 ml/1.000 km acima de 80.000 km. Sem vazamento visível. Monitore o nível a cada abastecimento.' },
      { severity: 'WARN',   title: 'Amortecedores traseiros — desgaste prematuro',     body: 'Amortecedores traseiros originais do Versa têm vida útil curta. Acima de 60.000 km: verificar se o carro chacoalha excessivamente em ondulações. Troca do par traseiro: R$ 400–800.' },
      { severity: 'WARN',   title: 'Corpo de borboleta — carro morre no semáforo',     body: 'Marcha lenta irregular e carro "morrendo" ao parar é frequente no Versa Flex. Limpeza do corpo de borboleta + reaprendizado eletrônico resolve. Custo: R$ 100–200.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 5W30 sintético a cada 10.000 km',              body: 'HR10DE 1.0: 3,4 L. HR16DE 1.6: 4,4 L. API SN sintético. Máximo: 10.000 km ou 6 meses.' },
      { severity: 'WARN', title: 'Fluido CVT NS-3 a cada 50.000 km',                  body: 'Para Versa 2012–2014: máximo 40.000 km. Para 2015 em diante: 50.000 km. Troca completa com máquina: R$ 600–900.' },
      { severity: 'OK',   title: 'Limpeza do corpo de borboleta a cada 30.000 km',    body: 'Faça o reaprendizado eletrônico após a limpeza. Custo: R$ 80–200.' },
      { severity: 'OK',   title: 'Velas iridium a cada 100.000 km',                   body: 'HR10DE e HR16DE. Em uso frequente com etanol: inspecionar a cada 20.000 km.' },
    ],
  },

  March: {
    MACETES: [
      { severity: 'OK',   title: 'Motor 1.0 HR10DE: usar exatamente 3,4 L de óleo',   body: 'O motor 3 cilindros HR10DE tem capacidade exata de 3,4 litros (após 2015). Overfill (óleo acima do nível) causa espuma no óleo e pode forçar vapor pelo respiro, manchando o filtro de ar. Use sempre 5W30 sintético API SN e não passe da marca máxima da vareta.' },
      { severity: 'WARN', title: 'CVT March: fluido NS-3 a cada 50.000 km',           body: 'O CVT do March é compacto (para veículos leves) mas usa o mesmo fluido NS-3 dos outros Nissans. Capacidade: ~6 L no sistema. Troca: R$ 600–900 na especializada. Negligenciar o fluido é a causa número 1 de CVT destruído no March.' },
      { severity: 'OK',   title: 'Bobinas de ignição: substitua aos primeiros sinais', body: 'Acima de 80.000 km, especialmente com uso frequente de etanol, as bobinas individuais do March falham e causam falha de cilindro (Check Engine P0300–P0303, engasgo sob aceleração). Troca: R$ 150–300 por bobina aftermarket ou R$ 400–600 original Nissan.' },
      { severity: 'OK',   title: 'Limpeza do corpo de borboleta a cada 30.000 km',    body: 'Motor Flex acumula carbono. Procedimento idêntico ao Sentra. Custo: R$ 80–150.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Consumo de óleo HR16DE 1.6 (México 2013–2015)',      body: 'O motor 1.6 HR16DE de fabricação mexicana (2013–2015) apresenta consumo de óleo acima de 80.000 km. Normal até 300 ml/1.000 km. Acima disso: motor flush + sintético superior. Em casos graves, anéis de pistão desgastados.', yearFrom: 2013, yearTo: 2015 },
      { severity: 'WARN', title: 'CVT — shudder ao partir',                           body: 'Trepidação característica ao sair de um semáforo em aclive. Fluido NS-3 degradado é a causa mais comum. Troca do fluido resolve em 80% dos casos. Se persistir: concessionária para reprogramação do CVT.' },
      { severity: 'WARN', title: 'Bobinas de ignição — falha acima de 80.000 km',      body: 'Check Engine com falha de cilindro (engasgo, carro "pula" sob aceleração). Verifique os erros P0300–P0303. Substitua apenas a bobina com falha — troca preventiva das 4 é desnecessária.' },
      { severity: 'WARN', title: 'Coxins do motor — vibração excessiva',               body: 'Coxins originais do March têm durabilidade média de 80.000–100.000 km. Vibração perceptível ao engatar marcha e ao acelerar em baixa rotação indica coxins gastos. Troca: R$ 150–400 por coxim (geralmente 3 no March).' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 5W30 sintético a cada 10.000 km',              body: 'HR10DE 1.0: 3,4 L (exato — não overfill). HR16DE 1.6: 4,4 L. API SN sintético.' },
      { severity: 'WARN', title: 'Fluido CVT NS-3 a cada 50.000 km',                  body: 'Nissan NS-3 obrigatório. Capacidade: ~6 L. Troca completa: R$ 600–900.' },
      { severity: 'OK',   title: 'Velas iridium a cada 100.000 km',                   body: 'HR10DE: NGK PLFR5A-11. HR16DE: NGK PLZKAR6A-11D. Com etanol: inspecionar a cada 20.000 km.' },
      { severity: 'OK',   title: 'Limpeza do corpo de borboleta a cada 30.000 km',    body: 'Faça o reaprendizado após a limpeza.' },
      { severity: 'OK',   title: 'Filtro de ar e cabine a cada 20.000 km',            body: 'Em regiões com estradas de terra: antecipe para 15.000 km.' },
    ],
  },

  // ══ PEUGEOT ══════════════════════════════════════════════════════════════════

  '208': {
    MACETES: [
      { severity: 'DANGER', title: 'PureTech 1.2 turbo: óleo 0W-30 C2 é obrigatório — sem exceção', yearFrom: 2021, yearTo: null,
        body: 'O motor PureTech 1.2 (2021+) usa correia dentada IMERSA NO ÓLEO (wet belt). Apenas o óleo Total Quartz Ineo First 0W-30 com especificação PSA B71 2290 é aprovado. Qualquer outra viscosidade (5W-30, 5W-40) resseca a correia prematuramente, ela fragmenta, entope o coador da bomba de óleo e o motor trava sem aviso. Troca obrigatória a cada 10.000 km ou 1 ano.' },
      { severity: 'DANGER', title: 'PureTech 1.2: correia dentada a cada 60.000 km — não espere o prazo oficial', yearFrom: 2021, yearTo: null,
        body: 'A Stellantis fez recall/extensão de garantia (campanha ZWR) para PureTech fabricados até 2017, mas o problema pode ocorrer em qualquer unidade. No Brasil, a Peugeot oferece extensão de garantia de até 10 anos / 180.000 km para casos do motor PureTech. EXIJA esse direito caso o motor falhe. Troque a correia preventivamente a cada 60.000 km ou 4 anos — o prazo oficial de 80.000 km foi desenvolvido para o clima europeu.' },
      { severity: 'WARN',   title: 'THP 1.6: consumo de óleo elevado é "esperado" pela Peugeot', yearFrom: 2013, yearTo: 2020,
        body: 'A PSA documenta consumo de até 1 litro de óleo a cada 5.000 km como "normal" no motor THP 1.6. Na prática, motor com problemas consome acima de 1L/1.000 km. Verifique o nível antes de cada abastecimento. Use sempre 0W-30 PSA B71 2302 — o THP é tão sensível à especificação do óleo quanto o PureTech.' },
      { severity: 'WARN',   title: 'ETG6 robotizada: NUNCA segure o carro em subida só com o acelerador', yearFrom: 2013, yearTo: 2020,
        body: 'A caixa ETG6 (robotizada de embreagem simples) é o ponto fraco do 208 gen1. Em subidas, se você segurar o carro com o acelerador sem usar o freio, queima a embreagem em segundos. Em subidas: use o freio de mão ou freio de pé para segurar, acelere suavemente para sair. Esse hábito simples pode duplicar a vida da embreagem.' },
      { severity: 'OK',     title: 'Reset do BSI (módulo central): resolve falhas elétricas diversas',
        body: 'O BSI (Body Systems Interface) é o cérebro eletrônico da Peugeot. Muitas falhas intermitentes (alarme, janelas, travas, injeção) se resolvem com um reset: 1) Abra a janela do motorista; 2) Desligue o carro e retire a chave; 3) Desconecte o terminal negativo da bateria; 4) Aguarde 15 segundos; 5) Reconecte e aguarde 10 segundos; 6) Ligue os faróis pelo botão externo; 7) Coloque a chave e ligue o motor; 8) Segure o botão de travar por 10 segundos para sincronizar a chave.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'PureTech 1.2: correia molhada — falha catastrófica sem aviso', yearFrom: 2021, yearTo: null,
        body: 'O motor PureTech 1.2 turbo usa correia dentada submersa no óleo. Quando o óleo se degrada (por uso de especificação errada ou intervalos longos), a correia absorve o óleo, incha, os fragmentos entopem o coador da bomba e o motor perde pressão de óleo subitamente. O carro para sem qualquer aviso prévio no painel. Recall obrigatório na Europa (JZR/HFC) e Austrália para unidades 2013–2017. No Brasil, campanha interna ZWR. Exija a extensão de garantia de até 10 anos/180.000 km.' },
      { severity: 'WARN',   title: 'THP 1.6: carbonização das válvulas de admissão', yearFrom: 2013, yearTo: 2020,
        body: 'Injeção direta não lava as válvulas de admissão. A cada 50.000–80.000 km acumulam-se depósitos sólidos de carbono nas válvulas, causando perda de potência de até 20% sem acionar nenhum código OBD. Sintoma: motor perde força gradualmente, especialmente em retomadas. Solução: walnut blasting (jato de nozes moídas) na admissão. Custo no Brasil: R$ 800–1.800. Prevenção: use gasolina aditivada e limpe a cada 60.000 km.' },
      { severity: 'DANGER', title: 'ETG6 robotizada: shudder e falha de embreagem — problema crônico', yearFrom: 2013, yearTo: 2020,
        body: 'A caixa ETG6 (robotizada de embreagem simples, diferente de câmbio dupla embreagem) tem vibração/trepidação ao partir de semáforo como problema crônico documentado. Soluções em ordem de custo: 1) Reprogramação de software via concessionária — gratuita em garantia, resolve 40–60% dos casos; 2) Adaptação do ponto de contato via scanner PSA (R$ 200–400); 3) Substituição do atuador eletro-hidráulico (R$ 2.500–5.000); 4) Substituição do kit de embreagem completo (R$ 3.000–6.000). Evite usar a ETG6 no modo manual em trânsito lento.' },
      { severity: 'WARN',   title: 'AC: O-rings da caixa evaporadora — vazamento de gás refrigerante',
        body: 'Boletim técnico PSA C5HW014DQ0: os O-rings dos dutos da caixa evaporadora envelhecem e permitem micro-vazamentos de gás R-134a. Sintoma: AC resfria cada vez menos ao longo dos meses, sem falha elétrica óbvia. A recarga de gás "funciona" mas dura pouco — o correto é substituir os O-rings (R$ 300–800 + mão de obra). Afeta 208 e 2008 de múltiplos anos.' },
      { severity: 'WARN',   title: 'THP 1.6: correia dentada — ruptura acima do prazo', yearFrom: 2013, yearTo: 2020,
        body: 'O motor THP 1.6 Prince (parceria PSA/BMW) usa correia dentada com tensor hidráulico. Motor de interferência: ruptura destroça válvulas e pistões. Troque obrigatoriamente a cada 60.000 km junto com tensor, polia tensora e polia livre. Custo: R$ 900–1.500. Muitas concessionárias cobram por "revisão THP completa" — exija orçamento detalhado.' },
    ],
    MANUTENCAO: [
      { severity: 'DANGER', title: 'PureTech 1.2: óleo 0W-30 C2 (PSA B71 2290) a cada 10.000 km', yearFrom: 2021, yearTo: null,
        body: 'Total Quartz Ineo First 0W-30 ou equivalente certificado PSA B71 2290. Capacidade: 3,8 L com filtro. Intervalo máximo absoluto: 10.000 km ou 1 ano. Qualquer outra especificação vicia a correia molhada.' },
      { severity: 'DANGER', title: 'PureTech 1.2: correia dentada a cada 60.000 km', yearFrom: 2021, yearTo: null,
        body: 'Troque correia + tensor + polia tensora juntos. Custo: R$ 800–1.400. Ignore o prazo oficial de 80.000 km — no Brasil (calor + etanol + trânsito), 60.000 km é o máximo seguro.' },
      { severity: 'WARN',   title: 'THP 1.6: correia dentada a cada 60.000 km + tensor + polias', yearFrom: 2013, yearTo: 2020,
        body: 'Motor de interferência. Troque com tensor hidráulico e polias — nunca só a correia. Custo: R$ 900–1.500. Com mais de 100.000 km: inclua bomba d\'água no kit (acrescenta ~R$ 400 mas economiza a mão de obra de uma segunda abertura).' },
      { severity: 'OK',     title: 'THP 1.6: óleo 0W-30 C2 (PSA B71 2302) a cada 10.000 km', yearFrom: 2013, yearTo: 2020,
        body: 'Total Quartz Ineo MC3 0W-30 ou equivalente PSA B71 2302. Capacidade: 4,5 L. A PSA proíbe qualquer outro grau de viscosidade neste motor.' },
      { severity: 'OK',     title: 'Velas iridium a cada 60.000 km (THP) / 100.000 km (PureTech)',
        body: 'THP 1.6: NGK ILZKR7B-11 (iridium). PureTech 1.2: NGK ILZKAR7B8DG. Com etanol frequente: inspecionar na metade do intervalo. Resistência de 5 kΩ — use exatamente a especificada.' },
      { severity: 'OK',     title: 'Fluido câmbio AT6 (EAT6) a cada 60.000 km', yearFrom: 2021, yearTo: null,
        body: 'O câmbio automático de 6 velocidades EAT6 do 208 gen2 usa fluido Total Fluidmatic AT (ATF). Capacidade: ~7 L. Troca parcial (~4 L): R$ 400–700. Troca total com máquina: R$ 900–1.400. O manual Peugeot diz "fluido de vida útil" — não existe. Troque a cada 60.000 km.' },
      { severity: 'OK',     title: 'Filtro de ar a cada 20.000 km e de cabine a cada 15.000 km',
        body: 'O filtro de cabine do 208 é de acesso simples (sem ferramentas). Em cidades com alto índice de poluição: 12.000 km. Em etanol: filtro de ar suja mais rápido — inspecione a cada 15.000 km.' },
    ],
  },

  '2008': {
    MACETES: [
      { severity: 'DANGER', title: 'PureTech 1.2 turbo: óleo 0W-30 C2 obrigatório e correia a cada 60.000 km', yearFrom: 2021, yearTo: null,
        body: 'Mesmo motor e mesmo problema do 208 gen2. Óleo obrigatório: Total Quartz Ineo First 0W-30 (PSA B71 2290). Correia molhada (wet belt) deve ser trocada a cada 60.000 km com tensor e polia. Falha não anunciada = motor destruído. Exija extensão de garantia Stellantis (campanha ZWR) em caso de falha.' },
      { severity: 'WARN',   title: 'THP 1.6: óleo 0W-30 C2 e correia a cada 60.000 km', yearFrom: 2014, yearTo: 2019,
        body: 'Motor THP 1.6 Prince no 2008 gen1. Consumo de óleo de 1L/5.000 km é tido como "normal" pela PSA — monitore sempre. Correia dentada a cada 60.000 km junto com tensor e polias. Óleo: 0W-30 PSA B71 2302.' },
      { severity: 'WARN',   title: 'Teto solar: drenos laterais entupem e causam infiltração', yearFrom: 2014, yearTo: null,
        body: 'O 2008 com teto solar tem drenos que escoam a água pelos pilares A e B. Com o tempo acumulam folhas, poeira e mofo, entopendo os drenos. A água começa a escorrer para dentro do habitáculo (carpete úmido, cheiro de mofo). Desentupimento com ar comprimido ou fio fino a cada 12 meses, preferencialmente antes do inverno. Limpeza preventiva: R$ 150–300 na oficina.' },
      { severity: 'OK',     title: 'Suspensão: reforce as buchas da bandeja com poliuretano',
        body: 'As buchas da bandeja dianteira do 2008 desgastam rapidamente no asfalto brasileiro. Troca por buchas de poliuretano (mais duráveis que as de borracha originais) dura o dobro do tempo. Kit de poliuretano: R$ 200–350. Borracha original Peugeot: R$ 300–500 + mão de obra.' },
      { severity: 'OK',     title: 'Reset do BSI resolve falhas elétricas diversas',
        body: 'Mesmo procedimento do 208: desconecte o negativo da bateria por 15 segundos, reconecte, ligue os faróis pelo botão externo, coloque a chave, ligue e segure o botão de travar por 10 segundos.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'PureTech 1.2: correia molhada — falha catastrófica', yearFrom: 2021, yearTo: null,
        body: 'Mesmo problema do 208 gen2. Correia dentada submersa no óleo se fragmenta quando o óleo está fora de especificação ou vencido. Motor para sem aviso, sem acender luz de emergência. Recall ZWR e extensão de garantia Stellantis de até 10 anos/180.000 km disponível. Troque preventivamente a cada 60.000 km.' },
      { severity: 'DANGER', title: 'THP 1.6: consumo de óleo elevado + carbonização de válvulas', yearFrom: 2014, yearTo: 2019,
        body: 'Motor THP 1.6 do 2008 gen1 consome óleo progressivamente. Sem monitoramento, o motor pode funcionar sem óleo suficiente e fundir mancais. Verifique o nível a cada abastecimento. Acima de 80.000 km: walnut blasting nas válvulas de admissão (R$ 800–1.800) para recuperar potência.' },
      { severity: 'WARN',   title: 'Suspensão: barulhos em lombadas — buchas e batentes',
        body: 'O 2008 tem histórico de barulhos na suspensão dianteira acima de 50.000 km. As buchas da bandeja e os batentes dos amortecedores são os culpados mais frequentes. Inspeção a cada revisão. Troca das buchas: R$ 400–800.' },
      { severity: 'WARN',   title: 'AC: O-rings da caixa evaporadora — vazamento lento de gás',
        body: 'Mesmo problema do 208. Os O-rings dos dutos da caixa evaporadora do 2008 deterioram e causam vazamento gradual de R-134a. Sintoma: AC vai perdendo eficiência ao longo dos meses. Troca dos O-rings: R$ 300–800. Boletim técnico PSA C5HW014DQ0.' },
      { severity: 'WARN',   title: 'Módulo BSI — falhas elétricas intermitentes',
        body: 'O BSI (módulo central) do 2008 pode apresentar falhas elétricas intermitentes: luz de airbag, alarme disparando sozinho, janelas que param de funcionar. Na maioria dos casos é resolvido com o reset do BSI (veja Macetes). Se persistir: reprogramação do BSI na concessionária (R$ 300–600) ou substituição (R$ 1.500–3.000).' },
    ],
    MANUTENCAO: [
      { severity: 'DANGER', title: 'PureTech 1.2: óleo 0W-30 C2 a cada 10.000 km e correia a cada 60.000 km', yearFrom: 2021, yearTo: null,
        body: 'Total Quartz Ineo First 0W-30 PSA B71 2290. Capacidade: 3,8 L. Correia + tensor + polia a cada 60.000 km. Sem isso: risco de perda total do motor.' },
      { severity: 'WARN',   title: 'THP 1.6: correia dentada a cada 60.000 km', yearFrom: 2014, yearTo: 2019,
        body: 'Motor de interferência — correia + tensor + polias + verifique bomba d\'água se > 100.000 km. Custo: R$ 900–1.500. Óleo: 0W-30 PSA B71 2302 a cada 10.000 km.' },
      { severity: 'OK',     title: 'Fluido câmbio EAT6 a cada 60.000 km', yearFrom: 2021, yearTo: null,
        body: 'Total Fluidmatic AT. Capacidade ~7 L. Troca: R$ 900–1.400 (completa com máquina).' },
      { severity: 'OK',     title: 'Velas iridium: THP 60.000 km / PureTech 100.000 km',
        body: 'THP 1.6: NGK ILZKR7B-11. PureTech 1.2: NGK ILZKAR7B8DG. Não use velas convencionais nestes motores.' },
      { severity: 'OK',     title: 'Fluido de freio DOT 4 a cada 2 anos',
        body: 'Peugeot especifica DOT 4 para o 2008. O fluido absorve umidade e deve ser trocado a cada 2 anos independente da quilometragem.' },
    ],
  },

  '3008': {
    MACETES: [
      { severity: 'WARN',   title: 'THP 1.6: óleo 0W-30 C2 obrigatório — o motor é idêntico ao do 208',
        body: 'O motor THP 1.6 Prince (EP6) do 3008 é o mesmo do 208, 2008 e dos Mini Cooper S (BMW N14). A PSA exige 0W-30 com especificação B71 2302. Qualquer outra viscosidade acelera o consumo de óleo e a carbonização das válvulas. Capacidade: 4,5 L. Intervalo: 10.000 km ou 1 ano.' },
      { severity: 'WARN',   title: 'THP 1.6: correia dentada a cada 60.000 km — motor de interferência',
        body: 'Muitos donos de 3008 ignoram a correia por achar que a vida útil de 120.000 km está longe. A realidade com combustível nacional e calor: 60.000 km é o limite seguro. Motor de interferência — correia partida = retífica completa (R$ 6.000–12.000). Kit correia + tensor + polias: R$ 900–1.500.' },
      { severity: 'OK',     title: 'Sistema de tração dinâmica: não ignore o alerta ESP',
        body: 'O 3008 tem controle de tração e ESP. Se a luz acender de forma persistente, não ignore — pode ser sensor de velocidade de roda com defeito, que além de desativar o ESP, gera leituras erradas no ABS. Custo do sensor: R$ 200–500.' },
      { severity: 'OK',     title: 'Câmbio AL4: nunca deixe em N no engarrafamento',
        body: 'A caixa automática AL4 do 3008 (versões com automático) não deve ficar em neutro durante paradas. Ficar em D com o freio acionado é menos danoso que as trocas frequentes D→N→D, que desgastam o kit de embreagem do câmbio.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'THP 1.6: consumo de óleo + carbonização das válvulas',
        body: 'Mesmo problema documentado em todos os carros com motor EP6 (Prince). Consumo de 1L/5.000 km é "aceitável" pela PSA. Acima de 80.000 km: walnut blasting nas válvulas de admissão (R$ 800–1.800) para recuperar potência. Monitore o óleo a cada abastecimento.' },
      { severity: 'WARN',   title: 'Câmbio AL4: modo de emergência — Sport + Neve piscando',
        body: 'O câmbio automático AL4 entra em modo de emergência (trava na 3ª marcha, indicadores Sport e Neve piscando) quando os solenóides ACIM defeituosos enviam sinal de falha. Isso NÃO significa que o câmbio está destruído. Solução documentada pela comunidade: 1) Solenóides BorgWarner (anéis pretos — R$ 400–600); 2) Fluido Mobil LT71141; 3) Reprogramação UCT na concessionária. Total: R$ 1.500–2.200. Concessionária cobra R$ 5.000–9.000 por "câmbio reviado" desnecessariamente.' },
      { severity: 'WARN',   title: 'Suspensão: batentes e buchas dianteiras com desgaste precoce',
        body: 'O 3008 gen1 é mais pesado que o 208 e estressas mais a suspensão. Batentes dos amortecedores dianteiros desgastam entre 60.000–80.000 km. Buchas da bandeja: 80.000–100.000 km. Sintoma: barulho em irregularidades e imprecisão na direção.' },
      { severity: 'WARN',   title: 'THP 1.6: falha de bobina de ignição (P0300–P0304)',
        body: 'Bobinas de ignição individuais do motor THP 1.6 falham entre 80.000–120.000 km, especialmente com uso de etanol. Sintoma: motor engasga sob aceleração, Check Engine. Troca individual: R$ 300–600 (aftermarket) ou R$ 600–1.200 (original PSA). Troque apenas a(s) com falha — não é necessário trocar todas.' },
    ],
    MANUTENCAO: [
      { severity: 'WARN',   title: 'THP 1.6: correia dentada a cada 60.000 km',
        body: 'Correia + tensor hidráulico + polias. Se acima de 100.000 km: inclua bomba d\'água. Custo: R$ 900–1.800.' },
      { severity: 'OK',     title: 'THP 1.6: óleo 0W-30 PSA B71 2302 a cada 10.000 km',
        body: 'Total Quartz Ineo MC3 0W-30. Capacidade: 4,5 L. Intervalo máximo: 10.000 km ou 1 ano.' },
      { severity: 'WARN',   title: 'Câmbio AL4: fluido Mobil LT71141 a cada 60.000 km',
        body: 'O câmbio automático AL4 usa fluido específico Mobil LT71141 (ou Total ATF LT71141). Capacidade: ~7,5 L. NÃO use ATF Dexron III — causa modo de emergência. Troca completa: R$ 400–700.' },
      { severity: 'OK',     title: 'Velas iridium a cada 60.000 km',
        body: 'THP 1.6: NGK ILZKR7B-11. Inspecione a cada 30.000 km em uso com etanol.' },
    ],
  },

  '307': {
    MACETES: [
      { severity: 'WARN',   title: 'Câmbio AL4: fluido LT71141 e solenóides BorgWarner — não deixe travar',
        body: 'O câmbio automático AL4 do 307 entra em modo de emergência (trava na 3ª marcha) por culpa dos solenóides ACIM desgastados e fluido degradado. A solução correta é: trocar os solenóides por BorgWarner (anéis pretos, R$ 400–600), usar fluido Mobil LT71141, e fazer a reprogramação UCT. Custo total: R$ 1.500–2.200 vs. R$ 5.000–9.000 que as concessionárias tentam cobrar por revisão do câmbio.' },
      { severity: 'OK',     title: 'Motor 1.6 16v: correia dentada a cada 60.000 km',
        body: 'O motor 1.6 16v TU5JP4 do 307 usa correia dentada. Motor de interferência — troque com tensor e polia tensora. Custo: R$ 400–700. Inclua a bomba d\'água nas trocas acima de 100.000 km.' },
      { severity: 'OK',     title: 'Direção elétrica ou hidráulica: verifique o tipo',
        body: 'O 307 pode ter direção hidráulica (versões mais antigas) ou elétrica. Com direção hidráulica: verifique o nível do fluido a cada 10.000 km — vazamento pelo mangote causa perda súbita da assistência. Com elétrica: falha do módulo causa direção pesada; reset do BSI pode ajudar.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Câmbio AL4: modo emergência — solenóides ACIM',
        body: 'Indicadores Sport e Neve piscando + câmbio travado na 3ª = solenóides ACIM com defeito. NÃO é o câmbio destruído. Solução: solenóides BorgWarner (R$ 400–600) + fluido LT71141 + reprogramação UCT = R$ 1.500–2.200. Exija esta solução antes de autorizar qualquer troca de câmbio.' },
      { severity: 'WARN',   title: 'Correia dentada 1.6 TU5JP4 — ruptura sem aviso',
        body: 'Motor de interferência. Correia que ultrapassa 80.000 km sem troca pode partir sem aviso prévio. Destruição das válvulas + retífica: R$ 4.000–8.000. Troca preventiva: R$ 400–700. Muitos 307 usados no Brasil têm histórico de manutenção desconhecido — troque ao comprar.' },
      { severity: 'WARN',   title: 'BSI — falhas elétricas ao longo dos anos',
        body: 'Com mais de 10 anos de vida, o BSI do 307 pode apresentar falhas diversas: alarme disparando, carro não dando partida, falhas em módulos. Reset do BSI (desconectar bateria) resolve a maioria. Casos graves: reprogramação do BSI (R$ 300–600) ou substituição por BSI usado (R$ 500–1.500 + programação).' },
      { severity: 'WARN',   title: 'Suspensão: ponteiras e buchas com desgaste',
        body: 'Com mais de 100.000 km, o 307 apresenta desgaste nas ponteiras de direção, buchas da bandeja e rolamentos de roda. Sintoma: barulho ao virar o volante, carro "dando cabeçadas" em lombadas, desgaste irregular de pneus.' },
    ],
    MANUTENCAO: [
      { severity: 'DANGER', title: 'Correia dentada 1.6 a cada 60.000 km',
        body: 'Motor de interferência TU5JP4. Correia + tensor + polia tensora obrigatoriamente. Acima de 100.000 km: inclua bomba d\'água. Custo: R$ 400–800.' },
      { severity: 'OK',     title: 'Óleo 5W-30 a cada 10.000 km',
        body: 'Motor 1.6 16v TU5JP4: 5W-30 API SH/SJ ou superior. Capacidade: 3,75 L. Motor 2.0 16v EW10: 5W-30. Capacidade: 4,5 L.' },
      { severity: 'WARN',   title: 'Câmbio AL4: fluido LT71141 a cada 60.000 km',
        body: 'Mobil LT71141 ou Total LT71141. Capacidade: ~7,5 L. Nunca usar ATF III ou similar.' },
      { severity: 'OK',     title: 'Velas a cada 30.000 km (motor TU5JP4)',
        body: 'Motor 1.6 8v TU5JP4: velas convencionais NGK BKR6E ou BP6E a cada 30.000 km. Motor 2.0 16v EW10: NGK BKR7E a cada 30.000 km.' },
    ],
  },

  '408': {
    MACETES: [
      { severity: 'WARN',   title: 'THP 1.6: óleo 0W-30 C2 obrigatório — mesmo motor do 208',
        body: 'O 408 THP 1.6 usa o mesmo motor EP6 Prince do 208. Óleo obrigatório: 0W-30 PSA B71 2302 (Total Quartz Ineo MC3). Qualquer viscosidade maior aumenta consumo de óleo e carbonização. Capacidade: 4,5 L. Intervalo: 10.000 km ou 1 ano.' },
      { severity: 'WARN',   title: 'THP 1.6: correia dentada a cada 60.000 km',
        body: 'Motor de interferência. Correia + tensor hidráulico + polias a cada 60.000 km. Custo: R$ 900–1.500. Acima de 100.000 km: inclua bomba d\'água (adicional ~R$ 400).' },
      { severity: 'OK',     title: 'Câmbio AL4: nunca fique em neutro no trânsito',
        body: 'Ficar trocando entre D e N no trânsito desgasta o câmbio AL4 mais rápido que ficar em D com o freio. Em paradas longas (> 5 min), use o P.' },
      { severity: 'OK',     title: '2.0 16v EW10: correia a cada 80.000 km',
        body: 'O motor aspirado 2.0 16v EW10 tem correia dentada com intervalo mais longo. Troque a cada 80.000 km ou 4 anos com tensor e polia. Motor de interferência — não negligencie.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'THP 1.6: consumo de óleo + carbonização das válvulas',
        body: 'Mesmo motor, mesmos problemas do 208 e 2008 THP. Consumo de óleo acima de 80.000 km, carbonização progressiva das válvulas de admissão. Walnut blasting a cada 60.000 km: R$ 800–1.800. Monitore o nível de óleo a cada abastecimento.' },
      { severity: 'WARN',   title: 'Câmbio AL4: modo emergência — Sport + Neve piscando',
        body: 'Mesmo problema do 307 e 3008. Solenóides ACIM defeituosos travam o câmbio na 3ª. Solução: BorgWarner + LT71141 + reprogramação = R$ 1.500–2.200. Não autorize troca de câmbio sem antes tentar essa solução.' },
      { severity: 'WARN',   title: 'Suspensão dianteira: barulhos entre 80.000–120.000 km',
        body: 'Buchas da bandeja e ponteiras de direção desgastam na faixa de 80.000–120.000 km. O 408 é mais pesado que o 208 — suspensão sofre mais. Inspecione anualmente.' },
      { severity: 'WARN',   title: 'Injetor defeituoso (THP 1.6): falha de cilindro',
        body: 'Injetores do THP 1.6 podem falhar acima de 100.000 km, causando falha de cilindro (Check Engine P0300–P0304, motor engasga). Troca de injetor: R$ 600–1.200 por unidade (original PSA). Verifique com scanner antes de autorizar troca preventiva.' },
    ],
    MANUTENCAO: [
      { severity: 'DANGER', title: 'THP 1.6: correia dentada a cada 60.000 km',
        body: 'Motor de interferência. Correia + tensor + polias. Custo: R$ 900–1.500.' },
      { severity: 'OK',     title: 'THP 1.6: óleo 0W-30 PSA B71 2302 a cada 10.000 km',
        body: 'Total Quartz Ineo MC3 0W-30. Capacidade: 4,5 L. Intervalo máximo: 10.000 km.' },
      { severity: 'OK',     title: '2.0 16v EW10: correia a cada 80.000 km e óleo 5W-30',
        body: 'Motor 2.0 EW10: correia + tensor + polia a cada 80.000 km. Óleo 5W-30 API SL ou superior. Capacidade: 4,5 L.' },
      { severity: 'WARN',   title: 'Câmbio AL4: fluido LT71141 a cada 60.000 km',
        body: 'Mobil LT71141 ou Total LT71141. Capacidade: ~7,5 L. Nunca usar Dexron III.' },
      { severity: 'OK',     title: 'Velas iridium THP a cada 60.000 km',
        body: 'NGK ILZKR7B-11. Em uso com etanol: inspecionar a cada 30.000 km.' },
    ],
  },

  // ══ MOTOS HONDA ══════════════════════════════════════════════════════════════

  'CG 160': {
    MACETES: [
      { severity: 'OK',   title: 'Óleo JASO MA2 — nunca use óleo de carro',  body: 'O motor da CG 160 tem embreagem molhada no mesmo banho de óleo. Óleo de carro (sem certificação JASO MA2) faz a embreagem deslizar. Use apenas óleo para motos 10W30 JASO MA2.' },
      { severity: 'OK',   title: 'Regulagem de válvulas a cada 8.000 km',    body: 'Batido metálico nos primeiros segundos após a partida a frio indica folga de válvulas. Custo R$ 60–100 numa oficina. Não deixar acumular: folga excessiva causa desgaste de válvulas e assentos (R$ 600+).' },
      { severity: 'OK',   title: 'Corrente: lubrificar a cada 500 km',       body: 'Com a moto parada (motor desligado), gire a roda traseira e aplique lubrificante específico de corrente. Depois limpe o excesso. Corrente seca desgasta coroa e pinhão — kit completo custa R$ 150–250.' },
      { severity: 'WARN', title: 'Calibre o tensionador de corrente sempre', body: 'Verifique a folga da corrente a cada 3.000 km (folga ideal: 15–25 mm no ponto médio entre pinhão e coroa). Corrente frouxa pode pular em aceleração brusca e travar a roda traseira.' },
      { severity: 'OK',   title: 'Aquecimento de 2 min antes de sair',       body: 'Deixe o motor em marcha lenta por 2 minutos na partida a frio, especialmente em manhãs mais frias. O óleo precisa circular por todo o motor antes de acelerações mais fortes.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Corrente frouxa pode travar a roda traseira', body: 'Principal risco de segurança da CG. Corrente muito frouxa (acima de 35 mm de folga) pode pular do pinhão, enrolar no eixo e travar a roda em velocidade. Inspecione visualmente antes de cada viagem longa.' },
      { severity: 'WARN',   title: 'Motor de partida (Start/Titan) falha entre 30–60k', body: 'O motor de arranque elétrico das versões Start e Titan tem vida útil limitada em uso urbano intenso. Sintoma: barulho de clique sem engatar ou partida lenta. Troca: R$ 150–300 (peça + mão de obra).' },
      { severity: 'WARN',   title: 'Rolamento traseiro com ronco antes dos 30k', body: 'Rolamentos da roda traseira desgastam rapidamente em uso urbano com buracos e excesso de carga. Sintoma: ronco constante que aumenta com a velocidade. Troca: R$ 80–150 por par.' },
      { severity: 'WARN',   title: 'Cabo do acelerador com desgaste em climas úmidos', body: 'O cabo do acelerador original resseca em regiões de alta umidade, causando travamento ou aceleração raspando. Troca preventiva a cada 30.000 km ou ao primeiro sinal de raspagem.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 10W30 JASO MA2 a cada 3.000 km',      body: 'Use óleo certificado para motos. Capacidade: 1 litro. Troque com a moto aquecida para drenar melhor as impurezas.' },
      { severity: 'OK',   title: 'Filtro de ar a cada 6.000 km',              body: 'Filtro de ar sujo reduz potência e aumenta consumo. Em regiões com muita poeira ou areia, troque a cada 3.000 km.' },
      { severity: 'OK',   title: 'Vela NGK DR8EA a cada 6.000 km',           body: 'Vela gasta dificulta a partida e aumenta consumo. Use NGK DR8EA original (R$ 15–25). Nunca use vela genérica sem especificação Honda.' },
      { severity: 'WARN', title: 'Regulagem de válvulas a cada 8.000 km',    body: 'Item crítico frequentemente esquecido. Folga excessiva = desgaste de válvulas. Folga insuficiente = válvula não fecha = perda de compressão. Custo R$ 60–100.' },
      { severity: 'OK',   title: 'Kit de transmissão a cada 25.000 km',       body: 'Troque corrente, coroa e pinhão juntos. Trocar só a corrente num pinhão/coroa gastos acelera o desgaste da corrente nova. Kit original Honda: R$ 150–250.' },
    ],
  },

  'CB 300R': {
    MACETES: [
      { severity: 'OK',   title: 'Óleo 10W40 sintético JASO MA2 obrigatório', body: 'O motor 300cc monocilíndrico de alta rotação exige óleo sintético 10W40 JASO MA2. Óleo mineral ou semissintético não suporta as altas temperaturas e rotações do motor CBF.' },
      { severity: 'WARN', title: 'Embreagem: nunca arraste no semi-ponto',    body: 'A embreagem molhada da CB 300R desgasta rapidamente com o hábito de manter no semi-ponto no trânsito. Use o freio dianteiro para controlar a velocidade em fila, não a embreagem.' },
      { severity: 'OK',   title: 'Cadência de marchas para consumo eficiente', body: 'Para economizar combustível: use 3ª acima de 50 km/h, 4ª acima de 70 km/h, 5ª acima de 90 km/h. Motor de alto giro não precisa das marchas baixas por muito tempo.' },
      { severity: 'OK',   title: 'Freio dianteiro: use com progressividade',  body: 'O disco dianteiro da CB 300R tem boa mordida. Em frenagem de emergência, aplique o freio dianteiro progressivamente com 70% da força — evita trava e mantém a estabilidade.' },
      { severity: 'WARN', title: 'Radiador: verifique o nível do fluido',     body: 'A CB 300R é refrigerada a líquido. Verifique o nível do fluido de arrefecimento mensalmente. Falta de fluido em uso urbano intenso causa superaquecimento e pode danificar a cabeça do motor.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Cabo de embreagem com desgaste a partir de 30k', body: 'O cabo de embreagem original da CB 300R perde a fluidez após 30.000–40.000 km, especialmente em climas úmidos. Sintoma: curso duro ou irregular. Troca preventiva: R$ 40–80.' },
      { severity: 'WARN', title: 'Tampa de inspeção de válvulas com micro-vazamento', body: 'A vedação de borracha da tampa da cabeça resseca e causa pequeno vazamento de óleo. Sintoma: mancha de óleo na parte superior do motor. Troca do o-ring: R$ 20–40.' },
      { severity: 'WARN', title: 'Bengalas dianteiras com vazamento acima de 50k', body: 'Os retentores das bengalas dianteiras da CB 300R cedem após 50.000 km. Mancha de óleo na bengala = sinal de retentor vencido. Troca: R$ 120–200 por bengala (R$ 240–400 o par).' },
      { severity: 'WARN', title: 'Pastilha traseira com desgaste rápido em cidade', body: 'O freio traseiro da CB 300R é muito usado em manobras urbanas. As pastilhas traseiras duram em média 15.000–20.000 km em cidade. Inspecione a cada 10.000 km.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 10W40 sintético JASO MA2 a cada 4.000 km', body: 'Capacidade: 1,8 litros. Troque com o motor quente. Honda recomenda sintético — não substitua por semissintético.' },
      { severity: 'OK',   title: 'Vela NGK IMR9C-9H a cada 12.000 km',       body: 'Vela iridium original Honda. Não use vela comum — o motor de alta compressão exige a especificação correta.' },
      { severity: 'OK',   title: 'Filtro de ar a cada 6.000 km',              body: 'Troque o filtro a cada 6.000 km ou ao sinal de queda de potência. Em cidades com muita fuligem, antecipe para 4.000 km.' },
      { severity: 'WARN', title: 'Fluido de freio DOT 4 a cada 2 anos',       body: 'O fluido de freio absorve umidade e perde o ponto de ebulição. Troque a cada 2 anos nos dois circuitos (dianteiro e traseiro).' },
      { severity: 'OK',   title: 'Kit de transmissão 520 a cada 25.000 km',   body: 'Corrente 520, coroa e pinhão devem ser trocados juntos. O jogo original Honda (R$ 250–400) tem melhor tolerância que kits genéricos.' },
      { severity: 'WARN', title: 'Regulagem de válvulas a cada 12.000 km',    body: 'Motor DOHC 4 válvulas: regulagem mais complexa que a CG, mas igualmente obrigatória. Custo em oficina especializada: R$ 150–250.' },
    ],
  },

  Twister: {
    MACETES: [
      { severity: 'OK',   title: 'Motor monocilíndrico: aguarde o aquecimento', body: 'O motor 250cc refrigerado a líquido da Twister se beneficia de 3–5 min de aquecimento antes de exigir altas rotações. O fluido de arrefecimento precisa atingir a temperatura ideal (80°C) para o motor trabalhar com eficiência máxima.' },
      { severity: 'WARN', title: 'Vibração acima de 7.000 rpm: característica do motor', body: 'A vibração no guidão e nos pés em rotações elevadas é característica intrínseca do motor monocilíndrico da Twister. Não é defeito. Um amortecedor de guidão (R$ 80–150) reduz bastante a vibração nas mãos.' },
      { severity: 'OK',   title: 'CBS combinado: freie progressivamente',      body: 'O sistema CBS (Combined Braking System) distribui a força de frenagem nos dois eixos. Freie progressivamente e deixe o CBS fazer seu trabalho — frenagem brusca em curva pode ser perigosa mesmo com CBS.' },
      { severity: 'OK',   title: 'Corrente: lubrificar após chuva',            body: 'Após rodar na chuva, a corrente perde a lubrificação. Limpe a corrente ainda quente (mas com motor desligado) e lubrifique assim que secar para evitar ferrugem e desgaste acelerado.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Bengala dianteira com retentor vazando a partir de 25k', body: 'Problema frequentemente relatado: a vedação (retentor) da bengala dianteira da Twister começa a vazar entre 25.000 e 35.000 km. Óleo manchando a bengala = retentor vencido. Troca: R$ 80–150 por bengala.' },
      { severity: 'WARN', title: 'Disco dianteiro: pastilhas desgastam mais rápido', body: 'O peso concentrado no eixo dianteiro da Twister acelera o desgaste das pastilhas dianteiras. Em uso urbano intenso, espere troca a cada 12.000–15.000 km. Inspecione a espessura a cada 8.000 km.' },
      { severity: 'WARN', title: 'Amortecedor traseiro perde eficiência acima de 30k', body: 'O amortecedor traseiro original da Twister perde a carga de nitrogênio e a vedação após 30.000 km, especialmente com uso frequente em estradas ruins. Sintoma: soluços ao passar em buracos.' },
      { severity: 'OK',   title: 'Fluido de arrefecimento: verifique mensalmente', body: 'A Twister é refrigerada a líquido. Nível baixo em uso intenso no calor pode causar superaquecimento. Verifique o nível no reservatório de expansão mensalmente (linha MIN/MAX).' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 10W40 sintético JASO MA2 a cada 4.000 km', body: 'Motor 250cc refrigerado a líquido exige sintético. Capacidade: 1,6 litros. Honda recomenda troca sempre com o motor morno para drenar melhor.' },
      { severity: 'OK',   title: 'Vela NGK CPR9EA-9 a cada 8.000 km',         body: 'Vela específica da Twister 250. Não substitua por modelos genéricos — pode causar falhas de ignição em alta rotação.' },
      { severity: 'OK',   title: 'Filtro de ar a cada 8.000 km',              body: 'Troque a cada 8.000 km ou 12 meses. Filtro sujo prejudica a injeção PGM-FI e pode causar partida difícil a frio.' },
      { severity: 'WARN', title: 'Fluido de freio DOT 4 a cada 2 anos',       body: 'Troque nos circuitos dianteiro e traseiro. Com o sistema CBS, fluido degradado afeta o funcionamento correto do frenagem combinada.' },
      { severity: 'WARN', title: 'Fluido de arrefecimento a cada 2 anos ou 30.000 km', body: 'Fluido de arrefecimento Honda Super Coolant. Nunca misture com água pura — eleva o ponto de ebulição e protege contra corrosão no radiador.' },
      { severity: 'OK',   title: 'Kit de transmissão 520 a cada 20.000–25.000 km', body: 'Corrente, coroa e pinhão juntos. Kit original Honda tem tratamento anti-corrosão superior. Troque os três componentes ao mesmo tempo.' },
    ],
  },

  'Biz 125': {
    MACETES: [
      { severity: 'OK',   title: 'CVT scooter: arranque sempre suave',        body: 'O CVT (variador automático) da Biz 125 não tem embreagem manual. Arranques bruscos do ponto parado causam desgaste da correia do CVT. Acelere progressivamente para maximizar a vida útil da correia (R$ 120–200 peça).' },
      { severity: 'OK',   title: 'Pneus de scooter: calibre semanalmente',    body: 'Pneus de scooter (10" e 17") têm menor volume de ar e perdem pressão mais rápido que motos comuns. Calibre a cada 7 dias. Pneu descalibrado reduz autonomia e estabilidade significativamente.' },
      { severity: 'WARN', title: 'Freio traseiro mecânico: ajuste periódico', body: 'A Biz 125 usa freio tambor traseiro mecânico. Ajuste a folga do cabo a cada 6.000 km ou quando o pedal ficar muito mole. Ajuste simples e gratuito em qualquer oficina.' },
      { severity: 'OK',   title: 'Pré-aqueça 2 minutos antes de acelerar',   body: 'O motor 125cc da Biz é de baixa capacidade de dissipação de calor. Na partida a frio, deixe em marcha lenta por 2 minutos antes de acelerar forte — especialmente em manhãs frias.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Correia do CVT: troca obrigatória a cada 20–25k km', body: 'A correia do CVT é o item de desgaste mais crítico da Biz 125. Correia rompida em movimento pode travar a roda traseira ou deixar a moto sem tração no trânsito. Não negligencie a troca preventiva.' },
      { severity: 'WARN',   title: 'Rolete do variador (CVT) com desgaste',   body: 'Os roletes internos do variador se desgastam junto com a correia. Roletes ovalados causam solavancos na aceleração e reduzem a eficiência. Troque junto com a correia do CVT.' },
      { severity: 'WARN',   title: 'Amortecedor traseiro com perda de firmeza', body: 'O amortecedor traseiro simples da Biz perde a firmeza após 25.000–30.000 km em uso urbano. Piloto pesado (acima de 80 kg) acelera o desgaste. Troca: R$ 100–200.' },
      { severity: 'OK',     title: 'Painel digital com reflexo excessivo sob sol', body: 'O painel digital da Biz 125 (versões mais recentes) tem baixo contraste sob sol forte. Ajuste o ângulo do capacete e use óculos escuros polarizados para melhor visibilidade.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 10W30 JASO MA2 a cada 3.000 km',      body: 'Motor 4T 125cc. Capacidade: 0,8 litros. Sempre JASO MA2 — mesmo que seja scooter, o motor tem embreagem molhada. Troque com o motor morno.' },
      { severity: 'OK',   title: 'Vela NGK CR7HSA a cada 6.000 km',          body: 'Vela padrão da Biz. Custo R$ 12–20. Troca simples e rápida — não deixe passar de 6.000 km para não ter dificuldade de partida.' },
      { severity: 'OK',   title: 'Filtro de ar a cada 6.000 km',              body: 'Filtro de ar da Biz 125 é acessível e barato (R$ 20–30). Troque a cada 6.000 km ou ao sinal de partida difícil.' },
      { severity: 'DANGER', title: 'Correia CVT a cada 20.000–25.000 km',    body: 'Correia rompida em movimento = perigo imediato. Não negligencie. Troque coreia e rolete do variador juntos para otimizar custo e segurança.' },
      { severity: 'OK',   title: 'Rolete do variador a cada 20.000 km',       body: 'Troque junto com a correia. Roletes gastos (ovalados) causam solavancos e reduzem a vida útil da correia nova.' },
    ],
  },

  'PCX 160': {
    MACETES: [
      { severity: 'OK',   title: 'Idling Stop: não desligue se o motor ainda está quente', body: 'O sistema Idling Stop desliga o motor automaticamente em paradas, economizando até 6% de combustível. Funciona apenas com o motor já em temperatura ideal. No primeiro trecho, espere o motor aquecer antes de o sistema atuar.' },
      { severity: 'OK',   title: 'Modo Smart Key: não esqueça a chave',       body: 'O Honda Smart Key da PCX 160 permite partir sem inserir a chave. Mas se a bateria do key fob descarregar, você fica parado. Mantenha sempre a bateria CR2032 do controle reservada na carteira.' },
      { severity: 'WARN', title: 'Compartimento sob o banco: capacete integral', body: 'O baú da PCX 160 acomoda um capacete integral padrão. Não force capacetes oversized — pode danificar o mecanismo de fechamento. Sempre trave o baú antes de andar.' },
      { severity: 'OK',   title: 'CBS dianteiro: sinta o ponto de acionamento', body: 'O freio CBS distribui força entre dianteiro e traseiro ao acionar o pedal. Curva com acionamento suave e progressivo. Não acione bruscamente em pisos molhados — a lógica CBS não substitui técnica de frenagem.' },
      { severity: 'OK',   title: 'Calibre os pneus semanalmente',             body: 'Dianteiro 110/70-14: 26 PSI (solo) / 29 PSI (com garupa). Traseiro 130/70-13: 29 PSI (solo) / 33 PSI (com garupa). Pneu descalibrado prejudica estabilidade e desgaste.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Correia CVT: desgaste em stop-and-go intenso', body: 'A PCX 160 é muito usada em entregas e deslocamentos urbanos. Arranques constantes no trânsito desgastam a correia do CVT mais rápido — espere 15.000–20.000 km em uso intenso vs. 25.000 km em uso normal.' },
      { severity: 'WARN', title: 'Amortecedor traseiro perde firmeza acima de 30k', body: 'O amortecedor original da PCX 160 perde a eficiência após 30.000 km de uso intenso. Batedores mais fortes em buracos são o sintoma mais comum. Upgrade para amortecedor regulável é uma boa opção (R$ 300–600).' },
      { severity: 'WARN', title: 'Sensor de O2 com falha em motores acima de 50k', body: 'Sensor de oxigênio pode falhar após 50.000 km, causando marcha lenta irregular e aumento de consumo. Luz de injeção acesa é o indicativo. Troca: R$ 80–150 (peça) + mão de obra.' },
      { severity: 'OK',   title: 'Sistema Idling Stop: bateria precisa de boa saúde', body: 'O Idling Stop exige uma bateria em bom estado para repartidas frequentes. Bateria fraca desativa o sistema automaticamente. Teste a bateria anualmente.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 10W30 sintético JASO MB a cada 3.000 km', body: 'Atenção: a PCX 160 usa JASO MB (embreagem automática/seca), diferente das motos com embreagem molhada (JASO MA2). Use sintético 10W30 JASO MB. Capacidade: 0,8 litros.' },
      { severity: 'DANGER', title: 'Correia CVT a cada 20.000–25.000 km',    body: 'Correia rompida em movimento é risco de segurança. A correia da PCX 160 dura mais que a da Biz 125, mas o item é igualmente crítico. Não negligencie.' },
      { severity: 'OK',   title: 'Rolete do variador a cada 20.000 km',       body: 'Troque junto com a correia CVT. Kit original Honda inclui correia, roletes e molas do variador.' },
      { severity: 'OK',   title: 'Vela NGK CPR9EA-9 a cada 8.000 km',        body: 'Vela iridium da PCX 160. Durabilidade superior, mas troque conforme intervalo — vela gasta faz o motor travar no Idling Stop.' },
      { severity: 'OK',   title: 'Filtro de ar a cada 8.000 km',              body: 'Filtro entupido afeta o PGM-FI e causa consumo elevado. Em cidades com muita fumaça de ônibus e caminhões, troque a cada 6.000 km.' },
      { severity: 'WARN', title: 'Fluido de freio DOT 4 a cada 2 anos',       body: 'O freio hidráulico dianteiro (e traseiro nas versões ABS) exige fluido DOT 4 em bom estado. O CBS perde eficiência com fluido degradado.' },
    ],
  },

  'NXR 160': {
    MACETES: [
      { severity: 'OK',   title: 'Para uso off-road: reduza a pressão dos pneus', body: 'Em trilhas e estradas de terra, reduza para 22–24 PSI dianteiro e 26 PSI traseiro. A maior área de contato melhora a tração. Ao voltar para o asfalto, recalibre imediatamente para os valores normais.' },
      { severity: 'WARN', title: 'Corrente: regule mais frequentemente fora do asfalto', body: 'Em uso off-road, a corrente da NXR 160 sofre mais estiramento por conta das sobrecargas na tração. Regule a cada 2.000–3.000 km (vs. 5.000 km no asfalto). Folga ideal: 25–35 mm.' },
      { severity: 'OK',   title: 'Filtro de ar: manutenção dobrada em uso off-road', body: 'Em estradas de terra, o filtro de ar entope rapidamente. Inspecione visualmente a cada 1.500 km em uso off-road — um filtro entupido causa queda de potência imediata no motor 160cc.' },
      { severity: 'OK',   title: 'Gasolina de qualidade: motor PGM-FI é sensível', body: 'A injeção PGM-FI da NXR 160 é sensível à qualidade do combustível. Use gasolina de postos de confiança. Etanol degradado causa falhas de partida a frio e marcha lenta irregular.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Bengala dianteira com vazamento em uso off-road', body: 'As bengalas dianteiras da NXR 160 foram projetadas para estradas ruins, mas uso intenso em trilhas aumenta o desgaste dos retentores. Mancha de óleo na bengala = retentor vencido. Troca: R$ 80–120 por unidade.' },
      { severity: 'WARN', title: 'Motor de partida elétrica com desgaste em uso frequente', body: 'Mesma fragilidade da CG 160: o motor de partida elétrica das versões Start e Esdd tem vida útil limitada. Em entregadores ou uso urbano intenso, falha entre 30.000–50.000 km.' },
      { severity: 'WARN', title: 'Suporte do bagageiro pode trincar em carga excessiva', body: 'O suporte traseiro da NXR é útil mas tem limite de carga (5 kg oficialmente). Carga excessiva causa trinca na junção com o chassi ao longo do tempo. Não use a moto como carga pesada sem suporte reforçado.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 10W30 JASO MA2 a cada 3.000 km',      body: 'Mesmo protocolo da CG 160. Em uso off-road intenso, antecipe a troca para 2.500 km — sujeira e esforço maior degradam o óleo mais rápido.' },
      { severity: 'OK',   title: 'Filtro de ar a cada 3.000 km (off-road) / 6.000 km (asfalto)', body: 'Em uso misto, adote o intervalo menor. Um filtro limpo é essencial para o motor 160cc manter a eficiência em subidas e trilhas.' },
      { severity: 'OK',   title: 'Vela NGK DR8EA a cada 6.000 km',           body: 'Mesma vela da CG 160. Troca a cada 6.000 km ou ao sinal de dificuldade de partida.' },
      { severity: 'WARN', title: 'Regulagem de válvulas a cada 8.000 km',    body: 'Igual à CG 160. Off-road adiciona vibração e carga ao motor, então a regulagem é igualmente importante.' },
      { severity: 'OK',   title: 'Suspensão: cheque vedações a cada revisão', body: 'Inspecione bengalas e amortecedor traseiro a cada revisão. Uso off-road acelera o desgaste das vedações. Substitua ao primeiro sinal de vazamento.' },
    ],
  },

  'XRE 300': {
    MACETES: [
      { severity: 'OK',   title: 'Óleo sintético 10W40 JASO MA2 — sem exceções', body: 'O motor 300cc DOHC de alta compressão da XRE exige sintético 10W40. Motores com mais de 60.000 km que nunca usaram sintético costumam ter mais consumo de óleo — a troca para sintético ajuda.' },
      { severity: 'WARN', title: 'Off-road: pressão de pneu reduzida muda o jogo', body: 'Para trilhas e terra, reduza para 22 PSI dianteiro e 26 PSI traseiro. A tração melhora drasticamente. Ao voltar ao asfalto, recalibre para 29/33 PSI — pneu descalibrado no asfalto desgasta rapidamente.' },
      { severity: 'OK',   title: 'Amortecedor traseiro: ajuste o preload pelo peso', body: 'O amortecedor traseiro regulável da XRE 300 pode ser ajustado para o peso do piloto. Piloto mais pesado (>80 kg): aumente 1–2 clicks de preload para evitar afundamento excessivo em buracos.' },
      { severity: 'OK',   title: 'Corrente 520: lubrificante específico para trilhas', body: 'Em trilhas com lama e areia, use lubrificante de corrente resistente à água (tipo O-Ring/X-Ring). Limpe a corrente com querosene após cada trilha pesada e lubrifique imediatamente.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Bomba de combustível com falha — modelos 2010–2016', body: 'A bomba de combustível intravase dos modelos 2010–2016 tem histórico de falha, especialmente em temperaturas altas. Sintoma: motor para repentinamente em movimento. Substituição preventiva em motos acima de 50.000 km é recomendada (R$ 200–400).' },
      { severity: 'WARN',   title: 'Sensor MAP com leituras erradas',         body: 'O sensor MAP (pressão do coletor) da XRE 300 apresenta falhas após 40.000–60.000 km: marcha lenta instável, falhas de ignição em baixas rotações e consumo elevado. Troca: R$ 80–150.' },
      { severity: 'WARN',   title: 'Bengalas dianteiras: retentores desgastam em trilhas', body: 'As bengalas invertidas da XRE 300 absorvem bem o impacto, mas os retentores se desgastam em uso off-road intenso. Mancha de óleo no tubo = troca necessária. Serviço: R$ 150–300 por bengala.' },
      { severity: 'WARN',   title: 'Pistão com desgaste prematuro sem manutenção regular', body: 'Motores de alta compressão mono são mais sensíveis à qualidade do óleo. Intervalo estendido além de 5.000 km com óleo mineral ou semissintético causa desgaste prematuro do pistão e cilindro.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 10W40 sintético JASO MA2 a cada 4.000 km', body: 'Honda recomenda sintético para o motor DOHC. Capacidade: 1,8 litros. Em uso off-road intenso, adote intervalo de 3.000 km.' },
      { severity: 'OK',   title: 'Vela NGK CPR8EA-9 a cada 8.000 km',         body: 'Vela específica da XRE 300. Use somente NGK CPR8EA-9 — a especificação de calor é crítica para o motor de alta compressão.' },
      { severity: 'OK',   title: 'Filtro de ar a cada 6.000 km (asfalto) / 3.000 km (off-road)', body: 'O filtro da XRE 300 é grande e eficiente, mas entope rapidamente em trilhas. Inspecione sempre após uso intenso em terra.' },
      { severity: 'WARN', title: 'Fluido de freio DOT 4 a cada 2 anos',       body: 'ABS em versões mais recentes. Fluido degradado afeta o modulador ABS. Troque nos dois circuitos a cada 2 anos.' },
      { severity: 'WARN', title: 'Regulagem de válvulas DOHC a cada 12.000 km', body: 'Motor DOHC com 4 válvulas requer regulagem mais técnica. Custo maior que a CG (R$ 180–300), mas igualmente obrigatória. Folga excessiva causa perda de compressão.' },
      { severity: 'OK',   title: 'Kit de transmissão 520 a cada 25.000–30.000 km', body: 'Corrente, coroa e pinhão juntos. A XRE 300 desgasta o kit mais rápido em uso off-road — inspect a cada 5.000 km.' },
    ],
  },

  'Pop 110i': {
    MACETES: [
      { severity: 'OK',   title: 'Para entregadores: troque o óleo a cada 2.500 km', body: 'A Pop 110i é amplamente usada para entregas, com uso médio de 60–100 km/dia. Em uso intenso, antecipe a troca de óleo para 2.500 km (vs. 3.000 km recomendados). O motor 110cc tem pouca folga de tolerância ao desgaste.' },
      { severity: 'WARN', title: 'Corrente: duração reduzida em entregas diárias', body: 'Em uso de entrega intensa, a corrente da Pop 110i dura em média 8.000–12.000 km (vs. 20.000 km em uso normal). Monitore a folga semanalmente — corrente solta em velocidade baixa pode pular e causar acidente.' },
      { severity: 'OK',   title: 'Injeção PGM-FI: evite combustível adulterado', body: 'A injeção PGM-FI da Pop 110i é sensível. Combustível com água ou adulterado causa falha de partida a frio e marcha lenta irregular. Use gasolina de postos de confiança.' },
      { severity: 'OK',   title: 'Câmbio de 4 marchas: 4ª ao máximo',         body: 'Use a 4ª marcha sempre acima de 60 km/h para reduzir o estresse no motor. Andar em 3ª acima de 70 km/h sobreaquece o motor pequeno em dias quentes.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Motor de partida com falha frequente em uso intenso', body: 'O motor de partida elétrica da Pop 110i é o ponto mais fraco em uso de entrega. Falha entre 20.000–40.000 km com uso diário. Sintoma: clique mas não engata. Troca: R$ 120–200.' },
      { severity: 'WARN', title: 'Câmbio com 4 marchas: sobrecarga em subidas longas', body: 'O câmbio de 4 velocidades é limitado em subidas longas. A 3ª marcha fica com rotação muito alta, aquecendo o motor. Em trajetos com muita subida, reduza a carga transportada.' },
      { severity: 'OK',   title: 'Partida a frio difícil em manhãs abaixo de 18°C', body: 'A injeção da Pop 110i dessa geração não tem compensação ideal para temperatura ambiente muito baixa. Se a partida travar, espere 30 segundos e tente novamente — não force o motor de arranque repetidamente.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 10W30 JASO MA2 a cada 3.000 km',      body: 'Entregadores: a cada 2.500 km. Motor 110cc tem menor capacidade de óleo (0,7 litros) — o óleo degrada mais rápido que em motores maiores.' },
      { severity: 'OK',   title: 'Vela NGK CR7HSA a cada 6.000 km',          body: 'Vela de fácil acesso na Pop 110i. R$ 12–20. Troca a cada 6.000 km — vela gasta dificulta partida e aumenta consumo no motor pequeno.' },
      { severity: 'OK',   title: 'Filtro de ar a cada 6.000 km',              body: 'Em uso urbano com fumaça de tráfego intenso, troque a cada 4.000 km. Filtro entupido faz o motor perder 10–15% da potência.' },
      { severity: 'DANGER', title: 'Corrente: inspeção semanal para entregadores', body: 'Em uso intenso de entrega, a corrente pode precisar de troca a cada 8.000 km. Corrente rompida em baixa velocidade pode prender na roda e causar queda.' },
    ],
  },

  'Fazer 250': {
    MACETES: [
      { severity: 'OK',   title: 'Lubrifique a corrente a cada 500 km',       body: 'A corrente da Fazer 250 se estica rapidamente com uso. Lubrifique a cada 500 km com lubrificante específico de corrente e ajuste a tensão a cada 5.000 km.' },
      { severity: 'OK',   title: 'Vela NGK CR8E a cada 6.000 km',            body: 'Use NGK CR8E original. Vela gasta aumenta o consumo e dificulta a partida a frio — troca simples e barata.' },
      { severity: 'WARN', title: 'Filtro de ar: vedação apodrece',            body: 'A vedação de borracha do filtro de ar racha com o tempo, permitindo entrada de água e poeira diretamente no motor. Inspecione a cada revisão.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Corrente frouxa pode pular ou quebrar',  body: 'A corrente da Fazer 250 se estica rapidamente. Corrente muito frouxa pode pular e travar a roda traseira em velocidade. Regule a cada 5.000 km sem falta.' },
      { severity: 'WARN',   title: 'Bengalas dianteiras perdem óleo',        body: 'As bengalas perdem óleo após 30.000 km. O retentor é simples de trocar — não ignore o vazamento (causa instabilidade na frenagem).' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 10W40 JASO MA2 a cada 4.000 km',      body: 'Use óleo para motos. Embreagem molhada exige JASO MA2 — óleo de carro danifica o disco.' },
      { severity: 'OK',   title: 'Kit de transmissão (corrente + coroa + pinhão) a cada 25.000 km', body: 'Troque o kit completo — trocar apenas a corrente desgasta as peças novas rapidamente.' },
    ],
  },

  // ══ TESLA ════════════════════════════════════════════════════════════════════

  'Model 3': {
    MACETES: [
      { severity: 'OK',   title: 'Bateria LFP (Standard Range): carregue a 100% regularmente', body: 'Ao contrário de baterias NCA/NMC, a LFP da versão Standard Range precisa ser carregada a 100% pelo menos uma vez por semana para recalibrar o BMS. O limite diário de 80% ainda é recomendado para o dia a dia.' },
      { severity: 'WARN', title: 'Sentry Mode: desative em local seguro',     body: 'O Sentry Mode consome ~1% de carga por hora. Em garagem particular, desative pelo app ou configure exclusões de local. Em 10 dias parado pode drenar 10% da bateria.' },
      { severity: 'OK',   title: 'Modo Perro / Camp Mode pelo app',           body: 'O Dog Mode e Camp Mode mantêm a temperatura interna. Monitore de longe pelo app Tesla. Programe alertas para quando a bateria cair abaixo de 20%.' },
      { severity: 'OK',   title: 'Precondicionamento automático',             body: 'Ative o pré-condicionamento no app 15 min antes de entrar no carro. Usa energia da tomada, não da bateria, e maximiza a autonomia real.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Pintura fina — PPF recomendado',            body: 'O Model 3 tem pintura fina reconhecida mundialmente como fraqueza. A maioria dos donos aplica PPF (proteção de pintura) nas partes dianteiras nos primeiros meses. Arranhões e marcas de insetos são comuns.' },
      { severity: 'WARN', title: '"Phantom braking" no Autopilot',            body: 'Frenagem brusca falsa em rodovias é o problema mais relatado do Autopilot. Acontece ao passar por sombras, viadutos ou marcações no asfalto. A Tesla corrige progressivamente via OTA, mas ainda ocorre.' },
      { severity: 'WARN', title: 'Degradação acelerada com DC diário',        body: 'Usar carregadores Supercharger todos os dias reduz a longevidade das células NCA/NMC. Para uso doméstico, o carregador de parede Wall Connector (22 kW) é o ideal.' },
      { severity: 'OK',   title: 'Chiados e rangidos na carroceria',          body: 'Model 3 tem histórico de rangidos na painel, bancos e vidros laterais. São ajustes de montagem que a Tesla geralmente resolve em visita ao service center em garantia.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Sem troca de óleo — motor elétrico',        body: 'O Model 3 não tem motor a combustão. Manutenção muito mais simples: sem óleo, sem filtro, sem correia dentada, sem velas.' },
      { severity: 'WARN', title: 'Fluido de freio a cada 2 anos',             body: 'Tesla recomenda checar o fluido de freio a cada 2 anos e trocar se necessário. Use DOT 3/DOT 4. A frenagem regenerativa preserva muito as pastilhas.' },
      { severity: 'OK',   title: 'Filtro HEPA de cabine a cada 12 meses',    body: 'O filtro HEPA é um dos diferenciais do Model 3. Troque a cada 12 meses ou 20.000 km para manter o modo Modo Biossegurança funcional.' },
      { severity: 'OK',   title: 'Pneus: rotação a cada 10.000 km',          body: 'O motor traseiro gera torque instantâneo que desgasta os pneus traseiros. A rotação frequente é essencial para extender a vida útil.' },
    ],
  },

  'Model Y': {
    MACETES: [
      { severity: 'OK',   title: 'Mesmas dicas do Model 3',                   body: 'O Model Y usa a mesma plataforma do Model 3. Todas as dicas de bateria, Sentry Mode e Autopilot se aplicam igualmente.' },
      { severity: 'WARN', title: 'Peso maior: pneus desgastam mais',          body: 'O Model Y pesa ~400 kg a mais que o Model 3. Os pneus traseiros desgastam muito mais rápido — rotacione a cada 8.000 km e use pneus com o índice de carga correto.' },
      { severity: 'OK',   title: 'Frunk (porta-malas dianteiro): use sempre', body: 'O frunk tem ~117L e é ideal para itens que precisam de fácil acesso. Usar o frunk equilibra melhor o peso do veículo.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Pintura e acabamento inferiores ao preço',  body: 'Mesma crítica do Model 3, porém em um SUV premium. PPF ou ceramic coating nas primeiras semanas é fortemente recomendado. Verifique a pintura na entrega.' },
      { severity: 'WARN', title: '"Phantom braking" — igual ao Model 3',      body: 'O FSD/Autopilot tem os mesmos comportamentos de frenagem falsa. Mantenha as atualizações em dia.' },
      { severity: 'OK',   title: 'Vidro traseiro: aquecimento insuficiente',  body: 'Em dias frios, o desembaçador traseiro demora mais para limpar o vidro amplo. Pré-condicione o carro e ative o desembaçador com antecedência.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Mesma tabela de manutenção do Model 3',     body: 'Fluido de freio a cada 2 anos, filtro HEPA a cada 12 meses, pneus a cada 8.000 km pelo maior peso. Sem óleo, sem correia.' },
    ],
  },

  // ══ BYD ══════════════════════════════════════════════════════════════════════

  Dolphin: {
    MACETES: [
      { severity: 'OK',   title: 'Configure o limite de carga em 90% no menu', body: 'Acesse Configurações → Carregamento → Limite de Carga e ajuste para 90%. A BYD recomenda 80-90% para uso diário. Reserve os 100% apenas para viagens longas onde a autonomia total é necessária.' },
      { severity: 'OK',   title: 'Carga programada para tarifação reduzida',  body: 'Use o modo de carga agendada para carregar de madrugada (00h–06h), quando a tarifa de energia é mais barata. O app BYD Link permite configurar horários e limite de carga remotamente.' },
      { severity: 'WARN', title: 'App BYD Link: calibre pelo veículo, não pelo app', body: 'O app às vezes mostra dados diferentes do painel. Para informações críticas (autonomia real, temperatura da bateria), sempre confira no painel do veículo.' },
      { severity: 'OK',   title: 'Modo Eco prolonga autonomia em até 15%',    body: 'Em tráfego urbano e curtas distâncias, use o modo Eco. Ele reduz a potência máxima mas aumenta a recuperação regenerativa, podendo ganhar até 15% de autonomia em cidade.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Pintura sensível — arranhões fáceis',       body: 'O acabamento de pintura do Dolphin é frequentemente criticado por donos brasileiros: arranhões aparecem com facilidade em lavagens e até em contato com roupas. Ceramic coating ou PPF nas primeiras semanas é fortemente recomendado.' },
      { severity: 'WARN', title: 'Bancos: foam de baixa densidade',           body: 'Os bancos dianteiros perdem a firmeza com uso intenso. Não é defeito de segurança, mas afeta o conforto em viagens longas. Capa de assento ou almofada ajudam.' },
      { severity: 'OK',   title: 'Carregador AC de 7 kW: carga mais lenta',   body: 'O Dolphin tem carregador onboard de 7 kW (AC), o que é adequado mas não dos mais rápidos. Uma carga completa em parede 220V (7 kW) leva ~8 horas. Para uso diário, deixe conectado durante a noite.' },
      { severity: 'WARN', title: 'Autonomia real ~20% menor que o anunciado', body: 'A autonomia real do Dolphin, em condições brasileiras (calor, AC ligado, tráfego parado), fica entre 300–350 km vs. os 400 km WLTP anunciados. Planeje viagens com margem de segurança de pelo menos 20%.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Sem troca de óleo — motor elétrico BYD',   body: 'O motor elétrico do Dolphin não usa óleo lubrificante. A revisão se resume a: fluido de freio, pneus, filtro de cabine e inspeção geral — muito mais simples e barata que um ICE.' },
      { severity: 'WARN', title: 'Fluido de freio DOT 4 a cada 2 anos',      body: 'Mesmo com frenagem regenerativa intensiva, o fluido de freio absorve umidade ao longo do tempo. BYD recomenda substituição a cada 2 anos ou se o ponto de ebulição cair abaixo do especificado.' },
      { severity: 'OK',   title: 'Fluido de arrefecimento da bateria a cada 5 anos', body: 'O sistema de gerenciamento térmico da bateria LFP usa fluido específico. BYD recomenda inspeção a cada 2 anos e substituição a cada 5 anos ou 100.000 km.' },
      { severity: 'OK',   title: 'Rotação de pneus a cada 10.000 km',        body: 'O Dolphin tem tração dianteira e motor na frente. O peso e o torque instantâneo desgastam os pneus dianteiros mais rápido — rotacione frequentemente.' },
    ],
  },

  Seal: {
    MACETES: [
      { severity: 'OK',   title: 'Versão AWD: tração no eixo traseiro em Normal', body: 'Na versão AWD, no modo Normal o motor traseiro é o principal (RWD feel). O motor dianteiro entra sob demanda. Para preservar a bateria, use Eco no dia a dia.' },
      { severity: 'WARN', title: 'Autonomia real em rodovia: use Sport com cuidado', body: 'O modo Sport aumenta dramaticamente o consumo. Em viagens, use Normal ou Eco na rodovia. O Seal tem autonomia real de ~480 km em modo Eco vs. ~380 km no Sport.' },
      { severity: 'OK',   title: 'Carregamento rápido DC: limite de temperatura', body: 'O Seal tem gerenciamento térmico avançado que pré-aquece a bateria automaticamente para carregamento rápido. Não força carregamento DC com bateria fria — aguarde o pré-aquecimento completar.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Ruídos de vento no vidro dianteiro em alta velocidade', body: 'Problema relatado por muitos donos brasileiros: ruído de vento entre 100–130 km/h vindo do vidro lateral dianteiro ou do para-brisas. Em garantia, a BYD geralmente faz ajustes de vedação que resolvem.' },
      { severity: 'OK',   title: 'Câmera de ré com resolução limitada',       body: 'A resolução da câmera de ré é criticada para um sedan desta faixa de preço. Não é um problema de segurança, mas limita a clareza em manobras. Use o sensor de estacionamento para complementar.' },
      { severity: 'WARN', title: 'Sistema DiLink pode travar',                body: 'O sistema de infoentretenimento DiLink pode ficar lento ou travar após uso prolongado. Reinicialize pelo menu ou desligando o carro por 5 minutos. Atualizações OTA costumam melhorar o desempenho.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Manutenção essencialmente elétrica',        body: 'Sem óleo de motor, sem filtro de combustível, sem velas, sem correia dentada. Foque em: fluido de freio (2 anos), fluido de arrefecimento (5 anos), pneus e filtro de cabine.' },
      { severity: 'WARN', title: 'Pneus traseiros (AWD): desgaste assimétrico', body: 'Na versão AWD, o motor traseiro aplica mais torque no eixo traseiro. Monitore o desgaste dos pneus traseiros com mais atenção e rotacione a cada 8.000 km.' },
    ],
  },

  'Song Plus': {
    MACETES: [
      { severity: 'OK',   title: 'Versão PHEV: carregue primeiro, economize combustível', body: 'Na Song Plus DM-i (híbrida plug-in), carregue sempre que possível. Com bateria cheia, o motor elétrico faz a maior parte do trabalho em cidade. A gasolina entra em rodovias ou quando a bateria acaba.' },
      { severity: 'WARN', title: 'PHEV: não deixe a bateria sempre em 0%',    body: 'Usar a Song Plus DM-i sempre com bateria zerada sobrecarrega o motor de combustão e reduz a eficiência. Carregue no trabalho, em shoppings — qualquer oportunidade ajuda.' },
      { severity: 'OK',   title: 'Modo HEV economiza mais que só gasolina',  body: 'Quando a bateria está baixa, ative o modo HEV (híbrido) em vez de usar apenas gasolina. O motor se autocarrega e mantém ~30% de carga para otimizar o consumo.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Consumo de gasolina alto sem carga elétrica', body: 'A Song Plus DM-i foi projetada para funcionar principalmente no elétrico. Sem carregamento regular, o consumo de gasolina fica na faixa de 8–10 L/100km — perde a principal vantagem do PHEV.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'PHEV: mesma manutenção do motor gasolina',  body: 'A Song Plus DM-i tem motor de combustão 1.5L que precisa de troca de óleo. BYD recomenda 5W30 a cada 10.000 km. O motor elétrico não requer óleo.' },
      { severity: 'WARN', title: 'Fluido do câmbio e-CVT a cada 60.000 km',  body: 'O câmbio e-CVT (Eficiência Dual Mode) usa fluido específico. Troca obrigatória a cada 60.000 km para evitar deslizamentos e solavancos.' },
    ],
  },

  'Atto 3': {
    MACETES: [
      { severity: 'OK',   title: 'Também vendido como Yuan Plus — mesmo veículo', body: 'O Atto 3 e o Yuan Plus são o mesmo veículo vendido com diferentes nomes em diferentes mercados. Dicas e informações de outros países sob o nome Yuan Plus se aplicam totalmente.' },
      { severity: 'OK',   title: 'Limite de carga em 80% para uso diário',   body: 'Configure o limite de carga em 80% para uso diário no menu de carregamento. A bateria LFP aceita cargas a 100% sem grandes danos, mas manter abaixo de 90% prolonga a vida útil a longo prazo.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Autonomia real: ~320 km em condições reais', body: 'A autonomia WLTP de 420 km é atingida em condições ideais. Na realidade brasileira (calor, AC, estradas imperfeitas), espere 300–340 km. Planeje paradas de recarga com margem.' },
      { severity: 'OK',   title: 'Interior inovador mas polarizador',         body: 'O interior do Atto 3 com os elásticos na porta e o design futurista pode causar estranhamento. Não é um problema — é design intencional. Alguns acessórios de armazenamento adicionais são úteis.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Sem óleo, sem correia — elétrico puro',     body: 'Motor elétrico sem manutenção de óleo. Foco em: fluido de freio (2 anos), arrefecimento da bateria (5 anos), pneus (rotação a cada 10.000 km), filtro de cabine (12 meses).' },
    ],
  },

  // ══ HARLEY-DAVIDSON ══════════════════════════════════════════════════════════

  '883N': {
    MACETES: [
      { severity: 'OK',   title: 'Óleo JASO MA/MA2: nunca óleo de carro',        body: 'O Sportster 883 tem motor, primária e câmbio compartilhando o MESMO óleo (unidade compacta). Use 20W50 com certificação JASO MA ou MA2. Óleo de carro com modificadores de fricção danifica a embreagem molhada.' },
      { severity: 'WARN', title: 'Jetting pobre de fábrica',                      body: 'O motor 883 vem pobre de combustível por normas de emissão. Com escape slip-on, o motor fica ainda mais magro e quente. Instale módulo de injeção (Screamin\' Eagle Race Tuner ou equivalente) para corrigir a mistura.' },
      { severity: 'OK',   title: 'Correia de transmissão: sem lubrificante',      body: 'A correia dentada traseira não precisa de lubrificante — apenas inspeção. Verifique a deflexão a cada 8.000 km: 6–12 mm no centro do trecho inferior. Uma correia bem calibrada dura 40.000–60.000 km.' },
      { severity: 'WARN', title: 'Calor intenso no cilindro traseiro: normal',    body: 'O V-twin air-cooled esquenta muito no trânsito parado. Use calças resistentes a calor na perna direita. Deflectores de calor (heat shield) no escape reduzem o desconforto.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Retificador/regulador de tensão: falha crônica', body: 'O retificador original dos Sportsters pré-2014 falha por superaquecimento. Sintoma: bateria que não carrega, luz de carga ativa, falhas elétricas. Upgrade para regulador MOSFET (R$ 200–400) elimina o problema definitivamente.' },
      { severity: 'WARN',   title: 'Vibrações soltam parafusos',                  body: 'O V-twin de 45° vibra intensamente. Verifique e aperte os parafusos do guidão, retrovisores, proteção do motor e alforjes a cada 5.000 km. Use Loctite azul nos parafusos críticos.' },
      { severity: 'OK',     title: 'Manchas de óleo: "suor" vs vazamento real',   body: 'A Harley considera normal um leve "suor" nas juntas de cabeçote e tampa de válvulas. Manchas em formato de gota que caem no solo são vazamentos reais que precisam de reparo imediato.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 20W50 JASO MA a cada 8.000 km',           body: 'Um único óleo para motor + primária + câmbio (unidade compacta). Volume: 2,8 litros. Troque o filtro junto. Nos primeiros 800 km de rodagem, faça uma troca extra para eliminar partículas do amortecimento.' },
      { severity: 'OK',   title: 'Filtro de ar a cada 16.000 km',                 body: 'Filtro circular acessível. Em ambiente urbano poluído, inspecione visualmente a cada 8.000 km. Filtro entupido piora a mistura já pobre de fábrica.' },
      { severity: 'WARN', title: 'Regulagem de válvulas a cada 24.000 km',        body: 'Motor pushrod OHV com hidráulicos. Ruídos de "tic-tic" em cold start podem indicar folga excessiva. Requer ferramenta específica — leve a oficina especializada em HD.' },
      { severity: 'OK',   title: 'Correia de transmissão: tensão a cada 16.000 km', body: 'Deflexão correta: 6–12 mm. Correia solta causa ruído e risco de sair da polia. Correia muito tensa destrói progressivamente o rolamento da roda traseira.' },
    ],
  },

  '1200NS': {
    MACETES: [
      { severity: 'OK',   title: 'Motor 1200cc: mesma família do 883',            body: 'O Iron 1200 usa o mesmo bloco Evolution do Iron 883, mas com pistões maiores. Todas as dicas de manutenção e problemas conhecidos do Iron 883 se aplicam integralmente.' },
      { severity: 'OK',   title: 'Período de rodagem: varie a rotação',           body: 'Nos primeiros 1.500 km, não mantenha rotação constante por mais de 10 minutos. Varie entre 2.000 e 5.000 rpm para rodagem uniforme dos pistões e assentamento dos anéis.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Retificador: mesma falha crítica dos Sportsters', body: 'Idêntico ao Iron 883: retificador original falha prematuramente. Upgrade MOSFET é prioridade antes de qualquer viagem longa.' },
      { severity: 'WARN',   title: 'Consumo de óleo após 50.000 km',              body: 'Motores Sportster 1200 tendem a consumir mais óleo (0,3–0,5 L a cada 1.000 km) após 50.000 km. É normal para a família Evolution. Verifique o nível a cada abastecimento.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Mesma tabela de manutenção do Iron 883',        body: 'Óleo 20W50 JASO MA (2,8L) a cada 8.000 km, filtro de ar a cada 16.000 km, correia a cada 16.000 km, válvulas a cada 24.000 km. Procedimentos idênticos ao 883.' },
    ],
  },

  'Forty Eight': {
    MACETES: [
      { severity: 'WARN', title: 'Tanque de 7,9L: autonomia de apenas ~120 km',  body: 'O tanque "peanut" icônico cabe apenas 7,9 litros. Com consumo de 5–7 L/100km, a autonomia real é de 110–150 km. Nunca ignore o nível de combustível — não há reserva emergencial adequada.' },
      { severity: 'OK',   title: 'Motor 1200cc: mesmas dicas do Iron 1200',       body: 'O Forty-Eight usa o motor Sportster 1200cc. Todas as dicas e problemas do Iron 1200 se aplicam: JASO MA, upgrade do retificador, regulagem de válvulas e inspeção da correia.' },
      { severity: 'OK',   title: 'Pneu dianteiro largo 130/90 B16',               body: 'O "fat front" dá uma dirigibilidade característica. Em curvas rápidas, exige mais esforço que pneus estreitos. Calibre sempre os 36 PSI corretos — variação de pressão altera drasticamente o comportamento.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Retificador: mesma falha crítica',            body: 'Urgente: retificador original falha prematuramente. Com tanque pequeno e autonomia limitada, uma falha elétrica na estrada é situação crítica. Priorize o upgrade MOSFET.' },
      { severity: 'WARN',   title: 'Tanque metálico: enferrujamento interno',     body: 'O tanque pequeno de aço pode enferrujar internamente após 5–8 anos com moto parada e tanque incompleto. A cada 3 anos, drene completamente e inspecione. Tratamento interno com produto anti-ferrugem previne o problema.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Mesma tabela dos Sportsters 1200',              body: 'Óleo 20W50 JASO MA (2,8L) a cada 8.000 km. Filtro a cada 16.000 km. Correia a cada 16.000 km. Válvulas a cada 24.000 km.' },
    ],
  },

  'Fat Boy': {
    MACETES: [
      { severity: 'WARN', title: 'Milwaukee-Eight: 3 fluidos separados — todos obrigatórios', body: 'O Fat Boy tem 3 sistemas de óleo independentes: motor (~3,8 L), chaincase/primária (~0,95 L) e câmbio (~0,85 L). Nunca esqueça de trocar os três. Oficinas não especializadas em HD frequentemente esquecem a primária e o câmbio.' },
      { severity: 'WARN', title: 'Primária: volume EXATO — não encha demais',     body: 'A chaincase deve ter exatamente 0,95 litros. Excesso causa patinagem imediata da embreagem molhada. Use sempre a vareta de nível na tampa de inspeção para verificar o nível correto.' },
      { severity: 'OK',   title: 'Correia larga 1,5": robusta e durável',         body: 'A correia de transmissão não precisa de lubrificante. Inspecione trincas e deflexão (6–12 mm) a cada revisão. Troca completa somente se houver desgaste ou fissura visível. Duração típica: 40.000–60.000 km.' },
      { severity: 'OK',   title: 'Milwaukee-Eight 2017+: sistema de carga melhorado', body: 'Modelos com M8 (2017+) têm retificador mais robusto que as gerações anteriores. Ainda assim, verifique a temperatura do regulador em uso intenso no verão e use Battery Tender em storage.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN',   title: 'Tampa da primária: vazamento de junta',       body: 'A junta de borracha da tampa do chaincase endurece e começa a "suar" óleo após 40.000–60.000 km. Troca da junta com Permatex Ultra Black resolve definitivamente. Custo em peças: R$ 50–120.' },
      { severity: 'WARN',   title: 'Pinça de freio traseiro oxidada em storage',  body: 'Em motos guardadas por 3+ meses sem uso, a pinça do freio traseiro pode travar por oxidação. Não force — libere com cautela ou substitua a pinça (R$ 400–800).' },
      { severity: 'OK',     title: 'Bateria descarrega em storage: use Battery Tender', body: 'O Fat Boy com todos os módulos eletrônicos consome ~25 mA em standby. Em 30 dias sem uso, a bateria de 12V descarrega completamente. Use um carregador de manutenção (Battery Tender) sempre que guardar por mais de 2 semanas.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo motor SYN3 20W50 a cada 8.000 km',        body: 'Milwaukee-Eight. Volume: 3,8 litros. Use HD SYN3 ou equivalente 20W50 JASO MA. Troque o filtro de óleo junto.' },
      { severity: 'OK',   title: 'Óleo da primária (chaincase) a cada 8.000 km', body: 'HD Primary Chaincase Lubricant ou equivalente 20W50 JASO MA. Volume: 0,95 litros. Drene pela tampa inferior, reabastece pelo orifício de inspeção usando vareta para verificar o nível.' },
      { severity: 'OK',   title: 'Óleo do câmbio (6 marchas) a cada 8.000 km',   body: 'HD Transmission Lubricant ou equivalente 20W50 JASO MA. Volume: ~0,85 litros. Drene e encha pelo orifício de nível lateral.' },
      { severity: 'WARN', title: 'Filtro de ar a cada 16.000 km',                 body: 'Filtro do air cleaner. Em cidades com poluição intensa, inspecione a cada 8.000 km. Filtro sujo prejudica a mistura do motor e aumenta o consumo.' },
    ],
  },

  'Road King': {
    MACETES: [
      { severity: 'OK',   title: 'Revise os 3 fluidos antes de viagens longas',   body: 'Antes de qualquer viagem acima de 1.000 km, verifique motor (3,8L), primária (0,95L) e câmbio (0,85L). Inclua também freios, calibragem dos pneus e inspeção da correia de transmissão.' },
      { severity: 'OK',   title: 'Distribuição de carga: peso igual nos alforjes', body: 'As saddlebags do Road King somam peso considerável. Distribua equitativamente entre os dois alforjes — carga assimétrica afeta a estabilidade em curvas. Peso máximo recomendado por alforje: 9 kg.' },
      { severity: 'WARN', title: 'Freio dianteiro potente: adaptação necessária', body: 'O Road King tem freio dianteiro de dupla pinça muito potente. Piloto vindo de outros modelos deve treinar a modulação progressiva nos primeiros 100 km para evitar travamento involuntário.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Sistema de som consome bateria em storage',     body: 'O áudio integrado mantém memória e consome energia mesmo desligado. Em storage acima de 2 semanas sem Battery Tender, a bateria descarrega. Desconecte o terminal negativo ou use carregador de manutenção.' },
      { severity: 'WARN', title: 'Pneu traseiro 180/65 B16: custo elevado',       body: 'Pneu traseiro de especificação específica — R$ 600–1.000 por unidade. Calibre corretamente para maximizar a vida útil (mínimo 12.000 km). Michelin Commander III e Dunlop American Elite são as melhores opções custo/benefício.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: '3 fluidos a cada 8.000 km',                     body: 'Motor SYN3 20W50 (3,8L), chaincase HD Primary Lubricant (0,95L), câmbio HD Transmission Lubricant (0,85L). Todos com intervalo de 8.000 km.' },
      { severity: 'OK',   title: 'Fluido de freio DOT 4 a cada 2 anos',           body: 'Sistema de dupla pinça no dianteiro. Fluido degradado resulta em freio esponjoso. Troca obrigatória a cada 2 anos independente da quilometragem.' },
      { severity: 'WARN', title: 'Correia de transmissão: tensão crítica',         body: 'Road King carregado (>380 kg com bagagem) — a correia sofre mais. Tensão correta: 6–12 mm de deflexão. Acima de 15 mm a correia pode sair da polia em aceleração brusca. Verifique a cada 16.000 km.' },
    ],
  },

  'Low Rider S': {
    MACETES: [
      { severity: 'OK',   title: 'Milwaukee-Eight 114: torque máximo a baixas rotações', body: 'O M8 114 (1.868cc) entrega 162 Nm a apenas 3.250 rpm. Em saídas de curva em asfalto molhado, a aceleração brusca pode surpreender pela resposta instantânea de torque. Seja progressivo.' },
      { severity: 'WARN', title: 'Guidão drag bar: postura exige adaptação',       body: 'O guidão baixo força postura mais comprimida que o típico cruiser. Em trajetos acima de 40 minutos, o desconforto no pescoço e ombros é frequente. Riser de guidão aftermarket é a modificação mais popular.' },
      { severity: 'OK',   title: 'Pinças Brembo M50: potência diferente dos HD padrão', body: 'A FXLRS tem pinças Brembo no dianteiro. São significativamente mais potentes e menos progressivas que as HD padrão. Adapte a pressão no manete nos primeiros km de uso.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Primária é o ponto mais esquecido na manutenção', body: 'Na Low Rider S, a chaincase é frequentemente ignorada em revisões. Óleo escuro com partículas metálicas indica disco de embreagem desgastado. Troque junto com o motor a cada 8.000 km sem exceção.' },
      { severity: 'OK',   title: 'Vibração intensa a baixas rotações',            body: 'O M8 114 vibra mais intensamente que as versões menores em rotações abaixo de 1.800 rpm. No trânsito parado, as vibrações chegam ao guidão e ao banco — comportamento normal para um V-twin air-cooled de grande cilindrada.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: '3 fluidos: motor 3,8L + primária 0,95L + câmbio 0,85L', body: 'Todos com 20W50 JASO MA (SYN3 motor, Primary Lubricant na chaincase, Transmission Lubricant no câmbio). Intervalo: 8.000 km para os três.' },
      { severity: 'WARN', title: 'Correia 1,5": inspeção a cada 16.000 km',       body: 'Deflexão correta: 6–12 mm. Tensão excessiva destrói o rolamento da roda traseira progressivamente (reparo: R$ 500–900). Tensão insuficiente causa ruído e risco de salto da correia.' },
    ],
  },

  'Sportster S': {
    MACETES: [
      { severity: 'OK',   title: 'Revolution Max 1250T: esqueça as regras dos air-cooled', body: 'O Sportster S tem motor DOHC 4 válvulas liquid-cooled — nada a ver com os Sportsters clássicos. Sem separação de fluidos, sem tanque de óleo externo, sem pushrod. Use 20W60 sintético e siga os intervalos modernos.' },
      { severity: 'OK',   title: 'Rodagem: 1.600 km sem rotação constante',       body: 'Nos primeiros 1.600 km, não mantenha o motor em rotação fixa por mais de 5 minutos e evite acima de 7.500 rpm. Varie carga e velocidade. A rodagem correta define a vida útil do motor.' },
      { severity: 'WARN', title: 'Tick no cold start: problema conhecido',         body: 'Modelos 2021–2022 têm relatos de ruído de "tick" nos primeiros segundos após partida a frio. Amplamente discutido nos fóruns HD — desaparece em segundos com o motor aquecido. Se persistir por mais de 30 segundos, leve a um distribuidor.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Display TFT: lag em temperaturas acima de 40°C', body: 'O display integrado pode apresentar atraso ou tela em branco no calor intenso. Bug de software — atualizações HD via concessionária costumam corrigir.' },
      { severity: 'OK',   title: 'Guidão baixo: desconforto em trajetos diários', body: 'A posição esportiva do low bar é intensa para uso urbano diário acima de 30 minutos. Riser de 2–4 cm é a adaptação mais comum para uso mais confortável sem perder o estilo.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 20W60 sintético a cada 8.000 km',          body: 'Revolution Max 1250T. Motor + sistema hidráulico compartilham o mesmo óleo. Volume: 3,8 litros. Use HD SYN3 20W60 ou equivalente 20W60 com JASO MA2. Troque o filtro junto.' },
      { severity: 'OK',   title: 'Fluido de arrefecimento a cada 2 anos',          body: 'Use HD Extended Life Coolant ou equivalente premixado 50/50. Nunca use concentrado puro — a mistura incorreta corrói o sistema de arrefecimento ao longo do tempo.' },
      { severity: 'OK',   title: 'Filtro de ar a cada 16.000 km',                 body: 'Substituição do filtro por modelo de alto fluxo pode melhorar resposta, mas requer recalibração do mapa de injeção via HD calibration tool na concessionária.' },
      { severity: 'WARN', title: 'Correia de transmissão: inspecione a cada 16.000 km', body: 'Muitos proprietários não sabem que o Sportster S usa correia dentada HD como os Big Twins. Deflexão correta: 6–10 mm. Correia com fissuras deve ser substituída imediatamente.' },
    ],
  },

  'Pan America': {
    MACETES: [
      { severity: 'WARN', title: 'Adaptive Ride Height: cuidado com acessórios pesados', body: 'Modelos com ARH (1250S) têm suspensão que ajusta automaticamente. Instalar windshield pesado, câmeras ou GPS de grande porte no painel pode interferir nos sensores. Respeite os limites de peso de acessório indicados no manual.' },
      { severity: 'OK',   title: 'Off-road: reduza a pressão para 22/26 PSI',     body: 'Em trilhas, reduza para 22 PSI dianteiro e 26 PSI traseiro. O peso de 245 kg da moto compensa com pressão menor para melhor aderência. Retorne aos valores de asfalto (33/36 PSI) imediatamente ao voltar ao pavimento.' },
      { severity: 'WARN', title: 'Peso de 245 kg: cuidado ao estacionar em declive', body: 'A Pan America é pesada para uma adventure. Em superfícies inclinadas ou irregulares, o cavalete lateral pode afundar. Use em superfície firme e plana. Em declive, engate 1ª marcha antes de largar o freio.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Parafusos do protetor de motor se soltam',      body: 'Problema frequente: os parafusos do skid plate / crash guard afrouxam com vibração e uso off-road. Aplique Loctite azul e verifique o aperto a cada 5.000 km ou após cada trilha pesada.' },
      { severity: 'WARN', title: 'Ruído ao engatar 1ª marcha',                    body: 'Muitos proprietários relatam leve ruído metálico ao engatar 1ª marcha com moto parada. Comportamento normal do câmbio de 6 velocidades em motores de alto torque — não afeta durabilidade.' },
      { severity: 'OK',   title: 'Atualizações de software via USB são críticas', body: 'A Pan America não tem OTA wireless — atualizações são feitas via USB na concessionária. Mantenha o software sempre atualizado: correções de calibração de suspensão, tração e instrumentos foram lançadas em updates pós-lançamento.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 20W60 sintético a cada 8.000 km',          body: 'Revolution Max 1250. Volume: 3,8 litros. HD SYN3 20W60 ou equivalente JASO MA2. Sistema motor + hidráulicos compartilhado.' },
      { severity: 'OK',   title: 'Fluido de arrefecimento a cada 2 anos',          body: 'Sistema mais complexo que o Sportster S. Recomendado realizar em concessionária HD para garantia do procedimento correto nas versões com ARH.' },
      { severity: 'WARN', title: 'Correia de transmissão: inspeção após off-road', body: 'Com o peso da moto e uso off-road, a correia sofre mais que em modelos de asfalto. Inspecione estado e tensão (6–12 mm) após toda trilha pesada, além da revisão periódica a cada 16.000 km.' },
      { severity: 'OK',   title: 'Filtro de ar: troca prioritária em uso off-road', body: 'Em uso off-road frequente, troque o filtro a cada 8.000 km (vs. 16.000 km no asfalto). Poeira de trilha entope rapidamente e prejudica o desempenho do motor de alta performance.' },
    ],
  },
}

// ─── Tire pressure data ───────────────────────────────────────────────────────

const tirePressures = [
  // Chevrolet
  { modelName: 'Onix',      yearFrom: 2020, yearTo: null, tireSize: '185/65 R15', frontPsi: 32, rearPsi: 32, frontPsiLoad: 36, rearPsiLoad: 38, sparePsi: 60, notes: 'Estepe menor (step) — calibre a 60 PSI' },
  { modelName: 'Onix',      yearFrom: 2013, yearTo: 2019, tireSize: '185/65 R15', frontPsi: 30, rearPsi: 30, frontPsiLoad: 34, rearPsiLoad: 35, sparePsi: 60, notes: null },
  { modelName: 'Onix Plus', yearFrom: 2020, yearTo: null, tireSize: '185/65 R15', frontPsi: 32, rearPsi: 32, frontPsiLoad: 36, rearPsiLoad: 38, sparePsi: 60, notes: 'Estepe step — 60 PSI' },
  { modelName: 'Tracker',   yearFrom: 2020, yearTo: null, tireSize: '215/60 R16', frontPsi: 33, rearPsi: 33, frontPsiLoad: 35, rearPsiLoad: 36, sparePsi: 60, notes: null },
  { modelName: 'S10',       yearFrom: 2016, yearTo: null, tireSize: '245/70 R16', frontPsi: 35, rearPsi: 50, frontPsiLoad: 38, rearPsiLoad: 60, sparePsi: 60, notes: 'Traseiro varia com a carga. Verifique a plaqueta na soleira' },
  { modelName: 'Cruze',     yearFrom: 2017, yearTo: null, tireSize: '205/55 R16', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 36, sparePsi: 60, notes: null },

  // Volkswagen
  { modelName: 'Gol',       yearFrom: 2012, yearTo: 2020, tireSize: '175/70 R13', frontPsi: 28, rearPsi: 27, frontPsiLoad: 32, rearPsiLoad: 33, sparePsi: 60, notes: 'Versões R14: frontais 30 PSI, traseiros 29 PSI' },
  { modelName: 'Polo',      yearFrom: 2018, yearTo: null, tireSize: '195/55 R16', frontPsi: 33, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 35, sparePsi: 60, notes: null },
  { modelName: 'Virtus',    yearFrom: 2018, yearTo: null, tireSize: '195/55 R16', frontPsi: 33, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 35, sparePsi: 60, notes: null },
  { modelName: 'T-Cross',   yearFrom: 2019, yearTo: null, tireSize: '215/50 R17', frontPsi: 33, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 35, sparePsi: 60, notes: 'Versões aro 16: 195/55 R16 — 33/32 PSI' },
  { modelName: 'Saveiro',   yearFrom: 2013, yearTo: null, tireSize: '195/70 R15', frontPsi: 33, rearPsi: 44, frontPsiLoad: 35, rearPsiLoad: 50, sparePsi: 60, notes: 'Traseiro varia com carga. Sem carga: 33 PSI. Com carga máxima: 50 PSI' },

  // Fiat
  { modelName: 'Argo',      yearFrom: 2017, yearTo: null, tireSize: '185/65 R15', frontPsi: 32, rearPsi: 30, frontPsiLoad: 35, rearPsiLoad: 35, sparePsi: 60, notes: null },
  { modelName: 'Cronos',    yearFrom: 2018, yearTo: null, tireSize: '195/55 R16', frontPsi: 33, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 35, sparePsi: 60, notes: null },
  { modelName: 'Strada',    yearFrom: 2021, yearTo: null, tireSize: '205/65 R15', frontPsi: 33, rearPsi: 38, frontPsiLoad: 35, rearPsiLoad: 44, sparePsi: 60, notes: 'Traseiro: sem carga 33 PSI, com carga máxima 44 PSI' },
  { modelName: 'Toro',      yearFrom: 2016, yearTo: null, tireSize: '215/60 R17', frontPsi: 33, rearPsi: 36, frontPsiLoad: 35, rearPsiLoad: 42, sparePsi: 60, notes: 'Traseiro varia com carga. Diesel pode ter especificação diferente — verifique a plaqueta' },
  { modelName: 'Mobi',      yearFrom: 2016, yearTo: null, tireSize: '175/65 R14', frontPsi: 29, rearPsi: 28, frontPsiLoad: 32, rearPsiLoad: 33, sparePsi: 60, notes: null },
  { modelName: 'Uno',       yearFrom: 2012, yearTo: 2020, tireSize: '175/70 R13', frontPsi: 29, rearPsi: 27, frontPsiLoad: 32, rearPsiLoad: 33, sparePsi: 60, notes: null },
  { modelName: 'Pulse',     yearFrom: 2021, yearTo: null, tireSize: '195/60 R16', frontPsi: 33, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 35, sparePsi: 60, notes: null },

  // Toyota
  { modelName: 'Corolla',   yearFrom: 2020, yearTo: null, tireSize: '205/55 R16', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 38, sparePsi: 60, notes: 'Versão Altis Premium: 215/45 R17 — 35/33 PSI' },
  { modelName: 'Corolla',   yearFrom: 2015, yearTo: 2019, tireSize: '205/55 R16', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 38, sparePsi: 60, notes: null },
  { modelName: 'Hilux',     yearFrom: 2016, yearTo: null, tireSize: '265/65 R17', frontPsi: 33, rearPsi: 50, frontPsiLoad: 35, rearPsiLoad: 58, sparePsi: 60, notes: 'Traseiro: sem carga 33 PSI, carga máxima 50 PSI. Versões SR/SRV: 265/60 R18' },
  { modelName: 'Yaris',     yearFrom: 2019, yearTo: null, tireSize: '185/60 R16', frontPsi: 33, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 35, sparePsi: 60, notes: 'Hatch e sedã têm mesma calibragem' },
  { modelName: 'SW4',       yearFrom: 2016, yearTo: null, tireSize: '265/65 R17', frontPsi: 33, rearPsi: 38, frontPsiLoad: 35, rearPsiLoad: 42, sparePsi: 60, notes: null },

  // Ford
  { modelName: 'Ka',        yearFrom: 2015, yearTo: 2021, tireSize: '175/70 R14', frontPsi: 30, rearPsi: 28, frontPsiLoad: 33, rearPsiLoad: 35, sparePsi: 60, notes: 'Estepe menor — 60 PSI' },
  { modelName: 'EcoSport',  yearFrom: 2013, yearTo: 2022, tireSize: '205/60 R16', frontPsi: 33, rearPsi: 33, frontPsiLoad: 35, rearPsiLoad: 38, sparePsi: 60, notes: 'Estepe externo (stépão) — calibre a 60 PSI mensalmente' },
  { modelName: 'Ranger',    yearFrom: 2013, yearTo: null, tireSize: '265/65 R17', frontPsi: 35, rearPsi: 50, frontPsiLoad: 38, rearPsiLoad: 58, sparePsi: 60, notes: 'Traseiro varia com carga. Verifique a plaqueta na soleira' },

  // Hyundai
  { modelName: 'HB20',      yearFrom: 2020, yearTo: null, tireSize: '185/60 R15', frontPsi: 30, rearPsi: 30, frontPsiLoad: 33, rearPsiLoad: 35, sparePsi: 60, notes: null },
  { modelName: 'HB20',      yearFrom: 2012, yearTo: 2019, tireSize: '175/65 R14', frontPsi: 29, rearPsi: 29, frontPsiLoad: 32, rearPsiLoad: 33, sparePsi: 60, notes: null },
  { modelName: 'Creta',     yearFrom: 2017, yearTo: null, tireSize: '205/55 R17', frontPsi: 33, rearPsi: 33, frontPsiLoad: 35, rearPsiLoad: 36, sparePsi: 60, notes: 'Versões com aro 16: 215/60 R16 — mesma calibragem' },

  // Renault
  { modelName: 'Kwid',      yearFrom: 2017, yearTo: null, tireSize: '165/70 R14', frontPsi: 28, rearPsi: 28, frontPsiLoad: 31, rearPsiLoad: 33, sparePsi: 60, notes: 'Pneus pequenos — calibre semanalmente' },
  { modelName: 'Sandero',   yearFrom: 2015, yearTo: null, tireSize: '185/65 R15', frontPsi: 30, rearPsi: 29, frontPsiLoad: 33, rearPsiLoad: 35, sparePsi: 60, notes: null },
  { modelName: 'Logan',     yearFrom: 2015, yearTo: null, tireSize: '185/65 R15', frontPsi: 30, rearPsi: 29, frontPsiLoad: 33, rearPsiLoad: 35, sparePsi: 60, notes: null },
  { modelName: 'Duster',    yearFrom: 2015, yearTo: null, tireSize: '215/60 R16', frontPsi: 30, rearPsi: 33, frontPsiLoad: 33, rearPsiLoad: 38, sparePsi: 60, notes: 'Traseiro com mais pressão: distribui melhor o peso do SUV' },

  // Honda
  { modelName: 'Civic',     yearFrom: 2017, yearTo: null, tireSize: '215/50 R17', frontPsi: 35, rearPsi: 33, frontPsiLoad: 37, rearPsiLoad: 37, sparePsi: 60, notes: 'Maior pressão frontal: concentra peso do motor turbo' },
  { modelName: 'HR-V',      yearFrom: 2016, yearTo: null, tireSize: '215/55 R17', frontPsi: 33, rearPsi: 33, frontPsiLoad: 35, rearPsiLoad: 36, sparePsi: 60, notes: null },
  { modelName: 'Fit',       yearFrom: 2015, yearTo: null, tireSize: '185/60 R15', frontPsi: 30, rearPsi: 30, frontPsiLoad: 33, rearPsiLoad: 33, sparePsi: 60, notes: null },
  { modelName: 'City',      yearFrom: 2015, yearTo: null, tireSize: '185/65 R15', frontPsi: 32, rearPsi: 30, frontPsiLoad: 35, rearPsiLoad: 33, sparePsi: 60, notes: null },

  // Jeep
  { modelName: 'Renegade',  yearFrom: 2016, yearTo: null, tireSize: '215/60 R17', frontPsi: 33, rearPsi: 33, frontPsiLoad: 35, rearPsiLoad: 36, sparePsi: 60, notes: null },
  { modelName: 'Compass',   yearFrom: 2017, yearTo: null, tireSize: '225/60 R17', frontPsi: 33, rearPsi: 33, frontPsiLoad: 35, rearPsiLoad: 36, sparePsi: 60, notes: 'Versão S: 225/55 R18 — mesma calibragem' },

  // Nissan
  { modelName: 'Sentra',    yearFrom: 2013, yearTo: 2019, tireSize: '205/55 R16', frontPsi: 33, rearPsi: 30, frontPsiLoad: 33, rearPsiLoad: 44, sparePsi: 60, notes: 'B17 (1.6 e 2.0 Flex). Traseiro com carga alta: 44 PSI. Estepe step: máx 80 km/h.' },
  { modelName: 'Sentra',    yearFrom: 2020, yearTo: null, tireSize: '205/55 R17', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 36, sparePsi: 60, notes: 'B18 (2.0 Flex). Aro 17 na versão padrão. Com carga: 36 PSI em ambos os eixos.' },
  { modelName: 'Tiida',     yearFrom: 2007, yearTo: 2014, tireSize: '195/55 R16', frontPsi: 33, rearPsi: 30, frontPsiLoad: 33, rearPsiLoad: 33, sparePsi: 60, notes: 'Versão SL aro 16. Versão S aro 15 (185/65 R15): mesma calibragem 33/30.' },
  { modelName: 'Livina',    yearFrom: 2007, yearTo: 2016, tireSize: '185/65 R15', frontPsi: 33, rearPsi: 30, frontPsiLoad: 33, rearPsiLoad: 33, sparePsi: 60, notes: '7 lugares com carga total: traseiro 36 PSI. Verifique a plaqueta na porta do motorista.' },
  { modelName: 'March',     yearFrom: 2011, yearTo: null, tireSize: '175/65 R14', frontPsi: 32, rearPsi: 32, frontPsiLoad: 32, rearPsiLoad: 38, sparePsi: 60, notes: 'Motor 1.0 aro 14. Versão SR 1.6 aro 15 (175/60 R15): 32/32 normal, 32/45 com carga.' },
  { modelName: 'Kicks',     yearFrom: 2017, yearTo: null, tireSize: '205/60 R16', frontPsi: 32, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 35, sparePsi: 60, notes: 'Versão SV/SL aro 17 (205/55 R17): 32/32 normal, 35/35 com carga.' },
  { modelName: 'Frontier',  yearFrom: 2018, yearTo: null, tireSize: '255/70 R16', frontPsi: 33, rearPsi: 50, frontPsiLoad: 35, rearPsiLoad: 58, sparePsi: 60, notes: 'Traseiro varia com carga. Verifique a plaqueta' },
  { modelName: 'Versa',     yearFrom: 2012, yearTo: 2019, tireSize: '185/65 R15', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 36, sparePsi: 60, notes: 'N17 (2012–2019). Versão 1.6 aro 15.' },
  { modelName: 'Versa',     yearFrom: 2020, yearTo: null, tireSize: '195/55 R16', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 36, sparePsi: 60, notes: 'N18 (2020+). Aro 16 na versão Advance/Exclusive.' },

  // Citroën / Peugeot
  { modelName: 'C3',        yearFrom: 2017, yearTo: null, tireSize: '185/65 R15', frontPsi: 30, rearPsi: 30, frontPsiLoad: 33, rearPsiLoad: 35, sparePsi: 60, notes: null },
  { modelName: '208',       yearFrom: 2013, yearTo: 2020, tireSize: '195/55 R16', frontPsi: 32, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 35, sparePsi: 60, notes: 'Gen1 (1.5 e 1.6 THP Flex). Versão Feline/Allure aro 16. Estepe step 60 PSI, máx 80 km/h.' },
  { modelName: '208',       yearFrom: 2021, yearTo: null, tireSize: '195/55 R16', frontPsi: 33, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 35, sparePsi: 60, notes: 'Gen2 (PureTech 1.2). Versão Griffe aro 17 (215/45 R17): 35/33 PSI normal, 37/36 com carga.' },
  { modelName: '2008',      yearFrom: 2014, yearTo: 2019, tireSize: '215/55 R17', frontPsi: 33, rearPsi: 32, frontPsiLoad: 36, rearPsiLoad: 36, sparePsi: 60, notes: 'Gen1 (1.6 THP Flex). Verifique a plaqueta na porta — algumas versões usam 205/55 R17.' },
  { modelName: '2008',      yearFrom: 2021, yearTo: null, tireSize: '215/55 R17', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 36, sparePsi: 60, notes: 'Gen2 (PureTech 1.2). Versão Griffe: 225/50 R17 — mesma calibragem 33/33 normal.' },
  { modelName: '3008',      yearFrom: 2012, yearTo: 2019, tireSize: '215/60 R16', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 36, sparePsi: 60, notes: 'Gen1 (1.6 THP). Versões Griffe aro 17 (215/55 R17): mesma calibragem 33/33.' },
  { modelName: '307',       yearFrom: 2002, yearTo: 2012, tireSize: '195/60 R15', frontPsi: 30, rearPsi: 29, frontPsiLoad: 33, rearPsiLoad: 33, sparePsi: 60, notes: 'Versão Sedan e Hatch 1.6. Versão SW (perua): traseiro 31 PSI com carga parcial.' },
  { modelName: '408',       yearFrom: 2011, yearTo: 2018, tireSize: '205/55 R16', frontPsi: 33, rearPsi: 32, frontPsiLoad: 36, rearPsiLoad: 35, sparePsi: 60, notes: '1.6 THP e 2.0 16v. Verifique a plaqueta — versões 2.0 podem usar 215/55 R17.' },

  // Tesla
  { modelName: 'Model 3',   yearFrom: 2019, yearTo: null, tireSize: '235/45 R18', frontPsi: 42, rearPsi: 42, frontPsiLoad: 42, rearPsiLoad: 42, sparePsi: null, notes: 'Versões com aro 19 (Sport/Performance): 235/35 R19 — calibragem idêntica 42 PSI. Sem estepe — kit de reparação de pneu incluso.' },
  { modelName: 'Model Y',   yearFrom: 2022, yearTo: null, tireSize: '255/45 R19', frontPsi: 42, rearPsi: 42, frontPsiLoad: 45, rearPsiLoad: 45, sparePsi: null, notes: 'Mais pesado que o Model 3 — mantenha a pressão correta para eficiência e vida útil. Sem estepe.' },
  { modelName: 'Model S',   yearFrom: 2020, yearTo: null, tireSize: '245/45 R19', frontPsi: 45, rearPsi: 42, frontPsiLoad: 48, rearPsiLoad: 45, sparePsi: null, notes: 'Versões Plaid com aro 21: 265/35 R21 — consulte o manual. Frontal com maior pressão pelo peso do conjunto motor.' },

  // BYD
  { modelName: 'Dolphin',   yearFrom: 2023, yearTo: null, tireSize: '195/60 R16', frontPsi: 36, rearPsi: 33, frontPsiLoad: 38, rearPsiLoad: 36, sparePsi: null, notes: 'Tração dianteira — frontal com mais pressão. Sem estepe: kit de reparação incluso. Calibre frio semanalmente.' },
  { modelName: 'Seal',      yearFrom: 2023, yearTo: null, tireSize: '235/45 R18', frontPsi: 36, rearPsi: 36, frontPsiLoad: 40, rearPsiLoad: 40, sparePsi: null, notes: 'Versão AWD: mesma calibragem nos dois eixos. Versão RWD: traseiro 38 PSI. Sem estepe.' },
  { modelName: 'Atto 3',    yearFrom: 2023, yearTo: null, tireSize: '215/55 R18', frontPsi: 36, rearPsi: 33, frontPsiLoad: 38, rearPsiLoad: 36, sparePsi: null, notes: 'Também vendido como Yuan Plus. Tração dianteira — frontal ligeiramente maior. Sem estepe.' },
  { modelName: 'Song Plus', yearFrom: 2023, yearTo: null, tireSize: '235/50 R19', frontPsi: 36, rearPsi: 33, frontPsiLoad: 38, rearPsiLoad: 36, sparePsi: null, notes: 'Versão DM-i (PHEV) e EV têm mesma calibragem. Verifique a plaqueta na porta do motorista.' },

  // Motos Honda
  { modelName: 'CG 160',   yearFrom: 2015, yearTo: null, tireSize: '80/100-18 (diant) / 90/90-18 (tras)', frontPsi: 26, rearPsi: 29, frontPsiLoad: 26, rearPsiLoad: 33, sparePsi: null, notes: 'Com garupa ou carga: traseiro 33 PSI. Versão Cargo: traseiro 36 PSI com carga máxima.' },
  { modelName: 'CB 300R',   yearFrom: 2016, yearTo: null, tireSize: '110/70-17 (diant) / 150/60-17 (tras)', frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36, sparePsi: null, notes: 'Com garupa: traseiro 36 PSI. Sem estepe.' },
  { modelName: 'Twister',   yearFrom: 2016, yearTo: null, tireSize: '110/70-17 (diant) / 140/70-17 (tras)', frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36, sparePsi: null, notes: 'Com garupa: traseiro 36 PSI. Versões ABS e não-ABS: mesma calibragem.' },
  { modelName: 'Biz 125',   yearFrom: 2018, yearTo: null, tireSize: '80/90-17 (diant) / 80/90-17 (tras)', frontPsi: 26, rearPsi: 29, frontPsiLoad: 26, rearPsiLoad: 33, sparePsi: null, notes: 'Com garupa: traseiro 33 PSI. Calibre semanalmente — pneus de scooter perdem pressão mais rápido.' },
  { modelName: 'PCX 160',   yearFrom: 2021, yearTo: null, tireSize: '110/70-14 (diant) / 130/70-13 (tras)', frontPsi: 26, rearPsi: 29, frontPsiLoad: 29, rearPsiLoad: 33, sparePsi: null, notes: 'Com garupa: dianteiro 29 PSI, traseiro 33 PSI. Pneus 14/13 polegadas — calibração regular é essencial para estabilidade em curvas.' },
  { modelName: 'NXR 160',   yearFrom: 2014, yearTo: null, tireSize: '80/100-18 (diant) / 100/90-18 (tras)', frontPsi: 26, rearPsi: 29, frontPsiLoad: 26, rearPsiLoad: 33, sparePsi: null, notes: 'Off-road: reduzir para 22/26 PSI para melhor tração em terra. Retornar ao valor normal ao voltar ao asfalto.' },
  { modelName: 'XRE 300',   yearFrom: 2010, yearTo: null, tireSize: '110/80-19 (diant) / 140/70-17 (tras)', frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36, sparePsi: null, notes: 'Off-road: 22/26 PSI para tração em trilhas. Com garupa e bagagem: dianteiro 29, traseiro 36 PSI.' },
  { modelName: 'Pop 110i',  yearFrom: 2013, yearTo: null, tireSize: '80/90-14 (diant) / 80/90-14 (tras)', frontPsi: 25, rearPsi: 29, frontPsiLoad: 25, rearPsiLoad: 33, sparePsi: null, notes: 'Com garupa ou carga de entrega: traseiro 33 PSI. Pneus pequenos (14") perdem pressão rapidamente.' },
  // Motos Harley-Davidson
  { modelName: '883N',        yearFrom: 2014, yearTo: null, tireSize: '100/90-19 (diant) / 150/80 B16 (tras)', frontPsi: 36, rearPsi: 40, frontPsiLoad: 36, rearPsiLoad: 42, sparePsi: null, notes: 'Com garupa: traseiro 42 PSI. Calibre sempre com pneu frio. Pneu 19" dianteiro perde pressão mais lentamente — verifique semanalmente.' },
  { modelName: '1200NS',      yearFrom: 2018, yearTo: null, tireSize: '100/90-19 (diant) / 150/80 B16 (tras)', frontPsi: 36, rearPsi: 40, frontPsiLoad: 36, rearPsiLoad: 42, sparePsi: null, notes: 'Mesma especificação do Iron 883. Com garupa: traseiro 42 PSI.' },
  { modelName: 'Forty Eight', yearFrom: 2010, yearTo: null, tireSize: '130/90 B16 (diant) / 150/80 B16 (tras)', frontPsi: 36, rearPsi: 40, frontPsiLoad: 36, rearPsiLoad: 42, sparePsi: null, notes: 'Com garupa: traseiro 42 PSI. Pneu dianteiro largo 130/90 B16 — variação de pressão afeta muito a dirigibilidade. Mantenha os 36 PSI exatos.' },
  { modelName: 'Fat Boy',     yearFrom: 2018, yearTo: null, tireSize: '160/60 B18 (diant) / 240/40 R18 (tras)', frontPsi: 36, rearPsi: 36, frontPsiLoad: 36, rearPsiLoad: 42, sparePsi: null, notes: 'Pneu traseiro 240mm muito largo — pressão abaixo do mínimo causa desgaste rápido e instabilidade. Com garupa: traseiro 42 PSI.' },
  { modelName: 'Road King',   yearFrom: 2017, yearTo: null, tireSize: '130/80 B17 (diant) / 180/65 B16 (tras)', frontPsi: 36, rearPsi: 36, frontPsiLoad: 38, rearPsiLoad: 42, sparePsi: null, notes: 'Com garupa e bagagem total: traseiro 42 PSI. Verifique a plaqueta de especificação na moto para confirmação do modelo/ano.' },
  { modelName: 'Low Rider S', yearFrom: 2019, yearTo: null, tireSize: '130/90 B16 (diant) / 180/70 B16 (tras)', frontPsi: 36, rearPsi: 38, frontPsiLoad: 36, rearPsiLoad: 42, sparePsi: null, notes: 'Com garupa: traseiro 42 PSI. Pinças Brembo: verifique o fluido de freio com mais frequência pela maior potência de frenagem.' },
  { modelName: 'Sportster S', yearFrom: 2021, yearTo: null, tireSize: '120/70 ZR17 (diant) / 180/70 ZR17 (tras)', frontPsi: 36, rearPsi: 40, frontPsiLoad: 38, rearPsiLoad: 42, sparePsi: null, notes: 'Com garupa: dianteiro 38 PSI, traseiro 42 PSI. Pneus radiais ZR de alto desempenho — verificação semanal recomendada.' },
  { modelName: 'Pan America', yearFrom: 2021, yearTo: null, tireSize: '120/70 R19 (diant) / 170/60 R17 (tras)', frontPsi: 33, rearPsi: 36, frontPsiLoad: 36, rearPsiLoad: 40, sparePsi: null, notes: 'Com garupa e bagagem: 36/40 PSI. Off-road: reduzir para 22/26 PSI para melhor tração em terra. Retornar imediatamente aos valores de asfalto ao pavimentar.' },
  // Motos Yamaha
  { modelName: 'Fazer 250', yearFrom: 2010, yearTo: null, tireSize: '110/70-17 (diant) / 140/70-17 (tras)', frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36, sparePsi: null, notes: 'Com garupa: traseiro 36 PSI' },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Iniciando seed completo...')

  // Clear existing data
  await prisma.tip.deleteMany()
  await prisma.tirePressure.deleteMany()
  await prisma.vehicleModel.deleteMany()
  await prisma.brand.deleteMany()
  await prisma.vehicleType.deleteMany()

  const categories: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']

  // Default tips (no model)
  for (const cat of categories) {
    for (let i = 0; i < defaultTips[cat].length; i++) {
      const t = defaultTips[cat][i]
      await prisma.tip.create({
        data: { category: cat, severity: t.severity, title: t.title, body: t.body, order: i },
      })
    }
  }
  console.log('✅ Dicas genéricas inseridas')

  // Vehicle catalog + model-specific tips
  for (const [typeSlug, brands] of Object.entries(vehicleData)) {
    const vehicleType = await prisma.vehicleType.create({
      data: { slug: typeSlug, label: typeSlug === 'carro' ? 'Carro' : 'Moto' },
    })

    for (const [brandName, models] of Object.entries(brands)) {
      const brand = await prisma.brand.create({
        data: { name: brandName, vehicleTypeId: vehicleType.id },
      })

      for (const modelName of models) {
        await prisma.vehicleModel.create({
          data: { name: modelName, brandId: brand.id },
        })

        const specific = modelTips[modelName]
        if (specific) {
          for (const cat of categories) {
            const tips = specific[cat] ?? []
            for (let i = 0; i < tips.length; i++) {
              const t = tips[i]
              await prisma.tip.create({
                data: {
                  modelName,
                  category: cat,
                  severity:  t.severity,
                  title:     t.title,
                  body:      t.body,
                  yearFrom:  t.yearFrom ?? null,
                  yearTo:    t.yearTo   ?? null,
                  order:     i,
                },
              })
            }
          }
        }
      }
    }
  }
  console.log('✅ Catálogo de veículos e dicas inseridos')

  // Tire pressures
  for (const tp of tirePressures) {
    await prisma.tirePressure.create({ data: tp })
  }
  console.log('✅ Calibragem de pneus inserida')

  const tipCount  = await prisma.tip.count()
  const tpCount   = await prisma.tirePressure.count()
  const modelCount = await prisma.vehicleModel.count()
  console.log(`\n📊 Resumo: ${tipCount} dicas | ${tpCount} calibragens | ${modelCount} modelos`)
  console.log('✅ Seed concluído com sucesso!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
