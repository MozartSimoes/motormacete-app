/**
 * Seed Nissan Sentra — macetes, problemas, manutenção e calibragem
 * Três fases no Brasil: B15/B16 "clássico" (2004-2012, trims GXE/GLE/
 * GSX/EX/SER, motor 1.8/2.0 aspirado, câmbio automático convencional —
 * SEM CVT ainda), B17 (2013-2019, reestreia como versão rebatizada do
 * Nissan Sylphy, motor 2.0 16V Flex MRA8DE ÚNICO — CORREÇÃO: o
 * conteúdo antigo deste arquivo mencionava também um motor 1.6 HR16DE
 * para o Sentra, mas a FIPE brasileira só lista trims "2.0"/"2.0 Flex
 * Fuel" para essa geração — o 1.6 HR16DE equipa March/Versa/Kicks no
 * Brasil, não o Sentra; removido daqui para não confundir o dono na
 * hora de comprar peça de motor) e B18 (2020-2025, também só 2.0 Flex).
 * Câmbio CVT Xtronic a partir do B17. Migrado do seed.ts histórico
 * (conteúdo técnico muito detalhado já existente, preservado e
 * corrigido) + MaintenanceItem que faltava + pesquisa de recalls reais.
 * Execute: pnpm --filter @motormacete/database db:seed:nissan-sentra
 *
 * Fontes: bemparana.com.br, nissannews.com, autolivraria.com.br,
 *         garagem360.com.br, autoo.com.br, mobiauto.com.br,
 *         reclameaqui.com.br, procon.sp.gov.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- GERAÇÃO B15/B16 "CLÁSSICO" (2004-2012) — sem CVT ----------

const MACETES_CLASSICO: TipInput[] = [
  { severity: 'OK', title: 'Câmbio automático convencional — sem os problemas de CVT das gerações seguintes', body: 'Diferente do B17/B18 (que usam CVT Xtronic), o Sentra dessa fase tem câmbio automático de conversor de torque tradicional — mais simples e sem o histórico de fluido/shudder que marca as gerações mais novas.' },
  { severity: 'OK', title: 'Motor tem corrente de distribuição — sem troca programada', body: 'Assim como as gerações seguintes, o motor não usa correia dentada. Barulho metálico a frio que some após aquecer pode indicar corrente esticada — vale inspeção preventiva, mas não existe prazo fixo de troca do kit.' },
  { severity: 'OK', title: 'Confirme a versão (GXE/GLE/GSX/EX/SER) antes de comprar peça de acabamento', body: 'Essa fase teve várias nomenclaturas de versão ao longo dos anos (GXE, GLE, GSX/EX, SER) — peça de acabamento e itens de série mudam bastante entre elas. Confirme o ano e a versão exata na hora de procurar peça de interior/painel.' },
]

const PROBLEMAS_CLASSICO: TipInput[] = [
  { severity: 'DANGER', title: 'Recall: gerador de gás do airbag (unidades fabricadas jan/2006-jul/2007)', body: 'A Nissan convocou recall no Brasil para Sentra, Frontier e Pathfinder (5.023 veículos no total) por risco no gerador de gás do airbag — o componente pode gerar pressão excessiva em caso de colisão frontal com acionamento do airbag, provocando abertura inadequada e arremesso de fragmentos dentro da cabine. No Sentra, as unidades afetadas foram fabricadas no México entre janeiro de 2006 e julho de 2007. Confira o chassi em nissan.com.br/proprietarios/recall.html ou ligue 0800 011 1090 — o reparo é gratuito e sem prazo de validade para agendar.' },
  { severity: 'WARN', title: 'Suspensão dianteira: buchas e batentes desgastam com a idade', body: 'Como em qualquer carro dessa faixa etária, ruído tipo "toc toc" em lombada/buraco costuma indicar buchas da bandeja dianteira ou batentes dos amortecedores gastos — item relativamente barato de resolver se identificado cedo.' },
]

const MANUTENCAO_CLASSICO: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Sentra clássico (2004-2012, 1.8/2.0)', body: '10.000 km/12 meses — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios e suspensão dianteira. | 60.000 km — Fluido do câmbio automático convencional (versões automáticas). | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio. | 80.000 km — Fluido de arrefecimento (use sempre o líquido especificado pela Nissan — nunca misture cores/tipos diferentes, a mistura forma geleia e entope o radiador). | Verificar na concessionária se o recall do airbag (unidades jan/2006-jul/2007) já foi concluído.' },
]

// ---------- GERAÇÃO B17 (2013-2019) — reestreia como versão do Sylphy, só 2.0 Flex ----------

const MACETES_B17: TipInput[] = [
  { severity: 'OK', title: 'A partir de 2013 o Sentra é uma versão rebatizada do Nissan Sylphy', body: 'O Sentra lançado no Brasil em setembro de 2013 (B17) é uma versão com nome trocado do Nissan Sylphy vendido em outros mercados (principalmente Ásia) — pode ajudar a encontrar informação técnica adicional e até peça equivalente pesquisando também por "Sylphy" quando "Sentra" não trouxer resultado.' },
  { severity: 'OK', title: 'Motor é 2.0 16V Flex (MRA8DE) — não existe versão 1.6 do Sentra no Brasil', body: 'Diferente do que se vê às vezes por aí, o Sentra brasileiro dessa geração vem exclusivamente com motor 2.0 16V Flex (MRA8DE). O motor 1.6 HR16DE existe na linha Nissan Brasil, mas equipa o March, o Versa e o Kicks — não o Sentra. Não compre peça de motor 1.6 achando que serve no seu Sentra.' },
  { severity: 'WARN', title: 'CVT NS-3: fluido obrigatório a cada 50.000 km', body: 'O CVT Xtronic (Jatco JF015) usa fluido Nissan NS-3 — não existe equivalente genérico aprovado. O manual diz 100.000 km, mas no Brasil (calor + trânsito) mecânicos especializados recomendam 50.000 km para o B17. Fluido degradado causa shudder e pode destruir a caixa (R$ 15.000+ de reparo).' },
  { severity: 'WARN', title: 'Reaprendizado do corpo de borboleta após limpeza', body: 'Após limpar o corpo de borboleta (faça a cada 30.000 km), execute o reaprendizado: com o motor frio, gire a chave sem ligar por 2 s, pressione o acelerador 5x, aguarde 7 s, segure fundo por 10 s até o Check Engine piscar, solte 2 s, segure novamente 12 s. Sem o reaprendizado, a marcha lenta fica irregular e o carro pode "morrer" nos semáforos.' },
  { severity: 'OK', title: 'Óleo 5W30 sintético API SN — nunca semissintético', body: 'O motor MRA8DE (2.0) exige sintético 100% 5W30 API SN ou superior. Capacidade aproximada: 4,4 L. Nunca use semissintético — o calor do motor em uso brasileiro degrada óleo inferior rapidamente.' },
  { severity: 'OK', title: 'Ligar o AC antes de entrar no carro parado ao sol', body: 'Antes de entrar, ligue a ignição e acione o AC enquanto ainda está do lado de fora (ou use o controle remoto). O carro começa a refrigerar com o motor menos quente. O eletroventilador do Sentra B17 2013-2014 é fraco — menos demanda inicial prolonga sua vida.' },
]

const PROBLEMAS_B17: TipInput[] = [
  { severity: 'DANGER', title: 'CVT sem kit de tropicalização (unidades 2013)', body: 'A Nissan não instalou o resfriador de óleo da transmissão no Sentra B17 fabricado antes de 2014. Nos EUA esse kit foi tornado obrigatório por agências reguladoras; no Brasil a Nissan negou o recall. Resultado: transmissão superaquece em trânsito lento e calor intenso. Kit Nissan 21606-ET89B existe para retrofitting — exija da concessionária em caso de falha.' },
  { severity: 'DANGER', title: 'Recall: luz de freio pode não acender (unidades 2017-2020)', body: 'A Nissan convocou recall para 14.778 unidades do Sentra ano/modelo 2017-2020 por defeito que pode impedir o acendimento das luzes de freio — risco real de colisão traseira, já que o carro de trás não recebe o aviso visual de frenagem. Confira o chassi em nissan.com.br/proprietarios/recall.html ou ligue 0800 011 1090.' },
  { severity: 'DANGER', title: 'Eletroventilador do radiador — queima prematura (unidades 2013-2014)', body: 'O motor da ventoinha do radiador nos modelos 2013-2014 tem escovas de carvão de baixa qualidade que se desgastam rapidamente. Sintoma: AC para de resfriar, cheiro de queimado, motor pode superaquecer sem alerta no painel. Solução econômica: trocar apenas as escovas com eletricista automotivo (R$ 50-150). Troca do conjunto completo Nissan: R$ 1.900. Se ignorado, pode queimar o compressor do AC (R$ 5.000 em peças).' },
  { severity: 'WARN', title: 'CVT — trepidação (shudder) ao partir', body: 'Vibração/tremor ao acelerar suavemente entre 1.200-1.500 rpm, especialmente em aclives. Principal causa: fluido CVT NS-3 degradado por intervalos longos. 1ª medida: troca do fluido. 2ª: reprogramação do conversor de torque na concessionária. 3ª: troca do conversor (R$ 3.000-5.000). Quarta opção — transmissão completa — supera R$ 15.000.' },
  { severity: 'WARN', title: 'Corpo de borboleta — carbonização', body: 'Acúmulo de borra de carbono no corpo de borboleta é muito comum em motores Flex com uso misto de álcool e gasolina. Sintomas: marcha lenta irregular, engasgos ao soltar o acelerador, carro "morre" na frenagem. Limpeza com spray Motul Throttle Body Clean a cada 30.000 km, seguida do reaprendizado. Custo na oficina: R$ 80-200.' },
  { severity: 'WARN', title: 'Consumo elevado de óleo (MRA8DE) acima de 100.000 km', body: 'O motor 2.0 MRA8DE apresenta consumo progressivo de óleo acima de 100.000 km — velas carbonizadas e sem vazamento visível indicam anéis de pistão. Solução inicial: flush de motor + óleo sintético 5W30 de qualidade superior. Em casos graves, retífica (R$ 4.000-6.000). Monitorar o nível a cada abastecimento.' },
  { severity: 'WARN', title: 'Suspensão dianteira — barulho "toc toc" em lombadas', body: 'Barulhos ao passar em irregularidades indicam buchas da bandeja dianteira e/ou batentes dos amortecedores desgastados. Acima de 80.000 km é quase inevitável. Custo: R$ 400-1.200 dependendo das peças. Se persistir após buchas, investigar cubo de roda empenado.' },
]

const MANUTENCAO_B17: TipInput[] = [
  { severity: 'OK', title: 'Óleo 5W30 API SN sintético a cada 10.000 km', body: 'Intervalo máximo 10.000 km ou 6 meses. Em uso severo (trânsito intenso, calor extremo): antecipar para 7.500 km. Marcas aprovadas: Castrol Edge, Mobil 1, Shell Helix Ultra, Lubrax Excellium — todas 5W30 sintético.' },
  { severity: 'WARN', title: 'Fluido CVT NS-3 a cada 50.000 km', body: 'O manual Nissan indica 100.000 km, mas foi desenvolvido para o clima americano. No Brasil, a recomendação de mecânicos especializados é 50.000 km. Troca completa com máquina inclui limpeza do carter, filtro interno e ímãs — R$ 1.200-1.400 na concessionária.' },
  { severity: 'OK', title: 'Velas iridium a cada 100.000 km', body: 'MRA8DE: NGK LFR5AIX-11. Com uso frequente de etanol, inspecionar a cada 20.000 km — etanol é mais corrosivo para eletrodos. Nunca use velas não-iridium no Sentra.' },
  { severity: 'OK', title: 'Limpeza do corpo de borboleta a cada 30.000 km', body: 'Item crítico no Sentra Flex. Use spray específico (Motul, 3M ou equivalente) e execute o reaprendizado eletrônico após a limpeza. Custo total na oficina: R$ 80-200.' },
  { severity: 'OK', title: 'Fluido de arrefecimento a cada 80.000 km', body: 'Use Nissan Coolant (azul) ou Long Life Coolant compatível. NUNCA misture cores — o azul Nissan é à base de silicato e o verde universal é OAT; a mistura forma geleia e entope o radiador. Capacidade: ~6 litros.' },
  { severity: 'OK', title: 'Correia dos acessórios: inspecionar a cada 40.000 km e trocar a cada 80.000 km', body: 'Correia dos acessórios (alternador, compressor, bomba de direção) de borracha EPDM. Trincas e fissuras indicam troca imediata — ruptura deixa o motor superaquecer e mata a bateria enquanto você dirige.' },
]

// ---------- GERAÇÃO B18 (2020-2025) ----------

const MACETES_B18: TipInput[] = [
  { severity: 'OK', title: 'Também só 2.0 Flex — mesma correção da geração anterior', body: 'O B18 segue exclusivamente com motor 2.0 16V Flex (MRA8DE) no Brasil — não existe versão 1.6 do Sentra em nenhuma geração vendida aqui.' },
  { severity: 'OK', title: 'CVT Xtronic evoluído, mas cuidado com fluido continua essencial', body: 'O CVT dessa geração é uma evolução do XTRONIC do B17, com intervalo de fluido um pouco mais longo recomendado por mecânicos especializados — mas o princípio é o mesmo: fluido degradado é a causa mais comum de shudder e falha prematura.' },
]

const PROBLEMAS_B18: TipInput[] = [
  { severity: 'OK', title: 'Verifique se sua unidade está na faixa do recall de luz de freio (2017-2020)', body: 'O recall de 14.778 unidades por possível falha no acendimento da luz de freio (ver detalhes na geração B17) cobre unidades ano/modelo até 2020 — as primeiras unidades B18 podem estar incluídas na faixa afetada. Confirme o chassi em nissan.com.br/proprietarios/recall.html mesmo em unidade "geração nova".' },
  { severity: 'WARN', title: 'Corpo de borboleta e consumo de óleo: mesmos pontos de atenção herdados', body: 'Por usar evolução do mesmo motor MRA8DE, o B18 mantém os mesmos pontos de atenção do B17: carbonização do corpo de borboleta em uso misto álcool/gasolina e possível consumo de óleo progressivo em quilometragem alta.' },
]

const MANUTENCAO_B18: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Sentra B18 (2.0 Flex, CVT)', body: '10.000 km/12 meses — Troca de óleo do motor 5W30 sintético API SN + filtro. | 60.000 km — Fluido do câmbio CVT NS-3. | 30.000 km — Limpeza do corpo de borboleta + reaprendizado eletrônico. | 100.000 km — Velas iridium (inspecionar a cada 20.000 km com uso de etanol). | 80.000 km — Fluido de arrefecimento (nunca misturar cores). | 40.000 km/80.000 km — Correia dos acessórios: inspecionar/trocar. | Verificar na concessionária se o recall da luz de freio já foi concluído.' },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Sentra', yearFrom: 2004, yearTo: 2012, tireSize: '195/65 R15 (referência)', frontPsi: 30, rearPsi: 28, frontPsiLoad: 33, rearPsiLoad: 32, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — varia por versão/motorização.' },
  { modelName: 'Sentra', yearFrom: 2013, yearTo: 2019, tireSize: '205/55 R16', frontPsi: 33, rearPsi: 30, frontPsiLoad: 33, rearPsiLoad: 44, sparePsi: 60, notes: 'B17 (2.0 Flex). Traseiro com carga alta: 44 PSI. Estepe step: máx 80 km/h.' },
  { modelName: 'Sentra', yearFrom: 2020, yearTo: null, tireSize: '205/55 R17', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 36, sparePsi: 60, notes: 'B18 (2.0 Flex). Aro 17 na versão padrão. Com carga: 36 PSI em ambos os eixos.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Sentra', yearFrom: 2004, yearTo: 2012, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Sentra', yearFrom: 2004, yearTo: 2012, component: 'Verificação do recall do airbag (unidades jan/2006-jul/2007)', intervalKm: null, intervalMonths: null, notes: 'Risco de arremesso de fragmentos do gerador de gás do airbag.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Sentra', yearFrom: 2004, yearTo: 2012, component: 'Fluido do câmbio automático convencional', intervalKm: 60000, intervalMonths: 48, notes: 'Versões automáticas.', priority: 'HIGH', order: 2 },
  { modelName: 'Sentra', yearFrom: 2004, yearTo: 2012, component: 'Inspeção de freios e suspensão dianteira', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'Sentra', yearFrom: 2004, yearTo: 2012, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'Sentra', yearFrom: 2004, yearTo: 2012, component: 'Fluido de arrefecimento', intervalKm: 80000, intervalMonths: null, notes: 'Nunca misturar cores/tipos de fluido diferentes.', priority: 'HIGH', order: 5 },

  { modelName: 'Sentra', yearFrom: 2013, yearTo: 2019, component: 'Óleo do motor 5W30 sintético API SN + filtro', intervalKm: 10000, intervalMonths: 6, notes: 'Antecipar para 7.500 km em uso severo.', priority: 'CRITICAL', order: 6 },
  { modelName: 'Sentra', yearFrom: 2013, yearTo: 2019, component: 'Fluido do câmbio CVT NS-3', intervalKm: 50000, intervalMonths: null, notes: 'Manual diz 100.000 km, mas clima brasileiro pede antecipação — fluido degradado pode destruir a caixa.', priority: 'CRITICAL', order: 7 },
  { modelName: 'Sentra', yearFrom: 2013, yearTo: 2019, component: 'Verificação do recall da luz de freio (unidades 2017-2020)', intervalKm: null, intervalMonths: null, notes: 'Risco de colisão traseira por luz de freio não acender.', priority: 'CRITICAL', order: 8 },
  { modelName: 'Sentra', yearFrom: 2013, yearTo: 2019, component: 'Limpeza do corpo de borboleta + reaprendizado', intervalKm: 30000, intervalMonths: null, notes: 'Item crítico em uso misto álcool/gasolina.', priority: 'HIGH', order: 9 },
  { modelName: 'Sentra', yearFrom: 2013, yearTo: 2019, component: 'Velas iridium', intervalKm: 100000, intervalMonths: null, notes: 'Inspecionar a cada 20.000 km com uso de etanol.', priority: 'MEDIUM', order: 10 },
  { modelName: 'Sentra', yearFrom: 2013, yearTo: 2019, component: 'Fluido de arrefecimento', intervalKm: 80000, intervalMonths: null, notes: 'Nunca misturar cores/tipos diferentes.', priority: 'HIGH', order: 11 },
  { modelName: 'Sentra', yearFrom: 2013, yearTo: 2019, component: 'Correia dos acessórios', intervalKm: 80000, intervalMonths: null, notes: 'Inspecionar a cada 40.000 km, trocar a cada 80.000 km.', priority: 'MEDIUM', order: 12 },
  { modelName: 'Sentra', yearFrom: 2013, yearTo: 2019, component: 'Monitorar nível/consumo de óleo (motor MRA8DE acima de 100.000 km)', intervalKm: null, intervalMonths: null, notes: 'Consumo progressivo relatado em alta quilometragem.', priority: 'MEDIUM', order: 13 },

  { modelName: 'Sentra', yearFrom: 2020, yearTo: null, component: 'Óleo do motor 5W30 sintético API SN + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 14 },
  { modelName: 'Sentra', yearFrom: 2020, yearTo: null, component: 'Fluido do câmbio CVT NS-3', intervalKm: 60000, intervalMonths: null, notes: null, priority: 'CRITICAL', order: 15 },
  { modelName: 'Sentra', yearFrom: 2020, yearTo: null, component: 'Verificação do recall da luz de freio (unidades até 2020)', intervalKm: null, intervalMonths: null, notes: 'Confirmar mesmo em unidade recente.', priority: 'HIGH', order: 16 },
  { modelName: 'Sentra', yearFrom: 2020, yearTo: null, component: 'Limpeza do corpo de borboleta + reaprendizado', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'HIGH', order: 17 },
  { modelName: 'Sentra', yearFrom: 2020, yearTo: null, component: 'Velas iridium', intervalKm: 100000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 18 },
  { modelName: 'Sentra', yearFrom: 2020, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 80000, intervalMonths: null, notes: null, priority: 'HIGH', order: 19 },
  { modelName: 'Sentra', yearFrom: 2020, yearTo: null, component: 'Correia dos acessórios', intervalKm: 80000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 20 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Sentra', yearFrom: 2004, yearTo: 2012, MACETES: MACETES_CLASSICO, PROBLEMAS: PROBLEMAS_CLASSICO, MANUTENCAO: MANUTENCAO_CLASSICO },
  { modelName: 'Sentra', yearFrom: 2013, yearTo: 2019, MACETES: MACETES_B17, PROBLEMAS: PROBLEMAS_B17, MANUTENCAO: MANUTENCAO_B17 },
  { modelName: 'Sentra', yearFrom: 2020, yearTo: null, MACETES: MACETES_B18, PROBLEMAS: PROBLEMAS_B18, MANUTENCAO: MANUTENCAO_B18 },
]

async function main() {
  console.log('🚗 Seed Nissan Sentra...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Nissan', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Nissan', vehicleTypeId: carroType.id },
  })

  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Sentra', brandId: brand.id } },
    update: {},
    create: { name: 'Sentra', brandId: brand.id },
  })

  // Delete once (não por bloco) — múltiplos blocos usam o mesmo modelName 'Sentra'
  await prisma.tip.deleteMany({ where: { modelName: 'Sentra' } })

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
    console.log(`  ✅ Sentra (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }

  await prisma.tirePressure.deleteMany({ where: { modelName: 'Sentra' } })
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: Sentra (${tp.yearFrom}-${tp.yearTo ?? '...'})`)
  }

  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Sentra' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Nissan Sentra concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
