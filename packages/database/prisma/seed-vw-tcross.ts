/**
 * Seed Volkswagen T-Cross — macetes, problemas, manutenção e calibragem
 * SUV compacto lançado no Brasil em abril de 2019, fabricado em São José
 * dos Pinhais (PR), sobre a plataforma MQB compartilhada com Polo/Virtus/
 * Nivus/Taos. Motores 1.0 TSI 128cv (200 TSI) e 1.4 TSI 150cv (250 TSI) —
 * câmbio manual ou automático de 6 marchas (Aisin AQ250/AQ200, convencional,
 * não DSG) nas versões 2019-2024; a linha 2025 (facelift) passou a oferecer
 * câmbio automático de 8 marchas (Aisin AQ300) na versão 250 TSI Highline.
 * SUV mais vendido do Brasil em diversos anos desde o lançamento.
 * Execute: pnpm --filter @motormacete/database db:seed:vw-tcross
 *
 * Fontes: autoentusiastas.com.br, revistacarro.com.br, autopapo.com.br,
 *         cnnbrasil.com.br, estradas.com.br, rapidonoar.com.br,
 *         mundodoautomovelparapcd.com.br, reclameaqui.com.br,
 *         gruposentinela.com.br, vrum.com.br, calibragemdepneu.com.br
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

const MACETES_2019: TipInput[] = [
  {
    severity: 'OK',
    title: 'Câmbio automático convencional (Aisin), não DSG',
    body: 'O T-Cross 2019-2024 usa câmbio automático de 6 marchas convencional (Aisin AQ250/AQ200), não o DSG de dupla embreagem usado em outros modelos VW no exterior. É mais tolerante a trânsito parado e engarrafamento, sem os cuidados especiais que o DSG seco exige (evitar segurar o carro na embreagem em rampa, por exemplo).',
  },
  {
    severity: 'OK',
    title: 'Recall de mola da suspensão dianteira: confira o chassi',
    body: 'Unidades produzidas entre 23/01/2019 e 10/02/2020 tiveram recall por possível folga no parafuso superior de fixação da suspensão dianteira, podendo gerar ruído e, em uso continuado, comprometer a estabilidade em manobras bruscas. Consulte o chassi no site da Volkswagen ou pelo 0800 019 8866 — o reparo é gratuito.',
  },
  {
    severity: 'OK',
    title: 'Recall do retrovisor esquerdo: unidades 2021/2022',
    body: 'Veículos fabricados entre 23/08/2021 e 02/12/2021 foram convocados por risco de soltar a parte superior do retrovisor externo esquerdo por vibração. Verifique o chassi no site oficial da Volkswagen; a substituição do mecanismo é gratuita.',
  },
  {
    severity: 'OK',
    title: 'Compartilha plataforma e mecânica com Polo, Virtus, Nivus e Taos',
    body: 'O T-Cross usa a mesma plataforma MQB e motores 1.0 TSI/1.4 TSI de outros modelos VW do grupo (Polo, Virtus, Nivus, Taos). Em oficinas independentes, peças e conhecimento técnico desses modelos irmãos costumam ajudar a resolver problemas mais rápido e com peças mais fáceis de encontrar.',
  },
  {
    severity: 'OK',
    title: 'Central multimídia trava em dias muito quentes',
    body: 'Há muitos relatos de travamento da central multimídia VW Play (tela verde, lentidão, reinício sozinho) especialmente com o carro exposto ao sol por longos períodos. Se travar, desligue o veículo, aguarde alguns minutos e ligue novamente; se for recorrente, atualize o software na concessionária.',
  },
  {
    severity: 'OK',
    title: 'Motor 1.0 TSI tem consumo melhor, 1.4 TSI mais potência',
    body: 'O motor 1.0 TSI (128cv, versões 200 TSI) tende a ser mais econômico no dia a dia urbano, enquanto o 1.4 TSI (150cv, versões 250 TSI) entrega mais potência e é o único disponível com câmbio de 8 marchas na linha 2025. Escolha conforme prioridade entre economia e desempenho.',
  },
]

const PROBLEMAS_2019: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vidro elétrico desce sozinho ao travar o carro',
    body: 'Há relatos recorrentes de vidros que não fecham corretamente ao trancar o veículo pela tecla ou pela chave — em alguns casos o vidro desce ao invés de subir. Teste o fechamento automático dos vidros periodicamente e leve à concessionária se o comportamento persistir.',
  },
  {
    severity: 'WARN',
    title: 'Travamento e lentidão na central multimídia',
    body: 'Proprietários relatam telas travando, reiniciando sozinhas ("auto reboot") ou zerando o trip computer, especialmente em dias quentes. Não é falha de segurança, mas atrapalha o uso do ar-condicionado e da câmera de ré em versões que dependem da tela. Vale registrar reclamação formal se for recorrente.',
  },
  {
    severity: 'WARN',
    title: 'Falha na conexão Android Auto/Apple CarPlay',
    body: 'Alguns donos relatam dificuldade de conexão ou desconexões frequentes do smartphone via cabo ou wireless. Mantenha o software da central atualizado na concessionária e teste com cabos originais/certificados antes de considerar defeito de hardware.',
  },
  {
    severity: 'WARN',
    title: 'Buzina sem funcionar em alguns relatos',
    body: 'Há reclamações pontuais de buzina que para de funcionar. Caso ocorra, é item de segurança — não adie a inspeção elétrica na concessionária ou oficina de confiança.',
  },
  {
    severity: 'WARN',
    title: 'Ruído na suspensão dianteira antes do reparo do recall',
    body: 'Em unidades dentro da faixa do recall de suspensão (produzidas entre 23/01/2019 e 10/02/2020), ruído na dianteira pode ser sinal do parafuso de fixação frouxo. Se notar barulho e o veículo ainda não passou pelo recall, agende o reparo imediatamente — é item de segurança estrutural.',
  },
  {
    severity: 'WARN',
    title: 'Sensor de nível de combustível/injeção eletrônica com relatos de falha',
    body: 'Existem relatos de problemas em sensor de nível de combustível e injeção eletrônica gerando luzes de alerta no painel. Se o alerta acender, evite rodar por muito tempo sem diagnóstico — pode indicar de falha simples de sensor a problema mais sério de alimentação de combustível.',
  },
]

const MANUTENCAO_2019: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma T-Cross (Volkswagen + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (1.0 TSI ou 1.4 TSI, especificação exata do manual) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido (atenção redobrada se o veículo ainda não passou pelos recalls de suspensão/retrovisor). | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | 60.000 km — Óleo do câmbio automático Aisin (6 ou 8 marchas conforme versão/ano). | A cada revisão — Verificar chassi contra campanhas de recall abertas e testar vidros elétricos e central multimídia, itens com relatos recorrentes de falha.',
  },
]

const MACETES_FACELIFT: TipInput[] = [
  {
    severity: 'OK',
    title: 'Facelift 2025 trouxe faróis IQ.Light e visual renovado',
    body: 'A partir da linha 2025 (revelada em maio/2024, chegada às lojas em junho/2024), o T-Cross ganhou faróis de LED matriciais (IQ.Light), grade frontal iluminada inspirada no Taos e para-choques redesenhados. A mecânica seguiu a mesma plataforma, sem mudanças estruturais relevantes.',
  },
  {
    severity: 'OK',
    title: 'Câmbio de 8 marchas (AQ300) só na versão 250 TSI Highline',
    body: 'Na linha facelift, o câmbio automático de 8 marchas (Aisin AQ300) passou a equipar a versão 1.4 TSI 250 Highline. As versões 1.0 TSI 200 (170/200 TSI) seguem com câmbio automático de 6 marchas. Confirme a especificação exata na ficha técnica da versão antes de programar a troca de óleo do câmbio.',
  },
  {
    severity: 'OK',
    title: 'Recall do freio de estacionamento: confira o chassi (2025/2026)',
    body: 'Unidades produzidas entre maio e outubro de 2025 (chassi entre T4016198 e T4060559) foram convocadas por possível falha na alavanca do freio de estacionamento, que pode comprometer o travamento do veículo estacionado. Consulte o chassi no site da Volkswagen ou pelo 0800 019 8866 — reparo gratuito. Enquanto não fizer a inspeção, deixe o carro engrenado e use calços em rampas.',
  },
]

const PROBLEMAS_FACELIFT: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Relatos de multimídia, farol e vidros elétricos na linha 2025',
    body: 'Mesmo na linha renovada, há reclamações registradas sobre a central multimídia, o funcionamento dos novos faróis de LED e vidros elétricos com atendimento considerado insatisfatório em alguns casos. Documente qualquer falha por escrito na concessionária desde a primeira ocorrência para garantir cobertura de garantia.',
  },
  {
    severity: 'DANGER',
    title: 'Freio de estacionamento — verifique o recall antes de estacionar em rampa',
    body: 'Se o chassi do seu T-Cross 2026 estiver na faixa do recall (T4016198 a T4060559, produção maio-outubro/2025) e o reparo ainda não foi feito, evite depender apenas do freio de mão em rampas — use sempre a primeira marcha ou "P" e calços quando possível, até a inspeção na concessionária.',
  },
]

const MANUTENCAO_FACELIFT: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma T-Cross facelift (linha 2025 em diante)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo. | 10.000 km — Inspeção de freios (verificar também o recall da alavanca do freio de estacionamento pelo chassi) e suspensão. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000-80.000 km — Óleo do câmbio automático (AQ200/AQ250 de 6 marchas ou AQ300 de 8 marchas, conforme a versão). | A cada revisão — Atualizar software da central multimídia e verificar funcionamento dos faróis de LED matricial.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'T-Cross',
    yearFrom: 2019,
    yearTo: null,
    tireSize: '205/60 R16 (Sense/Comfortline) · 215/55 R17 (Highline/Extreme)',
    frontPsi: 32,
    rearPsi: 32,
    frontPsiLoad: 35,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'Valores de referência para pneus frios (veículo parado há pelo menos 3h). Confirme sempre o valor exato na etiqueta da coluna da porta do motorista, pois pode variar por versão e aro.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'T-Cross', yearFrom: 2019, yearTo: null, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 1.0 TSI ou 1.4 TSI — siga exatamente a especificação do manual.', priority: 'CRITICAL', order: 0 },
  { modelName: 'T-Cross', yearFrom: 2019, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'T-Cross', yearFrom: 2019, yearTo: null, component: 'Inspeção de freios e suspensão', intervalKm: 10000, intervalMonths: null, notes: 'Confira também se o chassi está coberto por alguma campanha de recall (suspensão dianteira, retrovisor, freio de estacionamento).', priority: 'HIGH', order: 2 },
  { modelName: 'T-Cross', yearFrom: 2019, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza o intervalo em regiões com muita poeira.', priority: 'MEDIUM', order: 3 },
  { modelName: 'T-Cross', yearFrom: 2019, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 4 },
  { modelName: 'T-Cross', yearFrom: 2019, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'T-Cross', yearFrom: 2019, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Volkswagen.', priority: 'HIGH', order: 6 },
  { modelName: 'T-Cross', yearFrom: 2019, yearTo: null, component: 'Óleo do câmbio automático', intervalKm: 60000, intervalMonths: 48, notes: 'Aisin AQ200/AQ250 (6 marchas) ou AQ300 (8 marchas, versões 2025+). Antecipe se notar tranco nas trocas.', priority: 'HIGH', order: 7 },
  { modelName: 'T-Cross', yearFrom: 2019, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 8 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'T-Cross',
    yearFrom: 2019,
    yearTo: 2024,
    MACETES: MACETES_2019,
    PROBLEMAS: PROBLEMAS_2019,
    MANUTENCAO: MANUTENCAO_2019,
  },
  {
    modelName: 'T-Cross',
    yearFrom: 2025,
    yearTo: null,
    MACETES: MACETES_FACELIFT,
    PROBLEMAS: PROBLEMAS_FACELIFT,
    MANUTENCAO: MANUTENCAO_FACELIFT,
  },
]

async function main() {
  console.log('🚗 Seed Volkswagen T-Cross...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volkswagen', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volkswagen', vehicleTypeId: carroType.id },
  })

  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'T-Cross', brandId: brand.id } },
    update: {},
    create: { name: 'T-Cross', brandId: brand.id },
  })

  await prisma.tip.deleteMany({ where: { modelName: 'T-Cross' } })

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
    console.log(`  ✅ ${block.modelName} (${block.yearFrom ?? '—'}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
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

  console.log('✅ Volkswagen T-Cross concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
