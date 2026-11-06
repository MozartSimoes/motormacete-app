/**
 * Seed Fiat Fastback — macetes, problemas, manutenção e calibragem de pneus
 * SUV cupê lançado em 2022/2023, plataforma compartilhada com o Pulse.
 * #16 no ranking de vendas 2025 no Brasil (57.305 un.). Duas famílias de motor
 * sob o mesmo nome FIPE "Fastback": T200 1.0 turbo 3 cilindros + CVT (Audace,
 * Impetus, incl. variantes mild-hybrid 48V "(Híbrido)") e T270 1.3 turbo
 * 4 cilindros + câmbio automático 6 velocidades convencional (só Abarth).
 * Execute: pnpm --filter @motormacete/database db:seed:fiat-fastback
 *
 * Fontes: fiat.com.br, mobiauto.com.br, cnnbrasil.com.br, calibragemdepneu.com.br,
 *         michelin.com.br, turbonoticias.com.br, reclameaqui.com.br, YouTube (relatos de proprietários)
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
    title: 'T200 (1.0 turbo): CVT Aisin K313 — óleo específico, nunca ATF genérico',
    body: 'As versões Audace e Impetus (não-Abarth) usam CVT Aisin K313, que simula 7 marchas. Esse câmbio exige fluido específico CVTF (não é ATF de câmbio convencional) — usar o fluido errado causa deslizamento e superaquecimento da correia interna da CVT. Peça sempre "CVTF Aisin específico Fastback/Pulse T200" na troca, nunca "qualquer ATF genérico".',
  },
  {
    severity: 'OK',
    title: 'T270 Abarth: câmbio automático convencional Aisin AWF6F25 (6 marchas) — troca de óleo tem prazo',
    body: 'Diferente das versões T200 (CVT), o Abarth T270 usa câmbio automático de 6 marchas com conversor de torque tradicional (Aisin AWF6F25). Ao contrário do que muita gente pensa, "câmbio automático moderno" não é sinônimo de vitalício — Toyota/Fiat recomendam inspeção e troca do óleo ATF a cada 60.000-80.000 km em uso severo (praticamente qualquer cidade brasileira).',
  },
  {
    severity: 'WARN',
    title: 'Abarth T270: monitore o nível de óleo entre trocas — consumo é "esperado" pela Stellantis',
    body: 'O motor 1.3 turbo do Abarth tem histórico de consumir óleo entre trocas (até ~400 ml a cada 1.000 km é considerado "normal" pela própria Stellantis, ligado ao desenho dos anéis de pistão e à pressão do turbo). Verifique o nível pela vareta a cada 2-3 abastecimentos, principalmente antes de viagens. Rodar com nível baixo agrava o desgaste do turbo.',
  },
  {
    severity: 'OK',
    title: 'Mild-hybrid 48V (Audace/Impetus "Híbrido"): não é plug-in, não precisa carregar na tomada',
    body: 'As versões T200 "(Híbrido)" usam um sistema mild-hybrid 48V que recupera energia na frenagem e ajuda o motor 1.0 turbo na retomada — NÃO é um híbrido plug-in nem roda no elétrico puro, então não existe tomada para carregar. A bateria de 48V fica sob o banco/porta-malas; não mexa nela sem desconectar o sistema de alta tensão (siga o procedimento do manual antes de qualquer serviço na área).',
  },
  {
    severity: 'OK',
    title: 'Visibilidade traseira ruim: ajuste o retrovisor interno e confie mais nos sensores/câmera de ré',
    body: 'O desenho de "SUV cupê" (teto caindo para trás) reduz muito o campo de visão pelo retrovisor interno. É queixa recorrente de quem troca de um SUV tradicional. Use o sensor de estacionamento e a câmera de ré (equipamento de série a partir da versão intermediária) como principal referência em manobras, não só o espelho.',
  },
  {
    severity: 'OK',
    title: 'Ruídos de plástico no painel/porta-malas: aperte o forro antes de levar para garantia',
    body: 'Estalos e vibrações de plástico vindos do painel central, forros de porta e principalmente da tampa do porta-malas são queixa muito comum. Antes de abrir chamado de garantia, cheque se os grampos do forro do porta-malas estão bem encaixados — muitos casos são resolvidos só reapertando/reencaixando o forro, sem precisar de peça nova.',
  },
  {
    severity: 'OK',
    title: 'Peças compartilhadas com o Fiat Pulse: interchangeáveis na maioria dos componentes',
    body: 'O Fastback usa a mesma plataforma e boa parte da mecânica do Pulse (motores T200/T270, suspensão, freios). Em oficinas independentes, peça peças "Pulse T200" ou "Pulse T270 Abarth" quando o balconista não tiver cadastro específico do Fastback — filtro de óleo, velas, pastilhas de freio e componentes de suspensão geralmente servem.',
  },
]

const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Sistema mild-hybrid que não ativa: relatos de sistema "morto" mesmo em carros novos',
    body: 'Vários proprietários das versões (Híbrido) relatam que o sistema mild-hybrid simplesmente não entra em funcionamento — o carro roda normalmente no motor a combustão, mas sem a ajuda/recuperação de energia do sistema 48V, e sem aviso claro no painel. Visitas à concessionária nem sempre resolvem de primeira. Se comprou a versão híbrida especificamente pela economia prometida, monitore o consumo real nas primeiras semanas e documente para acionar garantia se o ganho não aparecer.',
  },
  {
    severity: 'WARN',
    title: 'Consumo elevado de óleo no motor 1.3 turbo (Abarth): já é fator conhecido, não espere isso ser "resolvido"',
    body: 'A Stellantis já se posicionou publicamente considerando consumo de óleo de até 400 ml/1.000 km como dentro da normalidade de projeto do motor T270. Isso significa que uma reclamação de garantia por "consumo de óleo" só é aceita acima desse patamar. Se você notar consumo bem maior que isso, documente com fotos da vareta e quilometragem para ter base sólida ao reclamar.',
  },
  {
    severity: 'WARN',
    title: 'Pneus com relatos de estouro/desgaste prematuro — verifique a data de fabricação e a pressão',
    body: 'Há relatos de pneus originais (aro 17 e 18) esfarelando ou estourando com pouco uso. Antes de suspeitar de defeito de fabricação, confirme: (1) a calibragem está correta (33 PSI, nunca abaixo de 30), (2) a data de fabricação do pneu (código DOT) não está muito antiga mesmo em carro 0 km — pneus "envelhecidos no estoque" ressecam mais rápido. Se o problema persistir com pressão/idade OK, é caso de garantia do fabricante do pneu, não da Fiat.',
  },
  {
    severity: 'OK',
    title: 'Lâmpadas de lanterna traseira queimando com frequência',
    body: 'Queixa recorrente entre proprietários: lâmpadas da lanterna traseira (não o LED principal, mas os elementos convencionais de posição/ré em algumas versões) queimam antes do esperado. Custo baixo de reposição (R$ 15-40), mas se repetir muito no mesmo ponto pode indicar mau contato no soquete — vale inspecionar oxidação no conector antes de trocar a lâmpada de novo.',
  },
  {
    severity: 'WARN',
    title: 'Central multimídia: travamentos e demora para responder toque',
    body: 'Relatos de tela multimídia travando ou demorando para responder o toque, especialmente em uso prolongado com Android Auto/Apple CarPlay conectado. Atualização de firmware pela concessionária costuma resolver a maioria dos casos — é gratuita. Reinicialização rápida: mantenha pressionado o botão físico de volume por alguns segundos.',
  },
]

const MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Fastback — T200/CVT e T270 Abarth/AT6 (Fiat + ajuste para uso severo BR)',
    body: '10.000 km/12 meses — Troca de óleo do motor (0W-20 sintético em ambos os motores turbo Firefly) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e nível de fluidos. | 10.000 km — Verificar nível de óleo do motor no Abarth T270 pela vareta (consumo é esperado). | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 30.000 km — Velas de ignição (motor turbo Firefly exige velas de resistência térmica adequada — não usar vela genérica "qualquer uma"). | 40.000 km — Fluido de freio DOT 4. | 60.000-80.000 km — Óleo do câmbio: CVT Aisin K313 (T200) ou AT6 Aisin AWF6F25 (T270 Abarth) — ambos precisam de inspeção/troca em uso severo, mesmo que o manual sugira "vitalício". | 60.000 km — Fluido de arrefecimento. | 80.000 km — Correia auxiliar do motor.',
  },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Fastback',
    yearFrom: 2022,
    yearTo: null,
    tireSize: '205/50 R17 (Audace) · 215/45 R18 (Impetus/Abarth)',
    frontPsi: 33,
    rearPsi: 33,
    frontPsiLoad: 35,
    rearPsiLoad: 35,
    sparePsi: 60,
    notes: 'Versão de entrada (aro 17): 205/50 R17, 33/33 PSI vazio. Versões intermediária/topo (aro 18, incl. Abarth): 215/45 R18, mesma pressão de fábrica. Com carga máxima: 35/35 PSI. Confirme sempre na etiqueta da coluna da porta do motorista — o valor de fábrica é o que vale, não uma tabela genérica de aro.',
  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Fastback', yearFrom: 2022, yearTo: null, component: 'Óleo do motor (0W-20 sintético, motores turbo Firefly)', intervalKm: 10000, intervalMonths: 12, notes: 'Mesma especificação para T200 1.0 e T270 1.3. Capacidade ~4,0-4,3L com filtro (varia por motor).', priority: 'CRITICAL', order: 0 },
  { modelName: 'Fastback', yearFrom: 2022, yearTo: null, component: 'Filtro de óleo', intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre junto com o óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'Fastback', yearFrom: 2022, yearTo: null, component: 'Verificação do nível de óleo (Abarth T270)', intervalKm: 3000, intervalMonths: null, notes: 'Consumo de até ~400ml/1.000km é considerado normal pela Stellantis. Confira pela vareta entre trocas.', priority: 'HIGH', order: 2 },
  { modelName: 'Fastback', yearFrom: 2022, yearTo: null, component: 'Filtro de ar do motor', intervalKm: 20000, intervalMonths: 24, notes: 'Reduza para 10.000-15.000 km em cidades com muita poeira/poluição.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Fastback', yearFrom: 2022, yearTo: null, component: 'Filtro de cabine', intervalKm: 20000, intervalMonths: 12, notes: 'Atrás do porta-luvas.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Fastback', yearFrom: 2022, yearTo: null, component: 'Velas de ignição', intervalKm: 30000, intervalMonths: null, notes: 'Motores turbo Firefly exigem grau térmico específico — não usar vela genérica de motor aspirado.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Fastback', yearFrom: 2022, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: 'Troca por tempo, não só por km.', priority: 'HIGH', order: 6 },
  { modelName: 'Fastback', yearFrom: 2022, yearTo: null, component: 'Óleo do câmbio CVT (Aisin K313, versões T200)', intervalKm: 60000, intervalMonths: 48, notes: 'Fluido CVTF específico — nunca ATF genérico. Uso severo (cidade grande) pede inspeção antecipada.', priority: 'CRITICAL', order: 7 },
  { modelName: 'Fastback', yearFrom: 2022, yearTo: null, component: 'Óleo do câmbio automático (Aisin AWF6F25, versão Abarth T270)', intervalKm: 60000, intervalMonths: 48, notes: 'Câmbio convencional 6 marchas com conversor de torque — não é vitalício em uso severo.', priority: 'CRITICAL', order: 8 },
  { modelName: 'Fastback', yearFrom: 2022, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Use apenas o aditivo especificado pela Fiat — não misturar tipos/cores diferentes.', priority: 'HIGH', order: 9 },
  { modelName: 'Fastback', yearFrom: 2022, yearTo: null, component: 'Correia auxiliar do motor', intervalKm: 80000, intervalMonths: null, notes: 'Inspecionar ressecamento/trincas antes de decidir trocar.', priority: 'MEDIUM', order: 10 },
  { modelName: 'Fastback', yearFrom: 2022, yearTo: null, component: 'Bateria 12V / bateria 48V (versões mild-hybrid)', intervalKm: null, intervalMonths: 36, notes: 'Versões híbridas têm bateria 48V adicional sob o veículo — não realizar serviços na área sem desconectar o sistema de alta tensão conforme manual.', priority: 'HIGH', order: 11 },
]

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Fastback',
    yearFrom: 2022,
    yearTo: null,
    MACETES,
    PROBLEMAS,
    MANUTENCAO,
  },
]

async function main() {
  console.log('🚗 Seed Fiat Fastback...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Fiat', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Fiat', vehicleTypeId: carroType.id },
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

  console.log('✅ Fiat Fastback concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
