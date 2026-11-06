/**
 * Seed Nissan X-Trail — macetes, problemas, manutenção e calibragem
 * SUV importado no Brasil entre o início dos anos 2000 e 2010, quando
 * a Nissan parou de trazer o modelo por falta de demanda local — sem
 * substituto direto desde então. Gerações T30 (2001-2007) e T31
 * (2007-2010ish) presentes no mercado brasileiro, motores a gasolina
 * QR20DE (2.0 16V, 138cv) e QR25DE (2.5 16V, 180cv), tração dianteira
 * ou All Mode 4x4 (2WD/4WD Auto/4WD Lock selecionável). NOTA: um novo
 * X-Trail híbrido e-Power está anunciado para chegar ao Brasil no
 * segundo semestre de 2026 — é uma plataforma e mecânica totalmente
 * diferente (motor a combustão só gera energia, tração 100% elétrica
 * dupla), então nenhuma informação técnica deste arquivo (clássico
 * T30/T31 a gasolina) se aplica a essa versão nova quando ela chegar.
 * Execute: pnpm --filter @motormacete/database db:seed:nissan-xtrail
 *
 * Fontes: mecanicaonline.com.br, carrosegaragem.com.br,
 *         auto-doc.pt, opinautos.com.br, procon.sp.gov.br,
 *         cochesconcadena.com, 4x4brasil.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

const MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor QR20DE/QR25DE tem corrente de comando, não correia dentada',
    body: 'Os motores 2.0 (QR20DE) e 2.5 (QR25DE) usam corrente de comando metálica — não existe prazo fixo de troca por correia dentada. Ainda assim, inspecione a corrente e o tensor em quilometragem alta: ruído metálico a frio que some ao aquecer é sinal de folga excessiva.',
  },
  {
    severity: 'OK',
    title: 'Motor compartilhado com Sentra/Primera/Serena/Teana da mesma família QR',
    body: 'Os motores QR20DE/QR25DE equiparam vários modelos Nissan da época (Sentra, Primera, Serena, Teana), o que amplia a chance de achar peça de motor (junta, bomba d\'água, tampa de válvulas) mesmo o X-Trail não sendo mais vendido novo no Brasil.',
  },
  {
    severity: 'OK',
    title: 'Confirme se sua unidade automática é CVT ou automático convencional de 4 marchas',
    body: 'Dependendo da geração/ano, a versão automática do X-Trail pode ter câmbio CVT (mais comum na geração T31, 2007+) ou automático convencional de conversor de torque (mais comum na geração T30, 2001-2007). Peça, fluido e sintoma de desgaste são bem diferentes entre os dois tipos — confirme qual câmbio sua unidade tem antes de orçar fluido ou peça de transmissão.',
  },
  {
    severity: 'OK',
    title: 'Sistema All Mode 4x4: use "Lock" só em terreno difícil, não no asfalto',
    body: 'O seletor All Mode 4x4 tem modos 2WD, 4WD Auto e 4WD Lock. Use 2WD ou 4WD Auto no uso diário/asfalto — o modo Lock trava a distribuição de torque entre os eixos e deve ser usado só em terreno de baixa aderência (lama, areia, neve), sob risco de forçar o sistema de transmissão em piso com boa aderência.',
  },
  {
    severity: 'WARN',
    title: 'Peça de reposição pode ser mais difícil de achar — carro não é vendido novo no Brasil desde 2010',
    body: 'Como a Nissan parou de importar o X-Trail para o Brasil em 2010, a rede de concessionária já não estoca peça específica com a mesma facilidade de um modelo em linha. Procure oficinas especializadas em Nissan importado/JDM ou peça de importação direta para itens mais específicos — peça de desgaste comum (filtro, pastilha, correia de acessórios) geralmente ainda se acha sem problema.',
  },
  {
    severity: 'OK',
    title: 'X-Trail híbrido e-Power (2026): mecânica totalmente diferente, não confunda informação',
    body: 'A Nissan anunciou o retorno do X-Trail ao Brasil para o segundo semestre de 2026, agora com sistema híbrido e-Power: o motor a combustão (1.5 turbo) funciona só como gerador de energia, sem mover as rodas diretamente — toda a tração vem de motores elétricos. É uma plataforma e mecânica completamente diferente do X-Trail clássico (T30/T31) coberto aqui — nenhuma dica de motor a gasolina/câmbio deste arquivo se aplica à versão híbrida nova.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall: porca de ajuste da caixa de direção pode afrouxar (unidades nov/2008-set/2009)',
    body: 'A Nissan convocou recall no Brasil para 830 unidades do X-Trail fabricadas entre novembro de 2008 e setembro de 2009 (chassi entre JN1TBNT319W000001 e JN1TBNT319W000922) por risco de afrouxamento do torque da porca de ajuste da caixa de direção — o que pode causar perda de controle do veículo e acidente. O reparo consiste em instalar uma trava no local para impedir o afrouxamento da peça. Se sua unidade está nessa faixa de chassi, confirme na concessionária se o reparo já foi feito — ligue 0800 011 1090.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pela tampa de válvulas — comum em quilometragem alta',
    body: 'É relato recorrente nos motores QR20/QR25: a junta da tampa de válvulas resseca com o tempo e passa a vazar óleo. Não afeta a lubrificação principal do motor de imediato, mas manchas de óleo no topo do motor e cheiro de queimado (óleo pingando em partes quentes) merecem reparo — é troca de junta relativamente simples e barata.',
  },
  {
    severity: 'WARN',
    title: 'Pinças de freio traseiras "gripam" após 70.000-100.000 km',
    body: 'É comum a pinça de freio traseira travar/grippar por corrosão e falta de manutenção preventiva, principalmente em unidades que rodam pouco ou ficam muito tempo paradas. Sintoma: desgaste desigual de pastilha, ruído ou disco superaquecendo de um lado. Desengripar e lubrificar os pinos-guia da pinça periodicamente previne o problema.',
  },
  {
    severity: 'WARN',
    title: 'CVT (se equipado): fluido degradado causa aceleração brusca e ruído entre 80.000-120.000 km',
    body: 'Nas unidades com câmbio CVT, fluido negligenciado é a principal causa de aceleração brusca, ruído metálico e até superaquecimento da transmissão nessa faixa de quilometragem. Confirme primeiro que sua unidade realmente tem CVT (ver dica em MACETES) antes de aplicar esse diagnóstico — automático convencional tem outro padrão de falha.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma X-Trail (QR20/QR25, manual, automático convencional ou CVT)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro. | Inspecionar corrente de comando/tensor em quilometragem alta (ruído metálico a frio). | 60.000 km — Fluido do câmbio CVT (se equipado) ou fluido do automático convencional de 4 marchas, conforme o tipo confirmado. | 10.000 km — Inspeção e lubrificação dos pinos-guia das pinças de freio traseiras (ponto de atenção documentado). | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio. | Verificar tampa de válvulas contra vazamento de óleo em unidades de quilometragem mais alta. | Verificar na concessionária se o recall da caixa de direção (unidades nov/2008-set/2009) já foi concluído.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'X-Trail', yearFrom: 2001, yearTo: 2010, tireSize: '215/65 R16 (referência)', frontPsi: 30, rearPsi: 30, frontPsiLoad: 33, rearPsiLoad: 35, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta ou manual — pode variar entre 2.0/2.5 e entre gerações T30/T31.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'X-Trail', yearFrom: 2001, yearTo: 2010, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Confirme especificação conforme motor 2.0 QR20DE ou 2.5 QR25DE.', priority: 'CRITICAL', order: 0 },
  { modelName: 'X-Trail', yearFrom: 2001, yearTo: 2010, component: 'Verificação do recall da caixa de direção (unidades nov/2008-set/2009)', intervalKm: null, intervalMonths: null, notes: 'Risco de afrouxamento e perda de controle do veículo.', priority: 'CRITICAL', order: 1 },
  { modelName: 'X-Trail', yearFrom: 2001, yearTo: 2010, component: 'Inspeção da corrente de comando/tensor', intervalKm: null, intervalMonths: 24, notes: 'Ruído metálico a frio indica folga excessiva.', priority: 'MEDIUM', order: 2 },
  { modelName: 'X-Trail', yearFrom: 2001, yearTo: 2010, component: 'Fluido do câmbio (CVT ou automático convencional, conforme o tipo)', intervalKm: 60000, intervalMonths: 48, notes: 'Confirme qual tipo de câmbio sua unidade tem antes da troca.', priority: 'HIGH', order: 3 },
  { modelName: 'X-Trail', yearFrom: 2001, yearTo: 2010, component: 'Lubrificação dos pinos-guia das pinças de freio traseiras', intervalKm: 10000, intervalMonths: null, notes: 'Previne gripagem por corrosão, comum entre 70.000-100.000 km.', priority: 'HIGH', order: 4 },
  { modelName: 'X-Trail', yearFrom: 2001, yearTo: 2010, component: 'Verificação da tampa de válvulas contra vazamento de óleo', intervalKm: null, intervalMonths: 12, notes: 'Junta resseca com o tempo em quilometragem alta.', priority: 'MEDIUM', order: 5 },
  { modelName: 'X-Trail', yearFrom: 2001, yearTo: 2010, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'X-Trail', yearFrom: 2001, yearTo: 2010, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 7 },
]

const BLOCKS: ModelBlock[] = [{ modelName: 'X-Trail', yearFrom: 2001, yearTo: 2010, MACETES, PROBLEMAS, MANUTENCAO }]

async function main() {
  console.log('🚗 Seed Nissan X-Trail...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Nissan', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Nissan', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'X-Trail', brandId: brand.id } },
    update: {}, create: { name: 'X-Trail', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'X-Trail' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'X-Trail' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName}`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'X-Trail' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Nissan X-Trail concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
