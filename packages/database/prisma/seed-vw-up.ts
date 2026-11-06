/**
 * Seed Volkswagen up! — macetes, problemas, manutenção e calibragem
 * Hatch compacto vendido no Brasil de 2014 a 2021, fabricado em Taubaté-SP.
 * Chegou com motor 1.0 3 cilindros MPI aspirado (75/82cv) e câmbio manual de
 * 5 marchas ou automatizado I-Motion. A partir de 2015 (versão Speed) passou
 * a oferecer também o 1.0 TSI turbo (105cv/16,8kgfm), que virou o motor
 * principal das versões Pepper/Cross/Xtreme/black-white-red a partir de
 * 2017. Produção encerrada em abril de 2021, com a linha final composta
 * apenas pela versão Xtreme 170 TSI (4 lugares, sem versão 2 portas).
 * Execute: pnpm --filter @motormacete/database db:seed:vw-up
 *
 * Fontes: vrum.com.br, carros.blog.br, wikipedia.org (Volkswagen Up),
 *         automaistv.com.br, autorealidade.com.br, carroesporteclube.com.br,
 *         autossegredos.com.br, reclameaqui.com.br, canaldapeca.com.br,
 *         turbonoticias.com.br, calibragemdepneu.com.br, dana.com.br
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
    title: 'Duas mecânicas bem diferentes: MPI aspirado e TSI turbo',
    body: 'O up! teve duas famílias de motor 1.0 3 cilindros bem distintas: o MPI aspirado (take/move/high, cerca de 75-82cv) das versões de entrada, e o TSI turbo (a partir da versão Speed em 2015, depois Pepper/Cross/Xtreme/black-white-red TSI, ~105cv). Ao comprar peças ou buscar informação, confirme sempre se o motor do seu exemplar é MPI ou TSI — óleo, filtros e intervalos mudam entre eles.',
  },
  {
    severity: 'OK',
    title: 'Câmbio I-Motion: use o pedal de freio, não force o câmbio',
    body: 'No I-Motion (automatizado, com embreagem robotizada), espere o veículo parar totalmente antes de engatar R ou D, e sempre segure no freio ao trocar de marcha em paradas — isso reduz o desgaste da embreagem e evita o "solavanco" característico desse câmbio, motivo de muitas reclamações de proprietários.',
  },
  {
    severity: 'OK',
    title: 'Motor 3 cilindros: vibração e ronco grave são normais',
    body: 'Por ter apenas 3 cilindros, o 1.0 do up! tem uma vibração e um som de ronco mais grave que motores de 4 cilindros — isso é característica de projeto, não defeito. Vibração excessiva no marcha-lenta ou trepidação forte no volante, no entanto, merece inspeção de coxins do motor.',
  },
  {
    severity: 'OK',
    title: 'Fabricado em Taubaté-SP, mesma fábrica do Gol/Voyage antigos',
    body: 'O up! era produzido na fábrica da Volkswagen em Taubaté (SP), a mesma que fabricava Gol, Voyage e Saveiro. Rede de peças e conhecimento técnico para modelos dessa fábrica costuma ser ampla em oficinas de todo o país.',
  },
  {
    severity: 'OK',
    title: 'Muitas versões: confira exatamente qual é a sua na hora de buscar peça',
    body: 'O up! teve dezenas de variações ao longo dos anos — take, move, high, cross, black/white/red, speed, pepper, xtreme, connect, run e track, além das opções 2 ou 4 portas e MPI ou TSI. Ao pesquisar peça ou problema, informe sempre a versão completa e o ano — isso evita comprar peça errada, especialmente em itens de motor e câmbio.',
  },
  {
    severity: 'OK',
    title: 'TSI pede combustível de qualidade e troca de óleo em dia',
    body: 'O motor 1.0 TSI usa injeção direta e turbo, mais sensível a combustível de baixa qualidade e a atrasos na troca de óleo do que o MPI aspirado. Abasteça em postos de confiança e não estique o intervalo de troca de óleo — isso ajuda a evitar carbonização de válvulas e desgaste prematuro do turbo.',
  },
  {
    severity: 'OK',
    title: 'Produção encerrada em 2021: modelo mais antigo, atenção redobrada em usados',
    body: 'A produção do up! foi encerrada em abril de 2021 no Brasil, com a última leva sendo só a versão Xtreme 170 TSI. Ao comprar um up! usado hoje, ele já tem alguns anos de uso — vale reforçar a inspeção de itens de desgaste (embreagem do I-Motion, amortecedores, correia dentada) antes de fechar negócio.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall: airbag do motorista (Takata) — up! 2014 a 2017',
    body: 'A Volkswagen convocou recall do up! fabricado entre 19/04/2013 e 17/02/2017 para troca do airbag do motorista, por risco do inflador Takata romper e lançar fragmentos metálicos dentro do veículo em caso de acionamento. Verifique se o seu chassi está na lista pelo site oficial da VW (vw.com.br/recall) e agende o reparo gratuito, mesmo que o carro já tenha trocado de dono.',
  },
  {
    severity: 'DANGER',
    title: 'Recall: airbag do passageiro — up!, Gol, Voyage e Saveiro (nov/2015 a fev/2016)',
    body: 'Outro recall da Volkswagen envolveu o airbag do passageiro em veículos up!, Gol, Voyage e Saveiro fabricados entre 16/11/2015 e 24/02/2016, por risco de mau funcionamento em colisão frontal. Confira pelo chassi no site oficial da VW se o seu exemplar está na lista.',
  },
  {
    severity: 'WARN',
    title: 'Injetores do TSI: falha crônica nº 1 do motor 1.0 turbo',
    body: 'O problema mais recorrente relatado no 1.0 TSI é falha nos injetores de combustível: luz de EPC acesa no painel, motor engasgando/perdendo força e entrando em modo de emergência, além de cheiro forte de combustível não queimado na partida a frio. Se notar esses sintomas, leve para diagnóstico o quanto antes — rodar em modo de emergência por muito tempo pode agravar o dano.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio I-Motion: dificuldade para engatar marcha',
    body: 'Reclamações recorrentes sobre o I-Motion incluem dificuldade ou impossibilidade de engatar marcha, marcha "escapando" sozinha e a mensagem "entre em contato com a VW" no painel. Muitas vezes o problema é resolvido com recalibração eletrônica via scanner na concessionária — mas se persistir, pode indicar desgaste do atuador ou da embreagem.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de óleo elevado no motor TSI',
    body: 'O 1.0 TSI é conhecido por consumir mais óleo do que o esperado em alguns exemplares, às vezes associado à folga no eixo da turbina. Verifique o nível de óleo periodicamente entre as trocas (não só na revisão) e não ignore a luz de óleo baixo no painel.',
  },
  {
    severity: 'WARN',
    title: 'Vazamentos na bomba d\'água com termostato integrado',
    body: 'O conjunto da bomba d\'água com termostato integrado do 1.0 TSI pode apresentar pequenos vazamentos ao longo do tempo. Fique atento a perda de líquido de arrefecimento sem motivo aparente ou cheiro doce vindo do motor, e leve para inspeção — reparo tardio pode levar a superaquecimento.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma up! (Volkswagen + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (MPI ou TSI, conforme especificação do manual) + filtro de óleo. | 10.000 km — Rodízio de pneus e inspeção de freios. | 20.000 km — Filtro de ar do motor e filtro de cabine. | 40.000 km — Fluido de freio DOT 4 e velas de ignição. | 60.000 km — Correia dentada (motores MPI) — confirme o tipo exato de comando de válvulas do seu ano/versão antes de agendar. | 60.000 km — Fluido de arrefecimento, com atenção a vazamentos na bomba d\'água (TSI). | A cada revisão — Testar engate e comportamento do câmbio I-Motion, se equipado.',
  },
  {
    severity: 'WARN',
    title: 'Correia dentada: não estique o intervalo',
    body: 'Nas versões com motor MPI de comando por correia dentada, romper a correia pode causar dano severo ao motor (encontro de válvula com pistão). Respeite rigorosamente o intervalo recomendado no manual do seu ano/motor específico e não compre um up! usado sem confirmar quando essa peça foi trocada pela última vez.',
  },
  {
    severity: 'OK',
    title: 'I-Motion: manutenção preventiva evita boa parte das reclamações',
    body: 'Grande parte dos problemas de engate do câmbio I-Motion relatados por proprietários é resolvida ou evitada com manutenção preventiva do óleo/fluido da embreagem automatizada e recalibração eletrônica periódica na concessionária, em vez de esperar o problema aparecer.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'up!',
    yearFrom: 2014,
    yearTo: 2021,
    tireSize: '175/70 R14 (take/move/high) · 185/55-60 R15 (cross/pepper/xtreme/TSI)',
    frontPsi: 29,
    rearPsi: 26,
    frontPsiLoad: 32,
    rearPsiLoad: 36,
    sparePsi: 60,
    notes: 'Valores de referência para as versões com roda aro 14, uso com até 2 ocupantes (com carga completa, use os valores "com carga"). Versões com roda aro 15 (cross/pepper/xtreme/TSI) tendem a pedir 1-2 psi a mais. Confirme sempre o valor exato na etiqueta da coluna da porta do motorista.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'up!', yearFrom: 2014, yearTo: 2021, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Confirme a especificação exata do manual conforme motor (MPI ou TSI).', priority: 'CRITICAL', order: 0 },
  { modelName: 'up!', yearFrom: 2014, yearTo: 2021, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'up!', yearFrom: 2014, yearTo: 2021, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza o intervalo em regiões com muita poeira.', priority: 'MEDIUM', order: 2 },
  { modelName: 'up!', yearFrom: 2014, yearTo: 2021, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'up!', yearFrom: 2014, yearTo: 2021, component: 'Correia dentada (motores MPI)', intervalKm: 60000, intervalMonths: 48, notes: 'Item crítico: ruptura pode causar dano severo ao motor. Confirme o tipo de comando do seu motor/ano específico.', priority: 'CRITICAL', order: 4 },
  { modelName: 'up!', yearFrom: 2014, yearTo: 2021, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'up!', yearFrom: 2014, yearTo: 2021, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Fique atento a vazamentos na bomba d\'água (motor TSI).', priority: 'HIGH', order: 6 },
  { modelName: 'up!', yearFrom: 2014, yearTo: 2021, component: 'Velas de ignição', intervalKm: 40000, intervalMonths: null, notes: 'Confirme especificação (platinadas/irídio) conforme motor.', priority: 'MEDIUM', order: 7 },
  { modelName: 'up!', yearFrom: 2014, yearTo: 2021, component: 'Câmbio I-Motion — revisão da embreagem automatizada', intervalKm: 40000, intervalMonths: 24, notes: 'Manutenção preventiva reduz falhas de engate. Somente para versões com I-Motion.', priority: 'HIGH', order: 8 },
  { modelName: 'up!', yearFrom: 2014, yearTo: 2021, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'up!',
    yearFrom: 2014,
    yearTo: 2021,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Volkswagen up!...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volkswagen', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volkswagen', vehicleTypeId: carroType.id },
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

  console.log('✅ Volkswagen up! concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
