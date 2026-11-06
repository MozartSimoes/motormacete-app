// seed-honda-cb1300.ts — Honda CB1300 Super Four (2007–2008)
// FIPE: "CB1300 SUPER FOUR" (código 4412) — SC54 (1284cc, PGM-FI)
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

// ─── CB1300 Super Four — Macetes ──────────────────────────────────────────────

const CB1300_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA2 — 4,5 L com filtro; troca obrigatória a cada 5.000 km',
    body: 'Motor inline-4 de 1.284cc DOHC exige 10W-40 API SN/SP com certificação JASO MA2 (embreagem úmida). Capacidade: ~4,3 L sem filtro; 4,5 L com filtro novo. Por ser um motor de grande cilindrada com peso elevado do virabrequim, o óleo trabalha mais do que em motos menores — jamais passe dos 5.000 km em uso misto ou 3.000 km em uso urbano pesado. Recomendados: Motul 7100 4T 10W-40, Honda HP4 10W-40, Castrol Power1 Racing 10W-40. Use sempre óleo com JASO MA2 — óleo para carro com modificadores de atrito destrói a embreagem multidisco molhada.',
  },
  {
    severity: 'OK',
    title: 'Velas NGK CR9EH-9 — 4 velas no inline-4; troque o jogo completo a cada 12.000 km',
    body: 'O motor tem 4 cilindros = 4 velas. Vela padrão: NGK CR9EH-9 (gap 0,9 mm). Opção iridium: NGK DPCR9EVX (gap pré-ajustado, vida útil ~24.000 km). Troque sempre o jogo de 4 completo — uma vela com folga de gap diferente provoca vibração perceptível num motor de 1.284cc. Torque de aperto: 16 N.m. A troca na CB1300 é razoavelmente acessível: tanque não precisa ser removido completamente nos modelos SC54, apenas inclinado para frente após soltar os parafusos dianteiros.',
  },
  {
    severity: 'WARN',
    title: 'Regulagem de válvulas DOHC 16 válvulas — obrigatória a cada 16.000 km; serviço laborioso e caro',
    body: 'Motor 4 cilindros DOHC com 4 válvulas por cilindro (16 no total) exige regulagem periódica de folgas. Folgas especificadas com motor frio: admissão 0,16 ± 0,03 mm / escape 0,27 ± 0,03 mm. Serviço que requer desmontagem considerável do motor (remoção de capa de válvulas, cabos, airbox). Em oficina especializada: R$600–1.200; em concessionária Honda: R$1.400–2.000. Sintoma de folgas fora de especificação: barulho metálico em "clack-clack" em marcha lenta (folga grande) ou motor áspero sem ruído mas com perda de compressão (folga pequena demais — mais perigoso). Prioridade máxima em exemplares sem histórico documentado.',
  },
  {
    severity: 'OK',
    title: 'Corrente 530 o-ring — lubrifique a cada 800 km; kit relação completo a cada 20.000 km',
    body: 'A CB1300 usa corrente padrão 530 (x-ring ou o-ring). Com 260+ kg de peso total com piloto, a transmissão final trabalha com carga elevada. Lubrifique a cada 800–1.000 km com spray de corrente específico — nunca use WD-40 puro que ataca os anéis de vedação. Folga correta no ponto médio inferior da corrente: 20–30 mm com piloto sentado na moto. Kit relação recomendado: DID 530ZVM-X + JT Sprockets (JTF341 pinhão + JTR1331 coroa) — troque sempre os 3 juntos. Nunca use corrente nova com coroa/pinhão velhos: o novo desgasta rapidamente e pode travar.',
  },
  {
    severity: 'OK',
    title: 'Injeção PGM-FI (modelos FIPE 2007–2008) — limpeza dos injetores a cada 20.000 km',
    body: 'Os modelos CB1300 Super Four comercializados no Brasil usam injeção eletrônica PGM-FI (Honda). O sistema é confiável, mas injetores que passaram longos períodos sem uso acumulam verniz de gasolina. Limpeza em máquina ultrassônica de injetores a cada 20.000 km ou se houver instabilidade em marcha lenta, afogamento ao acelerar rápido ou consumo aumentado. Custo: R$150–300 pelos 4 injetores em oficina especializada. O sensor MAP (manifold absolute pressure) e o sensor IAT (temperatura do ar) também devem ser limpos com spray de sensor na mesma ocasião — não requerem substituição se funcionais.',
  },
  {
    severity: 'WARN',
    title: 'Peso 260+ kg — a maior naked da Honda exige técnica específica em baixa velocidade',
    body: 'A CB1300 Super Four pesa 267 kg em ordem de marcha com combustível — aproximadamente o dobro de uma CG 160. Isso é normal e faz parte do projeto de naked sport-touring de grande porte. A dificuldade surge em velocidades abaixo de 10 km/h: manobras de estacionamento em rampa, balanceiro, curvas em U em espaço apertado. Técnica obrigatória: use sempre os pés para apoio enquanto manobra em marcha a pé; nunca confie apenas no balanceiro em terreno irregular. Moto derrubada em garagem causa danos caros: carenagem, manopla, pedal, espelho. Invista em protetores de carenagem (crash cages/sliders) — custa R$200–500 e evita R$3.000+ em danos.',
  },
  {
    severity: 'OK',
    title: 'Filtro de combustível inline — substituição a cada 12.000 km; nunca negligencie',
    body: 'A CB1300 SC54 tem filtro de combustível inline posicionado sob o tanque de 21 litros. Filtro entupido causa queda progressiva de potência e instabilidade em rotações mais altas. A cada 12.000 km substitua preventivamente — o filtro original Honda custa R$50–90; alternativas de qualidade (Mann, Fram) custam R$30–60. Com tanque de 21 L e motor de 1.284cc, o volume de combustível que passa pelo filtro é consideravelmente maior que em motos menores, aumentando a taxa de contaminação. Em moto com histórico de combustível de baixa qualidade ou com suspeita de ferrugem no tanque, troque o filtro imediatamente.',
  },
  {
    severity: 'OK',
    title: 'Freios duplos dianteiros 310 mm — pastilhas EBC HH ou Brembo SC superam o original',
    body: 'A CB1300 tem pinças dianteiras duplas (2 × Nissin 2 pistões ou 4 pistões dependendo do ano). A mordida original é adequada para uso na estrada, mas no peso de 260+ kg a capacidade de frenagem é crítica. Pastilhas sinterizadas EBC HH (R$100–160/par, 2 pares para as duas pinças) ou Brembo SC (R$150–220/par) oferecem resposta progressiva superior e maior durabilidade. Troque sempre em pares por pinça. O ABS (presente em alguns modelos) não elimina a necessidade de manutenção dos sensores de roda — limpe os anéis fônicos a cada troca de pastilhas.',
  },
  {
    severity: 'OK',
    title: 'Fluido de freio DOT 4 — troca obrigatória a cada 2 anos independente da quilometragem',
    body: 'O sistema de freios da CB1300 tem 3 circuitos (dianteiro esquerdo, dianteiro direito e traseiro). DOT 4 absorve umidade do ar continuamente — após 2 anos o ponto de ebulição cai para níveis que causam risco de vapor nos freios em frenagens repetidas em descidas longas. Use apenas DOT 4 (nunca DOT 5 silicone — incompatível com as vedações). Quantidade total: ~400–500 mL para sangrar os 3 circuitos. Com o ABS, o sangramento requer procedimento específico do manual — em oficinas sem equipamento adequado, siga o método de pressão por gravidade para o módulo ABS.',
  },
  {
    severity: 'OK',
    title: 'Pneus ZR17 — 120/70 ZR17 (F) e 180/55 ZR17 (R); verifique data de fabricação em motos paradas',
    body: 'Pressões frias recomendadas: 33 PSI dianteiro / 39 PSI traseiro solo; 33 PSI / 42 PSI com garupa. Com 267 kg de moto + 80+ kg de piloto + eventual garupa e bagagem, o pneu traseiro trabalha próximo de sua carga máxima — jamais use abaixo da pressão recomendada. Recomendados para o perfil sport-touring da CB1300: Michelin Road 6, Bridgestone Battlax T32, Metzeler Roadtec 02. Em motos paradas há 2+ anos: verifique o código DOT dos pneus (4 dígitos: semana + ano de fabricação) — pneu com mais de 6 anos deve ser substituído independente do aspecto visual, pois o composto endurece e perde coeficiente de atrito.',
  },
  {
    severity: 'OK',
    title: 'Tanque de 21 litros e consumo 14–17 km/L — autonomia de ~300 km em uso misto',
    body: 'A CB1300 tem tanque generoso de 21 litros. Com consumo médio de 14–17 km/L em uso misto (estrada e cidade), a autonomia real fica entre 280–350 km. Em rodovias a 110 km/h, consumo cai para 16–18 km/L. Em pilotagem mais esportiva com acelerações frequentes, pode chegar a 12–13 km/L. Use sempre combustível de qualidade (gasolina com etanol abaixo de 27%) — o sensor de lambda da PGM-FI adapta a mistura ao teor de etanol, mas combustível adulterado causa danos nos injetores e bomba a médio prazo. A luz de reserva acende com aproximadamente 3,5 L restantes — não espere até apagar a moto para abastecer.',
  },
  {
    severity: 'OK',
    title: 'Verificação anual do regulador/retificador — conector de 6 vias é o ponto vulnerável da elétrica',
    body: 'O regulador/retificador original da CB1300 SC54 tem histórico de aquecimento excessivo documentado pela comunidade Honda de grande cilindrada. Anualmente: (1) meça a tensão de carga entre os terminais da bateria com motor em 4.000 rpm — deve estar entre 13,8 V e 14,8 V; (2) inspecione o conector de 6 vias do regulador por pinos enegrecidos ou derretidos. Upgrade preventivo ao MOSFET (Shindengen FM54 ou Rick\'s Motorsport, R$300–500 importado) é recomendado em motos com mais de 40.000 km — o MOSFET dissipa calor de forma eficiente sem degradar o conector.',
  },
]

// ─── CB1300 Super Four — Problemas ───────────────────────────────────────────

const CB1300_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Tensor da corrente de comando com ruído na partida a frio — risco imediato de destruição do motor',
    body: 'A CB1300 SC54 usa tensionador de corrente de comando com mecanismo hidráulico auxiliado por mola. Em motores de alta quilometragem ou com longos períodos de parada, o tensionador pode perder pressão hidráulica, resultando em folga na corrente. Sintoma: ruído metálico seco tipo "tick-tick" nos primeiros 15–30 segundos após a partida a frio que desaparece com o aquecimento. Se ignorado, a corrente pode pular um dente do comando, causando colisão de pistões com válvulas e custo de R$10.000–25.000 em rebuild completo de motor. Diagnóstico imediato: em oficina confiável, inspecione o guia da corrente de comando pelo visor de inspeção. Substitua o tensor se houver qualquer ruído suspeito na partida.',
  },
  {
    severity: 'WARN',
    title: 'Regulador/retificador sobreaquecendo — conector carboniza e destrói o estátor; problema documentado',
    body: 'O regulador/retificador original dissipa o excesso de energia elétrica em calor direto — em uso urbano (baixa velocidade, farol sempre ligado, temperatura elevada), esse calor não é suficientemente dissipado. O conector de 6 vias carboniza gradualmente, aumenta a resistência elétrica e cria um ciclo progressivo de destruição. O estátor do alternador é a próxima vítima: espiras em curto, saída de tensão AC desequilibrada, carregamento insuficiente de bateria. Diagnóstico: tensão < 13,5 V a 4.000 rpm = regulador com defeito. Custo de substituição: regulador R$400–800, estátor R$800–1.500 + mão de obra. Solução definitiva: regulador MOSFET que absorve excesso como corrente controlada, sem gerar calor.',
  },
  {
    severity: 'WARN',
    title: 'Consumo excessivo de óleo em alta quilometragem — retentores de válvulas ou anéis de pistão',
    body: 'CB1300 com mais de 60.000–80.000 km podem apresentar consumo de óleo além do normal (> 500 mL a cada 1.000 km). As causas mais comuns: (1) retentores de válvula ressecados que permitem óleo escorrer pelo guia de válvula → fumaça azul no escapamento ao desacelerar; (2) anéis de pistão desgastados → fumaça azul constante em aceleração. Diagnóstico: teste de compressão por cilindro (deve ser 1.100–1.300 kPa, variação máxima de 200 kPa entre cilindros). Retentores de válvula: R$600–1.200 a intervenção. Anéis de pistão: R$3.000–5.000+ (retifica de motor). Manutenha o nível de óleo monitorado a cada 1.000 km em motos de alta quilometragem.',
  },
  {
    severity: 'WARN',
    title: 'Rolamento da coluna de direção com folga — vibração no guidão em frenagem pesada',
    body: 'Com 260+ kg colocando carga constante na direção, o rolamento (steering head bearing) da CB1300 desgasta mais rápido do que em motos menores. Sintomas: vibração no guidão durante frenagem moderada a pesada, leveza excessiva na direção em curvas (understeer) ou "pulo" ao frear. Diagnóstico com a moto no cavalete central (ou elevador): segure os garfos pelos tubos e tente movê-los para frente e para trás — qualquer folga indica rolamento desgastado. Troca do rolamento cônico duplo (tapered): R$250–500 em peças + R$300–500 em mão de obra. Substitua pelos rolamentos tapered cônicos aftermarket (FAG, SKF) — são superiores ao rolamento de esferas original.',
  },
  {
    severity: 'WARN',
    title: 'Bomba de combustível falhando em alta quilometragem — sintomas intermitentes que frustram o diagnóstico',
    body: 'A bomba de combustível elétrica submersa da CB1300 SC54 tem vida útil típica de 60.000–80.000 km. Falha característica: intermitente — a moto para completamente (sem combustível chegando aos injetores), espera 5–10 minutos com motor resfriando e volta a funcionar normalmente. Isso ocorre porque a bomba sobreaquece quando começa a falhar e para por segurança térmica. Diagnóstico: medição da pressão do rail de combustível (deve ser 300–350 kPa em regime). Substituição: R$600–1.200 pela bomba original Honda; alternativas compatíveis Facet ou Walbro (R$250–450). Procedimento exige remoção do tanque de 21 L — serviço de 2–3 horas.',
  },
  {
    severity: 'WARN',
    title: 'Retentores do garfo telescópico — vazamento de óleo após alta quilometragem ou longo tempo parada',
    body: 'A CB1300 usa garfo telescópico convencional Ø45 mm (diferente das esportivas com garfo invertido). Retentores originais têm vida útil de 40.000–60.000 km. Sintoma claro: mancha de óleo no tubo do garfo, especialmente visível após viagem longa. Garfo com óleo vazando contamina o disco dianteiro com óleo, comprometendo a frenagem de forma perigosa — disco oleado pode reduzir a eficiência de frenagem em 40–60%. Troque os retentores dos dois garfos juntos (par) junto com o óleo. Óleo recomendado: Honda SS-8 (10W) ou Motul Fork Oil Expert 10W. Custo: R$150–250 em retentores + R$300–500 em mão de obra.',
  },
  {
    severity: 'WARN',
    title: 'Válvula PAIR (sistema de ar secundário) entupida — marcha lenta instável e surging em desaceleração',
    body: 'A CB1300 SC54 tem o sistema PAIR (Pulse Secondary Air Injection) para queima de emissões no escapamento. Com o tempo, a válvula de membrana do PAIR deteriora ou a mangueira de vácuo rachado deixa de controlar adequadamente o ar secundário. Sintomas: marcha lenta que sobe e desce ("hunting"), retorno ("surging" ou "popping") ao fechar o acelerador abruptamente em desaceleração, especialmente com escape modificado ou re-mapeado. Diagnóstico: localize as mangueiras do PAIR (lado direito do motor) e verifique por rachaduras. Solução: bloquear o sistema PAIR (PAIR block off kit, R$100–200) com remapeamento da injeção, ou substituir a válvula original (R$200–400).',
  },
  {
    severity: 'WARN',
    title: 'Ferrugem interna no tanque de 21 litros — contamina injetores e filtro de combustível',
    body: 'O tanque de aço de 21 litros é suscetível a ferrugem interna em motos que ficaram muito tempo paradas com pouco combustível — condensação de umidade dentro do tanque é a causa principal. A ferrugem em flocos ou pó pode passar pelo filtro inline se este estiver saturado, chegando aos injetores e bloqueando os orifícios de ~0,2 mm. Sintomas: falhas de cilindros intermitentes, perda de potência progressiva. Diagnóstico: inspecione o interior do tanque com lanterna pela abertura do bujão. Tratamento: limpeza química com ácido fosfórico (Ferroferro ou similar) + selante POR-15 Tank Sealer (~R$200–350). Após tratar o tanque, substitua obrigatoriamente o filtro de combustível.',
  },
]

// ─── CB1300 Super Four — Calibragem ──────────────────────────────────────────

const CB1300_TIRE = {
  modelName:    'CB1300 SUPER FOUR',
  yearFrom:     2007,
  yearTo:       2008,
  tireSize:     '120/70 ZR17 (F) · 180/55 ZR17 (R)',
  frontPsi:     33,
  rearPsi:      39,
  frontPsiLoad: 33,
  rearPsiLoad:  42,
  notes:        'Com 260+ kg em ordem de marcha, jamais subestime as pressões dos pneus. Calibrar SEMPRE com pneus frios (antes de rodar ou após 2+ horas parado). Com garupa ou carga: traseiro 42 PSI. Pneu radial ZR obrigatório — não substitua por categoria H ou V.',
}

// ─── CB1300 Super Four — Manutenção ──────────────────────────────────────────

const CB1300_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CB1300 SUPER FOUR', yearFrom: 2007, yearTo: 2008, component: 'Óleo do motor (10W-40 JASO MA2) + filtro', intervalKm: 5000, intervalMonths: 6, notes: 'Capacidade: ~4,5 L com filtro. Motul 7100 4T, Honda HP4 ou Castrol Power1 Racing.', priority: 'CRITICAL', order: 1 },
  { modelName: 'CB1300 SUPER FOUR', yearFrom: 2007, yearTo: 2008, component: 'Velas de ignição (NGK CR9EH-9) — jogo de 4', intervalKm: 12000, intervalMonths: 24, notes: 'Gap 0,9 mm. Opção iridium NGK DPCR9EVX dura ~24.000 km. Troque o jogo completo.', priority: 'HIGH', order: 2 },
  { modelName: 'CB1300 SUPER FOUR', yearFrom: 2007, yearTo: 2008, component: 'Regulagem de válvulas (DOHC 16 válvulas)', intervalKm: 16000, intervalMonths: 24, notes: 'Adm: 0,16 ± 0,03 mm / Esc: 0,27 ± 0,03 mm com motor frio. Serviço laborioso.', priority: 'CRITICAL', order: 3 },
  { modelName: 'CB1300 SUPER FOUR', yearFrom: 2007, yearTo: 2008, component: 'Lubrificação da corrente de transmissão (530)', intervalKm: 800, intervalMonths: null, notes: 'Spray de corrente específico. Nunca WD-40 puro. Folga: 20–30 mm ponto médio inferior.', priority: 'HIGH', order: 4 },
  { modelName: 'CB1300 SUPER FOUR', yearFrom: 2007, yearTo: 2008, component: 'Verificação/ajuste da tensão da corrente', intervalKm: 3000, intervalMonths: 1, notes: 'Ajuste pelos blocos excêntricos do eixo traseiro. Verifique desgaste lateral nos elos.', priority: 'HIGH', order: 5 },
  { modelName: 'CB1300 SUPER FOUR', yearFrom: 2007, yearTo: 2008, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Filtro de papel original. Em uso em cidade com poluição intensa: 8.000 km.', priority: 'MEDIUM', order: 6 },
  { modelName: 'CB1300 SUPER FOUR', yearFrom: 2007, yearTo: 2008, component: 'Filtro de combustível inline', intervalKm: 12000, intervalMonths: 12, notes: 'Posicionado sob o tanque de 21 L. Honda original ou Mann/Fram compatível.', priority: 'MEDIUM', order: 7 },
  { modelName: 'CB1300 SUPER FOUR', yearFrom: 2007, yearTo: 2008, component: 'Fluido de freio (DOT 4) — 3 circuitos', intervalKm: null, intervalMonths: 24, notes: '3 circuitos independentes. ~400–500 mL total. Com ABS: sangramento requer procedimento específico.', priority: 'HIGH', order: 8 },
  { modelName: 'CB1300 SUPER FOUR', yearFrom: 2007, yearTo: 2008, component: 'Líquido de arrefecimento (etileno-glicol 50/50)', intervalKm: null, intervalMonths: 24, notes: 'Honda Long Life Coolant ou equivalente. Nunca água pura. ~2,5 L conforme o ano.', priority: 'HIGH', order: 9 },
  { modelName: 'CB1300 SUPER FOUR', yearFrom: 2007, yearTo: 2008, component: 'Óleo do garfo telescópico + retentores (Ø45 mm)', intervalKm: 25000, intervalMonths: null, notes: 'Honda SS-8 (10W) ou Motul Fork Oil 10W. Substituir retentores se houver vazamento.', priority: 'MEDIUM', order: 10 },
  { modelName: 'CB1300 SUPER FOUR', yearFrom: 2007, yearTo: 2008, component: 'Kit de transmissão (corrente 530 + coroa + pinhão)', intervalKm: 20000, intervalMonths: null, notes: 'DID 530ZVM-X + JT Sprockets (JTF341 + JTR1331). Troque os 3 juntos. Nunca misture novos com usados.', priority: 'HIGH', order: 11 },
  { modelName: 'CB1300 SUPER FOUR', yearFrom: 2007, yearTo: 2008, component: 'Verificação do regulador/retificador + estátor', intervalKm: null, intervalMonths: 12, notes: 'Medir tensão de carga: 13,8–14,8 V a 4.000 rpm. Inspecionar conector de 6 vias por pinos queimados.', priority: 'HIGH', order: 12 },
]

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS = [
  { modelName: 'CB1300 SUPER FOUR', yearFrom: 2007, yearTo: 2008, MACETES: CB1300_MACETES, PROBLEMAS: CB1300_PROBLEMAS },
]

// ─── Runner ───────────────────────────────────────────────────────────────────

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

  // TirePressure
  await prisma.tirePressure.deleteMany({ where: { modelName: CB1300_TIRE.modelName } })
  await prisma.tirePressure.create({ data: CB1300_TIRE })
  console.log(`🔵 TirePressure: ${CB1300_TIRE.modelName}`)

  // MaintenanceItems
  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: BLOCKS.map(b => b.modelName) } } })
  await prisma.maintenanceItem.createMany({ data: CB1300_MANUTENCAO })
  console.log(`🔧 MaintenanceItems: ${CB1300_MANUTENCAO.length} itens`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
