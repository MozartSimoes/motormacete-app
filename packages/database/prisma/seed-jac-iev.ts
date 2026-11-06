/**
 * Seed JAC iEV — macetes, problemas, manutenção e calibragem
 * Linha elétrica da JAC no Brasil, bem heterogênea: iEV20 e iEV40 são
 * hatches urbanos de entrada (68cv e 115cv), iEV330P é a PRIMEIRA
 * PICAPE 100% ELÉTRICA DE SÉRIE DO MUNDO (lançada no Brasil), iEV350T
 * é um VUC (Veículo Urbano de Carga) elétrico e iEV750V é uma van
 * grande vendida em versão de carga (V) e de passageiros (VIP, até 13
 * lugares + motorista). Ponto em comum documentado em todos os
 * modelos: rede de assistência técnica e disponibilidade de peças
 * ainda em amadurecimento no Brasil, com atrasos relatados por
 * proprietários — tratado como alerta prático em cada bloco.
 * Execute: pnpm --filter @motormacete/database db:seed:jac-iev
 *
 * Fontes: autopapo.com.br, autoo.com.br, jacmotors.com.br,
 *         reclameaqui.com.br, motoragora.com.br, webmotors.com.br,
 *         oficinasbh.com, segs.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- iEV 20 (hatch de entrada, 68cv) ----------

const MACETES_IEV20: TipInput[] = [
  { severity: 'OK', title: 'Versão de entrada da linha — foco em cidade, não em rodovia', body: 'O iEV20 é o modelo mais básico e acessível da linha elétrica JAC, com motor de 68cv e velocidade máxima limitada a cerca de 112 km/h. É pensado para uso urbano/trajetos curtos — para rodovia ou viagens mais longas, considere o iEV40 (mais potente e com mais autonomia).' },
  { severity: 'OK', title: 'Peça mecânica de suspensão e freio pode ser compartilhada com o JAC a combustão da mesma base', body: 'Como é comum em elétricos chineses "eletrificados" a partir de um modelo a combustão existente, itens não relacionados ao powertrain elétrico (suspensão, freio, direção) costumam ter equivalente no catálogo de peças JAC a combustão da mesma geração — vale perguntar na autopeça por essa equivalência antes de assumir que só a concessionária tem a peça.' },
]

const PROBLEMAS_IEV20: TipInput[] = [
  { severity: 'WARN', title: 'Rede de assistência e disponibilidade de peças ainda em amadurecimento', body: 'Proprietários relatam demora para agendar reparo, falta de retorno de concessionária e dificuldade para conseguir peça — por ser marca ainda relativamente nova e em expansão no Brasil. Antes de comprar, pesquise a distância até a concessionária JAC mais próxima da sua região e o histórico de atendimento dela especificamente (varia bastante entre concessionárias).' },
  { severity: 'WARN', title: 'Autonomia real fica abaixo do valor anunciado, como em quase todo elétrico de entrada', body: 'Testes em ciclo controlado tendem a ser otimistas comparado ao uso real (ar-condicionado ligado, trânsito parado, calor). Planeje suas rotas diárias com margem de segurança em vez de confiar no número máximo anunciado.' },
]

const MANUTENCAO_IEV20: TipInput[] = [
  { severity: 'OK', title: 'Cronograma iEV20 (elétrico)', body: 'Sem troca de óleo de motor — revisão se resume a: fluido de freio (a cada 2 anos), pneus (rotação a cada 10.000 km), filtro de cabine (12 meses) e inspeção do sistema de alta tensão (bateria/cabos) anualmente. Configure o limite de carga em 80-90% para uso diário, reservando 100% só para trajetos mais longos.' },
]

// ---------- iEV 40 (hatch, 115cv, mais autonomia) ----------

const MACETES_IEV40: TipInput[] = [
  { severity: 'OK', title: 'Motor mais potente e mais autonomia que o iEV20', body: 'Com 115cv, o iEV40 tem desempenho e autonomia superiores ao iEV20 dentro da linha de hatches JAC — vale a diferença de preço se o seu uso incluir trechos de rodovia com mais frequência.' },
  { severity: 'OK', title: 'Configure o limite de carga e use o modo Eco no dia a dia', body: 'Como em qualquer elétrico, reserve os 100% de carga só para viagens mais longas (use 80-90% no cotidiano para preservar a vida útil da bateria) e prefira o modo Eco em trânsito urbano para ganhar autonomia extra.' },
]

const PROBLEMAS_IEV40: TipInput[] = [
  { severity: 'WARN', title: 'Relatos de queda abrupta de carga da bateria de alta tensão e demora no suporte', body: 'Há reclamações documentadas (Reclame Aqui) de proprietários de modelos elétricos JAC da mesma família técnica relatando a bateria de alta tensão "morrendo" de forma abrupta (ex: caindo repentinamente com ainda ~30% indicado) e dificuldade para conseguir atendimento rápido do SAC ou da credenciada. Se notar queda de carga fora do padrão normal de degradação gradual, documente o ocorrido (prints do painel, data/hora) e acione a garantia formalmente o quanto antes.' },
  { severity: 'WARN', title: 'Rede de assistência e disponibilidade de peças ainda em amadurecimento', body: 'Mesma ressalva da linha JAC elétrica em geral: por ser marca em expansão no Brasil, peça mais específica do sistema elétrico pode demorar para chegar. Planeje com folga se depender do carro no dia a dia.' },
]

const MANUTENCAO_IEV40: TipInput[] = [
  { severity: 'OK', title: 'Cronograma iEV40 (elétrico)', body: 'Sem troca de óleo de motor. Fluido de freio a cada 2 anos. Pneus: rotação a cada 10.000 km. Filtro de cabine a cada 12 meses. Inspeção anual do sistema de alta tensão (bateria/cabos). Monitore a curva de queda de carga da bateria — quedas abruptas fora do padrão gradual esperado merecem diagnóstico imediato na concessionária.' },
]

// ---------- iEV 330P (picape, primeira picape elétrica de série do mundo) ----------

const MACETES_IEV330P: TipInput[] = [
  { severity: 'OK', title: 'Primeira picape 100% elétrica de série do mundo — lançada no Brasil', body: 'O iEV330P foi lançado pela JAC como a primeira picape elétrica de produção em série do mundo, estreando no mercado brasileiro. Motor de 150cv/33,6 kgfm, bateria de fosfato de ferro-lítio (LFP) de 67,2 kWh, autonomia de até 320 km e carga útil de 800 kg na caçamba (1.500 litros de volume).' },
  { severity: 'OK', title: 'Sistema iPedal: frenagem regenerativa forte ao soltar o acelerador', body: 'O iPedal regenera energia de forma intensa ao soltar o pedal do acelerador, permitindo dirigir boa parte do tempo praticamente sem usar o freio — além de economizar pastilha/disco, aumenta a autonomia. Vale um tempo de adaptação para quem vem de carro a combustão, já que a desaceleração é mais brusca que o esperado no início.' },
  { severity: 'OK', title: 'Carregamento DC rápido em ~1h30, wallbox 7,4 kW em ~8h', body: 'Com carregador DC de 40 kW, a recarga fica pronta em cerca de 1h30. Em wallbox residencial 7,4 kW, o tempo sobe para cerca de 8 horas — planeje deixar carregando durante a noite para uso comercial no dia seguinte.' },
]

const PROBLEMAS_IEV330P: TipInput[] = [
  { severity: 'WARN', title: 'Velocidade máxima limitada a ~97 km/h — planeje o uso em rodovia', body: 'Para preservar a autonomia da bateria, a velocidade máxima do iEV330P é limitada eletronicamente a cerca de 97 km/h. Não é uma picape para uso intenso de rodovia em alta velocidade — o uso ideal é urbano/regional, como a maioria das aplicações comerciais de picape.' },
  { severity: 'WARN', title: 'Rede de assistência e peças ainda limitadas para veículo comercial que não pode parar', body: 'Sendo uma picape elétrica pioneira e de baixo volume de vendas, a disponibilidade de peça específica e a cobertura geográfica da rede de assistência JAC são pontos de atenção maiores ainda do que nos modelos de passeio — especialmente crítico se a picape é ferramenta de trabalho. Confirme a proximidade de uma concessionária/oficina credenciada antes de depender dela profissionalmente.' },
]

const MANUTENCAO_IEV330P: TipInput[] = [
  { severity: 'OK', title: 'Cronograma iEV330P (elétrico, uso comercial/carga)', body: 'Sem troca de óleo de motor. Fluido de freio a cada 2 anos. Pneus: rotação mais frequente (a cada 8.000-10.000 km) por uso com carga. Inspeção da suspensão traseira com atenção redobrada se a caçamba é usada com carga próxima ao limite de 800 kg regularmente. Inspeção anual do sistema de alta tensão (bateria/cabos).' },
]

// ---------- iEV 350T (VUC — Veículo Urbano de Carga elétrico) ----------

const MACETES_IEV350T: TipInput[] = [
  { severity: 'OK', title: 'Primeiro VUC (Veículo Urbano de Carga) elétrico da JAC no Brasil', body: 'O iEV350T é voltado para logística urbana/última milha — motor de 150cv/35,6 kgfm, bateria LFP de 55,3 kWh (fornecedor Guoxuan), autonomia de referência entre 265 e 325 km conforme condição de uso. Pensado para empresas que rodam rota fixa dentro da cidade, não para uso de passeio.' },
  { severity: 'OK', title: 'Custo de energia muito mais baixo que diesel/gasolina para frota urbana', body: 'O consumo elétrico gira em torno de R$ 11 a cada 100 km rodados — uma fração do custo de combustível de um VUC a diesel equivalente. Para empresa com rota urbana previsível, o retorno sobre o investimento tende a vir do custo operacional menor no longo prazo.' },
]

const PROBLEMAS_IEV350T: TipInput[] = [
  { severity: 'WARN', title: 'Rede de assistência: planeje manutenção com antecedência para não parar a operação', body: 'Para uso comercial, veículo parado é prejuízo direto. Como a rede de assistência e peça específica da linha elétrica JAC ainda está em expansão no Brasil, agende revisões preventivas com antecedência (não espere o aviso do painel) e tenha um plano B de veículo reserva para imprevistos.' },
]

const MANUTENCAO_IEV350T: TipInput[] = [
  { severity: 'OK', title: 'Cronograma iEV350T (elétrico, uso comercial)', body: 'Sem troca de óleo de motor. Fluido de freio a cada 2 anos. Pneus: rotação a cada 8.000-10.000 km (uso comercial intenso desgasta mais rápido) — considere calibragem específica para carga se rodar frequentemente no limite de peso. Inspeção anual do sistema de alta tensão (bateria/cabos). Revisão preventiva agendada com antecedência para não impactar a operação.' },
]

// ---------- iEV 750V (van grande — versão carga "V" e passageiros "VIP") ----------

const MACETES_IEV750V: TipInput[] = [
  { severity: 'OK', title: 'Duas versões: carga (V) e passageiros (VIP, até 13 lugares + motorista)', body: 'O iEV750 existe em versão de carga (iEV750V, furgão) e em versão de passageiros (iEV750 VIP, para até 13 passageiros mais o motorista) — a primeira van de passageiros 100% elétrica de grande porte lançada no Brasil. Confirme qual versão é a sua antes de procurar peça ou acessório, já que a configuração interna muda bastante.' },
  { severity: 'OK', title: 'Bateria grande (92 kWh) — modo Eco estende bastante a autonomia', body: 'Com bateria de 92 kWh, a autonomia de referência é de 235 km em uso normal, subindo para cerca de 280 km com o modo Eco ativado (mais regeneração na frenagem) e ar-condicionado desligado. Para rota longa, avalie o trade-off entre conforto térmico dos passageiros/carga e autonomia.' },
]

const PROBLEMAS_IEV750V: TipInput[] = [
  { severity: 'WARN', title: 'Rede de assistência: veículo de frota/transporte não pode ficar parado', body: 'Sendo um veículo de grande porte usado geralmente em transporte de passageiros ou carga comercial, o impacto de ficar parado esperando peça ou agendamento é ainda maior. Mantenha contato direto com a concessionária mais próxima e negocie um plano de manutenção preventiva formal, principalmente se a van roda em linha regular.' },
]

const MANUTENCAO_IEV750V: TipInput[] = [
  { severity: 'OK', title: 'Cronograma iEV750V/VIP (elétrico, van grande)', body: 'Sem troca de óleo de motor. Fluido de freio a cada 2 anos (freios mais exigidos pelo peso do veículo — inspeção mais frequente recomendada). Pneus: rotação a cada 8.000-10.000 km. Inspeção anual do sistema de alta tensão (bateria/cabos), com atenção redobrada dado o tamanho da bateria (92 kWh).' },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'iEV 20', yearFrom: 2020, yearTo: null, tireSize: '165/70 R14 (referência)', frontPsi: 32, rearPsi: 30, frontPsiLoad: 34, rearPsiLoad: 34, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta — valor de referência, sem estepe na maioria das unidades (kit de reparo).' },
  { modelName: 'iEV 40', yearFrom: 2020, yearTo: null, tireSize: '185/60 R15 (referência)', frontPsi: 32, rearPsi: 30, frontPsiLoad: 35, rearPsiLoad: 35, sparePsi: null, notes: 'Confirme na etiqueta da coluna da porta.' },
  { modelName: 'iEV 330P', yearFrom: 2021, yearTo: null, tireSize: '225/70 R16 (referência, picape)', frontPsi: 35, rearPsi: 35, frontPsiLoad: 38, rearPsiLoad: 50, sparePsi: 60, notes: 'Traseiro varia bastante com carga na caçamba (até 800 kg) — confirme na plaqueta da coluna da porta o valor sem carga e com carga máxima.' },
  { modelName: 'iEV 350T', yearFrom: 2022, yearTo: null, tireSize: '185 R14C (referência, VUC)', frontPsi: 40, rearPsi: 45, frontPsiLoad: 44, rearPsiLoad: 58, sparePsi: 60, notes: 'Veículo comercial de carga — pressão varia bastante com o peso transportado, confirme na plaqueta.' },
  { modelName: 'iEV 750V', yearFrom: 2021, yearTo: null, tireSize: '215/70 R16C (referência, van grande)', frontPsi: 45, rearPsi: 55, frontPsiLoad: 50, rearPsiLoad: 65, sparePsi: 60, notes: 'Confirme sempre na plaqueta — varia com carga/número de passageiros na versão VIP.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'iEV 20', yearFrom: 2020, yearTo: null, component: 'Fluido de freio', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 0 },
  { modelName: 'iEV 20', yearFrom: 2020, yearTo: null, component: 'Rotação de pneus', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 1 },
  { modelName: 'iEV 20', yearFrom: 2020, yearTo: null, component: 'Filtro de cabine', intervalKm: null, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 2 },
  { modelName: 'iEV 20', yearFrom: 2020, yearTo: null, component: 'Sistema de alta tensão (bateria/cabos)', intervalKm: null, intervalMonths: 12, notes: null, priority: 'HIGH', order: 3 },

  { modelName: 'iEV 40', yearFrom: 2020, yearTo: null, component: 'Fluido de freio', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'iEV 40', yearFrom: 2020, yearTo: null, component: 'Rotação de pneus', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 5 },
  { modelName: 'iEV 40', yearFrom: 2020, yearTo: null, component: 'Filtro de cabine', intervalKm: null, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: 'iEV 40', yearFrom: 2020, yearTo: null, component: 'Monitoramento da curva de carga da bateria de alta tensão', intervalKm: null, intervalMonths: 6, notes: 'Queda abrupta fora do padrão gradual esperado merece diagnóstico imediato.', priority: 'HIGH', order: 7 },
  { modelName: 'iEV 40', yearFrom: 2020, yearTo: null, component: 'Sistema de alta tensão (bateria/cabos)', intervalKm: null, intervalMonths: 12, notes: null, priority: 'HIGH', order: 8 },

  { modelName: 'iEV 330P', yearFrom: 2021, yearTo: null, component: 'Fluido de freio', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 9 },
  { modelName: 'iEV 330P', yearFrom: 2021, yearTo: null, component: 'Rotação de pneus', intervalKm: 8000, intervalMonths: null, notes: 'Uso com carga na caçamba desgasta mais rápido.', priority: 'MEDIUM', order: 10 },
  { modelName: 'iEV 330P', yearFrom: 2021, yearTo: null, component: 'Inspeção da suspensão traseira', intervalKm: 10000, intervalMonths: null, notes: 'Atenção redobrada se a caçamba roda frequentemente próxima do limite de 800 kg.', priority: 'HIGH', order: 11 },
  { modelName: 'iEV 330P', yearFrom: 2021, yearTo: null, component: 'Sistema de alta tensão (bateria/cabos)', intervalKm: null, intervalMonths: 12, notes: null, priority: 'HIGH', order: 12 },

  { modelName: 'iEV 350T', yearFrom: 2022, yearTo: null, component: 'Fluido de freio', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 13 },
  { modelName: 'iEV 350T', yearFrom: 2022, yearTo: null, component: 'Rotação de pneus', intervalKm: 8000, intervalMonths: null, notes: 'Uso comercial intenso.', priority: 'MEDIUM', order: 14 },
  { modelName: 'iEV 350T', yearFrom: 2022, yearTo: null, component: 'Revisão preventiva agendada com antecedência', intervalKm: 10000, intervalMonths: null, notes: 'Veículo comercial — não esperar o aviso do painel para não impactar a operação.', priority: 'HIGH', order: 15 },
  { modelName: 'iEV 350T', yearFrom: 2022, yearTo: null, component: 'Sistema de alta tensão (bateria/cabos)', intervalKm: null, intervalMonths: 12, notes: null, priority: 'HIGH', order: 16 },

  { modelName: 'iEV 750V', yearFrom: 2021, yearTo: null, component: 'Fluido de freio', intervalKm: null, intervalMonths: 18, notes: 'Freios mais exigidos pelo peso do veículo — inspeção mais frequente.', priority: 'HIGH', order: 17 },
  { modelName: 'iEV 750V', yearFrom: 2021, yearTo: null, component: 'Rotação de pneus', intervalKm: 8000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 18 },
  { modelName: 'iEV 750V', yearFrom: 2021, yearTo: null, component: 'Sistema de alta tensão (bateria/cabos)', intervalKm: null, intervalMonths: 12, notes: 'Atenção redobrada pelo tamanho da bateria (92 kWh).', priority: 'HIGH', order: 19 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'iEV 20', yearFrom: 2020, yearTo: null, MACETES: MACETES_IEV20, PROBLEMAS: PROBLEMAS_IEV20, MANUTENCAO: MANUTENCAO_IEV20 },
  { modelName: 'iEV 40', yearFrom: 2020, yearTo: null, MACETES: MACETES_IEV40, PROBLEMAS: PROBLEMAS_IEV40, MANUTENCAO: MANUTENCAO_IEV40 },
  { modelName: 'iEV 330P', yearFrom: 2021, yearTo: null, MACETES: MACETES_IEV330P, PROBLEMAS: PROBLEMAS_IEV330P, MANUTENCAO: MANUTENCAO_IEV330P },
  { modelName: 'iEV 350T', yearFrom: 2022, yearTo: null, MACETES: MACETES_IEV350T, PROBLEMAS: PROBLEMAS_IEV350T, MANUTENCAO: MANUTENCAO_IEV350T },
  { modelName: 'iEV 750V', yearFrom: 2021, yearTo: null, MACETES: MACETES_IEV750V, PROBLEMAS: PROBLEMAS_IEV750V, MANUTENCAO: MANUTENCAO_IEV750V },
]

async function main() {
  console.log('🚗 Seed JAC iEV...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'JAC', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'JAC', vehicleTypeId: carroType.id },
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

  console.log('✅ JAC iEV concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
