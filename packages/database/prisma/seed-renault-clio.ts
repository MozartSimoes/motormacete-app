/**
 * Seed Renault Clio — macetes, problemas, manutenção e calibragem de pneus
 * Um dos carros mais longevos do mercado brasileiro: 1ª geração chegou
 * importada da Argentina em 1996 (só sedã 4 portas, motor 1.6 8V 74cv,
 * versões RL/RT). A partir de 1999 passou a ser fabricado em São José dos
 * Pinhais (PR), com hatch 3p/5p e sedã 4p, motores 1.0 e 1.6 (8V depois
 * 16V, flex a partir de ~2003) — essa carroceria seguiu em produção,
 * atualizada, até o fim de 2012, quando ganhou a última reestilização
 * (para-choques, grade, capô, paralamas, retrovisores e tampa traseira
 * novos, mecânica idêntica) como "Clio 2013". Saiu de linha em
 * 2016/2017, substituído pelo Kwid. Compartilha motor e plataforma B0
 * com Logan/Sandero/Symbol da mesma época — muita peça é cruzada.
 * Execute: pnpm --filter @motormacete/database db:seed:renault-clio
 *
 * Fontes: renault.com.br/recall, icarros.com.br, autossegredos.com.br,
 *         carrosegaragem.com.br, flatout.com.br, reclameaqui.com.br,
 *         suaoficinaonline.com.br, autoo.com.br, omecanico.com.br,
 *         auto-doc.pt
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- 1996-1998 (1ª geração, importado da Argentina, só sedã) ----------
const MACETES_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Só existe em versão sedã 4 portas — importado da Argentina',
    body: 'A primeira geração do Clio vendida no Brasil (1996-1998) veio inteiramente importada da Argentina e só em versão sedã de 4 portas (RL/RT), com motor 1.6 8V de 74cv. Não existe hatch dessa geração no mercado brasileiro — se encontrar um "Clio hatch antigo" à venda como sendo 1996-1998, desconfie, pode ser adulteração ou erro de anúncio.',
  },
  {
    severity: 'OK',
    title: 'Peça de motor 1.6 8V dessa geração é mais rara — pesquise fornecedor especializado em Renault antigo',
    body: 'Por ser importado e ter produção curta no Brasil, peça original de motor e injeção dessa geração é mais difícil de achar em loja comum. Vale procurar desmanches e fornecedores especializados em Renault clássico antes de pagar caro em concessionária.',
  },
]

const PROBLEMAS_G1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Carro de importação com quase 30 anos — atenção redobrada a ferrugem e chicote elétrico',
    body: 'Como toda unidade importada da década de 1990 ainda em circulação, atenção a pontos de ferrugem estrutural (soleiras, assoalho, para-lamas) e a chicotes elétricos ressecados. Antes de comprar um exemplar dessa geração hoje, uma inspeção estrutural é mais importante do que os itens mecânicos comuns.',
  },
]

const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Clio 1996-1998 (1.6 8V)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo (correia + tensores + bomba d\'água) — motor interferente, não postergar. | Anual — Inspeção de pontos de ferrugem estrutural e do chicote elétrico, dado o tempo de uso do veículo. | 20.000 km — Fluido de freio.',
  },
]

// ---------- 1999-2012 (2ª geração pré-facelift, produzida no Brasil) ----------
const MACETES_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motores 1.0 16V e 1.6 16V usam correia dentada, não corrente — troca preventiva é essencial',
    body: 'Diferente de motores Renault mais recentes (como o 1.6 SCe do Captur/Kardian), os motores 1.0 e 1.6 16V dessa geração do Clio são movidos a correia dentada convencional, com motor interferente. Nunca ultrapasse o intervalo de troca do kit completo (correia + tensores + bomba d\'água) — é a causa mais comum de dano grave e evitável de motor nesse carro.',
  },
  {
    severity: 'OK',
    title: 'Perda de aceleração com o motor quente no 1.0 16V: antes de trocar módulo de injeção, limpe o corpo de borboleta',
    body: 'Falha de aceleração que aparece só depois do motor esquentar é queixa clássica do 1.0 16V. Na maioria dos casos o problema é sujeira no corpo de borboleta ou sensor de posição da borboleta/sonda lambda contaminado — itens baratos de limpar ou trocar. Só considere módulo de injeção (peça cara) depois de descartar essas causas mais simples.',
  },
  {
    severity: 'OK',
    title: 'Peça cruzada com Logan/Sandero/Symbol (mesma plataforma B0) — pesquise por essas referências também',
    body: 'O Clio dessa geração compartilha motor, suspensão e boa parte da mecânica com o Logan, Sandero e Symbol da mesma época. Ao procurar peça (amortecedor, terminal de direção, coxim de motor), pesquisar também pelo código dessas outras referências costuma abrir mais opções de peça compatível e mais barata.',
  },
  {
    severity: 'OK',
    title: 'Vidro elétrico com estalo ou travando na metade do curso — geralmente é o trilho, não o motor',
    body: 'Vidro elétrico dianteiro com estalo ao subir/descer ou parando na metade do curso costuma ser desgaste do trilho/guia plástico, não o motorzinho do vidro. Lubrificar e checar o trilho antes de trocar o conjunto do vidro elétrico inteiro evita gasto desnecessário.',
  },
]

const PROBLEMAS_G2: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'RECALL — trava de válvula do motor 1.0 16V (fabricação agosto/2012) — risco de imobilização e acidente',
    body: 'Recall oficial da Renault: unidades fabricadas em agosto de 2012, chassis BL641358 a BL722835, BL632563 a BL729368 e BJ662862 a BJ688005, têm risco de quebra das travas das válvulas de admissão/escape do motor 1.0 16V, podendo causar dano interno grave, imobilização do veículo e, em casos extremos, acidente. Reparo gratuito (substituição das travas de válvula). Confira o chassi em www.renault.com.br/recall ou pelo 0800 055 5615.',
  },
  {
    severity: 'WARN',
    title: 'O mesmo defeito de trava de válvula também atingiu Clio, Logan e Sandero 2010/2011 — consulte seu chassi',
    body: 'Segundo cobertura da imprensa especializada da época, uma campanha anterior (2013) já havia convocado cerca de 5.736 unidades de Clio 2010/2011 (2 e 4 portas), além de Logan e Sandero 2010, pelo mesmo tipo de falha na trava de válvula do motor 1.0 16V. Se seu Clio é desse período, vale confirmar diretamente no site da Renault ou pelo 0800 055 5615 se seu chassi específico consta em alguma dessas campanhas, mesmo que não bata com as faixas do recall de 2012.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão é ponto frágil: folga em axiais e bieletas costuma aparecer a partir de 40.000 km',
    body: 'A suspensão do Clio é considerada frágil nessa geração, com folga em terminais axiais e bieletas de estabilizadora aparecendo com frequência a partir de 40 mil km rodados. Ruído em buraco ou lombada não deve ser ignorado — inspecionar esses itens evita desgaste em cadeia de outros componentes da suspensão.',
  },
  {
    severity: 'WARN',
    title: 'Problemas elétricos recorrentes: vidro, trava, ar-condicionado',
    body: 'Queixas frequentes incluem vidro elétrico com defeito, botão de trava elétrica com problema, travas não funcionando e ar-condicionado que não gela. Boa parte dos casos tem origem em conector oxidado ou fusível/relé, não necessariamente no componente principal — vale checar isso primeiro.',
  },
]

const MANUTENCAO_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Clio 1999-2012 (1.0 ou 1.6, 8V/16V)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo (correia + tensores + bomba d\'água) — motor interferente, item mais crítico do modelo. | 10.000 km — Limpeza do corpo de borboleta (motor 1.0 16V), reduz risco da falha clássica de perda de aceleração a quente. | 20.000 km — Inspeção de terminais axiais e bieletas da suspensão dianteira. | 20.000 km — Filtro de ar e filtro de cabine (se equipado). | 40.000 km — Fluido de freio.',
  },
]

// ---------- 2013-2016 (facelift final, mesma mecânica) ----------
const MACETES_G3: TipInput[] = [
  {
    severity: 'OK',
    title: 'Facelift 2013 mudou só a lataria — mecânica e problemas do 1.0/1.6 16V continuam os mesmos',
    body: 'A reestilização de 2013 trocou para-choques, grade, capô, paralamas, retrovisores e tampa traseira, mas manteve a mecânica idêntica à geração anterior (desde 1999). Todo o histórico de correia dentada, perda de aceleração do 1.0 16V a quente e suspensão frágil se aplica igualmente a este facelift.',
  },
  {
    severity: 'OK',
    title: 'Últimas unidades (GetUp, Tech Run) foram edições especiais de fim de linha — mesma peça mecânica das demais',
    body: 'Versões como GetUp e Tech Run foram edições especiais de equipamento/visual no fim da produção do Clio no Brasil, sem mudança de motor ou plataforma. Não pague a mais em peça mecânica achando que é diferente — motor, câmbio e suspensão são os mesmos das outras versões do período.',
  },
]

const PROBLEMAS_G3: TipInput[] = [
  {
    severity: 'OK',
    title: 'Herdou o mesmo defeito de trava de válvula do 1.0 16V das gerações anteriores — confira o chassi',
    body: 'Como a mecânica não mudou no facelift de 2013, vale a mesma recomendação: confirme diretamente com a Renault (site ou 0800 055 5615) se o chassi da sua unidade consta em alguma campanha de recall relacionada à trava de válvula do motor 1.0 16V, mesmo comprando um Clio já do período final de produção.',
  },
]

const MANUTENCAO_G3: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Clio 2013-2016 (facelift, 1.0 ou 1.6 16V)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo (correia + tensores + bomba d\'água). | 10.000 km — Limpeza do corpo de borboleta (motor 1.0 16V). | 20.000 km — Inspeção de terminais axiais e bieletas da suspensão dianteira. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Clio', yearFrom: 1996, yearTo: 1998, tireSize: '175/70 R13 (referência)', frontPsi: 28, rearPsi: 26, frontPsiLoad: 30, rearPsiLoad: 32, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta ou manual do proprietário.' },
  { modelName: 'Clio', yearFrom: 1999, yearTo: 2012, tireSize: '175/70 R13 ou 185/60 R14 conforme versão', frontPsi: 28, rearPsi: 26, frontPsiLoad: 30, rearPsiLoad: 32, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta ou manual — aro e medida variam entre versões de entrada e topo de linha.' },
  { modelName: 'Clio', yearFrom: 2013, yearTo: 2016, tireSize: '185/60 R14 ou 185/55 R15 conforme versão', frontPsi: 28, rearPsi: 26, frontPsiLoad: 30, rearPsiLoad: 32, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta ou manual — GetUp/Tech Run podem ter aro diferente das versões comuns.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Clio', yearFrom: 1996, yearTo: 1998, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Clio', yearFrom: 1996, yearTo: 1998, component: 'Kit de correia dentada completo (correia + tensores + bomba d\'água)', intervalKm: 60000, intervalMonths: 60, notes: 'Motor 1.6 8V interferente.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Clio', yearFrom: 1996, yearTo: 1998, component: 'Fluido de freio', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'Clio', yearFrom: 1999, yearTo: 2012, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Válido para 1.0 e 1.6, 8V ou 16V.', priority: 'CRITICAL', order: 3 },
  { modelName: 'Clio', yearFrom: 1999, yearTo: 2012, component: 'Kit de correia dentada completo (correia + tensores + bomba d\'água)', intervalKm: 60000, intervalMonths: 60, notes: 'Motor interferente — não postergar.', priority: 'CRITICAL', order: 4 },
  { modelName: 'Clio', yearFrom: 1999, yearTo: 2012, component: 'Limpeza do corpo de borboleta (motor 1.0 16V)', intervalKm: 10000, intervalMonths: 12, notes: 'Reduz risco da falha clássica de perda de aceleração a quente.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Clio', yearFrom: 1999, yearTo: 2012, component: 'Inspeção de terminais axiais e bieletas da suspensão dianteira', intervalKm: 20000, intervalMonths: null, notes: 'Ponto frágil recorrente a partir de 40.000 km.', priority: 'HIGH', order: 6 },
  { modelName: 'Clio', yearFrom: 1999, yearTo: 2012, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'Clio', yearFrom: 1999, yearTo: 2012, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'Clio', yearFrom: 2013, yearTo: 2016, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Válido para 1.0 e 1.6 16V.', priority: 'CRITICAL', order: 9 },
  { modelName: 'Clio', yearFrom: 2013, yearTo: 2016, component: 'Kit de correia dentada completo (correia + tensores + bomba d\'água)', intervalKm: 60000, intervalMonths: 60, notes: 'Motor interferente — não postergar.', priority: 'CRITICAL', order: 10 },
  { modelName: 'Clio', yearFrom: 2013, yearTo: 2016, component: 'Limpeza do corpo de borboleta (motor 1.0 16V)', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 11 },
  { modelName: 'Clio', yearFrom: 2013, yearTo: 2016, component: 'Inspeção de terminais axiais e bieletas da suspensão dianteira', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'HIGH', order: 12 },
  { modelName: 'Clio', yearFrom: 2013, yearTo: 2016, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 13 },
  { modelName: 'Clio', yearFrom: 2013, yearTo: 2016, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 14 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Clio', yearFrom: 1996, yearTo: 1998, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'Clio', yearFrom: 1999, yearTo: 2012, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
  { modelName: 'Clio', yearFrom: 2013, yearTo: 2016, MACETES: MACETES_G3, PROBLEMAS: PROBLEMAS_G3, MANUTENCAO: MANUTENCAO_G3 },
]

async function main() {
  console.log('🚗 Seed Renault Clio...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Renault', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Renault', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Clio', brandId: brand.id } },
    update: {}, create: { name: 'Clio', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Clio' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Clio' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo ?? 'atual'})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Clio' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Renault Clio concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
