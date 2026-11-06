// seed-honda-nc750x-xadv.ts — Honda NC 750X + X-ADV
// NC 750X ABS (2014+) | NC 750X DCT ABS (2014+) | X-ADV 745 (2017+)
// Motor 745cc parallel twin SOHC 8v — o "adventure-commuter" mais prático da Honda
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

// ─── NC 750X / NC 750X DCT / X-ADV ───────────────────────────────────────────
// Motor: 745cc SOHC parallel twin 8v liquid-cooled | 54 cv @ 6.750 rpm | 69 Nm @ 4.750 rpm
// Óleo: 10W-30 JASO MA2, 3,0 L (serviço) / 3,7 L (completo) | Vela: NGK IZFR6K-11 gap 1,0 mm
// Bateria: YTZ14S 12V 11,2 Ah | Tanque: 14,1 L (NC 750X) / 14,1 L (X-ADV)
// Pneus NC 750X: 120/70-17 (F) / 160/60-17 (R) | X-ADV: 120/70-17 (F) / 160/60-17 (R)
// Compartimento sob assento: 21 L (cabe capacete) — exclusividade NC 750X/X-ADV

const NC750X_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA2 — 3,0 L (serviço) / 3,7 L (completo); a cada 8.000 km',
    body: 'Motor 745cc SOHC parallel twin de baixa rotação: 10W-30 JASO MA2 full sintético. Capacidade: 3,0 L na troca com filtro. Honda HP4 10W-30 ou Motul 7100 10W-30. Intervalo: 8.000 km ou 12 meses. Em uso exclusivamente urbano (baixa rotação constante): 6.000 km. O twin SOHC da NC/X-ADV roda em baixa rotação (cruising a 4.500–5.000 rpm em 120 km/h) — óleo degrada mais lentamente. Nível: visor lateral direito com motor quente e moto em cavalete lateral.',
  },
  {
    severity: 'OK',
    title: 'Velas NGK iridium IZFR6K-11 — gap 1,0 mm; 2 velas; troca a cada 16.000 km',
    body: '2 velas NGK IZFR6K-11 iridium (R$70–100 cada). Gap: 1,00 mm. Acesso: remover o tanque e o compartimento do baú (underseat). NÃO substitua por velas convencionais — o motor é calibrado para iridium. Custo da troca: R$150–200 em peças. Engasgo na retomada e dificuldade de partida a frio: primeiros sinais de velas desgastadas. Com a longevidade iridium (16.000 km), a troca costuma coincidir com a revisão dos 16.000 km.',
  },
  {
    severity: 'OK',
    title: 'Compartimento sob o assento (21 L) — guarda capacete; não sobrecarregue',
    body: 'O NC 750X e X-ADV têm compartimento de 21 L sob o assento, onde cabe um capacete integral. Carga máxima recomendada: 3 kg. NÃO use para carregar ferramentas pesadas ou itens soltos que possam vibrar e danificar o capacete. O compartimento tem borracha de vedação — inspecione a cada 10.000 km por ressecamento. Se a borracha rachar: água entra e pode danificar eletrônicos e o capacete. Borracha de reposição Honda: R$30–60.',
  },
  {
    severity: 'OK',
    title: 'DCT (Dual Clutch Transmission) — embreagem dupla automática; manutenção específica',
    body: 'A versão DCT (automática) da NC 750X e X-ADV tem caixa de dupla embreagem eletrônica. Óleo do DCT: MESMO óleo do motor (10W-30 JASO MA2) — a caixa compartilha o circuito de óleo. NÃO existe óleo separado para o DCT. Ponto de atenção: sensores do DCT são sensíveis a óleo degradado — troca pontual é essencial. Em modos: D (automático), S (esportivo), G (manual com paddle). Em subidas longas: modo G permite reduzir manualmente para maximizar torque.',
  },
  {
    severity: 'OK',
    title: 'Consumo real: 23–28 km/L — autonomia de 300–380 km com tanque de 14,1 L',
    body: 'O motor 745cc SOHC de baixa relação de compressão foi projetado para economia: consumo real de 23–28 km/L em uso misto. Autonomia: 320–380 km com tanque de 14,1 L. Com pilotagem conservadora em estrada (100–110 km/h): 28+ km/L. Em uso urbano com acelerações: 20–22 km/L. A luz de reserva acende com ~2,5 L (~60 km de margem). Gasolina Aditivada (ANP >92 octanos): melhora ~5% no consumo pela maior limpeza dos injetores.',
  },
  {
    severity: 'OK',
    title: 'Pneus 120/70-17 (F) / 160/60-17 (R) — touring recomendado; evite pneus de estrada',
    body: 'NC 750X: pneus 120/70-17 (frente) e 160/60-17 (traseiro). X-ADV: mesmos tamanhos mas versões mais aventureiras (Dunlop D605 ou Shinko 705 para uso misto). Para NC 750X em estrada: Michelin Road 5, Bridgestone Battlax T32, Pirelli Angel GT — excelente vida útil (18.000–24.000 km). Pressão: F 33 / R 36 PSI solo. Com garupa + bagagem: F 33 / R 39 PSI. NUNCA use pneus de trail (grandes brequinhos) no NC 750X — desequilibra a pilotagem em asfalto.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 — NC 750X usa corrente (X-ADV também); lubrificar regularmente',
    body: 'NC 750X e X-ADV usam transmissão por corrente passo 520. Pinhão 17T, coroa 41T (NC 750X) ou 39T (X-ADV). Folga: 25–35 mm. Lubrifique a cada 600 km. O twin de baixa rotação com alto torque transmite força suavemente — a corrente dura mais que em modelos de alta rotação. Kit RK 520 ou DID 520: R$280–400 completo. Intervalo de troca: 25.000–35.000 km com boa lubrificação.',
  },
  {
    severity: 'OK',
    title: 'X-ADV: pneus misto-estrada e postura adventureiro-scooter; calibragem específica',
    body: 'O X-ADV tem visual adventureiro mas comportamento urbano (DCT de série, body de scooter). Pneus de uso misto leve: Mitas E10 Dakar ou Shinko 705 para 20% off-road (terra/cascalho compactado). Para trilha pesada: X-ADV NÃO é recomendado — suspensão baixa e difícil de equilibrar. Pressão off-road: F 25 / R 28 PSI (reduzir para tração em terra). Suspensão: inversão (upside down) de 150 mm — boa para irregularidades da estrada, não para off-road sério.',
  },
]

const NC750X_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'DCT com "solavanco" em cidade — ajuste de mapa de troca e condução suave resolvem',
    body: 'A caixa DCT da NC 750X pode apresentar trocas bruscas em velocidades muito baixas (2–5 km/h) no modo D. É comportamento esperado — o DCT foi calibrado para eficiência, não para suavidade absoluta. Solução: use o modo S em tráfego urbano intenso (resposta mais rápida e previsível). Em filas lentas: deixe em 1ª (no modo D ele mantém em 1ª abaixo de 15 km/h). Em versões 2021+: Honda atualizou o mapa e o solavanco diminuiu. Oficina pode atualizar o mapa da ECU em versões antigas.',
  },
  {
    severity: 'WARN',
    title: 'Proteção ao vento: NC 750X tem bolha pequena — adicione windscreen aftermarket para viagens',
    body: 'A bolha OEM do NC 750X protege pouco em velocidades acima de 110 km/h. Em viagens longas: o vento cansa. Bolha aftermarket: MRA Vario X-Creen (R$400–650) ou Ermax (R$350–500) adiciona 8–12 cm de proteção. Para o X-ADV: Puig Adventure Screen. NÃO instale bolhas muito altas sem teste: turbulência no capacete pode ser pior que o vento direto. Teste a altura antes de comprar (muitas lojas têm demonstração).',
  },
  {
    severity: 'WARN',
    title: 'Corrente de transmissão: desgaste rápido sem lubrificação adequada',
    body: 'O motor de alto torque a baixa rotação do NC 750X transmite forças expressivas à corrente. Sem lubrificação regular (mínimo a cada 600 km): desgaste acelerado do pinhão e da coroa. Sinal de coroa desgastada: "corcova" ao acelerar suavemente ou corrente soltando. Kit de transmissão completo (corrente + pinhão + coroa): R$280–400. Para evitar: spray de corrente O-ring após cada lavagem e a cada 600 km.',
  },
  {
    severity: 'OK',
    title: 'Motor "sem emoção" — para quem busca performance esportiva, NC 750X não é a escolha',
    body: 'O motor 745cc SOHC da NC 750X foi projetado para economia e praticidade, não para performance. 54 cv é adequado para uso diário e viagens, mas não para pilotagem esportiva. Quem busca emoção no acelerador deve considerar CB 650R ou NC 750X modificada (escape + remapeamento adiciona 6–8 cv). Para o perfil de uso que a NC foi projetada (commuter + touring leve), o motor é excelente e praticamente indestrutível se bem mantido.',
  },
]

// ─── Manutenção ───────────────────────────────────────────────────────────────

const NC750X_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'NC 750X', yearFrom: 2014, yearTo: null, component: 'Óleo 10W-30 JASO MA2 (3,0 L serviço / 3,7 L completo)', intervalKm: 8000, intervalMonths: 12, notes: 'Full sintético. Honda HP4 ou Motul 7100. DCT compartilha o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'NC 750X', yearFrom: 2014, yearTo: null, component: 'Filtro de óleo — troca', intervalKm: 8000, intervalMonths: 12, notes: 'Honda original ou Hiflofiltro. Aplicar óleo no O-ring antes de instalar.', priority: 'MEDIUM', order: 2 },
  { modelName: 'NC 750X', yearFrom: 2014, yearTo: null, component: 'Velas iridium NGK IZFR6K-11 (×2) — gap 1,0 mm', intervalKm: 16000, intervalMonths: null, notes: '2 velas. Acesso: remover tanque + underseat. Troca em conjunto. R$70–100/unid.', priority: 'MEDIUM', order: 3 },
  { modelName: 'NC 750X', yearFrom: 2014, yearTo: null, component: 'Fluido de arrefecimento — troca', intervalKm: null, intervalMonths: 24, notes: 'Long Life Coolant 50/50 com água destilada.', priority: 'HIGH', order: 4 },
  { modelName: 'NC 750X', yearFrom: 2014, yearTo: null, component: 'Pastilhas dianteiras ABS + fluido DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'ABS de série. EBC FA295HH. Purge guiado com scanner. DOT 4: bienal.', priority: 'HIGH', order: 5 },
  { modelName: 'NC 750X', yearFrom: 2014, yearTo: null, component: 'Kit transmissão 520 (corrente + pinhão 17T + coroa 41T)', intervalKm: 25000, intervalMonths: null, notes: 'DID 520 VX. Lubrificar a cada 600 km. Folga: 25–35 mm.', priority: 'HIGH', order: 6 },
  { modelName: 'NC 750X', yearFrom: 2014, yearTo: null, component: 'Bateria YTZ14S (12V 11,2Ah) — verificação', intervalKm: null, intervalMonths: 12, notes: 'Yuasa YTZ14S. Repouso: 12,6V. Tensão a 4.000 rpm: 13,5–14,5V.', priority: 'MEDIUM', order: 7 },
  { modelName: 'NC 750X', yearFrom: 2014, yearTo: null, component: 'Borracha do compartimento underseat — inspeção', intervalKm: null, intervalMonths: 24, notes: 'Borracha de vedação pode ressecar. Substitua se rachar para evitar entrada de água.', priority: 'LOW', order: 8 },
]

const NC750X_DCT_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'NC 750X DCT', yearFrom: 2014, yearTo: null, component: 'Óleo 10W-30 JASO MA2 (3,0 L serviço / 3,7 L completo)', intervalKm: 8000, intervalMonths: 12, notes: 'CRÍTICO: DCT compartilha o óleo do motor. Óleo degradado = falhas no DCT. Full sintético.', priority: 'CRITICAL', order: 1 },
  { modelName: 'NC 750X DCT', yearFrom: 2014, yearTo: null, component: 'Filtro de óleo — troca', intervalKm: 8000, intervalMonths: 12, notes: 'Honda original. Importante para DCT: filtro limpo mantém sensores do DCT funcionando.', priority: 'HIGH', order: 2 },
  { modelName: 'NC 750X DCT', yearFrom: 2014, yearTo: null, component: 'Velas iridium NGK IZFR6K-11 (×2) — gap 1,0 mm', intervalKm: 16000, intervalMonths: null, notes: 'Mesmas velas do NC 750X manual.', priority: 'MEDIUM', order: 3 },
  { modelName: 'NC 750X DCT', yearFrom: 2014, yearTo: null, component: 'Fluido de arrefecimento — troca', intervalKm: null, intervalMonths: 24, notes: 'Long Life Coolant 50/50. Motor compartilhado com NC 750X manual.', priority: 'HIGH', order: 4 },
  { modelName: 'NC 750X DCT', yearFrom: 2014, yearTo: null, component: 'Pastilhas dianteiras ABS + fluido DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'Sistema de freios idêntico ao NC 750X manual.', priority: 'HIGH', order: 5 },
  { modelName: 'NC 750X DCT', yearFrom: 2014, yearTo: null, component: 'Atualização de mapa DCT (opcional) — oficina Honda', intervalKm: null, intervalMonths: null, notes: 'Versões 2014–2020: perguntar à concessionária sobre disponibilidade de atualização de software.', priority: 'LOW', order: 6 },
]

const XADV_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'X-ADV', yearFrom: 2017, yearTo: null, component: 'Óleo 10W-30 JASO MA2 (3,0 L serviço / 3,7 L completo)', intervalKm: 8000, intervalMonths: 12, notes: 'DCT de série no X-ADV. Óleo é compartilhado com o DCT. Full sintético obrigatório.', priority: 'CRITICAL', order: 1 },
  { modelName: 'X-ADV', yearFrom: 2017, yearTo: null, component: 'Filtro de óleo — troca', intervalKm: 8000, intervalMonths: 12, notes: 'Honda original. Mesmo motor NC 750X.', priority: 'HIGH', order: 2 },
  { modelName: 'X-ADV', yearFrom: 2017, yearTo: null, component: 'Velas iridium NGK IZFR6K-11 (×2) — gap 1,0 mm', intervalKm: 16000, intervalMonths: null, notes: '2 velas. Mesmas do NC 750X.', priority: 'MEDIUM', order: 3 },
  { modelName: 'X-ADV', yearFrom: 2017, yearTo: null, component: 'Pneus misto-estrada — inspeção de desgaste', intervalKm: 10000, intervalMonths: null, notes: 'Pneus aventureiros desgastam mais rápido em uso predominante de asfalto. Inspecionar a cada 10.000 km.', priority: 'MEDIUM', order: 4 },
  { modelName: 'X-ADV', yearFrom: 2017, yearTo: null, component: 'Suspensão invertida 150 mm — óleo e vedações', intervalKm: 20000, intervalMonths: null, notes: 'Suspensão inversão para uso misto: óleo 10 wt. Vedações: a cada 30.000 km ou ao notar vazamento.', priority: 'MEDIUM', order: 5 },
  { modelName: 'X-ADV', yearFrom: 2017, yearTo: null, component: 'Kit transmissão 520 — lubrificação', intervalKm: 600, intervalMonths: null, notes: 'Lubrificar a cada 600 km. Em uso off-road: a cada 300 km (poeira ataca a corrente). Folga: 25–35 mm.', priority: 'HIGH', order: 6 },
  { modelName: 'X-ADV', yearFrom: 2017, yearTo: null, component: 'Fluido de arrefecimento + pastilhas ABS + fluido DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'Idêntico ao NC 750X. ABS duplo canal de série.', priority: 'HIGH', order: 7 },
]

// ─── Calibragens ──────────────────────────────────────────────────────────────

const NC750X_CALIBRAGEM = {
  modelName: 'NC 750X',
  yearFrom: 2014, yearTo: null,
  tireSize: '120/70-17 (F) · 160/60-17 (R)',
  frontPsi: 33, rearPsi: 36, frontPsiLoad: 33, rearPsiLoad: 39,
  sparePsi: null,
  notes: 'Solo: F 33 / R 36 PSI. Com garupa e bagagem: F 33 / R 39 PSI. Touring: Michelin Road 5, Bridgestone Battlax T32. Verificar sempre a frio.',
}

const NC750X_DCT_CALIBRAGEM = {
  modelName: 'NC 750X DCT',
  yearFrom: 2014, yearTo: null,
  tireSize: '120/70-17 (F) · 160/60-17 (R)',
  frontPsi: 33, rearPsi: 36, frontPsiLoad: 33, rearPsiLoad: 39,
  sparePsi: null,
  notes: 'Mesma calibragem do NC 750X manual. Solo: F 33 / R 36 PSI. Com garupa: F 33 / R 39 PSI.',
}

const XADV_CALIBRAGEM = {
  modelName: 'X-ADV',
  yearFrom: 2017, yearTo: null,
  tireSize: '120/70-17 (F) · 160/60-17 (R)',
  frontPsi: 33, rearPsi: 36, frontPsiLoad: 33, rearPsiLoad: 39,
  sparePsi: null,
  notes: 'Solo: F 33 / R 36 PSI. Off-road leve (terra/cascalho): F 25 / R 28 PSI. Dunlop D605, Mitas E10 para uso misto.',
}

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

async function main() {
  console.log('🏍️  Seed Honda NC 750X / NC 750X DCT / X-ADV...')

  await upsertVehicleModel('NC 750X', 'Honda', 2014, null)
  await upsertVehicleModel('NC 750X DCT', 'Honda', 2014, null)
  await upsertVehicleModel('X-ADV', 'Honda', 2017, null)

  // NC 750X (manual)
  await upsertTips('NC 750X', 'MACETES', NC750X_MACETES)
  await upsertTips('NC 750X', 'PROBLEMAS', NC750X_PROBLEMAS)
  await upsertMaintenance(NC750X_MANUTENCAO)
  await upsertTirePressure(NC750X_CALIBRAGEM)

  // NC 750X DCT
  await upsertTips('NC 750X DCT', 'MACETES', NC750X_MACETES)
  await upsertTips('NC 750X DCT', 'PROBLEMAS', NC750X_PROBLEMAS)
  await upsertMaintenance(NC750X_DCT_MANUTENCAO)
  await upsertTirePressure(NC750X_DCT_CALIBRAGEM)

  // X-ADV
  await upsertTips('X-ADV', 'MACETES', NC750X_MACETES)
  await upsertTips('X-ADV', 'PROBLEMAS', NC750X_PROBLEMAS)
  await upsertMaintenance(XADV_MANUTENCAO)
  await upsertTirePressure(XADV_CALIBRAGEM)

  const models = ['NC 750X', 'NC 750X DCT', 'X-ADV']
  const tipCount = await prisma.tip.count({ where: { modelName: { in: models } } })
  const maintCount = await prisma.maintenanceItem.count({ where: { modelName: { in: models } } })

  console.log(`✅ NC 750X + NC 750X DCT + X-ADV — ${tipCount} dicas, ${maintCount} itens de manutenção`)
  console.log('✅ Seed concluído!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
