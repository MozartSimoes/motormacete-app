/**
 * Seed Fiat Siena — macetes, problemas, manutenção e calibragem de pneus
 * Versão sedã 4 portas do Palio, lançada na Argentina no fim de 1996 e no
 * Brasil em agosto/1997 (EL 1.6 8V/16V, HL 16V de série), com produção
 * nacional a partir de 1999. Segue exatamente o histórico de
 * restilizações do Palio, sobre o MESMO chassi básico: 1º facelift em
 * 2000 (chegada do motor Fire 1.0/1.3, ainda sem flex), 2º facelift em
 * 2004 (linhas arredondadas, motor flex), Tetrafuel chegou em 2006
 * (único carro de produção do país a aceitar álcool, gasolina, nafta e
 * GNV), e facelift final (G4) no fim de 2007, com Dualogic opcional.
 * Mais de 1 milhão de unidades vendidas entre 1997 e 2013. Produção
 * encerrada por volta de 2016.
 * Execute: pnpm --filter @motormacete/database db:seed:fiat-siena
 *
 * Fontes: encontracarros.com.br, carrosdepartamentos.com,
 *         carrosnaweb.com.br, wikie.com.br, autossegredos.com.br,
 *         autolivraria.com.br, canaldapeca.com.br, oficinabrasil.com.br,
 *         noticiasautomotivas.com.br, carroclub.com.br,
 *         euemeutetrafuel.blogspot.com, gov.br/inmetro
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- 1997-2000 (lançamento, pré-Fire, sem flex) ----------
const MACETES_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesmo chassi do Palio — peça de suspensão/estrutura costuma ser intercambiável',
    body: 'O Siena é a versão sedã do Palio, construída sobre o mesmo chassi. Ao procurar peça de suspensão, freio ou estrutura, pesquisar também pelas referências do Palio da mesma época amplia bastante as opções de peça compatível e mais barata.',
  },
  {
    severity: 'OK',
    title: 'Motor 1.6 8V/16V (EL/HL) usa correia dentada — troca preventiva evita dano grave',
    body: 'O motor 1.6 dessa fase (8V ou 16V) usa correia dentada convencional, motor interferente. Respeitar o intervalo de troca do kit completo é a forma mais barata de evitar reparo grave de motor.',
  },
]

const PROBLEMAS_G1: TipInput[] = []

const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Siena 1997-2000 (1.6 8V/16V, EL/HL)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo (correia + tensores + bomba d\'água), motor interferente. | 20.000 km — Fluido de freio. | 20.000 km — Filtro de ar e filtro de cabine.',
  },
]

// ---------- 2000-2004 (1º facelift, chegada do motor Fire, ainda sem flex) ----------
const MACETES_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor Fire (1.0/1.3) é mais simples e barato de manter que o 1.6 anterior',
    body: 'A partir dessa fase o Fire (1.0 ou 1.3) passou a equipar as versões de entrada — motor mais leve, com peça mais barata e mão de obra mais simples que o antigo 1.6. Boa opção para quem prioriza custo de manutenção baixo.',
  },
  {
    severity: 'WARN',
    title: 'Bobina de ignição do motor Fire: perda de potência ou dificuldade de partida',
    body: 'Falha na bobina de ignição é um problema recorrente em diversos modelos com motor Fire, incluindo o Siena. Sintomas incluem perda de potência e dificuldade para dar partida — antes de suspeitar de algo mais caro (bomba de combustível, módulo de injeção), teste a bobina, é peça relativamente barata.',
  },
]

const PROBLEMAS_G2: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Correia da direção hidráulica pode quebrar antes dos 60.000 km programados',
    body: 'Há relatos de quebra da correia da direção hidráulica antes do intervalo programado de 60.000 km. Se notar a direção mais pesada de repente, verifique a correia imediatamente — não é só desconforto, é perda de assistência de direção.',
  },
  {
    severity: 'WARN',
    title: 'Ruído na suspensão costuma vir das bieletas da barra estabilizadora',
    body: 'Ruído de "batida" na suspensão dianteira em buracos/lombadas costuma ter origem nas bieletas da barra estabilizadora, item relativamente barato de trocar. Descarte esse item antes de investigar componentes mais caros.',
  },
]

const MANUTENCAO_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Siena 2000-2004 (Fire 1.0/1.3)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo (correia + tensores + bomba d\'água). | 40.000-50.000 km — Inspeção da correia da direção hidráulica, há relatos de quebra prematura. | 20.000 km — Inspeção das bieletas da suspensão dianteira. | 20.000 km — Fluido de freio e filtros de ar/cabine.',
  },
]

// ---------- 2004-2007 (2º facelift, flex, Tetrafuel a partir de 2006) ----------
const MACETES_G3: TipInput[] = [
  {
    severity: 'OK',
    title: 'Tetrafuel (a partir de 2006): filtro do sistema de GNV pode ser lavado com querosene',
    body: 'A versão Tetrafuel aceita álcool, gasolina, nafta (gasolina pura) e GNV. Um macete de manutenção é que o filtro do sistema de GNV pode ser lavado com querosene em vez de sempre trocado por um novo — reduz custo de manutenção desse sistema, que é exclusivo dessa versão.',
  },
  {
    severity: 'OK',
    title: 'Facelift 2004 trouxe linhas mais arredondadas — confirme o ano antes de comprar peça de lataria',
    body: 'A partir de 2004 o Siena seguiu a reestilização do Palio com linhas mais arredondadas. Peça de para-choque, capô e lanterna dessa fase não encaixa nas versões 1997-2004 — confirme o ano exato da sua unidade antes de comprar.',
  },
]

const PROBLEMAS_G3: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Tetrafuel: troca inesperada de modo de combustível ao abastecer gasolina',
    body: 'Alguns donos relatam que o sistema muda de modo de combustível de forma inesperada ao abastecer gasolina, fazendo o carro rodar de forma irregular como se estivesse no álcool. Se notar isso, procure a concessionária para verificar a calibração do sistema de gerenciamento de combustível — não é comportamento normal esperado.',
  },
  {
    severity: 'WARN',
    title: 'Tetrafuel: motor pode morrer em marcha lenta no modo GNV automático',
    body: 'Há relatos do motor morrer em marcha lenta quando operando no modo automático de GNV, embora nem sempre reproduzível. Se isso acontecer com frequência, vale checar a calibração da central de gerenciamento do kit de GNV antes de suspeitar de outro componente.',
  },
]

const MANUTENCAO_G3: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Siena 2004-2007 (Fire Flex 1.0/1.3/1.4, ou Tetrafuel)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo. | Periódico — Limpeza (não necessariamente troca) do filtro do sistema de GNV nas versões Tetrafuel, pode ser feita com querosene. | 40.000-50.000 km — Inspeção da correia da direção hidráulica. | 20.000 km — Fluido de freio e filtros de ar/cabine.',
  },
]

// ---------- 2007-2016 (facelift final G4, Dualogic opcional, recall combustível) ----------
const MACETES_G4: TipInput[] = [
  {
    severity: 'OK',
    title: 'Câmbio Dualogic: óleo troca a cada 120.000 km — não confunda com câmbio automático tradicional',
    body: 'O Dualogic não é câmbio automático hidráulico convencional — é um câmbio manual com atuador robotizado que faz o papel da embreagem e das trocas. O óleo tem intervalo de troca bem mais longo que câmbios automáticos comuns: 120.000 km, segundo especificação oficial. Tranco leve na marcha à ré ou na 1ª marcha em alguns exemplares é característica do sistema, não necessariamente defeito.',
  },
  {
    severity: 'OK',
    title: 'Embreagem trepidante com baixa quilometragem: verifique o volante bimassa antes de culpar o disco',
    body: 'Casos de embreagem trepidante exigindo troca com baixa km são relatados nessa fase. Antes de trocar só o kit de embreagem, peça para verificar o volante do motor (bimassa, se equipado) — trocar só o disco/platô com o volante desgastado faz o problema voltar rápido.',
  },
]

const PROBLEMAS_G4: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'RECALL — vazamento na mangueira de retorno de combustível (fabricação 2012-2017)',
    body: 'Recall real da Fiat que atinge Palio, Uno, Siena e Strada fabricados entre 2012 e 2017: a mangueira de retorno de combustível pode apresentar porosidade e vazamento, especialmente em temperaturas elevadas — risco de incêndio. Reparo gratuito em concessionária. Confira o chassi em www.fiat.com.br/recall ou pelo 0800 707 1000.',
  },
  {
    severity: 'WARN',
    title: 'Cilindro-mestre de freio é ponto de falha relatado — pedal fundo ou esponjoso não deve ser ignorado',
    body: 'Defeito no cilindro-mestre de freio é apontado como causa recorrente de problema de frenagem nessa geração. Pedal mais fundo que o normal ou sensação esponjosa merece diagnóstico imediato do sistema de freio, não só sangria.',
  },
]

const MANUTENCAO_G4: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Siena 2007-2016 (Fire Evo, Tetrafuel ou Dualogic)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo. | 120.000 km — Óleo do câmbio Dualogic (versões automatizadas) — intervalo bem mais longo que o de câmbios automáticos convencionais. | 40.000-50.000 km — Inspeção da correia da direção hidráulica. | 20.000 km — Fluido de freio, com atenção ao cilindro-mestre em caso de pedal fundo/esponjoso. | 20.000 km — Filtro de ar e filtro de cabine.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Siena', yearFrom: 1997, yearTo: 2000, tireSize: '175/70 R13 (referência)', frontPsi: 28, rearPsi: 26, frontPsiLoad: 30, rearPsiLoad: 32, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta ou manual do proprietário.' },
  { modelName: 'Siena', yearFrom: 2000, yearTo: 2007, tireSize: '175/70 R13 ou 175/65 R14 conforme versão', frontPsi: 28, rearPsi: 26, frontPsiLoad: 30, rearPsiLoad: 32, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta ou manual do proprietário.' },
  { modelName: 'Siena', yearFrom: 2007, yearTo: 2016, tireSize: '175/65 R14 ou 185/60 R15 (Essence/Sporting)', frontPsi: 30, rearPsi: 28, frontPsiLoad: 32, rearPsiLoad: 32, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — versão Sporting usa aro maior.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Siena', yearFrom: 1997, yearTo: 2000, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Válido para 1.6 8V/16V.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Siena', yearFrom: 1997, yearTo: 2000, component: 'Kit de correia dentada completo', intervalKm: 60000, intervalMonths: 60, notes: 'Motor interferente.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Siena', yearFrom: 1997, yearTo: 2000, component: 'Fluido de freio', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'Siena', yearFrom: 1997, yearTo: 2000, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'Siena', yearFrom: 2000, yearTo: 2004, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Válido para Fire 1.0/1.3.', priority: 'CRITICAL', order: 4 },
  { modelName: 'Siena', yearFrom: 2000, yearTo: 2004, component: 'Kit de correia dentada completo', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 5 },
  { modelName: 'Siena', yearFrom: 2000, yearTo: 2004, component: 'Inspeção da correia da direção hidráulica', intervalKm: 45000, intervalMonths: null, notes: 'Relatos de quebra antes dos 60.000 km programados.', priority: 'HIGH', order: 6 },
  { modelName: 'Siena', yearFrom: 2000, yearTo: 2004, component: 'Inspeção das bieletas da suspensão dianteira', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'Siena', yearFrom: 2000, yearTo: 2004, component: 'Fluido de freio e filtros de ar/cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 8 },
  { modelName: 'Siena', yearFrom: 2004, yearTo: 2007, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Válido para Fire Flex e Tetrafuel.', priority: 'CRITICAL', order: 9 },
  { modelName: 'Siena', yearFrom: 2004, yearTo: 2007, component: 'Kit de correia dentada completo', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 10 },
  { modelName: 'Siena', yearFrom: 2004, yearTo: 2007, component: 'Limpeza do filtro do sistema de GNV (Tetrafuel)', intervalKm: 20000, intervalMonths: null, notes: 'Pode ser lavado com querosene em vez de sempre trocado.', priority: 'LOW', order: 11 },
  { modelName: 'Siena', yearFrom: 2004, yearTo: 2007, component: 'Inspeção da correia da direção hidráulica', intervalKm: 45000, intervalMonths: null, notes: null, priority: 'HIGH', order: 12 },
  { modelName: 'Siena', yearFrom: 2004, yearTo: 2007, component: 'Fluido de freio e filtros de ar/cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 13 },
  { modelName: 'Siena', yearFrom: 2007, yearTo: 2016, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Válido para Fire Evo e Tetrafuel.', priority: 'CRITICAL', order: 14 },
  { modelName: 'Siena', yearFrom: 2007, yearTo: 2016, component: 'Kit de correia dentada completo', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 15 },
  { modelName: 'Siena', yearFrom: 2007, yearTo: 2016, component: 'Óleo do câmbio Dualogic (versões automatizadas)', intervalKm: 120000, intervalMonths: 60, notes: 'Intervalo oficial bem mais longo que câmbios automáticos convencionais.', priority: 'MEDIUM', order: 16 },
  { modelName: 'Siena', yearFrom: 2007, yearTo: 2016, component: 'Inspeção da correia da direção hidráulica', intervalKm: 45000, intervalMonths: null, notes: null, priority: 'HIGH', order: 17 },
  { modelName: 'Siena', yearFrom: 2007, yearTo: 2016, component: 'Fluido de freio (atenção ao cilindro-mestre)', intervalKm: 20000, intervalMonths: 24, notes: 'Pedal fundo/esponjoso merece diagnóstico imediato.', priority: 'HIGH', order: 18 },
  { modelName: 'Siena', yearFrom: 2007, yearTo: 2016, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 19 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Siena', yearFrom: 1997, yearTo: 2000, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'Siena', yearFrom: 2000, yearTo: 2004, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
  { modelName: 'Siena', yearFrom: 2004, yearTo: 2007, MACETES: MACETES_G3, PROBLEMAS: PROBLEMAS_G3, MANUTENCAO: MANUTENCAO_G3 },
  { modelName: 'Siena', yearFrom: 2007, yearTo: 2016, MACETES: MACETES_G4, PROBLEMAS: PROBLEMAS_G4, MANUTENCAO: MANUTENCAO_G4 },
]

async function main() {
  console.log('🚗 Seed Fiat Siena...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Fiat', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Fiat', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Siena', brandId: brand.id } },
    update: {}, create: { name: 'Siena', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Siena' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Siena' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo ?? 'atual'})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Siena' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Fiat Siena concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
