/**
 * Seed VW Parati — macetes, problemas, manutenção e calibragem
 * Quatro gerações no Brasil (1982-2013, parte do "Projeto BX" junto
 * com Gol/Voyage/Saveiro): "Quadrada" (1982-1996, motor AP 1.6/1.8,
 * edição especial Surf 1995), "Cara Nova"/G2 (1996-1999, restyle igual
 * ao Gol G2, GTi 2000 16V a partir de 1997, versão 4 portas a partir
 * de 1998), G3 (1999-2005, restyle igual ao Gol G3, trim de topo Track
 * & Field a partir de 2003) e G4 (2005-2013, AP sendo gradualmente
 * descontinuado, Total Flex introduzido, motor 1.0 16V Turbo EA111 nas
 * versões Crossover/Titan/Evidence/Utility). Descontinuada em 2013,
 * substituída pela SpaceFox/Fox.
 * Execute: pnpm --filter @motormacete/database db:seed:vw-parati
 *
 * Fontes: pt.wikipedia.org (Volkswagen Parati), fcarros.com.br,
 *         carro.blog.br, oficinabrasil.com.br, autopapo.com.br,
 *         motoragora.com.br, encontracarros.com.br,
 *         sindicatodaindustria.com.br, dicasmecanicas.com
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- "QUADRADA" (1982-1996) — motor AP 1.6/1.8 ----------

const MACETES_QUADRADA: TipInput[] = [
  { severity: 'OK', title: 'Motor AP (família Audi EA827) — peça abundante no mercado paralelo até hoje', body: 'O motor AP (Audi/Alta Performance), descendente direto da família Audi EA827, equipou a Parati em quase toda sua existência. É um motor robusto e com peça amplamente disponível — mesmo décadas depois, ainda é fácil achar pistão, biela, junta de cabeçote e kit de correia no mercado paralelo.' },
  { severity: 'OK', title: 'Compartilha praticamente toda a mecânica com Gol/Voyage/Saveiro da mesma geração', body: 'Por fazer parte do "Projeto BX" junto com Gol, Voyage e Saveiro, a Parati compartilha motor, câmbio, suspensão e freio com esses modelos da mesma época. Se não achar peça catalogada como "Parati", procure também por "Gol" ou "Saveiro" do mesmo ano/motorização.' },
  { severity: 'OK', title: 'Parati Surf 1995: edição especial hoje valorizada por colecionadores', body: 'A série especial Surf (1995, último ano da geração "quadrada") veio com cor azul havaí exclusiva, rodas de liga leve e motor AP1800 — hoje é uma das versões mais procuradas por colecionadores de clássicos VW, o que reflete em preço mais alto e peça de acabamento mais difícil de achar (exclusiva da série).' },
]

const PROBLEMAS_QUADRADA: TipInput[] = [
  { severity: 'WARN', title: 'Bomba de óleo com falha prematura relatada', body: 'É queixa recorrente nessa geração — a bomba de óleo pode falhar antes do esperado. Fique atento à pressão de óleo (luz de advertência ou manômetro, se equipado) e não ignore ruído de "batida" no motor, que pode indicar lubrificação insuficiente.' },
  { severity: 'WARN', title: 'Revestimento interno frágil — painel, porta, banco racham com o tempo', body: 'Plásticos internos dessa geração (painel, guarnições de porta, volante) tendem a ressecar e ficar quebradiços com a idade, podendo rachar ou soltar. Não é defeito mecânico, mas afeta bastante a experiência de quem procura unidade bem conservada.' },
  { severity: 'WARN', title: 'Plástico externo resseca/desbota e farol amarela com a idade', body: 'Para-choques e frisos plásticos ressecam e desbotam com exposição solar prolongada, e os faróis costumam amarelar. Polimento de farol e hidratante/silicone em plástico externo ajudam a disfarçar, mas o problema tende a voltar sem manutenção periódica.' },
  { severity: 'WARN', title: 'Vidro das portas "bate" — regulador/guia desgastado', body: 'Vidro subindo/descendo com batida forte no final do curso é sintoma comum de guia ou regulador de vidro desgastado. Não é item caro de trocar, mas vale resolver logo — vidro "solto" pode rachar com o impacto repetido.' },
]

const MANUTENCAO_QUADRADA: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Parati "Quadrada" (AP 1.6/1.8)', body: '7.500-10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo (correia + tensores + bomba d\'água) — motor AP é interferente, não postergar. | Verificar pressão de óleo regularmente — bomba de óleo tem histórico de falha prematura nessa geração. | 20.000 km — Filtro de ar e filtro de cabine (se equipado). | 40.000 km — Fluido de freio.' },
]

// ---------- "CARA NOVA" / G2 (1996-1999) — restyle igual ao Gol G2, GTi a partir de 1997 ----------

const MACETES_G2: TipInput[] = [
  { severity: 'OK', title: 'Restyle igual ao Gol G2 — peça de lataria intercambiável', body: 'O redesenho de 1996 seguiu a mesma linguagem visual aplicada ao Gol G2 da época — para-lamas, capô e para-choques costumam ter equivalente direto no Gol/Saveiro G2, ampliando bastante a oferta de peça de lataria no mercado paralelo.' },
  { severity: 'OK', title: 'GTi 2000 16V (a partir de 1997): versão esportiva com injeção multiponto', body: 'A partir de 1997 a Parati ganhou a versão GTi com motor 2.0 16V e injeção eletrônica multiponto — bem mais sofisticada que as versões de injeção simples/carburador da mesma época. Peça de motor do GTi (cabeçote 16V, sistema de injeção) é mais específica e mais rara que a das versões AP 1.6/1.8 comuns — confirme sempre que está comprando peça certa para o GTi, não para o AP "comum".' },
  { severity: 'OK', title: 'Versão 4 portas a partir de 1998', body: 'Até 1997 a Parati era vendida só com 2 portas dianteiras (mais a porta traseira do porta-malas); a versão de 4 portas chegou como modelo 1998. Isso não muda a mecânica, só a carroceria — mas vale saber na hora de procurar peça de porta/vidro.' },
]

const PROBLEMAS_G2: TipInput[] = [
  { severity: 'WARN', title: 'Ventoinha do radiador liga prematuramente e descarrega a bateria', body: 'Queixa recorrente: a ventoinha entra em funcionamento logo ao ligar o motor, antes da temperatura normal de trabalho, gerando desgaste acelerado da bateria (principalmente em quem roda pouco ou fica muito tempo parado no trânsito). Vale checar o sensor/interruptor de temperatura do radiador se notar esse comportamento.' },
  { severity: 'WARN', title: 'Bomba de óleo e revestimento interno — mesmos pontos de atenção da geração anterior', body: 'A Parati G2 herda os mesmos pontos de atenção da "quadrada": bomba de óleo com histórico de falha prematura e revestimento interno frágil que resseca/racha com o tempo.' },
]

const MANUTENCAO_G2: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Parati G2 (AP 1.6/1.8/2.0 16V)', body: '7.500-10.000 km — Troca de óleo do motor + filtro (GTi: óleo sintético de boa qualidade pelo regime mais exigente do 16V). | 60.000 km/5 anos — Kit de correia dentada completo. | Verificar sensor/interruptor de temperatura do radiador se a ventoinha ligar cedo demais. | Verificar pressão de óleo regularmente. | 40.000 km — Fluido de freio.' },
]

// ---------- G3 (1999-2005) — restyle igual ao Gol G3, Track & Field a partir de 2003 ----------

const MACETES_G3: TipInput[] = [
  { severity: 'OK', title: 'Restyle acompanhando o Gol G3 — mesma lógica de peça compartilhada', body: 'O redesenho de 1999 seguiu as mudanças estéticas e mecânicas aplicadas ao Gol G3 do mesmo ano — mais uma vez, peça de lataria e mecânica básica costuma ter equivalente no Gol/Saveiro G3.' },
  { severity: 'OK', title: 'Track & Field (a partir de 2003): versão de topo mais equipada', body: 'A partir de 2003 a Parati ganhou a versão Track & Field, disponível com motor AP 1.6, 1.8 ou 2.0 — posicionada como topo de linha, com mais itens de série. Mecânica é a mesma das versões comuns do mesmo motor, só o nível de equipamento muda.' },
]

const PROBLEMAS_G3: TipInput[] = [
  { severity: 'WARN', title: 'Mesmos pontos de atenção herdados: bomba de óleo, ventoinha, revestimento', body: 'A geração G3 segue com os mesmos pontos de atenção documentados nas gerações anteriores — bomba de óleo, comportamento da ventoinha e fragilidade do revestimento interno. Não foram problemas "resolvidos" de uma geração para outra, apenas herdados junto com a plataforma.' },
]

const MANUTENCAO_G3: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Parati G3 (AP 1.6/1.8/2.0)', body: '7.500-10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo. | Verificar pressão de óleo regularmente. | 40.000 km — Fluido de freio. | 20.000 km — Filtro de ar e filtro de cabine (se equipado).' },
]

// ---------- G4 (2005-2013) — AP saindo de linha, Total Flex, 1.0 16V Turbo ----------

const MACETES_G4: TipInput[] = [
  { severity: 'OK', title: 'AP sendo gradualmente descontinuado — convivência com o novo 1.0 16V Turbo', body: 'Nessa geração final, o motor AP (ainda em 1.6/1.8) foi sendo gradualmente descontinuado pela Volkswagen ao longo dos anos 2000, com produção encerrando por volta de 2012-2013. Ao mesmo tempo, versões como Crossover, Titan, Evidence e Utility passaram a oferecer o motor 1.0 16V Turbo (família EA111) — um motor pequeno e turbinado bem diferente mecanicamente do AP tradicional. Confirme qual motor sua unidade tem antes de comprar peça — não são intercambiáveis.' },
  { severity: 'OK', title: 'Total Flex chega nessa geração', body: 'A tecnologia flex-fuel (álcool/gasolina em qualquer proporção) foi introduzida na linha Parati a partir do G4, nas versões "Total Flex" — antes disso as versões eram só a gasolina ou só a álcool.' },
  { severity: 'WARN', title: 'Motor 1.0 16V Turbo (EA111): galerias de óleo estreitas exigem troca em dia', body: 'O motor 1.0 16V Turbo tem galerias de óleo mais estreitas que o AP tradicional — óleo de especificação errada ou troca atrasada forma borra que entope o pescador da bomba e os tuchos hidráulicos, causando ruído de válvula e, em casos graves, falha de lubrificação. Respeite rigorosamente o intervalo e a especificação de óleo indicada para esse motor.' },
]

const PROBLEMAS_G4: TipInput[] = [
  { severity: 'WARN', title: 'Corpo de borboleta (TBI) suja pelo respiro do cárter — sintoma de aceleração irregular', body: 'É comum acúmulo de sujeira no corpo da borboleta (TBI) vindo do sistema de ventilação do cárter, causando marcha lenta irregular e resposta ruim do acelerador. A limpeza do TBI seguida do ajuste básico resolve na maioria dos casos.' },
  { severity: 'WARN', title: 'Nunca coloque mais que 3,3 litros de óleo no motor 1.0 — excesso acelera a carbonização do TBI', body: 'Erro comum na troca de óleo do motor 1.0: colocar 3,5 L em vez dos 3,3 L especificados. O excesso de óleo agrava a carbonização do corpo de borboleta pelo sistema de ventilação do cárter — confirme sempre a quantidade exata na hora da troca, não "arredonde para cima" por precaução.' },
  { severity: 'WARN', title: 'Sensor de temperatura da água com defeito causa aceleração irregular ou falha de partida', body: 'Boa parte dos diagnósticos de "carro sem força" ou "engasgando" no motor 1.0 dessa geração termina no sensor de temperatura da água, que envia informação incorreta para a central de injeção. É item relativamente barato — vale descartar essa hipótese antes de investir em diagnóstico mais caro.' },
]

const MANUTENCAO_G4: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Parati G4 (AP 1.6/1.8 ou 1.0 16V Turbo)', body: '10.000 km/12 meses — Troca de óleo do motor + filtro (motor 1.0: respeitar rigorosamente 3,3 L, nunca 3,5 L). | 60.000 km/5 anos — Kit de correia dentada completo (motores AP). | 30.000 km — Limpeza do corpo de borboleta (TBI), especialmente no motor 1.0. | Verificar sensor de temperatura da água se notar aceleração irregular ou falha de partida. | 40.000 km — Fluido de freio. | 20.000 km — Filtro de ar e filtro de cabine.' },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Parati', yearFrom: 1982, yearTo: 1996, tireSize: '165/70 R13 (referência)', frontPsi: 26, rearPsi: 26, frontPsiLoad: 28, rearPsiLoad: 32, sparePsi: 60, notes: 'Carro de época — confirme o valor original na etiqueta da coluna da porta ou manual, se disponível. Traseiro com mais pressão por conta do uso como carga.' },
  { modelName: 'Parati', yearFrom: 1996, yearTo: 1999, tireSize: '175/70 R13 (referência)', frontPsi: 26, rearPsi: 28, frontPsiLoad: 28, rearPsiLoad: 32, sparePsi: 60, notes: 'GTi 2.0 16V pode usar aro/pneu diferente das versões AP comuns — confirme na etiqueta.' },
  { modelName: 'Parati', yearFrom: 1999, yearTo: 2005, tireSize: '175/70 R13 (referência)', frontPsi: 28, rearPsi: 28, frontPsiLoad: 30, rearPsiLoad: 34, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta.' },
  { modelName: 'Parati', yearFrom: 2005, yearTo: 2013, tireSize: '175/70 R14 (referência)', frontPsi: 28, rearPsi: 28, frontPsiLoad: 30, rearPsiLoad: 34, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — pode variar entre AP e 1.0 16V Turbo.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Parati', yearFrom: 1982, yearTo: 1996, component: 'Óleo do motor + filtro', intervalKm: 7500, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Parati', yearFrom: 1982, yearTo: 1996, component: 'Kit de correia dentada completo (correia + tensores + bomba d\'água)', intervalKm: 60000, intervalMonths: 60, notes: 'Motor interferente — não postergar.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Parati', yearFrom: 1982, yearTo: 1996, component: 'Verificação da pressão de óleo (bomba com histórico de falha prematura)', intervalKm: null, intervalMonths: 6, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'Parati', yearFrom: 1982, yearTo: 1996, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 3 },

  { modelName: 'Parati', yearFrom: 1996, yearTo: 1999, component: 'Óleo do motor + filtro', intervalKm: 7500, intervalMonths: 12, notes: 'GTi: óleo sintético de boa qualidade pelo regime mais exigente do 16V.', priority: 'CRITICAL', order: 4 },
  { modelName: 'Parati', yearFrom: 1996, yearTo: 1999, component: 'Kit de correia dentada completo', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 5 },
  { modelName: 'Parati', yearFrom: 1996, yearTo: 1999, component: 'Verificação do sensor/interruptor de temperatura do radiador', intervalKm: null, intervalMonths: 12, notes: 'Ventoinha ligando prematuramente descarrega a bateria.', priority: 'MEDIUM', order: 6 },
  { modelName: 'Parati', yearFrom: 1996, yearTo: 1999, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 7 },

  { modelName: 'Parati', yearFrom: 1999, yearTo: 2005, component: 'Óleo do motor + filtro', intervalKm: 7500, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 8 },
  { modelName: 'Parati', yearFrom: 1999, yearTo: 2005, component: 'Kit de correia dentada completo', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 9 },
  { modelName: 'Parati', yearFrom: 1999, yearTo: 2005, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 10 },

  { modelName: 'Parati', yearFrom: 2005, yearTo: 2013, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 1.0: respeitar rigorosamente 3,3 L, nunca 3,5 L.', priority: 'CRITICAL', order: 11 },
  { modelName: 'Parati', yearFrom: 2005, yearTo: 2013, component: 'Kit de correia dentada completo (motores AP)', intervalKm: 60000, intervalMonths: 60, notes: null, priority: 'CRITICAL', order: 12 },
  { modelName: 'Parati', yearFrom: 2005, yearTo: 2013, component: 'Limpeza do corpo de borboleta (TBI)', intervalKm: 30000, intervalMonths: null, notes: 'Especialmente relevante no motor 1.0.', priority: 'MEDIUM', order: 13 },
  { modelName: 'Parati', yearFrom: 2005, yearTo: 2013, component: 'Verificação do sensor de temperatura da água', intervalKm: null, intervalMonths: 12, notes: 'Causa comum de aceleração irregular/falha de partida no motor 1.0.', priority: 'MEDIUM', order: 14 },
  { modelName: 'Parati', yearFrom: 2005, yearTo: 2013, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 15 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Parati', yearFrom: 1982, yearTo: 1996, MACETES: MACETES_QUADRADA, PROBLEMAS: PROBLEMAS_QUADRADA, MANUTENCAO: MANUTENCAO_QUADRADA },
  { modelName: 'Parati', yearFrom: 1996, yearTo: 1999, MACETES: MACETES_G2, PROBLEMAS: PROBLEMAS_G2, MANUTENCAO: MANUTENCAO_G2 },
  { modelName: 'Parati', yearFrom: 1999, yearTo: 2005, MACETES: MACETES_G3, PROBLEMAS: PROBLEMAS_G3, MANUTENCAO: MANUTENCAO_G3 },
  { modelName: 'Parati', yearFrom: 2005, yearTo: 2013, MACETES: MACETES_G4, PROBLEMAS: PROBLEMAS_G4, MANUTENCAO: MANUTENCAO_G4 },
]

async function main() {
  console.log('🚗 Seed VW Parati...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volkswagen', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volkswagen', vehicleTypeId: carroType.id },
  })

  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Parati', brandId: brand.id } },
    update: {},
    create: { name: 'Parati', brandId: brand.id },
  })

  // Delete once (não por bloco) — múltiplos blocos usam o mesmo modelName 'Parati'
  await prisma.tip.deleteMany({ where: { modelName: 'Parati' } })

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
    console.log(`  ✅ Parati (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }

  await prisma.tirePressure.deleteMany({ where: { modelName: 'Parati' } })
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: Parati (${tp.yearFrom}-${tp.yearTo ?? '...'})`)
  }

  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Parati' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ VW Parati concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
