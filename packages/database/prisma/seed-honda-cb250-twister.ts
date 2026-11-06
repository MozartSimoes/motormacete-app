// seed-honda-cb250-twister.ts — Honda CB 250 TWISTER / TWISTER FLEXONE
// CB 250 TWISTER FLEX (2016+) | CB 250 TWISTER FLEXONE (2022+)
// Motor 249cc DOHC single-cyl liquid-cooled PGM-FI FLEX — fabricado em Manaus
// A naked 250cc mais popular do Brasil; segmento de entrada esportiva
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

// ─── CB 250 TWISTER ───────────────────────────────────────────────────────────
// Motor: 249cc DOHC 4v single-cyl liquid-cooled PGM-FI FLEX | ~25 cv @ 8.500 rpm
// Óleo: 10W-30 JASO MA2, 1,5 L (serviço) / 1,8 L (completo) | Vela: NGK CPR8EAIX-9 gap 0,9 mm
// Bateria: YTZ6V 12V 5Ah | Pneus: 110/70-17 (F) / 140/70-17 (R) | Tanque: 14 L
// Corrente: 428H × 130 elos | 6 marchas | Fabricada em Manaus (Brasil)
// FLEXONE (2022+): aceita E100 nativo; injeção com modo automático gasolina/etanol

const CB250_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA2 — 1,5 L (serviço) / 1,8 L (completo); a cada 6.000 km',
    body: 'Motor 249cc DOHC liquid-cooled com câmbio integrado: use 10W-30 JASO MA2 full sintético. Capacidade: 1,5 L na troca com filtro / 1,8 L no enchimento inicial. Honda HP4, Mobil 1 Moto 10W-30, Motul 7100 10W-30 (R$55–80/L) ou Castrol Power1 Racing 10W-30. Em clima quente (>30°C): 10W-40 JASO MA2 também funciona. Intervalo: 6.000 km ou 12 meses. Motor novo (0–1.000 km rodagem): troque na 1ª revisão de 1.000 km com óleo Honda original. Nível: vareta na tampa de óleo lateral com moto em posição vertical.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CPR8EAIX-9 iridium — gap 0,9 mm; troca a cada 12.000 km',
    body: 'Vela iridium NGK CPR8EAIX-9 (R$50–80). Gap: 0,90 mm. Acesso: remover o tanque (2 parafusos) para acessar a tampa do cabeçote. A vela fica no centro do cabeçote — chave de vela 16 mm + extensão de 10–15 cm. NÃO ajuste o gap na iridium (ponta frágil). Sintomas de vela gasta: dificuldade de partida a frio, engasgo ao dar aceleradas rápidas, aumento de 10–15% no consumo. Com uso de etanol (E100) frequente: verifique a cada 10.000 km — etanol requer centelha mais forte.',
  },
  {
    severity: 'OK',
    title: 'FLEX e FLEXONE — use gasolina ≥87 octanos ou E100 (etanol puro); nunca E100 com vela velha',
    body: 'A CB 250 TWISTER é FLEX: aceita qualquer mistura entre gasolina e etanol. FLEXONE (2022+): sensor Lambda e injeção multi-point com detecção automática do combustível. Para início de jornada a frio (<10°C): prefira gasolina C (comum ou aditivada). E100 tem menos energy density — consumo ~30% maior. Mistura ideal para desempenho máximo: E27 (gasolina comum do Brasil, já misturada). Nunca use combustível adulterado: injetor do TWISTER é sensível a impurezas. Drene o tanque se a moto ficar parada por mais de 30 dias (especialmente com E100, que absorve água).',
  },
  {
    severity: 'OK',
    title: 'Corrente 428H × 130 elos — lubrificar a cada 500 km; kit completo a cada 20.000 km',
    body: 'A CB 250 usa corrente passo 428 reforçada (H). Pinhão 14T, coroa 42T. Folga: 20–30 mm de jogo vertical no ponto mais tenso, com piloto sentado no cavalete lateral. Lubrifique a cada 500 km com spray para correntes 428 (DID Lube Chain Spray ou WD40 Specialist). Kit completo: DID 428 NZ (R$200–300 kit corrente/pinhão/coroa). A 428 em uso urbano com freadas/acelerações frequentes desgasta mais rápido. Inspeção mensal da folga. Corrente com esticamento excessivo (>35 mm): troca imediata do kit.',
  },
  {
    severity: 'OK',
    title: 'Freios: disco 276 mm (F) com CBS + disco 220 mm (R) ou tambor (versões mais antigas)',
    body: 'Freio dianteiro: disco 276 mm, pinça 2 pistões. Traseiro: disco 220 mm (versões ABS) ou tambor (versões base). Sistema CBS: ao acionar o pedal traseiro, aplica uma fração do freio dianteiro automaticamente. Fluido DOT 4: troca a cada 2 anos. Pastilhas dianteiras: EBC FA231HH ou Honda originais (R$60–80 o par). Com pneus originais Michelin Pilot Street 2 no TWISTER FLEXONE: frenagem excelente para o segmento. Inspecione pastilhas a cada 8.000 km.',
  },
  {
    severity: 'OK',
    title: 'Arrefecimento líquido — nível do fluido e condição do radiador; moto popular exige atenção extra',
    body: 'Motor refrigerado a líquido. Reservatório de expansão: visível no lado esquerdo. Nível: entre MIN e MAX com motor frio. Fluido Long Life Coolant Honda (50/50 com água destilada) ou Prestone Extended Life. Troca: a cada 2 anos. Em trânsito intenso com temperatura >32°C: o ventilador liga normalmente — não é alarme. Sintoma de problema real: temperatura sobe ao vermelho E o ventilador não liga, ou temperatura pulsante. Limpeza do radiador (aletas): ar comprimido ou lavagem suave com água a cada 20.000 km.',
  },
  {
    severity: 'OK',
    title: 'Pneus 110/70-17 (F) / 140/70-17 (R) — Michelin Pilot Street 2 (FLEXONE); vida útil ~20.000 km',
    body: 'CB 250 TWISTER usa pneus 110/70-17 (frente) / 140/70-17 (traseiro). Versão FLEXONE vem de fábrica com Michelin Pilot Street 2 — um dos melhores pneus do segmento em aderência e durabilidade (~20.000 km). Versões mais antigas: Pirelli Super City ou Dunlop D107. Pressão: F 29 / R 29 PSI solo; R 32 PSI com garupa. Aftermarket recomendado: Pirelli Diablo Rosso II (esportivo), Michelin Road 5 Scooter (misto). NÃO use pneus de scooter de 13" — tamanho errado; use sempre 17".',
  },
  {
    severity: 'OK',
    title: 'Tanque 14 L — autonomia real 350–440 km; flexível aceita postos de toda a rede',
    body: 'Tanque de 14 L com bico de abastecimento lateral. Consumo real: 25–31 km/L (estrada/misto) com gasolina C. Com E100: ~18–22 km/L (menor power density). Autonomia com gasolina: ~380–440 km. Com etanol: ~280–320 km. A luz de reserva acende com ~2 L restantes (~50–65 km). Em viagens: abastecimento com reserva e não deixe secar — risco de sujeira no fundo do tanque entupir o injetor. Filtro de combustível: troca a cada 20.000 km (item esquecido).',
  },
]

const CB250_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Corrente 428 com desgaste rápido em uso urbano agressivo — kit a cada 18.000–20.000 km',
    body: 'A corrente 428H é boa mas não é a mais grossa para o torque urbano. Com acelerações frequentes e pouca lubrificação: desgaste acelerado do pinhão e da coroa. Sinal de desgaste grave: "pulo" da corrente ao reduzir, som de "cascata" ao acecelrar. Troca sem o kit completo (só a corrente): erro grave — corrente nova em pinhão desgastado desgasta 3× mais rápido. Kit DID 428 NZ: R$200–300. Em uso exclusivamente urbano com poucos km de estrada: inspeção a cada 3.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Filtro de combustível bloqueado — moto hesita ao acelerar; troca junto com limpeza do injetor',
    body: 'Em motos com mais de 20.000 km sem troca do filtro de combustível: partículas bloqueiam o fluxo. Sintoma: hesitação ao acelerar de forma brusca, queda de potência em alta rotação. Solução: troca do filtro de combustível interno do tanque (R$30–60) + limpeza ultrassônica do injetor (R$80–150). Aproveite para trocar o filtro de ar se estiver saturado. Prevenção: só abastece em postos bem frequentados e use aditivo de limpeza de injetor (Bardahl ou STP) a cada 10.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Válvulas com regulagem fora de especificação após 20.000 km — ruído e perda de potência',
    body: 'Motor DOHC 4v: folgas de válvulas (motor frio): admissão 0,15 mm / escape 0,23 mm. Com desvio: motor bate "tictac" rítmico no cabeçote a frio (folga grande) ou engasgos (folga apertada demais). Regulagem por shims no CB 250 TWISTER. Intervalo Honda: 24.000 km (verificar em 12.000 km). Custo oficina especializada: R$200–400. Se o motor estiver visivelmente mais ruidoso após 20.000 km: verifique as folgas antes de concluir que precisa de troca de peças mais caras.',
  },
  {
    severity: 'OK',
    title: 'Escapamento: possibilidade de ferrugem nas juntas depois de 30.000 km em clima úmido',
    body: 'O escapamento OEM do CB 250 TWISTER (aço inox com acabamento cromado) resiste bem, mas juntas de grafite entre coletor e motor podem oxidar com o tempo em regiões úmidas (litoral). Sintoma: pequena fumacinha preta na junta + som de "sopro" próximo ao cabeçote. Solução: junta nova (Honda original, R$20–40) + parafusos da junta (substituir se oxidados). Escape aftermarket de inox (Barro ou DBA): R$450–700 resolve definitivamente e melhora sonoridade.',
  },
  {
    severity: 'OK',
    title: 'TWISTER FLEXONE 2022+: sensor lambda pode gerar código de falha após uso de gasolina adulterada',
    body: 'O FLEXONE tem sensor lambda Wideband mais sensível que a geração anterior. Gasolina adulterada (adulteração de octanagem ou teor de etanol fora da regulamentação ANP) gera código de falha P0131 ou P0132 no painel (luz MIL acesa). Solução: abasteça com gasolina de posto certificado, rode por 100 km para auto-recalibração, limpe o código com scanner. Se o código persistir: sensor lambda com defeito ou injetor entupido.',
  },
]

const CB250_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CB 250 TWISTER', yearFrom: 2016, yearTo: null, component: 'Óleo 10W-30 JASO MA2 (1,5 L serviço / 1,8 L completo)', intervalKm: 6000, intervalMonths: 12, notes: 'Full sintético. Honda HP4 ou Motul 7100. Rodagem 1.000 km: troca obrigatória.', priority: 'HIGH', order: 1 },
  { modelName: 'CB 250 TWISTER', yearFrom: 2016, yearTo: null, component: 'Filtro de óleo — troca', intervalKm: 6000, intervalMonths: 12, notes: 'Honda original ou Hiflofiltro HF141. Aplicar óleo no O-ring antes de instalar.', priority: 'MEDIUM', order: 2 },
  { modelName: 'CB 250 TWISTER', yearFrom: 2016, yearTo: null, component: 'Vela iridium NGK CPR8EAIX-9 — gap 0,9 mm', intervalKm: 12000, intervalMonths: null, notes: 'R$50–80. Não ajustar gap da iridium. Uso com E100 frequente: verificar a cada 10.000 km.', priority: 'MEDIUM', order: 3 },
  { modelName: 'CB 250 TWISTER', yearFrom: 2016, yearTo: null, component: 'Regulagem de válvulas DOHC 4v (Adm 0,15 mm / Esc 0,23 mm)', intervalKm: 24000, intervalMonths: null, notes: 'Verificar em 12.000 km. Por shims. Motor frio obrigatório. Oficina especializada.', priority: 'HIGH', order: 4 },
  { modelName: 'CB 250 TWISTER', yearFrom: 2016, yearTo: null, component: 'Filtro de ar — troca', intervalKm: 12000, intervalMonths: null, notes: 'Honda original ou K&N equivalente. Uso com muita poeira: 8.000 km.', priority: 'MEDIUM', order: 5 },
  { modelName: 'CB 250 TWISTER', yearFrom: 2016, yearTo: null, component: 'Filtro de combustível — troca', intervalKm: 20000, intervalMonths: null, notes: 'Interno ao tanque. Item esquecido com frequência. Troca junto com limpeza do injetor.', priority: 'MEDIUM', order: 6 },
  { modelName: 'CB 250 TWISTER', yearFrom: 2016, yearTo: null, component: 'Fluido de arrefecimento — troca', intervalKm: null, intervalMonths: 24, notes: 'Long Life Coolant 50/50. Verificar nível mensalmente.', priority: 'HIGH', order: 7 },
  { modelName: 'CB 250 TWISTER', yearFrom: 2016, yearTo: null, component: 'Kit transmissão 428H (corrente × 130 + pinhão 14T + coroa 42T)', intervalKm: 20000, intervalMonths: null, notes: 'DID 428 NZ. Lubrificar a cada 500 km. Folga: 20–30 mm. Inspeção mensal.', priority: 'HIGH', order: 8 },
  { modelName: 'CB 250 TWISTER', yearFrom: 2016, yearTo: null, component: 'Pastilhas dianteiras CBS (disco 276 mm) + fluido DOT 4', intervalKm: 12000, intervalMonths: 24, notes: 'EBC FA231HH. Versão ABS: purge guiado. DOT 4: bienal obrigatório.', priority: 'HIGH', order: 9 },
  { modelName: 'CB 250 TWISTER', yearFrom: 2016, yearTo: null, component: 'Bateria YTZ6V (12V 5Ah) — verificação', intervalKm: null, intervalMonths: 12, notes: 'Yuasa YTZ6V (R$180–250). Repouso: 12,6V. Tensão a 5.000 rpm: 13,5–14,5V.', priority: 'MEDIUM', order: 10 },
]

// ─── Calibragem ───────────────────────────────────────────────────────────────

const CB250_CALIBRAGEM = {
  modelName: 'CB 250 TWISTER',
  yearFrom: 2016, yearTo: null,
  tireSize: '110/70-17 (F) · 140/70-17 (R)',
  frontPsi: 29, rearPsi: 29, frontPsiLoad: 29, rearPsiLoad: 32,
  sparePsi: null,
  notes: 'Solo: F 29 / R 29 PSI. Com garupa: F 29 / R 32 PSI. FLEXONE (original): Michelin Pilot Street 2. Aftermarket: Pirelli Diablo Rosso II (esportivo). Verificar sempre a frio (mínimo 2 h parado).',
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
  console.log('🏍️  Seed Honda CB 250 TWISTER / TWISTER FLEXONE...')

  await upsertVehicleModel('CB 250 TWISTER', 'Honda', 2016, null)

  await upsertTips('CB 250 TWISTER', 'MACETES', CB250_MACETES)
  await upsertTips('CB 250 TWISTER', 'PROBLEMAS', CB250_PROBLEMAS)
  await upsertMaintenance(CB250_MANUTENCAO)
  await upsertTirePressure(CB250_CALIBRAGEM)

  const tipCount = await prisma.tip.count({ where: { modelName: 'CB 250 TWISTER' } })
  const maintCount = await prisma.maintenanceItem.count({ where: { modelName: 'CB 250 TWISTER' } })

  console.log(`✅ CB 250 TWISTER — ${tipCount} dicas, ${maintCount} itens de manutenção`)
  console.log('✅ Seed concluído!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
