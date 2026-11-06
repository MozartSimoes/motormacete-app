/**
 * Seed Volvo S90 — macetes, problemas, manutenção e calibragem
 * Sedan executivo topo de linha da Volvo, geração atual (2016+), plataforma
 * SPA compartilhada com S60/V60/XC60/XC90 desta era. Motor 2.0 turbo em três
 * famílias: T5 gasolina, T6 gasolina (mild-hybrid nas versões B6) e T8 Twin
 * Engine plug-in hybrid (motor a combustão + elétrico, bateria de alta
 * tensão, tração AWD). Suspensão a ar (Air Suspension) disponível como
 * opcional/série conforme versão — ponto de atenção técnico conhecido em
 * Volvos de luxo desta era. Tecnologia Pilot Assist (condução semiautônoma)
 * de série nas versões mais completas.
 * Execute: pnpm --filter @motormacete/database db:seed:volvo-s90
 *
 * Fontes: volvocars.com/br, opinautos.com.br, swedespeed.com,
 *         justanswer.com, vigorairride.com, reclameaqui.com.br,
 *         autopapo.com.br, conexaoautomotivabr.com, autossegredos.com.br
 *         (recall bateria LG, jul/2026), carcomplaints.com
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
    title: 'Três famílias de motor: confirme qual equipa sua unidade antes de orçar',
    body: 'O S90 é vendido com motor 2.0 turbo em três variantes bem diferentes: T5/T6 a gasolina (a T6 pode vir com mild-hybrid leve, badge "B6") ou T8 Twin Engine plug-in hybrid (motor a combustão + elétrico, tração AWD). Confirme sempre qual equipa seu carro antes de orçar peça ou revisão — a manutenção do sistema híbrido do T8 é bem diferente da T5/T6 puramente a combustão.',
  },
  {
    severity: 'OK',
    title: 'T8 Twin Engine: use o modo Pure e recarregue com regularidade',
    body: 'Para uso urbano no dia a dia, priorize o modo Pure (100% elétrico) e recarregue sempre que possível — inclusive em trajetos curtos. Rodar meses seguidos sem plugar o carregador, usando o carro só no modo híbrido convencional, tende a acelerar o desgaste da bateria de tração ao longo dos anos, além de anular boa parte do ganho de eficiência de ter um plug-in hybrid.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão a ar (Air Suspension): ponto de atenção conhecido nas versões equipadas',
    body: 'A suspensão a ar disponível no S90 (mais comum nas versões T8 e de topo) é um dos itens mais caros de reparar em Volvos de luxo desta geração — foles e compressor tendem a apresentar os primeiros sinais de falha já a partir de 100.000 km, com sintomas de altura irregular do carro e perda de conforto. Se for comprar um S90 usado fora da garantia com esse equipamento, vale inspecionar (ou pedir para inspecionar) o funcionamento da suspensão a ar antes de fechar negócio — reparo fora de garantia é caro.',
  },
  {
    severity: 'OK',
    title: 'Pilot Assist: recalibre os sensores após troca de para-brisa ou reparo no para-choque',
    body: 'O Pilot Assist (condução semiautônoma com centralização na faixa e piloto automático adaptativo) depende de câmera atrás do retrovisor interno e radares no para-choque dianteiro, calibrados com precisão milimétrica. Qualquer troca de para-brisa ou reparo de funilaria que mexa no para-choque dianteiro exige recalibração em oficina autorizada Volvo — sem isso, o sistema pode atuar de forma imprecisa ou simplesmente recusar ativar.',
  },
  {
    severity: 'OK',
    title: 'Peças compartilhadas com S60/V60, XC60 e XC90 da mesma plataforma SPA',
    body: 'O S90 compartilha motor, câmbio e boa parte da eletrônica com o S60/V60, o XC60 (2ª geração) e o XC90 (2ª geração) — todos na plataforma SPA da Volvo. Em oficina independente sem cadastro específico do S90, procure peça "para plataforma SPA Volvo" além de "para S90", amplia bastante a busca.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall: bateria de alta tensão (fabricada pela LG) com risco de incêndio — versão T8',
    body: 'A Volvo convocou recall envolvendo S60, S90, XC60 e XC90 equipados com motor T8, por falha de produção em um ou mais módulos da bateria de alta tensão fornecida pela LG, fabricadas entre junho de 2019 e novembro de 2021 (para o S90, unidades produzidas entre 26/07/2019 e 24/05/2021). O defeito pode causar curto-circuito interno e superaquecimento das células quando o carro está totalmente carregado e estacionado, com risco de incêndio em casos extremos. A recomendação da Volvo para unidades potencialmente afetadas é não recarregar o carro (usar apenas em modo combustão) até a inspeção na concessionária — o reparo é gratuito. Verifique se o chassi do seu S90 T8 está na faixa afetada e agende a inspeção imediatamente, mesmo sem sintomas.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão a ar: foles e compressor falham entre 100.000 e 150.000 km',
    body: 'Nas versões equipadas, a suspensão a ar apresenta os primeiros pontos fracos já a partir de 100.000 km, com falhas mais críticas entre 100.000 e 150.000 km — causa mais comum é fole (bolsa de ar) furado ou compressor com defeito, resultando em altura de carro irregular (um lado mais baixo que o outro) e perda de conforto. É reparo caro fora da garantia; se notar o carro "afundando" de um lado após ficar parado, não adie o diagnóstico.',
  },
  {
    severity: 'WARN',
    title: 'Sistema de aquecimento/ar-condicionado falha mais nas versões T8 híbridas',
    body: 'O sistema de climatização das versões T8 é mais complexo que o das T5/T6 (precisa gerenciar também a temperatura da bateria de tração), e isso se reflete em mais queixas de falha de aquecimento/ar-condicionado nessas unidades híbridas em comparação às puramente a combustão. Vale testar o sistema de climatização em todos os modos (incluindo pré-condicionamento pelo app, se disponível) antes de fechar a compra de um usado.',
  },
  {
    severity: 'WARN',
    title: 'Bateria de tração do T8 pode perder desempenho sem recarga regular',
    body: 'Assim como em outros plug-in hybrid da Volvo, rodar o T8 sempre no modo híbrido convencional sem nunca plugar o carregador tende a acelerar a degradação da bateria de tração com o passar dos anos. Mantenha o hábito de recarregar regularmente, mesmo que o trajeto do dia não exija.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma S90 (Volvo + ajuste uso severo BR)',
    body: '10.000-15.000 km/12 meses — Troca de óleo do motor (T5/T6/T8, especificação exata do manual) + filtro de óleo — siga o sistema de manutenção adaptativo do carro, que pode variar o intervalo. | Inspeção anual — Freios, suspensão (atenção redobrada à suspensão a ar nas versões equipadas) e níveis de fluido. | 20.000-30.000 km — Filtro de ar do motor e filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | 100.000 km — Inspeção da suspensão a ar (foles/compressor) nas versões equipadas — não espere sintoma para checar. | T8 Twin Engine — Inspeção anual do sistema de alta tensão (bateria/cabos/porta de recarga), com atenção redobrada ao recall de bateria LG (unidades 2019-2021). | Sempre — recalibre câmeras/sensores do Pilot Assist após troca de para-brisa ou reparo no para-choque dianteiro. | Sempre — verifique a bateria 12V auxiliar anualmente a partir do 3º ano.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'S90',
    yearFrom: 2016,
    yearTo: null,
    tireSize: '235/45 R18 · 245/40 R19 · 245/35 R20 (versões superiores/T8) — confirme aro conforme versão',
    frontPsi: 33,
    rearPsi: 33,
    frontPsiLoad: 36,
    rearPsiLoad: 38,
    sparePsi: null,
    notes: 'Muitas unidades vêm sem estepe, apenas kit de reparo (selante + compressor) — confirme o que equipa seu exemplar. A etiqueta oficial fica na coluna da porta do motorista; confirme o valor exato do seu aro/versão — varia entre T5/T6 e T8 pelo peso adicional da bateria. Nas versões com suspensão a ar, a pressão do pneu continua sendo item separado do ajuste automático de altura.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'S90', yearFrom: 2016, yearTo: null, component: 'Óleo do motor', intervalKm: 15000, intervalMonths: 12, notes: 'Confirme especificação conforme motor (T5/T6/T8) e siga o sistema de manutenção adaptativo do carro.', priority: 'CRITICAL', order: 0 },
  { modelName: 'S90', yearFrom: 2016, yearTo: null, component: 'Filtro de óleo', intervalKm: 15000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'S90', yearFrom: 2016, yearTo: null, component: 'Recall de bateria de alta tensão LG (versão T8, unidades 2019-2021)', intervalKm: null, intervalMonths: null, notes: 'Risco de incêndio — verificar na concessionária imediatamente, mesmo sem sintomas. Não recarregar até a inspeção se a unidade estiver na faixa afetada.', priority: 'CRITICAL', order: 2 },
  { modelName: 'S90', yearFrom: 2016, yearTo: null, component: 'Suspensão a ar (foles/compressor) — inspeção', intervalKm: 100000, intervalMonths: null, notes: 'Ponto de falha conhecido nas versões equipadas. Altura irregular do carro é o primeiro sinal.', priority: 'HIGH', order: 3 },
  { modelName: 'S90', yearFrom: 2016, yearTo: null, component: 'Sistema de alta tensão (bateria/cabos/porta de recarga) — versão T8', intervalKm: null, intervalMonths: 12, notes: 'Inspeção anual. Mantenha o hábito de recarregar regularmente.', priority: 'CRITICAL', order: 4 },
  { modelName: 'S90', yearFrom: 2016, yearTo: null, component: 'Bateria 12V auxiliar — verificação', intervalKm: null, intervalMonths: 12, notes: 'O carro não liga sem ela mesmo com a bateria de tração saudável. Checar a partir do 3º ano.', priority: 'HIGH', order: 5 },
  { modelName: 'S90', yearFrom: 2016, yearTo: null, component: 'Recalibração de câmeras/sensores do Pilot Assist', intervalKm: null, intervalMonths: null, notes: 'Obrigatória após troca de para-brisa ou reparo no para-choque dianteiro.', priority: 'HIGH', order: 6 },
  { modelName: 'S90', yearFrom: 2016, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 30000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'S90', yearFrom: 2016, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 8 },
  { modelName: 'S90', yearFrom: 2016, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 9 },
  { modelName: 'S90', yearFrom: 2016, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Volvo. Sistema de climatização das versões T8 é mais complexo.', priority: 'HIGH', order: 10 },
  { modelName: 'S90', yearFrom: 2016, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 11 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'S90',
    yearFrom: 2016,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Volvo S90...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volvo', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volvo', vehicleTypeId: carroType.id },
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

  console.log('✅ Volvo S90 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
