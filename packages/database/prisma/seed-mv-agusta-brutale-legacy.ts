// seed-mv-agusta-brutale-legacy.ts — MV Agusta Brutale 910R/910S/989R/1078RR/1090R/1090RR
// Linhagem naked italiana com motor 4 cilindros em linha (base F4), descontinuada e
// substituída pela Brutale 800 (motor 3 cilindros) a partir de 2012.
// Motos exóticas de nicho no Brasil — rede MV Agusta pequena, peças legadas raras/caras.
// Execute: pnpm --filter @motormacete/database db:seed:mv-agusta-brutale-legacy
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

// ─── BRUTALE 910R ──────────────────────────────────────────────────────────────
// Motor: 909cc DOHC 16V 4 cilindros em linha, refrigerado a líquido | ~134-144 cv @ 12.500 rpm
// (144 cv com escape racing opcional) | Torque: ~96 Nm @ 10.500 rpm | Injeção eletrônica Weber-Marelli
// Óleo: 10W-60 sintético (AGIP/Eni Racing 4T recomendado pela MV) ~3,0L com troca de filtro
// Vela: NGK CR9EB (ou iridium CR9EIB-9) | Pneu: 120/70-17 (D) / 190/50-17 (T)
// Corrente: 525 | Tanque: 21L | Produção: 2005-2008

const B910R_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-60 sintético — motor de corrida exige lubrificante de alta performance',
    body: 'O motor 909cc DOHC 16V deriva diretamente da família F4 de competição e trabalha em rotações muito altas (redline acima de 13.000 rpm). A MV Agusta especifica óleo sintético 10W-60 (a especificação original de fábrica foi feita em parceria com a AGIP/Eni Racing 4T 10W-60). Alternativas de mercado equivalentes: Motul 300V 10W-60 ou Motul 7100 10W-60. Capacidade: aproximadamente 3,0L com troca de filtro (cárter ~2,5L + radiador de óleo e mangueiras ~0,5L). NUNCA use óleo genérico 10W-40 de carro — a viscosidade mais baixa não protege adequadamente em altas rotações sustentadas.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR9EB (ou iridium CR9EIB-9) — acesso trabalhoso, planeje com antecedência',
    body: 'Vela recomendada: NGK CR9EB (convencional) ou NGK CR9EIB-9 (iridium, dura mais e melhora a resposta em alta rotação). O acesso às 4 velas do motor transversal exige remoção do tanque de combustível e parte da carenagem — não é serviço rápido de "beira de estrada". Planeje a troca junto com outras revisões que já exigem desmontagem. Gap de fábrica: seguir a especificação pré-ajustada da NGK (não requer ajuste manual em velas iridium modernas). Custo por vela: R$ 40-70 (iridium).',
  },
  {
    severity: 'WARN',
    title: 'Folga de válvulas: item caro e crítico — reserve R$ 1.500-3.000 para revisão completa',
    body: 'O motor DOHC 16V usa pastilhas (shims) para ajuste de válvulas, sistema típico de motor de alta performance mas caro de manter. A revisão de folga de válvulas deve ser feita por mecânico especializado em motores italianos de alta rotação — errar o ajuste pode causar perda de potência ou, em casos extremos, contato entre válvula e pistão. Poucas oficinas no Brasil têm experiência com o motor F4/Brutale. Busque preparadores de motos italianas em São Paulo e Rio de Janeiro que atendem Ducati/MV Agusta — eles geralmente têm o jogo de pastilhas e ferramentas certas.',
  },
  {
    severity: 'WARN',
    title: 'Peças legadas: rede MV Agusta pequena no Brasil — priorize importação e fóruns internacionais',
    body: 'A Brutale 910R foi descontinuada há quase 20 anos e a rede oficial MV Agusta no Brasil é pequena, com foco nos modelos atuais (Brutale 800). Peças de motor e elétrica específicas da série 910 são raras nacionalmente. Estratégias: (1) fóruns internacionais como MV Agusta Forum (mvagusta.net) têm classificados de peças usadas e recomendações de fornecedores; (2) importadores europeus de peças para motos italianas (Itália, Reino Unido) enviam para o Brasil via correio/courier, considerando impostos de importação; (3) desmanches de motos importadas em SP costumam ter contato com essas peças esporadicamente. Reserve tempo de espera de 3-6 semanas para peças importadas.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 — lubrifique a cada 500-600 km, moto pesada e de alta potência desgasta rápido',
    body: 'A Brutale 910R usa corrente 525 (dimensionada para lidar com os ~134-144 cv do motor). Lubrifique a cada 500-600 km com spray de corrente de qualidade (Motul Chain Lube Road ou similar) — a alta potência entregue de forma abrupta acelera o desgaste se a corrente estiver seca. Kit de relação completo (corrente + pinhão + coroa) de marcas como DID ou RK: R$ 600-1.000, geralmente importado. Verifique a folga regularmente (20-30mm no centro do trecho inferior) — corrente frouxa em moto deste porte é risco de segurança.',
  },
  {
    severity: 'OK',
    title: 'Pneus 120/70-17 / 190/50-17 — pneus esportivos de alta performance são obrigatórios',
    body: 'Com ~134-144 cv em uma naked relativamente leve, a Brutale 910R exige pneus de composto esportivo em bom estado. Recomendados: Pirelli Diablo Rosso III/IV, Michelin Pilot Power/Road 5, ou Metzeler Sportec/Roadtec. Evite pneus econômicos genéricos — a moto tem potência suficiente para expor limitações de aderência rapidamente, especialmente em piso molhado. Substitua ao atingir o TWI (indicador de desgaste) ou a cada 3-4 anos por degradação do composto, mesmo com sulco aparente.',
  },
  {
    severity: 'WARN',
    title: 'Filtro de ar e combustível: verifique compatibilidade antes de comprar genérico',
    body: 'O filtro de ar da Brutale 910R tem formato específico do chassi tubular MV Agusta — nem sempre um filtro "genérico 4 cilindros" encaixa corretamente. Prefira comprar da marca K&N com código específico MV Agusta 910 (K&N fabrica réplica de alto fluxo para este modelo) ou filtro original importado. O filtro de combustível costuma ser integrado à bomba dentro do tanque — ao trocar, use kit de reparo de bomba compatível ou leve a especialista para não danificar o conjunto, que é caro de substituir por completo.',
  },
  {
    severity: 'OK',
    title: 'Conservação: motor italiano de nicho pede armazenamento e cuidados extras',
    body: 'Se a moto ficar parada por períodos longos (mais de 30 dias), use estabilizador de combustível no tanque, mantenha a bateria em carregador de manutenção (tender), e gire o motor manualmente ocasionalmente para não empastar o óleo nos anéis. Cubra a moto e evite exposição a sol direto — plásticos e adesivos da carenagem italiana desbotam e ressecam mais rápido que os de motos japonesas. Revisão pré-uso após armazenamento longo é essencial, especialmente checando o sistema elétrico.',
  },
]

const B910R_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Regulador/retificador de tensão: histórico de falhas na série 910',
    body: 'Um dos pontos fracos documentados nos fóruns internacionais (MV Agusta Forum) é a falha do regulador/retificador de tensão, que pode causar sobrecarga elétrica, dano à bateria e até queima de componentes do chicote. Sintomas: bateria não carrega (tensão abaixo de 13V com moto em marcha a 4.000 rpm), luzes do painel piscando de forma errática, bateria "cozinhando" (cheiro de enxofre, superaquecimento). Monitore a tensão da bateria periodicamente com multímetro. Substituição preventiva é recomendada após 30.000-40.000 km ou 5-6 anos de uso.',
  },
  {
    severity: 'WARN',
    title: 'Sensores de injeção eletrônica Weber-Marelli: falhas intermitentes documentadas',
    body: 'O sistema de injeção eletrônica Weber-Marelli da série 910/989 é sensível a falhas de sensores (TPS — sensor de posição do acelerador, sensor de temperatura do motor, sensor de fase). Sintomas: marcha lenta instável, corte de motor em rotações específicas, luz de injeção acesa no painel. Como o sistema é próprio da MV Agusta (diferente de motos japonesas), o diagnóstico exige scanner compatível com o protocolo Weber-Marelli — poucas oficinas genéricas têm essa ferramenta. Procure oficinas especializadas em motos europeias/italianas para diagnóstico correto.',
  },
  {
    severity: 'WARN',
    title: 'Vazamentos pela junta do cabeçote e retentores em motos com quilometragem alta',
    body: 'Motos com mais de 40.000-50.000 km, especialmente as que passaram por longos períodos sem uso adequado, apresentam vazamentos de óleo pela junta do cabeçote ou pelos retentores de válvula. Sintoma: mancha de óleo na base do motor, consumo de óleo acima do normal (mais de 300-500mL a cada 1.000 km é sinal de alerta). Como o motor é de alta rotação, mesmo pequenos vazamentos merecem atenção imediata — óleo insuficiente em rotações de 10.000+ rpm causa dano severo rapidamente.',
  },
  {
    severity: 'DANGER',
    title: 'Embreagem: desgaste acelerado com uso urbano ou pilotagem agressiva',
    body: 'A embreagem multidisco a óleo da Brutale 910R sofre desgaste mais rápido que o esperado em uso predominantemente urbano (muitos engates) ou pilotagem esportiva com "arrancadas". Sintomas: patinação da embreagem em altas rotações, ponto de engate impreciso, alavanca com curso alterado. Discos de embreagem de reposição são peça de importação — verifique disponibilidade antes de decidir por revisão completa versus troca de componentes específicos. Ajuste correto do cabo/hidráulica prolonga a vida útil.',
  },
  {
    severity: 'WARN',
    title: 'Vibração de alta rotação: desgaste de coxins do motor e parafusos de fixação',
    body: 'O motor 4 cilindros em linha de alta rotação transmite vibração perceptível ao chassi, especialmente acima de 9.000 rpm. Com o tempo, coxins de borracha do motor e parafusos de fixação do carenagem/painel podem afrouxar ou rachar. Inspecione periodicamente o aperto dos parafusos do subchassi e da fixação do motor — parafusos soltos pioram a vibração percebida e podem causar folga estrutural. Use Loctite médio (azul) na remontagem de parafusos que vibram para fora com frequência.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico e chicote: conectores de qualidade variável, oxidação em clima úmido',
    body: 'Assim como outras motos italianas de baixa produção da época, o chicote elétrico da série 910 tem conectores que podem oxidar em climas litorâneos ou muito úmidos (comum em boa parte do Brasil). Sintomas: instrumentação com leituras erráticas, luzes de indicadores falhando intermitentemente. Solução preventiva: aplicar graxa dielétrica nos conectores acessíveis a cada revisão anual e verificar o aterramento (massa) do motor ao chassi, ponto comum de falha por oxidação.',
  },
]

const B910R_MANUTENCAO: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Cronograma Brutale 910R: revisões especializadas têm custo elevado — planeje o orçamento',
    body: '1.000 km — Troca de óleo inicial (rodagem, 10W-60 sintético). Verificação geral de aperto. | 5.000 km — Troca de óleo + filtro. Inspeção de corrente (lubrificar a cada 500-600 km). | 10.000 km — Troca de velas NGK CR9EB. Verificação do sistema de injeção (scanner Weber-Marelli). Fluido de freio se necessário. | 15.000 km — Filtro de ar. Inspeção de pastilhas de freio (Brembo). | 20.000 km — Folga de válvulas (revisão cara, R$ 1.500-3.000 em especialista — reserve orçamento). Kit relação 525 se desgastado. | 24 meses — Fluido de freio DOT 4 (troca obrigatória por absorção de umidade). | 30.000-40.000 km — Verificação/substituição preventiva do regulador de tensão (ponto de falha conhecido). Revisão completa da embreagem multidisco. Devido à raridade de peças e à necessidade de mecânico especializado em motor italiano de alta rotação, uma revisão completa nesta moto custa significativamente mais que em uma naked japonesa equivalente — pesquise oficinas com histórico comprovado em MV Agusta/Ducati antes de contratar.',
  },
]

// ─── BRUTALE 910S ──────────────────────────────────────────────────────────────
// Motor: 909cc DOHC 16V 4 cilindros em linha, refrigerado a líquido | ~136 cv @ 11.000 rpm
// (versão "Standard", ligeiramente menos potente e com mapa de injeção mais suave que a R)
// Torque: ~96 Nm | Injeção eletrônica Weber-Marelli | Óleo: 10W-60 sintético ~3,0L
// Vela: NGK CR9EB | Pneu: 120/70-17 (D) / 190/50-17 (T) | Corrente: 525 | Tanque: 21L | Produção: 2005-2008

const B910S_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-60 sintético — mesma exigência técnica da versão R, motor compartilhado',
    body: 'A Brutale 910S usa a mesma base de motor 909cc DOHC 16V da 910R, com mapa de injeção e potência de pico ligeiramente diferentes (~136 cv vs 134-144 cv da R). A exigência de lubrificante é idêntica: óleo sintético 10W-60 (AGIP/Eni Racing 4T ou equivalente Motul 300V/7100 10W-60). Capacidade: ~3,0L com troca de filtro. Intervalo recomendado: a cada 5.000 km ou 12 meses, o que ocorrer primeiro — motor de alta rotação degrada o óleo mais rápido que motores de baixa rotação de mesma cilindrada.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR9EB — mesmo padrão da 910R, troque em jogo de 4',
    body: 'Vela recomendada: NGK CR9EB (convencional) ou NGK CR9EIB-9 (iridium). Sempre troque as 4 velas juntas — misturar velas novas com gastas causa combustão desigual entre cilindros e vibração adicional. Acesso trabalhoso (remoção parcial de tanque/carenagem), planeje junto com outras revisões. Custo por jogo completo: R$ 160-280 (iridium).',
  },
  {
    severity: 'WARN',
    title: 'Diferença de mapa de injeção S vs R: não instale peças de escape/ECU da R sem revisar o mapa',
    body: 'A versão S tem entrega de potência mais suave e progressiva que a R, resultado de mapa de injeção Weber-Marelli específico e, em alguns mercados, restrição na admissão. Se for instalar escape esportivo ou fazer upgrade de performance, ajuste o mapa de injeção correspondente — usar peças ou remapeamento pensados para a versão R sem calibração pode gerar mistura pobre, superaquecimento e até dano ao motor. Procure preparador com dinamômetro para qualquer alteração de mapa.',
  },
  {
    severity: 'WARN',
    title: 'Peças compartilhadas com a 910R facilitam mas ainda são de importação',
    body: 'A boa notícia: grande parte do motor, chassi e componentes elétricos da 910S é compartilhada com a 910R, então praticamente qualquer peça encontrada para uma serve para a outra (exceto ECU/mapa específico e alguns componentes estéticos). A má notícia: ambas dependem fortemente de importação. Fóruns como MV Agusta Forum (mvagusta.net) e grupos de proprietários em redes sociais são o melhor recurso para localizar peças usadas ou indicar fornecedores confiáveis na Europa.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 e kit relação — mesmas especificações da 910R',
    body: 'Corrente 525, lubrificação a cada 500-600 km. Kit relação completo (corrente + pinhão + coroa): R$ 600-1.000 em marcas como DID ou RK, geralmente encomendado com antecedência por não ser item de prateleira comum no Brasil. Verifique a folga regularmente (20-30mm no trecho inferior).',
  },
  {
    severity: 'OK',
    title: 'Pneus 120/70-17 / 190/50-17 — mesma exigência de composto esportivo',
    body: 'Apesar de menos radical que a R, a 910S ainda entrega mais de 130 cv. Use pneus esportivos de qualidade: Pirelli Diablo Rosso III/IV, Michelin Pilot Power, Metzeler Sportec. Evite pneus baratos genéricos — o risco de perda de aderência em uma naked com esse torque não compensa a economia.',
  },
  {
    severity: 'WARN',
    title: 'Filtro de ar específico do chassi tubular — confirme encaixe antes de comprar',
    body: 'Assim como na 910R, o filtro de ar tem formato específico do chassi MV Agusta e nem todo "genérico universal 4 cilindros" encaixa sem adaptação. Prefira K&N com código específico para MV Agusta Brutale 910 ou peça original importada. Verifique com o vendedor antes da compra se o código é compatível com a S (alguns catálogos tratam R e S como intercambiáveis, o que geralmente procede para o filtro de ar).',
  },
]

const B910S_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Regulador/retificador de tensão: mesma vulnerabilidade da 910R',
    body: 'Por compartilhar o sistema elétrico com a 910R, a 910S tem o mesmo histórico de falhas do regulador/retificador de tensão. Sintomas: bateria descarregando mesmo com moto rodando, luzes piscando sem padrão, cheiro de queimado perto da bateria em casos graves. Verifique a tensão de carga periodicamente (13,5-14,5V a 4.000 rpm é o esperado). Substituição preventiva após 30.000-40.000 km é sensata dado o histórico documentado.',
  },
  {
    severity: 'WARN',
    title: 'Sensores Weber-Marelli: falhas intermitentes exigem diagnóstico especializado',
    body: 'Mesma vulnerabilidade da 910R — sensores de injeção eletrônica (TPS, temperatura, fase) podem falhar de forma intermitente, causando marcha lenta instável ou corte de motor. Diagnóstico correto exige scanner compatível com o protocolo Weber-Marelli, disponível em oficinas especializadas em motos europeias.',
  },
  {
    severity: 'WARN',
    title: 'Vazamentos de óleo em unidades com quilometragem alta ou histórico de armazenamento longo',
    body: 'Assim como a 910R, motos com mais de 40.000 km ou que passaram longos períodos parados podem apresentar vazamento pela junta do cabeçote ou retentores. Monitore o nível de óleo regularmente e investigue qualquer mancha de óleo na base do motor.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem: desgaste em uso urbano intenso',
    body: 'A embreagem multidisco a óleo pode apresentar patinação prematura com uso urbano intenso (muitos engates em trânsito). Ajuste correto e troca de fluido/óleo no intervalo recomendado prolongam a vida útil. Peças de reposição (discos) são item de importação — verifique disponibilidade antes de planejar a revisão.',
  },
  {
    severity: 'WARN',
    title: 'Vibração em alta rotação afrouxa parafusos de carenagem e subchassi',
    body: 'O motor 4 cilindros de alta rotação transmite vibração ao chassi tubular, especialmente acima de 8.500-9.000 rpm. Parafusos de carenagem e subchassi podem afrouxar com o tempo — inspecione o aperto geral a cada revisão e use trava-rosca médio em pontos que soltam com frequência.',
  },
  {
    severity: 'WARN',
    title: 'Conectores elétricos oxidando em uso em clima úmido/litorâneo',
    body: 'Mesma vulnerabilidade documentada na 910R: conectores do chicote elétrico podem oxidar em climas úmidos, causando falhas intermitentes em luzes e instrumentação. Aplicação preventiva de graxa dielétrica nos conectores acessíveis a cada revisão anual reduz o problema.',
  },
]

const B910S_MANUTENCAO: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Cronograma Brutale 910S: idêntico à 910R, revisões especializadas custam mais',
    body: '1.000 km — Troca de óleo inicial (10W-60 sintético). | 5.000 km — Troca de óleo + filtro. Lubrificação de corrente contínua a cada 500-600 km. | 10.000 km — Jogo completo de velas NGK CR9EB. Verificação de sensores de injeção. | 15.000 km — Filtro de ar. Inspeção de pastilhas Brembo. | 20.000 km — Folga de válvulas (revisão cara — reserve R$ 1.500-3.000). Kit relação 525 se desgastado. | 24 meses — Fluido de freio DOT 4. | 30.000-40.000 km — Verificação/substituição preventiva do regulador de tensão. Revisão da embreagem. Por ser moto de nicho com peças de importação, planeje as revisões maiores com antecedência de semanas para garantir disponibilidade de peça.',
  },
]

// ─── BRUTALE 989R ──────────────────────────────────────────────────────────────
// Motor: 982,3cc (nominal "989,9cc" comercial) DOHC 16V 4 cilindros em linha, refrigerado a líquido
// Potência: ~141-142 cv @ 10.900-11.000 rpm (varia por ano/mercado) | Torque: ~104-123 Nm (varia por ano)
// Versões finais equipadas com MV Torque Shift System (escape de geometria variável)
// Injeção eletrônica Weber-Marelli | Óleo: 10W-60 sintético ~3,0L | Vela: NGK CR9EB
// Pneu: 120/70-17 (D) / 190/55-17 (T) | Corrente: 525 | Tanque: 21L | Produção: ~2005-2010

const B989R_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-60 sintético — motor mais respeitado tecnicamente da linha, merece lubrificante à altura',
    body: 'O motor 982,3cc (comercialmente chamado de "989") DOHC 16V é considerado um dos mais refinados da linha Brutale pela comunidade técnica internacional. Use óleo sintético 10W-60 (AGIP/Eni Racing 4T de fábrica, ou Motul 300V/7100 10W-60 como alternativa de mercado). Capacidade aproximada: 3,0L com troca de filtro. Não economize no lubrificante nesta moto — o motor sustenta rotações muito altas (próximo de 12.000-13.000 rpm) e a proteção do óleo é decisiva para a longevidade.',
  },
  {
    severity: 'OK',
    title: 'MV Torque Shift System (versões finais): escape de geometria variável exige atenção especial',
    body: 'Nas versões finais de produção, a Brutale 989R recebeu o MV Torque Shift System, um sistema de escape com geometria variável (válvula/borboleta no coletor) para otimizar torque em diferentes faixas de rotação. Este sistema tem componentes eletromecânicos (atuador, cabo ou motor elétrico) que podem travar ou falhar por falta de uso/lubrificação. Se sua moto tem esse sistema, verifique periodicamente se a válvula do escape se move livremente — travamento pode ser confundido com problema de motor por afetar a resposta em baixa rotação.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR9EB (ou iridium CR9EIB-9) — troque em jogo de 4',
    body: 'Vela recomendada: NGK CR9EB convencional ou CR9EIB-9 iridium (recomendada para melhor resposta e maior intervalo de troca). Sempre em jogo completo de 4. Acesso exige remoção parcial do tanque — planeje junto com outras revisões maiores.',
  },
  {
    severity: 'WARN',
    title: 'Folga de válvulas: item mais caro da manutenção, motor DOHC 16V com pastilhas',
    body: 'Assim como os demais Brutale 4 cilindros, a folga de válvulas usa sistema de pastilhas (shims) e exige desmontagem parcial do motor para ajuste. É o item de manutenção mais caro e trabalhoso do cronograma — reserve entre R$ 1.500 e R$ 3.000 dependendo da região e da oficina. Poucos mecânicos no Brasil têm experiência específica com este motor; procure preparadores que atendem MV Agusta/Ducati de alta cilindrada.',
  },
  {
    severity: 'WARN',
    title: 'Peças legadas: 989R é um dos modelos mais respeitados, mas peças ainda são de nicho',
    body: 'Apesar da reputação técnica elevada, a 989R teve produção limitada e a rede de peças no Brasil é escassa. Fóruns internacionais (MV Agusta Forum, mvagusta.net) são referência para localizar peças usadas e discussões técnicas específicas do motor 989. Considere também contato direto com preparadores europeus que fazem envio internacional — o custo de frete compensa quando comparado à indisponibilidade de peça original no mercado nacional.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 e pneus 190/55-17 — perfil de pneu traseiro mais largo que a 910',
    body: 'A 989R usa pneu traseiro 190/55-17 (perfil diferente do 190/50-17 da série 910 — confirme a medida exata gravada no pneu atual antes de comprar reposição). Corrente 525, lubrificação a cada 500-600 km. Pneus recomendados: Pirelli Diablo Rosso, Michelin Pilot Power, Metzeler Sportec — sempre composto esportivo dado o torque do motor.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar e sistema de admissão: verifique vedação após qualquer desmontagem',
    body: 'O filtro de ar (K&N com código específico MV Agusta 989 ou original importado) deve ser reinstalado com atenção à vedação da caixa de admissão — vazamento de ar não filtrado após manutenção é causa comum de desgaste prematuro de cilindro em motores de alta rotação. Ao trocar, verifique se o encaixe está firme e sem folgas.',
  },
]

const B989R_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Regulador/retificador de tensão: mesma vulnerabilidade documentada na linha 4 cilindros',
    body: 'O regulador/retificador de tensão é um ponto de falha recorrente em toda a linha Brutale 4 cilindros, incluindo a 989R. Sintomas: bateria não carrega adequadamente (abaixo de 13V a 4.000 rpm), luzes do painel com comportamento errático, superaquecimento do componente. Monitore com multímetro periodicamente e considere substituição preventiva após 30.000-40.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Sistema de escape variável (Torque Shift System): atuador pode falhar ou travar',
    body: 'Nas versões equipadas com MV Torque Shift System, o atuador da válvula de escape variável pode travar por acúmulo de fuligem ou falta de uso, ou apresentar falha elétrica no motor/cabo de acionamento. Sintoma: perda de torque em baixa/média rotação, ruído de escape diferente do normal. Verificar o funcionamento do sistema deve fazer parte da revisão anual — a limpeza da válvula com desengraxante específico geralmente resolve travamentos leves.',
  },
  {
    severity: 'WARN',
    title: 'Sensores de injeção Weber-Marelli: falhas intermitentes exigem scanner específico',
    body: 'Assim como nos demais modelos da linha, sensores de injeção (TPS, temperatura do motor, fase) podem apresentar falhas intermitentes. O diagnóstico correto exige scanner compatível com o protocolo Weber-Marelli — leve a oficina especializada em motos europeias/italianas para diagnóstico preciso, evitando trocas desnecessárias de peça por tentativa e erro.',
  },
  {
    severity: 'WARN',
    title: 'Vazamentos de óleo pela junta do cabeçote em unidades de alta quilometragem',
    body: 'Motos com mais de 40.000-50.000 km podem apresentar vazamento pela junta do cabeçote ou retentores de válvula, especialmente se passaram por períodos longos sem uso adequado. Monitore o nível de óleo regularmente — em motor de alta rotação, qualquer perda de lubrificação acelera desgaste de forma desproporcional.',
  },
  {
    severity: 'DANGER',
    title: 'Embreagem multidisco: desgaste acelerado em pilotagem esportiva ou uso urbano intenso',
    body: 'A embreagem a óleo sofre desgaste mais rápido em pilotagem agressiva (muitas trocas de marcha em alta rotação) ou em uso urbano com engates frequentes. Sintomas: patinação em altas rotações, ponto de engate impreciso. Discos de reposição são peça de importação — avalie disponibilidade e prazo antes de planejar a revisão completa.',
  },
  {
    severity: 'WARN',
    title: 'Vibração de motor em alta rotação: verifique coxins e aperto geral periodicamente',
    body: 'O motor 4 cilindros de alta rotação (redline próximo de 12.500-13.000 rpm) transmite vibração perceptível ao chassi. Parafusos de fixação de carenagem, subchassi e componentes elétricos podem afrouxar com o tempo. Inclua verificação de aperto geral em toda revisão — use trava-rosca médio em pontos recorrentes.',
  },
]

const B989R_MANUTENCAO: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Cronograma Brutale 989R: motor tecnicamente refinado, manutenção especializada e cara',
    body: '1.000 km — Troca de óleo inicial (10W-60 sintético). | 5.000 km — Troca de óleo + filtro. Lubrificação de corrente a cada 500-600 km. | 10.000 km — Jogo completo de velas NGK CR9EB. Verificação de sensores de injeção Weber-Marelli. | 15.000 km — Filtro de ar. Inspeção de pastilhas Brembo. Verificação do sistema de escape variável (se equipado com Torque Shift System). | 20.000 km — Folga de válvulas (revisão cara — reserve R$ 1.500-3.000, mecânico especializado obrigatório). Kit relação 525 se desgastado. | 24 meses — Fluido de freio DOT 4. | 30.000-40.000 km — Verificação/substituição preventiva do regulador de tensão. Revisão da embreagem multidisco. Devido à complexidade do motor e à raridade de peças no Brasil, uma revisão completa nesta moto tem custo significativamente acima de motos naked convencionais — pesquise oficinas com histórico real em MV Agusta antes de contratar.',
  },
]

// ─── BRUTALE 1078RR ─────────────────────────────────────────────────────────────
// Motor: 1078cc DOHC 16V 4 cilindros em linha, refrigerado a líquido | ~154-160 cv @ 10.700 rpm
// Torque: ~117 Nm @ 8.100 rpm | Injeção eletrônica Weber-Marelli | Óleo: 10W-60 sintético ~3,0L
// Vela: NGK CR9EB (ou iridium CR9EIB-9) | Pneu: 120/70-17 (D) / 190/55-17 (T)
// Freios: Brembo, discos duplos 320mm dianteiros, pinças radiais 4 pistões | Corrente: 525
// Tanque: 21L | Peso seco: ~185kg | Produção: 2008-2010 — uma das naked mais potentes da época

const B1078RR_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-60 sintético — motor de 160cv exige troca rigorosa a cada 5.000 km',
    body: 'O motor 1078cc DOHC 16V entrega até ~160cv, um dos mais potentes de naked da época. Use exclusivamente óleo sintético de alta performance 10W-60 (AGIP/Eni Racing 4T de fábrica ou equivalente Motul 300V/7100 10W-60). Capacidade: aproximadamente 3,0L com troca de filtro. Com essa potência trabalhando em rotações altas, o intervalo de 5.000 km deve ser respeitado rigorosamente — usar em uso esportivo ou pista reduz o intervalo para 3.000-4.000 km.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR9EB — troque em jogo de 4, considere iridium para maior durabilidade',
    body: 'Vela recomendada: NGK CR9EB (convencional) ou NGK CR9EIB-9 (iridium). Com a potência elevada deste motor, velas em bom estado são essenciais para resposta de acelerador precisa. Troque sempre as 4 juntas. Custo do jogo iridium: R$ 200-320. Acesso exige remoção parcial de tanque e carenagem — combine com outras revisões que já exigem desmontagem.',
  },
  {
    severity: 'DANGER',
    title: 'Folga de válvulas: revisão mais cara e crítica de toda a linha Brutale',
    body: 'Com motor de maior cilindrada e potência da família (1078cc, ~160cv), a folga de válvulas da 1078RR é ainda mais crítica de ser feita corretamente e no prazo. Sistema de pastilhas (shims) DOHC 16V exige desmontagem parcial do motor. Reserve entre R$ 2.000 e R$ 3.500 para essa revisão em oficina especializada — negligenciar este item pode resultar em dano severo ao motor (contato válvula-pistão) em caso de folga excessivamente fora de especificação.',
  },
  {
    severity: 'WARN',
    title: 'Peças legadas: uma das naked mais raras do Brasil, priorize rede internacional',
    body: 'A Brutale 1078RR teve produção limitada e volume de importação para o Brasil pequeno mesmo à época de lançamento — encontrar peças nacionalmente hoje é desafiador. Fóruns internacionais (MV Agusta Forum, mvagusta.net) são o recurso mais confiável para localizar peças usadas, discussões técnicas e contatos de fornecedores europeus especializados em MV Agusta de alta cilindrada. Considere também grupos de proprietários MV Agusta no Brasil (redes sociais) para trocar contatos de mecânicos e peças.',
  },
  {
    severity: 'OK',
    title: 'Freios Brembo com discos duplos 320mm: pastilhas de alta performance obrigatórias',
    body: 'O sistema de freio dianteiro com discos duplos de 320mm e pinças radiais Brembo de 4 pistões exige pastilhas de qualidade compatível com o desempenho da moto. Marcas recomendadas: EBC HH (dupla sinterizada) ou Brembo original. Fluido de freio DOT 4 de boa qualidade (Motul RBF 600 para uso mais esportivo) — a troca bienal é ainda mais importante nesta moto dado o potencial de frenagem forte e repetida.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 reforçada — potência elevada exige lubrificação rigorosa',
    body: 'Com ~160cv passando pela transmissão, a corrente 525 sofre desgaste acelerado se não for bem lubrificada. Lubrifique a cada 500 km (mais frequente que em motos de menor potência) com spray de qualidade (Motul Chain Lube Road/Off Road conforme uso). Verifique a folga regularmente — corrente frouxa nesta moto representa risco real de salto de corrente sob aceleração forte.',
  },
  {
    severity: 'OK',
    title: 'Pneus esportivos de alta performance — a moto exige o melhor composto disponível',
    body: 'Com 320mm de disco dianteiro duplo e ~160cv, a 1078RR precisa de pneus com aderência máxima: Pirelli Diablo Rosso Corsa, Michelin Power GP, ou Metzeler Racetec. Pneus básicos ou desgastados nesta moto comprometem seriamente a segurança — o torque disponível em baixa marcha é suficiente para derrapar a traseira com facilidade em piso não ideal.',
  },
]

const B1078RR_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Regulador/retificador de tensão: falha documentada, ainda mais crítica com sistema elétrico exigente',
    body: 'Mesmo ponto fraco da linha Brutale — regulador/retificador de tensão sujeito a falha. Na 1078RR, com sistema de injeção mais exigente pela potência elevada, uma falha elétrica pode causar problemas mais sérios de funcionamento do motor. Monitore a tensão de carga periodicamente (13,5-14,5V a 4.000 rpm) e considere substituição preventiva após 30.000 km.',
  },
  {
    severity: 'DANGER',
    title: 'Embreagem multidisco: desgaste acelerado é o problema mais reportado nesta versão',
    body: 'Com a potência elevada da 1078RR, a embreagem multidisco a óleo sofre desgaste mais acentuado que nas versões 910/989, especialmente em pilotagem esportiva com uso frequente da rotação máxima. Sintomas: patinação em acelerações fortes, ponto de engate impreciso, alavanca "esponjosa". Peças de reposição (kit de discos) são item de importação com custo elevado — avalie disponibilidade e prazo antes de planejar a revisão.',
  },
  {
    severity: 'WARN',
    title: 'Sensores de injeção Weber-Marelli: diagnóstico exige scanner específico',
    body: 'Sensores de posição do acelerador, temperatura e fase podem falhar de forma intermitente, causando marcha lenta instável ou perda de potência em rotações específicas. Diagnóstico correto exige scanner compatível com Weber-Marelli — procure oficina especializada em motos europeias de alta performance.',
  },
  {
    severity: 'WARN',
    title: 'Vazamentos de óleo em unidades de alta quilometragem ou pilotagem esportiva/pista',
    body: 'Motos usadas em pista ou com pilotagem esportiva frequente têm maior propensão a vazamentos pela junta do cabeçote e retentores, dado o estresse térmico e mecânico mais elevado. Monitore o nível de óleo com atenção redobrada após uso em circuito.',
  },
  {
    severity: 'WARN',
    title: 'Vibração e fadiga de componentes: motor de maior potência acelera desgaste estrutural',
    body: 'O motor 1078cc de alta potência transmite vibração mais intensa que os motores menores da linha, especialmente em uso próximo do redline. Parafusos de carenagem, subchassi e suportes elétricos afrouxam com mais frequência. Inspecione o aperto geral a cada revisão e use trava-rosca em pontos recorrentes de folga.',
  },
  {
    severity: 'DANGER',
    title: 'Superaquecimento em trânsito parado: sistema de arrefecimento sob estresse com motor de alta potência',
    body: 'O motor 1078cc de alta performance gera mais calor que os motores menores da linha, e em trânsito parado por tempo prolongado o sistema de arrefecimento líquido pode ficar sobrecarregado. Sintomas: ventoinha ligando com frequência incomum, temperatura no painel subindo além do normal. Verifique o nível do líquido de arrefecimento regularmente e a integridade do radiador — vazamentos reduzem a capacidade de resfriamento rapidamente neste motor mais exigente.',
  },
]

const B1078RR_MANUTENCAO: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Cronograma Brutale 1078RR: motor de alta potência exige revisões rigorosas e caras',
    body: '1.000 km — Troca de óleo inicial (10W-60 sintético). | 5.000 km — Troca de óleo + filtro (reduzir para 3.000-4.000 km se uso esportivo/pista). Lubrificação de corrente a cada 500 km. | 10.000 km — Jogo completo de velas NGK CR9EB. Verificação de sensores de injeção. Fluido de freio DOT 4 se necessário. | 15.000 km — Filtro de ar. Inspeção de pastilhas Brembo (alto desgaste esperado dado o uso esportivo típico). | 20.000 km — Folga de válvulas (revisão mais cara da linha — reserve R$ 2.000-3.500). Kit relação 525. | 24 meses — Fluido de freio DOT 4 (considerar DOT 4 racing tipo Motul RBF 600 para uso esportivo). | 30.000 km — Verificação/substituição preventiva do regulador de tensão. Revisão completa da embreagem multidisco (item de desgaste mais reportado nesta versão). Devido à raridade e ao custo de peças, e à potência elevada do motor, planeje orçamento de manutenção acima do padrão até mesmo para motos italianas de nicho.',
  },
]

// ─── BRUTALE 1090R ──────────────────────────────────────────────────────────────
// Motor: 1078cc DOHC 16V 4 cilindros em linha, refrigerado a líquido (nomeada comercialmente "1090")
// Potência: ~144 cv @ 10.600 rpm | Torque: ~115 Nm @ 8.000 rpm | Injeção eletrônica
// Óleo: 10W-60 sintético ~3,0L | Vela: NGK CR9EB | Pneu: 120/70-17 (D) / 190/55-17 (T)
// Corrente: 525 | Tanque: 21L | Produção: ~2010-2012

const B1090R_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-60 sintético — mesma base de motor 1078cc da 1078RR, mesma exigência',
    body: 'A Brutale 1090R usa o mesmo bloco de 1078cc DOHC 16V da 1078RR, com nomenclatura comercial "1090" e potência ajustada para ~144cv. Use óleo sintético 10W-60 (AGIP/Eni Racing 4T de fábrica ou Motul 300V/7100 10W-60 como alternativa). Capacidade: ~3,0L com troca de filtro. Intervalo: 5.000 km ou 12 meses.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR9EB — troque em jogo de 4, iridium recomendada para maior durabilidade',
    body: 'Vela recomendada: NGK CR9EB convencional ou NGK CR9EIB-9 iridium. Sempre em jogo de 4 unidades. Acesso exige remoção parcial de tanque/carenagem — combine com outras revisões maiores para otimizar o tempo de oficina.',
  },
  {
    severity: 'WARN',
    title: 'Folga de válvulas: mesma complexidade e custo da 1078RR',
    body: 'Sistema de pastilhas (shims) DOHC 16V, revisão cara e trabalhosa. Reserve entre R$ 1.800 e R$ 3.000 para essa manutenção em oficina especializada em motores italianos de alta rotação. Não adie este item — folga fora de especificação em motor de alta performance pode causar dano severo.',
  },
  {
    severity: 'WARN',
    title: 'Peças legadas: última geração antes da transição para o motor 3 cilindros',
    body: 'A 1090R faz parte da última geração de Brutale com motor 4 cilindros em linha, antes da MV Agusta migrar para o motor 3 cilindros na Brutale 800 (2012+). Isso significa que peças específicas desta geração já não têm mais produção há bastante tempo. Fóruns internacionais (MV Agusta Forum) e importadores especializados em peças italianas são o caminho mais confiável. Como a 1090R compartilha boa parte do motor com a 1078RR, peças de uma geralmente servem na outra — amplie sua busca para ambos os modelos ao procurar peças.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 e pneus 190/55-17 — mesmas especificações da 1078RR',
    body: 'Corrente 525, lubrificação a cada 500-600 km. Pneu traseiro 190/55-17, dianteiro 120/70-17. Pneus recomendados: Pirelli Diablo Rosso III/IV, Michelin Pilot Power, Metzeler Sportec — sempre composto esportivo de qualidade dado o torque disponível.',
  },
  {
    severity: 'OK',
    title: 'Freios Brembo: pastilhas de qualidade e fluido DOT 4 renovado bienalmente',
    body: 'Sistema de freio Brembo com discos duplos dianteiros. Use pastilhas EBC HH ou Brembo original, e fluido DOT 4 de qualidade (Motul RBF 600 para uso mais esportivo). Troca do fluido a cada 24 meses é obrigatória — não negociável em moto com esse potencial de frenagem.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar e admissão: use K&N específico ou original importado',
    body: 'Filtro de ar com código específico para MV Agusta 1090 (K&N fabrica opção de alto fluxo) ou peça original importada. Ao reinstalar após limpeza/troca, garanta vedação perfeita na caixa de admissão — vazamento de ar não filtrado é causa comum de desgaste prematuro em motores de alta rotação como este.',
  },
]

const B1090R_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Regulador/retificador de tensão: falha recorrente em toda a linha 4 cilindros',
    body: 'Mesmo histórico de falha documentado nos demais modelos Brutale 4 cilindros. Monitore a tensão de carga (13,5-14,5V a 4.000 rpm) periodicamente. Substituição preventiva após 30.000-40.000 km é recomendável dado o padrão de falhas relatado pela comunidade de proprietários.',
  },
  {
    severity: 'WARN',
    title: 'Sensores de injeção eletrônica: falhas intermitentes exigem diagnóstico especializado',
    body: 'Sensores de posição do acelerador, temperatura do motor e fase podem apresentar falhas intermitentes. Sintomas: marcha lenta instável, corte de motor em rotações específicas. Diagnóstico correto exige ferramenta de diagnóstico compatível com o sistema de injeção MV Agusta — procure oficina especializada em motos europeias.',
  },
  {
    severity: 'DANGER',
    title: 'Embreagem multidisco: desgaste acelerado, mesmo padrão da 1078RR',
    body: 'Com potência elevada (~144cv), a embreagem a óleo sofre desgaste mais rápido em pilotagem esportiva ou uso urbano com muitos engates. Sintomas: patinação em acelerações fortes, ponto de engate impreciso. Peças de reposição são item de importação — avalie disponibilidade antes de planejar a revisão.',
  },
  {
    severity: 'WARN',
    title: 'Vazamentos de óleo pela junta do cabeçote em unidades de alta quilometragem',
    body: 'Motos com mais de 40.000 km podem apresentar vazamento pela junta do cabeçote ou retentores de válvula. Monitore o nível de óleo regularmente — em motor de alta rotação, a perda de lubrificação acelera o desgaste rapidamente se não for corrigida a tempo.',
  },
  {
    severity: 'WARN',
    title: 'Vibração em alta rotação: verifique fixações periodicamente',
    body: 'O motor 4 cilindros de alta rotação transmite vibração perceptível ao chassi tubular. Parafusos de carenagem, subchassi e componentes elétricos podem afrouxar com o tempo. Inclua verificação de aperto geral em toda revisão, com trava-rosca médio nos pontos recorrentes.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico: conectores oxidam em clima úmido, causando falhas intermitentes',
    body: 'Conectores do chicote elétrico podem oxidar em climas litorâneos ou muito úmidos, causando falhas intermitentes em luzes de painel e sinalização. Aplicação preventiva de graxa dielétrica nos conectores acessíveis a cada revisão anual reduz o problema.',
  },
]

const B1090R_MANUTENCAO: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Cronograma Brutale 1090R: última geração 4 cilindros, peças cada vez mais raras',
    body: '1.000 km — Troca de óleo inicial (10W-60 sintético). | 5.000 km — Troca de óleo + filtro. Lubrificação de corrente a cada 500-600 km. | 10.000 km — Jogo completo de velas NGK CR9EB. Verificação de sensores de injeção. | 15.000 km — Filtro de ar. Inspeção de pastilhas Brembo. | 20.000 km — Folga de válvulas (reserve R$ 1.800-3.000). Kit relação 525 se desgastado. | 24 meses — Fluido de freio DOT 4. | 30.000-40.000 km — Verificação/substituição preventiva do regulador de tensão. Revisão da embreagem multidisco. Por ser a penúltima geração de Brutale 4 cilindros antes da descontinuação da linha, planeje a compra antecipada de peças de desgaste conhecido (regulador, kit embreagem) quando encontrá-las disponíveis — a escassez tende a aumentar com o tempo.',
  },
]

// ─── BRUTALE 1090RR ──────────────────────────────────────────────────────────────
// Motor: 1078cc DOHC 16V 4 cilindros em linha, refrigerado a líquido | ~144-150 cv @ 10.600 rpm
// Torque: ~83 lb-ft (~112 Nm) @ 8.000 rpm | Injeção eletrônica | Óleo: 10W-60 sintético ~3,0L
// Vela: NGK CR9EB | Pneu: 120/70-17 (D) / 190/55-17 (T) | Corrente: 525 | Tanque: 21L
// Produção: ~2010-2012 — última e mais potente geração da Brutale 4 cilindros antes da Brutale 800 (2012+)

const B1090RR_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-60 sintético — última e mais refinada versão do motor 4 cilindros da Brutale',
    body: 'A Brutale 1090RR é a versão mais potente da última geração 4 cilindros da linha Brutale, antes da transição para o motor 3 cilindros na Brutale 800 (2012+). Motor 1078cc DOHC 16V com ~144-150cv. Use óleo sintético 10W-60 (AGIP/Eni Racing 4T de fábrica ou Motul 300V/7100 10W-60). Capacidade: ~3,0L com troca de filtro. Intervalo: 5.000 km, reduzindo para 3.000-4.000 km em uso esportivo/pista.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR9EB — troque em jogo de 4, iridium recomendada para esta versão de topo',
    body: 'Vela recomendada: NGK CR9EB (convencional) ou NGK CR9EIB-9 (iridium — recomendada dado o caráter mais esportivo desta versão RR). Sempre em jogo de 4 unidades. Custo do jogo iridium: R$ 200-320.',
  },
  {
    severity: 'DANGER',
    title: 'Folga de válvulas: revisão cara e crítica, mesmo padrão da linha de topo',
    body: 'Sistema de pastilhas (shims) DOHC 16V. Como versão de maior potência da última geração, a 1090RR merece atenção redobrada a este item — reserve R$ 2.000-3.500 para revisão em oficina especializada em motores italianos de alta rotação. Não há espaço para negligência: motor de topo de linha com folga fora de especificação sofre dano severo rapidamente.',
  },
  {
    severity: 'WARN',
    title: 'Peças legadas: modelo mais raro e cobiçado, mas também o mais difícil de manter',
    body: 'Por ser a versão mais potente da última geração 4 cilindros, a 1090RR é procurada por colecionadores e entusiastas — o que ironicamente também torna peças usadas mais disputadas e caras no mercado internacional. Fóruns como MV Agusta Forum (mvagusta.net) são essenciais para localizar peças e trocar informações técnicas. Como compartilha grande parte do motor com a 1078RR e 1090R, amplie a busca por peças compatíveis entre os três modelos.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 e pneus de alta performance — potência de topo exige cuidado redobrado',
    body: 'Corrente 525, lubrificação a cada 500 km (mais frequente dado o torque elevado). Pneus: Pirelli Diablo Rosso Corsa, Michelin Power GP ou Metzeler Racetec — não economize no composto, esta é a versão de maior potencial de aceleração e frenagem da linha Brutale 4 cilindros.',
  },
  {
    severity: 'OK',
    title: 'Freios Brembo de alta performance: pastilhas e fluido de qualidade racing',
    body: 'Sistema de freio Brembo com discos duplos dianteiros e pinças radiais. Use pastilhas EBC HH dupla sinterizada ou Brembo original, e fluido DOT 4 de alta performance (Motul RBF 600) dado o uso mais esportivo típico desta versão. Troca do fluido a cada 24 meses, ou anual se houver uso frequente em pista.',
  },
  {
    severity: 'OK',
    title: 'Conservação: item de colecionador, cuide da moto pensando em valorização futura',
    body: 'Sendo a última e mais desejada versão da Brutale 4 cilindros antes da descontinuação da linha, a 1090RR tende a se valorizar como item de colecionador ao longo do tempo. Mantenha documentação de todas as manutenções, use peças de qualidade mesmo quando mais caras, e evite modificações que descaracterizem o modelo original — isso preserva tanto a mecânica quanto o valor de revenda futuro.',
  },
]

const B1090RR_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Regulador/retificador de tensão: falha recorrente, ainda mais crítica no modelo de topo',
    body: 'Mesmo histórico de falha da linha Brutale 4 cilindros. Na 1090RR, com sistema elétrico sob maior demanda pela potência de topo, uma falha pode ter consequências mais sérias no funcionamento do motor. Monitore a tensão de carga periodicamente e considere substituição preventiva após 30.000 km.',
  },
  {
    severity: 'DANGER',
    title: 'Embreagem multidisco: maior desgaste de toda a linha, dado o torque de topo',
    body: 'Sendo a versão de maior potência da geração final, a 1090RR impõe a maior carga sobre a embreagem multidisco a óleo de toda a família Brutale 4 cilindros. Patinação prematura é o problema mais reportado, especialmente com pilotagem esportiva. Peças de reposição são item de importação de alto custo — avalie bem antes de decidir entre revisão parcial ou substituição completa do kit.',
  },
  {
    severity: 'WARN',
    title: 'Sensores de injeção eletrônica: diagnóstico exige ferramenta específica',
    body: 'Sensores de posição do acelerador, temperatura e fase podem falhar de forma intermitente. Diagnóstico correto exige scanner compatível com o sistema de injeção MV Agusta — procure oficina especializada em motos europeias de alta performance para evitar trocas desnecessárias por tentativa e erro.',
  },
  {
    severity: 'WARN',
    title: 'Vazamentos de óleo em uso esportivo ou de pista frequente',
    body: 'Dado o perfil mais esportivo de uso típico da 1090RR, unidades levadas à pista com frequência têm maior propensão a vazamentos pela junta do cabeçote e retentores devido ao estresse térmico elevado. Monitore o nível de óleo com atenção redobrada após sessões de pista.',
  },
  {
    severity: 'WARN',
    title: 'Vibração e fadiga de fixações: motor de topo transmite mais vibração ao chassi',
    body: 'Sendo a versão de maior potência, o motor 1078cc da 1090RR transmite vibração mais intensa em uso próximo do redline. Parafusos de carenagem, subchassi e suportes elétricos afrouxam com mais frequência que em versões menos potentes. Inspecione o aperto geral a cada revisão, com trava-rosca nos pontos recorrentes de folga.',
  },
  {
    severity: 'DANGER',
    title: 'Superaquecimento em trânsito parado: sistema de arrefecimento no limite com motor de topo',
    body: 'O motor de maior potência da linha gera mais calor, e em trânsito parado prolongado o sistema de arrefecimento líquido pode ficar sobrecarregado. Verifique regularmente o nível do líquido de arrefecimento e a integridade do radiador — vazamentos comprometem rapidamente a capacidade de resfriamento neste motor de topo de linha.',
  },
]

const B1090RR_MANUTENCAO: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Cronograma Brutale 1090RR: topo de linha 4 cilindros, manutenção mais rigorosa e cara da família',
    body: '1.000 km — Troca de óleo inicial (10W-60 sintético). | 5.000 km — Troca de óleo + filtro (reduzir para 3.000-4.000 km com uso esportivo/pista). Lubrificação de corrente a cada 500 km. | 10.000 km — Jogo completo de velas NGK CR9EB. Verificação de sensores de injeção. Fluido de freio DOT 4 se necessário. | 15.000 km — Filtro de ar. Inspeção de pastilhas Brembo (desgaste acelerado esperado dado o uso esportivo). | 20.000 km — Folga de válvulas (revisão mais cara da linha — reserve R$ 2.000-3.500). Kit relação 525. | 24 meses — Fluido de freio DOT 4 racing (Motul RBF 600 recomendado). | 30.000 km — Verificação/substituição preventiva do regulador de tensão. Revisão completa da embreagem multidisco (maior desgaste de toda a família). Por ser o modelo mais desejado e raro da geração final 4 cilindros, priorize sempre peças de qualidade e documentação completa de manutenção — isso preserva tanto a confiabilidade mecânica quanto o valor da moto como item de colecionador.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'BRUTALE 910R',
    yearFrom: 2005,
    yearTo: 2008,
    MACETES: B910R_MACETES,
    PROBLEMAS: B910R_PROBLEMAS,
    MANUTENCAO: B910R_MANUTENCAO,
  },
  {
    modelName: 'BRUTALE 910S',
    yearFrom: 2005,
    yearTo: 2008,
    MACETES: B910S_MACETES,
    PROBLEMAS: B910S_PROBLEMAS,
    MANUTENCAO: B910S_MANUTENCAO,
  },
  {
    modelName: 'BRUTALE 989R',
    yearFrom: 2005,
    yearTo: 2010,
    MACETES: B989R_MACETES,
    PROBLEMAS: B989R_PROBLEMAS,
    MANUTENCAO: B989R_MANUTENCAO,
  },
  {
    modelName: 'BRUTALE 1078RR',
    yearFrom: 2008,
    yearTo: 2010,
    MACETES: B1078RR_MACETES,
    PROBLEMAS: B1078RR_PROBLEMAS,
    MANUTENCAO: B1078RR_MANUTENCAO,
  },
  {
    modelName: 'BRUTALE 1090R',
    yearFrom: 2010,
    yearTo: 2012,
    MACETES: B1090R_MACETES,
    PROBLEMAS: B1090R_PROBLEMAS,
    MANUTENCAO: B1090R_MANUTENCAO,
  },
  {
    modelName: 'BRUTALE 1090RR',
    yearFrom: 2010,
    yearTo: 2012,
    MACETES: B1090RR_MACETES,
    PROBLEMAS: B1090RR_PROBLEMAS,
    MANUTENCAO: B1090RR_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'BRUTALE 910R',
    yearFrom: 2005, yearTo: 2008,
    tireSize: '120/70-17 (D) · 190/50-17 (T)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 42,
    notes: 'Solo: D 36 / T 42 PSI (2,5/2,9 bar). Pressões de fábrica para uso esportivo em naked de alta performance — moto não homologada para carona em duas com bagageiro (sem posição específica de manual). Verifique a pressão a frio, semanalmente. Pneus recomendados: Pirelli Diablo Rosso III/IV, Michelin Pilot Power.',
  },
  {
    modelName: 'BRUTALE 910S',
    yearFrom: 2005, yearTo: 2008,
    tireSize: '120/70-17 (D) · 190/50-17 (T)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 42,
    notes: 'Solo: D 36 / T 42 PSI (2,5/2,9 bar). Mesma especificação de pneu e pressão da 910R — motor e chassi compartilhados.',
  },
  {
    modelName: 'BRUTALE 989R',
    yearFrom: 2005, yearTo: 2010,
    tireSize: '120/70-17 (D) · 190/55-17 (T)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 42,
    notes: 'Solo: D 36 / T 42 PSI (2,5/2,9 bar). Pneu traseiro de perfil 190/55-17 (mais alto que o 190/50 da série 910) — confirme a medida gravada no pneu atual antes de comprar reposição. Pneus recomendados: Pirelli Diablo Rosso, Metzeler Sportec.',
  },
  {
    modelName: 'BRUTALE 1078RR',
    yearFrom: 2008, yearTo: 2010,
    tireSize: '120/70-17 (D) · 190/55-17 (T)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 42,
    notes: 'Solo: D 36 / T 42 PSI (2,5/2,9 bar). Com ~160cv, priorize pneus de composto esportivo em ótimo estado — Pirelli Diablo Rosso Corsa ou Michelin Power GP. Verifique pressão a frio antes de cada saída mais longa.',
  },
  {
    modelName: 'BRUTALE 1090R',
    yearFrom: 2010, yearTo: 2012,
    tireSize: '120/70-17 (D) · 190/55-17 (T)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 42,
    notes: 'Solo: D 36 / T 42 PSI (2,5/2,9 bar). Mesma especificação de pneu da 1078RR (base de motor compartilhada). Pneus recomendados: Pirelli Diablo Rosso III/IV, Metzeler Sportec.',
  },
  {
    modelName: 'BRUTALE 1090RR',
    yearFrom: 2010, yearTo: 2012,
    tireSize: '120/70-17 (D) · 190/55-17 (T)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 42,
    notes: 'Solo: D 36 / T 42 PSI (2,5/2,9 bar). Versão de topo da linha — pneus de alta performance obrigatórios: Pirelli Diablo Rosso Corsa, Michelin Power GP, Metzeler Racetec.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // BRUTALE 910R
  { modelName: 'BRUTALE 910R', yearFrom: 2005, yearTo: 2008, component: 'Óleo 10W-60 sintético (~3,0L com filtro)', intervalKm: 5000, intervalMonths: 12, notes: 'AGIP/Eni Racing 4T 10W-60 de fábrica ou Motul 300V/7100 10W-60 equivalente.', priority: 'HIGH', order: 1 },
  { modelName: 'BRUTALE 910R', yearFrom: 2005, yearTo: 2008, component: 'Filtro de óleo', intervalKm: 5000, intervalMonths: 12, notes: 'Trocar junto com o óleo. Verificar vedação do O-ring ao instalar.', priority: 'MEDIUM', order: 2 },
  { modelName: 'BRUTALE 910R', yearFrom: 2005, yearTo: 2008, component: 'Velas NGK CR9EB ×4 (ou iridium CR9EIB-9)', intervalKm: 10000, intervalMonths: null, notes: 'Sempre em jogo completo de 4. Acesso exige remoção parcial de tanque/carenagem.', priority: 'HIGH', order: 3 },
  { modelName: 'BRUTALE 910R', yearFrom: 2005, yearTo: 2008, component: 'Lubrificação da corrente 525', intervalKm: 500, intervalMonths: null, notes: 'Spray de qualidade (Motul Chain Lube). Folga 20-30mm no trecho inferior.', priority: 'HIGH', order: 4 },
  { modelName: 'BRUTALE 910R', yearFrom: 2005, yearTo: 2008, component: 'Filtro de ar', intervalKm: 15000, intervalMonths: 12, notes: 'K&N com código específico MV Agusta 910 ou original importado.', priority: 'MEDIUM', order: 5 },
  { modelName: 'BRUTALE 910R', yearFrom: 2005, yearTo: 2008, component: 'Folga de válvulas (pastilhas/shims DOHC 16V)', intervalKm: 20000, intervalMonths: 24, notes: 'Revisão cara (R$ 1.500-3.000) — mecânico especializado em motor italiano de alta rotação obrigatório.', priority: 'CRITICAL', order: 6 },
  { modelName: 'BRUTALE 910R', yearFrom: 2005, yearTo: 2008, component: 'Embreagem multidisco — inspeção', intervalKm: 20000, intervalMonths: 24, notes: 'Verificar patinação em altas rotações e ponto de engate. Discos são peça de importação.', priority: 'HIGH', order: 7 },
  { modelName: 'BRUTALE 910R', yearFrom: 2005, yearTo: 2008, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Sistema Brembo. Troca bienal obrigatória por absorção de umidade.', priority: 'HIGH', order: 8 },
  { modelName: 'BRUTALE 910R', yearFrom: 2005, yearTo: 2008, component: 'Kit relação 525 (corrente + pinhão + coroa)', intervalKm: 25000, intervalMonths: null, notes: 'DID ou RK — geralmente item de encomenda por importação.', priority: 'HIGH', order: 9 },
  { modelName: 'BRUTALE 910R', yearFrom: 2005, yearTo: 2008, component: 'Verificação do regulador/retificador de tensão', intervalKm: null, intervalMonths: 12, notes: 'Ponto de falha conhecido. Medir 13,5-14,5V a 4.000 rpm. Substituição preventiva após 30.000-40.000 km.', priority: 'CRITICAL', order: 10 },

  // BRUTALE 910S
  { modelName: 'BRUTALE 910S', yearFrom: 2005, yearTo: 2008, component: 'Óleo 10W-60 sintético (~3,0L com filtro)', intervalKm: 5000, intervalMonths: 12, notes: 'Mesma especificação da 910R — motor compartilhado.', priority: 'HIGH', order: 1 },
  { modelName: 'BRUTALE 910S', yearFrom: 2005, yearTo: 2008, component: 'Filtro de óleo', intervalKm: 5000, intervalMonths: 12, notes: 'Trocar junto com o óleo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'BRUTALE 910S', yearFrom: 2005, yearTo: 2008, component: 'Velas NGK CR9EB ×4 (ou iridium CR9EIB-9)', intervalKm: 10000, intervalMonths: null, notes: 'Sempre em jogo completo de 4.', priority: 'HIGH', order: 3 },
  { modelName: 'BRUTALE 910S', yearFrom: 2005, yearTo: 2008, component: 'Lubrificação da corrente 525', intervalKm: 500, intervalMonths: null, notes: 'Folga 20-30mm no trecho inferior.', priority: 'HIGH', order: 4 },
  { modelName: 'BRUTALE 910S', yearFrom: 2005, yearTo: 2008, component: 'Filtro de ar', intervalKm: 15000, intervalMonths: 12, notes: 'K&N específico MV Agusta 910 ou original importado.', priority: 'MEDIUM', order: 5 },
  { modelName: 'BRUTALE 910S', yearFrom: 2005, yearTo: 2008, component: 'Folga de válvulas (pastilhas/shims DOHC 16V)', intervalKm: 20000, intervalMonths: 24, notes: 'Revisão cara (R$ 1.500-3.000) — especialista obrigatório.', priority: 'CRITICAL', order: 6 },
  { modelName: 'BRUTALE 910S', yearFrom: 2005, yearTo: 2008, component: 'Embreagem multidisco — inspeção', intervalKm: 20000, intervalMonths: 24, notes: 'Verificar patinação e ponto de engate.', priority: 'HIGH', order: 7 },
  { modelName: 'BRUTALE 910S', yearFrom: 2005, yearTo: 2008, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Troca bienal obrigatória.', priority: 'HIGH', order: 8 },
  { modelName: 'BRUTALE 910S', yearFrom: 2005, yearTo: 2008, component: 'Kit relação 525', intervalKm: 25000, intervalMonths: null, notes: 'DID ou RK, item de encomenda.', priority: 'HIGH', order: 9 },
  { modelName: 'BRUTALE 910S', yearFrom: 2005, yearTo: 2008, component: 'Verificação do regulador/retificador de tensão', intervalKm: null, intervalMonths: 12, notes: 'Medir 13,5-14,5V a 4.000 rpm. Substituição preventiva após 30.000-40.000 km.', priority: 'CRITICAL', order: 10 },

  // BRUTALE 989R
  { modelName: 'BRUTALE 989R', yearFrom: 2005, yearTo: 2010, component: 'Óleo 10W-60 sintético (~3,0L com filtro)', intervalKm: 5000, intervalMonths: 12, notes: 'Motor 982,3cc DOHC 16V de alta rotação. AGIP/Eni Racing 4T ou Motul 300V/7100 10W-60.', priority: 'HIGH', order: 1 },
  { modelName: 'BRUTALE 989R', yearFrom: 2005, yearTo: 2010, component: 'Filtro de óleo', intervalKm: 5000, intervalMonths: 12, notes: 'Trocar junto com o óleo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'BRUTALE 989R', yearFrom: 2005, yearTo: 2010, component: 'Velas NGK CR9EB ×4 (ou iridium CR9EIB-9)', intervalKm: 10000, intervalMonths: null, notes: 'Jogo completo de 4.', priority: 'HIGH', order: 3 },
  { modelName: 'BRUTALE 989R', yearFrom: 2005, yearTo: 2010, component: 'Lubrificação da corrente 525', intervalKm: 500, intervalMonths: null, notes: 'Folga 20-30mm no trecho inferior.', priority: 'HIGH', order: 4 },
  { modelName: 'BRUTALE 989R', yearFrom: 2005, yearTo: 2010, component: 'Filtro de ar', intervalKm: 15000, intervalMonths: 12, notes: 'K&N específico MV Agusta 989 ou original importado.', priority: 'MEDIUM', order: 5 },
  { modelName: 'BRUTALE 989R', yearFrom: 2005, yearTo: 2010, component: 'Folga de válvulas (pastilhas/shims DOHC 16V)', intervalKm: 20000, intervalMonths: 24, notes: 'Revisão mais cara do cronograma (R$ 1.500-3.000). Especialista obrigatório.', priority: 'CRITICAL', order: 6 },
  { modelName: 'BRUTALE 989R', yearFrom: 2005, yearTo: 2010, component: 'Sistema de escape variável (MV Torque Shift System) — inspeção', intervalKm: 15000, intervalMonths: 12, notes: 'Apenas versões finais equipadas. Verificar se o atuador da válvula se move livremente.', priority: 'MEDIUM', order: 7 },
  { modelName: 'BRUTALE 989R', yearFrom: 2005, yearTo: 2010, component: 'Embreagem multidisco — inspeção', intervalKm: 20000, intervalMonths: 24, notes: 'Verificar patinação em pilotagem esportiva.', priority: 'HIGH', order: 8 },
  { modelName: 'BRUTALE 989R', yearFrom: 2005, yearTo: 2010, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Troca bienal obrigatória.', priority: 'HIGH', order: 9 },
  { modelName: 'BRUTALE 989R', yearFrom: 2005, yearTo: 2010, component: 'Verificação do regulador/retificador de tensão', intervalKm: null, intervalMonths: 12, notes: 'Medir 13,5-14,5V a 4.000 rpm. Substituição preventiva após 30.000-40.000 km.', priority: 'CRITICAL', order: 10 },

  // BRUTALE 1078RR
  { modelName: 'BRUTALE 1078RR', yearFrom: 2008, yearTo: 2010, component: 'Óleo 10W-60 sintético (~3,0L com filtro)', intervalKm: 5000, intervalMonths: 12, notes: 'Motor 1078cc ~160cv. Reduzir para 3.000-4.000 km em uso esportivo/pista.', priority: 'HIGH', order: 1 },
  { modelName: 'BRUTALE 1078RR', yearFrom: 2008, yearTo: 2010, component: 'Filtro de óleo', intervalKm: 5000, intervalMonths: 12, notes: 'Trocar junto com o óleo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'BRUTALE 1078RR', yearFrom: 2008, yearTo: 2010, component: 'Velas NGK CR9EB ×4 (ou iridium CR9EIB-9)', intervalKm: 10000, intervalMonths: null, notes: 'Jogo completo de 4. Essencial para resposta de acelerador precisa nesta potência.', priority: 'HIGH', order: 3 },
  { modelName: 'BRUTALE 1078RR', yearFrom: 2008, yearTo: 2010, component: 'Lubrificação da corrente 525', intervalKm: 500, intervalMonths: null, notes: 'Lubrificação mais frequente dado o torque elevado (~160cv).', priority: 'HIGH', order: 4 },
  { modelName: 'BRUTALE 1078RR', yearFrom: 2008, yearTo: 2010, component: 'Filtro de ar', intervalKm: 15000, intervalMonths: 12, notes: 'K&N específico ou original importado.', priority: 'MEDIUM', order: 5 },
  { modelName: 'BRUTALE 1078RR', yearFrom: 2008, yearTo: 2010, component: 'Folga de válvulas (pastilhas/shims DOHC 16V)', intervalKm: 20000, intervalMonths: 24, notes: 'Revisão mais cara da linha (R$ 2.000-3.500). Especialista obrigatório.', priority: 'CRITICAL', order: 6 },
  { modelName: 'BRUTALE 1078RR', yearFrom: 2008, yearTo: 2010, component: 'Embreagem multidisco — inspeção', intervalKm: 15000, intervalMonths: 18, notes: 'Item de maior desgaste reportado nesta versão de alta potência.', priority: 'CRITICAL', order: 7 },
  { modelName: 'BRUTALE 1078RR', yearFrom: 2008, yearTo: 2010, component: 'Pastilhas de freio dianteiro (Brembo, discos duplos 320mm)', intervalKm: 12000, intervalMonths: null, notes: 'EBC HH dupla sinterizada ou Brembo original.', priority: 'HIGH', order: 8 },
  { modelName: 'BRUTALE 1078RR', yearFrom: 2008, yearTo: 2010, component: 'Fluido de freio DOT 4 (racing recomendado)', intervalKm: null, intervalMonths: 24, notes: 'Motul RBF 600 para uso esportivo. Troca bienal obrigatória, anual se uso em pista.', priority: 'HIGH', order: 9 },
  { modelName: 'BRUTALE 1078RR', yearFrom: 2008, yearTo: 2010, component: 'Verificação do regulador/retificador de tensão', intervalKm: null, intervalMonths: 12, notes: 'Medir 13,5-14,5V a 4.000 rpm. Substituição preventiva após 30.000 km.', priority: 'CRITICAL', order: 10 },

  // BRUTALE 1090R
  { modelName: 'BRUTALE 1090R', yearFrom: 2010, yearTo: 2012, component: 'Óleo 10W-60 sintético (~3,0L com filtro)', intervalKm: 5000, intervalMonths: 12, notes: 'Mesma base de motor 1078cc da 1078RR.', priority: 'HIGH', order: 1 },
  { modelName: 'BRUTALE 1090R', yearFrom: 2010, yearTo: 2012, component: 'Filtro de óleo', intervalKm: 5000, intervalMonths: 12, notes: 'Trocar junto com o óleo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'BRUTALE 1090R', yearFrom: 2010, yearTo: 2012, component: 'Velas NGK CR9EB ×4 (ou iridium CR9EIB-9)', intervalKm: 10000, intervalMonths: null, notes: 'Jogo completo de 4.', priority: 'HIGH', order: 3 },
  { modelName: 'BRUTALE 1090R', yearFrom: 2010, yearTo: 2012, component: 'Lubrificação da corrente 525', intervalKm: 500, intervalMonths: null, notes: 'Folga 20-30mm no trecho inferior.', priority: 'HIGH', order: 4 },
  { modelName: 'BRUTALE 1090R', yearFrom: 2010, yearTo: 2012, component: 'Filtro de ar', intervalKm: 15000, intervalMonths: 12, notes: 'K&N específico MV Agusta 1090 ou original importado.', priority: 'MEDIUM', order: 5 },
  { modelName: 'BRUTALE 1090R', yearFrom: 2010, yearTo: 2012, component: 'Folga de válvulas (pastilhas/shims DOHC 16V)', intervalKm: 20000, intervalMonths: 24, notes: 'Revisão cara (R$ 1.800-3.000). Especialista obrigatório.', priority: 'CRITICAL', order: 6 },
  { modelName: 'BRUTALE 1090R', yearFrom: 2010, yearTo: 2012, component: 'Embreagem multidisco — inspeção', intervalKm: 18000, intervalMonths: 24, notes: 'Verificar patinação em pilotagem esportiva.', priority: 'HIGH', order: 7 },
  { modelName: 'BRUTALE 1090R', yearFrom: 2010, yearTo: 2012, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Troca bienal obrigatória.', priority: 'HIGH', order: 8 },
  { modelName: 'BRUTALE 1090R', yearFrom: 2010, yearTo: 2012, component: 'Kit relação 525', intervalKm: 25000, intervalMonths: null, notes: 'DID ou RK, item de encomenda por importação.', priority: 'HIGH', order: 9 },
  { modelName: 'BRUTALE 1090R', yearFrom: 2010, yearTo: 2012, component: 'Verificação do regulador/retificador de tensão', intervalKm: null, intervalMonths: 12, notes: 'Medir 13,5-14,5V a 4.000 rpm. Substituição preventiva após 30.000-40.000 km.', priority: 'CRITICAL', order: 10 },

  // BRUTALE 1090RR
  { modelName: 'BRUTALE 1090RR', yearFrom: 2010, yearTo: 2012, component: 'Óleo 10W-60 sintético (~3,0L com filtro)', intervalKm: 5000, intervalMonths: 12, notes: 'Versão de topo — reduzir para 3.000-4.000 km em uso esportivo/pista.', priority: 'HIGH', order: 1 },
  { modelName: 'BRUTALE 1090RR', yearFrom: 2010, yearTo: 2012, component: 'Filtro de óleo', intervalKm: 5000, intervalMonths: 12, notes: 'Trocar junto com o óleo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'BRUTALE 1090RR', yearFrom: 2010, yearTo: 2012, component: 'Velas NGK CR9EB ×4 (ou iridium CR9EIB-9)', intervalKm: 10000, intervalMonths: null, notes: 'Jogo completo de 4. Iridium recomendada para esta versão de topo.', priority: 'HIGH', order: 3 },
  { modelName: 'BRUTALE 1090RR', yearFrom: 2010, yearTo: 2012, component: 'Lubrificação da corrente 525', intervalKm: 500, intervalMonths: null, notes: 'Lubrificação mais frequente dado o torque de topo de linha.', priority: 'HIGH', order: 4 },
  { modelName: 'BRUTALE 1090RR', yearFrom: 2010, yearTo: 2012, component: 'Filtro de ar', intervalKm: 15000, intervalMonths: 12, notes: 'K&N específico ou original importado.', priority: 'MEDIUM', order: 5 },
  { modelName: 'BRUTALE 1090RR', yearFrom: 2010, yearTo: 2012, component: 'Folga de válvulas (pastilhas/shims DOHC 16V)', intervalKm: 20000, intervalMonths: 24, notes: 'Revisão mais cara da família Brutale (R$ 2.000-3.500). Especialista obrigatório.', priority: 'CRITICAL', order: 6 },
  { modelName: 'BRUTALE 1090RR', yearFrom: 2010, yearTo: 2012, component: 'Embreagem multidisco — inspeção', intervalKm: 15000, intervalMonths: 18, notes: 'Maior desgaste de toda a família dado o torque de topo. Peça de importação de alto custo.', priority: 'CRITICAL', order: 7 },
  { modelName: 'BRUTALE 1090RR', yearFrom: 2010, yearTo: 2012, component: 'Pastilhas de freio dianteiro (Brembo, discos duplos)', intervalKm: 12000, intervalMonths: null, notes: 'EBC HH dupla sinterizada ou Brembo original.', priority: 'HIGH', order: 8 },
  { modelName: 'BRUTALE 1090RR', yearFrom: 2010, yearTo: 2012, component: 'Fluido de freio DOT 4 (racing recomendado)', intervalKm: null, intervalMonths: 24, notes: 'Motul RBF 600 recomendado. Anual se uso em pista.', priority: 'HIGH', order: 9 },
  { modelName: 'BRUTALE 1090RR', yearFrom: 2010, yearTo: 2012, component: 'Verificação do regulador/retificador de tensão', intervalKm: null, intervalMonths: 12, notes: 'Medir 13,5-14,5V a 4.000 rpm. Substituição preventiva após 30.000 km.', priority: 'CRITICAL', order: 10 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed MV Agusta Brutale Legacy (910R / 910S / 989R / 1078RR / 1090R / 1090RR)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'MV AGUSTA', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'MV AGUSTA', vehicleTypeId: motoType.id },
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

  console.log('✅ MV Agusta Brutale Legacy concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
