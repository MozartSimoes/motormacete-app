// seed-kawasaki-vulcan-eliminator.ts — Kawasaki Vulcan S (650) e Eliminator 500 (cruisers)
// Um dos arquivos de seed da marca Kawasaki — usa upsert no Brand para evitar duplicidade
// com os arquivos irmãos (Z-series, Versys, Ninja Super, KLX/KX).
// Execute: pnpm --filter @motormacete/database db:seed:kawasaki-vulcan-eliminator
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

// ─── VULCAN S (inclui SE e CAFÉ) ────────────────────────────────────────────
// Motor: 649cc paralelo-twin DOHC 8V arrefecido a líquido | 61 cv @ 7.500 rpm | torque 6,5 kgf.m @ 6.600 rpm
// Diâmetro×curso 83,0×60,0mm | Compressão 10,8:1 | Injeção eletrônica
// Óleo 10W-40 JASO MA2 ~1,8L (reabastecimento) / 2,3L (primeira carga, com filtro) | Vela NGK CR9EIA-9 (iridium original)
// Pneu: 120/70-18 (F) / 160/60-17 (R, a partir de ~2023) ou 160/70-17 (2015-2022) | Corrente 520×120, pinhão 15T / coroa 46T
// Tanque 14L | Assento ajustável Ergo-Fit: 705mm (mais baixo do mercado) até ~740mm conforme configuração

const VULCANS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA2 — cerca de 1,8L na troca de rotina; 2,3L na primeira carga com filtro',
    body: 'O motor 649cc DOHC paralelo-twin da Vulcan S tem embreagem multidisco em banho de óleo — use sempre 10W-40 com selo JASO MA2 (nunca óleo automotivo puro sem esse selo, risco de a embreagem escorregar). Capacidade de reabastecimento comum (troca de rotina com filtro): aproximadamente 1,8L; a primeira carga de fábrica ou após desmontagem total do motor costuma levar cerca de 2,3L — confirme no manual da sua unidade específica, pois pode variar levemente por ano. Marcas recomendadas: Motul 5100 10W-40, Lubrax Moto 4T 10W-40, Shell Advance Ultra 4T. Intervalo: 6.000 km ou 6 meses.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR9EIA-9 (iridium original) — já vem premium de fábrica, dura 20.000+ km',
    body: 'A Vulcan S usa vela NGK CR9EIA-9, iridium laser original — mesmo padrão usado na Z650 (motor da mesma família 649cc). É item premium de fábrica: não há necessidade de "upgrade" de vela. Durabilidade esperada: 20.000-25.000 km em uso normal. Sintomas de vela gasta: partida a frio mais demorada, leve trepidação em marcha lenta, engasgo sob carga. Custo de reposição: R$ 45-70 por unidade — compre a original ou equivalente iridium de qualidade, não convencional, para preservar a resposta do motor.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520×120 elos, pinhão 15T / coroa 46T — lubrifique a cada 500-700 km',
    body: 'A Vulcan S usa corrente 520 com 120 elos, pinhão de 15 dentes e coroa de 46 dentes. Lubrifique a cada 500-700 km (mais frequente com chuva ou uso urbano com poeira). Folga correta: 25-35mm no centro do trecho inferior, moto no cavalete central e marcha em ponto morto. Kits de relação completos disponíveis no Brasil: DID 520VX3 (com O-ring) ou RK GB520 com pinhão JT — R$ 400-650 o kit completo (corrente + pinhão + coroa). Nunca troque só a corrente com coroa/pinhão gastos — desgasta a peça nova rapidamente.',
  },
  {
    severity: 'OK',
    title: 'Ergo-Fit: guidão, pedaleiras e banco ajustáveis — regule para o seu tamanho antes de rodar muito',
    body: 'O grande diferencial da Vulcan S para uma cruiser tradicional é o sistema Ergo-Fit: três posições de guidão, três posições de pedaleiras (padrão, avançada, recuada) e opções de banco que alteram a altura do assento — mais de 18 combinações possíveis. A altura de assento pode chegar a apenas 705mm na configuração mais baixa, uma das menores do mercado, ideal para pilotos de estatura baixa. Antes de comprar acessórios ou reclamar de desconforto, verifique com a concessionária se sua moto já está configurada no ajuste ideal para sua estatura — muitas unidades usadas ficam na configuração de fábrica sem ajuste.',
  },
  {
    severity: 'OK',
    title: 'Pneus: dianteiro 120/70-18, traseiro 160/70-17 (2015-2022) ou 160/60-17 (facelift 2023+)',
    body: 'Atenção ao comprar pneu traseiro: a Vulcan S mudou a medida traseira ao longo dos anos. Modelos 2015-2022 usam 160/70-17; a partir do facelift de 2023 (SE/Café inclusos), a medida passou a 160/60-17 — perfil mais baixo. Confirme a medida gravada no flanco do pneu original antes de comprar reposição, não confie apenas no ano de fabricação. Marcas recomendadas: Michelin Commander III, Pirelli Night Dragon, Metzeler Cruisetec — todas disponíveis nas duas medidas no Brasil.',
  },
  {
    severity: 'OK',
    title: 'Marcha lenta e resposta de acelerador: a injeção eletrônica é sensível a filtro de ar sujo',
    body: 'Assim como outros modelos da família de motor 649cc Kawasaki (Z650, Ninja 650), a Vulcan S apresenta marcha lenta instável ou leve engasgo quando o filtro de ar está sujo ou a vela está gasta — raramente é falha eletrônica. Antes de suspeitar de problema na ECU, faça a checagem básica: filtro de ar (trocar a cada 12.000-18.000 km) e vela (verificar gap e desgaste). Combustível de má qualidade agrava esse sintoma no Brasil.',
  },
  {
    severity: 'WARN',
    title: 'Peso e centro de gravidade baixo: cuidado redobrado em lombadas e valetas',
    body: 'A configuração cruiser da Vulcan S tem centro de gravidade baixo e menor distância ao solo do que uma naked — combinado com a suspensão relativamente macia, a moto é mais sensível a lombadas altas e buracos profundos. Reduza a velocidade em lombadas não sinalizadas e evite acelerar bruscamente sobre valetas — o cárter e o escapamento inferior ficam mais expostos que em motos de maior altura livre do solo.',
  },
]

const VULCANS_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vazamento prematuro nos amortecedores traseiros — problema documentado por proprietários no Brasil',
    body: 'Há relatos documentados de vazamento de óleo nos dois amortecedores traseiros com apenas 6.000-12.000 km de uso, bem abaixo da vida útil esperada. Sintoma: mancha de óleo visível no corpo do amortecedor, perda de amortecimento (moto "pula" mais em buracos). Se identificar esse sintoma dentro do prazo de garantia, acione a concessionária — é passível de garantia por defeito de vedação. Fora da garantia, o conserto ou substituição do par de amortecedores gira em torno de R$ 800-1.200.',
  },
  {
    severity: 'WARN',
    title: 'Vibração na traseira em velocidade — pode quebrar placa e parafusos de suporte',
    body: 'Proprietários relatam vibração perceptível na traseira que aumenta com a velocidade, ao ponto de rachar ou quebrar a placa de identificação em poucos dias de uso e afrouxar parafusos do suporte de placa/paralama traseiro. Use fita dupla-face reforçada ou borracha amortecedora entre a placa e o suporte, e verifique o aperto dos parafusos de fixação da traseira a cada 3.000 km. Considere um suporte de placa reforçado (aftermarket) se o problema persistir.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pela bengala dianteira após cerca de 1 ano de uso',
    body: 'Alguns proprietários relatam vazamento de óleo pela bengala dianteira (retentor) após aproximadamente 1 ano de fabricação, mesmo com uso moderado. Sintoma: óleo escuro visível no tubo interno da bengala, amortecimento dianteiro mais macio que o normal. Verifique visualmente as duas bengalas a cada revisão. Retentor de reposição (medida a confirmar pelo código gravado na peça original) custa R$ 40-90 o par; mão de obra de troca R$ 150-300.',
  },
  {
    severity: 'WARN',
    title: 'Banco de garupa pouco confortável para passageiros acima de 60kg em viagens longas',
    body: 'O banco de garupa de série da Vulcan S é compacto e com amortecimento limitado — proprietários relatam desconforto para o passageiro em viagens de mais de 1 hora, especialmente se o passageiro pesar mais de 50-60kg. Não é defeito, é limitação de projeto da versão base. Bancos de garupa "conforto" ou "touring" aftermarket (Kawasaki Genuine Accessories ou marcas de estofamento sob medida) resolvem o problema para quem roda com garupa com frequência.',
  },
  {
    severity: 'WARN',
    title: 'Problemas elétricos ocasionais logo nas primeiras semanas de uso — verifique bateria e conectores na entrega',
    body: 'Há relatos de problemas elétricos (dificuldade de partida, luzes de aviso no painel) já nas primeiras semanas de uso, exigindo múltiplas idas à concessionária. Na maior parte dos casos documentados, o problema estava ligado a bateria mal carregada de fábrica ou conector solto — não defeito estrutural do chicote. Ao retirar a moto zero km, teste a partida a frio e verifique a tensão da bateria (deve estar acima de 12,6V em repouso) antes de sair da concessionária.',
  },
  {
    severity: 'WARN',
    title: 'Altura livre do solo baixa: atenção redobrada em rampas de garagem e lombadas',
    body: 'Por ser uma cruiser de assento baixo (a partir de 705mm no ajuste mínimo do Ergo-Fit), a Vulcan S tem menor distância ao solo que uma naked ou trail — rampas de garagem íngremes e lombadas altas podem raspar o cárter ou o escapamento. Isso não é defeito, é característica de projeto; adapte a velocidade e o ângulo de abordagem nessas situações para evitar dano à parte inferior do motor.',
  },
]

const VULCANS_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Vulcan S: motor compartilhado com a linha Z650 — mesma disciplina de revisões',
    body: '1.000 km — Revisão de rodagem + troca de óleo inicial. Checar aperto geral (parafusos de acabamento e suporte de placa). | 6.000 km — Troca de óleo + filtro (10W-40 JASO MA2, ~1,8L). Lubrificar corrente 520. | 12.000 km — Revisão completa: filtro de ar, folga de válvulas (motor frio), fluido de freio, corrente/relação, inspeção visual das bengalas e amortecedores traseiros (vazamento). | 18.000 km — Óleo + filtro. Verificar vela NGK CR9EIA-9. | 24.000 km — Revisão completa novamente + avaliar kit relação 520 (pinhão 15T / coroa 46T). | 24 meses — Fluido de freio DOT 4, mesmo sem atingir o km da revisão. Atenção: verifique amortecedores traseiros quanto a vazamento a cada revisão — problema documentado em unidades com poucos km.',
  },
]

// ─── ELIMINATOR 500 (inclui SE) ──────────────────────────────────────────────
// Motor: 451cc paralelo-twin DOHC 8V arrefecido a líquido | 51 cv @ 10.000 rpm | torque 4,3 kgf.m @ 7.500 rpm
// Diâmetro×curso 70,0×58,6mm | Compressão 11,3:1 | Injeção eletrônica dupla (2× 32mm)
// Óleo 10W-40 API SG JASO MA ~2,4L | Embreagem multidisco em banho de óleo com assist & slipper
// Pneu: 130/70-18 (F) / 150/80-16 (R) | Corrente, relação final 3.071:1 | Tanque 13-14L | Assento 735mm (mais baixo da linha 250-500cc Kawasaki)
// Lançada no Brasil em 2024/2025 — modelo recente, histórico de longo prazo ainda limitado

const ELIMINATOR500_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 API SG / JASO MA — capacidade aproximada de 2,4L; siga o manual da sua unidade',
    body: 'O motor 451cc DOHC paralelo-twin da Eliminator 500 (mesma família mecânica da Ninja 400/Z400/Z500) usa óleo 10W-40 com classificação API SG e selo JASO MA — obrigatório pela embreagem em banho de óleo com sistema assist & slipper. Capacidade de referência: cerca de 2,4L na troca com filtro (confirme a capacidade exata no manual do proprietário da sua unidade, pois pode variar ±0,1-0,2L conforme ano/versão). Marcas recomendadas: Motul 5100 10W-40, Lubrax Moto 4T, Shell Advance 4T. Intervalo: 5.000-6.000 km ou 6 meses.',
  },
  {
    severity: 'OK',
    title: 'Motor 451cc é evolução da família 399cc (Z400/Ninja 400) — peças e conhecimento técnico compartilhados',
    body: 'A Eliminator 500 usa uma versão aumentada (451cc, diâmetro×curso 70,0×58,6mm) do motor 399cc encontrado na Z400/Ninja 400/Z500. Isso significa que muito do conhecimento de manutenção, ferramentas especiais e até algumas peças de motor (filtros, alguns componentes de embreagem) têm boa chance de compatibilidade parcial — mas confirme sempre com a concessionária antes de comprar peças "compatíveis" de outros modelos, pois o motor recebeu revisão interna real, não é apenas retune.',
  },
  {
    severity: 'OK',
    title: 'Pneus: dianteiro 130/70-18, traseiro 150/80-16 — pressão 32 PSI (F) / 36 PSI (R) solo',
    body: 'Medidas oficiais: dianteiro 130/70-18 M/C 63H e traseiro 150/80-16 M/C 71H — perfil alto típico de cruiser, diferente da Vulcan S que usa aro 17 na traseira. Pressão recomendada pelo manual: 32 PSI dianteiro e 36 PSI traseiro com piloto solo; com garupa, o dianteiro permanece em 32 PSI e o traseiro sobe para 40 PSI. Sempre calibre a frio. Pneus recomendados: Michelin Commander III Cruiser, Pirelli Night Dragon, Metzeler Cruisetec — verifique disponibilidade das medidas 130/70-18 e 150/80-16 no Brasil antes de fechar a compra, pois é combinação menos comum que a das cruisers maiores.',
  },
  {
    severity: 'OK',
    title: 'Assento a 735mm: o mais baixo da linha Kawasaki 250-500cc — ótimo para iniciantes e pilotos baixos',
    body: 'Com apenas 735mm de altura de assento e peso de ordem de marcha de 176kg, a Eliminator 500 é uma das cruisers mais acessíveis para pilotos de estatura baixa ou iniciantes na categoria. Isso não compromete a estabilidade em rodovia graças à distância entre eixos de 1.520mm. Ao comprar bancos aftermarket, tenha atenção: bancos "conforto" que aumentam a altura do assento podem comprometer esse diferencial de acessibilidade — teste sentado antes de trocar.',
  },
  {
    severity: 'OK',
    title: 'Embreagem assist & slipper — evita travamento da roda traseira em reduções bruscas',
    body: 'A Eliminator 500 vem com embreagem multidisco em banho de óleo com sistema assist & slipper, que reduz o esforço na alavanca no trânsito e evita o "travamento" da roda traseira em reduções de marcha agressivas — recurso normalmente visto em motos mais caras. Para o sistema funcionar como projetado, mantenha sempre o óleo no nível correto e use óleo com selo JASO MA — óleo automotivo sem esse selo compromete o funcionamento do assist & slipper além de causar patinação.',
  },
  {
    severity: 'OK',
    title: 'Consumo econômico: espere entre 25-30 km/l em uso urbano/misto',
    body: 'Com motor de injeção eletrônica dupla (2× 32mm) bem calibrado e peso relativamente baixo, a Eliminator 500 entrega consumo econômico para uma cruiser — na faixa de 25 a 30 km/l em uso misto, podendo variar conforme o estilo de pilotagem. Com tanque de 13-14L, a autonomia fica entre 325-420 km, adequada para uso diário e viagens de fim de semana.',
  },
  {
    severity: 'OK',
    title: 'Modelo recente no Brasil: acompanhe recalls e siga o cronograma conservador do manual',
    body: 'Lançada no Brasil em 2024/2025, a Eliminator 500 ainda não acumulou histórico extenso de durabilidade de peças e desgastes no mercado nacional. Siga rigorosamente o cronograma do manual do proprietário (não estenda intervalos "por experiência" como se faz com modelos mais antigos e bem documentados) e acompanhe periodicamente o site oficial de recalls da Kawasaki do Brasil pelo chassi da sua unidade.',
  },
]

const ELIMINATOR500_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Caso documentado de embreagem substituída prematuramente — fique atento a patinação ou dureza anormal',
    body: 'Há relato registrado de embreagem que precisou ser substituída antes do esperado em unidade da Eliminator 500, sugerindo possível variação de qualidade em algum lote. Se notar patinação sob carga (aceleração não corresponde ao giro do motor), dureza excessiva na alavanca, ou cheiro de queimado vindo da região do motor, leve para avaliação na concessionária imediatamente — ainda dentro do prazo de garantia isso deve ser coberto sem custo.',
  },
  {
    severity: 'WARN',
    title: 'Caso documentado de rachadura de solda no escapamento — inspecione visualmente nas primeiras revisões',
    body: 'Foi registrado caso de rachadura na solda do sistema de escapamento em unidade da Eliminator 500, com moto retida por semanas na concessionária para resolução. Inclua uma inspeção visual do escapamento (soldas, suportes, calor excessivo em algum ponto específico) nas primeiras revisões. Ruído anormal ou vazamento de gases pelo corpo do escapamento (não pela saída) é sinal de alerta.',
  },
  {
    severity: 'WARN',
    title: 'Potência de 51 cv é modesta para ultrapassagens em rodovia com garupa/bagagem',
    body: 'Apesar do bom equilíbrio geral, a Eliminator 500 tem potência mais contida (51 cv) que cruisers de cilindrada maior. Pilotos vindos de motos com mais de 650cc podem sentir a aceleração mais "contida" em ultrapassagens em rodovia, principalmente com passageiro e bagagem. Não é defeito — é característica de categoria de entrada/intermediária. Planeje ultrapassagens com mais antecedência nessas condições.',
  },
  {
    severity: 'WARN',
    title: 'Acabamento e ergonomia adequados, mas não no nível de modelos premium do segmento',
    body: 'Por ser posicionada como cruiser mais acessível da linha Kawasaki, alguns detalhes de acabamento (plásticos, revestimento de parafusos, qualidade de alguns componentes visíveis) refletem o posicionamento de preço da moto e não têm o refinamento de modelos premium (como a própria Vulcan S ou concorrentes de segmento superior). Não afeta a mecânica ou a confiabilidade, mas é um ponto a considerar na expectativa de compra.',
  },
  {
    severity: 'WARN',
    title: 'Modelo novo: poucos dados de longo prazo — sem histórico consolidado de desgastes típicos ainda',
    body: 'Por ter chegado ao Brasil apenas em 2024/2025, a Eliminator 500 ainda não tem um corpo de relatos consolidado sobre desgastes recorrentes de peças específicas (retentores, correntes, elétrica) como modelos mais antigos da linha Kawasaki. Os problemas documentados até o momento (embreagem e escapamento) são casos isolados registrados publicamente, não padrões estatisticamente confirmados. Acompanhe fóruns e grupos de proprietários à medida que a frota acumula quilometragem.',
  },
]

const ELIMINATOR500_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Eliminator 500: siga o manual do proprietário — modelo novo com pouco ajuste de campo documentado',
    body: '1.000 km — Revisão de rodagem, troca de óleo inicial, checagem geral de aperto (parafusos de acabamento, suportes). Inspeção visual do escapamento (soldas). | 5.000-6.000 km — Troca de óleo + filtro (10W-40 API SG/JASO MA, ~2,4L). | 12.000 km — Revisão completa: válvulas, corrente, filtro de ar, fluido de freio, inspeção da embreagem quanto a patinação ou dureza anormal. | 18.000 km — Óleo + filtro. | 24.000 km — Revisão completa + avaliar kit relação. | A cada 500-700 km — Lubrificação de corrente. Sempre confirme os intervalos exatos no manual impresso ou digital específico do ano/versão da sua unidade — modelo recente pode ter ajustes de cronograma entre anos-modelo.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'VULCAN S',
    yearFrom: 2015,
    yearTo: null,
    MACETES: VULCANS_MACETES,
    PROBLEMAS: VULCANS_PROBLEMAS,
    MANUTENCAO: VULCANS_MANUTENCAO,
  },
  {
    modelName: 'ELIMINATOR 500',
    yearFrom: 2024,
    yearTo: null,
    MACETES: ELIMINATOR500_MACETES,
    PROBLEMAS: ELIMINATOR500_PROBLEMAS,
    MANUTENCAO: ELIMINATOR500_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'VULCAN S',
    yearFrom: 2015, yearTo: null,
    tireSize: '120/70-18 (F) · 160/70-17 ou 160/60-17 conforme ano (R)',
    frontPsi: 32, rearPsi: 36,
    frontPsiLoad: 32, rearPsiLoad: 36,
    notes: 'Solo: F 32 / R 36 PSI (etiqueta oficial Kawasaki). Com garupa/bagagem, aumente a pressão traseira em cerca de 3-4 PSI conforme o manual da sua unidade. Sempre calibre a frio. Pneu traseiro mudou de medida entre 2015-2022 (160/70-17) e o facelift 2023+ (160/60-17) — confirme a medida gravada no flanco antes de comprar reposição. Pneus recomendados: Michelin Commander III, Pirelli Night Dragon, Metzeler Cruisetec.',
  },
  {
    modelName: 'ELIMINATOR 500',
    yearFrom: 2024, yearTo: null,
    tireSize: '130/70-18 (F) · 150/80-16 (R)',
    frontPsi: 32, rearPsi: 36,
    frontPsiLoad: 32, rearPsiLoad: 40,
    notes: 'Solo: F 32 / R 36 PSI. Com garupa: F 32 / R 40 PSI (segundo manual do proprietário). Sempre calibre a frio. Perfil de pneu mais alto (aro 16 traseiro) que a Vulcan S — verifique disponibilidade das medidas específicas antes de comprar reposição, pois é combinação menos comum no mercado brasileiro. Pneus recomendados: Michelin Commander III Cruiser, Pirelli Night Dragon.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // VULCAN S
  { modelName: 'VULCAN S', yearFrom: 2015, yearTo: null, component: 'Óleo 10W-40 JASO MA2 (~1,8L reabastecimento)', intervalKm: 6000, intervalMonths: 6, notes: 'Motor 649cc DOHC. Embreagem em banho de óleo — nunca usar óleo sem selo JASO MA2.', priority: 'HIGH', order: 1 },
  { modelName: 'VULCAN S', yearFrom: 2015, yearTo: null, component: 'Filtro de óleo', intervalKm: 6000, intervalMonths: 6, notes: 'Trocar junto com o óleo. Aplicar óleo no O-ring antes de montar.', priority: 'MEDIUM', order: 2 },
  { modelName: 'VULCAN S', yearFrom: 2015, yearTo: null, component: 'Vela NGK CR9EIA-9 (iridium original)', intervalKm: 20000, intervalMonths: null, notes: 'Verificar desgaste/gap a cada 6.000 km. Já é item premium de fábrica.', priority: 'MEDIUM', order: 3 },
  { modelName: 'VULCAN S', yearFrom: 2015, yearTo: null, component: 'Lubrificação corrente 520×120 (pinhão 15T / coroa 46T)', intervalKm: 600, intervalMonths: null, notes: 'Folga 25-35mm no centro do trecho inferior. Mais frequente com chuva.', priority: 'HIGH', order: 4 },
  { modelName: 'VULCAN S', yearFrom: 2015, yearTo: null, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Trocar. Filtro sujo causa marcha lenta instável e engasgo.', priority: 'MEDIUM', order: 5 },
  { modelName: 'VULCAN S', yearFrom: 2015, yearTo: null, component: 'Folga de válvulas', intervalKm: 12000, intervalMonths: 12, notes: 'Motor frio obrigatório. Verificar no cronograma de revisão completa.', priority: 'HIGH', order: 6 },
  { modelName: 'VULCAN S', yearFrom: 2015, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 18000, intervalMonths: 24, notes: 'Bienal obrigatório mesmo sem atingir o km da revisão.', priority: 'HIGH', order: 7 },
  { modelName: 'VULCAN S', yearFrom: 2015, yearTo: null, component: 'Kit relação 520 (pinhão 15T + coroa 46T + corrente)', intervalKm: 24000, intervalMonths: null, notes: 'DID 520VX3 ou RK GB520 + pinhão JT. Trocar kit completo.', priority: 'HIGH', order: 8 },
  { modelName: 'VULCAN S', yearFrom: 2015, yearTo: null, component: 'Inspeção de vazamento nos amortecedores traseiros', intervalKm: 6000, intervalMonths: 6, notes: 'Problema documentado: vazamento prematuro entre 6.000-12.000 km. Verificar em toda revisão.', priority: 'HIGH', order: 9 },
  { modelName: 'VULCAN S', yearFrom: 2015, yearTo: null, component: 'Verificação de vazamento na bengala dianteira', intervalKm: 12000, intervalMonths: 12, notes: 'Retentor pode vazar após ~1 ano de uso segundo relatos de proprietários.', priority: 'MEDIUM', order: 10 },

  // ELIMINATOR 500
  { modelName: 'ELIMINATOR 500', yearFrom: 2024, yearTo: null, component: 'Óleo 10W-40 API SG / JASO MA (~2,4L)', intervalKm: 6000, intervalMonths: 6, notes: 'Motor 451cc DOHC. Embreagem assist & slipper em banho de óleo — selo JASO MA obrigatório.', priority: 'HIGH', order: 1 },
  { modelName: 'ELIMINATOR 500', yearFrom: 2024, yearTo: null, component: 'Filtro de óleo', intervalKm: 6000, intervalMonths: 6, notes: 'Trocar junto com o óleo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'ELIMINATOR 500', yearFrom: 2024, yearTo: null, component: 'Vela de ignição (verificar manual — família motor 451cc)', intervalKm: 12000, intervalMonths: null, notes: 'Confirmar código exato no manual da sua unidade — motor recente, priorizar concessionária.', priority: 'MEDIUM', order: 3 },
  { modelName: 'ELIMINATOR 500', yearFrom: 2024, yearTo: null, component: 'Lubrificação de corrente (relação final 3.071:1)', intervalKm: 600, intervalMonths: null, notes: 'Lubrificar a cada 500-700 km. Modelo novo: seguir cronograma conservador do manual.', priority: 'HIGH', order: 4 },
  { modelName: 'ELIMINATOR 500', yearFrom: 2024, yearTo: null, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Trocar conforme manual do proprietário.', priority: 'MEDIUM', order: 5 },
  { modelName: 'ELIMINATOR 500', yearFrom: 2024, yearTo: null, component: 'Folga de válvulas', intervalKm: 12000, intervalMonths: 12, notes: 'Motor frio. Verificar na revisão completa de 12.000 km.', priority: 'HIGH', order: 6 },
  { modelName: 'ELIMINATOR 500', yearFrom: 2024, yearTo: null, component: 'Fluido de freio DOT 4 (freio dianteiro 310mm + traseiro 240mm, ambos com ABS)', intervalKm: 18000, intervalMonths: 24, notes: 'Bienal obrigatório. Sistema com ABS de série.', priority: 'HIGH', order: 7 },
  { modelName: 'ELIMINATOR 500', yearFrom: 2024, yearTo: null, component: 'Inspeção da embreagem (patinação, dureza anormal)', intervalKm: 6000, intervalMonths: 6, notes: 'Caso documentado de substituição prematura — monitorar em cada revisão.', priority: 'MEDIUM', order: 8 },
  { modelName: 'ELIMINATOR 500', yearFrom: 2024, yearTo: null, component: 'Inspeção visual do escapamento (soldas, suportes)', intervalKm: 6000, intervalMonths: 6, notes: 'Caso documentado de rachadura de solda — checar visualmente nas revisões.', priority: 'MEDIUM', order: 9 },
  { modelName: 'ELIMINATOR 500', yearFrom: 2024, yearTo: null, component: 'Kit relação — avaliar desgaste', intervalKm: 24000, intervalMonths: null, notes: 'Modelo novo: sem histórico de durabilidade consolidado ainda, inspecionar com atenção.', priority: 'MEDIUM', order: 10 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Kawasaki Vulcan S / Eliminator 500...')

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

  console.log('✅ Kawasaki Vulcan S / Eliminator 500 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
