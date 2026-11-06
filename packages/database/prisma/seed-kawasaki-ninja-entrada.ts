// seed-kawasaki-ninja-entrada.ts — Kawasaki linha Ninja de entrada: Ninja 300, Ninja 400, Ninja 500, Ninja 650
// Um dos arquivos de seed da marca Kawasaki — usa upsert no Brand para evitar duplicidade com os arquivos irmãos
// (Z-series, Versys, Ninja Super, KLX/KX).
// Execute: pnpm --filter @motormacete/database db:seed:kawasaki-ninja-entrada
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

// ─── NINJA 300 ──────────────────────────────────────────────────────────────
// Motor: 296cc paralelo-twin DOHC 8V arrefecido a líquido | 39 cv @ 11.000 rpm | torque 2,8 kgf.m @ 10.000 rpm
// Injeção eletrônica | Óleo 10W-40 JASO MA2 ~2,2L (serviço) / 2,4L (1º enchimento) | Vela NGK CR8E gap 0,7–0,8mm
// Pneu: 110/70-17 (F) / 140/70-17 (R) | Corrente 520 × 106 (pinhão 14T / coroa 42T) | Tanque 17L
// Descontinuada no Brasil (substituída pela Ninja 400 a partir de 2018)

const NINJA300_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA2 — 2,2L na troca de serviço (2,4L no 1º enchimento); intervalo 6.000 km',
    body: 'O motor 296cc DOHC paralelo-twin da Ninja 300 compartilha óleo com a embreagem em banho de óleo — use sempre selo JASO MA2 (nunca óleo automotivo puro API SN sem esse selo, risco de a embreagem escorregar). Capacidade: 2,4L no primeiro enchimento (motor seco), 2,2L em troca normal com filtro (0,2L fica retido no filtro). Marcas recomendadas: Motul 5100 10W-40, Lubrax Moto 4T 10W-40, Shell Advance 4T 10W-40. Intervalo Kawasaki: 6.000 km ou 6 meses.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR8E gap 0,7–0,8mm — mesma vela usada na Z300 e no motor de origem',
    body: 'A Ninja 300 é a base mecânica que deu origem à Z300 naked — o motor, a vela e boa parte da elétrica são idênticos. Vela original: NGK CR8E, gap 0,7–0,8mm (equivalente Denso U24ESR-N). Custo: R$ 20–35. Sintomas de vela gasta: partida a frio mais difícil, leve engasgo em baixa rotação, consumo até 10% maior. Upgrade iridium NGK CR8EIX dura até 20.000 km e melhora resposta em marcha lenta.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 × 106 elos (pinhão 14T / coroa 42T) — lubrifique a cada 500–700 km',
    body: 'Kit relação padrão: corrente 520 com 106 elos, pinhão de 14 dentes e coroa de 42 dentes. Lubrificação regular (spray de corrente ou óleo 80W-90 no trecho inferior) a cada 500–700 km estende bastante a vida útil — de 15.000 para 20.000+ km. Folga correta: 25–35mm no centro do trecho inferior, moto no cavalete central. Kits recomendados: DID 520VX3, RK GB520KRO — R$ 350–550 o conjunto completo.',
  },
  {
    severity: 'OK',
    title: 'Compatibilidade quase total com a Z300 — amplia a busca de peças no Brasil',
    body: 'Como a Z300 é literalmente a Ninja 300 sem carenagem esportiva, qualquer peça de motor, sistema elétrico, freio ou suspensão rotulada "Z300" também serve na Ninja 300 e vice-versa. Ao procurar peças em lojas físicas ou online, busque por ambos os nomes — isso dobra as opções de fornecedor e costuma baixar o preço, principalmente hoje que ambas estão descontinuadas no Brasil desde 2018.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem a cabo (não hidráulica): regule a folga a cada 3.000 km',
    body: 'A Ninja 300 usa embreagem acionada por cabo. Folga incorreta (muito justa) faz a embreagem "arrastar" mesmo com a alavanca solta, aumentando a temperatura do motor e acelerando o desgaste dos discos. Verifique a folga na ponta da alavanca a cada 3.000 km — o correto é 2–3mm antes de sentir resistência. Kit de discos de embreagem, quando necessário trocar: R$ 150–300, compatível com Z300.',
  },
  {
    severity: 'OK',
    title: 'Radiador e arrefecimento a líquido: confira o nível antes de cada viagem',
    body: 'Diferente de motos de entrada refrigeradas a ar, a Ninja 300 é arrefecida a líquido — item que exige atenção extra. Verifique o nível do reservatório de expansão mensalmente e sempre antes de rodovia; nível baixo é a causa mais comum de superaquecimento nesse motor pequeno. Use apenas coolant específico para moto (etilenoglicol com anticorrosivo compatível com alumínio) — nunca complete só com água, mesmo em emergência prolongada.',
  },
  {
    severity: 'OK',
    title: 'Motor pequeno gosta de giro: torque máximo só a 10.000 rpm',
    body: 'O motor 296cc entrega a maior parte do torque em rotação alta — reduzir marcha e manter giro entre 6.000–9.000 rpm rende mais que "esticar" a marcha alta em baixa rotação, o que só aumenta vibração e desgaste da embreagem. Consumo médio real fica entre 22–26 km/l no trânsito misto, podendo passar de 28 km/l em uso rodoviário constante.',
  },
]

const NINJA300_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall histórico da ECU (2013): motor podia desligar em reduções de marcha',
    body: 'Modelos de primeira geração (2013, mesma plataforma da Z300) tiveram recall por programação incorreta da ECU: ao reduzir marcha com a embreagem acionada perto de 3.000 rpm em certas condições, o sistema de alimentação de combustível podia cortar e desligar o motor de forma inesperada. Se sua Ninja 300 é desse lote e nunca passou pelo recall, procure uma concessionária Kawasaki para verificar/atualizar a ECU gratuitamente — é item de segurança, risco de perda de tração em curva ou frenagem.',
  },
  {
    severity: 'WARN',
    title: 'Problemas de motor relatados por proprietários no Brasil — atenção a ruídos anormais',
    body: 'Há relatos documentados de proprietários brasileiros sobre falhas de motor recorrentes, incluindo casos de reparo caro por rachaduras em válvulas e problemas na embreagem completa (troca de kit, R$ 4.000+). Não é um padrão generalizado de defeito de projeto, mas justifica atenção redobrada: qualquer ruído metálico novo, perda de potência progressiva ou vibração diferente do normal deve ser investigado imediatamente antes de rodar mais — motor de 2 cilindros pequeno tem menos margem para "rodar estragado" sem dano maior.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento por nível baixo de arrefecimento ou óleo',
    body: 'O motor pequeno arrefecido a líquido da Ninja 300 é mais sensível a baixo nível de coolant ou óleo do que motores maiores da própria marca. Transbordamento do reservatório de expansão é sinal de aquecimento excessivo — geralmente causado por falta de líquido de arrefecimento ou óleo abaixo do mínimo. Verifique os dois níveis regularmente, principalmente antes de trechos de rodovia ou trânsito parado prolongado.',
  },
  {
    severity: 'WARN',
    title: 'Problemas de acabamento e carenagem: folgas e rangidos após o primeiro uso',
    body: 'Proprietários relatam ocasionalmente folgas visíveis na carenagem lateral (perto do painel) surgindo logo nas primeiras semanas de uso — geralmente presilhas plásticas mal encaixadas de fábrica, não trinca estrutural. Verifique o encaixe de todos os clipes plásticos na primeira revisão e reaperte parafusos de fixação da carenagem; se a folga persistir, o clipe pode estar quebrado e precisa ser substituído (peça barata, R$ 5–15 cada).',
  },
  {
    severity: 'WARN',
    title: 'Peças específicas de carenagem cada vez mais escassas — descontinuada desde 2018',
    body: 'A Ninja 300 saiu de linha no Brasil em 2018, substituída pela Ninja 400. Peças 100% exclusivas da carenagem esportiva (bolha, rabeta, para-lama dianteiro específico) ficam mais raras com o tempo. Para mecânica, elétrica e suspensão, a compatibilidade com a Z300 (mesmo motor, sem carenagem) resolve a maior parte dos casos — mas para plástico de carroceria, desmanches e grupos de proprietários no Facebook/fóruns costumam ter estoque remanescente.',
  },
]

const NINJA300_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Ninja 300: motor pequeno arrefecido a líquido pede atenção a fluidos',
    body: '1.000 km — Revisão de rodagem + troca de óleo inicial. | 6.000 km — Troca de óleo + filtro (10W-40 JASO MA2, ~2,2L). Lubrificar corrente. | 8.000 km — Verificar/trocar vela NGK CR8E (gap 0,7–0,8mm). Verificar folga da embreagem. | 12.000 km — Filtro de ar. Folga de válvulas (motor frio). Fluido de arrefecimento + mangueiras. | 18.000 km — Fluido de freio DOT 4. Pastilhas de freio. | 20.000 km — Kit relação (pinhão 14T + coroa 42T + corrente 520 × 106). | 24.000 km — Vela nova + revisão geral de válvulas e sistema de arrefecimento.',
  },
]

// ─── NINJA 400 ──────────────────────────────────────────────────────────────
// Motor: 399cc paralelo-twin DOHC 8V arrefecido a líquido | 45–49 cv @ 10.000 rpm | torque 3,9 kgf.m (38 Nm) @ 8.000 rpm
// Diâmetro×curso 70×51,8mm | Compressão 11,6:1 | Injeção 32mm × 2 Keihin | Óleo 10W-40 JASO MA ~2,3L | Vela NGK LMAR9G-9 gap 0,8mm
// Pneu: 110/70-17 (F) / 150/60-17 (R) | Corrente 520 × 106 (pinhão 14T / coroa 41T) | Tanque 14L | Peso ~168kg
// Descontinuada, substituída pela Ninja 500 a partir de 2024

const NINJA400_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Base mecânica compartilhada com a Z400 — mesma facilidade de peças',
    body: 'A Ninja 400 usa o mesmo motor 399cc, chassi, embreagem e boa parte da elétrica da Z400 naked. Ao procurar peças, busque também por "Z400" para ampliar as opções de fornecedor e comparar preço — a compatibilidade é praticamente total em tudo que não é carenagem/carroceria.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA — cerca de 2,3L com troca de filtro; intervalo 6.000 km',
    body: 'Capacidade de óleo: aproximadamente 2,3 litros com troca de filtro (confirme no manual da sua unidade, pode variar 0,1L entre anos-modelo). Use sempre 10W-40 com selo JASO MA — a embreagem é em banho de óleo e óleo sem esse selo pode causar patinação sob carga. Marcas recomendadas: Motul 5100 10W-40, Lubrax Moto 4T. Kit troca de óleo com filtro (óleo + filtro Hiflofiltro ou K&N): R$ 140–200 em lojas especializadas.',
  },
  {
    severity: 'OK',
    title: 'Vela original NGK LMAR9G-9 gap 0,8mm — não confundir com a antiga CR8E',
    body: 'A Ninja 400 (diferente da Ninja 300) usa vela de rosca curta com terminal roscado, código NGK LMAR9G-9, gap de fábrica 0,8mm. É uma vela padrão (resistor), não iridium — quem quiser durabilidade maior pode optar pela versão laser iridium NGK SILMAR9B9 (gap 0,9mm), que dura consideravelmente mais que a original. Não compre CR8E/CR9E por engano: a rosca e o comprimento são diferentes e não encaixam.',
  },
  {
    severity: 'OK',
    title: 'Kit relação 520 × 106 elos (pinhão 14T / coroa 41T) — revisão completa a cada 12.000 km',
    body: 'A Ninja 400 usa corrente 520 com 106 elos, pinhão de 14 dentes e coroa de 41 dentes — configuração padrão vendida por marcas nacionais (Durag, Vaz Xtreme, RK) com kit completo por R$ 250–450. Lubrifique a corrente a cada 500–700 km de uso normal; em uso com chuva frequente, reduza esse intervalo. O cronograma oficial prevê revisão de óleo a cada 6.000 km e revisão completa (válvulas, corrente, filtro de ar, freio) a cada 12.000 km.',
  },
  {
    severity: 'OK',
    title: 'Motor superquadrado (70mm × 51,8mm): torque máximo só a 8.000 rpm',
    body: 'O motor da Ninja 400 é "superquadrado" (diâmetro do pistão maior que o curso) — característica de motores que giram bem em alta rotação. O torque máximo (3,9 kgf.m / 38 Nm) só chega a 8.000 rpm, então não force o motor em marcha alta com rotação baixa. No trânsito, use as marchas intermediárias para manter o motor na faixa de torque útil e reduzir vibração.',
  },
  {
    severity: 'OK',
    title: 'Calibragem: aproximadamente 30 PSI (F) / 33 PSI (R) solo, a frio — confira a etiqueta da sua unidade',
    body: 'Pneu dianteiro 110/70-17 e traseiro 150/60-17. As fontes de manual variam um pouco entre anos-modelo (entre 28–33 PSI), então sempre confira a etiqueta oficial fixada no braço oscilante ou no manual do proprietário específico da sua unidade antes de calibrar. Meça sempre a frio (moto parada há mais de 3 horas ou rodada menos de 1,6 km).',
  },
]

const NINJA400_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall do tensionador de corrente de comando (lote outubro/2019, modelo 2020)',
    body: 'A Kawasaki convocou proprietários de Ninja 400 e Z400 modelo 2020 fabricados em outubro de 2019 (faixas de chassi específicas informadas pela concessionária) para recall: o tratamento térmico do tensionador da corrente de comando (timing chain) podia causar desgaste anormal, resultando em folga excessiva da corrente, perda de sincronismo do motor e o risco do motor "morrer" em movimento — com possibilidade de acidente. Verifique pelo chassi no site oficial da Kawasaki do Brasil ou ligando 0800-773-1210 se sua unidade está no lote afetado.',
  },
  {
    severity: 'WARN',
    title: 'Recall de ECU relacionado ao quickshifter (uso extremo pode danificar válvulas de admissão)',
    body: 'Foi identificado que a programação de fábrica da ECU, em combinação com o sistema quickshifter (quando equipado) em condições de pilotagem extrema, podia causar combustão retardada, resultando em deformação e/ou quebra de válvulas de admissão. O uso continuado nessa condição podia derreter peças próximas pelo calor excessivo do escapamento, com risco de incêndio. Se sua Ninja 400 tem quickshifter, confirme na concessionária se essa atualização de ECU já foi aplicada.',
  },
  {
    severity: 'WARN',
    title: 'Sensibilidade a óleo fora de especificação: embreagem pode patinar',
    body: 'Como em toda a linha Kawasaki com embreagem em banho de óleo, usar óleo sem selo JASO MA (comum em óleos "genéricos" vendidos como 10W-40 automotivo puro) pode causar patinação da embreagem sob carga, especialmente em subidas ou ultrapassagens. Compre sempre óleo específico para moto com selo JASO MA visível na embalagem — nunca confie apenas na viscosidade anunciada.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão traseira firme de fábrica — ajuste a pré-carga para o peso do piloto',
    body: 'A suspensão traseira da Ninja 400 vem regulada de fábrica para um peso médio e pode ficar dura ou macia demais dependendo do piloto. Ajuste a pré-carga da mola traseira (anel regulável) conforme seu peso — muitos donos reportam melhora perceptível de conforto apenas ajustando esse item, sem custo de peça nova.',
  },
  {
    severity: 'WARN',
    title: 'Descontinuada no Brasil: peças de reposição migrando para a linha Ninja 500',
    body: 'A Ninja 400 foi substituída pela Ninja 500 na linha Kawasaki a partir de 2024. Peças específicas de carroceria (tanque, painel, rabeta) podem ficar mais escassas com o tempo — priorize concessionárias com estoque remanescente. Para mecânica, elétrica e suspensão, a compatibilidade com a Z400 (mesma base mecânica) continua sendo o caminho mais confiável para encontrar peças.',
  },
]

const NINJA400_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma oficial Ninja 400: óleo a cada 6.000 km, revisão completa a cada 12.000 km',
    body: '1.000 km — Revisão de rodagem + troca de óleo inicial. | 6.000 km — Troca de óleo + filtro (10W-40 JASO MA, ~2,3L). | 8.000 km — Verificar vela NGK LMAR9G-9 (gap 0,8mm). | 12.000 km — Revisão completa: válvulas, corrente, filtro de ar, fluido de freio. Verificar tensionador de corrente de comando (item de recall em lotes 2020). | 18.000 km — Troca de óleo + filtro. | 24.000 km — Revisão completa novamente + kit relação (520 × 106, pinhão 14T/coroa 41T) se desgastado. | A cada 500–700 km — Lubrificação da corrente.',
  },
]

// ─── NINJA 500 (inclui Ninja 500 SE) ────────────────────────────────────────
// Motor: 451cc paralelo-twin DOHC 8V arrefecido a líquido | 51 cv @ 10.000 rpm | torque 43 Nm (4,4 kgf.m) @ 7.500 rpm
// Diâmetro×curso 70×58,6mm | Compressão 11,3:1 | Injeção 32mm × 2 corpos de borboleta | Corrente selada (O-ring/sealed)
// Pneu: 110/70-17 (F) / 150/60-17 (R) | Tanque 14L | Peso ~170kg (em ordem de marcha) | Lançada em 2024, sucessora da Ninja 400

const NINJA500_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 451cc é evolução do 399cc da Ninja 400 — mesmo DNA, mais cilindrada e torque',
    body: 'A Ninja 500 (lançada em 2024) substitui a Ninja 400 na linha Kawasaki, com motor aumentado de 399cc para 451cc — ganho real de torque (43 Nm contra 38 Nm da geração anterior) sem perder a leveza da categoria de entrada. Peso em ordem de marcha próximo de 170kg. Por ser modelo recente, para peças de motor ainda priorize concessionária oficial — o mercado de compatíveis genéricos ainda está se formando.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA2 — siga o manual; capacidade próxima de 2,3–2,5L (confirme na concessionária)',
    body: 'Kawasaki não divulgou publicamente a capacidade exata de óleo da Ninja 500 em todas as fontes consultadas — modelos da família de motor semelhante (Ninja 400/Z400) usam 2,3L. Use sempre 10W-40 com selo JASO MA2, marcas Motul 5100, Lubrax Moto 4T ou equivalente. Confirme a capacidade exata no manual do proprietário ou com a concessionária antes da primeira troca, pois pode variar da geração anterior.',
  },
  {
    severity: 'OK',
    title: 'Corrente selada (sealed/O-ring) de fábrica — durabilidade maior que a Ninja 400',
    body: 'A Ninja 500 vem com corrente de transmissão selada (tipo O-ring) de fábrica, diferente de correntes simples de gerações mais antigas — retém graxa internamente e dura mais entre lubrificações. Ainda assim, lubrifique externamente a cada 500–700 km para preservar os O-rings e evitar ferrugem superficial. Folga correta: 25–35mm no centro do trecho inferior, moto no cavalete central.',
  },
  {
    severity: 'OK',
    title: 'Consumo de combustível classe A: espere entre 22–28 km/l em uso misto',
    body: 'Com motor eficiente e injeção eletrônica moderna (32mm × 2 corpos de borboleta), a Ninja 500 entrega consumo econômico para a categoria — em torno de 22 a 28 km/l dependendo do estilo de pilotagem. Com tanque de 14L, autonomia esperada de 300 a 380 km. É uma moto pensada tanto para iniciantes quanto para quem quer economia no dia a dia urbano.',
  },
  {
    severity: 'OK',
    title: 'Versão SE: suspensão e acabamento com upgrades — vale considerar se for rodar mais',
    body: 'A variante Ninja 500 SE (também cadastrada sob "Ninja 500" pelo casamento de substring do site) traz upgrades de suspensão ajustável ou acabamento superior dependendo do mercado/ano. Confirme com a concessionária quais diferenças específicas se aplicam à sua unidade antes de comprar peças de suspensão, pois podem não ser intercambiáveis com a versão básica.',
  },
  {
    severity: 'OK',
    title: 'Modelo novo: siga o cronograma oficial à risca — ainda não há histórico extenso no Brasil',
    body: 'Por ser lançamento recente (2024), a Ninja 500 ainda não acumulou histórico extenso de durabilidade de peças no mercado brasileiro. Siga o cronograma conservador do manual do proprietário e fique atento a comunicados de recall da Kawasaki do Brasil, comuns nos primeiros anos de um modelo novo — consulte periodicamente pelo chassi da sua moto.',
  },
]

const NINJA500_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Modelo recente: poucos dados de longo prazo — acompanhe recalls da Kawasaki Brasil',
    body: 'Por ser lançada em 2024, a Ninja 500 ainda não tem histórico consolidado de problemas recorrentes como os modelos mais antigos da linha Ninja. Acompanhe o site oficial de recalls da Kawasaki do Brasil (kawasakibrasil.com/pt_br/service/recalls.html) periodicamente pelo chassi da sua moto.',
  },
  {
    severity: 'WARN',
    title: 'Relatos de problemas já nas primeiras semanas de uso — cobre a garantia rigorosamente',
    body: 'Há relatos de proprietários que notaram problemas poucos dias após a retirada da moto na concessionária. Como é modelo novo com pouco histórico, documente qualquer anomalia (ruído, vazamento, luz de alerta) desde o primeiro dia e acione a garantia formalmente — não espere o problema "se resolver sozinho" rodando mais.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem: verifique sinais de patinação sob aceleração forte',
    body: 'Um sintoma de alerta citado por especialistas em pré-diagnóstico da Ninja 500: embreagem que patina sob aceleração forte, com a rotação do motor subindo sem ganho correspondente de velocidade — indica discos de fricção desgastados ou contaminados (geralmente por óleo fora de especificação, sem selo JASO MA2). Se notar esse sintoma mesmo com poucos km rodados, leve à concessionária imediatamente.',
  },
  {
    severity: 'WARN',
    title: 'Sistema de arrefecimento líquido: fique atento a vazamentos e cheiro doce de coolant',
    body: 'Sinal de alerta a observar: cheiro adocicado característico de líquido de arrefecimento ou poça pequena perto da dianteira do motor indicam vazamento no sistema de arrefecimento líquido. Motor pequeno arrefecido a líquido é mais sensível a perda de coolant do que motores maiores — verifique o nível do reservatório de expansão regularmente, principalmente nos primeiros meses de uso.',
  },
  {
    severity: 'WARN',
    title: 'Torque baixo em rotações baixas comparado a motos maiores da própria marca',
    body: 'Apesar do ganho de cilindrada sobre a Ninja 400, a Ninja 500 ainda é uma moto de entrada — o torque de 43 Nm só é liberado por completo a 7.500 rpm. Em ultrapassagens ou subidas com garupa, é necessário reduzir marcha com mais frequência que em uma Ninja 650 ou Z650. Não é defeito, é característica de categoria — mas frustra quem espera desempenho de moto maior.',
  },
]

const NINJA500_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Ninja 500: siga o manual do proprietário — modelo novo com poucos ajustes de campo conhecidos',
    body: '1.000 km — Revisão de rodagem, troca de óleo inicial, checagem geral de aperto. | 6.000 km — Troca de óleo + filtro (10W-40 JASO MA2). | 12.000 km — Revisão completa: válvulas, corrente, filtro de ar, fluido de freio. | 18.000 km — Óleo + filtro. | 24.000 km — Revisão completa + avaliar kit relação. | A cada 500–700 km — Lubrificação externa da corrente selada. Sempre confirme os intervalos exatos no manual impresso ou digital específico do ano/versão da sua unidade, pois a Kawasaki pode ajustar cronogramas entre anos-modelo.',
  },
]

// ─── NINJA 650 ──────────────────────────────────────────────────────────────
// Motor: 649cc paralelo-twin DOHC 8V arrefecido a líquido | 68 cv @ 8.500 rpm | torque 65,7 Nm (6,7 kgf.m) @ 6.500 rpm
// Diâmetro×curso 83×60mm | Compressão 10,8:1 | Injeção 36mm × 2 Keihin (DFI) | Óleo 10W-40 JASO MA ~1,8–1,9L (serviço) / 2,3–2,4L (1º enchimento)
// Vela NGK CR9EIA-9 (iridium) | Pneu: 120/70-17 (F) / 160/60-17 (R) | Corrente 520 tipo O-ring | Tanque 15L | Peso ~190–193kg (ABS)
// NOTA HISTÓRICA: existiu uma geração anterior "Ninja 650R" (2006–2011), baseada na plataforma ER-6f, com motor
// 649cc carburado/injetado mais simples (72 cv, chassi treliça de tubo) — mecânica mais rústica que a geração atual.

const NINJA650_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA — cerca de 1,8–1,9L em troca de serviço; intervalo 6.000 km',
    body: 'O motor 649cc DOHC da Ninja 650 (geração atual, 2012 em diante) tem capacidade de óleo relativamente baixa para a cilindrada: aproximadamente 1,8–1,9 litro com troca de filtro (2,3–2,4L no primeiro enchimento com motor seco). Confirme no manual da sua unidade, pois pode variar 0,1–0,2L conforme ano. Use sempre 10W-40 semissintético com selo JASO MA — Motul 5100, Lubrax Moto 4T, Shell Advance 4T são bem aceitos. Intervalo oficial: 6.000 km ou 6 meses.',
  },
  {
    severity: 'OK',
    title: 'Vela original NGK CR9EIA-9 (iridium) — mesma vela usada na Z650/Z650RS que compartilham o motor',
    body: 'A Ninja 650 moderna usa vela NGK CR9EIA-9, iridium original de fábrica — diferencial em relação a modelos mais baratos que usam vela convencional. Isso significa maior durabilidade (até 20.000–25.000 km) e não há necessidade de "upgrade" de vela como em outras motos de entrada. Ao trocar, mantenha o mesmo código para preservar a resposta de ignição original. Custo: R$ 45–70 por unidade.',
  },
  {
    severity: 'OK',
    title: 'Pressão dos pneus: 32-36 PSI dianteiro / 36-42 PSI traseiro conforme carga — confira a etiqueta',
    body: 'Pneu 120/70-17 (F) e 160/60-17 (R). Como referência geral (varia por ano/mercado — confira sempre a etiqueta do braço oscilante ou manual da sua unidade): piloto sozinho aproximadamente 32 PSI dianteiro / 36 PSI traseiro a frio; com garupa e bagagem, aumente para 34-36 PSI dianteiro / 40-42 PSI traseiro. Meça sempre a frio (moto parada há mais de 3 horas). Pneu murcho prejudica bastante o handling ágil característico da Ninja 650.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 tipo O-ring — kit relação de qualidade dura 20.000-25.000 km bem mantido',
    body: 'A Ninja 650 usa corrente 520 selada (O-ring), que retém graxa internamente e dura mais entre lubrificações externas. Lubrifique a cada 500-700 km (mais frequente com chuva). Folga correta: 25-35mm no centro do trecho inferior. Marcas recomendadas para kit relação completo: DID 520VX3 (com O-ring), RK GB520KRO — ambas disponíveis no Brasil, R$ 400-650 o kit completo (pinhão+coroa+corrente).',
  },
  {
    severity: 'OK',
    title: 'Compatibilidade de peças com a Z650/Z650RS: mesmo motor, mesma rotina de manutenção',
    body: 'A Ninja 650 compartilha o bloco de motor 649cc DOHC com toda a família Z650/Z650RS (naked e retrô). Peças de motor, embreagem, elétrica e boa parte da suspensão são intercambiáveis entre esses modelos — ao procurar peças, busque também por "Z650" e "Z650RS" para ampliar as opções de fornecedor e comparar preço.',
  },
  {
    severity: 'OK',
    title: 'Freio traseiro: pinça e disco simples exigem atenção a ruídos e vibração',
    body: 'Owners reportam ocasionalmente ruídos estranhos ou sensação de freio "mole" — geralmente ligado a pastilhas gastas ou ar no sistema hidráulico, não defeito de projeto. Purgue o fluido de freio a cada 24 meses (DOT 4) e troque pastilhas quando o material de atrito ficar abaixo de 2mm. Marcas compatíveis: EBC FA379, Vesrah.',
  },
]

const NINJA650_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Marcha instável ou motor "engasgando" — geralmente filtro de ar sujo ou vela gasta',
    body: 'Alguns proprietários relatam marcha lenta instável ou engasgos leves. Na maioria dos casos documentados na família de motor 649cc, a causa é filtro de ar sujo ou vela desgastada, não falha eletrônica. Antes de levar para diagnóstico caro, faça a checagem básica: filtro de ar (limpar/trocar) e vela NGK CR9EIA-9 (verificar desgaste). Combustível de má qualidade também é causa comum no Brasil.',
  },
  {
    severity: 'WARN',
    title: 'Freio com sensação "mole" ou ruído: fade em uso intenso, purgar sistema resolve na maioria dos casos',
    body: 'Reclamações sobre freio fraco ou "esponjoso" geralmente se referem a fade (superaquecimento em frenagens repetidas) ou ar no sistema hidráulico — não defeito de fábrica generalizado. Purgue o fluido corretamente (DOT 4, bienal) e troque pastilhas quando gastas. Se o problema persistir após isso, verifique o disco quanto a empenamento.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio "duro" ou trocas de marcha bruscas em algumas unidades',
    body: 'Parte dos proprietários relata dificuldade ocasional para engatar marchas suavemente, especialmente com óleo já no fim do intervalo de troca. Óleo degradado perde viscosidade adequada para lubrificar as engrenagens do câmbio. Mantenha o intervalo de 6.000 km rigorosamente — em uso intenso ou pista, reduza para 4.000-5.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Vibração em alta velocidade — verifique balanceamento de rodas e aperto do motor',
    body: 'Reclamações de "tremor" ou vibração perceptível em velocidades de rodovia (acima de 100 km/h) geralmente têm origem em desbalanceamento de pneus/rodas (facilmente corrigido em borracharia) ou parafusos de fixação do motor no chassi que afrouxaram com o uso. Inclua checagem de aperto geral nas revisões periódicas.',
  },
  {
    severity: 'WARN',
    title: 'Geração antiga Ninja 650R (2006-2011): mecânica mais simples, mas peças cada vez mais escassas',
    body: 'Se sua moto é da geração antiga "Ninja 650R" (2006-2011, plataforma ER-6f, chassi treliça de tubo, 72 cv), saiba que ela é mecanicamente diferente da geração atual (2012+) — motor, chassi e boa parte da elétrica não são intercambiáveis entre as duas gerações. Peças específicas dessa geração mais antiga ficam mais raras a cada ano; busque também por "ER-6f" ao procurar peças, pois é o nome usado em outros mercados para o mesmo modelo.',
  },
]

const NINJA650_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Ninja 650: revisões a cada 6.000 km, checagens maiores em intervalos de 12.000 km',
    body: '1.000 km — Revisão de rodagem + troca de óleo inicial. | 6.000 km — Troca de óleo + filtro (10W-40 JASO MA, ~1,8-1,9L). Lubrificar corrente. | 12.000 km — Revisão completa: filtro de ar, folga de válvulas, fluido de freio, corrente/relação. | 18.000 km — Óleo + filtro + vela (verificar desgaste da CR9EIA-9). | 24.000 km — Revisão completa novamente. Avaliar kit relação (520). | 24 meses — Fluido de freio DOT 4 (mesmo sem atingir o km da revisão).',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'NINJA 300',
    yearFrom: 2013,
    yearTo: 2017,
    MACETES: NINJA300_MACETES,
    PROBLEMAS: NINJA300_PROBLEMAS,
    MANUTENCAO: NINJA300_MANUTENCAO,
  },
  {
    modelName: 'NINJA 400',
    yearFrom: 2018,
    yearTo: 2024,
    MACETES: NINJA400_MACETES,
    PROBLEMAS: NINJA400_PROBLEMAS,
    MANUTENCAO: NINJA400_MANUTENCAO,
  },
  {
    modelName: 'NINJA 500',
    yearFrom: 2024,
    yearTo: null,
    MACETES: NINJA500_MACETES,
    PROBLEMAS: NINJA500_PROBLEMAS,
    MANUTENCAO: NINJA500_MANUTENCAO,
  },
  {
    modelName: 'NINJA 650',
    yearFrom: 2012,
    yearTo: null,
    MACETES: NINJA650_MACETES,
    PROBLEMAS: NINJA650_PROBLEMAS,
    MANUTENCAO: NINJA650_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'NINJA 300',
    yearFrom: 2013, yearTo: 2017,
    tireSize: '110/70-17 (F) · 140/70-17 (R)',
    frontPsi: 28, rearPsi: 32,
    frontPsiLoad: 28, rearPsiLoad: 36,
    notes: 'Solo: F 28 / R 32 PSI. Com carona/bagagem: F 28 / R 36 PSI. Sempre medir a frio. Pneus recomendados: Pirelli Angel GT, Michelin Pilot Street Radial 110/70-17 (F) / 140/70-17 (R).',
  },
  {
    modelName: 'NINJA 400',
    yearFrom: 2018, yearTo: 2024,
    tireSize: '110/70-17 (F) · 150/60-17 (R)',
    frontPsi: 30, rearPsi: 33,
    frontPsiLoad: 30, rearPsiLoad: 36,
    notes: 'Solo: F 30 / R 33 PSI. Com carona/bagagem: F 30 / R 36 PSI. Valores de referência — variam ligeiramente entre fontes (28-33 PSI); confirme sempre na etiqueta do braço oscilante ou manual da sua unidade específica.',
  },
  {
    modelName: 'NINJA 500',
    yearFrom: 2024, yearTo: null,
    tireSize: '110/70-17 (F) · 150/60-17 (R)',
    frontPsi: 32, rearPsi: 36,
    frontPsiLoad: 32, rearPsiLoad: 40,
    notes: 'Solo: F 32 / R 36 PSI. Com carona/bagagem: F 32 / R 40 PSI. Modelo recente (2024+) — confirme na etiqueta oficial do braço oscilante, pois a Kawasaki pode ajustar especificação entre anos-modelo.',
  },
  {
    modelName: 'NINJA 650',
    yearFrom: 2012, yearTo: null,
    tireSize: '120/70-17 (F) · 160/60-17 (R)',
    frontPsi: 32, rearPsi: 36,
    frontPsiLoad: 34, rearPsiLoad: 42,
    notes: 'Solo: F 32 / R 36 PSI. Com carona/bagagem: F 34 / R 42 PSI. Confira sempre a etiqueta do braço oscilante — pode variar por ano/mercado. Pneus recomendados: Dunlop Sportmax Roadsport 2 (original de fábrica), Pirelli Angel GT, Michelin Pilot Road.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // NINJA 300
  { modelName: 'NINJA 300', yearFrom: 2013, yearTo: 2017, component: 'Óleo 10W-40 JASO MA2 (2,2L serviço / 2,4L 1º enchimento)', intervalKm: 6000, intervalMonths: 6, notes: 'Motor 296cc DOHC. Embreagem em banho de óleo — nunca usar óleo sem selo JASO MA2.', priority: 'HIGH', order: 1 },
  { modelName: 'NINJA 300', yearFrom: 2013, yearTo: 2017, component: 'Filtro de óleo', intervalKm: 6000, intervalMonths: 6, notes: 'Trocar junto com o óleo. Aplicar óleo no O-ring antes de montar.', priority: 'MEDIUM', order: 2 },
  { modelName: 'NINJA 300', yearFrom: 2013, yearTo: 2017, component: 'Vela NGK CR8E (gap 0,7–0,8mm)', intervalKm: 8000, intervalMonths: null, notes: 'Iridium NGK CR8EIX dura até 20.000 km — upgrade opcional.', priority: 'MEDIUM', order: 3 },
  { modelName: 'NINJA 300', yearFrom: 2013, yearTo: 2017, component: 'Lubrificação da corrente 520 × 106', intervalKm: 600, intervalMonths: null, notes: 'Pinhão 14T / coroa 42T. Folga 25–35mm no centro do trecho inferior.', priority: 'HIGH', order: 4 },
  { modelName: 'NINJA 300', yearFrom: 2013, yearTo: 2017, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Verificar/limpar a cada 6.000 km; trocar a cada 12.000 km.', priority: 'MEDIUM', order: 5 },
  { modelName: 'NINJA 300', yearFrom: 2013, yearTo: 2017, component: 'Folga de válvulas', intervalKm: 12000, intervalMonths: 12, notes: 'DOHC 8 válvulas. Motor frio obrigatório.', priority: 'HIGH', order: 6 },
  { modelName: 'NINJA 300', yearFrom: 2013, yearTo: 2017, component: 'Kit relação 520 (pinhão 14T + coroa 42T + corrente)', intervalKm: 20000, intervalMonths: null, notes: 'DID 520VX3 ou RK GB520KRO. Trocar kit completo, nunca só a corrente.', priority: 'HIGH', order: 7 },
  { modelName: 'NINJA 300', yearFrom: 2013, yearTo: 2017, component: 'Fluido de freio DOT 4', intervalKm: 18000, intervalMonths: 24, notes: 'Bienal obrigatório mesmo sem atingir o km da revisão.', priority: 'HIGH', order: 8 },
  { modelName: 'NINJA 300', yearFrom: 2013, yearTo: 2017, component: 'Nível de arrefecimento + mangueiras', intervalKm: null, intervalMonths: 3, notes: 'Motor pequeno é sensível a nível baixo. Verificar antes de rodovia.', priority: 'HIGH', order: 9 },
  { modelName: 'NINJA 300', yearFrom: 2013, yearTo: 2017, component: 'Folga da embreagem (cabo)', intervalKm: 3000, intervalMonths: null, notes: 'Embreagem a cabo, não hidráulica. Folga correta: 2–3mm na alavanca.', priority: 'MEDIUM', order: 10 },

  // NINJA 400
  { modelName: 'NINJA 400', yearFrom: 2018, yearTo: 2024, component: 'Óleo 10W-40 JASO MA (~2,3L)', intervalKm: 6000, intervalMonths: 6, notes: 'Motor 399cc DOHC superquadrado. Embreagem em banho de óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'NINJA 400', yearFrom: 2018, yearTo: 2024, component: 'Filtro de óleo', intervalKm: 6000, intervalMonths: 6, notes: 'Hiflofiltro ou K&N compatíveis. Trocar junto com o óleo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'NINJA 400', yearFrom: 2018, yearTo: 2024, component: 'Vela NGK LMAR9G-9 (gap 0,8mm)', intervalKm: 8000, intervalMonths: null, notes: 'Rosca curta — não confundir com CR8E/CR9E da Ninja 300. Iridium SILMAR9B9 (gap 0,9mm) como upgrade.', priority: 'MEDIUM', order: 3 },
  { modelName: 'NINJA 400', yearFrom: 2018, yearTo: 2024, component: 'Lubrificação da corrente 520 × 106', intervalKm: 600, intervalMonths: null, notes: 'Pinhão 14T / coroa 41T. Reduzir intervalo em uso com chuva.', priority: 'HIGH', order: 4 },
  { modelName: 'NINJA 400', yearFrom: 2018, yearTo: 2024, component: 'Revisão completa (válvulas, filtro de ar, corrente, freio)', intervalKm: 12000, intervalMonths: 12, notes: 'Inclui verificação do tensionador de corrente de comando (item de recall em lotes 2020).', priority: 'HIGH', order: 5 },
  { modelName: 'NINJA 400', yearFrom: 2018, yearTo: 2024, component: 'Fluido de freio DOT 4', intervalKm: 12000, intervalMonths: 24, notes: 'Bienal obrigatório mesmo sem atingir o km da revisão.', priority: 'HIGH', order: 6 },
  { modelName: 'NINJA 400', yearFrom: 2018, yearTo: 2024, component: 'Kit relação 520 (pinhão 14T + coroa 41T + corrente)', intervalKm: 24000, intervalMonths: null, notes: 'Marcas nacionais Durag, Vaz Xtreme, RK. Trocar kit completo.', priority: 'HIGH', order: 7 },
  { modelName: 'NINJA 400', yearFrom: 2018, yearTo: 2024, component: 'Tensionador de corrente de comando — verificação', intervalKm: null, intervalMonths: 12, notes: 'Item de recall em unidades fabricadas em outubro/2019 (modelo 2020). Verificar pelo chassi.', priority: 'CRITICAL', order: 8 },
  { modelName: 'NINJA 400', yearFrom: 2018, yearTo: 2024, component: 'Pastilhas de freio dianteiro/traseiro', intervalKm: 12000, intervalMonths: null, notes: 'Inspecionar a cada revisão completa. Espessura mínima 2mm.', priority: 'MEDIUM', order: 9 },
  { modelName: 'NINJA 400', yearFrom: 2018, yearTo: 2024, component: 'Bateria — verificação de tensão', intervalKm: null, intervalMonths: 6, notes: 'Tensão mínima 12,4V em repouso. Uso urbano de trajetos curtos descarrega mais rápido.', priority: 'MEDIUM', order: 10 },

  // NINJA 500
  { modelName: 'NINJA 500', yearFrom: 2024, yearTo: null, component: 'Óleo 10W-40 JASO MA2', intervalKm: 6000, intervalMonths: 6, notes: 'Motor 451cc DOHC. Capacidade exata: confirmar no manual/concessionária (aprox. 2,3–2,5L).', priority: 'HIGH', order: 1 },
  { modelName: 'NINJA 500', yearFrom: 2024, yearTo: null, component: 'Filtro de óleo', intervalKm: 6000, intervalMonths: 6, notes: 'Trocar junto com o óleo a cada revisão.', priority: 'MEDIUM', order: 2 },
  { modelName: 'NINJA 500', yearFrom: 2024, yearTo: null, component: 'Vela de ignição (verificação)', intervalKm: 8000, intervalMonths: null, notes: 'Modelo recente — confirmar código exato de vela com a concessionária.', priority: 'MEDIUM', order: 3 },
  { modelName: 'NINJA 500', yearFrom: 2024, yearTo: null, component: 'Lubrificação externa da corrente selada (O-ring)', intervalKm: 600, intervalMonths: null, notes: 'Corrente selada de fábrica — lubrificar externamente preserva os O-rings.', priority: 'HIGH', order: 4 },
  { modelName: 'NINJA 500', yearFrom: 2024, yearTo: null, component: 'Revisão completa (válvulas, filtro de ar, corrente, freio)', intervalKm: 12000, intervalMonths: 12, notes: 'Seguir cronograma do manual do proprietário específico do ano/versão.', priority: 'HIGH', order: 5 },
  { modelName: 'NINJA 500', yearFrom: 2024, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 12000, intervalMonths: 24, notes: 'Bienal obrigatório mesmo sem atingir o km da revisão.', priority: 'HIGH', order: 6 },
  { modelName: 'NINJA 500', yearFrom: 2024, yearTo: null, component: 'Kit relação — avaliação de desgaste', intervalKm: 24000, intervalMonths: null, notes: 'Modelo recente, ainda sem histórico extenso de durabilidade no Brasil.', priority: 'MEDIUM', order: 7 },
  { modelName: 'NINJA 500', yearFrom: 2024, yearTo: null, component: 'Embreagem — verificação de patinação', intervalKm: null, intervalMonths: 6, notes: 'Sintoma de alerta: rotação sobe sem ganho de velocidade sob aceleração forte.', priority: 'MEDIUM', order: 8 },
  { modelName: 'NINJA 500', yearFrom: 2024, yearTo: null, component: 'Sistema de arrefecimento — nível e vazamentos', intervalKm: null, intervalMonths: 3, notes: 'Verificar cheiro de coolant e poças próximas ao motor.', priority: 'HIGH', order: 9 },

  // NINJA 650
  { modelName: 'NINJA 650', yearFrom: 2012, yearTo: null, component: 'Óleo 10W-40 JASO MA (~1,8–1,9L serviço)', intervalKm: 6000, intervalMonths: 6, notes: 'Motor 649cc DOHC. 1º enchimento 2,3–2,4L. Confirmar capacidade exata no manual da sua unidade.', priority: 'HIGH', order: 1 },
  { modelName: 'NINJA 650', yearFrom: 2012, yearTo: null, component: 'Filtro de óleo', intervalKm: 6000, intervalMonths: 6, notes: 'Trocar junto com o óleo a cada revisão.', priority: 'MEDIUM', order: 2 },
  { modelName: 'NINJA 650', yearFrom: 2012, yearTo: null, component: 'Vela NGK CR9EIA-9 (iridium)', intervalKm: 18000, intervalMonths: null, notes: 'Iridium original de fábrica — durabilidade 20.000–25.000 km.', priority: 'MEDIUM', order: 3 },
  { modelName: 'NINJA 650', yearFrom: 2012, yearTo: null, component: 'Lubrificação da corrente 520 (O-ring)', intervalKm: 600, intervalMonths: null, notes: 'Folga 25–35mm no centro do trecho inferior.', priority: 'HIGH', order: 4 },
  { modelName: 'NINJA 650', yearFrom: 2012, yearTo: null, component: 'Revisão completa (válvulas, filtro de ar, corrente, freio)', intervalKm: 12000, intervalMonths: 12, notes: 'Checagem geral incluindo aperto de motor no chassi.', priority: 'HIGH', order: 5 },
  { modelName: 'NINJA 650', yearFrom: 2012, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 18000, intervalMonths: 24, notes: 'Bienal obrigatório mesmo sem atingir o km da revisão.', priority: 'HIGH', order: 6 },
  { modelName: 'NINJA 650', yearFrom: 2012, yearTo: null, component: 'Kit relação 520 (DID 520VX3 ou RK GB520KRO)', intervalKm: 22000, intervalMonths: null, notes: 'Trocar kit completo (pinhão + coroa + corrente).', priority: 'HIGH', order: 7 },
  { modelName: 'NINJA 650', yearFrom: 2012, yearTo: null, component: 'Pastilhas de freio', intervalKm: 15000, intervalMonths: null, notes: 'EBC FA379 ou Vesrah compatível. Espessura mínima 2mm.', priority: 'MEDIUM', order: 8 },
  { modelName: 'NINJA 650', yearFrom: 2012, yearTo: null, component: 'Balanceamento de rodas / aperto do motor no chassi', intervalKm: 12000, intervalMonths: null, notes: 'Vibração acima de 100 km/h geralmente é desbalanceamento ou parafusos soltos.', priority: 'LOW', order: 9 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Kawasaki Ninja de entrada (300 / 400 / 500 / 650)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'KAWASAKI', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'KAWASAKI', vehicleTypeId: motoType.id },
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

  console.log('✅ Kawasaki Ninja de entrada concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
