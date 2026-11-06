/**
 * Seed Chevrolet Cruze — macetes, problemas, manutenção e calibragem de pneus
 * Cobre as duas gerações vendidas no Brasil, ambas modelName "Cruze":
 *  - Geração 1 (2011-2016, sedan, motor 1.8 16V FlexPower aspirado, LT/LTZ)
 *  - Geração 2 (2016-2023, sedan + hatch Sport6, motor 1.4 Turbo Flex,
 *    LT/LTZ/Premier/RS/Midnight/Sport/Black Bow Tie)
 * Descontinuado no Brasil em 2023 — peças de geração 2 já competem com
 * estoque cada vez mais restrito em concessionária, e a manutenção passou
 * a depender mais de oficina independente e peças alternativas.
 * Execute: pnpm --filter @motormacete/database db:seed:chevrolet-cruze
 *
 * Fontes: tabelacarros.com, reclameaqui.com.br, opinautos.com.br,
 *         mobiauto.com.br, oficinabrasil.com.br, autopapo.com.br,
 *         mercadoveiculos.com, montrex.com.br
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

// ─── Cruze geração 1 (2011-2016, sedan, motor 1.8 16V FlexPower aspirado) ─────

const MACETES_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 1.8 aspirado: simples e durável, mas beba mais que a média de motores turbo modernos',
    body: 'O motor 1.8 16V FlexPower é aspirado, sem turbo — mecanicamente mais simples e com histórico de durabilidade, mas o consumo é mais alto que o da geração 2 turbo. Não é defeito, é característica do projeto: ajuste as expectativas de consumo e valorize a simplicidade mecânica (menos componentes de pressurização para dar problema).',
  },
  {
    severity: 'OK',
    title: 'Câmbio automático de 6 marchas é elogiado, mas troque o óleo da transmissão em dia',
    body: 'O câmbio automático desta geração é considerado um dos pontos fortes do carro pelos proprietários, mas um defeito recorrente é a quebra do disco-mola em uso prolongado sem troca de óleo da transmissão. Respeite o intervalo de troca (cerca de 60 mil km) — negligenciar esse item é a causa mais citada de trancos e barulho na troca da 1ª para a 2ª marcha.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de óleo entre trocas: fique de olho no nível, não confie só no aviso do painel',
    body: 'Há relatos de consumo de óleo acima do normal em motores desta geração, muitas vezes ligado a diafragma da membrana anti-chamas danificado na tampa de válvulas (item barato de trocar). Verifique o nível do óleo manualmente a cada 1.000-1.500 km entre revisões — não espere o aviso do painel, que costuma vir tarde.',
  },
  {
    severity: 'OK',
    title: 'Cruze é encontrado com frequência em oficina independente — mecânica bem dominada no mercado',
    body: 'Apesar de ser um sedã "grande" para os padrões nacionais, o Cruze geração 1 já é bem conhecido nas oficinas independentes, com boa disponibilidade de peças de suspensão, motor e câmbio automático. Vale pesquisar preço fora da concessionária para itens de manutenção de rotina.',
  },
]

const PROBLEMAS_G1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Câmbio automático: quebra do disco-mola causando barulho e tranco na troca de marcha',
    body: 'Defeito recorrente relatado por oficinas especializadas é a quebra do disco-mola do câmbio automático, com barulho seguido de tranco na troca de marcha — principalmente da 1ª para a 2ª. Em casos avançados, pode chegar a quebrar o eixo de entrada ou até a carcaça do câmbio. Óleo de câmbio trocado em dia reduz bastante o risco; se notar tranco ou barulho novo na troca de marcha, não adie o diagnóstico.',
  },
  {
    severity: 'WARN',
    title: 'Consumo excessivo de óleo e marcha lenta irregular',
    body: 'Proprietários relatam consumo de óleo acima do esperado combinado com marcha lenta irregular — frequentemente ligado ao diafragma da membrana anti-chamas (respiro do cárter) danificado na tampa de válvulas. É um reparo relativamente barato que resolve boa parte dos casos; vale investigar antes de suspeitar de desgaste interno do motor.',
  },
  {
    severity: 'WARN',
    title: 'Oscilação de marcha lenta e desligamento ao passar em quebra-molas',
    body: 'Há relatos de oscilação na marcha lenta e até desligamento do motor em situações específicas, como ao passar sobre quebra-molas. Vale investigar sensores de posição e conexões elétricas na região do motor antes de assumir problema mecânico maior.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de combustível acima do esperado para a categoria',
    body: 'Reparadores relatam queixas de consumo de combustível acima do esperado para um sedã desse porte com motor aspirado 1.8. Filtro de ar sujo, velas gastas e pneus com pressão baixa pioram ainda mais esse quadro — mantenha esses itens em dia antes de suspeitar de problema no motor ou na injeção.',
  },
]

const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Cruze 1.8 aspirado geração 1 (Chevrolet + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Velas de ignição. | 40.000 km — Fluido de freio DOT 3/4. | 60.000 km — Óleo do câmbio automático — item crítico para evitar o defeito conhecido de disco-mola, não trate como vitalício. | 60.000 km — Fluido de arrefecimento. | Rodízio de pneus a cada 10.000 km.',
  },
]

// ─── Cruze geração 2 (2016-2023, sedan + hatch Sport6, motor 1.4 Turbo Flex) ──

const MACETES_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 1.4 Turbo Flex: bom desempenho, mas exige óleo em dia e atenção ao turbo',
    body: 'O motor 1.4 Turbo Flex trouxe desempenho superior ao 1.8 aspirado da geração anterior, mas motores turbo em geral são mais sensíveis a atraso de troca de óleo e óleo fora de especificação. Use sempre óleo sintético na viscosidade indicada pelo manual (0W-20 com certificação Dexos) e nunca desligue o motor imediatamente após rodar em alta rotação/velocidade — deixe alguns segundos em marcha lenta para o turbo esfriar antes de desligar.',
  },
  {
    severity: 'OK',
    title: 'Cruze foi descontinuado no Brasil em 2023 — planeje-se para peças mais escassas no futuro',
    body: 'A produção do Cruze no Brasil terminou em 2023. Isso significa que, com o tempo, peças específicas em concessionária tendem a ficar mais escassas e caras. Vale mapear desde já quais peças de desgaste (suspensão, freio, elétrica) têm equivalente compatível em outras linhas da GM ou em marcas de reposição — evita ficar na mão quando o carro estiver mais velho.',
  },
  {
    severity: 'WARN',
    title: 'Turbo: ruído diferente ou perda de potência gradual pode ser desgaste do rotor',
    body: 'Alguns proprietários relatam desgaste prematuro do rotor do turbo e falha na vedação da válvula de alívio — na prática, isso se manifesta como perda de potência e aumento de consumo (o carro "não responde" como antes). Se notar esse padrão, não insista em rodar "para acostumar" — o reparo é a troca do conjunto do turbo, que fica mais caro quanto mais tempo se roda com o defeito.',
  },
  {
    severity: 'OK',
    title: 'Versão Sport6 hatch compartilha toda a mecânica do sedan',
    body: 'A versão hatch Sport6 usa exatamente o mesmo motor 1.4 Turbo Flex e câmbio do sedan — para peças de motor, câmbio e suspensão, cadastros de "Cruze sedan" e "Cruze Sport6" costumam ser intercambiáveis em oficina independente.',
  },
  {
    severity: 'OK',
    title: 'Tampa de válvulas: diafragma rasgado causa oscilação e fumaça branca — item barato de checar antes de suspeitar de coisa maior',
    body: 'A tampa de válvulas desta geração pode ter o diafragma interno rasgado, causando oscilação da marcha lenta e até fumaça branca leve pelo escapamento. É um reparo relativamente simples e barato — vale descartar essa possibilidade antes de investir em diagnósticos mais caros para os mesmos sintomas.',
  },
]

const PROBLEMAS_G2: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Desgaste prematuro do rotor do turbo e falha na vedação da válvula de alívio',
    body: 'Queixa relatada por proprietários: perda de potência progressiva e aumento de consumo por desgaste do rotor do turbo e falha de vedação na válvula de alívio (wastegate). A solução definitiva relatada é a troca do conjunto completo do turbo — reparo caro, então não vale a pena adiar o diagnóstico ao notar os primeiros sinais de perda de resposta.',
  },
  {
    severity: 'WARN',
    title: 'Consumo leve de óleo entre trocas — associado a desgaste de anéis em modelos de início de produção',
    body: 'Alguns proprietários, principalmente de unidades de início de produção desta geração, relatam consumo leve de óleo entre trocas, possivelmente ligado a desgaste dos anéis do pistão. Verifique o nível manualmente com regularidade — nível baixo de óleo combinado com batida de motor é sinal de alerta que não deve ser ignorado.',
  },
  {
    severity: 'WARN',
    title: 'Diafragma da tampa de válvulas rasgado — oscilação de marcha lenta e fumaça branca leve',
    body: 'A tampa de válvulas pode ter o diafragma interno rasgado, causando oscilação na marcha lenta e, em alguns casos, saída de fumaça branca leve pelo escapamento. Reparo relativamente barato — descarte essa possibilidade antes de assumir problema mais sério no motor.',
  },
  {
    severity: 'DANGER',
    title: 'Falha no termostato pode levar a superaquecimento do motor',
    body: 'Falhas na válvula termostática, responsável por regular a temperatura do motor, foram relatadas e podem levar a superaquecimento com risco de dano grave ao motor se não tratadas a tempo. Fique atento ao indicador de temperatura no painel e a qualquer aumento anormal — não continue rodando com o motor visivelmente quente esperando "esfriar sozinho".',
  },
  {
    severity: 'WARN',
    title: 'Peças de reposição mais escassas após a descontinuação em 2023',
    body: 'Com o fim da produção nacional em 2023, alguns itens específicos de acabamento e eletrônica tendem a ficar mais escassos em concessionária ao longo dos anos. Para peças mecânicas (motor, câmbio, suspensão), a boa notícia é que o mercado de reposição independente já domina bem o carro — mas vale pesquisar previamente a disponibilidade antes de comprar um Cruze usado pensando em manutenção de longo prazo.',
  },
]

const MANUTENCAO_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Cruze 1.4 Turbo Flex geração 2 (Chevrolet + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (sintético 0W-20 Dexos) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão, turbo (ruído/vazamento) e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Velas de ignição. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento — atenção ao termostato. | 60.000 km — Óleo do câmbio automático (versões AT). | Correia/corrente de comando: motor 1.4 Turbo desta geração usa corrente — confirme no manual do seu ano/versão antes de agendar troca programada. | Rodízio de pneus a cada 10.000 km.',
  },
]

// ─── Tire Pressures ────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Cruze',
    yearFrom: 2011,
    yearTo: 2016,
    tireSize: '205/60 R16 (LT) · 215/50 R17 (LTZ)',
    frontPsi: 32,
    rearPsi: 32,
    frontPsiLoad: 35,
    rearPsiLoad: 35,
    sparePsi: 60,
    notes: 'Valores de referência para uso normal com pneus frios — a pressão do Cruze costuma variar mais entre versões que a média (faixa geral observada de 29 a 36 PSI). Confirme sempre o valor exato na etiqueta da coluna da porta do motorista.',
  },
  {
    modelName: 'Cruze',
    yearFrom: 2016,
    yearTo: 2023,
    tireSize: '205/55 R16 · 215/50 R17 (LTZ/RS/Premier) · 225/45 R18 (Sport6/Black Bow Tie)',
    frontPsi: 32,
    rearPsi: 32,
    frontPsiLoad: 35,
    rearPsiLoad: 35,
    sparePsi: 60,
    notes: 'Rodas maiores (18") das versões esportivas costumam pedir calibragem levemente diferente. Confirme sempre o valor exato na etiqueta da coluna da porta do motorista, com pneus frios.',
  },
]

// ─── Maintenance Items ──────────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // Geração 1 (2011-2016, 1.8 aspirado)
  { modelName: 'Cruze', yearFrom: 2011, yearTo: 2016, component: 'Óleo do motor 1.8', intervalKm: 10000, intervalMonths: 12, notes: 'Siga a viscosidade indicada no manual.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Cruze', yearFrom: 2011, yearTo: 2016, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Cruze', yearFrom: 2011, yearTo: 2016, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em cidades com muita poeira/poluição.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Cruze', yearFrom: 2011, yearTo: 2016, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Cruze', yearFrom: 2011, yearTo: 2016, component: 'Velas de ignição', intervalKm: 40000, intervalMonths: null, notes: 'Motor aspirado — vela convencional.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Cruze', yearFrom: 2011, yearTo: 2016, component: 'Fluido de freio DOT 3/4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 5 },
  { modelName: 'Cruze', yearFrom: 2011, yearTo: 2016, component: 'Óleo do câmbio automático', intervalKm: 60000, intervalMonths: 48, notes: 'Item crítico — negligenciar é a principal causa relatada de quebra do disco-mola.', priority: 'CRITICAL', order: 6 },
  { modelName: 'Cruze', yearFrom: 2011, yearTo: 2016, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Chevrolet.', priority: 'HIGH', order: 7 },
  { modelName: 'Cruze', yearFrom: 2011, yearTo: 2016, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 8 },

  // Geração 2 (2016-2023, 1.4 Turbo)
  { modelName: 'Cruze', yearFrom: 2016, yearTo: 2023, component: 'Óleo do motor 1.4 Turbo (sintético 0W-20 Dexos)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor turbo — não atrase e não use óleo fora da especificação.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Cruze', yearFrom: 2016, yearTo: 2023, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Cruze', yearFrom: 2016, yearTo: 2023, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza em cidades com muita poeira/poluição.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Cruze', yearFrom: 2016, yearTo: 2023, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Cruze', yearFrom: 2016, yearTo: 2023, component: 'Velas de ignição', intervalKm: 40000, intervalMonths: null, notes: 'Motor turbo pede atenção redobrada ao intervalo.', priority: 'HIGH', order: 4 },
  { modelName: 'Cruze', yearFrom: 2016, yearTo: 2023, component: 'Turbo — inspeção de ruído e vedação', intervalKm: 40000, intervalMonths: null, notes: 'Desgaste do rotor e falha na válvula de alívio são queixas conhecidas. Verifique resposta de aceleração e ruídos anormais.', priority: 'HIGH', order: 5 },
  { modelName: 'Cruze', yearFrom: 2016, yearTo: 2023, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'Cruze', yearFrom: 2016, yearTo: 2023, component: 'Fluido de arrefecimento e válvula termostática', intervalKm: 60000, intervalMonths: 60, notes: 'Falha no termostato é queixa conhecida — fique atento ao indicador de temperatura.', priority: 'HIGH', order: 7 },
  { modelName: 'Cruze', yearFrom: 2016, yearTo: 2023, component: 'Óleo do câmbio automático', intervalKm: 60000, intervalMonths: 48, notes: 'Não é vitalício em uso severo.', priority: 'HIGH', order: 8 },
  { modelName: 'Cruze', yearFrom: 2016, yearTo: 2023, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Cruze', yearFrom: 2011, yearTo: 2016, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'Cruze', yearFrom: 2016, yearTo: 2023, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
]

async function main() {
  console.log('🚗 Seed Chevrolet Cruze...')

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

  console.log('✅ Chevrolet Cruze concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
