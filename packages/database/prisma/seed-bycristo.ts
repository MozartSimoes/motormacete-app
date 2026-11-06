/**
 * Seed byCristo — macetes, problemas e manutenção
 * Cobre os triciclos byCristo comercializados no Brasil (1999–2015)
 *
 * Fontes: revista.moto.com.br, lexicarbrasil.com.br, motoscustom.com.br,
 *         debatemotos.com, motosaqui.com.br, motonline.com.br
 *
 * Execute: pnpm --filter @motormacete/database db:seed:bycristo
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

// ─── Triciclo Star I / Sport ──────────────────────────────────────────────────

const STAR1_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor VW AP 1600: peças em qualquer mecânico VW — vantagem enorme sobre triciclos importados',
    body: 'O byCristo Star usa o motor VW AP 1600 (o mesmo do Gol, Saveiro e Kombi das décadas de 80-2000). Filtro de óleo, velas, filtro de ar, bomba d\'água, termostato e a maioria das peças internas do motor são facilmente encontradas no Brasil inteiro — e baratas. Filtro de óleo: Wega OC165 ou Tecfil PSL625 (R$ 15-30). Velas: 4 unidades NGK BPR6ES ou Bosch WR7DC (R$ 10-20 cada). Filtro de ar: qualquer filtro para VW AP 1600 (Wega ARL-1400, R$ 20-40). Nunca pague preço de "peça exclusiva" para o motor — o AP é um dos motores mais fabricados na história do Brasil, com suporte técnico em qualquer cidade.',
  },
  {
    severity: 'OK',
    title: 'Transmissão tipo Kombi, acionada pela mão esquerda no guidão: adaptação de 1 a 2 semanas',
    body: 'A caixa de câmbio do byCristo é a mesma do VW Kombi/Fusca — 4 marchas + ré, com alavanca embutida no guidão esquerdo. A embreagem é no pedal esquerdo (igual a carro). Quem já dirigiu Kombi se adapta muito mais rápido. A sensação inicial é estranha: a mão esquerda sai do guidão para trocar marcha. Dica prática: em velocidade constante na estrada, o byCristo raramente precisa trocar marcha — use isso ao seu favor enquanto se adapta. Em cidade: antecipe as trocas de marcha, deixe a mão esquerda sempre perto da alavanca nos trechos de trânsito parado-e-anda.',
  },
  {
    severity: 'WARN',
    title: 'Sem freio dianteiro: TODA a frenagem é no eixo traseiro — antecipe paradas em 30-40% mais cedo',
    body: 'O pneu dianteiro 130/70-17 do byCristo NÃO tem freio — é apenas direcional. Toda a frenagem é feita pelos discos ventilados do eixo traseiro (nos dois pneus de carro). Isso significa: 1) Distância de parada maior que qualquer moto convencional. 2) Em curvas molhadas, frear tarde é ainda mais perigoso — os pneus traseiros podem bloquear e o veículo desviar da trajetória. 3) Em descidas longas: use motor brake (reduza a marcha) — não dependa apenas dos freios traseiros. Cultive o hábito de antecipar as frenagens. Motoristas acostumados a carros com ABS levam mais tempo para adaptar — atenção redobrada nos primeiros meses.',
  },
  {
    severity: 'OK',
    title: 'Pneus traseiros 295/50 R15: os mesmos de buggys e picapes off-road — procure lojas especializadas',
    body: 'Os dois pneus traseiros do byCristo (295/50 R15) são idênticos aos usados em buggys, gaiolas e algumas picapes 4x4 off-road. Não procure em borracharias de moto ou de carro comum — vá a lojas de buggy, pneus 4x4 e preparação automotiva. Marcas disponíveis no Brasil: Fate Patagonia (R$ 400-700 cada), Michelin LTX (R$ 500-900), BFGoodrich All-Terrain T/A, Bridgestone Dueler A/T. Custo de um par traseiro: R$ 1.000-1.800. Dica estratégica: compre e armazene um par sobressalente — em viagem longa longe de capitais, você NÃO vai achar esse tamanho em posto comum.',
  },
  {
    severity: 'OK',
    title: 'Seguro: registrado como moto (categoria AA) — Bradesco Seguros tem mais experiência com o modelo',
    body: 'O byCristo é registrado no DETRAN como moto (habilitação categoria A é suficiente para dirigir). Para seguro: a Bradesco Seguros foi pioneira em cobrir triciclos byCristo. O valor do seguro tende a ser baixo — roubo é praticamente zero (o veículo tem 1,80m de largura, é extremamente reconhecível e não cabe em carreta comum de receptação). Ao contratar: leve CRLV, fotos e valor FIPE atualizado. A maioria das seguradoras exige vistoria presencial antes de emitir. Garagem coberta é obrigatória em qualquer apólice pela largura do veículo.',
  },
  {
    severity: 'WARN',
    title: 'Motor AP em trânsito parado com calor intenso: ventoinha trabalha no limite — monitore o termômetro',
    body: 'O motor VW AP 1600 do byCristo tem circulação de água, mas quando o veículo fica parado no trânsito com temperaturas acima de 32°C, a ventoinha elétrica trabalha continuamente e o radiador tem dificuldade de dissipar calor. Se o termômetro subir além da metade: pare em local seguro, desligue o motor por 10 minutos e verifique o nível do líquido de arrefecimento. Nunca abra o radiador com o motor quente — pressão alta pode causar queimaduras. Prevenção: verifique o estado do termostato e a tensão da correia da ventoinha antes de viagens com previsão de trânsito intenso.',
  },
]

const STAR1_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Peças de carroceria e estrutura: exclusivas byCristo — sem alternativa disponível no mercado',
    body: 'Diferente do motor e transmissão (VW = peças abundantes), as peças de carroceria do byCristo são exclusivas: carenagens, para-lamas, assento anatômico, tanquinho/lataria frontal, coluna central. Em caso de acidente com dano de carroceria: contate diretamente a byCristo em São Carlos (SP) ou procure no Mercado Livre — donos desmantelando byCristos acidentados são a principal fonte de peças usadas. Grupos de Facebook de byCristo são a melhor rede de permuta. Antes de comprar um byCristo com dano de carroceria: certifique-se que a peça necessária existe disponível antes de fechar negócio — ela pode não existir.',
  },
  {
    severity: 'WARN',
    title: 'Curvas exigem técnica própria: não é moto, não é carro — risco real de tombamento lateral',
    body: 'O byCristo não se inclina em curvas como moto, mas também não funciona como carro convencional. A técnica correta: em curvas fechadas, descarregar levemente o peso para o interior da curva (deslocar suavemente o corpo) e manter velocidade baixa. Curvas rápidas podem causar rolagem lateral — especialmente com garupa ou com o eixo traseiro mais carregado. Velocidades seguras: máximo 40-50 km/h em curvas fechadas, 60-70 km/h em curvas abertas de estrada. NÃO entre em curvas na mesma velocidade que você entraria de carro — o centro de gravidade elevado (700 kg + altura do assento) é completamente diferente.',
  },
  {
    severity: 'DANGER',
    title: 'Peso de 700 kg: impossível empurrar sozinho — pane em local isolado exige guincho pesado',
    body: 'Com 700 kg (mais passageiro e carga), o byCristo não pode ser movido por uma ou duas pessoas. Em situação de pane mecânica em local sem sinal: você não vai mover esse veículo. Providências obrigatórias antes de qualquer viagem: 1) Salve contatos de guincho pesado (capaz de carregar 800+ kg) na região do trajeto. 2) Evite estacionamentos com rampa ou terra mole — sair pode ser impossível sem reboque. 3) Nunca estacione em areia, barro ou terra fofa — o veículo afunda e exige guincho. 4) Leve ferramentas básicas para problemas de motor (motor é VW AP — qualquer boreiro de Gol resolve).',
  },
  {
    severity: 'OK',
    title: 'Painel digital: difícil leitura com sol frontal direto — viseira de acrílico escuro resolve',
    body: 'Versões com painel digital (Sport) têm dificuldade de leitura quando há sol incidindo diretamente. Solução simples: viseira de painel de acrílico escuro (tipo viseira de caminhão, custo R$ 50-150 em qualquer loja de acessórios) fixada acima do painel elimina o reflexo. Solução alternativa: instale um GPS tipo RAM Mount no guidão como velocímetro complementar (suporte para guidão 7/8" com GPS — R$ 80-150 no Mercado Livre). Em viagem noturna: o painel ilumina perfeitamente — o problema é exclusivo do sol diurno.',
  },
]

const STAR1_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma byCristo Star I: baseado no motor VW AP 1600 — peças nacionais em todo o Brasil',
    body: '5.000 km ou 6 meses — Troca de óleo motor (mineral 20W-50 ou semissintético 15W-40, 3,5L com filtro Wega OC165). | 10.000 km — Inspecionar pastilhas de freio traseiro (único freio do veículo — CRÍTICO). | 15.000 km — Filtro de ar VW AP (Wega ARL-1400, R$ 20-40) + verificar correia do alternador/ventoinha. | 30.000 km — 4 velas NGK BPR6ES + filtro de combustível VW + balanceamento dos pneus traseiros. | 40.000 km — Troca do líquido de arrefecimento (G12++) + óleo da transmissão (75W-90 GL-4, ~1,3L) + verificação dos rolamentos de roda. | 60.000 km — Correia dentada ou corrente de distribuição (consulte o manual do motor — ruptura = motor fundido).',
  },
  {
    severity: 'DANGER',
    title: 'Freios traseiros: os ÚNICOS — inspeção obrigatória a cada 10.000 km sem exceção',
    body: 'Como o byCristo depende exclusivamente dos freios traseiros, a manutenção dos discos e pastilhas do eixo traseiro é a manutenção mais crítica para a segurança. Inspecione as pastilhas a cada 10.000 km: espessura mínima 3 mm antes de trocar (abaixo disso, troque imediatamente). Discos: verifique empenamento passando o dedo — sulco profundo ou empenamento = disco novo. Compatibilidade: pastilhas de Gol G3/G4 podem ser compatíveis dependendo do pino de caliper — confirme a medida. Fluido de freio DOT 4: troque a cada 2 anos independente de km — fluido velho reduz drasticamente o ponto de ebulição.',
  },
  {
    severity: 'WARN',
    title: 'Sistema de arrefecimento: manutenção mais importante do motor AP no byCristo',
    body: 'Motor AP com falha de arrefecimento pode empenar a junta do cabeçote — reparo R$ 800-2.500 em mecânico VW. Verifique mensalmente: 1) Nível no reservatório (entre MIN e MAX). 2) Cor do líquido — verde ou rosa é normal, marrom ou com flocos = troque imediatamente. 3) Mangueiras de borracha — rachaduras ou pontos moles indicam troca. 4) Rolha do radiador — pressuriza o sistema e envelhece com o tempo (troque junto com o líquido a cada 2 anos). Líquido recomendado: VW Rosa G12++ pronto para uso — nunca use apenas água (sem anticorrosivo, o motor AP corrói internamente em poucos meses).',
  },
]

// ─── Triciclo Star II / Top ───────────────────────────────────────────────────

const STAR2_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Star II: evolução do Star I com acabamento superior — motor e mecânica idênticos',
    body: 'O Star II mantém o motor VW AP 1600 e a transmissão tipo Kombi do Star I, com acabamentos superiores: painel digital de 7 instrumentos, pintura metálica disponível em até 10 cores, sistema de som integrado, banco em couro com suporte lateral para passageiro. Para manutenção do motor: exatamente as mesmas peças e procedimentos do Star I (filtro Wega OC165, vela NGK BPR6ES, líquido G12++). O refinamento do Star II está todo na eletrônica e acabamento — quem aprende a manter o Star I já conhece o Star II.',
  },
  {
    severity: 'OK',
    title: 'Sistema de som integrado (versão Top): central multimídia de carro — oficinas de car audio resolvem',
    body: 'A versão Top do Star II vem com sistema de som integrado baseado em central multimídia de linha de carros. Se apresentar problema: qualquer oficina de som automotivo consegue trabalhar — trocar a unidade central, reparar chicote elétrico, instalar Bluetooth retrofit. Custo de modernização com Bluetooth + USB: R$ 300-600 em qualquer car audio shop. Os alto-falantes são convencionais 6" ou 6×9" — fáceis e baratos de trocar. O espaço da central é padrão DIN duplo — centrais modernas (Pioneer, JVC, Sony) se encaixam diretamente.',
  },
  {
    severity: 'WARN',
    title: 'Pintura metálica artesanal: reparos de lataria exigem preparador que conheça a fórmula original',
    body: 'As pinturas metálicas do byCristo Star II são aplicadas artesanalmente na fábrica em São Carlos (SP). Em caso de amassado ou risco na carroceria: oficinas convencionais conseguem corrigir o metal, mas a reprodução exata da cor artesanal é difícil. Recomendação: documente a cor exata com fotos antes de qualquer reparo e guarde a documentação de compra (às vezes indica o código de cor). Em São Carlos e cidades próximas, pintores que trabalharam com a byCristo ainda existem — a comunidade byCristo no Facebook pode indicar profissionais que conhecem as fórmulas originais.',
  },
  {
    severity: 'OK',
    title: 'Pneu dianteiro 130/70-17: fácil de encontrar — o mesmo tamanho de many naked 150-300cc brasileiras',
    body: 'Diferente dos pneus traseiros (raros), o pneu dianteiro do byCristo é 130/70-17 — tamanho extremamente comum em naked brasileiras como Honda CB 300, Yamaha MT-03, Kawasaki Z400 e similares. Disponível em qualquer borracharia de moto do Brasil por R$ 150-350. Calibragem: 28 PSI solo / 32 PSI com passageiro. Validade do pneu: 5 anos mesmo sem rodado (oxidação dos flancos) — em exemplares antigos, inspecione rachaduras laterais no pneu dianteiro antes de usar. Substitua se o pneu tiver mais de 5 anos independente do desgaste visual.',
  },
]

const STAR2_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Chicote elétrico com mais componentes: em exemplares +10 anos, oxidação nos conectores é comum',
    body: 'O Star II Top adicionou iluminação especial, painel digital de 7 instrumentos, sistema de som e controles adicionais — a complexidade elétrica é maior que o Star I. Em exemplares com mais de 10-15 anos: chicotes oxidados e fusíveis corroídos são os problemas mais comuns. Solução preventiva: a cada 2-3 anos, aplique spray limpa-contato elétrico (WD-40 Specialist ou Eletromecânico Quimolube) em todos os conectores acessíveis. Diagnóstico elétrico: qualquer mecânico elétrico automotivo consegue trabalhar — é sistema 12V convencional de carro, não é eletrônica especializada.',
  },
  {
    severity: 'WARN',
    title: 'Painel digital de 7 instrumentos: pixels queimados são comuns após 15+ anos',
    body: 'O painel digital do Star II Top usa displays de painéis de veículos dos anos 2000. Após 15+ anos, é comum aparecerem pixels mortos, retroiluminação fraca ou falha total do display. Substituição do painel original: praticamente impossível (peça exclusiva). Solução: instalar painel universal de moto (tipo trail ou custom) com velocímetro + conta-giros + temperatura de água. Custo: R$ 150-400 no Mercado Livre. A comunidade byCristo no Facebook pode ter painéis originais usados disponíveis — procure antes de partir para o alternativo.',
  },
]

const STAR2_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Star II / Top: idêntico ao Star I no motor + inspeção elétrica anual adicional',
    body: '5.000 km / 6 meses — Óleo motor 20W-50 ou 15W-40 (3,5L) + filtro Wega OC165. | 10.000 km — Inspecionar pastilhas de freio traseiro. | 15.000 km — Filtro de ar VW AP + correia do alternador. | 30.000 km — 4 velas NGK BPR6ES + filtro de combustível. | 40.000 km — Líquido de arrefecimento G12++ + óleo da transmissão 75W-90 GL-4 (~1,3L). | ANUAL: Inspecione todos os conectores elétricos (som, painel, iluminação) e aplique limpa-contato. Bateria: o byCristo usa bateria de carro 12V (não de moto) — troque a cada 3-4 anos ou quando apresentar dificuldade de partida no frio.',
  },
]

// ─── Triciclo Star II Top / Super Top / Flex ──────────────────────────────────

const STARTOPFLEX_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor Flex: aceita qualquer mistura gasolina/etanol — ajuste automático pela sonda lambda',
    body: 'A versão Flex do byCristo Star II usa o motor VW AP 1600 FlexPower — a mesma tecnologia do Gol Flex/Saveiro Flex. Você pode abastecer com gasolina comum, aditivada ou etanol em qualquer proporção. Autonomia: etanol puro rende ~190-210 km no tanque de 23L (mais barato por litro, mas consome mais). Gasolina rende ~230-260 km. Em viagens longas pelo interior: prefira gasolina — se não encontrar etanol, não há problema. Partida a frio: com etanol puro abaixo de 15°C o motor pode demorar a pegar — keep gasolina no tanque se mora em região de inverno frio.',
  },
  {
    severity: 'OK',
    title: 'Sistema DVD/MP3 (Super Top): atualizar para central Bluetooth moderna é simples e barato',
    body: 'A versão Super Top inclui sistema de DVD/MP3 de época. Modernizar para Bluetooth + USB + tela touch é simples — o espaço é padrão DIN duplo (o mais comum de carros dos anos 90/2000). Centrais recomendadas: Pioneer MVH-A315BT (R$ 400-700), JVC KW-M180BT (R$ 450-800), Sony MEX-M71BT (R$ 350-600). A instalação leva 2-3 horas em qualquer car audio shop. Os chicotes são padrão ISO de carro — adaptadores ISO VW disponíveis no ML por R$ 30-60. Resultado: streaming via Bluetooth, USB e autonomia de som muito superior ao sistema original.',
  },
  {
    severity: 'OK',
    title: 'Gancho de reboque (Super Top): capacidade de reboque sem freio = máx. 750 kg',
    body: 'A versão Super Top inclui gancho de reboque traseiro. Limite legal sem freio no reboque: 750 kg. Para reboques mais pesados: exige freio próprio no reboque e documentação específica. Atenção ao conjunto total: byCristo 700 kg + reboque 400 kg = 1.100 kg de conjunto. O motor AP 1600 de 96cv suporta, mas: acelerações ficam lentas, subidas longas exigem marcha baixa, e a distância de frenagem (já maior sem freio dianteiro) aumenta significativamente com reboque. Use o gancho preferencialmente em trajetos planos e curtos.',
  },
  {
    severity: 'WARN',
    title: 'Sonda lambda no motor Flex: verificação periódica é fundamental para desempenho e consumo',
    body: 'O motor Flex usa sonda lambda (sensor O2) para ajustar a mistura combustível/ar em tempo real. Se a sonda falhar: o motor fica "rico" (consumo excessivo + fumaça preta) ou "pobre" (engasgamento + perda de potência). Sintomas de falha: consumo aumentou sem explicação, motor engasga em aceleração, cheiro forte de combustível no escapamento. Troca da sonda lambda VW AP Flex: disponível em qualquer autopeças para VW Gol Flex (R$ 100-350). Diagnóstico via leitor OBD2 de carro (o byCristo tem conector OBD). Inspeção: a cada 40.000 km.',
  },
]

const STARTOPFLEX_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Armazenagem longa com etanol no tanque: o álcool deteriora vedantes antigos do sistema de combustível',
    body: 'Se o byCristo Flex ficar parado por mais de 30 dias com etanol no tanque, o álcool pode atacar os vedantes e borrachas do sistema de combustível — especialmente em exemplares com mangueiras dos anos 2000. Procedimento para guarda longa (+30 dias): abasteça com gasolina pura e deixe o motor trabalhar 10 minutos para circular gasolina por todo o sistema antes de guardar. Na retomada após guarda longa: verifique se há cheiro de combustível ou manchas embaixo do veículo antes de partir. Qualquer vazamento de combustível = pare imediatamente e conserte antes de qualquer uso.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico mais complexo: mais componentes = mais pontos de falha em exemplares +15 anos',
    body: 'O Super Top tem o sistema elétrico mais completo da linha byCristo: DVD, iluminação especial, faróis diferenciados, gancho de reboque com tomada 7 pinos. Em exemplares fabricados antes de 2010 com manutenção negligenciada, os chicotes chegam a 20 anos de idade. Inspeção anual: 1) Verifique visualmente o estado de todos os cabos visíveis. 2) Teste todas as funções elétricas antes de viagem longa. 3) Carregue fusíveis sobressalentes — são fusíveis de carro, kit de emergência R$ 10 em autopeças. 4) Antes de usar gancho de reboque: teste as luzes traseiras (conexão de reboque 7 pinos oxida rapidamente sem uso).',
  },
]

const STARTOPFLEX_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Star II Top/Super Top/Flex: motor AP + atenção especial ao sistema Flex e elétrica',
    body: '5.000 km / 6 meses — Óleo 20W-50 ou 15W-40 (3,5L) + filtro Wega OC165 + verificar nível de arrefecimento. | 10.000 km — Pastilhas de freio traseiro (CRÍTICO). | 15.000 km — Filtro de ar VW AP + correia alternador. | 30.000 km — 4 velas NGK BPR6ES (com etanol puro: a cada 20.000 km) + filtro combustível. | 40.000 km — Sonda lambda inspecionada/trocada + líquido arrefecimento G12++ + óleo da transmissão 75W-90 GL-4. | ANUAL: Inspeção completa do chicote elétrico + fusíveis + tomada reboque 7 pinos (aplique graxa de contato). | ANTES DE GUARDAR >30 DIAS: substitua etanol por gasolina no tanque.',
  },
]

// ─── Blocos de modelos ────────────────────────────────────────────────────────

const bycristoModels: ModelBlock[] = [
  {
    modelName: 'Triciclo Star I / Sport',
    yearFrom: 1999,
    yearTo: null,
    MACETES: STAR1_MACETES,
    PROBLEMAS: STAR1_PROBLEMAS,
    MANUTENCAO: STAR1_MANUTENCAO,
  },
  {
    modelName: 'Triciclo Star II / Top',
    yearFrom: 2000,
    yearTo: null,
    MACETES: STAR2_MACETES,
    PROBLEMAS: STAR2_PROBLEMAS,
    MANUTENCAO: STAR2_MANUTENCAO,
  },
  {
    modelName: 'Triciclo Star II Top / Super Top/Flex',
    yearFrom: 2005,
    yearTo: null,
    MACETES: STARTOPFLEX_MACETES,
    PROBLEMAS: STARTOPFLEX_PROBLEMAS,
    MANUTENCAO: STARTOPFLEX_MANUTENCAO,
  },
]

// ─── Calibragem de pneus ──────────────────────────────────────────────────────

const bycristoTirePressures: TirePressureInput[] = [
  {
    modelName: 'Triciclo Star I / Sport',
    yearFrom: 1999,
    yearTo: null,
    tireSize: 'Dianteiro 130/70-17 (moto) | Traseiro 295/50-15 par (eixo de carro)',
    frontPsi: 28,
    rearPsi: 26,
    frontPsiLoad: 32,
    rearPsiLoad: 30,
    notes: 'PNEU DIANTEIRO 130/70-17 (moto): 28 PSI solo / 32 PSI com passageiro. Fácil de encontrar em borracharias de moto. PNEUS TRASEIROS 295/50 R15 (par, eixo carro): 26 PSI em cada pneu solo / 30 PSI com carga. São pneus de buggy/picape — vá a borracharia com compressor de caminhão (compressor de moto pode ser insuficiente para essa pressão nesse volume). IMPORTANTE: calibre os dois pneus traseiros com a MESMA pressão — pressões diferentes desviam a trajetória do veículo. Verifique sempre com pneus frios (parado >2h). Frequência: a cada 15 dias.',
  },
  {
    modelName: 'Triciclo Star II / Top',
    yearFrom: 2000,
    yearTo: null,
    tireSize: 'Dianteiro 130/70-17 (moto) | Traseiro 295/50-15 par (eixo de carro)',
    frontPsi: 28,
    rearPsi: 26,
    frontPsiLoad: 32,
    rearPsiLoad: 30,
    notes: 'Idêntica ao Star I. Dianteiro 28 PSI solo / 32 PSI com passageiro. Traseiros: 26 PSI cada (par) solo / 30 PSI com carga. O Star II Top é ligeiramente mais pesado que o Star I (mais equipamentos), mas a diferença não altera significativamente a calibragem recomendada. Use manômetro digital — manômetros analógicos de posto tendem a ser imprecisos nesses valores.',
  },
  {
    modelName: 'Triciclo Star II Top / Super Top/Flex',
    yearFrom: 2005,
    yearTo: null,
    tireSize: 'Dianteiro 130/70-17 (moto) | Traseiro 295/50-15 par (eixo de carro)',
    frontPsi: 28,
    rearPsi: 26,
    frontPsiLoad: 32,
    rearPsiLoad: 32,
    notes: 'COM REBOQUE ACOPLADO (versão Super Top): acrescente 2 PSI nos traseiros (28 PSI cada). O gancho de reboque transfere carga vertical ao eixo traseiro. Dianteiro com reboque leve (até 300 kg): mantenha 28 PSI. Reboque pesado (300-750 kg): dianteiro 30 PSI. Verifique separadamente os pneus do reboque se houver. Sem reboque: mesma calibragem do Star II Top (26 PSI traseiros solo / 30 PSI com carga).',
  },
]

// ─── Itens de manutenção ──────────────────────────────────────────────────────

const bycristoMaintenanceItems: MaintenanceItemInput[] = [
  // ── Star I / Sport ──────────────────────────────────────────────────────────
  {
    modelName: 'Triciclo Star I / Sport',
    yearFrom: 1999,
    yearTo: null,
    component: 'Óleo do motor VW AP 1600 (20W-50 mineral ou 15W-40 semissintético, 3,5L)',
    intervalKm: 5000,
    intervalMonths: 6,
    notes: 'Filtro: Wega OC165 ou Tecfil PSL625. Compatível com VW Gol/Saveiro/Kombi AP. Mineral 20W-50 = mais barato. Semissintético 15W-40 = melhor em calor intenso e trânsito lento.',
    priority: 'CRITICAL',
    order: 1,
  },
  {
    modelName: 'Triciclo Star I / Sport',
    yearFrom: 1999,
    yearTo: null,
    component: 'Pastilhas de freio traseiro (ÚNICO freio do veículo)',
    intervalKm: 20000,
    intervalMonths: null,
    notes: 'INSPEÇÃO A CADA 10.000 km. Espessura mínima: 3 mm antes de trocar. Compatíveis com VW Gol G3/G4 dependendo do caliper. Nunca negligencie — é o único freio.',
    priority: 'CRITICAL',
    order: 2,
  },
  {
    modelName: 'Triciclo Star I / Sport',
    yearFrom: 1999,
    yearTo: null,
    component: 'Fluido de freio DOT 4',
    intervalKm: null,
    intervalMonths: 24,
    notes: 'Troca obrigatória a cada 2 anos — fluido velho absorve umidade e perde ponto de ebulição. DOT 4 = mais resistente ao calor que DOT 3.',
    priority: 'HIGH',
    order: 3,
  },
  {
    modelName: 'Triciclo Star I / Sport',
    yearFrom: 1999,
    yearTo: null,
    component: 'Filtro de ar (VW AP 1600)',
    intervalKm: 15000,
    intervalMonths: 12,
    notes: 'Wega ARL-1400 ou Tecfil ACP227. Disponível em qualquer autopeças VW. R$ 20-40.',
    priority: 'HIGH',
    order: 4,
  },
  {
    modelName: 'Triciclo Star I / Sport',
    yearFrom: 1999,
    yearTo: null,
    component: 'Velas de ignição — 4 unidades (NGK BPR6ES ou Bosch WR7DC)',
    intervalKm: 30000,
    intervalMonths: 24,
    notes: '4 cilindros = 4 velas. NGK BPR6ES é a especificação padrão do AP 1600. Troque todas de uma vez. R$ 10-20 cada.',
    priority: 'HIGH',
    order: 5,
  },
  {
    modelName: 'Triciclo Star I / Sport',
    yearFrom: 1999,
    yearTo: null,
    component: 'Líquido de arrefecimento (VW Rosa G12++ ou equivalente)',
    intervalKm: 40000,
    intervalMonths: 24,
    notes: 'Nunca use apenas água — corroe o motor AP internamente. Verifique nível mensalmente entre MIN e MAX. Troque a rolha do radiador junto.',
    priority: 'HIGH',
    order: 6,
  },
  {
    modelName: 'Triciclo Star I / Sport',
    yearFrom: 1999,
    yearTo: null,
    component: 'Filtro de combustível (VW AP 1600)',
    intervalKm: 30000,
    intervalMonths: 24,
    notes: 'Wega FC202 ou equivalente para VW AP. Disponível em autopeças.',
    priority: 'MEDIUM',
    order: 7,
  },
  {
    modelName: 'Triciclo Star I / Sport',
    yearFrom: 1999,
    yearTo: null,
    component: 'Óleo da transmissão VW (75W-90 GL-4, ~1,3L)',
    intervalKm: 40000,
    intervalMonths: null,
    notes: 'Transmissão tipo Kombi. Muitos donos esquecem essa troca por anos — câmbio com óleo velho endurece as trocas de marcha.',
    priority: 'MEDIUM',
    order: 8,
  },
  {
    modelName: 'Triciclo Star I / Sport',
    yearFrom: 1999,
    yearTo: null,
    component: 'Correia dentada ou corrente de distribuição do motor AP',
    intervalKm: 60000,
    intervalMonths: 60,
    notes: 'Modelos mais antigos: corrente. Mais novos: correia dentada. Consulte o manual do motor. Ruptura de correia = motor fundido (válvulas colidem com pistões). NÃO postergue.',
    priority: 'CRITICAL',
    order: 9,
  },
  {
    modelName: 'Triciclo Star I / Sport',
    yearFrom: 1999,
    yearTo: null,
    component: 'Balanceamento e rodízio dos pneus traseiros 295/50 R15',
    intervalKm: 10000,
    intervalMonths: 12,
    notes: 'Rodízio entre os dois traseiros evita desgaste diferencial. Localize borracharia com aro 15" de buggy/caminhonete antes de precisar — pneu 295/50 R15 não é encontrado em borracharias comuns.',
    priority: 'MEDIUM',
    order: 10,
  },

  // ── Star II / Top ────────────────────────────────────────────────────────────
  {
    modelName: 'Triciclo Star II / Top',
    yearFrom: 2000,
    yearTo: null,
    component: 'Óleo do motor VW AP 1600 (20W-50 ou 15W-40, 3,5L)',
    intervalKm: 5000,
    intervalMonths: 6,
    notes: 'Filtro Wega OC165 ou Tecfil PSL625. Idêntico ao Star I.',
    priority: 'CRITICAL',
    order: 1,
  },
  {
    modelName: 'Triciclo Star II / Top',
    yearFrom: 2000,
    yearTo: null,
    component: 'Pastilhas de freio traseiro (ÚNICO freio do veículo)',
    intervalKm: 20000,
    intervalMonths: null,
    notes: 'Inspecione a cada 10.000 km. CRÍTICO — único freio.',
    priority: 'CRITICAL',
    order: 2,
  },
  {
    modelName: 'Triciclo Star II / Top',
    yearFrom: 2000,
    yearTo: null,
    component: 'Fluido de freio DOT 4',
    intervalKm: null,
    intervalMonths: 24,
    notes: 'Troca obrigatória a cada 2 anos.',
    priority: 'HIGH',
    order: 3,
  },
  {
    modelName: 'Triciclo Star II / Top',
    yearFrom: 2000,
    yearTo: null,
    component: 'Velas de ignição — 4 unidades (NGK BPR6ES)',
    intervalKm: 30000,
    intervalMonths: 24,
    notes: '4 velas NGK BPR6ES. Troque todas juntas.',
    priority: 'HIGH',
    order: 4,
  },
  {
    modelName: 'Triciclo Star II / Top',
    yearFrom: 2000,
    yearTo: null,
    component: 'Líquido de arrefecimento G12++',
    intervalKm: 40000,
    intervalMonths: 24,
    notes: 'Troque a cada 2 anos. Verifique nível mensalmente.',
    priority: 'HIGH',
    order: 5,
  },
  {
    modelName: 'Triciclo Star II / Top',
    yearFrom: 2000,
    yearTo: null,
    component: 'Inspeção elétrica anual (chicotes, fusíveis, conectores do painel e som)',
    intervalKm: null,
    intervalMonths: 12,
    notes: 'Aplique limpa-contato em todos os conectores visíveis. Bateria de carro 12V: troque a cada 3-4 anos.',
    priority: 'MEDIUM',
    order: 6,
  },
  {
    modelName: 'Triciclo Star II / Top',
    yearFrom: 2000,
    yearTo: null,
    component: 'Óleo da transmissão VW (75W-90 GL-4, ~1,3L)',
    intervalKm: 40000,
    intervalMonths: null,
    notes: 'Transmissão tipo Kombi. Não esqueça — câmbio com óleo velho fica duro nas trocas.',
    priority: 'MEDIUM',
    order: 7,
  },

  // ── Star II Top / Super Top / Flex ───────────────────────────────────────────
  {
    modelName: 'Triciclo Star II Top / Super Top/Flex',
    yearFrom: 2005,
    yearTo: null,
    component: 'Óleo do motor VW AP 1600 Flex (20W-50 ou 15W-40, 3,5L)',
    intervalKm: 5000,
    intervalMonths: 6,
    notes: 'Motor Flex — mesmo óleo do AP convencional. Com uso exclusivo de etanol: mantenha o intervalo de 5.000 km (etanol diluí o óleo levemente mais rápido).',
    priority: 'CRITICAL',
    order: 1,
  },
  {
    modelName: 'Triciclo Star II Top / Super Top/Flex',
    yearFrom: 2005,
    yearTo: null,
    component: 'Pastilhas de freio traseiro (ÚNICO freio do veículo)',
    intervalKm: 20000,
    intervalMonths: null,
    notes: 'Inspecione a cada 10.000 km. CRÍTICO — único freio.',
    priority: 'CRITICAL',
    order: 2,
  },
  {
    modelName: 'Triciclo Star II Top / Super Top/Flex',
    yearFrom: 2005,
    yearTo: null,
    component: 'Fluido de freio DOT 4',
    intervalKm: null,
    intervalMonths: 24,
    notes: 'Troca obrigatória a cada 2 anos.',
    priority: 'HIGH',
    order: 3,
  },
  {
    modelName: 'Triciclo Star II Top / Super Top/Flex',
    yearFrom: 2005,
    yearTo: null,
    component: 'Sonda lambda / sensor O2 (motor Flex)',
    intervalKm: 40000,
    intervalMonths: null,
    notes: 'Fundamental no Flex para ajuste da mistura. Equivalente VW Gol Flex disponível em autopeças (R$ 100-350). Sintoma de falha: consumo alto, engasgamento ou fumaça preta.',
    priority: 'HIGH',
    order: 4,
  },
  {
    modelName: 'Triciclo Star II Top / Super Top/Flex',
    yearFrom: 2005,
    yearTo: null,
    component: 'Velas de ignição — 4 unidades (NGK BPR6ES)',
    intervalKm: 30000,
    intervalMonths: 24,
    notes: 'Com etanol puro constante: reduzir para 20.000 km. NGK BPR6ES para VW AP.',
    priority: 'HIGH',
    order: 5,
  },
  {
    modelName: 'Triciclo Star II Top / Super Top/Flex',
    yearFrom: 2005,
    yearTo: null,
    component: 'Líquido de arrefecimento G12++',
    intervalKm: 40000,
    intervalMonths: 24,
    notes: 'Troque a cada 2 anos. Verifique nível mensalmente.',
    priority: 'HIGH',
    order: 6,
  },
  {
    modelName: 'Triciclo Star II Top / Super Top/Flex',
    yearFrom: 2005,
    yearTo: null,
    component: 'Inspeção elétrica anual + tomada de reboque 7 pinos (Super Top)',
    intervalKm: null,
    intervalMonths: 12,
    notes: 'Aplique graxa de contato nos 7 pinos da tomada de reboque para evitar oxidação. Teste as luzes do reboque antes de qualquer uso.',
    priority: 'MEDIUM',
    order: 7,
  },
  {
    modelName: 'Triciclo Star II Top / Super Top/Flex',
    yearFrom: 2005,
    yearTo: null,
    component: 'Substituição do etanol por gasolina antes de guardar >30 dias',
    intervalKm: null,
    intervalMonths: null,
    notes: 'Procedimento obrigatório antes de guarda longa. Etanol no tanque por >30 dias corrói vedantes antigos do sistema de combustível.',
    priority: 'MEDIUM',
    order: 8,
  },
]

// ─── Runner ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('🛺  Seed byCristo iniciando...\n')

  const motoType = await prisma.vehicleType.upsert({
    where: { slug: 'moto' },
    update: {},
    create: { slug: 'moto', label: 'Moto' },
  })

  const bycristoBrand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'byCristo', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'byCristo', vehicleTypeId: motoType.id },
  })
  console.log(`  ✅ Brand: ${bycristoBrand.name}`)

  let totalTips = 0

  for (const block of bycristoModels) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: bycristoBrand.id } },
      update: {},
      create: { name: block.modelName, brandId: bycristoBrand.id },
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

    totalTips += allTips.length

    console.log(
      `  🔧 ${block.modelName} (${block.yearFrom ?? '?'}–${block.yearTo ?? 'atual'}): ` +
      `${block.MACETES.length} macetes, ${block.PROBLEMAS.length} problemas`,
    )
  }

  console.log('\n  📏 Calibragem de pneus...')
  for (const tp of bycristoTirePressures) {
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
  const modelNames = [...new Set(bycristoMaintenanceItems.map(m => m.modelName))]
  for (const name of modelNames) {
    await prisma.maintenanceItem.deleteMany({ where: { modelName: name } })
  }
  await prisma.maintenanceItem.createMany({
    data: bycristoMaintenanceItems.map(item => ({
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
    const count = bycristoMaintenanceItems.filter(m => m.modelName === name).length
    console.log(`  ✅ ${name}: ${count} itens de manutenção`)
  }

  console.log(
    `\n✅ Seed byCristo concluído: ${bycristoModels.length} modelos, ${totalTips} dicas, ` +
    `${bycristoTirePressures.length} calibragens, ${bycristoMaintenanceItems.length} itens de manutenção.`,
  )
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
