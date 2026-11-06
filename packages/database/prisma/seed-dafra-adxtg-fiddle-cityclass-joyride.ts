/**
 * Seed DAFRA — ADXTG 150, Fiddle III 125, CityClass 200i, Joyride 300
 * Linha atual de scooters DAFRA, produzidas sob licença/parceria com a SYM (Taiwan)
 *
 * CONTEXTO: a parceria DAFRA↔TVS terminou em 03/2024, mas a DAFRA NÃO encerrou operações —
 * ela segue vendendo e assistindo motos no Brasil, agora com foco na parceria com a SYM.
 * Os quatro modelos deste arquivo são produtos CORRENTES, vendidos ativamente em
 * concessionárias DAFRA com rede de peças e assistência funcionando normalmente:
 *
 * - ADXTG 150: lançamento 2026, scooter aventureira mais nova da marca. Motor 149,6cc
 *   4 válvulas refrigerado a líquido, 14,7cv/1,4kgf.m, CVT, freios a disco duplo com ABS,
 *   rodas 13", painel TFT, iluminação full LED, chave presencial, controle de tração,
 *   tanque 15L, preço de lançamento R$ 21.990.
 * - Fiddle III 125: scooter urbano compacto e retrô, em linha desde 2016, motor 124,6cc
 *   a ar/óleo, freios FH-CBS.
 * - CityClass 200i: scooter urbano 200cc injetado a ar, em linha desde 2013, o "maxi
 *   econômico" da marca.
 * - Joyride 300: maxi-scooter 300cc a líquido, sucessora da Citycom 300i, lançada em 2025.
 *
 * Fontes: daframotos.com.br (landing pages e tabela de óleos/fluidos), motociclismoonline.com.br
 * (teste ADXTG 150 2026), magodoscarros.com e fichatecnica.motosblog.com.br (fichas técnicas),
 * novasmotos.com.br, maisbrasilmotos.com.br, reclameaqui.com.br (relatos de proprietários
 * CityClass 200i, Joyride 300 e Fiddle III), ngkntk.com.br / ngk part-finder (velas SYM).
 *
 * NOTA IMPORTANTE sobre precisão: specs de motor, freios, pneus e capacidades foram
 * confirmadas em fichas técnicas oficiais/imprensa especializada. Já pressões de pneu (PSI)
 * e alguns códigos de vela específicos NÃO tinham fonte 100% confirmada para o modelo exato
 * no momento da escrita — nesses casos foi usado valor de referência de scooters de porte/
 * pneu equivalente (mesma prática usada no restante do catálogo DAFRA), com nota explícita
 * no corpo do texto pedindo confirmação no manual do proprietário.
 *
 * Execute: pnpm --filter @motormacete/database exec tsx prisma/seed-dafra-adxtg-fiddle-cityclass-joyride.ts
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

// ─── ADXTG 150 (lançamento 2026) ─────────────────────────────────────────────

const ADXTG150_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor novo 149,6cc 4V líquido: respeite o amaciamento nos primeiros 1.000 km',
    body: 'A ADXTG 150 estreou em 2026 com um motor monocilíndrico 4 válvulas totalmente novo na linha DAFRA/SYM, refrigerado a líquido, entregando 14,7cv e 1,4kgf.m. Motor novo de projeto recente ainda precisa de amaciamento correto: evite ultrapassar 6.000 rpm nos primeiros 1.000 km, varie a rotação (não ande sempre na mesma marcha/rotação) e faça a primeira troca de óleo dentro do prazo indicado pela concessionária — isso remove partículas metálicas da fabricação que ficam em suspensão no óleo original.',
  },
  {
    severity: 'OK',
    title: 'Painel TFT com múltiplos layouts: configure o modo de consumo médio',
    body: 'O painel TFT da ADXTG 150 tem mais de um layout de exibição. Configure a tela para mostrar consumo médio (km/L) e autonomia restante — como é motor novo na linha, acompanhar esses números nas primeiras semanas ajuda a identificar rapidamente qualquer desvio de consumo que indique regulagem de injeção fora do padrão.',
  },
  {
    severity: 'WARN',
    title: 'Chave presencial (keyless): sempre ande com a chave reserva',
    body: 'O sistema de chave presencial da ADXTG 150 depende de uma bateria interna no controle. Se essa bateria descarregar longe de casa, o procedimento de emergência (chave física de backup ou reconhecimento por proximidade direta) precisa ser conhecido antes que aconteça. Guarde a chave reserva em local seguro e teste o procedimento de emergência do manual pelo menos uma vez logo após a compra.',
  },
  {
    severity: 'OK',
    title: 'Controle de tração: mantenha ativado em piso molhado ou irregular',
    body: 'A ADXTG 150 é a primeira scooter da DAFRA com controle de tração de série. Em piso de paralelepípedo, pintura de faixa de pedestre molhada ou terra batida, deixar o sistema ativado reduz risco de patinação na roda traseira ao acelerar. Desative apenas em situações específicas (ex.: arrancada controlada em piso seco e limpo) e reative logo em seguida.',
  },
  {
    severity: 'OK',
    title: 'Iluminação full LED: sem lâmpadas para trocar, mas verifique o conector do farol após lavagem',
    body: 'Toda a iluminação da ADXTG 150 é LED — não há lâmpadas incandescentes para queimar. O ponto de atenção é outro: após lavagem com jato de água ou chuva muito forte, verifique se os conectores do farol dianteiro (região mais exposta) estão bem encaixados. Umidade em conector mal encaixado pode causar oscilação de luz sem indicar falha real do LED.',
  },
  {
    severity: 'OK',
    title: 'Tanque de 15L: o maior da categoria — planeje trocas de óleo por tempo, não só por autonomia',
    body: 'Com 15 litros de tanque, a ADXTG 150 roda muito mais km entre abastecimentos que uma scooter urbana comum. Isso é ótimo para autonomia, mas significa que muita gente vai bater os 3.000 km de troca de óleo antes de "sentir" que precisa — programe a troca por data no calendário do celular, não só de olho no odômetro.',
  },
  {
    severity: 'OK',
    title: 'Rede DAFRA/SYM ativa: aproveite as revisões programadas para registrar o histórico',
    body: 'A ADXTG 150 tem rede de concessionárias DAFRA em funcionamento normal para peças, garantia e revisões — não é um modelo legado com peças escassas. Faça todas as revisões programadas na rede autorizada e guarde as notas fiscais/checklists: por ser lançamento recente, um histórico de manutenção completo aumenta bastante o valor de revenda daqui a alguns anos.',
  },
]

const ADXTG150_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Suspensão dianteira com curso de 90 mm: testes da imprensa notaram falta de robustez em buracos fortes',
    body: 'No teste de lançamento (2026), a imprensa especializada apontou que a suspensão dianteira da ADXTG 150 "poderia ser mais parruda" em terrenos irregulares, apesar de bom desempenho em uso urbano. Como é um garfo com curso relativamente curto (90 mm) para uma scooter com proposta aventureira, reduza a velocidade em buracos profundos e lombadas mal sinalizadas — o batente pode ser atingido antes do esperado.',
  },
  {
    severity: 'WARN',
    title: 'Motor a líquido: verifique o nível do reservatório de arrefecimento mensalmente mesmo sendo 0 km',
    body: 'Por ser motor novo refrigerado a líquido, ainda não há histórico de longo prazo sobre eventuais pontos fracos do sistema de arrefecimento na ADXTG 150. Como prevenção, verifique o nível do reservatório auxiliar mensalmente (entre MIN e MAX) e observe se há qualquer mancha ou gotejamento sob a moto após ficar estacionada — identificar um vazamento pequeno cedo evita superaquecimento e dor de cabeça maior no motor.',
  },
  {
    severity: 'WARN',
    title: 'Freios a disco duplo com ABS: pastilhas novas precisam de amaciamento nos primeiros 200 km',
    body: 'Pastilhas de freio novas (de fábrica) não têm a mesma mordida de uma pastilha já amaciada. Nos primeiros 200 km da ADXTG 150, evite freadas muito bruscas e de emergência sempre que possível — isso ajuda a formar a camada de transferência de material entre pastilha e disco de forma uniforme, o que melhora a frenagem e reduz ruído/vibração no médio prazo.',
  },
  {
    severity: 'WARN',
    title: 'Sistemas eletrônicos novos (TFT, keyless, controle de tração): atualize o software nas revisões',
    body: 'A ADXTG 150 reúne, pela primeira vez na linha DAFRA/SYM 150cc, uma combinação de painel TFT, chave presencial e controle de tração — todos dependentes de módulos eletrônicos e software. Como é lançamento recente, é esperado que a SYM/DAFRA lance atualizações de calibração ao longo dos primeiros meses de produção. Pergunte na concessionária, a cada revisão, se há atualização de software pendente para os módulos do veículo.',
  },
  {
    severity: 'WARN',
    title: 'Poucos históricos de longo prazo: documente tudo dentro da rede autorizada nos primeiros 2 anos',
    body: 'Por ser um lançamento muito recente (2026), ainda não existem relatos consolidados de problemas de longo prazo (30.000+ km) da ADXTG 150 em fóruns e grupos de proprietários. Isso não é motivo para desconfiança — é característica normal de qualquer modelo novo. A recomendação prática: mantenha 100% das revisões dentro da rede DAFRA nos primeiros 24 meses, para garantir cobertura de garantia caso surja algum defeito de série típico de primeira geração de um motor novo.',
  },
]

const ADXTG150_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma ADXTG 150: siga a rede DAFRA nos primeiros anos por ser motor novo na linha',
    body: '1.000 km — Revisão de rodagem: troca de óleo motor (Mobil Super 4T 10W-30 semissintético, ~1,0 L), verificação geral e reaperto de parafusos. | 3.000 km — Troca de óleo motor rotineira. | 5.000 km — Limpar/verificar filtro de ar. Inspecionar correia CVT e roletes do variador. Verificar nível do líquido de arrefecimento. | 6.000 km — Vela de ignição (verificar; código específico deste motor novo — confirmar no manual da concessionária DAFRA). | 10.000 km — Filtro de ar (trocar). Inspecionar pastilhas de freio dianteiro e traseiro (ABS). | 12.000 km — Correia CVT e kit de roletes (inspecionar/trocar conforme desgaste). Fluido de freio DOT 4. | 20.000 km — Trocar líquido de arrefecimento. Rolamentos de roda. Folga de válvulas (motor 4V — conferir especificação exata no manual).',
  },
]

// ─── FIDDLE III 125 (em linha desde 2016) ────────────────────────────────────

const FIDDLE125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor a ar e óleo 124,6cc: deixe 1 minuto de marcha lenta antes de rodar a frio',
    body: 'O motor da Fiddle III é refrigerado a ar e óleo (não tem radiador de água), então depende mais da circulação interna do óleo para dissipar calor no início do funcionamento. Com o motor frio, deixe cerca de 1 minuto em marcha lenta antes de sair rodando, especialmente em dias frios — isso garante que o óleo já esteja circulando pelas partes altas do motor antes de qualquer carga maior.',
  },
  {
    severity: 'OK',
    title: 'Freio FH-CBS: use os dois freios juntos, o sistema já distribui a força entre as rodas',
    body: 'A Fiddle III tem sistema FH-CBS (Full Hidraulic Combined Brake System): o freio dianteiro tem dois discos com pinças de duplo pistão e o traseiro atua com pinça mono-pistão de forma combinada. Acostume-se a usar sempre os dois freios (dianteiro e traseiro) em conjunto — o sistema foi calibrado para funcionar dessa forma e frear só com uma das manoplas reduz a eficiência total de frenagem.',
  },
  {
    severity: 'OK',
    title: 'Pneus Pirelli Evo tubeless: calibre semanalmente mesmo sem furos aparentes',
    body: 'A Fiddle III sai de fábrica com pneus Pirelli Evo (110/70-12 dianteiro e 120/70-12 traseiro), medida pequena e de perfil baixo. Pneus desse tamanho perdem pressão perceptivelmente mais rápido que pneus grandes — calibre pelo menos uma vez por semana com o pneu frio, mesmo sem sinal visível de furo ou perda.',
  },
  {
    severity: 'WARN',
    title: 'Tanque de apenas 6,2 L: não deixe chegar à reserva em trajetos longos desconhecidos',
    body: 'A Fiddle III tem tanque pequeno (6,2 L), típico de scooter urbana compacta. Em deslocamentos mais longos ou em regiões que você não conhece bem os postos, reabasteça assim que o ponteiro passar da metade — o tanque reduzido dá pouca margem de erro comparado a scooters maiores da própria linha DAFRA.',
  },
  {
    severity: 'OK',
    title: 'CVT: acelere de forma progressiva nos primeiros metros com motor frio',
    body: 'Como toda scooter com câmbio CVT, a Fiddle III sofre mais desgaste de correia e roletes quando o acelerador é aberto bruscamente com o motor ainda frio. Nos primeiros 2-3 km de cada trajeto, acelere de forma progressiva — o hábito simples estende consideravelmente a vida útil da correia CVT.',
  },
  {
    severity: 'OK',
    title: 'Peso leve (115 kg) facilita manobra em vaga apertada e no dia a dia urbano',
    body: 'Com apenas 115 kg de peso seco, a Fiddle III é uma das scooters mais leves e fáceis de manobrar da linha DAFRA/SYM — ideal para quem estaciona em vagas apertadas ou tem pouca prática de moto. O lado negativo é que, por ser leve, ventos laterais fortes em pontes e viadutos têm mais efeito perceptível — segure o guidão com firmeza extra nesses trechos.',
  },
]

const FIDDLE125_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Relé de partida: falha intermitente reportada — moto só liga com o freio acionado',
    body: 'Há relatos de proprietários da Fiddle III sobre o relé de partida apresentando falha progressiva: a moto liga normalmente no início, depois passa a só dar partida elétrica com uma das manoplas de freio acionada, e em estágio mais avançado para de ligar eletricamente por completo (só a pedal, se o seu ano tiver essa opção). Se notar esse padrão, leve à revisão cedo — o relé é uma peça de baixo custo e a troca preventiva evita ficar na mão.',
  },
  {
    severity: 'WARN',
    title: 'Correia CVT e roletes do variador: desgaste padrão de qualquer scooter SYM — não ignore o ronco',
    body: 'Como em toda transmissão CVT, a correia e os roletes do variador da Fiddle III desgastam com o uso e o sintoma é ronco crescente na aceleração e perda de resposta. É desgaste normal, não defeito de fabricação — mas ignorar o sintoma por muito tempo pode acabar rompendo a correia (moto parada até a troca). Ao notar ronco, agende a inspeção do CVT na próxima revisão.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico/painel: relatos de infiltração de água em dias de chuva forte',
    body: 'Proprietários de modelos DAFRA/SYM em geral (incluindo a linha Fiddle) relatam ocasionalmente infiltração de umidade no sistema elétrico em chuva muito forte, causando luzes de aviso acendendo sem motivo aparente ou oscilação no painel. Após pegar chuva pesada, seque bem os conectores visíveis (sob o banco, próximo à bateria) e, se o alerta persistir depois de seco, leve à concessionária — pode ser só um conector solto, não necessariamente defeito grave.',
  },
  {
    severity: 'WARN',
    title: 'CBS mal calibrado após manutenção deixa o freio traseiro hipersensível',
    body: 'O sistema FH-CBS da Fiddle III exige calibração correta ao trocar pastilhas ou fluido de freio. Serviço mal executado pode deixar o acionamento do freio traseiro sensível demais, causando frenagem brusca com pouco esforço na manopla. Sempre que fizer manutenção no sistema de freios, teste em local seguro e vazio antes de sair no trânsito normal.',
  },
]

const FIDDLE125_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Fiddle III 125: scooter urbana simples de manter em dia',
    body: '1.000 km — Troca de óleo motor (Mobil Super Moto 4T 20W/50, ~0,95 L) + verificação geral de rodagem. | 3.000 km — Troca de óleo motor rotineira. | 5.000 km — Limpar filtro de ar. Inspecionar correia CVT e roletes do variador. Verificar folga do freio traseiro (CBS). | 6.000 km — Vela NGK CR7HSA (mesma referência usada na Fiddle II — confirmar no manual, pois pode haver atualização de código na III). | 10.000 km — Filtro de ar (trocar). Pastilhas de freio dianteiro (disco duplo) e traseiro. | 15.000 km — Correia CVT e kit de roletes (trocar se desgastados). Fluido de freio DOT 4 (sistema FH-CBS completo). | 20.000 km — Rolamentos de roda. Inspecionar relé de partida (falha progressiva conhecida — trocar se sintoma aparecer).',
  },
]

// ─── CITYCLASS 200i (em linha desde 2013) ────────────────────────────────────

const CITYCLASS200I_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor a ar horizontal 199,1cc: dê 1-2 minutos de aquecimento antes de acelerar forte',
    body: 'O motor da CityClass 200i é resfriado a ar, com cilindro em disposição horizontal — layout que depende bastante do fluxo de ar para dissipar calor. Antes de acelerar forte (ultrapassagem, subida), deixe o motor rodar 1-2 minutos em marcha lenta ou em velocidade baixa, principalmente em dias muito quentes ou no trânsito parado por muito tempo, quando o fluxo de ar é menor.',
  },
  {
    severity: 'OK',
    title: 'Freio dianteiro com pinça de 3 pistões: potente, mas dose a força — não tem ABS',
    body: 'A CityClass 200i tem freio dianteiro com disco ventilado de 240 mm e pinça de 3 pistões — uma frenagem dianteira relativamente forte para a categoria, mas sem ABS. Em piso molhado ou com areia/óleo na pista, dose a força na manopla dianteira com cuidado extra, priorizando o uso combinado com o freio traseiro para não travar a roda.',
  },
  {
    severity: 'OK',
    title: 'Suspensão traseira com ajuste de pré-carga: regule para o seu peso e uso com garupa',
    body: 'Diferente de scooters mais básicas, a CityClass 200i tem ajuste de pré-carga na suspensão traseira. Se você anda frequentemente com garupa ou carga no bagageiro, aumente a pré-carga para evitar que o amortecedor "afunde" e bata no batente em buracos. Para uso solo na cidade, a regulagem mais macia de fábrica costuma ser mais confortável.',
  },
  {
    severity: 'WARN',
    title: 'Tanque de 6 L (1,2 L de reserva): planeje abastecimento com folga em trajetos fora da rotina',
    body: 'A CityClass 200i tem tanque relativamente pequeno para uma scooter 200cc — 6 litros, sendo 1,2 L já contabilizado como reserva. Em passeios ou trajetos fora da rotina diária, não deixe para abastecer só quando a reserva acender; o motor 200cc consome mais que uma 125/150cc, reduzindo a autonomia real por litro.',
  },
  {
    severity: 'OK',
    title: 'Correia dentada (transmissão final): inspecione tensão e desgaste junto com o CVT',
    body: 'A CityClass 200i usa correia dentada para a transmissão final (diferente de corrente), então não precisa de lubrificação como uma corrente convencional — mas ainda assim desgasta e deve ser inspecionada visualmente por rachaduras ou dentes gastos a cada revisão, junto com a correia do variador CVT.',
  },
]

const CITYCLASS200I_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Relé de partida posicionado perto da roda traseira: água de chuva pode danificá-lo',
    body: 'Mecânicos de concessionárias DAFRA relatam um ponto de projeto da CityClass 200i: o relé de partida fica posicionado na parte inferior da moto, próximo à roda traseira, região exposta ao respingo de água durante o giro da roda em dia de chuva. Isso pode causar falha do relé com o tempo (moto não dá partida elétrica). Prevenção: evite lavar a moto com jato de alta pressão diretamente nessa área e, após rodar em chuva forte, deixe secar bem antes de guardar na garagem fechada.',
  },
  {
    severity: 'WARN',
    title: 'Problemas no CVT relatados como recorrentes por parte dos proprietários',
    body: 'Há relatos consistentes de proprietários sobre problemas no sistema CVT da CityClass 200i, incluindo perda de resposta na aceleração e ruídos anormais no variador. Ao notar qualquer ronco crescente, "patinada" na retomada ou perda de força que não melhora com a aceleração, leve para inspeção do CVT (correia + roletes + embreagem centrífuga) o quanto antes — atraso costuma piorar o desgaste de peças vizinhas no conjunto.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo do motor: verifique a junta do cárter e a vedação da tampa periodicamente',
    body: 'Proprietários relatam vazamento de óleo do motor em alguns exemplares da CityClass 200i, o que também pode causar oscilação de nível e, em casos extremos, o motor desligar sozinho em movimento por baixo nível de óleo. Verifique o chão da garagem periodicamente em busca de manchas de óleo e confira o nível a cada abastecimento — não confie apenas na luz de alerta do painel.',
  },
  {
    severity: 'WARN',
    title: 'Painel/velocímetro: falhas elétricas reportadas — peça de reposição pode demorar',
    body: 'Há relatos de painel e velocímetro parando de funcionar (zerando odômetro, hodômetro parcial ou velocidade) em unidades da CityClass 200i, e alguns proprietários relatam dificuldade para encontrar a peça de reposição rapidamente na rede. Se notar qualquer instabilidade no painel (piscando, zerando sozinho), documente com foto/vídeo e acione a garantia o quanto antes, antes que o problema se agrave.',
  },
  {
    severity: 'WARN',
    title: 'Bateria: substituição prematura relatada mesmo em motos com poucos km rodados',
    body: 'Alguns proprietários relatam necessidade de trocar a bateria da CityClass 200i mais de uma vez em pouco tempo de uso, mesmo com quilometragem baixa. Se a moto começar a "engasgar" para dar partida ou o painel piscar ao ligar os piscas com o motor desligado, teste a carga da bateria — pode ser desgaste prematuro e não necessariamente falha do sistema de carga (estator/retificador).',
  },
]

const CITYCLASS200I_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma CityClass 200i: revisão a cada 5.000 km segundo o programa oficial',
    body: '1.000 km — Troca de óleo motor (SAE 20W50, verificar capacidade exata no manual) + revisão de rodagem. | 5.000 km — Troca de óleo motor rotineira (intervalo oficial do programa de manutenção DAFRA). Verificar filtro de ar. Inspecionar correia CVT e correia dentada da transmissão final. | 6.000 km — Vela NGK CR7E (gap 0,7±0,1 mm). | 10.000 km — Filtro de ar (trocar). Pastilhas de freio dianteiro (3 pistões) e traseiro. Óleo do garfo dianteiro — ATF (~114 mL ± 3 mL cada lado). | 15.000 km — Correia CVT e kit de roletes (trocar se desgastados). Fluido de freio DOT 4. Verificar relé de partida (posição exposta à água — inspecionar corrosão). | 20.000 km — Rolamentos de roda. Testar carga da bateria.',
  },
]

// ─── JOYRIDE 300 (lançamento 2025, sucessora da Citycom 300i) ────────────────

const JOYRIDE300_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 278,3cc líquido EFI: moderno e mais potente que a antiga Citycom 300i',
    body: 'A Joyride 300 chegou em 2025 como sucessora da Citycom 300i, com motor monocilíndrico 4 tempos OHC 4 válvulas, refrigerado a líquido e injeção eletrônica, entregando 26 cv a 8.000 rpm — número bem acima da geração anterior. É um motor com tecnologia mais moderna: respeite o intervalo de troca de óleo à risca nos primeiros meses, já que ainda é um propulsor relativamente novo na linha DAFRA/SYM no Brasil.',
  },
  {
    severity: 'OK',
    title: 'Freios duplo disco com ABS nas duas rodas: use a frenagem combinada com confiança',
    body: 'A Joyride 300 tem disco dianteiro de 260 mm com pinça de 4 pistões e disco traseiro de 240 mm com 1 pistão, ambos com ABS. É um dos sistemas de freio mais robustos da linha DAFRA — em frenagens de emergência, pode confiar no ABS e aplicar força firme nos dois freios sem medo de travar a roda.',
  },
  {
    severity: 'OK',
    title: 'Tanque de 11,5 L com autonomia declarada de até 328 km: bom para viagens de fim de semana',
    body: 'Com 11,5 litros de tanque e autonomia declarada em torno de 328 km, a Joyride 300 é adequada para passeios e viagens curtas de fim de semana sem preocupação constante com abastecimento. Ainda assim, monitore o consumo real nas primeiras semanas — autonomia declarada é medida em condições controladas e o uso urbano com trânsito parado reduz esse número.',
  },
  {
    severity: 'OK',
    title: 'CVT de 1 marcha com embreagem centrífuga a seco: acelere suave nos primeiros km do dia',
    body: 'A embreagem centrífuga a seco da Joyride 300 tende a transmitir mais "solavanco" se o acelerador for aberto bruscamente com o motor ainda frio, comparado a embreagens em banho de óleo. Nos primeiros quilômetros de cada saída, acelere de forma progressiva — isso reduz o desgaste da embreagem e da correia do CVT ao longo do tempo.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão: teste em baixa velocidade em piso irregular antes de confiar em estradas ruins',
    body: 'Há relatos de proprietários sobre a suspensão da Joyride 300 sentindo-se dura e "pulando" em piso irregular, mesmo após a revisão dos 1.000 km. Antes de rodar em estradas esburacadas ou vias mal pavimentadas com confiança total, teste a moto em baixa velocidade nesses trechos e, se notar comportamento estranho persistente, volte à concessionária para reavaliação — pode ser regulagem de fábrica fora do padrão em alguns exemplares.',
  },
]

const JOYRIDE300_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Suspensão dura/"pulando" relatada mesmo após a revisão dos 1.000 km',
    body: 'Proprietários relataram, logo após a compra, que a Joyride 300 "pulava" demais e tinha direção dura — e que o problema persistiu mesmo depois da revisão oficial de 1.000 km. Se você notar esse comportamento, não aceite como "normal do modelo": documente em vídeo e insista na concessionária para um diagnóstico mais aprofundado da suspensão (dianteira e traseira), pois nem todos os exemplares parecem apresentar o problema.',
  },
  {
    severity: 'WARN',
    title: 'Caixa de direção: relato de ferrugem interna já aos 6 meses de uso',
    body: 'Há relato de proprietário que identificou a caixa de direção da Joyride 300 marcada e enferrujada internamente com apenas 6 meses de uso. Ainda que pareça caso isolado, vale pedir para o mecânico verificar a folga e o estado da caixa de direção nas primeiras revisões, especialmente se você guarda a moto exposta a chuva ou maresia.',
  },
  {
    severity: 'WARN',
    title: 'Suporte do paralama traseiro torto: pneu raspando é defeito de fabricação relatado, não desgaste',
    body: 'Alguns exemplares 0 km da Joyride 300 chegaram com o suporte do paralama traseiro torto de fábrica, causando o pneu raspar no paralama em certas condições de carga/curva. Se notar o pneu traseiro tocando ou raspando em algum ponto, não é normal e não deve ser ignorado — é caso de garantia, reporte imediatamente à concessionária antes de rodar mais.',
  },
  {
    severity: 'WARN',
    title: 'Barulho anormal ("de grilo") ao acelerar: relatado por mais de um proprietário',
    body: 'Há relatos de um ruído descrito como "barulho de grilo" ao acelerar em unidades 0 km da Joyride 300. A origem pode variar (correia CVT, escapamento, plástico da carenagem) — vale gravar um áudio do ruído em diferentes rotações e levar à concessionária para isolar a causa específica antes que vire um desgaste maior.',
  },
  {
    severity: 'WARN',
    title: 'Pós-venda/SAC: documente tudo por escrito desde a primeira revisão',
    body: 'Proprietários relatam insatisfação com o atendimento pós-venda em casos de defeito na Joyride 300, incluindo demora na análise técnica e dificuldade para conseguir veículo substituto durante o reparo. Recomendação prática: registre toda comunicação com a concessionária por escrito (e-mail/WhatsApp) desde a primeira revisão, e guarde cópia de todas as ordens de serviço — isso agiliza qualquer eventual acionamento de garantia ou reclamação formal.',
  },
]

const JOYRIDE300_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Joyride 300: revisões oficiais aos 1.000 km e 3.000 km, depois a cada 3.000 km',
    body: '1.000 km (janela 900-1.100 km) — Primeira revisão oficial: troca de óleo motor (Mobil Super 4T 10W-30 semissintético, ~1.200 mL), verificação geral, checagem de suspensão e folgas. | 3.000 km (±100 km) — Segunda revisão oficial: troca de óleo motor rotineira. Inspecionar correia CVT e roletes. | 6.000 km — Vela NGK CR8E (mesma referência usada em outros modelos SYM Joyride/Joymax 300 — confirmar no manual). Verificar líquido de arrefecimento. | 10.000 km — Filtro de ar. Pastilhas de freio dianteiro (4 pistões) e traseiro (ambos com ABS). | 15.000 km — Correia CVT e kit de roletes (trocar se desgastados). Fluido de freio DOT 4 (frente e trás). | 24.000 km — Trocar líquido de arrefecimento. Inspecionar mangueiras do radiador e bomba d\'água. | 30.000 km — Rolamentos de roda. Revisão completa da caixa de direção (relato de ferrugem interna precoce em alguns exemplares).',
  },
]

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'ADXTG 150cc',
    yearFrom: 2026,
    yearTo: null,
    MACETES: ADXTG150_MACETES,
    PROBLEMAS: ADXTG150_PROBLEMAS,
    MANUTENCAO: ADXTG150_MANUTENCAO,
  },
  {
    modelName: 'FIDDLE III 125',
    yearFrom: 2016,
    yearTo: null,
    MACETES: FIDDLE125_MACETES,
    PROBLEMAS: FIDDLE125_PROBLEMAS,
    MANUTENCAO: FIDDLE125_MANUTENCAO,
  },
  {
    modelName: 'CITYCLASS 200i',
    yearFrom: 2013,
    yearTo: null,
    MACETES: CITYCLASS200I_MACETES,
    PROBLEMAS: CITYCLASS200I_PROBLEMAS,
    MANUTENCAO: CITYCLASS200I_MANUTENCAO,
  },
  {
    modelName: 'JOYRIDE 300',
    yearFrom: 2025,
    yearTo: null,
    MACETES: JOYRIDE300_MACETES,
    PROBLEMAS: JOYRIDE300_PROBLEMAS,
    MANUTENCAO: JOYRIDE300_MANUTENCAO,
  },
]

// ─── TIRE PRESSURES ───────────────────────────────────────────────────────────
// Medidas de pneu confirmadas em ficha técnica oficial/imprensa. Pressões (PSI) usam
// valor de referência de scooters de porte/pneu equivalente na linha DAFRA — confirmar
// o valor exato no manual do proprietário de cada modelo.

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'ADXTG 150cc',
    yearFrom: 2026,
    yearTo: null,
    tireSize: '120/70-13 (F) · 130/70-13 (R)',
    frontPsi: 28,
    rearPsi: 32,
    frontPsiLoad: 28,
    rearPsiLoad: 36,
    notes: 'Medida de pneu confirmada em ficha oficial (rodas de liga leve aro 13). PSI é valor de referência para scooter de porte/pneu equivalente — confirme no manual do proprietário. Com garupa: 36 PSI traseiro.',
  },
  {
    modelName: 'FIDDLE III 125',
    yearFrom: 2016,
    yearTo: null,
    tireSize: '110/70-12 (F) · 120/70-12 (R)',
    frontPsi: 28,
    rearPsi: 32,
    frontPsiLoad: 28,
    rearPsiLoad: 36,
    notes: 'Pneus Pirelli Evo tubeless (medida confirmada em ficha oficial). PSI é valor de referência — confirme no manual. Com garupa: 36 PSI traseiro.',
  },
  {
    modelName: 'CITYCLASS 200i',
    yearFrom: 2013,
    yearTo: null,
    tireSize: '100/80-16 (F) · 120/80-16 (R)',
    frontPsi: 26,
    rearPsi: 30,
    frontPsiLoad: 26,
    rearPsiLoad: 33,
    notes: 'Medida de pneu confirmada em ficha oficial (aro 16, sem câmara). PSI é valor de referência para scooter de porte equivalente — confirme no manual. Com garupa: 33 PSI traseiro.',
  },
  {
    modelName: 'JOYRIDE 300',
    yearFrom: 2025,
    yearTo: null,
    tireSize: '120/70-15 (F) · 140/70-14 (R)',
    frontPsi: 30,
    rearPsi: 33,
    frontPsiLoad: 30,
    rearPsiLoad: 36,
    notes: 'Medida de pneu confirmada em ficha oficial. Maxi-scooter mais pesado da linha atual — PSI é valor de referência, confirme no manual. Com garupa: 36 PSI traseiro.',
  },
]

// ─── MAINTENANCE ITEMS ────────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // ADXTG 150
  { modelName: 'ADXTG 150cc', yearFrom: 2026, yearTo: null, component: 'Óleo motor (Mobil Super 4T 10W-30 semissintético, ~1,0 L)', intervalKm: 3000, intervalMonths: 6, notes: 'Primeira troca aos 1.000 km (revisão de rodagem)', priority: 'HIGH', order: 1 },
  { modelName: 'ADXTG 150cc', yearFrom: 2026, yearTo: null, component: 'Limpar/verificar filtro de ar', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'ADXTG 150cc', yearFrom: 2026, yearTo: null, component: 'Inspecionar correia CVT e roletes do variador', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'ADXTG 150cc', yearFrom: 2026, yearTo: null, component: 'Verificar nível do líquido de arrefecimento', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'ADXTG 150cc', yearFrom: 2026, yearTo: null, component: 'Vela de ignição (verificar código no manual — motor novo na linha)', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'ADXTG 150cc', yearFrom: 2026, yearTo: null, component: 'Filtro de ar (trocar)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'ADXTG 150cc', yearFrom: 2026, yearTo: null, component: 'Inspecionar pastilhas de freio (dianteiro e traseiro, ABS)', intervalKm: 10000, intervalMonths: null, notes: 'Amaciamento nos primeiros 200 km — evitar freadas bruscas', priority: 'MEDIUM', order: 7 },
  { modelName: 'ADXTG 150cc', yearFrom: 2026, yearTo: null, component: 'Correia CVT e kit de roletes (trocar se desgastados)', intervalKm: 12000, intervalMonths: null, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'ADXTG 150cc', yearFrom: 2026, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 12000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 9 },
  { modelName: 'ADXTG 150cc', yearFrom: 2026, yearTo: null, component: 'Trocar líquido de arrefecimento', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 10 },
  { modelName: 'ADXTG 150cc', yearFrom: 2026, yearTo: null, component: 'Rolamentos de roda', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 11 },
  { modelName: 'ADXTG 150cc', yearFrom: 2026, yearTo: null, component: 'Folga de válvulas (motor 4V)', intervalKm: 20000, intervalMonths: null, notes: 'Confirmar especificação exata no manual', priority: 'HIGH', order: 12 },

  // FIDDLE III 125
  { modelName: 'FIDDLE III 125', yearFrom: 2016, yearTo: null, component: 'Óleo motor (Mobil Super Moto 4T 20W/50, ~0,95 L)', intervalKm: 3000, intervalMonths: 6, notes: 'Primeira troca aos 1.000 km', priority: 'HIGH', order: 1 },
  { modelName: 'FIDDLE III 125', yearFrom: 2016, yearTo: null, component: 'Limpar filtro de ar', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'FIDDLE III 125', yearFrom: 2016, yearTo: null, component: 'Inspecionar correia CVT e roletes do variador', intervalKm: 5000, intervalMonths: null, notes: 'Ronco crescente = desgaste — não ignorar', priority: 'HIGH', order: 3 },
  { modelName: 'FIDDLE III 125', yearFrom: 2016, yearTo: null, component: 'Vela NGK CR7HSA', intervalKm: 6000, intervalMonths: null, notes: 'Código usado na Fiddle II — confirmar no manual da III', priority: 'HIGH', order: 4 },
  { modelName: 'FIDDLE III 125', yearFrom: 2016, yearTo: null, component: 'Filtro de ar (trocar)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 5 },
  { modelName: 'FIDDLE III 125', yearFrom: 2016, yearTo: null, component: 'Pastilhas de freio dianteiro (disco duplo) e traseiro (FH-CBS)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'FIDDLE III 125', yearFrom: 2016, yearTo: null, component: 'Correia CVT e kit de roletes (trocar se desgastados)', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'FIDDLE III 125', yearFrom: 2016, yearTo: null, component: 'Fluido de freio DOT 4 (sistema FH-CBS completo)', intervalKm: 15000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'FIDDLE III 125', yearFrom: 2016, yearTo: null, component: 'Inspecionar relé de partida', intervalKm: 15000, intervalMonths: null, notes: 'Falha progressiva conhecida — trocar preventivamente se moto só ligar com freio acionado', priority: 'MEDIUM', order: 9 },
  { modelName: 'FIDDLE III 125', yearFrom: 2016, yearTo: null, component: 'Rolamentos de roda', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 10 },

  // CITYCLASS 200i
  { modelName: 'CITYCLASS 200i', yearFrom: 2013, yearTo: null, component: 'Óleo motor (SAE 20W50)', intervalKm: 5000, intervalMonths: 6, notes: 'Intervalo oficial do programa de manutenção DAFRA — primeira troca aos 1.000 km', priority: 'HIGH', order: 1 },
  { modelName: 'CITYCLASS 200i', yearFrom: 2013, yearTo: null, component: 'Verificar filtro de ar', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'CITYCLASS 200i', yearFrom: 2013, yearTo: null, component: 'Inspecionar correia CVT e correia dentada da transmissão final', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'CITYCLASS 200i', yearFrom: 2013, yearTo: null, component: 'Vela NGK CR7E (gap 0,7±0,1 mm)', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'CITYCLASS 200i', yearFrom: 2013, yearTo: null, component: 'Filtro de ar (trocar)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 5 },
  { modelName: 'CITYCLASS 200i', yearFrom: 2013, yearTo: null, component: 'Pastilhas de freio dianteiro (3 pistões) e traseiro', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'CITYCLASS 200i', yearFrom: 2013, yearTo: null, component: 'Óleo do garfo dianteiro (ATF, ~114 mL ± 3 mL cada lado)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'CITYCLASS 200i', yearFrom: 2013, yearTo: null, component: 'Correia CVT e kit de roletes (trocar se desgastados)', intervalKm: 15000, intervalMonths: null, notes: 'Problema crônico relatado por parte dos proprietários — não adiar inspeção', priority: 'HIGH', order: 8 },
  { modelName: 'CITYCLASS 200i', yearFrom: 2013, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 15000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 9 },
  { modelName: 'CITYCLASS 200i', yearFrom: 2013, yearTo: null, component: 'Inspecionar relé de partida (posição exposta à água)', intervalKm: 15000, intervalMonths: null, notes: 'Verificar corrosão — peça posicionada perto da roda traseira', priority: 'MEDIUM', order: 10 },
  { modelName: 'CITYCLASS 200i', yearFrom: 2013, yearTo: null, component: 'Rolamentos de roda', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 11 },
  { modelName: 'CITYCLASS 200i', yearFrom: 2013, yearTo: null, component: 'Testar carga da bateria', intervalKm: 20000, intervalMonths: 12, notes: 'Substituição prematura relatada por parte dos proprietários', priority: 'MEDIUM', order: 12 },

  // JOYRIDE 300
  { modelName: 'JOYRIDE 300', yearFrom: 2025, yearTo: null, component: 'Óleo motor (Mobil Super 4T 10W-30 semissintético, ~1.200 mL)', intervalKm: 3000, intervalMonths: 6, notes: 'Revisões oficiais: 1ª aos 1.000 km (900-1.100 km), 2ª aos 3.000 km (±100 km)', priority: 'HIGH', order: 1 },
  { modelName: 'JOYRIDE 300', yearFrom: 2025, yearTo: null, component: 'Inspecionar correia CVT e roletes do variador', intervalKm: 3000, intervalMonths: null, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'JOYRIDE 300', yearFrom: 2025, yearTo: null, component: 'Vela NGK CR8E', intervalKm: 6000, intervalMonths: null, notes: 'Referência usada em outros modelos SYM Joyride/Joymax 300 — confirmar no manual', priority: 'HIGH', order: 3 },
  { modelName: 'JOYRIDE 300', yearFrom: 2025, yearTo: null, component: 'Verificar nível do líquido de arrefecimento', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'JOYRIDE 300', yearFrom: 2025, yearTo: null, component: 'Filtro de ar', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 5 },
  { modelName: 'JOYRIDE 300', yearFrom: 2025, yearTo: null, component: 'Pastilhas de freio dianteiro (4 pistões) e traseiro (ambos ABS)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'JOYRIDE 300', yearFrom: 2025, yearTo: null, component: 'Correia CVT e kit de roletes (trocar se desgastados)', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'JOYRIDE 300', yearFrom: 2025, yearTo: null, component: 'Fluido de freio DOT 4 (frente e trás)', intervalKm: 15000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'JOYRIDE 300', yearFrom: 2025, yearTo: null, component: 'Trocar líquido de arrefecimento', intervalKm: 24000, intervalMonths: 24, notes: 'Inspecionar mangueiras do radiador e bomba d\'água junto', priority: 'HIGH', order: 9 },
  { modelName: 'JOYRIDE 300', yearFrom: 2025, yearTo: null, component: 'Rolamentos de roda', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 10 },
  { modelName: 'JOYRIDE 300', yearFrom: 2025, yearTo: null, component: 'Revisão completa da caixa de direção', intervalKm: 30000, intervalMonths: 12, notes: 'Relato de ferrugem interna precoce em alguns exemplares — antecipar se guardado exposto a chuva/maresia', priority: 'MEDIUM', order: 11 },
]

// ─── RUNNER ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('🛵 Seed DAFRA ADXTG/Fiddle III/CityClass/Joyride iniciado...')

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

  console.log('✅ Seed DAFRA ADXTG/Fiddle III/CityClass/Joyride concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
