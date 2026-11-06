// seed-honda-vintage-trail.ts — Honda trail/enduro clássicos
// NX 125 BROS ES | NX 150 | NX 200 | XLR 125 / XLR 125 ES | XLX 250 R | XLX 350 R
// XR 200 R | XR 650 | XL 125 DUTY / XL 125 S | NX 400 FALCON (ES)
// Motos trail e enduro Honda dos anos 1980–2000 — mercado de motos clássicas
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface MaintenanceItemInput {
  modelName: string; yearFrom: number | null; yearTo: number | null
  component: string; intervalKm: number | null; intervalMonths: number | null
  notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number
}

// ─── Macetes e problemas compartilhados — trails clássicas Honda ──────────────
// Motos com motor monocilíndrico SOHC 2v a ar / líquido de 125–350cc
// Carburador (todas — sem FI) | corrente de transmissão | freio a tambor (muitas versões)

const TRAIL_CLASSICO_MACETES: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Carburador obstruído por gasolina velha — problema crítico em motos paradas',
    body: 'Todas estas motos são carburadas. Gasolina deixada no carburador por mais de 2–3 semanas cria verniz que entope jatos finos. Sintoma: não parte, engasga, afoga. Prevenção: ao guardar a moto, feche a torneira de gasolina, ligue e deixe rodar até apagar. Ao comprar usada parada: reconstrua o carburador antes de qualquer tentativa (kit com jatos + flotador + O-rings: R$50–120). Limpeza ultrassônica: R$80–150 em oficina. Nunca use gasolina com teor de etanol >E27 nestas motos (carburadores não são calibrados para E100).',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50 mineral (frio/temperado) ou 10W-40 semissintético — trocar a cada 3.000–5.000 km',
    body: 'Motores monocilíndricos SOHC dos anos 1980–2000 foram projetados com tolerâncias para óleo mineral. Recomendação moderna: 20W-50 mineral para motos >30 anos (tolerâncias mais largas após desgaste) ou 10W-40 semissintético para motos bem conservadas. Verificação: a maioria tem vareta de nível (não visor). Nível com motor desligado 5 min, moto em posição vertical. Intervalo: 3.000 km (motor a ar carregado em off-road) ou 5.000 km (uso estrada).',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão — lubrificação essencial; correntes antigas degradam sem aviso',
    body: 'Correntes de motos clássicas podem ser de passo 428 (mais finas) ou 520 (mais grossas). Em motos com >30 anos: inspecione visualmente antes de cada uso — corrente enferrujada quebra sem aviso. Troca preventiva de corrente em qualquer compra de moto clássica: R$150–300 (kit completo). Lubrificação: a cada 500 km. Folga: verificar no manual (geralmente 25–35 mm). NUNCA use uma corrente já enferrujada ou com elos rígidos — risco de quebra em andamento.',
  },
  {
    severity: 'OK',
    title: 'Freio a tambor (muitas versões) — regulagem do cabo e limpeza das lonas',
    body: 'Muitas destas motos têm freio traseiro (e algumas dianteiro) a tambor. Regulagem do cabo: quando o pedal/alavanca tem curso longo (mole), ajuste o parafuso de regulagem do cabo. Limpeza das lonas: spray de freio a cada 15.000 km — poeira e gordura reduzem drasticamente a eficiência. Lonas gastas: sintoma é o tambor quente e ruído de metal em metal. Troca de lonas (reposição): R$60–120 o par. Revestimento das lonas: ainda disponível em ferragens especializadas.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK (cada modelo tem seu código) — gap 0,6–0,8 mm; inspecionar a cada 5.000 km',
    body: 'Velas de motos clássicas têm gap menor que motos modernas: geralmente 0,60–0,80 mm. Verifique o código no manual ou na tampa do motor. NGK mais comuns: C7HSA (XL/XR 125–200), D8EA (XLX 250/350, NX 150/200). Troca: a cada 10.000 km (convencional) ou 20.000 km (iridium, se disponível). Vela escura (preta): mistura rica (carb desregulado). Vela clara (branca/cinza clara): mistura pobre (jato entupido ou agulha levantada). Vela marrom mel: combustão perfeita.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar espuma (motos trail/enduro) — lavar e reoil regularmente; nunca soprar',
    body: 'Motos de enduro têm filtro de ar de espuma de poliuretano impregnado com óleo (foam filter). NUNCA limpe com ar comprimido — destroi a estrutura da espuma. Limpeza: gasolina ou solvente específico de filtro (No-Toil), espreme, deixe secar, reaplicar óleo filtro (PJ1 ou No-Toil). Frequência: a cada 10–15 horas de uso off-road, ou a cada 1.500 km em uso estrada. Filtro seco (sem óleo) deixa o motor aspirar poeira fina — desgaste acelerado do cilindro e pistão.',
  },
]

const TRAIL_CLASSICO_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Óleo do motor com >5 anos sem troca — risco de motor agarrado ao partir',
    body: 'Em motos que ficaram paradas por anos: o óleo envelhece e perde propriedades lubrificantes (fica como gel escuro). Ao partir um motor com óleo gelificado: rolamentos e mancais podem agarrar nos primeiros segundos de funcionamento. Procedimento obrigatório ao reativar moto clássica: drenar todo o óleo velho (por mais que pareça OK), lavar o cárter com 500 mL de diesel novo (deixar rodar 5 min em marcha lenta), drenar, colocar óleo novo. Só então rodar normalmente.',
  },
  {
    severity: 'WARN',
    title: 'Tanque com ferrugem interna — partículas entopem carburador e bomba de gasolina',
    body: 'Motos guardadas com tanque vazio ou parcialmente vazio por anos: ferrugem interna. Diagnóstico: abra a torneira com um copo embaixo e analise a gasolina — pó laranja/marrom indica ferrugem. Tratamento: lavagem com ácido fosfórico (KBS TankSeal ou Rust Bullet) + selagem interna. Sem tratamento: ferrugem entope jatos do carburador repetidamente. Custo de tratamento: R$80–200 (produto + aplicação).',
  },
  {
    severity: 'WARN',
    title: 'Fiação elétrica ressecada — curto circuito em motos vintage',
    body: 'O isolamento da fiação de motos dos anos 1980–1990 resseca e racha com o tempo. Em motos >30 anos: curtos intermitentes, luz oscilando, falhas de ignição. Inspeção visual da fiação (especialmente nas dobras próximas ao quadro) é essencial antes de reativar. Reparo: abraçadeiras de alta qualidade + fita isolante de borracha autovulcanizante nos pontos frágeis. Recabeamento completo: R$500–1.500 em oficina elétrica de motos clássicas.',
  },
  {
    severity: 'OK',
    title: 'Peças de moto clássica Honda — mercado de usados e nacional é a solução',
    body: 'Para motos dos anos 1980–2000: peças originais Honda esgotadas em muitos casos. Alternativas: (1) desmanche de motos clássicas (grupos no Facebook "Trail Brasil", "Enduro Clássico"); (2) peças universais de mesmo padrão (rolamentos, vedações, correntes); (3) réplicas nacionais (pistões, juntas, velas). Os motores SOHC Honda de 125–350cc são simples e bem documentados — mecânicos experientes em clássicas encontram soluções. Fóruns: ADVBrasil, TrailBrasil no Facebook.',
  },
]

// ─── Manutenção por modelo ────────────────────────────────────────────────────

function makeTrailMaintenance(modelName: string, yearFrom: number, yearTo: number | null, oilCapacity: string, chainPitch: string): MaintenanceItemInput[] {
  return [
    { modelName, yearFrom, yearTo, component: `Óleo 20W-50 mineral ou 10W-40 semi (${oilCapacity})`, intervalKm: 4000, intervalMonths: 6, notes: 'Motor monocilíndrico SOHC clássico. Uso off-road: 3.000 km.', priority: 'HIGH', order: 1 },
    { modelName, yearFrom, yearTo, component: 'Filtro de ar espuma — lavagem + reoil', intervalKm: 3000, intervalMonths: null, notes: 'NÃO usar ar comprimido. Gasolina + secar + reoil com óleo específico.', priority: 'HIGH', order: 2 },
    { modelName, yearFrom, yearTo, component: 'Vela (C7HSA / D8EA / D7EA) — inspeção e gap', intervalKm: 10000, intervalMonths: null, notes: 'Gap: 0,6–0,8 mm. Verificar cor da vela. Troca se preta ou branca.', priority: 'MEDIUM', order: 3 },
    { modelName, yearFrom, yearTo, component: 'Carburador — limpeza preventiva', intervalKm: 15000, intervalMonths: 24, notes: 'Desmontagem + limpeza ultrassônica. Substituir o-rings e flotador se desgastados.', priority: 'HIGH', order: 4 },
    { modelName, yearFrom, yearTo, component: `Kit transmissão ${chainPitch} (corrente + pinhão + coroa)`, intervalKm: 20000, intervalMonths: null, notes: `Lubrificar a cada 500 km. Inspecionar desgaste mensalmente.`, priority: 'HIGH', order: 5 },
    { modelName, yearFrom, yearTo, component: 'Freio — regulagem de cabo + limpeza das lonas', intervalKm: 5000, intervalMonths: null, notes: 'Tambor: regulagem do cabo quando curso longo. Lonas: spray de freio a cada 15.000 km.', priority: 'HIGH', order: 6 },
  ]
}

// ─── Calibragens por modelo ───────────────────────────────────────────────────

const TRAIL_CALIBRAGENS = [
  { modelName: 'NX 125 BROS ES', yearFrom: 1993, yearTo: 2000, tireSize: '2.75-21 (F) · 4.10-18 (R)', frontPsi: 25, rearPsi: 28, frontPsiLoad: 25, rearPsiLoad: 31, sparePsi: null, notes: 'Solo: F 25 / R 28 PSI. Com garupa: F 25 / R 31 PSI. Pneus tubeltype clássicos. Pirelli MT 53, IRC MH18.' },
  { modelName: 'NX 150', yearFrom: 1990, yearTo: 2001, tireSize: '2.75-21 (F) · 4.10-18 (R)', frontPsi: 25, rearPsi: 28, frontPsiLoad: 25, rearPsiLoad: 31, sparePsi: null, notes: 'Solo: F 25 / R 28 PSI. Com garupa: F 25 / R 31 PSI. Pneus tubeltype trail clássico.' },
  { modelName: 'NX 200', yearFrom: 1993, yearTo: 2005, tireSize: '80/100-21 (F) · 110/90-18 (R)', frontPsi: 25, rearPsi: 29, frontPsiLoad: 25, rearPsiLoad: 32, sparePsi: null, notes: 'Solo: F 25 / R 29 PSI. Com garupa: F 25 / R 32 PSI. Pirelli MT 21 ou Metzeler MC20 Enduro.' },
  { modelName: 'XLR 125', yearFrom: 1991, yearTo: 1999, tireSize: '2.75-21 (F) · 4.10-18 (R)', frontPsi: 22, rearPsi: 26, frontPsiLoad: 22, rearPsiLoad: 29, sparePsi: null, notes: 'Solo: F 22 / R 26 PSI. Off-road: reduzir 3–4 PSI em cada. Pneus trail tipo enduro.' },
  { modelName: 'XLR 125 ES', yearFrom: 1991, yearTo: 1999, tireSize: '2.75-21 (F) · 4.10-18 (R)', frontPsi: 22, rearPsi: 26, frontPsiLoad: 22, rearPsiLoad: 29, sparePsi: null, notes: 'Mesma especificação da XLR 125 (diferença é partida elétrica).' },
  { modelName: 'XLX 250 R', yearFrom: 1982, yearTo: 1990, tireSize: '3.00-21 (F) · 4.60-18 (R)', frontPsi: 22, rearPsi: 26, frontPsiLoad: 22, rearPsiLoad: 29, sparePsi: null, notes: 'Solo: F 22 / R 26 PSI. Pneus tubeltype trail. Pirelli MT 43 ou IRC. Off-road: reduzir 4 PSI.' },
  { modelName: 'XLX 350 R', yearFrom: 1984, yearTo: 1992, tireSize: '3.00-21 (F) · 4.60-18 (R)', frontPsi: 22, rearPsi: 28, frontPsiLoad: 22, rearPsiLoad: 31, sparePsi: null, notes: 'Solo: F 22 / R 28 PSI. Maior cilindrada exige pressão traseira ligeiramente maior.' },
  { modelName: 'XR 200 R', yearFrom: 1980, yearTo: 2000, tireSize: '80/100-21 (F) · 100/100-18 (R)', frontPsi: 22, rearPsi: 25, frontPsiLoad: 22, rearPsiLoad: 28, sparePsi: null, notes: 'Solo: F 22 / R 25 PSI. Enduro competição: F 15 / R 18 PSI. Pirelli MT 32 ou Metzeler Enduro 3 Sahara.' },
  { modelName: 'XR 650', yearFrom: 1993, yearTo: 2003, tireSize: '90/90-21 (F) · 130/90-18 (R)', frontPsi: 22, rearPsi: 25, frontPsiLoad: 22, rearPsiLoad: 28, sparePsi: null, notes: 'Solo: F 22 / R 25 PSI. Desert racing: F 15 / R 18 PSI. Pirelli MT 90 ou Metzeler MC7 Sahara.' },
  { modelName: 'XL 125 DUTY', yearFrom: 1983, yearTo: 1995, tireSize: '2.50-19 (F) · 3.00-17 (R)', frontPsi: 25, rearPsi: 29, frontPsiLoad: 25, rearPsiLoad: 32, sparePsi: null, notes: 'Solo: F 25 / R 29 PSI. Pneus duopropósito de perfil clássico.' },
  { modelName: 'XL 125 S', yearFrom: 1985, yearTo: 1996, tireSize: '2.75-21 (F) · 4.10-18 (R)', frontPsi: 22, rearPsi: 26, frontPsiLoad: 22, rearPsiLoad: 29, sparePsi: null, notes: 'Solo: F 22 / R 26 PSI. Perfil trail típico dos anos 80/90.' },
]

// ─── Upsert helpers ───────────────────────────────────────────────────────────

async function upsertTips(modelName: string, category: Cat, tips: TipInput[]) {
  await prisma.tip.deleteMany({ where: { modelName, category } })
  for (let i = 0; i < tips.length; i++) {
    const t = tips[i]
    await prisma.tip.create({
      data: { modelName, category, order: i + 1, severity: t.severity, title: t.title, body: t.body },
    })
  }
}

async function upsertMaintenance(items: MaintenanceItemInput[]) {
  const modelNames = [...new Set(items.map(i => i.modelName))]
  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: modelNames } } })
  for (const item of items) {
    await prisma.maintenanceItem.create({ data: item })
  }
}

async function upsertTirePressure(tp: { modelName: string; yearFrom: number; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number; rearPsiLoad: number; sparePsi: number | null; notes: string }) {
  await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName } })
  await prisma.tirePressure.create({
    data: tp,
  })
}

async function upsertVehicleModel(name: string, brandName: string, yearFrom: number, yearTo: number | null) {
  const brand = await prisma.brand.findFirst({ where: { name: brandName } })
  if (!brand) { console.warn(`Brand ${brandName} not found`); return }
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name, brandId: brand.id } },
    create: { name, brandId: brand.id },
    update: {},
  })
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const MODELOS = [
  { name: 'NX 125 BROS ES', yearFrom: 1993, yearTo: 2000, oil: '0,9 L', chain: '428' },
  { name: 'NX 150', yearFrom: 1990, yearTo: 2001, oil: '1,0 L', chain: '428' },
  { name: 'NX 200', yearFrom: 1993, yearTo: 2005, oil: '1,0 L', chain: '520' },
  { name: 'XLR 125', yearFrom: 1991, yearTo: 1999, oil: '0,8 L', chain: '420' },
  { name: 'XLR 125 ES', yearFrom: 1991, yearTo: 1999, oil: '0,8 L', chain: '420' },
  { name: 'XLX 250 R', yearFrom: 1982, yearTo: 1990, oil: '1,2 L', chain: '520' },
  { name: 'XLX 350 R', yearFrom: 1984, yearTo: 1992, oil: '1,3 L', chain: '520' },
  { name: 'XR 200 R', yearFrom: 1980, yearTo: 2000, oil: '1,0 L', chain: '520' },
  { name: 'XR 650', yearFrom: 1993, yearTo: 2003, oil: '1,8 L', chain: '520' },
  { name: 'XL 125 DUTY', yearFrom: 1983, yearTo: 1995, oil: '0,9 L', chain: '428' },
  { name: 'XL 125 S', yearFrom: 1985, yearTo: 1996, oil: '0,9 L', chain: '428' },
]

async function main() {
  console.log('🏍️  Seed Honda Vintage Trail (NX / XLR / XLX / XR / XL)...')

  for (const m of MODELOS) {
    await upsertVehicleModel(m.name, 'Honda', m.yearFrom, m.yearTo)
    await upsertTips(m.name, 'MACETES', TRAIL_CLASSICO_MACETES)
    await upsertTips(m.name, 'PROBLEMAS', TRAIL_CLASSICO_PROBLEMAS)
    await upsertMaintenance(makeTrailMaintenance(m.name, m.yearFrom, m.yearTo, m.oil, m.chain))
  }

  for (const cal of TRAIL_CALIBRAGENS) {
    await upsertTirePressure(cal)
  }

  const modelNames = MODELOS.map(m => m.name)
  const tipCount = await prisma.tip.count({ where: { modelName: { in: modelNames } } })
  const maintCount = await prisma.maintenanceItem.count({ where: { modelName: { in: modelNames } } })

  console.log(`✅ ${MODELOS.length} modelos vintage trail — ${tipCount} dicas, ${maintCount} itens de manutenção`)
  console.log('✅ Seed concluído!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
