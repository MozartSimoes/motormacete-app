// seed-ktm-superduke-rc.ts — KTM Super Duke 990 / 1290 R / 1290 GT e KTM RC8 1190 / RC8 R
// Linha hypernaked (Super Duke) e superbike (RC8) da KTM, motores V-twin LC8 75° de alta performance.
// Execute: pnpm --filter @motormacete/database db:seed:ktm-superduke-rc
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }

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

// ─── KTM 990 SUPER DUKE (2005–2013) ───────────────────────────────────────────
// Motor: 999cc DOHC V-twin LC8 75° refrigerado a líquido, 4V/cilindro, cárter seco
// Potência: ~120cv @ 9.000 rpm (versão R 2008–2011: ~130cv) | Torque: ~10,0 kgf.m
// Injeção eletrônica Keihin | Óleo: 3,0L (com filtro), 10W-50 ou 5W-40 semissintético/sintético
// Vela: NGK LKAR8AI-9, gap 0,8mm | Embreagem: úmida multidisco (NÃO é a seco)
// Pneu: 120/70 ZR17 (F) / 180/55 ZR17 (R) | Corrente: 525 X-ring, pinhão 17T / coroa 38-40T
// Tanque: 15L (2005-2006) / 18,5L (2007+) | Sem controle de tração (eletrônica básica para a época)

const SD990_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-50 ou 5W-40 sintético — 3,0L; motor de alta performance não aceita mineral',
    body: 'O motor LC8 999cc da 990 Super Duke usa cárter seco com dois rotores de bombeamento — exige óleo de qualidade superior aos motores comuns. Capacidade: 3,0L com troca de filtro. Use 10W-50 ou 5W-40 sintético JASO MA2 (compatível com embreagem úmida): Motul 7100 10W-50, Motul 300V 10W-50 (uso intenso/pista) ou Castrol Power 1 Racing 10W-50. Evite óleo barato de motor de carro — a lubrificação por cárter seco trabalha sob temperatura mais alta e o óleo se degrada mais rápido. Intervalo: 6.000 km ou 12 meses.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK LKAR8AI-9 — gap 0,8mm; rosca longa específica do motor LC8',
    body: 'A 990 Super Duke usa vela NGK LKAR8AI-9 (rosca comprida, tipo específico para motores LC8 da KTM). Gap de fábrica: 0,8mm. Não confunda com velas padrão de rosca curta — a rosca errada pode danificar as roscas de alumínio do cabeçote. Custo: R$ 60–100 (importada, poucas lojas no Brasil têm em estoque — compre com antecedência via importadores de peças KTM). Intervalo: 12.000 km. Versão iridium NGK equivalente dura até 20.000 km.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 X-ring, pinhão 17T/coroa 38-40T — lubrifique a cada 500 km',
    body: 'A 990 Super Duke usa corrente 525 (robusta para os ~120-130cv). Kit relação: pinhão 17 dentes + coroa 38-40 dentes (varia por ano) + corrente 525 X-ring, ~118 elos. Marcas recomendadas: DID 525VX3, RK 525XSO. Kit completo importado: R$ 600–1.100 — peças originais KTM chegam a custar o dobro disso, então prefira kits aftermarket de qualidade (DID, RK, AFAM). Lubrifique a cada 500 km com spray específico — o motor entrega torque forte desde baixo giro e desgasta corrente rápido se mal cuidada.',
  },
  {
    severity: 'WARN',
    title: 'Peças originais KTM são caras e escassas no Brasil — genéricos e importação direta ajudam',
    body: 'A KTM tem rede de peças limitada no Brasil comparada a Honda/Yamaha. Peças de desgaste (pastilhas de freio, filtros, correntes, retentores) frequentemente precisam ser importadas ou compradas em lojas especializadas em motos europeias. Alternativas: filtro de óleo compatível é o mesmo usado em vários LC8 (990/1190/1290) — HifloFiltro HF157 ou equivalente. Pastilhas de freio: EBC ou Brembo genéricas de mesma medida servem no lugar da original. Pesquise sempre a medida física antes de comprar peça "compatível" — evita compra errada.',
  },
  {
    severity: 'WARN',
    title: 'Aquecimento de pneus obrigatório em pista — moto entrega torque brutal desde baixo giro',
    body: 'O V-twin da 990 Super Duke entrega torque elevado já em rotações baixas — em pista ou uso esportivo, os pneus frios não aguentam aceleração forte, principalmente na traseira. Aqueça os pneus com aceleração progressiva nas primeiras curvas antes de exigir o máximo da moto. Pneus recomendados para uso misto: Michelin Pilot Road ou Pirelli Angel GT. Para track days: Pirelli Diablo Supercorsa ou Michelin Power Cup — mas atenção à pressão a frio antes de rodar.',
  },
  {
    severity: 'OK',
    title: 'Regulador de tensão original é ponto fraco — considere upgrade preventivo',
    body: 'O regulador/retificador de tensão original da 990 Super Duke tem histórico de falhas documentado em fóruns internacionais (KTM Forums, superduke.net) — tensão de carga instável, acima de 15V indica regulador com defeito. Upgrade recomendado: reguladores MOSFET aftermarket (marcas como Shindengen ou Rick\'s Motorsport Electrics) são mais confiáveis que o original e custam pouco mais caro. Verifique a tensão da bateria com o motor a 4.000 rpm — deve estar entre 13,5–14,8V.',
  },
  {
    severity: 'WARN',
    title: 'Rodagem: respeite 6.000 km antes de exigir potência máxima',
    body: 'Motor de alta performance com pistões forjados e tolerâncias justas — a rodagem correta prolonga a vida do motor. Primeiros 1.000 km: evite ultrapassar 6.000 rpm e variação intensa de acelerador. Até 6.000 km: evite giros acima de 8.500 rpm por períodos prolongados. Troque o óleo às 1.000 km mesmo fora do intervalo padrão — resíduos de amaciamento do motor ficam no óleo inicial.',
  },
]

const SD990_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Regulador/retificador: falha documentada e recorrente',
    body: 'Um dos pontos fracos mais citados em fóruns internacionais (KTM Forums, superduke.net). Sintomas: bateria descarregando mesmo com moto rodando, tensão de carga instável ou acima de 15V, luzes piscando em marcha lenta. Se não tratado, pode danificar o estator e a bateria. Diagnóstico: multímetro na bateria a 4.000 rpm, deve marcar 13,5–14,8V. Substituição preventiva recomendada após 40.000-50.000 km ou ao primeiro sintoma — prefira reguladores MOSFET de melhor qualidade que o original.',
  },
  {
    severity: 'WARN',
    title: 'Chocalho/rattling no cesto de embreagem — desgaste do amortecedor de embreagem',
    body: 'Problema recorrente relatado em fóruns KTM: barulho de chocalho no cesto de embreagem, mais audível em marcha lenta ou giro alto em ponto morto, e que diminui ao puxar a alavanca da embreagem. Causa comum: desgaste do amortecedor de borracha do cesto primário ou entalhes nas placas da embreagem. Raramente causa falha catastrófica, mas incomoda e deve ser inspecionado — se o jato de óleo da embreagem estiver obstruído, o amortecedor recebe menos lubrificação e desgasta mais rápido. Verificar em revisão de rotina.',
  },
  {
    severity: 'WARN',
    title: 'Vazamentos de óleo pelas juntas do motor V-twin em alta quilometragem',
    body: 'Motores LC8 com mais de 40.000-50.000 km apresentam vazamentos pontuais pelas juntas do cárter, tampa de válvulas ou retentor do eixo de manivelas — comum em V-twins de cárter seco que trabalham sob temperatura elevada. Inspecione visualmente embaixo do motor a cada troca de óleo. Vazamento leve: reaperto dos parafusos no torque especificado geralmente resolve. Vazamento constante: troca da junta/retentor — peças genéricas de mesma medida servem, não precisa ser original KTM.',
  },
  {
    severity: 'WARN',
    title: 'Corte de motor aleatório — relacionado a sensores ou chicote elétrico',
    body: 'Relatos em fóruns internacionais de corte súbito do motor em marcha, sem aviso, especialmente em unidades mais antigas ou com quilometragem alta. Causas mais comuns identificadas: sensor de posição do cavalete lateral com mau contato, conector do chicote principal oxidado ou com folga, ou falha intermitente do módulo CDI/ECU. Diagnóstico: verificar todos os conectores do chicote com contato dielétrico, testar o sensor de cavalete. Se persistir, um especialista em eletrônica KTM deve escanear a ECU.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de óleo acima do normal em unidades de alta quilometragem',
    body: 'Como todo motor de alta performance operando em rotações elevadas, a 990 Super Duke pode consumir mais óleo que motos comuns — até 300-500mL a cada 3.000 km é considerado aceitável, mas deve ser monitorado. Verifique o nível pelo visor a cada 1.000 km, sempre com moto na vertical e motor frio. Consumo excessivo (acima de 1L/3.000km) ou fumaça azul no escapamento indicam desgaste de anéis de segmento ou guias de válvula — procure diagnóstico especializado.',
  },
]

const SD990_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo 990 Super Duke: motor V-twin de alta performance exige atenção rigorosa',
    body: '1.000 km — Revisão de amaciamento: troca de óleo (10W-50, 3,0L) + inspeção geral + reaperto de parafusos do motor. | 6.000 km — Troca de óleo + filtro. Lubrificar corrente (a cada 500 km). Verificar tensão do regulador. | 12.000 km — Troca da vela NGK LKAR8AI-9 (gap 0,8mm). Verificar folga de válvulas. Filtro de ar. | 18.000 km — Troca de óleo + filtro. Fluido de freio DOT 4. | 24.000 km — Folga de válvulas (intake 0,10–0,15mm / escape 0,25–0,30mm, motor frio). Kit relação 525 se desgastado. | 30.000 km — Revisão geral da embreagem (verificar chocalho no cesto). Pastilhas de freio. | 40.000-50.000 km — Substituição preventiva do regulador/retificador.',
  },
]

// ─── KTM 1290 SUPER DUKE R (2014–presente) — "The Beast" ──────────────────────
// Motor: 1301cc DOHC V-twin LC8 75° refrigerado a líquido, 4V/cilindro
// Potência: ~180cv @ 9.500 rpm (versões recentes ~180-190cv) | Torque: ~140 Nm
// Injeção eletrônica Keihin ride-by-wire | Óleo: 3,5L, 10W-50 ou 5W-40 JASO MA2 — troca a cada 10.000 km
// Velas: NGK LKAR9BI-9 (interna) + NGK LMAR7A-9 (externa), gap 0,8-0,9mm — duas velas por cilindro
// Embreagem: úmida multidisco com PASC (Power Assist Slipper Clutch)
// Pneu: 120/70 ZR17 (F) / 190/55 ZR17 (R) | Corrente: 525 X-ring, pinhão 17T / coroa 38T
// Tanque: ~16L | Eletrônica: controle de tração (MTC), modos de pilotagem, controle de wheelie, ABS cornering

const SD1290R_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-50 ou 5W-40 JASO MA2 — 3,5L; troca a cada 10.000 km ou 12 meses',
    body: 'O motor 1301cc "The Beast" exige óleo sintético de alta qualidade compatível com embreagem úmida (JASO MA2). Capacidade: 3,5L com filtro. Marcas recomendadas: Motul 7100 10W-50 (uso rodoviário) ou Motul 300V 10W-50/5W-40 (uso esportivo/pista). Filtro de óleo KTM (código 61338015200) tem equivalentes genéricos de fabricantes como HifloFiltro e K&N — bem mais baratos que a peça original importada, mas confira a medida da rosca e do anel de vedação antes de comprar.',
  },
  {
    severity: 'WARN',
    title: 'DUAS velas por cilindro (twin-spark) — NGK LKAR9BI-9 + LMAR7A-9, gap 0,8-0,9mm',
    body: 'O motor da 1290 Super Duke R usa duas velas por cilindro (sistema twin-spark) para combustão mais eficiente e menor detonação. Vela interna: NGK LKAR9BI-9. Vela externa: NGK LMAR7A-9. Gap: 0,8-0,9mm em ambas. Troque sempre as 4 velas juntas (2 por cilindro × 2 cilindros) — misturar velas novas e usadas causa combustão desigual. Custo do jogo completo: R$ 250-400 (velas específicas e mais caras que velas comuns, poucas lojas no Brasil mantêm estoque).',
  },
  {
    severity: 'WARN',
    title: 'Válvulas exigem atenção: motor "come" folga rápido — não pule a revisão de 30.000 km',
    body: 'Relatos consistentes em fóruns internacionais (KTM Forums, ADVrider) mostram que o motor 1290 pode apresentar folga de válvula fora de especificação já na primeira revisão programada (entre 15.000-30.000 km), especialmente nas válvulas de admissão. Um caso documentado mostrou as 4 válvulas de admissão com folga zero. Não pule esta revisão mesmo que a moto pareça funcionar bem — ruído tipo "tique-tique" que aumenta com a rotação é sinal de alerta. Serviço deve ser feito por mecânico com experiência em motores KTM LC8 (acesso e calços/shims exigem ferramental específico).',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 X-ring, pinhão 17T/coroa 38T — troque o kit completo a cada 15.000-20.000 km',
    body: 'Com ~180cv e torque de 140 Nm, a corrente da 1290 Super Duke R sofre desgaste acelerado se mal lubrificada. Kit recomendado: DID 525ZVM-X (reforçada, ideal para motos de alta potência) ou RK 525XSO. Kit completo: R$ 800-1.400 importado — vale a pena comprar de importadores de peças de moto esportiva ao invés de tentar achar peça KTM original, que é rara e cara no Brasil. Lubrifique a cada 500 km; a moto castiga a corrente em acelerações fortes.',
  },
  {
    severity: 'OK',
    title: 'Embreagem PASC (slipper) — cuide do óleo e do cilindro escravo hidráulico',
    body: 'A 1290 Super Duke R usa embreagem úmida multidisco com sistema PASC (Power Assist Slipper Clutch), que reduz o esforço na alavanca e evita travamento da roda traseira em reduções bruscas. O cilindro escravo hidráulico original tem histórico de vedação fraca (entra ar/umidade, pode enferrujar por dentro) — sintoma: embreagem "esponjosa" ou vazando fluido. Upgrade popular na comunidade: cilindro escravo aftermarket (ex. Oberon), mais durável que o original. Verifique o nível de fluido de embreagem a cada revisão.',
  },
  {
    severity: 'WARN',
    title: 'Modos de pilotagem e controle de tração: use "Rain" em piso molhado, nunca desligue o TC em rua',
    body: 'A 1290 Super Duke R tem MTC (Motorcycle Traction Control) com múltiplos níveis e modos de pilotagem (Rain, Street, Sport, Track). Com ~180cv, desligar o controle de tração em uso de rua é extremamente arriscado — mesmo pilotos experientes usam o TC ligado no mínimo em "Street" ou "Sport". Em piso molhado, use sempre "Rain" — reduz a resposta de acelerador e aumenta a intervenção do TC. O controle de wheelie pode ser desativado separadamente em alguns modos, mas o TC de tração deve permanecer ativo em uso urbano/rodoviário.',
  },
  {
    severity: 'OK',
    title: 'Peças originais KTM para performance são caras — genéricos e peças compartilhadas com 1190 ajudam',
    body: 'Muitos componentes da 1290 Super Duke R (filtro de óleo, alguns retentores, parte do chicote elétrico) são compartilhados com a plataforma RC8/1190 e outros modelos LC8 — isso amplia as opções de peças compatíveis. Pesquise sempre por "KTM LC8" ao invés de apenas "1290" ao procurar peças genéricas — muitas lojas de importação categorizam por motor, não só por modelo. Oficinas especializadas em KTM/motos europeias (não a concessionária) costumam ter kits de reparo mais em conta.',
  },
]

const SD1290R_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall de bomba de combustível (modelos 2017) — verifique se sua unidade foi atendida',
    body: 'A KTM emitiu recall oficial para a bomba de combustível em unidades 1290 Super Duke R do ano 2017, além de atualização de software e fita protetora no basculante para evitar atrito de cabos. Se você importou ou comprou uma unidade usada de fora do Brasil desse ano, procure a concessionária KTM para verificar se o recall já foi aplicado. Sintomas de bomba de combustível com problema: falha de partida, perda de potência súbita, ou motor morrendo em marcha.',
  },
  {
    severity: 'WARN',
    title: 'Cilindro escravo da embreagem: vazamento e entrada de ar/umidade é queixa recorrente',
    body: 'O cilindro escravo hidráulico da embreagem tem um retentor de borracha ao redor do pistão que degrada, permitindo entrada de água e ar — pode enferrujar por dentro e contaminar o fluido. Sintoma: embreagem com ponto de acionamento inconsistente, alavanca "esponjosa", ou vazamento de fluido visível na carcaça do motor. Solução popular na comunidade internacional: substituir por cilindro escravo aftermarket de alumínio usinado (ex. Oberon Performance), mais durável que o original em plástico/borracha.',
  },
  {
    severity: 'WARN',
    title: 'Folga de válvulas fora de especificação em quilometragem relativamente baixa',
    body: 'Diferente de motores japoneses de mesma cilindrada que raramente precisam de ajuste de válvulas antes de 40.000-50.000 km, o motor 1301cc da 1290 Super Duke R tem relatos documentados de folga de válvula de admissão zerada já entre 15.000-30.000 km em alguns casos. Ruído tipo tique-tique que aumenta com a rotação do motor é sinal de alerta. Não adie a revisão de válvulas programada — o motor é, segundo a própria comunidade de proprietários, "exigente" nesse quesito comparado a outras marcas.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pela tampa interna da embreagem (carcaça de magnésio)',
    body: 'Relatos de vazamento de óleo pela tampa interna da embreagem, no ponto de vedação com a carcaça de magnésio do motor — problema recorrente o suficiente para gerar substituição em garantia em alguns casos. Sintoma: mancha de óleo na parte inferior direita do motor, próximo à tampa de embreagem. Inspecione visualmente a cada troca de óleo. Se detectado cedo, a troca da junta é simples; se ignorado, pode contaminar a embreagem e causar patinação.',
  },
  {
    severity: 'WARN',
    title: 'Fumaça azul no escapamento indica consumo de óleo — monitore desde os 20.000 km',
    body: 'Alguns proprietários relatam início de consumo de óleo perceptível (fumaça azulada na partida ou em desaceleração forte) a partir de 20.000-30.000 km em uso intenso ou com trocas de óleo espaçadas demais. Motor de alta performance exige troca de óleo pontual — atrasar a troca acelera o desgaste de anéis de segmento. Se notar consumo acima de 300-500mL entre trocas, procure diagnóstico especializado antes que o desgaste avance.',
  },
]

const SD1290R_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo 1290 Super Duke R: "The Beast" exige revisões rigorosas',
    body: '1.000 km — Revisão de amaciamento: troca de óleo + inspeção geral. | 10.000 km — Troca de óleo (10W-50, 3,5L) + filtro. Lubrificar corrente a cada 500 km. Verificar fluido de embreagem. | 15.000 km — Trocar as 4 velas (2× LKAR9BI-9 + 2× LMAR7A-9, gap 0,8-0,9mm). Verificar folga de válvulas — NÃO pule esta etapa. | 20.000 km — Troca de óleo + filtro. Fluido de freio DOT 4. Inspecionar cilindro escravo da embreagem. | 30.000 km — Folga de válvulas (ajuste se necessário). Kit relação 525 se desgastado. Verificar recall de bomba de combustível (unidades 2017). | 40.000 km — Revisão geral de suspensão. Rolamentos de roda e direção. | Anual — Atualização de software/mapa da ECU na concessionária, mesmo sem sintoma aparente.',
  },
]

// ─── KTM 1290 SUPER DUKE GT (2016–presente) ───────────────────────────────────
// Motor: 1301cc DOHC V-twin LC8 75°, mesma base da 1290 R | Potência: ~173-180cv @ 9.500-10.000 rpm
// Torque: ~140 Nm | Óleo: 3,5L, 10W-50/5W-40 JASO MA2 — troca a cada 10.000 km
// Velas: NGK LKAR9BI-9 + LMAR7A-9 (twin-spark), gap 0,8-0,9mm
// Suspensão WP semi-ativa (adapta em tempo real — modos Comfort/Street/Sport)
// Pneu: 120/70 ZR17 (F) / 190/55 ZR17 (R) | Corrente: 525 X-ring | Tanque: 23L (touring esportivo)
// Diferença da 1290 R: carenagem, para-brisa ajustável, malas semirrígidas, guidão mais alto, tanque maior

const SD1290GT_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo idêntico à 1290 R: 10W-50/5W-40 JASO MA2, 3,5L — mas cuidado com viagens longas',
    body: 'A 1290 Super Duke GT compartilha o motor 1301cc com a 1290 R. Óleo: 10W-50 ou 5W-40 sintético JASO MA2, 3,5L, troca a cada 10.000 km. Como é a versão touring esportiva (viagens mais longas), monitore o nível de óleo a cada abastecimento em viagens de mais de 500 km — o motor de alta performance consome mais óleo sob carga contínua em rodovia do que em uso urbano. Leve sempre um litro de óleo reserva compatível em viagens longas — dificilmente vai achar a especificação certa em posto de estrada.',
  },
  {
    severity: 'OK',
    title: 'Tanque de 23L permite autonomia maior — planeje abastecimento por consumo real',
    body: 'A 1290 GT tem tanque de 23L (contra ~16L da 1290 R), pensado para touring. Consumo médio esperado em viagem: 15-18 km/L dependendo do ritmo, dando autonomia de 300-400 km. Em uso esportivo/agressivo, o consumo cai para 10-12 km/L. Sempre use combustível de qualidade (aditivada, octanagem alta) — motor de alta compressão é mais sensível a combustível ruim, podendo causar detonação (batida de pino) em rodovias com posto de procedência duvidosa.',
  },
  {
    severity: 'OK',
    title: 'Suspensão WP semi-ativa: ajuste o modo à carga e ao piso, não apenas ao humor',
    body: 'A 1290 GT vem de fábrica com suspensão WP semi-ativa eletrônica, que adapta amortecimento em tempo real. Use "Comfort" para estradas ruins ou com carona/bagagem pesada, "Street" para uso misto do dia a dia, e "Sport" para curvas e piso bom. Se notar comportamento estranho da suspensão (muito dura ou muito mole independente do modo), verifique se os sensores de curso da suspensão estão limpos e sem dano — sujeira excessiva pode confundir a leitura eletrônica.',
  },
  {
    severity: 'WARN',
    title: 'Corrente 525 sofre mais em viagens longas com carga — lubrifique antes e depois',
    body: 'Com malas e carona em viagens longas, a corrente 525 X-ring da 1290 GT trabalha sob carga maior. Lubrifique antes de sair de viagem e reaplique a cada parada de abastecimento em trajetos longos (a cada 300-400 km). Kits recomendados: DID 525ZVM-X (reforçada) ou RK 525XSO. Leve um spray de corrente pequeno na mala — corrente seca em viagem de 1.000 km+ desgasta visivelmente mais rápido.',
  },
  {
    severity: 'OK',
    title: 'Velas twin-spark idênticas à 1290 R — estoque em oficina antes de viagem longa',
    body: 'Mesmas velas da 1290 Super Duke R: NGK LKAR9BI-9 (interna) + NGK LMAR7A-9 (externa), gap 0,8-0,9mm, trocadas em conjunto de 4 unidades. Como são peças específicas e caras (R$ 250-400 o jogo), poucas revendas no interior do Brasil têm em estoque — planeje a troca antes de viagens longas, não espere o problema aparecer na estrada.',
  },
  {
    severity: 'WARN',
    title: 'Peso e carga: pastilhas e pneus desgastam mais rápido com malas e carona frequentes',
    body: 'A 1290 GT é mais pesada que a 1290 R (por causa de carenagem, malas e tanque maior) e frequentemente roda com carga extra (bagagem, carona). Isso acelera o desgaste de pastilhas de freio e pneus comparado ao uso solo. Pneus recomendados para touring esportivo: Michelin Road 5/6 ou Bridgestone Battlax T32 — priorizam durabilidade e aderência em piso molhado sobre pneus 100% esportivos. Verifique a pressão dos pneus considerando o peso extra (ver tabela de calibragem com carga).',
  },
]

const SD1290GT_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Mesmo recall de bomba de combustível da 1290 R em unidades do período — verifique',
    body: 'A GT compartilha motor e sistema de combustível com a 1290 Super Duke R — o recall de bomba de combustível relacionado a modelos do período 2016-2017 pode se aplicar. Verifique com a concessionária KTM se sua unidade precisa da atualização. Sintomas: falha de partida, perda súbita de potência em marcha.',
  },
  {
    severity: 'WARN',
    title: 'Sensores da suspensão semi-ativa: sujeira ou dano causa comportamento errático',
    body: 'A suspensão WP semi-ativa depende de sensores de curso e uma central eletrônica dedicada. Se a moto rodar em estradas de terra ou com muita sujeira/lama, os sensores podem sujar e gerar leituras erradas — sintoma: suspensão muito dura ou muito mole mesmo trocando o modo de pilotagem, ou mensagem de erro no painel. Limpeza regular da área da suspensão dianteira e traseira previne o problema. Se o erro persistir, a central de suspensão precisa de diagnóstico eletrônico especializado (equipamento KTM ou similar).',
  },
  {
    severity: 'WARN',
    title: 'Cilindro escravo da embreagem: mesma vulnerabilidade da 1290 R',
    body: 'Compartilha o mesmo sistema de embreagem hidráulica com PASC (slipper) da 1290 R, incluindo a vulnerabilidade conhecida do cilindro escravo original (vedação que degrada e permite entrada de ar/umidade). Sintoma: embreagem "esponjosa" ou vazamento visível. Considere upgrade para cilindro escravo aftermarket de alumínio usinado se a moto já tiver alta quilometragem.',
  },
  {
    severity: 'WARN',
    title: 'Folga de válvulas: mesmo motor da 1290 R, mesma exigência de revisão pontual',
    body: 'Por compartilhar o motor 1301cc com a 1290 Super Duke R, a GT herda a mesma característica de "comer" folga de válvula de admissão mais rápido que motores japoneses equivalentes. Não pule a revisão de válvulas programada (entre 15.000-30.000 km) mesmo que a moto pareça funcionar normalmente — ruído tipo tique-tique crescente com a rotação é sinal de alerta.',
  },
  {
    severity: 'WARN',
    title: 'Malas semirrígidas: verifique fixação e vedação regularmente em uso de estrada',
    body: 'As malas semirrígidas originais (quando equipadas) podem ter os suportes de fixação afrouxados por vibração em estradas ruins — verifique o aperto antes de viagens longas. Vedação das malas também merece atenção: água pode entrar em chuva forte se as borrachas de vedação estiverem ressecadas ou desalinhadas. Revise a vedação a cada 20.000 km ou antes de viagens em época chuvosa.',
  },
]

const SD1290GT_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma 1290 Super Duke GT: mesmo motor da 1290 R, atenção extra à suspensão e malas',
    body: '1.000 km — Revisão de amaciamento: troca de óleo + inspeção geral. | 10.000 km — Troca de óleo (10W-50, 3,5L) + filtro. Lubrificar corrente. Verificar fixação e vedação das malas. | 15.000 km — Trocar as 4 velas (2× LKAR9BI-9 + 2× LMAR7A-9). Verificar folga de válvulas. | 20.000 km — Troca de óleo + filtro. Fluido de freio DOT 4. Limpeza dos sensores da suspensão semi-ativa. Inspecionar cilindro escravo da embreagem. | 30.000 km — Folga de válvulas (ajuste se necessário). Kit relação 525. Verificar recall de bomba de combustível. | 40.000 km — Revisão geral de suspensão WP semi-ativa. Rolamentos de roda e direção.',
  },
]

// ─── KTM RC8 1190 (2008–2010) — primeira superbike da KTM ─────────────────────
// Motor: 1148cc DOHC V-twin LC8 75° refrigerado a líquido, 4V/cilindro
// Potência: ~155cv/151hp @ 10.000 rpm | Torque: ~85 ft-lb (~115 Nm) @ 8.000 rpm
// Injeção Keihin | Óleo: ~2,6L com filtro | Vela: NGK LKAR9BI9 (twin-spark acima de 7.000 rpm)
// Embreagem: úmida multidisco hidráulica Magura (slipper opcional em alguns kits/anos)
// Pneu: 120/70 ZR17 (F) / 190/55 ZR17 (R) | Corrente: 525, pinhão 17T / coroa 38T
// Tanque: 16,5L | Carenagem completa — primeira superbike de produção da KTM

const RC8_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo sintético 10W-50 — 2,6L; motor superbike exige troca pontual',
    body: 'O motor 1148cc V-twin da RC8 é a base da primeira superbike de produção da KTM — construído para giros altos e trabalho contínuo em pista. Capacidade de óleo: aproximadamente 2,6L com filtro. Use sintético 10W-50 JASO MA2: Motul 300V 10W-50 (uso em pista/esportivo) ou Motul 7100 10W-50 (uso misto rua/pista). Troque a cada 6.000 km — menos que motos de rua comuns, porque o motor trabalha em faixas de giro mais altas com mais frequência.',
  },
  {
    severity: 'WARN',
    title: 'Twin-spark: só uma vela dispara abaixo de 7.000 rpm — troque as duas sempre juntas',
    body: 'A RC8 usa duas velas por cilindro (cabeçote com ignição twin-spark): abaixo de 7.000 rpm apenas uma vela de cada cilindro dispara; acima disso, ambas disparam simultaneamente para queima mais completa e menos detonação. Vela recomendada: NGK LKAR9BI9. Troque sempre as 4 velas (2 por cilindro) juntas — misturar velas de idades diferentes desequilibra a queima entre os regimes de giro baixo e alto. Custo do jogo completo: R$ 200-350 (peça específica, estoque limitado no Brasil).',
  },
  {
    severity: 'OK',
    title: 'Corrente 525, pinhão 17T/coroa 38T — kit de qualidade evita desgaste prematuro',
    body: 'A RC8 usa corrente 525 (pinhão 17 dentes, coroa 38 dentes). Com ~155cv, a corrente sofre desgaste acelerado em uso esportivo/pista. Marcas recomendadas: DID 525VX3 ou RK 525XSO — evite corrente genérica sem O-ring/X-ring, não aguenta a potência da moto. Kit completo: R$ 700-1.200 importado. Lubrifique a cada 500 km em uso de rua; em pista, lubrifique ao final de cada dia de track day.',
  },
  {
    severity: 'OK',
    title: 'Embreagem úmida hidráulica Magura — mantenha fluido em dia, não é embreagem a seco',
    body: 'Diferente de superbikes de outras marcas (como Ducati de gerações antigas) que usam embreagem a seco, a RC8 tem embreagem ÚMIDA multidisco com acionamento hidráulico Magura — mais silenciosa e com manutenção mais simples. Verifique o nível de fluido da embreagem a cada revisão e troque o fluido (DOT 4) a cada 2 anos. Se a alavanca ficar "esponjosa" ou o ponto de acionamento mudar, purgue o sistema — sinal comum de ar entrando no circuito hidráulico.',
  },
  {
    severity: 'WARN',
    title: 'Peças originais da RC8 são raras no Brasil — priorize compatibilidade com a plataforma LC8',
    body: 'A RC8 teve produção curta (2008-2010) e vendas baixas no Brasil, o que torna peças originais especialmente escassas — muitas vezes só via importação direta da Europa/EUA. Vantagem: o motor LC8 1148cc compartilha muitos componentes (filtro de óleo, alguns retentores, sensores) com a 990 Super Duke e a própria RC8 R. Ao procurar peças, busque por "KTM LC8" além do modelo específico — amplia as opções de compatibilidade.',
  },
  {
    severity: 'WARN',
    title: 'Aquecimento de pneus é obrigatório — moto de carenagem completa para pista',
    body: 'A RC8 foi projetada como superbike de carenagem completa, com geometria e potência voltadas para uso esportivo/pista. Nunca acelere forte com pneus frios, principalmente em dias frios ou após longos períodos parada. Pneus recomendados: Pirelli Diablo Rosso IV (uso misto) ou Diablo Supercorsa (pista). Em track day, use aquecedores de pneu (mantas térmicas) sempre que possível.',
  },
]

const RC8_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Embreagem hidráulica: cilindro escravo pode vazar em unidades com mais uso',
    body: 'O sistema hidráulico Magura da embreagem tem vedações que degradam com o tempo, permitindo entrada de ar ou vazamento de fluido — sintoma: alavanca "esponjosa", ponto de engate inconsistente. Diagnóstico: verificar nível do reservatório de fluido de embreagem e procurar manchas de fluido na carcaça do motor. Reparo: kit de vedação do cilindro escravo (genérico Magura ou compatível) resolve a maioria dos casos.',
  },
  {
    severity: 'WARN',
    title: 'Regulador/retificador: mesma vulnerabilidade da plataforma LC8',
    body: 'Assim como outros modelos LC8 da KTM da mesma geração, a RC8 tem relatos de falha do regulador/retificador — sintoma: tensão de carga instável, bateria descarregando com moto em funcionamento. Verifique a tensão da bateria com multímetro a 4.000 rpm (deve estar entre 13,5-14,8V). Considere upgrade para regulador MOSFET aftermarket, mais confiável.',
  },
  {
    severity: 'WARN',
    title: 'Vazamentos pontuais de óleo em alta quilometragem, comuns ao motor LC8',
    body: 'Motores LC8 de cárter seco (RC8 inclusa) apresentam vazamentos ocasionais pelas juntas do cárter ou tampa de válvulas após 40.000+ km, especialmente em unidades usadas com frequência em pista (mais ciclos de aquecimento/resfriamento). Inspecione visualmente embaixo do motor a cada troca de óleo. Reaperto no torque correto resolve vazamentos leves; vazamento constante exige troca da junta.',
  },
  {
    severity: 'WARN',
    title: 'Sistema de escape e catalisador sensível a combustível de baixa qualidade',
    body: 'Motor de alta compressão é mais sensível à qualidade do combustível — combustível adulterado ou de baixa octanagem pode causar detonação (batida de pino), especialmente em giros altos sob carga. Use sempre combustível de posto de procedência confiável, preferencialmente aditivado. Sintoma de detonação: ruído metálico agudo sob aceleração forte — pare de acelerar e verifique a fonte do combustível.',
  },
  {
    severity: 'WARN',
    title: 'Baixo volume de vendas no Brasil dificulta encontrar mecânico especializado',
    body: 'Por ser um modelo raro no país, encontrar oficina com experiência específica na RC8 é desafiador fora dos grandes centros. Procure oficinas especializadas em motos europeias/KTM (não necessariamente concessionária autorizada) ou grupos de proprietários KTM no Brasil para indicação de mecânicos de confiança. Documentar bem o histórico de manutenção da moto (com notas fiscais e datas) ajuda a valorizar a moto na revenda, dado o caráter de colecionador que modelos raros como a RC8 vêm ganhando.',
  },
]

const RC8_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo RC8 1190: motor superbike de giro alto exige revisões mais frequentes',
    body: '1.000 km — Revisão de amaciamento: troca de óleo (10W-50, 2,6L) + inspeção geral. | 6.000 km — Troca de óleo + filtro. Lubrificar corrente a cada 500 km. Verificar fluido de embreagem. | 12.000 km — Trocar as 4 velas (NGK LKAR9BI9 × 4, sistema twin-spark). Verificar folga de válvulas. | 18.000 km — Troca de óleo + filtro. Fluido de freio DOT 4. | 24.000 km — Folga de válvulas (ajuste se necessário). Kit relação 525 se desgastado. | 30.000 km — Verificar regulador/retificador (13,5-14,8V a 4.000 rpm). Pastilhas de freio. Revisão de suspensão. | 40.000 km — Revisão geral de vedações do motor (cárter, tampa de válvulas).',
  },
]

// ─── KTM 1190 RC8 R (2009–2015) — versão mais potente/track-focused ───────────
// Motor: 1195cc DOHC V-twin LC8 75° refrigerado a líquido, 4V/cilindro, pistão 2mm maior que a RC8
// Potência: ~170cv @ 10.250 rpm (Race Spec: ~180cv) | Torque: ~123 Nm @ 8.000 rpm
// Compressão 13,5:1 (vs 12,5:1 da RC8) | Válvulas de admissão em titânio, seguidores DLC
// Óleo: ~2,6L | Vela: NGK LKAR9BI9 (twin-spark) | Embreagem: úmida multidisco com slipper (PASC/similar)
// Folga de válvulas: admissão 0,25-0,30mm / escape 0,10-0,15mm
// Pneu: 120/70 ZR17 (F) / 190/55 ZR17 (R) | Corrente: 525, pinhão 17T / coroa 37-38T | Tanque: 16,5L

const RC8R_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo sintético 10W-50 — 2,6L; motor mais potente que a RC8 exige troca mais frequente em pista',
    body: 'O motor 1195cc da RC8 R (2mm maior que a RC8) tem compressão elevada (13,5:1) e válvulas de admissão em titânio — motor de altíssima performance com giro até 10.250+ rpm. Capacidade de óleo: ~2,6L com filtro. Use exclusivamente sintético de alta qualidade: Motul 300V 10W-50 (recomendado para uso em pista/track day) ou Motul 7100 10W-50 para uso misto. Em uso intenso de pista, reduza o intervalo de troca para 4.000-5.000 km — o motor trabalha em rotações mais altas com mais frequência que a RC8 padrão.',
  },
  {
    severity: 'WARN',
    title: 'Folga de válvulas: admissão 0,25-0,30mm / escape 0,10-0,15mm — motor frio, sem exceção',
    body: 'A folga de válvulas da RC8 R deve ser verificada com o motor completamente frio. Especificação: admissão 0,25-0,30mm, escape 0,10-0,15mm. As válvulas de admissão em titânio e os seguidores de came com tratamento DLC (diamond-like carbon) reduzem o atrito, mas a checagem regular continua essencial — motor de giro alto não perdoa folga fora de especificação. Serviço requer calços (shims) de reposição em várias espessuras (incrementos de 0,05mm) — leve a um mecânico com experiência específica em motores KTM LC8.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem slipper: se estiver patinando ou não ativando corretamente, verifique o óleo antes de trocar peça',
    body: 'A RC8 R usa embreagem com sistema slipper/anti-hopping — reduz o travamento da roda traseira em reduções agressivas de marcha. Problema documentado na comunidade: quando o slipper "não funciona bem" ou a embreagem "patina" em uso agressivo, muitas vezes a causa é o óleo incorreto (viscosidade errada afeta o funcionamento das rampas do sistema slipper) ou jato de óleo da embreagem obstruído — não necessariamente a peça em si com defeito. Antes de investir em kit slipper aftermarket, confirme óleo correto e limpeza dos componentes.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525, pinhão 17T/coroa 37-38T — kit reforçado para os ~170cv',
    body: 'Com quase 170cv, a RC8 R exige corrente robusta: 525 X-ring ou O-ring de qualidade (DID 525ZVM-X reforçada, ideal para motos de alta potência, ou RK 525XSO). Kit completo: R$ 900-1.500 importado. Pinhão 17 dentes / coroa 37-38 dentes conforme relação escolhida (mais dentes na coroa = aceleração mais forte, menos velocidade final). Lubrifique a cada 500 km em rua; em pista, ao final de cada sessão de track day.',
  },
  {
    severity: 'WARN',
    title: 'Peças originais da RC8 R são escassas e caras — priorize compatibilidade com plataforma 1190/1290',
    body: 'A RC8 R teve produção limitada e pouquíssimas unidades no Brasil — peças originais são caríssimas e demoram para chegar via importação. Boa notícia: vários componentes de chassi e elétrica são compartilhados com a 1290 Super Duke R (que tem volume de vendas maior e mais peças disponíveis) — inclusive há relatos de proprietários adaptando o kit de embreagem slipper da 1290 na RC8 R. Pesquise sempre compatibilidade cruzada "KTM 1190/1290" antes de importar peça específica da RC8 R.',
  },
  {
    severity: 'OK',
    title: 'Track day: use pneus slick ou DOT-race e aqueça bem antes de exigir o máximo',
    body: 'A RC8 R foi desenvolvida com foco claro em pista (versão "Race Spec" chegou a ~180cv). Para uso em track day, pneus DOT-race (Pirelli Diablo Supercorsa SP, Michelin Power Cup 2) entregam performance muito superior a pneus de rua. Sempre use mantas térmicas antes de rodar forte — o motor entrega torque de 123 Nm a partir de giros médios, e pneu frio não aguenta a demanda da moto em curva.',
  },
]

const RC8R_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Slipper clutch com funcionamento inconsistente — problema conhecido em algumas unidades',
    body: 'Proprietários relatam que o slipper clutch de fábrica de algumas unidades da RC8 R funciona mal ou quase não atua — causa raiz frequentemente identificada: as rampas do conjunto (pressure plate cover) não deslizam livremente quando há torque reverso na embreagem, geralmente por falta de lubrificação adequada ou óleo incorreto. Teste prático usado pela comunidade: desmontar o conjunto slipper, banhar em óleo e lubrificar as rampas manualmente, depois testar quanto a wheel hop em reduções bruscas. Se persistir, avaliar kit slipper aftermarket (STM, Suter) — mas confirme primeiro que não é problema de lubrificação.',
  },
  {
    severity: 'WARN',
    title: 'Folga de válvulas de admissão fecha rápido — inspeção não pode ser adiada',
    body: 'O motor 1195cc de alta compressão (13,5:1) da RC8 R tem exigência rigorosa de manutenção de válvulas — a folga de admissão especificada (0,25-0,30mm) tende a fechar mais rápido que em motores de menor performance. Ruído tipo "tique-tique" crescente com a rotação é sinal de alerta que não deve ser ignorado. Adiar a revisão pode causar contato entre válvula e pistão em casos extremos — dano caro e evitável com manutenção pontual.',
  },
  {
    severity: 'WARN',
    title: 'Cilindro escravo da embreagem hidráulica: mesma vulnerabilidade da plataforma LC8',
    body: 'Como toda a linha LC8 da KTM, a RC8 R tem relatos de vedação do cilindro escravo da embreagem degradando com o tempo, permitindo entrada de ar/água. Sintoma: alavanca de embreagem "esponjosa", ponto de engate inconsistente. Verifique o fluido de embreagem (DOT 4) a cada revisão e purgue o sistema se notar folga excessiva na alavanca.',
  },
  {
    severity: 'WARN',
    title: 'Regulador/retificador: vulnerabilidade comum a toda a família LC8',
    body: 'Mesma fragilidade elétrica documentada em outros modelos LC8 (990 Super Duke, 1290 Super Duke). Sintoma: tensão de carga instável, bateria descarregando com moto ligada. Verifique com multímetro a 4.000 rpm (esperado 13,5-14,8V). Considere substituição preventiva por regulador MOSFET aftermarket em unidades de alta quilometragem ou uso intenso em pista (mais ciclos de carga/descarga da bateria).',
  },
  {
    severity: 'WARN',
    title: 'Motor de giro alto sofre mais em uso urbano parado — evite trânsito parado prolongado',
    body: 'O motor 1195cc de alta compressão é otimizado para giro alto e fluxo de ar constante — em trânsito parado por muito tempo, a temperatura sobe mais rápido que em motos de uso urbano comum, e o motor sofre mais com ciclos de superaquecimento/resfriamento repetidos. Se possível, evite deixar a moto em marcha lenta parada por longos períodos; desligue o motor em engarrafamentos muito longos. Verifique o funcionamento do ventilador do radiador regularmente.',
  },
]

const RC8R_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo RC8 R: motor mais potente da família 1190 exige rigor extra',
    body: '1.000 km — Revisão de amaciamento: troca de óleo (10W-50, 2,6L) + inspeção geral. | 5.000 km — Troca de óleo + filtro (uso intenso/pista) ou 6.000 km (uso misto). Lubrificar corrente a cada 500 km. | 10.000 km — Trocar as 4 velas (NGK LKAR9BI9 × 4). Verificar folga de válvulas (admissão 0,25-0,30mm / escape 0,10-0,15mm, motor frio). | 15.000 km — Troca de óleo + filtro. Fluido de freio DOT 4. Testar funcionamento do slipper clutch. | 20.000 km — Folga de válvulas (ajuste se necessário). Kit relação 525 se desgastado. | 25.000 km — Verificar regulador/retificador. Fluido de embreagem (purgar se necessário). Pastilhas de freio. | 35.000 km — Revisão geral de suspensão e vedações do motor.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'SUPERDUKE 990',
    yearFrom: 2005,
    yearTo: 2013,
    MACETES: SD990_MACETES,
    PROBLEMAS: SD990_PROBLEMAS,
    MANUTENCAO: SD990_MANUTENCAO,
  },
  {
    modelName: 'SUPERDUKE 1290 R',
    yearFrom: 2014,
    yearTo: null,
    MACETES: SD1290R_MACETES,
    PROBLEMAS: SD1290R_PROBLEMAS,
    MANUTENCAO: SD1290R_MANUTENCAO,
  },
  {
    modelName: 'SUPERDUKE 1290 GT',
    yearFrom: 2016,
    yearTo: null,
    MACETES: SD1290GT_MACETES,
    PROBLEMAS: SD1290GT_PROBLEMAS,
    MANUTENCAO: SD1290GT_MANUTENCAO,
  },
  {
    modelName: '1190 RC8',
    yearFrom: 2008,
    yearTo: 2010,
    MACETES: RC8_MACETES,
    PROBLEMAS: RC8_PROBLEMAS,
    MANUTENCAO: RC8_MANUTENCAO,
  },
  {
    modelName: '1190 RC8 R',
    yearFrom: 2009,
    yearTo: 2015,
    MACETES: RC8R_MACETES,
    PROBLEMAS: RC8R_PROBLEMAS,
    MANUTENCAO: RC8R_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'SUPERDUKE 990',
    yearFrom: 2005, yearTo: 2013,
    tireSize: '120/70 ZR17 (F) · 180/55 ZR17 (R)',
    frontPsi: 35, rearPsi: 35,
    frontPsiLoad: 35, rearPsiLoad: 38,
    notes: 'Solo: F 35 / R 35 PSI (2,4 bar / 2,4 bar). Com carona/carga: F 35 / R 38 PSI (2,4 bar / 2,6 bar). Sempre calibrar a frio. Pneus recomendados: Michelin Pilot Road ou Pirelli Angel GT (uso misto); Pirelli Diablo Supercorsa (esportivo/pista).',
  },
  {
    modelName: 'SUPERDUKE 1290 R',
    yearFrom: 2014, yearTo: null,
    tireSize: '120/70 ZR17 (F) · 190/55 ZR17 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 42,
    notes: 'Solo e com carona: F 36 / R 42 PSI (2,5 bar / 2,9 bar) — pressão traseira alta é característica de hypernaked de alta performance, essencial para estabilidade em aceleração forte. Sempre calibrar a frio. Pneus recomendados: Michelin Power Cup 2 ou Pirelli Diablo Rosso IV/Supercorsa.',
  },
  {
    modelName: 'SUPERDUKE 1290 GT',
    yearFrom: 2016, yearTo: null,
    tireSize: '120/70 ZR17 (F) · 190/55 ZR17 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 42,
    notes: 'Solo: F 36 / R 42 PSI. Com carona/malas carregadas: mantenha 42 PSI na traseira e considere +2 PSI na dianteira dependendo da carga total. Sempre calibrar a frio. Pneus recomendados para touring esportivo: Michelin Road 5/6 ou Bridgestone Battlax T32.',
  },
  {
    modelName: '1190 RC8',
    yearFrom: 2008, yearTo: 2010,
    tireSize: '120/70 ZR17 (F) · 190/55 ZR17 (R)',
    frontPsi: 36, rearPsi: 36,
    frontPsiLoad: 36, rearPsiLoad: 42,
    notes: 'Solo: F 36 / R 36 PSI (2,5 bar / 2,5 bar). Com carona/carga: F 36 / R 42 PSI (2,5 bar / 2,9 bar), conforme manual do proprietário KTM. Sempre calibrar a frio. Pneus recomendados: Pirelli Diablo Rosso IV (misto) ou Diablo Supercorsa (pista).',
  },
  {
    modelName: '1190 RC8 R',
    yearFrom: 2009, yearTo: 2015,
    tireSize: '120/70 ZR17 (F) · 190/55 ZR17 (R)',
    frontPsi: 36, rearPsi: 36,
    frontPsiLoad: 36, rearPsiLoad: 42,
    notes: 'Solo: F 36 / R 36 PSI (2,5 bar / 2,5 bar). Com carona/carga: F 36 / R 42 PSI (2,5 bar / 2,9 bar). Em track day, ajuste conforme recomendação do fabricante do pneu (pneus slick/DOT-race têm faixa de pressão própria, geralmente mais baixa a quente). Sempre calibrar a frio para uso de rua.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // SUPERDUKE 990
  { modelName: 'SUPERDUKE 990', yearFrom: 2005, yearTo: 2013, component: 'Óleo 10W-50/5W-40 sintético JASO MA2 (3,0L)', intervalKm: 6000, intervalMonths: 12, notes: 'Cárter seco. Nunca usar óleo mineral barato — motor de alta performance exige sintético de qualidade.', priority: 'HIGH', order: 1 },
  { modelName: 'SUPERDUKE 990', yearFrom: 2005, yearTo: 2013, component: 'Filtro de óleo', intervalKm: 6000, intervalMonths: 12, notes: 'Trocar junto com o óleo. Compatível com outros modelos LC8 (990/1190/1290).', priority: 'HIGH', order: 2 },
  { modelName: 'SUPERDUKE 990', yearFrom: 2005, yearTo: 2013, component: 'Vela NGK LKAR8AI-9 (gap 0,8mm)', intervalKm: 12000, intervalMonths: null, notes: 'Rosca longa específica LC8. Peça importada — planeje compra com antecedência.', priority: 'MEDIUM', order: 3 },
  { modelName: 'SUPERDUKE 990', yearFrom: 2005, yearTo: 2013, component: 'Lubrificação corrente 525', intervalKm: 500, intervalMonths: null, notes: 'Pinhão 17T / coroa 38-40T. Kit DID 525VX3 ou RK 525XSO recomendado.', priority: 'HIGH', order: 4 },
  { modelName: 'SUPERDUKE 990', yearFrom: 2005, yearTo: 2013, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Inspecionar a cada troca de óleo, substituir a cada 12.000 km.', priority: 'MEDIUM', order: 5 },
  { modelName: 'SUPERDUKE 990', yearFrom: 2005, yearTo: 2013, component: 'Folga de válvulas (adm 0,10-0,15mm / esc 0,25-0,30mm)', intervalKm: 24000, intervalMonths: 24, notes: 'Motor frio obrigatório. Ajuste por calços (shim under bucket).', priority: 'HIGH', order: 6 },
  { modelName: 'SUPERDUKE 990', yearFrom: 2005, yearTo: 2013, component: 'Embreagem — inspeção do cesto (chocalho/rattling)', intervalKm: 15000, intervalMonths: 12, notes: 'Problema documentado em fóruns internacionais. Verificar amortecedor de borracha do cesto primário.', priority: 'MEDIUM', order: 7 },
  { modelName: 'SUPERDUKE 990', yearFrom: 2005, yearTo: 2013, component: 'Fluido de freio DOT 4', intervalKm: 18000, intervalMonths: 24, notes: 'Frente e trás. Purgar do ponto mais distante para o reservatório.', priority: 'HIGH', order: 8 },
  { modelName: 'SUPERDUKE 990', yearFrom: 2005, yearTo: 2013, component: 'Regulador/retificador — verificação de tensão', intervalKm: null, intervalMonths: 12, notes: 'Ponto de falha documentado. Medir 13,5-14,8V a 4.000 rpm. Substituição preventiva após 40.000-50.000 km.', priority: 'CRITICAL', order: 9 },
  { modelName: 'SUPERDUKE 990', yearFrom: 2005, yearTo: 2013, component: 'Bateria — verificação', intervalKm: null, intervalMonths: 6, notes: 'Tensão mínima 12,4V em repouso.', priority: 'MEDIUM', order: 10 },

  // SUPERDUKE 1290 R
  { modelName: 'SUPERDUKE 1290 R', yearFrom: 2014, yearTo: null, component: 'Óleo 10W-50/5W-40 JASO MA2 (3,5L)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 1301cc "The Beast". Sintético de alta qualidade obrigatório.', priority: 'HIGH', order: 1 },
  { modelName: 'SUPERDUKE 1290 R', yearFrom: 2014, yearTo: null, component: 'Filtro de óleo (código KTM 61338015200)', intervalKm: 10000, intervalMonths: 12, notes: 'Equivalentes genéricos disponíveis (HifloFiltro, K&N) — confira medida antes de comprar.', priority: 'HIGH', order: 2 },
  { modelName: 'SUPERDUKE 1290 R', yearFrom: 2014, yearTo: null, component: 'Velas twin-spark: 2× NGK LKAR9BI-9 + 2× NGK LMAR7A-9 (gap 0,8-0,9mm)', intervalKm: 15000, intervalMonths: null, notes: 'Trocar as 4 sempre juntas. Peças específicas, estoque limitado no Brasil.', priority: 'HIGH', order: 3 },
  { modelName: 'SUPERDUKE 1290 R', yearFrom: 2014, yearTo: null, component: 'Lubrificação corrente 525 X-ring', intervalKm: 500, intervalMonths: null, notes: 'Pinhão 17T / coroa 38T. Kit DID 525ZVM-X reforçado recomendado pela alta potência.', priority: 'HIGH', order: 4 },
  { modelName: 'SUPERDUKE 1290 R', yearFrom: 2014, yearTo: null, component: 'Folga de válvulas', intervalKm: 15000, intervalMonths: 12, notes: 'CRÍTICO: motor "come" folga rápido — relatos de folga zerada já aos 15.000-30.000 km. Não adiar.', priority: 'CRITICAL', order: 5 },
  { modelName: 'SUPERDUKE 1290 R', yearFrom: 2014, yearTo: null, component: 'Cilindro escravo da embreagem — inspeção', intervalKm: 20000, intervalMonths: 12, notes: 'Vedação original degrada e permite entrada de ar/água. Considerar upgrade aftermarket (ex. Oberon).', priority: 'MEDIUM', order: 6 },
  { modelName: 'SUPERDUKE 1290 R', yearFrom: 2014, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 20000, intervalMonths: 24, notes: 'Frente e trás. ABS cornering exige fluido em bom estado.', priority: 'HIGH', order: 7 },
  { modelName: 'SUPERDUKE 1290 R', yearFrom: 2014, yearTo: null, component: 'Kit relação 525 (pinhão 17T + coroa 38T)', intervalKm: 20000, intervalMonths: null, notes: 'Trocar kit completo, nunca só a corrente.', priority: 'HIGH', order: 8 },
  { modelName: 'SUPERDUKE 1290 R', yearFrom: 2014, yearTo: null, component: 'Recall de bomba de combustível (unidades 2017)', intervalKm: null, intervalMonths: null, notes: 'Verificar na concessionária KTM se já foi aplicado.', priority: 'HIGH', order: 9 },
  { modelName: 'SUPERDUKE 1290 R', yearFrom: 2014, yearTo: null, component: 'Atualização de software/ECU', intervalKm: null, intervalMonths: 12, notes: 'Verificar na concessionária, mesmo sem sintoma aparente.', priority: 'LOW', order: 10 },

  // SUPERDUKE 1290 GT
  { modelName: 'SUPERDUKE 1290 GT', yearFrom: 2016, yearTo: null, component: 'Óleo 10W-50/5W-40 JASO MA2 (3,5L)', intervalKm: 10000, intervalMonths: 12, notes: 'Mesmo motor da 1290 R. Monitorar nível em viagens longas.', priority: 'HIGH', order: 1 },
  { modelName: 'SUPERDUKE 1290 GT', yearFrom: 2016, yearTo: null, component: 'Filtro de óleo (código KTM 61338015200)', intervalKm: 10000, intervalMonths: 12, notes: 'Mesma peça da 1290 R.', priority: 'HIGH', order: 2 },
  { modelName: 'SUPERDUKE 1290 GT', yearFrom: 2016, yearTo: null, component: 'Velas twin-spark: 2× NGK LKAR9BI-9 + 2× NGK LMAR7A-9', intervalKm: 15000, intervalMonths: null, notes: 'Planejar compra antes de viagens longas — peça de estoque limitado no interior.', priority: 'HIGH', order: 3 },
  { modelName: 'SUPERDUKE 1290 GT', yearFrom: 2016, yearTo: null, component: 'Lubrificação corrente 525 X-ring', intervalKm: 500, intervalMonths: null, notes: 'Reaplicar a cada 300-400 km em viagens longas com carga.', priority: 'HIGH', order: 4 },
  { modelName: 'SUPERDUKE 1290 GT', yearFrom: 2016, yearTo: null, component: 'Folga de válvulas', intervalKm: 15000, intervalMonths: 12, notes: 'CRÍTICO: mesmo motor da 1290 R, mesma exigência de revisão pontual.', priority: 'CRITICAL', order: 5 },
  { modelName: 'SUPERDUKE 1290 GT', yearFrom: 2016, yearTo: null, component: 'Suspensão WP semi-ativa — limpeza dos sensores', intervalKm: 20000, intervalMonths: 12, notes: 'Sujeira nos sensores de curso causa leitura errada e comportamento errático.', priority: 'MEDIUM', order: 6 },
  { modelName: 'SUPERDUKE 1290 GT', yearFrom: 2016, yearTo: null, component: 'Cilindro escravo da embreagem — inspeção', intervalKm: 20000, intervalMonths: 12, notes: 'Mesma vulnerabilidade da 1290 R.', priority: 'MEDIUM', order: 7 },
  { modelName: 'SUPERDUKE 1290 GT', yearFrom: 2016, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 20000, intervalMonths: 24, notes: 'Frente e trás.', priority: 'HIGH', order: 8 },
  { modelName: 'SUPERDUKE 1290 GT', yearFrom: 2016, yearTo: null, component: 'Kit relação 525 (pinhão 17T + coroa 38T)', intervalKm: 20000, intervalMonths: null, notes: 'Trocar kit completo.', priority: 'HIGH', order: 9 },
  { modelName: 'SUPERDUKE 1290 GT', yearFrom: 2016, yearTo: null, component: 'Vedação e fixação das malas semirrígidas', intervalKm: 20000, intervalMonths: 12, notes: 'Verificar antes de viagens em época chuvosa.', priority: 'LOW', order: 10 },

  // 1190 RC8
  { modelName: '1190 RC8', yearFrom: 2008, yearTo: 2010, component: 'Óleo 10W-50 sintético (2,6L)', intervalKm: 6000, intervalMonths: 12, notes: 'Motor superbike de giro alto. Sintético de alta qualidade obrigatório (ex. Motul 300V/7100).', priority: 'HIGH', order: 1 },
  { modelName: '1190 RC8', yearFrom: 2008, yearTo: 2010, component: 'Filtro de óleo', intervalKm: 6000, intervalMonths: 12, notes: 'Compatível com outros modelos LC8.', priority: 'HIGH', order: 2 },
  { modelName: '1190 RC8', yearFrom: 2008, yearTo: 2010, component: 'Velas twin-spark NGK LKAR9BI9 ×4', intervalKm: 12000, intervalMonths: null, notes: 'Sistema twin-spark: só 1 vela/cilindro dispara abaixo de 7.000 rpm. Trocar as 4 juntas.', priority: 'HIGH', order: 3 },
  { modelName: '1190 RC8', yearFrom: 2008, yearTo: 2010, component: 'Lubrificação corrente 525', intervalKm: 500, intervalMonths: null, notes: 'Pinhão 17T / coroa 38T. Em pista, lubrificar ao fim de cada dia de track day.', priority: 'HIGH', order: 4 },
  { modelName: '1190 RC8', yearFrom: 2008, yearTo: 2010, component: 'Folga de válvulas', intervalKm: 12000, intervalMonths: 12, notes: 'Motor frio obrigatório. Ajuste por calços.', priority: 'HIGH', order: 5 },
  { modelName: '1190 RC8', yearFrom: 2008, yearTo: 2010, component: 'Embreagem hidráulica Magura — fluido e purga', intervalKm: 18000, intervalMonths: 24, notes: 'Embreagem úmida multidisco. Verificar alavanca "esponjosa" — sinal de ar no circuito.', priority: 'MEDIUM', order: 6 },
  { modelName: '1190 RC8', yearFrom: 2008, yearTo: 2010, component: 'Fluido de freio DOT 4', intervalKm: 18000, intervalMonths: 24, notes: 'Frente e trás.', priority: 'HIGH', order: 7 },
  { modelName: '1190 RC8', yearFrom: 2008, yearTo: 2010, component: 'Kit relação 525 (pinhão 17T + coroa 38T)', intervalKm: 24000, intervalMonths: null, notes: 'DID 525VX3 ou RK 525XSO recomendado.', priority: 'HIGH', order: 8 },
  { modelName: '1190 RC8', yearFrom: 2008, yearTo: 2010, component: 'Regulador/retificador — verificação', intervalKm: null, intervalMonths: 12, notes: 'Vulnerabilidade comum à plataforma LC8. Medir 13,5-14,8V a 4.000 rpm.', priority: 'HIGH', order: 9 },
  { modelName: '1190 RC8', yearFrom: 2008, yearTo: 2010, component: 'Pastilhas de freio dianteiro/traseiro', intervalKm: 15000, intervalMonths: null, notes: 'Uso esportivo/pista desgasta mais rápido que uso de rua comum.', priority: 'MEDIUM', order: 10 },

  // 1190 RC8 R
  { modelName: '1190 RC8 R', yearFrom: 2009, yearTo: 2015, component: 'Óleo 10W-50 sintético (2,6L)', intervalKm: 5000, intervalMonths: 12, notes: 'Motor 1195cc de alta compressão (13,5:1). Em uso de pista, reduzir para 4.000-5.000 km.', priority: 'HIGH', order: 1 },
  { modelName: '1190 RC8 R', yearFrom: 2009, yearTo: 2015, component: 'Filtro de óleo', intervalKm: 5000, intervalMonths: 12, notes: 'Trocar a cada troca de óleo.', priority: 'HIGH', order: 2 },
  { modelName: '1190 RC8 R', yearFrom: 2009, yearTo: 2015, component: 'Velas twin-spark NGK LKAR9BI9 ×4', intervalKm: 10000, intervalMonths: null, notes: 'Trocar as 4 juntas. Peça específica, estoque limitado.', priority: 'HIGH', order: 3 },
  { modelName: '1190 RC8 R', yearFrom: 2009, yearTo: 2015, component: 'Lubrificação corrente 525', intervalKm: 500, intervalMonths: null, notes: 'Pinhão 17T / coroa 37-38T. Kit reforçado DID 525ZVM-X recomendado pela potência.', priority: 'HIGH', order: 4 },
  { modelName: '1190 RC8 R', yearFrom: 2009, yearTo: 2015, component: 'Folga de válvulas (adm 0,25-0,30mm / esc 0,10-0,15mm)', intervalKm: 10000, intervalMonths: 12, notes: 'CRÍTICO: motor de alta compressão exige atenção — folga fecha rápido, válvulas de titânio.', priority: 'CRITICAL', order: 5 },
  { modelName: '1190 RC8 R', yearFrom: 2009, yearTo: 2015, component: 'Embreagem slipper — teste de funcionamento e lubrificação das rampas', intervalKm: 15000, intervalMonths: 12, notes: 'Problema documentado: slipper mal lubrificado não atua corretamente. Verificar óleo antes de trocar peça.', priority: 'MEDIUM', order: 6 },
  { modelName: '1190 RC8 R', yearFrom: 2009, yearTo: 2015, component: 'Fluido de freio DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'Frente e trás.', priority: 'HIGH', order: 7 },
  { modelName: '1190 RC8 R', yearFrom: 2009, yearTo: 2015, component: 'Kit relação 525 (pinhão 17T + coroa 37-38T)', intervalKm: 20000, intervalMonths: null, notes: 'Trocar kit completo.', priority: 'HIGH', order: 8 },
  { modelName: '1190 RC8 R', yearFrom: 2009, yearTo: 2015, component: 'Regulador/retificador — verificação', intervalKm: null, intervalMonths: 12, notes: 'Vulnerabilidade comum à plataforma LC8.', priority: 'HIGH', order: 9 },
  { modelName: '1190 RC8 R', yearFrom: 2009, yearTo: 2015, component: 'Pastilhas de freio dianteiro/traseiro', intervalKm: 12000, intervalMonths: null, notes: 'Uso em pista desgasta significativamente mais rápido.', priority: 'MEDIUM', order: 10 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed KTM Super Duke (990/1290 R/1290 GT) e RC8 (1190/1190 R)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'KTM', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'KTM', vehicleTypeId: motoType.id },
  })

  for (const block of BLOCKS) {
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
        yearFrom:  null,
        yearTo:    null,
        order: idx,
      })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips`)
  }

  for (const tp of TIRE_PRESSURES) {
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
    console.log(`  🔵 TirePressure: ${tp.modelName}`)
  }

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: BLOCKS.map((b) => b.modelName) } },
  })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ KTM Super Duke / RC8 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
