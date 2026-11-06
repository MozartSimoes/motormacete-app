/**
 * Seed Audi A3 — macetes, problemas, manutenção e calibragem
 * Quatro fases no Brasil: 8L (1997-2006, primeiro Audi fabricado no
 * Brasil, motor 1.8 5V exclusivo, câmbio manual ou Tiptronic
 * convencional), 8P (2006-2013, importado, introduz o S-tronic —
 * primeiro câmbio de dupla embreagem do Brasil — e a carroceria
 * Sportback), 8V pré-facelift (2013-2022, plataforma MQB, motor 1.4
 * TFSI Flex — único motor flex que a Audi já produziu no mundo,
 * desenvolvido especificamente para o Brasil) e 8V facelift "MHEV"
 * (2023+, motor 2.0 TFSI 204cv com sistema mild-hybrid 48V, trims
 * S-Line/Performance Black). O câmbio S-tronic (dupla embreagem) tem
 * problema crônico de mecatrônica documentado desde a geração 8P até
 * hoje — em outros países (China, Austrália, EUA) a Audi/VW estendeu
 * garantia ou fez recall; no Brasil, não. Isso é tratado como item de
 * atenção prioritário em todas as gerações que usam S-tronic.
 * Execute: pnpm --filter @motormacete/database db:seed:audi-a3
 *
 * Fontes: autopapo.com.br, carrosegaragem.com.br, audicentermorumbi.com.br,
 *         reclameaqui.com.br, change.org, turbonoticias.com.br,
 *         vrum.com.br, webmotors.com.br, opinautos.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- GERAÇÃO 8L (1997-2006) — primeiro Audi fabricado no Brasil ----------

const MACETES_8L: TipInput[] = [
  { severity: 'OK', title: 'Primeiro Audi fabricado no Brasil, motor 1.8 5 válvulas/cilindro exclusivo', body: 'O A3 8L foi o primeiro Audi produzido em solo brasileiro (fábrica no Paraná), compartilhando cerca de 70% dos componentes com o Golf da mesma época — o que ajuda a achar peça de suspensão/elétrica no mercado paralelo. O motor 1.8 (aspirado e turbo) usa tecnologia de 5 válvulas por cilindro, inspirada em tecnologia de competição — é diferente do 1.8 20V mais comum em outros modelos VW/Audi da época, então confirme o código do motor antes de comprar peça interna (pistão, válvula, comando).' },
  { severity: 'OK', title: 'Câmbio Tiptronic é automático convencional — não tem o problema de mecatrônica do S-tronic', body: 'Nessa geração, a versão automática é o Tiptronic (conversor de torque tradicional com modo manual sequencial), não o câmbio de dupla embreagem S-tronic que apareceu só a partir da geração seguinte (8P). Isso significa que o A3 8L NÃO sofre do problema crônico de mecatrônica que afeta as gerações mais novas — mecanicamente é mais simples e historicamente mais previsível.' },
  { severity: 'OK', title: 'Motor 1.8 Turbo compartilha peça com Golf/Passat da mesma época', body: 'O motor 1.8/1.8 Turbo dessa geração (família EA827) equipou vários modelos VW/Audi do período — isso amplia bastante a oferta de peça de motor no mercado paralelo comparado a um Audi "isolado".' },
]

const PROBLEMAS_8L: TipInput[] = [
  { severity: 'WARN', title: 'Correia dentada — motor interferente, troca é item crítico', body: 'O motor 1.8/1.8 Turbo dessa geração usa correia dentada (não corrente) e é interferente: se a correia arrebentar ou pular dente, o dano ao motor é grave (válvula bate no pistão). Nunca ultrapasse o intervalo de troca do kit completo (correia + tensores + bomba d\'água) por já ser um carro de décadas de uso.' },
  { severity: 'WARN', title: 'Elétrica de época: chicote e sensores desgastados pela idade', body: 'Como em praticamente todo carro dessa faixa etária, falhas elétricas por ressecamento de chicote e sensores desgastados são comuns. Antes de qualquer diagnóstico caro, cheque os aterramentos (massa) do motor e da carroceria — corrosão nesses pontos é causa recorrente de "fantasma elétrico".' },
]

const MANUTENCAO_8L: TipInput[] = [
  { severity: 'OK', title: 'Cronograma A3 8L (1.6/1.8/1.8 Turbo)', body: '7.500-10.000 km — Troca de óleo do motor + filtro. | 60.000 km/5 anos — Kit de correia dentada completo (correia + tensores + bomba d\'água) — motor interferente, não postergar. | 60.000 km — Fluido do câmbio Tiptronic (versões automáticas). | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio. | Verificar aterramentos elétricos na primeira suspeita de "fantasma elétrico".' },
]

// ---------- GERAÇÃO 8P (2006-2013) — introduz o S-tronic no Brasil ----------

const MACETES_8P: TipInput[] = [
  { severity: 'OK', title: 'Primeiro câmbio de dupla embreagem (S-tronic) vendido no Brasil', body: 'O A3 8P trouxe o S-tronic — câmbio automatizado de dupla embreagem de 6 marchas, pioneiro no mercado brasileiro pela agilidade nas trocas. Tecnologicamente avançado para a época, mas é também a origem do problema crônico de mecatrônica que persiste nas gerações seguintes (ver PROBLEMAS) — pesquise bem antes de comprar uma unidade automática dessa geração.' },
  { severity: 'OK', title: 'Sportback (5 portas) chega ao Brasil nessa geração', body: 'A carroceria Sportback (5 portas, mais prática no dia a dia) foi introduzida no Brasil a partir de 2007 com a chegada do 8P importado, ao lado da versão de 3 portas herdada da geração anterior.' },
  { severity: 'WARN', title: 'Motores TFSI (injeção direta) acumulam carbono nas válvulas de admissão', body: 'Motores 1.8/2.0 TFSI de injeção direta não têm o combustível "lavando" as válvulas de admissão como em motores de injeção indireta — com o tempo (tipicamente 80.000-100.000 km) forma-se depósito de carbono, causando perda de potência gradual e marcha lenta irregular. Limpeza por hidrojateamento resolve.' },
]

const PROBLEMAS_8P: TipInput[] = [
  { severity: 'DANGER', title: 'Mecatrônica do S-tronic: defeito crônico documentado, sem recall no Brasil', body: 'É um dos problemas mais graves e mais reclamados do A3 no Brasil: a unidade mecatrônica do câmbio S-tronic falha independente de manutenção em dia ou uso adequado, segundo relatos amplamente documentados (Reclame Aqui, petição pública no Change.org, fóruns de proprietários). Sintomas: trepidação e solavanco nas trocas, entrada em modo de emergência (perda de potência), luzes de advertência constantes e risco real de parada súbita em movimento no trânsito. Em países como China, Austrália e EUA a Audi/VW estendeu garantia (10 anos, no caso chinês) ou fez recall formal — no Brasil, milhares de consumidores relatam ficar sem suporte. O reparo/troca do kit custa entre R$ 8.000 e R$ 15.000 quando a mecatrônica já está bem degradada. Se está comprando um A3 8P (ou geração mais nova) automático, insista em teste de estrada longo prestando atenção a qualquer solavanco em baixa velocidade, e considere pedir um diagnóstico de mecatrônica antes de fechar negócio.' },
  { severity: 'WARN', title: 'Elétrica: sensores e módulos com falha em unidades mais antigas', body: 'Assim como a geração anterior, falhas elétricas pontuais (sensores, módulos de conforto) aparecem com o tempo — geralmente não é problema estrutural, mas vale diagnóstico completo em vez de troca de peça isolada.' },
]

const MANUTENCAO_8P: TipInput[] = [
  { severity: 'OK', title: 'Cronograma A3 8P (1.6/1.8/1.8 Turbo/2.0 TFSI)', body: '10.000 km/12 meses — Troca de óleo do motor + filtro. | 60.000 km/3 anos — Óleo do câmbio S-tronic — NUNCA pule essa troca, é a principal prevenção contra degradação prematura da mecatrônica. | A cada revisão — Teste de estrada prestando atenção a solavanco/trepidação em baixa velocidade (sinal precoce de problema na mecatrônica). | 80.000-100.000 km — Considerar limpeza preventiva de carbono nas válvulas de admissão (motores TFSI). | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio.' },
]

// ---------- GERAÇÃO 8V PRÉ-FACELIFT (2013-2022) — 1.4 TFSI Flex, plataforma MQB ----------

const MACETES_8V: TipInput[] = [
  { severity: 'OK', title: 'Motor 1.4 TFSI Flex: único motor flex que a Audi já produziu no mundo', body: 'O A3 8V trouxe o 1.4 TFSI adaptado para etanol/gasolina — motor desenvolvido especificamente para o mercado brasileiro, o único motor flex-fuel que a Audi já colocou em produção globalmente. Isso significa que peça de gerenciamento de combustível (sensores, bicos, módulo) é específica dessa versão brasileira — peça importada de A3 1.4 TFSI de outros países (só gasolina) pode não ser 100% compatível no sistema de injeção.' },
  { severity: 'OK', title: 'Plataforma MQB — mais peça compartilhada com o grupo VW', body: 'A partir dessa geração o A3 usa a plataforma modular MQB, a mesma base do Golf/Jetta MQB. Isso amplia a oferta de peça de suspensão e chassi no mercado paralelo comparado às gerações anteriores baseadas em plataforma mais exclusiva da Audi.' },
  { severity: 'OK', title: 'A partir de 2014 só Sportback; Sedan chegou depois com 1.4 TFSI + S-tronic', body: 'No lançamento brasileiro (2013) só havia a versão de 2/4 portas; a partir de 2014 a linha ficou concentrada no Sportback, e o A3 Sedan foi lançado no fim de 2014 já com motor 1.4 TFSI e câmbio S-tronic.' },
]

const PROBLEMAS_8V: TipInput[] = [
  { severity: 'DANGER', title: 'Mecatrônica do S-tronic: mesmo problema crônico da geração anterior, sem recall no Brasil', body: 'O A3 8V não escapou do mesmo defeito crônico de mecatrônica do S-tronic documentado na geração 8P — reclamações no Reclame Aqui incluem unidades 2015/2016 com "problema de engrenagem", trepidação e defeito recorrente mesmo após substituir a mecatrônica uma vez. Segue sem recall ou extensão de garantia formal no Brasil (diferente de outros mercados). Óleo do câmbio em dia é a principal prevenção — mas não elimina o risco, já que os relatos indicam falha "independente de manutenção adequada" em muitos casos.' },
  { severity: 'WARN', title: 'Acúmulo de carbono nas válvulas de admissão (motor TFSI de injeção direta)', body: 'Mesmo ponto de atenção das gerações anteriores com motor de injeção direta: carbono se acumula nas válvulas com o tempo, causando perda de potência gradual. Considere limpeza preventiva por volta de 80.000-100.000 km.' },
]

const MANUTENCAO_8V: TipInput[] = [
  { severity: 'OK', title: 'Cronograma A3 8V (1.4 TFSI Flex/2.0 TFSI, S-tronic)', body: '10.000 km/12 meses — Troca de óleo do motor (especificação VW/Audi 504.00/507.00) + filtro. | 60.000 km/3 anos — Óleo do câmbio S-tronic — item crítico, não pule. | A cada revisão — Teste de estrada de atenção a solavanco/trepidação em baixa velocidade. | 80.000-100.000 km — Considerar limpeza de carbono nas válvulas de admissão. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio.' },
]

// ---------- GERAÇÃO 8V FACELIFT "MHEV" (2023+) — 2.0 TFSI 204cv mild-hybrid 48V ----------

const MACETES_MHEV: TipInput[] = [
  { severity: 'OK', title: 'Sistema mild-hybrid 48V não é elétrico puro nem híbrido plug-in — não precisa carregar na tomada', body: 'A partir de 2023 o A3 passou a usar motor 2.0 TFSI de 204cv com sistema mild-hybrid 48V (identificado como "Híb." em algumas listagens). É uma assistência elétrica leve — recupera energia na frenagem e auxilia na retomada — não é um carro elétrico nem plug-in, então não existe tomada de recarga nem rotina de carregamento para se preocupar.' },
  { severity: 'OK', title: 'Mesmo câmbio S-tronic — os mesmos cuidados de mecatrônica se aplicam desde o primeiro dia', body: 'Apesar de ser a versão mais nova e mais tecnológica, o câmbio segue sendo S-tronic de dupla embreagem — a mesma família de tecnologia com histórico de problema de mecatrônica nas gerações anteriores. Não deixe de fazer a troca de óleo do câmbio no prazo mesmo em um carro "zero", e fique atento a qualquer solavanco em baixa velocidade desde os primeiros meses de uso.' },
]

const PROBLEMAS_MHEV: TipInput[] = [
  { severity: 'OK', title: 'Modelo recente — histórico de confiabilidade ainda em formação', body: 'Por ser lançamento recente (2023+), ainda não há grande volume de relatos de problema específico dessa versão. Dado o histórico da família S-tronic em gerações anteriores, o mais prudente é monitorar de perto qualquer sinal de solavanco/trepidação no câmbio desde cedo, mesmo dentro da garantia, em vez de esperar o problema se agravar.' },
]

const MANUTENCAO_MHEV: TipInput[] = [
  { severity: 'OK', title: 'Cronograma A3 facelift MHEV (2.0 TFSI 204cv, 48V, S-tronic 7 marchas)', body: '10.000 km/12 meses — Troca de óleo do motor + filtro. | 60.000 km/3 anos — Óleo do câmbio S-tronic. | A cada revisão — Teste de estrada de atenção a solavanco/trepidação em baixa velocidade. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km — Fluido de freio. | Sistema mild-hybrid 48V: sem rotina de recarga — a bateria de 48V é gerenciada automaticamente pelo carro.' },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'A3', yearFrom: 1997, yearTo: 2006, tireSize: '195/65 R15 (referência)', frontPsi: 32, rearPsi: 30, frontPsiLoad: 35, rearPsiLoad: 33, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta ou manual — varia por versão/motorização.' },
  { modelName: 'A3', yearFrom: 2006, yearTo: 2013, tireSize: '205/55 R16 (referência)', frontPsi: 32, rearPsi: 30, frontPsiLoad: 36, rearPsiLoad: 33, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta do motorista.' },
  { modelName: 'A3', yearFrom: 2013, yearTo: 2022, tireSize: '205/50 R17 (referência)', frontPsi: 32, rearPsi: 32, frontPsiLoad: 36, rearPsiLoad: 36, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — trims S-Line podem usar aro maior.' },
  { modelName: 'A3', yearFrom: 2023, yearTo: null, tireSize: '225/45 R18 (referência, Performance Black/S-Line)', frontPsi: 36, rearPsi: 36, frontPsiLoad: 39, rearPsiLoad: 39, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta do motorista.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'A3', yearFrom: 1997, yearTo: 2006, component: 'Óleo do motor + filtro', intervalKm: 7500, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'A3', yearFrom: 1997, yearTo: 2006, component: 'Kit de correia dentada completo (correia + tensores + bomba d\'água)', intervalKm: 60000, intervalMonths: 60, notes: 'Motor interferente — não postergar.', priority: 'CRITICAL', order: 1 },
  { modelName: 'A3', yearFrom: 1997, yearTo: 2006, component: 'Fluido do câmbio Tiptronic (versões automáticas)', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 2 },
  { modelName: 'A3', yearFrom: 1997, yearTo: 2006, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 3 },
  { modelName: 'A3', yearFrom: 1997, yearTo: 2006, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 4 },

  { modelName: 'A3', yearFrom: 2006, yearTo: 2013, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 5 },
  { modelName: 'A3', yearFrom: 2006, yearTo: 2013, component: 'Óleo do câmbio S-tronic', intervalKm: 60000, intervalMonths: 36, notes: 'Principal prevenção contra degradação prematura da mecatrônica — não pule.', priority: 'CRITICAL', order: 6 },
  { modelName: 'A3', yearFrom: 2006, yearTo: 2013, component: 'Teste de solavanco/trepidação do câmbio S-tronic', intervalKm: null, intervalMonths: 12, notes: 'Defeito crônico de mecatrônica amplamente documentado, sem recall no Brasil.', priority: 'CRITICAL', order: 7 },
  { modelName: 'A3', yearFrom: 2006, yearTo: 2013, component: 'Limpeza de carbono nas válvulas de admissão (motores TFSI)', intervalKm: 80000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 8 },
  { modelName: 'A3', yearFrom: 2006, yearTo: 2013, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 9 },
  { modelName: 'A3', yearFrom: 2006, yearTo: 2013, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 10 },

  { modelName: 'A3', yearFrom: 2013, yearTo: 2022, component: 'Óleo do motor (especificação VW/Audi 504.00/507.00) + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 11 },
  { modelName: 'A3', yearFrom: 2013, yearTo: 2022, component: 'Óleo do câmbio S-tronic', intervalKm: 60000, intervalMonths: 36, notes: 'Item crítico — histórico de mecatrônica problemática nessa geração também.', priority: 'CRITICAL', order: 12 },
  { modelName: 'A3', yearFrom: 2013, yearTo: 2022, component: 'Teste de solavanco/trepidação do câmbio S-tronic', intervalKm: null, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 13 },
  { modelName: 'A3', yearFrom: 2013, yearTo: 2022, component: 'Limpeza de carbono nas válvulas de admissão', intervalKm: 80000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 14 },
  { modelName: 'A3', yearFrom: 2013, yearTo: 2022, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 15 },
  { modelName: 'A3', yearFrom: 2013, yearTo: 2022, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 16 },

  { modelName: 'A3', yearFrom: 2023, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 17 },
  { modelName: 'A3', yearFrom: 2023, yearTo: null, component: 'Óleo do câmbio S-tronic', intervalKm: 60000, intervalMonths: 36, notes: null, priority: 'CRITICAL', order: 18 },
  { modelName: 'A3', yearFrom: 2023, yearTo: null, component: 'Teste de solavanco/trepidação do câmbio S-tronic', intervalKm: null, intervalMonths: 12, notes: 'Monitorar desde cedo mesmo em unidade nova, dado o histórico da família S-tronic.', priority: 'HIGH', order: 19 },
  { modelName: 'A3', yearFrom: 2023, yearTo: null, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 20 },
  { modelName: 'A3', yearFrom: 2023, yearTo: null, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 21 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'A3', yearFrom: 1997, yearTo: 2006, MACETES: MACETES_8L, PROBLEMAS: PROBLEMAS_8L, MANUTENCAO: MANUTENCAO_8L },
  { modelName: 'A3', yearFrom: 2006, yearTo: 2013, MACETES: MACETES_8P, PROBLEMAS: PROBLEMAS_8P, MANUTENCAO: MANUTENCAO_8P },
  { modelName: 'A3', yearFrom: 2013, yearTo: 2022, MACETES: MACETES_8V, PROBLEMAS: PROBLEMAS_8V, MANUTENCAO: MANUTENCAO_8V },
  { modelName: 'A3', yearFrom: 2023, yearTo: null, MACETES: MACETES_MHEV, PROBLEMAS: PROBLEMAS_MHEV, MANUTENCAO: MANUTENCAO_MHEV },
]

async function main() {
  console.log('🚗 Seed Audi A3...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Audi', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Audi', vehicleTypeId: carroType.id },
  })

  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'A3', brandId: brand.id } },
    update: {},
    create: { name: 'A3', brandId: brand.id },
  })

  // Delete once (não por bloco) — múltiplos blocos usam o mesmo modelName 'A3'
  await prisma.tip.deleteMany({ where: { modelName: 'A3' } })

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
    console.log(`  ✅ A3 (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }

  await prisma.tirePressure.deleteMany({ where: { modelName: 'A3' } })
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: A3 (${tp.yearFrom}-${tp.yearTo ?? '...'})`)
  }

  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'A3' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Audi A3 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
