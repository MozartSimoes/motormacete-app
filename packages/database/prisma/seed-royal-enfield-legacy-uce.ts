// seed-royal-enfield-legacy-uce.ts — Royal Enfield Bullet 500, Classic 500 EFI (+ 9 edições de cor
// + edição mesclada "Classic/Classic 500 Chrome") e Continental 535 EFI — geração de motor UCE
// (Unit Construction Engine), 499/535cc, monocilíndrico, refrigerado a ar. Foram as primeiras
// Royal Enfield vendidas oficialmente no Brasil e ainda são muito encontradas no mercado de usados.
// Descontinuadas mundialmente por volta de 2020 (Bullet 500 / Classic 500) por não atenderem mais
// normas de emissão (CONAMA/Euro5) — substituídas pela linha 350 (motor J-series totalmente novo).
// Continental 535 EFI: produção ~2013-2018, substituída pela Continental GT 650 (motor twin, 650cc).
//
// Nomes de modelName seguem a estratégia de substring segura via matchesStoredName (word-boundary):
// - "Bullet 500" casa com a linha FIPE "Bullet 500".
// - "500 EFI" casa com TODAS as 10 variantes que terminam em "500 EFI": "Classic 500 EFI" e as 9
//   coloridas "Classic <Cor> 500 EFI" (Battle Green, Chrome, Desert Storm, Gun Metal Grey, Pegasus,
//   Redditch, Squadron Blue, Stealth Black, Tribute Black) — todas terminam exatamente em "500 EFI".
// - "Classic 500 Chrome" casa com a linha mesclada "Classic/Classic 500 Chrome " (a substring
//   "Classic 500 Chrome" aparece contígua logo após a barra "/").
// - "Continental 535 EFI" casa com a linha FIPE "Continental 535 EFI".
// Todas as variantes de cor da Classic 500 reaproveitam o MESMO conteúdo técnico (mesma moto, só
// muda pintura/grafismo de fábrica) — padrão idêntico ao usado em seed-kawasaki-vulcan-classic.ts.
// Execute: pnpm --filter @motormacete/database db:seed:royal-enfield-legacy-uce
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

// ─── BULLET 500 (UCE) ─────────────────────────────────────────────────────────
// Motor: 499cc monocilíndrico SOHC, 2 válvulas, refrigerado a ar | furo×curso 84×90mm | compressão 8,5:1
// Alimentação: carburador Mikuni BS29 (versões até ~2008) ou EFI Keihin (a partir de ~2008-2009)
// Potência: ~27,2-27,5 cv @ 5.250 rpm | Torque: ~4,2 kgf.m @ 4.000 rpm
// Óleo: 15W-50 ou 20W-50 API SL/SG + JASO MA (óleo compartilhado com embreagem úmida e câmbio) — 2,75L
// Vela: Bosch WQR8DC ou NGK equivalente, gap 0,7-0,9mm (fontes variam; confirme no manual do ano)
// Pneu: 90/90-19 (F) / 110/80-18 (R) | Corrente: 428/520 conforme ano (confirme na sua unidade)
// Folga de válvulas: adm ~0,10-0,15mm / esc ~0,20-0,25mm (motor frio) | Tanque: ~13,5L
// Produção mundial: motor UCE desde 2008/2009 (substituiu o motor "cast iron" antigo) até ~2020

const BULLET500_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 20W-50 (ou 15W-50) API SL + JASO MA — 2,75L; motor e embreagem compartilham o óleo',
    body: 'O motor UCE 499cc usa óleo compartilhado entre motor, câmbio e embreagem úmida (multidisco em banho de óleo) — por isso o óleo PRECISA ser certificado JASO MA (nunca JASO MB de moto scooter, a embreagem escorrega e queima). Capacidade de referência: 2,75L na troca completa (confirme no manual do ano da sua unidade, pode variar ligeiramente). Marcas recomendadas no Brasil: Motul 5100 15W-50 ou 20W-50, Lubrax Moto 4T 20W-50 — semissintético é uma boa relação custo-benefício. Royal Enfield genuíno (quando disponível em importadoras) também é 15W-50 API SL JASO MA. Nunca misture marcas diferentes de óleo na mesma troca — aditivos podem reagir entre si.',
  },
  {
    severity: 'OK',
    title: 'Vela Bosch WQR8DC (gap 0,7-0,9mm) — equivalentes NGK também servem',
    body: 'A vela original de fábrica é a Bosch WQR8DC, com gap especificado entre 0,7 e 0,9mm (confirme a medida exata no manual do ano — há variação entre fontes e entre versões carburada/EFI). Equivalente NGK amplamente usado por proprietários: procure por vela de rosca M14 grau térmico equivalente em lojas de peças de moto — muitos mecânicos que atendem Royal Enfield usam NGK BPR6ES ou similar com bom resultado, mas o ideal é testar e confirmar o gap na prática. Custo: R$ 20-40. Troca a cada 8.000-10.000 km. Sinal de vela gasta: partida a frio difícil, marcha lenta instável.',
  },
  {
    severity: 'WARN',
    title: 'Peças escassas no Brasil: rede de concessionárias Royal Enfield encolheu — busque importadores especializados',
    body: 'A Royal Enfield teve rede de concessionárias limitada no Brasil durante os anos de venda da Bullet/Classic 500 (2010s), e hoje, com os modelos descontinuados, o suporte oficial de peças é ainda mais escasso. Fontes alternativas: (1) importadoras especializadas em peças Royal Enfield originais da Índia (buscar por "Royal Enfield genuine parts India export" — muitas enviam ao Brasil via correio/frete internacional); (2) marketplaces como eBay e AliExpress têm peças genéricas compatíveis com motor UCE (pistão, anéis, retentores, juntas) vendidas por medida, não por número de peça; (3) comunidades de proprietários no Brasil (grupos de Facebook "Royal Enfield Brasil", "Bullet/Classic 500 Brasil") trocam indicações de oficinas especializadas e fornecedores; (4) fóruns internacionais como classicmotorworks.com (Hitchcocks Forum) e Team-BHP (Índia) têm décadas de discussão técnica sobre o motor UCE, incluindo códigos de peça genéricos.',
  },
  {
    severity: 'OK',
    title: 'Carburador Mikuni BS29 (versões pré-EFI): etanol brasileiro degrada mais rápido que gasolina indiana',
    body: 'As Bullet 500 vendidas no início da comercialização oficial no Brasil (por volta de 2010-2011) ainda usavam carburador Mikuni BS29. O etanol da gasolina brasileira (E27) resseca vedações de borracha e forma verniz/goma nos jatos mais rápido que a gasolina para a qual o carburador foi originalmente calibrado. Se a moto ficar parada por mais de 30 dias, escoe o combustível da cuba (parafuso de dreno na base do carburador). Sintomas de carburador sujo: marcha lenta instável, afogamento a frio, engasgo em aceleração. Kits de reparo (jogo de juntas + agulha + boia) para Mikuni BS29 genérico custam R$ 60-120 e atendem bem, mesmo sem ser peça genuína Royal Enfield.',
  },
  {
    severity: 'WARN',
    title: 'EFI Keihin (versões a partir de ~2008-2009): bateria fraca causa funcionamento errático',
    body: 'A partir de determinado ano de produção (verifique no chassi/manual da sua unidade, pois a transição variou por mercado), a Bullet 500 UCE passou a usar injeção eletrônica Keihin. Assim como qualquer sistema EFI, a ECU depende de tensão estável da bateria — bateria fraca (abaixo de 11,8V) pode causar partida difícil, marcha lenta oscilante ou luz de injeção acesa. Mantenha a bateria carregada e substitua quando a tensão em repouso cair abaixo de 12,4V. Bateria recomendada: 12V, verificar amperagem exata no manual (geralmente 8-9Ah para o UCE 500). Marcas disponíveis no Brasil: Moura, Heliar.',
  },
  {
    severity: 'OK',
    title: 'Corrente e kit de relação: confirme a bitola (428 ou 520) da sua unidade antes de comprar',
    body: 'O motor UCE de baixa rotação (torque em ~4.000 rpm) permite o uso de correntes robustas; a bitola exata (428 ou 520) variou conforme ano/mercado de produção — meça a corrente atual (largura entre os elos) antes de comprar o kit de reposição. Lubrifique a cada 500-800 km com spray de corrente ou óleo 80W-90 — a Bullet 500, por ser moto de uso frequentemente esporádico e urbano, sofre mais desgaste por falta de lubrificação do que por quilometragem em si. Kits de relação compatíveis (corrente + pinhão + coroa) de marcas DID, RK ou até genéricas de boa qualidade atendem bem — não é necessário pagar por peça genuína Royal Enfield nesse item, que é caro e difícil de achar no Brasil.',
  },
  {
    severity: 'OK',
    title: 'Folga de válvulas: regulagem manual por parafuso/contra-porca — motor "old school" sem hidráulico',
    body: 'Diferente de motos mais modernas, o motor UCE tem regulagem manual de folga de válvulas por parafuso ajustador e contra-porca (sem tucho hidráulico). Folga de referência: admissão ~0,10-0,15mm, escapamento ~0,20-0,25mm, sempre com o motor frio e o pistão no ponto morto superior do tempo de compressão. Regulagem incorreta causa ruído de "batida" no motor (folga excessiva) ou perda de compressão e superaquecimento de válvula (folga insuficiente). Verifique a cada 5.000-8.000 km — é serviço simples que qualquer mecânico com experiência em motor de válvulas por vareta (pushrod) consegue fazer, mesmo sem ser especialista em Royal Enfield.',
  },
  {
    severity: 'OK',
    title: 'Cuidados para moto de uso esporádico: cheia é melhor que vazia; bateria e carburador exigem atenção',
    body: 'É muito comum encontrar Bullet 500 usadas que rodaram pouco e ficaram meses ou anos guardadas. Antes de tentar ligar após período parado: (1) NÃO force a partida — carregue a bateria lentamente ou substitua se sulfatada; (2) drene o combustível velho do tanque e do carburador/corpo de injeção — combustível com etanol degradado forma verniz; (3) verifique o aspecto do óleo — se estiver leitoso ou muito escuro, troque antes de rodar; (4) mantenha o tanque cheio (não pela metade) durante períodos parados — reduz a condensação de água dentro do tanque; (5) gire o motor manualmente com a vela removida antes da primeira partida pós-parada longa, garantindo lubrificação inicial das partes internas.',
  },
]

const BULLET500_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vazamento de óleo é praticamente uma característica do motor UCE — não pânico, mas fique de olho',
    body: 'O motor UCE tem histórico bem documentado (e até certo ponto "aceito" pela comunidade de proprietários) de pequenos vazamentos de óleo — principalmente pela junta da tampa de balancins (rocker cover), pela junção do tubo de vareta (pushrod tunnel) e pela tampa do câmbio. A qualidade de vedação de fábrica é inferior à das motos japonesas da mesma época. Vazamento pequeno (mancha, sem gotejamento visível) é tolerável com monitoramento do nível de óleo; vazamento com gotejamento no chão exige troca de junta (peça de baixo custo, R$ 15-40, mão de obra é o principal custo). Sempre verifique o nível de óleo antes de qualquer viagem.',
  },
  {
    severity: 'WARN',
    title: 'Vibração perceptível em alta rotação: motor monocilíndrico de projeto antigo, sem contrapeso moderno',
    body: 'O motor UCE 499cc monocilíndrico vibra mais que motos multicilíndricas ou com eixo balanceador mais refinado — isso é característica de projeto (parte do "charme" old-school da marca), mais perceptível acima de 4.500-5.000 rpm. A moto foi pensada para cruzeiro relaxado em rotações baixas/médias. Vibração que piora progressivamente, ou surge de forma diferente do padrão da moto, merece investigação: aperto dos parafusos do motor no chassi (eles soltam com a vibração constante — inclua isso na revisão periódica), coxins de motor desgastados, ou balanceamento incorreto do virabrequim em motor já retrabalhado.',
  },
  {
    severity: 'DANGER',
    title: 'Sistema elétrico com histórico de falhas — chicote e conectores de qualidade inferior às japonesas',
    body: 'Reguladores/retificadores, conectores do chicote e componentes elétricos em geral têm reputação de qualidade inferior comparados a motos japonesas da mesma época — problema documentado tanto em fóruns internacionais quanto por oficinas brasileiras especializadas. Sintomas comuns: farol/lanterna intermitente, bateria não carregando corretamente, instrumentos com leitura errática, principalmente em clima úmido (o chicote não foi otimizado para climas tropicais). Meça a tensão da bateria com o motor em marcha (3.000-4.000 rpm): deve ficar entre 13,5-14,5V. Fora dessa faixa, suspeite do regulador/retificador — item que vale substituir preventivamente em moto muito rodada ou com sintomas de carga irregular, por segurança (falha elétrica grave pode deixar a moto parada em local perigoso à noite).',
  },
  {
    severity: 'WARN',
    title: 'Corrosão em peças cromadas: acabamento inferior às motos japonesas da mesma época',
    body: 'É uma crítica recorrente e bem documentada sobre a Royal Enfield UCE: peças cromadas (guidão, escapamento, para-lamas, tampas laterais) enferrujam e descascam mais rápido que equivalentes japonesas, especialmente em regiões litorâneas ou muito úmidas. Prevenção: lavagem regular removendo sal/poluição, aplicação de cera protetora em peças cromadas, e armazenamento coberto quando possível. Peças de reposição cromadas originais são caras e escassas no Brasil — muitos proprietários recorrem a serviços de recromagem local (cromadores automotivos conseguem recromar peças existentes) como alternativa mais econômica que importar peça nova.',
  },
  {
    severity: 'WARN',
    title: 'Qualidade de acabamento geral inferior às japonesas da época — seja realista na expectativa',
    body: 'É importante ser honesto: a Royal Enfield UCE, apesar do charme retrô e da robustez mecânica básica, tem reputação de qualidade de acabamento (pintura, plásticos, parafusaria, vedações) inferior à das concorrentes japonesas contemporâneas (Honda, Yamaha, Suzuki) da mesma faixa de preço. Isso se reflete em detalhes como: parafusos que enferrujam mais rápido, plásticos que desbotam com o sol, vedações de borracha que ressecam mais cedo. Não é motivo para descartar a moto — é característica conhecida da marca nessa geração — mas o comprador de uma Bullet/Classic 500 usada deve inspecionar esses detalhes com atenção redobrada, e não estranhar se precisar de mais manutenção cosmética que uma japonesa equivalente.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem em banho de óleo: óleo errado ou vencido causa patinação/travamento',
    body: 'Como o óleo é compartilhado entre motor e embreagem úmida multidisco, usar óleo sem certificação JASO MA (por exemplo, óleo de carro ou óleo para scooter automática JASO MB) faz a embreagem escorregar — sintoma: moto acelera o motor mas não ganha velocidade proporcional, embreagem "queimando" com cheiro característico. Óleo vencido ou de baixa qualidade também pode causar aderência excessiva dos discos (embreagem "grudando"), dificultando trocas de marcha. Sempre use óleo JASO MA e respeite o intervalo de troca — este é um dos itens mais críticos de acerto no motor UCE.',
  },
  {
    severity: 'WARN',
    title: 'Peças de suspensão e freio genuínas: preço alto e prazo de entrega longo quando disponíveis',
    body: 'Quando peças específicas (bengala dianteira completa, amortecedores traseiros, componentes do sistema de freio a disco) precisam ser genuínas Royal Enfield, o comprador brasileiro enfrenta preço elevado (câmbio + frete + impostos de importação) e prazo de entrega de semanas. Para itens de desgaste comum (pastilhas de freio, retentores de bengala, rolamentos de roda), prefira sempre buscar equivalente genérico por medida em lojas especializadas — marcas como EBC (pastilhas) têm linha compatível com Royal Enfield vendida no Brasil, com preço e prazo muito melhores que a peça genuína.',
  },
]

const BULLET500_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Bullet 500 (UCE): moto antiga com possível uso esporádico — atenção redobrada em borrachas e elétrica',
    body: '500 km — Troca de óleo inicial de rodagem (20W-50 ou 15W-50 JASO MA). | 3.000 km — Troca de óleo regular (2,75L). Lubrificar corrente. | 5.000 km — Verificar folga de válvulas (adm ~0,10-0,15mm / esc ~0,20-0,25mm, motor frio). Limpar/verificar filtro de ar. | 8.000-10.000 km — Trocar vela (Bosch WQR8DC ou equivalente, gap 0,7-0,9mm). Verificar sincronismo do carburador (versões carburadas) ou ler códigos de falha da injeção (versões EFI). | 12.000 km — Kit relação se desgastado (confirmar bitola 428/520 da sua unidade). Fluido de freio (versões com disco). | 24 meses (independente do km) — Troca preventiva de TODAS as mangueiras de combustível: borracha original ressecada pelo etanol brasileiro é risco real de rachadura e vazamento — item de segurança prioritário em moto com essa idade. | 24 meses — Inspeção de vedações/retentores de bengala e do motor quanto a vazamento de óleo (característica conhecida do motor UCE). | Anual — Teste de tensão do sistema de carga (13,5-14,5V @ 3.000-4.000 rpm) — sistema elétrico tem histórico de falhas nesta geração. | Antes de rodar após período parado (+30 dias) — drenar combustível velho, testar/carregar bateria, verificar aspecto do óleo, lubrificar corrente antes de qualquer viagem.',
  },
]

// ─── CLASSIC 500 EFI (+ variantes de cor + edição mesclada Chrome) ───────────
// Motor: 499cc monocilíndrico SOHC, 2 válvulas, refrigerado a ar | mesmo motor UCE do Bullet 500
// Alimentação: EFI Keihin (toda a linha Classic 500 vendida oficialmente no Brasil já era injetada)
// Potência: ~27,2 cv @ 5.250 rpm | Torque: ~4,1-4,2 kgf.m @ 4.000 rpm | Compressão: 8,5:1
// Óleo: 15W-50 ou 20W-50 API SL + JASO MA (compartilhado com câmbio/embreagem) — 2,75L
// Vela: WQR8DC (Bosch) M14 ou UR6DC (Bosch) M10 conforme versão — gap 0,7-0,8mm
// Pneu: 90/90-19 (F) / 110/80-18 (R) | Corrente: 428/520 conforme ano — confirme na sua unidade
// Folga de válvulas: adm ~0,10-0,15mm / esc ~0,20-0,25mm (motor frio) | Tanque: ~13,5L
// Modelo mais vendido da marca no Brasil antes da chegada da linha 350. Descontinuada mundialmente
// em 2020, com a edição especial "Tribute Black" marcando o fim de produção (apenas 120 unidades
// no Brasil, de 1.000 mundiais) — substituída pela Classic 350 (motor J-series novo).

const CLASSIC500_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 15W-50/20W-50 JASO MA — 2,75L; mesmo motor UCE do Bullet 500, mesmos cuidados',
    body: 'A Classic 500 EFI compartilha o motor UCE 499cc do Bullet 500 — óleo compartilhado entre motor, câmbio e embreagem úmida, JASO MA obrigatório (nunca JASO MB de scooter). Capacidade de referência: 2,75L (confirme no manual do ano da sua unidade). Marcas recomendadas: Motul 5100 15W-50/20W-50, Lubrax Moto 4T 20W-50. Intervalo: 3.000-4.000 km — motor a ar antigo se beneficia de troca mais frequente que o intervalo original de fábrica, especialmente em uso urbano brasileiro com trânsito parado.',
  },
  {
    severity: 'OK',
    title: 'Vela WQR8DC (M14) ou UR6DC (M10) conforme versão — gap 0,7-0,8mm',
    body: 'A Classic 500 EFI usa vela Bosch WQR8DC (rosca M14) em algumas versões/anos, e UR6DC (rosca M10) em outras — confirme a rosca correta olhando o cabeçote ou o manual do ano específico antes de comprar, para não levar peça errada. Gap: 0,7-0,8mm. Troca a cada 8.000-10.000 km. Custo: R$ 20-45. Ao trocar, aplique um pouco de graxa antigripante na rosca (motor a ar com cabeçote de liga leve é propenso a "comer rosca" se a vela for instalada seca e com torque excessivo).',
  },
  {
    severity: 'WARN',
    title: 'Peças escassas para modelo descontinuado — priorize importadores de peças indianas e comunidades de proprietários',
    body: 'Com a Classic 500 EFI descontinuada mundialmente desde 2020 e a rede de concessionárias Royal Enfield no Brasil sendo pequena mesmo nos anos de venda ativa, encontrar peças originais é desafiador. Estratégias práticas: (1) importadoras que trazem peças genuínas Royal Enfield da Índia (pesquise "Royal Enfield genuine spares export Brazil" ou similar) — frete e prazo maiores, mas peça correta; (2) marketplaces internacionais (eBay, AliExpress) para peças genéricas compatíveis com motor UCE (pistão, anéis, juntas, retentores, kits de carburador/corpo de injeção); (3) grupos de proprietários no Facebook e WhatsApp ("Royal Enfield Brasil", "Classic 500 Owners Brazil") costumam ter listas atualizadas de fornecedores confiáveis e até peças usadas de doadores; (4) fóruns internacionais (classicmotorworks.com/Hitchcocks Forum, Team-BHP) têm anos de discussão técnica com códigos de peça e alternativas testadas por outros proprietários.',
  },
  {
    severity: 'OK',
    title: 'EFI Keihin: toda a linha Classic 500 vendida oficialmente já era injetada — cuide da bateria',
    body: 'Diferente do Bullet 500 (que teve versões carburadas iniciais), a Classic 500 vendida oficialmente no Brasil já veio de fábrica com injeção eletrônica Keihin. A ECU depende de tensão estável — bateria fraca (abaixo de 11,8V) causa partida difícil, marcha lenta instável ou até luz de injeção acesa no painel. Mantenha a bateria carregada e substitua quando a tensão em repouso cair abaixo de 12,4V. Se o problema persistir mesmo com bateria boa, um mecânico especializado em Royal Enfield ou injeção eletrônica em geral consegue ler os códigos de falha via porta de diagnóstico.',
  },
  {
    severity: 'OK',
    title: 'Corrente e kit de relação: lubrifique a cada 500-800 km — moto pesada exige atenção redobrada',
    body: 'A Classic 500 é mais pesada que motos japonesas equivalentes (peso seco em torno de 190-195 kg), o que exige mais da transmissão final. Lubrifique a corrente a cada 500-800 km com spray de corrente ou óleo 80W-90 no trecho inferior. Folga correta: 20-30mm no centro do trecho inferior, moto no cavalete central. Kits de relação (corrente + pinhão + coroa) de marcas DID, RK ou genéricas de boa qualidade servem sem problema — evite pagar preço de peça genuína Royal Enfield para este item de desgaste comum.',
  },
  {
    severity: 'OK',
    title: 'Folga de válvulas: regulagem manual, motor "old school" sem tucho hidráulico',
    body: 'O motor UCE usa regulagem manual de folga de válvulas por parafuso ajustador e contra-porca (rocker arm), diferente de motos modernas com ajustadores hidráulicos automáticos. Folga de referência: admissão ~0,10-0,15mm, escapamento ~0,20-0,25mm, sempre com motor frio e pistão no ponto morto superior de compressão. Verifique a cada 5.000-8.000 km. Regulagem fora do padrão causa ruído de batida (folga excessiva) ou perda de compressão/superaquecimento de válvula (folga insuficiente) — serviço acessível em qualquer oficina com experiência em motor de válvulas por vareta.',
  },
  {
    severity: 'OK',
    title: 'Pneus 90/90-19 (dianteiro) e 110/80-18 (traseiro): opções Pirelli, Michelin e CEAT no Brasil',
    body: 'A medida de pneu da Classic 500 (90/90-19 dianteiro, 110/80-18 traseiro) é razoavelmente comum no mercado brasileiro de pneus para motos de estilo retrô/cruiser. Opções recomendadas: Pirelli MT 90 A/T ou Sport Demon, Michelin Anakee (uso misto), CEAT Zoom (opção mais em conta, boa relação custo-benefício, disponível na maioria das lojas de pneus para moto). Substitua sempre o par (dianteiro + traseiro) quando um deles atingir o TWI (indicador de desgaste) — pneus desbalanceados em idade/desgaste afetam a estabilidade, especialmente numa moto pesada como a Classic 500.',
  },
  {
    severity: 'WARN',
    title: 'Bengala dianteira e amortecedores traseiros: vedações endurecem com a idade mesmo sem uso',
    body: 'Motos com muitos anos de fabricação (a Classic 500 chegou ao Brasil ainda nos anos 2010) têm vedações de borracha na bengala dianteira e amortecedores traseiros que endurecem só pela idade, mesmo em unidades com baixa quilometragem. Sintoma: óleo escuro visível no tubo interno da bengala, amortecimento "seco" ou irregular. Vedantes genéricos por medida (não precisam ser Royal Enfield) resolvem a bengala; amortecedores traseiros com vazamento geralmente exigem substituição do conjunto — marcas aftermarket compatíveis (não precisam ser genuínas) atendem bem e custam uma fração do preço da peça original importada.',
  },
]

const CLASSIC500_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vazamento de óleo: característica conhecida do motor UCE, mesma origem do Bullet 500',
    body: 'Assim como o Bullet 500, a Classic 500 EFI tem histórico documentado de pequenos vazamentos de óleo pela junta da tampa de balancins, junção do tubo de vareta (pushrod tunnel) e tampa do câmbio — vedação de fábrica inferior à das motos japonesas da mesma época. Vazamento pequeno (mancha, sem gotejamento) é tolerável com monitoramento do nível; gotejamento visível no chão exige troca de junta (peça barata, R$ 15-40, mão de obra é o principal custo). Verifique o nível de óleo antes de qualquer viagem mais longa.',
  },
  {
    severity: 'WARN',
    title: 'Vibração em alta rotação: motor monocilíndrico sem contrapeso refinado — normal, mas fique atento a mudanças',
    body: 'O motor UCE 499cc vibra mais que motos multicilíndricas modernas, principalmente acima de 4.500-5.000 rpm — característica de projeto, parte do apelo "old school" da marca. A moto foi pensada para cruzeiro relaxado em rotações médias. Vibração que piora progressivamente ou muda de padrão merece atenção: verifique o aperto dos parafusos de fixação do motor no chassi (afrouxam com a vibração constante) e os coxins de motor.',
  },
  {
    severity: 'DANGER',
    title: 'Sistema elétrico: histórico de falhas em regulador/retificador e chicote — pior em clima úmido',
    body: 'O sistema elétrico da Classic 500 tem reputação de qualidade inferior à das concorrentes japonesas da época — regulador/retificador e conectores do chicote são pontos de falha documentados, mais frequentes em clima úmido/litorâneo (o chicote não foi otimizado para uso tropical). Sintomas: farol/lanterna intermitente, bateria não carregando (meça 13,5-14,5V com motor a 3.000-4.000 rpm), instrumentos com leitura errática. Considere substituição preventiva do regulador/retificador em moto muito rodada ou com qualquer sintoma de carga irregular — falha elétrica súbita pode deixar a moto parada em local inconveniente ou perigoso.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão em cromados: para-lamas, escapamento e acabamentos enferrujam mais rápido que japonesas',
    body: 'A Classic 500, com seu visual retrô rico em cromados (para-lama dianteiro grande, escapamento, tampas laterais), sofre com corrosão prematura destas peças comparado a equivalentes japonesas — problema bem documentado pela comunidade de proprietários. Mais crítico em regiões litorâneas. Prevenção: lavagem regular removendo sal/poluição, cera protetora, armazenamento coberto quando possível. Recromagem local (cromadores automotivos) é alternativa mais barata que importar peça cromada nova.',
  },
  {
    severity: 'WARN',
    title: 'Qualidade de acabamento inferior às japonesas contemporâneas — inspecione com atenção na compra usada',
    body: 'É importante ser realista: apesar do charme retrô e robustez mecânica básica do motor UCE, a Classic 500 tem reputação de acabamento (pintura, plásticos, parafusaria, vedações de borracha) inferior ao das concorrentes japonesas da mesma faixa de preço na época. Ao comprar uma Classic 500 usada, inspecione com atenção redobrada: oxidação de parafusos, desbotamento de plásticos/pintura, ressecamento de borrachas — mais comum e mais cedo que numa Honda ou Yamaha equivalente. Não é motivo para descartar a compra, mas ajusta a expectativa de manutenção cosmética necessária.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem em banho de óleo: sensível ao tipo de óleo usado — patina ou trava com óleo errado',
    body: 'Como o óleo é compartilhado entre motor e embreagem úmida multidisco, usar óleo sem certificação JASO MA (óleo de carro comum ou óleo JASO MB de scooter automática) faz a embreagem escorregar — sintoma: motor acelera sem ganho proporcional de velocidade, cheiro de embreagem "queimando". Óleo vencido também pode causar aderência excessiva dos discos, dificultando trocas de marcha. Este é um dos pontos mais críticos de acerto na manutenção do motor UCE — sempre confirme JASO MA na embalagem antes de comprar.',
  },
  {
    severity: 'WARN',
    title: 'Peso elevado (~190-195 kg) exige atenção a freios e suspensão em uso urbano intenso',
    body: 'A Classic 500 é sensivelmente mais pesada que motos japonesas de cilindrada equivalente, o que acelera o desgaste de pastilhas de freio e componentes de suspensão em uso urbano com trânsito parado e frenagens frequentes. Fique atento ao desgaste das pastilhas (inspeção visual através da pinça) e ao comportamento da suspensão (amortecimento "seco" ou batidas em buracos indicam necessidade de revisão). Peças de freio compatíveis EBC e genéricas por medida atendem bem sem precisar ser genuínas Royal Enfield.',
  },
]

const CLASSIC500_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Classic 500 EFI (todas as cores): mesmo motor UCE do Bullet 500 — mesmos cuidados essenciais',
    body: '500 km — Troca de óleo inicial de rodagem (20W-50 ou 15W-50 JASO MA). | 3.000-4.000 km — Troca de óleo regular (2,75L). Lubrificar corrente. | 5.000 km — Verificar folga de válvulas (adm ~0,10-0,15mm / esc ~0,20-0,25mm, motor frio). Verificar filtro de ar. | 8.000-10.000 km — Trocar vela (WQR8DC ou UR6DC conforme versão, gap 0,7-0,8mm). Ler códigos de falha da injeção eletrônica, se houver luz acesa. | 12.000 km — Kit relação se desgastado. Fluido de freio (disco dianteiro, e traseiro nas versões com disco). | 24 meses (independente do km) — Troca preventiva de TODAS as mangueiras de combustível: item de segurança prioritário, borracha original ressecada pelo etanol. | 24 meses — Inspeção de vedações de bengala e amortecedores traseiros — endurecem com a idade mesmo sem uso intenso. | Anual — Teste de tensão do sistema de carga (13,5-14,5V @ 3.000-4.000 rpm) e inspeção de cromados quanto a corrosão. | Antes de rodar após período parado — drenar combustível velho, testar/carregar bateria, verificar aspecto do óleo, lubrificar corrente antes de qualquer viagem.',
  },
]

// ─── CONTINENTAL 535 EFI ──────────────────────────────────────────────────────
// Motor: 535cc monocilíndrico SOHC, 2 válvulas, refrigerado a ar | furo×curso 87×90mm | compressão 8,5:1
// Alimentação: EFI Keihin | Potência: ~29,1 cv @ 5.100 rpm | Torque: ~4,5 kgf.m @ 4.000 rpm
// Óleo: 15W-50 ou 20W-50 API SL + JASO MA (compartilhado com câmbio/embreagem) — capacidade ~2,5-2,75L
// (motor derivado do UCE 500 com cilindrada aumentada; confirme capacidade exata no manual da sua unidade)
// Vela: equivalente ao restante da linha UCE, gap ~0,7-0,8mm (confirme modelo exato pelo ano)
// Pneu: aro 18" nas duas rodas, Pirelli Sport Demon de fábrica | Tanque: ~13,5L | Peso: ~184 kg
// Folga de válvulas: mesmo padrão do restante da linha UCE — adm ~0,10-0,15mm / esc ~0,20-0,25mm
// Cafe racer histórica, produzida aproximadamente entre 2013-2018, moto de nicho para quem busca o
// estilo cafe racer britânico clássico. Descontinuada, substituída pela Continental GT 650 (motor
// twin-cilindro 650cc, plataforma totalmente diferente, compartilhada com a Interceptor 650).

const CONTINENTAL535_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 15W-50/20W-50 JASO MA — motor UCE de maior cilindrada da era, mesmos cuidados da linha 500',
    body: 'O motor 535cc da Continental é uma evolução do UCE 499cc com cilindrada aumentada (furo maior, 87mm contra 84mm) — compartilha a mesma arquitetura básica e os mesmos cuidados de óleo: JASO MA obrigatório (embreagem úmida compartilha o óleo com motor e câmbio), capacidade de referência em torno de 2,5-2,75L (confirme exatamente no manual da sua unidade, pois a Continental teve produção mais curta e menos documentação disponível que Bullet/Classic). Marcas recomendadas: Motul 5100 15W-50/20W-50, Lubrax Moto 4T 20W-50. Intervalo: 3.000-4.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Moto de nicho: peças ainda mais escassas que Bullet/Classic 500 — a Continental vendeu muito menos no Brasil',
    body: 'A Continental GT 535 EFI foi vendida em volume bem menor no Brasil que a Bullet/Classic 500, por ser posicionada como moto de nicho (estilo cafe racer). Isso torna peças específicas (tanque, banco solo, guidão clip-on, escapamento duplo característico) ainda mais raras que para o restante da linha UCE. Estratégias: (1) muitas peças de motor/elétrica são compartilhadas com Bullet/Classic 500 e podem ser buscadas com a mesma abordagem (importadores de peças indianas, marketplaces internacionais); (2) peças exclusivas de carroceria/estilo geralmente só em desmanches ou importação direta via eBay/fóruns internacionais; (3) comunidades internacionais de Continental GT (incluindo proprietários da versão 650 mais recente) às vezes têm informação útil sobre compatibilidade de peças entre gerações — confirme sempre a compatibilidade antes de comprar, pois motor 535 (UCE) e motor 650 (twin) são totalmente diferentes.',
  },
  {
    severity: 'OK',
    title: 'Pneus aro 18" (ambas as rodas) — Pirelli Sport Demon de fábrica, boa disponibilidade no Brasil',
    body: 'A Continental 535 usa aro 18" nas duas rodas com pneu Pirelli Sport Demon de fábrica — medida e marca com boa disponibilidade no mercado brasileiro de pneus para moto (diferente de outras peças da moto, que são mais escassas). Alternativas equivalentes: Michelin Anakee, CEAT Zoom. Substitua sempre o par ao atingir o TWI (indicador de desgaste) — o estilo cafe racer da Continental favorece pilotagem mais esportiva que a Classic/Bullet, então o desgaste do pneu pode ser mais acentuado e irregular (mais uso da banda lateral em curvas).',
  },
  {
    severity: 'OK',
    title: 'EFI Keihin: cuide da tensão da bateria — toda a linha Continental já era injetada',
    body: 'A Continental GT 535 EFI, como o nome já indica, é 100% injeção eletrônica Keihin (não teve versão carburada). A ECU depende de tensão estável da bateria — bateria fraca (abaixo de 11,8V) causa partida difícil, marcha lenta oscilante ou luz de injeção acesa. Mantenha a bateria carregada e substitua quando a tensão em repouso cair abaixo de 12,4V. Baterias compatíveis (12V, verificar amperagem no manual) são encontradas facilmente em marcas nacionais como Moura e Heliar — não é necessário importar esse item.',
  },
  {
    severity: 'OK',
    title: 'Guidão clip-on e posição cafe racer: revise o aperto regularmente — vibração afrouxa parafusos mais rápido',
    body: 'O guidão tipo clip-on (baixo, esportivo) da Continental transmite mais vibração do motor monocilíndrico diretamente para as mãos do piloto que o guidão alto e mais isolado da Classic/Bullet. Verifique o aperto dos parafusos do guidão, manetes e retrovisores a cada revisão — a vibração constante do motor UCE afrouxa fixações mais rápido nesta configuração de guidão baixo. Grips e contrapesos de guidão de boa qualidade (aftermarket, não precisa ser genuíno) ajudam a reduzir a fadiga nas mãos em viagens mais longas.',
  },
  {
    severity: 'OK',
    title: 'Corrente e kit de relação: lubrifique a cada 500-800 km, mesma orientação da linha UCE',
    body: 'A transmissão final por corrente segue o mesmo padrão de cuidado do restante da linha UCE — lubrifique a cada 500-800 km com spray de corrente ou óleo 80W-90 no trecho inferior. Folga correta: 20-30mm no centro do trecho inferior, moto no cavalete central. Kits de relação de marcas DID, RK ou genéricas de boa qualidade servem sem necessidade de peça genuína Royal Enfield — confirme apenas a bitola correta (meça a corrente atual) antes de comprar.',
  },
  {
    severity: 'OK',
    title: 'Folga de válvulas: mesma regulagem manual do restante da linha UCE — adm 0,10-0,15mm / esc 0,20-0,25mm',
    body: 'O motor 535cc mantém a mesma arquitetura de regulagem manual de folga de válvulas por parafuso ajustador e contra-porca do restante da linha UCE (sem tucho hidráulico). Folga de referência: admissão ~0,10-0,15mm, escapamento ~0,20-0,25mm, motor frio, pistão no ponto morto superior de compressão. Verifique a cada 5.000-8.000 km. Qualquer mecânico com experiência em motor de válvulas por vareta (pushrod) — não precisa ser especialista exclusivo em Royal Enfield — consegue realizar esse serviço corretamente.',
  },
  {
    severity: 'WARN',
    title: 'Vela: confirme o modelo exato pelo ano — linha Continental teve menos documentação pública que Bullet/Classic',
    body: 'Por ter sido vendida em volume bem menor, há menos documentação pública específica sobre o modelo exato de vela da Continental 535 comparado ao Bullet/Classic 500. A referência de gap (~0,7-0,8mm) segue o padrão da família UCE EFI, mas confirme a rosca (M14 ou M10) e o modelo exato no manual do proprietário da sua unidade específica ou com um mecânico especializado em Royal Enfield antes de comprar a peça, para evitar erro de rosca ou grau térmico.',
  },
]

const CONTINENTAL535_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vazamento de óleo: mesmo histórico do restante da linha UCE, motor de maior cilindrada não muda o padrão',
    body: 'A Continental 535 compartilha a arquitetura básica do motor UCE e, com ela, o histórico de pequenos vazamentos de óleo pela junta da tampa de balancins, junção do tubo de vareta e tampa do câmbio — vedação de fábrica inferior à das motos japonesas da época. Vazamento pequeno é tolerável com monitoramento; gotejamento visível exige troca de junta (peça barata, mão de obra é o principal custo). Verifique o nível de óleo antes de qualquer viagem, especialmente considerando o perfil de uso mais esportivo desta moto.',
  },
  {
    severity: 'WARN',
    title: 'Vibração mais perceptível nas mãos: posição cafe racer transmite mais vibração que Classic/Bullet',
    body: 'O motor monocilíndrico 535cc vibra de forma semelhante ao restante da linha UCE, mas a posição de pilotagem cafe racer (guidão clip-on baixo, mais peso nas mãos) faz a vibração ser mais perceptível e cansativa em viagens longas comparado à posição ereta e relaxada da Classic/Bullet. Isso é característica de projeto/ergonomia, não defeito mecânico. Vibração que piora progressivamente ou muda de padrão merece verificação do aperto dos parafusos do motor no chassi e dos coxins de motor.',
  },
  {
    severity: 'DANGER',
    title: 'Sistema elétrico: mesmo histórico de falhas em regulador/retificador da linha UCE',
    body: 'A Continental 535 compartilha os mesmos componentes elétricos e o mesmo histórico de falhas do restante da linha UCE — regulador/retificador e conectores do chicote como pontos fracos documentados, especialmente em clima úmido. Sintomas: farol/lanterna intermitente, bateria não carregando (meça 13,5-14,5V com motor a 3.000-4.000 rpm). Considere substituição preventiva do regulador/retificador em moto muito rodada ou com qualquer sintoma de carga irregular.',
  },
  {
    severity: 'WARN',
    title: 'Escapamento duplo (estilo cafe racer): mais exposto a corrosão pela posição e formato',
    body: 'O escapamento duplo característico do visual cafe racer da Continental fica mais exposto a respingos de água e sujeira da estrada que escapamentos únicos mais protegidos — favorecendo corrosão prematura, especialmente em regiões litorâneas. Prevenção: lavagem regular removendo sal/poluição, aplicação de produto anticorrosivo específico para escapamento cromado. Peça de reposição do escapamento duplo original é item caro e escasso — considere escapamentos aftermarket compatíveis (mais fáceis de encontrar) se precisar substituir por corrosão severa.',
  },
  {
    severity: 'WARN',
    title: 'Qualidade de acabamento: mesma característica da linha UCE, inspecione cromados e plásticos na compra',
    body: 'Assim como o restante da linha UCE, a Continental 535 tem reputação de acabamento (pintura, parafusaria, vedações de borracha) inferior ao das concorrentes japonesas contemporâneas. Ao comprar uma unidade usada, inspecione com atenção: oxidação de parafusos, estado dos cromados (tanque, escapamento), ressecamento de borrachas do guidão e suspensão — mais comum e mais cedo que numa moto japonesa equivalente da época.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem em banho de óleo: mesma sensibilidade ao tipo de óleo do restante da linha UCE',
    body: 'Como todo o motor UCE, o óleo é compartilhado entre motor e embreagem úmida multidisco — usar óleo sem certificação JASO MA faz a embreagem escorregar (sintoma: motor acelera sem ganho proporcional de velocidade, cheiro de embreagem queimando). Óleo vencido também pode causar aderência excessiva dos discos, dificultando trocas de marcha. Sempre confirme JASO MA na embalagem do óleo antes de comprar — item crítico em qualquer moto desta família.',
  },
]

const CONTINENTAL535_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Continental 535 EFI: motor UCE de maior cilindrada, mesma disciplina de manutenção da linha 500',
    body: '500 km — Troca de óleo inicial de rodagem (20W-50 ou 15W-50 JASO MA). | 3.000-4.000 km — Troca de óleo regular (~2,5-2,75L, confirmar no manual da unidade). Lubrificar corrente. | 5.000 km — Verificar folga de válvulas (adm ~0,10-0,15mm / esc ~0,20-0,25mm, motor frio). Verificar filtro de ar. | 8.000-10.000 km — Trocar vela (confirmar modelo exato pelo ano). Ler códigos de falha da injeção eletrônica, se houver luz acesa. | 12.000 km — Kit relação se desgastado. Fluido de freio (disco dianteiro e traseiro). | 24 meses (independente do km) — Troca preventiva de TODAS as mangueiras de combustível: item de segurança prioritário, borracha original ressecada pelo etanol brasileiro. | 24 meses — Inspeção de vedações de bengala e suspensão traseira. Verificação do aperto do guidão clip-on e manetes (vibração afrouxa mais rápido nesta configuração). | Anual — Teste de tensão do sistema de carga (13,5-14,5V @ 3.000-4.000 rpm) e inspeção do escapamento duplo quanto a corrosão. | Antes de rodar após período parado — drenar combustível velho, testar/carregar bateria, verificar aspecto do óleo, lubrificar corrente antes de qualquer viagem.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────
// "500 EFI" cobre as 10 variantes de cor da Classic 500 (base + 9 coloridas) por terminarem todas
// em "500 EFI". "Classic 500 Chrome" cobre a linha mesclada "Classic/Classic 500 Chrome ".

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'Bullet 500',
    yearFrom: 2009,
    yearTo: 2020,
    MACETES: BULLET500_MACETES,
    PROBLEMAS: BULLET500_PROBLEMAS,
    MANUTENCAO: BULLET500_MANUTENCAO,
  },
  {
    modelName: '500 EFI',
    yearFrom: 2009,
    yearTo: 2020,
    MACETES: CLASSIC500_MACETES,
    PROBLEMAS: CLASSIC500_PROBLEMAS,
    MANUTENCAO: CLASSIC500_MANUTENCAO,
  },
  {
    modelName: 'Classic 500 Chrome',
    yearFrom: 2009,
    yearTo: 2020,
    MACETES: CLASSIC500_MACETES,
    PROBLEMAS: CLASSIC500_PROBLEMAS,
    MANUTENCAO: CLASSIC500_MANUTENCAO,
  },
  {
    modelName: 'Continental 535 EFI',
    yearFrom: 2013,
    yearTo: 2018,
    MACETES: CONTINENTAL535_MACETES,
    PROBLEMAS: CONTINENTAL535_PROBLEMAS,
    MANUTENCAO: CONTINENTAL535_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'Bullet 500',
    yearFrom: 2009, yearTo: 2020,
    tireSize: '90/90-19 (F) · 110/80-18 (R)',
    frontPsi: 21, rearPsi: 28,
    frontPsiLoad: 21, rearPsiLoad: 32,
    notes: 'Solo: F 21 / R 28 PSI. Com carona/bagagem: F 21 / R 32 PSI. Valores de referência do manual Royal Enfield — confirme na etiqueta da sua unidade, pois pode variar levemente por ano. Pneus recomendados: Pirelli MT 90 A/T, CEAT Zoom.',
  },
  {
    modelName: '500 EFI',
    yearFrom: 2009, yearTo: 2020,
    tireSize: '90/90-19 (F) · 110/80-18 (R)',
    frontPsi: 21, rearPsi: 28,
    frontPsiLoad: 21, rearPsiLoad: 32,
    notes: 'Válido para todas as edições de cor da Classic 500 EFI (base, Battle Green, Chrome, Desert Storm, Gun Metal Grey, Pegasus, Redditch, Squadron Blue, Stealth Black, Tribute Black) — mesma moto, só muda a pintura. Solo: F 21 / R 28 PSI. Com carona: F 21 / R 32 PSI. Pneus: Pirelli MT 90 A/T ou Sport Demon, Michelin Anakee, CEAT Zoom.',
  },
  {
    modelName: 'Classic 500 Chrome',
    yearFrom: 2009, yearTo: 2020,
    tireSize: '90/90-19 (F) · 110/80-18 (R)',
    frontPsi: 21, rearPsi: 28,
    frontPsiLoad: 21, rearPsiLoad: 32,
    notes: 'Mesma especificação da Classic 500 EFI — edição de acabamento cromado, mecânica idêntica. Solo: F 21 / R 28 PSI. Com carona: F 21 / R 32 PSI.',
  },
  {
    modelName: 'Continental 535 EFI',
    yearFrom: 2013, yearTo: 2018,
    tireSize: '100/90-18 (F) · 130/70-18 (R, aprox.)',
    frontPsi: 25, rearPsi: 32,
    frontPsiLoad: 25, rearPsiLoad: 36,
    notes: 'Solo: F 25 / R 32 PSI (estimativa baseada em pneus Pirelli Sport Demon aro 18 nas duas rodas — confirme a etiqueta de pressão na sua unidade, pois há pouca documentação pública específica para este modelo de baixo volume no Brasil). Com carona: F 25 / R 36 PSI. Pneu original de fábrica: Pirelli Sport Demon.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // Bullet 500
  { modelName: 'Bullet 500', yearFrom: 2009, yearTo: 2020, component: 'Óleo 20W-50/15W-50 JASO MA (~2,75L)', intervalKm: 3500, intervalMonths: 6, notes: 'Óleo compartilhado com câmbio/embreagem úmida — JASO MA obrigatório, nunca JASO MB.', priority: 'HIGH', order: 1 },
  { modelName: 'Bullet 500', yearFrom: 2009, yearTo: 2020, component: 'Vela Bosch WQR8DC (gap 0,7-0,9mm)', intervalKm: 9000, intervalMonths: null, notes: 'Confirme rosca/gap exato pelo ano — fontes variam. Aplicar graxa antigripante na rosca.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Bullet 500', yearFrom: 2009, yearTo: 2020, component: 'Lubrificação da corrente (428/520 conforme ano)', intervalKm: 650, intervalMonths: null, notes: 'Confirme a bitola da sua unidade antes de comprar kit. Folga 20-30mm.', priority: 'HIGH', order: 3 },
  { modelName: 'Bullet 500', yearFrom: 2009, yearTo: 2020, component: 'Folga de válvulas (adm ~0,10-0,15mm / esc ~0,20-0,25mm)', intervalKm: 6000, intervalMonths: 12, notes: 'Regulagem manual por parafuso e contra-porca, motor frio, sem tucho hidráulico.', priority: 'HIGH', order: 4 },
  { modelName: 'Bullet 500', yearFrom: 2009, yearTo: 2020, component: 'Filtro de ar — inspeção/limpeza', intervalKm: 5000, intervalMonths: 12, notes: 'Verificar element de papel/espuma conforme versão.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Bullet 500', yearFrom: 2009, yearTo: 2020, component: 'Carburador (versões pré-EFI) ou corpo de injeção (EFI) — limpeza preventiva', intervalKm: 10000, intervalMonths: 12, notes: 'Etanol brasileiro forma verniz/goma. Escoar combustível se moto ficar parada +30 dias.', priority: 'MEDIUM', order: 6 },
  { modelName: 'Bullet 500', yearFrom: 2009, yearTo: 2020, component: 'Fluido de freio DOT 4', intervalKm: 12000, intervalMonths: 24, notes: 'Versões com disco. Bienal obrigatório mesmo sem uso intenso.', priority: 'HIGH', order: 7 },
  { modelName: 'Bullet 500', yearFrom: 2009, yearTo: 2020, component: 'Kit relação (corrente + pinhão + coroa)', intervalKm: 15000, intervalMonths: null, notes: 'DID, RK ou genérico de qualidade atende bem — não precisa ser peça genuína.', priority: 'HIGH', order: 8 },
  { modelName: 'Bullet 500', yearFrom: 2009, yearTo: 2020, component: 'Verificação do regulador/retificador (13,5-14,5V @ 3.000-4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Sistema elétrico com histórico de falhas nesta geração. Substituir preventivamente se sintoma de carga irregular.', priority: 'CRITICAL', order: 9 },
  { modelName: 'Bullet 500', yearFrom: 2009, yearTo: 2020, component: 'Mangueiras de combustível — troca preventiva', intervalKm: null, intervalMonths: 24, notes: 'Item de segurança crítico: borracha original ressecada pelo etanol pode rachar e vazar.', priority: 'CRITICAL', order: 10 },
  { modelName: 'Bullet 500', yearFrom: 2009, yearTo: 2020, component: 'Inspeção de vazamento de óleo (tampa de balancins, tubo de vareta, tampa do câmbio)', intervalKm: null, intervalMonths: 6, notes: 'Característica conhecida do motor UCE. Trocar junta ao primeiro sinal de gotejamento.', priority: 'MEDIUM', order: 11 },

  // 500 EFI (Classic 500 e todas as variantes de cor)
  { modelName: '500 EFI', yearFrom: 2009, yearTo: 2020, component: 'Óleo 20W-50/15W-50 JASO MA (~2,75L)', intervalKm: 3500, intervalMonths: 6, notes: 'Mesmo motor UCE do Bullet 500. JASO MA obrigatório.', priority: 'HIGH', order: 1 },
  { modelName: '500 EFI', yearFrom: 2009, yearTo: 2020, component: 'Vela WQR8DC (M14) ou UR6DC (M10) — gap 0,7-0,8mm', intervalKm: 9000, intervalMonths: null, notes: 'Confirme a rosca correta pelo ano antes de comprar.', priority: 'MEDIUM', order: 2 },
  { modelName: '500 EFI', yearFrom: 2009, yearTo: 2020, component: 'Lubrificação da corrente (428/520 conforme ano)', intervalKm: 650, intervalMonths: null, notes: 'Moto mais pesada exige atenção redobrada à transmissão. Folga 20-30mm.', priority: 'HIGH', order: 3 },
  { modelName: '500 EFI', yearFrom: 2009, yearTo: 2020, component: 'Folga de válvulas (adm ~0,10-0,15mm / esc ~0,20-0,25mm)', intervalKm: 6000, intervalMonths: 12, notes: 'Regulagem manual, motor frio, sem tucho hidráulico.', priority: 'HIGH', order: 4 },
  { modelName: '500 EFI', yearFrom: 2009, yearTo: 2020, component: 'Filtro de ar — inspeção/troca', intervalKm: 5000, intervalMonths: 12, notes: 'Verificar elemento conforme versão.', priority: 'MEDIUM', order: 5 },
  { modelName: '500 EFI', yearFrom: 2009, yearTo: 2020, component: 'Corpo de injeção EFI Keihin — diagnóstico se luz acesa', intervalKm: 10000, intervalMonths: 12, notes: 'Toda a linha Classic 500 vendida oficialmente já é EFI.', priority: 'MEDIUM', order: 6 },
  { modelName: '500 EFI', yearFrom: 2009, yearTo: 2020, component: 'Fluido de freio DOT 4', intervalKm: 12000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 7 },
  { modelName: '500 EFI', yearFrom: 2009, yearTo: 2020, component: 'Kit relação (corrente + pinhão + coroa)', intervalKm: 15000, intervalMonths: null, notes: 'DID, RK ou genérico de qualidade.', priority: 'HIGH', order: 8 },
  { modelName: '500 EFI', yearFrom: 2009, yearTo: 2020, component: 'Verificação do regulador/retificador (13,5-14,5V @ 3.000-4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Sistema elétrico com histórico de falhas, pior em clima úmido.', priority: 'CRITICAL', order: 9 },
  { modelName: '500 EFI', yearFrom: 2009, yearTo: 2020, component: 'Mangueiras de combustível — troca preventiva', intervalKm: null, intervalMonths: 24, notes: 'Item de segurança crítico.', priority: 'CRITICAL', order: 10 },
  { modelName: '500 EFI', yearFrom: 2009, yearTo: 2020, component: 'Inspeção de vedações de bengala e amortecedores traseiros', intervalKm: null, intervalMonths: 24, notes: 'Endurecem com a idade mesmo sem uso intenso.', priority: 'MEDIUM', order: 11 },

  // Classic 500 Chrome (edição mesclada)
  { modelName: 'Classic 500 Chrome', yearFrom: 2009, yearTo: 2020, component: 'Óleo 20W-50/15W-50 JASO MA (~2,75L)', intervalKm: 3500, intervalMonths: 6, notes: 'Mesma especificação da Classic 500 EFI — mecânica idêntica, muda o acabamento cromado.', priority: 'HIGH', order: 1 },
  { modelName: 'Classic 500 Chrome', yearFrom: 2009, yearTo: 2020, component: 'Vela WQR8DC (M14) ou UR6DC (M10) — gap 0,7-0,8mm', intervalKm: 9000, intervalMonths: null, notes: 'Confirme a rosca correta pelo ano.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Classic 500 Chrome', yearFrom: 2009, yearTo: 2020, component: 'Lubrificação da corrente (428/520 conforme ano)', intervalKm: 650, intervalMonths: null, notes: 'Folga 20-30mm.', priority: 'HIGH', order: 3 },
  { modelName: 'Classic 500 Chrome', yearFrom: 2009, yearTo: 2020, component: 'Folga de válvulas (adm ~0,10-0,15mm / esc ~0,20-0,25mm)', intervalKm: 6000, intervalMonths: 12, notes: 'Regulagem manual, motor frio.', priority: 'HIGH', order: 4 },
  { modelName: 'Classic 500 Chrome', yearFrom: 2009, yearTo: 2020, component: 'Fluido de freio DOT 4', intervalKm: 12000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 5 },
  { modelName: 'Classic 500 Chrome', yearFrom: 2009, yearTo: 2020, component: 'Verificação do regulador/retificador (13,5-14,5V @ 3.000-4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Ponto de falha elétrica documentado da linha UCE.', priority: 'CRITICAL', order: 6 },
  { modelName: 'Classic 500 Chrome', yearFrom: 2009, yearTo: 2020, component: 'Mangueiras de combustível — troca preventiva', intervalKm: null, intervalMonths: 24, notes: 'Item de segurança crítico.', priority: 'CRITICAL', order: 7 },
  { modelName: 'Classic 500 Chrome', yearFrom: 2009, yearTo: 2020, component: 'Inspeção e cuidado dos cromados (acabamento exclusivo desta edição)', intervalKm: null, intervalMonths: 6, notes: 'Cera protetora e lavagem regular — corrosão prematura é ponto fraco conhecido.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Classic 500 Chrome', yearFrom: 2009, yearTo: 2020, component: 'Kit relação (corrente + pinhão + coroa)', intervalKm: 15000, intervalMonths: null, notes: 'Genérico de qualidade atende bem.', priority: 'HIGH', order: 9 },

  // Continental 535 EFI
  { modelName: 'Continental 535 EFI', yearFrom: 2013, yearTo: 2018, component: 'Óleo 20W-50/15W-50 JASO MA (~2,5-2,75L)', intervalKm: 3500, intervalMonths: 6, notes: 'Motor UCE 535cc. Confirmar capacidade exata no manual — modelo de baixo volume, menos documentado.', priority: 'HIGH', order: 1 },
  { modelName: 'Continental 535 EFI', yearFrom: 2013, yearTo: 2018, component: 'Vela — confirmar modelo exato pelo ano (gap ~0,7-0,8mm)', intervalKm: 9000, intervalMonths: null, notes: 'Documentação pública específica escassa — confirme com mecânico especializado.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Continental 535 EFI', yearFrom: 2013, yearTo: 2018, component: 'Lubrificação da corrente', intervalKm: 650, intervalMonths: null, notes: 'Folga 20-30mm. Perfil de uso mais esportivo pode acelerar desgaste.', priority: 'HIGH', order: 3 },
  { modelName: 'Continental 535 EFI', yearFrom: 2013, yearTo: 2018, component: 'Folga de válvulas (adm ~0,10-0,15mm / esc ~0,20-0,25mm)', intervalKm: 6000, intervalMonths: 12, notes: 'Mesmo padrão de regulagem manual da linha UCE.', priority: 'HIGH', order: 4 },
  { modelName: 'Continental 535 EFI', yearFrom: 2013, yearTo: 2018, component: 'Corpo de injeção EFI Keihin — diagnóstico se luz acesa', intervalKm: 10000, intervalMonths: 12, notes: '100% EFI, sem versão carburada.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Continental 535 EFI', yearFrom: 2013, yearTo: 2018, component: 'Fluido de freio DOT 4', intervalKm: 12000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 6 },
  { modelName: 'Continental 535 EFI', yearFrom: 2013, yearTo: 2018, component: 'Verificação do regulador/retificador (13,5-14,5V @ 3.000-4.000 rpm)', intervalKm: null, intervalMonths: 12, notes: 'Mesmo histórico de falha elétrica da linha UCE.', priority: 'CRITICAL', order: 7 },
  { modelName: 'Continental 535 EFI', yearFrom: 2013, yearTo: 2018, component: 'Mangueiras de combustível — troca preventiva', intervalKm: null, intervalMonths: 24, notes: 'Item de segurança crítico.', priority: 'CRITICAL', order: 8 },
  { modelName: 'Continental 535 EFI', yearFrom: 2013, yearTo: 2018, component: 'Inspeção do escapamento duplo quanto a corrosão', intervalKm: null, intervalMonths: 6, notes: 'Formato cafe racer expõe mais o escapamento a respingos e sujeira.', priority: 'MEDIUM', order: 9 },
  { modelName: 'Continental 535 EFI', yearFrom: 2013, yearTo: 2018, component: 'Aperto de guidão clip-on, manetes e retrovisores', intervalKm: 5000, intervalMonths: 6, notes: 'Vibração afrouxa fixações mais rápido nesta configuração de guidão baixo.', priority: 'MEDIUM', order: 10 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Royal Enfield UCE legado (Bullet 500 / Classic 500 EFI / Continental 535 EFI)...')

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
        yearFrom: null,
        yearTo: null,
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

  console.log('✅ Royal Enfield UCE legado concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
