// seed-honda-crf-trail.ts — Honda CRF trail/enduro (4 tempos)
// CRF 110F (2019+) · CRF 150F (2006+) · CRF 230 F (2006+) · CRF 250 F (2019+)
// Motos de trilha entry-level a intermediário — uso off-road e iniciante
// CRF 250F: injeção PGM-FI / IN 0,10 mm / EX 0,15 mm / vela NGK LMAR7H-9DS
// CRF 230F: carburador Keihin PD9CE / 1,2 L óleo / pneu 80/100-21 + 100/100-18
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

// ─── CRF 250 F (2019+) — trail intermediária, injeção PGM-FI ─────────────────

const CRF250F_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 249cc SOHC monocilíndrico PGM-FI (injeção eletrônica) — folga: IN 0,10 ±0,03 mm / EX 0,15 ±0,03 mm a frio; verificar a cada 6.000 km',
    body: 'A CRF 250F usa motor SOHC de 249cc com 2 válvulas e sistema de injeção eletrônica PGM-FI (substituiu o carburador da CRF 230F). Folga de válvulas: adm 0,10 ±0,03 mm / esc 0,15 ±0,03 mm com motor FRIO no PMS de compressão. Ajuste por calços (shims). Verificação a cada 6.000 km — motos de trilha têm válvulas que apertam mais rápido por operar fora da faixa de rotação linear. Vela: NGK LMAR7H-9DS (tipo especial para motor de alta compressão de trilha).',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA, 1,4 L com filtro — troca a cada 3.000 km (trilha) ou 4.000 km (uso misto); JASO MA obrigatório para embreagem úmida',
    body: 'CRF 250F tem embreagem úmida no mesmo cárter do óleo de motor. JASO MA (não MA2) é obrigatório — aditivos de atrito do MA2 comprometem a embreagem. Capacidade: 1,4 L com filtro / 1,2 L sem. Uso intenso em trilha: troca a cada 3.000 km (óleo sofre mais contaminação por poeira). Uso misto estrada+trilha: 4.000 km. Sintoma de óleo vencido em moto de trilha: embreagem escorrega em subidas e a marcha engata duro.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK LMAR7H-9DS — vela especial de trilha (10 mm roscado, câmara profunda); NÃO substituir por vela de rua padrão; gap 0,8 mm',
    body: 'A NGK LMAR7H-9DS é específica para o motor de alta compressão da CRF 250F. O acesso exige adaptador especial ou chave de vela de 10 mm com extensão longa. NÃO usar vela CR8EH-9 ou CPR8EA-9 de rua em seu lugar — threading diferente (câmara mais profunda do motor off-road). Troca: a cada 6.000 km. Vela com eletrodo preto (fuligem): filtro de ar entupido, mistura rica. Vela branca: aspiração de ar falso ou piloto muito "gasoso".',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar — elemento seco de papel; trocar a cada 6.000 km ou após uso intenso em pó; filtro úmido = motor aspira óleo do filtro',
    body: 'O filtro de ar da CRF 250F é elemento de papel seco (diferente das motos de motocross que usam espuma). Em trilha com muita poeira: inspecionar e soprar a cada saída, trocar a cada 3.000-4.000 km. Se filtro entrar em contato com água (chuva ou riacho): secar completamente antes de usar ou trocar. Filtro molhado que seca dentro do airbox → fungos e deterioração do papel → motor aspira sem filtro. K&N HD-0800: lavável, disponível para CRF 250F (R$180-250).',
  },
  {
    severity: 'OK',
    title: 'Pneus 80/100-21 (F) · 100/100-18 (R) — calibrar 15 PSI (F) / 15 PSI R em trilha; 18-20 PSI em estrada',
    body: 'Pneus de trilha com perfil knobby. Pressão de trilha: dianteiro 15 PSI (100 kPa) / traseiro 15 PSI (100 kPa) — baixo intencionalmente para conformação em terra. Em estrada (mais de 10 km): elevar para 18-20 PSI F e R para evitar desgaste excessivo e aquecimento. Pneus mais populares na CRF 250F: Dunlop D739 (original), Pirelli MT 21 Rallycross, Michelin Enduro Medium. Em trilha de pedra: aumentar ligeiramente para 18 PSI (amortece impactos sem risco de furo).',
  },
  {
    severity: 'WARN',
    title: 'IACV (válvula de marcha lenta) sujo = marcha oscilante em estrada ou motor "morre" no neutro — limpar a cada 6.000-8.000 km em uso urbano',
    body: 'A CRF 250F tem PGM-FI com IACV (Idle Air Control Valve). Em uso em poeira ou trilha com muita partícula no ar: o IACV entope mais rápido que em motos de rua. Sintoma: marcha lenta oscilando entre 800-1.400 rpm, motor apagando no neutro, partida difícil a quente. Limpeza: spray EFI Cleaner na entrada do IACV (sem desmontagem completa na maioria dos casos). Se IACV fisicamente danificado: peça Honda original R$200-380.',
  },
]

const CRF250F_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Válvulas apertando prematuramente — folga zero na exaustão em menos de 6.000 km em uso intenso de trilha; verificar ANTES do intervalo recomendado',
    body: 'Motos de trilha 4 tempos com uso em altas rotações (subidas, arrancadas) têm válvulas que apertam mais rápido que motos de rua. CRF 250F em uso sério de trilha: verificar válvulas a cada 4.000-5.000 km (não esperar os 6.000 km do manual). Válvula de escape com folga zero = ignição acidental → queima do assento → perda de compressão progressiva. Sintoma: dificuldade de partida a frio, leve perda de tração em subidas. Reparo: troca de calço (shim) ou retífica do assento de válvula (R$400-800).',
  },
  {
    severity: 'WARN',
    title: 'Filtro de ar da CRF 250F fica inacessível sem ferramentas — acesso pelo painel lateral exige chave Phillips e 8 mm; em competição trilha, trocar na sequência',
    body: 'Diferente das motos de motocross (onde o filtro é acessível em 30 segundos), a CRF 250F tem filtro protegido por painel lateral que exige ferramentas para acesso. Em competição de regularidade ou eventos de trilha com multiple loações de filtro: levar filtro sobressalente + ferramentas no kit. Instalar filtro levemente untado com óleo de filtro nas bordas de vedação (previne passagem de pó pela borda). Omitir isso = filtro novo que não filtra direito.',
  },
  {
    severity: 'WARN',
    title: 'Corrente perde tensão rápido em uso off-road — verificar e ajustar a cada saída; folga máxima tolerada: 35 mm (além disso pode pular do pinhão)',
    body: 'Uso em trilha (vibração, lama, areia, subidas) estica a corrente mais rápido que estrada. CRF 250F com corrente de série: verificar folga ANTES de cada saída de trilha, não depois. Folga correta: 25-35 mm no ponto mais tenso. Folga excessiva (>40 mm): risco de pular do pinhão em terreno irregular (travamento da roda traseira). Kit corrente 428 (CRF 250F usa passo 428): DID 428VX (R$120-180) + coroa + pinhão. Troca completa: a cada 15.000-20.000 km de trilha.',
  },
  {
    severity: 'OK',
    title: 'Luz FI acendendo por variação de combustível entre postos — normal em postos do interior com combustível de qualidade duvidosa; resetar cortando a ignição',
    body: 'A PGM-FI da CRF 250F pode acender a luz FI ao usar combustível com octanagem muito diferente do padrão (pobre no interior). Comportamento: motor solavanca levemente nas primeiras acelerações, luz FI pisca e apaga. Solução: desligar a ignição e religar (ECU faz auto-calibração). Se luz FI permanecer acesa (não piscando): DTC real — levar à concessionária para diagnóstico. Prevenir: usar gasolina Aditivada ou Podium nos postos de rodovias para motos.',
  },
]

// ─── CRF 230 F (2006–2020+) — trail carburada ────────────────────────────────

const CRF230F_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 223cc SOHC carburado (Keihin PD9CE 26mm) — folga válvulas: adm 0,05 ±0,02 mm / esc 0,08 ±0,02 mm a frio; verificar a cada 6.000 km',
    body: 'A CRF 230F usa motor 223cc SOHC com 2 válvulas e carburador Keihin PD9CE de 26 mm. Folga de válvulas: adm 0,05 ±0,02 mm / esc 0,08 ±0,02 mm com motor FRIO. Diferença crítica: folgas MENORES que a CRF 250F (que tem motor mais moderno). Ajuste por parafuso e contra-porca (não calços — mais fácil de regular). Vela: NGK DR8ES ou D8EA (confirmar no manual do ano), gap 0,60-0,70 mm. Torque da vela: 14 N.m.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA, 1,2 L (sem filtro separado — motor tem malha de filtro integrada no cárter); troca a cada 3.000 km em trilha ou 4.000 km uso geral',
    body: 'A CRF 230F tem filtro de óleo do tipo malha de aço integrada ao cárter (não tem cartucho substituível). Na troca de óleo: drenar o óleo velho, lavar a tela da malha com gasolina ou solvente e reassemblar. Capacidade: 1,2 L. A simplificação do filtro é um custo menor de manutenção vs modelos com filtro de papel. JASO MA obrigatório (embreagem úmida compartilha o óleo). Óleo escuro com partículas metálicas visíveis: desmontar e inspecionar a malha de filtro — pode indicar desgaste de engrenagem.',
  },
  {
    severity: 'OK',
    title: 'Carburador Keihin PD9CE — jateamento de fábrica é levemente pobre; ajuste da mistura em parafuso de ar +1 volta resolte oscilação de marcha lenta',
    body: 'O carburador da CRF 230F de fábrica é calibrado para altitude de ~1.000 m. Nas regiões baixas (litoral, Baixada Fluminense, São Paulo): motor pode pegar com dificuldade a quente e ter marcha lenta oscilante. Ajuste simples: parafuso de mistura de ar (atrás do carburador, com tampa plástica laranja) +1 a +1,5 volta para fora. Jato principal: #118 de série. Em altitudes acima de 1.500 m (Serra Gaúcha, Minas, Sudeste serrano): jato menor (#115 ou #112) melhora o desempenho. Carburador entupido com verniz (moto parada >3 meses): limpar com spray de carburador e agulha fina nos jatos.',
  },
  {
    severity: 'OK',
    title: 'Pneus 80/100-21 (F) · 100/100-18 (R) — mesmos da CRF 250F; calibrar 12-15 PSI em trilha; NHS (Not Highway Safe) de série — NÃO usar em rodovias',
    body: 'Os pneus de série da CRF 230F são NHS (Not Highway Safe) — marcação que proíbe uso em rodovias. São pneus de trilha que não aguentam as altas velocidades e calor do asfalto. Calibragem em trilha: 12-15 PSI F e R. Para transitar em asfalto entre áreas de trilha: elevar para 18-20 PSI e manter velocidade abaixo de 80 km/h. Para uso misto regular: pneus Michelin Enduro Medium ou Pirelli Scorpion XC Mid Hard são NHS mas têm melhor compromisso de durabilidade em asfalto que os originais.',
  },
  {
    severity: 'WARN',
    title: 'Cabo de decompressor manual — verificar tensão a cada 6.000 km; cabo frouxo faz motor não destravrar no arranque, dificultando partida a frio',
    body: 'A CRF 230F tem decompressor manual no guidão esquerdo (alavanca pequena). O cabo estica com o uso. Cabo muito frouxo: motor resiste mais no arranque → partida difícil → piloto força demais o kickstarter → dano ao kickstart ou à engrenagem de arranque. Ajuste: deixar 2-3 mm de folga livre antes da alavanca começar a trabalhar. Em motos com mais de 15.000 km: trocar cabo preventivamente (R$40-80 + mão de obra). Uso correto do decompressor: pressionar e MANTER alavanca no arranque a frio, soltar ao sentir o motor "engatar" no PMS.',
  },
]

const CRF230F_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Partida difícil a quente — problema clássico da CRF 230F por carburador com boia muito sensível; técnica: acelerar uma vez em ponto morto antes de dar o kick',
    body: 'Em altas temperaturas ou após o motor esquentar: o combustível no carburador pode vaporizar (vapor lock). Sintoma: kickstarter não "pega" após motor quente. Técnica correta: (1) Fechar o afogador completamente. (2) Abrir o acelerador 1/4. (3) Dar kick firme (NÃO kick repetido — afoga o motor). (4) Se não pegar: abrir o afogador e tentar sem afogar. Outro problema: piloto virou a moto durante queda → combustível inundou o cilindro (afogamento por rolagem). Solução do afogamento: vela fora + kick com acelerador aberto para expulsar combustível.',
  },
  {
    severity: 'WARN',
    title: 'Garfo dianteiro (télescópico 35 mm) vaza óleo entre 20.000-30.000 km — retentores desgastam em uso intenso de trilha com impactos; troca preventiva a cada 30.000 km',
    body: 'CRF 230F tem bengala convencional de 35 mm (não invertida). Em trilha com impactos repetidos (roots, pedras, relevos): os retentores de vedação desgastam mais rápido que em uso na estrada. Retentores Ariete ou ProX 35 mm (R$50-80 o par). Óleo de bengala: Honda SS-8 10W (55-60 mL por tubo). Inspeção: comprimir a bengala e verificar haste — névoa oleosa = inicio de vazamento; gota acumulando = troca imediata. Trocas preventivas em moto de trilha ativa: a cada 25.000-30.000 km.',
  },
  {
    severity: 'OK',
    title: 'Desgaste prematuro das lonas de freio traseiro (tambor) — pó e lama abrasivos duram 2-3x menos que em estrada; levar lona reserva em viagens longas de trilha',
    body: 'A CRF 230F tem freio traseiro a tambor. Em trilha com muita lama, areia fina ou pó de pedreira: as lonas desgastam em 4.000-6.000 km (vs 12.000+ km em uso de estrada). Sintoma: pedal desce muito sem frenagem efetiva (lona raspando o tambor). Ajuste do tambor: parafuso de regulagem no eixo traseiro — feito em casa sem ferramentas especiais. Lona Fras-le ou Honda original: R$25-60. Levar lona reserva em trilhas longas de múltiplos dias.',
  },
  {
    severity: 'WARN',
    title: 'Radiador ausente — motor air-cooled superaquece em subidas longas com paradas (lama/bloqueio); deixar motor em marcha lenta por 2-3 minutos antes de desligar em uso intenso',
    body: 'A CRF 230F é refrigerada a ar — sem radiador. Em uso intenso (subidas longas em baixa marcha, travessia de lama parada) o motor pode superaquecer. Sintoma: motor "perde força" temporariamente → proteção térmica básica por expansão do metal. Prevenção: (1) Não desligar o motor imediatamente após uso pesado — deixar em marcha lenta 2-3 min para dissipar calor. (2) Em subidas longas: alternar com pausas de arrefecimento. (3) Checar nível de óleo mais frequentemente em uso intenso — óleo quente degrada mais rápido.',
  },
]

// ─── CRF 150F (2006+) — trail iniciante ──────────────────────────────────────

const CRF150F_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 149cc SOHC monocilíndrico carburado, air-cooled — folga: adm 0,05 mm / esc 0,10 mm a frio; ajuste por parafuso; verificar a cada 6.000 km',
    body: 'Motor 149cc de 2 válvulas, com carburador do tipo slide. Folga de válvulas: adm 0,05 ±0,02 mm / esc 0,10 ±0,02 mm motor FRIO. Ajuste por parafuso e contra-porca (simples). Vela: NGK CR8E ou D8EA, gap 0,6-0,7 mm. Óleo: 10W-30 JASO MA, ~0,9 L (sem filtro de papel — malha no cárter). Troca: a cada 3.000 km de trilha. Moto projetada para introdução ao off-road — manutenção relativamente simples e peças baratas.',
  },
  {
    severity: 'OK',
    title: 'Pneus 70/100-19 (F) · 90/100-16 (R) — menores que a CRF 230F; calibrar 12-14 PSI em trilha; reposição disponível em lojas de dirt bike',
    body: 'Tamanhos específicos de dirt bike (diferentes das estradeiras). Calibragem de trilha: dianteiro 12-14 PSI / traseiro 12-14 PSI. Em uso em asfalto curto: 18 PSI F e R. Pneus reposição: Michelin StarCross, Pirelli Scorpion MX, Dunlop Geomax — disponíveis em lojas especializadas de motocross. Verificar balanceamento ao instalar pneu novo (uso misto estrada/trilha).',
  },
  {
    severity: 'OK',
    title: 'Moto ideal para introdução ao off-road — peso ~121 kg facilita aprendizado; baixa potência (~13 cv) perdoa erros de controle',
    body: 'A CRF 150F é a porta de entrada para a trilha 4 tempos. O peso controlado (121 kg abastecida) e a potência suave (~13 cv) permitem que iniciantes cometam erros sem consequências graves. Altura do banco: 858 mm (alta para crianças pequenas mas adequada para adolescentes). Boa prática: início sempre em trilha suave e plana, sem obstáculos técnicos. Kit de proteção obrigatório para o piloto: joelheiras, capacete enduro, luvas reforçadas — CRF 150F perdoa o motor, mas não perdoa a queda sem proteção.',
  },
  {
    severity: 'WARN',
    title: 'Bengala de 33 mm (mais fina que as modelos maiores) — vida dos retentores menor em uso intenso; sinais de vazamento precoce são mais comuns',
    body: 'A CRF 150F usa bengala de 33 mm de diâmetro, mais fina que a de 35-41 mm das motos maiores. Retentores mais finos = vida útil menor em impactos repetidos. Inspeção a cada 8.000-10.000 km. Kit retentores 33 mm: R$40-70 (menos disponível — confirmar disponibilidade antes de precisar). Óleo de bengala: 45-50 mL por tubo (Honda SS-7 ou equivalente 10W).',
  },
]

const CRF150F_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Kicker (partida a pé) como única opção — sem partida elétrica; dificuldade de partida a frio em dias frios ou com motor afogado é normal; técnica específica necessária',
    body: 'A CRF 150F tem APENAS kickstarter. Em dias frios (<15°C): usar afogador completamente + kick firme. Em altitudes acima de 1.500 m: reduzir o afogador na 2ª tentativa. Motor afogado (muito combustível): abrir acelerador totalmente e dar kicks rápidos sem afogador para limpar o excesso. Dica: nunca dar muitos kicks seguidos sem pausa — inunda o motor. Máximo 3 kicks por tentativa → pausa de 30 segundos → repetir.',
  },
  {
    severity: 'OK',
    title: 'Embreagem úmida pesada para mãos pequenas em uso prolongado — ajuste de alavanca e troca por empunhadura mais curta melhora fadiga',
    body: 'Uso prolongado em trilha técnica (embreagem usada como ferramenta de tração) causa fadiga na mão esquerda em pilotos jovens e mulheres. Soluções: (1) Ajustar o ponto de acionamento da alavanca (mais perto da empunhadura); (2) Trocar por alavanca de acionamento fácil ("easy pull") aftermarket — reduz força necessária em 30%; (3) Fortalecer a mão com exercícios de reabilitação esportiva. As alavancas aftermarket de alumínio dobram e não quebram na queda (ao contrário das originais de ferro fundido).',
  },
  {
    severity: 'OK',
    title: 'Peças específicas para o Brasil — CRF 150F é vendida no Brasil mas algumas peças só por importação ou concessionárias Honda específicas',
    body: 'A CRF 150F é fabricada no Brasil (Manaus) e tem boa disponibilidade de peças nas redes Honda. Itens menos disponíveis no mercado paralelo: retentores de bengala 33 mm, tampa da embreagem, peças de plástico de carroceria. Peças em estoque crítico: verificar no site Honda antes de viagem longa de trilha. Comunidade: grupos de CRF no Facebook Brasil têm trocas e doações de peças de motos acidentadas.',
  },
]

// ─── CRF 110F (2019+) — mini enduro / iniciante / criança ────────────────────

const CRF110F_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 109cc OHC carburado, air-cooled — óleo 10W-30 JASO MA 0,65 L (volume pequeno: trocar a cada 2.500 km em trilha); vela NGK CR5HSB, gap 0,6-0,7 mm',
    body: 'Motor OHC de 109cc, ~7 cv, sem filtro de papel — usa malha de aço integrada ao cárter (lavar com gasolina a cada troca de óleo). Capacidade: 0,65 L — volume muito pequeno que degrada mais rápido que motos maiores. Troca: a cada 2.500 km em uso de trilha ou 1 ano. Folga de válvulas: adm 0,05 ±0,02 mm / esc 0,10 ±0,02 mm com motor FRIO no PMS de compressão. Ajuste por parafuso+contra-porca. Vela: NGK CR5HSB (diferente das CRF maiores — CR5, não CR8 ou D8), gap 0,6-0,7 mm, torque 14 N.m.',
  },
  {
    severity: 'OK',
    title: 'Pneus 70/100-17 (F) · 90/100-14 (R) — NHS (Not Highway Safe); calibrar 10-12 PSI (crianças) ou 14-16 PSI (adultos) em trilha; nunca abaixo de 8 PSI',
    body: 'Tamanhos exclusivos de minitrail. NHS — proibido uso em rodovias. Calibragem: crianças em trilha suave: 10-12 PSI F e R (boa conformação no terreno). Adultos leves em trilha técnica: 14-16 PSI. Nunca abaixo de 8 PSI — o aro de alumínio bate no solo em impactos e amassa. Em asfalto curto de transbordo: elevar para 18 PSI e manter velocidade abaixo de 50 km/h. Os pneus originais têm perfil semi-knobby de baixo grip em terra molhada — aftermarket knobby (Pirelli MT 32 Trial ou Dunlop Geomax MX33 Mini) dá tração muito superior em terra e lama.',
  },
  {
    severity: 'OK',
    title: 'Embreagem centrífuga automática — NÃO tem alavanca de embreagem na mão; câmbio de 4 marchas a pé (1ª↓, 2-3-4↑); ideal para crianças 6-12 anos',
    body: 'A CRF 110F não tem alavanca de embreagem na mão esquerda — usa embreagem centrífuga automática. A baixas rotações (marcha lenta): as sapatas se retraem automaticamente e a moto fica em neutro mesmo com marcha engajada. Ao acelerar: as sapatas expandem e transmitem potência. Crianças apenas trocam de marcha com o pé esquerdo. Sem kickstarter de série — toda partida é elétrica. Câmbio "errante" pela criança: produz apenas barulho, não trava nem quebra a transmissão. Velocidade máxima: ~50 km/h (relação de transmissão limitada).',
  },
  {
    severity: 'OK',
    title: 'Corrente passo 420 (menor que CRF 150F/230F) — tensão 20-25 mm; lubrificar a cada saída; corrente de série de baixa qualidade — trocar cedo',
    body: 'CRF 110F usa corrente passo 420 (não 428 ou 520 das outras CRF). A corrente de fábrica (Enuma ou similar básica) é de qualidade inferior — estica rapidamente em uso off-road com lama e vibração. Tensão correta: 20-25 mm de folga no ponto mais tenso (mais apertado que motos grandes). Verificar ANTES de cada saída. Lubrificar após uso em lama ou imersão em riacho. Kit completo: DID 420VX (X-ring) ou RK 420MXZ + coroa 37D + pinhão 14D. Trocar a cada 8.000-12.000 km de trilha intensa.',
  },
  {
    severity: 'OK',
    title: 'Carburador Keihin simples — SEMPRE fechar a torneira de combustível depois de usar; drenar copo do carburador antes de guardar mais de 30 dias',
    body: 'A CRF 110F tem carburador Keihin simples sem injeção eletrônica. Gasolina parada no copo por mais de 30 dias deixa verniz (depósito gumoso) nos jatos finos. Procedimento de guarda: (1) Fechar torneira de combustível no tanque. (2) Abrir a torneira de drenagem no fundo do copo do carburador. (3) Deixar drenar completamente. Carburador entupido: spray de carburador nos jatos após desmontar o copo — 30-45 min de serviço. Parafuso de mistura de ar de fábrica: ~+1,5 volta para fora (melhora partida a frio e marcha lenta).',
  },
  {
    severity: 'OK',
    title: 'Partida elétrica e bateria YTZ4V 12V 4Ah — usar carregador de manutenção CTEK 0.8A se moto parada >2 semanas; manter pelo menos 12,4 V em repouso',
    body: 'A bateria pequena (4Ah) descarrega em 10-15 tentativas de partida com motor não pegando. Uso correto: máximo 2-3 tentativas de partida → pausa de 30 s → nova tentativa. Após o motor pegar: manter marcha lenta por 5 min antes de acelerar (carrega a bateria). Carregador de manutenção (CTEK 0.8A ou equivalente, R$60-120) é indispensável se a moto ficar mais de 2 semanas parada. Verificar tensão com multímetro: 12,4-12,8 V em repouso após 1h = bateria saudável. Abaixo de 12,2 V: recarregar antes de usar.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar elemento de papel seco — inspecionar a cada 2 saídas de trilha; soprar de fora para dentro; NUNCA soprar de dentro para fora (rompe o papel)',
    body: 'Acesso ao filtro pelo painel lateral direito (2 parafusos Phillips). Trocar a cada 4.000 km ou quando visivelmente sujo/molhado. Filtro molhado: remover e secar completamente antes de recolocar (ou trocar). Técnica de sopro com ar comprimido: SEMPRE de fora para dentro (direção oposta ao fluxo do motor) — expele sujeira sem embutir no papel. Soprar de dentro para fora empurra sujeita para mais fundo e rompe o papel. Em trilha de pó fino: inspecionar antes de cada saída. Óleo na superfície do filtro (do respiro do motor): quantidade leve é normal; muito óleo = motor com desgaste excessivo.',
  },
  {
    severity: 'WARN',
    title: 'EPI obrigatório para crianças — capacete enduro (não aberto de rua), óculos, luvas, joelheiras, cotoveleiras e colete protetor rígido; a moto perdoa erros, a queda sem EPI não',
    body: 'A CRF 110F tem ~7 cv e velocidade máxima de ~50 km/h — perdoa erros de controle. O que não perdoa: queda sem EPI adequado. EPI obrigatório: capacete enduro certificado (proteção do queixo + viseira, não aberto de rua), óculos de trilha (não de natação), luvas com proteção das costas da mão, joelheiras+cotoveleiras de motocross, colete protetor rígido nas costas e peito. Capacete aberto de rua + óculos de sol = proteção insuficiente para off-road. Kit EPI infantil completo de qualidade (Mattos, Answer, Acerbis): R$400-800. Colete protetor Costa D30 ou similares com certificação CE Nível 2.',
  },
]

const CRF110F_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Bateria YTZ4V de 4Ah descarrega com facilidade — sem kickstarter de série; se a bateria morrer no meio da trilha, a moto não liga; manter carregador e levar jumper',
    body: 'Problema crônico: bateria pequena (4Ah) + ausência de kickstarter = moto presa no meio da trilha se a bateria morrer. Causas: partidas repetidas com motor afogado (crianças forçando muitas vezes), moto parada semanas sem carregador, problemas no carburador que atrasam a partida. Soluções preventivas: (1) Carregador de manutenção CTEK 0.8A em casa; (2) Mini jumper de bateria 12V (R$80-150) na mochila para emergências. Kit de conversão para kickstarter aftermarket existe (R$200-400) mas exige mecânico para instalação.',
  },
  {
    severity: 'WARN',
    title: 'Corrente original (passo 420) estica em 3.000-5.000 km de trilha — jogo excessivo causa pulo do pinhão em terreno irregular e pode travar a roda traseira',
    body: 'A corrente de fábrica (420 simples ou O-ring básico) estica muito rápido em uso off-road com lama, areia e impactos. Folga excessiva (>30 mm no ponto mais tenso) em minitrail: a corrente salta do pinhão traseiro em terreno irregular — isso pode travar a roda traseira e derrubar a criança abruptamente. Verificar tensão ANTES de cada saída. Substituir corrente quando não tiver mais ajuste de regulagem: kit DID 420VX (X-ring) ou RK 420MXZ dura 2-3× mais que o original. Sempre trocar coroa e pinhão junto com a corrente.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem centrífuga desgasta com adultos (>60 kg) ou uso pesado — escorregamento em aceleração indica sapatas gastas; CRF 110F não foi projetada para adultos regulares',
    body: 'As sapatas (shoes) da embreagem centrífuga são dimensionadas para crianças de 30-55 kg. Uso frequente por adultos de 60+ kg: desgaste das sapatas em 5.000-8.000 km. Sintoma: motor acelera livremente mas a moto mal avança — escorregamento. Confirmar: em marcha lenta forçar levemente a moto para frente — se andar = embreagem escorregando. Troca de shoes: peça Honda R$80-150 + mão de obra. Aviso: CRF 110F não é apropriada para uso regular por adultos acima de 60 kg — suspensão, freios e quadro também não foram projetados para esse peso.',
  },
  {
    severity: 'OK',
    title: 'Pneus originais de baixo grip em terra — perfil semi-knobby não é suficiente para terra molhada; deslizamentos frequentes em grama e lama assustam crianças iniciantes',
    body: 'Os pneus originais da CRF 110F são NHS mas têm perfil intermediário (não são knobby verdadeiros). Em terra seca: aceitável. Em terra molhada, lama fina ou grama: tração insuficiente, causando deslizamentos que assustam crianças e comprometem a confiança no aprendizado. Substituição por knobby verdadeiro (Pirelli MT 32 Trial Champion 70/100-17 F + 90/100-14 R ou Dunlop Geomax MX33 Mini): melhora de tração de 50-70% em terra molhada. Atenção: pneus knobby desgastam mais rápido em asfalto e são mais ruidosos em piso duro.',
  },
  {
    severity: 'OK',
    title: 'Freio traseiro a tambor — ajuste necessário a cada 5.000 km; lona desgasta 2-3× mais rápido em lama; pedal "mole" = lona no limite',
    body: 'Freio traseiro da CRF 110F é a tambor (não a disco). Em uso off-road com lama e areia: a lona desgasta 2-3× mais rápido que em estrada seca. Ajuste de tambor: parafuso de ajuste no eixo traseiro, feito em casa sem ferramentas especiais. Pedal que desce muito antes de frear = lona gasta. Lona Fras-le ou original Honda: R$25-50. Para crianças iniciantes: o freio a tambor tem acionamento mais progressivo que o disco, reduzindo travamentos abruptos — vantagem pedagógica para o aprendizado.',
  },
]

const CRF110F_PECAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Peças alternativas — Corrente: DID 420VX (X-ring) ou RK 420MXZ; dura 2-3× mais que o original de série; coroa 37D + pinhão 14D do mesmo fabricante',
    body: 'A corrente de série da CRF 110F é de passo 420 simples — fraca para uso off-road intenso. Alternativa: DID 420VX (X-ring, R$80-130) ou RK 420MXZ (O-ring reforçado). X-ring vs O-ring: X-ring tem vedação quadrupla e dura mais em condições úmidas. Ao trocar corrente: OBRIGATÓRIO trocar coroa e pinhão juntos (coroa e pinhão gastos aceleram o desgaste da corrente nova). Relação de transmissão padrão: pinhão 14D / coroa 37D. Kit completo DID (corrente + coroa + pinhão para 420): R$200-350.',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas — Pneus: Pirelli MT 32 Trial Champion (70/100-17 F · 90/100-14 R) ou Dunlop Geomax MX33 Mini; melhora de tração de 50-70% em terra molhada',
    body: 'Pirelli MT 32 Trial Champion: melhor custo-benefício para minitrail no Brasil. Dianteiro 70/100-17 + traseiro 90/100-14. R$120-180 por unidade. Dunlop Geomax MX33 Mini: mais agressivo em lama pesada, menor durabilidade em asfalto. Michelin StarCross 5 Mini: premium, equilíbrio terra/asfalto superior, R$180-250. Importante: antes de comprar, verificar disponibilidade local — tamanhos 70/100-17 e 90/100-14 nem sempre têm em borracharia comum. Levar pelo menos 1 pneu traseiro reserva em trilhas longas (traseiro desgasta 2× mais rápido que o dianteiro).',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas — Pastilha dianteira (disco): EBC FA129TT sintered ou Ferodo FDB555P; melhora moderação na frenagem em descidas de trilha',
    body: 'Freio dianteiro da CRF 110F é a disco com pinça de 1 pistão. Pastilha original: aceitável, mas tende ao fade (perda de frenagem) em descidas longas de trilha com acionamentos repetidos. EBC FA129TT (sintered dupla camada): melhor mordida e resistência ao fade. R$60-100 o par. Ferodo FDB555P: boa resistência a acionamentos repetidos. Troca: inspecionar a cada 5.000 km — em trilha intensa pode chegar a 3.000 km. Espessura mínima: 2 mm (abaixo disso, pastilha raspa o disco e danifica o rotor).',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas — Protetor de cárter aftermarket de alumínio 3-4 mm; indispensável em trilha técnica com pedras e raízes; cárter fino de origem não resiste a impactos',
    body: 'O cárter do motor da CRF 110F é de alumínio fino e fica baixo ao solo. Em trilha técnica com pedras, roots (raízes) e buracos: impactos fortes rompem o cárter e o motor perde todo o óleo em segundos (destruição do motor). Protetor de cárter aftermarket em alumínio 3-4 mm: R$150-300. Marcas: Acerbis, Polisport, fabricantes nacionais. Também disponíveis: protetores completos (cárter + laterais de motor + proteção da carenagem inferior). Em trilha técnica com crianças: protetor de cárter é item obrigatório — crianças caem mais e com menor controle da trajetória.',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas — Alavancas dobráveis de alumínio (freio/câmbio de pé) e protetor de mão (handguard); reduz quebras em quedas e protege os dedos da criança',
    body: 'Alavancas originais da CRF 110F são de aço e quebram/dobram de forma permanente em quedas. Alavancas dobráveis de alumínio (Acerbis ou equivalente): se dobram no impacto sem quebrar e são reposicionadas facilmente. R$40-80 por alavanca. Protetor de mão (handguard) Acerbis Rally 3.0 ou similar: evita que galhos quebrem os dedos da criança em trilha fechada e protege a alavanca de freio em quedas laterais. R$50-120 o par. Manoplas de EVA ou gel (substituindo as originais): reduz vibração em trilha longa e melhora a fixação com luvas de motocross.',
  },
]

// ─── Tire Pressures ──────────────────────────────────────────────────────────

const TIRE_PRESSURES = [
  {
    modelName: 'CRF 250 F',
    yearFrom: 2019, yearTo: null,
    tireSize: '80/100-21 (F) · 100/100-18 (R)',
    frontPsi: 15, rearPsi: 15, frontPsiLoad: 18, rearPsiLoad: 18,
    notes: 'Pneus NHS (Not Highway Safe) de série. Trilha: 12-15 PSI. Asfalto curto: 18-20 PSI. Nunca ultrapassar 80 km/h com pneus de série. NGK LMAR7H-9DS.',
  },
  {
    modelName: 'CRF 230 F',
    yearFrom: 2006, yearTo: null,
    tireSize: '80/100-21 (F) · 100/100-18 (R)',
    frontPsi: 13, rearPsi: 13, frontPsiLoad: 17, rearPsiLoad: 17,
    notes: 'Pneus NHS de série. Trilha: 12-15 PSI F e R. Asfalto: elevar para 18-20 PSI. Motor air-cooled — evitar asfalto longo.',
  },
  {
    modelName: 'CRF 150F',
    yearFrom: 2006, yearTo: null,
    tireSize: '70/100-19 (F) · 90/100-16 (R)',
    frontPsi: 13, rearPsi: 13, frontPsiLoad: 16, rearPsiLoad: 16,
    notes: 'Trilha suave (crianças): 10-12 PSI. Adultos em trilha técnica: 14-16 PSI. Areia: 10 PSI para máxima flutuação.',
  },
  {
    modelName: 'CRF 110F',
    yearFrom: 2013, yearTo: null,
    tireSize: '70/100-17 (F) · 90/100-14 (R)',
    frontPsi: 12, rearPsi: 12, frontPsiLoad: 15, rearPsiLoad: 15,
    notes: 'Minitrail. Crianças em trilha suave: 10-12 PSI. Adultos leves: 14-16 PSI. Nunca abaixo de 8 PSI (risco de aro bater no solo).',
  },
]

// ─── Manutenção ──────────────────────────────────────────────────────────────

const makeCRF110F = (m: string, yf: number, yt: number | null): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-30 JASO MA + malha de filtro (0,65 L)', intervalKm: 2500, intervalMonths: 12, notes: '0,65 L — volume muito pequeno. Lavar malha de filtro com gasolina a cada troca. Trilha intensa: 2.000 km. JASO MA obrigatório (embreagem centrífuga úmida compartilha o óleo).', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Válvulas — inspeção e ajuste (IN 0,05 mm / EX 0,10 mm)', intervalKm: 6000, intervalMonths: null, notes: 'Motor FRIO, PMS compressão. Ajuste por parafuso+contra-porca. Trilha intensa: verificar a cada 4.000 km. Folgas apertam mais rápido em uso off-road.', priority: 'CRITICAL', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar — inspeção e troca', intervalKm: 4000, intervalMonths: null, notes: 'Poeira/pó: verificar antes de cada saída. Molhado: secar ou trocar. Soprar de fora para dentro (nunca inverter). Elemento de papel seco.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK CR5HSB — gap 0,6-0,7 mm', intervalKm: 6000, intervalMonths: null, notes: 'CR5HSB específica da CRF 110F (diferente das outras CRF: CR8ES, D8EA, etc.). Gap 0,6-0,7 mm. Torque: 14 N.m.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 420 — tensão (20-25 mm) e lubrificação', intervalKm: 300, intervalMonths: null, notes: 'Tensão: 20-25 mm no ponto mais tenso. Verificar antes de cada saída. Lubrificar após lama ou imersão. DID 420VX (X-ring) ou RK 420MXZ substituem o original.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit corrente 420 completo (corrente + coroa 37D + pinhão 14D)', intervalKm: 10000, intervalMonths: null, notes: 'Trilha intensa: 8.000 km. Sempre trocar os 3 juntos. DID 420VX ou RK 420MXZ.', priority: 'MEDIUM', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Freio traseiro a tambor — ajuste da lona', intervalKm: 5000, intervalMonths: null, notes: 'Ajuste pelo parafuso no eixo traseiro. Lona: inspecionar a cada 5.000 km. Trilha com lama: 3.000 km. Lona Honda ou Fras-le R$25-50.', priority: 'HIGH', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilha dianteira (disco) — inspeção', intervalKm: 5000, intervalMonths: null, notes: 'EBC FA129TT ou original Honda. Espessura mínima: 2 mm. Trilha: inspecionar a cada 3.000 km.', priority: 'HIGH', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Carburador — limpeza de jatos e drenagem', intervalKm: 6000, intervalMonths: null, notes: 'Moto parada >30 dias: fechar torneira + drenar copo do carburador. Spray de carburador nos jatos. Parafuso de mistura: ~+1,5 volta para fora de fábrica.', priority: 'HIGH', order: 9 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria YTZ4V 12V 4Ah — verificação semestral', intervalKm: null, intervalMonths: 6, notes: 'Repouso: ≥12,4 V. Moto parada >2 semanas: carregador de manutenção CTEK 0.8A. Sem kickstarter de série — bateria morta = moto presa no campo.', priority: 'HIGH', order: 10 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Retentores bengala convencional 31 mm — inspeção de vazamento', intervalKm: 15000, intervalMonths: null, notes: 'Bengala de 31 mm (mais fina — menor vida útil que a 35 mm das maiores). Inspeção a cada 5.000 km. Névoa oleosa na haste: troca. Óleo: Honda SS-7 10W, 45 mL por tubo.', priority: 'MEDIUM', order: 11 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Embreagem centrífuga — sapatas (shoes) — inspeção', intervalKm: 10000, intervalMonths: null, notes: 'Piloto pesado (>60 kg): verificar a cada 5.000 km. Sintoma de desgaste: motor sobe livremente mas moto não avança. Shoes Honda originais: R$80-150.', priority: 'MEDIUM', order: 12 },
]

const makeCRFTrail = (m: string, yf: number, yt: number | null, isCarb: boolean, oilL: number, hasKick: boolean): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: `Óleo 10W-30 JASO MA + malha de filtro (${oilL} L)`, intervalKm: 3000, intervalMonths: 12, notes: `${oilL} L. Malha de filtro: lavar com gasolina a cada troca. Trilha intensa: 2.500 km. JASO MA obrigatório.`, priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Válvulas — inspeção e ajuste', intervalKm: 6000, intervalMonths: null, notes: 'Motor FRIO, PMS compressão. Trilha intensa: verificar a cada 4.000 km. Ajuste por parafuso+contra-porca (exceto CRF 250F que usa calços).', priority: 'CRITICAL', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar — inspeção e troca', intervalKm: 4000, intervalMonths: null, notes: 'Poeira/pó: a cada 2.000-3.000 km. Molhado: secar ou trocar antes de usar. Borda untada com óleo de filtro.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela de ignição', intervalKm: 6000, intervalMonths: null, notes: `${isCarb ? 'NGK DR8ES ou D8EA (carburada). Gap 0,6-0,7 mm.' : 'NGK LMAR7H-9DS (CRF 250F injetada). Gap 0,8 mm.'} Torque: 14 N.m.`, priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente — lubrificação e tensão (25-35 mm)', intervalKm: 300, intervalMonths: null, notes: 'Trilha: antes de cada saída. Folga máx 35 mm. DID 428VX (CRF 150F/110F) ou 520 (CRF 230F/250F). Relubrifar após lama ou água.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas / lonas de freio + fluido DOT 4', intervalKm: 5000, intervalMonths: 24, notes: 'Trilha com lama: 3.000-4.000 km. CRF 230F/150F: freio traseiro a tambor (lona, não pastilha). Fluido: 24 meses.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Retentores bengala + óleo de bengala', intervalKm: 20000, intervalMonths: null, notes: 'Inspeção a cada 8.000 km. Névoa oleosa na haste: troca. Óleo: Honda SS-7 10W (45-60 mL por tubo dependendo do modelo).', priority: 'MEDIUM', order: 7 },
  ...(isCarb ? [{
    modelName: m, yearFrom: yf, yearTo: yt,
    component: 'Carburador — limpeza de jatos e drenagem',
    intervalKm: 6000, intervalMonths: null,
    notes: 'Moto parada >30 dias: drenar pela torneira do copo. Spray de carburador nos jatos. Parafuso de mistura: ajuste por altitude.',
    priority: 'HIGH' as const, order: 8,
  }] : []),
  ...(hasKick ? [] : [{
    modelName: m, yearFrom: yf, yearTo: yt,
    component: 'Bateria — verificação (moto com partida elétrica)',
    intervalKm: null, intervalMonths: 6,
    notes: 'Repouso: ≥12,4 V. Moto parada >2 semanas: carregador de manutenção. YTX4L-BS (110F) ou YTZ7S (250F).',
    priority: 'MEDIUM' as const, order: 9,
  }]),
]

const ALL_MANUTENCAO: MaintenanceItemInput[] = [
  ...makeCRFTrail('CRF 250 F', 2019, null,  false, 1.4, false),
  ...makeCRFTrail('CRF 230 F', 2006, null,  true,  1.2, true),
  ...makeCRFTrail('CRF 150F',  2006, null,  true,  0.9, true),
  ...makeCRF110F('CRF 110F',  2013, null),
]

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

type Block = {
  modelName: string; yearFrom: number; yearTo: number | null
  MACETES: TipInput[]; PROBLEMAS: TipInput[]; PECAS?: TipInput[]
}

const BLOCKS: Block[] = [
  { modelName: 'CRF 250 F', yearFrom: 2019, yearTo: null, MACETES: CRF250F_MACETES, PROBLEMAS: CRF250F_PROBLEMAS },
  { modelName: 'CRF 230 F', yearFrom: 2006, yearTo: null, MACETES: CRF230F_MACETES, PROBLEMAS: CRF230F_PROBLEMAS },
  { modelName: 'CRF 150F',  yearFrom: 2006, yearTo: null, MACETES: CRF150F_MACETES, PROBLEMAS: CRF150F_PROBLEMAS },
  { modelName: 'CRF 110F',  yearFrom: 2013, yearTo: null, MACETES: CRF110F_MACETES, PECAS: CRF110F_PECAS, PROBLEMAS: CRF110F_PROBLEMAS },
]

// ─── Runner ───────────────────────────────────────────────────────────────────

async function main() {
  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })

  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Honda', vehicleTypeId: motoType.id } },
    update: {}, create: { name: 'Honda', vehicleTypeId: motoType.id },
  })

  const brand = await prisma.brand.findFirstOrThrow({ where: { name: 'Honda', vehicleTypeId: motoType.id } })

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {}, create: { name: block.modelName, brandId: brand.id },
    })

    const allTips = [
      ...block.MACETES.map(t  => ({ ...t, category: 'MACETES'   as Cat })),
      ...(block.PECAS ?? []).map(t => ({ ...t, category: 'MACETES'   as Cat })),
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
    const pecasCount = block.PECAS?.length ?? 0
    console.log(`✅ ${block.modelName}: ${allTips.length} tips (${block.MACETES.length} macetes${pecasCount ? ` + ${pecasCount} peças` : ''} + ${block.PROBLEMAS.length} problemas)`)
  }

  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName } })
    await prisma.tirePressure.create({ data: tp })
    console.log(`🔵 TirePressure: ${tp.modelName}`)
  }

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: BLOCKS.map(b => b.modelName) } },
  })
  await prisma.maintenanceItem.createMany({ data: ALL_MANUTENCAO })
  console.log(`🔧 MaintenanceItems: ${ALL_MANUTENCAO.length} itens`)

  const totalTips = BLOCKS.reduce((s, b) => s + b.MACETES.length + b.PROBLEMAS.length, 0)
  console.log(`\n✅ CRF Trail seed concluído! ${BLOCKS.length} modelos, ${totalTips} tips, ${TIRE_PRESSURES.length} calibragens, ${ALL_MANUTENCAO.length} itens de manutenção`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
