// seed-honda-xre190.ts — Honda XRE 190 (2017+) e XRE 190 ADVENTURE FLEX (2019+)
// Motor 184cc SOHC 2v PGM-FI FLEX (16 cv) — trail urbano popular, pneus 90/90-19 / 110/90-17
// Vela: NGK CPR8EAIX-9 gap 0,9mm | Óleo: 10W-30 JASO MA2 1,0L troca | Corrente 428H×128
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

// ─── XRE 190 / Flex (2017+) ─────────────────────────────────────────────────
// Motor: 184cc SOHC 2v PGM-FI FLEX | 16 cv @ 8.000 rpm | 5 marchas | corrente 428H×128
// Óleo: 10W-30 JASO MA/MA2, 1,0L (troca) / 1,2L (completo) | Vela: NGK CPR8EAIX-9 gap 0,9mm
// Pneus: 90/90-19 (F) / 110/90-17 (R) | Bateria: YTZ6V (12V 5Ah) | Tanque: 12L (Adv: 13,5L)
// Freios base: disco 240mm (F) + tambor (R) | Adventure: disco + ABS 1 canal (F) + tambor (R)

const XRE190_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA2 — 1,0 L na troca / 1,2 L completo; cada 6.000 km',
    body: 'Motor 184cc SOHC 2v refrigerado a ar. Capacidade: 1,0 L sem filtro / 1,2 L com troca do filtro. Usar Honda Ultra 4T 10W-30 JASO MA2 (R$30–40/L), Lubrax Moto 4T 10W-30 (R$20–28/L) ou Motul 3000 10W-30 (R$25–35/L). NUNCA usar JASO MB (exclusivo para CVT de scooters). Troca a cada 6.000 km ou 6 meses. Com uso intenso off-road: 4.000 km. Verifique nível pelo visor do cárter com moto vertical no cavalete central.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CPR8EAIX-9 — gap 0,9 mm; troca a cada 8.000 km (comum) ou 16.000 km (iridium)',
    body: 'Vela iridium original: NGK CPR8EAIX-9 (R$90–130). Gap: 0,90 mm. Não ajuste o gap em velas iridium. Alternativa convencional mais barata: NGK CPR8EA-9 (R$25–40), troca a cada 8.000 km. Vela preta e embebida = mistura rica ou óleo queimando; branca = mistura pobre / superaquecimento. Bosch WR7DC+ é equivalente convencional para economizar na manutenção corriqueira. Troca rápida: acesso pela tampa lateral esquerda.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428H × 128 elos — folga 25–35 mm; lubrificar a cada 500 km',
    body: 'Pinhão: 16 dentes. Coroa: 48 dentes. Corrente 428 (passo mais fino que a 520 de motos maiores). Folga correta com piloto sentado e moto no cavalete central: 25–35 mm de jogo vertical no ponto médio inferior. Lubrifique com spray específico para corrente O-ring (Chain Master, Motul Chain Lube, ou Bel-Ray) a cada 500 km ou após chuva/trilha. Kit de transmissão DID 428 NZ (com anel, mais durável para off-road): coroa 48T + pinhão 16T (R$180–250 o kit). Corrente seca desgasta 3× mais rápido.',
  },
  {
    severity: 'OK',
    title: 'Injeção PGM-FI FLEX — adaptação automática gasolina/etanol; evitar combustível velho',
    body: 'O sistema PGM-FI FLEX ajusta automaticamente a mistura para gasolina, etanol ou qualquer proporção. Não precisa de ajuste manual ao mudar o combustível. Atenção: se a moto ficar parada mais de 3 semanas com etanol no tanque, a injeção pode entupir parcialmente. Em motos usadas raramente: prefira gasolina (menos higroscópica). Limpeza de injetor (produto no tanque como Tecnopower): a cada 10.000 km. Limpeza ultrassônica se já com engasgo em aceleração suave: R$80–120 em oficinas especializadas.',
  },
  {
    severity: 'OK',
    title: 'Pneus 90/90-19 (F) e 110/90-17 (R) — pressão 28/28 PSI solo; trail ou asfalto?',
    body: 'Pneus trail originais: tamanho 90/90-19 dianteiro (aro 19, específico para trail) e 110/90-17 traseiro (aro 17). Pressão recomendada Honda: 28 PSI dianteiro / 28 PSI traseiro (solo); com garupa acrescentar +2–3 PSI no traseiro. Para uso mais off-road: Pirelli MT90 Scorpion (R$180–240 traseiro), Dunlop TrailMax (R$150–200), Michelin Anakee Wild. Para uso mais urbano/asfalto: Pirelli Pilot Street 2 (mais silencioso, durável, mas menor tração em terra). Aro 19 dianteiro: melhor amortecimento em trilha que o aro 17 mais urbano.',
  },
  {
    severity: 'OK',
    title: 'Garfo convencional telescópico (versão base) — trocar óleo a cada 15.000 km',
    body: 'A XRE 190 base usa garfo telescópico convencional. Óleo: Honda SS-7 (10W) ou Motul Fork Oil 10W, ~180–200 mL por tubo. Troca a cada 15.000 km. Com óleo escorrendo pelo retentor: pare imediatamente — garfo com vazamento compromete frenagem. Retentores 35 mm (par): R$60–90 (Ariete). Para uso off-road intenso: proteja as hastes com capas de neopreme (R$30–50) para evitar arranhões que destroem os retentores.',
  },
  {
    severity: 'OK',
    title: 'Regulagem de válvulas — verificar a cada 12.000 km ou 24 meses',
    body: 'Motor SOHC 2 válvulas (admissão e escape por cilindro). Regulagem por contra-porca (mais simples que shims de motor DOHC). Consulte o manual de serviços para as folgas específicas desta geração. Intervalo Honda: 6.000 km (verificação); 12.000 km (regulagem se necessário). Barulho metálico "tick-tick" no cabeçote a frio = folga excessiva, ajuste imediato. Válvula presa (folga negativa) causa dificuldade de partida a frio e queima o assento — não postergue a verificação.',
  },
  {
    severity: 'OK',
    title: 'Bateria YTZ6V (12V 5Ah) — sem kickstarter; verificar tensão e sistema de carga',
    body: 'Bateria original: Yuasa YTZ6V 12V 5Ah AGM (R$200–280). Tensão saudável em repouso: 12,6–12,8V. A 4.000 rpm com moto quente: 13,5–14,5V. Abaixo de 12,0V em repouso = bateria fraca. A XRE 190 NÃO TEM kickstarter — bateria descarregada = moto parada. Alternativas: Moura MBTX6U (R$170–210) ou Profield YTZ6V (R$130–160). Regulador/retificador: tensão fora de 13,5–14,5V a 4.000 rpm = problema no sistema de carga (regulador Honda: R$80–150; nacional: R$40–70).',
  },
  {
    severity: 'OK',
    title: 'Tanque 12 L (base) / 13,5 L (Adventure) — autonomia media 370–420 km',
    body: 'Consumo médio urbano: 31 km/L (gasolina), 24 km/L (etanol). Autonomia prática com gasolina: ~370 km (base) / ~420 km (Adventure). Reserva aproximada: 2,9 L. Não deixe o tanque quase vazio por longos percursos — a bomba de combustível pode superaquecer sem combustível ao redor. Para viagens longas: Adventure com 13,5L tem maior autonomia. Mistura etanol/gasolina: qualquer proporção funciona com PGM-FI FLEX — mas evite trocar muito abruptamente com tanque vazio (o sistema adapta melhor com reserva de combustível).',
  },
  {
    severity: 'WARN',
    title: 'Amortecedor traseiro original — insuficiente para trilha exigente',
    body: 'O amortecedor traseiro de série é adequado para uso urbano/misto mas satura em trilha técnica (buracos, pedras). Sintoma: batidas de fundo (fim do curso) em obstáculos maiores. Upgrade recomendado: YSS G-Plus (R$550–750 instalado) ou amortecedor Falcon ajustável (R$400–600). Antes de comprar: verifique se a mola de série não está apenas desgastada — mola nova (R$80–120) às vezes resolve para uso misto. Para trilha pesada: amortecedor de curso maior (troca do espigão traseiro).',
  },
  {
    severity: 'WARN',
    title: 'Dificuldade na redução de marchas (problema relatado 2024–2025) — ajuste do cabo',
    body: 'Problema crônico relatado por proprietários de XRE 190 mais recentes (2024–2025): dificuldade ao reduzir a marcha, especialmente de 2ª para 1ª em baixa velocidade. Causas: 1) cabo de embreagem com folga excessiva — ajustar pelo parafuso de regulagem até o ponto correto de desacoplamento total (folga na alavanca: 10–20 mm); 2) garfo do seletor de marchas com desgaste; 3) óleo degradado aumentando viscosidade do câmbio. Troca de óleo resolveu para muitos. Se persistir após ajuste do cabo e troca de óleo, levar à concessionária para verificação do mecanismo seletor.',
  },
]

const XRE190_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Corrente 428 sem lubrificação — desgaste rápido e risco de arrebentamento',
    body: 'Principal problema crônico: a corrente 428 da XRE 190 desgasta significativamente mais rápido que correntes 520 de modelos maiores, especialmente sem lubrificação regular em uso off-road. Corrente folgada pode pular do pinhão em freadas bruscas ou subidas íngremes, podendo causar queda. Lubrificação obrigatória a cada 500 km (após cada trilha molhada). Inspecionar tensão semanalmente com uso intenso. Kit DID 428 NZ (com anel) dura 2–3× mais que o original e vale o custo extra para quem trilha regularmente.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento em trilha longa — uso em baixa velocidade por tempo prolongado',
    body: 'Motor 184cc refrigerado a ar: em trilha com muitas paradas (subidas lentas, manobrando) o motor pode superaquecer com uso prolongado. Sintoma: cheiro de óleo queimando, marcha lenta instável após muito tempo em baixa velocidade e alta rotação. Prevenção: em trilha difícil, dê pauses de alguns minutos a cada 30–40 min. Nunca deixe o motor em marcha lenta muito tempo com pouco vento: em terreno plano com vento o ar-cooling funciona bem, mas em subidas lentas o motor precisa de pausa para resfriar.',
  },
  {
    severity: 'WARN',
    title: 'Partida intermitente a quente — oxidação nos conectores do sensor de temperatura',
    body: 'Problema relatado em XRE 190 com mais de 15.000 km: dificuldade de partida quando motor está quente (parte bem a frio, mas após parada breve não pega). Causas mais comuns: 1) conector do sensor de temperatura com oxidação — limpar com WD-40 Contato Elétrico, 2) sensor O2 com leitura errática (DTC no painel), 3) bateria abaixo de 12,2V em repouso. Antes de comprar peça: limpe todos os conectores da injeção. Sensor O2 Denso compatível: R$150–220.',
  },
  {
    severity: 'WARN',
    title: 'Retentores do garfo com vazamento prematuro em uso off-road',
    body: 'Retentores do garfo telescópico desgastam mais rápido com uso off-road frequente: lama abrasiva risca as hastes internas através do raspa-poeira. Sinal: haste com película de óleo, pingo no chão embaixo do pneu dianteiro. Troque imediatamente — óleo no pneu é risco sério de queda em frenagem. Retentores 35 mm (par + raspa-poeira): R$60–90. Para uso off-road regular: proteja com capas de neopreme nas hastes e limpe o raspa-poeira após trilhas com barro.',
  },
  {
    severity: 'WARN',
    title: 'Vibração excessiva no motor abaixo de 3.500 rpm — carenagem e fixadores',
    body: 'Vibração perceptível do motor 184cc em baixa rotação (abaixo de 3.500 rpm) é normal nesta categoria de monocilíndrico. Vibração excessiva que piora progressivamente pode indicar: 1) fixadores do motor soltos — aperte parafusos de fixação com torque correto; 2) coxins (borrachas de montagem do motor) desgastados após 40.000+ km; 3) parafusos de fixação das carenagens soltos — verificar e apertar com periodicidade. Carenagem mal fixada amplifica a vibração normal do motor e pode trincar.',
  },
  {
    severity: 'OK',
    title: 'Embreagem patinando com uso pesado — troca dos discos',
    body: 'Com uso intenso off-road (patiação em subidas, baixa rotação + muito torque), os discos de embreagem desgastam antes dos 25.000 km. Sintoma: o motor "acelera sozinho" mas a moto não avança ao soltar a embreagem. Kit de discos: R$150–250 (Honda original) ou R$100–180 (aftermarket). Nunca use óleo com "friction modifier" em óleos de carro ou óleos de scooter (JASO MB) — reduz a capacidade da embreagem molhada. Troca de óleo em dia reduz significativamente o desgaste da embreagem.',
  },
]

const XRE190_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'XRE 190', yearFrom: 2017, yearTo: null, component: 'Óleo 10W-30 JASO MA2 (1,0 L troca / 1,2 L completo)', intervalKm: 6000, intervalMonths: 6, notes: 'Honda Ultra 4T 10W-30 ou equivalente JASO MA2. Com uso off-road intenso: 4.000 km.', priority: 'HIGH', order: 1 },
  { modelName: 'XRE 190', yearFrom: 2017, yearTo: null, component: 'Filtro de óleo — troca (junto com óleo)', intervalKm: 6000, intervalMonths: 12, notes: 'Hiflofiltro HF141 (R$18–28) ou Honda original (R$35–50). Aplicar fina camada de óleo no O-ring.', priority: 'MEDIUM', order: 2 },
  { modelName: 'XRE 190', yearFrom: 2017, yearTo: null, component: 'Vela NGK CPR8EAIX-9 — gap 0,9 mm (iridium)', intervalKm: 16000, intervalMonths: null, notes: 'Convencional CPR8EA-9: trocar a cada 8.000 km. Iridium: 16.000 km. Verificar aspecto a cada 6.000 km.', priority: 'MEDIUM', order: 3 },
  { modelName: 'XRE 190', yearFrom: 2017, yearTo: null, component: 'Verificação de válvulas SOHC 2v', intervalKm: 6000, intervalMonths: 12, notes: 'Verificar folgas conforme manual de serviços. Se fora da especificação: regular por contra-porca (motor frio).', priority: 'HIGH', order: 4 },
  { modelName: 'XRE 190', yearFrom: 2017, yearTo: null, component: 'Filtro de ar — inspeção e limpeza', intervalKm: 6000, intervalMonths: 12, notes: 'Off-road com pó: a cada 3.000 km. Filtro de papel: não lavar; substituir se sujo ou rasgado.', priority: 'MEDIUM', order: 5 },
  { modelName: 'XRE 190', yearFrom: 2017, yearTo: null, component: 'Filtro de ar — troca', intervalKm: 12000, intervalMonths: 24, notes: 'Honda original (R$35–55) ou K&N HA-8557 lavável (R$220–280) como upgrade permanente.', priority: 'MEDIUM', order: 6 },
  { modelName: 'XRE 190', yearFrom: 2017, yearTo: null, component: 'Corrente 428H × 128 — lubrificação', intervalKm: 500, intervalMonths: null, notes: 'Spray de corrente a cada 500 km ou após trilha/chuva. Folga: 25–35 mm no ponto médio inferior.', priority: 'HIGH', order: 7 },
  { modelName: 'XRE 190', yearFrom: 2017, yearTo: null, component: 'Tensão da corrente — ajuste', intervalKm: 3000, intervalMonths: null, notes: 'Verificar folga a cada 3.000 km ou se notar batida na carenagem. Corrente: ajustar ou substituir.', priority: 'HIGH', order: 8 },
  { modelName: 'XRE 190', yearFrom: 2017, yearTo: null, component: 'Kit de transmissão (corrente 428H + coroa 48T + pinhão 16T)', intervalKm: 20000, intervalMonths: null, notes: 'Off-road intenso: 12.000–15.000 km. DID 428 NZ (com O-ring) mais durável. Trocar kit completo.', priority: 'HIGH', order: 9 },
  { modelName: 'XRE 190', yearFrom: 2017, yearTo: null, component: 'Freio dianteiro — pastilha (disco 240 mm) + fluido DOT 4', intervalKm: 12000, intervalMonths: 24, notes: 'Inspecionar a cada 6.000 km. EBC FA448 ou Honda original. Fluido DOT 4: 24 meses obrigatório.', priority: 'HIGH', order: 10 },
  { modelName: 'XRE 190', yearFrom: 2017, yearTo: null, component: 'Freio traseiro — lona (tambor) + ajuste do pedal', intervalKm: 15000, intervalMonths: null, notes: 'Folga no pedal: 20–30 mm. Lona com óleo = troca imediata + investigar vazamento. Fras-le ou Honda original.', priority: 'MEDIUM', order: 11 },
  { modelName: 'XRE 190', yearFrom: 2017, yearTo: null, component: 'Óleo do garfo telescópico (~180 mL/tubo)', intervalKm: 15000, intervalMonths: 24, notes: 'Honda SS-7 10W ou Motul Fork Oil 10W. Retentores 35 mm se vazando (par: R$60–90).', priority: 'HIGH', order: 12 },
  { modelName: 'XRE 190', yearFrom: 2017, yearTo: null, component: 'Cabo de embreagem — lubrificação e ajuste', intervalKm: 6000, intervalMonths: 12, notes: 'Lubrificar com óleo de cabos. Folga na alavanca: 10–20 mm. Ajuste resolve problemas de troca de marchas.', priority: 'MEDIUM', order: 13 },
  { modelName: 'XRE 190', yearFrom: 2017, yearTo: null, component: 'Bateria YTZ6V (12V 5Ah AGM) — verificação de tensão', intervalKm: null, intervalMonths: 6, notes: 'Repouso: 12,6V. A 4.000 rpm: 13,5–14,5V. Sem kickstarter — bateria fraca = parada total.', priority: 'HIGH', order: 14 },
]

// Adventure-specific maintenance items (beyond the base XRE 190 items)
const XRE190_ADV_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'XRE 190 ADVENTURE', yearFrom: 2019, yearTo: null, component: 'Óleo 10W-30 JASO MA2 (1,0 L troca / 1,2 L completo)', intervalKm: 6000, intervalMonths: 6, notes: 'Mesmo motor da XRE 190 base. Com uso off-road intenso: 4.000 km.', priority: 'HIGH', order: 1 },
  { modelName: 'XRE 190 ADVENTURE', yearFrom: 2019, yearTo: null, component: 'Filtro de óleo — troca', intervalKm: 6000, intervalMonths: 12, notes: 'Hiflofiltro HF141 ou Honda original. Mesma especificação da versão base.', priority: 'MEDIUM', order: 2 },
  { modelName: 'XRE 190 ADVENTURE', yearFrom: 2019, yearTo: null, component: 'Vela NGK CPR8EAIX-9 — gap 0,9 mm', intervalKm: 16000, intervalMonths: null, notes: 'Mesma vela da XRE 190 base. Convencional CPR8EA-9: 8.000 km.', priority: 'MEDIUM', order: 3 },
  { modelName: 'XRE 190 ADVENTURE', yearFrom: 2019, yearTo: null, component: 'Freio dianteiro — pastilha (disco 240 mm) + fluido DOT 4', intervalKm: 12000, intervalMonths: 24, notes: 'Pastilha com ABS: EBC FA448. Rebuild da pinça: 25.000 km. Fluido DOT 4: bienal.', priority: 'HIGH', order: 10 },
  { modelName: 'XRE 190 ADVENTURE', yearFrom: 2019, yearTo: null, component: 'Freio traseiro — lona (tambor) + ajuste do pedal', intervalKm: 15000, intervalMonths: null, notes: 'Adventure mantém tambor traseiro. ABS somente no dianteiro (1 canal). Ajustar cabo/pedal.', priority: 'MEDIUM', order: 11 },
  { modelName: 'XRE 190 ADVENTURE', yearFrom: 2019, yearTo: null, component: 'Sensor ABS dianteiro — limpeza após trilha', intervalKm: null, intervalMonths: 3, notes: 'Lama seca no sensor de velocidade da roda dianteira causa DTC falso. Limpar com água limpa, nunca lavajato direto.', priority: 'MEDIUM', order: 15 },
  { modelName: 'XRE 190 ADVENTURE', yearFrom: 2019, yearTo: null, component: 'Bateria YTZ6V (12V 5Ah AGM) — verificação', intervalKm: null, intervalMonths: 6, notes: 'Repouso: 12,6V. A 4.000 rpm: 13,5–14,5V. Sem kickstarter — bateria fraca = parada total.', priority: 'HIGH', order: 14 },
]

// ─── Calibragem ───────────────────────────────────────────────────────────────

const XRE190_CALIBRAGEM = {
  modelName: 'XRE 190',
  yearFrom: 2017, yearTo: null,
  tireSize: '90/90-19 (F) · 110/90-17 (R)',
  frontPsi: 28, rearPsi: 28, frontPsiLoad: 28, rearPsiLoad: 31,
  sparePsi: null,
  notes: 'Solo: F 28 / R 28 PSI. Com garupa: F 28 / R 31 PSI (aro 19 dianteiro). Pneus trail: Pirelli MT90 Scorpion, Dunlop TrailMax, Michelin Anakee Wild. Asfalto: Pirelli Pilot Street 2.',
}

const XRE190_ADV_CALIBRAGEM = {
  modelName: 'XRE 190 ADVENTURE',
  yearFrom: 2019, yearTo: null,
  tireSize: '90/90-19 (F) · 110/90-17 (R)',
  frontPsi: 28, rearPsi: 28, frontPsiLoad: 28, rearPsiLoad: 31,
  sparePsi: null,
  notes: 'Mesma especificação de pneus da XRE 190 base. Adventure: tanque 13,5L, ABS 1 canal dianteiro, altura do banco 836 mm.',
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
  console.log('🏍️  Seed Honda XRE 190 e XRE 190 ADVENTURE FLEX...')

  await upsertVehicleModel('XRE 190', 'Honda', 2017, null)
  await upsertVehicleModel('XRE 190 ADVENTURE', 'Honda', 2019, null)

  await upsertTips('XRE 190', 'MACETES', XRE190_MACETES)
  await upsertTips('XRE 190', 'PROBLEMAS', XRE190_PROBLEMAS)

  await upsertMaintenance(XRE190_MANUTENCAO)
  await upsertMaintenance(XRE190_ADV_MANUTENCAO)

  await upsertTirePressure(XRE190_CALIBRAGEM)
  await upsertTirePressure(XRE190_ADV_CALIBRAGEM)

  const tipCount = await prisma.tip.count({ where: { modelName: { in: ['XRE 190', 'XRE 190 ADVENTURE'] } } })
  const maintCount = await prisma.maintenanceItem.count({ where: { modelName: { in: ['XRE 190', 'XRE 190 ADVENTURE'] } } })

  console.log(`✅ XRE 190 + XRE 190 ADVENTURE — ${tipCount} dicas, ${maintCount} itens de manutenção`)
  console.log('✅ Seed concluído!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
