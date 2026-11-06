/**
 * Seed BMW — C 400 X (macetes, problemas e manutenção)
 * Maxi-scooter urbano BMW Motorrad: motor 350cc monocilíndrico líquido, CVT automático
 *
 * Fontes: bmw-motorrad.com.br, bmw-motorrad.co.uk (technicaldata), maintenanceschedule.com,
 *         manualslib.com (Rider's Manual C 400 X), bmw-scooters.com (fórum de proprietários),
 *         advrider.com, bimmerboom.com, webbikeworld.com
 *
 * Execute: pnpm --filter @motormacete/database db:seed:bmw-c400x
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

// ─── C 400 X ─────────────────────────────────────────────────────────────────

const C400X_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 350cc monocilíndrico líquido: 34 cv e câmbio CVT sem embreagem manual',
    body: 'A C 400 X usa motor monocilíndrico DOHC 4 válvulas, 350cc, refrigerado a líquido, entregando cerca de 34 cv (25,4 kW) a 7.500 rpm e ~35 Nm a 5.750 rpm. A transmissão é CVT (correia trapezoidal + variador), automática — sem embreagem manual e sem marchas para trocar. Isso simplifica muito o uso urbano: acelerou, andou. Diferente das motos BMW boxer/paralelo-twin da marca, a manutenção da C 400 X gira em torno de óleo do motor, óleo da caixa de câmbio (engrenagens) e do conjunto CVT (correia + roletes do variador) — não existe corrente de transmissão para lubrificar.',
  },
  {
    severity: 'OK',
    title: 'Óleo do motor: 5W-40 JASO MA2, ~1,8L com troca de filtro',
    body: 'A C 400 X leva aproximadamente 1,8L de óleo com troca do filtro (a diferença entre as marcas MIN e MAX no bastão é de ~0,4L para complementos entre trocas). Especificação: SAE 5W-40 API SJ, JASO MA2 sintético — a BMW recomenda o Motorrad ADVANTEC Ultimate, mas Motul 7100 5W-40 ou Mobil 1 Racing 4T (JASO MA2) são alternativas de mercado aceitas. Intervalo: 10.000 km ou 12 meses, o que vier primeiro. Diferente de motos com embreagem úmida tradicional, o CVT da C 400 X não tem discos de embreagem banhados em óleo do motor — mas a especificação JASO MA2 ainda é exigida pela BMW, então não substitua por óleo automotivo comum.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK LMAR8J-9E: gap 0,9 mm — mesma família de vela usada na F 850 GS',
    body: 'A C 400 X usa vela NGK LMAR8J-9E, gap 0,9 mm — curiosamente a mesma referência usada no bicilíndrico da F 850 GS/F 750 GS, mostrando o reaproveitamento de componentes entre plataformas BMW Motorrad. Inspeção e limpeza a cada revisão (10.000 km); troca completa recomendada a cada 20.000 km. Custo estimado: R$ 100–R$ 180 a unidade no Brasil. Vela em bom estado é ainda mais importante num monocilíndrico — não há um segundo cilindro para "compensar" falha de ignição.',
  },
  {
    severity: 'WARN',
    title: 'Correia CVT e roletes do variador: sem intervalo fixo no manual — planeje troca preventiva por volta de 25.000–30.000 km',
    body: 'O manual da C 400 X não define um intervalo fixo em km para troca da correia trapezoidal (CVT belt) — orienta inspeção periódica visual quanto a rachaduras, desgaste da borda e brilho (sinal de deslizamento/superaquecimento). Na prática, seguindo o padrão de maxi-scooters da categoria (Honda Forza, Yamaha XMAX), uma troca preventiva da correia e dos roletes do variador entre 25.000 e 30.000 km é uma estimativa razoável para evitar rompimento em uso — essa é uma estimativa baseada na categoria, não um número oficial BMW. Sintomas de correia gasta: aceleração "elástica", perda de força em subidas, ruído de atrito no compartimento do CVT. Serviço deve ser feito por oficina com experiência em CVT — kit correia + roletes custa na faixa de R$ 400–R$ 800 em peças no Brasil (equivalentes de mercado, já que peça BMW original é mais cara).',
  },
  {
    severity: 'OK',
    title: 'Óleo da caixa de câmbio (redutora final): 75W-90 GL-5 sintético — sistema separado do óleo do motor',
    body: 'Além do óleo do motor, a C 400 X tem uma caixa de engrenagens (redutora final) que transmite a força do CVT para a roda traseira — com óleo próprio, tipicamente 75W-90 GL-5 sintético (BMW usa a especificação própria OSP-XO). O manual não detalha um intervalo exato de forma clara nas fontes públicas — como estimativa prudente, alinhada ao praticado em outras BMW com câmbio/cardan (20.000 km / 24 meses), vale trocar nesse intervalo. Muitos donos de scooter esquecem esse óleo porque, diferente de uma corrente visível, a caixa fica escondida sob o carenamento — inclua-o explicitamente na lista de itens da revisão.',
  },
  {
    severity: 'OK',
    title: 'Sistema de freio parcialmente combinado (Integral ABS): a alavanca dianteira também aciona o freio traseiro',
    body: 'A C 400 X tem sistema de freio com função integrada (BMW Motorrad Integral ABS parcial) — acionar a alavanca dianteira aciona, em proporção, também o freio traseiro (semelhante ao Combined Brake System da Honda). O pedal traseiro, se houver, aciona só o freio traseiro isoladamente. ABS de série nas duas rodas. Para quem vem de moto convencional, o hábito de "puxar a dianteira com cautela e pisar o traseiro à parte" muda — na C 400 X a alavanca da mão direita já faz a maior parte do trabalho de frenagem combinada. Leia o manual e pratique em baixa velocidade antes de rodar no trânsito.',
  },
  {
    severity: 'OK',
    title: 'Pneus 120/70-15 (dianteiro) e 150/70-14 (traseiro): medidas de maxi-scooter, disponíveis no Brasil',
    body: 'A C 400 X usa aro 15" na frente (120/70-15) e aro 14" atrás (150/70-14) — medidas comuns em maxi-scooters grandes, com boa disponibilidade no mercado brasileiro. Opções compatíveis: Michelin City Grip 2, Pirelli Angel Scooter, Metzeler Feelfree — todas vendidas por lojas de pneus de moto nas grandes cidades. Evite pneus de scooter pequeno (110/90 ou 120/80) por engano — a C 400 X é maxi-scooter e exige carcaça reforçada para o peso (~193–204 kg) e velocidade de rodovia (até ~130 km/h).',
  },
  {
    severity: 'OK',
    title: 'Compartimento sob o banco: espaço para 1 capacete integral — economize no baú extra',
    body: 'A C 400 X tem um compartimento de armazenamento sob o banco amplo o bastante para guardar um capacete integral — recurso típico de maxi-scooter que muitas motos não oferecem. Para uso diário com bagagem extra (mochila, compras), a BMW oferece bagageiro traseiro e para-brisa opcionais de fábrica. Isso reduz a necessidade de baú lateral aftermarket, mantendo a estética mais limpa — mas se você carrega itens grandes com frequência, avalie o baú traseiro (top case) compatível, disponível via acessórios BMW ou genéricos com suporte universal.',
  },
  {
    severity: 'WARN',
    title: 'Bateria: use carregador de manutenção em paradas longas — evita ficar na mão',
    body: 'Assim como as motos BMW, a C 400 X é sensível a longos períodos parada sem uso — módulos eletrônicos em stand-by drenam a bateria aos poucos, e proprietários relatam bateria quase descarregada em apenas 2–3 semanas sem rodar. Use um carregador de manutenção (CTEK, Optimate) conectado no plugue de diagnóstico ou direto nos polos sempre que a scooter ficar parada por mais de 1–2 semanas. Isso evita a surpresa de partida fraca ou nula, e prolonga a vida útil da bateria — troca antecipada por descarga profunda repetida custa mais caro do que um carregador de manutenção (R$ 150–R$ 300).',
  },
]

const C400X_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Engasgo/desligamento em modo "coast" descendo ladeira: BMW já endereçou via atualização',
    body: 'Proprietários relataram casos específicos de a C 400 X apresentar comportamento de engasgo ou desligamento ao chegar numa parada logo após um trecho de descida longa com o CVT em "coast" (desacelerando sem tração, motor freando). A BMW reportadamente tratou parte desse comportamento com atualizações de software/hardware em unidades mais recentes. Se sua C 400 X apresentar esse sintoma, leve à concessionária para verificar se a atualização de firmware do módulo de gerenciamento do motor já foi aplicada — é um procedimento coberto em garantia e sem custo ao proprietário.',
  },
  {
    severity: 'DANGER',
    title: 'Corte de motor ao passar sobre buracos/solavancos em baixa velocidade: caso raro mas relatado',
    body: 'Há relato pontual (fórum de proprietários) de motor cortando ao passar sobre irregularidades do piso em baixa velocidade, exigindo substituição do motor por volta de 18.000 milhas (~29.000 km) sob garantia. É um caso isolado, não um padrão generalizado — mas se sua C 400 X apresentar qualquer corte de motor não relacionado à bateria ou ao combustível, não ignore: agende diagnóstico na concessionária BMW imediatamente e documente o ocorrido (data, km, condição da via) para acionamento de garantia se necessário.',
  },
  {
    severity: 'WARN',
    title: 'Alavanca de freio dianteiro "dura": alguns donos relatam esforço maior que o esperado',
    body: 'Parte dos proprietários da C 400 X relata que a alavanca do freio dianteiro exige um esforço de aperto (pull) maior do que o esperado para o nível de frenagem entregue, especialmente em comparação com scooters japonesas do mesmo segmento. Isso pode ser característica de calibração do sistema de freio integrado combinada com o dimensionamento dos discos — mas também pode ser agravado por ar no sistema hidráulico ou pastilhas/pinças desalinhadas. Se notar frenagem "esponjosa" ou exigindo pull muito acima do normal, peça sangria do sistema de freio e inspeção das pinças na revisão.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste irregular das pastilhas de freio: inspeção mais frequente é recomendada',
    body: 'Por causa do sistema de freio parcialmente combinado (a alavanca dianteira aciona também o traseiro em proporção), alguns proprietários notam desgaste desigual entre as pastilhas dianteiras e traseiras, com necessidade de troca antecipada em uma das rodas. Recomenda-se inspecionar a espessura das pastilhas a cada 10.000 km (não esperar o intervalo padrão de revisão), especialmente em uso urbano com frenagens frequentes. Pastilhas genéricas compatíveis com a linha C 400 (EBC, Galfer) estão disponíveis no Brasil por preço bem abaixo do original BMW.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão dianteira rígida: conforto abaixo do esperado em pisos irregulares',
    body: 'Alguns donos relatam a suspensão dianteira (garfo telescópico convencional) da C 400 X como excessivamente rígida para uso urbano, transmitindo mais impacto de buracos e lombadas do que o esperado para um scooter voltado à cidade. Isso é mais perceptível com pressão de pneu acima do recomendado — confira sempre a calibragem antes de julgar a suspensão "dura". Ajuste de pré-carga (se disponível no ano/versão) pode suavizar um pouco a resposta; para quem roda muito em vias esburacadas, uma revisão do óleo de garfo dentro do prazo (2 anos) também ajuda a manter a resposta original de fábrica.',
  },
  {
    severity: 'WARN',
    title: 'Bateria descarrega rápido parada: comum em toda a linha C 400',
    body: 'Como citado nas dicas de manutenção, a bateria da C 400 X tem drenagem relativamente rápida quando a scooter fica parada — relatos de bateria quase zerada em 2–3 semanas sem uso, mais acentuado que em motos convencionais BMW. Isso está ligado aos módulos eletrônicos sempre ativos (imobilizador, painel digital, sistemas de segurança). Solução definitiva: carregador de manutenção conectado sempre que a scooter ficar parada por mais de alguns dias — não é defeito isolado de uma unidade, é característica da linha.',
  },
  {
    severity: 'WARN',
    title: 'Ruído de ressonância em certas faixas de rotação/velocidade: geralmente inofensivo, mas vale checar',
    body: 'Proprietários relatam um ruído de ressonância/ zumbido perceptível em certas faixas específicas de velocidade ou rotação do motor — comum em CVTs por causa da caixa de correia e do compartimento do variador. Na maioria dos casos é uma característica do conjunto CVT e não indica falha. Ainda assim, se o ruído mudar de tom, aumentar de intensidade ou vier acompanhado de vibração na guidão/assoalho, vale abrir o compartimento do CVT numa revisão para inspecionar a correia e os roletes — desgaste irregular do variador também pode gerar ruído semelhante.',
  },
]

const C400X_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma C 400 X: revisão a cada 10.000 km / 12 meses, CVT sem intervalo fixo oficial',
    body: '1.000 km — Revisão de rodagem (running-in check) obrigatória em concessionária BMW, entre 500–1.200 km: óleo do motor + filtro, checklist geral, verificação de folgas e sistema elétrico. | A cada 10.000 km ou 12 meses (o que vier primeiro) — Óleo do motor 5W-40 JASO MA2 (~1,8L com filtro), vela NGK LMAR8J-9E inspecionada e limpa, filtro de ar inspecionado, nível de líquido de arrefecimento verificado, pastilhas de freio e fluido de freio inspecionados, correia e roletes do CVT inspecionados visualmente (rachaduras, brilho, desgaste de borda). | A cada 20.000 km — Tudo do 10k + vela NGK LMAR8J-9E nova (gap 0,9 mm) + filtro de ar novo + folga de válvulas verificada (motor DOHC 4 válvulas) + óleo da caixa de câmbio/redutora final (75W-90 GL-5) trocado (intervalo estimado, sem valor oficial claro nas fontes públicas — alinhado ao praticado em outros modelos BMW com câmbio separado). | Entre 25.000–30.000 km — Avalie troca preventiva da correia CVT e dos roletes do variador (estimativa baseada na categoria maxi-scooter, sem intervalo fixo publicado pela BMW). | A cada 2 anos — Fluido de freio DOT 4 e óleo de garfo dianteiro trocados. | A cada 2–3 anos — Líquido de arrefecimento trocado. | Sempre — mantenha carregador de manutenção conectado em paradas superiores a 1–2 semanas, pela drenagem de bateria característica da linha C 400.',
  },
]

const bmwC400XModels: ModelBlock[] = [
  {
    modelName: 'C 400 X',
    yearFrom: 2019,
    yearTo: null,
    MACETES: C400X_MACETES,
    PROBLEMAS: C400X_PROBLEMAS,
    MANUTENCAO: C400X_MANUTENCAO,
  },
]

// ─── Calibragem de pneus ───────────────────────────────────────────────────────

const bmwC400XTirePressures: TirePressureInput[] = [
  {
    modelName: 'C 400 X',
    yearFrom: 2019,
    yearTo: null,
    tireSize: 'Dianteiro 120/70-15 | Traseiro 150/70-14',
    frontPsi: 29,
    rearPsi: 33,
    frontPsiLoad: 29,
    rearPsiLoad: 36,
    notes: 'Solo: 29 PSI (2,0 bar) dianteiro / 33 PSI (2,3 bar) traseiro, sempre com pneus frios. Com garupa ou bagagem: dianteiro mantém 29 PSI, traseiro sobe para 36 PSI (2,5 bar). Pneus de maxi-scooter (Michelin City Grip 2, Pirelli Angel Scooter, Metzeler Feelfree) — não confunda com medidas de scooter pequeno. Pressão baixa nesse tipo de pneu de carcaça alta prejudica a estabilidade em curva mais do que em moto convencional — verifique mensalmente.',
  },
]

// ─── Cronograma de manutenção ──────────────────────────────────────────────────

const bmwC400XMaintenanceItems: MaintenanceItemInput[] = [
  { modelName: 'C 400 X', yearFrom: 2019, yearTo: null, order: 0,
    component: 'Óleo do motor (5W-40 JASO MA2 sintético)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume: ~1,8L com troca do filtro (top-up entre MIN/MAX: 0,4L). SAE 5W-40 API SJ, JASO MA2. BMW Motorrad ADVANTEC Ultimate ou Motul 7100 5W-40 / Mobil 1 Racing 4T equivalentes.' },
  { modelName: 'C 400 X', yearFrom: 2019, yearTo: null, order: 1,
    component: 'Vela NGK LMAR8J-9E (gap 0,9 mm)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Mesma referência usada na F 850 GS/F 750 GS. Inspecionar e limpar a cada 10.000 km; troca completa a cada 20.000 km.' },
  { modelName: 'C 400 X', yearFrom: 2019, yearTo: null, order: 2,
    component: 'Filtro de ar', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Inspecionar a cada 10.000 km; troca a cada 20.000 km, antes se uso em vias com muita poeira.' },
  { modelName: 'C 400 X', yearFrom: 2019, yearTo: null, order: 3,
    component: 'Correia CVT (correia trapezoidal do variador)', intervalKm: 30000, intervalMonths: null, priority: 'HIGH',
    notes: 'Sem intervalo fixo oficial publicado pela BMW — inspeção visual (rachaduras, brilho, desgaste de borda) a cada revisão. Troca preventiva estimada entre 25.000–30.000 km, seguindo o padrão de maxi-scooters da categoria (Honda Forza, Yamaha XMAX). Sintoma de correia gasta: aceleração elástica, perda de força em subida.' },
  { modelName: 'C 400 X', yearFrom: 2019, yearTo: null, order: 4,
    component: 'Roletes do variador (CVT)', intervalKm: 30000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Trocar junto com a correia CVT — desgaste desigual dos roletes acelera o desgaste da correia nova. Estimativa de categoria, sem valor oficial BMW confirmado.' },
  { modelName: 'C 400 X', yearFrom: 2019, yearTo: null, order: 5,
    component: 'Óleo da caixa de câmbio / redutora final (75W-90 GL-5 sintético)', intervalKm: 20000, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'Sistema separado do óleo do motor — BMW usa especificação própria OSP-XO (equivalente 75W-90 GL-5 sintético). Intervalo estimado por analogia a outros modelos BMW com câmbio/cardan separado, já que a fonte pública não detalha valor exato.' },
  { modelName: 'C 400 X', yearFrom: 2019, yearTo: null, order: 6,
    component: 'Pastilhas de freio (dianteira e traseira)', intervalKm: 10000, intervalMonths: null, priority: 'HIGH',
    notes: 'Inspecionar a cada 10.000 km — sistema de freio parcialmente combinado pode gerar desgaste desigual entre pastilhas dianteiras e traseiras. Alternativas de mercado: EBC, Galfer.' },
  { modelName: 'C 400 X', yearFrom: 2019, yearTo: null, order: 7,
    component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'Troca a cada 2 anos. Sistema de freio integrado (Integral ABS parcial) — fluido degradado compromete a atuação combinada dianteira/traseira.' },
  { modelName: 'C 400 X', yearFrom: 2019, yearTo: null, order: 8,
    component: 'Óleo de garfo dianteiro', intervalKm: null, intervalMonths: 24, priority: 'LOW',
    notes: 'Troca a cada 2 anos conforme manual. Garfo telescópico convencional.' },
  { modelName: 'C 400 X', yearFrom: 2019, yearTo: null, order: 9,
    component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 30, priority: 'LOW',
    notes: 'Troca a cada 2–3 anos para evitar corrosão do radiador. Verificar nível a cada revisão de 10.000 km.' },
]

// ─── Runner ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('🛵 Seed BMW C 400 X iniciando...\n')

  const motoType = await prisma.vehicleType.upsert({
    where: { slug: 'moto' },
    update: {},
    create: { slug: 'moto', label: 'Moto' },
  })

  const bmwBrand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'BMW', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'BMW', vehicleTypeId: motoType.id },
  })
  console.log(`  ✅ Brand: ${bmwBrand.name}`)

  for (const block of bmwC400XModels) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: bmwBrand.id } },
      update: {},
      create: { name: block.modelName, brandId: bmwBrand.id },
    })

    await prisma.tip.deleteMany({ where: { modelName: block.modelName } })

    const allTips: { cat: Cat; tip: TipInput }[] = [
      ...block.MACETES.map(t => ({ cat: 'MACETES' as Cat, tip: t })),
      ...block.PROBLEMAS.map(t => ({ cat: 'PROBLEMAS' as Cat, tip: t })),
      ...block.MANUTENCAO.map(t => ({ cat: 'MANUTENCAO' as Cat, tip: t })),
    ]

    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }, idx) => ({
        modelName: block.modelName,
        category: cat,
        severity: tip.severity,
        title: tip.title,
        body: tip.body,
        yearFrom:  null,
        yearTo:    null,
        order: idx,
      })),
    })

    const counts = {
      m: block.MACETES.length,
      p: block.PROBLEMAS.length,
      mt: block.MANUTENCAO.length,
    }
    console.log(
      `  🔧 ${block.modelName} (${block.yearFrom ?? '?'}–${block.yearTo ?? 'atual'}): ` +
      `${counts.m} macetes, ${counts.p} problemas, ${counts.mt} manutenção`,
    )
  }

  console.log('\n  📏 Calibragem de pneus...')
  for (const tp of bmwC400XTirePressures) {
    await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName } })
    await prisma.tirePressure.create({
      data: {
        modelName: tp.modelName,
        yearFrom: tp.yearFrom,
        yearTo: tp.yearTo,
        tireSize: tp.tireSize,
        frontPsi: tp.frontPsi,
        rearPsi: tp.rearPsi,
        frontPsiLoad: tp.frontPsiLoad,
        rearPsiLoad: tp.rearPsiLoad,
        notes: tp.notes,
      },
    })
    console.log(`  ✅ ${tp.modelName}: ${tp.frontPsi}/${tp.rearPsi} PSI`)
  }

  console.log('\n  🔧 Cronogramas de manutenção...')
  const modelNames = [...new Set(bmwC400XMaintenanceItems.map(m => m.modelName))]
  for (const name of modelNames) {
    await prisma.maintenanceItem.deleteMany({ where: { modelName: name } })
  }
  await prisma.maintenanceItem.createMany({
    data: bmwC400XMaintenanceItems.map(item => ({
      modelName: item.modelName,
      yearFrom: item.yearFrom,
      yearTo: item.yearTo,
      component: item.component,
      intervalKm: item.intervalKm,
      intervalMonths: item.intervalMonths,
      notes: item.notes,
      priority: item.priority,
      order: item.order,
    })),
  })
  for (const name of modelNames) {
    const count = bmwC400XMaintenanceItems.filter(m => m.modelName === name).length
    console.log(`  ✅ ${name}: ${count} itens de manutenção`)
  }

  const totalTips = bmwC400XModels.reduce(
    (acc, b) => acc + b.MACETES.length + b.PROBLEMAS.length + b.MANUTENCAO.length,
    0,
  )
  console.log(
    `\n✅ Seed BMW C 400 X concluído: ${bmwC400XModels.length} modelo, ${totalTips} dicas, ${bmwC400XTirePressures.length} calibragens, ${bmwC400XMaintenanceItems.length} itens de manutenção.`,
  )
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
