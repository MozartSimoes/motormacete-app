/**
 * Seed DAFRA CITYCOM PREMIUM — macetes, problemas e manutenção
 * Cobre as variantes premium mais recentes do Citycom 300i, atualmente em linha:
 * CITYCOM HD 300i (lançada em março/2020) e CITYCOM S 300i/300i ABS (lançada em 2017,
 * versão ABS de dois canais a partir de 2019/2020).
 *
 * CONTEXTO: a DAFRA NÃO encerrou operações no Brasil. A parceria DAFRA↔TVS terminou
 * em 03/2024 (fábrica de Manaus parou de montar TVS/Apache), mas a marca segue ativa
 * com foco na parceria com a SYM (taiwanesa) — Citycom, Cruisym, Maxsym, Fiddle,
 * Joyride, CityClass e ADXTG são modelos SYM rebatizados DAFRA. A empresa também monta
 * Ducati e Royal Enfield na mesma planta e tem centro de distribuição em Itajaí/SC.
 * Concessionárias DAFRA continuam vendendo e atendendo esses modelos SYM atuais, com
 * peças genuínas disponíveis pela rede — diferente da situação de modelos legados
 * antigos da marca (Kansas, Riva, Speed etc., já cobertos em seed-dafra.ts).
 *
 * Motor: ambas as variantes usam o mesmo monocilíndrico 278,3cc, 4 válvulas, SOHC,
 * refrigerado a líquido, injeção eletrônica — evolução do motor 263,7cc do Citycom
 * 300i original (2010–2016). Potência declarada varia entre ~24,5 e ~27,8 cv conforme
 * a fonte/ano/metodologia de medição (normas ABNT distintas ao longo dos anos); torque
 * na faixa de 2,5–2,8 kgf.m (~24,5–27,5 Nm) a 6.500 rpm. A HD é a versão mais confortável
 * e ~13 kg mais leve que a S (bagageiro maior, farol que acompanha o guidão, mangueiras
 * de freio em aço trançado, 2 anos de garantia — primeira Dafra com essa cobertura). A
 * S 300i/300i ABS é a versão com amortecedores traseiros duplos visíveis e frenagem
 * combinada FH-CBS (Full Hydraulic Combined Brake System), com o ABS de dois canais
 * disponível como versão/trim adicional a partir de 2019/2020.
 *
 * Fontes: motonline.com.br/guia-de-motos/dafra/citycom-hd-300i, magodoscarros.com
 * (fichas técnicas 2018-2024), motordomundo.com.br, shopcar.com.br, olhonocarro.com.br,
 * daframotos.com.br (Programa de Manutenção Citycom/HD e manuais do proprietário),
 * scooter.net.br, tuningparts.com.br (vela/pneus), reclameaqui.com.br (queixas de
 * proprietários — cebolinha da ventoinha, roda traseira, amortecedores), fórum
 * citycom.forumeiros.com, motonline.com.br (matéria "Dafra Citycom com muitos problemas")
 *
 * Execute: pnpm --filter @motormacete/database exec tsx prisma/seed-dafra-citycom-premium.ts
 * (não faz parte do fluxo padrão de seed — arquivo standalone análogo a seed-dafra.ts)
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

// ─── CITYCOM HD 300i ─────────────────────────────────────────────────────────

const CITYCOMHD_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 278,3cc idêntico ao S 300i, mas a HD é 13 kg mais leve',
    body: 'A Citycom HD 300i usa o mesmo motor monocilíndrico 278,3cc, 4 válvulas, refrigerado a líquido e com injeção eletrônica da versão S — mas a moto é cerca de 13 kg mais leve, graças a otimizações no chassi e nos componentes. Aproveite esse peso menor em manobras de baixa velocidade (estacionar, sair de garagem) — a HD "dobra" mais fácil que a S no trânsito parado.',
  },
  {
    severity: 'WARN',
    title: 'Farol que acompanha o guidão: ajuste o facho conforme a carga',
    body: 'A HD 300i tem farol dianteiro que gira junto com o guidão (efeito "cornering" parcial) — melhora a iluminação em curvas noturnas, mas o alcance do facho muda dependendo do peso na garupa e no bagageiro (a moto se inclina para trás com carga). Se notar o facho baixo apontando para cima em estradas escuras com passageiro, regule o parafuso de ajuste vertical do farol antes de viagens noturnas.',
  },
  {
    severity: 'OK',
    title: 'Bagageiro sob o banco de 38 L: 8 L a mais que a versão S — mas respeite o limite de peso',
    body: 'O compartimento sob o banco da HD 300i tem 38 litros (8 L a mais que a S), suficiente para dois capacetes integrais em muitos casos. Ainda assim, o limite de peso recomendado é de 5 kg — carga além disso deforma as travas e os trilhos plásticos ao longo do tempo. Para bagagem pesada, use bauleto traseiro fixado no rack.',
  },
  {
    severity: 'OK',
    title: 'Mangueiras de freio em aço trançado: ainda assim, troque o fluido no prazo',
    body: 'A HD 300i veio de fábrica com mangueiras de freio revestidas em aço trançado (menos expansão sob calor/pressão que a mangueira de borracha comum). Isso melhora a resposta do freio, mas não substitui a troca periódica do fluido DOT 4 — o fluido absorve umidade do ar com o tempo independentemente do tipo de mangueira, e fluido “velho” ferve mais fácil e deixa o freio esponjoso.',
  },
  {
    severity: 'OK',
    title: 'Garantia de 2 anos: primeira Dafra com essa cobertura — use a rede autorizada nesse período',
    body: 'A Citycom HD 300i foi o primeiro modelo Dafra a sair de fábrica com 2 anos de garantia (o padrão anterior da marca era 1 ano). Para não perder a cobertura, faça as revisões programadas em concessionária autorizada Dafra dentro dos prazos do manual — revisões fora da rede autorizada, mesmo que bem feitas, podem ser usadas pela fabricante para negar cobertura de garantia em caso de problema.',
  },
  {
    severity: 'WARN',
    title: 'CVT: acelere progressivamente nos primeiros quilômetros do dia',
    body: 'Como toda scooter CVT, a HD 300i sofre desgaste acelerado de correia e roletes do variador quando o acelerador é aberto bruscamente com o motor ainda frio. Nos primeiros 2–3 km do dia, mantenha aceleração suave e progressiva — o óleo do motor e da transmissão precisam atingir temperatura de trabalho antes de receber carga total.',
  },
  {
    severity: 'OK',
    title: 'Óleo do motor: siga o intervalo de 3.000 km à risca — motor 4 válvulas exige troca em dia',
    body: 'O motor de 4 válvulas da HD 300i tem tolerâncias mais estreitas que motores de 2 válvulas mais simples. Óleo degradado circula pior nas folgas do comando de válvulas e acelera desgaste. Troque a cada 3.000 km mesmo com pouco uso — óleo parado no cárter também oxida com o tempo, não só com quilometragem.',
  },
]

const CITYCOMHD_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Sensor (cebolinha) da ventoinha com atraso: pode causar superaquecimento e ruptura da junta do cabeçote',
    body: 'Problema relatado por proprietários e reportado em matéria da Motonline: o sensor térmico ("cebolinha") que aciona a ventoinha do radiador pode atrasar o acionamento, deixando o motor em temperatura elevada por mais tempo que o normal em trânsito parado. Em casos extremos, isso já foi associado a ruptura da junta do cabeçote com mistura de líquido de arrefecimento no combustível. Sintoma de alerta: ventoinha demorando visivelmente para ligar com o motor quente parado no farol. Se perceber isso, leve à concessionária para testar o sensor e o relé da ventoinha antes que o problema evolua — o sensor é uma peça simples e de baixo custo comparado ao reparo do cabeçote.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedores dianteiros com durabilidade abaixo do esperado',
    body: 'Relatos de proprietários (fóruns e avaliações de longo prazo) apontam desgaste do vedante da bengala dianteira mais cedo do que o esperado para um scooter premium — manchas de óleo na parte inferior da bengala e amortecimento irregular após uso intenso em vias esburacadas. Inspecione visualmente a cada 5.000 km. A troca do vedante é um serviço relativamente simples para mecânico com experiência em scooters CVT.',
  },
  {
    severity: 'WARN',
    title: 'Pastilhas de freio: durabilidade menor que o esperado com pastilhas genéricas',
    body: 'Proprietários relatam que a durabilidade das pastilhas de freio cai bastante quando não são usadas pastilhas de boa qualidade (original Dafra/SYM ou marcas reconhecidas como Cobreq/Fremax para scooter). Pastilhas muito baratas desgastam de forma acelerada e podem gerar ruído e vibração no freio. Inspecione a cada 5.000 km e não economize na hora de repor.',
  },
  {
    severity: 'WARN',
    title: 'Unidades relatadas com vibração, guidão pesado e marcador de combustível oscilando ainda com pouca quilometragem',
    body: 'Há reclamações registradas (Reclame Aqui) de unidades HD 300i com problemas ainda no início de uso (por volta de 800 km): guidão pesado nas curvas, trepidação em deslocamento, marcador de combustível com leitura oscilante, ruído sob o banco e início de oxidação no escapamento. Se notar qualquer um desses sintomas logo após a compra, acione a garantia de 2 anos imediatamente — não são desgastes normais de uso, mas sim indícios de problema de fábrica ou de PDI (preparação) malfeito pela concessionária.',
  },
  {
    severity: 'WARN',
    title: 'Roda traseira: casos registrados de trincas — inspecione periodicamente',
    body: 'Existem relatos documentados (Reclame Aqui, com múltiplos proprietários relatando o mesmo padrão) de trincas na roda traseira de liga leve do Citycom 300i/HD. Não é a maioria das unidades, mas o padrão de queixa é recorrente o suficiente para merecer atenção: inspecione visualmente a roda traseira a cada troca de pneu ou lavagem mais cuidadosa, procurando por trincas próximas aos raios ou ao aro. Rodas com trinca visível não devem rodar — risco de falha estrutural em movimento.',
  },
  {
    severity: 'OK',
    title: 'Peças SYM/Dafra: rede de concessionárias ativa facilita reposição — diferente dos modelos legados da marca',
    body: 'Por ser um modelo SYM atual rebatizado Dafra (não um modelo legado descontinuado), a HD 300i tem peças genuínas disponíveis pela rede de concessionárias Dafra em operação, incluindo componentes elétricos e de injeção. Isso é uma vantagem real sobre os modelos antigos da marca (Kansas, Riva, Speed etc.) — não espere a mesma escassez de peças que afeta aqueles modelos fora de linha há uma década ou mais.',
  },
]

const CITYCOMHD_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Citycom HD 300i: baseado no Programa de Manutenção oficial Citycom/HD da Dafra',
    body: '3.000 km — Troca de óleo do motor (SAE 20W-50 ou conforme atualização do manual, ~1,2 L após troca / ~1,4 L a seco). | 6.000 km — Troca de óleo do câmbio CVT + troca do filtro de ar + limpeza do variador CVT (correia e roletes). | 9.000 km — Vela NGK CR8E (gap 0,6–0,7 mm) + troca do óleo das bengalas dianteiras. | 12.000 km — Inspeção da correia CVT (trocar se houver rachaduras ou desgaste visível). | 15.000 km — Fluido de freio DOT 4 (dianteiro e traseiro — sistema FH-CBS). Inspecionar amortecedores dianteiros por vazamento. | 20.000 km — Rolamentos de roda. Inspecionar roda traseira por trincas. | 24.000 km — Trocar líquido de arrefecimento (mistura pronta 50/50 com aditivo, nunca água pura). Testar sensor/relé da ventoinha do radiador.',
  },
]

// ─── CITYCOM S 300i / 300i ABS ───────────────────────────────────────────────

const CITYCOMS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Sistema FH-CBS: o freio esquerdo (traseiro) já distribui força para o dianteiro',
    body: 'O Citycom S 300i usa o sistema FH-CBS (Full Hydraulic Combined Brake System): ao acionar o manete esquerdo (freio traseiro), até 30% da força de frenagem é automaticamente distribuída ao disco dianteiro por via hidráulica. Isso não substitui o uso do freio dianteiro em frenagens de emergência — use sempre os dois manetes, com progressão suave. Puxar somente o freio traseiro com força total pode travar a roda mesmo com o CBS ativo.',
  },
  {
    severity: 'WARN',
    title: 'Versão ABS: luz de alerta no painel indica sensor de roda sujo ou com defeito',
    body: 'Na versão S 300i ABS, cada roda tem um sensor de rotação (anel dentado + sensor magnético) para o módulo de ABS de dois canais funcionar. Se a luz de ABS acender fixa no painel e permanecer acesa, o sistema pode estar desativado (rodando apenas com o CBS convencional) até ser diagnosticado. Não ignore o alerta — leve à concessionária para verificar se é sujeira/lama no sensor (comum após lavagem com jato de alta pressão) ou dano no anel dentado.',
  },
  {
    severity: 'OK',
    title: 'Amortecedores traseiros duplos com pré-carga ajustável: regule conforme o uso',
    body: 'Diferente da HD (mono-braço com amortecedor único), a S 300i tem par de amortecedores traseiros visíveis com pré-carga ajustável. Para uso solo na cidade, deixe na posição mais macia; para uso frequente com garupa ou bagagem pesada, aumente a pré-carga uma ou duas posições — evita que a suspensão "bata" no batente e melhora a estabilidade em curvas com peso extra.',
  },
  {
    severity: 'WARN',
    title: 'CVT: evite acelerar fundo com o motor frio',
    body: 'Assim como toda a linha Citycom, a S 300i tem transmissão CVT sensível a abertura brusca de acelerador com motor frio — desgasta a correia e os roletes do variador prematuramente. Acelere de forma progressiva nos primeiros minutos de uso, especialmente em dias frios.',
  },
  {
    severity: 'OK',
    title: 'Óleo do câmbio CVT: troque junto com o óleo do motor aos 6.000 km, não antes',
    body: 'A S 300i tem dois reservatórios de óleo separados: motor e câmbio CVT. O óleo do câmbio dura mais que o do motor (6.000 km vs 3.000 km) porque o ambiente da transmissão é mais protegido. Trocar o óleo do câmbio antes do previsto não traz benefício e só gera custo extra — siga o intervalo de 6.000 km recomendado pela Dafra.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR8E: verifique o gap na troca — não confie apenas na vela nova de fábrica',
    body: 'A vela original da linha Citycom S 300i é a NGK CR8E, com gap de fábrica entre 0,6 e 0,7 mm. Mesmo velas novas de procedência duvidosa podem vir com gap fora da especificação. Sempre confira com um calibre de folgas antes de instalar — gap incorreto causa falha de ignição intermitente, principalmente em dias úmidos.',
  },
]

const CITYCOMS_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Mesmo risco de superaquecimento por atraso no sensor da ventoinha (plataforma compartilhada com a HD)',
    body: 'Por compartilhar o motor e o sistema de arrefecimento com a HD 300i, a S 300i está sujeita ao mesmo problema documentado: sensor térmico da ventoinha com atraso no acionamento, podendo levar a superaquecimento em trânsito parado e, em casos relatados, ruptura da junta do cabeçote com mistura de líquido de arrefecimento no combustível. Fique atento a demora perceptível da ventoinha para ligar com o motor quente — leve para diagnóstico preventivo do sensor e do relé.',
  },
  {
    severity: 'WARN',
    title: 'Unidades 2018 com múltiplos problemas relatados (Reclame Aqui)',
    body: 'Proprietários de unidades do ano-modelo 2018 relataram, em reclamações públicas, uma combinação de problemas de fábrica na S 300i — de itens elétricos a ajustes de montagem malfeitos na concessionária. Se for comprar uma unidade usada desse ano especificamente, vale pedir o histórico completo de manutenção e revisar com atenção redobrada itens elétricos (chicote, conectores, painel digital) antes de fechar negócio.',
  },
  {
    severity: 'WARN',
    title: 'Pastilhas de freio dianteiro: desgaste acelerado com peças de baixa qualidade',
    body: 'O peso da S 300i (mais pesada que a HD) exige boas pastilhas de freio no disco dianteiro. Pastilhas genéricas baratas desgastam rapidamente e podem comprometer a frenagem em situações de emergência. Prefira pastilhas originais SYM/Dafra ou marcas de reposição consolidadas (Cobreq, Fremax) — inspecione a cada 5.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Roda traseira: mesmo padrão de trincas relatado na comunidade de proprietários',
    body: 'Assim como na HD, há relatos documentados de trincas na roda traseira de liga leve na linha S 300i — mesmo padrão de queixa reportado por diferentes proprietários em plataformas de reclamação. Inspecione visualmente a cada troca de pneu, principalmente próximo aos raios da roda. Roda com trinca visível não deve rodar.',
  },
  {
    severity: 'WARN',
    title: 'Diferença ABS vs CBS: não presuma que sua unidade tem ABS sem confirmar',
    body: 'Como "S 300i" e "S 300i ABS" são comercializados sob a mesma família de modelo (às vezes até no mesmo código FIPE), é possível comprar uma unidade usada sem saber ao certo se ela tem o módulo de ABS de dois canais ou só o CBS convencional. Confira no manual/nota fiscal da unidade específica e, na dúvida, teste em piso escorregadio e baixa velocidade (com segurança) observando se há intervenção perceptível do ABS na frenagem forte — ou consulte a concessionária pelo chassi.',
  },
  {
    severity: 'OK',
    title: 'Peças SYM/Dafra: disponibilidade real pela rede autorizada, sem o cenário de escassez dos modelos legados',
    body: 'A S 300i/300i ABS é um modelo SYM atual rebatizado Dafra, com concessionárias ativas vendendo e atendendo a linha — inclusive peças de injeção eletrônica e do sistema CBS/ABS. Diferente dos modelos antigos e descontinuados da marca, aqui não há motivo para temer "peças impossíveis de achar": o principal desafio é encontrar mecânicos com experiência específica em CVT e sistemas de freio combinado, não a peça em si.',
  },
]

const CITYCOMS_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Citycom S 300i/300i ABS: mesmo Programa de Manutenção Citycom/HD da Dafra',
    body: '3.000 km — Troca de óleo do motor (SAE 20W-50 ou conforme atualização do manual, ~1,2 L após troca). | 6.000 km — Troca de óleo do câmbio CVT + troca do filtro de ar + limpeza do variador CVT (correia e roletes). | 9.000 km — Vela NGK CR8E (gap 0,6–0,7 mm) + troca do óleo das bengalas dianteiras. | 12.000 km — Inspeção da correia CVT (trocar se necessário). | 15.000 km — Fluido de freio DOT 4 (sistema FH-CBS, e sensores do ABS na versão equipada). Inspecionar amortecedores traseiros duplos. | 20.000 km — Rolamentos de roda. Inspecionar roda traseira por trincas. | 24.000 km — Trocar líquido de arrefecimento. Testar sensor/relé da ventoinha do radiador. Na versão ABS, verificar limpeza dos sensores de roda.',
  },
]

// ─── BLOCKS ──────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'CITYCOM HD 300i',
    yearFrom: 2020,
    yearTo: null,
    MACETES: CITYCOMHD_MACETES,
    PROBLEMAS: CITYCOMHD_PROBLEMAS,
    MANUTENCAO: CITYCOMHD_MANUTENCAO,
  },
  {
    modelName: 'CITYCOM S 300i/300i ABS',
    yearFrom: 2017,
    yearTo: null,
    MACETES: CITYCOMS_MACETES,
    PROBLEMAS: CITYCOMS_PROBLEMAS,
    MANUTENCAO: CITYCOMS_MANUTENCAO,
  },
]

// ─── TIRE PRESSURES ──────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'CITYCOM HD 300i',
    yearFrom: 2020,
    yearTo: null,
    tireSize: '110/70-16 (F) · 130/70-16 (R)',
    frontPsi: 25,
    rearPsi: 28,
    frontPsiLoad: 25,
    rearPsiLoad: 32,
    notes: 'Valores conforme manual do proprietário Dafra — há divergência entre páginas do próprio manual e do site oficial em diferentes anos (algumas fontes citam 25/25, outras 32/36 com garupa). Confirme no manual da sua unidade específica e calibre sempre com pneu frio.',
  },
  {
    modelName: 'CITYCOM S 300i/300i ABS',
    yearFrom: 2017,
    yearTo: null,
    tireSize: '110/70-16 (F) · 130/70-16 (R)',
    frontPsi: 25,
    rearPsi: 28,
    frontPsiLoad: 25,
    rearPsiLoad: 32,
    notes: 'Mesma plataforma de rodas/pneus da HD 300i. Confirme no manual da sua unidade específica — há divergência de valores entre versões do manual Dafra. Calibre sempre com pneu frio.',
  },
]

// ─── MAINTENANCE ITEMS ────────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // CITYCOM HD 300i
  { modelName: 'CITYCOM HD 300i', yearFrom: 2020, yearTo: null, component: 'Óleo motor (SAE 20W-50 ou conforme atualização do manual, ~1,2 L após troca)', intervalKm: 3000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'CITYCOM HD 300i', yearFrom: 2020, yearTo: null, component: 'Óleo câmbio CVT', intervalKm: 6000, intervalMonths: null, notes: 'Trocar junto com filtro de ar e limpeza do variador', priority: 'HIGH', order: 2 },
  { modelName: 'CITYCOM HD 300i', yearFrom: 2020, yearTo: null, component: 'Filtro de ar (trocar)', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'CITYCOM HD 300i', yearFrom: 2020, yearTo: null, component: 'Limpeza do variador CVT (correia e roletes)', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'CITYCOM HD 300i', yearFrom: 2020, yearTo: null, component: 'Vela NGK CR8E (gap 0,6–0,7 mm)', intervalKm: 9000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'CITYCOM HD 300i', yearFrom: 2020, yearTo: null, component: 'Óleo das bengalas dianteiras', intervalKm: 9000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'CITYCOM HD 300i', yearFrom: 2020, yearTo: null, component: 'Inspeção da correia CVT (trocar se desgastada)', intervalKm: 12000, intervalMonths: null, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'CITYCOM HD 300i', yearFrom: 2020, yearTo: null, component: 'Fluido de freio DOT 4 (sistema FH-CBS, frente e trás)', intervalKm: 15000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'CITYCOM HD 300i', yearFrom: 2020, yearTo: null, component: 'Inspecionar amortecedores dianteiros (vazamento de óleo)', intervalKm: 15000, intervalMonths: null, notes: 'Durabilidade reportada abaixo do esperado — inspecionar com atenção', priority: 'MEDIUM', order: 9 },
  { modelName: 'CITYCOM HD 300i', yearFrom: 2020, yearTo: null, component: 'Rolamentos de roda', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 10 },
  { modelName: 'CITYCOM HD 300i', yearFrom: 2020, yearTo: null, component: 'Inspecionar roda traseira por trincas', intervalKm: 20000, intervalMonths: null, notes: 'Casos documentados de trincas na roda de liga — não rodar com trinca visível', priority: 'HIGH', order: 11 },
  { modelName: 'CITYCOM HD 300i', yearFrom: 2020, yearTo: null, component: 'Trocar líquido de arrefecimento', intervalKm: 24000, intervalMonths: 24, notes: 'Testar também sensor/relé da ventoinha do radiador', priority: 'HIGH', order: 12 },

  // CITYCOM S 300i/300i ABS
  { modelName: 'CITYCOM S 300i/300i ABS', yearFrom: 2017, yearTo: null, component: 'Óleo motor (SAE 20W-50 ou conforme atualização do manual, ~1,2 L após troca)', intervalKm: 3000, intervalMonths: 6, notes: null, priority: 'HIGH', order: 1 },
  { modelName: 'CITYCOM S 300i/300i ABS', yearFrom: 2017, yearTo: null, component: 'Óleo câmbio CVT', intervalKm: 6000, intervalMonths: null, notes: 'Trocar junto com filtro de ar e limpeza do variador', priority: 'HIGH', order: 2 },
  { modelName: 'CITYCOM S 300i/300i ABS', yearFrom: 2017, yearTo: null, component: 'Filtro de ar (trocar)', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'CITYCOM S 300i/300i ABS', yearFrom: 2017, yearTo: null, component: 'Limpeza do variador CVT (correia e roletes)', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'CITYCOM S 300i/300i ABS', yearFrom: 2017, yearTo: null, component: 'Vela NGK CR8E (gap 0,6–0,7 mm)', intervalKm: 9000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'CITYCOM S 300i/300i ABS', yearFrom: 2017, yearTo: null, component: 'Óleo das bengalas dianteiras', intervalKm: 9000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'CITYCOM S 300i/300i ABS', yearFrom: 2017, yearTo: null, component: 'Inspeção da correia CVT (trocar se desgastada)', intervalKm: 12000, intervalMonths: null, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'CITYCOM S 300i/300i ABS', yearFrom: 2017, yearTo: null, component: 'Fluido de freio DOT 4 (sistema FH-CBS e sensores ABS na versão equipada)', intervalKm: 15000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'CITYCOM S 300i/300i ABS', yearFrom: 2017, yearTo: null, component: 'Inspecionar amortecedores traseiros duplos (pré-carga e vazamento)', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 9 },
  { modelName: 'CITYCOM S 300i/300i ABS', yearFrom: 2017, yearTo: null, component: 'Rolamentos de roda', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 10 },
  { modelName: 'CITYCOM S 300i/300i ABS', yearFrom: 2017, yearTo: null, component: 'Inspecionar roda traseira por trincas', intervalKm: 20000, intervalMonths: null, notes: 'Casos documentados de trincas na roda de liga — não rodar com trinca visível', priority: 'HIGH', order: 11 },
  { modelName: 'CITYCOM S 300i/300i ABS', yearFrom: 2017, yearTo: null, component: 'Trocar líquido de arrefecimento', intervalKm: 24000, intervalMonths: 24, notes: 'Testar também sensor/relé da ventoinha do radiador', priority: 'HIGH', order: 12 },
  { modelName: 'CITYCOM S 300i/300i ABS', yearFrom: 2017, yearTo: null, component: 'Verificar limpeza dos sensores de roda do ABS (versão equipada)', intervalKm: 24000, intervalMonths: null, notes: 'Sujeira/lama no sensor após lavagem de alta pressão é causa comum de luz de ABS acesa', priority: 'MEDIUM', order: 13 },
]

// ─── RUNNER ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('🛵 Seed DAFRA Citycom Premium iniciado...')

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

  console.log('✅ Seed DAFRA Citycom Premium concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
