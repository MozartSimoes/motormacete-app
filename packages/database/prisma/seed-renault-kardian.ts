/**
 * Seed Renault Kardian — macetes, problemas, manutenção e calibragem de pneus
 * SUV subcompacto lançado em 2023, motor único 1.0 TCe turbo (fabricado pela
 * Horse, joint-venture Renault-Geely) — 125cv com etanol, 220Nm de torque —
 * disponível com câmbio manual 6 marchas ou automatizado de dupla embreagem
 * banhado a óleo (EDC) 6 marchas. #40 no ranking de vendas 2025 no Brasil
 * (19.350 un.).
 * Execute: pnpm --filter @motormacete/database db:seed:renault-kardian
 *
 * Fontes: reclameaqui.com.br, mobiauto.com.br, clickpetroleoegas.com.br,
 *         carroscomcamanzi.com.br, seminovos.localiza.com, autossegredos.com.br,
 *         mundodoautomovelparapcd.com.br
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

const MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Câmbio manual é a escolha mais tranquila para quem quer menos dor de cabeça',
    body: 'Entre as duas opções de câmbio, o manual de 6 marchas tem histórico bem mais confiável que o automatizado de dupla embreagem (EDC). Se durabilidade e menor risco de problema custoso são prioridade para você, o manual é a escolha mais racional — o motor 1.0 turbo é o mesmo e entrega boa resposta em ambas as versões.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio EDC: evite ficar "pisando na embreagem" com o pé no freio parado',
    body: 'Se sua versão tem o câmbio automatizado de dupla embreagem (EDC), evite manter o carro engatado em D parado por longos períodos com o pé no freio (por exemplo, em filas ou sinais longos) — esse hábito acelera o desgaste do mecanismo de embreagem dupla. Prefira colocar em Neutro/Park quando for ficar parado por mais tempo.',
  },
  {
    severity: 'OK',
    title: 'Motor 1.0 TCe: novo, mas já premiado — siga o intervalo de óleo à risca',
    body: 'O motor 1.0 turbo TCe foi eleito "Motor do Ano" pela imprensa especializada e compartilha cerca de 70% dos componentes com o 1.3 TCe desenvolvido com a Mercedes-Benz. Por ser turbo e relativamente novo no mercado brasileiro, siga rigorosamente o intervalo de troca de óleo do manual — não estique o prazo mesmo que o carro pareça estar rodando bem.',
  },
  {
    severity: 'WARN',
    title: 'Se notar falta de força ou partida difícil com etanol, verifique a qualidade do combustível primeiro',
    body: 'Alguns proprietários relatam falta de potência e dificuldade de partida ao rodar com etanol. Antes de suspeitar de defeito, confirme a procedência e qualidade do etanol abastecido — motores turbo flex são mais sensíveis a combustível adulterado ou de baixa qualidade que motores aspirados antigos.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Câmbio EDC: estalos, trancos e falhas na transmissão — troca pode custar cerca de R$ 48 mil',
    body: 'O câmbio automatizado de dupla embreagem (EDC) do Kardian tem gerado queixas recorrentes: estalos, trancos ao engatar de "Park" para "Drive" e som de raspagem de marcha. Em casos mais graves, a troca completa do câmbio (peça + mão de obra) pode custar cerca de R$ 48 mil — a Renault tem substituído sem custo dentro da garantia de fábrica, mas o risco financeiro fora da garantia é real. Se notar qualquer estalo ou tranco anormal no câmbio EDC, acione a garantia imediatamente e documente a ocorrência.',
  },
  {
    severity: 'WARN',
    title: 'Sistema Start&Stop pode não religar o motor após parada curta',
    body: 'Há relatos de falha no sistema Start&Stop, em que o motor desliga em paradas curtas (semáforo, trânsito) e não volta a ligar automaticamente ao soltar o freio, exigindo religar manualmente. Se isso acontecer com frequência, considere desativar o Start&Stop pelo botão no painel enquanto aguarda diagnóstico na concessionária.',
  },
  {
    severity: 'WARN',
    title: 'Bateria com descarga precoce relatada por proprietários',
    body: 'Alguns donos relatam a bateria descarregando antes do esperado para a idade do veículo. Se notar dificuldade de partida pela manhã ou luzes do painel oscilando, teste a bateria e o sistema de carga na concessionária — pode estar ligado ao uso intenso de sistemas eletrônicos (start&stop, multimídia) em ciclos curtos de condução urbana.',
  },
  {
    severity: 'WARN',
    title: 'Falhas eletrônicas na central multimídia e no painel digital',
    body: 'Queixas envolvem travamentos e mau funcionamento da central multimídia, dos assistentes de condução e do quadro de instrumentos digital. Se notar tela travando ou reiniciando sozinha, peça atualização de software na concessionária antes de considerar troca de peça.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Kardian 1.0 TCe (Renault + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (especificação exata do manual, motor turbo novo no mercado BR) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | 60.000 km — Óleo do câmbio EDC (versões automatizadas) — mesmo banhado a óleo, não é vitalício; antecipe se notar estalo ou tranco. | Ao notar qualquer ruído anormal no câmbio EDC, acionar garantia imediatamente — histórico de falhas de alto custo fora da garantia.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Kardian',
    yearFrom: 2023,
    yearTo: null,
    tireSize: '205/60 R16 · 215/55 R17 (versões superiores)',
    frontPsi: 32,
    rearPsi: 32,
    frontPsiLoad: 33,
    rearPsiLoad: 36,
    sparePsi: 60,
    notes: 'Confirme sempre o valor exato na etiqueta da coluna da porta do motorista, já que pode variar por versão/aro. Recalibre a cada 15 dias e antes de viagens longas.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Kardian', yearFrom: 2023, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 1.0 TCe turbo — siga exatamente a especificação do manual.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Kardian', yearFrom: 2023, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Kardian', yearFrom: 2023, yearTo: null, component: 'Óleo do câmbio EDC (versões automatizadas)', intervalKm: 60000, intervalMonths: 48, notes: 'Histórico de falhas de alto custo (até R$ 48 mil fora da garantia) — antecipe ao primeiro sinal de estalo ou tranco.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Kardian', yearFrom: 2023, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em regiões com muita poeira.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Kardian', yearFrom: 2023, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Kardian', yearFrom: 2023, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'Kardian', yearFrom: 2023, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Renault.', priority: 'HIGH', order: 6 },
  { modelName: 'Kardian', yearFrom: 2023, yearTo: null, component: 'Teste de bateria e sistema de carga', intervalKm: null, intervalMonths: 12, notes: 'Descarga precoce relatada por proprietários — mais comum em ciclos curtos urbanos com start&stop.', priority: 'MEDIUM', order: 7 },
  { modelName: 'Kardian', yearFrom: 2023, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 8 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Kardian',
    yearFrom: 2023,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Renault Kardian...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Renault', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Renault', vehicleTypeId: carroType.id },
  })

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {},
      create: { name: block.modelName, brandId: brand.id },
    })

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
        yearFrom: null,
        yearTo: null,
        order: idx,
      })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }

  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName } })
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: ${tp.modelName}`)
  }

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: BLOCKS.map((b) => b.modelName) } },
  })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Renault Kardian concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
