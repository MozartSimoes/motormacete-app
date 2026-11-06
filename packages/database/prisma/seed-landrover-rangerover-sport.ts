/**
 * Seed Land Rover Range Rover Sport — macetes, problemas, manutenção e calibragem
 * NÃO é o Range Rover "grande"/Vogue (carro-chefe da marca), NEM o Evoque,
 * NEM o Velar — são modelos e plataformas distintas, tratados em arquivos
 * de seed separados com seus próprios valores de modelName.
 * O Range Rover Sport nasceu em 2005 (geração L320, 2005-2013) como a
 * primeira variante "Sport" da linha Range Rover, derivada da plataforma
 * do Discovery 3 (base LR-PLA-integral) com motores V8 a gasolina de
 * origem Jaguar (AJ-V8) e diesel TDV6/TDV8. A 2ª geração (L494, 2013-2022)
 * trouxe carroceria monobloco em alumínio (redução de peso expressiva),
 * motor diesel SDV6 3.0, V8 5.0 Supercharged, a versão SVR de alta
 * performance e, a partir de ~2018, a híbrida plug-in P400e. A 3ª geração
 * (L461, 2022-atual) estreou a plataforma MLA-Flex compartilhada com o
 * novo Range Rover/Defender, com motor 6 cilindros diesel/gasolina
 * mild-hybrid e a plug-in hybrid de topo P550e/P460e.
 * Execute: pnpm --filter @motormacete/database db:seed:landrover-rangerover-sport
 *
 * Fontes: procon.sp.gov.br, autopapo.com.br, landrover.com.br,
 *         roverparts.eu, aerosus.pt, rangerovers.net, 4x4brasil.com.br,
 *         foreignautomotive.ca, royalrebuilds.co.uk, opinautos.com.br,
 *         jantes-e-pneus.com, servomotorsadjust.com
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- 2005-2013 (L320 — primeira geração, TDV6/TDV8 diesel ou V8 4.2/4.4/5.0 gasolina) ----------
const MACETES_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'V8 4.4/4.2 é de origem Jaguar (AJ-V8) — mesmo motor da família do Range Rover Vogue L322 da época',
    body: 'Os motores V8 a gasolina 4.4 e 4.2 Supercharged dessa geração são da família AJ-V8, compartilhada com o Range Rover Vogue (L322) e modelos Jaguar contemporâneos. Oficina especializada em Jaguar/Range Rover da mesma época tende a conhecer melhor as particularidades desse motor do que uma oficina genérica.',
  },
  {
    severity: 'OK',
    title: 'Terrain Response: escolha o modo antes de entrar no obstáculo, não durante',
    body: 'O sistema Terrain Response (modos de condução conforme o terreno — lama/cascalho, areia, pedra) rende muito mais quando ajustado antes de entrar na situação difícil. Trocar de modo já atolado ou no meio da pedra reduz a eficácia do sistema — antecipe a leitura do terreno.',
  },
]

const PROBLEMAS_G1: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'V8 AJ-V8 4.2/4.4: guias e corrente de distribuição podem falhar em quilometragem alta',
    body: 'As guias plásticas da corrente de distribuição do V8 AJ-V8 se degradam com o tempo e podem quebrar, permitindo folga ou salto da corrente — dano de motor caro, em casos graves com contato entre válvula e pistão. Chiado ou ruído metálico na partida a frio é sinal de alerta; não ignore.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão a ar: bolsas traseiras costumam ser o primeiro ponto de falha, por volta de 5 anos/80-100 mil km',
    body: 'As bolsas de ar traseiras acumulam mais ciclos de carga que as dianteiras e se degradam progressivamente com calor e idade — costumam ser o primeiro ponto de falha da suspensão a ar, geralmente entre 80.000-100.000 km ou por volta de 5 anos de uso. Sinais: perda de altura de um lado durante a noite, compressor acionando com mais frequência. Troque sempre o par (as duas bolsas de trás juntas), já que a segunda tem o mesmo histórico de uso e está no mesmo ponto de desgaste.',
  },
  {
    severity: 'WARN',
    title: 'TDV6 2.7 diesel: serviço de correia incompleto é causa de dano de motor',
    body: 'O motor 2.7 TDV6 usa correia (não corrente) para o comando, e é motor de interferência. Muita oficina troca só a correia frontal e esquece que a bomba de alta pressão de combustível, na parte traseira do motor, também é acionada por correia e é item crítico do mesmo serviço. Exija o kit completo (frontal + traseiro) na troca — pular a correia traseira é aposta cara.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático ZF (6HP ou 8HP conforme ano): unidade mecatrônica sofre com óleo sujo e superaquecimento',
    body: 'A unidade mecatrônica do câmbio ZF pode apresentar falha por volta de 80.000 km, geralmente associada a temperatura de trabalho elevada e óleo degradado — mesmo em câmbios anunciados como "selados para a vida útil". Patinação ou troca de marcha brusca entre 90.000-100.000 km também é relatada. Trocar o óleo do câmbio preventivamente, mesmo sem intervalo oficial claro, é prática recomendada por especialistas.',
  },
]

const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Cronograma Range Rover Sport (L320) 2005-2013 (TDV6 2.7/TDV8 4.4/3.6 diesel ou V8 4.2/4.4/5.0 gasolina)',
    body: '10.000 km — Troca de óleo do motor + filtro, sintético de qualidade. | 60.000 km/5 anos — Kit de correia completo no TDV6 (frontal + correia da bomba de alta pressão traseira), motor de interferência. | 20.000 km — Verificação da suspensão a ar (altura em repouso, ruído do compressor, tempo de resposta). | 60.000-80.000 km — Troca preventiva do óleo do câmbio automático ZF, mesmo em versões "selado para a vida útil". | Sempre — atenção a ruído metálico na partida a frio no V8 AJ-V8 (corrente/guias de distribuição).',
  },
]

// ---------- 2013-2022 (L494 — segunda geração, monobloco em alumínio, SDV6/V8 Supercharged/SVR/P400e híbrido) ----------
const MACETES_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Bolsa de ar furando: troque a bolsa primeiro, não deixe rodar até o compressor também falhar',
    body: 'A causa mais comum de queima do compressor de ar é rodar com vazamento em uma das bolsas de ar — o compressor trabalha continuamente tentando compensar o vazamento até superaquecer e falhar. Ao notar um canto baixo ou o compressor acionando demais, troque a bolsa com vazamento antes que o problema se espalhe para o compressor, bem mais caro de repor.',
  },
  {
    severity: 'OK',
    title: 'SVR e V8 5.0 Supercharged: óleo sintético 5W-30 de especificação JLR, trocado com mais frequência que o intervalo de fábrica',
    body: 'Especialistas recomendam antecipar a troca de óleo do V8 5.0 Supercharged/SVR para a cada 8.000 km com óleo sintético de especificação JLR — mais curto que o intervalo padrão de fábrica — para reduzir o risco de desgaste de corrente de distribuição e do retentor do snout do compressor mecânico (supercharger).',
  },
  {
    severity: 'OK',
    title: 'Híbrido plug-in P400e: bateria de 12V pode descarregar se o carro ficar parado muitas semanas',
    body: 'Nas versões híbridas plug-in (P400e/Si4), se o carro ficar parado por semanas sem uso, a bateria auxiliar de 12V pode descarregar e causar falha de partida ou alertas no sistema híbrido. Se for ficar sem rodar por muito tempo, use um carregador de manutenção (tipo CTEK) ou peça para alguém ligar o carro periodicamente.',
  },
]

const PROBLEMAS_G2: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'RECALL confirmado no Brasil — módulo de entrada sem chave pode falhar em travar as portas',
    body: 'A Land Rover convocou no Brasil unidades de Range Rover Vogue e Range Rover Sport fabricadas entre março/2012 e maio/2015 (chassi Range Rover Sport de SALWA2PF1EA000001 a SALWA2KE8FA620148) para atualização de software do módulo de entrada sem chave. Com o software desatualizado, o módulo pode falhar em travar as portas quando solicitado, permitindo abertura acidental durante a condução. Reparo gratuito disponível desde 20/08/2015, mesmo para carro revendido. Confira o chassi em www.landrover.com.br/ownership/recall ou ligue 0800 012 2733 — vale checar mesmo que o carro já tenha trocado de dono.',
  },
  {
    severity: 'DANGER',
    title: 'RECALL confirmado no Brasil — setas podem não funcionar (2018-2019)',
    body: 'A Land Rover convocou no Brasil Range Rover e Range Rover Sport fabricados entre 10/11/2017 e 18/12/2018 (chassi Range Rover Sport de SALWA2BJ0JA803579 a SALWA2BJXKA819855) porque as setas podem não funcionar ao usar a alavanca no volante — o motorista não recebe aviso visual/sonoro e outros condutores não são avisados da manobra, criando risco de colisão. Reparo gratuito: atualização de software do módulo de carroceria (BCM/GWM), cerca de 15 minutos. Confira o chassi em www.landrover.com.br/ownership/recall ou 0800 012 2733.',
  },
  {
    severity: 'WARN',
    title: 'Compressor e bolsas de suspensão a ar seguem entre os pontos mais frágeis dessa geração',
    body: 'Junto com a corrente de distribuição do SDV6, os atuadores do freio de estacionamento eletrônico (EPB) e a carbonização da EGR, o compressor e as bolsas de ar eletrônicas estão entre os pontos de falha mais comuns dessa geração na Europa. Diagnóstico precoce ao notar nivelamento irregular evita reparo mais caro depois.',
  },
  {
    severity: 'WARN',
    title: 'SDV6 3.0 diesel: tensor da corrente de distribuição é ponto de atenção documentado',
    body: 'Há relatos e casos documentados de desgaste do tensor da corrente de distribuição no motor 3.0 SDV6, com ruído de "matraca" na partida a frio como sintoma inicial. Vale investigar esse ruído cedo em vez de assumir que é "normal de diesel".',
  },
  {
    severity: 'WARN',
    title: 'V8 5.0 Supercharged/SVR: retentor do snout do compressor mecânico é falha conhecida',
    body: 'O retentor (snout seal) do compressor mecânico do V8 5.0 Supercharged, usado no SVR e em versões de topo, é ponto de falha conhecido — quando falha, contamina o óleo e reduz a pressão de sobrealimentação. Sintomas: perda de potência repentina, ruído de assobio ou matraca no topo do motor, e em alguns casos o carro entra em modo de segurança (limp mode).',
  },
  {
    severity: 'WARN',
    title: 'Híbrido plug-in (P400e): erro "sistema híbrido/ar-condicionado temporariamente indisponível" é relatado',
    body: 'Alguns proprietários da versão híbrida plug-in relatam a mensagem "Hybrid and A/C system temporarily unavailable" no painel. Na maioria dos casos, atualização de software na concessionária resolve — mas não é recomendado ignorar o alerta, já que envolve o sistema de alta tensão do carro.',
  },
]

const MANUTENCAO_G2: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Cronograma Range Rover Sport (L494) 2013-2022 (SDV6 3.0 diesel, V6/V8 gasolina, SVR 5.0 ou híbrido P400e)',
    body: '10.000-15.000 km — Troca de óleo do motor + filtro (antecipar para 8.000 km no SVR/V8 5.0 Supercharged). | 20.000 km — Verificação da suspensão a ar (bolsas, compressor, altura em repouso). | Sempre — checar o chassi nos dois recalls confirmados no Brasil (módulo de entrada sem chave 2012-2015 e setas 2017-2018) em landrover.com.br/ownership/recall. | 20.000 km — Diagnóstico eletrônico no híbrido P400e (bateria 12V, sistema de alta tensão). | Anual — Inspeção da EGR e turbina no SDV6 diesel.',
  },
]

// ---------- 2022-atual (L461 — terceira geração, plataforma MLA-Flex, mild-hybrid diesel/gasolina ou plug-in P550e/P460e) ----------
const MACETES_G3: TipInput[] = [
  {
    severity: 'OK',
    title: 'Plataforma nova (MLA-Flex) compartilhada com o Range Rover e o Defender atuais — mas o carro é outro',
    body: 'A partir dessa geração o Range Rover Sport passou a usar a plataforma MLA-Flex, a mesma base do Range Rover "grande" (L460) e parcialmente do Defender atual — mas segue sendo um modelo distinto, com carroceria, calibração e opções de motor próprias. Ao pesquisar problema ou peça, use sempre "Range Rover Sport" na busca, não "Range Rover" sozinho, para não misturar informação do carro-chefe.',
  },
  {
    severity: 'OK',
    title: 'Híbrido plug-in P550e/P460e: carregue regularmente para preservar a bateria de alta tensão',
    body: 'Nas versões plug-in, rodar meses sem nunca conectar o carregador (usando só o motor a combustão) não é ideal para a saúde da bateria de alta tensão a longo prazo. Mesmo que não dependa da autonomia elétrica no dia a dia, vale manter o hábito de carregar periodicamente.',
  },
]

const PROBLEMAS_G3: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Geração recente — poucos dados de longo prazo, priorize diagnóstico de concessionária em itens elétricos/híbridos',
    body: 'Por ser um lançamento recente (2022+), ainda há pouco histórico independente de falhas recorrentes em alta quilometragem. Alertas relacionados ao sistema híbrido de alta tensão, freio eletrônico ou suspensão a ar controlada eletronicamente merecem diagnóstico oficial JLR — a eletrônica é mais integrada que nas gerações anteriores e ferramentas genéricas nem sempre leem todos os módulos corretamente.',
  },
]

const MANUTENCAO_G3: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Range Rover Sport (L461) 2022+ (6 cilindros diesel/gasolina mild-hybrid ou plug-in P550e/P460e)',
    body: '15.000 km — Troca de óleo do motor + filtro. | 20.000 km — Verificação da suspensão a ar (altura em repouso, ruído do compressor). | Anual — Diagnóstico eletrônico completo (módulos, sistema híbrido de alta tensão quando aplicável). | 40.000 km — Fluido de freio e filtro de ar/cabine. | Sempre — manter o hábito de carregar a bateria nas versões plug-in, mesmo sem depender da autonomia elétrica.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Range Rover Sport', yearFrom: 2005, yearTo: 2013, tireSize: '255/55 R19 ou 275/40 R20 conforme versão', frontPsi: 32, rearPsi: 35, frontPsiLoad: 36, rearPsiLoad: 41, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — a suspensão a ar pode exigir recalibração junto com o ajuste de altura.' },
  { modelName: 'Range Rover Sport', yearFrom: 2013, yearTo: 2022, tireSize: '255/50 R20, 275/40 R21 ou 275/40 R22 conforme versão', frontPsi: 34, rearPsi: 38, frontPsiLoad: 38, rearPsiLoad: 44, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta. Muitas unidades saem sem estepe de fábrica (kit reparador) — verifique o porta-malas do seu exemplar.' },
  { modelName: 'Range Rover Sport', yearFrom: 2022, yearTo: null, tireSize: '275/45 R21 ou 285/40 R22 conforme versão', frontPsi: 35, rearPsi: 38, frontPsiLoad: 39, rearPsiLoad: 44, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta — pressão varia bastante entre versão híbrida (mais pesada) e a combustão pura.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Range Rover Sport', yearFrom: 2005, yearTo: 2013, component: 'Óleo do motor sintético + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'TDV6 2.7/TDV8 diesel ou V8 4.2/4.4/5.0 gasolina.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Range Rover Sport', yearFrom: 2005, yearTo: 2013, component: 'Kit de correia completo (TDV6, frontal + bomba de alta pressão traseira)', intervalKm: 60000, intervalMonths: 60, notes: 'Motor de interferência — não trocar só a correia frontal.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Range Rover Sport', yearFrom: 2005, yearTo: 2013, component: 'Verificação da suspensão a ar (bolsas, compressor)', intervalKm: 20000, intervalMonths: 12, notes: 'Bolsas traseiras costumam falhar primeiro, ~80-100 mil km.', priority: 'HIGH', order: 2 },
  { modelName: 'Range Rover Sport', yearFrom: 2005, yearTo: 2013, component: 'Troca preventiva do óleo do câmbio automático ZF', intervalKm: 80000, intervalMonths: 60, notes: 'Mesmo em versões anunciadas como "selado para a vida útil".', priority: 'HIGH', order: 3 },
  { modelName: 'Range Rover Sport', yearFrom: 2005, yearTo: 2013, component: 'Inspeção de ruído da corrente/guias de distribuição (V8 AJ-V8)', intervalKm: null, intervalMonths: 12, notes: 'Chiado ou ruído metálico na partida a frio exige investigação.', priority: 'CRITICAL', order: 4 },
  { modelName: 'Range Rover Sport', yearFrom: 2013, yearTo: 2022, component: 'Óleo do motor sintético + filtro', intervalKm: 15000, intervalMonths: 12, notes: 'Antecipar para 8.000 km no SVR/V8 5.0 Supercharged.', priority: 'CRITICAL', order: 5 },
  { modelName: 'Range Rover Sport', yearFrom: 2013, yearTo: 2022, component: 'Verificação da suspensão a ar (bolsas, compressor)', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'Range Rover Sport', yearFrom: 2013, yearTo: 2022, component: 'Checagem de recall pelo chassi (entrada sem chave 2012-2015 e setas 2017-2018)', intervalKm: null, intervalMonths: null, notes: 'Consultar landrover.com.br/ownership/recall.', priority: 'CRITICAL', order: 7 },
  { modelName: 'Range Rover Sport', yearFrom: 2013, yearTo: 2022, component: 'Diagnóstico do sistema híbrido de alta tensão e bateria 12V (P400e)', intervalKm: 20000, intervalMonths: 12, notes: 'Somente versão híbrida plug-in.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Range Rover Sport', yearFrom: 2013, yearTo: 2022, component: 'Inspeção de EGR e turbina (SDV6 diesel)', intervalKm: null, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 9 },
  { modelName: 'Range Rover Sport', yearFrom: 2022, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 15000, intervalMonths: 12, notes: '6 cilindros diesel/gasolina mild-hybrid ou plug-in P550e/P460e.', priority: 'CRITICAL', order: 10 },
  { modelName: 'Range Rover Sport', yearFrom: 2022, yearTo: null, component: 'Verificação da suspensão a ar', intervalKm: 20000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 11 },
  { modelName: 'Range Rover Sport', yearFrom: 2022, yearTo: null, component: 'Diagnóstico eletrônico completo (módulos/sistema híbrido de alta tensão)', intervalKm: null, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 12 },
  { modelName: 'Range Rover Sport', yearFrom: 2022, yearTo: null, component: 'Fluido de freio e filtro de ar/cabine', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 13 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Range Rover Sport', yearFrom: 2005, yearTo: 2013, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'Range Rover Sport', yearFrom: 2013, yearTo: 2022, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
  { modelName: 'Range Rover Sport', yearFrom: 2022, yearTo: null, MACETES: MACETES_G3, PROBLEMAS: PROBLEMAS_G3, MANUTENCAO: MANUTENCAO_G3 },
]

async function main() {
  console.log('🚗 Seed Land Rover Range Rover Sport...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Land Rover', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Land Rover', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Range Rover Sport', brandId: brand.id } },
    update: {}, create: { name: 'Range Rover Sport', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Range Rover Sport' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Range Rover Sport' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo ?? 'atual'})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Range Rover Sport' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Land Rover Range Rover Sport concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
