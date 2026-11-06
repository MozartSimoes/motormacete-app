/**
 * Seed BRP / Can-Am — macetes, problemas e manutenção
 * Cobre todos os modelos BRP/Can-Am registrados na tabela FIPE Brasil
 * (Spyder 990/1000/1330, Outlander, Defender, Maverick, Commander, DS)
 *
 * Fontes: can-am.brp.com, spyderlovers.com, canamspyderforums.com,
 *         recallonline.com.br, estradas.com.br, everythingcanamoffroad.com,
 *         enginepatrol.com, ManualsLib (manuais oficiais BRP)
 *
 * Execute: pnpm --filter @motormacete/database db:seed:brp
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

// ─── CAN-AM SPYDER 990 ───────────────────────────────────────────────────────

const SPYDER990_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo XPS 5W-40 — 4,0L com filtro; aceita Motul 300V ou Mobil 1 V-Twin',
    body: 'O Spyder 990 usa o motor Rotax 998cc V-Twin e requer 4,0L de óleo com troca do filtro. A BRP recomenda o óleo XPS (próprio), mas qualquer sintético de alta qualidade 5W-40 API SH ou superior funciona: Motul 7100 4T 5W-40, Mobil 1 V-Twin 20W-50 (climas quentes), Shell Advance Ultra 4 5W-40. Troca a cada 10.000 km ou 1 ano, o que vier primeiro. Dica: o Spyder tem DOIS pontos de troca de óleo — motor E transmissão CVT. Não esqueça de trocar os dois no mesmo serviço. O óleo da CVT fica em compartimento separado (SAE 75W-90 GL-5, 850 ml).',
  },
  {
    severity: 'OK',
    title: 'Correia de transmissão CVT: componente-chave — inspeção a cada troca de óleo',
    body: 'O Spyder usa correia de transmissão CVT em vez de corrente ou cardan. A correia BRP original deve ser inspecionada a cada troca de óleo e substituída conforme desgaste (geralmente 30.000–50.000 km). Custo da correia original: R$ 800–R$ 1.500. A correia Gates/Dayco não é recomendada — use apenas a correia BRP certificada. Dica: se sentir solavanco ao engatar (especialmente com motor frio), verifique desgaste da correia e molas da polia. Uma correia esticada causa perda de potência e aquecimento excessivo da CVT.',
  },
  {
    severity: 'WARN',
    title: 'DESS (D.E.S.S.) — sistema anti-roubo que pode deixar você na mão',
    body: 'O sistema DESS (Digital Encoded Security System) da BRP reconhece o "chip" na chave magnética. Se o sistema não reconhecer a chave, o motor simplesmente não liga — sem mensagem de erro útil. Causas: bateria fraca (abaixo de 11,5V o sistema DESS falha), chave com chip danificado por queda ou umidade, conector do switch de ignição oxidado. Solução: sempre tenha uma chave reserva (R$ 300–R$ 500 na concessionária BRP). Limpe os contatos do switch com WD-40 contact cleaner. Se a bateria caiu muito, carregue com carregador adequado antes de tentar partir.',
  },
  {
    severity: 'OK',
    title: 'Pastilhas de freio: vantagem de ser triciclo — ABS de série muito eficiente',
    body: 'O Spyder 990 tem ABS de série nos 3 freios (2 dianteiros + 1 traseiro) com sistema SM5 ou SE5. As pastilhas dianteiras desgastam mais — troca a cada 20.000–30.000 km dependendo do uso. Use pastilhas EBC FA244 (compatíveis) como alternativa às originais BRP: custam ~R$ 200 vs R$ 400 na concessionária. O fluido de freio DOT 4 deve ser trocado a cada 2 anos independentemente da quilometragem — o sistema tem 3 pinças e acumula umidade no fluido.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: K&N E-3540 como alternativa reutilizável',
    body: 'O filtro de ar original do Spyder 990 custa ~R$ 300–R$ 500 na concessionária. O filtro K&N E-3540 é compatível, reutilizável e pode ser limpo e re-oleado a cada 30.000 km. Custo: R$ 400–R$ 600, mas dura a vida útil do veículo. No Brasil, o pó da estrada (especialmente interior) compromete o filtro mais rápido — inspeção a cada 10.000 km em uso intenso.',
  },
]

const SPYDER990_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'RECALL OFICIAL — Spyder RT 2012/2013: superaquecimento acima de 30°C',
    body: 'A BRP convocou recall dos Can-Am Spyder Roadster RT fabricados entre jan/2012 e jun/2013. Em temperaturas acima de 30°C (comum no Brasil!) andando abaixo de 20 km/h (tráfego urbano), o motor pode superaquecer a ponto de causar queimaduras no piloto ou incêndio. A BRP instalou defletores de ar sem custo para o proprietário. Se você tem um RT 2012 ou 2013 e ainda não fez o recall, leve imediatamente a uma concessionária BRP. Contato BRP Brasil: (19) 3113-9600.',
  },
  {
    severity: 'DANGER',
    title: 'RECALL OFICIAL — Spyder RS SE5 e RT SE5 (2010): embreagem centrifuga trava',
    body: 'BRP convocou os modelos RS SE5 e RT SE5 de 2010 por falha no sistema de embreagem centrífuga. Quando o veículo para completamente com a transmissão semi-automática, a embreagem pode permanecer acoplada — causando extinção do motor e impossibilidade de religar com a roda traseira potencialmente travada. Risco grave de acidente ao tentar descer uma ladeira. Corrija na concessionária BRP sem custo.',
  },
  {
    severity: 'WARN',
    title: 'Aquecimento excessivo no trânsito lento — característico do V-Twin Rotax no Brasil',
    body: 'Mesmo após o recall, o Spyder 990 aquece bastante no trânsito parado de cidades brasileiras quentes (Rio, SP, Salvador). Sintomas: luz de temperatura subindo, calor vindo do motor no joelho esquerdo do piloto. Solução: mantenha rotações acima de 1.500 RPM em ponto morto para aumentar circulação do líquido de arrefecimento. Use apenas líquido de arrefecimento BRP XPS ou equivalente com inibidores de corrosão para alumínio — a mistura água+limão ou água pura corrói o motor Rotax.',
  },
  {
    severity: 'WARN',
    title: 'Transmissão SE5 — tempo de resposta lento e "baque" ao engatar: normal, mas incomoda',
    body: 'A transmissão semi-automática SE5 tem um delay perceptível ao trocar de marcha e um "baque" mecânico ao sair do neutro — característica do projeto, não defeito. No entanto: se o delay aumentar ou aparecer erro "Gear Fail" no painel, pode ser sensor de marcha sujo ou atuador elétrico com desgaste. Limpeza do sensor resolve ~70% dos casos. O cabo do shifter também pode precisar de ajuste se as marchas ficarem difíceis de engatar.',
  },
]

// ─── CAN-AM SPYDER 1000 ──────────────────────────────────────────────────────

const SPYDER1000_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Spyder RS/RT com motor 998cc: mesmo motor do 990 com pequenas evoluções',
    body: 'O "Spyder 1000" da FIPE corresponde às variantes RS e RT de 2013 com o motor Rotax 998cc V-Twin refinado. As especificações de manutenção são praticamente idênticas ao Spyder 990: óleo 5W-40, 4,0L com filtro, troca a cada 10.000 km ou anual. As mesmas peças alternativas do Spyder 990 se aplicam. A principal diferença são melhorias no sistema de embreagem (correção do recall 2010) e mapeamento eletrônico mais refinado.',
  },
  {
    severity: 'OK',
    title: 'Velas NGK DCPR9E — 2 velas, troca a cada 20.000 km',
    body: 'O motor V-Twin Rotax 998cc usa 2 velas NGK DCPR9E (uma por cilindro). Gap: 0,9 mm. Custo no Brasil: R$ 60–R$ 120 cada. A versão iridium DCPR9EIX é compatível e dura até 40.000 km — boa relação custo-benefício para quem roda muito. Para trocar: o carenamento precisa ser parcialmente removido — recomenda-se fazer junto com a troca de óleo para diluir mão de obra.',
  },
  {
    severity: 'WARN',
    title: 'Bateria: fundamental para o DESS — use bateria de 12V 18Ah ou maior',
    body: 'O sistema DESS e a eletrônica do Spyder são sensíveis à saúde da bateria. Uma bateria com menos de 12V em repouso já compromete a partida e o reconhecimento do sistema DESS. Use bateria YTX20L-BS ou equivalente (12V 18Ah). No Brasil, as temperaturas altas nas garagens prejudicam as baterias — troca preventiva a cada 3 anos. Instale um desconector de bateria se guardar o Spyder por mais de 2 semanas.',
  },
]

const SPYDER1000_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Erros no painel ("Fault Codes") — muitas vezes sensor, não mecânica',
    body: 'O Spyder RS/RT tem um sistema diagnóstico com dezenas de códigos de falha (P-codes). Proprietários relatam com frequência que o painel acusa erros que desaparecem sozinhos — especialmente sensores de ABS e de pressão de pneu. Antes de gastar dinheiro na concessionária: anote o código exato, consulte o fórum SpyderLovers (maior comunidade mundial), muitas vezes o problema já foi documentado com solução DIY. Um leitor de diagnóstico OBD-II genérico NÃO funciona no Spyder — requer software específico BRP (BUDS2) ou scanner compatível.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão nos conectores elétricos — problema grave no Brasil úmido',
    body: 'O clima úmido e salgado do litoral brasileiro, combinado com o mau costume de lavar com pressão alta, cria corrosão nos conectores elétricos do Spyder. Isso causa falhas intermitentes em ABS, DESS, luzes e sensores. Preventivo: aplique dieletric grease nos conectores a cada 2 anos. Nunca use jato de pressão diretamente nos faróis ou sob o painel. Se aparecerem falhas elétricas intermitentes, comece pelos conectores do chicote principal antes de ir à concessionária.',
  },
]

// ─── CAN-AM SPYDER 1330 ──────────────────────────────────────────────────────

const SPYDER1330_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor Rotax 1330 ACE (3 cilindros): óleo 5W-40, 5,2L com filtro',
    body: 'O Spyder 1330 usa o novo motor Rotax 1330 ACE (Advanced Combustion Efficiency) de 3 cilindros — maior e mais suave que o V-Twin do 990/1000. Capacidade de óleo: 5,2L (5,5 qt) com troca do filtro. Recomendado: BRP XPS 4-Stroke 5W-40 Full Synthetic. Alternativas aceitas: Mobil 1 5W-40 Full Synthetic, Castrol EDGE 5W-40, Motul 7100 4T 5W-40. Intervalo: 15.000 km ou 1 ano (melhorou em relação ao 990). O motor ACE de 3 cilindros é significativamente mais silencioso e com melhor consumo que o V-Twin anterior.',
  },
  {
    severity: 'OK',
    title: 'Troca de óleo do motor: 2 drenos — motor E transmissão CVT',
    body: 'Assim como o Spyder 990/1000, o 1330 também tem compartimentos separados para óleo do motor e da CVT. Ao fazer a revisão: (1) óleo do motor 5W-40, 5,2L; (2) óleo da CVT — verificar nível, não precisa trocar a cada revisão, mas inspete. Dica: o dreno do motor é um Torx T45 com torque de 28 Nm. A tampa do filtro de óleo fica no lado direito do motor. No modelo F3, o nível de óleo fica obscurecido pelo carenamento — use espelho de inspeção ou lance de luz de celular.',
  },
  {
    severity: 'WARN',
    title: 'RECALL: Polia estriada dianteira desgasta prematuramente — modelos 2015–2019',
    body: 'A BRP convocou recall dos Spyder RT Limited e F3-S de 2015 a 2019 (fabricados entre abr/2014 e abr/2019) por desgaste prematuro da polia estriada dianteira. O desgaste pode causar PERDA TOTAL DE PROPULSÃO com risco de acidente grave ou fatal. Verifique no site recall.brp.com se o número do chassi (VIN) do seu Spyder está incluído. Serviço gratuito na concessionária BRP. Sintoma: barulho metálico crescente na frente + eventual perda de tração.',
  },
  {
    severity: 'OK',
    title: 'F3 vs RT: diferenças de uso e manutenção que o dono precisa saber',
    body: 'O Spyder 1330 existe nas versões F3 (esportiva, posição inclinada, 3 rodas iguais) e RT (turismo, carenamento total, porta-malas integrado). O F3 tem visual de "trike esportivo" e posição de pilotagem mais agachada — mais cansativa em viagens longas mas mais divertida em curvas. O RT é ideal para viagens de longa distância (porta-malas 115L). A manutenção é idêntica, mas o RT tem sistema de suspensão traseira mais carregada — verifique amortecedor traseiro a cada 40.000 km ou se sentir instabilidade.',
  },
  {
    severity: 'OK',
    title: 'Pressão dos pneus: dianteiros 20 PSI, traseiro 28 PSI — verifique SEMPRE a frio',
    body: 'O Spyder 1330 usa pneus Kenda Kruz de origem. Pressão correta a frio: dianteiros (Kenda KR20A 165/55 R15) = 20 PSI (138 kPa) e traseiro (Kenda KR20 225/50 R15) = 28 PSI (193 kPa). Com garupa ou carga: aumente o traseiro para 32 PSI. Uma pressão errada no Spyder afeta dramaticamente o manuseio — o veículo pode "puxar" para um lado ou reagir estranho em curvas. Use sempre manômetro calibrado, não confie nos manômetros dos postos. A calibragem incorreta é a causa #1 de reclamações de manuseio estranho em fóruns de donos.',
  },
]

const SPYDER1330_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'RECALL: polia dianteira (2015–2019) — LEVE À CONCESSIONÁRIA IMEDIATAMENTE',
    body: 'Ver detalhes completos no macete acima. Este é o recall mais grave da linha Spyder: perda súbita de propulsão em alta velocidade. Números de VIN afetados disponíveis em can-am.brp.com/on-road. Revisão gratuita com substituição da polia. Não ignore — proprietários relatam perda total de tração sem aviso prévio.',
  },
  {
    severity: 'WARN',
    title: 'Erro DESS no 1330: causa mais comum é bateria fraca ou contato oxidado',
    body: 'O Spyder 1330 usa a mesma tecnologia DESS do 990. Quando o painel acusa "DESS Error" e o motor não liga: (1) Verifique tensão da bateria — deve estar acima de 12,4V em repouso. (2) Limpe os polos da bateria e os conectores do switch. (3) Tente a chave reserva (sempre tenha uma!). (4) Se nada resolver: o módulo DESS (MPEM) pode precisar de reprogramação na concessionária BRP — custo R$ 400–R$ 800.',
  },
  {
    severity: 'WARN',
    title: 'F3-S: nível de óleo difícil de visualizar — proprietários ignoram e danificam motor',
    body: 'No Spyder F3-S e F3-T, o carenamento lateral obstrui a visão do visor de nível de óleo. Proprietários relatam que verificam o nível incorretamente e acabam adicionando óleo a mais (causa de vazamentos pelo respiro) ou andando com nível baixo. Solução: use lanterna e espelho de inspeção para ver o visor corretamente. O nível deve estar entre MIN e MAX com o veículo na vertical em superfície plana. Algumas concessionárias BRP têm o hábito de não verificar o nível corretamente na revisão — confira você mesmo antes de sair.',
  },
]

// ─── CAN-AM OUTLANDER 400 ────────────────────────────────────────────────────

const OUTLANDER400_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 5W-40, ~2,0L — motor Rotax 400 single-cylinder confiável e simples',
    body: 'O Outlander 400 usa o motor Rotax 400cc monocilíndrico, um dos mais confiáveis da BRP. Capacidade de óleo: ~2,0L com filtro. Use sintético 5W-40. O motor é simples de manter e peças são mais acessíveis que os modelos maiores. Troca a cada 8.000–10.000 km ou 1 ano. Dica: o Outlander 400 é ótimo para iniciantes em ATV — torque suave e manejo fácil. A transmissão automática com tração 4x4 seletiva funciona muito bem em trilhas leves.',
  },
  {
    severity: 'OK',
    title: 'Correia CVT: inspecione a cada 5.000 km — é o elo mais fraco do sistema',
    body: 'O Outlander 400 usa transmissão CVT com correia de borracha. Em uso off-road (lama, poeira, areia), a correia e os filtros da CVT se degradam muito mais rápido. Inspecione a correia a cada 5.000 km em uso intenso. Sinais de desgaste: cheiro de borracha queimada ao arrancar, perda de aceleração progressiva, solavancos na velocidade de cruzeiro. A correia BRP original custa R$ 400–R$ 700. Alternativas Gates ou Dayco não são certificadas — use apenas correia BRP para garantia de desempenho.',
  },
]

const OUTLANDER400_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Superaquecimento em uso intenso em lama — filtro da CVT entupido',
    body: 'Em uso off-road pesado (lama, poeira fina), o filtro de ar da CVT entope e causa superaquecimento da transmissão. Sintoma: perda de força + cheiro de borracha + luz de temperatura. Preventivo: limpe o filtro da CVT a cada 3.000 km em uso off-road intenso. Em terreno de pó fino (off-road no Nordeste), limpeza a cada 1.000–1.500 km. O filtro original é lavável e reutilizável — use apenas ar comprimido e deixe secar completamente antes de reinstalar.',
  },
]

// ─── CAN-AM OUTLANDER 450 ────────────────────────────────────────────────────

const OUTLANDER450_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Outlander 450: motor 450 EFI single-cylinder — primeiro da série com injeção eletrônica',
    body: 'O Outlander 450 usa o motor 450cc com EFI (injeção eletrônica de combustível), uma evolução importante em relação ao carburado. Óleo: 5W-40, ~2,2L com filtro. Troca a cada 10.000 km. A EFI melhora muito a partida a frio no Brasil — especialmente nas madrugadas frias do Sul e Sudeste. Dica: se o motor engasgar em partida a frio, verifique se o etanol (E25 da bomba) está dentro do prazo — etanol velho entope o bico injetor.',
  },
]

const OUTLANDER450_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Bico injetor pode acumular depósito com etanol brasileiro — use aditivo trimestral',
    body: 'O etanol de alta proporção da gasolina brasileira (E25–E27) pode causar acúmulo de depósitos no bico injetor ao longo do tempo, especialmente se o ATV ficar parado por semanas. Sintomas: engasgos, perda de potência, consumo irregular. Preventivo: use aditivo para injetor (STP Injetor Cleaner, Wurth K) a cada 3 meses. Se ficar parado mais de 30 dias, esvazie o tanque ou use combustível com estabilizador.',
  },
]

// ─── CAN-AM OUTLANDER 570 ────────────────────────────────────────────────────

const OUTLANDER570_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 5W-40, ~2,9L com filtro — NGK DCPR8E (ou iridium DCPR8EIX para durar mais)',
    body: 'O Outlander 570 usa motor Rotax 570cc EFI com capacidade de óleo de ~2,9L (3,1 qt) com filtro. Especificação: SAE 5W-40 sintético. Vela: NGK DCPR8E (padrão, R$ 30–R$ 50) ou NGK DCPR8EIX iridium (R$ 80–R$ 120, dura 2x mais). Troca de óleo: a cada 10.000 km ou 1 ano — em uso off-road severo, reduza para 5.000 km. O Outlander 570 tem 3 fluidos a verificar: motor (5W-40), diferencial dianteiro (80W-90 GL-5, 200ml) e diferencial traseiro (80W-90 GL-5, 300ml). Não negligencie os diferenciais — troca a cada 20.000 km.',
  },
  {
    severity: 'OK',
    title: 'Pressão do pneu off-road: 8 PSI — na estrada/pista use 15–18 PSI',
    body: 'O Outlander 570 usa pneus específicos para off-road. Em trilhas e terrenos irregulares: mantenha 8 PSI dianteiro e 8 PSI traseiro — tração máxima e conforto. Para transporte na estrada asfaltada: aumente para 15–18 PSI para reduzir desgaste e melhorar estabilidade. NUNCA use pressão de carro (30+ PSI) — os pneus de ATV são feitos para operar em baixa pressão. Uma pressão muito alta causa escorregamento lateral em curvas e desgaste no centro da banda.',
  },
  {
    severity: 'OK',
    title: 'Correia CVT: o item de manutenção mais negligenciado pelos donos de ATV',
    body: 'A correia CVT do Outlander 570 deve ser inspecionada a cada 5.000 km (uso normal) ou a cada 3.000 km (off-road severo com lama). A correia original BRP tem número de peça 715900225. Custo: R$ 500–R$ 800. Sinais de desgaste iminente: cheiro de queimado ao arrancar na subida, patinação ao acelerar forte, solavanco ao sair do neutro. Se a correia arrebentar em campo, você fica imobilizado — leve sempre uma correia sobressalente em trilhas longas.',
  },
]

const OUTLANDER570_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Superaquecimento da CVT em lama: filtro entopido é o vilão',
    body: 'Em uso em lama pesada (especialmente lama grossa de fazenda), o filtro de entrada de ar da CVT entope rapidamente. Com o filtro obstruído, a CVT superaquece e a correia pode arrebentar. Sintomas: perda progressiva de tração + cheiro forte de borracha queimada. Preventivo: limpe o duto e filtro da CVT após cada sessão em lama. O sistema CVT do Outlander 570 é hermético — não deve entrar lama na CVT em condições normais, mas sempre inspecione após imersão profunda.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento pelo respiro do diferencial — sintoma de diferencial aquecido',
    body: 'Em uso intenso em subidas e trabalho pesado, os diferenciais do Outlander 570 aquecem e o respiro (vent) libera fluido. Proprietários encontram manchas de óleo na parte traseira do ATV. Solução: certifique-se que o nível do fluido do diferencial está correto (nem cheio demais). Em uso muito intenso, aumente a frequência de troca do fluido do diferencial para cada 15.000 km. Fluido diferencial: SAE 80W-90 GL-5.',
  },
]

// ─── CAN-AM OUTLANDER 650 ────────────────────────────────────────────────────

const OUTLANDER650_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor V-Twin Rotax 650cc: 2 velas NGK DCPR8E — 3,0L de óleo com filtro',
    body: 'O Outlander 650 usa o motor Rotax 650 V-Twin EFI — mais potente e suave que os monocilíndricos. Capacidade de óleo: ~3,0L com filtro. Especificação: 5W-40 sintético. Duas velas NGK DCPR8E (uma por cilindro). O V-Twin aquece mais que o monocilíndrico em baixa rotação — use sempre sintético 5W-40, nunca semissintético em clima quente. Troca a cada 10.000 km ou 1 ano.',
  },
  {
    severity: 'OK',
    title: '4x4 seletivo: use o modo correto para cada terreno — economiza correia e diferencial',
    body: 'O Outlander 650 tem 4x4 seletivo com modos 2WD, 4WD e Visco-Lok (diferencial dianteiro com bloqueio automático). Dica fundamental: em estrada asfaltada, use SEMPRE o modo 2WD — o 4x4 na asfalto causa desgaste prematuro dos componentes frontais e resistência ao giro. Use 4WD apenas quando realmente precisar de tração extra. O modo Visco-Lok é para situações extremas de atolamento — não use como padrão em trilhas leves.',
  },
]

const OUTLANDER650_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Ruído no diferencial dianteiro após uso em lama — Visco-Lok com desgaste',
    body: 'Após uso intenso em lama, alguns proprietários relatam barulho de "clique" ou vibração no diferencial dianteiro. Causa mais comum: fluido do diferencial contaminado com água ou lama. Solução: troque o fluido do diferencial dianteiro imediatamente após qualquer imersão profunda. O Visco-Lok é sensível à contaminação do fluido — use apenas fluido BRP específico para o Visco-Lok (não use 80W-90 genérico no dianteiro, o dianteiro usa fluido especial).',
  },
]

// ─── CAN-AM OUTLANDER PRO 800 ────────────────────────────────────────────────

const OUTLANDER800_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor Rotax 800 V-Twin: potência elevada exige óleo e correia CVT impecáveis',
    body: 'O Outlander Pro 800 usa o Rotax 800 V-Twin — o mais potente da linha Outlander standard. Capacidade de óleo: ~3,5L com filtro. Especificação: 5W-40 sintético de alta qualidade (BRP XPS ou equivalente premium). Dado o alto torque do 800, a correia CVT trabalha mais — inspecione a cada 4.000–5.000 km. O 800 é um ATV para usos sérios (fazenda, caça, trilha pesada) — a manutenção negligenciada resulta em reparos muito caros.',
  },
  {
    severity: 'WARN',
    title: 'Direção elétrica (EPS): sensor de torque sensível a impactos — cuidado com trilhas rochosas',
    body: 'O Outlander Pro 800 com EPS (direção elétrica) tem um sensor de torque na coluna de direção que pode ser danificado por impactos laterais fortes. Se a direção ficar pesada subitamente ou der sensação de "puxar" para um lado sem motivo físico, verifique o sensor EPS antes de ir à concessionária. Código de erro EPS aparece no painel. O reparo pode ser caro (R$ 1.500–R$ 3.000 com peça) — um sensor de torque por R$ 800–R$ 1.200.',
  },
]

const OUTLANDER800_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Solavancos ao acelerar em baixas rotações — correia CVT no limite',
    body: 'O alto torque do Rotax 800 exige uma correia CVT em perfeito estado. Quando a correia está desgastada, surgem solavancos ao acelerar de velocidades baixas — especialmente em subidas com carga. Proprietários confundem isso com problema de motor ou câmbio, mas quase sempre é correia. Troque preventivamente a correia a cada 20.000 km ou quando o solavanco aparecer. Custo da correia original: R$ 700–R$ 1.000.',
  },
]

// ─── CAN-AM OUTLANDER PRO 1000 ───────────────────────────────────────────────

const OUTLANDER1000_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Outlander 1000: o maior motor ATV da linha — revisão mais exigente',
    body: 'O Outlander Pro 1000 usa o Rotax 1000 V-Twin de alto desempenho. Capacidade de óleo: ~3,8L com filtro. Especificação obrigatória: 5W-40 full synthetic de alta performance (não use semissintético). Velas: 2x NGK DCPR8E. Troca de óleo: 8.000–10.000 km ou 1 ano. O motor 1000 é mais exigente termicamente — mantenha o sistema de arrefecimento sempre revisado (líquido a cada 2 anos, estado das mangueiras, limpeza do radiador).',
  },
  {
    severity: 'WARN',
    title: 'Correia CVT: troca obrigatória preventiva a cada 15.000–20.000 km no 1000',
    body: 'No Outlander 1000, pela alta potência do motor, a correia CVT sofre estresse maior. Recomenda-se troca preventiva a cada 15.000–20.000 km mesmo sem sinais de desgaste visíveis. Uma correia arrebentando em alta potência pode causar danos secundários nas polias e no cárter da CVT — reparo muito mais caro que uma troca preventiva. Sempre tenha uma correia reserva em viagens longas de fazenda ou trilha.',
  },
]

const OUTLANDER1000_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Aquecimento excessivo em uso lento com carga pesada (trabalho de fazenda)',
    body: 'O Outlander 1000 em uso de trabalho lento (empurrando reboque pesado, subindo ladeiras a 5 km/h com carga) pode superaquecer. O radiador é projetado para uso dinâmico com fluxo de ar — em uso estático lento, o ventilador elétrico precisa funcionar corretamente. Verifique: (1) ventilador acionando quando a temperatura sobe; (2) nível do líquido de arrefecimento; (3) grade do radiador limpa de lama/folhas. Se a temperatura subir acima de 3/4 do indicador, pare e deixe o motor em marcha lenta por 2 minutos antes de desligar.',
  },
]

// ─── CAN-AM DS 250 ───────────────────────────────────────────────────────────

const DS250_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'DS 250: ATV esportivo para jovens e adultos menores — motor 229cc monocilíndrico',
    body: 'O Can-Am DS 250 é um ATV esportivo compacto (não off-road pesado). Motor: 229cc SOHC, refrigerado a ar. Óleo: 5W-40 ou 10W-40, ~1,5L com filtro. Vela: NGK DCPR9E. Troca de óleo: a cada 5.000 km ou 1 ano. É um ATV de trilha leve e uso recreativo — não é indicado para trabalho pesado como os Outlanders. Muito popular para iniciantes e jovens adultos. Transmissão CVT automática com marcha à ré.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento: motor refrigerado a ar demanda paradas regulares em uso intenso',
    body: 'O DS 250 tem motor refrigerado A AR (sem líquido de arrefecimento). Em uso intenso no verão brasileiro ou em terrenos com pouco vento, o motor pode superaquecer. Nunca force o motor por mais de 20–30 minutos seguidos em condições de calor intenso sem dar uma pausa de 10 minutos. Sinal de alerta: cheiro de óleo queimando ou motor perdendo força. O óleo se degrada mais rápido com superaquecimento — troca a cada 4.000 km em uso intenso no verão.',
  },
]

const DS250_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Correia CVT patina com piloto pesado ou subidas acentuadas',
    body: 'O DS 250 foi projetado para pilotos mais leves (até ~80 kg). Com pilotos pesados ou em subidas acentuadas com carga, a correia CVT pode patinar e desgastar mais rápido. Sintoma: cheiro de borracha ao subir ladeiras e aceleração hesitante. Para uso com piloto acima de 90 kg em terrenos inclinados, considera o DS 450 ou o Outlander 570.',
  },
]

// ─── CAN-AM DS 90 ────────────────────────────────────────────────────────────

const DS90_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'DS 90: ATV juvenil — motor 90cc, óleo 10W-40, ~0,8L, troca a cada 3.000 km',
    body: 'O Can-Am DS 90 é um ATV para jovens pilotos (8–14 anos recomendado). Motor: 90cc SOHC, refrigerado a ar. Óleo: 10W-40 (API SH), ~0,8L. Troca: a cada 3.000 km ou 6 meses. Vela: NGK C7HSA ou equivalente. É simples de manter — o maior trabalho é a correia CVT (inspecione a cada 3.000 km) e a regulagem dos freios. Ajuste os limitadores de velocidade (acelerador e freio) conforme a habilidade do jovem piloto.',
  },
]

const DS90_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Motor acorda difícil no frio — carburetor precisa de choke ou aquecimento prévio',
    body: 'O DS 90 tem carburador (não EFI) — em dias frios (abaixo de 15°C), use o choke totalmente fechado para partir. Após 1–2 minutos em marcha lenta com choke, abra gradualmente. Se o motor afogar com choke fechado, é sinal de carburador sujo. A cada 2 anos, limpe o carburador com spray limpa-carburador e recoloque os jets com o tamanho correto.',
  },
]

// ─── CAN-AM COMMANDER ────────────────────────────────────────────────────────

const COMMANDER_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Commander 800/1000: UTV side-by-side — óleo 5W-40, 3,0–3,5L conforme motor',
    body: 'O Can-Am Commander é um UTV (Side-by-Side) com 2 assentos para uso off-road. Motores disponíveis: 800cc (3,0L óleo) e 1000cc (3,5L óleo). Especificação: 5W-40 sintético. Velas: 2x NGK LMAR8C-9 (motor 1000). Troca de óleo: a cada 10.000 km ou 1 ano. Atenção: o Commander tem transmissão com freio estacionário separado do freio de serviço — mantenha o cabo do freio estacionário ajustado (folga máxima de 2–3 mm no atuador).',
  },
  {
    severity: 'OK',
    title: 'Correia CVT e diferencial traseiro: os 2 itens mais caros se negligenciados',
    body: 'O Commander tem correia CVT propensa a desgaste em uso intenso com 2 pessoas + carga (caçamba traseira). Inspecione a correia a cada 5.000 km. Adicionalmente: o diferencial traseiro usa fluido especial BRP (80W-90 para o Commander) — troca a cada 20.000 km ou se aparecer barulho no eixo traseiro. Em uso de fazenda com carregamento frequente da caçamba, o diferencial traseiro trabalha muito — troca mais frequente a cada 12.000–15.000 km.',
  },
]

const COMMANDER_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vibração no volante em alta velocidade: alinhamento e balanceamento das rodas',
    body: 'O Commander em uso off-road intenso (pedras, buracos, raízes) sai do alinhamento e balanceamento facilmente. Sintomas: vibração no volante acima de 50 km/h, desgaste irregular dos pneus, instabilidade em estrada de chão. Faça alinhamento e balanceamento em oficina especializada em UTVs a cada 15.000 km ou após batidas fortes. Verifique também as buchas dos braços de suspensão — desgastam em uso intenso.',
  },
]

// ─── CAN-AM DEFENDER 650 ─────────────────────────────────────────────────────

const DEFENDER650_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Defender 650: UTV de trabalho — Rotax 650 single-cylinder, 5W-40, ~2,5L',
    body: 'O Can-Am Defender 650 é o menor da linha Defender, projetado para trabalho pesado em fazendas e propriedades rurais. Motor: Rotax 650cc monocilíndrico. Óleo: 5W-40, ~2,5L com filtro. Vela: NGK 715900637 (OEM BRP). Troca: a cada 10.000 km ou 1 ano (em uso de trabalho pesado diário, troque a cada 8.000 km). O Defender 650 é indicado para uso leve a moderado — para trabalho pesado diário (carga máxima, reboque constante), o Defender 800 ou 976 é mais adequado.',
  },
]

const DEFENDER650_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Correia CVT mais vulnerável ao calor em trabalho lento e pesado',
    body: 'O Defender 650 em uso de trabalho lento com carga (carregando material, puxando reboque devagar) gera muito calor na CVT. O sistema CVT é projetado para uso dinâmico — em uso estático lento, ventilação é menor. Sintoma: cheiro de borracha queimada em trabalho lento. Solução: faça pausas frequentes e deixe o motor em marcha lenta (sem tração) para ventilar a CVT. Inspecione a correia com mais frequência (cada 3.000 km) em uso de trabalho intenso.',
  },
]

// ─── CAN-AM DEFENDER 800 ─────────────────────────────────────────────────────

const DEFENDER800_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Defender 800: UTV trabalho pesado — HD8 V-Twin, 5W-40, ~3,0L',
    body: 'O Defender 800 usa o motor Rotax 800cc HD8 V-Twin — mais potente e adequado para trabalho pesado real. Óleo: 5W-40 sintético, ~3,0L com filtro. Velas: 2x NGK 715900637. Capacidade de reboque: 680 kg (com reboque freado). Troca de óleo: a cada 10.000 km ou 1 ano. O 800 é significativamente mais capaz que o 650 para uso intenso diário — o motor V-Twin distribui melhor o calor em baixas rotações de trabalho.',
  },
  {
    severity: 'OK',
    title: 'Portinhola da caçamba: lubrifique as dobradiças a cada 6 meses',
    body: 'As dobradiças e travas da caçamba traseira do Defender 800 enferrujam com facilidade em ambientes rurais úmidos. Aplique graxa de zinco ou spray de zinco nas dobradiças a cada 6 meses. Se a portinhola ficar dura de operar, a trava pode quebrar ao forçar — reparo caro. As correntes de segurança também devem ser lubrificadas. Simples preventivo que evita problemas chatos no dia a dia.',
  },
]

const DEFENDER800_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Eixo cardan traseiro: inspeção do protetor (bota) de couro a cada revisão',
    body: 'O Defender 800 usa eixo cardan traseiro com juntas homocinéticas protegidas por botas de borracha. Em uso off-road, as botas rasgam ao contato com pedras e galhos — quando rasga, a graxa sai e a junta seca, causando vibração crescente e quebra da junta. Inspecione as botas do cardan traseiro em toda revisão. Uma bota rasgada custa R$ 80–R$ 150 para trocar, a junta quebrada pode custar R$ 800–R$ 1.500.',
  },
]

// ─── CAN-AM DEFENDER 976 ─────────────────────────────────────────────────────

const DEFENDER976_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Defender 976 (HD10): o top da linha Defender — 0W-40 full synthetic obrigatório',
    body: 'O Defender 976 (HD10) usa o Rotax 976cc V-Twin — motor mais avançado e potente da linha Defender. Óleo: **0W-40 full synthetic** (diferente dos modelos menores!). O manual especifica 0W-40 para este motor. Não use 5W-40 — o motor foi calibrado para a viscosidade 0W-40. Capacidade: ~3,5L com filtro. Troca: a cada 10.000 km ou 1 ano. A capacidade de carga é maior (700 kg de reboque) e o torque é significativamente superior.',
  },
  {
    severity: 'WARN',
    title: 'EPS obrigatório em trabalho pesado: não desative o sistema de direção assistida',
    body: 'O Defender 976 com EPS (opção) tem sensores eletrônicos que protegem o sistema de direção de sobrecarga. Alguns proprietários desativam o EPS achando que "fica mais fácil de dirigir" — isso é perigoso, o EPS nos UTVs também funciona como sistema de segurança. Se o EPS acender a luz de falha, diagnostique antes de continuar o uso pesado. Código de falha EPS mais comum: sensor de torque sujo de lama — limpe com contato limpo.',
  },
]

const DEFENDER976_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Motor 976cc aquece mais: radiador precisa de limpeza mais frequente',
    body: 'O motor maior do Defender 976 gera mais calor. O radiador é maior, mas em ambientes rurais com pó e palha (cana-de-açúcar, soja, milho), o radiador entope mais rápido. Em épocas de colheita, limpe o radiador a cada 200 horas de uso. Use ar comprimido pelo lado de dentro para fora. Uma limpeza simples de 15 minutos pode evitar uma superaquecimento que dana a junta do cabeçote — reparo de R$ 2.000+.',
  },
]

// ─── CAN-AM MAVERICK TRAIL ───────────────────────────────────────────────────

const MAVERICKTRAIL_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Maverick Trail: UTV off-road esportivo estreito — 0W-40 full synthetic, ACE 900',
    body: 'O Maverick Trail usa o motor ACE 900 3-cilindros, projetado para trilhas estreitas (largura 137 cm). Óleo: **0W-40 full synthetic** — obrigatório (não use 5W-40). Capacidade: ~3,0L com filtro. Velas: NGK LMAR8C-9 (3 velas, código BRP 715900244). Troca: a cada 10.000 km ou 1 ano. O ACE 900 é um motor muito confiável, mas exigente quanto ao tipo de óleo — use apenas 0W-40 full synthetic.',
  },
  {
    severity: 'OK',
    title: 'Correia CVT: point fraco em trilhas com lama — filtro limpo é vital',
    body: 'O Maverick Trail em trilhas de lama pesada depende muito da saúde do filtro da CVT. Com o filtro entopido, a CVT superaquece e a correia arrebenta. Após cada sessão de lama intensa: abra o compartimento da CVT, limpe o filtro de entrada de ar e seque com ar comprimido. O filtro original é reutilizável. Em trilhas longas, leve uma correia CVT sobressalente — arrebenta sem aviso prévio quando degradada.',
  },
]

const MAVERICKTRAIL_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Ruído de "clunk" ao sair do neutro — normal no sistema CVT BRP',
    body: 'Todos os Maverick Trail produzem um "clunk" metálico ao sair do neutro para frente ou ré — especialmente com motor frio. Isso é NORMAL na CVT BRP: é o belt engaging nas polias. O ruído diminui conforme o motor aquece. Se o ruído persistir com motor quente ou for acompanhado de vibração, pode ser mola da polia primária desgastada — verifique.',
  },
  {
    severity: 'WARN',
    title: 'Modo limp home ativado inesperadamente: sensor ou cabo solto',
    body: 'O Maverick Trail tem modo de proteção "limp home" que limita a potência quando sensores detectam falha. Causas comuns de ativação falsa: (1) sensor de temperatura do motor sujo de lama; (2) conector do sensor de rotação do eixo solto por vibração em trilhas; (3) bateria com tensão baixa. Reset: desligue o motor, aguarde 30 segundos e religue. Se persistir: conecte o leitor de diagnóstico BRP para ler o código exato.',
  },
]

// ─── CAN-AM MAVERICK SPORT ───────────────────────────────────────────────────

const MAVERICKSPORT_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Maverick Sport 1000: maior e mais potente — 0W-40, 3,5L, velas NGK LMAR8C-9',
    body: 'O Maverick Sport usa o motor ACE 1000 ou 1000R turbo. Versão atmosférica: 0W-40, ~3,5L. Versão turbo 1000R: 0W-40, ~3,5L, mas com troca mais frequente a cada 8.000 km (turbo exige). Velas atmosférico: 2x NGK LMAR8C-9. O Sport é mais largo que o Trail (154 cm) — mais estável em alta velocidade mas não passa em trilhas estreitas. A suspensão é mais esportiva — amortecedores Fox Podium ou equivalente.',
  },
  {
    severity: 'WARN',
    title: 'Versão 1000R Turbo: manutenção mais exigente e óleo de maior qualidade',
    body: 'A versão Maverick Sport 1000R com turbo exige ainda mais atenção: (1) troque o óleo a cada 8.000 km — o turbo aquece muito o óleo; (2) use apenas 0W-40 full synthetic premium (Motul 300V ou equivalente); (3) após cada sessão intensa, deixe o motor em marcha lenta por 3 minutos antes de desligar — o turbo precisa resfriar com óleo circulando; (4) nunca desligue com motor quente imediatamente após uma corrida ou trilha em alta velocidade.',
  },
]

const MAVERICKSPORT_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Desgaste acelerado de braços de suspensão em uso off-road agressivo',
    body: 'O Maverick Sport com suspensão longa e uso agressivo (jumps, rocks) desgasta buchas e terminais de suspensão mais rápido que UTVs de trabalho. Inspecione os terminais de direção (rotule), buchas de barra estabilizadora e pivôs de suspensão a cada 15.000 km ou após batidas fortes. Custo de 1 terminal de direção: R$ 150–R$ 300. Se sentir folga ou vibração na direção, inspecione imediatamente — folga na suspensão piora exponencialmente em trilhas.',
  },
]

// ─── CAN-AM MAVERICK X3 ──────────────────────────────────────────────────────

const MAVERICKX3_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Maverick X3 Turbo: o mais potente da linha — 0W-40, 3,5L, troca a cada 8.000 km',
    body: 'O Can-Am Maverick X3 é o topo de linha dos UTVs BRP — motor turbo de 900cc ACE com até 195 cv (versão X3 RR). Óleo obrigatório: 0W-40 full synthetic premium. Capacidade: ~3,5L com filtro. Troca: a cada 8.000 km em uso intenso (ou 10.000 km em uso moderado). Com a alta potência do turbo, o óleo degrada mais rápido — não estire o intervalo. Velas: 3x NGK (motor ACE 900 3-cilindros, código BRP 715900244). O X3 é uma máquina cara de manter, mas extremamente capaz.',
  },
  {
    severity: 'WARN',
    title: 'Turbo intercooler: mantenha limpo e verifique duetos após trilhas com lama',
    body: 'O X3 Turbo tem intercooler para resfriar o ar comprimido antes da admissão. Em trilhas com lama, a lama pode bloquear parcialmente o intercooler, reduzindo eficiência. Sintoma: perda de potência + motor falhando em alta carga (boost pressure). Após trilhas em lama: limpe o intercooler com água (não pressão) e ar comprimido. Inspecione os duetos do turbo para vazamentos — qualquer vazamento causa perda de pressão de boost e potência.',
  },
  {
    severity: 'OK',
    title: 'Amortecedores FOX Premium: ajuste de rebound para o peso do piloto + piloto',
    body: 'O X3 tem amortecedores Fox 2.5 Premium na maioria das versões. O ajuste do rebound (retorno) deve ser calibrado para o peso do piloto + copiloto. Para 2 pilotos pesados: abra o rebound (botão na parte inferior do amortecedor) em 1–2 clicks. Para piloto solo leve: feche 1–2 clicks. Um rebound muito rápido causa bounce, muito lento causa subviragem. Consulte o guia Fox para a curva correta do X3.',
  },
]

const MAVERICKX3_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Correia CVT do X3: desgaste acelerado em alta potência — troca preventiva a cada 15.000 km',
    body: 'A correia CVT do Maverick X3 (com toda a potência do turbo) tem vida útil menor que nos demais modelos. Troca preventiva: a cada 15.000–20.000 km. Em uso de "baja" (alta velocidade em areia e dunas), a correia pode não chegar a 10.000 km. Sinal de desgaste: perda de força no arranque, solavanco ao acelerar. Correia original X3: R$ 1.000–R$ 1.500. Sempre leve uma sobressalente em viagens de duna.',
  },
  {
    severity: 'WARN',
    title: 'Aquecimento em uso lento em lama pesada: proteção do motor turbo',
    body: 'Com o turbo trabalhando em baixas rotações e alta carga (lama pesada), o motor do X3 pode superaquecer. A lógica de proteção reduz a potência (limp mode). Solução imediata: recue, coloque em ponto morto e deixe em marcha lenta por 3 minutos. Preventivo: nunca force o X3 em marcha lenta por longa distância com lama pesada — use momentos de alta rotação para ventilar o turbo.',
  },
]

// ─── ARRAYS CONSOLIDADOS ──────────────────────────────────────────────────────

const brpModels: ModelBlock[] = [
  {
    modelName: 'Can-Am Spyder 990',
    yearFrom: 2007,
    yearTo: 2013,
    MACETES: SPYDER990_MACETES,
    PROBLEMAS: SPYDER990_PROBLEMAS,
    MANUTENCAO: [],
  },
  {
    modelName: 'Can-Am Spyder 1000',
    yearFrom: 2013,
    yearTo: 2014,
    MACETES: SPYDER1000_MACETES,
    PROBLEMAS: SPYDER1000_PROBLEMAS,
    MANUTENCAO: [],
  },
  {
    modelName: 'Can-Am Spyder 1330',
    yearFrom: 2014,
    yearTo: null,
    MACETES: SPYDER1330_MACETES,
    PROBLEMAS: SPYDER1330_PROBLEMAS,
    MANUTENCAO: [],
  },
  {
    modelName: 'Can-Am Outlander 400',
    yearFrom: 2003,
    yearTo: null,
    MACETES: OUTLANDER400_MACETES,
    PROBLEMAS: OUTLANDER400_PROBLEMAS,
    MANUTENCAO: [],
  },
  {
    modelName: 'Can-Am Outlander 450',
    yearFrom: 2014,
    yearTo: null,
    MACETES: OUTLANDER450_MACETES,
    PROBLEMAS: OUTLANDER450_PROBLEMAS,
    MANUTENCAO: [],
  },
  {
    modelName: 'Can-Am Outlander 570',
    yearFrom: 2014,
    yearTo: null,
    MACETES: OUTLANDER570_MACETES,
    PROBLEMAS: OUTLANDER570_PROBLEMAS,
    MANUTENCAO: [],
  },
  {
    modelName: 'Can-Am Outlander 650',
    yearFrom: 2003,
    yearTo: null,
    MACETES: OUTLANDER650_MACETES,
    PROBLEMAS: OUTLANDER650_PROBLEMAS,
    MANUTENCAO: [],
  },
  {
    modelName: 'Can-Am Outlander Pro 800',
    yearFrom: 2012,
    yearTo: null,
    MACETES: OUTLANDER800_MACETES,
    PROBLEMAS: OUTLANDER800_PROBLEMAS,
    MANUTENCAO: [],
  },
  {
    modelName: 'Can-Am Outlander Pro 1000',
    yearFrom: 2012,
    yearTo: null,
    MACETES: OUTLANDER1000_MACETES,
    PROBLEMAS: OUTLANDER1000_PROBLEMAS,
    MANUTENCAO: [],
  },
  {
    modelName: 'Can-Am DS 250',
    yearFrom: 2006,
    yearTo: null,
    MACETES: DS250_MACETES,
    PROBLEMAS: DS250_PROBLEMAS,
    MANUTENCAO: [],
  },
  {
    modelName: 'Can-Am DS 90',
    yearFrom: 2002,
    yearTo: null,
    MACETES: DS90_MACETES,
    PROBLEMAS: DS90_PROBLEMAS,
    MANUTENCAO: [],
  },
  {
    modelName: 'Can-Am Commander',
    yearFrom: 2011,
    yearTo: null,
    MACETES: COMMANDER_MACETES,
    PROBLEMAS: COMMANDER_PROBLEMAS,
    MANUTENCAO: [],
  },
  {
    modelName: 'Can-Am Defender 650',
    yearFrom: 2016,
    yearTo: null,
    MACETES: DEFENDER650_MACETES,
    PROBLEMAS: DEFENDER650_PROBLEMAS,
    MANUTENCAO: [],
  },
  {
    modelName: 'Can-Am Defender 800',
    yearFrom: 2015,
    yearTo: null,
    MACETES: DEFENDER800_MACETES,
    PROBLEMAS: DEFENDER800_PROBLEMAS,
    MANUTENCAO: [],
  },
  {
    modelName: 'Can-Am Defender 976',
    yearFrom: 2017,
    yearTo: null,
    MACETES: DEFENDER976_MACETES,
    PROBLEMAS: DEFENDER976_PROBLEMAS,
    MANUTENCAO: [],
  },
  {
    modelName: 'Can-Am Maverick Trail',
    yearFrom: 2018,
    yearTo: null,
    MACETES: MAVERICKTRAIL_MACETES,
    PROBLEMAS: MAVERICKTRAIL_PROBLEMAS,
    MANUTENCAO: [],
  },
  {
    modelName: 'Can-Am Maverick Sport',
    yearFrom: 2018,
    yearTo: null,
    MACETES: MAVERICKSPORT_MACETES,
    PROBLEMAS: MAVERICKSPORT_PROBLEMAS,
    MANUTENCAO: [],
  },
  {
    modelName: 'Can-Am Maverick X3',
    yearFrom: 2017,
    yearTo: null,
    MACETES: MAVERICKX3_MACETES,
    PROBLEMAS: MAVERICKX3_PROBLEMAS,
    MANUTENCAO: [],
  },
]

// ─── CALIBRAGEM DE PNEUS ─────────────────────────────────────────────────────

const brpTirePressures: TirePressureInput[] = [
  {
    modelName: 'Can-Am Spyder 990',
    yearFrom: 2007, yearTo: 2013,
    tireSize: 'F: 165/55 R15 | T: 225/50 R15',
    frontPsi: 20, rearPsi: 28,
    frontPsiLoad: 22, rearPsiLoad: 32,
    notes: 'Dianteiros: 20 PSI (2 rodas), traseiro: 28 PSI. Com garupa ou carga: dianteiros 22 / traseiro 32 PSI. Verifique sempre a frio. Pneus Kenda de origem.',
  },
  {
    modelName: 'Can-Am Spyder 1000',
    yearFrom: 2013, yearTo: 2014,
    tireSize: 'F: 165/55 R15 | T: 225/50 R15',
    frontPsi: 20, rearPsi: 28,
    frontPsiLoad: 22, rearPsiLoad: 32,
    notes: 'Mesma especificação do Spyder 990. Dianteiros: 20 PSI cada, traseiro: 28 PSI a frio.',
  },
  {
    modelName: 'Can-Am Spyder 1330',
    yearFrom: 2014, yearTo: null,
    tireSize: 'F: 165/55 R15 | T: 225/50 R15',
    frontPsi: 20, rearPsi: 28,
    frontPsiLoad: 22, rearPsiLoad: 32,
    notes: 'Pressão fria. Dianteiros: 20 PSI (Kenda KR20A 165/55 R15). Traseiro: 28 PSI (Kenda KR20 225/50 R15). Com carga/garupa: +2 PSI no traseiro. NUNCA ultrapasse 36 PSI em nenhum pneu.',
  },
  {
    modelName: 'Can-Am Outlander 400',
    yearFrom: 2003, yearTo: null,
    tireSize: 'F: 25x8-12 | T: 25x10-12',
    frontPsi: 8, rearPsi: 8,
    frontPsiLoad: 14, rearPsiLoad: 14,
    notes: 'Off-road: 8 PSI F/T. Estrada asfaltada: aumente para 12–15 PSI. Com carga pesada: 14 PSI. Nunca use pressão de carro — pneus de ATV são projetados para baixa pressão.',
  },
  {
    modelName: 'Can-Am Outlander 450',
    yearFrom: 2014, yearTo: null,
    tireSize: 'F: 25x8-12 | T: 25x10-12',
    frontPsi: 8, rearPsi: 8,
    frontPsiLoad: 14, rearPsiLoad: 14,
    notes: 'Off-road trilha: 8 PSI. Terreno misto/estrada: 12–14 PSI. Pneus Maxxis Zilla de origem na maioria dos anos.',
  },
  {
    modelName: 'Can-Am Outlander 570',
    yearFrom: 2014, yearTo: null,
    tireSize: 'F: 25x8-12 | T: 25x10-12',
    frontPsi: 8, rearPsi: 8,
    frontPsiLoad: 14, rearPsiLoad: 15,
    notes: 'Off-road padrão: 8 PSI F/T (tração máxima). Estrada: 12–15 PSI. Com carga em caçamba: 14/15 PSI. Consulte a etiqueta na abertura da porta (modelos com cabine).',
  },
  {
    modelName: 'Can-Am Outlander 650',
    yearFrom: 2003, yearTo: null,
    tireSize: 'F: 26x8-12 | T: 26x10-12',
    frontPsi: 8, rearPsi: 10,
    frontPsiLoad: 14, rearPsiLoad: 16,
    notes: 'Off-road: F 8 PSI / T 10 PSI. Com piloto pesado ou carga: F 14 / T 16 PSI. O traseiro ligeiramente mais alto melhora a estabilidade com carga.',
  },
  {
    modelName: 'Can-Am Outlander Pro 800',
    yearFrom: 2012, yearTo: null,
    tireSize: 'F: 26x8-12 | T: 26x11-12',
    frontPsi: 8, rearPsi: 10,
    frontPsiLoad: 15, rearPsiLoad: 16,
    notes: 'Off-road: 8/10 PSI. Estrada/trabalho: 14/15 PSI. Pneu traseiro mais largo — ajuste preciso de pressão melhora o steering.',
  },
  {
    modelName: 'Can-Am Outlander Pro 1000',
    yearFrom: 2012, yearTo: null,
    tireSize: 'F: 27x8-12 | T: 27x11-12',
    frontPsi: 8, rearPsi: 10,
    frontPsiLoad: 15, rearPsiLoad: 18,
    notes: 'Off-road: 8/10 PSI. Com carga máxima: 15/18 PSI. O 1000 tem maior capacidade de carga — ajuste a pressão para o uso real.',
  },
  {
    modelName: 'Can-Am DS 250',
    yearFrom: 2006, yearTo: null,
    tireSize: 'F: 21x7-10 | T: 20x10-9',
    frontPsi: 6, rearPsi: 6,
    frontPsiLoad: 10, rearPsiLoad: 10,
    notes: 'ATV esportivo: 6 PSI F/T para uso padrão. Máximo: 10 PSI. É um ATV menor — verifique etiqueta no quadro para especificação do ano exato.',
  },
  {
    modelName: 'Can-Am DS 90',
    yearFrom: 2002, yearTo: null,
    tireSize: 'F: 19x7-8 | T: 18x9.5-8',
    frontPsi: 5, rearPsi: 5,
    frontPsiLoad: 8, rearPsiLoad: 8,
    notes: 'ATV juvenil: 5 PSI F/T (baixo, para uso suave). Máximo recomendado: 8 PSI. Pneus pequenos de 8 polegadas.',
  },
  {
    modelName: 'Can-Am Commander',
    yearFrom: 2011, yearTo: null,
    tireSize: 'F: 27x9-14 | T: 27x11-14',
    frontPsi: 14, rearPsi: 15,
    frontPsiLoad: 18, rearPsiLoad: 20,
    notes: 'UTV padrão: 14/15 PSI. Com carga na caçamba: 18/20 PSI. Calibre sempre a frio antes de carregar. Pneus Maxxis de origem.',
  },
  {
    modelName: 'Can-Am Defender 650',
    yearFrom: 2016, yearTo: null,
    tireSize: 'F: 27x9-12 | T: 27x11-12',
    frontPsi: 14, rearPsi: 15,
    frontPsiLoad: 18, rearPsiLoad: 20,
    notes: 'UTV trabalho: 14/15 PSI vazio. Com carga: 18/20 PSI. Em terreno muito macio (barro/areia): pode reduzir para 10/10 PSI para aumentar flutuação.',
  },
  {
    modelName: 'Can-Am Defender 800',
    yearFrom: 2015, yearTo: null,
    tireSize: 'F: 27x9-12 | T: 27x11-12',
    frontPsi: 14, rearPsi: 15,
    frontPsiLoad: 18, rearPsiLoad: 22,
    notes: 'Trabalho leve: 14/15 PSI. Reboque pesado ou caçamba cheia: 18/22 PSI. O traseiro aguenta mais carga — calibre adequado ao uso do dia.',
  },
  {
    modelName: 'Can-Am Defender 976',
    yearFrom: 2017, yearTo: null,
    tireSize: 'F: 28x10-14 | T: 28x12-14',
    frontPsi: 15, rearPsi: 16,
    frontPsiLoad: 20, rearPsiLoad: 24,
    notes: 'Pneus maiores que os modelos menores. Vazio: 15/16 PSI. Capacidade máxima: 20/24 PSI. Consulte a etiqueta da porta do motorista para especificação exata do ano.',
  },
  {
    modelName: 'Can-Am Maverick Trail',
    yearFrom: 2018, yearTo: null,
    tireSize: 'F: 27x9-12 | T: 27x11-12',
    frontPsi: 10, rearPsi: 10,
    frontPsiLoad: 14, rearPsiLoad: 14,
    notes: 'Trilha padrão: 10 PSI F/T. Em rochas: pode baixar para 8 PSI. Estrada/transporte: 14 PSI. O Maverick Trail é estreito (137 cm) — pressão certa é crucial para estabilidade.',
  },
  {
    modelName: 'Can-Am Maverick Sport',
    yearFrom: 2018, yearTo: null,
    tireSize: 'F: 30x9-14 | T: 30x11-14',
    frontPsi: 12, rearPsi: 12,
    frontPsiLoad: 16, rearPsiLoad: 18,
    notes: 'Trilha: 12/12 PSI. Sand dune: pode baixar para 8 PSI. Estrada: 16/18 PSI. Pneus maiores que o Trail — verifique etiqueta do chassi para especificação do seu ano.',
  },
  {
    modelName: 'Can-Am Maverick X3',
    yearFrom: 2017, yearTo: null,
    tireSize: 'F: 30x9-14 | T: 30x11-14',
    frontPsi: 12, rearPsi: 14,
    frontPsiLoad: 16, rearPsiLoad: 18,
    notes: 'Alta performance: F 12 PSI / T 14 PSI padrão. Dunas de areia: 8/10 PSI. Estrada/transporte: 16/18 PSI. Com o X3 turbo, o traseiro trabalha mais — calibre especialmente antes de cada sessão intensa.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const brpMaintenanceItems: MaintenanceItemInput[] = [
  // ── Spyder 990 ─────────────────────────────────────────────────────────────
  { modelName: 'Can-Am Spyder 990', yearFrom: 2007, yearTo: 2013, order: 0,
    component: 'Óleo do motor (5W-40 sintético)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: '4,0L com filtro. BRP XPS 4-Stroke 5W-40, Motul 7100 ou equivalente. 2 drenos: motor + CVT.' },
  { modelName: 'Can-Am Spyder 990', yearFrom: 2007, yearTo: 2013, order: 1,
    component: 'Óleo da transmissão CVT (75W-90 GL-5)', intervalKm: 10000, intervalMonths: 12, priority: 'HIGH',
    notes: '~850 ml de SAE 75W-90 GL-5. Troque junto com o motor.' },
  { modelName: 'Can-Am Spyder 990', yearFrom: 2007, yearTo: 2013, order: 2,
    component: 'Velas de ignição (2x NGK DCPR9E)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: '2 velas, 1 por cilindro. Gap: 0,9 mm. Iridium DCPR9EIX dura 40.000 km.' },
  { modelName: 'Can-Am Spyder 990', yearFrom: 2007, yearTo: 2013, order: 3,
    component: 'Filtro de ar', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Troca a cada 20.000 km. K&N E-3540 como alternativa reutilizável.' },
  { modelName: 'Can-Am Spyder 990', yearFrom: 2007, yearTo: 2013, order: 4,
    component: 'Correia de transmissão CVT', intervalKm: 40000, intervalMonths: null, priority: 'HIGH',
    notes: 'Inspecione a cada troca de óleo. Substituição preventiva a cada 30.000–50.000 km. Use apenas correia BRP original.' },
  { modelName: 'Can-Am Spyder 990', yearFrom: 2007, yearTo: 2013, order: 5,
    component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'Troca a cada 2 anos. Use apenas líquido BRP XPS ou equivalente com inibidores de corrosão para alumínio.' },
  { modelName: 'Can-Am Spyder 990', yearFrom: 2007, yearTo: 2013, order: 6,
    component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'HIGH',
    notes: 'A cada 2 anos. 3 circuitos de freio independentes — verifique todos os reservatórios.' },
  { modelName: 'Can-Am Spyder 990', yearFrom: 2007, yearTo: 2013, order: 7,
    component: 'Bateria (12V 18Ah)', intervalKm: null, intervalMonths: 36, priority: 'MEDIUM',
    notes: 'Troca preventiva a cada 3 anos. Bateria fraca causa falhas no sistema DESS. YTX20L-BS ou equivalente.' },

  // ── Spyder 1330 ────────────────────────────────────────────────────────────
  { modelName: 'Can-Am Spyder 1330', yearFrom: 2014, yearTo: null, order: 0,
    component: 'Óleo do motor (5W-40 sintético)', intervalKm: 15000, intervalMonths: 12, priority: 'CRITICAL',
    notes: '5,2L com filtro (5,5 qt). BRP XPS Full Synthetic 5W-40. Rotax 1330 ACE 3-cilindros.' },
  { modelName: 'Can-Am Spyder 1330', yearFrom: 2014, yearTo: null, order: 1,
    component: 'Óleo da transmissão CVT (75W-90 GL-5)', intervalKm: 15000, intervalMonths: 12, priority: 'HIGH',
    notes: '~850 ml. Troque junto com o motor na revisão.' },
  { modelName: 'Can-Am Spyder 1330', yearFrom: 2014, yearTo: null, order: 2,
    component: 'Velas de ignição (3 velas — motor 3 cilindros)', intervalKm: 28000, intervalMonths: null, priority: 'HIGH',
    notes: '3 velas (1 por cilindro). Consulte manual para código exato do seu ano. Troca requer remoção parcial do carenamento.' },
  { modelName: 'Can-Am Spyder 1330', yearFrom: 2014, yearTo: null, order: 3,
    component: 'Filtro de ar', intervalKm: 30000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Troca a cada 30.000 km. Inspecione na revisão de 15.000 km.' },
  { modelName: 'Can-Am Spyder 1330', yearFrom: 2014, yearTo: null, order: 4,
    component: 'Correia CVT (inspeção)', intervalKm: 15000, intervalMonths: null, priority: 'HIGH',
    notes: 'Inspecione a cada revisão. Troca preventiva a cada 40.000–50.000 km. Recall polia dianteira 2015–2019: consulte BRP.' },
  { modelName: 'Can-Am Spyder 1330', yearFrom: 2014, yearTo: null, order: 5,
    component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 36, priority: 'MEDIUM',
    notes: 'Troca a cada 3 anos. Use líquido BRP ou equivalente com protetores de alumínio.' },
  { modelName: 'Can-Am Spyder 1330', yearFrom: 2014, yearTo: null, order: 6,
    component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'HIGH',
    notes: 'A cada 2 anos. 3 pinças de freio independentes + ABS.' },
  { modelName: 'Can-Am Spyder 1330', yearFrom: 2014, yearTo: null, order: 7,
    component: 'Filtro de combustível', intervalKm: 30000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Troca a cada 30.000 km. Etanol brasileiro pode exigir troca mais frequente (cada 20.000 km).' },

  // ── Outlander 570 ──────────────────────────────────────────────────────────
  { modelName: 'Can-Am Outlander 570', yearFrom: 2014, yearTo: null, order: 0,
    component: 'Óleo do motor (5W-40 sintético)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: '~2,9L com filtro. SAE 5W-40. Em uso off-road severo: troque a cada 5.000 km.' },
  { modelName: 'Can-Am Outlander 570', yearFrom: 2014, yearTo: null, order: 1,
    component: 'Vela de ignição (NGK DCPR8E)', intervalKm: 10000, intervalMonths: 12, priority: 'HIGH',
    notes: '1 vela. Gap: 0,8 mm. Iridium DCPR8EIX dura 20.000 km.' },
  { modelName: 'Can-Am Outlander 570', yearFrom: 2014, yearTo: null, order: 2,
    component: 'Filtro de ar (CVT + motor)', intervalKm: 10000, intervalMonths: 12, priority: 'HIGH',
    notes: 'Inspecione e limpe o filtro da CVT a cada 5.000 km em uso off-road. Substituição total a cada 10.000 km.' },
  { modelName: 'Can-Am Outlander 570', yearFrom: 2014, yearTo: null, order: 3,
    component: 'Correia CVT (inspeção)', intervalKm: 5000, intervalMonths: null, priority: 'HIGH',
    notes: 'Inspecione a cada 5.000 km. Substituição preventiva a cada 20.000 km. Correia BRP 715900225.' },
  { modelName: 'Can-Am Outlander 570', yearFrom: 2014, yearTo: null, order: 4,
    component: 'Óleo do diferencial dianteiro (80W-90 GL-5)', intervalKm: 20000, intervalMonths: null, priority: 'MEDIUM',
    notes: '~200 ml. Use fluido específico BRP para diferencial dianteiro com Visco-Lok — não use 80W-90 genérico no dianteiro.' },
  { modelName: 'Can-Am Outlander 570', yearFrom: 2014, yearTo: null, order: 5,
    component: 'Óleo do diferencial traseiro (80W-90 GL-5)', intervalKm: 20000, intervalMonths: null, priority: 'MEDIUM',
    notes: '~300 ml. SAE 80W-90 GL-5. Troca junto com dianteiro.' },
  { modelName: 'Can-Am Outlander 570', yearFrom: 2014, yearTo: null, order: 6,
    component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'A cada 2 anos.' },

  // ── Outlander 650 ──────────────────────────────────────────────────────────
  { modelName: 'Can-Am Outlander 650', yearFrom: 2003, yearTo: null, order: 0,
    component: 'Óleo do motor (5W-40 sintético)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: '~3,0L com filtro (V-Twin). SAE 5W-40 sintético.' },
  { modelName: 'Can-Am Outlander 650', yearFrom: 2003, yearTo: null, order: 1,
    component: 'Velas de ignição (2x NGK DCPR8E)', intervalKm: 10000, intervalMonths: null, priority: 'HIGH',
    notes: '2 velas (V-Twin). Gap: 0,8 mm.' },
  { modelName: 'Can-Am Outlander 650', yearFrom: 2003, yearTo: null, order: 2,
    component: 'Correia CVT (inspeção)', intervalKm: 5000, intervalMonths: null, priority: 'HIGH',
    notes: 'Inspecione a cada 5.000 km. Troca preventiva a cada 20.000–25.000 km.' },
  { modelName: 'Can-Am Outlander 650', yearFrom: 2003, yearTo: null, order: 3,
    component: 'Óleo diferencial dianteiro e traseiro', intervalKm: 20000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Dianteiro: fluido BRP Visco-Lok. Traseiro: 80W-90 GL-5, ~300 ml.' },

  // ── Outlander Pro 800 ──────────────────────────────────────────────────────
  { modelName: 'Can-Am Outlander Pro 800', yearFrom: 2012, yearTo: null, order: 0,
    component: 'Óleo do motor (5W-40 sintético)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: '~3,5L com filtro. SAE 5W-40 full synthetic obrigatório pelo alto torque do 800.' },
  { modelName: 'Can-Am Outlander Pro 800', yearFrom: 2012, yearTo: null, order: 1,
    component: 'Correia CVT (inspeção)', intervalKm: 4000, intervalMonths: null, priority: 'HIGH',
    notes: 'Inspecione a cada 4.000 km (mais frequente que os menores). Troca preventiva a cada 15.000–20.000 km.' },
  { modelName: 'Can-Am Outlander Pro 800', yearFrom: 2012, yearTo: null, order: 2,
    component: 'Velas (2x NGK DCPR8E)', intervalKm: 10000, intervalMonths: null, priority: 'HIGH',
    notes: '2 velas (V-Twin 800). Gap: 0,8 mm.' },
  { modelName: 'Can-Am Outlander Pro 800', yearFrom: 2012, yearTo: null, order: 3,
    component: 'EPS — inspeção do sensor de torque', intervalKm: 20000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Nos modelos com EPS: verifique o sensor de torque por desgaste ou contaminação a cada 20.000 km.' },

  // ── Outlander Pro 1000 ─────────────────────────────────────────────────────
  { modelName: 'Can-Am Outlander Pro 1000', yearFrom: 2012, yearTo: null, order: 0,
    component: 'Óleo do motor (5W-40 full synthetic premium)', intervalKm: 8000, intervalMonths: 12, priority: 'CRITICAL',
    notes: '~3,8L com filtro. Use sintético de alta performance. Intervalo reduzido pelo tamanho do motor.' },
  { modelName: 'Can-Am Outlander Pro 1000', yearFrom: 2012, yearTo: null, order: 1,
    component: 'Correia CVT (inspeção)', intervalKm: 4000, intervalMonths: null, priority: 'CRITICAL',
    notes: 'Pelo alto torque: inspecione a cada 4.000 km. Troca preventiva a cada 15.000 km.' },
  { modelName: 'Can-Am Outlander Pro 1000', yearFrom: 2012, yearTo: null, order: 2,
    component: 'Sistema de arrefecimento', intervalKm: null, intervalMonths: 24, priority: 'HIGH',
    notes: 'Troca do líquido a cada 2 anos. Inspecione mangueiras, termostato e bomba d\'água.' },

  // ── DS 250 ─────────────────────────────────────────────────────────────────
  { modelName: 'Can-Am DS 250', yearFrom: 2006, yearTo: null, order: 0,
    component: 'Óleo do motor (5W-40 ou 10W-40)', intervalKm: 5000, intervalMonths: 12, priority: 'CRITICAL',
    notes: '~1,5L com filtro. Refrigerado a ar — em uso intenso no verão, troque a cada 4.000 km.' },
  { modelName: 'Can-Am DS 250', yearFrom: 2006, yearTo: null, order: 1,
    component: 'Vela de ignição (NGK DCPR9E)', intervalKm: 8000, intervalMonths: null, priority: 'HIGH',
    notes: '1 vela. Gap: 0,9 mm.' },
  { modelName: 'Can-Am DS 250', yearFrom: 2006, yearTo: null, order: 2,
    component: 'Correia CVT (inspeção)', intervalKm: 3000, intervalMonths: null, priority: 'HIGH',
    notes: 'ATV leve — correia desgasta mais rápido com piloto pesado ou terrenos inclinados.' },

  // ── DS 90 ──────────────────────────────────────────────────────────────────
  { modelName: 'Can-Am DS 90', yearFrom: 2002, yearTo: null, order: 0,
    component: 'Óleo do motor (10W-40)', intervalKm: 3000, intervalMonths: 6, priority: 'CRITICAL',
    notes: '~0,8L. Troca semestral ou a cada 3.000 km.' },
  { modelName: 'Can-Am DS 90', yearFrom: 2002, yearTo: null, order: 1,
    component: 'Vela de ignição (NGK C7HSA)', intervalKm: 5000, intervalMonths: null, priority: 'HIGH',
    notes: '1 vela. Gap: 0,6–0,7 mm.' },
  { modelName: 'Can-Am DS 90', yearFrom: 2002, yearTo: null, order: 2,
    component: 'Carburador (limpeza)', intervalKm: null, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'A cada 2 anos ou se apresentar partida difícil. Limpe com spray carburador e recoloque jets originais.' },

  // ── Commander ──────────────────────────────────────────────────────────────
  { modelName: 'Can-Am Commander', yearFrom: 2011, yearTo: null, order: 0,
    component: 'Óleo do motor (5W-40 sintético)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: '~3,0L (800cc) ou ~3,5L (1000cc). SAE 5W-40 sintético.' },
  { modelName: 'Can-Am Commander', yearFrom: 2011, yearTo: null, order: 1,
    component: 'Correia CVT (inspeção)', intervalKm: 5000, intervalMonths: null, priority: 'HIGH',
    notes: 'Inspecione a cada 5.000 km. Troca preventiva a cada 20.000 km.' },
  { modelName: 'Can-Am Commander', yearFrom: 2011, yearTo: null, order: 2,
    component: 'Velas (2x NGK LMAR8C-9)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: '2 velas (motor 1000cc). Código BRP: 715900244.' },
  { modelName: 'Can-Am Commander', yearFrom: 2011, yearTo: null, order: 3,
    component: 'Óleo diferencial dianteiro e traseiro (80W-90)', intervalKm: 20000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Frente e traseiro: 80W-90 GL-5. Troca a cada 20.000 km.' },
  { modelName: 'Can-Am Commander', yearFrom: 2011, yearTo: null, order: 4,
    component: 'Freio estacionário (ajuste do cabo)', intervalKm: 10000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Ajuste o cabo para manter folga de 2–3 mm no atuador. Freio estacionário separado do freio de serviço.' },

  // ── Defender 650 ───────────────────────────────────────────────────────────
  { modelName: 'Can-Am Defender 650', yearFrom: 2016, yearTo: null, order: 0,
    component: 'Óleo do motor (5W-40 sintético)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: '~2,5L com filtro. SAE 5W-40.' },
  { modelName: 'Can-Am Defender 650', yearFrom: 2016, yearTo: null, order: 1,
    component: 'Correia CVT (inspeção)', intervalKm: 3000, intervalMonths: null, priority: 'HIGH',
    notes: 'Em uso de trabalho pesado: inspecione a cada 3.000 km.' },
  { modelName: 'Can-Am Defender 650', yearFrom: 2016, yearTo: null, order: 2,
    component: 'Vela de ignição (NGK 715900637)', intervalKm: 20000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Código OEM BRP: 715900637.' },

  // ── Defender 800 ───────────────────────────────────────────────────────────
  { modelName: 'Can-Am Defender 800', yearFrom: 2015, yearTo: null, order: 0,
    component: 'Óleo do motor (5W-40 sintético)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: '~3,0L com filtro. SAE 5W-40 sintético.' },
  { modelName: 'Can-Am Defender 800', yearFrom: 2015, yearTo: null, order: 1,
    component: 'Correia CVT (inspeção)', intervalKm: 5000, intervalMonths: null, priority: 'HIGH',
    notes: 'Inspecione a cada 5.000 km. Troca preventiva a cada 20.000 km.' },
  { modelName: 'Can-Am Defender 800', yearFrom: 2015, yearTo: null, order: 2,
    component: 'Velas (2x NGK 715900637)', intervalKm: 20000, intervalMonths: null, priority: 'MEDIUM',
    notes: '2 velas (V-Twin HD8).' },
  { modelName: 'Can-Am Defender 800', yearFrom: 2015, yearTo: null, order: 3,
    component: 'Botas/protetor do cardan traseiro', intervalKm: 10000, intervalMonths: null, priority: 'HIGH',
    notes: 'Inspecione em toda revisão. Bota rasgada → junta seca → vibração → quebra. R$ 80 vs R$ 1.500 de reparo.' },

  // ── Defender 976 ───────────────────────────────────────────────────────────
  { modelName: 'Can-Am Defender 976', yearFrom: 2017, yearTo: null, order: 0,
    component: 'Óleo do motor (0W-40 full synthetic — OBRIGATÓRIO)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: '~3,5L com filtro. 0W-40 OBRIGATÓRIO para o HD10/976 — não substitua por 5W-40.' },
  { modelName: 'Can-Am Defender 976', yearFrom: 2017, yearTo: null, order: 1,
    component: 'Correia CVT (inspeção)', intervalKm: 5000, intervalMonths: null, priority: 'HIGH',
    notes: 'Inspecione a cada 5.000 km.' },
  { modelName: 'Can-Am Defender 976', yearFrom: 2017, yearTo: null, order: 2,
    component: 'Radiador (limpeza de entupimento)', intervalKm: null, intervalMonths: 6, priority: 'HIGH',
    notes: 'Em ambientes rurais com pó/palha (colheita): limpe o radiador a cada 200 horas. Ar comprimido do lado interno para externo.' },

  // ── Maverick Trail ─────────────────────────────────────────────────────────
  { modelName: 'Can-Am Maverick Trail', yearFrom: 2018, yearTo: null, order: 0,
    component: 'Óleo do motor (0W-40 full synthetic — OBRIGATÓRIO)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: '~3,0L com filtro. Motor ACE 900 3-cilindros. 0W-40 obrigatório.' },
  { modelName: 'Can-Am Maverick Trail', yearFrom: 2018, yearTo: null, order: 1,
    component: 'Velas (3x NGK LMAR8C-9)', intervalKm: 10000, intervalMonths: null, priority: 'HIGH',
    notes: '3 velas (motor ACE 900 3-cilindros). Código BRP: 715900244.' },
  { modelName: 'Can-Am Maverick Trail', yearFrom: 2018, yearTo: null, order: 2,
    component: 'Filtro da CVT (limpeza)', intervalKm: 5000, intervalMonths: null, priority: 'HIGH',
    notes: 'Em trilhas de lama: limpe após cada sessão. Filtro entopido → CVT superaquece → correia arrebenta.' },
  { modelName: 'Can-Am Maverick Trail', yearFrom: 2018, yearTo: null, order: 3,
    component: 'Correia CVT', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Inspecione a cada 5.000 km. Troca preventiva a cada 20.000 km.' },
  { modelName: 'Can-Am Maverick Trail', yearFrom: 2018, yearTo: null, order: 4,
    component: 'Óleo diferencial dianteiro e traseiro', intervalKm: 20000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Ambos: 80W-90 GL-5 ou fluido BRP específico conforme manual do ano.' },

  // ── Maverick Sport ─────────────────────────────────────────────────────────
  { modelName: 'Can-Am Maverick Sport', yearFrom: 2018, yearTo: null, order: 0,
    component: 'Óleo do motor (0W-40 full synthetic)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Atmosférico: ~3,5L. Turbo 1000R: troque a cada 8.000 km.' },
  { modelName: 'Can-Am Maverick Sport', yearFrom: 2018, yearTo: null, order: 1,
    component: 'Correia CVT', intervalKm: 5000, intervalMonths: null, priority: 'HIGH',
    notes: 'Inspeção a cada 5.000 km. Troca preventiva a cada 20.000 km. Alta potência exige correia em perfeito estado.' },
  { modelName: 'Can-Am Maverick Sport', yearFrom: 2018, yearTo: null, order: 2,
    component: 'Terminais de direção e buchas de suspensão', intervalKm: 15000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Inspecione terminais e buchas a cada 15.000 km ou após batidas fortes em pedras/buracos.' },

  // ── Maverick X3 ────────────────────────────────────────────────────────────
  { modelName: 'Can-Am Maverick X3', yearFrom: 2017, yearTo: null, order: 0,
    component: 'Óleo do motor (0W-40 full synthetic premium)', intervalKm: 8000, intervalMonths: 12, priority: 'CRITICAL',
    notes: '~3,5L com filtro. Turbo ACE 900. Use sintético premium (Motul 300V, Amsoil, Shell Helix Ultra). Intervalo 8.000 km pelo turbo.' },
  { modelName: 'Can-Am Maverick X3', yearFrom: 2017, yearTo: null, order: 1,
    component: 'Correia CVT (inspeção frequente)', intervalKm: 3000, intervalMonths: null, priority: 'CRITICAL',
    notes: 'Alta potência turbo: inspecione a cada 3.000 km. Troca preventiva a cada 15.000 km. Leve sobressalente em viagens de duna.' },
  { modelName: 'Can-Am Maverick X3', yearFrom: 2017, yearTo: null, order: 2,
    component: 'Intercooler (limpeza)', intervalKm: null, intervalMonths: 6, priority: 'HIGH',
    notes: 'Limpe o intercooler a cada 6 meses ou após trilhas em lama. Entupimento causa perda de boost e potência.' },
  { modelName: 'Can-Am Maverick X3', yearFrom: 2017, yearTo: null, order: 3,
    component: 'Velas (3x NGK LMAR8C-9)', intervalKm: 10000, intervalMonths: null, priority: 'HIGH',
    notes: '3 velas (ACE 900 3-cilindros). Código BRP: 715900244.' },
  { modelName: 'Can-Am Maverick X3', yearFrom: 2017, yearTo: null, order: 4,
    component: 'Amortecedores FOX (inspeção de vazamento)', intervalKm: 20000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Inspecione vedações dos amortecedores Fox a cada 20.000 km ou se sentir variação de desempenho. Recarga de nitrogênio quando necessário.' },
]

// ─── Runner ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed BRP / Can-Am iniciando...\n')

  const motoType = await prisma.vehicleType.upsert({
    where: { slug: 'moto' },
    update: {},
    create: { slug: 'moto', label: 'Moto' },
  })

  const brpBrand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'BRP', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'BRP', vehicleTypeId: motoType.id },
  })
  console.log(`  ✅ Brand: ${brpBrand.name}`)

  for (const block of brpModels) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brpBrand.id } },
      update: {},
      create: { name: block.modelName, brandId: brpBrand.id },
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
  for (const tp of brpTirePressures) {
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
  const modelNames = [...new Set(brpMaintenanceItems.map(m => m.modelName))]
  for (const name of modelNames) {
    await prisma.maintenanceItem.deleteMany({ where: { modelName: name } })
  }
  await prisma.maintenanceItem.createMany({
    data: brpMaintenanceItems.map(item => ({
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
    const count = brpMaintenanceItems.filter(m => m.modelName === name).length
    console.log(`  ✅ ${name}: ${count} itens de manutenção`)
  }

  const totalTips = brpModels.reduce(
    (acc, b) => acc + b.MACETES.length + b.PROBLEMAS.length + b.MANUTENCAO.length,
    0,
  )
  console.log(
    `\n✅ Seed BRP concluído: ${brpModels.length} modelos, ${totalTips} dicas, ${brpTirePressures.length} calibragens, ${brpMaintenanceItems.length} itens de manutenção.`,
  )
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
