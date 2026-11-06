// seed-honda-cb500.ts — Honda CB 500 / CB 500F / CB 500X
// CB 500 clássica (1994-2003) | CB 500F (2013-atual) | CB 500X (2013-atual)
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

// ─── Honda CB 500 Clássica (1994–2003) — 499cc DOHC, 2 carburadores ──────────

const CB500_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA2 — twin arrefecido a líquido, câmbio integrado',
    body: 'Use óleo 10W-40 JASO MA2 (ou JASO MA). O motor é arrefecido a líquido, mas o câmbio integrado exige obrigatoriamente JASO MA/MA2 — nunca JASO MB (exclusivo para scooters CVT). Capacidade: ~2,8 L na troca normal (sem filtro) ou ~3,0 L trocando o filtro também. Troque a cada 5.000–6.000 km. Verifique o nível no visor do cárter com a moto na vertical em superfície plana.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR8EH-9 — gap 0,8–0,9 mm, sempre troque em par',
    body: 'Vela original: NGK CR8EH-9 (gap 0,8–0,9 mm). São 2 cilindros = 2 velas — troque sempre em par para ignição simétrica. Intervalo: 8.000–10.000 km. A vela saudável tem eletrodo cinza claro; preta indica mistura rica ou óleo queimando; branca indica mistura pobre. Alternativa iridium NGK CR8EIX: dura o dobro e melhora a resposta em baixa rotação.',
  },
  {
    severity: 'OK',
    title: 'Dois carburadores Keihin — sincronismo é chave para o desempenho',
    body: 'O motor 499cc tem um carburador Keihin por cilindro. Fora de sincronia, a moto trepida, consome mais e perde potência nas retomadas. Verifique a sincronia a cada 6.000 km com manômetro de vácuo duplo. Não tente sincronizar "no ouvido" sem experiência — os dois cilindros devem apresentar vácuo idêntico em marcha lenta. Oficinas especializadas em japonesas clássicas têm o equipamento correto.',
  },
  {
    severity: 'OK',
    title: 'Motor DOHC 499cc — folga de válvulas a cada 16.000 km',
    body: 'O motor DOHC tem 8 válvulas (4 por cilindro). Folgas corretas com motor FRIO: admissão 0,10 mm / escapamento 0,20 mm. Verifique a cada 16.000 km. A regulagem é por tachinhas (shims) — requer compressor de mola de válvula e jogo de shims calibrados. Se ouvir tilintado metálico no cabeçote durante uso, agende revisão de válvulas imediatamente: válvulas fora de folga comprometem compressão e podem queimar.',
  },
  {
    severity: 'OK',
    title: 'Motor arrefecido a líquido — fluido 50/50, nunca água pura',
    body: 'Use fluido de arrefecimento diluído 50/50 com água destilada. Nunca use água da torneira (causa ferrugem e incrustação no radiador). Troque o fluido a cada 2 anos ou 24.000 km. Verifique o nível no reservatório de expansão regularmente. Com o motor quente, NUNCA abra a tampa do radiador — o sistema está pressurizado e o líquido sob pressão causa queimaduras graves.',
  },
  {
    severity: 'OK',
    title: 'Tanque de 18 L — gasolina velha entope os jatos dos carburadores',
    body: 'O tanque da CB 500 clássica tem 18 litros. Consumo médio: ~20 km/l urbano; ~13 km/l em pilotagem esportiva. Autonomia prática: ~300 km. Não deixe a moto parada com tanque cheio por mais de 30 dias sem usar estabilizador de combustível. O etanol da gasolina brasileira resseca juntas e entope jatos finos dos carburadores. Antes de guardar por longa data, esvazie os carburadores ou use estabilizador.',
  },
  {
    severity: 'OK',
    title: 'Freios: disco 296 mm F / 240 mm R — fluido DOT 4, troca bienal',
    body: 'Use fluido de freio DOT 4 (nunca DOT 3 ou DOT 5 de silicone). Troque a cada 2 anos independente do km, pois o DOT 4 absorve umidade com o tempo e perde o ponto de ebulição. Em motos com mais de 15 anos, inspecione as mangueiras de freio por rachaduras e endurecimento — borracha envelhecida falha sem aviso. Mangueiras de aço inox (aftermarket) melhoram a resistência e o toque.',
  },
  {
    severity: 'OK',
    title: 'Transmissão por corrente — lubrificação e ajuste regulares',
    body: 'Lubrifique a corrente a cada 500–1.000 km ou após chuva. Use lubrificante específico para corrente O-ring (spray). Ajuste a folga para 25–35 mm de jogo vertical no ponto mais tenso da corrente. Corrente esticada pode saltar e danificar o câmbio ou a carcaça. Inspecione o desgaste dos dentes do pinhão e da coroa — troque sempre o kit completo (corrente + pinhão + coroa) para garantir engajamento suave.',
  },
]

const CB500_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Retificador/regulador de voltagem — falha causa dano elétrico em cascata',
    body: 'O retificador é o ponto fraco elétrico da CB 500 clássica. Quando falha, o alternador sobrecarrega a bateria (tensão pode ultrapassar 16V), queimando o próprio retificador, a bateria e outros componentes elétricos. Sintomas: bateria não segura carga, farol oscila em aceleração, moto para repentinamente. Teste: com a moto a 4.000 rpm, meça a tensão na bateria — deve estar entre 13,5 e 14,5V. Substitua preventivamente após 40.000 km ou se o original estiver quente ao toque em uso normal. Alternativo confiável: Chiaratto ou Servitec (~R$ 150–250).',
  },
  {
    severity: 'WARN',
    title: 'Carburadores ressecados após pausa longa — limpeza profunda necessária',
    body: 'Moto parada por mais de 3 meses quase certamente precisa de limpeza profunda nos carburadores. A gasolina com etanol resseca juntas, entope jatos e oxida as agulhas. Sintoma: não pega ou para em marcha lenta. Não adianta apenas colocar gasolina nova. O kit de reparo (jatos, agulha e membrana) deve ser substituído. Preventivo: antes de guardar, esvazie os carburadores ou adicione estabilizador de combustível no tanque.',
  },
  {
    severity: 'WARN',
    title: 'Bomba d\'água — vedação interna desgasta em motos com mais de 60.000 km',
    body: 'O oil seal (vedação) da bomba d\'água tende a falhar em motos com mais de 60.000 km ou após muitos anos. Sintoma: pequena mancha de fluido de arrefecimento no solo após estacionar, ou emulsão esbranquiçada (óleo + fluido misturados) visível na tampa do óleo. Inspecione o orifício de ventilação da bomba a cada revisão. Troca preventiva da vedação sai em torno de R$ 200–350 em mão de obra e vale muito como prevenção.',
  },
  {
    severity: 'WARN',
    title: 'Tensor da corrente de distribuição — barulho metálico na partida a frio',
    body: 'O tensor da corrente de distribuição é manual e exige ajuste periódico. Corrente frouxa bate no cabeçote, causando barulho metálico nos primeiros segundos após a partida (enquanto o óleo ainda não circulou). Com o tempo, corrente esticada pode pular dentes e destruir o motor. Nunca ignore esse barulho. Verifique o tensor a cada 12.000 km e ajuste conforme manual do proprietário.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento — termostato travado ou radiador entupido em motos antigas',
    body: 'Em motos com mais de 20 anos, o termostato pode travar em posição fechada (bloqueia circulação pelo radiador) ou o radiador pode estar parcialmente entupido por ferrugem do fluido nunca trocado. Sintoma: temperatura sobe rápido mesmo em movimento. Verifique se a ventoinha elétrica liga acima de ~90°C. Termostato travado causa dano ao cabeçote em minutos — pare imediatamente se o indicador entrar na zona vermelha.',
  },
]

const CB500_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CB 500', yearFrom: 1994, yearTo: 2003, component: 'Óleo do motor + filtro', intervalKm: 5000, intervalMonths: 6, notes: '~3,0 L com filtro; 10W-40 JASO MA2', priority: 'CRITICAL', order: 1 },
  { modelName: 'CB 500', yearFrom: 1994, yearTo: 2003, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Inspecionar a cada 6.000 km; trocar se sujo', priority: 'HIGH', order: 2 },
  { modelName: 'CB 500', yearFrom: 1994, yearTo: 2003, component: 'Velas de ignição (NGK CR8EH-9)', intervalKm: 10000, intervalMonths: 12, notes: '2 velas — trocar em par; gap 0,8–0,9 mm', priority: 'HIGH', order: 3 },
  { modelName: 'CB 500', yearFrom: 1994, yearTo: 2003, component: 'Sincronismo dos carburadores', intervalKm: 6000, intervalMonths: 6, notes: 'Manômetro de vácuo duplo; 2 Keihin, 1 por cilindro', priority: 'HIGH', order: 4 },
  { modelName: 'CB 500', yearFrom: 1994, yearTo: 2003, component: 'Folga de válvulas (shims)', intervalKm: 16000, intervalMonths: 24, notes: 'DOHC; IN 0,10 mm / EX 0,20 mm (motor frio)', priority: 'HIGH', order: 5 },
  { modelName: 'CB 500', yearFrom: 1994, yearTo: 2003, component: 'Tensor da corrente de distribuição', intervalKm: 12000, intervalMonths: 12, notes: 'Manual; ajustar se ouvir batida ao dar partida a frio', priority: 'HIGH', order: 6 },
  { modelName: 'CB 500', yearFrom: 1994, yearTo: 2003, component: 'Fluido de arrefecimento', intervalKm: 24000, intervalMonths: 24, notes: 'Mistura 50/50 água destilada + anticongelante', priority: 'HIGH', order: 7 },
  { modelName: 'CB 500', yearFrom: 1994, yearTo: 2003, component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, notes: 'Trocar a cada 2 anos independente do km', priority: 'HIGH', order: 8 },
  { modelName: 'CB 500', yearFrom: 1994, yearTo: 2003, component: 'Corrente de transmissão', intervalKm: 1000, intervalMonths: null, notes: 'Lubrificar a cada 1.000 km; folga 25–35 mm', priority: 'MEDIUM', order: 9 },
  { modelName: 'CB 500', yearFrom: 1994, yearTo: 2003, component: 'Pastilhas de freio', intervalKm: 20000, intervalMonths: null, notes: 'Inspecionar a cada 10.000 km; trocar se <2 mm', priority: 'HIGH', order: 10 },
  { modelName: 'CB 500', yearFrom: 1994, yearTo: 2003, component: 'Retificador/regulador de voltagem', intervalKm: 40000, intervalMonths: null, notes: 'Testar tensão na bateria: 13,5–14,5V em 4.000 rpm', priority: 'HIGH', order: 11 },
  { modelName: 'CB 500', yearFrom: 1994, yearTo: 2003, component: 'Pneus', intervalKm: 15000, intervalMonths: null, notes: 'Inspecionar desgaste e trincas; trocar conforme necessário', priority: 'MEDIUM', order: 12 },
  { modelName: 'CB 500', yearFrom: 1994, yearTo: 2003, component: 'Bateria', intervalKm: null, intervalMonths: 24, notes: 'Verificar carga e terminais; vida útil ~3 anos', priority: 'MEDIUM', order: 13 },
]

// ─── Honda CB 500F (2013–atual) — 471cc DOHC, injeção PGM-FI, naked ──────────

const CB500F_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA2 — especificação oficial; 10W-40 aceito no calor',
    body: 'A Honda recomenda 10W-30 JASO MA2 (API SL ou superior) para o motor 471cc. Capacidade: 3,5 L com filtro. Em climas muito quentes (verão brasileiro com temperatura ambiente acima de 35°C), muitos proprietários usam 10W-40 JASO MA2 sem problemas. Troque a cada 6.000 km. Em uso urbano intenso com muita parada, reduza para 5.000 km. Nunca use JASO MB — o câmbio integrado exige MA.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CPR8EA-9 — gap 0,9 mm; iridium dura o dobro',
    body: 'Vela original: NGK CPR8EA-9 (gap 0,9 mm). São 2 cilindros = 2 velas — troque sempre em par. Intervalo: 12.000 km (cobre) ou 24.000 km (iridium NGK DCPR8EIX). A vela iridium é mais cara mas entrega melhor ignição em baixa rotação e dura mais. Verifique o gap ao instalar mesmo em velas novas — podem vir ligeiramente fora de fábrica.',
  },
  {
    severity: 'OK',
    title: 'Injeção PGM-FI — sem afogador, partida simples sempre',
    body: 'A CB 500F usa injeção eletrônica PGM-FI. Não há afogador nem carburador. Na partida a frio, a injeção ajusta automaticamente a mistura — ligue e aguarde 1–2 minutos sem acelerar. Nunca tente "afagar" acelerando repetidamente: a ECU já está fazendo o trabalho. Se a moto não pegar, verifique a bateria (mínimo 12,6V), o corte de bota e os fusíveis antes de acionar a assistência.',
  },
  {
    severity: 'OK',
    title: 'Folgas de válvulas por shims — IN 0,16 mm / EX 0,27 mm a cada 16.000 km',
    body: 'O motor DOHC 471cc regula válvulas por shims (anilhas calibradas). Folgas com motor FRIO: admissão 0,16 mm (±0,03) / escapamento 0,27 mm (±0,03). Verifique a cada 16.000 km. O procedimento exige compressor de mola de válvula e kit de shims — trabalho de oficina especializada. A boa notícia: motores modernos tendem a "apertar" as válvulas lentamente, então muitas CB 500F chegam aos 32.000 km sem precisar de troca de shims.',
  },
  {
    severity: 'OK',
    title: 'ABS de série — não interfira com extensores de disco ou acessórios no cubo',
    body: 'A CB 500F vendida no Brasil (a partir de 2014) tem ABS de série. O sistema é confiável e requer zero manutenção especial. Evite instalar extensores de disco de freio ou qualquer acessório nos cubos da roda — podem interferir com os sensores de velocidade ABS. Em frenagem de emergência, aplique pressão firme e contínua: o ABS modula automaticamente para evitar trava e manter a estabilidade direcional.',
  },
  {
    severity: 'OK',
    title: 'Pneus 120/70-17 (F) · 160/60-17 (R) — calibragem 32/36 PSI solo',
    body: 'A CB 500F usa pneus esportivos aro 17": dianteiro 120/70-17 e traseiro 160/60-17. Calibragem Honda: dianteiro 32 PSI / traseiro 36 PSI com piloto solo; dianteiro 32 PSI / traseiro 42 PSI com garupa. Calibre sempre com pneus frios (antes de rodar ou após 3+ horas parada). Não use a pressão máxima do flanco do pneu — essa é a pressão de suporte de carga máxima, não de uso.',
  },
  {
    severity: 'OK',
    title: 'Consumo médio 28–30 km/l — autonomia real com tanque de 17,1 L',
    body: 'Com tanque de 17,1 L e consumo médio de 28–30 km/l em uso misto, a autonomia real fica em ~450 km. Em rodovia a 120 km/h, o consumo pode melhorar para ~32 km/l. O limite de velocidade estrutural e aerodinâmica da CB 500F fica em torno de 175–180 km/h. Não esgote o tanque: a bomba de combustível interna precisa de gasolina para se refrigerar.',
  },
]

const CB500F_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Bomba d\'água — falha crônica, especialmente nos anos 2019–2022',
    body: 'A bomba d\'água é o problema mais reportado nas CB 500 modernas (F e X). A vedação interna pode vazar fluido de arrefecimento para o óleo (emulsão branca visível na vareta) ou vazar externamente (pingo de fluido no solo). Se notar nível de óleo subindo sem abastecer, ou cor esbranquiçada no óleo, PARE imediatamente — continuar com óleo contaminado destrói o motor em poucos minutos. Honda emitiu boletins técnicos (TSBs) sobre o problema. Consulte o site Honda com o número do chassi para verificar se há recall aberto para seu ano/lote.',
  },
  {
    severity: 'WARN',
    title: 'Retificador de voltagem — superaquecimento em uso urbano intenso no calor',
    body: 'O retificador da CB 500F fica exposto ao fluxo de ar, mas em uso urbano com baixa velocidade e alta temperatura ambiente (Brasil), pode superaquecer e falhar prematuramente. Sintoma: bateria não segura carga, tensão flutuante. Teste: meça a tensão com moto a 4.000 rpm — deve estar entre 13,5 e 14,5V. Não bloqueie a área de ventilação do retificador com acessórios. Substitua preventivamente ao sinal de tensão irregular.',
  },
  {
    severity: 'WARN',
    title: 'Válvulas que apertam — ignorar leva à queima do cabeçote',
    body: 'Os motores DOHC com shims tendem a ter as válvulas apertando com o uso (folga diminuindo), ao contrário dos motores mais antigos. Folga admissão abaixo de 0,13 mm ou escapamento abaixo de 0,24 mm requer troca do shim. Se a revisão de válvulas for ignorada, a válvula não fecha completamente, superaquece e queima o assento — dano que exige retífica ou troca do cabeçote. Custo da revisão preventiva: ~R$ 600–900. Custo de ignorar: R$ 3.000+.',
  },
  {
    severity: 'WARN',
    title: 'Luz de check acesa — leia os códigos antes de qualquer intervenção',
    body: 'O sistema PGM-FI armazena códigos de falha (DTCs) quando detecta problema. A luz "check" acesa indica falha no sistema de injeção, sensor MAP, sensor de temperatura, sonda lambda ou bomba de combustível. Use um scanner OBD compatível com Honda ou o HDS (Honda Diagnostic System) para ler os códigos. Não tente resetar a ECU desconectando a bateria para "apagar" a luz — pode eliminar histórico valioso para o diagnóstico.',
  },
]

const CB500F_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CB 500F', yearFrom: 2013, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 6000, intervalMonths: 6, notes: '3,5 L com filtro; 10W-30 JASO MA2', priority: 'CRITICAL', order: 1 },
  { modelName: 'CB 500F', yearFrom: 2013, yearTo: null, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Inspecionar a cada 6.000 km; trocar se sujo', priority: 'HIGH', order: 2 },
  { modelName: 'CB 500F', yearFrom: 2013, yearTo: null, component: 'Velas de ignição (NGK CPR8EA-9)', intervalKm: 12000, intervalMonths: 12, notes: '2 velas em par; gap 0,9 mm; iridium dura 24.000 km', priority: 'HIGH', order: 3 },
  { modelName: 'CB 500F', yearFrom: 2013, yearTo: null, component: 'Folga de válvulas (shims)', intervalKm: 16000, intervalMonths: 24, notes: 'IN 0,16 mm / EX 0,27 mm (motor frio)', priority: 'HIGH', order: 4 },
  { modelName: 'CB 500F', yearFrom: 2013, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 24000, intervalMonths: 24, notes: 'Mistura 50/50 água destilada + anticongelante', priority: 'HIGH', order: 5 },
  { modelName: 'CB 500F', yearFrom: 2013, yearTo: null, component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, notes: 'Trocar a cada 2 anos; verificar nível mensalmente', priority: 'HIGH', order: 6 },
  { modelName: 'CB 500F', yearFrom: 2013, yearTo: null, component: 'Corrente de transmissão', intervalKm: 1000, intervalMonths: null, notes: 'Lubrificar a cada 1.000 km; folga 30–40 mm', priority: 'MEDIUM', order: 7 },
  { modelName: 'CB 500F', yearFrom: 2013, yearTo: null, component: 'Pastilhas de freio', intervalKm: 20000, intervalMonths: null, notes: 'Inspecionar a cada 10.000 km; trocar se <2 mm', priority: 'HIGH', order: 8 },
  { modelName: 'CB 500F', yearFrom: 2013, yearTo: null, component: 'Bomba d\'água', intervalKm: 24000, intervalMonths: 24, notes: 'Inspecionar vedação; verificar recall no site Honda pelo chassi', priority: 'HIGH', order: 9 },
  { modelName: 'CB 500F', yearFrom: 2013, yearTo: null, component: 'Filtro de combustível', intervalKm: 24000, intervalMonths: 24, notes: 'Interno na bomba; trocar se a vazão diminuir', priority: 'MEDIUM', order: 10 },
  { modelName: 'CB 500F', yearFrom: 2013, yearTo: null, component: 'Pneus', intervalKm: 15000, intervalMonths: null, notes: '120/70-17 F · 160/60-17 R; inspecionar desgaste e trincas', priority: 'MEDIUM', order: 11 },
  { modelName: 'CB 500F', yearFrom: 2013, yearTo: null, component: 'Sensores ABS', intervalKm: null, intervalMonths: 12, notes: 'Inspecionar fixação e fiação dos anéis fônicos', priority: 'LOW', order: 12 },
  { modelName: 'CB 500F', yearFrom: 2013, yearTo: null, component: 'Bateria', intervalKm: null, intervalMonths: 36, notes: 'Vida útil ~3 anos; tensão mínima em frio: 12,6V', priority: 'MEDIUM', order: 13 },
]

// ─── Honda CB 500X (2013–atual) — 471cc DOHC, injeção, adventure ─────────────

const CB500X_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Pneu 19" dianteiro (2019+) — trail/asfalto, não é enduro',
    body: 'A partir do restyling 2019, a CB 500X recebeu pneu dianteiro 110/80-19 (aro 19") e traseiro 160/60-17, no lugar dos aro 17" da geração 2013–2018. O pneu 19" melhora levemente em terra batida, mas a CB 500X NÃO é uma moto de enduro — evite trilhas com barro profundo, pedras soltas ou declives acentuados. O peso (~193 kg abastecida), a suspensão e os pneus não são adequados para off-road pesado. É uma adventure para estradas mistas e secundárias, não trilhas.',
  },
  {
    severity: 'OK',
    title: 'Calibragem correta por geração — 2013-2018 usa aro 17", 2019+ usa aro 19"',
    body: 'CB 500X 2013–2018 (aro 17" igual à CB 500F): dianteiro 36 PSI / traseiro 42 PSI solo. CB 500X 2019+ (aro 19" dianteiro): dianteiro 32 PSI / traseiro 36 PSI solo; dianteiro 32 PSI / traseiro 42 PSI com garupa. Calibre sempre com pneus frios. Em viagens longas com bagagem pesada, use os valores com carga para manter estabilidade e desgaste uniforme. A calibragem correta também afeta a sensação de esforço na direção.',
  },
  {
    severity: 'OK',
    title: 'Mesma mecânica da CB 500F — óleo, velas e válvulas idênticos',
    body: 'O motor 471cc DOHC, o óleo (10W-30 JASO MA2, 3,5 L), as velas (NGK CPR8EA-9, gap 0,9 mm) e as folgas de válvulas (IN 0,16 mm / EX 0,27 mm) são idênticos aos da CB 500F. O mesmo mecânico, as mesmas peças e os mesmos intervalos. A diferença está na posição de pilotagem (guidão alto adventure), no banco mais alto (830 mm vs 789 mm da F), nos pneus e no protetor lateral do motor (que deve ser instalado como acessório).',
  },
  {
    severity: 'OK',
    title: 'Banco de 830 mm — há kits de abaixamento para pilotos mais baixos',
    body: 'O banco da CB 500X tem 830 mm de altura — pilotos até ~1,68 m podem ter dificuldade em apoiar um pé completamente no chão. A Honda oferece banco de baixa altura (~810 mm) como opção de fábrica. No mercado aftermarket há kits de rebaixamento de links da suspensão traseira (~20–30 mm mais baixo) e selos de garfo mais curtos. Com pneu 19" dianteiro, a moto tende a inclinar mais ao parar — pratique o apoio de ponta de pé antes de usar em trânsito intenso.',
  },
  {
    severity: 'OK',
    title: 'Protetor de motor em alumínio — obrigatório para uso misto',
    body: 'Para qualquer uso em terra ou viagens longas, instale protetor de motor (sump guard) em alumínio. O cárter fica baixo e vulnerável a pedras. Um bom protetor custa R$ 400–800 e pode evitar R$ 3.000+ de dano. Não use protetor de plástico — dissipa mal o calor e pode quebrar no impacto, causando dano maior do que sem proteção. Verifique periodicamente se o protetor não está obstruindo o fluxo de ar para o motor.',
  },
  {
    severity: 'OK',
    title: 'Consumo médio 30–35 km/l — autonomia real com tanque de 17,7 L',
    body: 'A CB 500X tem tanque de 17,7 L. Com consumo médio de 30–35 km/l em uso misto, a autonomia real fica em ~480–550 km. Em rodovia a 110 km/h, o consumo melhora para ~35 km/l. Em trilhas ou serrano (muita aceleração e freio), cai para ~25 km/l. Em viagens por regiões com postos escassos (norte ou interior), planeje paradas a cada 350–400 km para ter margem de segurança.',
  },
]

const CB500X_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Bomba d\'água — problema crônico mais frequente que na CB 500F',
    body: 'A CB 500X teve mais relatos de falha de bomba d\'água do que a F, especialmente nos anos 2019–2022. A vedação pode vazar internamente (óleo contaminado com fluido, emulsão branca) ou externamente (pingo de fluido no solo). Há registros de falhas com menos de 20.000 km. Antes de qualquer viagem longa, verifique o óleo e o nível do fluido de arrefecimento. Se encontrar emulsão branca no óleo ou na tampa do radiador, PARE — não continue andando. Consulte o site Honda com o número do chassi para verificar recall aberto para seu lote.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão traseira com pré-carga — não deixe rígida sem carga',
    body: 'A CB 500X tem ajuste de pré-carga na suspensão traseira (ferramenta de gancho). Para piloto solo: posição mais fraca ou intermediária. Para piloto + garupa + bagagem: posição mais rígida. Não deixe na posição mais rígida sem carga — o amortecedor não absorve bem os impactos pequenos, acelerando o desgaste dos rolamentos do basculante e transmitindo vibração excessiva. Ajuste sempre conforme a carga real do momento.',
  },
  {
    severity: 'WARN',
    title: 'Conectores elétricos em uso na chuva — oxidação causa falhas intermitentes',
    body: 'Em uso frequente na chuva ou lavagens com água pressurizada, os conectores elétricos (especialmente os dos sensores ABS e do farol LED) podem oxidar ao longo do tempo. Sintomas: luz que pisca esporadicamente, erros intermitentes no painel, ABS ligando em velocidades não esperadas. Aplique vaselina técnica ou graxa di-elétrica nos conectores durante as manutenções preventivas. Nunca direcione mangueira de pressão diretamente nos blocos de conectores ao lavar a moto.',
  },
]

const CB500X_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CB 500X', yearFrom: 2013, yearTo: null, component: 'Óleo do motor + filtro', intervalKm: 6000, intervalMonths: 6, notes: '3,5 L com filtro; 10W-30 JASO MA2', priority: 'CRITICAL', order: 1 },
  { modelName: 'CB 500X', yearFrom: 2013, yearTo: null, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Trocar a cada 6.000 km em uso em terra/poeira', priority: 'HIGH', order: 2 },
  { modelName: 'CB 500X', yearFrom: 2013, yearTo: null, component: 'Velas de ignição (NGK CPR8EA-9)', intervalKm: 12000, intervalMonths: 12, notes: '2 velas em par; gap 0,9 mm', priority: 'HIGH', order: 3 },
  { modelName: 'CB 500X', yearFrom: 2013, yearTo: null, component: 'Folga de válvulas (shims)', intervalKm: 16000, intervalMonths: 24, notes: 'IN 0,16 mm / EX 0,27 mm (motor frio)', priority: 'HIGH', order: 4 },
  { modelName: 'CB 500X', yearFrom: 2013, yearTo: null, component: 'Fluido de arrefecimento', intervalKm: 24000, intervalMonths: 24, notes: 'Mistura 50/50 água destilada + anticongelante', priority: 'HIGH', order: 5 },
  { modelName: 'CB 500X', yearFrom: 2013, yearTo: null, component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, notes: 'Trocar a cada 2 anos; verificar nível mensalmente', priority: 'HIGH', order: 6 },
  { modelName: 'CB 500X', yearFrom: 2013, yearTo: null, component: 'Corrente de transmissão', intervalKm: 1000, intervalMonths: null, notes: 'Lubrificar a cada 1.000 km; folga 30–40 mm', priority: 'MEDIUM', order: 7 },
  { modelName: 'CB 500X', yearFrom: 2013, yearTo: null, component: 'Pastilhas de freio', intervalKm: 20000, intervalMonths: null, notes: 'Inspecionar a cada 10.000 km; trocar se <2 mm', priority: 'HIGH', order: 8 },
  { modelName: 'CB 500X', yearFrom: 2013, yearTo: null, component: 'Bomba d\'água', intervalKm: 24000, intervalMonths: 24, notes: 'Verificar vedação; consultar recall pelo chassi no site Honda', priority: 'HIGH', order: 9 },
  { modelName: 'CB 500X', yearFrom: 2013, yearTo: null, component: 'Pneus', intervalKm: 15000, intervalMonths: null, notes: '2019+: 110/80-19 F / 160/60-17 R; 2013–18: 120/70-17 F / 160/60-17 R', priority: 'MEDIUM', order: 10 },
  { modelName: 'CB 500X', yearFrom: 2013, yearTo: null, component: 'Rolamentos do basculante', intervalKm: 30000, intervalMonths: null, notes: 'Inspecionar; desgaste acelerado com pré-carga excessiva sem carga', priority: 'MEDIUM', order: 11 },
  { modelName: 'CB 500X', yearFrom: 2013, yearTo: null, component: 'Protetor de motor (alumínio)', intervalKm: null, intervalMonths: null, notes: 'Acessório: instalar preventivamente para uso misto on/off', priority: 'LOW', order: 12 },
  { modelName: 'CB 500X', yearFrom: 2013, yearTo: null, component: 'Bateria', intervalKm: null, intervalMonths: 36, notes: 'Vida útil ~3 anos; tensão mínima em frio: 12,6V', priority: 'MEDIUM', order: 13 },
]

// ─── Blocos de modelos ────────────────────────────────────────────────────────

const BLOCKS: {
  modelName: string; yearFrom: number; yearTo: number | null
  MACETES: TipInput[]; PROBLEMAS: TipInput[]
}[] = [
  { modelName: 'CB 500',  yearFrom: 1994, yearTo: 2003, MACETES: CB500_MACETES,  PROBLEMAS: CB500_PROBLEMAS  },
  { modelName: 'CB 500F', yearFrom: 2013, yearTo: null,  MACETES: CB500F_MACETES, PROBLEMAS: CB500F_PROBLEMAS },
  { modelName: 'CB 500X', yearFrom: 2013, yearTo: null,  MACETES: CB500X_MACETES, PROBLEMAS: CB500X_PROBLEMAS },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  ...CB500_MANUTENCAO,
  ...CB500F_MANUTENCAO,
  ...CB500X_MANUTENCAO,
]

const TIRE_PRESSURES = [
  {
    modelName: 'CB 500',
    yearFrom: 1994, yearTo: 2003,
    tireSize: '110/70-17 (F) · 130/70-17 (R)',
    frontPsi: 29, rearPsi: 33,
    frontPsiLoad: 29, rearPsiLoad: 39,
    notes: 'Pneus aro 17" tubeless. Calibre sempre com pneus frios. Pressão solo: F 29 PSI / R 33 PSI. Com garupa/bagagem: F 29 PSI / R 39 PSI. Verifique a calibragem na etiqueta da sua moto (pode variar por lote). Inspecione trincas laterais em pneus com mais de 5 anos mesmo que o piso pareça bom.',
  },
  {
    modelName: 'CB 500F',
    yearFrom: 2013, yearTo: null,
    tireSize: '120/70-17 (F) · 160/60-17 (R)',
    frontPsi: 32, rearPsi: 36,
    frontPsiLoad: 32, rearPsiLoad: 42,
    notes: 'Pneus esportivos aro 17" tubeless. Calibre sempre com pneus frios. Piloto solo: F 32 PSI / R 36 PSI. Com garupa: F 32 PSI / R 42 PSI. A CB 500X 2013–2018 usa os mesmos tamanhos e pressões da CB 500F. Calibre sempre com pneus frios (antes de rodar ou após 3+ horas parada).',
  },
  {
    modelName: 'CB 500X',
    yearFrom: 2019, yearTo: null,
    tireSize: '110/80-19 (F) · 160/60-17 (R)',
    frontPsi: 32, rearPsi: 36,
    frontPsiLoad: 32, rearPsiLoad: 42,
    notes: 'Aro 19" dianteiro (restyling 2019+), aro 17" traseiro. Pneus tubeless trail. Solo: F 32 PSI / R 36 PSI. Com garupa + bagagem: F 32 PSI / R 42 PSI. CB 500X 2013–2018 usava 120/70-17 (F) — usar a calibragem da CB 500F para esses anos. Pneu 19" responde diferente em manobras lentas: mais esforço no guidão, mas melhor estabilidade em linha reta.',
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
  console.log(`\n✅ Honda CB 500 seed concluído! ${BLOCKS.length} modelos, ${totalTips} tips, ${TIRE_PRESSURES.length} calibragens, ${MAINTENANCE_ITEMS.length} itens de manutenção`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
