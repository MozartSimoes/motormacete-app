/**
 * Seed Fiat Uno — macetes, problemas, manutenção e calibragem de pneus
 * Lançado no Brasil em agosto/1984 (design Giugiaro), foi o primeiro
 * carro nacional com motor 1.0 (1990) e teve versão Turbo injetada em
 * 1994. Com a chegada do Palio em 1996, o Uno virou o carro de entrada
 * da Fiat; o motor Fire chegou em 2001. O Uno "antigo" (Mk1) seguiu
 * sendo vendido como opção econômica ("Uno Mille") em paralelo ao "Novo
 * Uno" — plataforma totalmente nova lançada em maio/2010 — até por volta
 * de 2013. O Novo Uno teve facelift em 2014, câmbio automatizado
 * Dualogic opcional, e encerrou produção em 2021 com a edição de
 * despedida "Uno Ciao", somando 4.379.356 unidades produzidas desde 1984.
 * Supersede o conteúdo antigo e resumido do seed.ts legado.
 * Execute: pnpm --filter @motormacete/database db:seed:fiat-uno
 *
 * Fontes: napista.com.br, media.stellantis.com, autopapo.com.br,
 *         en.wikipedia.org, fiattecar.com.br, turbonoticias.com.br,
 *         canaldapeca.com.br, oficinassp.com.br, autoxp.com.br,
 *         omecanico.com.br, suaoficinaonline.com.br,
 *         autos.culturamix.com, autossegredos.com.br,
 *         servicos.fiat.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- 1984-2000 (Uno original, carburado/injeção antiga, Turbo 1994, entrada após Palio 1996) ----------
const MACETES_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 1.0/1.3/1.5 (pré-Fire) é simples e barato — peça abundante mesmo hoje',
    body: 'Por ter vendido milhões de unidades, peça mecânica desse Uno original continua fácil de achar e barata, mesmo décadas depois. Isso torna a manutenção básica bem acessível comparada a carros mais raros da mesma época.',
  },
  {
    severity: 'WARN',
    title: 'Dificuldade de partida/carro morrendo: verifique o aterramento da bomba de combustível antes de trocar peça cara',
    body: 'Demora para pegar e dificuldade para o motor continuar ligado é queixa clássica desse Uno, geralmente causada por oxidação no terminal de aterramento da bomba de combustível — não pela bomba em si. Limpar e refazer esse aterramento resolve boa parte dos casos, por uma fração do custo de trocar a bomba.',
  },
  {
    severity: 'OK',
    title: 'Uno Turbo (1994, 1.4 i.e.) usa motor injetado exclusivo — confirme antes de comprar peça',
    body: 'O Turbo 2 portas de 1994 usa o motor 1.4 com injeção eletrônica, diferente dos motores carburados das versões comuns da época. Peça de motor e injeção não é intercambiável com o resto da linha — confirme sempre a versão antes de orçar.',
  },
]

const PROBLEMAS_G1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Motor falhando ou morrendo: bobina de ignição é suspeita mais comum',
    body: 'Motor com dificuldade para acelerar ou que morre com frequência tem a bobina de ignição como principal causa relatada. É peça relativamente barata — vale testar antes de suspeitar de carburador ou injeção.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de arrefecimento: mangueiras, radiador, válvula termostática ou bomba d\'água',
    body: 'Vazamento do líquido de arrefecimento pode vir de várias origens: mangueiras e conexões, radiador, válvula termostática, tampa do reservatório ou a própria bomba d\'água (rotor interno desgasta com o tempo e para de bombear). Ao notar perda de líquido, cheque esses pontos em sequência antes de trocar o radiador inteiro.',
  },
]

const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Uno 1984-2000 (1.0/1.3/1.5 ou Turbo 1.4 i.e.)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo (correia + tensores + bomba d\'água) — troque a bomba d\'água junto, mesmo que ainda pareça boa. | 30.000 km — Limpeza do carburador (versões carburadas), etanol de baixa qualidade entope o sistema. | 20.000 km — Fluido de freio.',
  },
]

// ---------- 2001-2013 (motor Fire, flex, Uno Mille segue em paralelo ao Novo Uno) ----------
const MACETES_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 1.0 Fire é um dos mais confiáveis já feitos no Brasil — bem cuidado, passa de 300.000 km',
    body: 'O motor 1.0 Fire (carburado ou injetado) tem fama merecida de robustez. Com manutenção básica em dia (óleo, correia, filtros), é comum passar dos 300.000 km sem problema grave de motor.',
  },
  {
    severity: 'WARN',
    title: 'Cabo de embreagem: mantenha um reserva, é barato e a troca é simples',
    body: 'O cabo de embreagem tem vida útil curta em uso urbano intenso (parar e arrancar o tempo todo). Como é peça barata (R$ 50-80) e de troca simples, vale ter um cabo reserva no porta-luvas — ficar parado na rua por causa disso é evitável.',
  },
]

const PROBLEMAS_G2: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'RECALL — vazamento na mangueira de retorno de combustível (fabricação 2012-2017)',
    body: 'Recall real da Fiat que atinge Palio, Uno, Siena e Strada fabricados entre 2012 e 2017: a mangueira de retorno de combustível pode apresentar porosidade e vazamento, especialmente em temperaturas elevadas — risco de incêndio. Reparo gratuito em concessionária. Confira o chassi em www.fiat.com.br/recall ou pelo 0800 707 1000.',
  },
  {
    severity: 'WARN',
    title: 'Bomba d\'água costuma vazar depois de 80.000 km',
    body: 'A bomba d\'água original costuma apresentar vazamento após 80 mil km. Trocá-la preventivamente junto com o kit de correia dentada (R$ 200-350 a mais) evita ficar na mão com o carro superaquecendo.',
  },
  {
    severity: 'WARN',
    title: 'Buchas da suspensão dianteira (MacPherson) desgastam rápido em uso urbano com buracos',
    body: 'Barulho seco ao passar por irregularidade costuma ser as buchas da suspensão dianteira desgastadas — item relativamente barato de trocar, mas que se negligenciado acelera o desgaste de outros componentes da suspensão.',
  },
]

const MANUTENCAO_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Uno 2001-2013 (Fire 1.0/1.3, carburado ou flex)',
    body: '10.000 km — Troca de óleo do motor + filtro (5W30 ou 10W30, sintético prolonga a vida). | 60.000 km/5 anos — Kit de correia dentada completo, incluindo bomba d\'água preventivamente. | 20.000 km — Inspeção do cabo de embreagem e das buchas da suspensão dianteira. | 20.000 km — Fluido de freio e filtro de ar.',
  },
]

// ---------- 2010-2021 (Novo Uno, plataforma nova, facelift 2014, fim de linha 2021) ----------
const MACETES_G3: TipInput[] = [
  {
    severity: 'OK',
    title: 'Comprando usado: prefira câmbio manual ao Dualogic se possível',
    body: 'O câmbio automatizado Dualogic tem histórico de atuador robotizado ressecando/vazando óleo, o que causa trancos fortes, luz de avaria no câmbio, "N" piscando no painel e, no pior caso, recusa em engatar marcha. O reparo do sistema é caro (pode passar de R$ 5.000). Se o orçamento permite escolher, a versão manual evita esse risco inteiramente.',
  },
  {
    severity: 'OK',
    title: 'Ruído interno é praticamente universal no Novo Uno — não é sinal de problema mecânico',
    body: 'Reclamação de barulho no interior é praticamente unânime entre donos do Novo Uno — o carro é naturalmente "barulhento" por dentro mesmo sem nenhum defeito real. Antes de gastar tempo/dinheiro caçando "o ruído", saiba que uma parcela é característica do próprio carro.',
  },
]

const PROBLEMAS_G3: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'RECALL — inflador do airbag Takata (fabricação 2013-2014 e 2016-2017)',
    body: 'Recall real da Fiat: unidades do Uno de 2013/2014 e 2016/2017 têm inflador de airbag Takata sujeito a degradação por exposição a alta temperatura e umidade, podendo romper de forma descontrolada em uma colisão e lançar fragmentos metálicos nos ocupantes. Reparo gratuito. Confira o chassi em www.fiat.com.br/recall ou pelo 0800 707 1000 — não adie essa verificação.',
  },
  {
    severity: 'DANGER',
    title: 'RECALL — bomba de combustível motor Firefly (fabricação 2016-2017) — risco do motor morrer em movimento',
    body: 'Recall real da Fiat para o Uno com motores Firefly 1.0 e 1.3, anos-modelo 2016/2017: mau funcionamento do mecanismo da bomba de combustível pode causar o motor morrer em movimento, com risco de acidente. Reparo gratuito. Confira o chassi em www.fiat.com.br/recall ou pelo 0800 707 1000.',
  },
  {
    severity: 'WARN',
    title: 'Carcaça da válvula termostática (motor Fire Evo) trinca e vaza com frequência',
    body: 'A carcaça plástica da válvula termostática dos motores Fire Evo é ponto fraco conhecido, com tendência a trincar e vazar líquido de arrefecimento. Perda de líquido sem vazamento visível óbvio embaixo do carro? Verifique esse componente primeiro.',
  },
  {
    severity: 'WARN',
    title: 'Ruído persistente na suspensão dianteira é queixa recorrente',
    body: 'Ruído na suspensão dianteira que não desaparece mesmo após trocar buchas costuma exigir inspeção de coxins e terminais também — é queixa recorrente nessa geração, às vezes exigindo mais de uma peça para eliminar de vez.',
  },
]

const MANUTENCAO_G3: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Novo Uno 2010-2021 (Fire Evo ou Firefly)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo (motores Fire Evo/Firefly com correia). | 40.000 km — Fluido do câmbio Dualogic (versões automatizadas) — não estenda o intervalo, é o item mais caro de negligenciar nesse carro. | 20.000 km — Verificação da carcaça da válvula termostática e do líquido de arrefecimento. | 20.000 km — Fluido de freio e filtro de ar/cabine.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Uno', yearFrom: 1984, yearTo: 2000, tireSize: '145/70 R13 ou 155/70 R13 (referência)', frontPsi: 28, rearPsi: 26, frontPsiLoad: 30, rearPsiLoad: 32, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta ou manual do proprietário.' },
  { modelName: 'Uno', yearFrom: 2001, yearTo: 2013, tireSize: '155/70 R13 ou 165/70 R13', frontPsi: 29, rearPsi: 27, frontPsiLoad: 32, rearPsiLoad: 33, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta ou manual do proprietário.' },
  { modelName: 'Uno', yearFrom: 2010, yearTo: 2021, tireSize: '175/70 R13 ou 175/65 R14 (Sporting)', frontPsi: 29, rearPsi: 27, frontPsiLoad: 32, rearPsiLoad: 33, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — versão Sporting usa aro maior.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Uno', yearFrom: 1984, yearTo: 2000, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Uno', yearFrom: 1984, yearTo: 2000, component: 'Kit de correia dentada completo (com bomba d\'água)', intervalKm: 60000, intervalMonths: 60, notes: 'Motor interferente.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Uno', yearFrom: 1984, yearTo: 2000, component: 'Limpeza do carburador (versões carburadas)', intervalKm: 30000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'Uno', yearFrom: 1984, yearTo: 2000, component: 'Fluido de freio', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'Uno', yearFrom: 2001, yearTo: 2013, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Motor Fire 1.0/1.3.', priority: 'CRITICAL', order: 4 },
  { modelName: 'Uno', yearFrom: 2001, yearTo: 2013, component: 'Kit de correia dentada completo (com bomba d\'água preventiva)', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 5 },
  { modelName: 'Uno', yearFrom: 2001, yearTo: 2013, component: 'Inspeção do cabo de embreagem', intervalKm: 20000, intervalMonths: null, notes: 'Item barato, mantenha reserva.', priority: 'LOW', order: 6 },
  { modelName: 'Uno', yearFrom: 2001, yearTo: 2013, component: 'Inspeção das buchas da suspensão dianteira', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'Uno', yearFrom: 2001, yearTo: 2013, component: 'Fluido de freio e filtro de ar', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 8 },
  { modelName: 'Uno', yearFrom: 2010, yearTo: 2021, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Motor Fire Evo ou Firefly.', priority: 'CRITICAL', order: 9 },
  { modelName: 'Uno', yearFrom: 2010, yearTo: 2021, component: 'Kit de correia dentada completo', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 10 },
  { modelName: 'Uno', yearFrom: 2010, yearTo: 2021, component: 'Fluido do câmbio Dualogic (versões automatizadas)', intervalKm: 40000, intervalMonths: 24, notes: 'Não estenda o intervalo — item mais caro de negligenciar.', priority: 'HIGH', order: 11 },
  { modelName: 'Uno', yearFrom: 2010, yearTo: 2021, component: 'Verificação da carcaça da válvula termostática', intervalKm: 20000, intervalMonths: 24, notes: 'Ponto fraco conhecido do Fire Evo — trinca e vaza.', priority: 'MEDIUM', order: 12 },
  { modelName: 'Uno', yearFrom: 2010, yearTo: 2021, component: 'Fluido de freio e filtro de ar/cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 13 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Uno', yearFrom: 1984, yearTo: 2000, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'Uno', yearFrom: 2001, yearTo: 2013, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
  { modelName: 'Uno', yearFrom: 2010, yearTo: 2021, MACETES: MACETES_G3, PROBLEMAS: PROBLEMAS_G3, MANUTENCAO: MANUTENCAO_G3 },
]

async function main() {
  console.log('🚗 Seed Fiat Uno...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Fiat', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Fiat', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Uno', brandId: brand.id } },
    update: {}, create: { name: 'Uno', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Uno' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Uno' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo ?? 'atual'})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Uno' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Fiat Uno concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
