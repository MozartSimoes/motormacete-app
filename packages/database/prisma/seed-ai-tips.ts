/**
 * Seed de macetes gerados para modelos não cobertos no data.ts estático.
 * modelYear = "0" = genérico (vale para todos os anos do modelo).
 * Execute: pnpm tsx prisma/seed-ai-tips.ts
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
interface Tip { severity: Sev; title: string; body: string }
type CatTips = { MACETES: Tip[]; PROBLEMAS: Tip[]; MANUTENCAO: Tip[] }

const models: Record<string, CatTips> = {

  // ── VOLKSWAGEN ──────────────────────────────────────────────────────────────

  'T-Cross': {
    MACETES: [
      { severity: 'OK',   title: 'Óleo 0W-20 obrigatório no TSI',      body: 'O motor 1.0 TSI 3 cilindros exige óleo sintético 0W-20. Usar viscosidade maior prejudica o turbo e o VVT — não improvise.' },
      { severity: 'WARN', title: 'DSG7: arranque progressivo',          body: 'O câmbio de dupla embreagem DSG7 não tolera arranques bruscos. Aceleração suave prolonga a vida útil das embreagens, especialmente nos primeiros 10.000 km.' },
      { severity: 'OK',   title: 'Calibragem: 33 PSI dianteiro e traseiro', body: 'A pressão recomendada é 33 PSI em todos os pneus para conforto e consumo equilibrados. Verifique mensalmente com o pneu frio.' },
      { severity: 'OK',   title: 'Sensor de estacionamento: limpeza',   body: 'Os sensores do Park Assist perdem precisão com barro e poeira. Limpe o para-choque com pano úmido antes de usar em manobras.' },
      { severity: 'WARN', title: 'Fluido DSG: troca obrigatória',       body: 'O fluido do câmbio DSG7 deve ser trocado a cada 60.000 km. A VW não informa isso como "vitalício" no Brasil — a negligência quebra o câmbio.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN',   title: 'DSG7 — soluço em baixa velocidade', body: 'Solavanco ao engatar 1ª em manobras lentas é relatado frequentemente. Atualização de software na concessionária costuma resolver — exija o service action.' },
      { severity: 'WARN',   title: 'Rolamento traseiro precoce',        body: 'Rolamentos da roda traseira com desgaste antes de 60.000 km, especialmente em vias com buracos. Sintoma: ronco que cresce com a velocidade.' },
      { severity: 'OK',     title: 'Sensor de chuva instável no calor', body: 'O sensor de chuva pode acionar o limpador em dias secos e quentes. Problema de calibração — regulável via menu do painel.' },
      { severity: 'WARN',   title: 'Trava elétrica do porta-malas',     body: 'Falha na trava do porta-malas é relatada no T-Cross 2019–2021. O atuador elétrico trava sem abrir. Troca simples de R$ 150–200.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',     title: 'Óleo 0W-20 sintético — 10.000 km', body: 'Troca obrigatória a cada 10.000 km ou 12 meses. Use sempre 0W-20 — o turbo de 3 cilindros depende criticamente da viscosidade correta.' },
      { severity: 'WARN',   title: 'Fluido DSG7 — 60.000 km',          body: 'Troca do fluido específico DSG (G 052 182). Use apenas fluido original VW — outros causam deslize e solavanco.' },
      { severity: 'OK',     title: 'Filtro de ar — 15.000 km',         body: 'Troca a cada 15.000 km. O turbo TSI é sensível à qualidade do ar — filtro sujo aumenta o consumo e reduz potência.' },
      { severity: 'OK',     title: 'Velas iridium — 30.000 km',        body: 'Troca a cada 30.000 km. Use NGK Iridium LFR5AIX — a combustão incompleta no motor de 3 cilindros é visível em qualquer degradação de vela.' },
    ],
  },

  Fox: {
    MACETES: [
      { severity: 'OK',   title: 'Motor AP — aceita óleo 15W-40 mineral', body: 'O motor 1.0 e 1.6 do Fox aceitam 15W-40 mineral em climas quentes. Semissintético 10W-40 é o ideal para uso misto.' },
      { severity: 'OK',   title: 'Carburador Solex: etanol degradado',    body: 'No Fox carburado (pré-2009), o etanol velho entope o giclê principal. Limpe o carburador anualmente com ultrassom para evitar falha na partida a frio.' },
      { severity: 'WARN', title: 'Freio de mão apertado no verão',        body: 'O cabo do freio de mão se dilata no calor e trava o tambor traseiro. Nunca puxe com força máxima — ajuste a cada 30.000 km.' },
      { severity: 'OK',   title: 'Amortecedores: Monroe ou Cofap',        body: 'Os amortecedores originais do Fox têm vida útil curta. Troca por Monroe Reflex ou Cofap a cada 80.000 km melhora muito a estabilidade.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Junta do cabeçote — superaquecimento', body: 'O motor 1.0 EA111 do Fox G1 (2004–2009) tem junta do cabeçote fraca. Superaquecimento por qualquer razão = junta queimada. Monitore a temperatura sempre.' },
      { severity: 'WARN',   title: 'Rolamento de roda dianteiro',          body: 'Alta taxa de falha antes dos 60.000 km. Ronco que cresce com a velocidade e aumenta nas curvas é sintoma claro — troque logo.' },
      { severity: 'WARN',   title: 'Bico injetor entupido (1.6 flex)',     body: 'O motor 1.6 flex tem bicos injetores sensíveis à qualidade do combustível. Limpeza a cada 40.000 km previne falhas de combustão.' },
      { severity: 'OK',     title: 'Trava da tampa do combustível',        body: 'A trava da tampa do tanque falha frequentemente no Fox 2009–2014. Adesivo epóxi no suporte resolve definitivamente.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 10W-40 semissintético — 10.000 km', body: 'Troca a cada 10.000 km. O motor EA111 aceita mineral mas o semissintético protege melhor em verão quente.' },
      { severity: 'WARN', title: 'Correia dentada — 60.000 km obrigatório', body: 'Motor interferente: ruptura da correia = pistões batendo nas válvulas = motor destruído. Nunca adie além do prazo.' },
      { severity: 'OK',   title: 'Filtro de combustível — 30.000 km',       body: 'Com etanol brasileiro, troque a cada 20.000 km se abastecer majoritariamente com álcool. Filtro sujo = partida difícil.' },
      { severity: 'OK',   title: 'Fluido de freio DOT 4 — 2 anos',         body: 'Troca a cada 2 anos. O Fox tem freio a disco na frente e tambor atrás — fluido velho compromete o ponto de ebulição.' },
    ],
  },

  // ── CHEVROLET ───────────────────────────────────────────────────────────────

  'Onix Plus': {
    MACETES: [
      { severity: 'OK',   title: 'Turbo 1.0 Ecotec: óleo 5W-30 sintético', body: 'O turbo exige sintético 5W-30 API SP. Troca a cada 10.000 km sem negociação — o turbo é o componente mais sensível desse motor.' },
      { severity: 'WARN', title: 'CVT: aceleração gradual sempre',          body: 'O câmbio CVT responde melhor com aceleração progressiva. Arranques bruscos do semáforo desgastam as correias de forma acelerada.' },
      { severity: 'OK',   title: 'Dreno completo do óleo no turbo',         body: 'Ao trocar o óleo, aguarde pelo menos 10 minutos para drenar completamente. O turbo retém mais resíduo que motores aspirados.' },
      { severity: 'OK',   title: 'Resfriamento antes de desligar',          body: 'Após trechos de rodovia, deixe o motor em marcha lenta por 1 minuto antes de desligar. O turbo precisa resfriar com circulação de óleo.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Vela de ignição com falha prematura', body: 'Problema crônico: velas que falham antes dos 20.000 km no motor 1.0 turbo, causando tranco, consumo elevado e luz de injeção. Troca preventiva com NGK.' },
      { severity: 'WARN',   title: 'Calço do motor — vibração no painel', body: 'Os calços do motor se desgastam em uso urbano intenso, gerando vibração perceptível no volante e no painel. Troca simples e barata.' },
      { severity: 'WARN',   title: 'Sensor MAP — marcha lenta errática',  body: 'Falha no sensor de pressão do coletor entre 60–80.000 km. Causa marcha lenta instável e falhas de combustão. Peça acessível (~R$ 180).' },
      { severity: 'OK',     title: 'Câmbio CVT: fluido degradado',        body: 'O CVT mal regulado faz o motor "gritar" em acelerações. Troca do fluido a cada 60.000 km resolve na maioria dos casos.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 5W-30 sintético — 10.000 km',     body: 'Obrigatório. O turbo do Onix Plus não tolera óleo de qualidade inferior. Use sempre API SP ou superior.' },
      { severity: 'WARN', title: 'Fluido CVT — 60.000 km',               body: 'Troque o fluido CVT específico a cada 60.000 km. Fluido degradado provoca escorregamento e solavanco — câmbio quebrado é caro.' },
      { severity: 'OK',   title: 'Filtro de ar — 15.000 km',             body: 'O turbo amplifica o efeito de um filtro sujo. Troque a cada 15.000 km para manter potência e consumo.' },
      { severity: 'OK',   title: 'Velas NGK — 30.000 km',                body: 'Troca a cada 30.000 km. Use NGK ILZKR7B11 (iridium) para reduzir a incidência de falhas prematuras no motor turbo.' },
    ],
  },

  // ── TOYOTA ──────────────────────────────────────────────────────────────────

  'Corolla Cross': {
    MACETES: [
      { severity: 'OK',   title: 'Sistema híbrido: pré-condicionamento',    body: 'Ligue o ar condicionado ainda conectado na tomada (se híbrido plug-in) para pre-condicionar a cabine sem gastar bateria de tração.' },
      { severity: 'OK',   title: 'Óleo 0W-16 no híbrido — exclusivo',       body: 'O motor 2ZR-FXE do híbrido exige 0W-16 sintético. Qualquer outro óleo compromete o sistema VVT-i e a eficiência híbrida.' },
      { severity: 'WARN', title: 'Regeneração de freios: pedal suave',      body: 'O freio regenerativo é mais eficiente com pressão gradual. Frenagem brusca aciona as pastilhas mecânicas e perde energia de regeneração.' },
      { severity: 'OK',   title: 'Modo EV em manobras e estacionamento',    body: 'Use o modo EV em baixa velocidade para preservar o motor a combustão e reduzir desgaste nas situações de mais arranque.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN',   title: 'Ruído no sistema de frenagem híbrida', body: 'Rangido ao frear em baixa velocidade é característico do sistema Brake-by-Wire. Em geral é normal, mas persistência intensa exige inspeção das pastilhas traseiras.' },
      { severity: 'OK',     title: 'Câmera de ré: embaçamento',            body: 'A câmera de ré embaça com variações de temperatura. Problema de vedação — coberto pela garantia. Reporte na concessionária.' },
      { severity: 'WARN',   title: 'Consumo elevado em uso 100% urbano',   body: 'O sistema híbrido do Corolla Cross não é plug-in — a eficiência cai se o motor a combustão raramente esquenta completamente. Inclua percursos de 20+ km semanalmente.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 0W-16 sintético — 10.000 km',        body: 'Troca obrigatória com 0W-16. O motor híbrido é mais leve e precisa de viscosidade baixa para eficiência máxima.' },
      { severity: 'OK',   title: 'Pastilhas de freio — vida longa no híbrido', body: 'A regeneração de energia substitui boa parte da frenagem mecânica. Inspecione a cada 40.000 km — duram mais que no convencional.' },
      { severity: 'WARN', title: 'Bateria de 12V — troca a cada 4 anos',   body: 'O Corolla Cross híbrido tem uma bateria auxiliar de 12V separada da bateria de tração. Falha nela deixa o carro sem saída. Troque preventivamente.' },
      { severity: 'OK',   title: 'Filtro de cabine — 15.000 km',           body: 'Troca a cada 15.000 km. Com o modo de circulação de ar interno do híbrido, o filtro satura mais rápido em cidades com poluição.' },
    ],
  },

  // ── HONDA ───────────────────────────────────────────────────────────────────

  'HR-V': {
    MACETES: [
      { severity: 'OK',   title: 'Motor 1.5 VTEC: óleo 0W-20 obrigatório', body: 'O motor 1.5 VTEC Turbo (HR-V 2022+) exige 0W-20 sintético. O VTEC é calibrado para esta viscosidade — óleo mais grosso trava o mecanismo.' },
      { severity: 'WARN', title: 'CVT: evite rebocar acima de 450 kg',      body: 'O CVT do HR-V suporta até 450 kg de reboque. Acima disso o câmbio superaquece. Ative o modo S para reboque leve e monitore a temperatura.' },
      { severity: 'OK',   title: 'Magic Seat: trave o batente da dobradiça', body: 'Ao rebater o banco traseiro, confirme o encaixe do batente antes de colocar carga. Banco mal travado desliza em frenagem brusca.' },
      { severity: 'OK',   title: 'Freio de estacionamento eletrônico',      body: 'O EPB (freio eletrônico) do HR-V 2022+ solta automaticamente ao acelerar. Não force o carro antes de ouvir o clique de liberação.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN',   title: 'CVT — escorregamento em subidas',    body: 'O CVT do HR-V primeira geração (2015–2021) pode apresentar escorregamento em subidas íngremes com carga. Troca de fluido a cada 40.000 km minimiza.' },
      { severity: 'OK',     title: 'Compressor do AC — barulho no frio', body: 'O compressor do ar condicionado faz barulho ao ligar em dias frios. Característico do ciclo de partida a frio — não é defeito.' },
      { severity: 'WARN',   title: 'Bateria de 12V com vida curta',      body: 'A bateria original do HR-V dura em média 3 anos em climas quentes. Substitua preventivamente com 36 meses independente dos sintomas.' },
      { severity: 'DANGER', title: 'Airbag Takata — recall ativo',       body: 'Verifique o VIN no site da Honda: HR-V 2015–2019 pode estar no recall do airbag Takata. Detonador defeituoso pode lançar fragmentos. Prioridade máxima.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 0W-20 sintético — 10.000 km',   body: 'Troca a cada 10.000 km. Use exclusivamente 0W-20 — o VTEC depende de acionamento hidráulico que é sensível à viscosidade.' },
      { severity: 'WARN', title: 'Fluido CVT Honda — 40.000 km',        body: 'Use apenas fluido HMMF original Honda. Fluido genérico causa vibração e solavanco no CVT — câmbio danificado não tem conserto barato.' },
      { severity: 'OK',   title: 'Filtro de ar — 15.000 km',            body: 'Troca a cada 15.000 km. O turbo VTEC é mais sensível que o aspirado — filtro sujo reduz potência e aumenta consumo.' },
      { severity: 'OK',   title: 'Correia do acessório — 100.000 km',   body: 'A correia do alternador e compressor deve ser inspecionada a cada 60.000 km e trocada aos 100.000 km para evitar quebra surpresa.' },
    ],
  },

  'WR-V': {
    MACETES: [
      { severity: 'OK',   title: 'Motor 1.5 SOHC: simples e confiável', body: 'O motor 1.5 aspirado do WR-V é robusto e menos exigente que o turbo. Óleo 5W-30 semissintético a cada 10.000 km é suficiente.' },
      { severity: 'OK',   title: 'CVT: partida em D, não em N',          body: 'Sempre selecione D antes de soltar o freio — o CVT do WR-V se ativa corretamente em D. Partir com o câmbio em N e soltar causa solavanco.' },
      { severity: 'WARN', title: 'Filtro de ar da cabine: alta prioridade', body: 'O sistema de ventilação do WR-V recircula muito ar interno. Com filtro de cabine sujo, o cheiro de bolor é intenso. Troque a cada 15.000 km.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Suspensão traseira — barulho em lombadas', body: 'Estalo na suspensão traseira ao passar em lombadas é relatado frequentemente. Bucha do braço traseiro se desgasta antes dos 40.000 km em uso urbano.' },
      { severity: 'OK',   title: 'Trava da janela traseira — travamento',   body: 'A trava manual da janela traseira pode emperrar com calor e umidade. Aplique grafite em spray no mecanismo a cada revisão.' },
      { severity: 'WARN', title: 'Fluido CVT degradado — escorregamento',   body: 'O CVT apresenta escorregamento após 60.000 km sem troca de fluido. A Honda não informa a troca como obrigatória, mas é essencial no Brasil.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 5W-30 semissintético — 10.000 km', body: 'O motor 1.5 aspirado aceita semissintético. Troca a cada 10.000 km ou 12 meses.' },
      { severity: 'WARN', title: 'Fluido CVT Honda HMMF — 60.000 km',      body: 'Troca obrigatória. Use apenas HMMF original — o CVT do WR-V é idêntico ao do Fit e tem a mesma sensibilidade a fluidos genéricos.' },
      { severity: 'OK',   title: 'Velas NGK — 30.000 km',                  body: 'Troca a cada 30.000 km. O motor 1.5 SOHC usa velas convencionais NGK BKR5EIX — baratas e fáceis de achar.' },
    ],
  },

  // ── RENAULT ─────────────────────────────────────────────────────────────────

  Kardian: {
    MACETES: [
      { severity: 'OK',   title: 'Motor 1.0 turbo TCe: aquecimento antes de exigir', body: 'O TCe 90 de 3 cilindros precisa de pelo menos 2 minutos de aquecimento antes de fazer rodovia. O turbo é sensível a partidas bruscas.' },
      { severity: 'WARN', title: 'CVT X-Tronic: aceleração suave',                   body: 'Assim como outros CVT, o X-Tronic do Kardian não tolera arranques bruscos frequentes. Aceleração progressiva preserva as correias.' },
      { severity: 'OK',   title: 'Pneus 195/60R16 — calibragem 33 PSI',              body: 'A pressão de fábrica é 33 PSI em todos os pneus. Com duas ou mais pessoas a bordo, suba para 35 PSI no eixo traseiro.' },
      { severity: 'OK',   title: 'Câmera 360° — limpeza dos sensores',               body: 'Nas versões com câmera 360°, limpe as câmeras laterais embutidas nos retrovisores com flanela seca a cada lavagem.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'CVT — aquecimento em trânsito lento',   body: 'Em congestionamentos longos, o CVT X-Tronic pode aquecer e reduzir desempenho. Ative o modo manual com as borboletas para controlar melhor.' },
      { severity: 'OK',   title: 'Sistema multimídia — travamento',        body: 'O sistema Easy Link pode travar ocasionalmente. Reinicialização via botão de liga/desliga por 10 segundos resolve sem perda de dados.' },
      { severity: 'WARN', title: 'Motor 3 cilindros — vibração em marcha', body: 'O TCe 90 tem vibração mais perceptível em marcha lenta que motores de 4 cilindros — é característica de projeto, não defeito. Calços de motor bem regulados minimizam.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 5W-30 sintético — 10.000 km', body: 'O motor turbo de 3 cilindros exige sintético 5W-30. Intervalo de 10.000 km ou 12 meses — não estenda.' },
      { severity: 'WARN', title: 'Fluido CVT X-Tronic — 60.000 km',  body: 'Troque o fluido CVT específico Renault. Fluido genérico pode causar escorregamento e solavanco irreversíveis.' },
      { severity: 'OK',   title: 'Filtro de ar — 15.000 km',          body: 'O turbo TCe é sensível. Troca obrigatória a cada 15.000 km para manter pressão de boost correta.' },
      { severity: 'OK',   title: 'Velas iridium — 30.000 km',         body: 'Use velas NGK iridium específicas para o TCe 90. O motor de 3 cilindros é mais sensível a velas gastas que os 4 cilindros aspirados.' },
    ],
  },

  // ── JEEP ────────────────────────────────────────────────────────────────────

  Renegade: {
    MACETES: [
      { severity: 'OK',   title: 'Motor 1.3 turbo: óleo 0W-30 sintético',  body: 'O motor Global Small Engine (GSE) 1.3 T270 exige 0W-30 sintético Mopar ou equivalente API SP. Troca a cada 10.000 km.' },
      { severity: 'WARN', title: 'Câmbio DDCT: clutch wear em uso urbano', body: 'O câmbio de dupla embreagem DDCT (6 velocidades) desgasta as embreagens em trânsito intenso. Aceleração progressiva em baixa velocidade é essencial.' },
      { severity: 'OK',   title: 'Modo 4x4: Low Range para off-road real',  body: 'O Renegade Trailhawk tem Low Range. Use apenas em off-road real — em asfalto normal, mantenha em 4x2 ou 4x4 Auto para preservar o sistema.' },
      { severity: 'WARN', title: 'Vazamento pelo teto solar — vedação',     body: 'O teto solar do Renegade tem vedação suscetível a entupimento. Limpe os drenos com ar comprimido a cada 6 meses para evitar goteiras.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'DDCT — solavanco e falha de engate',  body: 'O câmbio DDCT é o maior problema crônico do Renegade. Solavanco em 1ª marcha, dificuldade de engate e travamento. Jeep cobriu vários casos via garantia estendida — exija.' },
      { severity: 'WARN',   title: 'Sensor de chuva — falsos acionamentos', body: 'O sensor de chuva aciona o limpador em dias secos com variação de temperatura. Problema de calibração — ajustável pelo menu.' },
      { severity: 'WARN',   title: 'Teto solar — vazamento',               body: 'Drenos entupidos causam infiltração d\'água na cabine. Sintoma: cheiro de mofo e manchas no forro. Manutenção preventiva semestral dos drenos evita.' },
      { severity: 'OK',     title: 'Sistema start-stop: bateria sobrecarregada', body: 'O sistema start-stop exige bateria AGM. Substituir por bateria convencional danifica o alternador e o sistema de carga. Use sempre AGM.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 0W-30 sintético Mopar — 10.000 km', body: 'Obrigatório. O GSE 1.3 turbo foi projetado para 0W-30 — viscosidade diferente invalida a garantia e danifica o turbo.' },
      { severity: 'WARN', title: 'Fluido DDCT — 60.000 km',                body: 'Troca do fluido de embreagem DDCT com fluido Mopar original. Negligenciar é a principal causa de falha prematura do câmbio.' },
      { severity: 'OK',   title: 'Filtro de ar — 15.000 km',               body: 'O turbo 1.3 eleva a exigência sobre o filtro de ar. Troca obrigatória a cada 15.000 km.' },
      { severity: 'WARN', title: 'Pastilhas de freio dianteiras — 30.000 km', body: 'O Renegade tem pastilhas com desgaste acelerado em uso urbano. Inspecione a espessura a cada 20.000 km para evitar dano ao disco.' },
    ],
  },

  Compass: {
    MACETES: [
      { severity: 'OK',   title: 'Motor 2.0 flex: óleo 5W-30 sintético',   body: 'O motor 2.0 flex exige 5W-30 sintético Mopar ou equivalente. Troca a cada 10.000 km. Nunca use mineral nesse motor.' },
      { severity: 'WARN', title: 'AT9: aprenda a usar o kickdown',          body: 'O câmbio automático de 9 velocidades AT9 retrasa a resposta em retomadas. Use o kickdown (pedal fundo) para forçar troca antecipada.' },
      { severity: 'OK',   title: '4x4 True: ative apenas fora do asfalto',  body: 'O sistema 4x4 True (Trailhawk) não é para uso permanente em asfalto. Em estrada, use 4x2 ou 4WD Auto para economizar combustível.' },
      { severity: 'OK',   title: 'UConnect: atualização via USB',           body: 'Mantenha o software UConnect atualizado via USB (disponível no site Jeep Brasil). Versões antigas travam e perdem configurações.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'AT9 — solavanco e falha de 1ª para 2ª', body: 'O câmbio AT9 do Compass 2017–2021 tem problema crônico de solavanco entre 1ª e 2ª marcha. Jeep emitiu atualizações de software — exija todas as service actions na revisão.' },
      { severity: 'WARN',   title: 'Motor 2.0 — consumo de óleo elevado',  body: 'Consumo acima de 1L a cada 5.000 km reportado em motores com mais de 60.000 km. Causa provável: retentores e vedações. Monitore mensalmente.' },
      { severity: 'WARN',   title: 'Teto solar — drenos entupidos',         body: 'O teto solar panorâmico tem drenos que entopem com folhas e sujeira. Limpe os quatro cantos com ar comprimido a cada 6 meses.' },
      { severity: 'OK',     title: 'Sensor de estacionamento traseiro',     body: 'Sensores traseiros com falso alarme em climas frios são relatados. Limpeza com pano seco nos sensores resolve na maioria dos casos.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 5W-30 sintético Mopar — 10.000 km', body: 'Troca a cada 10.000 km. Mopar 5W-30 Synthetic é o especificado — equivalente API SP pode ser usado se certificado.' },
      { severity: 'WARN', title: 'Fluido AT9 — 60.000 km',                 body: 'O câmbio AT9 tem histórico de falhas. Troca preventiva do fluido ATF+4 a cada 60.000 km reduz significativamente o risco.' },
      { severity: 'OK',   title: 'Filtro de ar — 15.000 km',               body: 'Troca a cada 15.000 km. O motor flex 2.0 é menos crítico que turbos, mas filtro sujo aumenta consumo em até 8%.' },
      { severity: 'OK',   title: 'Fluido de freio DOT 4 — 2 anos',         body: 'Troca a cada 2 anos. O sistema de freio com discos em todos os eixos exige fluido em boas condições para frenagem de emergência eficiente.' },
    ],
  },

  Commander: {
    MACETES: [
      { severity: 'OK',   title: 'Motor 1.3 turbo: aquecimento obrigatório', body: 'O GSE 1.3 T270 de 3 cilindros precisa de 1 minuto de aquecimento antes de engatar a marcha. O turbo e os mancais agradecem.' },
      { severity: 'WARN', title: 'AT6: kickdown para ultrapassagens',        body: 'O câmbio automático de 6 velocidades responde bem ao kickdown (pedal fundo). Em ultrapassagens em rodovia, não hesite em usar.' },
      { severity: 'OK',   title: 'Terceira fileira: capacidade de 80 kg',    body: 'Cada banco da terceira fileira suporta 80 kg. Não ultrapasse o peso total indicado no manual — o eixo traseiro sofre com sobrecarga.' },
      { severity: 'OK',   title: 'Câmera 360°: painel de configurações',    body: 'Acesse o menu do UConnect para calibrar a câmera 360° após troca de pneus ou batida leve no para-choque.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN',   title: 'Motor 3 cilindros — vibração em marcha lenta', body: 'O motor 1.3 de 3 cilindros vibra mais que o 4 cilindros em marcha lenta. Com o tempo os calços do motor se desgastam e amplificam a vibração.' },
      { severity: 'WARN',   title: 'AT6 — solavanco em 1ª marcha',                body: 'Solavanco ao engatar 1ª em manobras lentas é relatado em vários Commanders 2022. Atualização de software na concessionária costuma resolver.' },
      { severity: 'OK',     title: 'Sistema start-stop: bateria AGM obrigatória',  body: 'A bateria original é AGM. Se substituir por convencional, o sistema start-stop sobrecarrega o alternador e a bateria convencional dura menos de 1 ano.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 0W-30 sintético — 10.000 km', body: 'O GSE 1.3 T270 exige 0W-30. Troca obrigatória a cada 10.000 km — o turbo é crítico para a lubrificação.' },
      { severity: 'WARN', title: 'Fluido AT6 — 60.000 km',           body: 'Troca preventiva do fluido ATF+4 a cada 60.000 km. Câmbio automático com fluido degradado tem vida útil reduzida pela metade.' },
      { severity: 'OK',   title: 'Filtro de ar — 15.000 km',          body: 'O turbo 1.3 exige filtro em bom estado. Troca obrigatória a cada 15.000 km — nunca estenda com esse motor.' },
      { severity: 'OK',   title: 'Pastilhas traseiras — 40.000 km',   body: 'O Commander tem eixo traseiro pesado. Inspecione pastilhas traseiras a cada 40.000 km — desgastam mais rápido que em carros menores.' },
    ],
  },

  // ── PEUGEOT ─────────────────────────────────────────────────────────────────

  '208': {
    MACETES: [
      { severity: 'OK',   title: 'Motor 1.2 PureTech: óleo 0W-20 obrigatório', body: 'O motor 3 cilindros PureTech 82/110 exige 0W-20 sintético. Use apenas óleo com aprovação PSA B71 2312 — qualquer outro compromete as válvulas VVT.' },
      { severity: 'WARN', title: 'Correia do PureTech: substituição crítica',   body: 'O motor 1.2 PureTech usa correia no lugar de corrente — com risco de ruptura documentado. Troca obrigatória a cada 100.000 km ou 7 anos.' },
      { severity: 'OK',   title: 'Volante pequeno: ajuste de coluna',          body: 'O volante compacto do 208 exige ajuste correto da coluna para evitar fadiga nos ombros em trajetos longos. Ajuste a cada mudança de motorista.' },
      { severity: 'OK',   title: 'Modo Sport: resposta imediata da direção',   body: 'O modo Sport torna a direção mais pesada e precisa. Use em curvas e ultrapassagens — em cidade economize o modo Normal.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Correia PureTech — ruptura documentada',    body: 'O motor 1.2 PureTech de 82 e 110 cv teve recall em vários países por ruptura da correia dentada antes do prazo. No Brasil, verifique o VIN na Peugeot. Prioridade máxima.' },
      { severity: 'WARN',   title: 'Consumo de óleo no PureTech',               body: 'Consumo de óleo acima de 0,5L por 1.000 km é relatado no PureTech 110 turbo após 40.000 km. Cheque o nível quinzenalmente.' },
      { severity: 'WARN',   title: 'Trava da Tampa do tanque — emperramento',   body: 'A tampa de combustível pode emperrar em climas muito quentes. Pressione suavemente antes de puxar — forçar danifica o cabo do mecanismo.' },
      { severity: 'OK',     title: 'Sensores de estacionamento — falso alarme', body: 'Sensores traseiros com alarme em superfícies molhadas é relatado. Problema de calibração de sensibilidade — ajustável pelo menu iCockpit.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',     title: 'Óleo 0W-20 PSA B71 2312 — 10.000 km', body: 'Obrigatório. O PureTech tem tolerâncias mínimas — óleo sem aprovação PSA pode causar desgaste prematuro nas válvulas variáveis.' },
      { severity: 'DANGER', title: 'Correia dentada — 100.000 km ou 7 anos', body: 'Ruptura do PureTech = motor destruído. Troca obrigatória dentro do prazo. Mais barato que um motor novo.' },
      { severity: 'OK',     title: 'Filtro de ar — 15.000 km',             body: 'Troca a cada 15.000 km. O turbo PureTech 110 precisa de ar limpo para manter o boost correto.' },
      { severity: 'WARN',   title: 'Fluido de embreagem (manual) — 2 anos', body: 'Troque o fluido da embreagem hidráulica a cada 2 anos. Fluido contaminado causa atuação lenta e imprecisa.' },
    ],
  },

  '2008': {
    MACETES: [
      { severity: 'OK',   title: 'Motor 1.6 THP: óleo 5W-30 total sintético', body: 'O THP 165cv exige 5W-30 com aprovação PSA B71 2312. A lubrificação do turbo é crítica — troca a cada 10.000 km sem negociação.' },
      { severity: 'WARN', title: 'Câmbio EAT6: modo manual em ladeiras',       body: 'Em ladeiras longas, use o modo manual sequencial para controlar as marchas. O câmbio automático pode "buscar" entre marchas em inclinações fortes.' },
      { severity: 'OK',   title: 'Grip Control: ative antes do atoleiro',      body: 'O sistema Grip Control deve ser ativado ANTES de entrar em terra ou lama — ele não funciona se o veículo já estiver atolado.' },
      { severity: 'OK',   title: 'Suspensão elevada: limite de velocidade off', body: 'A versão com Grip Control tem suspensão levemente elevada. Limite de velocidade fora de estrada recomendado: 50 km/h para preservar o sistema.' },
    ],
    PROBLEMAS: [
      { severity: 'DANGER', title: 'Motor THP — correia dentada crítica',      body: 'O THP 1.6 também usa correia dentada (não corrente) com histórico de ruptura. Troca obrigatória a cada 120.000 km ou 8 anos — nunca adie.' },
      { severity: 'WARN',   title: 'EAT6 — solavanco na 1ª marcha',           body: 'Solavanco ao sair do semáforo com câmbio EAT6 é característico da 1ª geração (2014–2018). Atualização de software reduz, mas não elimina.' },
      { severity: 'WARN',   title: 'Teto solar — vedação e drenos',            body: 'O teto panorâmico (versões top) tem drenos que entopem com folhas. Limpe semestralmente com ar comprimido — goteira na cabine é consequência.' },
      { severity: 'OK',     title: 'Sensor de temperatura do ar — leitura errada', body: 'O sensor externo de temperatura do ar pode marcar valores errados (até +3°C) em velocidade baixa. É limitação de posicionamento, não defeito.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',     title: 'Óleo 5W-30 PSA B71 2312 — 10.000 km', body: 'O THP 1.6 turbo exige 5W-30 com aprovação PSA. Troca a cada 10.000 km — não estenda com turbo.' },
      { severity: 'DANGER', title: 'Correia dentada THP — 120.000 km',      body: 'Obrigatório. Motor de interferência: ruptura = pistões + válvulas destruídos. Não adie por nenhum motivo.' },
      { severity: 'OK',     title: 'Filtro de ar — 15.000 km',              body: 'O turbo THP amplifica o efeito de filtro sujo. Troca obrigatória a cada 15.000 km.' },
      { severity: 'WARN',   title: 'Fluido EAT6 — 60.000 km',              body: 'O câmbio automático requer troca de fluido específico a cada 60.000 km. Use fluido Peugeot original — genérico pode causar solavanco.' },
    ],
  },

  // ── BMW SEDANS ──────────────────────────────────────────────────────────────

  '320i': {
    MACETES: [
      { severity: 'OK',   title: 'Motor B48: óleo 0W-30 LL-04 obrigatório',  body: 'O motor 2.0 turbo B48 exige óleo com aprovação BMW LL-04 (Longlife 04). Outros óleos, mesmo de qualidade, podem causar falhas no sistema VALVETRONIC.' },
      { severity: 'WARN', title: 'Alternador inteligente: bateria AGM',       body: 'O sistema de gestão de energia do 320i exige bateria AGM. Substituir por convencional danifica o alternador e o sistema start-stop.' },
      { severity: 'OK',   title: 'iDrive: atualização periódica via BMW',    body: 'Atualizações de software do iDrive são disponibilizadas periodicamente. Concessionária aplica gratuitamente — resolva bugs de conectividade e mapas.' },
      { severity: 'WARN', title: 'Consumo de óleo B48: 0,5L/1.000 km normal', body: 'O motor B48 consome até 0,5L de óleo por 1.000 km — isso é especificado pela BMW como dentro do normal. Cheque o nível a cada 3.000 km.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN',   title: 'Bomba d\'água elétrica — falha antes de 100k', body: 'A bomba d\'água elétrica do B48 falha com frequência entre 70–100.000 km. Substituição preventiva (~R$ 1.500) evita superaquecimento e dano ao motor.' },
      { severity: 'WARN',   title: 'Termostato mapa — retenção excessiva de calor', body: 'O termostato mapa do B48 pode travar na posição fechada, causando superaquecimento pontual. Monitorar a temperatura em subidas longas.' },
      { severity: 'OK',     title: 'Custo de manutenção elevado fora da garantia', body: 'Peças BMW têm custo 3–5x acima de marcas populares. Orçamento anual de R$ 3.000–5.000 para manutenção preventiva após o fim da garantia.' },
      { severity: 'WARN',   title: 'Sistema de freio: pastilhas com desgaste rápido', body: 'As pastilhas originais BMW duram em média 30–40.000 km em uso urbano. O sensor de desgaste avisa no painel — não ignore.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 0W-30 LL-04 — 15.000 km ou 1 ano', body: 'O motor B48 suporta intervalo de 15.000 km com óleo LL-04. Nunca use óleo sem aprovação BMW Longlife — o VALVETRONIC é sensível.' },
      { severity: 'WARN', title: 'Velas de iridium — 60.000 km',           body: 'Troca a cada 60.000 km. Use NGK ou Bosch especificadas para o B48. Velas gastas causam detonação em motor de alta compressão.' },
      { severity: 'WARN', title: 'Bomba d\'água elétrica — preventiva',    body: 'Troca preventiva entre 80–90.000 km é recomendada por mecânicos experientes. Bomba quebrada em rodovia = reboque + motor danificado.' },
      { severity: 'OK',   title: 'Fluido de freio — 2 anos',               body: 'Troca a cada 2 anos independente do km. O sistema de freio de alto desempenho exige fluido com ponto de ebulição elevado.' },
    ],
  },

  '118i': {
    MACETES: [
      { severity: 'OK',   title: 'Motor B38 3 cilindros: vibração é normal', body: 'O motor 3 cilindros B38 de 136cv do 118i tem vibração mais perceptível que o B48 de 4 cilindros. Calços de motor bem regulados minimizam o efeito.' },
      { severity: 'WARN', title: 'Câmbio DCT7: embreagem fria em partidas',  body: 'O câmbio de dupla embreagem DCT7 tem resposta lenta nos primeiros 5 minutos de uso a frio. Arranques suaves enquanto não atingir temperatura de operação.' },
      { severity: 'OK',   title: 'Óleo LL-04 obrigatório também no B38',     body: 'Mesmo o motor de 3 cilindros exige BMW LL-04. O VALVETRONIC e o TwinPower Turbo dependem de viscosidade controlada.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'B38 — consumo de óleo nas primeiras 60k', body: 'O motor B38 pode consumir até 1L de óleo por 1.000 km nos primeiros 60.000 km durante o processo de amaciamento. BMW considera normal.' },
      { severity: 'OK',   title: 'Custo de manutenção: planeje o orçamento',  body: 'O 118i é o BMW mais acessível, mas peças e mão de obra ainda custam o dobro de marcas populares. Fundo de reserva de R$ 3.000/ano é prudente.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 0W-30 LL-04 — 15.000 km',  body: 'Mesmo intervalo do B48. Use apenas LL-04 aprovado BMW — sem exceções.' },
      { severity: 'WARN', title: 'Velas — 60.000 km',               body: 'Motor turbo de alta compressão é sensível a velas gastas. Troca a cada 60.000 km com especificadas BMW/NGK.' },
      { severity: 'OK',   title: 'Fluido de freio — 2 anos',        body: 'Troca bienal. O sistema iDDS (freio regenerativo nas versões hybrid) é especialmente sensível à qualidade do fluido.' },
    ],
  },

  // ── MERCEDES ────────────────────────────────────────────────────────────────

  'C180': {
    MACETES: [
      { severity: 'OK',   title: 'Motor M264 1.5T: óleo 0W-20 MB 229.71', body: 'O motor 1.5T EQ Boost exige óleo com aprovação Mercedes-Benz 229.71. Outros óleos, mesmo 0W-20, podem causar falhas no sistema de partida-gerador (BSG).' },
      { severity: 'WARN', title: 'Sistema BSG (mild hybrid): bateria de 48V', body: 'O C180 2019+ tem sistema mild hybrid com bateria de 48V além da de 12V. Falha na bateria de 48V paralisa o BSG — manutenção exclusivamente na concessionária.' },
      { severity: 'OK',   title: 'MBUX: atualização via concessionária',    body: 'O sistema MBUX recebe atualizações que corrigem bugs e adicionam funcionalidades. Solicite na revisão — é gratuito na garantia.' },
      { severity: 'WARN', title: 'EQ Boost: não desative o start-stop',     body: 'O sistema EQ Boost (recuperação de energia) funciona integrado com o start-stop. Desativá-lo manualmente reduz eficiência e sobrecarrega o alternador.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN',   title: 'Bateria de 48V — alto custo de substituição', body: 'A bateria de 48V do EQ Boost custa R$ 4.000–7.000 para trocar fora da garantia. Mantenha a garantia em dia — é o item mais caro desse sistema.' },
      { severity: 'OK',     title: 'MBUX — travamentos ocasionais',               body: 'O sistema MBUX trava com atualizações pendentes. Mantenha o software atualizado pela concessionária para evitar telas pretas e reinicializações.' },
      { severity: 'WARN',   title: 'Custo de manutenção: orçamento elevado',      body: 'O C180 tem intervalos de revisão de 20.000 km, mas cada revisão custa R$ 2.500–5.000. Peças Mercedes são exclusivas e caras — reserve para manutenção.' },
      { severity: 'DANGER', title: 'Recall airbag: verifique o VIN',              body: 'Alguns C-Class do Brasil estão em recall de airbag (diferentes do Takata). Cheque o VIN no site da Mercedes Brasil antes de qualquer viagem longa.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 0W-20 MB 229.71 — 20.000 km',      body: 'O intervalo é de 20.000 km com LL de qualidade MB 229.71. Nunca substitua por óleo sem aprovação Mercedes — o EQ Boost é sensível.' },
      { severity: 'WARN', title: 'Velas — 40.000 km',                      body: 'O motor turbo de alta compressão exige troca de velas a cada 40.000 km. Use NGK ou Bosch aprovados para o M264.' },
      { severity: 'OK',   title: 'Filtro de ar — 20.000 km',               body: 'Troca a cada 20.000 km junto com a revisão. O filtro original Mercedes é caro mas garante o fluxo correto para o turbo.' },
      { severity: 'WARN', title: 'Fluido de freio — 2 anos',               body: 'Troca bienal obrigatória. O sistema de freio com assistência eletrônica integrada ao EQ Boost exige fluido DOT 4 de alta qualidade.' },
    ],
  },

  'GLC': {
    MACETES: [
      { severity: 'OK',   title: 'Motor OM654d 2.0 diesel: AdBlue obrigatório', body: 'O motor diesel OM654d usa AdBlue (uréia). Nunca deixe o nível zerar — o motor entra em modo de proteção e não liga após 3 ciclos de aviso ignorados.' },
      { severity: 'WARN', title: 'Suspensão a ar (AIRMATIC): desative em off-road', body: 'A suspensão AIRMATIC (opcional) eleva o carro para off-road leve, mas não é para trilhas pesadas. Pedras podem furar a bolsa de ar — dano de R$ 3.000+.' },
      { severity: 'OK',   title: '9G-Tronic: não force neutro em movimento',  body: 'Nunca coloque o câmbio 9G-Tronic em N com o carro em movimento — causa desgaste instantâneo nas embreagens de disco do câmbio.' },
      { severity: 'OK',   title: 'Off-road: use o modo adequado antes',        body: 'O Dynamic Select tem modo Off-road e Individual. Selecione ANTES de sair do asfalto — os modos mudam tração, suspensão e diferencial preventivamente.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN',   title: 'Suspensão AIRMATIC — vazamento nas molas', body: 'As bolsas de ar da AIRMATIC têm vida útil de 100–150.000 km. Vazamento causa queda de um lado do carro — reparo de R$ 2.000–4.000 por bolsa.' },
      { severity: 'WARN',   title: 'AdBlue — sensor de nível impreciso',       body: 'O sensor de AdBlue pode indicar nível incorreto. Se o aviso acender, abasteça imediatamente mesmo achando que está com reserva.' },
      { severity: 'OK',     title: 'Custo de manutenção: previsão de R$ 6.000/ano', body: 'GLC fora de garantia tem revisões a cada 15.000 km custando R$ 2.000–4.000. Planeje R$ 4.000–6.000/ano para manutenção preventiva.' },
      { severity: 'DANGER', title: 'Injetor diesel — entupimento com diesel ruim', body: 'Os injetores Bosch do OM654d são extremamente sensíveis à qualidade do diesel. Use sempre diesel S10 de postos de bandeira. Injetor danificado = R$ 3.500 por unidade.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 0W-30 MB 229.51/229.71 — 15.000 km', body: 'Use apenas óleo com aprovação Mercedes 229.51 ou 229.71. O intervalo de 15.000 km é válido apenas com esses óleos.' },
      { severity: 'WARN', title: 'AdBlue — reabastecimento a cada 15.000 km', body: 'O consumo médio é de 1,5L a cada 1.000 km de diesel. Reabasteça na concessionária ou em postos selecionados com AdBlue original.' },
      { severity: 'OK',   title: 'Filtro de partículas diesel (DPF) — regeneração', body: 'Faça pelo menos 30 km de rodovia por semana para regenerar o DPF. Uso 100% urbano entope o filtro — limpeza custa R$ 1.500.' },
      { severity: 'WARN', title: 'Pastilhas — 30.000 km',                    body: 'O GLC é pesado — pastilhas desgastam rápido. Inspecione a cada 30.000 km. O sensor avisa no painel quando chegar ao limite.' },
    ],
  },

  // ── PORSCHE ─────────────────────────────────────────────────────────────────

  Cayenne: {
    MACETES: [
      { severity: 'OK',   title: 'Motor V6 2.9T: óleo 0W-40 Porsche A40',   body: 'O motor V6 biturbo exige óleo com aprovação Porsche A40. Use Castrol Edge 0W-40 ou Mobil 1 0W-40 — ambos aprovados. Troca a cada 15.000 km.' },
      { severity: 'WARN', title: 'Suspensão PASM: altura antes do off-road', body: 'Eleve a suspensão PASM para o nível máximo antes de sair do asfalto. Off-road com suspensão baixa danifica os compressores e as molas pneumáticas.' },
      { severity: 'OK',   title: 'Torque Vectoring Plus: use no gelo e lama', body: 'O PTV+ (opcional) distribui torque entre as rodas traseiras individualmente. Em terra ou neve, ele permite curvas mais controladas do que o piloto conseguiria sozinho.' },
      { severity: 'WARN', title: 'Freio cerâmico PCCB: só pastilhas originais', body: 'O freio cerâmico PCCB só aceita pastilhas específicas Porsche. Pastilhas de terceiros danificam os discos cerâmicos de R$ 25.000+ o par.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN',   title: 'IMS — mancal de eixo intermediário',      body: 'O motor V6 do Cayenne 3.0T (2011–2016) tem histórico de falha no IMS (Intermediate Shaft Bearing). Troca preventiva com o kit LN Engineering aos 80.000 km é recomendada.' },
      { severity: 'WARN',   title: 'Trocador de calor de óleo — vazamento',   body: 'O trocador de calor entre óleo do motor e liquido de arrefecimento pode vazar, contaminando ambos os fluidos. Inspecione anualmente — dano negligenado = motor destruído.' },
      { severity: 'OK',     title: 'Custo de manutenção: R$ 10.000–20.000/ano', body: 'Revisão de 15.000 km do Cayenne custa R$ 4.000–8.000 na concessionária. Planeje R$ 10.000–20.000 anuais para manutenção sem sustos.' },
      { severity: 'DANGER', title: 'Compressor PASM — vazamento de ar',        body: 'O compressor da suspensão pneumática PASM tem alta incidência de falha após 80.000 km. O carro fica baixo e instável. Troca custa R$ 5.000–8.000.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 0W-40 Porsche A40 — 15.000 km',       body: 'Use apenas óleo com aprovação A40. O motor V6 biturbo tem tolerâncias mínimas — outros óleos causam desgaste nos mancais turbo.' },
      { severity: 'WARN', title: 'Velas — 60.000 km',                         body: 'Motor biturbo de alto desempenho. Troca de velas com aprovação Porsche/NGK a cada 60.000 km — impacto direto no consumo e desempenho.' },
      { severity: 'WARN', title: 'Fluido de transmissão PDK — 60.000 km',    body: 'Troca do fluido do câmbio PDK (dupla embreagem) a cada 60.000 km. Fluido degradado no PDK é problema de R$ 20.000+ para resolver.' },
      { severity: 'OK',   title: 'Fluido de freio — 2 anos',                  body: 'Troca bienal obrigatória. Os freios de alto desempenho do Cayenne exigem DOT 4 ou DOT 5.1 com ponto de ebulição acima de 280°C.' },
    ],
  },

  // ── TESLA ───────────────────────────────────────────────────────────────────

  'Model 3': {
    MACETES: [
      { severity: 'OK',   title: 'Regeneração: ative o modo One Pedal',      body: 'O modo One Pedal (freio regenerativo máximo) aumenta a autonomia em até 20% em uso urbano e reduz o desgaste das pastilhas ao mínimo.' },
      { severity: 'WARN', title: 'Supercharger: não carregue acima de 80%',   body: 'Carregar além de 80% aquece a bateria e reduz a longevidade das células. Reserve cargas acima de 90% para viagens longas — Tesla recomenda em tela.' },
      { severity: 'OK',   title: 'Ar condicionado pré-condicionado via app',  body: 'Ligue o AC pelo app 15 minutos antes de sair. Resfria usando a carga da rede elétrica, não da bateria — preserva autonomia e conforto térmico.' },
      { severity: 'WARN', title: 'Pneus: rodízio a cada 10.000 km',           body: 'A tração elétrica (especialmente AWD/Performance) desgasta os pneus traseiros mais rápido. Rodízio a cada 10.000 km é essencial.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN',   title: 'Paint quality — pintura sensível a arranhões', body: 'A pintura do Model 3 é mais fina que a média. PPF (película protetora) ou ceramic coating são recomendados imediatamente após a compra.' },
      { severity: 'WARN',   title: 'Tela de 15" — único controle de tudo',       body: 'A dependência total da tela para controles básicos (desembaçador, velocidade do limpador) é um ponto de atenção. Travamento da tela = reinicialização de 2 minutos.' },
      { severity: 'OK',     title: 'Autonomia no calor: bateria perde 15–20%',   body: 'Em dias acima de 35°C com AC ativo, a autonomia cai 15–20% em relação ao dado de fábrica. Planejar percursos com margem de segurança é essencial no Brasil.' },
      { severity: 'WARN',   title: 'Alinhamento e balanceamento: desgaste assimétrico', body: 'O torque instantâneo elétrico causa desgaste de pneus assimétrico se o alinhamento não for feito a cada 20.000 km. Pneu fora de alinhamento = perda de autonomia.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Fluido de freio — 2 anos',               body: 'O carro elétrico freio pouco com as pastilhas, mas o fluido DOT 3 absorve umidade independentemente do uso. Troca bienal obrigatória.' },
      { severity: 'OK',   title: 'Filtro de cabine HEPA — 2 anos',         body: 'O filtro de cabine (HEPA nas versões com modo Bioweapon Defense) deve ser trocado a cada 2 anos. Tesla recomenda na tela de serviço.' },
      { severity: 'WARN', title: 'Pneus — rodízio a cada 10.000 km',       body: 'Mais do que qualquer carro convencional. O torque elétrico destrói pneus assimétricos — rodízio é a manutenção preventiva mais importante do Model 3.' },
      { severity: 'OK',   title: 'Refrigerante da bateria — 4 anos',       body: 'O líquido de arrefecimento da bateria deve ser trocado a cada 4 anos. Serviço exclusivo Tesla — não tente em oficina convencional.' },
    ],
  },

  'Model Y': {
    MACETES: [
      { severity: 'OK',   title: 'One Pedal + Long Range: autonomia máxima', body: 'Com regeneração máxima e velocidade cruise de 110 km/h, o Model Y Long Range atinge até 90% da autonomia divulgada em condições reais no Brasil.' },
      { severity: 'WARN', title: 'Carregamento noturno: programação via app', body: 'Programe o carregamento para encerrar às 80% via app Tesla. Manter na tomada com 100% por horas degrada a bateria gradualmente.' },
      { severity: 'OK',   title: 'Camp Mode: gerencie o consumo noturno',    body: 'O Camp Mode mantém temperatura e ventilação ativas com o carro desligado. Consome ~3% por hora — planeje a autonomia antes de acampar.' },
      { severity: 'WARN', title: 'Teto de vidro panorâmico: proteção térmica', body: 'O teto de vidro panorâmico aumenta o ganho de calor solar significativamente no Brasil. Película solar de proteção UV é recomendada logo após a compra.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Alinhamento de painéis — qualidade de montagem', body: 'O Model Y tem histórico de desalinhamento de painéis e vedações nas janelas. Inspecione todos os gaps antes de sair da entrega e registre formalmente no app.' },
      { severity: 'OK',   title: 'Ruídos internos — plásticos e vedações',       body: 'Rangidos em plásticos e vedações são relatados frequentemente em viagens longas. Uso de espuma de vedação nos pontos de contato resolve sem desmontagem.' },
      { severity: 'WARN', title: 'Autonomia real: 20–25% abaixo do WLTP',        body: 'Em uso real brasileiro (AC, velocidade, calor), o Model Y entrega 75–80% da autonomia WLTP anunciada. Planeje percursos com essa margem.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Fluido de freio — 2 anos',           body: 'Mesmo com pouco uso das pastilhas (regeneração faz o trabalho), o fluido DOT 3 absorve umidade. Troca bienal é obrigatória.' },
      { severity: 'WARN', title: 'Pneus — rodízio a cada 10.000 km',   body: 'O Model Y Performance e AWD desgastam pneus traseiros mais rapidamente. Rodízio regular é essencial para igualar o desgaste.' },
      { severity: 'OK',   title: 'Filtro de cabine — 2 anos',           body: 'Troca bienal via aplicativo de serviço Tesla ou centros de assistência autorizados.' },
      { severity: 'OK',   title: 'Refrigerante da bateria — 4 anos',   body: 'Fluido de arrefecimento da bateria de alta tensão. Substituição exclusiva em centros Tesla — jamais abra o sistema por conta própria.' },
    ],
  },

  // ── MOTOS ADICIONAIS ────────────────────────────────────────────────────────

  'CB 500F': {
    MACETES: [
      { severity: 'OK',   title: 'Motor paralelo 471cc: aquecimento 2 minutos', body: 'O bicilíndrico paralelo da CB 500F precisa de 2 minutos de aquecimento antes de pegar estrada. O óleo demora a atingir temperatura ideal no motor duplo.' },
      { severity: 'OK',   title: 'Óleo 10W-30 JASO MA2 semissintético',         body: 'Use óleo 10W-30 com certificação JASO MA2. O motor com embreagem molhada degrada rapidamente com óleo de carro (sem MA2).' },
      { severity: 'WARN', title: 'Corrente: lubrificação a cada 500 km',        body: 'A corrente da CB 500F se estica rápido em uso de estrada. Lubrifique a cada 500 km e regule a tensão a cada 6.000 km.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Bengala dianteira — retentor de óleo',  body: 'Os retentores da bengala dianteira começam a vazar entre 30–40.000 km. Resíduo oleoso na perna da bengala é o sinal — troca simples e barata.' },
      { severity: 'OK',   title: 'Farol: lâmpada H7 — vida curta',        body: 'A lâmpada H7 original dura em média 2 anos. Conversão para LED H7 canbus resolve permanentemente e melhora muito a visibilidade noturna.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 10W-30 JASO MA2 — 6.000 km',     body: 'Troca a cada 6.000 km. O bicilíndrico tolera semissintético sem necessidade de full sintético.' },
      { severity: 'OK',   title: 'Velas NGK CR8EH-9 — 12.000 km',        body: 'Troca a cada 12.000 km. Não substitua por velas genéricas — o motor bicilíndrico é sensível a diferença de ignição entre cilindros.' },
      { severity: 'WARN', title: 'Corrente e kit relação — 25.000 km',    body: 'Troque o kit completo (corrente + coroa + pinhão) a cada 25.000 km. Trocar só a corrente em coroa desgastada acelera o desgaste da nova.' },
    ],
  },

  'Lander 250': {
    MACETES: [
      { severity: 'OK',   title: 'Motor 249cc: óleo 20W-50 JASO MA2',        body: 'A Lander 250 aceita 20W-50 mineral com JASO MA2 em climas quentes. Em serras, use semissintético 10W-40.' },
      { severity: 'WARN', title: 'Suspensão dianteira: preload para trilha',  body: 'Aumente o preload da bengala dianteira (anel de ajuste) antes de trilhas. A configuração de fábrica é otimizada para asfalto.' },
      { severity: 'OK',   title: 'Radiador: limpeza com ar comprimido',       body: 'O radiador da Lander 250 acumula insetos e poeira. Limpeza com ar comprimido de baixa pressão a cada 10.000 km mantém o resfriamento eficiente.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Bengala traseira — amortecimento reduzido', body: 'O amortecedor traseiro perde eficiência após 20.000 km de uso misto asfalto/terra. Vazamento de óleo é sintoma — troque antes que o suporte quebre.' },
      { severity: 'OK',   title: 'Corrente — esticamento rápido em trilha',   body: 'A corrente original se estica mais rápido em trilha do que em asfalto. Verifique a tensão a cada 2.000 km em uso off-road.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 10W-40 JASO MA2 — 4.000 km',          body: 'Troca a cada 4.000 km. Motor monocilíndrico de médio porte aceita semissintético — mineral acelera desgaste nas revisões mais longas.' },
      { severity: 'OK',   title: 'Vela NGK DPR8EA-9 — 8.000 km',             body: 'Troca a cada 8.000 km. Vela gasta causa partida difícil a frio e aumento de consumo no motor monocilíndrico.' },
      { severity: 'WARN', title: 'Correia do ventoinha — 20.000 km',          body: 'Inspecione a correia de acionamento da ventoinha a cada revisão. Ruptura em trilha sem célula de emergência perto é problema sério.' },
    ],
  },

  'Crosser 150': {
    MACETES: [
      { severity: 'OK',   title: 'Motor 150cc: regulagem de válvulas a cada 8k', body: 'A Crosser 150 exige regulagem de válvulas a cada 8.000 km. O batido metálico em frio é sinal claro de folga excessiva — não ignore.' },
      { severity: 'OK',   title: 'Suspensão traseira: carga máxima 85 kg',       body: 'O amortecedor traseiro da Crosser 150 é calculado para 85 kg de carga. Com piloto+cargueiro pesado, regule a pré-carga para o nível máximo.' },
      { severity: 'WARN', title: 'Freio a tambor traseiro: ajuste do cabo',      body: 'O freio a tambor traseiro precisa de ajuste do cabo a cada 5.000 km. Cabo folgado = frenagem insuficiente em descidas.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Carburador — entupimento com etanol velho',   body: 'A versão carburada é sensível a etanol parado no tanque por mais de 30 dias. Esvazie o carburador se a moto ficar parada por mais de 3 semanas.' },
      { severity: 'OK',   title: 'Rolamento de roda traseira — 30.000 km',     body: 'O rolamento traseiro da Crosser tem vida útil de 25–35.000 km em uso misto. Ronco traseiro crescente com a velocidade indica substituição.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 20W-50 JASO MA — 3.000 km',        body: 'Troca a cada 3.000 km com mineral 20W-50 JASO MA. O motor simples não precisa de sintético, mas o intervalo curto é essencial.' },
      { severity: 'OK',   title: 'Vela NGK BPR6ES — 6.000 km',            body: 'Troca a cada 6.000 km. Vela gasta causa consumo elevado e dificuldade de partida a frio no motor carburado.' },
      { severity: 'WARN', title: 'Corrente — tensão a cada 3.000 km',     body: 'A corrente da Crosser se estica em off-road. Verifique tensão a cada 3.000 km. Corrente solta pode pular de dente e travar a roda.' },
    ],
  },

  'Twister 250': {
    MACETES: [
      { severity: 'OK',   title: 'Motor 249cc monocilíndrico: amaciamento',  body: 'Na Twister nova (até 1.000 km), não exceda 7.000 rpm. O amaciamento do monocilíndrico garante maior durabilidade dos anéis e mancais.' },
      { severity: 'OK',   title: 'Caixa de ar: vedação contra poeira',        body: 'Em estradas de terra, limpeza a cada 2.000 km. A caixa de ar sela mal em versões antigas — poeira no motor acelera o desgaste.' },
      { severity: 'WARN', title: 'Bengala dianteira: retentor a cada 30k',   body: 'Os retentores das bengalas perdem óleo com o tempo. Resíduo na perna é o sinal — troca por conjuntos All Balls resolve definitivamente.' },
    ],
    PROBLEMAS: [
      { severity: 'WARN', title: 'Tampa de válvula — vazamento de óleo',    body: 'A gaxeta da tampa de válvulas da Twister reseca com calor e começa a vazar óleo antes dos 40.000 km. Peça barata, mas ignorar suja o motor e cria risco.' },
      { severity: 'OK',   title: 'Medidor de combustível impreciso',          body: 'O medidor de nível de combustível da Twister é impreciso — a reserva real começa 1–2 litros antes da indicação. Marque a autonomia real no odômetro.' },
    ],
    MANUTENCAO: [
      { severity: 'OK',   title: 'Óleo 10W-30 JASO MA2 — 4.000 km',     body: 'O motor 249cc aceita semissintético 10W-30. Troca a cada 4.000 km para manter lubrificação da embreagem molhada adequada.' },
      { severity: 'WARN', title: 'Corrente — lubrificação e tensão',     body: 'Lubrifique a corrente a cada 500 km e regule a tensão a cada 5.000 km. Kit relação completo a cada 25.000 km.' },
      { severity: 'OK',   title: 'Vela NGK DPR8EA-9 — 8.000 km',        body: 'Troca a cada 8.000 km. Nunca estenda para 12.000 km no motor de médio porte — a vela gasta aumenta muito o consumo.' },
    ],
  },

}

async function main() {
  console.log('🌱 Iniciando seed de AiTips...')

  let total = 0
  const categories = ['MACETES', 'PROBLEMAS', 'MANUTENCAO'] as const

  for (const [modelName, catData] of Object.entries(models)) {
    // Verifica se já existem tips para esse modelo
    const existing = await prisma.aiTip.count({ where: { modelName, modelYear: '0' } })
    if (existing > 0) {
      console.log(`  ⏭  ${modelName} já tem ${existing} tips — pulando`)
      continue
    }

    for (const cat of categories) {
      const tips = catData[cat]
      for (let i = 0; i < tips.length; i++) {
        const tip = tips[i]
        await prisma.aiTip.create({
          data: {
            modelName,
            modelYear: '0', // genérico para todos os anos
            category: cat,
            severity: tip.severity,
            title: tip.title,
            body: tip.body,
            order: i,
          },
        })
        total++
      }
    }
    console.log(`  ✅ ${modelName}`)
  }

  console.log(`\n✅ Seed concluído! ${total} tips inseridos para ${Object.keys(models).length} modelos.`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
