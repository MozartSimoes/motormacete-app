/**
 * Seed BMW — R 1300 GS / R 1300 RT (nova geração Boxer ShiftCam, 2023/2024+)
 * Cobre a plataforma mais nova da BMW Motorrad: novo motor boxer 1300cc,
 * novo chassi "casca" com motor estrutural, câmbio automatizado ASA opcional.
 *
 * Fontes: bmw-motorrad.com.br, press kit oficial BMW R 1300 GS/RT (specs de
 * potência, torque, peso, chassi, medidas de pneu), manuais BMW Motorrad,
 * fóruns internacionais (advrider.com, bmwgsbrasil.com.br) — plataforma muito
 * recente, portanto há poucos relatos de longo prazo; dados de manutenção
 * seguem o padrão oficial BMW e a família de motores boxer ShiftCam anterior
 * (R 1250 GS), com estimativas assinaladas onde a especificação exata da
 * nova geração ainda não está amplamente documentada.
 *
 * Execute: pnpm --filter @motormacete/database db:seed:bmw-r1300
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

// ─── R 1300 GS ─────────────────────────────────────────────────────────────

const R1300GS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor boxer 1300cc totalmente novo: 145 cv e chassi com motor estrutural',
    body: 'A R 1300 GS (lançada mundialmente em 2023, chegou ao Brasil em 2024) estreou motor boxer inteiramente novo — 1.300cc, ShiftCam (came de admissão variável), cabeçotes refrigerados a líquido. Potência: ~145 cv (107 kW) a 7.750 RPM, torque ~149 Nm a 6.500 RPM — bem acima da R 1250 GS (136 cv). Novidade estrutural: pela primeira vez a BMW abandonou o quadro tubular espacial e usa um chassi tipo "casca" (sheet-metal shell) onde o próprio motor é elemento estrutural — reduz peso e aumenta rigidez. Peso em ordem de marcha: ~237 kg (estimativa de fábrica, varia por versão/opcionais), cerca de 10–12 kg mais leve que a R 1250 GS equivalente. Óleo: 5W-40 sintético BMW Advantec Ultimate, ~4,0L com filtro (volume estimado — mesma faixa da geração anterior, confirme na etiqueta/manual do seu chassi específico).',
  },
  {
    severity: 'WARN',
    title: 'Pneu traseiro 170/60 R17: mudança de medida em relação à R 1250 GS — mais largo',
    body: 'A R 1300 GS aumentou a medida do pneu traseiro para 170/60 R17 (a R 1250 GS usava 150/70 R17) — visual mais musculoso e mais contato de solo, mas atenção: essa medida é menos comum no mercado brasileiro que o 150/70, então pesquise disponibilidade antes de sair em viagem longa. Dianteiro segue em 120/70 R19. Opções confirmadas para essa medida: Michelin Anakee Adventure, Metzeler Karoo 4, Bridgestone Battlax Adventure A41. Pneus para 170/60-17 custam tipicamente 15–25% mais que o 150/70-17 equivalente por serem produzidos em menor volume.',
  },
  {
    severity: 'OK',
    title: 'ASA (Automated Shift Assistant): câmbio semi-automático opcional — sem alavanca de embreagem',
    body: 'A partir de 2024 a BMW oferece o ASA como opcional (pacote pago) na R 1300 GS — primeira vez que a marca oferece esse sistema em produção de série. O ASA automatiza a atuação da embreagem eletronicamente: não existe alavanca de embreagem no guidão. O piloto ainda troca de marcha manualmente (pedal de câmbio ou botões), mas sem precisar acionar embreagem — o sistema faz o acoplamento/desacoplamento sozinho, inclusive na largada. Não é um câmbio totalmente automático (tipo CVT) — é uma automação da embreagem. Motos com ASA não têm reservatório de fluido de embreagem para verificar (menos um item de manutenção), mas o sistema tem sua própria unidade hidráulica eletrônica que só pode ser diagnosticada em concessionária ou com scanner BMW compatível.',
  },
  {
    severity: 'OK',
    title: 'Adaptive Vehicle Height Control: suspensão que abaixa a moto sozinha ao parar (opcional)',
    body: 'Um dos opcionais mais comentados da R 1300 GS é o Adaptive Vehicle Height Control — suspensão eletrônica que abaixa automaticamente a altura do assento em ~30mm quando a moto reduz a velocidade e para, facilitando apoiar os pés no chão, e volta à altura normal ao arrancar. É um sistema hidráulico/eletrônico adicional (evolução do ESA/Dynamic ESA) — some ao pedido de revisão nada além da inspeção visual de vazamento nos amortecedores nas revisões programadas, mas em caso de falha o reparo é exclusivo de rede autorizada (sistema proprietário, sem peça aftermarket equivalente ainda).',
  },
  {
    severity: 'WARN',
    title: 'Combustível: motor de alta compressão pede gasolina aditivada/premium no Brasil',
    body: 'O boxer 1300cc tem taxa de compressão elevada (na faixa de 13:1, típica dessa família ShiftCam) e foi otimizado para combustíveis de octanagem alta (95 RON+ nos mercados europeus). No Brasil, use sempre gasolina aditivada de posto de confiança — evite a gasolina comum de procedência duvidosa. Como o etanol na gasolina brasileira (mistura E25–E27) varia de lote para lote, prefira reabastecer sempre no mesmo posto de bandeira conhecida para manter a resposta de injeção consistente. Sinais de combustível ruim: perda de potência em alta rotação, engasgos leves ao acelerar forte — normalmente evidentes em moto de alta compressão antes de qualquer outro sintoma mecânico.',
  },
  {
    severity: 'OK',
    title: 'Cardan (transmissão final por eixo): sem corrente para lubrificar, mas óleo do cardan não pode ser esquecido',
    body: 'Como toda R-series boxer, a R 1300 GS mantém transmissão final por cardan (eixo) — sem corrente, sem lubrificação frequente. Isso é uma vantagem enorme para quem roda muito (viagens, off-road com lama/areia). Mas o óleo do cardan e o óleo do câmbio ainda precisam ser trocados: use 75W-90 GL-5 hipóide em ambos, no intervalo definido pela concessionária (estimado em 20.000 km, seguindo o padrão da família R desde a R 1200/1250 GS, até a BMW publicar tabela definitiva específica da R 1300). Ruído tipo "clunk" ao soltar a embreagem/ASA em marcha lenta é sinal de óleo do cardan degradado ou folga nos rolamentos — leve para inspeção.',
  },
  {
    severity: 'OK',
    title: 'GS-911 e diagnóstico: plataforma nova pode exigir versão de software atualizada',
    body: 'A R 1300 GS usa uma arquitetura eletrônica renovada (novo painel TFT de 6,5", nova central de controle) — se você já tem um GS-911 (ferramenta de diagnóstico popular entre donos de BMW), confirme que o firmware/licença suporta a plataforma 2024+ antes de contar com ele para diagnóstico completo. Modelos de GS-911 mais antigos podem não reconhecer todos os módulos novos (ASA, Adaptive Vehicle Height Control). Consulte o fabricante do GS-911 (Hex Code) sobre compatibilidade antes de comprar usado pensando em usar na R 1300.',
  },
  {
    severity: 'WARN',
    title: 'Proteção para uso off-road: cilindros do boxer seguem expostos, mas em posição um pouco diferente',
    body: 'Apesar do novo chassi, a R 1300 GS mantém a configuração boxer clássica com os cilindros horizontais expostos lateralmente — vulneráveis em quedas e batidas em pedras no off-road. Priorize: protetor de cabeçote/cilindro (cylinder head guard), protetor de cárter (skid plate/bash plate) e protetor de mão. Como o motor agora é estrutural (parte do chassi), uma pancada severa no cárter tem potencial de gerar reparo mais caro que na geração anterior — o investimento em proteção compensa ainda mais nesta geração.',
  },
]

const R1300GS_PROBLEMAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Plataforma muito recente: poucos relatos de longo prazo — foque em manutenção preventiva',
    body: 'A R 1300 GS chegou ao mercado brasileiro em 2024. Diferente de modelos com anos de histórico (R 1250 GS, R 1200 GS), ainda não há uma base robusta de relatos de problemas crônicos em alta quilometragem — a amostra de motos rodando acima de 40.000–50.000 km ainda é pequena. Trate as informações desta seção como pontos de atenção preventivos baseados na engenharia da plataforma e no histórico de gerações anteriores com tecnologia similar, não como "defeitos confirmados". Acompanhe boletins técnicos (TSBs) e recalls no site oficial BMW Motorrad Brasil usando o número de chassi (VIN) periodicamente.',
  },
  {
    severity: 'WARN',
    title: 'ASA é tecnologia nova em produção — sem histórico de confiabilidade de longo prazo ainda',
    body: 'O sistema ASA (câmbio com embreagem automatizada) estreou em produção de série na R 1300 GS em 2024 — não existe histórico de confiabilidade de vários anos como em sistemas de câmbio manual convencional. Não há motivo concreto para desconfiar do sistema (a BMW testa exaustivamente antes do lançamento), mas por prudência: se você optar pelo ASA, mantenha as revisões rigorosamente em dia na rede autorizada nos primeiros anos, e fique atento a qualquer comportamento anômalo no acoplamento da embreagem (patinação, engate brusco, delay incomum) — reporte imediatamente à concessionária.',
  },
  {
    severity: 'WARN',
    title: 'Atuador ShiftCam: mesmo ponto de atenção herdado da R 1250 GS',
    body: 'O sistema ShiftCam (variação de perfil de came de admissão) continua presente na R 1300 GS, evoluído da R 1250 GS. Na geração anterior, o atuador eletro-hidráulico do ShiftCam podia sofrer com óleo de baixa qualidade ou trocado fora do intervalo, causando perda de potência em baixo RPM. Prevenção: use exclusivamente óleo sintético de especificação JASO MA2 de qualidade (BMW Advantec Ultimate ou equivalente reconhecido) e nunca estenda o intervalo de troca além de 10.000 km / 12 meses.',
  },
  {
    severity: 'WARN',
    title: 'Eletrônica e software: primeira geração de plataforma costuma receber atualizações de firmware',
    body: 'A R 1300 GS estreou central eletrônica, painel TFT de 6,5" e integração de conectividade renovados. É comum que plataformas de primeira geração recebam atualizações de firmware nos primeiros 1–2 anos após lançamento para corrigir pequenos bugs de software (comportamento de menus, conectividade Bluetooth/app, calibração de sensores). Nada incomum ou alarmante — mas vale perguntar na revisão se há atualização de software pendente para sua moto, já que correções costumam ser gratuitas via concessionária.',
  },
  {
    severity: 'WARN',
    title: 'Bateria: motos com muitos módulos eletrônicos drenam carga em repouso prolongado',
    body: 'Assim como a R 1250 GS, a R 1300 GS tem numerosos módulos eletrônicos em stand-by (alarme, imobilizador, conectividade, suspensão eletrônica) que causam drenagem lenta da bateria mesmo desligada. Se a moto ficar parada por mais de 2–3 semanas, conecte um carregador de manutenção com modo AGM (CTEK, Optimate, ou o carregador BMW original) — nunca use carregador de chumbo-ácido convencional, que danifica baterias AGM. Motos equipadas com bateria de lítio (opcional em alguns pacotes) exigem carregador com modo Lithium específico — verifique o tipo de bateria da sua unidade antes de carregar.',
  },
  {
    severity: 'WARN',
    title: 'Disponibilidade de peças e mão de obra especializada ainda concentrada em grandes concessionárias',
    body: 'Por ser uma plataforma nova, peças de reposição específicas (componentes do novo chassi, sensores do Adaptive Vehicle Height Control, unidade do ASA) ainda têm disponibilidade mais restrita fora das grandes capitais, e o aftermarket de peças alternativas ainda é limitado comparado à R 1250 GS (que já tem anos de mercado paralelo consolidado). Para quem mora no interior, vale mapear a concessionária BMW mais próxima e confirmar prazo médio de peças antes de uma viagem longa.',
  },
]

const R1300GS_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma R 1300 GS (2024+): segue o padrão BMW de 10.000 km, ajustado para o Brasil',
    body: '1.000 km — Revisão de rodagem obrigatória em concessionária autorizada (mantém a garantia): checklist geral, aperto de parafusos estruturais, verificação de vazamentos, atualização de software se disponível. | 10.000 km / 12 meses — Óleo 5W-40 sintético BMW Advantec Ultimate (~4,0L, estimado) + filtro + inspeção de freios + nível de líquido de arrefecimento + inspeção visual do sistema ASA (se equipado). | 20.000 km — Tudo do 10k + velas de ignição novas + filtro de ar + verificação de folga de válvulas (estimativa herdada da família ShiftCam: admissão 0,10–0,15 mm / escape 0,20–0,25 mm, motor frio) + óleo do cardan (180 ml, 75W-90 GL-5) + óleo do câmbio (~0,8L, 75W-90 GL-5) + fluido de freio DOT 4. | 40.000 km — Tudo do 20k + inspeção de rolamentos do Telelever/Paralever + óleo de garfo (se aplicável ao seu pacote de suspensão). | Líquido de arrefecimento: troque a cada 4 anos (G12++/G13 ou equivalente BMW). Para uso no Brasil com gasolina etanolada, priorize sempre gasolina aditivada de posto confiável e não estenda o intervalo de óleo em hipótese alguma — o motor de alta compressão é mais sensível a combustível de baixa qualidade que a geração anterior.',
  },
]

// ─── R 1300 RT ─────────────────────────────────────────────────────────────

const R1300RT_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesmo motor boxer 1300cc da R 1300 GS, em roupagem de touring de longa distância',
    body: 'A R 1300 RT (chegada ao Brasil em 2024/2025) compartilha o motor boxer 1300cc ShiftCam da R 1300 GS — ~145 cv, torque ~149 Nm — mas com carroceria de touring completa: carenagem integral, para-brisa elétrico ajustável, tanque maior (~27L, estimado, contra ~19L da GS) para maior autonomia em viagem. Peso em ordem de marcha significativamente maior que a GS por causa da carenagem, baús e equipamentos de série (estimado em ~280 kg, varia por pacote — confirme a ficha técnica do seu ano/versão específica). Óleo, filtro e intervalos de troca seguem a mesma especificação do motor da GS: 5W-40 sintético BMW Advantec Ultimate, ~4,0L com filtro, a cada 10.000 km/12 meses.',
  },
  {
    severity: 'OK',
    title: 'Rodas 17"/17": medida totalmente diferente da GS — pneus de touring/estrada mais fáceis de achar',
    body: 'Ao contrário da R 1300 GS (19" frente / 17" atrás, pensada para off-road leve), a R 1300 RT usa rodas 17" nos dois eixos — medida típica de touring/esportiva de estrada, com muito mais opções de pneu disponíveis no Brasil. Medidas: 120/70 R17 dianteiro, 180/55 R17 traseiro. Opções recomendadas para touring pesado: Michelin Road 6, Bridgestone Battlax T32, Metzeler Roadtec 01 — todos focados em durabilidade e desempenho em piso molhado, prioridades naturais para quem roda longas distâncias.',
  },
  {
    severity: 'OK',
    title: 'ASA disponível também na RT: ainda mais interessante em touring com garupa e bagagem',
    body: 'O sistema ASA (Automated Shift Assistant, embreagem automatizada eletronicamente) também é oferecido como opcional na R 1300 RT. Para quem faz viagens longas com garupa e baús carregados, o ASA reduz a fadiga da mão esquerda em trânsito parado e engates repetidos — vantagem real em touring. Mesma ressalva da GS: tecnologia nova em produção de série, sem histórico de confiabilidade de longo prazo ainda — mantenha revisões em dia.',
  },
  {
    severity: 'OK',
    title: 'Cardan: mesma vantagem de baixa manutenção da GS, ideal para quem roda muito quilômetro',
    body: 'Como toda R-series, a R 1300 RT usa transmissão final por cardan — sem corrente para lubrificar a cada 500 km, grande vantagem para quem faz viagens de milhares de quilômetros. Óleo do cardan (75W-90 GL-5, 180 ml) e óleo do câmbio (75W-90 GL-5, ~0,8L) seguem o intervalo estimado de 20.000 km, herdado da família R 1250. Para touring pesado com baús e garupa constantes, considere inspeção do cardan a cada revisão — a carga extra permanente aumenta o desgaste dos rolamentos ao longo do tempo.',
  },
  {
    severity: 'OK',
    title: 'Para-brisa elétrico e equipamentos de conforto: verifique atuadores na revisão',
    body: 'A R 1300 RT tem para-brisa com ajuste elétrico de altura, banco aquecido e manoplas aquecidas (de série ou opcionais conforme pacote), e possivelmente cruise control adaptativo por radar (dependendo da versão/pacote escolhido). Todos esses sistemas somam motores elétricos e sensores que vale testar periodicamente — nas revisões, peça para o mecânico confirmar o funcionamento completo do para-brisa (curso total), aquecimento de banco/manoplas nos três níveis, e resposta do radar de cruise adaptativo (se equipado) antes de sair em viagem longa.',
  },
  {
    severity: 'WARN',
    title: 'Bateria maior por causa da carga elétrica: mantenha carregador de manutenção sempre à mão',
    body: 'Com mais equipamentos elétricos que a GS (para-brisa elétrico, aquecimentos, som/conectividade, iluminação adicional), a R 1300 RT tende a ter drenagem de bateria em repouso ainda mais perceptível. Se a moto ficar parada por período de férias ou entressafra, conecte carregador de manutenção com modo apropriado ao tipo de bateria (AGM ou lítio, conforme equipamento de fábrica) desde o primeiro dia — não espere a bateria descarregar para agir.',
  },
]

const R1300RT_PROBLEMAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Plataforma nova: mesma ressalva da R 1300 GS — pouco histórico de longo prazo ainda',
    body: 'A R 1300 RT é ainda mais recente que a R 1300 GS no mercado brasileiro. Não há relatos consolidados de problemas crônicos em alta quilometragem — a base de motos rodando muitos milhares de km é pequena até o momento. As informações desta seção são pontos de atenção preventivos baseados na engenharia compartilhada com a R 1300 GS e no histórico de gerações RT anteriores, não "defeitos confirmados". Acompanhe recalls e TSBs pelo VIN no site oficial BMW Motorrad Brasil.',
  },
  {
    severity: 'WARN',
    title: 'ASA sem histórico de longo prazo — mesma cautela recomendada para a GS',
    body: 'Assim como na R 1300 GS, o sistema ASA da R 1300 RT é tecnologia de primeira geração em produção de série. Sem motivo concreto para desconfiança, mas mantenha as revisões estritamente em dia nos primeiros anos e reporte imediatamente qualquer comportamento anômalo de acoplamento da embreagem.',
  },
  {
    severity: 'WARN',
    title: 'Peso elevado em manobras de baixa velocidade: atenção redobrada em garagem e estacionamento',
    body: 'Com peso estimado acima de 280 kg em ordem de marcha (mais baús e bagagem em viagem, facilmente ultrapassando 300 kg), a R 1300 RT exige técnica de manobra em baixa velocidade mais apurada que a GS — especialmente em ladeiras ou piso irregular na garagem. Isso não é um "defeito" mas um ponto de atenção real para quem troca de uma moto mais leve: pratique manobras lentas em local seguro antes de encarar trânsito urbano complexo com a moto carregada.',
  },
  {
    severity: 'WARN',
    title: 'Componentes eletrônicos de conforto (para-brisa, aquecimentos): motores elétricos exigem inspeção periódica',
    body: 'Sistemas elétricos de conforto (para-brisa motorizado, banco/manopla aquecidos) somam pontos de falha potenciais que a GS não tem — motores elétricos, conectores e chicote adicional expostos a vibração e variação de temperatura ao longo dos anos. Recomenda-se testar o curso completo do para-brisa e o funcionamento dos aquecimentos a cada revisão, e reportar qualquer ruído anormal do motor do para-brisa (indica desgaste da engrenagem do atuador) assim que perceber.',
  },
  {
    severity: 'WARN',
    title: 'Bateria: mesma tendência de drenagem em repouso da R 1300 GS, agravada pela carga elétrica extra',
    body: 'A carga elétrica adicional da RT (comparada à GS) significa que a bateria tende a descarregar mais rápido em repouso prolongado se nenhum carregador de manutenção for usado. Use exclusivamente carregador com modo compatível com o tipo de bateria de fábrica (AGM ou lítio) — carregador errado danifica a bateria de forma irreversível.',
  },
]

const R1300RT_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma R 1300 RT (2024+): mesma base mecânica da GS, com itens extras de conforto a inspecionar',
    body: '1.000 km — Revisão de rodagem obrigatória em concessionária: checklist geral, aperto estrutural, atualização de software se disponível. | 10.000 km / 12 meses — Óleo 5W-40 sintético BMW Advantec Ultimate (~4,0L, estimado) + filtro + freios + nível de arrefecimento + teste do para-brisa elétrico e aquecimentos + inspeção visual do ASA (se equipado). | 20.000 km — Tudo do 10k + velas novas + filtro de ar + folga de válvulas (estimativa herdada da família ShiftCam: admissão 0,10–0,15 mm / escape 0,20–0,25 mm) + óleo do cardan (180 ml, 75W-90 GL-5) + óleo do câmbio (~0,8L, 75W-90 GL-5) + fluido de freio DOT 4. | 40.000 km — Tudo do 20k + inspeção de rolamentos da suspensão + óleo de garfo (se aplicável). | Líquido de arrefecimento: a cada 4 anos. Para touring pesado com garupa e baús constantes, antecipe a inspeção do cardan e dos rolamentos de roda — a carga permanente acelera o desgaste em relação ao uso solo da GS.',
  },
]

// ─── Blocos de modelos ────────────────────────────────────────────────────────

const bmwR1300Models: ModelBlock[] = [
  {
    modelName: 'R 1300 GS',
    yearFrom: 2024,
    yearTo: null,
    MACETES: R1300GS_MACETES,
    PROBLEMAS: R1300GS_PROBLEMAS,
    MANUTENCAO: R1300GS_MANUTENCAO,
  },
  {
    modelName: 'R 1300 RT',
    yearFrom: 2024,
    yearTo: null,
    MACETES: R1300RT_MACETES,
    PROBLEMAS: R1300RT_PROBLEMAS,
    MANUTENCAO: R1300RT_MANUTENCAO,
  },
]

// ─── Calibragem de pneus ──────────────────────────────────────────────────────

const bmwR1300TirePressures: TirePressureInput[] = [
  {
    modelName: 'R 1300 GS',
    yearFrom: 2024,
    yearTo: null,
    tireSize: 'Dianteiro 120/70 R19 | Traseiro 170/60 R17',
    frontPsi: 36,
    rearPsi: 42,
    frontPsiLoad: 36,
    rearPsiLoad: 46,
    notes: 'Solo: 36/42 PSI (2,5/2,9 bar), pneus frios. Com garupa e bagagem: 36/46 PSI. Off-road leve: reduza o traseiro para ~38 PSI. Traseiro 170/60 R17 é medida nova em relação à R 1250 GS (150/70 R17) — mais largo, pesquise disponibilidade antes de viagens ao interior. Opções: Michelin Anakee Adventure, Metzeler Karoo 4, Bridgestone Battlax Adventure A41. Nunca rode com o traseiro abaixo de 30 PSI em pavimento — moto pesada, risco de dano à carcaça do pneu.',
  },
  {
    modelName: 'R 1300 RT',
    yearFrom: 2024,
    yearTo: null,
    tireSize: 'Dianteiro 120/70 R17 | Traseiro 180/55 R17',
    frontPsi: 36,
    rearPsi: 42,
    frontPsiLoad: 38,
    rearPsiLoad: 46,
    notes: 'Solo: 36/42 PSI (2,5/2,9 bar), pneus frios. Com garupa e baús carregados (uso típico de touring): 38/46 PSI. Rodas 17"/17" — medida de touring/estrada, ampla disponibilidade no Brasil. Opções recomendadas: Michelin Road 6, Bridgestone Battlax T32, Metzeler Roadtec 01. Verifique a pressão antes de toda viagem longa — o peso elevado da RT com bagagem penaliza fortemente pneus subcalibrados.',
  },
]

// ─── Cronogramas de manutenção ────────────────────────────────────────────────

const bmwR1300MaintenanceItems: MaintenanceItemInput[] = [

  // ── R 1300 GS ──────────────────────────────────────────────────────────────
  { modelName: 'R 1300 GS', yearFrom: 2024, yearTo: null, order: 0,
    component: 'Óleo do motor (5W-40 sintético JASO MA2 — ShiftCam)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume estimado: ~4,0L com filtro (confirme na etiqueta/manual do seu chassi). BMW Advantec Ultimate 5W-40 obrigatório para o sistema ShiftCam. Não estenda o intervalo — motor de alta compressão é sensível a óleo degradado.' },
  { modelName: 'R 1300 GS', yearFrom: 2024, yearTo: null, order: 1,
    component: 'Velas de ignição (2 velas, motor boxer)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Motor novo — confirme o número de peça exato na concessionária (linha evoluída da NGK LMAR8D-J usada na R 1250 GS). Uma vela por cilindro.' },
  { modelName: 'R 1300 GS', yearFrom: 2024, yearTo: null, order: 2,
    component: 'Filtro de ar', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Troca a cada 20.000 km, inspeção a cada 10.000 km em uso off-road.' },
  { modelName: 'R 1300 GS', yearFrom: 2024, yearTo: null, order: 3,
    component: 'Folga de válvulas (estimativa: IN 0,10–0,15 / EX 0,20–0,25 mm)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Sistema shim-and-bucket com ShiftCam — valores herdados da família R 1250 GS até a BMW publicar tabela específica da geração 1300. Motor completamente frio.' },
  { modelName: 'R 1300 GS', yearFrom: 2024, yearTo: null, order: 4,
    component: 'Óleo do cardan (75W-90 GL-5)', intervalKm: 20000, intervalMonths: 24, priority: 'HIGH',
    notes: '180 ml de SAE 75W-90 GL-5 hipóide (estimado, mesma faixa da família R). Sem corrente para lembrar — não esqueça.' },
  { modelName: 'R 1300 GS', yearFrom: 2024, yearTo: null, order: 5,
    component: 'Óleo do câmbio (75W-90 GL-5)', intervalKm: 20000, intervalMonths: 24, priority: 'MEDIUM',
    notes: '~0,8L de 75W-90 GL-5 (estimado). Troque junto com o cardan.' },
  { modelName: 'R 1300 GS', yearFrom: 2024, yearTo: null, order: 6,
    component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'Troque a cada 2 anos. Motos com ASA não têm reservatório de embreagem, apenas de freio.' },
  { modelName: 'R 1300 GS', yearFrom: 2024, yearTo: null, order: 7,
    component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 48, priority: 'MEDIUM',
    notes: 'A cada 4 anos. BMW G12++ ou G13.' },
  { modelName: 'R 1300 GS', yearFrom: 2024, yearTo: null, order: 8,
    component: 'Inspeção visual ASA / Adaptive Vehicle Height Control (se equipado)', intervalKm: 10000, intervalMonths: 12, priority: 'MEDIUM',
    notes: 'Sistemas eletro-hidráulicos proprietários — inspeção visual de vazamento e teste de funcionamento a cada revisão. Reparo somente em rede autorizada.' },
  { modelName: 'R 1300 GS', yearFrom: 2024, yearTo: null, order: 9,
    component: 'Bateria — verificação de carga', intervalKm: null, intervalMonths: 6, priority: 'LOW',
    notes: 'Verifique tipo (AGM ou lítio, conforme equipamento de fábrica) e use carregador de manutenção compatível se a moto ficar parada mais de 2–3 semanas.' },

  // ── R 1300 RT ──────────────────────────────────────────────────────────────
  { modelName: 'R 1300 RT', yearFrom: 2024, yearTo: null, order: 0,
    component: 'Óleo do motor (5W-40 sintético JASO MA2 — ShiftCam)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume estimado: ~4,0L com filtro. Mesma especificação do motor da R 1300 GS. BMW Advantec Ultimate 5W-40.' },
  { modelName: 'R 1300 RT', yearFrom: 2024, yearTo: null, order: 1,
    component: 'Velas de ignição (2 velas, motor boxer)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Mesmas velas do motor da R 1300 GS — confirme o número de peça exato na concessionária.' },
  { modelName: 'R 1300 RT', yearFrom: 2024, yearTo: null, order: 2,
    component: 'Filtro de ar', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Troca a cada 20.000 km.' },
  { modelName: 'R 1300 RT', yearFrom: 2024, yearTo: null, order: 3,
    component: 'Folga de válvulas (estimativa: IN 0,10–0,15 / EX 0,20–0,25 mm)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Mesmo motor da R 1300 GS — valores herdados da família ShiftCam. Motor completamente frio.' },
  { modelName: 'R 1300 RT', yearFrom: 2024, yearTo: null, order: 4,
    component: 'Óleo do cardan (75W-90 GL-5)', intervalKm: 20000, intervalMonths: 24, priority: 'HIGH',
    notes: '180 ml de SAE 75W-90 GL-5 hipóide (estimado). Em uso de touring pesado com bagagem constante, antecipe a inspeção.' },
  { modelName: 'R 1300 RT', yearFrom: 2024, yearTo: null, order: 5,
    component: 'Óleo do câmbio (75W-90 GL-5)', intervalKm: 20000, intervalMonths: 24, priority: 'MEDIUM',
    notes: '~0,8L de 75W-90 GL-5 (estimado). Troque junto com o cardan.' },
  { modelName: 'R 1300 RT', yearFrom: 2024, yearTo: null, order: 6,
    component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'Troque a cada 2 anos.' },
  { modelName: 'R 1300 RT', yearFrom: 2024, yearTo: null, order: 7,
    component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 48, priority: 'MEDIUM',
    notes: 'A cada 4 anos. BMW G12++ ou G13.' },
  { modelName: 'R 1300 RT', yearFrom: 2024, yearTo: null, order: 8,
    component: 'Para-brisa elétrico e aquecimentos — teste funcional', intervalKm: 10000, intervalMonths: 12, priority: 'MEDIUM',
    notes: 'Teste o curso completo do para-brisa motorizado e os três níveis de aquecimento (banco/manoplas) a cada revisão. Ruído anormal no motor do para-brisa indica desgaste do atuador.' },
  { modelName: 'R 1300 RT', yearFrom: 2024, yearTo: null, order: 9,
    component: 'Bateria — verificação de carga', intervalKm: null, intervalMonths: 6, priority: 'LOW',
    notes: 'Carga elétrica maior que a GS (para-brisa, aquecimentos, conectividade). Use carregador de manutenção compatível se a moto ficar parada mais de 2–3 semanas.' },
]

// ─── Runner ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed BMW R 1300 GS / R 1300 RT iniciando...\n')

  const motoType = await prisma.vehicleType.findFirstOrThrow({
    where: { slug: 'moto' },
  })

  const bmwBrand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'BMW', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'BMW', vehicleTypeId: motoType.id },
  })
  console.log(`  ✅ Brand: ${bmwBrand.name}`)

  for (const block of bmwR1300Models) {
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
  for (const tp of bmwR1300TirePressures) {
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
  const modelNames = [...new Set(bmwR1300MaintenanceItems.map(m => m.modelName))]
  for (const name of modelNames) {
    await prisma.maintenanceItem.deleteMany({ where: { modelName: name } })
  }
  await prisma.maintenanceItem.createMany({
    data: bmwR1300MaintenanceItems.map(item => ({
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
    const count = bmwR1300MaintenanceItems.filter(m => m.modelName === name).length
    console.log(`  ✅ ${name}: ${count} itens de manutenção`)
  }

  const totalTips = bmwR1300Models.reduce(
    (acc, b) => acc + b.MACETES.length + b.PROBLEMAS.length + b.MANUTENCAO.length,
    0,
  )
  console.log(
    `\n✅ Seed BMW R 1300 concluído: ${bmwR1300Models.length} modelos, ${totalTips} dicas, ${bmwR1300TirePressures.length} calibragens, ${bmwR1300MaintenanceItems.length} itens de manutenção.`,
  )
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
