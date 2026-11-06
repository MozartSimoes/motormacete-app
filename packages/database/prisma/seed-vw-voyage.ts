/**
 * Seed Volkswagen Voyage — macetes, problemas, manutenção e calibragem
 * Versão sedã do Gol. Lançado em junho/1981 (motor 1.5 refrigerado a
 * água), produzido em São Bernardo do Campo em dois períodos: 1981-1987
 * e 1990-1996 — depois ficou fora de linha entre 1996 e 2007. Retornou
 * em 2008 já sobre a base do Gol G5 (motor/câmbio transversal, 1.0/1.6),
 * com reestilizações em 2012 (faróis do Fox), 2014 (versão Evidence),
 * 2016 e câmbio automático de 6 marchas a partir de 2019. Encerrou
 * produção em 2023 junto com o Gol, pela mesma exigência de controle de
 * estabilidade (ESC) obrigatório.
 * Execute: pnpm --filter @motormacete/database db:seed:vw-voyage
 *
 * Fontes: en.wikipedia.org (Volkswagen Voyage/Gol), despachantedok.com.br,
 *         autoo.com.br, canaldapeca.com.br, vwnews.com.br,
 *         autossegredos.com.br, garagem360.com.br, vw.com.br/recall
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- 1981-1996 (Voyage original, sobre o Gol G1) ----------
const MACETES_G1: TipInput[] = [
  { severity: 'OK', title: 'Compartilha mecânica com o Gol da mesma época — peça cruzada facilita manutenção', body: 'O Voyage é a versão sedã do Gol e compartilha motor, suspensão e boa parte da mecânica com ele. Ao procurar peça, pesquisar também pelas referências do Gol da mesma fase amplia bastante as opções.' },
]
const PROBLEMAS_G1: TipInput[] = []
const MANUTENCAO_G1: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Voyage 1981-1996 (1.5/1.6/1.8, gasolina ou álcool)', body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo (correia + tensores + bomba d\'água), motor interferente. | Anual — Inspeção de ferrugem estrutural e chicote elétrico, dado o tempo de uso do veículo hoje. | 20.000 km — Fluido de freio.' },
]

// ---------- 2008-2016 (retorno, base Gol G5, motor/câmbio transversal) ----------
const MACETES_G2: TipInput[] = [
  { severity: 'OK', title: 'Voltou ao mercado sobre a base do Gol G5 — mesma mecânica, mesmos pontos de atenção', body: 'O Voyage que retornou em 2008 usa a plataforma do Gol G5 (motor e câmbio transversais). Todo o histórico de manutenção do Gol dessa mesma fase (troca de óleo rigorosa, sistema de arrefecimento) se aplica igualmente aqui.' },
]
const PROBLEMAS_G2: TipInput[] = [
  { severity: 'WARN', title: 'Família EA111: bobina de ignição e atuador de marcha lenta são suspeitos comuns', body: 'Assim como no Gol da mesma geração, falha intermitente de bobina de ignição e atuador de marcha lenta com oscilação de giro são queixas recorrentes — itens baratos de checar antes de suspeitar de módulo de injeção.' },
]
const MANUTENCAO_G2: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Voyage 2008-2016 (1.0/1.6 EA111, gasolina ou flex)', body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo. | 20.000 km — Sistema de arrefecimento e verificação de bobina de ignição se notar falha. | 20.000 km — Fluido de freio.' },
]

// ---------- 2016-2023 (fase final, automático 6 marchas 2019+, fim de linha) ----------
const MACETES_G3: TipInput[] = [
  { severity: 'OK', title: 'A partir de 2019 ganhou câmbio automático de 6 marchas convencional', body: 'Diferente do câmbio automatizado I-Motion usado no Gol G6, o automático de 6 marchas que chegou ao Voyage a partir de 2019 é um câmbio convencional, com histórico de confiabilidade melhor.' },
  { severity: 'OK', title: 'Descontinuado em 2023 pela mesma exigência de ESC obrigatório do Gol', body: 'O fim de linha em 2023 aconteceu junto com o Gol, motivado pela obrigatoriedade do controle eletrônico de estabilidade (ESC) em todo carro novo — adaptar a plataforma antiga não era economicamente viável.' },
]
const PROBLEMAS_G3: TipInput[] = [
  { severity: 'DANGER', title: 'RECALL — trava do cinto de segurança traseiro (fabricação fev/2016 a set/2017)', body: 'Recall real da Volkswagen: unidades Gol e Voyage fabricadas entre 01/02/2016 e 21/09/2017 apresentam desvio dimensional na rosca da porca de fixação da fivela dupla do cinto de segurança traseiro, podendo afrouxar em uma colisão. Reparo gratuito. Confira o chassi em www.vw.com.br/recall ou pelo 0800 771 0110.' },
  { severity: 'DANGER', title: 'Verifique se sua unidade está na campanha do airbag Takata (2004-2018)', body: 'A Volkswagen instalou infladores de airbag Takata em veículos fabricados majoritariamente entre 2004 e 2018, que podem se degradar com calor/umidade e romper de forma descontrolada em uma colisão. Confira o chassi em www.vw.com.br/recall ou pelo 0800 771 0110.' },
]
const MANUTENCAO_G3: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Voyage 2016-2023 (1.0/1.6, manual ou automático 6 marchas)', body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia/corrente conforme motor. | 40.000-60.000 km — Óleo do câmbio automático 6 marchas (versões automáticas, 2019+). | 20.000 km — Fluido de freio e filtro de ar/cabine.' },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Voyage', yearFrom: 1981, yearTo: 1996, tireSize: '165/70 R13 (referência)', frontPsi: 28, rearPsi: 26, frontPsiLoad: 30, rearPsiLoad: 32, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta ou manual do proprietário.' },
  { modelName: 'Voyage', yearFrom: 2008, yearTo: 2016, tireSize: '175/70 R13 ou 185/65 R14 conforme versão', frontPsi: 29, rearPsi: 27, frontPsiLoad: 32, rearPsiLoad: 33, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta.' },
  { modelName: 'Voyage', yearFrom: 2016, yearTo: 2023, tireSize: '175/70 R14 ou 185/60 R15 conforme versão', frontPsi: 30, rearPsi: 28, frontPsiLoad: 33, rearPsiLoad: 33, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Voyage', yearFrom: 1981, yearTo: 1996, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Voyage', yearFrom: 1981, yearTo: 1996, component: 'Kit de correia dentada completo', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 1 },
  { modelName: 'Voyage', yearFrom: 2008, yearTo: 2016, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 2 },
  { modelName: 'Voyage', yearFrom: 2008, yearTo: 2016, component: 'Kit de correia dentada completo', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 3 },
  { modelName: 'Voyage', yearFrom: 2008, yearTo: 2016, component: 'Sistema de arrefecimento', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'Voyage', yearFrom: 2016, yearTo: 2023, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 5 },
  { modelName: 'Voyage', yearFrom: 2016, yearTo: 2023, component: 'Kit de correia/corrente de distribuição', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 6 },
  { modelName: 'Voyage', yearFrom: 2016, yearTo: 2023, component: 'Óleo do câmbio automático 6 marchas (2019+)', intervalKm: 50000, intervalMonths: 36, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'Voyage', yearFrom: 2016, yearTo: 2023, component: 'Fluido de freio e filtro de ar/cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 8 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Voyage', yearFrom: 1981, yearTo: 1996, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'Voyage', yearFrom: 2008, yearTo: 2016, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
  { modelName: 'Voyage', yearFrom: 2016, yearTo: 2023, MACETES: MACETES_G3, PROBLEMAS: PROBLEMAS_G3, MANUTENCAO: MANUTENCAO_G3 },
]

async function main() {
  console.log('🚗 Seed Volkswagen Voyage...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volkswagen', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Volkswagen', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Voyage', brandId: brand.id } },
    update: {}, create: { name: 'Voyage', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Voyage' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ Voyage (${block.yearFrom}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Voyage' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: Voyage (${tp.yearFrom}-${tp.yearTo ?? 'atual'})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Voyage' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Volkswagen Voyage concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
