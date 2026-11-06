/**
 * Seed BMW — R 1250 RT, R 12 e R 12 GS
 * Complementa seed-bmw.ts com o touring boxer ShiftCam (R 1250 RT) e a nova
 * geração do boxer air/oil-cooled "back to basics" lançada em 2024 (R 12 / R 12 GS)
 *
 * Fontes: bmw-motorrad.com.br, bmw-motorrad.com (press kit R 12 / R 12 GS 2024),
 *         maintenanceschedule.com, motorcycleparts-hornig.com, bmwgsbrasil.com.br,
 *         reclameaqui.com.br, ninetowners.com, advrider.com, ManualsLib (manuais oficiais)
 *
 * Nota sobre R 12 / R 12 GS: são modelos lançados em 2024 — ainda não há histórico
 * consolidado de proprietários no Brasil. Os itens de "PROBLEMAS" para esses dois
 * modelos são majoritariamente pontos de atenção preventivos, não defeitos confirmados.
 *
 * Execute: pnpm --filter @motormacete/database db:seed:bmw-r1250rt-r12
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

// ─── R 1250 RT ─────────────────────────────────────────────────────────────

const R1250RT_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesmo motor ShiftCam da R 1250 GS: peças e óleo são intercambiáveis',
    body: 'A R 1250 RT usa o mesmo motor Boxer 1.254cc ShiftCam (VVT eletro-hidráulico) da R 1250 GS, entregando cerca de 136 cv a 7.750 rpm e 143 Nm a 6.250 rpm. Filtro de óleo, filtro de ar e velas são as mesmas peças usadas na GS — qualquer mecânico especializado em BMW Boxer moderno já conhece o procedimento. Óleo: sintético 5W-40 API SL/JASO MA2 (BMW Motorrad Advantec Ultimate ou equivalente Mobil 1 Racing 4T), aproximadamente 4,25L com troca de filtro. Troque a cada 10.000 km sem exceções — o ShiftCam depende de óleo limpo para acionar os canais hidráulicos que trocam o perfil de came.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK LMAR8D-J: 2 unidades, gap 0,8 mm, troca a cada 20.000 km',
    body: 'A R 1250 RT usa 2 velas NGK LMAR8D-J (uma por cilindro Boxer), gap 0,8 mm. Custo: R$ 100–R$ 180 cada. Diferente da R 1250 GS, o acesso às velas na RT é mais restrito por causa do carenamento completo — reserve tempo extra ou peça orçamento de mão de obra maior na concessionária/oficina para essa troca.',
  },
  {
    severity: 'OK',
    title: 'Para-brisa elétrico: lubrifique o mecanismo 1x ao ano para evitar travamento',
    body: 'O para-brisa com ajuste elétrico de altura é um dos diferenciais da RT como touring. O mecanismo (motor elétrico + cremalheira/guias) acumula sujeira e resseca a graxa da guia com o tempo, especialmente em quem roda muito em estrada com poeira. Lubrifique as guias laterais com silicone em spray 1x por ano — evita ruído de atrito e travamento parcial do curso. Se o para-brisa parar de responder ao botão, verifique primeiro o fusível específico antes de suspeitar do motor.',
  },
  {
    severity: 'OK',
    title: 'Câmbio e cardan: dois óleos separados, troca a cada 20.000 km junto com a revisão maior',
    body: 'Como toda BMW Boxer com cardan, a R 1250 RT tem dois reservatórios de óleo além do motor: câmbio (SAE 75W-90 GL-5, ~0,8L) e cardan (SAE 75W-90 GL-5, 180 ml). Troque os dois junto com a revisão de 20.000 km. Cardan com óleo velho apresenta ruído de "clunk" ao soltar a embreagem devagar — sintoma que muitos donos confundem com folga na transmissão.',
  },
  {
    severity: 'OK',
    title: 'Pneus sport-touring: Michelin Road 6 GT, Bridgestone T32/T33 ou Metzeler Roadtec 01 são os preferidos',
    body: 'A RT carrega até 2 pessoas + bagagem em viagens longas, então o pneu original de fábrica varia por lote (Bridgestone Battlax T32/T33, Metzeler Roadtec 01, Michelin Road 5/6 GT — a versão "GT" tem carcaça reforçada para suportar o peso extra de touring). Ao trocar, prefira sempre a versão GT/reforçada se fizer viagens com garupa e malas cheias — o pneu "normal" da mesma linha desgasta mais rápido e pode deformar com carga sustentada em alta velocidade.',
  },
  {
    severity: 'OK',
    title: 'GS-911: mesma ferramenta de diagnóstico da linha GS funciona na RT',
    body: 'A R 1250 RT compartilha a arquitetura eletrônica da R 1250 GS (ABS Pro, ASA, ESA/DDC opcional, TFT Connectivity). O GS-911 (R$ 600–R$ 900 importado) lê e apaga códigos de falha de todos os módulos, incluindo o painel TFT Nav VI e o sistema de áudio/rádio (se equipado). Antes de pagar diagnóstico caro na concessionária, procure um mecânico independente especializado em BMW que tenha a ferramenta — comum em SP, RJ e BH.',
  },
  {
    severity: 'OK',
    title: 'Malas e baú: revise a vedação das borrachas 1x ao ano antes do inverno/chuvas',
    body: 'As malas laterais (semi-rígidas ou rígidas, dependendo da versão) e o baú traseiro opcional têm vedação de borracha que resseca com sol e uso. Revise a vedação antes da temporada de chuvas — mala com vedação ressecada deixa entrar água e estraga bagagem em viagem. Silicone em gel (não em spray, que pode escorrer) aplicado na borracha de vedação 1x ao ano prolonga a vida útil e mantém a estanqueidade.',
  },
  {
    severity: 'WARN',
    title: 'Marcha à ré elétrica (opcional): use apenas em terreno plano e não force com a moto inclinada',
    body: 'A R 1250 RT oferece marcha à ré elétrica assistida (motor elétrico que movimenta a moto para trás em baixa velocidade, útil para manobrar em garagem/estacionamento com a moto carregada). O sistema tem limite de inclinação e de torque — não force a moto em ré em rampa ou com o guidão muito virado. Uso abusivo do sistema em subidas acelera o desgaste do motor de ré, item caro de substituir (concessionária apenas).',
  },
]

const R1250RT_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Atuador do ShiftCam: mesma vulnerabilidade da R 1250 GS — óleo de qualidade é a prevenção',
    body: 'O atuador eletro-hidráulico do ShiftCam pode acumular sujeira nos canais internos e falhar no chaveamento entre o perfil de came de baixo torque e o de potência. Sintoma: motor "murcho" em baixa rotação, sem o empuxo característico do Boxer. Diagnóstico requer GS-911 ou scanner BMW. Prevenção: óleo sintético 5W-40 certificado, trocado religiosamente a cada 10.000 km — não estenda o intervalo mesmo que o indicador de serviço ainda não tenha disparado. Custo de reparo do atuador fora da garantia: R$ 2.000–R$ 5.000.',
  },
  {
    severity: 'WARN',
    title: 'Bateria: eletrônica embarcada extensa drena a bateria em motos paradas',
    body: 'A R 1250 RT tem mais módulos eletrônicos que a GS (rádio/áudio opcional, aquecimento de banco e punhos, cruise control, para-brisa elétrico, TFT Nav VI) — todos com consumo residual em stand-by. Moto parada por mais de 2–3 semanas sem carregador de manutenção corre risco de bateria descarregada, especialmente em garagem fria. Use carregador com modo AGM/Lithium (dependendo da bateria original do ano/versão) — nunca um carregador comum de chumbo-ácido genérico.',
  },
  {
    severity: 'WARN',
    title: 'Motor do para-brisa elétrico: item de desgaste — falha é mecânica, não eletrônica na maioria dos casos',
    body: 'Com o uso prolongado (tipicamente acima de 40.000–60.000 km ou vários anos de sol/poeira), o motor e a cremalheira do para-brisa elétrico podem apresentar lentidão ou parada em posição intermediária. Antes de trocar o motor (peça cara), limpe e lubrifique as guias — muitas vezes o problema é atrito mecânico acumulado, não falha elétrica. Se o motor realmente falhou, existem kits de reparo aftermarket (rolamentos e engrenagens) mais baratos que a unidade completa original.',
  },
  {
    severity: 'WARN',
    title: 'Tela TFT Nav VI: travamentos e reinicializações — mantenha o firmware atualizado',
    body: 'Proprietários relatam ocasionais travamentos ou reinicializações espontâneas da tela TFT (Nav VI), principalmente em unidades com firmware desatualizado ou ao conectar via Bluetooth com determinados modelos de smartphone. A BMW lança atualizações de firmware periodicamente — peça a atualização em toda revisão na concessionária, mesmo que o painel pareça funcionar normalmente. Isso também resolve boa parte dos casos de pareamento Bluetooth instável com o app BMW Motorrad Connected.',
  },
  {
    severity: 'WARN',
    title: 'Conectores de banco e punho aquecidos: corrosão de contato após anos de exposição',
    body: 'Os conectores elétricos dos acessórios de conforto (banco aquecido, punhos aquecidos) ficam expostos a variação de temperatura e umidade embaixo do banco/carenagem. Após vários anos, é comum contato intermitente — o aquecimento liga e desliga sozinho ou não atinge a temperatura máxima. Solução: desmontar o conector, limpar com contact cleaner e aplicar graxa dielétrica. Problema simples e barato de resolver preventivamente antes que o mau contato gere um ponto de superaquecimento no chicote.',
  },
  {
    severity: 'OK',
    title: 'Nenhum recall crítico de motor pendente conhecido para a geração ShiftCam da RT no Brasil',
    body: 'Diferente da geração R 1200 GS LC (cardan e Telelever), a R 1250 RT (motor ShiftCam, 2019+) não tem recall de motor ou transmissão amplamente divulgado no Brasil até o momento. Recalls, quando existem, tendem a ser pontuais e relacionados a software (calibração de ABS/ASA) ou peças específicas de determinados lotes — sempre confirme o número de chassi (VIN) no site da BMW Motorrad Brasil antes de comprar uma unidade usada.',
  },
]

const R1250RT_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma R 1250 RT (2019+): igual à R 1250 GS, mais os itens específicos de touring',
    body: '1.000 km — Revisão de rodagem obrigatória no dealer (ShiftCam exige primeiro aperto rigoroso, checklist elétrico completo). | 10.000 km — Óleo sintético 5W-40 BMW Advantec Ultimate (~4,25L) + filtro + freios + nível de refrigerante + lubrificação das guias do para-brisa elétrico. | 20.000 km — Tudo do 10k + 2 velas NGK LMAR8D-J (gap 0,8 mm) + filtro de ar + folga de válvulas (IN 0,10–0,15 mm / EX 0,20–0,25 mm, motor frio) + óleo do câmbio (75W-90, ~0,8L) + óleo do cardan (75W-90, 180 ml) + fluido de freio DOT 4 + fluido de embreagem hidráulica DOT 4. | 40.000 km — Tudo do 20k + revisão dos rolamentos do Telelever/Paralever e óleo de garfo. | Atualização de firmware do painel TFT e ABS/ASA em toda revisão maior. | Calibragem de pneus: 36 PSI frente / 42 PSI atrás solo (2,5/2,9 bar).',
  },
]

// ─── R 12 ──────────────────────────────────────────────────────────────────

const R12_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor herdado da família R nineT: mais simples que o ShiftCam, manutenção mais barata',
    body: 'A R 12 (lançada em 2024) usa uma nova evolução do Boxer 1.170cc refrigerado a ar e óleo — a mesma família de motor da R nineT, sem o sistema ShiftCam (VVT) nem refrigeração líquida da linha R 1250/1300. Potência estimada em torno de 95 cv (70 kW) a 7.000 rpm e 115 Nm a 6.500 rpm (números divulgados pela BMW na apresentação do modelo) — menos potência de pico que a R nineT, com mapeamento voltado a torque em baixo/médio para entregar caráter mais "clássico" na pilotagem. Por não ter ShiftCam, a manutenção do motor é mecanicamente mais simples e, historicamente nessa família de motor, mais barata que a dos Boxers ShiftCam.',
  },
  {
    severity: 'OK',
    title: 'Óleo: 15W-50 JASO MA2 sintético, mesmo padrão da R nineT — troca a cada 10.000 km',
    body: 'Por compartilhar a base de motor com a R nineT, a R 12 usa a mesma especificação de óleo: SAE 15W-50 API SJ/JASO MA2 sintético (BMW Motorrad Advantec Ultimate ou equivalente Motul 7100 15W-50), aproximadamente 3,8L com troca de filtro. Filtro de óleo: mesma referência da R nineT (Hiflofiltro HF164 ou equivalente, R$ 40–R$ 70) — confirme a referência exata na concessionária, já que pequenos ajustes de motor entre gerações podem alterar a peça. Intervalo: 10.000 km ou 1 ano.',
  },
  {
    severity: 'OK',
    title: 'Vela: mesma família NGK MAR8B-JDS da R nineT, gap 0,8 mm (confirme no manual da sua unidade)',
    body: 'O motor Boxer 1.170cc air/oil-cooled da R 12 é evolução direta do motor da R nineT, então a vela NGK MAR8B-JDS (gap 0,8 mm, 2 unidades — uma por cilindro) é a referência mais provável, mas como o modelo é recente confirme a especificação exata na primeira revisão. Troca recomendada a cada 20.000 km, seguindo o padrão da família de motor.',
  },
  {
    severity: 'OK',
    title: 'Cardan e câmbio: mesma lógica das outras Boxer com eixo — dois óleos, troca a cada 20.000 km',
    body: 'Como toda BMW Boxer com transmissão por cardan, a R 12 tem óleo de câmbio (75W-90 GL-5, ~0,75L) e óleo do cardan (70W-80 hipoide, 180 ml) separados do óleo do motor. Troque os dois a cada 20.000 km. Sem corrente para lubrificar, é fácil esquecer esses dois pontos — muitos donos de Boxer com cardan só lembram do óleo do motor e deixam câmbio/cardan vencerem por anos.',
  },
  {
    severity: 'OK',
    title: 'Mercado de acessórios: aproveite o catálogo já maduro da R nineT/Option 719',
    body: 'Por compartilhar plataforma e visual retrô com a família R nineT, a R 12 já nasce com bom suporte de acessórios: guidão, banco, escapamento e proteções de marcas como Wunderlich, SW-Motech e Hepco & Becker que atendem a R nineT frequentemente têm ou terão versão compatível para a R 12 — confirme encaixe exato (a R 12 tem chassi novo, então nem tudo é 100% intercambiável, mas a linguagem de peças é a mesma). A linha oficial BMW Option 719 (rodas, acabamento, banco) também está disponível para o modelo desde o lançamento.',
  },
  {
    severity: 'OK',
    title: 'Revisão de 1.000 km: obrigatória em concessionária para manter a garantia de fábrica',
    body: 'Como todo lançamento BMW Motorrad, a revisão de 1.000 km da R 12 é obrigatória em rede autorizada para não perder a garantia. Guarde a nota fiscal e o carimbo no manual/sistema digital. A partir da segunda revisão, avalie oficinas independentes especializadas em BMW Boxer (o motor, apesar de novo no chassi, usa arquitetura já conhecida por mecânicos que atendem R nineT há anos).',
  },
  {
    severity: 'OK',
    title: 'Bateria: use carregador de manutenção em paradas longas, mesmo sendo moto nova',
    body: 'Moto nova não significa bateria imune a descarga. A R 12 tem itens eletrônicos (ride-by-wire, TFT, modos de pilotagem, ABS) que mantêm consumo residual com a moto desligada. Em paradas superiores a 3 semanas, conecte um carregador de manutenção (CTEK, Optimate) compatível com o tipo de bateria equipada (confirme AGM ou Lítio na ficha técnica da sua unidade antes de escolher o carregador certo).',
  },
  {
    severity: 'OK',
    title: 'Pneus: combinação 19"/17" pede opções on/off leve — verifique a plaqueta da sua versão',
    body: 'A R 12 adota postura roadster/scrambler com rodas de raio maior que uma naked pura, mais próxima da linha Scrambler da R nineT. Para uso essencialmente urbano/estrada, pneus 100% rodoviários como Michelin Road 5/6 ou Metzeler Roadtec são a escolha mais confortável. Se pretende rodar ocasionalmente em terra batida, pneus mistos leves (Continental TKC70 ou Metzeler Tourance) mantêm bom comportamento no asfalto sem sacrificar tanto a aderência fora de estrada. Sempre confirme a medida exata na plaqueta da sua unidade — pode variar conforme pacote/opcional escolhido.',
  },
]

const R12_PROBLEMAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Modelo lançado em 2024: ainda não existe histórico consolidado de falhas no Brasil',
    body: 'A R 12 é recente demais para haver um padrão confiável de "problemas conhecidos" a partir de reclamações reais de proprietários — diferente de modelos como F 800 GS ou R 1200 GS, que têm anos de dados no Reclame Aqui e fóruns. Os pontos abaixo são recomendações preventivas baseadas na plataforma de motor (compartilhada com a R nineT) e no perfil típico de motos novas na primeira geração, não defeitos confirmados em massa. Acompanhe fóruns internacionais (advrider.com, bmwmotorradblog) e o histórico de recall da BMW Motorrad Brasil ao longo dos primeiros 1–2 anos de uso.',
  },
  {
    severity: 'WARN',
    title: 'Boxer air/oil-cooled aquece em trânsito parado — mesma característica da R nineT',
    body: 'Por herdar o motor da família R nineT (sem radiador de água nos cabeçotes), a R 12 tende a esquentar mais que uma Boxer ShiftCam (com cabeçotes refrigerados a água) quando parada em trânsito lento por muitos minutos seguidos, especialmente em dias quentes. Isso é característica de projeto, não defeito. Evite ralenti prolongado parado no sol; prefira desligar o motor em esperas longas (acima de 5 minutos) em trânsito muito lento.',
  },
  {
    severity: 'WARN',
    title: 'Folga de válvulas: motor air-cooled tende a pedir verificação mais frequente que motores líquidos',
    body: 'Motores Boxer refrigerados a ar/óleo historicamente exigem verificação de folga de válvulas mais frequente que motores com refrigeração líquida — na família R nineT o intervalo recomendado é 10.000 km. É razoável esperar padrão semelhante na R 12 até a BMW divulgar/confirmar o intervalo definitivo para este motor específico; siga o indicador de serviço do painel e o manual da sua unidade.',
  },
  {
    severity: 'WARN',
    title: 'Ride-by-wire novo: possível engasgo em baixa rotação nos primeiros milhares de km',
    body: 'Sistemas de acelerador eletrônico (ride-by-wire) recém-lançados costumam receber ajustes de mapeamento via atualização de firmware nos primeiros meses após o lançamento, à medida que a fábrica recebe feedback de uso real. Se notar resposta um pouco brusca ou engasgo em baixa rotação nos primeiros milhares de km, pergunte na revisão se há atualização de mapa de injeção disponível — é uma prática comum da BMW em lançamentos recentes (visto na S 1000 R e outros modelos).',
  },
  {
    severity: 'WARN',
    title: 'Conectores elétricos expostos: visual retrô tem menos carenagem protegendo o chicote',
    body: 'Assim como a R nineT, a R 12 tem estética "naked/roadster" com pouca carenagem cobrindo o chicote elétrico e os conectores — isso é parte do apelo visual retrô, mas deixa os conectores mais expostos a água, poeira e sal (em regiões litorâneas) do que uma moto totalmente carenada. Aplique graxa dielétrica nos principais conectores acessíveis (faróis, sinaleiras) durante a manutenção preventiva anual, especialmente se a moto roda ou é guardada perto do mar.',
  },
]

const R12_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma R 12 (2024+): baseado no padrão da família de motor R nineT',
    body: '1.000 km — Revisão de rodagem obrigatória no dealer (óleo 15W-50 + filtro + checklist geral + atualização de firmware se disponível). | 10.000 km — Óleo 15W-50 sintético (~3,8L) + filtro + folga de válvulas verificada (motor frio) + freios verificados. | 20.000 km — Tudo do 10k + 2 velas NGK MAR8B-JDS (gap 0,8 mm, confirmar referência na revisão) + filtro de ar + óleo do câmbio (75W-90, ~0,75L) + óleo do cardan (70W-80, 180 ml) + fluido de freio DOT 4. | 40.000 km — Tudo do 20k + óleo de garfo. | Calibragem de pneus: 36 PSI frente / 39 PSI atrás solo (valores de referência baseados na família R nineT — confirme na plaqueta da sua unidade). | Como o modelo é novo, sempre confirme intervalos exatos no manual do proprietário e no indicador de serviço do painel — a BMW pode ajustar especificações em atualizações de produção.',
  },
]

// ─── R 12 GS ───────────────────────────────────────────────────────────────

const R12GS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'A homenagem moderna à R 80 G/S: mesmo motor da R 12, ergonomia e rodas de adventure',
    body: 'A R 12 GS (2024) usa o mesmo Boxer 1.170cc air/oil-cooled da R 12, com a mesma potência estimada em torno de 95 cv / 115 Nm, mas com chassi/suspensão ajustados para uso adventure: maior curso de suspensão, rodas raiadas (dianteira maior, tipicamente 19", traseira 17" — confirme a medida exata na plaqueta da sua unidade) e postura de pilotagem em pé mais natural. Visualmente remete à lendária R 80 G/S de 1980, vencedora do Paris-Dakar. Mecanicamente, tudo que vale para o motor da R 12 (óleo, vela, filtro) vale igualmente para a GS.',
  },
  {
    severity: 'OK',
    title: 'Rodas raiadas com câmara: reparo de furo é diferente do tubeless — carregue kit específico',
    body: 'Diferente de rodas tubeless (liga leve), rodas raiadas tradicionais em geral usam câmara de ar — um furo não pode ser reparado com o kit de cogumelo/manchão tubeless comum. Antes de sair em trilha ou viagem longa, confirme se a sua unidade tem câmara ou é preparada para tubeless (BMW oferece a opção "cross-spoke" tubeless em vários modelos GS modernos) e carregue o kit de reparo correto — câmara sobressalente ou kit tubeless, conforme o caso. Confundir os dois tipos no meio de uma trilha deixa você sem solução.',
  },
  {
    severity: 'OK',
    title: 'Óleo e vela: idênticos à R 12 — aproveite a mesma rede de peças e mecânicos',
    body: 'A R 12 GS compartilha motor com a R 12: óleo 15W-50 JASO MA2 sintético (~3,8L com filtro) e vela NGK MAR8B-JDS (gap 0,8 mm, 2 unidades). Qualquer oficina já preparada para atender a R 12 ou a R nineT consegue atender a R 12 GS sem dificuldade adicional no motor — a diferença entre os modelos está no chassi, suspensão e rodas, não na motorização.',
  },
  {
    severity: 'OK',
    title: 'Proteção para uso off-road: cárter e proteção de motor valem a pena desde o primeiro dia',
    body: 'Se pretende usar a R 12 GS em trilha com regularidade, instale desde cedo: protetor de cárter (bash plate), protetor de cabeçote (os cilindros Boxer horizontais são os primeiros a bater em quedas laterais) e protetor de mão. Marcas com bom histórico em GS da BMW no Brasil: Wunderlich, SW-Motech, Touratech — vale pesquisar compatibilidade específica com a R 12 GS, já que é chassi novo e o catálogo de acessórios de terceiros ainda está em expansão.',
  },
  {
    severity: 'OK',
    title: 'Suspensão de curso mais longo: calibre a pré-carga para o seu peso e a carga da viagem',
    body: 'O curso de suspensão maior da R 12 GS (em relação à R 12) exige atenção à pré-carga do monoshock traseiro, especialmente com bagagem. Pré-carga insuficiente para o peso total (piloto + garupa + malas) reduz o curso útil disponível e piora o comportamento em batidas fortes off-road. Ajuste a pré-carga (manual ou eletrônica, dependendo da versão) antes de cada viagem longa com carga diferente do uso do dia a dia.',
  },
  {
    severity: 'OK',
    title: 'Cardan e câmbio: mesmos óleos e intervalos da R 12',
    body: 'Óleo do câmbio 75W-90 GL-5 (~0,75L) e óleo do cardan 70W-80 hipoide (180 ml), trocados a cada 20.000 km — igual à R 12. Em uso off-road pesado, vale inspecionar visualmente o cardan e a caixa de câmbio com mais frequência em busca de vazamentos, já que trilha expõe as vedações a impacto de pedras e lama.',
  },
  {
    severity: 'OK',
    title: 'Pneus adventure: Metzeler Karoo 4, Continental TKC80 ou Michelin Anakee Wild para uso misto',
    body: 'Para quem realmente vai usar a vocação off-road da GS, pneus adventure/enduro como Metzeler Karoo 4, Continental TKC80 ou Michelin Anakee Wild entregam melhor aderência em terra e pedra, ao custo de desgaste mais rápido no asfalto. Para uso majoritariamente rodoviário com trilha ocasional, pneus mistos leves como Metzeler Tourance ou Continental TKC70 equilibram melhor durabilidade e conforto no dia a dia.',
  },
  {
    severity: 'OK',
    title: 'Revisão de 1.000 km obrigatória — mesma regra de garantia de todo lançamento BMW',
    body: 'Assim como a R 12, a revisão de 1.000 km da R 12 GS deve ser feita em concessionária autorizada para preservar a garantia de fábrica. Guarde comprovantes de todas as revisões, principalmente nos primeiros anos de um modelo novo — histórico completo de manutenção ajuda muito na revenda e em qualquer eventual acionamento de garantia.',
  },
]

const R12GS_PROBLEMAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Modelo lançado em 2024: sem histórico de falhas consolidado — trate os pontos abaixo como preventivos',
    body: 'Assim como a R 12, a R 12 GS ainda não tem massa crítica de relatos reais de proprietários no Brasil para apontar "problemas conhecidos" com confiança. Os itens a seguir são pontos de atenção preventivos baseados na plataforma de motor compartilhada (família R nineT) e no comportamento típico de motos adventure recém-lançadas — não defeitos confirmados em série.',
  },
  {
    severity: 'WARN',
    title: 'Retentores de bengala: tendência conhecida em toda linha GS quando usada em off-road frequente',
    body: 'Historicamente, toda a família GS da BMW (F 800 GS, F 850 GS, R 1200/1250 GS) apresenta tendência de vazamento nos retentores de bengala em uso off-road intenso, por causa da abrasão de poeira e areia na haste da suspensão. É razoável esperar comportamento semelhante na R 12 GS ao longo do tempo, mesmo sem dados específicos ainda. Prevenção: instale protetores de bengala (fork boots) se for rodar em trilha com frequência — acessório barato que evita uma troca de retentor bem mais cara.',
  },
  {
    severity: 'WARN',
    title: 'Boxer air/oil-cooled aquece mais que a linha ShiftCam em trânsito parado',
    body: 'Mesma observação da R 12: por não ter cabeçotes refrigerados a água, a R 12 GS tende a esquentar mais que a R 1250 GS/R 1300 GS quando parada em trânsito lento por muito tempo. Não é falha — é característica do motor mais simples herdado da família R nineT. Evite ralenti prolongado parado sob sol forte.',
  },
  {
    severity: 'WARN',
    title: 'Rodas raiadas com câmara: risco de furo definitivo maior que rodas tubeless em trilha',
    body: 'Se a sua unidade usa câmara de ar (verifique na ficha técnica), um furo por objeto pontiagudo em trilha pode ser mais difícil de resolver no local do que em uma roda tubeless — a câmara furada geralmente precisa ser trocada, não apenas remendada com kit de reparo rápido. Para quem faz trilha longe de assistência, vale avaliar a opção de rodas cross-spoke tubeless (se disponível na configuração) ou sempre carregar câmara sobressalente e ferramentas para desmontar o pneu.',
  },
  {
    severity: 'WARN',
    title: 'Conectores elétricos expostos: mesma observação da R 12, agravada pelo uso off-road',
    body: 'A exposição do chicote elétrico característica do visual retrô da R 12 GS é agravada em uso off-road, onde lama, poeira e água em travessias de rio chegam com mais força aos conectores. Aplique graxa dielétrica nos conectores acessíveis (faróis, sinaleiras, sensores) na manutenção preventiva, e lave a moto com atenção após trilha — evite jato de alta pressão direto em conectores e mancais.',
  },
]

const R12GS_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma R 12 GS (2024+): igual à R 12 no motor, com atenção extra à suspensão e rodas',
    body: '1.000 km — Revisão de rodagem obrigatória no dealer (óleo 15W-50 + filtro + checklist geral + atualização de firmware se disponível). | 10.000 km — Óleo 15W-50 sintético (~3,8L) + filtro + folga de válvulas verificada (motor frio) + freios verificados + inspeção de retentores de bengala. | 20.000 km — Tudo do 10k + 2 velas NGK MAR8B-JDS (gap 0,8 mm) + filtro de ar + óleo do câmbio (75W-90, ~0,75L) + óleo do cardan (70W-80, 180 ml) + fluido de freio DOT 4 + inspeção de raios/aro (rodas raiadas pedem reaperto periódico de raios, especialmente após uso off-road intenso). | 30.000 km — Óleo de garfo (curso maior de suspensão pede atenção redobrada ao amortecimento). | Calibragem de pneus: 33 PSI frente / 38 PSI atrás solo (valores de referência para a categoria adventure — confirme na plaqueta da sua unidade). | Modelo novo: sempre confirme intervalos exatos no manual do proprietário e no indicador de serviço do painel.',
  },
]

// ─── Blocos de modelos ────────────────────────────────────────────────────────

const bmwModels: ModelBlock[] = [
  {
    modelName: 'R 1250 RT',
    yearFrom: 2019,
    yearTo: null,
    MACETES: R1250RT_MACETES,
    PROBLEMAS: R1250RT_PROBLEMAS,
    MANUTENCAO: R1250RT_MANUTENCAO,
  },
  {
    modelName: 'R 12',
    yearFrom: 2024,
    yearTo: null,
    MACETES: R12_MACETES,
    PROBLEMAS: R12_PROBLEMAS,
    MANUTENCAO: R12_MANUTENCAO,
  },
  {
    modelName: 'R 12 GS',
    yearFrom: 2024,
    yearTo: null,
    MACETES: R12GS_MACETES,
    PROBLEMAS: R12GS_PROBLEMAS,
    MANUTENCAO: R12GS_MANUTENCAO,
  },
]

// ─── Calibragem de pneus ──────────────────────────────────────────────────────

const bmwTirePressures: TirePressureInput[] = [
  {
    modelName: 'R 1250 RT',
    yearFrom: 2019,
    yearTo: null,
    tireSize: 'Dianteiro 120/70 ZR17 | Traseiro 180/55 ZR17',
    frontPsi: 36,
    rearPsi: 42,
    frontPsiLoad: 36,
    rearPsiLoad: 46,
    notes: 'Solo: 36/42 PSI (2,5/2,9 bar). Com garupa e bagagem completa (malas + baú): 36/46 PSI — sempre aumente a pressão traseira antes de viagens carregadas. Pneus de fábrica variam por lote: Bridgestone Battlax T32/T33, Metzeler Roadtec 01, Michelin Road 5/6 GT. Prefira sempre a versão "GT"/reforçada em touring com garupa frequente. Verifique sempre com pneus frios.',
  },
  {
    modelName: 'R 12',
    yearFrom: 2024,
    yearTo: null,
    tireSize: 'Dianteiro 110/80 R19 | Traseiro 150/70 R17 (estimado — confirme na plaqueta)',
    frontPsi: 36,
    rearPsi: 39,
    frontPsiLoad: 36,
    rearPsiLoad: 42,
    notes: 'Modelo lançado em 2024 — valores de referência baseados na família de motor/plataforma R nineT (mesmo porte e proposta roadster/scrambler). Solo: 36/39 PSI. Com garupa: 36/42 PSI. Confirme a medida exata de pneu e a pressão recomendada na plaqueta da sua unidade antes da primeira calibragem, pois pode variar conforme pacote/opcional (Pure, Option 719).',
  },
  {
    modelName: 'R 12 GS',
    yearFrom: 2024,
    yearTo: null,
    tireSize: 'Dianteiro 110/80 R19 | Traseiro 150/70 R17 (estimado — confirme na plaqueta)',
    frontPsi: 33,
    rearPsi: 38,
    frontPsiLoad: 33,
    rearPsiLoad: 42,
    notes: 'Modelo lançado em 2024 — valores de referência para a categoria adventure de médio porte (mais leve que a R 1250 GS). Solo: 33/38 PSI. Com garupa e bagagem: 33/42 PSI. Off-road leve: reduza cerca de 3–5 PSI no traseiro. Rodas raiadas podem ser com câmara ou tubeless dependendo da configuração — confirme antes de decidir o kit de reparo de furo a levar em viagem.',
  },
]

// ─── Cronogramas de manutenção ────────────────────────────────────────────────

const bmwMaintenanceItems: MaintenanceItemInput[] = [

  // ── R 1250 RT ──────────────────────────────────────────────────────────────
  { modelName: 'R 1250 RT', yearFrom: 2019, yearTo: null, order: 0,
    component: 'Óleo do motor (5W-40 JASO MA2 sintético, ShiftCam)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume ~4,25L com filtro. BMW Advantec Ultimate ou Mobil 1 Racing 4T. Óleo sujo compromete o atuador do ShiftCam — não estenda o intervalo.' },
  { modelName: 'R 1250 RT', yearFrom: 2019, yearTo: null, order: 1,
    component: 'Vela NGK LMAR8D-J (par, gap 0,8 mm)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Mesma vela da R 1250 GS. Acesso mais restrito por causa do carenamento completo — reserve mão de obra extra.' },
  { modelName: 'R 1250 RT', yearFrom: 2019, yearTo: null, order: 2,
    component: 'Filtro de ar', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Troca junto com a vela na revisão de 20.000 km.' },
  { modelName: 'R 1250 RT', yearFrom: 2019, yearTo: null, order: 3,
    component: 'Folga de válvulas', intervalKm: 20000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'IN 0,10–0,15 mm / EX 0,20–0,25 mm, motor completamente frio. Sistema shim-and-bucket.' },
  { modelName: 'R 1250 RT', yearFrom: 2019, yearTo: null, order: 4,
    component: 'Óleo do câmbio (75W-90 GL-5)', intervalKm: 20000, intervalMonths: null, priority: 'MEDIUM',
    notes: '~0,8L. Troque junto com o óleo do cardan.' },
  { modelName: 'R 1250 RT', yearFrom: 2019, yearTo: null, order: 5,
    component: 'Óleo do cardan (75W-90 GL-5)', intervalKm: 20000, intervalMonths: null, priority: 'MEDIUM',
    notes: '180 ml. Ruído de "clunk" ao soltar embreagem devagar indica óleo vencido.' },
  { modelName: 'R 1250 RT', yearFrom: 2019, yearTo: null, order: 6,
    component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'Troque a cada 2 anos. Sistema ABS Pro/Integral ABS.' },
  { modelName: 'R 1250 RT', yearFrom: 2019, yearTo: null, order: 7,
    component: 'Fluido de embreagem hidráulica (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'Troque a cada 2 anos junto com o fluido de freio.' },
  { modelName: 'R 1250 RT', yearFrom: 2019, yearTo: null, order: 8,
    component: 'Lubrificação do mecanismo do para-brisa elétrico', intervalKm: null, intervalMonths: 12, priority: 'LOW',
    notes: 'Silicone em spray nas guias laterais 1x ao ano evita travamento e ruído.' },
  { modelName: 'R 1250 RT', yearFrom: 2019, yearTo: null, order: 9,
    component: 'Bateria — carregador de manutenção em paradas longas', intervalKm: null, intervalMonths: null, priority: 'LOW',
    notes: 'Use carregador com modo AGM/Lítio (conforme a bateria da unidade) em paradas acima de 2–3 semanas.' },

  // ── R 12 ───────────────────────────────────────────────────────────────────
  { modelName: 'R 12', yearFrom: 2024, yearTo: null, order: 0,
    component: 'Óleo do motor (15W-50 JASO MA2 sintético)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume ~3,8L com filtro. Mesma especificação da família R nineT. BMW Advantec Ultimate ou Motul 7100 15W-50.' },
  { modelName: 'R 12', yearFrom: 2024, yearTo: null, order: 1,
    component: 'Vela NGK MAR8B-JDS (par, gap 0,8 mm — confirmar na revisão)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Referência provável por herança da família R nineT. Confirme especificação exata na primeira revisão, modelo é recente.' },
  { modelName: 'R 12', yearFrom: 2024, yearTo: null, order: 2,
    component: 'Filtro de ar', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Troca junto com a vela na revisão de 20.000 km.' },
  { modelName: 'R 12', yearFrom: 2024, yearTo: null, order: 3,
    component: 'Folga de válvulas', intervalKm: 10000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Motor air/oil-cooled — intervalo mais frequente que motores líquidos, padrão herdado da R nineT (10.000 km). Motor completamente frio.' },
  { modelName: 'R 12', yearFrom: 2024, yearTo: null, order: 4,
    component: 'Óleo do câmbio (75W-90 GL-5)', intervalKm: 20000, intervalMonths: null, priority: 'MEDIUM',
    notes: '~0,75L. Troque junto com o óleo do cardan.' },
  { modelName: 'R 12', yearFrom: 2024, yearTo: null, order: 5,
    component: 'Óleo do cardan (70W-80 hipoide)', intervalKm: 20000, intervalMonths: null, priority: 'MEDIUM',
    notes: '180 ml. Transmissão por eixo, sem corrente para lubrificar.' },
  { modelName: 'R 12', yearFrom: 2024, yearTo: null, order: 6,
    component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'Troque a cada 2 anos.' },
  { modelName: 'R 12', yearFrom: 2024, yearTo: null, order: 7,
    component: 'Revisão de rodagem de 1.000 km', intervalKm: 1000, intervalMonths: null, priority: 'HIGH',
    notes: 'Obrigatória em concessionária autorizada para manter a garantia de fábrica.' },
  { modelName: 'R 12', yearFrom: 2024, yearTo: null, order: 8,
    component: 'Bateria — carregador de manutenção em paradas longas', intervalKm: null, intervalMonths: null, priority: 'LOW',
    notes: 'Confirme tipo de bateria (AGM ou Lítio) na ficha técnica antes de escolher o carregador.' },

  // ── R 12 GS ────────────────────────────────────────────────────────────────
  { modelName: 'R 12 GS', yearFrom: 2024, yearTo: null, order: 0,
    component: 'Óleo do motor (15W-50 JASO MA2 sintético)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume ~3,8L com filtro. Mesmo motor da R 12, compartilha especificação com a família R nineT.' },
  { modelName: 'R 12 GS', yearFrom: 2024, yearTo: null, order: 1,
    component: 'Vela NGK MAR8B-JDS (par, gap 0,8 mm — confirmar na revisão)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Mesma referência estimada da R 12. Confirme na primeira revisão.' },
  { modelName: 'R 12 GS', yearFrom: 2024, yearTo: null, order: 2,
    component: 'Filtro de ar', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Inspecione a cada 10.000 km se usar a moto em trilha com regularidade — poeira reduz a vida útil.' },
  { modelName: 'R 12 GS', yearFrom: 2024, yearTo: null, order: 3,
    component: 'Folga de válvulas', intervalKm: 10000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Mesmo padrão da R 12 — motor air/oil-cooled pede verificação mais frequente. Motor frio.' },
  { modelName: 'R 12 GS', yearFrom: 2024, yearTo: null, order: 4,
    component: 'Óleo do câmbio (75W-90 GL-5)', intervalKm: 20000, intervalMonths: null, priority: 'MEDIUM',
    notes: '~0,75L. Inspecione vedações com mais frequência em uso off-road pesado.' },
  { modelName: 'R 12 GS', yearFrom: 2024, yearTo: null, order: 5,
    component: 'Óleo do cardan (70W-80 hipoide)', intervalKm: 20000, intervalMonths: null, priority: 'MEDIUM',
    notes: '180 ml. Inspecione visualmente com mais frequência após trilha (impacto de pedras nas vedações).' },
  { modelName: 'R 12 GS', yearFrom: 2024, yearTo: null, order: 6,
    component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'Troque a cada 2 anos.' },
  { modelName: 'R 12 GS', yearFrom: 2024, yearTo: null, order: 7,
    component: 'Óleo de garfo (bengala)', intervalKm: 30000, intervalMonths: null, priority: 'LOW',
    notes: 'Curso de suspensão maior que a R 12 pede atenção redobrada ao amortecimento e aos retentores.' },
  { modelName: 'R 12 GS', yearFrom: 2024, yearTo: null, order: 8,
    component: 'Inspeção de raios e aro (rodas raiadas)', intervalKm: null, intervalMonths: 6, priority: 'LOW',
    notes: 'Reaperto periódico de raios, especialmente após uso off-road intenso. Verifique também se a configuração é com câmara ou tubeless.' },
  { modelName: 'R 12 GS', yearFrom: 2024, yearTo: null, order: 9,
    component: 'Revisão de rodagem de 1.000 km', intervalKm: 1000, intervalMonths: null, priority: 'HIGH',
    notes: 'Obrigatória em concessionária autorizada para manter a garantia de fábrica.' },
]

// ─── Runner ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed BMW R 1250 RT / R 12 / R 12 GS iniciando...\n')

  const motoType = await prisma.vehicleType.upsert({
    where: { slug: 'moto' },
    update: {},
    create: { slug: 'moto', label: 'Moto' },
  })

  const bmwBrand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'BMW', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'BMW', vehicleTypeId: motoType.id },
  })
  console.log(`  ✅ Brand: ${bmwBrand.name}`)

  for (const block of bmwModels) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: bmwBrand.id } },
      update: {},
      create: { name: block.modelName, brandId: bmwBrand.id },
    })

    await prisma.tip.deleteMany({ where: { modelName: block.modelName } })

    const allTips: { cat: Cat; tip: TipInput }[] = [
      ...block.MACETES.map(t => ({ cat: 'MACETES' as Cat, tip: t })),
      ...block.PROBLEMAS.map(t => ({ cat: 'PROBLEMAS' as Cat, tip: t })),
      ...block.MANUTENCAO.map(t => ({ cat: 'MANUTENCAO' as Cat, tip: t })),
    ]

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

    const counts = {
      m: block.MACETES.length,
      p: block.PROBLEMAS.length,
      mt: block.MANUTENCAO.length,
    }
    console.log(
      `  🔧 ${block.modelName} (${block.yearFrom ?? '?'}–${block.yearTo ?? 'atual'}): ` +
      `${counts.m} macetes, ${counts.p} problemas, ${counts.mt} manutenção`,
    )
  }

  console.log('\n  📏 Calibragem de pneus...')
  for (const tp of bmwTirePressures) {
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
    console.log(`  ✅ ${tp.modelName}: ${tp.frontPsi}/${tp.rearPsi} PSI`)
  }

  console.log('\n  🔧 Cronogramas de manutenção...')
  const modelNames = [...new Set(bmwMaintenanceItems.map(m => m.modelName))]
  for (const name of modelNames) {
    await prisma.maintenanceItem.deleteMany({ where: { modelName: name } })
  }
  await prisma.maintenanceItem.createMany({
    data: bmwMaintenanceItems.map(item => ({
      modelName: item.modelName,
      yearFrom: item.yearFrom,
      yearTo: item.yearTo,
      component: item.component,
      intervalKm: item.intervalKm,
      intervalMonths: item.intervalMonths,
      notes: item.notes,
      priority: item.priority,
      order: item.order,
    })),
  })
  for (const name of modelNames) {
    const count = bmwMaintenanceItems.filter(m => m.modelName === name).length
    console.log(`  ✅ ${name}: ${count} itens de manutenção`)
  }

  const totalTips = bmwModels.reduce(
    (acc, b) => acc + b.MACETES.length + b.PROBLEMAS.length + b.MANUTENCAO.length,
    0,
  )
  console.log(
    `\n✅ Seed BMW R 1250 RT / R 12 / R 12 GS concluído: ${bmwModels.length} modelos, ${totalTips} dicas, ${bmwTirePressures.length} calibragens, ${bmwMaintenanceItems.length} itens de manutenção.`,
  )
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
