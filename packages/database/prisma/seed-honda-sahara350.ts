// seed-honda-sahara350.ts — Honda NX 350 Sahara (1989–1999)
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

// ─── MACETES ──────────────────────────────────────────────────────────────────
const MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor RFVC 339 cc — 4 válvulas radiais, durabilidade lendária',
    body: 'O motor da NX 350 Sahara usa a tecnologia RFVC (Radial Four-Valve Combustion Chamber) da Honda: 4 válvulas dispostas radialmente no cabeçote, permitindo combustão mais eficiente e maior durabilidade. Com manutenção em dia, o motor aguenta 150.000 km sem retífica. Taxa de compressão 8,9:1 (1989–1993) e 9,1:1 (1994–1999). Potência: 28 cv (1989–1993) e 31,5 cv (1994–1999) a 7.500 rpm.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA2 — 2,0 L com filtro / 1,7 L sem filtro',
    body: 'Use sempre 10W-40 JASO MA2 (ou JASO MA). O câmbio é integrado no cárter e compartilha o óleo do motor — jamais use JASO MB (destinado a scooters sem câmbio). Capacidade: 2,0 L com filtro novo ou 1,7 L sem filtro. Troque a cada 3.000 km. Primeira troca obrigatória: 1.000 km (rodagem). Em climas muito quentes ou uso pesado em trilha: considere trocar a cada 2.000 km.',
  },
  {
    severity: 'OK',
    title: 'Folga das válvulas: IN 0,10 mm / EX 0,12 mm (motor frio)',
    body: 'Verifique a folga das válvulas a cada 12.000 km com o motor COMPLETAMENTE frio (aguarde pelo menos 4 horas após uso). Admissão: 0,10 mm. Escapamento: 0,12 mm. O motor RFVC tem 4 válvulas (2 adm + 2 esc) — meça todas. Folga errada causa: válvulas batendo (folga menor que spec) ou perda de potência e consumo alto (folga maior). Se o motor está barulhento ao ligar frio, verifique as folgas primeiro.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK DPR8EA-9 (resistiva) — gap 0,80–0,90 mm',
    body: 'Vela original: NGK DPR8EA-9 (tipo resistivo, necessário para sistemas CDI eletrônico). Alternativa compatível: Denso X24EPR-U9. Gap: 0,80 mm (máx. 0,90 mm). Para versões mais antigas (pré-CDI): NGK DP8EA-9 (sem resistor). Troque a cada 12.000 km. Vela preta/fuligem = mistura rica (carburador sujo ou jatos entupidos); vela branca = mistura pobre ou superaquecimento; castanho claro = combustão ideal.',
  },
  {
    severity: 'OK',
    title: 'Afogador (choke): desligue após 2 minutos de aquecimento',
    body: 'A NX 350 Sahara é 100% carburada. Acione o afogador (choke) para ligar a frio. Após 2–3 minutos ou assim que o motor pegar ritmo estável, retire o afogador gradualmente. Nunca pilote com o choke acionado — enriquece a mistura, aumenta o consumo, suja a vela e lava o cilindro com gasolina. Marcha lenta em quente: 1.200–1.400 rpm.',
  },
  {
    severity: 'OK',
    title: 'Carburador Keihin VE 35 mm — vacuum type, cuide dos jatos',
    body: 'O carburador é do tipo Keihin VE (vacuum/depressão), 35 mm. O pistão do carb é acionado por depressão — o acelerador opera apenas a borboleta. Jato principal: #118 (verificar no manual de serviço conforme ano). Jato piloto/marcha lenta: #38. Regulagem da marcha lenta: 1.200–1.400 rpm ajustado pelo parafuso de passo. Parafuso de mistura: ~2,5 voltas para fora a partir do assento (ajuste fino).',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão 520 com 98 elos — lubrifique a cada 500 km',
    body: 'Especificação da corrente: 520 com 98 elos. Fabricante confiável: VAZ 520 98L (R$80–120). Lubrifique a cada 500 km com spray específico para corrente selada (O-ring). Tensão ideal: folga de 25–35 mm no ponto mais tenso do trecho inferior, com o piloto sentado na moto. Troque corrente + coroa + pinhão SEMPRE em conjunto — coroa 40T / pinhão 14T (verificar spec do seu ano).',
  },
  {
    severity: 'DANGER',
    title: 'Corrente de DISTRIBUIÇÃO tem tensor MANUAL — ajuste obrigatório',
    body: 'Ao contrário de modelos mais modernos, a NX 350 Sahara tem tensor de corrente de distribuição MANUAL (não automático). Verifique e ajuste a cada 12.000 km. Corrente de distribuição solta produz barulho de "cascata" ao acelerar e ao dar partida. Se ignorada, a corrente pode pular de passo, destruindo o motor. Ao ajustar: afrouxe a porca de trava do tensor, aperte o parafuso central até sentir resistência e retrave. Nunca aperte demais — corrente pode romper.',
  },
  {
    severity: 'OK',
    title: 'Calibragem: 25/28 PSI (solo) · 28/33 PSI (com carga)',
    body: 'Pneus: 90/90-21 (dianteiro) e 120/90-17 (traseiro). Solo: dianteiro 25 PSI, traseiro 28 PSI. Com garupa ou carga: dianteiro 28 PSI, traseiro 33 PSI. Calibre SEMPRE com pneu frio. Para trilha e off-road: reduza para dianteiro 20–22 PSI e traseiro 24–26 PSI — maior área de contato com o solo. Ao retornar ao asfalto, recalibre imediatamente.',
  },
  {
    severity: 'OK',
    title: 'Pneus compatíveis — opções modernas para aro 21" e 17"',
    body: 'Aro dianteiro 21" (90/90-21): Pirelli MT21 Rally Cross (R$200–280), Michelin Anakee Wild (R$280–350), Metzeler Enduro 3 Sahara (curiosamente, pneu com nome da moto!) (R$230–300). Aro traseiro 17" (120/90-17): Pirelli MT15 (R$250–320), Dunlop D606 (R$220–300). Em uso predominante de asfalto: Pirelli MT60 (traseiro R$280–350). Nunca substitua o aro 21" por 19" — muda a geometria e a dirigibilidade.',
  },
  {
    severity: 'OK',
    title: 'Peça alternativa: filtro de ar Filtran 105211 — 80% mais barato',
    body: 'O filtro de ar original Honda para a NX 350 Sahara é escasso e caro (quando encontrado: R$130–200). Substituto direto: Filtran 105211 — sem adaptação, encaixa perfeitamente, qualidade confiável (R$30–50). Troque a cada 12.000 km no asfalto ou 6.000 km em uso off-road. Filtro sujo causa mistura rica, consumo alto e fuligem na vela.',
  },
  {
    severity: 'OK',
    title: 'Peça alternativa: retificador Magnetron, Full Pro, Wortech ou Chiaratto',
    body: 'O retificador/regulador de voltagem original Honda (quando encontrado) custa R$400–700. Alternativas nacionais confiáveis, com encaixe direto no conector original: Magnetron (código para NX 350, R$150–220), Full Pro NX350 (R$140–200), Wortech NX350 91-99 (MOSFET, 480W, 13,6–14,8V, R$160–240), Chiaratto NX350 (R$150–210). Qualquer um desses funciona sem adaptação. Verifique a tensão em marcha: 13,5–14,5 V com multímetro.',
  },
  {
    severity: 'OK',
    title: 'Peça alternativa: CDI compatível com CBX 200 Strada / NX 200 / XR 200',
    body: 'O CDI original da NX 350 Sahara é praticamente impossível de encontrar e caro. Para os anos 1989–1997, o CDI da Honda CBX 200 Strada, NX 200 ou XR 200 é compatível e muito mais acessível (R$60–150 nos leilões e desmanches). Atenção: verifique a compatibilidade pelo número do conector antes de comprar — os pinos devem ser idênticos. Para os anos 1998–1999 (última série), a compatibilidade pode variar.',
  },
  {
    severity: 'OK',
    title: 'Filtro de óleo: troque junto com o óleo — use filtro de boa procedência',
    body: 'A NX 350 Sahara possui filtro de óleo centrifugador (cônico, dentro do motor) — não é do tipo cartucho rosqueado. A limpeza/verificação é feita a cada troca de óleo. O filtro interno raramente precisa de substituição, mas deve ser inspecionado e limpo a cada 6.000 km. Nunca use óleo de segunda linha — o câmbio integrado é exigente. Recomendado: Motul 7100 10W-40, Shell Advance Ultra 10W-40 ou Ipiranga Moto 10W-40.',
  },
  {
    severity: 'OK',
    title: 'Tanque 15 L com torneira ON/OFF/RES — não deixe moto parada com tanque cheio',
    body: 'Tanque de 15 L, autonomia de 300–380 km dependendo do ritmo. A torneira tem três posições: ON (uso normal), RES (reserva de ~3 L) e OFF (para guardar ou limpar o carburador). Se guardar a moto por mais de 2 semanas: gire para OFF, ligue a moto e deixe o motor consumir o combustível do carburador até apagar. Isso evita que a gasolina form verniz nos jatos. Carburador com verniz = partida difícil + motor falhando.',
  },
  {
    severity: 'OK',
    title: 'Bucha da balança traseira: verifique folga lateral — peça ainda disponível',
    body: 'A bucha da balança (eixo oscilante traseiro) se desgasta com o tempo, especialmente em motos que fizeram trilha. Sintoma: folga lateral perceptível ao sacudir a roda traseira lateralmente, barulho de "traque" em irregularidades. A bucha para a NX 350 Sahara ainda é fabricada por marcas nacionais (VAZ, Motopeças). Substituição simples mas trabalhosa — requer desmontagem da balança. Negligencie por muito tempo e a balança danifica o quadro.',
  },
  {
    severity: 'OK',
    title: 'Regulagem da embreagem: folga livre de 10–20 mm no manete',
    body: 'Verifique a folga livre do manete de embreagem: deve ter 10–20 mm de jogo antes de começar a acionar. Folga zero = embreagem patinando (desgaste acelerado das lâminas). Folga excessiva = embreagem não desengaja completamente (dificuldade de engrenar marchas). Ajuste pelo parafuso na ponta do cabo ou na tampa do motor. A embreagem da Sahara é do tipo multidisco em banho de óleo — resiste bem ao uso off-road.',
  },
  {
    severity: 'OK',
    title: 'Fluido de freio DOT 4 — troque a cada 2 anos independente do uso',
    body: 'Use fluido de freio DOT 4 em todos os circuitos (dianteiro e traseiro). Troque a cada 2 anos mesmo sem muito uso — o fluido absorve umidade e perde o ponto de ebulição com o tempo, comprometendo a frenagem em descidas longas. Em motos de colecionador que ficam paradas: sempre drene e reponha o fluido antes de usar. Sinergias: não misture marcas diferentes de DOT 4.',
  },
  {
    severity: 'OK',
    title: 'Pinhão: verifique desgaste pelo perfil dos dentes — em gancho = troque já',
    body: 'O pinhão da NX 350 Sahara fica escondido atrás do protetor e muitos proprietários esquecem de verificar. Dentes desgastados ficam em forma de gancho (curvados para um lado). Pinhão desgastado joga a corrente fora com frequência, mesmo com tensão correta. Troque sempre em conjunto: corrente + pinhão + coroa. Custo do kit relação: R$150–300 (VAZ ou similar).',
  },
  {
    severity: 'OK',
    title: 'Desmanche e grupos de colecionadores — onde encontrar peças raras',
    body: 'A NX 350 Sahara tem comunidade ativa de colecionadores. Fontes de peças raras: (1) saharamaniacos.com.br — fórum específico com lista de peças alternativas; (2) Grupos no Facebook "Sahara Maniacos" e "NX 350 Sahara Brasil"; (3) Desmanches especializados em motos Honda antigas; (4) Motosclassicas80.com.br — catálogo de peças em PDF; (5) MercadoLivre com filtro por "NX 350 Sahara" + "original". Peças de carenagem e gráficos são as mais difíceis — algumas são reproduzidas por entusiastas.',
  },
]

// ─── PROBLEMAS ────────────────────────────────────────────────────────────────
const PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Retificador de voltagem: ponto de falha crônico — monitore sempre',
    body: 'O regulador/retificador de voltagem é o componente elétrico que mais falha na NX 350 Sahara. Quando falha, a bateria para de carregar e a moto apaga em movimento. Sintomas precoces: bateria nova que descarrega em dias, relógio de combustível oscilando, luz do painel piscando. Com multímetro, verifique a tensão em marcha: deve ser 13,5–14,5 V. Abaixo de 13 V: retificador falhando. Substitua preventivamente a cada 40.000 km com alternativo Magnetron, Full Pro ou Wortech.',
  },
  {
    severity: 'DANGER',
    title: 'Corrente de distribuição solta — destruição do motor se ignorada',
    body: 'O tensor da corrente de distribuição é MANUAL. Muitos mecânicos não treinados em motos antigas esquecem esse detalhe. Uma corrente solta bate no cabeçote, produz barulho metálico tipo cascata, e pode pular de passo destruindo válvulas e pistão. Custa R$30–80 fazer o ajuste em uma revisão. A retífica do motor após a corrente pular pode custar R$1.500–4.000. Nunca negligencie.',
  },
  {
    severity: 'WARN',
    title: 'Carburador entupido após moto parada — verniz nos jatos',
    body: 'Gasolina parada no carburador por mais de 3 semanas evapora e deixa verniz (depósito resinoso) obstruindo os jatos. Resultado: dificuldade de partir, motor morre ao aquecer, marcha lenta errática. Solução: limpeza completa com ultrassom ou imersão em solvente. Prevenção: ao guardar por mais de 2 semanas, feche a torneira (OFF) e deixe o motor consumir o combustível restante até apagar. Nunca armazene com gasolina E100 no carburador — o etanol puro agride as borrachas internas.',
  },
  {
    severity: 'WARN',
    title: 'Peças cada vez mais raras — 25+ anos fora de linha',
    body: 'A NX 350 Sahara saiu de produção em 1999. Com 25+ anos, peças específicas ficam escassas: carroçaria (carenagens, protetor de mão), par de amortecedores originais, gráficos/adesivos, cabeçote, válvulas, e partes menores do motor. Ao comprar uma usada: exija notas dos componentes trocados, verifique se há peças de outras motos instaladas (especialmente elétrica e carburador de modelos incompatíveis), e prefira exemplares completos mesmo que precisem de ajustes.',
  },
  {
    severity: 'WARN',
    title: 'Vedações do motor — borrachas envelhecem e causam vazamentos',
    body: 'Em motos com mais de 15–20 anos, as vedações (retentores de eixo, juntas, o-rings) ressecam e passam a vazar óleo. Pontos mais comuns: retentor do eixo de saída da embreagem, junta da tampa do motor, retentor da bengala (deixa óleo no disco de freio). Ao comprar uma Sahara usada: verifique manchas de óleo no cárter, tampas e eixos. Kits de vedação nacionais ainda são encontrados para este motor.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedor traseiro desgastado — difícil achar original',
    body: 'O amortecedor traseiro original dura 30.000–50.000 km. Com 25+ anos, praticamente toda Sahara já trocou o amortecedor por algum alternativo — qualidade varia muito. Sinais de desgaste: moto "balança" na traseira, barulho de batida em lombadas, instabilidade em curvas. Alternativo recomendado: amortecedor universal do tipo mono com regulagem de pré-carga (R$200–400). Meça o comprimento original antes de comprar o substituto.',
  },
  {
    severity: 'WARN',
    title: 'CDI original impossível de encontrar — saiba os substitutos',
    body: 'O CDI original da NX 350 Sahara está esgotado na Honda e em distribuidores. Quando a moto não dá partida sem causa aparente (motor vira mas não pega, sem faísca), o CDI é o principal suspeito. Substitutos testados pela comunidade: CDI da CBX 200 Strada (mesma família de motor), NX 200 ou XR 200. Verifique se o conector é idêntico antes de comprar. Grupos do Facebook "Sahara Maniacos" têm lista atualizada de compatibilidades testadas.',
  },
  {
    severity: 'WARN',
    title: 'Bengalas originais desgastadas — retentores e óleo interno',
    body: 'As bengalas dianteiras da NX 350 Sahara têm 33 mm de diâmetro. Com o passar dos anos, os retentores (vedações das hastes cromadas) ressecam e deixam o óleo da bengala vazar. Sintoma: haste cromada com película de óleo, frenagem dianteira com derrapagem (óleo no disco). Kits de retentores para bengalas 33 mm ainda são fabricados. Aproveite a desmontagem para trocar também o óleo interno (3W ou 5W para uso trail).',
  },
]

// ─── MANUTENÇÃO ───────────────────────────────────────────────────────────────
const MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'NX 350 Sahara', yearFrom: 1989, yearTo: 1999, component: 'Troca de óleo (10W-40 JASO MA2)', intervalKm: 3000, intervalMonths: 12, notes: 'Cap.: 2,0 L com filtro / 1,7 L sem filtro. 1ª troca em 1.000 km (rodagem)', priority: 'CRITICAL', order: 1 },
  { modelName: 'NX 350 Sahara', yearFrom: 1989, yearTo: 1999, component: 'Limpeza do filtro de óleo centrífugo', intervalKm: 6000, intervalMonths: 12, notes: 'Filtro interno cônico — limpar e inspecionar. Não é cartucho trocável', priority: 'HIGH', order: 2 },
  { modelName: 'NX 350 Sahara', yearFrom: 1989, yearTo: 1999, component: 'Vela de ignição (NGK DPR8EA-9)', intervalKm: 12000, intervalMonths: 24, notes: 'Gap: 0,80–0,90 mm. Limpar e medir gap a cada 6.000 km', priority: 'HIGH', order: 3 },
  { modelName: 'NX 350 Sahara', yearFrom: 1989, yearTo: 1999, component: 'Filtro de ar (Filtran 105211 ou similar)', intervalKm: 12000, intervalMonths: 12, notes: 'Off-road: reduzir para 6.000 km. Alternativo Filtran 105211 encaixa direto', priority: 'HIGH', order: 4 },
  { modelName: 'NX 350 Sahara', yearFrom: 1989, yearTo: 1999, component: 'Folga das válvulas (IN: 0,10 mm / EX: 0,12 mm)', intervalKm: 12000, intervalMonths: 24, notes: 'Verificar com motor FRIO (4h+ após uso). Motor RFVC tem 4 válvulas total', priority: 'HIGH', order: 5 },
  { modelName: 'NX 350 Sahara', yearFrom: 1989, yearTo: 1999, component: 'Tensor da corrente de distribuição (MANUAL)', intervalKm: 12000, intervalMonths: 24, notes: 'CRÍTICO — tensor não é automático. Afrouxar trava, apertar esticador, retravar', priority: 'CRITICAL', order: 6 },
  { modelName: 'NX 350 Sahara', yearFrom: 1989, yearTo: 1999, component: 'Tensão da corrente de transmissão (520 / 98L)', intervalKm: 1000, intervalMonths: null, notes: 'Folga: 25–35 mm com piloto sentado. Lubrificar a cada 500 km ou após chuva', priority: 'MEDIUM', order: 7 },
  { modelName: 'NX 350 Sahara', yearFrom: 1989, yearTo: 1999, component: 'Lubrificação da corrente de transmissão', intervalKm: 500, intervalMonths: null, notes: 'Spray para corrente O-ring. Nunca WD-40 ou óleo de cozinha', priority: 'MEDIUM', order: 8 },
  { modelName: 'NX 350 Sahara', yearFrom: 1989, yearTo: 1999, component: 'Kit relação (corrente + coroa + pinhão)', intervalKm: 20000, intervalMonths: null, notes: 'Substituir sempre os 3 em conjunto. Coroa 40T / pinhão 14T (verificar no ano)', priority: 'HIGH', order: 9 },
  { modelName: 'NX 350 Sahara', yearFrom: 1989, yearTo: 1999, component: 'Limpeza e regulagem do carburador Keihin VE', intervalKm: 6000, intervalMonths: 12, notes: 'Marcha lenta: 1.200–1.400 rpm. Parafuso de mistura: ~2,5 voltas a partir do assento', priority: 'MEDIUM', order: 10 },
  { modelName: 'NX 350 Sahara', yearFrom: 1989, yearTo: 1999, component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, notes: 'Trocar mesmo sem uso intenso — absorve umidade. Freio diant. disco / tras. tambor', priority: 'HIGH', order: 11 },
  { modelName: 'NX 350 Sahara', yearFrom: 1989, yearTo: 1999, component: 'Pastilhas de freio dianteiro', intervalKm: 15000, intervalMonths: null, notes: 'Verificar espessura. Substituir se abaixo de 2 mm', priority: 'HIGH', order: 12 },
  { modelName: 'NX 350 Sahara', yearFrom: 1989, yearTo: 1999, component: 'Retentores das bengalas (33 mm)', intervalKm: 20000, intervalMonths: null, notes: 'Inspecionar vazamento de óleo na haste. Off-road intenso desgasta mais rápido', priority: 'HIGH', order: 13 },
  { modelName: 'NX 350 Sahara', yearFrom: 1989, yearTo: 1999, component: 'Retificador de voltagem', intervalKm: 40000, intervalMonths: null, notes: 'Verificar tensão em marcha: 13,5–14,5 V. Substituir preventivamente (Magnetron/Full Pro)', priority: 'CRITICAL', order: 14 },
  { modelName: 'NX 350 Sahara', yearFrom: 1989, yearTo: 1999, component: 'Bateria (12V)', intervalKm: null, intervalMonths: 24, notes: 'Tensão em repouso: mín. 12,6 V. Verificar retificador antes de trocar a bateria', priority: 'MEDIUM', order: 15 },
  { modelName: 'NX 350 Sahara', yearFrom: 1989, yearTo: 1999, component: 'Bucha da balança traseira', intervalKm: 30000, intervalMonths: null, notes: 'Verificar folga lateral na roda traseira. Bucha VAZ/similar disponível', priority: 'MEDIUM', order: 16 },
  { modelName: 'NX 350 Sahara', yearFrom: 1989, yearTo: 1999, component: 'Regulagem da embreagem', intervalKm: 6000, intervalMonths: 12, notes: 'Folga livre no manete: 10–20 mm. Ajustar pelo parafuso no cabo ou na tampa', priority: 'LOW', order: 17 },
  { modelName: 'NX 350 Sahara', yearFrom: 1989, yearTo: 1999, component: 'Calibragem dos pneus', intervalKm: null, intervalMonths: null, notes: 'Solo: D 25 / T 28 PSI. Com carga: D 28 / T 33 PSI. Off-road: D 20–22 / T 24–26 PSI', priority: 'HIGH', order: 18 },
]

// ─── Calibragem ───────────────────────────────────────────────────────────────
const TIRE_PRESSURES = [
  {
    modelName: 'NX 350 Sahara',
    yearFrom: 1989, yearTo: 1999,
    tireSize: '90/90-21 (F) · 120/90-17 (R)',
    frontPsi: 25, rearPsi: 28,
    frontPsiLoad: 28, rearPsiLoad: 33,
    notes: 'Trail. Off-road: reduzir para D 20–22 / T 24–26 PSI (maior aderência em terra). Recalibrar IMEDIATAMENTE ao retornar ao asfalto. Verificar sempre com pneu frio. Pneus compatíveis: dianteiro Pirelli MT21 ou Michelin Anakee Wild 90/90-21; traseiro Pirelli MT15 ou Dunlop D606 120/90-17.',
  },
]

// ─── Main ─────────────────────────────────────────────────────────────────────
const MODEL_NAME = 'NX 350 Sahara'
const YEAR_FROM   = 1989
const YEAR_TO     = 1999

async function main() {
  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })

  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Honda', vehicleTypeId: motoType.id } },
    update: {}, create: { name: 'Honda', vehicleTypeId: motoType.id },
  })

  const brand = await prisma.brand.findFirstOrThrow({
    where: { name: 'Honda', vehicleTypeId: motoType.id },
  })

  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: MODEL_NAME, brandId: brand.id } },
    update: {}, create: { name: MODEL_NAME, brandId: brand.id },
  })

  const allTips = [
    ...MACETES.map(t  => ({ ...t, category: 'MACETES'   as Cat })),
    ...PROBLEMAS.map(t => ({ ...t, category: 'PROBLEMAS' as Cat })),
  ]

  await prisma.tip.deleteMany({ where: { modelName: MODEL_NAME } })
  await prisma.tip.createMany({
    data: allTips.map((tip, i) => ({
      modelName: MODEL_NAME,
      yearFrom: YEAR_FROM,
      yearTo:   YEAR_TO,
      severity: tip.severity,
      category: tip.category,
      title: tip.title,
      body:  tip.body,
      order: i,
    })),
  })
  console.log(`✅ ${MODEL_NAME}: ${allTips.length} tips (${MACETES.length} macetes + ${PROBLEMAS.length} problemas)`)

  await prisma.tirePressure.deleteMany({ where: { modelName: MODEL_NAME } })
  await prisma.tirePressure.create({ data: TIRE_PRESSURES[0] })
  console.log(`🔵 TirePressure: ${MODEL_NAME}`)

  await prisma.maintenanceItem.deleteMany({ where: { modelName: MODEL_NAME } })
  await prisma.maintenanceItem.createMany({ data: MANUTENCAO })
  console.log(`🔧 MaintenanceItems: ${MANUTENCAO.length} itens`)

  console.log(`\n✅ Honda NX 350 Sahara seed concluído! 1 modelo, ${allTips.length} tips, 1 calibragem, ${MANUTENCAO.length} itens de manutenção`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
