/**
 * Seed Land Rover Discovery — macetes, problemas, manutenção e calibragem
 * NÃO inclui o Discovery Sport (SUV compacto derivado do Freelander,
 * plataforma totalmente diferente, montado em Itatiaia-RJ desde 2015) —
 * é um modelo mecanicamente distinto e deve ser pesquisado separadamente.
 * O Discovery "grande" chegou ao Brasil ainda na Series I (importado,
 * motor TDi diesel ou V8 gasolina). Em 1998 veio a Series II/Discovery 2,
 * com o motor 5 cilindros TD5 (mesmo do Defender da época). O Discovery
 * 3 (2004-2009) foi plataforma totalmente nova, com TDV6 2.7 diesel e
 * sistema Terrain Response. O Discovery 4 (2009-2016) foi um facelift
 * do 3, com motor SDV6 3.0 e opção V8 5.0 de origem Jaguar. Em 2017
 * chegou a 5ª geração, com carroceria monobloco em alumínio.
 * Execute: pnpm --filter @motormacete/database db:seed:landrover-discovery
 *
 * Fontes: autorealidade.com.br, landtechdf.com.br, landrover.com.br,
 *         autolivraria.com.br, auto-doc.pt, britmar.com.br,
 *         motoresnobre.com.br, 4x4brasil.com.br, clickpetroleoegas.com.br,
 *         reclameaqui.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- 1989-1998 (Series I, importado, TDi diesel ou V8 gasolina) ----------
const MACETES_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Peça mecânica é compartilhada com o Defender/Range Rover Classic da mesma época',
    body: 'Motor, transmissão e boa parte da suspensão são compartilhados com o Defender e o Range Rover Classic dessa era. Pesquisar peça por essas referências cruzadas amplia as opções, principalmente para motor diesel TDi.',
  },
]

const PROBLEMAS_G1: TipInput[] = []

const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Discovery Series I 1989-1998 (TDi diesel ou V8 gasolina)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo (correia + tensores + bomba d\'água), motor interferente. | 10.000 km — Graxa nas juntas homocinéticas/articulações. | 20.000 km — Inspeção do chassi contra ferrugem. | 20.000 km — Fluido de freio.',
  },
]

// ---------- 1998-2004 (Series II / Discovery 2, chegada do motor TD5) ----------
const MACETES_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor TD5 é o mesmo do Defender da época — mesmos cuidados se aplicam',
    body: 'O motor 5 cilindros TD5 usado nessa geração é compartilhado com o Defender do mesmo período. Todo o conhecimento de manutenção do TD5 do Defender (injeção, chicote de bicos injetores, temperatura do motor) se aplica igualmente ao Discovery 2.',
  },
]

const PROBLEMAS_G2: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'TD5: monitore a temperatura do motor — junta do cabeçote falha acima de 95°C',
    body: 'O motor TD5 tem tendência documentada de falha na junta do cabeçote quando a temperatura ultrapassa 95°C. Fique atento ao mostrador de temperatura — a falha da junta pode causar dano em cascata caro de reparar.',
  },
  {
    severity: 'WARN',
    title: 'TD5: chicote dos bicos injetores pode deixar óleo vazar para dentro do módulo de injeção',
    body: 'Defeito conhecido do TD5: o chicote elétrico dos bicos injetores, alojado dentro do motor, pode permitir vazamento de óleo para dentro do módulo eletrônico (ECU), causando dificuldade de partida, marcha lenta irregular e perda de potência.',
  },
]

const MANUTENCAO_G2: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Cronograma Discovery Series II/Discovery 2 1998-2004 (TD5 2.5 diesel ou V8 4.0 gasolina)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 20.000 km — Limpeza do sistema de injeção e troca do filtro de combustível (TD5). | 60.000 km/5 anos — Kit de correia dentada completo. | Sempre — monitorar a temperatura do motor no TD5, junta do cabeçote falha acima de 95°C. | 10.000 km — Graxa nas juntas homocinéticas.',
  },
]

// ---------- 2004-2009 (Discovery 3 — plataforma nova, TDV6 2.7, Terrain Response) ----------
const MACETES_G3: TipInput[] = [
  {
    severity: 'OK',
    title: 'Terrain Response: escolha o modo certo antes de entrar no obstáculo, não depois',
    body: 'O sistema Terrain Response (modos de condução conforme o terreno) funciona melhor quando ajustado ANTES de entrar em areia, lama ou pedra — não durante, com o carro já atolando. Antecipar a escolha do modo evita boa parte das situações de recuperação difícil.',
  },
  {
    severity: 'OK',
    title: 'Turbina do 2.7 TDV6 é ponto de atenção a partir de 100.000 km — óleo em dia prolonga a vida',
    body: 'A turbina do motor 2.7 TDV6 mostra fragilidade a partir de 100.000-150.000 km, agravada por óleo contaminado e alta temperatura de trabalho. Perda de potência perceptível, fumaça preta, chiado ou consumo de óleo maior que o normal são sinais de alerta — não ignore.',
  },
]

const PROBLEMAS_G3: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Suspensão a ar falha com frequência entre 60.000-100.000 km',
    body: 'O sistema de suspensão a ar eletrônica apresenta falha de funcionamento ou dificuldade de trocar entre modos com frequência a partir de 60.000-100.000 km, com reparo caro. Ao notar o carro não nivelando corretamente ou demorando para ajustar altura, leve para diagnóstico logo — atrasar piora e encarece o reparo.',
  },
  {
    severity: 'WARN',
    title: 'Combustível de baixa qualidade é apontado como causa recorrente de problema no diesel',
    body: 'Donos relatam problema crônico associado a "combustível sujo" no motor diesel dessa geração — abastecer sempre em posto de confiança reduz bastante o risco de entupimento de injetor e falha do sistema de injeção de alta pressão.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento recorrente: válvula termostática, bomba d\'água ou sensor com defeito',
    body: 'Superaquecimento recorrente nessa geração costuma ter origem em falha da válvula termostática, da bomba d\'água ou de sensores do sistema de arrefecimento — nem sempre é o radiador. Vale checar esses três pontos em sequência antes de assumir reparo maior.',
  },
]

const MANUTENCAO_G3: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Discovery 3 2004-2009 (TDV6 2.7 diesel ou V6/V8 gasolina)',
    body: '10.000 km — Troca de óleo do motor + filtro, sintético de qualidade (turbo é sensível a óleo degradado). | 60.000 km/5 anos — Kit de correia/corrente de distribuição conforme motor. | 20.000 km — Verificação da suspensão a ar (altura em repouso, tempo de resposta). | 20.000 km — Sistema de arrefecimento: válvula termostática, bomba d\'água, sensores. | Sempre — abastecer só em posto de confiança (diesel).',
  },
]

// ---------- 2009-2016 (Discovery 4 — facelift do 3, SDV6 3.0, V8 5.0 Jaguar) ----------
const MACETES_G4: TipInput[] = [
  {
    severity: 'OK',
    title: 'V8 5.0 é de origem Jaguar — peça e especialista compartilhados com modelos Jaguar da época',
    body: 'O motor V8 5.0 aspirado dessa geração tem origem Jaguar (AJ133), o mesmo usado em modelos Jaguar contemporâneos. Oficinas especializadas em Jaguar às vezes têm mais familiaridade com esse motor especificamente do que oficina genérica de Land Rover.',
  },
]

const PROBLEMAS_G4: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'SDV6 3.0: falha prematura de virabrequim/mancais associada a óleo degradado ou troca atrasada',
    body: 'Há casos documentados de falha prematura de virabrequim e mancais no motor 3.0 TDV6/SDV6, tipicamente relacionados a lubrificação ineficiente ou troca de óleo atrasada. Nesse motor, cumprir rigorosamente o intervalo de troca de óleo não é exagero — é prevenção de um dos reparos mais caros que existem no carro.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão a ar segue sendo ponto de atenção nessa geração',
    body: 'O mesmo padrão de falha da suspensão a ar do Discovery 3 (60.000-100.000 km) se repete no Discovery 4. Diagnóstico precoce ao notar nivelamento irregular evita reparo mais caro depois.',
  },
]

const MANUTENCAO_G4: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Cronograma Discovery 4 2009-2016 (TDV6/SDV6 3.0 diesel ou V8 5.0 gasolina)',
    body: '10.000 km — Troca de óleo do motor + filtro, NUNCA atrasar no SDV6 3.0 — risco de dano de virabrequim/mancais documentado. | 60.000 km/5 anos — Kit de correia/corrente de distribuição conforme motor. | 20.000 km — Verificação da suspensão a ar. | 20.000 km — Sistema de arrefecimento. | Sempre — abastecer só em posto de confiança (diesel).',
  },
]

// ---------- 2017-atual (Discovery 5ª geração — monobloco em alumínio) ----------
const MACETES_G5: TipInput[] = [
  {
    severity: 'OK',
    title: 'Isso NÃO é o Discovery Sport — são carros diferentes, plataformas diferentes',
    body: 'O Discovery Sport é um SUV compacto derivado da plataforma do antigo Freelander, montado em Itatiaia (RJ) desde 2015 — mecanicamente não tem relação com o Discovery "grande" documentado aqui. Se o problema que você está pesquisando veio de um Discovery Sport, essas informações não se aplicam ao seu carro — procure conteúdo específico do Discovery Sport.',
  },
  {
    severity: 'OK',
    title: 'Carroceria monobloco em alumínio: reparo de lataria exige oficina especializada nesse material',
    body: 'A partir dessa geração a carroceria passou a ser monobloco em alumínio, diferente do aço das gerações anteriores. Reparo de lataria após batida exige oficina com equipamento e certificação específicos para trabalhar com alumínio — solda e técnica de reparo são diferentes do aço convencional.',
  },
]

const PROBLEMAS_G5: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'RECALL confirmado no Brasil — corrosão no conector do airbag do motorista',
    body: 'A Land Rover Brasil confirmou recall no Brasil para Defender, Discovery e Range Rover por falha no conector do airbag do motorista (mesma campanha que atingiu 250.857 unidades nos EUA): corrosão pode se desenvolver no conector com o tempo, aumentando a resistência elétrica e podendo impedir o acionamento do airbag em uma colisão. Reparo gratuito. Confira o chassi em www.landrover.com.br/ownership/recall ou consulte uma concessionária — não adie essa verificação.',
  },
]

const MANUTENCAO_G5: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Discovery 2017+ (diesel Ingenium ou gasolina Si4/P400)',
    body: '15.000 km — Troca de óleo do motor + filtro. | 20.000 km — Verificação da suspensão a ar (altura em repouso, ruído do compressor). | 40.000 km — Fluido de freio e filtro de ar/cabine. | Anual — Diagnóstico eletrônico completo (módulos/conectores). | Após qualquer batida — reparo de lataria só em oficina certificada para trabalhar com alumínio.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Discovery', yearFrom: 1989, yearTo: 2004, tireSize: '235/70 R16 (referência)', frontPsi: 30, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 40, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta ou manual do proprietário.' },
  { modelName: 'Discovery', yearFrom: 2004, yearTo: 2016, tireSize: '235/70 R17 ou 255/55 R19 conforme versão', frontPsi: 32, rearPsi: 35, frontPsiLoad: 38, rearPsiLoad: 42, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — a suspensão a ar pode exigir recalibração junto com o ajuste de altura.' },
  { modelName: 'Discovery', yearFrom: 2017, yearTo: null, tireSize: '255/60 R18 ou 275/45 R21 conforme versão', frontPsi: 34, rearPsi: 34, frontPsiLoad: 38, rearPsiLoad: 41, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — a suspensão a ar pode exigir recalibração junto com o ajuste de altura.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Discovery', yearFrom: 1989, yearTo: 1998, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Discovery', yearFrom: 1989, yearTo: 1998, component: 'Kit de correia dentada completo', intervalKm: 60000, intervalMonths: 60, notes: 'Motor interferente.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Discovery', yearFrom: 1989, yearTo: 1998, component: 'Graxa nas juntas homocinéticas/articulações', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'Discovery', yearFrom: 1989, yearTo: 1998, component: 'Inspeção do chassi contra ferrugem', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'Discovery', yearFrom: 1998, yearTo: 2004, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Motor TD5 2.5 diesel ou V8 4.0 gasolina.', priority: 'CRITICAL', order: 4 },
  { modelName: 'Discovery', yearFrom: 1998, yearTo: 2004, component: 'Limpeza do sistema de injeção e filtro de combustível (TD5)', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'Discovery', yearFrom: 1998, yearTo: 2004, component: 'Monitoramento da temperatura do motor (TD5)', intervalKm: null, intervalMonths: null, notes: 'Junta do cabeçote falha acima de 95°C.', priority: 'CRITICAL', order: 6 },
  { modelName: 'Discovery', yearFrom: 1998, yearTo: 2004, component: 'Kit de correia dentada completo', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 7 },
  { modelName: 'Discovery', yearFrom: 2004, yearTo: 2009, component: 'Óleo do motor sintético + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'TDV6 2.7 diesel ou V6/V8 gasolina.', priority: 'CRITICAL', order: 8 },
  { modelName: 'Discovery', yearFrom: 2004, yearTo: 2009, component: 'Verificação da suspensão a ar', intervalKm: 20000, intervalMonths: 12, notes: 'Falha frequente entre 60.000-100.000 km.', priority: 'HIGH', order: 9 },
  { modelName: 'Discovery', yearFrom: 2004, yearTo: 2009, component: 'Sistema de arrefecimento (válvula termostática, bomba d\'água, sensores)', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 10 },
  { modelName: 'Discovery', yearFrom: 2004, yearTo: 2009, component: 'Kit de correia/corrente de distribuição', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 11 },
  { modelName: 'Discovery', yearFrom: 2009, yearTo: 2016, component: 'Óleo do motor sintético + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'SDV6 3.0 diesel: NUNCA atrasar, risco de dano de virabrequim.', priority: 'CRITICAL', order: 12 },
  { modelName: 'Discovery', yearFrom: 2009, yearTo: 2016, component: 'Verificação da suspensão a ar', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 13 },
  { modelName: 'Discovery', yearFrom: 2009, yearTo: 2016, component: 'Sistema de arrefecimento', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 14 },
  { modelName: 'Discovery', yearFrom: 2017, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 15000, intervalMonths: 12, notes: 'Diesel Ingenium ou gasolina Si4/P400.', priority: 'CRITICAL', order: 15 },
  { modelName: 'Discovery', yearFrom: 2017, yearTo: null, component: 'Verificação da suspensão a ar', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 16 },
  { modelName: 'Discovery', yearFrom: 2017, yearTo: null, component: 'Diagnóstico eletrônico completo (módulos/conectores)', intervalKm: null, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 17 },
  { modelName: 'Discovery', yearFrom: 2017, yearTo: null, component: 'Fluido de freio e filtro de ar/cabine', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 18 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Discovery', yearFrom: 1989, yearTo: 1998, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'Discovery', yearFrom: 1998, yearTo: 2004, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
  { modelName: 'Discovery', yearFrom: 2004, yearTo: 2009, MACETES: MACETES_G3, PROBLEMAS: PROBLEMAS_G3, MANUTENCAO: MANUTENCAO_G3 },
  { modelName: 'Discovery', yearFrom: 2009, yearTo: 2016, MACETES: MACETES_G4, PROBLEMAS: PROBLEMAS_G4, MANUTENCAO: MANUTENCAO_G4 },
  { modelName: 'Discovery', yearFrom: 2017, yearTo: null, MACETES: MACETES_G5, PROBLEMAS: PROBLEMAS_G5, MANUTENCAO: MANUTENCAO_G5 },
]

async function main() {
  console.log('🚗 Seed Land Rover Discovery...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Land Rover', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Land Rover', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Discovery', brandId: brand.id } },
    update: {}, create: { name: 'Discovery', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Discovery' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Discovery' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo ?? 'atual'})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Discovery' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Land Rover Discovery concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
