/**
 * Seed Ford Fiesta — macetes, problemas, manutenção e calibragem de pneus
 * Um dos carros mais vendidos da história do Brasil (quase 18 milhões de
 * unidades no mundo, 40 anos de linha), produzido no Brasil de 1996 a
 * 2019/2021 (até o fechamento das fábricas da Ford no país). 3 blocos:
 *  - 1996-2002: motor Endura 1.0/1.3 e Zetec 1.4 (montagem em São
 *    Bernardo do Campo/SP), depois facelift com motor nacional Zetec
 *    Rocam 1.0/1.6. Trims CLX/GL/GLX.
 *  - 2003-2010: mesma base com visual atualizado, produção transferida
 *    para Camaçari (BA), motor Zetec Rocam 1.0/1.6 (incluindo a versão
 *    "Supercharger" com compressor). Trims Class/Street/Sedan/
 *    Personnalité.
 *  - 2011-2019: "New Fiesta" (6ª geração global, importado do México no
 *    início, depois nacionalizado), 7 airbags, direção elétrica,
 *    controle de estabilidade/tração, SYNC, motor 1.0/1.6 Flex e o
 *    premiado 1.0 EcoBoost turbo (125cv). Câmbio automatizado de dupla
 *    embreagem PowerShift — defeito crônico amplamente documentado,
 *    ação judicial no Brasil e nos EUA.
 * Execute: pnpm --filter @motormacete/database db:seed:ford-fiesta
 *
 * Fontes: procon.sp.gov.br, autopapo.com.br, instacarro.com,
 *         vrum.com.br, garagem360.com.br, oficinabrasil.com.br,
 *         retornar.com.br, media.ford.com
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ─── 1996-2002 — Endura 1.0/1.3, Zetec 1.4, depois Zetec Rocam ────────────
const MACETES_96: TipInput[] = [
  { severity: 'OK', title: 'Peça mecânica básica ainda fácil de achar', body: 'Por ter vendido em grande volume, peça de mecânica básica (motor, embreagem, suspensão) dessa geração ainda é relativamente fácil e barata de achar, mesmo peça de desmanche serve bem para item não crítico de segurança.' },
]
const PROBLEMAS_96: TipInput[] = [
  { severity: 'WARN', title: 'Vazamento de óleo e desgaste de suspensão são queixas comuns em carro dessa idade', body: 'Com quase 25-30 anos, os pontos de atenção mais prováveis são vazamento de óleo por retentor/junta ressecada e desgaste de buchas/coxins de suspensão — mais ligado à idade do carro que a defeito de projeto específico. Inspecione bem antes de comprar um exemplar usado dessa era.' },
]
const MANUTENCAO_96: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Fiesta 1996-2002', body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios, suspensão e vazamentos. | 20.000 km — Filtro de ar. | 40.000 km — Fluido de freio. | 60.000 km — Correia dentada (motor interferente, não atrase).' },
]

// ─── 2003-2010 — Zetec Rocam (Camaçari), incl. Supercharger ───────────────
const MACETES_03: TipInput[] = [
  { severity: 'OK', title: 'Motor Zetec Rocam: robusto e de manutenção relativamente barata', body: 'O motor Zetec Rocam (1.0/1.6) é considerado um dos motores mais duráveis e de manutenção mais barata da Ford no Brasil dessa época — peça abundante, mecânica simples, boa reputação de longevidade com manutenção em dia.' },
  { severity: 'WARN', title: 'Versão Supercharger: compressor mecânico exige atenção redobrada ao óleo', body: 'A versão com compressor mecânico (Supercharger) tem manutenção um pouco mais específica que a versão aspirada — o compressor depende de lubrificação e correia próprias, verifique o estado da correia do compressor junto da correia de acessórios nas revisões, não só a correia dentada do motor.' },
]
const PROBLEMAS_03: TipInput[] = [
  { severity: 'OK', title: 'Poucas queixas graves documentadas — geração considerada confiável', body: 'Comparado às gerações seguintes (principalmente a com câmbio PowerShift), essa geração tem histórico de confiabilidade bem mais tranquilo, sem defeito crônico grave amplamente documentado.' },
]
const MANUTENCAO_03: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Fiesta 2003-2010 (Zetec Rocam)', body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios e suspensão. | 20.000 km — Filtro de ar. | 40.000 km — Fluido de freio. | 60.000 km — Correia dentada (+ correia do compressor nas versões Supercharger).' },
]

// ─── 2011-2019 — New Fiesta (6ª geração), EcoBoost, câmbio PowerShift ─────
const MACETES_11: TipInput[] = [
  { severity: 'OK', title: '1.0 EcoBoost: motor premiado, mas exige troca de óleo rigorosa', body: 'O motor 1.0 turbo EcoBoost (125cv) foi bastante premiado internacionalmente por eficiência — mas é um motor pequeno trabalhando sob pressão relativamente alta para o tamanho, então nunca atrase a troca de óleo, é o principal fator de longevidade desse motor.' },
  { severity: 'WARN', title: 'Câmbio manual: se seu Fiesta 2013/2014 tem PowerShift, verifique a garantia estendida', body: 'A Ford estendeu a garantia do câmbio PowerShift para 10 anos ou 240.000 km especificamente por causa do defeito crônico amplamente documentado — se você tem um New Fiesta 2013/2014 com esse câmbio, verifique com a concessionária se sua unidade ainda está dentro dessa garantia estendida antes de pagar qualquer reparo do próprio bolso.',
  },
]
const PROBLEMAS_11: TipInput[] = [
  { severity: 'DANGER', title: 'Câmbio PowerShift (2013-2014): defeito crônico documentado, ação judicial no Brasil e nos EUA', body: 'O câmbio automatizado de dupla embreagem PowerShift, usado no New Fiesta (hatch e sedan) fabricado em 2013 e 2014, tem defeito crônico amplamente documentado: trancos, reduções bruscas, acelerações não pretendidas e atraso de resposta na troca de marcha, com necessidade recorrente de troca prematura do kit de embreagem. A Ford reconheceu a falha, mas foi acusada de evitar solução definitiva via "programas de satisfação do cliente" em vez de recall formal — nos EUA, a ação coletiva resultou em pagamento de US$35 milhões a 1,9 milhão de consumidores em 2017. Se seu carro apresenta esses sintomas, procure o Procon da sua cidade e considere ação judicial — não é caso isolado, é defeito de projeto reconhecido.' },
  { severity: 'WARN', title: 'Saída da Ford do Brasil deixou donos de PowerShift em situação mais insegura', body: 'Com o fechamento das operações da Ford no Brasil, o suporte e a rede de assistência para o defeito do PowerShift ficaram mais incertos para quem ainda não resolveu o problema. Documente tudo (reclamação, orçamento, histórico do carro) o quanto antes caso ainda não tenha buscado reparo/indenização — o caminho jurídico fica mais difícil quanto mais a fabricante se distancia do mercado brasileiro.' },
]
const MANUTENCAO_11: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Fiesta 2011-2019 (New Fiesta, 1.0/1.6 Flex e 1.0 EcoBoost)', body: '10.000 km — Troca de óleo do motor + filtro (essencial no 1.0 EcoBoost turbo). | 10.000 km — Inspeção de freios e suspensão. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio. | 60.000 km — Correia dentada (versões Flex aspiradas) ou corrente (verifique especificação do seu motor exato). | Câmbio PowerShift — qualquer tranco, redução brusca ou aceleração não pretendida exige parar e levar à concessionária imediatamente, é defeito de projeto conhecido, não desgaste normal.' },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Fiesta', yearFrom: 1996, yearTo: 2002, MACETES: MACETES_96, PROBLEMAS: PROBLEMAS_96, MANUTENCAO: MANUTENCAO_96 },
  { modelName: 'Fiesta', yearFrom: 2003, yearTo: 2010, MACETES: MACETES_03, PROBLEMAS: PROBLEMAS_03, MANUTENCAO: MANUTENCAO_03 },
  { modelName: 'Fiesta', yearFrom: 2011, yearTo: 2019, MACETES: MACETES_11, PROBLEMAS: PROBLEMAS_11, MANUTENCAO: MANUTENCAO_11 },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Fiesta', yearFrom: 1996, yearTo: 2002, tireSize: '165/70 R13 · 175/65 R14 (referência)', frontPsi: 28, rearPsi: 28, frontPsiLoad: 30, rearPsiLoad: 32, sparePsi: 60, notes: 'Valor de referência — confirme na etiqueta da coluna da porta.' },
  { modelName: 'Fiesta', yearFrom: 2003, yearTo: 2010, tireSize: '175/65 R14 (referência)', frontPsi: 28, rearPsi: 28, frontPsiLoad: 30, rearPsiLoad: 32, sparePsi: 60, notes: 'Valor de referência — confirme na etiqueta da coluna da porta.' },
  { modelName: 'Fiesta', yearFrom: 2011, yearTo: 2019, tireSize: '185/60 R15 · 195/50 R16 (Titanium, referência)', frontPsi: 30, rearPsi: 30, frontPsiLoad: 32, rearPsiLoad: 34, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Fiesta', yearFrom: 1996, yearTo: 2002, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Fiesta', yearFrom: 1996, yearTo: 2002, component: 'Correia dentada', intervalKm: 60000, intervalMonths: 48, notes: 'Motor interferente.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Fiesta', yearFrom: 2003, yearTo: 2010, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 2 },
  { modelName: 'Fiesta', yearFrom: 2003, yearTo: 2010, component: 'Correia dentada (+ correia do compressor nas versões Supercharger)', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'CRITICAL', order: 3 },
  { modelName: 'Fiesta', yearFrom: 2011, yearTo: 2019, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Essencial no 1.0 EcoBoost turbo.', priority: 'CRITICAL', order: 4 },
  { modelName: 'Fiesta', yearFrom: 2011, yearTo: 2019, component: 'Verificação de garantia estendida do câmbio PowerShift (unidades 2013/2014)', intervalKm: null, intervalMonths: null, notes: 'Garantia estendida pela Ford para 10 anos ou 240.000 km nesse componente.', priority: 'CRITICAL', order: 5 },
  { modelName: 'Fiesta', yearFrom: 2011, yearTo: 2019, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'Fiesta', yearFrom: 2011, yearTo: 2019, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 7 },
]

async function main() {
  console.log('🚗 Seed Ford Fiesta...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Ford', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Ford', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Fiesta', brandId: brand.id } },
    update: {}, create: { name: 'Fiesta', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Fiesta' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Fiesta' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Fiesta' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Ford Fiesta concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
