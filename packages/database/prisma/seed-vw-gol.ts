/**
 * Seed Volkswagen Gol — macetes, problemas, manutenção e calibragem
 * O carro mais vendido da história do Brasil: 42 anos de produção
 * (1980-2023) em 8 gerações, líder de mercado por 27 anos seguidos.
 * G1 "Quadrado" (1980-1994): lançado com motor 1.3 a ar (herdado do
 * Fusca, 42cv), depois 1.6 a água. G2 "Bolinha" (1994-1999): design
 * arredondado, motor AP. G3 (1999-2005): pioneiro do Total Flex em 2003
 * (motor 1.0/1.6 Fire/AP). G4 (2005-2008): visual em "V", acabamento
 * simplificado. G5 (2008-2012): plataforma nova com motor/câmbio
 * transversal — reputação de pior geração mecanicamente. G6 (2012-2016):
 * ainda família EA111, câmbio I-Motion problemático. G7 (2016-2018):
 * chegada do motor 1.0 3 cilindros EA211. G8 (2018-2023): última
 * geração, automático de 6 marchas, fim de linha por exigência de
 * controle de estabilidade (ESC) obrigatório, sucedido pelo Polo Track.
 * Execute: pnpm --filter @motormacete/database db:seed:vw-gol
 *
 * Fontes: gazetasp.com.br, napista.com.br, canaltech.com.br,
 *         forumcarros.com.br, retornar.com.br, cnvw.com.br,
 *         turbonoticias.com.br, carrobonito.com, motoragora.com.br,
 *         garagem360.com.br, vw.com.br/recall, opinautos.com
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- G1 "Quadrado" 1980-1994 ----------
const MACETES_G1: TipInput[] = [
  { severity: 'OK', title: 'Motor 1.3 a ar (lançamento) é herdado do Fusca — peça e mecânico especializado ainda existem', body: 'As primeiras versões (Básica/L) usavam motor 1.3 a ar refrigerado, tecnologia herdada do Fusca. Peça e conhecimento de mecânico especializado em motor a ar VW ainda circulam bem no mercado de clássicos, mesmo décadas depois.' },
  { severity: 'OK', title: 'A partir do motor a água (1.6/1.8 AP), correia dentada exige troca preventiva rigorosa', body: 'Com a chegada do motor AP refrigerado a água, o kit de correia dentada (correia + tensores + bomba d\'água) passou a ser item crítico — motor interferente, não postergue a troca.' },
]
const PROBLEMAS_G1: TipInput[] = []
const MANUTENCAO_G1: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Gol G1 1980-1994 (1.3 a ar ou 1.6/1.8 AP a água)', body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo (motores a água). | Anual — Inspeção de ferrugem estrutural e chicote elétrico, dado o tempo de uso do veículo hoje. | 20.000 km — Fluido de freio.' },
]

// ---------- G2 "Bolinha" 1994-1999 ----------
const MACETES_G2: TipInput[] = [
  { severity: 'OK', title: 'Motor AP é robusto mas exige atenção ao sistema de arrefecimento', body: 'Relatos de comportamento estranho do arrefecimento após retífica de motor AP nessa geração — ao fazer retífica, exija verificação completa do sistema de arrefecimento junto (radiador, bomba d\'água, válvula termostática), não só o motor.' },
]
const PROBLEMAS_G2: TipInput[] = []
const MANUTENCAO_G2: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Gol G2 1994-1999 (1.0/1.6/1.8 AP)', body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo. | 20.000 km — Sistema de arrefecimento (radiador, bomba d\'água, válvula termostática). | 20.000 km — Fluido de freio.' },
]

// ---------- G3 1999-2005 (chegada do Total Flex em 2003) ----------
const MACETES_G3: TipInput[] = [
  { severity: 'OK', title: 'Pioneiro do Total Flex (2003) — motor aceita álcool, gasolina ou mistura em qualquer proporção', body: 'A partir de 2003 o Gol G3 foi um dos primeiros carros do Brasil com tecnologia flex-fuel (motor Fire/AP adaptado), permitindo abastecer com álcool, gasolina ou qualquer mistura sem trocar peça nem fazer ajuste manual.' },
  { severity: 'WARN', title: 'Marcha lenta instável costuma ser sincronismo de distribuição ou ponto de ignição, não injeção', body: 'RPM instável nessa geração costuma ter origem em sincronismo incorreto da correia de distribuição, ponto de ignição mal ajustado ou excesso de combustível — descarte esses três antes de suspeitar de módulo de injeção caro.' },
]
const PROBLEMAS_G3: TipInput[] = [
  { severity: 'WARN', title: 'Motor 1.6 AP com perda de potência e consumo de óleo em alguns exemplares', body: 'Há relatos de perda de potência combinada com consumo de óleo acelerado (nível caindo do máximo para abaixo do mínimo em poucas centenas de km) no motor 1.6 AP. Monitore o nível de óleo com frequência e não ignore perda de potência perceptível.' },
]
const MANUTENCAO_G3: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Gol G3 1999-2005 (Fire/AP 1.0/1.6, gasolina ou flex)', body: '10.000 km — Troca de óleo do motor + filtro (verificar nível com mais frequência no 1.6 AP). | 60.000 km/5 anos — Kit de correia dentada completo. | 20.000 km — Verificação do ponto de ignição e sincronismo. | 20.000 km — Fluido de freio.' },
]

// ---------- G4 2005-2008 ----------
const MACETES_G4: TipInput[] = [
  { severity: 'OK', title: 'Acabamento mais simples significa peça de interior mais barata que gerações anteriores', body: 'O G4 simplificou o acabamento interno em relação ao G3 — o lado positivo é que peça de plástico/interior costuma ser mais barata e fácil de achar hoje.' },
]
const PROBLEMAS_G4: TipInput[] = [
  { severity: 'WARN', title: 'Família EA111/AP: bobina de ignição e atuador de marcha lenta são suspeitos comuns', body: 'Falha intermitente de bobina de ignição (motor falhando, perda de potência, luz de injeção acesa) e atuador de marcha lenta com oscilação de giro são queixas recorrentes nessa fase — itens relativamente baratos de trocar antes de suspeitar de módulo de injeção.' },
]
const MANUTENCAO_G4: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Gol G4 2005-2008 (1.0/1.6/1.8, gasolina ou flex)', body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo. | 20.000 km — Verificação de bobina de ignição e atuador de marcha lenta se notar falha/oscilação. | 20.000 km — Fluido de freio.' },
]

// ---------- G5 2008-2012 (plataforma nova, reputação de pior geração) ----------
const MACETES_G5: TipInput[] = [
  { severity: 'WARN', title: 'Considerada por muitos a geração mais fraca mecanicamente — exija histórico de manutenção completo na compra', body: 'O G5 tem reputação consolidada de ser a geração com mais desgaste prematuro de peças de motor entre os donos. Ao comprar usado dessa fase, exigir comprovante de manutenção rigorosa é ainda mais importante do que em outras gerações do Gol.' },
]
const PROBLEMAS_G5: TipInput[] = [
  { severity: 'WARN', title: 'Desgaste prematuro de peças de motor documentado nessa geração', body: 'Diversos relatos apontam desgaste de componentes internos do motor antes do esperado no G5. Não estenda o intervalo de troca de óleo e use sempre a especificação correta — é a forma mais eficaz de mitigar esse ponto fraco conhecido.' },
]
const MANUTENCAO_G5: TipInput[] = [
  { severity: 'WARN', title: 'Cronograma Gol G5 2008-2012 (1.0/1.6 EA111, gasolina ou flex)', body: '10.000 km — Troca de óleo do motor + filtro, RIGOROSAMENTE em dia (geração com histórico de desgaste prematuro). | 60.000 km/5 anos — Kit de correia dentada completo. | 20.000 km — Sistema de arrefecimento. | 20.000 km — Fluido de freio.' },
]

// ---------- G6 2012-2016 (I-Motion, motor de partida) ----------
const MACETES_G6: TipInput[] = [
  { severity: 'OK', title: 'Fuja do câmbio I-Motion se possível — manual evita boa parte dos problemas crônicos dessa geração', body: 'O câmbio automatizado I-Motion do G6 tem histórico de trancos fortes, "soluços" em saída, desengate sozinho para neutro e luz de avaria no painel. Quem prioriza confiabilidade tende a preferir a versão manual dessa geração.' },
]
const PROBLEMAS_G6: TipInput[] = [
  { severity: 'WARN', title: 'Motor de partida com falha crônica reconhecida pela própria Volkswagen (1.6 8V)', body: 'A Volkswagen do Brasil reconheceu publicamente um problema crônico no motor de partida da linha Gol 1.6 8V do G6. Se sua unidade demora para dar partida ou faz ruído anormal ao acionar, vale consultar a concessionária sobre esse ponto especificamente.' },
  { severity: 'WARN', title: 'Câmbio I-Motion: trancos, desengate sozinho para neutro e luz de avaria no painel', body: 'Sintomas documentados do I-Motion incluem trancos fortes na troca, desengate espontâneo para neutro e acendimento da luz de avaria do câmbio. Não é sempre defeito grave — mas exige diagnóstico eletrônico assim que aparecer, não deve ser ignorado.' },
]
const MANUTENCAO_G6: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Gol G6 2012-2016 (1.0/1.6 EA111, manual ou I-Motion)', body: '10.000 km — Troca de óleo do motor 5W40 + filtro, rigorosamente em dia (família EA111). | 60.000 km/5 anos — Kit de correia dentada completo. | 40.000 km — Fluido do câmbio I-Motion (versões automatizadas). | 20.000 km — Sistema de arrefecimento. | 20.000 km — Fluido de freio.' },
]

// ---------- G7 2016-2018 (chegada do 1.0 3 cilindros EA211) ----------
const MACETES_G7: TipInput[] = [
  { severity: 'OK', title: 'Motor 1.0 3 cilindros EA211 é mecanicamente diferente do EA111 4 cilindros anterior', body: 'A troca do motor 4 cilindros (EA111) pelo novo 1.0 3 cilindros (EA211) trouxe mecânica bastante diferente — peça de motor NÃO é intercambiável entre as duas famílias. Confirme sempre qual motor sua unidade tem antes de orçar peça.' },
]
const PROBLEMAS_G7: TipInput[] = [
  { severity: 'DANGER', title: 'RECALL — trava do cinto de segurança traseiro (fabricação fev/2016 a set/2017)', body: 'Recall real da Volkswagen: unidades Gol e Voyage fabricadas entre 01/02/2016 e 21/09/2017 apresentam desvio dimensional na rosca da porca de fixação da fivela dupla do cinto de segurança traseiro. O defeito pode causar afrouxamento da fivela em uma colisão, comprometendo também a proteção dos outros dois cintos do banco traseiro (esquerdo e central). Reparo gratuito. Confira o chassi em www.vw.com.br/recall ou pelo 0800 771 0110.' },
]
const MANUTENCAO_G7: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Gol G7 2016-2018 (1.0 EA211 3 cilindros)', body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia/corrente conforme especificação do motor 3 cilindros. | 20.000 km — Fluido de freio e filtro de ar/cabine.' },
]

// ---------- G8 2018-2023 (última geração, automático 6 marchas, fim de linha) ----------
const MACETES_G8: TipInput[] = [
  { severity: 'OK', title: 'Última geração teve automático de 6 marchas convencional — não confunda com I-Motion do G6', body: 'O G8 trouxe pela primeira vez no Gol um câmbio automático de 6 marchas convencional (não o automatizado I-Motion problemático do G6) — mecanicamente diferente e com histórico de confiabilidade melhor.' },
  { severity: 'OK', title: 'Descontinuado em 2023 por exigência de controle de estabilidade (ESC) obrigatório', body: 'O fim de linha do Gol em 2023 foi motivado pela obrigatoriedade do controle eletrônico de estabilidade (ESC) em todos os carros novos — adaptar a plataforma antiga do Gol a essa exigência não era economicamente viável, e o modelo foi sucedido pelo Polo Track.' },
]
const PROBLEMAS_G8: TipInput[] = [
  { severity: 'DANGER', title: 'Verifique se sua unidade está na campanha do airbag Takata (2004-2018)', body: 'A Volkswagen instalou infladores de airbag Takata em veículos fabricados majoritariamente entre 2004 e 2018, incluindo unidades do Gol — esses infladores podem se degradar com calor/umidade e romper de forma descontrolada em uma colisão. Confira o chassi em www.vw.com.br/recall ou pelo 0800 771 0110, mesmo que o carro pareça funcionar normalmente.' },
]
const MANUTENCAO_G8: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Gol G8 2018-2023 (1.0 ou 1.6, manual ou automático 6 marchas)', body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia/corrente conforme motor. | 40.000-60.000 km — Óleo do câmbio automático de 6 marchas (versões automáticas). | 20.000 km — Fluido de freio e filtro de ar/cabine.' },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Gol', yearFrom: 1980, yearTo: 1994, tireSize: '145 R13 ou 155/80 R13 (referência)', frontPsi: 26, rearPsi: 26, frontPsiLoad: 28, rearPsiLoad: 30, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta ou manual do proprietário.' },
  { modelName: 'Gol', yearFrom: 1994, yearTo: 2005, tireSize: '165/70 R13 (referência)', frontPsi: 28, rearPsi: 26, frontPsiLoad: 30, rearPsiLoad: 32, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta.' },
  { modelName: 'Gol', yearFrom: 2005, yearTo: 2016, tireSize: '175/70 R13 ou 185/65 R14 conforme versão', frontPsi: 29, rearPsi: 27, frontPsiLoad: 32, rearPsiLoad: 33, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta.' },
  { modelName: 'Gol', yearFrom: 2016, yearTo: 2023, tireSize: '175/70 R14 ou 185/60 R15 conforme versão', frontPsi: 30, rearPsi: 28, frontPsiLoad: 33, rearPsiLoad: 33, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Gol', yearFrom: 1980, yearTo: 1994, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Gol', yearFrom: 1980, yearTo: 1994, component: 'Kit de correia dentada (motores a água)', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 1 },
  { modelName: 'Gol', yearFrom: 1994, yearTo: 2005, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 2 },
  { modelName: 'Gol', yearFrom: 1994, yearTo: 2005, component: 'Kit de correia dentada completo', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 3 },
  { modelName: 'Gol', yearFrom: 2005, yearTo: 2016, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Rigorosamente em dia no G5 (2008-2012), geração com desgaste prematuro documentado.', priority: 'CRITICAL', order: 4 },
  { modelName: 'Gol', yearFrom: 2005, yearTo: 2016, component: 'Kit de correia dentada completo', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 5 },
  { modelName: 'Gol', yearFrom: 2005, yearTo: 2016, component: 'Fluido do câmbio I-Motion (G6 automatizado)', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'Gol', yearFrom: 2016, yearTo: 2023, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 1.0 EA211 3 cilindros ou 1.6.', priority: 'CRITICAL', order: 7 },
  { modelName: 'Gol', yearFrom: 2016, yearTo: 2023, component: 'Kit de correia/corrente de distribuição', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 8 },
  { modelName: 'Gol', yearFrom: 2016, yearTo: 2023, component: 'Óleo do câmbio automático 6 marchas (G8)', intervalKm: 50000, intervalMonths: 36, notes: null, priority: 'HIGH', order: 9 },
  { modelName: 'Gol', yearFrom: 2016, yearTo: 2023, component: 'Fluido de freio e filtro de ar/cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 10 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Gol', yearFrom: 1980, yearTo: 1994, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'Gol', yearFrom: 1994, yearTo: 1999, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
  { modelName: 'Gol', yearFrom: 1999, yearTo: 2005, MACETES: MACETES_G3, PROBLEMAS: PROBLEMAS_G3, MANUTENCAO: MANUTENCAO_G3 },
  { modelName: 'Gol', yearFrom: 2005, yearTo: 2008, MACETES: MACETES_G4, PROBLEMAS: PROBLEMAS_G4, MANUTENCAO: MANUTENCAO_G4 },
  { modelName: 'Gol', yearFrom: 2008, yearTo: 2012, MACETES: MACETES_G5, PROBLEMAS: PROBLEMAS_G5, MANUTENCAO: MANUTENCAO_G5 },
  { modelName: 'Gol', yearFrom: 2012, yearTo: 2016, MACETES: MACETES_G6, PROBLEMAS: PROBLEMAS_G6, MANUTENCAO: MANUTENCAO_G6 },
  { modelName: 'Gol', yearFrom: 2016, yearTo: 2018, MACETES: MACETES_G7, PROBLEMAS: PROBLEMAS_G7, MANUTENCAO: MANUTENCAO_G7 },
  { modelName: 'Gol', yearFrom: 2018, yearTo: 2023, MACETES: MACETES_G8, PROBLEMAS: PROBLEMAS_G8, MANUTENCAO: MANUTENCAO_G8 },
]

async function main() {
  console.log('🚗 Seed Volkswagen Gol...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volkswagen', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Volkswagen', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Gol', brandId: brand.id } },
    update: {}, create: { name: 'Gol', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Gol' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ Gol G${BLOCKS.indexOf(block) + 1} (${block.yearFrom}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Gol' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: Gol (${tp.yearFrom}-${tp.yearTo ?? 'atual'})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Gol' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Volkswagen Gol concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
