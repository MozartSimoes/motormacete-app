/**
 * Seed Chevrolet Prisma — macetes, problemas, manutenção e calibragem de pneus
 * Sedan compacto derivado da plataforma Corsa/Celta, vendido de 2006 a 2019.
 * Duas gerações bem diferentes: G1 "Celta Sedan" (2006-2012, motor 1.0/1.4
 * 8V VHC/EconoFlex, visual derivado do Celta) e G2 (2013-2019, motor 1.0/1.4
 * 8V, plataforma derivada do Onix, versões Joy/LS/LT/LTZ/Advantage/Maxx).
 * A partir de 2019/2020 o sucessor passa a se chamar "Onix Plus" — modelo
 * coberto em outro seed, não duplicado aqui.
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-prisma
 *
 * Fontes: turbonoticias.com.br, carroclub.com.br, autoo.com.br,
 *         reclameaqui.com.br, opinautos.com.br, calibrapneu.com.br
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
    title: 'Prisma G1 (2006-2012) é essencialmente um "Celta de porta-malas" — peças em comum',
    body: 'A primeira geração do Prisma compartilha motor 1.0/1.4 8V, suspensão e boa parte da elétrica com o Celta e o Corsa. Ao procurar peça em oficina independente, se não houver cadastro específico para "Prisma", peça pela referência do Celta/Corsa da mesma época — funciona na maioria dos itens mecânicos.',
  },
  {
    severity: 'WARN',
    title: 'Confirme a geração (G1 x G2) antes de comprar peça de suspensão ou lataria',
    body: 'G1 (2006-2012) e G2 (2013-2019) são plataformas diferentes, com peças de suspensão, freios e funilaria não intercambiáveis entre si na maioria dos casos. Sempre informe o ano exato do seu Prisma ao comprar peça — economiza tempo e evita devolução.',
  },
  {
    severity: 'OK',
    title: 'Não abuse do porta-malas — suspensão traseira sofre com carga constante',
    body: 'É comum donos usarem o porta-malas do Prisma para transportar carga pesada com frequência (ferramentas de trabalho, mercadoria). As molas traseiras não são dimensionadas para isso em uso constante e cedem com o tempo, deixando a traseira "baixa". Se seu uso é assim, considere reforçar a suspensão traseira preventivamente.',
  },
  {
    severity: 'WARN',
    title: 'Bobina de ignição: troque velas e cabos em dia para não acelerar o desgaste dela',
    body: 'A bobina de ignição original tem vida útil limitada e tende a trincar ou vazar corrente mais cedo quando velas e cabos de vela estão vencidos, pois força mais a peça. Manter a troca de velas em dia (conforme cronograma) é a forma mais barata de estender a vida da bobina.',
  },
  {
    severity: 'OK',
    title: 'Ruído "toc-toc" na coluna de direção: barato de resolver, não é motor',
    body: 'Um ruído seco vindo da coluna de direção ou de baixo do painel ao passar por paralelepípedo, ou ao girar o volante parado, costuma ser folga em bucha/junta da coluna de direção — reparo relativamente simples e barato. Não confundir com problema estrutural do carro.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Superaquecimento e "grilagem" no motor 1.4 EconoFlex (geração G1)',
    body: 'No Prisma G1 (2006-2012), o motor 1.4 apresenta relatos de superaquecimento crônico e ruído de "grilagem" (batida de pino/detonação). Pontos críticos: junta da tampa de válvulas, retentor do comando e anel de vedação da bobina — todos passíveis de vazamento de óleo com o tempo. Fique atento à temperatura do motor no painel e a ruídos metálicos na aceleração.',
  },
  {
    severity: 'WARN',
    title: 'Compressor do ar-condicionado com desgaste prematuro',
    body: 'Relatos de ar-condicionado que gela pouco em marcha lenta ou faz ruído de "ronco"/zumbido alto quando ligado — geralmente ligado a desgaste dos rolamentos ou pistões internos do compressor. Se notar esse comportamento, vale diagnosticar cedo: compressor com defeito avançado é item caro de trocar.',
  },
  {
    severity: 'WARN',
    title: 'Infiltração de água no porta-malas / compartimento do estepe',
    body: 'A borracha de vedação da tampa do porta-malas costuma ressecar ou vir mal encaixada de fábrica em alguns exemplares, permitindo infiltração de água que se acumula no compartimento do estepe. Se sentir cheiro de mofo ou notar água acumulada ao levantar o carpete do porta-malas, verifique a vedação da tampa.',
  },
  {
    severity: 'WARN',
    title: 'Direção elétrica pode endurecer/travar no centro mesmo com pouca km',
    body: 'Há relatos de endurecimento ou travamento perceptível no centro do volante em carros com quilometragem relativamente baixa (na faixa de 40.000 km). Se notar resistência incomum ao centralizar a direção, não ignore — pode indicar falha no módulo de assistência elétrica.',
  },
  {
    severity: 'WARN',
    title: 'Pastilhas e discos de freio com vida útil mais curta que o esperado',
    body: 'Proprietários relatam desgaste de pastilhas e discos já perto dos 15.000 km em média, mais rápido do que seria razoável esperar. Vale inspecionar os freios em intervalos mais curtos do que o padrão de mercado e não economizar em pastilha de qualidade.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Prisma 1.0/1.4 (G1 e G2)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo. | 10.000 km — Inspeção de freios (pastilhas/discos desgastam mais rápido nesse modelo). | 15.000-20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 30.000 km — Velas de ignição (não atrase — protege a bobina). | 40.000 km — Fluido de freio DOT 3/4 + kit correia dentada/tensionador (motores 8V a correia). | 60.000 km — Fluido de arrefecimento. | Rodízio de pneus a cada 10.000 km. | Verifique a vedação da tampa do porta-malas periodicamente para evitar infiltração no compartimento do estepe.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Prisma',
    yearFrom: 2006,
    yearTo: null,
    tireSize: '175/70 R14 · 185/65 R15 (varia por geração/versão)',
    frontPsi: 32,
    rearPsi: 32,
    frontPsiLoad: 34,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'Faixa de 32-35 PSI é comum para uso normal neste sedan, subindo com carga máxima (5 ocupantes + bagagem). Confirme o valor exato na etiqueta da coluna da porta do motorista, específica do seu ano/geração/tamanho de pneu.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Prisma', yearFrom: 2006, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Viscosidade conforme manual (varia entre G1 e G2).', priority: 'HIGH', order: 0 },
  { modelName: 'Prisma', yearFrom: 2006, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Prisma', yearFrom: 2006, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza o intervalo em cidades com muita poeira.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Prisma', yearFrom: 2006, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Prisma', yearFrom: 2006, yearTo: null, component: 'Velas de ignição', intervalKm: 30000, intervalMonths: null, notes: 'Não atrase — vela vencida acelera o desgaste da bobina de ignição.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Prisma', yearFrom: 2006, yearTo: null, component: 'Correia dentada + tensionador', intervalKm: 40000, intervalMonths: 60, notes: 'Aproveite para trocar a bomba d\'água junto. Confirme se sua motorização usa correia.', priority: 'CRITICAL', order: 5 },
  { modelName: 'Prisma', yearFrom: 2006, yearTo: null, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'Prisma', yearFrom: 2006, yearTo: null, component: 'Pastilhas e discos de freio — inspeção', intervalKm: 15000, intervalMonths: null, notes: 'Desgaste mais rápido que o padrão neste modelo — inspecione com mais frequência.', priority: 'HIGH', order: 7 },
  { modelName: 'Prisma', yearFrom: 2006, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Atenção especial em G1 — motor tem histórico de superaquecimento.', priority: 'HIGH', order: 8 },
  { modelName: 'Prisma', yearFrom: 2006, yearTo: null, component: 'Vedação da tampa do porta-malas — inspeção', intervalKm: 20000, intervalMonths: 12, notes: 'Previne infiltração de água no compartimento do estepe.', priority: 'LOW', order: 9 },
  { modelName: 'Prisma', yearFrom: 2006, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 10 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Prisma',
    yearFrom: 2006,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Prisma...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Chevrolet', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Chevrolet', vehicleTypeId: carroType.id },
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

  console.log('✅ Chevrolet Prisma concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
