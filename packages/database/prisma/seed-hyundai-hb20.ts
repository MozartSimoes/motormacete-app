/**
 * Seed Hyundai HB20 (hatch) — macetes, problemas, manutenção e
 * calibragem de pneus. Substitui o conteúdo antigo que vivia só no
 * seed.ts histórico (sem MaintenanceItem estruturado), preservando o
 * que já era bem documentado e adicionando 3 recalls oficiais reais
 * ainda não cobertos. Duas gerações: 2012-2019 (gen1) e 2020+ (gen2,
 * facelift completo). HB20S (sedan) e HB20X (crossover elevado) têm
 * arquivos próprios — "HB20" aqui não colide com eles porque a FIPE
 * grava os três nomes como tokens distintos sem espaço (HB20, HB20S,
 * HB20X), então o casamento por palavra não confunde um com o outro.
 * Execute: pnpm --filter @motormacete/database db:seed:hyundai-hb20
 *
 * Fontes: procon.sp.gov.br (recalls oficiais), autossegredos.com.br,
 *         portaldareparacao.com.br, usadosbr.com, reclameaqui.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ─── Gen1 (2012-2019) ───────────────────────────────────────────────────────
const MACETES_G1: TipInput[] = [
  { severity: 'OK', title: 'Correia dentada: confirme se seu motor é interferente antes de decidir o intervalo', body: 'O motor 1.0 do HB20 é interferente em algumas versões dessa geração — confirme no manual do seu ano/motor exato. Motor interferente com correia rompida custa R$3.000-8.000 em dano ao motor; troque a correia a cada 60.000 km ou 5 anos, sem exceção.' },
  { severity: 'OK', title: 'Embreagem: inspecione o disco a partir de 60.000 km', body: 'O disco de embreagem em versões manuais dura entre 60.000-80.000 km em uso urbano intenso. Sentiu "escorregamento" na aceleração (motor sobe de giro sem o carro acelerar na mesma proporção)? É hora de trocar.' },
]
const PROBLEMAS_G1: TipInput[] = [
  { severity: 'WARN', title: 'Molas dianteiras frágeis (2013-2016) em pavimento ruim', body: 'As molas dianteiras do HB20 2013-2016 são conhecidas por serem frágeis em pavimento ruim/buracos. Ao ouvir estralo vindo da suspensão dianteira, inspecione imediatamente — mola quebrada pode furar o pneu ou danificar outros componentes da suspensão.' },
  { severity: 'DANGER', title: 'Recall: válvula de vácuo do servo-freio ressecada (2016-2018, 1.0 Turbo manual)', body: 'A Hyundai convocou recall de unidades HB20/HB20S 2016-2018 com motor 1.0 Turbo e câmbio manual de 6 marchas — a válvula de controle de vácuo do servo-freio pode ressecar por exposição a alta temperatura de componente próximo. Sintomas: ruído de "assovio" perto do motor, oscilação da marcha lenta, pedal de freio mais duro que o normal. Se seu carro é dessa faixa e apresenta esses sintomas, agende o recall gratuito imediatamente — afeta diretamente a eficiência do freio.' },
  { severity: 'WARN', title: 'Recall: junta homocinética com dureza fora de especificação (2017, motor 1.0)', body: 'Lote de rolamentos internos da junta homocinética do semieixo dianteiro identificado com dureza abaixo do especificado em unidades 2017 (motor 1.0) — pode causar ruído em manobras e/ou vibração por desgaste prematuro. Consulte a concessionária com o chassi do seu carro para confirmar se está na faixa afetada.' },
]
const MANUTENCAO_G1: TipInput[] = [
  { severity: 'OK', title: 'Cronograma HB20 Gen1 (2012-2019)', body: '10.000 km — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios e suspensão (atenção a estralo nas molas dianteiras 2013-2016). | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio. | 60.000 km — Correia dentada (confirme se seu motor é interferente) e disco de embreagem (versões manuais). | Sempre — confirme com a concessionária se seu chassi está nas faixas dos recalls de servo-freio (2016-2018) ou junta homocinética (2017).' },
]

// ─── Gen2 (2020+) ───────────────────────────────────────────────────────────
const MACETES_G2: TipInput[] = [
  { severity: 'WARN', title: 'Câmbio de dupla embreagem (DCT): solavanco em manobra lenta é característica conhecida', body: 'O câmbio DCT do HB20 (compartilhado com o Creta) apresenta solavanco característico em manobras abaixo de 20 km/h — atualização de software na concessionária ameniza bastante esse comportamento. Se o seu incomodar, pergunte sobre atualização disponível antes de suspeitar de defeito mecânico.' },
  { severity: 'WARN', title: 'Motor turbo 1.0: reclamações de consumo de óleo/vício oculto — documente desde o início', body: 'Há reclamações registradas sobre consumo de óleo acima do esperado no motor 1.0 turbo, com queixa de custo de reparo alto. Verifique o nível de óleo entre trocas regularmente desde os primeiros meses e documente qualquer padrão de consumo fora do normal — isso fortalece seu caso de garantia se precisar acionar a Hyundai.' },
]
const PROBLEMAS_G2: TipInput[] = [
  { severity: 'DANGER', title: 'Recall: módulo da bomba elétrica de óleo do câmbio automático — risco de incêndio', body: 'A Hyundai convocou recall para HB20 e Creta com câmbio automático por risco de curto-circuito no módulo de controle da bomba elétrica de óleo da transmissão, que em situação extrema pode causar incêndio, com risco de dano material e lesão física grave. Consulte a concessionária com o chassi do seu carro (telefone 0800 770 3355 ou hyundai.com.br/servicos/recalls) e agende a inspeção/substituição imediatamente — é o recall mais grave documentado para esse modelo, não é opcional.' },
]
const MANUTENCAO_G2: TipInput[] = [
  { severity: 'OK', title: 'Cronograma HB20 Gen2 (2020+)', body: '10.000 km — Troca de óleo do motor + filtro (essencial no 1.0 turbo — verifique nível entre trocas também). | 10.000 km — Inspeção de freios e suspensão. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio. | 60.000 km — Correia dentada/corrente (confirme especificação do seu motor exato) e fluido do câmbio DCT/automático. | Sempre — confirme com a concessionária se seu chassi está na faixa do recall do módulo da bomba elétrica de óleo do câmbio automático (risco de incêndio).' },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'HB20', yearFrom: 2012, yearTo: 2019, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'HB20', yearFrom: 2020, yearTo: null, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'HB20', yearFrom: 2012, yearTo: 2019, tireSize: '175/65 R14', frontPsi: 29, rearPsi: 29, frontPsiLoad: 32, rearPsiLoad: 33, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta.' },
  { modelName: 'HB20', yearFrom: 2020, yearTo: null, tireSize: '185/60 R15', frontPsi: 30, rearPsi: 30, frontPsiLoad: 33, rearPsiLoad: 35, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta. Versões com aro maior podem variar.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'HB20', yearFrom: 2012, yearTo: 2019, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'HB20', yearFrom: 2012, yearTo: 2019, component: 'Correia dentada (motor interferente em algumas versões)', intervalKm: 60000, intervalMonths: 60, notes: 'Confirme no manual se seu motor/ano exato é interferente.', priority: 'CRITICAL', order: 1 },
  { modelName: 'HB20', yearFrom: 2012, yearTo: 2019, component: 'Disco de embreagem (versões manuais)', intervalKm: 70000, intervalMonths: null, notes: 'Escorregamento na aceleração é o sintoma de troca.', priority: 'HIGH', order: 2 },
  { modelName: 'HB20', yearFrom: 2012, yearTo: 2019, component: 'Confirmação de recalls (servo-freio 2016-2018, junta homocinética 2017)', intervalKm: null, intervalMonths: null, notes: 'Consulte a concessionária com o chassi do carro.', priority: 'CRITICAL', order: 3 },
  { modelName: 'HB20', yearFrom: 2012, yearTo: 2019, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'HB20', yearFrom: 2020, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Verifique nível entre trocas no motor 1.0 turbo.', priority: 'CRITICAL', order: 5 },
  { modelName: 'HB20', yearFrom: 2020, yearTo: null, component: 'Confirmação de recall do módulo da bomba elétrica de óleo (câmbio automático)', intervalKm: null, intervalMonths: null, notes: 'Risco de incêndio — consulte a concessionária com o chassi do carro imediatamente.', priority: 'CRITICAL', order: 6 },
  { modelName: 'HB20', yearFrom: 2020, yearTo: null, component: 'Fluido do câmbio DCT/automático', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'HB20', yearFrom: 2020, yearTo: null, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 8 },
]

async function main() {
  console.log('🚗 Seed Hyundai HB20...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Hyundai', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Hyundai', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'HB20', brandId: brand.id } },
    update: {}, create: { name: 'HB20', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'HB20' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'HB20' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'HB20' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Hyundai HB20 concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
