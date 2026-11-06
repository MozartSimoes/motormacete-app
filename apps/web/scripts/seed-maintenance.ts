/**
 * Seed preventive maintenance schedules into the database.
 * Run: pnpm --filter @motormacete/database exec tsx ../../apps/web/scripts/seed-maintenance.ts
 */
import { PrismaClient } from '../lib/generated/prisma/index.js'

const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL })

type P = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
interface Item { component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: P }

// ─── Cronograma GENÉRICO (carros flex/gasolina) ───────────────────────────────
const generic: Item[] = [
  { component: 'Óleo do motor',                 intervalKm: 10000, intervalMonths: 12, notes: 'Verifique o nível mensalmente. Use a viscosidade indicada no manual do proprietário.', priority: 'CRITICAL' },
  { component: 'Filtro de óleo',                intervalKm: 10000, intervalMonths: 12, notes: 'Sempre troque junto com o óleo do motor.', priority: 'CRITICAL' },
  { component: 'Correia / corrente dentada',    intervalKm: 60000, intervalMonths: 48, notes: 'Motor interferente: ruptura = pistões batem nas válvulas = motor destruído. Não adie além do prazo.', priority: 'CRITICAL' },
  { component: 'Fluido de freio',               intervalKm: null,  intervalMonths: 24, notes: 'DOT 3 ou DOT 4 conforme manual. Absorve umidade com o tempo e reduz o ponto de ebulição.', priority: 'CRITICAL' },
  { component: 'Pastilhas de freio (dianteiras)', intervalKm: 30000, intervalMonths: null, notes: 'Inspecione visualmente a cada 15.000 km. Ao ouvir chiado metálico, troque imediatamente.', priority: 'HIGH' },
  { component: 'Velas de ignição',              intervalKm: 30000, intervalMonths: 36, notes: 'Prefira velas iridium ou platina para melhor partida e durabilidade. NGK ou Bosch são confiáveis.', priority: 'HIGH' },
  { component: 'Filtro de ar do motor',         intervalKm: 20000, intervalMonths: 24, notes: 'Em cidades com muito trânsito ou estradas de terra, reduza para 15.000 km.', priority: 'HIGH' },
  { component: 'Líquido de arrefecimento',      intervalKm: null,  intervalMonths: 24, notes: 'Verifique o nível mensalmente. Troque o fluido a cada 2 anos independente do km.', priority: 'HIGH' },
  { component: 'Filtro de combustível',         intervalKm: 30000, intervalMonths: 36, notes: 'Em uso majoritário de etanol, reduza para 20.000 km. Filtro entupido causa engasgos e partida difícil.', priority: 'MEDIUM' },
  { component: 'Alinhamento e balanceamento',   intervalKm: 10000, intervalMonths: 12, notes: 'Faça após qualquer impacto forte em buraco. Desalinhamento desgasta pneus e compromete estabilidade.', priority: 'MEDIUM' },
  { component: 'Rodízio de pneus',              intervalKm: 10000, intervalMonths: null, notes: 'Mantém desgaste uniforme e prolonga a vida útil dos pneus em até 30%.', priority: 'MEDIUM' },
  { component: 'Amortecedores e molas',         intervalKm: 60000, intervalMonths: null, notes: 'Teste: pressione cada canto do carro — deve parar de oscilar em 1 batida. Vazamento de óleo = troca imediata.', priority: 'MEDIUM' },
  { component: 'Fluido do câmbio automático',   intervalKm: 60000, intervalMonths: null, notes: 'Aplica-se apenas a câmbios automáticos. Fluido degradado é a principal causa de falha prematura do câmbio.', priority: 'MEDIUM' },
  { component: 'Filtro do ar-condicionado (cabine)', intervalKm: 15000, intervalMonths: 12, notes: 'Filtro entupido reduz a eficiência do A/C e circula ar com fungos na cabine.', priority: 'LOW' },
  { component: 'Limpadores de para-brisa',      intervalKm: null,  intervalMonths: 12, notes: 'Troque anualmente ou ao surgir listras e barulho. Visibilidade na chuva é questão de segurança.', priority: 'LOW' },
  { component: 'Bateria',                       intervalKm: null,  intervalMonths: 36, notes: 'Vida útil média de 3–4 anos. Faça teste de carga anualmente após os 2 primeiros anos.', priority: 'LOW' },
]

// ─── Cronogramas ESPECÍFICOS por modelo ───────────────────────────────────────
const specific: Record<string, Item[]> = {

  // VW GOL (1.0 / 1.6 MSI)
  Gol: [
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: 'Motor 1.0 MSI: use 5W30 semissintético no mínimo. Motor 1.6 MSI: 5W40 semissintético. Nunca use mineral.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Troque junto com o óleo. Prefira filtro original VW ou Mann-Filter.', priority: 'CRITICAL' },
    { component: 'Correia dentada',             intervalKm: 60000, intervalMonths: 48, notes: 'Motor interferente — ruptura destroça válvulas e pistões. Troque o kit completo: correia + tensor + roletes + bomba d\'água.', priority: 'CRITICAL' },
    { component: 'Bobinas de ignição',          intervalKm: 60000, intervalMonths: null, notes: 'Motor 1.6 MSI tem falha crônica nas bobinas. Ao sentir engasgos, teste individualmente antes de trocar velas.', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null,  intervalMonths: 24, notes: 'DOT 4. Troca obrigatória a cada 2 anos — absorve umidade e perde eficiência.', priority: 'CRITICAL' },
    { component: 'Velas de ignição (iridium)',  intervalKm: 30000, intervalMonths: 36, notes: 'Use NGK Iridium para melhor partida a frio e durabilidade. Motor 1.0 MSI agradece velas de qualidade.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 25000, intervalMonths: null, notes: 'Inspecione a cada 15.000 km. As pastilhas originais têm durabilidade abaixo da média.', priority: 'HIGH' },
    { component: 'Filtro de ar do motor',       intervalKm: 20000, intervalMonths: 24, notes: 'Troque a cada 20.000 km em uso urbano. Em estradas de terra: 10.000 km.', priority: 'HIGH' },
    { component: 'Líquido de arrefecimento',    intervalKm: null,  intervalMonths: 24, notes: 'Use G12 (rosa/vermelho) conforme especificação VW. Não misture com G11 (azul/verde).', priority: 'HIGH' },
    { component: 'Válvula EGR — limpeza',       intervalKm: 40000, intervalMonths: null, notes: 'Motor 1.6 MSI: a EGR entope com frequência. Limpeza a cada 40.000 km evita perda de potência e fumaça preta.', priority: 'HIGH' },
    { component: 'Filtro de combustível',       intervalKm: 30000, intervalMonths: 36, notes: 'Em uso com etanol: 20.000 km. Filtro entupido = partida difícil e engasgos.', priority: 'MEDIUM' },
    { component: 'Buchas do triângulo (suspensão)', intervalKm: 50000, intervalMonths: null, notes: 'Desgastam rápido em pavimento ruim. Ruído na dianteira ao frear = bucha desgastada.', priority: 'MEDIUM' },
    { component: 'Alinhamento e balanceamento', intervalKm: 10000, intervalMonths: 12, notes: 'Desvio de direção em pista reta = providencie alinhamento imediatamente.', priority: 'MEDIUM' },
    { component: 'Filtro do ar-condicionado',   intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'LOW' },
    { component: 'Bateria',                     intervalKm: null,  intervalMonths: 36, notes: 'Em cidades quentes (Norte/Nordeste), vida útil pode ser de apenas 2 anos. Faça teste anual.', priority: 'LOW' },
  ],

  // VW POLO / VIRTUS (1.0 TSI)
  Polo: [
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: 'Motor 1.0 TSI: OBRIGATÓRIO 5W30 sintético API SP ou superior. Turbo exige óleo de alta qualidade.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Troque junto com o óleo. Original VW ou Mann-Filter.', priority: 'CRITICAL' },
    { component: 'Corrente de distribuição',    intervalKm: null,  intervalMonths: null, notes: 'O TSI usa corrente (sem prazo fixo), mas monitore ruídos a frio. Ruído metálico = inspecione imediatamente.', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null,  intervalMonths: 24, notes: 'DOT 4. Troca bienal obrigatória.', priority: 'CRITICAL' },
    { component: 'Velas de ignição',            intervalKm: 30000, intervalMonths: 36, notes: 'Motor turbo: use as velas especificadas pela VW. Velas erradas causam pré-ignição.', priority: 'HIGH' },
    { component: 'Filtro de ar do motor',       intervalKm: 20000, intervalMonths: 24, notes: 'Turbo é sensível à qualidade do ar. Filtro sujo = perda de potência e consumo elevado.', priority: 'HIGH' },
    { component: 'Fluido do câmbio DSG (7 marchas)', intervalKm: 60000, intervalMonths: null, notes: 'Troca do fluido DSG com fluido original VW G 052 182. Câmbio DSG com solavanco = verifique o fluido primeiro.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 30000, intervalMonths: null, notes: 'Inspecione a cada 15.000 km.', priority: 'HIGH' },
    { component: 'Líquido de arrefecimento',    intervalKm: null,  intervalMonths: 24, notes: 'Use G12 (rosa/vermelho). Não misture tipos de fluido.', priority: 'HIGH' },
    { component: 'Filtro de combustível',       intervalKm: 30000, intervalMonths: 36, notes: null, priority: 'MEDIUM' },
    { component: 'Alinhamento e balanceamento', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'MEDIUM' },
    { component: 'Filtro do ar-condicionado',   intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'LOW' },
    { component: 'Bateria',                     intervalKm: null,  intervalMonths: 36, notes: null, priority: 'LOW' },
  ],

  // CHEVROLET ONIX / ONIX PLUS (1.0 turbo Ecotec)
  Onix: [
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: 'OBRIGATÓRIO: 5W30 sintético API SP. Motor turbo exige qualidade máxima. Nunca use mineral ou semissintético.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre com o óleo. Original GM ou Wix/Mann-Filter.', priority: 'CRITICAL' },
    { component: 'Corrente de distribuição',    intervalKm: null,  intervalMonths: null, notes: 'Motor turbo usa corrente sem prazo fixo. Monitore ruídos ao ligar o motor a frio.', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null,  intervalMonths: 24, notes: 'DOT 3 ou DOT 4. Troca a cada 2 anos obrigatoriamente.', priority: 'CRITICAL' },
    { component: 'Velas de ignição',            intervalKm: 20000, intervalMonths: null, notes: 'Motor turbo 1.0 tem falha crônica em velas — troque a cada 20.000 km com NGK ou Bosch para o modelo. Problema documentado em vários lotes.', priority: 'HIGH' },
    { component: 'Fluido CVT (câmbio)',         intervalKm: 60000, intervalMonths: null, notes: 'Use fluido CVT específico GM DEXRON VI. Fluido degradado = solavanco e escorregamento. Não substitua por genérico.', priority: 'HIGH' },
    { component: 'Filtro de ar do motor',       intervalKm: 15000, intervalMonths: null, notes: 'Motor turbo é sensível. Filtro sujo = perda de boost e consumo alto.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 30000, intervalMonths: null, notes: 'Inspecione a cada 15.000 km. Pastilhas originais têm durabilidade mediana.', priority: 'HIGH' },
    { component: 'Coxins do motor',             intervalKm: 50000, intervalMonths: null, notes: 'Motor turbo vibra mais — coxins se desgastam entre 30.000–60.000 km. Vibração no painel = coxim desgastado.', priority: 'HIGH' },
    { component: 'Líquido de arrefecimento',    intervalKm: null,  intervalMonths: 24, notes: 'Coolant DEX-COOL (laranja). Não misture com outros tipos.', priority: 'HIGH' },
    { component: 'Filtro de combustível',       intervalKm: 30000, intervalMonths: 36, notes: null, priority: 'MEDIUM' },
    { component: 'Alinhamento e balanceamento', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'MEDIUM' },
    { component: 'Filtro do ar-condicionado',   intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'LOW' },
    { component: 'Bateria',                     intervalKm: null,  intervalMonths: 36, notes: null, priority: 'LOW' },
  ],

  // FIAT ARGO / CRONOS / STRADA (Firefly 1.0 / 1.3)
  Argo: [
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: 'Motor Firefly 1.0/1.3: use 5W30 semissintético Selenia ou equivalente API SN. Troca rigorosa a cada 10.000 km.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Troque junto com o óleo. Original Fiat ou Mann-Filter.', priority: 'CRITICAL' },
    { component: 'Corrente de distribuição',    intervalKm: null,  intervalMonths: null, notes: 'Motor Firefly usa corrente sem prazo fixo. Monitore possível vazamento de óleo pelo respiro — problema recorrente do Firefly.', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null,  intervalMonths: 24, notes: 'DOT 4. Troca a cada 2 anos.', priority: 'CRITICAL' },
    { component: 'Caixa de direção elétrica',   intervalKm: null,  intervalMonths: 24, notes: 'Falha crônica documentada no Argo — exige troca completa (~R$2.800) com reincidência. Inspecione qualquer comportamento anormal na direção.', priority: 'HIGH' },
    { component: 'Velas de ignição',            intervalKm: 30000, intervalMonths: 36, notes: 'Motor Firefly: use velas NGK. Troque rigorosamente no prazo — ruído metálico em baixa rotação pode indicar problema nas velas.', priority: 'HIGH' },
    { component: 'Filtro de ar do motor',       intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 30000, intervalMonths: null, notes: 'Inspecione a cada 15.000 km.', priority: 'HIGH' },
    { component: 'Líquido de arrefecimento',    intervalKm: null,  intervalMonths: 24, notes: 'Use Paraflu (azul) ou BASF G11. Verifique mensalmente — motor Firefly pode consumir líquido.', priority: 'HIGH' },
    { component: 'Filtro de combustível',       intervalKm: 30000, intervalMonths: 36, notes: 'Em etanol: 20.000 km.', priority: 'MEDIUM' },
    { component: 'Alinhamento e balanceamento', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'MEDIUM' },
    { component: 'Filtro do ar-condicionado',   intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'LOW' },
    { component: 'Bateria',                     intervalKm: null,  intervalMonths: 36, notes: null, priority: 'LOW' },
  ],

  // FORD KA / ECOSPORT (Dragon 1.0 / 1.5)
  Ka: [
    { component: 'Correia dentada',             intervalKm: 50000, intervalMonths: 48, notes: 'URGENTE: motor Dragon com ruptura documentada antes de 60.000 km. Troque a cada 50.000 km — não confie no prazo do manual. Motor interferente.', priority: 'CRITICAL' },
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: 'Motor Dragon: use 5W30 semissintético API SN. Evite produtos sem certificação.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Troque junto com o óleo.', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null,  intervalMonths: 24, notes: 'DOT 4. Troca bienal.', priority: 'CRITICAL' },
    { component: 'Velas de ignição',            intervalKm: 30000, intervalMonths: 36, notes: 'Motor Dragon: use velas NGK BKR6EK ou equivalente especificado pela Ford.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 30000, intervalMonths: null, notes: 'Inspecione a cada 15.000 km.', priority: 'HIGH' },
    { component: 'Filtro de ar do motor',       intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH' },
    { component: 'Líquido de arrefecimento',    intervalKm: null,  intervalMonths: 24, notes: 'Use Motorcraft Premium Coolant (laranja). Não misture.', priority: 'HIGH' },
    { component: 'Vedação das lanternas traseiras', intervalKm: null, intervalMonths: 24, notes: 'Problema recorrente no Ka: vedação resseca e permite entrada de água no porta-malas. Hidrate com silicone semestralmente.', priority: 'MEDIUM' },
    { component: 'Filtro de combustível',       intervalKm: 30000, intervalMonths: 36, notes: null, priority: 'MEDIUM' },
    { component: 'Alinhamento e balanceamento', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'MEDIUM' },
    { component: 'Filtro do ar-condicionado',   intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'LOW' },
    { component: 'Bateria',                     intervalKm: null,  intervalMonths: 36, notes: null, priority: 'LOW' },
  ],

  // VW AMAROK (2.0 TDI diesel)
  Amarok: [
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: 'OBRIGATÓRIO: 5W30 sintético com aprovação VW 507.00 (ex: Castrol Edge 5W30 LL). Nunca use óleo sem essa aprovação no motor TDI.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Original VW ou Mann-Filter. Troque sempre com o óleo.', priority: 'CRITICAL' },
    { component: 'Filtro de combustível diesel', intervalKm: 20000, intervalMonths: 24, notes: 'CRÍTICO: a troca deve ser feita SEM deixar entrar ar no sistema. Ar no sistema common rail contamina bomba e bicos — custo de reparo R$20.000+. Use apenas oficinas especializadas em diesel.', priority: 'CRITICAL' },
    { component: 'Bomba CP4 — monitoramento',   intervalKm: null,  intervalMonths: 6,  notes: 'A bomba Bosch CP4 pode gerar limalha metálica quando falha. Use SOMENTE diesel S10 de postos de bandeira. Qualquer ruído metálico no motor = inspecione imediatamente.', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null,  intervalMonths: 24, notes: 'DOT 4. Troca a cada 2 anos.', priority: 'CRITICAL' },
    { component: 'Correia dentada',             intervalKm: 120000, intervalMonths: 96, notes: 'Motor 2.0 TDI: troque o kit completo (correia + tensor + roletes). Motor interferente.', priority: 'HIGH' },
    { component: 'Velas de aquecimento',        intervalKm: 80000, intervalMonths: null, notes: 'Troca preventiva a cada 80.000 km. Falha = dificuldade de partida a frio e fumaça branca excessiva.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 40000, intervalMonths: null, notes: 'Inspecione a cada 20.000 km. A Amarok é pesada — desgaste maior que em carros de passeio.', priority: 'HIGH' },
    { component: 'Líquido de arrefecimento',    intervalKm: null,  intervalMonths: 24, notes: 'G12+ (rosa/roxo). Não misture com outros tipos.', priority: 'HIGH' },
    { component: 'Fluido da caixa de câmbio',   intervalKm: 60000, intervalMonths: null, notes: 'Manual: MTF 1 VW. Automático: ATF VW. Use apenas fluido original VW.', priority: 'HIGH' },
    { component: 'Filtro de ar do motor',       intervalKm: 20000, intervalMonths: 24, notes: 'Motor diesel é sensível à qualidade do ar. Filtro sujo = fumaça preta e perda de torque.', priority: 'HIGH' },
    { component: 'Alinhamento e balanceamento', intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'MEDIUM' },
    { component: 'Filtro do ar-condicionado',   intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'LOW' },
  ],

  // FORD RANGER (3.2 diesel)
  Ranger: [
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: 'Motor 3.2 Duratorq: use 5W30 sintético com aprovação Ford WSS-M2C913. Nível baixo = risco de gripamento.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre com o óleo.', priority: 'CRITICAL' },
    { component: 'Filtro de combustível diesel', intervalKm: 20000, intervalMonths: 24, notes: 'Troca em oficina especializada em diesel. Entrada de ar no sistema common rail = bicos danificados.', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null,  intervalMonths: 24, notes: 'DOT 4. Troca bienal.', priority: 'CRITICAL' },
    { component: 'Injetores diesel — inspeção', intervalKm: 50000, intervalMonths: null, notes: 'Os bicos injetores tendem a travar na posição aberta. Diagnóstico a cada 50.000 km com scanner diesel profissional.', priority: 'HIGH' },
    { component: 'Correia dentada',             intervalKm: 120000, intervalMonths: 96, notes: 'Motor interferente. Troque o kit completo com bomba d\'água.', priority: 'HIGH' },
    { component: 'Velas de aquecimento',        intervalKm: 80000, intervalMonths: null, notes: 'Troca preventiva. Falha = partida difícil e fumaça branca.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 35000, intervalMonths: null, notes: 'Caminhonete pesada desgasta freios mais rápido. Inspecione a cada 20.000 km.', priority: 'HIGH' },
    { component: 'Fluido da caixa de transferência', intervalKm: 40000, intervalMonths: null, notes: 'Ranger com 4x4: troque o fluido da caixa de transferência e dos diferenciais a cada 40.000 km.', priority: 'HIGH' },
    { component: 'Diferencial dianteiro e traseiro', intervalKm: 40000, intervalMonths: null, notes: 'Use fluido 75W90 sintético especificado pela Ford.', priority: 'HIGH' },
    { component: 'Filtro de ar do motor',       intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'MEDIUM' },
    { component: 'Alinhamento e balanceamento', intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'MEDIUM' },
    { component: 'Filtro do ar-condicionado',   intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'LOW' },
  ],

  // HONDA CIVIC (1.5 turbo 2017+)
  Civic: [
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: 'OBRIGATÓRIO: 0W20 sintético Honda Genuine Motor Oil ou equivalente API SN+ (ex: Mobil 1 0W20). Motor turbo de alta compressão — nunca use viscosidade diferente.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre com o óleo. Filtro Honda ou Denso.', priority: 'CRITICAL' },
    { component: 'Corrente de distribuição',    intervalKm: null,  intervalMonths: null, notes: 'Motor 1.5 turbo usa corrente sem prazo fixo. Monitore nível de óleo — consumo excessivo pode afetar a corrente. Bomba de combustível com recall (2017-2021): confirme com Honda.', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null,  intervalMonths: 24, notes: 'DOT 3 ou DOT 4. Troca bienal.', priority: 'CRITICAL' },
    { component: 'Velas de ignição (iridium)',  intervalKm: 30000, intervalMonths: 36, notes: 'Motor turbo: use apenas velas iridium NGK especificadas pela Honda. Velas erradas causam pré-ignição.', priority: 'HIGH' },
    { component: 'Coxim hidráulico do motor',   intervalKm: 50000, intervalMonths: null, notes: 'Desgaste documentado com menos de 40.000 km. Batida seca no capô ao soltar o acelerador = coxim ruim.', priority: 'HIGH' },
    { component: 'Filtro de ar do motor',       intervalKm: 20000, intervalMonths: 24, notes: 'Turbo é sensível à qualidade do ar. Filtro sujo = perda de boost.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 30000, intervalMonths: null, notes: 'Inspecione a cada 15.000 km.', priority: 'HIGH' },
    { component: 'Líquido de arrefecimento',    intervalKm: null,  intervalMonths: 36, notes: 'Honda Long Life Coolant (azul). Troca a cada 3 anos nos anos subsequentes.', priority: 'HIGH' },
    { component: 'Fluido CVT (câmbio)',         intervalKm: 40000, intervalMonths: null, notes: 'CVT do Civic 1.5: use Honda HCF-2. Troca a cada 40.000 km para evitar falha precoce documentada no modelo.', priority: 'HIGH' },
    { component: 'Filtro de combustível',       intervalKm: 40000, intervalMonths: null, notes: null, priority: 'MEDIUM' },
    { component: 'Alinhamento e balanceamento', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'MEDIUM' },
    { component: 'Filtro do ar-condicionado',   intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'LOW' },
  ],

  // JEEP RENEGADE (1.3 turbo DDCT)
  Renegade: [
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: 'Motor 1.3 GSE turbo: OBRIGATÓRIO 0W30 sintético Mopar ou equivalente API SP. Viscosidade diferente invalida garantia.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre com o óleo. Original Mopar.', priority: 'CRITICAL' },
    { component: 'Fluido de embreagem DDCT',    intervalKm: 60000, intervalMonths: null, notes: 'CRÍTICO: o câmbio DDCT é o maior problema crônico do Renegade. Troca com fluido Mopar original é a manutenção preventiva mais importante. Fluido degradado = falha do câmbio.', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null,  intervalMonths: 24, notes: 'DOT 4. Troca bienal.', priority: 'CRITICAL' },
    { component: 'Corrente de distribuição',    intervalKm: null,  intervalMonths: null, notes: 'Motor 1.3 turbo usa corrente sem prazo fixo. Monitore ruídos na partida a frio.', priority: 'CRITICAL' },
    { component: 'Pastilhas de freio',          intervalKm: 25000, intervalMonths: null, notes: 'Desgaste acelerado em uso urbano. Inspecione a cada 15.000 km.', priority: 'HIGH' },
    { component: 'Filtro de ar do motor',       intervalKm: 20000, intervalMonths: 24, notes: 'Motor turbo sensível. Não negligencie.', priority: 'HIGH' },
    { component: 'Velas de ignição',            intervalKm: 30000, intervalMonths: 36, notes: 'Use velas especificadas Mopar para o GSE 1.3 T270.', priority: 'HIGH' },
    { component: 'Drenos do teto solar',        intervalKm: null,  intervalMonths: 6,  notes: 'Limpe os 4 drenos do teto solar com ar comprimido a cada 6 meses. Drenos entupidos = infiltração d\'água na cabine.', priority: 'HIGH' },
    { component: 'Líquido de arrefecimento',    intervalKm: null,  intervalMonths: 24, notes: 'HOAT (laranja). Não misture tipos.', priority: 'HIGH' },
    { component: 'Bateria AGM (start-stop)',     intervalKm: null,  intervalMonths: 36, notes: 'OBRIGATÓRIO: bateria AGM. Substituir por bateria convencional danifica o alternador e o sistema de carga.', priority: 'HIGH' },
    { component: 'Filtro de combustível',       intervalKm: 30000, intervalMonths: 36, notes: null, priority: 'MEDIUM' },
    { component: 'Alinhamento e balanceamento', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'MEDIUM' },
    { component: 'Filtro do ar-condicionado',   intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'LOW' },
  ],

  // CHEVROLET TRACKER (1.0 turbo Ecotec)
  Tracker: [
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: 'Motor 1.0 turbo Ecotec: 5W30 sintético API SP. Mesmo especificação do Onix turbo — não economize no óleo.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre com o óleo.', priority: 'CRITICAL' },
    { component: 'Corrente de distribuição',    intervalKm: null,  intervalMonths: null, notes: 'Motor turbo usa corrente sem prazo fixo. Monitore ruídos.', priority: 'CRITICAL' },
    { component: 'Fluido CVT',                  intervalKm: 60000, intervalMonths: null, notes: 'Use fluido CVT específico GM DEXRON VI. Fluido genérico danifica o câmbio. Solavanco na saída do repouso = verifique o fluido.', priority: 'HIGH' },
    { component: 'Fluido de freio',             intervalKm: null,  intervalMonths: 24, notes: 'DOT 4. Troca bienal.', priority: 'CRITICAL' },
    { component: 'Velas de ignição',            intervalKm: 20000, intervalMonths: null, notes: 'Mesmo problema do Onix turbo: falhas prematuras. Troque a cada 20.000 km com NGK ou Bosch especificado.', priority: 'HIGH' },
    { component: 'Filtro de ar do motor',       intervalKm: 15000, intervalMonths: null, notes: 'Turbo é sensível. Reduza para 12.000 km em cidades com muito trânsito.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 30000, intervalMonths: null, notes: 'Inspecione a cada 15.000 km.', priority: 'HIGH' },
    { component: 'Atualização de software (injeção)', intervalKm: null, intervalMonths: 12, notes: 'Mantenha o software de injeção atualizado na concessionária. Bugs no mapa de injeção causam consumo elevado e falhas.', priority: 'MEDIUM' },
    { component: 'Filtro de combustível',       intervalKm: 30000, intervalMonths: 36, notes: null, priority: 'MEDIUM' },
    { component: 'Alinhamento e balanceamento', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'MEDIUM' },
    { component: 'Filtro do ar-condicionado',   intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'LOW' },
    { component: 'Bateria',                     intervalKm: null,  intervalMonths: 36, notes: null, priority: 'LOW' },
  ],

  // FIAT TORO (2.0 diesel)
  Toro: [
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: 'Motor 2.0 diesel Multijet: use 5W30 ou 0W30 sintético com aprovação Fiat 9.55535-S1. Selenia Starturbo ou equivalente.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Original Fiat ou Mann-Filter.', priority: 'CRITICAL' },
    { component: 'Filtro de combustível diesel', intervalKm: 20000, intervalMonths: 24, notes: 'Troca em oficina com experiência em diesel common rail. Entrada de ar contamina o sistema de injeção.', priority: 'CRITICAL' },
    { component: 'Filtro DPF — regeneração',    intervalKm: null,  intervalMonths: 1,  notes: 'O filtro de partículas (DPF) entope em uso urbano. Faça pelo menos 30 km de rodovia por semana em 2ª ou 3ª marcha em 2.500 rpm para forçar regeneração. Limpeza profissional: ~R$1.500.', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null,  intervalMonths: 24, notes: 'DOT 4. Troca bienal.', priority: 'CRITICAL' },
    { component: 'Correia dentada',             intervalKm: 120000, intervalMonths: 96, notes: 'Motor interferente. Troque o kit completo.', priority: 'HIGH' },
    { component: 'Velas de aquecimento',        intervalKm: 80000, intervalMonths: null, notes: 'Troca preventiva. Falha = partida difícil no frio e fumaça branca.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 35000, intervalMonths: null, notes: 'Caminhonete com diesel — desgaste maior. Inspecione a cada 20.000 km.', priority: 'HIGH' },
    { component: 'Sistema AdBlue / arla-32',    intervalKm: null,  intervalMonths: 3,  notes: 'Verifique o nível do ARLA-32 a cada 3 meses. Nível baixo gera alarme e, se ignorado, limita a potência do motor.', priority: 'HIGH' },
    { component: 'Filtro de ar do motor',       intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH' },
    { component: 'Alinhamento e balanceamento', intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'MEDIUM' },
    { component: 'Filtro do ar-condicionado',   intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'LOW' },
  ],

  // VW T-CROSS (1.0 TSI)
  'T-Cross': [
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: '5W30 sintético com aprovação VW 504.00 ou 507.00. Turbo exige qualidade — nunca use mineral.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Original VW ou Mann-Filter.', priority: 'CRITICAL' },
    { component: 'Corrente de distribuição',    intervalKm: null,  intervalMonths: null, notes: 'Motor TSI usa corrente sem prazo fixo. Monitore ruídos na partida a frio.', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null,  intervalMonths: 24, notes: 'DOT 4. Troca bienal.', priority: 'CRITICAL' },
    { component: 'Eixo traseiro — verificação', intervalKm: null,  intervalMonths: 12, notes: 'Verifique se há recall para o seu chassi (trinca no eixo de torção traseiro, 2019–2021). Consulte a VW com o número de chassi.', priority: 'CRITICAL' },
    { component: 'Fluido do câmbio DSG',        intervalKm: 60000, intervalMonths: null, notes: 'Câmbio de dupla embreagem: fluido DSG original VW G 052 182 ou G 060 162. Solavanco em baixa velocidade = verifique o fluido.', priority: 'HIGH' },
    { component: 'Compressor do A/C — inspeção', intervalKm: 40000, intervalMonths: null, notes: 'Falha frequente entre 40.000–80.000 km. Custo de troca R$2.000–5.000. Monitore qualquer perda de eficiência do A/C.', priority: 'HIGH' },
    { component: 'Velas de ignição',            intervalKm: 30000, intervalMonths: 36, notes: 'Motor 1.0 TSI: use velas especificadas pela VW.', priority: 'HIGH' },
    { component: 'Filtro de ar do motor',       intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 30000, intervalMonths: null, notes: 'Inspecione a cada 15.000 km.', priority: 'HIGH' },
    { component: 'Filtro de combustível',       intervalKm: 30000, intervalMonths: 36, notes: null, priority: 'MEDIUM' },
    { component: 'Alinhamento e balanceamento', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'MEDIUM' },
    { component: 'Filtro do ar-condicionado',   intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'LOW' },
  ],

  // RENAULT KWID / SANDERO (1.0 SCe)
  Kwid: [
    { component: 'Óleo do motor',               intervalKm: 7500,  intervalMonths: 12, notes: 'Motor 1.0 SCe: use 5W40 semissintético. Intervalo reduzido para 7.500 km no Brasil devido ao etanol e ao calor.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 7500,  intervalMonths: 12, notes: 'Troque junto com o óleo.', priority: 'CRITICAL' },
    { component: 'Correia dentada',             intervalKm: 60000, intervalMonths: 48, notes: 'Motor interferente — ruptura = motor destruído. Verifique também o recall da coluna de direção e eixo traseiro (2017–2022).', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null,  intervalMonths: 24, notes: 'DOT 4. Troca bienal.', priority: 'CRITICAL' },
    { component: 'Velas de ignição',            intervalKm: 30000, intervalMonths: 36, notes: 'Troque rigorosamente — motor SCe é sensível à qualidade das velas.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 30000, intervalMonths: null, notes: null, priority: 'HIGH' },
    { component: 'Filtro de ar do motor',       intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'HIGH' },
    { component: 'Líquido de arrefecimento',    intervalKm: null,  intervalMonths: 24, notes: null, priority: 'HIGH' },
    { component: 'Filtro de combustível',       intervalKm: 20000, intervalMonths: 24, notes: 'Em etanol: 15.000 km.', priority: 'MEDIUM' },
    { component: 'Alinhamento e balanceamento', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'MEDIUM' },
    { component: 'Filtro do ar-condicionado',   intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'LOW' },
  ],

  // TOYOTA SW4 — alias para Hilux (mesmo motor 1GD-FTV 2.8 diesel, ver aliases)

  // FIAT STRADA / CRONOS (1.3 GSE)
  Strada: [
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: 'Motor 1.3 GSE: use 5W30 semissintético Selenia ou equivalente API SN. Monitore vazamento pelo respiro — problema recorrente do motor Fiat GSE.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre com o óleo.', priority: 'CRITICAL' },
    { component: 'Corrente de distribuição',    intervalKm: null,  intervalMonths: null, notes: 'Motor GSE usa corrente sem prazo fixo. Monitore dificuldade de partida a frio (problema documentado em modelos 2023+).', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null,  intervalMonths: 24, notes: 'DOT 4. Troca bienal.', priority: 'CRITICAL' },
    { component: 'Velas de ignição',            intervalKm: 30000, intervalMonths: 36, notes: 'Use NGK especificada para o GSE. Crepitação ao engatar marchas no frio = normal (é o câmbio, não as velas).', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 30000, intervalMonths: null, notes: 'Inspecione a cada 15.000 km.', priority: 'HIGH' },
    { component: 'Filtro de ar do motor',       intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH' },
    { component: 'Líquido de arrefecimento',    intervalKm: null,  intervalMonths: 24, notes: 'Paraflu ou BASF G11 (azul).', priority: 'HIGH' },
    { component: 'Filtro de combustível',       intervalKm: 30000, intervalMonths: 36, notes: null, priority: 'MEDIUM' },
    { component: 'Alinhamento e balanceamento', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'MEDIUM' },
    { component: 'Filtro do ar-condicionado',   intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'LOW' },
  ],

  // ─── CARROS ADICIONAIS ────────────────────────────────────────────────────────

  // HYUNDAI HB20 (1.0 / 1.6 Kappa)
  HB20: [
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: 'Motor 1.0 Kappa: 5W30 semissintético API SP. Motor 1.6 Kappa: 5W30 semissintético ou sintético. Verifique o nível mensalmente.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Troque sempre com o óleo. Original Hyundai ou Bosch.', priority: 'CRITICAL' },
    { component: 'Corrente de distribuição',    intervalKm: null,  intervalMonths: null, notes: 'Motor Kappa usa corrente sem prazo fixo. Monitore ruídos ao ligar a frio — barulho de corrente solta indica desgaste do tensor.', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null,  intervalMonths: 24, notes: 'DOT 3 ou DOT 4. Troca obrigatória a cada 2 anos.', priority: 'CRITICAL' },
    { component: 'Velas de ignição (iridium)',  intervalKm: 40000, intervalMonths: 48, notes: 'Velas iridium NGK ou Denso especificadas pela Hyundai para o Kappa. Intervalo longo mas não adie — velas ruins causam falhas de ignição.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 30000, intervalMonths: null, notes: 'Inspecione a cada 15.000 km.', priority: 'HIGH' },
    { component: 'Filtro de ar do motor',       intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH' },
    { component: 'Líquido de arrefecimento',    intervalKm: null,  intervalMonths: 24, notes: 'Hyundai Long Life Coolant (rosa). Não misture com outros tipos.', priority: 'HIGH' },
    { component: 'Fluido CVT (câmbio)',         intervalKm: 60000, intervalMonths: null, notes: 'CVT do HB20: use fluido CVT Hyundai SP-IV M ou equivalente certificado. Fluido genérico danifica progressivamente o câmbio.', priority: 'HIGH' },
    { component: 'Filtro de combustível',       intervalKm: 30000, intervalMonths: 36, notes: 'Em uso majoritário de etanol: 20.000 km.', priority: 'MEDIUM' },
    { component: 'Alinhamento e balanceamento', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'MEDIUM' },
    { component: 'Filtro do ar-condicionado',   intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'LOW' },
    { component: 'Bateria',                     intervalKm: null,  intervalMonths: 36, notes: null, priority: 'LOW' },
  ],

  // HYUNDAI CRETA (1.0 Turbo / 2.0)
  Creta: [
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: 'Motor 1.0 turbo: 0W20 ou 5W30 sintético API SP. Motor 2.0: 5W30 semissintético. Turbo 1.0 exige viscosidade baixa para eficiência.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Troque junto com o óleo.', priority: 'CRITICAL' },
    { component: 'Corrente de distribuição',    intervalKm: null,  intervalMonths: null, notes: 'Ambos os motores usam corrente sem prazo fixo. Monitore ruídos metálicos a frio.', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null,  intervalMonths: 24, notes: 'DOT 4. Troca bienal.', priority: 'CRITICAL' },
    { component: 'Fluido DCT / CVT',            intervalKm: 60000, intervalMonths: null, notes: 'Motor 1.0 turbo com DCT de 7 marchas: fluido DCT SP-4 M Hyundai. CVT do 2.0: fluido SP-IV M. Use apenas fluido original — câmbios dual-clutch são sensíveis à qualidade do fluido.', priority: 'HIGH' },
    { component: 'Velas de ignição',            intervalKm: 40000, intervalMonths: 48, notes: 'Velas iridium especificadas para o motor. Turbo 1.0: vela correta evita pré-ignição.', priority: 'HIGH' },
    { component: 'Filtro de ar do motor',       intervalKm: 20000, intervalMonths: 24, notes: 'Motor turbo é sensível à qualidade do ar.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 30000, intervalMonths: null, notes: 'Inspecione a cada 15.000 km.', priority: 'HIGH' },
    { component: 'Líquido de arrefecimento',    intervalKm: null,  intervalMonths: 24, notes: 'Hyundai LLC (rosa/vermelho). Não misture tipos.', priority: 'HIGH' },
    { component: 'Filtro de combustível',       intervalKm: 30000, intervalMonths: 36, notes: null, priority: 'MEDIUM' },
    { component: 'Alinhamento e balanceamento', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'MEDIUM' },
    { component: 'Filtro do ar-condicionado',   intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'LOW' },
    { component: 'Bateria',                     intervalKm: null,  intervalMonths: 36, notes: null, priority: 'LOW' },
  ],

  // TOYOTA COROLLA (2.0 Dynamic Force)
  Corolla: [
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: 'Motor 2.0 Dynamic Force: OBRIGATÓRIO 0W20 sintético Toyota Genuine ou equivalente API SP GF-6A. Viscosidade diferente reduz eficiência e anula garantia.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Original Toyota ou Denso.', priority: 'CRITICAL' },
    { component: 'Corrente de distribuição',    intervalKm: null,  intervalMonths: null, notes: 'Motor 2.0 usa corrente sem prazo fixo. Manutenção com óleo correto (0W20) é crucial para a longevidade da corrente.', priority: 'CRITICAL' },
    { component: 'Fluido CVT Direct-Shift',     intervalKm: 80000, intervalMonths: null, notes: 'CRÍTICO: o Corolla 2.0 usa o CVT Direct-Shift (com embreagem de partida). Use APENAS Toyota CVT Fluid FE ou TC. Fluido errado = R$20.000+ em reparos. Não existe substituto genérico aprovado.', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null,  intervalMonths: 24, notes: 'DOT 3 ou DOT 4. Troca a cada 2 anos.', priority: 'CRITICAL' },
    { component: 'Velas de ignição (iridium)',  intervalKm: 100000, intervalMonths: null, notes: 'Motor 2.0: velas iridium Denso com intervalo de 100.000 km. Mesmo assim, verifique o estado após 60.000 km.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 30000, intervalMonths: null, notes: 'Inspecione a cada 15.000 km.', priority: 'HIGH' },
    { component: 'Filtro de ar do motor',       intervalKm: 30000, intervalMonths: 24, notes: null, priority: 'HIGH' },
    { component: 'Líquido de arrefecimento',    intervalKm: null,  intervalMonths: 36, notes: 'Toyota Super Long Life Coolant (rosa). Troca a cada 3 anos na primeira, depois a cada 2 anos.', priority: 'HIGH' },
    { component: 'Filtro de combustível',       intervalKm: 40000, intervalMonths: null, notes: null, priority: 'MEDIUM' },
    { component: 'Alinhamento e balanceamento', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'MEDIUM' },
    { component: 'Filtro do ar-condicionado',   intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'LOW' },
    { component: 'Bateria',                     intervalKm: null,  intervalMonths: 36, notes: null, priority: 'LOW' },
  ],

  // TOYOTA HILUX (2.8 diesel 1GD-FTV)
  Hilux: [
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: 'Motor 2.8 1GD-FTV diesel: OBRIGATÓRIO 5W30 sintético com aprovação Toyota C3 (ex: Castrol Edge 5W30 C3). Nunca use óleo sem aprovação C3.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Original Toyota ou Denso.', priority: 'CRITICAL' },
    { component: 'Filtro de combustível diesel', intervalKm: 20000, intervalMonths: 24, notes: 'Troca com drenagem do separador de água. Execute em oficina especializada em diesel — entrada de ar no sistema common rail danifica injetores (custo R$15.000+).', priority: 'CRITICAL' },
    { component: 'Separador de água — dreno',   intervalKm: 10000, intervalMonths: null, notes: 'Drene o separador de água a cada 10.000 km ou ao acender o indicador. Água no diesel destrói os injetores piezoelétricos.', priority: 'CRITICAL' },
    { component: 'Corrente de distribuição',    intervalKm: null,  intervalMonths: null, notes: 'Motor 1GD-FTV usa corrente sem prazo fixo. Ruído mecânico a frio = inspecione imediatamente.', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null,  intervalMonths: 24, notes: 'DOT 3. Troca bienal.', priority: 'CRITICAL' },
    { component: 'Filtro DPF — manutenção',     intervalKm: null,  intervalMonths: 6,  notes: 'Faça regularmente percursos de 30+ km em rodovia (80-100 km/h) para forçar regeneração ativa. Uso exclusivamente urbano entope o DPF. Limpeza profissional: R$1.500–3.000.', priority: 'HIGH' },
    { component: 'Velas de aquecimento',        intervalKm: 80000, intervalMonths: null, notes: 'Troca preventiva. Falha = partida difícil abaixo de 15°C e fumaça branca excessiva.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 40000, intervalMonths: null, notes: 'Caminhonete pesada — desgaste maior. Inspecione a cada 20.000 km.', priority: 'HIGH' },
    { component: 'Fluido da caixa de transferência e diferencial', intervalKm: 40000, intervalMonths: null, notes: 'Hilux 4x4: troque fluido da caixa de transferência e diferenciais a cada 40.000 km com 75W90 sintético Toyota.', priority: 'HIGH' },
    { component: 'Filtro de ar do motor',       intervalKm: 20000, intervalMonths: 24, notes: 'Motor diesel sensível. Em estradas de terra: 10.000 km.', priority: 'HIGH' },
    { component: 'Alinhamento e balanceamento', intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'MEDIUM' },
    { component: 'Filtro do ar-condicionado',   intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'LOW' },
  ],

  // TOYOTA YARIS (1.5 XLS/XS)
  Yaris: [
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: 'Motor 2NR-VE 1.5: use 5W30 semissintético ou sintético API SP. Viscosidade 5W30 é a mais indicada para o clima tropical.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Original Toyota ou Denso.', priority: 'CRITICAL' },
    { component: 'Corrente de distribuição',    intervalKm: null,  intervalMonths: null, notes: 'Motor 2NR-VE usa corrente sem prazo fixo. Manutenção correta do óleo é fundamental para longevidade.', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null,  intervalMonths: 24, notes: 'DOT 3 ou DOT 4. Troca bienal.', priority: 'CRITICAL' },
    { component: 'Fluido CVT',                  intervalKm: 80000, intervalMonths: null, notes: 'Yaris com câmbio CVT: use Toyota CVT Fluid TC. Solavanco na saída do repouso = sinal de desgaste do fluido.', priority: 'HIGH' },
    { component: 'Velas de ignição',            intervalKm: 40000, intervalMonths: 48, notes: 'Use velas iridium especificadas pela Toyota.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 30000, intervalMonths: null, notes: 'Inspecione a cada 15.000 km.', priority: 'HIGH' },
    { component: 'Filtro de ar do motor',       intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH' },
    { component: 'Líquido de arrefecimento',    intervalKm: null,  intervalMonths: 36, notes: 'Toyota Super Long Life Coolant (rosa).', priority: 'HIGH' },
    { component: 'Filtro de combustível',       intervalKm: 40000, intervalMonths: null, notes: null, priority: 'MEDIUM' },
    { component: 'Alinhamento e balanceamento', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'MEDIUM' },
    { component: 'Filtro do ar-condicionado',   intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'LOW' },
    { component: 'Bateria',                     intervalKm: null,  intervalMonths: 36, notes: null, priority: 'LOW' },
  ],

  // CHEVROLET S10 (2.8 Duramax diesel LWN)
  S10: [
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: 'Motor 2.8 Duramax LWN: use 5W30 sintético com aprovação Dexos2 (ex: Mobil Delvac Modern 5W30) ou 10W40 semissintético API CI-4. Dexos2 obrigatório para câmbios automáticos.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Original GM ou Wix.', priority: 'CRITICAL' },
    { component: 'Correia dentada (diesel único!)', intervalKm: 100000, intervalMonths: null, notes: 'ATENÇÃO: o Duramax LWN é um dos raros motores diesel com CORREIA (não corrente)! Troque a cada 100.000 km em uso severo. Motor interferente. Ignorar essa manutenção = motor destruído.', priority: 'CRITICAL' },
    { component: 'Filtro de combustível diesel', intervalKm: 20000, intervalMonths: 24, notes: 'Inclui dreno do separador de água. Use diesel S10 de postos de qualidade.', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null,  intervalMonths: 24, notes: 'DOT 4. Troca bienal.', priority: 'CRITICAL' },
    { component: 'Velas de aquecimento',        intervalKm: 80000, intervalMonths: null, notes: 'Troca preventiva. Falha no Duramax = partida difícil e fumaça branca.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 40000, intervalMonths: null, notes: 'Caminhonete pesada. Inspecione a cada 20.000 km.', priority: 'HIGH' },
    { component: 'Fluido da caixa de transferência e diferencial', intervalKm: 40000, intervalMonths: null, notes: 'S10 4x4: troque todos os fluidos off-road a cada 40.000 km.', priority: 'HIGH' },
    { component: 'Fluido câmbio automático (Allison)', intervalKm: 60000, intervalMonths: null, notes: 'S10 automática: use Dexron VI GM. Câmbio Allison tem longa vida com fluido trocado no prazo.', priority: 'HIGH' },
    { component: 'Filtro de ar do motor',       intervalKm: 20000, intervalMonths: 24, notes: 'Motor diesel sensível. Em estradas de terra: 10.000 km.', priority: 'HIGH' },
    { component: 'Alinhamento e balanceamento', intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'MEDIUM' },
    { component: 'Filtro do ar-condicionado',   intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'LOW' },
  ],

  // VW SAVEIRO (1.6 MSI)
  Saveiro: [
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: 'Motor 1.6 MSI: use 5W40 semissintético com aprovação VW 502.00. O 1.6 MSI tolera melhor o 5W40 do que o 5W30 no clima brasileiro.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Original VW ou Mann-Filter.', priority: 'CRITICAL' },
    { component: 'Correia dentada',             intervalKm: 120000, intervalMonths: 54, notes: 'Motor 1.6 MSI: troque com kit completo (tensor + roletes + bomba d\'água) a cada 120.000 km ou 54 meses — o que vier primeiro. Motor interferente.', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null,  intervalMonths: 24, notes: 'DOT 4. Troca bienal.', priority: 'CRITICAL' },
    { component: 'Bobinas de ignição',          intervalKm: 60000, intervalMonths: null, notes: 'Motor 1.6 MSI tem falha crônica nas bobinas. Substitua preventivamente a cada 60.000 km ou ao primeiro sinal de engasgo.', priority: 'HIGH' },
    { component: 'Velas de ignição',            intervalKm: 30000, intervalMonths: 36, notes: 'NGK Iridium especificadas para o 1.6 MSI.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 25000, intervalMonths: null, notes: 'Inspecione a cada 15.000 km. Saveiro com carga acelera o desgaste das pastilhas.', priority: 'HIGH' },
    { component: 'Filtro de ar do motor',       intervalKm: 20000, intervalMonths: 24, notes: 'Saveiro muitas vezes opera em ambientes com poeira. Reduza para 10.000 km em uso em obra ou estradas de terra.', priority: 'HIGH' },
    { component: 'Líquido de arrefecimento',    intervalKm: null,  intervalMonths: 24, notes: 'G12 (rosa/vermelho). Não misture com G11.', priority: 'HIGH' },
    { component: 'Válvula EGR — limpeza',       intervalKm: 40000, intervalMonths: null, notes: 'Motor 1.6 MSI: mesma falha do Gol — EGR entope frequentemente. Limpeza a cada 40.000 km.', priority: 'MEDIUM' },
    { component: 'Filtro de combustível',       intervalKm: 30000, intervalMonths: 36, notes: null, priority: 'MEDIUM' },
    { component: 'Alinhamento e balanceamento', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'MEDIUM' },
    { component: 'Filtro do ar-condicionado',   intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'LOW' },
  ],

  // VW UP! (1.0 TSI turbo)
  Up: [
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: 'Motor 1.0 TSI: use 5W40 sintético com aprovação VW 504.00 (ex: Castrol Edge 5W40). Motor de alta compressão — nunca use mineral.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Original VW ou Mann-Filter.', priority: 'CRITICAL' },
    { component: 'Correia dentada',             intervalKm: 120000, intervalMonths: 54, notes: 'Motor 1.0 TSI do Up! usa CORREIA (não corrente)! Troque a cada 120.000 km ou 54 meses com kit completo. Motor interferente — ruptura = motor destruído.', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null,  intervalMonths: 24, notes: 'DOT 4. Troca bienal.', priority: 'CRITICAL' },
    { component: 'Velas de ignição',            intervalKm: 30000, intervalMonths: 36, notes: 'Motor turbo: use velas especificadas pela VW. Velas de qualidade inferior causam pré-ignição no motor de alta compressão.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 25000, intervalMonths: null, notes: 'Up! é leve — inspecione a cada 15.000 km.', priority: 'HIGH' },
    { component: 'Filtro de ar do motor',       intervalKm: 20000, intervalMonths: 24, notes: 'Turbo é sensível.', priority: 'HIGH' },
    { component: 'Líquido de arrefecimento',    intervalKm: null,  intervalMonths: 24, notes: 'G12 (rosa/vermelho). Motor pequeno com turbo gera bastante calor — verifique o nível mensalmente.', priority: 'HIGH' },
    { component: 'Filtro de combustível',       intervalKm: 30000, intervalMonths: 36, notes: null, priority: 'MEDIUM' },
    { component: 'Alinhamento e balanceamento', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'MEDIUM' },
    { component: 'Filtro do ar-condicionado',   intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'LOW' },
    { component: 'Bateria',                     intervalKm: null,  intervalMonths: 36, notes: null, priority: 'LOW' },
  ],

  // NISSAN KICKS (1.6 HR16DE + CVT)
  Kicks: [
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: 'Motor HR16DE 1.6: use 5W30 semissintético API SN+. Motor confiável — a manutenção do óleo é o item mais crítico para a longevidade.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Original Nissan ou Wix.', priority: 'CRITICAL' },
    { component: 'Corrente de distribuição',    intervalKm: null,  intervalMonths: null, notes: 'Motor HR16DE usa corrente sem prazo fixo. Monitore nível de óleo — consumo pode indicar problema na corrente.', priority: 'CRITICAL' },
    { component: 'Fluido CVT NS-3 (CRÍTICO)',   intervalKm: 40000, intervalMonths: null, notes: 'ATENÇÃO: o CVT do Kicks usa Nissan CVT Fluid NS-3 SEM SUBSTITUTO APROVADO. Não existe equivalente genérico. Em uso severo (cidade/calor): 40.000 km. Em uso normal: 80-100.000 km. Fluido errado = câmbio destruído.', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null,  intervalMonths: 24, notes: 'DOT 3 ou DOT 4. Troca bienal.', priority: 'CRITICAL' },
    { component: 'Velas de ignição',            intervalKm: 40000, intervalMonths: 48, notes: 'Motor HR16DE: use velas iridium Denso ou NGK especificadas. Intervalo de 40.000 km.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 30000, intervalMonths: null, notes: 'Inspecione a cada 15.000 km.', priority: 'HIGH' },
    { component: 'Filtro de ar do motor',       intervalKm: 20000, intervalMonths: 24, notes: null, priority: 'HIGH' },
    { component: 'Líquido de arrefecimento',    intervalKm: null,  intervalMonths: 24, notes: 'Nissan Super Long Life Coolant (azul). Troca a cada 2 anos.', priority: 'HIGH' },
    { component: 'Filtro de combustível',       intervalKm: 30000, intervalMonths: 36, notes: null, priority: 'MEDIUM' },
    { component: 'Alinhamento e balanceamento', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'MEDIUM' },
    { component: 'Filtro do ar-condicionado',   intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'LOW' },
  ],

  // NISSAN FRONTIER (2.3 diesel biturbo YS23DDT)
  Frontier: [
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: 'Motor YS23DDT 2.3 biturbo: use 5W40 sintético API CI-4 ou CJ-4. Nissan recomenda seu óleo genuíno 5W40.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Original Nissan ou Wix.', priority: 'CRITICAL' },
    { component: 'Filtro de combustível diesel', intervalKm: 20000, intervalMonths: 24, notes: 'Inclui drenagem do separador de água. Execute em oficina especializada — ar no sistema common rail biturbo = injetores danificados.', priority: 'CRITICAL' },
    { component: 'Separador de água — dreno',   intervalKm: 10000, intervalMonths: null, notes: 'Drene o separador de água a cada 10.000 km ou ao acender o indicador no painel.', priority: 'CRITICAL' },
    { component: 'Corrente de distribuição',    intervalKm: null,  intervalMonths: null, notes: 'Motor 2.3 usa corrente sem prazo fixo. Monitore ruídos mecânicos a frio.', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null,  intervalMonths: 24, notes: 'DOT 3. Troca bienal.', priority: 'CRITICAL' },
    { component: 'Fluido câmbio automático (Matic S)', intervalKm: 40000, intervalMonths: null, notes: 'Frontier automática: use Nissan Matic Fluid S exclusivamente. Em uso severo (reboque, off-road): 40.000 km. Fluido degradado = solavancos e falhas.', priority: 'HIGH' },
    { component: 'Velas de aquecimento',        intervalKm: 80000, intervalMonths: null, notes: 'Troca preventiva a cada 80.000 km.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 40000, intervalMonths: null, notes: 'Caminhonete pesada. Inspecione a cada 20.000 km.', priority: 'HIGH' },
    { component: 'Fluido da caixa de transferência e diferencial', intervalKm: 40000, intervalMonths: null, notes: 'Frontier 4x4: troque todos os fluidos off-road a cada 40.000 km.', priority: 'HIGH' },
    { component: 'Filtro de ar do motor',       intervalKm: 20000, intervalMonths: 24, notes: 'Motor diesel biturbo — não negligencie.', priority: 'HIGH' },
    { component: 'Alinhamento e balanceamento', intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'MEDIUM' },
    { component: 'Filtro do ar-condicionado',   intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'LOW' },
  ],

  // MITSUBISHI PAJERO SPORT (2.4 diesel 4N15)
  'Pajero Sport': [
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: 'Motor 4N15 2.4 diesel: use 5W30 ou 10W30 sintético API CJ-4 ou CK-4. A Mitsubishi recomenda Diamond 5W30. Use OBRIGATORIAMENTE diesel S10.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Original Mitsubishi.', priority: 'CRITICAL' },
    { component: 'Filtro de combustível diesel', intervalKm: 20000, intervalMonths: 24, notes: 'Use exclusivamente diesel S10 — o motor 4N15 é sensível à qualidade do combustível. Postos de bandeira são recomendados.', priority: 'CRITICAL' },
    { component: 'Corrente de distribuição',    intervalKm: null,  intervalMonths: null, notes: 'Motor 4N15 usa corrente dupla sem prazo fixo. Monitore nível de óleo e ruídos metálicos a frio.', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null,  intervalMonths: 24, notes: 'DOT 3 ou DOT 4. Troca bienal.', priority: 'CRITICAL' },
    { component: 'Filtro DPF — manutenção',     intervalKm: null,  intervalMonths: 6,  notes: 'Faça regularmente rodadas de rodovia para forçar regeneração do DPF. Uso urbano intenso entope o filtro rapidamente.', priority: 'HIGH' },
    { component: 'Velas de aquecimento',        intervalKm: 80000, intervalMonths: null, notes: 'Troca preventiva.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 40000, intervalMonths: null, notes: 'SUV pesado com diesel. Inspecione a cada 20.000 km.', priority: 'HIGH' },
    { component: 'Fluido da caixa de transferência e diferencial', intervalKm: 40000, intervalMonths: null, notes: 'Veículo com 4WD ativo. Troque todos os fluidos off-road a cada 40.000 km.', priority: 'HIGH' },
    { component: 'Filtro de ar do motor',       intervalKm: 20000, intervalMonths: 24, notes: 'Motor diesel sensível. Reduza para 10.000 km em uso off-road com terra.', priority: 'HIGH' },
    { component: 'Alinhamento e balanceamento', intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'MEDIUM' },
    { component: 'Filtro do ar-condicionado',   intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'LOW' },
  ],

  // PEUGEOT 208 / 2008 (1.6 THP turbo)
  'Peugeot 208': [
    { component: 'Correia dentada',             intervalKm: 80000, intervalMonths: 48, notes: 'Motor 1.6 THP 16V (Prince): troque a correia a cada 80.000 km no Brasil — o prazo do manual europeu (120.000 km) NÃO é adequado para o etanol e o calor tropical. Motor interferente — ruptura = motor destruído. Use kit Dayco ou INA especificado.', priority: 'CRITICAL' },
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: 'Motor THP: use 5W40 sintético com aprovação PSA B71 2300 (ex: Total Quartz 9000 ou Motul 8100 X-cess 5W40). Turbo exige qualidade — nunca use mineral.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Original PSA ou FRAM. Troque sempre com o óleo.', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null,  intervalMonths: 24, notes: 'DOT 4. Troca bienal.', priority: 'CRITICAL' },
    { component: 'Velas de ignição',            intervalKm: 40000, intervalMonths: 48, notes: 'Motor THP usa etanol brasileiro — as velas sofrem mais. Troque a cada 40.000 km com NGK ILZKR7B-10E ou equivalente especificado.', priority: 'HIGH' },
    { component: 'Coxim de motor e câmbio',     intervalKm: 50000, intervalMonths: null, notes: 'O motor THP vibra significativamente. Coxins desgastam cedo — vibração excessiva ao tickover = coxim ruim.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 30000, intervalMonths: null, notes: 'Inspecione a cada 15.000 km.', priority: 'HIGH' },
    { component: 'Filtro de ar do motor',       intervalKm: 20000, intervalMonths: 24, notes: 'Turbo é sensível à qualidade do ar.', priority: 'HIGH' },
    { component: 'Líquido de arrefecimento',    intervalKm: null,  intervalMonths: 24, notes: 'OAT (laranja) com referência PSA. Não misture tipos.', priority: 'HIGH' },
    { component: 'Fluido câmbio automático EAT6', intervalKm: 60000, intervalMonths: null, notes: 'Câmbio automático de 6 marchas: use fluido PSA original. Solavanco em manobras = sinal de desgaste.', priority: 'MEDIUM' },
    { component: 'Filtro de combustível',       intervalKm: 30000, intervalMonths: 36, notes: null, priority: 'MEDIUM' },
    { component: 'Alinhamento e balanceamento', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'MEDIUM' },
    { component: 'Filtro do ar-condicionado',   intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'LOW' },
  ],

  // CHEVROLET CRUZE (1.4 turbo LUJ)
  Cruze: [
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: 'Motor 1.4 turbo LUJ: OBRIGATÓRIO Dexos1 Gen3 0W20 sintético (ex: Mobil 1 0W20 Dexos1 Gen3 ou ACDelco 0W20). Óleo diferente invalida garantia e pode causar falhas no turbo. A GM cobre até 240.000 km na corrente com óleo correto.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Original GM ACDelco ou Wix.', priority: 'CRITICAL' },
    { component: 'Corrente de distribuição',    intervalKm: null,  intervalMonths: null, notes: 'Motor 1.4 turbo usa corrente sem prazo fixo. Com óleo Dexos1 Gen3 correto, a GM cobre falhas de corrente até 240.000 km. Ruído seco ao ligar a frio = inspecione.', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null,  intervalMonths: 24, notes: 'DOT 3 ou DOT 4. Troca bienal.', priority: 'CRITICAL' },
    { component: 'Velas de ignição',            intervalKm: 40000, intervalMonths: 48, notes: 'Motor turbo: use velas iridium ACDelco especificadas. Nunca use cópias — risco de pré-ignição.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 30000, intervalMonths: null, notes: 'Inspecione a cada 15.000 km.', priority: 'HIGH' },
    { component: 'Filtro de ar do motor',       intervalKm: 20000, intervalMonths: 24, notes: 'Turbo sensível.', priority: 'HIGH' },
    { component: 'Líquido de arrefecimento',    intervalKm: null,  intervalMonths: 24, notes: 'DEX-COOL (laranja). Não misture com refrigerante verde.', priority: 'HIGH' },
    { component: 'Fluido câmbio automático',    intervalKm: 60000, intervalMonths: null, notes: 'Câmbio automático de 6 marchas Hydra-Matic: use Dexron VI GM. Fluido degradado = solavancos e trocas duras.', priority: 'HIGH' },
    { component: 'Filtro de combustível',       intervalKm: 30000, intervalMonths: 36, notes: null, priority: 'MEDIUM' },
    { component: 'Alinhamento e balanceamento', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'MEDIUM' },
    { component: 'Filtro do ar-condicionado',   intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'LOW' },
    { component: 'Bateria',                     intervalKm: null,  intervalMonths: 36, notes: null, priority: 'LOW' },
  ],

  // ─── MOTOS ────────────────────────────────────────────────────────────────────

  // HONDA CG 160 / TITAN 160
  'CG 160': [
    { component: 'Óleo do motor',               intervalKm: 3000, intervalMonths: 6, notes: 'Motor monocilíndrico Honda 4T: use 10W30 JASO MA ou MA2 (ex: Honda HP4M ou Motul 5100 10W40). Entregadores: a cada 3.000 km. Uso normal: 6.000 km. Nunca use óleo automotivo sem certificação JASO MA.', priority: 'CRITICAL' },
    { component: 'Corrente de transmissão',     intervalKm: 3000, intervalMonths: null, notes: 'Lubrifique a cada 500–1.000 km ou após chuva. Regulagem a cada 3.000 km. Troca completa (corrente + pinhão + coroa) a cada 20.000–25.000 km conforme desgaste.', priority: 'HIGH' },
    { component: 'Velas de ignição',            intervalKm: 6000, intervalMonths: 12, notes: 'NGK CPR8EA-9 ou equivalente Honda. Troque a cada 6.000 km em uso de entregador ou a cada revisão.', priority: 'HIGH' },
    { component: 'Filtro de ar',                intervalKm: 6000, intervalMonths: 12, notes: 'Troque o filtro a cada 6.000 km. Em uso urbano com muita poeira: 3.000 km.', priority: 'HIGH' },
    { component: 'Fluido de freio',             intervalKm: null, intervalMonths: 24, notes: 'DOT 4. Freio dianteiro a disco — troca a cada 2 anos. Freio traseiro a tambor: verifique as lonas anualmente.', priority: 'HIGH' },
    { component: 'Folga das válvulas',          intervalKm: 12000, intervalMonths: null, notes: 'Regulagem (admissão e escape) a cada 12.000 km com motor frio. Regulagem inadequada = consumo aumentado e desgaste prematuro das válvulas.', priority: 'HIGH' },
    { component: 'Pastilhas de freio dianteiro', intervalKm: 15000, intervalMonths: null, notes: 'Verifique o desgaste a cada 6.000 km. Lonas do freio traseiro: verifique a cada revisão.', priority: 'MEDIUM' },
    { component: 'Pneus — verificação de pressão', intervalKm: null, intervalMonths: 1, notes: 'Dianteiro 29 PSI, traseiro 33 PSI. Com passageiro: +4 PSI. Moto é mais sensível à pressão do que carro.', priority: 'MEDIUM' },
    { component: 'Bateria',                     intervalKm: null, intervalMonths: 24, notes: 'Bateria lacrada (não manutenível). Vida útil de 2–3 anos. Partida difícil no frio = bateria fraca.', priority: 'LOW' },
  ],

  // HONDA BROS 160
  'Bros 160': [
    { component: 'Óleo do motor',               intervalKm: 5000, intervalMonths: 6, notes: 'Motor NXR160 4T: use 10W30 ou 10W40 JASO MA2 (Honda HP4M ou Motul 5100). Em uso off-road intenso: 3.000 km. O Bros é muito usado em estradas e trilhas — óleo limpo é fundamental.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo / tela',       intervalKm: 5000, intervalMonths: 6, notes: 'Troque o filtro a cada 5.000 km. Limpe a tela do crankcase a cada 10.000 km.', priority: 'CRITICAL' },
    { component: 'Corrente de transmissão',     intervalKm: 3000, intervalMonths: null, notes: 'Lubrifique a cada 500 km ou após off-road/chuva. Regulagem a cada 3.000 km. Em uso off-road, a corrente desgasta mais rápido — verifique a folga frequentemente.', priority: 'HIGH' },
    { component: 'Velas de ignição',            intervalKm: 12000, intervalMonths: null, notes: 'NGK CPR8EA-9. Troque a cada 12.000 km ou ao detectar partidas difíceis.', priority: 'HIGH' },
    { component: 'Filtro de ar',                intervalKm: 6000, intervalMonths: null, notes: 'Troque a cada 6.000 km. Em uso off-road com terra ou areia: 3.000 km.', priority: 'HIGH' },
    { component: 'Fluido de freio',             intervalKm: null, intervalMonths: 24, notes: 'DOT 4 (freios dianteiro e traseiro a disco). Troca bienal.', priority: 'HIGH' },
    { component: 'Folga das válvulas',          intervalKm: 12000, intervalMonths: null, notes: 'Regulagem a cada 12.000 km com motor frio.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 12000, intervalMonths: null, notes: 'Verifique o desgaste a cada revisão. Em off-road: mais frequente.', priority: 'MEDIUM' },
    { component: 'Pneus — verificação',         intervalKm: null, intervalMonths: 1, notes: 'Verifique pressão mensalmente e profundidade do sulco. Em off-road: inspecione após cada trilha.', priority: 'MEDIUM' },
    { component: 'Bateria',                     intervalKm: null, intervalMonths: 24, notes: 'Vida útil de 2–3 anos.', priority: 'LOW' },
  ],

  // HONDA CB 300F TWISTER
  'CB 300F Twister': [
    { component: 'Óleo do motor',               intervalKm: 6000, intervalMonths: 12, notes: 'Motor CB300F DOHC: use 10W30 JASO MA2 (Honda HP4M ou Motul 7100 10W40). Motor de alto desempenho relativo — não economize no óleo. Troca a cada 6.000 km.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 6000, intervalMonths: 12, notes: 'Troque junto com o óleo.', priority: 'CRITICAL' },
    { component: 'Corrente de transmissão',     intervalKm: 3000, intervalMonths: null, notes: 'Lubrifique a cada 500 km. Regulagem a cada 3.000 km. Troca: ~25.000 km.', priority: 'HIGH' },
    { component: 'Velas de ignição (iridium)',  intervalKm: 24000, intervalMonths: null, notes: 'Motor DOHC: use velas iridium NGK especificadas. Intervalo de 24.000 km.', priority: 'HIGH' },
    { component: 'Filtro de ar',                intervalKm: 12000, intervalMonths: null, notes: 'Troque a cada 12.000 km.', priority: 'HIGH' },
    { component: 'Fluido de freio',             intervalKm: null, intervalMonths: 24, notes: 'DOT 4 (freios a disco frente e trás). Troca bienal.', priority: 'HIGH' },
    { component: 'Folga das válvulas',          intervalKm: 12000, intervalMonths: null, notes: 'Regulagem a cada 12.000 km com motor frio.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 15000, intervalMonths: null, notes: 'Verifique a cada revisão.', priority: 'MEDIUM' },
    { component: 'Pneus — verificação de pressão', intervalKm: null, intervalMonths: 1, notes: 'Dianteiro 29 PSI, traseiro 36 PSI (sem passageiro). Verifique mensalmente.', priority: 'MEDIUM' },
    { component: 'Bateria',                     intervalKm: null, intervalMonths: 24, notes: null, priority: 'LOW' },
  ],

  // HONDA XRE 300
  'XRE 300': [
    { component: 'Óleo do motor',               intervalKm: 6000, intervalMonths: 12, notes: 'Motor 300cc DOHC: use 10W30 JASO MA2. Em uso off-road intenso: troca a cada 3.000 km. O motor trabalha mais em trilhas — óleo limpo é crítico.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 6000, intervalMonths: 12, notes: 'Troque junto com o óleo. Em uso off-road: a cada 3.000 km.', priority: 'CRITICAL' },
    { component: 'Corrente de transmissão',     intervalKm: 300,  intervalMonths: null, notes: 'Em uso off-road: lubrifique a cada 300 km ou após trilhas. Em uso de estrada: a cada 500 km. Regulagem a cada 3.000 km. Troca: ~20.000 km.', priority: 'HIGH' },
    { component: 'Filtro de ar',                intervalKm: 6000, intervalMonths: null, notes: 'Troque a cada 6.000 km em uso de estrada. Em off-road com terra ou lama: 2.000–3.000 km. Filtro sujo em trilha pode deixar o motor sem ar.', priority: 'HIGH' },
    { component: 'Fluido de freio',             intervalKm: null, intervalMonths: 24, notes: 'DOT 4 (freios a disco frente e trás). Troca bienal.', priority: 'HIGH' },
    { component: 'Velas de ignição',            intervalKm: 12000, intervalMonths: null, notes: 'NGK CR8E ou equivalente especificado.', priority: 'HIGH' },
    { component: 'Folga das válvulas',          intervalKm: 12000, intervalMonths: null, notes: 'Regulagem a cada 12.000 km com motor frio. Fundamental para desempenho em terrenos irregulares.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 12000, intervalMonths: null, notes: 'Em uso off-road: verifique a cada revisão. Barro e areia desgastam rapidamente.', priority: 'MEDIUM' },
    { component: 'Pneus — verificação',         intervalKm: null, intervalMonths: 1, notes: 'Verifique a profundidade dos sulcos e calibração. Pneus dual-sport específicos para o perfil de uso.', priority: 'MEDIUM' },
    { component: 'Bateria',                     intervalKm: null, intervalMonths: 24, notes: null, priority: 'LOW' },
  ],

  // HONDA PCX 160
  'PCX 160': [
    { component: 'Óleo do motor',               intervalKm: 4000, intervalMonths: 6, notes: 'Motor eSP+ 160cc: use 10W30 JASO MA2 (Honda HP4M). Entregadores em uso intenso: a cada 4.000 km. Uso normal: 6.000 km. JASO MA2 é obrigatório — não use óleo automotivo comum.', priority: 'CRITICAL' },
    { component: 'Correia da transmissão CVT',  intervalKm: 20000, intervalMonths: null, notes: 'CRÍTICO para entregadores: inspecione a correia do variador a cada 20.000 km e substitua a cada 40.000 km. Correia rompida deixa a moto imóvel instantaneamente. Entregadores com alto km: reduza para 30.000 km.', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null, intervalMonths: 24, notes: 'DOT 4 (sistema CBS — freio integrado dianteiro e traseiro). Troca bienal. Sistema CBS interligado exige atenção especial.', priority: 'CRITICAL' },
    { component: 'Velas de ignição',            intervalKm: 8000, intervalMonths: 12, notes: 'NGK CR7EH-9 ou equivalente. Entregadores: a cada 8.000 km. Uso normal: 12.000 km.', priority: 'HIGH' },
    { component: 'Filtro de ar',                intervalKm: 6000, intervalMonths: 12, notes: 'Troque a cada 6.000 km. Scooter em trânsito urbano denso: a cada 4.000 km.', priority: 'HIGH' },
    { component: 'Roletes do variador CVT',     intervalKm: 20000, intervalMonths: null, notes: 'Inspecione os roletes do variador junto com a correia. Roletes desgastados = perda de aceleração e velocidade máxima reduzida.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 10000, intervalMonths: null, notes: 'Sistema CBS: verifique dianteiro e traseiro a cada revisão. Entregadores: a cada 8.000 km.', priority: 'HIGH' },
    { component: 'Pneus — verificação',         intervalKm: null, intervalMonths: 1, notes: 'Dianteiro 29 PSI, traseiro 33 PSI. Com passageiro: +4 PSI. Entregadores devem verificar semanalmente.', priority: 'MEDIUM' },
    { component: 'Bateria',                     intervalKm: null, intervalMonths: 24, notes: 'Bateria de 12V. Vida útil ~2 anos em uso intenso de entregador.', priority: 'LOW' },
  ],

  // HONDA CB 500F / CB 500X
  'CB 500F': [
    { component: 'Óleo do motor',               intervalKm: 12800, intervalMonths: 12, notes: 'Motor paralelo bicilíndrico 471cc: use 10W30 JASO MA2 (Honda HP4M, Motul 5100 10W40). Intervalo de 12.800 km (8.000 milhas) conforme manual.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 12800, intervalMonths: 12, notes: 'Troque junto com o óleo.', priority: 'CRITICAL' },
    { component: 'Corrente de transmissão',     intervalKm: 3000, intervalMonths: null, notes: 'Lubrifique a cada 500 km. Regulagem a cada 3.000 km. Motor bicilíndrico paralelo tem aceleração mais suave — corrente tem vida útil maior (~30.000 km).', priority: 'HIGH' },
    { component: 'Velas de ignição (iridium)',  intervalKm: 25600, intervalMonths: null, notes: 'Velas iridium NGK especificadas. Intervalo de 25.600 km (16.000 milhas).', priority: 'HIGH' },
    { component: 'Filtro de ar',                intervalKm: 25600, intervalMonths: null, notes: 'Troque a cada 25.600 km.', priority: 'HIGH' },
    { component: 'Fluido de freio',             intervalKm: null, intervalMonths: 24, notes: 'DOT 4. Freios a disco frente e trás. Troca bienal.', priority: 'HIGH' },
    { component: 'Folga das válvulas',          intervalKm: 25600, intervalMonths: null, notes: 'Regulagem a cada 25.600 km com motor frio.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 15000, intervalMonths: null, notes: 'Verifique a cada revisão.', priority: 'MEDIUM' },
    { component: 'Bateria',                     intervalKm: null, intervalMonths: 36, notes: null, priority: 'LOW' },
  ],

  // HONDA CB 650R
  'CB 650R': [
    { component: 'Óleo do motor',               intervalKm: 12800, intervalMonths: 12, notes: 'Motor 4 cilindros 649cc DOHC: use 10W30 JASO MA2 sintético ou semissintético (Motul 7100 10W40 ou Honda HP4M 10W30). Intervalo de 12.800 km (8.000 milhas).', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 12800, intervalMonths: 12, notes: 'Troque junto com o óleo.', priority: 'CRITICAL' },
    { component: 'Corrente de transmissão',     intervalKm: 3000, intervalMonths: null, notes: 'Lubrifique a cada 500 km. Regulagem a cada 3.000 km. Motor de 4 cilindros transmite potência de forma uniforme — cuide bem da corrente.', priority: 'HIGH' },
    { component: 'Velas de ignição (iridium)',  intervalKm: 38400, intervalMonths: null, notes: '4 cilindros = 4 velas iridium Denso. Intervalo de 38.400 km (24.000 milhas). Não substitua por velas convencionais.', priority: 'HIGH' },
    { component: 'Filtro de ar',                intervalKm: 25600, intervalMonths: null, notes: 'Troque a cada 25.600 km.', priority: 'HIGH' },
    { component: 'Fluido de freio',             intervalKm: null, intervalMonths: 24, notes: 'DOT 4. Sistema radial com ABS. Troca bienal.', priority: 'HIGH' },
    { component: 'Folga das válvulas',          intervalKm: 25600, intervalMonths: null, notes: '8 válvulas (2 por cilindro). Regulagem a cada 25.600 km com motor frio.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 15000, intervalMonths: null, notes: 'Verifique a cada revisão. Sistema radial com duplo disco dianteiro.', priority: 'MEDIUM' },
    { component: 'Bateria',                     intervalKm: null, intervalMonths: 36, notes: null, priority: 'LOW' },
  ],

  // YAMAHA FAZER 250 / YS 250
  'Fazer 250': [
    { component: 'Óleo do motor',               intervalKm: 5000, intervalMonths: 6, notes: 'Motor 249cc monocilíndrico SOHC: use 20W40 ou 10W40 JASO MA2 (Yamalube 20W40 ou Motul 3100 20W40). Troca a cada 5.000 km. No inverno rigoroso: prefira 10W40.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo / tela',       intervalKm: 5000, intervalMonths: 6, notes: 'Troque o filtro a cada 5.000 km. Limpe a tela interna a cada 10.000 km.', priority: 'CRITICAL' },
    { component: 'Corrente de transmissão',     intervalKm: 3000, intervalMonths: null, notes: 'Lubrifique a cada 500 km. Regulagem a cada 3.000 km. Troca do kit: ~20.000–25.000 km.', priority: 'HIGH' },
    { component: 'Velas de ignição',            intervalKm: 10000, intervalMonths: 12, notes: 'NGK CR8E ou equivalente Yamaha. Troque a cada 10.000 km.', priority: 'HIGH' },
    { component: 'Filtro de ar',                intervalKm: 10000, intervalMonths: 12, notes: 'Troque a cada 10.000 km.', priority: 'HIGH' },
    { component: 'Folga das válvulas',          intervalKm: 10000, intervalMonths: null, notes: 'Regulagem a cada 10.000 km com motor frio. Fundamental no Fazer 250 — válvulas fora da folga causam consumo aumentado e ruído.', priority: 'HIGH' },
    { component: 'Fluido de freio',             intervalKm: null, intervalMonths: 24, notes: 'DOT 4. Disco dianteiro e tambor traseiro. Troca bienal.', priority: 'HIGH' },
    { component: 'Pastilhas de freio dianteiro', intervalKm: 15000, intervalMonths: null, notes: 'Verifique a cada revisão. Lonas do tambor traseiro: verifique anualmente.', priority: 'MEDIUM' },
    { component: 'Pneus — verificação',         intervalKm: null, intervalMonths: 1, notes: 'Dianteiro 29 PSI, traseiro 36 PSI. Verifique mensalmente.', priority: 'MEDIUM' },
    { component: 'Bateria',                     intervalKm: null, intervalMonths: 24, notes: null, priority: 'LOW' },
  ],

  // YAMAHA XTZ 150 CROSSER
  'XTZ 150 Crosser': [
    { component: 'Óleo do motor',               intervalKm: 3000, intervalMonths: 6, notes: 'Motor 150cc monocilíndrico: use 10W40 JASO MA2. Em uso off-road ou de entregador: a cada 3.000 km. Uso normal de estrada: 5.000 km.', priority: 'CRITICAL' },
    { component: 'Filtro / tela de óleo',       intervalKm: 3000, intervalMonths: 6, notes: 'Limpe a tela de óleo a cada troca. Em uso off-road intenso, o filtro acumula impurezas mais rápido.', priority: 'CRITICAL' },
    { component: 'Corrente de transmissão',     intervalKm: 300,  intervalMonths: null, notes: 'Em uso off-road: lubrifique a cada 300 km ou após cada trilha. Em uso de estrada: a cada 500 km. Regulagem a cada 3.000 km.', priority: 'HIGH' },
    { component: 'Filtro de ar',                intervalKm: 5000, intervalMonths: null, notes: 'Troque a cada 5.000 km em uso de estrada. Em off-road com terra, pó ou lama: 2.000–3.000 km. Filtro sujo em off-road é uma das causas mais comuns de desgaste prematuro.', priority: 'HIGH' },
    { component: 'Velas de ignição',            intervalKm: 10000, intervalMonths: null, notes: 'NGK CR8E. Troque a cada 10.000 km.', priority: 'HIGH' },
    { component: 'Fluido de freio',             intervalKm: null, intervalMonths: 24, notes: 'DOT 4. Disco dianteiro e tambor traseiro. Troca bienal.', priority: 'HIGH' },
    { component: 'Folga das válvulas',          intervalKm: 10000, intervalMonths: null, notes: 'Regulagem a cada 10.000 km com motor frio.', priority: 'HIGH' },
    { component: 'Pastilhas de freio dianteiro', intervalKm: 10000, intervalMonths: null, notes: 'Em uso off-road: verifique a cada revisão. Barro e areia aceleram o desgaste.', priority: 'MEDIUM' },
    { component: 'Pneus dual-sport — verificação', intervalKm: null, intervalMonths: 1, notes: 'Verifique pressão e profundidade dos sulcos mensalmente. Em off-road: inspecione após cada trilha.', priority: 'MEDIUM' },
    { component: 'Bateria',                     intervalKm: null, intervalMonths: 24, notes: null, priority: 'LOW' },
  ],

  // YAMAHA MT-03
  'MT-03': [
    { component: 'Óleo do motor',               intervalKm: 5000, intervalMonths: 6, notes: 'Motor 321cc paralelo bicilíndrico: use 10W40 JASO MA2 sintético (Yamalube 10W40 Full Synthetic ou Motul 7100 10W40). Troca a cada 5.000 km.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 5000, intervalMonths: 6, notes: 'Troque junto com o óleo.', priority: 'CRITICAL' },
    { component: 'Corrente de transmissão',     intervalKm: 3000, intervalMonths: null, notes: 'Lubrifique a cada 500 km. Regulagem a cada 3.000 km. Motor bicilíndrico com boa potência — cuide da corrente.', priority: 'HIGH' },
    { component: 'Filtro de ar',                intervalKm: 10000, intervalMonths: null, notes: 'Troque a cada 10.000 km.', priority: 'HIGH' },
    { component: 'Fluido de freio',             intervalKm: null, intervalMonths: 24, notes: 'DOT 4. Freios a disco frente e trás com ABS (versões mais novas). Troca bienal.', priority: 'HIGH' },
    { component: 'Velas de ignição',            intervalKm: 15000, intervalMonths: null, notes: 'NGK especificado para o MT-03. Intervalo de 15.000 km.', priority: 'HIGH' },
    { component: 'Folga das válvulas',          intervalKm: 25000, intervalMonths: null, notes: 'Regulagem a cada 25.000 km com motor frio. Motor bicilíndrico é mais fácil de regular do que 4 cilindros.', priority: 'MEDIUM' },
    { component: 'Pastilhas de freio',          intervalKm: 15000, intervalMonths: null, notes: 'Verifique a cada revisão.', priority: 'MEDIUM' },
    { component: 'Bateria',                     intervalKm: null, intervalMonths: 36, notes: null, priority: 'LOW' },
  ],

  // YAMAHA TENERE 700
  'Tenere 700': [
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: 'Motor CP2 689cc paralelo bicilíndrico: use 10W40 ou 10W50 JASO MA2 sintético (Motul 7100 10W50 ou Yamalube Sport). Em uso off-road intenso: 5.000 km. Uso normal: 10.000 km.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Troque junto com o óleo. Em off-road intenso: a cada troca.', priority: 'CRITICAL' },
    { component: 'Corrente de transmissão',     intervalKm: 500,  intervalMonths: null, notes: 'Lubrifique a cada 500 km em uso de estrada, a cada 300 km em off-road. Moto de aventura com uso intenso — corrente precisa de atenção constante.', priority: 'HIGH' },
    { component: 'Filtro de ar',                intervalKm: 20000, intervalMonths: null, notes: 'Troque a cada 20.000 km em uso de estrada. Em off-road: 5.000–10.000 km dependendo das condições.', priority: 'HIGH' },
    { component: 'Fluido de freio',             intervalKm: null, intervalMonths: 24, notes: 'DOT 4. Freios a disco com ABS. Troca bienal.', priority: 'HIGH' },
    { component: 'Velas de ignição (iridium)',  intervalKm: 40000, intervalMonths: null, notes: 'Velas iridium NGK especificadas para o CP2. Intervalo de 40.000 km.', priority: 'HIGH' },
    { component: 'Folga das válvulas',          intervalKm: 40000, intervalMonths: null, notes: 'Regulagem das válvulas a cada 40.000 km — motor de alto desempenho, exige precisão na regulagem com motor frio.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 15000, intervalMonths: null, notes: 'Verifique a cada revisão. Em uso off-road: a cada 8.000–10.000 km.', priority: 'MEDIUM' },
    { component: 'Pneus — verificação',         intervalKm: null, intervalMonths: 1, notes: 'Verifique pressão e profundidade dos sulcos. Pneus dual-sport para uso misto. Em off-road: inspecione após cada trilha.', priority: 'MEDIUM' },
    { component: 'Bateria',                     intervalKm: null, intervalMonths: 36, notes: null, priority: 'LOW' },
  ],

  // KAWASAKI NINJA 400 / Z400
  'Ninja 400': [
    { component: 'Óleo do motor',               intervalKm: 12000, intervalMonths: 12, notes: 'Motor 399cc paralelo bicilíndrico: use 10W40 JASO MA2 sintético (Motul 7100 10W40 ou Castrol Power1 10W40). Troca a cada 12.000 km.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 12000, intervalMonths: 12, notes: 'Troque junto com o óleo.', priority: 'CRITICAL' },
    { component: 'Corrente de transmissão',     intervalKm: 3000, intervalMonths: null, notes: 'Lubrifique a cada 500 km. Regulagem a cada 3.000 km. Troca do kit: ~25.000 km. Use corrente com retentor O-ring.', priority: 'HIGH' },
    { component: 'Velas de ignição',            intervalKm: 12000, intervalMonths: null, notes: 'NGK LMAR9G — vela específica do motor de alta compressão da Ninja 400. Não substitua por outras — risco de pré-ignição. 2 cilindros = 2 velas.', priority: 'HIGH' },
    { component: 'Filtro de ar',                intervalKm: 24000, intervalMonths: null, notes: 'Troque a cada 24.000 km.', priority: 'HIGH' },
    { component: 'Fluido de freio',             intervalKm: null, intervalMonths: 24, notes: 'DOT 4. Duplo disco dianteiro radial, disco traseiro. Troca bienal.', priority: 'HIGH' },
    { component: 'Folga das válvulas',          intervalKm: 24000, intervalMonths: null, notes: 'Regulagem a cada 24.000 km com motor frio.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 15000, intervalMonths: null, notes: 'Verifique a cada revisão.', priority: 'MEDIUM' },
    { component: 'Bateria',                     intervalKm: null, intervalMonths: 36, notes: null, priority: 'LOW' },
  ],

  // BMW R 1250 GS
  'R 1250 GS': [
    { component: 'Óleo do motor',               intervalKm: 10000, intervalMonths: 12, notes: 'Motor Boxer 1254cc ShiftCam: use 5W40 sintético com aprovação BMW Motorrad (ex: Castrol Power1 5W40, Motorex Top Speed 4T 10W50). Nunca use óleo sem aprovação BMW Motorrad.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 10000, intervalMonths: 12, notes: 'Original BMW Motorrad. Troque sempre com o óleo.', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null, intervalMonths: 12, notes: 'DOT 4. Sistema ABS + ASC + DTC complexo. OBRIGATÓRIO: troca anual no primeiro ano, depois a cada 24 meses. O Brasil tem alta umidade — o fluido absorve água mais rápido do que em países europeus.', priority: 'CRITICAL' },
    { component: 'Óleo do eixo cardã traseiro', intervalKm: 20000, intervalMonths: null, notes: 'O GS usa transmissão por CARDÃ (sem corrente)! Troque o óleo do eixo de transmissão final a cada 20.000 km com 70W-80 GL-5 sintético (SAF-XO ou similar). NÃO use GL-4 — causará destruição do eixo.', priority: 'CRITICAL' },
    { component: 'Folga das válvulas (ShiftCam)', intervalKm: 20000, intervalMonths: null, notes: 'Motor ShiftCam com variação de fase: regulagem das válvulas OBRIGATÓRIA a cada 20.000 km. Processo específico BMW — execute apenas em concessionária ou mecânico certificado.', priority: 'HIGH' },
    { component: 'Velas de ignição',            intervalKm: 20000, intervalMonths: null, notes: 'Motor Boxer: 2 velas (uma por cilindro). Use NGK especificadas pela BMW Motorrad.', priority: 'HIGH' },
    { component: 'Filtro de ar',                intervalKm: 20000, intervalMonths: null, notes: 'Troque a cada 20.000 km.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 15000, intervalMonths: null, notes: 'Sistema BMW EVO com Brembo radial dianteiro. Verifique a cada revisão.', priority: 'HIGH' },
    { component: 'Bateria (AGM)',               intervalKm: null, intervalMonths: 36, notes: 'Bateria AGM de alto desempenho. Muitos eletrônicos — bateria de qualidade é essencial. Em períodos sem uso, use carregador de manutenção.', priority: 'MEDIUM' },
  ],

  // HARLEY-DAVIDSON (modelos gerais)
  'Harley-Davidson': [
    { component: 'Óleo do motor',               intervalKm: 8000, intervalMonths: 12, notes: 'ATENÇÃO: a Harley usa 3 fluidos SEPARADOS — não confunda! Óleo do motor (HD 20W50 Syn3 ou Screamin\' Eagle): troca a cada 8.000 km. Motores Big Twin e Milwaukee Eight têm especificação própria HD.', priority: 'CRITICAL' },
    { component: 'Óleo da caixa primária',      intervalKm: 16000, intervalMonths: null, notes: 'SEGUNDO FLUIDO SEPARADO: a caixa primária tem seu próprio compartimento com HD Primary Chaincase Lubricant. Troca a cada 16.000 km. Confundir com o óleo do motor danifica ambos os sistemas.', priority: 'CRITICAL' },
    { component: 'Óleo da transmissão',         intervalKm: 16000, intervalMonths: null, notes: 'TERCEIRO FLUIDO SEPARADO: a caixa de câmbio é separada do motor — use HD Transmission Lubricant 75W140 ou equivalente. Troca a cada 16.000 km.', priority: 'CRITICAL' },
    { component: 'Fluido de freio',             intervalKm: null, intervalMonths: 12, notes: 'DOT 4. No Brasil com alta umidade: troca anual obrigatória. Freio a disco dianteiro e tambor ou disco traseiro conforme o modelo.', priority: 'CRITICAL' },
    { component: 'Correia de transmissão',      intervalKm: 1000, intervalMonths: null, notes: 'Modelos com correia de transmissão (maioria): inspecione o estado e a tensão a cada 1.000 km. Correia com cortes ou desgaste lateral = troca imediata. Troca preventiva: ~60.000–80.000 km.', priority: 'HIGH' },
    { component: 'Velas de ignição',            intervalKm: 16000, intervalMonths: null, notes: 'Big Twin: 2 velas (uma por cilindro). Milwaukee Eight: 4 velas (2 por cilindro). Use HD/NGK especificadas. Intervalo de 16.000 km.', priority: 'HIGH' },
    { component: 'Filtro de ar',                intervalKm: 8000, intervalMonths: 12, notes: 'Troque a cada 8.000 km. HD com filtro de alto fluxo aftermarket: verifique as especificações do fabricante.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 15000, intervalMonths: null, notes: 'Verifique a cada revisão. Motocicleta pesada — desgaste maior nas pastilhas.', priority: 'HIGH' },
    { component: 'Pneus — verificação',         intervalKm: null, intervalMonths: 1, notes: 'Pressão conforme manual (varia por modelo). Pneus de secção larga — desgaste pode ser desigual. Verifique mensalmente.', priority: 'MEDIUM' },
    { component: 'Bateria (AGM)',               intervalKm: null, intervalMonths: 24, notes: 'Bateria AGM. Motocicleta com muitos eletrônicos — qualidade é essencial. Em períodos sem uso, use carregador de manutenção.', priority: 'LOW' },
  ],

  // ROYAL ENFIELD CLASSIC 350 / HIMALAYAN
  'Royal Enfield': [
    { component: 'Folga das válvulas (CRÍTICO)', intervalKm: 5000, intervalMonths: null, notes: 'ITEM MAIS CRÍTICO da Royal Enfield: regulagem das válvulas OBRIGATÓRIA a cada 5.000 km com motor FRIO. Válvulas fora da folga causam ruído excessivo, perda de potência e desgaste acelerado. Execute sempre em mecânico especializado em RE.', priority: 'CRITICAL' },
    { component: 'Óleo do motor',               intervalKm: 3000, intervalMonths: 6, notes: 'Motor 349cc (Classic 350) ou 411cc (Himalayan) monocilíndrico: use 15W50 semissintético (RE Elite ou Motul 3100). Troca a cada 3.000 km — mais frequente que a maioria das motos. Motor de projeto britânico tolera mal intervalos longos.', priority: 'CRITICAL' },
    { component: 'Filtro de óleo',              intervalKm: 3000, intervalMonths: 6, notes: 'Troque junto com o óleo.', priority: 'CRITICAL' },
    { component: 'Corrente de transmissão',     intervalKm: 500,  intervalMonths: null, notes: 'Lubrifique a cada 500 km. Regulagem a cada 3.000 km. A RE tem corrente mais exposta — requer atenção especial.', priority: 'HIGH' },
    { component: 'Filtro de ar',                intervalKm: 5000, intervalMonths: null, notes: 'Troque a cada 5.000 km. Himalayan em off-road: 3.000 km. Filtro sujo em altitude = perda severa de potência.', priority: 'HIGH' },
    { component: 'Velas de ignição',            intervalKm: 15000, intervalMonths: null, notes: 'NGK especificadas para o motor RE. Troque a cada 15.000 km.', priority: 'HIGH' },
    { component: 'Fluido de freio',             intervalKm: null, intervalMonths: 24, notes: 'DOT 4. Freios a disco frente e trás. Troca bienal.', priority: 'HIGH' },
    { component: 'Pastilhas de freio',          intervalKm: 10000, intervalMonths: null, notes: 'Verifique a cada revisão.', priority: 'MEDIUM' },
    { component: 'Pneus — verificação',         intervalKm: null, intervalMonths: 1, notes: 'Classic 350: pneus de estrada. Himalayan: pneus dual-sport. Verifique pressão e profundidade mensalmente.', priority: 'MEDIUM' },
    { component: 'Bateria',                     intervalKm: null, intervalMonths: 24, notes: 'Bateria de 12V. Modelos mais antigos têm sistema elétrico mais simples.', priority: 'LOW' },
  ],
}

// Aliases: modelos com o mesmo cronograma
const aliases: Record<string, string> = {
  // Carros
  Virtus: 'Polo',
  'Onix Plus': 'Onix',
  Cronos: 'Strada',
  EcoSport: 'Ka',
  Compass: 'Renegade',
  Sandero: 'Kwid',
  Kardian: 'Kwid',
  SW4: 'Hilux',
  'Peugeot 2008': 'Peugeot 208',
  'Up!': 'Up',
  // Motos
  'Titan 160': 'CG 160',
  'Fan 160': 'CG 160',
  'CB 500X': 'CB 500F',
  Z400: 'Ninja 400',
  'Classic 350': 'Royal Enfield',
  Himalayan: 'Royal Enfield',
}

async function main() {
  console.log('🗑️  Limpando manutenções existentes...')
  await prisma.maintenanceItem.deleteMany()

  const rows: {
    modelName: string | null
    component: string
    intervalKm: number | null
    intervalMonths: number | null
    notes: string | null
    priority: P
    order: number
  }[] = []

  // Generic items (modelName = null)
  generic.forEach((item, order) => rows.push({ modelName: null, ...item, order }))
  console.log(`  → ${generic.length} itens genéricos`)

  // Specific models
  for (const [model, items] of Object.entries(specific)) {
    items.forEach((item, order) => rows.push({ modelName: model, ...item, order }))
  }
  console.log(`  → ${Object.keys(specific).length} modelos específicos`)

  // Aliases
  for (const [alias, source] of Object.entries(aliases)) {
    const sourceItems = specific[source]
    if (sourceItems) {
      sourceItems.forEach((item, order) => rows.push({ modelName: alias, ...item, order }))
    }
  }
  console.log(`  → ${Object.keys(aliases).length} aliases`)

  // Insert all
  const batchSize = 100
  for (let i = 0; i < rows.length; i += batchSize) {
    await (prisma.maintenanceItem.createMany as any)({ data: rows.slice(i, i + batchSize) })
  }

  const total = await prisma.maintenanceItem.count()
  const models = await prisma.maintenanceItem.groupBy({ by: ['modelName'], _count: true })
  console.log(`\n✅ ${total} itens inseridos`)
  console.log(`   → ${models.filter((m) => m.modelName !== null).length} modelos específicos + 1 genérico`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
