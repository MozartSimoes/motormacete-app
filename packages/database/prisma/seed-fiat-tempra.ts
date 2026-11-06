/**
 * Seed Fiat Tempra — macetes, problemas, manutenção e calibragem de pneus
 * Lançado no Brasil em novembro/1991, produzido até outubro/1998 (mais de
 * 204 mil unidades). Foi o primeiro sedã nacional com painel digital,
 * motor 16V (1993) e versão turbo. Início com o 2.0 8V carburetado
 * (Weber TLDZ, 99cv); em 1993 chegou o 2.0 16V com injeção eletrônica
 * multiponto (127cv — primeiro motor nacional com essa tecnologia); em
 * 1994 o Turbo 2 portas (2.0 8V turbo, Garrett T3, 165cv) e em 1995 o
 * Turbo Stile 4 portas (até 220 km/h). A perua Tempra SW (2.0, 119cv) foi
 * importada da Itália a partir de 1993. Facelift final em 1996 (faróis
 * redesenhados, para-choques novos, versões rebatizadas SX/HLX/Turbo
 * Stile). SW e Turbo saíram de linha em 1997; produção encerrada em
 * outubro/1998, com unidades ano-modelo 1999 vendidas depois.
 * Nenhum recall oficial foi localizado para o Tempra no Brasil.
 * Execute: pnpm --filter @motormacete/database db:seed:fiat-tempra
 *
 * Fontes: correiodeminas.com.br, retornar.com.br, novoguscar.blogspot.com,
 *         encontracarros.com.br, canaldapeca.com.br, carzin.com.br,
 *         mecanicacaseira.blogspot.com, clubedotempra.com.br,
 *         opinautos.com.br, en.wikipedia.org
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- 1991-1993 (lançamento, 2.0 8V carburetado, painel digital) ----------
const MACETES_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 2.0 8V a carburador (Weber TLDZ) exige regulagem periódica',
    body: 'A versão de lançamento usa carburador Weber TLDZ, que precisa de regulagem periódica de marcha lenta e mistura para manter consumo e resposta em dia. Um carburador desregulado é a causa mais comum de "carro engasgando" ou consumo alto nessa fase — antes de suspeitar de outra coisa, peça a regulagem.',
  },
  {
    severity: 'OK',
    title: 'Painel digital pioneiro: problema de mostrador costuma ser conector, não a placa toda',
    body: 'O Tempra foi pioneiro no Brasil com painel de instrumentos digital. Falhas de exibição (segmentos apagados, piscando) geralmente têm origem em mau contato nos conectores traseiros do painel — vale checar isso antes de considerar a placa eletrônica traida como defeituosa.',
  },
]

const PROBLEMAS_G1: TipInput[] = []

const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Tempra 1991-1993 (2.0 8V carburetado)',
    body: '4.000 km — Troca de óleo do motor + filtro (donos experientes recomendam antecipar dos 5.000 km de fábrica). | 60.000 km/5 anos — Kit de correia dentada completo (correia + tensores + bomba d\'água), motor interferente. | 10.000 km — Regulagem do carburador Weber TLDZ. | 20.000 km — Fluido de freio.',
  },
]

// ---------- 1993-1996 (chegada do 16V, Turbo, perua SW importada) ----------
const MACETES_G2: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Correia dentada do 16V: cuidado com peça trocada de posição — o carro simplesmente não pega',
    body: 'Ao montar os componentes da correia dentada do motor 2.0 16V, existe erro conhecido de instalar peça na posição errada (aplicações trocadas) — resultado é o carro não dar partida. Some a isso o cuidado extra com a posição da roda fônica/sensor nos modelos 1993-1994, ponto que já causou dor de cabeça para mecânico desatento. Use manual específico do Tempra 16V e, se possível, oficina com experiência comprovada nesse motor.',
  },
  {
    severity: 'OK',
    title: 'Ao trocar a correia do 16V, aproveite para trocar a coroa do virabrequim e incluir rolamento tensor',
    body: 'Uma boa prática ao trocar o kit de correia dentada do 16V é trocar também a coroa do virabrequim e, em unidades que não vieram de fábrica com o rolamento tensor da correia, incluir esse item — prolonga bastante a vida útil da correia nova.',
  },
  {
    severity: 'WARN',
    title: 'Turbo: 61% do peso na dianteira causa sub-esterço em curva — ajuste o estilo de condução',
    body: 'A versão Turbo tem distribuição de peso de 61% no eixo dianteiro, o que causa tendência de sub-esterço (carro "empurrando" para fora da curva) em condução mais esportiva. Não é defeito mecânico — é característica de projeto. Pneus dianteiros em bom estado e alinhamento/geometria em dia ajudam bastante a atenuar o efeito.',
  },
  {
    severity: 'OK',
    title: 'Perua SW é importada da Itália — peça de lataria específica é mais rara que a do sedã',
    body: 'A Tempra SW veio pronta da Itália, diferente do sedã fabricado no Brasil. Peça de lataria e acabamento específica da perua (portas traseiras, vidros, tampa do porta-malas) é mais rara — vale procurar desmanches especializados em importados dos anos 1990 antes de recorrer à concessionária.',
  },
]

const PROBLEMAS_G2: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Turbo: motor 8V turbinado (Garrett T3), não o 16V — confirme antes de comprar peça',
    body: 'O Tempra Turbo usa o bloco 2.0 8V turbinado (Garrett T3, 165cv), não o 16V injetado. Peça de motor entre as duas versões não é intercambiável — confirme sempre qual motor sua unidade tem antes de orçar peça, principalmente em anúncios de unidades usadas que às vezes confundem as versões.',
  },
]

const MANUTENCAO_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Tempra 1993-1996 (16V, Turbo ou SW)',
    body: '4.000 km — Troca de óleo do motor + filtro (sintético recomendado no Turbo, por causa da temperatura do turbo). | 60.000 km/5 anos — Kit de correia dentada completo, incluindo coroa do virabrequim e rolamento tensor se ausente (16V). | Sempre — no Turbo, deixar o motor em marcha lenta 30-60s antes de desligar após uso intenso, para não prejudicar o turbocompressor. | 20.000 km — Alinhamento e balanceamento (mais importante no Turbo, por causa do peso dianteiro). | 20.000 km — Fluido de freio.',
  },
]

// ---------- 1996-1998/1999 (facelift final, SX/HLX/Turbo Stile, fim de linha) ----------
const MACETES_G3: TipInput[] = [
  {
    severity: 'OK',
    title: 'Facelift 1996 renomeou as versões (SX/HLX/Turbo Stile) — confirme o motor pelo nome certo',
    body: 'A partir do facelift de 1996, o 8V passou a se chamar SX, o 16V virou HLX e o turbo 4 portas ficou Turbo Stile. Ao pesquisar peça ou informação de outro dono, use esses nomes para achar conteúdo mais específico da sua versão.',
  },
  {
    severity: 'OK',
    title: 'Últimas unidades (1997-1999) tiveram produção de SW e Turbo já encerrada',
    body: 'A perua SW e a versão Turbo saíram de linha em 1997, um ano antes do fim da produção do sedã comum (outubro/1998, com estoque 1999 vendido depois). Se está procurando uma SW ou Turbo, as unidades mais novas datam de 1997 — não existe SW/Turbo ano-modelo 1998/1999.',
  },
]

const PROBLEMAS_G3: TipInput[] = []

const MANUTENCAO_G3: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Tempra 1996-1999 (SX 8V ou HLX 16V)',
    body: '4.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo. | 20.000 km — Fluido de freio e filtro de ar. | Anual — Inspeção de pontos de ferrugem e do chicote elétrico, dado o tempo de uso do veículo hoje.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Tempra', yearFrom: 1991, yearTo: 1998, tireSize: '175/70 R13 (SX/HLX) · 185/65 R14 (Turbo/Turbo Stile)', frontPsi: 28, rearPsi: 26, frontPsiLoad: 30, rearPsiLoad: 32, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta ou manual — Turbo com peso dianteiro maior pode pedir calibragem levemente diferente na dianteira.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Tempra', yearFrom: 1991, yearTo: 1993, component: 'Óleo do motor + filtro', intervalKm: 4000, intervalMonths: 6, notes: 'Antecipado em relação aos 5.000 km de fábrica.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Tempra', yearFrom: 1991, yearTo: 1993, component: 'Kit de correia dentada completo', intervalKm: 60000, intervalMonths: 60, notes: 'Motor interferente.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Tempra', yearFrom: 1991, yearTo: 1993, component: 'Regulagem do carburador Weber TLDZ', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'Tempra', yearFrom: 1991, yearTo: 1993, component: 'Fluido de freio', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'Tempra', yearFrom: 1993, yearTo: 1996, component: 'Óleo do motor + filtro', intervalKm: 4000, intervalMonths: 6, notes: 'Sintético recomendado no Turbo.', priority: 'CRITICAL', order: 4 },
  { modelName: 'Tempra', yearFrom: 1993, yearTo: 1996, component: 'Kit de correia dentada completo (16V: incluir coroa do virabrequim e rolamento tensor se ausente)', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 5 },
  { modelName: 'Tempra', yearFrom: 1993, yearTo: 1996, component: 'Alinhamento e balanceamento', intervalKm: 20000, intervalMonths: 12, notes: 'Mais importante no Turbo por causa do peso dianteiro (61%).', priority: 'MEDIUM', order: 6 },
  { modelName: 'Tempra', yearFrom: 1993, yearTo: 1996, component: 'Fluido de freio', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'Tempra', yearFrom: 1996, yearTo: 1999, component: 'Óleo do motor + filtro', intervalKm: 4000, intervalMonths: 6, notes: null, priority: 'CRITICAL', order: 8 },
  { modelName: 'Tempra', yearFrom: 1996, yearTo: 1999, component: 'Kit de correia dentada completo', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 9 },
  { modelName: 'Tempra', yearFrom: 1996, yearTo: 1999, component: 'Fluido de freio e filtro de ar', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 10 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Tempra', yearFrom: 1991, yearTo: 1993, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'Tempra', yearFrom: 1993, yearTo: 1996, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
  { modelName: 'Tempra', yearFrom: 1996, yearTo: 1999, MACETES: MACETES_G3, PROBLEMAS: PROBLEMAS_G3, MANUTENCAO: MANUTENCAO_G3 },
]

async function main() {
  console.log('🚗 Seed Fiat Tempra...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Fiat', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Fiat', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Tempra', brandId: brand.id } },
    update: {}, create: { name: 'Tempra', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Tempra' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Tempra' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Tempra' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Fiat Tempra concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
