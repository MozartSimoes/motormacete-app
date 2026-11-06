/**
 * Seed Caoa Chery Tiggo 7 (Pro) — macetes, problemas, manutenção e calibragem
 * SUV médio produzido no Brasil (Jacareí/SP) pela joint-venture Caoa Chery.
 * #24 no ranking de vendas 2025 no Brasil (38.440 un.). PRIMEIRA marca Chery
 * cadastrada no MotorMacete — não existia nenhum modelo Chery no catálogo.
 * Três combinações de motor/câmbio sob o mesmo nome FIPE "Tiggo 7": 1.6 TGDI
 * turbo + câmbio DCT seco 7 marchas (versão "Pro" original), 1.5 TGDI turbo +
 * sistema mild-hybrid 48V + CVT (versão "Pro Max Drive Híbrido", ~160cv
 * combinados), e a versão híbrida mais forte tipo PHEV "Híbrido" de maior
 * potência combinada (~279cv). Versão "Sport" é um trim do 1.5 turbo não-híbrido.
 * Execute: pnpm --filter @motormacete/database db:seed:caoachery-tiggo7
 *
 * Fontes: caoachery.com.br, icarros.com.br, mobiauto.com.br, turbonoticias.com.br,
 *         clickpetroleoegas.com.br, jantes-e-pneus.com, fóruns de proprietários Chery Brasil
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
    title: 'Confirme sua motorização exata antes de comprar peça ou óleo',
    body: 'O Tiggo 7 Pro vem com pelo menos três combinações diferentes de motor/câmbio no Brasil: 1.6 TGDI turbo + câmbio DCT seco de 7 marchas (versão original "Pro"), 1.5 TGDI turbo + sistema mild-hybrid 48V + câmbio CVT (versão "Pro Max Drive", ~160cv combinados) e a versão híbrida mais robusta "Híbrido" (~279cv combinados, maior autonomia elétrica). São arquiteturas de câmbio completamente diferentes (embreagem seca vs. CVT) — confirme a sua na nota fiscal ou na etiqueta do motor antes de qualquer serviço.',
  },
  {
    severity: 'WARN',
    title: 'DCT seco 1.6: evite "pisar e segurar" em rampa — use o freio de mão',
    body: 'O câmbio DCT (dupla embreagem seca) da versão 1.6 turbo sofre desgaste acelerado do disco de embreagem quando o motorista segura o carro parado em rampa só com o pedal do acelerador (a embreagem fica "patinando" continuamente). Em subidas, use sempre o freio de mão ou o freio de serviço para segurar o carro parado, e solte só ao acelerar para sair. Esse hábito sozinho evita boa parte dos casos de troca prematura de embreagem do DCT.',
  },
  {
    severity: 'OK',
    title: 'Versão Max Drive (mild-hybrid 48V): não precisa de tomada, recupera energia sozinho',
    body: 'A versão "Pro Max Drive" usa um sistema mild-hybrid 48V que auxilia o motor 1.5 turbo na retomada e recupera energia na frenagem — não é plug-in, não existe cabo de recarga. A bateria de 48V é separada da bateria convencional de 12V do carro. Se notar queda de desempenho na função híbrida, pode ser a bateria 48V precisando de diagnóstico, não a bateria comum de arranque.',
  },
  {
    severity: 'OK',
    title: 'Etanol x gasolina: motor turbo TGDI aceita ambos, mas monitore o consumo real',
    body: 'Os motores 1.5/1.6 TGDI são flex e aceitam etanol e gasolina, mas o software de calibração desses motores foi originalmente desenvolvido para o mercado chinês (só gasolina) e adaptado para o Brasil — o ganho de potência com etanol é menos pronunciado que em motores nacionais otimizados para flex há décadas (Fiat, VW, GM). Não espere o mesmo salto de desempenho com etanol que você teria em um motor Fire ou EA211, por exemplo.',
  },
  {
    severity: 'OK',
    title: 'Peças: rede de concessionárias Caoa Chery ainda é menor que marcas tradicionais',
    body: 'Por ser marca relativamente nova no Brasil (a joint-venture Caoa Chery começou a produção nacional em 2016), a rede de concessionárias e a disponibilidade de peças em estoque local ainda são menores que Fiat/VW/Chevrolet/Toyota. Planeje a compra de peças de desgaste (pastilhas, filtros, correias) com mais antecedência, principalmente fora de capitais — o prazo de entrega de peças específicas pode ser mais longo.',
  },
  {
    severity: 'OK',
    title: 'Multimídia: reinicialização resolve boa parte dos travamentos',
    body: 'Se a central multimídia travar ou ficar lenta para responder, desligue o carro, aguarde a tela apagar completamente e ligue de novo antes de levar à concessionária — resolve boa parte dos casos. Se travar com frequência, procure por atualização de firmware disponível (gratuita).',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Câmbio DCT: trancos, "engasgos" e relatos de desligamento repentino',
    body: 'O câmbio DCT seco de 7 marchas do 1.6 turbo é o ponto mais criticado pelos donos — trancos ao trocar de marcha, hesitação em baixa velocidade (manobra/estacionamento) e, em casos mais graves, relatos de desligamento repentino do motor e dificuldade para dar partida. Se notar qualquer padrão de tranco recorrente, não normalize — documente data/km/situação e leve à concessionária cedo. A Chery já fez atualizações de software do módulo de câmbio (TCU) para tentar suavizar o comportamento em alguns lotes.',
  },
  {
    severity: 'WARN',
    title: 'Pane elétrica e falhas na multimídia entre os defeitos mais citados',
    body: 'Ao lado dos problemas de câmbio, pane elétrica geral e falhas na central multimídia estão entre os 5 defeitos mais citados por proprietários do Tiggo 7 Pro. Sintomas variam de tela travando/reiniciando sozinha a comportamento elétrico errático (janelas, luzes). Atualização de firmware resolve parte dos casos de multimídia; panes elétricas mais sérias precisam de diagnóstico presencial.',
  },
  {
    severity: 'WARN',
    title: 'Ruídos de suspensão precoces: batidas secas na dianteira, estalos no volante',
    body: 'Relatos de ruídos de suspensão aparecendo cedo na vida do carro — batidas secas vindas da dianteira em buracos/lombadas, e estalos ao esterçar o volante em baixa velocidade (manobra). Geralmente ligado a buchas ou coxins que não seguram tão bem quanto o esperado no piso brasileiro. Não costuma ser falha estrutural grave, mas vale inspecionar cedo — buchas soltas aceleram desgaste de pneu.',
  },
  {
    severity: 'WARN',
    title: 'Revestimento do volante descascando antes dos 30.000 km',
    body: 'Assim como em outros modelos com volante revestido em material sintético, há relatos de descascamento do revestimento do Tiggo 7 antes de completar 30.000 km, mesmo com uso e cuidado normais — atribuído à qualidade do material não resistir bem ao calor do painel solar direto. Se notar o início do descascamento, documente e acione a garantia antes que piore.',
  },
  {
    severity: 'OK',
    title: 'Marca em expansão rápida no Brasil: fique de olho em recalls e campanhas',
    body: 'A Chery está em rápido crescimento de vendas no Brasil — isso normalmente acompanha uma curva de aprendizado de qualidade que melhora ano a ano (comum em toda montadora que expande rápido). Cadastre seu carro no site da Caoa Chery para receber notificações de recall/campanhas de atualização — parte dos problemas relatados (câmbio, multimídia) já geraram campanhas de atualização de software para lotes específicos.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Tiggo 7 Pro — 1.6 DCT, 1.5 Max Drive CVT e Híbrido (Chery + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (5W30 ou 0W20 sintético conforme motor/versão) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 30.000-40.000 km — Velas de ignição (motores turbo TGDI exigem grau térmico específico). | 40.000 km — Fluido de freio DOT 4. | 40.000-60.000 km — Óleo do câmbio DCT (versão 1.6) — NÃO deixe passar do prazo, é o ponto mais sensível do carro; fluido específico para embreagem seca, não é o mesmo de câmbio automático convencional. | 60.000 km — Óleo do câmbio CVT (versão Max Drive/Híbrido). | 60.000 km — Fluido de arrefecimento. | 80.000 km — Correia auxiliar do motor. | Verificação anual — bateria 48V (versões híbridas) e cabos de alta tensão.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Tiggo 7',
    yearFrom: 2022,
    yearTo: null,
    tireSize: '225/60 R18',
    frontPsi: 33,
    rearPsi: 33,
    frontPsiLoad: 35,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'Aro 18 é padrão em praticamente todas as versões do Tiggo 7 Pro no Brasil. Pressão de fábrica estimada 33/33 PSI vazio, 35/38 PSI com carga máxima — confirme sempre na etiqueta da coluna da porta do motorista, que é a fonte oficial e pode variar por versão/ano.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Tiggo 7', yearFrom: 2022, yearTo: null, component: 'Óleo do motor (1.5 ou 1.6 TGDI turbo, sintético)', intervalKm: 10000, intervalMonths: 12, notes: 'Confirme a viscosidade exata no manual — pode variar entre 5W30 e 0W20 conforme motor/versão.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Tiggo 7', yearFrom: 2022, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Tiggo 7', yearFrom: 2022, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza para 10.000-15.000 km em cidades com muita poeira/poluição.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Tiggo 7', yearFrom: 2022, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Tiggo 7', yearFrom: 2022, yearTo: null, component: 'Velas de ignição', intervalKm: 40000, intervalMonths: null, notes: 'Motores turbo TGDI exigem grau térmico específico — não usar vela genérica de motor aspirado.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Tiggo 7', yearFrom: 2022, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'Tiggo 7', yearFrom: 2022, yearTo: null, component: 'Óleo do câmbio DCT seco (versão 1.6 turbo)', intervalKm: 40000, intervalMonths: 24, notes: 'PONTO CRÍTICO do carro — fluido específico para embreagem seca. Não atrasar esta troca.', priority: 'CRITICAL', order: 6 },
  { modelName: 'Tiggo 7', yearFrom: 2022, yearTo: null, component: 'Óleo do câmbio CVT (versão Max Drive/Híbrido)', intervalKm: 60000, intervalMonths: 48, notes: 'Fluido CVTF específico — não usar ATF genérico.', priority: 'CRITICAL', order: 7 },
  { modelName: 'Tiggo 7', yearFrom: 2022, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Chery.', priority: 'HIGH', order: 8 },
  { modelName: 'Tiggo 7', yearFrom: 2022, yearTo: null, component: 'Correia auxiliar do motor', intervalKm: 80000, intervalMonths: null, notes: 'Inspecionar ressecamento/trincas antes de decidir trocar.', priority: 'MEDIUM', order: 9 },
  { modelName: 'Tiggo 7', yearFrom: 2022, yearTo: null, component: 'Bateria 48V e cabos de alta tensão (versões híbridas)', intervalKm: null, intervalMonths: 12, notes: 'Verificação anual em concessionária. Não realizar serviços na área sem desconectar conforme manual.', priority: 'HIGH', order: 10 },
  { modelName: 'Tiggo 7', yearFrom: 2022, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Aproveite para checar desgaste irregular por alinhamento.', priority: 'MEDIUM', order: 11 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Tiggo 7',
    yearFrom: 2022,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Caoa Chery Tiggo 7...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Caoa Chery', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Caoa Chery', vehicleTypeId: carroType.id },
  })
  console.log(`  ✅ Marca criada/confirmada: ${brand.name}`)

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

  console.log('✅ Caoa Chery Tiggo 7 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
