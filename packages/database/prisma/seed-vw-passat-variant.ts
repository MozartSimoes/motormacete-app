/**
 * Seed VW Passat Variant — macetes, problemas, manutenção e calibragem
 * Perua (station wagon) do Passat, importada para o Brasil de 1996 a 2015
 * em três gerações mecanicamente bem diferentes: B4/B5 (1996-2005, motores
 * 1.8/1.8 Turbo/2.0/2.8 V6/VR6, câmbio manual ou Tiptronic 4 marchas,
 * correia dentada), B6 (2006-2010, motores FSI/TSI de injeção direta,
 * DSG de 6 marchas a partir de 2007, topo 3.2 V6 FSI 250cv com tração
 * integral 4Motion) e B7 (2011-2015, só 2.0 TSI 220cv, trim R-Line,
 * V6/4Motion descontinuados). A geração B8 (2016-2020) NÃO teve versão
 * Variant no Brasil — só sedã — por isso fica fora deste arquivo.
 * Execute: pnpm --filter @motormacete/database db:seed:vw-passat-variant
 *
 * Fontes: autoetecnica.com.br, autolivraria.com.br, litoralcar.com.br,
 *         auto-doc.pt, canaldapeca.com.br, automatik.com.br,
 *         procon.sp.gov.br, nhtsa.gov (Takata/clock spring), opinautos.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- GERAÇÃO B4/B5 (1996-2005) — 1.8 / 1.8 Turbo / 2.0 / 2.8 V6 / VR6 2.8 ----------

const MACETES_B5: TipInput[] = [
  {
    severity: 'OK',
    title: 'Confirme o motor exato antes de orçar qualquer peça — são famílias bem diferentes',
    body: 'Nessa geração a Variant veio com 1.8 20V aspirado, 1.8 20V Turbo (150cv), 2.0 aspirado e 2.8 V6 (193cv, mecânica e Tiptronic) ou VR6 2.8 de alto desempenho. Injeção, ignição, correia e até o layout do motor mudam bastante entre eles — sempre confirme o código gravado no bloco antes de fechar peça, principalmente de motor e injeção.',
  },
  {
    severity: 'WARN',
    title: 'Motor 1.8 Turbo é interferente — correia dentada não é item pra economizar',
    body: 'O 1.8 20V Turbo tem motor interferente: se a correia dentada arrebentar ou pular dente, válvula bate no pistão e o estrago é grande (retífica completa). Nunca ultrapasse o intervalo recomendado achando que "ainda está boa" — troque o kit completo (correia + tensores + bomba d\'água) preventivamente, é muito mais barato que o motor batido.',
  },
  {
    severity: 'OK',
    title: 'VR6 2.8 é raro no Brasil — procure peça em importadoras especializadas em VW/Audi V6',
    body: 'A versão VR6 2.8 (motor V6 de bloco compacto, ângulo de 15° entre cilindros) foi vendida em pouca quantidade no Brasil. Peça de motor específica desse V6 costuma ser mais difícil de achar em autopeças comuns — vale procurar em importadoras especializadas em peças VW/Audi de alto desempenho, incluindo grupos e fóruns de proprietários de VR6.',
  },
  {
    severity: 'OK',
    title: 'Perua e sedã da mesma geração compartilham a maior parte da suspensão e freio',
    body: 'A carroceria muda, mas boa parte da suspensão dianteira, sistema de freios e componentes de motor da Variant é igual ao Passat sedã B4/B5 do mesmo ano/motor — se a loja não tiver a peça catalogada como "Variant", pesquise também por "Passat" simples do mesmo ano e motorização, costuma servir.',
  },
]

const PROBLEMAS_B5: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Regulador elétrico de vidro falha e o vidro "cai" dentro da porta',
    body: 'Problema clássico dessa geração de VW: o mecanismo do regulador elétrico de vidro desgasta e o vidro pode cair repentinamente dentro da porta, ou o motor do vidro fica fraco/travando. Se notar o vidro subindo devagar ou com ruído, troque o regulador antes que ele quebre de vez — é mais barato que resgatar o vidro preso torto dentro da porta.',
  },
  {
    severity: 'WARN',
    title: 'Bomba/módulo de trava central com falha comum',
    body: 'O módulo que aciona a trava central via controle costuma falhar com o tempo — sintoma típico é uma ou mais portas não travando/destravando junto com as outras pelo controle, exigindo travar manualmente. Não é item de segurança crítico, mas incomoda no dia a dia e o módulo tem preço acessível no mercado paralelo.',
  },
  {
    severity: 'WARN',
    title: 'Compressor do ar-condicionado perde eficiência com o tempo',
    body: 'Em unidades mais antigas dessa geração é comum o ar-condicionado perder força de refrigeração por desgaste do compressor ou vazamento lento de gás nas mangueiras/juntas. Antes de trocar o compressor inteiro, peça para o mecânico testar a estanqueidade do sistema — muitas vezes é só vazamento de junta, bem mais barato de resolver.',
  },
]

const MANUTENCAO_B5: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Passat Variant B4/B5 (1.8/1.8 Turbo/2.0/2.8 V6/VR6)',
    body: '10.000 km/12 meses — Troca de óleo do motor + filtro. | 10.000 km — Inspeção de freios e verificação do regulador de vidro/trava central (falhas comuns dessa geração). | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km/24 meses — Fluido de freio. | 60.000 km/5 anos — Kit de correia dentada COMPLETO (correia + tensores + bomba d\'água) nos motores 1.8/1.8 Turbo — motor interferente, não pule esse item. | 60.000 km — Fluido do câmbio automático Tiptronic (versões automáticas). | Verificar estanqueidade do ar-condicionado antes de trocar o compressor completo.',
  },
]

// ---------- GERAÇÃO B6 (2006-2010) — 2.0 FSI 150cv / Turbo 2.0 FSI-TSI 200cv / 3.2 V6 FSI 250cv 4Motion ----------

const MACETES_B6: TipInput[] = [
  {
    severity: 'OK',
    title: 'DSG DQ250 (banho de óleo) é mais robusto que o DSG seco de modelos menores da VW',
    body: 'O câmbio DSG de 6 marchas usado no 2.0 TSI e no 3.2 V6 dessa geração é o DQ250, de embreagem dupla banhada a óleo — historicamente mais confiável que o DSG seco (DQ200) usado em carros menores como Golf/Fox 1.4/1.6 TSI. Ainda assim, não é vitalício: troque o óleo do câmbio a cada 60.000 km/3 anos para não encurtar a vida da embreagem.',
  },
  {
    severity: 'WARN',
    title: 'Motor FSI/TSI (injeção direta) acumula carbono nas válvulas de admissão',
    body: 'Por ser injeção direta, o combustível não passa mais pelas válvulas de admissão para "lavá-las" como nos motores de injeção indireta — com o tempo (tipicamente 80.000-100.000 km), forma-se depósito de carbono nas válvulas, causando perda de potência gradual e marcha lenta irregular. A limpeza por hidrojateamento (ou remoção física do cabeçote em casos avançados) resolve; alguns proprietários fazem limpeza preventiva por volta dos 60.000-80.000 km.',
  },
  {
    severity: 'OK',
    title: 'Confirme se sua unidade é 4Motion (3.2 V6) antes de orçar peça de transmissão',
    body: 'A versão de topo 3.2 V6 FSI 250cv veio com tração integral 4Motion — mecânica de transmissão bem mais complexa e cara de manter (diferencial traseiro, junta homocinética adicional) que as versões 2.0 FSI/TSI de tração dianteira. Confirme na ficha técnica ou olhando embaixo do carro (eixo cardã) antes de orçar qualquer peça de transmissão.',
  },
]

const PROBLEMAS_B6: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall: espiral de contato do airbag do motorista pode se romper (unidades 2010-2014)',
    body: 'A Volkswagen convocou recall para Passat e Passat Variant (além de Jetta, Jetta Variant, Tiguan, Passat CC, CC e Eos) fabricados entre 2010 e 2014 por risco de rompimento do cabo plano da espiral de contato do airbag frontal do motorista — impurezas como fios de cabelo ou fiapos de tecido podem contaminar e romper o cabo, cortando a alimentação elétrica do airbag do motorista, que deixa de funcionar em caso de colisão. Se sua unidade está nessa faixa de fabricação, ligue para a Volkswagen (0800 771 0800) ou confira o chassi em vwapps.volkswagen.com.br/Recall — é reparo gratuito.',
  },
  {
    severity: 'WARN',
    title: 'Bomba d\'água com falha frequente entre 80.000 e 120.000 km',
    body: 'É comum a bomba d\'água apresentar desgaste e começar a vazar líquido de arrefecimento nessa faixa de quilometragem, podendo levar a superaquecimento se não for notado a tempo. Fique atento a queda no nível do reservatório de arrefecimento entre trocas e a manchas de fluido embaixo do carro — não espere a luz de temperatura acender para trocar.',
  },
  {
    severity: 'WARN',
    title: 'DSG trepidando ou "engasgando" em baixa velocidade — não ignore o sintoma inicial',
    body: 'Solavanco ou trepidação ao arrancar/andar devagar (rolando em trânsito parado, por exemplo) costuma ser o primeiro sinal de desgaste da embreagem dupla do DSG. Diagnosticar e trocar óleo/adaptar cedo é bem mais barato que deixar avançar até precisar trocar o conjunto de embreagens do câmbio inteiro.',
  },
]

const MANUTENCAO_B6: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Passat Variant B6 (2.0 FSI/TSI e 3.2 V6 FSI 4Motion)',
    body: '10.000 km/12 meses — Troca de óleo do motor (especificação VW 504.00/507.00) + filtro. | 10.000 km — Verificar nível do reservatório de arrefecimento (bomba d\'água é ponto de atenção dessa geração). | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km/24 meses — Fluido de freio. | 60.000 km/3 anos — Óleo do câmbio DSG DQ250 (versões automáticas) — não é vitalício. | 60.000-80.000 km — Considerar limpeza preventiva de carbono nas válvulas de admissão (motor FSI/TSI de injeção direta). | 80.000-120.000 km — Atenção redobrada à bomba d\'água (falha frequente nessa faixa). | Verificar na concessionária se o recall da espiral de contato do airbag (unidades 2010-2014) já foi feito.',
  },
]

// ---------- GERAÇÃO B7 (2011-2015) — só 2.0 TSI 220cv, DSG, trim R-Line ----------

const MACETES_B7: TipInput[] = [
  {
    severity: 'OK',
    title: 'B7 simplificou a linha: só existe 2.0 TSI — V6 e 4Motion saíram de linha',
    body: 'Nessa geração a Volkswagen descontinuou o V6 3.2 e a tração integral 4Motion — a Variant B7 vem exclusivamente com o motor 2.0 TSI (220cv), câmbio DSG. Isso simplifica bastante a busca por peça (só uma família de motor/câmbio para toda a linha), mas os cuidados de manutenção (DSG, carbono na admissão) são os mesmos herdados do B6, pois o motor é evolução do mesmo bloco EA888.',
  },
  {
    severity: 'OK',
    title: 'R-Line é pacote visual/esportivo, não é motor diferente',
    body: 'O trim "R-Line" (para-choque, rodas, acabamento interno esportivo) não muda a mecânica — é o mesmo motor 2.0 TSI e câmbio DSG das versões Comfortline/Highline dessa geração. Não pague a mais em peça achando que R-Line precisa de componente exclusivo de motor/câmbio.',
  },
]

const PROBLEMAS_B7: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall da espiral de contato do airbag ainda cobre unidades B7 até 2014',
    body: 'A mesma campanha de recall do rompimento da espiral de contato do airbag do motorista (ver detalhes no bloco da geração B6) cobre unidades fabricadas até 2014 — ou seja, as primeiras Passat Variant B7 (2011-2014) também podem estar na faixa afetada. Confirme o chassi em vwapps.volkswagen.com.br/Recall mesmo que seu carro já seja "geração nova".',
  },
  {
    severity: 'WARN',
    title: 'Mesmos pontos de atenção do motor 2.0 TSI/DSG da geração anterior persistem',
    body: 'Por herdar a base do motor EA888 e o câmbio DSG da geração B6, o B7 mantém os mesmos pontos de atenção: possível acúmulo de carbono nas válvulas de admissão (injeção direta) e necessidade de troca periódica do óleo do DSG — não foram problemas "resolvidos" de uma geração para a outra, apenas herdados.',
  },
]

const MANUTENCAO_B7: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Passat Variant B7 (2.0 TSI 220cv, DSG)',
    body: '10.000 km/12 meses — Troca de óleo do motor (especificação VW 504.00/507.00) + filtro. | 10.000 km — Inspeção de freios e nível do reservatório de arrefecimento. | 20.000 km — Filtro de ar e filtro de cabine. | 40.000 km/24 meses — Fluido de freio. | 60.000 km/3 anos — Óleo do câmbio DSG. | 60.000-80.000 km — Considerar limpeza preventiva de carbono nas válvulas de admissão. | Verificar na concessionária se o recall da espiral de contato do airbag (unidades até 2014) já foi feito.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Passat Variant', yearFrom: 1996, yearTo: 2005, tireSize: '195/65 R15 (referência, 1.8/2.0) · 205/55 R16 (V6/VR6)', frontPsi: 32, rearPsi: 30, frontPsiLoad: 35, rearPsiLoad: 38, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta ou tampa do tanque — varia por motorização.' },
  { modelName: 'Passat Variant', yearFrom: 2006, yearTo: 2010, tireSize: '215/55 R16 (2.0 FSI/TSI) · 235/45 R17 (3.2 V6 4Motion)', frontPsi: 32, rearPsi: 29, frontPsiLoad: 38, rearPsiLoad: 36, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta do motorista.' },
  { modelName: 'Passat Variant', yearFrom: 2011, yearTo: 2015, tireSize: '215/55 R17 (referência, 2.0 TSI/R-Line)', frontPsi: 32, rearPsi: 29, frontPsiLoad: 38, rearPsiLoad: 36, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta do motorista — pode variar conforme aro escolhido.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Passat Variant', yearFrom: 1996, yearTo: 2005, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Confirme especificação exata conforme motor (1.8/1.8 Turbo/2.0/2.8 V6/VR6).', priority: 'CRITICAL', order: 0 },
  { modelName: 'Passat Variant', yearFrom: 1996, yearTo: 2005, component: 'Kit de correia dentada completo (correia + tensores + bomba d\'água)', intervalKm: 60000, intervalMonths: 60, notes: 'Motor 1.8/1.8 Turbo é interferente — não postergar.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Passat Variant', yearFrom: 1996, yearTo: 2005, component: 'Fluido do câmbio automático Tiptronic', intervalKm: 60000, intervalMonths: 48, notes: 'Versões automáticas.', priority: 'HIGH', order: 2 },
  { modelName: 'Passat Variant', yearFrom: 1996, yearTo: 2005, component: 'Regulador elétrico de vidro e módulo de trava central — inspeção', intervalKm: null, intervalMonths: 12, notes: 'Falhas comuns dessa geração.', priority: 'LOW', order: 3 },
  { modelName: 'Passat Variant', yearFrom: 1996, yearTo: 2005, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 4 },
  { modelName: 'Passat Variant', yearFrom: 1996, yearTo: 2005, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 5 },

  { modelName: 'Passat Variant', yearFrom: 2006, yearTo: 2010, component: 'Óleo do motor (especificação VW 504.00/507.00) + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 6 },
  { modelName: 'Passat Variant', yearFrom: 2006, yearTo: 2010, component: 'Verificação do recall da espiral de contato do airbag (unidades 2010-2014)', intervalKm: null, intervalMonths: null, notes: 'Risco de airbag do motorista não funcionar — confirmar em vwapps.volkswagen.com.br/Recall.', priority: 'CRITICAL', order: 7 },
  { modelName: 'Passat Variant', yearFrom: 2006, yearTo: 2010, component: 'Óleo do câmbio DSG DQ250 (versões automáticas)', intervalKm: 60000, intervalMonths: 36, notes: 'Não é vitalício apesar do que dizem por aí.', priority: 'HIGH', order: 8 },
  { modelName: 'Passat Variant', yearFrom: 2006, yearTo: 2010, component: 'Bomba d\'água — inspeção', intervalKm: 80000, intervalMonths: null, notes: 'Falha frequente entre 80.000-120.000 km — atenção a queda no reservatório de arrefecimento.', priority: 'HIGH', order: 9 },
  { modelName: 'Passat Variant', yearFrom: 2006, yearTo: 2010, component: 'Limpeza de carbono nas válvulas de admissão (motor FSI/TSI)', intervalKm: 80000, intervalMonths: null, notes: 'Injeção direta acumula depósito — sintoma é perda de potência gradual.', priority: 'MEDIUM', order: 10 },
  { modelName: 'Passat Variant', yearFrom: 2006, yearTo: 2010, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 11 },
  { modelName: 'Passat Variant', yearFrom: 2006, yearTo: 2010, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 12 },

  { modelName: 'Passat Variant', yearFrom: 2011, yearTo: 2015, component: 'Óleo do motor (especificação VW 504.00/507.00) + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 13 },
  { modelName: 'Passat Variant', yearFrom: 2011, yearTo: 2015, component: 'Verificação do recall da espiral de contato do airbag (unidades até 2014)', intervalKm: null, intervalMonths: null, notes: 'Confirmar em vwapps.volkswagen.com.br/Recall mesmo em unidade "geração nova".', priority: 'CRITICAL', order: 14 },
  { modelName: 'Passat Variant', yearFrom: 2011, yearTo: 2015, component: 'Óleo do câmbio DSG', intervalKm: 60000, intervalMonths: 36, notes: null, priority: 'HIGH', order: 15 },
  { modelName: 'Passat Variant', yearFrom: 2011, yearTo: 2015, component: 'Limpeza de carbono nas válvulas de admissão', intervalKm: 80000, intervalMonths: null, notes: 'Motor EA888 de injeção direta, herda o mesmo ponto de atenção do B6.', priority: 'MEDIUM', order: 16 },
  { modelName: 'Passat Variant', yearFrom: 2011, yearTo: 2015, component: 'Filtro de ar e filtro de cabine', intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 17 },
  { modelName: 'Passat Variant', yearFrom: 2011, yearTo: 2015, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 18 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Passat Variant', yearFrom: 1996, yearTo: 2005, MACETES: MACETES_B5, PROBLEMAS: PROBLEMAS_B5, MANUTENCAO: MANUTENCAO_B5 },
  { modelName: 'Passat Variant', yearFrom: 2006, yearTo: 2010, MACETES: MACETES_B6, PROBLEMAS: PROBLEMAS_B6, MANUTENCAO: MANUTENCAO_B6 },
  { modelName: 'Passat Variant', yearFrom: 2011, yearTo: 2015, MACETES: MACETES_B7, PROBLEMAS: PROBLEMAS_B7, MANUTENCAO: MANUTENCAO_B7 },
]

async function main() {
  console.log('🚗 Seed VW Passat Variant...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volkswagen', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volkswagen', vehicleTypeId: carroType.id },
  })

  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Passat Variant', brandId: brand.id } },
    update: {},
    create: { name: 'Passat Variant', brandId: brand.id },
  })

  // Delete once (não por bloco) — múltiplos blocos usam o mesmo modelName 'Passat Variant'
  await prisma.tip.deleteMany({ where: { modelName: 'Passat Variant' } })

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
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo}): ${allTips.length} tips`)
  }

  await prisma.tirePressure.deleteMany({ where: { modelName: 'Passat Variant' } })
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo})`)
  }

  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Passat Variant' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ VW Passat Variant concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
