/**
 * Seed Volvo XC90 — macetes, problemas, manutenção e calibragem
 * SUV grande de 7 lugares, carro-chefe da Volvo em duas gerações bem
 * distintas:
 *  - Gen1 P2 (2002-2014): motor 2.5T 5 cilindros turbo (208cv), T6 2.9
 *    biturbo 6 cilindros (272cv, até ~2005) e V8 4.4 Yamaha (315cv, a
 *    partir de 2005), tração integral AWD de série. Plataforma
 *    compartilhada com S80/V70/XC70 desta era.
 *  - Gen2 SPA (2014/2015+): motor 2.0 turbo T5/T6 gasolina e T8 Recharge
 *    plug-in hybrid, tração AWD, suspensão a ar praticamente onipresente
 *    nas versões de topo. Um dos SUVs mais premiados em segurança do
 *    mundo (Euro NCAP, IIHS Top Safety Pick).
 * Execute: pnpm --filter @motormacete/database db:seed:volvo-xc90
 *
 * Fontes: rerev.com, matthewsvolvosite.com, swedespeed.com, ipdusa.com,
 *         volvocars.com/br, opinautos.com.br, mobycar.pt, michelin.com.br,
 *         vigorairride.com, justanswer.com, conexaoautomotivabr.com
 *         (recall bateria LG, jul/2026)
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'
type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

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
  priority: Priority
  order: number
}

// ─── Gen1 P2 (2002-2014) — 2.5T, T6 2.9 biturbo e V8 4.4 Yamaha ───────────

const MACETES_GEN1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Peça compartilhada com S80/V70/XC70 da mesma plataforma P2',
    body: 'O XC90 desta geração compartilha motor, câmbio e boa parte da suspensão com o S80, o V70 e o XC70 contemporâneos. Em oficina independente sem cadastro específico do XC90, procure peça "para plataforma P2 Volvo" — amplia bastante a busca.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático: troque o fluido regularmente, é ponto fraco conhecido',
    body: 'As transmissões automáticas usadas nesta geração (4T65, TF80, AW55-50/51SN conforme motor/ano) são um ponto fraco conhecido, principalmente nas unidades mais antigas (2003-2005). Trocar o fluido preventivamente a cada 60.000-80.000 km reduz bastante o risco de falha cara na caixa.',
  },
  {
    severity: 'WARN',
    title: 'V8 4.4 Yamaha: mantenha os drenos do vão do motor sempre desobstruídos',
    body: 'Nos motores V8, folhas e sujeira podem entupir os drenos (cowl drains) na base do para-brisa, fazendo água acumular no vão do motor e escorrer para dentro do bloco — isso enferruja o mancal do eixo de balanceamento e, em casos extremos, destrói o motor inteiro. A Volvo passou a furar um dreno extra de fábrica a partir de 2006 para reduzir o problema, mas mesmo assim vale limpar esses drenos periodicamente, principalmente depois do outono/época de folhas caindo.',
  },
  {
    severity: 'OK',
    title: 'Unidades do fim do ciclo (2013-2014) são as mais confiáveis da geração',
    body: 'Os últimos anos-modelo desta geração (2013-2014) concentram bem menos queixas de proprietários que os primeiros anos — a Volvo foi corrigindo os pontos fracos ao longo da produção. Se for comprar um XC90 P2 usado, prefira as unidades mais recentes dentro dessa geração quando o orçamento permitir.',
  },
]

const PROBLEMAS_GEN1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Transmissão automática: falhas concentradas nas unidades 2003-2005',
    body: 'A maioria dos XC90 P2 dos primeiros anos (2003-2005) acaba tendo algum problema de transmissão ao longo da vida — as caixas 4T65 e TF80 são as mais propensas, mas a AW55-50/51SN também pode falhar. Sintomas incluem escorregamento, desgaste prematuro de embreagem e superaquecimento. Se for comprar usado desses anos, exija comprovante de troca de fluido da transmissão no histórico.',
  },
  {
    severity: 'WARN',
    title: 'V8: água entrando no vão do motor pode destruir o mancal do eixo de balanceamento',
    body: 'Nos motores V8 4.4 Yamaha anteriores a 2006, os drenos do vão do motor entopem com facilidade, deixando água se acumular e infiltrar no bloco — isso enferruja o mancal do eixo de balanceamento e pode levar à destruição completa do motor se não for corrigido a tempo. Se comprar um V8 desses anos, verifique se o furo de drenagem extra (atualização de 2006) já foi feito e mantenha os drenos sempre limpos.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pela tampa de válvulas e coxins do motor com o aumento da km',
    body: 'Conforme a quilometragem sobe, vazamento de óleo pela tampa de válvulas e desgaste dos coxins do motor viram queixas cada vez mais comuns. Não são falhas graves isoladamente, mas exigem atenção — mancha de óleo recorrente ou trepidação nova do motor merece inspeção.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão a ar (versões equipadas): falhas entre 100.000 e 150.000 km',
    body: 'Nas unidades com suspensão a ar opcional, foles furados ou compressor com defeito costumam aparecer entre 100.000 e 150.000 km, com sintoma de altura de carro irregular e perda de conforto. É reparo caro fora da garantia — ao comprar usado com esse equipamento, teste o funcionamento antes de fechar negócio.',
  },
]

const MANUTENCAO_GEN1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma XC90 P2 (2002-2014) + ajuste uso severo BR',
    body: '10.000-15.000 km/12 meses — Troca de óleo do motor (2.5T, T6 ou V8, especificação do manual) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e coxins do motor. | 20.000-30.000 km — Filtro de ar do motor e filtro de cabine. | 30.000 km — Velas de ignição. | 40.000 km — Fluido de freio. | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Fluido do câmbio automático — não é vitalício, prioridade alta nas unidades 2003-2005. | 100.000 km — Inspeção da suspensão a ar (versões equipadas). | V8 4.4 — limpeza dos drenos do vão do motor a cada revisão, principalmente após período de folhas/sujeira acumulada.',
  },
]

// ─── Gen2 SPA (2014/2015+) — T5/T6 gasolina e T8 Recharge plug-in hybrid ──

const MACETES_GEN2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Peça compartilhada com XC60 (2ª geração) e S90 da mesma plataforma SPA',
    body: 'O XC90 desta geração compartilha motor, câmbio e boa parte da eletrônica com o XC60 (2ª geração) e o S90 — todos na plataforma SPA da Volvo. Útil na hora de buscar peça em oficina sem cadastro específico do XC90.',
  },
  {
    severity: 'OK',
    title: 'T8 Recharge: use o modo Pure e recarregue com regularidade',
    body: 'Para uso urbano, priorize o modo Pure (100% elétrico) e recarregue sempre que possível, mesmo em trajetos curtos — isso preserva a saúde da bateria de tração a longo prazo e aproveita melhor o sentido de ter um plug-in hybrid.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão a ar é praticamente onipresente nesta geração — atenção redobrada',
    body: 'Diferente da geração anterior (onde a suspensão a ar era opcional e menos comum), nesta geração ela equipa a maior parte das versões de 7 lugares. Isso significa que a maioria dos XC90 desta geração está exposta ao risco de falha do compressor/foles com o tempo — veja a seção de Problemas antes de comprar usado fora da garantia.',
  },
  {
    severity: 'OK',
    title: 'Pilot Assist: recalibre os sensores após troca de para-brisa',
    body: 'O sistema Pilot Assist depende de câmera e radares calibrados com precisão. Depois de qualquer troca de para-brisa ou reparo no para-choque dianteiro, leve o carro para recalibração em oficina autorizada Volvo — sem isso, o sistema pode atuar de forma imprecisa.',
  },
]

const PROBLEMAS_GEN2: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall: bateria de alta tensão (fabricada pela LG) com risco de incêndio — versão T8',
    body: 'A Volvo convocou recall envolvendo S60, S90, XC60 e XC90 equipados com motor T8, por falha de produção em um ou mais módulos da bateria de alta tensão fornecida pela LG, fabricadas entre junho de 2019 e novembro de 2021. O defeito pode causar curto-circuito interno e superaquecimento das células quando o carro está totalmente carregado e estacionado, com risco de incêndio em casos extremos. A recomendação da Volvo para unidades potencialmente afetadas é não recarregar o carro (usar apenas em modo combustão) até a inspeção na concessionária — o reparo é gratuito. Verifique se o chassi do seu XC90 T8 está na faixa afetada e agende a inspeção imediatamente, mesmo sem sintomas.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão a ar: compressor falha com frequência, mais em clima frio extremo',
    body: 'A causa mais comum de falha da suspensão a ar nesta geração era umidade acumulada no sistema do compressor — problema mais grave em regiões de frio extremo (a Volvo revisou o design do compressor ao longo dos anos, hoje já na terceira revisão do componente). No Brasil, o risco de falha por frio é menor, mas o desgaste natural do compressor e dos foles com o tempo continua sendo o ponto fraco nº1 desta geração — sintoma é o carro "sentando" de um lado ou perdendo altura sozinho.',
  },
  {
    severity: 'WARN',
    title: 'Aquecimento/ar-condicionado falha mais nas versões T8 híbridas',
    body: 'O sistema de climatização das versões T8 é mais complexo que o das T5/T6 (gerencia também a temperatura da bateria de tração), refletindo em mais queixas de falha de aquecimento/ar-condicionado nas unidades híbridas. Vale testar o sistema em todos os modos antes de comprar um usado.',
  },
]

const MANUTENCAO_GEN2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma XC90 SPA (2014/2015+) + ajuste uso severo BR',
    body: '10.000-15.000 km/12 meses — Troca de óleo do motor (T5/T6/T8, especificação exata do manual) + filtro de óleo — siga o sistema de manutenção adaptativo do carro. | Inspeção anual — Freios, suspensão a ar e níveis de fluido. | 20.000-30.000 km — Filtro de ar do motor e filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | 100.000 km — Inspeção da suspensão a ar (foles/compressor) — não espere sintoma para checar, é o ponto fraco nº1 desta geração. | T8 Recharge — Inspeção anual do sistema de alta tensão (bateria/cabos/porta de recarga), com atenção redobrada ao recall de bateria em unidades 2019-2021. | Sempre — recalibre câmeras/sensores do Pilot Assist após troca de para-brisa.',
  },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'XC 90', yearFrom: 2002, yearTo: 2014, MACETES: MACETES_GEN1, PROBLEMAS: PROBLEMAS_GEN1, MANUTENCAO: MANUTENCAO_GEN1 },
  { modelName: 'XC 90', yearFrom: 2015, yearTo: null, MACETES: MACETES_GEN2, PROBLEMAS: PROBLEMAS_GEN2, MANUTENCAO: MANUTENCAO_GEN2 },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'XC 90',
    yearFrom: 2002,
    yearTo: 2014,
    tireSize: '235/65 R17 · 235/60 R18 (versões superiores)',
    frontPsi: 32,
    rearPsi: 32,
    frontPsiLoad: 35,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'A etiqueta oficial fica na coluna da porta do motorista. Confirme sempre o valor exato do seu aro/versão — reforce a traseira com os 7 lugares ocupados e bagagem.',
  },
  {
    modelName: 'XC 90',
    yearFrom: 2015,
    yearTo: null,
    tireSize: '235/60 R18 · 235/55 R19 · 275/45 R20 (versões superiores/T8)',
    frontPsi: 33,
    rearPsi: 33,
    frontPsiLoad: 36,
    rearPsiLoad: 40,
    sparePsi: null,
    notes: 'Muitas unidades vêm sem estepe, apenas kit de reparo (selante + compressor). Etiqueta oficial na coluna da porta do motorista — confirme o valor exato do seu aro/versão, varia bastante entre T5/T6 e T8 pelo peso da bateria. Nas versões com suspensão a ar, a pressão do pneu continua sendo item separado do ajuste automático de altura. Reforce a traseira com os 7 lugares ocupados.',
  },
]

function mi(modelName: string, yearFrom: number | null, yearTo: number | null, items: Omit<MaintenanceItemInput, 'modelName' | 'yearFrom' | 'yearTo'>[]): MaintenanceItemInput[] {
  return items.map((item) => ({ modelName, yearFrom, yearTo, ...item }))
}

const GEN1_ITEMS: Omit<MaintenanceItemInput, 'modelName' | 'yearFrom' | 'yearTo'>[] = [
  { component: 'Óleo do motor', intervalKm: 15000, intervalMonths: 12, notes: 'Confirme especificação conforme motor (2.5T, T6 2.9 ou V8 4.4).', priority: 'CRITICAL', order: 0 },
  { component: 'Filtro de óleo', intervalKm: 15000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { component: 'Fluido do câmbio automático', intervalKm: 70000, intervalMonths: 48, notes: 'Não é vitalício. Prioridade alta em unidades 2003-2005 (4T65/TF80).', priority: 'HIGH', order: 2 },
  { component: 'Limpeza dos drenos do vão do motor (V8)', intervalKm: null, intervalMonths: 12, notes: 'Evita água entrando no bloco e enferrujando o mancal do eixo de balanceamento. Reforce após época de folhas caindo.', priority: 'HIGH', order: 3 },
  { component: 'Suspensão a ar (versões equipadas) — inspeção', intervalKm: 100000, intervalMonths: null, notes: 'Foles/compressor falham entre 100.000-150.000 km.', priority: 'MEDIUM', order: 4 },
  { component: 'Filtro de ar do motor', intervalKm: 30000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 5 },
  { component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 6 },
  { component: 'Velas de ignição', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },
  { component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 8 },
  { component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'HIGH', order: 9 },
]

const GEN2_ITEMS: Omit<MaintenanceItemInput, 'modelName' | 'yearFrom' | 'yearTo'>[] = [
  { component: 'Óleo do motor', intervalKm: 15000, intervalMonths: 12, notes: 'Confirme especificação conforme motor (T5/T6/T8) e siga o sistema de manutenção adaptativo do carro.', priority: 'CRITICAL', order: 0 },
  { component: 'Filtro de óleo', intervalKm: 15000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { component: 'Recall de bateria de alta tensão LG (versão T8, unidades 2019-2021)', intervalKm: null, intervalMonths: null, notes: 'Risco de incêndio — verificar na concessionária imediatamente, mesmo sem sintomas.', priority: 'CRITICAL', order: 2 },
  { component: 'Suspensão a ar (foles/compressor) — inspeção', intervalKm: 100000, intervalMonths: null, notes: 'Ponto fraco nº1 desta geração. Altura irregular do carro é o primeiro sinal.', priority: 'HIGH', order: 3 },
  { component: 'Sistema de alta tensão (bateria/cabos/porta de recarga) — versão T8', intervalKm: null, intervalMonths: 12, notes: 'Inspeção anual. Mantenha o hábito de recarregar regularmente.', priority: 'CRITICAL', order: 4 },
  { component: 'Filtro de ar do motor', intervalKm: 30000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 5 },
  { component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 6 },
  { component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 7 },
  { component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'HIGH', order: 8 },
  { component: 'Recalibração de câmeras/sensores do Pilot Assist', intervalKm: null, intervalMonths: null, notes: 'Obrigatória após troca de para-brisa ou reparo no para-choque dianteiro.', priority: 'HIGH', order: 9 },
  { component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 10 },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  ...mi('XC 90', 2002, 2014, GEN1_ITEMS),
  ...mi('XC 90', 2015, null, GEN2_ITEMS),
]

async function main() {
  console.log('🚗 Seed Volvo XC 90...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volvo', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volvo', vehicleTypeId: carroType.id },
  })

  const distinctModelNames = [...new Set(BLOCKS.map((b) => b.modelName))]
  for (const modelName of distinctModelNames) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: modelName, brandId: brand.id } },
      update: {},
      create: { name: modelName, brandId: brand.id },
    })
    await prisma.tip.deleteMany({ where: { modelName } })
  }

  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))

    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({
        modelName: block.modelName,
        category: cat,
        severity: tip.severity,
        title: tip.title,
        body: tip.body,
        yearFrom: block.yearFrom,
        yearTo: block.yearTo,
        order: order++,
      })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }

  const distinctTpModelNames = [...new Set(TIRE_PRESSURES.map((t) => t.modelName))]
  for (const modelName of distinctTpModelNames) {
    await prisma.tirePressure.deleteMany({ where: { modelName } })
  }
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo ?? '...'})`)
  }

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: distinctModelNames } },
  })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Volvo XC 90 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
