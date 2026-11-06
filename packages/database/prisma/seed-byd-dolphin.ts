/**
 * Seed BYD Dolphin — macetes, problemas, manutenção e calibragem
 * Hatch 100% elétrico, motor dianteiro, bateria Blade LFP, carregador
 * onboard AC de 7 kW. Vendido no Brasil desde 2023. Migrado do seed.ts
 * histórico (conteúdo original preservado) + MaintenanceItem que faltava.
 * Execute: pnpm --filter @motormacete/database db:seed:byd-dolphin
 *
 * Fontes: reclameaqui.com.br, mobiauto.com.br, byd.com, cnnbrasil.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

const MACETES: TipInput[] = [
  { severity: 'OK', title: 'Configure o limite de carga em 90% no menu', body: 'Acesse Configurações → Carregamento → Limite de Carga e ajuste para 90%. A BYD recomenda 80-90% para uso diário. Reserve os 100% apenas para viagens longas onde a autonomia total é necessária.' },
  { severity: 'OK', title: 'Carga programada para tarifação reduzida', body: 'Use o modo de carga agendada para carregar de madrugada (00h–06h), quando a tarifa de energia é mais barata. O app BYD Link permite configurar horários e limite de carga remotamente.' },
  { severity: 'WARN', title: 'App BYD Link: calibre pelo veículo, não pelo app', body: 'O app às vezes mostra dados diferentes do painel. Para informações críticas (autonomia real, temperatura da bateria), sempre confira no painel do veículo.' },
  { severity: 'OK', title: 'Modo Eco prolonga autonomia em até 15%', body: 'Em tráfego urbano e curtas distâncias, use o modo Eco. Ele reduz a potência máxima mas aumenta a recuperação regenerativa, podendo ganhar até 15% de autonomia em cidade.' },
]

const PROBLEMAS: TipInput[] = [
  { severity: 'OK', title: 'Recall de direção na China (2022-2023) não afeta unidades do Brasil', body: 'Em 2025 a BYD convocou recall na China para cerca de 97.000 Dolphin e Yuan Plus fabricados entre novembro/2022 e dezembro/2023 por risco de incêndio na unidade de controle de direção. A BYD Brasil esclareceu oficialmente que a medida é exclusiva do mercado chinês (linha de produção diferente da usada para exportação) e NÃO afeta unidades vendidas no Brasil. Fica o registro para quem pesquisa notícia internacional e se preocupa à toa — não é motivo de alarme para carros comprados aqui.' },
  { severity: 'WARN', title: 'Pintura sensível — arranhões fáceis', body: 'O acabamento de pintura do Dolphin é frequentemente criticado por donos brasileiros: arranhões aparecem com facilidade em lavagens e até em contato com roupas. Ceramic coating ou PPF nas primeiras semanas é fortemente recomendado.' },
  { severity: 'WARN', title: 'Bancos: foam de baixa densidade', body: 'Os bancos dianteiros perdem a firmeza com uso intenso. Não é defeito de segurança, mas afeta o conforto em viagens longas. Capa de assento ou almofada ajudam.' },
  { severity: 'OK', title: 'Carregador AC de 7 kW: carga mais lenta', body: 'O Dolphin tem carregador onboard de 7 kW (AC), o que é adequado mas não dos mais rápidos. Uma carga completa em parede 220V (7 kW) leva ~8 horas. Para uso diário, deixe conectado durante a noite.' },
  { severity: 'WARN', title: 'Autonomia real ~20% menor que o anunciado', body: 'A autonomia real do Dolphin, em condições brasileiras (calor, AC ligado, tráfego parado), fica entre 300–350 km vs. os 400 km WLTP anunciados. Planeje viagens com margem de segurança de pelo menos 20%.' },
]

const MANUTENCAO: TipInput[] = [
  { severity: 'OK', title: 'Sem troca de óleo — motor elétrico BYD', body: 'O motor elétrico do Dolphin não usa óleo lubrificante. A revisão se resume a: fluido de freio, pneus, filtro de cabine e inspeção geral — muito mais simples e barata que um ICE.' },
  { severity: 'WARN', title: 'Fluido de freio DOT 4 a cada 2 anos', body: 'Mesmo com frenagem regenerativa intensiva, o fluido de freio absorve umidade ao longo do tempo. BYD recomenda substituição a cada 2 anos ou se o ponto de ebulição cair abaixo do especificado.' },
  { severity: 'OK', title: 'Fluido de arrefecimento da bateria a cada 5 anos', body: 'O sistema de gerenciamento térmico da bateria LFP usa fluido específico. BYD recomenda inspeção a cada 2 anos e substituição a cada 5 anos ou 100.000 km.' },
  { severity: 'OK', title: 'Rotação de pneus a cada 10.000 km', body: 'O Dolphin tem tração dianteira e motor na frente. O peso e o torque instantâneo desgastam os pneus dianteiros mais rápido — rotacione frequentemente.' },
  { severity: 'OK', title: 'Cronograma Dolphin (BYD + ajuste uso severo BR)', body: '10.000 km — Verificação de freios, suspensão e níveis de fluido. | 12 meses — Filtro de cabine. | 24 meses — Fluido de freio DOT 4. | 5 anos/100.000 km — Fluido de arrefecimento da bateria (inspecionar a cada 2 anos). | 10.000 km — Rotação de pneus dianteiros/traseiros.' },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Dolphin', yearFrom: 2023, yearTo: null, tireSize: '195/60 R16', frontPsi: 36, rearPsi: 33, frontPsiLoad: 38, rearPsiLoad: 36, sparePsi: null, notes: 'Tração dianteira — frontal com mais pressão. Sem estepe: kit de reparação incluso. Calibre frio semanalmente.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Dolphin', yearFrom: 2023, yearTo: null, component: 'Inspeção de freios, suspensão e níveis de fluido', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 0 },
  { modelName: 'Dolphin', yearFrom: 2023, yearTo: null, component: 'Rotação de pneus (dianteira mais carregada)', intervalKm: 10000, intervalMonths: null, notes: 'Motor e torque concentrados no eixo dianteiro.', priority: 'MEDIUM', order: 1 },
  { modelName: 'Dolphin', yearFrom: 2023, yearTo: null, component: 'Filtro de cabine', intervalKm: null, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'Dolphin', yearFrom: 2023, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Troca por tempo mesmo com pouco uso do freio mecânico (regenerativa faz a maior parte).', priority: 'HIGH', order: 3 },
  { modelName: 'Dolphin', yearFrom: 2023, yearTo: null, component: 'Fluido de arrefecimento da bateria', intervalKm: 100000, intervalMonths: 60, notes: 'Inspecionar a cada 2 anos, substituir a cada 5 anos/100.000 km.', priority: 'HIGH', order: 4 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'Dolphin', yearFrom: 2023, yearTo: null, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed BYD Dolphin...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'BYD', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'BYD', vehicleTypeId: carroType.id },
  })
  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {}, create: { name: block.modelName, brandId: brand.id },
    })
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.deleteMany({ where: { modelName: block.modelName } })
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }, idx) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: idx })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName } })
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: ${tp.modelName}`)
  }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: BLOCKS.map((b) => b.modelName) } } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ BYD Dolphin concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
