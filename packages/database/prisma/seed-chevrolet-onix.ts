/**
 * Seed Chevrolet Onix — macetes, problemas, manutenção e calibragem de pneus
 * Cobre duas gerações e dois nameplates:
 *  - "Onix" geração 1 (2012-2019, hatch, motor 1.0/1.4 8V SPE4 aspirado,
 *    trims Joy/LS/LT/LTZ/Effect/Activ)
 *  - "Onix" geração 2 (2019+, hatch, motor 1.0 12V Turbo, trims
 *    LT/LTZ/RS/Premier/Eco) — mesma nameplate "Onix" na FIPE
 *  - "Onix Plus" geração 2 (2019+, sedan, motor 1.0 12V Turbo, trims
 *    LT/LTZ/Premier/Midnight)
 * Onix é o carro mais vendido do Brasil há vários anos seguidos.
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-onix
 *
 * Fontes: chevrolet.com.br, vrum.com.br, mobiauto.com.br, mercadoveiculos.com,
 *         suaoficinaonline.com.br, gruposentinela.com.br, reclameaqui.com.br,
 *         automaistv.com.br, seminovos.localiza.com
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
  sparePsi: number | null
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

// ─── Onix geração 1 (2012-2019, hatch, 1.0/1.4 8V SPE4 aspirado) ──────────────

const MACETES_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 1.0/1.4 SPE4: peças baratas e disponíveis em qualquer oficina',
    body: 'O motor da família "SPE4" (também chamado Family 0) equipa também Celta, Prisma, Corsa, Agile e Classic — é um dos blocos mais produzidos da história da GM no Brasil. Isso significa peças de reposição (bomba d\'água, correias auxiliares, sensores, coxins) fartas e baratas em qualquer oficina independente, sem depender de concessionária.',
  },
  {
    severity: 'WARN',
    title: 'Pedal de freio mais "duro" em subidas e curvas com a versão 1.0: não é defeito, é limitação de projeto',
    body: 'O servo-freio depende do vácuo gerado pelo motor, e o 1.0 tem reserva de potência menor — em subidas, curvas ou com ar-condicionado ligado, o pedal pode ficar sensivelmente mais pesado. Antecipe a frenagem e reduza a marcha antes de descidas/curvas fechadas em vez de confiar só no pedal. Se o pedal ficar duro mesmo em piso plano e sem exigência do motor, aí sim vale investigar o servo-freio.',
  },
  {
    severity: 'OK',
    title: 'Motor a corrente de comando: sem troca programada, mas óleo em dia evita esticamento prematuro',
    body: 'Diferente da geração Turbo mais recente, o motor aspirado 1.0/1.4 desta geração usa corrente de comando (não correia banhada a óleo) — item de vida útil longa, sem intervalo fixo de substituição. Ainda assim, óleo trocado com atraso ou de qualidade duvidosa acelera o desgaste da corrente e das guias/tensionador. Mantenha o intervalo de troca de óleo rigorosamente em dia.',
  },
  {
    severity: 'OK',
    title: 'Proteja capô e paralamas com película — pintura desta geração é fina',
    body: 'Queixa recorrente de proprietários é o descascamento de pintura em capô, paralamas e caixas de ar, mesmo sem batida. Se pretende manter o carro por muitos anos, aplicar PPF (película de proteção) ou pelo menos evitar lavagem com escova dura nessas áreas reduz bastante o desgaste visual.',
  },
  {
    severity: 'OK',
    title: 'Ar-condicionado fraco? Cheque o compressor antes de trocar o gás',
    body: 'Reclamação comum é ar-condicionado que demora para gelar ou nunca esfria por completo. Na maioria dos casos relatados o problema está no compressor, não apenas na carga de gás — se a recarga não resolver definitivamente, peça teste de pressão e de embreagem do compressor antes de gastar com recargas repetidas.',
  },
]

const PROBLEMAS_G1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Pedal de freio "duro" em subidas e curvas, especialmente na versão 1.0',
    body: 'O servo-freio não consegue gerar força suficiente quando o motor 1.0, menos potente, está sob esforço (subida, curva, ar-condicionado ligado) — o pedal fica perceptivelmente mais pesado nesses momentos. Não é falha de peça na maioria dos casos, mas se o comportamento aparecer também em piso plano sem exigência do motor, vale diagnóstico do servo-freio e do sistema de vácuo.',
  },
  {
    severity: 'WARN',
    title: 'Ar-condicionado com pouca eficiência — compressor é o suspeito mais comum',
    body: 'Ar-condicionado fraco ou que não esfria por completo é queixa frequente. Antes de recarregar gás repetidamente, peça verificação do compressor — é o componente mais citado nos relatos de proprietários como origem do problema.',
  },
  {
    severity: 'WARN',
    title: 'Ruídos internos na porta e coluna do motorista',
    body: 'Vários donos relatam falta de silêncio interno, com ruído vindo da porta e da coluna do lado do motorista — geralmente ligado a vedação/borrachas de porta ressecadas ou mal encaixadas. Reaperto de guarnições e lubrificação das borrachas costuma reduzir bastante o ruído; em casos persistentes, vale trocar a borracha de vedação.',
  },
  {
    severity: 'WARN',
    title: 'Pintura descascando em capô, paralamas e caixas de ar',
    body: 'Descascamento de pintura nessas áreas específicas é queixa recorrente mesmo em carros sem histórico de batida. Costuma ser mais estético que estrutural, mas expõe a chapa à ferrugem se não tratado — lixamento localizado e retoque evitam evolução para corrosão.',
  },
  {
    severity: 'WARN',
    title: 'Forração do teto ondulada e falhas de pareamento no Bluetooth da central multimídia',
    body: 'Relatos menos frequentes, mas recorrentes, incluem forração do teto ondulando com o tempo/calor e instabilidade no Bluetooth da multimídia (desconexões, falha ao parear). Não são problemas mecânicos nem de segurança, mas valem checagem na revisão se incomodarem no dia a dia.',
  },
]

const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Onix 1.0/1.4 SPE4 aspirado (Chevrolet + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo. | 10.000 km — Inspeção de freios (atenção ao pedal duro em subida na versão 1.0), suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Velas de ignição. | 40.000 km — Fluido de freio DOT 3/4. | 60.000 km — Fluido de arrefecimento. | Corrente de comando não tem troca programada — depende de óleo em dia. | Rodízio de pneus a cada 10.000 km.',
  },
]

// ─── Onix geração 2 hatch (2019+, motor 1.0 12V Turbo) ────────────────────────

const MACETES_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Use sempre óleo com certificação Dexos no motor Turbo — a correia dentada é banhada a óleo',
    body: 'O motor 1.0 12V Turbo desta geração usa correia dentada banhada a óleo dentro do cárter (não é correia externa como em motores mais antigos). Óleo fora da especificação Dexos ataca a borracha da correia e acelera seu ressecamento — use exclusivamente óleo com certificação Dexos na viscosidade indicada pelo manual, mesmo que custe um pouco mais em uma troca "genérica" fora da rede autorizada.',
  },
  {
    severity: 'OK',
    title: 'Garantia estendida da correia banhada a óleo: 240 mil km, mas só com manutenção 100% documentada',
    body: 'Em 2024 a Chevrolet estendeu a garantia da correia dentada banhada a óleo de 100 mil para 240 mil km — porém a cobertura exige que toda a manutenção tenha sido feita em concessionária autorizada, com óleo ACDelco Dexos. Se você faz manutenção em oficina independente, guarde notas fiscais detalhando o óleo usado; sem isso, negativas de garantia são comuns em caso de quebra da correia.',
  },
  {
    severity: 'WARN',
    title: 'Não atrase a troca de óleo do motor Turbo — é o gatilho nº1 da quebra prematura da correia',
    body: 'Atraso na troca de óleo é apontado como principal fator de aceleração do desgaste da correia banhada a óleo, junto com uso severo (trânsito pesado, combustível adulterado) e superaquecimento do motor. Respeite rigorosamente o intervalo de 10.000 km/12 meses — em uso severo (trânsito parado todo dia, cidades com combustível de qualidade duvidosa), considere antecipar para 7.500-8.000 km.',
  },
  {
    severity: 'OK',
    title: 'Peças mecânicas compartilhadas com o Onix Plus sedan — mesma plataforma e motor',
    body: 'O Onix hatch geração 2 e o Onix Plus sedan compartilham motor 1.0 Turbo, câmbio e boa parte da suspensão (plataforma GEM da GM). Em oficina independente, peças cadastradas para "Onix Plus" costumam servir no hatch e vice-versa — útil quando falta cadastro específico do seu modelo no sistema da loja de autopeças.',
  },
  {
    severity: 'OK',
    title: 'Câmbio automático: deixe o carro parar completamente antes de trocar entre D e R',
    body: 'Assim como em outros automáticos da GM, trocar de marcha (D/R) com o carro ainda em movimento, mesmo que lentamente, acelera o desgaste dos componentes internos de engate. Aguarde a parada completa antes de trocar — hábito simples que preserva o câmbio a longo prazo.',
  },
]

const PROBLEMAS_G2: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Quebra prematura da correia dentada banhada a óleo, mesmo com revisões em dia',
    body: 'É a reclamação mais grave e mais frequente desta geração: a correia dentada banhada a óleo se deteriora, resseca e quebra bem antes do esperado — há relatos de quebra com menos de 50 mil km mesmo em carros com revisões supostamente em dia. A causa raiz mais citada é óleo fora da especificação Dexos usado em alguma troca ao longo da vida do carro. Pedaços da correia deteriorada podem entupir a bomba ou o coador de óleo, travando o motor, e a quebra em si pode causar colisão entre pistão e válvulas — dano estrutural caro (cabeçote ou motor completo). Use sempre óleo Dexos e não ignore ruído anormal vindo da região da correia.',
  },
  {
    severity: 'WARN',
    title: 'Perda repentina de potência ligada a válvulas de admissão/escape sem tratamento térmico adequado',
    body: 'Alguns lotes apresentaram perda súbita de potência causada por válvulas de admissão e escape sem tratamento térmico suficiente para as temperaturas de trabalho do motor Turbo — a GM tratou o caso substituindo as válvulas em unidades afetadas. Se notar perda de potência inexplicada, principalmente com poucos km rodados, verifique junto à concessionária se o chassi do seu carro está incluído em alguma campanha de reparo.',
  },
  {
    severity: 'WARN',
    title: 'Ar-condicionado fraco e ruídos internos — mesmos pontos fracos da geração anterior',
    body: 'Ar-condicionado que demora para gelar (compressor) e ruídos internos vindos de porta/coluna do motorista continuam entre as queixas mais citadas por proprietários também nesta geração — os mesmos cuidados de verificação de compressor e vedações de porta se aplicam.',
  },
]

const MANUTENCAO_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Onix 1.0 Turbo geração 2 (Chevrolet + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (Dexos, viscosidade do manual, sem exceção) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Velas de ignição (motor turbo pede atenção redobrada). | 40.000 km — Fluido de freio DOT 3/4. | 60.000 km — Fluido de arrefecimento. | 100.000 km — Correia dentada banhada a óleo: mesmo com garantia estendida a 240.000 km em concessionária, considere inspeção preventiva neste km se notar qualquer ruído anormal. | 60.000-80.000 km — Óleo do câmbio automático (versões AT). | Rodízio de pneus a cada 10.000 km.',
  },
]

// ─── Onix Plus (sedan, 2019+, motor 1.0 12V Turbo) ────────────────────────────

const MACETES_PLUS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Onix Plus compartilha mecânica com o Onix hatch — mesmas regras de óleo Dexos e correia banhada a óleo',
    body: 'O Onix Plus usa o mesmo motor 1.0 12V Turbo, câmbio e boa parte da suspensão do Onix hatch geração 2. Todo cuidado com óleo com certificação Dexos e atenção à correia dentada banhada a óleo do hatch se aplica integralmente ao sedan — não existe diferença de manutenção entre eles além do porta-malas e itens de carroceria.',
  },
  {
    severity: 'OK',
    title: 'Porta-malas maior: ajuste a pressão traseira quando carregar peso extra com frequência',
    body: 'O sedan tem porta-malas maior que o hatch, e uso frequente com bagagem pesada (viagens, transporte de mercadorias) muda o comportamento da traseira. Verifique o valor de carga máxima na etiqueta da coluna da porta e aumente a pressão traseira quando rodar com o porta-malas cheio — melhora estabilidade e reduz desgaste irregular dos pneus traseiros.',
  },
  {
    severity: 'OK',
    title: 'Garantia estendida da correia (240 mil km) exige manutenção documentada em rede autorizada',
    body: 'Assim como no hatch, a extensão de garantia da correia dentada banhada a óleo para 240 mil km só vale com manutenção 100% em concessionária autorizada e óleo ACDelco Dexos. Guarde as notas fiscais de troca de óleo mesmo que você faça parte da manutenção em oficina independente, para não perder direito de reclamar em caso de problema coberto.',
  },
  {
    severity: 'WARN',
    title: 'Não atrase a troca de óleo — mesmo risco de correia do hatch se aplica ao sedan',
    body: 'O motor Turbo do Onix Plus tem exatamente o mesmo ponto de atenção do hatch: atraso na troca de óleo e uso de óleo fora da especificação Dexos são os principais fatores associados à quebra prematura da correia banhada a óleo. Respeite o intervalo de 10.000 km/12 meses à risca.',
  },
]

const PROBLEMAS_PLUS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Quebra prematura da correia dentada banhada a óleo — mesmo defeito crônico do hatch',
    body: 'Por compartilhar o motor 1.0 Turbo com o hatch, o Onix Plus sedan está sujeito ao mesmo problema crônico de quebra prematura da correia dentada banhada a óleo, geralmente ligado a óleo fora da especificação Dexos usado em algum momento da vida do carro. As consequências são as mesmas: pedaços de correia podem travar a bomba de óleo, e a quebra em si pode danificar pistões e válvulas. Use sempre óleo Dexos e não ignore ruídos anormais vindos da dianteira do motor.',
  },
  {
    severity: 'WARN',
    title: 'Perda de potência por válvulas sem tratamento térmico adequado',
    body: 'Mesmo defeito reportado no hatch — válvulas de admissão/escape sem tratamento térmico suficiente em alguns lotes, causando perda repentina de potência. Verifique com a concessionária se seu chassi está coberto por campanha de reparo caso note esse sintoma.',
  },
  {
    severity: 'WARN',
    title: 'Ar-condicionado fraco e ruídos internos de porta/coluna',
    body: 'Mesmas queixas recorrentes do restante da família Onix: ar-condicionado que demora para gelar (verifique o compressor) e ruído vindo da porta/coluna do motorista, geralmente ligado a vedação.',
  },
]

const MANUTENCAO_PLUS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Onix Plus 1.0 Turbo (Chevrolet + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (Dexos, viscosidade do manual, sem exceção) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Velas de ignição. | 40.000 km — Fluido de freio DOT 3/4. | 60.000 km — Fluido de arrefecimento. | 100.000 km — Correia dentada banhada a óleo: inspeção preventiva recomendada mesmo com garantia estendida a 240.000 km em concessionária. | 60.000-80.000 km — Óleo do câmbio automático (versões AT). | Rodízio de pneus a cada 10.000 km — reforce pressão traseira com porta-malas carregado.',
  },
]

// ─── Tire Pressures ────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Onix',
    yearFrom: 2012,
    yearTo: 2019,
    tireSize: '175/65 R14 · 185/65 R15 (LTZ/Activ)',
    frontPsi: 32,
    rearPsi: 30,
    frontPsiLoad: 32,
    rearPsiLoad: 33,
    sparePsi: 60,
    notes: 'Valores de referência para uso normal com pneus frios. Confirme o valor exato na etiqueta da coluna da porta do motorista — pode variar ligeiramente por versão/aro.',
  },
  {
    modelName: 'Onix',
    yearFrom: 2019,
    yearTo: null,
    tireSize: '175/70 R14 · 185/65 R15 · 195/55 R16 (LTZ) · 215/50 R17 (RS/Premier)',
    frontPsi: 32,
    rearPsi: 30,
    frontPsiLoad: 33,
    rearPsiLoad: 33,
    sparePsi: 60,
    notes: 'Versões com aro maior (RS/Premier) tendem a pedir pressão levemente mais alta (33/31 PSI). Confirme sempre na etiqueta da coluna da porta do motorista, com pneus frios.',
  },
  {
    modelName: 'Onix Plus',
    yearFrom: 2019,
    yearTo: null,
    tireSize: '185/65 R15 · 195/55 R16 (LTZ) · 215/50 R17 (Premier/Midnight)',
    frontPsi: 32,
    rearPsi: 30,
    frontPsiLoad: 33,
    rearPsiLoad: 35,
    sparePsi: 60,
    notes: 'Pressão traseira sobe com porta-malas carregado — reforce quando rodar com bagagem pesada com frequência. Confirme o valor exato na etiqueta da coluna da porta do motorista.',
  },
]

// ─── Maintenance Items ──────────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // Geração 1 (2012-2019, aspirado)
  { modelName: 'Onix', yearFrom: 2012, yearTo: 2019, component: 'Óleo do motor 1.0/1.4 SPE4', intervalKm: 10000, intervalMonths: 12, notes: 'Sem exigência de Dexos — siga a viscosidade do manual.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Onix', yearFrom: 2012, yearTo: 2019, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Onix', yearFrom: 2012, yearTo: 2019, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em cidades com muita poeira/poluição.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Onix', yearFrom: 2012, yearTo: 2019, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Onix', yearFrom: 2012, yearTo: 2019, component: 'Velas de ignição', intervalKm: 40000, intervalMonths: null, notes: 'Motor aspirado — vela convencional.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Onix', yearFrom: 2012, yearTo: 2019, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'Onix', yearFrom: 2012, yearTo: 2019, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Chevrolet.', priority: 'HIGH', order: 6 },
  { modelName: 'Onix', yearFrom: 2012, yearTo: 2019, component: 'Corrente de comando — inspeção geral', intervalKm: 60000, intervalMonths: null, notes: 'Sem troca programada, mas óleo em dia evita esticamento prematuro.', priority: 'LOW', order: 7 },
  { modelName: 'Onix', yearFrom: 2012, yearTo: 2019, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 8 },

  // Geração 2 hatch (2019+, Turbo)
  { modelName: 'Onix', yearFrom: 2019, yearTo: null, component: 'Óleo do motor 1.0 Turbo (Dexos obrigatório)', intervalKm: 10000, intervalMonths: 12, notes: 'Óleo fora da especificação Dexos é o principal fator de risco de quebra da correia banhada a óleo. Guarde nota fiscal.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Onix', yearFrom: 2019, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Onix', yearFrom: 2019, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em cidades com muita poeira/poluição.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Onix', yearFrom: 2019, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Onix', yearFrom: 2019, yearTo: null, component: 'Velas de ignição', intervalKm: 40000, intervalMonths: null, notes: 'Motor turbo pede atenção redobrada ao intervalo.', priority: 'HIGH', order: 4 },
  { modelName: 'Onix', yearFrom: 2019, yearTo: null, component: 'Correia dentada banhada a óleo — inspeção/preventiva', intervalKm: 100000, intervalMonths: null, notes: 'Ponto de falha mais grave da geração. Garantia estendida a 240.000 km só em concessionária com óleo Dexos documentado.', priority: 'CRITICAL', order: 5 },
  { modelName: 'Onix', yearFrom: 2019, yearTo: null, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'Onix', yearFrom: 2019, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Chevrolet.', priority: 'HIGH', order: 7 },
  { modelName: 'Onix', yearFrom: 2019, yearTo: null, component: 'Óleo do câmbio automático (versões AT)', intervalKm: 60000, intervalMonths: 48, notes: 'Não é vitalício em uso severo.', priority: 'HIGH', order: 8 },
  { modelName: 'Onix', yearFrom: 2019, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 9 },

  // Onix Plus sedan (2019+, Turbo)
  { modelName: 'Onix Plus', yearFrom: 2019, yearTo: null, component: 'Óleo do motor 1.0 Turbo (Dexos obrigatório)', intervalKm: 10000, intervalMonths: 12, notes: 'Óleo fora da especificação Dexos é o principal fator de risco de quebra da correia banhada a óleo. Guarde nota fiscal.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Onix Plus', yearFrom: 2019, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Onix Plus', yearFrom: 2019, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em cidades com muita poeira/poluição.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Onix Plus', yearFrom: 2019, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Onix Plus', yearFrom: 2019, yearTo: null, component: 'Velas de ignição', intervalKm: 40000, intervalMonths: null, notes: 'Motor turbo pede atenção redobrada ao intervalo.', priority: 'HIGH', order: 4 },
  { modelName: 'Onix Plus', yearFrom: 2019, yearTo: null, component: 'Correia dentada banhada a óleo — inspeção/preventiva', intervalKm: 100000, intervalMonths: null, notes: 'Ponto de falha mais grave da geração. Garantia estendida a 240.000 km só em concessionária com óleo Dexos documentado.', priority: 'CRITICAL', order: 5 },
  { modelName: 'Onix Plus', yearFrom: 2019, yearTo: null, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'Onix Plus', yearFrom: 2019, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Chevrolet.', priority: 'HIGH', order: 7 },
  { modelName: 'Onix Plus', yearFrom: 2019, yearTo: null, component: 'Óleo do câmbio automático (versões AT)', intervalKm: 60000, intervalMonths: 48, notes: 'Não é vitalício em uso severo.', priority: 'HIGH', order: 8 },
  { modelName: 'Onix Plus', yearFrom: 2019, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Reforce pressão traseira com porta-malas carregado.', priority: 'MEDIUM', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Onix', yearFrom: 2012, yearTo: 2019, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'Onix', yearFrom: 2019, yearTo: null, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
  { modelName: 'Onix Plus', yearFrom: 2019, yearTo: null, MACETES: MACETES_PLUS, PROBLEMAS: PROBLEMAS_PLUS, MANUTENCAO: MANUTENCAO_PLUS },
]

async function main() {
  console.log('🚗 Seed Chevrolet Onix...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Chevrolet', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Chevrolet', vehicleTypeId: carroType.id },
  })

  const distinctModelNames = [...new Set(BLOCKS.map((b) => b.modelName))]
  for (const modelName of distinctModelNames) {
    await prisma.tip.deleteMany({ where: { modelName } })
  }

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {},
      create: { name: block.modelName, brandId: brand.id },
    })

    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))

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
    console.log(`  ✅ ${block.modelName} (${block.yearFrom ?? '?'}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }

  const distinctTpModelNames = [...new Set(TIRE_PRESSURES.map((t) => t.modelName))]
  for (const modelName of distinctTpModelNames) {
    await prisma.tirePressure.deleteMany({ where: { modelName } })
  }
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom ?? '?'}-${tp.yearTo ?? 'atual'})`)
  }

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: BLOCKS.map((b) => b.modelName) } },
  })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Chevrolet Onix concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
