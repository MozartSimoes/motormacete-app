// seed-mv-agusta-triple.ts — MV Agusta Brutale 800, F3 800 e Rivale 800 (motor triple 798cc)
// Marca italiana exótica/boutique. Rede de concessionárias MUITO limitada no Brasil, peças caras/importadas.
// Motor base: 798cc, 3 cilindros em linha, DOHC 12 válvulas, refrigerado a líquido, injeção MVICS.
// Execute: pnpm --filter @motormacete/database db:seed:mv-agusta-triple
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

// ─── BRUTALE 800 ────────────────────────────────────────────────────────────
// Motor: 798cc, 3 cilindros em linha, DOHC 12 válvulas, refrigerado a líquido, injeção eletrônica MVICS
// (corpo de borboleta variável) | Compressão 12,3:1–13,3:1 (varia por versão)
// Potência: 125 cv @ 10.900 rpm (2013–2015) / 140 cv @ 12.300 rpm (versão RR, 2015–presente)
// Torque: ~81 Nm @ 8.600 rpm (base) / ~86 Nm (RR) | Óleo: Motul 300V ou equivalente 5W-40 sintético, ~3,2L com filtro
// Vela: NGK CR9EIB-9 (iridium), gap 0,8–0,9mm | Pneu: 120/70 ZR17 (D) / 180/55 ZR17 (T)
// Corrente: 525 × 108 (kit sprocket compatível 2012–2019) | Tanque: 16,5L
// Eletrônica: MVICS com controle de tração 8 níveis, 2–4 mapas de motor (Sport/Normal/Rain/Custom),
// embreagem antihopping, quickshifter EAS opcional/de série conforme versão | Produção: 2013–presente (RR desde 2015)

const BRUTALE800_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo Motul 300V 5W-40 sintético — 3,2L com filtro; troca a cada 15.000 km',
    body: 'A MV Agusta recomenda oficialmente óleo sintético de alta performance Motul 300V (5W-40 ou 10W-40 conforme clima) para o motor triplo 798cc. Capacidade: aproximadamente 3,0–3,2L com troca de filtro. Intervalo oficial: 15.000 km ou anualmente. Alternativas sintéticas equivalentes de qualidade (Motul 7100, Shell Advance Ultra 4T) podem ser usadas, mas o motor de alta rotação (redline acima de 13.000 rpm) exige sempre óleo 100% sintético — nunca mineral ou semissintético barato. Um litro de Motul 300V custa R$ 90–140 no Brasil; a troca completa fica em torno de R$ 350–500 incluindo filtro original.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR9EIB-9 (iridium) — gap 0,8–0,9mm, troca a cada 30.000 km',
    body: 'A Brutale 800 usa vela iridium NGK CR9EIB-9 (equivalente conforme geração: CR9EKB), gap 0,8–0,9mm. Por ser motor de 3 cilindros com acesso relativamente bom, a troca é menos trabalhosa que em motos com carenagem completa. Iridium tem vida longa (~30.000 km) mas confirme o gap a cada revisão — motores de alta rotação são sensíveis a vela gasta, com sintomas de falha em giros altos e perda de potência no topo. Custo por vela: R$ 60–100; compre as 3 juntas.',
  },
  {
    severity: 'DANGER',
    title: 'Folga de válvulas: item CRÍTICO e caro — checagem a cada 12.000–15.000 km',
    body: 'O motor DOHC 12 válvulas usa pastilhas (shim-under-bucket). A checagem da folga de válvulas em gerações mais antigas (2013–2016) é recomendada a cada 12.000 km; em revisões de motores mais recentes o intervalo maior (24.000–30.000 km) é aceito por alguns manuais atualizados — na dúvida, siga o intervalo mais curto. O procedimento exige desmontagem do cabeçote e é MUITO trabalhoso — só oficina especializada em MV Agusta deve fazer. Custo do serviço no Brasil: R$ 1.500–3.500 (peças + mão de obra), podendo passar de R$ 5.000 se pastilhas precisarem ser trocadas. Válvulas fora de especificação por muito tempo podem causar dano ao motor — não pule esta revisão.',
  },
  {
    severity: 'WARN',
    title: 'Corrente 525 × 108 elos — kit de relação compatível 2012–2019, mas de importação',
    body: 'A Brutale 800 usa corrente 525 (mais robusta que a 520 de motos menores). Kits de relação (corrente + pinhão + coroa) compatíveis com a plataforma MV Agusta 800 triple (Brutale/Dragster/Rivale/F3/Stradale 2012–2019) são vendidos por marcas como Superlite, DID e RK — geralmente importados dos EUA ou Europa (sites como sprocketcenter.com, ducshop.com). Custo do kit completo importado: R$ 900–1.800 com frete e impostos. Lubrifique a cada 500–600 km com spray de corrente de qualidade (Motul C2 ou similar) — a manutenção preventiva é ainda mais importante aqui pelo custo de reposição.',
  },
  {
    severity: 'WARN',
    title: 'Peças alternativas: filtro de óleo e pastilhas de freio têm compatíveis; motor é exclusivo',
    body: 'A rede MV Agusta no Brasil é pequena — poucas concessionárias autorizadas concentradas em SP e RJ. Para itens de consumo, HÁ alternativas: filtro de óleo compatível com HifloFiltro HF204RC ou HF563 (verificar medida exata antes de comprar, pois pode variar por ano); pastilhas de freio dianteiras compatíveis EBC FA379HH ou Brembo genérica de mesma medida (pinças Brembo radiais — pastilha Brembo original é o mais seguro custo-benefício, evita risco de disco arranhado). Já peças de motor (pistão, biela, comando, corpo de borboleta, ECU) praticamente não têm equivalente genérico — compre original ou de desmanche de mesma geração via importação.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: troca a cada 15.000–20.000 km, acesso relativamente simples',
    body: 'O filtro de ar da Brutale 800 fica sob o tanque/carenagem central — acesso mais fácil que em supersport carenadas como a F3. Recomenda-se inspeção a cada 10.000 km e troca a 15.000–20.000 km (mais cedo em ambiente com muita poeira). Filtro original custa R$ 150–280 importado. Não há filtro genérico confiável para este modelo — compre original ou de fornecedor especializado em peças MV Agusta (ex. lojas online europeias com envio internacional).',
  },
  {
    severity: 'OK',
    title: 'Pneus: Pirelli Diablo Rosso Corsa ou Diablo Supercorsa são a referência para o triple',
    body: 'A Brutale 800 sai de fábrica com pneus Pirelli Diablo Rosso Corsa (120/70 ZR17 dianteiro, 180/55 ZR17 traseiro) — mantenha a marca e o composto na reposição, pois o chassi e a eletrônica (controle de tração MVICS) foram calibrados com esse pneu. Alternativas de qualidade equivalente: Michelin Power GP ou Metzeler Sportec M9RR. Evite pneus genéricos baratos — com 125–140 cv em uma naked relativamente leve (~175 kg), a aderência do pneu é determinante para a segurança, especialmente com o controle de tração desligado ou em nível baixo.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem antihopping: fluido e ajuste requerem atenção em uso esportivo',
    body: 'A embreagem antihopping (slipper clutch) da Brutale 800 é hidraulicamente acionada em algumas versões — verifique o nível do fluido de embreagem junto com o de freio. Em uso esportivo/trackday, o desgaste dos discos de embreagem pode ser acelerado por reduções agressivas. Sinal de desgaste: patinação em giros altos ou folga excessiva na alavanca. Troca do kit de discos: R$ 1.200–2.500 (peça + mão de obra), sempre em oficina especializada — a embreagem antihopping tem calibração de rampa que não deve ser mexida sem conhecimento técnico específico da marca.',
  },
]

const BRUTALE800_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Falhas eletrônicas documentadas: ECU e sensores MVICS são ponto fraco histórico',
    body: 'A primeira geração de eletrônica MVICS (2013–2015) tem histórico documentado em fóruns internacionais (MV Agusta Forum) de falhas de sensores (TPS, sensor de marcha, sensor de inclinação) que geram códigos de erro, luz de injeção acesa, cortes de potência ou entrada em modo de segurança (limp mode). Atualizações de firmware da ECU corrigiram parte dos problemas ao longo dos anos — sempre confirme se a moto está com o firmware mais recente ao comprar usada. No Brasil, o diagnóstico requer scanner específico MV Agusta (poucas oficinas têm) — leve a concessionária autorizada ou oficina especializada em motos italianas.',
  },
  {
    severity: 'DANGER',
    title: 'Vazamento de líquido de arrefecimento pela bomba d\'água: problema recorrente em alta km',
    body: 'Relatos consistentes de proprietários (MV Agusta Forum, grupos internacionais) apontam vazamento pelo retentor da bomba d\'água do motor triple 798cc após 25.000–40.000 km. Sintoma: mancha de líquido esverdeado/rosa sob o motor, nível de arrefecimento caindo sem explicação aparente. Não rode com o motor superaquecendo — o triplo de alta rotação é sensível a dano por superaquecimento. Reparo: troca do kit de retentores da bomba, serviço que requer desmontagem parcial do motor — R$ 1.500–3.000 em oficina especializada.',
  },
  {
    severity: 'WARN',
    title: 'Marcha lenta instável e engasgos em baixa rotação — típico de motor de alta performance',
    body: 'O motor triplo de alta compressão e curso curto da Brutale 800 é otimizado para giros altos, e por isso alguns proprietários relatam marcha lenta um pouco instável ou engasgos leves em baixa rotação, especialmente a frio. Parte é característica do motor (normal), mas se piorar, verifique: corpo de borboleta sujo (limpeza com produto específico para TBI), vazamento de vácuo nas braçadeiras do corpo de borboleta, e atualização de mapa de injeção (algumas atualizações da MV Agusta melhoraram especificamente esse comportamento).',
  },
  {
    severity: 'WARN',
    title: 'Sensor de marcha (gear sensor) com falha intermitente afeta quickshifter e instrumentação',
    body: 'O sensor de marcha, usado tanto para mostrar a marcha engatada no painel quanto para o funcionamento do quickshifter eletrônico (EAS), tem histórico de falhas intermitentes documentadas em fóruns — o painel mostra marcha errada ou o quickshifter passa a cortar mal. Verificação: conectores do chicote próximos ao câmbio, geralmente oxidados ou soltos por vibração. Substituição do sensor: peça de R$ 400–800 importada, mão de obra relativamente simples para quem já trabalhou nesse modelo.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pela junta do cárter ou retentor do eixo de comando após alta km',
    body: 'Motos com mais de 30.000–40.000 km e histórico de manutenção irregular apresentam com certa frequência pequenos vazamentos de óleo pela junta do cárter inferior ou retentores dos eixos de comando. Não é falha catastrófica, mas deve ser corrigida rapidamente — óleo pingando sobre o pneu traseiro ou disco de freio é risco de segurança grave (perda de aderência/frenagem). Inspecione visualmente sob o motor a cada troca de óleo.',
  },
  {
    severity: 'WARN',
    title: 'Bateria e sistema de carga: motos paradas por longos períodos descarregam rápido',
    body: 'O sistema elétrico rico em sensores e a ECU da Brutale 800 consomem energia mesmo com a moto desligada (dreno de standby). Combinado ao fato de muitas unidades no Brasil ficarem paradas por semanas (moto de fim de semana, poucas rodando diariamente), é comum a bateria descarregar ou perder capacidade prematuramente. Use mantenedor de carga (tipo Optimate ou Battery Tender) sempre que a moto ficar parada por mais de 2 semanas. Bateria de reposição: geralmente uma AGM de 8–10Ah — R$ 350–600 no Brasil.',
  },
  {
    severity: 'DANGER',
    title: 'Rede de assistência técnica limitada: planeje manutenção com antecedência',
    body: 'A MV Agusta tem poucas concessionárias autorizadas no Brasil (historicamente concentradas em São Paulo, com presença variável ao longo dos anos em outras capitais). Peças de motor, ECU e componentes eletrônicos específicos geralmente precisam ser importados, com prazo de semanas. Antes de comprar uma Brutale 800 usada, confirme a distância até a concessionária mais próxima e considere ter um mecânico de confiança especializado em motos italianas/europeias para manutenções de rotina, reservando a concessionária para itens de garantia e diagnóstico eletrônico avançado.',
  },
]

const BRUTALE800_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Brutale 800: revisões caras e frequentes, típico de moto italiana exótica',
    body: '1.000 km — Revisão de amaciamento (óleo, torque geral, inspeção visual). | 6.000–7.500 km — Revisão intermediária (óleo, filtro de óleo, inspeção de corrente, freios). | 12.000–15.000 km — Revisão maior: óleo + filtro (Motul 300V), vela (verificar gap), filtro de ar (inspeção), checagem da folga de válvulas (item crítico, obrigatório na geração 2013–2016). | 15.000 km — Fluido de freio e embreagem (se hidráulica) a cada 2 anos, independente da km. | 20.000–25.000 km — Kit relação (corrente 525 + pinhão + coroa) se desgastado. | 30.000 km — Segunda checagem/ajuste de válvulas + troca de vela. Custo médio por revisão maior em concessionária: R$ 1.200–3.000; some ao ano o custo de manutenção preventiva (óleo, filtros, pneus, freios) facilmente ultrapassa R$ 4.000–6.000/ano em uso regular — reserve orçamento maior que o de uma moto japonesa equivalente.',
  },
]

// ─── F3 800 ──────────────────────────────────────────────────────────────────
// Motor: 798cc, 3 cilindros em linha, DOHC 12 válvulas (4/cilindro), refrigerado a líquido, MVICS
// Bore x Stroke: 79,0 x 54,3mm | Compressão 13,3:1 | Potência: 148 cv @ 13.000 rpm | Torque: 88 Nm @ 10.600 rpm
// Óleo: Motul 300V 5W-40 (ou 10W-40) sintético, ~3,0–3,5L total (motor+radiador+residual) com filtro
// Vela: NGK CR9EKB, gap 0,7–0,8mm | Pneu: 120/70 ZR17 (D) / 180/55 ZR17 (T) | Corrente: 520 (versão racing) ou 525
// Tanque: 16,6L | Peso seco: ~173 kg | Eletrônica: MVICS 2 com controle de tração 8 níveis, EAS quickshifter
// (série a partir de certas versões), modos de pilotagem Sport/Normal/Rain/Custom | Versão RC: edição limitada
// (100–250 unidades conforme ano), motor com potência de pico e componentes em carbono | Produção: 2012–presente

const F3800_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo Motul 300V sintético — capacidade total ~3,0–3,5L; siga sempre o manual da sua versão',
    body: 'O motor 798cc de altíssima rotação (redline acima de 13.500 rpm) da F3 800 exige óleo 100% sintético de performance. A MV Agusta recomenda Motul 300V 5W-40 (climas quentes) ou 10W-40. Capacidade aproximada somando cárter, radiador de óleo e residual: 3,0–3,5L — confirme a medida exata da sua versão/ano no manual, pois pode variar ligeiramente. Nunca complete com óleo mineral ou de motos comuns — a lubrificação em giros extremos exige a resistência térmica do sintético de alta gama. Litro de Motul 300V: R$ 90–140.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR9EKB gap 0,7–0,8mm — troca a cada 15.000–30.000 km conforme geração',
    body: 'A F3 800 usa vela NGK CR9EKB, gap 0,7–0,8mm (confirme no manual da sua versão, pois o gap pode variar ligeiramente por ano). Modelos mais recentes com vela iridium de série alcançam intervalos de troca maiores (até 30.000 km); versões mais antigas seguem intervalo mais conservador de 15.000 km. Acesso às velas na F3 é mais trabalhoso que na Brutale por causa da carenagem completa — planeje a troca junto com outra revisão. Custo por vela: R$ 60–100.',
  },
  {
    severity: 'DANGER',
    title: 'Folga de válvulas: serviço caro e obrigatório — não pule por causa do custo',
    body: 'Assim como toda a família 798cc triple, a checagem da folga de válvulas (shim-under-bucket, 12 válvulas) é o item de manutenção mais crítico e caro da F3 800. Intervalo recomendado: 12.000–15.000 km nas gerações mais antigas (2012–2016); revisões de manuais mais recentes estendem para até 30.000 km em alguns mercados — na dúvida, siga o intervalo curto, especialmente se a moto for usada em giros altos com frequência (uso esportivo/pista). Custo do serviço: R$ 1.800–3.500 em oficina especializada, podendo passar de R$ 5.000 se houver troca de pastilhas. É a revisão que mais assusta o bolso, mas pular ou atrasar pode causar dano sério ao motor.',
  },
  {
    severity: 'WARN',
    title: 'Corrente 520 (versão racing) ou 525 conforme ano — verifique a especificação da sua unidade',
    body: 'A F3 usa historicamente corrente 520 de pitch mais leve (voltada para redução de peso rotativo, filosofia esportiva), mas kits de conversão para 525 (mais robusto e durável) são populares entre proprietários. Confirme a especificação original da sua unidade antes de comprar kit de relação — pinhões geralmente disponíveis de 14 a 16 dentes para ajuste de relação final. Kits compatíveis (Superlite, DID, RK) são majoritariamente importados — R$ 900–1.800 com frete e impostos. Lubrifique a cada 500 km; em uso de pista, após cada sessão.',
  },
  {
    severity: 'WARN',
    title: 'Peças de carenagem são caras e específicas — cuidado extra em manobras e box',
    body: 'Diferente da Brutale (naked), a F3 tem carenagem completa em fibra que é cara e demorada de repor — uma queda de baixa velocidade pode gerar conta de R$ 3.000–8.000 em plásticos originais importados. Peças de consumo têm alternativas: filtro de óleo compatível HifloFiltro HF563, pastilhas de freio dianteiras compatíveis EBC FA379HH ou Brembo genérica (pinças Brembo radiais de série — vale usar pastilha Brembo original ou EBC HH sinterizada para não comprometer a frenagem em alta velocidade). Peças de carenagem, ECU, corpo de borboleta: apenas original.',
  },
  {
    severity: 'OK',
    title: 'Pneus Pirelli Diablo Supercorsa/Rosso Corsa — combinam com o DNA esportivo da F3',
    body: 'A F3 800 sai de fábrica com pneus esportivos de alta performance — Pirelli Diablo Rosso Corsa (uso misto) ou Supercorsa (foco em pista), 120/70 ZR17 dianteiro e 180/55 ZR17 traseiro. Com 148 cv em ~173 kg de peso seco, a relação peso/potência é extrema — não economize em pneu. Alternativas de qualidade: Michelin Power GP, Bridgestone Battlax RS11. Troque ao primeiro sinal de desgaste irregular ou endurecimento do composto (pneus perdem aderência com o tempo mesmo sem uso, por volta de 4–5 anos).',
  },
  {
    severity: 'OK',
    title: 'Quickshifter EAS: use corretamente para não forçar a caixa de câmbio',
    body: 'A F3 800 (a partir de certas versões) vem com o sistema EAS (Electronic Assist Shifter) de série ou opcional, permitindo trocas de marcha sem embreagem em aceleração. O sistema corta a injeção momentaneamente para permitir a troca suave — mas só funciona bem com o motor em carga positiva (acelerando). Trocar marcha com o EAS durante desaceleração ou com pouca carga pode forçar a engrenagem e acelerar desgaste. Em caso de falha do sensor de troca (sintoma: corte incompleto, marcha "engasgada"), verifique primeiro o cabo/sensor antes de suspeitar da ECU.',
  },
  {
    severity: 'WARN',
    title: 'Radiador de óleo e água: mantenha limpo — motor de alta performance é sensível a temperatura',
    body: 'O motor triplo de alta rotação da F3 800 tem tolerância menor a superaquecimento que motores de menor regime. Mantenha o radiador de água (e o de óleo, presente conforme versão) limpo de insetos e sujeira — a limpeza com escova macia e água a cada lavagem evita obstrução das colmeias. Em trânsito parado por longos períodos com a moto ligada, fique atento à temperatura no painel; o ventilador elétrico deve acionar automaticamente. Verifique o nível do líquido de arrefecimento (Motocool ou equivalente) a cada 1.000 km.',
  },
]

const F3800_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Falhas de ECU/sensores documentadas nas primeiras gerações MVICS (2012–2015)',
    body: 'Assim como a Brutale, a F3 800 das primeiras gerações teve histórico documentado de falhas de sensores eletrônicos (TPS, sensor de marcha, sensor de inclinação/lean angle) causando cortes de potência, luz de injeção acesa ou entrada em modo de segurança. Atualizações sucessivas de firmware da MV Agusta corrigiram grande parte — ao comprar uma F3 800 usada, confirme com a concessionária se todas as atualizações de software foram aplicadas. Diagnóstico requer scanner específico da marca, disponível apenas em concessionárias autorizadas ou oficinas muito especializadas no Brasil.',
  },
  {
    severity: 'DANGER',
    title: 'Vazamento pela bomba d\'água em alta quilometragem — mesmo problema da família 798cc',
    body: 'Reportado com frequência em fóruns internacionais para toda a família de motor triplo 798cc (Brutale/F3/Rivale compartilham o mesmo bloco base): vazamento de líquido de arrefecimento pelo retentor da bomba d\'água após 25.000–40.000 km. Fique atento a manchas sob o motor e queda inexplicada do nível de arrefecimento. Reparo requer desmontagem parcial do motor — R$ 1.500–3.000 em oficina especializada em motor MV Agusta triple.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem antihopping: patinação sob uso esportivo intenso ou trackday',
    body: 'A F3 800, por seu apelo esportivo, é usada com frequência em pista pelos proprietários — e a embreagem antihopping sofre desgaste acelerado nesse regime. Sintoma de disco gasto: patinação em acelerações fortes, folga alterada na alavanca. Recomenda-se inspeção do kit de discos a cada 15.000 km em uso misto, ou mais cedo com uso intenso em pista. Custo do kit + mão de obra: R$ 1.200–2.500.',
  },
  {
    severity: 'WARN',
    title: 'Vibração e desconforto em uso urbano — motor calibrado para giros altos, não para trânsito',
    body: 'A F3 800 é uma moto pensada para giros altos (potência de pico a 13.000 rpm) — em uso urbano de baixa rotação, é comum sentir vibração mais acentuada no guidão e nos apoios de pés, além de consumo de combustível pior que o esperado. Isso não é necessariamente defeito, é característica do motor. Fique atento apenas se a vibração aumentar repentinamente (pode indicar desbalanceamento ou folga nos coxins do motor) — nesse caso, verifique fixação do motor no chassi.',
  },
  {
    severity: 'WARN',
    title: 'Posição de pilotagem radical: desconforto em viagens longas não é defeito, é projeto',
    body: 'A ergonomia esportiva extrema da F3 (guidão baixo, pegas altas) causa desconforto em trajetos longos — não é um "problema" mecânico, mas vale o alerta para quem considera a moto para uso misto. Para quem sofre com dor lombar/pulsos, pode-se considerar guidão de conversão (risers) — mas isso pode alterar a geometria e o comportamento em curva calibrado de fábrica. Consulte um especialista antes de modificar.',
  },
  {
    severity: 'DANGER',
    title: 'Sensor de marcha (gear position sensor) com falha intermitente afeta quickshifter e painel',
    body: 'Assim como na Brutale, há relatos de falha intermitente do sensor de marcha na F3 800, afetando tanto a exibição no painel digital quanto o funcionamento do quickshifter EAS. Verifique conectores do chicote elétrico próximos ao câmbio (ponto comum de oxidação/folga por vibração) antes de trocar o sensor. Peça de reposição: R$ 400–800 importada.',
  },
  {
    severity: 'WARN',
    title: 'Custo e disponibilidade de assistência técnica: planeje com antecedência no Brasil',
    body: 'A rede de concessionárias MV Agusta autorizadas no Brasil é pequena e historicamente concentrada nas capitais maiores. Peças específicas da F3 (carenagem, ECU, sensores) frequentemente precisam de importação, com prazo de semanas. Recomenda-se manter um relacionamento com mecânico especializado em motos italianas para manutenções de rotina, reservando a concessionária para diagnóstico eletrônico e itens de garantia.',
  },
]

const F3800_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma F3 800: revisões de alto custo, motor de altíssima performance exige rigor',
    body: '1.000 km — Revisão de amaciamento (óleo + inspeção geral). | 6.000–7.500 km — Revisão intermediária (óleo, filtro, corrente, freios, inspeção visual de vazamentos). | 12.000–15.000 km — Revisão maior: óleo + filtro Motul 300V, vela NGK CR9EKB, filtro de ar (inspeção/troca), checagem da folga de válvulas (crítico, sobretudo em gerações 2012–2016). | 15.000 km — Fluido de freio/embreagem (bienal, independente da km). | 20.000–25.000 km — Kit relação (corrente + pinhão + coroa). | 30.000 km — Segunda checagem de válvulas + vela nova. Uso em pista/trackday: reduza os intervalos pela metade. Custo médio de revisão maior em concessionária: R$ 1.500–3.500; orçamento anual de manutenção preventiva facilmente ultrapassa R$ 5.000–7.000 em uso regular — significativamente maior que uma supersport japonesa equivalente.',
  },
]

// ─── RIVALE 800 ──────────────────────────────────────────────────────────────
// Motor: 798cc, 3 cilindros em linha, DOHC 12 válvulas, refrigerado a líquido, injeção MVICS
// Potência: 125 cv @ 12.000 rpm | Torque: 84 Nm @ 8.600 rpm | Óleo: Motul 300V 5W-40 sintético, ~3,2L com filtro
// Vela: NGK CR9EIB-9/CR9EKB, gap 0,8–0,9mm | Pneu: 120/70 ZR17 (D) / 180/55 ZR17 (T)
// Corrente: 525 | Tanque: ~15,3L | Suspensão traseira: monoamortecedor Sachs (não Öhlins de série — verificar
// pacote específico da unidade, algumas versões/mercados tiveram pacotes com componentes premium)
// Basculante monobraço característico (design exclusivo da Rivale) | Produção muito limitada: poucas centenas
// de unidades no mundo (ex.: ~114 unidades importadas para os EUA), fabricada entre 2013 e 2017 aproximadamente
// Moto de colecionador, extremamente rara no Brasil — poucas ou nenhuma unidade oficial nacionalizada

const RIVALE800_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo Motul 300V 5W-40 — 3,2L com filtro; use sempre sintético de alta gama',
    body: 'O motor 798cc da Rivale compartilha a base do triplo MV Agusta — exige óleo 100% sintético de performance. Motul 300V 5W-40 é a recomendação oficial da marca; capacidade aproximada 3,0–3,2L com troca de filtro. Dada a raridade da Rivale, encontrar oficina que já mexeu no modelo é ainda mais difícil que com Brutale/F3 — se possível, leve a documentação técnica (manual do proprietário) para o mecânico de confiança consultar antes do serviço.',
  },
  {
    severity: 'DANGER',
    title: 'Raridade extrema: poucas centenas de unidades no mundo — peças são o maior desafio',
    body: 'A Rivale 800 teve produção muito limitada (estimativas de poucas centenas de unidades globalmente — por exemplo, apenas cerca de 114 unidades foram importadas para os EUA). No Brasil, há pouquíssimas ou nenhuma unidade nacionalizada oficialmente — a maioria das que circulam aqui provavelmente veio por importação direta/particular. Isso torna QUALQUER peça específica do modelo (carenagem, basculante monobraço exclusivo, componentes de suspensão) extremamente difícil de encontrar. Antes de comprar uma Rivale usada no Brasil, mapeie fornecedores internacionais de peças MV Agusta e considere ter peças de reposição críticas em estoque.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR9EIB-9/CR9EKB gap 0,8–0,9mm — mesma especificação da família 798cc',
    body: 'A Rivale usa vela da mesma família das irmãs Brutale/F3: NGK CR9EIB-9 (iridium) ou CR9EKB conforme geração, gap 0,8–0,9mm. Confirme a especificação exata no manual da sua unidade, já que a Rivale teve produção mais curta e pode ter variações. Troca recomendada: 15.000–30.000 km conforme tipo de vela instalada. Compre as 3 velas juntas ao trocar.',
  },
  {
    severity: 'DANGER',
    title: 'Folga de válvulas: mesmo item crítico e caro da família 798cc, ainda mais raro achar quem faça',
    body: 'A checagem da folga de válvulas (shim-under-bucket) é obrigatória a cada 12.000–15.000 km, assim como na Brutale e F3. Na Rivale, o desafio adicional é encontrar oficina com experiência específica no modelo — muitas oficinas especializadas em MV Agusta nunca viram uma Rivale por sua raridade. O procedimento técnico é o mesmo do motor triple 798cc, então qualquer especialista MV Agusta competente consegue realizar. Custo: R$ 1.800–3.500, podendo ser mais alto se peças precisarem de importação expressa.',
  },
  {
    severity: 'WARN',
    title: 'Basculante monobraço exclusivo: peça de reposição rara — cuidado redobrado em manobras',
    body: 'O basculante monobraço é uma marca registrada estética da Rivale, mas é uma peça exclusiva do modelo — não compartilhada com Brutale ou F3. Em caso de dano (queda, batida), a reposição é cara e demorada, com necessidade de importação direta da Itália. Redobre o cuidado em manobras de baixa velocidade e ao estacionar/apoiar a moto — um tombamento simples pode gerar uma conta de reparo desproporcional pela raridade da peça.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão: verifique a especificação exata da sua unidade antes de comprar peças',
    body: 'A Rivale 800 usa monoamortecedor traseiro Sachs de série (não Öhlins, ao contrário do que alguma publicidade e ficha técnica genérica sugerem) — mas pacotes de suspensão podem variar por mercado/versão. Antes de comprar peças de suspensão (molas, kit de vedação), confirme com o número de chassi e a documentação a especificação exata instalada na sua unidade, para não comprar peça incompatível.',
  },
  {
    severity: 'OK',
    title: 'Pneus Pirelli Diablo Rosso Corsa 120/70 ZR17 (D) / 180/55 ZR17 (T) — mesma medida da Brutale',
    body: 'A Rivale compartilha medida de pneu com a Brutale 800: 120/70 ZR17 dianteiro e 180/55 ZR17 traseiro. Isso é uma boa notícia para manutenção — pneus de qualidade (Pirelli Diablo Rosso Corsa, Michelin Power GP, Metzeler Sportec) são facilmente encontrados no Brasil em qualquer loja especializada, ao contrário de outras peças do modelo. Não economize no pneu — moto rara merece manutenção de segurança à altura.',
  },
  {
    severity: 'WARN',
    title: 'Compre peças de consumo com folga — planeje estoque preventivo para itens críticos',
    body: 'Dada a raridade e a incerteza sobre continuidade de suporte para a Rivale no Brasil, é prudente manter estoque preventivo de itens de consumo essenciais: filtro de óleo compatível (HifloFiltro HF563 ou equivalente da família 798cc), um jogo extra de velas, pastilhas de freio (EBC FA379HH ou Brembo original), e fusíveis do sistema elétrico. Isso evita ficar imobilizado esperando importação em caso de necessidade urgente.',
  },
]

const RIVALE800_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Falhas eletrônicas MVICS documentadas na plataforma 798cc — mesmo risco da Brutale/F3',
    body: 'A Rivale compartilha a plataforma eletrônica MVICS da geração 2013–2015 da família 798cc, com histórico documentado de falhas de sensores (TPS, marcha, inclinação) que geram cortes de potência ou modo de segurança. Como a Rivale teve produção mais curta, é ainda mais importante confirmar se todas as atualizações de firmware disponíveis foram aplicadas na sua unidade — procure a concessionária MV Agusta ou consulte o histórico via VIN.',
  },
  {
    severity: 'DANGER',
    title: 'Vazamento pela bomba d\'água em alta km — mesmo problema estrutural da família 798cc',
    body: 'O mesmo problema documentado em Brutale e F3 se aplica à Rivale, já que compartilham o bloco do motor: vazamento pelo retentor da bomba d\'água após 25.000–40.000 km. Fique atento a manchas de líquido de arrefecimento sob o motor. Reparo requer desmontagem parcial — R$ 1.500–3.000+ em oficina especializada, com possível acréscimo pela dificuldade de achar quem atenda o modelo.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem antihopping: mesmo comportamento e cuidados da Brutale 800',
    body: 'A embreagem antihopping da Rivale segue o mesmo padrão de desgaste da Brutale — fique atento a patinação em giros altos ou folga alterada na alavanca, sinais de disco gasto. Kit de reposição: R$ 1.200–2.500 (peça + mão de obra), sujeito a prazo de importação maior pela raridade do modelo.',
  },
  {
    severity: 'WARN',
    title: 'Peças elétricas envelhecidas: conectores e chicote merecem inspeção preventiva',
    body: 'Unidades de Rivale hoje já têm 8+ anos de fabricação (produção encerrada por volta de 2017). Como em qualquer moto dessa idade, conectores elétricos podem oxidar e o chicote pode apresentar ressecamento em pontos de dobra. Faça inspeção preventiva anual dos principais conectores (bateria, retificador, sensores do motor) com contato dielétrico, especialmente se a moto ficar muito tempo parada ou guardada em ambiente úmido.',
  },
  {
    severity: 'WARN',
    title: 'Bateria e sistema de carga: essencial monitorar em moto de baixo uso/colecionador',
    body: 'Pela raridade e perfil de "moto de colecionador", muitas Rivales rodam pouco e ficam paradas por longos períodos — o que é justamente o cenário mais desgastante para a bateria e para vedações de borracha (freio, embreagem, combustível) que ressecam sem uso. Use mantenedor de carga sempre que parada por mais de 2 semanas, e rode a moto periodicamente (mesmo que pouco) para manter fluidos e vedações em bom estado.',
  },
  {
    severity: 'DANGER',
    title: 'Suporte técnico praticamente inexistente no Brasil: avalie antes de comprar',
    body: 'Diferente da Brutale e F3, que têm alguma presença ainda ativa nas concessionárias MV Agusta do Brasil, a Rivale é modelo descontinuado desde ~2017 e extremamente raro no mercado nacional. Antes de comprar, avalie seriamente a disponibilidade de suporte: identifique oficinas especializadas em motos italianas/MV Agusta na sua região, tenha contato com importadores de peças internacionais, e considere que reparos podem levar semanas ou meses de espera por peça. É uma moto para entusiasta preparado para esse compromisso, não para uso diário sem rede de apoio.',
  },
]

const RIVALE800_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Rivale 800: mesma rigidez da família 798cc, agravada pela raridade de peças e suporte',
    body: '1.000 km — Revisão de amaciamento. | 6.000–7.500 km — Revisão intermediária (óleo, filtro, corrente, freios). | 12.000–15.000 km — Revisão maior: óleo + filtro Motul 300V (~3,2L), vela, filtro de ar, checagem da folga de válvulas (crítico). | 15.000 km — Fluido de freio/embreagem (bienal, independente da km). | 20.000–25.000 km — Kit relação 525. | 30.000 km — Segunda checagem de válvulas + vela nova. Para moto de baixo uso/guardada: revisão anual mínima mesmo sem atingir a km, focada em fluidos, bateria e vedações. Custo médio de revisão maior: R$ 1.800–4.000, com possível acréscimo por frete de peças importadas e dificuldade de encontrar oficina experiente no modelo — orçe manutenção anual de R$ 5.000+ para manter a moto em condição ideal.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'BRUTALE 800',
    yearFrom: 2013,
    yearTo: null,
    MACETES: BRUTALE800_MACETES,
    PROBLEMAS: BRUTALE800_PROBLEMAS,
    MANUTENCAO: BRUTALE800_MANUTENCAO,
  },
  {
    modelName: 'F3 800',
    yearFrom: 2012,
    yearTo: null,
    MACETES: F3800_MACETES,
    PROBLEMAS: F3800_PROBLEMAS,
    MANUTENCAO: F3800_MANUTENCAO,
  },
  {
    modelName: 'RIVALE 800',
    yearFrom: 2013,
    yearTo: 2017,
    MACETES: RIVALE800_MACETES,
    PROBLEMAS: RIVALE800_PROBLEMAS,
    MANUTENCAO: RIVALE800_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'BRUTALE 800',
    yearFrom: 2013, yearTo: null,
    tireSize: '120/70 ZR17 (D) · 180/55 ZR17 (T)',
    frontPsi: 33, rearPsi: 36,
    frontPsiLoad: 33, rearPsiLoad: 40,
    notes: 'Solo: F 33 / R 36 PSI (2,3 bar conforme manual oficial MV Agusta). Com carona/bagagem: F 33 / R 40 PSI. Pneu de fábrica: Pirelli Diablo Rosso Corsa. Verifique a pressão a cada 10 dias — motor de alta performance é sensível a pressão incorreta na dirigibilidade.',
  },
  {
    modelName: 'F3 800',
    yearFrom: 2012, yearTo: null,
    tireSize: '120/70 ZR17 (D) · 180/55 ZR17 (T)',
    frontPsi: 33, rearPsi: 36,
    frontPsiLoad: 33, rearPsiLoad: 40,
    notes: 'Solo: F 33 / R 36 PSI (2,3 bar). Com carona/bagagem: F 33 / R 40 PSI. Pneu de fábrica: Pirelli Diablo Rosso Corsa (uso misto) ou Supercorsa (foco pista). Para uso em track-day, muitos pilotos reduzem levemente a pressão (consulte um técnico de pneus no dia).',
  },
  {
    modelName: 'RIVALE 800',
    yearFrom: 2013, yearTo: 2017,
    tireSize: '120/70 ZR17 (D) · 180/55 ZR17 (T)',
    frontPsi: 33, rearPsi: 36,
    frontPsiLoad: 33, rearPsiLoad: 40,
    notes: 'Solo: F 33 / R 36 PSI (2,3 bar). Com carona: F 33 / R 40 PSI. Mesma medida de pneu da Brutale 800 — vantagem para reposição, já que pneus dessa medida são fáceis de achar no Brasil mesmo sendo a moto rara.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // BRUTALE 800
  { modelName: 'BRUTALE 800', yearFrom: 2013, yearTo: null, component: 'Óleo Motul 300V 5W-40 sintético (~3,2L com filtro)', intervalKm: 15000, intervalMonths: 12, notes: 'Motor 798cc alta rotação. Nunca usar mineral ou semissintético. Litro: R$ 90–140.', priority: 'HIGH', order: 1 },
  { modelName: 'BRUTALE 800', yearFrom: 2013, yearTo: null, component: 'Filtro de óleo original', intervalKm: 15000, intervalMonths: 12, notes: 'Trocar sempre junto com o óleo. Compatível HifloFiltro HF204RC/HF563 (confirmar medida).', priority: 'HIGH', order: 2 },
  { modelName: 'BRUTALE 800', yearFrom: 2013, yearTo: null, component: 'Vela NGK CR9EIB-9 ×3 (gap 0,8–0,9mm)', intervalKm: 30000, intervalMonths: null, notes: 'Iridium. Trocar as 3 juntas. R$ 60–100 cada.', priority: 'MEDIUM', order: 3 },
  { modelName: 'BRUTALE 800', yearFrom: 2013, yearTo: null, component: 'Folga de válvulas (shim-under-bucket, 12 válvulas)', intervalKm: 12000, intervalMonths: 12, notes: 'CRÍTICO. Só oficina especializada MV Agusta. Custo R$ 1.500–3.500.', priority: 'CRITICAL', order: 4 },
  { modelName: 'BRUTALE 800', yearFrom: 2013, yearTo: null, component: 'Lubrificação corrente 525', intervalKm: 500, intervalMonths: null, notes: 'Spray de corrente de qualidade (Motul C2 ou similar).', priority: 'HIGH', order: 5 },
  { modelName: 'BRUTALE 800', yearFrom: 2013, yearTo: null, component: 'Kit relação 525 (corrente + pinhão + coroa)', intervalKm: 22000, intervalMonths: null, notes: 'Kit importado (Superlite/DID/RK). R$ 900–1.800.', priority: 'HIGH', order: 6 },
  { modelName: 'BRUTALE 800', yearFrom: 2013, yearTo: null, component: 'Filtro de ar', intervalKm: 15000, intervalMonths: 12, notes: 'Inspeção a 10.000 km. Peça original, sem genérico confiável.', priority: 'MEDIUM', order: 7 },
  { modelName: 'BRUTALE 800', yearFrom: 2013, yearTo: null, component: 'Kit embreagem antihopping — inspeção de discos', intervalKm: 20000, intervalMonths: null, notes: 'Verificar patinação/folga. Kit: R$ 1.200–2.500.', priority: 'MEDIUM', order: 8 },
  { modelName: 'BRUTALE 800', yearFrom: 2013, yearTo: null, component: 'Pastilhas de freio dianteiro (EBC FA379HH ou Brembo original)', intervalKm: 15000, intervalMonths: null, notes: 'Pinças Brembo radiais. Priorize original ou sinterizada de qualidade.', priority: 'HIGH', order: 9 },
  { modelName: 'BRUTALE 800', yearFrom: 2013, yearTo: null, component: 'Fluido de freio e embreagem DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório independente da km.', priority: 'HIGH', order: 10 },

  // F3 800
  { modelName: 'F3 800', yearFrom: 2012, yearTo: null, component: 'Óleo Motul 300V 5W-40 sintético (~3,0–3,5L)', intervalKm: 15000, intervalMonths: 12, notes: 'Motor de altíssima rotação (redline >13.500 rpm). Confirmar capacidade exata no manual da versão.', priority: 'HIGH', order: 1 },
  { modelName: 'F3 800', yearFrom: 2012, yearTo: null, component: 'Filtro de óleo original', intervalKm: 15000, intervalMonths: 12, notes: 'Compatível HifloFiltro HF563 (confirmar medida por ano).', priority: 'HIGH', order: 2 },
  { modelName: 'F3 800', yearFrom: 2012, yearTo: null, component: 'Vela NGK CR9EKB ×3 (gap 0,7–0,8mm)', intervalKm: 15000, intervalMonths: null, notes: 'Acesso trabalhoso pela carenagem completa. Trocar as 3 juntas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'F3 800', yearFrom: 2012, yearTo: null, component: 'Folga de válvulas (shim-under-bucket, 12 válvulas)', intervalKm: 12000, intervalMonths: 12, notes: 'CRÍTICO. Reduzir intervalo pela metade em uso de pista/trackday.', priority: 'CRITICAL', order: 4 },
  { modelName: 'F3 800', yearFrom: 2012, yearTo: null, component: 'Lubrificação corrente 520/525 (conforme especificação da unidade)', intervalKm: 500, intervalMonths: null, notes: 'Após pista: lubrificar a cada sessão.', priority: 'HIGH', order: 5 },
  { modelName: 'F3 800', yearFrom: 2012, yearTo: null, component: 'Kit relação (corrente + pinhão + coroa)', intervalKm: 22000, intervalMonths: null, notes: 'Confirmar pitch (520 ou 525) antes de comprar. Kit importado R$ 900–1.800.', priority: 'HIGH', order: 6 },
  { modelName: 'F3 800', yearFrom: 2012, yearTo: null, component: 'Filtro de ar', intervalKm: 15000, intervalMonths: 12, notes: 'Peça original.', priority: 'MEDIUM', order: 7 },
  { modelName: 'F3 800', yearFrom: 2012, yearTo: null, component: 'Kit embreagem antihopping — inspeção de discos', intervalKm: 15000, intervalMonths: null, notes: 'Reduzir intervalo em uso de trackday. Kit: R$ 1.200–2.500.', priority: 'MEDIUM', order: 8 },
  { modelName: 'F3 800', yearFrom: 2012, yearTo: null, component: 'Pastilhas de freio dianteiro (EBC FA379HH ou Brembo original)', intervalKm: 12000, intervalMonths: null, notes: 'Uso esportivo desgasta mais rápido — inspecionar visualmente a cada lavagem.', priority: 'HIGH', order: 9 },
  { modelName: 'F3 800', yearFrom: 2012, yearTo: null, component: 'Fluido de freio e embreagem DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Bienal. Sistema de freio Brembo radial exige fluido de qualidade.', priority: 'HIGH', order: 10 },

  // RIVALE 800
  { modelName: 'RIVALE 800', yearFrom: 2013, yearTo: 2017, component: 'Óleo Motul 300V 5W-40 sintético (~3,2L com filtro)', intervalKm: 15000, intervalMonths: 12, notes: 'Levar manual do proprietário à oficina — modelo raro, poucos mecânicos já mexeram nele.', priority: 'HIGH', order: 1 },
  { modelName: 'RIVALE 800', yearFrom: 2013, yearTo: 2017, component: 'Filtro de óleo original', intervalKm: 15000, intervalMonths: 12, notes: 'Compatível HifloFiltro HF563 (confirmar). Manter unidade extra em estoque.', priority: 'HIGH', order: 2 },
  { modelName: 'RIVALE 800', yearFrom: 2013, yearTo: 2017, component: 'Vela NGK CR9EIB-9/CR9EKB ×3 (gap 0,8–0,9mm)', intervalKm: 20000, intervalMonths: null, notes: 'Confirmar especificação exata no manual — produção teve variações.', priority: 'MEDIUM', order: 3 },
  { modelName: 'RIVALE 800', yearFrom: 2013, yearTo: 2017, component: 'Folga de válvulas (shim-under-bucket, 12 válvulas)', intervalKm: 12000, intervalMonths: 12, notes: 'CRÍTICO. Buscar especialista MV Agusta com experiência no motor 798cc (mesmo se nunca viu uma Rivale).', priority: 'CRITICAL', order: 4 },
  { modelName: 'RIVALE 800', yearFrom: 2013, yearTo: 2017, component: 'Lubrificação corrente 525', intervalKm: 500, intervalMonths: null, notes: 'Manutenção preventiva rigorosa — peça de reposição rara e cara.', priority: 'HIGH', order: 5 },
  { modelName: 'RIVALE 800', yearFrom: 2013, yearTo: 2017, component: 'Kit relação 525 (corrente + pinhão + coroa)', intervalKm: 22000, intervalMonths: null, notes: 'Kit importado — planeje prazo de semanas para entrega.', priority: 'HIGH', order: 6 },
  { modelName: 'RIVALE 800', yearFrom: 2013, yearTo: 2017, component: 'Inspeção de vedações e mangueiras (moto de baixo uso)', intervalKm: null, intervalMonths: 12, notes: 'Motos de colecionador ressecam vedações sem uso regular. Verificar anualmente mesmo com pouca km rodada.', priority: 'MEDIUM', order: 7 },
  { modelName: 'RIVALE 800', yearFrom: 2013, yearTo: 2017, component: 'Bateria — manutenção com carregador tipo Optimate', intervalKm: null, intervalMonths: 1, notes: 'Uso esporádico é comum neste modelo. Conectar mantenedor de carga sempre que parada por 2+ semanas.', priority: 'MEDIUM', order: 8 },
  { modelName: 'RIVALE 800', yearFrom: 2013, yearTo: 2017, component: 'Pastilhas de freio dianteiro (EBC FA379HH ou Brembo original)', intervalKm: 15000, intervalMonths: null, notes: 'Priorizar original ou sinterizada de qualidade dada a raridade da moto.', priority: 'HIGH', order: 9 },
  { modelName: 'RIVALE 800', yearFrom: 2013, yearTo: 2017, component: 'Fluido de freio e embreagem DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 10 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed MV Agusta Triple (Brutale 800 / F3 800 / Rivale 800)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'MV AGUSTA', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'MV AGUSTA', vehicleTypeId: motoType.id },
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

  console.log('✅ MV Agusta Triple concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
