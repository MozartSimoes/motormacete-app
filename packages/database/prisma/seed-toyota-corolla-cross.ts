/**
 * Seed Toyota Corolla Cross — macetes, problemas, manutenção e calibragem de pneus
 * SUV mais vendido do Brasil em 2025 (59.678 unidades, #13 geral). Produzido em
 * Sorocaba/SP desde 2021. Duas famílias de motorização sob o mesmo nome FIPE
 * "Corolla Cross": 2.0 Dynamic Force flex (XR/XRE/XRX/GR-S, câmbio CVT comum) e
 * 1.8 Hybrid flex (SE/XRV/XRX, câmbio eCVT com 2 motores elétricos MG1/MG2).
 * Como o app não separa por trim (só marca+modelo+ano), o conteúdo abaixo cobre
 * as duas famílias explicitamente dentro de cada dica onde a diferença importa.
 * Execute: pnpm --filter @motormacete/database db:seed:toyota-corolla-cross
 *
 * Fontes: toyota.com.br, icarros.com.br, carrosnaweb.com.br, reclameaqui.com.br,
 *         fóruns de proprietários (Corolla Cross Clube), omecanico.com.br
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
    title: '2.0 flex: óleo 0W-20 sintético API SP — nunca "qualquer 5W30"',
    body: 'O motor 2.0 Dynamic Force (M20A-FKS) das versões XR/XRE/XRX 2.0/GR-S usa oficialmente 0W-20 sintético API SP (Toyota Genuine Motor Oil ou equivalente Mobil 1/Castrol Edge 0W-20). Capacidade: 4,4 litros com filtro. Usar 5W30 "porque é mais grosso e protege mais" é um mito que aumenta o atrito interno e o consumo — siga a especificação exata do manual.',
  },
  {
    severity: 'OK',
    title: 'Híbrido 1.8: óleo 0W-16 (não 0W-20) — motor Atkinson mais sensível',
    body: 'As versões SE/XRV/XRX Hybrid usam o motor 2ZR-FXE 1.8 ciclo Atkinson, que especifica 0W-16 (mais fino que o 2.0 flex). Capacidade: 3,7 litros. Poucas redes trocam 0W-16 fora da concessionária — leve o óleo certo se for trocar fora da Toyota. Intervalo: 10.000 km ou 12 meses.',
  },
  {
    severity: 'OK',
    title: 'Híbrido: freio-motor regenerativo economiza pastilha — mas não elimina a troca',
    body: 'No modo B (ou puxando a alavanca em "B") o motor elétrico MG1 faz a maior parte da frenagem em desacelerações suaves, poupando as pastilhas dianteiras. Isso NÃO significa que o fluido de freio ou os discos "duram para sempre" — eles enferrujam por tempo parado sem uso mesmo sem desgastar. Pise no freio com mais força de vez em quando para "limpar" o disco de oxidação leve.',
  },
  {
    severity: 'OK',
    title: 'CVT: dirija em "S" ou puxe o câmbio manualmente em descidas longas de serra',
    body: 'A CVT "Direct-Shift" do 2.0 flex tem uma 1ª marcha física de engrenagens (diferente das CVT de correia tradicionais) e simula marchas nas demais. Em descidas longas, usar o modo Sequencial (S) ou puxar para baixo simula reduções e evita sobreaquecimento do óleo do câmbio por excesso de frenagem com o pé.',
  },
  {
    severity: 'OK',
    title: 'TPMS: reset após rodízio ou calibragem — luz de pneu que "sobra" acesa',
    body: 'O Corolla Cross tem sensores de pressão (TPMS) individuais por roda. Depois de rodiziar os pneus ou recalibrar, a luz pode continuar acesa por alguns minutos até o sistema reconhecer a nova posição/pressão — dirija por 5-10 minutos acima de 20 km/h. Se não apagar, o reset manual fica no menu do painel multimídia (Configurações > TPMS).',
  },
  {
    severity: 'OK',
    title: 'Toyota Safety Sense: sensores de radar/câmera exigem alinhamento após troca de para-brisa',
    body: 'O radar do piloto automático adaptativo (grade dianteira) e a câmera do para-brisa (Safety Sense) perdem calibração após troca de para-brisa, batida leve no para-choque, ou até alinhamento de direção mal feito. Sintoma: frenagem automática de emergência "fantasma" ou piloto automático que não segue a faixa direito. Recalibração: concessionária Toyota, obrigatória após qualquer serviço na área.',
  },
  {
    severity: 'OK',
    title: 'Peças que interchangeiam com o Corolla sedã (mesma plataforma TNGA-C)',
    body: 'O Corolla Cross usa a mesma plataforma TNGA-C do Corolla sedã e compartilha muitos componentes: filtro de óleo, velas, filtro de cabine, kit de embreagem do motor de partida, e boa parte da suspensão dianteira. Em oficinas independentes, peça peças "para Corolla 2020+" quando o balconista não tiver cadastro específico do Corolla Cross — a maioria serve.',
  },
  {
    severity: 'WARN',
    title: 'Filtro de combustível do híbrido: cuidado com etanol parado por muito tempo',
    body: 'Carros híbridos rodam boa parte do tempo com o motor a combustão desligado, então o combustível fica parado no tanque por mais tempo que um carro comum de mesma quilometragem/ano. Etanol parado por meses degrada e pode formar goma no sistema de injeção. Se o carro roda pouco, prefira gasolina ou complete o tanque com mais frequência em vez de deixá-lo baixo por semanas.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Trancos e "sensação de lentidão" da CVT em respostas rápidas de acelerador',
    body: 'É a reclamação mais recorrente entre donos do Corolla Cross 2.0: ao pisar fundo repentinamente, a CVT demora a "acompanhar" e o carro parece hesitar antes de acelerar de verdade. A Toyota já fez recalls/campanhas de reprogramação do módulo de câmbio (TCM) para suavizar isso — verifique na concessionária se seu chassi tem campanha pendente (grátis). Em parte é comportamento normal de CVT, mas trancos secos (não só lentidão) merecem diagnóstico.',
  },
  {
    severity: 'WARN',
    title: 'Ruídos de suspensão dianteira em pisos irregulares (buracos, quebra-molas)',
    body: 'Estalos/rangidos na suspensão dianteira ao passar por buracos e quebra-molas é queixa comum, geralmente ligada às buchas da bandeja ou aos batentes de amortecedor ressecando mais cedo que o esperado pelo peso do carro sobre pisos brasileiros. Não é falha estrutural, mas incomoda — leve para inspeção se o barulho for repetitivo, pois buchas gastas aceleram desgaste de pneu.',
  },
  {
    severity: 'DANGER',
    title: 'Óleo do câmbio CVT: NÃO é "vitalício" apesar do manual sugerir isso',
    body: 'O manual do Corolla Cross lista o fluido CVT como de troca "não programada" em uso normal, mas a Toyota recomenda inspecionar o nível a cada 40.000 km/24 meses e trocar a cada 80.000 km/48 meses em uso severo (trânsito parado, viagens curtas frequentes, calor extremo — ou seja, praticamente qualquer cidade grande brasileira conta como "severo"). Rodar 150.000+ km sem NUNCA trocar o fluido CVT é a causa raiz de boa parte das reclamações de tranco/superaquecimento de câmbio relatadas no Reclame Aqui.',
  },
  {
    severity: 'WARN',
    title: 'Infotainment/central multimídia: travamentos e Android Auto/CarPlay que desconecta',
    body: 'Relatos de tela multimídia travando ou desconectando o Android Auto/Apple CarPlay sem motivo aparente, especialmente em versões de 2021-2023. Atualização de firmware pela concessionária resolve a maioria dos casos — é gratuito e rápido (30-40 min). Reinicialização manual: segure os botões de volume + home por ~10 segundos.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de óleo acima do esperado em alguns motores 2.0 (bloco M20A-FKS)',
    body: 'Uma minoria de proprietários relata consumo de óleo perceptível (200-500 ml a cada 5.000 km) no motor 2.0 antes mesmo da primeira troca programada. Não é generalizado, mas se você notar a luz de óleo baixo entre revisões, monitore o nível a cada abastecimento por um tempo e documente para acionar a garantia — a Toyota já resolveu casos assim trocando anéis de pistão sob garantia.',
  },
  {
    severity: 'OK',
    title: 'Bateria híbrida (NiMH): baixíssimo histórico de falha, mas não é imune a mau uso',
    body: 'A bateria híbrida (níquel-hidreto metálico, sob o banco traseiro) é historicamente muito confiável nos híbridos Toyota — geração após geração de Prius/Corolla Hybrid sustenta isso. O que reduz a vida útil é deixar o carro parado por muitas semanas com a bateria 12V convencional descarregada (o sistema híbrido não liga sem ela) ou expor o carro a calor extremo prolongado (garagem fechada e quente). Uso normal, mesmo intenso, não é motivo de preocupação.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Corolla Cross — 2.0 flex e 1.8 Hybrid (Toyota + ajustes para uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo (0W-20 no 2.0 / 0W-16 no híbrido) + filtro de óleo. Rodízio de pneus. | 10.000 km — Inspeção visual de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor (inspeção; troca se sujo). | 20.000 km — Filtro de cabine (troca recomendada, principalmente em cidade poluída). | 40.000 km — Velas de ignição (motor 2.0: Denso iridium; troca preventiva mesmo antes do prazo Toyota de 60.000-100.000 km é mais seguro no Brasil). | 40.000 km/24 meses — Inspeção do nível de óleo da transmissão (CVT ou eCVT). | 40.000 km — Fluido de freio DOT 3 (troca a cada 2 anos independente da km). | 60.000 km — Fluido de arrefecimento (Toyota Super Long Life Coolant rosa — NUNCA misture com verde genérico). | 80.000 km/48 meses — Troca do óleo da transmissão CVT/eCVT em uso severo (trânsito de cidade grande conta como severo). | 100.000 km — Correia auxiliar (alternador/compressor A/C), coxins do motor.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Corolla Cross',
    yearFrom: 2021,
    yearTo: null,
    tireSize: '205/65 R16 (XR) · 225/50 R18 (XRE/XRV/XRX/GR-S/SE)',
    frontPsi: 32,
    rearPsi: 32,
    frontPsiLoad: 35,
    rearPsiLoad: 35,
    sparePsi: 60,
    notes: 'Versão XR (aro 16, entrada): 205/65 R16, 32/32 PSI vazio e 35/35 com carga máxima. Versões XRE/XRV/XRX/GR-S/SE (aro 18): 225/50 R18, mesma pressão de fábrica 32/32 PSI. Confirme sempre na etiqueta da coluna da porta do motorista — a pressão de fábrica não muda por causa do TPMS, mas o tamanho do pneu sim. Estepe temporário (aro 15 fininho): 60 PSI, uso limitado a 80 km/h.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Corolla Cross', yearFrom: 2021, yearTo: null, component: 'Óleo do motor 2.0 (0W-20 sintético API SP)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor M20A-FKS. Capacidade 4,4L com filtro. Não usar 5W30 "por engano".', priority: 'CRITICAL', order: 0 },
  { modelName: 'Corolla Cross', yearFrom: 2021, yearTo: null, component: 'Óleo do motor híbrido 1.8 (0W-16)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 2ZR-FXE Atkinson. Capacidade 3,7L. Viscosidade mais fina que o 2.0 — não confundir.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Corolla Cross', yearFrom: 2021, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo. Original Toyota ou Mann/Wix equivalente.', priority: 'HIGH', order: 2 },
  { modelName: 'Corolla Cross', yearFrom: 2021, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado (dianteiro-traseiro em X). Aproveite para checar desgaste irregular por alinhamento.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Corolla Cross', yearFrom: 2021, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Inspeção a cada 20.000 km; reduza para 10.000-15.000 km em cidades com muita poeira/poluição.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Corolla Cross', yearFrom: 2021, yearTo: null, component: 'Filtro de cabine (ar-condicionado)', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas. Prefira com carvão ativado em cidades grandes.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Corolla Cross', yearFrom: 2021, yearTo: null, component: 'Velas de ignição (motor 2.0, iridium)', intervalKm: 40000, intervalMonths: null, notes: 'Toyota permite até 60-100 mil km, mas trocar aos 40 mil é mais seguro com etanol brasileiro.', priority: 'MEDIUM', order: 6 },
  { modelName: 'Corolla Cross', yearFrom: 2021, yearTo: null, component: 'Nível do óleo da transmissão CVT/eCVT', intervalKm: 40000, intervalMonths: 24, notes: 'Inspeção obrigatória em uso severo (praticamente todo uso urbano brasileiro conta como severo).', priority: 'HIGH', order: 7 },
  { modelName: 'Corolla Cross', yearFrom: 2021, yearTo: null, component: 'Fluido de freio DOT 3', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km — o fluido absorve umidade mesmo parado.', priority: 'HIGH', order: 8 },
  { modelName: 'Corolla Cross', yearFrom: 2021, yearTo: null, component: 'Fluido de arrefecimento (Toyota Super Long Life rosa)', intervalKm: 60000, intervalMonths: 60, notes: 'NUNCA misturar com aditivo verde genérico — reação química corrói o sistema.', priority: 'HIGH', order: 9 },
  { modelName: 'Corolla Cross', yearFrom: 2021, yearTo: null, component: 'Troca do óleo da transmissão CVT/eCVT', intervalKm: 80000, intervalMonths: 48, notes: 'Uso severo (cidade grande). Causa raiz de boa parte das reclamações de tranco quando ignorado.', priority: 'CRITICAL', order: 10 },
  { modelName: 'Corolla Cross', yearFrom: 2021, yearTo: null, component: 'Correia auxiliar + coxins do motor', intervalKm: 100000, intervalMonths: null, notes: 'Inspecionar antes; substituir se ressecada/trincada.', priority: 'MEDIUM', order: 11 },
  { modelName: 'Corolla Cross', yearFrom: 2021, yearTo: null, component: 'Bateria 12V convencional (auxiliar, inclusive no híbrido)', intervalKm: null, intervalMonths: 36, notes: 'Sistema híbrido não liga sem ela. Verifique tensão anualmente após o 3º ano.', priority: 'HIGH', order: 12 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Corolla Cross',
    yearFrom: 2021,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Toyota Corolla Cross...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Toyota', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Toyota', vehicleTypeId: carroType.id },
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
    await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName } })
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: ${tp.modelName}`)
  }

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: BLOCKS.map((b) => b.modelName) } },
  })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Toyota Corolla Cross concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
