/**
 * Seed Volkswagen Bora — macetes, problemas, manutenção e calibragem
 * Sedã médio importado do México (planta de Puebla), versão sedã do Golf
 * Mk4 (plataforma PQ34/A4). Vendido no Brasil entre dezembro de 2000 (linha
 * 2001) e o fim de 2010 (~18 mil unidades no total). Sempre com motor 2.0 8v
 * (116 cv gasolina) — o Brasil não recebeu as versões 1.8/1.8 Turbo/VR6 2.8
 * vendidas em outros mercados. Duas fases: lançamento (2001-2006, câmbio
 * manual 5 marchas ou automático convencional 4 marchas) e reestilização
 * (2007-2011, novos faróis/grade, câmbio automático Tiptronic de 6 marchas;
 * virou flex em 2009, um ano antes do fim da importação). Sucedido pelo
 * Jetta (que usa o nome "Bora" em seu mercado de origem, o México) a partir
 * de 2006, período em que os dois conviveram na linha VW Brasil.
 * Execute: pnpm --filter @motormacete/database db:seed:vw-bora
 *
 * Fontes: autopapo.com.br, canaltech.com.br, car.blog.br, icarros.com.br,
 *         mobiauto.com.br, opinautos.com (Bora/Jetta A4 México, mesma
 *         plataforma), rodasdeligaleve.com.br, parallelum.com.br/fipe
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- LANÇAMENTO (2001-2006) — 2.0 8v, manual ou automático 4 marchas ----------

const MACETES_LANCAMENTO: TipInput[] = [
  { severity: 'OK', title: 'Sedã do Golf Mk4, importado do México — mesma mecânica da plataforma PQ34', body: 'O Bora é a versão sedã do Golf de quarta geração, montado na fábrica da Volkswagen em Puebla, no México, e importado para o Brasil. Peças de motor, suspensão e elétrica costumam ter equivalente no Golf IV nacional/importado da mesma época — útil quando a peça específica do Bora não está disponível.', },
  { severity: 'OK', title: 'Único motor no Brasil: 2.0 8v gasolina (116 cv) — não confundir com versões de outros países', body: 'Diferente de outros mercados (México, Europa), o Bora vendido no Brasil sempre usou o motor 2.0 8v a gasolina. Versões 1.8, 1.8 Turbo e V6 2.8 VR6 existiram lá fora, mas não foram trazidas oficialmente ao Brasil — desconfie de anúncio ou peça catalogada com essas motorizações para unidade nacional.', },
  { severity: 'OK', title: 'A partir de 2002, vendido só na versão mais completa (dual airbag, ar digital)', body: 'Nos primeiros anos o Bora teve duas configurações; a partir de 2002 passou a ser oferecido apenas na versão mais completa, já com airbag duplo e ar-condicionado digital de série — útil para situar o nível de equipamento esperado em unidades 2002 em diante.', },
]

const PROBLEMAS_LANCAMENTO: TipInput[] = [
  { severity: 'WARN', title: 'Falhas de bobina de ignição são o problema elétrico mais relatado por donos', body: 'Falha de bobina, queima de bobina e falta de faísca aparecem com frequência em relatos de proprietários. Motor falhando, marcha lenta irregular ou perda de força em rotações específicas são sinais de alerta — teste as bobinas antes de investir em peças mais caras do sistema de injeção.', },
  { severity: 'WARN', title: 'Correia dentada — motor 2.0 8v é interferente, kit completo é obrigatório', body: 'O motor 2.0 8v é do tipo interferente: se a correia dentada arrebentar, válvulas e pistões podem colidir e destruir o motor. Nunca troque só a correia — peça sempre o kit completo (correia + tensores + bomba d\'água) dentro do intervalo recomendado, mesmo que o carro pareça estar rodando bem.', },
  { severity: 'WARN', title: 'Bomba de combustível e filtro — desempenho cai antes de o carro "morrer" de vez', body: 'Falhas na bomba de combustível são um dos defeitos mais comuns relatados nessa geração. Perda de potência em subida, engasgo em aceleração forte ou dificuldade para pegar são sintomas iniciais — manutenção preventiva do filtro de combustível ajuda a evitar a falha total da bomba.', },
]

const MANUTENCAO_LANCAMENTO: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Bora lançamento (2001-2006, 2.0 8v manual/automático)', body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo (correia + tensores + bomba d\'água) — motor é interferente, não postergar. | 20.000-30.000 km — Inspeção e troca preventiva das bobinas de ignição em caso de falha/marcha lenta irregular. | Trocar filtro de combustível periodicamente para preservar a bomba. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento.', },
]

// ---------- REESTILIZAÇÃO (2007-2011) — novo visual, Tiptronic 6 marchas, flex a partir de 2009 ----------

const MACETES_REESTILIZACAO: TipInput[] = [
  { severity: 'OK', title: 'Reestilização de 2007: novos faróis, grade e câmbio Tiptronic de 6 marchas', body: 'Em 2007 o Bora recebeu a primeira reestilização real desde o lançamento: faróis circulares duplos, nova grade central e, na versão automática, a troca do câmbio de 4 para o Tiptronic de 6 marchas — mais ágil e econômico. Confirme o ano exato ao procurar peça de acabamento dianteiro/traseiro, pois muda em relação à fase 2001-2006.', },
  { severity: 'OK', title: 'Virou flex em 2009, no penúltimo ano antes do fim da importação', body: 'A partir de 2009 o Bora passou a ser vendido também em versão flex (gasolina/etanol), um ano antes do fim da importação para o Brasil, no final de 2010. Ao avaliar uma unidade 2009-2010, confirme no manual/etiqueta se é a versão flex ou ainda gasolina pura antes de calcular consumo esperado.', },
  { severity: 'OK', title: 'Fim da importação em 2010: peças ficam mais escassas com o tempo', body: 'Como o Bora nunca foi fabricado no Brasil e a importação parou em 2010, a disponibilidade de peças originais tende a cair ao longo dos anos. Vale já mapear fornecedores de peças compatíveis do Golf/Jetta Mk4 mexicano/europeu e guardar contato de oficinas especializadas em importados VW da época.', },
]

const PROBLEMAS_REESTILIZACAO: TipInput[] = [
  { severity: 'WARN', title: 'Câmbio Tiptronic de 6 marchas: trocas bruscas e falha ao engatar são queixas recorrentes', body: 'Proprietários relatam trocas de marcha bruscas com o motor quente (funcionando normal a frio, indicativo de solenoide/corpo de válvulas), falha ao entrar em marchas específicas e, em casos mais graves, modo de proteção que trava a transmissão em uma marcha. Ruído ou tranco atípico na troca merece diagnóstico com equipamento de scanner antes de rodar mais.', },
  { severity: 'WARN', title: 'Herdados da fase anterior: bobinas de ignição e bomba de combustível seguem como pontos de atenção', body: 'Os mesmos problemas documentados na fase 2001-2006 — falha de bobina de ignição e desgaste da bomba de combustível — continuam aparecendo em relatos de donos da fase reestilizada, já que o motor 2.0 8v segue essencialmente o mesmo.', },
  { severity: 'WARN', title: 'Correia dentada continua obrigatória: motor 2.0 8v não mudou de característica', body: 'A reestilização de 2007 foi de carroceria e câmbio, não de motor — o 2.0 8v continua interferente. Mantenha o kit completo de correia dentada dentro do intervalo, independentemente do ano da unidade.', },
]

const MANUTENCAO_REESTILIZACAO: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Bora reestilizado (2007-2011, 2.0 8v/2.0 Flex, Tiptronic 6 marchas)', body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo — motor é interferente. | Se notar troca brusca do câmbio Tiptronic com o motor quente, levar para diagnóstico com scanner antes que piore. | 20.000-30.000 km — Inspeção das bobinas de ignição em caso de falha/marcha lenta irregular. | Trocar filtro de combustível periodicamente. | 40.000 km — Fluido de freio DOT 4. | 60.000-80.000 km — Óleo do câmbio automático Tiptronic.', },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Bora', yearFrom: 2001, yearTo: 2006, tireSize: '195/65 R15 (aro 15) · 205/55 R16 (aro 16, versões de topo)', frontPsi: 30, rearPsi: 30, frontPsiLoad: 32, rearPsiLoad: 35, sparePsi: 60, notes: 'Valor de referência para carro dessa idade — confirme sempre na etiqueta da coluna da porta do motorista ou no manual do proprietário.', },
  { modelName: 'Bora', yearFrom: 2007, yearTo: 2011, tireSize: '195/65 R15 (aro 15) · 205/55 R16 (aro 16, versões de topo)', frontPsi: 30, rearPsi: 30, frontPsiLoad: 32, rearPsiLoad: 35, sparePsi: 60, notes: 'Valor de referência para carro dessa idade — confirme sempre na etiqueta da coluna da porta do motorista ou no manual do proprietário.', },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Bora', yearFrom: 2001, yearTo: 2006, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 2.0 8v.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Bora', yearFrom: 2001, yearTo: 2006, component: 'Kit de correia dentada completo (correia + tensores + bomba d\'água)', intervalKm: 60000, intervalMonths: 60, notes: 'Motor interferente — não postergar.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Bora', yearFrom: 2001, yearTo: 2006, component: 'Inspeção das bobinas de ignição', intervalKm: 30000, intervalMonths: null, notes: 'Falha elétrica mais relatada por donos dessa geração.', priority: 'HIGH', order: 2 },
  { modelName: 'Bora', yearFrom: 2001, yearTo: 2006, component: 'Filtro de combustível', intervalKm: 20000, intervalMonths: 24, notes: 'Ajuda a preservar a bomba de combustível.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Bora', yearFrom: 2001, yearTo: 2006, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'Bora', yearFrom: 2001, yearTo: 2006, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'MEDIUM', order: 5 },

  { modelName: 'Bora', yearFrom: 2007, yearTo: 2011, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 2.0 8v/2.0 Flex.', priority: 'CRITICAL', order: 6 },
  { modelName: 'Bora', yearFrom: 2007, yearTo: 2011, component: 'Kit de correia dentada completo', intervalKm: 60000, intervalMonths: 60, notes: 'Motor interferente — não postergar.', priority: 'CRITICAL', order: 7 },
  { modelName: 'Bora', yearFrom: 2007, yearTo: 2011, component: 'Óleo do câmbio automático Tiptronic', intervalKm: 60000, intervalMonths: 48, notes: 'Antecipe se notar troca brusca com o motor quente.', priority: 'HIGH', order: 8 },
  { modelName: 'Bora', yearFrom: 2007, yearTo: 2011, component: 'Inspeção das bobinas de ignição', intervalKm: 30000, intervalMonths: null, notes: 'Falha herdada da fase anterior.', priority: 'HIGH', order: 9 },
  { modelName: 'Bora', yearFrom: 2007, yearTo: 2011, component: 'Filtro de combustível', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 10 },
  { modelName: 'Bora', yearFrom: 2007, yearTo: 2011, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 11 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Bora', yearFrom: 2001, yearTo: 2006, MACETES: MACETES_LANCAMENTO, PROBLEMAS: PROBLEMAS_LANCAMENTO, MANUTENCAO: MANUTENCAO_LANCAMENTO },
  { modelName: 'Bora', yearFrom: 2007, yearTo: 2011, MACETES: MACETES_REESTILIZACAO, PROBLEMAS: PROBLEMAS_REESTILIZACAO, MANUTENCAO: MANUTENCAO_REESTILIZACAO },
]

async function main() {
  console.log('🚗 Seed Volkswagen Bora...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volkswagen', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volkswagen', vehicleTypeId: carroType.id },
  })

  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Bora', brandId: brand.id } },
    update: {},
    create: { name: 'Bora', brandId: brand.id },
  })

  // Delete once (não por bloco) — múltiplos blocos usam o mesmo modelName 'Bora'
  await prisma.tip.deleteMany({ where: { modelName: 'Bora' } })

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
    console.log(`  ✅ Bora (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }

  await prisma.tirePressure.deleteMany({ where: { modelName: 'Bora' } })
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: Bora (${tp.yearFrom}-${tp.yearTo ?? '...'})`)
  }

  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Bora' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Volkswagen Bora concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
