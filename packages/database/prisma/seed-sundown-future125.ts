// seed-sundown-future125.ts — Sundown Future 125
// Modelo street-commuter mais antigo da Sundown (final dos anos 1990 / anos 2000), motor 124cc
// OHC monocilíndrico a ar, carburado, câmbio manual sequencial 4/5 marchas. Concorrente histórico
// da Honda CG125/Titan e Yamaha YBR125 na faixa de entrada. Peças originais escassas hoje em dia —
// o motor 124cc de base é compatível com diversos equivalentes genéricos de motos populares.
// Execute: pnpm --filter @motormacete/database db:seed:sundown-future125
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

// ─── FUTURE 125 ─────────────────────────────────────────────────────────────────
// Motor: 124cc OHC monocilíndrico a ar, 2 válvulas | ~9,8 cv @ 7.500 rpm (estimativa) | torque ~0,95 kgf.m
// Carburador tipo PZ19 | Óleo 20W-50 1,0L | Vela NGK C7HSA gap 0,6–0,7mm
// Câmbio manual sequencial 4 marchas | Corrente 428 | Tanque ~12L | Pneu 2.75-18 (F) / 3.00-18 (R)
// Freio: tambor dianteiro e traseiro (versões básicas) ou disco dianteiro (versões mais recentes)

const FUTURE125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 20W-50 mineral — 1,0L; motor simples tolera bem, mas não exagere no intervalo',
    body: 'O motor 124cc OHC a ar da Future 125 é robusto e de projeto simples, similar em filosofia a outras 125cc populares da época (CG125, YBR125). Capacidade: 1,0L. Use 20W-50 mineral ou semissintético JASO MA (Lubrax Moto 4T, Shell Advance AX5). Troque a cada 3.000 km ou 4 meses — motores mais antigos como este tendem a ter folgas maiores nos mancais, então óleo velho acelera o desgaste do comando de válvulas.',
  },
  {
    severity: 'WARN',
    title: 'Carburador PZ19: regule a mistura ar/combustível a cada limpeza',
    body: 'O carburador tipo PZ19 da Future 125 é do tipo simples de agulha fixa, sensível à qualidade do combustível brasileiro com etanol. Sintomas de sujeira: marcha lenta instável, fumaça preta no escape (mistura rica), consumo alto. Ao limpar (jatos + cuba), sempre reajuste o parafuso de mistura de ar (geralmente 1,5 a 2,5 voltas abertas a partir do fechado) e a marcha lenta (~1.300–1.500 rpm). Jato principal de referência: 92,5 (verificar código gravado no jato antes de comprar reposição).',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA gap 0,6–0,7mm — troca a cada 8.000 km',
    body: 'Vela recomendada: NGK C7HSA (equivalente Denso U20FSU, Champion equivalente). Gap: 0,6–0,7mm. Custo: R$ 12–20. Sintoma de vela gasta neste motor: dificuldade de partida a frio (comum em motor carburado com compressão mais baixa por idade) e leve perda de força na retomada. Considere trocar a cada 6.000 km se a moto for usada com frequência para partidas frias.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428 e kit relação — mesma referência de motos 125/150cc populares',
    body: 'A Future 125 usa corrente 428 (mesma referência de várias 125–150cc nacionais), o que facilita muito encontrar peças de reposição em qualquer loja de peças para motos. Lubrifique a cada 500 km. Folga correta: 20–30mm no trecho inferior. Kit relação completo (corrente + pinhão + coroa) custa R$ 70–150 em peças genéricas — evite comprar só a corrente se pinhão/coroa já estiverem gastos.',
  },
  {
    severity: 'WARN',
    title: 'Peças originais Sundown escassas: use equivalentes de motor 125cc genérico',
    body: 'Por ser um modelo mais antigo e de marca com rede de distribuição menor, peças 100% originais da Future 125 são difíceis de achar hoje em dia — muitas vezes só em desmanches (Mercado Livre, grupos de Facebook "Sundown Brasil"). A boa notícia: o motor 124cc é de arquitetura muito comum (OHC, 2 válvulas, ar), com pistão, anéis, juntas e retentores compatíveis com diversas motos populares chinesas/nacionais de 124–125cc. Leve a peça velha como referência de medida ao comprar equivalente genérico.',
  },
  {
    severity: 'OK',
    title: 'Câmbio sequencial: cuidado com o "falso neutro" entre 1ª e 2ª marcha em motor desgastado',
    body: 'Como em muitas motos de câmbio sequencial com mais tempo de uso, é comum a Future 125 apresentar "falso neutro" entre a 1ª e a 2ª marcha quando as garras de engate do câmbio já estão desgastadas. Se notar isso, procure trocar o óleo (óleo mais viscoso levemente ajuda temporariamente) e, se persistir, é sinal de que as garras do câmbio precisam de atenção — serviço de oficina especializada em motor.',
  },
  {
    severity: 'WARN',
    title: 'Tanque de 12L: autonomia generosa, mas fique atento à ferrugem interna em tanques antigos',
    body: 'O tanque de aproximadamente 12L dá boa autonomia (300–400 km dependendo do uso), mas por ser um modelo mais antigo, tanques que passaram anos com pouco combustível ou água de condensação acumulada podem desenvolver ferrugem interna, que entope o carburador. Se notar entupimentos recorrentes mesmo após limpeza do carburador, inspecione o interior do tanque com lanterna — ferrugem solta é sinal de que é hora de tratar ou substituir o tanque.',
  },
]

const FUTURE125_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'CDI e componentes elétricos: peças de reposição limitadas, priorize genéricos compatíveis',
    body: 'Assim como em outros modelos Sundown mais antigos, o CDI original da Future 125 não é mais fabricado. Sintoma de falha: moto sem faísca, não pega mesmo com bateria boa. Solução: CDI genérico de 5 ou 6 pinos compatível com motor 125cc de ignição simples (sem avanço eletrônico complexo) — encontrado em lojas de peças para motos populares por R$ 40–90. Confirme a pinagem com o CDI antigo antes de comprar.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão em escapamento e partes metálicas — problema comum em unidades mais antigas',
    body: 'Modelos com mais tempo de uso frequentemente apresentam corrosão avançada no escapamento (por ser de aço mais simples) e em parafusaria exposta. Sintoma: furo no silencioso (ruído alto, perda de desempenho), parafusos "empastados" que quebram na hora da manutenção. Ao fazer qualquer serviço, aplique óleo penetrante nos parafusos com antecedência e use chave adequada para evitar arredondar as cabeças já enfraquecidas pela ferrugem.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pelo retentor do câmbio/embreagem — comum em motores com mais quilometragem',
    body: 'Retentores do eixo primário/secundário do câmbio perdem vedação com o tempo, especialmente em unidades com mais de 30.000–40.000 km. Sintoma: mancha de óleo na parte baixo-central do motor, corrente suja de óleo em excesso. Retentor genérico de mesma medida resolve — custo R$ 5–15 a peça, troca simples em oficina (~1h de serviço).',
  },
  {
    severity: 'WARN',
    title: 'Freio a tambor: cabo/vareta descalibrados são a causa mais comum de frenagem "mole"',
    body: 'Nas versões com freio a tambor nas duas rodas, a reclamação mais comum é sensação de frenagem fraca ou "esponjosa". Na maioria dos casos não é a lona que está gasta, mas sim o cabo (dianteiro) ou a vareta (traseiro) desregulados. Regule o curso livre para cerca de 20–30mm na manete/pedal antes de suspeitar de lona gasta ou de precisar trocar componentes.',
  },
  {
    severity: 'DANGER',
    title: 'Idade da frota: revise sistema de freios e suspensão com atenção redobrada em unidades muito antigas',
    body: 'Por ser um modelo mais antigo (produção original nos anos 1990/2000), muitas unidades da Future 125 em circulação hoje têm 15–25+ anos. Borrachas de suspensão, mangueiras de freio (se houver disco) e coxins do motor endurecem e perdem eficácia com a idade, independente da quilometragem rodada. Ao comprar uma unidade usada, ou em revisão anual, inspecione visualmente rachaduras em mangueiras e borrachas — itens de segurança não devem ser avaliados só pela quilometragem.',
  },
]

const FUTURE125_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Calendário completo Future 125: atenção redobrada por ser modelo mais antigo',
    body: '500 km — Troca de óleo inicial (rodagem). | 1.000 km — Segunda troca de óleo + regulagem de corrente e cabos. | 3.000 km — Troca de óleo (20W-50, 1,0L). Lubrificar corrente. | 5.000 km — Limpeza e regulagem do carburador PZ19. Verificar vela. | 6.000 km — Considerar troca da vela NGK C7HSA se uso intenso com partidas frias. | 8.000 km — Troca da vela. Regular folga de válvulas (adm 0,05mm / esc 0,08mm, motor frio). Trocar filtro de ar. | 10.000 km — Inspecionar kit relação 428. | 12.000 km — Regular cabo/vareta de freio a tambor. Inspecionar retentores do câmbio (vazamento). | 15.000 km — Inspecionar mangueiras e borrachas de suspensão (idade do veículo pesa mais que km). Rolamentos de roda.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'FUTURE 125',
    yearFrom: 1997,
    yearTo: 2010,
    MACETES: FUTURE125_MACETES,
    PROBLEMAS: FUTURE125_PROBLEMAS,
    MANUTENCAO: FUTURE125_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'FUTURE 125',
    yearFrom: 1997, yearTo: 2010,
    tireSize: '2.75-18 (F) · 3.00-18 (R)',
    frontPsi: 26, rearPsi: 30,
    frontPsiLoad: 26, rearPsiLoad: 34,
    notes: 'Solo: F 26 / R 30 PSI. Com carona/carga: F 26 / R 34 PSI. Medida de pneu típica de 125cc street nacional da época. Pneus recomendados: Levorin Duna ou Pirelli Cross Rally 2.75-18 (F) / 3.00-18 (R).',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'FUTURE 125', yearFrom: 1997, yearTo: 2010, component: 'Óleo 20W-50 mineral (1,0L)', intervalKm: 3000, intervalMonths: 4, notes: 'Motor 124cc OHC. Nunca usar óleo sem especificação JASO MA (embreagem úmida).', priority: 'HIGH', order: 1 },
  { modelName: 'FUTURE 125', yearFrom: 1997, yearTo: 2010, component: 'Limpeza e regulagem do carburador PZ19', intervalKm: 5000, intervalMonths: 6, notes: 'Reajustar parafuso de mistura (~1,5–2,5 voltas) e marcha lenta (1.300–1.500 rpm) após limpar.', priority: 'HIGH', order: 2 },
  { modelName: 'FUTURE 125', yearFrom: 1997, yearTo: 2010, component: 'Vela NGK C7HSA (gap 0,6–0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Reduzir para 6.000 km se uso frequente com partidas frias.', priority: 'MEDIUM', order: 3 },
  { modelName: 'FUTURE 125', yearFrom: 1997, yearTo: 2010, component: 'Lubrificação da corrente 428', intervalKm: 500, intervalMonths: null, notes: 'Folga 20–30mm no trecho inferior.', priority: 'HIGH', order: 4 },
  { modelName: 'FUTURE 125', yearFrom: 1997, yearTo: 2010, component: 'Filtro de ar — limpeza/troca', intervalKm: 5000, intervalMonths: 12, notes: 'Espuma: lavar, secar, umedecer com óleo leve.', priority: 'MEDIUM', order: 5 },
  { modelName: 'FUTURE 125', yearFrom: 1997, yearTo: 2010, component: 'Folga de válvulas (adm 0,05mm / esc 0,08mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio. Regulagem por contra-porca.', priority: 'HIGH', order: 6 },
  { modelName: 'FUTURE 125', yearFrom: 1997, yearTo: 2010, component: 'Kit relação 428 (pinhão + coroa + corrente)', intervalKm: 15000, intervalMonths: null, notes: 'Trocar kit completo — nunca só a corrente com coroa gasta.', priority: 'HIGH', order: 7 },
  { modelName: 'FUTURE 125', yearFrom: 1997, yearTo: 2010, component: 'Regulagem cabo/vareta de freio a tambor', intervalKm: 4000, intervalMonths: 6, notes: 'Curso livre alvo: 20–30mm na manete/pedal. Causa mais comum de "freio mole".', priority: 'MEDIUM', order: 8 },
  { modelName: 'FUTURE 125', yearFrom: 1997, yearTo: 2010, component: 'Retentores do câmbio — inspeção de vazamento', intervalKm: 30000, intervalMonths: null, notes: 'Mais comum em unidades acima de 30.000–40.000 km.', priority: 'MEDIUM', order: 9 },
  { modelName: 'FUTURE 125', yearFrom: 1997, yearTo: 2010, component: 'Inspeção de mangueiras e borrachas de suspensão', intervalKm: null, intervalMonths: 12, notes: 'Modelo antigo: idade do veículo pesa mais que a quilometragem para itens de borracha.', priority: 'HIGH', order: 10 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Sundown Future 125...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'SUNDOWN', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'SUNDOWN', vehicleTypeId: motoType.id },
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

  console.log('✅ Sundown Future 125 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
