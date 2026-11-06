/**
 * Seed DAFRA Cargo/Utilitários — macetes, problemas e manutenção
 * Cobre as versões utilitárias (motofrete/entrega) dos modelos DAFRA já cobertos
 * em detalhe mecânico no seed principal (seed-dafra.ts): RIVA 150cc (scooter CVT)
 * e SPEED 150 (naked câmbio manual).
 *
 * CONTEXTO: a parceria DAFRA↔TVS terminou em 03/2024, mas a DAFRA NÃO encerrou
 * operações no Brasil — segue ativa com foco na parceria com a SYM. Estes modelos
 * Cargo são versões utilitárias legadas (não-SYM), com produção encerrada há anos.
 * Peças originais específicas de carroceria/cargo (baú de fábrica, suporte reforçado,
 * bagageiro reforçado) são raras por baixo volume de vendas e idade do modelo — isso
 * é diferente de "a marca fechou".
 *
 * Modelos cobertos:
 * RIVA Cargo 150cc (scooter CVT com bagageiro/baú reforçado para motofrete,
 * lançada em 2012, ~R$ 5.490 no lançamento — R$ 200 a mais que a versão street)
 * SPEED Cargo 150 (naked câmbio manual com baú de fábrica até 20kg, cavalete
 * central e chassi reforçados, amortecedores dianteiro/traseiro reforçados,
 * lançada em 2011, ~R$ 5.090 no lançamento)
 *
 * Diferenças mecânicas confirmadas vs. versão street equivalente:
 * - SPEED Cargo: amortecedores dianteiro/traseiro reforçados, cavalete central e
 *   chassi reforçados, rodas de liga leve 18" (pneu 2.75-18 diant. / 90/90-18 tras.,
 *   vs 17" da Speed 150 street), baú de fábrica com capacidade até 20kg.
 * - RIVA Cargo: bagageiro/suporte de baú reforçado, protetor de pernas e antena
 *   protetora (itens exigidos pela Resolução Contran para motofrete regularizado).
 *   Motor, CVT, óleo e vela seguem as mesmas especificações da Riva 150cc street
 *   documentadas no seed principal — nenhuma fonte confirma motor ou CVT distintos.
 *
 * Fontes: revista.moto.com.br (release oficial de lançamento da Riva 150 Cargo),
 *         motorede.com.br (release de lançamento da Speed 150 Cargo), tribunapr.com.br,
 *         reclameaqui.com.br (relatos de proprietários Speed/Riva), forums DAFRA,
 *         seed-dafra.ts (specs de motor/CVT/óleo já documentadas para os modelos-base)
 *
 * NOTA DE INCERTEZA: não foi possível confirmar em fonte oficial a capacidade de
 * carga em kg do bagageiro da Riva Cargo (só da Speed Cargo, 20kg). Pressões de
 * pneu "com baú cheio" abaixo são estimativas de boa prática (ajuste de +3 a +6 PSI
 * no traseiro sobre a carga solo) — consulte a etiqueta do chassi/manual para o
 * valor exato de cada unidade.
 *
 * Execute: pnpm --filter @motormacete/database exec tsx prisma/seed-dafra-cargo-utilitarios.ts
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

// ─── RIVA CARGO 150cc ────────────────────────────────────────────────────────
// Versão utilitária da Riva 150cc (scooter CVT), lançada em 2012 para o mercado
// de motofrete. Motor, câmbio CVT, óleo e vela são os mesmos da versão street
// (nenhuma fonte indica motor distinto) — as diferenças são bagageiro/suporte de
// baú reforçado e itens Contran (protetor de pernas, antena protetora).

const RIVACARGO150_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'CVT com baú carregado: aceleração suave a frio é ainda mais crítica',
    body: 'A Riva Cargo 150cc usa a mesma transmissão CVT (variador + correia) da Riva 150cc street. Com o baú carregado no dia a dia de entregas, abrir o acelerador bruscamente com motor frio sobrecarrega ainda mais a correia e os roletes do variador do que na versão sem carga. Progrida suavemente nos primeiros 2–3 km, principalmente na primeira saída do dia com o baú já cheio.',
  },
  {
    severity: 'WARN',
    title: 'Bagageiro/suporte de baú reforçado tem limite — não exceda mesmo em dias de pico',
    body: 'O bagageiro reforçado de fábrica da Riva Cargo foi dimensionado para uso comercial, mas tem limite de peso e volume. Em dias de alta demanda (datas comemorativas, picos de aplicativo de entrega), evite empilhar carga acima do baú ou pendurar peso adicional na lateral — isso desequilibra a moto em curvas e sobrecarrega a suspensão traseira além do previsto no projeto.',
  },
  {
    severity: 'OK',
    title: 'Óleo motor e óleo do câmbio CVT: em uso comercial intenso, adiante a troca',
    body: 'A Riva 150cc tem dois compartimentos de óleo (motor 10W30 ~0,8 L e câmbio CVT SAE 90 ~0,1 L, trocados separadamente). Rodando 100–200 km por dia como motoboy, o intervalo padrão de 3.000 km do motor é atingido em 15–30 dias — bem mais rápido que no uso doméstico. Programe a troca por quilometragem no painel, não espere a luz de óleo acender.',
  },
  {
    severity: 'OK',
    title: 'Protetor de pernas, suporte de baú e antena: itens obrigatórios para motofrete regularizado',
    body: 'A Riva Cargo já sai de fábrica com protetor para pernas, suporte para baú e antena protetora — itens exigidos pela Resolução Contran para motos usadas em motofrete. Não remova esses itens mesmo que pareçam "só estética": em uma fiscalização, a ausência deles pode gerar multa e retenção do veículo para quem trabalha com entregas.',
  },
  {
    severity: 'WARN',
    title: 'Calibre os pneus pensando no baú cheio, não só no peso do piloto',
    body: 'A pressão de fábrica da Riva 150cc é calculada para o peso do piloto sozinho. Com o baú cheio de mercadorias na maior parte do turno de trabalho, o pneu traseiro roda subdimensionado se calibrado só para uso solo — aumenta o desgaste irregular e o risco de superaquecimento do pneu em dias quentes. Calibre para a condição "com carga" quando o baú estiver ocupado na maior parte do tempo.',
  },
  {
    severity: 'WARN',
    title: 'Roletes e correia do variador desgastam mais rápido com carga constante',
    body: 'O peso extra do baú carregado a maior parte do dia faz o variador CVT trabalhar sob mais estresse do que na versão street. Antecipe a inspeção dos roletes (originalmente recomendada a cada 8.000 km) para por volta de 6.000 km em uso comercial intenso — ronco crescente na aceleração é o primeiro sinal de desgaste.',
  },
  {
    severity: 'OK',
    title: 'Suspensão traseira reforçada ainda é hidráulica de curso limitado',
    body: '"Reforçada" não significa "sem limite": a suspensão traseira da Riva Cargo tem curso e capacidade de carga específicos para o peso de projeto. Evite deixar a moto estacionada por longos períodos com o baú no limite de peso — isso acelera o desgaste do amortecedor mesmo parado, pela compressão constante da mola.',
  },
]

const RIVACARGO150_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Modelo com produção encerrada há anos: peças de bagageiro/baú são raras',
    body: 'A Riva Cargo 150cc é um modelo com produção encerrada há anos pela DAFRA (não é a marca que fechou — a DAFRA segue operando no Brasil, hoje com foco na parceria SYM). Peças específicas de versão cargo — bagageiro reforçado original, suporte de baú, antena protetora — têm baixíssimo volume de fabricação e são mais difíceis de achar que peças da Riva 150cc street equivalente. Motor, CVT, freios e elétrica compartilham peças com a versão street (ver seed-dafra.ts) e têm reposição genérica mais fácil. Fontes: grupos de motoboys DAFRA no Facebook, Mercado Livre (peças usadas de sucata), lojas especializadas em acessórios/bagageiros para scooter.',
  },
  {
    severity: 'WARN',
    title: 'Roletes e correia CVT: desgaste acelerado por carga constante, não só quilometragem',
    body: 'Diferente do uso doméstico, a Riva Cargo carrega peso extra na maior parte do turno de trabalho — isso desgasta os roletes do variador de forma mais acentuada que a quilometragem sozinha sugeriria. Relatos de motoboys que usam a Riva 150/Cargo apontam troca de roletes e correia bem antes dos 12.000–15.000 km de referência da versão street. Fique atento a ronco crescente e perda de retomada.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedor traseiro perde eficiência mais cedo sob carga comercial constante',
    body: 'Mesmo o amortecedor sendo dimensionado para a função cargo, o uso comercial intenso — baú cheio na maior parte do dia, buracos urbanos repetidos — acelera a perda de gás/eficiência do amortecedor traseiro. Sintoma: a moto "balança" mais na traseira mesmo com o baú vazio, ou bate no batente com carga leve. Inspecione a cada poucos milhares de km em uso de motofrete.',
  },
  {
    severity: 'WARN',
    title: 'Freio traseiro a tambor: ajuste mais frequente com o peso extra do baú',
    body: 'O peso adicional do baú carregado aumenta a demanda sobre o freio traseiro a tambor, desregulando o cabo e desgastando a lona mais rápido que na versão sem carga. Ajuste o cabo de freio com mais frequência (verifique a folga a cada poucas semanas de uso comercial) e antecipe a inspeção da lona.',
  },
  {
    severity: 'WARN',
    title: 'Fixação do suporte de baú pode afrouxar com vibração e buracos',
    body: 'O suporte de baú, mesmo reforçado, é fixado por parafusos que sofrem vibração constante em uso urbano intenso — principalmente em ruas com buracos, típicas de rotas de entrega. Inspecione o aperto dos parafusos do suporte regularmente; um suporte solto pode causar perda de carga em movimento ou dano à carroceria/chassi.',
  },
]

const RIVACARGO150_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Riva Cargo 150cc: intervalos adiantados para uso comercial intenso (motoboy)',
    body: '1.000 km — Troca de óleo motor inicial (10W30 semissintético, ~0,8 L). | 2.500 km — Troca de óleo motor rotineira (adiantada da referência de 3.000 km da versão street pelo uso comercial constante). | 3.000 km — Inspecionar fixação do suporte de baú/bagageiro (parafusos). | 4.000 km — Limpar filtro de ar (mais frequente por poeira/fuligem urbana em rotas de entrega). | 4.500 km — Troca de óleo câmbio CVT (SAE 90, ~0,1 L). | 6.000 km — Vela NGK CPR6EA-9. Inspecionar roletes do variador e correia CVT. | 8.000 km — Ajustar/inspecionar lona de freio traseiro (tambor). | 9.000 km — Kit de roletes do variador (se desgastados). | 12.000 km — Correia CVT (trocar) + fluido de freio DOT 4 (18 meses). | 15.000 km — Filtro de ar (trocar). | 25.000 km — Folga de válvulas. Rolamentos de roda.',
  },
]

// ─── SPEED CARGO 150 ─────────────────────────────────────────────────────────
// Versão utilitária da Speed 150 (naked câmbio manual), lançada em 2011 para
// motofrete. Confirmado por release oficial (motorede.com.br): motor OHV 149,4cc
// a ar, 11,15 cv @ 8.500 rpm, 1,31 kgf.m @ 7.000 rpm, tanque 15,7 L (0,8 L reserva),
// rodas de liga leve 18" (a Speed 150 street usa aro 17), amortecedores dianteiro/
// traseiro reforçados, cavalete central e chassi reforçados, baú de fábrica até 20 kg.

const SPEEDCARGO150_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor OHV 149,4cc: deixe girar acima de 5.000 rpm 1x/semana mesmo em rota de entrega',
    body: 'A Speed Cargo compartilha o motor da Speed 150 street (149,4cc, OHV, a ar, 11,15 cv @ 8.500 rpm). Rotina de entrega urbana tende a manter o motor em baixa rotação e marcha lenta constante — isso favorece acúmulo de carbono nas válvulas ainda mais que no uso comum. Uma vez por semana, em local seguro, acelere até a faixa alta de rotação por alguns segundos para "limpar" a câmara de combustão.',
  },
  {
    severity: 'WARN',
    title: 'Baú de fábrica: limite de 20 kg — não exceda mesmo em dias de pico de aplicativo',
    body: 'O baú de fábrica opcional da Speed Cargo tem capacidade de até 20 kg. Em dias de alta demanda de entregas, é tentador empilhar mais peso — mas isso sobrecarrega os amortecedores reforçados e o chassi além do previsto no projeto, mesmo eles sendo dimensionados para uso comercial. Distribua a carga em múltiplas viagens quando o volume ultrapassar o limite do baú.',
  },
  {
    severity: 'WARN',
    title: 'Calibre os pneus 18" pensando no baú cheio, não só no piloto sozinho',
    body: 'A Speed Cargo usa rodas de liga leve 18" com pneu 2.75-18 na frente e 90/90-18 atrás — medida diferente da Speed 150 street (aro 17). Com o baú carregado na maior parte do turno, calibre o pneu traseiro para a condição "com carga" (alguns PSI a mais que a calibragem solo). Pneu subcalibrado sob peso extra esquenta mais e desgasta de forma irregular.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W40: com rodagem diária de motoboy, o intervalo de 3.000 km chega rápido',
    body: 'Rodando 100–200 km por dia em entregas, o intervalo de troca de óleo motor (10W40 semissintético, ~1,0 L) chega em 15–20 dias — bem mais rápido que o uso de fim de semana. Programe a troca pelo hodômetro, não pelo calendário, e mantenha o registro de quilometragem visível para não perder a data.',
  },
  {
    severity: 'OK',
    title: 'Amortecedores e cavalete reforçados: protegem contra o uso comercial, mas não são eternos',
    body: 'A Speed Cargo sai de fábrica com amortecedores dianteiro/traseiro e cavalete central reforçados especificamente para suportar carga extra e o peso do baú. Isso reduz o desgaste comparado a colocar um baú comum na versão street, mas não elimina a necessidade de inspeção — são peças reforçadas, não indestrutíveis.',
  },
  {
    severity: 'WARN',
    title: 'Apoie o cavalete central sempre em piso firme com o baú carregado',
    body: 'Mesmo reforçado, o cavalete central da Speed Cargo foi pensado para piso firme e nivelado. Com o baú cheio, o centro de gravidade sobe e desloca para trás — em piso mole, inclinado ou irregular (comum em pontos de entrega improvisados), o risco de tombamento aumenta bastante. Evite estacionar com carga total em terra solta ou ladeiras acentuadas.',
  },
  {
    severity: 'OK',
    title: 'Protetor de pernas e antena: itens Contran de fábrica — não remova para "aliviar peso"',
    body: 'A Speed Cargo já sai equipada com os itens exigidos pela Resolução Contran para motofrete (protetor de pernas, antena protetora, suporte de baú). Alguns proprietários removem esses itens pensando em ganhar leveza ou estética — além de ser exigência legal para quem trabalha com entregas, eles protegem o piloto em caso de tombamento com carga.',
  },
]

const SPEEDCARGO150_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Modelo com produção encerrada há anos: baú e suporte de fábrica são difíceis de repor',
    body: 'A Speed Cargo 150 é um modelo com produção encerrada há anos (lançada em 2011, descontinuada junto com o fim de vida da Speed 150 street) — isso não significa que a DAFRA "fechou": a marca segue operando no Brasil, hoje com foco na parceria SYM. O baú de fábrica original, o suporte reforçado e os amortecedores específicos de cargo têm reposição escassa por baixo volume de vendas. Motor, carburador, CDI e freios compartilham peças com a Speed 150 street (ver seed-dafra.ts) e têm reposição genérica mais fácil.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedores "reforçados" também têm vida útil curta sob uso comercial intenso',
    body: 'Mesmo sendo a versão reforçada de fábrica, relatos de proprietários da linha Speed (incluindo a versão street) mencionam amortecedores traseiros com vida útil curta sob uso intenso — alguns casos de poucos meses de uso pesado antes de perder eficiência. Na versão Cargo, o peso constante do baú acelera ainda mais esse desgaste. Inspecione regularmente por vazamento de óleo e perda de amortecimento (moto "balançando" após buracos).',
  },
  {
    severity: 'WARN',
    title: 'Freio traseiro a tambor: desgaste mais rápido com peso extra do baú carregado',
    body: 'O freio traseiro da Speed Cargo é a tambor (acionamento mecânico), o mesmo sistema da versão street. Com o peso adicional do baú presente na maior parte do turno de trabalho, a lona desgasta mais rápido e o cabo desregula com mais frequência — pedal "fundo" antes de frear é sinal de que o ajuste está atrasado.',
  },
  {
    severity: 'WARN',
    title: 'Carburador: engasgo por uso constante em marcha lenta/baixa rotação no trânsito de entrega',
    body: 'A rotina de entrega urbana mantém o motor em marcha lenta e baixa rotação por longos períodos (parado em semáforo, buscando endereço, esperando o cliente). Isso favorece acúmulo de resíduos no carburador mais rápido que no uso normal, causando engasgo na retomada. Limpeza do carburador (jets e diafragma) deve ser antecipada em uso comercial intenso.',
  },
  {
    severity: 'WARN',
    title: 'Fixação do baú: parafusos afrouxam com vibração e buracos — inspecione com frequência',
    body: 'O suporte do baú de fábrica é fixado ao bagageiro reforçado por parafusos que sofrem vibração constante, especialmente em ruas malconservadas típicas de rotas de entrega. Um baú mal fixado pode se soltar em movimento, com risco de perda de mercadoria ou acidente. Verifique o aperto dos parafusos do suporte a cada poucas semanas de uso intenso.',
  },
  {
    severity: 'DANGER',
    title: 'CDI e sistema elétrico: mesma limitação de reposição da Speed 150 street',
    body: 'A Speed Cargo usa o mesmo sistema de ignição CDI da Speed 150 street — item crítico sem reposição nacional garantida após o fim da produção destes modelos legados pela DAFRA. Para quem depende da moto para trabalhar, isso é ainda mais crítico: teste a centelha e o carregamento da bateria regularmente, e mantenha contato com grupos de motoboys DAFRA para indicação de CDI genérica compatível antes que o problema pare a moto em um dia de trabalho.',
  },
]

const SPEEDCARGO150_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Speed Cargo 150: intervalos adiantados para uso comercial intenso (motoboy)',
    body: '600 km — Lubrificar corrente de transmissão (adiantado dos 800 km da versão street pelo uso diário intenso). | 2.500 km — Troca de óleo motor (10W40 semissintético, ~1,0 L) — adiantada dos 3.000 km de referência. | 3.000 km — Inspecionar fixação do suporte de baú (parafusos). | 4.000 km — Limpar filtro de ar. Verificar tensão da corrente. | 8.000 km — Vela NGK CR8E. Limpar carburador (jets e diafragma). Inspecionar pastilhas de freio dianteiro. | 10.000 km — Lona de freio traseiro (tambor). Inspecionar amortecedores reforçados (vazamento e batente). | 12.000 km — Fluido DOT 4 (freio dianteiro, a cada 20 meses). | 15.000 km — Kit relação (corrente + pinhão + coroa) — adiantado dos 20.000 km de referência. | 25.000 km — Folga de válvulas.',
  },
]

// ─── BLOCKS ──────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'RIVA Cargo 150cc',
    yearFrom: 2012,
    yearTo: 2015,
    MACETES: RIVACARGO150_MACETES,
    PROBLEMAS: RIVACARGO150_PROBLEMAS,
    MANUTENCAO: RIVACARGO150_MANUTENCAO,
  },
  {
    modelName: 'SPEED Cargo 150',
    yearFrom: 2011,
    yearTo: 2014,
    MACETES: SPEEDCARGO150_MACETES,
    PROBLEMAS: SPEEDCARGO150_PROBLEMAS,
    MANUTENCAO: SPEEDCARGO150_MANUTENCAO,
  },
]

// ─── TIRE PRESSURES ──────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'RIVA Cargo 150cc',
    yearFrom: 2012,
    yearTo: 2015,
    tireSize: '90/90-12 (F) · 100/90-10 (R)',
    frontPsi: 30,
    rearPsi: 33,
    frontPsiLoad: 30,
    rearPsiLoad: 37,
    notes: 'Mesma medida de pneu da Riva 150cc street. Pressão "com carga" estimada para baú cheio na maior parte do turno — confira a etiqueta do chassi/manual para o valor exato. Calibre sempre com pneu frio.',
  },
  {
    modelName: 'SPEED Cargo 150',
    yearFrom: 2011,
    yearTo: 2014,
    tireSize: '2.75-18 42P (F) · 90/90-18 57P (R)',
    frontPsi: 26,
    rearPsi: 30,
    frontPsiLoad: 28,
    rearPsiLoad: 36,
    notes: 'Rodas de liga leve 18" (diferente da Speed 150 street, que usa aro 17). Pressão "com carga" estimada para baú de até 20kg cheio na maior parte do turno — confira a etiqueta do chassi/manual para o valor exato. Calibre sempre com pneu frio.',
  },
]

// ─── MAINTENANCE ITEMS ───────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // RIVA CARGO 150cc
  { modelName: 'RIVA Cargo 150cc', yearFrom: 2012, yearTo: 2015, component: 'Óleo motor (10W30 semissintético, ~0,8 L)', intervalKm: 2500, intervalMonths: 3, notes: 'Adiantado dos 3.000 km da versão street pelo uso comercial intenso (100–200 km/dia)', priority: 'HIGH', order: 1 },
  { modelName: 'RIVA Cargo 150cc', yearFrom: 2012, yearTo: 2015, component: 'Inspecionar fixação do suporte de baú/bagageiro', intervalKm: 3000, intervalMonths: null, notes: 'Parafusos afrouxam com vibração e buracos em rotas de entrega', priority: 'HIGH', order: 2 },
  { modelName: 'RIVA Cargo 150cc', yearFrom: 2012, yearTo: 2015, component: 'Limpar filtro de ar', intervalKm: 4000, intervalMonths: null, notes: 'Mais frequente que a versão street pela exposição urbana constante', priority: 'MEDIUM', order: 3 },
  { modelName: 'RIVA Cargo 150cc', yearFrom: 2012, yearTo: 2015, component: 'Óleo câmbio CVT (SAE 90, ~0,1 L)', intervalKm: 4500, intervalMonths: null, notes: 'Bujão de drenagem no bloco do câmbio — lado direito', priority: 'HIGH', order: 4 },
  { modelName: 'RIVA Cargo 150cc', yearFrom: 2012, yearTo: 2015, component: 'Vela NGK CPR6EA-9', intervalKm: 6000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'RIVA Cargo 150cc', yearFrom: 2012, yearTo: 2015, component: 'Inspecionar roletes do variador e correia CVT', intervalKm: 6000, intervalMonths: null, notes: 'Antecipado dos 8.000 km da versão street — carga constante desgasta mais rápido', priority: 'HIGH', order: 6 },
  { modelName: 'RIVA Cargo 150cc', yearFrom: 2012, yearTo: 2015, component: 'Ajustar/inspecionar lona de freio traseiro (tambor)', intervalKm: 8000, intervalMonths: null, notes: 'Peso extra do baú desgasta a lona mais rápido', priority: 'HIGH', order: 7 },
  { modelName: 'RIVA Cargo 150cc', yearFrom: 2012, yearTo: 2015, component: 'Kit de roletes do variador (se desgastados)', intervalKm: 9000, intervalMonths: null, notes: 'Antecipado dos 12.000 km da versão street', priority: 'HIGH', order: 8 },
  { modelName: 'RIVA Cargo 150cc', yearFrom: 2012, yearTo: 2015, component: 'Correia CVT (trocar)', intervalKm: 12000, intervalMonths: null, notes: 'Antecipado dos 15.000 km da versão street', priority: 'HIGH', order: 9 },
  { modelName: 'RIVA Cargo 150cc', yearFrom: 2012, yearTo: 2015, component: 'Fluido de freio DOT 4', intervalKm: 12000, intervalMonths: 18, notes: null, priority: 'HIGH', order: 10 },
  { modelName: 'RIVA Cargo 150cc', yearFrom: 2012, yearTo: 2015, component: 'Filtro de ar (trocar)', intervalKm: 15000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 11 },
  { modelName: 'RIVA Cargo 150cc', yearFrom: 2012, yearTo: 2015, component: 'Folga de válvulas', intervalKm: 25000, intervalMonths: null, notes: null, priority: 'HIGH', order: 12 },
  { modelName: 'RIVA Cargo 150cc', yearFrom: 2012, yearTo: 2015, component: 'Rolamentos de roda', intervalKm: 25000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 13 },

  // SPEED CARGO 150
  { modelName: 'SPEED Cargo 150', yearFrom: 2011, yearTo: 2014, component: 'Lubrificar corrente de transmissão', intervalKm: 600, intervalMonths: null, notes: 'Adiantado dos 800 km da versão street pelo uso diário intenso', priority: 'HIGH', order: 1 },
  { modelName: 'SPEED Cargo 150', yearFrom: 2011, yearTo: 2014, component: 'Óleo motor (10W40 semissintético, ~1,0 L)', intervalKm: 2500, intervalMonths: 3, notes: 'Adiantado dos 3.000 km da versão street pelo uso comercial intenso (100–200 km/dia)', priority: 'HIGH', order: 2 },
  { modelName: 'SPEED Cargo 150', yearFrom: 2011, yearTo: 2014, component: 'Inspecionar fixação do suporte do baú', intervalKm: 3000, intervalMonths: null, notes: 'Parafusos afrouxam com vibração e buracos em rotas de entrega', priority: 'HIGH', order: 3 },
  { modelName: 'SPEED Cargo 150', yearFrom: 2011, yearTo: 2014, component: 'Limpar filtro de ar', intervalKm: 4000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'SPEED Cargo 150', yearFrom: 2011, yearTo: 2014, component: 'Verificar tensão da corrente', intervalKm: 4000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 5 },
  { modelName: 'SPEED Cargo 150', yearFrom: 2011, yearTo: 2014, component: 'Vela NGK CR8E', intervalKm: 8000, intervalMonths: null, notes: 'Antecipado dos 10.000 km da versão street', priority: 'HIGH', order: 6 },
  { modelName: 'SPEED Cargo 150', yearFrom: 2011, yearTo: 2014, component: 'Limpar carburador (jets e diafragma)', intervalKm: 8000, intervalMonths: null, notes: 'Uso constante em marcha lenta/baixa rotação acumula resíduos mais rápido', priority: 'HIGH', order: 7 },
  { modelName: 'SPEED Cargo 150', yearFrom: 2011, yearTo: 2014, component: 'Inspecionar pastilhas de freio dianteiro', intervalKm: 8000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 8 },
  { modelName: 'SPEED Cargo 150', yearFrom: 2011, yearTo: 2014, component: 'Lona de freio traseiro (tambor)', intervalKm: 10000, intervalMonths: null, notes: 'Antecipado dos 15.000 km da versão street — peso extra do baú acelera desgaste', priority: 'HIGH', order: 9 },
  { modelName: 'SPEED Cargo 150', yearFrom: 2011, yearTo: 2014, component: 'Inspecionar amortecedores reforçados (vazamento e batente)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'HIGH', order: 10 },
  { modelName: 'SPEED Cargo 150', yearFrom: 2011, yearTo: 2014, component: 'Fluido DOT 4 (freio dianteiro)', intervalKm: 12000, intervalMonths: 20, notes: null, priority: 'HIGH', order: 11 },
  { modelName: 'SPEED Cargo 150', yearFrom: 2011, yearTo: 2014, component: 'Kit relação (corrente + pinhão + coroa)', intervalKm: 15000, intervalMonths: null, notes: 'Antecipado dos 20.000 km da versão street', priority: 'HIGH', order: 12 },
  { modelName: 'SPEED Cargo 150', yearFrom: 2011, yearTo: 2014, component: 'Folga de válvulas', intervalKm: 25000, intervalMonths: null, notes: null, priority: 'HIGH', order: 13 },
]

// ─── RUNNER ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed DAFRA Cargo/Utilitários iniciado...')

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

  console.log('✅ Seed DAFRA Cargo/Utilitários concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
