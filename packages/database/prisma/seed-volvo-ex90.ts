/**
 * Seed Volvo EX90 — macetes, problemas, manutenção e calibragem
 * SUV grande 100% elétrico, 7 lugares, topo de linha da marca, sucessor
 * elétrico do XC90 (plataforma SPA2, a mesma base do Polestar 3). No
 * Brasil chegou em versão única "Twin Ultra" (motor duplo, tração
 * integral): dianteiro ~242cv + traseiro ~272cv, 517cv combinados,
 * bateria de 111 kWh, autonomia homologada Inmetro de até 459 km,
 * carregamento DC de até 250 kW. Lançamento recente (entregas no Brasil
 * a partir de abril de 2025) — histórico de confiabilidade ainda curto.
 * Modelo teve lançamento global bastante conturbado por causa de
 * software: atrasos de meses, problemas relatados por proprietários nos
 * EUA/Europa e um programa de troca do computador central. Números de
 * autonomia/bateria abaixo são os divulgados oficialmente para o Brasil;
 * evite comparar direto com mercados que usam ciclo de medição diferente.
 * Execute: pnpm --filter @motormacete/database db:seed:volvo-ex90
 *
 * Fontes: volvocars.com (specs oficiais BR), cnnbrasil.com.br, mixvale.com.br,
 *         webmotors.com.br, recharged.com, insideevs.com, thecarconnection.com,
 *         wheel-size.com
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
    title: 'Mantenha o software sempre atualizado — muitos problemas relatados foram corrigidos por update',
    body: 'O EX90 é um carro fortemente dependente de software (computador central único controlando praticamente tudo, incluindo faróis e assistentes de condução). Boa parte dos relatos de mau funcionamento no lançamento global do modelo (tela travando, chave digital falhando, faróis "Thor\'s Hammer" com comportamento estranho) foi corrigida por atualizações OTA ou em concessionária. Não ignore avisos de atualização disponível — muitas vezes resolvem sozinhos um comportamento estranho antes de virar motivo de visita à oficina.',
  },
  {
    severity: 'OK',
    title: 'Carga entre 20% e 80% no uso diário preserva a bateria de 111 kWh',
    body: 'Com uma bateria grande como a do EX90, o hábito de carga faz diferença real na vida útil. Configure o limite de carga do painel para 80% no dia a dia e reserve 100% só para viagens longas, carregando pouco antes de sair — e evite deixar o carro parado por longos períodos com bateria muito baixa (perto de 0%) ou muito alta (100%) sem motivo.',
  },
  {
    severity: 'OK',
    title: 'DC até 250 kW, mas a velocidade real de carga varia com temperatura da bateria',
    body: 'A carga rápida DC de 10% a 80% leva cerca de 30 minutos em carregador compatível com os 250 kW que o EX90 suporta — mas isso é o cenário ideal, com bateria pré-condicionada e carregador realmente potente. Em carregadores mais fracos (50-100 kW) ou com a bateria fria, o tempo é bem maior. Se o carro tiver a função de pré-condicionamento da bateria antes de chegar a um ponto de recarga rápida (defina o eletroposto como destino no navegador), use-a — acelera bastante a carga.',
  },
  {
    severity: 'OK',
    title: 'Frenagem regenerativa forte: acione o freio convencional de vez em quando',
    body: 'Como em outros elétricos da marca, a regenerativa do EX90 poupa bastante a pastilha de freio no uso diário. Isso é bom para durabilidade, mas o disco fica mais tempo sem trabalho de verdade — pise com um pouco mais de força no freio de tempos em tempos para evitar acúmulo de oxidação superficial, principalmente se você mora em região úmida ou litorânea.',
  },
  {
    severity: 'WARN',
    title: 'Modelo muito recente no Brasil: confirme rede de assistência técnica para elétrico de alta tensão antes de rodar longe',
    body: 'Por ser lançamento recente por aqui, nem toda concessionária Volvo tem estrutura e peça pronta para o EX90 especificamente (é um SUV grande com componentes próprios, diferentes do EX30/EX40). Antes de viagens longas para regiões mais distantes de centros grandes, identifique a concessionária mais próxima do trajeto que atenda o modelo.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Lançamento global conturbado: atraso de meses e onda de problemas de software em 2024-2025',
    body: 'O EX90 teve o lançamento internacional adiado por cerca de 5-6 meses por causa da complexidade do software (integração de radar/lidar com o computador central). Nos primeiros lotes vendidos fora do Brasil, proprietários relataram tela de infoentretenimento travando ou apagando, chave digital falhando, perda de potência em rodovia e ar-condicionado parando de funcionar — a maioria dos casos foi resolvida por atualização de software, mas ilustra que é um carro com curva de maturação de software mais longa que o normal.',
  },
  {
    severity: 'WARN',
    title: 'Recall internacional: obturadores do farol "Thor\'s Hammer" podiam fechar durante a condução',
    body: 'Um recall no exterior atingiu cerca de 2.000 unidades por uma falha de software que podia fazer os obturadores do farol assinatura da Volvo ("Thor\'s Hammer") fecharem durante a condução, reduzindo bastante a visibilidade à noite. Foi corrigido por atualização. Se notar qualquer variação estranha no funcionamento do farol, leve para verificação — pode ser um resquício desse tipo de falha de software ainda não atualizado.',
  },
  {
    severity: 'WARN',
    title: 'Programa de troca do computador central em unidades de primeiros lotes (mercados internacionais)',
    body: 'A Volvo anunciou a substituição do computador central de unidades do ano-modelo 2025 fabricadas nos primeiros lotes internacionais por uma versão de hardware mais nova, para suportar melhor atualizações futuras de software e assistentes de condução. Se você importou ou comprou uma unidade de fora desse período, vale confirmar na concessionária se ela está no escopo desse programa.',
  },
  {
    severity: 'OK',
    title: 'Histórico de confiabilidade no Brasil ainda é curto — acompanhe atualizações e recalls oficiais',
    body: 'Como o EX90 só chegou ao Brasil recentemente, ainda não há um histórico consolidado de problemas específicos do mercado nacional. Cadastre-se para receber alertas de recall pelo site oficial da Volvo (volvocars.com/br/l/proprietario/recalls) e confira o número de chassi periodicamente.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma EX90 (Volvo + itens específicos de EV)',
    body: 'Sem troca de óleo de motor, filtro de óleo, velas ou correia — é 100% elétrico. | Inspeção anual — Pastilhas e discos de freio (checar oxidação por baixo uso pela regenerativa forte). | 40.000 km / 24 meses — Fluido de freio DOT 4. | 20.000-30.000 km — Filtro de cabine (o EX90 tem sistema de purificação de ar mais robusto que a média — siga o alerta do painel). | 60.000-100.000 km — Fluido do sistema de arrefecimento da bateria e dos motores elétricos (confirme intervalo exato no manual). | Sempre disponível — Atualizações de software OTA/concessionária, resolvem boa parte das falhas eletrônicas relatadas neste modelo. | Anual — Inspeção do sistema de alta tensão (bateria/cabos/porta de recarga) e verificação de recall pendente pelo chassi. | Rodízio de pneus a cada 10.000 km — SUV grande e pesado (bateria de 111 kWh) desgasta pneu mais rápido que a média.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'EX90',
    yearFrom: 2025,
    yearTo: null,
    tireSize: '255/50 R20 (diant.) · 285/45 R20 (tras.) · opções 21"/22" conforme versão',
    frontPsi: 36,
    rearPsi: 42,
    frontPsiLoad: 38,
    rearPsiLoad: 44,
    sparePsi: null,
    notes: 'O EX90 usa pneus staggered (medida diferente entre dianteira e traseira) e a pressão varia bastante por aro (20"/21"/22"). Os valores acima são referência genérica para SUV elétrico grande — confirme SEMPRE o valor exato na etiqueta da coluna da porta do motorista do seu exemplar, já que a Volvo não divulga uma tabela única para todas as rodas. EX90 não tem estepe.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'EX90', yearFrom: 2025, yearTo: null, component: 'Sistema de alta tensão (bateria/cabos/porta de recarga)', intervalKm: null, intervalMonths: 12, notes: 'Inspeção anual + checar recall pendente pelo chassi no site oficial da Volvo.', priority: 'CRITICAL', order: 0 },
  { modelName: 'EX90', yearFrom: 2025, yearTo: null, component: 'Atualização de software (OTA/concessionária)', intervalKm: null, intervalMonths: 3, notes: 'Modelo com histórico de correções relevantes via software (farol, infoentretenimento, chave digital) — mantenha sempre atualizado.', priority: 'HIGH', order: 1 },
  { modelName: 'EX90', yearFrom: 2025, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 2 },
  { modelName: 'EX90', yearFrom: 2025, yearTo: null, component: 'Freios — inspeção (oxidação por baixo uso)', intervalKm: null, intervalMonths: 12, notes: 'Frenagem regenerativa reduz uso do freio mecânico — acione os freios convencionais periodicamente para evitar oxidação do disco.', priority: 'MEDIUM', order: 3 },
  { modelName: 'EX90', yearFrom: 2025, yearTo: null, component: 'Filtro de cabine/purificação de ar', intervalKm: 20000, intervalMonths: 12, notes: 'Siga o alerta do painel — sistema mais robusto que a média do segmento.', priority: 'MEDIUM', order: 4 },
  { modelName: 'EX90', yearFrom: 2025, yearTo: null, component: 'Fluido de arrefecimento da bateria/motores elétricos', intervalKm: 60000, intervalMonths: null, notes: 'Confirme intervalo exato no manual do seu ano/versão.', priority: 'HIGH', order: 5 },
  { modelName: 'EX90', yearFrom: 2025, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'SUV grande e pesado — desgaste mais rápido que a média do segmento a combustão.', priority: 'MEDIUM', order: 6 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'EX90',
    yearFrom: 2025,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Volvo EX90...')

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

  console.log('✅ Volvo EX90 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
