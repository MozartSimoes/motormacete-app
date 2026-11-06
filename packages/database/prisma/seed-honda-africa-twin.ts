// seed-honda-africa-twin.ts — Honda CRF 1000L Africa Twin (2016-2019) + CRF 1100L Africa Twin (2020+)
// Motor: paralelo bicilíndrico Unicam SOHC, 4 válvulas/cil, refrigerado a líquido
// CRF1000L: 998cc / 90 cv — CRF1100L: 1084cc / 100 cv
// Válvulas: IN 0,16 ±0,03 mm / EX 0,23 ±0,02 mm (motor FRIO) — verificar a cada 20.000 km
// Corrente: 525 pitch (maior que 520 — confirmar disponibilidade antes de viagem)
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

// ─── CRF 1000L Africa Twin (2016–2019) ───────────────────────────────────────

const CRF1000L_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 998cc Unicam SOHC (4 válvulas/cilindro via balancins) — folga: IN 0,16 ±0,03 mm / EX 0,23 ±0,02 mm; verificar a frio a cada 20.000 km',
    body: 'A Africa Twin CRF1000L usa motor paralelo bicilíndrico com sistema Unicam (SOHC com 4 válvulas por cilindro via dois balancins por válvula). Não é DOHC. Folga de válvulas: adm 0,16 ±0,03 mm / esc 0,23 ±0,02 mm com motor FRIO (PMS de compressão). Ajuste por calços (shims). Intervalo de verificação: 20.000 km. Se válvulas de escape ficarem com folga zero (hiper-apertadas): queima silenciosa sem aviso. Custo de verificação: R$300-600 em oficina especializada.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA (ou 10W-40 em clima quente) — capacidade 3,8 L com filtro; troca a cada 6.000 km off-road ou 8.000 km estrada',
    body: 'Motor 998cc bicilíndrico demanda mais óleo que monocilíndricos: 3,8 L com filtro, 3,5 L sem filtro. Viscosidade: 10W-30 JASO MA (padrão Honda). Em climas muito quentes (Nordeste, viagens em caatingas a 40°C+): 10W-40 JASO MA. Uso misto asfalto/off-road: troca a cada 6.000 km. Uso predominante estrada: até 8.000 km. Sintético de qualidade (Mobil 1, Shell Advance): pode esticar para 8.000 km com análise de óleo periódica.',
  },
  {
    severity: 'OK',
    title: 'DCT (Dual Clutch Transmission) — versão DCT tem fluido próprio no câmbio de dupla embreagem; modos D / S / G / MT têm comportamentos muito distintos; calibrar modo antes de off-road',
    body: 'A versão DCT (CRF1000D) tem caixa de câmbio com embreagem hidráulica automática (sem alavanca de embreagem). Fluido DCT: Honda Premium DCT Fluid (1,1 L, nunca misturar com óleo de motor). Modos: D = automático suave; S = esportivo (respostas mais rápidas); G = off-road (trocas de marcha adaptadas para terreno); MT = manual por botão no guidão. Para uso off-road: SEMPRE usar modo G — o modo D em lama ou areia faz a moto "engolir" tração nos momentos errados. Troca do fluido DCT: a cada 20.000 km.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 pitch — passo maior que o 520 comum; menos disponível no interior do Brasil; levar elos de reserva em viagens longas',
    body: 'A Africa Twin usa corrente 525 (mais robusta que a 520 das trail medias). Kits de reposição: DID 525VX3 (R$300-450) ou RK 525XRE (R$320-480). Pinhão 16T / coroa 42T de série. Folga recomendada: 20-30 mm. Lubrificação: a cada 500-700 km (ou após off-road pesado). Em cidades do interior: borracharias raramente têm corrente 525 — carregar 2-3 elos máster + kit de elos de ligação. Troca preventiva do kit completo: 25.000-30.000 km (uso misto). Nunca só a corrente sem trocar coroa e pinhão.',
  },
  {
    severity: 'OK',
    title: 'Pneu: 90/90-21 (F) · 150/70-18 (R) — calibragem para asfalto 29/36 PSI; para off-road reduzir para 15-18 PSI (F) e 18-22 PSI (R); nunca misturar pressões',
    body: 'Pressão de fábrica (asfalto, solo): dianteiro 200 kPa (29 PSI) / traseiro 250 kPa (36 PSI). Com garupa/carga: dianteiro 225 kPa (33 PSI) / traseiro 280 kPa (41 PSI). Off-road (terra, pedra, areia): REDUZIR dianteiro para 15-18 PSI (aro 21") e traseiro para 18-22 PSI — melhora conformação do pneu e tração. Retornar para pressão de asfalto antes de rodar mais de 10 km em pavimento — pneu baixo em asfalto causa superaquecimento e desgaste lateral acelerado. Pneus adventure mais vendidos no Brasil: Michelin Anakee Wild, Pirelli Scorpion Rally, Continental TKC 80.',
  },
  {
    severity: 'OK',
    title: 'Peso 228 kg (seco) — moto pesada para off-road; técnica de curva em terra é diferente; sempre levar cavalete de campo e saber levantar sozinho',
    body: 'A Africa Twin CRF1000L pesa 228 kg (seco) e ~240 kg abastecida. Em off-road, isso é cerca de 30-50 kg acima das trail medias (XRE 300, CRF 250F). Técnicas específicas para aventureiros: (1) Curvar em pé nos pedais (shift do peso para frente); (2) Em areia: velocidade e leveza de mão são mais importantes que força; (3) Lama: usar modo G do DCT ou marcha baixa fixa na versão manual; (4) Levantar a moto sozinho: usar cavalete de campo (R$80-200), posicionar no lado do cavalete central e usar alavanca das pernas — não a força dos braços.',
  },
  {
    severity: 'OK',
    title: 'Tanque 18,8 L — autonomia 380-440 km em estrada; 300-340 km off-road; reserva ativa a ~3 L; ideal para viagens longas no Brasil',
    body: 'Consumo médio: 21 km/L em uso misto (estrada + off-road). Estrada suave (100-110 km/h): 23-25 km/L. Off-road pesado (terra/pedra): 16-18 km/L. O tanque de 18,8 L é um diferencial para o Brasil: rodar de São Paulo a Floripa sem parar (500 km) é possível com pilotagem suave. Para viagens no Cerrado ou Nordeste: planejar sempre com 100 km de margem (postos escassos). Gauge de combustível eletrônica: confiável a partir de 2017. Reserva: ~3 L restantes quando nível cai abaixo da última divisão.',
  },
  {
    severity: 'OK',
    title: 'Suspensão Showa 45mm cartucho (F) + Pro-Link ajustável (R) — configurar pré-carga traseira para carga/garupa; mola de série com 230 mm de curso',
    body: 'Bengala dianteira: Showa 45mm tipo cartucho com 230 mm de curso. Amortecedor traseiro Pro-Link com ajuste de pré-carga. Configuração para solo: pré-carga mínima. Configuração para garupa + bagagem (50 kg+): aumentar pré-carga 2-3 posições. Para uso off-road frequente: carga de mola progressiva (Eibach ou similar), pistão de recompressão ajustado. Aviso: bengala de 45mm tem retentores disponíveis localmente. Troca de óleo de bengala: Honda SS-7 10W, 510 mL por tubo.',
  },
  {
    severity: 'OK',
    title: 'Vela: NGK LMAR8G-4 iridium (2 unidades) — troca a cada 24.000 km; acesso pelo painel lateral superior; torque 18 N.m',
    body: 'A Africa Twin CRF1000L usa velas NGK LMAR8G-4 iridium (confirmar no manual do proprietário — alguns anos podem variar). Troca: 24.000 km (iridium tem vida longa). Acesso: desmontagem parcial do painel superior (15-30 min). Torque: 18 N.m (cabeça de alumínio). Com 2 cilindros = 2 velas — trocar sempre as duas ao mesmo tempo. Alternativa Denso: IU24D (mesma especificação). Sinal de detonação (pinging/knocking sob carga): verificar octanagem do combustível e checar velas.',
  },
  {
    severity: 'WARN',
    title: 'Versão DCT: NUNCA usar freio traseiro em subidas íngremes com carga — DCT pode recuar inesperadamente ao soltar o acelerador; técnica diferente da embreagem convencional',
    body: 'A embreagem DCT não tem a "sensação" de uma embreagem manual. Em subidas com moto carregada, ao tirar o acelerador em modo D ou S, a moto pode recuar mais do que o esperado. Técnica correta em subidas: manter sempre um toque leve de acelerador ou trocar para modo G (off-road). Freio traseiro na subida: usar APENAS como apoio, nunca para segurar a moto por tempo longo. Em manobras lentas (pátio, cancelas de fazenda): usar modo MT com 1ª marcha e manter acelerador levemente positivo — evitar soltar acelerador totalmente em terreno inclinado.',
  },
]

const CRF1000L_PECAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Peças alternativas — filtro de óleo: Hiflofiltro HF303 (R$30-50) ou K&N KN-303 (R$80-120); evite filtros genéricos sem certificação JASO',
    body: 'O filtro de óleo original Honda (15410-MFJ-D21) custa R$60-90 em concessionárias. Alternativas testadas pela comunidade: Hiflofiltro HF303 (encaixe perfeito, R$30-50 no MercadoLivre), K&N KN-303 lavável e reutilizável (R$80-120, amortiza após 3 trocas). NUNCA usar filtro genérico sem especificação JASO MA — o bypasse interno pode falhar e deixar o motor sem filtragem. Conferir sempre a vedação do o-ring ao instalar: apertar à mão + 3/4 de volta (não usar torquímetro em filtro roscado de cártere alumínio).',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas — kit corrente 525: DID 525VX3 (R$300-450), EK 525ZVX3 (R$320-480), RK 525XRE (R$320-500); coroa aço ou alumínio; pinhão 16T aço',
    body: 'Kits 525 disponíveis no Brasil: DID 525VX3 (o mais encontrado, anel o-ring quadrado, 108 elos, R$300-450 em importadoras), EK 525ZVX3 (anel o-ring X, excelente para off-road, R$320-480), RK 525XRE (qualidade japonesa, R$320-500). Coroa de aço: mais pesada mas dura 40.000+ km. Coroa de alumínio anodizado: -30% de peso mas vida útil 15.000-20.000 km. Pinhão 16T de série: JT Sprockets JTF1326 (R$80-120). Não reduzir pinhão para 15T sem upgrade de corrente — aumenta muito a carga sobre os elos.',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas — pneus 90/90-21 (F) e 150/70-18 (R): Michelin Anakee Wild (R$400-550/R$500-700), Pirelli Scorpion Rally (R$380-500/R$480-650), Continental TKC 80 (R$420-580/R$520-720)',
    body: 'Os três pneus mais recomendados para a Africa Twin no Brasil: (1) Michelin Anakee Wild: 60% off-road / 40% asfalto — melhor equilíbrio, durável em terra e asfalto (10.000-14.000 km). (2) Pirelli Scorpion Rally: 50/50 — excelente aderência em lama, menor durabilidade no asfalto (8.000-10.000 km). (3) Continental TKC 80: 70% off-road — específico para trilha pesada, cansativo em autoestrada mas imbatível em terra. Para viagens longas mistas: Anakee Wild é o mais completo. Verificar sempre aro correto: dianteiro 21" (WM2), traseiro 18" (WM3).',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas — pastilhas de freio: EBC FA447HH sinterizadas (R$90-150/par dianteiro), Ferodo FDB2078P (R$80-130); traseiro: EBC FA396HH (R$70-100)',
    body: 'Pastilhas dianteiras originais Honda: R$180-250/par em concessionárias. Alternativas sinterizadas: EBC FA447HH (Double-H sinterizadas — recomendadas para off-road pesado e chuva, R$90-150/par), Ferodo FDB2078P (excelente mordida em quente, R$80-130). Pastilhas traseiras: EBC FA396HH (R$70-100). Pastilhas sinterizadas exigem aquecimento antes de render máximo — primeiros 100 km de uso suave para bedding. NÃO usar pastilhas semimetálicas de carro com adaptadores — dimensões diferentes causam deformação do disco.',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas — bateria: Yuasa YTZ14S (R$280-380), Moura MTZ14S (R$220-300), BS Battery BTZ14S (R$200-280); original Honda custa R$450-600',
    body: 'A Africa Twin usa bateria 12V 12Ah selada (YTZ14S). Original Honda: R$450-600. Equivalentes homologadas: Yuasa YTZ14S (japonesa, vida útil 4-6 anos, R$280-380), Moura MTZ14S (fabricada no Brasil, boa relação custo/benefício, 3-5 anos, R$220-300), BS Battery BTZ14S (thaiandesa, R$200-280). Carregador de manutenção: CTEK MXS 5.0 (R$250-350) ou Optimate 4 (R$200-300) — usar quando a moto ficar parada por mais de 10 dias. Tensão em repouso saudável: ≥12,6 V.',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas — filtro de ar: K&N HA-5016 lavável (R$180-280), UNI Filter (R$150-250); muda intervalo para lavagem a cada 20.000 km ao invés de troca',
    body: 'Filtro de ar original Honda: R$90-150 (descartável). K&N HA-5016 é lavável e reutilizável — amortiza custo em 2-3 ciclos. Limpeza K&N: kit de limpeza K&N (R$80-120) + 3 dias para secar completamente antes de remontar (filtro úmido pode sugar óleo e danificar sensor de fluxo de ar). UNI Filter (espuma dupla): melhor para off-road pesado com muita poeira — mais fácil de limpar. Para uso exclusivo em estrada: filtro original a cada 20.000 km é suficiente. NUNCA instalar filtro molhado — sensor MAP registra erro e a moto pode rodar em modo limp.',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas — acessórios obrigatórios para uso off-road: protetor de cárter + protetores de motor + paralama traseiro curto + manoplas de barão',
    body: 'A Africa Twin sai de fábrica sem protetor de cárter. Acessórios recomendados: (1) Protetor de cárter: Touratech alumínio 4mm (R$800-1.500), Givi TN1154 (R$500-800), Scam (R$350-500) — obrigatório para pedra. (2) Slider de motor (crashbars): protege o motor em tombamentos laterais (R$300-600). (3) Paralama traseiro curto (hugger): evita que lama entupe corrente — Puig ou Pyramid Plastics (R$150-300). (4) Manoplas de barão (hand guards): protege os punhos em queda e galho — Touratech, SW-Motech, ou genérico chinês (R$80-200). (5) Protetor de radiador (bash plate): indispensável em trilha com pedras.',
  },
]

const CRF1000L_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'DCT caçando/hesitando no trânsito urbano parado e partidas — problema software reconhecido; atualização disponível em concessionárias Honda a partir de 2017',
    body: 'Relato frequente no CRF1000L até 2017: DCT em modo D "caça" marchas (sobe e desce repetidamente) ao avançar lentamente no trânsito parado. Solução: atualização de software da ECU do DCT (gratuita em concessionárias dentro da garantia). Se a moto não foi atualizada: selecionar modo MT ou G em trânsito muito parado. Sintoma secundário: aquecimento da área traseira do motor em tráfego intenso (embreagem DCT gerando calor nas trocas repetidas). Não é falha do motor — é comportamento do software v1.0.',
  },
  {
    severity: 'DANGER',
    title: 'Válvula de escape com folga zero (hiper-apertada) — desgaste acelerado dos assentos de válvula em alguns exemplares até 30.000 km; motor perde compressão sem aviso',
    body: 'Relatos em fóruns (africatwinforum.com, advrider.com): alguns CRF1000L apresentam folga de válvula de escape chegando a zero antes dos 20.000 km recomendados. Sintoma: dificuldade de partida a frio, leve perda de potência progressiva, vela escura. Quando folga vai a zero: válvula fica parcialmente aberta permanentemente → gases quentes saem pelo assentamento → destruição do assento e da válvula. Custo do reparo: R$1.500-3.500 (retífica do cabeçote). Prevenção CRÍTICA: verificar folga de válvulas a CADA 10.000-12.000 km no primeiro 30.000 km de vida da moto, não esperar os 20.000 km do manual.',
  },
  {
    severity: 'WARN',
    title: 'Parafusos do coletor de escape afrouxando em 15.000-25.000 km — vibração e ciclagem térmica nas 4 saídas de escapamento; reapertar com torquímetro (25 N.m)',
    body: 'A Africa Twin CRF1000L tem 8 parafusos de fixação do coletor de escape (4 por cilindro, 2 saídas de escapamento). O ciclo calor/frio + vibração faz esses parafusos afrouxarem. Sintoma precoce: leve cheiro de fumaça de escape na parada (gases vazando pela junta). Reapertar a cada 15.000 km ou ao sentir cheiro de queimado nos primeiros metros após a parada. Torque: 25 N.m com cabeça de 8 mm em extensão. Uso de anti-gripante (copper paste) nos parafusos ao remontar previne travamento por oxidação. Parafusos oxidados: substituir imediatamente.',
  },
  {
    severity: 'WARN',
    title: 'Infiltração de água no painel de instrumentos (CRF1000L 2016-2018) — chuva intensa causa vibrações no LCD e falhas intermitentes; Honda fez recall parcial',
    body: 'Problemas conhecidos no painel do CRF1000L (2016-2018): chuva intensa entra pelo contorno da tela TFT e causa condensação interna, linhas no display e eventual falha total do painel. Honda realizou revisão de serviço (não recall formal) em alguns mercados, incluindo melhoria do vedante do painel. Para proprietários: usar spray de vedação de borracha no contorno da tela. Problema foi corrigido na CRF1100L (2020+). Ao comprar CRF1000L de segunda mão: verificar se o painel apresenta manchas ou pontos de condensação internos.',
  },
  {
    severity: 'WARN',
    title: 'Sensor ABS contaminado com lama em uso off-road — ativação espúria do ABS em frenagens normais; limpeza do anel dentado previne o problema',
    body: 'O anel dentado do sensor ABS na roda dianteira (90/90-21) fica exposto em uso off-road. Lama seca nesse anel causa leituras incorretas de velocidade → ABS ativa em frenagens lentas e normais. Sintoma: pedal e alavanca "pulsam" em freios suaves em linha reta. Limpeza: pano úmido + escova de dente após cada uso em terra (não usar jato de pressão no sensor). Em uso off-road intenso: considerar desligar o ABS traseiro — muitos riders de aventura preferem sem ABS traseiro em trilha.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão dos parafusos de alumínio e chapas de proteção em moto usada em regiões costeiras ou com muita chuva — inspecionar bianualmente',
    body: 'A Africa Twin tem muitas peças de alumínio e parafusos de aço em contato direto — propícios à corrosão galvânica em climas úmidos ou costeiros (litoral, Nordeste). Pontos críticos: parafusos do coletor de escape, suportes de proteção laterais, fixadores de carenagens plásticas. Prevenção: aplicar graxa de lítio ou Vaseline nos parafusos ao fazer manutenção. Ao comprar usada: verificar todos os parafusos com chave sextavada — parafuso que não gira = oxidação avançada (custo de extração pode ultrapassar R$500).',
  },
]

// ─── CRF 1100L Africa Twin (2020+) ───────────────────────────────────────────

const CRF1100L_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 1084cc Unicam SOHC — maior deslocamento, +10 cv e +14% de torque vs 1000L; mesma família de válvulas IN 0,16 / EX 0,23 mm, verificar a cada 24.000 km',
    body: 'A CRF1100L evoluiu o motor da 1000L: 1084cc (bore 92,4 mm × stroke 80,6 mm), 100 cv a 7.500 rpm, 10,6 kgf.m a 6.250 rpm. O sistema Unicam SOHC é o mesmo conceito, mas recalibrado. Folga de válvulas: IN 0,16 ±0,03 mm / EX 0,23 ±0,02 mm (confirmar no manual do modelo específico). Intervalo de verificação: 24.000 km (intervalo maior que a 1000L devido às melhorias no sistema de válvulas). Troca de velas: a cada 48.000 km (iridium de dupla ponta NGK LMAR8GI-9).',
  },
  {
    severity: 'OK',
    title: 'DCT de 2ª geração na 1100L — calibração melhorada, sem o "caça-marchas" da 1000L; modo G (off-road) com lógica de freio traseiro integrada',
    body: 'A 1100L com DCT tem calibração de software revisada: o comportamento errático em trânsito parado foi eliminado. Novidades: modo TOUR para cruzeiros longos (trocas suaves e precoces), modo URBAN para tráfego, modo OFF-ROAD/G com controle de deslize traseiro. O DCT da 1100L tem embreagem hidráulica reforçada — mais durável em off-road que a 1000L. Fluido DCT: 1,1 L Honda Premium DCT Fluid (troca a cada 24.000 km, mesmo da 1000L). Não confundir fluido DCT com óleo de motor: são circuitos separados.',
  },
  {
    severity: 'OK',
    title: 'HSTC (Honda Selectable Torque Control) e ABS cornering — sistemas eletrônicos novos na 1100L; calibrar para uso off-road; HSTC nível 1 ou OFF em terra',
    body: 'A CRF1100L Adventure Sports tem HSTC com 3 níveis + desligável, ABS de curva (cornering ABS), Wheelie Control e Rear Lift Control. Para uso off-road: HSTC nível 1 ou OFF (nível 2-3 é muito intrusivo em terra e corta potência nos momentos errados). ABS traseiro: desligar para trilha — freio traseiro bloqueado intencional é recurso de pilotagem em off-road. Tração controle: o sistema leva 2-3 segundos para resetar após desligar a ignição e religar; usar o combinador (combi switch) para ajuste rápido. Os modos são salvos na memória da ECU para o próximo início.',
  },
  {
    severity: 'OK',
    title: 'Suspensão Showa EERA (Electronically Equipped Ride Adjustment) na versão Adventure Sports — ajuste eletrônico de compressão/extensão sem ferramentas; versão básica tem suspensão manual',
    body: 'CRF1100L Adventure Sports: suspensão SHOWA com ajuste eletrônico EERA (3 modos: Comfort, Standard, Sport). O sistema ajusta automaticamente compressão e extensão em resposta ao terreno e velocidade. CRF1100L básica: suspensão Showa com ajuste manual de pré-carga traseira. Para uso misto: modo Standard na Adventure Sports cobre 95% dos cenários. Modo Comfort em viagem com bagagem: absorve imperfeições do asfalto melhor. Modo Sport em estrada rápida: reduz mergulho de freio e rolagem em curvas. Manutenção: checar nível de óleo da bengala a cada 40.000 km.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA, 4,0 L com filtro na 1100L — motor maior, capacidade maior; filtro Hiflofiltro HF303 ou Honda 15410-MFJ-D21',
    body: 'O motor 1084cc da CRF1100L tem capacidade de óleo levemente maior: ~4,0 L com filtro (vs 3,8 L da 1000L). Honda recomenda 10W-30 JASO MA. Intervalo: 8.000 km (uso predominante estrada) ou 6.000 km (off-road pesado ou trânsito intenso). Filtro: Hiflofiltro HF303 compatível ou Honda 15410-MFJ-D21 (original). Troca obrigatória com filtro sempre: filtro retém partículas metálicas do primeiro uso — filtro clogged = lubrificação comprometida.',
  },
  {
    severity: 'OK',
    title: 'Consumo 21-24 km/L em estrada; tanque 18,8 L; autonomia 380-430 km; reserve ativa com ~3 L; painel exibe % do tanque com barra de 12 segmentos',
    body: 'Motor maior e mais eficiente: 1100L tem consumo ligeiramente melhor que a 1000L em algumas condições. Média real em viagens longas (120 km/h): ~22 km/L. Off-road: 16-19 km/L. Tanque = 18,8 L. Reserve: quando o painel mostra 1 barra restante = ~2,5-3 L. Combustível: gasolina comum ou aditivada. A PGM-FI da 1100L tem mapeamento mais tolerante a variações de octanagem que a 1000L. Etanol E100: NÃO recomendado (mapeamento é exclusivo para gasolina).',
  },
  {
    severity: 'WARN',
    title: 'Assento padrão (840 mm) — alto para estatura brasileira média; opções de banco rebaixado oficial Honda ou Sargent/Seat Concepts aftermarket',
    body: 'CRF1100L tem banco a 840 mm de altura — um dos mais altos do segmento. Para pilotos até 1,70 m: apenas a ponta do pé toca o chão. Honda oferece banco rebaixado oficial (-20 mm) para alguns mercados. Aftermarket: Sargent World Sport (R$800-1.200, -15 mm + mais macio), Seat Concepts (importado, R$900-1.400). Kit lowering links de suspensão: reduzem 25-30 mm mas comprometem clearance off-road — aceitar o trade-off. Boa prática: botas de aventura com sola alta (+20-30 mm) compensam sem mexer na ergonomia.',
  },
]

const CRF1100L_PECAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Peças alternativas — filtro de óleo 1100L: Hiflofiltro HF303 (R$30-50), K&N KN-303 (R$80-120); mesma compatibilidade da 1000L',
    body: 'O CRF1100L usa o mesmo filtro de óleo da 1000L (encaixe idêntico no cártere). Original Honda 15410-MFJ-D21: R$60-90. Hiflofiltro HF303: R$30-50 — o mais encontrado no Brasil, compatibilidade comprovada. K&N KN-303: lavável, R$80-120. Capacidade de óleo: 4,0 L com filtro. Atenção ao torque do tampão de drenagem: 30 N.m (cabeça de 17 mm). Nunca usar chave de impacto no tampão ou no filtro — cártere é alumínio e rosca é delicada.',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas — pneus 1100L (mesmos tamanhos 90/90-21 e 150/70-18): Michelin Anakee Wild, Metzeler Karoo 4, Shinko 804/805 para custo menor',
    body: 'A 1100L mantém os mesmos tamanhos de pneu da 1000L (90/90-21 dianteiro, 150/70-18 traseiro). Para viagem predominantemente em asfalto: Michelin Anakee Adventure (R$350-480/R$450-600) — mais silencioso e macio. Para aventura mista: Michelin Anakee Wild ou Metzeler Karoo 4 (novo, excelente avaliação). Opção econômica: Shinko 804/805 (americano, R$250-350/R$300-450) — boa durabilidade em terra, menos eficiente em chuva. Nunca montar pneu traseiro 160/60-17 (wrong size) — incompatível com o aro 18".',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas — pastilhas 1100L: EBC FA447HH (dianteiro), Ferodo FDB2233P (R$90-150); sistema de freio da 1100L tem Nissin de 4 pistões dianteiro',
    body: 'A CRF1100L tem sistema de freio upgradado vs 1000L: pinça dianteira Nissin radial de 4 pistões. Pastilhas compatíveis: EBC FA447HH sinterizadas (R$90-150/par), Ferodo FDB2233P ou FDB2078P. Para uso off-road pesado: sinterizadas são superiores às semi-metálicas (melhor mordida em lama e água). Traseiro: EBC FA396HH (R$70-100) — compatível com versão 1000L e 1100L. Trocar pastilhas com disco frio — expandido pelo calor pode travar a pastilha nova.',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas 1100L — protetor de cárter indispensável: Touratech (R$800-1.500), Wunderlich, SW-Motech Trax (R$600-1.000); escapamento: Arrow, Akrapovic (R$2.500-5.000)',
    body: 'A 1100L também sai sem protetor de cárter de fábrica — obrigatório antes do primeiro off-road. Protecas testadas: Touratech alumínio 4mm (mais resistente, R$800-1.500), SW-Motech Trax (bom custo-benefício, R$600-1.000), Wunderlich (alemão, alta qualidade). Para escapamentos esportivos aftermarket: Arrow Pro-Race para CRF1100L (R$3.000-4.500, ganho de 5-8 cv), Akrapovic Evolution Line (R$4.500-6.000, linha completa). Lembrar: escapamento aftermarket pode exigir remapeamento da ECU (R$300-600 adicional) para aproveitar o ganho de potência.',
  },
]

const CRF1100L_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Ruído metálico da válvula de descarga de compressão (decompressor) a frio — normal nos primeiros 2-3 minutos; persiste a quente = verificar tensor hidráulico da corrente de distribuição',
    body: 'A CRF1100L tem decompressor automático integrado ao sistema de válvulas. A frio, é normal ouvir um tique-taque metálico leve (decompressor engajando/desengajando durante o aquecimento). Desaparece após 3-5 minutos. Se persiste com motor quente: (1) tensor hidráulico da corrente de distribuição desgastado, (2) guia de corrente de distribuição com desgaste avançado. Custo do reparo (tensor + guia): R$600-1.200 em peça + mão de obra. Não ignorar ruído persistente com motor quente — corrente de distribuição pular é catastrófico.',
  },
  {
    severity: 'WARN',
    title: 'Painel TFT 5" sensível a condensação em variações bruscas de temperatura — caverna/túnel a 10°C após exposição solar a 40°C causa névoa temporária',
    body: 'A CRF1100L tem painel TFT de 5" que pode exibir névoa/condensação temporária ao entrar em locais frios rapidamente após sol intenso. Fenômeno é temporário (desaparece em 5-10 minutos). Não é falha — é física básica. Para prevenir: não tampar o painel com capas vedadas quando estacionar no sol (aumenta o diferencial de temperatura). Problema estrutural de infiltração da 1000L foi corrigido na 1100L. Se névoa persistir por mais de 30 minutos: verificar integridade do vedante do contorno da tela.',
  },
  {
    severity: 'WARN',
    title: 'DCT versão 1100L: bateria pode descarregar mais rápido que motos convencionais em uso off-road pesado — as embreagens hidráulicas ficam sob pressão constante com motor rodando',
    body: 'O sistema DCT mantém pressão hidráulica nas embreagens enquanto a moto está ligada. Em uso off-road intenso e temperaturas muito altas: a bomba hidráulica pode demandar mais da alternadora. Sintoma de bateria fraca: partida com mais esforço que o normal após uso longo. Prevenção: verificar tensão da bateria após cada saída longa (deve ser ≥12,6V em repouso). YTZ14S 12V 12Ah (bateria de série). Carregador de manutenção CTEK ou Optimate quando a moto ficar parada por 2+ semanas.',
  },
  {
    severity: 'WARN',
    title: 'Protetor de motor ausente de série — cárter baixo e exposto; obrigatório para uso off-road; queda em pedras pode perfurar o cárter',
    body: 'A CRF1100L sai de fábrica sem protetor de cárter. Em trilha com pedras, o cárter de alumínio do motor (que fica baixo por ser bicilíndrico em linha) fica exposto. Custo de um cárter perfurado: R$800-2.500 (peça + mão de obra). Protetores testados pelos proprietários: Touratech alumínio 4mm (R$800-1.500), Givi Trekker (R$500-800), Scam (R$350-500). Antes do primeiro off-road: montar protetor de cárter + slider de motor. Em off-road pesado adicionar: protetor de radiador (bash plate lateral).',
  },
  {
    severity: 'WARN',
    title: 'Throttle-by-wire (acelerador eletrônico) na 1100L — sem cabo físico; resposta pode variar com bateria fraca; falha do sensor TPS gera modo limp (potência reduzida)',
    body: 'A CRF1100L tem acelerador eletrônico (fly-by-wire) — não há cabo mecânico do punho até a borboleta de admissão. Benefícios: suavidade, integração com HSTC e modos de condução. Atenção: com bateria abaixo de 11,5V, o sistema pode ter resposta errática ou entrar em modo de proteção (limp mode — potência reduzida, luz laranja no painel). Solução: carregar bateria. Falha do sensor TPS: moto não acelera além de ralenti — levar imediatamente ao dealer. NÃO tentar limpar o TPS com spray sem conhecimento técnico — pode danos irreversíveis ao sensor de posição.',
  },
]

// ─── Tire Pressures ──────────────────────────────────────────────────────────

const TIRE_PRESSURES = [
  {
    modelName: 'CRF 1000L AFRICA TWIN',
    yearFrom: 2016, yearTo: null,
    tireSize: '90/90-21 (F) · 150/70-18 (R)',
    frontPsi: 29, rearPsi: 36, frontPsiLoad: 33, rearPsiLoad: 41,
    notes: 'Off-road: reduzir para 15-18 PSI (F) e 18-22 PSI (R) para tração em terra. Retornar à pressão de asfalto antes de rodar mais de 10 km no pavimento. Pneus adventure recomendados: Michelin Anakee Wild, Pirelli Scorpion Rally, Continental TKC 80.',
  },
  {
    modelName: 'CRF 1100L AFRICA TWIN',
    yearFrom: 2020, yearTo: null,
    tireSize: '90/90-21 (F) · 150/70-18 (R)',
    frontPsi: 29, rearPsi: 36, frontPsiLoad: 33, rearPsiLoad: 41,
    notes: 'Mesma pressão base da CRF1000L. Adventure Sports com pneus mais rodovia pode usar 31 PSI (F) / 38 PSI (R). Off-road: 15-18 PSI (F) / 18-22 PSI (R). Sempre verificar com pneus frios.',
  },
]

// ─── Manutenção ──────────────────────────────────────────────────────────────

const makeAfricaTwin = (model: string, yf: number, yt: number | null): MaintenanceItemInput[] => [
  { modelName: model, yearFrom: yf, yearTo: yt, component: 'Revisão inicial', intervalKm: 1000, intervalMonths: null, notes: 'Obrigatória para manutenção da garantia. Inclui óleo, filtro, ajuste de corrente e inspeção geral.', priority: 'CRITICAL', order: 1 },
  { modelName: model, yearFrom: yf, yearTo: yt, component: 'Óleo do motor JASO MA 10W-30 + filtro (HF303)', intervalKm: 6000, intervalMonths: 12, notes: '3,8 L (1000L) / 4,0 L (1100L) com filtro. Off-road pesado: 6.000 km. Estrada: até 8.000 km. Hiflofiltro HF303 ou K&N KN-303 como alternativas.', priority: 'CRITICAL', order: 2 },
  { modelName: model, yearFrom: yf, yearTo: yt, component: 'Válvulas Unicam (IN 0,16 / EX 0,23 mm) — inspeção e calços (shims)', intervalKm: 20000, intervalMonths: null, notes: 'Motor FRIO, PMS de compressão. Nos primeiros 30.000 km: verificar a cada 10-12.000 km (falha silenciosa conhecida). Custo da verificação: R$300-600.', priority: 'CRITICAL', order: 3 },
  { modelName: model, yearFrom: yf, yearTo: yt, component: 'Velas de ignição NGK LMAR8G-4 iridium (2 unidades)', intervalKm: 24000, intervalMonths: null, notes: 'Sempre trocar as duas juntas. Alternativa Denso IU24D. Torque: 18 N.m. Acesso via painel lateral superior.', priority: 'HIGH', order: 4 },
  { modelName: model, yearFrom: yf, yearTo: yt, component: 'Filtro de ar — inspeção e troca (K&N HA-5016 lavável ou original)', intervalKm: 20000, intervalMonths: null, notes: 'Off-road/pó: 8.000-10.000 km. K&N HA-5016 lavável compatível. Filtro molhado: secar completamente antes de instalar.', priority: 'HIGH', order: 5 },
  { modelName: model, yearFrom: yf, yearTo: yt, component: 'Corrente 525 — lubrificação e verificação de folga (20-30 mm)', intervalKm: 500, intervalMonths: null, notes: 'Spray com o-ring (Motul ou Ipone). Nunca WD-40. Off-road: relubrifar após cada saída. DID 525VX3 / EK 525ZVX3 / RK 525XRE como reposição.', priority: 'HIGH', order: 6 },
  { modelName: model, yearFrom: yf, yearTo: yt, component: 'Kit corrente 525 completo (corrente + coroa + pinhão 16T)', intervalKm: 28000, intervalMonths: null, notes: 'Off-road pesado: 20.000-22.000 km. Sempre kit completo. Coroa aço = durável; coroa alumínio = leve mas vida menor.', priority: 'HIGH', order: 7 },
  { modelName: model, yearFrom: yf, yearTo: yt, component: 'Fluido de freio DOT 4 — troca e purge (F + R + ABS)', intervalKm: null, intervalMonths: 24, notes: 'Sistema ABS com dois circuitos. Purge guiado necessário (HDS ou scanner compatível). DOT 4 — nunca DOT 3.', priority: 'HIGH', order: 8 },
  { modelName: model, yearFrom: yf, yearTo: yt, component: 'Líquido de arrefecimento — troca', intervalKm: null, intervalMonths: 36, notes: 'Honda Ultra-Cool ou anti-freeze 50/50 de qualidade. Verificar nível a cada 3 meses. Mangueiras: inspecionar a cada troca.', priority: 'HIGH', order: 9 },
  { modelName: model, yearFrom: yf, yearTo: yt, component: 'Fluido DCT (Honda Premium DCT Fluid) — 1,1 L (apenas versão DCT)', intervalKm: 20000, intervalMonths: null, notes: 'NUNCA misturar com óleo de motor — circuito separado. Versão manual: ignorar este item. Fluido escuro ou turvo: troca imediata.', priority: 'HIGH', order: 10 },
  { modelName: model, yearFrom: yf, yearTo: yt, component: 'Pastilhas dianteiras + traseiras — inspeção e troca (EBC FA447HH / FA396HH)', intervalKm: 10000, intervalMonths: null, notes: 'Off-road: 7.000-8.000 km. EBC Double-H sinterizadas para uso em terra pesado. Disco mínimo dianteiro: 4,5 mm.', priority: 'HIGH', order: 11 },
  { modelName: model, yearFrom: yf, yearTo: yt, component: 'Parafusos do coletor de escape — reapertar (25 N.m)', intervalKm: 15000, intervalMonths: null, notes: 'Ciclo calor/frio afrouxa os 8 parafusos do coletor. Sintoma: cheiro de fumaça ao parar. Copper paste anti-gripante ao remontar.', priority: 'MEDIUM', order: 12 },
  { modelName: model, yearFrom: yf, yearTo: yt, component: 'Sensor ABS e anel dentado — limpeza', intervalKm: null, intervalMonths: 6, notes: 'Off-road: após cada saída em terra. Pano úmido no anel dentado. ABS ativando em linha reta = anel sujo.', priority: 'MEDIUM', order: 13 },
  { modelName: model, yearFrom: yf, yearTo: yt, component: 'Retentores bengala Showa 45mm — inspeção e troca de óleo (SS-7 10W, 510 mL/tubo)', intervalKm: 30000, intervalMonths: null, notes: 'Inspeção a cada 10.000 km. Névoa oleosa na haste = troca imediata dos retentores. Troca de óleo da bengala: a cada 30.000 km.', priority: 'MEDIUM', order: 14 },
  { modelName: model, yearFrom: yf, yearTo: yt, component: 'Bateria YTZ14S 12V 12Ah — verificação semestral', intervalKm: null, intervalMonths: 6, notes: 'Repouso: ≥12,6 V. Em 4.000 rpm: 13,8-14,5 V. Alternativas: Yuasa YTZ14S (R$280-380), Moura MTZ14S (R$220-300). Carregador CTEK se parada >10 dias.', priority: 'MEDIUM', order: 15 },
]

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS = [
  {
    modelName: 'CRF 1000L AFRICA TWIN',
    yearFrom: 2016, yearTo: null,
    MACETES: CRF1000L_MACETES,
    PECAS:   CRF1000L_PECAS,
    PROBLEMAS: CRF1000L_PROBLEMAS,
  },
  {
    modelName: 'CRF 1100L AFRICA TWIN',
    yearFrom: 2020, yearTo: null,
    MACETES: CRF1100L_MACETES,
    PECAS:   CRF1100L_PECAS,
    PROBLEMAS: CRF1100L_PROBLEMAS,
  },
]

const ALL_MANUTENCAO: MaintenanceItemInput[] = [
  ...makeAfricaTwin('CRF 1000L AFRICA TWIN', 2016, null),
  ...makeAfricaTwin('CRF 1100L AFRICA TWIN', 2020, null),
]

// ─── Runner ───────────────────────────────────────────────────────────────────

async function main() {
  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })

  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Honda', vehicleTypeId: motoType.id } },
    update: {}, create: { name: 'Honda', vehicleTypeId: motoType.id },
  })

  const brand = await prisma.brand.findFirstOrThrow({ where: { name: 'Honda', vehicleTypeId: motoType.id } })

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {}, create: { name: block.modelName, brandId: brand.id },
    })

    const allTips = [
      ...block.MACETES.map(t  => ({ ...t, category: 'MACETES'   as Cat })),
      ...block.PECAS.map(t   => ({ ...t, category: 'MACETES'   as Cat })),
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
    console.log(`✅ ${block.modelName}: ${allTips.length} tips (${block.MACETES.length} macetes + ${block.PECAS.length} peças + ${block.PROBLEMAS.length} problemas)`)
  }

  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName } })
    await prisma.tirePressure.create({ data: tp })
    console.log(`🔵 TirePressure: ${tp.modelName}`)
  }

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: BLOCKS.map(b => b.modelName) } },
  })
  await prisma.maintenanceItem.createMany({ data: ALL_MANUTENCAO })
  console.log(`🔧 MaintenanceItems: ${ALL_MANUTENCAO.length} itens`)

  const totalTips = BLOCKS.reduce((s, b) => s + b.MACETES.length + b.PECAS.length + b.PROBLEMAS.length, 0)
  console.log(`\n✅ Honda Africa Twin seed concluído! ${BLOCKS.length} modelos, ${totalTips} tips, ${TIRE_PRESSURES.length} calibragens, ${ALL_MANUTENCAO.length} itens de manutenção`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
