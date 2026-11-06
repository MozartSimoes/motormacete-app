/**
 * Seed BYD Dolphin SE — macetes, problemas, manutenção e calibragem de pneus
 * Hatch 100% elétrico, versão "Special Edition" lançada em 2026 como degrau
 * intermediário entre o Dolphin GS e o Dolphin Plus (NÃO é a versão de
 * entrada — essa é o Dolphin Mini). Motor de 177 cv/29,6 kgfm (0-100 km/h em
 * 8,1s), bateria LFP de 45,1 kWh, autonomia homologada de 272 km, carregador
 * rápido de 80 kW. Traz suspensão traseira multilink independente (corrige a
 * suspensão "mole" do GS), interior todo preto, ADAS nível 2, carregador por
 * indução e climatizador dual-zone — itens ausentes no GS. Preço sugerido
 * R$ 159.990. Este arquivo cobre só as diferenças específicas do SE frente
 * ao Dolphin/Dolphin GS básico (já coberto em seed-byd-dolphin.ts).
 * Execute: pnpm --filter @motormacete/database db:seed:byd-dolphin-se
 *
 * Fontes: byd.com/br (ficha técnica oficial), carnow.com.br, vrum.com.br,
 *         eletricos.app, dolphinbyd.com.br (fórum de proprietários),
 *         reclameaqui.com.br, fullpneus.com.br, cidademarketing.com.br,
 *         cnnbrasil.com.br
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
    title: 'SE não é o Dolphin "de entrada" — é o intermediário mais completo',
    body: 'Apesar do nome sugerir versão básica, o Dolphin SE fica posicionado ENTRE o GS e o Plus: motor de 177 cv (contra 95 cv do GS), suspensão traseira multilink independente, ADAS nível 2, carregador por indução, ar-condicionado dual-zone e carregamento rápido de 80 kW (contra 65 kW do GS). Se está pesquisando "versão mais barata" do Dolphin, ela é o Dolphin Mini — não o SE.',
  },
  {
    severity: 'OK',
    title: 'Carregamento rápido de 80 kW — planeje viagens com eletropostos compatíveis',
    body: 'O SE aceita até 80 kW em corrente contínua (CC), acima dos 65 kW do GS. Para aproveitar essa velocidade em viagens, prefira eletropostos de 60 kW ou mais na rota — em carregadores de menor potência (ex: 22 kW AC) o tempo de recarga será proporcional à potência do posto, não à capacidade máxima do carro.',
  },
  {
    severity: 'OK',
    title: 'Autonomia real gira em torno de 200-230 km no dia a dia urbano',
    body: 'A autonomia homologada é de 272 km (ciclo PBEV), mas como em todo elétrico o valor real varia com uso de ar-condicionado, velocidade e estilo de condução. Para o uso diário na cidade, planeje recargas considerando uma faixa mais conservadora de 200-230 km, especialmente em dias muito quentes com o dual-zone ligado.',
  },
  {
    severity: 'WARN',
    title: 'Pneus 205/50 R17 sem TPMS com leitura numérica — calibre com frequência',
    body: 'O Dolphin (incluindo o SE) não exibe a pressão exata de cada pneu no painel — o sistema só alerta quando a pressão está criticamente baixa. Isso significa que um pneu murchando aos poucos pode passar despercebido por semanas. Calibre com manômetro próprio pelo menos uma vez por mês e sempre antes de viagens longas.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'ADAS nível 2: reconfiguração a cada partida e leitura incorreta de placas de velocidade',
    body: 'Proprietários da linha Dolphin relatam que o pacote ADAS (presente no SE) não mantém as configurações salvas — todos os alertas voltam ativados a cada vez que o carro liga, exigindo reconfiguração manual. Há também relatos de leitura incorreta do limite de velocidade da via ao mudar de rua/avenida, gerando bipes de alerta até o sistema captar a nova placa. Nenhum defeito de segurança, mas gera incômodo — vale já sair da concessionária sabendo como desativar rapidamente os alertas sonoros pelo menu.',
  },
  {
    severity: 'WARN',
    title: 'Piloto automático (cruise control) oscila em subidas e descidas',
    body: 'Relatos de donos da linha Dolphin (GS e SE compartilham o mesmo sistema base) indicam que o piloto automático perde cerca de 4 km/h em subidas e ganha cerca de 4 km/h em descidas em relação à velocidade ajustada, em vez de manter fixo. Não é um defeito que impede o uso, mas é bom saber que a resposta não é tão precisa quanto em alguns concorrentes.',
  },
  {
    severity: 'WARN',
    title: 'Disponibilidade de peças pode ser mais lenta por ser lançamento recente',
    body: 'O Dolphin SE chegou ao mercado brasileiro em 2026, então peças específicas da versão (para-choques redesenhado, óptica traseira com logo iluminado, bancos e revestimento exclusivos) ainda tendem a estar disponíveis só na rede BYD, sem alternativa no mercado paralelo de autopeças. A BYD reforça ter centro de distribuição em Cariacica (ES), mas mesmo assim há histórico de reclamações no Reclame Aqui sobre demora em peças de colisão/funilaria para outros modelos da marca — consulte o prazo estimado de peça na concessionária antes de fechar negócio em caso de sinistro.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Dolphin SE (itens específicos da versão)',
    body: 'Anual ou 20.000 km — Verificação do sistema de carregamento por indução (base do console) e do carregador rápido CC de 80 kW. | Anual — Inspeção da suspensão traseira multilink (peça exclusiva do SE/Plus, diferente do GS) — folgas e ruídos. | A cada atualização de software disponível — Reforçar na concessionária se as configurações do ADAS voltaram a salvar entre partidas, já que houve correções de firmware ao longo do tempo. | Mensal — Calibragem dos pneus 205/50 R17, já que o painel não mostra pressão numérica.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Dolphin SE',
    yearFrom: 2026,
    yearTo: null,
    tireSize: '205/50 R17',
    frontPsi: 36,
    rearPsi: 36,
    frontPsiLoad: 38,
    rearPsiLoad: 38,
    sparePsi: null,
    notes: 'Confirme na etiqueta da coluna da porta do motorista. O painel não mostra pressão numérica (sem TPMS de leitura), só alerta quando está criticamente baixa — calibre com manômetro próprio com frequência. Alguns donos relatam prox. 34 psi como andar mais confortável sem sair da faixa segura; siga sempre o valor oficial da etiqueta.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Dolphin SE', yearFrom: 2026, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km — vale mesmo com frenagem regenerativa reduzindo o uso do freio a disco.', priority: 'HIGH', order: 0 },
  { modelName: 'Dolphin SE', yearFrom: 2026, yearTo: null, component: 'Filtro de cabine', intervalKm: 15000, intervalMonths: 12, notes: 'Atrás do porta-luvas. Antecipe em cidades com muita poluição/poeira.', priority: 'MEDIUM', order: 1 },
  { modelName: 'Dolphin SE', yearFrom: 2026, yearTo: null, component: 'Fluido de arrefecimento da bateria e do inversor', intervalKm: null, intervalMonths: 24, notes: 'Sistema de refrigeração líquida da bateria LFP de 45,1 kWh — siga o intervalo do manual, essencial para a vida útil da bateria.', priority: 'HIGH', order: 2 },
  { modelName: 'Dolphin SE', yearFrom: 2026, yearTo: null, component: 'Suspensão traseira multilink — inspeção de folgas e buchas', intervalKm: 20000, intervalMonths: 12, notes: 'Peça exclusiva do SE/Plus (diferente do GS) — vistoriar ruídos e folgas periodicamente.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Dolphin SE', yearFrom: 2026, yearTo: null, component: 'Rodízio de pneus 205/50 R17', intervalKm: 10000, intervalMonths: null, notes: 'Ajuda a equalizar o desgaste, já que o painel não indica pressão numérica em tempo real.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Dolphin SE', yearFrom: 2026, yearTo: null, component: 'Atualização de software/firmware (ADAS e infotainment)', intervalKm: null, intervalMonths: 6, notes: 'Verificar na concessionária/app se há atualização disponível — há histórico de correções para o comportamento do ADAS e piloto automático.', priority: 'LOW', order: 5 },
  { modelName: 'Dolphin SE', yearFrom: 2026, yearTo: null, component: 'Palhetas do limpador de para-brisa', intervalKm: null, intervalMonths: 12, notes: 'Item comum a todo carro, mas fácil de esquecer em elétricos por não haver revisão de óleo para lembrar.', priority: 'LOW', order: 6 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Dolphin SE',
    yearFrom: 2026,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed BYD Dolphin SE...')

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

  console.log('✅ BYD Dolphin SE concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
