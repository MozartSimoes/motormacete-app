// seed-honda-cbr900rr.ts — Honda CBR 900 RR FireBlade (1993–2004)
// FIPE: "CBR 900 RR FIRE BLADE" (código 2778) — SC28 (893cc) · SC33 (919cc) · SC44 (929cc) · SC50 (954cc)
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

// ─── CBR 900 RR FireBlade — Macetes ───────────────────────────────────────────

const CBR900RR_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA2 — 3,5 L com filtro; troca obrigatória a cada 5.000 km',
    body: 'Use 10W-40 API SN/SP JASO MA2 (obrigatório para embreagem úmida). Capacidade: ~3,2 L sem filtro; 3,5 L com filtro novo (verifique manual do seu ano). Motor inline-4 de alto rendimento com temperaturas elevadas — não estenda além de 5.000 km em uso misto ou 3.000 km em uso esportivo intenso. Recomendados: Motul 7100 4T 10W-40, Honda HP4 10W-40, Castrol Power1 Racing 10W-40. Nunca use óleo de carro com aditivos "economy" — destroem a embreagem multidisco.',
  },
  {
    severity: 'OK',
    title: 'Velas NGK CR9EH-9 — 4 velas no inline-4; troque o jogo completo a cada 12.000 km',
    body: 'O motor tem 4 cilindros = 4 velas. Vela padrão: NGK CR9EH-9 (gap 0,8–0,9 mm). Opção iridium: NGK CR9EIX (gap 0,8 mm, dura 20.000 km). Troque sempre o jogo completo — velas com desgaste desigual causam vibração e combustão irregular perceptível no inline-4. Torque de aperto: 14–16 N.m (rosca M14). Em concessionária o jogo de 4 velas NGK CR9EH-9 custa R$60–100; a troca requer remoção do tanque e airbox nos modelos carburados.',
  },
  {
    severity: 'WARN',
    title: 'Regulagem de válvulas (DOHC, 16 válvulas) — obrigatória a cada 16.000 km; serviço caro mas crítico',
    body: 'O motor DOHC 4 cilindros 16 válvulas exige regulagem de folgas a cada 16.000 km. Folgas especificadas (motor frio): admissão 0,13–0,20 mm / escape 0,22–0,30 mm (confirme no manual do seu ano — varia entre gerações). Negligência gera ruídos metálicos progressivos, perda de compressão e dano ao cabeçote. Custo em oficina especializada: R$500–900; concessionária Honda: R$1.000–1.500. Se comprar usada sem histórico documentado, esse é o primeiro serviço a agendar antes de qualquer viagem longa.',
  },
  {
    severity: 'OK',
    title: 'Corrente 530 o-ring — lubrifique a cada 800 km; kit relação a cada 15.000–20.000 km',
    body: 'A CBR 900 RR usa corrente padrão 530 (o-ring ou x-ring). Lubrifique com spray de corrente específico a cada 800–1.000 km — nunca use WD-40 puro, que resseca os o-rings. Folga correta no ponto médio inferior: 20–30 mm com piloto sentado. Tensione pelos blocos excêntricos do eixo traseiro. Kit relação (corrente + coroa + pinhão): troque os 3 juntos a cada 15.000–20.000 km. Nunca misture componentes novos com usados desgastados — a combinação acelera o desgaste do item novo.',
  },
  {
    severity: 'WARN',
    title: 'Sincronismo dos 4 carburadores (modelos 1993–2001) — a cada 8.000 km; afeta muito o desempenho',
    body: 'Os modelos SC28, SC33 e SC44 (até 2001) usam 4 carburadores Keihin em linha. O sincronismo desregula naturalmente após 8.000–10.000 km de uso, causando vibração, marcha lenta irregular, consumo alto e perda de potência. A regulagem é feita com manômetro de coluna de mercúrio (synchrometer) nas tomadas de vácuo de cada cilindro. Serviço em oficina especializada: R$200–400. O modelo SC50 (2002–2004) usa injeção eletrônica PGM-FI e dispensa esse serviço.',
  },
  {
    severity: 'OK',
    title: 'Freios dianteiros radiais — pastilhas Brembo SC ou EBC HH substituem o original com ganho real',
    body: 'A CBR 900 RR tem pinças dianteiras de alto desempenho (modelos tardios têm Nissin 4 pistões radial). As pastilhas originais têm vida útil de 8.000–12.000 km em uso misto. Alternativas superiores: Brembo SC (sinterizadas, ~R$180/par), EBC HH (R$130–160/par). Troque sempre o par completo por pinça. Disco mínimo de uso: confira especificação do manual (varia entre gerações). Com ABS (alguns modelos tardios): o sensor de roda fica exposto ao pó metálico das pastilhas — limpe na cada troca.',
  },
  {
    severity: 'OK',
    title: 'Fluido de freio DOT 4 — troca a cada 2 anos independente da quilometragem',
    body: 'O fluido DOT 4 absorve umidade do ar mesmo sem uso — após 2 anos o ponto de ebulição cai drasticamente, criando risco de vapor nos freios (brake fade) em frenagens longas e repetidas. Troca a cada 2 anos é obrigatória. Use apenas DOT 4 (nunca DOT 5 silicone — incompatível). Sintoma de fluido vencido: alavanca de freio esponjosa após frenagem intensa na descida. Quantidade aproximada: 250–300 mL por circuito. Custo do fluido: R$25–50 (frasco 500 mL).',
  },
  {
    severity: 'OK',
    title: 'Líquido de arrefecimento — troca a cada 2 anos; nunca use água pura no sistema de alumínio',
    body: 'Use Honda Long Life Coolant (roxo) ou equivalente com base etileno-glicol diluído 50/50 em água destilada. Nunca use água pura — corrói as partes de alumínio do motor e do radiador em questão de meses. Troca a cada 2 anos (ou 30.000 km). Capacidade: ~1,9–2,3 L dependendo do ano. Verifique o nível pelo reservatório lateral com motor frio. Nível abaixo do mínimo em moto com histórico desconhecido pode indicar vazamento pelo cabeçote — teste de pressão antes de comprar usada.',
  },
  {
    severity: 'OK',
    title: 'Óleo do garfo invertido Showa — troca a cada 25.000 km ou junto com os retentores',
    body: 'O garfo invertido Showa é ponto forte da CBR 900 RR, mas após 20+ anos o óleo perde viscosidade e os retentores endurecem. Troca preventiva a cada 25.000 km ou imediatamente se houver mancha de óleo no tubo externo do garfo. Use Honda SS-8 (10W) ou Motul Fork Oil Expert 10W. A troca exige desmontagem completa do garfo — serviço para oficina com experiência em suspensão de esportiva. Custo: R$300–600 incluindo retentores. Garfo com óleo degradado compromete a frenagem e a estabilidade nas curvas.',
  },
  {
    severity: 'OK',
    title: 'Pneus ZR17 — 120/70 ZR17 (F) e 180/55 ZR17 (R); nunca use categorias H ou V',
    body: 'A CBR 900 RR é homologada para uso apenas com pneus ZR (índice de velocidade Z — acima de 240 km/h). Nunca monte pneus H (210 km/h) ou V (240 km/h) — além de inseguro é tecnicamente inadequado para o perfil de uso da moto. Pressões frios: 33 PSI dianteiro / 39 PSI traseiro solo; 33 PSI / 42 PSI com garupa. Recomendados: Pirelli Diablo Rosso III, Michelin Road 6, Bridgestone Battlax S23. Em motos com mais de 15 anos de uso, verifique a data de fabricação dos pneus (código DOT) — pneu com mais de 6 anos deve ser substituído independente do aspecto visual.',
  },
  {
    severity: 'WARN',
    title: 'Selim alto 815 mm — condução exige habilidade; não é moto para iniciantes',
    body: 'A CBR 900 RR foi projetada para ser leve e ágil para seu motor — com 185–192 kg em ordem de marcha e selim a 815 mm, exige que o piloto tenha conforto com apenas uma ponta de pé no solo. Em manobras de estacionamento e velocidade zero, o peso concentrado pode surpreender pilotos acostumados com naked bikes mais baixas. Não é um defeito — é o projeto original do Tadao Baba, criador da FireBlade, que priorizou leveza e manobrabilidade acima de acessibilidade. Botas com solado espesso (+2–3 cm) ajudam significativamente.',
  },
  {
    severity: 'OK',
    title: 'Verificação do regulador/retificador — inspecione o conector anualmente; item de vida útil limitada',
    body: 'O regulador/retificador original (SH535 / SH847 dependendo do ano) é o ponto fraco elétrico documentado da série CBR 900 RR. Inspecione o conector de 6 vias do regulador anualmente: pinos queimados ou enegrecidos indicam sobrecarga iminente. Teste a tensão de carga com multímetro entre os terminais da bateria com motor em 4.000 rpm — deve estar entre 13,8 V e 14,8 V. Abaixo de 13,5 V = regulador com defeito. Upgrade preventivo para regulador MOSFET (Shindengen FM54 ou Rick\'s Motorsport, R$250–450 importado) é o melhor investimento em motos com mais de 50.000 km.',
  },
]

// ─── CBR 900 RR FireBlade — Problemas ────────────────────────────────────────

const CBR900RR_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Tensor de corrente de comando desgastado — ruído na partida fria precede destruição do motor',
    body: 'O tensionador de corrente de comando (cam chain tensioner) original da série SC28/SC33 usa mola de baixa pressão que perde força com os anos. Sintoma inicial: barulho "tick-tick-tick" metálico rítmico durante os primeiros 30 segundos após a partida a frio, que some quando o motor aquece. Se ignorado, a corrente de comando perde tensão, salta um dente do comando e o motor bate pistão nas válvulas — custo de R$8.000–20.000 em rebuild ou motor novo. Solução preventiva: substituir pelo tensor de parafuso ajustável aftermarket (Tsubaki, Iwis, ~R$300–500 importado) ao primeiro sinal de ruído.',
  },
  {
    severity: 'WARN',
    title: 'Regulador/retificador sobreaquece e queima o estátor — vício crônico documentado da série',
    body: 'O regulador/retificador original SH535/SH847 da Honda dissipa o excesso de energia elétrica em forma de calor diretamente no componente — projeto que funciona mal em uso urbano de baixa velocidade com elétricos ligados (farol, instrumentos). Resultado: regulador esquenta, conector de 6 vias carboniza, estátor entra em curto por sobretensão. Custo: R$600–1.200 para regulador + R$800–1.500 para estátor. Diagnóstico: bateria que não carrega completamente, tensão de carga abaixo de 13,5 V com motor a 4.000 rpm. Solução definitiva: regulador MOSFET que absorve o excesso de forma eficiente sem gerar calor excessivo.',
  },
  {
    severity: 'WARN',
    title: 'Retentores do garfo invertido — vazamento de óleo após 20+ anos é praticamente inevitável',
    body: 'O garfo invertido Showa da CBR 900 RR é excelente, mas os retentores originais têm vida útil de 30.000–50.000 km em condições ideais — e moto de 20+ anos frequentemente nunca teve o garfo aberto. Sinal: mancha de óleo no tubo externo do garfo, especialmente visível depois de uma longa viagem. Garfo vazando compromete a frenagem (óleo contamina o disco dianteiro) e a estabilidade direcional. Troca de retentores + óleo de garfo: R$250–500 em mão de obra + R$80–150 em retentores. Sempre troque os dois lados juntos.',
  },
  {
    severity: 'WARN',
    title: 'Carburadores oxidados em motos paradas (modelos 1993–2001) — limpeza total antes de rodar',
    body: 'Os modelos SC28, SC33 e SC44 têm 4 carburadores Keihin em linha. Moto que ficou parada por 6+ meses com gasolina no flutuador desenvolve verniz (resina de gasolina envelhecida) e oxidação nos jatos, entupindo as passagens de combustível. Sintomas: marcha lenta irregular, afogamento em aceleração súbita, falha de cilindros. Limpeza ultrassônica completa do bloco de carburadores é o método mais eficaz (~R$300–500 em oficina especializada). Troca dos o-rings e agulhas junto com a limpeza garante mais 20.000 km sem problemas.',
  },
  {
    severity: 'WARN',
    title: 'Ferrugem no interior do tanque de combustível — contaminação silenciosa dos carburadores',
    body: 'O tanque original é em aço carbono — com 25+ anos de uso e ciclos de condensação interna, a ferrugem interna é comum, especialmente em motos que ficaram com pouco combustível por longos períodos. A ferrugem em flocos chega aos carburadores (ou injetores no SC50) pelos bicos de combustível, entupindo jatos e provocando falhas intermitentes que frustram o diagnóstico. Inspeção obrigatória na compra de qualquer CBR 900 usada: iluminação com lanterna pela tampa do combustível. Tratamento com POR-15 Tank Sealer ou Kreem (~R$200–300) resolve; tanque com ferrugem avançada deve ser substituído.',
  },
  {
    severity: 'WARN',
    title: 'Mangueiras de arrefecimento endurecidas e com micro-rachaduras — risco de ruptura em viagem',
    body: 'A borracha original do sistema de arrefecimento deteriora com o tempo independente de uso — calor do motor, variações de temperatura e envelhecimento natural endurecem as mangueiras, que desenvolvem micro-rachaduras invisíveis externamente. Em moto de 20+ anos sem histórico de manutenção, uma ruptura de mangueira em velocidade deixa o motor sem refrigeração em minutos, causando superaquecimento e dano ao cabeçote. Inspeção palpando cada mangueira com motor frio: mangueira boa cede levemente à pressão sem estalar. Kit de mangueiras (importado ou silicone aftermarket): R$200–450.',
  },
  {
    severity: 'WARN',
    title: 'Bobinas de ignição com falhas intermitentes por envelhecimento do isolamento',
    body: 'Bobinas de ignição com 20-30 anos têm o isolamento interno ressecado e com micro-fissuras. Sintoma característico: falha de cilindro intermitente que piora com o motor quente e desaparece quando resfria — como se o problema "some sozinho". Em dias quentes de verão, pode fazer a moto parar completamente longe de casa. Diagnóstico: medição da resistência primária (0,5–1,5 Ω) e secundária (8.000–12.000 Ω) com multímetro. Substituição individual: R$200–450 por bobina (importada). Com 4 cilindros, se uma falhou por idade, as demais logo seguirão — considere trocar o jogo.',
  },
  {
    severity: 'WARN',
    title: 'Estátor com espira em curto — consequência direta do regulador sobreaquecido',
    body: 'O estátor (gerador interno) da CBR 900 RR SC28/SC33 é frequentemente a vítima do regulador com defeito (veja problema do regulador). O regulador que sobreaquece envia picos de tensão de volta ao estátor, queimando espiras individualmente. Diagnóstico: medir resistência AC entre os 3 fios do estátor com motor em 4.000 rpm — deve gerar 40–70 V AC em cada fase; valores desiguais ou muito baixos indicam espira em curto. Substituição do estátor: R$600–1.200 mais mão de obra de desmontagem do motor. Recomendação: ao trocar o regulador, testar o estátor no mesmo momento.',
  },
]

// ─── CBR 900 RR FireBlade — Calibragem ───────────────────────────────────────

const CBR900RR_TIRE = {
  modelName:    'CBR 900 RR',
  yearFrom:     1993,
  yearTo:       2004,
  tireSize:     '120/70 ZR17 (F) · 180/55 ZR17 (R)',
  frontPsi:     33,
  rearPsi:      39,
  frontPsiLoad: 33,
  rearPsiLoad:  42,
  notes:        'Pneus radiais ZR de alta performance obrigatórios. Calibrar SEMPRE frio (antes de andar). Com garupa: 42 PSI traseiro. Em motos com mais de 6 anos de pneu, substitua independente do aspecto visual — a borracha endurece e perde aderência.',
}

// ─── CBR 900 RR FireBlade — Manutenção ───────────────────────────────────────

const CBR900RR_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CBR 900 RR', yearFrom: 1993, yearTo: 2004, component: 'Óleo do motor (10W-40 JASO MA2) + filtro', intervalKm: 5000, intervalMonths: 6, notes: 'Capacidade: ~3,5 L com filtro. Motul 7100 4T ou Honda HP4 recomendados.', priority: 'CRITICAL', order: 1 },
  { modelName: 'CBR 900 RR', yearFrom: 1993, yearTo: 2004, component: 'Velas de ignição (NGK CR9EH-9) — jogo de 4', intervalKm: 12000, intervalMonths: 24, notes: 'Gap 0,8–0,9 mm. Iridium NGK CR9EIX dura 20.000 km. Troque o jogo completo.', priority: 'HIGH', order: 2 },
  { modelName: 'CBR 900 RR', yearFrom: 1993, yearTo: 2004, component: 'Regulagem de válvulas (DOHC 16 válvulas)', intervalKm: 16000, intervalMonths: 24, notes: 'Adm: 0,13–0,20 mm / Esc: 0,22–0,30 mm com motor frio. Confirmar no manual do ano.', priority: 'CRITICAL', order: 3 },
  { modelName: 'CBR 900 RR', yearFrom: 1993, yearTo: 2004, component: 'Lubrificação da corrente de transmissão (530)', intervalKm: 800, intervalMonths: null, notes: 'Spray de corrente específico. Nunca WD-40 puro. Folga: 20–30 mm ponto médio inferior.', priority: 'HIGH', order: 4 },
  { modelName: 'CBR 900 RR', yearFrom: 1993, yearTo: 2004, component: 'Verificação/ajuste da tensão da corrente', intervalKm: 3000, intervalMonths: 1, notes: 'Ajuste pelos blocos excêntricos do eixo traseiro. Verifique também o desgaste lateral.', priority: 'HIGH', order: 5 },
  { modelName: 'CBR 900 RR', yearFrom: 1993, yearTo: 2001, component: 'Sincronismo dos 4 carburadores Keihin', intervalKm: 8000, intervalMonths: 12, notes: 'Manômetro de coluna de mercúrio (synchrometer). Marcha lenta 1.000–1.200 rpm.', priority: 'HIGH', order: 6 },
  { modelName: 'CBR 900 RR', yearFrom: 1993, yearTo: 2004, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Filtro de papel original. Em uso off-road ou terra: 6.000 km. Nunca rodar sem filtro.', priority: 'MEDIUM', order: 7 },
  { modelName: 'CBR 900 RR', yearFrom: 1993, yearTo: 2004, component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, notes: 'Troca obrigatória a cada 2 anos — absorve umidade. ~250–300 mL por circuito.', priority: 'HIGH', order: 8 },
  { modelName: 'CBR 900 RR', yearFrom: 1993, yearTo: 2004, component: 'Líquido de arrefecimento (etileno-glicol 50/50)', intervalKm: null, intervalMonths: 24, notes: 'Honda Long Life Coolant ou equivalente. Nunca água pura. ~1,9–2,3 L conforme o ano.', priority: 'HIGH', order: 9 },
  { modelName: 'CBR 900 RR', yearFrom: 1993, yearTo: 2004, component: 'Óleo do garfo invertido + retentores (Showa)', intervalKm: 25000, intervalMonths: null, notes: 'Honda SS-8 (10W) ou Motul Fork Oil 10W. Substituir retentores se houver vazamento.', priority: 'MEDIUM', order: 10 },
  { modelName: 'CBR 900 RR', yearFrom: 1993, yearTo: 2004, component: 'Kit de transmissão (corrente 530 + coroa + pinhão)', intervalKm: 18000, intervalMonths: null, notes: 'Troque os 3 juntos. DID 530ZVM-X + JT Sprockets é a combinação mais utilizada.', priority: 'HIGH', order: 11 },
  { modelName: 'CBR 900 RR', yearFrom: 1993, yearTo: 2004, component: 'Verificação do regulador/retificador e estátor', intervalKm: null, intervalMonths: 12, notes: 'Medir tensão de carga: 13,8–14,8 V a 4.000 rpm. Inspecionar conector de 6 vias por pinos queimados.', priority: 'HIGH', order: 12 },
]

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS = [
  { modelName: 'CBR 900 RR', yearFrom: 1993, yearTo: 2004, MACETES: CBR900RR_MACETES, PROBLEMAS: CBR900RR_PROBLEMAS },
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
  await prisma.tirePressure.deleteMany({ where: { modelName: CBR900RR_TIRE.modelName } })
  await prisma.tirePressure.create({ data: CBR900RR_TIRE })
  console.log(`🔵 TirePressure: ${CBR900RR_TIRE.modelName}`)

  // MaintenanceItems
  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: BLOCKS.map(b => b.modelName) } } })
  await prisma.maintenanceItem.createMany({ data: CBR900RR_MANUTENCAO })
  console.log(`🔧 MaintenanceItems: ${CBR900RR_MANUTENCAO.length} itens`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
