/**
 * Seed VW Santana — macetes, problemas, manutenção e calibragem
 * Sedã "premium" da Volkswagen no Brasil por 22 anos (1984-2006, ~548
 * mil unidades). Três fases: lançamento (1984-1987, trims CS/CG/CD —
 * Comfort Silver/Gold/Diamond, motor AP-1800 a álcool), restyle
 * (1987-1997, trims C/CL/GL/GLS, chegada do AP-2000 em 1988 —
 * considerado por muitos o melhor motor que o Santana já usou) e era
 * de injeção eletrônica (1997-2006, trims CLi/GLi/GLSi/Exclusiv/
 * Executivo/Evidence/Comfortline, motor 1.8/2.0 Mi). Irmão de
 * plataforma da Quantum (já coberta em arquivo próprio). Descontinuado
 * em maio de 2006.
 * Execute: pnpm --filter @motormacete/database db:seed:vw-santana
 *
 * Fontes: autopapo.com.br, canaldapeca.com.br, guiadosautos.com.br,
 *         alvaromatiassa.wordpress.com, carroclub.com.br,
 *         opinautos.com.br, doutorie.com.br, motoragora.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- LANÇAMENTO (1984-1987) — CS/CG/CD, AP-1800 a álcool ----------

const MACETES_LANCAMENTO: TipInput[] = [
  { severity: 'OK', title: 'Trims CS/CG/CD: Comfort Silver, Gold e Diamond — CD era o topo de linha', body: 'Nos primeiros anos, o Santana era vendido em três níveis de acabamento: CS (Comfort Silver), CG (Comfort Gold) e CD (Comfort Diamond, topo de linha). Confirme a versão exata antes de procurar peça de acabamento/interior — muda bastante entre os três níveis.' },
  { severity: 'OK', title: 'Motor AP-1800 a álcool — peça de motor compartilhada com Gol/Voyage/Parati da época', body: 'O AP-1800 dessa fase inicial era movido a álcool (92,4 cv). Por fazer parte da mesma família AP usada em Gol/Voyage/Parati, peça de motor (pistão, biela, junta) costuma ter equivalente nesses modelos irmãos, facilitando a busca no mercado paralelo.' },
  { severity: 'OK', title: 'Irmão de plataforma da Quantum — peça de mecânica/suspensão intercambiável', body: 'O Santana e a Quantum (lançada depois) compartilham boa parte da plataforma, suspensão e mecânica. Se não achar peça catalogada como "Santana", vale procurar também por "Quantum" do mesmo período.' },
]

const PROBLEMAS_LANCAMENTO: TipInput[] = [
  { severity: 'WARN', title: 'Infiltração de água no porta-malas — problema crônico dessa geração de sedãs', body: 'Praticamente todo dono relata infiltração de água no porta-malas nessa fase — problema típico da época, compartilhado com outros sedãs "premium" nacionais do período (Del Rey, Galaxie, Versailles). Vedação de borracha da tampa do porta-malas ressecada é o ponto mais comum a checar primeiro.' },
  { severity: 'WARN', title: 'Trincas no túnel do motor e infiltração no assoalho dianteiro', body: 'É comum encontrar trincas no túnel do motor (região central do assoalho) em unidades dessa idade, além de infiltração que aparece também no assoalho dianteiro, não só no porta-malas. Vale inspecionar embaixo do carro com atenção antes de comprar uma unidade dessa fase.' },
  { severity: 'WARN', title: 'Buchas da suspensão dianteira racham sob o peso do carro', body: 'As buchas da suspensão dianteira original às vezes não comportam bem o peso do veículo ao longo dos anos, resultando em rachaduras no conjunto. Ruído "seco" na dianteira ao passar por buraco é sinal de alerta para inspecionar essas buchas.' },
]

const MANUTENCAO_LANCAMENTO: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Santana lançamento (1984-1987, AP-1800)', body: '7.500-10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo (correia + tensores + bomba d\'água) — motor AP é interferente. | Verificar vedação da tampa do porta-malas e do assoalho dianteiro contra infiltração. | Inspecionar buchas da suspensão dianteira periodicamente (histórico de rachadura sob peso). | 40.000 km — Fluido de freio.' },
]

// ---------- RESTYLE (1987-1997) — C/CL/GL/GLS, chegada do AP-2000 em 1988 ----------

const MACETES_RESTYLE: TipInput[] = [
  { severity: 'OK', title: 'Restyle de 1987: novos para-choques, faróis e grade, trims renomeados', body: 'A partir de 1987 o Santana recebeu novos para-choques envolventes, faróis e grade, junto com mudanças pontuais na traseira e no interior. As versões passaram a se chamar C (Comfort), CL (Comfort Luxe), GL (Grand Luxe) e GLS (Grand Luxe Special) — confirme o ano exato antes de procurar peça visual, já que muda bastante em relação à fase de lançamento.' },
  { severity: 'OK', title: 'AP-2000 (a partir de 1988): considerado por muitos o melhor motor do Santana', body: 'O motor AP-2000, apresentado em 1988, é frequentemente citado por mecânicos e entusiastas como o melhor motor que o Santana já usou — mais robusto e com boa reputação de durabilidade quando bem cuidado. Se está escolhendo entre um Santana 1.8 ou 2.0 dessa fase, o 2.0 tende a ter reputação mecânica ligeiramente melhor.' },
]

const PROBLEMAS_RESTYLE: TipInput[] = [
  { severity: 'WARN', title: 'Mesmos pontos crônicos herdados: infiltração, trincas, buchas de suspensão', body: 'A geração restyle carrega os mesmos problemas documentados na fase de lançamento — infiltração no porta-malas/assoalho, trincas no túnel do motor e buchas de suspensão dianteira sob esforço. Não foram resolvidos com o redesenho, apenas herdados junto com a plataforma.' },
  { severity: 'WARN', title: 'Ar-condicionado: pequenos vazamentos nas conexões das válvulas de serviço', body: 'É comum encontrar vazamento lento de gás refrigerante justamente nas conexões das válvulas de serviço do sistema de ar-condicionado. Antes de trocar compressor ou componente maior, peça para o mecânico testar a estanqueidade dessas conexões — muitas vezes é reparo simples e barato.' },
]

const MANUTENCAO_RESTYLE: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Santana restyle (1987-1997, AP-1800/AP-2000)', body: '7.500-10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo. | Verificar vedação da tampa do porta-malas contra infiltração. | Testar estanqueidade das conexões do ar-condicionado antes de assumir troca de compressor. | Inspecionar buchas da suspensão dianteira periodicamente. | 40.000 km — Fluido de freio.' },
]

// ---------- ERA DE INJEÇÃO ELETRÔNICA (1997-2006) — Mi, Exclusiv/Executivo/Evidence/Comfortline ----------

const MACETES_INJECAO: TipInput[] = [
  { severity: 'OK', title: 'A partir de 1997 a injeção eletrônica passa a ser MI de 4 bicos', body: 'Nessa fase final o sistema de injeção eletrônica evolui para MI com 4 injetores (um por cilindro), substituindo sistemas anteriores mais simples. Trims dessa era incluem CLi/GLi/GLSi (o "i" indica injeção), além das versões de topo Exclusiv/Executivo e, nos últimos anos, Evidence e Comfortline.' },
  { severity: 'OK', title: 'Últimos anos de produção (Comfortline, até 2006) — motor AP 1.8 8V final', body: 'A versão Comfortline, com motor AP 1.8 8V, representa a fase final de produção do Santana no Brasil, encerrada em maio de 2006 após 22 anos e cerca de 548 mil unidades vendidas.' },
]

const PROBLEMAS_INJECAO: TipInput[] = [
  { severity: 'WARN', title: 'Motor "apagando" de forma intermitente — investigue a central de injeção (ECU)', body: 'Caso documentado e relatado por diversos donos: o motor apaga de forma intermitente e às vezes não volta a pegar. Em unidades com o sistema de injeção IAW 1AVB (onde o controle da bobina de ignição é feito diretamente pela central), a falha típica é a ECU parar de enviar pulso de controle para o primário da bobina de ignição — enquanto todas as outras rotinas (bico injetor, relé da bomba de combustível) continuam funcionando normalmente. Se o carro apaga e não liga de forma intermitente mas outras funções elétricas seguem normais, suspeite da central de injeção antes de trocar peça por peça.' },
  { severity: 'WARN', title: 'Mesmos pontos crônicos herdados: infiltração, trincas, buchas de suspensão, AC', body: 'A fase final do Santana segue com os mesmos pontos de atenção documentados nas gerações anteriores — infiltração de água, trincas no túnel do motor, buchas de suspensão dianteira e pequenos vazamentos no ar-condicionado.' },
]

const MANUTENCAO_INJECAO: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Santana era de injeção (1997-2006, 1.8/2.0 Mi)', body: '7.500-10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo. | Se o motor apagar de forma intermitente com outras funções elétricas normais, investigar a central de injeção (ECU) antes de trocar peça isolada. | Verificar vedação da tampa do porta-malas contra infiltração. | Testar estanqueidade do ar-condicionado antes de trocar compressor. | 40.000 km — Fluido de freio.' },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Santana', yearFrom: 1984, yearTo: 1987, tireSize: '175/70 R14 (referência)', frontPsi: 26, rearPsi: 26, frontPsiLoad: 28, rearPsiLoad: 30, sparePsi: 60, notes: 'Carro de época — confirme o valor original na etiqueta da coluna da porta ou manual, se disponível.' },
  { modelName: 'Santana', yearFrom: 1987, yearTo: 1997, tireSize: '175/70 R14 (referência)', frontPsi: 28, rearPsi: 28, frontPsiLoad: 30, rearPsiLoad: 32, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — pode variar entre 1.8 e 2.0.' },
  { modelName: 'Santana', yearFrom: 1997, yearTo: 2006, tireSize: '185/65 R14 (referência)', frontPsi: 28, rearPsi: 28, frontPsiLoad: 30, rearPsiLoad: 32, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Santana', yearFrom: 1984, yearTo: 1987, component: 'Óleo do motor + filtro', intervalKm: 7500, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Santana', yearFrom: 1984, yearTo: 1987, component: 'Kit de correia dentada completo (correia + tensores + bomba d\'água)', intervalKm: 60000, intervalMonths: 60, notes: 'Motor interferente — não postergar.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Santana', yearFrom: 1984, yearTo: 1987, component: 'Vedação da tampa do porta-malas e assoalho dianteiro', intervalKm: null, intervalMonths: 12, notes: 'Infiltração é problema crônico dessa geração de sedãs.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Santana', yearFrom: 1984, yearTo: 1987, component: 'Inspeção das buchas da suspensão dianteira', intervalKm: 20000, intervalMonths: null, notes: 'Histórico de rachadura sob o peso do veículo.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Santana', yearFrom: 1984, yearTo: 1987, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 4 },

  { modelName: 'Santana', yearFrom: 1987, yearTo: 1997, component: 'Óleo do motor + filtro', intervalKm: 7500, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 5 },
  { modelName: 'Santana', yearFrom: 1987, yearTo: 1997, component: 'Kit de correia dentada completo', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 6 },
  { modelName: 'Santana', yearFrom: 1987, yearTo: 1997, component: 'Teste de estanqueidade do ar-condicionado (conexões das válvulas de serviço)', intervalKm: null, intervalMonths: 12, notes: null, priority: 'LOW', order: 7 },
  { modelName: 'Santana', yearFrom: 1987, yearTo: 1997, component: 'Vedação da tampa do porta-malas', intervalKm: null, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 8 },
  { modelName: 'Santana', yearFrom: 1987, yearTo: 1997, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 9 },

  { modelName: 'Santana', yearFrom: 1997, yearTo: 2006, component: 'Óleo do motor + filtro', intervalKm: 7500, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 10 },
  { modelName: 'Santana', yearFrom: 1997, yearTo: 2006, component: 'Kit de correia dentada completo', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 11 },
  { modelName: 'Santana', yearFrom: 1997, yearTo: 2006, component: 'Investigação da central de injeção (ECU) em caso de motor apagando intermitente', intervalKm: null, intervalMonths: null, notes: 'Falha documentada: ECU para de controlar a bobina de ignição enquanto outras funções seguem normais.', priority: 'HIGH', order: 12 },
  { modelName: 'Santana', yearFrom: 1997, yearTo: 2006, component: 'Vedação da tampa do porta-malas', intervalKm: null, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 13 },
  { modelName: 'Santana', yearFrom: 1997, yearTo: 2006, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 14 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Santana', yearFrom: 1984, yearTo: 1987, MACETES: MACETES_LANCAMENTO, PROBLEMAS: PROBLEMAS_LANCAMENTO, MANUTENCAO: MANUTENCAO_LANCAMENTO },
  { modelName: 'Santana', yearFrom: 1987, yearTo: 1997, MACETES: MACETES_RESTYLE, PROBLEMAS: PROBLEMAS_RESTYLE, MANUTENCAO: MANUTENCAO_RESTYLE },
  { modelName: 'Santana', yearFrom: 1997, yearTo: 2006, MACETES: MACETES_INJECAO, PROBLEMAS: PROBLEMAS_INJECAO, MANUTENCAO: MANUTENCAO_INJECAO },
]

async function main() {
  console.log('🚗 Seed VW Santana...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volkswagen', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volkswagen', vehicleTypeId: carroType.id },
  })

  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Santana', brandId: brand.id } },
    update: {},
    create: { name: 'Santana', brandId: brand.id },
  })

  // Delete once (não por bloco) — múltiplos blocos usam o mesmo modelName 'Santana'
  await prisma.tip.deleteMany({ where: { modelName: 'Santana' } })

  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({
        modelName: block.modelName,
        category: cat,
        severity: tip.severity,
        title: tip.title,
        body: tip.body,
        yearFrom: block.yearFrom,
        yearTo: block.yearTo,
        order: order++,
      })),
    })
    console.log(`  ✅ Santana (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }

  await prisma.tirePressure.deleteMany({ where: { modelName: 'Santana' } })
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: Santana (${tp.yearFrom}-${tp.yearTo ?? '...'})`)
  }

  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Santana' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ VW Santana concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
