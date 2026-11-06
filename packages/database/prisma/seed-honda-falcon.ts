// seed-honda-falcon.ts — Honda NX Falcon — NX4 Falcon (carburada 1999-2008) + NX 400i Falcon (injetada 2013-2015)
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

// ─── NX4 Falcon (1999–2008) — Carburada ─────────────────────────────────────
const NX4_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA2 obrigatório — câmbio integrado no cárter',
    body: 'O motor RFVC da NX4 Falcon possui câmbio integrado no cárter. Use sempre 10W-40 JASO MA2 (ou JASO MA). Jamais use JASO MB — esse é específico para scooters com CVT e sem câmbio. Troque a cada 3.000 km. Capacidade: 2,0 L com filtro; 1,7 L sem filtro.',
  },
  {
    severity: 'OK',
    title: 'Motor RFVC 397 cc de 4 válvulas radiais — durabilidade excepcional',
    body: 'O motor RFVC (Radial Four Valve Chamber) é um dos projetos mais robustos da Honda. Dura mais de 100.000 km com manutenção em dia. A disposição radial das 4 válvulas melhora a combustão e reduz o aquecimento. Verifique a folga das válvulas a cada 12.000 km (motor frio): admissão 0,10 mm / escapamento 0,14 mm.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK DPR8EA-9 — gap 0,80–0,90 mm',
    body: 'Vela original: NGK DPR8EA-9 (gap 0,80 mm). Alternativa compatível: Denso X24EPR-U9. Troque a cada 12.000 km ou ao primeiro sinal de dificuldade na partida. Cor da vela indica a mistura: vela preta/fuligem = mistura rica (carburador); vela branca = mistura pobre; castanha clara = combustão ideal.',
  },
  {
    severity: 'OK',
    title: 'Afogador (choke): use na partida a frio, retire após aquecimento',
    body: 'Na versão carburada, acione o afogador para ligar a frio. Após 2–3 minutos ou quando o motor já estiver quente, retire o afogador completamente. Manter o choke acionado por mais de 5 minutos enriquece demais a mistura, resseca a vela e aumenta o desgaste do motor.',
  },
  {
    severity: 'OK',
    title: 'Calibragem: 25/28 PSI (solo) · 28/33 PSI (com carga)',
    body: 'Pneus: 90/90-21 (dianteiro) e 120/90-17 (traseiro). Solo: dianteiro 25 PSI, traseiro 28 PSI. Com garupa ou carga: dianteiro 28 PSI, traseiro 33 PSI. Verifique sempre com o pneu frio — calibrar pneu quente resulta em pressão inferior ao ideal depois do resfriamento.',
  },
  {
    severity: 'OK',
    title: 'Off-road: reduza a calibragem para mais tração em terra',
    body: 'Em trilha ou terra, reduza para dianteiro 20 PSI e traseiro 24 PSI — a carcaça se deforma e amplia a área de contato com o solo. Ao retornar ao asfalto, recalibre IMEDIATAMENTE para 25/28 PSI. Pilotar no asfalto com pressão baixa gera superaquecimento da carcaça, desgaste acelerado e risco de estouro.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 — lubrifique a cada 500 km ou após chuva',
    body: 'A NX4 Falcon usa corrente 520. Lubrifique com spray para corrente fechada (não WD-40) a cada 500 km ou sempre após chuva forte. Verifique a tensão: folga ideal de 20–30 mm no meio do trecho inferior. Troque a corrente e as coroas (pinhão + coroa) sempre em conjunto — recolocar corrente nova em coroas desgastadas acelera o desgaste.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: 12.000 km (asfalto) · 6.000 km (trilha)',
    body: 'Troque o filtro de ar a cada 12.000 km no asfalto. Em uso misto ou trilha frequente, reduza para 6.000 km ou inspecione após cada saída longa de terra. Filtro sujo empobrece a mistura no carburador, aumenta o consumo e pode causar superaquecimento do motor.',
  },
  {
    severity: 'OK',
    title: 'Tanque 15,3 L com 5,3 L de reserva — autonomia de até 380 km',
    body: 'O tanque de 15,3 L oferece autonomia de 320–380 km dependendo do estilo de pilotagem. A torneira de combustível tem posição ON, OFF e RES (reserva de 5,3 L). Ao sentir variação de potência, ligue para RES e abasteça o mais rápido possível. Não esgote completamente o tanque — sedimentos do fundo podem entupir o carburador.',
  },
]

const NX4_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Retificador de voltagem: calcanhar de Aquiles da NX4 Falcon',
    body: 'O regulador/retificador de voltagem é o componente que mais falha na NX4 Falcon. Quando falha, a bateria não carrega e a moto apaga em movimento. Sintomas iniciais: bateria nova que descarrega em poucos dias, relógio de combustível oscilando, luz de painel piscando. Verifique a tensão em marcha (deve ser 13,5–14,5 V). Substitua preventivamente após 40.000–50.000 km. Alternativo confiável: Full Pro ou Dominator (R$150–250) vs. original Honda (R$400–600).',
  },
  {
    severity: 'WARN',
    title: 'Carburador entupido após moto parada por semanas',
    body: 'Gasolina parada no carburador por mais de 3–4 semanas forma verniz nos jatos e entope passagens internas. Sintomas: marcha lenta errática, motor morre ao aquecer, consumo alto, dificuldade de partir. Solução: limpeza ultrassônica dos jatos + regulagem da mistura e marcha lenta (1.200–1.400 rpm). Prevenção: ao guardar por mais de 2 semanas, feche a torneira e esgote o carburador, ou adicione estabilizador de combustível.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedor traseiro desgastado — caro e difícil de achar',
    body: 'O amortecedor traseiro original tem vida útil de 30.000–50.000 km. Sintomas de desgaste: moto "balança" na traseira, barulho de batida em lombadas, instabilidade em curvas. Verificar também a bucha da balança traseira — qualquer folga lateral na balança indica bucha desgastada. Troca do amortecedor: R$300–600 (alternativo) ou R$800–1.200 (original Honda).',
  },
  {
    severity: 'WARN',
    title: 'Bengalas com retentores vazando — risco de segurança',
    body: 'Os retentores da bengala dianteira se desgastam com uso e vazam óleo sobre o disco de freio. Isso é risco imediato de segurança — qualquer óleo no disco compromete a frenagem. Sintoma: mancha oleosa na haste cromada, freio dianteiro com desempenho reduzido. Kit de retentores: R$80–150. Não adie a troca após constatar vazamento.',
  },
  {
    severity: 'WARN',
    title: 'Pneu traseiro desgasta rápido em uso misto asfalto + terra',
    body: 'O pneu traseiro 120/90-17 em uso misto dura em média 8.000–12.000 km; o dianteiro 90/90-21 aguenta 15.000–20.000 km. Verifique o desgaste pelo indicador TWI (triângulo na lateral do pneu). Não use pneus carecas — risco alto em curvas e no molhado, especialmente com o perfil trail.',
  },
  {
    severity: 'WARN',
    title: 'Tensor da corrente de distribuição manual — ajuste obrigatório',
    body: 'O motor RFVC das versões carburadas (até 2008) não possui tensor automático de corrente de distribuição. O esticador manual deve ser verificado a cada 12.000 km. Corrente de distribuição solta causa barulho de "cascata" ao acelerar e perda de potência. Se ignorada, a corrente pula de passo e causa dano severo ao motor.',
  },
]

// ─── NX 400i Falcon (2013–2015) — Injetada ───────────────────────────────────
const NX4i_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'PGM-FI elimina o carburador — partida imediata sem afogador',
    body: 'O NX 400i (2013–2015) usa injeção eletrônica PGM-FI, substituindo o carburador problemático das versões anteriores. Não há afogador manual — o sistema ajusta a mistura automaticamente na partida a frio. Partida confiável em qualquer temperatura e sem necessidade de aquecimento prolongado.',
  },
  {
    severity: 'OK',
    title: 'Mesmo óleo 10W-40 JASO MA2 da versão carburada',
    body: 'O motor 397 cc do NX 400i mantém a mesma especificação de lubrificante: 10W-40 JASO MA2. Capacidade: 2,0 L com filtro; 1,7 L sem filtro. Troque a cada 3.000 km ou 1 ano, o que ocorrer primeiro. Nunca use JASO MB — o câmbio integrado depende das propriedades de atrito do JASO MA.',
  },
  {
    severity: 'OK',
    title: 'Sensor de oxigênio (O2) — mantenha o filtro de ar em dia',
    body: 'O sistema PGM-FI usa sensor de O2 para ajustar a mistura em tempo real. Filtro de ar entupido cria leituras erradas no sensor, provoca mistura rica e aumento de consumo. Troque o filtro a cada 12.000 km no asfalto ou 6.000 km em uso off-road.',
  },
  {
    severity: 'OK',
    title: 'Calibragem idêntica à versão carburada',
    body: 'Pneus 90/90-21 (dianteiro) e 120/90-17 (traseiro). Solo: dianteiro 25 PSI / traseiro 28 PSI. Com carga: dianteiro 28 PSI / traseiro 33 PSI. Off-road: reduzir para 20/24 PSI e recalibrar ao retornar ao asfalto.',
  },
  {
    severity: 'OK',
    title: 'Freio a disco traseiro no NX 400i — use fluido DOT 4',
    body: 'O NX 400i 2013–2015 usa freio a disco no eixo traseiro (diferente do tambor das versões mais antigas). Use fluido DOT 4 e troque a cada 2 anos, mesmo sem uso intenso — o fluido absorve umidade ao longo do tempo e o ponto de ebulição cai, reduzindo a eficiência da frenagem.',
  },
  {
    severity: 'OK',
    title: 'Monitore a tensão da bateria — retificador ainda é ponto de atenção',
    body: 'Um multímetro simples (R$40) é o melhor investimento para donos de Falcon. Com o motor em marcha, a tensão deve ficar entre 13,5 V e 14,5 V. Abaixo de 13,5 V: retificador carregando insuficientemente. Acima de 14,8 V: retificador sobrecarregando a bateria. Verifique antes de suspeitar da bateria.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 — mesma especificação da versão carburada',
    body: 'Corrente 520, tensão ideal com folga de 20–30 mm no trecho inferior. Lubrifique a cada 500 km ou após chuva. Troque sempre em conjunto com a coroa e o pinhão — nunca coloque corrente nova em coroas desgastadas.',
  },
]

const NX4i_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Retificador do NX 400i: falhas relatadas antes de 40.000 km',
    body: 'Apesar da evolução em relação ao NX4, o NX 400i (2013–2015) apresentou reclamações formais de falha no regulador/retificador de voltagem. Monitore a tensão em marcha com multímetro. Alternativo confiável: Full Pro modelo 2012–2015 (R$150–250). Não aguarde a moto apagar em movimento para substituir.',
  },
  {
    severity: 'WARN',
    title: 'Peças cada vez mais raras — produção encerrada em 2015',
    body: 'O NX 400i saiu de linha em 2015. Com o passar dos anos, peças específicas ficam escassas: bomba de combustível, injetores, sensores, componentes da suspensão. Ao comprar um usado, verifique a disponibilidade de peças e prefira fornecedores especializados em motos Honda trail. Retificador alternativo ainda tem boa disponibilidade.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão nas juntas do escapamento',
    body: 'O escapamento é suscetível à corrosão nas juntas entre os segmentos, especialmente em motos que ficam ao relento ou em regiões litorâneas. Junta soltando provoca ronco anormal e pequena perda de potência. Verifique anualmente. Na próxima desmontagem, aplique pasta de alta temperatura nas juntas antes de remontar.',
  },
  {
    severity: 'WARN',
    title: 'Bengalas: retentores desgastam mais rápido em uso off-road intenso',
    body: 'Os retentores da bengala dianteira do NX 400i se desgastam mais rápido em uso off-road frequente. Inspecione a cada 10.000 km em uso misto. Vazamento de óleo sobre o disco dianteiro reduz a frenagem e é risco imediato de segurança. Kit de retentores: R$80–150.',
  },
]

// ─── Manutenção NX4 Falcon (1999–2008) ───────────────────────────────────────
const NX4_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'NX-4 FALCON', yearFrom: 1999, yearTo: 2008, component: 'Troca de óleo (10W-40 JASO MA2)', intervalKm: 3000, intervalMonths: 12, notes: 'Capacidade: 2,0 L com filtro / 1,7 L sem filtro', priority: 'CRITICAL', order: 1 },
  { modelName: 'NX-4 FALCON', yearFrom: 1999, yearTo: 2008, component: 'Filtro de óleo', intervalKm: 3000, intervalMonths: 12, notes: 'Trocar junto com o óleo a cada revisão', priority: 'HIGH', order: 2 },
  { modelName: 'NX-4 FALCON', yearFrom: 1999, yearTo: 2008, component: 'Vela de ignição (NGK DPR8EA-9)', intervalKm: 12000, intervalMonths: 24, notes: 'Gap: 0,80–0,90 mm. Limpar e verificar gap a cada 6.000 km', priority: 'HIGH', order: 3 },
  { modelName: 'NX-4 FALCON', yearFrom: 1999, yearTo: 2008, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Reduzir para 6.000 km em uso off-road frequente', priority: 'HIGH', order: 4 },
  { modelName: 'NX-4 FALCON', yearFrom: 1999, yearTo: 2008, component: 'Tensão e lubrificação da corrente de transmissão (520)', intervalKm: 500, intervalMonths: null, notes: 'Folga ideal: 20–30 mm. Lubrificar com spray específico para corrente', priority: 'MEDIUM', order: 5 },
  { modelName: 'NX-4 FALCON', yearFrom: 1999, yearTo: 2008, component: 'Conjunto corrente + coroa + pinhão', intervalKm: 20000, intervalMonths: null, notes: 'Substituir sempre em conjunto os três componentes', priority: 'HIGH', order: 6 },
  { modelName: 'NX-4 FALCON', yearFrom: 1999, yearTo: 2008, component: 'Folga das válvulas (IN: 0,10 mm / EX: 0,14 mm)', intervalKm: 12000, intervalMonths: 24, notes: 'Verificar com motor frio. Ajustar se fora da tolerância', priority: 'HIGH', order: 7 },
  { modelName: 'NX-4 FALCON', yearFrom: 1999, yearTo: 2008, component: 'Tensor da corrente de distribuição (manual)', intervalKm: 12000, intervalMonths: 24, notes: 'Motor sem tensor automático — verificar e ajustar manualmente', priority: 'HIGH', order: 8 },
  { modelName: 'NX-4 FALCON', yearFrom: 1999, yearTo: 2008, component: 'Regulagem do carburador e marcha lenta', intervalKm: 6000, intervalMonths: 12, notes: 'Marcha lenta: 1.200–1.400 rpm. Ajustar parafuso de mistura e acelerador', priority: 'MEDIUM', order: 9 },
  { modelName: 'NX-4 FALCON', yearFrom: 1999, yearTo: 2008, component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, notes: 'Trocar independente do uso — absorve umidade e perde eficiência com o tempo', priority: 'HIGH', order: 10 },
  { modelName: 'NX-4 FALCON', yearFrom: 1999, yearTo: 2008, component: 'Retentores das bengalas', intervalKm: 20000, intervalMonths: null, notes: 'Inspecionar manchas de óleo na haste cromada. Trocar kit se vazar', priority: 'HIGH', order: 11 },
  { modelName: 'NX-4 FALCON', yearFrom: 1999, yearTo: 2008, component: 'Retificador de voltagem', intervalKm: 40000, intervalMonths: null, notes: 'Verificar tensão em marcha: 13,5–14,5 V. Substituir preventivamente se houver oscilação', priority: 'CRITICAL', order: 12 },
  { modelName: 'NX-4 FALCON', yearFrom: 1999, yearTo: 2008, component: 'Amortecedor traseiro e bucha da balança', intervalKm: 30000, intervalMonths: null, notes: 'Inspecionar quanto a vazamentos e desgaste. Verificar folga lateral na balança', priority: 'MEDIUM', order: 13 },
  { modelName: 'NX-4 FALCON', yearFrom: 1999, yearTo: 2008, component: 'Bateria (12V)', intervalKm: null, intervalMonths: 24, notes: 'Verificar tensão em repouso: mín. 12,6 V. Investigar retificador antes de trocar a bateria', priority: 'MEDIUM', order: 14 },
  { modelName: 'NX-4 FALCON', yearFrom: 1999, yearTo: 2008, component: 'Calibragem dos pneus', intervalKm: null, intervalMonths: null, notes: 'Solo: D 25 / T 28 PSI. Com carga: D 28 / T 33 PSI. Off-road: D 20 / T 24 PSI', priority: 'HIGH', order: 15 },
]

// ─── Manutenção NX 400i Falcon (2013–2015) ───────────────────────────────────
const NX4i_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'NX 400i Falcon', yearFrom: 2013, yearTo: 2015, component: 'Troca de óleo (10W-40 JASO MA2)', intervalKm: 3000, intervalMonths: 12, notes: 'Capacidade: 2,0 L com filtro / 1,7 L sem filtro', priority: 'CRITICAL', order: 1 },
  { modelName: 'NX 400i Falcon', yearFrom: 2013, yearTo: 2015, component: 'Filtro de óleo', intervalKm: 3000, intervalMonths: 12, notes: 'Trocar junto com o óleo a cada revisão', priority: 'HIGH', order: 2 },
  { modelName: 'NX 400i Falcon', yearFrom: 2013, yearTo: 2015, component: 'Vela de ignição (NGK DPR8EA-9)', intervalKm: 12000, intervalMonths: 24, notes: 'Gap: 0,80–0,90 mm', priority: 'HIGH', order: 3 },
  { modelName: 'NX 400i Falcon', yearFrom: 2013, yearTo: 2015, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Reduzir para 6.000 km em uso off-road. Sensor de O2 é afetado por filtro sujo', priority: 'HIGH', order: 4 },
  { modelName: 'NX 400i Falcon', yearFrom: 2013, yearTo: 2015, component: 'Tensão e lubrificação da corrente de transmissão (520)', intervalKm: 500, intervalMonths: null, notes: 'Folga: 20–30 mm. Lubrificar a cada 500 km ou após chuva', priority: 'MEDIUM', order: 5 },
  { modelName: 'NX 400i Falcon', yearFrom: 2013, yearTo: 2015, component: 'Conjunto corrente + coroa + pinhão', intervalKm: 20000, intervalMonths: null, notes: 'Substituir sempre em conjunto', priority: 'HIGH', order: 6 },
  { modelName: 'NX 400i Falcon', yearFrom: 2013, yearTo: 2015, component: 'Folga das válvulas (IN: 0,10 mm / EX: 0,14 mm)', intervalKm: 12000, intervalMonths: 24, notes: 'Verificar com motor frio', priority: 'HIGH', order: 7 },
  { modelName: 'NX 400i Falcon', yearFrom: 2013, yearTo: 2015, component: 'Sistema de injeção PGM-FI — corpo de borboleta', intervalKm: 24000, intervalMonths: 24, notes: 'Limpeza do throttle body e verificação do injetor. Evitar gasolina adulterada', priority: 'MEDIUM', order: 8 },
  { modelName: 'NX 400i Falcon', yearFrom: 2013, yearTo: 2015, component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, notes: 'Freio a disco dianteiro e traseiro. Trocar a cada 2 anos independente do uso', priority: 'HIGH', order: 9 },
  { modelName: 'NX 400i Falcon', yearFrom: 2013, yearTo: 2015, component: 'Pastilhas de freio', intervalKm: 15000, intervalMonths: null, notes: 'Verificar espessura. Substituir quando abaixo de 2 mm', priority: 'HIGH', order: 10 },
  { modelName: 'NX 400i Falcon', yearFrom: 2013, yearTo: 2015, component: 'Retentores das bengalas', intervalKm: 20000, intervalMonths: null, notes: 'Inspecionar vazamento. Uso off-road desgasta retentores mais rápido', priority: 'HIGH', order: 11 },
  { modelName: 'NX 400i Falcon', yearFrom: 2013, yearTo: 2015, component: 'Retificador de voltagem', intervalKm: 40000, intervalMonths: null, notes: 'Verificar tensão em marcha: 13,5–14,5 V. Ponto de falha relatado por donos', priority: 'CRITICAL', order: 12 },
  { modelName: 'NX 400i Falcon', yearFrom: 2013, yearTo: 2015, component: 'Bateria (12V)', intervalKm: null, intervalMonths: 24, notes: 'Mín. 12,6 V em repouso. Verificar retificador antes de trocar a bateria', priority: 'MEDIUM', order: 13 },
  { modelName: 'NX 400i Falcon', yearFrom: 2013, yearTo: 2015, component: 'Calibragem dos pneus', intervalKm: null, intervalMonths: null, notes: 'Solo: D 25 / T 28 PSI. Com carga: D 28 / T 33 PSI. Off-road: D 20 / T 24 PSI', priority: 'HIGH', order: 14 },
]

// ─── Estrutura geral ──────────────────────────────────────────────────────────
const BLOCKS = [
  { modelName: 'NX-4 FALCON',    yearFrom: 1999, yearTo: 2008, MACETES: NX4_MACETES,  PROBLEMAS: NX4_PROBLEMAS  },
  { modelName: 'NX 400i Falcon', yearFrom: 2013, yearTo: 2015, MACETES: NX4i_MACETES, PROBLEMAS: NX4i_PROBLEMAS },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  ...NX4_MANUTENCAO,
  ...NX4i_MANUTENCAO,
]

const TIRE_PRESSURES = [
  {
    modelName: 'NX-4 FALCON',
    yearFrom: 1999, yearTo: 2008,
    tireSize: '90/90-21 (F) · 120/90-17 (R)',
    frontPsi: 25, rearPsi: 28,
    frontPsiLoad: 28, rearPsiLoad: 33,
    notes: 'Trail. Off-road: reduza para D 20 / T 24 PSI para maior tração em terra — recalibre imediatamente ao retornar ao asfalto. Verificar sempre com pneu frio.',
  },
  {
    modelName: 'NX 400i Falcon',
    yearFrom: 2013, yearTo: 2015,
    tireSize: '90/90-21 (F) · 120/90-17 (R)',
    frontPsi: 25, rearPsi: 28,
    frontPsiLoad: 28, rearPsiLoad: 33,
    notes: 'Trail. Off-road: reduza para D 20 / T 24 PSI — recalibre ao retornar ao asfalto. Verificar sempre com pneu frio.',
  },
]

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })

  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Honda', vehicleTypeId: motoType.id } },
    update: {}, create: { name: 'Honda', vehicleTypeId: motoType.id },
  })

  const brand = await prisma.brand.findFirstOrThrow({
    where: { name: 'Honda', vehicleTypeId: motoType.id },
  })

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {}, create: { name: block.modelName, brandId: brand.id },
    })

    const allTips = [
      ...block.MACETES.map(t => ({ ...t, category: 'MACETES' as Cat })),
      ...block.PROBLEMAS.map(t => ({ ...t, category: 'PROBLEMAS' as Cat })),
    ]

    await prisma.tip.deleteMany({ where: { modelName: block.modelName } })
    await prisma.tip.createMany({
      data: allTips.map((tip, i) => ({
        modelName: block.modelName,
        yearFrom:  null,
        yearTo:    null,
        severity: tip.severity,
        category: tip.category,
        title: tip.title,
        body: tip.body,
        order: i,
      })),
    })

    console.log(`✅ ${block.modelName}: ${allTips.length} tips`)
  }

  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName } })
    await prisma.tirePressure.create({ data: { ...tp } })
  }
  console.log(`🔵 TirePressure: ${TIRE_PRESSURES.map(t => t.modelName).join(', ')}`)

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: BLOCKS.map(b => b.modelName) } },
  })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  const totalTips = BLOCKS.reduce((sum, b) => sum + b.MACETES.length + b.PROBLEMAS.length, 0)
  console.log(`\n✅ Honda Falcon seed concluído! ${BLOCKS.length} modelos, ${totalTips} tips, ${TIRE_PRESSURES.length} calibragens, ${MAINTENANCE_ITEMS.length} itens de manutenção`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
