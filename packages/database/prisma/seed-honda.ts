// seed-honda.ts — Honda Motos — 6 modelos populares no Brasil
// Modelos: CG 160, CB 300 Twister, XRE 300, NXR 160 Bros, PCX 160, Biz 125
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

// ─── CG 160 (2015–2025) ───────────────────────────────────────────────────────
const CG160_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA2 — troca a cada 3.000 km ou 6 meses',
    body: 'Motor 162cc SOHC refrigerado a ar. Capacidade: 1,0 L com filtro / 0,85 L sem filtro. Opções: Honda Ultra 4T 10W-30 (R$30–40/L), Motul 3000 10W-30 (R$25–35/L), Lubrax Moto 4T 10W-30 (R$18–25/L). Em uso de motoboy ou entrega intensa, encurte para 2.500 km — calor extremo degrada o óleo mais rápido. Observe o nível semanalmente.',
  },
  {
    severity: 'OK',
    title: 'Filtro de óleo: Hiflofiltro HF303 (R$18–25) — substitui o original Honda',
    body: 'Original Honda custa R$35–55 no revendedor. Alternativas diretas: Hiflofiltro HF303 ou Mann MW 64/1 (R$18–25) — mesma especificação, qualidade equivalente. Aplicar fina camada de óleo na vedação de borracha antes de instalar; apertar mão + ¾ de volta (sem chave). Trocar junto com o óleo.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK DPR7EA-9: gap 0,9 mm — use Iridium para uso intenso',
    body: 'Original: NGK DPR7EA-9 (R$15–25). Para motoboy ou uso pesado, prefira NGK DPR7EIX-9 Iridium (R$65–80) — dura 2× mais e melhora partida a frio. Gap: 0,90 mm (não ajustar em vela iridium). Alternativa Bosch: WS7F0. Vela suja causa engasgo e dificuldade de partida em CGs com mais de 15.000 km sem troca.',
  },
  {
    severity: 'OK',
    title: 'Válvulas: folga admissão 0,10 mm / escape 0,15 mm — regular a cada 24.000 km',
    body: 'Motor SOHC 2 válvulas. Com motor frio: admissão 0,10 ±0,02 mm / escape 0,15 ±0,02 mm. Folga errada = barulho metálico + perda de potência. Regulagem simples com chave de fenda e calibrador de lâminas. Folga negativa (válvula permanentemente comprimida) causa falha de partida a frio e dano ao assento de válvula com o tempo.',
  },
  {
    severity: 'OK',
    title: 'Kit de transmissão: corrente DID 428NZ-V + coroa 41 + pinhão 15 (R$170–235)',
    body: 'Corrente 428 passo. Kit completo: DID 428NZ-V 118 elos (R$80–110) + coroa 41 ProX/RK (R$55–80) + pinhão 15 (R$30–45) — total R$170–235 vs. kit original Honda R$320–450. Para uso off-road ou CG Cargo: pinhão 14 + coroa 42 aumenta tração. Lubrifique corrente a cada 500 km com spray de corrente (Chain Master, Motorex ou Motul); tensão: 15–20 mm de folga no ponto médio inferior.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: limpar a cada 6.000 km, trocar a cada 12.000 km',
    body: 'Filtro de papel original (R$25–40). Em regiões com pó ou terra, inspecionar a cada 3.000 km. Alternativa lavável permanente: K&N HA-6803 (R$190–240) — aumenta levemente o fluxo de ar. NUNCA rodar sem filtro: poeira no cilindro causa desgaste acelerado dos anéis do pistão.',
  },
  {
    severity: 'OK',
    title: 'Pastilha de freio dianteiro: EBC FA135TT ou Cobreq — muito mais barata que Honda',
    body: 'Original Honda: R$90–140. EBC FA135TT (R$60–90) ou Cobreq (R$40–60) são substitutos diretos com qualidade igual ou superior. Para a CG 160 Titan (disco traseiro): EBC FA069HH (R$70–100). Substituir quando espessura atingir 1,5 mm ou ao aparecer rangido metálico constante.',
  },
  {
    severity: 'OK',
    title: 'Pneu traseiro: Pirelli Super City 90/90-18 — 30–40% mais durável que o original',
    body: 'Tamanhos: dianteiro 80/100-18, traseiro 90/90-18. Pirelli Super City (R$120–160 traseiro) dura significativamente mais que o pneu de fábrica. Para chuva: Pirelli Pilot Street (R$150–200). Custo-benefício: Rinaldi BS32 (R$80–110) ou Maggion CR (R$90–120). NUNCA usar remold no eixo dianteiro — risco de bolha e perda de controle.',
  },
  {
    severity: 'OK',
    title: 'Injeção PGM-FI: limpar injetor a cada 30.000 km; evitar moto parada por semanas',
    body: 'CG 160 Fan é injetada desde 2015. Injetor Keihin simples e confiável. Se a moto ficar parada mais de 3 semanas, esvazie o tanque ou use estabilizador de combustível. Engasgo leve na aceleração suave = injetor parcialmente entupido. Limpeza ultrassônica: R$50–80. Evite combustível com alta umidade no tanque.',
  },
  {
    severity: 'WARN',
    title: 'Corrente: folga máxima 20 mm — corrente solta pode pular do pinhão',
    body: 'Com cavalete lateral e piloto sentado, folga no ponto médio inferior: 15–20 mm. Corrente folgada bate na carenagem e pode pular do pinhão em freadas bruscas. Corrente apertada desgasta rolamentos da roda traseira. Em uso de motoboy: ajustar semanalmente. Substitua quando elos se alongarem mais de 3% (meça 20 elos — devem ter 254 mm originalmente).',
  },
  {
    severity: 'WARN',
    title: 'Óleo do garfo: trocar a cada 20.000 km — amortecimento fraco indica óleo velho',
    body: 'Garfo telescópico convencional 33 mm. Óleo Honda SS-7 (10W) ou Motul Fork Oil 10W (R$35–50 por 500 mL). Troca restaura amortecimento sem precisar substituir o garfo. Sinais de degradação: tubo inferior com óleo escorrendo, impacto seco no rebaixamento. Retentores e raspapoeira em par: R$60–100.',
  },
]

const CG160_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CG 160 é a moto MAIS ROUBADA do Brasil — rastreador GPS é obrigatório',
    body: 'CG 160 lidera o ranking de roubo em todas as capitais brasileiras. Proteções mínimas: rastreador GPS com plano mensal (Cobli, Sascar, Omnilink — R$30–60/mês), alarme com bloqueio de ignição (Positron Duoblock G8 — R$280–400 instalado) e travão de disco. Seguros Porto Seguro, Tokio Marine e Allianz têm planos acessíveis para motos populares.',
  },
  {
    severity: 'DANGER',
    title: 'Vazamento na tampa do tanque — borracha de vedação deteriora com etanol',
    body: 'Em CGs 2015–2018, a borracha interna da tampa do tanque degrada com etanol e pode gotejar combustível próximo ao motor quente. Inspecionar a vedação mensalmente. Substituir a borracha (R$15–25 em distribuidoras) ou a tampa completa (R$60–100) ao primeiro sinal de ressecamento ou rachadura. Risco de incêndio sobre escapamento quente.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de óleo elevado após 60.000 km — anéis e retentores desgastados',
    body: 'CGs de uso intenso (motoboy) começam a consumir óleo após 60.000–80.000 km sem revisão. Sinais: fumaça azulada na largada, consumo de 200–300 mL entre trocas. Solução: jogo de anéis ProX ou Honda original (R$120–200) + retificação do cilindro (R$200–350). Adiar esse serviço danifica o catalisador e o sensor lambda.',
  },
  {
    severity: 'WARN',
    title: 'Rolamentos de roda: vida curta em uso pesado — 40.000–50.000 km',
    body: 'Rolamento 6302 (traseiro) e 6301 (dianteiro) têm vida curta em uso de motoboy. Sintoma: "cantarolar" ao girar a roda suspensa no cavalete, jogo lateral visível. Rolamentos SKF ou FAG (R$25–40 cada) são mais duráveis que o original Honda. Prevenção: não deixe corrente muito apertada — força extra no rolamento traseiro reduz a vida à metade.',
  },
  {
    severity: 'WARN',
    title: 'Sensor de neutro falha após 50.000 km — luz verde apaga, partida pode travar',
    body: 'Sensor de ponto morto desgastado provoca falha intermitente da luz de neutro. Sintoma: luz de neutro piscando ao engajar 1ª marcha. Limpar contatos do sensor com spray elétrico (WD-40 Contato Elétrico) e lubrificar. Sensor novo: R$40–70. Caso o cabo de embreagem esteja folgado, verifique o ajuste do cabo para garantir desacoplamento total.',
  },
]

// ─── CB 300 Twister (2015–2025) ──────────────────────────────────────────────
const TWISTER_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA2 — troca a cada 5.000 km; capacidade 1,5 L',
    body: 'Motor 286cc DOHC 4 válvulas refrigerado a óleo/ar. Capacidade: 1,5 L com filtro. Opções: Honda Ultra 4T 10W-40 (R$35–50/L), Motul 7100 10W-40 (R$55–75/L), Castrol Power1 10W-40 (R$40–55/L). O Honda original 10W-40 MA2 é obrigatório para garantir funcionamento correto da embreagem a seco. Intervalo 5.000 km é adequado para uso normal; em trânsito pesado, encurte para 4.000 km.',
  },
  {
    severity: 'OK',
    title: 'Filtro de óleo: Hiflofiltro HF303 — mesmo do CG 160, custa R$18–25',
    body: 'O filtro HF303 serve tanto na CG 160 quanto na CB 300 Twister (rosca M20×1.5, altura 65 mm). Original Honda: R$35–55. Hiflofiltro HF303 (R$18–25) ou Mann MW 64/1 (R$20–30) são alternativas com qualidade certificada. Trocar a cada troca de óleo.',
  },
  {
    severity: 'OK',
    title: 'Vela de ignição: NGK CR8EH-9 — gap 0,8 mm; Iridium CR8EHIX-9 dura o dobro',
    body: 'Original: NGK CR8EH-9 (R$20–30). Alternativa Iridium: NGK CR8EHIX-9 (R$70–90) — gap pré-ajustado em 0,8 mm (não mexer). Motor DOHC com tampa de válvulas acessível — vela substitui em 15 min. Intervalo: 8.000 km com vela comum, 16.000 km com Iridium. Alternativa Bosch: FR7DC+.',
  },
  {
    severity: 'OK',
    title: 'Válvulas: admissão 0,16 mm / escape 0,25 mm (motor DOHC) — revisar a cada 24.000 km',
    body: 'ATENÇÃO: o Twister usa motor DOHC com folgas de válvula DIFERENTES do CG 160. Com motor frio: admissão 0,16 ±0,03 mm / escape 0,25 ±0,03 mm. Folgas maiores que na CG — não confundir as especificações. Regulagem requer desmontagem da tampa do cabeçote; exige calibrador de lâminas de 0,16 mm.',
  },
  {
    severity: 'OK',
    title: 'Kit de transmissão 520: DID 520VX3 (corrente) + sprockets RK — mais leve e rápido',
    body: 'CB 300 Twister usa corrente de passo 520 (mais leva que 428 da CG). Kit completo: corrente DID 520VX3 108 elos (R$130–180), coroa 40 dentes ProX (R$80–110), pinhão 15 dentes (R$40–60). Custo total R$250–350 vs. kit original Honda R$450–600. Lubrifique a cada 500 km. O kit 520 mais leve reduz peso não-suspenso e melhora resposta.',
  },
  {
    severity: 'OK',
    title: 'Pneus: Pirelli Diablo Rosso II (100/80-17 F · 130/70-17 R) para máxima aderência',
    body: 'Tamanhos originais: 100/80-17 dianteiro, 130/70-17 traseiro. Pirelli Diablo Rosso II (R$220–280 dianteiro / R$280–360 traseiro) oferece aderência esportiva superior ao pneu de fábrica. Opção custo-benefício: Pirelli Sport Demon (R$160–200 F / R$200–250 R). Para uso diário e chuva: Michelin Pilot Street 2 (R$200–260 F). Nunca calibre abaixo de 28 PSI no dianteiro ou traseiro.',
  },
  {
    severity: 'OK',
    title: 'Pastilha de freio: EBC FA197HH (dianteiro) — sinterizada, melhor no molhado',
    body: 'Original Honda: R$150–200 (par dianteiro). Alternativas: EBC FA197HH sinterizada (R$100–140) ou SBS 671DS (R$120–160). Para o freio traseiro: EBC FA069HH (R$70–100). As sinterizadas têm maior mordida no molhado — importante no trânsito das cidades brasileiras. Substituir quando espessura atingir 1,5 mm.',
  },
  {
    severity: 'OK',
    title: 'CBS (Combined Brake System): pedal traseiro aciona parcialmente o dianteiro',
    body: 'A CB 300 Twister tem freio CBS (Combined): pressionar o pedal traseiro aciona automaticamente o freio dianteiro em menor proporção. Isso é NORMAL e melhora a frenagem. Muitos compradores acham estranho inicialmente. Não tente desativar o CBS — ele é integrado ao sistema hidráulico. Em frenagens de emergência, use os dois freios simultaneamente.',
  },
  {
    severity: 'WARN',
    title: 'Vibração nos espelhos a 5.000–6.500 RPM — ressonância estrutural conhecida',
    body: 'Muitos donos de Twister reclamam de espelhos tremendo em rotações de cruzeiro (5.000–6.500 RPM). Solução barata: borrachas antivibracionais na base dos espelhos (R$15–30 o par em lojas de moto). Espelhos aftermarket mais pesados (Rizoma ou Puig) também reduzem a ressonância. O problema não indica defeito mecânico — é característica construtiva.',
  },
]

const TWISTER_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Falha no sistema de freio CBS — fluido velho causa pressão inconsistente',
    body: 'O sistema CBS interliga os dois freios hidraulicamente. Fluido de freio velho (acima de 2 anos) absorve umidade e reduz o ponto de ebulição, causando freio esponjoso. Trocar fluido DOT 4 a cada 18.000 km ou 2 anos — nunca misturar DOT 3 e DOT 4. Sintoma de perigo: pedal/manete "cedendo" gradualmente durante frenagem prolongada em descida.',
  },
  {
    severity: 'WARN',
    title: 'Barulho de "piston slap" no motor frio — normal até aquecer, verificar consumo de óleo',
    body: 'Batida metálica leve ao ligar o motor frio é normal no Twister — expansão térmica do pistão. Deve desaparecer em 30–60 segundos após aquecimento. Se persistir com motor quente ou acompanhar consumo elevado de óleo, pode indicar desgaste do cilindro. Checar nível de óleo semanalmente; se consumir mais de 150 mL/1.000 km, levar para inspeção.',
  },
  {
    severity: 'WARN',
    title: 'Afrouxamento do pino de direção (stem) após 20.000 km em uso urbano intenso',
    body: 'O pino de direção (stem) da Twister tende a afrouxar com o uso intenso em paralelepípedo e lombadas. Sintoma: leve "tranco" ou "pancada" na direção ao frear. Teste: com a moto em pé sobre o cavalete central, apalpe a área do cabeote enquanto um ajudante empurra levemente o guidão. Ajuste: colarinho de direção — serviço simples de 15 min em qualquer oficina.',
  },
  {
    severity: 'WARN',
    title: 'Corrente 520 dura menos que a 428 da CG em uso descuidado — lubrificar sempre',
    body: 'A corrente 520 é mais leve mas exige lubrificação regular. Em uso de motoboy ou com corrente ressecada, a vida útil cai para 15.000–20.000 km (vs. 25.000–30.000 km com lubrificação adequada). Use spray de corrente a cada 500 km e sempre com a corrente em temperatura normal (não aquecida). Nunca use WD-40 puro como lubrificante de corrente — ele seca rapidamente.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedor traseiro básico de fábrica — substituição melhora conforto em lombadas',
    body: 'O amortecedor traseiro original da Twister é de série básica e perde eficiência após 30.000 km. Sinais: "afundamento" excessivo em lombadas, moto "balançando" após passar em buracos. Substituição YSS (G-Series, R$350–500) ou Showa melhora substancialmente o conforto. O ajuste de preload do amortecedor original permite leve ajuste de altura.',
  },
]

// ─── XRE 300 (2010–2025) ─────────────────────────────────────────────────────
const XRE300_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 ou 10W-40 JASO MA2 — troca a cada 5.000 km; 1,6 L com filtro',
    body: 'Motor 286cc DOHC 4 válvulas (mesmo bloco do Twister). Capacidade: 1,6 L com filtro. Honda recomenda 10W-30, mas 10W-40 é aceito para uso off-road em alta temperatura. Opções: Honda Ultra 4T 10W-30 (R$30–40/L), Motul 5100 10W-30 (R$45–60/L). Em trilhas, óleo de qualidade superior protege melhor em acelerações e desacelerações bruscas constantes.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: limpar a cada 3.000 km em trilha — CRÍTICO para motor a ar',
    body: 'Em uso off-road, o filtro de ar da XRE 300 entope muito mais rápido que em moto de rua. Limpar/inspecionar a cada 3.000 km (trilha pesada) ou 6.000 km (estrada). Usar compressor de ar com suave pressão de fora para dentro para não romper o papel. Substituição do filtro: R$35–55 (original), ou K&N HA-6803 lavável (R$190–240). Rodar com filtro sujo causa desgaste acelerado e perda de potência.',
  },
  {
    severity: 'OK',
    title: 'Pneu misto traseiro: Pirelli MT90 Scorpion ou Shinko 705 — equilíbrio on/off',
    body: 'Tamanhos originais: 100/90-19 dianteiro, 120/80-18 traseiro (versões clássicas). Para uso misto: Pirelli MT90 Scorpion (R$250–320 traseiro) oferece bom desempenho em asfalto e terra. Alternativa mais agressiva: Shinko 705 (R$200–260 traseiro). Para trilha pesada: Dunlop D605 (R$280–360). Calibrar para off-road: reduzir para 20–22 PSI dianteiro e 22–25 PSI traseiro.',
  },
  {
    severity: 'OK',
    title: 'Protetor de motor (skid plate): alumínio 3mm obrigatório para trilha',
    body: 'Sem protetor de motor, o cárter de alumínio da XRE 300 é vulnerável a pedras em trilha. Protetor de alumínio de 3–4 mm (R$180–350, marcas: Tury, Bela ou fabricação local) é investimento obrigatório antes de entrar em qualquer trilha. O protetor original Honda (R$400–600) é mais caro mas tem encaixe perfeito. Molas de tensão para fixação adicional são recomendadas.',
  },
  {
    severity: 'OK',
    title: 'Relação de transmissão: pinhão 14 dentes aumenta desempenho off-road',
    body: 'Original: pinhão 15 dentes, coroa 40 dentes. Para uso off-road e trilha: pinhão 14 dentes (R$40–55) + coroa original 40 ou 42 dentes (R$70–100). Resultado: mais torque nas marchas baixas para subidas íngremes, a custo de redução de ~10 km/h na velocidade máxima. Para estrada apenas: manter pinhão 15 + coroa 38 para maior velocidade de cruzeiro.',
  },
  {
    severity: 'OK',
    title: 'Handguard (protetor de mão): previne lesão e danos no guidão em queda',
    body: 'Em trilha, a queda lateral com guidão em terra pode danificar o protetor de controles, manete e até o guidão. Handguard rígido (Acerbis, Polisport ou nacional — R$120–250 o par) é equipamento básico para off-road. Além de proteger guidão e mãos, reduz torção do guidão em impactos. Modelo com fixação de alumínio é mais robusto que o de plástico.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR8EH-9 ou DR8EA — mesma da CB 300, substituir a cada 8.000 km',
    body: 'Motor DOHC comparte a mesma vela da CB 300 Twister. Original: NGK CR8EH-9 (R$20–30), gap 0,8 mm. Alternativa Iridium: CR8EHIX-9 (R$70–90) — recomendada para quem usa a XRE em trilha com muita aceleração e desaceleração. Manter a caixa de ferramentas com uma vela reserva — falha de ignição em trilha pode deixar você a pé em área remota.',
  },
  {
    severity: 'WARN',
    title: 'Balanceamento das rodas obrigatório a cada 5.000 km — trepidação acima de 100 km/h',
    body: 'A XRE 300 com pneus desequilibrados vibra intensamente acima de 100 km/h — incômodo em viagens longas de estrada. Balancear as rodas a cada 5.000 km ou após qualquer troca de pneu. Rodas arame (raios) da XRE são mais suscetíveis ao desequilíbrio que rodas de liga. Verificar tensão dos raios a cada 10.000 km: raio frouxo cria vibração localizada.',
  },
  {
    severity: 'WARN',
    title: 'Cubo da roda dianteira: rolamentos 6301 com vida reduzida em off-road pesado',
    body: 'Rolamento do cubo dianteiro (6301) da XRE 300 dura apenas 30.000–40.000 km em uso off-road frequente. Sintoma: vibração ao frear, barulho de "canto" ao girar a roda suspensa. Troca preventiva com SKF 6301-2RS (R$30–45) é mais barata que aguardar falha completa. Verificar rolamentos a cada revisão ou após uso intenso em lama e areia.',
  },
]

const XRE300_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Pneu misto calibrado para estrada DERRAPA em trilha molhada — ajuste a calibragem',
    body: 'XRE 300 calibrada para estrada (26–29 PSI) em trilha molhada em argila ou lama tem muito menos aderência e pode derrapar. Para off-road: reduzir para 20–22 PSI dianteiro e 22–25 PSI traseiro — maior área de contato melhora tração. Ao voltar para estrada, recalibrar para os valores normais. Pneus com pressão excessiva em off-road são responsáveis pela maioria das quedas em curvas de terra.',
  },
  {
    severity: 'WARN',
    title: 'Garfo dianteiro 41 mm com pouco curso útil — impacto em buracos pode tocar no limite',
    body: 'O garfo da XRE 300 tem curso de 170 mm — adequado para trilha moderada, mas "toca no fundo" em buracos fundos ou saltos. Sintoma: barulho de "clunk" metálico ao descer de bordas altas. Solução: aumentar nível do óleo do garfo (de 120 para 140 mm de altura) para maior rigidez; ou instalar espaçador de câmara de ar. Trocar o óleo do garfo a cada 15.000 km (10W, 500 mL por perna).',
  },
  {
    severity: 'WARN',
    title: 'Comando de válvulas da XRE 300 (modelos até 2015) pode falhar a desgaste prematuro',
    body: 'Relatos de donos de XRE 300 2010–2015 apontam desgaste do tensor de corrente de comando e ocasional "pular de fase" da corrente de distribuição ao redor de 50.000–60.000 km. Sintoma: barulho metálico ritmado ao acelerar, perda de potência. O tensor hidráulico da Honda costuma resolver bem, mas verificar o jogo da corrente de distribuição na revisão de 50.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Correia de transmissão da central elétrica pode falhar em 40.000 km (modelos mais antigos)',
    body: 'Alguns modelos XRE 300 (especialmente 2010–2013) tiveram reclamações de falha do alternador (gerador) antes dos 50.000 km, resultando em descarga da bateria. Sintoma: luz de bateria acendendo, dificuldade de partida elétrica. Alternador remanufaturado: R$200–350. Regulador de tensão externo separado (R$60–100) como medida preventiva é recomendado em motos acima de 40.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Banco desconfortável para viagens longas — almofada de gel resolve o problema',
    body: 'Banco original da XRE 300 é firme e estreito, causando desconforto após 1–2 horas de estrada. Opção 1: almofada de gel sob o estofado (R$80–150). Opção 2: retapeçaria com espuma de 40 kg (R$120–200 em tapeceiros). Opção 3: banco aftermarket Capa Sela (R$300–500). A posição ereta da XRE já é mais confortável que motos esportivas, mas o banco é o ponto fraco para viajantes.',
  },
]

// ─── NXR 160 Bros (2015–2025) ────────────────────────────────────────────────
const NXR160_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA2 — troca a cada 3.000 km; capacidade 1,0 L',
    body: 'Motor 163cc MX160E SOHC 2 válvulas PGM-FI refrigerado a ar. Capacidade: 1,0 L com filtro. Honda Ultra 4T 10W-30 (R$30–40/L) é o recomendado. Alternativas: Motul 3000 10W-30 (R$25–35/L), Lubrax Moto 4T 10W-30 (R$18–25/L). Para uso off-road intenso, prefira 10W-40 no verão para maior proteção em temperatura elevada. Verificar nível semanalmente — SOHC a ar aquece mais que motor refrigerado a líquido.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK DPR8EA-9 — use faixa quente para off-road pesado e lama',
    body: 'Original: NGK DPR8EA-9 (R$15–25), gap 0,9 mm. A "8" indica vela mais quente que a DPR7EA-9 da CG 160 — adequada para o uso off-road da Bros, que tem acelerações e desacelerações constantes. Em uso exclusivo de estrada: DPR7EA-9 também funciona. Alternativa Iridium: NGK DPR8EIX-9 (R$65–80). Manter uma vela reserva na caixa de ferramentas ao sair para trilha.',
  },
  {
    severity: 'OK',
    title: 'Pneu dianteiro misto: Pirelli MT15 80/100-21 — excelente tração em terra',
    body: 'NXR 160 Bros usa roda de 21" na frente (moto trail). Tamanho: 80/100-21 dianteiro, 90/90-18 traseiro. Para uso misto (estrada + terra): Pirelli MT15 (R$150–220 dianteiro / R$160–220 traseiro) é a referência. Para trilha pesada: Maxxis Maxxcross (R$200–270). Para asfalto apenas: Pirelli Pilot Street 80/100-21 (R$150–200). Calibragem off-road: reduzir para 20 PSI na frente e 22 PSI atrás.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: lavar a cada 3.000 km em terra; CRÍTICO em uso off-road',
    body: 'Em uso off-road em terra, poeira e lama entopem o filtro rapidamente. Limpar a cada 3.000 km no máximo — ou após cada saída em estrada de terra pesada. O filtro de espuma original pode ser lavado com sabão neutro, seco completamente ao sol e reimpregnado com óleo de filtro K&N (spray, R$50–70) antes de recolocar. Sem filtro funcional: poeira entra no motor e desgasta o cilindro rapidamente.',
  },
  {
    severity: 'OK',
    title: 'Corrente: DID 428NZ-V trail ou EK 428SH — passo 428, reforçada para off-road',
    body: 'NXR 160 usa corrente 428 reforçada. Para off-road com lama: DID 428NZ-V (não tem retentor — lave mais facilmente após trilha, R$80–110). Para uso misto: EK 428SH (R$90–120). NUNCA entre em lamaçal com corrente seca — a lama abrasiva acelera desgaste. Lavar após cada trilha e relubrifar imediatamente. Tensão: 20–25 mm de folga (mais que CG — roda traseira longa para off-road).',
  },
  {
    severity: 'OK',
    title: 'Protetor de motor de alumínio: previne trincas no cárter em trilha com pedras',
    body: 'Cárter de alumínio da NXR 160 é vulnerável a impactos de pedras em trilha. Protetor de alumínio 3 mm (Tury, Bela ou nacional — R$150–280) é investimento fundamental. Instalar antes da primeira saída off-road. O protetor original Honda (R$350–500) tem encaixe preciso mas custo elevado. Verificar os parafusos de fixação do protetor a cada 5.000 km — vibração em off-road os afrouxa.',
  },
  {
    severity: 'OK',
    title: 'Válvulas: folga admissão 0,10 mm / escape 0,15 mm — regular a cada 24.000 km',
    body: 'Motor SOHC 2 válvulas. Folgas idênticas à CG 160 (mesmo conjunto de válvulas): admissão 0,10 ±0,02 mm / escape 0,15 ±0,02 mm. Regular com motor frio. Barulho de "tic-tic" crescente = válvulas folgadas. Em uso off-road intenso, verificar a cada 12.000 km — impactos constantes vibram os componentes do motor mais que uso em asfalto.',
  },
  {
    severity: 'WARN',
    title: 'Airbox entupido em trilha com lama — moto para subitamente; verificar antes de ir',
    body: 'Uma das reclamações mais comuns de donos da NXR 160 em grupos de off-road: moto para inesperadamente na trilha após muita lama. Causa: airbox ou snorkel do filtro de ar entupido de lama. Inspecionar o filtro e o duto de entrada antes de cada saída em terra. Instalar snorkel elevado (tubo de captação de ar mais alto) é modificação barata (R$30–60) que previne esse problema.',
  },
]

const NXR160_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Calibragem de estrada em trilha molhada — risco grave de derrapagem',
    body: 'NXR 160 Bros calibrada para asfalto (26 PSI F / 29 PSI R) fica escorregadia em terra molhada ou lama. Reduzir para 20 PSI dianteiro e 22 PSI traseiro em off-road — pressão menor aumenta a área de contato e melhora tração. Ao retornar ao asfalto: recalibrar imediatamente para valores normais. Pneu subpressurizado em alta velocidade no asfalto aquece excessivamente e pode bolhar.',
  },
  {
    severity: 'WARN',
    title: 'Reservatório de combustível pequeno (13 L) — planejar abastecimento em trilhas longas',
    body: 'A NXR 160 Bros tem tanque de 13 litros. Com consumo de 20–25 km/L em off-road pesado (vs. 30 km/L em estrada), a autonomia cai para 260–325 km em trilha. Em regiões remotas, planejar o abastecimento ou levar galão reserva (2 L de galão lateral é suficiente para segurança). Sensor de combustível da Honda Bros: confiar nele, é preciso. Luz de reserva = 1,5–2 L restantes.',
  },
  {
    severity: 'WARN',
    title: 'Motor para subitamente em uso off-road — maioria dos casos é filtro de ar sujo',
    body: 'Antes de chamar reboque após moto parar em trilha: 1) checar filtro de ar (lama); 2) checar vela (encharcada de combustível por afogamento); 3) checar injetor (pressão); 4) checar tanque (combustível — sedimento pode entupir filtro da bomba). Em 80% dos casos de pane em off-road, o problema é filtro entupido. Carregue sempre vela reserva, chave de vela e spray de partida.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedor traseiro basic com 2,5 cm de curso — cansativo em trilha pesada',
    body: 'O amortecedor traseiro original da NXR 160 Bros tem curso curto (comparado a enduro real) e se cansa em trilhas longas com muitos impactos. Substituição: YSS MZ456-255TRL-10-888 (específico para Bros, R$350–500) melhora substancialmente o controle em terra. Pré-carga do original: ajustar para o máximo para uso off-road — reduz "afundamento" em impactos.',
  },
  {
    severity: 'WARN',
    title: 'Guidão estreito dificulta manobras em trilha — adaptador ou guidão mais largo resolve',
    body: 'O guidão original da NXR 160 Bros (750 mm) é mais estreito que guidões de enduro proper. Para off-road intenso, trocá-lo por guidão de 800–820 mm (Renthal, Tag Metals — R$150–300) melhora controle lateral e capacidade de "pilotar em pé". Necessário adaptador de guidão (R$30–60) para fixar o diâmetro correto. Curvatura "bend" baixa é recomendada para trail.',
  },
]

// ─── PCX 160 (2021–2025) ─────────────────────────────────────────────────────
const PCX160_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MB — troca a cada 3.000 km; capacidade 0,8 L',
    body: 'Motor 156,9cc eSP+ SOHC 4 válvulas. IMPORTANTE: scooters usam JASO MB (sem embreagem a seco = sem friccionais), NÃO JASO MA2 como as motos com câmbio manual. Usar MA2 em scooter não causa problema mas não é ideal. Capacidade 0,8 L com filtro. Honda Ultra Scooter 10W-30 (R$30–40/L) ou Motul Scooter LE 10W-30 (R$40–55/L). Troca frequente = motor eSP+ dura mais de 100.000 km.',
  },
  {
    severity: 'OK',
    title: 'CVT (variador): limpar e inspecionar roletes a cada 10.000 km',
    body: 'O sistema CVT da PCX 160 usa variador com roletes (rolete 16×13 mm, 10g originais). Graxa velha no variador vira pasta abrasiva e desgasta o componente. Limpeza: remover variador, limpar com pano seco (NUNCA solvente), verificar desgaste dos roletes (limite: < 15,3 mm de diâmetro). Troca de rolete original Honda: R$15–25 cada (são 6). Roletes mais pesados (11–12g) = partida de embreagem mais tarde; mais leves (9g) = mais agressivo.',
  },
  {
    severity: 'OK',
    title: 'Mola da embreagem: Malossi ou Polini (R$40–80) melhora saída da embreagem',
    body: 'Mola de embreagem mais forte faz a embreagem "fechar" a velocidade mais alta (mais RPM), melhorando a resposta em aceleração e saída do sinal. Mola Malossi ou Polini reforçada (R$40–80) é modificação simples e eficaz. Para uso normal na cidade, a mola original é adequada. Para uso com baú pesado ou carga: mola mais forte previne escorregamento da embreagem.',
  },
  {
    severity: 'OK',
    title: 'Pneu: Pirelli Angel Scooter 110/70-14 F · 130/70-13 R — aderência superior',
    body: 'Tamanhos originais: 110/70-14 dianteiro, 130/70-13 traseiro. Pirelli Angel Scooter (R$160–220 F / R$180–250 R) oferece excelente aderência no molhado — essencial para scooter usada no trânsito diário. Alternativa: Maxxis MA-3D (R$120–160 F / R$140–180 R). Nunca calibrar scooter acima de 35 PSI no traseiro — pneu duro prejudica tração e aumenta distância de frenagem.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CPR8EA-9: gap 0,9 mm — trocar a cada 8.000 km',
    body: 'Vela original PCX 160: NGK CPR8EA-9 (R$20–30). Alternativa Iridium: NGK CPR8EAIX-9 (R$70–90) — dura 16.000 km e melhora partida a frio. Gap: 0,9 mm (não ajustar em iridium). A vela fica acessível pela tampa lateral direita da PCX — troca simples de 10 minutos. Vela desgastada = partida difícil no frio e consumo elevado.',
  },
  {
    severity: 'OK',
    title: 'Baú traseiro: suporte original Honda + baú 30 L Givi E300 — combinação ideal',
    body: 'A PCX 160 tem suporte de baú integrado na bagageira traseira. Baú Givi E300 30 L (R$350–500) encaixa com adaptador específico (R$80–120). Alternativa custo-benefício: baú Bauleto Evo 40 L (R$200–300) com suporte universal. O baú 30 L comporta capacete aberto e 1 capacete fechado pequeno. Distribuição de peso: manter peso centrado, nunca pendurar bolsas laterais pesadas sem rack.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: trocar a cada 12.000 km; limpar a cada 6.000 km',
    body: 'Filtro de papel original PCX 160 (R$35–50). Acesso pelo compartimento sob o banco — ferramenta desnecessária. Limpar a cada 6.000 km com sopro de ar comprimido (de fora para dentro). Substituir a cada 12.000 km ou ao notar perda de desempenho. Em dias de chuva intensa, verificar se o filtro foi exposto à água (mangueira de drenagem pode entupir).',
  },
  {
    severity: 'OK',
    title: 'CBS (freio combinado): pedal traseiro aciona parcialmente o dianteiro — normal',
    body: 'PCX 160 tem freio CBS de série: o pedal traseiro aciona automaticamente também o freio dianteiro em proporção menor. Isso reduz distância de frenagem em emergência e estabiliza a moto. Não é defeito — é recurso de segurança obrigatório na categoria. Trocar fluido DOT 4 a cada 2 anos ou 18.000 km para manter o sistema responsivo.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento em engarrafamento longo — manter rotação levemente acima do ralenti',
    body: 'Em engarrafamento prolongado com temperatura ambiente alta, o ventilador elétrico do radiador da PCX 160 trabalha continuamente. Se a temperatura subir demais (luz no painel), manter o motor ligado em ponto morto ajuda o ventilador a resfriar — NUNCA desligue o motor com motor quente e fique parado (motor desligado = ventilador para). Verificar nível de líquido de arrefecimento mensalmente.',
  },
]

const PCX160_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'CVT com rolete desgastado — aceleração "puxada" ou engasgo ao sair do sinal',
    body: 'Roletes desgastados do variador causam aceleração irregular: a PCX 160 "patina" no sinal, oscila entre aceleração e arrasto, ou tem "buraco" na entrega de potência em rotação média. Diagnóstico: desmontar o variador e medir diâmetro dos roletes (menos de 15,3 mm = troca). Custo do serviço completo: R$150–250 (peças + mão de obra). Prevenir: limpeza do variador a cada 10.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão no escapamento próximo ao coletor — comum em cidades costeiras',
    body: 'Em cidades litorâneas (Rio, Santos, Florianópolis), o escapamento da PCX 160 oxida a partir de 20.000–30.000 km na junção do coletor com o silencioso. Solução preventiva: tinta de alta temperatura (R$30–50) na solda do coletor ao notar início de corrosão. Escapamento completo original Honda: R$600–900. Alternativa: escapamento esportivo Akrapovic ou FMF (R$800–1200) — mais leve e com nota mais agradável.',
  },
  {
    severity: 'WARN',
    title: 'Painel digital com reflexo excessivo à luz do sol direta — dificuldade de leitura',
    body: 'Reclamação frequente de donos da PCX 160: o painel digital (geração 2021+) tem reflexo intenso com sol direto de frente. Isso é limitação de design — a tela não tem tratamento antirreflexo adequado. Solução: película fosca de proteção (R$20–40 cortada no tamanho) reduz significativamente o reflexo. Alternativa: viseira do capacete com espelho que bloqueia o sol melhora a visibilidade.',
  },
  {
    severity: 'WARN',
    title: 'Ruído no compartimento de bagagem — fixação do revestimento interno solta',
    body: 'Frequente nos primeiros 10.000 km: barulho de estalo ou chocalho vindo do compartimento sob o banco. Causa: grampos de encaixe do revestimento interno se soltam com vibração. Solução: retirar os forros e reaplicar os grampos (verificar o encaixe correto — "click" firme). Usar cola de silicone nos pontos que não travam corretamente. Nenhum impacto na mecânica — é apenas esteticamente irritante.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de óleo elevado em scooters com mais de 40.000 km de uso intenso',
    body: 'Motores eSP+ em PCX 160 usadas como táxi de aplicativo ou entrega (>40.000 km com trocas irregulares de óleo) começam a consumir óleo. Sinais: fumaça azulada ao acelerar, nível de óleo caindo entre trocas. Preventivo: manter troca rigorosa a cada 3.000 km com óleo de qualidade. Retificação do motor eSP+: R$500–800 (cilindro + anéis) — mais barato que motor novo.',
  },
]

// ─── Biz 125 (2016–2025) ─────────────────────────────────────────────────────
const BIZ125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MB — troca a cada 3.000 km; capacidade 0,8 L',
    body: 'Motor 124,1cc SOHC 2 válvulas PGM-FI. Capacidade: 0,8 L. Usar JASO MB (scooter com CVT e embreagem centrífuga, não MA2). Honda Ultra Scooter 10W-30 (R$30–40/L) ou Motul Scooter LE 10W-30 (R$40–55/L). Troca frequente (a cada 3.000 km) é mais importante que a marca do óleo — a Biz é motor simples e durável quando bem tratado.',
  },
  {
    severity: 'OK',
    title: 'CVT: inspecionar roletes a cada 10.000 km — rolete desgastado = aceleração irregular',
    body: 'Variador com roletes de 18×14 mm (10g originais). Desgaste dos roletes causa "patinada" na largada ou aceleração "puxada". Verificar diâmetro (limite < 17,3 mm) e a forma (achamento indica desgaste assimétrico). Roletes Honda originais: R$10–15 cada (são 6); alternativas Polini ou Malossi são de qualidade equivalente. Limpar o variador com pano seco, nunca solvente.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK DPR7EA-9: gap 0,9 mm — mesma da CG 160; trocar a cada 8.000 km',
    body: 'Biz 125 usa a mesma vela que a CG 160: NGK DPR7EA-9 (R$15–25). Iridium NGK DPR7EIX-9 (R$65–80) dura o dobro. Gap: 0,90 mm. Acessível pelo lado direito da Biz, sem desmontagem de carenagem. Troca trimestral para motoboy; anual para uso leve.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: limpar a cada 6.000 km; substituir a cada 12.000 km',
    body: 'Filtro de papel original (R$25–40). Acesso simples pelo painel lateral. Em uso urbano, limpar a cada 6.000 km com jato suave de ar comprimido (de fora para dentro). Substituir ao notar fumaça preta ou perda de potência. Filtro entupido causa mistura rica, consumo elevado e poluição excessiva.',
  },
  {
    severity: 'OK',
    title: 'Pneu: Pirelli City 80/90-14 F · 90/90-14 R — excelente custo-benefício',
    body: 'Tamanhos: 80/90-14 dianteiro, 90/90-14 traseiro. Pirelli City (R$90–120 F / R$110–140 R) ou Maxxis MA-3D (R$80–110 F / R$100–130 R) são as melhores opções custo-benefício. Calibragem: 26 PSI dianteiro, 29 PSI traseiro (solo). Nunca usar pneu remold em scooter — pequenas rodas 14" amplificam qualquer desequilíbrio. Substituir quando profundidade do sulco atingir 1,6 mm.',
  },
  {
    severity: 'OK',
    title: 'Freio traseiro: lona de tambor Cobreq ou Ina — vida útil superior à original',
    body: 'Biz 125 tem tambor traseiro e disco dianteiro. Lona de freio traseiro: Cobreq ou Ina (R$20–35) substitui o original Honda (R$35–55). Substituir quando espessura da lona atingir 2 mm ou ao aparecer rangido constante. O freio CBS da Biz interliga dianteiro e traseiro — funcionamento do tambor traseiro afeta todo o sistema de frenagem.',
  },
  {
    severity: 'OK',
    title: 'Pastilha de freio dianteiro: EBC FA069HH ou SBS — mais duráveis que o original',
    body: 'Disco dianteiro da Biz 125. Pastilha EBC FA069HH sinterizada (R$70–100) ou SBS 543DS (R$80–110) duram mais que o original Honda (R$60–90) e mordem melhor no molhado. Verificar espessura a cada 6.000 km; substituir abaixo de 1,5 mm. Em uso urbano intenso (motoboy), verificar a cada 3.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Alarme obrigatório — Biz 125 está entre as mais roubadas do Brasil',
    body: 'A Honda Biz 125 é um dos alvos favoritos de ladrões nas cidades brasileiras pelo seu preço baixo no mercado de peças. Instalar alarme com bloqueio de ignição (Positron Duoblock G6 — R$200–300 instalado) é investimento fundamental. Rastreador GPS reduz ainda mais o risco. Seguro de moto popular pode custar R$80–150/mês dependendo da cidade — viável para quem usa a Biz como instrumento de trabalho.',
  },
]

const BIZ125_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Biz 125 entre as motos mais roubadas — sem alarme, é questão de tempo',
    body: 'Dados do Senatran confirmam: Biz 125 lidera rankings de furto em várias cidades do interior e periferia das capitais. Custo de blindagem mínima: alarme Positron G6 (R$200–300 instalado) + rastreador GPS de entrada (R$150–200 + plano R$20–30/mês) + cadeado de disco (R$80–150). Total: R$430–680 — menos que 1 mês de parcela da moto. Sem proteção, a expectativa de furto em área de risco é de 1–2 anos.',
  },
  {
    severity: 'WARN',
    title: 'CVT "engasgando" na aceleração — causa mais comum é rolete desgastado',
    body: 'Sintoma: a Biz 125 acelera normalmente até certo ponto e depois "trava" antes de continuar acelerando, como se houvesse um "buraco" de potência. Causa mais comum: roletes do variador ovalados ou desgastados, ou mola da embreagem esticada. Substituir os 6 roletes e a mola da embreagem ao mesmo tempo (custo total: R$60–120 em peças + mão de obra) resolve na maioria dos casos.',
  },
  {
    severity: 'WARN',
    title: 'Ruído de "chocalho" no compartimento dianteiro — parafusos do painel soltos',
    body: 'Barulho de peça solta vindo do painel dianteiro é queixa frequente em Biz com mais de 15.000 km. Causa: parafusos do painel, farol e suportes de plástico vibram e afrouxam. Solução: apertar todos os parafusos plásticos com chave Philips (torque leve — não forçar em plástico) e aplicar Loctite 222 (azul fraco) para manter. Verificar a cada 10.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Espelhos vibram a 4.500–5.500 RPM — ressonância estrutural da Biz',
    body: 'Característica bem conhecida da Biz 125: espelhos tremem em rotações de cruzeiro (velocidade urbana), tornando difícil ver o tráfego atrás. Solução barata: borrachas antivibracionais na rosca dos espelhos (R$10–20 o par). Espelhos aftermarket mais pesados (R$40–80 o par) também resolvem — o peso extra elimina a ressonância. Espelhos convexos são mais práticos para o trânsito urbano.',
  },
  {
    severity: 'WARN',
    title: 'Chicote elétrico pode apresentar falhas após 5 anos — verificar conexões oxidadas',
    body: 'Biz 125 com mais de 5 anos em uso urbano intenso (umidade, calor, vibração) pode desenvolver falhas intermitentes na iluminação, painel ou partida elétrica por oxidação nos conectores do chicote. Limpeza dos conectores com spray de contato elétrico (WD-40 Contato, R$15–25) resolve a maioria dos casos. Conectores da Honda têm trava plástica de segurança — nunca puxe pela fiação.',
  },
]

// ─── MANUTENÇÃO ───────────────────────────────────────────────────────────────
const CG160_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CG 160', yearFrom: 2015, yearTo: 2025, component: 'Óleo do motor (10W-30 JASO MA2)', intervalKm: 3000, intervalMonths: 6, notes: 'Capacidade 1,0 L com filtro. Encurtar para 2.500 km em uso de motoboy.', priority: 'CRITICAL', order: 1 },
  { modelName: 'CG 160', yearFrom: 2015, yearTo: 2025, component: 'Filtro de óleo', intervalKm: 3000, intervalMonths: 6, notes: 'Trocar junto com o óleo. Alternativa: Hiflofiltro HF303 (R$18–25).', priority: 'HIGH', order: 2 },
  { modelName: 'CG 160', yearFrom: 2015, yearTo: 2025, component: 'Lubrificação da corrente de transmissão', intervalKm: 500, intervalMonths: null, notes: 'Usar spray de corrente. Nunca usar WD-40 puro como lubrificante.', priority: 'HIGH', order: 3 },
  { modelName: 'CG 160', yearFrom: 2015, yearTo: 2025, component: 'Verificação/ajuste da tensão da corrente', intervalKm: 1000, intervalMonths: 1, notes: 'Folga: 15–20 mm no ponto médio inferior com piloto sentado.', priority: 'HIGH', order: 4 },
  { modelName: 'CG 160', yearFrom: 2015, yearTo: 2025, component: 'Vela de ignição (NGK DPR7EA-9)', intervalKm: 8000, intervalMonths: 12, notes: 'Gap 0,9 mm. Iridium DPR7EIX-9 dura 16.000 km.', priority: 'MEDIUM', order: 5 },
  { modelName: 'CG 160', yearFrom: 2015, yearTo: 2025, component: 'Limpeza do filtro de ar', intervalKm: 6000, intervalMonths: 6, notes: 'Em uso off-road ou terra: a cada 3.000 km. Nunca rodar sem filtro.', priority: 'MEDIUM', order: 6 },
  { modelName: 'CG 160', yearFrom: 2015, yearTo: 2025, component: 'Troca do filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Filtro de papel original (R$25–40). K&N HA-6803 lavável permanente (R$190–240).', priority: 'LOW', order: 7 },
  { modelName: 'CG 160', yearFrom: 2015, yearTo: 2025, component: 'Regulagem de válvulas', intervalKm: 24000, intervalMonths: 24, notes: 'Admissão 0,10 mm / escape 0,15 mm com motor frio.', priority: 'HIGH', order: 8 },
  { modelName: 'CG 160', yearFrom: 2015, yearTo: 2025, component: 'Verificação dos freios (pastilhas/lona)', intervalKm: 5000, intervalMonths: 6, notes: 'Substituir pastilha abaixo de 1,5 mm ou lona abaixo de 2 mm.', priority: 'HIGH', order: 9 },
  { modelName: 'CG 160', yearFrom: 2015, yearTo: 2025, component: 'Troca do fluido de freio (DOT 4)', intervalKm: 18000, intervalMonths: 24, notes: 'Fluido absorve umidade com o tempo — troca obrigatória a cada 2 anos.', priority: 'MEDIUM', order: 10 },
  { modelName: 'CG 160', yearFrom: 2015, yearTo: 2025, component: 'Óleo do garfo dianteiro', intervalKm: 20000, intervalMonths: 24, notes: 'Honda SS-7 (10W) ou Motul Fork Oil 10W. Trocar junto com retentores se houver vazamento.', priority: 'MEDIUM', order: 11 },
  { modelName: 'CG 160', yearFrom: 2015, yearTo: 2025, component: 'Troca do kit de transmissão (corrente + coroa + pinhão)', intervalKm: 30000, intervalMonths: 36, notes: 'DID 428NZ-V + coroa 41 + pinhão 15. Kit alternativo R$170–235 vs. Honda R$320–450.', priority: 'HIGH', order: 12 },
]

const TWISTER_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CB 300 Twister', yearFrom: 2015, yearTo: 2025, component: 'Óleo do motor (10W-40 JASO MA2)', intervalKm: 5000, intervalMonths: 6, notes: 'Capacidade 1,5 L com filtro. Em trânsito pesado, encurtar para 4.000 km.', priority: 'CRITICAL', order: 1 },
  { modelName: 'CB 300 Twister', yearFrom: 2015, yearTo: 2025, component: 'Filtro de óleo', intervalKm: 5000, intervalMonths: 6, notes: 'Hiflofiltro HF303 compatível (R$18–25). Apertar mão + ¾ de volta.', priority: 'HIGH', order: 2 },
  { modelName: 'CB 300 Twister', yearFrom: 2015, yearTo: 2025, component: 'Lubrificação da corrente de transmissão', intervalKm: 500, intervalMonths: null, notes: 'Corrente 520 — mais leve, exige lubrificação rigorosa. Nunca WD-40 puro.', priority: 'HIGH', order: 3 },
  { modelName: 'CB 300 Twister', yearFrom: 2015, yearTo: 2025, component: 'Verificação/ajuste da tensão da corrente', intervalKm: 1000, intervalMonths: 1, notes: 'Folga: 15–20 mm no ponto médio inferior.', priority: 'HIGH', order: 4 },
  { modelName: 'CB 300 Twister', yearFrom: 2015, yearTo: 2025, component: 'Vela de ignição (NGK CR8EH-9)', intervalKm: 8000, intervalMonths: 12, notes: 'Gap 0,8 mm. Iridium CR8EHIX-9 dura 16.000 km.', priority: 'MEDIUM', order: 5 },
  { modelName: 'CB 300 Twister', yearFrom: 2015, yearTo: 2025, component: 'Limpeza/troca do filtro de ar', intervalKm: 6000, intervalMonths: 6, notes: 'Limpar a cada 6.000 km; substituir a cada 12.000 km.', priority: 'MEDIUM', order: 6 },
  { modelName: 'CB 300 Twister', yearFrom: 2015, yearTo: 2025, component: 'Regulagem de válvulas (DOHC)', intervalKm: 24000, intervalMonths: 24, notes: 'Admissão 0,16 mm / escape 0,25 mm — DIFERENTE da CG 160. Motor frio.', priority: 'HIGH', order: 7 },
  { modelName: 'CB 300 Twister', yearFrom: 2015, yearTo: 2025, component: 'Verificação dos freios CBS (pastilhas e discos)', intervalKm: 6000, intervalMonths: 6, notes: 'Freio CBS interliga dianteiro e traseiro — verificar ambos. Pastilha abaixo de 1,5 mm: trocar.', priority: 'HIGH', order: 8 },
  { modelName: 'CB 300 Twister', yearFrom: 2015, yearTo: 2025, component: 'Troca do fluido de freio (DOT 4)', intervalKm: 18000, intervalMonths: 24, notes: 'No sistema CBS, fluido velho causa freio esponjoso — trocar a cada 2 anos.', priority: 'MEDIUM', order: 9 },
  { modelName: 'CB 300 Twister', yearFrom: 2015, yearTo: 2025, component: 'Óleo do garfo dianteiro', intervalKm: 20000, intervalMonths: 24, notes: 'Motul Fork Oil 10W ou Honda SS-7. Trocar com retentores se houver vazamento.', priority: 'MEDIUM', order: 10 },
  { modelName: 'CB 300 Twister', yearFrom: 2015, yearTo: 2025, component: 'Troca do kit de transmissão (corrente + sprockets)', intervalKm: 25000, intervalMonths: 36, notes: 'DID 520VX3 + sprockets RK. Kit R$250–350 vs. original Honda R$450–600.', priority: 'HIGH', order: 11 },
]

const XRE300_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'XRE 300', yearFrom: 2010, yearTo: 2025, component: 'Óleo do motor (10W-30 ou 10W-40 JASO MA2)', intervalKm: 5000, intervalMonths: 6, notes: 'Capacidade 1,6 L com filtro. Em off-road pesado, preferir 10W-40 no verão.', priority: 'CRITICAL', order: 1 },
  { modelName: 'XRE 300', yearFrom: 2010, yearTo: 2025, component: 'Filtro de óleo', intervalKm: 5000, intervalMonths: 6, notes: 'Hiflofiltro HF303 (R$18–25). Trocar a cada troca de óleo.', priority: 'HIGH', order: 2 },
  { modelName: 'XRE 300', yearFrom: 2010, yearTo: 2025, component: 'Limpeza do filtro de ar (off-road)', intervalKm: 3000, intervalMonths: 3, notes: 'Em uso off-road: lavar com sabão neutro a cada 3.000 km. Em asfalto: cada 6.000 km.', priority: 'HIGH', order: 3 },
  { modelName: 'XRE 300', yearFrom: 2010, yearTo: 2025, component: 'Troca do filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Original R$35–55. K&N lavável permanente disponível (R$190–240).', priority: 'LOW', order: 4 },
  { modelName: 'XRE 300', yearFrom: 2010, yearTo: 2025, component: 'Vela de ignição (NGK CR8EH-9)', intervalKm: 8000, intervalMonths: 12, notes: 'Gap 0,8 mm. Carregar vela reserva em trilhas longas.', priority: 'MEDIUM', order: 5 },
  { modelName: 'XRE 300', yearFrom: 2010, yearTo: 2025, component: 'Lubrificação da corrente', intervalKm: 500, intervalMonths: null, notes: 'Lavar após trilha em lama e relubrifar imediatamente.', priority: 'HIGH', order: 6 },
  { modelName: 'XRE 300', yearFrom: 2010, yearTo: 2025, component: 'Verificação/ajuste da tensão da corrente', intervalKm: 1000, intervalMonths: 1, notes: 'Folga off-road: 20–25 mm (mais que motos de rua). Verificar raios da roda junto.', priority: 'HIGH', order: 7 },
  { modelName: 'XRE 300', yearFrom: 2010, yearTo: 2025, component: 'Regulagem de válvulas (DOHC)', intervalKm: 24000, intervalMonths: 24, notes: 'Admissão 0,16 mm / escape 0,25 mm com motor frio.', priority: 'HIGH', order: 8 },
  { modelName: 'XRE 300', yearFrom: 2010, yearTo: 2025, component: 'Verificação dos freios e fluido', intervalKm: 6000, intervalMonths: 6, notes: 'Pastilhas dianteiras e lona/pastilha traseira. Fluido DOT 4 a cada 2 anos.', priority: 'HIGH', order: 9 },
  { modelName: 'XRE 300', yearFrom: 2010, yearTo: 2025, component: 'Óleo do garfo dianteiro 41 mm', intervalKm: 15000, intervalMonths: 24, notes: 'Nível padrão 120 mm; aumentar para 140 mm para maior rigidez em off-road. Motul Fork 10W.', priority: 'MEDIUM', order: 10 },
  { modelName: 'XRE 300', yearFrom: 2010, yearTo: 2025, component: 'Verificação dos rolamentos de roda', intervalKm: 10000, intervalMonths: 12, notes: 'Em uso off-road frequente: verificar a cada 10.000 km. SKF 6301-2RS para substituição.', priority: 'MEDIUM', order: 11 },
  { modelName: 'XRE 300', yearFrom: 2010, yearTo: 2025, component: 'Troca do kit de transmissão', intervalKm: 25000, intervalMonths: 36, notes: 'Corrente 520 + sprockets. DID 520VX3 é indicado para uso misto.', priority: 'HIGH', order: 12 },
]

const NXR160_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'NXR 160 Bros', yearFrom: 2015, yearTo: 2025, component: 'Óleo do motor (10W-30 JASO MA2)', intervalKm: 3000, intervalMonths: 6, notes: 'Capacidade 1,0 L com filtro. Em off-road, usar 10W-40 no verão para maior proteção.', priority: 'CRITICAL', order: 1 },
  { modelName: 'NXR 160 Bros', yearFrom: 2015, yearTo: 2025, component: 'Filtro de óleo', intervalKm: 3000, intervalMonths: 6, notes: 'Hiflofiltro HF303 (R$18–25). Trocar junto com o óleo.', priority: 'HIGH', order: 2 },
  { modelName: 'NXR 160 Bros', yearFrom: 2015, yearTo: 2025, component: 'Limpeza do filtro de ar (off-road)', intervalKm: 3000, intervalMonths: 3, notes: 'Em trilha/terra: lavar e reimpregar com óleo de filtro após cada saída pesada.', priority: 'CRITICAL', order: 3 },
  { modelName: 'NXR 160 Bros', yearFrom: 2015, yearTo: 2025, component: 'Troca do filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Filtro de espuma original. Inspecionar após cada trilha intensa.', priority: 'LOW', order: 4 },
  { modelName: 'NXR 160 Bros', yearFrom: 2015, yearTo: 2025, component: 'Vela de ignição (NGK DPR8EA-9)', intervalKm: 8000, intervalMonths: 12, notes: 'Faixa quente adequada para off-road. Carregar reserva em trilhas longas.', priority: 'MEDIUM', order: 5 },
  { modelName: 'NXR 160 Bros', yearFrom: 2015, yearTo: 2025, component: 'Lubrificação da corrente', intervalKm: 500, intervalMonths: null, notes: 'Lavar lama após trilha e relubrifar antes de guardar.', priority: 'HIGH', order: 6 },
  { modelName: 'NXR 160 Bros', yearFrom: 2015, yearTo: 2025, component: 'Verificação/ajuste da tensão da corrente', intervalKm: 1000, intervalMonths: 1, notes: 'Folga: 20–25 mm (roda longa de trail). Verificar mais frequentemente em off-road.', priority: 'HIGH', order: 7 },
  { modelName: 'NXR 160 Bros', yearFrom: 2015, yearTo: 2025, component: 'Regulagem de válvulas', intervalKm: 24000, intervalMonths: 24, notes: 'Admissão 0,10 mm / escape 0,15 mm com motor frio.', priority: 'HIGH', order: 8 },
  { modelName: 'NXR 160 Bros', yearFrom: 2015, yearTo: 2025, component: 'Verificação dos freios', intervalKm: 5000, intervalMonths: 6, notes: 'Pastilha dianteira e lona/pastilha traseira. Fluido DOT 4 a cada 2 anos.', priority: 'HIGH', order: 9 },
  { modelName: 'NXR 160 Bros', yearFrom: 2015, yearTo: 2025, component: 'Verificação dos rolamentos de roda e pivot de suspensão', intervalKm: 10000, intervalMonths: 12, notes: 'Em uso off-road, rolamentos e rótulas desgastam mais rápido. Verificar folgas.', priority: 'MEDIUM', order: 10 },
  { modelName: 'NXR 160 Bros', yearFrom: 2015, yearTo: 2025, component: 'Troca do kit de transmissão 428', intervalKm: 30000, intervalMonths: 36, notes: 'DID 428NZ-V (sem retentor, para off-road) ou EK 428SH (misto). Coroa 40 dentes.', priority: 'HIGH', order: 11 },
]

const PCX160_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'PCX 160', yearFrom: 2021, yearTo: 2025, component: 'Óleo do motor (10W-30 JASO MB)', intervalKm: 3000, intervalMonths: 6, notes: 'JASO MB para scooter (sem friccionais). Capacidade 0,8 L. Honda Ultra Scooter 10W-30.', priority: 'CRITICAL', order: 1 },
  { modelName: 'PCX 160', yearFrom: 2021, yearTo: 2025, component: 'Vela de ignição (NGK CPR8EA-9)', intervalKm: 8000, intervalMonths: 12, notes: 'Gap 0,9 mm. Iridium CPR8EAIX-9 dura 16.000 km. Acesso pelo painel lateral direito.', priority: 'MEDIUM', order: 2 },
  { modelName: 'PCX 160', yearFrom: 2021, yearTo: 2025, component: 'Limpeza do filtro de ar', intervalKm: 6000, intervalMonths: 6, notes: 'Acesso sob o banco. Soprar com ar comprimido de fora para dentro.', priority: 'MEDIUM', order: 3 },
  { modelName: 'PCX 160', yearFrom: 2021, yearTo: 2025, component: 'Troca do filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Filtro de papel original (R$35–50).', priority: 'LOW', order: 4 },
  { modelName: 'PCX 160', yearFrom: 2021, yearTo: 2025, component: 'Inspeção dos roletes do variador CVT', intervalKm: 10000, intervalMonths: 12, notes: 'Limite: diâmetro < 15,3 mm. Roletes Honda: R$15–25 cada (6 unidades). Limpar variador com pano seco.', priority: 'HIGH', order: 5 },
  { modelName: 'PCX 160', yearFrom: 2021, yearTo: 2025, component: 'Limpeza completa do CVT (variador e embreagem)', intervalKm: 20000, intervalMonths: 24, notes: 'Remover graxa degradada do variador. Substituir mola da embreagem se esticada.', priority: 'HIGH', order: 6 },
  { modelName: 'PCX 160', yearFrom: 2021, yearTo: 2025, component: 'Inspeção da correia do CVT', intervalKm: 20000, intervalMonths: 24, notes: 'Verificar fissuras, desgaste nas bordas. Substituir ao detectar qualquer rachaduras.', priority: 'CRITICAL', order: 7 },
  { modelName: 'PCX 160', yearFrom: 2021, yearTo: 2025, component: 'Verificação do nível de líquido de arrefecimento', intervalKm: 3000, intervalMonths: 3, notes: 'Motor eSP+ é refrigerado a líquido. Verificar nível no reservatório de expansão mensalmente.', priority: 'HIGH', order: 8 },
  { modelName: 'PCX 160', yearFrom: 2021, yearTo: 2025, component: 'Troca do líquido de arrefecimento', intervalKm: 48000, intervalMonths: 36, notes: 'Anticongelante orgânico (OAT) 50% diluído em água destilada. Trocar a cada 3 anos.', priority: 'LOW', order: 9 },
  { modelName: 'PCX 160', yearFrom: 2021, yearTo: 2025, component: 'Verificação dos freios CBS (pastilhas e fluido)', intervalKm: 6000, intervalMonths: 6, notes: 'CBS interliga dianteiro e traseiro. Fluido DOT 4 a cada 2 anos ou 18.000 km.', priority: 'HIGH', order: 10 },
]

const BIZ125_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'Biz 125', yearFrom: 2016, yearTo: 2025, component: 'Óleo do motor (10W-30 JASO MB)', intervalKm: 3000, intervalMonths: 6, notes: 'JASO MB para scooter. Capacidade 0,8 L. Troca frequente é a chave para longevidade.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Biz 125', yearFrom: 2016, yearTo: 2025, component: 'Vela de ignição (NGK DPR7EA-9)', intervalKm: 8000, intervalMonths: 12, notes: 'Gap 0,9 mm. Mesma vela da CG 160. Iridium DPR7EIX-9 dura 16.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'Biz 125', yearFrom: 2016, yearTo: 2025, component: 'Limpeza do filtro de ar', intervalKm: 6000, intervalMonths: 6, notes: 'Jato suave de ar de fora para dentro. Substituir se rasgado ou muito escuro.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Biz 125', yearFrom: 2016, yearTo: 2025, component: 'Troca do filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Original Honda R$25–40. Filtro sujo causa mistura rica e consumo elevado.', priority: 'LOW', order: 4 },
  { modelName: 'Biz 125', yearFrom: 2016, yearTo: 2025, component: 'Inspeção dos roletes do variador CVT', intervalKm: 10000, intervalMonths: 12, notes: 'Roletes 18×14 mm (10g). Limite: diâmetro < 17,3 mm ou forma oval. São 6 unidades.', priority: 'HIGH', order: 5 },
  { modelName: 'Biz 125', yearFrom: 2016, yearTo: 2025, component: 'Inspeção da correia do CVT', intervalKm: 20000, intervalMonths: 24, notes: 'Verificar fissuras, desgaste nas bordas. Correia trincada = troca imediata.', priority: 'CRITICAL', order: 6 },
  { modelName: 'Biz 125', yearFrom: 2016, yearTo: 2025, component: 'Verificação dos freios (disco diant. + tambor tras.)', intervalKm: 5000, intervalMonths: 6, notes: 'Pastilha dianteira: substituir abaixo de 1,5 mm. Lona traseira: abaixo de 2 mm.', priority: 'HIGH', order: 7 },
  { modelName: 'Biz 125', yearFrom: 2016, yearTo: 2025, component: 'Troca do fluido de freio dianteiro (DOT 4)', intervalKm: 18000, intervalMonths: 24, notes: 'Sistema CBS hidráulico — fluido velho causa frenagem esponjosa.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Biz 125', yearFrom: 2016, yearTo: 2025, component: 'Verificação da correia dentada e polias do CVT', intervalKm: 10000, intervalMonths: 12, notes: 'Verificar tensão da correia e estado das polias do variador. Limpar com pano seco.', priority: 'HIGH', order: 9 },
  { modelName: 'Biz 125', yearFrom: 2016, yearTo: 2025, component: 'Verificação das conexões elétricas e chicote', intervalKm: 12000, intervalMonths: 24, notes: 'Limpar conectores oxidados com spray elétrico. Verificar amarrações do chicote.', priority: 'LOW', order: 10 },
]

// ─── CALIBRAGENS ──────────────────────────────────────────────────────────────
const TIRE_PRESSURES = [
  {
    modelName: 'CG 160',
    yearFrom: 2015, yearTo: 2025,
    tireSize: '80/100-18 (F) · 90/90-18 (R)',
    frontPsi: 26, rearPsi: 29,
    frontPsiLoad: 28, rearPsiLoad: 33,
    notes: 'Fan/Titan/Cargo — manter 29 PSI atrás com carga de entrega ou garupa. Nunca ultrapassar 33 PSI. Verificar frio (antes de andar). Pneu quente apresenta até 4 PSI a mais.',
  },
  {
    modelName: 'CB 300 Twister',
    yearFrom: 2015, yearTo: 2025,
    tireSize: '100/80-17 (F) · 130/70-17 (R)',
    frontPsi: 29, rearPsi: 29,
    frontPsiLoad: 32, rearPsiLoad: 32,
    notes: 'Calibragem igual dianteiro e traseiro em uso normal. Com garupa ou baú, adicionar 3 PSI no traseiro. Nunca abaixo de 26 PSI em pneu esportivo de perfil baixo — risco de bolha.',
  },
  {
    modelName: 'XRE 300',
    yearFrom: 2010, yearTo: 2025,
    tireSize: '100/90-19 (F) · 120/80-18 (R)',
    frontPsi: 25, rearPsi: 29,
    frontPsiLoad: 28, rearPsiLoad: 33,
    notes: 'Calibragem de asfalto. Para off-road: reduzir para 20 PSI dianteiro e 22 PSI traseiro (maior área de contato, melhor tração). RECALIBRAR ao retornar ao asfalto — pneu subpressurizado em alta velocidade aquece e pode bolhar.',
  },
  {
    modelName: 'NXR 160 Bros',
    yearFrom: 2015, yearTo: 2025,
    tireSize: '80/100-21 (F) · 90/90-18 (R)',
    frontPsi: 25, rearPsi: 29,
    frontPsiLoad: 28, rearPsiLoad: 33,
    notes: 'Roda dianteira de 21" — pressão menor que motos de rua para estabilidade em terra. Para off-road pesado: reduzir para 20 PSI (F) e 22 PSI (R). Verificar antes de cada saída para trilha.',
  },
  {
    modelName: 'PCX 160',
    yearFrom: 2021, yearTo: 2025,
    tireSize: '110/70-14 (F) · 130/70-13 (R)',
    frontPsi: 28, rearPsi: 31,
    frontPsiLoad: 30, rearPsiLoad: 35,
    notes: 'Scooter com rodas de 14"/13" — pequeno diâmetro amplifica efeitos de pressão errada. Nunca ultrapassar 35 PSI no traseiro. Com garupa: adicionar 3 PSI no traseiro. Verificar semanalmente.',
  },
  {
    modelName: 'Biz 125',
    yearFrom: 2016, yearTo: 2025,
    tireSize: '80/90-14 (F) · 90/90-14 (R)',
    frontPsi: 26, rearPsi: 29,
    frontPsiLoad: 28, rearPsiLoad: 33,
    notes: 'Com baú ou carga de entrega: 33 PSI atrás. Verificar sempre frio (antes de usar). Rodas 14" — nunca usar remold, risco de bolha em pneu de pequeno diâmetro.',
  },
]

// ─── BLOCKS ───────────────────────────────────────────────────────────────────
const BLOCKS = [
  { modelName: 'CG 160',        yearFrom: 2015, yearTo: 2025, MACETES: CG160_MACETES,   PROBLEMAS: CG160_PROBLEMAS   },
  { modelName: 'CB 300 Twister',yearFrom: 2015, yearTo: 2025, MACETES: TWISTER_MACETES,  PROBLEMAS: TWISTER_PROBLEMAS  },
  { modelName: 'XRE 300',       yearFrom: 2010, yearTo: 2025, MACETES: XRE300_MACETES,   PROBLEMAS: XRE300_PROBLEMAS   },
  { modelName: 'NXR 160 Bros',  yearFrom: 2015, yearTo: 2025, MACETES: NXR160_MACETES,   PROBLEMAS: NXR160_PROBLEMAS   },
  { modelName: 'PCX 160',       yearFrom: 2021, yearTo: 2025, MACETES: PCX160_MACETES,   PROBLEMAS: PCX160_PROBLEMAS   },
  { modelName: 'Biz 125',       yearFrom: 2016, yearTo: 2025, MACETES: BIZ125_MACETES,   PROBLEMAS: BIZ125_PROBLEMAS   },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  ...CG160_MANUTENCAO,
  ...TWISTER_MANUTENCAO,
  ...XRE300_MANUTENCAO,
  ...NXR160_MANUTENCAO,
  ...PCX160_MANUTENCAO,
  ...BIZ125_MANUTENCAO,
]

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🏍️  Iniciando seed Honda Motos...\n')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })

  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Honda', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'Honda', vehicleTypeId: motoType.id },
  })

  const brand = await prisma.brand.findFirstOrThrow({
    where: { name: 'Honda', vehicleTypeId: motoType.id },
  })

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {},
      create: { name: block.modelName, brandId: brand.id },
    })

    const allTips = [
      ...block.MACETES.map((tip) => ({ cat: 'MACETES' as Cat, tip })),
      ...block.PROBLEMAS.map((tip) => ({ cat: 'PROBLEMAS' as Cat, tip })),
    ]

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

  console.log('\n✅ Honda Motos seed concluído!')
  console.log(`   ${BLOCKS.length} modelos`)
  console.log(`   ${BLOCKS.reduce((a, b) => a + b.MACETES.length + b.PROBLEMAS.length, 0)} tips (MACETES + PROBLEMAS)`)
  console.log(`   ${TIRE_PRESSURES.length} calibragens`)
  console.log(`   ${MAINTENANCE_ITEMS.length} itens de manutenção`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
