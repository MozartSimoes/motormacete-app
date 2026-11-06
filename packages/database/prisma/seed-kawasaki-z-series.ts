// seed-kawasaki-z-series.ts — Kawasaki linha Z (naked): Z300, Z400, Z500, Z650, Z650RS, Z900, Z900RS, Z1000, Z H2
// Um dos 6 arquivos de seed da marca Kawasaki — usa upsert no Brand para evitar duplicidade.
// Execute: pnpm --filter @motormacete/database db:seed:kawasaki-z-series
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

// ─── Z 300 ─────────────────────────────────────────────────────────────────────
// Motor: 296cc paralelo-twin DOHC 8V arrefecido a líquido | 39 cv @ 11.000 rpm | torque 2,75 kgf.m @ 10.500 rpm
// Injeção eletrônica | Óleo 10W-40 JASO MA2 ~2,3–2,5L | Vela NGK CR9E gap 0,7–0,8mm
// Pneu: 110/70-17 (F) / 140/70-17 (R) | Corrente 520 | Tanque 17L | Descontinuada no Brasil em 2018

const Z300_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 296cc é a base do Ninja 300 — peças e conhecimento técnico são fáceis de achar',
    body: 'A Z300 nada mais é que a Ninja 300 sem carenagem esportiva, com guidão mais alto e posição naked. Isso significa que qualquer peça de motor, elétrica ou de suspensão do Ninja 300 serve na Z300 — o que amplia bastante a disponibilidade de peças no Brasil mesmo com a Z300 fora de linha desde 2018. Procure por "Ninja 300" nas lojas de peças que a compatibilidade é garantida.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA2 — cerca de 2,3L na troca com filtro; intervalo 6.000 km',
    body: 'Motor DOHC paralelo-twin com embreagem em banho de óleo — use sempre JASO MA2 (nunca óleo automotivo puro API SN sem selo JASO). Capacidade aproximada: 2,3L com troca de filtro. Marcas recomendadas: Motul 5100 10W-40, Lubrax Moto 4T 10W-40, Shell Advance 4T. Intervalo Kawasaki: 6.000 km ou 6 meses. Filtro de óleo compatível Hiflofiltro HF303 ou original Kawasaki.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR9E gap 0,7–0,8mm — troque a cada 8.000 km',
    body: 'A Z300 usa vela NGK CR9E (equivalente Denso U27ESR-N). Gap correto: 0,7–0,8mm. Sintomas de vela gasta: partida a frio difícil, engasgo em baixa rotação, consumo elevado. Opção iridium NGK CR9EIX dura até 20.000 km e melhora levemente a resposta em baixa rotação — vale o upgrade de R$ 40–60 por unidade.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 — lubrifique a cada 500–800 km; kit relação dura 20.000+ km',
    body: 'Corrente 520 de qualidade razoável de fábrica. Lubrificação regular (spray de corrente a cada 500–800 km ou após pegar chuva) estende bastante a vida útil. Folga correta: 25–35mm no centro do trecho inferior, moto no cavalete central. Kit relação (pinhão 15T + coroa 42T + corrente 520×108): DID 520VX3 ou RK GB520KRO, R$ 350–550.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem: regule o cabo com frequência — folga errada esquenta o motor',
    body: 'A embreagem a cabo da Z300 (não hidráulica) pode desregular com o uso, e uma embreagem "arrastando" (patinando por folga insuficiente) aumenta a temperatura do motor e acelera o desgaste dos discos. Verifique a folga na alavanca a cada 3.000 km — o correto é 2–3mm de folga antes de sentir resistência. Kit de discos de embreagem (quando necessário trocar): R$ 150–300, disponível para Ninja 300/Z300.',
  },
  {
    severity: 'OK',
    title: 'Radiador e nível de arrefecimento: confira antes de cada viagem longa',
    body: 'Diferente das Z maiores, a Z300 é arrefecida a líquido (não a ar). Verifique o nível do reservatório de expansão mensalmente e antes de viagens — nível baixo é a causa mais comum de superaquecimento nesse motor pequeno. Use apenas coolant específico para moto (etilenoglicol com anticorrosivo, tipo Kawasaki Coolant ou similar automotivo de longa vida compatível com alumínio). Nunca complete só com água.',
  },
  {
    severity: 'OK',
    title: 'Uso urbano: motor pequeno gosta de giro — não force em marcha alta a baixa RPM',
    body: 'O motor 296cc entrega a maior parte do torque acima de 7.000 rpm. Rodar em marcha alta com RPM baixo (abaixo de 3.500) para "economizar" força a embreagem e o motor, além de aumentar vibração. Use as marchas baixas no trânsito urbano — a Z300 foi pensada para girar. Consumo médio real fica em torno de 22–26 km/l no trânsito misto.',
  },
]

const Z300_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall histórico da ECU (Ninja 300/Z300 2013): desligamento do motor em reduções de marcha',
    body: 'Modelos de primeira geração (2013) tiveram recall por programação incorreta da ECU: ao reduzir marcha com a embreagem acionada em certas condições, o sistema de alimentação de combustível podia cortar e desligar o motor. Se sua Z300 é desse lote e nunca passou pelo recall, procure uma concessionária Kawasaki para verificar/atualizar a ECU gratuitamente — é item de segurança.',
  },
  {
    severity: 'WARN',
    title: 'Interferência de suportes no sistema de freios (recall documentado)',
    body: 'Foi identificado em alguns lotes que um suporte do sistema ABS podia interferir no freio dianteiro, e um suporte no braço oscilante podia interferir no freio traseiro, reduzindo a eficiência de frenagem. Verifique se sua unidade já passou por essa campanha de recall — consulte o histórico pelo chassi no site da Kawasaki do Brasil.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento por nível de arrefecimento ou óleo baixo',
    body: 'O motor pequeno arrefecido a líquido da Z300 é mais sensível a baixo nível de coolant ou óleo do que os motores maiores da linha Z. Transbordamento do reservatório de expansão é sinal de aquecimento excessivo — geralmente causado por falta de líquido de arrefecimento ou óleo do motor abaixo do mínimo. Verifique os dois níveis regularmente, principalmente antes de rodovia.',
  },
  {
    severity: 'WARN',
    title: 'Acúmulo de sujeira entre pedal e protetor do freio traseiro',
    body: 'Existe um espaço entre o pedal do freio traseiro e seu protetor onde sujeira e barro se acumulam, favorecendo superaquecimento do conjunto e, em casos extremos, travamento ou falha parcial do freio. Limpe essa região periodicamente, principalmente se rodar em estradas de terra ou período de chuva.',
  },
  {
    severity: 'WARN',
    title: 'Escassez de peças específicas da Z300 no Brasil — descontinuada desde 2018',
    body: 'A Z300 saiu de linha no Brasil em 2018, substituída pela Z400. Peças 100% exclusivas da versão naked (como o farol e partes do painel) podem ser mais difíceis de achar que as do Ninja 300, que continuou vendendo por mais tempo em outros mercados. Para mecânica, elétrica e suspensão, use sempre peças rotuladas "Ninja 300 / Z300 2013-2018" — a compatibilidade é quase total.',
  },
]

const Z300_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Z300: motor pequeno arrefecido a líquido pede atenção a fluidos',
    body: '1.000 km — Troca de óleo inicial (rodagem). | 6.000 km — Troca de óleo + filtro (10W-40 JASO MA2, ~2,3L). Verificar corrente. | 8.000 km — Verificar/trocar vela NGK CR9E. Verificar folga da embreagem. | 12.000 km — Filtro de ar. Folga de válvulas (motor frio). | 18.000 km — Fluido de freio DOT 4. Nível de arrefecimento + mangueiras. | 20.000 km — Kit relação (pinhão 15T + coroa 42T + corrente 520). Pastilhas de freio. | 24.000 km — Vela nova + revisão geral de válvulas.',
  },
]

// ─── Z 400 ─────────────────────────────────────────────────────────────────────
// Motor: 399cc paralelo-twin DOHC 8V arrefecido a líquido | 45–48 cv @ 10.000 rpm | torque 3,9 kgf.m @ 8.000 rpm
// Injeção eletrônica | Óleo 10W-40 API SL JASO MA ~2,3L | Vela NGK
// Pneu: 110/70-17 (F) / 150/60-17 (R) | Tanque 14L | Descontinuada, substituída pela Z500

const Z400_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Base mecânica compartilhada com Ninja 400 — mesma facilidade de peças',
    body: 'A Z400 é a versão naked do motor 399cc também usado na Ninja 400. Peças de motor, elétrica, embreagem e suspensão são intercambiáveis entre os dois modelos — ao procurar peças, busque também por "Ninja 400" para ampliar as opções e comparar preço.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 API SL JASO MA — 2,3L; troca a cada 6.000 km',
    body: 'Capacidade de óleo: 2,3 litros (com troca de filtro). Use sempre 10W-40 com selo JASO MA — a embreagem é em banho de óleo e óleo sem esse selo pode causar patinação. Marcas recomendadas: Motul 5100 10W-40, Lubrax Moto 4T. Kit troca de óleo com filtro (óleo + filtro Hiflofiltro ou K&N) é vendido pronto por cerca de R$ 140–200 em lojas especializadas.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK (linha G-Power ou Iridium IX) — inspecione a cada 6.000 km',
    body: 'A Z400 aceita velas NGK das linhas convencional (G-Power) e Iridium IX, ambas vendidas facilmente no Brasil para esse modelo. A troca da vela iridium chega a durar 20.000 km e melhora a resposta em marcha lenta. Sinal de vela gasta: partida mais demorada a frio e leve trepidação em baixa rotação.',
  },
  {
    severity: 'OK',
    title: 'Corrente e relação: revisão completa a cada 12.000 km inclui corrente e filtro de ar',
    body: 'O cronograma oficial da Z400 prevê revisões de óleo a cada 6.000 km, e revisões mais completas a cada 12.000 km — que incluem checagem de válvulas, corrente, filtro de ar e fluido de freio. Lubrifique a corrente a cada 500–700 km de uso normal; em uso com chuva frequente, reduza esse intervalo.',
  },
  {
    severity: 'OK',
    title: 'Superquadrado (70mm × 51,8mm): motor gosta de giro alto, entrega pico de torque a 8.000 rpm',
    body: 'O motor da Z400 é "superquadrado" (diâmetro do pistão maior que o curso), característica de motores que giram bem em alta rotação. O torque máximo (3,9 kgf.m) só chega a 8.000 rpm — então não force o motor em marcha alta a rotação baixa. No trânsito, use as marchas intermediárias para manter o motor na faixa de torque útil.',
  },
  {
    severity: 'OK',
    title: 'Calibragem correta é essencial para o handling naked leve da Z400',
    body: 'Pneu dianteiro 110/70-17 e traseiro 150/60-17: pressões corretas ajudam bastante no comportamento ágil típico da Z400. Solo: 33 PSI (F) / 36 PSI (R). Com garupa: 33 PSI (F) / 42 PSI (R). Confira sempre a frio — a etiqueta original também fica no braço oscilante ou no manual do proprietário.',
  },
]

const Z400_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Sensibilidade a óleo fora de especificação: embreagem pode patinar',
    body: 'Assim como toda a linha Kawasaki com embreagem em banho de óleo, usar óleo sem selo JASO MA (comum em óleos "genéricos" de baixa qualidade vendidos como 10W-40 automotivo) pode causar patinação da embreagem, especialmente sob carga em subidas ou ultrapassagens. Compre sempre óleo específico para moto com selo JASO MA visível na embalagem.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão traseira firme de fábrica — ajuste a pré-carga para o peso do piloto',
    body: 'A suspensão traseira da Z400 vem regulada de fábrica para um peso médio e pode ficar dura ou macia demais dependendo do piloto. Ajuste a pré-carga da mola traseira (anel regulável) conforme seu peso — isso melhora bastante o conforto sem custo adicional. Muitos donos reportam melhora perceptível apenas ajustando esse item, sem trocar a suspensão.',
  },
  {
    severity: 'WARN',
    title: 'Descontinuada no Brasil: peças de reposição migrando para a linha Z500',
    body: 'A Z400 foi substituída pela Z500 na linha Kawasaki. Peças específicas de carroceria (tanque, painel, rabeta) podem ficar mais escassas com o tempo — priorize concessionárias com estoque remanescente ou peças compatíveis com a Ninja 400, que teve produção mais longa em outros mercados.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de combustível varia bastante com o estilo de pilotagem',
    body: 'Por ser um motor pequeno e ágil, a tentação de manter giro alto reduz sensivelmente a autonomia — de uma média de 25 km/l em uso tranquilo para menos de 18 km/l em uso esportivo. Com tanque de 14L, isso significa autonomia de 250 a 350 km dependendo do estilo de condução. Planeje paradas de combustível considerando esse perfil de consumo variável.',
  },
  {
    severity: 'WARN',
    title: 'Bateria pequena: mantenha carregada, especialmente com uso urbano de paradas curtas',
    body: 'A bateria da Z400 é dimensionada para o motor pequeno e pode descarregar mais rápido que o esperado em uso de trajetos curtos e frequentes (não dá tempo do alternador recarregar totalmente). Se notar partida mais lenta, verifique a tensão em repouso — abaixo de 12,4V já indica necessidade de carga ou substituição.',
  },
]

const Z400_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma oficial Z400: óleo a cada 6.000 km, revisão completa a cada 12.000 km',
    body: '1.000 km — Revisão de rodagem + troca de óleo inicial. | 6.000 km — Troca de óleo + filtro (10W-40 JASO MA, 2,3L). | 12.000 km — Revisão completa: válvulas, corrente, filtro de ar, fluido de freio. | 18.000 km — Troca de óleo + filtro. Verificar vela. | 24.000 km — Revisão completa novamente + kit relação se desgastado. | A cada 500–700 km — Lubrificação da corrente.',
  },
]

// ─── Z 500 (inclui Z 500 SE) ────────────────────────────────────────────────────
// Motor: 451cc paralelo-twin DOHC 8V arrefecido a líquido | 45,4 cv @ 9.000 rpm | torque 42,6 Nm @ 6.000 rpm
// Compressão 11,3:1 | Diâmetro×curso 70×58,8mm | Embreagem multidisco banho de óleo com antirrebote
// Pneu: 110/70-17 (F) / 150/60-17 (R) aprox. | Peso 172kg | Altura assento 785mm | Lançada em 2024 (sucessora da Z400)

const Z500_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 451cc é evolução do 399cc da Z400 — mesmo DNA, mais cilindrada e torque',
    body: 'A Z500 (lançada em 2024) substitui a Z400 na linha Kawasaki, com motor aumentado de 399cc para 451cc — ganho real de torque (42,6 Nm) sem perder a leveza da categoria de entrada. Peso em ordem de marcha de 172kg. Para peças de motor ainda recentes, priorize concessionária oficial — o mercado de compatíveis genéricos ainda está se formando por ser modelo novo.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA2 — siga o manual; capacidade próxima de 2,5L (confirme na concessionária)',
    body: 'Kawasaki não divulgou publicamente a capacidade exata de óleo da Z500 em todas as fontes consultadas — modelos da família de motor semelhante (Z400/Ninja 400) usam 2,3L. Use sempre 10W-40 com selo JASO MA2, marcas Motul 5100, Lubrax Moto 4T ou equivalente. Confirme a capacidade exata no manual do proprietário ou com a concessionária antes da primeira troca, pois pode variar da geração anterior.',
  },
  {
    severity: 'OK',
    title: 'Embreagem com sistema antirrebote (assist & slipper) — reduz esforço na alavanca',
    body: 'A Z500 vem com embreagem multidisco em banho de óleo com sistema antirrebote, que facilita reduções de marcha bruscas (evita "travamento" da roda traseira) e deixa o acionamento mais leve no trânsito. É um upgrade de conforto e segurança em relação à Z400. Mantenha o óleo sempre no nível e com JASO MA2 para o sistema funcionar como projetado.',
  },
  {
    severity: 'OK',
    title: 'Consumo de combustível classe A: espere entre 22–28 km/l em uso misto',
    body: 'Com motor eficiente e injeção eletrônica moderna, a Z500 entrega consumo econômico para a categoria — em torno de 22 a 28 km/l dependendo do estilo de pilotagem. É uma moto pensada tanto para iniciantes quanto para quem quer economia no dia a dia urbano.',
  },
  {
    severity: 'OK',
    title: 'Versão SE: suspensão e frenagem com upgrades — vale considerar se for rodar mais',
    body: 'A variante Z500 SE (também cadastrada sob "Z 500" pelo casamento de substring do site) traz upgrades como suspensão ajustável ou acabamentos superiores dependendo do mercado/ano. Confirme com a concessionária quais diferenças específicas se aplicam à sua unidade antes de comprar peças de suspensão, pois podem não ser intercambiáveis com a versão básica.',
  },
  {
    severity: 'OK',
    title: 'Corrente: lubrifique a cada 500–700 km — modelo novo ainda não tem histórico extenso no Brasil',
    body: 'Por ser lançamento recente (2024), a Z500 ainda não acumulou histórico extenso de durabilidade de peças no mercado brasileiro. Siga o cronograma conservador: lubrificação de corrente a cada 500–700 km, revisões conforme manual do proprietário. Fique atento a comunicados de recall da Kawasaki do Brasil, comuns nos primeiros anos de um modelo novo.',
  },
]

const Z500_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Modelo recente: poucos dados de longo prazo — acompanhe recalls da Kawasaki Brasil',
    body: 'Por ser lançada em 2024, a Z500 ainda não tem histórico consolidado de problemas recorrentes como os modelos mais antigos da linha Z. Acompanhe o site oficial de recalls da Kawasaki do Brasil (kawasakibrasil.com.br/service/recalls) periodicamente pelo chassi da sua moto.',
  },
  {
    severity: 'WARN',
    title: 'Peças de reposição ainda concentradas em concessionária — mercado de compatíveis em formação',
    body: 'Diferente da Z400/Ninja 400 (que já tem anos de mercado paralelo de peças), a Z500 ainda depende mais de concessionária oficial para componentes de carroceria e alguns itens de motor. Isso deve mudar com o tempo, mas por ora planeje esse custo um pouco mais alto que em modelos mais antigos.',
  },
  {
    severity: 'WARN',
    title: 'Assento baixo (785mm) é ótimo para iniciantes, mas pode incomodar pilotos altos',
    body: 'A altura de assento de 785mm é um dos pontos fortes da Z500 para quem está começando a pilotar, mas pilotos acima de 1,85m podem sentir a posição um pouco compacta em viagens longas. Bancos "conforto" ou "confort" opcionais são vendidos por concessionárias Kawasaki para melhorar o ergonomia em uso de longa distância.',
  },
  {
    severity: 'WARN',
    title: 'Verifique torque de parafusos do carenamento/painel após as primeiras centenas de km',
    body: 'Como em praticamente toda moto nova, vibrações da rodagem inicial podem afrouxar parafusos de acabamento (protetor de motor, rabeta, painel). Inclua uma checagem visual de aperto geral na primeira revisão dos 1.000 km, além dos itens mecânicos do cronograma oficial.',
  },
  {
    severity: 'WARN',
    title: 'Torque baixo em rotações baixas comparado a motos de cilindrada maior da própria linha Z',
    body: 'Apesar do ganho de cilindrada sobre a Z400, a Z500 ainda é uma moto de entrada — o torque de 42,6 Nm só é liberado por completo a 6.000 rpm. Em ultrapassagens ou subidas com garupa, é necessário reduzir marcha com mais frequência que em uma Z650 ou Z900. Não é defeito, é característica de categoria — mas frustra quem espera desempenho de moto maior.',
  },
]

const Z500_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Z500: siga o manual do proprietário — modelo novo com poucos ajustes de campo conhecidos',
    body: '1.000 km — Revisão de rodagem, troca de óleo inicial, checagem geral de aperto. | 6.000 km — Troca de óleo + filtro (10W-40 JASO MA2). | 12.000 km — Revisão completa: válvulas, corrente, filtro de ar, fluido de freio. | 18.000 km — Óleo + filtro. | 24.000 km — Revisão completa + avaliar kit relação. | A cada 500–700 km — Lubrificação de corrente. Sempre confirme os intervalos exatos no manual impresso ou digital específico do ano/versão da sua unidade, pois a Kawasaki pode ajustar cronogramas entre anos-modelo.',
  },
]

// ─── Z 650 ─────────────────────────────────────────────────────────────────────
// Motor: 649cc paralelo-twin DOHC 8V arrefecido a líquido | 68 cv @ 8.000 rpm | torque 6,5–6,7 kgf.m @ 6.700 rpm
// Injeção eletrônica | Óleo 10W-40 JASO MA ~1,8L com filtro | Vela NGK CR9EIA-9 (iridium original)
// Pneu: 120/70-17 (F) / 160/60-17 (R) | Pressão 32/36 PSI | Corrente 520 | Tanque 15L

const Z650_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA — cerca de 1,8L com troca de filtro; intervalo 6.000 km',
    body: 'O motor 649cc DOHC da Z650 tem capacidade de óleo relativamente baixa para a cilindrada: aproximadamente 1,8 litro com troca de filtro (confirme no manual da sua unidade, pois pode variar 0,1–0,2L conforme ano). Use sempre 10W-40 ou 10W-30 semissintético com selo JASO MA — Motul 5100, Lubrax Moto 4T, Shell Advance 4T são bem aceitos. Intervalo oficial: 6.000 km ou 6 meses.',
  },
  {
    severity: 'OK',
    title: 'Vela original NGK CR9EIA-9 (iridium) — já vem de fábrica com item premium',
    body: 'A Z650 (2017-2024) usa vela NGK CR9EIA-9, que já é iridium original de fábrica — diferencial em relação a modelos mais baratos que usam vela convencional. Isso significa maior durabilidade (até 20.000-25.000 km) e não há necessidade de "upgrade" de vela como em outras motos. Ao trocar, mantenha o mesmo código para preservar a resposta de ignição original.',
  },
  {
    severity: 'OK',
    title: 'Pressão dos pneus: 32 PSI dianteiro / 36 PSI traseiro (solo, a frio)',
    body: 'Pneu 120/70-17 (F) e 160/60-17 (R). Pressões recomendadas pela Kawasaki: 32 PSI dianteiro e 36 PSI traseiro, sempre medidas a frio (moto parada há mais de 3 horas ou rodada menos de 1,6 km). Com garupa/bagagem, aumente a pressão traseira em cerca de 3-4 PSI. Confira semanalmente — pneu murcho prejudica bastante o handling ágil característico da Z650.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 — kit relação de qualidade dura 20.000-25.000 km bem mantido',
    body: 'A Z650 usa corrente 520. Lubrifique a cada 500-700 km (mais frequente com chuva). Folga correta: 25-35mm no centro do trecho inferior. Marcas recomendadas para kit relação completo: DID 520VX3 (com O-ring), RK GB520KRO — ambas disponíveis no Brasil, R$ 400-650 o kit completo (pinhão+coroa+corrente).',
  },
  {
    severity: 'OK',
    title: 'Freio traseiro: pinça e disco simples exigem atenção a ruídos e vibração',
    body: 'Owners reportam ocasionalmente ruídos estranhos ou sensação de freio "mole" — geralmente ligado a pastilhas gastas ou ar no sistema hidráulico, não defeito de projeto. Purgue o fluido de freio a cada 24 meses (DOT 4) e troque pastilhas quando o material de atrito ficar abaixo de 2mm. Marcas compatíveis: EBC FA379, Vesrah.',
  },
  {
    severity: 'WARN',
    title: 'Pilotos altos (acima de 1,85m) podem sentir a posição apertada — ajuste alavancas e considere banco alternativo',
    body: 'Um ponto recorrente entre donos: pilotos mais altos relatam desconforto no ângulo dos joelhos e posição de pilotagem "curta". Não é defeito mecânico, mas vale ajustar a posição das alavancas de freio/embreagem e considerar bancos com perfil diferente (banco confort de terceiros) se for rodar distâncias longas com frequência.',
  },
]

const Z650_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Marcha instável ou motor "engasgando" — geralmente filtro de ar sujo ou vela gasta',
    body: 'Alguns proprietários relatam marcha lenta instável ou engasgos leves. Na maioria dos casos documentados, a causa é filtro de ar sujo ou vela desgastada, não falha eletrônica. Antes de levar para diagnóstico caro, faça a checagem básica: filtro de ar (limpar/trocar) e vela NGK CR9EIA-9 (verificar gap e desgaste). Combustível de má qualidade também é causa comum no Brasil.',
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
    title: 'Acabamento: corrosão e descascamento de pintura em partes expostas com o tempo',
    body: 'Como em muitas motos de uso urbano no Brasil (exposição a sol, chuva e maresia em regiões litorâneas), há relatos de descascamento de pintura e início de corrosão em partes metálicas expostas (parafusos, suporte de escapamento) após 2-3 anos. Lave a moto regularmente, aplique cera/protetor em peças metálicas visíveis e evite deixá-la exposta ao sol/chuva por longos períodos sem cobertura.',
  },
]

const Z650_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Z650: revisões a cada 6.000 km, checagens maiores em intervalos de 12.000 km',
    body: '1.000 km — Revisão de rodagem + troca de óleo inicial. | 6.000 km — Troca de óleo + filtro (10W-40 JASO MA, ~1,8L). Lubrificar corrente. | 12.000 km — Revisão completa: filtro de ar, folga de válvulas, fluido de freio, corrente/relação. | 18.000 km — Óleo + filtro + vela (verificar desgaste da CR9EIA-9). | 24.000 km — Revisão completa novamente. Avaliar kit relação (520). | 24 meses — Fluido de freio DOT 4 (mesmo sem atingir o km da revisão).',
  },
]

// ─── Z 650 RS ────────────────────────────────────────────────────────────────────
// Mesma base mecânica da Z650 (649cc, 68cv), mas com estilo retrô: tanque clássico, banco duplo, instrumentos analógicos
// Altura de assento: 820mm | Tanque: 12L | Peso maior que a Z650 naked pela carenagem/acabamento retrô
// Pneu: 120/70-17 (F) / 160/60-17 (R)

const Z650RS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mecânica idêntica à Z650 — todo o cuidado de motor, óleo e corrente é o mesmo',
    body: 'A Z650RS compartilha 100% do motor 649cc DOHC (68 cv) com a Z650 naked moderna. Óleo 10W-40 JASO MA (~1,8L com filtro), vela NGK CR9EIA-9, corrente 520, intervalo de troca de óleo a cada 6.000 km — tudo igual à Z650. A diferença está só na carroceria, geometria de guidão/banco e eletrônica de painel.',
  },
  {
    severity: 'OK',
    title: 'Instrumentos analógicos duplos: cuide da bateria para o ponteiro não "tremer"',
    body: 'O painel retrô da Z650RS usa dois mostradores analógicos (velocímetro e conta-giros) com um pequeno display digital central. Ponteiros que oscilam de forma errática geralmente indicam tensão baixa da bateria, não defeito do instrumento. Mantenha a bateria com tensão acima de 12,4V em repouso — problema elétrico raso costuma resolver isso.',
  },
  {
    severity: 'OK',
    title: 'Banco duplo estilo clássico: altura de assento maior (820mm) que a Z650 (790mm)',
    body: 'A Z650RS tem assento a 820mm do chão — cerca de 30mm mais alto que a Z650 naked por causa do desenho retrô do banco. Pilotos de estatura menor podem notar mais dificuldade para apoiar os dois pés no chão. Teste sentado antes de comprar, ou considere rebaixamento de suspensão (opcional pós-venda) se for um problema.',
  },
  {
    severity: 'OK',
    title: 'Tanque de 12L (vs 15L da Z650): planeje paradas de combustível mais frequentes',
    body: 'O tanque em formato "gota" clássico da Z650RS tem 12 litros, menor que os 15L da Z650 naked moderna, por causa do formato mais estreito na base para acomodar o design retrô. Com consumo médio de 20-24 km/l, a autonomia fica em torno de 240-280 km — considere isso em viagens mais longas.',
  },
  {
    severity: 'OK',
    title: 'Pneus e rodas raiadas (spoked-look): mesma calibragem da Z650 — 32/36 PSI solo',
    body: 'Apesar do visual retrô, a Z650RS mantém pneus modernos tubeless 120/70-17 (F) / 160/60-17 (R) — não são pneus com câmara como em motos clássicas reais. Calibragem recomendada: 32 PSI dianteiro / 36 PSI traseiro a frio, mesmos valores da Z650 naked.',
  },
  {
    severity: 'OK',
    title: 'Peso levemente maior que a Z650: perceba a diferença em manobras de baixa velocidade',
    body: 'O acabamento retrô (tanque metálico, guidão mais largo, banco acolchoado extra) deixa a Z650RS alguns quilos mais pesada que a Z650 naked equivalente. A diferença é sutil em andamento, mas pode ser notada em manobras de estacionamento ou baixa velocidade — pratique o equilíbrio com a moto parada antes de rodar em trânsito denso.',
  },
]

const Z650RS_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Problemas mecânicos compartilhados com a Z650: filtro de ar, vela e purga de freio',
    body: 'Por usar o mesmo motor e sistema de freios da Z650, a Z650RS herda os mesmos pontos de atenção: marcha lenta instável associada a filtro de ar sujo ou vela gasta, e sensação de freio "mole" resolvida com purga correta do fluido DOT 4. Consulte também os problemas listados no bloco "Z 650" para esses itens compartilhados.',
  },
  {
    severity: 'WARN',
    title: 'Guidão largo tipo "flat" pode dificultar manobras em espaços apertados',
    body: 'O guidão de estilo retrô da Z650RS é mais largo que o da Z650 naked, o que melhora o conforto em viagens mas pode dificultar passar entre carros no trânsito ou manobrar em garagens estreitas. Considere isso ao estacionar em vagas apertadas — o espelho pode encostar em obstáculos que a Z650 naked passaria sem problema.',
  },
  {
    severity: 'WARN',
    title: 'Peso extra na dianteira em baixa velocidade pode surpreender quem troca de outra naked',
    body: 'Quem migra de uma naked mais leve para a Z650RS relata sensação de mais peso na dianteira em manobras lentas (giros em U, manobras de estacionamento), mesmo a diferença sendo de poucos quilos. É uma questão de adaptação de pilotagem, não defeito — geralmente se acostuma em poucas semanas de uso.',
  },
  {
    severity: 'WARN',
    title: 'Acabamento cromado e pintura bicolor exigem cuidado extra de limpeza',
    body: 'As partes cromadas (escapamento, alguns detalhes do painel) e a pintura bicolor característica do visual retrô mostram manchas e oxidação mais visivelmente que o acabamento fosco/preto comum em nakeds modernas. Lave e encere as partes cromadas regularmente para preservar a aparência clássica que é o principal atrativo do modelo.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão de configuração relativamente firme para uso "cruiser style" ocasional',
    body: 'Apesar do visual clássico remeter a motos de passeio tranquilo, a suspensão da Z650RS mantém calibração relativamente esportiva herdada da Z650. Em pavimento ruim ou uso como "cruiser" urbano relaxado, alguns donos consideram o ajuste um pouco firme — pré-carga ajustável na traseira permite suavizar para o peso e estilo de uso do piloto.',
  },
]

const Z650RS_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Z650RS: idêntico ao da Z650 (mesma mecânica)',
    body: '1.000 km — Revisão de rodagem + troca de óleo inicial. | 6.000 km — Troca de óleo + filtro (10W-40 JASO MA, ~1,8L). Lubrificar corrente. | 12.000 km — Revisão completa: filtro de ar, folga de válvulas, fluido de freio, corrente/relação. | 18.000 km — Óleo + filtro + verificar vela CR9EIA-9. | 24.000 km — Revisão completa + avaliar kit relação 520. | 24 meses — Fluido de freio DOT 4. Atenção extra: cuide do acabamento cromado e da bateria para os instrumentos analógicos não oscilarem.',
  },
]

// ─── Z 900 ─────────────────────────────────────────────────────────────────────
// Motor: 948cc 4 cilindros em linha DOHC 16V arrefecido a líquido | ~125 cv @ 9.500 rpm | torque ~97 Nm (9,9 kgf.m) @ 7.700 rpm
// Compressão 11,8:1 | Injeção eletrônica | Óleo 10W-40 (10W-50 em clima quente) JASO MA2 ~4,0L | Vela NGK CR9EIA-9 (iridium, ×4)
// Pneu: 120/70-17 (F) / 180/55-17 (R) | Pressão ~36/42 PSI (2,5/2,9 bar) solo | Corrente 525 | Tanque 17L

const Z900_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA2 — 4,0L na troca; 10W-50 é permitido em clima muito quente (acima de 35°C)',
    body: 'O motor 4 cilindros 948cc da Z900 leva aproximadamente 4,0 litros de óleo na troca com filtro. Use 10W-40 com selo JASO MA2 (API SG ou superior) — Motul 5100/7100 10W-40, Lubrax Moto 4T, Shell Advance Ultra são boas opções. Em regiões muito quentes ou uso intenso em pista, a Kawasaki autoriza 10W-50 para maior proteção em altas temperaturas. Intervalo: 6.000 km ou 6 meses.',
  },
  {
    severity: 'OK',
    title: 'Quatro velas NGK CR9EIA-9 (iridium original) — já vem premium de fábrica',
    body: 'A Z900 usa 4 velas NGK CR9EIA-9 (uma por cilindro), iridium laser original de fábrica — já é o item premium, sem necessidade de "upgrade". Durabilidade esperada: 20.000-25.000 km. Troque sempre as 4 juntas para manter a combustão equilibrada entre cilindros. Custo do jogo completo: R$ 250-400.',
  },
  {
    severity: 'OK',
    title: 'Pneus: 120/70-17 (F) / 180/55-17 (R) — calibragem próxima de 36/42 PSI solo (confirme etiqueta)',
    body: 'A calibragem exata pode variar ligeiramente por ano/mercado — a etiqueta oficial fica no braço oscilante ou no manual do proprietário da sua unidade específica. Como referência da categoria de 948cc/4 cilindros: em torno de 36 PSI dianteiro e 42 PSI traseiro solo, com acréscimo de 2-3 PSI traseiro com garupa/bagagem. Sempre meça a frio. Pneus recomendados: Michelin Pilot Road, Pirelli Diablo Rosso III/IV.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 — kit relação de qualidade é investimento que compensa nos 125 cv da Z900',
    body: 'Com 125 cv no motor, a corrente da Z900 sofre mais que em motos menores. Use corrente 525 de qualidade (DID 525VX3, RK GB525GXW) e lubrifique a cada 500 km — mais frequente que o normal se usar a moto de forma esportiva. Folga: 25-35mm no centro do trecho inferior. Kit completo: R$ 500-800.',
  },
  {
    severity: 'OK',
    title: 'Manutenção e dicas gerais: revisão preventiva regular evita a maioria dos problemas relatados',
    body: 'A Z900 exige manutenção preventiva regular — revisão periódica de óleo, freios e corrente, com atenção a possíveis ruídos ou vazamentos precoces. A grande maioria dos casos de "problema" relatados por donos se resolve com manutenção básica em dia, não com defeito de projeto. Mantenha o cronograma oficial e evite adiar trocas de óleo.',
  },
  {
    severity: 'OK',
    title: 'Embreagem multidisco em banho de óleo — nunca use óleo automotivo sem selo JASO',
    body: 'A embreagem da Z900 é multidisco em banho de óleo (assist & slipper em versões mais novas). Óleo automotivo API SN "puro" sem selo JASO MA/MA2 contém aditivos de fricção (modificadores de atrito) que fazem a embreagem escorregar sob carga — um erro clássico de quem tenta economizar usando óleo de carro. Sempre confira o selo JASO na embalagem.',
  },
]

const Z900_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall: mangueira do freio traseiro mal posicionada (Z900/Z900RS/Z900RS Café 2017-2018)',
    body: 'A Kawasaki convocou proprietários da linha Z900 (incluindo Z900RS e Z900RS Café) fabricadas entre 2017 e 2018 para recall: a mangueira do freio traseiro e o fio do sensor de rotação podem ter sido montados incorretamente, com risco de contato com o pneu traseiro. O atrito contínuo pode desgastar/danificar a mangueira (perda de frenagem traseira) e o fio do sensor ABS (desativação do ABS). Verifique se sua unidade já passou por essa campanha pelo chassi no site oficial da Kawasaki do Brasil.',
  },
  {
    severity: 'DANGER',
    title: 'Recall do sistema ABS (2019): contaminação da unidade hidráulica pode travar roda',
    body: 'A Kawasaki emitiu recall dos modelos 2019 Z900 ABS, Z900RS ABS e Z900RS Café ABS por defeito de fabricação: a unidade hidráulica do ABS foi contaminada com detritos durante a fabricação em alguns lotes, podendo causar travamento de uma das rodas durante frenagem com ABS ativo. Este é um item crítico de segurança — verifique o recall pelo chassi imediatamente se sua moto é do lote afetado.',
  },
  {
    severity: 'WARN',
    title: 'Retificador/regulador: aquecimento excessivo pode gerar corrente insuficiente para carregar a bateria',
    body: 'Um problema documentado no retificador/regulador da Z900 é o aquecimento excessivo na placa do componente, que gera corrente de saída sem controle — resultando em carga insuficiente para a bateria. O sintoma é bateria descarregando mesmo com a moto rodando, podendo levar a falha de partida. Muitas vezes o problema está ligado a fios soltos ou conectores derretidos por calor. Verifique a tensão na bateria com multímetro a 4.000 rpm — deve ficar entre 13,5-14,5V.',
  },
  {
    severity: 'WARN',
    title: 'Recall do pneu dianteiro em unidades 2024 (Z900RS/Z900RS Café/Z900RS SE)',
    body: 'A Kawasaki fez recall de certos modelos 2024 da família Z900RS (ABS, Café ABS, SE ABS) que podiam ter pneu dianteiro com bolha na superfície interna — risco de falha estrutural do pneu. Se sua moto é 2024, verifique se o pneu original já foi trocado dentro dessa campanha, mesmo que o defeito não seja visualmente aparente por fora.',
  },
  {
    severity: 'WARN',
    title: 'Ruídos de motor e vibração incomum: geralmente ligados a manutenção atrasada, não defeito estrutural',
    body: 'Entre os problemas mais citados por proprietários estão ruídos de motor, dificuldade de partida ocasional e vibrações incomuns — na maioria dos casos relacionados a manutenção atrasada (óleo vencido, vela gasta, filtro de ar sujo) e não a falha de projeto do motor 948cc, que é robusto e bem avaliado. Antes de suspeitar de problema grave, refaça a checagem básica: óleo, vela, filtro de ar e aperto geral.',
  },
]

const Z900_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Z900: motor 4 cilindros de alta performance pede disciplina nas trocas',
    body: '1.000 km — Revisão de rodagem + troca de óleo inicial. | 6.000 km — Troca de óleo + filtro (10W-40 JASO MA2, ~4,0L). Lubrificar corrente 525. | 12.000 km — Revisão completa: filtro de ar, folga de válvulas, fluido de freio DOT 4, corrente/relação. | 18.000 km — Óleo + filtro. Verificar as 4 velas NGK CR9EIA-9. | 24.000 km — Revisão completa + kit relação se desgastado. Verificar tensão do retificador (13,5-14,5V @ 4.000 rpm). | Consulte periodicamente recalls pelo chassi — a linha Z900 teve múltiplas campanhas entre 2017-2024.',
  },
]

// ─── Z 900 RS (inclui Z 900 RS CAFÉ e Z 900 RS R Edition) ─────────────────────────
// Mesmo motor 948cc DOHC 16V da Z900, potência declarada frequentemente ~111 cv @ 8.500 rpm (retune para entrega mais linear) | torque ~98 Nm @ 6.500 rpm
// Estilo retrô homenagem à Z1 900 Super Four de 1972 | Instrumentos analógicos duplos | Peso ~215kg (bem mais pesada que a Z900 naked)
// Pneu: 120/70-17 (F) / 180/55-17 (R) | Tanque 17L | Altura assento 800mm

const Z900RS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesmo motor 948cc da Z900, mas com mapeamento mais linear — mesma rotina de óleo e vela',
    body: 'A Z900RS compartilha o bloco do motor 948cc DOHC 16V da Z900, com mapeamento de injeção ajustado para entrega de potência mais linear e "clássica" em vez de esportiva pura (potência declarada geralmente um pouco menor, em torno de 111 cv). Óleo 10W-40 JASO MA2 (~4,0L), 4 velas NGK CR9EIA-9, corrente 525 — toda a rotina de manutenção de motor é idêntica à Z900.',
  },
  {
    severity: 'OK',
    title: 'Homenagem à Z1 900 Super Four de 1972: tanque, faróis redondos e cores clássicas',
    body: 'A Z900RS é um tributo direto à lendária Z1 de 1972 — tanque em formato de gota com pintura bicolor (verde/prata ou outras cores de época conforme ano), faróis redondos, banco duplo e guidão alto. A versão "Café" adiciona carenagem frontal (bikini fairing) e banco solo em estilo café racer. Ao comprar peças de acabamento, especifique sempre a variante exata (RS, RS Café, RS SE, R Edition) — as carenagens e o design de banco NÃO são intercambiáveis entre elas.',
  },
  {
    severity: 'OK',
    title: 'Instrumentos analógicos duplos: mesmo cuidado com bateria da Z650RS',
    body: 'O painel retrô com dois mostradores analógicos (velocímetro e conta-giros) mais um pequeno display digital central pode ter ponteiros oscilantes se a bateria estiver fraca. Mantenha tensão acima de 12,4V em repouso. É item elétrico, não mecânico do relógio em si — resolvido com bateria em boas condições.',
  },
  {
    severity: 'OK',
    title: 'Peso maior (~215kg) que a Z900 naked: manobras de baixa velocidade exigem mais atenção',
    body: 'A Z900RS pesa cerca de 215kg com combustível e óleo — sensivelmente mais que a Z900 naked equivalente, por causa do acabamento retrô mais robusto (tanque metálico maior, banco duplo acolchoado, guidão). Isso não afeta o desempenho em andamento (mesmo motor de 948cc), mas é perceptível em manobras de estacionamento e giros em baixa velocidade — pratique o equilíbrio antes de rodar em trânsito muito denso.',
  },
  {
    severity: 'OK',
    title: 'Rodas raiadas (spoked) na Café e outras variantes: cuidado redobrado com pressão e calibragem',
    body: 'Algumas variantes da Z900RS (dependendo do ano/mercado) usam rodas com desenho raiado remetendo às motos clássicas, mas seguem sendo tubeless modernas. Calibragem: siga a etiqueta do braço oscilante — como referência da categoria, em torno de 36 PSI dianteiro / 42 PSI traseiro solo, sempre a frio.',
  },
  {
    severity: 'OK',
    title: 'Resposta do acelerador pode engasgar em baixa velocidade saindo de marcha lenta',
    body: 'É uma característica documentada (não defeito isolado): a Z900RS pode apresentar leve engasgo ao sair de marcha lenta em baixas velocidades, ligado ao mapeamento de injeção mais "suave" para entrega linear de potência. Também é comum notar rotação de marcha lenta mais alta (até 2.500 rpm) durante o aquecimento em dias frios — isso é normal e se estabiliza após o motor atingir temperatura de trabalho.',
  },
]

const Z900RS_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall: mangueira do freio traseiro (Z900/Z900RS/Z900RS Café 2017-2018) — mesmo item da Z900',
    body: 'A Z900RS e a Z900RS Café fabricadas entre 2017-2018 fazem parte do mesmo recall da Z900 sobre montagem incorreta da mangueira do freio traseiro e fio do sensor ABS, que podem entrar em contato com o pneu traseiro. Verifique pelo chassi no site da Kawasaki do Brasil se sua unidade já passou por essa campanha — é item de segurança crítico.',
  },
  {
    severity: 'DANGER',
    title: 'Recall do sistema ABS 2019: mesma contaminação da unidade hidráulica da linha Z900',
    body: 'Modelos 2019 Z900RS ABS e Z900RS Café ABS foram incluídos no recall por contaminação da unidade hidráulica do ABS durante a fabricação, com risco de travamento de roda em frenagem. Verifique o recall pelo chassi imediatamente.',
  },
  {
    severity: 'WARN',
    title: 'Recall de pneu dianteiro em unidades 2024 (Z900RS ABS, Café ABS, SE ABS)',
    body: 'Assim como a linha Z900, certos modelos 2024 da Z900RS (ABS, Café ABS, SE ABS) foram convocados por possível bolha na superfície interna do pneu dianteiro. Verifique se sua unidade 2024 já teve o pneu trocado dentro dessa campanha.',
  },
  {
    severity: 'WARN',
    title: 'Engasgo do acelerador em baixa velocidade é a reclamação mais comum entre donos',
    body: 'O problema mais reportado por proprietários da Z900RS é justamente a resposta do acelerador ao sair de marcha lenta, com tendência a engasgar levemente em baixas velocidades. Alguns donos resolvem parcialmente com reflash de mapa de injeção feito por preparadores especializados, mas isso pode afetar a garantia — avalie com cuidado antes de modificar.',
  },
  {
    severity: 'WARN',
    title: 'Marcha lenta alta durante aquecimento em dias frios (até 2.500 rpm)',
    body: 'É comum e documentado: em dias frios, o motor pode manter rotação de marcha lenta elevada (até 2.500 rpm) enquanto aquece — parte da estratégia de injeção para reduzir emissões e melhorar a combustão a frio. Não é motivo de preocupação, desde que a rotação se estabilize na faixa normal (geralmente 1.200-1.400 rpm) após o motor atingir temperatura de trabalho, tipicamente em 2-3 minutos.',
  },
]

const Z900RS_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Z900RS: idêntico à Z900 na mecânica; atenção extra a recalls por ser linha com múltiplas campanhas',
    body: '1.000 km — Revisão de rodagem + troca de óleo inicial. | 6.000 km — Troca de óleo + filtro (10W-40 JASO MA2, ~4,0L). Lubrificar corrente 525. | 12.000 km — Revisão completa: filtro de ar, folga de válvulas, fluido de freio DOT 4, corrente/relação. | 18.000 km — Óleo + filtro. Verificar as 4 velas NGK CR9EIA-9. | 24.000 km — Revisão completa + kit relação. | IMPORTANTE: consulte recalls pelo chassi no site da Kawasaki do Brasil — a família Z900RS teve campanhas de mangueira de freio (2017-18), ABS (2019) e pneu dianteiro (2024).',
  },
]

// ─── Z 1000 ────────────────────────────────────────────────────────────────────
// Motor: 1043cc 4 cilindros em linha DOHC 16V arrefecido a líquido | 142 cv @ 10.000 rpm | torque 111 Nm (11,3 kgf.m) @ 7.300 rpm
// Diâmetro×curso 77,2×50,9mm | Injeção eletrônica | Óleo 10W-40 JASO MA2 ~3,5-4,0L | Vela NGK iridium
// Pneu: 120/70-17 (F) / 190/50-17 (R) | Tanque 17L | Descontinuada no Brasil, substituída pela Z900 na linha atual

const Z1000_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 1043cc de 142cv — referência histórica da linha Z antes da Z900 assumir a posição',
    body: 'A Z1000 (2010-2020) foi a naked de topo da Kawasaki no Brasil até ser descontinuada e substituída pela Z900 no catálogo local. Motor 4 cilindros DOHC de 1043cc entregando 142cv — mais potente que a Z900 atual (125cv), mas hoje fora de linha. Peças ainda são encontradas via concessionária e mercado de usados/importados, já que o modelo teve boa base de vendas globalmente.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA2 — aproximadamente 3,5-4,0L; confirme capacidade exata pelo ano da sua unidade',
    body: 'A capacidade de óleo pode variar ligeiramente entre as gerações 2010-2013 e 2014-2020 (houve redesenho do motor em 2014). Como referência da família de motores 4 cilindros Kawasaki dessa cilindrada: em torno de 3,5 a 4,0 litros com troca de filtro. Confirme o valor exato no manual do proprietário específico do ano da sua moto antes da primeira troca. Use sempre 10W-40 JASO MA2, marcas Motul 7100, Lubrax Moto 4T Racing.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 e pneu 190/50-17 traseiro: pneu mais largo que a Z900, exige atenção redobrada à calibragem',
    body: 'A Z1000 usa pneu traseiro 190/50-17, mais largo que o 180/55-17 da Z900 — reflexo dos 142cv do motor. Calibragem correta é ainda mais crítica nesse pneu largo para não comprometer o handling. Consulte a etiqueta original no braço oscilante da sua unidade, pois o valor exato varia por ano/geração.',
  },
  {
    severity: 'OK',
    title: 'Descontinuada: priorize peças originais Kawasaki via concessionária para itens críticos de motor',
    body: 'Como a Z1000 não é mais vendida nova no Brasil, peças de desgaste comum (pastilhas, filtros, corrente) são fáceis de achar em compatíveis genéricos, mas componentes específicos do motor 1043cc (bomba d\'água, sensores, bobinas) podem exigir importação ou busca em desmanches especializados em motos grandes. Cultive uma boa relação com concessionária Kawasaki ou oficina especializada em motos importadas de alta cilindrada.',
  },
  {
    severity: 'OK',
    title: 'Clutch basket (cesto de embreagem) com folga de fábrica: barulho de "chocalho" em marcha lenta é conhecido',
    body: 'É um comportamento documentado do motor da família Z1000/Ninja 1000 dessa geração: o cesto de embreagem tem folga de projeto que causa um leve ruído de "chocalho" (rattle) em marcha lenta, mais perceptível com o motor frio. Na maioria dos casos é normal e não indica falha — mas se o ruído for muito alto ou aumentar com o tempo, vale checar com mecânico especializado (veja também em Problemas).',
  },
  {
    severity: 'OK',
    title: 'Consumo médio: espere entre 14-18 km/l dependendo do uso — motor de alta performance não é econômico',
    body: 'Com 142cv em uma moto de pouco mais de 220kg, a Z1000 tem consumo mais elevado que as Z650/Z900 — média real de 14 a 18 km/l dependendo do estilo de pilotagem. Com tanque de 17L, a autonomia prática fica entre 240-300km. Planeje isso em viagens mais longas.',
  },
]

const Z1000_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Ruído de "chocalho" no cesto de embreagem (clutch basket rattle) — problema documentado desde 2012',
    body: 'É um problema conhecido e bem documentado na comunidade de proprietários desde os modelos 2012: as placas da embreagem não recebem óleo suficiente e "chocalham" dentro do cesto, causando ruído de matraca perceptível principalmente em marcha lenta com o motor frio. A Kawasaki teve um reparo oficial para o problema (furos adicionais no cesto de embreagem e ajuste na haste de desengate), disponível em concessionárias. Se o ruído for acompanhado de trepidação na embreagem ou dificuldade de engate, procure uma concessionária para avaliar se sua unidade precisa do reparo.',
  },
  {
    severity: 'WARN',
    title: 'Trepidação no engate inicial da embreagem ligada ao mesmo problema do cesto',
    body: 'Alguns proprietários relatam "shuddering" (trepidação) no engate inicial da embreagem e desengate atrasado ao parar — sintomas ligados ao mesmo desgaste por falta de lubrificação adequada nos discos de embreagem do cesto. Em casos mais avançados, a concessionária pode indicar troca de discos e molas de embreagem, cobertos por garantia em unidades ainda dentro do prazo (a maioria hoje já está fora, dado o tempo desde a produção).',
  },
  {
    severity: 'WARN',
    title: 'Peças de motor específicas cada vez mais escassas com o tempo — modelo fora de linha há anos',
    body: 'Por estar descontinuada no Brasil há vários anos, peças específicas do motor 1043cc (não compartilhadas com a Z900 ou outras linhas atuais) tendem a ficar mais escassas e caras com o tempo. Ao planejar uma reforma de motor ou reparo grande, pesquise disponibilidade e prazo de entrega antes de desmontar — pode ser necessário importar.',
  },
  {
    severity: 'WARN',
    title: 'Vibração no guidão em alta velocidade: verificar balanceamento e aperto do motor no chassi',
    body: 'Assim como em outras motos de 4 cilindros de alta rotação, vibração perceptível no guidão em velocidades de rodovia geralmente aponta para desbalanceamento de pneus/rodas ou parafusos de fixação do motor que soltaram com o tempo — não é característica normal de projeto em excesso. Inclua checagem de aperto geral nas revisões, especialmente em unidades com mais de 30.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico: verifique conectores e chicote em unidades mais antigas (2010-2013)',
    body: 'Unidades da primeira geração (2010-2013) já têm mais de uma década de uso — conectores elétricos podem oxidar ou ressecar com o tempo, causando falhas intermitentes em iluminação ou sensores. Ao fazer manutenção, aproveite para inspecionar visualmente o chicote elétrico e aplicar graxa dielétrica nos conectores acessíveis como prevenção.',
  },
]

const Z1000_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Z1000: motor de alta performance 142cv exige disciplina rigorosa nas trocas',
    body: '1.000 km — Revisão de rodagem + troca de óleo inicial. | 6.000 km — Troca de óleo + filtro (10W-40 JASO MA2, confirme capacidade exata no manual: ~3,5-4,0L). Lubrificar corrente 525. | 12.000 km — Revisão completa: filtro de ar, folga de válvulas, fluido de freio DOT 4, corrente/relação. | 18.000 km — Óleo + filtro + vela. | 24.000 km — Revisão completa + kit relação. Avaliar cesto de embreagem quanto a ruído/folga excessiva. | 30.000 km — Checagem geral de aperto do motor e sistema elétrico (unidades mais antigas).',
  },
]

// ─── Z H2 ──────────────────────────────────────────────────────────────────────
// Motor: 998cc 4 cilindros em linha DOHC 16V com supercharger Kawasaki (sem intercooler) | 200 cv @ 10.500 rpm | torque 14 kgf.m (137 Nm) @ 8.500 rpm
// Injeção eletrônica | Óleo 10W-40 JASO MA2 | Câmbio 6 velocidades, embreagem assistida e deslizante | Redução primária 1.480 (74/50)
// Tanque 19L | Peso em ordem de marcha 239kg | Preço Brasil (2026): a partir de R$ 119.990 | Naked supercharged de altíssima performance, item raro/exclusivo no Brasil

const ZH2_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor supercharged 998cc sem intercooler: eficiência do compressor evita ganho excessivo de calor',
    body: 'A Z H2 usa um motor 998cc 4 cilindros com supercharger desenvolvido internamente pela Kawasaki (não é turbo — é compressor mecânico movido pelo próprio motor). A alta eficiência do supercharger Kawasaki gera ganho mínimo de temperatura no ar admitido, o que dispensou o uso de intercooler — economia real de peso mantendo confiabilidade. Isso significa menos um componente para dar problema, mas também significa que o sistema de arrefecimento do motor trabalha mais — respeite rigorosamente os intervalos de troca de líquido de arrefecimento.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA2 — siga rigorosamente o cronograma; motor de altíssima performance não perdoa atraso',
    body: 'Óleo recomendado: 10W-40 com selo JASO MA2. A troca regular do óleo e filtro deve seguir exatamente o manual do proprietário, geralmente a cada 6.000 km ou 6 meses, com a primeira revisão aos 1.000 km. Dado o estresse térmico e mecânico de um motor com 200cv e supercharger, NÃO adie trocas — use sempre óleo de marca confiável (Motul 300V ou 7100, Kawasaki Performance Oil) e nunca genérico de procedência duvidosa.',
  },
  {
    severity: 'OK',
    title: 'Item raro e exclusivo no Brasil: peças, mão de obra e diagnóstico exigem oficina especializada',
    body: 'A Z H2 é vendida no Brasil por cerca de R$ 119.990 e é um produto de nicho — poucas unidades em circulação comparado às Z650/Z900. Isso tem implicações práticas: só concessionárias Kawasaki bem equipadas (com scanner e treinamento específico para o sistema supercharged) devem fazer manutenção do motor. Evite oficinas genéricas para qualquer serviço relacionado ao supercharger, ECU ou sistema de admissão pressurizado.',
  },
  {
    severity: 'OK',
    title: 'Câmbio de 6 velocidades com embreagem assistida e deslizante: cuide da qualidade do óleo para o sistema funcionar bem',
    body: 'O sistema de embreagem assistida e deslizante da Z H2 depende de óleo em boas condições e com JASO MA2 para funcionar como projetado, reduzindo o esforço na alavanca e evitando travamento da roda traseira em reduções bruscas. Óleo vencido ou fora de especificação compromete diretamente esse sistema — mais um motivo para nunca atrasar a troca.',
  },
  {
    severity: 'OK',
    title: 'Corrente e transmissão: redução primária 1.480 (74/50) — sistema robusto para lidar com 200cv',
    body: 'A transmissão da Z H2 usa redução primária de 1.480 (74/50 dentes) para lidar com a entrega de potência do motor supercharged. A corrente final é dimensionada para alta performance — não economize em kit relação: use apenas marcas de primeira linha (DID ZVMX ou similar de alta resistência) e mantenha lubrificação rigorosa a cada 500 km, ainda mais importante dado o torque entregue pelo motor.',
  },
  {
    severity: 'OK',
    title: 'Aceleração 0-100km/h em ~3,5s: pneus e freios de alta performance são obrigatórios, não opcionais',
    body: 'Com aceleração de 0 a 100km/h em aproximadamente 3,5 segundos e velocidade máxima acima de 280km/h, a Z H2 exige pneus de altíssima performance (linha esportiva Michelin Power ou Pirelli Diablo Supercorsa/Rosso) já originais de fábrica. Nunca substitua por pneus de linha inferior para "economizar" — o risco de segurança não compensa a diferença de preço em um veículo desse desempenho.',
  },
]

const ZH2_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Item de nicho: poucos dados de longo prazo de manutenção no mercado brasileiro',
    body: 'Por ser um produto de altíssimo desempenho e baixo volume de vendas no Brasil, a Z H2 ainda não acumulou um histórico extenso de problemas recorrentes documentados por proprietários locais, diferente de modelos de maior volume como a Z650 ou Z900. Sempre consulte a concessionária Kawasaki para informações atualizadas de campanhas de recall específicas do seu chassi.',
  },
  {
    severity: 'WARN',
    title: 'Custo de manutenção e peças significativamente mais alto que o resto da linha Z',
    body: 'Por usar tecnologia exclusiva (supercharger), a Z H2 tem custo de manutenção mais elevado que qualquer outro modelo da linha Z — peças específicas do sistema de sobrealimentação, quando necessárias, são caras e de disponibilidade limitada no Brasil, geralmente sob encomenda via concessionária. Considere esse custo operacional ao planejar a compra, além do valor inicial de R$ 119.990.',
  },
  {
    severity: 'WARN',
    title: 'Peso elevado (239kg) exige atenção redobrada em manobras de baixa velocidade',
    body: 'Com 239kg em ordem de marcha — bem mais pesada que a Z900 (aproximadamente 210kg) — a Z H2 exige mais força e atenção do piloto em manobras de baixa velocidade, especialmente para pilotos com menos experiência em motos de grande porte. Não é defeito, mas é um fator de adaptação importante para quem está comprando a primeira moto de altíssima cilindrada.',
  },
  {
    severity: 'WARN',
    title: 'Uso predominantemente urbano desperdiça o potencial e pode gerar desgaste desproporcional de embreagem/corrente',
    body: 'Uma moto com 200cv projetada para entrega de potência em alta rotação, quando usada predominantemente em trânsito urbano parado (uso de embreagem constante em baixa velocidade), pode sofrer desgaste mais acelerado de embreagem e corrente do que em uso de rodovia/pista. Se o uso principal for urbano, redobre a atenção aos intervalos de inspeção desses componentes.',
  },
  {
    severity: 'WARN',
    title: 'Ausência de intercooler: sistema de arrefecimento do motor trabalha sob mais carga térmica',
    body: 'Como a Kawasaki optou por não usar intercooler (compensado pela eficiência do supercharger), todo o calor gerado pela sobrealimentação precisa ser dissipado pelo sistema de arrefecimento a líquido do motor. Em uso muito intenso e prolongado (pista, trânsito parado em dias muito quentes), monitore a temperatura do motor e o nível do líquido de arrefecimento com mais atenção do que faria em uma naked aspirada.',
  },
]

const ZH2_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Z H2: motor supercharged de 200cv não perdoa atraso — sempre em concessionária especializada',
    body: '1.000 km — Revisão de rodagem obrigatória + troca de óleo inicial (concessionária Kawasaki). | 6.000 km — Troca de óleo + filtro (10W-40 JASO MA2). Lubrificar corrente de alta resistência. | 12.000 km — Revisão completa: filtro de ar, folga de válvulas, fluido de freio, corrente/relação, checagem do sistema de arrefecimento. | 18.000 km — Óleo + filtro + velas. | 24.000 km — Revisão completa + avaliação do kit relação. Diagnóstico do sistema supercharger por scanner específico Kawasaki. | Todas as revisões: prefira concessionária oficial dado o baixo volume de oficinas especializadas nesse sistema no Brasil.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Z 300',
    yearFrom: 2015,
    yearTo: 2018,
    MACETES: Z300_MACETES,
    PROBLEMAS: Z300_PROBLEMAS,
    MANUTENCAO: Z300_MANUTENCAO,
  },
  {
    modelName: 'Z 400',
    yearFrom: 2019,
    yearTo: 2024,
    MACETES: Z400_MACETES,
    PROBLEMAS: Z400_PROBLEMAS,
    MANUTENCAO: Z400_MANUTENCAO,
  },
  {
    modelName: 'Z 500',
    yearFrom: 2024,
    yearTo: null,
    MACETES: Z500_MACETES,
    PROBLEMAS: Z500_PROBLEMAS,
    MANUTENCAO: Z500_MANUTENCAO,
  },
  {
    modelName: 'Z 650',
    yearFrom: 2017,
    yearTo: null,
    MACETES: Z650_MACETES,
    PROBLEMAS: Z650_PROBLEMAS,
    MANUTENCAO: Z650_MANUTENCAO,
  },
  {
    modelName: 'Z 650 RS',
    yearFrom: 2022,
    yearTo: null,
    MACETES: Z650RS_MACETES,
    PROBLEMAS: Z650RS_PROBLEMAS,
    MANUTENCAO: Z650RS_MANUTENCAO,
  },
  {
    modelName: 'Z 900',
    yearFrom: 2017,
    yearTo: null,
    MACETES: Z900_MACETES,
    PROBLEMAS: Z900_PROBLEMAS,
    MANUTENCAO: Z900_MANUTENCAO,
  },
  {
    modelName: 'Z 900 RS',
    yearFrom: 2018,
    yearTo: null,
    MACETES: Z900RS_MACETES,
    PROBLEMAS: Z900RS_PROBLEMAS,
    MANUTENCAO: Z900RS_MANUTENCAO,
  },
  {
    modelName: 'Z 1000',
    yearFrom: 2010,
    yearTo: 2020,
    MACETES: Z1000_MACETES,
    PROBLEMAS: Z1000_PROBLEMAS,
    MANUTENCAO: Z1000_MANUTENCAO,
  },
  {
    modelName: 'Z H2',
    yearFrom: 2020,
    yearTo: null,
    MACETES: ZH2_MACETES,
    PROBLEMAS: ZH2_PROBLEMAS,
    MANUTENCAO: ZH2_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Z 300',
    yearFrom: 2015, yearTo: 2018,
    tireSize: '110/70-17 (F) · 140/70-17 (R)',
    frontPsi: 33, rearPsi: 36,
    frontPsiLoad: 33, rearPsiLoad: 39,
    notes: 'Solo: F 33 / R 36 PSI. Com garupa: F 33 / R 39 PSI (estimativa baseada na família de motor compartilhada com Ninja 300 — confirme na etiqueta do braço oscilante da sua unidade). Sempre calibrar a frio.',
  },
  {
    modelName: 'Z 400',
    yearFrom: 2019, yearTo: 2024,
    tireSize: '110/70-17 (F) · 150/60-17 (R)',
    frontPsi: 33, rearPsi: 36,
    frontPsiLoad: 33, rearPsiLoad: 42,
    notes: 'Solo: F 33 / R 36 PSI. Com garupa: F 33 / R 42 PSI. Valores conforme especificação oficial Kawasaki para o modelo. Sempre calibrar a frio, moto parada há mais de 3 horas.',
  },
  {
    modelName: 'Z 500',
    yearFrom: 2024, yearTo: null,
    tireSize: '110/70-17 (F) · 150/60-17 (R) aprox.',
    frontPsi: 33, rearPsi: 36,
    frontPsiLoad: 33, rearPsiLoad: 42,
    notes: 'Modelo lançado em 2024 — valores estimados com base na Z400 (motor da mesma família, geometria similar). CONFIRME a pressão exata na etiqueta do braço oscilante ou manual do proprietário da sua unidade antes de calibrar, pois a Kawasaki pode ter ajustado a especificação para o novo motor 451cc.',
  },
  {
    modelName: 'Z 650',
    yearFrom: 2017, yearTo: null,
    tireSize: '120/70-17 (F) · 160/60-17 (R)',
    frontPsi: 32, rearPsi: 36,
    frontPsiLoad: 32, rearPsiLoad: 40,
    notes: 'Solo: F 32 / R 36 PSI (especificação oficial Kawasaki). Com garupa: R aumenta para aproximadamente 40 PSI — confirme na etiqueta do braço oscilante. Sempre a frio.',
  },
  {
    modelName: 'Z 650 RS',
    yearFrom: 2022, yearTo: null,
    tireSize: '120/70-17 (F) · 160/60-17 (R)',
    frontPsi: 32, rearPsi: 36,
    frontPsiLoad: 32, rearPsiLoad: 40,
    notes: 'Mesmos pneus e pressões da Z650 (mecânica compartilhada). Solo: F 32 / R 36 PSI. Com garupa: R ~40 PSI. Sempre a frio.',
  },
  {
    modelName: 'Z 900',
    yearFrom: 2017, yearTo: null,
    tireSize: '120/70-17 (F) · 180/55-17 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 45,
    notes: 'Solo: F 36 / R 42 PSI (aprox. 2,5 bar F / 2,9 bar R). Com garupa/carga: R sobe para ~45 PSI. Confirme sempre na etiqueta do braço oscilante da sua unidade, pois pode variar ligeiramente por ano. Sempre a frio.',
  },
  {
    modelName: 'Z 900 RS',
    yearFrom: 2018, yearTo: null,
    tireSize: '120/70-17 (F) · 180/55-17 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 45,
    notes: 'Mesmos pneus e pressão-base da Z900 (motor compartilhado). Solo: F 36 / R 42 PSI. Com garupa: R ~45 PSI. Peso maior da RS reforça a importância de manter a calibragem correta. Sempre a frio.',
  },
  {
    modelName: 'Z 1000',
    yearFrom: 2010, yearTo: 2020,
    tireSize: '120/70-17 (F) · 190/50-17 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 45,
    notes: 'Solo: F 36 / R 42 PSI (estimativa baseada na categoria de naked 4 cilindros de alta performance — confirme na etiqueta do braço oscilante, pois pode variar entre a geração 2010-2013 e a 2014-2020). Pneu traseiro mais largo (190/50) que a Z900.',
  },
  {
    modelName: 'Z H2',
    yearFrom: 2020, yearTo: null,
    tireSize: '120/70-17 (F) · 190/55-17 (R) aprox.',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 45,
    notes: 'Valores estimados com base na categoria de naked de altíssima performance (Z1000/Z900 como referência) — a pesquisa não encontrou a pressão oficial exata publicada. CONFIRME SEMPRE na etiqueta do braço oscilante ou manual do proprietário antes de calibrar — modelo de alta performance exige precisão redobrada na calibragem por segurança.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // Z 300
  { modelName: 'Z 300', yearFrom: 2015, yearTo: 2018, component: 'Óleo 10W-40 JASO MA2 (~2,3L)', intervalKm: 6000, intervalMonths: 6, notes: 'Motor 296cc DOHC. Embreagem em banho de óleo — nunca usar óleo sem selo JASO.', priority: 'HIGH', order: 1 },
  { modelName: 'Z 300', yearFrom: 2015, yearTo: 2018, component: 'Vela NGK CR9E (gap 0,7–0,8mm)', intervalKm: 8000, intervalMonths: null, notes: 'Iridium CR9EIX dura até 20.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Z 300', yearFrom: 2015, yearTo: 2018, component: 'Lubrificação da corrente 520', intervalKm: 700, intervalMonths: null, notes: 'Folga 25–35mm no centro do trecho inferior.', priority: 'HIGH', order: 3 },
  { modelName: 'Z 300', yearFrom: 2015, yearTo: 2018, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Verificar sujidade em uso urbano intenso.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Z 300', yearFrom: 2015, yearTo: 2018, component: 'Folga de válvulas', intervalKm: 12000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 5 },
  { modelName: 'Z 300', yearFrom: 2015, yearTo: 2018, component: 'Fluido de freio DOT 4', intervalKm: 18000, intervalMonths: 24, notes: 'Bienal obrigatório mesmo sem atingir o km.', priority: 'HIGH', order: 6 },
  { modelName: 'Z 300', yearFrom: 2015, yearTo: 2018, component: 'Nível de líquido de arrefecimento', intervalKm: null, intervalMonths: 3, notes: 'Motor arrefecido a líquido — verificar reservatório de expansão regularmente.', priority: 'HIGH', order: 7 },
  { modelName: 'Z 300', yearFrom: 2015, yearTo: 2018, component: 'Kit relação (pinhão 15T + coroa 42T + corrente 520)', intervalKm: 20000, intervalMonths: null, notes: 'DID 520VX3 ou RK GB520KRO.', priority: 'HIGH', order: 8 },
  { modelName: 'Z 300', yearFrom: 2015, yearTo: 2018, component: 'Folga do cabo de embreagem', intervalKm: 3000, intervalMonths: null, notes: 'Folga correta: 2–3mm na alavanca.', priority: 'MEDIUM', order: 9 },

  // Z 400
  { modelName: 'Z 400', yearFrom: 2019, yearTo: 2024, component: 'Óleo 10W-40 API SL JASO MA (2,3L)', intervalKm: 6000, intervalMonths: 6, notes: 'Motor 399cc DOHC. Selo JASO MA obrigatório.', priority: 'HIGH', order: 1 },
  { modelName: 'Z 400', yearFrom: 2019, yearTo: 2024, component: 'Vela NGK (G-Power ou Iridium IX)', intervalKm: 8000, intervalMonths: null, notes: 'Iridium dura até 20.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Z 400', yearFrom: 2019, yearTo: 2024, component: 'Lubrificação da corrente', intervalKm: 700, intervalMonths: null, notes: 'Reduzir intervalo em uso sob chuva.', priority: 'HIGH', order: 3 },
  { modelName: 'Z 400', yearFrom: 2019, yearTo: 2024, component: 'Revisão completa (válvulas, corrente, filtro ar, freio)', intervalKm: 12000, intervalMonths: 12, notes: 'Cronograma oficial Kawasaki — revisão maior a cada 12.000 km.', priority: 'HIGH', order: 4 },
  { modelName: 'Z 400', yearFrom: 2019, yearTo: 2024, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Verificar em cada revisão completa.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Z 400', yearFrom: 2019, yearTo: 2024, component: 'Fluido de freio DOT 4', intervalKm: 18000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 6 },
  { modelName: 'Z 400', yearFrom: 2019, yearTo: 2024, component: 'Kit relação', intervalKm: 20000, intervalMonths: null, notes: 'Trocar kit completo quando desgastado.', priority: 'HIGH', order: 7 },
  { modelName: 'Z 400', yearFrom: 2019, yearTo: 2024, component: 'Pré-carga da suspensão traseira — ajuste', intervalKm: null, intervalMonths: null, notes: 'Ajustar conforme peso do piloto para melhor conforto.', priority: 'LOW', order: 8 },
  { modelName: 'Z 400', yearFrom: 2019, yearTo: 2024, component: 'Bateria — verificação de tensão', intervalKm: null, intervalMonths: 6, notes: 'Mínimo 12,4V em repouso, principalmente em uso urbano de trajetos curtos.', priority: 'MEDIUM', order: 9 },

  // Z 500
  { modelName: 'Z 500', yearFrom: 2024, yearTo: null, component: 'Óleo 10W-40 JASO MA2 (~2,5L, confirmar no manual)', intervalKm: 6000, intervalMonths: 6, notes: 'Motor 451cc DOHC. Confirme capacidade exata — modelo recente.', priority: 'HIGH', order: 1 },
  { modelName: 'Z 500', yearFrom: 2024, yearTo: null, component: 'Vela — verificação', intervalKm: 8000, intervalMonths: null, notes: 'Seguir manual do proprietário específico do ano.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Z 500', yearFrom: 2024, yearTo: null, component: 'Lubrificação da corrente', intervalKm: 700, intervalMonths: null, notes: 'Modelo novo — seguir cronograma conservador.', priority: 'HIGH', order: 3 },
  { modelName: 'Z 500', yearFrom: 2024, yearTo: null, component: 'Revisão completa (válvulas, corrente, filtro ar, freio)', intervalKm: 12000, intervalMonths: 12, notes: 'Confirme cronograma exato no manual — pode variar de ano-modelo.', priority: 'HIGH', order: 4 },
  { modelName: 'Z 500', yearFrom: 2024, yearTo: null, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Checar em cada revisão completa.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Z 500', yearFrom: 2024, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 18000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 6 },
  { modelName: 'Z 500', yearFrom: 2024, yearTo: null, component: 'Kit relação', intervalKm: 20000, intervalMonths: null, notes: 'Avaliar desgaste — sem histórico extenso ainda.', priority: 'HIGH', order: 7 },
  { modelName: 'Z 500', yearFrom: 2024, yearTo: null, component: 'Checagem de aperto geral (parafusos de acabamento)', intervalKm: 1000, intervalMonths: null, notes: 'Vibração da rodagem inicial pode afrouxar parafusos de acabamento.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Z 500', yearFrom: 2024, yearTo: null, component: 'Sistema antirrebote da embreagem — checagem de óleo', intervalKm: 6000, intervalMonths: 6, notes: 'Manter óleo JASO MA2 em dia para o sistema assist & slipper funcionar corretamente.', priority: 'MEDIUM', order: 9 },

  // Z 650
  { modelName: 'Z 650', yearFrom: 2017, yearTo: null, component: 'Óleo 10W-40 JASO MA (~1,8L)', intervalKm: 6000, intervalMonths: 6, notes: 'Motor 649cc DOHC. Capacidade pode variar 0,1-0,2L conforme ano — confirme no manual.', priority: 'HIGH', order: 1 },
  { modelName: 'Z 650', yearFrom: 2017, yearTo: null, component: 'Vela NGK CR9EIA-9 (iridium original)', intervalKm: 18000, intervalMonths: null, notes: 'Já vem iridium de fábrica — dura 20.000-25.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Z 650', yearFrom: 2017, yearTo: null, component: 'Lubrificação da corrente 520', intervalKm: 700, intervalMonths: null, notes: 'Folga 25-35mm no centro do trecho inferior.', priority: 'HIGH', order: 3 },
  { modelName: 'Z 650', yearFrom: 2017, yearTo: null, component: 'Revisão completa (válvulas, filtro ar, corrente/relação, freio)', intervalKm: 12000, intervalMonths: 12, notes: 'Cronograma oficial Kawasaki.', priority: 'HIGH', order: 4 },
  { modelName: 'Z 650', yearFrom: 2017, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório mesmo sem atingir o km.', priority: 'HIGH', order: 5 },
  { modelName: 'Z 650', yearFrom: 2017, yearTo: null, component: 'Pastilhas de freio (disco simples dianteiro)', intervalKm: 15000, intervalMonths: null, notes: 'EBC FA379 ou Vesrah. Trocar com material abaixo de 2mm.', priority: 'MEDIUM', order: 6 },
  { modelName: 'Z 650', yearFrom: 2017, yearTo: null, component: 'Kit relação 520', intervalKm: 22000, intervalMonths: null, notes: 'DID 520VX3 ou RK GB520KRO.', priority: 'HIGH', order: 7 },
  { modelName: 'Z 650', yearFrom: 2017, yearTo: null, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Checar em cada revisão completa.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Z 650', yearFrom: 2017, yearTo: null, component: 'Checagem de aperto do motor no chassi', intervalKm: 20000, intervalMonths: null, notes: 'Previne vibração em alta velocidade por parafusos soltos.', priority: 'LOW', order: 9 },

  // Z 650 RS
  { modelName: 'Z 650 RS', yearFrom: 2022, yearTo: null, component: 'Óleo 10W-40 JASO MA (~1,8L)', intervalKm: 6000, intervalMonths: 6, notes: 'Mesma mecânica da Z650 (649cc DOHC).', priority: 'HIGH', order: 1 },
  { modelName: 'Z 650 RS', yearFrom: 2022, yearTo: null, component: 'Vela NGK CR9EIA-9 (iridium original)', intervalKm: 18000, intervalMonths: null, notes: 'Idêntica à Z650.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Z 650 RS', yearFrom: 2022, yearTo: null, component: 'Lubrificação da corrente 520', intervalKm: 700, intervalMonths: null, notes: 'Folga 25-35mm.', priority: 'HIGH', order: 3 },
  { modelName: 'Z 650 RS', yearFrom: 2022, yearTo: null, component: 'Revisão completa (válvulas, filtro ar, corrente/relação, freio)', intervalKm: 12000, intervalMonths: 12, notes: 'Mesmo cronograma da Z650.', priority: 'HIGH', order: 4 },
  { modelName: 'Z 650 RS', yearFrom: 2022, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 5 },
  { modelName: 'Z 650 RS', yearFrom: 2022, yearTo: null, component: 'Verificação da bateria (instrumentos analógicos)', intervalKm: null, intervalMonths: 6, notes: 'Ponteiros oscilantes indicam tensão baixa — manter acima de 12,4V.', priority: 'MEDIUM', order: 6 },
  { modelName: 'Z 650 RS', yearFrom: 2022, yearTo: null, component: 'Kit relação 520', intervalKm: 22000, intervalMonths: null, notes: 'Mesmas marcas recomendadas da Z650.', priority: 'HIGH', order: 7 },
  { modelName: 'Z 650 RS', yearFrom: 2022, yearTo: null, component: 'Limpeza e proteção de partes cromadas', intervalKm: null, intervalMonths: 3, notes: 'Acabamento retrô exige cuidado extra contra oxidação.', priority: 'LOW', order: 8 },
  { modelName: 'Z 650 RS', yearFrom: 2022, yearTo: null, component: 'Ajuste de pré-carga da suspensão traseira', intervalKm: null, intervalMonths: null, notes: 'Suspensão relativamente firme — ajustar conforme peso/uso.', priority: 'LOW', order: 9 },

  // Z 900
  { modelName: 'Z 900', yearFrom: 2017, yearTo: null, component: 'Óleo 10W-40 JASO MA2 (~4,0L)', intervalKm: 6000, intervalMonths: 6, notes: 'Motor 4 cilindros 948cc. 10W-50 permitido em clima muito quente (acima de 35°C).', priority: 'HIGH', order: 1 },
  { modelName: 'Z 900', yearFrom: 2017, yearTo: null, component: 'Velas NGK CR9EIA-9 ×4 (iridium original)', intervalKm: 20000, intervalMonths: null, notes: 'Trocar sempre as 4 juntas.', priority: 'HIGH', order: 2 },
  { modelName: 'Z 900', yearFrom: 2017, yearTo: null, component: 'Lubrificação da corrente 525', intervalKm: 500, intervalMonths: null, notes: '125cv exige lubrificação mais frequente que motos menores.', priority: 'HIGH', order: 3 },
  { modelName: 'Z 900', yearFrom: 2017, yearTo: null, component: 'Revisão completa (válvulas, filtro ar, corrente/relação, freio)', intervalKm: 12000, intervalMonths: 12, notes: 'Cronograma oficial Kawasaki.', priority: 'HIGH', order: 4 },
  { modelName: 'Z 900', yearFrom: 2017, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 5 },
  { modelName: 'Z 900', yearFrom: 2017, yearTo: null, component: 'Verificação do retificador/regulador (13,5-14,5V @ 4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Ponto de falha documentado — aquecimento excessivo pode não carregar a bateria.', priority: 'HIGH', order: 6 },
  { modelName: 'Z 900', yearFrom: 2017, yearTo: null, component: 'Kit relação 525', intervalKm: 22000, intervalMonths: null, notes: 'DID 525VX3 ou RK GB525GXW.', priority: 'HIGH', order: 7 },
  { modelName: 'Z 900', yearFrom: 2017, yearTo: null, component: 'Consulta de recalls pelo chassi', intervalKm: null, intervalMonths: 12, notes: 'Linha teve recalls de mangueira de freio (2017-18), ABS (2019) e pneu (2024).', priority: 'CRITICAL', order: 8 },
  { modelName: 'Z 900', yearFrom: 2017, yearTo: null, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Checar em cada revisão completa.', priority: 'MEDIUM', order: 9 },

  // Z 900 RS
  { modelName: 'Z 900 RS', yearFrom: 2018, yearTo: null, component: 'Óleo 10W-40 JASO MA2 (~4,0L)', intervalKm: 6000, intervalMonths: 6, notes: 'Mesmo motor 948cc da Z900.', priority: 'HIGH', order: 1 },
  { modelName: 'Z 900 RS', yearFrom: 2018, yearTo: null, component: 'Velas NGK CR9EIA-9 ×4 (iridium original)', intervalKm: 20000, intervalMonths: null, notes: 'Trocar sempre em conjunto.', priority: 'HIGH', order: 2 },
  { modelName: 'Z 900 RS', yearFrom: 2018, yearTo: null, component: 'Lubrificação da corrente 525', intervalKm: 500, intervalMonths: null, notes: 'Mesma exigência da Z900.', priority: 'HIGH', order: 3 },
  { modelName: 'Z 900 RS', yearFrom: 2018, yearTo: null, component: 'Revisão completa (válvulas, filtro ar, corrente/relação, freio)', intervalKm: 12000, intervalMonths: 12, notes: 'Mesmo cronograma da Z900.', priority: 'HIGH', order: 4 },
  { modelName: 'Z 900 RS', yearFrom: 2018, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 5 },
  { modelName: 'Z 900 RS', yearFrom: 2018, yearTo: null, component: 'Consulta de recalls pelo chassi (mangueira freio, ABS, pneu)', intervalKm: null, intervalMonths: 12, notes: 'Família Z900RS teve múltiplas campanhas 2017-2024 — inclui variante Café e SE.', priority: 'CRITICAL', order: 6 },
  { modelName: 'Z 900 RS', yearFrom: 2018, yearTo: null, component: 'Verificação do retificador/regulador', intervalKm: null, intervalMonths: 12, notes: '13,5-14,5V @ 4.000 rpm — mesmo ponto de atenção da Z900.', priority: 'HIGH', order: 7 },
  { modelName: 'Z 900 RS', yearFrom: 2018, yearTo: null, component: 'Kit relação 525', intervalKm: 22000, intervalMonths: null, notes: 'Mesmas marcas recomendadas da Z900.', priority: 'HIGH', order: 8 },
  { modelName: 'Z 900 RS', yearFrom: 2018, yearTo: null, component: 'Verificação da bateria (instrumentos analógicos)', intervalKm: null, intervalMonths: 6, notes: 'Manter acima de 12,4V para painel retrô funcionar corretamente.', priority: 'MEDIUM', order: 9 },

  // Z 1000
  { modelName: 'Z 1000', yearFrom: 2010, yearTo: 2020, component: 'Óleo 10W-40 JASO MA2 (~3,5-4,0L, confirmar no manual)', intervalKm: 6000, intervalMonths: 6, notes: 'Motor 4 cilindros 1043cc. Capacidade varia entre gerações 2010-13 e 2014-20.', priority: 'HIGH', order: 1 },
  { modelName: 'Z 1000', yearFrom: 2010, yearTo: 2020, component: 'Vela NGK iridium', intervalKm: 18000, intervalMonths: null, notes: 'Confirmar código exato pelo ano da unidade.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Z 1000', yearFrom: 2010, yearTo: 2020, component: 'Lubrificação da corrente 525', intervalKm: 500, intervalMonths: null, notes: '142cv exige atenção redobrada à corrente.', priority: 'HIGH', order: 3 },
  { modelName: 'Z 1000', yearFrom: 2010, yearTo: 2020, component: 'Revisão completa (válvulas, filtro ar, corrente/relação, freio)', intervalKm: 12000, intervalMonths: 12, notes: 'Cronograma padrão Kawasaki 4 cilindros.', priority: 'HIGH', order: 4 },
  { modelName: 'Z 1000', yearFrom: 2010, yearTo: 2020, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 5 },
  { modelName: 'Z 1000', yearFrom: 2010, yearTo: 2020, component: 'Avaliação do cesto de embreagem (ruído de chocalho)', intervalKm: null, intervalMonths: 12, notes: 'Problema documentado desde 2012 — reparo oficial disponível em concessionária se ruído for excessivo.', priority: 'MEDIUM', order: 6 },
  { modelName: 'Z 1000', yearFrom: 2010, yearTo: 2020, component: 'Kit relação 525', intervalKm: 22000, intervalMonths: null, notes: 'Modelo descontinuado — priorizar peças de qualidade dado o custo de importação.', priority: 'HIGH', order: 7 },
  { modelName: 'Z 1000', yearFrom: 2010, yearTo: 2020, component: 'Checagem de conectores e chicote elétrico', intervalKm: null, intervalMonths: 12, notes: 'Unidades mais antigas (2010-2013) já têm mais de uma década de uso.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Z 1000', yearFrom: 2010, yearTo: 2020, component: 'Checagem de aperto do motor no chassi', intervalKm: 30000, intervalMonths: null, notes: 'Previne vibração em alta velocidade.', priority: 'LOW', order: 9 },

  // Z H2
  { modelName: 'Z H2', yearFrom: 2020, yearTo: null, component: 'Óleo 10W-40 JASO MA2', intervalKm: 6000, intervalMonths: 6, notes: 'Motor 998cc supercharged. Nunca atrasar — motor de altíssima performance.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Z H2', yearFrom: 2020, yearTo: null, component: 'Vela — verificação em concessionária', intervalKm: 18000, intervalMonths: null, notes: 'Diagnóstico requer scanner específico Kawasaki.', priority: 'HIGH', order: 2 },
  { modelName: 'Z H2', yearFrom: 2020, yearTo: null, component: 'Lubrificação da corrente de alta resistência', intervalKm: 500, intervalMonths: null, notes: 'DID ZVMX ou equivalente — 200cv exige corrente premium.', priority: 'HIGH', order: 3 },
  { modelName: 'Z H2', yearFrom: 2020, yearTo: null, component: 'Revisão completa em concessionária especializada', intervalKm: 12000, intervalMonths: 12, notes: 'Inclui checagem do sistema de arrefecimento sob maior carga térmica (sem intercooler).', priority: 'CRITICAL', order: 4 },
  { modelName: 'Z H2', yearFrom: 2020, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Bienal obrigatório — freios de alta performance.', priority: 'HIGH', order: 5 },
  { modelName: 'Z H2', yearFrom: 2020, yearTo: null, component: 'Diagnóstico do sistema supercharger (scanner Kawasaki)', intervalKm: 24000, intervalMonths: 24, notes: 'Exclusivo de concessionária equipada — não usar oficina genérica.', priority: 'CRITICAL', order: 6 },
  { modelName: 'Z H2', yearFrom: 2020, yearTo: null, component: 'Kit relação de alta resistência', intervalKm: 20000, intervalMonths: null, notes: 'Desgaste acelerado se uso for predominantemente urbano.', priority: 'HIGH', order: 7 },
  { modelName: 'Z H2', yearFrom: 2020, yearTo: null, component: 'Nível de líquido de arrefecimento', intervalKm: null, intervalMonths: 3, notes: 'Sistema trabalha sob mais carga térmica sem intercooler.', priority: 'HIGH', order: 8 },
  { modelName: 'Z H2', yearFrom: 2020, yearTo: null, component: 'Pneus de alta performance — inspeção de desgaste', intervalKm: 5000, intervalMonths: null, notes: 'Nunca substituir por pneus de linha inferior — 200cv e 280km/h exigem pneu adequado.', priority: 'CRITICAL', order: 9 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Kawasaki Linha Z (300 / 400 / 500 / 650 / 650RS / 900 / 900RS / 1000 / H2)...')

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

  console.log('✅ Kawasaki Linha Z concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
