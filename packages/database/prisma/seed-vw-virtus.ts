/**
 * Seed Volkswagen Virtus — macetes, problemas, manutenção e calibragem
 * Sedã derivado do Polo (plataforma MQB), lançado no Brasil em janeiro de
 * 2018, fabricado na unidade Anchieta em São Bernardo do Campo (SP). Motores
 * 1.6 MSI Flex (manual 5 marchas), 1.0 TSI 200 TSI/128cv (3 cilindros turbo,
 * automático Aisin) e 1.4 TSI 250 TSI/150cv (GTS, depois Exclusive).
 * Facelift em 2023: dianteira redesenhada, LED de série, GTS substituído
 * pelo Exclusive, carroceria alongada para 4,56m. Recall 2026 por falha na
 * alavanca do freio de mão em unidades 2025-2026.
 * Execute: pnpm --filter @motormacete/database db:seed:vw-virtus
 *
 * Fontes: autopapo.com.br, vrum.com.br, mobiauto.com.br, autoo.com.br,
 *         cnnbrasil.com.br, motorista.com.br, reclameaqui.com.br,
 *         calibragemdepneu.com.br, en.wikipedia.org/wiki/Volkswagen_Virtus
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

// ---------------------------------------------------------------------------
// Bloco 1: Virtus 2018-2022 (geração original, pré-facelift)
// ---------------------------------------------------------------------------

const MACETES_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Sedã derivado do Polo, plataforma MQB, fabricado em São Bernardo do Campo',
    body: 'O Virtus foi lançado em janeiro de 2018 sobre a mesma plataforma MQB do novo Polo, com produção na fábrica Anchieta (São Bernardo do Campo/SP). Peças de suspensão, motor e elétrica são compartilhadas com o Polo e, mais tarde, com o T-Cross — em oficinas independentes isso ajuda a encontrar componentes e conhecimento técnico mais rápido.',
  },
  {
    severity: 'OK',
    title: 'Motor 1.0 TSI de 3 cilindros: rende mais com etanol',
    body: 'A versão 200 TSI usa motor 1.0 turbo de 3 cilindros com 128 cv com etanol e 115 cv com gasolina (torque de 20,4 kgfm em ambos). Abastecer com etanol entrega mais potência nesse motor — vale considerar o custo-benefício por litro na hora de escolher o combustível no dia a dia.',
  },
  {
    severity: 'OK',
    title: 'Câmbio automático Aisin convencional, não é DSG',
    body: 'As versões automáticas (200 TSI e 250 TSI/GTS) usam câmbio automático convencional de 6 marchas da Aisin, não o DSG de dupla embreagem usado em outros modelos VW. Isso tende a ser mais tolerante a trânsito parado e não exige os cuidados especiais (como evitar segurar o carro na embreagem em rampas) que o DSG seco pede.',
  },
  {
    severity: 'OK',
    title: 'GTS 250 TSI é a versão esportiva de maior desempenho da geração',
    body: 'O Virtus GTS usa o motor 1.4 TSI de 150 cv (250 TSI), o mais potente da linha nessa geração, com suspensão e detalhes visuais específicos. Ao comprar um GTS usado, confirme a autenticidade da versão pelo código FIPE/chassi, já que kits visuais de outras versões podem gerar confusão na hora da revenda.',
  },
  {
    severity: 'OK',
    title: 'Motor 1.6 MSI é a opção de entrada mais simples',
    body: 'A versão MSI usa motor 1.6 aspirado de até 117 cv com câmbio manual de 5 marchas — mecânica mais simples e historicamente mais barata de manter que as versões turbo. Boa opção para quem prioriza menor custo de manutenção a longo prazo.',
  },
]

const PROBLEMAS_G1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Eixo traseiro trincado: relatos recorrentes sem recall oficial para o Virtus',
    body: 'Há um volume relevante de relatos de donos de Virtus 2019/2020 (Reclame Aqui e fóruns) sobre trinca no eixo traseiro — o mesmo defeito que levou a Volkswagen a fazer recall oficial no T-Cross, mas que não resultou em recall equivalente para o Virtus até o momento. Se notar ruído, folga ou desalinhamento no eixo traseiro, ou aparecimento de trinca visível na inspeção, procure a concessionária e registre a ocorrência formalmente.',
  },
  {
    severity: 'WARN',
    title: 'Relatos pontuais de troca do motor 1.0 TSI com baixa quilometragem',
    body: 'Existem relatos isolados de proprietários que precisaram trocar o motor 1.0 TSI com menos de 40.000 km rodados. Não é um padrão generalizado — o bloco EA211 é considerado confiável na maioria dos casos —, mas vale ficar atento a consumo de óleo fora do normal, ruídos incomuns ou perda de potência e agir cedo, dentro da garantia sempre que possível.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático com trancos relatados em algumas trocas de marcha',
    body: 'Alguns proprietários relatam trancos ou "socos" perceptíveis em certas trocas de marcha do câmbio automático, especialmente em baixa velocidade. Se o comportamento for recorrente, vale registrar na concessionária — pode estar relacionado à necessidade de atualização de software da central do câmbio.',
  },
  {
    severity: 'WARN',
    title: 'Central multimídia com travamentos e reinicializações',
    body: 'Há relatos de central multimídia travando ou reiniciando sozinha. Antes de desconfiar de defeito de hardware, verifique se há atualização de firmware disponível na concessionária — muitos casos são resolvidos por software.',
  },
  {
    severity: 'WARN',
    title: 'Acabamento interno considerado abaixo do esperado por parte dos donos',
    body: 'Parte dos proprietários relata qualidade de acabamento interno (plásticos do painel e detalhes das portas) abaixo do esperado para a categoria. Não é um problema mecânico, mas vale inspecionar ruídos de plástico ("cricri") no test-drive de usados.',
  },
]

const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Virtus 2018-2022 (Volkswagen + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (1.0 TSI, 1.4 TSI ou 1.6 MSI, conforme especificação do manual) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e do eixo traseiro (atenção a ruído ou trinca visível). | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Correia dentada e tensor, apenas na versão 1.6 MSI (motores TSI usam corrente). | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Óleo do câmbio automático Aisin, nas versões 200 TSI e 250 TSI/GTS. | A cada revisão — Verificar atualização de software da central multimídia e do módulo do câmbio automático.',
  },
]

// ---------------------------------------------------------------------------
// Bloco 2: Virtus 2023+ (geração facelift)
// ---------------------------------------------------------------------------

const MACETES_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Facelift 2023: nova dianteira, LED de série e GTS substituído por Exclusive',
    body: 'A partir da linha 2023, o Virtus recebeu dianteira redesenhada (grade mais estreita, capô e para-choque novos), faróis e lanternas de LED de série em toda a linha, e ficou 79 mm mais comprido (4,56 m). A versão esportiva GTS foi descontinuada e substituída pela Exclusive, que mantém a mesma mecânica 250 TSI com visual mais sóbrio (rodas de 18" escurecidas, acabamento cinza nos para-choques).',
  },
  {
    severity: 'OK',
    title: 'Versão de entrada "TSI" automática usa motor e câmbio mais simples que o 200 TSI',
    body: 'A partir da linha 2023, a versão automática de entrada (TSI 1.0 Aut.) usa uma calibração mais econômica do 1.0 turbo (cerca de 109 cv na gasolina e 116 cv no etanol, com 16,8 kgfm) e câmbio automático AQ160 — o mesmo usado no extinto Gol automático —, diferente do câmbio AQ250 mais robusto das versões Comfortline/Highline 200 TSI. Confirme a versão exata (Sense, TSI, Comfortline, Highline ou Exclusive) pelo código FIPE ou na nota fiscal antes de comprar um usado, já que a potência e o câmbio variam bastante entre elas.',
  },
  {
    severity: 'OK',
    title: 'Câmbio automático Aisin segue convencional, não é DSG',
    body: 'Assim como na geração anterior, as versões automáticas do Virtus facelift usam câmbio automático convencional Aisin (6 marchas), não o DSG de dupla embreagem. Vale lembrar disso ao comparar cuidados de manutenção com outros modelos VW que usam DSG.',
  },
  {
    severity: 'OK',
    title: 'Troca de câmbio automático anunciada para versões 250 TSI a partir de 2026',
    body: 'A Volkswagen anunciou a adoção de uma nova transmissão automática (AQ300, com maior capacidade de torque) para as versões de maior potência — como o Virtus Exclusive 250 TSI — a partir da linha 2026. Não se trata de correção de defeito, é uma atualização de engenharia; ao comprar um 250 TSI, vale confirmar no manual/nota fiscal qual câmbio equipa exatamente a sua unidade.',
  },
  {
    severity: 'OK',
    title: 'Plataforma compartilhada com Polo, Nivus, T-Cross e Taos',
    body: 'O Virtus facelift segue compartilhando plataforma MQB e motores com Polo, Nivus, T-Cross e Taos. Peças de suspensão, motor 1.0/1.4 TSI e itens elétricos costumam ser intercambiáveis entre esses modelos, o que facilita encontrar peças em oficinas independentes.',
  },
]

const PROBLEMAS_G2: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall 2026: falha na alavanca do freio de mão (unidades 2025-2026)',
    body: 'A Volkswagen convocou em julho de 2026 um recall de 150.290 veículos no Brasil (Polo, Polo Track, Tera, Nivus, T-Cross e Virtus) por possível falha na alavanca do freio de estacionamento, que pode não travar as rodas corretamente e permitir movimento involuntário do veículo estacionado, especialmente em rampas. Para o Virtus, o recall cobre chassis nas faixas TP003385 a TP008761 e T4003262 a T4018379, fabricados entre maio e outubro de 2025 (linha 2025-2026). Verifique o chassi no site da Volkswagen do Brasil ou pelo 0800 019 8866 — o reparo é gratuito, leva cerca de 2 horas e a licença anual do veículo pode ficar bloqueada até a regularização.',
  },
  {
    severity: 'WARN',
    title: 'Relatos de eixo traseiro trincado também em unidades mais recentes',
    body: 'Apesar de mais concentrados na geração 2019/2020, ainda há relatos do mesmo defeito de trinca no eixo traseiro em unidades mais novas do Virtus. Fique atento a ruído, folga traseira ou desalinhamento e peça inspeção do eixo em revisões, especialmente após trafegar por buracos ou lombadas em velocidade.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático com trancos relatados em algumas trocas de marcha',
    body: 'O relato de trancos em certas trocas de marcha do câmbio automático (mais comum em baixa velocidade ou partida a frio) segue aparecendo também na geração facelift. Se for recorrente, procure a concessionária para verificar se há atualização de software disponível para a central do câmbio.',
  },
  {
    severity: 'WARN',
    title: 'Central multimídia com travamentos e reinicializações',
    body: 'Assim como na geração anterior, há relatos de travamento ou reinicialização espontânea da central multimídia. Verifique disponibilidade de atualização de firmware na concessionária antes de investigar hardware.',
  },
  {
    severity: 'WARN',
    title: 'Relatos pontuais de consumo/perda de desempenho do motor 1.0 TSI',
    body: 'Como na geração anterior, existem relatos isolados de consumo de óleo acima do esperado ou perda de potência do motor 1.0 TSI. Não é a maioria dos casos, mas monitore o nível de óleo entre trocas e não ignore ruídos incomuns ou luz de injeção acesa no painel.',
  },
]

const MANUTENCAO_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Virtus 2023+ (Volkswagen + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (1.0 TSI ou 1.4 TSI, conforme especificação do manual) + filtro de óleo. | 10.000 km — Inspeção de freios (atenção ao sistema de freio de mão, alvo do recall 2026 em unidades 2025-2026), suspensão e do eixo traseiro. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | 60.000-80.000 km — Óleo do câmbio automático (AQ160, AQ250 ou AQ300, conforme a versão e o ano). | A cada revisão — Confirmar se o chassi está incluso no recall do freio de mão e verificar atualização de software da central multimídia e do câmbio.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Virtus',
    yearFrom: 2018,
    yearTo: 2022,
    tireSize: '175/70 R14 (MSI) · 195/55 R16 (Comfortline) · 205/55 R16 (Highline/GTS)',
    frontPsi: 33,
    rearPsi: 30,
    frontPsiLoad: 36,
    rearPsiLoad: 36,
    sparePsi: 60,
    notes: 'Valores de referência para pneu 205/55 R16 com o veículo sem carga; versões com aro menor podem ter pressão levemente diferente. Confirme sempre o valor exato na etiqueta da coluna da porta do motorista.',
  },
  {
    modelName: 'Virtus',
    yearFrom: 2023,
    yearTo: null,
    tireSize: '195/55 R16 (Sense/TSI) · 205/55 R16 (Comfortline/Highline/Exclusive)',
    frontPsi: 33,
    rearPsi: 30,
    frontPsiLoad: 36,
    rearPsiLoad: 36,
    sparePsi: 60,
    notes: 'Valores de referência para pneu 205/55 R16 (Exclusive) com o veículo sem carga. Confirme sempre o valor exato na etiqueta da coluna da porta do motorista, pois pode variar por versão/aro.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Virtus', yearFrom: 2018, yearTo: 2022, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Siga a especificação exata do manual conforme o motor (1.0 TSI, 1.4 TSI ou 1.6 MSI).', priority: 'CRITICAL', order: 0 },
  { modelName: 'Virtus', yearFrom: 2018, yearTo: 2022, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Virtus', yearFrom: 2018, yearTo: 2022, component: 'Inspeção do eixo traseiro', intervalKm: 10000, intervalMonths: null, notes: 'Fique atento a trincas, ruído ou folga — defeito relatado com frequência nesta geração.', priority: 'HIGH', order: 2 },
  { modelName: 'Virtus', yearFrom: 2018, yearTo: 2022, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza o intervalo em regiões com muita poeira.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Virtus', yearFrom: 2018, yearTo: 2022, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Virtus', yearFrom: 2018, yearTo: 2022, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'Virtus', yearFrom: 2018, yearTo: 2022, component: 'Correia dentada e tensor (apenas 1.6 MSI)', intervalKm: 60000, intervalMonths: 60, notes: 'Motores 1.0 TSI e 1.4 TSI usam corrente, sem intervalo fixo de troca. Item exclusivo da versão 1.6 MSI.', priority: 'CRITICAL', order: 6 },
  { modelName: 'Virtus', yearFrom: 2018, yearTo: 2022, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Volkswagen.', priority: 'HIGH', order: 7 },
  { modelName: 'Virtus', yearFrom: 2018, yearTo: 2022, component: 'Óleo do câmbio automático', intervalKm: 60000, intervalMonths: 48, notes: 'Apenas versões 200 TSI e 250 TSI/GTS. Antecipe se notar tranco nas trocas.', priority: 'HIGH', order: 8 },
  { modelName: 'Virtus', yearFrom: 2018, yearTo: 2022, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 9 },

  { modelName: 'Virtus', yearFrom: 2023, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Siga a especificação exata do manual conforme o motor (1.0 TSI ou 1.4 TSI).', priority: 'CRITICAL', order: 0 },
  { modelName: 'Virtus', yearFrom: 2023, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Virtus', yearFrom: 2023, yearTo: null, component: 'Sistema de freio de estacionamento (recall 2026)', intervalKm: null, intervalMonths: null, notes: 'Unidades 2025-2026 podem estar no recall da alavanca do freio de mão — confirme o chassi na Volkswagen.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Virtus', yearFrom: 2023, yearTo: null, component: 'Inspeção do eixo traseiro', intervalKm: 10000, intervalMonths: null, notes: 'Fique atento a trincas, ruído ou folga.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Virtus', yearFrom: 2023, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza o intervalo em regiões com muita poeira.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Virtus', yearFrom: 2023, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Virtus', yearFrom: 2023, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'Virtus', yearFrom: 2023, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Volkswagen.', priority: 'HIGH', order: 7 },
  { modelName: 'Virtus', yearFrom: 2023, yearTo: null, component: 'Óleo do câmbio automático', intervalKm: 60000, intervalMonths: 48, notes: 'Varia conforme a versão (AQ160, AQ250 ou, a partir de 2026, AQ300). Antecipe se notar tranco nas trocas.', priority: 'HIGH', order: 8 },
  { modelName: 'Virtus', yearFrom: 2023, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Virtus',
    yearFrom: 2018,
    yearTo: 2022,
    MACETES: MACETES_G1,
    PROBLEMAS: PROBLEMAS_G1,
    MANUTENCAO: MANUTENCAO_G1,
  },
  {
    modelName: 'Virtus',
    yearFrom: 2023,
    yearTo: null,
    MACETES: MACETES_G2,
    PROBLEMAS: PROBLEMAS_G2,
    MANUTENCAO: MANUTENCAO_G2,
  },
]

async function main() {
  console.log('🚗 Seed Volkswagen Virtus...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volkswagen', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volkswagen', vehicleTypeId: carroType.id },
  })

  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Virtus', brandId: brand.id } },
    update: {},
    create: { name: 'Virtus', brandId: brand.id },
  })

  await prisma.tip.deleteMany({ where: { modelName: 'Virtus' } })

  for (const block of BLOCKS) {
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
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }

  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.deleteMany({
      where: { modelName: tp.modelName, yearFrom: tp.yearFrom, yearTo: tp.yearTo },
    })
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo ?? 'atual'})`)
  }

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: BLOCKS.map((b) => b.modelName) } },
  })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Volkswagen Virtus concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
