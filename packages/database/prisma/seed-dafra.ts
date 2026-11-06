/**
 * Seed DAFRA — macetes, problemas e manutenção
 * Cobre os principais modelos DAFRA registrados na Tabela FIPE Brasil
 *
 * CONTEXTO: a parceria DAFRA↔TVS terminou em 03/2024 (a fábrica de Manaus parou de montar
 * motos TVS/Apache) — isso NÃO é um encerramento total da marca. A DAFRA segue operando no
 * Brasil, agora com foco na parceria com a SYM (Citycom, Cruisym, Maxsym, Fiddle, Joyride,
 * CityClass) e também monta Ducati e Royal Enfield na mesma planta. Concessionárias DAFRA
 * ainda existem para peças/serviço/garantia dos modelos Apache. Já os modelos legados
 * próprios ou de origem chinesa (Kansas, Riva, Speed, Laser, Horizon, Next, NH, Smart,
 * Super, Zig, Roadwin) têm peças originais escassas por idade e baixo volume — não porque
 * a marca tenha fechado.
 *
 * Modelos cobertos:
 * Apache 150cc, Apache RTR 200cc, Kansas 150, Riva 150cc, Speed 150, Laser 150,
 * Citycom 300i, NH 190, Horizon 150, Horizon 250, Next 250cc, Next 300cc
 *
 * Fontes: forumdamoto.com.br, debatemotos.com, motoforum.com.br, motonline.com.br,
 *         daframotos.com.br, grupo DAFRA Brasil no Facebook, manuais de serviço TVS/SYM,
 *         relatos de proprietários e mecânicos especializados em chinesas
 *
 * Execute: pnpm --filter @motormacete/database db:seed:dafra
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

// ─── APACHE 150cc (RTR 150, carburada, 2010-2015) ────────────────────────────

const APACHE200_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor TVS 147,5cc: aguarde 2 minutos antes de andar com motor frio',
    body: 'O motor monocilíndrico 147,5cc da Apache RTR 150 (fabricada pela DAFRA sob licença da TVS entre 2010 e 2015) tem tolerâncias mais apertadas que motores de marcas japonesas. Na partida a frio, deixe o motor aquecer por 2 minutos antes de aplicar carga. O óleo precisa circular por todo o cabeçote antes de girar acima de 4.000 rpm. Evita desgaste prematuro do comando de válvulas.',
  },
  {
    severity: 'WARN',
    title: 'Carburador Mikuni BS29: regulagem precisa ou engasga sob carga',
    body: 'A Apache 150cc/RTR 150 (2010–2015) usa carburador Mikuni BS29. Engasgo no meio-giro é sintoma clássico de agulha fora do clip correto (posição 3 de cima, padrão de fábrica). Se der engasgo na aceleração parcial, verifique também o diafragma do carburador por microfissuras — segure contra a luz para ver.',
  },
  {
    severity: 'OK',
    title: 'Corrente: lubrifique a cada 500 km — vida útil depende disso',
    body: 'A corrente original da Apache 150cc tem qualidade mediana. Com lubrificação a cada 500 km (spray de corrente ou óleo 80W90 aplicado na lateral interna), a vida útil passa de 15.000 km para 25.000+ km. Sem lubrificação, dura 8.000–10.000 km. Kit relação (pinhão + coroa + corrente): R$ 150–300 em distribuidoras de peças de motos chinesas.',
  },
  {
    severity: 'OK',
    title: 'Junta do cabeçote: aperte os parafusos após as primeiras 500 km',
    body: 'Nos primeiros 500 km de uso, os parafusos do cabeçote do motor TVS tendem a afrouxar ligeiramente pela acomodação das juntas. Aproveite a primeira revisão para verificar o torque — o vazamento de óleo pelo cabeçote é um problema evitável se detectado cedo. Torque: 22–25 Nm em padrão cruzado.',
  },
]

const APACHE200_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Modelo descontinuado desde 2015: peças originais são escassas',
    body: 'A DAFRA parou de produzir a Apache RTR 150 carburada em 2015 (substituída depois pela Apache RTR 200cc injetada, lançada em 2019 — um projeto totalmente diferente). Não é a marca que fechou, mas sim este modelo específico que saiu de linha. Peças compatíveis: como o motor é derivado da TVS Apache RTR 150/160 vendida em outros países, algumas peças genéricas "TVS Apache 150" funcionam. Fontes: Mercado Livre (peças usadas de sucatas), Ali Express (peças genéricas 150cc monocilíndrico), grupos no Facebook "DAFRA Apache Brasil". Para peças de motor (pistão, anel, biela), busque vendedores de peças para motos chinesas/indianas 150cc — dimensões similares.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pela tampa do cabeçote: junta resseca em 3–4 anos',
    body: 'Problema amplamente reportado na Apache 150cc: a junta da tampa do cabeçote resseca e começa a vazar óleo para a carenagem lateral após 3–4 anos de uso, especialmente em climas quentes (Nordeste e Centro-Oeste). Solução: troca da junta (peça simples, ~R$ 30–60 em lojas de peças genéricas). Use silicone de motor para reforçar as extremidades — o encaixe original é simples e tende a vazar novamente se não reforçado.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico com conectores oxidando — chicote original de baixa qualidade',
    body: 'O chicote elétrico original da Apache 150cc usa conectores de qualidade inferior às marcas japonesas. Após 2–3 anos, os conectores oxidam e causam problemas intermitentes: pisca-pisca que para de funcionar, velocímetro digital com leitura errática, luz da injeção acendendo sem motivo. Solução: limpar todos os conectores com spray WD-40 Contato e aplicar graxa dielétrica (R$ 15–25 em autopeças). Resolução definitiva: substituir conectores por modelos Tyco de mesma bitola.',
  },
  {
    severity: 'WARN',
    title: 'Bengala dianteira: vedante vaza após 20.000 km em estradas ruins',
    body: 'A bengala dianteira da Apache 150cc tem vedante com vida útil curta em uso com buracos frequentes (estradas do interior, cidade com mal-conservação). Sintoma: mancha de óleo na parte inferior da bengala, amortecimento irregular. Vedante de reposição: use um vedante genérico com as mesmas dimensões (medidas marcadas na bengala ou no manual). Troca simples para mecânico experiente: R$ 100–200 de mão de obra.',
  },
]

const APACHE200_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Apache 150cc: intervalos baseados no manual TVS e experiência da comunidade',
    body: '500 km (rodagem) — Troca de óleo motor (10W30 semissintético, ~1,2 L). | 1.000 km — Segunda troca de óleo (rodagem). | 3.000 km — Troca de óleo motor rotineira. Inspecionar e lubrificar corrente. | 5.000 km — Verificar folga de válvulas (escapamento: 0,10–0,15 mm; admissão: 0,07–0,11 mm). Limpar filtro de ar. | 10.000 km — Vela NGK CPR9EA-9. Trocar filtro de ar. Inspecionar pastilhas de freio. | 15.000 km — Kit relação (se desgastado). Verificar fluido de freio. | 20.000 km — Trocar fluido de freio DOT 4. Rolamentos de roda (inspecionar). | 30.000 km — Inspeção geral de rolamentos, velas e componentes do sistema de ignição.',
  },
]

// ─── APACHE RTR 200 4V ───────────────────────────────────────────────────────

const APACHERTR200_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Injeção FI: não desconecte a bateria sem antes ligar a ignição por 30 segundos',
    body: 'O sistema de injeção do Apache RTR 200 4V tem mapeamento armazenado na ECU. Para evitar reset da injeção que causa marcha lenta irregular, sempre ligue a ignição por 30 segundos antes de manobras que envolvam desconexão de bateria. Após trabalho elétrico ou troca de bateria, faça o procedimento de inicialização: ligue a ignição (sem dar partida), aguarde o auto-teste dos instrumentos terminar, depois dê partida normalmente.',
  },
  {
    severity: 'WARN',
    title: 'Sensor TPS: recalibre se sentir engasgo na aceleração do meio ao fundo',
    body: 'O sensor TPS (posição da borboleta) do Apache RTR 200 4V pode descalibrar e causar engasgo na aceleração brusca do meio ao fundo. O ajuste requer scanner específico para o sistema TVS ou pode ser feito em concessionárias TVS autorizadas. Algumas oficinas especializadas em motos indianas/chinesas têm o equipamento. O reset manual (sem scanner) não é eficaz neste modelo.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W30 semissintético: não use 10W40 no verão — o motor roda quente',
    body: 'Muitos proprietários trocam para 10W40 no verão pensando ser mais indicado para o calor. No Apache RTR 200 4V, o motor é projetado para 10W30 semissintético. O óleo 10W40 é mais viscoso e não circula tão eficientemente nas passagens estreitas do motor TVS em temperaturas altas — pode causar temperatura elevada no cabeçote. Use Motul 5100 10W30 ou equivalente semissintético nacional.',
  },
]

const APACHERTR200_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'ECU e sensor MAP: peças originais DAFRA inexistentes — use componentes TVS',
    body: 'A ECU e o sensor MAP do Apache RTR 200 4V são peças elétricas que não têm substituto nacional disponível após o fim da produção destes modelos legados pela DAFRA. A boa notícia: o sistema é derivado do TVS Apache RTR 200 4V comercializado no exterior. Importação via Ali Express de peças compatíveis com "TVS Apache RTR 200 4V FI ECU" costuma funcionar — mas verifique o código do sensor com o seu (gravado na peça) antes de comprar. Outra opção: mecânicos especializados em reparo de ECU (custo R$ 200–400 de reparo vs R$ 800–1.500 de peça nova importada).',
  },
  {
    severity: 'WARN',
    title: 'Bomba de combustível com falha após 30.000 km: sintoma é corte em alta rotação',
    body: 'Relato recorrente na comunidade DAFRA: a bomba de combustível interna do tanque falha após 30.000–40.000 km, causando corte de motor acima de 7.000 rpm (quando a demanda de combustível é maior). Diagnóstico: conectar manômetro na linha de combustível — pressão normal deve ser 2,5–3,0 bar. Substituição: bomba genérica de diâmetro compatível (disponível em lojas de autopeças para sistema EFI 12V).',
  },
  {
    severity: 'WARN',
    title: 'Suspensão traseira com batente: amortecedor original tem curso curto',
    body: 'O amortecedor traseiro do Apache RTR 200 4V bate no batente de borracha em situações de uso com passageiro ou buracos fundos — o curso original é limitado para o peso da moto. Melhoria recomendada pela comunidade: amortecedor Gabriel ou Cofap compatível com monoamortecedor de olhais de mesma dimensão. Custo: R$ 180–350. Melhora significativamente o conforto e a estabilidade traseira.',
  },
]

const APACHERTR200_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Apache RTR 200 4V: motor injetado exige respeitar os intervalos da ECU',
    body: '1.000 km — Troca de óleo inicial (10W30 semissintético, ~1,2 L) + ajuste de folga de válvulas (rodagem). | 3.000 km — Troca de óleo rotineira. | 5.000 km — Verificar folga de válvulas (admissão 0,07–0,11 mm; escape 0,10–0,15 mm). Limpar filtro de ar. | 10.000 km — Vela NGK CPR9EA-9. Inspecionar pastilhas de freio dianteiro (disco) e traseiro (tambor). | 15.000 km — Inspecionar e se necessário trocar kit relação (corrente + pinhão + coroa). | 20.000 km — Filtro de ar (trocar). Fluido de freio DOT 4 (frente). | 30.000 km — Inspeção da bomba de combustível. Rolamentos de roda. Cabo do acelerador (verificar folga e lubrificar).',
  },
]

// ─── KANSAS 150 ──────────────────────────────────────────────────────────────

const KANSAS150_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 150cc com estilo cruiser: mantenha o ritmo — não foi feita para velocidade',
    body: 'O Kansas 150 é um cruiser urbano com motor monocilíndrico chinês de 150cc (~9cv). A filosofia de uso é completamente diferente de uma sport: acelere suavemente, mantenha entre 4.000–6.000 rpm no uso urbano e nunca force acima de 7.500 rpm por mais de 30 segundos seguidos. O motor responde bem ao uso tranquilo e tem vida longa se não for "espremido".',
  },
  {
    severity: 'WARN',
    title: 'Posição de dirigir e cansaço: ajuste o retrovisor antes de cada viagem longa',
    body: 'O estilo cruiser do Kansas 150 coloca os pés à frente e a posição inclina levemente o tronco para trás. Em viagens longas acima de 50 km, isso aumenta a tensão na lombar. Dica: ajuste o banco para a posição mais traseira (se ajustável no seu ano) e use o descanso do banco ao parar — evita cansaço prematuro e melhora a estabilidade.',
  },
  {
    severity: 'OK',
    title: 'Óleo: use 20W50 mineral no verão — motor de projeto simples chinês',
    body: 'Diferente das motos japonesas que pedem óleo sintético, o motor do Kansas 150 (de projeto chinês simples) funciona bem com óleo mineral 20W50 nos meses quentes. Use 10W40 semissintético no inverno em regiões sul e sudeste. Capacidade: ~1,0 L (verificar visor lateral). Intervalo: 3.000 km ou 3 meses.',
  },
  {
    severity: 'OK',
    title: 'Versão SE com freios a disco em ambas as rodas: fluido mais importante',
    body: 'A versão Kansas 150 SE tem freio a disco na roda dianteira E traseira — diferente da versão padrão que usa tambor atrás. Isso melhora a frenagem mas exige que o fluido DOT 4 de ambos os circuitos seja trocado a cada 2 anos, independente da quilometragem. Fluido contaminado com umidade reduz o ponto de ebulição e pode causar frenagem esponjosa. Motor, carburador e sistema elétrico são idênticos entre padrão e SE — as mesmas dicas de óleo e carburador se aplicam a ambas.',
  },
]

const KANSAS150_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Peças originais DAFRA inexistentes — use genéricas para motor 150cc chinês',
    body: 'Com o fim da produção destes modelos legados pela DAFRA, peças originais do Kansas 150 são impossíveis de encontrar em concessionárias. A boa notícia: o motor do Kansas 150 é um derivado do motor chinês de 150cc tipo CG (similar ao Honda CG 150 mas de fabricação chinesa). Isso significa que muitas peças genéricas para "motor 150cc chinês tipo CG" são compatíveis — pistão, anéis, velas, válvulas. Busque em distribuidoras de peças para motos chinesas. Custo é baixo.',
  },
  {
    severity: 'WARN',
    title: 'Carburador PZ26 entope com etanol abaixo de 93 INPM',
    body: 'O carburador PZ26 original do Kansas 150 é sensível à qualidade do etanol. Etanol abaixo de 93 INPM (comum em postos de beira de estrada no interior) deixa resíduos nos jets do carburador em 2–3 semanas. Sintoma: dificuldade para dar partida a frio e engasgo na retomada. Solução: limpeza ultrassônica do carburador (R$ 60–120 em oficinas de motos) a cada 15.000 km ou ao primeiro sinal de problema.',
  },
  {
    severity: 'WARN',
    title: 'Freio traseiro a tambor: ajuste obrigatório a cada 5.000 km (versão padrão)',
    body: 'O freio traseiro a tambor do Kansas 150 (versão padrão) desregula rapidamente. Com o cabo de freio traseiro esticando pelo uso, o tambor perde eficiência e exige mais pressão no pedal. Ajuste o cabo até ter 10–15 mm de folga livre no pedal. Lona de freio: substituição a cada 15.000–20.000 km (lonas genéricas 150cc custam R$ 30–60 o kit).',
  },
  {
    severity: 'WARN',
    title: 'Versão SE: pastilha de freio traseiro desgasta mais rápido pelo hábito do pedal',
    body: 'Na versão Kansas 150 SE, o freio traseiro a disco é acionado por pedal (não por manopla). Muitos proprietários pressionam o pedal traseiro com força excessiva por hábito do tambor — as pastilhas de disco se desgastam 30% mais rápido que o previsto. Inspecione as pastilhas a cada 10.000 km. Pastilhas genéricas para "disco traseiro 200mm moto chinesa" custam R$ 25–50 o par. Suportes do disco traseiro e cilindro escravo são mais difíceis de achar que peças da versão padrão — grupo Facebook "DAFRA Kansas Brasil" ajuda com compatibilidade.',
  },
  {
    severity: 'WARN',
    title: 'Farois e lanterna: lâmpadas fundem com mais frequência — tensão elétrica instável',
    body: 'O regulador de tensão original do Kansas 150 não é preciso, permitindo picos acima de 14,5V que queimam lâmpadas precocemente. Solução econômica: substituir o regulador de tensão original por um genérico de melhor qualidade (R$ 80–150 em sites de motos chinesas). Lâmpadas LED de encaixe direto também duram muito mais que halógenas nessa condição de tensão.',
  },
]

const KANSAS150_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Kansas 150 (padrão e SE): simples e barato de manter se feito em dia',
    body: '1.000 km — Troca de óleo inicial (20W50 mineral, ~1,0 L). | 3.000 km — Troca de óleo rotineira (20W50 mineral) + lubrificar corrente. | 5.000 km — Ajuste de freio traseiro a tambor (versão padrão) ou inspeção de pastilhas dianteira/traseira a disco (versão SE). Verificar nível de óleo. Inspecionar corrente (tensão e desgaste). | 10.000 km — Vela NGK CR7E (ou CR8E no verão). Limpar filtro de ar (esponja — lavar com gasolina + óleo de filtro). Limpar carburador PZ26. | 15.000 km — Lona de freio traseiro (padrão) ou fluido DOT 4 em ambos os discos (SE). Fluido DOT 3/4 do freio dianteiro. | 20.000 km — Trocar filtro de ar (esponja nova). Kit relação (corrente + pinhão + coroa). | 30.000 km — Verificar folga de válvulas. Rolamentos de roda. Na versão SE, inspecionar também o suporte do disco traseiro.',
  },
]

// ─── RIVA 150 ────────────────────────────────────────────────────────────────

const RIVA150_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Variador CVT: nunca abra o acelerador 100% em parada com motor frio',
    body: 'A Riva 150 usa transmissão CVT com roletes e correia. Abrir o acelerador bruscamente com motor frio causa escorregamento da correia e desgaste acelerado dos roletes de variação de rotação. Na saída a frio, acelere suavemente e progrida nos primeiros 2–3 km. A correia CVT nova custa R$ 60–120 em lojas genéricas — um cuidado simples dobra a vida útil.',
  },
  {
    severity: 'WARN',
    title: 'Porta-luvas não é à prova d\'água: proteja documentos em chuva',
    body: 'O porta-luvas da Riva 150 não tem vedação contra chuva — em chuva intensa ou lavagem a pressão direta, a água entra. Mantenha documentos em saco plástico ou use bolsa impermeável. Para uso diário em cidades com chuva frequente, aplique borracha vedante em espuma nas frestas do porta-luvas (R$ 5–10 em papelaria).',
  },
  {
    severity: 'OK',
    title: 'Óleo de câmbio CVT: não confunda com óleo de motor — compartimentos separados',
    body: 'A Riva 150 tem dois compartimentos de óleo: motor (10W30, ~0,8 L) e câmbio CVT (óleo de câmbio SAE 90 ou específico para CVT, ~0,1 L). Muitos proprietários não sabem da necessidade de trocar o óleo do câmbio separadamente. Troque o óleo do câmbio a cada 6.000 km. Verificar: bujão de drenagem na parte baixa do bloco do câmbio (lado direito).',
  },
]

const RIVA150_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Roletes do variador desgastam entre 8.000–12.000 km: ronco indica troca',
    body: 'O problema mais comum da Riva 150: os roletes (esferas) do variador de rotação se desgastam assimetricamente após 8.000–12.000 km. Sintoma: ronco crescente na aceleração, velocidade máxima cai, moto parece "cansada". Kit de roletes genérico para scooter 150cc chinês: R$ 20–50 no Ali Express ou distribuidoras de peças para scooters. Troca simples: desmonte a tampa do variador (lado direito) e substitua os 6 roletes.',
  },
  {
    severity: 'WARN',
    title: 'Correia CVT estica e escorrega após 15.000 km — sintoma: balanço na aceleração',
    body: 'A correia CVT original da Riva 150 tem vida útil de 15.000–20.000 km. Quando esticada, causa balanço rítmico perceptível na aceleração progressiva e perda de potência. Troca obrigatória: correia genérica para "scooter 150cc chinês CVT" em largura 18mm ou verifique as medidas impressas na correia. Custo: R$ 40–80. Troque junto com os roletes para otimizar o trabalho.',
  },
  {
    severity: 'DANGER',
    title: 'Peças específicas da Riva 150 sem fabricação nacional após fim da produção destes modelos legados pela DAFRA',
    body: 'Peças como o variador completo, o contra-variador e a bucha do eixo da roda traseira da Riva 150 não têm equivalente nacional catalogado após o fim da produção destes modelos legados pela DAFRA. Alternativa: medir as peças com paquímetro e buscar equivalentes genéricos para scooters chinesas de 150cc (família QMB139 de motor é a mais próxima). Grupo Facebook "Dafra Riva Brasil" mantém lista de compatibilidade atualizada pela comunidade.',
  },
]

const RIVA150_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Riva 150: CVT exige atenção especial além do motor',
    body: '1.000 km — Troca de óleo motor (10W30 semissintético, ~0,8 L). | 3.000 km — Troca de óleo motor rotineira + óleo câmbio CVT (SAE 90, ~0,1 L). | 6.000 km — Vela NGK CPR6EA-9. Limpar filtro de ar. Inspecionar correia CVT e roletes do variador. | 8.000–12.000 km — Kit de roletes do variador (se desgastados). | 15.000 km — Correia CVT (trocar). Fluido de freio DOT 4. | 20.000 km — Filtro de ar novo. Inspecionar rolamentos de roda. | 30.000 km — Verificar folga de válvulas. Inspecionar bucha do eixo traseiro.',
  },
]

// ─── RIVA 250 Z ──────────────────────────────────────────────────────────────

const RIVA250Z_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 250cc com arrefecimento a líquido: monitore o nível do radiador mensalmente',
    body: 'A Riva 250 Z tem motor a líquido (radiador frontal) — diferente da Riva 150 que é a ar. O nível do liquido de arrefecimento deve ser verificado mensalmente no reservatório externo. Use somente água destilada + aditivo anticorrosivo 50/50 (mistura pronta ou faça sua). Nunca use apenas água pura no circuito de arrefecimento de moto — corrói o bloco de alumínio.',
  },
  {
    severity: 'WARN',
    title: 'Parafusos da carenagem inferior: verifique após lavagem ou chuva forte',
    body: 'A carenagem inferior da Riva 250 Z abriga o radiador e tem aberturas para ventilação. Objetos projetados pelo pneu dianteiro (pedrinhas, gravetos) ficam retidos nessa área e podem afrouxar os parafusos de plástico (push-pins) da carenagem. Após lavagem ou chuva com estrada de terra, verifique se todos os push-pins estão encaixados para evitar perda de painéis em movimento.',
  },
]

const RIVA250Z_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Sistema de arrefecimento: vazamentos causam superaquecimento silencioso',
    body: 'A Riva 250 Z tem motor refrigerado a líquido de projeto chinês. O ponto fraco é o radiador e as mangueiras de silicone: após 4–5 anos, as mangueiras ressecam e podem ter microfissuras invisíveis que causam perda lenta de liquido. Sintoma quando já avançado: temperatura sobe rapidamente no painel digital, moto perde potência. Prevenção: inspeccionar as mangueiras anualmente, apertar as abraçadeiras e trocar liquido a cada 2 anos.',
  },
  {
    severity: 'WARN',
    title: 'Bomba d\'água: selo mecânico com vida útil de 30.000–40.000 km',
    body: 'A bomba d\'água da Riva 250 Z tem selo mecânico com vida útil média de 30.000–40.000 km. Quando o selo falha, o liquido de arrefecimento contamina o óleo motor (óleo com aparência leitosa = emergência). Inspeção: verifique o orifício de drenagem da bomba (dreno de drenagem no bloco) — se houver vazamento de liquido, o selo já falhou. Bomba compatível: busque por "bomba d\'água 250cc scooter chinesa refrigerada" nas dimensões correspondentes.',
  },
  {
    severity: 'WARN',
    title: 'Peças do sistema de arrefecimento são difíceis de encontrar após fim da produção destes modelos legados pela DAFRA',
    body: 'O termostato, a tampa do radiador e o sensor de temperatura da Riva 250 Z são itens que não têm número de catálogo nacional disponível. Alternativa: leve a peça a uma loja de radiadores automotivos — muitos termostatos de carro são adaptáveis com ajuste de encaixe. Grupo Facebook "Dafra Riva 250 Brasil" é a principal fonte para compatibilidade de peças.',
  },
]

const RIVA250Z_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Riva 250 Z: arrefecimento a líquido adiciona itens ao cronograma',
    body: '3.000 km — Troca de óleo motor (10W30 semissintético, ~1,0 L) + óleo câmbio CVT. | 6.000 km — Vela NGK CPR8EA-9. Inspecionar correia CVT e roletes. | 10.000 km — Filtro de ar. Verificar liquido de arrefecimento (nível e coloração). | 15.000 km — Kit roletes variador. Correia CVT se desgastada. Fluido de freio DOT 4. | 24.000 km — Trocar liquido de arrefecimento (Motul Inugel G13 ou equivalente, 50%+água destilada). Inspecionar mangueiras do radiador. | 30.000 km — Inspeção da bomba d\'água (selo mecânico). Rolamentos de roda.',
  },
]

// ─── SPEED 150 ───────────────────────────────────────────────────────────────

const SPEED150_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Sport 150cc sem turbo: deixe o motor respirar acima de 5.000 rpm para limpar',
    body: 'O motor monocilíndrico 150cc do Speed 150 funciona melhor quando operado em toda a sua faixa de rotação regularmente. Andar sempre em baixa rotação (abaixo de 4.000 rpm) faz o motor "encharcar" e acumular carbono nas válvulas e câmara de combustão. Uma vez por semana, em local seguro, abra o acelerador e deixe a moto girar até a zona de corte por 5–10 segundos — limpa o motor naturalmente.',
  },
  {
    severity: 'WARN',
    title: 'Pneus traseiros: pressão incorreta causa instabilidade em curvas',
    body: 'O Speed 150 tem geometria esportiva com inclinação para curvas. Pneu traseiro com pressão abaixo de 32 PSI causa instabilidade perceptível ao incliniar na curva — a moto "bamboleia" levemente. Calibre sempre com pneu frio: dianteiro 30 PSI, traseiro 33 PSI. Não ultrapasse 38 PSI no traseiro mesmo com piloto pesado — compromete aderência.',
  },
]

const SPEED150_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Carburador: mistura pobre em altitude acima de 500m — rejeite mais gordo',
    body: 'O Speed 150 sai de fábrica com o carburador calibrado para nível do mar. Em cidades acima de 500m de altitude (Belo Horizonte, Curitiba, Brasília, São Paulo), a mistura fica pobre causando engasgo e falta de potência. Solução: subir 1 nível no clip da agulha do carburador (posição 3→4 de cima) ou aumentar o jet principal em 2 números. Requer mecânico com experiência em carburadores.',
  },
  {
    severity: 'WARN',
    title: 'Bengala dianteira simples com curso curto: evite buracos em alta velocidade',
    body: 'A bengala dianteira do Speed 150 é simples e tem curso limitado (~120 mm). Em buracos em alta velocidade (acima de 60 km/h), o batente é atingido e a força é transmitida diretamente ao guidão — risco de perda de controle. Em percursos com muitos buracos, reduza a velocidade abaixo de 40 km/h para buracos fundos.',
  },
  {
    severity: 'DANGER',
    title: 'Peças elétricas: CDI e bobina de ignição sem reposição nacional após fim da produção destes modelos legados pela DAFRA',
    body: 'A CDI (unidade de ignição) e a bobina do Speed 150 são os itens mais críticos sem reposição garantida. CDI com defeito = moto não dá partida, sem luz de injeção (é CDI, não ECU). Antes de comprar uma Speed 150 usada, teste a ignição e carregue a bateria — CDI ruim não dá partida com bateria fraca. Para achar reposição: CDI genérica para "moto 150cc chinesa AC/DC CDI" com mesmo número de pinos pode funcionar. Busque em fóruns de mecânicos de chinesas.',
  },
]

const SPEED150_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Speed 150: motor de baixo custo que exige atenção regular',
    body: '3.000 km — Troca de óleo motor (10W40 semissintético, ~1,0 L). Lubrificar corrente. | 5.000 km — Verificar tensão da corrente. Limpar filtro de ar. | 10.000 km — Vela NGK CR8E. Limpar carburador (remover jets e soprar). Inspecionar pastilhas de freio dianteiro. | 15.000 km — Lona/pastilha de freio traseiro. Fluido DOT 3 (dianteiro). | 20.000 km — Trocar filtro de ar. Kit relação se desgastado. | 30.000 km — Verificar folga de válvulas. Inspecionar CDI e bobina (teste de centelha). Rolamentos de roda.',
  },
]

// ─── ZR 150 ──────────────────────────────────────────────────────────────────

const ZR150_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Trail urbana: calibre os pneus para o asfalto, não para off-road',
    body: 'A ZR 150 tem pneus misto asfalto/terra. Muitos proprietários a usam exclusivamente na cidade. Para uso urbano, calibre: dianteiro 26 PSI, traseiro 29 PSI. Para uso off-road em terra/trilha, reduza para 22 PSI (frente) e 25 PSI (trás) — aumenta aderência e reduz risco de furo. Recalibre sempre ao retornar ao asfalto.',
  },
  {
    severity: 'WARN',
    title: 'Protetor de motor original em plástico: troque por protetor de aço para uso off-road real',
    body: 'O protetor de motor original da ZR 150 é de plástico — inadequado para uso em trilhas com pedras. Em impacto direto, o plástico quebra e o cárter fica exposto. Se você pretende usar a ZR 150 em trilhas moderadas, instale um protetor de motor em aço inox ou alumínio compatível (universal para motos trail 150cc). Custo: R$ 100–200 em lojas de acessórios.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: limpe a cada 2.000 km em uso misto terra/asfalto',
    body: 'Em uso off-road e em estradas de terra, o filtro de ar da ZR 150 entope mais rápido. Inspecione o filtro (esponja de espuma) a cada 2.000 km se o uso incluir terra. Lave com gasolina, esprema (não torça), aplique óleo de filtro ou óleo de motor limpo na esponja antes de reinstalar. Filtro entupido causa perda de potência e pode queimar o motor em uso off-road contínuo.',
  },
]

const ZR150_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Suspensão dianteira com garfos simples: vedante com vazamento em uso off-road',
    body: 'A bengala dianteira da ZR 150 tem vedante de menor qualidade que motos trail japonesas. Uso frequente em terrenos irregulares acelera o desgaste do vedante — vazamento de óleo da bengala é comum após 15.000–20.000 km de uso misto. Vedante genérico para "bengala 35mm trail 150cc chinesa": R$ 15–30 o par. Troca exige desmontagem da bengala — serviço de R$ 80–150 em oficina.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedor traseiro perde gás rapidamente em uso off-road',
    body: 'O amortecedor traseiro original da ZR 150 perde eficiência rapidamente em uso off-road (trilhas moderadas, estradas irregulares). Após 10.000–15.000 km de uso misto, bate frequentemente no batente. Substituição por amortecedor genérico compatível (olhais de mesma dimensão, comprimento similar): R$ 120–250. YSS e Cofap têm modelos compatíveis com melhor qualidade.',
  },
  {
    severity: 'WARN',
    title: 'Corrente de transmissão: use DID ou RK — não use corrente genérica em off-road',
    body: 'A corrente original da ZR 150 não é adequada para uso off-road intenso. Correntes genéricas baratas quebram em trilhas com lama (abrasão acelerada). Invista em corrente DID 420 ou RK 420 com roletes vedados (O-ring) — custo R$ 80–120 mas dura 3–4x mais em uso misto. Tensão de corrente: 10–15 mm de folga no ponto médio inferior.',
  },
]

const ZR150_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma ZR 150: uso off-road exige intervalos mais curtos',
    body: '2.000 km (off-road) / 3.000 km (asfalto) — Troca de óleo motor (10W40 semissintético, ~1,0 L). | 500 km (off-road) / 1.000 km (asfalto) — Lubrificar corrente. | 2.000 km — Limpar filtro de ar (esponja). | 5.000 km — Verificar tensão corrente. Bengala: inspecionar vedante por manchas de óleo. | 10.000 km — Vela NGK CR7E ou D8EA. Kit relação se necessário. | 15.000 km — Vedante da bengala (se vazando). Fluido DOT 4. Inspecionar amortecedor traseiro. | 20.000 km — Filtro de ar novo. Rolamentos de roda. Folga de válvulas.',
  },
]

// ─── ZR 200 ──────────────────────────────────────────────────────────────────

const ZR200_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 200cc: mais torque que a ZR 150 — use a relação de marchas a seu favor',
    body: 'O motor 200cc da ZR 200 tem mais torque disponível em baixa rotação que a ZR 150. Em trilhas, você pode andar em marcha mais alta (3ª em vez de 2ª) mantendo velocidade baixa — o motor "arrasta" sem engasgar. Isso reduz o calor gerado em uso off-road lento e melhora a eficiência de combustível nas trilhas.',
  },
  {
    severity: 'WARN',
    title: 'Peso: 14 kg a mais que a ZR 150 — afetar manobrabilidade em off-road estreito',
    body: 'A ZR 200 é notavelmente mais pesada que a ZR 150 (aprox. 136 kg vs 122 kg). Em trilhas estreitas e manobras de baixa velocidade off-road, esse peso extra é perceptível e exige mais esforço físico do piloto. Para iniciantes no off-road, a ZR 150 é mais manejável. Para quem já tem experiência, o torque extra da 200cc compensa.',
  },
]

const ZR200_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Cabeçote: vazamento de óleo pela tampa é mais comum que na ZR 150',
    body: 'O motor 200cc da ZR 200 opera em temperaturas ligeiramente mais altas que o 150cc, o que acelera o ressecamento da junta da tampa do cabeçote. Vazamento de óleo pela tampa após 20.000–25.000 km é recorrente. Troque a junta junto com óleo a cada 20.000 km preventivamente — a junta custa R$ 20–40 e evita a sujeira de óleo na carenagem.',
  },
  {
    severity: 'DANGER',
    title: 'Mesma criticidade de peças que todas as DAFRA — ZR 200 tem ainda menos reposição',
    body: 'A ZR 200 foi produzida em menor quantidade que a ZR 150, tornando a situação de peças ainda pior após o fim da produção destes modelos legados pela DAFRA. Peças específicas do motor 200cc (pistão, anel, comando) têm equivalentes genéricos em distribuidoras de motos chinesas — procure por motor "200cc chinês tipo WH200" ou "Loncin 200cc" pelas dimensões internas. A comunidade no Facebook "ZR Trail Brasil" é essencial.',
  },
  {
    severity: 'WARN',
    title: 'Bengala e amortecedor: os mesmos problemas da ZR 150, mas com mais peso',
    body: 'As mesmas limitações da suspensão da ZR 150 se aplicam à ZR 200 — mas agravadas pelo peso maior. O amortecedor traseiro original perde gás mais rapidamente. Prioridade de melhoria: amortecedor traseiro de qualidade (YSS ou similar) — o investimento R$ 150–300 muda completamente o caráter da moto em trilhas.',
  },
]

const ZR200_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma ZR 200: mesmos intervalos da ZR 150 com atenção extra ao cabeçote',
    body: '3.000 km — Troca de óleo motor (10W40 semissintético, ~1,2 L). | 500 km (off-road) / 1.000 km (asfalto) — Lubrificar corrente. | 2.000 km — Limpar filtro de ar em uso off-road. | 5.000 km — Verificar tensão corrente. Inspecionar bengala. | 10.000 km — Vela NGK DR8EA ou CPR9EA. | 15.000 km — Fluido DOT 4. Vedante da bengala se necessário. | 20.000 km — Trocar junta da tampa do cabeçote (preventivo). Kit relação. Filtro de ar. | 25.000 km — Folga de válvulas. Rolamentos de roda.',
  },
]

// ─── CITYCOM 300I ────────────────────────────────────────────────────────────

const CITYCOM300I_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 300cc refrigerado a líquido: o mais robusto da linha DAFRA',
    body: 'O Citycom 300i é o scooter mais robusto da linha DAFRA, com motor 300cc a líquido e injeção eletrônica. O motor tem qualidade superior aos modelos 150cc da marca e maior durabilidade quando mantido corretamente. Dito isso, o mesmo problema de peças pós-fim da produção destes modelos legados pela DAFRA se aplica — e aqui as peças são mais caras e difíceis de encontrar por se tratar de um scooter premium.',
  },
  {
    severity: 'WARN',
    title: 'Sistema de freios CBS: não force somente o freio dianteiro — use ambos',
    body: 'O Citycom 300i tem sistema CBS (Combined Brake System) que distribui a frenagem entre frente e trás ao acionar o freio dianteiro. Evite usar SOMENTE o freio traseiro em altas velocidades — o CBS não funciona em sentido inverso. Freie sempre com os dois freios, priorizando o dianteiro em freadas de emergência.',
  },
  {
    severity: 'OK',
    title: 'Porta objetos no banco: peso máximo é 5 kg — não exceda',
    body: 'O baú sob o banco do Citycom 300i tem limite de peso de 5 kg. Exceder esse limite não quebra o banco imediatamente, mas deforma as travas e os trilhos de fixação ao longo do tempo — eventualmente o banco não trava corretamente. Em viagens com carga, use bauleto traseiro de fixação no rack.',
  },
]

const CITYCOM300I_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'ECU e peças eletrônicas: praticamente sem reposição no Brasil',
    body: 'O Citycom 300i tem o sistema eletrônico mais complexo da linha DAFRA. A ECU, os sensores de temperatura e o módulo do CBS não têm equivalentes nacionais catalogados. Com o fim da produção destes modelos legados pela DAFRA, falha eletrônica pode inviabilizar o scooter. Antes de comprar um Citycom 300i usado: teste todos os sistemas eletrônicos, peça histórico de manutenção e verifique se o vendedor tem alguma peça de reposição. Grupos de proprietários online são a única fonte de peças e diagnóstico.',
  },
  {
    severity: 'WARN',
    title: 'Sistema CBS: risco de freio sensível demais após manutenção incorreta',
    body: 'O CBS do Citycom 300i exige calibração específica ao substituir pastilhas ou fluido. Manutenção mal feita pode deixar o sistema hipersensível ao freio traseiro — frenagem brusca. Sempre que mexer no sistema de freios, teste em área segura antes de usar no trânsito. Se perceber freada estranha após manutenção, volte à oficina para recalibrar.',
  },
  {
    severity: 'WARN',
    title: 'Radiador: aletas entopem com poeira e folhas em uso urbano',
    body: 'O radiador frontal do Citycom 300i fica exposto e acumula poeira, folhas e insetos nas aletas em uso urbano. A cada 5.000 km, inspecione o radiador e limpe as aletas com jato de água suave (de trás para frente) ou ar comprimido. Radiador entupido reduz a eficiência do resfriamento e aumenta a temperatura de operação do motor.',
  },
]

const CITYCOM300I_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Citycom 300i: o mais complexo da linha DAFRA',
    body: '3.000 km — Troca de óleo motor (10W30 semissintético, ~1,0 L). | 6.000 km — Vela NGK CR9EH-9. Inspecionar correia CVT e roletes. | 10.000 km — Filtro de ar. Limpar aletas do radiador. Pastilhas de freio CBS (frente). | 15.000 km — Correia CVT (trocar). Kit de roletes do variador. Fluido DOT 4 (frente e trás — CBS). | 24.000 km — Líquido de arrefecimento (trocar completo). Inspecionar mangueiras do radiador. | 30.000 km — Inspeção da bomba d\'água. Rolamentos de roda. Inspecionar CBS.',
  },
]

// ─── NH 190 ──────────────────────────────────────────────────────────────────

const NH190_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Naked com 190cc: posição semi-alta facilita o trânsito urbano intenso',
    body: 'A NH 190 tem posição de dirigir semi-ereta (entre naked e esportiva), com guidão mais alto que o Apache. Isso facilita muito a visibilidade no trânsito urbano e reduz o cansaço nas costas em percursos curtos. Para uso exclusivamente urbano, é a melhor ergonomia da linha DAFRA.',
  },
  {
    severity: 'WARN',
    title: 'Motor 190cc: posição entre 150cc e 200cc — use óleo 10W40 semissintético',
    body: 'O motor 190cc da NH 190 é uma cilindrada incomum — fica entre os 150cc e 200cc mais populares. Use 10W40 semissintético (não o 20W50 mineral dos 150cc mais simples). Capacidade: ~1,1 L com filtro. O óleo mais encorpado protege melhor o motor que opera em temperaturas ligeiramente maiores que os 150cc.',
  },
]

const NH190_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Farol dianteiro com alinhamento saindo em buracos: aperte os parafusos regularmente',
    body: 'O suporte do farol dianteiro da NH 190 usa parafusos de fixação que afrouxam em uso com buracos frequentes. O farol desalinhado ilumina a pista lateralmente em vez de à frente — risco de segurança. A cada 5.000 km ou ao perceber o farol "torto", aperte os parafusos de fixação do farol (4 parafusos visíveis na carenagem).',
  },
  {
    severity: 'WARN',
    title: 'Carburador Mikuni: engasgo característico em manobras de U em baixa velocidade',
    body: 'A NH 190 tem engasgo característico ao fazer curvas fechadas de baixa velocidade (retorno em U, rotundas) especialmente com motor frio. O carburador Mikuni tem jato de marcha lenta que pode estar calibrado levemente pobre. Ajuste: parafuso de mistura (ar/gasolina) em 2,5 voltas a partir do fechado. Melhora significativamente a resposta em manobras a baixa velocidade.',
  },
  {
    severity: 'DANGER',
    title: 'NH 190: modelo com menor comunidade — mais difícil de achar peças e informação',
    body: 'A NH 190 foi vendida em menor volume que Apache e Kansas, tornando a base de proprietários menor. Após o fim da produção destes modelos legados pela DAFRA, a comunidade de suporte online é a menor entre os modelos da marca. Antes de comprar uma NH 190: verifique se há membros ativos nos grupos de Facebook para esse modelo específico. Para peças de motor, busque por "motor 190cc chinês monocilíndrico" — algumas distribuidoras têm peças para essa família de motores.',
  },
]

const NH190_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma NH 190: manutenção similar às trails, mas para uso urbano',
    body: '3.000 km — Troca de óleo motor (10W40 semissintético, ~1,1 L). | 5.000 km — Verificar corrente (tensão e lubrificação). Limpar filtro de ar. | 10.000 km — Vela NGK D8EA ou CR8E. Limpar carburador Mikuni. Pastilhas de freio dianteiro. | 15.000 km — Fluido DOT 4. Lona de freio traseiro (tambor). | 20.000 km — Kit relação (corrente + pinhão + coroa). Filtro de ar novo. | 25.000 km — Folga de válvulas. Verificar alinhamento do farol. Rolamentos de roda.',
  },
]

// ─── HORIZON 150 ─────────────────────────────────────────────────────────────
// Motor 149cc SOHC ar, CVT, carburador tipo GY6 PD24J/CVK24
// Plataforma GY6 — ampla compatibilidade com peças genéricas chinesas

const HORIZON150_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Correia CVT: principal peça de desgaste — troque a cada 20.000 km',
    body: 'A correia CVT é o coração da transmissão do Horizon 150. Sinais de desgaste: aceleração preguiçosa, "escorregada" ao arrancar, barulho de estalo no variador. Troque a cada 20.000 km ou antes se aparecerem rachaduras. Correia quebrada paralisa a moto imediatamente. Dimensões GY6 padrão: 835×20×30 mm — busque "correia CVT scooter 150 GY6" em lojas de motos chinesas. Custo: R$ 40–80.',
  },
  {
    severity: 'OK',
    title: 'Roletes do variador: inspecione aos 10.000 km — formato oval causa arranque fraco',
    body: 'Os roletes do variador do Horizon 150 desgastam em formato oval com o uso. Quando ovalizados, o variador não abre suavemente e o arranque fica lerdo mesmo com o motor respondendo bem. A inspeção é simples: abra o variador e role os roletes na palma da mão — se não rolarem perfeitamente redondos, troque. Kit com 6 roletes GY6 (peso padrão 15 g) custa R$ 25–50 em lojas de scooter ou Ali Express.',
  },
  {
    severity: 'WARN',
    title: 'Filtro de ar (esponja): limpe a cada 3.000 km em cidade — sujeira prejudica o carburador',
    body: 'O Horizon 150 usa filtro de ar do tipo esponja. Em uso urbano, acumula sujeira rápido. Filtro sujo causa mistura rica, aumento de consumo e fuligem na vela. Limpeza: lave com água e detergente neutro, seque completamente ao sol, aplique uma gota de óleo e retire o excesso antes de reinstalar. Substitua a esponja por uma nova a cada 10.000 km.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR7HSA: verifique a cada 6.000 km — eletrodo gasto agrava engasgo e consumo',
    body: 'A vela original do Horizon 150 é a NGK CR7HSA (equivalente Denso U22FSR-U). A cada 6.000 km, retire e inspecione: eletrodo desgastado ou cobertura de fuligem indicam problema de regulagem do carburador. Gap correto: 0,6–0,7 mm. Vela nova (R$ 15–25) pode resolver engasgo, dificuldade na partida e consumo elevado. Troque sempre a cada 10.000 km independente da aparência.',
  },
  {
    severity: 'OK',
    title: 'Óleo do câmbio: compartimento separado do motor — muitos proprietários esquecem',
    body: 'O Horizon 150 tem dois compartimentos de óleo separados: motor (~1,0 L de 10W30) e câmbio/transmissão final (~100 mL de óleo SAE 90 ou 10W40 semissintético). O bujão do câmbio fica na tampa lateral direita (não confundir com o bujão do motor). Troque o óleo do câmbio a cada 6.000 km — óleo velho contamina o mecanismo do tambor da embreagem centrífuga e causa patinação.',
  },
  {
    severity: 'OK',
    title: 'Afogador (choke) na partida a frio: use apenas 1–2 minutos — não deixe mais que isso',
    body: 'O Horizon 150 tem afogador manual (alavanca no painel ou no carburador). Na partida a frio abaixo de 20°C, ative o afogador, dê partida e aguarde o motor estabilizar (~1 minuto). Depois desative o afogador imediatamente — deixar ativado por mais tempo inunda o motor com gasolina, deposita resíduo na vela e aumenta o consumo. Se não der partida em 3–4 tentativas sem afogador, verifique a vela e a bóia do carburador.',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas GY6: o segredo para manter a Horizon 150 sem DAFRA',
    body: 'A Horizon 150 usa plataforma GY6 (padrão internacional de scooters chineses 150cc). Isso significa que as seguintes peças têm equivalentes genéricos amplamente disponíveis: correia CVT (835×20×30 mm), roletes variador (15 g, 6 unidades), vela NGK CR7HSA, filtro de ar esponja GY6, carburador PD24J 24mm completo (R$ 60–120), pistão e anel 57,4mm (R$ 80–150), embreagem centrífuga GY6 150cc (R$ 100–180), pastilha de freio dianteiro disco 220mm. Busque nesses termos no Mercado Livre e Ali Express. A comunidade "Dafra Horizon Brasil" no Facebook mantém lista atualizada de compatibilidades.',
  },
  {
    severity: 'WARN',
    title: 'Consumo e autonomia: 35–42 km/L é o esperado — desvia significa problema',
    body: 'O consumo normal da Horizon 150 fica entre 35–42 km/L com uso urbano moderado. Consumo abaixo de 30 km/L é sinal de problema: filtro de ar sujo, bóia do carburador regulada errada (nível de combustível alto), vela desgastada ou roletes do variador ovalizados (motor gira mais alto para mesma velocidade). Tanque de 7,5 L dá autonomia de 260–315 km. Reserve sempre 1,5 L (reserva acende no painel quando restam ~1,5–2,0 L).',
  },
]

const HORIZON150_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'DAFRA descontinuou este modelo — use peças GY6 genéricas para manter a Horizon 150',
    body: 'Com o fim da produção deste modelo legado pela DAFRA, peças originais estão esgotadas. A boa notícia: o motor 149cc GY6 da Horizon 150 é um dos mais replicados do mundo — peças genéricas são abundantes. Peças de carroceria (carenagens, espelhos, faróis): buscar no Mercado Livre por "Dafra Horizon 150" + ano. Para peças de motor e CVT, use os termos "GY6 150cc" e as dimensões exatas. Mecânicos especializados em motos chinesas conhecem bem esse motor. Grupo Facebook "Dafra Horizon Brasil" centraliza compatibilidades descobertas pela comunidade.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem centrífuga: patinação após 15.000–20.000 km — sinal é arranque fraco com motor "revando"',
    body: 'A embreagem centrífuga do Horizon 150 fica no lado do câmbio (câmara seca direita, separada do variador). As pastilhas da embreagem desgastam ao longo do tempo. Sintoma: motor aumenta rotação na saída mas a moto não avança proporcionalmente — especialmente perceptível em subidas. Diagnóstico: com a moto em ponto morto, abra levemente o acelerador — se a embreagem engata antes de 3.000 rpm, as pastilhas estão desgastadas. Kit de embreagem centrífuga GY6 150cc: R$ 100–180. A contaminação do câmbio com óleo velho acelera o desgaste — troque o óleo do câmbio a cada 6.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Carburador PD24J: bóia emperra e inunda o motor — sintoma é gasolina pela descarga',
    body: 'O carburador do tipo PD24J/CVK24 usado na Horizon 150 tem bóia plástica com ponteiro de agulha. Quando a agulha ou o assento desgasta, a bóia não fecha o fluxo de combustível corretamente — gasolina entra em excesso, afoga o motor e pode escorrer pela descarga. Sintoma: cheiro forte de gasolina, fumaça preta ao dar partida, vela encharcada. Solução: limpar o carburador com ultrassom (R$ 60–120) e verificar nível da bóia. Se o ponteiro estiver desgastado, troque o kit de reparo do carburador (R$ 20–40 para kit agulha+assento GY6).',
  },
  {
    severity: 'WARN',
    title: 'Bengala dianteira: vaza vedante após 15.000–20.000 km — manchas de óleo na roda são o sinal',
    body: 'O vedante da bengala dianteira do Horizon 150 tem vida útil de 15.000–20.000 km em uso normal. Sinal: manchas de óleo na roda dianteira ou na parte inferior da bengala. Bengala vazando prejudica o amortecimento e representa risco de segurança em freadas bruscas. Troca do vedante: serviço simples em qualquer oficina — custo R$ 80–150 com mão de obra. Peça vendida como "retén de bengala 33mm" ou "vedante bengala scooter 33×46×11" em lojas de peças de motos.',
  },
  {
    severity: 'WARN',
    title: 'Regulador de tensão (retificador): queima lâmpadas e danifica CDI quando falha',
    body: 'O regulador de tensão original do Horizon 150 permite picos acima de 15V que queimam lâmpadas halógenas (especialmente traseira) com frequência e, em casos graves, danificam a CDI. Diagnóstico: com motor em 4.000 rpm e multímetro na bateria — tensão acima de 14,8V indica regulador com defeito. Substituição: regulador genérico "retificador scooter 5 fios" compatível com GY6 — R$ 50–100. Lâmpadas LED de encaixe direto (BA15S traseiro) duram muito mais que halógenas mesmo com picos de tensão.',
  },
  {
    severity: 'WARN',
    title: 'Chicote elétrico: conectores oxidam após 2–3 anos — causa falhas intermitentes',
    body: 'O chicote elétrico do Horizon 150 usa conectores de qualidade modesta. Em regiões litorâneas ou com muita chuva, os conectores oxidam. Sintomas: velocímetro errático, pisca-pisca que para de funcionar, chave de ignição com falha intermitente. Solução: limpar todos os conectores com spray WD-40 Contato e aplicar graxa dielétrica (R$ 20–40). Resolução definitiva: substituir os conectores originais por modelos Tyco de mesma bitola — disponíveis em lojas de eletrônica.',
  },
]

const HORIZON150_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Horizon 150: scooter GY6/CVT tem dois óleos e transmissão automática',
    body: '3.000 km — Óleo motor (10W30 semissintético, ~1,0 L) + limpar filtro de ar (esponja). | 6.000 km — Óleo câmbio CVT (SAE 90, ~100 mL). Vela NGK CR7HSA. Inspecionar roletes variador (6× 15 g). Inspecionar correia CVT (rachaduras = trocar imediatamente). | 10.000 km — Pastilhas de freio dianteiro (disco 220mm). Lona de freio traseiro (tambor). Filtro de ar novo (esponja). | 15.000 km — Fluido de freio DOT 4. | 20.000 km — Correia CVT nova (835×20×30 mm GY6). Kit roletes variador. Inspecionar vedante bengala 33mm. | 30.000 km — Rolamentos de roda. Inspeção embreagem centrífuga (pastilhas). Revisão completa do conjunto CVT.',
  },
]

// ─── HORIZON 250 ─────────────────────────────────────────────────────────────

const HORIZON250_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Arrefecimento líquido: use 50% anticongelante + 50% água destilada — jamais água comum',
    body: 'O motor 249cc do Horizon 250 é refrigerado a água. Use sempre mistura 50% anticongelante (etileno glicol) + 50% água destilada — nunca água da torneira, pois os sais minerais incrustam no radiador e no bloco ao longo do tempo. Verifique o nível no reservatório auxiliar (translúcido) a cada 1.000 km — o nível deve estar entre MIN e MAX. Qualquer marca de anticongelante para radiadores de carro funciona.',
  },
  {
    severity: 'OK',
    title: 'Correia CVT: troque a cada 15.000–20.000 km — motor 250cc desgasta mais rápido',
    body: 'A correia CVT do Horizon 250 suporta mais torque que a versão 150cc e desgasta mais rápido em uso intenso. Sinais de desgaste: aceleração escorregada, arranque fraco, barulho de farelo ao abrir o gás. Com calor intenso (verão, cidades do Norte/Nordeste), o intervalo pode cair para 12.000 km. Guarde uma correia reserva em viagens longas — correia quebrada paralisa imediatamente.',
  },
  {
    severity: 'OK',
    title: 'Roletes variador: use peso correto conforme manual (geralmente 15–18 g) — não altere',
    body: 'O variador do Horizon 250 usa roletes com peso específico (geralmente 15–18 gramas, conforme manual). Não troque por roletes mais leves buscando "mais arrancada" — isso aumenta o desgaste da polia e prejudica a velocidade máxima. Roletes com deformação visual ou ovalizados: troque o kit completo. Kit de 6 roletes originais ou compatíveis: R$ 50–120 em lojas de peças de scooter.',
  },
  {
    severity: 'WARN',
    title: 'Radiador frontal: limpe as aletas a cada 5.000 km — entope com folhas e insetos',
    body: 'O radiador frontal do Horizon 250 fica exposto e acumula folhas, insetos e poeira nas aletas em uso urbano. Radiador entupido reduz o fluxo de ar e aumenta a temperatura de operação — risco de superaquecimento no trânsito parado. Limpeza: jato de água suave direcionado de dentro para fora (do motor para a frente) ou ar comprimido. Faça sempre que lavar a moto.',
  },
  {
    severity: 'OK',
    title: 'Óleo motor 10W30 semissintético: capacidade ~1,1 L — não encha acima do MAX',
    body: 'O motor 249cc do Horizon 250 tem capacidade de ~1,1 L de óleo. Encher acima do MAX causa excesso de pressão no sistema e pode forçar óleo pelo respiro do motor para o filtro de ar. Após a troca, aguarde 2 minutos com motor ligado, desligue, espere 5 minutos e verifique a vareta. O nível sobe ligeiramente com o motor aquecido — isso é normal.',
  },
]

const HORIZON250_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Modelo descontinuado: peças eletrônicas e de arrefecimento raríssimas no Brasil',
    body: 'O Horizon 250 é o modelo de maior complexidade mecânica da linha DAFRA, com motor refrigerado a líquido e injeção eletrônica (modelos pós-2015). Com o fim da produção destes modelos legados pela DAFRA, a ECU, sensores de temperatura, bomba d\'água e módulos eletrônicos estão praticamente indisponíveis. Antes de comprar um Horizon 250 usado: teste TODOS os sistemas eletrônicos em frio e em temperatura de operação; verifique histórico de manutenção do arrefecimento; pergunte se há peças de reposição disponíveis. Grupos no Facebook "DAFRA Horizon Brasil" e "Scooter Brasil" são as principais fontes de informação e peças usadas.',
  },
  {
    severity: 'WARN',
    title: 'Correia CVT pode quebrar antes dos 15.000 km em clima quente ou com uso pesado',
    body: 'Relatos de proprietários indicam que a correia CVT original do Horizon 250 tem vida útil reduzida em regiões muito quentes (Norte e Nordeste) ou com garupa constante. A correia resseca e racha com mais facilidade em temperatura alta no variador. Solução: antecipe a troca para 12.000 km se usar em clima quente. Para correia de reposição, meça as dimensões originais e busque "CVT belt 250cc" em lojas do Mercado Livre especializadas em scooter.',
  },
  {
    severity: 'WARN',
    title: 'Mangueiras do radiador: inspecione anualmente — enrijecem e podem romper em movimento',
    body: 'As mangueiras do sistema de arrefecimento do Horizon 250 enrijecem e perdem elasticidade com o calor do motor ao longo do tempo. Mangueira rompida em movimento causa perda rápida de líquido e superaquecimento — o motor pode ser danificado em minutos. A cada 12 meses ou 15.000 km, inspecione todas as mangueiras visíveis: aperte suavemente — se estiverem duras e quebradiças, troque preventivamente. Mangueiras genéricas de borracha do mesmo diâmetro interno funcionam como substituto.',
  },
]

const HORIZON250_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Horizon 250: maxi-scooter refrigerado a líquido exige mais atenção',
    body: '1.000 km — Verificação visual do nível de arrefecimento (reservatório auxiliar). | 3.000 km — Óleo motor (10W30 semissintético, ~1,1 L). | 5.000 km — Limpar aletas do radiador. | 6.000 km — Vela NGK CR9EH-9. Inspecionar roletes variador. Inspecionar correia CVT. | 10.000 km — Filtro de ar. Pastilhas de freio frente e trás. Inspecionar mangueiras do radiador. | 15.000 km — Fluido de freio DOT 4. Correia CVT (inspeção — trocar se rachaduras). | 20.000 km — Kit roletes variador (trocar). Correia CVT nova (preventivo). | 24.000 km — Trocar líquido de arrefecimento (mistura 50% anticongelante). Inspecionar bomba d\'água. | 30.000 km — Rolamentos de roda. Revisão completa do sistema CVT.',
  },
]

// ─── NEXT 250 ────────────────────────────────────────────────────────────────
// Motor 249cc SOHC ar, carburador, 5 marchas, corrente
// Plataforma chinesa 250cc — similar à família CB250 clone

const NEXT250_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Corrente de transmissão: lubrifique a cada 500 km — é a manutenção mais negligenciada',
    body: 'A corrente da NEXT 250 é o item que mais afeta custo de manutenção quando negligenciado. Sem lubrificação regular, a corrente estica rápido e desgasta o kit relação (pinhão + coroa) — troca em conjunto custa R$ 250–450. Com lubrificação a cada 500 km (spray de corrente ou óleo 80W90 aplicado com pincel), o kit dura 20.000–25.000 km. Ajuste de folga: 25–35 mm de jogo vertical no ponto mais tenso. Corrente nova com excesso de folga ou com elos rígidos: troque imediatamente.',
  },
  {
    severity: 'OK',
    title: 'Óleo motor 10W40 semissintético: troque a cada 3.000 km — motor chines é mais sensível',
    body: 'O motor 249cc da NEXT 250 tolera bem 10W40 semissintético, mas não recomende sintético total em motores com mais de 20.000 km (pode aumentar consumo de óleo por gaps de desgaste). Capacidade aproximada: 1,3–1,5 L — encher até a marca MAX na vareta, não além. Óleo velho (cor escura e cheiro de queimado) = motor trabalha mais quente e desgasta mais rápido. Intervalo máximo: 3.000 km ou 6 meses, o que vier primeiro.',
  },
  {
    severity: 'WARN',
    title: 'Carburador: bóia precisa de ajuste fino — altitude e etanol afetam a mistura',
    body: 'O carburador da NEXT 250 (tipo PD26 ou similar) é sensível a variações de altitude e combustível. Com etanol acima de 27% (gasolina E27 comum no Brasil), pode ocorrer engasgo entre 3.000–5.000 rpm. Sintoma de mistura pobre: motor "engasga" na aceleração e soluça em retomada. Solução: jet de agulha subir um entalhe (mais rico). Em altitude acima de 800 m: descer um entalhe (mais pobre). Regulagem do piloto de marcha lenta: 2,5 voltas a partir do fechado — ajuste com motor quente.',
  },
  {
    severity: 'OK',
    title: 'Folga de válvulas: ajuste a cada 10.000 km — ruído de "tintin" indica folga excessiva',
    body: 'O motor 249cc SOHC da NEXT 250 tem folga de válvulas especificada geralmente como: admissão 0,08–0,12 mm, escapamento 0,10–0,15 mm (verifique manual). Ruído metálico rítmico vindo da cabeça do motor com motor quente é sinal de folga excessiva. Folga grande = motor bate mais; folga pequena = válvulas não fecham totalmente e superam. O ajuste é simples em qualquer oficina de motos (R$ 60–120 com MO). Faça junto com a troca de vela.',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas pós-DAFRA: busque pelos termos chineses — vasta disponibilidade',
    body: 'A NEXT 250 usa plataforma 250cc SOHC de origem chinesa com ampla oferta de peças genéricas. Termos de busca eficientes no Mercado Livre: "motor 250cc SOHC reposição", "pistão 250cc chinês", "vela NGK D8EA", "carburador PD26 250cc", "kit relação 250cc naked". Carenagens e painéis: busque "DAFRA NEXT 250 carenagem" — ainda circulam peças de estoque em alguns distribuidores. Grupos Facebook "DAFRA NEXT Brasil" e "Moto 250cc Brasil" centralizam compatibilidades descobertas pela comunidade.',
  },
  {
    severity: 'WARN',
    title: 'Tanque e autonomia: ~16 L e consumo 20–28 km/L — abaixo de 18 km/L é sinal de problema',
    body: 'O consumo normal da NEXT 250 varia de 20 km/L (cidade pesado) a 28 km/L (estrada). Com o tanque de ~16 L e reserva de ~2 L, a autonomia é de 280–400 km. Consumo abaixo de 18 km/L indica problema: filtro de ar sujo, vela desgastada, carburador com bóia alta (mistura rica) ou pneu calibrado errado (resistência maior). A vela encharcada de combustível após uso normal indica mistura excessivamente rica — regule o carburador.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: limpe a cada 5.000 km em cidade — em estrada de terra, a cada 2.000 km',
    body: 'O filtro de ar da NEXT 250 é do tipo esponja. Em uso urbano com ar poluído, limpe a cada 5.000 km com água e sabão, seque totalmente e aplique uma gota de óleo antes de reinstalar. Em uso misto com estradas de terra, limpe a cada 2.000 km — filtro de ar entupido causa mistura rica, fuligem na vela e queda de potência. Substitua a esponja por uma nova a cada 15.000–20.000 km.',
  },
  {
    severity: 'OK',
    title: 'Pneus: calibre 30 PSI frente e 33 PSI atrás — sempre com pneu frio',
    body: 'Pressão recomendada para a NEXT 250: 30 PSI dianteiro e 33 PSI traseiro (solo). Com garupa ou carga: aumente o traseiro para 36 PSI. Calibre sempre com pneu frio (antes de rodar ou após parado por pelo menos 3 horas). Pneu morno ou quente pode dar leitura 3–5 PSI acima do real. Pneu traseiro abaixo de 28 PSI prejudica manobras e aumenta o risco de furo. Confira a calibragem semanalmente.',
  },
]

const NEXT250_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'DAFRA descontinuou este modelo — peças originais esgotadas; use equivalentes chineses',
    body: 'Com o fim da produção deste modelo legado pela DAFRA, peças originais para a NEXT 250 estão sem reposição oficial. A boa notícia: a plataforma 250cc SOHC é amplamente replicada no mercado de peças genéricas chinesas. Prioridades ao comprar NEXT 250 usada: verifique estado do kit relação (corrente, pinhão, coroa), pneus, pastilhas de freio e nível/cor do óleo. Evite comprar sem teste em temperatura de operação — problemas de carburador surgem com motor quente. Grupo Facebook "DAFRA NEXT Brasil" é a principal fonte de informações de peças compatíveis.',
  },
  {
    severity: 'WARN',
    title: 'Regulador de tensão: queima componentes elétricos quando falha — verifique a tensão',
    body: 'O regulador de tensão da NEXT 250 é um ponto fraco recorrente. Quando falha, permite picos de tensão acima de 15V que queimam lâmpadas halógenas com frequência e podem danificar o CDI ou a bobina. Diagnóstico: com motor em 4.000 rpm, meça a tensão na bateria com multímetro — acima de 14,8V indica regulador defeituoso. Substituição: regulador genérico "5 fios" compatível com motos chinesas 12V — R$ 50–100 no Mercado Livre. Troque lâmpadas halógenas por LED para maior resistência a picos de tensão.',
  },
  {
    severity: 'WARN',
    title: 'Kit relação (corrente + pinhão + coroa): dura apenas 15.000 km sem lubrificação — é previsível',
    body: 'O kit relação da NEXT 250 desgasta rapidamente sem lubrificação regular. Corrente com pinos enferrujados, coroa com dentes afiados em ponta de lança e pinhão desgastado de forma irregular são sinais de neglicência na manutenção. Troque sempre os três itens juntos (corrente + pinhão + coroa) — trocar apenas a corrente em kit desgastado acelera o desgaste da nova corrente. Kit completo genérico para 250cc: R$ 250–400.',
  },
  {
    severity: 'WARN',
    title: 'Bengala dianteira: vaza óleo após 20.000 km — manchas no pneu são o sinal',
    body: 'O vedante da bengala dianteira da NEXT 250 tem vida útil de 20.000–25.000 km em uso normal. Sinal: manchas de óleo no pneu dianteiro ou na parte inferior da bengala. Bengala vazando prejudica o amortecimento e representa risco de segurança em freadas bruscas. Troca do vedante: R$ 100–180 com mão de obra em qualquer oficina. Peça: "retén bengala 33mm" ou "vedante bengala 33×46×11 mm" — dimensão padrão para motos chinesas 250cc.',
  },
  {
    severity: 'WARN',
    title: 'CDI e bobina de ignição: falha causa corte intermitente em temperatura alta',
    body: 'A CDI e a bobina de ignição da NEXT 250 são componentes com taxa de falha acima da média em motores chineses de segunda geração. Sintoma típico: moto funciona normalmente a frio, mas após 20–30 minutos de uso começa a falhar (cortes de ignição, engasgo) e às vezes desliga — e volta a funcionar após esfriar. Esse padrão aponta para CDI ou bobina com defeito térmico. CDI genérica compatível: R$ 80–150; bobina genérica: R$ 60–120. Confirme a referência de pinos antes de comprar.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedor traseiro: perde carga rapidamente — vazamento de óleo é o fim',
    body: 'O amortecedor traseiro original da NEXT 250 é de qualidade modesta e começa a perder eficiência após 15.000–20.000 km. Sinal de amortecedor fraco: moto "bate fundo" em lombadas, rebota muito após buracos e fica instável em curvas. Com vazamento de óleo visível no amortecedor: troque imediatamente — amortecedor vazio é sem eficiência nenhuma. Amortecedor traseiro genérico compatível: R$ 150–300; Universal de mola ajustável: R$ 200–350.',
  },
]

const NEXT250_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma NEXT 250: naked 250cc com corrente — atenção especial ao kit relação',
    body: '500 km — Lubrificar corrente de transmissão (spray ou óleo 80W90). | 3.000 km — Óleo motor (10W40 semissintético, ~1,3–1,5 L). Verificar tensão da corrente (folga 25–35 mm). Limpar filtro de ar. | 6.000 km — Inspecionar pastilhas de freio dianteiro (disco). | 10.000 km — Vela NGK D8EA ou CPR9EA. Filtro de ar (trocar esponja). Ajustar folga de válvulas (adm 0,08–0,12 / esc 0,10–0,15 mm). Lona de freio traseiro. | 15.000 km — Fluido de freio DOT 4. Kit relação (corrente + pinhão + coroa se desgastados). | 20.000 km — Inspecionar vedante bengala 33mm. Inspecionar amortecedor traseiro (vazamento de óleo). Rolamentos de roda. | 25.000 km — Kit relação (troca preventiva). | 30.000 km — Revisão completa de motor (válvulas, vela, filtros).',
  },
]

// ─── NEXT 300 ────────────────────────────────────────────────────────────────
// Motor 298cc SOHC ar, carburador, 5 marchas, corrente
// Plataforma chinesa 300cc — maior torque e peso vs NEXT 250

const NEXT300_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo motor 10W40: capacidade ~1,6–1,8 L — não economize no intervalo de 3.000 km',
    body: 'O motor 298cc da NEXT 300 tem maior capacidade de óleo que o 250cc. Sempre respeite o nível entre MIN e MAX na vareta após 5 minutos com motor desligado. Use 10W40 semissintético — óleo mineral puro deteriora mais rápido no motor de 300cc que trabalha em temperaturas mais altas. Com calor intenso (Norte/Nordeste ou uso urbano parado), reduza o intervalo para 2.500 km. Óleo escuro e com cheiro de queimado antes dos 3.000 km indica problema — verifique temperatura do motor.',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão: lubrificação a cada 500 km é obrigatória — motor com mais torque desgasta mais',
    body: 'O motor 298cc gera mais torque que o 250cc, o que acelera o desgaste da corrente sem lubrificação. Kit relação original da NEXT 300 é escasso com o fim da produção destes modelos legados pela DAFRA — preserve o kit atual. Lubrificação: spray de corrente ou óleo 80W90 aplicado com pincel em toda a extensão da corrente, com a moto em ponto morto e roda traseira rodando devagar. Tensão correta: 25–35 mm de folga no ponto mais tenso. Corrente com elos rígidos (que não dobram livremente ao torcer): troque imediatamente — risco de rompimento.',
  },
  {
    severity: 'OK',
    title: 'Folga de válvulas: ajuste a cada 10.000 km — motor 300cc é mais ruidoso quando fora de ajuste',
    body: 'O motor 298cc SOHC da NEXT 300 tem ruído de válvulas mais perceptível que motores menores. Especificação típica: admissão 0,08–0,12 mm, escapamento 0,12–0,16 mm — sempre confirme no manual. Realize o ajuste com motor frio. Folga excessiva: motor bate audível na cabeça. Folga insuficiente: válvula não fecha totalmente, perda de compressão e superaquecimento. Faça o ajuste de válvulas junto com a troca de vela a cada 10.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Carburador 300cc: agulha e jato precisam de acerto fino — etanol altera a mistura',
    body: 'O carburador do motor 298cc da NEXT 300 vem calibrado de fábrica para gasolina padrão. Com a gasolina brasileira (E27 = 27% etanol), pode ocorrer mistura pobre em cargas altas. Sintomas: engasgo entre 4.000–6.000 rpm, motor "soluça" ao abrir o gás. Ajuste: subir um entalhe na agulha do carburador (posição mais rica). Em altitudes acima de 800 m: descer um entalhe (mais pobre). Limpeza preventiva do carburador a cada 15.000 km — depósitos de verniz do etanol entopem os jatos.',
  },
  {
    severity: 'OK',
    title: 'Peças genéricas pós-DAFRA: motor 300cc chinês tem boa cobertura no mercado paralelo',
    body: 'Com o fim da produção destes modelos legados pela DAFRA, peças originais da NEXT 300 estão esgotadas. O motor 298cc SOHC é derivado de plataformas Loncin ou Zongshen — termos de busca eficientes: "motor 300cc SOHC peças", "pistão 300cc chinês 72-74mm", "vela NGK CPR9EA", "carburador 300cc PZ30 ou BS26". Para partes do motor, meça os diâmetros antes de comprar (pistão, anel, vedantes). Grupos Facebook "DAFRA NEXT 300" e "Mecânica Moto Chinesa Brasil" têm listas de compatibilidade. Mecânicos especializados em motos chinesas conhecem bem esses motores.',
  },
  {
    severity: 'OK',
    title: 'Consumo e autonomia: 18–25 km/L e tanque ~16 L — abaixo de 16 km/L indica problema',
    body: 'O motor 298cc consome mais que o 250cc: espere 18–22 km/L em cidade e até 25 km/L em estrada. Com o tanque de ~16 L e reserva de ~2 L, autonomia de 270–380 km. Consumo abaixo de 16 km/L indica problema: filtro de ar sujo, carburador com mistura rica, pneus descalibrados ou pastilhas de freio arraçando o disco (freio não soltando totalmente). Vela com eletrodo desgastado também aumenta o consumo — troque a cada 10.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Freios: disco dianteiro 300mm (alguns modelos têm disco duplo) — pastilhas duram 10–15k km',
    body: 'A NEXT 300 tem freio dianteiro a disco (alguns modelos com disco duplo) e freio traseiro a disco em versões mais equipadas. Pastilhas dianteiras duram 10.000–15.000 km com uso normal — verifique o indicador de desgaste a cada revisão. Pastilhas com metal exposto arranhando o disco: troque imediatamente. Fluido de freio DOT 4 absorve umidade ao longo do tempo — troque a cada 2 anos independente da quilometragem. Disco com ranhuras profundas: troque junto com as pastilhas para evitar desgaste acelerado das novas pastilhas.',
  },
]

const NEXT300_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'DAFRA descontinuou este modelo — NEXT 300 tem peças escassas; planejamento é essencial',
    body: 'Com o fim da produção deste modelo legado pela DAFRA, a NEXT 300 enfrenta o mesmo problema que toda a linha: peças originais esgotadas. Por ser um modelo 300cc de produção mais limitada, a escassez é ainda maior que no 250cc. Antes de comprar uma NEXT 300 usada: exija historico de manutenção completo; teste os freios, verifique o estado da corrente e do kit relação, e teste o motor em temperatura de operação (20+ minutos). Kit relação original: praticamente impossível de encontrar — calcule o custo de um kit genérico (R$ 300–500) no preço de compra.',
  },
  {
    severity: 'WARN',
    title: 'CDI e sensor de posição (modelos EFI): falha causa corte em temperatura alta',
    body: 'Em modelos da NEXT 300 com injeção eletrônica (versões mais recentes), a CDI ou a ECU pode apresentar falha térmica. Sintoma clássico: moto funciona normalmente a frio, começa a cortar após 20–30 minutos de uso e volta a funcionar após esfriar. Teste: leve a moto até o sintoma aparecer e meça a tensão na bateria (deve estar entre 13,5–14,5V com motor girando). CDI genérica 12V compatível: R$ 100–200. ECU (injeção): busque no grupo Facebook "DAFRA NEXT 300" — peças usadas de motos acidentadas são a principal fonte.',
  },
  {
    severity: 'WARN',
    title: 'Bengala dianteira: vedantes de qualidade modesta — vaza antes de 20.000 km',
    body: 'A bengala dianteira da NEXT 300 usa vedantes (retentores) que não têm a durabilidade de marcas japonesas. Manchas de óleo no pneu dianteiro ou na parte inferior da bengala indicam vedante vencido. Manter bengala vazando prejudica severamente o amortecimento e a estabilidade da moto. Troca dos vedantes (par): R$ 120–200 com mão de obra. Dimensão típica: 41mm — confirme antes de comprar a peça. Substitua o óleo da bengala ao trocar o vedante.',
  },
  {
    severity: 'WARN',
    title: 'Regulador de tensão: picos acima de 15V queimam lâmpadas e eletrônicos',
    body: 'O regulador de tensão da NEXT 300 é responsável por manter a tensão estável entre 13,5–14,5V enquanto o motor gira. Com regulador defeituoso, picos acima de 15V queimam lâmpadas halógenas repetidamente e podem danificar a CDI. Diagnóstico: multímetro na bateria com motor a 4.000 rpm — acima de 14,8V é problema. Regulador genérico "5 fios 12V" compatível com motos chinesas: R$ 50–100. Instale lâmpadas LED para maior resistência a picos.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedor traseiro: perde eficiência antes dos 20.000 km em uso urbano intenso',
    body: 'O amortecedor traseiro original da NEXT 300 tem qualidade modesta para o peso maior do motor 300cc. Sintomas de amortecedor fraco: moto bate fundo em lombadas, o traseiro "nada" em curvas, piloto sente impactos diretos no banco. Com vazamento de óleo no amortecedor: ineficaz — troque imediatamente. Amortecedor universal ajustável para motos 250–300cc: R$ 200–400. Ajuste a pré-carga da mola conforme o peso do piloto para melhorar a resposta.',
  },
]

const NEXT300_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma NEXT 300: naked 300cc — motor maior exige atenção redobrada na corrente e óleo',
    body: '500 km — Lubrificar corrente de transmissão. | 3.000 km — Óleo motor (10W40 semissintético, ~1,6–1,8 L). Verificar tensão e lubrificação da corrente (folga 25–35 mm). Limpar filtro de ar. | 6.000 km — Inspecionar pastilhas de freio frente e trás. | 10.000 km — Vela NGK CPR9EA (gap 0,7–0,8 mm). Filtro de ar (trocar). Ajustar folga de válvulas (adm 0,08–0,12 / esc 0,12–0,16 mm). | 15.000 km — Fluido de freio DOT 4 (frente e trás). Kit relação (corrente + pinhão + coroa se desgastados). Limpar carburador (depósitos de etanol). | 20.000 km — Inspecionar vedante bengala 41mm. Inspecionar amortecedor traseiro. Rolamentos de roda. | 25.000 km — Kit relação (troca preventiva). | 30.000 km — Revisão completa de motor.',
  },
]

// ─── LASER 150 ───────────────────────────────────────────────────────────────
// Motor 149cc SOHC 4T a ar, carburador PZ26, câmbio 5 marchas
// Estilo commuter/naked, corrente 428, freio disco dianteiro + tambor traseiro
// Plataforma CG-type chinês — a mais simples e mais bem coberta em peças genéricas
// Anos FIPE: 2008–2010

const LASER150_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor CG-type 149cc: a manutenção simples garante vida longa',
    body: 'O motor do LASER 150 é um monocilíndrico 149cc SOHC de projeto CG-type (similar ao Honda CG 150), com câmbio 5 marchas e embreagem a óleo (câmara úmida). Esse tipo de motor é um dos mais simples e duráveis do mercado desde que o óleo seja trocado em dia e o carburador seja mantido limpo. Não exige ferramentas especiais. Qualquer mecânico de bairro que trabalha com Honda CG/Titan 150 conhece esse motor — estrutura praticamente idêntica.',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W50 JASO MA: troque a cada 3.000 km — não use óleo de carro',
    body: 'O LASER 150 usa óleo 20W50 com especificação JASO MA ou MA2 — imprescindível porque a embreagem a óleo (câmara úmida) é lubrificada pelo mesmo óleo do motor. Óleo de carro 20W50 sem JASO MA contém aditivos de antiderrapagem que fazem a embreagem escorregar. Capacidade: ~1,0–1,1 L. Verifique pelo visor lateral. Troque a cada 3.000 km ou 3 meses. Óleo velho resseca os discos de embreagem, deixa o câmbio duro e esquenta o motor desnecessariamente.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428: lubrifique a cada 500 km — vida do kit relação depende disso',
    body: 'A corrente do LASER 150 é tipo 428 (padrão para 150cc commuters). Lubrificação a cada 500 km com spray de corrente ou óleo 80W90 pincelado na lateral interna duplica a vida útil — de 10.000 para 20.000+ km. Tensão correta: 20–30 mm de folga no ponto médio inferior da corrente. Corrente frouxa: sacudida na aceleração e risco de sair do pinhão. Corrente tensionada demais: desgasta rolamentos e pinhão rapidamente. Kit completo genérico 428 (corrente + pinhão + coroa): R$ 80–150 em distribuidoras de motos chinesas.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA: inspecione a cada 5.000 km, troque a cada 10.000 km',
    body: 'A vela do LASER 150 é a NGK C7HSA (rosca M12×1,25, 19mm de alcance — padrão motor 150cc chinês). Gap correto: 0,6–0,7 mm. Inspecione a cada 5.000 km: eletrodo preto/oleoso = mistura rica ou filtro de ar sujo; eletrodo branco = mistura pobre; eletrodo marrom-acinzentado = motor saudável. Troque sempre a cada 10.000 km independente do estado visual — vela desgastada consome até 10% mais combustível. Custo: R$ 15–25. Equivalente Denso: U22FS-U.',
  },
  {
    severity: 'WARN',
    title: 'Carburador PZ26: limpe a cada 10.000 km — etanol e paradas longas entopem os jets',
    body: 'O carburador PZ26 (26mm) do LASER 150 acumula depósitos de verniz do etanol brasileiro quando a moto fica parada por mais de 15 dias com gasolina no tanque. Etanol de má qualidade (abaixo de 93 INPM, comum em postos de interior) entope os jatos finos em 2–4 semanas. Sintomas: dificuldade para dar partida a frio, engasgo na retomada e consumo elevado. Limpeza: desmonte, mergulhe jets em solvente por 15 min, sopre com bomba de ar, verifique a agulha. Ultrassom profissional: R$ 60–120 em oficinas.',
  },
  {
    severity: 'OK',
    title: 'Câmbio 5 marchas: padrão chinês 1-N-2-3-4-5 — ponto morto entre 1ª e 2ª',
    body: 'O câmbio do LASER 150 segue o padrão chinês: N (ponto morto) fica entre a 1ª e a 2ª marcha — um meio clique para cima estando em 1ª. Câmbio emperrando ao trocar marchas é quase sempre sinal de óleo motor velho ou nível baixo — troque o óleo primeiro antes de pensar em mecânica de câmbio. Não force a alavanca de câmbio se a marcha não entrar: reduza a velocidade e tire a pressão do motor. Com o motor frio, o câmbio pode estar mais duro nos primeiros 2 km — é normal.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar tipo esponja: limpe a cada 3.000 km — poeira destrói pistão e cilindro',
    body: 'O filtro de ar do LASER 150 é uma esponja retangular. Em uso urbano com poluição, limpe a cada 3.000 km: retire a esponja, lave com água e sabão neutro, esprema (nunca torça), seque completamente ao sol, aplique uma gota de óleo de motor limpo e retire o excesso antes de reinstalar. Nunca rode com a caixa do filtro aberta — poeira entra no cilindro e desgasta pistão e anéis irreversivelmente em poucas horas. Substitua a esponja por uma nova a cada 20.000 km.',
  },
  {
    severity: 'OK',
    title: 'Peças genéricas CG-type: o LASER 150 tem a melhor cobertura de peças pós-DAFRA',
    body: 'Entre todos os modelos da DAFRA, o LASER 150 tem a melhor situação de peças após o fechamento da marca, pois usa o motor CG-type 149cc — o mais popullar no mercado de motos chinesas. Compatibilidades confirmadas: pistão/anel 57,4mm (R$ 80–150), vela NGK C7HSA (R$ 20), carburador PZ26 completo (R$ 60–120), kit de juntas do motor (R$ 30–60), CDI 6 pinos AC genérica (R$ 50–100), kit relação 428 (R$ 80–150), lonas de freio traseiro para "motor 150cc CG tipo" (R$ 20–40). Grupos Facebook "DAFRA LASER 150 Brasil" e fóruns de motos chinesas mantêm listas atualizadas de compatibilidade.',
  },
  {
    severity: 'WARN',
    title: 'Freio traseiro a tambor: ajuste obrigatório a cada 5.000 km — eficiência cai muito',
    body: 'O freio traseiro a tambor do LASER 150 perde eficiência à medida que a lona desgasta e o cabo estira. Com freio desregulado, você precisa pressionar mais o pedal antes de sentir resistência — aumenta a distância de frenagem perigosamente. Ajuste: gire a porca de regulagem no cabo do freio traseiro até ter 10–15 mm de folga livre no pedal antes de começar a frear. Com a folga zerada: risco de lona arrastando no tambor, esquentando o cubo da roda. Troca da lona a cada 15.000–20.000 km — custo de R$ 20–40 o par.',
  },
  {
    severity: 'OK',
    title: 'Consumo real: 40–48 km/L — abaixo de 35 km/L indica problema a investigar',
    body: 'Com uso urbano normal, o LASER 150 consome entre 40–48 km/L. Com tanque de ~14 L (reserva ~1,5 L), autonomia é de 520–640 km. Consumo abaixo de 35 km/L indica problema: filtro de ar sujo (causa mais comum), bóia do carburador descalibrada (nível de combustível alto demais), vela desgastada, ou pneus descalibrados (resistência ao rolamento aumentada). Gasolina aditivada (sem etanol, comum nas bandeiras Shell, Ipiranga) melhora o consumo em 5–10% mas não é obrigatória — a moto funciona bem com E27 regular.',
  },
]

const LASER150_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'DAFRA descontinuou este modelo — mas motor CG-type tem cobertura ampla em peças genéricas',
    body: 'Com o fim da produção deste modelo legado pela DAFRA, peças originais do LASER 150 não existem mais em concessionárias. Entre todos os modelos DAFRA, o LASER 150 é o que tem MELHOR situação de reposição, pois o motor CG-type 149cc é o mais replicado do mercado paralelo. Peças de motor, embreagem, carburador, corrente e freios têm equivalentes genéricos amplamente disponíveis. Carenagens originais são mais raras — busque no Mercado Livre por "DAFRA LASER 150 carenagem" + ano ou acesse grupos no Facebook "DAFRA LASER Brasil". Mecânicos de bairro conhecem bem esse motor.',
  },
  {
    severity: 'WARN',
    title: 'CDI (unidade de ignição): falha térmica após 4–5 anos — padrão claro de sintomas',
    body: 'A CDI original (unidade CDI AC de 6 pinos) do LASER 150 tem taxa de falha acima da média após 4–5 anos. Sintoma característico de CDI com defeito térmico: moto parte normalmente a frio, mas após 15–20 minutos de uso começa a "picar" (cortes intermitentes na ignição) e pode desligar — e volta a funcionar depois de esfriar por 10–15 minutos. Esse padrão é diagnóstico: CDI com fadiga térmica. CDI genérica de 6 pinos AC para "moto 150cc chinesa": R$ 50–100. Confirme o número de pinos e o tipo AC ou DC antes de comprar. Troque junto com a bobina de ignição se ambas tiverem mais de 6 anos.',
  },
  {
    severity: 'WARN',
    title: 'Regulador de tensão (retificador): queima lâmpadas repetidamente quando falha',
    body: 'O regulador de tensão original do LASER 150 permite picos acima de 14,8V quando falha, queimando lâmpadas halógenas do farol e do painel com frequência anormal. Diagnóstico: com motor em 4.000 rpm, meça a tensão na bateria com multímetro — acima de 14,8V indica regulador defeituoso. Regulador genérico "retificador 12V moto chinesa 3 fases" compatível: R$ 40–80 no Mercado Livre. Além de trocar o regulador, substitua as lâmpadas halógenas por LED de encaixe direto (H4 no farol, BA15S na traseira) — resistem muito mais a picos de tensão.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem: escorregamento indica óleo errado ou pastilhas desgastadas',
    body: 'O LASER 150 tem embreagem a óleo (câmara úmida) que compartilha o óleo com o motor. Sintoma de embreagem escorregando: o motor aumenta a rotação em aceleração forte mas a velocidade não aumenta proporcionalmente — especialmente perceptível em subidas. Primeira ação: troque o óleo por um com especificação JASO MA — muitos casos de embreagem escorregando resolvem somente com troca de óleo pelo correto. Se persistir após a troca de óleo: pastilhas desgastadas. Kit de discos de embreagem genérico "150cc CG-type câmara úmida": R$ 60–120.',
  },
  {
    severity: 'WARN',
    title: 'Bengala dianteira: vedante com vida curta em cidades com buracos',
    body: 'O vedante da bengala dianteira do LASER 150 tem vida útil de 15.000–20.000 km em uso com pavimentação ruim. Sinal: manchas de óleo na parte inferior da bengala ou no pneu dianteiro. Com vedante falhando, a bengala perde eficiência no amortecimento — risco de instabilidade em freadas bruscas. Dimensão típica do vedante: 33×46×11 mm (confirme após desmontagem da bengala). Troca com mão de obra: R$ 80–150. Aproveite para trocar o óleo da bengala junto: óleo hidráulico ATF 10 ou óleo de bengala 5W, ~100–150 mL por perna.',
  },
  {
    severity: 'WARN',
    title: 'Chicote elétrico: conectores oxidam e causam falhas intermitentes com o tempo',
    body: 'O chicote elétrico do LASER 150 usa conectores de qualidade modesta, sensíveis à oxidação em regiões costeiras ou com chuva frequente. Sintomas de conectores oxidados: velocímetro com leitura errática, luz de freio intermitente, pisca-pisca que para de funcionar esporadicamente. Solução preventiva anual: desconecte os conectores visíveis, aplique spray WD-40 Contato, reconecte, aplique graxa dielétrica na entrada dos conectores (R$ 20). Resolução definitiva: substitua os conectores oxidados por modelos Tyco de mesma bitola — disponíveis em lojas de eletrônica a R$ 2–5 a unidade.',
  },
]

const LASER150_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma LASER 150: commuter 149cc CG-type — simples e barato de manter em dia',
    body: '500 km (rodagem) — Troca de óleo motor (20W50 JASO MA, ~1,0 L). | 1.000 km — Segunda troca de óleo (rodagem). | 3.000 km — Troca de óleo rotineira (20W50 JASO MA, ~1,0 L). Limpar filtro de ar (esponja). | 500 km — Lubrificar corrente 428 (spray ou óleo 80W90). | 5.000 km — Verificar tensão da corrente (20–30 mm folga). Ajustar freio traseiro (tambor). Inspecionar vela NGK C7HSA (gap 0,6–0,7 mm). | 10.000 km — Trocar vela NGK C7HSA. Limpar carburador PZ26 (jets + bóia). Inspecionar pastilhas de freio dianteiro (disco 240mm). | 15.000 km — Lona de freio traseiro (tambor 110mm). Fluido de freio DOT 4 (dianteiro). Inspecionar bengala (mancha de óleo = trocar vedante). | 20.000 km — Kit relação 428 (corrente + pinhão + coroa). Filtro de ar (esponja nova). Inspecionar CDI (corte no quente = falha térmica). | 25.000 km — Verificar folga de válvulas (adm: 0,08–0,12 mm; esc: 0,10–0,15 mm — motor frio). Rolamentos de roda. | 30.000 km — Revisão geral do motor.',
  },
]

// ─── BLOCKS ──────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'APACHE 150cc',
    yearFrom: 2010,
    yearTo: 2015,
    MACETES: APACHE200_MACETES,
    PROBLEMAS: APACHE200_PROBLEMAS,
    MANUTENCAO: APACHE200_MANUTENCAO,
  },
  {
    modelName: 'APACHE RTR 200cc',
    yearFrom: 2019,
    yearTo: null,
    MACETES: APACHERTR200_MACETES,
    PROBLEMAS: APACHERTR200_PROBLEMAS,
    MANUTENCAO: APACHERTR200_MANUTENCAO,
  },
  {
    modelName: 'KANSAS 150',
    yearFrom: 2008,
    yearTo: 2016,
    MACETES: KANSAS150_MACETES,
    PROBLEMAS: KANSAS150_PROBLEMAS,
    MANUTENCAO: KANSAS150_MANUTENCAO,
  },
  {
    modelName: 'RIVA 150cc',
    yearFrom: 2007,
    yearTo: 2015,
    MACETES: RIVA150_MACETES,
    PROBLEMAS: RIVA150_PROBLEMAS,
    MANUTENCAO: RIVA150_MANUTENCAO,
  },
  // NOTA: 'RIVA 250 Z' não aparece na lista atual da API FIPE motos/DAFRA (só existem
  // RIVA 150cc e RIVA Cargo 150cc). Mantido por poder casar via catálogo local caso o
  // usuário cadastre o veículo manualmente, mas não é alcançável pelo fluxo padrão FIPE.
  {
    modelName: 'RIVA 250 Z',
    yearFrom: 2012,
    yearTo: 2016,
    MACETES: RIVA250Z_MACETES,
    PROBLEMAS: RIVA250Z_PROBLEMAS,
    MANUTENCAO: RIVA250Z_MANUTENCAO,
  },
  {
    modelName: 'SPEED 150',
    yearFrom: 2008,
    yearTo: 2014,
    MACETES: SPEED150_MACETES,
    PROBLEMAS: SPEED150_PROBLEMAS,
    MANUTENCAO: SPEED150_MANUTENCAO,
  },
  {
    modelName: 'LASER 150',
    yearFrom: 2008,
    yearTo: 2010,
    MACETES: LASER150_MACETES,
    PROBLEMAS: LASER150_PROBLEMAS,
    MANUTENCAO: LASER150_MANUTENCAO,
  },
  // NOTA: 'ZR 150' e 'ZR 200' não aparecem na lista atual da API FIPE motos/DAFRA.
  // Mantidos por poderem casar via cadastro manual do usuário, mas não são alcançáveis
  // pelo fluxo padrão de seleção FIPE (marca/modelo/ano) do site.
  {
    modelName: 'ZR 150',
    yearFrom: 2007,
    yearTo: 2015,
    MACETES: ZR150_MACETES,
    PROBLEMAS: ZR150_PROBLEMAS,
    MANUTENCAO: ZR150_MANUTENCAO,
  },
  {
    modelName: 'ZR 200',
    yearFrom: 2012,
    yearTo: 2016,
    MACETES: ZR200_MACETES,
    PROBLEMAS: ZR200_PROBLEMAS,
    MANUTENCAO: ZR200_MANUTENCAO,
  },
  {
    modelName: 'CITYCOM 300I',
    yearFrom: 2012,
    yearTo: 2017,
    MACETES: CITYCOM300I_MACETES,
    PROBLEMAS: CITYCOM300I_PROBLEMAS,
    MANUTENCAO: CITYCOM300I_MANUTENCAO,
  },
  {
    modelName: 'NH 190',
    yearFrom: 2014,
    yearTo: 2017,
    MACETES: NH190_MACETES,
    PROBLEMAS: NH190_PROBLEMAS,
    MANUTENCAO: NH190_MANUTENCAO,
  },
  {
    modelName: 'HORIZON 150',
    yearFrom: 2011,
    yearTo: null,
    MACETES: HORIZON150_MACETES,
    PROBLEMAS: HORIZON150_PROBLEMAS,
    MANUTENCAO: HORIZON150_MANUTENCAO,
  },
  {
    modelName: 'HORIZON 250',
    yearFrom: 2011,
    yearTo: 2019,
    MACETES: HORIZON250_MACETES,
    PROBLEMAS: HORIZON250_PROBLEMAS,
    MANUTENCAO: HORIZON250_MANUTENCAO,
  },
  {
    modelName: 'NEXT 250cc',
    yearFrom: 2012,
    yearTo: null,
    MACETES: NEXT250_MACETES,
    PROBLEMAS: NEXT250_PROBLEMAS,
    MANUTENCAO: NEXT250_MANUTENCAO,
  },
  {
    modelName: 'NEXT 300cc',
    yearFrom: 2013,
    yearTo: null,
    MACETES: NEXT300_MACETES,
    PROBLEMAS: NEXT300_PROBLEMAS,
    MANUTENCAO: NEXT300_MANUTENCAO,
  },
]

// ─── TIRE PRESSURES ──────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'APACHE 150cc',
    yearFrom: 2010,
    yearTo: 2015,
    tireSize: '90/90-17 (F) · 110/80-17 (R)',
    frontPsi: 30,
    rearPsi: 33,
    frontPsiLoad: 30,
    rearPsiLoad: 36,
    notes: 'Sport 200cc. Com garupa, aumentar traseiro para 36 PSI. Calibre sempre com pneu frio.',
  },
  {
    modelName: 'APACHE RTR 200cc',
    yearFrom: 2019,
    yearTo: null,
    tireSize: '90/90-17 (F) · 110/80-17 (R)',
    frontPsi: 30,
    rearPsi: 33,
    frontPsiLoad: 30,
    rearPsiLoad: 36,
    notes: 'Mesmas dimensões do Apache 200 carburado. Com garupa: traseiro 36 PSI.',
  },
  {
    modelName: 'KANSAS 150',
    yearFrom: 2008,
    yearTo: 2016,
    tireSize: '90/90-18 (F) · 110/90-16 (R)',
    frontPsi: 26,
    rearPsi: 29,
    frontPsiLoad: 26,
    rearPsiLoad: 33,
    notes: 'Cruiser com pneus de perfil alto e aro maior. Pressões mais baixas que motos esportivas. Com garupa: traseiro 33 PSI.',
  },
  {
    modelName: 'RIVA 150cc',
    yearFrom: 2007,
    yearTo: 2015,
    tireSize: '90/90-12 (F) · 100/90-10 (R)',
    frontPsi: 30,
    rearPsi: 33,
    frontPsiLoad: 30,
    rearPsiLoad: 36,
    notes: 'Scooter com rodas pequenas. Manter calibragem correta é especialmente importante em pneus de baixo perfil. Com garupa: 36 PSI traseiro.',
  },
  {
    modelName: 'RIVA 250 Z',
    yearFrom: 2012,
    yearTo: 2016,
    tireSize: '110/70-13 (F) · 130/70-12 (R)',
    frontPsi: 29,
    rearPsi: 33,
    frontPsiLoad: 29,
    rearPsiLoad: 36,
    notes: 'Maxi-scooter mais pesado. Pneus maiores que a Riva 150. Com garupa frequente: 36 PSI traseiro.',
  },
  {
    modelName: 'SPEED 150',
    yearFrom: 2008,
    yearTo: 2014,
    tireSize: '90/90-17 (F) · 100/80-17 (R)',
    frontPsi: 30,
    rearPsi: 33,
    frontPsiLoad: 30,
    rearPsiLoad: 36,
    notes: 'Sport 150cc. Não ultrapasse 38 PSI no traseiro — compromete aderência em curvas.',
  },
  {
    modelName: 'LASER 150',
    yearFrom: 2008,
    yearTo: 2010,
    tireSize: '80/100-18 (F) · 90/90-17 (R)',
    frontPsi: 28,
    rearPsi: 32,
    frontPsiLoad: 28,
    rearPsiLoad: 36,
    notes: 'Commuter 149cc CG-type. Calibre sempre com pneu frio. Com garupa ou carga: traseiro 36 PSI.',
  },
  {
    modelName: 'ZR 150',
    yearFrom: 2007,
    yearTo: 2015,
    tireSize: '2.75-21 (F) · 4.10-18 (R)',
    frontPsi: 26,
    rearPsi: 29,
    frontPsiLoad: 26,
    rearPsiLoad: 33,
    notes: 'Trail/off-road. Asfalto: 26/29 PSI. Off-road terra/trilha: reduzir para 22/25 PSI. Recalibrar ao retornar ao asfalto.',
  },
  {
    modelName: 'ZR 200',
    yearFrom: 2012,
    yearTo: 2016,
    tireSize: '2.75-21 (F) · 4.10-18 (R)',
    frontPsi: 26,
    rearPsi: 29,
    frontPsiLoad: 26,
    rearPsiLoad: 33,
    notes: 'Mesmas dimensões de pneu da ZR 150. Peso maior da ZR 200 — com garupa: 33 PSI traseiro no asfalto.',
  },
  {
    modelName: 'CITYCOM 300I',
    yearFrom: 2012,
    yearTo: 2017,
    tireSize: '110/70-13 (F) · 130/70-12 (R)',
    frontPsi: 29,
    rearPsi: 33,
    frontPsiLoad: 29,
    rearPsiLoad: 36,
    notes: 'Maxi-scooter 300cc. Peso mais alto exige calibragem correta. Com garupa: 36 PSI traseiro.',
  },
  {
    modelName: 'NH 190',
    yearFrom: 2014,
    yearTo: 2017,
    tireSize: '90/90-17 (F) · 110/80-17 (R)',
    frontPsi: 30,
    rearPsi: 33,
    frontPsiLoad: 30,
    rearPsiLoad: 36,
    notes: 'Naked urbana 190cc. Com garupa: traseiro 36 PSI.',
  },
  {
    modelName: 'HORIZON 150',
    yearFrom: 2011,
    yearTo: null,
    tireSize: '90/90-14 (F) · 100/80-14 (R)',
    frontPsi: 29,
    rearPsi: 32,
    frontPsiLoad: 29,
    rearPsiLoad: 36,
    notes: 'Scooter CVT 150cc. Com garupa, aumentar traseiro para 36 PSI. Calibre sempre com pneu frio.',
  },
  {
    modelName: 'HORIZON 250',
    yearFrom: 2011,
    yearTo: 2019,
    tireSize: '110/70-13 (F) · 130/70-12 (R)',
    frontPsi: 29,
    rearPsi: 33,
    frontPsiLoad: 29,
    rearPsiLoad: 36,
    notes: 'Maxi-scooter 250cc refrigerado a líquido. Com garupa: traseiro 36 PSI. Calibre sempre com pneu frio.',
  },
  {
    modelName: 'NEXT 250cc',
    yearFrom: 2012,
    yearTo: null,
    tireSize: '100/80-17 (F) · 130/70-17 (R)',
    frontPsi: 30,
    rearPsi: 33,
    frontPsiLoad: 30,
    rearPsiLoad: 36,
    notes: 'Naked 250cc. Com garupa ou carga: traseiro 36 PSI. Calibre sempre com pneu frio.',
  },
  {
    modelName: 'NEXT 300cc',
    yearFrom: 2013,
    yearTo: null,
    tireSize: '100/80-17 (F) · 140/70-17 (R)',
    frontPsi: 30,
    rearPsi: 33,
    frontPsiLoad: 30,
    rearPsiLoad: 36,
    notes: 'Naked 300cc. Pneu traseiro mais largo que o 250cc. Com garupa: traseiro 36 PSI.',
  },
]

// ─── MAINTENANCE ITEMS ────────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // APACHE 200
  { modelName: 'APACHE 150cc', yearFrom: 2010, yearTo: 2015, component: 'Óleo motor (10W30 semissintético, ~1,2 L)', intervalKm: 3000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'APACHE 150cc', yearFrom: 2010, yearTo: 2015, component: 'Lubrificar corrente de transmissão', intervalKm: 500, intervalMonths: null, notes: 'A cada 500 km — life útil duplica com lubrificação regular', priority: 'MEDIUM', order: 2 },
  { modelName: 'APACHE 150cc', yearFrom: 2010, yearTo: 2015, component: 'Limpar filtro de ar (esponja)', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'APACHE 150cc', yearFrom: 2010, yearTo: 2015, component: 'Folga de válvulas (adm: 0,07–0,11 mm; esc: 0,10–0,15 mm)', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'APACHE 150cc', yearFrom: 2010, yearTo: 2015, component: 'Vela NGK CPR9EA-9', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'APACHE 150cc', yearFrom: 2010, yearTo: 2015, component: 'Filtro de ar (trocar)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'APACHE 150cc', yearFrom: 2010, yearTo: 2015, component: 'Inspecionar pastilhas de freio dianteiro', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'APACHE 150cc', yearFrom: 2010, yearTo: 2015, component: 'Kit relação (corrente + pinhão + coroa)', intervalKm: 20000, intervalMonths: null, notes: 'Com lubrificação regular pode durar 25.000 km', priority: 'HIGH', order: 8 },
  { modelName: 'APACHE 150cc', yearFrom: 2010, yearTo: 2015, component: 'Fluido de freio DOT 4', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 9 },
  { modelName: 'APACHE 150cc', yearFrom: 2010, yearTo: 2015, component: 'Rolamentos de roda', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 10 },

  // APACHE RTR 200 4V
  { modelName: 'APACHE RTR 200cc', yearFrom: 2019, yearTo: null, component: 'Óleo motor (10W30 semissintético, ~1,2 L)', intervalKm: 3000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'APACHE RTR 200cc', yearFrom: 2019, yearTo: null, component: 'Lubrificar corrente de transmissão', intervalKm: 500, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'APACHE RTR 200cc', yearFrom: 2019, yearTo: null, component: 'Limpar filtro de ar (esponja)', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'APACHE RTR 200cc', yearFrom: 2019, yearTo: null, component: 'Folga de válvulas (adm: 0,07–0,11 mm; esc: 0,10–0,15 mm)', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'APACHE RTR 200cc', yearFrom: 2019, yearTo: null, component: 'Vela NGK CPR9EA-9', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'APACHE RTR 200cc', yearFrom: 2019, yearTo: null, component: 'Filtro de ar (trocar)', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'APACHE RTR 200cc', yearFrom: 2019, yearTo: null, component: 'Kit relação (corrente + pinhão + coroa)', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'APACHE RTR 200cc', yearFrom: 2019, yearTo: null, component: 'Fluido de freio DOT 4 (dianteiro)', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'APACHE RTR 200cc', yearFrom: 2019, yearTo: null, component: 'Inspecionar bomba de combustível', intervalKm: 30000, intervalMonths: null, notes: 'Falha recorrente após 30.000 km — verificar pressão na linha (2,5–3,0 bar)', priority: 'HIGH', order: 9 },
  { modelName: 'APACHE RTR 200cc', yearFrom: 2019, yearTo: null, component: 'Rolamentos de roda', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 10 },

  // KANSAS 150
  { modelName: 'KANSAS 150', yearFrom: 2008, yearTo: 2016, component: 'Óleo motor (20W50 mineral, ~1,0 L)', intervalKm: 3000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'KANSAS 150', yearFrom: 2008, yearTo: 2016, component: 'Lubrificar corrente de transmissão', intervalKm: 800, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'KANSAS 150', yearFrom: 2008, yearTo: 2016, component: 'Ajuste de freio traseiro (tambor)', intervalKm: 5000, intervalMonths: null, notes: '10–15 mm livre no pedal antes de sentir resistência', priority: 'HIGH', order: 3 },
  { modelName: 'KANSAS 150', yearFrom: 2008, yearTo: 2016, component: 'Limpar filtro de ar (esponja lavável)', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'KANSAS 150', yearFrom: 2008, yearTo: 2016, component: 'Vela NGK CR7E', intervalKm: 10000, intervalMonths: null, notes: 'CR8E em climas muito quentes (Nordeste)', priority: 'HIGH', order: 5 },
  { modelName: 'KANSAS 150', yearFrom: 2008, yearTo: 2016, component: 'Limpar carburador PZ26 (jets e diafragma)', intervalKm: 15000, intervalMonths: null, notes: 'Sensível à qualidade do etanol — antecipe se sentir engasgo', priority: 'HIGH', order: 6 },
  { modelName: 'KANSAS 150', yearFrom: 2008, yearTo: 2016, component: 'Lona de freio traseiro (tambor)', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'KANSAS 150', yearFrom: 2008, yearTo: 2016, component: 'Fluido DOT 3 (freio dianteiro a disco)', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'KANSAS 150', yearFrom: 2008, yearTo: 2016, component: 'Kit relação (corrente + pinhão + coroa)', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'HIGH', order: 9 },
  { modelName: 'KANSAS 150', yearFrom: 2008, yearTo: 2016, component: 'Filtro de ar (esponja nova)', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 10 },
  { modelName: 'KANSAS 150', yearFrom: 2008, yearTo: 2016, component: 'Folga de válvulas', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'HIGH', order: 11 },

  // RIVA 150
  { modelName: 'RIVA 150cc', yearFrom: 2007, yearTo: 2015, component: 'Óleo motor (10W30 semissintético, ~0,8 L)', intervalKm: 3000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'RIVA 150cc', yearFrom: 2007, yearTo: 2015, component: 'Óleo câmbio CVT (SAE 90, ~0,1 L)', intervalKm: 6000, intervalMonths: null, notes: 'Bujão de drenagem no bloco do câmbio — lado direito', priority: 'HIGH', order: 2 },
  { modelName: 'RIVA 150cc', yearFrom: 2007, yearTo: 2015, component: 'Vela NGK CPR6EA-9', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'RIVA 150cc', yearFrom: 2007, yearTo: 2015, component: 'Limpar filtro de ar', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'RIVA 150cc', yearFrom: 2007, yearTo: 2015, component: 'Inspecionar roletes do variador CVT', intervalKm: 8000, intervalMonths: null, notes: 'Ronco crescente = roletes desgastados — kit genérico R$ 20–50', priority: 'HIGH', order: 5 },
  { modelName: 'RIVA 150cc', yearFrom: 2007, yearTo: 2015, component: 'Kit de roletes do variador CVT (se desgastados)', intervalKm: 12000, intervalMonths: null, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'RIVA 150cc', yearFrom: 2007, yearTo: 2015, component: 'Correia CVT (trocar)', intervalKm: 15000, intervalMonths: null, notes: 'Trocar junto com os roletes para otimizar', priority: 'HIGH', order: 7 },
  { modelName: 'RIVA 150cc', yearFrom: 2007, yearTo: 2015, component: 'Fluido de freio DOT 4', intervalKm: 15000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'RIVA 150cc', yearFrom: 2007, yearTo: 2015, component: 'Filtro de ar (trocar)', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 9 },
  { modelName: 'RIVA 150cc', yearFrom: 2007, yearTo: 2015, component: 'Folga de válvulas', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'HIGH', order: 10 },

  // RIVA 250 Z
  { modelName: 'RIVA 250 Z', yearFrom: 2012, yearTo: 2016, component: 'Óleo motor (10W30 semissintético, ~1,0 L)', intervalKm: 3000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'RIVA 250 Z', yearFrom: 2012, yearTo: 2016, component: 'Óleo câmbio CVT (SAE 90, ~0,1 L)', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'RIVA 250 Z', yearFrom: 2012, yearTo: 2016, component: 'Vela NGK CPR8EA-9', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'RIVA 250 Z', yearFrom: 2012, yearTo: 2016, component: 'Inspecionar correia CVT e roletes', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'RIVA 250 Z', yearFrom: 2012, yearTo: 2016, component: 'Verificar nível de líquido de arrefecimento', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'RIVA 250 Z', yearFrom: 2012, yearTo: 2016, component: 'Filtro de ar', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'RIVA 250 Z', yearFrom: 2012, yearTo: 2016, component: 'Kit de roletes e correia CVT', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'RIVA 250 Z', yearFrom: 2012, yearTo: 2016, component: 'Fluido de freio DOT 4', intervalKm: 15000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'RIVA 250 Z', yearFrom: 2012, yearTo: 2016, component: 'Trocar líquido de arrefecimento (50% aditivo + água destilada)', intervalKm: 24000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 9 },
  { modelName: 'RIVA 250 Z', yearFrom: 2012, yearTo: 2016, component: 'Inspecionar bomba d\'água (selo mecânico)', intervalKm: 30000, intervalMonths: null, notes: 'Falha: óleo motor com aparência leitosa = emergência', priority: 'CRITICAL', order: 10 },

  // SPEED 150
  { modelName: 'SPEED 150', yearFrom: 2008, yearTo: 2014, component: 'Óleo motor (10W40 semissintético, ~1,0 L)', intervalKm: 3000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'SPEED 150', yearFrom: 2008, yearTo: 2014, component: 'Lubrificar corrente de transmissão', intervalKm: 800, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'SPEED 150', yearFrom: 2008, yearTo: 2014, component: 'Limpar filtro de ar', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'SPEED 150', yearFrom: 2008, yearTo: 2014, component: 'Verificar tensão da corrente', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'SPEED 150', yearFrom: 2008, yearTo: 2014, component: 'Vela NGK CR8E', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'SPEED 150', yearFrom: 2008, yearTo: 2014, component: 'Limpar carburador (jets e diafragma)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'SPEED 150', yearFrom: 2008, yearTo: 2014, component: 'Inspecionar pastilhas de freio dianteiro', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'SPEED 150', yearFrom: 2008, yearTo: 2014, component: 'Lona de freio traseiro', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'SPEED 150', yearFrom: 2008, yearTo: 2014, component: 'Fluido DOT 4 (freio dianteiro)', intervalKm: 15000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 9 },
  { modelName: 'SPEED 150', yearFrom: 2008, yearTo: 2014, component: 'Kit relação', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'HIGH', order: 10 },
  { modelName: 'SPEED 150', yearFrom: 2008, yearTo: 2014, component: 'Folga de válvulas', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'HIGH', order: 11 },

  // LASER 150
  { modelName: 'LASER 150', yearFrom: 2008, yearTo: 2010, component: 'Lubrificar corrente 428', intervalKm: 500, intervalMonths: null, notes: 'Spray de corrente ou óleo 80W90 — vida útil dobra com lubrificação regular', priority: 'HIGH', order: 1 },
  { modelName: 'LASER 150', yearFrom: 2008, yearTo: 2010, component: 'Óleo motor (20W50 JASO MA, ~1,0 L)', intervalKm: 3000, intervalMonths: 6, notes: 'Use óleo com especificação JASO MA — embreagem a óleo exige isso', priority: 'HIGH', order: 2 },
  { modelName: 'LASER 150', yearFrom: 2008, yearTo: 2010, component: 'Limpar filtro de ar (esponja)', intervalKm: 3000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'LASER 150', yearFrom: 2008, yearTo: 2010, component: 'Verificar tensão da corrente (20–30 mm de folga)', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'LASER 150', yearFrom: 2008, yearTo: 2010, component: 'Ajustar freio traseiro (tambor)', intervalKm: 5000, intervalMonths: null, notes: '10–15 mm livre no pedal antes de sentir resistência', priority: 'HIGH', order: 5 },
  { modelName: 'LASER 150', yearFrom: 2008, yearTo: 2010, component: 'Vela NGK C7HSA (gap 0,6–0,7 mm)', intervalKm: 10000, intervalMonths: null, notes: 'Inspecionar a cada 5.000 km. Equivalente Denso: U22FS-U', priority: 'HIGH', order: 6 },
  { modelName: 'LASER 150', yearFrom: 2008, yearTo: 2010, component: 'Limpar carburador PZ26 (jets + bóia + agulha)', intervalKm: 10000, intervalMonths: null, notes: 'Antecipe se sentir engasgo ou dificuldade na partida a frio', priority: 'HIGH', order: 7 },
  { modelName: 'LASER 150', yearFrom: 2008, yearTo: 2010, component: 'Inspecionar pastilhas de freio dianteiro (disco 240mm)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 8 },
  { modelName: 'LASER 150', yearFrom: 2008, yearTo: 2010, component: 'Lona de freio traseiro (tambor 110mm)', intervalKm: 15000, intervalMonths: null, notes: 'Lonas genéricas "150cc CG-type" compatíveis — R$ 20–40 par', priority: 'HIGH', order: 9 },
  { modelName: 'LASER 150', yearFrom: 2008, yearTo: 2010, component: 'Fluido de freio DOT 4 (dianteiro)', intervalKm: 15000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 10 },
  { modelName: 'LASER 150', yearFrom: 2008, yearTo: 2010, component: 'Kit relação 428 (corrente + pinhão + coroa)', intervalKm: 20000, intervalMonths: null, notes: 'Com lubrificação regular pode durar 25.000 km', priority: 'HIGH', order: 11 },
  { modelName: 'LASER 150', yearFrom: 2008, yearTo: 2010, component: 'Filtro de ar (esponja nova)', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 12 },
  { modelName: 'LASER 150', yearFrom: 2008, yearTo: 2010, component: 'Inspecionar CDI 6 pinos AC (corte no quente = falha térmica)', intervalKm: 20000, intervalMonths: null, notes: 'CDI genérica AC 6 pinos compatível: R$ 50–100', priority: 'MEDIUM', order: 13 },
  { modelName: 'LASER 150', yearFrom: 2008, yearTo: 2010, component: 'Folga de válvulas (adm: 0,08–0,12 mm; esc: 0,10–0,15 mm)', intervalKm: 25000, intervalMonths: null, notes: 'Fazer com motor frio', priority: 'HIGH', order: 14 },
  { modelName: 'LASER 150', yearFrom: 2008, yearTo: 2010, component: 'Rolamentos de roda', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 15 },

  // ZR 150
  { modelName: 'ZR 150', yearFrom: 2007, yearTo: 2015, component: 'Óleo motor (10W40 semissintético, ~1,0 L)', intervalKm: 3000, intervalMonths: 6, notes: 'Intervalo menor em uso off-road intenso', priority: 'HIGH', order: 1 },
  { modelName: 'ZR 150', yearFrom: 2007, yearTo: 2015, component: 'Lubrificar corrente DID/RK (não use genérica em off-road)', intervalKm: 500, intervalMonths: null, notes: 'A cada 300 km em trilhas com lama', priority: 'HIGH', order: 2 },
  { modelName: 'ZR 150', yearFrom: 2007, yearTo: 2015, component: 'Limpar filtro de ar (esponja)', intervalKm: 2000, intervalMonths: null, notes: 'Em uso off-road/terra. A cada 5.000 km em uso só asfalto', priority: 'HIGH', order: 3 },
  { modelName: 'ZR 150', yearFrom: 2007, yearTo: 2015, component: 'Verificar tensão da corrente e desgaste', intervalKm: 5000, intervalMonths: null, notes: 'Folga: 10–15 mm no ponto médio inferior', priority: 'MEDIUM', order: 4 },
  { modelName: 'ZR 150', yearFrom: 2007, yearTo: 2015, component: 'Inspecionar vedante da bengala (por manchas de óleo)', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 5 },
  { modelName: 'ZR 150', yearFrom: 2007, yearTo: 2015, component: 'Vela NGK CR7E ou D8EA', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'ZR 150', yearFrom: 2007, yearTo: 2015, component: 'Vedante da bengala (se vazando)', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'ZR 150', yearFrom: 2007, yearTo: 2015, component: 'Fluido de freio DOT 4', intervalKm: 15000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'ZR 150', yearFrom: 2007, yearTo: 2015, component: 'Kit relação (corrente DID + pinhão + coroa)', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'HIGH', order: 9 },
  { modelName: 'ZR 150', yearFrom: 2007, yearTo: 2015, component: 'Folga de válvulas', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'HIGH', order: 10 },
  { modelName: 'ZR 150', yearFrom: 2007, yearTo: 2015, component: 'Rolamentos de roda', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 11 },

  // ZR 200
  { modelName: 'ZR 200', yearFrom: 2012, yearTo: 2016, component: 'Óleo motor (10W40 semissintético, ~1,2 L)', intervalKm: 3000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'ZR 200', yearFrom: 2012, yearTo: 2016, component: 'Lubrificar corrente DID/RK', intervalKm: 500, intervalMonths: null, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'ZR 200', yearFrom: 2012, yearTo: 2016, component: 'Limpar filtro de ar (esponja) em uso misto', intervalKm: 2000, intervalMonths: null, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'ZR 200', yearFrom: 2012, yearTo: 2016, component: 'Verificar tensão da corrente', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'ZR 200', yearFrom: 2012, yearTo: 2016, component: 'Vela NGK DR8EA ou CPR9EA', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'ZR 200', yearFrom: 2012, yearTo: 2016, component: 'Fluido de freio DOT 4', intervalKm: 15000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'ZR 200', yearFrom: 2012, yearTo: 2016, component: 'Kit relação', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'ZR 200', yearFrom: 2012, yearTo: 2016, component: 'Trocar junta da tampa do cabeçote (preventivo)', intervalKm: 20000, intervalMonths: null, notes: 'Vazamento recorrente após 20.000 km — R$ 20–40 preventivo', priority: 'MEDIUM', order: 8 },
  { modelName: 'ZR 200', yearFrom: 2012, yearTo: 2016, component: 'Folga de válvulas', intervalKm: 25000, intervalMonths: null, notes: null, priority: 'HIGH', order: 9 },
  { modelName: 'ZR 200', yearFrom: 2012, yearTo: 2016, component: 'Rolamentos de roda', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 10 },

  // CITYCOM 300I
  { modelName: 'CITYCOM 300I', yearFrom: 2012, yearTo: 2017, component: 'Óleo motor (10W30 semissintético, ~1,0 L)', intervalKm: 3000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'CITYCOM 300I', yearFrom: 2012, yearTo: 2017, component: 'Óleo câmbio CVT (SAE 90, ~0,15 L)', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'CITYCOM 300I', yearFrom: 2012, yearTo: 2017, component: 'Vela NGK CR9EH-9', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'CITYCOM 300I', yearFrom: 2012, yearTo: 2017, component: 'Inspecionar correia CVT e roletes do variador', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'CITYCOM 300I', yearFrom: 2012, yearTo: 2017, component: 'Verificar nível de líquido de arrefecimento', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'CITYCOM 300I', yearFrom: 2012, yearTo: 2017, component: 'Limpar aletas do radiador frontal', intervalKm: 5000, intervalMonths: null, notes: 'Ar comprimido ou jato de água suave de trás para frente', priority: 'MEDIUM', order: 6 },
  { modelName: 'CITYCOM 300I', yearFrom: 2012, yearTo: 2017, component: 'Filtro de ar', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'CITYCOM 300I', yearFrom: 2012, yearTo: 2017, component: 'Inspecionar pastilhas CBS (frente)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'CITYCOM 300I', yearFrom: 2012, yearTo: 2017, component: 'Kit de roletes variador + correia CVT', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'HIGH', order: 9 },
  { modelName: 'CITYCOM 300I', yearFrom: 2012, yearTo: 2017, component: 'Fluido DOT 4 (frente e trás — CBS)', intervalKm: 15000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 10 },
  { modelName: 'CITYCOM 300I', yearFrom: 2012, yearTo: 2017, component: 'Trocar líquido de arrefecimento (50% + água destilada)', intervalKm: 24000, intervalMonths: 24, notes: 'Inspecionar mangueiras do radiador junto', priority: 'HIGH', order: 11 },
  { modelName: 'CITYCOM 300I', yearFrom: 2012, yearTo: 2017, component: 'Inspecionar bomba d\'água (selo mecânico)', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'HIGH', order: 12 },

  // NH 190
  { modelName: 'NH 190', yearFrom: 2014, yearTo: 2017, component: 'Óleo motor (10W40 semissintético, ~1,1 L)', intervalKm: 3000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'NH 190', yearFrom: 2014, yearTo: 2017, component: 'Lubrificar corrente de transmissão', intervalKm: 800, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'NH 190', yearFrom: 2014, yearTo: 2017, component: 'Limpar filtro de ar', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'NH 190', yearFrom: 2014, yearTo: 2017, component: 'Verificar tensão da corrente', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'NH 190', yearFrom: 2014, yearTo: 2017, component: 'Verificar alinhamento do farol (parafusos)', intervalKm: 5000, intervalMonths: null, notes: 'Afrouxam em uso com buracos — 4 parafusos na carenagem', priority: 'LOW', order: 5 },
  { modelName: 'NH 190', yearFrom: 2014, yearTo: 2017, component: 'Vela NGK D8EA ou CR8E', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'NH 190', yearFrom: 2014, yearTo: 2017, component: 'Limpar carburador Mikuni', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'NH 190', yearFrom: 2014, yearTo: 2017, component: 'Pastilhas de freio dianteiro (disco)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 8 },
  { modelName: 'NH 190', yearFrom: 2014, yearTo: 2017, component: 'Lona de freio traseiro (tambor)', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'HIGH', order: 9 },
  { modelName: 'NH 190', yearFrom: 2014, yearTo: 2017, component: 'Fluido DOT 4 (freio dianteiro)', intervalKm: 15000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 10 },
  { modelName: 'NH 190', yearFrom: 2014, yearTo: 2017, component: 'Kit relação (corrente + pinhão + coroa)', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'HIGH', order: 11 },
  { modelName: 'NH 190', yearFrom: 2014, yearTo: 2017, component: 'Folga de válvulas', intervalKm: 25000, intervalMonths: null, notes: null, priority: 'HIGH', order: 12 },
  { modelName: 'NH 190', yearFrom: 2014, yearTo: 2017, component: 'Rolamentos de roda', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 13 },

  // HORIZON 150
  { modelName: 'HORIZON 150', yearFrom: 2011, yearTo: null, component: 'Óleo motor (10W30 semissintético, ~1,0 L)', intervalKm: 3000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'HORIZON 150', yearFrom: 2011, yearTo: null, component: 'Limpar filtro de ar (esponja)', intervalKm: 3000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'HORIZON 150', yearFrom: 2011, yearTo: null, component: 'Óleo câmbio CVT — transmissão final (SAE 90, ~100 mL)', intervalKm: 6000, intervalMonths: null, notes: 'Bujão na tampa lateral direita — NÃO é o mesmo bujão do motor. Óleo velho desgasta a embreagem centrífuga', priority: 'HIGH', order: 3 },
  { modelName: 'HORIZON 150', yearFrom: 2011, yearTo: null, component: 'Vela NGK CR7HSA (gap: 0,6–0,7 mm)', intervalKm: 6000, intervalMonths: null, notes: 'Equivalente Denso U22FSR-U', priority: 'HIGH', order: 4 },
  { modelName: 'HORIZON 150', yearFrom: 2011, yearTo: null, component: 'Inspecionar roletes do variador (6× 15 g)', intervalKm: 6000, intervalMonths: null, notes: 'Rolar na palma da mão — ovalização indica troca. Kit GY6 genérico R$ 25–50', priority: 'HIGH', order: 5 },
  { modelName: 'HORIZON 150', yearFrom: 2011, yearTo: null, component: 'Inspecionar correia CVT (835×20×30 mm GY6)', intervalKm: 6000, intervalMonths: null, notes: 'Rachaduras ou desgaste visual: trocar imediatamente. Correia quebrada = moto parada', priority: 'HIGH', order: 6 },
  { modelName: 'HORIZON 150', yearFrom: 2011, yearTo: null, component: 'Pastilhas de freio dianteiro (disco 220mm)', intervalKm: 10000, intervalMonths: null, notes: 'Pastilhas genéricas "disco 220mm scooter 150cc" são compatíveis', priority: 'MEDIUM', order: 7 },
  { modelName: 'HORIZON 150', yearFrom: 2011, yearTo: null, component: 'Lona de freio traseiro (tambor)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 8 },
  { modelName: 'HORIZON 150', yearFrom: 2011, yearTo: null, component: 'Filtro de ar (substituir esponja GY6)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 9 },
  { modelName: 'HORIZON 150', yearFrom: 2011, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 15000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 10 },
  { modelName: 'HORIZON 150', yearFrom: 2011, yearTo: null, component: 'Correia CVT nova (GY6 835×20×30 mm)', intervalKm: 20000, intervalMonths: null, notes: 'Trocar junto com os roletes para otimizar a abertura do variador', priority: 'HIGH', order: 11 },
  { modelName: 'HORIZON 150', yearFrom: 2011, yearTo: null, component: 'Kit roletes variador GY6 (6× 15 g)', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'HIGH', order: 12 },
  { modelName: 'HORIZON 150', yearFrom: 2011, yearTo: null, component: 'Inspecionar vedante bengala dianteira (33×46×11 mm)', intervalKm: 20000, intervalMonths: null, notes: 'Mancha de óleo na roda = vedante falhando. Troca R$ 80–150 c/ MO', priority: 'MEDIUM', order: 13 },
  { modelName: 'HORIZON 150', yearFrom: 2011, yearTo: null, component: 'Inspecionar embreagem centrífuga (pastilhas)', intervalKm: 20000, intervalMonths: null, notes: 'Motor "reva" mas moto não avança = pastilhas desgastadas. Kit GY6 R$ 100–180', priority: 'HIGH', order: 14 },
  { modelName: 'HORIZON 150', yearFrom: 2011, yearTo: null, component: 'Rolamentos de roda', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 15 },

  // HORIZON 250
  { modelName: 'HORIZON 250', yearFrom: 2011, yearTo: 2019, component: 'Verificar nível do líquido de arrefecimento', intervalKm: 1000, intervalMonths: null, notes: 'Verificação visual no reservatório auxiliar (entre MIN e MAX)', priority: 'HIGH', order: 1 },
  { modelName: 'HORIZON 250', yearFrom: 2011, yearTo: 2019, component: 'Óleo motor (10W30 semissintético, ~1,1 L)', intervalKm: 3000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'HORIZON 250', yearFrom: 2011, yearTo: 2019, component: 'Limpar aletas do radiador frontal', intervalKm: 5000, intervalMonths: null, notes: 'Ar comprimido ou jato de água suave de dentro para fora', priority: 'MEDIUM', order: 3 },
  { modelName: 'HORIZON 250', yearFrom: 2011, yearTo: 2019, component: 'Vela NGK CR9EH-9', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'HORIZON 250', yearFrom: 2011, yearTo: 2019, component: 'Inspecionar roletes variador (15–18 g conforme manual)', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'HORIZON 250', yearFrom: 2011, yearTo: 2019, component: 'Inspecionar correia CVT', intervalKm: 6000, intervalMonths: null, notes: 'Antecipar para 12.000 km em climas muito quentes', priority: 'HIGH', order: 6 },
  { modelName: 'HORIZON 250', yearFrom: 2011, yearTo: 2019, component: 'Filtro de ar', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'HORIZON 250', yearFrom: 2011, yearTo: 2019, component: 'Pastilhas de freio frente e trás', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 8 },
  { modelName: 'HORIZON 250', yearFrom: 2011, yearTo: 2019, component: 'Inspecionar mangueiras do radiador', intervalKm: 10000, intervalMonths: 12, notes: 'Mangueiras duras/quebradiças: trocar preventivamente', priority: 'HIGH', order: 9 },
  { modelName: 'HORIZON 250', yearFrom: 2011, yearTo: 2019, component: 'Fluido de freio DOT 4 (frente e trás)', intervalKm: 15000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 10 },
  { modelName: 'HORIZON 250', yearFrom: 2011, yearTo: 2019, component: 'Correia CVT (inspeção — trocar se rachaduras)', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'HIGH', order: 11 },
  { modelName: 'HORIZON 250', yearFrom: 2011, yearTo: 2019, component: 'Kit roletes variador (trocar)', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'HIGH', order: 12 },
  { modelName: 'HORIZON 250', yearFrom: 2011, yearTo: 2019, component: 'Correia CVT nova (preventivo)', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'HIGH', order: 13 },
  { modelName: 'HORIZON 250', yearFrom: 2011, yearTo: 2019, component: 'Trocar líquido de arrefecimento (50% anticongelante + 50% água destilada)', intervalKm: 24000, intervalMonths: 24, notes: 'Inspecionar bomba d\'água junto', priority: 'HIGH', order: 14 },
  { modelName: 'HORIZON 250', yearFrom: 2011, yearTo: 2019, component: 'Rolamentos de roda', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 15 },
  { modelName: 'HORIZON 250', yearFrom: 2011, yearTo: 2019, component: 'Revisão completa CVT (polia, embreagem centrífuga)', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'HIGH', order: 16 },

  // NEXT 250
  { modelName: 'NEXT 250cc', yearFrom: 2012, yearTo: null, component: 'Lubrificar corrente de transmissão', intervalKm: 500, intervalMonths: null, notes: 'Spray de corrente ou óleo 80W90 — vida útil do kit relação depende disso', priority: 'HIGH', order: 1 },
  { modelName: 'NEXT 250cc', yearFrom: 2012, yearTo: null, component: 'Óleo motor (10W40 semissintético, ~1,3–1,5 L)', intervalKm: 3000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'NEXT 250cc', yearFrom: 2012, yearTo: null, component: 'Verificar tensão da corrente (folga 25–35 mm)', intervalKm: 3000, intervalMonths: null, notes: 'Ajustar tensão e lubrificar simultaneamente', priority: 'MEDIUM', order: 3 },
  { modelName: 'NEXT 250cc', yearFrom: 2012, yearTo: null, component: 'Limpar filtro de ar (esponja)', intervalKm: 3000, intervalMonths: null, notes: 'Em uso urbano com poluição — trocar por nova a cada 15.000 km', priority: 'MEDIUM', order: 4 },
  { modelName: 'NEXT 250cc', yearFrom: 2012, yearTo: null, component: 'Inspecionar pastilhas de freio dianteiro', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 5 },
  { modelName: 'NEXT 250cc', yearFrom: 2012, yearTo: null, component: 'Vela NGK D8EA ou CPR9EA (gap 0,6–0,8 mm)', intervalKm: 10000, intervalMonths: null, notes: 'Inspeção a cada 6.000 km', priority: 'HIGH', order: 6 },
  { modelName: 'NEXT 250cc', yearFrom: 2012, yearTo: null, component: 'Filtro de ar (trocar esponja)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'NEXT 250cc', yearFrom: 2012, yearTo: null, component: 'Ajuste de folga de válvulas (adm 0,08–0,12 / esc 0,10–0,15 mm)', intervalKm: 10000, intervalMonths: null, notes: 'Fazer com motor frio', priority: 'HIGH', order: 8 },
  { modelName: 'NEXT 250cc', yearFrom: 2012, yearTo: null, component: 'Lona de freio traseiro (tambor)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 9 },
  { modelName: 'NEXT 250cc', yearFrom: 2012, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 15000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 10 },
  { modelName: 'NEXT 250cc', yearFrom: 2012, yearTo: null, component: 'Kit relação (corrente + pinhão + coroa)', intervalKm: 20000, intervalMonths: null, notes: 'Com lubrificação regular pode durar 25.000 km', priority: 'HIGH', order: 11 },
  { modelName: 'NEXT 250cc', yearFrom: 2012, yearTo: null, component: 'Inspecionar vedante bengala dianteira (33mm)', intervalKm: 20000, intervalMonths: null, notes: 'Mancha de óleo no pneu = vedante falhando', priority: 'MEDIUM', order: 12 },
  { modelName: 'NEXT 250cc', yearFrom: 2012, yearTo: null, component: 'Inspecionar amortecedor traseiro (vazamento de óleo)', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 13 },
  { modelName: 'NEXT 250cc', yearFrom: 2012, yearTo: null, component: 'Rolamentos de roda', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 14 },

  // NEXT 300
  { modelName: 'NEXT 300cc', yearFrom: 2013, yearTo: null, component: 'Lubrificar corrente de transmissão', intervalKm: 500, intervalMonths: null, notes: 'Motor 300cc gera mais torque — corrente seca desgasta muito mais rápido', priority: 'HIGH', order: 1 },
  { modelName: 'NEXT 300cc', yearFrom: 2013, yearTo: null, component: 'Óleo motor (10W40 semissintético, ~1,6–1,8 L)', intervalKm: 3000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'NEXT 300cc', yearFrom: 2013, yearTo: null, component: 'Verificar tensão da corrente (folga 25–35 mm)', intervalKm: 3000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'NEXT 300cc', yearFrom: 2013, yearTo: null, component: 'Limpar filtro de ar', intervalKm: 3000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'NEXT 300cc', yearFrom: 2013, yearTo: null, component: 'Inspecionar pastilhas de freio (frente e trás)', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 5 },
  { modelName: 'NEXT 300cc', yearFrom: 2013, yearTo: null, component: 'Vela NGK CPR9EA (gap 0,7–0,8 mm)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'NEXT 300cc', yearFrom: 2013, yearTo: null, component: 'Filtro de ar (trocar)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'NEXT 300cc', yearFrom: 2013, yearTo: null, component: 'Ajuste de folga de válvulas (adm 0,08–0,12 / esc 0,12–0,16 mm)', intervalKm: 10000, intervalMonths: null, notes: 'Fazer com motor frio', priority: 'HIGH', order: 8 },
  { modelName: 'NEXT 300cc', yearFrom: 2013, yearTo: null, component: 'Lona/pastilha de freio traseiro', intervalKm: 10000, intervalMonths: null, notes: 'Verificar se é tambor ou disco conforme versão', priority: 'MEDIUM', order: 9 },
  { modelName: 'NEXT 300cc', yearFrom: 2013, yearTo: null, component: 'Fluido de freio DOT 4 (frente e trás)', intervalKm: 15000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 10 },
  { modelName: 'NEXT 300cc', yearFrom: 2013, yearTo: null, component: 'Limpar carburador (depósitos de etanol)', intervalKm: 15000, intervalMonths: null, notes: 'Jatos entopem com verniz de etanol ao longo do tempo', priority: 'MEDIUM', order: 11 },
  { modelName: 'NEXT 300cc', yearFrom: 2013, yearTo: null, component: 'Kit relação (corrente + pinhão + coroa)', intervalKm: 20000, intervalMonths: null, notes: 'Com lubrificação regular pode durar 25.000 km', priority: 'HIGH', order: 12 },
  { modelName: 'NEXT 300cc', yearFrom: 2013, yearTo: null, component: 'Inspecionar vedante bengala dianteira (41mm)', intervalKm: 20000, intervalMonths: null, notes: 'Trocar óleo da bengala junto com o vedante', priority: 'MEDIUM', order: 13 },
  { modelName: 'NEXT 300cc', yearFrom: 2013, yearTo: null, component: 'Inspecionar amortecedor traseiro', intervalKm: 20000, intervalMonths: null, notes: 'Vazamento de óleo = trocar imediatamente', priority: 'MEDIUM', order: 14 },
  { modelName: 'NEXT 300cc', yearFrom: 2013, yearTo: null, component: 'Rolamentos de roda', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 15 },
]

// ─── RUNNER ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed DAFRA iniciado...')

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

  console.log('✅ Seed DAFRA concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
