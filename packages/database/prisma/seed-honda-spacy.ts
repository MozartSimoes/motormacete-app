// seed-honda-spacy.ts — Honda CH 125-R SPACY (1984–2000)
// Scooter com motor 124cc OHC monocilíndrico, air-cooled, carburado
// Transmissão automática por variador contínuo (CVT) — sem pedal de câmbio
// Modelo clássico/colecionável no Brasil; peças cada vez mais raras
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

const MODEL_NAME = 'CH 125-R SPACY'
const YEAR_FROM = 1984
const YEAR_TO = 2000

// ─── Macetes ─────────────────────────────────────────────────────────────────

const MACETES: { severity: Sev; title: string; body: string }[] = [
  {
    severity: 'OK',
    title: 'Motor 124cc OHC monocilíndrico air-cooled — folga de válvulas: adm 0,05 mm / esc 0,08 mm a frio; verificar a cada 4.000 km; ajuste por parafuso e contra-porca',
    body: 'A Spacy usa motor OHC (Over Head Cam) de 124cc com 2 válvulas. Folga de válvulas: adm 0,05 ±0,02 mm / esc 0,08 ±0,02 mm com motor FRIO. Ajuste por parafuso + contra-porca (sistema simples, sem calços). Vela: NGK CR6HSA ou D6HA, gap 0,6-0,7 mm, torque 12 N.m. O motor é air-cooled — sem radiador. Em uso intenso no verão: verificar temperatura pelo toque na carcaça do cilindro após andar (deve aguentar 3 segundos — se não, motor superaquecendo).',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA (ou 10W-40 no verão), ~0,9 L — câmbio CVT compartilha o cárter do motor; troca a cada 3.000 km',
    body: 'A Spacy tem transmissão CVT (variador contínuo) integrada ao mesmo cárter do óleo de motor. 10W-30 JASO MA é obrigatório — o óleo lubrifica tanto o motor quanto os componentes do variador interno. Capacidade: ~0,9 L. Troca: a cada 3.000 km ou a cada ano. Uso intenso no verão: 10W-40 retarda degradação por calor. Óleo escuro com cheiro de queimado antes do intervalo: CVT trabalhando em excesso (roletes desgastados) ou motor com folga de válvulas apertada.',
  },
  {
    severity: 'OK',
    title: 'Transmissão CVT (variador contínuo) — roletes de variador desgastam em 15.000-20.000 km; sintoma: moto parte devagar e chega a velocidade máxima com dificuldade',
    body: 'O variador da Spacy usa roletes (sliders) de borracha prensada que centrifugam para variar a relação de transmissão. Roletes desgastados: ficam mais leves → moto não atinge a velocidade máxima, tem dificuldade de engatar "alta". Verificação: a cada 10.000 km. Troca preventiva: 15.000-20.000 km. Peso original dos roletes: verificar no manual (geralmente 15-16g). Usar roletes de peso correto — rolete mais pesado = aceleração inicial mais lenta mas melhor velocidade máxima; mais leve = o inverso. Honda original (R$80-150 o kit) ou Kymco/SYM similar.',
  },
  {
    severity: 'OK',
    title: 'Correia do variador (V-belt) — troca obrigatória a cada 20.000 km; correia quebrada = moto para no lugar sem aviso',
    body: 'A correia de transmissão do variador Spacy é um componente de desgaste com vida útil definida. Não tem "sinal de aviso" antes de quebrar — correia parte e a moto simplesmente para. Troca preventiva OBRIGATÓRIA: a cada 20.000 km ou ao perceber deslizamento (rpm sobem mas velocidade não acompanha). Correia Honda original: difícil de encontrar para Spacy clássica. Alternativas: correia Gates ou Optibelt com mesma especificação dimensional (medir comprimento × largura × ângulo). Uma correia aftermarket de qualidade custa R$80-180.',
  },
  {
    severity: 'OK',
    title: 'Freio dianteiro a disco (alguns anos) / tambor (versões iniciais) + freio traseiro a tambor — lonas de tambor: ajuste anual obrigatório',
    body: 'A Spacy pode ter freio dianteiro a disco (versões CH125R mais novas) ou tambor (versões iniciais). O traseiro é sempre tambor. Freio a tambor: ajuste do cabo a cada ano (ou quando pedal/alavanca vai fundo sem parar). Lonas de tambor Fras-le ou Honda: R$20-50. Para quem tem a versão com disco dianteiro: pastilhas Honda ou SBS (R$50-100), disco mínimo de 3,0 mm. Fluido de freio: DOT 3 em versões mais antigas, DOT 4 nas mais novas — verificar o manual.',
  },
  {
    severity: 'WARN',
    title: 'Peças originais Honda para Spacy clássica são raras no Brasil — mercado paralelo tem cópias tailandesas/chinesas; comunidades online são a melhor fonte de peças',
    body: 'O Honda Spacy saiu de linha no Brasil há mais de 20 anos. Concessionárias Honda não têm mais estoque. Fontes de peças: (1) Grupos Facebook "Honda Spacy Brasil", "Scooter Clássicas" — proprietários vendem peças de motos doadoras; (2) Lojas de scooter em São Paulo (Brás, Mercado Municipal de peças) frequentemente têm peças compatíveis; (3) Importação do Japão/Tailândia (Yahoo Japan Auctions + despachante); (4) Peças equivalentes de modelos Honda contemporâneos (CB125, Dream 100) para velas, filtros e itens elétricos.',
  },
  {
    severity: 'OK',
    title: 'Carburador Keihin — limpar a cada 6.000 km; moto parada há meses tem verniz nos jatos; sintoma clássico: Spacy parte mas apaga ao abrir o acelerador',
    body: 'Carburador Keihin da Spacy tem jatos pequenos que obstruem com verniz de combustível velho. Em moto parada >2 meses: (1) Drenar o combustível do carburador pela parafuso de drenagem; (2) Limpar os jatos com spray de carburador + agulha fina (nunca arame de aço — risca o orifício calibrado). Jato principal: #98 a #105 dependendo do ano. Agulha do carburador: verificar desgaste a cada 20.000 km (agulha oval = aceleração irregular). Jogo de jatos e agulha para Spacy: disponível em distribuidores Keihin ou similares (R$40-100).',
  },
  {
    severity: 'OK',
    title: 'Bateria de chumbo-ácido (YTX5L-BS ou similar) — verificar eletrólito semestral; moto de scooter tem gerador pequeno (alternador de 6-8A), bateria descarrega fácil',
    body: 'A Spacy usa bateria de 12V. Modelos mais novos (CH125R): YTX5L-BS selada (R$80-150). Versões mais antigas: bateria aberta (add água destilada a cada 6 meses). Verificar tensão de carga: com motor em marcha lenta, deve ser 13,0-14,5V (se abaixo de 12,8V com motor ligado = regulador de voltagem com problema). Bateria fraca: dificuldade de partida, farol fraco e pisca em marcha lenta. O alternador da Spacy é pequeno — não ligar acessórios de alto consumo (carregador USB, farol extra) sem checar o equilíbrio elétrico.',
  },
]

const PROBLEMAS: { severity: Sev; title: string; body: string }[] = [
  {
    severity: 'DANGER',
    title: 'Correia de variador rompendo sem aviso — troca preventiva a cada 20.000 km é a única proteção; correia quebrada em trânsito = risco de acidente',
    body: 'A correia do CVT não dá sinal antes de romper — parte de uma hora para outra. Em velocidade, a ruptura da correia faz a moto desacelerar subitamente sem acionamento do freio → risco de ser atingido por veículo atrás. Trocar PREVENTIVAMENTE a cada 20.000 km ou ao primeiro sinal de deslizamento. Custo de uma correia: R$80-180 (muito menor que o risco de acidente). Em viagens longas com Spacy: levar correia reserva se a moto tiver mais de 15.000 km na correia atual.',
  },
  {
    severity: 'WARN',
    title: 'Regulador de voltagem com defeito — peça muito cara e rara para Spacy clássica; sintoma: bateria supercarregando (>15V) ou sem carga (<12,5V em motor ligado)',
    body: 'O regulador de voltagem da Spacy clássica (1984-2000) é peça de difícil reposição. Quando falha em modo "curto": supercarrega a bateria (>15V) → bateria borbulha ácido e pode explodir. Quando falha em modo "aberto": bateria não carrega → moto para por descarga. Diagnóstico: multímetro nos terminais da bateria com motor em 3.000 rpm. Soluções: (1) regulador de voltagem universal de moto de baixa tensão (12V, 6-8A máx) como reposição — custo R$30-80; (2) regulador de scooter chinesa 125cc tem pinagem similar em muitos casos.',
  },
  {
    severity: 'WARN',
    title: 'Motor superaquecendo em engarrafamentos longos — air-cooled sem ventoinha auxiliar; parar o motor em paradas > 5 minutos é a melhor proteção',
    body: 'A Spacy tem motor refrigerado a ar (sem radiador ou ventoinha elétrica). Em engarrafamento onde a moto está parada com motor ligado por mais de 5 minutos: fluxo de ar zero → temperatura sobe rapidamente. Sintoma de superaquecimento: motor começa a engasgar, perda de potência, cheiro de óleo queimando. Prevenção: desligar o motor em paradas longas (acende em segundos com partida elétrica). Consequência do superaquecimento repetido: folga de válvulas apertando prematuramente, desgaste acelerado de anéis, piston rings grudando.',
  },
  {
    severity: 'WARN',
    title: 'Roletes do variador desgastados = aceleração "elástica" e velocidade máxima reduzida — roletes originais Honda quase impossíveis de encontrar; alternativas de scooter 125cc similares',
    body: 'Roletes desgastados perdem massa → variador não "abre" totalmente → velocidade máxima cai de ~100 km/h para 70-80 km/h. Roletes Honda originais para Spacy: quase impossíveis de encontrar em 2024+. Alternativas testadas pela comunidade: roletes de Yamaha Jog 125, Kymco Agility 125 (verificar diâmetro e peso). O peso dos roletes define a performance: os originais do Spacy geralmente têm 14-15g. Comprar kit com pesos diferentes (14g, 15g, 16g) e testar qual oferece melhor equilíbrio entre aceleração e velocidade máxima.',
  },
]

// ─── Tire Pressure ────────────────────────────────────────────────────────────

const TIRE_PRESSURES = [
  {
    modelName: MODEL_NAME,
    yearFrom: YEAR_FROM,
    yearTo: YEAR_TO,
    tireSize: '90/90-16 (F) · 90/90-16 (R)',
    frontPsi: 28, rearPsi: 33, frontPsiLoad: 30, rearPsiLoad: 36,
    notes: 'Scooter com pneus iguais F e R. Solo: 28/33 PSI. Com garupa: 30/36 PSI. Pneus reposição: Pirelli City Demon, Michelin City Grip ou similar 90/90-16.',
  },
]

// ─── Manutenção ──────────────────────────────────────────────────────────────

const MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: MODEL_NAME, yearFrom: YEAR_FROM, yearTo: YEAR_TO, component: 'Óleo 10W-30 JASO MA (inclui CVT) — 0,9 L', intervalKm: 3000, intervalMonths: 12, notes: 'CVT e motor compartilham o óleo. Óleo escuro antes do intervalo: investigar roletes do variador. JASO MA obrigatório.', priority: 'CRITICAL', order: 1 },
  { modelName: MODEL_NAME, yearFrom: YEAR_FROM, yearTo: YEAR_TO, component: 'Válvulas OHC (adm 0,05 / esc 0,08 mm) — inspeção e ajuste', intervalKm: 4000, intervalMonths: 12, notes: 'Motor FRIO. Parafuso + contra-porca. Vela NGK CR6HSA ou D6HA. Use escala de lâminas de 0,05 e 0,08 mm.', priority: 'CRITICAL', order: 2 },
  { modelName: MODEL_NAME, yearFrom: YEAR_FROM, yearTo: YEAR_TO, component: 'Correia CVT — inspeção e troca preventiva', intervalKm: 20000, intervalMonths: null, notes: 'Troca OBRIGATÓRIA a cada 20.000 km — sem aviso prévio de quebra. Gates ou Optibelt com mesma especificação dimensional. Carregar reserva em viagens longas.', priority: 'CRITICAL', order: 3 },
  { modelName: MODEL_NAME, yearFrom: YEAR_FROM, yearTo: YEAR_TO, component: 'Roletes do variador — inspeção e troca', intervalKm: 15000, intervalMonths: null, notes: 'Peso correto: consultar manual (geralmente 14-15g). Moto lenta na máxima = roletes desgastados. Usar roletes de scooter 125cc similar se original indisponível.', priority: 'HIGH', order: 4 },
  { modelName: MODEL_NAME, yearFrom: YEAR_FROM, yearTo: YEAR_TO, component: 'Filtro de ar — limpeza e troca', intervalKm: 6000, intervalMonths: 12, notes: 'Elemento de espuma: lavar com gasolina, secar e untar levemente com óleo. Elemento de papel: trocar. Filtro sujo = consumo aumenta e partida difícil.', priority: 'HIGH', order: 5 },
  { modelName: MODEL_NAME, yearFrom: YEAR_FROM, yearTo: YEAR_TO, component: 'Carburador Keihin — limpeza de jatos', intervalKm: 6000, intervalMonths: null, notes: 'Jato principal ~#100. Drenar o copo ao guardar moto por >30 dias. Spray de carburador nos jatos. Agulha: verificar desgaste a cada 20.000 km.', priority: 'HIGH', order: 6 },
  { modelName: MODEL_NAME, yearFrom: YEAR_FROM, yearTo: YEAR_TO, component: 'Freios (lonas de tambor F+R ou pastilha disco F)', intervalKm: 8000, intervalMonths: 12, notes: 'Tambor: ajuste do cabo anual, lona Fras-le. Disco: pastilhas SBS ou OEM. Fluido DOT 4 (versões com disco): 24 meses.', priority: 'HIGH', order: 7 },
  { modelName: MODEL_NAME, yearFrom: YEAR_FROM, yearTo: YEAR_TO, component: 'Bateria — verificação do eletrólito e tensão de carga', intervalKm: null, intervalMonths: 6, notes: 'Versão aberta: completar com água destilada. Tensão com motor em 3.000 rpm: 13-14,5V. Regulador com problema: >15V (supercarregando) ou <12,8V.', priority: 'MEDIUM', order: 8 },
  { modelName: MODEL_NAME, yearFrom: YEAR_FROM, yearTo: YEAR_TO, component: 'Vela NGK CR6HSA — troca', intervalKm: 6000, intervalMonths: 12, notes: 'Gap 0,6-0,7 mm. Torque 12 N.m. Iridium CR6HIXA: 12.000 km. Vela preta = filtro sujo ou mistura rica. Vela branca = mistura pobre.', priority: 'MEDIUM', order: 9 },
  { modelName: MODEL_NAME, yearFrom: YEAR_FROM, yearTo: YEAR_TO, component: 'Sistema elétrico — verificação de conexões', intervalKm: null, intervalMonths: 12, notes: 'Moto com 25+ anos: oxidação das conexões é a causa #1 de problemas intermitentes. Limpar conectores com WD-40 spray de contatos. Verificar fios com isolação rachada.', priority: 'MEDIUM', order: 10 },
]

// ─── Runner ───────────────────────────────────────────────────────────────────

async function main() {
  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })

  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Honda', vehicleTypeId: motoType.id } },
    update: {}, create: { name: 'Honda', vehicleTypeId: motoType.id },
  })

  const brand = await prisma.brand.findFirstOrThrow({ where: { name: 'Honda', vehicleTypeId: motoType.id } })

  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: MODEL_NAME, brandId: brand.id } },
    update: {}, create: { name: MODEL_NAME, brandId: brand.id },
  })

  const allTips = [
    ...MACETES.map(t   => ({ ...t, category: 'MACETES'   as Cat })),
    ...PROBLEMAS.map(t => ({ ...t, category: 'PROBLEMAS' as Cat })),
  ]

  await prisma.tip.deleteMany({ where: { modelName: MODEL_NAME } })
  await prisma.tip.createMany({
    data: allTips.map((tip, i) => ({
      modelName: MODEL_NAME,
      yearFrom:  YEAR_FROM,
      yearTo:    YEAR_TO,
      severity:  tip.severity,
      category:  tip.category,
      title:     tip.title,
      body:      tip.body,
      order:     i,
    })),
  })
  console.log(`✅ ${MODEL_NAME}: ${allTips.length} tips (${MACETES.length} macetes + ${PROBLEMAS.length} problemas)`)

  await prisma.tirePressure.deleteMany({ where: { modelName: MODEL_NAME } })
  await prisma.tirePressure.create({ data: TIRE_PRESSURES[0] })
  console.log(`🔵 TirePressure: ${MODEL_NAME}`)

  await prisma.maintenanceItem.deleteMany({ where: { modelName: MODEL_NAME } })
  await prisma.maintenanceItem.createMany({ data: MANUTENCAO })
  console.log(`🔧 MaintenanceItems: ${MANUTENCAO.length} itens`)

  console.log(`\n✅ Honda Spacy seed concluído! 1 modelo, ${allTips.length} tips, 1 calibragem, ${MANUTENCAO.length} itens de manutenção`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
