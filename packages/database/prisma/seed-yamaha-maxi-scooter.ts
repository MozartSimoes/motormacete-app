// seed-yamaha-maxi-scooter.ts — Yamaha TMAX 530 · Majesty YP 250 · Aerox Connected ABS
// TMAX 530 (2016-2024 no Brasil): 530cc bicilíndrico paralelo líquido-refrigerado, CVT — maxi-scooter
// premium, câmbio automático com "Y" característico e frenagem/suspensão de moto de verdade.
// Majesty YP 250 (2007-2013 no Brasil): 249cc monocilíndrico líquido-refrigerado, CVT — scooter
// grande mais simples e antiga da linha, descontinuada há mais de uma década.
// Aerox Connected ABS (2023-atual): 155cc monocilíndrico injetado, CVT, painel conectado ao
// smartphone (Y-Connect) — scooter esportiva compacta, moderna.
//
// ATENÇÃO — matching de modelName com a FIPE (ver apps/web/app/api/tips/route.ts::matchesStoredName):
// verificado programaticamente (script node temporário, descartado) contra as 155 strings reais da
// FIPE Yamaha (parallelum.com.br/fipe/api/v1/motos/marcas/101/modelos): "TMAX 530", "MAJESTY YP 250"
// e "AEROX CONNECTED ABS" batem CADA UMA com exatamente 1 nome da FIPE (o próprio) e ZERO colisão
// cruzada com qualquer modelName já usado em outros seed-yamaha-*.ts (NMAX, XMAX, T115 CRYPTON,
// CRYPTON 100, FLUO, NEO, NEOS CONNECTED, AXIS, BW S, JOG, CROSSER*, LANDER*, TENERE*, FAZER*, YBR*,
// FACTOR*, DT/RD/RDZ/TDR/WR clássicas, YZF R-15, XV 250 VIRAGO, ZR 125, MT-03*). Em especial:
// "TMAX 530" NÃO colide com "XMAX 250 ABS"/"XMAX 250 CONNECTED"/"XMAX 300 CONNECTED" (strings
// totalmente diferentes) e "AEROX CONNECTED ABS" é a ÚNICA entrada Yamaha na FIPE contendo "AEROX".
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }

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

// ─── TMAX 530 (2016-2024) ──────────────────────────────────────────────────────────────────
// Motor: 530cc bicilíndrico paralelo DOHC 4V, refrigerado a líquido | ~46,5 cv @ 7.500 rpm
// Torque: 5,4 kgf.m @ 5.750 rpm | Injeção eletrônica | CVT automático com sistema "Y" (correntes
// duplas internas na transmissão, mais robusto que CVT convencional de correia simples exposta)
// Óleo: 10W-40 API SL/JASO MA2 — capacidade ~3,4L (com filtro) | Vela NGK LMAR8AI-9 (iridium)
// Pneu: 120/70-15 (F) / 160/60-15 (R) | Tanque 15L | Peso ~220kg | Freios: disco duplo dianteiro
// com ABS de série | Concessionária: rede Yamaha especializada em premium (poucas cidades)

const TMAX_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Moto premium: peças e mão de obra bem mais caras que scooter comum — planeje o orçamento de manutenção',
    body: 'A TMAX 530 é o maxi-scooter mais sofisticado da linha Yamaha vendida no Brasil: motor bicilíndrico paralelo 530cc DOHC, câmbio CVT com sistema de correntes internas duplas ("Y" da Yamaha, mais robusto que o CVT de correia simples das scooters menores). Isso significa peças bem mais caras (óleo, filtro, kit de correntes internas) e menos oficinas capacitadas — normalmente só concessionária Yamaha ou oficina especializada premium consegue atender adequadamente. Antes de comprar usada, pesquise se há concessionária Yamaha com histórico de atendimento à TMAX na sua região.',
  },
  {
    severity: 'OK',
    title: 'Óleo do motor 10W-40 API SL/JASO MA2 — cerca de 3,4L com filtro; troque a cada 6.000 km',
    body: 'O motor bicilíndrico 530cc da TMAX tem capacidade de óleo bem maior que qualquer scooter monocilíndrica da linha: aproximadamente 3,4L na troca com filtro. Use sempre 10W-40 API SL, JASO MA2 (compatibilidade com embreagem, mesmo em scooter automática, pela especificação do fabricante). Yamalube 10W-40 é o recomendado oficial; Motul 7100 10W-40 é alternativa premium equivalente. Intervalo: 6.000 km ou 6 meses — não estenda, motor bicilíndrico de alta rotação sofre mais degradação térmica do óleo que motor monocilíndrico simples.',
  },
  {
    severity: 'DANGER',
    title: 'Óleo da transmissão CVT/correntes internas do sistema "Y" — item crítico e caro; NUNCA pule esta troca',
    body: 'A TMAX usa um sistema CVT com correntes internas duplas (ao invés da correia exposta comum em scooter simples) — esse sistema tem óleo específico de transmissão, separado do óleo do motor, que lubrifica as correntes e engrenagens internas da CVT. É um dos itens mais caros e mais críticos da manutenção da TMAX: negligenciar esse óleo pode causar dano interno à transmissão CVT, cujo reparo custa uma fração significativa do valor da moto. Siga rigorosamente o intervalo do manual (geralmente 20.000-24.000 km) — jamais estenda esse intervalo para economizar.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK LMAR8AI-9 (iridium, dupla ignição — uma por cilindro) — troque o par a cada 16.000-20.000 km',
    body: 'O motor bicilíndrico da TMAX usa duas velas iridium NGK LMAR8AI-9 (uma por cilindro), com durabilidade superior às velas convencionais — troca recomendada a cada 16.000-20.000 km, sempre o par junto mesmo que uma pareça em melhor estado. Custo do par: R$ 150-220. Vela iridium de fábrica reflete o posicionamento premium do modelo.',
  },
  {
    severity: 'WARN',
    title: 'Freios a disco duplo dianteiro com ABS — pastilhas de reposição mais caras que scooter comum; fluido DOT 4 obrigatório a cada 24 meses',
    body: 'A TMAX vem de série com freio a disco duplo dianteiro e sistema ABS — configuração de moto esportiva, não de scooter urbana simples. Pastilhas de freio original ou compatível de qualidade (EBC, Brembo) custam mais que em scooter comum, mas o desempenho de frenagem é proporcionalmente superior (a moto pesa ~220kg e atinge velocidades de rodovia). Fluido de freio DOT 4: troca obrigatória a cada 24 meses, independente da quilometragem — sistema ABS é sensível a fluido contaminado com umidade.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar e itens de manutenção básica: mesmo sendo moto premium, disponíveis nas concessionárias Yamaha',
    body: 'Apesar do posicionamento premium, itens de manutenção básica (filtro de ar, filtro de óleo) são normalmente encontrados nas concessionárias Yamaha sem grande dificuldade — o desafio maior é achar oficina fora da rede autorizada que tenha ferramental e conhecimento específico para o sistema CVT de correntes internas. Filtro de ar: inspecionar a cada 6.000 km, trocar a cada 12.000-18.000 km.',
  },
  {
    severity: 'OK',
    title: 'Marcas de óleo e pneu recomendadas para a TMAX 530',
    body: 'Óleo motor: Yamalube 10W-40, Motul 7100 10W-40 (ambos JASO MA2). Pneus: 120/70-15 (dianteiro) e 160/60-15 (traseiro) — Michelin Power Pure SC ou Pirelli Diablo Scooter são as referências para uso de rodovia/alta velocidade que a TMAX permite (é uma scooter capaz de rodovia com desempenho de moto média). Não economize em pneu nesta moto: o peso e a velocidade potencial exigem composto de qualidade para segurança em frenagem e curva.',
  },
]

const TMAX_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Negligência do óleo da transmissão CVT: risco real de dano interno caro ao sistema de correntes',
    body: 'O problema mais crítico documentado em unidades de alta quilometragem é a negligência da troca do óleo da transmissão CVT (item que muitos donos e até oficinas não especializadas desconhecem). Como o sistema "Y" usa correntes internas em vez de correia exposta, o desgaste não é visualmente óbvio como numa scooter comum — o dono só percebe quando já há ruído ou folga excessiva na transmissão, quando o dano já pode estar avançado. Reforce este item em toda revisão, mesmo que a concessionária não alerte automaticamente.',
  },
  {
    severity: 'WARN',
    title: 'Escassez de oficinas especializadas fora de grandes centros: atraso e custo de deslocamento para manutenção',
    body: 'Por ser um modelo premium de baixo volume de vendas comparado às scooters populares (NMAX, XMAX), a TMAX tem poucas oficinas fora da rede Yamaha (e nem toda concessionária tem técnico treinado para o sistema CVT específico) capacitadas a atender adequadamente. Donos fora de grandes centros urbanos podem precisar viajar para a concessionária mais próxima com histórico no modelo — considere isso antes de comprar se você mora em cidade pequena/média.',
  },
  {
    severity: 'WARN',
    title: 'Custo de peças elevado: pastilhas de freio, correntes CVT e componentes elétricos custam mais que a média da linha Yamaha',
    body: 'Por ser moto premium com componentes de maior complexidade (freio ABS duplo, motor bicilíndrico, CVT de correntes), o custo de reposição de peças de desgaste é sensivelmente maior que em qualquer outra scooter Yamaha vendida no Brasil. Planeje o orçamento de manutenção considerando esse diferencial antes de comprar — a TMAX não é uma scooter "barata de manter" apesar de ser scooter.',
  },
  {
    severity: 'WARN',
    title: 'Bateria e sistema elétrico: scooter com muitos recursos eletrônicos (ABS, painel digital) exige atenção redobrada à bateria',
    body: 'Com sistema ABS, painel digital completo e injeção eletrônica sofisticada, a TMAX é mais dependente de uma bateria em bom estado do que scooters mais simples — bateria fraca pode gerar códigos de erro no ABS ou instabilidade na injeção. Verifique a carga a cada 6 meses e não deixe a moto parada por longos períodos sem manutenção da bateria (carregador de manutenção/trickle charge é recomendado se a moto ficar parada por semanas).',
  },
]

const TMAX_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo TMAX 530: maxi-scooter premium exige disciplina rigorosa com óleo de motor e da transmissão CVT',
    body: '1.000 km — Revisão de amaciamento: troca de óleo do motor + inspeção geral (concessionária Yamaha). | 6.000 km — Troca de óleo do motor (10W-40 API SL/JASO MA2, ~3,4L com filtro) + filtro de óleo. | 12.000 km — Óleo + filtro de óleo. Verificar filtro de ar (trocar se necessário). | 16.000-20.000 km — Troca do par de velas NGK LMAR8AI-9 (iridium). | 18.000 km — Óleo + filtro de óleo. Inspeção de pastilhas de freio dianteiras/traseiras. | 20.000-24.000 km — Troca do óleo da transmissão CVT/sistema de correntes internas (item CRÍTICO — nunca pule). | 24.000 km — Óleo + filtro de óleo + filtro de ar. | 24 meses — Fluido de freio DOT 4 obrigatório (sistema ABS). | 6 meses — Verificação da bateria (sistema eletrônico completo é mais sensível a bateria fraca).',
  },
]

// ─── MAJESTY YP 250 (2007-2013) ────────────────────────────────────────────────────────────
// Motor: 249cc monocilíndrico SOHC 4V, refrigerado a líquido | ~20,7 cv @ 7.500 rpm
// Torque: 2,1 kgf.m @ 6.000 rpm | Injeção eletrônica (versões mais recentes) ou carburador
// (dependendo do ano/mercado) | CVT automático | Óleo: 10W-40 — capacidade ~1,1L com filtro
// Vela NGK CR8E | Pneu: 120/70-14 (F) / 150/70-13 (R) | Tanque 12L | Descontinuada no Brasil
// desde meados da década de 2010 — modelo mais antigo/legado da linha de maxi-scooters

const MAJESTY_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Modelo descontinuado há mais de uma década: scooter grande mais simples e antiga da linha Yamaha no Brasil',
    body: 'A Majesty YP 250 foi vendida no Brasil na segunda metade dos anos 2000 e início dos 2010, sendo descontinuada há mais de uma década. É um motor monocilíndrico 249cc líquido-refrigerado, mecânica mais simples que a TMAX (motor bicilíndrico) e mais antiga que a XMAX 250 (que a sucedeu como scooter grande da marca). Se você está comprando uma Majesty usada hoje, está lidando com uma moto de mercado secundário — avalie o estado geral com atenção redobrada, considerando a idade mínima de mais de 10 anos de qualquer unidade em circulação.',
  },
  {
    severity: 'OK',
    title: 'Óleo do motor 10W-40 — cerca de 1,1L com filtro; troque a cada 5.000-6.000 km',
    body: 'O motor monocilíndrico 249cc líquido-refrigerado da Majesty usa óleo 10W-40 JASO MA, capacidade de referência de aproximadamente 1,1L com filtro (confirme exato na vareta/manual da sua unidade, pode variar por ano). Yamalube 10W-40 ou Motul Scooter Power 10W-40 são boas opções. Intervalo: 5.000-6.000 km ou 6 meses — em moto com mais de uma década de idade, não estenda o intervalo mesmo que o uso seja esporádico.',
  },
  {
    severity: 'WARN',
    title: 'Óleo da caixa de transmissão final da CVT — item frequentemente esquecido, ainda mais em moto antiga com múltiplos donos',
    body: 'Assim como toda scooter CVT da Yamaha, a Majesty tem uma redutora final com óleo próprio, separado do óleo do motor. Em moto com mais de 10 anos e possivelmente vários donos ao longo do tempo, é comum que esse óleo nunca tenha sido trocado ou verificado por desconhecimento do dono anterior. Ao comprar uma Majesty usada, verifique com o mecânico se esse óleo já foi trocado alguma vez — se não houver histórico, considere a troca preventiva imediata.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR8E — item barato; troque a cada 8.000 km',
    body: 'Vela de ignição da Majesty: NGK CR8E, item de baixo custo (R$ 20-35). Em moto antiga que ficou parada por períodos, a vela é um dos primeiros itens a verificar antes de qualquer diagnóstico mais caro — carbonização ou desgaste da vela pode ser confundida com problema de injeção/carburador.',
  },
  {
    severity: 'DANGER',
    title: 'Correia da CVT: em moto com histórico desconhecido, PRESUMA que a correia está no fim da vida útil até prova em contrário',
    body: 'Como a Majesty é hoje uma moto de mercado secundário com muitos anos de idade, a correia da CVT (se ainda for a original ou de troca não documentada) pode estar bem além do intervalo seguro de uso. Sintomas de correia gasta: perda de aceleração, ruído de atrito, patinada na retomada — mas correias muito ressecadas pela idade podem romper sem aviso prévio claro. Ao comprar uma Majesty usada sem histórico de manutenção documentado, troque a correia preventivamente antes de rodar distâncias longas, independente da quilometragem indicada no painel.',
  },
  {
    severity: 'OK',
    title: 'Disponibilidade de peças: modelo descontinuado, mas motor compartilha conceito com outras scooters médias Yamaha da época',
    body: 'Por ser modelo fora de linha há muitos anos, peças específicas com código exclusivo Yamaha podem ser mais difíceis de achar em lojas comuns — busque em concessionárias com estoque antigo, desmanches especializados em scooter grande ou grupos de proprietários. Itens de desgaste comum (correia CVT compatível, filtro de óleo, pastilhas de freio) costumam ter alternativas genéricas de dimensão equivalente disponíveis no mercado de scooters médias em geral.',
  },
]

const MAJESTY_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Moto com mais de 10 anos de mercado: avalie criteriosamente antes de comprar usada',
    body: 'Qualquer Majesty YP 250 em circulação hoje tem no mínimo 10-15 anos de idade. Antes de comprar: inspecione vazamentos de óleo, estado da correia CVT, corrosão em partes metálicas expostas, estado da bateria e do sistema elétrico, e peça histórico de manutenção documentado sempre que possível. O custo de recuperar uma unidade muito descuidada pode superar o valor de mercado da moto.',
  },
  {
    severity: 'WARN',
    title: 'Peças específicas escassas: modelo fora de linha há mais de uma década no Brasil',
    body: 'A Yamaha descontinuou a Majesty no Brasil há bastante tempo — peças com código exclusivo (algumas elétricas, plásticos/carenagens específicos) podem exigir busca em desmanches ou grupos de proprietários. Itens mecânicos de desgaste comum (óleo, vela, filtro, pastilhas) são mais fáceis de resolver com compatíveis genéricos de scooter média.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo por juntas endurecidas — praticamente esperado em unidades com mais de 10 anos sem manutenção recente',
    body: 'Motor e CVT com mais de uma década podem apresentar pequenos vazamentos por juntas de vedação ressecadas pelo tempo, mesmo em unidades de baixa quilometragem. Inspeção visual da base do motor e da tampa da CVT deve ser prioridade antes de comprar ou após período de a moto ficar parada.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico e conectores oxidados: chicote de mais de uma década sofre com o tempo, não só com o uso',
    body: 'Assim como qualquer moto com mais de 10 anos, a Majesty pode apresentar oxidação em conectores do chicote elétrico, causando lanterna ou pisca intermitente e dificuldade ocasional de partida. Limpeza com spray de contato elétrico e graxa dielétrica nos terminais resolve a maioria dos casos.',
  },
  {
    severity: 'DANGER',
    title: 'Correia da CVT rompendo sem aviso claro: risco elevado em unidade sem histórico documentado de troca',
    body: 'Diferente de scooter recente com dono que acompanha o intervalo de manutenção, a Majesty usada hoje frequentemente já passou por várias mãos sem registro completo — a correia pode estar muito além do razoável sem sintoma óbvo perceptível ao dono atual. Tratamento recomendado: troca preventiva da correia (e idealmente dos roletes do variador) na primeira revisão após a compra, independente do que o odômetro mostrar.',
  },
]

const MAJESTY_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo Majesty YP 250: scooter grande legada, descontinuada — priorize diagnóstico completo antes de rodar',
    body: 'Ao adquirir uma unidade usada (comum, já que o modelo está fora de linha): inspeção completa inicial — óleo do motor, óleo da CVT, estado da correia e roletes, vela, filtro de ar, pastilhas/fluido de freio, bateria e chicote elétrico — antes de considerar a moto "pronta para rodar" apenas com base na quilometragem do painel. | 5.000-6.000 km — Troca de óleo do motor (10W-40, ~1,1L com filtro). | 8.000 km — Troca de vela NGK CR8E. Verificar filtro de ar. | 10.000-12.000 km — Verificar/trocar óleo da caixa de transmissão final da CVT. Inspecionar correia e roletes visualmente (trocar preventivamente se não houver histórico documentado). | 15.000 km — Troca da correia da CVT + jogo de roletes, se ainda não feito. | 15.000-18.000 km — Trocar filtro de ar. | 20.000 km — Pastilhas de freio (inspeção e troca conforme desgaste). | 24 meses — Fluido de freio DOT 4 obrigatório. | Anual — Inspeção de conectores elétricos quanto a oxidação (moto com mais de uma década de idade).',
  },
]

// ─── AEROX CONNECTED ABS (2023-atual) ──────────────────────────────────────────────────────
// Motor: 155cc monocilíndrico Blue Core, líquido-refrigerado, 4V | ~15 cv @ 8.000 rpm
// Torque: 1,4 kgf.m @ 6.500 rpm | Injeção eletrônica | CVT automático | ABS de série
// Painel: TFT colorido conectado ao app Y-Connect (Bluetooth) — navegação, notificações,
// diagnóstico básico | Óleo: 10W-40 API SJ/JASO MA — capacidade ~0,9-1,0L com filtro
// Pneu: 100/70-13 (F) / 90/80-14 ou 130/70-13 (R, conforme versão) | Lançamento recente no Brasil

const AEROX_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Scooter esportiva compacta e moderna: motor Blue Core 155cc, ABS e painel conectado de fábrica',
    body: 'A Aerox Connected ABS é o lançamento mais recente de scooter esportiva compacta da Yamaha no Brasil: motor Blue Core 155cc líquido-refrigerado, freio ABS de série e painel TFT conectado ao smartphone via app Y-Connect (Bluetooth) para navegação, notificações e alguns diagnósticos. Por ser modelo novo, ainda não tem o mesmo histórico de longo prazo (10+ anos) que modelos consagrados como a NMAX, mas segue a mesma base mecânica confiável Blue Core usada em outras scooters da marca.',
  },
  {
    severity: 'OK',
    title: 'Óleo do motor 10W-40 API SJ/JASO MA — cerca de 0,9-1,0L com filtro; troque a cada 6.000 km',
    body: 'O motor Blue Core 155cc líquido-refrigerado da Aerox usa óleo 10W-40 API SJ, JASO MA obrigatório. Capacidade de referência: aproximadamente 0,9-1,0L na troca com filtro (confirme o valor exato no manual). Yamalube 10W-40 é o recomendado oficial; Motul Scooter Power 10W-40 é boa alternativa. Intervalo: 6.000 km ou 6 meses.',
  },
  {
    severity: 'WARN',
    title: 'Óleo da caixa de transmissão final da CVT — item que a maioria dos donos de scooter esportiva esquece',
    body: 'Como toda scooter CVT Yamaha, a Aerox tem uma redutora final com óleo próprio, separado do óleo do motor. Verifique o nível a cada revisão e troque conforme especificação do manual (geralmente 12.000-24.000 km). Por ser scooter recente e com apelo esportivo/jovem, muitos donos de primeira scooter automática desconhecem esse item até o mecânico perguntar.',
  },
  {
    severity: 'OK',
    title: 'Correia da CVT — item de desgaste típico de scooter automática; inspecione a cada 10.000 km',
    body: 'A correia de transmissão CVT da Aerox segue o padrão de desgaste de qualquer scooter automática da linha: sintomas de correia gasta incluem perda de aceleração, patinada na retomada e ruído de atrito. Vida útil média esperada: 15.000-18.000 km em uso urbano normal. Correia compatível genérica: R$ 80-140. Troque preventivamente ao se aproximar desse intervalo, mesmo sem sintoma óbvio.',
  },
  {
    severity: 'OK',
    title: 'Painel conectado Y-Connect: mantenha o app e o firmware atualizados para melhor experiência e diagnóstico',
    body: 'O painel TFT da Aerox se conecta via Bluetooth ao app Yamaha Y-Connect, oferecendo notificações do celular, navegação básica e alguns códigos de diagnóstico. Mantenha o app atualizado — isso pode trazer melhorias de desempenho e correções de bugs de conectividade ao longo do tempo. Em caso de painel não conectando, o primeiro passo é verificar a versão do app e reiniciar o Bluetooth do celular antes de suspeitar de defeito na moto.',
  },
  {
    severity: 'OK',
    title: 'Marcas de óleo e pneu recomendadas para a Aerox Connected ABS',
    body: 'Óleo: Yamalube 10W-40, Motul Scooter Power 10W-40. Pneus: medidas compactas de scooter esportiva (confirme a medida exata gravada no pneu original, pode variar por versão/ano) — Pirelli Angel Scooter ou Michelin City Grip 2 são boas opções para o perfil esportivo/urbano da Aerox, com boa aderência em piso molhado.',
  },
]

const AEROX_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Modelo recente: histórico de problemas de longo prazo ainda em consolidação',
    body: 'Por ser lançamento recente no Brasil, a Aerox Connected ABS ainda não acumulou o mesmo volume de relatos de longo prazo (10+ anos) que modelos consagrados como a NMAX. Os problemas documentados até o momento seguem o padrão esperado de qualquer scooter CVT Blue Core (correia, roletes do variador, sensores eletrônicos) — sem defeito crônico grave amplamente reportado até esta data. Acompanhe fóruns e grupos de proprietários para relatos mais recentes conforme a frota envelhece.',
  },
  {
    severity: 'WARN',
    title: 'Correia da CVT: atenção ao intervalo de troca para evitar ruptura em movimento',
    body: 'Como em toda scooter automática, ignorar o intervalo de troca da correia da CVT pode levar à ruptura em uso — perda súbita de tração. Trincas visíveis, ruído de atrito na CVT ou perda progressiva de retomada são sinais de alerta que pedem inspeção imediata.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste de roletes do variador causando perda de resposta em subidas',
    body: 'Com o uso, os roletes do variador desgastam e alteram a curva de aceleração — sintoma de "moto não puxar" mesmo com correia relativamente nova. Normalmente trocado junto com a correia da CVT, no mesmo serviço de desmontagem.',
  },
  {
    severity: 'WARN',
    title: 'Marcha lenta instável ou perda momentânea de potência: verificar sensores eletrônicos antes de suspeitar de problema grave',
    body: 'Sistema de injeção eletrônica da Aerox pode apresentar marcha lenta oscilante por sujeira ou falha pontual em sensores (TPS ou similar). Diagnóstico com scanner OBD é o caminho mais econômico e preciso antes de trocar peças por tentativa e erro — concessionárias Yamaha já têm o equipamento compatível para modelos recentes como a Aerox.',
  },
  {
    severity: 'WARN',
    title: 'Conectividade Bluetooth do painel: possíveis instabilidades de pareamento em modelo com poucos anos de mercado',
    body: 'Como o recurso de painel conectado é relativamente novo na linha, alguns relatos pontuais de instabilidade no pareamento Bluetooth com o app Y-Connect podem ocorrer — geralmente resolvidos com atualização do app ou reinicialização do sistema. Não é um problema mecânico e não afeta o funcionamento básico da scooter (motor, freios, CVT continuam operando normalmente mesmo sem conexão ativa).',
  },
]

const AEROX_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo Aerox Connected ABS: scooter esportiva moderna com painel conectado',
    body: '1.000 km — Revisão de amaciamento: troca de óleo do motor. | 6.000 km — Troca de óleo do motor (10W-40, ~0,9-1,0L com filtro). Verificar filtro de ar. | 8.000-10.000 km — Troca de vela. | 10.000 km — Verificar óleo da caixa de transmissão final da CVT. Inspecionar correia e roletes do variador visualmente. | 12.000-15.000 km — Trocar filtro de ar. | 15.000-18.000 km — Troca preventiva da correia da CVT + jogo de roletes do variador. | 18.000-20.000 km — Pastilhas de freio (inspeção e troca conforme desgaste). | 24 meses — Fluido de freio DOT 4 obrigatório (sistema com ABS), independente do km. | Sempre que disponível — Atualizar o app Y-Connect e o firmware do painel conectado.',
  },
]

// ─── Tire Pressures ────────────────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'TMAX 530',
    yearFrom: 2016, yearTo: 2024,
    tireSize: '120/70-15 (F) · 160/60-15 (R)',
    frontPsi: 30, rearPsi: 34, frontPsiLoad: 30, rearPsiLoad: 38,
    notes: 'Moto pesada (~220kg) e capaz de velocidade de rodovia. Não reduza a pressão abaixo do recomendado mesmo em uso urbano — afeta estabilidade em frenagem com ABS. Verifique semanalmente.',
  },
  {
    modelName: 'MAJESTY YP 250',
    yearFrom: 2007, yearTo: 2013,
    tireSize: '120/70-14 (F) · 150/70-13 (R)',
    frontPsi: 28, rearPsi: 32, frontPsiLoad: 28, rearPsiLoad: 36,
    notes: 'Moto com mais de 10 anos de mercado — verifique também o estado geral do pneu (rachaduras/ressecamento pela idade), não só a calibragem, antes de rodar distâncias longas.',
  },
  {
    modelName: 'AEROX CONNECTED ABS',
    yearFrom: 2023, yearTo: null,
    tireSize: '100/70-13 (F) · 90/80-14 ou 130/70-13 (R, conforme versão)',
    frontPsi: 26, rearPsi: 29, frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Confirme a medida traseira exata gravada no pneu original — pode variar conforme a versão/ano. Verificar semanalmente, scooter esportiva compacta perde estabilidade em curva com pressão baixa.',
  },
]

// ─── Manutenção ─────────────────────────────────────────────────────────────────────────────

const makeTmax = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40 API SL/JASO MA2 (~3,4L com filtro) + filtro de óleo', intervalKm: 6000, intervalMonths: 6, notes: 'Yamalube 10W-40 ou Motul 7100 10W-40. Motor bicilíndrico sofre mais degradação térmica do óleo — não estenda o intervalo.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo da transmissão CVT/sistema de correntes internas "Y"', intervalKm: 22000, intervalMonths: 24, notes: 'Item CRÍTICO e caro — nunca pule. Negligência causa dano interno à transmissão. Serviço em concessionária Yamaha ou oficina especializada premium.', priority: 'CRITICAL', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Par de velas NGK LMAR8AI-9 (iridium, dupla ignição)', intervalKm: 18000, intervalMonths: 24, notes: 'Trocar sempre o par junto, mesmo que uma pareça em melhor estado. Custo do par: R$ 150-220.', priority: 'MEDIUM', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar — inspeção e troca', intervalKm: 6000, intervalMonths: 12, notes: 'Trocar a cada 12.000-18.000 km. Disponível em concessionária Yamaha.', priority: 'MEDIUM', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas de freio dianteiras (disco duplo) e traseira', intervalKm: 15000, intervalMonths: null, notes: 'Peças mais caras que scooter comum — EBC ou Brembo compatíveis. Disco duplo + ABS exige inspeção regular.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Fluido de freio DOT 4 (sistema ABS)', intervalKm: null, intervalMonths: 24, notes: 'Obrigatório a cada 24 meses independente do km. Sistema ABS sensível a fluido com umidade.', priority: 'CRITICAL', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria — verificação (sistema eletrônico completo: ABS, painel digital)', intervalKm: null, intervalMonths: 6, notes: 'Bateria fraca pode gerar código de erro no ABS ou instabilidade na injeção. Trickle charge se moto ficar parada por semanas.', priority: 'MEDIUM', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Revisão geral em concessionária Yamaha especializada', intervalKm: 12000, intervalMonths: 12, notes: 'Moto premium com CVT de correntes internas — poucas oficinas fora da rede autorizada têm ferramental e treinamento adequados.', priority: 'HIGH', order: 8 },
]

const makeMajesty = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Inspeção completa inicial (compra de unidade usada sem histórico)', intervalKm: null, intervalMonths: null, notes: 'Óleo motor/CVT, correia, roletes, vela, filtro de ar, freios, bateria, chicote elétrico — não confie apenas na quilometragem do painel em moto descontinuada há mais de 10 anos.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo do motor 10W-40 JASO MA (~1,1L com filtro)', intervalKm: 5500, intervalMonths: 6, notes: 'Yamalube 10W-40 ou Motul Scooter Power 10W-40. Não estenda intervalo em moto antiga mesmo com uso esporádico.', priority: 'CRITICAL', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo da caixa de transmissão final da CVT', intervalKm: 12000, intervalMonths: 24, notes: 'Verificar se já foi trocado alguma vez ao comprar usada — item comumente esquecido em moto com múltiplos donos.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK CR8E', intervalKm: 8000, intervalMonths: 12, notes: 'Item barato (R$ 20-35). Primeiro item a verificar em moto que ficou parada.', priority: 'MEDIUM', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Correia da CVT + jogo de roletes do variador', intervalKm: 15000, intervalMonths: null, notes: 'PRESUMA desgaste avançado em unidade sem histórico documentado — troca preventiva recomendada na primeira revisão pós-compra.', priority: 'CRITICAL', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar — inspeção e troca', intervalKm: 6000, intervalMonths: 12, notes: 'Trocar a cada 15.000-18.000 km.', priority: 'MEDIUM', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas de freio — inspeção e troca conforme desgaste', intervalKm: 20000, intervalMonths: null, notes: 'Verificar também estado do disco em moto de mercado secundário.', priority: 'MEDIUM', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Obrigatório independente do km, ainda mais importante em moto antiga.', priority: 'HIGH', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Inspeção de conectores elétricos quanto a oxidação', intervalKm: null, intervalMonths: 12, notes: 'Moto com mais de uma década de idade — oxidação é praticamente esperada, principalmente em regiões úmidas.', priority: 'MEDIUM', order: 9 },
]

const makeAerox = (m: string, yf: number, yt: number | null): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo do motor 10W-40 API SJ/JASO MA (~0,9-1,0L com filtro)', intervalKm: 6000, intervalMonths: 6, notes: 'Yamalube 10W-40 ou Motul Scooter Power 10W-40.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo da caixa de transmissão final da CVT', intervalKm: 18000, intervalMonths: 24, notes: 'Item comumente esquecido por donos de primeira scooter automática.', priority: 'MEDIUM', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela — inspeção e troca', intervalKm: 9000, intervalMonths: null, notes: 'Troca a cada 8.000-10.000 km.', priority: 'MEDIUM', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Correia da CVT', intervalKm: 16000, intervalMonths: null, notes: 'Inspecionar a partir de 10.000 km. Vida útil média 15.000-18.000 km em uso urbano.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Jogo de roletes do variador', intervalKm: 16000, intervalMonths: null, notes: 'Trocar junto com a correia — mesma desmontagem da CVT.', priority: 'MEDIUM', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar', intervalKm: 13000, intervalMonths: 12, notes: 'Inspecionar a cada 6.000 km.', priority: 'MEDIUM', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas de freio', intervalKm: 18000, intervalMonths: null, notes: 'Inspecionar a partir de 10.000 km; trocar conforme desgaste.', priority: 'MEDIUM', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Fluido de freio DOT 4 (sistema ABS)', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Atualização do app/firmware Y-Connect (painel conectado)', intervalKm: null, intervalMonths: 6, notes: 'Sempre que disponível — melhorias de conectividade e diagnóstico.', priority: 'LOW', order: 9 },
]

// ─── BLOCKS ─────────────────────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  { modelName: 'TMAX 530',            yearFrom: 2016, yearTo: 2024, MACETES: TMAX_MACETES,    PROBLEMAS: TMAX_PROBLEMAS,    MANUTENCAO: TMAX_MANUTENCAO    },
  { modelName: 'MAJESTY YP 250',      yearFrom: 2007, yearTo: 2013, MACETES: MAJESTY_MACETES, PROBLEMAS: MAJESTY_PROBLEMAS, MANUTENCAO: MAJESTY_MANUTENCAO },
  { modelName: 'AEROX CONNECTED ABS', yearFrom: 2023, yearTo: null, MACETES: AEROX_MACETES,   PROBLEMAS: AEROX_PROBLEMAS,   MANUTENCAO: AEROX_MANUTENCAO   },
]

const ALL_MANUTENCAO: MaintenanceItemInput[] = [
  ...makeTmax('TMAX 530', 2016, 2024),
  ...makeMajesty('MAJESTY YP 250', 2007, 2013),
  ...makeAerox('AEROX CONNECTED ABS', 2023, null),
]

// ─── Runner ─────────────────────────────────────────────────────────────────────────────────

async function main() {
  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })

  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Yamaha', vehicleTypeId: motoType.id } },
    update: {}, create: { name: 'Yamaha', vehicleTypeId: motoType.id },
  })

  const brand = await prisma.brand.findFirstOrThrow({
    where: { name: 'Yamaha', vehicleTypeId: motoType.id },
  })

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {}, create: { name: block.modelName, brandId: brand.id },
    })

    const allTips = [
      ...block.MACETES.map(t => ({ ...t, category: 'MACETES' as Cat })),
      ...block.PROBLEMAS.map(t => ({ ...t, category: 'PROBLEMAS' as Cat })),
      ...block.MANUTENCAO.map(t => ({ ...t, category: 'MANUTENCAO' as Cat })),
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
    console.log(`✅ ${block.modelName}: ${allTips.length} tips`)
  }

  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName } })
    await prisma.tirePressure.create({ data: tp })
    console.log(`🔵 TirePressure: ${tp.modelName}`)
  }

  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: BLOCKS.map(b => b.modelName) } } })
  await prisma.maintenanceItem.createMany({ data: ALL_MANUTENCAO })
  console.log(`🔧 MaintenanceItems: ${ALL_MANUTENCAO.length} itens`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
