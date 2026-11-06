// seed-honda-cb1000r.ts — Honda CB 1000R / CB 1000R ABS / CB 1000R Black Edition (2008–presente)
// Naked sport 998cc inline-4 líquido, DOHC 16v, PGM-FI — Gen 1 (2008-2017) e Gen 2 Neo Sports Café (2018+)
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

// ─── Honda CB 1000R — Macetes ─────────────────────────────────────────────────

const CB1000R_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA2 — 3,7 L com filtro; troca a cada 5.000 km em uso misto',
    body: 'Use 10W-40 API SN/SP JASO MA2. Capacidade: 3,2 L na troca sem filtro; 3,7 L com filtro novo. Motor inline-4 de alta performance — não estenda além de 5.000 km em uso misto rua/estrada ou 3.000 km em uso esportivo intenso (acelerações até o limitador, calor). Recomendados: Motul 7100 4T 10W-40, Honda HP4 10W-40, Castrol Power1 Racing 10W-40. Nunca use óleo de carro (API SM/ENERGY SAVING) — os aditivos de economia de combustível destroem a embreagem multidisco úmida em banho de óleo.',
  },
  {
    severity: 'OK',
    title: 'Velas NGK iridium IMR9C-9H — troca a cada 16.000 km; 4 velas no motor inline-4',
    body: 'Velas originais: NGK IMR9C-9HES (iridium, rosca M10×1,0). O motor tem 4 cilindros = 4 velas. Troque sempre o jogo completo — velas com desgaste desigual causam vibração e combustão irregular. Intervalo: 16.000 km (iridium) ou 8.000 km (padrão NGK CR9EH-9). Torque de aperto: 10–12 N.m (rosca M10 — cuidado: muito menor que velas M14 de motos simples). Em concessionária Honda, o jogo de 4 velas iridium custa R$200–350; a troca em si leva cerca de 1 hora pois exige remoção das tampas do cabeçote.',
  },
  {
    severity: 'WARN',
    title: 'Regulagem de válvulas a cada 16.000 km — 16 válvulas, custo R$800–1.500 na concessionária',
    body: 'O motor DOHC 4 cilindros 16 válvulas exige regulagem de folgas a cada 16.000 km. Folgas especificadas: admissão 0,13–0,20 mm / escape 0,22–0,30 mm (motor frio). A neglicência cria batidas metálicas progressivas, perda de compressão e dano ao cabeçote — reparo posterior custa 3× mais. Em concessionária Honda: R$800–1.500. Oficinas de confiança especializadas em inline-4 japonês: R$400–700. Se comprar a moto usada sem histórico, esse deve ser o primeiro serviço a agendar.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 — lubrifique a cada 800–1.000 km; kit relação a cada 20.000–25.000 km',
    body: 'A CB 1000R usa corrente 525 (o-ring). Lubrifique com spray de corrente específico (Motul C3, DID Lube, WD-40 Chain) a cada 800–1.000 km. Folga correta no ponto médio inferior: 20–30 mm com piloto sentado. Corrente dura mais que em motos menores pelo torque elevado (pneu traseiro 190 mm amortece melhor). Kit relação completo (corrente + coroa + pinhão): troque os 3 juntos a cada 20.000–25.000 km. Kit DID/JT alternativo R$350–550; original Honda R$700–1.000.',
  },
  {
    severity: 'OK',
    title: 'Freio dianteiro radial — pastilhas desgastam em 6.000–10.000 km em uso misto; aftermarket é melhor',
    body: 'As pinças Nissin de 4 pistões na dianteira são excelentes, mas as pastilhas originais Honda têm vida útil curta em uso misto ou esportivo: 6.000–10.000 km. Alternativas de qualidade superior: Brembo SC (sinterizadas, ~R$180/par), EBC HH (R$130–160/par), Braking CM55 (R$150/par). Nunca troque apenas uma pastilha — troque sempre o par na mesma pinça. Verifique o disco: a CBS deve estar acima de 4,5 mm (limite de uso: 4,0 mm). Com ABS, cheque se o sensor ABS não foi perturbado após serviço de freio.',
  },
  {
    severity: 'OK',
    title: 'Pneus Pirelli Diablo Rosso / Michelin Road 6 — troque antes dos 10.000 km em uso esportivo',
    body: 'A CB 1000R usa 120/70 ZR17 (F) e 190/55 ZR17 (R). Com o torque de ~104 N.m do motor inline-4, o pneu traseiro desgasta mais rápido do que em naked bikes menores. Em uso misto (rua + estrada), o traseiro dura 8.000–12.000 km; em uso esportivo agressivo, pode durar menos de 6.000 km. Nunca misture marcas/modelos diferentes entre dianteiro e traseiro. Calibre sempre os pneus frios (antes de andar): 36 PSI frente / 42 PSI traseiro solo. Com garupa ou baú: 36 PSI / 42–46 PSI.',
  },
  {
    severity: 'OK',
    title: 'Líquido de arrefecimento — troca na primeira revisão (3 anos) e depois a cada 2 anos',
    body: 'O motor é refrigerado a líquido. Use Honda Long Life Coolant (roxo, pré-diluído) ou equivalente de alta qualidade com base de etileno-glicol, diluído 50/50 com água destilada. Nunca use água pura — corrói o sistema de alumínio. Primeira troca: ao completar 3 anos ou 45.000 km. Depois: a cada 2 anos. Nível: verifique o reservatório lateral com motor frio — manter entre MIN e MAX. Superaquecimento persistente pode indicar termostato preso (comum em motos com muita quilometragem) ou junta de cabeçote comprometida.',
  },
  {
    severity: 'OK',
    title: 'Gen 2 (2018+): HSTC e modos de condução — configuração recomendada por situação',
    body: 'A CB 1000R Neo Sports Café (2018+) tem controle de tração HSTC e 3 modos: Sport (resposta total, HSTC mínimo), Standard (equilíbrio, HSTC médio), Rain (resposta suavizada, HSTC máximo). Para uso urbano e chuva: Rain ou Standard. Para estrada seca e curvas: Sport. O HSTC nunca deve ser desligado completamente em pista molhada — o motor tem torque suficiente para soltar o traseiro com facilidade em asfalto molhado. Se disponível, o quickshifter (HSA) permite trocas sem embreagem na subida; use com suavidade e apenas em rotações acima de 4.000 rpm.',
  },
  {
    severity: 'OK',
    title: 'Garfo invertido Showa — troca de óleo preventiva a cada 20.000–25.000 km',
    body: 'O garfo invertido de 43 mm (Gen 1) e 41 mm Big Piston (Gen 2) requer troca do óleo interno a cada 20.000–25.000 km ou quando os retentores (vedações) apresentarem vazamento (mancha oleosa na haste brilhante). Óleo de garfo: Honda SS-8 (7,5W) ou Motul Fork Oil 7,5W, ~600 mL por perna. Retentores e guias: kit completo R$80–150; mão de obra R$200–350. Com retentores vazando, o garfo perde amortecimento progressivamente — não adie a troca, pois o óleo contamina as pastilhas e disco do freio dianteiro.',
  },
  {
    severity: 'OK',
    title: 'Combustível — mínimo gasolina comum (87 RON); gasolina aditivada prolonga limpeza dos injetores',
    body: 'O motor PGM-FI aceita gasolina comum ou aditivada. Com a alta taxa de compressão (11,2:1 Gen 1 / 11,6:1 Gen 2), etanol puro (E100) não é recomendado no motor original — risco de detonação em altas temperaturas sem reprogramação de mapa. Use gasolina C (mistura padrão com até 27% etanol), que é o combustível para o qual o mapa de injeção foi calibrado. Gasolina aditivada Shell V-Power ou Petrobras Podium ajuda a manter os injetores limpos e pode melhorar ligeiramente a resposta do motor, especialmente em modelos com mais quilometragem.',
  },
  {
    severity: 'OK',
    title: 'Fluido de freio DOT 4 — troca obrigatória a cada 2 anos independente da quilometragem',
    body: 'Os três circuitos de freio (pinça dianteira esquerda + direita + traseiro, com ABS nos modelos equipados) usam DOT 4. O fluido absorve umidade com o tempo, reduzindo o ponto de ebulição — em frenagens esportivas prolongadas, fluido velho pode "vapourizar" e causar pedal/manete esponjoso. Troca: a cada 2 anos. Use apenas DOT 4 (não misture com DOT 5 ou DOT 5.1). Com ABS, o purge precisa pressurizar o sistema ABS manualmente ou via scanner Honda — verifique com o mecânico se o procedimento foi feito corretamente.',
  },
  {
    severity: 'OK',
    title: 'Amortecedor traseiro — ajuste de pré-carga e rebound para o peso do piloto',
    body: 'O amortecedor Pro-Link traseiro tem ajuste de pré-carga (via rosca no Gen 1, alavanca no Gen 2) e rebound (clique externo). Configuração base recomendada solo (piloto 75 kg): pré-carga posição 3 de 7 / rebound 1,5 voltas para dentro a partir do máximo. Com garupa: +1 posição de pré-carga. Com baú cheio + garupa: +2 posições. Amortecedor sem ressalto adequado faz a moto quicar e dificulta a retomada de curva após solavancos. Após 40.000–50.000 km de uso intenso, o amortecedor pode perder gás e exigir recarga (~R$200) ou troca.',
  },
]

// ─── Honda CB 1000R — Problemas ───────────────────────────────────────────────

const CB1000R_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Gen 1 (2008–2017): regulador/retificador de voltagem com superaquecimento — pode destruir a bateria e deixar a moto parada',
    body: 'O regulador/retificador da CB 1000R Gen 1 é o ponto fraco mais conhecido do modelo. O componente fica posicionado sob o assento, com pouca ventilação, e superaquece em uso urbano intenso ou após longas rodagens em baixa velocidade. Sintomas: bateria morrendo progressivamente mesmo carregada, luz do painel oscilando, moto parando em semáforo. O regulador original Honda funciona enquanto novo; após 3–5 anos, a degradação é comum. Solução definitiva: regulador aftermarket de alumínio fundido (Shindengen SH775AA ou similar, R$300–500) com mais dissipação de calor. Instale em local com mais ventilação se possível.',
  },
  {
    severity: 'WARN',
    title: 'Gen 1 (2008–2017): bobinas de ignição com falha intermitente acima de 40.000–50.000 km',
    body: 'As bobinas de ignição do inline-4 da CB 1000R Gen 1 podem falhar de forma intermitente após muitos anos/quilômetros, especialmente com calor. Sintoma mais comum: moto engasga ou perde 1 cilindro sob carga acima de 7.000 rpm — voltando ao normal após o motor esfriar. Difícil de reproduzir fria, por isso muitos mecânicos perdem o diagnóstico. Antes de trocar, verifique o estado dos cabos/conectores das bobinas (oxidação nos conectores é muito mais comum). Bobina nova por cilindro: R$150–250. Troque todos os 4 de uma vez se um falhar — economia de mão de obra.',
  },
  {
    severity: 'WARN',
    title: 'Vedações do garfo dianteiro — vazamento entre 30.000–50.000 km ou após quedas',
    body: 'As vedações (retentores) do garfo invertido Showa desgastam com uso normal e falham entre 30.000–50.000 km, ou antes em motos que levaram impactos nas hastes (cascalho, tombamento). Sinal visual claro: óleo escorrendo pela haste brilhante do garfo, às vezes indo para o disco dianteiro e pastilha. Em uso esportivo ou off-road, o intervalo é menor. Além de perder amortecimento, o óleo de garfo contamina as pastilhas — pastilha contaminada com óleo não tem aderência mesmo nova. Kit de retentores e guias: R$80–150 (por perna). Ao trocar os retentores, troque também o óleo do garfo.',
  },
  {
    severity: 'WARN',
    title: 'Pinça de freio traseiro travando em motos com uso irregular ou longos períodos paradas',
    body: 'A pinça de pistão único do freio traseiro tende a travar parcialmente em motos que ficam paradas por semanas/meses ou em uso urbano onde o freio traseiro é raramente acionado com força. Sintoma: disco traseiro quente ao toque após rodagem normal, arrasto notável ao empurrar a moto, consumo de combustível levemente aumentado. Limpeza dos êmbolos e lubrificação com pasta de silicone para freio resolve na maioria dos casos. Se o pistão não retrair mesmo limpo, a pinça exige reconstrução ou troca (R$200–450). Revisão preventiva a cada 20.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Relé de partida (starter relay) — falha com calor em motos acima de 5–7 anos',
    body: 'O relé do motor de partida da CB 1000R Gen 1 pode falhar por calor e envelhecimento. Sintoma: botão de partida acionado mas motor não gira — apenas um clique seco. Diferente de bateria fraca (que emite vários cliques rápidos). O relé fica sob o banco, sujeito a calor do motor. Teste rápido: com chave na ignição, dê um toque direto nos dois terminais grandes do relé — se o motor girar, o relé está morto. Relé novo: R$60–120 (original Honda) ou R$30–60 (paralelo confiável). Fácil troca — 15 minutos com chave de fenda.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de óleo entre trocas — normal até 300 mL/5.000 km; acima disso exige investigação',
    body: 'Motores de alta performance toleranciados de fábrica para competição consomem mais óleo que motores de passeio. Na CB 1000R, consumo de até 200–300 mL a cada 5.000 km é considerado normal pela Honda. Acima de 500 mL, investigue: anéis do pistão desgastados, selos de válvula com vazamento (fumaça azulada na aceleração) ou vedação do turbo (não se aplica, mas serve de analogia para selos de óleo internos). Mantenha o hábito de verificar o nível a cada 1.500–2.000 km, especialmente em uso esportivo.',
  },
  {
    severity: 'WARN',
    title: 'Gen 2 (2018+): embreagem com judder em arrancadas — comum nos primeiros 5.000 km',
    body: 'Alguns proprietários da CB 1000R Gen 2 relatam vibração/judder na embreagem em arrancadas lentas e manobras de baixa velocidade, especialmente durante o período de rodagem (primeiros 5.000 km). Isso se normaliza após o "assento" das pastilhas de embreagem. Caso persista acima de 5.000 km, verifique o óleo — óleo velho ou tipo errado (JASO MB) intensifica o problema. A embreagem assistida e antiderrapante (Gen 2) tem mola de pressão mais leve, o que exige adaptação no controle fino do piloto vindo de motos mais antigas.',
  },
  {
    severity: 'WARN',
    title: 'Corrente desgastando rápido — torque elevado e lubrificação insuficiente destroem kit relação em 10.000 km',
    body: 'O torque expressivo do inline-4 (99 N.m Gen 1 / 104 N.m Gen 2) acelera enormemente o desgaste da corrente sem lubrificação rigorosa. Sem lubrificação regular, a corrente seca e o kit relação completo (corrente + coroa + pinhão) pode durar apenas 10.000–12.000 km. Com lubrificação a cada 800–1.000 km, o kit dura 20.000–25.000 km facilmente. Sempre troque os 3 componentes juntos — coroa desgastada destrói corrente nova rapidamente. Nunca instale corrente sem o clip de emenda voltado para o sentido correto de giro (abertura oposta ao sentido de movimento).',
  },
]

// ─── CALIBRAGEM ───────────────────────────────────────────────────────────────
const TIRE_PRESSURES = [
  {
    modelName: 'CB 1000R',
    yearFrom: 2008, yearTo: null,
    tireSize: '120/70 ZR17 (F) · 190/55 ZR17 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 46,
    notes: 'Pneus radiais ZR de alta performance — nunca abasteça acima de 42 PSI no traseiro solo. Calibrar SEMPRE frio (antes de andar). Com garupa regular: 42→46 PSI traseiro. Pneu quente pode apresentar até 5 PSI a mais — não sangre para abaixar; o valor frio é o correto. Verifique antes de cada saída longa.',
  },
]

// ─── MANUTENÇÃO ───────────────────────────────────────────────────────────────
const CB1000R_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CB 1000R', yearFrom: 2008, yearTo: null, component: 'Óleo do motor + filtro (10W-40 JASO MA2)', intervalKm: 5000, intervalMonths: 12, notes: 'Capacidade: 3,7 L com filtro. Uso esportivo intenso: encurtar para 3.000 km. Nunca usar óleo de carro ou JASO MB. Trocar filtro a cada troca de óleo.', priority: 'CRITICAL', order: 1 },
  { modelName: 'CB 1000R', yearFrom: 2008, yearTo: null, component: 'Velas de ignição (NGK IMR9C-9HES — jogo de 4)', intervalKm: 16000, intervalMonths: 24, notes: 'Iridium OEM — jogo completo de 4 velas. Torque 10–12 N.m (M10). Alternativa padrão NGK CR9EH-9 (troca a cada 8.000 km). Exige remoção das tampas do cabeçote.', priority: 'HIGH', order: 2 },
  { modelName: 'CB 1000R', yearFrom: 2008, yearTo: null, component: 'Regulagem de válvulas (DOHC 16v)', intervalKm: 16000, intervalMonths: 24, notes: 'Admissão 0,13–0,20 mm / escape 0,22–0,30 mm com motor frio. Serviço custoso (~R$600–1.500) mas crítico. Se comprada usada sem histórico, priorizar esse serviço.', priority: 'CRITICAL', order: 3 },
  { modelName: 'CB 1000R', yearFrom: 2008, yearTo: null, component: 'Lubrificação da corrente 525', intervalKm: 800, intervalMonths: null, notes: 'Spray de corrente específico (o-ring safe). Lubrificar após lavagem e chuva. Torque alto desgasta corrente seca muito rápido.', priority: 'HIGH', order: 4 },
  { modelName: 'CB 1000R', yearFrom: 2008, yearTo: null, component: 'Tensionamento da corrente', intervalKm: 3000, intervalMonths: null, notes: 'Folga: 20–30 mm no ponto médio inferior com piloto sentado. Verificar alinhamento da roda traseira após ajuste.', priority: 'HIGH', order: 5 },
  { modelName: 'CB 1000R', yearFrom: 2008, yearTo: null, component: 'Filtro de ar', intervalKm: 16000, intervalMonths: 24, notes: 'Em condições de poeira ou uso intenso: cada 8.000 km. Original Honda R$80–130. K&N RC-1120 (lavável permanente) R$380–480.', priority: 'MEDIUM', order: 6 },
  { modelName: 'CB 1000R', yearFrom: 2008, yearTo: null, component: 'Fluido de freio (DOT 4) — circuitos F e R', intervalKm: null, intervalMonths: 24, notes: 'Troca a cada 2 anos independente da quilometragem. Com ABS: purge deve pressurizar o módulo ABS — confirmar com mecânico. Nunca misturar DOT 4 com DOT 5.', priority: 'HIGH', order: 7 },
  { modelName: 'CB 1000R', yearFrom: 2008, yearTo: null, component: 'Líquido de arrefecimento (Honda Long Life Coolant)', intervalKm: null, intervalMonths: 36, notes: 'Primeira troca: 3 anos ou 45.000 km. Depois: a cada 2 anos. Diluição 50/50 com água destilada. Nunca água pura — corrói o sistema de alumínio.', priority: 'HIGH', order: 8 },
  { modelName: 'CB 1000R', yearFrom: 2008, yearTo: null, component: 'Óleo do garfo dianteiro + vedações', intervalKm: 25000, intervalMonths: null, notes: 'Óleo Honda SS-8 (7,5W) ou Motul Fork Oil 7,5W, ~600 mL por perna. Trocar retentores e guias se houver vazamento. Nunca adiar se houver óleo na haste.', priority: 'MEDIUM', order: 9 },
  { modelName: 'CB 1000R', yearFrom: 2008, yearTo: null, component: 'Kit de transmissão (corrente 525 + coroa + pinhão)', intervalKm: 22000, intervalMonths: null, notes: 'Trocar os 3 componentes juntos. Kit DID 525VX3 Gold + JT sprockets R$400–600. Kit Honda original R$800–1.200. Clip de emenda voltado oposto ao sentido de giro.', priority: 'HIGH', order: 10 },
  { modelName: 'CB 1000R', yearFrom: 2008, yearTo: null, component: 'Inspeção das pastilhas de freio (pinças Nissin)', intervalKm: 6000, intervalMonths: 6, notes: 'Espessura mínima: 1,5 mm. Pastilhas dianteiras desgastam em 6.000–10.000 km em uso esportivo. Alternativas Brembo SC ou EBC HH têm maior durabilidade que as originais.', priority: 'HIGH', order: 11 },
  { modelName: 'CB 1000R', yearFrom: 2008, yearTo: null, component: 'Verificação do regulador/retificador de voltagem (Gen 1)', intervalKm: null, intervalMonths: 12, notes: 'Medição: com motor a 3.000 rpm, voltímetro nos bornes da bateria deve mostrar 13,7–14,5 V. Abaixo: regulador com problema. Acima de 15 V: urgência — destrói a bateria e os componentes eletrônicos.', priority: 'HIGH', order: 12 },
]

// ─── BLOCKS ───────────────────────────────────────────────────────────────────
const BLOCKS = [
  { modelName: 'CB 1000R', yearFrom: 2008, yearTo: null, MACETES: CB1000R_MACETES, PROBLEMAS: CB1000R_PROBLEMAS },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  ...CB1000R_MANUTENCAO,
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
  console.log(`\n✅ Honda CB 1000R seed concluído! ${BLOCKS.length} modelo, ${totalTips} tips, ${TIRE_PRESSURES.length} calibragem, ${MAINTENANCE_ITEMS.length} itens de manutenção`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
