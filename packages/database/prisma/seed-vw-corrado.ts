/**
 * Seed Volkswagen Corrado — macetes, problemas, manutenção e calibragem
 * Cupê esportivo produzido pela VW de 1988 a 1995 (~97.521 unidades no mundo,
 * plataforma derivada do Golf II). Nunca foi vendido oficialmente pela VW do
 * Brasil — chegou ao país por importação independente/paralela, com a
 * concessionária Dacon S.A. (São Paulo) como principal responsável. Não há
 * número oficial de unidades no país: estimativas de entusiastas variam de
 * ~30-40 a uma "lenda" de 100 exemplares — carro raríssimo hoje. Duas
 * versões chegaram ao Brasil: G60 (1.8 4 cilindros com compressor mecânico
 * G-Lader, 160cv) e VR6 (2.9 V6 estreito, 190cv, até 235km/h). A tabela FIPE
 * cataloga o Corrado sob nomenclatura pouco usual ("2.0 Turbo" e "G-60 2.8")
 * e só disponibiliza anos-modelo 1991 e 1992 — provável limitação de
 * cadastro para um carro tão raro, não uma especificação oficial precisa.
 * Execute: pnpm --filter @motormacete/database db:seed:vw-corrado
 *
 * Fontes: en.wikipedia.org/wiki/Volkswagen_Corrado, parallelum.com.br/fipe
 *         (API FIPE, marca 59, modelos 2366/2367), falandodevag.blogspot.com,
 *         portalfrotista.com.br, car.blog.br, the-corrado.net, vwvortex.com,
 *         wheel-size.com, vw.com.br/recall (checado, sem campanha para o
 *         Corrado no Brasil)
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput {
  severity: Sev
  title: string
  body: string
}

interface ModelBlock {
  modelName: string
  yearFrom: number | null
  yearTo: number | null
  MACETES: TipInput[]
  PROBLEMAS: TipInput[]
  MANUTENCAO: TipInput[]
}

interface TirePressureInput {
  modelName: string
  yearFrom: number | null
  yearTo: number | null
  tireSize: string
  frontPsi: number
  rearPsi: number
  frontPsiLoad: number | null
  rearPsiLoad: number | null
  sparePsi: number | null
  notes: string | null
}

interface MaintenanceItemInput {
  modelName: string
  yearFrom: number | null
  yearTo: number | null
  component: string
  intervalKm: number | null
  intervalMonths: number | null
  notes: string | null
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  order: number
}

const MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Carro nunca foi vendido oficialmente pela VW do Brasil',
    body: 'O Corrado nunca teve venda oficial da Volkswagen do Brasil — todas as unidades no país chegaram por importação independente/paralela, principalmente via concessionária Dacon S.A. em São Paulo, no início dos anos 1990. Isso significa que não existe rede de concessionária com peças e histórico de manutenção padronizado: cada carro tem uma "biografia" própria e vale confirmar a procedência e a documentação de importação antes de comprar.',
  },
  {
    severity: 'OK',
    title: 'Duas motorizações chegaram ao Brasil: G60 e VR6',
    body: 'As versões que chegaram ao país foram o G60 (motor 1.8 quatro cilindros com compressor mecânico tipo G-Lader, 160cv) e o VR6 (motor 2.9 V6 estreito "VR6", 190cv, até 235km/h). São mecânicas bem diferentes entre si — peças de motor, câmbio e compressor não são intercambiáveis entre as duas versões. Confirme sempre qual motorização é a do seu carro antes de comprar peças ou buscar informação técnica.',
  },
  {
    severity: 'OK',
    title: 'Cadastro na tabela FIPE não usa a nomenclatura internacional padrão',
    body: 'A tabela FIPE cataloga o Corrado como "Corrado 2.0 Turbo" e "Corrado G-60 2.8", nomes que não correspondem exatamente à nomenclatura oficial internacional (o G60 nunca foi 2.8, e não há registro de uma versão "2.0 Turbo" de fábrica). É provável limitação de cadastro dado o baixíssimo volume desse carro no Brasil. Ao consultar preço FIPE, use o código mais próximo da sua motorização real (G60 ou VR6) e não se guie pela nomenclatura ao pé da letra.',
  },
  {
    severity: 'OK',
    title: 'Aerofólio traseiro retrátil automático: como funciona',
    body: 'O Corrado tem um aerofólio traseiro que sobe automaticamente em alta velocidade (referências internacionais citam faixas entre 100-120km/h dependendo do mercado) e desce quando o carro reduz a velocidade. Também pode ser acionado manualmente por um botão no painel, independente da velocidade — útil para testar o funcionamento sem precisar rodar em alta velocidade.',
  },
  {
    severity: 'WARN',
    title: 'Carro raro exige especialista em VW antigos/importados',
    body: 'Pela raridade extrema do Corrado no Brasil, a maioria das oficinas — inclusive concessionárias VW atuais — não tem experiência nem histórico com o modelo. Procure mecânicos especializados em VW antigos/clássicos ou importados, e clubes/fóruns internacionais de Corrado (ex.: The Corrado Forum, VWVortex) para diagnóstico e referência técnica, especialmente para o compressor G60 e o sistema do aerofólio.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Motor do aerofólio pode queimar e afetar o fusível do painel',
    body: 'O motor elétrico que aciona o aerofólio retrátil compartilha circuito de fusível com o painel de instrumentos em parte da produção do Corrado. Se o aerofólio parar de funcionar ao mesmo tempo em que o painel apresentar comportamento estranho (apagando ou piscando), o fusível compartilhado é um dos primeiros pontos a checar antes de suspeitar de um problema elétrico maior.',
  },
  {
    severity: 'WARN',
    title: 'Mecanismo do aerofólio pode travar/engripar por falta de uso e sujeira',
    body: 'Mesmo sem o motor queimado, o mecanismo de cabos do aerofólio pode engripar com o acúmulo de sujeira e falta de lubrificação ao longo dos anos — comum em carros que passam longos períodos parados, como costuma ser o caso do Corrado hoje no Brasil. Lubrificação periódica do mecanismo (graxa branca/PTFE) e o acionamento manual regular ajudam a evitar o travamento.',
  },
  {
    severity: 'WARN',
    title: 'Falha no sensor/modulador de velocidade desativa o acionamento automático',
    body: 'Se o aerofólio só sobe quando acionado manualmente pelo botão do painel, e nunca automaticamente em alta velocidade, o problema costuma estar no módulo/sensor que informa a velocidade ao sistema do aerofólio, não no motor ou no mecanismo mecânico em si. É uma falha documentada em fóruns internacionais do modelo.',
  },
  {
    severity: 'WARN',
    title: 'Peças originais são difíceis e caras de encontrar no Brasil',
    body: 'Por ser um carro raríssimo e nunca vendido oficialmente aqui, peças originais — principalmente do compressor mecânico do G60 e itens de acabamento/lataria — são difíceis de achar no mercado nacional e costumam exigir importação ou contato com clubes internacionais do modelo. Planeje prazo e custo maiores do que o normal para qualquer reparo que exija peça original.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Corrado (referência — carro de época, priorize revisão por especialista)',
    body: 'Por ser um carro com décadas de fabricação, praticamente toda a manutenção deve ser guiada por tempo, não apenas por quilometragem — mesmo unidades com baixa km acumulada precisam de itens de borracha, correias e fluidos revisados ou trocados preventivamente. 10.000 km/12 meses — óleo do motor e filtro (fique atento à especificação correta para o compressor no G60). A cada 5 anos (independente da km) — correia dentada completa (correia + tensores + bomba d\'água) em motores com correia; motor interferente, não postergar. 24 meses — fluido de freio DOT 4. A cada revisão — testar o aerofólio nos modos automático e manual, e lubrificar o mecanismo se notar lentidão. Antes de qualquer uso contínuo em um exemplar que ficou parado, faça uma revisão geral completa com um especialista em VW antigos/importados.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Corrado',
    yearFrom: 1989,
    yearTo: 1995,
    tireSize: '195/50 R15 (G60)',
    frontPsi: 30,
    rearPsi: 28,
    frontPsiLoad: null,
    rearPsiLoad: null,
    sparePsi: null,
    notes: 'Estimativa baseada em referências internacionais do Corrado — não há confirmação de tabela oficial brasileira, já que o carro nunca foi vendido pela VW do Brasil. Confirme na etiqueta da coluna da porta do motorista (se ainda legível) ou com um especialista no modelo antes de calibrar.',
  },
  {
    modelName: 'Corrado',
    yearFrom: 1989,
    yearTo: 1995,
    tireSize: '205/50 R15 (VR6)',
    frontPsi: 33,
    rearPsi: 30,
    frontPsiLoad: null,
    rearPsiLoad: null,
    sparePsi: null,
    notes: 'Estimativa baseada em referências internacionais do Corrado VR6 — não há confirmação de tabela oficial brasileira. Confirme na etiqueta da coluna da porta do motorista (se ainda legível) ou com um especialista no modelo antes de calibrar.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Corrado', yearFrom: 1989, yearTo: 1995, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'No G60, confirme a especificação de óleo compatível com o compressor mecânico G-Lader.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Corrado', yearFrom: 1989, yearTo: 1995, component: 'Kit de correia dentada completo (correia + tensores + bomba d\'água)', intervalKm: 60000, intervalMonths: 60, notes: 'Motor interferente — troque por tempo mesmo com baixa quilometragem acumulada.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Corrado', yearFrom: 1989, yearTo: 1995, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km — comum em carros parados por longos períodos.', priority: 'HIGH', order: 2 },
  { modelName: 'Corrado', yearFrom: 1989, yearTo: 1995, component: 'Teste e lubrificação do mecanismo do aerofólio retrátil', intervalKm: null, intervalMonths: 12, notes: 'Verifique acionamento automático e manual; lubrifique cabos com graxa branca/PTFE se notar lentidão.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Corrado', yearFrom: 1989, yearTo: 1995, component: 'Revisão geral por especialista em VW antigos/importados', intervalKm: null, intervalMonths: 12, notes: 'Recomendado dado o baixo número de oficinas com experiência no modelo no Brasil.', priority: 'MEDIUM', order: 4 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Corrado',
    yearFrom: 1989,
    yearTo: 1995,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Volkswagen Corrado...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volkswagen', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volkswagen', vehicleTypeId: carroType.id },
  })

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {},
      create: { name: block.modelName, brandId: brand.id },
    })

    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))

    await prisma.tip.deleteMany({ where: { modelName: block.modelName } })
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }, idx) => ({
        modelName: block.modelName,
        category: cat,
        severity: tip.severity,
        title: tip.title,
        body: tip.body,
        yearFrom: null,
        yearTo: null,
        order: idx,
      })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }

  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName, tireSize: tp.tireSize } })
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.tireSize})`)
  }

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: BLOCKS.map((b) => b.modelName) } },
  })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Volkswagen Corrado concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
