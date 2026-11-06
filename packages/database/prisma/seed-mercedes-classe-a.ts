/**
 * Seed Mercedes-Benz Classe A — macetes, problemas, manutenção e
 * calibragem de pneus. Dois formatos bem diferentes ao longo da história
 * no Brasil:
 *  - 1999-2012 (W168 + W169): a "mini-MPV alta" clássica, com piso
 *    duplo/sanduíche. A versão 160 começou a ser montada em Juiz de Fora
 *    (MG) em 1999, e a 190 em 2000 — um dos poucos Mercedes genuinamente
 *    fabricados no Brasil dessa era. Ficou famosa pelo capotamento no
 *    "teste do alce" em 1997 na Europa, que levou a mudanças na
 *    suspensão e à adoção do ESP como item de série.
 *  - 2013-atual (W176/W177): abandonou o formato de mini-MPV e virou um
 *    hatch/sedan esportivo compacto convencional, motor turbo (1.3/2.0),
 *    câmbio automático de dupla embreagem 7G-DCT, incluindo produção
 *    nacional flex e as versões AMG A35/A45.
 * Execute: pnpm --filter @motormacete/database db:seed:mercedes-classe-a
 *
 * Fontes: oficinabrasil.com.br, portalmercedes.com (fórum de
 *         entusiastas/proprietários, referência técnica do modelo),
 *         portalmercedesbrasil.com, stockes.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ─── 1999-2012 (W168 + W169) — formato mini-MPV, piso sanduíche ──────────
const MACETES_MPV: TipInput[] = [
  {
    severity: 'OK',
    title: 'Fabricado no Brasil (Juiz de Fora/MG) — peça mais acessível do que um Mercedes importado típico',
    body: 'A versão 160 começou a ser montada em Juiz de Fora (MG) em 1999, e a 190 em 2000 — diferente da maioria dos Mercedes vendidos no Brasil, que são importados. Isso torna peça de mecânica básica relativamente mais fácil de achar que num Mercedes CBU, embora ainda seja carro de marca premium com custo de manutenção acima da média popular.',
  },
  {
    severity: 'OK',
    title: 'Item de segurança adotado após o "teste do alce": ESP de série',
    body: 'O Classe A ficou mundialmente conhecido em 1997 por capotar no "teste do alce" (manobra evasiva brusca) na Europa antes do lançamento — a Mercedes revisou a suspensão e passou a incluir o controle eletrônico de estabilidade (ESP) de série em resposta. Se for comprar um exemplar usado, confirme que o ESP está funcional (luz de alerta apagada e sem erro no painel), é item de segurança central do projeto desse carro.',
  },
]
const PROBLEMAS_MPV: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Correia poli-V e rolamentos tensores: troca em conjunto a cada 40.000 km',
    body: 'A correia poli-V e os rolamentos de desvio/tensores dela devem ser trocados juntos a cada 40.000 km — negligenciar os rolamentos mesmo trocando só a correia aumenta o risco de rompimento. Sempre orce o kit completo (correia + rolamentos), não só a correia isolada.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio semi-automático (AKS): letra "F" no painel indica erro no módulo de embreagem',
    body: 'O câmbio semi-automático dessa geração usa um módulo eletrônico de acionamento da embreagem (AKS, "Automatische Kupplungs Steuerung") — falha nesse módulo é queixa recorrente entre proprietários, com a letra "F" aparecendo no painel como sintoma de erro de engate. Se isso acontecer, procure oficina especializada em Mercedes clássico (não concessionária genérica) para diagnóstico do AKS antes de aceitar orçamento de troca de câmbio completo.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático 722.7: desgaste do pacote de embreagem K1',
    body: 'Nas versões com câmbio automático convencional (722.7), desgaste do pacote de embreagem interno K1 é problema documentado — sintoma típico é engate irregular ou tranco em marchas específicas. Fluido trocado em dia reduz bastante esse desgaste.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste de junta homocinética — atenção redobrada nesse modelo',
    body: 'Desgaste de junta homocinética (do semieixo) é ponto de atenção conhecido nessa geração — ruído tipo "clique" em curva fechada com aceleração é o sintoma clássico. Comunidade de proprietários já discute alternativas de substituição além da peça original, vale pesquisar em fórum especializado antes de aceitar só o orçamento de concessionária.',
  },
]
const MANUTENCAO_MPV: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Classe A 1999-2012 (formato mini-MPV)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios e suspensão. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Correia poli-V + rolamentos tensores (kit completo, não só a correia). | 40.000 km — Fluido de freio. | 60.000-80.000 km — Fluido do câmbio (automático 722.7 ou semi-automático AKS). | Sempre — letra "F" no painel exige diagnóstico do módulo AKS por especialista.',
  },
]

// ─── 2013+ (W176/W177) — hatch/sedan esportivo, turbo, 7G-DCT ────────────
const MACETES_MODERNO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Versões flex de fabricação nacional: peça de motor tende a ser mais acessível que a CBU importada',
    body: 'A geração atual passou a ter versões de fabricação nacional com motor flex — vale confirmar se seu exemplar é nacional ou importado (CBU) na hora de orçar peça de motor, já que a disponibilidade e o preço podem variar bastante entre as duas origens.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio 7G-DCT: atualize o software antes de trocar peça cara',
    body: 'O câmbio automático de dupla embreagem 7G-DCT (usado em A180/A200/A250 e diesel) é sensível a negligência — antes de aceitar orçamento de troca de embreagem ou mecatrônica, peça a atualização do software da unidade de controle do câmbio na concessionária, disponível periodicamente e que resolve parte dos sintomas de engate irregular.',
  },
]
const PROBLEMAS_MODERNO: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Motor M270 (gasolina): ruído de corrente e vazamento de óleo pela tampa de válvulas',
    body: 'O motor M270 a gasolina tem queixa documentada de ruído de corrente de comando e vazamento de óleo pela tampa de válvulas. Ruído metálico diferente na partida a frio ou mancha de óleo no topo do motor são os sinais a observar — não é normal, vale diagnóstico específico desse motor.',
  },
  {
    severity: 'WARN',
    title: 'Itens elétricos: iluminação, multimídia e vidros elétricos são queixas recorrentes',
    body: 'Falha em sistema de iluminação, instabilidade na central de multimídia/navegação e defeito em vidro elétrico aparecem entre as queixas mais citadas por proprietários dessa geração. Mantenha o software dos módulos atualizado na concessionária — resolve parte das instabilidades sem precisar trocar peça.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste prematuro de pastilha de freio',
    body: 'Desgaste de pastilha de freio acima do esperado é queixa comum — inspecione com mais frequência que o intervalo padrão, principalmente se o uso for predominantemente urbano.',
  },
]
const MANUTENCAO_MODERNO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Classe A 2013+ (motor turbo M270/M282, câmbio 7G-DCT)',
    body: '10.000 km — Troca de óleo do motor + filtro (motor turbo, não atrase). | 10.000 km — Inspeção de freios (pastilha com desgaste acima do esperado é queixa comum) e suspensão. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio. | 60.000 km — Fluido do câmbio 7G-DCT — não é vitalício, atualize também o software da unidade de controle quando disponível. | Sempre — ruído de corrente ou vazamento pela tampa de válvulas no motor M270 exige diagnóstico específico.',
  },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Classe A', yearFrom: 1999, yearTo: 2012, MACETES: MACETES_MPV, PROBLEMAS: PROBLEMAS_MPV, MANUTENCAO: MANUTENCAO_MPV },
  { modelName: 'Classe A', yearFrom: 2013, yearTo: null, MACETES: MACETES_MODERNO, PROBLEMAS: PROBLEMAS_MODERNO, MANUTENCAO: MANUTENCAO_MODERNO },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Classe A', yearFrom: 1999, yearTo: 2012, tireSize: '175/65 R15 · 195/55 R15 (Elegance/AvantGarde, referência)', frontPsi: 29, rearPsi: 29, frontPsiLoad: 32, rearPsiLoad: 34, sparePsi: 60, notes: 'Valor de referência — confirme na etiqueta da coluna da porta.' },
  { modelName: 'Classe A', yearFrom: 2013, yearTo: null, tireSize: '205/60 R16 · 225/45 R18 (AMG Line, referência)', frontPsi: 32, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 38, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta. Versões AMG A35/A45 usam pneu de alto desempenho — sem estepe na maioria (kit reparador).' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Classe A', yearFrom: 1999, yearTo: 2012, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Classe A', yearFrom: 1999, yearTo: 2012, component: 'Correia poli-V + rolamentos tensores', intervalKm: 40000, intervalMonths: 36, notes: 'Troque sempre em conjunto — negligenciar os rolamentos aumenta risco de rompimento da correia.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Classe A', yearFrom: 1999, yearTo: 2012, component: 'Fluido do câmbio (722.7 ou AKS semi-automático)', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'Classe A', yearFrom: 1999, yearTo: 2012, component: 'Inspeção de junta homocinética', intervalKm: 40000, intervalMonths: null, notes: 'Ruído tipo "clique" em curva fechada com aceleração é o sintoma clássico.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Classe A', yearFrom: 2013, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Motor turbo — não atrase.', priority: 'CRITICAL', order: 4 },
  { modelName: 'Classe A', yearFrom: 2013, yearTo: null, component: 'Fluido do câmbio 7G-DCT + atualização de software', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'CRITICAL', order: 5 },
  { modelName: 'Classe A', yearFrom: 2013, yearTo: null, component: 'Inspeção de pastilha de freio', intervalKm: 10000, intervalMonths: null, notes: 'Desgaste prematuro é queixa comum, inspecione com mais frequência que o padrão.', priority: 'HIGH', order: 6 },
  { modelName: 'Classe A', yearFrom: 2013, yearTo: null, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 7 },
]

async function main() {
  console.log('🚗 Seed Mercedes-Benz Classe A...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Mercedes-Benz', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Mercedes-Benz', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Classe A', brandId: brand.id } },
    update: {}, create: { name: 'Classe A', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Classe A' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Classe A' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Classe A' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Mercedes-Benz Classe A concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
