// seed-honda-cbr-sport.ts — Honda CBR sport bikes
// CBR 500R (2013+) | CBR 600 F (clássica) | CBR 600 RR (2003+) | CBR 650F (2014-2018) | CBR 650 R (2019+)
// Família sport Honda: do intermediário ao supermoto de pista
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

// ─── CBR 500R (2013+) ────────────────────────────────────────────────────────
// Motor: 471cc DOHC parallel twin 8v liquid-cooled | 50 cv @ 8.600 rpm
// Óleo: 10W-30 JASO MA2, 3,3 L (serviço) / 3,7 L (completo) | Vela: NGK IZFR5K-11 gap 1,0 mm
// Bateria: YTZ7S 12V 6Ah | Pneus: 120/70-17 (F) / 160/60-17 (R) | Tanque: 17,7 L
// ABS disponível em todas as versões do Brasil | 6 marchas | corrente 520

const CBR500R_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA2 — 3,3 L (serviço) / 3,7 L (completo); a cada 8.000 km',
    body: 'Motor 471cc parallel twin com câmbio integrado: use 10W-30 JASO MA2 full sintético. Capacidade: 3,3 L na troca com filtro / 3,7 L no enchimento inicial. Honda HP4 10W-30, Mobil 1 Moto 10W-30 ou Motul 7100 10W-30. Intervalo: 8.000 km ou anual. Para uso misto (estrada + cidade): 6.000 km. Verifique o nível pelo visor na lateral direita (janelinha) com a moto em pé e motor quente há 5 min. Nível deve estar entre MIN e MAX. Twin paralelo aquece menos que I4, mas degradação de óleo segue o mesmo padrão.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK iridium IZFR5K-11 — gap 1,0 mm; 2 velas; troca a cada 16.000 km',
    body: '2 velas NGK IZFR5K-11 iridium (R$70–100 cada). Gap: 1,00 mm. Troque em conjunto. Acesso: remover o tanque e parte da carenagem lateral. NÃO substitua por convencionais — o parallel twin da CBR 500R é calibrado para iridium de fábrica. Quando a vela está no limite: dificuldade de partida a frio, leve engasgo na retomada e aumento no consumo são os primeiros sinais. Custo da troca: R$140–200 (peças) + mão de obra.',
  },
  {
    severity: 'OK',
    title: 'CBR 500R: a intermediária equilibrada — spec de pneus 160/60-17 (não 180)',
    body: 'Atenção: a CBR 500R usa pneu traseiro 160/60-ZR17, NÃO 180/55-17 como as CBR 600/650. Erro comum na hora de comprar. Frontal: 120/70-ZR17. Pressão: F 33 / R 33 PSI solo; R 36 PSI com garupa. Pneus indicados: Pirelli Diablo Rosso III (esportivo), Michelin Road 5 (misto/estrada), Bridgestone Battlax T32 (turismo). A geometria 160/60-17 dá manobrabilidade superior às CBR maiores — aproveite!',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 — lubrificar a cada 600 km; kit completo a cada 20.000 km',
    body: 'CBR 500R usa corrente passo 520. Pinhão 15T, coroa 41T. Folga: 25–35 mm no ponto mais tenso. Lubrifique a cada 600 km. Kit: DID 520 VX ou RK 520 (R$280–380 kit completo com pinhão e coroa). Com pilotagem esportiva frequente: inspecione desgaste a cada 4.000 km — o pinhão menor de twin da 500 desgasta levemente mais rápido. Sinal de troca urgente: corrente "sobe" o pinhão ao tentar enroscar nele.',
  },
  {
    severity: 'OK',
    title: 'ABS Honda de série — não desative; priorize manutenção do sistema',
    body: 'Todas as CBR 500R vendidas no Brasil têm ABS de série (2 canais). É um dos melhores sistemas ABS para intermediárias. NÃO desative. Fluido DOT 4: troque a cada 2 anos. Purge de ABS: requer scanner Honda HDS ou scanner genérico com função ABS (modo purge guiado). Sem o scanner de ABS, o fluido não é 100% trocado nos acumuladores internos. Na revisão: peça à oficina para confirmar o ciclo de purge do ABS. Pastilhas: EBC FA365HH (dianteiras).',
  },
  {
    severity: 'OK',
    title: 'Arrefecimento líquido — nível e troca do fluido são críticos; atenção ao overheat',
    body: 'Motor refrigerado a líquido. Nível no reservatório (lado esquerdo): sempre entre MIN e MAX. Fluido Long Life Coolant 50/50 com água destilada. Troca: a cada 2 anos. Em uso urbano intenso (trânsito com temperatura >30°C): o ventilador liga normalmente; se o indicador de temperatura subir ao vermelho — pare imediatamente. Twin paralelo é mais suscetível a superaquecimento no trânsito que I4 refrigerados por água com maior capacidade de radiador. Mantenha entradas de ar do radiador limpas.',
  },
  {
    severity: 'OK',
    title: 'Tanque 17,7 L — autonomia real ~350 km; não force o reserve',
    body: 'Tanque de 17,7 L com consumo médio real de 18–22 km/L (estrada) ou 14–17 km/L (misto urbano). Autonomia real: 300–360 km. A luz de reserva acende com ~3 L restantes (~55 km de margem). Não aguente a luz de reserva por mais de 40 km — injetor da CBR 500R está na bomba de combustível dentro do tanque e pode superaquecer a seco. Em estradas longas: abasteça com a luz acendendo, não espere por curiosidade.',
  },
]

const CBR500R_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Aquecimento no trânsito — normal mas desconfortável; calça do lado direito',
    body: 'O motor twin resfriado a líquido da CBR 500R direciona calor para o lado direito do escapamento e do motor. Em trânsito parado, a calça do passageiro lado direito sente calor. É característico do modelo e NÃO indica problema. Para amenizar: use calça de couro ou material térmico; posicione a moto com o vento de frente quando parado. O ventilador do radiador liga automaticamente aos ~100°C — sinal sonoro leve (normal).',
  },
  {
    severity: 'WARN',
    title: 'Ruído de vibração dos espelhos em ~7.000 rpm — característico do parallel twin',
    body: 'Entre 6.500–7.500 rpm, os retrovisor OEM vibram sensivelmente. É frequência natural do twin paralelo de 471cc. Não indica falha mecânica. Solução: retrovisor aftermarket com haste amortecida ou inserts de borracha no guidão. Modelos populares: Rizoma ou puig. O fenômeno é mais pronunciado em uso prolongado na faixa de rotações de cruzeiro na estrada.',
  },
  {
    severity: 'WARN',
    title: 'Pastilhas traseiras com desgaste acelerado em uso urbano agressivo',
    body: 'A CBR 500R com ABS tem tendência a desgastar as pastilhas traseiras mais rápido do que as dianteiras em uso urbano intenso (freio traseiro acionado frequentemente no trânsito). Inspecione as traseiras a cada 7.000 km. Sinais: ranger, latido ao frear, disco com risco profundo. EBC FA375 para trás. Troque sempre os dois pares (esquerdo e direito) simultaneamente.',
  },
]

// ─── CBR 600 F (classic) ─────────────────────────────────────────────────────
// Motor: 599cc DOHC I4 liquid-cooled | 98-110 cv @ 12.000 rpm
// Produzida 1987-2013 (várias gerações); Brasil: versão FI (2001+)
// Óleo: 10W-30 JASO MA2, 3,0 L | Pneus: 120/70-ZR17 (F) / 180/55-ZR17 (R)

const CBR600F_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA2 — 3,0 L (serviço); a cada 6.000 km (uso esportivo: 5.000 km)',
    body: 'Motor 599cc DOHC I4 refrigerado a líquido. Óleo: 10W-30 JASO MA2 full sintético. Capacidade: 3,0 L (troca com filtro). Mobil 1 Moto 10W-30, Motul 7100 10W-30 ou Motul 300V 10W-40 (uso esportivo intenso). Intervalo Honda: 6.000 km. Uso esportivo (pista ou acelerações frequentes): 5.000 km. Motor derivado CBR 600 F4i tem tolerâncias apertadas — óleo degradado causa ruído característico no cabeçote. Verifique nível a cada 1.000 km.',
  },
  {
    severity: 'OK',
    title: 'Sport clássica com postura agressiva — mantenha amortecedor traseiro calibrado',
    body: 'A CBR 600 F é uma sport de postura agressiva. Amortecedor traseiro com pré-carga ajustável: posição 3 de 5 (padrão piloto solo 70–80 kg). Com garupa: posição 4 ou 5. Garfo dianteiro: ajuste de rebatida (damping) no parafuso central do topo do garfo. Para uso estrada: rebatida leve (saída do amortecedor mais suave). Para pista ou curvas: rebatida firme. Mangueiras hidráulicas de aço inox (aftermarket): melhora resposta e durabilidade (R$250–400 kit).',
  },
  {
    severity: 'OK',
    title: 'Regulagem de válvulas a cada 24.000 km — essencial neste motor de alto rendimento',
    body: 'Motor 599cc DOHC 16v: regulagem de válvulas obrigatória. Folgas: admissão 0,15–0,19 mm / escape 0,22–0,26 mm. Por shims. Realizada com motor frio. Custo em oficina especializada: R$400–800. Ruído de "tictac" rítmico no cabeçote a frio: sinal imediato de regulagem necessária. Deixar passar: desgasta ponteiras de válvulas e assentos, gerando caro serviço de retífica. A cada 12.000 km verifique as folgas (sem necessidade de trocar, só verificar).',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar K&N aftermarket — aumento de performance + limpeza em vez de troca',
    body: 'K&N HA-6007 (ou equivalente) substitui o filtro OEM com vantagens: reutilizável (limpeza + reoiling a cada 20.000 km), leve aumento na aspiração natural do motor. Custo inicial maior (R$350–450) mas elimina trocas periódicas. Para a geração FI (2001+): K&N melhora a resposta em toda a faixa. Para uso em pista com remapeamento: combine K&N + FuelPak ou ECU aftermarket para aproveitar o ganho.',
  },
]

const CBR600F_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Retificador/regulador — mesma falha histórica da linha 600 Honda; verificação essencial',
    body: 'A CBR 600 F comparte o sistema de carga com a CB 600F Hornet e tem o mesmo problema crônico de retificador. Após 40.000–60.000 km, o retificador original pode falhar por subcarga (bateria sem carga) ou sobrecarga (bateria inflada). Diagnóstico: a 4.000 rpm tensão entre 13,5–14,5V na bateria. Substitua preventivamente: Chiaratto ou Shin-Yo Mosfet são escolhas populares (R$150–280). Troca simultânea com estator se tensão das bobinas AC estiver abaixo de 12V/fase.',
  },
  {
    severity: 'WARN',
    title: 'Carenagem original cara e difícil de encontrar — proteja desde o início',
    body: 'A CBR 600 F foi descontinuada (última versão 2013). Peças de carenagem originais são escassas e caras. Replicas de carenagem: disponíveis para as gerações F3 (1995–1998) e F4i (2001–2006) no Mercado Livre e importadores. Mas peças de motor e fluidos seguem disponíveis na rede Honda. Recomendação: invista em proteções de chassi (sliders ou gaiolas) — um tombo sem proteção resulta em danos de carenagem irreparáveis. Protetor de motor (crashpad): R$180–300.',
  },
  {
    severity: 'OK',
    title: 'CBR 600 F clássica: mecânico especializado em I4 é essencial para manutenção',
    body: 'A CBR 600 F é complexa para mecânicos não especializados. Válvulas por shims, carburação por 4 carbs sincronizados (versões mais antigas) ou FI (a partir de 2001) e câmbio de precisão exigem técnico com experiência em esportivas japonesas I4. Evite mecânicos que só atendem motos populares (CG 125, Titan). Confirme experiência em Honda CBR antes de contratar. Grupos no Facebook de CBR 600 F Brasil: excelentes para indicações de mecânicos regionais.',
  },
]

// ─── CBR 600 RR (2003+) ──────────────────────────────────────────────────────
// Motor: 599cc DOHC I4 16v liquid-cooled (spec MotoGP derivado) | 120 cv @ 13.500 rpm
// Óleo: 10W-30 JASO MA2, 3,0 L | Vela: NGK Iridium | Pneus: 120/70-ZR17 / 180/55-ZR17
// Bateria: YTZ10S 12V 8,6 Ah | Tanque: 18 L | Tecnologia Unit Pro-Link + PGM-FI

const CBR600RR_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA2 full sintético — 3,0 L; a cada 5.000 km ou uso de pista: 3 sessões',
    body: 'Motor de 120 cv: use exclusivamente 10W-30 JASO MA2 full sintético de alta performance. Capacidade: 3,0 L. Motul 300V 10W-40 (motorsport) é a escolha para pista. Para uso estrada: Motul 7100 10W-30 ou Mobil 1 Racing. Intervalo estrada: 5.000 km. Pista: a cada 3 sessões (200–300 km de pista) independente do km. Óleo de pista se degrada rapidamente por temperatura. Em motos de pista: filtro de óleo externo auxiliar (ciclone) é upgrade popular.',
  },
  {
    severity: 'OK',
    title: 'Velas iridium NGK IMR9E-9H — gap 0,9 mm; 4 velas; troca a cada 12.000 km',
    body: '4 velas IMR9E-9H iridium (R$90–130 cada). Gap: 0,9 mm. Resistência interna reduzida para menor interferência eletromagnética (importante em motos com rica eletrônica). Troque em conjunto. Acesso muito trabalhoso: exige remover toda a carenagem frontal e parte do coletor de admissão. Considere troca junto com outro serviço maior para diluir o custo da mão de obra (R$600–900 so a troca de velas em oficina).',
  },
  {
    severity: 'OK',
    title: 'CBR 600 RR pede pneus ZR17 de alto desempenho — não use pneus de touring',
    body: 'Com 120 cv em 18 kg de tanque cheio e geometria de pista, a CBR 600 RR exige pneus de alta performance: Pirelli Diablo Supercorsa SP, Michelin Power RS, Bridgestone Battlax RS11 ou superior. Pressão: F 36 / R 42 PSI (estrada). Pista: F 30 / R 30 PSI (verificar com técnico de pista — depende do composto). NUNCA use pneus de touring ou econômicos: a performance de curva é limitada pelo pneu, e a CBR 600 RR chega em curvas com velocidade incompatível com pneu inferior. Troca a cada 10.000–15.000 km (uso estrada) ou menos para pista.',
  },
  {
    severity: 'OK',
    title: 'Sistema de suspensão Unit Pro-Link: manutenção do mono é crítica',
    body: 'A CBR 600 RR usa suspensão traseira Unit Pro-Link (amortecedor central). Manutenção do amortecedor: recarga de nitrogênio e revisão das vedações a cada 30.000 km ou ao notar perda de performance (moto "afundando" em curvas agressivas). Custo de revisão do amortecedor OEM: R$400–700. Upgrade para amortecedor aftermarket: Öhlins TTX36, WP Apex, YSS (melhora significativa, R$1.500–5.000). Garfo dianteiro: troca de óleo a cada 20.000 km (viscosidade 10 wt). Vedações do garfo: a cada 30.000 km.',
  },
  {
    severity: 'DANGER',
    title: 'CBR 600 RR: freio dianteiro de extrema eficiência — adapte a pilotagem gradualmente',
    body: 'Pinça Radial Nissin de 4 pistões + disco 310 mm: frenagem de referência para 600 cc. Novatos na moto DEVEM calibrar a força de frenagem gradualmente — o freio responde com muito mais força do que motos populares. Técnica correta: entrada de freio progressiva (não "bater" o freio), dedos sempre no punho, posição corporal atrás do guidão para não ser arremessado para frente. Pastilhas originais Nissin ou EBC HH: NÃO use pastilhas de baixa qualidade neste sistema. Fluido DOT 4 trocado a cada 12 meses (uso de pista) ou 2 anos (estrada).',
  },
  {
    severity: 'OK',
    title: 'Embreagem de deslizamento (slipper): proíbe o "travamento" da roda traseira na redução',
    body: 'A CBR 600 RR (2007+) conta com embreagem de deslizamento. Em reduções agressivas de múltiplas marchas (frear para uma curva na pista), a embreagem permite que o motor não trave a roda traseira. Permite reduzir várias marchas rapidamente sem risco de highside. Em uso estrada: você pode reduzir mais agressivamente sem preocupação. A embreagem de deslizamento tem vida útil mais longa que embreagens convencionais, mas requer óleo de qualidade (JASO MA2 obrigatório — JASO MB destrói o sistema de atrito).',
  },
]

const CBR600RR_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Manutenção cara e complexa — calcule o custo total de posse antes de comprar usada',
    body: 'A CBR 600 RR tem manutenção entre as mais caras de motos nacionais. Estimativas por serviço: velas (×4) R$360–520 + mão de obra R$400; regulagem de válvulas R$700–1.200; corrida da corrente: R$450–700 kit; fluidos (óleo + freio + arrefecimento) na mesma revisão: R$200. Total de uma revisão completa: R$1.500–2.500 em oficina especializada. Ao comprar usada: exija histórico de manutenções (book de revisões Honda ou recibos de oficina).',
  },
  {
    severity: 'WARN',
    title: 'Overheating em trânsito urbano prolongado — sinal do ventilador é normal, mas monitore',
    body: 'Motor de 120 cv com radiador compacto: em trânsito parado por mais de 15 min em clima quente (>32°C), o indicador de temperatura pode subir acima do usual. O ventilador liga automaticamente (barulho notável). Se o painel mostrar indicador de temperatura no limite: abra um espaço, rode devagar para criar fluxo de ar. Em cidades quentes (Manaus, Cuiabá): CBR 600 RR sofre mais em trânsito que motos aventureiras com radiadores maiores. Fluido de arrefecimento em dia = menor risco.',
  },
  {
    severity: 'DANGER',
    title: 'CBR 600 RR modificada para pista sem manutenção adequada: risco real',
    body: 'Muitas CBR 600 RR no mercado foram usadas em pista e alteradas (escape, remap, carretel traseiro, slick). Na compra usada de pista: EXIJA revisão completa antes de usar na estrada, incluindo: freios (pastilhas + discos + fluido), corrente e kit de transmissão, óleo (checar metalina), velas, suspensão. Moto de pista rodada na estrada sem revisão pós-pista: alto risco de falha imprevisível. Custo de revisão completa de pista para estrada: R$800–1.800.',
  },
]

// ─── CBR 650F (2014-2018) e CBR 650R (2019+) ─────────────────────────────────
// Motor: 649cc DOHC I4 (mesmo da CB 650F/R) — carenada com postura mais esportiva
// Specs técnicas iguais ao CB 650R; diferença é ergonomia e carenagem

const CBR650F_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'CBR 650F/R: mesmo motor do CB 650F/R — toda a manutenção é idêntica',
    body: 'A CBR 650F (2014–2018) e CBR 650R (2019+) usam exatamente o mesmo motor 649cc DOHC I4 do CB 650F/R. Óleo: 10W-30 JASO MA2, 2,9 L (serviço) / 3,2 L (completo) a cada 8.000 km. Velas: NGK IZFR6K11 iridium (×4) a cada 16.000 km. Bateria: YTZ10S 12V. Fluido arrefecimento: troca bienal. Mesmas peças de motor, corrente (525), pneus (120/70-17 / 180/55-17) e ABS. A diferença está na postura (mais agressiva), carenagem e suspensão mais firme.',
  },
  {
    severity: 'OK',
    title: 'Postura esportiva — ajuste a suspensão e o assento para conforto em longas distâncias',
    body: 'CBR 650F tem postura mais inclinada que CB 650F: punhos mais baixos, assento mais alto (810 mm). Em viagens longas: a postura pode cansar ombros e pescoço. Ajustes recomendados: pré-carga traseira no nível 3/5 para estrada (amortece pequenas irregularidades). Punhos ergonômicos: Renthal Fat Bar com risers (R$450–700) pode elevar ligeiramente o guidão. CBR 650R tem geometria ainda mais agressiva — ideal para pistas e estradas sinuosas, não recomendada para 8+ horas de viagem.',
  },
  {
    severity: 'OK',
    title: 'Carenagem — proteção aerodinâmica real; inspecione fixações após longos trechos',
    body: 'A carenagem da CBR 650F/R oferece proteção ao vento significativa até ~130 km/h. Para velocidades maiores: bolha aftermarket mais alta (Puig, MRA) melhora conforto. Fixações da carenagem (parafusos e pitões de plástico): verificar após 30.000 km — vibração de motor I4 em longas distâncias solta pitões. Ao ouvir barulho de "trinca" na carenagem: provavelmente pitão de fixação solto. Custo de reposição: R$2–5/pitão na concessionária.',
  },
  {
    severity: 'OK',
    title: 'CBR 650R (2019+): Quick Shifter (QS) — aproveite, mas recalibre periodicamente',
    body: 'A CBR 650R tem Quick Shifter Up & Down de série em algumas versões. Para usar: configure no painel (modo Sport). O QS permite trocas sem embreagem em acelerações e reduções. Para funcionar bem: óleo de qualidade e câmbio em bom estado são essenciais. Se o QS começar a dar "falhas" (troca sem resposta ou engasgo): verifique nível de óleo e estado das peças do câmbio. Não use QS na 1ª marcha (padrão Honda — desabilitado pelo fabricante em 1ª para segurança).',
  },
]

const CBR650_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Ruído de "chocalho" a frio — rubber damper da embreagem; mesmo da CB 650F',
    body: 'CBR 650F e CBR 650R têm o mesmo ruído de "chocalho" nos primeiros 2 minutos após partida a frio, causado pelo rubber damper da embreagem. Normal, documentado pela Honda. Desaparece com motor quente. Se persistir após 5 min ou vier acompanhado de vibração: inspecionar a embreagem.',
  },
  {
    severity: 'WARN',
    title: 'Carenagem de reposição cara e difícil de encontrar (especialmente CBR 650F)',
    body: 'CBR 650F (descontinuada em 2018) tem carenagem difícil de encontrar. Replicas disponíveis via importação (Alibaba/AliExpress, R$800–1.500 o kit completo) ou em desmanche especializado. CBR 650R (2019+) tem melhor disponibilidade. Sliders/crashpads de chassi: investimento obrigatório para quem usa na pista ou nas ruas. Custo: R$200–400 o kit. Valor do plástico original: R$3.000–6.000 (kit completo).',
  },
]

// ─── Manutenções ──────────────────────────────────────────────────────────────

const CBR500R_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CBR 500R', yearFrom: 2013, yearTo: null, component: 'Óleo 10W-30 JASO MA2 (3,3 L serviço / 3,7 L completo)', intervalKm: 8000, intervalMonths: 12, notes: 'Full sintético. Verificar nível pelo visor. Uso esportivo: 6.000 km.', priority: 'HIGH', order: 1 },
  { modelName: 'CBR 500R', yearFrom: 2013, yearTo: null, component: 'Filtro de óleo — troca', intervalKm: 8000, intervalMonths: 12, notes: 'Honda original ou Hiflofiltro HF204. Aplicar óleo no O-ring antes de instalar.', priority: 'MEDIUM', order: 2 },
  { modelName: 'CBR 500R', yearFrom: 2013, yearTo: null, component: 'Velas iridium NGK IZFR5K-11 (×2) — gap 1,0 mm', intervalKm: 16000, intervalMonths: null, notes: '2 velas. Troca em conjunto. R$70–100/unid. Acesso: remover tanque e carenagem lateral.', priority: 'MEDIUM', order: 3 },
  { modelName: 'CBR 500R', yearFrom: 2013, yearTo: null, component: 'Fluido de arrefecimento — troca', intervalKm: null, intervalMonths: 24, notes: 'Long Life Coolant 50/50 com água destilada. Verificar nível semanalmente.', priority: 'HIGH', order: 4 },
  { modelName: 'CBR 500R', yearFrom: 2013, yearTo: null, component: 'Pastilhas dianteiras ABS + fluido DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'EBC FA365HH. Purge guiado de ABS com scanner. Fluido DOT 4: bienal obrigatório.', priority: 'HIGH', order: 5 },
  { modelName: 'CBR 500R', yearFrom: 2013, yearTo: null, component: 'Kit transmissão 520 (corrente + pinhão 15T + coroa 41T)', intervalKm: 20000, intervalMonths: null, notes: 'DID 520 VX. Lubrificar a cada 600 km. Folga: 25–35 mm.', priority: 'HIGH', order: 6 },
  { modelName: 'CBR 500R', yearFrom: 2013, yearTo: null, component: 'Bateria YTZ7S (12V 6Ah) — verificação', intervalKm: null, intervalMonths: 12, notes: 'Yuasa YTZ7S. Repouso: 12,6V. Tensão de carga a 4.000 rpm: 13,5–14,5V.', priority: 'MEDIUM', order: 7 },
]

const CBR600F_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CBR 600 F', yearFrom: 1987, yearTo: 2013, component: 'Óleo 10W-30 JASO MA2 (3,0 L serviço)', intervalKm: 6000, intervalMonths: 12, notes: 'Full sintético. Uso esportivo: 5.000 km. Motul 300V 10W-40 para pista.', priority: 'HIGH', order: 1 },
  { modelName: 'CBR 600 F', yearFrom: 1987, yearTo: 2013, component: 'Filtro de óleo — troca', intervalKm: 6000, intervalMonths: 12, notes: 'Honda original ou Hiflofiltro HF204.', priority: 'MEDIUM', order: 2 },
  { modelName: 'CBR 600 F', yearFrom: 1987, yearTo: 2013, component: 'Velas NGK CR9EH-9 / IMR9E-9H iridium (×4) — gap 0,9 mm', intervalKm: 12000, intervalMonths: null, notes: 'Iridium: 20.000 km. Acesso trabalhoso. Remover carenagem frontal completa.', priority: 'MEDIUM', order: 3 },
  { modelName: 'CBR 600 F', yearFrom: 1987, yearTo: 2013, component: 'Regulagem de válvulas DOHC 16v', intervalKm: 24000, intervalMonths: null, notes: 'Adm 0,15–0,19 mm / Esc 0,22–0,26 mm. Por shims. Motor frio. Oficina especializada.', priority: 'CRITICAL', order: 4 },
  { modelName: 'CBR 600 F', yearFrom: 1987, yearTo: 2013, component: 'Fluido de arrefecimento — troca', intervalKm: null, intervalMonths: 24, notes: 'Long Life Coolant 50/50. NUNCA abrir com motor quente.', priority: 'HIGH', order: 5 },
  { modelName: 'CBR 600 F', yearFrom: 1987, yearTo: 2013, component: 'Pastilhas dianteiras + fluido DOT 4', intervalKm: 12000, intervalMonths: 24, notes: 'EBC HH series. Discos 296–310 mm. Rebuild das pinças a cada 30.000 km.', priority: 'HIGH', order: 6 },
  { modelName: 'CBR 600 F', yearFrom: 1987, yearTo: 2013, component: 'Retificador/regulador — verificação de tensão', intervalKm: null, intervalMonths: 12, notes: 'Tensão a 4.000 rpm: 13,5–14,5V. Substituição preventiva após 50.000 km.', priority: 'HIGH', order: 7 },
]

const CBR600RR_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CBR 600 RR', yearFrom: 2003, yearTo: null, component: 'Óleo 10W-30 JASO MA2 (3,0 L) — full sintético motorsport', intervalKm: 5000, intervalMonths: 12, notes: 'Motul 300V ou Mobil 1 Racing. Pista: a cada 3 sessões (~300 km).', priority: 'CRITICAL', order: 1 },
  { modelName: 'CBR 600 RR', yearFrom: 2003, yearTo: null, component: 'Filtro de óleo — troca', intervalKm: 5000, intervalMonths: 12, notes: 'Honda original apenas. A posição do filtro varia por geração.', priority: 'MEDIUM', order: 2 },
  { modelName: 'CBR 600 RR', yearFrom: 2003, yearTo: null, component: 'Velas iridium NGK IMR9E-9H (×4) — gap 0,9 mm', intervalKm: 12000, intervalMonths: null, notes: '4 velas. Acesso muito trabalhoso (R$600–900 mão de obra). Troca junto com outro serviço.', priority: 'MEDIUM', order: 3 },
  { modelName: 'CBR 600 RR', yearFrom: 2003, yearTo: null, component: 'Regulagem de válvulas DOHC 16v (spec de pista)', intervalKm: 20000, intervalMonths: null, notes: 'Motor de alta performance: intervalo menor. Por shims. Oficina CBR especializada.', priority: 'CRITICAL', order: 4 },
  { modelName: 'CBR 600 RR', yearFrom: 2003, yearTo: null, component: 'Fluido de arrefecimento — troca', intervalKm: null, intervalMonths: 12, notes: 'Uso pista: anual. Estrada: bienal. Engine Ice ou Water Wetter para pista.', priority: 'HIGH', order: 5 },
  { modelName: 'CBR 600 RR', yearFrom: 2003, yearTo: null, component: 'Pastilhas radiais Nissin + fluido DOT 4 (pista: DOT 5.1)', intervalKm: 10000, intervalMonths: 12, notes: 'EBC FA380HH. Pista: Brembo XA5 ou Ferodo XRAC. Fluido pista: Motul RBF700 DOT 5.1.', priority: 'CRITICAL', order: 6 },
  { modelName: 'CBR 600 RR', yearFrom: 2003, yearTo: null, component: 'Óleo de garfo — troca + vedações', intervalKm: 20000, intervalMonths: null, notes: 'Viscosidade 10 wt. Vedações do garfo: 30.000 km. Amortecedor Unit Pro-Link: revisão 30.000 km.', priority: 'HIGH', order: 7 },
  { modelName: 'CBR 600 RR', yearFrom: 2003, yearTo: null, component: 'Corrente 520 (RR) — lubrificação', intervalKm: 600, intervalMonths: null, notes: 'Lubrificar a cada 600 km. Kit 520 completo: DID ERVT Gold (pista) ou RK GP. Trocar a cada 20.000 km.', priority: 'HIGH', order: 8 },
]

const CBR650_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CBR 650F', yearFrom: 2014, yearTo: 2018, component: 'Óleo 10W-30 JASO MA2 (2,9 L serviço / 3,2 L completo)', intervalKm: 8000, intervalMonths: 12, notes: 'Idêntico ao CB 650F. Full sintético. Uso esportivo: 6.000 km.', priority: 'HIGH', order: 1 },
  { modelName: 'CBR 650F', yearFrom: 2014, yearTo: 2018, component: 'Velas iridium NGK IZFR6K11 (×4) — gap 0,9 mm', intervalKm: 16000, intervalMonths: null, notes: '4 velas. Acesso: remover carenagem + tanque. Troca em conjunto.', priority: 'MEDIUM', order: 2 },
  { modelName: 'CBR 650F', yearFrom: 2014, yearTo: 2018, component: 'Kit transmissão 525 + lubrificação da corrente', intervalKm: 25000, intervalMonths: null, notes: 'DID 525 VX. Lubrificação a cada 600 km. Folga: 25–35 mm.', priority: 'HIGH', order: 3 },
  { modelName: 'CBR 650F', yearFrom: 2014, yearTo: 2018, component: 'Pastilhas dianteiras + fluido DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'EBC FA325HH. Purge guiado ABS obrigatório em 2018. Fluido DOT 4: bienal.', priority: 'HIGH', order: 4 },
  { modelName: 'CBR 650F', yearFrom: 2014, yearTo: 2018, component: 'Fluido de arrefecimento — troca', intervalKm: null, intervalMonths: 24, notes: 'Long Life Coolant 50/50 com água destilada.', priority: 'HIGH', order: 5 },
  { modelName: 'CBR 650 R', yearFrom: 2019, yearTo: null, component: 'Óleo 10W-30 JASO MA2 (2,9 L serviço / 3,2 L completo)', intervalKm: 8000, intervalMonths: 12, notes: 'Mesmo motor. Full sintético. Uso esportivo: 6.000 km.', priority: 'HIGH', order: 1 },
  { modelName: 'CBR 650 R', yearFrom: 2019, yearTo: null, component: 'Velas iridium NGK IZFR6K11 (×4) — gap 0,9 mm', intervalKm: 16000, intervalMonths: null, notes: '4 velas. Troca em conjunto. R$80–120/unid.', priority: 'MEDIUM', order: 2 },
  { modelName: 'CBR 650 R', yearFrom: 2019, yearTo: null, component: 'Kit transmissão 525 + lubrificação da corrente', intervalKm: 25000, intervalMonths: null, notes: 'DID 525 VX. Lubrificar a cada 600 km. Folga: 25–35 mm.', priority: 'HIGH', order: 3 },
  { modelName: 'CBR 650 R', yearFrom: 2019, yearTo: null, component: 'Pastilhas radiais ABS (disco 320 mm) + fluido DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'EBC FA319HH. ABS duplo canal de série. Purge guiado com scanner.', priority: 'HIGH', order: 4 },
  { modelName: 'CBR 650 R', yearFrom: 2019, yearTo: null, component: 'Fluido de arrefecimento — troca', intervalKm: null, intervalMonths: 24, notes: 'Long Life Coolant 50/50. Verificar nível mensalmente.', priority: 'HIGH', order: 5 },
]

// ─── Calibragens ──────────────────────────────────────────────────────────────

const CBR500R_CALIBRAGEM = {
  modelName: 'CBR 500R',
  yearFrom: 2013, yearTo: null,
  tireSize: '120/70-17 (F) · 160/60-17 (R)',
  frontPsi: 33, rearPsi: 33, frontPsiLoad: 33, rearPsiLoad: 36,
  sparePsi: null,
  notes: 'Solo: F 33 / R 33 PSI. Com garupa: F 33 / R 36 PSI. Pneus ZR17 sport: Pirelli Diablo Rosso III, Michelin Road 5. Verificar sempre a frio.',
}

const CBR600F_CALIBRAGEM = {
  modelName: 'CBR 600 F',
  yearFrom: 1987, yearTo: 2013,
  tireSize: '120/70-ZR17 (F) · 180/55-ZR17 (R)',
  frontPsi: 36, rearPsi: 42, frontPsiLoad: 36, rearPsiLoad: 42,
  sparePsi: null,
  notes: 'Solo e com garupa: F 36 / R 42 PSI. ZR17 de alta performance. Michelin Pilot Power, Pirelli Diablo. Verificar a frio.',
}

const CBR600RR_CALIBRAGEM = {
  modelName: 'CBR 600 RR',
  yearFrom: 2003, yearTo: null,
  tireSize: '120/70-ZR17 (F) · 180/55-ZR17 (R)',
  frontPsi: 36, rearPsi: 42, frontPsiLoad: 36, rearPsiLoad: 42,
  sparePsi: null,
  notes: 'Estrada solo e garupa: F 36 / R 42 PSI. Pista: F 30 / R 30 PSI (ajustar com técnico). ZR17 de alta performance obrigatório. Pirelli Supercorsa SP, Michelin Power RS.',
}

const CBR650F_CALIBRAGEM = {
  modelName: 'CBR 650F',
  yearFrom: 2014, yearTo: 2018,
  tireSize: '120/70-17 (F) · 180/55-17 (R)',
  frontPsi: 33, rearPsi: 39, frontPsiLoad: 33, rearPsiLoad: 41,
  sparePsi: null,
  notes: 'Solo: F 33 / R 39 PSI. Com garupa: F 33 / R 41 PSI. Michelin Road 5, Pirelli Diablo Rosso IV.',
}

const CBR650R_CALIBRAGEM = {
  modelName: 'CBR 650 R',
  yearFrom: 2019, yearTo: null,
  tireSize: '120/70-17 (F) · 180/55-17 (R)',
  frontPsi: 33, rearPsi: 39, frontPsiLoad: 33, rearPsiLoad: 41,
  sparePsi: null,
  notes: 'Solo: F 33 / R 39 PSI. Com garupa: F 33 / R 41 PSI. Neo-sport: Michelin Road 5 ou Pirelli Diablo Rosso IV.',
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
  console.log('🏍️  Seed Honda CBR (500R / 600F / 600RR / 650F / 650R)...')

  await upsertVehicleModel('CBR 500R', 'Honda', 2013, null)
  await upsertVehicleModel('CBR 600 F', 'Honda', 1987, 2013)
  await upsertVehicleModel('CBR 600 RR', 'Honda', 2003, null)
  await upsertVehicleModel('CBR 650F', 'Honda', 2014, 2018)
  await upsertVehicleModel('CBR 650 R', 'Honda', 2019, null)

  // CBR 500R
  await upsertTips('CBR 500R', 'MACETES', CBR500R_MACETES)
  await upsertTips('CBR 500R', 'PROBLEMAS', CBR500R_PROBLEMAS)
  await upsertMaintenance(CBR500R_MANUTENCAO)
  await upsertTirePressure(CBR500R_CALIBRAGEM)

  // CBR 600 F
  await upsertTips('CBR 600 F', 'MACETES', CBR600F_MACETES)
  await upsertTips('CBR 600 F', 'PROBLEMAS', CBR600F_PROBLEMAS)
  await upsertMaintenance(CBR600F_MANUTENCAO)
  await upsertTirePressure(CBR600F_CALIBRAGEM)

  // CBR 600 RR
  await upsertTips('CBR 600 RR', 'MACETES', CBR600RR_MACETES)
  await upsertTips('CBR 600 RR', 'PROBLEMAS', CBR600RR_PROBLEMAS)
  await upsertMaintenance(CBR600RR_MANUTENCAO)
  await upsertTirePressure(CBR600RR_CALIBRAGEM)

  // CBR 650F
  await upsertTips('CBR 650F', 'MACETES', CBR650F_MACETES)
  await upsertTips('CBR 650F', 'PROBLEMAS', CBR650_PROBLEMAS)
  await upsertMaintenance(CBR650_MANUTENCAO.filter(i => i.modelName === 'CBR 650F'))
  await upsertTirePressure(CBR650F_CALIBRAGEM)

  // CBR 650 R
  await upsertTips('CBR 650 R', 'MACETES', CBR650F_MACETES)
  await upsertTips('CBR 650 R', 'PROBLEMAS', CBR650_PROBLEMAS)
  await upsertMaintenance(CBR650_MANUTENCAO.filter(i => i.modelName === 'CBR 650 R'))
  await upsertTirePressure(CBR650R_CALIBRAGEM)

  const models = ['CBR 500R', 'CBR 600 F', 'CBR 600 RR', 'CBR 650F', 'CBR 650 R']
  const tipCount = await prisma.tip.count({ where: { modelName: { in: models } } })
  const maintCount = await prisma.maintenanceItem.count({ where: { modelName: { in: models } } })

  console.log(`✅ ${models.length} modelos CBR — ${tipCount} dicas, ${maintCount} itens de manutenção`)
  console.log('✅ Seed concluído!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
