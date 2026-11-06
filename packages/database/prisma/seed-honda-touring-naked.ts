// seed-honda-touring-naked.ts — Honda motos clássicas, touring e naked
// GOLD WING 1500/ 1800 · GOLD WING TOUR 1800: touring de longa distância, flat-six boxer
// CTX 700N · NC 700 X/ 700X ABS: naked/dual-sport econômico 670cc paralelo twin
// MAGNA 750 (VF750C): cruiser V4 clássico (1982-2003); peças importadas
// DOMINATOR 650: Honda NX 650 Dominator (644cc, 1988-2002) — código FIPE 2801
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

// ─── GOLD WING GL1500 1800 (1988–2001 / 2001+) ───────────────────────────────

const GOLDWING1800_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor flat-six boxer 1.833cc (GL1800) — óleo 10W-30 JASO MA, 4,3 L com filtro; troca a cada 8.000 km; motor de baixíssima rotação para turismo, exige cuidado na troca de óleo completa',
    body: 'A Gold Wing GL1800 tem o motor flat-six boxer mais icônico do motociclismo: 6 cilindros horizontalmente opostos (boxer), 1.833cc, refrigerado a líquido, SOHC (3 válvulas por cilindro na geração 2001-2017 e 4 válvulas na 2018+). Capacidade de óleo: 4,3 L com filtro (muito mais que qualquer outra moto catalogada aqui). Troca: a cada 8.000 km. Honda recomenda HP4 10W-30 JASO MA. Sintético Mobil 1 Moto 10W-30 ou Shell Advance Ultra 10W-30: durabilidade superior, pode esticar para 10.000 km com análise de óleo. Drenar o óleo da Gold Wing leva mais tempo pelo volume — deixar drenar 15-20 min para sair o máximo.',
  },
  {
    severity: 'OK',
    title: 'Transmissão por cardan (eixo de transmissão) — sem correia ou corrente; verificar nível de óleo do cardan a cada 12.000 km; troca a cada 24.000 km; Honda recomenda 80W-90 GL-5',
    body: 'A Gold Wing usa transmissão por cardan (eixo cardânico, também chamado shaft drive) — sem corrente ou correia de transmissão para lubrificar. Vantagem: zero manutenção de transmissão além do óleo do cardan. Desvantagem: efeito de "rolamento" ao acelerar/desacelerar (shaft torque effect) — moto inclina levemente ao dar gás. Óleo do cardan: 80W-90 API GL-5, capacidade ~180-200 mL (pequena quantidade). Verificar nível: parafuso lateral no final do cardan. Troca: a cada 24.000 km. Nunca usar óleo hipoidrizado com aditivos para diferencial de carro — pode atacar vedações de elastômero. Honda Cardan Shaft Oil (80W-90) ou equivalente GL-5 de moto.',
  },
  {
    severity: 'OK',
    title: 'Peso: GL1800 pesa 390 kg abastecida (2001-2017) ou 380 kg (2018+ Gen 6) — moto mais pesada do mercado; técnica de manobra específica; nunca tentar fazer U-turn sem prática',
    body: 'A Gold Wing GL1800 é a moto mais pesada deste catálogo: 390 kg com combustível e passageira. Para pilotos acostumados a motos menores: requer prática antes de sair na rua. Técnicas essenciais: (1) U-turn em velocidade morta: usar freio traseiro com dedo (não pé) para controlar velocidade + boa velocidade mínima no U-turn (nunca parar no meio). (2) Estacionar sempre em superfície plana — nunca em rampa sem apoio. (3) Cavalete lateral: colocar primeiro, depois desmontar. (4) Levantar a moto sozinho se cair: IMPOSSÍVEL para uma pessoa sem equipamento — pedir ajuda sempre. Manuseio em espaço apertado: planejar com antecedência o rumo de saída.',
  },
  {
    severity: 'OK',
    title: 'Airbag opcional (Gold Wing GL1800 2006-2010 e 2018+): único airbag de série em motocicleta; sistema pode disparar em acidente sem ser fatal; verificar manutenção do airbag a cada 6 anos',
    body: 'A versão Airbag da GL1800 (disponível em alguns anos nos EUA e importados ao Brasil) tem airbag dianteiro que protege o piloto em colisões frontais. O airbag usa inflador de nitrogênio com vida útil de ~12 anos. Inspeção do airbag: a cada 6 anos em concessionária Honda autorizada — o inflador precisa de teste de pressão. Airbag disparado acidentalmente (choque, queda lateral): reposição é cara (R$5.000-15.000 em peças). Em caso de acidente com a moto: não ligar mais a ignição após o impacto antes de verificar o sistema de airbag — risco de disparo tardio quando a moto é movida.',
  },
  {
    severity: 'OK',
    title: 'GL1500 (1988-2000): motor flat-six 1.520cc, 100 cv; transmissão por cardan; atenção especial para a correia de sincronismo das árvores de cames — trocar a cada 32.000 km',
    body: 'A GL1500 usa motor flat-six de 1.520cc. Diferença crítica vs GL1800: a GL1500 tem correia dentada (timing belt) de sincronismo das 6 árvores de cames — a GL1800 usa correntes. A correia da GL1500 DEVE ser trocada a cada 32.000 km (ou 4 anos) obrigatoriamente — ruptura = motor destruído (motor interferente). Custo de troca da correia GL1500: R$600-1.200 em mão de obra + R$300-600 em peças. Para Gold Wings GL1500 importadas com mais de 60.000 km e histórico desconhecido: trocar a correia IMEDIATAMENTE antes de qualquer uso. Outro ponto: a GL1500 usa gasolina de alta octanagem (95+) — sempre verificar o octano disponível no posto.',
  },
  {
    severity: 'OK',
    title: 'Pneus originais 130/70-18 (F) · 180/60-16 (R) — vida útil de 15.000-20.000 km para o traseiro; moto muito pesada desgasta pneus aceleradamente; usar pneu de touring de qualidade',
    body: 'O peso de 390 kg da GL1800 desgasta os pneus muito mais rápido que motos esportivas leves. Pneu traseiro: 10.000-15.000 km em uso de touring intenso. Pneu dianteiro: 15.000-20.000 km. Pneus recomendados para touring: Dunlop E3 (original Honda), Metzeler Tourance Next, Bridgestone BT023. Nunca calibrar pneus da GL abaixo da especificação — moto pesada com pneu murcho tem comportamento imprevisível em curvas. Pressão: 36 PSI dianteiro / 41 PSI traseiro solo; com garupa e bagagem: 41 PSI / 45 PSI (confirmar plaqueta na própria moto). Calibrar sempre com pneu frio — com a moto parada pelo menos 3 horas.',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas para Gold Wing GL1500 (vintage): importação dos EUA via eBay/RevZilla, grupos Facebook "Gold Wing Brasil", clubes Honda Wing; muitas peças GL1500 foram descontinuadas pela Honda',
    body: 'A Gold Wing GL1500 (1988-2000) tem muitas peças descontinuadas no Brasil. Fontes de peças: (1) eBay internacional: filtrando por GL1500, ano e especificação. Peças usadas em bom estado abundantes nos EUA (frota grande). (2) RevZilla ou Cycle Gear (EUA): peças aftermarket compatíveis com frete para Brasil. (3) Grupo Facebook "Gold Wing Brasil" — comunidade ativa com troca de peças. (4) Rocky Mountain ATV/MC (rockymountainatvmc.com): peças Honda OEM e aftermarket com entrega internacional. Peças críticas que costumam falhar na GL1500 com muitos km: bomba de combustível (R$200-400 importada), diafragma do carburador (R$60-120/unidade, 6 carburadores), selagem do cardan.',
  },
]

const GOLDWING1800_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'GL1500: carburadores (6 unidades) com verniz após longa parada — problema universal em GL1500 paradas; limpeza ultrassônica ou rebuild completo dos 6 carburadores',
    body: 'A GL1500 tem 6 carburadores (um por cilindro). Após longa parada (>6 meses): gasolina velha deixa verniz que entope os pilotos e jets em todos os 6 carburadores simultaneamente. Sintoma: motor que não parte, marcha lenta instável ou cilindros "morrendo" (motor trabalhando com 4 ou 5 cil). Solução: rebuild completo dos 6 carburadores. Serviço especializado: R$800-1.600 (limpeza ultrassônica + kits de rebuild para todos). Prevenção em motos GL1500 que ficam paradas: adicionar estabilizador de combustível (Sta-Bil) no tanque antes de guardar e rodar o motor por 5 min para circular o estabilizador pelos carburadores.',
  },
  {
    severity: 'WARN',
    title: 'GL1800 (2001-2017): vazamento de líquido de arrefecimento pelo T-fitting plástico na mangueira inferior do radiador — peça plástica que endurece e racha com o tempo',
    body: 'Problema relatado em GL1800 com mais de 60.000 km ou 8+ anos: o T-fitting plástico de distribuição do líquido de arrefecimento (na parte inferior do motor, próximo ao radiador) racha por envelhecimento e temperatura. Sintoma: mancha de verde (anticongelante) no chão da garagem após a moto ficar parada; odor adocicado ao esquentar o motor. Solução: trocar o T-fitting (peça Honda, R$30-80) com mangueiras de radiador. Aproveitar para trocar mangueiras se com mais de 6 anos. Preventivo: inspecionar o T-fitting a cada revisão de 24.000 km — apalpar o plástico para verificar ressecamento.',
  },
  {
    severity: 'DANGER',
    title: 'GL1800 2018+ com DCT (Dual Clutch Transmission): fluido DCT específico Honda — NUNCA substituir por ATF ou óleo de motor; troca obrigatória a cada 24.000 km',
    body: 'A Gold Wing GL1800 2018+ com DCT usa fluido específico Honda Premium DCT Fluid (código 08269-99904). Usar ATF (fluido de câmbio automático de carro) ou óleo de motor: o embreagem hidráulica do DCT falha dentro de 5.000-10.000 km. Custo do reparo do DCT com fluido errado: R$8.000-25.000 (câmbio dupla embreagem hidráulica é componente de alta precisão). Capacidade: ~2,4 L para a GL1800. Troca: a cada 24.000 km em concessionária Honda com fluido oficial. A Gold Wing DCT é a transmissão mais complexa das motos Honda — manutenção APENAS em concessionária autorizada.',
  },
]

// ─── NC 700 X / 700X ABS (2012–2015) ─────────────────────────────────────────

const NC700X_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 670cc paralelo twin SOHC (3 válvulas/cil) — óleo 10W-30 JASO MA, 3,0 L com filtro; troca a cada 6.000 km; motor derivado de carro Honda Jazz, projetado para economia',
    body: 'A NC 700X tem um motor incomum no mundo das motos: foi derivado do motor 1.2L do Honda Jazz (carro), cortado ao meio resultando em um twin de 670cc com câmara de combustão de baixa compressão (10,8:1) e injeção PGM-FI. A consequência: consumo médio de 25-28 km/L (um dos melhores em moto de 700cc). Motor SOHC com 3 válvulas por cilindro (2 admissão + 1 escape). Óleo: 10W-30 JASO MA, 3,0 L com filtro. Folga de válvulas: IN 0,15 mm / EX 0,25 mm a cada 24.000 km. Vela: NGK LMAR8B-9 (tipo específico — confirmar no manual).',
  },
  {
    severity: 'OK',
    title: 'Compartimento dianteiro de 22 L (a NCX 700X tem "glove box" no lugar do tanque de combustível) — tanque de gasolina embaixo do banco; distribuição de peso diferenciada',
    body: 'A NC 700X tem design único: o compartimento de armazenamento de 22 L fica no lugar do tanque (entre o guidão e o banco) e o tanque de combustível real fica embaixo do banco. Isso cria distribuição de peso baixa e central — a moto é mais estável em baixa velocidade que motos convencionais. O compartimento de 22 L comporta um capacete aberto. Para uso no dia a dia: ideal. Para viagem: carregar itens frequentemente acessados. Atenção: não colocar objetos pontiagudos ou pesados que podem danificar o forro interno.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 — lubrificar a cada 500 km; folga 20-25 mm; a NC 700X (versão manual) tem corrente 520; versão DCT tem cardan — verificar qual versão você tem antes de manobras de manutenção',
    body: 'A NC 700X foi vendida em duas versões no Brasil: manual (6 marchas, corrente 520) e DCT (Dual Clutch Transmission, cardan). Na versão manual: lubrificar corrente a cada 500-700 km, folga 20-25 mm, kit completo a cada 25.000 km. Na versão DCT: não há corrente — verificar fluido do cardan (GL-5 80W-90, troca a cada 24.000 km) e fluido DCT separado. Para identificar: versão manual tem alavanca de embreagem no guidão esquerdo; versão DCT não tem alavanca de embreagem (apenas manetes de câmbio para cima/baixo no guidão).',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas NC 700X: filtro de óleo Hiflofiltro HF204 (muito disponível), pastilhas EBC FA196, pneus 120/70-17 F + 160/60-17 R (tamanho padrão de naked) — excelente disponibilidade',
    body: 'A NC 700X usa dimensões de pneu padrão de naked (120/70-17 F + 160/60-17 R) — enorme disponibilidade e custo menor que motos com pneus exóticos. Filtro de óleo: Hiflofiltro HF204 — R$20-35. Pastilhas: EBC FA196 (dianteiro) — R$80-120 o par, disponível em muitas lojas. Corrente DID 520VX3: R$170-250. Pneu dianteiro 120/70-17: Pirelli Angel GT, Michelin Pilot Road — R$250-450. Pneu traseiro 160/60-17: Pirelli Angel GT — R$350-550. A NC 700X tem baixo custo total de propriedade: motor econômico + peças com boa disponibilidade local.',
  },
]

const NC700X_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vibração excessiva em certas faixas de RPM (3.000-4.000 rpm em particular) — característica do motor twin de baixa compressão; balanceador secundário não elimina toda a vibração',
    body: 'A NC 700X tem característica de vibração que divide opiniões: em torno de 3.000-4.000 RPM, o twin paralelo vibra de forma percept[ível nas manoplas e banco. Em RPM acima de 5.000: vibração diminui. É característica de design (motor de baixa compressão não tem o "taco liso" de motos mais performance). Mitigações: manoplas com peso interno (barra-ends de alumínio cheio vs vazado), assento gel no banco. Não é defeito: é a natureza do motor. Pilotos vindos de monocilíndricos: acham a NC 700X suave. Pilotos de twins de alta compressão: podem achar vibrante.',
  },
  {
    severity: 'WARN',
    title: 'Potência limitada (51 cv) — adequada para uso urbano e estradas, mas insuficiente para ultrapassagens rápidas em rodovias ou uso esportivo; NC 700X é para conforto, não performance',
    body: 'A NC 700X produz 51 cv @ 6.250 rpm — menos que muitas 400cc esportivas. Na prática, é mais que suficiente para velocidade legal em rodovias, mas ultrapassagens em estradas de pista única (que exigem aceleração rápida de 80 para 120 km/h em <5 segundos) são lentas. Para pilotos que vêm de motos mais potentes: a NC 700X frustrará em situações de alta aceleração. Para quem busca conforto, economia e facilidade de pilotagem: é uma das melhores escolhas. Carga máxima: 190 kg (piloto + garupa + bagagem) — montar generosamente e não exceder.',
  },
]

// ─── CTX 700N (2014–2017) ────────────────────────────────────────────────────

const CTX700N_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'CTX 700N: mesmo motor da NC 700X (670cc twin SOHC), mas com posição de pilotagem cruiser (baixa, para frente) — mesma manutenção de óleo, filtro e vela da NC 700X',
    body: 'A CTX 700N usa a mesma base mecânica da NC 700X: motor 670cc SOHC twin, 51 cv, PGM-FI. Diferença: posição de pilotagem estilo cruiser (guidão largo e alto, posição de pé para frente). Mesma manutenção: óleo 10W-30 JASO MA, 3,0 L, troca 6.000 km; vela NGK LMAR8B-9; folga de válvulas IN 0,15/EX 0,25 mm a cada 24.000 km. A CTX 700N foi vendida com opção DCT no Brasil: verificar se a unidade tem embreagem manual (corrente 520) ou DCT (cardan). Disponibilidade nacional no Brasil: limitada — foram poucos anos de venda.',
  },
  {
    severity: 'OK',
    title: 'Posição de pilotagem cruiser (pé para frente): piloto fica mais recuado; em pilotagem urbana densa e manobras baixas, o comprimento maior da moto requer mais atenção ao espaço',
    body: 'A posição "sit-up and beg" da CTX 700N deixa os pés do piloto avançados, o banco baixo (750mm) e os braços estendidos para um guidão largo. Benefício: conforto superior em estrada longa. Desvantagem: comprimento total de 2.155mm (mais que a NC 700X com 2.100mm) — manobras em espaço apertado exigem mais cuidado. Para pilotos de estatura média (1,72-1,80m): posição ideal. Para pilotos baixos (<1,65m): banco a 750mm ajuda, mas o alcance ao chão pode ser limitado pelos pés avançados.',
  },
  {
    severity: 'OK',
    title: 'Peças: CTX 700N compartilha praticamente TUDO com a NC 700X (motor, transmissão, suspensão) — facilita manutenção; plásticos de carenagem são específicos da CTX',
    body: 'Para manutenção mecânica: usar as mesmas peças da NC 700X (motor compartilhado). Isso inclui: filtro de óleo HF204, pastilhas de freio FA196, corrente 520, vela LMAR8B-9. O que é específico da CTX 700N: carenagens laterais (estilo cruiser, diferentes visual), guidão mais largo, instrumentos ligeiramente diferentes. Pneus: CTX 700N usa dimensões diferentes da NC — verificar a plaqueta na própria moto (geralmente 130/70-18 F e 160/60-17 R na CTX vs 120/70-17 F da NC).',
  },
]

const CTX700N_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Peças de carroceria (carenagens, plásticos) da CTX 700N são difíceis de encontrar no Brasil — pouco volume vendido; importação dos EUA é a melhor opção para danos de queda',
    body: 'A CTX 700N teve vendas modestas no Brasil. Plásticos de carenagem são exclusivos e não intercambiáveis com a NC 700X. Em caso de queda com dano de carenagem: peças Honda OEM via importação (baratas nos EUA), ou reconstrução com fibra de vidro/resina por funileiro especializado em motos. Grupos de CTX 700 no Facebook Brasil podem ter peças de motos acidentadas. Para uso diário em cidade: protetor de motor é recomendado (R$200-400) para proteger o cárter em quedas laterais — com a posição cruiser, o motor fica mais exposto em quedas.',
  },
]

// ─── MAGNA 750 (VF750C, 1982–2003) ───────────────────────────────────────────

const MAGNA750_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor V4 748cc DOHC liquid-cooled (Honda VF750) — óleo 10W-40 JASO MA, 3,0-3,5 L com filtro; troca a cada 5.000 km; motor tem 16 válvulas (4 por cilindro × 4 cilindros)',
    body: 'A Honda Magna 750 (VF750C) tem motor V4 de 748cc com 4 cilindros em V de 90°, refrigerado a líquido, DOHC. 16 válvulas no total: 4 por cilindro. Motor de alta performance do início dos anos 80 que agia como "rebaixamento" do motor da CB750 para um cruiser. Óleo: 10W-40 JASO MA (motor com mais de 20 anos precisa de um pouco mais de viscosidade que os 10W-30 Honda recomenda — verificar no manual do ano específico). Capacidade: 3,0-3,5 L com filtro. Troca: a cada 5.000 km. Folga de válvulas: verificar no manual do ano (geração mais nova 1994-2003 tem folgas padronizadas, mais velha pode variar). Vela: NGK DCPR8E ou similar — 4 velas no total.',
  },
  {
    severity: 'OK',
    title: 'Transmissão por corrente 630 (Magna 750 geração 1982-1988) ou 530 (geração 1994-2003) — confirmar a pitch da corrente pelo número no link antes de comprar reposição',
    body: 'A Magna 750 original (1982-1988) usa corrente de passo 630 — mais robusta e pesada, difícil de encontrar no Brasil. A geração 1994-2003 usa corrente 530 — disponível, mas menos comum que o 520 padrão. Antes de comprar kit de corrente: confirmar a pitch (número de passo) pelo número gravado no link da corrente atual (ex: 530×102). Kits disponíveis: DID 530VX3 ou EK 530SR-O2. Coroa e pinhão específicos — verificar referência no catálogo da DID ou EK. Kit completo corrente+sprockets 530: R$300-500 importado. Para geração 630: importar dos EUA (rockymountainatvmc.com).',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas para Magna 750 clássica: importação dos EUA (eBay, All Balls, Rocky Mountain), grupos Honda V4 no Facebook Brasil; carburador Keihin (geração carburada) com kit de rebuild disponível',
    body: 'A Magna 750 tem mais de 20-30 anos de mercado e boa disponibilidade de peças importadas. Fontes: (1) eBay: "Honda VF750C parts" com filtro por ano/geração. Peças usadas em bom estado abundantes. (2) All Balls Racing (allballsracing.com): kits de rolamentos de roda, rolamentos de direção, retentores. (3) Rocky Mountain ATV: peças OEM Honda importadas. (4) Grupo Facebook "Honda V4 Brasil" / "Magna 750 Brasil". Peças que costumam falhar em Magnas velhas: juntas do cabeçote, retentores de bengala (35mm), rolamentos de roda, eletrodo de sonda lambda se houver, bomba de combustível (versões injetadas tardias). Carburador Keihin: kit de rebuild (float, agulha, boia, vedações) R$60-150 importado.',
  },
  {
    severity: 'OK',
    title: 'Sistema de arrefecimento do V4 750: 4 cilindros em V com 2 cabeçotes e 2 radiadores laterais — verificar ambos os radiadores; mangueiras com mais de 10 anos devem ser trocadas preventivamente',
    body: 'O motor V4 da Magna tem 2 bancos de cilindros: cada banco tem seu próprio cabeçote. O sistema de arrefecimento circula pelos 2 cabeçotes. Em alguns anos, há 2 radiadores menores (um de cada lado) vs 1 radiador central. Verificação de rotina: (1) Nível do reservatório de expansão. (2) Inspeção visual das mangueiras — ressecamento, inchaço, gotejamento. (3) Funcionamento do ventilador do radiador (ligar o motor, aguardar temperatura subir, checar se o ventilador aciona). Mangueiras com mais de 10 anos: trocar preventivamente mesmo sem rachaduras visíveis — borracha ressecada internamente. Anticongelante: OAT diluído 50/50.',
  },
]

const MAGNA750_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Problema histórico Honda VF750 (1982-1985): desgaste prematuro dos cams (árvores de came) — Honda fez recall da VF750 original; Magnas com menos de 30.000 km podem ter tido os cams trocados; verificar histórico',
    body: 'A Honda VF750 de 1982-1984 teve problema grave de desgaste prematuro das árvores de came (cams): o metal dos cams se desgastava em ~30.000 km, causando barulho metálico e falha do motor. A Honda fez campanha de recall nos EUA com substituição dos cams por versões de material melhorado. Para Magnas importadas com menos de 60.000 km de histórico desconhecido: verificar se os cams já foram trocados (cams originais: lisos; cams revisados: com entalhes de identificação). Sintoma de cam desgastado: "clack-clack" metálico ao acelerar, piora progressiva. Reparo: troca dos cams por peças revisadas ou aftermarket (Megacycle, R$300-600 importado).',
  },
  {
    severity: 'WARN',
    title: 'Carburadores Keihin da Magna 750 (versões carburadas) com verniz após parada longa — 4 carburadores em V precisam ser limpos simultaneamente; kit de rebuild econômico disponível',
    body: 'A Magna 750 carburada tem 4 carburadores Keihin (um por cilindro em V). Após parada >3 meses: todos os 4 podem ter verniz nos jatos. Sintoma: motor que não parte uniformemente ou "chuta" em certos cilindros; marcha lenta instável. Limpeza de todos os 4 simultâneos: R$400-800 em mão de obra especializada. Kit de rebuild para os 4 (juntas, agulhas, boia): R$200-400 importado. Preventivo: estabilizador de combustível (Sta-Bil) e drenar todos os 4 carburadores antes de guardar por mais de 2 meses. A Magna 750 foi uma das primeiras "maxi-cruisers" e a manutenção dos carburadores é conhecida pela comunidade.',
  },
  {
    severity: 'WARN',
    title: 'Retentores de bengala da Magna 750 (35mm): vida curta em motos com mais de 20 anos — substituir preventivamente junto com óleo de bengala se a moto foi comprada usada com histórico desconhecido',
    body: 'A Magna 750 usa bengala convencional de 35mm. Retentores de borracha com mais de 10-15 anos endurecem e trincam — mesmo sem uso intenso, o envelhecimento do elastômero causa vazamento. Se comprou uma Magna usada sem conhecer o histórico: troca preventiva dos retentores de bengala é recomendada. Retentores 35mm: ProX ou Ariete compatíveis — R$50-100 o par. Óleo de bengala: Honda SS-7 10W ou Motul Fork Oil 10W, ~200 mL por tubo (moto mais antiga usa volume menor). Haste da bengala: verificar se está riscada — haste riscada estraga retentores novos em poucas semanas.',
  },
]

// ─── DOMINATOR 650 (Honda NX 650, 1988–2002) — FIPE código 2801 ──────────────

const DOMINATOR_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Honda NX 650 Dominator — motor 644cc RFVC monocilíndrico, 4 válvulas radiais, refrigerado a ar; cadastrado como "850" em alguns registros DENATRAN; óleo 10W-40 JASO MA, 2,0 L',
    body: 'A Honda NX 650 Dominator (às vezes cadastrada como "Dominator 850" em sistemas DENATRAN/FIPE brasileiros por erro de classificação) tem motor monocilíndrico de 644cc com tecnologia RFVC (Radial Four-Valve Combustion Chamber): 4 válvulas dispostas radialmente, como a NX 350 Sahara, mas em versão maior. Potência: ~44-45 cv @ 6.000 rpm / Torque: ~53 N.m @ 5.000 rpm. Óleo: 10W-40 JASO MA, 1,95 L com filtro (1,7 L sem filtro). Troca: a cada 4.000 km. Vela: NGK DR8ES ou D8EA. Folga de válvulas: IN 0,10 mm / EX 0,12 mm com motor completamente frio. Peso seco: ~171 kg. Tanque: 13 L.',
  },
  {
    severity: 'OK',
    title: 'Motor monocilíndrico 644cc: vibração natural do "big single" — instalar peso nas extremidades do guidão (barra-ends) se vibração incomoda; normal para motores grandes monocilíndricos',
    body: 'O motor monocilíndrico de 644cc é um "big single" (grande monocilíndrico): vibra mais que twins ou quádruplos por natureza. Em certas faixas de RPM (3.500-5.000 rpm): vibração no guidão e banco é perceptível. É uma característica de design, não um defeito. Mitigações: (1) Barra-ends (pesos nas extremidades do guidão) de alumínio sólido reduzem vibração transmitida às mãos. (2) Assento com gel ou forro extra no banco. (3) Pilotar em RPM ligeiramente acima da faixa de vibração (acima de 5.000 rpm). Para pilotos vindos de motos menores (250cc-350cc): a Dominator vibra menos que a NX 350 em uso intenso; para pilotos de twins: vai notar a diferença.',
  },
  {
    severity: 'OK',
    title: 'Carburador Keihin CV 40mm da NX 650: drenar antes de parada longa; afogador (enricher) fica no corpo do carburador — não no guidão; jato principal ~#132; limpar a cada 15.000 km',
    body: 'A NX 650 usa carburador Keihin CV de 40mm. O afogador de partida a frio é do tipo "enricher" — não fecha o borboleta mas injeta combustível extra. Localização: botão pequeno no corpo do carburador (não no guidão, como em motos mais modernas). Para uso a frio: apertar o enricher para "ON", ligar o motor, aguardar 30-60 s, desligar o enricher gradualmente enquanto o motor aquece. Drenar carburador antes de parada longa: fechar a torneira de combustível (pet-cock) e ligar o motor até apagar espontaneamente. Verniz nos jatos: spray Keihin Carb Cleaner. Jato principal ~#132 de série (ajustar para altitude se acima de 2.000 m — kit DynoJet Stage 1-2 compatível com modelos 1990-1995). Kit de reparo Keihin em duas versões: 1988-1994 e 1995-2000 (verificar o ano antes de comprar).',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 — folga 20-25 mm; kit completo a cada 25.000-30.000 km; pinhão 15T / coroa 41T de série; DID 520VX3 X-Ring para reposição',
    body: 'A NX 650 Dominator usa corrente 520 (mesmo passo da NX 350 Sahara). Lubrificação: a cada 500-700 km (off-road: após cada saída em terra). Folga: 20-25 mm no ponto mais tenso. Kit de corrente: DID 520VX3 X-Ring (resistência de ruptura 8.210 lbs, 32% mais vida que série VO) + coroa 41T + pinhão 15T. Para uso misto estrada+trilha: troca a cada 25.000 km. Para uso predominante off-road pesado: 18.000-22.000 km. Avaliar estado dos sprockets pelos dentes em forma de "tubarão" (shark-fin) = desgaste avançado. Pinhão de alumínio aftermarket: NÃO recomendado para trilha — desgasta 3-4x mais rápido que aço.',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas NX 650 Dominator: mercado europeu (Alemanha, UK, Espanha) tem grande estoque — Dominator foi um sucesso na Europa (1988-2002); comunidades ativas em forum.nx650.de e XRV.org.uk',
    body: 'A NX 650 Dominator foi sucesso de vendas na Europa (especialmente Alemanha e Espanha). Para peças originais Honda descontinuadas no Brasil: (1) eBay.de ou eBay.co.uk: buscar "Honda NX 650 Dominator parts". (2) Louis Moto (louis.de): grande rede alemã. (3) Wemoto (wemoto.com): UK, excelente estoque. Peças alternativas confirmadas: filtro de óleo Hiflofiltro HF113 (1988-2000) ou HF112 (1998+); pistão ProX ou Wiseco 100mm; retentores bengala ProX 43mm; rolamentos All Balls kit F+R. Comunidades de referência: forum.nx650.de (alemão, muito ativo) e XRV.org.uk. Para busca de peças OEM: número de peça do kickstarter ratchet = 28213KF0000 (compatível com XL 600/650 — verificar antes).',
  },
  {
    severity: 'OK',
    title: 'Sistema descompressor automático (ADS): mecanismo centrífugo na árvore de cames facilita partida a kick em motor frio — quando falha, kick-back pode ser violento; inspecionar se partida ficou mais difícil',
    body: 'A NX 650 Dominator tem descompressor automático (ADS — Automatic Decompressor System) na árvore de cames. Funcionamento: pesos centrífugos abrem ligeiramente a válvula de escape no PMS durante o kick, reduzindo a compressão para facilitar a partida. Em marcha: pesos se afastam por inércia, motor opera com compressão total. Quando o ADS falha: (a) Molas enfraquecidas = descompressor sempre ativo → motor sem compressão, não pega. (b) Mecanismo travado = descompressor sempre inativo → kick-back violento (risco de lesão de tornozelo e joelho). Sintoma de falha iminente: partida a frio ficou progressivamente mais difícil ao longo dos meses, mesmo com técnica correta. Diagnóstico: com motor frio e chave na ignição, levar o kick lentamente — deve sentir resistência de compressão que "cede" levemente no PMS (ADS funcionando). Reparo: requer abertura da tampa da árvore de cames.',
  },
  {
    severity: 'OK',
    title: 'Torneira de combustível (pet-cock) 3 posições: ON (uso normal) / RES (reserva ~2,5 L) / PRI (cebador, carburador frio) — SEMPRE fechar em OFF ao guardar; verniz resseca diafragma da torneira',
    body: 'A NX 650 Dominator tem torneira de combustível com 3 posições e diafragma a vácuo: ON (uso normal), RES (reserva ~2,5 L quando sensor de vazio não aspira mais em ON) e PRI (cebador/primer — abre por gravidade sem vácuo, para carburador completamente seco). Uso correto: (1) Sempre em ON durante uso normal. (2) Ao perceber falta de combustível: mudar para RES e ir ao posto imediatamente. (3) PRI: apenas para encher carburador após troca completa do combustível ou longa parada. (4) Ao guardar >30 dias: fechar em OFF (se houver essa posição) ou drenar carburador em RES. Problema comum: o diafragma de borracha da torneira resseca e racha com gasolina aditivada ou longa parada → combustível goteja continuamente (perigo de incêndio). Kit de reparo da torneira (diafragma+vedações): disponível em loja de motos trail ou importar.',
  },
  {
    severity: 'OK',
    title: 'Bateria 12V 8Ah — a NX 650 tem partida elétrica? NÃO; é kick-only; bateria alimenta apenas ignição/luzes; verificar tensão: >12,6V parada / 13,5-14,5V em marcha',
    body: 'A NX 650 Dominator tem SOMENTE kickstarter — não há motor de partida elétrica. A bateria 12V 8Ah (OEM) alimenta: ignição eletrônica, luz de painel, faróis, buzina. Verificação simples: multímetro nos terminais com motor desligado (deve marcar >12,6 V) e com motor acelerado em ~3.000 rpm (deve marcar 13,5-14,5 V). Se marcar <13 V em marcha: regulador/retificador com defeito (ver problemas crônicos). Substituição de bateria: AGM selada 12V 8Ah (ex: Yuasa YTX9-BS ou equivalente) — dimensões: 150×87×105mm. Opção lithium: bateria Shorai LFX09A1-BS12 (5,6 Ah, ~700g vs 2,5 kg da AGM) — partida mais rápida no frio, vida útil maior, mas mais cara. Nunca usar bateria de carro ou bateria maior que o compartimento permita.',
  },
  {
    severity: 'WARN',
    title: 'Tensor da corrente de distribuição automático: ruído metálico de "chocalho" no topo do motor (especialmente a frio) indica tensor engripado ou corrente de distribuição esticada — não ignorar',
    body: 'A NX 650 Dominator usa tensor automático da corrente de distribuição (cam chain tensioner). O tensor empurra a guia da corrente por mola + pressão de óleo. Problema: com o tempo o êmbolo do tensor pode engravar (travar estendido ou recolhido). Sintomas: (1) Ruído metálico de "batida" ou "chocalho" no topo do motor, principalmente na partida a frio ou em baixa rotação. (2) Motor funciona, mas com ruído persistente. Risco de ignorar: corrente distribuição esticada pode pular dente na coroa do comando e destruir o motor (motor interferente). Diagnóstico: com motor quente, desacelerar de 5.000 rpm para marcha lenta — se houver batida metálica suave que desaparece, é tensor. Solução: trocar o tensor automático (peça OEM Honda). NÃO tentar ajustar manualmente — o tensor automático não tem ajuste externo.',
  },
  {
    severity: 'OK',
    title: 'Modificações populares na Dominator: protetor de carter (essencial para trilha), guidão mais alto (+40mm com riser), pneus enduro Continental TKC 80 ou Michelin Anakee Wild — moto muito versátil para customização',
    body: 'A NX 650 Dominator tem grande comunidade de customização especialmente na Europa. Modificações mais comuns: (1) Protetor de carter de alumínio (3-5mm): indispensável para trilha; qualquer fabricante de peças trail para NX 650 oferece. (2) Guidão mais alto: risers de +40mm alargam o espaço para pilotos altos e melhoram ergonomia off-road; pode exigir cabos de embreagem e freio mais longos. (3) Pneus enduro: opções confirmadas para 90/90-21 (F) e 130/80-17 (R) — Continental TKC 80, Michelin Anakee Wild, Metzeler Enduro 3 Sahara, Dunlop Trailmax, Michelin K60 Scout. (4) Amortecedor traseiro: YSS MZ456-345TRL ou MZ456-370TRL substituem o original com ajuste de pré-carga e rebote — diferença significativa em trilha. (5) Escapamento: FMF, Arrow ou Akrapovic para NX 650 melhoram a sonoridade e reduzem ~3 kg; carburador pode precisar de rejeitamento (jato ligeiramente maior).',
  },
]

const DOMINATOR_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Kickstarter da NX 650 "bate de volta" se não passar pelo PMS — técnica correta é obrigatória; com ADS funcionando o kick é mais suave, mas falha do ADS torna o kick-back perigoso',
    body: 'A NX 650 tem apenas kickstarter (sem partida elétrica). O descompressor automático (ADS) na árvore de cames facilita a partida, mas quando falha o kick-back pode causar lesão grave. Técnica correta (sempre): (1) Chave na ignição. (2) Apertar o enricher. (3) Levar o kick lentamente até encontrar resistência total (PMS de compressão). (4) Recuar o kick 5-10 cm. (5) Dar o kick com força e velocidade rápida num movimento único. Erros comuns: (a) Kick sem passar pelo PMS = o motor empurra de volta com força. (b) Kick lento = resistência do motor joga a perna de volta. Se a partida ficou progressivamente mais difícil: inspecionar o ADS (ver macetes). Em motores frios no inverno: 3-5 kicks é normal.',
  },
  {
    severity: 'WARN',
    title: 'Regulador/retificador (RR) falha silenciosamente — sintoma: bateria nova que descarrega em dias; tensão em marcha <13 V; solução: Tecnium RD08 ou remanufaturado importado',
    body: 'O regulador/retificador é o componente elétrico que mais falha na NX 650 Dominator após uso prolongado. Sintomas: (1) Bateria nova que descarrega em 2-3 dias mesmo com moto rodando. (2) Luz de painel fraca ou piscando. (3) Tensão medida nos terminais da bateria com motor a ~3.000 rpm abaixo de 13 V (correto: 13,5-14,5 V). (4) Falha aleatória de ignição em marcha. Diagnóstico: multímetro nos terminais da bateria com motor ligado — se <13 V, RR com defeito. Substituição: Tecnium RD02 ou RD08 (importado, R$150-250) compatível com NX 650. Ou remanufaturado em especialistas de bobinagem de motos. Preventivo: substituir após 60.000 km ou 10 anos, o que vier primeiro, sem esperar falha total.',
  },
  {
    severity: 'WARN',
    title: 'Bengala convencional 43mm: retentores desgastam em uso off-road intenso; haste riscada invalida retentor novo em 2.000-3.000 km; inspeção a cada 10.000 km em trilha',
    body: 'A NX 650 usa bengala dianteira convencional de 43mm (não invertida). Para uso em trilha: os retentores sofrem mais que em uso de estrada. Sintoma: névoa oleosa na haste da bengala, depois gota de óleo acumulando. Troca de retentores: ProX 43mm (R$60-100 o par), Ariete 43mm. Óleo de bengala: Honda SS-8 ou equivalente 10W, ~300 mL por tubo. Haste riscada: lixar com lixa de aço inox muito fina (1500-2000) ou retificar em torno antes de instalar retentores novos — haste com risca estraga o retentor em 2.000-3.000 km. Inspeção preventiva: a cada 15.000 km (asfalto) ou 10.000 km (off-road regular).',
  },
  {
    severity: 'WARN',
    title: 'Consumo de óleo elevado (>500 mL por 3.000 km) em motores com mais de 60.000 km: retentores de válvulas desgastados; verificar nível a cada 1.000 km',
    body: 'A NX 650 Dominator com muita quilometragem desenvolve consumo de óleo pelo desgaste dos retentores de válvulas (valve stem seals). Sintoma: fumaça azul no escapamento ao ligar o motor a frio (retentores de entrada de válvulas deixando óleo entrar na câmara de combustão durante o repouso). Consumo normal: <200 mL por 3.000 km. Consumo com problema: >500 mL por 3.000 km. Solução definitiva: troca dos retentores de válvulas com cabeçote removido — R$600-1.200 em retífica especializada. Paliativo: usar óleo de viscosidade ligeiramente maior (10W-50 em vez de 10W-40) reduz consumo sem resolver o problema de raiz.',
  },
  {
    severity: 'WARN',
    title: 'Mecanismo ratchet do kickstarter desgasta após uso intenso — o kick "escorrega" sem rotacionar o motor; peça OEM Honda nº 28213KF0000; XL 600/650 pode ser compatível (verificar)',
    body: 'O mecanismo ratchet interno do eixo do kickstarter (pawl + mola) se desgasta após anos de uso intenso, especialmente em motores com ADS mal calibrado (que exigem mais força). Sintoma: ao dar o kick, a alavanca desce sem transmitir força ao motor — o mecanismo "patina" internamente. Diagnóstico: retirar a tampa lateral do motor para inspecionar o ratchet. Peça OEM: nº 28213KF0000 (pawl do kickstarter). Compatibilidade com XL 600 ou XL 650 reportada em fóruns (forum.nx650.de), mas verificar dimensões antes de comprar. Preventivo: não dar kicks com pouca força ou kicks "meios" — sempre executar o kick completo para preservar o ratchet.',
  },
  {
    severity: 'WARN',
    title: 'Tensor automático da corrente de distribuição pode engravar — ruído de batida metálica no topo do motor; ignorar pode destruir o motor (corrente pula dente)',
    body: 'O tensor automático da corrente de distribuição (cam chain tensioner) pode engravar com óleo envelhecido ou sujeira interna. Quando engripa recolhido: corrente distribuidora fica frouxa → ruído de chocalho → risco de pular dente na coroa da árvore de cames → sincronismo perdido → válvulas batem no pistão (motor destruído). Quando engripa estendido: corrente hiperestendida → barulho e desgaste acelerado. Sintoma: batida metálica rítmica ou "chocalho" no topo do motor, principalmente a frio ou em baixa rotação; piora progressivamente. Diagnóstico: ruído que desaparece após 2-3 minutos com motor quente pode ser tensor. Solução: substituir tensor com peça OEM Honda. Preventivo: troca de óleo em dia e nunca ultrapassar 5.000 km sem verificar o nível — tensor usa pressão de óleo para funcionar.',
  },
  {
    severity: 'WARN',
    title: 'Vedação (retentor) do eixo do pinhão vaza óleo para a corrente — óleo de câmbio preto na corrente mesmo com lubrificação em dia; retentor desgastado ou ressecado',
    body: 'A NX 650 Dominator pode desenvolver vazamento no retentor (oil seal) do eixo de saída da transmissão onde o pinhão é montado. Sintoma: corrente úmida com líquido escuro (óleo de motor misturado com graxa) mesmo sem lubrificar recentemente; mancha de óleo no pinhão e na parte interna da proteção de corrente. Consequência: além de poluir a corrente, o vazamento pode indicar nível de óleo baixando gradualmente. Diagnóstico: com motor quente e desligado, inspecionar o retentor atrás do pinhão — óleo escorrendo = retentor furado. Solução: trocar o retentor (oil seal do eixo primário de transmissão) — trabalho requer remoção do pinhão e abertura da tampa lateral. Custo: R$20-50 em peça + mão de obra. NÃO deixar sem trocar — óleo no disco de freio traseiro é perigo imediato.',
  },
  {
    severity: 'OK',
    title: 'Amortecedor traseiro original limita o potencial da Dominator em trilha pesada — vaza fluido após uso intenso em off-road; upgrade YSS MZ456 resolve com ajuste de rebote e pré-carga',
    body: 'O amortecedor traseiro original da NX 650 Dominator foi projetado para uso misto estrada/leve off-road. Em trilha pesada e regular: o fluido interno vaza pelas vedações após 20.000-30.000 km de uso intenso. Sintoma: moto afunda acentuadamente em buracos, perda de rebote progressiva, mancha de óleo no amortecedor. Reparo do original: revisão com troca de vedações (algumas oficinas de suspensão fazem, R$150-300). Upgrade recomendado: YSS MZ456-345TRL-12-85 ou MZ456-370TRL-05-85 (modelos com ajuste de pré-carga e rebote, diâmetro 45mm, específicos para NX 650). Diferença percebida: significativa em trilha, melhor conforto também em asfalto. Custo: R$400-700 importado.',
  },
]

// ─── MANUTENÇÃO ───────────────────────────────────────────────────────────────

const GOLDWING_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'GOLD WING 1500/ 1800', yearFrom: 1988, yearTo: 2017, component: 'Óleo motor 10W-30 JASO MA (4,0-4,3 L com filtro)', intervalKm: 8000, intervalMonths: 12, notes: 'GL1500: 4,0 L. GL1800: 4,3 L. Sintético pode esticar para 10.000 km. Filtro: sempre junto. Honda HP4 10W-30 ou Mobil 1 Moto.', priority: 'CRITICAL', order: 1 },
  { modelName: 'GOLD WING 1500/ 1800', yearFrom: 1988, yearTo: 2017, component: 'Óleo do cardan (80W-90 GL-5) — verificação e troca', intervalKm: 24000, intervalMonths: null, notes: 'Verificar nível a cada 12.000 km. Troca: 24.000 km. ~180-200 mL. Honda Cardan Shaft Oil ou GL-5 de moto (não de carro — ataca vedações).', priority: 'HIGH', order: 2 },
  { modelName: 'GOLD WING 1500/ 1800', yearFrom: 1988, yearTo: 2000, component: 'Correia de sincronismo (timing belt) GL1500 — troca OBRIGATÓRIA', intervalKm: 32000, intervalMonths: 48, notes: 'CRÍTICO: ruptura = motor destruído. A cada 32.000 km OU 4 anos. GL1800 usa correntes (não correia) — este item só para GL1500. Custo: R$900-1.800.', priority: 'CRITICAL', order: 3 },
  { modelName: 'GOLD WING 1500/ 1800', yearFrom: 1988, yearTo: 2017, component: 'Velas de ignição (6 velas — GL1500/GL1800)', intervalKm: 20000, intervalMonths: null, notes: 'Sempre trocar todas as 6 ao mesmo tempo. Iridium: 32.000 km. Acesso: requer remoção da carenagem frontal — trabalho extenso.', priority: 'HIGH', order: 4 },
  { modelName: 'GOLD WING 1500/ 1800', yearFrom: 1988, yearTo: 2017, component: 'Filtro de ar — troca', intervalKm: 20000, intervalMonths: null, notes: 'Elemento de papel. OEM Honda. Acesso: sob a carenagem frontal. K&N disponível para GL1800 (lavável).', priority: 'MEDIUM', order: 5 },
  { modelName: 'GOLD WING 1500/ 1800', yearFrom: 1988, yearTo: 2017, component: 'Líquido de arrefecimento — troca', intervalKm: null, intervalMonths: 36, notes: 'Honda Ultra-Cool OAT 50/50. Verificar nível mensalmente. Mangueiras: inspeção anual — trocar após 8 anos.', priority: 'HIGH', order: 6 },
  { modelName: 'GOLD WING 1500/ 1800', yearFrom: 1988, yearTo: 2017, component: 'Fluido de freio DOT 4 (F + R)', intervalKm: null, intervalMonths: 24, notes: 'GL1800 tem ABS: purge completo necessário. DOT 4. Em GL1500 sem ABS: purge manual simples.', priority: 'HIGH', order: 7 },
  { modelName: 'GOLD WING 1500/ 1800', yearFrom: 1988, yearTo: 2017, component: 'Pneus touring — inspeção de desgaste', intervalKm: 5000, intervalMonths: null, notes: 'Traseiro: vida ~12.000-15.000 km (peso 390 kg). Dianteiro: ~18.000-22.000 km. Sulco mínimo: 1,6 mm. Nunca abaixo da pressão especificada.', priority: 'HIGH', order: 8 },
  { modelName: 'GOLD WING 1500/ 1800', yearFrom: 1988, yearTo: 2017, component: 'Válvulas — inspeção', intervalKm: 20000, intervalMonths: null, notes: 'Flat-six: 6 cilindros × válvulas. Motor FRIO. Serviço extenso em oficina especializada. Custo: R$600-1.200.', priority: 'HIGH', order: 9 },
  { modelName: 'GOLD WING 1500/ 1800', yearFrom: 2001, yearTo: 2017, component: 'GL1500: carburadores (6 unidades) — limpeza', intervalKm: 20000, intervalMonths: null, notes: 'Só GL1500. Limpeza dos 6 carburadores simultâneos. Drenar carburador antes de guardar >2 meses. Estabilizador de combustível preventivo.', priority: 'HIGH', order: 10 },
]

const GOLDWING_TOUR_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'GOLD WING TOUR 1800', yearFrom: 2018, yearTo: null, component: 'Óleo motor 10W-30 JASO MA (7,5 L com filtro — motor 2018+ maior)', intervalKm: 8000, intervalMonths: 12, notes: 'Geração 6 (2018+) tem motor ligeiramente revisado com maior capacidade. Sempre sintético. Honda HP4 10W-30 ou Motul 7100 10W-30.', priority: 'CRITICAL', order: 1 },
  { modelName: 'GOLD WING TOUR 1800', yearFrom: 2018, yearTo: null, component: 'Fluido DCT — troca (versão DCT)', intervalKm: 24000, intervalMonths: null, notes: 'SOMENTE Honda Premium DCT Fluid — NUNCA ATF de carro. ~2,4 L. Risco de destruir câmbio: R$8.000-25.000.', priority: 'CRITICAL', order: 2 },
  { modelName: 'GOLD WING TOUR 1800', yearFrom: 2018, yearTo: null, component: 'Óleo cardan ou fluido cardan (versão cardan)', intervalKm: 24000, intervalMonths: null, notes: 'GL-5 80W-90 de moto. ~200 mL. Verificar nível a cada 12.000 km.', priority: 'HIGH', order: 3 },
  { modelName: 'GOLD WING TOUR 1800', yearFrom: 2018, yearTo: null, component: 'Velas iridium (6 unidades)', intervalKm: 32000, intervalMonths: null, notes: 'Trocar todas as 6 juntas. Acesso: carenagem frontal. Trabalho extenso — reservar 4-5 horas.', priority: 'HIGH', order: 4 },
  { modelName: 'GOLD WING TOUR 1800', yearFrom: 2018, yearTo: null, component: 'Líquido de arrefecimento — troca', intervalKm: null, intervalMonths: 36, notes: 'OAT 50/50 água destilada. Verificar nível mensalmente.', priority: 'HIGH', order: 5 },
  { modelName: 'GOLD WING TOUR 1800', yearFrom: 2018, yearTo: null, component: 'Sistema ABS — verificação (anel dentado e sensor)', intervalKm: null, intervalMonths: 12, notes: 'Anual ou se ABS acionar em linha reta. Limpar anel dentado. Verificar gap do sensor.', priority: 'MEDIUM', order: 6 },
  { modelName: 'GOLD WING TOUR 1800', yearFrom: 2018, yearTo: null, component: 'Airbag (versão com airbag) — inspeção do sistema', intervalKm: null, intervalMonths: 72, notes: 'A cada 6 anos em concessionária Honda. Inflador com vida útil de 12 anos. Não tentar inspecionar sem equipamento da concessionária.', priority: 'HIGH', order: 7 },
]

const NC700X_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'NC 700 X/ 700X ABS', yearFrom: 2012, yearTo: 2015, component: 'Óleo 10W-30 JASO MA (3,0 L com filtro)', intervalKm: 6000, intervalMonths: 6, notes: 'Hiflofiltro HF204 compatível (R$20-35). Motor de baixo estresse — 6.000 km é adequado. Trânsito pesado: 4.000 km.', priority: 'CRITICAL', order: 1 },
  { modelName: 'NC 700 X/ 700X ABS', yearFrom: 2012, yearTo: 2015, component: 'Vela NGK LMAR8B-9 — troca', intervalKm: 8000, intervalMonths: 12, notes: 'Confirmar referência no manual do ano. Torque 14 N.m.', priority: 'HIGH', order: 2 },
  { modelName: 'NC 700 X/ 700X ABS', yearFrom: 2012, yearTo: 2015, component: 'Filtro de ar — inspeção e troca', intervalKm: 12000, intervalMonths: 24, notes: 'Elemento de papel. Soprar de fora para dentro. Trocar se muito escurecido.', priority: 'MEDIUM', order: 3 },
  { modelName: 'NC 700 X/ 700X ABS', yearFrom: 2012, yearTo: 2015, component: 'Corrente 520 (versão manual) — lubrificação e tensão', intervalKm: 500, intervalMonths: null, notes: 'Folga: 20-25 mm. DID 520VX3. Versão DCT: verificar fluido cardan (GL-5) — sem corrente.', priority: 'HIGH', order: 4 },
  { modelName: 'NC 700 X/ 700X ABS', yearFrom: 2012, yearTo: 2015, component: 'Válvulas (IN 0,15 / EX 0,25 mm) — inspeção', intervalKm: 24000, intervalMonths: null, notes: 'Motor SOHC derivado de carro — válvulas têm vida longa. Motor FRIO. Oficina especializada.', priority: 'HIGH', order: 5 },
  { modelName: 'NC 700 X/ 700X ABS', yearFrom: 2012, yearTo: 2015, component: 'Fluido de freio DOT 4 + ABS', intervalKm: null, intervalMonths: 24, notes: 'Versão ABS: purge completo necessário. Versão sem ABS: purge simples.', priority: 'HIGH', order: 6 },
  { modelName: 'NC 700 X/ 700X ABS', yearFrom: 2012, yearTo: 2015, component: 'Kit corrente + coroa + pinhão (versão manual)', intervalKm: 25000, intervalMonths: null, notes: 'DID 520VX3. Nunca trocar só corrente sem sprockets.', priority: 'HIGH', order: 7 },
]

const CTX700N_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CTX 700N', yearFrom: 2014, yearTo: 2017, component: 'Óleo 10W-30 JASO MA (3,0 L com filtro)', intervalKm: 6000, intervalMonths: 6, notes: 'Mesmo motor da NC 700X. Hiflofiltro HF204 compatível.', priority: 'CRITICAL', order: 1 },
  { modelName: 'CTX 700N', yearFrom: 2014, yearTo: 2017, component: 'Vela NGK LMAR8B-9', intervalKm: 8000, intervalMonths: 12, notes: 'Confirmar referência no manual. Torque 14 N.m.', priority: 'HIGH', order: 2 },
  { modelName: 'CTX 700N', yearFrom: 2014, yearTo: 2017, component: 'Corrente 520 (versão manual) ou fluido cardan (DCT)', intervalKm: 500, intervalMonths: null, notes: 'Manual: corrente 520, folga 20-25 mm. DCT: fluido cardan GL-5 a cada 24.000 km.', priority: 'HIGH', order: 3 },
  { modelName: 'CTX 700N', yearFrom: 2014, yearTo: 2017, component: 'Válvulas (IN 0,15 / EX 0,25 mm) — inspeção', intervalKm: 24000, intervalMonths: null, notes: 'Motor FRIO. Motor compartilhado com NC 700X — mesmo intervalo.', priority: 'HIGH', order: 4 },
  { modelName: 'CTX 700N', yearFrom: 2014, yearTo: 2017, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'DOT 4. Purge completo.', priority: 'HIGH', order: 5 },
]

const MAGNA750_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'MAGNA 750', yearFrom: 1982, yearTo: 2003, component: 'Óleo 10W-40 JASO MA (3,0-3,5 L com filtro)', intervalKm: 5000, intervalMonths: 6, notes: 'Motor V4 de alta performance. 10W-40 para motores com mais de 20 anos. 4 velas no total.', priority: 'CRITICAL', order: 1 },
  { modelName: 'MAGNA 750', yearFrom: 1982, yearTo: 2003, component: 'Velas (4 unidades — V4)', intervalKm: 10000, intervalMonths: 12, notes: 'NGK DCPR8E ou similar (confirmar por ano). Trocar as 4 juntas. Torque 12 N.m.', priority: 'HIGH', order: 2 },
  { modelName: 'MAGNA 750', yearFrom: 1982, yearTo: 2003, component: 'Carburadores Keihin (4 unidades) — limpeza', intervalKm: 15000, intervalMonths: 24, notes: 'Drenar antes de guardar >2 meses. Verniz nos 4 simultâneos é problema comum. Estabilizador Sta-Bil preventivo.', priority: 'HIGH', order: 3 },
  { modelName: 'MAGNA 750', yearFrom: 1982, yearTo: 2003, component: 'Corrente 530 (ou 630 nas mais antigas) — lubrificação e tensão', intervalKm: 500, intervalMonths: null, notes: 'Confirmar pitch pelo número no link. DID 530VX3. Folga: 20-25 mm.', priority: 'HIGH', order: 4 },
  { modelName: 'MAGNA 750', yearFrom: 1982, yearTo: 2003, component: 'Válvulas (16 válvulas — V4 DOHC) — inspeção', intervalKm: 20000, intervalMonths: null, notes: '4 cilindros × 4 válvulas = 16 no total. Motor FRIO. Trabalho extenso em oficina especializada.', priority: 'HIGH', order: 5 },
  { modelName: 'MAGNA 750', yearFrom: 1982, yearTo: 2003, component: 'Líquido de arrefecimento + mangueiras', intervalKm: 24000, intervalMonths: 24, notes: 'OAT 50/50 água destilada. Mangueiras com >10 anos: trocar preventivamente. 2 radiadores (um por banco).', priority: 'HIGH', order: 6 },
  { modelName: 'MAGNA 750', yearFrom: 1982, yearTo: 2003, component: 'Retentores de bengala 35mm — inspeção', intervalKm: 15000, intervalMonths: null, notes: 'Moto com >20 anos: trocar preventivamente. ProX ou Ariete 35mm. Haste: verificar riscos antes de instalar retentores.', priority: 'MEDIUM', order: 7 },
]

const DOMINATOR_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'DOMINATOR 650', yearFrom: 1988, yearTo: 2002, component: 'Óleo 10W-40 JASO MA (1,95 L com filtro / 1,7 L sem)', intervalKm: 4000, intervalMonths: 6, notes: 'Motor RFVC 644cc. Filtro: Hiflofiltro HF113 (1988-2000) ou HF112 (1998+). Óleo sujo destrói tensor de corrente. Trânsito pesado: 3.000 km.', priority: 'CRITICAL', order: 1 },
  { modelName: 'DOMINATOR 650', yearFrom: 1988, yearTo: 2002, component: 'Vela NGK DR8ES ou D8EA — gap 0,8-0,9 mm', intervalKm: 8000, intervalMonths: 12, notes: 'DR8ES (resistiva, preferencial). Torque: 12 N.m. Vela branca = mistura pobre; preta = rica ou filtro sujo.', priority: 'HIGH', order: 2 },
  { modelName: 'DOMINATOR 650', yearFrom: 1988, yearTo: 2002, component: 'Válvulas RFVC (IN 0,10 / EX 0,12 mm) — inspeção e ajuste', intervalKm: 12000, intervalMonths: 24, notes: 'Motor COMPLETAMENTE frio. 4 válvulas radiais. Parafuso+contra-porca (não calços). Torque contra-porca: 18 N.m. Válvulas fora do ponto: consumo sobe, compressão cai.', priority: 'CRITICAL', order: 3 },
  { modelName: 'DOMINATOR 650', yearFrom: 1988, yearTo: 2002, component: 'Carburador Keihin CV 40mm — limpeza de jatos', intervalKm: 15000, intervalMonths: 24, notes: 'Drenar antes de parada >30 dias. Jato principal ~#132. Enricher no corpo do carburador. Kit reparo Keihin: 1988-94 e 1995-2000 são versões diferentes.', priority: 'HIGH', order: 4 },
  { modelName: 'DOMINATOR 650', yearFrom: 1988, yearTo: 2002, component: 'Filtro de ar (espuma) — limpeza e impregnação', intervalKm: 6000, intervalMonths: 6, notes: 'Lavar com sabão neutro, secar completamente, impregnar com óleo de filtro. Trocar a cada 12.000 km. Espuma que se desintegra ao toque: trocar imediatamente.', priority: 'HIGH', order: 5 },
  { modelName: 'DOMINATOR 650', yearFrom: 1988, yearTo: 2002, component: 'Corrente 520 — lubrificação e tensão (20-25 mm)', intervalKm: 500, intervalMonths: null, notes: 'Pinhão 15T / coroa 41T de série. DID 520VX3 X-Ring para reposição. Off-road: lubrificar após cada saída em terra. Nunca usar WD-40 como lubrificante.', priority: 'HIGH', order: 6 },
  { modelName: 'DOMINATOR 650', yearFrom: 1988, yearTo: 2002, component: 'Kit corrente 520 completo (corrente + coroa 41T + pinhão 15T)', intervalKm: 25000, intervalMonths: null, notes: 'Off-road intenso: 18.000-22.000 km. Nunca trocar só a corrente sem os sprockets. DID 520VX3 + sprockets aço.', priority: 'HIGH', order: 7 },
  { modelName: 'DOMINATOR 650', yearFrom: 1988, yearTo: 2002, component: 'Tensor da corrente de distribuição — verificação', intervalKm: 12000, intervalMonths: 24, notes: 'Tensor automático usa pressão de óleo. Ruído de batida no topo do motor = tensor engripado. Substituir com peça OEM Honda. Troca de óleo em dia é preventivo essencial.', priority: 'HIGH', order: 8 },
  { modelName: 'DOMINATOR 650', yearFrom: 1988, yearTo: 2002, component: 'Retentores bengala convencional 43mm — inspeção', intervalKm: 15000, intervalMonths: null, notes: 'Off-road regular: verificar a cada 10.000 km. ProX 43mm compatível. Óleo bengala: SS-8 10W, ~300 mL/tubo. Haste riscada: lixar (1500-2000) antes de instalar retentor.', priority: 'MEDIUM', order: 9 },
  { modelName: 'DOMINATOR 650', yearFrom: 1988, yearTo: 2002, component: 'Fluido de freio DOT 4 (F + R)', intervalKm: null, intervalMonths: 24, notes: 'DOT 4. Off-road exige fluido em bom estado. Verificar nível mensalmente. Trocar a cada 2 anos independente de km.', priority: 'HIGH', order: 10 },
  { modelName: 'DOMINATOR 650', yearFrom: 1988, yearTo: 2002, component: 'Rolamentos de roda — inspeção', intervalKm: 12000, intervalMonths: 12, notes: 'Uso off-road frequente: verificar a cada 8.000 km. Teste: levantar roda e chacoalhar lateralmente (folga = rolamento gasto). All Balls kit F+R disponível.', priority: 'MEDIUM', order: 11 },
  { modelName: 'DOMINATOR 650', yearFrom: 1988, yearTo: 2002, component: 'Bateria 12V 8Ah — verificação semestral', intervalKm: null, intervalMonths: 6, notes: '>12,6 V parada / 13,5-14,5 V em marcha. <13 V em marcha = regulador/retificador com defeito. Yuasa YTX9-BS como substituta. Lítio: Shorai LFX09A1-BS12.', priority: 'MEDIUM', order: 12 },
  { modelName: 'DOMINATOR 650', yearFrom: 1988, yearTo: 2002, component: 'Regulador/retificador — inspeção de tensão de carga', intervalKm: null, intervalMonths: 12, notes: 'Verificar tensão anualmente com multímetro em marcha. Substituição preventiva após 60.000 km ou 10 anos. Substituto: Tecnium RD08.', priority: 'HIGH', order: 13 },
]

// ─── Calibragens ──────────────────────────────────────────────────────────────

const tirePressures = [
  {
    modelName: 'GOLD WING 1500/ 1800', yearFrom: 1988, yearTo: 2017,
    tireSize: '130/70-18 (F) · 180/60-16 (R)',
    frontPsi: 36, rearPsi: 41, frontPsiLoad: 41, rearPsiLoad: 45,
    sparePsi: null,
    notes: 'Com garupa + bagagem total: F 41 / R 45 PSI. Moto pesada (390 kg) — nunca calibrar abaixo de 33 PSI. Verificar sempre com pneu FRIO.',
  },
  {
    modelName: 'GOLD WING TOUR 1800', yearFrom: 2018, yearTo: null,
    tireSize: '130/70-18 (F) · 200/55-16 (R)',
    frontPsi: 36, rearPsi: 41, frontPsiLoad: 41, rearPsiLoad: 45,
    sparePsi: null,
    notes: 'Geração 2018+: pneu traseiro 200mm (mais largo). Com garupa e bagagem: F 41 / R 45 PSI. Verificar plaqueta na própria moto.',
  },
  {
    modelName: 'NC 700 X/ 700X ABS', yearFrom: 2012, yearTo: 2015,
    tireSize: '120/70-17 (F) · 160/60-17 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 33, rearPsiLoad: 36,
    sparePsi: null,
    notes: 'Com garupa: F 33 / R 36 PSI. Pneus padrão naked 17" — ampla disponibilidade. Verificar pressão semanalmente em uso diário.',
  },
  {
    modelName: 'CTX 700N', yearFrom: 2014, yearTo: 2017,
    tireSize: '130/70-18 (F) · 160/60-17 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 33, rearPsiLoad: 36,
    sparePsi: null,
    notes: 'Pneu dianteiro 18" (maior que NC 700X). Com garupa: R 36 PSI. Verificar plaqueta na moto para confirmação.',
  },
  {
    modelName: 'MAGNA 750', yearFrom: 1982, yearTo: 2003,
    tireSize: '110/90-18 (F) · 150/80-16 (R)',
    frontPsi: 33, rearPsi: 36, frontPsiLoad: 36, rearPsiLoad: 40,
    sparePsi: null,
    notes: 'Com garupa: F 36 / R 40 PSI. Pneus de cruiser vintage — verificar disponibilidade antes de viagem (formato menos comum). Pressão correta é crítica para estabilidade.',
  },
  {
    modelName: 'DOMINATOR 650', yearFrom: 1988, yearTo: 2002,
    tireSize: '90/90-21 (F) · 130/80-17 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    sparePsi: null,
    notes: 'Asfalto: F 29 / R 33 PSI. Com garupa: F 29 / R 36 PSI. Off-road (trilha leve): F 22-25 / R 24-26 PSI. Trilha pesada/pedregosa: F 18-22 / R 20-24 PSI (nunca abaixo de 15 PSI). Pneu 21" dianteiro facilita passagem off-road. Pneus enduro recomendados: Continental TKC 80, Michelin Anakee Wild, Metzeler Enduro 3 Sahara, Dunlop Trailmax, Michelin K60 Scout — todos disponíveis nesses tamanhos.',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function upsertModel(name: string) {
  const brand = await prisma.brand.findFirst({ where: { name: 'Honda' } })
  if (!brand) throw new Error('Brand Honda não encontrada — rode o seed principal primeiro')
  return prisma.vehicleModel.upsert({
    where: { name_brandId: { name, brandId: brand.id } },
    update: {},
    create: { name, brandId: brand.id },
  })
}

async function upsertTips(modelName: string, category: Cat, tips: TipInput[]) {
  await prisma.tip.deleteMany({ where: { modelName, category } })
  for (let i = 0; i < tips.length; i++) {
    const t = tips[i]
    await prisma.tip.create({
      data: { modelName, category, severity: t.severity, title: t.title, body: t.body, order: i },
    })
  }
}

async function upsertMaintenance(items: MaintenanceItemInput[]) {
  if (items.length === 0) return
  const modelName = items[0].modelName
  await prisma.maintenanceItem.deleteMany({ where: { modelName } })
  await prisma.maintenanceItem.createMany({ data: items })
}

async function upsertTirePressure(tp: typeof tirePressures[0]) {
  await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName, yearFrom: tp.yearFrom } })
  await prisma.tirePressure.create({ data: tp })
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️ Seed Honda Touring/Naked/Cruiser/Clássicas...')

  await upsertModel('GOLD WING 1500/ 1800')
  await upsertTips('GOLD WING 1500/ 1800', 'MACETES', GOLDWING1800_MACETES)
  await upsertTips('GOLD WING 1500/ 1800', 'PROBLEMAS', GOLDWING1800_PROBLEMAS)
  await upsertMaintenance(GOLDWING_MANUTENCAO)
  console.log('✅ GOLD WING 1500/1800')

  await upsertModel('GOLD WING TOUR 1800')
  await upsertTips('GOLD WING TOUR 1800', 'MACETES', GOLDWING1800_MACETES)
  await upsertTips('GOLD WING TOUR 1800', 'PROBLEMAS', GOLDWING1800_PROBLEMAS)
  await upsertMaintenance(GOLDWING_TOUR_MANUTENCAO)
  console.log('✅ GOLD WING TOUR 1800')

  await upsertModel('NC 700 X/ 700X ABS')
  await upsertTips('NC 700 X/ 700X ABS', 'MACETES', NC700X_MACETES)
  await upsertTips('NC 700 X/ 700X ABS', 'PROBLEMAS', NC700X_PROBLEMAS)
  await upsertMaintenance(NC700X_MANUTENCAO)
  console.log('✅ NC 700 X / 700X ABS')

  await upsertModel('CTX 700N')
  await upsertTips('CTX 700N', 'MACETES', CTX700N_MACETES)
  await upsertTips('CTX 700N', 'PROBLEMAS', CTX700N_PROBLEMAS)
  await upsertMaintenance(CTX700N_MANUTENCAO)
  console.log('✅ CTX 700N')

  await upsertModel('MAGNA 750')
  await upsertTips('MAGNA 750', 'MACETES', MAGNA750_MACETES)
  await upsertTips('MAGNA 750', 'PROBLEMAS', MAGNA750_PROBLEMAS)
  await upsertMaintenance(MAGNA750_MANUTENCAO)
  console.log('✅ MAGNA 750')

  await upsertModel('DOMINATOR 650')
  await upsertTips('DOMINATOR 650', 'MACETES', DOMINATOR_MACETES)
  await upsertTips('DOMINATOR 650', 'PROBLEMAS', DOMINATOR_PROBLEMAS)
  await upsertMaintenance(DOMINATOR_MANUTENCAO)
  console.log('✅ DOMINATOR 650')

  for (const tp of tirePressures) {
    await upsertTirePressure(tp)
  }
  console.log('✅ Calibragens touring/naked/cruiser')

  const models = ['GOLD WING 1500/ 1800', 'GOLD WING TOUR 1800', 'NC 700 X/ 700X ABS', 'CTX 700N', 'MAGNA 750', 'DOMINATOR 650']
  const tipCount = await prisma.tip.count({ where: { modelName: { in: models } } })
  console.log(`\n📊 ${tipCount} dicas inseridas para Honda touring/naked/cruiser/clássicas`)
  console.log('✅ Seed concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
