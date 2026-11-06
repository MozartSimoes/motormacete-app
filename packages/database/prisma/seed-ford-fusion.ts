/**
 * Seed Ford Fusion — macetes, problemas, manutenção e calibragem
 * 1ª geração (2006-2009, plataforma CD3 compartilhada com Mazda6):
 * importado, motor Duratec 2.3 16V e câmbio automático de 6 marchas.
 * Facelift da 1ª geração (2010-2012): motor 2.5 Duratec, 3.0 V6 (FWD/AWD)
 * e versão híbrida 2.5 (1º Fusion Hybrid vendido no Brasil). 2ª geração
 * (2013-2019, plataforma CD4 compartilhada com o Mondeo europeu):
 * o Fusion 2.5 Flex foi o primeiro Fusion flex-fuel do mundo,
 * desenvolvido especificamente para o Brasil; também trouxe o 2.0 GTDI
 * EcoBoost (Titanium, FWD/AWD) e a versão híbrida Titanium 2.0.
 * Recalls reais localizados: airbag Takata (2006-2012), direção elétrica
 * EPAS (2011-2012, chassis com faixas documentadas), bucha do cabo
 * seletor de câmbio automático (2013/2014/2016, risco de o carro se
 * mover sozinho fora da posição "P") e mangueira de freio dianteira
 * (2013-2015, chassis documentados por ano-modelo).
 * Execute: pnpm --filter @motormacete/database db:seed:ford-fusion
 *
 * Fontes: icarros.com.br, motorshow.com.br, autossegredos.com.br,
 *         ford.com.br/servico-ao-cliente/recall, mecanicaonline.com.br,
 *         autopapo.com.br, garagem360.com.br, estradas.com.br,
 *         seucarrousado.com.br, opinautos.com.br, calibrapneu.com.br,
 *         autopecashorizonte.com.br, en.wikipedia.org (Ford Fusion Americas)
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- 2006-2009 (1ª geração, plataforma CD3 — Duratec 2.3 16V, câmbio automático 6 marchas) ----------
const MACETES_G1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Fusion 2006-2009 divide plataforma (CD3) e vários componentes com o Mazda6 da mesma época',
    body: 'Essa primeira geração do Fusion foi desenvolvida sobre a plataforma CD3, compartilhada com o Mazda6. Peças de suspensão, freio e alguns sensores podem ter equivalência entre os dois modelos — vale pesquisar essa referência cruzada ao orçar peça, já que o Fusion era 100% importado nessa fase e peça genuína Ford tende a ser mais cara e demorada.',
  },
  {
    severity: 'OK',
    title: 'Câmbio automático de 6 marchas: troca de fluido antecipada evita trancos em alta quilometragem',
    body: 'Muita gente acredita que o câmbio automático é "vitalício" e nunca troca o fluido. Na prática, trocar o fluido (e o filtro, quando acessível) a cada 60.000 km ajuda a evitar trancos e atraso de engate que aparecem depois dos 100.000-120.000 km sem manutenção.',
  },
]

const PROBLEMAS_G1: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'RECALL: airbag Takata (modelos 2006 a 2012) — verifique o chassi antes de rodar',
    body: 'O Fusion está entre os modelos convocados pela Ford no recall global do fornecedor Takata, cobrindo anos-modelo de 2006 a 2012. A campanha consiste na inspeção e troca do inflador (ou do módulo completo) do airbag do motorista, que em casos raros pode se romper de forma violenta na hora do acionamento. A Ford recomenda não rodar com o carro até o reparo ser feito, caso o chassi esteja na lista. Confirme a situação do seu chassi pelo 0800 703 3673 ou em uma concessionária Ford.',
  },
]

const MANUTENCAO_G1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Cronograma Fusion 2006-2009 (Duratec 2.3 16V, câmbio automático 6 marchas)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 60.000 km — Fluido (e filtro, quando acessível) do câmbio automático — não é vitalício. | 40.000 km — Fluido de freio, filtro de ar e de cabine. | Verifique o chassi no recall de airbag Takata (2006-2012) antes de rodar sem confirmar.',
  },
]

// ---------- 2010-2012 (facelift 1ª geração — Duratec 2.5, 3.0 V6 FWD/AWD, Hybrid 2.5) ----------
const MACETES_G2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Bobina de ignição falhando: se uma pifou, considere trocar o jogo completo',
    body: 'É comum, no motor 2.5 Duratec dessa geração, uma bobina de ignição falhar (derretendo internamente em casos mais graves) e pouco tempo depois outra(s) apresentarem o mesmo problema, causando falha de partida, perda de potência e luz de injeção acesa. Ao trocar uma bobina com defeito confirmado, avalie o custo-benefício de trocar o jogo completo de uma vez, evitando um novo problema recorrente semanas depois.',
  },
  {
    severity: 'OK',
    title: 'Versão Hybrid 2.5 (2010-2012): primeiro Fusion híbrido vendido no Brasil — mantenha a ventilação da bateria HV limpa',
    body: 'A versão Hybrid usa o sistema híbrido de 1ª geração da Ford (parecido com o do Escape Hybrid), com boa reputação de durabilidade quando bem cuidado. As grades de ventilação da bateria de alta voltagem (geralmente atrás do banco traseiro) precisam ficar livres de poeira e objetos — ventilação obstruída acelera o desgaste da bateria por superaquecimento.',
  },
]

const PROBLEMAS_G2: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Corpo de borboleta com defeito pode fechar sozinho e cortar potência durante uma ultrapassagem',
    body: 'Vários donos de Fusion 2010-2012 relatam um defeito no corpo de borboleta eletrônico que fecha inesperadamente e interrompe a entrada de ar, cortando a potência do motor — o carro volta ao normal ao desligar e ligar novamente, mas o problema tende a piorar com o tempo. Como pode acontecer em qualquer momento, inclusive durante uma ultrapassagem, não normalize esse sintoma: leve para diagnóstico assim que notar qualquer perda de potência súbita e momentânea.',
  },
  {
    severity: 'DANGER',
    title: 'RECALL: direção elétrica (EPAS) — modelos 2011 e 2012, fabricados entre set/2010 e fev/2012',
    body: 'A Ford convocou 14.730 unidades do Fusion por uma falha na caixa de direção elétrica que pode causar interrupção momentânea da conexão elétrica, resultando em perda da assistência de direção durante o movimento (o carro entra em modo de direção manual, com alerta sonoro e mensagem no painel). Chassis afetados: ano-modelo 2011 entre BR129990 e BR332286; ano-modelo 2012 entre CR100012 e CR313284. O reparo é uma atualização de software (~15 min) ou, se necessário, troca da caixa de direção elétrica (~3h). Confirme pelo 0800 703 3673.',
  },
  {
    severity: 'DANGER',
    title: 'RECALL: airbag Takata (modelos 2006 a 2012) — também cobre esta faixa de anos',
    body: 'Assim como a geração anterior, os Fusion 2010-2012 também estão na lista de convocação do recall global de airbag Takata. Confirme a situação do chassi pelo 0800 703 3673 antes de rodar sem essa verificação.',
  },
]

const MANUTENCAO_G2: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Cronograma Fusion 2010-2012 (2.5 Duratec, 3.0 V6 FWD/AWD ou Hybrid 2.5)',
    body: '10.000 km — Troca de óleo do motor + filtro (verifique também o estado das bobinas de ignição no motor 2.5). | 60.000 km — Fluido do câmbio automático. | Sempre — atenção a qualquer corte momentâneo de potência (corpo de borboleta) e a perda de assistência de direção (recall EPAS 2011/2012). | Versões Hybrid — mantenha limpa a ventilação da bateria de alta voltagem. | Verifique o chassi nos recalls de airbag Takata e direção elétrica.',
  },
]

// ---------- 2013-2019 (2ª geração, plataforma CD4 — Fusion Flex 2.5, 2.0 GTDI EcoBoost, Hybrid 2.0) ----------
const MACETES_G3: TipInput[] = [
  {
    severity: 'OK',
    title: 'Fusion 2.5 Flex foi o primeiro Fusion flex-fuel do mundo, desenvolvido para o Brasil',
    body: 'A partir de 2013, o Fusion passou a ser produzido/adaptado para etanol — foi o primeiro Fusion flex-fuel do mundo, com o motor 2.5 I-VCT recalibrado especificamente para o combustível brasileiro. Isso significa que peças de injeção e algumas calibrações de ECU dessa versão são exclusivas do mercado brasileiro, sem equivalência direta com o Fusion americano/europeu do mesmo período — não troque peça de injeção por uma importada "genérica" sem confirmar a compatibilidade com a versão flex.',
  },
  {
    severity: 'OK',
    title: 'Motor 2.0 GTDI EcoBoost (Titanium): não é o mesmo motor do recall de incêndio do 1.6 EcoBoost americano',
    body: 'Houve um recall internacional famoso para o motor 1.6 EcoBoost (2013-2014) por risco de rachadura no cabeçote e incêndio por baixo nível de líquido de arrefecimento — mas esse motor nunca foi vendido no Fusion brasileiro. Aqui o Fusion usou apenas o 2.5 Flex (aspirado) e o 2.0 GTDI EcoBoost turbo, que a própria Ford confirma não estarem incluídos nesse recall específico. Ainda assim, mantenha o nível de arrefecimento sempre em dia no 2.0 GTDI — é um motor turbo que trabalha sob temperatura mais alta e não tolera bem rodar com o sistema de arrefecimento deficiente.',
  },
  {
    severity: 'OK',
    title: 'Versão Hybrid Titanium 2.0: sistema já maduro da Ford, mas exige atenção à bateria de 12V auxiliar',
    body: 'A versão Hybrid dessa geração usa um sistema já mais maduro que o da geração anterior. Um ponto de atenção comum em híbridos Ford dessa família é a bateria auxiliar de 12V (que alimenta os módulos eletrônicos "sempre ligados") descarregar e causar problemas de partida do sistema híbrido — se o carro "não liga" mas o painel acende normalmente, teste essa bateria de 12V antes de suspeitar da bateria de alta voltagem, que é bem mais cara.',
  },
]

const PROBLEMAS_G3: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'RECALL: bucha do cabo seletor de câmbio — Fusion 2013, 2014 e 2016 (2.5, automático) — risco do carro se mover sozinho',
    body: 'A bucha do cabo seletor da transmissão automática pode se deteriorar e impedir que o cabo mova a caixa para a posição correta. Se o motorista colocar a alavanca em "P" e sair do carro sem puxar o freio de mão, o veículo pode não ficar de fato travado e se mover sozinho, sem alerta sonoro ou no painel. O reparo é gratuito (troca da bucha + capa de proteção, ~40 min). Pelo risco, sempre acione o freio de mão ao estacionar, mesmo com a alavanca em "P", enquanto não confirmar o reparo pelo 0800 703 3673.',
  },
  {
    severity: 'DANGER',
    title: 'RECALL: mangueira de freio dianteira — Fusion 2013, 2014 e 2015, chassis documentados por ano',
    body: 'O movimento da suspensão e da direção pode desgastar as mangueiras de freio dianteiras ao longo do tempo, com possibilidade de vazamento de fluido — o painel acende o aviso de nível de fluido e a frenagem fica com curso mais longo. Chassis afetados: ano-modelo 2013 entre DR100258 e DR373074; ano-modelo 2014 entre ER116002 e ER395524; ano-modelo 2015 entre FR100025 e FR308091. O reparo (troca das mangueiras) é gratuito — confirme pelo 0800 703 3673 se o seu chassi está na faixa.',
  },
]

const MANUTENCAO_G3: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Cronograma Fusion 2013-2019 (2.5 Flex I-VCT, 2.0 GTDI EcoBoost Titanium ou Hybrid Titanium 2.0)',
    body: '10.000 km — Troca de óleo do motor + filtro (sintético de qualidade obrigatório no 2.0 GTDI turbo). | 60.000 km — Fluido do câmbio automático. | Sempre — nível do líquido de arrefecimento em dia no 2.0 GTDI. | Freio de mão sempre ao estacionar, até confirmar o recall da bucha do cabo seletor (2013/2014/2016). | Verifique o chassi no recall da mangueira de freio dianteira (2013-2015). | Versões Hybrid — teste a bateria auxiliar de 12V antes de suspeitar da bateria de alta voltagem em caso de falha de partida.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Fusion', yearFrom: 2006, yearTo: 2009, tireSize: '225/50 R17', frontPsi: 30, rearPsi: 32, frontPsiLoad: 32, rearPsiLoad: 32, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta do motorista ou no manual.' },
  { modelName: 'Fusion', yearFrom: 2010, yearTo: 2012, tireSize: '225/50 R17 (2.5/Hybrid) ou 235/45 R18 (3.0 V6/AWD)', frontPsi: 32, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 35, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — versões 3.0 V6 AWD usam aro maior e pressão diferente.' },
  { modelName: 'Fusion', yearFrom: 2013, yearTo: 2019, tireSize: '225/50 R17 (Flex/SE) ou 225/40 R18 (Titanium)', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 36, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — versão Titanium com rodas maiores pode ter pressão diferenciada.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Fusion', yearFrom: 2006, yearTo: 2009, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Duratec 2.3 16V.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Fusion', yearFrom: 2006, yearTo: 2009, component: 'Fluido do câmbio automático de 6 marchas', intervalKm: 60000, intervalMonths: 48, notes: 'Não é vitalício.', priority: 'HIGH', order: 1 },
  { modelName: 'Fusion', yearFrom: 2006, yearTo: 2009, component: 'Fluido de freio, filtro de ar e de cabine', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'Fusion', yearFrom: 2010, yearTo: 2012, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: '2.5 Duratec, 3.0 V6 ou Hybrid 2.5 — verifique bobinas de ignição no 2.5.', priority: 'CRITICAL', order: 3 },
  { modelName: 'Fusion', yearFrom: 2010, yearTo: 2012, component: 'Fluido do câmbio automático', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'Fusion', yearFrom: 2010, yearTo: 2012, component: 'Ventilação da bateria de alta voltagem (Hybrid)', intervalKm: null, intervalMonths: 12, notes: 'Mantenha livre de poeira e objetos.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Fusion', yearFrom: 2013, yearTo: 2019, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: '2.5 Flex I-VCT, 2.0 GTDI EcoBoost ou Hybrid 2.0 — sintético no turbo.', priority: 'CRITICAL', order: 6 },
  { modelName: 'Fusion', yearFrom: 2013, yearTo: 2019, component: 'Fluido do câmbio automático', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'Fusion', yearFrom: 2013, yearTo: 2019, component: 'Nível do líquido de arrefecimento (2.0 GTDI)', intervalKm: null, intervalMonths: 6, notes: 'Motor turbo — não tolera bem arrefecimento deficiente.', priority: 'HIGH', order: 8 },
  { modelName: 'Fusion', yearFrom: 2013, yearTo: 2019, component: 'Bateria auxiliar 12V (Hybrid)', intervalKm: null, intervalMonths: 24, notes: 'Teste antes de suspeitar da bateria de alta voltagem em falha de partida.', priority: 'MEDIUM', order: 9 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Fusion', yearFrom: 2006, yearTo: 2009, MACETES: MACETES_G1, PROBLEMAS: PROBLEMAS_G1, MANUTENCAO: MANUTENCAO_G1 },
  { modelName: 'Fusion', yearFrom: 2010, yearTo: 2012, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
  { modelName: 'Fusion', yearFrom: 2013, yearTo: 2019, MACETES: MACETES_G3, PROBLEMAS: PROBLEMAS_G3, MANUTENCAO: MANUTENCAO_G3 },
]

async function main() {
  console.log('🚗 Seed Ford Fusion...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Ford', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Ford', vehicleTypeId: carroType.id },
  })
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Fusion', brandId: brand.id } },
    update: {}, create: { name: 'Fusion', brandId: brand.id },
  })
  await prisma.tip.deleteMany({ where: { modelName: 'Fusion' } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: 'Fusion' } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo ?? 'atual'})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Fusion' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Ford Fusion concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
