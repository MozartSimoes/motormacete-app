/**
 * Seed DAFRA — Cruisym e Maxsym (maxi-scooters SYM atuais, rebatizados DAFRA)
 *
 * CONTEXTO: a parceria DAFRA↔TVS terminou em 03/2024 (fábrica de Manaus parou de montar
 * TVS/Apache) — isso NÃO afeta estes modelos. A DAFRA segue operando no Brasil com foco
 * total na parceria com a SYM (marca taiwanesa): Cruisym 150, Cruisym 300, Maxsym 400i e
 * Maxsym 400 GT são scooters SYM genuínos, ATUAIS, vendidos ativamente em concessionárias
 * DAFRA/SYM no Brasil hoje, com rede de peças originais e assistência técnica completa —
 * a SYM mantém distribuidora própria de peças no Brasil via DAFRA (Centro de Distribuição
 * em Itajaí/SC), diferente dos modelos legados cobertos em seed-dafra.ts.
 *
 * Modelos cobertos:
 * CRUISYM 150 (149,6cc, lançado 2021), CRUISYM 300 (278,3cc, lançado 12/2022),
 * MAXSYM 400i (399,3cc, na linha desde 2014), MAXSYM 400 GT (399cc, sucessor do 400i,
 * lançado 2025/2026)
 *
 * Fontes: daframotos.com.br (landing pages, manual do proprietário, tabela de óleos e
 *         fluidos), motonline.com.br, motociclismoonline.com.br, motoo.com.br,
 *         magodoscarros.com, sym-global.com (manuais internacionais), manualslib.com
 *         (service manual MAXSYM 400i/600i), carpimoto.com/cgmoto.com (fitment NGK),
 *         relatos de oficinas especializadas (Oliver Scooters), fóruns de proprietários
 *         SYM/Citycom/Cruisym (compartilham arquitetura de CVT)
 *
 * Execute: pnpm --filter @motormacete/database exec tsx prisma/seed-dafra-cruisym-maxsym.ts
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

// ─── CRUISYM 150 (149,6cc, 4V, arrefecimento líquido, desde 2021) ────────────

const CRUISYM150_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 149,6cc 4 válvulas líquido: aqueça 1 minuto antes de acelerar forte',
    body: 'O Cruisym 150 (14,3 cv a 8.500 rpm, 1,38 kgf.m a 6.500 rpm) tem motor de 4 válvulas arrefecido a líquido — mais moderno que os antigos motores a ar da linha DAFRA legada. Mesmo assim, deixe o motor girar em marcha lenta por cerca de 1 minuto antes de exigir rotações altas, especialmente em dias frios. O radiador precisa atingir temperatura de trabalho para o óleo circular com viscosidade ideal.',
  },
  {
    severity: 'WARN',
    title: 'Óleo da caixa de transmissão final é separado do óleo do motor — não esqueça',
    body: 'O Cruisym 150 tem dois reservatórios de óleo distintos: motor (~1,0 L) e caixa de transmissão final/redutora (~0,19 L, no cubo da roda traseira). Muitos donos só trocam o óleo do motor e esquecem a transmissão final, que também se degrada e pode causar ruído e desgaste prematuro das engrenagens redutoras. Verifique o bujão específico da transmissão (lado direito do cubo traseiro) a cada revisão.',
  },
  {
    severity: 'OK',
    title: 'Sistema Keyless: troque a pilha do controle antes de esvaziar totalmente',
    body: 'O Cruisym 150 usa chave de presença (keyless) em vez de chave física tradicional. Quando a pilha do controle começa a fraquejar, o alcance de detecção diminui e a partida fica intermitente. Troque a pilha (geralmente CR2032) preventivamente a cada 12–18 meses, mesmo sem sintomas, para evitar ficar na mão sem conseguir dar partida.',
  },
  {
    severity: 'WARN',
    title: 'CVT: não acelere 100% com o motor frio — desgasta correia e roletes',
    body: 'Como em qualquer scooter CVT, abrir o acelerador totalmente com o motor e o óleo da transmissão ainda frios causa escorregamento da correia contra as polias e acelera o desgaste dos roletes do variador. Nos primeiros 2–3 km, acelere progressivamente. Esse hábito simples estende a vida da correia CVT original.',
  },
  {
    severity: 'OK',
    title: 'Freios com ABS de canal duplo: pode frear com os dois freios sem medo de travar',
    body: 'O Cruisym 150 tem freio a disco nas duas rodas com ABS de canal duplo (atua independentemente na dianteira e na traseira). Diferente de scooters antigas com CBS simples, aqui você pode usar os dois freios com força em uma frenagem de emergência — o ABS impede o travamento das rodas mesmo em piso molhado ou com areia.',
  },
  {
    severity: 'OK',
    title: 'Baú sob o banco: aproveite para levar o capacete integral',
    body: 'O compartimento sob o banco do Cruisym 150 comporta um capacete de tamanho médio na maioria das configurações. Evite guardar objetos pesados e pontiagudos soltos — eles podem arranhar a pintura interna do baú e, em freadas bruscas, bater contra o teto do compartimento.',
  },
  {
    severity: 'WARN',
    title: 'Pneus 90/90-14 e 100/90-14: perfil baixo exige calibragem em dia',
    body: 'O Cruisym 150 usa rodas aro 14" com pneus de perfil relativamente baixo para a categoria. Pressão incorreta é sentida rapidamente na dirigibilidade — pneu murcho faz a scooter "flutuar" em curvas e aumenta o consumo. Calibre sempre com o pneu frio, antes de rodar.',
  },
]

const CRUISYM150_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Roletes do variador desgastam entre 8.000–12.000 km — ronco na aceleração',
    body: 'Assim como em outros scooters CVT SYM/DAFRA, os roletes do variador do Cruisym 150 se desgastam de forma desigual com o tempo. Sintoma: ronco crescente ao acelerar, sensação de "corda esticando" antes de a moto responder, perda de retomada. Inspecione a cada 6.000 km — o kit de roletes original está disponível via rede de peças SYM/DAFRA (diferente dos modelos legados, aqui a peça original é fácil de encontrar).',
  },
  {
    severity: 'WARN',
    title: 'Correia CVT: inspecione aos 6.000 km, substitua por volta de 12.000 km',
    body: 'O padrão internacional SYM para a família Cruisym recomenda inspeção da correia CVT a cada 6.000 km e substituição preventiva por volta de 12.000 km (pode variar com o uso — trânsito parado/andante desgasta mais rápido que rodovia). Sinal de correia gasta: assobio agudo e breve na aceleração forte, leve vibração no assoalho. Não espere a correia arrebentar — isso deixa a scooter parada na hora.',
  },
  {
    severity: 'WARN',
    title: 'Vedante da bengala dianteira: mancha de óleo indica troca',
    body: 'A bengala dianteira telescópica (curso de 100 mm) do Cruisym 150 pode apresentar vazamento pelo vedante após uso prolongado em vias com buracos. Sintoma: mancha de óleo na parte inferior do tubo e amortecimento irregular. Vedante de reposição é peça de catálogo SYM — troca em concessionária ou oficina especializada em scooters custa a mão de obra de desmontagem, geralmente abaixo de scooters premium maiores.',
  },
  {
    severity: 'DANGER',
    title: 'Disco de freio pode ficar fino demais se a manutenção for negligenciada',
    body: 'Relato recorrente em oficinas especializadas em maxi-scooters SYM: quando as pastilhas de freio não são trocadas a tempo, o desgaste continua sobre o próprio disco, que pode ficar perigosamente fino ("como papel") sem sintoma óbvio na alavanca até estar crítico. Como o Cruisym 150 depende do ABS para segurança em frenagens de emergência, inspecione visualmente a espessura do disco a cada troca de pastilha — não espere o ABS "avisar" que algo está errado.',
  },
  {
    severity: 'WARN',
    title: 'Sensor da chave de presença sensível a interferência eletromagnética',
    body: 'Sistemas keyless de scooters SYM podem apresentar falha de reconhecimento do controle perto de fontes de interferência eletromagnética forte (antenas, transformadores, alguns carregadores sem fio). Se a scooter não reconhecer a chave em um local específico, afaste-se alguns metros antes de tentar novamente. Mantenha sempre a chave reserva funcionando — perder as duas simultaneamente exige atendimento de concessionária para recodificação.',
  },
]

const CRUISYM150_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Cruisym 150: revisões programadas seguem o manual DAFRA/SYM',
    body: '1.000 km — Troca de óleo motor inicial (10W30 semissintético, ~1,0 L). Inspeção geral de rodagem. | 3.000 km — Troca de óleo motor rotineira. | 6.000 km — Óleo da caixa de transmissão final (~0,19 L). Inspecionar correia CVT e roletes do variador. Vela de ignição (inspeção). | 9.000 km — Troca de óleo motor. Filtro de ar (limpar). | 12.000 km — Correia CVT (trocar se desgastada). Kit de roletes do variador (se necessário). Pastilhas de freio (inspecionar espessura do disco). | 15.000 km — Fluido de freio DOT 4 (frente e trás). | 18.000 km — Óleo motor + óleo da transmissão final. Filtro de ar (trocar). | 24.000 km — Revisão geral: rolamentos de roda, folga de válvulas, vedante da bengala dianteira, pilha do controle keyless.',
  },
]

// ─── CRUISYM 300 (278,3cc, 4V, arrefecimento líquido, desde 12/2022) ─────────

const CRUISYM300_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 278,3cc 4 válvulas: mais torque em baixa rotação que o Cruisym 150',
    body: 'O Cruisym 300 (26 cv a 7.500 rpm, 2,67 kgf.m a 6.750 rpm) entrega torque perceptivelmente maior em baixa e média rotação que o irmão 150cc — a retomada em rodovia é mais folgada. Aproveite essa característica para ultrapassagens sem precisar "esticar" o motor além de 7.000 rpm, o que reduz o desgaste e o consumo.',
  },
  {
    severity: 'OK',
    title: 'Controle de tração (versões recentes): ajuda em piso molhado, mas não substitui atenção',
    body: 'As versões mais recentes do Cruisym 300 (2027 em diante) trazem controle de tração além do ABS de canal duplo. O sistema reduz a chance de patinação da roda traseira em piso molhado ou irregular, mas não elimina o risco de queda em curvas fechadas com chuva — ele atua na tração longitudinal, não na aderência lateral em inclinação.',
  },
  {
    severity: 'WARN',
    title: 'Radiador frontal: limpe as aletas a cada 5.000 km em uso urbano',
    body: 'Como o Cruisym 300 é arrefecido a líquido, o radiador frontal fica exposto a poeira, folhas e insetos no trânsito urbano. Aletas entupidas reduzem a eficiência da troca de calor e podem elevar a temperatura de operação do motor em trânsito parado. Limpe com jato de ar comprimido ou água em baixa pressão, sempre de trás para frente, a cada 5.000 km.',
  },
  {
    severity: 'OK',
    title: 'Painel digital colorido: use o modo economia para monitorar consumo real',
    body: 'O painel digital LCD colorido do Cruisym 300 mostra consumo médio instantâneo. Em uso urbano, manter a aceleração suave e evitar acelerações bruscas seguidas de frenagens fortes reduz o consumo em até 15% segundo relatos de proprietários — visível diretamente no painel.',
  },
  {
    severity: 'WARN',
    title: 'Tanque de 12 litros: não rode sistematicamente na reserva (2,5 L)',
    body: 'Rodar frequentemente com o tanque próximo da reserva favorece o acúmulo de sedimentos do fundo do tanque na linha de combustível, podendo entupir o filtro da bomba ao longo do tempo. Abasteça sempre que atingir 1/4 do tanque, especialmente se o combustível local tiver qualidade variável.',
  },
  {
    severity: 'OK',
    title: 'Baú maior que o Cruisym 150: cabe capacete integral + luvas',
    body: 'O compartimento sob o banco do Cruisym 300 é maior que o do 150cc, acomodando confortavelmente um capacete integral tamanho 58/60 junto com luvas e um impermeável dobrado. Ainda assim, respeite o limite de peso indicado no manual — sobrecarga contínua deforma as travas do banco.',
  },
]

const CRUISYM300_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Correia CVT e roletes: mesmo padrão de desgaste da família Cruisym',
    body: 'O Cruisym 300 compartilha a arquitetura de CVT da família SYM: inspeção da correia recomendada a cada 6.000 km, troca preventiva por volta de 12.000–15.000 km dependendo do uso. O motor maior (278,3cc) gera mais torque que o 150cc, o que pode acelerar levemente o desgaste da correia em uso com garupa frequente ou muitas partidas/paradas.',
  },
  {
    severity: 'WARN',
    title: 'Mangueiras do radiador ressecam após 4–5 anos — inspecione anualmente',
    body: 'Mangueiras de silicone do circuito de arrefecimento do Cruisym 300 podem ressecar e desenvolver microfissuras após alguns anos de uso, especialmente em climas quentes. Sintoma inicial: pequena perda de nível do líquido de arrefecimento sem vazamento visível óbvio. Inspecione visualmente as mangueiras e as braçadeiras uma vez por ano, mesmo sem sintomas.',
  },
  {
    severity: 'DANGER',
    title: 'Disco de freio: mesmo risco de desgaste excessivo do restante da linha Cruisym',
    body: 'Como no Cruisym 150, o desgaste de pastilhas negligenciado pode levar o disco a ficar perigosamente fino sem aviso óbvio na alavanca. No Cruisym 300, o peso maior (179 kg em ordem de marcha) exige frenagem mais consistente — inspecione a espessura mínima do disco especificada no manual a cada troca de pastilha, principalmente antes de viagens rodoviárias.',
  },
  {
    severity: 'WARN',
    title: 'Bomba d\'água: selo mecânico com vida útil de 30.000–40.000 km',
    body: 'Assim como em outros scooters SYM/DAFRA a líquido, a bomba d\'água do Cruisym 300 tem selo mecânico que se degrada com o tempo. Se o óleo motor apresentar aparência leitosa (indicando contaminação por líquido de arrefecimento), pare de rodar imediatamente e leve à revisão — é sinal de falha do selo da bomba, não um problema cosmético.',
  },
  {
    severity: 'WARN',
    title: 'Vela NGK CR8E: gap incorreto causa falha de partida a frio',
    body: 'A vela original do Cruisym 300 é a NGK CR8E, com gap especificado de 0,7–0,8 mm. Gap fora da especificação (comum quando trocada por vela genérica sem calibrar) causa dificuldade de partida a frio e falhas leves em marcha lenta. Sempre confira o gap com calibre de lâminas ao trocar a vela — não confie apenas na embalagem.',
  },
]

const CRUISYM300_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Cruisym 300: arrefecimento líquido adiciona itens ao 150cc',
    body: '1.000 km — Troca de óleo motor inicial (10W30 semissintético, ~1,2–1,4 L). | 3.000 km — Troca de óleo motor rotineira. | 6.000 km — Vela NGK CR8E (gap 0,7–0,8 mm). Inspecionar correia CVT e roletes. Verificar nível do líquido de arrefecimento. Limpar aletas do radiador. | 9.000 km — Óleo motor. Filtro de ar (limpar). | 12.000–15.000 km — Correia CVT (trocar). Kit de roletes do variador. Fluido de freio DOT 4. | 18.000 km — Óleo motor. Inspecionar mangueiras e braçadeiras do radiador. | 24.000 km — Trocar líquido de arrefecimento (aditivo + água destilada). Inspecionar bomba d\'água (selo mecânico). Rolamentos de roda. Folga de válvulas.',
  },
]

// ─── MAXSYM 400i (399,3cc, injeção eletrônica, arrefecimento líquido, desde 2014) ──

const MAXSYM400I_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'GT touring: veterano de uma década na linha DAFRA, suporte de peças garantido',
    body: 'O Maxsym 400i está na linha DAFRA desde 2014 — mais de uma década de presença no Brasil. Isso significa estoque consolidado de peças originais SYM na rede DAFRA (Centro de Distribuição em Itajaí/SC) e farta disponibilidade de mecânicos já familiarizados com o modelo, diferente de scooters de nicho com poucas unidades vendidas.',
  },
  {
    severity: 'OK',
    title: 'Injeção eletrônica: não desconecte a bateria sem ligar a ignição antes',
    body: 'Antes de desconectar a bateria para qualquer serviço elétrico, ligue a ignição por cerca de 30 segundos sem dar partida. Isso evita comportamento errático da injeção eletrônica após reconectar (marcha lenta instável, luz de injeção acesa sem motivo real) — procedimento padrão em scooters injetados SYM.',
  },
  {
    severity: 'WARN',
    title: 'Para-brisa e carenagem GT: ajuste a altura para reduzir turbulência em viagem',
    body: 'O Maxsym 400i tem carenagem de proteção generosa para uso rodoviário. Em velocidades de estrada (acima de 90 km/h), turbulência no capacete pode ocorrer se o para-brisa estiver na posição mais baixa. Teste diferentes alturas (se seu ano tiver ajuste) antes de uma viagem longa — a posição ideal varia com a altura do piloto.',
  },
  {
    severity: 'OK',
    title: 'Óleo motor: use 10W-40 API SJ (ou 10W-30 conforme manual do ano) — não misture',
    body: 'O motor 399,3cc do Maxsym 400i pede óleo 10W-40 API SJ (capacidade ~1,9 L com filtro) nas especificações mais recentes da DAFRA; anos/manuais anteriores especificam 10W-30 API SG. Confira o manual do proprietário do seu ano específico antes de trocar — usar viscosidade errada de forma prolongada pode afetar a lubrificação em temperaturas altas.',
  },
  {
    severity: 'WARN',
    title: 'Bengala dianteira: uso urbano intenso resseca vedantes mais rápido',
    body: 'Em uso predominantemente urbano, com muitos buracos e lombadas, os vedantes da bengala dianteira do Maxsym 400i podem ressecar e vazar antes do previsto para uso rodoviário. Inspecione visualmente a cada 10.000 km em cidade — mancha de óleo na parte inferior do tubo é o primeiro sinal.',
  },
]

const MAXSYM400I_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Roletes do CVT instalados invertidos de fábrica — já relatado em unidade 0km',
    body: 'Oficinas especializadas em scooters SYM relatam casos de Maxsym 400i que saíram de fábrica ou de revisões anteriores com os roletes do variador CVT montados na posição invertida. O sintoma pode ser sutil (leve perda de performance) e só aparece claramente na desmontagem. Recomendação de mecânicos especializados: ao comprar uma unidade nova ou usada, leve para uma revisão preventiva completa do CVT antes de rodar muito — não assuma que "nova" significa "montada corretamente".',
  },
  {
    severity: 'WARN',
    title: 'Vazamento no retentor do virabrequim: verifique junto com a revisão do CVT',
    body: 'Junto com o problema dos roletes invertidos, oficinas relatam casos de vazamento pelo retentor do virabrequim (na região do CVT) detectados logo após a compra. Sinal: óleo ou graxa na carcaça do variador, contaminando a correia (o que acelera ainda mais o desgaste). Esse é outro motivo para uma inspeção preventiva completa do sistema CVT nas primeiras revisões.',
  },
  {
    severity: 'DANGER',
    title: 'Disco de freio pode desgastar até ficar perigosamente fino sem aviso na alavanca',
    body: 'Como em outros modelos SYM, o desgaste do disco de freio do Maxsym 400i pode avançar sem um sintoma óbvio na alavanca até ficar crítico ("fino como papel", segundo relatos de oficina). Isso é particularmente relevante no 400i pelo peso e uso rodoviário mais frequente — inspecione a espessura mínima do disco a cada troca de pastilha, não apenas quando "sentir" diferença na frenagem.',
  },
  {
    severity: 'WARN',
    title: 'Correia CVT: negligenciada, a troca fica cara e é fácil de adiar demais',
    body: 'A correia CVT do Maxsym 400i não é um item barato de substituir, o que leva muitos donos a adiarem a troca além do recomendado. Isso é um erro: correia gasta ao ponto de arrebentar deixa a scooter parada, potencialmente em local inconveniente ou perigoso. Sinal de alerta: assobio agudo e curto na aceleração forte, pequena vibração perceptível no assoalho.',
  },
]

const MAXSYM400I_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Maxsym 400i: motor injetado touring exige atenção ao CVT e arrefecimento',
    body: '1.000 km — Troca de óleo motor inicial (10W-40 API SJ, ~1,9 L). Revisão do CVT (checar roletes e retentor do virabrequim — problema conhecido em unidades novas). | 3.000 km — Troca de óleo motor rotineira. | 6.000 km — Vela NGK CR8E (gap 0,7 mm). Inspecionar correia CVT e roletes. Verificar líquido de arrefecimento. | 9.000 km — Óleo motor. Filtro de ar (limpar). | 12.000–15.000 km — Correia CVT (trocar). Kit de roletes. Fluido de freio DOT 4 (frente e trás — inspecionar espessura dos discos). | 18.000 km — Óleo motor. Inspecionar mangueiras do radiador e vedantes da bengala dianteira. | 24.000 km — Trocar líquido de arrefecimento. Rolamentos de roda. Folga de válvulas. Revisão geral do CVT.',
  },
]

// ─── MAXSYM 400 GT (399cc, sucessor do 400i, lançado 2025/2026) ──────────────

const MAXSYM400GT_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Sucessor direto do 400i: motor 399cc revisado, mais equipado',
    body: 'O Maxsym 400 GT é o sucessor direto do Maxsym 400i, que ficou uma década na linha DAFRA. O motor monocilíndrico 399cc entrega 34 cv a 6.750 rpm e 3,9 kgf.m de torque a 5.250 rpm — ligeiramente mais torque em rotação mais baixa que o 400i, o que se traduz em retomadas mais suaves no trânsito e na estrada.',
  },
  {
    severity: 'OK',
    title: 'Controle de tração + ABS de canal duplo: use os dois recursos a seu favor',
    body: 'O Maxsym 400 GT vem de fábrica com controle de tração e ABS de canal duplo — combinação que reduz bastante o risco de derrapagem em piso molhado ou irregular, tanto na aceleração (TCS) quanto na frenagem (ABS). Ainda assim, esses sistemas não substituem redução de velocidade em curvas com chuva — eles corrigem, não previnem, perda de aderência lateral.',
  },
  {
    severity: 'OK',
    title: 'Sistema Keyless + USB: carregue o celular em viagem sem gastar bateria à toa',
    body: 'O carregador USB integrado do Maxsym 400 GT funciona com a chave de presença ativa. Em paradas longas com o motor desligado, desconecte o celular do carregador para evitar drenar a bateria da scooter — o consumo é baixo, mas em paradas de vários dias pode ser suficiente para dificultar a partida.',
  },
  {
    severity: 'WARN',
    title: 'Para-brisa ajustável: regule antes de cada viagem, não durante',
    body: 'O para-brisa ajustável do Maxsym 400 GT deve ser regulado com a scooter parada, antes de sair — mexer no ajuste em movimento tira uma mão do guidão e pode desestabilizar a scooter em velocidade de estrada. Encontre a altura ideal para reduzir turbulência no capacete e mantenha essa referência anotada.',
  },
  {
    severity: 'OK',
    title: 'Peso de 212 kg em ordem de marcha: planeje o embarque em ladeiras e rampas',
    body: 'Com 212 kg em ordem de marcha (mais pesado que o Cruisym 300), o Maxsym 400 GT exige mais atenção ao embarcar/desembarcar em rampas ou terrenos inclinados, especialmente com o cavalete lateral. Estacione sempre em piso firme e nivelado quando possível — em piso mole, o peso pode afundar o pé do cavalete.',
  },
  {
    severity: 'OK',
    title: 'Tanque de 13 litros: autonomia rodoviária generosa para viagens longas',
    body: 'O tanque de 13 litros do Maxsym 400 GT (o maior da linha DAFRA/SYM coberta aqui) permite trechos rodoviários mais longos entre abastecimentos. Ainda assim, monitore o consumo pelo painel digital — velocidade constante acima de 100 km/h reduz a autonomia real de forma perceptível em relação ao uso urbano.',
  },
]

const MAXSYM400GT_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Modelo recém-lançado: histórico de problemas de longo prazo ainda em formação',
    body: 'Por ser um lançamento recente (sucessor do 400i, que tinha uma década de histórico consolidado), o Maxsym 400 GT ainda não acumulou o mesmo volume de relatos de proprietários no Brasil. Espera-se, com base na arquitetura compartilhada com o 400i, os mesmos pontos de atenção: CVT (roletes e correia), disco de freio e vedantes de bengala. Acompanhe atualizações da rede DAFRA/SYM sobre eventuais boletins técnicos deste modelo.',
  },
  {
    severity: 'WARN',
    title: 'CVT: aplique a mesma vigilância do 400i até haver dados específicos do GT',
    body: 'Como o motor e a base mecânica do Maxsym 400 GT derivam do 400i, é prudente aplicar o mesmo cuidado preventivo relatado para aquele modelo: revisão completa do CVT (roletes e retentor do virabrequim) nas primeiras revisões, mesmo em unidade 0 km, já que esse padrão de falha de montagem foi documentado no 400i por oficinas especializadas.',
  },
  {
    severity: 'DANGER',
    title: 'Disco de freio: inspecione espessura desde a primeira revisão',
    body: 'Aplicando a mesma lição aprendida com outros modelos SYM/DAFRA: o desgaste do disco de freio pode avançar sem sintoma óbvio na alavanca até ficar perigosamente fino. Como o Maxsym 400 GT é o mais pesado da linha coberta aqui (212 kg em ordem de marcha), a frenagem consistente é ainda mais crítica — inspecione a espessura mínima especificada no manual a cada troca de pastilha.',
  },
  {
    severity: 'WARN',
    title: 'Sistema keyless e eletrônica embarcada: mantenha a bateria sempre bem carregada',
    body: 'Com mais eletrônica embarcada que o 400i (chave de presença, painel digital colorido, controle de tração, carregador USB), o Maxsym 400 GT depende de uma bateria em bom estado para funcionar todos os sistemas corretamente. Se a scooter ficar parada por mais de 2–3 semanas, use um carregador/mantenedor de bateria — evita surpresas com sistemas eletrônicos "confusos" por baixa tensão.',
  },
]

const MAXSYM400GT_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Maxsym 400 GT: baseado no padrão SYM para a família Maxsym 400',
    body: '1.000 km — Troca de óleo motor inicial (10W-40 API SJ, ~1,9 L). Revisão preventiva do CVT (roletes e retentor do virabrequim). | 3.000 km — Troca de óleo motor rotineira. | 6.000 km — Vela NGK CR8E (gap 0,7 mm). Inspecionar correia CVT e roletes. Verificar líquido de arrefecimento. | 9.000 km — Óleo motor. Filtro de ar (limpar). | 12.000–15.000 km — Correia CVT (trocar). Kit de roletes. Fluido de freio DOT 4 (frente e trás — inspecionar espessura dos discos). | 18.000 km — Óleo motor. Inspecionar mangueiras do radiador e vedantes da bengala dianteira. Testar sistema keyless e carregador USB. | 24.000 km — Trocar líquido de arrefecimento. Rolamentos de roda. Folga de válvulas. Revisão geral do CVT e da bateria.',
  },
]

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'CRUISYM 150',
    yearFrom: 2021,
    yearTo: null,
    MACETES: CRUISYM150_MACETES,
    PROBLEMAS: CRUISYM150_PROBLEMAS,
    MANUTENCAO: CRUISYM150_MANUTENCAO,
  },
  {
    modelName: 'CRUISYM 300',
    yearFrom: 2022,
    yearTo: null,
    MACETES: CRUISYM300_MACETES,
    PROBLEMAS: CRUISYM300_PROBLEMAS,
    MANUTENCAO: CRUISYM300_MANUTENCAO,
  },
  {
    modelName: 'MAXSYM 400i',
    yearFrom: 2014,
    yearTo: null,
    MACETES: MAXSYM400I_MACETES,
    PROBLEMAS: MAXSYM400I_PROBLEMAS,
    MANUTENCAO: MAXSYM400I_MANUTENCAO,
  },
  {
    modelName: 'MAXSYM 400 GT',
    yearFrom: 2025,
    yearTo: null,
    MACETES: MAXSYM400GT_MACETES,
    PROBLEMAS: MAXSYM400GT_PROBLEMAS,
    MANUTENCAO: MAXSYM400GT_MANUTENCAO,
  },
]

// ─── TIRE PRESSURES ────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'CRUISYM 150',
    yearFrom: 2021,
    yearTo: null,
    tireSize: '90/90-14 (F) · 100/90-14 (R)',
    frontPsi: 28,
    rearPsi: 32,
    frontPsiLoad: 28,
    rearPsiLoad: 36,
    notes: 'Maxi-scooter urbano 150cc. Calibre sempre com pneu frio. Com garupa: traseiro 36 PSI.',
  },
  {
    modelName: 'CRUISYM 300',
    yearFrom: 2022,
    yearTo: null,
    tireSize: '120/70-14 (F) · 140/60-13 (R)',
    frontPsi: 29,
    rearPsi: 33,
    frontPsiLoad: 29,
    rearPsiLoad: 36,
    notes: 'Maxi-scooter 300cc mais pesado que o Cruisym 150. Com garupa ou bagagem: traseiro 36 PSI.',
  },
  {
    modelName: 'MAXSYM 400i',
    yearFrom: 2014,
    yearTo: null,
    tireSize: '120/70-15 (F) · 150/70-14 (R)',
    frontPsi: 29,
    rearPsi: 33,
    frontPsiLoad: 29,
    rearPsiLoad: 36,
    notes: 'GT touring de rodas grandes. Uso rodoviário com carga/garupa: traseiro até 36 PSI.',
  },
  {
    modelName: 'MAXSYM 400 GT',
    yearFrom: 2025,
    yearTo: null,
    tireSize: '120/70-15 (F) · 150/70-14 (R)',
    frontPsi: 29,
    rearPsi: 33,
    frontPsiLoad: 29,
    rearPsiLoad: 36,
    notes: 'Sucessor do Maxsym 400i, mesma arquitetura de rodas. O mais pesado da linha (212 kg) — com garupa/bagagem: traseiro 36 PSI.',
  },
]

// ─── MAINTENANCE ITEMS ──────────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // CRUISYM 150
  { modelName: 'CRUISYM 150', yearFrom: 2021, yearTo: null, component: 'Óleo motor (10W30 semissintético, ~1,0 L)', intervalKm: 3000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'CRUISYM 150', yearFrom: 2021, yearTo: null, component: 'Óleo da caixa de transmissão final (~0,19 L)', intervalKm: 6000, intervalMonths: null, notes: 'Bujão separado, no cubo da roda traseira — não confundir com o do motor', priority: 'HIGH', order: 2 },
  { modelName: 'CRUISYM 150', yearFrom: 2021, yearTo: null, component: 'Inspecionar correia CVT e roletes do variador', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'CRUISYM 150', yearFrom: 2021, yearTo: null, component: 'Filtro de ar (limpar)', intervalKm: 9000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'CRUISYM 150', yearFrom: 2021, yearTo: null, component: 'Correia CVT (trocar) e kit de roletes se desgastados', intervalKm: 12000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'CRUISYM 150', yearFrom: 2021, yearTo: null, component: 'Inspecionar espessura dos discos de freio ao trocar pastilhas', intervalKm: 12000, intervalMonths: null, notes: 'Disco pode desgastar sem sintoma óbvio na alavanca', priority: 'CRITICAL', order: 6 },
  { modelName: 'CRUISYM 150', yearFrom: 2021, yearTo: null, component: 'Fluido de freio DOT 4 (frente e trás)', intervalKm: 15000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'CRUISYM 150', yearFrom: 2021, yearTo: null, component: 'Filtro de ar (trocar)', intervalKm: 18000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 8 },
  { modelName: 'CRUISYM 150', yearFrom: 2021, yearTo: null, component: 'Rolamentos de roda e folga de válvulas', intervalKm: 24000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 9 },
  { modelName: 'CRUISYM 150', yearFrom: 2021, yearTo: null, component: 'Pilha do controle keyless (CR2032, preventivo)', intervalKm: null, intervalMonths: 15, notes: 'Trocar mesmo sem sintoma para evitar ficar sem partida', priority: 'LOW', order: 10 },

  // CRUISYM 300
  { modelName: 'CRUISYM 300', yearFrom: 2022, yearTo: null, component: 'Óleo motor (10W30 semissintético, ~1,2–1,4 L)', intervalKm: 3000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'CRUISYM 300', yearFrom: 2022, yearTo: null, component: 'Vela NGK CR8E (gap 0,7–0,8 mm)', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'CRUISYM 300', yearFrom: 2022, yearTo: null, component: 'Inspecionar correia CVT e roletes do variador', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'CRUISYM 300', yearFrom: 2022, yearTo: null, component: 'Verificar nível do líquido de arrefecimento e limpar aletas do radiador', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'CRUISYM 300', yearFrom: 2022, yearTo: null, component: 'Filtro de ar (limpar)', intervalKm: 9000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 5 },
  { modelName: 'CRUISYM 300', yearFrom: 2022, yearTo: null, component: 'Correia CVT (trocar) e kit de roletes se desgastados', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'CRUISYM 300', yearFrom: 2022, yearTo: null, component: 'Fluido de freio DOT 4 (frente e trás)', intervalKm: 15000, intervalMonths: 24, notes: 'Inspecionar espessura dos discos junto', priority: 'HIGH', order: 7 },
  { modelName: 'CRUISYM 300', yearFrom: 2022, yearTo: null, component: 'Inspecionar mangueiras e braçadeiras do radiador', intervalKm: 18000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'CRUISYM 300', yearFrom: 2022, yearTo: null, component: 'Trocar líquido de arrefecimento (aditivo + água destilada)', intervalKm: 24000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 9 },
  { modelName: 'CRUISYM 300', yearFrom: 2022, yearTo: null, component: 'Inspecionar bomba d\'água (selo mecânico)', intervalKm: 30000, intervalMonths: null, notes: 'Óleo motor com aparência leitosa = emergência', priority: 'CRITICAL', order: 10 },
  { modelName: 'CRUISYM 300', yearFrom: 2022, yearTo: null, component: 'Rolamentos de roda e folga de válvulas', intervalKm: 24000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 11 },

  // MAXSYM 400i
  { modelName: 'MAXSYM 400i', yearFrom: 2014, yearTo: null, component: 'Óleo motor (10W-40 API SJ, ~1,9 L — confirmar viscosidade no manual do ano)', intervalKm: 3000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'MAXSYM 400i', yearFrom: 2014, yearTo: null, component: 'Revisão preventiva do CVT (roletes e retentor do virabrequim)', intervalKm: 1000, intervalMonths: null, notes: 'Falha de montagem de fábrica já documentada em unidades novas por oficinas especializadas', priority: 'CRITICAL', order: 2 },
  { modelName: 'MAXSYM 400i', yearFrom: 2014, yearTo: null, component: 'Vela NGK CR8E (gap 0,7 mm)', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'MAXSYM 400i', yearFrom: 2014, yearTo: null, component: 'Inspecionar correia CVT e roletes do variador', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'MAXSYM 400i', yearFrom: 2014, yearTo: null, component: 'Verificar nível do líquido de arrefecimento', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'MAXSYM 400i', yearFrom: 2014, yearTo: null, component: 'Filtro de ar (limpar)', intervalKm: 9000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'MAXSYM 400i', yearFrom: 2014, yearTo: null, component: 'Correia CVT (trocar) e kit de roletes', intervalKm: 15000, intervalMonths: null, notes: 'Item caro — não adiar além do recomendado, risco de arrebentar em uso', priority: 'HIGH', order: 7 },
  { modelName: 'MAXSYM 400i', yearFrom: 2014, yearTo: null, component: 'Fluido de freio DOT 4 (frente e trás)', intervalKm: 15000, intervalMonths: 24, notes: 'Inspecionar espessura dos discos junto', priority: 'HIGH', order: 8 },
  { modelName: 'MAXSYM 400i', yearFrom: 2014, yearTo: null, component: 'Inspecionar mangueiras do radiador e vedantes da bengala dianteira', intervalKm: 18000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 9 },
  { modelName: 'MAXSYM 400i', yearFrom: 2014, yearTo: null, component: 'Trocar líquido de arrefecimento', intervalKm: 24000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 10 },
  { modelName: 'MAXSYM 400i', yearFrom: 2014, yearTo: null, component: 'Rolamentos de roda e folga de válvulas', intervalKm: 24000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 11 },

  // MAXSYM 400 GT
  { modelName: 'MAXSYM 400 GT', yearFrom: 2025, yearTo: null, component: 'Óleo motor (10W-40 API SJ, ~1,9 L)', intervalKm: 3000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'MAXSYM 400 GT', yearFrom: 2025, yearTo: null, component: 'Revisão preventiva do CVT (roletes e retentor do virabrequim)', intervalKm: 1000, intervalMonths: null, notes: 'Mesmo cuidado documentado no 400i, que compartilha a base mecânica', priority: 'CRITICAL', order: 2 },
  { modelName: 'MAXSYM 400 GT', yearFrom: 2025, yearTo: null, component: 'Vela NGK CR8E (gap 0,7 mm)', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'MAXSYM 400 GT', yearFrom: 2025, yearTo: null, component: 'Inspecionar correia CVT e roletes do variador', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'MAXSYM 400 GT', yearFrom: 2025, yearTo: null, component: 'Verificar nível do líquido de arrefecimento', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'MAXSYM 400 GT', yearFrom: 2025, yearTo: null, component: 'Filtro de ar (limpar)', intervalKm: 9000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'MAXSYM 400 GT', yearFrom: 2025, yearTo: null, component: 'Correia CVT (trocar) e kit de roletes', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'MAXSYM 400 GT', yearFrom: 2025, yearTo: null, component: 'Fluido de freio DOT 4 (frente e trás)', intervalKm: 15000, intervalMonths: 24, notes: 'Inspecionar espessura dos discos junto — modelo mais pesado da linha', priority: 'HIGH', order: 8 },
  { modelName: 'MAXSYM 400 GT', yearFrom: 2025, yearTo: null, component: 'Inspecionar mangueiras do radiador, vedantes da bengala e bateria', intervalKm: 18000, intervalMonths: 12, notes: 'Testar sistema keyless e carregador USB', priority: 'HIGH', order: 9 },
  { modelName: 'MAXSYM 400 GT', yearFrom: 2025, yearTo: null, component: 'Trocar líquido de arrefecimento', intervalKm: 24000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 10 },
  { modelName: 'MAXSYM 400 GT', yearFrom: 2025, yearTo: null, component: 'Rolamentos de roda e folga de válvulas', intervalKm: 24000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 11 },
]

// ─── RUNNER ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('🛵 Seed DAFRA Cruisym/Maxsym iniciado...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })

  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'DAFRA', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'DAFRA', vehicleTypeId: motoType.id },
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

  console.log('✅ Seed DAFRA Cruisym/Maxsym concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
