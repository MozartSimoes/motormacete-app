// seed-honda-c100-dream.ts — Honda C 100 Dream (1993–2008)
// Step-through semi-automática: 4 marchas + embreagem centrífuga, transmissão por corrente 428
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

// ─── Honda C 100 Dream (1993–2008) — 99,7cc OHC carburador ───────────────────

const DREAM100_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA — 0,9 L; câmbio e embreagem em banho de óleo exigem JASO MA',
    body: 'Use 10W-30 API SJ/SL JASO MA. Capacidade: 0,9 L (motor, câmbio e embreagem centrífuga compartilham o mesmo óleo). JASO MB — formulado para scooter CVT com embreagem seca — causa patinação imediata da embreagem na C 100 Dream. Primeira troca: 1.000 km. Depois: a cada 3.000 km em uso normal ou 1.500 km em uso severo (motoboy, trânsito intenso, calor). Marcas confiáveis: Motul 4T, Castrol ACT> EVO, Shell Advance AX5.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA — gap 0,6–0,7 mm; inspete a cada 6.000 km, troque a cada 10.000–12.000 km',
    body: 'Vela original: NGK C7HSA (rosca M14×1,25, hexágono 18 mm). Gap recomendado: 0,6–0,7 mm. Inspecione a cada 6.000 km e substitua a cada 10.000–12.000 km ou quando o eletrodo central estiver arredondado/erodido. Vela ruim causa: dificuldade de partida a frio, marcha lenta instável, engasgos sob carga. Torque de aperto: 18–23 N.m. Alternativas equivalentes: Bosch W8AC, Denso W20FS-U. Verifique e acerte o gap mesmo em velas novas — podem sair de fábrica fora da especificação.',
  },
  {
    severity: 'OK',
    title: 'Partida a frio — afogador aberto por 1–2 min, nunca ande com choke aberto',
    body: 'Abra o afogador (choke) completamente antes de ligar o motor. Após o motor pegar, aguarde 1–2 minutos em marcha lenta até a rotação estabilizar; depois feche o afogador gradualmente. Em dias quentes (acima de 25 °C) muitas vezes não é necessário usar o afogador. Nunca ande com o afogador aberto: enriquece a mistura, dilui o óleo das paredes do cilindro e gera consumo excessivo. Sinal de afogador esquecido aberto: fumaça preta e cheiro forte de gasolina ao andar.',
  },
  {
    severity: 'OK',
    title: 'Semi-automática 4 marchas — pedal esquerdo rotativo; a embreagem centrífuga engata sozinha',
    body: 'A C 100 Dream tem câmbio rotativo de 4 marchas acionado pelo pé esquerdo. Não há alavanca de embreagem no guidão — a embreagem centrífuga engata automaticamente conforme a rotação sobe. Sequência: neutro → 1ª (pedal para baixo) → 2ª → 3ª → 4ª (pedal para cima), retornando ao neutro após a 4ª. Para manobras lentas e estacionamento, use a 1ª marcha com pouco acelerador. Mude de marcha com suavidade; câmbio forçado com motor frio desgasta os garfos do câmbio prematuramente.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428 — lubrifique a cada 500 km e após chuva; folga correta 10–20 mm',
    body: 'Lubrifique a corrente a cada 500 km com spray específico (Motul Chain Lube, DID Lube, WD-40 Chain). Aplique no lado interno da corrente com a moto no cavalete central, girando a roda lentamente. Folga correta no ponto médio inferior: 10–20 mm. Corrente muito tensa (<10 mm) sobrecarrega os rolamentos da roda traseira. Corrente muito folgada (>30 mm) pode saltar da coroa em freadas bruscas. Com 20.000–25.000 km de uso urbano, troque o kit completo: corrente nova em pinhão gasto destrói a corrente em poucos quilômetros.',
  },
  {
    severity: 'OK',
    title: 'Carburador Keihin — limpe preventivamente a cada 12.000–15.000 km e antes de guardar >30 dias',
    body: 'O carburador simples de borboleta da C 100 Dream é sensível ao etanol da gasolina brasileira. Ao evaporar em motos paradas, forma verniz/lodo nos jatos. Sintomas: engasga ao tirar do neutro, apaga em semáforo, marcha lenta instável mesmo regulada. Preventivo: ao guardar >30 dias, drene o carburador pelo parafuso inferior do float bowl. Limpeza preventiva a cada 12.000–15.000 km: desmonte e limpe com spray limpa-carburador. Nunca use arame nos jatos — alargam os orifícios e inutilizam o carburador.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar (espuma) — limpe a cada 6.000 km; troque a cada 15.000 km',
    body: 'O filtro de espuma deve ser limpo a cada 6.000 km: lave com sabão neutro, seque completamente (nunca use ar comprimido — rasga a espuma), umedeça levemente com óleo limpo antes de reinstalar. Substitua a cada 15.000 km ou quando a espuma estiver endurecida ou rasgada. Em condições de poeira ou terra, reduza os intervalos pela metade. Nunca rode sem filtro: sujeira no cilindro risca as paredes e desgasta anéis em horas de uso.',
  },
  {
    severity: 'OK',
    title: 'Freios a tambor — regulagem do cabo a cada 6.000 km; lonas mínimo 2 mm',
    body: 'A C 100 Dream usa freio a tambor nos dois eixos. O cabo traseiro (pedal do pé direito) e o dianteiro (alavanca no guidão) esticam com o uso — ambos devem ter 10–15 mm de folga livre antes do início do frenamento. Ajuste pelos tensores no suporte de cada roda. Lonas: inspecione anualmente ou a cada 15.000 km. Lona abaixo de 2 mm: troque imediatamente — metal nu danifica o tambor, tornando a peça inutilizável. Lubrifique os pivôs dos cames com graxa a cada regulagem.',
  },
  {
    severity: 'OK',
    title: 'Bateria (modelos ES) — verifique tensão e eletrólito a cada 6 meses',
    body: 'Modelos C 100 Dream ES (partida elétrica) usam bateria convencional 12V 3–4 Ah. Verifique o nível do eletrólito semestralmente — complete com água destilada se necessário. Tensão em repouso: 12,6 V. Com motor a 3.000 rpm: 13,7–14,5 V. Abaixo de 12 V: bateria descarregada; acima de 14,5 V: regulador de voltagem defeituoso (vai destruir a bateria rapidamente). Em motos com mais de 5–7 anos, verifique o regulador antes de trocar a bateria.',
  },
  {
    severity: 'OK',
    title: 'Combustível — prefira gasolina comum de posto movimentado; evite abastecimentos noturnos em postos pouco frequentados',
    body: 'O carburador da C 100 Dream é mais sensível à qualidade do combustível do que motos com injeção eletrônica. Gasolina adulterada com excesso de etanol ou solventes entope os jatos rapidamente. Prefira postos de bandeira conhecida com alto giro de estoque. Evite deixar o tanque abaixo de 1/4 regularmente — a sujeira do fundo do tanque concentra-se e entope o carburador. Se notar engasgo repentino após abastecimento, filtre o combustível ou drene o carburador.',
  },
]

const DREAM100_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Carburador entupido — problema mais comum em motos paradas >60 dias ou com gasolina de baixa qualidade',
    body: 'O etanol da gasolina brasileira absorve umidade e forma verniz/lodo nos jatos ao evaporar em motos paradas. Sintomas: não sai do neutro sem engasgar, motor apaga em semáforo, marcha lenta irregular mesmo regulada, dificuldade de partida a frio persistente. Solução: limpeza completa do carburador por mecânico (R$60–120) ou troca por novo (R$150–250). Preventivo: nunca deixe a moto parada >30 dias sem drenar o carburador pelo parafuso inferior do float bowl.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem centrífuga desgastada — patinação ao acelerar, especialmente em subidas',
    body: 'As pastilhas da embreagem centrífuga se desgastam com o uso — especialmente em motos usadas em trânsito intenso com muitas partidas em rampas (>30.000–40.000 km). Sintomas: a rotação sobe mas a velocidade não acompanha, cheiro de queimado em subidas longas, aceleração lenta mesmo com o motor respondendo. A embreagem centrífuga da C 100 Dream não é ajustável — troca das pastilhas (R$80–150 o jogo) é a solução. Uso de óleo JASO MB (errado) acelera enormemente esse desgaste.',
  },
  {
    severity: 'WARN',
    title: 'Retentor do virabrequim — vazamento de óleo pelo lado direito do motor (comum >40.000 km)',
    body: 'O retentor do virabrequim no lado do pinhão de saída é o ponto mais comum de vazamento de óleo após muitos anos/quilômetros. Sinais: mancha de óleo no lado direito do motor e no piso, corrente sempre oleosa e suja, consumo de óleo aumentando. O retentor custa R$20–40, mas exige desmontagem parcial do motor (R$150–250 de mão de obra). Não ignore: além de sujar a corrente, o nível de óleo cai e pode danificar o motor por lubrificação insuficiente.',
  },
  {
    severity: 'WARN',
    title: 'CDI e bobina de ignição — falhas intermitentes em motos com mais de 15 anos',
    body: 'A C 100 Dream foi descontinuada em 2008, então qualquer exemplar tem mais de 15 anos. CDI (módulo eletrônico de ignição) e bobina envelhecem e podem falhar de forma intermitente: moto apaga de repente em temperatura alta, não parte em dias frios, falha ao acelerar na estrada. CDI de reposição custa R$80–180; bobina R$60–120. Antes de trocar: verifique a vela, o chicote elétrico e os conectores — mal contato imita perfeitamente falha de CDI.',
  },
  {
    severity: 'WARN',
    title: 'Corrente desgastando rápido — pinhão velho é o culpado oculto',
    body: 'Corrente nova que estica rapidamente quase sempre está sendo instalada em pinhão já desgastado. O pinhão com dentes "pontiagudos" destrói os elos da corrente nova em 3.000–5.000 km. Sempre troque o kit completo (corrente + pinhão + coroa) simultaneamente. Kit alternativo 428 custa R$80–150; kit Honda original R$180–280. Nunca economize instalando só a corrente — o custo extra não justifica o desgaste acelerado.',
  },
  {
    severity: 'WARN',
    title: 'Pneus com câmara — furo causa perda de pressão súbita; câmaras em polegadas podem ser escassas',
    body: 'A C 100 Dream usa pneus com câmara interna (não tubeless). Em furo, a câmara perde pressão rapidamente (ao contrário de tubeless que perde gradualmente). Os modelos mais antigos usam medidas em polegadas (2.25-17 / 2.50-17) que podem ser difíceis de encontrar em borracharias de bairro. Carregue um kit de emergência (remendo rápido, cola, desmontador). Nunca ande com pneu murchando — câmara furada e aro em contato amassam o aro, tornando-o oval e inutilizável.',
  },
  {
    severity: 'DANGER',
    title: 'Freio traseiro sem resposta — lona gasta até o metal raspa o tambor e inutiliza o freio',
    body: 'Em C 100 Dream comprada sem histórico de manutenção, inspecione imediatamente o estado do freio traseiro. Lonas gastas até o metal riscam o tambor, que fica ranhurado e perde eficiência mesmo com lonas novas instaladas — o tambor danificado pode exigir troca completa da roda (caro). Sintoma: pedal do freio traseiro desce até o fim sem resistência ou faz barulho metálico. Urgência: não ande com esse problema. Troca das lonas custa R$40–80; tambor novo R$150–300.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de óleo aumentado — anéis do pistão desgastados em motores com alta quilometragem',
    body: 'Motores C 100 Dream com >50.000 km podem consumir óleo entre as trocas. Sinais: fumaça azulada ao acelerar, nível de óleo caindo antes do intervalo previsto. Verifique o nível pelo visor (janelinha) no lado direito do motor a cada 1.000 km em motos velhas. Rodar sem óleo suficiente por 10–15 minutos pode fundir o motor. Custo de retífica com troca de anéis: R$500–1.000; motor usado de ferro-velho: R$250–500. Se o consumo for alto, cheque também o retentor do virabrequim.',
  },
]

// ─── CALIBRAGEM ───────────────────────────────────────────────────────────────
const TIRE_PRESSURES = [
  {
    modelName: 'C 100 Dream',
    yearFrom: 1993, yearTo: 2008,
    tireSize: '2.25-17 (F) · 2.50-17 (R)',
    frontPsi: 26, rearPsi: 29,
    frontPsiLoad: 29, rearPsiLoad: 33,
    notes: 'Pneus com câmara interna — furo causa perda de pressão súbita. Calibrar sempre com pneu frio (antes de andar). Com garupa frequente: 33 PSI traseiro. Câmaras na medida polegada podem ser difíceis de achar — guarde uma reserva em casa.',
  },
]

// ─── MANUTENÇÃO ───────────────────────────────────────────────────────────────
const DREAM100_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'C 100 Dream', yearFrom: 1993, yearTo: 2008, component: 'Óleo do motor (10W-30 JASO MA)', intervalKm: 3000, intervalMonths: 6, notes: 'Capacidade 0,9 L. 1ª troca em 1.000 km. Uso severo (motoboy/trânsito): encurtar para 1.500 km. JASO MA obrigatório — câmbio e embreagem centrífuga em banho de óleo.', priority: 'CRITICAL', order: 1 },
  { modelName: 'C 100 Dream', yearFrom: 1993, yearTo: 2008, component: 'Vela de ignição (NGK C7HSA)', intervalKm: 10000, intervalMonths: 12, notes: 'Gap 0,6–0,7 mm. Inspecionar a cada 6.000 km. Alternativa: Bosch W8AC. Torque 18–23 N.m. Verificar gap mesmo em vela nova.', priority: 'HIGH', order: 2 },
  { modelName: 'C 100 Dream', yearFrom: 1993, yearTo: 2008, component: 'Lubrificação da corrente de transmissão', intervalKm: 500, intervalMonths: null, notes: 'Spray de corrente específico no lado interno. Lubrificar sempre após chuva. Nunca WD-40 comum como lubrificante permanente.', priority: 'HIGH', order: 3 },
  { modelName: 'C 100 Dream', yearFrom: 1993, yearTo: 2008, component: 'Tensionamento da corrente', intervalKm: 2000, intervalMonths: 3, notes: 'Folga correta: 10–20 mm no ponto médio inferior com piloto sentado. Ajustar pelo tensor na roda traseira. Verificar alinhamento da roda após ajuste.', priority: 'HIGH', order: 4 },
  { modelName: 'C 100 Dream', yearFrom: 1993, yearTo: 2008, component: 'Limpeza do filtro de ar (espuma)', intervalKm: 6000, intervalMonths: 6, notes: 'Lavar com sabão neutro, secar completamente, umedecer levemente com óleo limpo. Em ambiente com poeira: cada 3.000 km. Nunca ar comprimido — rasga a espuma.', priority: 'MEDIUM', order: 5 },
  { modelName: 'C 100 Dream', yearFrom: 1993, yearTo: 2008, component: 'Troca do filtro de ar', intervalKm: 15000, intervalMonths: 18, notes: 'Substituir quando a espuma estiver endurecida, rasgada ou com sujeira incrustada. Original Honda ou equivalente universal.', priority: 'LOW', order: 6 },
  { modelName: 'C 100 Dream', yearFrom: 1993, yearTo: 2008, component: 'Verificação/regulagem dos freios a tambor (F e R)', intervalKm: 6000, intervalMonths: 6, notes: 'Folga do cabo/pedal: 10–15 mm antes do início do frenamento. Inspecionar espessura das lonas (mínimo 2 mm). Lubrificar pivôs dos cames com graxa.', priority: 'HIGH', order: 7 },
  { modelName: 'C 100 Dream', yearFrom: 1993, yearTo: 2008, component: 'Limpeza preventiva do carburador', intervalKm: 12000, intervalMonths: 12, notes: 'Desmontar e limpar com spray limpa-carburador. Ao guardar >30 dias: drenar pelo parafuso do float bowl. Nunca usar arame nos jatos.', priority: 'MEDIUM', order: 8 },
  { modelName: 'C 100 Dream', yearFrom: 1993, yearTo: 2008, component: 'Troca do kit de transmissão (corrente 428 + coroa + pinhão)', intervalKm: 22000, intervalMonths: null, notes: 'Trocar os 3 componentes sempre juntos. Kit alternativo R$80–150; kit Honda original R$180–280. Corrente nova em pinhão gasto destrói a corrente rapidamente.', priority: 'HIGH', order: 9 },
  { modelName: 'C 100 Dream', yearFrom: 1993, yearTo: 2008, component: 'Verificação do retentor do virabrequim', intervalKm: 20000, intervalMonths: 24, notes: 'Inspecionar lado direito do motor por sinais de vazamento de óleo. Retentor novo custa R$20–40; mão de obra de substituição R$150–250.', priority: 'MEDIUM', order: 10 },
]

// ─── BLOCKS ───────────────────────────────────────────────────────────────────
const BLOCKS = [
  { modelName: 'C 100 Dream', yearFrom: 1993, yearTo: 2008, MACETES: DREAM100_MACETES, PROBLEMAS: DREAM100_PROBLEMAS },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  ...DREAM100_MANUTENCAO,
]

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
        severity:  tip.severity,
        category:  tip.category,
        title:     tip.title,
        body:      tip.body,
        order:     i,
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
  console.log(`\n✅ Honda C 100 Dream seed concluído! ${BLOCKS.length} modelo, ${totalTips} tips, ${TIRE_PRESSURES.length} calibragem, ${MAINTENANCE_ITEMS.length} itens de manutenção`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
