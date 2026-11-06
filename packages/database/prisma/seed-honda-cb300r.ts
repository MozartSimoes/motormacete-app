// seed-honda-cb300r.ts — Honda CB 300R + CB 300F Twister
// CB 300R (2010-2022) · CB 300F TWISTER (2015-2024)
// Motor: 286cc DOHC 4 válvulas — MESMO motor da XRE 300, reconfigurado para uso street
// Válvulas adm 0,16 mm / esc 0,25 mm (DOHC — iguais à XRE 300)
// Pneus aro 17" em ambas (vs aro 21/18" da XRE 300 off-road)
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

// ─── CB 300R (2010-2022) ─────────────────────────────────────────────────────

const CB300R_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor DOHC 286cc — MESMO da XRE 300; válvulas adm 0,16 mm / esc 0,25 mm; muitos mecânicos de CG regulam errado por não conhecer DOHC',
    body: 'A CB 300R tem o motor DOHC 4 válvulas idêntico ao da XRE 300: adm 0,16 ±0,02 mm / esc 0,25 ±0,02 mm (motor FRIO, PMS compressão). Completamente diferente do CG/NXR SOHC (adm 0,05-0,07 mm). Exige calibrador com lâminas de 0,16 e 0,25 mm — muitas oficinas de bairro não têm. Mecanico de CG acostumado com SOHC pode regular MUITO errado. Consequência: valvula de escapamento com folga zero queima silenciosamente até perder compressão. Custo da regulagem correta numa oficina especializada: R$150-250. Custo do reparo de válvula queimada: R$800-2.000.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA2, 1,6 L com filtro — mesmo volume da XRE 300; Hiflofiltro HF303 compatível',
    body: 'Motor idêntico ao da XRE 300 = mesma capacidade de óleo: 1,6 L com troca de filtro, 1,5 L sem filtro. Hiflofiltro HF303 ou Honda original 15410-MCJ-505. Troca: 4.000 km (uso predominante em cidade com trânsito pesado) ou 6.000 km (estrada). Sintético 10W-40 para climas quentes (> 35°C frequente). JASO MA2 obrigatório — óleo MA2 tem coeficiente de fricção correto para embreagem úmida.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR8EH-9 (gap 0,8 mm) — mesma da XRE 300 e da CB 300F Twister; carregar reserva na mochila',
    body: 'NGK CR8EH-9 (R$20-30). Iridium: NGK CR8EHIX-9 (R$70-95) — dura até 16.000 km mas não ajuste o gap da iridium. Troca: 8.000 km. Vela escurecida (fuligem preta): mistura rica — filtro entupido ou IACV sujo. Vela cinza clara/branca: mistura pobre — sensor IAT com problema ou aspiração de ar falso. Vela sem rosca de alumínio na cabeça: torque de montagem 12 Nm — sem exagero (cabeça de alumínio rasca fácil).',
  },
  {
    severity: 'OK',
    title: 'Bengala convencional 41 mm — vedação frágil entre 25.000-35.000 km; sintoma precoce: névoa oleosa na haste antes do vazamento visível',
    body: 'A CB 300R (2010-2022) tem bengala convencional telescópica 41 mm (não invertida como a XRE 300 de 2014+). Retentores Ariete 41 mm (R$60-100 o par). Óleo: Honda SS-7 10W, 100-110 mL por tubo. Inspeção: com a moto parada, comprima a bengala e solte — haste úmida indica retentor falhando. Óleo na haste: protege o retentor de sujeira; névoa oleosa fina não é problema; gota acumulando é problema. Troca preventiva a cada 30.000 km ou ao aparecer primeiro sinal.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 — passo maior, mais robusta; kit DID 520VX3 (coroa 47T / pinhão 15T); folga 30-40 mm; lubrificar a cada 500 km',
    body: 'CB 300R usa corrente de passo 520 (mais robusta que 428 da CG/NXR). DID 520VX3 com o-ring (R$140-200). Coroa: 47 dentes. Pinhão: 15 dentes (modificação para mais torque: 14T — aceleração mais viva mas rotação maior em estrada). Folga: 30-40 mm medida no ponto mais tenso. Lubrificar a cada 500 km (uso estrada) ou 300 km (chuva ou cidade). Kit completo (corrente + coroa + pinhão): R$280-400. Pinhão desgastado em 12.000-15.000 km se a corrente não for lubrificada regularmente.',
  },
  {
    severity: 'WARN',
    title: 'CB 300R não tem ABS até 2018 (primeira geração) — ABS opcional na segunda geração; versão ABS tem anel dentado no disco dianteiro',
    body: 'CB 300R 2010-2018: sem ABS de série. CB 300R 2019-2022 (redesign): ABS disponível (versão ABS). A versão com ABS tem disco dianteiro maior (296 mm vs 276 mm) e anel dentado do sensor na roda. Pastilhas das versões COM e SEM ABS podem ser diferentes — confirme o diâmetro do disco antes de comprar pastilhas. Versão ABS: mesmas recomendações do XRE 300 ABS para limpeza do sensor e purge de fluido com scanner.',
  },
  {
    severity: 'OK',
    title: 'Pneus aro 17" em ambos os eixos — CB 300R tem perfil mais esportivo que Twister; Pirelli Sport Demon ou Michelin Pilot Street são as opções mais populares',
    body: 'CB 300R usa aro 17" em ambos os eixos: 110/70-17 (F) · 140/70-17 (R). Pirelli Sport Demon dianteiro (R$200-280): melhor aderência em molhado. Michelin Pilot Street Radial (R$280-360): durabilidade superior em asfalto. Para uso misto cidade/estrada: Pirelli MT60 RS (R$300-400) — durável e versátil. Calibragem padrão: 29 PSI F / 33 PSI R (solo). Com garupa: 33 PSI F / 36 PSI R. Pneu aro 17" em moto naked tem menos altura de flanco = mais sensível a buracos; calibragem correta é crítica.',
  },
]

const CB300R_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Válvulas com folga zero — problema mais comum da CB 300R negligenciada; motor perde compressão sem barulho prévio nos primeiros 30-40% do desgaste',
    body: 'A CB 300R é a moto 300cc mais popular no Brasil mas também a mais negligenciada em regulagem de válvulas. Motor DOHC: válvulas de escape com folga zero queimam o assento silenciosamente — sem batida metálica audível nos primeiros estágios. Sintoma inicial: dificuldade de partida a frio. Sintoma avançado: não liga nem com empurrar. Compressão normal: 1.200-1.400 kPa. Abaixo de 900 kPa: válvula queimada ou anéis. Intervenção: R$800-2.500 dependendo do dano (só assentamento ou cabeçote completo).',
  },
  {
    severity: 'WARN',
    title: 'Bengala dianteira com retentor falhando em 25.000-30.000 km — CB 300R de primeira geração (2010-2018) especialmente suscetível em uso urbano pesado',
    body: 'Uso urbano com muito buraco de São Paulo/Rio acelera o desgaste dos retentores da bengala. CB 300R 2010-2018 com bengala convencional 41 mm: primeiros sinais de névoa oleosa aparecem entre 25.000-35.000 km em uso intenso. Kit retentores 41 mm (Ariete): R$60-100. Custo de mão de obra: R$150-250. Bengala com óleo vazando sobre o disco de freio: PARADA IMEDIATA — óleo no disco elimina eficiência de frenagem em até 70%. Não rode até substituir.',
  },
  {
    severity: 'WARN',
    title: 'IACV (válvula de marcha lenta) — acúmulo de carbono em uso urbano com muito ralenti; motor "morre" no semáforo ao parar abruptamente',
    body: 'CB 300R em uso urbano pesado (muito trânsito, muita marcha lenta) acumula carbono no IACV mais rápido que em estrada. Sintoma: motor "morre" ao freiar abruptamente no semáforo mas parte normalmente em seguida. Limpeza com spray EFI Cleaner: a cada 8.000 km em uso urbano. O IACV fica no corpo da borboleta — acesso direto. Custo de limpeza numa oficina: R$60-120. Substituição do IACV (caso já não responda à limpeza): R$200-400.',
  },
  {
    severity: 'WARN',
    title: 'Pastilhas originais com desgaste rápido — vida útil 8.000-10.000 km em uso urbano; EBC FA129HH ou Braking CM55 duram 15.000-18.000 km',
    body: 'As pastilhas originais da CB 300R são conhecidas por desgaste acelerado em uso urbano com frenagens frequentes. EBC FA129HH (sinterizadas, R$80-130): 15.000-18.000 km em uso misto. Braking CM55 (R$90-150): alta performance, mais abrasiva ao disco — use com disco em bom estado. Disco mínimo: 3,0 mm (marcar de fábrica). Disco novo: 4,5 mm. Trocar disco quando pastilha nova não melhora frenagem ou ao aparecer ranhuras profundas.',
  },
  {
    severity: 'DANGER',
    title: 'Óleo escorrendo da bengala sobre disco de freio dianteiro — situação de risco de vida; não rode; parada imediata obrigatória',
    body: 'Óleo de bengala vindo de retentor estourado escorre pela haste e pode atingir o disco de freio dianteiro. Disco com óleo: eficiência de frenagem cai para 20-30% do normal. Em frenagem de emergência: a moto não para na distância esperada. Sintoma visual: mancha circular de óleo no disco ou pastilhas. Ao identificar: não rode mesmo que seja curta distância. Chame assistência ou leve a moto no caminhão. Custo de substituição de retentores: R$200-350. Custo de um acidente: incalculável.',
  },
]

// ─── CB 300F TWISTER (2015-2024) ─────────────────────────────────────────────

const TWISTER_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor DOHC 286cc idêntico ao da CB 300R e XRE 300 — mesma válvula adm 0,16 mm / esc 0,25 mm; mesmo óleo, mesma vela; peças de motor 100% intercambiáveis',
    body: 'A CB 300F Twister compartilha 100% do motor com a CB 300R e XRE 300. Toda a manutenção de motor é igual: óleo 10W-30 JASO MA2 (1,6 L com filtro), vela NGK CR8EH-9 (gap 0,8 mm), regulagem de válvulas adm 0,16 / esc 0,25 mm a cada 12.000 km. Diferenças: geometria de chassi ligeiramente diferente, semi-carenagem frontal, banco mais baixo (785 mm vs 790 mm da CB 300R). Peças de motor, filtros e velas são as mesmas — facilidade de manutenção.',
  },
  {
    severity: 'OK',
    title: 'Twister com carenagem frontal — proteção ligeiramente melhor para o motor em chuva; mas vedação do filtro de ar mais critica (coletor d\'água na carenagem)',
    body: 'A semi-carenagem da Twister protege levemente mais o motor de chuva que a CB 300R naked. Ponto de atenção: o coletor que drena água da carenagem fica próximo ao entrada de ar do filtro. Em chuva intensa: verificar que o dreno da carenagem não está obstruído (acúmulo de folhas/lama em garagens abertas). Filtro de ar úmido reduz potência e pode causar engasgamento. Troca do filtro em chuva intensa: 8.000 km (preventivo) vs 12.000 km (estrada seca).',
  },
  {
    severity: 'OK',
    title: 'Banco mais baixo (785 mm) facilita motoristas de estatura menor — mas assento estreito transfere peso para coluna em viagens longas',
    body: 'A Twister tem banco mais baixo e levemente mais estreito que a CB 300R, facilitando o alcance ao chão para pilotos de menor estatura. Em viagens longas (4h+): o assento estreito cria pressão nos isquios. Soluções: assento de espuma com camada extra colada (R$80-150 em estofadores) ou capa de gel (R$100-200). Em uso urbano diário: não é problema relevante.',
  },
  {
    severity: 'WARN',
    title: 'Farol halógeno original da Twister — consumo alto e calor próximo à carenagem; upgrade para LED com encaixe H4 melhora a iluminação e reduz temperatura',
    body: 'O farol halógeno H4 da Twister gera calor considerável dentro da carenagem — isso não é problema mas encurta a vida útil das lâmpadas se a ventilação da carenagem for bloqueada por acessórios. Upgrade para lâmpada LED H4 com dissipador externo (R$60-150): reduz calor e melhora muito a iluminação. Confirmar que o LED cabe dentro da carenagem com espaço para o dissipador — carenagem da Twister é mais compacta que moto naked. LED sem aprovação DENATRAN: ilegal mas amplamente usado.',
  },
  {
    severity: 'OK',
    title: 'Twister tem ABS de série a partir de 2020 — anel dentado no disco dianteiro; limpeza preventiva a cada 6 meses mantém DTC longe',
    body: 'CB 300F Twister 2020+: ABS Honda de série. Sensor de velocidade dianteiro: anel dentado acumula sujeira fina em uso urbano com lama. DTC de ABS (luz amarela) que aparece depois de chuva + sujeira = anel sujo. Limpeza: pano úmido suave sobre o anel dentado. Não use esponja abrasiva. DTC persistente mesmo após limpeza: sensor danificado (R$200-350 Honda). Versão anterior (2015-2019): sem ABS.',
  },
]

const TWISTER_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Mesmo problema da CB 300R: regulagem de válvulas negligenciada — Twister usada como commuter diário é a mais propícia ao problema por km alto em pouco tempo',
    body: 'A Twister é frequentemente usada como commuter diário — em 2 anos pode atingir 30.000-40.000 km, que significa 3-4 regulagens de válvulas. Proprietários que compram Twister achando que é como a moto de 150cc (com muito mais km entre regulagens) erram: DOHC 300cc exige regulagem a cada 12.000 km. Com 3 regulagens atrasadas: alto risco de válvula queimada. Insistência em "o motor ainda está bom" não é parâmetro — a perda de compressão é gradual e imperceptível até a falha grave.',
  },
  {
    severity: 'WARN',
    title: 'Carenagem da Twister oculta o motor — vazamentos de óleo da bengala ou do motor só são visíveis ao remover a carenagem; inspeção mensal obrigatória',
    body: 'Na CB 300R naked, qualquer vazamento de óleo é visível imediatamente. Na Twister: o vazamento começa escondido sob a semi-carenagem. Óleo acumulando no interior da carenagem pode atingir o disco de freio sem que o piloto perceba. Inspeção mensal: retire o painel lateral da carenagem (6 parafusos no máximo) e verifique presença de óleo por dentro. Após troca de óleo: verifique se o dreno foi bem vedado — vazamento pelo dreno fica oculto na Twister.',
  },
  {
    severity: 'WARN',
    title: 'Bengala 41 mm convencional idêntica à CB 300R — mesma fragilidade em uso urbano intenso; vazamento oculto pela carenagem agrava o risco',
    body: 'CB 300F Twister tem bengala convencional 41 mm com os mesmos retentores frágeis da CB 300R. A diferença crítica: na Twister o vazamento fica escondido pela semi-carenagem e pode atingir o disco dianteiro sem que o piloto perceba imediatamente. Em caso de queda de frenagem inesperada: verificar a bengala ANTES de qualquer outra causa. Kit retentores 41 mm: R$60-100 (mesmo da CB 300R). Troca preventiva a cada 30.000 km independente de sintomas visíveis.',
  },
]

// ─── Tire Pressures ───────────────────────────────────────────────────────────

const TIRE_PRESSURES = [
  {
    modelName: 'CB 300R',
    yearFrom: 2010, yearTo: 2022,
    tireSize: '110/70-17 (F) · 140/70-17 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 33, rearPsiLoad: 36,
    notes: 'Aro 17" em ambos os eixos. Com garupa: 33/36 PSI. Michelin Pilot Street Radial ou Pirelli Sport Demon. Calibragem baixa = aro bate no asfalto em buracos — aro 17" com perfil baixo é mais sensível.',
  },
  {
    modelName: 'CB 300F TWISTER',
    yearFrom: 2015, yearTo: 2024,
    tireSize: '110/70-17 (F) · 140/70-17 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 33, rearPsiLoad: 36,
    notes: 'Idêntica à CB 300R em rodas e pressões. Commuter diário: verificar calibragem semanalmente (uso intenso + buracos urbanos desgastam a calibragem mais rápido). Troca de pneu com carenagem: remover painel lateral para encaixar a chave de roda.',
  },
]

// ─── Manutenção ──────────────────────────────────────────────────────────────

const makeCB300 = (
  m: string, yf: number, yt: number, hasABS: boolean
): MaintenanceItemInput[] => {
  const items: MaintenanceItemInput[] = [
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo do motor 10W-30 JASO MA2 + filtro', intervalKm: 4000, intervalMonths: 6, notes: '1,6 L com filtro. Trânsito pesado / motoboy: 3.000 km. Hiflofiltro HF303. Motor DOHC = mais óleo que SOHC 150cc.', priority: 'CRITICAL', order: 1 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas DOHC (adm 0,16 mm / esc 0,25 mm)', intervalKm: 12000, intervalMonths: 18, notes: 'Motor FRIO, PMS compressão. 4 válvulas por cilindro. MUITO diferente do CG/NXR SOHC. Exige mecânico com experiência em DOHC. Commuter diário: pode atingir 12.000 km em menos de 1 ano.', priority: 'CRITICAL', order: 2 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK CR8EH-9 (gap 0,8 mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Iridium CR8EHIX-9: 16.000 km. Não ajuste gap da iridium. Vela preta: mistura rica. Vela branca: mistura pobre.', priority: 'HIGH', order: 3 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar — inspeção e troca', intervalKm: 12000, intervalMonths: 12, notes: 'Uso urbano com muito pó/fuligem: 8.000 km. Filtro molhado: secar ou trocar antes de usar. Filtro entupido = vela escura.', priority: 'HIGH', order: 4 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Limpeza do IACV (válvula de marcha lenta)', intervalKm: 8000, intervalMonths: 12, notes: 'Commuter urbano: 6.000 km. Marcha lenta oscilante ou motor "morre" no semáforo. Spray EFI Cleaner.', priority: 'HIGH', order: 5 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 520 — lubrificação e verificação de folga', intervalKm: 500, intervalMonths: null, notes: 'Folga: 30-40 mm. Uso urbano diário: 300 km. DID 520VX3 com o-ring. Chuva: relubrifar após molhar.', priority: 'HIGH', order: 6 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit corrente 520 (DID 520VX3 + coroa 47T + pinhão 15T)', intervalKm: 20000, intervalMonths: null, notes: 'Commuter diário sem lubrificação regular: 12.000-15.000 km. Trocar o kit completo — nunca só a corrente.', priority: 'HIGH', order: 7 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Retentores bengala dianteira 41 mm', intervalKm: 30000, intervalMonths: null, notes: 'Inspeção a cada 10.000 km. Óleo na haste: troca imediata. Ariete 41 mm (R$60-100 o par). Troca preventiva a 30.000 km.', priority: 'HIGH', order: 8 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo da bengala 41 mm (Honda SS-7 10W)', intervalKm: 20000, intervalMonths: null, notes: '100-110 mL por tubo. Trocar sempre junto com os retentores.', priority: 'MEDIUM', order: 9 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas dianteiras + fluido DOT 4', intervalKm: 8000, intervalMonths: 24, notes: 'Original: 8.000-10.000 km em uso urbano. EBC FA129HH: 15.000-18.000 km. Disco mín 3,0 mm. Fluido DOT 4: 24 meses.', priority: 'HIGH', order: 10 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Lona de freio traseiro (tambor) + ajuste de pedal', intervalKm: 12000, intervalMonths: null, notes: 'Curso do pedal: 20-30 mm. Lona Fras-le ou Honda original. CB 300R e Twister: tambor traseiro.', priority: 'MEDIUM', order: 11 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria YTZ7S 12V 7Ah — verificação', intervalKm: null, intervalMonths: 6, notes: 'Repouso: 12,6 V mín. A 4.000 rpm: 13,8-14,5 V. Bateria fraca: DTCs falsos na PGM-FI e dificuldade de partida.', priority: 'MEDIUM', order: 12 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Scanner PGM-FI — leitura de DTCs', intervalKm: null, intervalMonths: 12, notes: 'Anualmente ou ao acender a luz FI. DTC 7 (IAT): contato com água. DTC 21 (sonda lambda): mistura pobre.', priority: 'MEDIUM', order: 13 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Sonda lambda — verificação', intervalKm: 30000, intervalMonths: null, notes: 'DTC 21 = sonda falhando. Motor opera em modo degradado. Denso/Bosch: R$150-250.', priority: 'HIGH', order: 14 },
  ]

  if (hasABS) {
    items.push({
      modelName: m, yearFrom: yf, yearTo: yt,
      component: 'Sensor ABS + fluido DOT 4 do sistema ABS (purge guiado)',
      intervalKm: null, intervalMonths: 24,
      notes: 'Fluido DOT 4 com purge guiado por scanner — acumuladores internos retêm fluido velho. Anel dentado: limpeza com pano úmido a cada 6 meses. DTC ABS após chuva = anel sujo.',
      priority: 'HIGH', order: 15
    })
  }

  return items
}

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS = [
  { modelName: 'CB 300R',      yearFrom: 2010, yearTo: 2022, MACETES: CB300R_MACETES,   PROBLEMAS: CB300R_PROBLEMAS   },
  { modelName: 'CB 300F TWISTER', yearFrom: 2015, yearTo: 2024, MACETES: TWISTER_MACETES, PROBLEMAS: TWISTER_PROBLEMAS  },
]

const ALL_MANUTENCAO: MaintenanceItemInput[] = [
  // CB 300R 2010-2018: sem ABS
  ...makeCB300('CB 300R', 2010, 2018, false),
  // CB 300R 2019-2022: ABS opcional (geramos como hasABS=true para cobrir a versão com ABS)
  ...makeCB300('CB 300R', 2019, 2022, true),
  // CB 300F Twister 2015-2019: sem ABS
  ...makeCB300('CB 300F TWISTER', 2015, 2019, false),
  // CB 300F Twister 2020+: ABS de série
  ...makeCB300('CB 300F TWISTER', 2020, 2024, true),
]

// ─── Runner ───────────────────────────────────────────────────────────────────

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
    await prisma.tirePressure.create({ data: tp })
    console.log(`🔵 TirePressure: ${tp.modelName}`)
  }

  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: BLOCKS.map(b => b.modelName) } } })
  await prisma.maintenanceItem.createMany({ data: ALL_MANUTENCAO })
  console.log(`🔧 MaintenanceItems: ${ALL_MANUTENCAO.length} itens`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
