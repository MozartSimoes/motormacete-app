/**
 * Seed Ford Del Rey e Belina — macetes, problemas, manutenção e calibragem
 * Clássicos brasileiros derivados da plataforma do Corcel (que por sua vez
 * veio do Renault 12 licenciado pela Willys antes da Ford comprar a Willys
 * Overland do Brasil). Del Rey: sedã/cupê 1981-1991, fabricado em São
 * Bernardo do Campo. Belina: nome usado em DUAS gerações — a perua do
 * Corcel (1970-1986) e depois a perua do próprio Del Rey, inicialmente
 * chamada "Scala" (1981-1985) e rebatizada "Belina" a partir de 1985 até
 * 1991. Ambos usam o motor CHT (Compound High Turbulence, 1.6/1.8,
 * origem Renault) com tração DIANTEIRA e motor longitudinal — configuração
 * pouco comum para um "Ford" da época, o que costuma confundir quem espera
 * mecânica tradicional traseira. A FIPE lista alguns trims combinados como
 * "Del Rey Belina GL/GLX/Ghia/L" (perua da geração Del Rey) e outros
 * separados ("Belina GL/L 1.8/1.6" para a geração mais antiga, "Del Rey
 * GLX/Ghia/L" para o sedã) — por isso este arquivo usa dois modelName
 * distintos ('Del Rey' e 'Belina') para casar corretamente com todas as
 * variações da string real da FIPE.
 * Execute: pnpm --filter @motormacete/database db:seed:ford-delrey-belina
 *
 * Fontes: pecamentor.com.br, bielaautopecas.com, pt.wikipedia.org (Ford
 *         Belina/Del Rey), instacarro.com, carroclub.com.br,
 *         motoragora.com.br, mundoautomotor.com.br, autopecasfama.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- DEL REY (sedã/cupê, 1981-1991) ----------

const MACETES_DELREY: TipInput[] = [
  {
    severity: 'OK',
    title: 'Tração dianteira com motor longitudinal — não é a mecânica "Ford típica" da época',
    body: 'Diferente da maioria dos Ford da época (RWD), o Del Rey herdou do Corcel a tração dianteira com motor montado longitudinalmente à frente do eixo dianteiro (arquitetura de origem Renault 12). Isso muda o diagnóstico de vibração/ruído: em vez de cardã e diferencial traseiro, o Del Rey tem juntas homocinéticas — um mecânico acostumado só com Ford RWD pode procurar problema no lugar errado.',
  },
  {
    severity: 'OK',
    title: 'Motor CHT usa CORRENTE de comando, não correia dentada',
    body: 'O motor CHT (1.6 ou 1.8, dependendo da versão) tem o comando de válvulas no bloco, acionado por corrente metálica lubrificada — não existe correia dentada para se preocupar com prazo de troca. A corrente e o kit de distribuição (tensor, guias) têm vida útil longa, mas não são eternos: ruído de "correntada" no motor frio é sinal de folga excessiva, vale trocar o kit preventivamente.',
  },
  {
    severity: 'OK',
    title: 'Motor CHT é compartilhado com Corcel II, Pampa, Gol/Voyage/Saveiro/Parati da era AutoLatina',
    body: 'O mesmo motor CHT 1.6/1.8 equipou o Corcel II, a Pampa e, durante a joint-venture AutoLatina (Ford+VW, 1987-1995), também o Gol, Voyage, Saveiro e Parati. Isso significa bastante peça de motor disponível no mercado paralelo — pistão, biela, junta de cabeçote, bomba d\'água e kit de corrente costumam ser fáceis de achar comparado a outros clássicos da época.',
  },
  {
    severity: 'OK',
    title: 'Confirme a versão certa antes de comprar peça de acabamento/interior',
    body: 'Entre 1981 e 1984 o Del Rey foi vendido nas versões Prata e Ouro; a partir de 1985 passou para a nomenclatura L, GL, GLX e Ghia (da mais simples à mais completa). Peça de acabamento, banco e detalhe de painel muda bastante entre essas fases — confirme o ano e a versão exata antes de fechar compra, principalmente em peça de interior.',
  },
  {
    severity: 'OK',
    title: 'Freio a disco ventilado dianteiro já vinha de fábrica — item "de luxo" pra época',
    body: 'O Del Rey já saía de fábrica com freio a disco ventilado na dianteira, um diferencial para a época. Hoje a peça de reposição (disco, pastilha) é fácil de achar por ser um sistema simples e sem os componentes eletrônicos dos freios modernos (sem ABS).',
  },
]

const PROBLEMAS_DELREY: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Ferrugem em caixas de roda, assoalho e colunas — inspecione antes de comprar',
    body: 'Como em praticamente todo clássico brasileiro dessa época, ferrugem nas caixas de roda, no assoalho e nas colunas da lataria é problema recorrente. Antes de comprar, erga o carro e inspecione embaixo com uma lanterna, batendo levemente com um martelo de borracha em pontos suspeitos — som "oco" ou massa cedendo é sinal de ferrugem avançada por baixo da pintura.',
  },
  {
    severity: 'WARN',
    title: 'Parte elétrica dá problema com a idade — alternador, chicote e luzes',
    body: 'Proprietários relatam recorrência de problema elétrico: alternador fraco/não carregando, luzes piscando ou apagando, chicote ressecado. Antes de qualquer diagnóstico mais caro, cheque os aterramentos (massa) do motor e da carroceria — em carro de décadas, corrosão nos pontos de aterramento é causa comum de "fantasma elétrico" difícil de rastrear.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio impreciso e juntas homocinéticas desgastadas',
    body: 'Com décadas de uso, o câmbio manual costuma ficar impreciso nas trocas de marcha — em boa parte dos casos o problema está nos coxins de fixação do câmbio (desgastados, deixam a alavanca "solta") e não na caixa em si. Por ser tração dianteira, também vale checar as juntas homocinéticas: ruído tipo "clique-clique" em curva fechada com aceleração é sinal de desgaste — item que um mecânico acostumado só com Ford RWD pode não pensar em checar primeiro.',
  },
  {
    severity: 'OK',
    title: 'Sem airbag, sem ABS — dirija com essa consciência em carro de época',
    body: 'O Del Rey não tem nenhum item de segurança ativa ou passiva moderna (airbag, ABS, controle de tração, zona de deformação programada). Não é defeito, é a realidade de um carro projetado nos anos 80 — vale reforçar distância de segurança e cuidado redobrado, principalmente em rodovia e com carga extra no porta-malas.',
  },
]

const MANUTENCAO_DELREY: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Del Rey (motor CHT 1.6/1.8)',
    body: '5.000-10.000 km — Troca de óleo do motor + filtro (motor antigo, prefira intervalo mais curto mesmo com óleo moderno). | A cada revisão — Verificar tensão/ruído da corrente de comando; troque o kit (corrente + tensor + guias) se notar ruído metálico a frio. | Anual — Regulagem e limpeza do carburador (afeta direto a marcha lenta e o consumo). | Anual — Verificar ponto de ignição: se ainda tiver platinado (contato mecânico), regule a folga; se já convertido para ignição eletrônica, confirme o módulo. | 10.000 km — Inspeção de freios (disco dianteiro ventilado, tambor traseiro na maioria das versões). | Verificar aterramentos elétricos (massa do motor e da carroceria) na primeira suspeita de "fantasma elétrico". | Inspecionar juntas homocinéticas (coifas rasgadas deixam entrar sujeira e destroem a junta rapidamente).',
  },
]

// ---------- BELINA (perua — geração Corcel 1970-1986 e geração Del Rey/Scala 1981-1991) ----------

const MACETES_BELINA: TipInput[] = [
  {
    severity: 'OK',
    title: '"Belina" foi usado em duas gerações diferentes — confirme o ano antes de comprar peça',
    body: 'A Belina original (1970-1986) é a perua do Corcel. Já a perua da geração Del Rey nasceu em 1981 chamada "Scala" e só passou a se chamar "Belina" a partir de 1985 (às vezes citada como "Belina II"). Lataria, suspensão traseira e detalhes de acabamento NÃO são necessariamente intercambiáveis entre as duas gerações — confirme sempre o ano e a plataforma (Corcel ou Del Rey) antes de fechar compra de peça de lataria ou suspensão.',
  },
  {
    severity: 'OK',
    title: 'Mecânica idêntica ao sedã equivalente da mesma geração',
    body: 'Motor CHT, câmbio, freios e suspensão dianteira da Belina são os mesmos do sedã da mesma geração (Corcel para unidades até 1986, Del Rey para unidades 1981-1991) — todas as dicas de motor e câmbio do Del Rey valem igualmente para a Belina da geração Del Rey/Scala. Se não achar a peça catalogada como "Belina", procure também por "Corcel" ou "Del Rey" do mesmo ano.',
  },
  {
    severity: 'WARN',
    title: 'Não sobrecarregue o porta-malas — suspensão traseira original tem limite',
    body: 'O espaço de carga generoso é o grande diferencial da Belina, mas a suspensão traseira original (molas) não foi projetada para carga excessiva constante. Sobrecarregar com frequência acelera o desgaste dos amortecedores e pode deixar a traseira "caída" — se usa a perua para carga pesada regularmente, considere reforço de mola (feixe auxiliar) apropriado para o modelo.',
  },
]

const PROBLEMAS_BELINA: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Ferrugem ainda mais crítica que no sedã — porta-malas e para-lamas traseiros',
    body: 'Por acumular mais umidade na área de carga, a Belina sofre com ferrugem de forma ainda mais recorrente que o sedã equivalente: região do porta-malas, vigia traseiro e para-lamas traseiros são os pontos mais críticos. Inspecione com atenção redobrada nessas áreas antes de comprar — ferrugem estrutural no piso de carga é bem mais cara de recuperar que em lataria comum.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedores traseiros "moles" com a idade — balanço acentuado em curva',
    body: 'É comum encontrar unidades com amortecedor traseiro já sem função amortecedora nenhuma, só segurando a suspensão — sintoma é balanço/oscilação acentuada em curva ou ao passar por buraco, principalmente com carga no porta-malas. Como a peça é relativamente acessível, não vale a pena rodar com amortecedor gasto só porque "sempre foi assim".',
  },
  {
    severity: 'WARN',
    title: 'Vedação de vidro traseiro e portas — infiltração é queixa comum em unidades de época',
    body: 'Borrachas de vedação ressecadas pelo tempo (vidro traseiro/vigia, portas) permitem infiltração de água, o que agrava ainda mais o problema de ferrugem interna. Se notar cheiro de mofo ou carpete úmido, o primeiro lugar para checar é a vedação, não necessariamente furo na lataria.',
  },
]

const MANUTENCAO_BELINA: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Belina (motor CHT 1.6/1.8, mesma base do sedã)',
    body: '5.000-10.000 km — Troca de óleo do motor + filtro. | A cada revisão — Verificar tensão/ruído da corrente de comando. | Anual — Regulagem e limpeza do carburador. | Anual — Verificar ponto de ignição (platinado ou módulo eletrônico, conforme a conversão). | 10.000 km — Inspeção de freios e da suspensão traseira (mais exigida que no sedã pelo uso como carga). | Anual — Checar vedação de portas e vidro traseiro/vigia — prevenção direta contra ferrugem interna. | Evitar sobrecarga constante do porta-malas para não acelerar o desgaste dos amortecedores traseiros.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Del Rey', yearFrom: 1981, yearTo: 1991, tireSize: '165/70 R13 (referência)', frontPsi: 26, rearPsi: 26, frontPsiLoad: 28, rearPsiLoad: 30, sparePsi: 60, notes: 'Carro de época — confirme o valor original na etiqueta da coluna da porta ou no manual do proprietário, se ainda existir. Pneus modernos equivalentes podem pedir calibragem levemente diferente.' },
  { modelName: 'Belina', yearFrom: 1970, yearTo: 1991, tireSize: '165/70 R13 · 175/70 R13 (referência)', frontPsi: 26, rearPsi: 28, frontPsiLoad: 28, rearPsiLoad: 32, sparePsi: 60, notes: 'Traseiro com pressão levemente maior por conta do uso como carga. Confirme o valor original na etiqueta da coluna da porta ou manual, se disponível.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Del Rey', yearFrom: 1981, yearTo: 1991, component: 'Óleo do motor + filtro', intervalKm: 7500, intervalMonths: 12, notes: 'Motor antigo — prefira intervalo mais curto mesmo com óleo moderno.', priority: 'CRITICAL', order: 0 },
  { modelName: 'Del Rey', yearFrom: 1981, yearTo: 1991, component: 'Corrente de comando — inspeção de ruído/folga', intervalKm: null, intervalMonths: 12, notes: 'Sem correia dentada nesse motor — mas o kit de corrente não é eterno.', priority: 'HIGH', order: 1 },
  { modelName: 'Del Rey', yearFrom: 1981, yearTo: 1991, component: 'Regulagem e limpeza do carburador', intervalKm: null, intervalMonths: 12, notes: 'Afeta direto marcha lenta e consumo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Del Rey', yearFrom: 1981, yearTo: 1991, component: 'Ponto de ignição (platinado ou módulo eletrônico)', intervalKm: null, intervalMonths: 12, notes: 'Confirme se sua unidade ainda tem platinado (contato mecânico) ou já foi convertida.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Del Rey', yearFrom: 1981, yearTo: 1991, component: 'Inspeção de freios (disco dianteiro/tambor traseiro)', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'Del Rey', yearFrom: 1981, yearTo: 1991, component: 'Juntas homocinéticas — inspeção das coifas', intervalKm: 10000, intervalMonths: null, notes: 'Coifa rasgada deixa entrar sujeira e destrói a junta rapidamente.', priority: 'HIGH', order: 5 },
  { modelName: 'Del Rey', yearFrom: 1981, yearTo: 1991, component: 'Aterramentos elétricos (massa do motor e carroceria)', intervalKm: null, intervalMonths: 12, notes: 'Primeira causa a checar em caso de "fantasma elétrico".', priority: 'MEDIUM', order: 6 },

  { modelName: 'Belina', yearFrom: 1970, yearTo: 1991, component: 'Óleo do motor + filtro', intervalKm: 7500, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 7 },
  { modelName: 'Belina', yearFrom: 1970, yearTo: 1991, component: 'Corrente de comando — inspeção de ruído/folga', intervalKm: null, intervalMonths: 12, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'Belina', yearFrom: 1970, yearTo: 1991, component: 'Regulagem e limpeza do carburador', intervalKm: null, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 9 },
  { modelName: 'Belina', yearFrom: 1970, yearTo: 1991, component: 'Suspensão e amortecedores traseiros', intervalKm: 10000, intervalMonths: 12, notes: 'Mais exigida que no sedã pelo uso como carga — evite sobrecarga constante.', priority: 'HIGH', order: 10 },
  { modelName: 'Belina', yearFrom: 1970, yearTo: 1991, component: 'Vedação de portas e vidro traseiro/vigia', intervalKm: null, intervalMonths: 12, notes: 'Prevenção direta contra ferrugem interna por infiltração.', priority: 'MEDIUM', order: 11 },
  { modelName: 'Belina', yearFrom: 1970, yearTo: 1991, component: 'Inspeção de freios', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 12 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Del Rey', yearFrom: 1981, yearTo: 1991, MACETES: MACETES_DELREY, PROBLEMAS: PROBLEMAS_DELREY, MANUTENCAO: MANUTENCAO_DELREY },
  { modelName: 'Belina', yearFrom: 1970, yearTo: 1991, MACETES: MACETES_BELINA, PROBLEMAS: PROBLEMAS_BELINA, MANUTENCAO: MANUTENCAO_BELINA },
]

async function main() {
  console.log('🚗 Seed Ford Del Rey e Belina...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Ford', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Ford', vehicleTypeId: carroType.id },
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
        yearFrom: block.yearFrom,
        yearTo: block.yearTo,
        order: idx,
      })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }

  await prisma.tirePressure.deleteMany({ where: { modelName: { in: BLOCKS.map((b) => b.modelName) } } })
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: ${tp.modelName}`)
  }

  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: BLOCKS.map((b) => b.modelName) } } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Ford Del Rey e Belina concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
