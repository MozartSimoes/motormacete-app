// seed-ktm-supermoto.ts — KTM Supermoto 690, 990 R, 990 T, SC 620, SXC 520/540, SXC 625
// Linha Supermoto da KTM: motos de trilha/enduro adaptadas com rodas 17" de asfalto e
// suspensão mais rígida, para pilotagem agressiva e "hooligan" em pista/rua.
// Modelos SC 620 e SXC 520/540/625 são de nicho (fim dos anos 1990 / início dos 2000);
// alguns dados de fábrica são difíceis de confirmar com precisão — texto é transparente sobre isso.
// Execute: pnpm --filter @motormacete/database db:seed:ktm-supermoto
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

// ─── SUPERMOTO 690 (KTM 690 SMC / SMC R) ──────────────────────────────────────
// Motor: monocilíndrico LC4 4T, líquido, 693cc (102 × 84,5mm) | SOHC 4 válvulas
// Compressão 12,5:1 | ~66-74cv @ 7.500-8.000 rpm | torque ~68-73,5 Nm @ 6.000-6.500 rpm
// Injeção eletrônica Keihin EFI (EPT) | Embreagem APTC multidisco a úmido
// Óleo Motorex 10W-50/10W-60 (comum a motores LC4) — cárter seco com radiador de óleo
// Vela: NGK LKAR8AI-9 (iridium, versões injetadas) gap ~0,9mm; versões antigas D8EA gap 0,6-0,7mm
// Pneu: 120/70-17 (D) / 160/60-17 (T) | Corrente 5/8×1/4" X-Ring | Tanque 12L
// Produção: 2007-2016 (SMC), 2012+ (SMC R), atualizada continuamente até hoje

const SM690_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo Motorex 10W-50 ou 10W-60 — cárter seco com radiador de óleo dedicado',
    body: 'O LC4 690 usa lubrificação por cárter seco com bomba dupla e radiador de óleo próprio (parecido com sistema de carro de corrida). A KTM recomenda oficialmente óleo Motorex (parceria de fábrica) 10W-50 ou 10W-60 semissintético/sintético — a viscosidade mais grossa ajuda a lidar com as folgas do monocilíndrico de alto giro. Capacidade aproximada: 1,7-2,0L. Alternativas equivalentes no Brasil: Motul 7100 10W-50, Motul 300V 10W-50 (para uso mais esportivo). Não use óleo automotivo — a embreagem é a úmido e precisa de especificação para motos (JASO MA2).',
  },
  {
    severity: 'OK',
    title: 'Vela NGK LKAR8AI-9 (iridium) gap ~0,9mm nas versões injetadas',
    body: 'As versões com injeção eletrônica (SMC R a partir de 2012) usam vela iridium NGK LKAR8AI-9, gap de fábrica próximo de 0,9mm — confirme no manual do ano específico, pois a KTM ajustou a especificação entre gerações do motor. Em versões carburadas mais antigas, procure D8EA (gap 0,6-0,7mm) como equivalente. A vela iridium dura bem mais (15.000-20.000 km) que convencional — vale o investimento em um monocilíndrico de alto giro onde falha de ignição é mais perceptível.',
  },
  {
    severity: 'WARN',
    title: 'Folga de válvulas: item crítico do monocilíndrico DOHC de alta rotação',
    body: 'O LC4 690 gira até 8.000+ rpm e tem tolerâncias de válvula mais críticas que motores multicilindro da mesma faixa. Modelos mais recentes (2026) estenderam o intervalo de checagem para ~37.000 mi (~60.000 km) graças a melhorias no came, mas em unidades mais antigas (2008-2016) o intervalo tradicional de fábrica é bem mais curto — consulte o manual do seu ano específico antes de assumir intervalos longos. Sintoma de folga fora de especificação: ruído metálico na admissão/escape, perda de potência em baixa rotação, dificuldade de partida a frio.',
  },
  {
    severity: 'OK',
    title: 'Corrente 5/8×1/4" X-Ring — supermoto desgasta diferente do uso off-road',
    body: 'O uso em asfalto de forma agressiva (acelerações fortes, frenagens no motor) gera mais calor e tensão na corrente do que o uso enduro/trilha para o qual o chassi foi originalmente pensado. Lubrifique a cada 500-600 km com spray específico para corrente com O-ring/X-ring (não use querosene puro, resseca os anéis de vedação). Marcas recomendadas: DID VX3, RK GB520XSO. Fique atento à tensão — corrente frouxa em supermoto de alta potência é mais perigosa por causa das acelerações bruscas típicas do estilo de pilotagem.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: monocilíndrico grande "respira" muito — inspecione a cada 5.000 km',
    body: 'O motor de 693cc monocilíndrico tem admissão de grande volume por ciclo — um filtro sujo afeta a resposta do acelerador de forma bem perceptível (diferente de um V-twin ou 4 cilindros, onde o efeito é mais diluído). Filtro de espuma dupla: limpar a cada 5.000 km com desengraxante próprio para filtro de moto, secar completamente e aplicar óleo específico para filtro de espuma antes de reinstalar. Nunca rode sem óleo no filtro — poeira fina passa direto e desgasta cilindro/anéis rapidamente.',
  },
  {
    severity: 'WARN',
    title: 'Freios: pastilhas de composto orgânico/sinterizado — supermoto exige mais dos discos',
    body: 'O uso de supermoto envolve frenagens fortes e repetidas em pista/rua, bem mais intenso que o uso off-road padrão do chassi 690. Pastilhas EBC FA244HH (sinterizadas, alta performance) ou Brembo/Galfer sinterizadas seguram melhor sob calor repetido que as pastilhas orgânicas de fábrica. Disco dianteiro flutuante de grande diâmetro (320mm em alguns anos) — verifique empenamento se sentir trepidação na alavanca ao frear forte. Fluido DOT 4 troca a cada 2 anos, sem exceção — a moto tem potencial de frenagem alto e fluido velho compromete a segurança.',
  },
  {
    severity: 'OK',
    title: 'Peças e óleo Motorex: parceria oficial de fábrica facilita compatibilidade',
    body: 'A KTM tem parceria histórica com a Motorex para óleos e fluidos — mesmo não sendo tão disponível no Brasil quanto Motul/Castrol, revendedores de peças KTM e algumas lojas de importados trazem a linha. Como alternativa nacional equivalente: Motul 7100/300V 10W-50 (full sintético) é amplamente aceito pela comunidade de proprietários como substituto direto. Kits de troca de óleo (óleo + filtro + anel de vedação do bujão) são vendidos prontos por importadoras de peças KTM — vale comprar o kit completo em vez de peças avulsas.',
  },
]

const SM690_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vibração de monocilíndrico grande: contrapeso ajuda mas não elimina',
    body: 'O LC4 690 tem contrapesos balanceadores (aprimorados na geração mais recente, 2026, com balancer duplo), mas ainda é um monocilíndrico de quase 700cc — vibração em certas faixas de rotação é característica do motor, não defeito. Se a vibração aumentou de forma perceptível recentemente, verifique: coxins de motor, aperto dos parafusos de fixação do motor no chassi trellis, e balanceamento das rodas 17". Vibração nova e crescente também pode indicar desgaste de rolamento de biela em motos com muita quilometragem (acima de 60.000-80.000 km).',
  },
  {
    severity: 'DANGER',
    title: 'Superaquecimento em trânsito parado: radiador de óleo tem fluxo de ar limitado parado',
    body: 'Diferente de motos com radiador de água tradicional, o sistema de resfriamento de óleo do LC4 depende mais do fluxo de ar em movimento. Em trânsito parado por tempo prolongado em dias quentes, a temperatura do óleo pode subir de forma preocupante. Sinais de alerta: ventoinha ligando com frequência incomum (nas versões com ventoinha elétrica auxiliar), cheiro de óleo quente, perda de potência ao acelerar. Evite prolongar paradas com o motor ligado em engarrafamento — desligue se parar por mais de 1-2 minutos parado no sol.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem APTC: patinação sob uso agressivo de supermoto (wheelies, saídas fortes)',
    body: 'A embreagem APTC (anti-hopping, multidisco a úmido) é robusta, mas o estilo de pilotagem supermoto — arrancadas fortes, uso de freio motor agressivo, wheelies — acelera o desgaste dos discos. Sintoma: embreagem que patina em marchas altas sob aceleração total, ponto de acionamento que muda com o tempo. Discos de embreagem de reposição (kit completo com molas) custam menos que o conjunto original importado se comprados via distribuidoras de peças para motos europeias. Troque o óleo em dia — óleo velho contribui para desgaste acelerado dos discos.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste acelerado do pneu traseiro: uso agressivo em asfalto consome borracha rápido',
    body: 'Diferente do uso misto/trilha para o qual pneus off-road duram bem mais, o uso 100% asfalto agressivo de uma supermoto (derrapagens controladas, acelerações fortes) desgasta o pneu traseiro de forma bem mais rápida — 4.000-8.000 km é comum para pilotagem esportiva intensa, contra 10.000+ km em uso mais moderado. Pneus recomendados: Pirelli Diablo Supermoto (composto específico para essa modalidade), Metzeler Racetec. Verifique desgaste irregular nas bordas — indicativo de pressão incorreta ou geometria de suspensão desregulada.',
  },
  {
    severity: 'WARN',
    title: 'Sensor de posição de válvula borboleta (TPS) e sistema EFI sensíveis a sujeira/água',
    body: 'O sistema Keihin EFI com EPT (Electronic Power Throttle) do 690 é sofisticado mas sensível a contaminação nos conectores elétricos, especialmente em uso misto com lavagens frequentes de alta pressão. Sintoma: marcha lenta instável, luz de injeção acendendo, perda momentânea de resposta do acelerador. Evite jato de água direto nos conectores do chicote próximos ao corpo de borboleta. Se o problema persistir, um scanner de diagnóstico KTM (ou genérico compatível com protocolo KTM) é necessário para ler os códigos de falha — oficinas especializadas em KTM/europeias têm esse equipamento.',
  },
]

const SM690_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma KTM 690 SMC/SMC R: monocilíndrico de alta rotação exige atenção às válvulas',
    body: '1.000 km — Revisão inicial de amaciamento: troca de óleo, verificação geral, aperto de parafusos. | 5.000 km — Troca de óleo Motorex/Motul 10W-50 + filtro. Verificar tensão e lubrificação da corrente. Inspecionar filtro de ar. | 10.000 km — Verificar vela iridium (gap ~0,9mm). Verificar pastilhas de freio (uso supermoto desgasta mais rápido). Fluido de freio se completar 2 anos. | 15.000 km — Kit relação se desgastado (uso agressivo acelera). Verificar folga de válvulas conforme intervalo do manual do ano específico (varia entre gerações do motor). | 20.000 km — Revisão geral de suspensão WP (óleo do amortecedor e da bengala). Rolamentos de roda e de direção. | A cada 2 anos — Fluido de freio DOT 4 (frente e trás), independente da km rodada.',
  },
]

// ─── SUPERMOTO 990 R (KTM 990 Supermoto R) ────────────────────────────────────
// Motor: V-twin 75° LC8, líquido, 999,8cc (101 × 62,4mm) DOHC 4 válvulas/cilindro
// Compressão 11,5:1 | ~114cv @ 4.000 rpm* (nota: alguns anos citam pico em rotação mais alta;
// verificar manual do ano) | Torque 97 Nm @ 7.000 rpm | Injeção eletrônica
// Lubrificação: cárter seco, 2 bombas rotor | Embreagem multidisco úmida, hidráulica
// Pneu: 120/70 ZR17 (D) / 180/55 ZR17 (T) | Tanque 15L | Peso seco ~192kg
// Produção: 2009-2013

const SM990R_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo Motorex/Motul 10W-50 sintético — cárter seco com duas bombas rotor',
    body: 'O V-twin LC8 999,8cc usa sistema de cárter seco com duas bombas de óleo (pressão e recolhimento) — configuração típica de motor esportivo de alta performance. Use óleo sintético 10W-50 de especificação para embreagem úmida (JASO MA2): Motorex Power Synt 4T ou Motul 300V/7100 10W-50 são as opções mais aceitas pela comunidade de proprietários. Capacidade de óleo do motor LC8: consulte o manual do ano específico — modelos de mesma base (Super Duke R/990 Adventure) variam entre 3,0-3,7L conforme configuração de radiador de óleo.',
  },
  {
    severity: 'OK',
    title: 'Duas velas — uma por cilindro do V-twin — troque sempre em par',
    body: 'O motor LC8 tem uma vela por cilindro. Como a 990 Supermoto R compartilha a base do motor Super Duke R, use as mesmas velas recomendadas para esse motor: NGK padrão iridium para motores KTM V-twin de alta performance (verifique código exato no manual do ano — a especificação teve variações entre 2009-2013). Sempre troque as duas ao mesmo tempo, mesmo que uma pareça em bom estado — combustão desigual entre cilindros gera vibração extra e consumo irregular, perceptível em um V-twin de alto desempenho como este.',
  },
  {
    severity: 'WARN',
    title: 'Corrente e kit relação: 114cv em chassi leve exige atenção redobrada',
    body: 'Com ~192 kg de peso seco e 114cv, a relação peso/potência da 990 SM R é agressiva — a corrente recebe picos de torque intensos em cada arrancada. Lubrifique a cada 500 km com produto próprio para corrente com retentor (O-ring/X-ring). Marcas recomendadas: DID ou RK de linha reforçada para motos esportivas de alta cilindrada. Inspecione o kit relação (pinhão + coroa + corrente) a cada 10.000-15.000 km — desgaste em uso esportivo é mais rápido que em uso de estrada comum.',
  },
  {
    severity: 'WARN',
    title: 'Folga de válvulas do V-twin DOHC: 8 válvulas totais, procedimento mais longo',
    body: 'O motor DOHC 4 válvulas por cilindro (8 válvulas no total) exige acesso a ambos os cabeçotes para checagem de folga — procedimento mais trabalhoso que um monocilíndrico. Planeje esse serviço com antecedência (consulte o manual do ano para o intervalo exato — motores LC8 desta geração tipicamente pedem verificação entre 15.000-20.000 km). Motor frio é obrigatório para medição correta. Recomenda-se oficina especializada em KTM/motores europeus de alta performance para esse serviço.',
  },
  {
    severity: 'OK',
    title: 'Pneus esportivos 120/70-17 / 180/55-17: composto de alta performance para o uso da moto',
    body: 'A 990 SM R foi projetada para pilotagem esportiva agressiva — pneus de composto macio/esportivo aproveitam melhor o potencial da moto e aumentam a segurança em frenagens/curvas fortes. Recomendados: Pirelli Diablo Rosso, Metzeler Sportec, Michelin Pilot Power. Pneus de composto mais duro (touring) vão durar mais mas comprometem a aderência que essa moto foi feita para explorar. Balanceamento das rodas é ainda mais importante nesta potência — vibração no guidão em alta velocidade quase sempre indica desbalanceamento.',
  },
  {
    severity: 'WARN',
    title: 'Freios: discos e pinças de alta performance — pastilhas sinterizadas recomendadas',
    body: 'Com 114cv e uso esportivo, os freios da 990 SM R trabalham no limite com frequência. Pastilhas sinterizadas (EBC HH, Brembo, Galfer) seguram melhor sob calor repetido de frenagens fortes em pista/rua do que pastilhas orgânicas. Fluido de freio DOT 4 (ou DOT 5.1 para maior resistência ao calor em uso de pista) trocado religiosamente a cada 2 anos — o sistema de freio duplo dianteiro sofre mais desgaste térmico nesta moto que em modelos de menor potência.',
  },
]

const SM990R_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vazamento em juntas do motor V-twin: problema documentado na geração LC8',
    body: 'Proprietários da família LC8 (Super Duke, Adventure, Supermoto R/T) relatam ocasionais vazamentos de óleo em juntas do motor e retentores após uso intenso/alta quilometragem — problema conhecido nessa geração de motor V-twin. Inspecione visualmente a base do motor e as juntas do cabeçote periodicamente. Vazamento pequeno e constante não é necessariamente emergência, mas deve ser diagnosticado por oficina especializada em KTM antes que piore.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico e ECU sensíveis à tensão de bateria baixa',
    body: 'Como a maioria das motos com injeção eletrônica avançada da época, a 990 SM R depende de tensão de bateria estável para a ECU funcionar corretamente. Bateria fraca ou próxima do fim da vida útil pode causar marcha lenta instável, dificuldade de partida ou comportamento errático do acelerador eletrônico. Mantenha a bateria em bom estado e substitua preventivamente a cada 3-4 anos, mesmo sem sintomas evidentes.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste acelerado de pneu traseiro em uso esportivo/urbano agressivo',
    body: 'Com 114cv em um chassi leve, é comum proprietários relatarem vida útil de pneu traseiro bem menor que motos de touring — 3.000-6.000 km em uso esportivo intenso não é incomum. Isso é esperado para o perfil da moto, não defeito. Ajuste as expectativas de custo de manutenção considerando essa troca mais frequente e monitore o desgaste (principalmente nas bordas, indicativo de uso em curva) regularmente.',
  },
  {
    severity: 'WARN',
    title: 'Vibração do V-twin em certas faixas de rotação: normal, mas fique atento a mudanças',
    body: 'O motor LC8 tem uma assinatura de vibração característica em determinadas faixas de rpm — normal para o design V-twin de 75°. Se a vibração aumentar de forma perceptível ou aparecer em rotações onde antes não havia, verifique o aperto dos parafusos de fixação do motor no chassi trellis e o balanceamento das rodas antes de suspeitar de problema interno do motor.',
  },
  {
    severity: 'DANGER',
    title: 'Superaquecimento em trânsito parado prolongado: atenção ao ventilador e nível de líquido',
    body: 'O motor V-twin líquido-refrigerado de 999,8cc pode aquecer significativamente em trânsito parado por tempo prolongado, especialmente em climas quentes. Verifique o funcionamento do ventilador elétrico do radiador regularmente e mantenha o nível de líquido de arrefecimento sempre correto. Em caso de luz de temperatura acesa ou ventilador não acionando, pare o motor assim que for seguro — rodar com superaquecimento pode empenar o cabeçote.',
  },
]

const SM990R_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma KTM 990 Supermoto R: V-twin de alta performance exige revisões rigorosas',
    body: '1.000 km — Revisão de amaciamento completa: óleo, filtro, aperto geral, inspeção de vazamentos. | 5.000 km — Troca de óleo sintético 10W-50 + filtro. Inspeção de corrente e kit relação. Verificar pastilhas de freio (uso esportivo desgasta rápido). | 10.000 km — Troca de velas (par). Fluido de freio se completar 2 anos. Inspeção de pneus (desgaste irregular). | 15.000-20.000 km — Folga de válvulas do V-twin DOHC (consultar manual do ano para intervalo exato — variou entre versões). Kit relação completo se desgastado. | 20.000 km — Revisão de suspensão WP (óleo de bengala/amortecedor). Rolamentos de roda e direção. | A cada 2 anos — Fluido de freio DOT 4/DOT 5.1. Avaliação da bateria.',
  },
]

// ─── SUPERMOTO 990 T (KTM 990 Supermoto T) ────────────────────────────────────
// Motor: mesmo V-twin LC8 999cc da versão R | ~114-116cv, torque ~98-99 Nm (9,9 kgf.m)
// Versão "Touring": para-brisa maior, banco acolchoado maior, suportes para bagageiro
// Tanque maior: 19L (vs 15L da R) | Altura do assento ~855mm | Peso seco ~196kg
// Ergonomia mais amigável para viagem/uso diário — pega mais alta, banco mais confortável
// Produção: 2009-2013

const SM990T_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesmo motor V-twin LC8 da versão R — mesmo óleo e mesma atenção',
    body: 'A 990 Supermoto T compartilha o motor V-twin 999cc LC8 com a versão R (mesma potência, ~114-116cv). Use óleo sintético 10W-50 de especificação para embreagem úmida (JASO MA2) — Motorex Power Synt 4T ou Motul 300V/7100 10W-50. A diferença entre T e R está na ergonomia e no tanque maior (19L vs 15L), não no motor — todos os cuidados de manutenção do motor da versão R se aplicam igualmente aqui.',
  },
  {
    severity: 'OK',
    title: 'Tanque de 19L: planeje o intervalo de troca de óleo pela distância percorrida em viagem',
    body: 'Como a 990 T foi pensada para uso em viagens mais longas (tanque maior, banco confortável, para-brisa), é comum acumular quilometragem mais rápido que a versão R usada em uso urbano/esportivo. Não deixe passar do intervalo de troca de óleo (a cada 5.000 km) só porque a viagem "ainda não acabou" — leve óleo/filtro sobressalente ou agende a parada de manutenção em oficina KTM/especializada na rota.',
  },
  {
    severity: 'WARN',
    title: 'Corrente e kit relação: uso de viagem longa acumula km rápido — inspecione a cada saída longa',
    body: 'Viagens longas em rodovia expõem a corrente a mais quilometragem contínua que uso urbano. Lubrifique antes e depois de cada viagem longa, especialmente se pegou chuva no trajeto — água lava o lubrificante da corrente rapidamente. Leve um spray de corrente compacto na bagagem. Kit relação (pinhão + coroa + corrente) de qualidade (DID, RK) dura mais e vale o investimento para quem roda estrada com frequência.',
  },
  {
    severity: 'OK',
    title: 'Para-brisa e suportes de bagagem: verifique parafusos de fixação antes de cada viagem',
    body: 'Os componentes específicos da versão Touring (para-brisa maior, suportes para malas/baús) têm parafusos de fixação que podem afrouxar com a vibração do V-twin ao longo de várias viagens. Antes de sair em viagem longa, confira o aperto do para-brisa e dos suportes de bagageiro — perda de um componente em alta velocidade na estrada é perigoso.',
  },
  {
    severity: 'OK',
    title: 'Pneus: opção touring/esportivo conforme uso predominante',
    body: 'Para quem usa a 990 T principalmente em viagens de estrada, pneus com composto um pouco mais duradouro (Michelin Pilot Road, Metzeler Roadtec) equilibram melhor durabilidade e aderência do que pneus 100% esportivos. Para quem ainda explora curvas com frequência, mantenha pneus esportivos (Pirelli Diablo Rosso). Tamanho segue o mesmo da versão R: 120/70-17 dianteiro / 180/55-17 traseiro.',
  },
  {
    severity: 'WARN',
    title: 'Freios: mesmo sistema potente da versão R — não negligencie por ser a versão "confortável"',
    body: 'Apesar da ergonomia mais amigável, a 990 T mantém o mesmo sistema de freios de alta performance da versão R, adequado aos ~114-116cv do motor. Use pastilhas sinterizadas de qualidade (EBC HH, Brembo, Galfer) e mantenha o fluido DOT 4 trocado a cada 2 anos — viagens longas em rodovia com carga (bagagem, garupa) exigem ainda mais do sistema de freios do que uso urbano leve.',
  },
]

const SM990T_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vazamento em juntas do motor: mesmo problema documentado da versão R (motor LC8 compartilhado)',
    body: 'Por compartilhar o motor V-twin LC8 com a 990 SM R e outros modelos da família (Super Duke, Adventure), a 990 T apresenta o mesmo padrão ocasional de vazamento em juntas do motor após uso intenso ou alta quilometragem. Inspecione periodicamente a base do motor e os retentores, especialmente antes de viagens longas.',
  },
  {
    severity: 'WARN',
    title: 'Peso extra de bagagem e garupa acelera desgaste de suspensão e freios',
    body: 'O uso típico da versão T (viagens com bagagem, muitas vezes com garupa) coloca mais carga na suspensão WP e no sistema de freios do que o uso solo urbano da versão R. Ajuste a pré-carga da suspensão traseira conforme o peso transportado (a suspensão WP tem ajuste de pré-carga acessível) e inspecione pastilhas de freio com mais frequência quando rodar carregado com regularidade.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico e ECU sensíveis à tensão de bateria — agrava-se com acessórios extras',
    body: 'Proprietários que instalam acessórios elétricos extras (GPS, tomada USB, luzes auxiliares) para uso em viagem podem sobrecarregar o sistema elétrico da 990 T se a instalação não for feita corretamente com fusíveis e relés adequados. Mantenha a bateria em bom estado e instale acessórios sempre com proteção de fusível dedicada.',
  },
  {
    severity: 'DANGER',
    title: 'Superaquecimento em trânsito parado: mesmo risco do motor V-twin da versão R',
    body: 'O motor V-twin líquido-refrigerado de 999cc pode superaquecer em trânsito parado prolongado, especialmente com o peso extra de bagagem/garupa típico do uso da versão T. Monitore o funcionamento do ventilador do radiador e o nível de líquido de arrefecimento regularmente, principalmente antes e durante viagens longas em clima quente.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste de pneu traseiro mais acelerado que touring convencional, mesmo na versão "viagem"',
    body: 'Apesar da vocação mais touring da versão T, o motor continua entregando ~114-116cv em um chassi leve — o desgaste do pneu traseiro ainda é mais rápido que uma moto touring tradicional de mesma cilindrada. Se optar por pneus mais duráveis (composto touring), ainda assim monitore o desgaste a cada 3.000-4.000 km em uso intenso de viagem com carga.',
  },
]

const SM990T_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma KTM 990 Supermoto T: mesmo motor da R, atenção extra para uso em viagem',
    body: '1.000 km — Revisão de amaciamento completa: óleo, filtro, aperto geral. | 5.000 km — Troca de óleo sintético 10W-50 + filtro. Inspeção de corrente. Verificar pastilhas de freio. | 10.000 km — Troca de velas (par). Fluido de freio se completar 2 anos. Inspeção de suportes de bagageiro e para-brisa. | 15.000-20.000 km — Folga de válvulas do V-twin DOHC (consultar manual do ano). Kit relação completo se desgastado. | 20.000 km — Revisão de suspensão WP, com atenção especial à pré-carga se usar com bagagem/garupa regularmente. Rolamentos de roda e direção. | Antes de cada viagem longa — Verificar aperto de para-brisa/suportes, pressão dos pneus com carga, e nível de líquido de arrefecimento.',
  },
]

// ─── SC 620 (KTM Duke SC / Supercompetition 620, também SMC 620) ──────────────
// Motor: LC4 monocilíndrico 4T líquido, 609cc (101 × 76mm) SOHC 4 válvulas
// Compressão 10,4:1 | ~55cv @ 7.000 rpm | Torque ~60 Nm @ 5.500 rpm
// Carburador Dell'Orto PHM 40 SD | Vela NGK DR8EIX ou D8EA equivalente, gap 0,6-0,7mm
// Óleo Motorex 10W-40/10W-50 para motores LC4 refrigerados a líquido
// Pneu: 100/90-19 (D) / 140/80-17 (T) — nota: algumas fontes citam configuração 17"/17"
// para a versão Supermoto específica; confirme a configuração de roda do seu exemplar
// Tanque ~19L (nota: valor referente ao LC4 620 Supercomp; SC 620 pode variar por ano)
// Produção: aproximadamente 1996-2003 (moto de nicho, dados de fábrica difíceis de confirmar)

const SC620_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo Motorex 10W-40 ou 10W-50 — motor LC4 refrigerado a líquido, monocilíndrico clássico',
    body: 'O SC 620 usa o motor LC4 609cc da era clássica da KTM (final dos anos 1990/início dos 2000), refrigerado a líquido. A recomendação consolidada entre proprietários e lojas especializadas é Motorex 10W-40 ou 10W-50 (kits de troca de óleo para "KTM 400/620/640/660 LC4 94-06" usam essa especificação). Como esta é uma moto de nicho e mais antiga, procure sempre o manual do proprietário do ano específico do seu exemplar para confirmar a capacidade exata — a experiência de proprietários indica algo entre 1,5-2,0L, mas isso pode variar por ano/versão.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK D8EA ou DR8EIX (iridium) — gap 0,6-0,7mm',
    body: 'Para os motores LC4 620 desta era, a vela NGK D8EA (convencional) ou DR8EIX (iridium, mais durável) com gap de 0,6-0,7mm é a referência mais citada por lojas de peças especializadas em KTM clássica. Iridium vale a pena numa moto de coleção/uso esporádico — dura mais e mantém a partida mais confiável mesmo após período parado. Custo baixo (R$ 40-70 a unidade iridium importada).',
  },
  {
    severity: 'WARN',
    title: 'Carburador Dell\'Orto PHM 40 SD: sensível a etanol e período parado sem uso',
    body: 'O SC 620 usa carburador Dell\'Orto (não injeção eletrônica) — peça mecânica sensível à degradação de combustível parado no float bowl. Se a moto ficar parada por mais de 30 dias, drene o combustível do carburador ou use estabilizador de combustível. Sintomas de carburador sujo: partida difícil, marcha lenta instável, engasgo na aceleração. Limpeza requer desmontagem cuidadosa — jatos (gicleurs) Dell\'Orto são item de reposição raro no Brasil, procure em importadoras especializadas em peças italianas/europeias de carburador.',
  },
  {
    severity: 'OK',
    title: 'Corrente e relação: peça de desgaste mais fácil de encontrar que peças de motor',
    body: 'Correntes e kits de relação para motos deste porte (609cc, chassi de trilha/enduro adaptado) seguem padrões comuns de mercado (chain 520 é referência típica para motos LC4 desta cilindrada) — mais fácil de encontrar que peças específicas de motor. Lubrifique a cada 500 km. Como o SC 620 é usado de forma mais agressiva no asfalto (perfil supermoto), inspecione o desgaste com mais frequência que faria numa moto de trilha pura.',
  },
  {
    severity: 'WARN',
    title: 'Folga de válvulas: motor SOHC de época exige atenção manual (sem shim automático)',
    body: 'O motor LC4 desta geração é SOHC com acionamento por balancim/tucho roscado (ajuste manual por contraporca, sem pastilhas shim). Motor frio é obrigatório para medição. Como não encontramos a especificação exata de folga para o SC 620 especificamente (moto de nicho com pouca documentação em português), recomendamos fortemente localizar o manual do proprietário original ou consultar um mecânico especializado em KTM LC4 clássica antes de fazer o ajuste — usar valores de outro modelo LC4 por aproximação é arriscado.',
  },
  {
    severity: 'WARN',
    title: 'Peças escassas: SC 620 é moto rara no Brasil — busque compatibilidade com LC4 620/640',
    body: 'O SC 620 nunca teve grande volume de vendas oficiais no Brasil — peças originais são raras. A vantagem: o motor LC4 620 foi usado em várias plataformas KTM da época (Duke, Adventure, Enduro, Supercompetition) com boa parte de componentes de motor compatíveis entre si. Ao procurar peças, pesquise por "KTM LC4 620" de forma genérica, não apenas "SC 620" — isso amplia bastante as opções em desmontes e importadoras de peças europeias.',
  },
]

const SC620_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Moto de nicho com quase 25-30 anos: revisão estrutural completa antes de rodar com confiança',
    body: 'O SC 620 é uma moto de final dos anos 1990/início dos 2000 — mangueiras de combustível, retentores de vedação e componentes de borracha em geral já passaram (ou estão perto de passar) do fim da vida útil recomendada, independente da quilometragem. Antes de qualquer uso regular, uma revisão completa de mangueiras, retentores de bengala, e sistema de arrefecimento por um mecânico experiente em motos clássicas é essencial para segurança.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de líquido de arrefecimento: mangueiras e junta do cabeçote envelhecidas',
    body: 'Motores LC4 refrigerados a líquido desta era são conhecidos por desenvolverem vazamentos em mangueiras (rachaduras por ressecamento da borracha) e ocasionalmente na junta do cabeçote conforme a idade avança. Verifique o nível do líquido de arrefecimento regularmente e procure manchas esverdeadas/amareladas (dependendo da cor do aditivo) sob o motor. Substitua mangueiras preventivamente se a moto tiver histórico desconhecido de manutenção.',
  },
  {
    severity: 'WARN',
    title: 'Vibração de monocilíndrico grande: característica do motor, mas fique atento a mudanças',
    body: 'O monocilíndrico 609cc tem vibração perceptível, especialmente em rotações médias-altas — isso é esperado para o design. Se a vibração aumentou muito recentemente ou mudou de caráter, verifique o aperto dos parafusos de motor no chassi e a condição dos coxins de guidão antes de suspeitar de problema interno (rolamento de biela, por exemplo, que seria mais grave e caro numa moto desta idade).',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico datado: CDI e reguladores de tensão da época são frágeis',
    body: 'Componentes elétricos de motos de 25-30 anos (CDI, regulador retificador) frequentemente já falharam pelo menos uma vez ou estão no fim da vida útil. Sintomas: dificuldade de partida, luzes fracas, bateria que não carrega. Como peças originais são raras, busque CDI e retificador genéricos compatíveis por especificação elétrica (voltagem, número de pinos) em oficinas especializadas em motos KTM clássicas ou fóruns internacionais (KTM Forums, Adventure Rider) que frequentemente documentam substitutos que funcionam.',
  },
  {
    severity: 'WARN',
    title: 'Pneu traseiro 140/80-17: uso supermoto agressivo desgasta rápido em composto errado',
    body: 'Se o pneu instalado for de perfil off-road/misto (comum em motos desta plataforma originalmente pensada para trilha), o desgaste em uso de asfalto agressivo será acelerado e a aderência inferior à de um pneu específico para supermoto/asfalto. Ao trocar, prefira pneus com composto voltado para asfalto (Pirelli Diablo, Metzeler) respeitando a medida original — isso melhora tanto a durabilidade quanto a segurança no uso urbano/rodoviário.',
  },
]

const SC620_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma SC 620 — moto de nicho: intervalos conservadores recomendados pela idade do modelo',
    body: '500 km (após qualquer serviço grande) — Verificar torque geral e vazamentos. | 3.000 km — Troca de óleo Motorex 10W-40/10W-50. Lubrificar corrente a cada 500 km. | 5.000 km — Limpeza do carburador Dell\'Orto (mais frequente se a moto ficar parada por períodos longos entre usos). Verificar vela NGK D8EA/DR8EIX. | 8.000-10.000 km — Folga de válvulas (confirmar especificação com manual do ano ou mecânico especializado). | Anualmente, independente da km — Inspeção de mangueiras de arrefecimento, retentores de bengala, sistema elétrico (CDI/retificador) — dada a idade do modelo, inspeção por tempo é tão importante quanto por quilometragem.',
  },
]

// ─── SXC 520/540 (KTM SXC 520/540) ────────────────────────────────────────────
// Motor: LC4 monocilíndrico 4T líquido | 540: 538,5cc (101×76mm) compressão 11,3:1
// (520 é a nomenclatura comercial anterior à atualização para 540 — cilindradas próximas)
// SOHC 4 válvulas sobre balancim, acionamento por corrente única de comando
// Carburador Keihin FCR ou similar (linha SXC da época) | Chassi baseado na EXC de enduro
// com rodas 17"/17" para uso supermoto ("Supermoto Competition")
// Corrente: 520 (confirmado para o SXC 540 2000-2006, 520×120 elos)
// Produção aproximada: ~1999-2002 (moto rara, poucos dados de fábrica documentados)

const SXC520540_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo Motorex 10W-40/10W-50 — mesma linha dos demais LC4 da época',
    body: 'O motor LC4 538,5cc (540) segue a mesma família de motores monocilíndricos líquido-refrigerados da KTM da época do SC 620 e SXC 625. A recomendação consolidada de proprietários e lojas especializadas é Motorex 10W-40 ou 10W-50. Como o SXC 520/540 é um dos modelos mais raros desta pesquisa (base de chassi enduro EXC adaptada para supermoto), o manual do proprietário original é a fonte mais confiável para capacidade exata — seja cauteloso com "capacidade aproximada" citada por terceiros sem fonte oficial.',
  },
  {
    severity: 'WARN',
    title: 'Rodas 17"/17" de asfalto sobre chassi de enduro: geometria diferente do EXC original',
    body: 'O SXC 520/540 usa o chassi da linha EXC de enduro, mas com rodas 17" dianteira e traseira (em vez de 21"/18" do enduro), configuração típica supermoto "competition". Isso muda a geometria de direção e a resposta em curva comparado ao enduro original — pneus de asfalto de qualidade (mesmo sendo tamanho relativamente raro para achar em supermoto de época) fazem grande diferença na segurança. Ao repor pneus, confirme a medida exata do aro do seu exemplar antes de comprar, pois há variação entre anos/versões desta linha de nicho.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520×120 elos — mesma especificação usada até anos posteriores da linha',
    body: 'Kits de corrente para o SXC 540 do período 2000-2006 confirmam especificação 520×120 elos (fonte: catálogos de correntes para reposição, ex. Sunstar). Isso facilita a busca por peça de reposição, já que "corrente 520" é item comum de mercado, disponível em marcas como DID, RK e Sunstar. Lubrifique a cada 500 km — o chassi de origem enduro tende a acumular mais sujeira/poeira que uma supermoto de fábrica pura, então limpeza da corrente antes de lubrificar é ainda mais importante.',
  },
  {
    severity: 'WARN',
    title: 'Vela e carburador: componentes de época, pesquise pelo motor LC4 genérico se não achar peça específica',
    body: 'Não encontramos especificação de vela cravada oficialmente para o SXC 520/540 especificamente (moto muito rara com pouca documentação em português ou inglês). Como o motor é da família LC4 desta era, comece a busca por NGK D8EA (convencional) ou DR8EIX (iridium), gap aproximado 0,6-0,7mm — mesma faixa usada em outros LC4 contemporâneos (SC 620, SXC 625). Confirme com um mecânico especializado em KTM clássica antes de assumir como definitivo, pois pode haver variação por versão do motor.',
  },
  {
    severity: 'OK',
    title: 'Peça rara: priorize mecânico especializado em KTM clássica/enduro de época',
    body: 'O SXC 520/540 é uma das motos mais raras desta linha de pesquisa — poucas foram vendidas e a documentação técnica em fontes acessíveis é limitada. Para manutenção séria (motor, carburador, elétrica), o caminho mais seguro é procurar oficinas especializadas em KTM clássica ou entusiastas de fóruns internacionais (KTM Forums, Adventure Rider, grupos de colecionadores) que têm mais experiência prática acumulada com este modelo específico do que a documentação oficial disponível hoje.',
  },
  {
    severity: 'WARN',
    title: 'Freios: disco simples dianteiro — avalie upgrade de pastilha para uso supermoto',
    body: 'Seguindo o padrão da família SXC/SC da época (disco de ~260mm dianteiro, pinça de 2 pistões), o freio original foi dimensionado para uso misto enduro/competição, não necessariamente para frenagens repetidas de asfalto em alta velocidade. Pastilhas de composto semi-metálico ou sinterizado (ao invés da orgânica original, se ainda presente) melhoram a resposta e resistem melhor ao calor no uso supermoto em pista/rua.',
  },
]

const SXC520540_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Moto de nicho de ~25 anos: componentes de borracha e vedação precisam de inspeção completa',
    body: 'Assim como o SC 620, o SXC 520/540 tem idade que já ultrapassa a vida útil recomendada para mangueiras, retentores e vedações de borracha, independentemente da quilometragem rodada. Antes de uso regular, uma inspeção completa de mangueiras de arrefecimento, retentores de bengala/amortecedor e vedações do motor por um mecânico experiente é essencial — principalmente se a moto ficou parada por longos períodos ao longo da vida.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico de época: falhas em CDI/regulador são esperadas em uma moto desta idade',
    body: 'Componentes elétricos originais (CDI, regulador retificador) desta era frequentemente já falharam ou estão no fim de vida. Sintomas: dificuldade de partida, luzes intermitentes, bateria que não segura carga. Peças originais são muito difíceis de encontrar para este modelo específico — busque por compatibilidade elétrica genérica (mesma voltagem/pinagem) com apoio de mecânico especializado em KTM clássica.',
  },
  {
    severity: 'WARN',
    title: 'Carburador: degradação por combustível parado é ainda mais crítica em moto raramente usada',
    body: 'Motos de nicho como o SXC 520/540 frequentemente passam longos períodos sem uso entre um proprietário e outro. Combustível parado no carburador degrada e forma verniz/goma que entope jatos, especialmente com o etanol da gasolina brasileira. Se for adquirir um exemplar parado há tempo, planeje desmontagem e limpeza completa do carburador antes de tentar dar partida — não force a partida repetidamente com o carburador sujo, isso pode danificar o motor de arranque.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão WP de época: vedantes e óleo provavelmente vencidos há muito tempo',
    body: 'A suspensão dianteira invertida e o amortecedor traseiro WP desta era certamente já passaram do intervalo recomendado de troca de óleo/vedantes (tipicamente a cada 2-3 anos ou 20.000-30.000 km em uso normal, mas o tempo de calendário conta tanto quanto a quilometragem para vedantes de borracha). Uma revisão completa da suspensão é recomendada antes de qualquer uso mais intenso, especialmente para o perfil supermoto que exige suspensão em bom estado para segurança em curva.',
  },
  {
    severity: 'WARN',
    title: 'Disponibilidade de documentação técnica limitada: seja cauteloso com dados de fontes não oficiais',
    body: 'Por ser um modelo raro e antigo, boa parte da informação técnica disponível online sobre o SXC 520/540 vem de fóruns e catálogos de peças de reposição, não do manual oficial da KTM. Sempre que possível, busque o manual do proprietário original (frequentemente disponibilizado digitalizado por comunidades de entusiastas) antes de confiar cegamente em especificações agregadas de terceiros — principalmente para valores críticos como folga de válvulas e torque de parafusos do motor.',
  },
]

const SXC520540_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma SXC 520/540 — moto rara de época: prioridade em inspeção por tempo, não só km',
    body: '500 km — Verificar aperto geral e vazamentos após qualquer serviço. | 3.000 km — Troca de óleo Motorex 10W-40/10W-50. Lubrificar corrente 520 a cada 500 km. | 5.000 km — Limpeza do carburador (mais frequente se a moto ficar parada por temporadas). Verificar vela (NGK D8EA/DR8EIX como referência da família LC4). | Anualmente — Inspeção de mangueiras de arrefecimento, vedantes de suspensão WP, sistema elétrico (CDI/retificador), independentemente da quilometragem — a idade do modelo pesa mais que o uso nestes itens. | Antes de qualquer uso após período parado — Revisão completa de carburador, óleo e pneus (borracha ressecada por tempo parado é risco de segurança).',
  },
]

// ─── SXC 625 (KTM SXC 625) ─────────────────────────────────────────────────────
// Motor: LC4 monocilíndrico 4T líquido, 625cc (101×78mm), SOHC 4 válvulas, compressão 11,5:1
// ~32cv @ 6.000 rpm | Torque 45 Nm @ 3.500 rpm | Carburador Keihin FCR MX-41
// Transmissão 5 velocidades | Embreagem hidráulica | Partida elétrica e a pedal
// Pneu (config. original enduro): 90/90-21 (D) / 140/80-18 (T) — supermoto de época pode
// ter sido convertida para rodas 17"/17"; confirme a configuração do seu exemplar
// Suspensão: garfo WP invertido 48mm, monoamortecedor WP | Freio: disco 260mm (D, 2 pistões)
// / 220mm (T, 1 pistão) | Peso seco ~143kg | Tanque 12L | Produção: ~2002-2006

const SXC625_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo Motorex 10W-40/10W-50 — evolução direta da linha LC4 anterior (SXC 520/540, SC 620)',
    body: 'O SXC 625 usa o motor LC4 625cc (101×78mm), evolução da família de monocilíndricos líquido-refrigerados KTM. Assim como os demais modelos LC4 desta era, a recomendação consolidada é Motorex 10W-40 ou 10W-50 semissintético. Confirme a capacidade exata (aproximadamente 1,5-2,0L, variando por fonte) com o manual do proprietário do seu ano específico — o SXC 625 teve produção entre aproximadamente 2002-2006 com pequenas revisões de especificação ano a ano.',
  },
  {
    severity: 'OK',
    title: 'Carburador Keihin FCR MX-41: mais moderno que o Dell\'Orto dos modelos anteriores da linha',
    body: 'O SXC 625 avançou para o carburador Keihin FCR MX-41 (carburador de corpo maior, resposta mais precisa que os carburadores mais antigos da linha SXC/SC anterior). Ainda é carburador mecânico — sensível a combustível parado e degradação por etanol. Se a moto ficar parada por mais de 30 dias, drene o carburador ou use estabilizador de combustível. Limpeza e regulagem do FCR exigem ferramentas específicas (jogo de chaves para os jatos Keihin) — procure oficina especializada em motos de enduro/trilha de origem KTM/Honda/Yamaha desta era, que costuma ter familiaridade com carburadores FCR.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem hidráulica: verifique nível de fluido regularmente, diferente de embreagem a cabo',
    body: 'O SXC 625 tem acionamento de embreagem hidráulico (não a cabo como muitas motos da época) — verifique o nível do reservatório de fluido de embreagem periodicamente, junto com a inspeção do fluido de freio. Se o ponto da alavanca de embreagem mudar ou ficar "esponjoso", pode ser necessário sangrar o sistema. Fluido: DOT 4, mesmo tipo usado nos freios.',
  },
  {
    severity: 'OK',
    title: 'Suspensão WP invertida 48mm: robusta para uso supermoto, mas exige manutenção de óleo',
    body: 'O garfo dianteiro WP invertido de 48mm é um componente de qualidade para a época, adequado ao uso supermoto mais exigente. Troque o óleo da suspensão (dianteira e o amortecedor traseiro) a cada 20.000 km ou 2 anos — o que vier primeiro. Óleo de suspensão específico WP ou equivalente de qualidade (Motorex, Motul Fork Oil) na viscosidade indicada pelo manual. Vedantes desgastados vazam óleo visível no tubo interno do garfo — troque assim que notar.',
  },
  {
    severity: 'WARN',
    title: 'Configuração de rodas: confirme se seu exemplar é enduro original (21"/18") ou convertido supermoto (17"/17")',
    body: 'A especificação original de fábrica do SXC 625 cita rodas 90/90-21 dianteira e 140/80-18 traseira (perfil enduro/misto), mesmo sendo comercializado como linha "supermoto competition". É comum que proprietários tenham convertido para rodas 17"/17" de asfalto puro ao longo dos anos. Confirme a configuração física do seu exemplar antes de comprar pneus — a medida errada não serve fisicamente na roda.',
  },
  {
    severity: 'OK',
    title: 'Corrente e kit relação: peças de mercado comum, mais fáceis de repor que peças de motor',
    body: 'Assim como os demais LC4 da linha, o kit de relação (corrente + pinhão + coroa) do SXC 625 usa especificações de mercado comuns entre motos de trilha/enduro de cilindrada similar da época — mais fácil de encontrar reposição do que peças específicas de motor ou carburador. Lubrifique a cada 500 km, especialmente após uso off-road ou chuva.',
  },
]

const SXC625_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Moto de ~20 anos: inspeção completa de borrachas e vedações antes de uso regular',
    body: 'O SXC 625, com produção entre aproximadamente 2002-2006, já ultrapassou a vida útil recomendada de mangueiras, retentores e vedações de borracha por critério de tempo, independente da quilometragem. Antes de rodar com confiança, uma revisão completa por mecânico experiente em KTM/motos de enduro de época é essencial — mangueiras de arrefecimento ressecadas podem romper sem aviso.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico: CDI, regulador e chicote da época são pontos de falha conhecidos',
    body: 'Como os demais LC4 desta geração, componentes elétricos originais do SXC 625 frequentemente já falharam ou estão no fim da vida útil. Diagnostique com multímetro: tensão de carga da bateria com o motor em marcha (deve estar na faixa de 13,5-14,5V) indica se o regulador/retificador está funcionando. Se falhar, busque substituto compatível por especificação elétrica — peça original é rara.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de líquido de arrefecimento: junta do cabeçote e mangueiras envelhecidas',
    body: 'Assim como outros monocilíndricos LC4 líquido-refrigerados da era, o SXC 625 pode desenvolver vazamentos de líquido de arrefecimento pela junta do cabeçote ou mangueiras conforme a idade avança. Verifique o nível regularmente e procure manchas sob o motor. Se o nível cair sem vazamento externo visível, pode haver vazamento interno (para o óleo) — situação mais séria que exige diagnóstico imediato.',
  },
  {
    severity: 'WARN',
    title: 'Vibração e desgaste de coxins de motor: uso supermoto agressivo acelera fadiga',
    body: 'Se o exemplar foi convertido para uso supermoto (rodas 17"/17", pilotagem mais agressiva em asfalto), os coxins de fixação do motor sofrem mais fadiga do que no uso enduro original para o qual foram projetados. Vibração crescente ou ruído de folga pode indicar coxins de motor desgastados — inspecione e substitua se necessário, pois motor solto no chassi acelera desgaste de outros componentes.',
  },
  {
    severity: 'WARN',
    title: 'Combustível parado degrada o carburador Keihin FCR — típico de moto de uso esporádico',
    body: 'Motos de nicho como o SXC 625 muitas vezes ficam paradas por longos períodos. O carburador Keihin FCR, apesar de mais moderno, ainda sofre com verniz/goma formados por combustível parado (agravado pelo etanol da gasolina brasileira). Ao adquirir um exemplar parado, planeje limpeza completa do carburador antes de rodar normalmente — não insista em partidas repetidas com o motor "afogando", isso desgasta o motor de arranque e a bateria.',
  },
]

const SXC625_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma SXC 625: moto de quase 20 anos, priorize inspeção por tempo além da quilometragem',
    body: '500 km — Verificar aperto geral e vazamentos. | 3.000 km — Troca de óleo Motorex 10W-40/10W-50. Lubrificar corrente a cada 500 km. | 5.000 km — Limpeza do carburador Keihin FCR MX-41 (mais frequente se ficar parada por temporadas). Verificar fluido de embreagem hidráulica e fluido de freio. | 8.000-10.000 km — Folga de válvulas (confirmar especificação com manual do ano ou mecânico especializado em KTM). | 20.000 km — Troca de óleo da suspensão WP (garfo dianteiro e amortecedor traseiro). | Anualmente — Inspeção de mangueiras de arrefecimento, sistema elétrico (CDI/retificador), coxins de motor — a idade do modelo exige atenção por tempo, não só por km rodada.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'SUPERMOTO 690',
    yearFrom: 2007,
    yearTo: null,
    MACETES: SM690_MACETES,
    PROBLEMAS: SM690_PROBLEMAS,
    MANUTENCAO: SM690_MANUTENCAO,
  },
  {
    modelName: 'SUPERMOTO 990 R',
    yearFrom: 2009,
    yearTo: 2013,
    MACETES: SM990R_MACETES,
    PROBLEMAS: SM990R_PROBLEMAS,
    MANUTENCAO: SM990R_MANUTENCAO,
  },
  {
    modelName: 'SUPERMOTO 990 T',
    yearFrom: 2009,
    yearTo: 2013,
    MACETES: SM990T_MACETES,
    PROBLEMAS: SM990T_PROBLEMAS,
    MANUTENCAO: SM990T_MANUTENCAO,
  },
  {
    modelName: 'SC 620',
    yearFrom: 1996,
    yearTo: 2003,
    MACETES: SC620_MACETES,
    PROBLEMAS: SC620_PROBLEMAS,
    MANUTENCAO: SC620_MANUTENCAO,
  },
  {
    modelName: 'SXC 520/ 540',
    yearFrom: 1999,
    yearTo: 2002,
    MACETES: SXC520540_MACETES,
    PROBLEMAS: SXC520540_PROBLEMAS,
    MANUTENCAO: SXC520540_MANUTENCAO,
  },
  {
    modelName: 'SXC 625',
    yearFrom: 2002,
    yearTo: 2006,
    MACETES: SXC625_MACETES,
    PROBLEMAS: SXC625_PROBLEMAS,
    MANUTENCAO: SXC625_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'SUPERMOTO 690',
    yearFrom: 2007, yearTo: null,
    tireSize: '120/70-17 (F) · 160/60-17 (R)',
    frontPsi: 32, rearPsi: 36,
    frontPsiLoad: 33, rearPsiLoad: 39,
    notes: 'Solo: F 32 / R 36 PSI. Com carona/bagagem: F 33 / R 39 PSI. Pneus recomendados: Pirelli Diablo Supermoto ou Metzeler Sportec — composto de asfalto específico para uso agressivo. Verifique pressão a frio, semanalmente.',
  },
  {
    modelName: 'SUPERMOTO 990 R',
    yearFrom: 2009, yearTo: 2013,
    tireSize: '120/70 ZR17 (F) · 180/55 ZR17 (R)',
    frontPsi: 33, rearPsi: 39,
    frontPsiLoad: 33, rearPsiLoad: 42,
    notes: 'Solo: F 33 / R 39 PSI. Com carga/pilotagem esportiva intensa: F 33 / R 42 PSI. Pneu traseiro 180/55 é largo — pressão adequada é ainda mais crítica para segurança em curva com os 114cv do motor.',
  },
  {
    modelName: 'SUPERMOTO 990 T',
    yearFrom: 2009, yearTo: 2013,
    tireSize: '120/70 ZR17 (F) · 180/55 ZR17 (R)',
    frontPsi: 33, rearPsi: 39,
    frontPsiLoad: 34, rearPsiLoad: 42,
    notes: 'Solo: F 33 / R 39 PSI. Com bagagem/garupa (uso touring típico desta versão): F 34 / R 42 PSI. Mesma medida de pneu da versão R — ajuste a pressão conforme peso carregado em viagem.',
  },
  {
    modelName: 'SC 620',
    yearFrom: 1996, yearTo: 2003,
    tireSize: '100/90-19 (F) · 140/80-17 (R) — configuração aproximada, confirme com seu exemplar',
    frontPsi: 26, rearPsi: 30,
    frontPsiLoad: 27, rearPsiLoad: 33,
    notes: 'Solo: F 26 / R 30 PSI. Com carga: F 27 / R 33 PSI. ATENÇÃO: dados de fábrica exatos para o SC 620 são difíceis de confirmar (moto rara, pouca documentação disponível) — valores baseados no perfil de pneu típico para motos LC4 desta cilindrada/época. Confirme a medida exata de pneu do seu exemplar antes de comprar, pois pode haver variação por ano/versão.',
  },
  {
    modelName: 'SXC 520/ 540',
    yearFrom: 1999, yearTo: 2002,
    tireSize: 'Configuração 17"/17" (supermoto) sobre chassi EXC — confirme medida exata com seu exemplar',
    frontPsi: 28, rearPsi: 32,
    frontPsiLoad: 29, rearPsiLoad: 34,
    notes: 'Solo: F 28 / R 32 PSI. Com carga: F 29 / R 34 PSI. ATENÇÃO: não encontramos a especificação exata de fábrica para este modelo raro — valores estimados por comparação com motos supermoto de cilindrada e chassi similar da mesma era. Confirme com manual do proprietário original se disponível, ou com mecânico especializado em KTM clássica.',
  },
  {
    modelName: 'SXC 625',
    yearFrom: 2002, yearTo: 2006,
    tireSize: '90/90-21 (F) · 140/80-18 (R) — configuração original enduro; pode ter sido convertida para 17"/17"',
    frontPsi: 22, rearPsi: 26,
    frontPsiLoad: 23, rearPsiLoad: 29,
    notes: 'Solo (config. enduro original 21"/18"): F 22 / R 26 PSI. Com carga: F 23 / R 29 PSI. Se seu exemplar foi convertido para rodas 17"/17" de asfalto puro, as pressões corretas sobem para a faixa de supermoto (F ~30 / R ~34 PSI) — confirme a configuração física das rodas antes de calibrar.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // SUPERMOTO 690
  { modelName: 'SUPERMOTO 690', yearFrom: 2007, yearTo: null, component: 'Óleo Motorex/Motul 10W-50 ou 10W-60 (cárter seco)', intervalKm: 5000, intervalMonths: 6, notes: 'JASO MA2 obrigatório (embreagem úmida). Capacidade aproximada 1,7-2,0L — confirme no manual do ano.', priority: 'HIGH', order: 1 },
  { modelName: 'SUPERMOTO 690', yearFrom: 2007, yearTo: null, component: 'Vela NGK LKAR8AI-9 (iridium, gap ~0,9mm)', intervalKm: 15000, intervalMonths: null, notes: 'Versões carburadas mais antigas: D8EA gap 0,6-0,7mm.', priority: 'MEDIUM', order: 2 },
  { modelName: 'SUPERMOTO 690', yearFrom: 2007, yearTo: null, component: 'Lubrificação corrente 5/8×1/4" X-Ring', intervalKm: 500, intervalMonths: null, notes: 'Uso supermoto agressivo desgasta mais rápido que uso off-road do chassi original.', priority: 'HIGH', order: 3 },
  { modelName: 'SUPERMOTO 690', yearFrom: 2007, yearTo: null, component: 'Filtro de ar — limpeza (espuma dupla)', intervalKm: 5000, intervalMonths: 12, notes: 'Monocilíndrico grande respira muito — filtro sujo afeta resposta de forma perceptível.', priority: 'MEDIUM', order: 4 },
  { modelName: 'SUPERMOTO 690', yearFrom: 2007, yearTo: null, component: 'Folga de válvulas', intervalKm: 20000, intervalMonths: 24, notes: 'Intervalo varia por geração do motor — modelos recentes (2026) estendem para ~60.000 km. Confirme com manual do ano.', priority: 'CRITICAL', order: 5 },
  { modelName: 'SUPERMOTO 690', yearFrom: 2007, yearTo: null, component: 'Pastilhas de freio sinterizadas (EBC FA244HH ou equivalente)', intervalKm: 8000, intervalMonths: null, notes: 'Uso supermoto exige composto de alta performance — desgaste mais rápido que uso comum.', priority: 'HIGH', order: 6 },
  { modelName: 'SUPERMOTO 690', yearFrom: 2007, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Troca bienal obrigatória — potencial de frenagem alto exige fluido em bom estado.', priority: 'HIGH', order: 7 },
  { modelName: 'SUPERMOTO 690', yearFrom: 2007, yearTo: null, component: 'Kit relação (pinhão + coroa + corrente)', intervalKm: 15000, intervalMonths: null, notes: 'DID VX3 ou RK GB520XSO — uso agressivo acelera desgaste vs. uso trilha original.', priority: 'HIGH', order: 8 },
  { modelName: 'SUPERMOTO 690', yearFrom: 2007, yearTo: null, component: 'Suspensão WP — óleo de bengala/amortecedor', intervalKm: 20000, intervalMonths: 24, notes: 'Revisão completa recomendada a cada 20.000 km.', priority: 'MEDIUM', order: 9 },

  // SUPERMOTO 990 R
  { modelName: 'SUPERMOTO 990 R', yearFrom: 2009, yearTo: 2013, component: 'Óleo sintético Motorex/Motul 10W-50 (cárter seco, 2 bombas)', intervalKm: 5000, intervalMonths: 6, notes: 'JASO MA2. Capacidade varia por configuração — consulte manual do ano (faixa típica LC8: 3,0-3,7L).', priority: 'HIGH', order: 1 },
  { modelName: 'SUPERMOTO 990 R', yearFrom: 2009, yearTo: 2013, component: 'Velas ×2 (V-twin, uma por cilindro)', intervalKm: 10000, intervalMonths: null, notes: 'Sempre trocar em par. Confirme código exato no manual do ano — variou entre 2009-2013.', priority: 'HIGH', order: 2 },
  { modelName: 'SUPERMOTO 990 R', yearFrom: 2009, yearTo: 2013, component: 'Lubrificação corrente e kit relação', intervalKm: 500, intervalMonths: null, notes: '114cv em chassi leve gera picos de torque intensos na corrente — inspecionar kit a cada 10-15 mil km.', priority: 'HIGH', order: 3 },
  { modelName: 'SUPERMOTO 990 R', yearFrom: 2009, yearTo: 2013, component: 'Folga de válvulas (V-twin DOHC, 8 válvulas)', intervalKm: 18000, intervalMonths: 24, notes: 'Procedimento mais longo — acesso aos dois cabeçotes. Confirmar intervalo exato com manual do ano.', priority: 'CRITICAL', order: 4 },
  { modelName: 'SUPERMOTO 990 R', yearFrom: 2009, yearTo: 2013, component: 'Pastilhas de freio sinterizadas (EBC HH/Brembo/Galfer)', intervalKm: 8000, intervalMonths: null, notes: 'Uso esportivo intenso — freio duplo dianteiro sofre desgaste térmico elevado.', priority: 'HIGH', order: 5 },
  { modelName: 'SUPERMOTO 990 R', yearFrom: 2009, yearTo: 2013, component: 'Fluido de freio DOT 4 / DOT 5.1', intervalKm: null, intervalMonths: 24, notes: 'DOT 5.1 para uso de pista frequente — maior resistência ao calor.', priority: 'HIGH', order: 6 },
  { modelName: 'SUPERMOTO 990 R', yearFrom: 2009, yearTo: 2013, component: 'Bateria — verificação de tensão', intervalKm: null, intervalMonths: 12, notes: 'ECU sensível a bateria fraca. Substituir preventivamente a cada 3-4 anos.', priority: 'MEDIUM', order: 7 },
  { modelName: 'SUPERMOTO 990 R', yearFrom: 2009, yearTo: 2013, component: 'Suspensão WP — revisão de óleo', intervalKm: 20000, intervalMonths: 24, notes: 'Garfo e amortecedor traseiro.', priority: 'MEDIUM', order: 8 },
  { modelName: 'SUPERMOTO 990 R', yearFrom: 2009, yearTo: 2013, component: 'Inspeção de juntas do motor (vazamento)', intervalKm: null, intervalMonths: 12, notes: 'Problema documentado na geração LC8 (Super Duke/Adventure/Supermoto) — inspeção visual periódica.', priority: 'MEDIUM', order: 9 },

  // SUPERMOTO 990 T
  { modelName: 'SUPERMOTO 990 T', yearFrom: 2009, yearTo: 2013, component: 'Óleo sintético Motorex/Motul 10W-50 (mesmo motor da R)', intervalKm: 5000, intervalMonths: 6, notes: 'JASO MA2. Mesma capacidade/especificação da versão R.', priority: 'HIGH', order: 1 },
  { modelName: 'SUPERMOTO 990 T', yearFrom: 2009, yearTo: 2013, component: 'Velas ×2 (V-twin, uma por cilindro)', intervalKm: 10000, intervalMonths: null, notes: 'Sempre trocar em par.', priority: 'HIGH', order: 2 },
  { modelName: 'SUPERMOTO 990 T', yearFrom: 2009, yearTo: 2013, component: 'Lubrificação corrente e kit relação', intervalKm: 500, intervalMonths: null, notes: 'Viagens longas acumulam km rápido — lubrificar antes/depois de cada viagem, principalmente após chuva.', priority: 'HIGH', order: 3 },
  { modelName: 'SUPERMOTO 990 T', yearFrom: 2009, yearTo: 2013, component: 'Folga de válvulas (V-twin DOHC, 8 válvulas)', intervalKm: 18000, intervalMonths: 24, notes: 'Mesmo procedimento da versão R.', priority: 'CRITICAL', order: 4 },
  { modelName: 'SUPERMOTO 990 T', yearFrom: 2009, yearTo: 2013, component: 'Pastilhas de freio sinterizadas', intervalKm: 10000, intervalMonths: null, notes: 'Uso com bagagem/garupa exige mais do sistema de freios.', priority: 'HIGH', order: 5 },
  { modelName: 'SUPERMOTO 990 T', yearFrom: 2009, yearTo: 2013, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Troca bienal obrigatória.', priority: 'HIGH', order: 6 },
  { modelName: 'SUPERMOTO 990 T', yearFrom: 2009, yearTo: 2013, component: 'Suspensão WP — pré-carga e óleo', intervalKm: 20000, intervalMonths: 24, notes: 'Ajustar pré-carga conforme peso de bagagem/garupa. Revisão de óleo a cada 20.000 km.', priority: 'MEDIUM', order: 7 },
  { modelName: 'SUPERMOTO 990 T', yearFrom: 2009, yearTo: 2013, component: 'Fixação de para-brisa e suportes de bagageiro', intervalKm: null, intervalMonths: null, notes: 'Verificar antes de cada viagem longa — vibração do V-twin pode afrouxar parafusos.', priority: 'MEDIUM', order: 8 },
  { modelName: 'SUPERMOTO 990 T', yearFrom: 2009, yearTo: 2013, component: 'Inspeção de juntas do motor (vazamento)', intervalKm: null, intervalMonths: 12, notes: 'Mesmo motor LC8 compartilhado com a versão R — mesmo padrão de desgaste.', priority: 'MEDIUM', order: 9 },

  // SC 620
  { modelName: 'SC 620', yearFrom: 1996, yearTo: 2003, component: 'Óleo Motorex 10W-40/10W-50', intervalKm: 3000, intervalMonths: 6, notes: 'Confirme capacidade exata com manual do proprietário do ano específico — dado difícil de confirmar para este modelo.', priority: 'HIGH', order: 1 },
  { modelName: 'SC 620', yearFrom: 1996, yearTo: 2003, component: 'Vela NGK D8EA ou DR8EIX (gap 0,6-0,7mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Iridium (DR8EIX) recomendado para uso esporádico — mantém partida confiável.', priority: 'MEDIUM', order: 2 },
  { modelName: 'SC 620', yearFrom: 1996, yearTo: 2003, component: 'Limpeza do carburador Dell\'Orto PHM 40 SD', intervalKm: 5000, intervalMonths: 6, notes: 'Mais frequente se a moto ficar parada por períodos longos. Drenar float bowl antes de guardar.', priority: 'HIGH', order: 3 },
  { modelName: 'SC 620', yearFrom: 1996, yearTo: 2003, component: 'Lubrificação da corrente', intervalKm: 500, intervalMonths: null, notes: 'Uso supermoto agressivo em asfalto — inspecionar desgaste com mais frequência.', priority: 'HIGH', order: 4 },
  { modelName: 'SC 620', yearFrom: 1996, yearTo: 2003, component: 'Folga de válvulas (SOHC, ajuste manual)', intervalKm: 8000, intervalMonths: 12, notes: 'Especificação exata não confirmada para este modelo — consultar mecânico especializado em KTM LC4 clássica.', priority: 'HIGH', order: 5 },
  { modelName: 'SC 620', yearFrom: 1996, yearTo: 2003, component: 'Inspeção de mangueiras de arrefecimento e retentores', intervalKm: null, intervalMonths: 12, notes: 'Moto com 25-30 anos — borracha ressecada é risco independente da km rodada.', priority: 'CRITICAL', order: 6 },
  { modelName: 'SC 620', yearFrom: 1996, yearTo: 2003, component: 'Sistema elétrico — CDI e regulador/retificador', intervalKm: null, intervalMonths: 12, notes: 'Componentes de época frequentemente já no fim de vida útil. Peças originais raras.', priority: 'HIGH', order: 7 },
  { modelName: 'SC 620', yearFrom: 1996, yearTo: 2003, component: 'Pneus — avaliar composto de asfalto vs. off-road original', intervalKm: null, intervalMonths: 12, notes: 'Se equipada com pneu misto/off-road, considerar troca por composto de asfalto (Pirelli Diablo, Metzeler).', priority: 'MEDIUM', order: 8 },

  // SXC 520/540
  { modelName: 'SXC 520/ 540', yearFrom: 1999, yearTo: 2002, component: 'Óleo Motorex 10W-40/10W-50', intervalKm: 3000, intervalMonths: 6, notes: 'Capacidade não confirmada com certeza — priorizar manual do proprietário original.', priority: 'HIGH', order: 1 },
  { modelName: 'SXC 520/ 540', yearFrom: 1999, yearTo: 2002, component: 'Vela (referência NGK D8EA/DR8EIX, gap ~0,6-0,7mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Especificação por aproximação com família LC4 contemporânea — não confirmada oficialmente para este modelo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'SXC 520/ 540', yearFrom: 1999, yearTo: 2002, component: 'Lubrificação corrente 520×120 elos', intervalKm: 500, intervalMonths: null, notes: 'Especificação de corrente confirmada em catálogos de reposição (Sunstar) para o SXC 540 2000-2006.', priority: 'HIGH', order: 3 },
  { modelName: 'SXC 520/ 540', yearFrom: 1999, yearTo: 2002, component: 'Limpeza de carburador', intervalKm: 5000, intervalMonths: 6, notes: 'Moto raramente usada entre proprietários — degradação de combustível parado é risco recorrente.', priority: 'HIGH', order: 4 },
  { modelName: 'SXC 520/ 540', yearFrom: 1999, yearTo: 2002, component: 'Inspeção de mangueiras, vedantes de suspensão WP e sistema elétrico', intervalKm: null, intervalMonths: 12, notes: 'Moto de ~25 anos — inspeção por tempo, independente da quilometragem.', priority: 'CRITICAL', order: 5 },
  { modelName: 'SXC 520/ 540', yearFrom: 1999, yearTo: 2002, component: 'Suspensão WP — revisão de óleo e vedantes', intervalKm: 20000, intervalMonths: 24, notes: 'Vedantes de borracha vencem por tempo mesmo com pouco uso.', priority: 'HIGH', order: 6 },
  { modelName: 'SXC 520/ 540', yearFrom: 1999, yearTo: 2002, component: 'Confirmação de medida de pneu/roda do exemplar', intervalKm: null, intervalMonths: null, notes: 'Chassi EXC com rodas 17"/17" — confirme medida exata antes de comprar pneus, pode variar por unidade.', priority: 'MEDIUM', order: 7 },

  // SXC 625
  { modelName: 'SXC 625', yearFrom: 2002, yearTo: 2006, component: 'Óleo Motorex 10W-40/10W-50', intervalKm: 3000, intervalMonths: 6, notes: 'Capacidade aproximada 1,5-2,0L — confirme com manual do ano específico.', priority: 'HIGH', order: 1 },
  { modelName: 'SXC 625', yearFrom: 2002, yearTo: 2006, component: 'Limpeza/regulagem carburador Keihin FCR MX-41', intervalKm: 5000, intervalMonths: 6, notes: 'Requer jogo de chaves específico para jatos Keihin. Mais frequente se moto ficar parada.', priority: 'HIGH', order: 2 },
  { modelName: 'SXC 625', yearFrom: 2002, yearTo: 2006, component: 'Fluido de embreagem hidráulica e freio (DOT 4)', intervalKm: null, intervalMonths: 24, notes: 'Verificar nível do reservatório de embreagem junto com o de freio.', priority: 'HIGH', order: 3 },
  { modelName: 'SXC 625', yearFrom: 2002, yearTo: 2006, component: 'Lubrificação da corrente', intervalKm: 500, intervalMonths: null, notes: 'Especialmente após uso off-road ou chuva.', priority: 'HIGH', order: 4 },
  { modelName: 'SXC 625', yearFrom: 2002, yearTo: 2006, component: 'Folga de válvulas', intervalKm: 8000, intervalMonths: 12, notes: 'Confirme especificação com manual do ano ou mecânico especializado em KTM.', priority: 'HIGH', order: 5 },
  { modelName: 'SXC 625', yearFrom: 2002, yearTo: 2006, component: 'Suspensão WP invertida 48mm — troca de óleo', intervalKm: 20000, intervalMonths: 24, notes: 'Garfo dianteiro e amortecedor traseiro.', priority: 'MEDIUM', order: 6 },
  { modelName: 'SXC 625', yearFrom: 2002, yearTo: 2006, component: 'Inspeção de mangueiras de arrefecimento e sistema elétrico', intervalKm: null, intervalMonths: 12, notes: 'Moto de ~20 anos — inspeção por tempo além da quilometragem.', priority: 'CRITICAL', order: 7 },
  { modelName: 'SXC 625', yearFrom: 2002, yearTo: 2006, component: 'Coxins de fixação do motor', intervalKm: null, intervalMonths: 12, notes: 'Uso supermoto (se convertido para rodas 17) acelera fadiga vs. uso enduro original.', priority: 'MEDIUM', order: 8 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed KTM Supermoto (690 / 990 R / 990 T / SC 620 / SXC 520-540 / SXC 625)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'KTM', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'KTM', vehicleTypeId: motoType.id },
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

  console.log('✅ KTM Supermoto concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
