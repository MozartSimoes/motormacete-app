/**
 * Seed BYD Atto 8 — macetes, problemas, manutenção e calibragem de pneus
 * SUV grande híbrido plug-in (plataforma DM-p), topo de linha da BYD no Brasil,
 * com 6/7 lugares e tração integral (AWD). Motor 1.5 turbo (110 kW/150 cv) +
 * motor elétrico dianteiro (272 cv) + motor elétrico traseiro (216 cv),
 * potência combinada de 488 cv e 68,8 kgfm de torque, 0-100 km/h em 4,9 s.
 * Bateria Blade LFP de 35,6 kWh, autonomia elétrica pura em torno de 111 km
 * (dados variam entre ~85 km e 152 km NEDC conforme a fonte) e autonomia
 * total combinada de até 900 km. Lançado no Brasil em versão única por
 * R$ 399.990, com vendas iniciadas em março de 2026 — modelo muito recente,
 * histórico de confiabilidade e rede de peças alternativas ainda em formação.
 * Execute: pnpm --filter @motormacete/database db:seed:byd-atto8
 *
 * Fontes: byd.com/br (ficha técnica oficial e página do Atto 8), canalve.com.br,
 *         webmotors.com.br, automotivebusiness.com.br, automaistv.com.br,
 *         opovo.com.br, reclameaqui.com.br, cnnbrasil.com.br (garantia)
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
    title: 'Use o modo elétrico puro no dia a dia urbano para render o máximo do sistema',
    body: 'A bateria Blade LFP de 35,6 kWh entrega em torno de 111 km só no elétrico (varia entre ~85 km e 152 km conforme o ciclo de medição usado). Para deslocamentos urbanos dentro dessa faixa, prefira o modo 100% elétrico (EV) e recarregue sempre que possível em tomada residencial/wallbox — isso reduz o desgaste do motor 1.5 turbo e o consumo de combustível, deixando o motor a combustão só para viagens mais longas.',
  },
  {
    severity: 'OK',
    title: 'Planeje viagens longas contando com o tanque — autonomia total chega a 900 km',
    body: 'Com bateria carregada e tanque cheio (60 litros), a autonomia combinada do Atto 8 pode chegar a até 900 km (ciclo NEDC). Isso o torna competente para viagens longas mesmo em regiões sem pontos de recarga, mas mantenha o hábito de abastecer com antecedência: em rodovias, ficar sem combustível também interrompe a operação normal do sistema híbrido.',
  },
  {
    severity: 'WARN',
    title: 'Rodas de 21 polegadas e pneus 265/45 R21: cuidado redobrado com buracos',
    body: 'O Atto 8 vem de fábrica com rodas de liga leve de 21" e pneus de perfil baixo (265/45 R21). Esse conjunto tem menos "amortecimento" da própria borracha do pneu contra buracos e quebra-molas, então reduza a velocidade em pavimento ruim para evitar amassar a roda ou danificar o pneu — o custo de reposição desse conjunto é alto e ainda com pouca opção de pneu alternativo nessa medida específica no mercado nacional.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Calibragem de suspensão criticada pela imprensa — traseira "molenga" em buracos',
    body: 'Testes da imprensa especializada (Automotive Business) apontaram que a suspensão traseira do Atto 8, mesmo eletrônica adaptativa (DiSUS-C), reflete diretamente buracos, quebra-molas e valetas, com comportamento descrito como "molenga" para o porte e peso do carro (2.650 kg). Se notar trepidação ou balanço excessivo, vale registrar e comparar com outra unidade na concessionária — pode ser característica de calibragem de fábrica, não necessariamente defeito isolado.',
  },
  {
    severity: 'WARN',
    title: 'Pedal de freio com resposta pouco sensível, segundo avaliações da imprensa',
    body: 'Mais de uma avaliação (Auto+ TV) apontou que o pedal de freio do Atto 8 tem sensação "borrachuda" e resposta menos precisa do que o esperado para um SUV desse porte e potência (488 cv combinados). Adapte-se à frenagem regenerativa combinada com o freio a disco antes de rodar em trânsito denso ou estrada, e redobre a distância de segurança até se acostumar com o pedal.',
  },
  {
    severity: 'WARN',
    title: 'Relatos de defeitos e avarias na entrega (0 km) — vistorie com atenção antes de assinar',
    body: 'Há reclamações registradas no Reclame Aqui de unidades do Atto 8 entregues com avarias, sujeira, pendências não resolvidas e problemas de vedação (infiltração/vedação de portas e vidros). Antes de aceitar o carro na concessionária, faça vistoria completa de pintura, frestas, vedações de porta/porta-malas e funcionamento de todos os itens elétricos, e só assine o termo de entrega depois de tudo conferido.',
  },
  {
    severity: 'WARN',
    title: 'Modelo muito recente: histórico de confiabilidade ainda em formação',
    body: 'O Atto 8 chegou ao Brasil apenas em 2026 e ainda não acumulou tempo de uso suficiente para revelar problemas recorrentes de médio/longo prazo. Até aqui não há recall oficial registrado especificamente para o Atto 8 no Brasil. Trate qualquer ruído, luz de alerta ou comportamento fora do padrão como prioridade de diagnóstico na concessionária, e guarde todos os registros de manutenção — em modelos novos, o histórico documentado ajuda muito em caso de necessidade de garantia.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Atto 8 (BYD + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor 1.5 turbo + filtro de óleo. | 10.000 km — Inspeção de freios (atenção ao pedal, relatado como pouco sensível) e da suspensão eletrônica DiSUS-C dianteira e traseira. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | Anual — Inspeção do sistema de alta tensão (bateria Blade LFP, cabos e conectores) e do fluido de arrefecimento dedicado à bateria/eletrônica de potência. | Anual — Teste completo do carregador (portátil e wallbox) nas tensões disponíveis. | A cada abastecimento/recarga — Checar visualmente o estado dos pneus 265/45 R21 (perfil baixo, mais sensível a buracos) e a calibragem.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Atto 8',
    yearFrom: 2026,
    yearTo: null,
    tireSize: '265/45 R21',
    frontPsi: 36,
    rearPsi: 36,
    frontPsiLoad: 38,
    rearPsiLoad: 41,
    sparePsi: null,
    notes: 'Confirme sempre o valor exato na etiqueta da coluna da porta do motorista — SUV pesado (2.650 kg), a calibragem correta é ainda mais importante para segurança e desgaste dos pneus de perfil baixo. Verifique se sua unidade tem estepe ou apenas kit reparador.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Atto 8', yearFrom: 2026, yearTo: null, component: 'Óleo do motor 1.5 turbo', intervalKm: 10000, intervalMonths: 12, notes: 'Motor a combustão do sistema híbrido plug-in DM-p.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Atto 8', yearFrom: 2026, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Atto 8', yearFrom: 2026, yearTo: null, component: 'Fluido de arrefecimento da bateria de alta tensão', intervalKm: null, intervalMonths: 24, notes: 'Sistema dedicado de resfriamento da bateria Blade LFP e da eletrônica de potência — verifique nível e condição na revisão, siga o intervalo indicado no manual.', priority: 'HIGH', order: 2 },
  { modelName: 'Atto 8', yearFrom: 2026, yearTo: null, component: 'Sistema de alta tensão (bateria/cabos/conectores)', intervalKm: null, intervalMonths: 12, notes: 'Inspeção anual, incluindo teste do carregador (portátil e wallbox) em diferentes tensões.', priority: 'HIGH', order: 3 },
  { modelName: 'Atto 8', yearFrom: 2026, yearTo: null, component: 'Suspensão eletrônica DiSUS-C — inspeção', intervalKm: 10000, intervalMonths: null, notes: 'Imprensa relatou comportamento "molenga" na traseira em buracos e quebra-molas; monitore desgaste irregular e ruídos.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Atto 8', yearFrom: 2026, yearTo: null, component: 'Pneus 265/45 R21 — verificação de desgaste e calibragem', intervalKm: 5000, intervalMonths: null, notes: 'Perfil baixo é mais sensível a buracos; poucas opções de pneu alternativo nessa medida ainda no mercado nacional.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Atto 8', yearFrom: 2026, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza o intervalo em regiões com muita poeira.', priority: 'MEDIUM', order: 6 },
  { modelName: 'Atto 8', yearFrom: 2026, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 7 },
  { modelName: 'Atto 8', yearFrom: 2026, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 8 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Atto 8',
    yearFrom: 2026,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed BYD Atto 8...')

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

  console.log('✅ BYD Atto 8 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
