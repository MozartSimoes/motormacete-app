/**
 * Seed Chevrolet Tracker — macetes, problemas, manutenção e calibragem de pneus
 * Cobre as duas gerações, ambas modelName "Tracker":
 *  - Geração 1 (2013-2020, SUV compacto, motor 1.8 16V aspirado ou 2.0
 *    turbodiesel importado, tração 4x2/4x4, versão "Freeride")
 *  - Geração 2 (2020+, plataforma global, motor 1.0/1.2 Turbo Flex,
 *    LT/LTZ/Premier/RS/Midnight) — SUV mais vendido do Brasil em anos recentes
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-tracker
 *
 * Fontes: gruposentinela.com.br, mobiauto.com.br, newsmotor.com.br,
 *         vrum.com.br, opinautos.com, reclameaqui.com.br, autopapo.com.br,
 *         mercadoveiculos.com, garagem360.com.br
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

// ─── Tracker geração 1 (2013-2020, motor 1.8 16V aspirado ou 2.0 turbodiesel) ──

const MACETES_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 1.8 aspirado compartilha peças com outros modelos GM da mesma família',
    body: 'O motor 1.8 16V aspirado desta geração faz parte de uma família de motores usada em vários modelos da GM da época — isso ajuda na disponibilidade de peças de reposição (bomba d\'água, sensores, correias auxiliares) mesmo fora da concessionária.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático de 6 marchas (2013-2017): evite trocas bruscas em manobras',
    body: 'O câmbio automático de 6 marchas usado nos primeiros anos desta geração é mais propenso a trancos e engates irregulares. Reduza a agressividade ao alternar entre D/R em manobras de estacionamento e aguarde o carro parar completamente antes de trocar de marcha — reduz o desgaste dos componentes internos de engate.',
  },
  {
    severity: 'WARN',
    title: 'Mensagem "coloque a transmissão em P" mesmo com a alavanca em P: reprogramação resolve',
    body: 'Alguns proprietários relatam que o computador de bordo pede para colocar a transmissão em P mesmo com a alavanca já nessa posição, e o defeito impede desligar o motor. Geralmente é causado por falha na gestão eletrônica do câmbio — uma reprogramação de software na concessionária costuma resolver. Não force o desligamento pela chave nem pelo botão de emergência sem orientação, para não piorar o quadro.',
  },
  {
    severity: 'OK',
    title: 'Versão Freeride e tração 4x4: verifique regularmente o diferencial traseiro se rodar fora de asfalto',
    body: 'Nas versões 4x4/Freeride usadas em trilha ou estrada de terra com frequência, o óleo do diferencial traseiro e da caixa de transferência merece atenção redobrada — antecipe a inspeção se notar ruído diferente em curvas fechadas com tração acionada.',
  },
]

const PROBLEMAS_G1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Câmbio automático (2013-2017): trancos, dificuldade de engate e atraso na troca de marcha',
    body: 'Modelos produzidos entre 2013 e 2017 com câmbio automático de 6 marchas apresentam relatos recorrentes de trancos, dificuldade para engatar e atraso nas trocas de marcha. Se notar esse comportamento, vale diagnóstico cedo — o defeito tende a piorar progressivamente sem intervenção.',
  },
  {
    severity: 'WARN',
    title: 'Direção elétrica endurecendo e redução involuntária de potência do motor',
    body: 'Vários consumidores relataram defeito que enrijece a assistência da direção elétrica e, em casos mais graves, reduz a potência do motor de forma involuntária durante a condução. Se sentir a direção ficando pesada de repente ou perda de resposta do acelerador, procure diagnóstico imediatamente — pode envolver a gestão eletrônica do carro.',
  },
  {
    severity: 'DANGER',
    title: 'Braço de suspensão dianteiro (2017-2019) pode quebrar — houve recall',
    body: 'O braço de controle da suspensão dianteira de unidades de 2017, 2018 e 2019 pode quebrar, e peças de reposição do mesmo período também foram afetadas pela mesma falha — a GM fez recall para esse problema. Se você tem uma Tracker desses anos, confirme junto à concessionária se o seu chassi já passou pelo recall; é um item de segurança, não de conforto.',
  },
  {
    severity: 'WARN',
    title: 'Consumo alto de combustível relatado por proprietários',
    body: 'Há relatos de consumo de combustível acima do esperado, especialmente com álcool, em uso urbano. Filtro de ar sujo, pneus com pressão baixa e injeção fora do ponto pioram ainda mais esse quadro — vale garantir que esses itens básicos estejam em dia antes de aceitar o consumo alto como "normal do carro".',
  },
  {
    severity: 'WARN',
    title: 'Cheiro incômodo vindo do ar-condicionado e freios com ruído nos discos dianteiros',
    body: 'Queixas incluem mau cheiro nos dutos do ar-condicionado ao ligar o climatizador (geralmente resolvido com limpeza do evaporador/dutos) e ruído nos discos de freio dianteiros ao acionar ou soltar o pedal. Nenhum dos dois costuma indicar problema grave, mas ambos valem inspeção na revisão de rotina.',
  },
]

const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Tracker geração 1 (Chevrolet + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo. | 10.000 km — Inspeção de freios (atenção aos discos dianteiros), suspensão dianteira e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine — limpe o evaporador se notar cheiro no ar-condicionado. | 30.000 km — Velas de ignição. | 40.000 km — Fluido de freio DOT 3/4. | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Óleo do câmbio automático — não trate como vitalício, principalmente em unidades 2013-2017. | Versões 4x4: óleo do diferencial traseiro e caixa de transferência conforme uso em trilha/terra. | Rodízio de pneus a cada 10.000 km.',
  },
]

// ─── Tracker geração 2 (2020+, motor 1.0/1.2 Turbo Flex) ──────────────────────

const MACETES_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 1.0/1.2 Turbo Flex: use sempre óleo com certificação Dexos e não atrase a troca',
    body: 'Assim como no restante da linha Turbo Flex da GM, motores turbo pequenos são mais sensíveis a atraso de troca de óleo e a óleo fora de especificação. Use sempre óleo com certificação Dexos na viscosidade indicada pelo manual e respeite rigorosamente o intervalo — é a forma mais barata de evitar problemas caros no turbo e no motor a longo prazo.',
  },
  {
    severity: 'WARN',
    title: 'Bateria: mantenha a carga em dia mesmo em uso esporádico',
    body: 'Um dos problemas mais recorrentes relatados por proprietários é falha de bateria mesmo com pouco tempo de uso. Se o carro ficar parado por vários dias seguidos, considere um carregador de manutenção (trickle charger) ou dê partida periodicamente — evita ficar na mão por bateria fraca e evita sobrecarga no alternador ao arrancar com bateria muito descarregada.',
  },
  {
    severity: 'OK',
    title: 'Consumo de óleo em baixa quilometragem: monitore o nível manualmente',
    body: 'Alguns proprietários notam consumo de óleo acima do esperado mesmo com baixa quilometragem, possivelmente ligado a retentores de válvula ou anéis de pistão. Verifique o nível manualmente entre revisões, não confie apenas no sensor eletrônico — completar antecipadamente é bem mais barato que rodar com nível baixo.',
  },
  {
    severity: 'OK',
    title: 'Mensagem "coloque a transmissão em P" (câmbio automático): reprogramação de software resolve',
    body: 'Mesmo tipo de defeito relatado na geração anterior pode aparecer também nesta: mensagem no painel pedindo para colocar o câmbio em P mesmo já estando na posição correta, impedindo desligar o motor. Normalmente é resolvido com reprogramação de software na concessionária.',
  },
]

const PROBLEMAS_G2: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Direção elétrica endurecendo com redução involuntária de potência',
    body: 'Mesmo defeito relatado na geração anterior continua aparecendo nesta: assistência da direção elétrica enrijecendo e, em casos mais graves, redução involuntária de potência do motor durante a condução. Procure diagnóstico imediato se notar esse comportamento — está ligado à gestão eletrônica do carro.',
  },
  {
    severity: 'WARN',
    title: 'Falhas de bateria mesmo em unidades com pouco uso',
    body: 'Falha de bateria é um dos problemas mais recorrentes citados por proprietários desta geração, aparecendo mesmo em carros com pouco tempo de uso. Antes de trocar a bateria repetidamente, vale verificar o sistema de carga (alternador) — bateria nova instalada sobre um sistema de carga com defeito volta a falhar em pouco tempo.',
  },
  {
    severity: 'WARN',
    title: 'Pastilhas de freio traseiras: queixas frequentes de desgaste ou ruído',
    body: 'Há queixas frequentes relacionadas ao sistema de freio, especialmente às pastilhas traseiras — desgaste mais rápido que o esperado ou ruído ao frear. Inclua uma inspeção visual das pastilhas traseiras nas revisões intermediárias, não apenas nas trocas programadas.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de óleo excessivo mesmo com baixa quilometragem',
    body: 'Alguns proprietários notam consumo de óleo acima do normal já em unidades com poucos km rodados, em alguns casos ligado a falhas nos retentores de válvula ou nos anéis do pistão, o que pode levar a desgaste prematuro do motor se não tratado. Monitore o nível manualmente e não ignore a necessidade de completar entre trocas.',
  },
  {
    severity: 'WARN',
    title: 'Cheiro no ar-condicionado e falhas no sistema OnStar/conectividade',
    body: 'Queixas incluem mau cheiro vindo dos dutos de ar-condicionado ao ligar o climatizador e falhas operacionais no dispositivo de conectividade OnStar. Nenhum dos dois é grave mecanicamente, mas vale reportar na revisão para não conviver com o desconforto sem necessidade.',
  },
]

const MANUTENCAO_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Tracker 1.0/1.2 Turbo Flex geração 2 (Chevrolet + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (Dexos, viscosidade do manual) + filtro de óleo. | 10.000 km — Inspeção de freios (atenção às pastilhas traseiras), suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Velas de ignição. | 40.000 km — Fluido de freio DOT 3/4. | 60.000 km — Correia dentada, conforme cronograma de revisão crítica da Chevrolet — confirme no manual se o motor da sua versão usa correia ou corrente. | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Óleo do câmbio automático (versões AT). | Sistema de carga (bateria/alternador) — verificação anual, já que falha de bateria é queixa recorrente. | Rodízio de pneus a cada 10.000 km.',
  },
]

// ─── Tire Pressures ────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Tracker',
    yearFrom: 2013,
    yearTo: 2020,
    tireSize: '205/65 R16 (LT/LTZ) · 215/60 R17 (versões mais equipadas/Freeride)',
    frontPsi: 32,
    rearPsi: 32,
    frontPsiLoad: 33,
    rearPsiLoad: 35,
    sparePsi: 60,
    notes: 'Valores de referência para uso normal com pneus frios. Confirme sempre o valor exato na etiqueta da coluna da porta do motorista.',
  },
  {
    modelName: 'Tracker',
    yearFrom: 2020,
    yearTo: null,
    tireSize: '215/60 R17 (configuração mais comum) · 215/55 R18 (RS/Premier)',
    frontPsi: 35,
    rearPsi: 35,
    frontPsiLoad: 35,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'Verifique a cada 15 dias com pneus frios. Estepe compacto ("biscoito"): 60 PSI. Confirme sempre o valor exato na etiqueta da coluna da porta do motorista.',
  },
]

// ─── Maintenance Items ──────────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // Geração 1 (2013-2020)
  { modelName: 'Tracker', yearFrom: 2013, yearTo: 2020, component: 'Óleo do motor 1.8', intervalKm: 10000, intervalMonths: 12, notes: 'Siga a viscosidade indicada no manual.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Tracker', yearFrom: 2013, yearTo: 2020, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Tracker', yearFrom: 2013, yearTo: 2020, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em cidades com muita poeira/poluição.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Tracker', yearFrom: 2013, yearTo: 2020, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Limpe o evaporador se notar cheiro no ar-condicionado.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Tracker', yearFrom: 2013, yearTo: 2020, component: 'Velas de ignição', intervalKm: 30000, intervalMonths: null, notes: 'Motor aspirado — vela convencional.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Tracker', yearFrom: 2013, yearTo: 2020, component: 'Discos e pastilhas de freio dianteiros', intervalKm: 30000, intervalMonths: null, notes: 'Ruído nos discos dianteiros é queixa relatada — inspecione mesmo fora do intervalo programado.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Tracker', yearFrom: 2013, yearTo: 2020, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'Tracker', yearFrom: 2013, yearTo: 2020, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Chevrolet.', priority: 'HIGH', order: 7 },
  { modelName: 'Tracker', yearFrom: 2013, yearTo: 2020, component: 'Óleo do câmbio automático', intervalKm: 60000, intervalMonths: 48, notes: 'Não é vitalício — atenção redobrada em unidades 2013-2017.', priority: 'HIGH', order: 8 },
  { modelName: 'Tracker', yearFrom: 2013, yearTo: 2020, component: 'Óleo do diferencial traseiro e caixa de transferência (versões 4x4)', intervalKm: 60000, intervalMonths: null, notes: 'Antecipe se rodar frequentemente em trilha/terra.', priority: 'MEDIUM', order: 9 },
  { modelName: 'Tracker', yearFrom: 2013, yearTo: 2020, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 10 },

  // Geração 2 (2020+)
  { modelName: 'Tracker', yearFrom: 2020, yearTo: null, component: 'Óleo do motor 1.0/1.2 Turbo (Dexos)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor turbo — não atrase e não use óleo fora da especificação.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Tracker', yearFrom: 2020, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Tracker', yearFrom: 2020, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em cidades com muita poeira/poluição.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Tracker', yearFrom: 2020, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Tracker', yearFrom: 2020, yearTo: null, component: 'Velas de ignição', intervalKm: 40000, intervalMonths: null, notes: 'Motor turbo pede atenção redobrada ao intervalo.', priority: 'HIGH', order: 4 },
  { modelName: 'Tracker', yearFrom: 2020, yearTo: null, component: 'Pastilhas de freio traseiras — inspeção', intervalKm: 20000, intervalMonths: null, notes: 'Queixa frequente de desgaste/ruído — inspecione fora do intervalo programado se notar sintomas.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Tracker', yearFrom: 2020, yearTo: null, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'Tracker', yearFrom: 2020, yearTo: null, component: 'Correia/corrente dentada', intervalKm: 60000, intervalMonths: null, notes: 'Confirme no manual se sua versão usa correia ou corrente antes de agendar.', priority: 'HIGH', order: 7 },
  { modelName: 'Tracker', yearFrom: 2020, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Chevrolet.', priority: 'HIGH', order: 8 },
  { modelName: 'Tracker', yearFrom: 2020, yearTo: null, component: 'Óleo do câmbio automático (versões AT)', intervalKm: 60000, intervalMonths: 48, notes: 'Não é vitalício em uso severo.', priority: 'HIGH', order: 9 },
  { modelName: 'Tracker', yearFrom: 2020, yearTo: null, component: 'Sistema de carga (bateria/alternador) — verificação', intervalKm: null, intervalMonths: 12, notes: 'Falha de bateria é queixa recorrente mesmo em uso pouco intenso.', priority: 'MEDIUM', order: 10 },
  { modelName: 'Tracker', yearFrom: 2020, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 11 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Tracker', yearFrom: 2013, yearTo: 2020, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'Tracker', yearFrom: 2020, yearTo: null, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
]

async function main() {
  console.log('🚗 Seed Chevrolet Tracker...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Chevrolet', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Chevrolet', vehicleTypeId: carroType.id },
  })

  const distinctModelNames = [...new Set(BLOCKS.map((b) => b.modelName))]
  for (const modelName of distinctModelNames) {
    await prisma.tip.deleteMany({ where: { modelName } })
  }

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {},
      create: { name: block.modelName, brandId: brand.id },
    })

    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))

    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }, idx) => ({
        modelName: block.modelName,
        category: cat,
        severity: tip.severity,
        title: tip.title,
        body: tip.body,
        yearFrom: block.yearFrom,
        yearTo: block.yearTo,
        order: idx,
      })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom ?? '?'}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }

  const distinctTpModelNames = [...new Set(TIRE_PRESSURES.map((t) => t.modelName))]
  for (const modelName of distinctTpModelNames) {
    await prisma.tirePressure.deleteMany({ where: { modelName } })
  }
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom ?? '?'}-${tp.yearTo ?? 'atual'})`)
  }

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: BLOCKS.map((b) => b.modelName) } },
  })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Chevrolet Tracker concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
