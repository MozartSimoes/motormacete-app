// seed-royal-enfield-350.ts — Royal Enfield Classic 350, Hunter 350 e Meteor 350
// Todos com motor J-series 349cc SOHC monocilíndrico, refrigerado a ar+óleo, injeção eletrônica.
// Royal Enfield chegou recentemente ao Brasil (Meteor 2021, Classic 2022, Hunter 2023) e vem
// vendendo forte — rede de concessionárias/peças ainda em expansão no país.
// Execute: pnpm --filter @motormacete/database db:seed:royal-enfield-350
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

// ─── CLASSIC 350 ───────────────────────────────────────────────────────────────
// Motor: J-series 349cc SOHC 2 válvulas, monocilíndrico, refrigerado a ar+óleo
// Cilindrada: 70mm × 85,8mm | Taxa de compressão: 9,5:1 | Injeção eletrônica (EFI)
// Potência: ~20,2 cv @ 6.100–6.500 rpm | Torque: 27 Nm (2,7 kgf.m) @ 4.000 rpm
// Óleo: 15W-50 API SL JASO MA2 — 1,7L cárter (com filtro) | Filtro óleo genuíno 1570120/B
// Vela: NGK PLKR7A, gap 0,8mm | Corrente 520 × 104 elos, pinhão 15T / coroa 42T
// Pneu: 90/90-19 (F) · 110/90-18 (R) | Tanque: 13L | Câmbio 5 marchas
// Freio: disco 300mm (F) + disco 270mm ou tambor (R), conforme versão — ABS de série
// Produção/venda no Brasil: a partir de setembro/2022 (linha "Reborn")

const CLASSIC350_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 15W-50 JASO MA2 — 1,7L; motor com embreagem banhada a óleo',
    body: 'O motor J-series 349cc compartilha o óleo com a embreagem multidisco em banho de óleo — por isso o óleo TEM que ser JASO MA2 (nunca MB, nunca óleo "energy conserving" de carro, que faz a embreagem escorregar). Especificação oficial: 15W-50 API SL JASO MA2. Capacidade: 1,7L com troca de filtro. Marcas disponíveis no Brasil que atendem a especificação: Rock Oil Original 15W-50 (usado de fábrica em alguns mercados RE), Motul 7100 15W-50 100% síntese, Motul 5100 15W-50 semissintético, e Lubrax/Petronas com JASO MA2 explícito no rótulo. Confira sempre o selo JASO MA2 na embalagem antes de comprar — muito 15W-50 de prateleira é só API SL sem certificação de embreagem.',
  },
  {
    severity: 'OK',
    title: 'Intervalo de troca: 3.000–5.000 km — reduza para 3.000 km em uso urbano brasileiro',
    body: 'A Royal Enfield recomenda 5.000 km entre trocas em mercados de clima temperado, mas no calor e trânsito parado do Brasil (motor a ar refrigera pior em baixa velocidade), a prática recomendada por concessionárias e oficinas especializadas é reduzir para 3.000–4.000 km ou 6 meses, o que vier primeiro. O motor monocilíndrico grande (349cc em 1 cilindro) trabalha sob mais estresse térmico por explosão do que um multicilíndrico de mesma cilindrada total.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK PLKR7A gap 0,8mm — a mesma para os 3 modelos 350cc',
    body: 'A vela original é a NGK PLKR7A (vela de platina/laser, gap de fábrica 0,8mm — não regule para 0,7mm como em motores mais antigos, o mapa de injeção já é calibrado para 0,8mm). Custo: R$ 45–70 em lojas de peças para moto ou direto na concessionária RE. Kits de vela iridium NGK equivalentes também existem para quem quer maior vida útil (até 20.000 km) — procure "NGK spark kit Royal Enfield J platform 350" em importadoras. Inspecione a cada 5.000 km e troque entre 10.000–15.000 km.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 × 104 elos, pinhão 15T / coroa 42T — lubrifique a cada 500 km',
    body: 'O kit de relação da Classic 350 é corrente 520 (mais robusta que a 428 de motos menores) com 104 elos, pinhão de 15 dentes e coroa de 42 dentes. Lubrifique a cada 500 km ou após pegar chuva — spray de corrente branco (tipo PTFE) não escorre e não suja a roda. Marcas disponíveis no Brasil: Motul C1/C2 Chain Lube, Motorex. Kits de relação completos genuínos RE custam entre R$ 450–700; existem kits compatíveis Rolon (com bucha de latão, mais durável) vendidos por importadoras de peças RE que custam menos e têm boa reputação entre proprietários.',
  },
  {
    severity: 'WARN',
    title: 'Folga de válvulas: item crítico do motor monocilíndrico simples — regule a cada 10.000 km',
    body: 'O J-series é SOHC de 2 válvulas por cilindro com regulagem por parafuso e contraporca (não usa pastilhas/shim). Como é monocilíndrico, qualquer folga errada afeta 100% da potência do motor (diferente de um multi, onde um cilindro desregulado é "mascarado" pelos outros). Faça a checagem com motor frio, a cada 10.000 km. Faixa típica usada por oficinas especializadas: admissão ~0,10mm / escape ~0,20–0,25mm — SEMPRE confirme no manual do proprietário do ano/versão específica, pois a RE já ajustou essa especificação entre gerações do motor.',
  },
  {
    severity: 'WARN',
    title: 'Rede de concessionárias RE ainda pequena no Brasil — planeje peças com antecedência',
    body: 'A Royal Enfield está em expansão acelerada no Brasil, mas ainda tem muito menos concessionárias que Honda/Yamaha. Em cidades sem concessionária RE, peças de consumo simples (filtro de óleo 1570120/B, vela PLKR7A, pastilha de freio, corrente) podem ser encontradas em importadoras especializadas em RE (fazem entrega por todo o Brasil) e em grupos de proprietários no Facebook/WhatsApp — "Royal Enfield Brasil" e grupos por estado são ativos e trocam informação sobre onde comprar. Para peças de motor (pistão, junta de cabeçote, comando de válvulas), o caminho mais seguro ainda é concessionária oficial ou importação direta — evite genérico não identificado para peças internas do motor.',
  },
  {
    severity: 'OK',
    title: 'Sistema elétrico e bateria: mantenha a tensão sempre acima de 12,4V em repouso',
    body: 'O sistema elétrico 12V da Classic 350 é sensível a bateria fraca — injeção eletrônica, painel, e sistema de partida dependem de tensão estável. Bateria original é selada (VRLA) — não precisa completar água, mas também não tolera descarga profunda repetida (deixar luz ligada, pisca sem uso). Se a moto ficar parada por mais de 15 dias, use um carregador/mantenedor de bateria (tipo "battery tender") ou desconecte o polo negativo. Bateria fraca é causa comum de "luz de injeção piscando" e dificuldade de partida a frio.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: troque a cada 10.000–15.000 km — mais cedo em cidades com poeira/obras',
    body: 'O filtro de ar de papel do sistema EFI não deve ser lavado — é item de troca. Em condições normais, 10.000–15.000 km é o intervalo seguro; em cidades com muita poeira/obras, considere antecipar para 8.000 km. Filtro sujo reduz a resposta do TBI (corpo de borboleta único) e pode acender a luz de injeção. Filtros compatíveis de marcas como Tecfil e K&N (versão esportiva lavável, reutilizável) são encontrados em lojas de peças para moto — confirme a medida com o código do modelo/ano.',
  },
  {
    severity: 'WARN',
    title: 'Pneus: prefira marcas com boa reputação em moto pesada de baixa rotação',
    body: 'A Classic 350 pesa ~195kg em ordem de marcha e roda em baixa rotação — isso exige pneus com boa rigidez de carcaça. Pneus originais de fábrica variam por mercado (CEAT, MRF ou Pirelli conforme o lote). No Brasil, opções de reposição bem avaliadas por proprietários: Pirelli MT66/MT65 (perfil clássico), Michelin Anakee ou Metzeler ME 888 para quem roda mais em estrada. CEAT e MRF (marcas indianas, mesmas usadas de fábrica) também são vendidas por importadoras de peças RE e têm bom custo-benefício.',
  },
]

const CLASSIC350_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Vazamento de óleo do motor — problema documentado e recorrente no Brasil',
    body: 'Há múltiplas reclamações registradas por proprietários brasileiros (inclusive no Reclame Aqui) sobre vazamento de óleo persistente na Classic 350, em alguns casos com a concessionária minimizando o problema como "camada protetora do motor derretendo". Seja cético com essa explicação: óleo pingando de forma constante NÃO é normal. Pontos comuns de vazamento: junta da tampa do cárter, retentor do eixo de comando, e conexões do filtro de óleo. Se notar mancha de óleo crescente sob o motor, leve para diagnóstico o quanto antes — rodar com nível de óleo baixo em motor monocilíndrico de embreagem compartilhada pode causar dano severo à embreagem e ao motor.',
  },
  {
    severity: 'WARN',
    title: 'Vibração perceptível em altas rotações — característica do monocilíndrico grande',
    body: 'Por ser um monocilíndrico de 349cc (deslocamento grande para um único cilindro), a Classic 350 vibra mais que um bicilíndrico ou motor menor, especialmente acima de 5.500 rpm. Isso é esperado pelo projeto do motor, mas vibração que piora repentinamente pode indicar parafusos de fixação do motor no chassi frouxos, ou desgaste dos coxins de borracha do guidão/pedaleiras. Vale inspecionar o aperto do motor a cada revisão — parafusos soltando por vibração é queixa comum entre proprietários.',
  },
  {
    severity: 'WARN',
    title: 'Ferrugem em peças cromadas e parafusos — acabamento inferior ao de rivais japonesas',
    body: 'É um ponto honesto e bem documentado: o acabamento e a qualidade de proteção anticorrosiva da Royal Enfield são inferiores aos de Honda/Yamaha equivalentes. Em regiões litorâneas ou de alta umidade, peças cromadas (aro de farol, escapamento, parafusos externos) podem começar a enferrujar em 8–12 meses se a moto ficar exposta e não for lavada/cuidada regularmente. Prevenção: lavagem regular, secagem completa após chuva, aplicação de cera protetora ou spray anticorrosivo (tipo WD-40 Especialista Proteção) em peças cromadas e parafusos expostos, e revisão periódica com reaperto/troca de parafusos enferrujados.',
  },
  {
    severity: 'WARN',
    title: 'Falhas elétricas intermitentes — conexões e fusíveis são o primeiro ponto a checar',
    body: 'Proprietários relatam falhas elétricas intermitentes (luzes de painel piscando, sinalizadores falhando, dificuldade ocasional de partida) associadas a conexões soltas ou oxidadas e fusíveis de baixa qualidade. Antes de suspeitar da CDI/ECU, sempre inspecione: fusíveis (localizados sob o banco), conectores do chicote próximos ao motor (expostos a calor e vibração), e o terminal negativo da bateria. Aplicar graxa dielétrica nos conectores durante revisões preventivas reduz bastante a incidência desses problemas.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem com folga alterando ponto de acionamento — ajuste é simples mas recorrente',
    body: 'O cabo de embreagem da Classic 350 estica com o uso e altera o ponto de acionamento — sintoma de folga excessiva no manete ou embreagem "arrastando" (dificuldade de engatar neutro parado). Ajuste é simples: usa o regulador no próprio manete e/ou no braço da embreagem no motor. Verifique a cada 3.000 km. Se o ajuste no cabo não resolver mais e a embreagem continuar patinando em acelerações fortes, o disco de embreagem pode estar gasto — nesse caso, use disco/kit de embreagem compatível com motor J-series, disponível em importadoras de peças RE.',
  },
  {
    severity: 'WARN',
    title: 'Qualidade de acabamento inferior em detalhes de montagem — inspecione a moto nova com atenção',
    body: 'É um padrão relatado por proprietários e até por reviews da imprensa especializada: a Royal Enfield tem qualidade de montagem e controle de qualidade de fábrica menos rigorosos que fabricantes japoneses. Itens relatados: parafusos com torque irregular (alguns frouxos de fábrica), pequenos ruídos de plástico/metal em vibração, e ajustes de carenagem/painéis levemente desalinhados. Recomendação: na primeira revisão (geralmente aos 500–1.000 km), peça para o mecânico revisar o aperto geral de parafusos visíveis (motor, carenagens, retrovisores, guidão) — isso previne folgas que aparecem meses depois.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedor traseiro com vazamento prematuro em alguns casos',
    body: 'Há relatos de vazamento de óleo nos amortecedores traseiros (duplos, com regulagem de pré-carga) antes do esperado para a quilometragem, especialmente em motos usadas com carga extra (bagageiro/baú) ou em pavimentação ruim constante. Sintoma: mancha de óleo na haste do amortecedor, perda de amortecimento (moto "bate" mais nos buracos). Se identificar vazamento, a troca do par de amortecedores (não é possível recuperar o retentor interno facilmente) é o caminho — amortecedores compatíveis de marcas como Progressive ou Hagon são alternativas de mercado, além dos genuínos RE.',
  },
]

const CLASSIC350_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo Classic 350 — do zero aos 40.000 km',
    body: '500–1.000 km (revisão de amaciamento) — Troca de óleo (15W-50, 1,7L) + reaperto geral de parafusos (motor, carenagens, guidão). Verificar folga de válvulas. | 3.000–5.000 km — Troca de óleo + filtro (1570120/B). Lubrificar corrente. Verificar gap da vela (0,8mm). | 5.000 km — Inspeção geral: pastilhas de freio, nível de fluido, folga de embreagem, pressão dos pneus. | 10.000 km — Troca da vela NGK PLKR7A. Regular folga de válvulas. Trocar filtro de ar. Verificar tensão da bateria (>12,4V repouso). | 15.000 km — Kit de relação (corrente 520×104 + pinhão 15T + coroa 42T) se desgastado. Fluido de freio DOT 4 (bienal, pode coincidir aqui). | 20.000 km — Revisão de embreagem (disco/molas se houver patinação). Inspecionar vazamentos de óleo do motor e amortecedores. Verificar ferrugem em peças cromadas e parafusos — tratar preventivamente. | 30.000–40.000 km — Revisão geral de motor (compressão, ruídos), rolamentos de roda e direção, buchas de suspensão.',
  },
]

// ─── HUNTER 350 ─────────────────────────────────────────────────────────────
// Motor: J-series 349cc SOHC 2 válvulas, monocilíndrico, refrigerado a ar+óleo
// Cilindrada: 70mm × 85,8mm | Taxa de compressão: 9,5:1 | Injeção eletrônica (EFI)
// Potência: ~20,2 cv @ 6.100 rpm | Torque: 27 Nm (2,7 kgf.m) @ 4.000 rpm
// Óleo: 15W-50 API SL JASO MA2 — 1,7L cárter (com filtro) | Filtro óleo genuíno 1570120/B
// Vela: NGK PLKR7A, gap 0,8mm | Corrente 520 × 104 elos, pinhão 15T / coroa 42T
// Pneu: 110/70-17 (F) · 140/70-17 (R) | Tanque: 13L | Câmbio 5 marchas | Peso: ~177 kg
// Freio: disco 300mm (F) + disco 270mm ou tambor (R, versão Retro) — ABS (duplo ou single-channel)
// Roadster urbano — chassi e rodas menores/mais leves que a Classic, foco em agilidade
// Produção/venda no Brasil: a partir de setembro/2023

const HUNTER350_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 15W-50 JASO MA2 — 1,7L; mesmo motor J-series da Classic e Meteor',
    body: 'A Hunter 350 usa o mesmo bloco J-series 349cc das outras duas — óleo obrigatoriamente 15W-50 API SL JASO MA2 por causa da embreagem em banho de óleo compartilhado. Capacidade: 1,7L com filtro novo. Marcas disponíveis no Brasil com certificação JASO MA2: Rock Oil Original 15W-50, Motul 7100/5100 15W-50, e linhas específicas Lubrax com selo JASO MA2. Nunca use óleo "energy saving" de carro — a viscosidade e os aditivos anti-fricção fazem a embreagem escorregar sob carga.',
  },
  {
    severity: 'OK',
    title: 'Moto mais leve e ágil da linha 350 — cuidado ao subestimar o motor em ultrapassagens',
    body: 'Com ~177kg (mais leve que a Classic e a Meteor), a Hunter 350 acelera de forma mais viva com o mesmo motor de 20,2 cv/27 Nm — bom ponto para uso urbano. Mas continua sendo um monocilíndrico: em ultrapassagens de rodovia, planeje a manobra com folga, pois o motor entrega a maior parte do torque entre 3.000–4.500 rpm e "acaba o fôlego" acima de 6.500 rpm. Reduza uma marcha antes de ultrapassar em vez de acelerar direto na marcha alta.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK PLKR7A gap 0,8mm — troque entre 10.000–15.000 km',
    body: 'Mesma vela dos outros modelos 350cc da marca: NGK PLKR7A, gap de fábrica 0,8mm. Custo R$ 45–70. Como a Hunter tem acesso mais fácil à vela (motor mais exposto, sem tanta carenagem), é uma das trocas mais simples de fazer em casa com uma chave de vela adequada — só cuidado para não forçar o torque (aperte até sentir resistência + 1/4 de volta, sem excesso).',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 × 104 elos — mesma relação da Classic; ideal para uso urbano frequente',
    body: 'A Hunter compartilha o kit de relação 520 (104 elos, pinhão 15T, coroa 42T) com a Classic e a Meteor. Como é usada mais em ambiente urbano (paradas e arrancadas frequentes em semáforo), a corrente sofre mais desgaste por aceleração/frenagem repetida — lubrifique a cada 500 km e verifique a folga (referência: 25–35mm no trecho inferior) semanalmente se rodar bastante na cidade. Sprays de corrente PTFE (Motul C1/C2) não jogam graxa nas rodas, importante para quem anda de calça/terno na cidade.',
  },
  {
    severity: 'WARN',
    title: 'Folga de válvulas: regule a cada 10.000 km — mesmo procedimento do motor J-series',
    body: 'A Hunter 350 usa o mesmo cabeçote SOHC 2 válvulas ajustado por parafuso/contraporca das outras 350. Regule a cada 10.000 km com motor frio. Motor desregulado nesta plataforma perde torque perceptivelmente (é monocilíndrico — não há outro cilindro "cobrindo" a perda). Consulte o manual do proprietário específico do ano/versão para os valores exatos de folga admissão/escape, pois pequenas revisões técnicas ocorreram entre lotes de produção.',
  },
  {
    severity: 'WARN',
    title: 'Peças ainda concentradas em poucas concessionárias — Hunter compartilha peças com Classic/Meteor',
    body: 'Por usar o mesmo motor J-series e o mesmo kit de relação/filtro de óleo da Classic 350 e da Meteor 350, a Hunter se beneficia de uma base de peças compatíveis relativamente maior mesmo com a rede de concessionárias RE ainda pequena no Brasil. Itens de consumo (filtro de óleo 1570120/B, vela PLKR7A, kit corrente) são intercambiáveis entre os três modelos — vale comprar peça genérica descrita como "Meteor/Classic Reborn/Hunter 350" em importadoras especializadas, que geralmente têm estoque melhor que a concessionária local para esses itens.',
  },
  {
    severity: 'OK',
    title: 'Pneus 110/70-17 (dianteiro) e 140/70-17 (traseiro) — perfil mais esportivo que a Classic',
    body: 'A versão "Metro" da Hunter usa pneus tubeless 110/70-17 / 140/70-17 (perfil mais baixo, aro 17 nas duas rodas — diferente da Classic, que tem aro 19 na dianteira). Isso dá resposta de guidão mais ágil, ideal para trânsito. A versão "Retro" pode vir com pneus com câmara 110/80-17 / 120/80-17. Marcas bem avaliadas: CEAT Zoom (original de fábrica em alguns lotes), Pirelli Angel City, Michelin Pilot Street. Confirme sempre se seu pneu é tubeless ou com câmara antes de calibrar/consertar.',
  },
  {
    severity: 'OK',
    title: 'Bateria e sistema elétrico: cuidado redobrado por ser roadster com painel digital',
    body: 'A Hunter 350 tem um conjunto de instrumentos mais moderno (semi-digital) que consome mais energia da bateria em repouso que instrumentação totalmente analógica. Mantenha a bateria carregada — tensão de repouso deve ficar acima de 12,4V. Evite deixar pisca-alerta ou luz de posição ligados com o motor desligado por longos períodos. Se a moto ficar parada mais de duas semanas, desligue o polo negativo da bateria ou use um mantenedor de carga.',
  },
]

const HUNTER350_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vazamento de óleo do motor — mesmo ponto fraco do bloco J-series compartilhado',
    body: 'Como a Hunter 350 usa o mesmo motor da Classic e da Meteor, ela herda a mesma vulnerabilidade documentada por proprietários no Brasil: vazamento de óleo pela junta do cárter, retentor do comando ou conexão do filtro. Se notar manchas de óleo crescentes sob o motor, não normalize o problema — procure diagnóstico o quanto antes, principalmente porque o óleo baixo afeta diretamente a lubrificação da embreagem compartilhada.',
  },
  {
    severity: 'WARN',
    title: 'Ferrugem em parafusos e peças metálicas expostas — mais crítico por ser uso urbano intenso',
    body: 'Por ser usada com mais frequência no dia a dia (trânsito, chuva, exposição constante), a Hunter 350 pode mostrar sinais de ferrugem em parafusos expostos e peças cromadas/metálicas mais cedo que uma moto de lazer de fim de semana. Lavagem regular e secagem completa, além de spray anticorrosivo em parafusos visíveis, ajuda bastante. Mantenha atenção redobrada em quem mora perto do litoral — a umidade salina acelera o processo.',
  },
  {
    severity: 'WARN',
    title: 'Falhas elétricas intermitentes — luzes de painel, sinalizadores e conectores',
    body: 'Assim como nos outros modelos da linha 350, há relatos de falhas elétricas intermitentes ligadas a conexões de baixa qualidade que oxidam com o tempo. Primeira suspeita: fusíveis (sob o banco) e conectores próximos ao motor. Aplicar graxa dielétrica nos principais conectores durante a revisão preventiva reduz a incidência desse tipo de problema.',
  },
  {
    severity: 'WARN',
    title: 'Vibração no guidão em altas rotações — inerente ao monocilíndrico grande',
    body: 'Por ser monocilíndrica de 349cc, a Hunter vibra de forma perceptível acima de 5.500–6.000 rpm — mais que uma bicilíndrica equivalente. Isso não é defeito, é característica do motor. Fique atento se a vibração aumentar de forma anormal ou repentina: pode indicar parafusos de fixação do motor frouxos ou desgaste nos coxins de guidão/pedaleiras.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem: folga do cabo se altera com o uso — ajuste recorrente necessário',
    body: 'O cabo de embreagem estica naturalmente com o uso, alterando o ponto de acionamento. Verifique a folga a cada poucas semanas de uso intenso na cidade (uso urbano gera mais ciclos de embreagem que estrada). Se o ajuste no regulador do manete não for mais suficiente e a embreagem começar a patinar em acelerações, o kit de disco de embreagem compatível com o J-series precisa ser avaliado.',
  },
  {
    severity: 'WARN',
    title: 'Acabamento e controle de qualidade inferiores a rivais japonesas na mesma faixa de preço',
    body: 'Reviews e proprietários apontam de forma consistente que a qualidade de acabamento e o rigor de montagem da Royal Enfield ficam abaixo de concorrentes japoneses (Honda CB, Yamaha Fazer) na mesma faixa de preço — parafusos com torque irregular, pequenos ruídos de vibração em plásticos, ajustes de carenagem levemente desalinhados. Vale pedir uma inspeção detalhada na primeira revisão para identificar e corrigir esses pontos cedo.',
  },
]

const HUNTER350_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo Hunter 350 — do zero aos 40.000 km',
    body: '500–1.000 km (amaciamento) — Troca de óleo (15W-50, 1,7L) + reaperto de parafusos visíveis. Checar folga de válvulas. | 3.000–5.000 km — Troca de óleo + filtro (1570120/B). Lubrificar corrente. Checar gap da vela (0,8mm). | 5.000 km — Inspeção geral: pastilhas de freio, fluido de freio, folga de embreagem, calibragem dos pneus. | 10.000 km — Troca da vela NGK PLKR7A. Regular folga de válvulas. Trocar filtro de ar. Verificar tensão da bateria. | 15.000 km — Kit de relação 520×104 (pinhão 15T/coroa 42T) se necessário. Fluido de freio DOT 4. | 20.000 km — Revisão de embreagem. Inspecionar vazamentos de óleo e ferrugem em parafusos/cromados. | 30.000–40.000 km — Revisão geral do motor, rolamentos de roda/direção, buchas de suspensão.',
  },
]

// ─── METEOR 350 ─────────────────────────────────────────────────────────────
// Motor: J-series 349cc SOHC 2 válvulas, monocilíndrico, refrigerado a ar+óleo
// Cilindrada: 70mm × 85,8mm | Taxa de compressão: 9,5:1 | Injeção eletrônica — mapa com
// entrega de torque priorizada em rotações mais baixas (perfil cruiser)
// Potência: ~20,2 cv @ 6.100 rpm | Torque: 27 Nm (2,7 kgf.m) @ 4.000 rpm
// Óleo: 15W-50 API SL JASO MA2 — 1,7L cárter (com filtro) | Filtro óleo genuíno 1570120/B
// Vela: NGK PLKR7A, gap 0,8mm | Corrente 520 × 104 elos, pinhão 15T / coroa 42T
// Pneu: 100/90-19 (F) · 140/70-17 (R) | Tanque: 15L | Câmbio 5 marchas | Peso: ~191 kg
// Painel: TFT com sistema "Tripper" — navegação Bluetooth integrada ao painel (item de série)
// Freio: disco 300mm (F) + disco 270mm (R) — ABS de série (duplo canal)
// Produção/venda no Brasil: a partir de 2021 — moto cruiser de entrada mais vendida da categoria

const METEOR350_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 15W-50 JASO MA2 — 1,7L; mesma exigência de embreagem em banho de óleo',
    body: 'A Meteor 350 usa o mesmo bloco J-series 349cc da Classic e da Hunter — óleo obrigatoriamente 15W-50 API SL JASO MA2. Capacidade: 1,7L com filtro. Marcas certificadas disponíveis no Brasil: Rock Oil Original 15W-50, Motul 7100/5100 15W-50, linhas Lubrax com selo JASO MA2 explícito. A Meteor tende a rodar mais em viagem/estrada (perfil cruiser) — em uso rodoviário constante, o intervalo de 5.000 km costuma ser seguro; em cidade parada, prefira 3.000–4.000 km.',
  },
  {
    severity: 'OK',
    title: 'Sistema Tripper: pareie o app Royal Enfield e mantenha o Bluetooth atualizado',
    body: 'A Meteor 350 foi a primeira moto da Royal Enfield a receber o "Tripper" — um mini-painel de navegação integrado ao velocímetro, que recebe direções por Bluetooth do app Royal Enfield (que usa Google Maps por trás). Para funcionar bem: mantenha o aplicativo atualizado na loja de apps, o Bluetooth do celular sempre visível/pareado antes de sair, e o celular com bateria suficiente (o Tripper depende do celular processar a rota). Problemas de conexão instável geralmente se resolvem removendo o pareamento antigo e refazendo do zero.',
  },
  {
    severity: 'OK',
    title: 'Mapa de injeção com torque em rotações mais baixas — ideal para cruzeiro relaxado',
    body: 'Apesar de usar o mesmo motor da Classic e da Hunter (349cc, 20,2 cv, 27 Nm), a Meteor tem um mapa de injeção ajustado para entregar mais torque em rotações mais baixas — reforça o caráter cruiser, com marcha alta confortável em velocidade de cruzeiro (~90–100 km/h) sem precisar reduzir. Isso significa que trocar de marcha "cedo demais" é natural e recomendado nesta moto — não force giros altos esperando mais potência, o motor já entrega o que tem no meio da faixa de giro.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK PLKR7A gap 0,8mm — mesma peça dos outros dois modelos 350',
    body: 'Vela original: NGK PLKR7A, gap de fábrica 0,8mm, custo R$ 45–70. Por compartilhar peça com Classic e Hunter, encontrar a vela é relativamente fácil mesmo fora de concessionária — qualquer loja de peças para moto que atenda linha Royal Enfield 350 tem em estoque ou consegue rapidamente.',
  },
  {
    severity: 'WARN',
    title: 'Folga de válvulas: regule a cada 10.000 km — mesmo procedimento do J-series',
    body: 'Mesmo cabeçote SOHC 2 válvulas por parafuso/contraporca dos outros modelos 350. Regule a cada 10.000 km, motor frio. Como a Meteor é usada com frequência em viagens mais longas, vale antecipar essa checagem antes de uma viagem grande — motor desregulado nesta plataforma perde torque perceptível, o que é mais sentido em rodovia com carga/garupa.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 × 104 elos — mais desgaste em viagens longas com carga; lubrifique após cada chuva',
    body: 'Kit de relação: corrente 520 (104 elos), pinhão 15T, coroa 42T — mesma especificação da Classic/Hunter. Como a Meteor é usada com garupa e bagagem com mais frequência (perfil cruiser/turismo leve), a corrente sofre mais tensão — lubrifique a cada 500 km e sempre após pegar chuva ou estrada de terra. Kits compatíveis Rolon com bucha de latão (maior durabilidade) são bem avaliados por proprietários e vendidos por importadoras de peças RE.',
  },
  {
    severity: 'OK',
    title: 'Banco baixo e posição cruiser: ajuste a pressão dos pneus para carga extra em viagem',
    body: 'A Meteor 350 tem banco baixo (assento a ~765mm do chão) e é comum usá-la com garupa e bagageiro em viagens. Sempre ajuste a pressão dos pneus para o modo "com carga/garupa" (ver tabela de calibragem) antes de pegar estrada com peso extra — pneu subcalibrado com carga aumenta o desgaste e o risco de superaquecimento em viagens longas.',
  },
  {
    severity: 'WARN',
    title: 'Peças e acessórios: aproveitar compatibilidade com Classic/Hunter para achar estoque',
    body: 'A Meteor 350 compartilha motor, filtro de óleo (1570120/B), vela (PLKR7A) e kit de relação (520×104, 15T/42T) com a Classic e a Hunter — isso é uma vantagem prática dado que a rede de concessionárias e distribuidores RE ainda está em expansão no Brasil. Ao procurar peça em loja não-RE, pesquise pelo termo "compatível Meteor/Classic Reborn/Hunter 350" — os catálogos de importadoras de peças já agrupam essas três motos como um único grupo de compatibilidade.',
  },
]

const METEOR350_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vazamento de óleo do motor — mesma vulnerabilidade do bloco J-series',
    body: 'A Meteor compartilha o motor com a Classic e a Hunter, e herda o mesmo histórico documentado de vazamento de óleo por junta do cárter, retentor de comando ou conexão do filtro — problema relatado por proprietários brasileiros inclusive em plataformas de reclamação. Monitore o nível de óleo e o chão sob a moto regularmente; não normalize manchas de óleo crescentes.',
  },
  {
    severity: 'WARN',
    title: 'Ferrugem em cromados e parafusos — atenção redobrada por ser moto de viagem exposta ao tempo',
    body: 'Por ser usada com frequência em viagens (estrada, chuva, sol, poeira), a Meteor 350 pode acumular sinais de ferrugem em peças cromadas (guidão, escapamento, aros) e parafusos expostos mais rápido que uma moto usada só na cidade em garagem coberta. Lavagem e secagem regulares, cera protetora e spray anticorrosivo nos parafusos externos ajudam bastante — especialmente para quem mora perto do litoral ou roda muito em estrada de terra/poeira.',
  },
  {
    severity: 'WARN',
    title: 'Painel Tripper: problemas de conexão Bluetooth intermitente relatados por usuários',
    body: 'Alguns proprietários relatam perda de conexão Bluetooth entre o celular e o painel Tripper durante o uso, especialmente com atualizações de sistema operacional do celular. Não é um defeito de segurança (a moto funciona normalmente sem o Tripper conectado), mas é um incômodo recorrente. Solução na maioria dos casos: remover o pareamento antigo, fechar e reabrir o app Royal Enfield, e parear novamente com o motor ligado.',
  },
  {
    severity: 'WARN',
    title: 'Vibração em rotações altas — inerente ao monocilíndrico 349cc',
    body: 'Mesma característica dos outros modelos: por ser monocilíndrica grande, a Meteor vibra de forma perceptível acima de 5.500 rpm. Como o perfil de uso é mais relaxado (cruiser), isso tende a incomodar menos no dia a dia — mas fique atento a aumento repentino de vibração, que pode indicar parafusos de fixação do motor frouxos.',
  },
  {
    severity: 'WARN',
    title: 'Falhas elétricas intermitentes — conectores e fusíveis, mesmo padrão da linha 350',
    body: 'Assim como Classic e Hunter, a Meteor apresenta relatos de falhas elétricas ligadas a conectores de baixa qualidade que oxidam com o tempo, especialmente em uso com exposição a chuva em viagem. Primeira inspeção: fusíveis sob o banco e conectores próximos ao motor. Aplicar graxa dielétrica nesses pontos durante a revisão preventiva evita boa parte dos problemas.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem: folga do cabo se altera com o uso — mais perceptível em viagens longas com carga',
    body: 'O cabo de embreagem estica com o uso, especialmente sob carga extra (garupa + bagagem) em viagens. Verifique a folga antes de qualquer viagem longa. Se o ajuste no regulador não bastar mais e a embreagem patinar em acelerações com carga, avalie o disco de embreagem — kits compatíveis com o motor J-series estão disponíveis em importadoras de peças RE.',
  },
]

const METEOR350_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo Meteor 350 — do zero aos 40.000 km',
    body: '500–1.000 km (amaciamento) — Troca de óleo (15W-50, 1,7L) + reaperto de parafusos visíveis. Checar folga de válvulas. | 3.000–5.000 km — Troca de óleo + filtro (1570120/B). Lubrificar corrente. Checar gap da vela (0,8mm). | 5.000 km — Inspeção geral: pastilhas de freio, fluido de freio, folga de embreagem, calibragem dos pneus (ajustar para carga se for viajar). | 10.000 km — Troca da vela NGK PLKR7A. Regular folga de válvulas. Trocar filtro de ar. Verificar tensão da bateria. | 15.000 km — Kit de relação 520×104 (pinhão 15T/coroa 42T) se necessário. Fluido de freio DOT 4. | 20.000 km — Revisão de embreagem. Inspecionar vazamentos de óleo e ferrugem em cromados/parafusos — atenção redobrada se usada em viagens/litoral. | 30.000–40.000 km — Revisão geral do motor, rolamentos de roda/direção, buchas de suspensão, checagem do sistema Tripper/conectores elétricos.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Classic 350',
    yearFrom: 2022,
    yearTo: null,
    MACETES: CLASSIC350_MACETES,
    PROBLEMAS: CLASSIC350_PROBLEMAS,
    MANUTENCAO: CLASSIC350_MANUTENCAO,
  },
  {
    modelName: 'Hunter 350',
    yearFrom: 2023,
    yearTo: null,
    MACETES: HUNTER350_MACETES,
    PROBLEMAS: HUNTER350_PROBLEMAS,
    MANUTENCAO: HUNTER350_MANUTENCAO,
  },
  {
    modelName: 'Meteor 350',
    yearFrom: 2021,
    yearTo: null,
    MACETES: METEOR350_MACETES,
    PROBLEMAS: METEOR350_PROBLEMAS,
    MANUTENCAO: METEOR350_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Classic 350',
    yearFrom: 2022, yearTo: null,
    tireSize: '90/90-19 (F) · 110/90-18 (R)',
    frontPsi: 20, rearPsi: 30,
    frontPsiLoad: 22, rearPsiLoad: 32,
    notes: 'Solo: F 20 / R 30 PSI. Com garupa: F 22 / R 32 PSI. Valores conforme manual do proprietário oficial Royal Enfield. Pneus originais variam por lote (CEAT/MRF); reposições bem avaliadas: Pirelli MT66/MT65, Michelin Anakee, Metzeler ME 888.',
  },
  {
    modelName: 'Hunter 350',
    yearFrom: 2023, yearTo: null,
    tireSize: '110/70-17 (F) · 140/70-17 (R)',
    frontPsi: 29, rearPsi: 32,
    frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Solo: F 29 / R 32 PSI. Com garupa: F 29 / R 36 PSI. Versão Metro (tubeless, aro 17 nas duas rodas). Versão Retro pode usar pneus com câmara 110/80-17 (F) / 120/80-17 (R) — confirme o tipo antes de calibrar/consertar.',
  },
  {
    modelName: 'Meteor 350',
    yearFrom: 2021, yearTo: null,
    tireSize: '100/90-19 (F) · 140/70-17 (R)',
    frontPsi: 28, rearPsi: 33,
    frontPsiLoad: 28, rearPsiLoad: 36,
    notes: 'Solo: F 28 / R 33 PSI. Com garupa: F 28 / R 36 PSI. Perfil cruiser com roda dianteira maior (aro 19). Ajuste sempre para "com carga" antes de viagens com bagagem.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // CLASSIC 350
  { modelName: 'Classic 350', yearFrom: 2022, yearTo: null, component: 'Óleo 15W-50 JASO MA2 (1,7L)', intervalKm: 4000, intervalMonths: 6, notes: 'Motor J-series com embreagem em banho de óleo — JASO MA2 obrigatório. Reduzir para 3.000 km em uso urbano intenso.', priority: 'HIGH', order: 1 },
  { modelName: 'Classic 350', yearFrom: 2022, yearTo: null, component: 'Filtro de óleo (genuíno 1570120/B)', intervalKm: 8000, intervalMonths: 12, notes: 'Trocar a cada 2 trocas de óleo ou anualmente. Compatível também com Hunter e Meteor 350.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Classic 350', yearFrom: 2022, yearTo: null, component: 'Vela NGK PLKR7A (gap 0,8mm)', intervalKm: 10000, intervalMonths: null, notes: 'Verificar gap a cada 5.000 km. Não regule para 0,7mm — mapa de injeção calibrado para 0,8mm.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Classic 350', yearFrom: 2022, yearTo: null, component: 'Lubrificação da corrente 520 (104 elos)', intervalKm: 500, intervalMonths: null, notes: 'Spray PTFE (Motul C1/C2). Folga referência: 25–35mm no trecho inferior.', priority: 'HIGH', order: 4 },
  { modelName: 'Classic 350', yearFrom: 2022, yearTo: null, component: 'Folga de válvulas (SOHC 2 válvulas)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor frio obrigatório. Confirmar valores exatos no manual do ano/versão específica.', priority: 'HIGH', order: 5 },
  { modelName: 'Classic 350', yearFrom: 2022, yearTo: null, component: 'Filtro de ar (papel — troca, não lavar)', intervalKm: 12000, intervalMonths: 12, notes: 'Antecipar em cidades com muita poeira/obras.', priority: 'MEDIUM', order: 6 },
  { modelName: 'Classic 350', yearFrom: 2022, yearTo: null, component: 'Kit de relação (corrente 520 + pinhão 15T + coroa 42T)', intervalKm: 18000, intervalMonths: null, notes: 'Trocar kit completo, nunca só a corrente com coroa desgastada.', priority: 'HIGH', order: 7 },
  { modelName: 'Classic 350', yearFrom: 2022, yearTo: null, component: 'Embreagem — verificação de folga do cabo', intervalKm: 3000, intervalMonths: null, notes: 'Ajuste no regulador do manete. Se patinar sob carga, avaliar disco/kit compatível J-series.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Classic 350', yearFrom: 2022, yearTo: null, component: 'Pastilhas de freio dianteiro/traseiro', intervalKm: 10000, intervalMonths: 12, notes: 'Verificar espessura a cada revisão. Disco 300mm (F) + disco/tambor (R) conforme versão.', priority: 'HIGH', order: 9 },
  { modelName: 'Classic 350', yearFrom: 2022, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'Bienal obrigatório — o fluido absorve umidade e perde ponto de ebulição.', priority: 'HIGH', order: 10 },
  { modelName: 'Classic 350', yearFrom: 2022, yearTo: null, component: 'Bateria — verificação de tensão (>12,4V repouso)', intervalKm: null, intervalMonths: 6, notes: 'Sistema elétrico sensível a bateria fraca. Usar mantenedor se moto ficar parada +15 dias.', priority: 'MEDIUM', order: 11 },

  // HUNTER 350
  { modelName: 'Hunter 350', yearFrom: 2023, yearTo: null, component: 'Óleo 15W-50 JASO MA2 (1,7L)', intervalKm: 4000, intervalMonths: 6, notes: 'Mesmo motor J-series da Classic/Meteor. Uso urbano intenso: reduzir para 3.000 km.', priority: 'HIGH', order: 1 },
  { modelName: 'Hunter 350', yearFrom: 2023, yearTo: null, component: 'Filtro de óleo (genuíno 1570120/B)', intervalKm: 8000, intervalMonths: 12, notes: 'Compatível também com Classic e Meteor 350.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Hunter 350', yearFrom: 2023, yearTo: null, component: 'Vela NGK PLKR7A (gap 0,8mm)', intervalKm: 10000, intervalMonths: null, notes: 'Acesso mais fácil que na Classic — motor menos encarenado.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Hunter 350', yearFrom: 2023, yearTo: null, component: 'Lubrificação da corrente 520 (104 elos)', intervalKm: 500, intervalMonths: null, notes: 'Uso urbano com muitas arrancadas exige atenção redobrada à lubrificação.', priority: 'HIGH', order: 4 },
  { modelName: 'Hunter 350', yearFrom: 2023, yearTo: null, component: 'Folga de válvulas (SOHC 2 válvulas)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor frio. Mesmo procedimento do J-series.', priority: 'HIGH', order: 5 },
  { modelName: 'Hunter 350', yearFrom: 2023, yearTo: null, component: 'Filtro de ar (papel — troca)', intervalKm: 12000, intervalMonths: 12, notes: 'Antecipar em uso urbano com muita poluição/poeira.', priority: 'MEDIUM', order: 6 },
  { modelName: 'Hunter 350', yearFrom: 2023, yearTo: null, component: 'Kit de relação (corrente 520 + pinhão 15T + coroa 42T)', intervalKm: 16000, intervalMonths: null, notes: 'Uso urbano com paradas frequentes desgasta a corrente mais rápido.', priority: 'HIGH', order: 7 },
  { modelName: 'Hunter 350', yearFrom: 2023, yearTo: null, component: 'Embreagem — verificação de folga do cabo', intervalKm: 3000, intervalMonths: null, notes: 'Ciclos frequentes de embreagem no trânsito aceleram a necessidade de ajuste.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Hunter 350', yearFrom: 2023, yearTo: null, component: 'Pastilhas de freio dianteiro/traseiro', intervalKm: 10000, intervalMonths: 12, notes: 'Versão Metro: disco 300mm (F) + 270mm (R). Versão Retro: disco (F) + tambor (R).', priority: 'HIGH', order: 9 },
  { modelName: 'Hunter 350', yearFrom: 2023, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 10 },
  { modelName: 'Hunter 350', yearFrom: 2023, yearTo: null, component: 'Bateria — verificação de tensão (>12,4V repouso)', intervalKm: null, intervalMonths: 6, notes: 'Painel semi-digital consome mais energia em repouso que analógico puro.', priority: 'MEDIUM', order: 11 },

  // METEOR 350
  { modelName: 'Meteor 350', yearFrom: 2021, yearTo: null, component: 'Óleo 15W-50 JASO MA2 (1,7L)', intervalKm: 4000, intervalMonths: 6, notes: 'Mesmo motor J-series. Uso rodoviário constante tolera até 5.000 km; uso urbano, reduzir para 3.000–4.000 km.', priority: 'HIGH', order: 1 },
  { modelName: 'Meteor 350', yearFrom: 2021, yearTo: null, component: 'Filtro de óleo (genuíno 1570120/B)', intervalKm: 8000, intervalMonths: 12, notes: 'Compatível também com Classic e Hunter 350.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Meteor 350', yearFrom: 2021, yearTo: null, component: 'Vela NGK PLKR7A (gap 0,8mm)', intervalKm: 10000, intervalMonths: null, notes: 'Mesma peça dos outros modelos 350 — fácil de encontrar.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Meteor 350', yearFrom: 2021, yearTo: null, component: 'Lubrificação da corrente 520 (104 elos)', intervalKm: 500, intervalMonths: null, notes: 'Lubrificar sempre após chuva/estrada de terra — uso com garupa/bagagem aumenta desgaste.', priority: 'HIGH', order: 4 },
  { modelName: 'Meteor 350', yearFrom: 2021, yearTo: null, component: 'Folga de válvulas (SOHC 2 válvulas)', intervalKm: 10000, intervalMonths: 12, notes: 'Antecipar checagem antes de viagens longas com carga.', priority: 'HIGH', order: 5 },
  { modelName: 'Meteor 350', yearFrom: 2021, yearTo: null, component: 'Filtro de ar (papel — troca)', intervalKm: 12000, intervalMonths: 12, notes: 'Antecipar após viagens em estrada de terra/poeira.', priority: 'MEDIUM', order: 6 },
  { modelName: 'Meteor 350', yearFrom: 2021, yearTo: null, component: 'Kit de relação (corrente 520 + pinhão 15T + coroa 42T)', intervalKm: 18000, intervalMonths: null, notes: 'Uso com garupa/bagagem em viagem exige inspeção mais frequente da folga.', priority: 'HIGH', order: 7 },
  { modelName: 'Meteor 350', yearFrom: 2021, yearTo: null, component: 'Embreagem — verificação de folga do cabo', intervalKm: 3000, intervalMonths: null, notes: 'Mais perceptível sob carga extra em viagens longas.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Meteor 350', yearFrom: 2021, yearTo: null, component: 'Pastilhas de freio dianteiro/traseiro (disco duplo)', intervalKm: 10000, intervalMonths: 12, notes: 'Disco 300mm (F) + 270mm (R), ABS de série.', priority: 'HIGH', order: 9 },
  { modelName: 'Meteor 350', yearFrom: 2021, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 10 },
  { modelName: 'Meteor 350', yearFrom: 2021, yearTo: null, component: 'Bateria e sistema Tripper — verificação de tensão e pareamento Bluetooth', intervalKm: null, intervalMonths: 6, notes: 'Tensão >12,4V em repouso. Repareamento do Tripper se houver falhas de conexão recorrentes.', priority: 'MEDIUM', order: 11 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Royal Enfield 350 (Classic / Hunter / Meteor)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Royal Enfield', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'Royal Enfield', vehicleTypeId: motoType.id },
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

  console.log('✅ Royal Enfield 350 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
