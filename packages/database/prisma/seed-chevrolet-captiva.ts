/**
 * Seed Chevrolet Captiva — macetes, problemas, manutenção e calibragem de pneus
 * SUV médio de 5 ou 7 lugares vendido no Brasil entre 2008 e 2017 (plataforma
 * Theta, irmã do Opel Antara), motores 2.4 16V Ecotec, 3.0 V6 e 3.6 V6, com
 * tração dianteira (FWD) ou integral (AWD) e versão de acabamento "Sport".
 * Em 2026 a Chevrolet trouxe de volta o nome "Captiva" em um SUV elétrico
 * importado da China (Captiva EV Premier) — veículo tecnicamente sem relação
 * com o Captiva antigo, tratado aqui como bloco separado por ano.
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-captiva
 *
 * Fontes: motoragora.com.br, opinautos.com.br, vrum.com.br, carroclub.com.br,
 *         alvaromatiassa.blogspot.com, dezeroacem.com.br, jantes-e-pneus.com,
 *         gutierrezpneus.com.br, calibragemdepneu.com.br, autoentusiastas.com.br,
 *         canalve.com.br, webmotors.com.br, eletricos.app
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

// ─── Captiva a combustão (2008-2017) ───────────────────────────────────────

const MACETES_ICE: TipInput[] = [
  {
    severity: 'OK',
    title: 'Três opções de motor: 2.4 16V, 3.0 V6 ou 3.6 V6 — escolha pensando em manutenção',
    body: 'O 2.4 Ecotec (4 cilindros) é o mais barato de manter e mais fácil de achar peça. Os V6 3.0 e 3.6 entregam mais suavidade e potência, mas encarecem revisão, consomem mais e têm peças específicas menos disponíveis. Se o uso é urbano e o orçamento de manutenção é apertado, o 2.4 é o mais tranquilo dos três.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático 6T70 (versões V6): troque o ATF preventivamente, mesmo sem previsão no manual',
    body: 'A GM não especifica troca periódica do fluido do câmbio automático 6T70 (usado nas versões V6), mas oficinas especializadas recomendam trocar o ATF a cada 40.000 km mesmo assim — isso reduz o risco de o disco mola interno quebrar precocemente, falha que costuma levar à perda total da transmissão.',
  },
  {
    severity: 'OK',
    title: 'Versão AWD: não esqueça o óleo do diferencial traseiro',
    body: 'Nas versões com tração integral (AWD), o diferencial traseiro tem óleo próprio, separado do câmbio, e costuma ficar esquecido nas revisões porque não está no checklist básico das oficinas de bairro. Confirme com o mecânico se esse item foi verificado — o ressecamento do óleo é uma causa comum de ruído e desgaste prematuro do diferencial.',
  },
  {
    severity: 'WARN',
    title: 'Motor 2.4 Ecotec: fique de olho no consumo de óleo entre trocas',
    body: 'É comum o 2.4 consumir mais óleo do que se espera entre uma troca e outra. Verifique o nível a cada 1.000 km, principalmente antes de viagens, e sempre use a viscosidade e especificação indicadas no manual — deixar o nível cair sem perceber é o caminho mais rápido para dano de motor.',
  },
  {
    severity: 'OK',
    title: 'Peça baixo volume: procure oficinas especializadas em GM importados/SUVs',
    body: 'O Captiva teve volume de vendas bem menor que o Onix ou o Cruze, então nem toda oficina de bairro tem prática com o carro. Priorize oficinas que também atendem Opel Antara (plataforma irmã vendida na Europa) ou que trabalham com SUVs GM importados — elas costumam ter mais familiaridade com as peças específicas do Captiva.',
  },
]

const PROBLEMAS_ICE: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Câmbio automático 6T70 (V6): quebra do disco mola é falha catastrófica e recorrente',
    body: 'Nas versões com motor 3.6 V6, a transmissão automática 6T70 tem um disco mola interno que quebra relativamente cedo em muitos exemplares. Quando isso acontece, a consequência quase sempre é a perda total do câmbio, com reparo caro. Trocar o fluido ATF preventivamente ajuda a reduzir o risco, mas não elimina — fique atento a qualquer tranco ou demora anormal no engate.',
  },
  {
    severity: 'DANGER',
    title: 'Superaquecimento pode empenar o cabeçote — não ignore a temperatura subindo',
    body: 'O superaquecimento é um dos problemas mais citados por donos de Captiva. Inspecione regularmente o radiador, a válvula termostática e a bomba d\'água, e troque o fluido de arrefecimento no intervalo recomendado. Se o ponteiro de temperatura subir mais que o normal no trânsito, pare o carro assim que for seguro — rodar com superaquecimento é a forma mais comum de acabar com um cabeçote empenado.',
  },
  {
    severity: 'WARN',
    title: 'Válvula PCV (motores V6): consumo de óleo e fumaça azulada no escapamento',
    body: 'Nas versões V6, uma válvula PCV com defeito pode aumentar o consumo de óleo e causar fumaça azulada saindo do escapamento. Se notar esses sintomas, vale inspecionar a PCV antes de suspeitar de problemas maiores no motor — é uma peça de baixo custo comparada ao retrabalho de motor.',
  },
  {
    severity: 'WARN',
    title: 'Direção hidráulica: ruído e endurecimento indicam vazamento na bomba',
    body: 'Ruídos na direção ao esterçar podem indicar vazamento na bomba hidráulica ou nas mangueiras. Fique atento a qualquer endurecimento ao girar o volante e troque o fluido de direção periodicamente — postergar esse cuidado tende a acelerar o desgaste da bomba.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão desgasta mais rápido que a média em pisos ruins',
    body: 'Relatos recorrentes de desgaste prematuro de suspensão, principalmente em pisos irregulares. Os sintomas mais comuns são ruído ao passar por buracos e instabilidade em curvas. Inspecione buchas, bandejas e amortecedores nas revisões, especialmente se o uso é em ruas malcuidadas no dia a dia.',
  },
  {
    severity: 'WARN',
    title: 'Elétrica: painel de instrumentos, sensores e ar-condicionado dão trabalho',
    body: 'O Captiva acumula queixas de problemas elétricos — falhas no painel de instrumentos, sensores diversos e mau funcionamento do ar-condicionado aparecem com frequência nos relatos de proprietários. Não são falhas que colocam o carro em risco mecânico, mas valem inspeção elétrica completa na compra de um usado.',
  },
]

const MANUTENCAO_ICE: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Captiva 2.4/3.0/3.6 (Chevrolet + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo (verifique nível a cada 1.000 km entre trocas, principalmente no 2.4). | 10.000 km — Inspeção de freios, suspensão e níveis de fluido (direção hidráulica, arrefecimento). | 20.000 km — Filtro de ar do motor e filtro de cabine. | 30.000 km — Velas de ignição. | 40.000 km — Fluido de freio DOT 3/4. | 40.000 km — Óleo do câmbio automático (ATF) nas versões V6 — não é vitalício, antecipe mesmo sem previsão no manual. | 40.000 km — Óleo do diferencial traseiro (versões AWD). | 60.000 km — Fluido de arrefecimento (atenção redobrada, superaquecimento é problema conhecido). | Rodízio de pneus a cada 10.000 km.',
  },
]

// ─── Captiva EV Premier (2026-) ────────────────────────────────────────────

const MACETES_EV: TipInput[] = [
  {
    severity: 'OK',
    title: 'Captiva EV Premier: SUV elétrico chinês, sem parentesco mecânico com o Captiva antigo',
    body: 'O Captiva EV Premier (motor elétrico de 204 cv, bateria LFP de 60 kWh, autonomia de cerca de 304 km pelo PBEV/Inmetro) é importado da China em uma plataforma totalmente nova — não compartilha motor, câmbio ou suspensão com o Captiva 2.4/V6 vendido até 2017. Se for procurar peça ou informação técnica, não misture os dois: são carros diferentes que só dividem o nome.',
  },
  {
    severity: 'OK',
    title: 'Bateria LFP: priorize recarga AC no dia a dia, reserve o DC rápido para viagens',
    body: 'Baterias de química LFP (lítio-ferro-fosfato) toleram bem cargas frequentes até 100%, mas ainda assim a prática recomendada para qualquer elétrico é usar a recarga AC (mais lenta) na rotina e deixar a recarga DC rápida (até 120 kW, 30-80% em cerca de 30 minutos) para viagens — isso reduz o estresse térmico da bateria ao longo dos anos.',
  },
  {
    severity: 'OK',
    title: 'Mecânica muito mais simples que a versão a combustão — mas fique de olho nos freios',
    body: 'Sem motor a combustão, câmbio ou embreagem, a manutenção mecânica do Captiva EV é bem mais simples que a do Captiva antigo. O ponto de atenção é o oposto: como boa parte da frenagem é regenerativa (pelo motor elétrico), as pastilhas e discos trabalham menos e podem enferrujar ou "grudar" se o carro ficar muito tempo parado. Rode o carro com regularidade e acione o freio de vez em quando mesmo sem necessidade.',
  },
  {
    severity: 'WARN',
    title: 'Modelo muito recente: acompanhe boletins técnicos e recalls antes de confiar em "macete" de fórum',
    body: 'Por ser lançamento de 2026, ainda não existe histórico consolidado de falhas em uso real no Brasil. Até que se acumule experiência de proprietários, a fonte mais confiável de informação é a rede oficial Chevrolet — evite adaptações ou "soluções caseiras" vindas de fóruns sobre o Captiva a combustão, que é um carro tecnicamente diferente.',
  },
]

const PROBLEMAS_EV: TipInput[] = [
  {
    severity: 'OK',
    title: 'Sem histórico de problemas recorrentes documentado até o momento',
    body: 'Como o Captiva EV Premier chegou ao mercado brasileiro em 2026, ainda não há um volume de relatos de proprietários suficiente para apontar falhas recorrentes com confiança. Evite tomar como verdade absoluta qualquer "defeito clássico" citado sobre este carro por enquanto — priorize sempre o diagnóstico feito na rede oficial e a leitura de eventuais recalls publicados pela Chevrolet.',
  },
]

const MANUTENCAO_EV: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Captiva EV Premier (recomendações gerais para elétricos, confirme no manual)',
    body: 'Rodízio e inspeção de pneus a cada 10.000 km (pneus de elétrico tendem a desgastar mais rápido pelo peso extra da bateria e pelo torque instantâneo). | Inspeção do sistema de arrefecimento da bateria e do inversor conforme cronograma do manual — é item crítico em um EV e não existe em carro a combustão. | Verificação de discos e pastilhas de freio com atenção a corrosão por baixo uso, já que a frenagem regenerativa reduz o desgaste "normal" mas não protege contra ferrugem. | Atualizações de software (OTA) quando disponibilizadas pela Chevrolet — parte da manutenção de um elétrico moderno. | Fluido de arrefecimento do sistema de tração conforme intervalo do manual (não confundir com o antigo fluido de motor a combustão, que este carro não tem).',
  },
]

// ─── Consolidação ───────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Captiva',
    yearFrom: 2008,
    yearTo: 2017,
    tireSize: '235/60 R17 (aro 17) · 235/55 R18 (aro 18, versões Sport)',
    frontPsi: 32,
    rearPsi: 32,
    frontPsiLoad: 32,
    rearPsiLoad: 35,
    sparePsi: 60,
    notes: 'Pressão traseira sobe com carga plena (7 lugares/bagagem) — confirme o valor exato na etiqueta da coluna da porta do motorista, já que o Captiva teve mais de uma medida de pneu de fábrica.',
  },
  {
    modelName: 'Captiva',
    yearFrom: 2026,
    yearTo: null,
    tireSize: 'Consulte a etiqueta da porta (SUV elétrico, medida específica da versão Premier)',
    frontPsi: 35,
    rearPsi: 35,
    frontPsiLoad: null,
    rearPsiLoad: null,
    sparePsi: null,
    notes: 'Elétrico não tem estepe convencional na maioria das configurações — confirme na etiqueta da porta. Elétricos costumam pedir pressão um pouco mais alta que carros a combustão equivalentes por causa do peso extra da bateria.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Captiva', yearFrom: 2008, yearTo: 2017, component: 'Óleo do motor (2.4/3.0/3.6)', intervalKm: 10000, intervalMonths: 12, notes: 'Verifique nível a cada 1.000 km entre trocas, principalmente no 2.4 Ecotec.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Captiva', yearFrom: 2008, yearTo: 2017, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Captiva', yearFrom: 2008, yearTo: 2017, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 24, notes: 'Superaquecimento é problema conhecido — não atrase nem economize na qualidade do aditivo.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Captiva', yearFrom: 2008, yearTo: 2017, component: 'Óleo do câmbio automático — ATF (versões V6)', intervalKm: 40000, intervalMonths: 36, notes: 'Reduz risco de quebra do disco mola do câmbio 6T70. Não é previsto no manual, mas é recomendado por oficinas especializadas.', priority: 'HIGH', order: 3 },
  { modelName: 'Captiva', yearFrom: 2008, yearTo: 2017, component: 'Óleo do diferencial traseiro (versões AWD)', intervalKm: 40000, intervalMonths: 36, notes: 'Item comumente esquecido nas revisões de rotina.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Captiva', yearFrom: 2008, yearTo: 2017, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 5 },
  { modelName: 'Captiva', yearFrom: 2008, yearTo: 2017, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'Captiva', yearFrom: 2008, yearTo: 2017, component: 'Velas de ignição', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'Captiva', yearFrom: 2008, yearTo: 2017, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 8 },
  { modelName: 'Captiva', yearFrom: 2008, yearTo: 2017, component: 'Fluido de direção hidráulica', intervalKm: 40000, intervalMonths: 36, notes: 'Ruído ao esterçar costuma indicar vazamento na bomba.', priority: 'MEDIUM', order: 9 },
  { modelName: 'Captiva', yearFrom: 2026, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Desgaste mais rápido pelo peso da bateria e torque instantâneo.', priority: 'MEDIUM', order: 10 },
  { modelName: 'Captiva', yearFrom: 2026, yearTo: null, component: 'Inspeção do sistema de arrefecimento da bateria/inversor', intervalKm: 20000, intervalMonths: 12, notes: 'Item crítico exclusivo de veículo elétrico — siga o cronograma do manual.', priority: 'HIGH', order: 11 },
  { modelName: 'Captiva', yearFrom: 2026, yearTo: null, component: 'Discos e pastilhas de freio — inspeção contra corrosão', intervalKm: 20000, intervalMonths: 12, notes: 'Frenagem regenerativa reduz desgaste, mas favorece ferrugem por baixo uso do freio de fricção.', priority: 'MEDIUM', order: 12 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Captiva',
    yearFrom: 2008,
    yearTo: 2017,
    MACETES: MACETES_ICE,
    PROBLEMAS: PROBLEMAS_ICE,
    MANUTENCAO: MANUTENCAO_ICE,
  },
  {
    modelName: 'Captiva',
    yearFrom: 2026,
    yearTo: null,
    MACETES: MACETES_EV,
    PROBLEMAS: PROBLEMAS_EV,
    MANUTENCAO: MANUTENCAO_EV,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Captiva...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Chevrolet', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Chevrolet', vehicleTypeId: carroType.id },
  })

  const modelNames = [...new Set(BLOCKS.map((b) => b.modelName))]

  for (const modelName of modelNames) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: modelName, brandId: brand.id } },
      update: {},
      create: { name: modelName, brandId: brand.id },
    })
  }

  await prisma.tip.deleteMany({ where: { modelName: { in: modelNames } } })

  const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
  let order = 0
  const allTipsData = BLOCKS.flatMap((block) =>
    cats.flatMap((cat) =>
      block[cat].map((tip) => ({
        modelName: block.modelName,
        category: cat,
        severity: tip.severity,
        title: tip.title,
        body: tip.body,
        yearFrom: block.yearFrom,
        yearTo: block.yearTo,
        order: order++,
      }))
    )
  )
  await prisma.tip.createMany({ data: allTipsData })
  console.log(`  ✅ ${allTipsData.length} tips`)

  await prisma.tirePressure.deleteMany({ where: { modelName: { in: modelNames } } })
  await prisma.tirePressure.createMany({ data: TIRE_PRESSURES })
  console.log(`  🔵 TirePressures: ${TIRE_PRESSURES.length}`)

  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: modelNames } } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Chevrolet Captiva concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
