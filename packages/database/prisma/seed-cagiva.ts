/**
 * Seed CAGIVA — macetes, problemas e manutenção
 * Cobre todos os modelos CAGIVA registrados na tabela FIPE Brasil
 * (Canyon 500, Elefant 750, Elefant 900, Gran Canyon 900, Mito 125,
 *  Navigator 1000, Planet 125, Roadster 200cc, V-Raptor 1000, W-16 600cc)
 *
 * Fontes: cagivamito.co.uk, elefantadventurebikes.com, raptorchapter.org.uk,
 *         debatemotos.com, motoforum.com.br, advrider.com,
 *         motonline.com.br, manualslib.com (manuais oficiais Cagiva)
 *
 * Execute: pnpm --filter @motormacete/database db:seed:cagiva
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
// CRITICAL não existe no enum Severity — use DANGER para tips críticas de manutenção
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

interface TirePressureInput {
  modelName: string
  yearFrom: number | null
  yearTo: number | null
  tireSize: string
  frontPsi: number
  rearPsi: number
  frontPsiLoad: number | null
  rearPsiLoad: number | null
  notes: string | null
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

// ─── CANYON 500 ───────────────────────────────────────────────────────────────

const CANYON500_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor monocilíndrico 4T de 498cc — robusto, mas dependente de peças importadas',
    body: 'O Canyon 500 usa motor próprio Cagiva de 498cc monocilíndrico 4 tempos com 34cv. A mecânica em si é simples e confiável. O problema é a Agrale (ex-distribuidora oficial no Brasil) que não possui mais estoque de peças. Fontes atuais: Mercado Livre (peças usadas de donos que desmontaram), eBay internacional via Louis Moto (Alemanha) e Bihr (França). Dica: entre em contato com outros proprietários no Debatemotos antes de qualquer reparo — a comunidade tem estoque informal de peças.',
  },
  {
    severity: 'WARN',
    title: 'Tanque expande ao remover — congele o tanque para recuperar a forma original',
    body: 'Defeito de fábrica documentado: o tanque plástico do Canyon 500 expande quando removido do chassi e aquecido ao sol, impossibilitando a reinstalação. A solução consagrada pelos proprietários brasileiros é colocar o tanque no freezer por 2 a 4 horas para contrair o plástico e encaixar normalmente. Não tente forçar: a tampa de combustível e os suportes de borracha quebram com força excessiva. Após reinstalar, o tanque retorna ao tamanho normal com o uso.',
  },
  {
    severity: 'OK',
    title: 'Correia de transmissão: verificar tensionamento a cada 5.000 km',
    body: 'O Canyon 500 usa transmissão por correia dentada (não corrente). A correia tem vida útil maior que a corrente, mas exige verificação de tensionamento periódica. Tensão incorreta provoca vibração excessiva e desgaste prematuro. Ajuste via parafuso tensor na alavanca traseira. Custo de correia nova importada: EUR 60–120 via Louis Moto (DE) ou Bihr (FR).',
  },
  {
    severity: 'WARN',
    title: 'Carenagem lateral racha a partir de 3.000 km — vibração do monocilindro é a causa',
    body: 'A vibração característica do monocilíndrico provoca microfissuras nas carenagens plásticas a partir de aproximadamente 3.000 km. As fissuras começam nos pontos de fixação (parafusos) e avançam. Prevenção: use borrachas antivibração entre a carenagem e o chassi. Para reparo: resina epóxi automotiva tipo araldite (de dentro para fora) funciona bem. Carenagens originais: praticamente inexistentes no Brasil — comunidade online é a única fonte.',
  },
  {
    severity: 'OK',
    title: 'Óleo motor: 10W40 semissintético — Motul 5100, Repsol Moto 4T ou Castrol Power1',
    body: 'O motor Cagiva 498cc aceita bem 10W40 semissintético. Capacidade com filtro: ~2,0 L. Troca a cada 5.000 km. Filtro de óleo: procure referência Cagiva Canyon 500 no eBay — dimensões similares a alguns filtros Honda NX650 Dominator (verificar diâmetro antes). Vela: NGK DR8ES ou equivalente Denso X27ES. Filtro de ar: esponja lavável — limpar a cada 5.000 km com gasolina e aplicar óleo de filtro antes de recolocar.',
  },
]

const CANYON500_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Sprag clutch (embreagem unidirecional da partida): falha clássica — espera de 1 ano por peça',
    body: 'A falha mais documentada do Canyon 500 no Brasil: o sprag clutch (embreagem de rolete da partida elétrica) desgasta e a moto para de dar partida elétrica — o motor não engata ao acionar o botão. Casos documentados no Debatemotos com espera de 8 a 14 meses por peça. Solução emergencial: partida com empurrão (moto em 2ª, descer ladeira ou pedir ajuda). Peça importada: verificar em elefantadventurebikes.com (EUA) — às vezes têm estoque. Se você comprar um Canyon 500, providencie a peça preventivamente ANTES de precisar.',
  },
  {
    severity: 'DANGER',
    title: 'Peças estruturais e de motor praticamente impossíveis de encontrar no Brasil',
    body: 'A Agrale encerrou a importação e não tem mais estoque de peças Cagiva. Peças como pistão, biela, eixo de balancim e bomba d\'água do Canyon 500 são praticamente inexistentes no mercado nacional. Antes de comprar um Canyon 500 usado: verifique o histórico de manutenção, o estado do motor (compressão, sem batidas) e a existência de peças sobressalentes. Motor com problema estrutural = sucata, pois o custo de importar peças pode superar o valor do veículo.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedor traseiro original seiza rapidamente — Öhlins ou YSS são substituições viáveis',
    body: 'O amortecedor traseiro original do Canyon 500 perde a eficiência rapidamente em estradas ruins brasileiras. Sintoma: moto balança excessivamente em lombadas e perde estabilidade na traseira. Substituições viáveis: Öhlins ou YSS de medidas compatíveis (verificar comprimento e olhais). YSS com ajuste de pré-carga custa R$ 600–1.200 e melhora substancialmente o conforto e a estabilidade.',
  },
  {
    severity: 'WARN',
    title: 'Painel de instrumentos: velocímetro e conta-giros mecânicos podem dessincronizar',
    body: 'O painel do Canyon 500 é mecânico (cabo de velocímetro, ponteiro de conta-giros acionado por cabo). O cabo de velocímetro pode quebrar no ponto de conexão com a roda dianteira — sintoma: velocímetro para de funcionar. Cabo de reposição: difícil de encontrar original; um mecânico experiente pode adaptar um cabo universal cortado no comprimento certo. Custo de adaptação: R$ 100–200 em oficina especializada.',
  },
]

const CANYON500_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Canyon 500: intervalos baseados no manual Cagiva e experiência da comunidade brasileira',
    body: '5.000 km — Troca de óleo motor (10W40 semissintético, ~2,0 L com filtro). | 5.000 km — Limpar filtro de ar (esponja, lavar com gasolina + óleo de filtro). | 5.000 km — Verificar tensão da correia de transmissão. | 10.000 km — Verificar folga de válvulas (motor 4T monocilíndrico — válvulas fecham com desgaste e superaquecem). | 10.000 km — Inspecionar sprag clutch (girar a roda com moto em 1ª marcha + partida desligada — deve ter livre rolar para trás). | 20.000 km — Trocar fluido de freio DOT 4 (frente e trás). | 20.000 km — Inspecionar rolamentos de roda. | 30.000 km — Verificar jogo do rolamento de direção.',
  },
]

// ─── ELEFANT 750 ─────────────────────────────────────────────────────────────

const ELEFANT750_MACETES: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CORREIA DENTADA: troca obrigatória a cada 15.000 km ou 2 anos — motor Ducati desmodromico NÃO perdoa',
    body: 'O Elefant 750 usa o motor Ducati 748cc L-twin desmodromico com transmissão por correia dentada. No sistema desmodromico, as válvulas são fechadas MECANICAMENTE (não por mola). Se a correia romper, as válvulas ficam abertas e o pistão as destrói — motor destruído sem possibilidade de reparo econômico. Intervalo obrigatório: 15.000 km OU 2 anos (o que vier primeiro), sem exceção. Mesmo que a correia pareça boa visualmente, troque no prazo — ela pode romper sem aviso. Custo da correia: EUR 40–80 importada. Custo de motor destruído: R$ 5.000–15.000.',
  },
  {
    severity: 'OK',
    title: 'Peças do motor compatíveis com Ducati 750SS e 750 Monster — acesso via importadores Ducati',
    body: 'O motor do Elefant 750 é derivado do Ducati 750 Supersport e do 750 Monster. Isso significa que peças internas do motor, pistão, eixo comando, correias e rolamentos são compatíveis. No Brasil: importadores Ducati (BRP Ducati, DucatiSP) podem ter peças. Internacionalmente: Moto Corsa (EUA), Stein Dinse (DE). O filtro de óleo HifloFiltro HF153 é compatível e disponível no Brasil. Rolamentos de roda: equivalentes SKF/NSK com mesmas dimensões.',
  },
  {
    severity: 'WARN',
    title: 'Ajuste dos calços desmodromicos: a cada 15.000 km, feito junto com a correia — especialista obrigatório',
    body: 'O sistema desmodromico exige ajuste periódico dos calços das válvulas — diferente do motor convencional, o ajuste é com calços de diferentes espessuras (não parafusos). O serviço requer ferramenta especial, conhecimento do sistema e medir cada calço com micrômetro. No Brasil: poucos mecânicos dominam. Busque mecânicos com experiência em Ducati monocilíndrico/L-twin. Calços fora de estoque: elefantadventurebikes.com (EUA) tem estoque completo. O custo do serviço de ajuste varia R$ 400–1.200 dependendo da oficina.',
  },
  {
    severity: 'OK',
    title: 'Comunidade DesmoGroup Brasil — WhatsApp com proprietários e mecânicos experientes',
    body: 'O DesmoGroup Brasil é a comunidade nacional de proprietários de Ducati/Cagiva com motor desmodromico. No grupo há mecânicos especializados, indicações de oficinas que conhecem o sistema, fontes de peças e histórico de problemas. Antes de qualquer intervenção maior no Elefant 750 ou 900, consulte o grupo. Encontre pelo Facebook "DesmoGroup Brasil" ou solicite o link do WhatsApp por mensagem no grupo do Facebook.',
  },
  {
    severity: 'OK',
    title: 'Óleo motor: Motul 7100 10W40 sintético — mesmo espef. do Ducati 750SS',
    body: 'Use óleo sintético 10W40 API SJ ou superior. Capacidade: ~3,0 L com filtro (verificar dipstick). Troca a cada 6.000 km ou 12 meses. Filtro de óleo: HifloFiltro HF153 (disponível no Brasil, R$ 25–40 em lojas online). O motor Ducati desmodromico é sensível à qualidade do óleo — nunca use mineral abaixo de 10W40 semissintético.',
  },
]

const ELEFANT750_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Correia dentada invisível por fora — impossível checar o estado sem abrir a tampa',
    body: 'Diferente de motos com corrente (que você vê o desgaste), a correia dentada do Ducati fica dentro de tampas plásticas e não pode ser inspecionada sem desmontagem. Por isso o intervalo de 15.000 km / 2 anos é tão rígido — você nunca sabe o estado real sem abrir. Se comprar um Elefant 750 usado e o vendedor não souber informar a última troca de correia: TROQUE IMEDIATAMENTE antes de usar a moto. Custo de não trocar: motor destruído.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico envelhecido: fios ressecam, conectores oxidam — revisão elétrica a cada 5 anos',
    body: 'Motos com 25+ anos têm fiação original que resseca e trinca. No Elefant 750/900 os pontos críticos são: conector do alternador (pode soltar e cortar a carga da bateria), conector do sensor de temperatura (falha de leitura e riqueza da mistura) e fiação do painel (iluminação intermitente). Revisão preventiva: testar todos os conectores com multímetro, limpar com spray WD40 Contato e reforçar conexões suspeitas com solda ou conector novo.',
  },
  {
    severity: 'WARN',
    title: 'Solenóide de partida: corrosão causa falha de arranque — limpeza resolve na maioria dos casos',
    body: 'Com o tempo, o solenóide de partida acumula corrosão nos terminais e deixa de funcionar — sintoma: clique único ao acionar a partida, motor não gira. Na maioria dos casos, limpar os terminais com lixa fina e reconectar resolve. Se o solenóide estiver queimado internamente: substituição por solenóide universal de dimensões compatíveis (custo R$ 50–120 em lojas de elétrica automotiva).',
  },
]

const ELEFANT750_MANUTENCAO: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Cronograma Elefant 750: CORREIA DENTADA é o item mais crítico de toda a manutenção',
    body: '5.000 km ou 6 meses — Troca de óleo motor (10W40 sintético, ~3,0 L + HifloFiltro HF153). | 15.000 km ou 2 ANOS — CORREIA DENTADA (troca obrigatória, sem exceção — motor Ducati desmodromico). | 15.000 km — Ajuste de calços desmodromicos (feito junto com a correia, por especialista). | 15.000 km — Vela de ignição NGK DCPR8E (frente e traseiro = 2 velas). | 20.000 km — Filtro de ar (limpeza ou substituição). | 20.000 km — Fluido de freio DOT 4 (Brembo — troca completa). | 30.000 km — Rolamentos de roda (verificar folga). | 40.000 km — Verificar mancais de direção e tensor de correia.',
  },
]

// ─── ELEFANT 900 ─────────────────────────────────────────────────────────────

const ELEFANT900_MACETES: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CORREIA DENTADA: mesma regra crítica do 750 — 15.000 km ou 2 anos, sem negociação',
    body: 'O Elefant 900 usa motor Ducati 904cc L-twin desmodromico — mesma arquitetura do 750, mas com maior cilindrada. A regra é idêntica: correia dentada a cada 15.000 km OU 2 anos. Motor desmodromico sem mola de válvula = se a correia rompe, as válvulas destroem o pistão. Com 30+ anos de uso, as correias disponíveis hoje são sobressalentes envelhecidos — troque mesmo abaixo do intervalo se houver qualquer sinal de ressecamento ou trinca. Peças: elefantadventurebikes.com (EUA) tem o melhor estoque global.',
  },
  {
    severity: 'OK',
    title: 'Peças compatíveis com Ducati 900SS e 900 Monster — base muito maior de fornecedores',
    body: 'O motor 904cc do Elefant 900 é o mesmo do Ducati 900 Supersport e do 900 Monster — geração "carburada" dos anos 90. Isso abre muito a disponibilidade de peças: pistão, anel, comando de válvulas, kit de juntas e rolamentos são intercambiáveis. Ducati Moto importadora (SP) e mecânicos especializados em Ducati conhecem essas peças. No exterior: Stein Dinse (DE), SportbikeTrackGear (EUA) e Ducati.ms (fórum com lista de peças cruzadas).',
  },
  {
    severity: 'WARN',
    title: 'Carburador Dell\'Orto PHF 36 AS: sincronização entre cilindros a cada 10.000 km',
    body: 'O Elefant 900 carburado usa dois carburadores Dell\'Orto PHF 36 AS (um por cilindro). A sincronização (balanceamento do vácuo) desregula com o uso e causa marcha lenta irregular e "engasgos" sob carga parcial. Ferramenta necessária: medidor de vácuo duplo (carb sync). O serviço pode ser feito em qualquer oficina com experiência em Ducati carburado. Custo: R$ 150–300. Kits de jets e agulhas: Dynojet Stage 1 (importado) melhora a progressão do combustível.',
  },
  {
    severity: 'OK',
    title: 'Filtro de óleo HifloFiltro HF153 — disponível no Brasil para o motor 904cc',
    body: 'O filtro de óleo HF153 da HifloFiltro é compatível com os motores Ducati 750/900 carburados (Elefant 750 e 900) e está disponível no Brasil em lojas online especializadas (R$ 25–45). Óleo recomendado: Motul 7100 10W40 sintético ou equivalente. Capacidade: ~3,0 L com filtro. Troca a cada 6.000 km ou 12 meses.',
  },
]

const ELEFANT900_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pela tampa da embreagem: junta resseca com a idade — substituição preventiva',
    body: 'Com mais de 20 anos de uso, a junta da tampa da embreagem do motor Ducati 904cc resseca e provoca vazamento de óleo pelo lado direito do motor. Solução: troca da junta (peça simples, custo EUR 5–15 importado) junto com a troca de óleo. Se não tratado, o óleo pode contaminar o disco da embreagem e causar deslizamento. Ao comprar um Elefant 900 usado, verifique manchas de óleo no chão e na lateral direita do motor.',
  },
  {
    severity: 'WARN',
    title: 'Bomba de combustível (se modificado para injequção): verificar estado',
    body: 'Alguns Elefant 900 foram importados com modificações. No modelo carburado original, a alimentação é gravitacional — não há bomba. Se a moto foi modificada ou está com sistema alterado, verifique a procedência das peças. O Elefant 900ie (injeção) é um modelo diferente do carburado — confirme o ano e especificação antes de comprar peças.',
  },
  {
    severity: 'WARN',
    title: 'Pastilhas de freio Brembo: verificar espessura a cada 10.000 km',
    body: 'O sistema Brembo do Elefant 900 é excelente, mas as pastilhas desgastam. Substitutos compatíveis no Brasil: Ferodo FDB480P ou EBC FA199HH. Fluido DOT 4 (DOT 5.1 também funciona e tem ponto de ebulição maior para uso agressivo). A pinça dianteira Brembo P08 pode ser reconstruída com kit de vedação Brembo — custo R$ 150–300 no Brasil.',
  },
]

const ELEFANT900_MANUTENCAO: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Cronograma Elefant 900: prioridade absoluta na correia — nenhuma outra manutenção é mais crítica',
    body: '5.000 km ou 6 meses — Troca de óleo motor (10W40 sintético, ~3,0 L + HifloFiltro HF153). | 10.000 km — Sincronização de carburadores Dell\'Orto PHF 36. | 15.000 km ou 2 ANOS — CORREIA DENTADA + calços desmodromicos (especialista obrigatório). | 15.000 km — 2 velas NGK DCPR8E. | 20.000 km — Filtro de ar + fluido de freio DOT 4. | 30.000 km — Rolamentos de roda + verificar junta da tampa da embreagem. | 40.000 km — Rolamentos de direção + verificar tensor de correia.',
  },
]

// ─── GRAN CANYON 900 ─────────────────────────────────────────────────────────

const GRCANYON900_MACETES: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CORREIA DENTADA: mesma criticidade dos Elefants — motor Ducati 904cc desmodromico',
    body: 'O Gran Canyon 900 usa o mesmo motor Ducati 904cc L-twin desmodromico dos Elefants, mas com injeção eletrônica Weber-Marelli IAW. A correia dentada tem o mesmo intervalo OBRIGATÓRIO: 15.000 km ou 2 anos. O Gran Canyon 900 é uma moto dos anos 1999–2000 — com 25+ anos de uso, exija o histórico completo de manutenção ao comprar. Se não souber quando foi a última troca: troque IMEDIATAMENTE.',
  },
  {
    severity: 'WARN',
    title: 'Injeção Weber-Marelli IAW: poucos mecânicos no Brasil conhecem — busque especialista Ducati',
    body: 'O Gran Canyon 900 tem injeção eletrônica Weber-Marelli IAW (a mesma dos Ducati 916/996 da época). É um sistema mais moderno que o carburador, mas com particularidades: a mangueira de conexão entre o duto de ar e o corpo de borboleta afrouxa com o tempo e provoca engasgos e retornos de chama. Verifique e aperte as abraçadeiras a cada revisão. Erros de diagnóstico por mecânico sem experiência são comuns — prefira oficinas com histórico em Ducati injeção dos anos 90.',
  },
  {
    severity: 'WARN',
    title: 'Sensor MAP (pressão de admissão): falha causa engasgo acima de 50% do acelerador',
    body: 'O sensor MAP da Weber-Marelli IAW é um ponto de falha comum com o envelhecimento. Sintoma característico: a moto responde bem em baixa rotação mas "trava" ou engasga acima de 50% do acelerador em aceleração firme. O sensor MAP do Gran Canyon 900 é compatível com alguns sensores MAP Ducati 916 — verifique com especialista. Peça nova: EUR 80–150 via Stein Dinse (DE) ou Moto Corsa (EUA). Antes de trocar, limpe os terminais elétricos e verifique a mangueira de vácuo do sensor.',
  },
  {
    severity: 'WARN',
    title: 'Sensor de temperatura do motor: corrosão nos terminais causa mistura rica e consumo elevado',
    body: 'O sensor de temperatura do líquido de arrefecimento (NTC) do Gran Canyon 900 é suscetível à corrosão nos terminais com o tempo. Sintoma: consumo de combustível elevado (moto fica rica permanentemente), difícil partida a quente. Limpeza do terminal com spray contato e dieletrico resolve em muitos casos. Se o sensor estiver com leitura errática: substituição por sensor Ducati compatível (verificar número no manual). Custo: EUR 30–80.',
  },
  {
    severity: 'OK',
    title: 'Pneu traseiro 150/70 R17 — mais largo que os Elefants: verificar disponibilidade',
    body: 'O Gran Canyon 900 usa pneu traseiro 150/70 R17, diferente dos Elefants (140/80-17). Esse tamanho tem boa disponibilidade no Brasil: Michelin Anakee 3, Dunlop D606, Pirelli MT60. Pneu dianteiro 100/90 R19 também tem disponibilidade adequada em lojas de moto. Calibragem: 29 PSI (frente) / 33 PSI (traseiro) para uso solo; 32/36 PSI com carga ou garupa.',
  },
]

const GRCANYON900_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Bateria: consumo parasita do sistema de injeção — bateria flat após 2 semanas parada',
    body: 'A centralina Weber-Marelli IAW consome corrente mesmo com a moto desligada (consumo parasita). Com bateria antiga, a moto pode não dar partida após 2 semanas parada. Solução: use carregador de manutenção (Battery Tender / CTEK) quando a moto ficar parada por mais de uma semana. Bateria recomendada: 12V 12Ah AGM selada. Se a moto ficar estocada por mais de 1 mês, desconecte o terminal negativo da bateria.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento na junta da cabeça: sinal de superaquecimento passado — compressão abaixo do esperado',
    body: 'Gran Canyons 900 mal cuidados podem ter histórico de superaquecimento que danifica a junta da cabeça. Sintoma: perda de potência, consumo de líquido de arrefecimento sem vazamento externo visível e possível fumacinha branca no escapamento. Ao comprar usado: faça um teste de compressão (deve ser acima de 10 bar por cilindro) e verifique se o óleo tem aspecto de "chocolate" (mistura com água = junta danificada).',
  },
]

const GRCANYON900_MANUTENCAO: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Cronograma Gran Canyon 900: correia + injeção Weber-Marelli são os dois focos principais',
    body: '5.000 km ou 6 meses — Troca de óleo motor (10W40 sintético, ~3,0 L + HifloFiltro HF153). | 10.000 km — Verificar mangueiras do sistema de injeção (abraçadeiras, duto de ar). | 10.000 km — Checar sensor MAP e sensor de temperatura (limpar terminais). | 15.000 km ou 2 ANOS — CORREIA DENTADA + calços desmodromicos (especialista Ducati). | 15.000 km — 2 velas NGK DCPR8E. | 20.000 km — Filtro de ar + fluido de freio DOT 4. | 20.000 km — Verificar nível e estado do líquido de arrefecimento. | 30.000 km — Rolamentos de roda + junta da tampa de embreagem.',
  },
]

// ─── MITO 125 ────────────────────────────────────────────────────────────────

const MITO125_MACETES: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Válvula CTS (Cagiva Tuning System): o coração e o calcanhar de Aquiles do motor 2T',
    body: 'O Mito 125 tem a válvula CTS no escapamento — um flap que varia a geometria do escapamento em função da rotação para ampliar a faixa de potência. É o grande diferencial do motor, mas também a principal fonte de problemas. Falhas comuns: 1) Flap carbonizado e travado (moto perde potência acima de 8.000 rpm). 2) Unidade de controle (CDI da válvula) queimada. 3) Potenciômetro do servo desgastado (servo não posiciona corretamente). Antes de qualquer diagnóstico, faça o AUTOTESTE: desligue a moto, desconecte os cabos da válvula, ligue a ignição 2 vezes seguidas e reconecte — o servo faz uma varredura completa como teste de saúde.',
  },
  {
    severity: 'WARN',
    title: 'Cabo da válvula CTS: folga exata de 1 mm em CADA cabo — não mais, não menos',
    body: 'O sistema CTS usa dois cabos de acionamento do flap. A folga de cada cabo deve ser exatamente 1 mm — verifique com um calibrador ou palito de 1 mm de espessura inserido entre o cabo e o guia. Folga zero: servo sobrecarregado e queima rapidamente. Folga maior que 2 mm: flap não abre completamente e moto perde potência. Ajuste pelos parafusos de regulagem na caixa do servo. Após ajuste, sempre fazer o autoteste descrito acima.',
  },
  {
    severity: 'WARN',
    title: 'Descarbonar o flap CTS a cada 6.000 km — carbono trava o mecanismo',
    body: 'O motor 2T gera depósito de carbono no flap da válvula CTS. A cada 6.000 km, remova o flap do escapamento (3 parafusos Allen M5) e limpe com querosene ou decarbonizante. O flap deve girar livremente sem qualquer resistência mecânica. Se estiver duro: mergulhe em querosene por 30 minutos e escove com escova de dente. Nunca use lixa — o flap tem geometria precisa e abrasivos alteram a forma. Recolocar com vedação de silicone de alta temperatura (200°C) nas juntas.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK BR9ES — disponível no Brasil, troca a cada 3.000 km',
    body: 'O Mito 125 usa vela NGK BR9ES (termia 9, resistor). Disponível em qualquer loja de moto no Brasil. Custo: R$ 15–30. Troca a cada 3.000 km no motor 2T — o motor 2T queima óleo por projeto e deposita carbono na vela mais rápido. Vela escurecida (preta seca) = mistura de óleo muito rica, reduza a quantidade no misturador. Vela branca ou com depósito cinza = mistura pobre de combustível, ajuste o jato do carburador.',
  },
  {
    severity: 'OK',
    title: 'Dell\'Orto PHBH 28 BD: jets compatíveis com Aprilia RS125 — mais fáceis de encontrar',
    body: 'O carburador Dell\'Orto PHBH 28 BD do Mito 125 usa jets (bicos) que são os mesmos do Aprilia RS125 — apesar de os motores não serem compatíveis, os carburadores são. Isso facilita muito: componentes internos do carburador (jets, agulha, emulsionador) encontram-se nas lojas que atende o RS125 e em lojas especializadas em Aprilia. Kit de jets Dellorto para ajuste de altitude/temperatura: disponível em lojas online de motocross 2T.',
  },
  {
    severity: 'WARN',
    title: 'Óleo 2T: usar apenas JASO FC ou FD sintético — Motul 800 2T é o padrão da comunidade',
    body: 'O motor 2T do Mito 125 tem tolerâncias apertadas e usa injeção de óleo pelo misturador automático no carburador. Use obrigatoriamente óleo JASO FC ou FD sintético (não semissintético ou vegetal). Motul 800 2T é o padrão da comunidade internacional do Mito 125. No Brasil: Motul 800 2T (R$ 50–80/litro) ou Castrol Power 1 Racing 2T. NÃO use óleo JASO FB (formulação dos anos 80 — carboniza demais). Razão de mistura: aproximadamente 1,5–2% (definido pelo misturador automático do carburador).',
  },
]

const MITO125_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Unidade de controle CTS queimada: sem reposição no Brasil — importação de Portugal ou UK',
    body: 'A CDI de controle do servo CTS (Comp Unit) queima por sobrecarga elétrica ou umidade. Sintoma: servo não responde ao autoteste (não faz varredura ao ligar a ignição), moto anda mas sem potência no topo. Peça no Brasil: inexistente. Fontes internacionais: cagivamito.co.uk (UK) tem o melhor estoque e envia ao Brasil. MMG Racing Store (Portugal) às vezes tem. Custo: EUR 80–200 dependendo da versão (há pelo menos 3 versões de CDI/Comp Unit diferentes por ano do modelo). Confirme o número de série antes de pedir.',
  },
  {
    severity: 'WARN',
    title: 'Motor NÃO é compatível com Aprilia RS125 — não tente intercambiar peças internas',
    body: 'Apesar do mesmo segmento (125cc 2T esportivo), o motor Cagiva Mito 125 e o Aprilia RS125 têm dimensões de pistão, biela e cilindro DIFERENTES — não são intercambiáveis. Mecânicos menos experientes podem sugerir a troca, mas os bore/stroke são distintos. O que É compatível: jets e componentes internos do carburador Dell\'Orto PHBH (como mencionado nos macetes). Nunca instale peças de motor RS125 no Mito sem verificação técnica detalhada das dimensões.',
  },
  {
    severity: 'WARN',
    title: 'Selagem do pistão: anel desgastado causa perda de compressão e dificuldade de partida',
    body: 'Motor 2T sem compressão adequada não pega. A cada 15.000–20.000 km, o anel do pistão desgasta e a compressão cai abaixo de 9 bar. Sintoma: moto difícil de dar partida a frio, fuma excessivamente e perde tração. Teste de compressão: normal entre 9–12 bar no motor frio. Kit de pistão + anel + pino: Wossner (DE) fabrica para o Mito 125 — melhor qualidade que o original. Custo importado: EUR 60–120.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem solta abruptamente: cabo de embreagem requer regulagem fina',
    body: 'A embreagem do Mito 125 tem acionamento muito preciso — folga excessiva no cabo causa soltura abrupta ("morde"). Ajuste a folga no punho: deve haver 2–3 mm de folga antes de sentir resistência. Se o cabo estiver estendido ou ressecado, a embreagem não desengata completamente e o piloto sente o motor "puxando" ao parar. Cabo de embreagem: peça pelo número de série do Mito 125 em cagivamito.co.uk ou adapte um cabo universal de comprimento compatível.',
  },
]

const MITO125_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Mito 125: motor 2T exige atenção em intervalos mais curtos que 4T',
    body: '3.000 km — Vela NGK BR9ES (R$ 15–30 em qualquer loja). | 3.000 km — Verificar e limpar filtro de ar (esponja, lavar + óleo). | 6.000 km — Descarbonar flap da válvula CTS (querosene + escova). | 6.000 km — Verificar folga dos cabos CTS (1 mm exato cada). | 6.000 km — Autoteste da válvula CTS (desconectar, 2x ignição, reconectar). | 10.000 km — Verificar compressão do motor (mínimo 9 bar). | 15.000 km — Trocar anel do pistão (preventivo). | 20.000 km — Kit de pistão completo (piston + anel + rolamento de biela). | 20.000 km — Trocar fluido de freio DOT 4. | Verificação semestral — Estado elétrico do servo CTS e da Comp Unit.',
  },
]

// ─── NAVIGATOR 1000 ──────────────────────────────────────────────────────────

const NAVIGATOR1000_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor Suzuki TL1000S de 996cc — peças em qualquer concessionária Suzuki do Brasil',
    body: 'A maior vantagem do Navigator 1000: usa o motor Suzuki TL1000S 996cc V-twin com remapeamento de injeção. Filtro de óleo, velas, sensor de temperatura, bomba de combustível e kit de vedação são os mesmos do TL1000S — disponíveis em concessionárias Suzuki em todo o Brasil. Filtro de óleo: Suzuki TL1000S (ou equivalente: HifloFiltro HF138, Mahle OC228). Custo do filtro: R$ 30–60. Velas: NGK CR9E (padrão, R$ 20–40 cada), 2 unidades.',
  },
  {
    severity: 'OK',
    title: 'NGK CR9E — vela padrão do motor Suzuki TL1000S, troca a cada 8.000 km',
    body: 'O Navigator 1000 usa 2 velas NGK CR9E (mesmas do Suzuki TL1000S / GSX-R750). Disponíveis em qualquer loja de moto ou posto de abastecimento maior no Brasil. Custo: R$ 20–40 cada. Troca a cada 8.000 km. Para acesso à vela do cilindro traseiro: retirar a sela e um painel plástico lateral. O torque de aperto é 20 Nm — use torquímetro.',
  },
  {
    severity: 'WARN',
    title: 'Marcha lenta vibrante abaixo de 3.000 rpm — característica do motor, não defeito',
    body: 'O motor Suzuki TL1000S (e portanto o Navigator 1000) vibra visivelmente abaixo de 3.000 rpm em marcha lenta. Esse comportamento é NORMAL e amplamente documentado nos fóruns internacionais do TL1000S. O motor tem batida metálica característica em marcha lenta — não confunda com folga de válvula ou problema de biela. A vibração some completamente acima de 4.000 rpm. Se a vibração vier acompanhada de ruído novo ou perda de potência, aí sim investigue.',
  },
  {
    severity: 'WARN',
    title: 'TRE (Timing Retard Eliminator): dispositivo que elimina o "buraco" nos 3.000 rpm',
    body: 'O Navigator 1000 tem uma limitação eletrônica de ignição na faixa de 3.000 rpm (implementada pela Cagiva para suavizar a entrega de potência na versão estrada). O TRE (Timing Retard Eliminator) é um dispositivo simples que engana a ECU para eliminar esse "buraco" — a moto fica muito mais responsiva e linear. Disponível no mercado inglês (raptorchapter.org.uk tem guia de instalação). Fácil instalação: conector entre o sensor de posição da transmissão e a ECU.',
  },
  {
    severity: 'OK',
    title: 'Óleo motor: Motul 7100 ou Castrol Power1 10W40 sintético — capacidade 3,2 L com filtro',
    body: 'Use óleo 10W40 sintético API SJ ou superior. Capacidade: ~3,2 L com filtro. Troca a cada 6.000 km ou 12 meses. A bomba de combustível do TL1000S é intercambiável — se a bomba do Navigator falhar, uma bomba TL1000S resolve com pequena adaptação de conexão (verificar no raptorchapter.org.uk).',
  },
]

const NAVIGATOR1000_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Disco de freio traseiro: pode trincar a partir de 35.000 km — inspeção visual obrigatória',
    body: 'Problema documentado no Suzuki TL1000S e confirmado em alguns Navigator 1000: o disco de freio traseiro pode desenvolver trincas radiais a partir de 35.000 km de uso com frenagem intensa. Inspecione visualmente o disco com uma lanterna a cada 10.000 km. Disco trincado deve ser substituído IMEDIATAMENTE — falha em freio traseiro sob carga pode causar acidente grave. Substituição: disco aftermarket de marcas como Galfer ou EBC são compatíveis com as medidas do TL1000S.',
  },
  {
    severity: 'WARN',
    title: 'Peças de carroceria e carenagens: exclusivas Cagiva — sem fornecedor nacional',
    body: 'Apesar do motor ser Suzuki (peças abundantes), as carenagens e peças de carroceria do Navigator 1000 são exclusivas Cagiva. Fontes: eBay internacional (poucos itens disponíveis), raptorchapter.org.uk (classifieds da comunidade). Fissuras nas carenagens por vibração: reparo com resina epóxi estrutural (de dentro para fora, sem lixar a superfície externa). Evite impacto nas extremidades das carenagens — são plástico rígido sem reforço.',
  },
  {
    severity: 'WARN',
    title: 'Radiador: checar conexões das mangueiras e nível do líquido de arrefecimento a cada 5.000 km',
    body: 'O motor TL1000S tem refrigeração líquida e o Navigator 1000 herda o sistema. Com o envelhecimento, as mangueiras de borracha ressecam e os abraçadeiros afrouxam, causando gotejamento de arrefecimento. Cheque o nível no vaso de expansão a cada 5.000 km. Líquido recomendado: arrefecente azul BASF G11 ou similar 50% diluído em água destilada. Nunca use água pura — a corrosão compromete o interior do motor em poucos anos.',
  },
]

const NAVIGATOR1000_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Navigator 1000: baseado no Suzuki TL1000S com adaptações Cagiva',
    body: '6.000 km ou 12 meses — Troca de óleo motor (10W40 sintético, ~3,2 L + HifloFiltro HF138). | 8.000 km — 2 velas NGK CR9E. | 10.000 km — Inspecionar disco de freio traseiro (trincas). | 12.000 km — Verificar sincronização de acelerador (TBS — Throttle Body Sync). | 20.000 km — Filtro de ar + fluido de freio DOT 4. | 20.000 km — Verificar mangueiras do sistema de arrefecimento. | 24.000 km — Troca do líquido de arrefecimento. | 30.000 km — Rolamentos de roda + verificar tração do amortecedor traseiro.',
  },
]

// ─── PLANET 125 ──────────────────────────────────────────────────────────────

const PLANET125_MACETES: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Motor 2T igual ao Mito 125 — mesma válvula CTS, mesmos problemas e mesmas soluções',
    body: 'O Planet 125 usa o mesmo motor 2T de 124,6cc do Mito 125 com a válvula CTS. A diferença é o mapeamento: o Planet tem curva mais suave para uso urbano (detuned). Todo o conhecimento de manutenção do Mito 125 se aplica aqui: autoteste CTS, folga dos cabos de 1 mm, descarbonar flap a cada 6.000 km, vela NGK BR9ES, óleo 2T JASO FC sintético. Veja os macetes do Mito 125 para detalhes completos.',
  },
  {
    severity: 'OK',
    title: 'Peças compartilhadas com o Mito 125 — reduz (um pouco) o problema de disponibilidade',
    body: 'Como o Planet 125 compartilha o motor com o Mito 125, peças de motor são as mesmas: pistão, anel, rolamento de biela, kit de vedação, jets do carburador Dell\'Orto PHBH 28. A Comp Unit (CDI) do servo CTS pode ser diferente entre as versões — confirme o número de série antes de comprar. A comunidade cagivamito.co.uk (UK) atende tanto o Mito quanto o Planet.',
  },
  {
    severity: 'OK',
    title: 'Suspensão traseira: amortecedor regulável é upgrade simples para uso diário',
    body: 'O amortecedor traseiro original do Planet 125 tem ajuste de pré-carga limitado. Para uso diário com garupa frequente, um amortecedor YSS com ajuste de pré-carga e compressão (tamanho: verificar comprimento original) melhora muito o conforto. Custo: R$ 300–600. Instalação: 30 minutos, sem ferramentas especiais.',
  },
]

const PLANET125_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Comp Unit CTS queimada: mesma escassez que o Mito 125 — cagivamito.co.uk é a fonte',
    body: 'Mesma falha crítica do Mito 125: a Comp Unit (CDI do servo CTS) queima. Sem ela, a válvula CTS fica travada em uma posição e a moto perde potência no topo. Peça: apenas em cagivamito.co.uk (UK) ou MMG Racing Store (Portugal). Custo: EUR 80–200. Antes de comprar um Planet 125 usado, teste o servo CTS (autoteste: 2x ignição com cabos desconectados — servo deve girar completamente).',
  },
  {
    severity: 'WARN',
    title: 'Carburador Dell\'Orto entupido: benzina velha forma verniz que obstrui o jato principal',
    body: 'Planet 125 que ficaram parados por mais de 3 meses têm carburador entupido por verniz de combustível oxidado. Sintoma: motor não pega ou anda com falta de gás em baixa rotação. Solução: desmonte e limpe o carburador com carburador cleaner spray + agulha de 0,3 mm para desbloquear jatos. Nunca use arame — danifica os orifícios calibrados. Se a moto vai ficar parada por mais de 30 dias: feche o torneirão de combustível e deixe o motor consumir o combustível do carburador até parar.',
  },
]

const PLANET125_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Planet 125: igual ao Mito 125 com os mesmos intervalos do motor 2T',
    body: '3.000 km — Vela NGK BR9ES + verificar filtro de ar. | 6.000 km — Descarbonar flap CTS + verificar folga de cabos (1 mm). | 10.000 km — Verificar compressão (mínimo 9 bar). | 15.000 km — Trocar anel do pistão. | 20.000 km — Kit de pistão completo + verificar estado do rolamento de biela. | 20.000 km — Fluido de freio DOT 4. | Trimestral — Verificar nível de óleo 2T no reservatório do misturador automático.',
  },
]

// ─── ROADSTER 200cc ──────────────────────────────────────────────────────────

const ROADSTER200_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 4T de 199,7cc ar refrigerado: simples e resistente — manutenção básica',
    body: 'O Roadster 200 usa motor próprio Cagiva de 199,7cc monocilíndrico 4 tempos refrigerado a ar. É o motor mais simples da linha — sem injeção, sem válvula de escapamento e sem refrigeração líquida. A confiabilidade é boa quando a manutenção básica é em dia. O carburador Mikuni BST 28 é tranquilo para um mecânico de moto comum trabalhar. Óleo motor: 10W40 semissintético, ~1,5 L com filtro. Vela: NGK D8EA ou equivalente Denso X24ES.',
  },
  {
    severity: 'WARN',
    title: 'Membrana do carburador Mikuni BST 28: craca com o tempo — substituição por universal',
    body: 'A membrana do carburador Mikuni BST 28 (carburador tipo slide de vácuo) resseca e craca com o tempo — especialmente em climas quentes. Sintoma: aceleração brusca ao abrir o acelerador, dificuldade em marcha lenta, consumo irregular. Membrana original: difícil de encontrar no Brasil. Solução: membranas universais BST 28 (diâmetro 38–40 mm) disponíveis no eBay e AliExpress custam USD 5–20 e funcionam perfeitamente. Ao instalar: certifique-se que não há nenhuma microfissura, segurando contra a luz.',
  },
  {
    severity: 'OK',
    title: 'Freio traseiro a tambor: regulagem periódica mantém eficiência',
    body: 'O Roadster 200 tem freio traseiro a tambor (cabo de aço). Com o uso, o cabo alonga e a lona desgasta — o pedal vai aumentando a distância até encontrar resistência. Ajuste via porca de regulagem no tambor: deixe 10–15 mm de livre curso antes de sentir resistência. Lonas do tambor: peça pelo tamanho (verificar diâmetro e largura do tambor) em lojas de moto — lonas universais compatíveis custam R$ 30–80 o par e qualquer mecânico instala.',
  },
  {
    severity: 'WARN',
    title: 'CDI queimada: sem equivalente nacional — eBay é a única fonte',
    body: 'A CDI do Roadster 200cc é um problema grave quando queima: não existe equivalente nacional. Sintoma: moto não dá partida ou perde faísca de vez. Antes de substituir, teste a bobina de ignição (resistência primária 0,2–0,5 ohm, secundária 7–11 kΩ). Se a bobina estiver OK, é a CDI. Importação via eBay (buscar "Cagiva Roadster 200 CDI") — custo USD 30–100 dependendo da procedência. CDI universal programável tipo "RexTon" ou "Daytona" pode funcionar com ajuste de mapa — consulte mecânico de CDI especializado.',
  },
]

const ROADSTER200_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI e peças elétricas exclusivas Cagiva: sem reposição no Brasil',
    body: 'O sistema elétrico do Roadster 200 (CDI, regulador de voltagem, bobina de ignição) é exclusivo Cagiva e não tem equivalente nacional. CDI queimada = moto parada até importar. O regulador de voltagem pode ser substituído por um regulador universal de 12V regulado (custo R$ 80–150 em lojas de eletrônica). A bobina de ignição tem chances de encontrar um equivalente com as mesmas resistências primária/secundária.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento em trânsito parado com calor intenso — motor ar refrigerado tem limite',
    body: 'O motor ar refrigerado do Roadster 200 dissipa calor pelo fluxo de ar em movimento. Em trânsito parado por mais de 10 minutos com temperatura acima de 35°C, o motor pode superaquecer — sintomas: perda de potência, detonação (batida de pino) e dificuldade de marcha lenta. Ação: desligue o motor se a temperatura subir excessivamente (não há medidor — observe se o motor começa a "engasgar"). Prevenção: nível correto de óleo e troca nos intervalos certos.',
  },
  {
    severity: 'WARN',
    title: 'Partes de carroceria: escassas — comunidade brasileira é a melhor fonte',
    body: 'Para-lamas, carenagens e plásticos do Roadster 200 são exclusivos e raros. No Mercado Livre, procure "Cagiva Roadster 200 peças" — donos desmanchando costumam aparecer. Grupos de Facebook de motociclistas vintage têm pessoas com estoque informal. Para pequenas rachaduras: resina epóxi ou cola plástica estrutural (tipo Loctite Plastic) resolvem esteticamente.',
  },
]

const ROADSTER200_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Roadster 200cc: manutenção simples e econômica, motor 4T convencional',
    body: '5.000 km ou 6 meses — Troca de óleo motor (10W40 semissintético, ~1,5 L com filtro). | 5.000 km — Verificar e regular freio traseiro (tambor). | 5.000 km — Verificar filtro de ar (esponja lavável). | 10.000 km — Vela NGK D8EA. | 10.000 km — Verificar membrana do carburador Mikuni BST 28 (buscar microfissuras). | 15.000 km — Verificar folga de válvulas (motor 4T — válvula fecha com desgaste). | 20.000 km — Fluido de freio DOT 4 (freio dianteiro a disco). | 20.000 km — Lubrificar cabo de freio traseiro e cabo de embreagem com lubrificante específico para cabos.',
  },
]

// ─── V-RAPTOR 1000 ───────────────────────────────────────────────────────────

const VRAPTOR1000_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor Suzuki TL1000S de 996cc: filtro, velas e bomba de combustível em qualquer Suzuki',
    body: 'O V-Raptor 1000 usa o motor Suzuki TL1000S 996cc V-twin com remapeamento para 104–112cv. Peças de manutenção são as mesmas do TL1000S: filtro de óleo HifloFiltro HF138 (R$ 30–60 em lojas nacionais), velas NGK CR9E (R$ 20–40 cada, 2 unidades), bomba de combustível TL1000S (encaixe direto com pequena adaptação de conector). A disponibilidade de peças do motor é excelente — Suzuki tem concessionárias e peças em todo o Brasil.',
  },
  {
    severity: 'OK',
    title: 'NGK CR9E — mesma vela do Navigator 1000, Suzuki GSX-R750 e TL1000S',
    body: 'As 2 velas NGK CR9E do V-Raptor 1000 são intercambiáveis com Suzuki TL1000S, GSX-R750 e outros modelos Suzuki. Disponíveis no Brasil inteiro. Troca a cada 8.000 km. Iridium: NGK CR9EIX (dura 2x mais, custo ~R$ 80–120 cada) — recomendado para quem percorre muitos quilômetros.',
  },
  {
    severity: 'WARN',
    title: 'Tick metálico em marcha lenta: característica do motor TL1000S, não defeito',
    body: 'O motor Suzuki TL1000S emite um tick metálico característico em marcha lenta — amplamente documentado nos fóruns TL1000S e V-Raptor mundiais. Isso é NORMAL e não indica problema mecânico. Mecânicos sem experiência podem diagnosticar erroneamente como folga de válvula ou problema de biela. O ruído desaparece com o aumento da rotação. Se o tick mudou de tom, ficou mais alto ou veio acompanhado de vibração nova: aí vale investigar.',
  },
  {
    severity: 'WARN',
    title: 'TRE (Timing Retard Eliminator): elimina limitação de 3.000 rpm da ECU',
    body: 'Assim como o Navigator 1000, o V-Raptor tem limitação eletrônica de ignição na faixa dos 3.000 rpm. O TRE é um resistor simples conectado ao sensor de posição da transmissão que elimina esse retardo — a entrega de potência fica mais linear e responsiva. Instalação simples (sem ferramentas especiais), instruções no raptorchapter.org.uk. Melhora perceptível principalmente em aceleração progressiva em velocidades intermediárias.',
  },
  {
    severity: 'OK',
    title: 'Pastilhas de freio Brembo: Ferodo FDB480P ou EBC FA233HH como alternativas',
    body: 'As pinças Brembo do V-Raptor 1000 são de alta qualidade. Pastilhas alternativas compatíveis: Ferodo FDB480P (desempenho esportivo, boa mordida) ou EBC FA233HH (composto sintered HH, excelente para uso intenso). Evite pastilhas genéricas — o V-Raptor pesa ~180 kg e as pastilhas são o único limitador. Fluido: DOT 4 mínimo (DOT 5.1 para uso em pista). Troca de fluido: a cada 20.000 km ou 2 anos.',
  },
  {
    severity: 'OK',
    title: 'Comunidade Raptor Chapter: maior base de conhecimento técnico do V-Raptor/Navigator',
    body: 'O raptorchapter.org.uk é a comunidade global de proprietários do V-Raptor e Navigator 1000. Tem guias técnicos, lista de peças cruzadas com Suzuki, guia de instalação do TRE, dicas de manutenção e classificados. Mesmo estando em inglês, é a fonte mais completa disponível — use o Google Tradutor se necessário.',
  },
]

const VRAPTOR1000_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Disco de freio traseiro: trincas a partir de 35.000 km — inspecionar regularmente',
    body: 'Problema compartilhado com o Navigator 1000 (mesmo motor, mesma plataforma): o disco traseiro pode trincar radialmente com uso intenso. Inspeção visual obrigatória a cada 10.000 km com lanterna. Disco trincado: substitua imediatamente. Alternativas: Galfer Wave ou EBC compatible com medidas TL1000S (verificar diâmetro e espessura). Nunca tente reformar um disco trincado.',
  },
  {
    severity: 'WARN',
    title: 'Carenagens e peças de carroceria: exclusivas Cagiva — eBay internacional é a principal fonte',
    body: 'As carenagens e peças estéticas do V-Raptor 1000 são exclusivas da Cagiva. O motor (peças Suzuki) tem boa disponibilidade, mas a carroceria não. Fontes: eBay internacional (buscar "Cagiva V-Raptor 1000 fairing"), raptorchapter.org.uk (classificados de membros desmontando motos). Rachaduras menores: resina epóxi automotiva de dentro para fora — não use fita adesiva ou filler externo sob vibração.',
  },
  {
    severity: 'WARN',
    title: 'Sistema de refrigeração: mangueiras envelhecem e podem estourar — inspeção preventiva',
    body: 'Com mais de 20 anos de uso, as mangueiras do sistema de arrefecimento do V-Raptor envelhecem, ressecam e podem estourar sob pressão. Inspecione visualmente a cada 2 anos: procure fissuras, amolecimento excessivo ou depósito esbranquiçado nas conexões. Troca preventiva das mangueiras originais aos 25–30 anos de uso: custo baixo, evita superaquecimento grave. Use arrefecente G11 50% + água destilada.',
  },
]

const VRAPTOR1000_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma V-Raptor 1000: baseado no Suzuki TL1000S com foco no freio traseiro',
    body: '6.000 km ou 12 meses — Troca de óleo motor (10W40 sintético, ~3,2 L + HifloFiltro HF138). | 8.000 km — 2 velas NGK CR9E (ou CR9EIX iridium a cada 16.000 km). | 10.000 km — Inspeção visual do disco traseiro (trincas radiais). | 12.000 km — Sincronização dos corpos de borboleta (TBS). | 20.000 km — Filtro de ar + fluido de freio DOT 4. | 20.000 km — Verificar mangueiras do sistema de arrefecimento. | 24.000 km — Troca do líquido de arrefecimento. | 30.000 km — Rolamentos de roda + verificar amortecedor traseiro.',
  },
]

// ─── W-16 600cc ──────────────────────────────────────────────────────────────

const W16600_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor ENDURO monocilíndrico 4T de 601cc — NÃO confunda com esportiva',
    body: 'O W-16 600cc é uma moto ENDURO de grande cilindrada, com motor próprio Cagiva 601cc monocilíndrico 4 tempos SOHC de 34cv — não tem relação com motores 4 cilindros de supersportivas. Pneus enduro (90/90-21 dianteiro, 130/80-17 traseiro), posição de pilotagem ereta, suspensões longas e câmbio de 5 marchas definem o caráter. O motor é robusto para uso off-road, mas vibra acima de 90 km/h — isso é NORMAL para a categoria.',
  },
  {
    severity: 'WARN',
    title: 'Sprag clutch (partida elétrica): falha mais comum no W-16 — disponibilidade crítica',
    body: 'O sprag clutch (embreagem unidirecional de rolete da partida elétrica) do W-16 600cc é o ponto de falha mais documentado do modelo. Sintoma: botão de partida gira sem engatar o motor. Peça exclusiva Cagiva — buscar no eBay internacional ou em importadores especializados. Se comprar um W-16, verifique ANTES se a partida elétrica funciona corretamente (deve pegar em 1–2 tentativas). Alternativa temporária: partida em pé (kickstart) funciona mesmo com sprag defeituoso.',
  },
  {
    severity: 'WARN',
    title: 'Bobina de pickup (sensor de ignição): desgasta e causa falhas de ignição em alta rotação',
    body: 'A bobina pickup (sensor de posição do rotor/ignição) do W-16 600cc desgasta com o tempo e causa cortes de ignição acima de 5.000 rpm. Sintoma: moto anda bem em baixa rotação mas "corta" em aceleração firme. Diagnóstico: meça a resistência da pickup com multímetro (normal: 100–500 ohm dependendo do modelo — verifique no manual). Pickup nova: buscar no eBay por "Cagiva W16 600 pickup coil". A substituição é relativamente simples (acesso pelo lado esquerdo do motor).',
  },
  {
    severity: 'OK',
    title: 'Carburador Dell\'Orto VHBZ 36A: desmontagem e limpeza acessível para mecânicos experientes',
    body: 'O carburador Dell\'Orto VHBZ 36A do W-16 é um slide direto (não de vácuo), robusto e fácil de limpar. Em caso de carburador entupido por combustível oxidado: desmonte, mergulhe em carburador cleaner por 30 minutos e use agulha de 0,3 mm para desobstruir. Jets do Dell\'Orto VHBZ: procure por número de referência Dell\'Orto em lojas de motocross. O jato principal pode ser ajustado por altitude (Brasília, Belo Horizonte: jato menor; litoral: jato original).',
  },
  {
    severity: 'OK',
    title: 'Calibragem off-road: reduzir para 22 PSI frente / 26 PSI traseiro em trilha',
    body: 'Para uso off-road no W-16 600cc, reduza a calibragem para 22 PSI na roda dianteira e 26 PSI na traseira (pneus de uso misto ou enduro). Isso aumenta a área de contato com o solo não pavimentado e melhora a tração. Ao retornar para o asfalto, volte para 29 PSI (frente) e 32 PSI (traseiro). Calibragem baixa demais no asfalto aumenta o consumo, o calor e o risco de furo. Sempre carregue uma mini-bomba de mão.',
  },
]

const W16600_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vibração acima de 90 km/h: característica estrutural do monocilíndrico — não é falha',
    body: 'O motor monocilíndrico de 601cc do W-16 vibra perceptivelmente em alta rotação e alta velocidade — especialmente acima de 90 km/h. Essa vibração é normal e inerente ao projeto de motor single de grande cilindrada. Amortecedores de guidão gastos aumentam a vibração percebida — inspecione-os a cada 20.000 km. Se a vibração aumentou abruptamente ou mudou de frequência: verifique rolamentos de roda, balanceamento de pneus e parafusos da suspensão.',
  },
  {
    severity: 'DANGER',
    title: 'Peças estruturais do motor: importação obrigatória — Cagiva não tem distribuidora ativa no Brasil',
    body: 'Pistão, biela, anéis e peças internas do motor 601cc são exclusivos Cagiva. Não existem no mercado nacional. Fontes internacionais: eBay (vendedores de peças Cagiva W16), Louis Moto (DE) e Bihr (FR) às vezes listam. O custo de importação pode tornar inviável economicamente um motor com dano interno. Antes de comprar: faça teste de compressão (normal: 10–12 bar) e escute se há batidas ou ruídos metálicos anormais. Motor com batida de biela = sucata no Brasil.',
  },
  {
    severity: 'WARN',
    title: 'Corrente de transmissão: desgaste acelerado em uso off-road — lubrificar a cada 500 km',
    body: 'Uso em trilhas acelera o desgaste da corrente pelo contato com terra, barro e areia. Lubrifique a corrente a cada 500 km em uso misto ou a cada 300 km em uso majoritariamente off-road. Use lubrificante de corrente off-road (formulação que resiste à arremesso e não atrai areia — tipo Motul Chain Off Road ou DID Chain Lube). Tensão da corrente: verificar conforme manual (normalmente 20–30 mm de folga vertical medida no ponto médio da corrente).',
  },
]

const W16600_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma W-16 600cc: intervalos de manutenção para uso enduro/misto',
    body: '3.000 km ou 6 meses — Troca de óleo motor (10W40 semissintético, ~2,2 L com filtro). | A cada 500 km (off-road) ou 1.000 km (asfalto) — Lubrificar corrente de transmissão. | 5.000 km — Tensionar e inspecionar corrente (desgaste de elos, pinhão e coroa). | 5.000 km — Limpar filtro de ar (esponja — em uso off-road, a cada 2.000 km). | 10.000 km — Verificar sprag clutch (funcionalidade da partida elétrica). | 10.000 km — Verificar folga de válvulas (motor 4T monocilíndrico). | 10.000 km — Vela NGK DR8ES (ou equivalente). | 20.000 km — Fluido de freio DOT 4 + inspecionar bobina pickup (resistência com multímetro). | 30.000 km — Rolamentos de roda (desgaste acelerado em off-road).',
  },
]

// ─── BLOCKS ──────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'CANYON 500',
    yearFrom: 1998,
    yearTo: 2002,
    MACETES: CANYON500_MACETES,
    PROBLEMAS: CANYON500_PROBLEMAS,
    MANUTENCAO: CANYON500_MANUTENCAO,
  },
  {
    modelName: 'ELEFANT 750',
    yearFrom: 1994,
    yearTo: 1995,
    MACETES: ELEFANT750_MACETES,
    PROBLEMAS: ELEFANT750_PROBLEMAS,
    MANUTENCAO: ELEFANT750_MANUTENCAO,
  },
  {
    modelName: 'ELEFANT 900',
    yearFrom: 1994,
    yearTo: 1995,
    MACETES: ELEFANT900_MACETES,
    PROBLEMAS: ELEFANT900_PROBLEMAS,
    MANUTENCAO: ELEFANT900_MANUTENCAO,
  },
  {
    modelName: 'GRAN CANYON 900',
    yearFrom: 1999,
    yearTo: 2000,
    MACETES: GRCANYON900_MACETES,
    PROBLEMAS: GRCANYON900_PROBLEMAS,
    MANUTENCAO: GRCANYON900_MANUTENCAO,
  },
  {
    modelName: 'MITO 125',
    yearFrom: 1999,
    yearTo: 2001,
    MACETES: MITO125_MACETES,
    PROBLEMAS: MITO125_PROBLEMAS,
    MANUTENCAO: MITO125_MANUTENCAO,
  },
  {
    modelName: 'NAVIGATOR 1000',
    yearFrom: 2001,
    yearTo: 2001,
    MACETES: NAVIGATOR1000_MACETES,
    PROBLEMAS: NAVIGATOR1000_PROBLEMAS,
    MANUTENCAO: NAVIGATOR1000_MANUTENCAO,
  },
  {
    modelName: 'PLANET 125',
    yearFrom: 1999,
    yearTo: 1999,
    MACETES: PLANET125_MACETES,
    PROBLEMAS: PLANET125_PROBLEMAS,
    MANUTENCAO: PLANET125_MANUTENCAO,
  },
  {
    modelName: 'ROADSTER 200CC',
    yearFrom: 1997,
    yearTo: 2000,
    MACETES: ROADSTER200_MACETES,
    PROBLEMAS: ROADSTER200_PROBLEMAS,
    MANUTENCAO: ROADSTER200_MANUTENCAO,
  },
  {
    modelName: 'V-RAPTOR 1000',
    yearFrom: 2001,
    yearTo: 2002,
    MACETES: VRAPTOR1000_MACETES,
    PROBLEMAS: VRAPTOR1000_PROBLEMAS,
    MANUTENCAO: VRAPTOR1000_MANUTENCAO,
  },
  {
    modelName: 'W-16 600CC',
    yearFrom: 1996,
    yearTo: 2000,
    MACETES: W16600_MACETES,
    PROBLEMAS: W16600_PROBLEMAS,
    MANUTENCAO: W16600_MANUTENCAO,
  },
]

// ─── TIRE PRESSURES ──────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'CANYON 500',
    yearFrom: 1998,
    yearTo: 2002,
    tireSize: '100/90-19 (F) · 140/80-17 (R)',
    frontPsi: 29,
    rearPsi: 32,
    frontPsiLoad: 29,
    rearPsiLoad: 36,
    notes: 'Enduro trail. Uso off-road: reduzir para 22 PSI (F) / 26 PSI (R). Sempre recalibrar ao retornar ao asfalto.',
  },
  {
    modelName: 'ELEFANT 750',
    yearFrom: 1994,
    yearTo: 1995,
    tireSize: '100/90-19 (F) · 140/80-17 (R)',
    frontPsi: 29,
    rearPsi: 32,
    frontPsiLoad: 32,
    rearPsiLoad: 36,
    notes: 'Dual sport Ducati 748cc. Com garupa ou carga, aumentar para 32/36 PSI.',
  },
  {
    modelName: 'ELEFANT 900',
    yearFrom: 1994,
    yearTo: 1995,
    tireSize: '100/90×19 (F) · 140/80×17 (R)',
    frontPsi: 29,
    rearPsi: 32,
    frontPsiLoad: 32,
    rearPsiLoad: 36,
    notes: 'Dual sport Ducati 904cc. Com garupa ou carga, aumentar para 32/36 PSI.',
  },
  {
    modelName: 'GRAN CANYON 900',
    yearFrom: 1999,
    yearTo: 2000,
    tireSize: '100/90 R19 (F) · 150/70 R17 (R)',
    frontPsi: 29,
    rearPsi: 33,
    frontPsiLoad: 32,
    rearPsiLoad: 36,
    notes: 'Traseiro mais largo (150/70 R17) que os Elefants. Com garupa, aumentar para 32/36 PSI.',
  },
  {
    modelName: 'MITO 125',
    yearFrom: 1999,
    yearTo: 2001,
    tireSize: '110/70 ZR17 (F) · 150/60 ZR17 (R)',
    frontPsi: 29,
    rearPsi: 32,
    frontPsiLoad: 29,
    rearPsiLoad: 36,
    notes: 'Esportiva 125cc 2T. Pneus ZR de alta velocidade — manter calibragem correta para comportamento esportivo seguro.',
  },
  {
    modelName: 'NAVIGATOR 1000',
    yearFrom: 2001,
    yearTo: 2001,
    tireSize: '110/80-18 (F) · 150/70-17 (R)',
    frontPsi: 33,
    rearPsi: 36,
    frontPsiLoad: 36,
    rearPsiLoad: 42,
    notes: 'Naked 1000cc Suzuki TL engine. Pressões mais altas pela relação peso/cilindrada.',
  },
  {
    modelName: 'PLANET 125',
    yearFrom: 1999,
    yearTo: 1999,
    tireSize: '110/70 R17 (F) · 150/60 R17 (R)',
    frontPsi: 29,
    rearPsi: 32,
    frontPsiLoad: 29,
    rearPsiLoad: 36,
    notes: 'Urbana 125cc 2T. Mesmos pneus do Mito 125. Com garupa frequente, usar 32/36 PSI.',
  },
  {
    modelName: 'ROADSTER 200CC',
    yearFrom: 1997,
    yearTo: 2000,
    tireSize: '90/90×19 (F) · 130/90×16 (R)',
    frontPsi: 26,
    rearPsi: 29,
    frontPsiLoad: 29,
    rearPsiLoad: 32,
    notes: 'Naked urban 200cc. Pneus de perfil alto, pressões mais baixas que motos esportivas.',
  },
  {
    modelName: 'V-RAPTOR 1000',
    yearFrom: 2001,
    yearTo: 2002,
    tireSize: '120/70×17 (F) · 180/55×17 (R)',
    frontPsi: 33,
    rearPsi: 36,
    frontPsiLoad: 33,
    rearPsiLoad: 42,
    notes: 'Naked esportiva 1000cc. Pneu traseiro 180 largo — manter pressão para evitar aquecimento excessivo.',
  },
  {
    modelName: 'W-16 600CC',
    yearFrom: 1996,
    yearTo: 2000,
    tireSize: '90/90-21 (F) · 130/80-17 (R)',
    frontPsi: 29,
    rearPsi: 32,
    frontPsiLoad: null,
    rearPsiLoad: null,
    notes: 'Enduro 600cc. Off-road: reduzir para 22 PSI (F) / 26 PSI (R) para maior aderência. Recalibrar ao retornar ao asfalto.',
  },
]

// ─── MAINTENANCE ITEMS ────────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // CANYON 500
  { modelName: 'CANYON 500', yearFrom: 1998, yearTo: 2002, component: 'Óleo motor (10W40 semissintético, ~2,0 L + filtro)', intervalKm: 5000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'CANYON 500', yearFrom: 1998, yearTo: 2002, component: 'Filtro de ar (esponja — lavar com gasolina + óleo filtro)', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'CANYON 500', yearFrom: 1998, yearTo: 2002, component: 'Tensão da correia de transmissão', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'CANYON 500', yearFrom: 1998, yearTo: 2002, component: 'Inspeção do sprag clutch (partida elétrica)', intervalKm: 10000, intervalMonths: null, notes: 'Testar partida elétrica; substituir preventivamente se disponível', priority: 'CRITICAL', order: 4 },
  { modelName: 'CANYON 500', yearFrom: 1998, yearTo: 2002, component: 'Folga de válvulas (motor 4T mono)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'CANYON 500', yearFrom: 1998, yearTo: 2002, component: 'Fluido de freio DOT 4', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'CANYON 500', yearFrom: 1998, yearTo: 2002, component: 'Rolamentos de roda', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'CANYON 500', yearFrom: 1998, yearTo: 2002, component: 'Rolamentos de direção', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 8 },

  // ELEFANT 750
  { modelName: 'ELEFANT 750', yearFrom: 1994, yearTo: 1995, component: 'Óleo motor (10W40 sintético, ~3,0 L + HifloFiltro HF153)', intervalKm: 5000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'ELEFANT 750', yearFrom: 1994, yearTo: 1995, component: 'CORREIA DENTADA Ducati L-twin desmodromico', intervalKm: 15000, intervalMonths: 24, notes: 'OBRIGATÓRIO — motor desmodromico sem correia = motor destruído', priority: 'CRITICAL', order: 2 },
  { modelName: 'ELEFANT 750', yearFrom: 1994, yearTo: 1995, component: 'Ajuste de calços desmodromicos (especialista Ducati)', intervalKm: 15000, intervalMonths: 24, notes: 'Feito junto com a correia dentada', priority: 'CRITICAL', order: 3 },
  { modelName: 'ELEFANT 750', yearFrom: 1994, yearTo: 1995, component: 'Velas NGK DCPR8E (2 unidades)', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'ELEFANT 750', yearFrom: 1994, yearTo: 1995, component: 'Filtro de ar', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 5 },
  { modelName: 'ELEFANT 750', yearFrom: 1994, yearTo: 1995, component: 'Fluido de freio DOT 4 (Brembo)', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'ELEFANT 750', yearFrom: 1994, yearTo: 1995, component: 'Rolamentos de roda', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },

  // ELEFANT 900
  { modelName: 'ELEFANT 900', yearFrom: 1994, yearTo: 1995, component: 'Óleo motor (10W40 sintético, ~3,0 L + HifloFiltro HF153)', intervalKm: 5000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'ELEFANT 900', yearFrom: 1994, yearTo: 1995, component: 'Sincronização carburadores Dell\'Orto PHF 36', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'ELEFANT 900', yearFrom: 1994, yearTo: 1995, component: 'CORREIA DENTADA Ducati L-twin desmodromico', intervalKm: 15000, intervalMonths: 24, notes: 'OBRIGATÓRIO — motor desmodromico sem correia = motor destruído', priority: 'CRITICAL', order: 3 },
  { modelName: 'ELEFANT 900', yearFrom: 1994, yearTo: 1995, component: 'Ajuste de calços desmodromicos (especialista Ducati)', intervalKm: 15000, intervalMonths: 24, notes: 'Feito junto com a correia dentada', priority: 'CRITICAL', order: 4 },
  { modelName: 'ELEFANT 900', yearFrom: 1994, yearTo: 1995, component: 'Velas NGK DCPR8E (2 unidades)', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'ELEFANT 900', yearFrom: 1994, yearTo: 1995, component: 'Filtro de ar', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'ELEFANT 900', yearFrom: 1994, yearTo: 1995, component: 'Fluido de freio DOT 4', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'ELEFANT 900', yearFrom: 1994, yearTo: 1995, component: 'Rolamentos de roda', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 8 },

  // GRAN CANYON 900
  { modelName: 'GRAN CANYON 900', yearFrom: 1999, yearTo: 2000, component: 'Óleo motor (10W40 sintético, ~3,0 L + HifloFiltro HF153)', intervalKm: 5000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'GRAN CANYON 900', yearFrom: 1999, yearTo: 2000, component: 'Verificar mangueiras injeção Weber-Marelli (abraçadeiras)', intervalKm: 10000, intervalMonths: null, notes: 'Mangueira solta causa engasgos e retorno de chama', priority: 'HIGH', order: 2 },
  { modelName: 'GRAN CANYON 900', yearFrom: 1999, yearTo: 2000, component: 'Sensor MAP e sensor temperatura (limpar terminais)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'GRAN CANYON 900', yearFrom: 1999, yearTo: 2000, component: 'CORREIA DENTADA Ducati L-twin desmodromico', intervalKm: 15000, intervalMonths: 24, notes: 'OBRIGATÓRIO — motor desmodromico sem correia = motor destruído', priority: 'CRITICAL', order: 4 },
  { modelName: 'GRAN CANYON 900', yearFrom: 1999, yearTo: 2000, component: 'Ajuste de calços desmodromicos (especialista Ducati)', intervalKm: 15000, intervalMonths: 24, notes: 'Feito junto com a correia dentada', priority: 'CRITICAL', order: 5 },
  { modelName: 'GRAN CANYON 900', yearFrom: 1999, yearTo: 2000, component: 'Velas NGK DCPR8E (2 unidades)', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'GRAN CANYON 900', yearFrom: 1999, yearTo: 2000, component: 'Filtro de ar', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'GRAN CANYON 900', yearFrom: 1999, yearTo: 2000, component: 'Fluido de freio DOT 4', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'GRAN CANYON 900', yearFrom: 1999, yearTo: 2000, component: 'Líquido de arrefecimento (G11 50% + água destilada)', intervalKm: 24000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 9 },

  // MITO 125
  { modelName: 'MITO 125', yearFrom: 1999, yearTo: 2001, component: 'Vela NGK BR9ES', intervalKm: 3000, intervalMonths: null, notes: 'Motor 2T carboniza vela mais rápido', priority: 'HIGH', order: 1 },
  { modelName: 'MITO 125', yearFrom: 1999, yearTo: 2001, component: 'Filtro de ar (esponja — lavar + óleo)', intervalKm: 3000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'MITO 125', yearFrom: 1999, yearTo: 2001, component: 'Descarbonar flap da válvula CTS', intervalKm: 6000, intervalMonths: null, notes: 'Querosene + escova de dente — nunca usar lixa', priority: 'HIGH', order: 3 },
  { modelName: 'MITO 125', yearFrom: 1999, yearTo: 2001, component: 'Verificar folga cabos CTS (1 mm exato cada)', intervalKm: 6000, intervalMonths: null, notes: 'Folga zero queima o servo', priority: 'HIGH', order: 4 },
  { modelName: 'MITO 125', yearFrom: 1999, yearTo: 2001, component: 'Autoteste servo CTS (desconectar cabos + 2x ignição)', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 5 },
  { modelName: 'MITO 125', yearFrom: 1999, yearTo: 2001, component: 'Verificar compressão motor (mínimo 9 bar)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'MITO 125', yearFrom: 1999, yearTo: 2001, component: 'Anel do pistão', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'MITO 125', yearFrom: 1999, yearTo: 2001, component: 'Kit pistão completo (pistão + anel + rolamento de biela)', intervalKm: 20000, intervalMonths: null, notes: 'Wossner (DE) é o fabricante recomendado', priority: 'HIGH', order: 8 },
  { modelName: 'MITO 125', yearFrom: 1999, yearTo: 2001, component: 'Fluido de freio DOT 4', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 9 },

  // NAVIGATOR 1000
  { modelName: 'NAVIGATOR 1000', yearFrom: 2001, yearTo: 2001, component: 'Óleo motor (10W40 sintético, ~3,2 L + HifloFiltro HF138)', intervalKm: 6000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'NAVIGATOR 1000', yearFrom: 2001, yearTo: 2001, component: 'Velas NGK CR9E (2 unidades)', intervalKm: 8000, intervalMonths: null, notes: 'Mesmas do Suzuki TL1000S', priority: 'HIGH', order: 2 },
  { modelName: 'NAVIGATOR 1000', yearFrom: 2001, yearTo: 2001, component: 'Inspeção disco de freio traseiro (trincas)', intervalKm: 10000, intervalMonths: null, notes: 'Inspecionar visualmente com lanterna', priority: 'CRITICAL', order: 3 },
  { modelName: 'NAVIGATOR 1000', yearFrom: 2001, yearTo: 2001, component: 'Sincronização corpos de borboleta (TBS)', intervalKm: 12000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'NAVIGATOR 1000', yearFrom: 2001, yearTo: 2001, component: 'Filtro de ar', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 5 },
  { modelName: 'NAVIGATOR 1000', yearFrom: 2001, yearTo: 2001, component: 'Fluido de freio DOT 4', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'NAVIGATOR 1000', yearFrom: 2001, yearTo: 2001, component: 'Mangueiras do sistema de arrefecimento', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'NAVIGATOR 1000', yearFrom: 2001, yearTo: 2001, component: 'Líquido de arrefecimento (G11 50% + água destilada)', intervalKm: 24000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 8 },
  { modelName: 'NAVIGATOR 1000', yearFrom: 2001, yearTo: 2001, component: 'Rolamentos de roda', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 9 },

  // PLANET 125
  { modelName: 'PLANET 125', yearFrom: 1999, yearTo: 1999, component: 'Vela NGK BR9ES', intervalKm: 3000, intervalMonths: null, notes: 'Motor 2T — mesma vela do Mito 125', priority: 'HIGH', order: 1 },
  { modelName: 'PLANET 125', yearFrom: 1999, yearTo: 1999, component: 'Filtro de ar (esponja — lavar + óleo)', intervalKm: 3000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'PLANET 125', yearFrom: 1999, yearTo: 1999, component: 'Descarbonar flap CTS + verificar folga cabos (1 mm)', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'PLANET 125', yearFrom: 1999, yearTo: 1999, component: 'Verificar compressão motor (mínimo 9 bar)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'PLANET 125', yearFrom: 1999, yearTo: 1999, component: 'Anel do pistão', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'PLANET 125', yearFrom: 1999, yearTo: 1999, component: 'Kit pistão completo (pistão + anel + rolamento de biela)', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'PLANET 125', yearFrom: 1999, yearTo: 1999, component: 'Fluido de freio DOT 4', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 7 },

  // ROADSTER 200CC
  { modelName: 'ROADSTER 200CC', yearFrom: 1997, yearTo: 2000, component: 'Óleo motor (10W40 semissintético, ~1,5 L com filtro)', intervalKm: 5000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'ROADSTER 200CC', yearFrom: 1997, yearTo: 2000, component: 'Regulagem freio traseiro (tambor)', intervalKm: 5000, intervalMonths: null, notes: '10–15 mm livre antes de sentir resistência', priority: 'HIGH', order: 2 },
  { modelName: 'ROADSTER 200CC', yearFrom: 1997, yearTo: 2000, component: 'Filtro de ar (esponja lavável)', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'ROADSTER 200CC', yearFrom: 1997, yearTo: 2000, component: 'Vela NGK D8EA', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'ROADSTER 200CC', yearFrom: 1997, yearTo: 2000, component: 'Verificar membrana carburador Mikuni BST 28', intervalKm: 10000, intervalMonths: null, notes: 'Buscar microfissuras segurando contra a luz', priority: 'HIGH', order: 5 },
  { modelName: 'ROADSTER 200CC', yearFrom: 1997, yearTo: 2000, component: 'Folga de válvulas (motor 4T mono)', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'ROADSTER 200CC', yearFrom: 1997, yearTo: 2000, component: 'Fluido de freio DOT 4 (disco dianteiro)', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'ROADSTER 200CC', yearFrom: 1997, yearTo: 2000, component: 'Lubrificar cabos (freio traseiro e embreagem)', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'LOW', order: 8 },

  // V-RAPTOR 1000
  { modelName: 'V-RAPTOR 1000', yearFrom: 2001, yearTo: 2002, component: 'Óleo motor (10W40 sintético, ~3,2 L + HifloFiltro HF138)', intervalKm: 6000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'V-RAPTOR 1000', yearFrom: 2001, yearTo: 2002, component: 'Velas NGK CR9E (2 unidades)', intervalKm: 8000, intervalMonths: null, notes: 'Mesmas do Suzuki TL1000S', priority: 'HIGH', order: 2 },
  { modelName: 'V-RAPTOR 1000', yearFrom: 2001, yearTo: 2002, component: 'Inspeção disco de freio traseiro (trincas radiais)', intervalKm: 10000, intervalMonths: null, notes: 'Inspeção visual obrigatória com lanterna', priority: 'CRITICAL', order: 3 },
  { modelName: 'V-RAPTOR 1000', yearFrom: 2001, yearTo: 2002, component: 'Sincronização corpos de borboleta (TBS)', intervalKm: 12000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'V-RAPTOR 1000', yearFrom: 2001, yearTo: 2002, component: 'Filtro de ar', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 5 },
  { modelName: 'V-RAPTOR 1000', yearFrom: 2001, yearTo: 2002, component: 'Fluido de freio DOT 4', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'V-RAPTOR 1000', yearFrom: 2001, yearTo: 2002, component: 'Verificar mangueiras do sistema de arrefecimento', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'V-RAPTOR 1000', yearFrom: 2001, yearTo: 2002, component: 'Líquido de arrefecimento (G11 50% + água destilada)', intervalKm: 24000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 8 },
  { modelName: 'V-RAPTOR 1000', yearFrom: 2001, yearTo: 2002, component: 'Rolamentos de roda', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 9 },

  // W-16 600CC
  { modelName: 'W-16 600CC', yearFrom: 1996, yearTo: 2000, component: 'Óleo motor (10W40 semissintético, ~2,2 L com filtro)', intervalKm: 3000, intervalMonths: 6, notes: 'Intervalos menores por uso off-road', priority: 'HIGH', order: 1 },
  { modelName: 'W-16 600CC', yearFrom: 1996, yearTo: 2000, component: 'Lubrificar corrente de transmissão', intervalKm: 500, intervalMonths: null, notes: 'A cada 300 km em uso off-road intenso', priority: 'HIGH', order: 2 },
  { modelName: 'W-16 600CC', yearFrom: 1996, yearTo: 2000, component: 'Tensão e desgaste da corrente (pinhão e coroa)', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'W-16 600CC', yearFrom: 1996, yearTo: 2000, component: 'Filtro de ar (esponja — a cada 2.000 km em off-road)', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'W-16 600CC', yearFrom: 1996, yearTo: 2000, component: 'Inspeção sprag clutch (partida elétrica)', intervalKm: 10000, intervalMonths: null, notes: 'Substituir preventivamente se disponível', priority: 'CRITICAL', order: 5 },
  { modelName: 'W-16 600CC', yearFrom: 1996, yearTo: 2000, component: 'Folga de válvulas (motor 4T mono)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'W-16 600CC', yearFrom: 1996, yearTo: 2000, component: 'Vela NGK DR8ES', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'W-16 600CC', yearFrom: 1996, yearTo: 2000, component: 'Fluido de freio DOT 4', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'W-16 600CC', yearFrom: 1996, yearTo: 2000, component: 'Verificar bobina pickup (resistência com multímetro)', intervalKm: 20000, intervalMonths: null, notes: 'Normal: 100–500 ohm — falha causa corte de ignição', priority: 'MEDIUM', order: 9 },
  { modelName: 'W-16 600CC', yearFrom: 1996, yearTo: 2000, component: 'Rolamentos de roda (desgaste acelerado em off-road)', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'HIGH', order: 10 },
]

// ─── RUNNER ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed CAGIVA iniciado...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })

  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'CAGIVA', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'CAGIVA', vehicleTypeId: motoType.id },
  })

  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))

    await prisma.tip.deleteMany({ where: { modelName: block.modelName } })
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }, idx) => ({
        modelName: block.modelName,
        category: cat,
        severity: tip.severity,
        title: tip.title,
        body: tip.body,
        yearFrom:  null,
        yearTo:    null,
        order: idx,
      })),
    })

    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }

  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName } })
    await prisma.tirePressure.create({
      data: {
        modelName: tp.modelName,
        yearFrom: tp.yearFrom,
        yearTo: tp.yearTo,
        tireSize: tp.tireSize,
        frontPsi: tp.frontPsi,
        rearPsi: tp.rearPsi,
        frontPsiLoad: tp.frontPsiLoad,
        rearPsiLoad: tp.rearPsiLoad,
        notes: tp.notes,
      },
    })
    console.log(`  🔵 TirePressure: ${tp.modelName}`)
  }

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: BLOCKS.map((b) => b.modelName) } },
  })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Seed CAGIVA concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
