/**
 * Seed Chevrolet Opala + Caravan — macetes, problemas, manutenção e calibragem de pneus
 * Sedã/cupê médio produzido pela GM do Brasil de 1968 a 1992 (mais de 1 milhão de
 * unidades entre Opala sedã/cupê e a perua Caravan, lançada em 1975). Motor 4
 * cilindros 2.5 (2.512 cc / 153 pol³) e 6 cilindros em linha 3.8 (3.768 cc / 230
 * pol³, depois substituído pelo 4.1 / 4.097 cc / 250 pol³ em 1979). Versões De Luxe,
 * SS (esportiva, desde 1970), Comodoro (linha de luxo, desde 1975) e Diplomata
 * (topo de linha, desde 1980 no sedã/cupê e 1985 na Caravan). A Caravan compartilha
 * toda a mecânica (motor, câmbio, freios, suspensão dianteira) com o Opala sedã/cupê.
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-opala
 *
 * Fontes: pt.wikipedia.org (Chevrolet Opala), autolivraria.com.br, autopapo.com.br,
 *         motoragora.com.br, rio.expert, opaleirosdoparana.forumeiros.com,
 *         carrosnaweb.com.br, calibragemdepneu.com.br, jornaldebrasilia.com.br
 *         (programa Chevrolet Vintage, restauração oficial GM anunciada em 2025)
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

const MACETES_OPALA: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 6 em linha (3.8/4.1): robusto e com bloco/peças ainda fáceis de achar',
    body: 'O "seis em linha" da GM é um dos motores mais duráveis já vendidos no Brasil — ficou em produção (em versões atualizadas) em picapes e na Veraneio até os anos 1990, então blocos, cabeçotes, virabrequins e a maior parte da peça de retífica ainda circulam no mercado paralelo e em desmanches. Procure oficinas especializadas em Opala/linha 10-20 antiga: elas conhecem bem as variações entre o 3.8 (230 pol³) e o 4.1 (250 pol³) e evitam trocar peça errada entre as duas versões.',
  },
  {
    severity: 'OK',
    title: 'Peça remanufaturada custa menos e tem garantia — prefira à peça usada sem procedência',
    body: 'Para itens de desgaste (bomba de óleo, bomba d\'água, motor de arranque, alternador, carburador), vale mais a pena comprar remanufaturado de fornecedor conhecido do que peça usada de desmanche sem garantia. O mercado de retífica para o 4 e o 6 cilindros GM ainda é ativo em praticamente todo o Brasil — pesquise por "motor Opala" ou "motor GM 4 cilindros/6 cilindros" ao invés de pedir só "peça de Opala", muitos catálogos usam a nomenclatura do motor.',
  },
  {
    severity: 'WARN',
    title: 'Verifique as longarinas dianteiras — ponto de trinca conhecido em carros com motor 6 cilindros',
    body: 'O chassi/longarina dianteira do Opala foi projetado pensando também no motor 4 cilindros mais leve; unidades com motor 6 cilindros (mais pesado) têm histórico de trincas nessa região ao longo de décadas de uso. Antes de comprar ou em revisões periódicas, peça para o mecânico inspecionar visualmente as longarinas dianteiras — reparo estrutural é caro e compromete segurança se ignorado.',
  },
  {
    severity: 'OK',
    title: 'Vazamento de óleo pelo retentor traseiro do virabrequim é comum — não é motivo de pânico, mas não ignore',
    body: 'Poças de óleo sob o carro estacionado costumam vir do retentor traseiro do virabrequim (perto do volante), um ponto historicamente fraco de vedação nesses motores. Não é normalmente grave, mas acompanhe o nível de óleo com mais frequência e resolva assim que possível — vazamento contínuo pode mascarar nível baixo e causar dano maior ao motor.',
  },
  {
    severity: 'OK',
    title: 'Sistema de arrefecimento é o ponto crítico do 6 cilindros — mantenha radiador e mangueiras impecáveis',
    body: 'O motor 6 em linha é pesado e gera bastante calor; problemas de arrefecimento (radiador sujo, mangueira ressecada, bomba d\'água fraca) evoluem rápido para superaquecimento e dano sério. Troque mangueiras preventivamente mesmo sem sinal visível de rachadura (borracha de décadas resseca por dentro) e nunca rode com o motor no "quente" torcendo para "esfriar sozinho".',
  },
  {
    severity: 'OK',
    title: 'GM lançou projeto oficial de restauração de clássicos (Chevrolet Vintage) — referência de padrão, não solução de bolso',
    body: 'A Chevrolet anunciou em 2025 um programa de restauração oficial de clássicos como Opala, Monza, Kadett e Chevette, com peças e acabamento padrão de fábrica. Vale como referência de "como deveria ficar" e prova do valor histórico do carro, mas os exemplares restaurados por esse programa são vendidos em leilão por valores muito altos — no dia a dia, o caminho seguido pela maioria dos donos continua sendo oficina especializada + mercado paralelo/remanufaturado.',
  },
]

const PROBLEMAS_OPALA: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Trinca nas longarinas dianteiras em unidades com motor 6 cilindros',
    body: 'É um problema estrutural conhecido: o peso extra do motor 6 cilindros combinado com décadas de uso pode causar trincas nas longarinas dianteiras. Isso afeta diretamente a segurança (rigidez estrutural, fixação de suspensão e motor). Se notar ruídos estranhos vindos da região do vão do motor ou folga anormal na direção/suspensão dianteira, procure uma oficina especializada para inspeção estrutural antes de continuar rodando.',
  },
  {
    severity: 'WARN',
    title: 'Carburador alimenta mal os cilindros 2 e 5 (motor 6 cilindros) — é característica de projeto, não defeito isolado',
    body: 'O desenho do coletor de admissão do 6 cilindros não distribui a mistura de forma perfeitamente igual entre os cilindros — historicamente o 2º e o 5º cilindro recebem menos combustível que os demais. Isso pode gerar leve perda de suavidade em marcha lenta. Não é um defeito para "caçar" indefinidamente trocando peças — é limitação conhecida do projeto original; um bom ajuste de carburador/ponto minimiza o efeito, mas não elimina totalmente.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pelo retentor traseiro do virabrequim',
    body: 'Vazamento nesse ponto é queixa recorrente de longa data — a vedação original tinha qualidade inferior à desejável. Resolve-se na troca do retentor (serviço que exige remover a caixa de câmbio na maioria dos casos), mas antes disso, monitore o nível de óleo com mais frequência do que faria em um carro moderno.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste prematuro de buchas e pivô da suspensão dianteira',
    body: 'A suspensão do Opala é historicamente exigente em manutenção — buchas e pivô desgastam antes do esperado, principalmente em carros que rodam muito em asfalto ruim/buraco. Folga na direção, ruído de "batida seca" em lombada e desgaste irregular de pneu dianteiro são sinais de alerta. Peças de suspensão para Opala são relativamente fáceis de achar — não vale a pena conviver com folga por economia.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de combustível alto é característica do motor, não sinal de pane',
    body: 'Motores da família 4 e 6 cilindros do Opala têm projeto de origem antiga (base de projeto anterior aos anos 1960) e não foram feitos pensando em economia — consumo alto na cidade é esperado, especialmente no 6 cilindros. Antes de desconfiar de defeito por "consumo alto", compare com a média histórica conhecida do modelo/motor específico.',
  },
]

const MANUTENCAO_OPALA: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma básico Opala (carburado, 4 ou 6 cilindros)',
    body: '3.000-5.000 km — Troca de óleo do motor + filtro (motor carburado antigo pede intervalo mais curto que carro moderno). | A cada troca de óleo — Inspeção visual de vazamento (especialmente retentor traseiro do virabrequim) e nível de arrefecimento. | 10.000 km — Regulagem/limpeza do carburador e verificação do ponto de ignição. | 10.000-15.000 km — Platinado, condensador e velas (motores com ignição por platinado, comum até meados dos anos 1980). | 20.000 km — Troca de mangueiras de arrefecimento por prevenção, mesmo sem rachadura visível. | 20.000 km — Inspeção de buchas e pivô da suspensão dianteira. | Anual — Inspeção estrutural das longarinas dianteiras (item crítico em motor 6 cilindros). | Anual — Fluido de freio e verificação do sistema de arrefecimento completo antes do verão.',
  },
]

const MACETES_CARAVAN: TipInput[] = [
  {
    severity: 'OK',
    title: 'Caravan compartilha toda a mecânica do Opala sedã/cupê',
    body: 'Motor (2.5, 3.8 ou 4.1), câmbio, freios e suspensão dianteira são idênticos aos do Opala sedã/cupê da mesma época — todos os macetes de motor e mecânica geral do Opala (retentor do virabrequim, carburador, arrefecimento do 6 cilindros, longarinas) valem igualmente para a Caravan. Ao procurar peça de motor/câmbio/freio, pedir "peça de Opala" funciona normalmente também para a Caravan.',
  },
  {
    severity: 'OK',
    title: 'Suspensão traseira é reforçada para carga — não troque por peça "genérica de Opala sedã" sem checar',
    body: 'Por ser perua, a Caravan usa molas e amortecedores traseiros com taxa mais dura, pensados para carga no porta-malas. Ao comprar peça de suspensão traseira, confirme que é específica para Caravan — usar peça de sedã pode deixar a traseira mais "dura" ou "mole" do que o projetado.',
  },
  {
    severity: 'WARN',
    title: 'Dobradiças e borracha de vedação da porta traseira/tampa sofrem mais com o tempo',
    body: 'A tampa traseira grande da Caravan é ponto comum de desgaste de dobradiça (folga, dificuldade para fechar) e ressecamento/endurecimento da borracha de vedação, o que favorece infiltração de água no porta-malas. Vale inspecionar essa borracha periodicamente e trocar preventivamente — infiltração não tratada apodrece o assoalho do porta-malas.',
  },
]

const PROBLEMAS_CARAVAN: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Infiltração de água pelo porta-malas por vedação/dobradiça desgastada',
    body: 'É a queixa mais específica da carroceria perua: com a borracha da tampa traseira ressecada, água entra no porta-malas em dia de chuva, acelerando ferrugem no assoalho traseiro — reforce a inspeção da vedação como parte da rotina de manutenção.',
  },
  {
    severity: 'WARN',
    title: 'Os mesmos problemas mecânicos do Opala sedã/cupê se aplicam integralmente',
    body: 'Retentor traseiro do virabrequim, desgaste de buchas/pivô da suspensão dianteira, alimentação irregular do carburador nos cilindros 2 e 5 (motor 6 cilindros) e necessidade de atenção redobrada ao sistema de arrefecimento valem igualmente para a Caravan — veja os problemas listados no bloco do Opala.',
  },
]

const MANUTENCAO_CARAVAN: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Caravan — mesma base do Opala + itens específicos de perua',
    body: 'Siga o cronograma mecânico do Opala sedã/cupê (óleo, carburador, arrefecimento, suspensão dianteira, longarinas) integralmente. Itens adicionais específicos da carroceria perua: Semestral — inspeção da borracha de vedação e dobradiças da tampa traseira. | Anual — inspeção do assoalho do porta-malas em busca de ferrugem por infiltração. | A cada troca de amortecedor/mola traseira — usar peça específica de Caravan, não de sedã.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Opala',
    yearFrom: 1968,
    yearTo: 1992,
    tireSize: '175/70 R14 · 185/70 R14 · 195/70 R14 (varia por versão/época — aro 13 em versões mais antigas)',
    frontPsi: 26,
    rearPsi: 28,
    frontPsiLoad: 30,
    rearPsiLoad: 32,
    sparePsi: 32,
    notes: 'Valores de referência aproximados a partir de recomendações de época da GM para pneu 195 — a pressão original exata varia por versão/motor/ano. Confirme sempre na etiqueta da coluna da porta ou manual do proprietário; na ausência desses, use a pressão máxima marcada no flanco do pneu como teto e calibre um pouco abaixo dela.',
  },
  {
    modelName: 'Caravan',
    yearFrom: 1975,
    yearTo: 1992,
    tireSize: '175/70 R14 · 185/70 R14 · 195/70 R14 (mesma faixa do Opala sedã/cupê)',
    frontPsi: 26,
    rearPsi: 30,
    frontPsiLoad: 30,
    rearPsiLoad: 34,
    sparePsi: 32,
    notes: 'Traseira pede pressão um pouco mais alta que o Opala sedã por ser perua com maior capacidade de carga — aumente ainda mais a traseira quando rodar com o porta-malas cheio. Confirme valor exato na etiqueta da porta ou manual.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Opala', yearFrom: 1968, yearTo: 1992, component: 'Óleo do motor + filtro', intervalKm: 4000, intervalMonths: 6, notes: 'Motor carburado antigo pede intervalo mais curto que carro moderno — não use referência de carro novo.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Opala', yearFrom: 1968, yearTo: 1992, component: 'Retentor traseiro do virabrequim — inspeção de vazamento', intervalKm: 10000, intervalMonths: 12, notes: 'Ponto de vazamento historicamente fraco. Monitore nível de óleo com frequência entre trocas.', priority: 'HIGH', order: 1 },
  { modelName: 'Opala', yearFrom: 1968, yearTo: 1992, component: 'Regulagem/limpeza do carburador e ponto de ignição', intervalKm: 10000, intervalMonths: 12, notes: 'Mantém marcha lenta estável e reduz o efeito da má distribuição nos cilindros 2 e 5 (motor 6 cilindros).', priority: 'MEDIUM', order: 2 },
  { modelName: 'Opala', yearFrom: 1968, yearTo: 1985, component: 'Platinado, condensador e velas', intervalKm: 15000, intervalMonths: 12, notes: 'Aplica-se a motores com ignição por platinado, comuns até meados dos anos 1980.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Opala', yearFrom: 1968, yearTo: 1992, component: 'Mangueiras de arrefecimento — troca preventiva', intervalKm: 20000, intervalMonths: 24, notes: 'Borracha de décadas resseca por dentro sem sinal visível — não espere rachar para trocar.', priority: 'HIGH', order: 4 },
  { modelName: 'Opala', yearFrom: 1968, yearTo: 1992, component: 'Buchas e pivô da suspensão dianteira — inspeção', intervalKm: 20000, intervalMonths: 12, notes: 'Ponto de desgaste histórico do modelo. Folga na direção é sinal de alerta.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Opala', yearFrom: 1968, yearTo: 1992, component: 'Longarinas dianteiras — inspeção estrutural', intervalKm: null, intervalMonths: 12, notes: 'Crítico em unidades com motor 6 cilindros. Trinca compromete segurança estrutural.', priority: 'CRITICAL', order: 6 },
  { modelName: 'Opala', yearFrom: 1968, yearTo: 1992, component: 'Fluido de freio', intervalKm: 20000, intervalMonths: 24, notes: 'Troca por tempo, não só por km — fluido de freio absorve umidade com o tempo.', priority: 'HIGH', order: 7 },
  { modelName: 'Opala', yearFrom: 1968, yearTo: 1992, component: 'Radiador — limpeza/inspeção do sistema de arrefecimento', intervalKm: 20000, intervalMonths: 12, notes: 'Motor 6 cilindros é pesado e gera bastante calor — arrefecimento é o ponto crítico do modelo.', priority: 'HIGH', order: 8 },
  { modelName: 'Caravan', yearFrom: 1975, yearTo: 1992, component: 'Óleo do motor + filtro', intervalKm: 4000, intervalMonths: 6, notes: 'Mesma base do Opala sedã/cupê — mecânica idêntica.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Caravan', yearFrom: 1975, yearTo: 1992, component: 'Retentor traseiro do virabrequim — inspeção de vazamento', intervalKm: 10000, intervalMonths: 12, notes: 'Ponto de vazamento historicamente fraco, igual ao Opala sedã/cupê.', priority: 'HIGH', order: 1 },
  { modelName: 'Caravan', yearFrom: 1975, yearTo: 1992, component: 'Longarinas dianteiras — inspeção estrutural', intervalKm: null, intervalMonths: 12, notes: 'Crítico em unidades com motor 6 cilindros.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Caravan', yearFrom: 1975, yearTo: 1992, component: 'Borracha de vedação e dobradiças da tampa traseira', intervalKm: null, intervalMonths: 6, notes: 'Item específico de perua — vedação ressecada causa infiltração e ferrugem no porta-malas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Caravan', yearFrom: 1975, yearTo: 1992, component: 'Assoalho do porta-malas — inspeção de ferrugem', intervalKm: null, intervalMonths: 12, notes: 'Consequência de infiltração não tratada pela vedação da tampa traseira.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Caravan', yearFrom: 1975, yearTo: 1992, component: 'Amortecedores e molas traseiras (peça específica de Caravan)', intervalKm: 40000, intervalMonths: null, notes: 'Não usar peça de sedã — a Caravan tem taxa mais dura, calibrada para carga no porta-malas.', priority: 'MEDIUM', order: 5 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Opala',
    yearFrom: 1968,
    yearTo: 1992,
    MACETES: MACETES_OPALA,
    PROBLEMAS: PROBLEMAS_OPALA,
    MANUTENCAO: MANUTENCAO_OPALA,
  },
  {
    modelName: 'Caravan',
    yearFrom: 1975,
    yearTo: 1992,
    MACETES: MACETES_CARAVAN,
    PROBLEMAS: PROBLEMAS_CARAVAN,
    MANUTENCAO: MANUTENCAO_CARAVAN,
  },
]

async function main() {
  console.log('🚗 Seed Chevrolet Opala + Caravan...')

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

  console.log('✅ Chevrolet Opala + Caravan concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
