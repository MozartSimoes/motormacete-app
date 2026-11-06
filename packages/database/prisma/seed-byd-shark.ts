/**
 * Seed BYD Shark — macetes, problemas, manutenção e calibragem de pneus
 * Primeira picape híbrida plug-in (PHEV) vendida no Brasil, lançada em 2025.
 * Sistema híbrido DM-o (Dual Mode "off-road", da mesma família DM-i/DM-p da
 * BYD) com motor 1.5 turbo a gasolina (183cv/26,5kgfm) + dois motores
 * elétricos, um em cada eixo (dianteiro 231cv/31,6kgfm, traseiro
 * 201cv/34,7kgfm), somando 437cv e 65kgfm combinados — 0-100km/h em 5,7s.
 * Bateria Blade LFP de 29,6 kWh, autonomia elétrica pura de até 57km
 * (Inmetro), autonomia total combinada de até 840km. Tração 4x4 elétrica
 * inteligente (sem caixa de transferência mecânica), com bloqueio
 * eletrônico virtual de diferencial e modos de terreno Areia/Lama/Neve.
 * Carga útil de 790kg, caçamba de 1.200 litros, reboque de até 2.500kg.
 * Versão única no lançamento: GS. Preço de lançamento R$ 379.800, o mais
 * caro da categoria — hoje comercializada com desconto relevante após
 * vendas abaixo do esperado.
 * Execute: pnpm --filter @motormacete/database db:seed:byd-shark
 *
 * Fontes: bydviamar.com.br, byd.com/br/car/shark, car.blog.br, motorshow.com.br,
 *         tecmundo.com.br, autoo.com.br, mecanicaonline.com.br,
 *         consultadeplaca.net, reclameaqui.com.br, gurudoscarros.com.br
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
    title: 'A primeira picape híbrida plug-in do Brasil — entenda o sistema antes de comprar',
    body: 'A Shark é a primeira picape PHEV (híbrida plug-in) vendida no país, com sistema DM-o da BYD: motor 1.5 turbo a gasolina + dois motores elétricos (um em cada eixo), somando 437cv combinados. Diferente de um híbrido "leve" (tipo flex-hybrid), ela roda em modo 100% elétrico por até 57km (Inmetro) e recarrega na tomada — entenda que o comportamento e a manutenção são bem diferentes de uma picape a diesel tradicional (Hilux, Ranger, S10, Amarok).',
  },
  {
    severity: 'OK',
    title: 'Priorize o modo elétrico puro na cidade, deixe o híbrido para estrada e reboque',
    body: 'Para aproveitar a autonomia elétrica de ~57km e reduzir o desgaste do motor a combustão, use o modo EV puro em trajetos urbanos curtos e recarregue sempre que possível (tomada residencial, wallbox ou carregador rápido). Reserve o modo híbrido para viagens longas, subidas ou quando estiver rebocando/carregando a caçamba, situações em que o motor 1.5 turbo entra para apoiar os elétricos.',
  },
  {
    severity: 'OK',
    title: 'Carregamento rápido: de 30% a 80% em cerca de 20 minutos',
    body: 'A bateria Blade LFP de 29,6 kWh aceita recarga rápida DC, indo de 30% a 80% em aproximadamente 20 minutos em eletroposto compatível. Em tomada residencial comum a recarga é bem mais lenta — planeje o uso conforme o carregador disponível, e sempre que possível prefira uma instalação com wallbox dedicada em casa.',
  },
  {
    severity: 'WARN',
    title: 'Peças ainda concentradas em concessionária — mercado paralelo praticamente inexistente',
    body: 'Por ser um lançamento recente e uma tecnologia híbrida plug-in inédita no segmento de picapes no Brasil, a Shark ainda não tem mercado de peças alternativas ou paralelas relevante — praticamente tudo depende da rede BYD e do Centro de Peças da marca no Espírito Santo. A própria BYD reconhece que peças mais específicas podem precisar ser encomendadas diretamente da China, o que pode alongar o prazo de reparo. Antes de comprar, considere esse fator para uso profissional/comercial que não pode ficar parado.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Caso relatado de pane grave do sistema híbrido com apenas 400km rodados',
    body: 'Há um caso amplamente divulgado de proprietário (Campo Grande/MS) que, com apenas 400km rodados, teve o veículo parar completamente durante viagem — com trancos, alta rotação com ruído anormal, alertas no painel e forte cheiro de queimado antes da pane total. A assistência técnica levou mais de um mês para diagnosticar (primeiro apontou a transmissão, depois o motor a combustão) e o caso só foi resolvido com devolução integral do valor pago, via Código de Defesa do Consumidor — desfecho considerado excepcional no mercado. Se notar trancos, ruído anormal ou cheiro de queimado, pare o veículo com segurança e acione o BYD Assistance imediatamente.',
  },
  {
    severity: 'WARN',
    title: 'Reclamações de problemas recorrentes e demora na solução',
    body: 'Há registros no Reclame Aqui de proprietários relatando problemas recorrentes no veículo com demora na solução por parte da assistência técnica, a ponto de impactar o uso profissional do carro. Documente todas as visitas à concessionária com data, quilometragem e descrição do problema — isso fortalece qualquer acionamento posterior de garantia ou CDC.',
  },
  {
    severity: 'WARN',
    title: 'Instabilidade no aplicativo BYD e lag na câmera 360°',
    body: 'Proprietários relatam instabilidade do aplicativo BYD para funções remotas (localização, comandos à distância) e lentidão/lag na câmera 360° em manobras de baixa velocidade — relevante numa picape grande (5,45m de comprimento) usada para manobrar com reboque ou em espaços apertados. Mantenha o app e o software do veículo sempre atualizados, e não dependa exclusivamente da câmera em manobras críticas.',
  },
  {
    severity: 'WARN',
    title: 'Carga útil abaixo da média do segmento — confirme se atende seu uso',
    body: 'Com 790kg de capacidade de carga, a Shark fica abaixo da média das picapes médias a diesel (geralmente próximas de 1.000kg), efeito do peso extra da bateria e dos motores elétricos. Se o uso pretendido envolve carga pesada constante (obra, agro), calcule o peso real antes de comprar — ultrapassar a capacidade prejudica a autonomia elétrica, o comportamento da suspensão e pode configurar excesso de peso.',
  },
  {
    severity: 'OK',
    title: 'Sem recall oficial registrado até o momento — fique atento aos canais oficiais',
    body: 'Por ser lançamento recente, não há recall formal confirmado para a Shark no Brasil até o momento desta pesquisa. Como o histórico de outros modelos BYD já teve campanhas de recall, cadastre seu veículo nos canais oficiais da BYD e verifique periodicamente a situação pelo chassi no site do fabricante ou da Denatran, especialmente nos primeiros anos de um modelo tão novo.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Shark (BYD + ajuste uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor 1.5 turbo a gasolina + filtro de óleo (o óleo degrada por tempo mesmo se o carro rodar bastante em modo elétrico puro). | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor. | 20.000 km/12 meses — Filtro de cabine. | 40.000 km/24 meses — Fluido de freio DOT 4. | 60.000 km/60 meses — Fluido de arrefecimento do motor a combustão. | Anual — Inspeção do sistema de alta tensão (bateria, cabos, conectores), do circuito de arrefecimento da bateria e da porta/carregador de recarga. | A cada abastecimento/recarga — Verificar visualmente o desgaste dos pneus, especialmente após uso off-road ou com carga na caçamba.',
  },
  {
    severity: 'WARN',
    title: 'Bateria de alta tensão e sistema elétrico exigem cuidados específicos',
    body: 'Diferente de uma picape a diesel, a Shark tem um circuito de arrefecimento dedicado à bateria de alta tensão Blade LFP, além de cabos, conectores e porta de recarga que precisam de inspeção periódica por técnico habilitado — nunca tente abrir ou mexer no sistema de alta tensão por conta própria. Evite deixar o veículo com a bateria completamente descarregada por longos períodos parado, e prefira recarregar regularmente em vez de rodar sempre no limite mínimo de carga.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Shark',
    yearFrom: 2025,
    yearTo: null,
    tireSize: '265/65 R18',
    frontPsi: 33,
    rearPsi: 33,
    frontPsiLoad: 35,
    rearPsiLoad: 42,
    sparePsi: null,
    notes: 'Veículo pesado (bateria de alta tensão soma peso ao chassi) — pressão traseira sobe bastante com carga na caçamba ou reboque. Confirme sempre o valor exato na etiqueta da coluna da porta do motorista, e verifique se sua unidade tem estepe de tamanho normal ou apenas kit reparador, já que o espaço da bateria pode limitar isso.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Shark', yearFrom: 2025, yearTo: null, component: 'Óleo do motor 1.5 turbo', intervalKm: 10000, intervalMonths: 12, notes: 'Troca por tempo, mesmo com uso frequente em modo elétrico puro (menos km rodados no motor a combustão).', priority: 'CRITICAL', order: 0 },
  { modelName: 'Shark', yearFrom: 2025, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Shark', yearFrom: 2025, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza o intervalo em regiões com muita poeira ou uso off-road frequente.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Shark', yearFrom: 2025, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Shark', yearFrom: 2025, yearTo: null, component: 'Fluido de arrefecimento do motor a combustão', intervalKm: 60000, intervalMonths: 60, notes: 'Circuito próprio do motor 1.5 turbo, separado do circuito da bateria.', priority: 'HIGH', order: 4 },
  { modelName: 'Shark', yearFrom: 2025, yearTo: null, component: 'Fluido de arrefecimento da bateria de alta tensão', intervalKm: null, intervalMonths: 24, notes: 'Circuito dedicado à bateria Blade LFP — serviço exclusivo de rede autorizada BYD.', priority: 'HIGH', order: 5 },
  { modelName: 'Shark', yearFrom: 2025, yearTo: null, component: 'Sistema de alta tensão (bateria, cabos, conectores) e porta de recarga', intervalKm: null, intervalMonths: 12, notes: 'Inspeção anual por técnico habilitado — nunca mexa por conta própria no sistema de alta tensão.', priority: 'HIGH', order: 6 },
  { modelName: 'Shark', yearFrom: 2025, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 7 },
  { modelName: 'Shark', yearFrom: 2025, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado. Reforce a pressão traseira quando rodar com carga na caçamba ou reboque.', priority: 'MEDIUM', order: 8 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Shark',
    yearFrom: 2025,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed BYD Shark...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'BYD', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'BYD', vehicleTypeId: carroType.id },
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

  console.log('✅ BYD Shark concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
