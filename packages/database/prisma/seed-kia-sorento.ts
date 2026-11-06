/**
 * Seed Kia Sorento — macetes, problemas, manutenção e calibragem de pneus
 * SUV 7 lugares, no Brasil desde 2004, já em 4 gerações:
 *  - BL (2004-2009): V6 3.5 gasolina 197cv (câmbio automático 4 marchas) e,
 *    depois, 2.5 CRDi turbodiesel 140cv — ambos com tração integral.
 *  - XM (2010-2014): 2.4 16V gasolina 174cv 4x2/4x4, V6 3.5 gasolina 278cv,
 *    e 2.2 CRDi turbodiesel 4x4.
 *  - UM (2014-2020): V6 3.3 gasolina 270cv (motor novo, mais eficiente) e
 *    versão EX com V6 3.8 267cv.
 *  - MQ4 (2020+, atual): retornou ao Brasil só com diesel CRDi 2.2 202cv.
 * Execute: pnpm --filter @motormacete/database db:seed:kia-sorento
 *
 * Fontes: reclameaqui.com.br, carroclub.com.br, 4x4brasil.com.br,
 *         noticiasautomotivas.com.br, stockes.com.br, tdiesel.ru (PT),
 *         calibragemdepneu.com.br, carros.blog.br
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

// ─── Geração 1 — BL (2004-2009) ────────────────────────────────────────────

const MACETES_BL: TipInput[] = [
  {
    severity: 'OK',
    title: 'V6 3.5 a gasolina: mecânica simples, mas fique de olho no consumo de óleo',
    body: 'A primeira geração chegou ao Brasil só com o V6 3.5 197cv, câmbio automático de 4 marchas e tração integral. É um motor robusto e sem a complexidade eletrônica de motores mais novos, mas alguns exemplares dessa família de motor (compartilhada com outros Hyundai/Kia da época) apresentam consumo de óleo acima do normal com o tempo — verifique o nível a cada abastecimento, não só na revisão.',
  },
  {
    severity: 'WARN',
    title: 'Diesel 2.5 CRDi: turbina cara, cuide do intercooler e da válvula EGR',
    body: 'A versão diesel 2.5 CRDi turbo (140cv) chegou um pouco depois. A troca de uma turbina defeituosa é cara e normalmente exige limpeza do intercooler e da válvula EGR juntos — se notar fumaça preta em aceleração ou perda de potência progressiva, não adie o diagnóstico, o custo só cresce quanto mais tempo rodar assim.',
  },
  {
    severity: 'OK',
    title: 'Tração integral: mantenha os 4 pneus com desgaste parelho',
    body: 'Em qualquer geração 4x4 do Sorento, evite trocar só 1 ou 2 pneus isoladamente — diferença grande de diâmetro entre os pneus força o sistema de tração integral e pode gerar desgaste prematuro em componentes caros da transmissão. Troque em pares no mínimo (eixo completo), de preferência os 4 juntos.',
  },
]

const PROBLEMAS_BL: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Diesel: relatos reais no Brasil de perda de potência e motor apagando em movimento',
    body: 'Há reclamações registradas de donos brasileiros de Sorento diesel (~2008/2009) relatando perda de potência progressiva e o motor apagando enquanto o carro está em movimento, com sintomas começando por volta de 50.000-60.000 km. Se notar perda de potência intermitente, não continue rodando normalmente — agende diagnóstico o quanto antes, esse padrão de sintoma antecede falhas mais graves.',
  },
  {
    severity: 'DANGER',
    title: 'Relatos de motor "batendo biela" e travamento em quilometragem relativamente baixa',
    body: 'Existem relatos de donos brasileiros de motor "batendo biela" (ruído grave de batida interna) a partir de ~70.000 km, incluindo casos de motor travando/fundindo com pouco mais de 77.000 km. Não é o padrão da maioria dos exemplares, mas é sério o suficiente para levar a sério qualquer ruído de batida metálica vindo do motor — pare de rodar e leve para diagnóstico imediatamente, esse sintoma normalmente já indica dano em andamento.',
  },
  {
    severity: 'WARN',
    title: 'Ruídos de painel e banco em piso irregular',
    body: 'Queixa recorrente e de baixa gravidade: ruído/chocalho vindo do painel ou do banco ao passar por buracos ou piso irregular. Geralmente é folga de fixação (parafusos/encaixes plásticos) e não problema mecânico — vale checar antes de desmontar algo maior.',
  },
]

const MANUTENCAO_BL: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Sorento BL (2004-2009)',
    body: '10.000 km — Troca de óleo do motor + filtro (verifique nível de óleo do V6 3.5 entre trocas, alguns exemplares consomem mais que o normal). | 10.000 km — Inspeção de freios, suspensão e vazamentos. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio. | 60.000 km — Velas de ignição (versão gasolina). | 60.000-80.000 km — Fluido do câmbio automático de 4 marchas. | Diesel: intercooler e válvula EGR — limpeza preventiva junto de qualquer manutenção de turbina. | Sempre — qualquer ruído de batida no motor exige parar e diagnosticar, não é "normal" nesse motor.',
  },
]

// ─── Geração 2 — XM (2010-2014) ────────────────────────────────────────────

const MACETES_XM: TipInput[] = [
  {
    severity: 'OK',
    title: 'Versão 2.4 4x2: manutenção mais barata que o V6 ou o diesel',
    body: 'A segunda geração trouxe a opção de motor 2.4 4 cilindros (174cv) além do V6 3.5 (278cv) e do diesel 2.2 CRDi. Se o uso é majoritariamente urbano/rodoviário sem necessidade real de 4x4, a versão 2.4 4x2 tem manutenção sensivelmente mais barata (menos peça de tração integral, motor mais simples) que as demais.',
  },
  {
    severity: 'WARN',
    title: 'Diesel 2.2 CRDi: corrente de distribuição robusta, mas não é "eterna"',
    body: 'O motor diesel 2.2 CRDi usa corrente de distribuição (não correia), projetada para durar bastante — mas fabricantes recomendam inspeção a partir de 200.000 km. Ruído de "matraca" na partida a frio é sinal de corrente ou tensionador gastos, vale investigar antes que vire dano maior.',
  },
]

const PROBLEMAS_XM: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Câmbio automático passando marchas rápido demais em baixa km',
    body: 'Alguns donos relatam o câmbio automático "passando todas as marchas" muito rapidamente mesmo com o carro ainda com poucos quilômetros rodados — pode ser comportamento normal de programação econômica do câmbio ou sinal de ajuste necessário. Se incomodar muito ou vier acompanhado de tranco, vale agendar diagnóstico do módulo de câmbio.',
  },
  {
    severity: 'WARN',
    title: 'V6 3.5/3.8: fique atento a consumo de óleo e ruído de tensionador de corrente',
    body: 'A família de motor V6 usada pela Hyundai/Kia nessa época tem relatos de consumo de óleo acima do esperado e desgaste de tensionador da corrente de distribuição em exemplares mais rodados. Não é um defeito generalizado, mas justifica checar nível de óleo com mais frequência que o intervalo padrão e ficar atento a ruído metálico na partida.',
  },
]

const MANUTENCAO_XM: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Sorento XM (2010-2014)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio. | 60.000 km — Velas de ignição (versões gasolina). | 60.000-80.000 km — Fluido do câmbio automático. | Diesel 2.2 CRDi — inspeção da corrente de distribuição e tensionador a partir de 150.000-200.000 km. | Sempre — em qualquer versão V6, verifique nível de óleo entre trocas.',
  },
]

// ─── Geração 3 — UM (2014-2020) ────────────────────────────────────────────

const MACETES_UM: TipInput[] = [
  {
    severity: 'OK',
    title: 'V6 3.3 substituiu o antigo 3.5 — motor mais novo e eficiente',
    body: 'A terceira geração trocou o V6 3.5 pelo V6 3.3 (270cv), um projeto de motor mais recente com injeção direta e melhor eficiência de combustível. A versão EX manteve por um tempo o V6 3.8 (267cv) como opção de topo — se for comprar peça, confirme qual motor exato seu exemplar tem antes de fechar compra, são projetos de motor diferentes apesar da cilindrada próxima.',
  },
  {
    severity: 'OK',
    title: 'SUV 7 lugares: ajuste a pressão traseira com a 3ª fileira ocupada',
    body: 'Com a terceira fileira de bancos ocupada e porta-malas carregado, aumente a pressão dos pneus traseiros para o valor de carga máxima indicado na etiqueta da porta — reduz desgaste irregular e melhora a estabilidade em viagens com o carro cheio.',
  },
]

const PROBLEMAS_UM: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Componentes eletrônicos e sensores mais sensíveis que gerações anteriores',
    body: 'A terceira geração trouxe bem mais eletrônica embarcada (central multimídia, sensores de assistência) que as gerações anteriores — problemas de software/sensor tendem a ser mais comuns que problema mecânico puro nessa geração. Antes de trocar peça cara por sintoma elétrico intermitente, vale escanear os códigos de erro (OBD2) para confirmar a causa real.',
  },
]

const MANUTENCAO_UM: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Sorento UM (2014-2020)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio. | 60.000 km — Velas de ignição. | 60.000-80.000 km — Fluido do câmbio automático. | 100.000 km — Verificação de sensores/central eletrônica se houver alerta no painel sem causa aparente. | Rodízio de pneus a cada 10.000 km — reforce a pressão traseira com a 3ª fileira ocupada.',
  },
]

// ─── Geração 4 — MQ4 (2020+) ───────────────────────────────────────────────

const MACETES_MQ4: TipInput[] = [
  {
    severity: 'OK',
    title: 'Só diesel no Brasil — motor CRDi 2.2 novo, mais eficiente e com mais torque',
    body: 'A geração atual retornou ao mercado brasileiro só com o motor diesel CRDi 2.2 (202cv, 45 kgfm de torque) — não há opção a gasolina no Brasil nessa geração. É um motor mais moderno que o CRDi das gerações anteriores, com controle eletrônico mais preciso de injeção — cuide especialmente do combustível: diesel de má qualidade prejudica mais um motor common rail moderno que os antigos.',
  },
  {
    severity: 'OK',
    title: 'Rede de assistência: prefira oficina com experiência em diesel Kia/Hyundai moderno',
    body: 'Motor diesel common rail eletrônico moderno exige equipamento de diagnóstico específico — para qualquer sintoma de injeção, prefira concessionária ou oficina especializada em diesel Hyundai/Kia em vez de mecânica geral, principalmente ainda dentro do período de garantia.',
  },
]

const PROBLEMAS_MQ4: TipInput[] = [
  {
    severity: 'OK',
    title: 'Geração recente — histórico de confiabilidade no Brasil ainda curto',
    body: 'Por ser um retorno recente ao mercado brasileiro, ainda não há um volume grande de relatos de longo prazo específicos dessa geração no Brasil. Isso não é motivo de alarme, só significa que vale acompanhar fóruns e grupos de proprietários à medida que a frota envelhece, em vez de assumir que os problemas das gerações antigas necessariamente se repetem (o motor e a plataforma são bem diferentes).',
  },
]

const MANUTENCAO_MQ4: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Sorento MQ4 diesel (2020+)',
    body: '10.000-15.000 km — Troca de óleo do motor + filtro (siga o intervalo exato do manual, motores diesel modernos são sensíveis a atraso de troca). | 15.000 km — Filtro de combustível diesel. | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio. | 60.000-80.000 km — Fluido do câmbio automático. | Sempre — abasteça só em posto de confiança, diesel de má qualidade é o maior risco para esse motor common rail moderno.',
  },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Sorento', yearFrom: 2004, yearTo: 2009, MACETES: MACETES_BL, PROBLEMAS: PROBLEMAS_BL, MANUTENCAO: MANUTENCAO_BL },
  { modelName: 'Sorento', yearFrom: 2010, yearTo: 2014, MACETES: MACETES_XM, PROBLEMAS: PROBLEMAS_XM, MANUTENCAO: MANUTENCAO_XM },
  { modelName: 'Sorento', yearFrom: 2015, yearTo: 2019, MACETES: MACETES_UM, PROBLEMAS: PROBLEMAS_UM, MANUTENCAO: MANUTENCAO_UM },
  { modelName: 'Sorento', yearFrom: 2020, yearTo: null, MACETES: MACETES_MQ4, PROBLEMAS: PROBLEMAS_MQ4, MANUTENCAO: MANUTENCAO_MQ4 },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Sorento',
    yearFrom: 2004,
    yearTo: 2009,
    tireSize: '225/75 R16 (versões EX)',
    frontPsi: 30,
    rearPsi: 30,
    frontPsiLoad: 32,
    rearPsiLoad: 36,
    sparePsi: 60,
    notes: 'Valor de referência — confirme na etiqueta da coluna da porta do motorista ou manual do proprietário do seu exemplar.',
  },
  {
    modelName: 'Sorento',
    yearFrom: 2010,
    yearTo: 2014,
    tireSize: '235/60 R18 (versão 2.4) · 235/65 R17 (versões básicas)',
    frontPsi: 32,
    rearPsi: 32,
    frontPsiLoad: 33,
    rearPsiLoad: 36,
    sparePsi: 60,
    notes: 'Valor de referência — confirme na etiqueta da coluna da porta do motorista. Reforce a traseira com carga/3ª fileira ocupada.',
  },
  {
    modelName: 'Sorento',
    yearFrom: 2015,
    yearTo: null,
    tireSize: '235/60 R18 · 255/45 R20 (versões topo de linha)',
    frontPsi: 33,
    rearPsi: 33,
    frontPsiLoad: 35,
    rearPsiLoad: 38,
    sparePsi: 60,
    notes: 'Valor de referência — confirme na etiqueta da coluna da porta do motorista. Reforce a traseira com carga/3ª fileira ocupada.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Sorento', yearFrom: 2004, yearTo: 2009, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Verifique nível entre trocas, o V6 3.5 dessa geração pode consumir mais óleo que o normal.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Sorento', yearFrom: 2004, yearTo: 2009, component: 'Diesel — inspeção de turbina/intercooler/EGR', intervalKm: null, intervalMonths: 12, notes: 'Fumaça preta ou perda de potência progressiva exige diagnóstico imediato.', priority: 'HIGH', order: 1 },
  { modelName: 'Sorento', yearFrom: 2004, yearTo: 2009, component: 'Inspeção de ruído de motor (batida/matraca)', intervalKm: null, intervalMonths: 6, notes: 'Há relatos reais de motor batendo biela nessa geração — não ignore ruído metálico.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Sorento', yearFrom: 2004, yearTo: 2009, component: 'Fluido do câmbio automático', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 3 },

  { modelName: 'Sorento', yearFrom: 2010, yearTo: 2014, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 4 },
  { modelName: 'Sorento', yearFrom: 2010, yearTo: 2014, component: 'Corrente de distribuição (diesel 2.2) — inspeção', intervalKm: 150000, intervalMonths: null, notes: 'Fabricante recomenda inspeção a partir de 200.000 km, mas ruído de matraca na partida indica desgaste antes disso.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Sorento', yearFrom: 2010, yearTo: 2014, component: 'Fluido do câmbio automático', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'Sorento', yearFrom: 2010, yearTo: 2014, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 7 },

  { modelName: 'Sorento', yearFrom: 2015, yearTo: 2019, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 8 },
  { modelName: 'Sorento', yearFrom: 2015, yearTo: 2019, component: 'Verificação de sensores/central eletrônica', intervalKm: 100000, intervalMonths: null, notes: 'Escaneie códigos OBD2 antes de trocar peça por sintoma elétrico intermitente.', priority: 'MEDIUM', order: 9 },
  { modelName: 'Sorento', yearFrom: 2015, yearTo: 2019, component: 'Fluido do câmbio automático', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 10 },
  { modelName: 'Sorento', yearFrom: 2015, yearTo: 2019, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Reforce pressão traseira com 3ª fileira/carga.', priority: 'MEDIUM', order: 11 },

  { modelName: 'Sorento', yearFrom: 2020, yearTo: null, component: 'Óleo do motor diesel + filtro', intervalKm: 12500, intervalMonths: 12, notes: 'Siga o intervalo exato do manual — motor common rail moderno é sensível a atraso.', priority: 'CRITICAL', order: 12 },
  { modelName: 'Sorento', yearFrom: 2020, yearTo: null, component: 'Filtro de combustível diesel', intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 13 },
  { modelName: 'Sorento', yearFrom: 2020, yearTo: null, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 14 },
  { modelName: 'Sorento', yearFrom: 2020, yearTo: null, component: 'Fluido do câmbio automático', intervalKm: 80000, intervalMonths: 60, notes: null, priority: 'MEDIUM', order: 15 },
]

async function main() {
  console.log('🚗 Seed Kia Sorento...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Kia Motors', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Kia Motors', vehicleTypeId: carroType.id },
  })

  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Sorento', brandId: brand.id } },
    update: {},
    create: { name: 'Sorento', brandId: brand.id },
  })

  await prisma.tip.deleteMany({ where: { modelName: 'Sorento' } })

  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))

    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({
        modelName: block.modelName,
        category: cat,
        severity: tip.severity,
        title: tip.title,
        body: tip.body,
        yearFrom: block.yearFrom,
        yearTo: block.yearTo,
        order: order++,
      })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }

  await prisma.tirePressure.deleteMany({ where: { modelName: 'Sorento' } })
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo})`)
  }

  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Sorento' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Kia Sorento concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
