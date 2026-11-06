/**
 * Seed BYD Dolphin Plus — macetes, problemas, manutenção e calibragem
 * Versão topo de linha do hatch 100% elétrico Dolphin: bateria Blade LFP de
 * 60,48 kWh (vs. 44,9 kWh do Dolphin básico), motor de 204 cv/150 kW
 * (vs. 95 cv do básico), autonomia declarada de até 330 km (ciclo PBEV/
 * INMETRO) e recarga DC rápida (30-80% em ~30 min). Rodas exclusivas aro 17,
 * teto solar panorâmico, bancos dianteiros aquecidos com ajuste elétrico e
 * carregamento sem fio para celular. Lançado no Brasil em setembro/2023.
 * Este arquivo cobre SÓ as diferenças/especificidades do Plus — o conteúdo
 * genérico do Dolphin (sem óleo, fluido de freio, etc.) já vem do seed
 * seed-byd-dolphin.ts, pois "Dolphin" é substring de "Dolphin Plus".
 * Execute: pnpm --filter @motormacete/database db:seed:byd-dolphin-plus
 *
 * Fontes: byd.com/br (ficha técnica oficial + release de lançamento),
 *         reclameaqui.com.br, mobiauto.com.br, autopapo.com.br,
 *         vrum.com.br, cnnbrasil.com.br, olhardigital.com.br,
 *         jantes-e-pneus.com, acheipneus.com.br
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
    title: 'Aproveite a recarga DC rápida — mas não abuse dela no dia a dia',
    body: 'O diferencial do Dolphin Plus é o carregador DC rápido, que leva a bateria de 30% a 80% em cerca de 30 minutos em eletropostos compatíveis (CCS2). Use a recarga DC para viagens e emergências, mas prefira a recarga AC lenta (tomada/wallbox) no dia a dia — recargas DC frequentes aceleram o desgaste da bateria a longo prazo, mesmo em células LFP, que são mais tolerantes que outras químicas.',
  },
  {
    severity: 'OK',
    title: 'Bateria maior (60,48 kWh) permite rodar mais dias sem plugar',
    body: 'Com quase 35% mais capacidade de bateria que o Dolphin básico, o Plus tolera um uso mais folgado — dá para rodar vários dias de cidade sem precisar recarregar todo dia. Ainda assim, mantenha o hábito de carregar entre 20% e 90% no uso rotineiro e reserve os 100% só para viagens, para preservar a vida útil da bateria.',
  },
  {
    severity: 'WARN',
    title: 'Planeje viagens com margem: autonomia real fica bem abaixo do declarado',
    body: 'A BYD declara até 330 km de autonomia (ciclo PBEV/INMETRO) para o Dolphin Plus, mas relatos de proprietários no Reclame Aqui indicam autonomia real de 150 a 280 km no uso urbano brasileiro, com ar-condicionado ligado e trânsito parado. Para viagens, calcule com margem de segurança de pelo menos 30-40% sobre o valor de tabela e mapeie os pontos de recarga DC na rota antes de sair.',
  },
  {
    severity: 'OK',
    title: 'Rodas aro 17 exclusivas: cuidado redobrado com buracos',
    body: 'O Plus usa rodas de liga leve aro 17 com pneus de perfil mais baixo (205/50 R17) que o Dolphin básico (195/60 R16). Perfil mais baixo significa menos "almofada" de borracha para absorver impacto — reduza a velocidade em buracos e lombadas para evitar amassar a roda ou furar o pneu.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Recall de direção na China (2022-2023) menciona o Dolphin, mas não afeta unidades do Brasil',
    body: 'A BYD convocou recall na China para modelos Dolphin (incluindo Plus) e Yuan Plus fabricados entre novembro/2022 e dezembro/2023, por risco de incêndio na unidade de controle de direção elétrica. A BYD Brasil esclareceu oficialmente que a linha de produção para exportação é diferente da usada no mercado chinês e que as unidades vendidas no Brasil NÃO apresentam o defeito identificado nem estão incluídas no recall. Se você pesquisar essa notícia internacional, não é motivo de preocupação para o carro comprado aqui.',
  },
  {
    severity: 'WARN',
    title: 'Autonomia muito inferior à prometida é a queixa mais comum no Reclame Aqui',
    body: 'A reclamação mais recorrente sobre o Dolphin Plus é autonomia real muito abaixo dos 330 km declarados — alguns donos relatam nunca ter passado de 280 km, e em casos extremos apenas ~150 km por carga completa. Antes de comprar pensando em viagens longas frequentes, teste o carro em test-drive real e converse com outros donos em fóruns (ex: dolphinbyd.com.br) sobre a autonomia no seu perfil de uso.',
  },
  {
    severity: 'WARN',
    title: 'Pós-venda BYD: peças podem demorar, mesmo com o item em estoque',
    body: 'A BYD ocupa posições baixas em rankings de satisfação pós-venda no Brasil, com queixas recorrentes de demora na liberação de peças (há relatos de mais de 100 dias de espera por peça de colisão mesmo com o item fisicamente em estoque, por problema de sistema/faturamento da distribuidora) e dificuldade para conseguir carro reserva durante reparos longos. Por ser um modelo relativamente novo no país, a rede de peças alternativas (não-BYD) ainda é escassa — na prática, boa parte dos reparos depende da concessionária. Ao negociar, pergunte especificamente sobre disponibilidade de peças de carroceria e prazo médio de reparo na sua região.',
  },
  {
    severity: 'WARN',
    title: 'Defeito em pneu de fábrica sem cobertura de garantia reconhecida',
    body: 'Há relato de proprietário com defeito de fabricação identificado no pneu original, com a concessionária negando cobertura de garantia sob alegação de desgaste por uso. Se notar bolha, deformação ou desgaste irregular precoce no pneu, fotografe e registre a reclamação formalmente logo no início, para ter histórico documentado caso precise contestar a negativa.',
  },
  {
    severity: 'OK',
    title: 'Itens exclusivos do Plus: ADAS nível 2 e 7 airbags',
    body: 'Diferente do Dolphin básico (6 airbags), o Plus vem com 7 airbags, incluindo airbag central entre os bancos dianteiros, além de pacote ADAS nível 2 (assistentes avançados de condução — frenagem automática de emergência, alerta de colisão, controle de cruzeiro adaptativo). Confira no manual quais funções vêm ativas de fábrica e quais dependem de atualização de software, já que alguns recursos podem chegar via OTA (atualização remota).',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Teto solar panorâmico: limpe os trilhos de drenagem',
    body: 'O Dolphin Plus tem teto solar panorâmico elétrico, item que não existe na versão básica. Limpe periodicamente os canais de drenagem de água nas bordas do teto (evita infiltração e mofo) e evite abrir o teto em lavagens automáticas.',
  },
  {
    severity: 'OK',
    title: 'Sistema de carregamento DC: inspeção do conector CCS2',
    body: 'Por usar recarga DC rápida com mais frequência que o Dolphin básico (que só carrega em AC), vale inspecionar visualmente o conector de carregamento (porta CCS2) a cada revisão, verificando sinais de superaquecimento, sujeira ou desgaste nos pinos de contato.',
  },
  {
    severity: 'OK',
    title: 'Cronograma Dolphin Plus — itens específicos (some ao cronograma geral do Dolphin)',
    body: '12 meses — Inspeção do conector de carregamento DC (porta CCS2) e do carregador AC de bordo. | 12 meses — Limpeza dos canais de drenagem do teto solar panorâmico. | A cada revisão — Verificar funcionamento dos sistemas ADAS (câmeras e radares de assistência à condução) e calibração se necessário após troca de para-brisa. | A cada abastecimento/recarga — Verificar desgaste dos pneus 205/50 R17, perfil mais baixo que o Dolphin básico e mais sensível a buracos.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Dolphin Plus',
    yearFrom: 2023,
    yearTo: null,
    tireSize: '205/50 R17',
    frontPsi: 36,
    rearPsi: 33,
    frontPsiLoad: 38,
    rearPsiLoad: 36,
    sparePsi: null,
    notes: 'Rodas aro 17 exclusivas da versão Plus (diferente do 195/60 R16 do Dolphin básico). Tração dianteira — frontal com mais pressão. Sem estepe: kit de reparação incluso. Confirme o valor exato na etiqueta da coluna da porta do motorista e calibre a frio semanalmente.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Dolphin Plus', yearFrom: 2023, yearTo: null, component: 'Conector de carregamento DC (porta CCS2) — inspeção', intervalKm: null, intervalMonths: 12, notes: 'Verificar sinais de superaquecimento, sujeira ou desgaste nos pinos, já que a versão Plus usa recarga DC com mais frequência.', priority: 'MEDIUM', order: 0 },
  { modelName: 'Dolphin Plus', yearFrom: 2023, yearTo: null, component: 'Sistema ADAS (câmeras e radares) — verificação/calibração', intervalKm: null, intervalMonths: 12, notes: 'Recalibrar após troca de para-brisa ou reparo na dianteira.', priority: 'MEDIUM', order: 1 },
  { modelName: 'Dolphin Plus', yearFrom: 2023, yearTo: null, component: 'Canais de drenagem do teto solar panorâmico — limpeza', intervalKm: null, intervalMonths: 12, notes: 'Evita infiltração e mofo no forro.', priority: 'LOW', order: 2 },
  { modelName: 'Dolphin Plus', yearFrom: 2023, yearTo: null, component: 'Pneus 205/50 R17 — verificação de desgaste e bolhas', intervalKm: 5000, intervalMonths: null, notes: 'Perfil mais baixo que o Dolphin básico, mais sensível a buracos; há relato de defeito de fabricação em pneu original sem garantia reconhecida.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Dolphin Plus', yearFrom: 2023, yearTo: null, component: 'Fluido de arrefecimento da bateria de alta capacidade (60,48 kWh)', intervalKm: 100000, intervalMonths: 60, notes: 'Inspecionar a cada 2 anos, substituir a cada 5 anos/100.000 km — mesmo intervalo do Dolphin básico, mas volume de fluido maior por conta da bateria maior.', priority: 'HIGH', order: 4 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Dolphin Plus',
    yearFrom: 2023,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed BYD Dolphin Plus...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'BYD', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'BYD', vehicleTypeId: carroType.id },
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

  console.log('✅ BYD Dolphin Plus concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
