// seed-honda-cb500-hornet.ts — Honda CB 500 Hornet (2024+)
// Naked middleweight 471cc, quadro diamante, garfo USD, embreagem slipper A&S
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface MaintenanceItemInput {
  modelName: string; yearFrom: number | null; yearTo: number | null
  component: string; intervalKm: number | null; intervalMonths: number | null
  notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number
}

// ─── Honda CB 500 Hornet (2024+) — 471cc DOHC, PGM-FI, garfo USD ────────────

const HORNET_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA2 — 3,5 L com filtro; embreagem slipper exige MA obrigatório',
    body: 'Use 10W-30 JASO MA2 (API SL ou superior). Capacidade: 3,5 L trocando o filtro, 3,1 L sem filtro. A Hornet tem embreagem assistida e slipper (A&S clutch) que compartilha o banho de óleo com o câmbio — jamais use JASO MB (exclusivo CVT scooter) ou óleo automotivo sem classificação JASO MA. Troque a cada 6.000 km ou 6 meses, o que vier primeiro. Em São Paulo, Nordeste e interior quente, muitos usam 10W-40 JASO MA2 sem problema nos meses mais quentes.',
  },
  {
    severity: 'OK',
    title: 'Rodagem: primeiros 600 km max 6.000 rpm — motor, garfo USD e freios precisam de assentamento',
    body: 'Nos primeiros 600 km, limite a 6.000 rpm (sem ultrapassar 2/3 da faixa). De 600 a 1.600 km, limite a 8.000 rpm. Isso vale não só para o motor 471cc, mas também para os vedadores (oil seals) do garfo USD 41mm e para as pastilhas de freio novas, que precisam assentar na superfície do disco. Pastilhas novas têm frenagem reduzida nos primeiros 200 km — aplique freio firme mas não de emergência. Faça a primeira revisão (óleo + filtro) aos 1.000 km.',
  },
  {
    severity: 'OK',
    title: 'Embreagem slipper A&S — manete mais leve, downshifts suaves sem travar roda traseira',
    body: 'A A&S Clutch (Assist & Slipper) tem duas funções: o sistema "assist" reduz a força necessária no manete (~30% mais leve que a CB 500F); o "slipper" escorrega internamente em reduções abruptas, evitando que o freio motor trave a roda traseira. Para o piloto: downshifts com aceleração mais contundente são seguros. Não deixe de usar a embreagem — ela ainda é necessária para saídas e paradas. A embreagem não é controle de tração: pisos escorregadios ainda exigem redução suave.',
  },
  {
    severity: 'OK',
    title: 'Garfo USD 41 mm invertido — vedações mais sensíveis que convencional; inspecione a cada 10.000 km',
    body: 'O garfo USD (upside-down) oferece menor massa não suspensa e maior rigidez, mas os oil seals ficam expostos na parte inferior das pernas, vulneráveis a sujeira e impactos de pedras. Inspecione os vedadores a cada 10.000 km ou a cada 6 meses: procure mancha de óleo nas pernas do garfo. Se aparecer óleo escorrendo, troque os vedadores imediatamente — óleo no disco de freio é risco de acidente grave. Troque o óleo do garfo a cada 20.000–25.000 km (SAE 10 fork oil, ~350 ml por perna).',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CPR8EA-9 — gap 0,9 mm; mesma vela da família CB 500F/X',
    body: 'Vela original: NGK CPR8EA-9 (gap 0,9 mm). São 2 cilindros = 2 velas — troque sempre em par. Intervalo: 12.000 km (cobre) ou 24.000 km (iridium NGK DCPR8EIX). Verifique o gap ao instalar mesmo em velas novas — podem vir ligeiramente fora de fábrica. A vela saudável tem isolador bege/cinza claro; enegrecida indica mistura rica ou consumo de óleo; esbranquiçada indica mistura pobre. Se a Hornet usar quickshifter com mapeamento agressivo, prefira iridium.',
  },
  {
    severity: 'OK',
    title: 'Folga de válvulas por shims — IN 0,16 mm / EX 0,27 mm a cada 16.000 km',
    body: 'Mesmo motor DOHC 471cc da CB 500F: folga com motor FRIO — admissão 0,16 mm (±0,03) / escapamento 0,27 mm (±0,03). Verifique a cada 16.000 km. A regulagem por anilhas (shims) exige compressor de mola e kit de shims calibrados — trabalho de oficina especializada. Motores DOHC modernos tendem a "apertar" as válvulas lentamente; muitas unidades chegam aos 32.000 km sem precisar trocar shim. Mas nunca pule a verificação: válvula fora de folga compromete a compressão e pode queimar o assento.',
  },
  {
    severity: 'OK',
    title: 'Tanque de 15,1 L — menor que a CB 500F; planeje paradas a cada 400 km',
    body: 'O tanque de 15,1 L é mais compacto que o de 17,1 L da CB 500F, pensado para manter o centro de gravidade baixo. Com consumo médio de 28–32 km/l em uso misto, a autonomia real fica em ~420–450 km (reserve sempre 2 L no fundo do tanque para a bomba não sobreaquecer). Em rodovia a 120 km/h, o consumo pode chegar a 35 km/l; em uso urbano intenso com paradas, cai para ~25 km/l. Em viagens por regiões com postos escassos, planeje paradas a cada 350 km.',
  },
  {
    severity: 'OK',
    title: 'Quickshifter (quando equipado) — somente upshift; downshift ainda exige embreagem',
    body: 'O quickshifter opcional da CB 500 Hornet funciona somente para upshift (1ª → 6ª): corta o ignition brevemente e engata o próximo marcha sem embreagem. Para downshift, use a embreagem normalmente — a Hornet não tem auto-blip. Na prática: aceleração para subir marchas, embreagem+revs para baixar. O quickshifter tem RPM mínima de ativação (~4.000 rpm) — abaixo disso ele não funciona. Mantenha o quickshifter limpo (contato no câmbio); se as marchas ficarem travando, remova e limpe o sensor.',
  },
  {
    severity: 'OK',
    title: 'ABS HBSS 2 canais — nunca instale acessórios nos cubos ou eixo das rodas',
    body: 'O sistema ABS Honda de 2 canais lê a velocidade pelos anéis fônicos acoplados aos cubos dianteiro e traseiro. Não instale extensores de disco, adaptadores de cubo ou qualquer peça nas proximidades dos anéis — pequenas variações de distância ao sensor geram falsos positivos ou desativam o ABS. Em frenagem de emergência, aplique pressão firme e constante: o sistema modula automaticamente. Se a luz ABS acender durante uso normal, leia os DTCs antes de qualquer intervenção.',
  },
]

const HORNET_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Motor 471cc — herança da bomba d\'água do CB 500F/X; Honda melhorou mas vigilância continua',
    body: 'O 471cc da CB 500 Hornet é uma evolução do motor da CB 500F e CB 500X, onde falha de vedação da bomba d\'água foi problema crônico (2019–2022). A Honda revisou o projeto para 2024, mas o bloco é basicamente o mesmo. Monitore sinais clássicos: óleo subindo de nível sem abastecer, emulsão esbranquiçada na vareta ou na tampa, ou pingo de fluido de arrefecimento no solo. Verifique o nível de óleo e arrefecimento antes de cada viagem longa. Em caso de suspeita, PARE imediatamente — continuar destrói o motor em poucos minutos.',
  },
  {
    severity: 'WARN',
    title: 'Garfo USD — vedadores falham antes do convencional em caso de queda ou uso em terra',
    body: 'O garfo invertido tem vedadores mais expostos e sensíveis que o telescópico convencional. Uma queda baixa (de estacionar, por exemplo) pode ambocar a haste e causar vazamento logo depois. Em uso em cascalho ou terra solta, pedras pequenas riscam a haste polida e comprometem o vedador. Se a moto sofreu queda lateral, inspecione as hastes do garfo por amassados ou riscos profundos antes de retomar o uso. Hastes danificadas não podem ser polidas em campo — necessitam substituição ou recretificação.',
  },
  {
    severity: 'WARN',
    title: 'Aquecimento em trânsito lento — ventoinha do radiador normal; não pane',
    body: 'O motor bicilíndrico 471cc gera calor concentrado nas pernas e nas mãos do piloto em trânsito lento e temperatura ambiente alta. A ventoinha elétrica do radiador liga automaticamente acima de ~100°C — é normal ela girar em fila de trânsito. O sistema de arrefecimento é dimensionado para o uso intenso. Mas se o indicador de temperatura subir muito rápido mesmo em movimento, verifique: nível de fluido no reservatório, funcionamento da ventoinha e possíveis vazamentos no radiador. A falta de fluido em moto com arrefecimento líquido pode fundir o motor em menos de 5 minutos.',
  },
  {
    severity: 'WARN',
    title: 'Modelo novo (2024) — peças de reposição ainda chegando ao Brasil; cheque disponibilidade',
    body: 'A CB 500 Hornet chegou ao Brasil em 2024 e a rede de peças ainda está se estruturando. Componentes específicos como garfo USD, anéis fônicos ABS e eletrônica do quickshifter podem ter prazo de entrega mais longo. Para manutenção preventiva, garanta que a oficina tenha acesso às peças antes de deixar a moto. Peças do motor 471cc (filtro, velas, vedantes) são as mesmas da CB 500F/X, amplamente disponíveis. Registre o chassi no site Honda e ative notificações de recall.',
  },
]

const HORNET_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CB 500 Hornet', yearFrom: 2024, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 6000, intervalMonths: 6, notes: '3,5 L com filtro; 10W-30 JASO MA2', priority: 'CRITICAL', order: 1 },
  { modelName: 'CB 500 Hornet', yearFrom: 2024, yearTo: null, component: 'Óleo do motor + filtro (1ª revisão)', intervalKm: 1000, intervalMonths: null, notes: 'Troca obrigatória na rodagem para eliminar partículas de assentamento', priority: 'CRITICAL', order: 2 },
  { modelName: 'CB 500 Hornet', yearFrom: 2024, yearTo: null, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Inspecionar a cada 6.000 km; trocar se sujo ou amassado', priority: 'HIGH', order: 3 },
  { modelName: 'CB 500 Hornet', yearFrom: 2024, yearTo: null, component: 'Velas de ignição (NGK CPR8EA-9)', intervalKm: 12000, intervalMonths: 12, notes: '2 velas em par; gap 0,9 mm; iridium dura 24.000 km', priority: 'HIGH', order: 4 },
  { modelName: 'CB 500 Hornet', yearFrom: 2024, yearTo: null, component: 'Folga de válvulas (shims)', intervalKm: 16000, intervalMonths: 24, notes: 'IN 0,16 mm / EX 0,27 mm (motor frio); regulagem por anilhas calibradas', priority: 'HIGH', order: 5 },
  { modelName: 'CB 500 Hornet', yearFrom: 2024, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 24000, intervalMonths: 24, notes: 'Mistura 50/50 água destilada + anticongelante Honda blue', priority: 'HIGH', order: 6 },
  { modelName: 'CB 500 Hornet', yearFrom: 2024, yearTo: null, component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, notes: 'Trocar a cada 2 anos independente do km; verificar nível mensalmente', priority: 'HIGH', order: 7 },
  { modelName: 'CB 500 Hornet', yearFrom: 2024, yearTo: null, component: 'Corrente de transmissão', intervalKm: 1000, intervalMonths: null, notes: 'Lubrificar a cada 1.000 km ou após chuva; folga 30–40 mm', priority: 'MEDIUM', order: 8 },
  { modelName: 'CB 500 Hornet', yearFrom: 2024, yearTo: null, component: 'Pastilhas de freio', intervalKm: 20000, intervalMonths: null, notes: 'Inspecionar a cada 10.000 km; trocar se <2 mm de espessura', priority: 'HIGH', order: 9 },
  { modelName: 'CB 500 Hornet', yearFrom: 2024, yearTo: null, component: 'Óleo do garfo USD', intervalKm: 20000, intervalMonths: null, notes: 'SAE 10 fork oil; ~350 ml por perna; inspecionar vedadores a cada 10.000 km', priority: 'HIGH', order: 10 },
  { modelName: 'CB 500 Hornet', yearFrom: 2024, yearTo: null, component: 'Bomba d\'água', intervalKm: 24000, intervalMonths: 24, notes: 'Inspecionar vedação; verificar recall aberto pelo chassi no site Honda', priority: 'HIGH', order: 11 },
  { modelName: 'CB 500 Hornet', yearFrom: 2024, yearTo: null, component: 'Filtro de combustível', intervalKm: 24000, intervalMonths: 24, notes: 'Interno na bomba de combustível; trocar se vazão diminuir', priority: 'MEDIUM', order: 12 },
  { modelName: 'CB 500 Hornet', yearFrom: 2024, yearTo: null, component: 'Sensores ABS / anéis fônicos', intervalKm: null, intervalMonths: 12, notes: 'Inspecionar fixação, limpeza e fiação dos sensores de velocidade', priority: 'LOW', order: 13 },
  { modelName: 'CB 500 Hornet', yearFrom: 2024, yearTo: null, component: 'Bateria', intervalKm: null, intervalMonths: 36, notes: 'Vida útil ~3 anos; tensão mínima 12,6V; manter carregada se moto ficar parada >30 dias', priority: 'MEDIUM', order: 14 },
]

// ─── Blocos de modelos ────────────────────────────────────────────────────────

const BLOCKS: {
  modelName: string; yearFrom: number; yearTo: number | null
  MACETES: TipInput[]; PROBLEMAS: TipInput[]
}[] = [
  { modelName: 'CB 500 Hornet', yearFrom: 2024, yearTo: null, MACETES: HORNET_MACETES, PROBLEMAS: HORNET_PROBLEMAS },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  ...HORNET_MANUTENCAO,
]

const TIRE_PRESSURES = [
  {
    modelName: 'CB 500 Hornet',
    yearFrom: 2024, yearTo: null,
    tireSize: '120/70-17 (F) · 160/60-17 (R)',
    frontPsi: 32, rearPsi: 36,
    frontPsiLoad: 32, rearPsiLoad: 42,
    notes: 'Pneus esportivos aro 17" tubeless (mesmo tamanho da CB 500F). Calibre sempre com pneus frios (antes de rodar ou após 3+ horas parada). Solo: F 32 PSI / R 36 PSI. Com garupa: F 32 PSI / R 42 PSI. Garfo USD reduz o trabalho de compressão — manter calibragem correta é ainda mais importante para comportamento previsível. Não use a pressão máxima impressa no flanco do pneu; siga os valores acima que são os especificados pela Honda.',
  },
]

// ─── Seed principal ───────────────────────────────────────────────────────────

async function main() {
  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })

  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Honda', vehicleTypeId: motoType.id } },
    update: {}, create: { name: 'Honda', vehicleTypeId: motoType.id },
  })

  const brand = await prisma.brand.findFirstOrThrow({
    where: { name: 'Honda', vehicleTypeId: motoType.id },
  })

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {}, create: { name: block.modelName, brandId: brand.id },
    })

    const allTips = [
      ...block.MACETES.map(t => ({ ...t, category: 'MACETES' as Cat })),
      ...block.PROBLEMAS.map(t => ({ ...t, category: 'PROBLEMAS' as Cat })),
    ]

    await prisma.tip.deleteMany({ where: { modelName: block.modelName } })
    await prisma.tip.createMany({
      data: allTips.map((tip, i) => ({
        modelName: block.modelName,
        yearFrom:  null,
        yearTo:    null,
        severity:  tip.severity,
        category:  tip.category,
        title:     tip.title,
        body:      tip.body,
        order:     i,
      })),
    })

    console.log(`✅ ${block.modelName}: ${allTips.length} tips`)
  }

  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName } })
    await prisma.tirePressure.create({ data: { ...tp } })
  }
  console.log(`🔵 TirePressure: ${TIRE_PRESSURES.map(t => t.modelName).join(', ')}`)

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: BLOCKS.map(b => b.modelName) } },
  })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  const totalTips = BLOCKS.reduce((sum, b) => sum + b.MACETES.length + b.PROBLEMAS.length, 0)
  console.log(`\n✅ Honda CB 500 Hornet seed concluído! ${BLOCKS.length} modelo, ${totalTips} tips, ${TIRE_PRESSURES.length} calibragem, ${MAINTENANCE_ITEMS.length} itens de manutenção`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
