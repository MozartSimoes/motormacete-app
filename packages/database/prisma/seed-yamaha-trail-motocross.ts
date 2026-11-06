// seed-yamaha-trail-motocross.ts — Yamaha trilha/enduro/motocross 4T e 2T até 250cc
// Linha: TT-R 125 (E/LE/LWE) | TT-R 230 | XT 225 | WR 250 F | XTZ 125 (E/K/XE/XK) | YZ 125 | YZ 250 | YZ 250 F | YZ 85
// Nomes FIPE reais (marca YAMAHA cod 101): "TT-R 125 E/LE/LWE", "TT-R 230", "XT 225", "WR 250 F",
//   "XTZ 125 E/K/XE/XK", "YZ 125", "YZ 250", "YZ 250 F 250cc", "YZ 85 LW 85cc"
// Execute: pnpm --filter @motormacete/database db:seed:yamaha-trail-motocross
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

// ─── TT-R 125 (E / LE / LWE) — trail infantil/júnior ──────────────────────────
// Motor: 123,7cc monocilíndrico SOHC 2 válvulas 4 tempos, refrigerado a ar | ~9-10 cv
// Carburador Mikuni de corpo pequeno | Câmbio manual 4-5 marchas (semi-automático em algumas versões)
// Pneu: 2.50-14 (F) / 3.00-12 (R) aprox. (varia por versão E/LE/LWE — aros maiores na LWE)
// Óleo: Yamalube 4 20W40 ~0,9-1,0L | Corrente 420 | Tanque ~5,3L | Produção BR: ~2003-presente

const TTR125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo Yamalube 4 20W40 — cárter compartilhado com embreagem, capacidade ~0,9-1,0L',
    body: 'A TT-R 125 (nas três versões E/LE/LWE) usa motor 4 tempos SOHC 123,7cc com lubrificação em cárter úmido — o mesmo óleo lubrifica motor, câmbio e embreagem. Use óleo com especificação JASO MA (nunca MA2 puro sem verificar compatibilidade, e nunca óleo de carro): Yamalube 4 20W40, Motul 5100 20W50, ou Lubrax Moto 4T 20W50. Capacidade aproximada 0,9-1,0L na troca sem filtro (a moto usa tela/coador, não filtro de papel). Troque a cada 1.000-1.500 km — moto de uso off-road/infantil sofre mais poeira que uso de rua.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar de espuma — o item mais crítico em uso off-road com criança/iniciante',
    body: 'Como moto de treino/trilha para iniciantes, a TT-R 125 costuma rodar em terrenos empoeirados com pilotos que ainda não têm o hábito de cuidar da manutenção. O filtro de ar de espuma precisa de óleo específico (Motul A1 Air Filter Oil, Bel-Ray Foam Filter Oil, Twin Air) — nunca óleo de motor comum, que não retém poeira da mesma forma. Limpe a cada uso intenso de trilha e sempre antes de guardar a moto — poeira acumulada no filtro seco é a causa número um de desgaste prematuro de motor nesta categoria.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK série CR (confirme código exato no manual do ano/versão) — gap ~0,6-0,7mm',
    body: 'A vela recomendada varia ligeiramente conforme o ano e a versão (E/LE/LWE) — consulte o manual do proprietário específico para confirmar o código exato NGK (geralmente família CR6HSA ou similar para motor pequeno 4T refrigerado a ar). Gap típico de 0,6-0,7mm. Troque a cada 3.000-5.000 km ou antes se a partida ficar difícil — sintoma comum quando a moto fica muito tempo parada entre usos (comum em modelo infantil/de fim de semana).',
  },
  {
    severity: 'OK',
    title: 'Corrente 420 — lubrifique após cada uso em trilha; verifique folga com frequência',
    body: 'A TT-R 125 usa corrente de passo pequeno (420), adequada à baixa potência do motor mas exposta ao mesmo abrasivo de terra e areia das motos maiores. Lubrifique com spray de corrente ou óleo 80W-90 após cada saída, sempre limpando a sujeira acumulada antes de reaplicar. Kit relação completo (pinhão + coroa + corrente 420): R$ 150-300 em lojas de peças para motos off-road.',
  },
  {
    severity: 'OK',
    title: 'Carburador Mikuni de corpo pequeno: entupimento por combustível parado é o defeito mais comum',
    body: 'Por ser moto de uso ocasional (fins de semana, treino de iniciante), é comum a gasolina ficar parada no carburador por semanas ou meses, formando verniz que entope os jatos. Sintoma: marcha lenta instável, dificuldade de partida, "afogamento". Solução preventiva: se a moto vai ficar parada por mais de 30 dias, feche o registro de combustível e dê a partida até o motor morrer por falta de gasolina no carburador (esvazia a cuba). Limpeza do carburador entupido: spray limpa-carburador ou desmontagem manual — serviço simples, R$ 60-120 em oficina de moto pequena/off-road.',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas: motor compartilha muito com a linha infantil/off-road japonesa genérica',
    body: 'A TT-R 125 tem boa disponibilidade de peças originais Yamaha no Brasil por ser vendida há muitos anos (desde ~2003). Componentes de desgaste (retentores, juntas, pastilhas, corrente/relação) também têm opções compatíveis em lojas especializadas em off-road infantil/júnior. Ao comprar peças de motor (pistão, anéis), confirme sempre a versão (E/LE/LWE podem ter pequenas variações de configuração ao longo dos anos) usando o número de chassi.',
  },
]

const TTR125_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Dificuldade de partida após período parado — combustível velho no carburador',
    body: 'Problema muito comum nesta moto de uso esporádico: depois de semanas ou meses parada, o motor não pega ou pega e morre. Causa quase sempre é combustível degradado/vernizado no carburador pequeno, que entope facilmente. Drene o combustível velho, limpe o carburador (jato principal e piloto), e abasteça com gasolina nova. Evite deixar a moto parada com tanque cheio por longos períodos sem uso.',
  },
  {
    severity: 'WARN',
    title: 'Corrente frouxa/desgastada por falta de manutenção — comum em moto de criança/iniciante',
    body: 'Por ser moto usada por pilotos iniciantes (muitas vezes crianças ou adolescentes), a rotina de verificar a folga da corrente costuma ser negligenciada pelos responsáveis. Corrente muito frouxa pode saltar do pinhão em uso mais brusco, travando a roda traseira repentinamente — risco real de queda. Ensine a checagem da folga (regra geral ~20-30mm no centro do trecho inferior) como parte da rotina antes de cada saída.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste de embreagem por uso incorreto (arrancadas com rotação muito baixa ou muito alta)',
    body: 'Pilotos iniciantes tendem a "arrastar" a embreagem em baixa rotação (medo de acelerar) ou soltar bruscamente em alta rotação — ambos desgastam o conjunto de discos prematuramente. Sintoma: embreagem patinando (moto acelera mas não ganha velocidade proporcional), ponto de acionamento mudando. Ajuste do cabo de embreagem é simples e deve ser verificado a cada poucas semanas de uso intenso de treino.',
  },
  {
    severity: 'WARN',
    title: 'Filtro de ar saturado de poeira causando perda de potência e desgaste do motor',
    body: 'Assim como toda moto off-road, o filtro de ar mal cuidado é a causa mais comum de problemas de motor na TT-R 125. Sintoma: motor "engasgando", perda de potência gradual, fumaça de escape mais escura. A prevenção (limpeza regular) é simples e barata — o reparo do motor por desgaste de cilindro não é.',
  },
  {
    severity: 'WARN',
    title: 'Amortecimento dianteiro "seco" ou vazando — bengala de curso curto sofre com uso intenso',
    body: 'A suspensão dianteira da TT-R 125, mais simples que das motos maiores da linha, pode apresentar vazamento de óleo pelo retentor após uso intenso em trilha ou pista de treino. Sintoma: mancha de óleo no tubo interno da bengala, amortecimento ficando "seco"/duro. Troca de retentor é serviço relativamente simples e barato (R$ 100-200) em oficina especializada em off-road.',
  },
]

const TTR125_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma TT-R 125 (E/LE/LWE): manutenção por quilometragem, uso misto trilha/treino',
    body: '500 km — Troca de óleo inicial (rodagem). Verificar aperto geral de parafusos (vibração solta parafusos em uso off-road). | 1.000 km — Segunda troca de óleo (Yamalube 4 20W40, ~0,9-1,0L). Limpeza do filtro de ar. | 1.500 km — Troca de óleo. Lubrificação da corrente 420 e verificação de folga. | 3.000 km — Vela (verificar gap ~0,6-0,7mm). Limpeza/ajuste do carburador se necessário. | 5.000 km — Troca da vela. Revisão da embreagem (ajuste do cabo). Inspeção de retentores da suspensão dianteira. Antes de cada uso em trilha: sempre limpar o filtro de ar se a moto ficou parada por muito tempo ou rodou em terreno muito empoeirado na saída anterior.',
  },
]

// ─── TT-R 230 — trail maior, dual-sport leve ──────────────────────────────────
// Motor: 223cc monocilíndrico OHC 2 válvulas 4 tempos, refrigerado a ar | câmbio manual 6 marchas
// Carburador (não injetado) | Pneu: 80/100-21 (F) / 100/100-18 (R) | Tanque: 8L | Peso seco: ~107kg
// Freio: disco 220mm (F) / tambor 130mm (R) | Produção BR: modelo histórico, retomado em anos recentes

const TTR230_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo Yamalube 4 20W40 — capacidade ~1,0-1,1L sem troca de filtro / ~1,3L com desmontagem completa',
    body: 'Motor 223cc OHC refrigerado a ar com cárter úmido compartilhado (embreagem úmida) — óleo JASO MA obrigatório. Use Yamalube 4 20W40, Motul 5100 20W50 ou Lubrax Moto 4T 20W50. Capacidade: aproximadamente 1,0L na troca de rotina (sem mexer no filtro/tela), até 1,3L em desmontagem mais completa do motor. Troque a cada 2.000-3.000 km — uso constante em trilha/terra exige troca mais frequente que o padrão de moto de rua.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar de espuma: rotina inegociável no uso off-road/trilha da TT-R 230',
    body: 'Use óleo específico de filtro (Motul A1, Bel-Ray Foam Filter Oil, Twin Air) — nunca óleo de motor comum. Processo: lavar com removedor específico ou gasolina, espremer sem torcer, secar, aplicar óleo generosamente e espremer o excesso até não pingar. Em uso de trilha pesada, limpe após cada saída. Em uso mais leve (estrada de terra ocasional), a cada 1.000-1.500 km é aceitável — mas sempre inspecione visualmente antes de cada saída.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK (confirme código no manual do ano) — gap ~0,7mm; sinal de alerta é dificuldade de partida a frio',
    body: 'O motor OHC 223cc refrigerado a ar da TT-R 230 é robusto, mas a vela suja mais rápido em uso off-road com o carburador exposto a variações de altitude/temperatura em trilha. Gap típico ~0,7mm. Troque a cada 5.000-8.000 km ou antes se notar dificuldade de partida a frio ou marcha lenta instável. Custo baixo, R$ 20-35.',
  },
  {
    severity: 'OK',
    title: 'Corrente e relação: kit compatível fácil de achar — a moto usa especificação comum de trilha',
    body: 'A TT-R 230 usa corrente de passo médio (420 ou 428 conforme ano/versão — confirme no manual ou na etiqueta da corrente original antes de comprar kit de reposição). Lubrifique a cada 500-800 km ou após cada trilha em terreno lamacento/arenoso. Kit relação completo em lojas especializadas em off-road: R$ 200-400.',
  },
  {
    severity: 'OK',
    title: 'Carburador: regule a mistura ar/combustível ao mudar de altitude para trilhas em serra',
    body: 'Sendo moto carburada (sem injeção eletrônica), a TT-R 230 pode precisar de pequeno ajuste no parafuso de mistura ao rodar em altitudes muito diferentes (ex: sair do litoral para trilha de serra acima de 1.000m). Sintoma de mistura desregulada: perda de potência em altitude, marcha lenta instável. Ajuste simples pelo parafuso de ar/combustível na base do carburador — consulte um mecânico de off-road se não tiver experiência.',
  },
  {
    severity: 'OK',
    title: 'Peças e compatibilidade: boa disponibilidade via rede Yamaha e lojas de trilha',
    body: 'Por ser moto histórica da linha trail Yamaha com produção retomada em anos recentes no Brasil, peças originais têm disponibilidade razoável na rede de concessionárias. Componentes de desgaste (filtro de ar, corrente, pastilha/lona de freio, retentores de bengala) também são encontrados em lojas especializadas em motocicletas off-road/trilha a preços mais acessíveis que peças 100% originais.',
  },
]

const TTR230_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Freio traseiro a tambor: perde eficiência com lama/água — ajuste e limpeza frequentes',
    body: 'A TT-R 230 usa freio a tambor na roda traseira (130mm) — mais simples e barato que disco, mas sensível a contaminação por lama e água em trilha. Sintoma: freio traseiro "sumindo" ou ficando esponjoso após atravessar lama/rio. Solução: abrir o tambor, limpar a lona e o tambor com escova (nunca com água sob pressão direto no eixo), e reajustar a folga do pedal. Serviço simples, pode ser feito em casa com ferramentas básicas.',
  },
  {
    severity: 'WARN',
    title: 'Carburador desregulando após trilhas com muita poeira ou variação de altitude',
    body: 'Trilhas em terrenos muito empoeirados ou com grande variação de altitude podem exigir reajuste do carburador — sintoma de marcha lenta instável, morrendo em baixa rotação, ou "engasgo" na retomada de aceleração. Antes de suspeitar de problema mecânico maior, verifique se o filtro de ar está limpo (causa mais comum) e depois considere o ajuste da mistura no carburador.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pela junta do cárter ou tampa de válvulas após uso intenso em trilha',
    body: 'Vibração constante em trilha acidentada pode afrouxar parafusos da tampa de válvulas ou do cárter ao longo do tempo, causando pequenos vazamentos de óleo. Sintoma: mancha de óleo na parte inferior do motor, consumo de óleo maior que o normal entre trocas. Verifique o aperto dos parafusos do motor periodicamente (torque conforme manual) e troque a junta se o vazamento persistir — peça barata, R$ 15-40.',
  },
  {
    severity: 'WARN',
    title: 'Corrente esticando/saltando em uso de trilha mais agressivo',
    body: 'Trilha com muitos obstáculos e acelerações bruscas desgasta a corrente mais rápido que uso de estrada. Se a folga ficar excessiva, há risco de a corrente saltar do pinhão durante um obstáculo, travando a roda repentinamente. Verifique a folga antes de cada saída de trilha mais exigente.',
  },
  {
    severity: 'WARN',
    title: 'Retentor de bengala dianteira vazando após anos de uso constante em terreno irregular',
    body: 'A suspensão dianteira, com curso considerável (~240mm) adequado para trilha, tem retentores que se desgastam com a exposição a poeira e impactos frequentes. Sintoma: óleo visível no tubo interno da bengala. Troca de retentor: serviço de oficina especializada em off-road, R$ 150-300 nas duas pontas dianteiras.',
  },
]

const TTR230_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo TT-R 230: uso misto trilha/estrada de terra',
    body: '500 km — Troca de óleo inicial (rodagem, ~1,0L Yamalube 4 20W40). | 1.500 km — Troca de óleo. Lubrificar corrente. Verificar folga do freio traseiro (tambor). | 3.000 km — Troca de óleo. Limpeza do filtro de ar (ou após cada trilha pesada). Verificar gap da vela. | 5.000 km — Troca da vela NGK. Ajuste/limpeza do carburador. Inspeção da corrente/relação. | 8.000 km — Kit relação se desgastado. Retentores da bengala dianteira — inspeção. Lona do freio traseiro — inspeção de espessura. | 10.000 km — Revisão geral com mecânico especializado em off-road: folgas de válvulas, aperto geral de parafusos do motor, rolamentos de roda.',
  },
]

// ─── XT 225 — dual-sport/trail, muito equilibrada e confiável ────────────────
// Motor: 223cc monocilíndrico SOHC 2 válvulas 4 tempos, refrigerado a ar | bore/stroke 70x58mm | compressão 9,5:1
// Potência: ~19 cv @ 8.000 rpm | Torque: ~1,8 kgf.m @ 7.000 rpm | Carburador (não injetada)
// Óleo: Yamalube 4 20W40, ~1,0-1,3L conforme troca de filtro | Câmbio manual 5-6 marchas
// Produção BR: 1993-2008 aprox. — moto muito popular e confiável, ainda muito usada

const XT225_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo Yamalube 4 20W40 — 1,0L (rotina) a 1,3L (com filtro/desmontagem), troque a cada 3.000 km',
    body: 'Motor 223cc SOHC 2 válvulas refrigerado a ar, bore/stroke 70x58mm, compressão 9,5:1. Capacidade de óleo: 1,0L na troca simples, 1,1-1,3L quando envolve remoção completa/filtro. Use SAE 20W40 API SE/SF/SG/SH/SJ com especificação JASO MA (cárter compartilhado com embreagem úmida): Yamalube 4 20W40 (linha original), Motul 5100 20W50, Lubrax Moto 4T 20W50. Intervalo: 3.000 km ou 6 meses — a XT 225 é conhecida por ser muito durável quando o óleo é trocado em dia.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar de espuma: item que faz a diferença na longevidade lendária desta moto',
    body: 'Parte da fama de confiabilidade da XT 225 vem da simplicidade do motor e da atenção que os proprietários historicamente dão ao filtro de ar — item crítico em uso off-road. Use óleo específico (Motul A1, Bel-Ray Foam Filter Oil) e limpe a cada 1.000-1.500 km em uso misto, ou após cada trilha mais pesada. Nunca rode sem o filtro "para ganhar potência" — é o erro mais caro que se pode cometer nesta moto.',
  },
  {
    severity: 'OK',
    title: 'Vela e carburador: motor simples e tolerante, mas exige gasolina de qualidade',
    body: 'A XT 225 usa carburador simples (sem injeção) que é sensível a etanol degradado quando a moto fica parada por longos períodos — sintoma de marcha lenta instável ou dificuldade de partida. Vela recomendada: família NGK CR/DR conforme o ano (confirme no manual — geralmente DR8ES ou similar para este motor). Gap aproximado 0,6-0,7mm. Troque a cada 5.000-8.000 km.',
  },
  {
    severity: 'OK',
    title: 'Corrente e relação: manutenção simples, kit compatível amplamente disponível',
    body: 'Lubrifique a corrente a cada 500-800 km ou após uso em trilha lamacenta. Kit relação (pinhão + coroa + corrente) para a XT 225: amplamente encontrado em lojas de peças para motos off-road/trilha, por ser moto muito popular no Brasil mesmo fora de linha — R$ 180-350 o kit completo.',
  },
  {
    severity: 'OK',
    title: 'Peças: moto fora de linha mas com excelente disponibilidade por ter sido muito vendida',
    body: 'A XT 225 saiu de linha há anos, mas por ter sido extremamente popular no Brasil (referência em confiabilidade na categoria trail/dual-sport), peças de desgaste (filtro, corrente, pastilhas, retentores, juntas) continuam fáceis de encontrar — tanto originais em concessionárias quanto compatíveis em lojas especializadas em off-road. Peças de motor mais específicas (pistão, comando de válvulas) podem exigir busca em desmontes ou fóruns de proprietários (grupos "XT 225 Brasil" nas redes sociais são boa fonte de indicação).',
  },
  {
    severity: 'OK',
    title: 'Folga de válvulas: intervalo generoso, mas não pule a revisão — motor SOHC simples de ajustar',
    body: 'O motor SOHC 2 válvulas da XT 225 tem sistema de ajuste de válvulas por parafuso e contra-porca (não usa pastilhas/shims), o que torna a regulagem relativamente simples e barata em qualquer oficina de moto. Verifique a cada 6.000-10.000 km — folga fora de especificação causa desde ruído até perda de compressão e dificuldade de partida a frio.',
  },
]

const XT225_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Combustível degradado no carburador após longos períodos parada — problema recorrente em moto antiga',
    body: 'Por ser moto com muitas unidades já com 15-25+ anos de uso, é comum encontrar exemplares que ficam parados por meses. O carburador simples da XT 225 sofre com verniz de gasolina/etanol degradado, causando entupimento de jatos. Sintoma: não pega, pega e morre, marcha lenta instável. Solução: limpeza completa do carburador (jato principal, piloto, agulha da boia) — serviço de R$ 80-150 em oficina especializada em carburador.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo por juntas ressecadas em unidades mais antigas',
    body: 'Motos com muitos anos de uso (a XT 225 é linha antiga, produção encerrada há tempo) frequentemente apresentam juntas do motor ressecadas — cabeçote, cárter, tampa de válvulas. Sintoma: manchas de óleo, consumo de óleo maior que o normal. Substituição de juntas é serviço relativamente barato (peças R$ 20-60 cada) mas exige desmontagem parcial do motor — planejamento de mão de obra maior.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão em peças de metal por unidades usadas intensamente em trilha/praia',
    body: 'Moto muito usada em trilha litorânea e regiões úmidas — a exposição a maresia e lama acelera a corrosão de peças metálicas expostas (parafusos, corrente, sistema de escape). Lave a moto após uso em ambiente salino ou muito úmido, e aplique óleo protetor em partes metálicas expostas regularmente.',
  },
  {
    severity: 'WARN',
    title: 'Retentor de bengala vazando — comum em unidades com muitos anos/km rodados',
    body: 'Dada a idade média das unidades em circulação, o vazamento de óleo pela bengala dianteira é queixa recorrente entre proprietários. Sintoma: óleo escuro no tubo interno da bengala, amortecimento perdendo eficiência. Peça genérica compatível disponível em lojas de suspensão para motos off-road — troca custa R$ 150-300 de mão de obra + peça.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste do conjunto de embreagem em unidades com muito uso off-road',
    body: 'Uso intenso em trilha (arrancadas, subidas íngremes com embreagem parcialmente acionada) desgasta os discos de embreagem mais rápido que uso de estrada. Sintoma: patinação sob carga, especialmente em subidas. Kit de discos de embreagem compatível: R$ 150-300, serviço relativamente simples.',
  },
]

const XT225_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo XT 225 — moto conhecida pela longevidade quando bem mantida',
    body: '500 km — Troca de óleo inicial (rodagem). | 1.500 km — Troca de óleo (Yamalube 4 20W40, ~1,0L). Lubrificar corrente. | 3.000 km — Troca de óleo. Limpeza do filtro de ar. Verificar gap da vela. | 6.000 km — Troca da vela. Folga de válvulas (ajuste por parafuso/contra-porca). | 8.000 km — Kit relação se desgastado. Inspeção de retentores da bengala dianteira. | 10.000 km — Revisão geral: carburador (limpeza preventiva), rolamentos de roda, lona/pastilha de freio, juntas do motor (inspeção visual de vazamento). Para unidades com muitos anos parada: sempre drenar e trocar o combustível e revisar o carburador antes de voltar a rodar.',
  },
]

// ─── WR 250 F — enduro/motocross competitivo 4 tempos ────────────────────────
// Motor: ~250cc (bore/stroke 77,0x53,6mm) DOHC 4 válvulas, refrigerado a líquido | compressão 13,5:1
// Injeção eletrônica (EFI) | ~30cv | Câmbio manual 6 marchas | Embreagem multidisco úmida
// Óleo: sintético 10W-50/10W-40 JASO MA2, ~1,1L | Vela NGK CR8E (anos 2001-2013; iridium em anos recentes)
// Pneu: 90/90-21 (F) / 130/90-18 (R) | Corrente 520 | Enduro/trilha competitiva, uso por horas

const WR250F_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo sintético JASO MA2 ~1,1L — motor DOHC de alta rotação exige troca frequente',
    body: 'A WR 250 F usa motor DOHC 4 válvulas de alta performance, capacidade de óleo aproximada 1,1L. Use óleo sintético JASO MA2 (essencial — embreagem multidisco úmida): Motul 300V 4T Factory Line 10W-50 (uso competitivo), Motul 7100 10W-50 (uso regular), Bel-Ray EXS 10W-50. Troque a cada 8-15 horas de uso conforme intensidade (competição/enduro pesado no limite inferior, trilha recreativa mais leve no limite superior) — equivalente aproximado a 250-500 km rodados.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR8E (anos ~2001-2013) — confirme código para o ano específico, pode ser iridium em versões recentes',
    body: 'A vela NGK CR8E é a referência histórica para a WR250F (mesma especificação da YZ250F do período equivalente). Anos mais recentes podem usar vela iridium de rosca longa (verifique o manual do seu ano específico, pois a Yamaha atualizou a especificação ao longo da produção). Troque a cada 15-25 horas de uso — a versão iridium dura mais que a convencional CR8E.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: crítico como em qualquer moto de enduro/motocross — limpe após cada saída em trilha',
    body: 'Use óleo específico de filtro de espuma (Twin Air Filter Oil, Motul A1, Bel-Ray Foam Filter Oil) — nunca óleo de motor comum. A WR250F é usada tanto em enduro (trilha longa) quanto em pista, e em ambos os casos a exposição à poeira é constante. Limpe o filtro após cada dia de uso — é o item que mais protege o investimento em um motor de alta performance como este.',
  },
  {
    severity: 'OK',
    title: 'Injeção eletrônica (EFI): facilita partida e resposta em diferentes altitudes vs. versões carburadas antigas',
    body: 'A WR250F com injeção eletrônica (anos mais recentes) dispensa o ajuste manual de carburador para diferentes altitudes — a ECU compensa automaticamente. Mantenha a bateria com boa carga (mesmo sendo moto de partida elétrica/coice conforme versão) para garantir funcionamento correto do sistema de injeção. Se notar falha de partida ou marcha lenta irregular, verifique primeiro o filtro de ar antes de suspeitar da injeção.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 + kit relação — ajuste a relação conforme o tipo de uso (enduro fechado vs. trilha aberta)',
    body: 'A WR250F usa corrente 520, compatível com kits DID ou RK disponíveis em lojas especializadas em off-road/enduro: R$ 350-600. Pilotos de enduro técnico (mais fechado, subidas) costumam usar coroa maior (relação mais curta) que pilotos de trilha aberta/rally. Lubrifique após cada uso com spray específico para off-road.',
  },
  {
    severity: 'OK',
    title: 'Peças: boa disponibilidade por compartilhar muito com a linha de competição YZ250F',
    body: 'O motor da WR250F é tecnicamente muito próximo do motor da YZ250F (motocross), com ajustes voltados para uso mais versátil de enduro/trilha (mapa de injeção diferente, marchas mais longas, embreagem e suspensão calibradas para uso prolongado). Isso significa boa disponibilidade de peças de reforma (pistão, anéis, kits de válvula) via importadores especializados em off-road Yamaha/motocross no Brasil.',
  },
]

const WR250F_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Desgaste de válvulas por uso intenso em alta rotação — verificação de folga é item crítico',
    body: 'O motor DOHC de alta performance da WR250F desgasta a folga de válvulas com uso intenso, especialmente em enduro competitivo ou trilha em alta rotação constante. Sintoma: motor barulhento (tique-taque metálico), perda de performance na faixa alta, dificuldade de partida a frio. Verificação recomendada a cada 15-20 horas de uso mais exigente — serviço de mecânico especializado com jogo de pastilhas (shims).',
  },
  {
    severity: 'WARN',
    title: 'Entupimento de filtro de ar por poeira — causa mais comum de desgaste prematuro',
    body: 'Mesmo sendo moto de enduro (uso mais "de trilha" que motocross puro), a WR250F sofre igualmente com filtro de ar mal cuidado. Sinais de alerta: perda de compressão, consumo de óleo aumentando entre trocas, fumaça de escape mais intensa. A rotina de limpeza após cada saída é a prevenção mais barata contra o reparo de motor mais caro da categoria.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de retentor de suspensão dianteira/traseira em uso prolongado de enduro',
    body: 'A suspensão de alto desempenho da WR250F sofre desgaste de retentores com uso constante em terreno irregular por longas distâncias (característica do enduro, diferente do motocross que é uso mais curto e intenso). Sintoma dianteiro: óleo visível no tubo interno da bengala. Sintoma traseiro: perda de amortecimento, vazamento no corpo do amortecedor. Reforma completa recomendada a cada temporada de uso intenso — R$ 400-700 de serviço especializado.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem: desgaste acelerado em uso de enduro técnico (muita troca de marcha, subidas)',
    body: 'Enduro técnico exige uso constante da embreagem em subidas, obstáculos e trechos técnicos — desgaste maior que em uso de motocross de pista aberta. Sintoma: patinação sob carga em subidas, ponto de acionamento mudando. Discos e molas de embreagem são consumíveis — inspecionar a cada 20-30 horas de uso intenso.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento em trilhas muito lentas/técnicas com pouco fluxo de ar no radiador',
    body: 'Como a WR250F é refrigerada a líquido, o uso em trilhas muito lentas e técnicas (velocidade baixa constante, pouco vento no radiador) pode elevar a temperatura do motor mais que em uso de motocross com velocidades maiores. Verifique o nível do líquido de arrefecimento antes de cada saída e evite prolongar demais o motor em marcha lenta em terreno muito lento sem necessidade.',
  },
]

const WR250F_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma WR250F por HORAS de uso — motor de competição/enduro exige atenção redobrada',
    body: 'Manutenção por horas de motor, não apenas por km — em enduro/trilha técnica, 1 hora de uso equivale a aproximadamente 20-35 km rodados (varia muito conforme o tipo de terreno). A CADA SAÍDA — limpar filtro de ar, verificar folga de corrente, nível de líquido de arrefecimento. A cada 8-15 horas (~250-500 km) — trocar óleo do motor (1,1L sintético JASO MA2). A cada 15-20 horas — verificar folga de válvulas, inspecionar embreagem, trocar vela. A cada 20-30 horas — corrente/pinhão/coroa, inspeção/reforma de suspensão dianteira e traseira, revisão geral de motor por mecânico especializado em off-road/enduro antes de temporada de uso mais intenso.',
  },
]

// ─── XTZ 125 (E / K / XE / XK) — trail de entrada ─────────────────────────────
// Motor: 123,7cc monocilíndrico OHC 2 válvulas 4 tempos, refrigerado a ar | ~10,9 cv @ 7.500 rpm
// Torque: ~1,11 kgf.m @ 6.000 rpm | Câmbio manual 5 marchas | Tanque: ~10,6L | Peso seco: ~105kg
// Versões: E = freio a disco dianteiro / K = freio a tambor dianteiro (linha base)
//          XE = Concept X com partida elétrica / XK = Concept X com partida a pedal (pintura preta no motor)
// Predecessora conceitual da linha Crosser/Lander (motor menor, mesma proposta trail de entrada)

const XTZ125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Diferenças entre as versões E/K/XE/XK antes de comprar peças ou seguir o manual certo',
    body: 'A XTZ 125 teve quatro variantes: a linha base tinha a versão K (freio a tambor dianteiro, mais econômica) e a versão E (freio a disco dianteiro). A linha "Concept X" trouxe a XTZ 125 XK (visual com pintura preta no motor, partida a pedal) e a XTZ 125 XE (mesmo visual Concept X, mas com partida elétrica). Mecanicamente o motor é o mesmo 123,7cc em todas — as diferenças são de freio dianteiro e sistema de partida. Confirme sua versão antes de comprar peças de freio ou do sistema de partida.',
  },
  {
    severity: 'OK',
    title: 'Óleo Yamalube 4 20W40 — motor pequeno e simples, capacidade ~0,9-1,0L',
    body: 'Motor 123,7cc OHC refrigerado a ar com cárter úmido (embreagem compartilha óleo) — use óleo JASO MA: Yamalube 4 20W40, Motul 5100 20W50, Lubrax Moto 4T 20W50. Capacidade aproximada 0,9-1,0L. Troque a cada 3.000 km ou 6 meses — motor de baixa cilindrada tolera bem o uso, mas a troca regular prolonga muito a vida útil, especialmente em uso urbano + trilha leve combinado (perfil típico do dono desta moto).',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: mesma importância de toda moto trail, mesmo sendo de uso misto urbano/trilha leve',
    body: 'Muitos donos de XTZ 125 usam a moto principalmente na cidade com passeios ocasionais em estrada de terra ou trilha leve — mas isso não reduz a importância do filtro de ar. Use óleo específico de filtro (Motul A1, Bel-Ray Foam Filter Oil) e limpe a cada 2.000-3.000 km em uso misto, ou mais frequentemente se usar bastante em terra/poeira.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK (confirme código no manual do ano) — gap ~0,6-0,7mm; troca a cada 5.000-8.000 km',
    body: 'Motor pequeno e de baixa exigência — vela recomendada geralmente na família NGK CR/DR conforme o ano específico (confirme no manual). Gap aproximado 0,6-0,7mm. Sintoma de vela gasta: partida a frio mais difícil, leve perda de resposta em baixa rotação. Custo baixo, R$ 15-30.',
  },
  {
    severity: 'OK',
    title: 'Corrente e relação: manutenção simples de moto de entrada, kit acessível',
    body: 'Lubrifique a corrente a cada 500-800 km, mais frequentemente se usar em terra/poeira com regularidade. Kit relação completo para a XTZ 125: amplamente disponível por ser moto muito popular no Brasil (predecessora conceitual da linha Crosser/Lander) — R$ 150-280 o kit completo em lojas de peças para moto.',
  },
  {
    severity: 'OK',
    title: 'Peças: excelente disponibilidade — moto muito vendida e ainda com forte presença nas ruas',
    body: 'A XTZ 125, em suas quatro versões, foi moto muito popular como primeira trail de muitos motociclistas brasileiros. Isso garante ótima disponibilidade de peças, tanto originais na rede Yamaha quanto compatíveis em lojas de autopeças de moto — praticamente qualquer item de desgaste (filtro, corrente, pastilha, retentor) é fácil de encontrar em qualquer cidade.',
  },
]

const XTZ125_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Freio a tambor dianteiro (versões K/XK): menos eficiente que disco, exige ajuste mais frequente',
    body: 'As versões K e XK (com freio a tambor dianteiro) têm frenagem menos potente e mais sensível a desgaste/desregulagem que as versões E/XE com disco. Sintoma: pedal/manete "fundo" antes de frear, frenagem menos responsiva. Ajuste da folga do cabo/haste do tambor deve ser verificado a cada poucas semanas de uso regular — procedimento simples que qualquer proprietário pode aprender a fazer.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste do sistema de partida elétrica (versões E/XE) — motor de arranque ou bateria fraca',
    body: 'Nas versões com partida elétrica (E e XE), problemas de partida geralmente vêm de bateria fraca (comum em moto que fica parada por dias) ou desgaste do motor de arranque com o tempo de uso. Sempre tenha a opção de partida a pedal (E) ou verifique se sua versão XE tem essa opção como backup. Bateria recomendada: verificar especificação no manual — geralmente selada tipo YTZ pequena. Trocar preventivamente a cada 2-3 anos.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pela junta do cárter em unidades com muitos anos de uso',
    body: 'Como a XTZ 125 tem muitas unidades já com 10+ anos de uso, é comum encontrar vazamentos pequenos de óleo pela junta do cárter ou tampa de válvulas, causados por ressecamento natural das juntas. Sintoma: mancha de óleo na parte inferior do motor. Substituição das juntas é serviço barato (peças R$ 15-40) mas requer desmontagem parcial.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão em partes metálicas por uso misto urbano/trilha sem lavagem adequada',
    body: 'Uso misto (rua + trilha leve + eventual exposição a chuva/lama) sem lavagem regular acelera a corrosão de partes metálicas expostas, especialmente corrente, parafusos do motor e sistema de escape. Lave a moto regularmente e lubrifique a corrente após exposição à lama ou água.',
  },
  {
    severity: 'WARN',
    title: 'Carburador entupido após períodos parada — comum em moto de uso não diário',
    body: 'Combustível degradado (etanol vernizado) no carburador simples da XTZ 125 causa entupimento dos jatos após semanas paradas. Sintoma: dificuldade de partida, marcha lenta instável. Limpeza do carburador: serviço de R$ 60-120 em qualquer oficina de moto.',
  },
]

const XTZ125_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo XTZ 125 (todas as versões E/K/XE/XK) — uso misto urbano/trilha leve',
    body: '500 km — Troca de óleo inicial (rodagem, ~0,9-1,0L Yamalube 4 20W40). | 1.500 km — Troca de óleo. Lubrificar corrente. | 3.000 km — Troca de óleo. Limpeza do filtro de ar. Verificar gap da vela. Ajuste de folga do freio a tambor (versões K/XK). | 5.000 km — Troca da vela. Folga de válvulas. Inspeção da bateria (versões E/XE com partida elétrica). | 8.000 km — Kit relação se desgastado. Pastilha (versões E/XE) ou lona (K/XK) de freio dianteiro — inspeção. | 10.000 km — Revisão geral: rolamentos de roda, juntas do motor (inspeção de vazamento), carburador (limpeza preventiva se moto ficou parada por longos períodos).',
  },
]

// ─── YZ 125 — motocross competição 2 tempos ───────────────────────────────────
// Motor: 124cc monocilíndrico 2 tempos refrigerado a líquido, sistema YPVS (válvula de escape) | ~35-38cv
// Carburador Keihin PWK 38,1mm com Power Jet | Câmbio manual 6 marchas | Mistura de combustível 2T
// Tanque: 7,0L | Corrente: 520 | Pneu: 80/100-21 (F) / 100/90-19 (R) | Categoria motocross competitiva

const YZ125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'ATENÇÃO: esta é a versão 2 TEMPOS da YZ125 — mistura de combustível obrigatória, sem cárter de óleo de motor',
    body: 'A YZ 125 é motor 2 tempos puro — não tem óleo de motor separado, a lubrificação vem da mistura de óleo na gasolina. Proporção recomendada gira próxima de 32:1 a 40:1 conforme o óleo usado (a Yamaha historicamente recomenda Yamalube 2R a 50:1 nas formulações mais recentes — sempre confirme na embalagem do óleo escolhido, pois a proporção varia por marca/formulação). Óleos de competição recomendados: Yamalube 2R, Motul 800 2T Factory Line, Bel-Ray SI-7. Nunca reutilize mistura de dias/semanas anteriores — combustível 2T degradado perde lubrificação.',
  },
  {
    severity: 'OK',
    title: 'Carburador Keihin PWK 38,1mm com Power Jet — a "alma" da entrega de potência desta moto',
    body: 'O carburador Keihin PWK de 38,1mm com injetor de força "Power Jet" é responsável pela resposta explosiva característica da YZ125. A regulagem correta dos jatos (piloto, principal, agulha) depende de altitude, temperatura e umidade do dia de treino/prova — pilotos de competição ajustam o jato principal conforme a tabela de referência do manual para cada condição climática. Jato entupido ou mal regulado é causa comum de "buraco" na aceleração ou perda de potência em alta rotação.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: motor 2T de alta rotação é extremamente sensível a poeira — limpeza após CADA uso',
    body: 'O motor 2T de competição da YZ125 tem folgas internas muito justas — qualquer partícula de poeira que passe pelo filtro acelera o desgaste do cilindro/pistão de forma dramática. Use óleo específico (Twin Air Filter Oil, Motul A1, Bel-Ray Foam Filter Oil) e limpe religiosamente após cada sessão de treino ou prova, sem exceção.',
  },
  {
    severity: 'OK',
    title: 'Vela: família NGK BR8ES-BR9EG conforme jato/altitude — "leitura da vela" ensina a regular a mistura',
    body: 'A vela varia conforme a regulagem do carburador para o dia — consulte a tabela do manual. A técnica de "leitura da vela" (acelerar a fundo e desligar imediatamente, depois observar a cor do eletrodo) é clássica para verificar a mistura ar/combustível: marrom-claro = ideal, branco/queimado = mistura pobre (risco real de gripagem), preto fuliginoso = mistura rica ou filtro sujo. Troque a vela a cada 10-15 horas de uso.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 + kit relação — categoria de alta potência específica exige corrente robusta',
    body: 'A YZ125 usa corrente 520 compatível com kits DID ou RK, disponíveis em lojas especializadas em motocross no Brasil (R$ 300-550). Lubrifique após cada sessão com spray específico (Motul C2, Bel-Ray, Maxima Chain Wax) — nunca óleo de motor puro, que "voa" com a rotação alta do 2T.',
  },
  {
    severity: 'OK',
    title: 'Válvula de escape YPVS: limpeza periódica evita perda de potência na faixa média',
    body: 'O sistema YPVS (Yamaha Power Valve System) controla o timing de abertura do escape conforme a rotação, otimizando a curva de potência. Acumula carbono com o uso e pode perder eficiência — sintoma: resposta "morna" na faixa média de rotação. Limpeza recomendada a cada 15-20 horas de uso em oficina especializada em motocross 2T.',
  },
]

const YZ125_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Gripagem por mistura incorreta ou combustível de baixa qualidade — risco real em moto de alta performance',
    body: 'A YZ125 roda em rotações muito altas, tornando-a sensível a erros de mistura de combustível. Mistura pobre em óleo, gasolina de baixa qualidade, ou vela com grau térmico incorreto podem causar gripagem em minutos de uso em alta rotação. Sinais de alerta: perda súbita de potência, motor "travando" momentaneamente, ruído metálico agudo. Pare imediatamente ao notar qualquer sintoma.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste severo de pistão/anéis por uso competitivo — item de reposição regular, não defeito',
    body: 'Motores 2T de competição desgastam pistão e anéis muito mais rápido que 4 tempos equivalentes — característica da categoria. Pilotos competitivos trocam pistão/anéis a cada 20-30 horas de uso intenso; uso recreativo mais leve estende esse intervalo. Sintoma de desgaste: queda de compressão, perda de potência, consumo de mistura aumentando.',
  },
  {
    severity: 'WARN',
    title: 'Entupimento de filtro de ar causando desgaste prematuro do cilindro',
    body: 'Pular a limpeza do filtro entre sessões acelera drasticamente o desgaste do motor 2T de alta performance, com folgas mais justas que um 4 tempos equivalente. Consumo de mistura aumentando e fumaça de escape mais intensa são sinais de alerta precoce.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de retentor de suspensão dianteira — comum após temporada de uso competitivo',
    body: 'A bengala dianteira sofre desgaste de retentor com o uso intenso em saltos e terreno irregular típico de motocross. Sintoma: óleo visível no tubo interno, perda de amortecimento progressiva. Reforma de suspensão completa recomendada a cada temporada de competição, R$ 300-600 de serviço especializado.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem: patinação sob carga em pilotos que abusam da alavanca em largadas',
    body: 'A embreagem multidisco sofre desgaste acelerado com uso agressivo em largadas de competição. Sintoma: patinação em acelerações fortes, cheiro de queimado. Discos e molas de embreagem são consumíveis de competição — muitos pilotos trocam preventivamente antes de provas importantes.',
  },
]

const YZ125_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma YZ125 por HORAS de uso — moto de competição exige atenção redobrada (diferente de manutenção por km de moto de rua)',
    body: 'Manutenção por horas de motor rodando, não por quilometragem — em motocross, a distância percorrida tem pouca relação com o desgaste real, já que o motor trabalha sempre em alta rotação. Referência aproximada: 1 hora de motocross equivale a ~30-40 km rodados. A CADA TREINO/PROVA — limpar filtro de ar, verificar folga de corrente e nível de combustível/mistura fresca. A cada 10-15 horas (~350-500 km) — trocar vela, limpar válvula de escape (YPVS). A cada 15-20 horas (~500-700 km) — corrente/pinhão/coroa, inspeção de suspensão dianteira/traseira, embreagem. A cada 20-30 horas (~700-1.100 km) — reforma de pistão/anéis (padrão para uso competitivo intenso, não é defeito).',
  },
]

// ─── YZ 250 — motocross competição 2 tempos ───────────────────────────────────
// Motor: 249cc monocilíndrico 2 tempos refrigerado a líquido, sistema YPVS | ~48cv, ~3,2kgf.m de torque
// Carburador Keihin com Power Jet | Câmbio manual 5 marchas | Tanque: 7,9L | Corrente: 520
// NOTA: existe também a YZ 250 F (4 tempos, DOHC) — moto DIFERENTE, tratada em bloco separado abaixo.
// A ficha FIPE lista "YZ 250" (esta, 2T) e "YZ 250 F 250cc" (a 4T) como registros distintos.

const YZ250_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'ATENÇÃO: esta é a YZ 250 clássica 2 TEMPOS — não confundir com a YZ 250 F (4 tempos, moto diferente)',
    body: 'A Yamaha vende duas motos de 250cc na linha de motocross com nomes parecidos: a YZ 250 (2 tempos, motor 249cc com mistura de combustível) e a YZ 250 F (4 tempos, motor DOHC com óleo de motor separado). São motores completamente diferentes — mistura, óleo, vela e intervalos de manutenção NÃO são intercambiáveis. Confirme sempre no manual/etiqueta da sua moto qual versão você tem. Este bloco de dicas é específico para a versão 2 TEMPOS.',
  },
  {
    severity: 'OK',
    title: 'Mistura de combustível: proporção conforme o óleo (referência Yamalube 2R ~50:1) — sem cárter de óleo separado',
    body: 'Motor 2 tempos puro, sem óleo de motor — a lubrificação vem 100% da mistura de óleo na gasolina. Proporção recomendada: confirme sempre na embalagem do óleo específico usado (a Yamaha referencia o Yamalube 2R a 50:1 em formulações recentes; outras marcas de competição costumam usar 32:1 a 40:1 para uso mais intenso). Óleos recomendados: Yamalube 2R, Motul 800 2T Factory Line, Bel-Ray SI-7, Maxima Castor 927. Prepare mistura fresca a cada sessão — nunca guarde sobra por semanas.',
  },
  {
    severity: 'OK',
    title: 'Motor de maior torque que a YZ125 — filtro de ar ainda mais crítico com o maior fluxo de ar admitido',
    body: 'O motor 249cc de maior cilindrada tem maior volume de ar admitido que a YZ125, o que também significa mais poeira potencialmente entrando no motor em uso off-road. Use óleo específico de filtro (Twin Air Filter Oil, Motul A1, Bel-Ray Foam Filter Oil) e limpe após CADA sessão de treino ou prova, sem exceção — a folga maior do motor de 250cc não o torna mais tolerante a poeira.',
  },
  {
    severity: 'OK',
    title: 'Vela: família NGK BR8ES-BR9EG conforme regulagem — grau térmico correto evita detonação',
    body: 'Como o motor entrega bastante torque desde baixas rotações, o grau térmico da vela precisa estar corretamente ajustado à altitude e ao clima de uso — vela com grau muito quente pode causar detonação, muito frio causa acúmulo de carbono. Confirme o código exato no manual do ano. Troca preventiva a cada 10-15 horas de uso competitivo.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 reforçada — torque elevado desgasta relação mais rápido que a YZ125',
    body: 'O torque maior da YZ250 (2T) desgasta corrente e relação mais rápido que a YZ125 equivalente. Kits de relação DID ou RK premium (com O-ring/X-ring para maior durabilidade): R$ 400-650. Lubrifique após cada sessão de uso — corrente seca nesta moto de alto torque desgasta visivelmente mais rápido.',
  },
  {
    severity: 'OK',
    title: 'Reforma de pistão preventiva: norma na categoria, não sinal de defeito',
    body: 'Assim como toda 2T de competição, pistão e anéis são consumíveis que precisam de reforma preventiva regular — não espere o motor perder compressão de forma perceptível para agir. Kits de pistão (Wossner, Pro-X, Wiseco, ou original Yamaha) disponíveis via importadores especializados em motocross no Brasil: R$ 500-1.000 dependendo da marca.',
  },
]

const YZ250_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Gripagem por mistura incorreta — motor de maior cilindrada 2T tem menor margem de erro que a YZ125',
    body: 'O motor 249cc, sendo maior que o da YZ125, sofre danos mais caros quando a mistura de combustível está incorreta ou o filtro de ar está sujo. Sinais de alerta: perda súbita de potência, motor "travando" momentaneamente em alta rotação, ruído metálico agudo vindo do cilindro. Pare imediatamente — o custo de reparo de cilindro/pistão de 250cc é maior que em motos menores.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste severo de pistão/anéis por uso competitivo — troca preventiva é a norma nesta categoria',
    body: 'Assim como as demais 2T da linha, pistão e anéis são consumíveis de competição. Muitos pilotos trocam a cada 20-30 horas de uso intenso. Sintoma de desgaste: queda de compressão, fumaça de escape mais intensa, perda de potência progressiva.',
  },
  {
    severity: 'WARN',
    title: 'Entupimento de filtro de ar causando desgaste prematuro — mesmo padrão de toda a linha 2T',
    body: 'A negligência na limpeza do filtro entre sessões é a causa mais comum de desgaste prematuro de motor. Com maior fluxo de ar admitido pelo motor de 250cc, o efeito tende a ser ainda mais rápido que na YZ125.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de retentor de suspensão dianteira/traseira — cargas maiores que categorias menores',
    body: 'A suspensão trabalha sob cargas maiores devido ao peso e torque superiores desta moto em relação à YZ125. Retentores de bengala dianteira e amortecedor traseiro tendem a apresentar vazamento um pouco mais cedo, especialmente com pilotos mais pesados. Inspeção recomendada a cada 15-20 horas de uso.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem: desgaste acelerado pelo torque elevado do motor 250cc 2T',
    body: 'O torque elevado exige mais da embreagem multidisco, especialmente em uso competitivo com largadas e trocas de marcha agressivas. Sintoma: patinação sob carga em subidas ou acelerações fortes.',
  },
]

const YZ250_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma YZ250 (2 tempos) por HORAS de uso — categoria "Open" intermediária do motocross 2T',
    body: 'Manutenção por horas de motor, não por km — 1 hora de motocross na YZ250 equivale a aproximadamente 30-40 km rodados. A CADA TREINO/PROVA — limpar filtro de ar, verificar folga de corrente, preparar mistura fresca. A cada 8-10 horas (~300-400 km) — trocar vela. A cada 15-20 horas (~550-800 km) — corrente/pinhão/coroa, inspeção de suspensão dianteira/traseira e embreagem. A cada 15-25 horas (~550-1.000 km) — reforma de pistão/anéis por mecânico especializado em motocross 2T — intervalo padrão para uso competitivo, não indica defeito.',
  },
]

// ─── YZ 250 F — motocross competição 4 tempos ─────────────────────────────────
// FIPE lista como "YZ 250 F 250cc". Motor: 250cc (bore/stroke 77,0x53,6mm) DOHC 4 válvulas
// Refrigerado a líquido | Injeção eletrônica | ~39,5cv (medido na roda) | Câmbio manual 5 marchas
// Óleo: sintético JASO MA2, ~1,1L | Vela NGK CR8E (histórico) / iridium em anos recentes
// Tanque: ~6,2L | Corrente: 520 | Pneu: 80/100-21 (F) / 100/90-19 (R)

const YZ250F_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'ATENÇÃO: esta é a YZ 250 F — 4 TEMPOS, DOHC injetada — diferente da YZ 250 clássica 2 tempos',
    body: 'A YZ 250 F usa motor 4 tempos DOHC injetado eletronicamente, tecnicamente muito diferente da YZ 250 2T. Usa óleo de motor separado (não mistura combustível), tem folga de válvulas para verificar, e intervalos de manutenção diferentes. Se você comprou peças ou leu dicas pensando na "YZ 250" 2 tempos, elas NÃO se aplicam aqui — confirme sempre no manual/etiqueta do chassi qual versão sua moto é.',
  },
  {
    severity: 'OK',
    title: 'Óleo sintético JASO MA2 ~1,1L — troque a cada 8-10 horas de uso competitivo intenso',
    body: 'Motor DOHC 4 válvulas de alta rotação, capacidade aproximada 1,1L. Use óleo sintético JASO MA2 (embreagem multidisco úmida compartilha o óleo): Motul 300V 4T Factory Line 10W-50 (competição), Motul 7100 10W-50 (uso regular), Bel-Ray EXS 10W-50. Troque a cada 8-10 horas de uso competitivo (~250-350 km equivalentes) — motor de alta rotação sofre estresse térmico maior que motos de rua, óleo degrada mais rápido.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR8E (histórico) ou iridium rosca longa em anos recentes — confirme código no manual do ano',
    body: 'A YZ250F usa historicamente a vela NGK CR8E (mesma referência da WR250F de período equivalente). Versões mais recentes podem usar vela iridium de rosca longa — verifique o manual específico do seu ano. Vela iridium dura mais (20-30 horas) que a convencional CR8E (10-15 horas), boa opção de upgrade para reduzir manutenção.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar Twin Air/OEM: rotina obrigatória, sem exceção — motor injetado não perdoa poeira',
    body: 'Use óleo específico (Twin Air Filter Oil, Motul A1, Bel-Ray Foam Filter Oil) e limpe após CADA sessão de treino ou prova. Pilotos de competição costumam ter 2-3 filtros de reserva já limpos e oleados prontos para troca rápida entre baterias eliminatórias.',
  },
  {
    severity: 'OK',
    title: 'Folga de válvulas: item que exige mecânico especializado com jogo de pastilhas (shims)',
    body: 'O motor DOHC de alta rotação desgasta a folga de válvulas com o uso — verificação recomendada a cada 15-20 horas de uso competitivo. Sintoma de folga fora de especificação: motor barulhento (tique-taque metálico), perda de performance na faixa alta, dificuldade de partida a frio. Ajuste requer jogo de pastilhas de reposição e ferramentas específicas — não é serviço para fazer em casa sem experiência.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 + kit relação: mesma especificação da WR250F e YZ250 (2T)',
    body: 'Kits de relação DID ou RK disponíveis em lojas especializadas em motocross: R$ 350-600. Lubrifique após cada sessão de uso com spray específico (Motul C2, Bel-Ray, Maxima Chain Wax) — nunca deixe a corrente seca em uso competitivo.',
  },
]

const YZ250F_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Desgaste de válvulas por uso competitivo intenso — folga deve ser verificada com frequência',
    body: 'O motor 4 tempos DOHC tem válvulas que trabalham em altíssima rotação constante durante competição, desgastando a folga mais rápido que motos de rua equivalentes. Sintoma: motor barulhento, perda de performance na faixa alta de rotação, dificuldade de partida a frio. Verificação recomendada a cada 15-20 horas de uso competitivo.',
  },
  {
    severity: 'WARN',
    title: 'Entupimento de filtro de ar por poeira — causa raiz do desgaste prematuro',
    body: 'O filtro de ar mal cuidado é a causa mais comum de desgaste prematuro de motor na linha YZ. Em uso competitivo com muita poeira em suspensão, negligenciar a limpeza entre sessões pode reduzir drasticamente a vida útil do motor.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de retentor de suspensão dianteira/traseira em uso competitivo intenso',
    body: 'A suspensão de alta performance sofre desgaste de retentores com uso intenso em saltos e terreno irregular. Sintoma dianteiro: óleo visível no tubo interno da bengala. Sintoma traseiro: perda de amortecimento, vazamento no corpo do amortecedor. Reforma completa recomendada a cada temporada de competição — R$ 400-700 de serviço especializado.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem: desgaste acelerado com uso competitivo agressivo (largadas, trocas de marcha)',
    body: 'A embreagem multidisco sofre desgaste mais rápido com uso de largadas e trocas agressivas de marcha típicas de competição. Sintoma: patinação sob carga, ponto de acionamento mudando. Discos e molas são consumíveis de competição.',
  },
  {
    severity: 'WARN',
    title: 'Falha de injeção eletrônica por bateria fraca — mantenha a carga em dia mesmo sendo moto de competição',
    body: 'Diferente das versões 2T, o sistema de injeção eletrônica da YZ250F depende de tensão de bateria adequada para funcionar corretamente. Bateria fraca pode causar partida difícil ou funcionamento irregular. Verifique a carga antes de eventos importantes — problema pouco intuitivo em moto de motocross, mas real em modelos injetados.',
  },
]

const YZ250F_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma YZ250F (4 tempos) por HORAS de uso — atenção: intervalos diferem da YZ250 2 tempos',
    body: 'Manutenção por horas de motor, não por km — 1 hora de motocross na YZ250F equivale a aproximadamente 30-40 km rodados. A CADA TREINO/PROVA — limpar filtro de ar, verificar folga de corrente, nível de líquido de arrefecimento. A cada 8-10 horas (~250-350 km) — trocar óleo do motor (1,1L sintético JASO MA2). A cada 15-20 horas — verificar folga de válvulas, trocar vela (CR8E ou iridium conforme ano). A cada 15-20 horas — corrente/pinhão/coroa, inspeção de suspensão dianteira/traseira e embreagem. A cada 20-30 horas — revisão geral de motor por mecânico especializado em motocross antes de temporada de competição.',
  },
]

// ─── YZ 85 (LW) — motocross infantil/júnior ───────────────────────────────────
// Motor: 85cc monocilíndrico 2 tempos refrigerado a líquido, bore/stroke 47,5x47,8mm, sistema YPVS
// Compressão: 8,2~9,6:1 | Carburador Keihin PWK28 | Câmbio manual 6 marchas sincronizado
// Pneu: 70/100-19 (F) / 90/100-16 (R) — pneus Dunlop MX33 de fábrica | Tanque: 5L
// Peso líquido: ~75kg | Altura do assento: ~885mm | Categoria motocross infantil/júnior (transição)

const YZ85_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mistura de combustível 2T — confirme proporção na embalagem do óleo, prepare fresca a cada treino',
    body: 'A YZ85 é motor 2 tempos puro — sem cárter de óleo de motor separado, lubrificação vem 100% da mistura na gasolina. Proporção varia por marca/formulação de óleo — sempre confirme na embalagem (Yamalube 2R recomenda faixa próxima de 50:1 em formulações recentes; óleos de competição de outras marcas costumam ficar entre 32:1 e 40:1). Óleos recomendados: Yamalube 2R, Motul 800 2T Factory Line (competição), Motul 600 2T (treino). Prepare mistura fresca a cada sessão — nunca reutilize sobra de dias anteriores.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar de espuma — rotina mais importante desta moto para pais/responsáveis não esquecerem',
    body: 'Como moto de categoria júnior/infantil, o hábito de limpar o filtro após cada treino muitas vezes depende do adulto responsável, não do piloto. Use óleo específico (Motul A1 Air Filter Oil, Bel-Ray Foam Filter Oil, Twin Air) — nunca óleo de motor comum. Processo: lavar, espremer sem torcer, secar, aplicar óleo e espremer o excesso. Verifique após CADA sessão de treino — é o item que mais protege o motor pequeno de 85cc contra desgaste prematuro por poeira.',
  },
  {
    severity: 'OK',
    title: 'Carburador Keihin PWK28: regulagem de fábrica boa para a maioria dos usos, mas sensível a altitude',
    body: 'O carburador Keihin PWK28 vem regulado de fábrica para uso geral, mas pistas em altitude muito diferente (serra vs. litoral) podem exigir troca de jato principal para manter a resposta ideal. Sintoma de mistura desregulada: perda de potência em altitude, fumaça excessiva (mistura rica) ou motor "cortando" em alta rotação (mistura pobre, risco de gripagem). Consulte tabela de jatos por altitude no manual ou com mecânico especializado em motocross júnior.',
  },
  {
    severity: 'OK',
    title: 'Vela: confirme código NGK no manual do ano — inspecione a cor do eletrodo regularmente',
    body: 'Como todo 2T com mistura de óleo, a vela suja mais rápido que um 4 tempos — inspecione a cor do eletrodo a cada poucas horas: marrom claro/acinzentado = ideal, preto fuliginoso = mistura rica ou filtro sujo, branco = mistura pobre (risco de gripagem). Troca preventiva a cada 10-15 horas de uso. Custo baixo, R$ 25-40.',
  },
  {
    severity: 'OK',
    title: 'Pneus Dunlop MX33 (70/100-19 F / 90/100-16 R): mantenha o modelo de fábrica para desempenho equilibrado',
    body: 'A YZ85 vem de fábrica com pneus Dunlop Geomax MX33, bem calibrados para o peso e a potência da moto. Ao substituir, prefira o mesmo modelo ou equivalente direto (Michelin Starcross Mini, Pirelli Scorpion MX Mid Soft em medidas júnior) — pneus incompatíveis com o peso da categoria podem comprometer a segurança do piloto júnior em curvas e frenagens.',
  },
  {
    severity: 'OK',
    title: 'Corrente e kit relação — categoria mais exigente entre as infantis, trocar com regularidade',
    body: 'A YZ85 tem mais potência que motos infantis menores e desgasta a corrente mais rápido, especialmente com pilotos mais pesados/agressivos para a categoria. Kits de relação (DID, RK) disponíveis em lojas especializadas em motocross: R$ 250-450. Lubrifique após cada treino, sempre limpando a sujeira acumulada antes de aplicar lubrificante novo.',
  },
]

const YZ85_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Gripagem de motor por mistura incorreta ou superaquecimento em uso competitivo',
    body: 'A YZ85, por ter mais potência que as motos infantis menores e ser usada em competição mais intensa, é sensível a erros de mistura de combustível e superaquecimento (baixo nível de líquido de arrefecimento). Sintomas de alerta: perda de potência súbita, motor "travando" momentaneamente em alta rotação, cheiro de queimado. Verifique sempre o nível do radiador antes de rodar e nunca economize na qualidade do óleo 2T.',
  },
  {
    severity: 'WARN',
    title: 'Entupimento do filtro de ar por poeira — causa mais comum de desgaste prematuro nesta categoria',
    body: 'Por ser usada intensamente em treinos e provas por pilotos júnior, a YZ85 sofre com a rotina de limpeza do filtro sendo negligenciada. Resultado: desgaste de cilindro muito antes do esperado, perda de compressão, consumo de mistura elevado. É o problema mais evitável e mais caro de ignorar nesta categoria.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de retentor de suspensão dianteira e traseira — comum em uso competitivo',
    body: 'A suspensão da YZ85 sofre desgaste de retentores com o maior curso e uso mais agressivo (saltos maiores) característico da categoria de transição. Sintoma dianteiro: óleo visível no tubo interno da bengala. Sintoma traseiro: vazamento no corpo do amortecedor, perda de amortecimento. Inspecionar a cada 15-20 horas de uso; reforma completa recomendada a cada temporada de uso competitivo intenso.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste de embreagem por arrancadas de largada frequentes',
    body: 'Uso competitivo com largadas frequentes desgasta os discos de embreagem mais rápido que uso recreativo. Sintoma: patinação sob carga em subidas ou acelerações fortes, ponto de acionamento mudando com frequência. Discos e molas de embreagem são consumíveis — inspecionar a cada 20-25 horas.',
  },
  {
    severity: 'WARN',
    title: 'Corrente esticando/saltando em pilotos mais pesados ou uso muito agressivo para a categoria',
    body: 'Pilotos na faixa superior de peso para a YZ85 (transição para motos maiores) desgastam a corrente mais rápido, podendo causar folga excessiva e risco de salto do pinhão em aterrissagens de saltos — situação de risco real de queda. Verifique a folga a cada 2-3 sessões.',
  },
]

const YZ85_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma YZ85 por HORAS de uso — categoria mais exigente entre as motocross infantis/júnior',
    body: 'Manutenção por horas de motor, não por km — 1 hora de motocross na YZ85 equivale a aproximadamente 25-35 km rodados (mais potência e velocidade que categorias menores como a 65cc). A CADA TREINO/PROVA — limpar filtro de ar, verificar folga de corrente, nível de líquido de arrefecimento, aperto geral de parafusos. A cada 10-15 horas (~250-450 km) — trocar vela, inspecionar discos de embreagem. A cada 15-20 horas (~350-600 km) — corrente/pinhão/coroa, inspeção de retentores de suspensão dianteira e traseira. A cada 25-40 horas — reforma de motor (pistão/anéis) e reforma de suspensão (retentores + óleo) por mecânico especializado em motocross — essencial antes de temporada de competição.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'TT-R 125',
    yearFrom: null,
    yearTo: null,
    MACETES: TTR125_MACETES,
    PROBLEMAS: TTR125_PROBLEMAS,
    MANUTENCAO: TTR125_MANUTENCAO,
  },
  {
    modelName: 'TT-R 230',
    yearFrom: null,
    yearTo: null,
    MACETES: TTR230_MACETES,
    PROBLEMAS: TTR230_PROBLEMAS,
    MANUTENCAO: TTR230_MANUTENCAO,
  },
  {
    modelName: 'XT 225',
    yearFrom: null,
    yearTo: null,
    MACETES: XT225_MACETES,
    PROBLEMAS: XT225_PROBLEMAS,
    MANUTENCAO: XT225_MANUTENCAO,
  },
  {
    modelName: 'WR 250 F',
    yearFrom: null,
    yearTo: null,
    MACETES: WR250F_MACETES,
    PROBLEMAS: WR250F_PROBLEMAS,
    MANUTENCAO: WR250F_MANUTENCAO,
  },
  {
    modelName: 'XTZ 125',
    yearFrom: null,
    yearTo: null,
    MACETES: XTZ125_MACETES,
    PROBLEMAS: XTZ125_PROBLEMAS,
    MANUTENCAO: XTZ125_MANUTENCAO,
  },
  {
    modelName: 'YZ 125',
    yearFrom: null,
    yearTo: null,
    MACETES: YZ125_MACETES,
    PROBLEMAS: YZ125_PROBLEMAS,
    MANUTENCAO: YZ125_MANUTENCAO,
  },
  {
    modelName: 'YZ 250',
    yearFrom: null,
    yearTo: null,
    MACETES: YZ250_MACETES,
    PROBLEMAS: YZ250_PROBLEMAS,
    MANUTENCAO: YZ250_MANUTENCAO,
  },
  {
    modelName: 'YZ 250 F',
    yearFrom: null,
    yearTo: null,
    MACETES: YZ250F_MACETES,
    PROBLEMAS: YZ250F_PROBLEMAS,
    MANUTENCAO: YZ250F_MANUTENCAO,
  },
  {
    modelName: 'YZ 85',
    yearFrom: null,
    yearTo: null,
    MACETES: YZ85_MACETES,
    PROBLEMAS: YZ85_PROBLEMAS,
    MANUTENCAO: YZ85_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────
// Trail/dual-sport: pressões intermediárias (mais baixas que street, mais altas que motocross puro).
// Motocross competitivo (YZ): pressões muito baixas, típicas de pista de terra.

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'TT-R 125',
    yearFrom: null, yearTo: null,
    tireSize: '2.50-14 (F) · 3.00-12 (R) — varia conforme versão E/LE/LWE',
    frontPsi: 15, rearPsi: 15,
    frontPsiLoad: null, rearPsiLoad: null,
    notes: 'Trail infantil/júnior — pressão intermediária entre street e motocross puro: 14-17 PSI conforme terreno. Trilha leve/pista: 14-15 PSI. Uso misto com estrada de terra mais dura: 16-18 PSI.',
  },
  {
    modelName: 'TT-R 230',
    yearFrom: null, yearTo: null,
    tireSize: '80/100-21 (F) · 100/100-18 (R)',
    frontPsi: 18, rearPsi: 20,
    frontPsiLoad: 18, rearPsiLoad: 23,
    notes: 'Solo: F 18 / R 20 PSI — uso misto trilha/estrada de terra. Com carona ou bagagem: F 18 / R 23 PSI. Trilha mais técnica/arenosa: reduzir 2-3 PSI para mais tração. Pneus de fábrica: blocados para off-road leve/dual-sport.',
  },
  {
    modelName: 'XT 225',
    yearFrom: null, yearTo: null,
    tireSize: '2.75-21 (F) · 4.10-18 (R) aprox. conforme ano/versão',
    frontPsi: 18, rearPsi: 20,
    frontPsiLoad: 18, rearPsiLoad: 24,
    notes: 'Solo: F 18 / R 20 PSI. Com carona/bagagem: F 18 / R 24 PSI. Moto dual-sport equilibrada — pressão intermediária adequada tanto para asfalto quanto trilha leve. Reduza 2-3 PSI para trilha mais técnica.',
  },
  {
    modelName: 'WR 250 F',
    yearFrom: null, yearTo: null,
    tireSize: '90/90-21 (F) · 130/90-18 (R)',
    frontPsi: 13, rearPsi: 14,
    frontPsiLoad: null, rearPsiLoad: null,
    notes: 'Enduro/trilha competitiva: ponto de partida 12-14 PSI dianteiro, 13-15 PSI traseiro (mais alto que motocross puro, pois enduro roda mais em estrada/trilha aberta). Terreno técnico com pedras: 15-16 PSI para evitar beliscada. Pneus recomendados: Michelin Enduro Competition, Pirelli Scorpion Rally.',
  },
  {
    modelName: 'XTZ 125',
    yearFrom: null, yearTo: null,
    tireSize: '2.75-21 (F) · 100/90-18 (R) aprox. conforme versão',
    frontPsi: 20, rearPsi: 22,
    frontPsiLoad: 20, rearPsiLoad: 25,
    notes: 'Solo: F 20 / R 22 PSI — moto trail de entrada com uso predominantemente urbano/estrada. Com carona: F 20 / R 25 PSI. Para uso mais frequente em trilha/terra: reduzir 2-3 PSI.',
  },
  {
    modelName: 'YZ 125',
    yearFrom: null, yearTo: null,
    tireSize: '80/100-21 (F) · 100/90-19 (R)',
    frontPsi: 12, rearPsi: 12,
    frontPsiLoad: null, rearPsiLoad: null,
    notes: 'Motocross competitivo: ponto de partida clássico 12 PSI dianteiro e traseiro (faixa geral 10-14 PSI). Pista dura/pedregosa: 13-16 PSI para evitar beliscada de câmara. Areia/lama: 10-11 PSI para mais tração. Pneus recomendados: Michelin Starcross 5/6, Pirelli Scorpion MX32.',
  },
  {
    modelName: 'YZ 250',
    yearFrom: null, yearTo: null,
    tireSize: '80/100-21 (F) · 100/90-19 (R)',
    frontPsi: 12, rearPsi: 13,
    frontPsiLoad: null, rearPsiLoad: null,
    notes: 'Motocross competitivo (2 tempos): ponto de partida 12 PSI dianteiro, 13 PSI traseiro. Torque elevado favorece pressão traseira levemente maior. Terreno duro: 14-16 PSI. Sand/lama: 10-11 PSI. Pneus recomendados: Michelin Starcross 6, Pirelli Scorpion MX32.',
  },
  {
    modelName: 'YZ 250 F',
    yearFrom: null, yearTo: null,
    tireSize: '80/100-21 (F) · 100/90-19 (R)',
    frontPsi: 12, rearPsi: 13,
    frontPsiLoad: null, rearPsiLoad: null,
    notes: 'Motocross competitivo (4 tempos): ponto de partida 12 PSI dianteiro, 13 PSI traseiro (faixa geral 10-14 PSI). Terreno com raízes/pedras: 14-16 PSI. Areia/lama: 10-11 PSI. Pneus recomendados: Michelin Starcross 5/6, Pirelli Scorpion MX32.',
  },
  {
    modelName: 'YZ 85',
    yearFrom: null, yearTo: null,
    tireSize: '70/100-19 (F) · 90/100-16 (R)',
    frontPsi: 10, rearPsi: 10,
    frontPsiLoad: null, rearPsiLoad: null,
    notes: 'Motocross infantil/júnior: faixa usual 9-12 PSI conforme terreno. Pista dura/pedregosa: 12-13 PSI. Pista macia/areia: 8-9 PSI. Pneus de fábrica: Dunlop Geomax MX33 70/100-19 (F) e 90/100-16 (R).',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // TT-R 125
  { modelName: 'TT-R 125', yearFrom: null, yearTo: null, component: 'Óleo Yamalube 4 20W40 (~0,9-1,0L)', intervalKm: 1500, intervalMonths: 6, notes: 'Motor 123,7cc SOHC. Cárter compartilhado com embreagem — JASO MA obrigatório.', priority: 'HIGH', order: 1 },
  { modelName: 'TT-R 125', yearFrom: null, yearTo: null, component: 'Filtro de ar (espuma com óleo específico)', intervalKm: 1000, intervalMonths: null, notes: 'Limpar após uso em trilha; sempre antes de guardar a moto. Motul A1 ou Bel-Ray Foam Filter Oil.', priority: 'CRITICAL', order: 2 },
  { modelName: 'TT-R 125', yearFrom: null, yearTo: null, component: 'Vela NGK (confirme código no manual do ano)', intervalKm: 3000, intervalMonths: null, notes: 'Gap aproximado 0,6-0,7mm. Troca a cada 3.000-5.000 km.', priority: 'MEDIUM', order: 3 },
  { modelName: 'TT-R 125', yearFrom: null, yearTo: null, component: 'Corrente 420 — lubrificação e folga', intervalKm: 500, intervalMonths: null, notes: 'Lubrificar após cada uso em trilha. Folga ~20-30mm.', priority: 'HIGH', order: 4 },
  { modelName: 'TT-R 125', yearFrom: null, yearTo: null, component: 'Limpeza/ajuste do carburador Mikuni', intervalKm: null, intervalMonths: 3, notes: 'Preventivo se a moto ficar parada por mais de 30 dias — drenar combustível antigo.', priority: 'MEDIUM', order: 5 },
  { modelName: 'TT-R 125', yearFrom: null, yearTo: null, component: 'Ajuste do cabo de embreagem', intervalKm: 2000, intervalMonths: null, notes: 'Verificar folga do manete — desgaste acelerado com uso por iniciantes.', priority: 'MEDIUM', order: 6 },
  { modelName: 'TT-R 125', yearFrom: null, yearTo: null, component: 'Retentor da bengala dianteira — inspeção', intervalKm: 5000, intervalMonths: null, notes: 'Verificar vazamento de óleo no tubo interno.', priority: 'MEDIUM', order: 7 },
  { modelName: 'TT-R 125', yearFrom: null, yearTo: null, component: 'Aperto geral de parafusos', intervalKm: 500, intervalMonths: null, notes: 'Vibração em uso off-road solta parafusos facilmente.', priority: 'HIGH', order: 8 },

  // TT-R 230
  { modelName: 'TT-R 230', yearFrom: null, yearTo: null, component: 'Óleo Yamalube 4 20W40 (~1,0-1,3L)', intervalKm: 2000, intervalMonths: 6, notes: 'Motor 223cc OHC refrigerado a ar. Cárter compartilhado — JASO MA.', priority: 'HIGH', order: 1 },
  { modelName: 'TT-R 230', yearFrom: null, yearTo: null, component: 'Filtro de ar (espuma)', intervalKm: 1200, intervalMonths: null, notes: 'Limpar após cada trilha pesada; a cada 1.000-1.500 km em uso leve.', priority: 'CRITICAL', order: 2 },
  { modelName: 'TT-R 230', yearFrom: null, yearTo: null, component: 'Vela NGK (confirme código no manual)', intervalKm: 5000, intervalMonths: null, notes: 'Gap ~0,7mm. Trocar a cada 5.000-8.000 km.', priority: 'MEDIUM', order: 3 },
  { modelName: 'TT-R 230', yearFrom: null, yearTo: null, component: 'Corrente 420/428 — lubrificação e folga', intervalKm: 600, intervalMonths: null, notes: 'Confirmar passo exato na etiqueta da corrente original antes de comprar kit.', priority: 'HIGH', order: 4 },
  { modelName: 'TT-R 230', yearFrom: null, yearTo: null, component: 'Ajuste/limpeza do carburador', intervalKm: 5000, intervalMonths: 12, notes: 'Reajuste de mistura ao mudar significativamente de altitude.', priority: 'MEDIUM', order: 5 },
  { modelName: 'TT-R 230', yearFrom: null, yearTo: null, component: 'Ajuste da folga do freio traseiro (tambor)', intervalKm: 1500, intervalMonths: null, notes: 'Sensível a contaminação por lama/água — limpar e reajustar após trilhas úmidas.', priority: 'MEDIUM', order: 6 },
  { modelName: 'TT-R 230', yearFrom: null, yearTo: null, component: 'Folga de válvulas', intervalKm: 10000, intervalMonths: 12, notes: 'Motor frio. Verificação em revisão geral com mecânico especializado.', priority: 'HIGH', order: 7 },
  { modelName: 'TT-R 230', yearFrom: null, yearTo: null, component: 'Retentor da bengala dianteira — inspeção', intervalKm: 8000, intervalMonths: null, notes: 'Curso ~240mm — exposição a poeira/impactos de trilha.', priority: 'MEDIUM', order: 8 },
  { modelName: 'TT-R 230', yearFrom: null, yearTo: null, component: 'Kit relação — substituição completa', intervalKm: 8000, intervalMonths: null, notes: 'Trocar corrente + pinhão + coroa juntos.', priority: 'HIGH', order: 9 },

  // XT 225
  { modelName: 'XT 225', yearFrom: null, yearTo: null, component: 'Óleo Yamalube 4 20W40 (1,0-1,3L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 223cc SOHC, bore/stroke 70x58mm. JASO MA obrigatório (cárter compartilhado).', priority: 'HIGH', order: 1 },
  { modelName: 'XT 225', yearFrom: null, yearTo: null, component: 'Filtro de ar (espuma)', intervalKm: 1200, intervalMonths: null, notes: 'Item-chave da fama de confiabilidade da moto. Nunca rodar sem filtro.', priority: 'CRITICAL', order: 2 },
  { modelName: 'XT 225', yearFrom: null, yearTo: null, component: 'Vela NGK família CR/DR (confirme no manual)', intervalKm: 5000, intervalMonths: null, notes: 'Gap ~0,6-0,7mm.', priority: 'MEDIUM', order: 3 },
  { modelName: 'XT 225', yearFrom: null, yearTo: null, component: 'Folga de válvulas (parafuso/contra-porca)', intervalKm: 6000, intervalMonths: 12, notes: 'Motor SOHC simples de ajustar — não usa shims.', priority: 'HIGH', order: 4 },
  { modelName: 'XT 225', yearFrom: null, yearTo: null, component: 'Corrente — lubrificação e folga', intervalKm: 600, intervalMonths: null, notes: 'Lubrificar após trilha lamacenta.', priority: 'HIGH', order: 5 },
  { modelName: 'XT 225', yearFrom: null, yearTo: null, component: 'Limpeza preventiva do carburador', intervalKm: null, intervalMonths: 6, notes: 'Essencial em unidades que ficam paradas por longos períodos.', priority: 'MEDIUM', order: 6 },
  { modelName: 'XT 225', yearFrom: null, yearTo: null, component: 'Inspeção de juntas do motor (vazamento)', intervalKm: 10000, intervalMonths: 12, notes: 'Unidades antigas (moto fora de linha) — juntas ressecadas são comuns.', priority: 'MEDIUM', order: 7 },
  { modelName: 'XT 225', yearFrom: null, yearTo: null, component: 'Retentor da bengala dianteira — inspeção', intervalKm: 8000, intervalMonths: null, notes: 'Queixa recorrente em unidades com muitos anos/km.', priority: 'MEDIUM', order: 8 },
  { modelName: 'XT 225', yearFrom: null, yearTo: null, component: 'Kit relação — substituição completa', intervalKm: 10000, intervalMonths: null, notes: 'Trocar corrente + pinhão + coroa juntos.', priority: 'HIGH', order: 9 },

  // WR 250 F
  { modelName: 'WR 250 F', yearFrom: null, yearTo: null, component: 'Óleo sintético JASO MA2 (~1,1L)', intervalKm: 350, intervalMonths: null, notes: 'A cada 8-15 horas de uso (~250-500 km). Motul 300V 4T Factory Line ou 7100 10W-50.', priority: 'HIGH', order: 1 },
  { modelName: 'WR 250 F', yearFrom: null, yearTo: null, component: 'Filtro de ar Twin Air/OEM', intervalKm: 30, intervalMonths: null, notes: 'Limpar após CADA saída de trilha/enduro.', priority: 'CRITICAL', order: 2 },
  { modelName: 'WR 250 F', yearFrom: null, yearTo: null, component: 'Vela NGK CR8E (ou iridium conforme ano)', intervalKm: 500, intervalMonths: null, notes: 'A cada 15-25 horas de uso. Confirme código exato para o ano específico.', priority: 'MEDIUM', order: 3 },
  { modelName: 'WR 250 F', yearFrom: null, yearTo: null, component: 'Folga de válvulas', intervalKm: 600, intervalMonths: null, notes: 'A cada 15-20 horas — requer jogo de pastilhas (shims) e mecânico especializado.', priority: 'HIGH', order: 4 },
  { modelName: 'WR 250 F', yearFrom: null, yearTo: null, component: 'Corrente 520 — lubrificação e folga', intervalKm: 40, intervalMonths: null, notes: 'Lubrificar após cada uso, ajustar relação conforme tipo de enduro.', priority: 'HIGH', order: 5 },
  { modelName: 'WR 250 F', yearFrom: null, yearTo: null, component: 'Embreagem — inspeção/troca de discos', intervalKm: 700, intervalMonths: null, notes: 'A cada 20-30 horas — desgaste maior em enduro técnico.', priority: 'MEDIUM', order: 6 },
  { modelName: 'WR 250 F', yearFrom: null, yearTo: null, component: 'Suspensão dianteira/traseira — inspeção de retentores', intervalKm: 700, intervalMonths: null, notes: 'A cada 20-30 horas de uso.', priority: 'HIGH', order: 7 },
  { modelName: 'WR 250 F', yearFrom: null, yearTo: null, component: 'Nível de líquido de arrefecimento', intervalKm: 30, intervalMonths: null, notes: 'Verificar antes de cada saída — trilhas lentas/técnicas aquecem mais.', priority: 'HIGH', order: 8 },
  { modelName: 'WR 250 F', yearFrom: null, yearTo: null, component: 'Revisão geral de motor por mecânico especializado', intervalKm: 900, intervalMonths: 12, notes: 'A cada 20-30 horas ou anualmente, antes de temporada.', priority: 'HIGH', order: 9 },

  // XTZ 125
  { modelName: 'XTZ 125', yearFrom: null, yearTo: null, component: 'Óleo Yamalube 4 20W40 (~0,9-1,0L)', intervalKm: 1500, intervalMonths: 6, notes: 'Motor 123,7cc OHC. Todas as versões E/K/XE/XK compartilham o mesmo motor.', priority: 'HIGH', order: 1 },
  { modelName: 'XTZ 125', yearFrom: null, yearTo: null, component: 'Filtro de ar (espuma)', intervalKm: 2500, intervalMonths: null, notes: 'Mais frequente se usar em trilha/terra com regularidade.', priority: 'HIGH', order: 2 },
  { modelName: 'XTZ 125', yearFrom: null, yearTo: null, component: 'Vela NGK (confirme código no manual do ano)', intervalKm: 5000, intervalMonths: null, notes: 'Gap ~0,6-0,7mm.', priority: 'MEDIUM', order: 3 },
  { modelName: 'XTZ 125', yearFrom: null, yearTo: null, component: 'Folga de válvulas', intervalKm: 6000, intervalMonths: 12, notes: 'Motor frio.', priority: 'MEDIUM', order: 4 },
  { modelName: 'XTZ 125', yearFrom: null, yearTo: null, component: 'Corrente — lubrificação e folga', intervalKm: 600, intervalMonths: null, notes: 'Mais frequente em uso off-road.', priority: 'HIGH', order: 5 },
  { modelName: 'XTZ 125', yearFrom: null, yearTo: null, component: 'Ajuste do freio a tambor dianteiro (versões K/XK)', intervalKm: 2000, intervalMonths: null, notes: 'Apenas versões K/XK (tambor). Versões E/XE usam disco.', priority: 'MEDIUM', order: 6 },
  { modelName: 'XTZ 125', yearFrom: null, yearTo: null, component: 'Verificação de bateria (versões E/XE — partida elétrica)', intervalKm: null, intervalMonths: 12, notes: 'Apenas versões com partida elétrica. Trocar preventivamente a cada 2-3 anos.', priority: 'MEDIUM', order: 7 },
  { modelName: 'XTZ 125', yearFrom: null, yearTo: null, component: 'Kit relação — substituição completa', intervalKm: 10000, intervalMonths: null, notes: 'Trocar corrente + pinhão + coroa juntos.', priority: 'HIGH', order: 8 },
  { modelName: 'XTZ 125', yearFrom: null, yearTo: null, component: 'Inspeção de juntas do motor (vazamento)', intervalKm: 10000, intervalMonths: 12, notes: 'Comum em unidades com 10+ anos de uso.', priority: 'MEDIUM', order: 9 },

  // YZ 125
  { modelName: 'YZ 125', yearFrom: null, yearTo: null, component: 'Mistura de combustível 2T (confirme proporção na embalagem)', intervalKm: null, intervalMonths: null, notes: 'Yamalube 2R, Motul 800 2T. Preparar fresca a cada treino/prova.', priority: 'CRITICAL', order: 1 },
  { modelName: 'YZ 125', yearFrom: null, yearTo: null, component: 'Filtro de ar Twin Air/OEM', intervalKm: 30, intervalMonths: null, notes: 'Limpar após CADA sessão — ter filtro reserva limpo para provas.', priority: 'CRITICAL', order: 2 },
  { modelName: 'YZ 125', yearFrom: null, yearTo: null, component: 'Vela NGK BR8ES/BR9EG (leitura de vela)', intervalKm: 400, intervalMonths: null, notes: 'Troca a cada 10-15 horas; usar leitura de cor do eletrodo para checar carburação.', priority: 'MEDIUM', order: 3 },
  { modelName: 'YZ 125', yearFrom: null, yearTo: null, component: 'Limpeza da válvula de escape (YPVS)', intervalKm: 600, intervalMonths: null, notes: 'A cada 15-20 horas — remove acúmulo de carbono que reduz potência.', priority: 'MEDIUM', order: 4 },
  { modelName: 'YZ 125', yearFrom: null, yearTo: null, component: 'Corrente 520 — lubrificação e folga', intervalKm: 40, intervalMonths: null, notes: 'Lubrificar após cada sessão. Kits DID/RK.', priority: 'HIGH', order: 5 },
  { modelName: 'YZ 125', yearFrom: null, yearTo: null, component: 'Embreagem — inspeção/troca de discos', intervalKm: 600, intervalMonths: null, notes: 'A cada 15-20 horas — desgaste por largadas de competição.', priority: 'MEDIUM', order: 6 },
  { modelName: 'YZ 125', yearFrom: null, yearTo: null, component: 'Suspensão dianteira/traseira — inspeção', intervalKm: 600, intervalMonths: null, notes: 'A cada 15-20 horas de uso competitivo.', priority: 'HIGH', order: 7 },
  { modelName: 'YZ 125', yearFrom: null, yearTo: null, component: 'Reforma de pistão/anéis (padrão competição)', intervalKm: 900, intervalMonths: 12, notes: 'A cada 20-30 horas de uso intenso — normal para 2T de competição.', priority: 'HIGH', order: 8 },

  // YZ 250 (2T)
  { modelName: 'YZ 250', yearFrom: null, yearTo: null, component: 'Mistura de combustível 2T (confirme proporção na embalagem)', intervalKm: null, intervalMonths: null, notes: 'Versão 2 TEMPOS — sem óleo de motor separado. Yamalube 2R, Motul 800 2T.', priority: 'CRITICAL', order: 1 },
  { modelName: 'YZ 250', yearFrom: null, yearTo: null, component: 'Filtro de ar Twin Air/OEM', intervalKm: 35, intervalMonths: null, notes: 'Limpar após CADA sessão — motor de maior cilindrada admite mais ar/poeira.', priority: 'CRITICAL', order: 2 },
  { modelName: 'YZ 250', yearFrom: null, yearTo: null, component: 'Vela NGK BR8ES/BR9EG (grau térmico conforme altitude)', intervalKm: 400, intervalMonths: null, notes: 'Troca a cada 10-15 horas de uso competitivo.', priority: 'MEDIUM', order: 3 },
  { modelName: 'YZ 250', yearFrom: null, yearTo: null, component: 'Corrente 520 reforçada — lubrificação e folga', intervalKm: 40, intervalMonths: null, notes: 'Torque elevado desgasta corrente mais rápido que a YZ125.', priority: 'HIGH', order: 4 },
  { modelName: 'YZ 250', yearFrom: null, yearTo: null, component: 'Embreagem — inspeção/troca', intervalKm: 600, intervalMonths: null, notes: 'A cada 15-20 horas — torque elevado exige mais da embreagem.', priority: 'MEDIUM', order: 5 },
  { modelName: 'YZ 250', yearFrom: null, yearTo: null, component: 'Suspensão dianteira/traseira — inspeção', intervalKm: 600, intervalMonths: null, notes: 'A cada 15-20 horas — cargas maiores que a YZ125.', priority: 'HIGH', order: 6 },
  { modelName: 'YZ 250', yearFrom: null, yearTo: null, component: 'Reforma de pistão/anéis — padrão competição', intervalKm: 850, intervalMonths: 12, notes: 'A cada 15-25 horas de uso intenso.', priority: 'HIGH', order: 7 },

  // YZ 250 F (4T)
  { modelName: 'YZ 250 F', yearFrom: null, yearTo: null, component: 'Óleo sintético JASO MA2 (~1,1L)', intervalKm: 300, intervalMonths: null, notes: 'Versão 4 TEMPOS — não confundir com YZ250 2T. A cada 8-10 horas (~250-350 km).', priority: 'HIGH', order: 1 },
  { modelName: 'YZ 250 F', yearFrom: null, yearTo: null, component: 'Filtro de ar Twin Air/OEM', intervalKm: 30, intervalMonths: null, notes: 'Limpar após CADA sessão de treino/prova.', priority: 'CRITICAL', order: 2 },
  { modelName: 'YZ 250 F', yearFrom: null, yearTo: null, component: 'Vela NGK CR8E ou iridium (conforme ano)', intervalKm: 500, intervalMonths: null, notes: 'A cada 15-25 horas — iridium dura mais que CR8E convencional.', priority: 'MEDIUM', order: 3 },
  { modelName: 'YZ 250 F', yearFrom: null, yearTo: null, component: 'Folga de válvulas', intervalKm: 600, intervalMonths: null, notes: 'A cada 15-20 horas — requer jogo de pastilhas (shims).', priority: 'HIGH', order: 4 },
  { modelName: 'YZ 250 F', yearFrom: null, yearTo: null, component: 'Corrente 520 — lubrificação e folga', intervalKm: 40, intervalMonths: null, notes: 'Lubrificar após cada sessão de uso.', priority: 'HIGH', order: 5 },
  { modelName: 'YZ 250 F', yearFrom: null, yearTo: null, component: 'Embreagem — inspeção/troca', intervalKm: 600, intervalMonths: null, notes: 'A cada 15-20 horas de uso competitivo.', priority: 'MEDIUM', order: 6 },
  { modelName: 'YZ 250 F', yearFrom: null, yearTo: null, component: 'Suspensão dianteira/traseira — inspeção', intervalKm: 600, intervalMonths: null, notes: 'A cada 15-20 horas de uso competitivo.', priority: 'HIGH', order: 7 },
  { modelName: 'YZ 250 F', yearFrom: null, yearTo: null, component: 'Verificação de bateria (sistema de injeção eletrônica)', intervalKm: null, intervalMonths: 6, notes: 'Bateria fraca causa falha de partida/injeção irregular.', priority: 'MEDIUM', order: 8 },
  { modelName: 'YZ 250 F', yearFrom: null, yearTo: null, component: 'Revisão geral de motor por mecânico especializado', intervalKm: 950, intervalMonths: 12, notes: 'A cada 20-30 horas, antes de temporada de competição.', priority: 'HIGH', order: 9 },

  // YZ 85
  { modelName: 'YZ 85', yearFrom: null, yearTo: null, component: 'Mistura de combustível 2T (confirme proporção na embalagem)', intervalKm: null, intervalMonths: null, notes: 'Yamalube 2R, Motul 800/600 2T. Preparar fresca a cada treino.', priority: 'CRITICAL', order: 1 },
  { modelName: 'YZ 85', yearFrom: null, yearTo: null, component: 'Filtro de ar (espuma com óleo específico)', intervalKm: 25, intervalMonths: null, notes: 'Limpar após CADA sessão — responsabilidade do adulto acompanhante.', priority: 'CRITICAL', order: 2 },
  { modelName: 'YZ 85', yearFrom: null, yearTo: null, component: 'Vela NGK (confirme código no manual) — leitura de cor', intervalKm: 350, intervalMonths: null, notes: 'Troca a cada 10-15 horas. Inspecionar cor do eletrodo regularmente.', priority: 'MEDIUM', order: 3 },
  { modelName: 'YZ 85', yearFrom: null, yearTo: null, component: 'Corrente — lubrificação e folga', intervalKm: 30, intervalMonths: null, notes: 'Lubrificar após cada treino; verificar folga a cada 2-3 sessões.', priority: 'HIGH', order: 4 },
  { modelName: 'YZ 85', yearFrom: null, yearTo: null, component: 'Nível de líquido de arrefecimento', intervalKm: 25, intervalMonths: null, notes: 'Verificar antes de cada saída — motor refrigerado a líquido.', priority: 'HIGH', order: 5 },
  { modelName: 'YZ 85', yearFrom: null, yearTo: null, component: 'Embreagem — inspeção de discos', intervalKm: 500, intervalMonths: null, notes: 'A cada 20-25 horas — desgaste por largadas competitivas.', priority: 'MEDIUM', order: 6 },
  { modelName: 'YZ 85', yearFrom: null, yearTo: null, component: 'Suspensão dianteira/traseira — inspeção de retentores', intervalKm: 450, intervalMonths: null, notes: 'A cada 15-20 horas de uso.', priority: 'HIGH', order: 7 },
  { modelName: 'YZ 85', yearFrom: null, yearTo: null, component: 'Reforma de motor (pistão/anéis) + suspensão', intervalKm: 900, intervalMonths: 12, notes: 'A cada 25-40 horas ou por temporada de competição.', priority: 'HIGH', order: 8 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Yamaha Trilha/Enduro/Motocross (TT-R 125/230, XT 225, WR 250 F, XTZ 125, YZ 125/250/250F/85)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Yamaha', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'Yamaha', vehicleTypeId: motoType.id },
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

  console.log('✅ Yamaha Trilha/Enduro/Motocross concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
