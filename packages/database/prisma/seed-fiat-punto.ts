/**
 * Seed Fiat Punto — macetes, problemas, manutenção e calibragem de pneus
 * A 1ª geração (Mk1) chegou importada ao Brasil em pequena escala em
 * meados dos anos 1990 (EL/ELX/S/SX/Cabrio). O Punto que a maioria
 * conhece é o Grande Punto (3ª geração mundial), fabricado em Betim (MG)
 * a partir de 2007 e vendido no Brasil só como "Punto" — plataforma SCCS
 * com elementos do 1º Palio e suspensão herdada da Idea. Facelift grande
 * em agosto/2012 (linha 2013): detalhes em preto brilhante, faróis
 * escurecidos, rodas inspiradas no Punto Abarth europeu; T-Jet 1.4 16V
 * turbo (152cv) chegou em 2013 e saiu de linha no fim de 2015. Produção
 * brasileira encerrada em 2016/2017, substituído pelo Argo.
 * Execute: pnpm --filter @motormacete/database db:seed:fiat-punto
 *
 * Fontes: allthecars.wordpress.com, oantagonista.com.br, autopapo.com.br,
 *         vrum.com.br, autolivraria.com.br, alvaromatiassa.wordpress.com,
 *         maxturbos.com.br, puntoclube.com, reclameaqui.com.br,
 *         autossegredos.com.br, garagem360.com.br, motoragora.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- 1995-1999 (1ª geração, importado, escala pequena) ----------
const MACETES_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Punto importado (EL/ELX/S/SX/Cabrio) teve escala pequena no Brasil — peça é mais difícil de achar',
    body: 'Essa primeira geração do Punto foi vendida em volume reduzido no Brasil, toda importada. Peça original é mais rara hoje em dia — vale procurar desmanches e fornecedores especializados em Fiat importado dos anos 1990/2000 antes de recorrer à concessionária.',
  },
  {
    severity: 'WARN',
    title: 'Carro com quase 30 anos — priorize inspeção estrutural e do chicote elétrico',
    body: 'Como qualquer unidade dessa idade ainda em circulação, ferrugem em soleiras/assoalho e chicote elétrico ressecado são mais determinantes para a condição do carro do que itens mecânicos de rotina.',
  },
]

const PROBLEMAS_G1: TipInput[] = []

const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Punto 1995-1999 (1ª geração importada)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo (correia + tensores + bomba d\'água), motor interferente. | Anual — Inspeção de pontos de ferrugem estrutural e do chicote elétrico. | 20.000 km — Fluido de freio.',
  },
]

// ---------- 2007-2012 (Grande Punto fabricado em Betim, chegada do Dualogic) ----------
const MACETES_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Câmbio Dualogic: solte o acelerador antes da troca de marcha completar para evitar solavanco',
    body: 'O câmbio automatizado Dualogic tem uma pausa perceptível entre as marchas. Segurar o acelerador durante a troca causa o solavanco característico que incomoda muitos donos — soltar levemente o pé do acelerador no instante da troca (e reacelerar logo depois) deixa a condução bem mais suave. É jeito de dirigir, não defeito.',
  },
  {
    severity: 'OK',
    title: 'Mecanismo do bocal de combustível (alavanca no assoalho) é ponto de falha conhecido',
    body: 'A tampa de combustível é acionada por uma alavanca no assoalho do carro, e esse mecanismo é queixa recorrente de falha (trava, não abre). Antes de forçar ou trocar a peça toda, verifique o cabo/trinco do mecanismo — muitas vezes é possível destravar manualmente ou lubrificar o ponto de atrito.',
  },
  {
    severity: 'OK',
    title: 'Lanterna traseira com infiltração é queixa crônica — vede antes que afete a luz de posição',
    body: 'Infiltração de água na lanterna traseira é um dos defeitos crônicos mais citados, podendo afetar a intensidade da luz de posição. Ao notar embaçamento interno na lanterna, vede a junta o quanto antes — deixar para depois só piora o problema elétrico.',
  },
]

const PROBLEMAS_G2: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'RECALL — trinca no eixo traseiro (fabricação 2009-2012) — risco de perda de controle',
    body: 'Recall oficial: unidades Punto (e Linea) fabricadas em Betim entre janeiro e junho dos anos afetados (2009 a 2012), chassis na faixa 9BD11812191065435 a 9BD118181C1165352 (113.512 unidades ao todo, somando Punto e Linea), apresentam risco de trinca na borda do feixe do eixo traseiro. Pode causar ruído excessivo, desalinhamento do volante, dificuldade de atingir a velocidade desejada e, em casos extremos, perda de controle do veículo. Reparo gratuito. Há relatos de donos no Reclame Aqui de dificuldade em conseguir o reparo mesmo com recall aberto — insista e documente o atendimento. Confira o chassi em www.fiat.com.br/recall ou pelo 0800 707 1000.',
  },
  {
    severity: 'DANGER',
    title: 'RECALL — trava do cinto de segurança traseiro central',
    body: 'A Fiat identificou risco na trava do cinto de segurança do banco traseiro central: se um passageiro do banco lateral encaixar acidentalmente seu cinto nessa trava central, a proteção fica comprometida em caso de colisão. Verifique diretamente com a Fiat (0800 707 1000 ou www.fiat.com.br/recall) se seu chassi está incluído.',
  },
  {
    severity: 'DANGER',
    title: 'RECALL — alternador com defeito — risco de o motor desligar sozinho em movimento',
    body: 'Recall envolvendo 13 modelos Fiat (incluindo Punto e Linea) por alternador com defeito que pode causar funcionamento irregular do motor e, em casos extremos, desligamento inesperado em movimento — risco de acidente por perda de dirigibilidade. Confira o chassi em www.fiat.com.br/recall ou pelo 0800 707 1000.',
  },
  {
    severity: 'WARN',
    title: 'Injeção eletrônica com falha de funcionamento pode aumentar o consumo de combustível',
    body: 'Falha na injeção eletrônica é queixa recorrente e costuma se manifestar primeiro como aumento de consumo antes de sintomas mais graves. Consumo subindo sem motivo aparente merece diagnóstico de injeção, não só troca de vela/filtro.',
  },
  {
    severity: 'WARN',
    title: 'Ruído na caixa de direção e na suspensão são queixas frequentes',
    body: 'Ruído na caixa de direção (às vezes exigindo substituição) e ruídos de suspensão dianteira/traseira aparecem com frequência nos relatos de donos. Buchas e terminais costumam ser a causa mais barata — descarte esses itens antes de trocar a caixa de direção inteira.',
  },
  {
    severity: 'WARN',
    title: 'Discos de freio empenam com facilidade em uso mais exigente',
    body: 'Discos de freio empenados por variação brusca de temperatura (frenagem forte seguida de água/lavagem, por exemplo) são queixa comum. Evite lavar rodas/discos ainda quentes logo após uso mais intenso de freio.',
  },
]

const MANUTENCAO_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Punto 2007-2012 (1.4 Fire 8V ou 1.8 8V/16V)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo (correia + tensores + bomba d\'água), motor interferente. | 40.000 km — Fluido do câmbio Dualogic (versões automatizadas) — não é intercambiável com óleo de câmbio manual comum. | 20.000 km — Verificação do mecanismo da tampa de combustível (alavanca no assoalho). | 20.000 km — Filtro de ar e filtro de cabine. | 20.000 km — Fluido de freio, e evitar lavar disco/roda ainda quente.',
  },
]

// ---------- 2013-2017 (facelift 2012, T-Jet turbo, fim de linha) ----------
const MACETES_G3: TipInput[] = [
  {
    severity: 'OK',
    title: 'T-Jet 1.4 16V turbo (152cv): deixe o motor em marcha lenta antes de desligar após uso intenso',
    body: 'Depois de rodar em alta rotação/velocidade, desligar o motor imediatamente prejudica o turbocompressor (óleo para de circular com a turbina ainda girando quente). Deixe o motor em marcha lenta por 30-60 segundos antes de desligar — hábito simples que evita falha prematura do turbo/intercooler.',
  },
  {
    severity: 'OK',
    title: 'Facelift 2012/2013 (linha "2013") trouxe peça de lataria diferente — confirme o ano antes de comprar',
    body: 'A reestilização de agosto/2012 mudou detalhes de acabamento (brilhante preto, faróis escurecidos, rodas). Ao comprar peça de lataria ou acabamento externo, confirme se sua unidade é anterior ou posterior a essa mudança — peça de uma fase não necessariamente encaixa na outra.',
  },
  {
    severity: 'OK',
    title: 'Herdou os mesmos pontos de atenção da geração 2007-2012 — Dualogic, tampa de combustível, lanterna',
    body: 'A mecânica de base e boa parte dos pontos fracos (câmbio Dualogic com solavanco, mecanismo da tampa de combustível, infiltração na lanterna traseira) continuam os mesmos desta fase final — as dicas de manutenção da geração anterior seguem valendo.',
  },
]

const PROBLEMAS_G3: TipInput[] = [
  {
    severity: 'WARN',
    title: 'RECALL de alternador também se aplica a essa fase — confirme o chassi',
    body: 'O recall de alternador com defeito (risco de desligamento inesperado do motor em movimento) que afetou 13 modelos Fiat cobre também unidades desta fase final do Punto. Confira o chassi em www.fiat.com.br/recall ou pelo 0800 707 1000.',
  },
  {
    severity: 'OK',
    title: 'T-Jet exige atenção redobrada ao óleo — motor turbo não perdoa negligência de troca',
    body: 'O motor 1.4 16V turbo é mais sensível a óleo degradado que os aspirados desta linha, por causa da temperatura mais alta de trabalho do turbo. Não estenda o intervalo de troca de óleo além do recomendado.',
  },
]

const MANUTENCAO_G3: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Punto 2013-2017 (1.4/1.8 aspirado ou T-Jet 1.4 turbo)',
    body: '10.000 km — Troca de óleo do motor + filtro (aspirados); 7.500 km no T-Jet turbo, sintético de qualidade. | 60.000 km/5 anos — Kit de correia dentada completo. | 40.000 km — Fluido do câmbio Dualogic (versões automatizadas). | 20.000 km — Filtro de ar e filtro de cabine (mais crítico no T-Jet por causa do intercooler). | 20.000 km — Fluido de freio.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Punto', yearFrom: 1995, yearTo: 1999, tireSize: '175/65 R14 (referência)', frontPsi: 28, rearPsi: 26, frontPsiLoad: 30, rearPsiLoad: 32, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta ou manual do proprietário.' },
  { modelName: 'Punto', yearFrom: 2007, yearTo: 2012, tireSize: '175/65 R14 ou 195/50 R16 (Sporting)', frontPsi: 30, rearPsi: 28, frontPsiLoad: 32, rearPsiLoad: 32, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — versão Sporting usa aro maior.' },
  { modelName: 'Punto', yearFrom: 2013, yearTo: 2017, tireSize: '175/65 R14, 195/55 R16 ou 205/45 R17 (T-Jet/BlackMotion)', frontPsi: 30, rearPsi: 28, frontPsiLoad: 32, rearPsiLoad: 32, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — T-Jet e BlackMotion usam aro maior que as versões de entrada.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Punto', yearFrom: 1995, yearTo: 1999, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Punto', yearFrom: 1995, yearTo: 1999, component: 'Kit de correia dentada completo', intervalKm: 60000, intervalMonths: 60, notes: 'Motor interferente.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Punto', yearFrom: 1995, yearTo: 1999, component: 'Fluido de freio', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'Punto', yearFrom: 2007, yearTo: 2012, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Válido para 1.4 Fire 8V e 1.8 8V/16V.', priority: 'CRITICAL', order: 3 },
  { modelName: 'Punto', yearFrom: 2007, yearTo: 2012, component: 'Kit de correia dentada completo', intervalKm: 60000, intervalMonths: 60, notes: 'Motor interferente.', priority: 'CRITICAL', order: 4 },
  { modelName: 'Punto', yearFrom: 2007, yearTo: 2012, component: 'Fluido do câmbio Dualogic (versões automatizadas)', intervalKm: 40000, intervalMonths: 24, notes: 'Não intercambiável com óleo de câmbio manual comum.', priority: 'HIGH', order: 5 },
  { modelName: 'Punto', yearFrom: 2007, yearTo: 2012, component: 'Verificação do mecanismo da tampa de combustível', intervalKm: 20000, intervalMonths: null, notes: 'Ponto de falha conhecido (alavanca no assoalho).', priority: 'LOW', order: 6 },
  { modelName: 'Punto', yearFrom: 2007, yearTo: 2012, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 7 },
  { modelName: 'Punto', yearFrom: 2007, yearTo: 2012, component: 'Fluido de freio', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'Punto', yearFrom: 2013, yearTo: 2017, component: 'Óleo do motor + filtro (aspirados)', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 9 },
  { modelName: 'Punto', yearFrom: 2013, yearTo: 2017, component: 'Óleo do motor sintético (T-Jet 1.4 turbo)', intervalKm: 7500, intervalMonths: 12, notes: 'Motor turbo é mais sensível a óleo degradado.', priority: 'CRITICAL', order: 10 },
  { modelName: 'Punto', yearFrom: 2013, yearTo: 2017, component: 'Kit de correia dentada completo', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 11 },
  { modelName: 'Punto', yearFrom: 2013, yearTo: 2017, component: 'Fluido do câmbio Dualogic (versões automatizadas)', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 12 },
  { modelName: 'Punto', yearFrom: 2013, yearTo: 2017, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: 'Mais crítico no T-Jet por causa do intercooler.', priority: 'MEDIUM', order: 13 },
  { modelName: 'Punto', yearFrom: 2013, yearTo: 2017, component: 'Fluido de freio', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 14 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Punto', yearFrom: 1995, yearTo: 1999, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'Punto', yearFrom: 2007, yearTo: 2012, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
  { modelName: 'Punto', yearFrom: 2013, yearTo: 2017, MACETES: MACETES_G3, PROBLEMAS: PROBLEMAS_G3, MANUTENCAO: MANUTENCAO_G3 },
]

async function main() {
  console.log('🚗 Seed Fiat Punto...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Fiat', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Fiat', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Punto', brandId: brand.id } },
    update: {}, create: { name: 'Punto', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Punto' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Punto' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo ?? 'atual'})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Punto' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Fiat Punto concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
