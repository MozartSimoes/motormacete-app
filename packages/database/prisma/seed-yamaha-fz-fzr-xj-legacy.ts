// seed-yamaha-fz-fzr-xj-legacy.ts — Yamaha naked/sport-touring 600-1200cc legado, descontinuadas
// FAZER 600/FZ6 S · FZ6 N · FZR 1000 · FZR 600 · XJ 600 · XJ6 F · XJ6 N SP · XJ6 N/ABS · XJR 1200
// RD 350 LC/R (bônus 2 tempos clássica, mesma era de legado Yamaha)
//
// Todas descontinuadas no Brasil. FZ6/XJ6 são a geração mais recente (injetadas, ~2009-2017);
// FZR 600/1000 e XJR 1200 são anos 90, carburadas com carburadores múltiplos (4x); XJ 600 é
// carburada, anos 90, motor mais simples que a XJ6; RD 350 LC/R é 2 tempos clássica, anos 80.
//
// ATENÇÃO — matching de modelName com a FIPE (ver apps/web/app/api/tips/route.ts::matchesStoredName):
// a rota combina os tips de TODAS as modelName salvas que derem match por substring/word-boundary,
// não apenas a mais específica. Todos os modelName abaixo foram testados programaticamente contra
// as ~145 strings atuais da FIPE Yamaha (marca 101) e contra todos os modelName já usados nos demais
// arquivos seed-yamaha-*.ts: cada um bate em exatamente 1 string FIPE (a pretendida) e não colide com
// nenhum outro modelName da base. Pontos de atenção específicos:
// - "XJ 600" (com espaço) NUNCA colide com "XJ6 F"/"XJ6 N SP"/"XJ6 N/ABS" (sem espaço) — \bXJ 600\b
//   exige o literal "XJ 600" com espaço, que XJ6 nunca contém, e vice-versa \bXJ6 F\b não bate em "XJ 600".
// - "XJ6 F", "XJ6 N SP" e "XJ6 N/ABS" são 3 variantes de carenagem/freio da MESMA plataforma XJ6
//   (F = com carenagem/faired, N = naked, N/ABS = naked com ABS, N SP = naked "Special" com detalhes
//   diferenciados) — conteúdo de motor/manutenção é idêntico entre as 3; cada uma tem modelName próprio
//   (não um "XJ6" bare) porque bare colidiria nas 3 ao mesmo tempo, o que aqui é aceitável mas optamos
//   por manter granularidade para permitir nota específica de ABS/SP futuramente.
// - "FZR 600" e "FZR 1000" são motos diferentes (600 vs 1000cc) — nunca usar "FZR" bare.
// - "FAZER 600" (usado como modelName, casa com a FIPE "FAZER 600/ FZ6 S") e "FZ6 N" são a mesma
//   plataforma FZ6 (full-fairing S vs naked N) — mantidos como blocos separados pois são strings FIPE
//   distintas, mas reaproveitam o mesmo conteúdo técnico de motor/manutenção.
// - "RD 350 LC" casa com a FIPE "RD 350 LC/ R" (motor idêntico entre as versões LC e LC-R, a R tinha
//   carenagem meia-fuselagem e alguns ajustes de suspensão).
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

// ─── FZ6 (FAZER 600/FZ6 S com carenagem · FZ6 N naked) — 2004-2010 ────────────
// Motor: 4 cilindros em linha, 600cc (599cc), DOHC 16V, refrigerado a líquido,
// baseado no motor da YZF-R6 (versão detonada para uso rodoviário, ~98 cv).
// Injeção eletrônica (não carburada). Óleo 10W-40 ~2,9-3,1 L com filtro.
// Vela NGK CR9E. Corrente 525. Vendida no Brasil ~2007-2010 (importada).

const FZ6_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 4 cilindros 600cc DOHC derivado da YZF-R6 — óleo 10W-40 sintético, ~3,1 L com filtro; use óleo de moto (não automotivo) por causa da embreagem multidisco em banho de óleo',
    body: 'A FZ6/FZ6 N usa uma versão "detonada" (menos potente, mais linear) do motor 4 cilindros da YZF-R6, com câmbio e embreagem compartilhando o mesmo óleo do motor. Use sempre óleo específico para moto com especificação JASO MA/MA2 (10W-40 sintético) — óleo automotivo com aditivos de fricção reduzida (para economia de combustível em carros) pode fazer a embreagem multidisco escorregar. Capacidade: ~3,1 L com troca de filtro, ~2,9 L só dreno. Filtro Hiflofiltro HF204. Troca: 6.000 km.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR9E (gap 0,8-0,9 mm) × 4 unidades — acesso pelo tanque, precisa remover o tanque de combustível para trocar',
    body: 'As 4 velas do motor DOHC da FZ6 ficam sob o tanque de combustível — a troca exige remoção do tanque (destravar trava traseira + desconectar mangueira e sensor de nível). NGK CR9E, gap 0,8-0,9 mm, torque 12-15 Nm. Troca: 12.000 km. Como o acesso é trabalhoso, revisões que envolvam vela costumam ser feitas junto com outros itens que também pedem remoção do tanque (filtro de ar, cabos).',
  },
  {
    severity: 'WARN',
    title: 'Regulador retificador (retificador de voltagem) é o ponto fraco elétrico documentado da família FZ6 — falha causa bateria não carregando ou sobrecarga',
    body: 'O regulador retificador original da FZ6 tem histórico de falha prematura (aquecimento excessivo, mau contato do conector). Sintomas: bateria descarregando mesmo rodando bastante, luzes piscando em marcha lenta, ou o oposto — bateria "fervendo" por sobrecarga de tensão. Teste com multímetro: com o motor em 4.000 rpm, a tensão na bateria deve ficar entre 14,0-14,8 V. Fora dessa faixa: regulador suspeito. Peça genérica/compatível (SGM ou Shindengen) custa bem menos que a original Yamaha e resolve o problema na maioria dos casos.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 — kit relação 45T (coroa) / 16T (pinhão); revisão de folga a cada 1.000 km, mais frequente que motos menores por causa da potência',
    body: 'A FZ6 usa corrente 525 (mais robusta que a 428/520 de motos menores), coerente com os quase 100 cv do motor. Coroa 45 dentes, pinhão 16 dentes. Folga: 30-40 mm no ponto mais apertado da corrente. Lubrificar a cada 500-600 km. Kit completo DID 525VX3 (com o-ring): R$450-650. A potência do motor desgasta a corrente mais rápido que em motos de baixa cilindrada — inspecionar visualmente (procurar elos "esticados" ou enferrujados) a cada abastecimento.',
  },
  {
    severity: 'OK',
    title: 'Radiador e sistema de arrefecimento líquido — verificar nível do reservatório e estado das mangueiras; motor 4 cilindros aquece mais em trânsito parado que motos 1 cilindro',
    body: 'Ao contrário das motos naked de 1 cilindro da mesma época, a FZ6 é refrigerada a líquido — exige atenção ao nível do reservatório de expansão (marcas MIN/MAX visíveis pelo carenagem lateral) e à integridade das mangueiras de borracha (rachaduras após 10+ anos são comuns). Fluido: etilenoglicol específico para alumínio, trocar a cada 2 anos. Ventoinha: deve ligar automaticamente perto de 100-105°C — se não ligar, verificar o relé e o sensor de temperatura antes de rodar em trânsito parado por muito tempo.',
  },
  {
    severity: 'WARN',
    title: 'Peça de reposição de carenagem (versão S/full-fairing) cada vez mais rara — moto descontinuada há mais de 10 anos no Brasil; priorize a versão N (naked) se quebra de carenagem for preocupação',
    body: 'A FZ6 S (com carenagem, "FAZER 600") tem carenagens frontais e laterais que ficam cada vez mais difíceis de achar novas no mercado brasileiro, já que a moto nunca teve grande volume de vendas aqui (era majoritariamente importada). A versão N (naked, "FZ6 N") sofre bem menos com esse problema por ter menos plástico de carenagem. Ao comprar uma FZ6 S usada, verifique o estado da carenagem antes de fechar negócio — reposição pode exigir importação ou peça usada de doador.',
  },
]

const FZ6_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Regulador retificador falhando é a principal causa de problema elétrico documentado — muitos owners trocam preventivamente ao comprar uma FZ6 usada',
    body: 'Como o regulador original tem histórico de falha, uma prática comum entre owners de FZ6 usada é trocar o regulador preventivamente ao adquirir a moto (peça compatível/genérica custa relativamente pouco frente ao risco de ficar na mão). Sinal de alerta: bateria fraca mesmo depois de carregada, ou farol/lanterna piscando em marcha lenta. Não ignore — regulador queimado pode, em casos extremos, danificar a bateria ou o chicote elétrico por sobretensão.',
  },
  {
    severity: 'WARN',
    title: 'Disponibilidade de peças específicas (plástico de carenagem, alguns sensores) é limitada no Brasil — moto foi vendida em volume baixo e via importação',
    body: 'A FZ6 nunca teve distribuição oficial em grande escala no Brasil (entrou majoritariamente como importação/pequenos lotes), então a rede de concessionárias Yamaha tem estoque limitado ou nulo de peças específicas hoje (a moto saiu de linha há mais de uma década). Peças de motor compartilhadas com outros modelos 600cc da época (algumas correias, filtros, jogo de juntas) são mais fáceis de achar. Peças exclusivas de carenagem, painel e alguns sensores: procure em grupos de owners e desmanches especializados em importados Yamaha.',
  },
  {
    severity: 'OK',
    title: 'Motor 4 cilindros DOHC derivado da R6 é robusto e maduro — poucos problemas de motor documentados além de manutenção normal (corrente de comando, velas, óleo)',
    body: 'O motor da FZ6 é essencialmente uma versão de menor potência e mais durável do motor da YZF-R6 da mesma geração, com curso e relação de compressão ajustados para entregar torque mais linear e durabilidade maior em uso rodoviário/urbano. Não há problema crônico de motor documentado além dos cuidados normais (troca de óleo em dia, regulagem de válvulas, corrente de comando de válvulas). A reputação de confiabilidade da FZ6 é boa — a maior parte das reclamações de owners é sobre elétrica (regulador) e disponibilidade de peças de acabamento.',
  },
]

const FZ6_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção FZ6/FZ6 N por km — motor 4 cilindros 600cc DOHC injetado',
    body: 'Revisão 1.000 km (garantia): óleo grátis + aperto geral + folga de corrente. 6.000 km: óleo 10W-40 sintético MA2 com filtro (~3,1 L, Hiflofiltro HF204). 12.000 km: óleo + filtro + vela NGK CR9E ×4 (gap 0,8-0,9 mm, requer remoção do tanque) + filtro de ar. 18.000 km: óleo + filtro. 24.000 km: óleo + filtro + regulagem de válvulas (verificação de folga — motor DOHC 16V, procedimento mais longo que motor de 1-2 cilindros, geralmente feito por oficina especializada) + corrente de comando (verificar tensor automático). 30.000 km: óleo + filtro + vela. 36.000 km: óleo + filtro + kit corrente 525 completo (coroa 45T + pinhão 16T) + pastilhas de freio (inspeção). A cada 500-600 km: lubrificação da corrente 525, folga 30-40 mm. A cada 2 anos: fluido de arrefecimento (etilenoglicol) + fluido de freio DOT 4. A cada 6 meses: verificação da tensão do regulador retificador em 4.000 rpm (14,0-14,8 V) — item de atenção prioritária nesta moto por histórico de falha documentado.',
  },
]

// ─── XJ6 (F com carenagem meia · N naked · N/ABS naked com ABS) — 2009-2017 ───
// Motor: 4 cilindros em linha, 600cc (599cc), DOHC 16V, refrigerado a líquido,
// baseado no motor da YZF-R6 2003-2004 (mais antigo e menos revvy que o da FZ6,
// recalibrado para torque em baixa/média). Injeção eletrônica. Óleo 10W-40 ~2,7 L
// com filtro. Vela NGK CR9EIA-9 (iridium de fábrica). Corrente 530. Vendida no
// Brasil oficialmente pela Yamaha ~2010-2017 — bem mais popular que a FZ6.

const XJ6_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 4 cilindros 600cc DOHC (base R6 2003-2004 recalibrada para torque em baixa) — óleo 10W-40 sintético MA2, ~2,7 L com filtro Hiflofiltro HF303',
    body: 'A XJ6 usa um motor de origem R6 (geração 2003-2004), mas com árvore de comando, mapa de injeção e relação de câmbio recalibrados para entregar torque mais cedo (uso urbano/rodoviário) em vez de potência de pico em alta rotação (uso de pista da R6 original). Óleo 10W-40 JASO MA2, ~2,7 L com troca de filtro. Filtro Hiflofiltro HF303. Troca: 6.000 km. Embreagem multidisco em banho de óleo — nunca use óleo automotivo com aditivo de fricção reduzida.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR9EIA-9 (iridium de fábrica) × 4 unidades — acesso também pelo tanque; intervalo mais longo que vela comum por ser iridium',
    body: 'A XJ6 já vem de fábrica com vela iridium NGK CR9EIA-9, gap 0,8 mm, que dura mais que a vela de níquel convencional da FZ6 (CR9E). Troca recomendada: 16.000-20.000 km (vs 12.000 km da vela convencional). Acesso também exige remoção do tanque de combustível. Torque de aperto: 12-15 Nm — não aperte demais, rosca da vela em cabeçote de alumínio.',
  },
  {
    severity: 'WARN',
    title: 'Diferenças entre XJ6 F, XJ6 N e XJ6 N/ABS são só de carenagem e freio — motor, câmbio e manutenção são idênticos entre as 3 variantes',
    body: 'A FIPE lista "XJ6 F" (com carenagem meia-fuselagem/half-fairing), "XJ6 N SP" (naked "Special", sem carenagem, com grafismo/acabamento diferenciado) e "XJ6 N/ABS" (naked com sistema de freio ABS). As 3 compartilham o mesmo motor 600cc DOHC e a mesma mecânica de suspensão/transmissão — a diferença está na carenagem frontal/lateral (só a F tem) e na presença ou não do módulo ABS (só a N/ABS tem). Toda peça de motor é intercambiável entre as 3 variantes. Ao procurar peças de carenagem, confirme se é a versão F (com plástico) antes de comprar — a N e a N/ABS não usam essas peças.',
  },
  {
    severity: 'OK',
    title: 'Corrente 530 — kit relação 44T (coroa) / 15T (pinhão); XJ6 tem relação ligeiramente diferente da FZ6 apesar de cilindrada igual',
    body: 'A XJ6 usa corrente 530 (mais robusta ainda que a 525 da FZ6), coroa 44 dentes, pinhão 15 dentes — relação calibrada para o perfil de torque em baixa/média da XJ6. Folga: 25-35 mm. Kit completo DID 530VX3: R$500-700. Lubrificar a cada 500-600 km, mais em uso com garupa/bagagem (a XJ6 é frequentemente usada como moto de viagem/touring leve).',
  },
  {
    severity: 'OK',
    title: 'XJ6 foi vendida oficialmente pela Yamaha no Brasil (ao contrário da FZ6, que era majoritariamente importada) — disponibilidade de peças e rede de concessionárias bem melhor',
    body: 'Diferente da FZ6 (entrada mais restrita/importada), a XJ6 teve distribuição oficial da Yamaha do Brasil entre aproximadamente 2010 e 2017, com volume de vendas relevante. Isso significa peças de motor, elétrica e boa parte da carenagem ainda são encontráveis em concessionárias Yamaha ou fornecedores de peças originais/genuínas, mesmo com a moto fora de linha. Painel digital, sensores e conjunto de injeção também têm mais suporte técnico disponível que motos puramente importadas da mesma época.',
  },
  {
    severity: 'WARN',
    title: 'Regulador retificador — mesmo ponto de atenção documentado da família FZ6 (motor de origem similar); monitore a tensão de carga da bateria',
    body: 'Assim como a FZ6, a XJ6 pode apresentar falha do regulador retificador, embora com menos relatos que a FZ6 (peça revisada nesta geração). Ainda assim, verificar a tensão na bateria com o motor em 4.000 rpm (esperado 14,0-14,8 V) é uma boa prática preventiva, especialmente em unidades mais antigas ou com muita km rodada.',
  },
]

const XJ6_PROBLEMAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor de origem R6 recalibrado — reputação de confiabilidade boa; problemas documentados são majoritariamente de desgaste normal (corrente, pastilhas) e não de motor',
    body: 'A XJ6 tem boa reputação de confiabilidade no mercado brasileiro, sustentada pela distribuição oficial e volume de vendas relevante. Não há problema crônico de motor documentado — os itens mais comuns em fóruns de owners são desgaste normal de corrente/relação (moto usada com garupa/bagagem com frequência, o que acelera o desgaste), pastilhas de freio e, ocasionalmente, regulador retificador.',
  },
  {
    severity: 'WARN',
    title: 'Uso como moto de viagem/touring leve acelera desgaste de corrente, pastilhas e pneus — considere isso no cronograma se o uso real inclui viagens frequentes com garupa',
    body: 'Por ter posição de pilotagem mais ereta e conforto superior à FZ6/FZR, a XJ6 é comumente usada para viagens de médio curso, muitas vezes com garupa e bagagem (bauleto/alforjes). Esse uso mais pesado acelera o desgaste de corrente, pastilhas de freio e pneus em comparação ao uso 100% solo urbano. Se o seu uso é predominantemente de viagem, antecipe os intervalos de inspeção de corrente e freio em cerca de 20-30% frente aos valores de referência de uso urbano solo.',
  },
]

const XJ6_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção XJ6 (F/N/N-ABS) por km — motor 4 cilindros 600cc DOHC, base R6 recalibrada',
    body: 'Revisão 1.000 km (garantia): óleo grátis + aperto geral + folga de corrente. 6.000 km: óleo 10W-40 sintético MA2 com filtro (~2,7 L, Hiflofiltro HF303). 12.000 km: óleo + filtro + filtro de ar. 16.000 km: vela NGK CR9EIA-9 iridium ×4 (gap 0,8 mm, requer remoção do tanque). 18.000 km: óleo + filtro. 24.000 km: óleo + filtro + regulagem/verificação de válvulas (motor DOHC 16V) + corrente de comando (tensor automático). 30.000 km: óleo + filtro. 32.000 km: vela iridium. 36.000 km: óleo + filtro + kit corrente 530 completo (coroa 44T + pinhão 15T) + pastilhas de freio (inspeção, antecipar se uso com garupa/bagagem frequente). A cada 500-600 km: lubrificação da corrente 530, folga 25-35 mm. A cada 2 anos: fluido de arrefecimento + fluido de freio DOT 4 (sistema ABS na versão N/ABS: verificar luz de alerta no painel a cada partida). A cada 6 meses: tensão do regulador retificador em 4.000 rpm (14,0-14,8 V).',
  },
]

// ─── FZR 600 (1989-1999, geração vendida/relevante no Brasil ~1990s) ─────────
// Motor: 4 cilindros em linha, 599cc, DOHC 16V, refrigerado a líquido,
// 4 carburadores Mikuni de corpo duplo/simples (conforme geração). Óleo 10W-40
// ~3,3 L com filtro. Vela NGK DR8ES ou DPR8EA-9 (conforme geração/ignição).
// Corrente 530. Carenagem full-fairing esportiva, época pré-injeção eletrônica.

const FZR600_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: '4 carburadores Mikuni — sincronismo é a manutenção mais crítica e mais negligenciada nesta moto; desbalanceamento causa marcha lenta instável e perda de torque',
    body: 'A FZR 600 usa um banco de 4 carburadores Mikuni (um por cilindro), interligados por uma barra de comando comum. Com o tempo e o uso, os 4 carburadores saem de sincronismo entre si — sintomas: marcha lenta instável/oscilando, vibração incomum em certas faixas de rotação, perda de torque em médias rotações. Sincronismo (balanceamento com vacuômetro de 4 colunas, ajustando os parafusos de ar de cada carburador até igualar a depressão nos 4 cilindros): a cada 10.000-12.000 km ou sempre que notar marcha lenta irregular. Serviço especializado — poucos mecânicos gerais têm o vacuômetro de 4 colunas; procure oficina com experiência em motos esportivas carburadas da época.',
  },
  {
    severity: 'WARN',
    title: 'Combustível com etanol parado nos carburadores — verniz/borracha e entupimento de jatos; esvazie a cuba antes de guardar por mais de 2-3 semanas',
    body: 'Assim como qualquer moto carburada antiga, a FZR 600 sofre com etanol parado nos flutuadores/cubas dos 4 carburadores — o álcool oxida e forma um verniz resinoso que entope os jatos (principal e de marcha lenta), causando marcha lenta irregular ou dificuldade de partida após período parado. Ao guardar a moto por mais de 2-3 semanas: feche o registro de combustível e deixe o motor funcionar até esgotar o que está nos carburadores, ou abra os parafusos de dreno das 4 cubas. Limpeza completa dos 4 carburadores (desmontagem, ultrassom, jatos): serviço de meio período em oficina especializada, R$300-500.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 mineral/semissintético, ~3,3 L com filtro Hiflofiltro HF303 — motor de tecnologia mais antiga tolera bem óleo mineral, mas sintético melhora lubrificação em alta rotação',
    body: 'Óleo 10W-40 JASO MA2, ~3,3 L com troca de filtro (Hiflofiltro HF303 compatível). O motor da FZR 600, sendo de tecnologia dos anos 90, foi projetado para óleo mineral/semissintético da época — óleo sintético moderno funciona bem e melhora a lubrificação em altas rotações (a FZR 600 é uma moto que "gira" bastante, motor esportivo). Troca: 3.000-4.000 km dado a idade do motor e o regime de uso mais esportivo.',
  },
  {
    severity: 'WARN',
    title: 'Peça original cada vez mais rara — moto fora de linha há mais de 20 anos; priorize peças de motor compartilhadas com a família FZR/YZF da época e desmanches especializados',
    body: 'A FZR 600 saiu de linha globalmente no fim dos anos 90 e já não tem suporte de peças originais Yamaha no Brasil. Peças de motor (pistões, anéis, juntas) muitas vezes são compartilhadas ou adaptáveis de outras 600cc 4 cilindros da mesma era (YZF600 Thundercat, FZR 600R). Carenagem e peças de acabamento: praticamente só em desmanches especializados em motos esportivas importadas dos anos 90 ou grupos de owners/colecionadores. Ao comprar peças "genéricas", confirme a compatibilidade de medidas antes de instalar.',
  },
  {
    severity: 'OK',
    title: 'Corrente 530 — kit relação 45T/16T aproximado (confirme a etiqueta na coroa da unidade específica, pode variar por geração/importador)',
    body: 'Corrente 530, com kit relação em torno de 45 dentes (coroa) / 16 dentes (pinhão) — mas como a FZR 600 foi importada por diferentes canais ao longo dos anos 90 (algumas unidades vieram por importação paralela), confirme a numeração exata gravada na coroa antes de comprar peças, pois pode haver pequenas variações entre lotes/anos. Kit DID 530VX3: R$500-700 dependendo do fornecedor.',
  },
]

const FZR600_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Escassez crítica de peças — moto sem suporte oficial Yamaha há mais de 20 anos; planeje com antecedência para itens de motor e carenagem',
    body: 'Por ser uma moto descontinuada há mais de duas décadas, sem nunca ter tido grande volume de vendas oficiais no Brasil (entrada majoritariamente por importação), a FZR 600 sofre com escassez real de peças — tanto de motor quanto (principalmente) de carenagem e acabamento. Antes de comprar uma unidade usada, avalie a disponibilidade de peças críticas (kit de carburadores, correia/corrente de comando, carenagem) em desmanches ou fóruns de colecionadores de motos esportivas dos anos 90.',
  },
  {
    severity: 'WARN',
    title: 'Sincronismo de carburadores desregulado é a queixa mais recorrente de owners — moto "engasgando" ou com marcha lenta ruim quase sempre tem esse diagnóstico',
    body: 'Em fóruns e grupos de owners de FZR 600/FZR 1000/XJR 1200 (todas com bancada de 4 carburadores), o sincronismo desregulado é de longe a queixa mecânica mais comum: marcha lenta instável, "engasgo" em aceleração progressiva, consumo elevado. Antes de suspeitar de problema mais sério (válvulas, ignição), verifique o sincronismo dos carburadores com vacuômetro — resolve a maior parte dos casos.',
  },
  {
    severity: 'OK',
    title: 'Motor 4 cilindros DOHC dos anos 90 é robusto quando bem mantido — problemas geralmente vêm de negligência (óleo vencido, carburador sujo) e não de defeito de projeto',
    body: 'O motor 599cc DOHC 16V da FZR 600 tem reputação de robustez mecânica quando a manutenção básica é respeitada (troca de óleo em dia, sincronismo de carburadores, corrente de comando de válvulas). A maior parte dos problemas relatados por owners vem de anos de negligência em unidades compradas usadas sem histórico claro — óleo nunca trocado, carburadores nunca limpos, corrente de transmissão desgastada além do limite. Antes de rodar uma FZR 600 "resgatada", faça revisão completa (óleo, filtro, velas, sincronismo, corrente) independente do que o vendedor informar.',
  },
]

const FZR600_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção FZR 600 por km — motor 4 cilindros 600cc DOHC carburado (4x Mikuni)',
    body: 'A cada 3.000-4.000 km: óleo 10W-40 MA2 com filtro (~3,3 L, Hiflofiltro HF303). A cada 6.000 km: vela NGK DR8ES ou DPR8EA-9 ×4 (conforme geração/ignição da unidade — confirme no manual ou com a vela removida). A cada 8.000-10.000 km: limpeza/inspeção dos 4 carburadores Mikuni (jatos, cubas) — mais frequente se a moto rodar pouco ou ficar parada por semanas. A cada 10.000-12.000 km: sincronismo dos 4 carburadores com vacuômetro (item crítico, ver macetes). A cada 12.000-15.000 km: regulagem de válvulas (motor DOHC 16V, folga conforme manual de serviço da geração) + corrente de comando. A cada 15.000-18.000 km: kit corrente de transmissão 530 completo. A cada 500-600 km: lubrificação da corrente de transmissão. Antes de guardar por mais de 2-3 semanas: esgotar combustível dos carburadores ou drenar as 4 cubas (evita verniz de etanol). A cada 2 anos: fluido de arrefecimento + fluido de freio DOT 4. Dado o tempo de fabricação (unidades hoje com 25+ anos), inspeção visual de mangueiras de combustível/arrefecimento e borrachas de suspensão a cada revisão é essencial — material de borracha resseca e racha com a idade independente da km rodada.',
  },
]

// ─── FZR 1000 (1987-1995, geração relevante no Brasil ~1990s) ────────────────
// Motor: 4 cilindros em linha, 989-1002cc (conforme geração EXUP/não-EXUP),
// DOHC 20V (5 válvulas por cilindro, tecnologia Genesis da Yamaha), refrigerado
// a líquido, 4 carburadores Mikuni. Válvula EXUP no escapamento nas gerações
// mais recentes (1989+). Óleo 10W-40 ~3,7 L com filtro. Vela NGK DPR9EA-9.
// Corrente 530.

const FZR1000_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 5 válvulas por cilindro (tecnologia Genesis) — regulagem de válvulas mais trabalhosa que motor 4V; sempre por oficina especializada em motos esportivas clássicas',
    body: 'A FZR 1000 usa a tecnologia "Genesis" da Yamaha: 5 válvulas por cilindro (3 admissão + 2 escape) em vez das 4 convencionais, buscando mais área de fluxo de gases. Isso torna a regulagem de válvulas um procedimento mais complexo e demorado que em motores 4V convencionais (mais válvulas para medir e ajustar). Recomenda-se realizar em oficina com experiência específica em motos esportivas Yamaha dos anos 80/90 — muitos mecânicos gerais não têm experiência com esse arranjo de válvulas.',
  },
  {
    severity: 'WARN',
    title: 'Válvula EXUP (Exhaust Ultimate Power valve) no escapamento — cabo de acionamento pode travar/desregular com o tempo; sintoma é perda de torque em médias rotações',
    body: 'As gerações de FZR 1000 a partir de 1989 têm a válvula EXUP, um mecanismo no coletor de escape que altera a contrapressão dos gases conforme a rotação, otimizando torque em baixa/média sem sacrificar potência em alta. O cabo de acionamento (semelhante a um cabo de acelerador) pode desregular ou travar com o tempo/ferrugem. Sintoma de EXUP travada ou desregulada: perda perceptível de torque em rotações médias, resposta "morna" do motor. Verificação: o mecanismo deve se mover livremente ao acionar manualmente (com a moto desligada, seguindo o manual de serviço) — se travado, lubrificar o cabo e a articulação, ou substituir se danificado.',
  },
  {
    severity: 'OK',
    title: '4 carburadores Mikuni — sincronismo crítico como na FZR 600, mas com potência maior (989-1002cc) o desbalanceamento é ainda mais perceptível na entrega de torque',
    body: 'Com um motor de quase 1.000cc e mais potente que a FZR 600, o desbalanceamento entre os 4 carburadores Mikuni na FZR 1000 é ainda mais perceptível: vibração desigual, marcha lenta instável, perda de torque em médias rotações. Sincronismo com vacuômetro de 4 colunas: a cada 10.000-12.000 km, ou sempre que notar irregularidade na marcha lenta ou vibração fora do padrão.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40, ~3,7 L com filtro — motor maior exige mais atenção ao nível dado o regime de uso mais esportivo/alta rotação desta moto',
    body: 'Óleo 10W-40 JASO MA2, aproximadamente 3,7 L com troca de filtro (Hiflofiltro HF303 ou equivalente compatível com a família FZR/YZF da época — confirme a numeração exata para a sua unidade). Troca: 3.000-4.000 km. Como a FZR 1000 é uma moto esportiva de alta rotação (uso mais "espremido" do motor comparado a uma naked comum), o óleo se degrada mais rápido — não estenda o intervalo além do recomendado mesmo com pouco uso.',
  },
  {
    severity: 'WARN',
    title: 'Peça rara e cara — moto de colecionador hoje; peças de motor específicas (pistões 5V, EXUP) e carenagem exigem busca em mercado internacional/importação',
    body: 'A FZR 1000 é hoje uma moto essencialmente de colecionador no Brasil, com produção encerrada há quase 30 anos. Peças específicas do motor 5 válvulas e do mecanismo EXUP são raras no mercado nacional — muitos owners recorrem a fornecedores internacionais (eBay, fóruns internacionais de FZR/Genesis) ou desmanches especializados em motos esportivas clássicas japonesas. Antes de comprar, avalie o estado geral e a documentação/histórico de manutenção — restaurar peças raras do zero pode custar mais que o valor da moto.',
  },
]

const FZR1000_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Válvula EXUP travada por ferrugem/falta de uso é queixa recorrente em unidades que ficaram muito tempo paradas — perda de torque em médias rotações é o sintoma clássico',
    body: 'Em motos que passam longos períodos sem uso (comum em unidades de colecionador), o mecanismo EXUP e seu cabo de acionamento tendem a travar por ferrugem ou ressecamento. O sintoma mais reportado por owners é perda de torque nas rotações médias, motor "sem graça" apesar de funcionar normalmente na marcha lenta e em alta rotação. Antes de rodar uma FZR 1000 que ficou parada por meses/anos, verifique manualmente a movimentação da válvula EXUP.',
  },
  {
    severity: 'WARN',
    title: 'Disponibilidade de peças é o maior desafio de manter uma FZR 1000 rodando hoje — mais crítico que qualquer problema mecânico do motor em si',
    body: 'O motor Genesis 5 válvulas da FZR 1000 é mecanicamente robusto quando bem mantido, mas o desafio real de possuir uma hoje é a disponibilidade de peças — praticamente zero suporte de peça original nova no Brasil, dependência de mercado internacional ou desmanches para itens específicos (pistões, kit EXUP, carenagem). Owners recomendam formar um estoque próprio de peças de desgaste comum (juntas, retentores, cabos) preventivamente, já que encontrar sob demanda pode levar semanas.',
  },
  {
    severity: 'OK',
    title: 'Motor Genesis 5V tem histórico de confiabilidade sólido quando a manutenção básica (óleo, sincronismo, EXUP) está em dia — não há defeito crônico de projeto documentado',
    body: 'Apesar de tecnologia mais complexa (5 válvulas, EXUP), o motor da FZR 1000 não tem defeito crônico de projeto conhecido — os problemas relatados por owners são majoritariamente ligados à idade da moto (peças de borracha ressecadas, EXUP travada por falta de uso, ferrugem em tanque) e à disponibilidade de peças, não a falhas mecânicas recorrentes do motor em si.',
  },
]

const FZR1000_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção FZR 1000 por km — motor Genesis 5 válvulas/cilindro, 4 carburadores Mikuni, válvula EXUP',
    body: 'A cada 3.000-4.000 km: óleo 10W-40 MA2 com filtro (~3,7 L). A cada 6.000 km: vela NGK DPR9EA-9 ×4. A cada 8.000-10.000 km: limpeza/inspeção dos 4 carburadores Mikuni. A cada 10.000-12.000 km: sincronismo dos 4 carburadores com vacuômetro + verificação de movimentação livre da válvula EXUP e seu cabo (lubrificar articulação). A cada 12.000-15.000 km: regulagem de válvulas (motor 5V/cilindro — procedimento mais longo, oficina especializada) + corrente de comando. A cada 15.000-18.000 km: kit corrente de transmissão 530 completo. A cada 500-600 km: lubrificação da corrente de transmissão. Antes de guardar por mais de 2-3 semanas: esgotar/drenar combustível dos 4 carburadores. A cada 2 anos: fluido de arrefecimento + fluido de freio DOT 4. Dada a idade das unidades hoje (30+ anos): inspeção completa de borrachas (mangueiras de combustível e arrefecimento, retentores de bengala) a cada revisão, independente da km — material se deteriora com o tempo mesmo em moto pouco usada.',
  },
]

// ─── XJR 1200 (1995-1998, geração vendida/relevante no Brasil ~1990s) ────────
// Motor: 4 cilindros em linha, 1188cc, DOHC 16V, refrigerado a AR (não líquido —
// diferencial da XJR frente à FZR/FZ6/XJ6), 4 carburadores Mikuni BS36. Óleo
// 10W-40 ~3,5 L com filtro. Vela NGK DPR8EA-9. Corrente 630 (mais robusta,
// coerente com o torque de motor grande refrigerado a ar).

const XJR1200_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 1188cc refrigerado a AR (não a líquido) — diferencial da XJR frente às outras motos desta família; exige mais atenção ao óleo, que também ajuda a resfriar o motor',
    body: 'Ao contrário da FZR 600/1000 e da FZ6/XJ6 (todas refrigeradas a líquido), a XJR 1200 usa refrigeração a ar (com auxílio de radiador de óleo) em um motor grande de 1188cc — arquitetura clássica "UJM" (Universal Japanese Motorcycle) dos anos 80/90. Isso torna o óleo ainda mais crítico para o controle de temperatura do motor: nunca rode com nível baixo, e considere óleo com boa resistência térmica (10W-40 ou 10W-50 sintético) especialmente em uso em trânsito parado ou clima muito quente.',
  },
  {
    severity: 'WARN',
    title: 'Radiador de óleo — verificar aletas limpas e livre de insetos/sujeira; motor a ar depende muito mais deste componente que motores líquido-refrigerados',
    body: 'O radiador de óleo da XJR 1200 é a principal defesa contra superaquecimento em um motor sem líquido de arrefecimento circulando pelo bloco. Aletas entupidas com insetos, poeira ou lama reduzem drasticamente a eficiência de resfriamento. Limpar com jato de ar comprimido (nunca água sob pressão direta nas aletas) a cada 5.000-8.000 km ou sempre que notar sujeira visível. Em trânsito parado por muito tempo em dias quentes: motor a ar aquece mais que motor líquido — evite prolongar demais parado com o motor ligado.',
  },
  {
    severity: 'OK',
    title: '4 carburadores Mikuni BS36 — sincronismo crítico como nas demais motos de carburador múltiplo desta família; motor grande torna desbalanceamento ainda mais perceptível',
    body: 'A XJR 1200 usa 4 carburadores Mikuni BS36. Assim como na FZR 600/1000, o sincronismo entre os 4 corpos é a manutenção mais crítica e mais frequentemente negligenciada — desbalanceamento causa marcha lenta instável, vibração desigual e perda de torque. Sincronismo com vacuômetro de 4 colunas: a cada 10.000-12.000 km.',
  },
  {
    severity: 'OK',
    title: 'Corrente 630 — mais robusta que a 525/530 das outras motos desta família, coerente com o torque elevado do motor 1188cc',
    body: 'A XJR 1200 usa corrente 630 (passo maior, mais resistente), adequada ao torque elevado do motor 1188cc. Kit relação: confirme a numeração gravada na coroa da unidade específica (pode variar por lote/importador). Kit corrente 630 completo: mais caro que os kits 520/525/530 das motos menores desta família, dado o passo maior. Lubrificar a cada 500-600 km.',
  },
  {
    severity: 'WARN',
    title: 'Moto de colecionador hoje — peças específicas (cilindros com aletas de refrigeração a ar, carenagem/tanque clássico) exigem mercado internacional ou desmanches especializados',
    body: 'A XJR 1200 é hoje moto de nicho/colecionador no Brasil, com estilo clássico "retrô" (motor à mostra com aletas de refrigeração a ar, design UJM). Peças específicas do motor a ar (cilindros aletados, tampa de válvulas) e itens de acabamento clássico são raros no mercado nacional — recorra a fóruns internacionais de XJR e desmanches especializados em motos clássicas japonesas. O visual "motor nu" a ar é também parte do apelo da moto para quem a busca hoje.',
  },
]

const XJR1200_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Superaquecimento em trânsito parado é mais crítico nesta moto que nas demais desta família — motor a ar depende de circulação de vento, que falta parado no trânsito',
    body: 'Por ser refrigerada a ar (não a líquido), a XJR 1200 é mais sensível a superaquecimento em situações de trânsito parado ou engarrafamento prolongado que a FZR/FZ6/XJ6 (todas líquido-refrigeradas, com radiador e ventoinha ativa). Em dias quentes ou trânsito muito lento: monitore sinais de superaquecimento (cheiro de óleo quente, motor "duro" ao acelerar) e evite prolongar parado com o motor ligado sem necessidade.',
  },
  {
    severity: 'WARN',
    title: 'Sincronismo de carburadores desregulado — mesma queixa recorrente da família FZR (bancada de 4 carburadores Mikuni); resolve a maior parte dos casos de marcha lenta ruim',
    body: 'Como nas demais motos desta família com carburador múltiplo (FZR 600, FZR 1000), o desbalanceamento entre os 4 carburadores Mikuni BS36 é a causa mais comum de marcha lenta instável e perda de torque reportada por owners de XJR 1200. Verificar sincronismo com vacuômetro antes de suspeitar de problemas mais sérios.',
  },
  {
    severity: 'OK',
    title: 'Motor a ar de arquitetura clássica (UJM) tem reputação de robustez e longevidade quando bem mantido — problema documentado é mais de disponibilidade de peças que de mecânica',
    body: 'O motor 1188cc a ar da XJR 1200 segue a arquitetura clássica "Universal Japanese Motorcycle" dos anos 80/90, conhecida por robustez e longevidade quando a manutenção básica (óleo, radiador de óleo limpo, sincronismo de carburadores) é respeitada. Não há defeito crônico de projeto documentado — o principal desafio de manter uma XJR 1200 rodando hoje é a disponibilidade de peças específicas, não a confiabilidade mecânica em si.',
  },
]

const XJR1200_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção XJR 1200 por km — motor 1188cc refrigerado a ar, 4 carburadores Mikuni BS36',
    body: 'A cada 3.000-4.000 km: óleo 10W-40 (ou 10W-50 em clima quente/uso urbano) com filtro, ~3,5 L. A cada 5.000-8.000 km: limpeza das aletas do radiador de óleo (ar comprimido). A cada 6.000 km: vela NGK DPR8EA-9 ×4. A cada 8.000-10.000 km: limpeza/inspeção dos 4 carburadores Mikuni BS36. A cada 10.000-12.000 km: sincronismo dos 4 carburadores com vacuômetro. A cada 12.000-15.000 km: regulagem de válvulas (motor DOHC 16V) + corrente de comando. A cada 15.000-18.000 km: kit corrente de transmissão 630 completo (passo maior — mais caro que kits das motos menores da família). A cada 500-600 km: lubrificação da corrente. Antes de guardar por mais de 2-3 semanas: esgotar/drenar combustível dos 4 carburadores. A cada 2 anos: fluido de freio DOT 4 (sem fluido de arrefecimento — motor a ar). Dada a idade das unidades hoje (25+ anos): inspeção de borrachas e mangueiras de combustível a cada revisão, independente da km rodada.',
  },
]

// ─── XJ 600 (anos 90, carburada) ──────────────────────────────────────────────
// Motor: 4 cilindros em linha, 598cc, DOHC 8V (2 válvulas por cilindro — mais
// simples que o motor 16V da XJ6 moderna), refrigerado a ar, 4 carburadores
// Mikuni BS34. Óleo 10W-40 ~3,3 L com filtro. Vela NGK DPR8EA-9. Corrente 530.
// Moto anterior à XJ6 injetada — não confundir as duas gerações.

const XJ600_MACETES: TipInput[] = [
  {
    severity: 'WARN',
    title: 'NÃO confundir com a XJ6 (moderna, injetada, 2010+) — a XJ 600 é geração anterior, carburada, motor 8V (2 válvulas/cilindro) refrigerado a ar; mecânica e peças são completamente diferentes',
    body: 'A FIPE lista "XJ 600" (com espaço) separadamente de "XJ6 F"/"XJ6 N SP"/"XJ6 N/ABS" (sem espaço) — são motos de gerações e mecânica totalmente diferentes. A XJ 600 é anos 90, carburada (4 carburadores Mikuni BS34), motor 8 válvulas (2 por cilindro) refrigerado a ar. A XJ6 moderna (2010+) é injetada, motor 16 válvulas (4 por cilindro), refrigerada a líquido, com base no motor da R6. Nenhuma peça de motor é intercambiável entre as duas. Ao comprar peças, sempre confirme qual geração você tem — o nome parecido causa confusão frequente entre owners e em anúncios de peças usadas.',
  },
  {
    severity: 'OK',
    title: 'Motor 598cc DOHC 8V refrigerado a ar — mais simples mecanicamente que a XJ6 moderna; óleo 10W-40, ~3,3 L com filtro Hiflofiltro compatível com a família UJM da época',
    body: 'A XJ 600 usa motor de arquitetura mais simples (2 válvulas por cilindro, refrigeração a ar) que sua sucessora XJ6. Óleo 10W-40 JASO MA2, ~3,3 L com troca de filtro. Troca de óleo: 3.000-4.000 km dado a idade da moto hoje. Como não há radiador de água, verifique o radiador de óleo (se equipado nesta geração/versão específica) livre de sujeira nas aletas.',
  },
  {
    severity: 'WARN',
    title: '4 carburadores Mikuni BS34 — sincronismo crítico, mesmo padrão de manutenção das outras motos carburadas desta família (FZR 600/1000, XJR 1200)',
    body: 'Como as demais motos multicilíndricas carburadas desta era (FZR 600, FZR 1000, XJR 1200), a XJ 600 depende de sincronismo regular entre os 4 carburadores Mikuni BS34 para funcionar bem — desbalanceamento causa marcha lenta instável e perda de torque. Sincronismo com vacuômetro de 4 colunas: a cada 10.000-12.000 km. Etanol parado nos carburadores por mais de 2-3 semanas: mesmo risco de verniz/entupimento das outras motos carburadas — esgote o combustível dos carburadores antes de guardar por período longo.',
  },
  {
    severity: 'WARN',
    title: 'Moto rara e com pouquíssimo suporte de peças no Brasil — priorize desmanches e grupos de owners especializados em UJM clássica Yamaha',
    body: 'A XJ 600 (geração anos 90) é hoje uma moto rara no mercado brasileiro, com produção/venda encerrada há décadas e sem suporte de peças originais Yamaha. A confusão de nome com a XJ6 moderna (que tem peças bem mais fáceis de achar) frequentemente atrapalha a busca — sempre pesquise especificando "XJ 600" com espaço e o ano da sua unidade para evitar comprar peça errada da XJ6 injetada.',
  },
]

const XJ600_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Confusão de peças com a XJ6 moderna é o problema mais comum reportado por owners — sempre confirme geração/ano antes de comprar qualquer peça',
    body: 'Por causa da semelhança de nome, é comum owners (principalmente iniciantes na moto) comprarem por engano peças da XJ6 moderna injetada pensando que serviriam na XJ 600 carburada dos anos 90 — não servem, motores e sistemas de alimentação são incompatíveis. Sempre confirme com o vendedor/loja que a peça é específica para a "XJ 600" clássica carburada, não a "XJ6" moderna injetada.',
  },
  {
    severity: 'WARN',
    title: 'Disponibilidade de peças é o maior desafio real de manter a XJ 600 rodando — moto sem suporte oficial e com menor volume de owners/comunidade que a XJ6 moderna',
    body: 'Como moto de geração antiga e sem grande comunidade de owners ativa no Brasil (menor que a da XJ6 moderna, que teve venda oficial em volume maior), encontrar peças específicas da XJ 600 exige mais esforço — desmanches especializados em UJM clássica japonesa e fóruns internacionais tendem a ser as melhores fontes.',
  },
  {
    severity: 'OK',
    title: 'Motor 8V refrigerado a ar é mecanicamente simples e robusto — problemas documentados são majoritariamente de idade da moto (borrachas, carburadores) e não de defeito de projeto',
    body: 'O motor mais simples (2 válvulas por cilindro, refrigeração a ar) da XJ 600 tende a ser robusto e de manutenção relativamente acessível quando bem cuidado — os problemas relatados por owners são majoritariamente ligados à idade da moto (30+ anos: borrachas ressecadas, carburadores desregulados por falta de uso, ferrugem em tanque) e à escassez de peças, não a falhas mecânicas de projeto.',
  },
]

const XJ600_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção XJ 600 por km — motor 598cc DOHC 8V refrigerado a ar, 4 carburadores Mikuni BS34 (NÃO confundir com a XJ6 moderna injetada)',
    body: 'A cada 3.000-4.000 km: óleo 10W-40 MA2 com filtro (~3,3 L). A cada 6.000 km: vela NGK DPR8EA-9 ×4. A cada 8.000-10.000 km: limpeza/inspeção dos 4 carburadores Mikuni BS34. A cada 10.000-12.000 km: sincronismo dos 4 carburadores com vacuômetro. A cada 12.000-15.000 km: regulagem de válvulas (motor 8V, 2 válvulas/cilindro — procedimento mais simples que o 16V da XJ6 moderna) + corrente de comando. A cada 15.000-18.000 km: kit corrente de transmissão 530 completo. A cada 500-600 km: lubrificação da corrente. Antes de guardar por mais de 2-3 semanas: esgotar/drenar combustível dos 4 carburadores. A cada 2 anos: fluido de freio DOT 4. Dada a idade das unidades hoje (30+ anos): inspeção completa de borrachas/mangueiras a cada revisão. IMPORTANTE: ao comprar qualquer peça, confirme que é específica para a "XJ 600" clássica carburada — não serve peça da "XJ6" moderna injetada (motor e sistema de alimentação diferentes).',
  },
]

// ─── RD 350 LC/R (anos 80, 2 tempos clássica) ─────────────────────────────────
// Motor: 2 cilindros em linha, 2 tempos, 347cc, refrigerado a líquido (o "LC" no
// nome significa "Liquid Cooled"), 2 carburadores Mikuni. Pré-mistura de óleo
// via bomba Autolube (não precisa misturar manualmente no tanque, salvo pane
// da bomba). Vela NGK B8ES ou BR8ES. Corrente 530. Versão "R" tinha carenagem
// meia-fuselagem e pequenos ajustes de suspensão frente à LC "nua".

const RD350LC_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 2 tempos 347cc bicilíndrico refrigerado a LÍQUIDO (o "LC" do nome) — sistema Autolube de lubrificação automática; confirme funcionamento antes de confiar 100% nele',
    body: 'A RD 350 LC tem sistema Autolube: uma bomba mecânica que injeta óleo 2T proporcional à rotação do motor, dispensando pré-mistura manual no tanque de combustível. Em moto com 35-40+ anos, essa bomba pode ter mangueira ressecada, cabo de acionamento desregulado ou o próprio mecanismo desgastado. Teste antes de rodar: com o motor desligado e acelerador todo aberto, desconecte a mangueira de saída da bomba e veja se há óleo fluindo ao acionar (seguindo o procedimento do manual de serviço). Sem confiança total no Autolube: faça pré-mistura manual 25:1 a 32:1 (verificar especificação exata do óleo usado) direto no tanque como segurança extra.',
  },
  {
    severity: 'WARN',
    title: 'Refrigeração líquida em moto 2 tempos de 40 anos — radiador, mangueiras e bomba d\'água precisam de atenção redobrada; vazamento não percebido pode fundir o motor rápido',
    body: 'Ao contrário de muitas 2 tempos clássicas refrigeradas a ar, a RD 350 LC tem radiador de água — diferencial de desempenho na época, mas hoje um ponto de atenção extra em moto com décadas de uso. Mangueiras de borracha ressecam e racham com a idade (verificar visualmente antes de cada saída), a bomba d\'água pode ter o retentor gasto (vazamento de líquido misturado com óleo é sinal de retentor da bomba falhando). Motor 2 tempos superaquecido funde MUITO mais rápido que motor 4 tempos — não ignore sinais de perda de líquido de arrefecimento.',
  },
  {
    severity: 'OK',
    title: '2 carburadores Mikuni — sincronismo entre os 2 cilindros é essencial; motor 2T é mais sensível a desbalanceamento que 4T por causa da resposta mais direta ao giro',
    body: 'A RD 350 LC usa 2 carburadores Mikuni (um por cilindro). Sincronismo entre os dois: verificação a cada 6.000-8.000 km, mais frequente que motor 4T porque a resposta do 2 tempos ao desbalanceamento é mais perceptível (vibração desigual, marcha lenta instável entre os cilindros). Etanol parado nos carburadores: mesmo risco de verniz/entupimento das demais motos carburadas — esgote o combustível antes de guardar por mais de 2-3 semanas.',
  },
  {
    severity: 'WARN',
    title: 'Peça de motor 2 tempos é rara e cara hoje — pistões, aneis e kit de retífica exigem fornecedor especializado em 2T clássica; não é peça de prateleira comum',
    body: 'Motos 2 tempos de mais de 300cc saíram de linha há décadas em praticamente todo o mundo (regulação de emissões inviabilizou o 2T grande). Pistões, anéis e kits de retífica para o motor da RD 350 LC não são peça de prateleira em lojas comuns — procure fornecedores especializados em motos 2 tempos clássicas (nacionais ou internacionais) e comunidades de owners/colecionadores de RD. Planeje a compra de peças de desgaste com antecedência.',
  },
  {
    severity: 'OK',
    title: 'Versão "R" (meia-fuselagem) e "LC" (nua) compartilham o mesmo motor — diferença é carenagem e pequenos ajustes de suspensão, não mecânica de motor',
    body: 'A FIPE lista "RD 350 LC/ R" como uma entrada única, cobrindo tanto a versão LC (sem carenagem/nua) quanto a R (com carenagem meia-fuselagem e ajustes de suspensão ligeiramente diferentes). O motor 2 tempos 347cc bicilíndrico e toda a manutenção de motor são idênticos entre as duas — a diferença prática está na carenagem frontal (só a R tem) e pequenos detalhes de calibração de suspensão.',
  },
]

const RD350LC_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vazamento no sistema de arrefecimento é a queixa mais séria documentada — em motor 2 tempos, superaquecimento funde pistão muito mais rápido que em 4 tempos',
    body: 'Por ser um motor 2 tempos (sem a "folga térmica" que motores 4 tempos têm por rodarem mais frios em média), a RD 350 LC é mais vulnerável a dano severo em caso de superaquecimento por vazamento no sistema de arrefecimento — mangueira rachada, bomba d\'água com retentor gasto, radiador entupido. Owners recomendam revisão completa do sistema de arrefecimento (mangueiras, braçadeiras, bomba, radiador) antes de qualquer uso intenso, especialmente em unidades com histórico de manutenção desconhecido.',
  },
  {
    severity: 'WARN',
    title: 'Disponibilidade de peças de motor 2 tempos é o maior desafio — pistões e kits de retífica exigem planejamento e fornecedores especializados',
    body: 'Como toda 2 tempos de cilindrada grande descontinuada há décadas, a RD 350 LC sofre com escassez de peças de motor específicas (pistões, anéis, kits de retífica, componentes do Autolube). Owners recomendam formar um estoque preventivo de peças de desgaste conhecido e cultivar contato com comunidades/fóruns especializados em RD clássica, nacionais e internacionais.',
  },
  {
    severity: 'OK',
    title: 'Motor 2T bicilíndrico é simples mecanicamente (menos peças móveis que um 4 tempos DOHC) — quando bem mantido (Autolube funcionando, arrefecimento em dia), reputação de confiabilidade é boa para o padrão da época',
    body: 'Apesar da idade e da tecnologia mais simples, o motor 2 tempos da RD 350 LC tem menos peças móveis internas que um motor 4 tempos DOHC multicilíndrico (sem válvulas, comando de válvulas, tuchos) — o que simplifica parte da manutenção mecânica interna. Os problemas documentados por owners concentram-se em: sistema Autolube (verificação de funcionamento), arrefecimento (vazamentos) e disponibilidade de peças — não em falhas crônicas do desenho do motor em si.',
  },
]

const RD350LC_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção RD 350 LC/R por km — motor 2 tempos 347cc bicilíndrico refrigerado a líquido, sistema Autolube, 2 carburadores Mikuni',
    body: 'A cada abastecimento: verificar nível do reservatório de óleo 2T do sistema Autolube (nunca deixe esvaziar — sem óleo, o motor 2 tempos funde em minutos). A cada 3.000-4.000 km: vela NGK B8ES ou BR8ES ×2 — 2 tempos suja vela mais rápido que 4 tempos, inspecionar a cor/estado a cada revisão. A cada 6.000-8.000 km: sincronismo dos 2 carburadores Mikuni + verificação do funcionamento da bomba Autolube (teste de fluxo). A cada 8.000-10.000 km: limpeza dos 2 carburadores (jatos, cubas). A cada 2 anos ou 15.000-20.000 km: inspeção do cilindro/pistão (desgaste de motor 2 tempos é diferente do 4 tempos — folga de anéis e estado da parede do cilindro precisam de avaliação por mecânico especializado em 2T). A cada 500-600 km: lubrificação da corrente de transmissão 530. Antes de guardar por mais de 2-3 semanas: esgotar/drenar combustível dos carburadores. A cada 1-2 anos: fluido de arrefecimento + inspeção visual completa de mangueiras/braçadeiras do sistema de arrefecimento (item crítico nesta moto — vazamento não percebido funde o motor rápido). Dada a idade das unidades hoje (35-40+ anos): revisão geral de borrachas, cabos e vedações a cada manutenção, independente da km rodada.',
  },
]

// ─── Tire Pressures ───────────────────────────────────────────────────────────

const TIRE_PRESSURES = [
  {
    modelName: 'FAZER 600',
    yearFrom: 2004, yearTo: 2010,
    tireSize: '120/60-17 (F) · 160/60-17 (R)',
    frontPsi: 33, rearPsi: 39, frontPsiLoad: 33, rearPsiLoad: 42,
    notes: 'Versão S com carenagem full-fairing. Pneu esportivo/rodoviário. Verificar calibragem a frio.',
  },
  {
    modelName: 'FZ6 N',
    yearFrom: 2004, yearTo: 2010,
    tireSize: '120/60-17 (F) · 160/60-17 (R)',
    frontPsi: 33, rearPsi: 39, frontPsiLoad: 33, rearPsiLoad: 42,
    notes: 'Mesmos pneus da versão S (FAZER 600), só muda a carenagem. Naked sem para-brisa integral.',
  },
  {
    modelName: 'XJ6 F',
    yearFrom: 2009, yearTo: 2017,
    tireSize: '120/70-17 (F) · 160/60-17 (R)',
    frontPsi: 33, rearPsi: 39, frontPsiLoad: 33, rearPsiLoad: 42,
    notes: 'Versão com carenagem meia-fuselagem (half-fairing). Mesmos pneus das variantes N e N/ABS.',
  },
  {
    modelName: 'XJ6 N SP',
    yearFrom: 2009, yearTo: 2017,
    tireSize: '120/70-17 (F) · 160/60-17 (R)',
    frontPsi: 33, rearPsi: 39, frontPsiLoad: 33, rearPsiLoad: 42,
    notes: 'Versão naked "Special". Mesma mecânica e pneus da XJ6 F e XJ6 N/ABS.',
  },
  {
    modelName: 'XJ6 N/ABS',
    yearFrom: 2009, yearTo: 2017,
    tireSize: '120/70-17 (F) · 160/60-17 (R)',
    frontPsi: 33, rearPsi: 39, frontPsiLoad: 33, rearPsiLoad: 42,
    notes: 'Versão naked com ABS. Mesma mecânica e pneus da XJ6 F e XJ6 N SP.',
  },
  {
    modelName: 'FZR 600',
    yearFrom: 1989, yearTo: 1999,
    tireSize: '120/70-17 (F) · 160/60-17 (R)',
    frontPsi: 32, rearPsi: 38, frontPsiLoad: 32, rearPsiLoad: 41,
    notes: 'Confirme medida exata gravada no pneu original — variou entre gerações/importadores ao longo da produção.',
  },
  {
    modelName: 'FZR 1000',
    yearFrom: 1987, yearTo: 1995,
    tireSize: '120/70-17 (F) · 170/60-17 (R)',
    frontPsi: 32, rearPsi: 40, frontPsiLoad: 32, rearPsiLoad: 42,
    notes: 'Confirme medida exata gravada no pneu original — variou entre gerações EXUP/não-EXUP.',
  },
  {
    modelName: 'XJ 600',
    yearFrom: 1990, yearTo: 1999,
    tireSize: '110/80-18 (F) · 130/70-18 (R)',
    frontPsi: 28, rearPsi: 32, frontPsiLoad: 28, rearPsiLoad: 36,
    notes: 'Geração anos 90, carburada. NÃO confundir com pneus/medidas da XJ6 moderna (aro 17").',
  },
  {
    modelName: 'XJR 1200',
    yearFrom: 1995, yearTo: 1998,
    tireSize: '120/70-17 (F) · 170/60-18 (R)',
    frontPsi: 32, rearPsi: 40, frontPsiLoad: 32, rearPsiLoad: 42,
    notes: 'Confirme medida exata gravada no pneu original antes de comprar reposição — moto de nicho/importação.',
  },
  {
    modelName: 'RD 350 LC',
    yearFrom: 1980, yearTo: 1985,
    tireSize: '90/90-18 (F) · 110/90-18 (R)',
    frontPsi: 26, rearPsi: 30, frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Confirme medida exata gravada no pneu original — moto clássica de mais de 40 anos, câmara de ar geralmente necessária (aro raiado).',
  },
]

// ─── Manutenção ──────────────────────────────────────────────────────────────

const makeFz6 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40 MA2 (~3,1 L com filtro Hiflofiltro HF204)', intervalKm: 6000, intervalMonths: 12, notes: 'Embreagem multidisco em banho de óleo — nunca use óleo automotivo com aditivo de fricção reduzida.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK CR9E ×4 (gap 0,8-0,9 mm)', intervalKm: 12000, intervalMonths: 24, notes: 'Acesso pelo tanque — requer remoção do tanque de combustível.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas (motor DOHC 16V)', intervalKm: 24000, intervalMonths: 36, notes: 'Motor derivado da YZF-R6. Procedimento longo — oficina especializada.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 525 — lubrificação + folga (30-40 mm)', intervalKm: 550, intervalMonths: null, notes: 'Kit relação 45T/16T. DID 525VX3 recomendado.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit corrente 525 completo (coroa 45T + pinhão 16T)', intervalKm: 20000, intervalMonths: null, notes: 'Potência do motor desgasta corrente mais rápido que motos menores.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulador retificador — verificação de tensão (4.000 rpm)', intervalKm: null, intervalMonths: 6, notes: 'Esperado 14,0-14,8 V. Ponto fraco elétrico documentado da FZ6 — peça compatível SGM/Shindengen se falhar.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Fluido de arrefecimento (etilenoglicol)', intervalKm: null, intervalMonths: 24, notes: 'Verificar nível do reservatório de expansão regularmente. Mangueiras: inspecionar rachaduras.', priority: 'MEDIUM', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Trocar a cada 2 anos independente do aspecto visual.', priority: 'MEDIUM', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Inspeção/troca junto com vela por exigir acesso semelhante.', priority: 'MEDIUM', order: 9 },
]

const makeXj6 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40 MA2 (~2,7 L com filtro Hiflofiltro HF303)', intervalKm: 6000, intervalMonths: 12, notes: 'Embreagem multidisco em banho de óleo — nunca use óleo automotivo com aditivo de fricção reduzida.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK CR9EIA-9 iridium ×4 (gap 0,8 mm)', intervalKm: 18000, intervalMonths: 30, notes: 'Iridium de fábrica — intervalo mais longo que a vela convencional da FZ6. Acesso pelo tanque.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem/verificação de válvulas (motor DOHC 16V)', intervalKm: 24000, intervalMonths: 36, notes: 'Motor derivado da YZF-R6 2003-2004 recalibrado para torque em baixa.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 530 — lubrificação + folga (25-35 mm)', intervalKm: 550, intervalMonths: null, notes: 'Kit relação 44T/15T. Mais frequente se uso com garupa/bagagem.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit corrente 530 completo (coroa 44T + pinhão 15T)', intervalKm: 20000, intervalMonths: null, notes: 'DID 530VX3. Antecipar se uso frequente de viagem/touring com carga.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulador retificador — verificação de tensão (4.000 rpm)', intervalKm: null, intervalMonths: 6, notes: 'Esperado 14,0-14,8 V. Menos relatos de falha que a FZ6, mas verificação preventiva recomendada.', priority: 'MEDIUM', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Fluido de arrefecimento', intervalKm: null, intervalMonths: 24, notes: 'Verificar nível regularmente. Mangueiras: inspecionar rachaduras.', priority: 'MEDIUM', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Versão N/ABS: verificar luz de alerta do ABS no painel a cada partida.', priority: 'MEDIUM', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas de freio — inspeção', intervalKm: 10000, intervalMonths: null, notes: 'Antecipar se uso frequente com garupa/bagagem (viagem/touring).', priority: 'HIGH', order: 9 },
]

const makeCarbInline4 = (m: string, yf: number, yt: number, opts: { oilL: string; filtro: string; vela: string; correnteSpec: string; kitRelacao: string; extra?: MaintenanceItemInput[] }): MaintenanceItemInput[] => {
  const base: MaintenanceItemInput[] = [
    { modelName: m, yearFrom: yf, yearTo: yt, component: `Óleo 10W-40 MA2 (${opts.oilL} com filtro ${opts.filtro})`, intervalKm: 3500, intervalMonths: 12, notes: 'Motor de tecnologia mais antiga — óleo sintético melhora lubrificação em alta rotação.', priority: 'CRITICAL', order: 1 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: `Vela ${opts.vela} ×4`, intervalKm: 6000, intervalMonths: 12, notes: 'Verificar cor/estado a cada troca de óleo.', priority: 'HIGH', order: 2 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Limpeza/inspeção dos 4 carburadores Mikuni', intervalKm: 9000, intervalMonths: 18, notes: 'Mais frequente se a moto rodar pouco ou ficar parada por semanas. Etanol parado forma verniz nos jatos.', priority: 'HIGH', order: 3 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Sincronismo dos 4 carburadores (vacuômetro)', intervalKm: 11000, intervalMonths: 18, notes: 'Item crítico — desbalanceamento causa marcha lenta instável e perda de torque. Oficina especializada.', priority: 'CRITICAL', order: 4 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas + corrente de comando', intervalKm: 13500, intervalMonths: 24, notes: 'Motor DOHC — procedimento longo, oficina especializada em motos esportivas clássicas.', priority: 'HIGH', order: 5 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: `Corrente de transmissão ${opts.correnteSpec} — lubrificação`, intervalKm: 550, intervalMonths: null, notes: `Kit relação ${opts.kitRelacao}. Confirme numeração gravada na coroa da unidade específica.`, priority: 'HIGH', order: 6 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: `Kit corrente ${opts.correnteSpec} completo`, intervalKm: 17000, intervalMonths: null, notes: 'Substituir corrente + coroa + pinhão juntos.', priority: 'HIGH', order: 7 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Trocar a cada 2 anos independente do aspecto visual.', priority: 'MEDIUM', order: 8 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Inspeção de borrachas/mangueiras (combustível, arrefecimento, suspensão)', intervalKm: null, intervalMonths: 12, notes: 'Unidades hoje com 25-40+ anos — material se deteriora com o tempo independente da km rodada.', priority: 'HIGH', order: 9 },
  ]
  return opts.extra ? [...base, ...opts.extra] : base
}

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS = [
  { modelName: 'FAZER 600', yearFrom: 2004, yearTo: 2010, MACETES: FZ6_MACETES, PROBLEMAS: FZ6_PROBLEMAS, MANUTENCAO: FZ6_MANUTENCAO },
  { modelName: 'FZ6 N',     yearFrom: 2004, yearTo: 2010, MACETES: FZ6_MACETES, PROBLEMAS: FZ6_PROBLEMAS, MANUTENCAO: FZ6_MANUTENCAO },
  { modelName: 'XJ6 F',     yearFrom: 2009, yearTo: 2017, MACETES: XJ6_MACETES, PROBLEMAS: XJ6_PROBLEMAS, MANUTENCAO: XJ6_MANUTENCAO },
  { modelName: 'XJ6 N SP',  yearFrom: 2009, yearTo: 2017, MACETES: XJ6_MACETES, PROBLEMAS: XJ6_PROBLEMAS, MANUTENCAO: XJ6_MANUTENCAO },
  { modelName: 'XJ6 N/ABS', yearFrom: 2009, yearTo: 2017, MACETES: XJ6_MACETES, PROBLEMAS: XJ6_PROBLEMAS, MANUTENCAO: XJ6_MANUTENCAO },
  { modelName: 'FZR 600',   yearFrom: 1989, yearTo: 1999, MACETES: FZR600_MACETES,  PROBLEMAS: FZR600_PROBLEMAS,  MANUTENCAO: FZR600_MANUTENCAO  },
  { modelName: 'FZR 1000',  yearFrom: 1987, yearTo: 1995, MACETES: FZR1000_MACETES, PROBLEMAS: FZR1000_PROBLEMAS, MANUTENCAO: FZR1000_MANUTENCAO },
  { modelName: 'XJ 600',    yearFrom: 1990, yearTo: 1999, MACETES: XJ600_MACETES,   PROBLEMAS: XJ600_PROBLEMAS,   MANUTENCAO: XJ600_MANUTENCAO   },
  { modelName: 'XJR 1200',  yearFrom: 1995, yearTo: 1998, MACETES: XJR1200_MACETES, PROBLEMAS: XJR1200_PROBLEMAS, MANUTENCAO: XJR1200_MANUTENCAO },
  { modelName: 'RD 350 LC', yearFrom: 1980, yearTo: 1985, MACETES: RD350LC_MACETES, PROBLEMAS: RD350LC_PROBLEMAS, MANUTENCAO: RD350LC_MANUTENCAO },
]

const ALL_MANUTENCAO: MaintenanceItemInput[] = [
  ...makeFz6('FAZER 600', 2004, 2010),
  ...makeFz6('FZ6 N', 2004, 2010),
  ...makeXj6('XJ6 F', 2009, 2017),
  ...makeXj6('XJ6 N SP', 2009, 2017),
  ...makeXj6('XJ6 N/ABS', 2009, 2017),
  ...makeCarbInline4('FZR 600', 1989, 1999, {
    oilL: '~3,3 L', filtro: 'HF303', vela: 'NGK DR8ES/DPR8EA-9', correnteSpec: '530', kitRelacao: '45T/16T (confirme na unidade)',
  }),
  ...makeCarbInline4('FZR 1000', 1987, 1995, {
    oilL: '~3,7 L', filtro: 'HF303 (ou equivalente da família)', vela: 'NGK DPR9EA-9', correnteSpec: '530', kitRelacao: 'confirme na unidade (EXUP/não-EXUP)',
    extra: [
      { modelName: 'FZR 1000', yearFrom: 1987, yearTo: 1995, component: 'Válvula EXUP — verificação de movimentação livre do cabo/mecanismo', intervalKm: 6000, intervalMonths: 12, notes: 'Travamento por ferrugem/falta de uso causa perda de torque em médias rotações.', priority: 'HIGH', order: 10 },
    ],
  }),
  ...makeCarbInline4('XJ 600', 1990, 1999, {
    oilL: '~3,3 L', filtro: 'compatível com a família UJM da época', vela: 'NGK DPR8EA-9', correnteSpec: '530', kitRelacao: 'confirme na unidade',
  }),
  ...makeCarbInline4('XJR 1200', 1995, 1998, {
    oilL: '~3,5 L', filtro: 'compatível com a família UJM da época', vela: 'NGK DPR8EA-9', correnteSpec: '630 (passo maior)', kitRelacao: 'confirme na unidade',
    extra: [
      { modelName: 'XJR 1200', yearFrom: 1995, yearTo: 1998, component: 'Radiador de óleo — limpeza de aletas', intervalKm: 6500, intervalMonths: 12, notes: 'Motor refrigerado a ar — item crítico para controle de temperatura. Ar comprimido, nunca água sob pressão direta.', priority: 'CRITICAL', order: 10 },
    ],
  }),
  {
    modelName: 'RD 350 LC', yearFrom: 1980, yearTo: 1985, component: 'Nível do reservatório de óleo Autolube — verificação',
    intervalKm: null, intervalMonths: null, notes: 'Verificar a cada abastecimento. Sem óleo, motor 2 tempos funde em minutos.', priority: 'CRITICAL', order: 1,
  },
  { modelName: 'RD 350 LC', yearFrom: 1980, yearTo: 1985, component: 'Vela NGK B8ES/BR8ES ×2', intervalKm: 3500, intervalMonths: 12, notes: '2 tempos suja vela mais rápido que 4 tempos — inspecionar a cada revisão.', priority: 'HIGH', order: 2 },
  { modelName: 'RD 350 LC', yearFrom: 1980, yearTo: 1985, component: 'Sincronismo dos 2 carburadores Mikuni + teste da bomba Autolube', intervalKm: 7000, intervalMonths: 12, notes: 'Motor 2T é mais sensível a desbalanceamento que 4T.', priority: 'CRITICAL', order: 3 },
  { modelName: 'RD 350 LC', yearFrom: 1980, yearTo: 1985, component: 'Limpeza dos 2 carburadores Mikuni', intervalKm: 9000, intervalMonths: 18, notes: 'Etanol parado forma verniz nos jatos.', priority: 'HIGH', order: 4 },
  { modelName: 'RD 350 LC', yearFrom: 1980, yearTo: 1985, component: 'Inspeção de cilindro/pistão (desgaste 2 tempos)', intervalKm: 17500, intervalMonths: 24, notes: 'Avaliação por mecânico especializado em 2T — folga de anéis e parede do cilindro.', priority: 'HIGH', order: 5 },
  { modelName: 'RD 350 LC', yearFrom: 1980, yearTo: 1985, component: 'Corrente de transmissão 530 — lubrificação', intervalKm: 550, intervalMonths: null, notes: 'Kit relação: confirme na unidade específica.', priority: 'HIGH', order: 6 },
  { modelName: 'RD 350 LC', yearFrom: 1980, yearTo: 1985, component: 'Sistema de arrefecimento — fluido + inspeção de mangueiras/braçadeiras', intervalKm: null, intervalMonths: 18, notes: 'Item crítico: vazamento não percebido funde o motor rápido em 2 tempos. Bomba d\'água: verificar retentor.', priority: 'CRITICAL', order: 7 },
  { modelName: 'RD 350 LC', yearFrom: 1980, yearTo: 1985, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Trocar a cada 2 anos independente do aspecto visual.', priority: 'MEDIUM', order: 8 },
  { modelName: 'RD 350 LC', yearFrom: 1980, yearTo: 1985, component: 'Inspeção geral de borrachas, cabos e vedações', intervalKm: null, intervalMonths: 12, notes: 'Unidades hoje com 35-40+ anos — revisão independente da km rodada.', priority: 'HIGH', order: 9 },
]

// ─── Runner ───────────────────────────────────────────────────────────────────

async function main() {
  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })

  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Yamaha', vehicleTypeId: motoType.id } },
    update: {}, create: { name: 'Yamaha', vehicleTypeId: motoType.id },
  })

  const brand = await prisma.brand.findFirstOrThrow({
    where: { name: 'Yamaha', vehicleTypeId: motoType.id },
  })

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {}, create: { name: block.modelName, brandId: brand.id },
    })

    const allTips = [
      ...block.MACETES.map(t => ({ ...t, category: 'MACETES' as Cat })),
      ...block.PROBLEMAS.map(t => ({ ...t, category: 'PROBLEMAS' as Cat })),
      ...block.MANUTENCAO.map(t => ({ ...t, category: 'MANUTENCAO' as Cat })),
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
