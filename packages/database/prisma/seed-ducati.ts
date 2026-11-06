/**
 * Seed DUCATI — macetes, problemas e manutenção
 * Cobre os principais modelos Ducati comercializados no Brasil
 *
 * Fontes: ducati.com, ducatiforum.com, ducatimonster.org, maintenanceschedule.com,
 *         panigalev4club.com, advrider.com, ducatiscrambler.com,
 *         grupos Facebook "Ducati Brasil", "Ducati Monster Brasil", "Ducati Owners Club Brasil"
 *
 * Execute: pnpm --filter @motormacete/database db:seed:ducati
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

// ─── MONSTER 696 ─────────────────────────────────────────────────────────────

const MONSTER696_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 15W-50 sintético JASO MA2 — ~3,0L com filtro',
    body: 'Use obrigatoriamente 15W-50 sintético com certificação JASO MA2 (indispensável para embreagem úmida). Capacidade com troca do filtro: ~3,0 L. Marcas disponíveis no Brasil: Shell Advance 4T Ultra 15W-50, Motul 7100 15W-50. Troque a cada 12.000 km ou 12 meses.',
  },
  {
    severity: 'OK',
    title: 'Filtro de óleo alternativo: Hiflofiltro HF153RC — economia de ~60%',
    body: 'O filtro original Ducati (44440038A) custa R$120–180 em concessionária. O Hiflofiltro HF153RC é compatível e custa R$40–70 no Mercado Livre — mesma qualidade de filtragem. Disponível também pela distribuidora Muteki no Brasil. Troque a cada 12.000 km junto com o óleo.',
  },
  {
    severity: 'WARN',
    title: 'Vela NGK DCPR8E — gap 0,7–0,9 mm, troque a cada 24.000 km',
    body: 'Motor 2 válvulas/cilindro usa vela NGK DCPR8E (não confunda com as velas MAR9A-J dos modelos 4v). Gap correto: 0,7–0,9 mm — verifique sempre ao reinstalar. Versão iridium NGK DCPR8EIX tem vida útil maior. Vela desgastada causa partida difícil a frio e aumento de consumo.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 — DID 520 ZVMX ou RK 520 ZXW como alternativa',
    body: 'O Monster 696 usa corrente 520. Kit completo (corrente + pinhão + coroa) alternativo: DID 520 ZVMX ou RK 520 ZXW — R$400–600 vs R$800+ do kit original. Lubrifique a cada 1.000 km. Tensão correta: 28–30 mm de folga na parte inferior com moto no cavalete.',
  },
]

const MONSTER696_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Correia de distribuição: troque a cada 24.000 km OU 2 anos — sem exceção',
    body: 'Este é o ponto mais crítico do Monster 696. A correia arrebentada causa colisão imediata entre válvulas e pistões — destruição total do motor. Muitos proprietários chegam com 3–4 anos sem trocar. O limite é 24.000 km OU 2 anos (o que ocorrer primeiro). Antes de comprar um 696 usado, pergunte quando foi trocada a correia e exija comprovante.',
  },
  {
    severity: 'DANGER',
    title: 'Revisão Desmodromica: obrigatória a cada 12.000 km — não pule',
    body: 'As válvulas Desmodromicas (sem mola retorno) dependem de folgas precisas. Se as folgas fecharem, as válvulas batem nos pistões. Revisão inclui verificação das 8 folgas do motor 2v e inspeção da correia. Custo: R$800–1.500 em concessionária Ducati; R$400–800 em mecânico independente especializado em italianas (ex: RevTech, Motos Italianas Brasil).',
  },
  {
    severity: 'WARN',
    title: 'TPS (Throttle Position Sensor): falha por desgaste das escovas internas',
    body: 'Problema recorrente nos motores Ducati 2v: o sensor de posição da borboleta falha e a moto entra em modo de segurança, limitada a 4.000 rpm. Sintoma: perda súbita de potência com luz de falha no painel. Troca do TPS resolve. Faça sempre o reset do TPS após troca de bateria ou desconexão do chicote elétrico.',
  },
]

const MONSTER696_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Monster 696: motor 2v com correia de distribuição',
    body: '1.000 km — Primeira revisão obrigatória. | 12.000 km — Óleo motor (15W-50 JASO MA2, ~3,0 L) + filtro. Verificar folgas Desmo (8 folgas). Verificar tensão da correia de distribuição. Lubrificar corrente. | 24.000 km — Trocar correia de distribuição (OBRIGATÓRIO, máx. 2 anos). Vela NGK DCPR8E. Filtro de ar. Fluido de freio DOT 4. | 48.000 km — Óleo do garfo. Rolamentos de roda. Revisão completa do sistema de freios.',
  },
]

// ─── MONSTER 797 ─────────────────────────────────────────────────────────────

const MONSTER797_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 15W-50 sintético — ~3,1L com filtro; filtro HF153RC economiza R$80+',
    body: 'Mesmo padrão do 696: 15W-50 JASO MA2, ~3,1 L com filtro. Filtro Hiflofiltro HF153RC funciona perfeitamente e custa R$40–70 no ML. O motor 803cc (base do motor Scrambler) é um pouco maior que o 696cc mas usa as mesmas especificações básicas de óleo.',
  },
  {
    severity: 'WARN',
    title: 'Correia de distribuição: prazo máximo 5 anos — mas não espere tanto',
    body: 'A Ducati ampliou o prazo da correia do 797 para 5 anos (vs 2 anos do 696), mas especialistas recomendam manter 2–3 anos em uso no Brasil (calor e humidade aceleram o envelhecimento da borracha). Qualquer craquelamento visível = troca imediata. Verifique sempre ao comprar usado.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK DCPR8E, gap 0,7–0,9 mm — mesma do 696',
    body: 'O motor 803cc 2v usa a mesma vela NGK DCPR8E do 696cc. Troque a cada 24.000 km. Versão iridium disponível (NGK DCPR8EIX) para quem quer maior durabilidade. Custo da vela: R$30–60 no Mercado Livre.',
  },
]

const MONSTER797_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Revisão Desmo a cada 12.000 km — custo R$800–1.500',
    body: 'Mesmo intervalo do 696: verificação das folgas Desmodromicas a cada 12.000 km é obrigatória. Motor 2v tem 8 folgas de válvulas (4 por cilindro). Ignorar causa dano irreversível ao motor. Mecânicos independentes especializados em Ducati cobram 40–60% menos que concessionária.',
  },
  {
    severity: 'WARN',
    title: 'TPS — mesmo problema do 696: safe mode a 4.000 rpm',
    body: 'O sensor de posição da borboleta (TPS) do motor 2v falha com desgaste das escovas internas. Resultado: moto limitada a 4.000 rpm com luz de falha no painel. Troca do TPS resolve. Faça reset do TPS após troca de bateria.',
  },
  {
    severity: 'WARN',
    title: 'Calor do cilindro traseiro: uso prolongado em congestionamento causa desconforto',
    body: 'O L-Twin ar/óleo do 797 irradia calor intenso para a perna direita do piloto em congestionamentos com temperatura acima de 28°C. É característica de design do motor — não tem como eliminar. Calças com proteção térmica ajudam. Evite trânsito lento prolongado nos dias quentes.',
  },
]

const MONSTER797_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Monster 797: similar ao 696 com correia de 5 anos',
    body: '1.000 km — Primeira revisão. | 12.000 km — Óleo (15W-50, ~3,1 L) + filtro HF153RC. Verificar folgas Desmo. Inspecionar correia. | 24.000 km — Vela NGK DCPR8E. Filtro de ar. Fluido de freio DOT 4. | Correia de distribuição: trocar a cada 24.000 km ou 3 anos no clima brasileiro (manual diz 5 anos, mas use 3 como limite seguro). | 48.000 km — Óleo garfo. Rolamentos de roda.',
  },
]

// ─── MONSTER 821 ─────────────────────────────────────────────────────────────

const MONSTER821_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 15W-50 JASO MA2 — ~3,5L com filtro; motor 4v refrigerado a líquido',
    body: 'O Monster 821 tem motor Testastretta 4 válvulas/cilindro refrigerado a líquido — diferente do 696/797 a ar/óleo. Use 15W-50 sintético JASO MA2, ~3,5 L com filtro. Filtro alternativo: Hiflofiltro HF153RC (R$40–70). Troque a cada 15.000 km ou 12 meses.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem a seco (pré-2021): barulho de cascalho é NORMAL — desgasta em cidade',
    body: 'O Monster 821 pré-2021 usa embreagem a seco com cesta exposta — o barulho de "cascalho" ao acionar é completamente normal, é o design Ducati. Mas em tráfego urbano intenso (meia embreagem prolongada), a embreagem desgasta 3–5× mais rápido. Kit de embreagem alternativo Barnett ou EBC: R$800–1.800 vs R$2.500–4.500 do kit OEM.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK MAR9A-J — 4 velas no total (2 por cabeçote)',
    body: 'Motor 4v Testastretta usa vela diferente dos modelos 2v: NGK MAR9A-J com torque de instalação 12 Nm. São 2 velas por cabeçote (dual spark), totalizando 4 velas no motor. Troque a cada 30.000 km. Custo por jogo: R$150–250 no ML.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 — DID 525 ZVMX; folga 28–30 mm',
    body: 'O 821 usa corrente 525 (mais robusta que o 696). Kit alternativo DID 525 ZVMX ou RK 525 ZXW: R$500–750. Lubrifique a cada 1.000 km. Folga correta: 28–30 mm pressionando a parte inferior da corrente com o dedo.',
  },
]

const MONSTER821_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Revisão Desmo a cada 30.000 km — custo R$1.200–2.500',
    body: 'Motor 4v Testastretta tem intervalo Desmo maior que o 2v (30.000 km), mas o custo é similar. São 16 folgas de válvulas para verificar (2 válvulas por cilindro × 2 cilindros × abertura + fechamento). Concessionária: R$1.200–2.500. Especialista independente (RevTech, Gustavo Motos SP): R$600–1.200. Não pule — motor destruído custa R$15.000+.',
  },
  {
    severity: 'DANGER',
    title: 'Correia de distribuição: troque a cada 30.000 km ou 5 anos',
    body: 'Motor Testastretta usa correia de distribuição que deve ser trocada a cada 30.000 km ou 5 anos. No Brasil, pelo calor, recomenda-se não passar de 3–4 anos. Correia rompida = colisão válvulas/pistões = R$15.000–25.000 em reconstrução do motor. Exija histórico de troca ao comprar usado.',
  },
  {
    severity: 'WARN',
    title: 'Quick-Shifter DQS: falso neutro ao subir de 4ª→5ª em RPM baixo',
    body: 'Problema reportado em todos os Ducati com DQS (quick-shifter): pula para falso neutro ao tentar upshift de 4ª para 5ª (e às vezes 5ª→6ª) com RPM abaixo de 5.000. Solução: manter acima de 5.000 rpm para upshifts confiáveis com o DQS ativo. Não é defeito — é limitação do sistema.',
  },
]

const MONSTER821_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Monster 821: motor 4v refrigerado a líquido',
    body: '1.000 km — Primeira revisão. | 15.000 km — Óleo (15W-50, ~3,5 L) + filtro HF153RC. Verificar nível líquido arrefecimento. | 30.000 km — Revisão Desmo (16 folgas). Correia de distribuição (troca). 4× velas NGK MAR9A-J. Filtro de ar. Fluido de freio DOT 4. | 48 meses — Trocar líquido de arrefecimento (50% anticongelante). | 60.000 km — Óleo garfo dianteiro. Rolamentos de roda.',
  },
]

// ─── MONSTER 1100 EVO ─────────────────────────────────────────────────────────

const MONSTER1100EVO_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 15W-50 sintético — ~3,5L com filtro; motor 2v ar+óleo de grande cilindrada',
    body: 'Motor L-Twin 1078cc 2 válvulas/cilindro refrigerado a ar+óleo. Use 15W-50 sintético JASO MA2, ~3,5 L com filtro. Filtro alternativo: Hiflofiltro HF153RC. Em dias muito quentes e trânsito intenso, o motor a ar/óleo de 1100cc aquece significativamente — evite ralenti prolongado acima de 15 minutos.',
  },
  {
    severity: 'WARN',
    title: 'Vela NGK DCPR8E — motor 2v de 1100cc usa a mesma vela do 696',
    body: 'Apesar da maior cilindrada, o 1100 EVO usa a mesma vela NGK DCPR8E dos modelos 2v menores (gap 0,7–0,9 mm). Troque a cada 24.000 km. Vazamento de óleo nas juntas das tampas de cames é mais comum neste motor após 40.000 km — inspecione anualmente.',
  },
]

const MONSTER1100EVO_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Correia de distribuição: troque a cada 24.000 km ou 2 anos',
    body: 'Motor 2v 1100cc tem o mesmo prazo crítico de correia do 696: 24.000 km ou 2 anos. Motor maior + mais torque = mais carga sobre a correia. Rompimento causa destruição total — reconstrução do motor de 1100cc custa R$20.000+. Modelo lançado em 2009 — qualquer unidade com mais de 5 anos sem histórico de correia é risco alto.',
  },
  {
    severity: 'DANGER',
    title: 'Revisão Desmo a cada 12.000 km — custo R$800–1.500',
    body: 'Motor 2v: 8 folgas de válvulas a verificar a cada 12.000 km. Alto custo de manutenção comparado à cilindrada. Modelos 1100 EVO com mais de 30.000 km sem documentação de revisão Desmo devem passar por inspeção antes de qualquer compra.',
  },
  {
    severity: 'WARN',
    title: 'Calor extremo em cidade: motor a ar/óleo de 1100cc aquece mais que o 696',
    body: 'O motor de maior cilindrada gera ainda mais calor que o 696/797. Em congestionamentos com temperatura acima de 30°C, o 1100 EVO fica desconfortável para piloto e garupa. Não é defeito — é limitação inerente ao design de motor a ar/óleo de alta cilindrada.',
  },
]

const MONSTER1100EVO_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Monster 1100 EVO: alta cilindrada com correia crítica a cada 2 anos',
    body: '1.000 km — Primeira revisão. | 12.000 km — Óleo (15W-50, ~3,5 L) + filtro. Verificar 8 folgas Desmo. Verificar tensão da correia. | 24.000 km — Trocar correia de distribuição (OBRIGATÓRIO, máx. 2 anos). Vela NGK DCPR8E. Filtro de ar. Fluido de freio DOT 4. | 36.000 km — Inspecionar juntas das tampas de cames (tendência a vazar). | 60.000 km — Óleo garfo. Rolamentos de roda. Inspeção da bomba de óleo.',
  },
]

// ─── MONSTER 1200 ─────────────────────────────────────────────────────────────

const MONSTER1200_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 15W-50 JASO MA2 — ~3,4L; motor Testastretta 11° 1198cc refrigerado a líquido',
    body: 'Motor 4v/cil 1198cc refrigerado a líquido. Use 15W-50 sintético JASO MA2, ~3,4 L com filtro. Filtro alternativo Hiflofiltro HF153RC. Verifique também o nível de líquido de arrefecimento a cada 3.000 km. Troque o óleo a cada 15.000 km ou 12 meses.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem a seco (versões até ~2018): kit Barnett economiza R$1.500+',
    body: 'Versões do Monster 1200 até 2018 têm embreagem a seco. O kit OEM custa R$2.500–4.500. Kit Barnett (importado) custa ~R$1.200–2.000 e tem reputação equivalente ao original. Kit EBC SRK-series também disponível. Barulho de cascalho ao acionar a embreagem = normal.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK MAR9A-J — 4 velas totais; troca a cada 60.000 km no 1200',
    body: 'Motor 4v 1200cc usa NGK MAR9A-J (2 por cabeçote = 4 total). Diferente dos modelos 2v. O intervalo de troca no 1200 é 60.000 km (manual Ducati). Custo de 4 velas NGK: R$120–200 no ML. Sempre aperte com torque correto: 12 Nm.',
  },
]

const MONSTER1200_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Revisão Desmo a cada 30.000 km: R$1.200–2.500 — não pode pular',
    body: 'Motor 4v 1198cc tem intervalo Desmo de 30.000 km. São 16 folgas de válvulas. Descuidar é a principal causa de destruição de motores Ducati no Brasil. Reconstrução de motor Testastretta 1200 custa R$20.000–35.000. Mecânicos independentes especializados cobram 40–50% menos que concessionária.',
  },
  {
    severity: 'DANGER',
    title: 'Correia distribuição: troca cada 30.000 km ou 5 anos (no Brasil: 3–4 anos)',
    body: 'Mesmo protocolo do 821: correia deve ser trocada a cada 30.000 km ou 5 anos pelo manual, mas no clima quente e úmido brasileiro recomenda-se máximo de 3–4 anos. Correia com craquelamentos = troca imediata. Rompimento = destruição do motor de R$25.000+.',
  },
  {
    severity: 'WARN',
    title: 'Quick-Shifter: falso neutro 4ª→5ª — manter >9.000 rpm para upshifts seguros',
    body: 'DQS do Monster 1200 gera falso neutro ao upshift em RPM baixo — especialmente 4ª→5ª e 5ª→6ª. Manter acima de 9.000 rpm para upshifts confiáveis. Não é defeito, é limitação do sistema. Atualizações de ECU via concessionária podem melhorar ligeiramente o comportamento.',
  },
]

const MONSTER1200_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Monster 1200: motor 4v Testastretta líquido com correia de 5 anos',
    body: '1.000 km — Primeira revisão. | 15.000 km — Óleo (15W-50, ~3,4 L) + filtro. Verificar nível arrefecimento. | 30.000 km — Revisão Desmo completa. Trocar correia de distribuição. 4× velas NGK MAR9A-J. Filtro de ar. Fluido de freio/embreagem DOT 4. | 48 meses — Trocar líquido de arrefecimento. | 60.000 km — Óleo garfo. Rolamentos de roda. Pastilhas de freio.',
  },
]

// ─── 848 EVO ─────────────────────────────────────────────────────────────────

const EVO848_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 15W-50 ou 10W-40 sintético — ~3,7L; use Motul 300V para pista',
    body: 'Motor Superquadro 849cc 4v/cil refrigerado a líquido. Especificação padrão: 15W-50 sintético JASO MA2. Para uso em pista, Motul 300V 10W-40 é preferido pelos proprietários. Capacidade com filtro: ~3,7 L. Filtro alternativo: Hiflofiltro HF159 (este modelo usa HF159, não o HF153RC dos Monster!).',
  },
  {
    severity: 'WARN',
    title: 'Vela NGK MAR10A-J — diferente dos outros! 4 velas totais, troca 12.000 km',
    body: 'ATENÇÃO: o 848 EVO usa NGK MAR10A-J (código diferente do MAR9A-J dos modelos 937/1200). São 2 velas por cabeçote = 4 totais. Intervalo de troca mais curto: 12.000 km (motor SBK de alta rotação). Confundir os códigos de vela é erro comum — confirme sempre antes de comprar.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 — cadeia esportiva mais leve; lubrifique a cada 600 km',
    body: 'Motor esportivo de corrida usa corrente 520 (mais leve que a 525 dos modelos naked). Kit alternativo DID 520 ZVMX ou RK 520 GXW. Em uso na rua com trânsito, lubrifique a cada 600–800 km. Tensão: 28–30 mm de folga no ponto mais apertado da corrente.',
  },
]

const EVO848_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Revisão Desmo a cada 12.000 km — frequência mais alta da linha, custo R$1.500–3.500',
    body: 'O 848 EVO é motor SBK de alta performance — revisão Desmodromica a cada 12.000 km (mesmo intervalo do 696, mas motor mais complexo). São 16 folgas de válvulas + correia + alinhamento de fases. Custo elevado + frequência alta = moto cara de manter em uso intenso. Planeje R$1.500–3.500 por revisão em concessionária.',
  },
  {
    severity: 'DANGER',
    title: 'Correia de distribuição: 2 anos é o prazo MÁXIMO — motor SBK não perdoa',
    body: 'Motor de alta performance sujeita a correia a mais carga que nos Monster naked. Prazo máximo: 24.000 km OU 2 anos. Em uso misto rua/pista: antecipar para 18.000 km ou 18 meses. Rompimento em alta rotação é catastrófico — reconstrução de motor 848 custa R$18.000–30.000.',
  },
  {
    severity: 'WARN',
    title: 'Radiador pequeno: superaquece em trânsito urbano lento acima de 30°C',
    body: 'O radiador do 848 EVO foi projetado para circulação de ar em alta velocidade — não para trânsito urbano lento. Em cidades quentes, o ventilador entra em operação frequente. Verifique sempre o nível de arrefecimento. Se o indicador de temperatura subir muito, pare em local seguro e aguarde esfriar.',
  },
]

const EVO848_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 848 EVO: motor SBK com manutenção mais frequente e cara',
    body: '1.000 km — Primeira revisão. | 12.000 km — Óleo (15W-50, ~3,7 L) + filtro HF159. Revisão Desmo (16 folgas). Verificar tensão correia. 4× velas NGK MAR10A-J. | 24.000 km — Trocar correia de distribuição (OBRIGATÓRIO, máx. 2 anos). Filtro de ar. Fluido de freio/embreagem DOT 4. | 48.000 km — Líquido de arrefecimento. Óleo garfo dianteiro (fluido pesado para uso esportivo).',
  },
]

// ─── 959 PANIGALE ─────────────────────────────────────────────────────────────

const PANIGALE959_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor com CORRENTE de timing (não correia) — vantagem sobre o 848',
    body: 'O motor 959 Panigale usa corrente de timing interna em vez de correia — sem o risco de ruptura catastrófica e sem a revisão de 2 anos. Monitore apenas ruídos de "cascavel" ao ligar o motor (raro, indica corrente esticada). Filtro de óleo: HF159 (não confundir com HF153RC). Óleo: 15W-50, ~3,8 L.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK MAR9A-J — 4 velas totais; filtro alternativo HF159',
    body: 'O 959 usa NGK MAR9A-J (mesmo do Monster 937) — 2 por cabeçote, 4 totais. Troca a cada 24.000 km (durante revisão Desmo). Filtro de óleo: Hiflofiltro HF159 (diferente dos modelos Monster!). Corrente roda traseira: 520 — DID 520 ZVMX ou RK 520 EXW.',
  },
  {
    severity: 'WARN',
    title: 'Pneus para pista: reduza pressão para 28–30 PSI (frio) nos dois eixos',
    body: 'Para uso na pista, a pressão recomendada cai para 28–30 PSI nos dois eixos (pneu frio), chegando a 31–33 PSI quando aquecido. Para uso exclusivo em rua: mantenha a especificação de estrada (36/42 PSI). Jamais use pressão de pista nas ruas — instabilidade perigosa em temperatura baixa do asfalto.',
  },
]

const PANIGALE959_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Revisão Desmo a cada 24.000 km: R$1.500–3.000 — mais cara por ser motor SBK',
    body: 'Motor 955cc 4v com revisão Desmo a cada 24.000 km. 16 folgas de válvulas para verificar. Custo mais alto que nos Monster pela complexidade SBK e necessidade de ferramental específico. Não há substituto para a revisão — motor destruído custa R$20.000+ para reconstruir.',
  },
  {
    severity: 'WARN',
    title: 'Radiador compacto: use o ventilador em ralenti na garagem, não deixe esquentar demais',
    body: 'O radiador do 959 é dimensionado para circulação de ar em velocidade — não para trânsito lento ou moto parada ligada. Se precisar manter o motor ligado parado, o ventilador auxiliar dará conta, mas evite ultrapassar 5 minutos de ralenti contínuo em dia quente.',
  },
]

const PANIGALE959_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 959 Panigale: motor moderno sem correia facilita manutenção',
    body: '1.000 km — Primeira revisão. | 12.000 km — Óleo (15W-50, ~3,8 L) + filtro HF159. Lubrificar corrente 520. | 24.000 km — Revisão Desmo (16 folgas). 4× velas NGK MAR9A-J. Filtro de ar (DNA P-DU11S12-01 como alternativa ao OEM). Fluido de freio/embreagem DOT 4. | 48.000 km — Líquido de arrefecimento. Óleo garfo dianteiro.',
  },
]

// ─── 1098 ─────────────────────────────────────────────────────────────────────

const DUCATI1098_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 15W-50 ou 10W-40 sintético — ~3,7L; Motul 300V para pista',
    body: 'Motor Testastretta 1098/1198cc 4v/cil de alta performance. Para uso na rua: 15W-50 JASO MA2. Para pista: Motul 300V 10W-40. Capacidade: ~3,7 L. Filtro alternativo: Hiflofiltro HF159. O estator/gerador do 1098 (2007–2009) teve problema de superaquecimento — use apenas 15W-50 de boa qualidade no motor.',
  },
  {
    severity: 'WARN',
    title: 'Vela NGK MAR10A-J — mesma do 848 EVO; troca a cada 12.000 km',
    body: 'Motor SBK 1098cc usa NGK MAR10A-J (não MAR9A-J). São 4 velas. Intervalo: 12.000 km. Em uso pesado ou pista, inspecione a cada 6.000 km. O 1198cc (2009+) pode usar o mesmo código — confirme sempre no manual do modelo específico.',
  },
]

const DUCATI1098_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Correia de distribuição: 2 anos é o limite ABSOLUTO — motor SBK em alta rotação',
    body: 'Motor SBK 1098/1198cc exige troca de correia a cada 24.000 km ou 2 anos — prazo mais curto que modelos modernos pelo stress do motor em alta rotação. Rompimento com motor acima de 8.000 rpm é destruição imediata. Reconstrução de motor 1098: R$25.000–40.000. Não negocie este prazo.',
  },
  {
    severity: 'DANGER',
    title: 'Revisão Desmo a cada 12.000 km: R$1.500–3.500 — custo real de ter um 1098',
    body: 'Motor SBK de alto desempenho tem revisão Desmo a cada 12.000 km — 5× mais frequente que o Monster 937. Para quem roda 10.000 km/ano, isso é quase uma revisão anual. Este é o custo real de manter um 1098 em boas condições. Planeje o orçamento antes de comprar.',
  },
  {
    severity: 'WARN',
    title: 'Estator/regulador: 1098 pré-2010 teve recall de proteção térmica do estator',
    body: 'A primeira geração do 1098 (2007–2009) teve problemas com o regulador/retificador superaquecendo — risco de falha elétrica total. Verifique se o recall de proteção térmica foi executado ao comprar um 1098 usado. Sintoma: bateria que descarrega anormalmente ou irregularidades na carga elétrica.',
  },
]

const DUCATI1098_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 1098/1198: moto SBK com manutenção intensa e cara',
    body: '1.000 km — Primeira revisão. | 12.000 km — Óleo (15W-50 ou 10W-40, ~3,7 L) + filtro HF159. Revisão Desmo (16 folgas). 4× velas NGK MAR10A-J. Verificar tensão correia. | 24.000 km — Trocar correia de distribuição (máx. 2 anos). Filtro de ar. Fluido de freio DOT 4 (dianteiro e traseiro). | 48.000 km — Líquido de arrefecimento. Óleo garfo dianteiro. Rolamentos de roda.',
  },
]

// ─── PANIGALE V2 ──────────────────────────────────────────────────────────────

const PANIGALEV2_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor V2 com corrente de timing: sem correia e embreagem molhada — muito mais prático',
    body: 'O Panigale V2 (2020+) usa motor 955cc com corrente de timing (sem correia) e embreagem molhada — eliminando os dois maiores custos das gerações anteriores. Óleo: 15W-50 JASO MA2, ~3,5–3,8 L. Filtro: Hiflofiltro HF159. Troca de óleo: 12.000 km ou 12 meses.',
  },
  {
    severity: 'OK',
    title: 'Pneu OEM Pirelli Diablo Rosso Corsa II: calibre 36/36 PSI na rua, 28–30 pista',
    body: 'Pneus de origem: Pirelli Diablo Rosso Corsa II (F: 120/70-ZR17, T: 180/60-ZR17). Na rua: 36 PSI nos dois eixos. Para trackday: 28–30 PSI frio (ajusta para 31–33 aquecido). Vida útil dos pneus em uso misto: 5.000–8.000 km dianteiro, 3.000–5.000 traseiro.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK MAR9A-J — 4 velas totais; troca a cada 24.000 km',
    body: 'Motor SuperSport V2 usa NGK MAR9A-J, 2 por cabeçote = 4 totais. Troca a cada 24.000 km durante revisão Desmo. Filtro de ar alternativo: DNA P-DU11S12-01. Corrente traseira: 520 — DID 520 ZVMX.',
  },
]

const PANIGALEV2_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Revisão Desmo a cada 24.000 km: R$1.500–3.000 — modelo moderno é o melhor custo-benefício SBK',
    body: 'Motor 955cc V2 tem revisão Desmo a cada 24.000 km — melhor intervalo dos modelos SBK da linha. Custo: R$1.500–3.000 em concessionária, R$800–1.500 em especialista. Muito mais razoável que o 1098 (R$1.500–3.500 a cada 12.000 km). Modelo moderno com poucos problemas relatados.',
  },
  {
    severity: 'WARN',
    title: 'Quick-Shifter: upshift de baixo RPM gera falso neutro — manter acima de 6.000 rpm',
    body: 'DQS do Panigale V2 tem comportamento idêntico aos outros Ducati com o sistema: falso neutro em upshifts abaixo de 5.000–6.000 rpm. Mantenha o motor girando antes de mudar de marcha. Não é defeito — é limitação conhecida do sistema nas primeiras versões de firmware.',
  },
]

const PANIGALEV2_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Panigale V2: o SBK com melhor equilíbrio manutenção/performance',
    body: '1.000 km — Primeira revisão. | 12.000 km — Óleo (15W-50, ~3,8 L) + filtro HF159. Lubrificar corrente. | 24.000 km — Revisão Desmo. 4× velas NGK MAR9A-J. Filtro de ar. Fluido de freio/embreagem DOT 4 (2 anos ou 24.000 km). | 48.000 km — Líquido de arrefecimento. Óleo garfo. Inspeção completa pastilhas Brembo.',
  },
]

// ─── PANIGALE V4 ──────────────────────────────────────────────────────────────

const PANIGALEV4_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor V4 com corrente de timing: 32 folgas Desmo a 24.000 km — o mais caro de revisar',
    body: 'O Desmosedici Stradale V4 1103cc tem 4 cilindros = 16 válvulas = 32 folgas Desmodromicas para verificar a cada 24.000 km. O motor ocupa tanto espaço que é necessário desmontar quase toda a moto para acessá-lo. Custo em concessionária: R$4.000–8.000. Custo em especialista com experiência em V4: R$2.000–4.000.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK LMDR10A-JS — código único do V4, diferente de TODOS os outros modelos',
    body: 'O motor V4 usa velas NGK LMDR10A-JS — código exclusivo que não se repete em nenhum outro modelo da linha Ducati. São 4 velas (1 por cilindro). Troca: 24.000 km. Custo: R$80–150 por vela = R$320–600 o jogo. Confirme o código antes de comprar — é fácil confundir com MAR9A-J ou LMDR10A.',
  },
  {
    severity: 'WARN',
    title: 'Pneu traseiro 200/60-ZR17: calibre 30 PSI (menos pressão que nos naked)',
    body: 'A Panigale V4 usa pneu traseiro de perfil 200/60 (mais largo que o 180/55 dos Monster). A pressão correta é MENOR: 30 PSI no traseiro (solo, frio). Calibrar com 36–42 PSI do Monster é erro comum e prejudica o manuseio. Dianteiro: 33 PSI. Confira sempre as etiquetas no balancim da moto.',
  },
  {
    severity: 'OK',
    title: 'Fluido de freio DOT 4: troque a cada 2 anos — pastilhas Brembo duram 5.000–8.000 km',
    body: 'Pastilhas Brembo Stylema originais da Panigale V4 têm vida útil de 5.000–8.000 km em uso misto rua/pista. Em trackday: podem durar apenas 1.500–2.000 km. Sempre troque o fluido DOT 4 a cada 2 anos. Pastilhas alternativas: Ferodo ou EBC Double-H para uso na rua; manter Brembo para pista.',
  },
]

const PANIGALEV4_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Revisão Desmo V4: R$4.000–8.000 a cada 24.000 km — custo de propriedade extremo',
    body: 'Este é o maior custo de propriedade de qualquer Ducati no Brasil. O V4 tem 32 folgas para verificar e o motor precisa sair da moto (ou quase) para ser acessado. Planeje R$4.000–8.000 por revisão em concessionária. Especialistas independentes com experiência comprovada em V4 cobram R$2.000–4.000. Verifique o histórico de revisões ANTES de comprar qualquer V4 usado.',
  },
  {
    severity: 'DANGER',
    title: 'Recalls 2018–2019: tensor de corrente e tampão de tanque — verifique o VIN',
    body: 'A Panigale V4 das primeiras safras (2018–2019) teve duas campanhas de recall: (1) parafuso do tensor da corrente de timing solto — pode resultar em dano ao motor; (2) tampão do tanque defeituoso causando vazamento de gasolina. Verifique o VIN em ducati.com/us/en/service-maintenance/recall-campaign antes de qualquer compra de V4 usada.',
  },
  {
    severity: 'WARN',
    title: 'Fio do sensor ABS dianteiro pode friccionar no pneu — verifique a fixação',
    body: 'Problema relatado em alguns V4: a mangueira com o fio do sensor ABS na roda dianteira pode soltar a abraçadeira e encostar no pneu em movimento. O pneu vai raspando o fio até cortar — perda de ABS e possível falha de freio. Inspecione a fixação do sensor ABS dianteiro a cada 5.000 km.',
  },
]

const PANIGALEV4_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Panigale V4: o mais complexo e caro de manter da linha Ducati',
    body: '1.000 km — Primeira revisão. | 12.000 km — Óleo (15W-50, ~4,5 L motor V4) + filtro HF159. Lubrificar corrente 520. Inspecionar pastilhas Brembo. | 24.000 km — Revisão Desmo V4 (32 folgas — motor sai da moto). 4× velas NGK LMDR10A-JS. Filtro de ar. Fluido de freio/embreagem DOT 4. | 36.000 km — Líquido de arrefecimento. | 60.000 km — Óleo garfo (Öhlins requer óleo específico nas versões V4S). Rolamentos de roda.',
  },
]

// ─── STREETFIGHTER V4 ────────────────────────────────────────────────────────

const STREETFIGHTERV4_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesmo motor V4 da Panigale — mesma manutenção, mas mais acessível (naked)',
    body: 'O Streetfighter V4 usa exatamente o mesmo Desmosedici Stradale V4 1103cc da Panigale V4. Mesmas especificações: óleo 15W-50 JASO MA2, filtro HF159, vela NGK LMDR10A-JS (4 unidades), Desmo a 24.000 km. A posição naked facilita ligeiramente o acesso ao motor em comparação com a Panigale com carenagem.',
  },
  {
    severity: 'WARN',
    title: 'Calor do V4 em naked: motor quente para as pernas em congestionamentos',
    body: 'O motor V4 gera muito calor. Sem a carenagem da Panigale para canalizar o ar quente para os lados, o Streetfighter V4 irradia calor diretamente para as pernas do piloto em trânsito parado. Em cidades quentes: use calças com proteção térmica. O ventilador do radiador ajuda mas não elimina o calor em lentidão intensa.',
  },
  {
    severity: 'OK',
    title: 'Corrente roda traseira: 525 (mais robusta que na Panigale) — DID 525 ZVMX',
    body: 'Diferença importante: o Streetfighter V4 usa corrente 525 (mais robusta), enquanto a Panigale V4 usa 520. Kit alternativo DID 525 ZVMX ou RK 525 ZXW. Lubrifique a cada 1.000 km. Folga: 23–25 mm.',
  },
]

const STREETFIGHTERV4_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Revisão Desmo V4: R$4.000–8.000 a cada 24.000 km — idêntico à Panigale V4',
    body: 'Mesmo motor = mesmo custo de revisão. Planeje R$4.000–8.000 por ciclo de revisão Desmo a cada 24.000 km. O motor ainda precisa ser parcialmente removido para acesso completo. Especialistas independentes com experiência em Ducati V4 podem reduzir o custo para R$2.000–4.000.',
  },
  {
    severity: 'WARN',
    title: 'Throttle-by-wire: resposta travada abaixo de 3.000 rpm por gestão de emissões',
    body: 'O controle eletrônico de acelerador (ride-by-wire) do V4 tem resposta deliberadamente embotada abaixo de 2.500–3.000 rpm para cumprir normas de emissões Euro 5. É mais perceptível no Streetfighter (sem a proteção aerodinâmica da Panigale). Usar modo Sport ou Sport+ melhora a resposta.',
  },
]

const STREETFIGHTERV4_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Streetfighter V4: idêntico ao Panigale V4',
    body: '1.000 km — Primeira revisão. | 12.000 km — Óleo (15W-50, ~4,5 L) + filtro HF159. Lubrificar corrente 525. | 24.000 km — Revisão Desmo (32 folgas). 4× velas NGK LMDR10A-JS. Filtro de ar. Fluido de freio DOT 4 (2 anos). | 36.000 km — Líquido de arrefecimento. | 60.000 km — Óleo garfo. Rolamentos de roda.',
  },
]

// ─── STREETFIGHTER V2 ────────────────────────────────────────────────────────

const STREETFIGHTERV2_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 955cc V2 — corrente de timing, embreagem molhada, Desmo 24.000 km',
    body: 'O Streetfighter V2 usa o mesmo motor do Panigale V2: 955cc com corrente de timing (sem correia) e embreagem molhada. Óleo: 15W-50 JASO MA2, ~3,5–3,8 L. Filtro HF159. Vela NGK MAR9A-J (4 totais). Corrente roda: 525 — DID 525 ZVMX. Troca de óleo: 12.000 km ou 12 meses.',
  },
  {
    severity: 'WARN',
    title: 'Calor do V2 em naked: calça térmica é recomendada em cidades acima de 28°C',
    body: 'Como todo L-Twin Ducati em configuração naked, o cilindro traseiro irradia calor para a perna direita do piloto em trânsito lento. O 955cc gera mais calor que o 937cc. Calças de couro com proteção térmica ou calças de kevlar com forro térmico reduzem o desconforto significativamente.',
  },
]

const STREETFIGHTERV2_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Revisão Desmo a cada 24.000 km: R$1.500–3.000',
    body: 'Motor V2 955cc com revisão Desmo a 24.000 km — mesmo custo e intervalo do Panigale V2. 16 folgas de válvulas para verificar. Custo: R$1.500–3.000 em concessionária. Modelo lançado em 2022 — poucos problemas reportados até o momento.',
  },
]

const STREETFIGHTERV2_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Streetfighter V2: idêntico ao Panigale V2',
    body: '1.000 km — Primeira revisão. | 12.000 km — Óleo (15W-50, ~3,8 L) + filtro HF159. | 24.000 km — Revisão Desmo. 4× velas NGK MAR9A-J. Filtro de ar. Fluido de freio DOT 4. | 48.000 km — Líquido de arrefecimento. Óleo garfo. Rolamentos de roda.',
  },
]

// ─── MONSTER 937 ─────────────────────────────────────────────────────────────

const MONSTER937_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Embreagem MOLHADA: a maior evolução do Monster 937 vs gerações anteriores',
    body: 'O Monster 937 (2021+) adotou embreagem molhada — fim do barulho de cascalho característico das gerações anteriores. Muito mais adequado para uso urbano frequente: não desgasta em trânsito lento. Intervalo de troca de óleo: 15.000 km ou 12 meses.',
  },
  {
    severity: 'OK',
    title: 'Óleo 15W-50 JASO MA2 — ~3,5L; filtro Hiflofiltro HF153RC como alternativa',
    body: 'Motor L-Twin 937cc 4v/cil refrigerado a líquido. Use 15W-50 sintético JASO MA2, ~3,5 L com filtro. Filtro alternativo: Hiflofiltro HF153RC (R$40–70 vs R$120+ original). Vela: NGK MAR9A-J, 4 no total, troca a cada 30.000 km.',
  },
  {
    severity: 'OK',
    title: 'Revisão Desmo ampliada para 30.000 km — melhor que modelos 2v',
    body: 'O motor 937cc Testastretta tem intervalo Desmo de 30.000 km — muito melhor que os 12.000 km dos modelos 2v anteriores. Custo estimado no Brasil: R$1.200–2.500 em concessionária, R$600–1.200 em especialista independente. Correia de distribuição: 30.000 km ou 5 anos.',
  },
]

const MONSTER937_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Correia de distribuição: mesmo risco dos modelos anteriores — troque a cada 5 anos',
    body: 'O 937 mantém correia de distribuição (não corrente). Prazo: 30.000 km ou 5 anos — no Brasil, limite a 3–4 anos pelo calor. A correia permanece o elo mais crítico de todos os Ducati L-Twin. Verifique sempre ao comprar usado: é o principal critério de avaliação.',
  },
  {
    severity: 'WARN',
    title: 'Erros de DTC esporádicos no painel: reinicialização geralmente resolve',
    body: 'O 937 tem eletrônica complexa (ride-by-wire, cornering ABS, traction control). Erros DTC esporádicos sem problema real são relativamente comuns. Na maioria dos casos, desligar e religar o motor limpa o erro. Erros persistentes exigem leitura com DDS2 (ferramenta Ducati) na concessionária.',
  },
]

const MONSTER937_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Monster 937: melhor custo-benefício de manutenção da linha Monster',
    body: '1.000 km — Primeira revisão. | 15.000 km — Óleo (15W-50, ~3,5 L) + filtro HF153RC. Verificar nível arrefecimento. Lubrificar corrente 525. | 30.000 km — Revisão Desmo. Trocar correia distribuição. 4× velas NGK MAR9A-J. Filtro de ar. Fluido de freio DOT 4. | 30.000 km ou 4 anos — Líquido de arrefecimento. | 60.000 km — Óleo garfo. Rolamentos de roda.',
  },
]

// ─── MULTISTRADA 950 ─────────────────────────────────────────────────────────

const MULTISTRADA950_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 937cc (mesmo do Monster 937): óleo 15W-50, ~3,4L, filtro HF153RC',
    body: 'O motor da Multistrada 950 é o mesmo L-Twin 937cc Testastretta do Monster 937. Óleo: 15W-50 JASO MA2, ~3,4 L. Filtro alternativo: Hiflofiltro HF153RC. Corrente 525 — DID 525 ZVMX. Troca de óleo: 15.000 km. Revisão Desmo: 30.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Pneus 19" dianteiro: calibre 35 PSI solo — não use calibragem de pneu 17"',
    body: 'A Multistrada 950 usa roda dianteira 19" com pneu 110/80-R19 — calibragem diferente dos modelos com roda 17". Pressão correta: 35 PSI (dianteiro) e 38 PSI (traseiro 150/70-R17) para piloto solo. Com garupa e bagagem: 38 PSI frente, 44 PSI trás. Confundir com calibragem de naked 17" prejudica o manuseio em off-road.',
  },
  {
    severity: 'OK',
    title: 'Uso off-road: reduza para 23–26 PSI nos dois eixos em trilha e estrada de terra',
    body: 'Para uso leve off-road e estradas de terra, reduza a pressão para 23–26 PSI nos dois eixos. Maior área de contato do pneu melhora a tração e absorção de impactos. Retorne para a pressão de asfalto (35/38 PSI) ao voltar para a estrada pavimentada.',
  },
]

const MULTISTRADA950_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Correia distribuição: 30.000 km ou 5 anos — mesmo risco dos Monster',
    body: 'Motor 937cc mantém correia de distribuição com prazo de 30.000 km ou 5 anos. No Brasil: limite de 3–4 anos. O risco de ruptura catastrófica é idêntico aos modelos naked. Inspecione a correia ao comprar qualquer Multistrada 950 usada e exija comprovante de troca.',
  },
  {
    severity: 'WARN',
    title: 'Sensor ABS acumula sujeira em uso off-road — limpe a cada 3.000 km em terra',
    body: 'Uso em estradas de terra e trilhas entope o sensor de velocidade do ABS com lama e detritos. ABS sujo pode acionar indevidamente em piso irregular. A cada 3.000 km de uso off-road, limpe os sensores de velocidade de roda com pano úmido — sem solvente agressivo. Sensor danificado custa R$400–800 para substituir.',
  },
]

const MULTISTRADA950_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Multistrada 950: adventure com motor 937cc',
    body: '1.000 km — Primeira revisão. | 15.000 km — Óleo (15W-50, ~3,4 L) + filtro HF153RC. Lubrificar corrente. Verificar arrefecimento. Limpar sensores ABS se usada off-road. | 30.000 km — Revisão Desmo. Trocar correia. 4× velas NGK MAR9A-J. Filtro de ar. Fluido de freio DOT 4. | 4 anos — Líquido de arrefecimento. | 60.000 km — Óleo garfo. Rolamentos de roda. Inspeção da suspensão.',
  },
]

// ─── MULTISTRADA 1260 ────────────────────────────────────────────────────────

const MULTISTRADA1260_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor Testastretta DVT 1262cc: óleo 15W-50, ~3,8L, filtro HF153RC',
    body: 'Motor 1262cc 4v/cil com distribuição variável DVT (Desmodromic Variable Timing). Óleo: 15W-50 sintético JASO MA2, ~3,8 L. Filtro alternativo: Hiflofiltro HF153RC. Corrente roda: 525. Troca de óleo: 15.000 km. Revisão Desmo: 30.000 km. Vela: NGK MAR9A-J (4 totais).',
  },
  {
    severity: 'WARN',
    title: 'DVT (distribuição variável): sistema eletrônico complexo — evite água no chicote',
    body: 'O sistema DVT do Testastretta 1262cc adiciona atuadores eletrônicos ao comando de válvulas. Maior complexidade significa mais pontos de falha elétrica. Em lavagem da moto, evite jatos de água diretamente nos conectores do chicote. Eletrônica molhada é a causa mais comum de erros DTC esporádicos neste motor.',
  },
  {
    severity: 'OK',
    title: 'Recall cavalete lateral (2015–2016): verifique se foi corrigido antes de comprar',
    body: 'Multistrada dos anos 2015–2016 teve recall de parafuso do cavalete lateral incorreto (15mm instalado onde deveria ser 17mm) — cavalete pode retrair enquanto a moto está em movimento. Antes de comprar qualquer Multistrada 1200/1260 do período, verifique o VIN no site oficial Ducati se o recall foi executado.',
  },
]

const MULTISTRADA1260_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall cabo acelerador 2010–2014: verificar VIN antes de qualquer compra',
    body: 'A Multistrada 1200 (2010–2014) teve recall do cabo de acelerador interno que podia soltar causando aceleração descontrolada. Recall afetou 5.962 unidades na América do Norte — verificar se atingiu o Brasil. Consulte ducati.com com o VIN para confirmar se todos os recalls foram executados.',
  },
  {
    severity: 'WARN',
    title: 'Bomba de combustível: sensor de nível pode travar — indica reservatório cheio ou vazio',
    body: 'Problema relatado na Multistrada 1200/1260: o braço do sensor de nível de combustível trava na posição de cheio ou vazio. Sintoma: indicador de combustível que nunca muda mesmo após abastecimento. Substituição do conjunto (bomba + sensor): R$800–1.500. Verifique comportamento do marcador ao test-drive de compra.',
  },
  {
    severity: 'WARN',
    title: 'Regulador/retificador: versões antigas podem falhar e superaquecer a bateria',
    body: 'Multistrada 1200 primeira geração (2010–2013) teve relatos de falha do regulador de tensão com tendência a superaquecimento. Resultado: bateria que cozinha ou não carrega. Sintoma: luz de alternador no painel, bateria que não segura carga. Substituição por regulador de qualidade (Mosfet): R$300–600.',
  },
]

const MULTISTRADA1260_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Multistrada 1200/1260: adventure com motor Testastretta DVT',
    body: '1.000 km — Primeira revisão. | 15.000 km — Óleo (15W-50, ~3,8 L) + filtro HF153RC. | 30.000 km — Revisão Desmo. Trocar correia distribuição. 4× velas NGK MAR9A-J. Filtro de ar. Fluido de freio DOT 4. | 2 anos — Fluido de freio DOT 4 (independente de km). | 4 anos — Líquido de arrefecimento. | 60.000 km — Velas NGK MAR9A-J (modelos com intervalo de 60.000 km). Óleo garfo. Rolamentos.',
  },
]

// ─── MULTISTRADA V2 ──────────────────────────────────────────────────────────

const MULTISTRADAV2_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor V2 937cc: mesmas specs da MTS 950 — Desmo 30.000 km, sem correia a 2 anos',
    body: 'A Multistrada V2 (2021+) usa o mesmo motor L-Twin 937cc da MTS 950. Óleo: 15W-50 JASO MA2, ~3,4 L, filtro HF153RC. Correia: 30.000 km ou 5 anos. Revisão Desmo: 30.000 km. Vela: NGK MAR9A-J (4 totais). Troca de óleo: 15.000 km ou 12 meses.',
  },
  {
    severity: 'OK',
    title: 'Pneus 19/17": calibre 34 PSI frente, 38 PSI trás — ajuste para off-road e carga',
    body: 'Pneus: 110/80-R19 (frente) e 150/70-R17 (trás). Pressão base: 34 PSI dianteiro, 38 PSI traseiro (solo). Com garupa e bagagem: 36 PSI frente, 44 PSI trás. Off-road leve: 23–26 PSI em ambos. O modelo V2 tem ajuste eletrônico de suspensão que considera a pressão dos pneus na calibração.',
  },
]

const MULTISTRADAV2_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Correia de distribuição: mesma crítica da MTS 950 — prazo 5 anos/30.000 km',
    body: 'Motor 937cc mantém correia de distribuição. Prazo: 30.000 km ou 5 anos. No Brasil: recomendado 3–4 anos pelo clima. A troca preventiva é muito mais barata que a reconstrução do motor. Verifique histórico ao comprar uma Multistrada V2 usada.',
  },
]

const MULTISTRADAV2_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Multistrada V2: idêntico à MTS 950',
    body: '15.000 km ou 12 meses — Óleo + filtro HF153RC. | 30.000 km — Revisão Desmo + correia + velas + filtro ar + fluido de freio. | 4 anos — Líquido de arrefecimento. | 60.000 km — Óleo garfo + rolamentos. Atenção: se usar em off-road, limpe sensores ABS e inspecione a moto com mais frequência.',
  },
]

// ─── MULTISTRADA V4 ──────────────────────────────────────────────────────────

const MULTISTRADAV4_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor V4 Granturismo: revisão de válvulas apenas aos 60.000 km — revolução para Ducati',
    body: 'O motor V4 Granturismo 1158cc da Multistrada V4 usa corrente de timing (sem correia) e tem o maior intervalo de revisão de válvulas de toda a história Ducati: 60.000 km. É o Ducati com menor custo de manutenção proporcional. Óleo: 15W-50 sintético, cada 15.000 km ou 24 meses. Vela: NGK T00132U (código único deste motor), troca 60.000 km.',
  },
  {
    severity: 'OK',
    title: 'Filtro Hiflofiltro HF159 — mesmo dos modelos SBK/V4 esportivos',
    body: 'O motor V4 Granturismo usa o filtro HF159 da linha Hiflofiltro — mesmo dos Panigale/Streetfighter V4. Custo: R$50–80 no ML vs R$150–200 do original Ducati. Corrente roda traseira: 525 — DID 525 ZVMX. Sistema de monobraço traseiro: tensão da corrente via excêntrico (diferente dos modelos convencionais).',
  },
  {
    severity: 'WARN',
    title: 'TPMS integrado: monitore a pressão dos pneus — sistema alerta quando cai',
    body: 'A Multistrada V4 tem TPMS (monitoramento de pressão de pneus) integrado. Se o sensor alertar pressão baixa, verifique imediatamente — não ignore. Em uso off-road, é comum reduzir a pressão intencionalmente (use o modo de pilotagem adequado que ajusta os alertas). Sensores TPMS: R$200–400 cada se precisar substituir.',
  },
]

const MULTISTRADAV4_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Eletrônica avançada: 5 modos de pilotagem, radar, TPMS — falhas de sensor são possíveis',
    body: 'O sistema eletrônico da Multistrada V4 é o mais complexo da linha. Radar de ponto cego, TPMS, IMU, suspensão eletrônica e 5 modos de pilotagem somam muitos componentes. Falhas de sensor eletrônico (não mecânico) são a queixa mais comum nos modelos 2021–2022. Atualização de firmware via concessionária costuma resolver.',
  },
  {
    severity: 'WARN',
    title: 'Substituição da corrente traseira mais trabalhosa pelo monobraço',
    body: 'O sistema de monobraço traseiro da Multistrada V4 torna a substituição da corrente 525 mais trabalhosa que nos modelos com dois amortecedores e eixo convencional. O excêntrico de ajuste é diferente. Custo de mão de obra para troca de corrente em concessionária é maior que em outros modelos. Kit corrente: DID 525 ZVMX.',
  },
]

const MULTISTRADAV4_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Multistrada V4: o Ducati de menor custo de manutenção',
    body: '15.000 km ou 24 meses — Óleo (15W-50, ~4,5 L motor V4) + filtro HF159. Lubrificar corrente. | 30.000 km — Filtro de ar. | 45.000 km ou 2 anos — Fluido de freio DOT 4. | 60.000 km — Revisão de válvulas V4 Granturismo. 4× velas NGK T00132U. | 4 anos — Líquido de arrefecimento. | 90.000 km — Rolamentos de roda. Óleo garfo (suspensão eletrônica Öhlins Smart EC 2.0).',
  },
]

// ─── SCRAMBLER ICON ──────────────────────────────────────────────────────────

const SCRAMBLERICON_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 803cc 2v: mesmo coração do Monster 797 — specs idênticas de manutenção',
    body: 'O Scrambler Icon usa o motor L-Twin 803cc 2v/cil ar+óleo do Monster 797. Óleo: 15W-50 JASO MA2, ~3,1 L. Filtro: Hiflofiltro HF153RC. Vela: NGK DCPR8E, gap 0,7–0,9 mm. Corrente: 520 — DID 520 ZVMX. Revisão Desmo: 12.000 km. Correia: 24.000 km ou 2 anos (no manual: 5 anos, mas no Brasil: 2–3 anos por segurança).',
  },
  {
    severity: 'OK',
    title: 'Corrente 520: lubrifique a cada 1.000 km — 104 elos padrão',
    body: 'O Scrambler usa corrente 520 com 104 elos. Lubrifique a cada 1.000 km (ou após cada chuva). Kit completo de substituição: DID 520 ZVMX ou RK 520 ZXW — R$350–550 vs R$700+ original. Tensão: 28–30 mm de folga. Elo mestre: use presilha com presilha de segurança, não o tipo prensa-elo.',
  },
  {
    severity: 'WARN',
    title: 'Calor em congestionamento: motor a ar+óleo aquece muito — normal mas desconfortável',
    body: 'Como todos os motores Ducati a ar+óleo, o Scrambler 803cc esquenta bastante em trânsito parado. O visual retrô exige abertura de ar na carenagem — o Scrambler tem menos proteção ainda. Use calça com protetor de joelho e perna. Evite ralenti por mais de 10 minutos com a moto parada em dia quente.',
  },
]

const SCRAMBLERICON_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Correia de distribuição: o mesmo risco crítico de todos os 2v — troque a cada 2 anos',
    body: 'Motor 2v 803cc tem a mesma correia crítica do 696/797. O manual diz 5 anos, mas no Brasil o calor envelhece a borracha mais rápido — limite de 2–3 anos. Correia rompida em um Scrambler custa R$12.000–18.000 para reconstruir o motor. Verifique sempre ao comprar usado e exija nota fiscal da troca.',
  },
  {
    severity: 'DANGER',
    title: 'Revisão Desmo a cada 12.000 km: R$800–1.500 — frequente, mas necessário',
    body: 'Motor 2v tem revisão Desmo obrigatória a cada 12.000 km. 8 folgas de válvulas (4 por cilindro). Custo elevado para um visual "simples". Esta é a dor mais relatada pelos donos de Scrambler no Brasil — a manutenção "italiana" em um visual que parece simples. Mecânicos especializados em Ducati são a saída mais econômica.',
  },
  {
    severity: 'WARN',
    title: 'TPS — Throttle Position Sensor: mesma falha do 696/797, safe mode a 4.000 rpm',
    body: 'O motor 2v 803cc compartilha o mesmo problema de TPS dos outros modelos 2v. Sensor de posição da borboleta falha por desgaste interno — moto entra em safe mode limitada a 4.000 rpm. Faça reset do TPS após qualquer desconexão de bateria. Troca do TPS: R$200–400 mais mão de obra.',
  },
]

const SCRAMBLERICON_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Scrambler Icon: motor 2v italiano com manutenção cara mas simples',
    body: '1.000 km — Primeira revisão. | 12.000 km — Óleo (15W-50, ~3,1 L) + filtro HF153RC. Verificar 8 folgas Desmo. Inspecionar correia. Lubrificar corrente. | 24.000 km — Trocar correia (OBRIGATÓRIO; máx. 2–3 anos no Brasil). Vela NGK DCPR8E. Filtro de ar. Fluido de freio DOT 4. | 48.000 km — Óleo garfo dianteiro. Rolamentos de roda. Verificar junta da cames (tendência a vazar).',
  },
]

// ─── SCRAMBLER DESERT SLED ───────────────────────────────────────────────────

const SCRAMBLERDSLЕД_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesmo motor 803cc do Icon — diferença é a roda 19" e suspensão mais alta',
    body: 'O Desert Sled usa o mesmo motor L-Twin 803cc 2v/cil do Scrambler Icon. Specs idênticas: óleo 15W-50, filtro HF153RC, vela DCPR8E, correia 24.000km/2 anos, Desmo 12.000 km. A grande diferença é a roda dianteira 19" (vs 17" do Icon) e a suspensão com maior curso de mola — ideal para estradões e off-road leve.',
  },
  {
    severity: 'OK',
    title: 'Pneu 19" dianteiro: calibre 32 PSI na rua — menos que a maioria das motos com 17"',
    body: 'Pneu dianteiro 110/80-R19 requer calibragem de 32 PSI (solo, frio) — menor que as motos com roda 17". Para off-road e estradas de terra: reduza para 22–25 PSI para maior aderência. Traseiro 180/55-R17: 32 PSI (rua), 22–25 PSI (off-road). Retorne à pressão de rua ao sair do asfalto.',
  },
  {
    severity: 'WARN',
    title: 'Off-road: limpe a corrente e lubrifique após uso em terra ou chuva',
    body: 'Uso em estradas de terra e trilhas exige manutenção mais frequente da corrente 520. Após qualquer uso off-road: limpe a corrente com pano umedecido com querosene, seque e lubrifique com spray específico para correntes. Areia e barro aceleram o desgaste — corrente mal conservada dura metade do tempo esperado.',
  },
]

const SCRAMBLERDSLЕД_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Mesmos riscos do Scrambler Icon: correia 2 anos, Desmo 12.000 km',
    body: 'Motor idêntico ao Icon = mesmos riscos. Correia de distribuição: máximo 2–3 anos no Brasil. Revisão Desmodromica: a cada 12.000 km. Proprietários que usam a moto off-road tendem a rodar mais km/ano — atenção redobrada para não ultrapassar os intervalos de manutenção do motor.',
  },
  {
    severity: 'WARN',
    title: 'Uso off-road acelera desgaste da suspensão: inspecione bengala e amortecedor',
    body: 'A bengala dianteira de 46mm tem vedantes que podem vazar mais rápido com uso em off-road (terra e pedras criam impactos mais altos). A cada 15.000 km ou anualmente, inspecione se há vazamento de óleo na bengala. Vedante vazando compromete o amortecimento e é risco em frenagem.',
  },
]

const SCRAMBLERDSLЕД_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Desert Sled: igual ao Icon com cuidados extras para uso off-road',
    body: '1.000 km — Primeira revisão. | 12.000 km — Óleo (15W-50, ~3,1 L) + filtro HF153RC. Revisão Desmo. Inspecionar correia. Limpar e lubrificar corrente. | 24.000 km — Trocar correia (máx. 2–3 anos). Vela NGK DCPR8E. Filtro de ar. Fluido de freio DOT 4. | Off-road: limpe corrente e sensores ABS após cada saída. Inspecione bengala a cada 15.000 km ou 12 meses.',
  },
]

// ─── SCRAMBLER 1100 ──────────────────────────────────────────────────────────

const SCRAMBLER1100_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 1079cc 2v — o maior e mais potente da linha Scrambler; óleo 15W-50, ~3,7L',
    body: 'O Scrambler 1100 usa o motor L-Twin 1079cc 2v/cil a ar+óleo — mesmo bloco do antigo Monster 1100 EVO. Óleo: 15W-50 JASO MA2, ~3,7 L. Filtro: Hiflofiltro HF153RC. Vela: NGK DCPR8E. Corrente: 520. Revisão Desmo: 12.000 km. Correia: 24.000 km ou 2 anos.',
  },
  {
    severity: 'WARN',
    title: 'Motor 1100cc gera muito mais calor que o 803cc em congestionamento',
    body: 'O motor de maior cilindrada da linha Scrambler gera calor significativamente maior que o 803cc em uso urbano. É o modelo menos adequado para uso exclusivo em cidade com muito trânsito. Em uso fora de cidade (estradas abertas, interior), o calor não é problema — o vento natural refrigera adequadamente.',
  },
]

const SCRAMBLER1100_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Correia de distribuição: troque a cada 2 anos — motor 1100cc tem mais stress na correia',
    body: 'Motor de maior cilindrada coloca mais carga sobre a correia de distribuição. Prazo máximo no Brasil: 2 anos (não estique para 3 como no 803cc). Correia rompida em motor 1100cc causa dano ainda mais caro de reparar: R$20.000–30.000 para reconstrução. Verifique histórico sempre ao comprar.',
  },
  {
    severity: 'DANGER',
    title: 'Revisão Desmo a cada 12.000 km: custo R$800–1.500 — igual ao 803cc mas motor maior',
    body: 'Motor 2v de 1100cc tem o mesmo intervalo Desmo de 12.000 km. O processo é idêntico: verificar as 8 folgas de válvulas. Custo similar ao 803cc, mas motor maior significa peças mais caras se algo precisar ser substituído. Mecânicos especializados em Ducati: buscar no Facebook grupos "Ducati Brasil" por indicações.',
  },
]

const SCRAMBLER1100_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Scrambler 1100: motor 2v de alta cilindrada, manutenção intensa',
    body: '1.000 km — Primeira revisão. | 12.000 km — Óleo (15W-50, ~3,7 L) + filtro HF153RC. Revisão Desmo (8 folgas). Verificar tensão correia. | 24.000 km — Trocar correia (OBRIGATÓRIO, máx. 2 anos). Vela NGK DCPR8E. Filtro de ar. Fluido de freio DOT 4. | 60.000 km — Óleo garfo. Rolamentos de roda. Inspecionar vedantes bengala dianteira.',
  },
]

// ─── HYPERMOTARD 950 ─────────────────────────────────────────────────────────

const HYPERMOTARD950_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 937cc 4v — mesmo do Monster 937; Desmo 30.000 km, correia 5 anos',
    body: 'A Hypermotard 950 usa o motor L-Twin 937cc Testastretta — mesmo bloco do Monster 937. Óleo: 15W-50 JASO MA2, ~3,5 L. Filtro: Hiflofiltro HF153RC. Vela: NGK MAR9A-J (4 totais). Corrente: 525 — DID 525 ZVMX. Revisão Desmo: 30.000 km. Correia: 30.000 km ou 5 anos (Brasil: 3–4 anos).',
  },
  {
    severity: 'WARN',
    title: 'Bateria descarrega em 2–4 meses parada: use carregador de manutenção (battery tender)',
    body: 'A Hypermotard 950 tem consumo parasítico elevado dos módulos eletrônicos (ECU, ABS, controle de tração) mesmo com a moto desligada. Se ficar parada por mais de 6 semanas, a bateria pode descarregar completamente. Use um carregador de manutenção (R$80–150 no ML) conectado quando guardar a moto por período prolongado.',
  },
  {
    severity: 'OK',
    title: 'Pneu 17" nos dois eixos: calibre 36 PSI frente, 42 PSI trás (solo)',
    body: 'A Hypermotard 950 usa 120/70-ZR17 na frente e 180/55-ZR17 atrás — configuração padrão das naked esportivas. Pressão: 36 PSI frente, 42 PSI trás (solo, frio). Com garupa: 38 PSI frente, 44 PSI trás. Na versão RVE (off-road): consulte o manual específico para pressões mais baixas adequadas ao pneu dual sport.',
  },
]

const HYPERMOTARD950_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Correia distribuição: prazo crítico de 5 anos/30.000 km — no Brasil, 3–4 anos',
    body: 'Motor 937cc com correia de distribuição. Prazo oficial: 30.000 km ou 5 anos. No clima tropical brasileiro: reduza para 3–4 anos máximo. Correia rompida = destruição do motor. Custo de reconstrução: R$15.000–25.000. Esta é a maior despesa potencial de qualquer Ducati com correia.',
  },
  {
    severity: 'WARN',
    title: 'Quick-Shifter falso neutro e mangueira de combustível dobrando após manutenção',
    body: 'Dois problemas reportados na 950: (1) DQS com falso neutro em RPM baixo — mesmo problema dos outros Ducati. (2) Mangueira de combustível pode dobrar ao reinstalar o tanque após manutenção, causando odor de gasolina. Sempre verifique a posição das mangueiras ao reinstalar o tanque.',
  },
]

const HYPERMOTARD950_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Hypermotard 950: motor 937cc, manutenção espaçada',
    body: '1.000 km — Primeira revisão. | 15.000 km — Óleo (15W-50, ~3,5 L) + filtro HF153RC. Verificar nível arrefecimento. Lubrificar corrente. | 30.000 km — Revisão Desmo. Trocar correia. 4× velas NGK MAR9A-J. Filtro de ar. Fluido de freio DOT 4. | 4 anos — Líquido de arrefecimento. | 60.000 km — Óleo garfo. Rolamentos. Inspecionar amortecedor traseiro.',
  },
]

// ─── DIAVEL 1260 ─────────────────────────────────────────────────────────────

const DIAVEL1260_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor Testastretta DVT 1262cc: óleo 15W-50, ~3,8L, filtro HF153RC, Desmo 30.000 km',
    body: 'O Diavel 1260 usa o mesmo motor 1262cc DVT da Multistrada 1260. Óleo: 15W-50 JASO MA2, ~3,8 L. Filtro: Hiflofiltro HF153RC. Vela: NGK MAR9A-J (4 totais, 2 por cabeçote). Revisão Desmo: 30.000 km. Correia: 30.000 km ou 5 anos (Brasil: 3–4 anos). Troca de óleo: 15.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Pneu traseiro 240/45-ZR17: calibre 36 PSI — pneu único, não facilmente substituível',
    body: 'O Diavel usa pneu traseiro 240/45-ZR17 — um dos maiores pneus de série em motos de rua. A pressão correta é 36 PSI (solo) e 42 PSI (com garupa). ATENÇÃO: não é fácil encontrar este pneu no Brasil — Pirelli Diablo Rosso III 240/45 é o OEM e tem disponibilidade limitada. Antes de qualquer viagem, verifique se há um pneu traseiro disponível no destino ou próximo à rota.',
  },
  {
    severity: 'OK',
    title: 'Modos de pilotagem: Sport vs Urban faz diferença real no consumo e conforto',
    body: 'O Diavel 1260 tem modos Sport (105 cv, resposta total) e Urban (100 cv, resposta mais suave). Em cidade, modo Urban reduz o solavanco ao abrir o gás e melhora o consumo em 10–15%. Para rodovias: modo Sport. O peso de 230+ kg é gerenciado melhor com modo Urban em manobras de baixa velocidade.',
  },
]

const DIAVEL1260_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Correia distribuição 1262cc: mesma criticidade dos outros modelos — 3–4 anos no Brasil',
    body: 'Motor 1262cc DVT mantém correia de distribuição com prazo de 30.000 km ou 5 anos. No Brasil: 3–4 anos máximo. Motor de maior cilindrada = custo de reconstrução mais alto se a correia romper: R$25.000–40.000. Insista em ver comprovante de troca de correia ao comprar um Diavel usado.',
  },
  {
    severity: 'WARN',
    title: 'Regulador/retificador: primeira geração (2011–2014) com tendência a superaquecer',
    body: 'O Diavel primeira geração (2011–2014) teve recall de regulador de tensão com tendência a superaquecimento — mesmo problema da Multistrada 1200 do período. Sintoma: bateria que carrega demais (acima de 15V) ou não carrega. Verifique o VIN e histórico de recalls ao comprar um Diavel 2011–2014.',
  },
]

const DIAVEL1260_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Diavel 1260: power cruiser com motor Testastretta DVT',
    body: '1.000 km — Primeira revisão. | 15.000 km — Óleo (15W-50, ~3,8 L) + filtro HF153RC. Verificar nível arrefecimento. | 30.000 km — Revisão Desmo. Trocar correia. 4× velas NGK MAR9A-J. Filtro de ar. Fluido de freio DOT 4. | 4 anos — Líquido de arrefecimento. | 60.000 km — Velas (se intervalo for 60.000 km no seu modelo). Óleo garfo. Rolamentos. Verificar pneu traseiro 240/45 para disponibilidade.',
  },
]

// ─── SUPERSPORT ───────────────────────────────────────────────────────────────

const SUPERSPORT_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 937cc: correia 30.000 km, Desmo 30.000 km — specs idênticas ao Monster 937',
    body: 'A SuperSport usa o motor L-Twin 937cc Testastretta do Monster 937 em configuração com carenagem. Óleo: 15W-50 JASO MA2, ~3,5 L. Filtro: Hiflofiltro HF153RC. Vela: NGK MAR9A-J (4 totais). Corrente: 525. Troca de óleo: 15.000 km. Revisão Desmo: 30.000 km. Correia: 30.000 km ou 5 anos.',
  },
  {
    severity: 'WARN',
    title: 'Espelhos retrovisores: vibram em faixa específica de RPM — problema relatado em fóruns',
    body: 'Os espelhos originais da SuperSport vibram excessivamente entre 6.000–7.000 rpm, tornando a visão traseira inutilizável nessa faixa. Solução: instalar inserts de vibração anti-rotação nos espelhos (R$80–150) ou substituir pelos espelhos da versão SuperSport S que tem peso diferente. Problema amplamente relatado nos fóruns internacionais.',
  },
  {
    severity: 'WARN',
    title: 'Throttle-by-wire: resposta pobre abaixo de 3.000 rpm — use modo Sport em cidade',
    body: 'A gestão eletrônica de emissões Euro 5 da SuperSport 937 embota a resposta do acelerador abaixo de 2.500–3.000 rpm. Em modo Urban, a resposta é deliberadamente lenta. Use modo Sport na cidade para melhorar a resposta em situações de emergência. Atualização de mapa de ECU via concessionária pode ajudar minimamente.',
  },
]

const SUPERSPORT_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Correia de distribuição: mesmo risco crítico dos L-Twin — troque a cada 30.000 km ou 3–4 anos',
    body: 'Motor 937cc com correia de distribuição tem o mesmo risco de rompimento catastrófico de qualquer outro Ducati L-Twin. Prazo: 30.000 km ou 5 anos (Brasil: 3–4 anos). Correia rompida = motor destruído. Custo de reconstrução: R$15.000–25.000. Verifique sempre o histórico ao comprar usada.',
  },
  {
    severity: 'WARN',
    title: 'DQS falso neutro e salto de 6ª→5ª em desaceleração abrupta',
    body: 'Dois problemas relatados na SuperSport: (1) DQS com falso neutro ao upshift abaixo de 5.000 rpm — comum em todos os Ducati com o sistema. (2) Relatos de pulo involuntário de 6ª para 5ª em desaceleração brusca em curva. Manter o DQS desativado em uso urbano pode evitar ambos os problemas.',
  },
]

const SUPERSPORT_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma SuperSport: motor 937cc com carenagem — acesso ao motor exige mais desmontagem',
    body: '1.000 km — Primeira revisão. | 15.000 km — Óleo (15W-50, ~3,5 L) + filtro HF153RC. | 30.000 km — Revisão Desmo. Trocar correia. 4× velas NGK MAR9A-J. Filtro de ar. Fluido de freio/embreagem DOT 4. A carenagem da SuperSport exige remoção de painéis laterais para acesso ao motor — custo de mão de obra ligeiramente maior que nas naked. | 4 anos — Líquido de arrefecimento. | 60.000 km — Óleo garfo. Rolamentos.',
  },
]

// ─── BLOCKS ──────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  { modelName: 'MONSTER 696',        yearFrom: 2008, yearTo: 2014, MACETES: MONSTER696_MACETES,       PROBLEMAS: MONSTER696_PROBLEMAS,       MANUTENCAO: MONSTER696_MANUTENCAO },
  { modelName: 'MONSTER 797',        yearFrom: 2017, yearTo: 2020, MACETES: MONSTER797_MACETES,       PROBLEMAS: MONSTER797_PROBLEMAS,       MANUTENCAO: MONSTER797_MANUTENCAO },
  { modelName: 'MONSTER 821',        yearFrom: 2014, yearTo: 2020, MACETES: MONSTER821_MACETES,       PROBLEMAS: MONSTER821_PROBLEMAS,       MANUTENCAO: MONSTER821_MANUTENCAO },
  { modelName: 'MONSTER 1100 EVO',   yearFrom: 2009, yearTo: 2013, MACETES: MONSTER1100EVO_MACETES,   PROBLEMAS: MONSTER1100EVO_PROBLEMAS,   MANUTENCAO: MONSTER1100EVO_MANUTENCAO },
  { modelName: 'MONSTER 1200',       yearFrom: 2014, yearTo: 2020, MACETES: MONSTER1200_MACETES,      PROBLEMAS: MONSTER1200_PROBLEMAS,      MANUTENCAO: MONSTER1200_MANUTENCAO },
  { modelName: 'MONSTER 937',        yearFrom: 2021, yearTo: null, MACETES: MONSTER937_MACETES,       PROBLEMAS: MONSTER937_PROBLEMAS,       MANUTENCAO: MONSTER937_MANUTENCAO },
  { modelName: '848 EVO',            yearFrom: 2008, yearTo: 2013, MACETES: EVO848_MACETES,           PROBLEMAS: EVO848_PROBLEMAS,           MANUTENCAO: EVO848_MANUTENCAO },
  { modelName: '959 PANIGALE',       yearFrom: 2016, yearTo: 2019, MACETES: PANIGALE959_MACETES,      PROBLEMAS: PANIGALE959_PROBLEMAS,      MANUTENCAO: PANIGALE959_MANUTENCAO },
  { modelName: '1098',               yearFrom: 2007, yearTo: 2012, MACETES: DUCATI1098_MACETES,       PROBLEMAS: DUCATI1098_PROBLEMAS,       MANUTENCAO: DUCATI1098_MANUTENCAO },
  { modelName: 'PANIGALE V2',        yearFrom: 2020, yearTo: null, MACETES: PANIGALEV2_MACETES,       PROBLEMAS: PANIGALEV2_PROBLEMAS,       MANUTENCAO: PANIGALEV2_MANUTENCAO },
  { modelName: 'PANIGALE V4',        yearFrom: 2018, yearTo: null, MACETES: PANIGALEV4_MACETES,       PROBLEMAS: PANIGALEV4_PROBLEMAS,       MANUTENCAO: PANIGALEV4_MANUTENCAO },
  { modelName: 'STREETFIGHTER V4',   yearFrom: 2020, yearTo: null, MACETES: STREETFIGHTERV4_MACETES,  PROBLEMAS: STREETFIGHTERV4_PROBLEMAS,  MANUTENCAO: STREETFIGHTERV4_MANUTENCAO },
  { modelName: 'STREETFIGHTER V2',   yearFrom: 2022, yearTo: null, MACETES: STREETFIGHTERV2_MACETES,  PROBLEMAS: STREETFIGHTERV2_PROBLEMAS,  MANUTENCAO: STREETFIGHTERV2_MANUTENCAO },
  { modelName: 'MULTISTRADA 950',    yearFrom: 2017, yearTo: null, MACETES: MULTISTRADA950_MACETES,   PROBLEMAS: MULTISTRADA950_PROBLEMAS,   MANUTENCAO: MULTISTRADA950_MANUTENCAO },
  { modelName: 'MULTISTRADA 1260',   yearFrom: 2010, yearTo: 2021, MACETES: MULTISTRADA1260_MACETES,  PROBLEMAS: MULTISTRADA1260_PROBLEMAS,  MANUTENCAO: MULTISTRADA1260_MANUTENCAO },
  { modelName: 'MULTISTRADA V2',     yearFrom: 2021, yearTo: null, MACETES: MULTISTRADAV2_MACETES,    PROBLEMAS: MULTISTRADAV2_PROBLEMAS,    MANUTENCAO: MULTISTRADAV2_MANUTENCAO },
  { modelName: 'MULTISTRADA V4',     yearFrom: 2021, yearTo: null, MACETES: MULTISTRADAV4_MACETES,    PROBLEMAS: MULTISTRADAV4_PROBLEMAS,    MANUTENCAO: MULTISTRADAV4_MANUTENCAO },
  { modelName: 'SCRAMBLER ICON',     yearFrom: 2015, yearTo: null, MACETES: SCRAMBLERICON_MACETES,    PROBLEMAS: SCRAMBLERICON_PROBLEMAS,    MANUTENCAO: SCRAMBLERICON_MANUTENCAO },
  { modelName: 'SCRAMBLER DESERT SLED', yearFrom: 2017, yearTo: null, MACETES: SCRAMBLERDSLЕД_MACETES, PROBLEMAS: SCRAMBLERDSLЕД_PROBLEMAS, MANUTENCAO: SCRAMBLERDSLЕД_MANUTENCAO },
  { modelName: 'SCRAMBLER 1100',     yearFrom: 2018, yearTo: null, MACETES: SCRAMBLER1100_MACETES,    PROBLEMAS: SCRAMBLER1100_PROBLEMAS,    MANUTENCAO: SCRAMBLER1100_MANUTENCAO },
  { modelName: 'HYPERMOTARD 950',    yearFrom: 2016, yearTo: null, MACETES: HYPERMOTARD950_MACETES,   PROBLEMAS: HYPERMOTARD950_PROBLEMAS,   MANUTENCAO: HYPERMOTARD950_MANUTENCAO },
  { modelName: 'DIAVEL 1260',        yearFrom: 2011, yearTo: null, MACETES: DIAVEL1260_MACETES,       PROBLEMAS: DIAVEL1260_PROBLEMAS,       MANUTENCAO: DIAVEL1260_MANUTENCAO },
  { modelName: 'SUPERSPORT',         yearFrom: 2017, yearTo: null, MACETES: SUPERSPORT_MACETES,       PROBLEMAS: SUPERSPORT_PROBLEMAS,       MANUTENCAO: SUPERSPORT_MANUTENCAO },
]

// ─── TIRE PRESSURES ──────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'MONSTER 696',      yearFrom: 2008, yearTo: 2014, tireSize: '120/70-ZR17 (F) · 150/70-ZR17 (R)', frontPsi: 33, rearPsi: 36, frontPsiLoad: 33, rearPsiLoad: 40, notes: 'Naked L-Twin 696cc. Com garupa: traseiro 40 PSI. Calibre com pneu frio.' },
  { modelName: 'MONSTER 797',      yearFrom: 2017, yearTo: 2020, tireSize: '120/70-ZR17 (F) · 180/55-ZR17 (R)', frontPsi: 33, rearPsi: 36, frontPsiLoad: 36, rearPsiLoad: 40, notes: 'Naked L-Twin 803cc. Com garupa: F 36 PSI / T 40 PSI.' },
  { modelName: 'MONSTER 821',      yearFrom: 2014, yearTo: 2020, tireSize: '120/70-ZR17 (F) · 180/55-ZR17 (R)', frontPsi: 34, rearPsi: 38, frontPsiLoad: 36, rearPsiLoad: 42, notes: 'Naked L-Twin 821cc. Com garupa: F 36 PSI / T 42 PSI.' },
  { modelName: 'MONSTER 1100 EVO', yearFrom: 2009, yearTo: 2013, tireSize: '120/70-ZR17 (F) · 180/55-ZR17 (R)', frontPsi: 33, rearPsi: 36, frontPsiLoad: 36, rearPsiLoad: 40, notes: 'Naked L-Twin 1078cc. Com garupa: F 36 PSI / T 40 PSI.' },
  { modelName: 'MONSTER 1200',     yearFrom: 2014, yearTo: 2020, tireSize: '120/70-ZR17 (F) · 190/55-ZR17 (R)', frontPsi: 36, rearPsi: 42, frontPsiLoad: 38, rearPsiLoad: 44, notes: 'Naked L-Twin 1198cc. Pneu traseiro 190/55: pressão mais alta. Com garupa: F 38 / T 44 PSI.' },
  { modelName: 'MONSTER 937',      yearFrom: 2021, yearTo: null,  tireSize: '120/70-ZR17 (F) · 180/55-ZR17 (R)', frontPsi: 33, rearPsi: 36, frontPsiLoad: 36, rearPsiLoad: 42, notes: 'Naked L-Twin 937cc embreagem molhada. Com garupa: F 36 / T 42 PSI.' },
  { modelName: '848 EVO',          yearFrom: 2008, yearTo: 2013, tireSize: '120/70-ZR17 (F) · 180/55-ZR17 (R)', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 36, notes: 'SBK. Para pista: 28–30 PSI frio nos dois eixos. Rua: 33/33 PSI.' },
  { modelName: '959 PANIGALE',     yearFrom: 2016, yearTo: 2019, tireSize: '120/70-ZR17 (F) · 180/60-ZR17 (R)', frontPsi: 36, rearPsi: 42, frontPsiLoad: 38, rearPsiLoad: 44, notes: 'SBK. Rua: 36/42 PSI. Pista: 28–30 PSI frio. Verificar temperatura dos pneus antes de reduzir pressão.' },
  { modelName: '1098',             yearFrom: 2007, yearTo: 2012, tireSize: '120/70-ZR17 (F) · 190/55-ZR17 (R)', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 36, notes: 'SBK 1098/1198cc. Rua: 33/33 PSI. Pista: 28 PSI frio nos dois eixos.' },
  { modelName: 'PANIGALE V2',      yearFrom: 2020, yearTo: null,  tireSize: '120/70-ZR17 (F) · 180/60-ZR17 (R)', frontPsi: 36, rearPsi: 36, frontPsiLoad: 38, rearPsiLoad: 40, notes: 'SBK V2. OEM Pirelli Diablo Rosso Corsa II. Pista: 28–30 PSI frio. Com garupa: F 38 / T 40 PSI.' },
  { modelName: 'PANIGALE V4',      yearFrom: 2018, yearTo: null,  tireSize: '120/70-ZR17 (F) · 200/60-ZR17 (R)', frontPsi: 33, rearPsi: 30, frontPsiLoad: 35, rearPsiLoad: 33, notes: 'V4. Traseiro 200/60 usa MENOS pressão que os 180/55. Pista: F 28–30 / T 26–28 PSI frio.' },
  { modelName: 'STREETFIGHTER V4', yearFrom: 2020, yearTo: null,  tireSize: '120/70-ZR17 (F) · 200/60-ZR17 (R)', frontPsi: 35, rearPsi: 36, frontPsiLoad: 36, rearPsiLoad: 38, notes: 'Naked V4. Traseiro 200/60. Com garupa: F 36 / T 38 PSI. Calibre com pneu frio.' },
  { modelName: 'STREETFIGHTER V2', yearFrom: 2022, yearTo: null,  tireSize: '120/70-ZR17 (F) · 200/60-ZR17 (R)', frontPsi: 36, rearPsi: 36, frontPsiLoad: 38, rearPsiLoad: 40, notes: 'Naked V2. Traseiro 200/60. Com garupa: F 38 / T 40 PSI.' },
  { modelName: 'MULTISTRADA 950',  yearFrom: 2017, yearTo: null,  tireSize: '110/80-R19 (F) · 150/70-R17 (R)',  frontPsi: 35, rearPsi: 38, frontPsiLoad: 38, rearPsiLoad: 44, notes: 'Adventure. Roda 19" frente. Off-road leve: 23–26 PSI. Com bagagem: F 38 / T 44 PSI.' },
  { modelName: 'MULTISTRADA 1260', yearFrom: 2010, yearTo: 2021,  tireSize: '120/70-ZR17 (F) · 190/55-ZR17 (R)', frontPsi: 36, rearPsi: 42, frontPsiLoad: 38, rearPsiLoad: 44, notes: 'Adventure 1200/1260cc. Roda 17". Com garupa+bagagem: F 38 / T 44 PSI.' },
  { modelName: 'MULTISTRADA V2',   yearFrom: 2021, yearTo: null,  tireSize: '110/80-R19 (F) · 150/70-R17 (R)',  frontPsi: 34, rearPsi: 38, frontPsiLoad: 36, rearPsiLoad: 44, notes: 'Adventure V2 937cc. Off-road: 23–26 PSI. Com bagagem completa: F 36 / T 44 PSI.' },
  { modelName: 'MULTISTRADA V4',   yearFrom: 2021, yearTo: null,  tireSize: '120/70-R19 (F) · 170/60-R17 (R)',  frontPsi: 35, rearPsi: 38, frontPsiLoad: 38, rearPsiLoad: 44, notes: 'Adventure V4 Granturismo. TPMS integrado monitora pressão. Off-road Rally: F 23 / T 23 PSI.' },
  { modelName: 'SCRAMBLER ICON',   yearFrom: 2015, yearTo: null,  tireSize: '120/70-ZR17 (F) · 180/55-ZR17 (R)', frontPsi: 36, rearPsi: 36, frontPsiLoad: 36, rearPsiLoad: 42, notes: 'Scrambler 803cc roda 17". Com garupa: T 42 PSI. Estilo retrô com pneus modernos.' },
  { modelName: 'SCRAMBLER DESERT SLED', yearFrom: 2017, yearTo: null, tireSize: '110/80-R19 (F) · 180/55-R17 (R)', frontPsi: 32, rearPsi: 32, frontPsiLoad: 32, rearPsiLoad: 38, notes: 'Roda 19" dianteira. Off-road: 22–25 PSI nos dois. Retorne para 32/32 PSI no asfalto.' },
  { modelName: 'SCRAMBLER 1100',   yearFrom: 2018, yearTo: null,  tireSize: '120/70-ZR17 (F) · 180/55-ZR17 (R)', frontPsi: 33, rearPsi: 36, frontPsiLoad: 36, rearPsiLoad: 40, notes: 'Scrambler 1079cc. Com garupa: F 36 / T 40 PSI. Motor 1100cc mais pesado.' },
  { modelName: 'HYPERMOTARD 950',  yearFrom: 2016, yearTo: null,  tireSize: '120/70-ZR17 (F) · 180/55-ZR17 (R)', frontPsi: 36, rearPsi: 42, frontPsiLoad: 38, rearPsiLoad: 44, notes: 'Supermoto 937cc. Pressão alta para máximo desempenho. Versão RVE: consultar manual para pressão dual sport.' },
  { modelName: 'DIAVEL 1260',      yearFrom: 2011, yearTo: null,  tireSize: '120/70-ZR17 (F) · 240/45-ZR17 (R)', frontPsi: 36, rearPsi: 36, frontPsiLoad: 38, rearPsiLoad: 42, notes: 'Power cruiser. Traseiro 240/45 é único — verifique disponibilidade do Pirelli Diablo antes de viagens longas. Com garupa: T 42 PSI.' },
  { modelName: 'SUPERSPORT',       yearFrom: 2017, yearTo: null,  tireSize: '120/70-ZR17 (F) · 180/55-ZR17 (R)', frontPsi: 36, rearPsi: 42, frontPsiLoad: 38, rearPsiLoad: 44, notes: 'Sport touring 937cc. Mesmas dimensões dos Monster. Com garupa: F 38 / T 44 PSI.' },
]

// ─── MAINTENANCE ITEMS ────────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // MONSTER 696
  { modelName: 'MONSTER 696', yearFrom: 2008, yearTo: 2014, component: 'Óleo motor 15W-50 JASO MA2 (~3,0 L)', intervalKm: 12000, intervalMonths: 12, notes: 'Filtro alternativo: Hiflofiltro HF153RC', priority: 'HIGH', order: 1 },
  { modelName: 'MONSTER 696', yearFrom: 2008, yearTo: 2014, component: 'Verificar folgas Desmodromicas (8 folgas)', intervalKm: 12000, intervalMonths: null, notes: 'Motor 2v/cil — 4 folgas por cilindro. Custo R$800–1.500 concessionária', priority: 'CRITICAL', order: 2 },
  { modelName: 'MONSTER 696', yearFrom: 2008, yearTo: 2014, component: 'Verificar tensão da correia de distribuição', intervalKm: 12000, intervalMonths: null, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'MONSTER 696', yearFrom: 2008, yearTo: 2014, component: 'Lubrificar corrente 520', intervalKm: 1000, intervalMonths: null, notes: 'DID 520 ZVMX ou RK 520 ZXW como kit alternativo', priority: 'MEDIUM', order: 4 },
  { modelName: 'MONSTER 696', yearFrom: 2008, yearTo: 2014, component: 'Trocar correia de distribuição', intervalKm: 24000, intervalMonths: 24, notes: 'CRÍTICO: máximo 2 anos no Brasil. Correia rompida = motor destruído', priority: 'CRITICAL', order: 5 },
  { modelName: 'MONSTER 696', yearFrom: 2008, yearTo: 2014, component: 'Vela NGK DCPR8E (gap 0,7–0,9 mm)', intervalKm: 24000, intervalMonths: null, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'MONSTER 696', yearFrom: 2008, yearTo: 2014, component: 'Filtro de ar', intervalKm: 24000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'MONSTER 696', yearFrom: 2008, yearTo: 2014, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'MONSTER 696', yearFrom: 2008, yearTo: 2014, component: 'Óleo do garfo dianteiro', intervalKm: 60000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 9 },
  { modelName: 'MONSTER 696', yearFrom: 2008, yearTo: 2014, component: 'Rolamentos de roda', intervalKm: 60000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 10 },

  // MONSTER 797
  { modelName: 'MONSTER 797', yearFrom: 2017, yearTo: 2020, component: 'Óleo motor 15W-50 JASO MA2 (~3,1 L)', intervalKm: 12000, intervalMonths: 12, notes: 'Filtro: Hiflofiltro HF153RC', priority: 'HIGH', order: 1 },
  { modelName: 'MONSTER 797', yearFrom: 2017, yearTo: 2020, component: 'Verificar folgas Desmodromicas (8 folgas)', intervalKm: 12000, intervalMonths: null, notes: 'Custo R$800–1.500 concessionária', priority: 'CRITICAL', order: 2 },
  { modelName: 'MONSTER 797', yearFrom: 2017, yearTo: 2020, component: 'Verificar tensão correia de distribuição', intervalKm: 12000, intervalMonths: null, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'MONSTER 797', yearFrom: 2017, yearTo: 2020, component: 'Lubrificar corrente 520', intervalKm: 1000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'MONSTER 797', yearFrom: 2017, yearTo: 2020, component: 'Vela NGK DCPR8E', intervalKm: 24000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'MONSTER 797', yearFrom: 2017, yearTo: 2020, component: 'Trocar correia de distribuição', intervalKm: 24000, intervalMonths: 36, notes: 'Manual: 5 anos. Brasil: máx. 3 anos pelo calor', priority: 'CRITICAL', order: 6 },
  { modelName: 'MONSTER 797', yearFrom: 2017, yearTo: 2020, component: 'Filtro de ar', intervalKm: 24000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'MONSTER 797', yearFrom: 2017, yearTo: 2020, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'MONSTER 797', yearFrom: 2017, yearTo: 2020, component: 'Rolamentos de roda', intervalKm: 60000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 9 },

  // MONSTER 821
  { modelName: 'MONSTER 821', yearFrom: 2014, yearTo: 2020, component: 'Óleo motor 15W-50 JASO MA2 (~3,5 L)', intervalKm: 15000, intervalMonths: 12, notes: 'Filtro: Hiflofiltro HF153RC', priority: 'HIGH', order: 1 },
  { modelName: 'MONSTER 821', yearFrom: 2014, yearTo: 2020, component: 'Verificar nível líquido de arrefecimento', intervalKm: 3000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'MONSTER 821', yearFrom: 2014, yearTo: 2020, component: 'Lubrificar corrente 525', intervalKm: 1000, intervalMonths: null, notes: 'DID 525 ZVMX como alternativa', priority: 'MEDIUM', order: 3 },
  { modelName: 'MONSTER 821', yearFrom: 2014, yearTo: 2020, component: 'Revisão Desmodromica (16 folgas)', intervalKm: 30000, intervalMonths: null, notes: 'R$1.200–2.500 concessionária / R$600–1.200 especialista', priority: 'CRITICAL', order: 4 },
  { modelName: 'MONSTER 821', yearFrom: 2014, yearTo: 2020, component: 'Trocar correia de distribuição', intervalKm: 30000, intervalMonths: 48, notes: 'Brasil: máx. 3–4 anos', priority: 'CRITICAL', order: 5 },
  { modelName: 'MONSTER 821', yearFrom: 2014, yearTo: 2020, component: '4× velas NGK MAR9A-J', intervalKm: 30000, intervalMonths: null, notes: '2 por cabeçote, torque 12 Nm', priority: 'HIGH', order: 6 },
  { modelName: 'MONSTER 821', yearFrom: 2014, yearTo: 2020, component: 'Filtro de ar', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'MONSTER 821', yearFrom: 2014, yearTo: 2020, component: 'Fluido de freio/embreagem DOT 4', intervalKm: null, intervalMonths: 36, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'MONSTER 821', yearFrom: 2014, yearTo: 2020, component: 'Líquido de arrefecimento (50% anticongelante)', intervalKm: null, intervalMonths: 48, notes: null, priority: 'HIGH', order: 9 },
  { modelName: 'MONSTER 821', yearFrom: 2014, yearTo: 2020, component: 'Óleo garfo dianteiro', intervalKm: 60000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 10 },

  // MONSTER 1100 EVO
  { modelName: 'MONSTER 1100 EVO', yearFrom: 2009, yearTo: 2013, component: 'Óleo motor 15W-50 JASO MA2 (~3,5 L)', intervalKm: 12000, intervalMonths: 12, notes: 'Filtro: Hiflofiltro HF153RC', priority: 'HIGH', order: 1 },
  { modelName: 'MONSTER 1100 EVO', yearFrom: 2009, yearTo: 2013, component: 'Verificar folgas Desmodromicas (8 folgas)', intervalKm: 12000, intervalMonths: null, notes: 'Motor 2v 1078cc — custo R$800–1.500', priority: 'CRITICAL', order: 2 },
  { modelName: 'MONSTER 1100 EVO', yearFrom: 2009, yearTo: 2013, component: 'Verificar tensão correia de distribuição', intervalKm: 12000, intervalMonths: null, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'MONSTER 1100 EVO', yearFrom: 2009, yearTo: 2013, component: 'Trocar correia de distribuição', intervalKm: 24000, intervalMonths: 24, notes: 'MÁXIMO 2 anos no Brasil', priority: 'CRITICAL', order: 4 },
  { modelName: 'MONSTER 1100 EVO', yearFrom: 2009, yearTo: 2013, component: 'Vela NGK DCPR8E', intervalKm: 24000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'MONSTER 1100 EVO', yearFrom: 2009, yearTo: 2013, component: 'Filtro de ar', intervalKm: 24000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'MONSTER 1100 EVO', yearFrom: 2009, yearTo: 2013, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'MONSTER 1100 EVO', yearFrom: 2009, yearTo: 2013, component: 'Inspecionar juntas tampas de cames', intervalKm: 36000, intervalMonths: null, notes: 'Tendência a vazar após 40.000 km', priority: 'MEDIUM', order: 8 },
  { modelName: 'MONSTER 1100 EVO', yearFrom: 2009, yearTo: 2013, component: 'Rolamentos de roda', intervalKm: 60000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 9 },

  // MONSTER 1200
  { modelName: 'MONSTER 1200', yearFrom: 2014, yearTo: 2020, component: 'Óleo motor 15W-50 JASO MA2 (~3,4 L)', intervalKm: 15000, intervalMonths: 12, notes: 'Filtro: Hiflofiltro HF153RC', priority: 'HIGH', order: 1 },
  { modelName: 'MONSTER 1200', yearFrom: 2014, yearTo: 2020, component: 'Lubrificar corrente 525', intervalKm: 1000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'MONSTER 1200', yearFrom: 2014, yearTo: 2020, component: 'Revisão Desmodromica (16 folgas)', intervalKm: 30000, intervalMonths: null, notes: 'R$1.200–2.500 concessionária', priority: 'CRITICAL', order: 3 },
  { modelName: 'MONSTER 1200', yearFrom: 2014, yearTo: 2020, component: 'Trocar correia de distribuição', intervalKm: 30000, intervalMonths: 48, notes: 'Brasil: máx. 3–4 anos', priority: 'CRITICAL', order: 4 },
  { modelName: 'MONSTER 1200', yearFrom: 2014, yearTo: 2020, component: '4× velas NGK MAR9A-J', intervalKm: 60000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'MONSTER 1200', yearFrom: 2014, yearTo: 2020, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 36, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'MONSTER 1200', yearFrom: 2014, yearTo: 2020, component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 48, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'MONSTER 1200', yearFrom: 2014, yearTo: 2020, component: 'Rolamentos de roda', intervalKm: 60000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 8 },

  // MONSTER 937
  { modelName: 'MONSTER 937', yearFrom: 2021, yearTo: null, component: 'Óleo motor 15W-50 JASO MA2 (~3,5 L)', intervalKm: 15000, intervalMonths: 12, notes: 'Filtro: Hiflofiltro HF153RC. Embreagem molhada — sem barulho de cascalho', priority: 'HIGH', order: 1 },
  { modelName: 'MONSTER 937', yearFrom: 2021, yearTo: null, component: 'Lubrificar corrente 525', intervalKm: 1000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'MONSTER 937', yearFrom: 2021, yearTo: null, component: 'Revisão Desmodromica (16 folgas)', intervalKm: 30000, intervalMonths: null, notes: 'R$1.200–2.500 concessionária / R$600–1.200 especialista', priority: 'CRITICAL', order: 3 },
  { modelName: 'MONSTER 937', yearFrom: 2021, yearTo: null, component: 'Trocar correia de distribuição', intervalKm: 30000, intervalMonths: 48, notes: 'Brasil: máx. 3–4 anos', priority: 'CRITICAL', order: 4 },
  { modelName: 'MONSTER 937', yearFrom: 2021, yearTo: null, component: '4× velas NGK MAR9A-J', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'MONSTER 937', yearFrom: 2021, yearTo: null, component: 'Filtro de ar', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'MONSTER 937', yearFrom: 2021, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'MONSTER 937', yearFrom: 2021, yearTo: null, component: 'Líquido de arrefecimento', intervalKm: 30000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'MONSTER 937', yearFrom: 2021, yearTo: null, component: 'Rolamentos de roda', intervalKm: 60000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 9 },

  // 848 EVO
  { modelName: '848 EVO', yearFrom: 2008, yearTo: 2013, component: 'Óleo motor 15W-50 JASO MA2 (~3,7 L)', intervalKm: 12000, intervalMonths: 12, notes: 'Filtro: Hiflofiltro HF159 (não confundir com HF153RC!)', priority: 'HIGH', order: 1 },
  { modelName: '848 EVO', yearFrom: 2008, yearTo: 2013, component: 'Revisão Desmodromica (16 folgas)', intervalKm: 12000, intervalMonths: null, notes: 'R$1.500–3.500 concessionária — frequente por ser motor SBK', priority: 'CRITICAL', order: 2 },
  { modelName: '848 EVO', yearFrom: 2008, yearTo: 2013, component: 'Verificar tensão correia de distribuição', intervalKm: 12000, intervalMonths: null, notes: null, priority: 'HIGH', order: 3 },
  { modelName: '848 EVO', yearFrom: 2008, yearTo: 2013, component: '4× velas NGK MAR10A-J', intervalKm: 12000, intervalMonths: null, notes: 'Código diferente dos Monster! MAR10A-J, não MAR9A-J', priority: 'HIGH', order: 4 },
  { modelName: '848 EVO', yearFrom: 2008, yearTo: 2013, component: 'Trocar correia de distribuição', intervalKm: 24000, intervalMonths: 24, notes: 'SBK: máx. 2 anos. Motor em alta rotação estresa mais a correia', priority: 'CRITICAL', order: 5 },
  { modelName: '848 EVO', yearFrom: 2008, yearTo: 2013, component: 'Filtro de ar', intervalKm: 24000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: '848 EVO', yearFrom: 2008, yearTo: 2013, component: 'Fluido de freio/embreagem DOT 4', intervalKm: 24000, intervalMonths: null, notes: null, priority: 'HIGH', order: 7 },
  { modelName: '848 EVO', yearFrom: 2008, yearTo: 2013, component: 'Líquido de arrefecimento', intervalKm: 48000, intervalMonths: null, notes: null, priority: 'HIGH', order: 8 },

  // 959 PANIGALE
  { modelName: '959 PANIGALE', yearFrom: 2016, yearTo: 2019, component: 'Óleo motor 15W-50 JASO MA2 (~3,8 L)', intervalKm: 12000, intervalMonths: 12, notes: 'Filtro: Hiflofiltro HF159', priority: 'HIGH', order: 1 },
  { modelName: '959 PANIGALE', yearFrom: 2016, yearTo: 2019, component: 'Lubrificar corrente 520', intervalKm: 1000, intervalMonths: null, notes: 'DID 520 ZVMX como alternativa', priority: 'MEDIUM', order: 2 },
  { modelName: '959 PANIGALE', yearFrom: 2016, yearTo: 2019, component: 'Revisão Desmodromica (16 folgas)', intervalKm: 24000, intervalMonths: null, notes: 'R$1.500–3.000 concessionária. Motor com corrente de timing — sem correia!', priority: 'CRITICAL', order: 3 },
  { modelName: '959 PANIGALE', yearFrom: 2016, yearTo: 2019, component: '4× velas NGK MAR9A-J', intervalKm: 24000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: '959 PANIGALE', yearFrom: 2016, yearTo: 2019, component: 'Filtro de ar', intervalKm: 24000, intervalMonths: null, notes: 'Alternativo: DNA P-DU11S12-01', priority: 'MEDIUM', order: 5 },
  { modelName: '959 PANIGALE', yearFrom: 2016, yearTo: 2019, component: 'Fluido de freio/embreagem DOT 4', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 6 },
  { modelName: '959 PANIGALE', yearFrom: 2016, yearTo: 2019, component: 'Líquido de arrefecimento', intervalKm: 48000, intervalMonths: null, notes: null, priority: 'HIGH', order: 7 },

  // 1098
  { modelName: '1098', yearFrom: 2007, yearTo: 2012, component: 'Óleo motor 15W-50 JASO MA2 (~3,7 L)', intervalKm: 12000, intervalMonths: 12, notes: 'Filtro: Hiflofiltro HF159. Pista: Motul 300V 10W-40', priority: 'HIGH', order: 1 },
  { modelName: '1098', yearFrom: 2007, yearTo: 2012, component: 'Revisão Desmodromica (16 folgas)', intervalKm: 12000, intervalMonths: null, notes: 'R$1.500–3.500 concessionária. Motor SBK — alta frequência', priority: 'CRITICAL', order: 2 },
  { modelName: '1098', yearFrom: 2007, yearTo: 2012, component: 'Verificar tensão correia de distribuição', intervalKm: 12000, intervalMonths: null, notes: null, priority: 'HIGH', order: 3 },
  { modelName: '1098', yearFrom: 2007, yearTo: 2012, component: '4× velas NGK MAR10A-J', intervalKm: 12000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: '1098', yearFrom: 2007, yearTo: 2012, component: 'Trocar correia de distribuição', intervalKm: 24000, intervalMonths: 24, notes: 'SBK: MÁXIMO 2 anos. Extremamente crítico', priority: 'CRITICAL', order: 5 },
  { modelName: '1098', yearFrom: 2007, yearTo: 2012, component: 'Fluido de freio DOT 4', intervalKm: 24000, intervalMonths: null, notes: null, priority: 'HIGH', order: 6 },
  { modelName: '1098', yearFrom: 2007, yearTo: 2012, component: 'Líquido de arrefecimento', intervalKm: 48000, intervalMonths: null, notes: null, priority: 'HIGH', order: 7 },

  // PANIGALE V2
  { modelName: 'PANIGALE V2', yearFrom: 2020, yearTo: null, component: 'Óleo motor 15W-50 JASO MA2 (~3,8 L)', intervalKm: 12000, intervalMonths: 12, notes: 'Filtro: Hiflofiltro HF159', priority: 'HIGH', order: 1 },
  { modelName: 'PANIGALE V2', yearFrom: 2020, yearTo: null, component: 'Lubrificar corrente 520', intervalKm: 1000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'PANIGALE V2', yearFrom: 2020, yearTo: null, component: 'Revisão Desmodromica (16 folgas)', intervalKm: 24000, intervalMonths: null, notes: 'R$1.500–3.000 concessionária. Sem correia — motor com corrente timing', priority: 'CRITICAL', order: 3 },
  { modelName: 'PANIGALE V2', yearFrom: 2020, yearTo: null, component: '4× velas NGK MAR9A-J', intervalKm: 24000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'PANIGALE V2', yearFrom: 2020, yearTo: null, component: 'Filtro de ar', intervalKm: 24000, intervalMonths: null, notes: 'Alternativo: DNA P-DU11S12-01', priority: 'MEDIUM', order: 5 },
  { modelName: 'PANIGALE V2', yearFrom: 2020, yearTo: null, component: 'Fluido de freio/embreagem DOT 4', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'PANIGALE V2', yearFrom: 2020, yearTo: null, component: 'Líquido de arrefecimento', intervalKm: 48000, intervalMonths: null, notes: null, priority: 'HIGH', order: 7 },

  // PANIGALE V4
  { modelName: 'PANIGALE V4', yearFrom: 2018, yearTo: null, component: 'Óleo motor 15W-50 JASO MA2 (~4,5 L motor V4)', intervalKm: 12000, intervalMonths: 12, notes: 'Filtro: Hiflofiltro HF159', priority: 'HIGH', order: 1 },
  { modelName: 'PANIGALE V4', yearFrom: 2018, yearTo: null, component: 'Lubrificar corrente 520', intervalKm: 1000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'PANIGALE V4', yearFrom: 2018, yearTo: null, component: 'Inspecionar fixação sensor ABS dianteiro', intervalKm: 5000, intervalMonths: null, notes: 'Fio pode friccionar no pneu se abraçadeira soltar', priority: 'HIGH', order: 3 },
  { modelName: 'PANIGALE V4', yearFrom: 2018, yearTo: null, component: 'Inspecionar pastilhas Brembo Stylema', intervalKm: 5000, intervalMonths: null, notes: 'Vida útil: 5.000–8.000 km rua / 1.500–2.000 km pista', priority: 'HIGH', order: 4 },
  { modelName: 'PANIGALE V4', yearFrom: 2018, yearTo: null, component: 'Revisão Desmodromica V4 (32 folgas)', intervalKm: 24000, intervalMonths: null, notes: 'R$4.000–8.000 concessionária / R$2.000–4.000 especialista. Motor sai da moto', priority: 'CRITICAL', order: 5 },
  { modelName: 'PANIGALE V4', yearFrom: 2018, yearTo: null, component: '4× velas NGK LMDR10A-JS', intervalKm: 24000, intervalMonths: null, notes: 'Código único do V4 — não usar MAR9A-J nem LMDR10A', priority: 'HIGH', order: 6 },
  { modelName: 'PANIGALE V4', yearFrom: 2018, yearTo: null, component: 'Filtro de ar', intervalKm: 24000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'PANIGALE V4', yearFrom: 2018, yearTo: null, component: 'Fluido de freio/embreagem DOT 4', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'PANIGALE V4', yearFrom: 2018, yearTo: null, component: 'Líquido de arrefecimento', intervalKm: 36000, intervalMonths: null, notes: null, priority: 'HIGH', order: 9 },
  { modelName: 'PANIGALE V4', yearFrom: 2018, yearTo: null, component: 'Óleo garfo Öhlins (versão V4S)', intervalKm: 60000, intervalMonths: null, notes: 'Öhlins requer óleo específico — consultar manual', priority: 'MEDIUM', order: 10 },

  // STREETFIGHTER V4
  { modelName: 'STREETFIGHTER V4', yearFrom: 2020, yearTo: null, component: 'Óleo motor 15W-50 JASO MA2 (~4,5 L)', intervalKm: 12000, intervalMonths: 12, notes: 'Filtro: Hiflofiltro HF159. Mesmo motor da Panigale V4', priority: 'HIGH', order: 1 },
  { modelName: 'STREETFIGHTER V4', yearFrom: 2020, yearTo: null, component: 'Lubrificar corrente 525', intervalKm: 1000, intervalMonths: null, notes: 'DID 525 ZVMX — corrente mais robusta que na Panigale', priority: 'MEDIUM', order: 2 },
  { modelName: 'STREETFIGHTER V4', yearFrom: 2020, yearTo: null, component: 'Revisão Desmodromica V4 (32 folgas)', intervalKm: 24000, intervalMonths: null, notes: 'R$4.000–8.000 concessionária', priority: 'CRITICAL', order: 3 },
  { modelName: 'STREETFIGHTER V4', yearFrom: 2020, yearTo: null, component: '4× velas NGK LMDR10A-JS', intervalKm: 24000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'STREETFIGHTER V4', yearFrom: 2020, yearTo: null, component: 'Filtro de ar', intervalKm: 24000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 5 },
  { modelName: 'STREETFIGHTER V4', yearFrom: 2020, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'STREETFIGHTER V4', yearFrom: 2020, yearTo: null, component: 'Líquido de arrefecimento', intervalKm: 36000, intervalMonths: null, notes: null, priority: 'HIGH', order: 7 },

  // STREETFIGHTER V2
  { modelName: 'STREETFIGHTER V2', yearFrom: 2022, yearTo: null, component: 'Óleo motor 15W-50 JASO MA2 (~3,8 L)', intervalKm: 12000, intervalMonths: 12, notes: 'Filtro: Hiflofiltro HF159. Motor V2 955cc', priority: 'HIGH', order: 1 },
  { modelName: 'STREETFIGHTER V2', yearFrom: 2022, yearTo: null, component: 'Lubrificar corrente 525', intervalKm: 1000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'STREETFIGHTER V2', yearFrom: 2022, yearTo: null, component: 'Revisão Desmodromica (16 folgas)', intervalKm: 24000, intervalMonths: null, notes: 'R$1.500–3.000 concessionária', priority: 'CRITICAL', order: 3 },
  { modelName: 'STREETFIGHTER V2', yearFrom: 2022, yearTo: null, component: '4× velas NGK MAR9A-J', intervalKm: 24000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'STREETFIGHTER V2', yearFrom: 2022, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'STREETFIGHTER V2', yearFrom: 2022, yearTo: null, component: 'Líquido de arrefecimento', intervalKm: 48000, intervalMonths: null, notes: null, priority: 'HIGH', order: 6 },

  // MULTISTRADA 950
  { modelName: 'MULTISTRADA 950', yearFrom: 2017, yearTo: null, component: 'Óleo motor 15W-50 JASO MA2 (~3,4 L)', intervalKm: 15000, intervalMonths: 12, notes: 'Filtro: Hiflofiltro HF153RC', priority: 'HIGH', order: 1 },
  { modelName: 'MULTISTRADA 950', yearFrom: 2017, yearTo: null, component: 'Lubrificar corrente 525', intervalKm: 1000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'MULTISTRADA 950', yearFrom: 2017, yearTo: null, component: 'Limpar sensores ABS (uso off-road)', intervalKm: 3000, intervalMonths: null, notes: 'Lama entope sensores — inspecione após cada saída de terra', priority: 'MEDIUM', order: 3 },
  { modelName: 'MULTISTRADA 950', yearFrom: 2017, yearTo: null, component: 'Revisão Desmodromica (16 folgas)', intervalKm: 30000, intervalMonths: null, notes: 'R$1.200–2.500 concessionária', priority: 'CRITICAL', order: 4 },
  { modelName: 'MULTISTRADA 950', yearFrom: 2017, yearTo: null, component: 'Trocar correia de distribuição', intervalKm: 30000, intervalMonths: 48, notes: 'Brasil: máx. 3–4 anos', priority: 'CRITICAL', order: 5 },
  { modelName: 'MULTISTRADA 950', yearFrom: 2017, yearTo: null, component: '4× velas NGK MAR9A-J', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'MULTISTRADA 950', yearFrom: 2017, yearTo: null, component: 'Filtro de ar', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'MULTISTRADA 950', yearFrom: 2017, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'MULTISTRADA 950', yearFrom: 2017, yearTo: null, component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 48, notes: null, priority: 'HIGH', order: 9 },
  { modelName: 'MULTISTRADA 950', yearFrom: 2017, yearTo: null, component: 'Inspeção suspensão e rolamentos de roda', intervalKm: 60000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 10 },

  // MULTISTRADA 1260
  { modelName: 'MULTISTRADA 1260', yearFrom: 2010, yearTo: 2021, component: 'Óleo motor 15W-50 JASO MA2 (~3,8 L)', intervalKm: 15000, intervalMonths: 12, notes: 'Filtro: Hiflofiltro HF153RC', priority: 'HIGH', order: 1 },
  { modelName: 'MULTISTRADA 1260', yearFrom: 2010, yearTo: 2021, component: 'Lubrificar corrente 525', intervalKm: 1000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'MULTISTRADA 1260', yearFrom: 2010, yearTo: 2021, component: 'Revisão Desmodromica (16 folgas)', intervalKm: 30000, intervalMonths: null, notes: 'R$1.200–2.500 concessionária', priority: 'CRITICAL', order: 3 },
  { modelName: 'MULTISTRADA 1260', yearFrom: 2010, yearTo: 2021, component: 'Trocar correia de distribuição', intervalKm: 30000, intervalMonths: 48, notes: 'Brasil: máx. 3–4 anos', priority: 'CRITICAL', order: 4 },
  { modelName: 'MULTISTRADA 1260', yearFrom: 2010, yearTo: 2021, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'MULTISTRADA 1260', yearFrom: 2010, yearTo: 2021, component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 48, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'MULTISTRADA 1260', yearFrom: 2010, yearTo: 2021, component: 'Rolamentos de roda', intervalKm: 60000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },

  // MULTISTRADA V2
  { modelName: 'MULTISTRADA V2', yearFrom: 2021, yearTo: null, component: 'Óleo motor 15W-50 JASO MA2 (~3,4 L)', intervalKm: 15000, intervalMonths: 12, notes: 'Filtro: Hiflofiltro HF153RC', priority: 'HIGH', order: 1 },
  { modelName: 'MULTISTRADA V2', yearFrom: 2021, yearTo: null, component: 'Revisão Desmodromica (16 folgas)', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'CRITICAL', order: 2 },
  { modelName: 'MULTISTRADA V2', yearFrom: 2021, yearTo: null, component: 'Trocar correia de distribuição', intervalKm: 30000, intervalMonths: 48, notes: 'Brasil: máx. 3–4 anos', priority: 'CRITICAL', order: 3 },
  { modelName: 'MULTISTRADA V2', yearFrom: 2021, yearTo: null, component: '4× velas NGK MAR9A-J', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'MULTISTRADA V2', yearFrom: 2021, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'MULTISTRADA V2', yearFrom: 2021, yearTo: null, component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 48, notes: null, priority: 'HIGH', order: 6 },

  // MULTISTRADA V4
  { modelName: 'MULTISTRADA V4', yearFrom: 2021, yearTo: null, component: 'Óleo motor 15W-50 JASO MA2 (~4,5 L)', intervalKm: 15000, intervalMonths: 24, notes: 'Filtro: Hiflofiltro HF159. V4 Granturismo — intervalo estendido de 24 meses', priority: 'HIGH', order: 1 },
  { modelName: 'MULTISTRADA V4', yearFrom: 2021, yearTo: null, component: 'Lubrificar corrente 525', intervalKm: 1000, intervalMonths: null, notes: 'Sistema monobraço: ajuste via excêntrico', priority: 'MEDIUM', order: 2 },
  { modelName: 'MULTISTRADA V4', yearFrom: 2021, yearTo: null, component: 'Filtro de ar', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'MULTISTRADA V4', yearFrom: 2021, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 45000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'MULTISTRADA V4', yearFrom: 2021, yearTo: null, component: 'Revisão de válvulas V4 Granturismo', intervalKm: 60000, intervalMonths: null, notes: 'SEM correia — apenas válvulas. Melhor custo da linha Ducati', priority: 'HIGH', order: 5 },
  { modelName: 'MULTISTRADA V4', yearFrom: 2021, yearTo: null, component: '4× velas NGK T00132U', intervalKm: 60000, intervalMonths: null, notes: 'Código exclusivo do V4 Granturismo', priority: 'HIGH', order: 6 },
  { modelName: 'MULTISTRADA V4', yearFrom: 2021, yearTo: null, component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 48, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'MULTISTRADA V4', yearFrom: 2021, yearTo: null, component: 'Rolamentos de roda e óleo garfo Öhlins', intervalKm: 90000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 8 },

  // SCRAMBLER ICON
  { modelName: 'SCRAMBLER ICON', yearFrom: 2015, yearTo: null, component: 'Óleo motor 15W-50 JASO MA2 (~3,1 L)', intervalKm: 12000, intervalMonths: 12, notes: 'Filtro: Hiflofiltro HF153RC', priority: 'HIGH', order: 1 },
  { modelName: 'SCRAMBLER ICON', yearFrom: 2015, yearTo: null, component: 'Verificar folgas Desmodromicas (8 folgas)', intervalKm: 12000, intervalMonths: null, notes: 'R$800–1.500 concessionária. Motor 2v 803cc', priority: 'CRITICAL', order: 2 },
  { modelName: 'SCRAMBLER ICON', yearFrom: 2015, yearTo: null, component: 'Verificar tensão correia de distribuição', intervalKm: 12000, intervalMonths: null, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'SCRAMBLER ICON', yearFrom: 2015, yearTo: null, component: 'Lubrificar corrente 520', intervalKm: 1000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'SCRAMBLER ICON', yearFrom: 2015, yearTo: null, component: 'Trocar correia de distribuição', intervalKm: 24000, intervalMonths: 36, notes: 'Manual: 5 anos. Brasil: máx. 2–3 anos', priority: 'CRITICAL', order: 5 },
  { modelName: 'SCRAMBLER ICON', yearFrom: 2015, yearTo: null, component: 'Vela NGK DCPR8E (gap 0,7–0,9 mm)', intervalKm: 24000, intervalMonths: null, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'SCRAMBLER ICON', yearFrom: 2015, yearTo: null, component: 'Filtro de ar', intervalKm: 24000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'SCRAMBLER ICON', yearFrom: 2015, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'SCRAMBLER ICON', yearFrom: 2015, yearTo: null, component: 'Rolamentos de roda', intervalKm: 60000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 9 },

  // SCRAMBLER DESERT SLED
  { modelName: 'SCRAMBLER DESERT SLED', yearFrom: 2017, yearTo: null, component: 'Óleo motor 15W-50 JASO MA2 (~3,1 L)', intervalKm: 12000, intervalMonths: 12, notes: 'Filtro: Hiflofiltro HF153RC. Motor 803cc idêntico ao Icon', priority: 'HIGH', order: 1 },
  { modelName: 'SCRAMBLER DESERT SLED', yearFrom: 2017, yearTo: null, component: 'Verificar folgas Desmodromicas (8 folgas)', intervalKm: 12000, intervalMonths: null, notes: null, priority: 'CRITICAL', order: 2 },
  { modelName: 'SCRAMBLER DESERT SLED', yearFrom: 2017, yearTo: null, component: 'Limpar e lubrificar corrente 520 após off-road', intervalKm: 500, intervalMonths: null, notes: 'Após uso em terra: limpe com querosene, seque, lubrifique', priority: 'HIGH', order: 3 },
  { modelName: 'SCRAMBLER DESERT SLED', yearFrom: 2017, yearTo: null, component: 'Trocar correia de distribuição', intervalKm: 24000, intervalMonths: 36, notes: 'Brasil: máx. 2–3 anos', priority: 'CRITICAL', order: 4 },
  { modelName: 'SCRAMBLER DESERT SLED', yearFrom: 2017, yearTo: null, component: 'Vela NGK DCPR8E', intervalKm: 24000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'SCRAMBLER DESERT SLED', yearFrom: 2017, yearTo: null, component: 'Inspecionar vedante bengala 46mm', intervalKm: 15000, intervalMonths: 12, notes: 'Off-road acelera desgaste dos vedantes', priority: 'MEDIUM', order: 6 },
  { modelName: 'SCRAMBLER DESERT SLED', yearFrom: 2017, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 7 },

  // SCRAMBLER 1100
  { modelName: 'SCRAMBLER 1100', yearFrom: 2018, yearTo: null, component: 'Óleo motor 15W-50 JASO MA2 (~3,7 L)', intervalKm: 12000, intervalMonths: 12, notes: 'Filtro: Hiflofiltro HF153RC. Motor 1079cc 2v', priority: 'HIGH', order: 1 },
  { modelName: 'SCRAMBLER 1100', yearFrom: 2018, yearTo: null, component: 'Verificar folgas Desmodromicas (8 folgas)', intervalKm: 12000, intervalMonths: null, notes: 'R$800–1.500 concessionária', priority: 'CRITICAL', order: 2 },
  { modelName: 'SCRAMBLER 1100', yearFrom: 2018, yearTo: null, component: 'Verificar tensão correia de distribuição', intervalKm: 12000, intervalMonths: null, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'SCRAMBLER 1100', yearFrom: 2018, yearTo: null, component: 'Trocar correia de distribuição', intervalKm: 24000, intervalMonths: 24, notes: 'MÁXIMO 2 anos — motor 1100cc tem mais stress na correia', priority: 'CRITICAL', order: 4 },
  { modelName: 'SCRAMBLER 1100', yearFrom: 2018, yearTo: null, component: 'Vela NGK DCPR8E', intervalKm: 24000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'SCRAMBLER 1100', yearFrom: 2018, yearTo: null, component: 'Filtro de ar', intervalKm: 24000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'SCRAMBLER 1100', yearFrom: 2018, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'SCRAMBLER 1100', yearFrom: 2018, yearTo: null, component: 'Rolamentos de roda', intervalKm: 60000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 8 },

  // HYPERMOTARD 950
  { modelName: 'HYPERMOTARD 950', yearFrom: 2016, yearTo: null, component: 'Óleo motor 15W-50 JASO MA2 (~3,5 L)', intervalKm: 15000, intervalMonths: 12, notes: 'Filtro: Hiflofiltro HF153RC', priority: 'HIGH', order: 1 },
  { modelName: 'HYPERMOTARD 950', yearFrom: 2016, yearTo: null, component: 'Lubrificar corrente 525', intervalKm: 1000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'HYPERMOTARD 950', yearFrom: 2016, yearTo: null, component: 'Verificar mangueira de combustível (pode dobrar)', intervalKm: 10000, intervalMonths: null, notes: 'Após qualquer retirada do tanque — verificar posição das mangueiras', priority: 'HIGH', order: 3 },
  { modelName: 'HYPERMOTARD 950', yearFrom: 2016, yearTo: null, component: 'Revisão Desmodromica (16 folgas)', intervalKm: 30000, intervalMonths: null, notes: 'R$1.200–2.500 concessionária', priority: 'CRITICAL', order: 4 },
  { modelName: 'HYPERMOTARD 950', yearFrom: 2016, yearTo: null, component: 'Trocar correia de distribuição', intervalKm: 30000, intervalMonths: 48, notes: 'Brasil: máx. 3–4 anos', priority: 'CRITICAL', order: 5 },
  { modelName: 'HYPERMOTARD 950', yearFrom: 2016, yearTo: null, component: '4× velas NGK MAR9A-J', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'HYPERMOTARD 950', yearFrom: 2016, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'HYPERMOTARD 950', yearFrom: 2016, yearTo: null, component: 'Líquido de arrefecimento', intervalKm: 30000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'HYPERMOTARD 950', yearFrom: 2016, yearTo: null, component: 'Inspeção amortecedor traseiro', intervalKm: 60000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 9 },

  // DIAVEL 1260
  { modelName: 'DIAVEL 1260', yearFrom: 2011, yearTo: null, component: 'Óleo motor 15W-50 JASO MA2 (~3,8 L)', intervalKm: 15000, intervalMonths: 12, notes: 'Filtro: Hiflofiltro HF153RC', priority: 'HIGH', order: 1 },
  { modelName: 'DIAVEL 1260', yearFrom: 2011, yearTo: null, component: 'Lubrificar corrente 525', intervalKm: 1000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'DIAVEL 1260', yearFrom: 2011, yearTo: null, component: 'Revisão Desmodromica (16 folgas)', intervalKm: 30000, intervalMonths: null, notes: 'R$1.200–2.500 concessionária', priority: 'CRITICAL', order: 3 },
  { modelName: 'DIAVEL 1260', yearFrom: 2011, yearTo: null, component: 'Trocar correia de distribuição', intervalKm: 30000, intervalMonths: 48, notes: 'Brasil: máx. 3–4 anos', priority: 'CRITICAL', order: 4 },
  { modelName: 'DIAVEL 1260', yearFrom: 2011, yearTo: null, component: 'Verificar disponibilidade pneu 240/45-ZR17', intervalKm: 10000, intervalMonths: null, notes: 'Pirelli Diablo Rosso III — disponibilidade limitada no Brasil', priority: 'HIGH', order: 5 },
  { modelName: 'DIAVEL 1260', yearFrom: 2011, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'DIAVEL 1260', yearFrom: 2011, yearTo: null, component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 48, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'DIAVEL 1260', yearFrom: 2011, yearTo: null, component: 'Rolamentos de roda', intervalKm: 60000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 8 },

  // SUPERSPORT
  { modelName: 'SUPERSPORT', yearFrom: 2017, yearTo: null, component: 'Óleo motor 15W-50 JASO MA2 (~3,5 L)', intervalKm: 15000, intervalMonths: 12, notes: 'Filtro: Hiflofiltro HF153RC', priority: 'HIGH', order: 1 },
  { modelName: 'SUPERSPORT', yearFrom: 2017, yearTo: null, component: 'Lubrificar corrente 525', intervalKm: 1000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'SUPERSPORT', yearFrom: 2017, yearTo: null, component: 'Revisão Desmodromica (16 folgas)', intervalKm: 30000, intervalMonths: null, notes: 'Carenagem exige mais desmontagem — mão de obra maior', priority: 'CRITICAL', order: 3 },
  { modelName: 'SUPERSPORT', yearFrom: 2017, yearTo: null, component: 'Trocar correia de distribuição', intervalKm: 30000, intervalMonths: 48, notes: 'Brasil: máx. 3–4 anos', priority: 'CRITICAL', order: 4 },
  { modelName: 'SUPERSPORT', yearFrom: 2017, yearTo: null, component: '4× velas NGK MAR9A-J', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'SUPERSPORT', yearFrom: 2017, yearTo: null, component: 'Filtro de ar', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'SUPERSPORT', yearFrom: 2017, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'SUPERSPORT', yearFrom: 2017, yearTo: null, component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 48, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'SUPERSPORT', yearFrom: 2017, yearTo: null, component: 'Rolamentos de roda', intervalKm: 60000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 9 },
]

// ─── RUNNER ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed DUCATI iniciado...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })

  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'DUCATI', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'DUCATI', vehicleTypeId: motoType.id },
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

  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: BLOCKS.map((b) => b.modelName) } } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Seed DUCATI concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
