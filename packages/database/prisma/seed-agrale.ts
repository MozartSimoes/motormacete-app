/**
 * Seed Agrale — macetes, problemas crônicos, manutenção e calibragem de pneus
 * Cobre toda a linha de motocicletas Agrale (1984–1998)
 *
 * Fontes: Revista Moto.com.br, Motorium.com.br, FBM Motos, Pé no Barro,
 *         Mecânica Moto Show, Motos Clássicas 80, Moto Trilhas e Lama,
 *         Pequeñas Notáveis, Grands Motos, Moto Peças Agrale, Vedéra News
 *
 * Execute: pnpm --filter @motormacete/database db:seed:agrale
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput {
  severity: Sev
  title: string
  body: string
}

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

// ─── Dicas por modelo ─────────────────────────────────────────────────────────

const agraleTips: ModelBlock[] = [

  // ── SXT 16.5 (1984–1992) ────────────────────────────────────────────────────
  // Motor: monocilíndrico 2T a água 125cc, 16,5cv @ 8.000 rpm
  // Carburador: Dell'Orto | Ignição: CDI | Câmbio: 5 marchas, corrente
  // Pneus: 2.75-21 diant., 4.10-18 tras. | Freio diant.: disco | Peso: ~115 kg

  {
    modelName: 'SXT 16.5', yearFrom: 1984, yearTo: 1992,

    MACETES: [
      {
        severity: 'OK',
        title: 'Corrente O-ring triplica a vida útil em trilha',
        body: 'A corrente original sem retentor (428 simples) acumula areia e desgasta rapidamente em terrenos abrasivos. Substitua por corrente DID ou RK 428 com O-ring: o vedante mantém a graxa interna nos rolos e impede a entrada de areia. Expectativa de vida: 6.000–8.000 km vs 2.000–3.000 km da corrente simples. A relação original é pinhão 12 / coroa 38; para trilha técnica, suba a coroa para 44 dentes — mais tração, menos velocidade máxima.',
      },
      {
        severity: 'OK',
        title: 'Proteja o radiador com grade antes de qualquer trilha',
        body: 'O radiador da SXT 16.5 fica exposto às pedras e galhos. Uma pedra pequena perfura o radiador em segundos, causando perda total de arrefecimento. Instale uma grade de proteção (disponível em lojas de off-road ou adapte de alumínio) antes de qualquer trilha. Custo: R$ 80–R$ 200 artesanal. O superaquecimento por perda de líquido em trilha danifica o motor instantaneamente.',
      },
      {
        severity: 'OK',
        title: 'Filtre de ar lavável substitui o papel original com vantagem',
        body: 'O filtro de papel original está indisponível no mercado. Substitua por filtro de espuma (tipo UNI ou No-Toil): corte no tamanho correto, trate com óleo específico para filtro de espuma (levemente oleado — excesso entope o carburador). Lave com detergente neutro a cada 1.000 km em trilha, ou 3.000 km em estrada. Filtro sujo no motor 2T = mistura pobre = risco de fundição do pistão.',
      },
      {
        severity: 'WARN',
        title: 'Reservatório de óleo 2T: monitore antes de cada saída',
        body: 'A SXT 16.5 usa bomba de injeção automática de óleo 2T (não é pré-mistura). O reservatório lateral tem capacidade de ~500 mL. Se esvaziar enquanto a moto anda, o motor fica sem lubrificação em segundos — fundição garantida. Antes de cada saída, verifique o nível pela janela do reservatório. Em trilha longa, leve óleo 2T na mochila. Nunca misture ao tanque se acabar o reservatório — o sistema foi projetado para injeção, não pré-mistura.',
      },
      {
        severity: 'OK',
        title: 'Relação 12×44 para trilha técnica; 12×38 para estrada',
        body: 'A relação original 12×38 é equilibrada para uso misto. Para trilha técnica com obstáculos, suba para 12×44 ou 12×48: a moto ganha tração e controle de velocidade em subidas, ao custo de perder 15–20 km/h na velocidade máxima. A troca de coroa é rápida (3 parafusos). Coroas aftermarket DID ou Vaz Correntes ficam entre R$ 80–R$ 180.',
      },
      {
        severity: 'OK',
        title: 'Tire espelhos e plasticaria desnecessária para uso off-road',
        body: 'A SXT 16.5 de série tem espelhos, pisca-piscas e painel com tacômetro. Para uso off-road puro, retire tudo o que não é necessário: reduz ~3–4 kg e elimina pontos de quebra em quedas. O painel original com ponteiro de velocidade mecânico quebra facilmente com vibração — substitua por ciclocomputador digital (Garmin ou Cateye adaptado) ou simplesmente retire.',
      },
    ],

    PROBLEMAS: [
      {
        severity: 'DANGER',
        title: 'CDI integrado à bobina falha pelo calor — moto para após 20 min',
        body: 'O CDI integrado à bobina dos modelos 1984–1991 é altamente sensível ao calor. Sintoma clássico: moto anda normalmente até aquecer, depois morre repentinamente como se a ignição fosse cortada. Volta a funcionar após esfriar por 20–30 minutos. Diagnóstico: CDI deficiente ou bobina com enrolamento comprometido. Solução definitiva: CDI externo de outra moto da época (verificar compatibilidade com Yamaha DT 180 ou Honda ML 125) ou recondicionamento por eletrônico especializado em magnetos.',
      },
      {
        severity: 'DANGER',
        title: 'Superaquecimento: bomba d\'água e termostato são os pontos fracos',
        body: 'Nos modelos Série 1 (1984–1987), a vedação da bomba d\'água falha com frequência, causando perda gradual de líquido de arrefecimento sem alarme visível. Sintoma: motor aquece mais do que o normal, consumo de líquido aumenta. No estágio avançado: expansão de pistão, arranhão na camisa, motor travado. Verifique mensalmente o nível do reservatório de expansão. A Série 2 (1988+) tem vedação melhorada, mas a bomba ainda merece atenção.',
      },
      {
        severity: 'DANGER',
        title: 'Disco de freio dianteiro (Série 1) enferruja e empena — reposição difícil',
        body: 'Os discos dos modelos 1984–1987 foram fabricados com aço de baixa qualidade, propenso a ferrugem superficial e empenamento após uso intenso ou exposição à chuva. Disco empeno = freio pulsante e eficiência reduzida. Discos originais Agrale estão esgotados. Alternativas: discos universais de 240 mm com adaptação do cubo (usinagem necessária, R$ 300–R$ 600) ou discos de outras marcas com diâmetro compatível. A Série 2 (1988+) corrigiu esse problema.',
      },
      {
        severity: 'WARN',
        title: 'Peças praticamente inexistentes: produção encerrada em 1992',
        body: 'A Agrale encerrou a produção da SXT 16.5 em 1992. Peças originais de motor (pistão, anéis, válvula de exaustão 2T, bomba d\'água) estão esgotadas nos canais oficiais. A principal fonte é loja especializada motopecasagrale.com.br (PR). Pistão e anéis podem ter compatibilidade com modelos Cagiva 125 da mesma época (a Agrale tinha acordo técnico com a Cagiva). Filtre e conserve as peças que ainda tiver.',
      },
      {
        severity: 'WARN',
        title: 'Boia do carburador Dell\'Orto perfura com gasolina aditivada',
        body: 'A boia de plástico do carburador Dell\'Orto foi projetada para gasolina italiana pura. A gasolina brasileira com etanol degrada o plástico original, causando perfuração gradual. Sintoma: gasolina transbordando pelo overflow do carburador, consumo alto, afogamento do motor. Solução: substituir a boia por modelo de latão (duradouro) compatível com Dell\'Orto, disponível em lojas de carburador. Custo: R$ 40–R$ 80.',
      },
      {
        severity: 'WARN',
        title: 'Regulador de tensão frágil — bateria descarrega ou sobrecarrega',
        body: 'O regulador de tensão original tem vida útil curta. Falha em dois modos: 1) Subtensão — não carrega a bateria, moto para de partir elétrico progressivamente. 2) Sobretensão — carrega acima de 15V, queima lâmpadas e danifica bateria. Sintoma: bateria nova que descarrega em dias, ou lâmpadas fundindo frequentemente. Solução: regulador universal de 12V (R$ 80–R$ 200) encontrado em lojas de eletrônica para motos.',
      },
    ],

    MANUTENCAO: [
      {
        severity: 'OK',
        title: 'Óleo 2T: API TC no reservatório de injeção — troca do óleo do câmbio a cada 3.000 km',
        body: 'O motor 2T não tem troca de óleo convencional — o óleo de lubrificação é injetado automaticamente da bombinha e queimado no processo. O que precisa de troca é o ÓLEO DO CÂMBIO (caixa separada do motor): SAE 20W-40 SF ou equivalente, capacidade de ~700–800 mL. Troca a cada 3.000 km. Para o reservatório 2T, use óleo API TC ou JASO FB: Petronas 2T Mineral, Motul 510 2T ou similar. Nunca use óleo de motor 4T no reservatório 2T.',
      },
      {
        severity: 'OK',
        title: 'Vela de ignição: NGK B8ES, abertura 0,6 mm — troca a cada 5.000 km',
        body: 'Especificação: NGK B8ES (equivalente Bosch W5AC). Abertura do eletrodo: 0,6 mm (use calibrador de lâminas). Custo unitário: R$ 20–R$ 35. Em motor 2T, a vela trabalha com mais depósitos de óleo do que em motores 4T — inspecione a cada 2.500 km. Vela com eletrodo escuro e oleoso: mistura de óleo incorreta ou excesso de óleo na bomba. Vela com eletrodo branco ou erodido: mistura pobre, risco de superaquecimento do pistão.',
      },
      {
        severity: 'OK',
        title: 'Líquido de arrefecimento: água destilada + anticongelante — troca a cada 2 anos',
        body: 'Use mistura 50/50 de água destilada e anticongelante/anticorrosivo (Prestone, Wurth ou similar). NUNCA use apenas água comum: o sistema de arrefecimento é de alumínio e aço, e a água comum com pH neutro forma corrosão galvânica. Capacidade do sistema: ~700–900 mL. Troca a cada 2 anos — o anticongelante perde as propriedades anticorrosão com o tempo, mesmo sem vazamento.',
      },
      {
        severity: 'OK',
        title: 'Corrente: lubrificação a cada 500 km, tensão 20–30 mm de folga',
        body: 'Folga correta da corrente: 20–30 mm de jogo vertical no ponto central entre pinhão e coroa. Lubrificação: spray de corrente (Motul, Castrol, WD-40 Specialist) a cada 500 km — ou imediatamente após uso em lama ou chuva. Corrente seca range mais, aquece e se parte com cargas de impacto. Troca: a cada 6.000–8.000 km (corrente O-ring) ou 2.500–3.000 km (corrente simples).',
      },
      {
        severity: 'OK',
        title: 'Retentor de bengala: 35×8×11 mm — troca a cada 15.000 km ou ao notar vazamento',
        body: 'Medida do retentor (sealing de bengala dianteira): 35×8×11 mm — padrão Vedamotors ou SKF, disponível em qualquer loja de rolamentos. Sintoma de retentor vencido: mancha de óleo na parte inferior do tubo de mergulho, bengala "fia" óleo para fora. Com retentor furado, a bengala perde lubrificação interna e o tubo risca o interior do garfo — dano progressivo e caro. Troca simples: desmonta o garfo, empurra o retentor velho com um cano de PVC e pressiona o novo no lugar.',
      },
      {
        severity: 'WARN',
        title: 'Pastilha e disco de freio: verifique espessura mínima a cada 5.000 km',
        body: 'Pastilha mínima: 2 mm de material frenante (sem contar o metal base). Disco mínimo: 3,0 mm de espessura. Com menos que isso, o freio perde eficiência e o metal da pastilha risca o disco. Pastilhas compatíveis com Yamaha DT 200 (marca Fischer ou Ferodo) funcionam com adaptação mínima. Limpe o pistão do caliper com spray limpa-freio a cada 10.000 km para evitar travamento.',
      },
      {
        severity: 'OK',
        title: 'Bateria 12V 12Ah: teste de carga semestral — nunca deixe descarregar completamente',
        body: 'Especificação: 12V 12Ah selada (VRLA/AGM). Bateria descarregada completamente sofre sulfatação irreversível — mesmo após recarregar, a capacidade cai drasticamente. Se a moto ficar parada mais de 30 dias, desconecte o negativo ou use carregador de manutenção (float charger). Custo de substituição: R$ 120–R$ 220 (marca Moura, Heliar ou YTZ14S compatível).',
      },
    ],
  },

  // ── Elefant 16.5 (1984–1992) ────────────────────────────────────────────────
  // Mesma mecânica da SXT 16.5, diferença: tanque 16,1 L vs 11 L da SXT
  // Visual de "gran turismo" com carenagem e tanque estilo Cagiva Elefant original

  {
    modelName: 'Elefant 16.5', yearFrom: 1984, yearTo: 1992,

    MACETES: [
      {
        severity: 'OK',
        title: 'Tanque de 16 L: autonomia de ~300 km em estrada — ideal para viagem',
        body: 'A principal vantagem do Elefant sobre a SXT é o tanque de 16,1 L. Com consumo médio de 18–22 km/L em estrada, a autonomia chega a 290–350 km antes de abastecer. Para viagens, planeje paradas a cada 250 km para segurança. Em trilha, o consumo sobe para 12–15 km/L — autonomia cai para ~200 km. O peso do tanque cheio (~13 kg a mais que a SXT) eleva o centro de gravidade, mas a diferença em manejo é mínima.',
      },
      {
        severity: 'OK',
        title: 'Toda a mecânica da SXT 16.5 se aplica: mesmos cuidados, mesmas peças',
        body: 'O Elefant 16.5 compartilha 100% da mecânica com a SXT 16.5 — mesmo motor 125cc 2T a água, mesmo câmbio de 5 marchas, mesmo carburador Dell\'Orto, mesma ignição CDI, mesmos pneus 2.75-21/4.10-18. Toda manutenção, troca de vela (NGK B8ES), óleo do câmbio (SAE 20W-40) e problemas crônicos são idênticos. A diferença é apenas no tanque, painel e carenagem.',
      },
      {
        severity: 'WARN',
        title: 'Carenagem frágil em trilha — avalie remover para uso off-road',
        body: 'A carenagem lateral do Elefant é mais vulnerável em quedas e contato com galhos do que a SXT (que não tem carenagem). Para uso off-road intenso, considere remover as carenagens laterais: a moto fica mais leve e com visual mais robusto, e você preserva as peças de plástico que são impossíveis de encontrar originais. Sem a carenagem, o radiador fica mais exposto — instale grade de proteção.',
      },
      {
        severity: 'OK',
        title: 'Substitua o velocímetro mecânico por ciclocomputador digital',
        body: 'O velocímetro mecânico do Elefant (cabo flexível no eixo da roda) se danifica com vibração em trilha e com o tempo. Quando para de funcionar, o cabo roda solto e pode se enrolar em peças móveis. Remova o cabo e o velocímetro mecânico, instale um GPS portátil (Garmin eTrex) ou ciclocomputador sem fio com sensor de roda. Custo: R$ 80–R$ 250. Mais confiável e sem risco de prendimento de cabo.',
      },
    ],

    PROBLEMAS: [
      {
        severity: 'DANGER',
        title: 'CDI falha pelo calor — sintoma idêntico à SXT 16.5',
        body: 'O CDI integrado à bobina é o mesmo da SXT 16.5 e tem a mesma falha: para de funcionar quando aquece, retoma quando esfria. Todos os detalhes e soluções são iguais ao da SXT 16.5. Se você comprar um Elefant 1984–1991, preveja substituição do CDI como primeira intervenção.',
      },
      {
        severity: 'DANGER',
        title: 'Perda de líquido de arrefecimento sem vazamento visível — bomba d\'água',
        body: 'O reservatório de expansão do Elefant 16.5 fica próximo à carenagem e é difícil de visualizar sem remover a lateral. Muitos proprietários só percebem a falta de líquido quando o motor já está superaquecendo. Hábito obrigatório: a cada semana, remova a carenagem lateral e verifique o nível do reservatório de expansão. Se o nível baixar sem vazamento visível externo, a bomba d\'água está com a vedação comprometida.',
      },
      {
        severity: 'WARN',
        title: 'Plásticos da carenagem quebradiços — impossível comprar originais',
        body: 'As peças de plástico do Elefant (carenagem lateral, defletor, guarda-lama dianteiro) foram moldadas em ABS de baixa qualidade e estão completamente indisponíveis no mercado. Peças originais aparecem apenas em leilões e desmontadoras. Alternativa: fibra de vidro artesanal ou impressão 3D de partes menores. Evite quedas com a moto estocada com a carenagem, pois o plástico vitrifica com o tempo e quebra com impacto mínimo.',
      },
      {
        severity: 'WARN',
        title: 'Boia do carburador perfura com etanol — sintoma de afogamento',
        body: 'Mesma falha da SXT 16.5: boia de plástico do Dell\'Orto se degrada com a gasolina brasileira. Solução: boia de latão compatível. Adicionalmente, se a moto ficar parada por mais de 30 dias, drene o carburador pelo parafuso de drenagem — a gasolina com etanol deixa verniz que entope o piloto de marcha lenta.',
      },
    ],

    MANUTENCAO: [
      {
        severity: 'OK',
        title: 'Toda manutenção é idêntica à SXT 16.5 — mesmos intervalos e especificações',
        body: 'Vela NGK B8ES (0,6 mm), óleo do câmbio SAE 20W-40 a cada 3.000 km, líquido de arrefecimento a cada 2 anos, corrente lubrificada a cada 500 km, retentor de bengala 35×8×11 mm. Consulte as dicas de manutenção da SXT 16.5 — tudo é aplicável ao Elefant.',
      },
      {
        severity: 'WARN',
        title: 'Drene o tanque de 16 L se a moto ficar parada por mais de 30 dias',
        body: 'Com 16 litros de gasolina com etanol estagnada, a taxa de degradação do combustível é relevante. Após 30–45 dias parado, a gasolina perde octanagem e forma ácidos que corrompem borrachas do carburador e do tanque. Drene pelo torneira de gasolina (se existir) ou pelo próprio carburador. Se não for possível drenar, adicione estabilizador de combustível (Sta-Bil ou equivalente) antes de guardar.',
      },
      {
        severity: 'OK',
        title: 'Inspecione fixações da carenagem a cada 3.000 km — vibração solta parafusos',
        body: 'As fixações de plástico da carenagem do Elefant são sensíveis à vibração constante do motor 2T. Parafusos e presilhas se soltam gradualmente. Carenagem solta bate nos componentes internos e trinca. A cada 3.000 km, verifique todos os fixadores de carenagem e cabeçalhos de borracha. Use Loctite 243 (média fixação) nos parafusos de aço para evitar desaperto por vibração.',
      },
    ],
  },

  // ── SXT 27.5 (1985–1997) ────────────────────────────────────────────────────
  // Motor: monocilíndrico 2T a água 190cc (67×54 mm), 27,5cv @ 8.000 rpm
  // Carburador: Dell'Orto 25 mm | Câmbio: 6 marchas | Pneus: 3.00-21 / 4.00-17
  // Monoamortecedor traseiro | Freio diant.: disco | Peso: ~118 kg

  {
    modelName: 'SXT 27.5', yearFrom: 1985, yearTo: 1997,

    MACETES: [
      {
        severity: 'OK',
        title: 'Motor 2T a água de 190cc: o mais potente da linha Agrale e um dos mais fortes do mercado nacional nos anos 80',
        body: 'O motor 2T de 190cc da SXT 27.5 produzia 27,5cv, superando motos 4T como a Honda XLX 250R (18cv) e empatando com a Yamaha DT 200 em potência relativa. A vantagem do 2T: peso muito menor por cv gerado, resposta explosiva no acelerador e som característico. A desvantagem: exige maior atenção à lubrificação (bomba de óleo 2T) e ao arrefecimento (sistema a água essencial).',
      },
      {
        severity: 'OK',
        title: 'Aro 17 traseiro: pneus mais fáceis de encontrar que o 18" das outras motos da época',
        body: 'O aro traseiro 17" da SXT 27.5 foi uma escolha inteligente: pneus 4.00-17 são bem mais fáceis de encontrar hoje do que os 4.10-18 da Dakar/Elefant. Marcas como Pirelli MT60, Metzeler Enduro 3 e Shinko 244 estão disponíveis nessa medida. Para uso misto estrada/trilha, o Pirelli MT60 na medida 4.00-17 é a escolha mais equilibrada e de fácil acesso.',
      },
      {
        severity: 'OK',
        title: 'Corrente O-ring obrigatória: com 27,5cv, a corrente simples não dura 3.000 km',
        body: 'Com a potência do motor 190cc e o uso em trilha, a corrente simples sem retentor dura no máximo 2.500–3.000 km antes de precisar de troca. Invista em corrente DID ou RK 428 com O-ring: dura 8.000–12.000 km com manutenção correta. Relação original: pinhão 12 / coroa 38. Para off-road, use coroa 44 ou 48 dentes. Tensão correta: 20–30 mm de folga no ponto central.',
      },
      {
        severity: 'OK',
        title: 'Monoamortecedor traseiro: verifique a pressão do gás semestralmente',
        body: 'A SXT 27.5 foi uma das primeiras motos nacionais com monoamortecedor traseiro (sistema monoshock). O gás pressurizado interno mantém a rigidez de resposta. Após 8–10 anos, o gás vaza e o amortecedor perde a característica "progressiva" — a moto fica com traseira mole e instável em saltos. Alternativas de substituição: YSS ou KYB de diâmetro compatível (ou substituição custom em loja especializada).',
      },
      {
        severity: 'OK',
        title: 'Furar a caixa de filtro de ar (somente na parte superior) melhora resposta',
        body: 'Um macete clássico dos agraleiros: fazer 4–6 furos de 10 mm na parte SUPERIOR da caixa do filtro de ar. Isso aumenta o volume de ar disponível para o carburador sem risco de ingestão de água em travessias (os furos ficam acima da linha d\'água). O ganho de potência é perceptível especialmente acima de 5.000 RPM. Regule o carburador levemente mais rico após a modificação.',
      },
      {
        severity: 'WARN',
        title: 'Travessias de rio: nunca ultrapasse 60 cm de profundidade',
        body: 'O carburador Dell\'Orto e o filtro de ar da SXT 27.5 não são selados. Em travessias profundas, a água entra no carburador e na admissão, causando hidravlock (motor trava com água na câmara de combustão). Trava hidráulica em motor 2T geralmente quebra biela ou pistão — dano fatal. Antes de qualquer travessia, avalie a profundidade. Se necessário, sele a caixa de ar com fita temporária antes da travessia.',
      },
    ],

    PROBLEMAS: [
      {
        severity: 'DANGER',
        title: 'CDI falha com calor — mesmo problema da linha 16.5, agravado pelo motor maior',
        body: 'O CDI da SXT 27.5 é o mesmo integrado à bobina da linha 16.5. Com o motor 190cc gerando mais calor, a falha por temperatura é ainda mais frequente. Sintoma: moto para após 20–30 min de uso, volta ao esfriar. Solução: instalar CDI externo (caixa separada) em local ventilado, longe do cilindro. CDI da Yamaha DT 180 pode ser adaptado em alguns casos — consulte mecânico especialista em Agrale.',
      },
      {
        severity: 'DANGER',
        title: 'Superaquecimento com bomba d\'água falha é mais rápido que nos 125cc',
        body: 'O motor 190cc gera mais calor e o tempo de superaquecimento sem arrefecimento é muito menor — menos de 5 minutos com a bomba parada ou sem líquido. A vedação da bomba d\'água (retentores) falha entre 20.000–40.000 km. Sintoma: consumo de líquido sem vazamento externo visível + motor ficando mais quente que o normal. Verifique o reservatório de expansão semanalmente. Nunca desligue o motor em crise de calor — deixe o ventilador trabalhar.',
      },
      {
        severity: 'WARN',
        title: 'Pistão e anéis desgastados após 20.000 km em uso intenso',
        body: 'Motor 2T de alta performance tem vida útil do pistão menor que motores 4T. Após 20.000–25.000 km de uso intenso (trilha), o pistão e os anéis apresentam desgaste que causa perda de compressão, fumaça excessiva e dificuldade de partida. A medição de compressão (manômetro) denuncia o estado: abaixo de 8 bar = pistão desgastado. Kit pistão + anéis é a peça mais crítica — se não encontrar específica Agrale, busque compatibilidade com Cagiva 190.',
      },
      {
        severity: 'WARN',
        title: 'Agulha do carburador Dell\'Orto 25mm desgasta após 20.000 km',
        body: 'A agulha de aceleração do carburador Dell\'Orto 25 mm desgasta o furo do corpo com o uso, causando mistura excessivamente rica entre 1/4 e 3/4 de abertura do acelerador. Sintomas: consumo alto, fumaça mais carregada, vela sujando rápido. A troca da agulha e do corpo do carburador resolve — ou limpeza ultrassônica + agulha nova. Custo de recondicionamento Dell\'Orto: R$ 200–R$ 400 em especialistas.',
      },
      {
        severity: 'WARN',
        title: 'Monoamortecedor traseiro sem regeneração disponível — substitua por similar',
        body: 'O monoamortecedor traseiro original da SXT 27.5 perdeu o gás interno após décadas. Serviços de regeneração de amortecedor (recarga de gás) não encontram vedações originais específicas. A opção é substituição por YSS ou KYB de medida compatível — levar a moto ao especialista para medir e selecionar. Custo: R$ 300–R$ 700 instalado. Nunca instale extensores de amortecedor — danificam a estrutura e alteram geometria.',
      },
    ],

    MANUTENCAO: [
      {
        severity: 'OK',
        title: 'Vela NGK B8ES, abertura 0,6 mm — troca a cada 5.000 km',
        body: 'Mesma vela da linha 16.5. O motor 190cc 2T trabalha em regime mais alto de temperatura e a vela dura entre 4.000–6.000 km dependendo do uso. Em trilha intensa, inspecione a cada 2.500 km. Vela NGK B8ES: R$ 20–R$ 35. Compre 2 de reserva para longas trilhas — troca rápida de vela resolve muitos problemas no campo.',
      },
      {
        severity: 'OK',
        title: 'Óleo do câmbio: SAE 20W-40 SF, ~750 mL — troca a cada 3.000 km',
        body: 'O câmbio de 6 marchas tem compartimento separado do motor 2T. Capacidade: ~750–800 mL de SAE 20W-40 SF. Troca a cada 3.000 km ou ao notar que o câmbio engata com mais dificuldade (especialmente 1ª e 2ª). No dreno, se o óleo sair com partículas metálicas prateadas em excesso, avalie a caixa de câmbio com mecânico especializado.',
      },
      {
        severity: 'OK',
        title: 'Líquido de arrefecimento: mistura 50/50 água destilada + anticorrosivo — troca a cada 2 anos',
        body: 'Sistema de arrefecimento do motor 190cc tem capacidade de ~900–1.100 mL. Use anticongelante/anticorrosivo de boa qualidade (Prestone, Wurth). NUNCA use água pura: o bloco de alumínio sofre corrosão eletroquímica com água sem tratamento. Verifique visualmente o reservatório a cada semana. Troca completa a cada 2 anos: drene pelo bujão inferior do radiador, lave com água destilada, reabasteça com a mistura.',
      },
      {
        severity: 'OK',
        title: 'Filtro de ar: limpe a cada 1.000 km (trilha) ou 3.000 km (estrada)',
        body: 'Filtro de espuma substituindo o papel original (indisponível): lave com detergente neutro, enxague, seque completamente e aplique óleo de filtro de espuma levemente. Um filtro saturado de poeira faz o motor rodar rico (fumaça preta) e aumenta desgaste do pistão. Em trilha de areia fina, verifique o filtro diariamente.',
      },
      {
        severity: 'WARN',
        title: 'Limpeza do carburador Dell\'Orto 25mm: a cada 2 anos ou ao notar falhas',
        body: 'O carburador Dell\'Orto 25mm acumula verniz de gasolina envelhecida nos jatos e no piloto de marcha lenta. Limpeza ultrassônica em especialista de carburador: R$ 150–R$ 300. Limpeza manual: desmonte o carburador, mergulhe as peças de metal em limpa-carburador por 30 min, use agulha fina para limpar jatos. Nunca use arame nos jatos — alarga o orifício e desregula a mistura permanentemente.',
      },
      {
        severity: 'OK',
        title: 'Retentor de bengala: 35×8×11 mm — inspecione a cada 10.000 km',
        body: 'Mesmo retentor da linha 16.5 (35×8×11 mm, Vedamotors ou SKF). Com o motor mais pesado e potente, a bengala trabalha mais. Inspecione a cada 10.000 km. Fita de papel absorvente enrolada na bengala por uma semana revela vazamento micro — se manchar de óleo, troque.',
      },
    ],
  },

  // ── Elefant 27.5 (1985–1997) ────────────────────────────────────────────────
  // Mesma mecânica da SXT 27.5, tanque 16,1 L vs 10,5 L

  {
    modelName: 'Elefant 27.5', yearFrom: 1985, yearTo: 1997,

    MACETES: [
      {
        severity: 'OK',
        title: 'Tanque 16 L + motor 190cc: autonomia de ~280 km em estrada com potência trail',
        body: 'O Elefant 27.5 combina o maior tanque da linha (16,1 L) com o motor mais potente das trilhas nacionais dos anos 80. Em estrada, o consumo é de 17–21 km/L, dando autonomia real de 270–330 km. Em trilha técnica, o consumo sobe para 13–16 km/L. O tanque grande compensa em viagens longas, mas adiciona ~5 kg de peso extra quando cheio — perceba a diferença no manejo.',
      },
      {
        severity: 'OK',
        title: 'Toda a mecânica da SXT 27.5 se aplica com a mesma prioridade',
        body: 'Motor, câmbio, carburador, ignição, suspensão e freios são idênticos à SXT 27.5. As diferenças são apenas estéticas (tanque maior, visual distinto). Toda manutenção e problemas crônicos descritos na SXT 27.5 valem igualmente para o Elefant.',
      },
      {
        severity: 'WARN',
        title: 'Peso do tanque cheio (~13 kg a mais) eleva centro de gravidade — cuidado em trilha',
        body: 'A diferença entre tanque vazio e cheio de 16 L é de ~11–12 kg posicionados na parte alta da moto. Em trilha técnica com o tanque cheio, a moto parece mais pesada e instável em curvas lentas e cambalhota de solo. Para trilha técnica curta, abasteça menos (6–8 L) e complete ao final. Mantenha o foco no equilíbrio, especialmente nas primeiras horas de uso com o tanque cheio.',
      },
    ],

    PROBLEMAS: [
      {
        severity: 'DANGER',
        title: 'Mesmos problemas da SXT 27.5 — CDI, bomba d\'água e pistão',
        body: 'O Elefant 27.5 compartilha 100% da mecânica com a SXT 27.5. CDI que falha pelo calor, bomba d\'água com vedação frágil, desgaste de pistão após 20.000 km — todos os problemas crônicos são os mesmos. Consulte as fichas da SXT 27.5 para detalhes completos.',
      },
      {
        severity: 'WARN',
        title: 'Vazamento no bocal do tanque de 16 L com vedação envelhecida',
        body: 'O bocal de abastecimento e as conexões do tanque grande do Elefant têm vedações de borracha que endurecem com o tempo (especialmente com etanol). Sintoma: cheiro de gasolina após abastecimento, mancha no solo após pernoite. Troque as vedações de borracha do bocal e das conexões com mangueiras. Se o tanque tiver ferrugem interna, trate com produto específico (KBS Coatings ou similar) antes de usar.',
      },
    ],

    MANUTENCAO: [
      {
        severity: 'OK',
        title: 'Toda manutenção é idêntica à SXT 27.5',
        body: 'Vela NGK B8ES (0,6 mm), câmbio SAE 20W-40 a cada 3.000 km, líquido de arrefecimento a cada 2 anos, corrente lubrificada a cada 500 km, retentor de bengala 35×8×11 mm. Consulte as fichas de manutenção da SXT 27.5.',
      },
      {
        severity: 'OK',
        title: 'Drene o tanque de 16 L antes de guardar a moto por mais de 30 dias',
        body: 'Com 16 L de gasolina estagnada, a degradação do combustível é um problema relevante. Após 30–45 dias, a gasolina brasileira com etanol deteriora vedações e deixa verniz nos jatos do carburador. Drene o tanque e o carburador antes de guardar. Se não for possível, adicione estabilizador de combustível (Sta-Bil ou Motul Fuel Stabilizer).',
      },
    ],
  },

  // ── Dakar 30.0 (1985–1997) ──────────────────────────────────────────────────
  // Motor: monocilíndrico 2T a água 190cc, 30cv @ 8.250 rpm, pinça Brembo
  // Tanque: 18 L | Vel. máx: 137 km/h | 0-100: 8,3 s | Peso: 130 kg

  {
    modelName: 'Dakar 30.0', yearFrom: 1985, yearTo: 1997,

    MACETES: [
      {
        severity: 'OK',
        title: 'A moto trail mais rápida fabricada no Brasil nos anos 80: 137 km/h com 30cv',
        body: 'O Dakar 30.0 bateu recordes de performance para uma trail nacional: 137 km/h de velocidade máxima, 0–100 km/h em 8,3 segundos e pinça de freio Brembo de série. Para referência, a Honda XLX 250R chegava a ~130 km/h com 18cv. O motor 2T 190cc a água gerava mais de 1cv/kg, tornando a moto excepcionalmente ágil para seu peso de 130 kg.',
      },
      {
        severity: 'OK',
        title: 'Pinça Brembo: mantenha o pistão limpo para desempenho máximo',
        body: 'A pinça Brembo é um diferencial de qualidade, mas exige cuidado específico: o pistão único de grande diâmetro tende a travar se a moto ficar parada por mais de 2 semanas sem uso. Para evitar: a cada 2 semanas de parada, pressione levemente o freio algumas vezes para movimentar o pistão. Limpe o pistão e o canal de poeira com spray limpa-freio a cada 10.000 km. Graxa de silicone (não graxa comum) na borracha vedante do pistão.',
      },
      {
        severity: 'OK',
        title: 'Tanque de 18 L: a maior autonomia da linha — ~320 km em estrada',
        body: 'Com o maior tanque entre os modelos Agrale (18 L) e consumo de ~18 km/L em estrada, o Dakar tem autonomia real de 300–320 km. Esse tanque grande foi pensado para viagens longas e provas de enduro. Em trilha pesada, a autonomia cai para ~220–250 km (consumo de 12–14 km/L). O peso do tanque cheio (~15 kg) é distribuído baixo no quadro, ajudando o centro de gravidade.',
      },
      {
        severity: 'OK',
        title: 'O 6ª marcha é útil para autovia: use entre 90–120 km/h para economizar',
        body: 'O câmbio de 6 marchas do Dakar tem uma 6ª relação projetada para cruzeiro em velocidade. Entre 90–120 km/h na 6ª, o motor trabalha em RPM mais confortável (7.000–7.500 RPM), economizando combustível e reduzindo desgaste do motor. Abaixo de 80 km/h, volte para a 5ª — o motor 2T perde eficiência abaixo do RPM de potência.',
      },
      {
        severity: 'WARN',
        title: 'Com 137 km/h de pico, controle o entusiasmo — pneus trail não são rodoviários',
        body: 'Os pneus 2.75-21 dianteiro e 4.10-18 traseiro do Dakar são desenvolvidos para uso misto. Em asfalto a alta velocidade (acima de 100 km/h), o perfil mais alto e o composto mais macio dos pneus trail têm comportamento menos preciso que pneus rodoviários. Mantenha a pressão correta (21/26 psi em estrada) e evite freadas bruscas em alta velocidade. Com pneus desgastados, o limite de velocidade segura cai significativamente.',
      },
    ],

    PROBLEMAS: [
      {
        severity: 'DANGER',
        title: 'CDI falha com calor — o Dakar gera mais calor que todos os outros modelos Agrale',
        body: 'Com 30cv e compressão 6,7:1 (a mais alta da linha), o motor do Dakar gera mais calor que os demais modelos. O CDI integrado à bobina falha mais cedo e mais frequentemente. Em dias quentes ou trilha intensa, a falha por temperatura pode ocorrer em menos de 15 minutos. Prioridade máxima: instale CDI externo em local ventilado e protegido de calor. Essa modificação aumenta a confiabilidade dramaticamente.',
      },
      {
        severity: 'DANGER',
        title: 'Pinça Brembo com pistão travado: freio eficaz vira risco',
        body: 'A pinça Brembo é um trunfo quando funciona, mas quando o pistão trava (por oxidação ou falta de uso), o freio dianteiro pode enganchar abruptamente, causando queda. Em motos que ficaram paradas por anos, o pistão da Brembo geralmente está travado. Antes de rodar com uma Dakar após longa parada, verifique o funcionamento do freio a baixa velocidade em local seguro. Recondicionamento do caliper Brembo: R$ 200–R$ 400.',
      },
      {
        severity: 'WARN',
        title: 'Disco de freio 2.75-21 com tendência a empeno em off-road intenso',
        body: 'O disco dianteiro do Dakar sofre stress térmico elevado: pista de enduro combina frenagens fortes e imersão em travessias. O ciclo calor-frio rápido pode empenar o disco. Sintoma: vibração rítmica na manete ao frear. Discos empenados além de 0,3 mm devem ser substituídos (não retificados — perde espessura mínima). Evite freadas fortes imediatamente antes de travessias de rio.',
      },
      {
        severity: 'WARN',
        title: 'Bomba d\'água com vedação fraca — o Dakar é ainda mais vulnerável',
        body: 'O motor do Dakar, operando a temperaturas maiores pelo maior nível de compressão, acelera o desgaste das vedações da bomba d\'água. Monitoramento semanal do líquido de arrefecimento é obrigatório. Qualquer queda de nível sem causa externa = bomba d\'água com vedação comprometida. Intervenção imediata.',
      },
      {
        severity: 'WARN',
        title: 'Peças originais do Dakar mais raras que os modelos 27.5',
        body: 'Por ter sido produzido em menor volume e posicionado como produto de alta performance, as peças específicas do Dakar (pistão 6,7:1, disco traseiro, componentes da pinça Brembo) são mais raras que as do SXT 27.5. Dedique esforço extra a encontrar peças antes de precisar. A loja motopecasagrale.com.br (PR) tem o maior estoque conhecido de peças Agrale, incluindo Dakar.',
      },
    ],

    MANUTENCAO: [
      {
        severity: 'OK',
        title: 'Vela NGK B8ES, abertura 0,6 mm — inspecione a cada 2.500 km no Dakar',
        body: 'O Dakar trabalha com compressão e temperatura mais alta. A vela pode se desgastar mais rápido — inspecione a cada 2.500 km e troque a cada 4.000–5.000 km. Uma vela em bom estado é essencial para partida fácil e funcionamento correto da ignição CDI. Leve sempre uma vela de reserva na ferramenta de bordo.',
      },
      {
        severity: 'OK',
        title: 'Câmbio: SAE 20W-40 SF, 750–800 mL — troca a cada 3.000 km',
        body: 'Câmbio de 6 marchas separado do motor 2T. Mesmas especificações do SXT 27.5. Atenção extra: se após a troca de óleo aparecerem partículas metálicas douradas (bronze) no dreno, a caixa de câmbio tem desgaste nos sincronizadores — avalie com mecânico.',
      },
      {
        severity: 'OK',
        title: 'Fluido de freio DOT 4 na pinça Brembo: troca a cada 2 anos',
        body: 'A pinça Brembo exige DOT 4 — nunca DOT 3 (ponto de ebulição inadequado para a performance do Dakar). O fluido absorve umidade ao longo do tempo, abaixando o ponto de ebulição. Em frenagens repetidas em descidas longas, fluido velho pode "ferver" e causar freio esponjoso. Troca a cada 2 anos com sangria completa do sistema. Fluido DOT 4: R$ 30–R$ 60 por embalagem.',
      },
      {
        severity: 'OK',
        title: 'Lubrificação das articulações do sistema de suspensão traseira: a cada 5.000 km',
        body: 'O sistema de bieletas traseiro do Dakar tem múltiplos pontos de articulação com buchas e rolamentos. Esses pontos ressecam com o tempo e a sujeira de trilha penetra, causando desgaste acelerado. A cada 5.000 km, aplique graxa multiuso (Graxix, Mobil XHP 222) com biqueira de graxa em todos os pontos de pivô do sistema traseiro. Articulações secas e sujas fazem a moto "estalar" em terreno irregular.',
      },
    ],
  },

  // ── SXT 27.5 E / Explorer (1988–1995) ───────────────────────────────────────
  // Versão enduro de fábrica, sem faróis/pisca/bateria — pré-mistura 1:50 (sem bomba)
  // 9 kg mais leve | Relação original 12:38 | Pneus knobby de fábrica

  {
    modelName: 'SXT 27.5 E', yearFrom: 1988, yearTo: 1995,

    MACETES: [
      {
        severity: 'DANGER',
        title: 'PRÉ-MISTURA OBRIGATÓRIA: esta versão não tem bomba de óleo automática',
        body: 'A SXT 27.5 E (Explorer) foi despojada da bomba de injeção automática de óleo para reduzir peso. OBRIGATÓRIO: misturar óleo 2T diretamente na gasolina em toda abastecimento. Proporção: 1:50 (20 mL de óleo API TC por litro de gasolina) com óleo sintético de qualidade (Motul 710 2T, Ipone Samourai). Usando óleo mineral, use 1:40 (25 mL/L). NUNCA abasteça sem óleo 2T: fundição do pistão em minutos. Deixar uma nota no bocal do tanque é boa prática.',
      },
      {
        severity: 'OK',
        title: 'Com 9 kg a menos que a SXT 27.5, o comportamento off-road melhora significativamente',
        body: 'A versão E (Explorer) pesa ~106 kg seco — 9 kg menos que a SXT 27.5 padrão. Essa diferença é enorme em trilha técnica: subidas mais fáceis, manobras mais precisas, menor fadiga do piloto. A ausência de bateria, farois e acessórios elétricos simplifica a manutenção. Para uso exclusivamente off-road, a versão E é a melhor escolha da linha Agrale.',
      },
      {
        severity: 'OK',
        title: 'Proporção de mistura 1:50 com óleo sintético: evite excesso de óleo',
        body: 'Excesso de óleo na pré-mistura (1:30 ou mais rico) causa carbonização excessiva da câmara de combustão, do escape e da vela — a moto afoga e perde potência. A falta de óleo (1:70 ou mais magro) causa fundição. Com óleo sintético de qualidade, 1:50 é suficiente. Meça sempre com copo medidor — não "no olho". Misture o óleo antes de abrir a tampa do tanque: coloque o óleo primeiro, depois a gasolina para misturar automaticamente no fluxo.',
      },
      {
        severity: 'OK',
        title: 'Relação 12:44 para trilha técnica — mesma lógica das outras versões',
        body: 'A versão E vem de fábrica com relação 12:38, mas para trilha técnica intensa, a coroa 44 ou 48 dentes melhora muito a tração em subidas e a controlabilidade em obstáculos. A ausência de bateria (sem partida elétrica) não afeta a troca de coroa. Escolha a relação de acordo com o terreno predominante.',
      },
    ],

    PROBLEMAS: [
      {
        severity: 'DANGER',
        title: 'Esquecer a pré-mistura ao abastecer é o erro fatal mais comum',
        body: 'Mecânicos especializados em Agrale relatam que a fundição por esquecimento da pré-mistura é a causa número 1 de destruição de motores na versão E. O motor funciona normalmente por 10–15 minutos, aquece progressivamente, as paredes do cilindro começam a riscar e o pistão trava. Em alguns casos, o travamento acontece em segundos após a lubrificação ser insuficiente. Crie uma rotina inquebrável: óleo antes de qualquer abastecimento.',
      },
      {
        severity: 'WARN',
        title: 'CDI sem bateria: ignição estritamente por magneto',
        body: 'A versão E não tem bateria. A ignição funciona exclusivamente pelo magneto-volante. Se o magneto apresentar desgaste nos polos ou arames oxidados, a faísca enfraquece. Sintoma: dificuldade de partida a kick, partida somente em alta rotação de acionamento, funcionamento irregular a baixo RPM. O magneto da versão E é a mesma peça das outras Agrales 2T — pesquise em especialistas em eletrônica de motos.',
      },
      {
        severity: 'WARN',
        title: 'Vela suja rapidamente se a proporção de mistura estiver errada',
        body: 'A vela é o termômetro da pré-mistura na versão E. Vela preta e oleosa = muito óleo (enriqueça menos) ou óleo de qualidade ruim. Vela branca ou cinza claro = pouco óleo (perigo de fundição!) ou mistura muito magra. A cor ideal: cinza médio a marrom claro. Se a vela sujar em menos de 2.000 km, revise a proporção de mistura e a qualidade do óleo 2T.',
      },
    ],

    MANUTENCAO: [
      {
        severity: 'WARN',
        title: 'Pré-mistura: meça sempre, documente a proporção e use óleo API TC ou JASO FB',
        body: 'Proporção obrigatória: 1:50 com óleo sintético API TC. Proporção com mineral: 1:40. Use copo medidor graduado. Recomendados: Motul 710 2T, Ipone Samourai, Petronas Syntium 2T. Evite óleos de baixa qualidade: alto teor de cinzas = depósitos na câmara e no escape = perda de performance. Troque a vela quando mudar de marca ou proporção de óleo para avaliar a queima.',
      },
      {
        severity: 'OK',
        title: 'Câmbio: SAE 20W-40, ~700 mL — a única troca de fluido periódica da versão E',
        body: 'Sem bateria e sem bomba de óleo 2T para verificar, o câmbio é o único fluido de troca periódica da versão E. Troca a cada 3.000 km. Dreno abaixo do câmbio, bujão de nível lateral. Volume: ~700 mL. Use SAE 20W-40 SF ou equivalente.',
      },
      {
        severity: 'OK',
        title: 'Vela NGK B8ES: inspecione a cada 2.000 km na versão de pré-mistura',
        body: 'Em motores 2T de pré-mistura, a vela trabalha em condição mais exigente que na versão com bomba automática. Inspecione a cada 2.000 km, troque a cada 4.000 km ou ao notar mudança de coloração. Gap: 0,6 mm.',
      },
      {
        severity: 'OK',
        title: 'Líquido de arrefecimento: mesma especificação da versão padrão — troca a cada 2 anos',
        body: 'Apesar do despojamento de acessórios, a versão E mantém o sistema de arrefecimento a água completo. Use mistura 50/50 água destilada + anticongelante. Verifique o nível do reservatório antes de cada saída. Troca a cada 2 anos.',
      },
    ],
  },

  // ── SXT 27.5 EX (1992–1997) ─────────────────────────────────────────────────
  // Versão enduro mais equipada: disco traseiro, monoamortecedor a gás, aro 17 traseiro
  // Pneu traseiro 4.00-17 (vs 4.10-18 dos outros modelos)

  {
    modelName: 'SXT 27.5 EX', yearFrom: 1992, yearTo: 1997,

    MACETES: [
      {
        severity: 'OK',
        title: 'Freio a disco traseiro é diferencial raro nas trails dos anos 90 — mantenha o pistão funcionando',
        body: 'A SXT 27.5 EX foi uma das poucas trails nacionais com freio a disco traseiro de série. Em trilha, o disco traseiro oferece modulação muito superior ao tambor. O pistão do caliper traseiro tende a enferrujar em motocicletas paradas: a cada mês de inatividade, acione o freio traseiro algumas vezes e verifique que o pistão se move livremente. Limpeza semestral com limpa-freio e graxa de silicone.',
      },
      {
        severity: 'OK',
        title: 'Monoamortecedor a gás pressurizado: a melhor suspensão traseira da linha Agrale',
        body: 'O monoamortecedor pressurizado da EX oferece resposta mais progressiva e menos dive em saltos que o amortecedor convencional da SXT 27.5 padrão. Mantenha o preload ajustado para o seu peso: pilotos abaixo de 75 kg, use ajuste mínimo; acima de 85 kg, ajuste máximo. Em saltos com a moto carregada (mochila + proteções), suba o preload 1–2 cliques.',
      },
      {
        severity: 'OK',
        title: 'Aro traseiro 17": acesso a pneus modernos de trilha na medida 4.00-17',
        body: 'O aro 17" traseiro da EX facilita encontrar pneus modernos de alta performance: Pirelli Scorpion MX, Metzeler MCE, Michelin Starcross disponíveis em 4.00-17. Evite usar pneus de scooter 17" (perfil completamente diferente): use pneus trail ou dual-sport com perfil adequado para off-road.',
      },
      {
        severity: 'OK',
        title: 'Reservatório de expansão separado: mantenha pressurizado e sem trincas',
        body: 'A EX tem reservatório de expansão do líquido de arrefecimento separado (inovação na linha). Esse reservatório plástico tende a desenvolver trincas pela vibração do motor 2T ao longo dos anos. Uma trinca causa perda contínua de líquido de arrefecimento e superaquecimento. Inspecione visualmente a cada semana. Em caso de trinca, um produto de vedação tipo K-Seal pode ser uma solução temporária — troque o reservatório assim que possível.',
      },
    ],

    PROBLEMAS: [
      {
        severity: 'WARN',
        title: 'Disco e pistão do freio traseiro: peças originais indisponíveis',
        body: 'O sistema de freio a disco traseiro da EX usa disco de diâmetro específico (estimado ~220 mm) que não é intercambiável com outras motos de forma direta. Pastilhas podem ser adaptadas de outras motos (Yamaha DT 200 ou Husqvarna similares). O caliper traseiro pode ser substituído por um universal de 2 pistões com maquinagem adequada. Se o disco estiver com menos de 3,0 mm, troque antes de continuar usando.',
      },
      {
        severity: 'WARN',
        title: 'Monoamortecedor a gás: mais difícil de regenerar que o modelo simples',
        body: 'O monoamortecedor pressurizado da EX usa vedações específicas para retenção do gás nitrogênio. Quando perde o gás (amortecedor fica "morto"), a regeneração exige equipamento especializado e vedações difíceis de encontrar. Alternativa viável: substituir por YSS ou Öhlins de medida compatível — levar o amortecedor original para medir antes de comprar o substituto.',
      },
    ],

    MANUTENCAO: [
      {
        severity: 'OK',
        title: 'Toda manutenção do motor é igual à SXT 27.5 — adicione o disco traseiro',
        body: 'NGK B8ES (0,6 mm), câmbio SAE 20W-40 a cada 3.000 km, líquido de arrefecimento a cada 2 anos, corrente lubrificada a cada 500 km. Adicionalmente, verifique o fluido do freio traseiro (DOT 4) a cada 6 meses e troque a cada 2 anos.',
      },
      {
        severity: 'OK',
        title: 'Lubrificação do sistema de bieletas traseiro com linkage: a cada 5.000 km',
        body: 'O sistema de linkage do monoamortecedor traseiro tem rolamentos e buchas que precisam de graxa. A cada 5.000 km, desmonte o sistema de bieletas, limpe os rolamentos com WD-40 e aplique graxa multiuso de qualidade. Bieletas sem graxa fazem ruído metálico em terreno irregular e desgastam os rolamentos rapidamente.',
      },
    ],
  },

  // ── Elefantre 16.5 ES (1989–1997) ───────────────────────────────────────────
  // Motor: 125cc 2T a água | Partida elétrica (inovação para trail da época)
  // Painel CEV italiano | Pneus: 2.75-21 / 4.10-18

  {
    modelName: 'Elefantre 16.5 ES', yearFrom: 1989, yearTo: 1997,

    MACETES: [
      {
        severity: 'OK',
        title: 'Partida elétrica em trail 125cc dos anos 90: um luxo — mantenha a bateria em dia',
        body: 'A partida elétrica foi um diferencial do Elefantre em relação às concorrentes da época. Para a partida elétrica funcionar de forma confiável, a bateria precisa estar em bom estado (acima de 12,2V em repouso). Em trilha intensa, o consumo elétrico do motor de arranque pode descarregar uma bateria fraca em poucas partidas. Sempre leve um auxiliar de partida (mini jump starter) ou saiba usar o kick de emergência.',
      },
      {
        severity: 'OK',
        title: 'Toda a mecânica do SXT 16.5 se aplica: mesmos cuidados, mesmas peças',
        body: 'O motor 125cc 2T a água, o carburador Dell\'Orto, o câmbio de 5 marchas e os freios são idênticos à SXT 16.5. As diferenças do Elefantre: painel CEV italiano, tanque maior e partida elétrica. Toda manutenção e todos os problemas crônicos da SXT 16.5 são aplicáveis.',
      },
      {
        severity: 'OK',
        title: 'Painel CEV italiano: ponteiro fragíl à vibração — substitua por instrumento digital',
        body: 'O painel CEV importado da Itália tem ponteiros mecânicos sensíveis à vibração do motor 2T e ao uso em trilha. Com o tempo, o ponteiro do velocímetro trava ou salta. Substitua por GPS portátil (Garmin) ou ciclocomputador sem fio — mais preciso e resistente. A iluminação do painel (lâmpadas de advertência) pode ser convertida para LEDs de 12V para maior durabilidade.',
      },
    ],

    PROBLEMAS: [
      {
        severity: 'DANGER',
        title: 'CDI falha com calor: idêntico ao SXT 16.5',
        body: 'O CDI integrado à bobina é o mesmo da linha 16.5. A falha por temperatura ocorre da mesma forma: moto para após 20 min de uso, volta ao esfriar. Solução: CDI externo em local ventilado. Consulte as fichas da SXT 16.5 para detalhes completos.',
      },
      {
        severity: 'WARN',
        title: 'Motor de arranque consome bateria: bateria fraca + trilha = sem partida elétrica',
        body: 'Em trilha intensa com muitas paradas e partidas, o motor de arranque pode descarregar a bateria em poucas horas se ela estiver com capacidade reduzida. Sintoma: primeiro torna a partida elétrica lenta ("fraca"), depois não parte. O kick sempre funciona como backup, mas em trilha cansativa é inconveniente. Manutenha a bateria em bom estado: teste de carga a cada 6 meses.',
      },
      {
        severity: 'WARN',
        title: 'Regulador de tensão frágil: se falhar, danifica bateria e lâmpadas',
        body: 'O regulador de tensão do Elefantre tem os mesmos problemas dos outros modelos da linha. Sobretensão queima lâmpadas e danifica bateria; subtensão não carrega. Sintoma de subtensão: bateria que não se carrega em viagem (velocímetro original oscila com o RPM). Troque por regulador universal de 12V.',
      },
    ],

    MANUTENCAO: [
      {
        severity: 'OK',
        title: 'Bateria 12V 12Ah: verificação mensal e carga de manutenção se parar por mais de 2 semanas',
        body: 'A bateria é componente crítico no Elefantre ES (sem ela, a partida elétrica não funciona e o sistema elétrico falha). Use carregador de manutenção (float charger) se a moto ficar parada. Teste de carga semestral em loja de baterias. Bateria compatível: 12V 12Ah AGM selada — marcas Yuasa, Moura, Heliar.',
      },
      {
        severity: 'OK',
        title: 'Toda manutenção do motor é igual à SXT 16.5',
        body: 'NGK B8ES (0,6 mm), câmbio SAE 20W-40 a cada 3.000 km, líquido de arrefecimento a cada 2 anos, corrente lubrificada a cada 500 km, retentor de bengala 35×8×11 mm.',
      },
    ],
  },

  // ── Elefantre 30.0 ES (1989–1998) ───────────────────────────────────────────
  // Motor: maioria 2T 190cc a água (como Dakar); versões tardias ~1994-1998 com motor 4T
  // Partida elétrica | Monoamortecedor com reservatório separado | Peso: 132 kg

  {
    modelName: 'Elefantre 30.0 ES', yearFrom: 1989, yearTo: 1998,

    MACETES: [
      {
        severity: 'WARN',
        title: 'ATENÇÃO: verifique se o motor é 2T a água ou 4T a ar antes de qualquer manutenção',
        body: 'O Elefantre 30.0 ES teve dois tipos de motor ao longo da produção: versões 1989–1993 têm motor 2T 190cc a água (idêntico ao Dakar 30.0 — 30cv); versões 1994–1998 têm motor 4T a ar de menor potência (~16–18cv) proveniente de parceria com a Cagiva. A manutenção, o óleo e as peças são completamente DIFERENTES. Confirme: motor com radiador = 2T a água; motor sem radiador, com aletas = 4T a ar. Esta distinção é fundamental.',
      },
      {
        severity: 'OK',
        title: 'Versão 2T (1989–1993): todas as dicas do Dakar 30.0 se aplicam',
        body: 'O motor do Elefantre 2T é idêntico ao Dakar. Mesma vela NGK B8ES, mesmo câmbio SAE 20W-40, mesmo reservatório de óleo 2T com bomba automática, mesmo carburador Dell\'Orto 25mm. Consulte as fichas do Dakar 30.0 para manutenção completa.',
      },
      {
        severity: 'OK',
        title: 'Versão 4T a ar (1994–1998): o consumo cai para 30–35 km/L mas o prazer de pilotagem também',
        body: 'O motor 4T a ar das versões tardias é mais frugal (30–35 km/L vs 18 km/L do 2T) e exige menos manutenção periódica, mas a potência cai de 30cv para ~16–18cv. Para uso urbano e viagens tranquilas, a versão 4T é preferível. Para off-road intenso e performance, o 2T é imbatível. Saiba qual versão você tem antes de avaliar a compra.',
      },
      {
        severity: 'OK',
        title: 'Partida elétrica + motor potente: cuide bem da bateria',
        body: 'O motor de arranque do Elefantre precisa girar um motor maior (190cc 2T ou 125cc 4T). Bateria abaixo de 12,0V não tem corrente suficiente para girar o motor nos dias frios. Manutenha a bateria testada e carregada. No inverno gaúcho (a Agrale era de Caxias do Sul), uma bateria fraca pode significar moto parada.',
      },
    ],

    PROBLEMAS: [
      {
        severity: 'DANGER',
        title: 'CDI falha pelo calor (versão 2T) — mesmos problemas do Dakar',
        body: 'Na versão 2T (1989–1993), o CDI tem a mesma falha de temperatura que todos os modelos 2T Agrale. Consulte as fichas do Dakar 30.0 para solução.',
      },
      {
        severity: 'WARN',
        title: 'Identificar corretamente a versão do motor evita erros de manutenção sérios',
        body: 'Usar óleo de motor 4T em sistema 2T (ou vice-versa) causa danos graves. Se a proveniência do motor não for clara pelo visual externo, use um endoscópio ou peça ao mecânico para verificar: motor 2T tem câmara de combustão no cabeçote sem válvulas visíveis; 4T tem válvulas acessíveis pelo cabeçote. Nunca suponha o tipo de motor de um Elefantre 30.0 ES sem confirmar.',
      },
      {
        severity: 'WARN',
        title: 'Peças do motor 4T a ar da versão tardia: encontrar compatibilidade com Cagiva',
        body: 'O motor 4T a ar das versões 1994–1998 veio de parceria com a Cagiva. Peças como pistão, anéis, válvulas e retentores podem ter compatibilidade com a Cagiva W16 125 da mesma época. Busque por número de série do motor e compare com catálogos Cagiva em importadores italianos especializados ou no site motopecasagrale.com.br.',
      },
    ],

    MANUTENCAO: [
      {
        severity: 'WARN',
        title: 'Versão 2T (1989–1993): óleo 2T por bomba automática + câmbio SAE 20W-40',
        body: 'Mesmo sistema do Dakar 30.0: reservatório de óleo 2T (API TC) monitorado semanalmente, câmbio SAE 20W-40 trocado a cada 3.000 km, vela NGK B8ES a cada 4.000–5.000 km, líquido de arrefecimento a cada 2 anos.',
      },
      {
        severity: 'WARN',
        title: 'Versão 4T a ar (1994–1998): óleo de motor 4T trocado a cada 1.500 km',
        body: 'O motor 4T a ar exige óleo de motor convencional: SAE 20W-40 SF/SG ou 10W-40, quantidade ~1,2–1,5 L. Troca recomendada: a cada 1.500 km (motor de alto desgaste para a tecnologia da época). Vela: NGK D8EA ou equivalente (verificar código no motor). Filtro de ar: espuma lavável ou papel de reposição universal.',
      },
    ],
  },

  // ── SST 13.5 (1989–1997) ────────────────────────────────────────────────────
  // Motor: monocilíndrico 2T a AR (único da linha!) 125cc, 13,5cv
  // Freio dianteiro: TAMBOR (único Agrale sem disco dianteiro)
  // Pneus: 2.75-21 diant. / 3.50-18 tras. | Duplo amortecedor traseiro

  {
    modelName: 'SST 13.5', yearFrom: 1989, yearTo: 1997,

    MACETES: [
      {
        severity: 'WARN',
        title: 'Motor 2T a AR: limite rigoroso de 20 min de uso contínuo em calor extremo',
        body: 'Diferente de toda a linha Agrale, a SST 13.5 usa motor 2T refrigerado a AR — sem radiador, sem líquido de arrefecimento. Em dias quentes (acima de 30°C) ou em trilha exigente, o motor pode superaquecer em 15–20 minutos de uso contínuo. Sintomas: cheiro de queimado, motor "apertando", dificuldade de accelerar. Ao sentir esses sinais, pare em área sombreada e aguarde 10–15 min. Nunca force o motor da SST como faria com os modelos a água.',
      },
      {
        severity: 'OK',
        title: 'A SST é a mais simples e barata de manter da linha Agrale — boa entrada de linha',
        body: 'Com motor a ar, a SST 13.5 elimina: radiador, bomba d\'água, termostato, mangueiras e reservatório de expansão. Isso simplifica muito a manutenção. Para iniciantes ou uso recreativo leve, é a Agrale mais robusta e sem complicações. O desempenho é inferior à linha a água, mas a confiabilidade em uso moderado é maior.',
      },
      {
        severity: 'WARN',
        title: 'Freio dianteiro a tambor: a distância de frenagem é maior — antecipe as frenagens',
        body: 'O tambor dianteiro da SST 13.5 é o único freio de roda dianteira de toda a linha Agrale sem disco. A eficiência de frenagem é notavelmente inferior ao disco — distância de frenagem ~20–30% maior em condições similares. Em trilha com descidas rápidas ou estrada com tráfego, antecipe as frenagens consideravelmente. Tambor molhado perde eficiência quase totalmente — cuidado após travessias de rio.',
      },
      {
        severity: 'OK',
        title: 'Pneu traseiro 3.50-18 ainda é encontrado facilmente no mercado',
        body: 'A medida 3.50-18 do pneu traseiro da SST 13.5 é uma das mais comuns no mercado brasileiro (usada em várias motos de baixa cilindrada). Marcas como Deli Tire, Kings Tire e Pirelli MT60 fabricam nessa medida. Custo: R$ 80–R$ 180. Uma das peças de desgaste mais fáceis de encontrar para qualquer Agrale.',
      },
    ],

    PROBLEMAS: [
      {
        severity: 'DANGER',
        title: 'Superaquecimento do motor 2T a ar é mais rápido e mais grave que parece',
        body: 'Sem o buffer de calor que o arrefecimento a água oferece, o motor 2T a ar da SST pode fundir o pistão em uma única sessão de uso intenso com temperatura alta. O motor não dá muitos avisos antes de travar. Sintomas finais (já tarde): som metálico de "raspagem" e dificuldade progressiva de acelerar. Em condições de calor (verão nordestino ou trilha em terreno duro), o limite de uso é rígido.',
      },
      {
        severity: 'WARN',
        title: 'Freio a tambor traseiro e dianteiro perdem regulagem rapidamente em uso off-road',
        body: 'Com dois freios a tambor, a SST exige regulagem mais frequente que os modelos com disco. A cada 1.500–2.000 km ou após uso intenso em lama, verifique a folga das sapatas pelo parafuso de ajuste no tambor. Tambor com jogo excessivo: freio "fundo" e sem resposta. Tambor muito ajustado: roda trava involuntariamente. Sapatas a cada ~15.000 km ou ao sentir perda de eficiência.',
      },
      {
        severity: 'WARN',
        title: 'Bomba de óleo 2T da SST: falha causa fundição como nos outros modelos',
        body: 'Apesar de ser o modelo mais simples, a SST tem bomba de injeção automática de óleo 2T. A mesma falha das outras Agrales se aplica: se o reservatório de óleo esvaziar, a lubrificação cessa e o pistão funde. Monitoramento antes de cada saída é obrigatório.',
      },
    ],

    MANUTENCAO: [
      {
        severity: 'OK',
        title: 'Vela NGK B8ES, abertura 0,6 mm — troca a cada 5.000 km',
        body: 'Mesma vela de toda a linha 125cc 2T Agrale. Em motor a ar, a vela trabalha em regime térmico diferente — inspecione a cor do eletrodo a cada 2.500 km para avaliar a mistura. Motor a ar tende a trabalhar mais rico no inverno (ar frio e denso) e mais magro no verão (ar quente e menos denso).',
      },
      {
        severity: 'OK',
        title: 'Óleo do câmbio: SAE 20W-40, ~700 mL — troca a cada 3.000 km',
        body: 'Mesmo procedimento dos outros modelos. O câmbio da SST 13.5 é mais simples que o das versões potentes, mas exige a mesma atenção à troca periódica.',
      },
      {
        severity: 'WARN',
        title: 'Aletas de refrigeração: mantenha limpas para eficiência máxima',
        body: 'As aletas de refrigeração do motor a ar são essenciais para a dissipação de calor. Sujeira, lama seca e graxa acumulada nas aletas funcionam como isolante térmico. Limpe as aletas com jato de água (não pressão alta) e escovinha a cada 3.000 km ou após cada uso em lama. Aletas entupidas + dia quente = superaquecimento garantido.',
      },
      {
        severity: 'OK',
        title: 'Freios a tambor: regulagem a cada 1.500 km, sapatas a cada 15.000 km',
        body: 'Verifique a folga dos freios dianteiro e traseiro pelo parafuso de ajuste. Indicador de desgaste: seta no tambor — quando a seta sai da faixa marcada, as sapatas estão no limite. Sapatas compatíveis com outras motos da época de tambor similar — consulte loja de freios com as medidas do tambor (diâmetro interno e largura da sapata).',
      },
    ],
  },

  // ── Hartford Legion 125 (1998) ───────────────────────────────────────────────
  // Motor: 4T OHC monocilíndrico 124cc a ar, carburador Keihin 22mm
  // Custom estilo Suzuki Intruder | 5 marchas | Freio diant.: disco 220mm
  // Última moto fabricada com o nome Agrale

  {
    modelName: 'Hartford Legion 125', yearFrom: 1998, yearTo: 1998,

    MACETES: [
      {
        severity: 'OK',
        title: 'A última Agrale: um custom 4T que foi um divisor de era para a marca',
        body: 'A Hartford Legion 125 marcou o encerramento da era Agrale nas motocicletas. Em vez de continuar com motos trail 2T (que estavam saindo de moda e sofrendo restrições ambientais), a Agrale lançou uma custom 4T a ar em parceria com a Hartford (Taiwan). Motor 4T OHC de 125cc, visual inspirado na Suzuki Intruder 125, peso de apenas 105 kg. Produzida apenas em 1998.',
      },
      {
        severity: 'OK',
        title: 'Motor 4T OHC: muito mais simples de manter que os 2T da linha trail',
        body: 'O motor 4T da Legion dispensa bomba de óleo 2T, reservatório separado e pré-mistura. Troca de óleo convencional a cada 1.500–2.000 km, filtro de ar lavável, vela de ignição a cada 10.000 km. A durabilidade do 4T em uso urbano é muito maior que o 2T equivalente. Para quem não é mecânico, a Legion é a Agrale de manutenção mais tranquila.',
      },
      {
        severity: 'OK',
        title: 'Compatibilidade com motos orientais 125cc 4T da mesma era — facilita peças',
        body: 'O motor Hartford tem origem em motores Honda licenciados. Algumas peças internas (pistão, anéis, válvulas, vela) têm compatibilidade com outras motos 125cc 4T de origem oriental da mesma época — Honda CG 125, Shineray, Dafra. Consulte por número do motor (gravado no bloco) para identificar a compatibilidade exata e aumentar as opções de reposição.',
      },
      {
        severity: 'WARN',
        title: 'Suspensão traseira com 80mm de curso: não é uma moto para off-road',
        body: 'A Legion é uma custom urbana. O curso de suspensão traseira de apenas 80 mm e o perfil de pneu 3.50-16 traseiro não são adequados para trilha ou estradas de terra. Use exclusivamente em asfalto ou asfalto precário. Tentar uso off-road vai danificar a suspensão e comprometer a geometria do quadro.',
      },
    ],

    PROBLEMAS: [
      {
        severity: 'WARN',
        title: 'Peças específicas Hartford/Agrale: raras no mercado — busque compatibilidade com Honda',
        body: 'Produzida apenas em 1998, a Legion tem peças de catálogo muito limitadas. A estratégia de manutenção é buscar compatibilidade: o motor Hartford tem base Honda, então peças de reposição de CG 125/CB 125 da mesma geração têm grande chance de compatibilidade dimensional. Carrinho, freios, pneus e cabos elétricos têm medidas universais — mais fácil de encontrar.',
      },
      {
        severity: 'WARN',
        title: 'Sistema elétrico simples mas envelhecido: conector oxidados causam falhas intermitentes',
        body: 'Com mais de 25 anos, os conectores elétricos originais da Legion estão sujeitos à oxidação severa. Falhas intermitentes de ignição, luz de freio e partida são comuns. Limpe todos os conectores com spray contato elétrico e recrimp os terminais frouxos. O maço de fios, se ressecado, pode rachar a isolação — inspecione e cubra pontos expostos com fita autofusão.',
      },
    ],

    MANUTENCAO: [
      {
        severity: 'OK',
        title: 'Óleo de motor 4T: SAE 20W-40 SF/SG, ~1,1 L — troca a cada 1.500–2.000 km',
        body: 'Motor monocilíndrico OHC 124cc: use SAE 20W-40 SF/SG ou 10W-40 de boa qualidade (Lubrax, Havoline, Castrol 4T). Capacidade: ~1,0–1,2 L (verificar visor de nível ou vareta). Troca a cada 1.500–2.000 km: apesar de ser um motor pequeno, a manutenção frequente prolonga muito a vida útil. Não use óleos 5W-40 sintéticos de carro em motores pequenos a ar — a viscosidade a quente pode ser insuficiente.',
      },
      {
        severity: 'OK',
        title: 'Vela de ignição: NGK D8EA ou CR7E — troca a cada 8.000–10.000 km',
        body: 'O motor OHC da Legion usa rosca de vela tipo longa (thread 14mm, comprimento 19mm). NGK D8EA é a especificação mais provável — confirme no manual ou na marcação do cabeçote. Gap: 0,7–0,8 mm. Custo: R$ 25–R$ 45. Motor 4T a ar tem vida útil de vela muito maior que o 2T. Troque no intervalo recomendado.',
      },
      {
        severity: 'OK',
        title: 'Corrente de transmissão: lubrificação a cada 800 km, tensão 10–15 mm',
        body: 'A Legion é uma custom, não uma trail. A corrente trabalha em condições mais suaves que nos modelos off-road. Lubrificação a cada 800 km com spray de corrente. Tensão: 10–15 mm de folga (menos que os modelos trail). Verifique que a corrente não está girando excentricamente (causa de eixo de roda traseira desalinhado).',
      },
      {
        severity: 'OK',
        title: 'Freio dianteiro a disco 220mm Nissin: sangria a cada 2 anos',
        body: 'Disco de 220 mm com caliper Nissin (ou similar). DOT 4 como fluido de freio. Sangria completa a cada 2 anos. Pastilhas: verifique o indicador de desgaste visual — quando o material frenante chegar a 2 mm, troque. Pastilhas universais para disco 220mm com 2 pistões têm boa compatibilidade com o sistema da Legion.',
      },
    ],
  },
]

// ─── Calibragem de pneus ─────────────────────────────────────────────────────

const agraleTirePressures: TirePressureInput[] = [
  // SXT 16.5 / Elefant 16.5 — pneus 2.75-21 diant. / 4.10-18 tras.
  {
    modelName: 'SXT 16.5', yearFrom: 1984, yearTo: 1992,
    tireSize: '2.75-21 / 4.10-18',
    frontPsi: 21, rearPsi: 24, frontPsiLoad: 21, rearPsiLoad: 29,
    notes: 'Uso misto estrada/trilha. Off-road: reduzir para 12/15 psi para maior aderência.',
  },
  {
    modelName: 'Elefant 16.5', yearFrom: 1984, yearTo: 1992,
    tireSize: '2.75-21 / 4.10-18',
    frontPsi: 21, rearPsi: 24, frontPsiLoad: 21, rearPsiLoad: 29,
    notes: 'Mesma medida e pressão da SXT 16.5. Off-road: 12/15 psi.',
  },
  // SXT 27.5 / Elefant 27.5 — pneus 3.00-21 diant. / 4.00-17 tras.
  {
    modelName: 'SXT 27.5', yearFrom: 1985, yearTo: 1997,
    tireSize: '3.00-21 / 4.00-17',
    frontPsi: 21, rearPsi: 26, frontPsiLoad: 21, rearPsiLoad: 29,
    notes: 'Estrada: 21/26 psi. Off-road: reduzir para 12/15 psi. Com garupa: traseiro 29 psi.',
  },
  {
    modelName: 'Elefant 27.5', yearFrom: 1985, yearTo: 1997,
    tireSize: '3.00-21 / 4.00-17',
    frontPsi: 21, rearPsi: 26, frontPsiLoad: 21, rearPsiLoad: 29,
    notes: 'Mesma medida da SXT 27.5. Com tanque cheio de 16 L, verificar pressão traseira.',
  },
  // Dakar 30.0 — pneus 2.75-21 diant. / 4.10-18 tras.
  {
    modelName: 'Dakar 30.0', yearFrom: 1985, yearTo: 1997,
    tireSize: '2.75-21 / 4.10-18',
    frontPsi: 21, rearPsi: 26, frontPsiLoad: 24, rearPsiLoad: 29,
    notes: 'Alta performance: manter pressão correta. Off-road: 12/17 psi. Acima de 100 km/h: nunca abaixo de 21/26 psi.',
  },
  // SXT 27.5 E / Explorer — mesmos pneus da SXT 27.5
  {
    modelName: 'SXT 27.5 E', yearFrom: 1988, yearTo: 1995,
    tireSize: '3.00-21 / 4.00-17',
    frontPsi: 21, rearPsi: 24, frontPsiLoad: 21, rearPsiLoad: 28,
    notes: 'Versão enduro: uso off-road predominante. Off-road: 11/13 psi. Uso misto: 21/24 psi.',
  },
  // SXT 27.5 EX — aro traseiro 17", pneu 4.00-17
  {
    modelName: 'SXT 27.5 EX', yearFrom: 1992, yearTo: 1997,
    tireSize: '3.00-21 / 4.00-17',
    frontPsi: 21, rearPsi: 24, frontPsiLoad: 21, rearPsiLoad: 28,
    notes: 'Off-road: 11/13 psi. Estrada: 21/24 psi. Disco traseiro: verificar pressão antes de frenagens intensas.',
  },
  // Elefantre 16.5 ES
  {
    modelName: 'Elefantre 16.5 ES', yearFrom: 1989, yearTo: 1997,
    tireSize: '2.75-21 / 4.10-18',
    frontPsi: 21, rearPsi: 24, frontPsiLoad: 21, rearPsiLoad: 29,
    notes: 'Igual à SXT 16.5. Off-road: 12/15 psi.',
  },
  // Elefantre 30.0 ES
  {
    modelName: 'Elefantre 30.0 ES', yearFrom: 1989, yearTo: 1998,
    tireSize: '2.75-21 / 4.10-18',
    frontPsi: 21, rearPsi: 26, frontPsiLoad: 24, rearPsiLoad: 29,
    notes: 'Versão 2T igual ao Dakar. Versão 4T: pressões iguais (pneus idênticos).',
  },
  // SST 13.5
  {
    modelName: 'SST 13.5', yearFrom: 1989, yearTo: 1997,
    tireSize: '2.75-21 / 3.50-18',
    frontPsi: 21, rearPsi: 24, frontPsiLoad: 21, rearPsiLoad: 28,
    notes: 'Motor a ar: não usar pressões de trilha (off-road) por mais de 20 min em clima quente.',
  },
  // Hartford Legion 125
  {
    modelName: 'Hartford Legion 125', yearFrom: 1998, yearTo: 1998,
    tireSize: '2.75-18 / 3.50-16',
    frontPsi: 26, rearPsi: 29, frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Custom urbana — uso exclusivo em asfalto. Nunca reduzir para uso off-road.',
  },
]

// ─── Runner ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Agrale — iniciando...')

  // Garantir VehicleType "moto"
  const motoType = await prisma.vehicleType.upsert({
    where: { slug: 'moto' },
    update: {},
    create: { slug: 'moto', label: 'Moto' },
  })

  // Garantir Brand "Agrale"
  const agraleBrand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Agrale', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'Agrale', vehicleTypeId: motoType.id },
  })
  console.log(`  ✅ Brand: ${agraleBrand.name}`)

  // Criar modelos e tips
  for (const block of agraleTips) {
    // Garantir modelo
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: agraleBrand.id } },
      update: {},
      create: { name: block.modelName, brandId: agraleBrand.id },
    })

    // Limpar tips anteriores deste modelo (re-seed idempotente)
    await prisma.tip.deleteMany({ where: { modelName: block.modelName } })

    const allTips: { cat: Cat; tip: TipInput }[] = [
      ...block.MACETES.map(t => ({ cat: 'MACETES' as Cat, tip: t })),
      ...block.PROBLEMAS.map(t => ({ cat: 'PROBLEMAS' as Cat, tip: t })),
      ...block.MANUTENCAO.map(t => ({ cat: 'MANUTENCAO' as Cat, tip: t })),
    ]

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

    const counts = {
      m: block.MACETES.length,
      p: block.PROBLEMAS.length,
      mt: block.MANUTENCAO.length,
    }
    console.log(
      `  🔧 ${block.modelName} (${block.yearFrom}–${block.yearTo}): ` +
      `${counts.m} macetes, ${counts.p} problemas, ${counts.mt} manutenção`
    )
  }

  // Calibragem de pneus
  console.log('\n  📏 Calibragem de pneus...')
  for (const tp of agraleTirePressures) {
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
    console.log(`  ✅ ${tp.modelName}: ${tp.frontPsi}/${tp.rearPsi} psi`)
  }

  const totalTips = agraleTips.reduce(
    (acc, b) => acc + b.MACETES.length + b.PROBLEMAS.length + b.MANUTENCAO.length, 0
  )
  console.log(`\n✅ Seed Agrale concluído: ${agraleTips.length} modelos, ${totalTips} dicas, ${agraleTirePressures.length} calibragens.`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
