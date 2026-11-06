// seed-yamaha-2t-classic.ts — Yamaha 2 tempos clássicas/históricas até 250cc
// Linha DT (180-Z Trail, 200/200R), RD 135, RDZ (125/135), TDR 180, WR 200
// Todas descontinuadas há décadas no Brasil (produção encerrada entre o fim dos anos 90 e ~2000,
// quando normas de emissão inviabilizaram o 2 tempos urbano). Yamaha não fabrica mais peças originais
// para praticamente nenhum destes modelos — mercado depende de desmanches, peças genéricas/compatíveis
// entre os próprios modelos da família (DT/RD/RDZ compartilham muita coisa) e importados.
// Execute: pnpm --filter @motormacete/database db:seed:yamaha-2t-classic
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

// ─── DT 180-Z TRAIL ───────────────────────────────────────────────────────────
// Motor: monocilíndrico 2T refrigerado a ar, 176,4cc (64,5mm × 54mm aprox.) | ~16,7 cv @ 7.000 rpm
// Torque ~1,74 kgf.m @ 6.500 rpm | Carburador Mikuni (pré-mistura via bomba de óleo Autolube/injeção mecânica)
// Vela NGK B7ES/B8ES | Pneu: 3.00-21 (F) / 4.10-18 (R) aprox. | Tanque 9L | Produção ~1984-1993 (geração anterior à DT200)

const DT180_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Sistema Autolube (bomba de óleo): confirme se está funcionando antes de confiar nela',
    body: 'A DT 180-Z Trail tem sistema de lubrificação automática Autolube — uma bombinha mecânica que injeta óleo 2T proporcional à rotação, dispensando pré-mistura manual no tanque. Em moto com 30+ anos, essa bomba pode ter a mangueira ressecada ou o cabo de acionamento desregulado. Teste: desconecte a mangueira de saída da bomba (motor desligado, acelerador todo aberto) e veja se sai óleo ao dar partida — sem fluxo visível, a bomba não está lubrificando e o motor pode fundir em minutos. Se tiver dúvida sobre o estado da bomba, faça pré-mistura manual 25:1 a 30:1 direto no tanque como segurança extra, mesmo com Autolube instalado.',
  },
  {
    severity: 'OK',
    title: 'Óleo 2T: Yamalube 2T ou Motul 800 direto no reservatório Autolube',
    body: 'O reservatório de óleo do Autolube fica sob o banco ou lateral do tanque (varia conforme o ano) — use óleo 2T de qualidade (Yamalube 2T, Motul 800 2T ou similar semissintético/sintético). Óleo mineral genérico de posto aumenta o acúmulo de carbono no escapamento e na cabeça do pistão. Fique de olho no nível — reservatório vazio com Autolube funcionando normalmente ainda risca o motor rapidamente.',
  },
  {
    severity: 'WARN',
    title: 'Carburador Mikuni: limpeza de giclês é obrigatória após anos parada',
    body: 'É comum encontrar DT 180-Z Trail que ficaram anos guardadas. O primeiro passo antes de dar partida é desmontar o carburador Mikuni e limpar todos os giclês e a cuba — gasolina velha forma verniz que entope os furos calibrados. Use spray de limpeza de carburador e ar comprimido, nunca arame. Troque também a mangueira de combustível (borracha ressecada racha e vaza) e o filtro de tela do tanque se houver.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK B7ES ou B8ES — leia a cor para calibrar mistura',
    body: 'Vela de referência para a DT 180: NGK B7ES (equivalente Champion N3C) em uso normal; B8ES (mais fria) para uso mais puxado ou clima quente. Gap: 0,6-0,7mm. A cor da vela após uma volta é o melhor indicador de mistura: marrom-clara é ideal, preta e fuliginosa indica mistura rica ou óleo em excesso, branca/cinza clara indica mistura pobre — risco de fundir o motor.',
  },
  {
    severity: 'WARN',
    title: 'Peças alternativas: compatibilidade com a família DT/RD/RDZ ajuda muito',
    body: 'A Yamaha não vende mais peças originais para a DT 180-Z Trail. Muitos componentes do motor 2T (retentores, rolamentos de virabrequim, kit de reparo de carburador Mikuni) têm medida compatível com outros modelos 2T Yamaha da mesma época (DT 200, RD 135, RDZ) — pergunte sempre em lojas especializadas em motos 2T antigas citando a medida exata, não só o modelo. Desmanches de moto (Mercado Livre, grupos de Facebook "Yamaha 2 tempos clássicas Brasil") são a fonte mais confiável para peças de acabamento, plástico e elétrica.',
  },
  {
    severity: 'OK',
    title: 'Corrente e relação — mantenha lubrificada mesmo em uso esporádico',
    body: 'Kit de relação genérico (corrente 428 ou 520 conforme o ano/versão, pinhão e coroa) para a DT 180 é encontrado em lojas de peças para motos antigas por medida, não por marca. Lubrifique a cada 500 km ou mensalmente se a moto rodar pouco — corrente parada por longos períodos enferruja e trava elos, mesmo sem uso.',
  },
  {
    severity: 'WARN',
    title: 'Filtro de ar de espuma — sem ele, o motor gasta anéis e pistão rapidamente',
    body: 'Muitas DT 180 usadas aparecem com a espuma do filtro de ar rasgada, ressecada ou até ausente. Isso é gravíssimo em motor 2T: qualquer poeira que entra pela admissão risca o cilindro em poucas horas de trilha. Substitua por espuma genérica de filtro de ar (cortada sob medida em lojas de peças motocross) e aplique óleo específico para filtro (nunca óleo de motor comum, que resseca a espuma).',
  },
]

const DT180_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Bomba Autolube falhando sem aviso: motor pode fundir sem sintoma prévio claro',
    body: 'Se o cabo ou mangueira da bomba Autolube estiver desregulado/ressecado sem o dono perceber, o motor roda sem lubrificação adequada — e o primeiro sintoma costuma ser o motor fundindo (travando) de repente, sem aviso gradual. Prevenção: teste periódico do fluxo da bomba (ver macete acima) e, na dúvida, complemente sempre com pré-mistura manual 30:1 no tanque como segurança redundante.',
  },
  {
    severity: 'WARN',
    title: 'Fiação e chicote ressecados por idade — problema garantido em moto de 30+ anos',
    body: 'O chicote elétrico original da DT 180 tem isolamento de borracha/PVC que resseca e racha com décadas de uso, causando curtos intermitentes, luzes que piscam sem motivo e dificuldade de partida elétrica (se equipada). Inspecione visualmente todo o chicote acessível — trechos ressecados devem ser substituídos por fio automotivo comum de mesma bitola (não precisa ser chicote original). Conectores oxidados: limpar com spray de contato e aplicar graxa dielétrica.',
  },
  {
    severity: 'WARN',
    title: 'Entupimento por gasolina com etanol parada no tanque/carburador',
    body: 'Etanol brasileiro forma verniz e goma quando fica parado por meses no sistema de combustível — problema agravado em motos que ficam guardadas. Sintoma: carburador entupido, boia grudada, dificuldade extrema de dar partida. Solução preventiva: se a moto for rodar pouco, esvazie o carburador (parafuso de dreno da cuba) antes de guardar por longos períodos. Se já entupiu, limpeza completa do carburador é obrigatória — não adianta só trocar a gasolina.',
  },
  {
    severity: 'WARN',
    title: 'Escapamento entupido de carbono: perda de potência progressiva',
    body: 'Motor 2T antigo acumula carbono no tubo de escape e no silencioso com o tempo, especialmente se rodado com mistura rica ou óleo de baixa qualidade nas décadas de uso. Sintoma: perda de potência gradual, mais perceptível em alta rotação, motor "sufocado". Desmonte o escapamento e raspe o carbono internamente — produtos decarbonizantes ajudam a amolecer os depósitos antes da raspagem manual.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo por retentores de virabrequim ressecados',
    body: 'Retentores de borracha do virabrequim endurecem e perdem vedação após décadas, mesmo sem muito uso. Sintoma: vazamento de óleo pelo cárter, ar entrando pelo retentor e empobrecendo a mistura (motor "engasga" em marcha lenta mesmo com carburador bem regulado). Troca de retentores é serviço de oficina especializada em 2T — peça genérica por medida, sem código Yamaha específico.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste de pistão e anéis em moto com muitas horas/km desconhecidos',
    body: 'Motos com esta idade frequentemente têm histórico de manutenção desconhecido. Sinais de desgaste avançado do conjunto pistão/anéis: fumaça branca-azulada excessiva mesmo com mistura correta, perda de compressão perceptível ao dar partida no pedal (compressão "fraca"), consumo de óleo alto. Teste de compressão com manômetro é o diagnóstico mais confiável antes de comprar ou depois de anos de uso — compressão abaixo de 6-7 kgf/cm² geralmente indica necessidade de reforma do cilindro.',
  },
]

const DT180_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma DT 180-Z Trail: moto de coleção precisa de atenção mesmo parada',
    body: 'A cada uso — verificar nível do reservatório de óleo Autolube. 500 km ou mensal — lubrificar corrente. 2.000 km — verificar/limpar vela, testar fluxo da bomba Autolube. 3.000 km — limpar filtro de ar de espuma (reoleificar). 5.000 km — limpar carburador Mikuni por completo. 8.000 km — trocar vela. 10.000 km — decarbonizar escapamento, inspecionar retentores de virabrequim. Anualmente (mesmo com pouco uso) — drenar e renovar gasolina/óleo do reservatório se a moto ficar parada, inspecionar mangueiras e chicote elétrico quanto a ressecamento. A cada 2-3 anos ou 15.000-20.000 km — considerar teste de compressão e avaliação de pistão/anéis, já que o histórico de uso da maioria das unidades hoje é incerto.',
  },
]

// ─── DT 200 (+ DT 200 R) ──────────────────────────────────────────────────────
// Motor: monocilíndrico 2T refrigerado a líquido, 195cc (66mm × 57mm) | 25 cv @ 8.500 rpm
// Torque 2,1 kgf.m @ 8.000 rpm | Carburador (Mikuni/Teikei conforme ano) | Câmbio 6 marchas
// Vela NGK BR8ES aprox. | Tanque 9,5L | Lançada em 1991 para substituir a DT 180
// Versão "DT 200 R": mesma base mecânica, visual mais esportivo/atualizado e pequenos ajustes de suspensão/freio

const DT200_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Pré-mistura 20:1 a 25:1 (confirme no manual do seu ano) — DT 200 exige mais óleo que a 180',
    body: 'A DT 200 (motor 195cc refrigerado a líquido) tem histórico de recomendação de mistura mais rica que motores menores da época — proporções entre 20:1 e 25:1 aparecem em manuais e fóruns, variando por ano e versão (200 vs. 200 R). NA DÚVIDA, prefira a proporção mais rica (mais óleo) da faixa: excesso de óleo suja vela, mas falta de óleo funde motor. Use óleo sintético 2T de qualidade (Yamalube 2T, Motul 800 2T Factory Line) — nunca óleo mineral genérico em motor de moto de trilha exigente como este.',
  },
  {
    severity: 'OK',
    title: 'Refrigeração líquida: verifique o radiador antes de qualquer uso mais puxado',
    body: 'Diferente da DT 180 (a ar), a DT 200 é refrigerada a líquido — um diferencial técnico importante da época. Em moto com décadas de uso, verifique vazamentos nas mangueiras (borracha ressecada é comum), nível do líquido de arrefecimento e estado do radiador (aletas entupidas de sujeira/ferrugem). Líquido recomendado: mistura 50/50 com água destilada, trocar mesmo em moto pouco usada — o líquido perde propriedades anticorrosivas com o tempo parado.',
  },
  {
    severity: 'WARN',
    title: 'Jetting do carburador: ajuste fino compensa a idade do motor e altitude',
    body: 'Motor de 33+ anos de fabricação frequentemente tem desgaste que altera a resposta do carburador original. Se notar engasgo em aceleração progressiva ou fumaça excessiva, um mecânico especializado em 2T pode reavaliar o jetting (giclê principal, agulha, giclê piloto) — em altitudes elevadas, reduza levemente o giclê principal. Leve a vela usada para o mecânico avaliar a cor — é o melhor indicador prático de mistura em motor sem instrumentação eletrônica.',
  },
  {
    severity: 'OK',
    title: 'Vela: leia a cor a cada verificação, gap 0,6-0,7mm',
    body: 'Vela recomendada historicamente para a DT 200: faixa NGK B8ES/BR8ES (confirme com o gap do manual do seu ano — a numeração pode variar entre DT 200 e DT 200 R). Gap: 0,6-0,7mm. Leve sempre uma sobressalente — motor 2T de trilha suja vela rápido, principalmente em uso urbano de baixa rotação constante, para o qual esta moto não foi otimizada.',
  },
  {
    severity: 'WARN',
    title: 'Peças alternativas: pistão e anéis genéricos ou de desmanche — Yamaha não fabrica mais',
    body: 'A Yamaha descontinuou peças originais de motor para a DT 200 há muito tempo. Pistão, anéis e kit de reparo de carburador são encontrados como peça genérica por medida (bore 66mm) em lojas especializadas em motos 2T antigas ou por importação — busque em fóruns como "Yamaha DT 200 clássicos Brasil" no Facebook para indicações de fornecedores atualizados. Desmanches e Mercado Livre são as fontes mais comuns para peças elétricas e de acabamento originais.',
  },
  {
    severity: 'OK',
    title: 'Versão "DT 200 R": mesmo motor, mesma manutenção — diferenças são de visual e detalhes',
    body: 'A "DT 200 R" manteve a base mecânica da DT 200 (motor 195cc, câmbio 6 marchas), com atualizações de visual, plástico e pequenos ajustes de suspensão/freio conforme o ano. Para efeitos de mistura, jetting, vela e manutenção geral, trate as duas como o mesmo motor — as diferenças relevantes de manutenção são mínimas entre as versões.',
  },
  {
    severity: 'OK',
    title: 'Corrente e relação — kit genérico compatível é fácil de achar',
    body: 'Corrente 520 (verificar medida exata no seu ano) com kit de relação genérico (pinhão + coroa) para a DT 200 é vendido normalmente em lojas de peças para trilha, sem necessidade de peça com código Yamaha. Lubrifique a cada 500 km de uso em trilha (mais frequente que uso urbano) — a exposição a poeira e lama de trilha desgasta a corrente muito mais rápido.',
  },
]

const DT200_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Superaquecimento por vazamento no sistema de arrefecimento não percebido',
    body: 'Em moto de décadas de uso, mangueiras ressecadas ou junta do cabeçote comprometida podem causar perda gradual de líquido de arrefecimento sem vazamento óbvio no chão. Sintoma: temperatura sobe mais rápido que o normal, motor perde potência em uso prolongado. Verifique o nível do líquido antes de cada saída mais longa — motor 2T superaquecido pode fundir pistão rapidamente, sem o aviso gradual que um 4 tempos costuma dar.',
  },
  {
    severity: 'WARN',
    title: 'Entupimento de carburador por gasolina/etanol degradado em moto parada',
    body: 'Problema típico de moto de coleção ou uso esporádico: gasolina com etanol forma verniz nos giclês do carburador quando parada por meses. Sintoma: dificuldade extrema de partida, marcha lenta que não estabiliza. Limpeza completa do carburador resolve — ao guardar a moto por longos períodos, esvazie a cuba do carburador como prevenção.',
  },
  {
    severity: 'WARN',
    title: 'Elétrica antiga: chicote ressecado causa falhas intermitentes de ignição',
    body: 'Décadas de calor do motor e exposição ao tempo ressecam o isolamento do chicote elétrico original. Sintoma: falha intermitente de ignição, luzes e sinalização instáveis. Inspecione e substitua trechos ressecados por fio automotivo comum — não é necessário chicote original para esse reparo, apenas respeitar a bitola e as cores para não confundir os circuitos.',
  },
  {
    severity: 'WARN',
    title: 'Escapamento entupido de carbono após anos de uso ou mistura rica',
    body: 'Acúmulo de carbono no tubo de escape e no silencioso é praticamente garantido em motor 2T com muitos anos de uso, principalmente se rodado com excesso de óleo na mistura para "segurança". Sintoma: perda de potência progressiva, mais notável em alta rotação. Decarbonize o escapamento periodicamente — desmontagem e raspagem manual, com auxílio de produto decarbonizante para amolecer os depósitos mais antigos.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo do motor pelos retentores de virabrequim',
    body: 'Retentores endurecem e perdem vedação com o tempo, mesmo em moto pouco rodada. Sintoma: vazamento de óleo visível no cárter, entrada de ar falso que empobrece a mistura e causa marcha lenta instável mesmo com carburador bem regulado. Troca é serviço de oficina especializada em motor 2T — peça genérica por medida.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste de pistão/cilindro em unidade com histórico de manutenção desconhecido',
    body: 'Muitas DT 200 e DT 200 R hoje em circulação têm dono desconhecido no passado e histórico de óleo/mistura incerto. Teste de compressão é o diagnóstico mais confiável antes de rodar com confiança — compressão baixa (abaixo de 6-7 kgf/cm²) indica desgaste que pede reforma do cilindro (usinagem + pistão de reparo oversize, geralmente disponível para este motor por ser cilindrada popular na época).',
  },
]

const DT200_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma DT 200 / DT 200 R: motor a líquido de trilha exige atenção extra ao arrefecimento',
    body: 'A cada uso em trilha — verificar nível do líquido de arrefecimento e limpar filtro de ar. 500 km — lubrificar corrente. 2.000-3.000 km — verificar vela (cor), limpar filtro de ar. 5.000 km — limpar carburador por completo, verificar mangueiras do radiador. 8.000 km — trocar vela, verificar folga de corrente e desgaste do kit relação. 10.000 km — decarbonizar escapamento. Anualmente — trocar líquido de arrefecimento, inspecionar retentores de virabrequim e chicote elétrico quanto a ressecamento. A cada 15.000-20.000 km ou em moto de procedência desconhecida — teste de compressão e avaliação de pistão/anéis antes de assumir que o motor está saudável.',
  },
]

// ─── RD 135 ────────────────────────────────────────────────────────────────────
// Motor: monocilíndrico 2T refrigerado a ar, ~132cc | 16 cv @ 9.000 rpm | Torque 1,74 kgf.m @ 8.500 rpm
// Lançada em 1987 (sucessora da RD 125) | Produzida até ~2000 | Freio a disco dianteiro
// Vela NGK B8ES aprox. | Tanque ~16L | Naked/street clássica muito querida por entusiastas

const RD135_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Pré-mistura 20:1 a 25:1 — RD 135 não tem Autolube na maioria das unidades',
    body: 'Diferente de alguns modelos DT com sistema Autolube, a RD 135 tipicamente exige pré-mistura manual de óleo na gasolina (confirme se a sua unidade específica tem ou não bomba de óleo automática — varia conforme o ano/mercado). Proporção usual: 20:1 a 25:1 com óleo sintético 2T de qualidade (Yamalube 2T, Motul 800). Use um recipiente calibrado (proveta ou seringa dosadora) — misturar "no olho" é a causa mais comum de motor fundido em RD 135 restauradas.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK B8ES gap 0,6-0,7mm — clássico item de bolsa de ferramentas',
    body: 'Vela de referência para a RD 135: NGK B8ES (ou similar, confirme com o gap do manual do seu ano). Motor 2T de alta rotação (9.000 rpm) suja vela rápido em uso urbano parado — leve sempre uma sobressalente. Custo baixo (R$ 15-30) e troca simples, mas é a causa mais comum de "moto que não pega" em RD 135 restaurada ou pouco usada.',
  },
  {
    severity: 'WARN',
    title: 'Carburador: limpeza completa é quase sempre necessária em moto restaurada',
    body: 'RD 135 que passou anos parada quase sempre precisa de limpeza completa do carburador antes de rodar bem — verniz de gasolina/etanol degradado entope giclês pequenos. Desmonte, limpe com spray específico e ar comprimido, verifique o estado da agulha da boia e da vedação da cuba. Kits de reparo (boia, agulha, juntas) para carburadores desta época são vendidos como peça genérica em lojas especializadas em motos clássicas 2T.',
  },
  {
    severity: 'WARN',
    title: 'Peças alternativas: compatibilidade com RDZ 125/135 é o maior trunfo para reposição',
    body: 'A RD 135 compartilha boa parte da arquitetura de motor com a família RDZ (evolução posterior). Muitos entusiastas usam peças de RDZ 125/RDZ 135 como referência de compatibilidade para retentores, rolamentos e componentes de embreagem — sempre confirme a medida exata antes de comprar, pois nem tudo é 100% intercambiável entre as gerações. Grupos de Facebook e fóruns dedicados a "Yamaha RD/RDZ clássicas Brasil" são a melhor fonte de indicação atualizada de fornecedores.',
  },
  {
    severity: 'OK',
    title: 'Freio a disco dianteiro: verifique fluido e pastilhas mesmo em moto pouco rodada',
    body: 'A RD 135 foi uma das pioneiras a trazer freio a disco dianteiro no segmento. Em moto de coleção, o fluido de freio absorve umidade mesmo parado e perde eficácia — troque o fluido DOT 3/DOT 4 mesmo que a moto tenha rodado pouco, antes de confiar no freio dianteiro. Pastilhas ressecadas por idade (não só por desgaste) também devem ser inspecionadas visualmente.',
  },
  {
    severity: 'OK',
    title: 'Corrente e relação: kit genérico por medida, sem necessidade de peça original',
    body: 'Kit de relação (corrente, pinhão, coroa) compatível com a RD 135 é vendido normalmente em lojas de peças para motos 2T antigas ou de médio porte, sem código Yamaha específico — basta informar a medida da corrente do seu ano. Lubrifique a cada 500 km de uso regular.',
  },
]

const RD135_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor fundido por mistura mal calculada — erro mais comum em restauração',
    body: 'É comum ouvir relatos de RD 135 restauradas que tiveram motor fundido logo nas primeiras rodadas por causa de pré-mistura feita "no olho" (sem proveta) ou esquecida (rodar só com gasolina pura por engano). Sintoma de aviso: ruído metálico agudo, perda súbita de potência, "engripamento" do pistão. Sempre confira a proporção com recipiente calibrado antes de qualquer rodada, principalmente logo após reforma ou restauração.',
  },
  {
    severity: 'WARN',
    title: 'Fiação ressecada por 30+ anos: falhas elétricas intermitentes são a regra, não exceção',
    body: 'O chicote elétrico original da RD 135 tem décadas de exposição a calor e tempo — isolamento ressecado e rachado é praticamente garantido. Sintoma: pisca-pisca instável, luz de freio intermitente, dificuldade de partida por mau contato. Substitua trechos ressecados por fio automotivo comum, respeitando bitola e função de cada fio original.',
  },
  {
    severity: 'WARN',
    title: 'Entupimento do carburador por combustível degradado em moto guardada',
    body: 'Gasolina com etanol parada por meses forma verniz e goma nos giclês do carburador — problema quase universal em RD 135 de coleção ou uso esporádico. Sintoma: dificuldade extrema de dar partida, marcha lenta instável. Limpeza completa do carburador resolve na maioria dos casos; ao guardar por longos períodos, esvazie a cuba como prevenção.',
  },
  {
    severity: 'WARN',
    title: 'Escapamento entupido de carbono acumulado ao longo de décadas',
    body: 'Motor 2T de uso urbano (rotação mais baixa e constante do que motos de trilha) tende a acumular mais carbono no escapamento com o tempo. Sintoma: perda de potência progressiva, fumaça mais escura que o normal mesmo com mistura correta. Decarbonize o tubo de escape e o silencioso periodicamente — problema comum e de solução relativamente simples (raspagem manual + produto decarbonizante).',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo do câmbio ou retentores de virabrequim ressecados',
    body: 'Retentores de borracha endurecem com décadas, mesmo sem muito uso. Sintoma: manchas de óleo sob o motor, ar falso entrando pelo retentor do virabrequim causando marcha lenta instável. Troca por peça genérica de mesma medida, serviço de oficina especializada em 2T antigos.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste de pistão em moto de procedência/histórico desconhecido',
    body: 'RD 135 com muitos donos ao longo de décadas frequentemente tem histórico de manutenção incerto. Teste de compressão antes de confiar na moto é essencial — compressão baixa indica desgaste de pistão/anéis que pede reforma. Kits de pistão de reparo (oversize) para este motor ainda são encontrados por ser cilindrada muito popular na época.',
  },
]

const RD135_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma RD 135: moto de coleção precisa de disciplina mesmo com pouco uso',
    body: '500 km ou mensal — lubrificar corrente. 2.000-3.000 km — verificar vela (cor da queima), limpar filtro de ar. 5.000 km — limpeza completa do carburador. 8.000 km — trocar vela, verificar folga da corrente e kit relação. 10.000 km — decarbonizar escapamento. Anualmente — trocar fluido de freio DOT 3/4, inspecionar chicote elétrico e retentores quanto a ressecamento por idade (não só por uso). Antes de rodar após período parado — teste de compressão, limpeza obrigatória do carburador e verificação de toda a fiação.',
  },
]

// ─── RDZ 125 ───────────────────────────────────────────────────────────────────
// Motor: monocilíndrico 2T refrigerado a ar, ~123cc | ~16,6 cv | Evolução esportiva da linha RD
// Produzida ~1990-1993 | Vela NGK B8ES aprox. | Freio a disco dianteiro, carenagem frontal esportiva

const RDZ125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Pré-mistura 20:1 a 25:1 — óleo sintético 2T de qualidade é obrigatório',
    body: 'A RDZ 125 (motor ~123cc, evolução esportiva da linha RD) exige pré-mistura manual na faixa de 20:1 a 25:1 — confirme a proporção exata no manual do seu ano, mas na dúvida prefira a proporção mais rica em óleo. Use Yamalube 2T, Motul 800 2T Factory Line ou equivalente sintético. Meça sempre com recipiente calibrado, nunca "no olho" — erro de mistura é a causa mais comum de motor fundido em restaurações.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK B8ES gap 0,6-0,7mm — troque cedo em uso urbano',
    body: 'Vela de referência: NGK B8ES (confirme gap no manual do ano). Motor de alta rotação em uso urbano de baixa velocidade constante suja vela rapidamente — leve sempre uma sobressalente. Custo baixo, mas causa mais comum de "não pega" em RDZ 125 restaurada.',
  },
  {
    severity: 'WARN',
    title: 'Carburador: limpeza completa quase sempre necessária em moto de coleção',
    body: 'RDZ 125 parada por anos quase sempre precisa de limpeza completa do carburador — gasolina/etanol degradado forma verniz nos giclês. Desmonte, limpe com spray específico, verifique boia e vedação da cuba. Kits de reparo genéricos (boia, agulha, juntas) são vendidos por lojas especializadas em carburadores de motos 2T antigas.',
  },
  {
    severity: 'WARN',
    title: 'Peças compartilhadas com RDZ 135 e RD 135 — pesquise por medida, não só por nome do modelo',
    body: 'A RDZ 125 compartilha boa parte do chassi e componentes de suspensão/freio com a RDZ 135 (a diferença principal é a cilindrada do motor). Retentores, rolamentos e peças de acabamento com a mesma medida geralmente servem entre os dois modelos — sempre confirme a medida exata antes de comprar. Fóruns e grupos dedicados a "Yamaha RD/RDZ clássicas" são a melhor fonte para indicação de fornecedores de peças hoje em dia.',
  },
  {
    severity: 'OK',
    title: 'Carenagem frontal e plásticos: peça mais escassa da RDZ 125 — cuide bem da que você tem',
    body: 'A carenagem esportiva frontal é um dos itens visuais mais procurados e mais raros de encontrar intactos hoje em dia, já que muitas unidades sofreram quedas ao longo de décadas. Se a sua RDZ 125 ainda tem carenagem original, evite quedas e use protetor de guidão em uso de garagem apertada. Peças de reposição hoje vêm quase exclusivamente de desmanches ou réplicas artesanais em fibra — praticamente inexistente peça nova genérica para este item específico.',
  },
  {
    severity: 'OK',
    title: 'Freio a disco dianteiro: fluido e pastilhas precisam de atenção mesmo com pouco uso',
    body: 'Fluido de freio absorve umidade com o tempo mesmo parado — troque o fluido DOT 3/4 antes de confiar no freio dianteiro em moto de coleção. Pastilhas ressecadas por idade devem ser trocadas mesmo com pouco desgaste visível de uso.',
  },
]

const RDZ125_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor fundido por mistura incorreta — risco real em restauração sem cuidado',
    body: 'Assim como toda a linha RD/RDZ, a RDZ 125 corre risco alto de motor fundido se a pré-mistura for feita sem recipiente calibrado ou esquecida. Sintomas de aviso: ruído metálico agudo, perda súbita de potência. Sempre confira a proporção com precisão antes de qualquer rodada, principalmente após reforma.',
  },
  {
    severity: 'WARN',
    title: 'Fiação ressecada por décadas — falhas elétricas intermitentes esperadas',
    body: 'Chicote elétrico original com 30+ anos de idade tem isolamento ressecado e propenso a curtos. Sintoma: sinalização instável, dificuldade de partida por mau contato. Substitua trechos comprometidos por fio automotivo comum de mesma bitola.',
  },
  {
    severity: 'WARN',
    title: 'Entupimento de carburador por combustível degradado',
    body: 'Gasolina/etanol parado por meses forma verniz nos giclês do carburador. Sintoma: partida difícil, marcha lenta instável. Limpeza completa resolve — esvazie a cuba antes de guardar a moto por longos períodos.',
  },
  {
    severity: 'WARN',
    title: 'Escapamento entupido de carbono — perda de potência progressiva',
    body: 'Uso urbano de rotação constante acumula carbono no escape com o tempo. Sintoma: perda de potência gradual, mais perceptível em alta rotação. Decarbonize periodicamente com raspagem manual e produto decarbonizante.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo por retentores de virabrequim ressecados',
    body: 'Retentores endurecem com o tempo, mesmo em moto pouco rodada. Sintoma: manchas de óleo sob o motor, ar falso causando marcha lenta instável. Troca por peça genérica de mesma medida em oficina especializada em 2T.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste de pistão em unidade com histórico de manutenção desconhecido',
    body: 'RDZ 125 com múltiplos donos ao longo de décadas frequentemente tem histórico incerto de óleo e mistura usados. Teste de compressão é o diagnóstico mais confiável antes de rodar com confiança. Kits de pistão de reparo (oversize) ainda são encontrados para este motor via lojas especializadas.',
  },
]

const RDZ125_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma RDZ 125: moto de coleção esportiva pede atenção redobrada',
    body: '500 km ou mensal — lubrificar corrente. 2.000-3.000 km — verificar vela e cor de queima, limpar filtro de ar. 5.000 km — limpeza completa do carburador. 8.000 km — trocar vela, verificar kit relação. 10.000 km — decarbonizar escapamento. Anualmente — trocar fluido de freio, inspecionar chicote elétrico e retentores quanto a ressecamento por idade. Antes de rodar após período parado — teste de compressão e limpeza obrigatória do carburador.',
  },
]

// ─── RDZ 135 ───────────────────────────────────────────────────────────────────
// Motor: monocilíndrico 2T refrigerado a ar, ~135cc | evolução mais potente que a RDZ 125
// Produzida ~1990-1993 | Vela NGK B8ES/BR8ES aprox. | Freio a disco dianteiro, visual esportivo

const RDZ135_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Pré-mistura 20:1 a 25:1 — mais potência que a RDZ 125, mesma disciplina de mistura',
    body: 'A RDZ 135 é a evolução mais potente da linha RDZ (motor ~135cc). Pré-mistura na faixa de 20:1 a 25:1 com óleo sintético 2T de qualidade (Yamalube 2T, Motul 800). Meça sempre com recipiente calibrado — motor mais potente que a RDZ 125 tende a sofrer mais rápido com mistura incorreta em uso puxado.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK B8ES/BR8ES gap 0,6-0,7mm — confirme com o manual do ano específico',
    body: 'A numeração exata da vela pode variar entre RDZ 135 de anos diferentes — confirme no manual do seu chassi específico. Faixa geral: NGK B8ES ou BR8ES, gap 0,6-0,7mm. Leve sempre sobressalente — vela suja é a causa mais comum de dificuldade de partida em moto de coleção.',
  },
  {
    severity: 'WARN',
    title: 'Carburador: limpeza completa é praticamente obrigatória em moto restaurada',
    body: 'RDZ 135 parada por anos quase sempre precisa de limpeza completa do carburador antes de rodar bem. Desmonte, limpe giclês com spray específico e ar comprimido, verifique boia e vedação da cuba. Kits de reparo genéricos para carburadores desta época são vendidos por lojas especializadas em motos clássicas 2T.',
  },
  {
    severity: 'WARN',
    title: 'Peças compartilhadas com RDZ 125 e RD 135 — confirme medida antes de comprar',
    body: 'A RDZ 135 compartilha muito do chassi e suspensão com a RDZ 125, e boa parte da arquitetura de motor com a RD 135 mais antiga. Retentores, rolamentos e componentes de embreagem com a mesma medida costumam servir entre os três modelos — sempre confirme a medida exata (não confie apenas no nome do modelo). Grupos de Facebook e fóruns dedicados à linha "Yamaha RD/RDZ clássicas Brasil" são a melhor fonte de indicação de fornecedores atuais.',
  },
  {
    severity: 'OK',
    title: 'Corrente e relação — kit genérico por medida, sem necessidade de peça original',
    body: 'Kit de relação compatível com a RDZ 135 é vendido normalmente em lojas de peças para motos clássicas, sem código Yamaha específico — informe a medida da corrente do seu ano. Lubrifique a cada 500 km de uso regular.',
  },
  {
    severity: 'OK',
    title: 'Freio a disco dianteiro: fluido e pastilhas precisam de atenção mesmo com pouco uso',
    body: 'Troque o fluido de freio DOT 3/4 mesmo em moto de coleção pouco rodada — a umidade absorvida com o tempo compromete a eficácia mesmo sem uso. Pastilhas ressecadas por idade também merecem inspeção visual regular.',
  },
]

const RDZ135_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor fundido por mistura incorreta — motor mais potente sofre mais rápido',
    body: 'Sendo a versão mais potente da linha RDZ, o motor da RDZ 135 tende a sofrer mais rapidamente com mistura mal calculada em uso puxado. Sintomas de aviso: ruído metálico agudo, perda súbita de potência, "engripamento". Sempre confira a proporção com precisão antes de rodar, principalmente após restauração ou reforma.',
  },
  {
    severity: 'WARN',
    title: 'Fiação ressecada por décadas — falhas elétricas intermitentes esperadas',
    body: 'Chicote com 30+ anos de idade tem isolamento ressecado. Sintoma: sinalização instável, dificuldade de partida por mau contato. Substitua trechos comprometidos por fio automotivo comum de mesma bitola.',
  },
  {
    severity: 'WARN',
    title: 'Entupimento de carburador por combustível degradado',
    body: 'Gasolina/etanol parado por meses forma verniz nos giclês. Sintoma: partida difícil, marcha lenta instável. Limpeza completa resolve — esvazie a cuba antes de guardar por longos períodos.',
  },
  {
    severity: 'WARN',
    title: 'Escapamento entupido de carbono — perda de potência progressiva',
    body: 'Acúmulo de carbono no escape ao longo de décadas de uso urbano. Sintoma: perda de potência gradual, mais perceptível em alta rotação. Decarbonize periodicamente.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo por retentores de virabrequim ressecados',
    body: 'Retentores endurecem com o tempo. Sintoma: manchas de óleo sob o motor, marcha lenta instável por ar falso. Troca por peça genérica de mesma medida.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste de pistão em unidade com histórico de manutenção desconhecido',
    body: 'Teste de compressão antes de confiar na moto é essencial em unidade de procedência incerta. Compressão baixa indica necessidade de reforma do conjunto pistão/anéis — kits de reparo (oversize) ainda são encontrados para este motor.',
  },
]

const RDZ135_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma RDZ 135: mesma disciplina da RDZ 125, motor mais exigente',
    body: '500 km ou mensal — lubrificar corrente. 2.000-3.000 km — verificar vela e cor de queima, limpar filtro de ar. 5.000 km — limpeza completa do carburador. 8.000 km — trocar vela, verificar kit relação. 10.000 km — decarbonizar escapamento. Anualmente — trocar fluido de freio, inspecionar chicote elétrico e retentores quanto a ressecamento por idade. Antes de rodar após período parado — teste de compressão e limpeza obrigatória do carburador.',
  },
]

// ─── TDR 180 ───────────────────────────────────────────────────────────────────
// Motor: monocilíndrico 2T refrigerado a ar, 176cc (64,5mm × 54mm) | 16,6 cv @ 8.000 rpm
// Torque 1,74 kgf.m @ 6.500 rpm | Câmbio 6 marchas | Tanque 13L (1,1L reserva) | Peso ~102 kg
// Produzida ~1987-1993 | Visual híbrido trail/street inspirado na TDR 250 japonesa — incomum para a época

const TDR180_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Pré-mistura 20:1 a 25:1 — motor compartilha base com a DT 180',
    body: 'A TDR 180 (176cc) compartilha boa parte da arquitetura de motor com a DT 180-Z Trail da mesma época — visual híbrido trail/street inspirado na TDR 250 japonesa, mas mecânica bem próxima da linha DT. Pré-mistura 20:1 a 25:1 com óleo sintético 2T (Yamalube 2T, Motul 800) — confirme a proporção exata no manual do seu ano, e na dúvida prefira a faixa mais rica em óleo.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK B7ES/B8ES gap 0,6-0,7mm — mesma faixa da DT 180',
    body: 'Por compartilhar motor com a DT 180, a vela recomendada segue a mesma faixa: NGK B7ES em uso normal, B8ES (mais fria) para uso mais puxado. Gap 0,6-0,7mm. Leve sempre sobressalente na bolsa de ferramentas.',
  },
  {
    severity: 'WARN',
    title: 'Carburador: limpeza completa quase sempre necessária em moto de coleção',
    body: 'TDR 180 parada por anos precisa de limpeza completa do carburador antes de rodar bem — verniz de combustível degradado entope giclês. Desmonte, limpe com spray específico e ar comprimido, verifique boia e vedação da cuba.',
  },
  {
    severity: 'WARN',
    title: 'Peças alternativas: compatibilidade com a DT 180 é o principal recurso',
    body: 'Por compartilhar motor com a DT 180-Z Trail, muitas peças de motor (pistão, anéis, retentores, kit de reparo de carburador) têm boa chance de compatibilidade entre os dois modelos — sempre confirme a medida exata, pois pequenas diferenças de ano/versão existem. A TDR 180 é ainda mais rara que a DT 180 no mercado de usados, então desmanches e Mercado Livre são fontes essenciais para peças de acabamento, plástico e suspensão específicas do visual TDR.',
  },
  {
    severity: 'OK',
    title: 'Suspensão Mono-Cross traseira: revisão completa é essencial em moto de 30+ anos',
    body: 'A TDR 180 usa suspensão traseira monoamortecida Mono-Cross. Em moto com décadas de uso, o óleo interno do amortecedor perde viscosidade e o retentor resseca — sintoma: suspensão "estourada" ou dura demais. Revisão (troca de óleo interno e retentor) deve ser feita em oficina especializada em suspensão de moto antiga antes de qualquer uso mais exigente.',
  },
  {
    severity: 'OK',
    title: 'Freio a disco dianteiro (a partir de 1988): fluido e pastilhas mesmo com pouco uso',
    body: 'Unidades de 1988 em diante trouxeram freio a disco dianteiro de fábrica. Troque o fluido DOT 3/4 mesmo em moto de coleção pouco rodada — a umidade absorvida com o tempo reduz a eficácia independente do uso. Verifique visualmente o estado das pastilhas quanto a ressecamento.',
  },
  {
    severity: 'OK',
    title: 'Tanque 13L com 1,1L de reserva — atenção à torneira de combustível (registro) ressecada',
    body: 'A torneira/registro de combustível do tanque de motos desta época costuma ter vedação de borracha interna que resseca com o tempo, causando vazamento ou entupimento parcial do fluxo de gasolina. Se notar vazamento na base do tanque ou dificuldade de fluxo, o kit de reparo da torneira (vedantes, filtro de tela) é peça genérica de baixo custo em lojas de peças para motos antigas.',
  },
]

const TDR180_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor fundido por mistura incorreta — mesmo risco da linha DT 180 compartilhada',
    body: 'Por compartilhar motor com a DT 180, a TDR 180 tem o mesmo risco de motor fundido por pré-mistura mal calculada ou esquecida. Sintomas de aviso: ruído metálico agudo, perda súbita de potência. Confira sempre a proporção com recipiente calibrado antes de rodar, principalmente após reforma.',
  },
  {
    severity: 'WARN',
    title: 'Fiação ressecada por décadas de uso — falhas elétricas intermitentes',
    body: 'Chicote elétrico original com 30+ anos tem isolamento ressecado, propenso a curtos e mau contato. Sintoma: sinalização instável, dificuldade de partida. Substitua trechos comprometidos por fio automotivo comum de mesma bitola.',
  },
  {
    severity: 'WARN',
    title: 'Entupimento de carburador por combustível degradado em moto parada',
    body: 'Gasolina/etanol parado por meses forma verniz nos giclês. Sintoma: partida difícil, marcha lenta instável. Limpeza completa do carburador resolve a maioria dos casos.',
  },
  {
    severity: 'WARN',
    title: 'Escapamento entupido de carbono — perda de potência progressiva',
    body: 'Acúmulo de carbono no escape ao longo de décadas de uso. Sintoma: perda de potência gradual, mais perceptível em alta rotação. Decarbonize periodicamente com raspagem manual e produto decarbonizante.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo por retentores de virabrequim ressecados',
    body: 'Retentores endurecem com o tempo. Sintoma: manchas de óleo sob o motor, ar falso causando marcha lenta instável. Troca por peça genérica de mesma medida em oficina especializada em 2T.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste de pistão em moto com histórico de manutenção desconhecido',
    body: 'Teste de compressão antes de confiar na moto é essencial em unidade de procedência incerta — muito comum na TDR 180 por ser modelo raro que passou por múltiplos donos. Compressão baixa indica necessidade de reforma do cilindro.',
  },
]

const TDR180_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma TDR 180: moto rara pede atenção redobrada mesmo com pouco uso',
    body: '500 km ou mensal — lubrificar corrente. 2.000-3.000 km — verificar vela e cor de queima, limpar filtro de ar. 5.000 km — limpeza completa do carburador. 8.000 km — trocar vela, verificar kit relação. 10.000 km — decarbonizar escapamento, revisar torneira de combustível. Anualmente — trocar fluido de freio, inspecionar chicote elétrico e retentores quanto a ressecamento, revisar óleo interno da suspensão Mono-Cross traseira. Antes de rodar após período parado — teste de compressão e limpeza obrigatória do carburador.',
  },
]

// ─── WR 200 ────────────────────────────────────────────────────────────────────
// Motor: monocilíndrico 2T refrigerado a líquido, ~199cc | enduro/trilha focada em uso off-road/competição
// Suspensão de curso longo, geometria mais agressiva que a DT 200 para uso em trilha técnica
// Vela NGK BR8ES aprox. | Produzida nos anos 90 — versão mais voltada a trilha que a DT 200 (uso misto)

const WR200_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Pré-mistura 20:1 a 25:1 — moto pensada para trilha, exige atenção redobrada ao óleo',
    body: 'A WR 200 (~199cc, refrigerada a líquido) é a versão mais focada em trilha/competição da família 200cc da Yamaha, com suspensão de curso mais longo que a DT 200 e geometria mais agressiva para uso off-road técnico. Pré-mistura 20:1 a 25:1 com óleo sintético 2T de qualidade (Yamalube 2T, Motul 800 2T Factory Line) — em uso de trilha mais puxado ou competição, prefira a faixa mais rica em óleo (20:1) para margem de segurança térmica extra.',
  },
  {
    severity: 'OK',
    title: 'Refrigeração líquida: essencial verificar antes de qualquer trilha mais exigente',
    body: 'Assim como a DT 200, a WR 200 é refrigerada a líquido — verifique vazamentos nas mangueiras (borracha ressecada por décadas é comum), nível do líquido e estado do radiador antes de qualquer saída de trilha mais longa. Líquido recomendado: mistura 50/50 com água destilada, trocado mesmo em moto pouco usada.',
  },
  {
    severity: 'WARN',
    title: 'Jetting: moto de competição responde bem a ajuste fino do carburador',
    body: 'Sendo uma moto pensada para uso de trilha/competição, o carburador da WR 200 costuma responder bem a ajuste fino de jetting conforme altitude e temperatura — mais do que a DT 200 de uso misto. Consulte um mecânico especializado em 2T de trilha para calibrar o giclê principal conforme sua região de uso, e observe a cor da vela após cada saída como referência prática.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK BR8ES gap 0,6-0,7mm — troque com mais frequência em uso de trilha técnica',
    body: 'Vela de referência: NGK BR8ES (confirme com o manual do seu ano). Uso de trilha técnica com muita variação de rotação suja vela mais rápido que uso rodoviário — leve sempre uma sobressalente na bolsa/mochila em saídas de trilha.',
  },
  {
    severity: 'WARN',
    title: 'Peças alternativas: compatibilidade com DT 200 ajuda bastante no motor',
    body: 'A WR 200 compartilha boa parte da base de motor (195-199cc, refrigeração líquida) com a DT 200 da mesma época. Pistão, anéis, retentores e kit de reparo de carburador têm boa chance de compatibilidade entre os dois modelos — sempre confirme a medida exata do seu chassi. A WR 200 é mais rara que a DT 200 no mercado brasileiro (foi menos vendida por ser mais voltada a competição), então desmanches e grupos especializados são a fonte mais confiável para peças de suspensão e plástico específicas.',
  },
  {
    severity: 'OK',
    title: 'Suspensão de curso longo: revisão de óleo do garfo e amortecedor é obrigatória em moto antiga',
    body: 'A suspensão de curso mais longo da WR 200 (dianteira e traseira) exige revisão de óleo interno e retentores com mais frequência que uma moto de uso urbano, ainda mais considerando a idade das unidades hoje em circulação. Óleo do garfo ressecado ou contaminado prejudica o desempenho em trilha técnica — revisão em oficina especializada em suspensão off-road antes de qualquer uso mais exigente.',
  },
  {
    severity: 'OK',
    title: 'Corrente e relação: uso de trilha desgasta muito mais rápido que uso urbano',
    body: 'Kit de relação genérico (corrente, pinhão, coroa) compatível com a WR 200 é encontrado em lojas de peças para trilha por medida. Em uso de trilha com lama e água, lubrifique a corrente a cada saída — a exposição a abrasivos desgasta muito mais rápido que uso rodoviário.',
  },
]

const WR200_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Superaquecimento em trilha lenta e técnica — vazamento não percebido é o maior risco',
    body: 'Em trilha muito lenta e técnica, o radiador recebe pouco fluxo de ar — combinado com vazamento não percebido de líquido de arrefecimento (mangueira ressecada por décadas), o motor pode superaquecer e fundir sem aviso gradual claro. Verifique o nível do líquido antes de cada saída e as mangueiras quanto a rachaduras visíveis.',
  },
  {
    severity: 'WARN',
    title: 'Entupimento de carburador por sujeira de trilha e combustível degradado',
    body: 'Poeira que passa por filtro de ar mal vedado ou ressecado, combinada com combustível degradado em moto de coleção, entope os giclês do carburador. Sintoma: marcha lenta instável, dificuldade de partida. Limpeza completa do carburador e verificação da vedação do filtro de ar resolvem a maioria dos casos.',
  },
  {
    severity: 'WARN',
    title: 'Fiação ressecada por décadas — falhas elétricas intermitentes esperadas',
    body: 'Chicote com 30+ anos de idade em moto de uso off-road (mais exposta a vibração e umidade) tem isolamento especialmente propenso a ressecamento e curtos. Sintoma: sinalização instável, falha intermitente de ignição. Substitua trechos comprometidos por fio automotivo comum.',
  },
  {
    severity: 'WARN',
    title: 'Escapamento entupido de carbono — perda de potência em toda a faixa de giro',
    body: 'Acúmulo de carbono no escape ao longo de décadas de uso, especialmente se rodada com mistura rica. Sintoma: perda de potência progressiva. Decarbonize periodicamente o tubo de escape e o silencioso.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo por retentores de virabrequim e suspensão ressecados',
    body: 'Retentores de motor e de suspensão endurecem com décadas de idade. Sintoma: manchas de óleo no motor ou nos tubos do garfo dianteiro, marcha lenta instável por ar falso. Troca por peças genéricas de mesma medida em oficina especializada.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste de pistão em moto de uso de trilha com histórico desconhecido',
    body: 'Uso de trilha é naturalmente mais exigente para o motor que uso urbano — combinado com histórico de manutenção desconhecido em moto de décadas, o risco de desgaste avançado de pistão é maior. Teste de compressão antes de confiar na moto em trilha mais exigente é essencial.',
  },
]

const WR200_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma WR 200: moto de trilha exige atenção mais frequente que uso urbano',
    body: 'A cada saída de trilha — limpar/reoleificar filtro de ar, verificar nível do líquido de arrefecimento, lubrificar corrente. 2.000-3.000 km ou 10-15h de trilha — verificar vela e cor de queima. 5.000 km — limpeza completa do carburador. 8.000 km — trocar vela, verificar kit relação. 10.000 km — decarbonizar escapamento, revisar mangueiras do radiador. Anualmente — trocar líquido de arrefecimento, revisar óleo do garfo e amortecedor traseiro, inspecionar chicote elétrico e retentores quanto a ressecamento. Antes de qualquer trilha mais exigente após período parado — teste de compressão e limpeza obrigatória do carburador.',
  },
]

// ─── BLOCOS ────────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'DT 180',
    yearFrom: 1984,
    yearTo: 1993,
    MACETES: DT180_MACETES,
    PROBLEMAS: DT180_PROBLEMAS,
    MANUTENCAO: DT180_MANUTENCAO,
  },
  {
    modelName: 'DT 200',
    yearFrom: 1991,
    yearTo: 2000,
    MACETES: DT200_MACETES,
    PROBLEMAS: DT200_PROBLEMAS,
    MANUTENCAO: DT200_MANUTENCAO,
  },
  {
    modelName: 'RD 135',
    yearFrom: 1987,
    yearTo: 2000,
    MACETES: RD135_MACETES,
    PROBLEMAS: RD135_PROBLEMAS,
    MANUTENCAO: RD135_MANUTENCAO,
  },
  {
    modelName: 'RDZ 125',
    yearFrom: 1990,
    yearTo: 1993,
    MACETES: RDZ125_MACETES,
    PROBLEMAS: RDZ125_PROBLEMAS,
    MANUTENCAO: RDZ125_MANUTENCAO,
  },
  {
    modelName: 'RDZ 135',
    yearFrom: 1990,
    yearTo: 1993,
    MACETES: RDZ135_MACETES,
    PROBLEMAS: RDZ135_PROBLEMAS,
    MANUTENCAO: RDZ135_MANUTENCAO,
  },
  {
    modelName: 'TDR 180',
    yearFrom: 1987,
    yearTo: 1993,
    MACETES: TDR180_MACETES,
    PROBLEMAS: TDR180_PROBLEMAS,
    MANUTENCAO: TDR180_MANUTENCAO,
  },
  {
    modelName: 'WR 200',
    yearFrom: 1991,
    yearTo: 1999,
    MACETES: WR200_MACETES,
    PROBLEMAS: WR200_PROBLEMAS,
    MANUTENCAO: WR200_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ───────────────────────────────────────────────────────────────
// Valores aproximados baseados em faixas típicas de motos trail/street 2T da época — pneus estreitos,
// pressões moderadas. Onde não há dado exato de fábrica documentado, usamos faixa razoável e sinalizamos.

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'DT 180',
    yearFrom: 1984, yearTo: 1993,
    tireSize: '3.00-21 (F) · 4.10-18 (R) [aproximado]',
    frontPsi: 20, rearPsi: 22,
    frontPsiLoad: 20, rearPsiLoad: 26,
    notes: 'Solo: F 20 / R 22 PSI. Com carona/carga: F 20 / R 26 PSI. Valores aproximados — não há especificação de fábrica facilmente documentada para esta geração; pressões seguem a faixa típica de trail 2T com pneu diagonal da época. Ajuste conforme o desgaste e tipo de piso predominante (trilha: reduza levemente para mais aderência).',
  },
  {
    modelName: 'DT 200',
    yearFrom: 1991, yearTo: 2000,
    tireSize: '3.00-21 (F) · 4.60-18 (R) [aproximado]',
    frontPsi: 20, rearPsi: 23,
    frontPsiLoad: 20, rearPsiLoad: 27,
    notes: 'Solo: F 20 / R 23 PSI. Com carona/carga: F 20 / R 27 PSI. Valores aproximados baseados na faixa típica de trail 2T de 195cc da época — confirme com o manual do proprietário do seu ano específico se disponível. Aplica-se também à versão DT 200 R.',
  },
  {
    modelName: 'RD 135',
    yearFrom: 1987, yearTo: 2000,
    tireSize: '2.75-18 (F) · 3.25-18 (R) [aproximado]',
    frontPsi: 24, rearPsi: 28,
    frontPsiLoad: 24, rearPsiLoad: 32,
    notes: 'Solo: F 24 / R 28 PSI. Com carona: F 24 / R 32 PSI. Valores aproximados — naked/street 2T clássica com pneu estreito típico de motos urbanas de baixa cilindrada dos anos 80-90.',
  },
  {
    modelName: 'RDZ 125',
    yearFrom: 1990, yearTo: 1993,
    tireSize: '2.75-18 (F) · 3.25-18 (R) [aproximado]',
    frontPsi: 24, rearPsi: 28,
    frontPsiLoad: 24, rearPsiLoad: 32,
    notes: 'Solo: F 24 / R 28 PSI. Com carona: F 24 / R 32 PSI. Valores aproximados, mesma faixa da RD 135 por características de peso e uso semelhantes.',
  },
  {
    modelName: 'RDZ 135',
    yearFrom: 1990, yearTo: 1993,
    tireSize: '2.75-18 (F) · 3.25-18 (R) [aproximado]',
    frontPsi: 24, rearPsi: 28,
    frontPsiLoad: 24, rearPsiLoad: 32,
    notes: 'Solo: F 24 / R 28 PSI. Com carona: F 24 / R 32 PSI. Valores aproximados, mesma faixa da RDZ 125 (motor mais potente não altera significativamente a especificação de pneu/pressão).',
  },
  {
    modelName: 'TDR 180',
    yearFrom: 1987, yearTo: 1993,
    tireSize: '3.00-21 (F) · 4.10-18 (R) [aproximado]',
    frontPsi: 20, rearPsi: 22,
    frontPsiLoad: 20, rearPsiLoad: 26,
    notes: 'Solo: F 20 / R 22 PSI. Com carona: F 20 / R 26 PSI. Valores aproximados — mesma faixa da DT 180 por compartilhar motor e proposta trail/street híbrida. Peso de fábrica aproximado: 102 kg.',
  },
  {
    modelName: 'WR 200',
    yearFrom: 1991, yearTo: 1999,
    tireSize: '3.00-21 (F) · 4.60-18 (R) [aproximado]',
    frontPsi: 18, rearPsi: 20,
    frontPsiLoad: 18, rearPsiLoad: 24,
    notes: 'Solo (trilha): F 18 / R 20 PSI — pressão mais baixa que a DT 200 por ser moto mais focada em trilha técnica/competição, priorizando aderência sobre economia de pneu. Em uso misto com trecho de estrada, considere subir para F 20 / R 23 PSI. Valores aproximados — confirme com manual do ano específico se disponível.',
  },
]

// ─── ITENS DE MANUTENÇÃO ───────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // DT 180
  { modelName: 'DT 180', yearFrom: 1984, yearTo: 1993, component: 'Pré-mistura/Autolube — óleo 2T sintético', intervalKm: null, intervalMonths: null, notes: 'Verificar fluxo da bomba Autolube a cada uso; na dúvida, complementar com pré-mistura manual 25-30:1.', priority: 'CRITICAL', order: 1 },
  { modelName: 'DT 180', yearFrom: 1984, yearTo: 1993, component: 'Vela NGK B7ES/B8ES (gap 0,6-0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Verificar cor a cada 2.000 km. Levar sobressalente.', priority: 'MEDIUM', order: 2 },
  { modelName: 'DT 180', yearFrom: 1984, yearTo: 1993, component: 'Pistão e anéis — inspeção via teste de compressão', intervalKm: null, intervalMonths: 24, notes: 'Essencial em moto de procedência/histórico desconhecido. Compressão < 6-7 kgf/cm² indica reforma.', priority: 'CRITICAL', order: 3 },
  { modelName: 'DT 180', yearFrom: 1984, yearTo: 1993, component: 'Filtro de ar de espuma — limpeza/reoleificação', intervalKm: 3000, intervalMonths: 12, notes: 'Verificar rasgos e ressecamento da espuma — comum em moto antiga.', priority: 'HIGH', order: 4 },
  { modelName: 'DT 180', yearFrom: 1984, yearTo: 1993, component: 'Carburador Mikuni — limpeza completa', intervalKm: 5000, intervalMonths: 12, notes: 'Obrigatório após período parado. Verniz de etanol degradado entope giclês.', priority: 'HIGH', order: 5 },
  { modelName: 'DT 180', yearFrom: 1984, yearTo: 1993, component: 'Corrente e kit relação', intervalKm: 500, intervalMonths: null, notes: 'Lubrificar mesmo com pouco uso — corrente parada enferruja.', priority: 'MEDIUM', order: 6 },
  { modelName: 'DT 180', yearFrom: 1984, yearTo: 1993, component: 'Escapamento — decarbonização', intervalKm: 10000, intervalMonths: null, notes: 'Raspagem manual + produto decarbonizante.', priority: 'MEDIUM', order: 7 },
  { modelName: 'DT 180', yearFrom: 1984, yearTo: 1993, component: 'Sistema elétrico — chicote e conectores', intervalKm: null, intervalMonths: 12, notes: 'Inspeção anual quanto a ressecamento por idade, não só uso.', priority: 'MEDIUM', order: 8 },
  { modelName: 'DT 180', yearFrom: 1984, yearTo: 1993, component: 'Retentores de virabrequim', intervalKm: null, intervalMonths: 24, notes: 'Ressecam com o tempo mesmo sem uso intenso. Peça genérica por medida.', priority: 'HIGH', order: 9 },

  // DT 200 (+ DT 200 R)
  { modelName: 'DT 200', yearFrom: 1991, yearTo: 2000, component: 'Pré-mistura óleo 2T (20:1 a 25:1)', intervalKm: null, intervalMonths: null, notes: 'Confirmar proporção exata no manual do ano. Óleo sintético obrigatório.', priority: 'CRITICAL', order: 1 },
  { modelName: 'DT 200', yearFrom: 1991, yearTo: 2000, component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 12, notes: 'Mistura 50/50 com água destilada. Verificar mangueiras ressecadas.', priority: 'HIGH', order: 2 },
  { modelName: 'DT 200', yearFrom: 1991, yearTo: 2000, component: 'Vela NGK B8ES/BR8ES (gap 0,6-0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Confirmar numeração exata para DT 200 vs. DT 200 R no manual.', priority: 'MEDIUM', order: 3 },
  { modelName: 'DT 200', yearFrom: 1991, yearTo: 2000, component: 'Pistão e anéis — inspeção via teste de compressão', intervalKm: null, intervalMonths: 24, notes: 'Bore 66mm. Peça genérica disponível por ser cilindrada popular na época.', priority: 'CRITICAL', order: 4 },
  { modelName: 'DT 200', yearFrom: 1991, yearTo: 2000, component: 'Carburador — limpeza completa', intervalKm: 5000, intervalMonths: 12, notes: 'Obrigatório após período parado.', priority: 'HIGH', order: 5 },
  { modelName: 'DT 200', yearFrom: 1991, yearTo: 2000, component: 'Filtro de ar — limpeza/reoleificação', intervalKm: 3000, intervalMonths: 12, notes: 'Mais frequente em uso de trilha.', priority: 'HIGH', order: 6 },
  { modelName: 'DT 200', yearFrom: 1991, yearTo: 2000, component: 'Corrente e kit relação 520', intervalKm: 500, intervalMonths: null, notes: 'Uso de trilha desgasta mais rápido que uso urbano.', priority: 'MEDIUM', order: 7 },
  { modelName: 'DT 200', yearFrom: 1991, yearTo: 2000, component: 'Escapamento — decarbonização', intervalKm: 10000, intervalMonths: null, notes: 'Perda de potência progressiva se não feito.', priority: 'MEDIUM', order: 8 },
  { modelName: 'DT 200', yearFrom: 1991, yearTo: 2000, component: 'Sistema elétrico — chicote e conectores', intervalKm: null, intervalMonths: 12, notes: 'Inspeção anual quanto a ressecamento.', priority: 'MEDIUM', order: 9 },
  { modelName: 'DT 200', yearFrom: 1991, yearTo: 2000, component: 'Retentores de virabrequim', intervalKm: null, intervalMonths: 24, notes: 'Peça genérica por medida.', priority: 'HIGH', order: 10 },

  // RD 135
  { modelName: 'RD 135', yearFrom: 1987, yearTo: 2000, component: 'Pré-mistura óleo 2T (20:1 a 25:1)', intervalKm: null, intervalMonths: null, notes: 'Usar recipiente calibrado — erro de mistura funde motor.', priority: 'CRITICAL', order: 1 },
  { modelName: 'RD 135', yearFrom: 1987, yearTo: 2000, component: 'Vela NGK B8ES (gap 0,6-0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Motor de alta rotação suja vela rápido em uso urbano parado.', priority: 'MEDIUM', order: 2 },
  { modelName: 'RD 135', yearFrom: 1987, yearTo: 2000, component: 'Pistão e anéis — inspeção via teste de compressão', intervalKm: null, intervalMonths: 24, notes: 'Kits de reparo oversize ainda encontrados por cilindrada popular.', priority: 'CRITICAL', order: 3 },
  { modelName: 'RD 135', yearFrom: 1987, yearTo: 2000, component: 'Carburador — limpeza completa', intervalKm: 5000, intervalMonths: 12, notes: 'Quase sempre necessária em moto restaurada.', priority: 'HIGH', order: 4 },
  { modelName: 'RD 135', yearFrom: 1987, yearTo: 2000, component: 'Freio a disco dianteiro — fluido DOT 3/4', intervalKm: null, intervalMonths: 24, notes: 'Trocar mesmo com pouco uso — umidade absorvida com o tempo.', priority: 'HIGH', order: 5 },
  { modelName: 'RD 135', yearFrom: 1987, yearTo: 2000, component: 'Corrente e kit relação', intervalKm: 500, intervalMonths: null, notes: 'Kit genérico por medida.', priority: 'MEDIUM', order: 6 },
  { modelName: 'RD 135', yearFrom: 1987, yearTo: 2000, component: 'Escapamento — decarbonização', intervalKm: 10000, intervalMonths: null, notes: 'Uso urbano constante acumula carbono com o tempo.', priority: 'MEDIUM', order: 7 },
  { modelName: 'RD 135', yearFrom: 1987, yearTo: 2000, component: 'Sistema elétrico — chicote e conectores', intervalKm: null, intervalMonths: 12, notes: 'Ressecamento por idade é praticamente garantido.', priority: 'MEDIUM', order: 8 },
  { modelName: 'RD 135', yearFrom: 1987, yearTo: 2000, component: 'Retentores de virabrequim e câmbio', intervalKm: null, intervalMonths: 24, notes: 'Peça genérica compatível com RDZ em alguns casos.', priority: 'HIGH', order: 9 },

  // RDZ 125
  { modelName: 'RDZ 125', yearFrom: 1990, yearTo: 1993, component: 'Pré-mistura óleo 2T (20:1 a 25:1)', intervalKm: null, intervalMonths: null, notes: 'Recipiente calibrado obrigatório.', priority: 'CRITICAL', order: 1 },
  { modelName: 'RDZ 125', yearFrom: 1990, yearTo: 1993, component: 'Vela NGK B8ES (gap 0,6-0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Suja rápido em uso urbano de baixa velocidade constante.', priority: 'MEDIUM', order: 2 },
  { modelName: 'RDZ 125', yearFrom: 1990, yearTo: 1993, component: 'Pistão e anéis — inspeção via teste de compressão', intervalKm: null, intervalMonths: 24, notes: 'Essencial antes de confiar em moto de coleção.', priority: 'CRITICAL', order: 3 },
  { modelName: 'RDZ 125', yearFrom: 1990, yearTo: 1993, component: 'Carburador — limpeza completa', intervalKm: 5000, intervalMonths: 12, notes: 'Quase sempre necessária após período parado.', priority: 'HIGH', order: 4 },
  { modelName: 'RDZ 125', yearFrom: 1990, yearTo: 1993, component: 'Freio a disco dianteiro — fluido DOT 3/4', intervalKm: null, intervalMonths: 24, notes: 'Trocar mesmo com pouco uso.', priority: 'HIGH', order: 5 },
  { modelName: 'RDZ 125', yearFrom: 1990, yearTo: 1993, component: 'Corrente e kit relação', intervalKm: 500, intervalMonths: null, notes: 'Kit genérico por medida, compartilhado com RDZ 135.', priority: 'MEDIUM', order: 6 },
  { modelName: 'RDZ 125', yearFrom: 1990, yearTo: 1993, component: 'Escapamento — decarbonização', intervalKm: 10000, intervalMonths: null, notes: 'Perda de potência progressiva se não feito.', priority: 'MEDIUM', order: 7 },
  { modelName: 'RDZ 125', yearFrom: 1990, yearTo: 1993, component: 'Sistema elétrico — chicote e conectores', intervalKm: null, intervalMonths: 12, notes: 'Ressecamento por idade.', priority: 'MEDIUM', order: 8 },
  { modelName: 'RDZ 125', yearFrom: 1990, yearTo: 1993, component: 'Retentores de virabrequim', intervalKm: null, intervalMonths: 24, notes: 'Compatível por medida com RDZ 135 em muitos casos.', priority: 'HIGH', order: 9 },

  // RDZ 135
  { modelName: 'RDZ 135', yearFrom: 1990, yearTo: 1993, component: 'Pré-mistura óleo 2T (20:1 a 25:1)', intervalKm: null, intervalMonths: null, notes: 'Motor mais potente que a RDZ 125 sofre mais rápido com mistura errada.', priority: 'CRITICAL', order: 1 },
  { modelName: 'RDZ 135', yearFrom: 1990, yearTo: 1993, component: 'Vela NGK B8ES/BR8ES (gap 0,6-0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Confirmar numeração exata no manual do ano.', priority: 'MEDIUM', order: 2 },
  { modelName: 'RDZ 135', yearFrom: 1990, yearTo: 1993, component: 'Pistão e anéis — inspeção via teste de compressão', intervalKm: null, intervalMonths: 24, notes: 'Essencial antes de uso mais puxado.', priority: 'CRITICAL', order: 3 },
  { modelName: 'RDZ 135', yearFrom: 1990, yearTo: 1993, component: 'Carburador — limpeza completa', intervalKm: 5000, intervalMonths: 12, notes: 'Praticamente obrigatório em moto restaurada.', priority: 'HIGH', order: 4 },
  { modelName: 'RDZ 135', yearFrom: 1990, yearTo: 1993, component: 'Freio a disco dianteiro — fluido DOT 3/4', intervalKm: null, intervalMonths: 24, notes: 'Trocar mesmo com pouco uso.', priority: 'HIGH', order: 5 },
  { modelName: 'RDZ 135', yearFrom: 1990, yearTo: 1993, component: 'Corrente e kit relação', intervalKm: 500, intervalMonths: null, notes: 'Kit genérico por medida, compartilhado com RDZ 125.', priority: 'MEDIUM', order: 6 },
  { modelName: 'RDZ 135', yearFrom: 1990, yearTo: 1993, component: 'Escapamento — decarbonização', intervalKm: 10000, intervalMonths: null, notes: 'Perda de potência progressiva se não feito.', priority: 'MEDIUM', order: 7 },
  { modelName: 'RDZ 135', yearFrom: 1990, yearTo: 1993, component: 'Sistema elétrico — chicote e conectores', intervalKm: null, intervalMonths: 12, notes: 'Ressecamento por idade.', priority: 'MEDIUM', order: 8 },
  { modelName: 'RDZ 135', yearFrom: 1990, yearTo: 1993, component: 'Retentores de virabrequim', intervalKm: null, intervalMonths: 24, notes: 'Compatível por medida com RD 135/RDZ 125 em muitos casos.', priority: 'HIGH', order: 9 },

  // TDR 180
  { modelName: 'TDR 180', yearFrom: 1987, yearTo: 1993, component: 'Pré-mistura óleo 2T (20:1 a 25:1)', intervalKm: null, intervalMonths: null, notes: 'Motor compartilhado com a DT 180 — mesma disciplina de mistura.', priority: 'CRITICAL', order: 1 },
  { modelName: 'TDR 180', yearFrom: 1987, yearTo: 1993, component: 'Vela NGK B7ES/B8ES (gap 0,6-0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Mesma faixa da DT 180.', priority: 'MEDIUM', order: 2 },
  { modelName: 'TDR 180', yearFrom: 1987, yearTo: 1993, component: 'Pistão e anéis — inspeção via teste de compressão', intervalKm: null, intervalMonths: 24, notes: 'Compatibilidade com peças de reparo da DT 180.', priority: 'CRITICAL', order: 3 },
  { modelName: 'TDR 180', yearFrom: 1987, yearTo: 1993, component: 'Carburador — limpeza completa', intervalKm: 5000, intervalMonths: 12, notes: 'Quase sempre necessária em moto de coleção.', priority: 'HIGH', order: 4 },
  { modelName: 'TDR 180', yearFrom: 1987, yearTo: 1993, component: 'Suspensão traseira Mono-Cross — óleo e retentor', intervalKm: null, intervalMonths: 24, notes: 'Óleo interno perde viscosidade com décadas de idade.', priority: 'HIGH', order: 5 },
  { modelName: 'TDR 180', yearFrom: 1987, yearTo: 1993, component: 'Freio a disco dianteiro (1988+) — fluido DOT 3/4', intervalKm: null, intervalMonths: 24, notes: 'Trocar mesmo com pouco uso.', priority: 'HIGH', order: 6 },
  { modelName: 'TDR 180', yearFrom: 1987, yearTo: 1993, component: 'Corrente e kit relação', intervalKm: 500, intervalMonths: null, notes: 'Kit genérico por medida.', priority: 'MEDIUM', order: 7 },
  { modelName: 'TDR 180', yearFrom: 1987, yearTo: 1993, component: 'Escapamento — decarbonização', intervalKm: 10000, intervalMonths: null, notes: 'Perda de potência progressiva se não feito.', priority: 'MEDIUM', order: 8 },
  { modelName: 'TDR 180', yearFrom: 1987, yearTo: 1993, component: 'Torneira de combustível — vedação/filtro de tela', intervalKm: null, intervalMonths: 24, notes: 'Vedante interno resseca com o tempo, causando vazamento/entupimento.', priority: 'MEDIUM', order: 9 },
  { modelName: 'TDR 180', yearFrom: 1987, yearTo: 1993, component: 'Sistema elétrico — chicote e conectores', intervalKm: null, intervalMonths: 12, notes: 'Ressecamento por idade.', priority: 'MEDIUM', order: 10 },

  // WR 200
  { modelName: 'WR 200', yearFrom: 1991, yearTo: 1999, component: 'Pré-mistura óleo 2T (20:1 a 25:1)', intervalKm: null, intervalMonths: null, notes: 'Uso de trilha/competição: preferir faixa mais rica (20:1).', priority: 'CRITICAL', order: 1 },
  { modelName: 'WR 200', yearFrom: 1991, yearTo: 1999, component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 12, notes: 'Verificar mangueiras ressecadas antes de trilha mais longa.', priority: 'HIGH', order: 2 },
  { modelName: 'WR 200', yearFrom: 1991, yearTo: 1999, component: 'Vela NGK BR8ES (gap 0,6-0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Uso de trilha técnica suja vela mais rápido — levar sobressalente.', priority: 'MEDIUM', order: 3 },
  { modelName: 'WR 200', yearFrom: 1991, yearTo: 1999, component: 'Pistão e anéis — inspeção via teste de compressão', intervalKm: null, intervalMonths: 24, notes: 'Compatibilidade com peças de reparo da DT 200.', priority: 'CRITICAL', order: 4 },
  { modelName: 'WR 200', yearFrom: 1991, yearTo: 1999, component: 'Carburador — limpeza completa e jetting', intervalKm: 5000, intervalMonths: 12, notes: 'Moto de competição responde bem a ajuste fino.', priority: 'HIGH', order: 5 },
  { modelName: 'WR 200', yearFrom: 1991, yearTo: 1999, component: 'Filtro de ar — limpeza/reoleificação', intervalKm: null, intervalMonths: null, notes: 'A cada saída de trilha — não só periodicamente.', priority: 'HIGH', order: 6 },
  { modelName: 'WR 200', yearFrom: 1991, yearTo: 1999, component: 'Suspensão dianteira/traseira de curso longo — óleo e retentores', intervalKm: null, intervalMonths: 24, notes: 'Revisão obrigatória antes de uso mais exigente em moto antiga.', priority: 'HIGH', order: 7 },
  { modelName: 'WR 200', yearFrom: 1991, yearTo: 1999, component: 'Corrente e kit relação 520', intervalKm: 500, intervalMonths: null, notes: 'Lubrificar a cada saída de trilha — lama e água desgastam rápido.', priority: 'MEDIUM', order: 8 },
  { modelName: 'WR 200', yearFrom: 1991, yearTo: 1999, component: 'Escapamento — decarbonização', intervalKm: 10000, intervalMonths: null, notes: 'Perda de potência em toda a faixa de giro se não feito.', priority: 'MEDIUM', order: 9 },
  { modelName: 'WR 200', yearFrom: 1991, yearTo: 1999, component: 'Sistema elétrico — chicote e conectores', intervalKm: null, intervalMonths: 12, notes: 'Uso off-road expõe mais a vibração e umidade.', priority: 'MEDIUM', order: 10 },
]

// ─── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Yamaha 2 tempos clássicas (DT/RD/RDZ/TDR/WR)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Yamaha', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'Yamaha', vehicleTypeId: motoType.id },
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
        yearFrom: block.yearFrom,
        yearTo: block.yearTo,
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

  console.log('✅ Yamaha 2 tempos clássicas concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
