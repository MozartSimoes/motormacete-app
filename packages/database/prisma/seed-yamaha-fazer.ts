// seed-yamaha-fazer.ts — Yamaha Fazer 150 · Fazer 250 (FZ25) · MT-03
// Fazer 150 (2014-2024): 149cc SOHC Blue Core, FLEXONE
// Fazer 250 / FZ25 (2017-2024): 249cc SOHC single, injeção, FLEXONE
// MT-03 (2015-2024): 321cc DOHC parallel twin (mesmo motor do R3)
//
// ATENÇÃO — modelName da MT-03 usa "MT-03 321" e "MT-03 CONNECTED" (NÃO "MT-03"
// bare): a FIPE também lista "MT-03 660cc", a MT-03 LEGADA de 2006-2013 (motor
// single-cilindro 660cc, mecânica completamente diferente — ver
// seed-yamaha-mt-series.ts). Como apps/web/app/api/tips/route.ts combina tips de
// TODAS as stored names que derem match por substring, um "MT-03" bare bateria
// também na "660cc" e misturaria conteúdo errado. "MT-03 321" cobre "MT-03 321
// ABS Homem de Ferro" e "MT-03 321/ABS"; "MT-03 CONNECTED" cobre "MT-03
// CONNECTED 321cc ABS" separadamente (não é substring contígua de "MT-03 321").
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

// ─── FAZER 150 (2014-2024) ───────────────────────────────────────────────────

const FAZER150_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 149cc Blue Core — óleo 10W-30 MA2, 0,85 L SEM filtro (Fazer 150 não tem filtro de óleo substituível — dreno direto)',
    body: 'A Fazer 150 usa motor Blue Core com lubrificação por splash parcial — NÃO tem filtro de óleo substituível como Honda CG/NXR. Capacidade: 0,85 L. Troca: dreno o óleo velho e reabastece, sem tirar filtro. Mecânico de Honda que tenta achar o filtro perde tempo. JASO MA2 obrigatório (embreagem úmida). 10W-30 ou 10W-40: em climas muito quentes (>35°C frequente) prefira 10W-40. Troca: 3.000 km em uso urbano ou 4.000 km em estrada.',
  },
  {
    severity: 'OK',
    title: 'Válvulas adm 0,07 mm / esc 0,12 mm (SOHC 2 válvulas — motor frio, PMS compressão) — intervalo 24.000 km em manual mas recomendado 12.000 km',
    body: 'Motor SOHC 2 válvulas similar ao Honda CG/NXR mas com folgas diferentes: adm 0,07 ±0,02 mm / esc 0,12 ±0,02 mm. Yamaha especifica 24.000 km de intervalo mas mecânicos experientes recomendam 12.000 km em uso urbano pesado. Motor frio (temperatura ambiente). PMS de compressão: ambas as válvulas fechadas. Custo da regulagem: R$80-150 numa boa oficina. Não confundir com Honda CG (adm 0,10 mm / esc 0,15 mm) — são diferentes.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR7HSA (gap 0,7 mm) — Fazer 150 usa vela diferente da CG 160; não intercambiar sem verificar',
    body: 'Fazer 150: NGK CR7HSA (R$15-25) com gap de 0,7 mm. Iridium: NGK CR7HIX (R$60-80) — dura 16.000 km. Honda CG 160 usa DPR7EA-9 (gap 0,9 mm) — não é a mesma vela. Troca: 8.000 km. Vela suja de fuligem preta: mistura rica (filtro de ar entupido ou sensor TPS com problema). Vela embranquecida: mistura pobre (possível vazamento de ar falso no coletor ou sensor IAP).',
  },
  {
    severity: 'OK',
    title: 'Corrente 428 — mesma bitola que CG/NXR 150; DID 428NZ para uso misto; kit completo (coroa 42T / pinhão 15T) a cada 18.000-20.000 km',
    body: 'Fazer 150 usa corrente de passo 428 com coroa 42 dentes e pinhão 15 dentes. DID 428NZ (R$60-100) para uso diário. Kit completo (corrente + coroa + pinhão): R$150-220. Folga correta: 15-20 mm com piloto sentado. Lubrificar a cada 400-500 km. Corrente com pulo de dente: sinal de tensão excessiva OU desgaste avançado — troque o kit completo.',
  },
  {
    severity: 'WARN',
    title: 'TPS (sensor de posição da borboleta) — problema documentado em Fazer 150; marcha lenta instável é o sintoma principal; ajuste antes de trocar',
    body: 'O TPS da Fazer 150 perde calibração com uso, causando marcha lenta oscilante, engasgos leves na aceleração e consumo irregular. Sintoma típico: rpm sobe e desce na marcha lenta (oscilação de 200-300 rpm). Solução 1: reajuste do TPS com scanner (R$50-80). Solução 2: substituição do TPS (R$120-200). ANTES de diagnosticar como TPS: verifique se o filtro de ar está limpo e se não há vacância de ar (mangueiras do coletor com fissuras). Problema muito comum na Fazer 150 com mais de 20.000 km.',
  },
  {
    severity: 'OK',
    title: 'FLEXONE — combustível: gasolina ou etanol; marcha lenta pode precisar de ajuste fino ao trocar permanentemente de gasolina para etanol ou vice-versa',
    body: 'A Fazer 150 é FLEXONE — aceita gasolina, etanol ou qualquer mistura. Para melhor desempenho: sempre use o mesmo combustível ou alterne com frequência (não deixe etanol parado mais de 30 dias). Etanol puro: motor mais frio, mais potência, melhor para motor no longo prazo. Gasolina: partida a frio mais fácil em dias muito frios (<15°C). Troca permanente de combustível: aguarde 2-3 tanques para a ECU adaptar o mapa — consumo e partida normalizam.',
  },
]

const FAZER150_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção da Fazer 150 por quilometragem — do primeiro serviço até 40.000 km',
    body: 'CRONOGRAMA CONSOLIDADO — Fazer 150 (motor Blue Core 149cc): • 1.000 km: revisão de amaciamento gratuita na concessionária (torque geral + 1ª troca de óleo). • 3.000 km e múltiplos: troca de óleo 10W-30 JASO MA2 (0,85 L, sem filtro). • 8.000 km: vela NGK CR7HSA + inspeção/troca do filtro de ar. • 12.000 km: regulagem de válvulas (adm 0,07 mm / esc 0,12 mm) + ajuste do TPS se houver marcha lenta instável. • 18.000-20.000 km: kit de corrente completo (428, coroa 42T, pinhão 15T). • 8.000-10.000 km: pastilhas de freio dianteiras (verificar desgaste). • 30.000 km: retentores da bengala dianteira (preventivo). • A cada 400 km: lubrificação da corrente. • A cada 6 meses: checagem da bateria YTX7L-BS. Uso de motoboy/app: reduza todos os intervalos de óleo e corrente em ~30%.',
  },
]

const FAZER150_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Sensor TPS descalibrado — o mais documentado problema da Fazer 150 com mais de 20.000 km; custo baixo de correção, mas frequentemente mal diagnosticado',
    body: 'O TPS da Fazer 150 é um dos componentes com mais reclamações nos fóruns brasileiros. O sensor perde calibração por vibração e temperatura, causando marcha lenta instável. Problema: muitas oficinas trocam a vela, o filtro ou o IACV sem diagnosticar o TPS. Scanner com leitura do TPS: confirm que a leitura é 0% com acelerador fechado e 100% no acelerador aberto. Ajuste: R$50-80 com mecânico que tem scanner. TPS com defeito irreparável: R$120-200.',
  },
  {
    severity: 'WARN',
    title: 'Bengala dianteira com retentores frágeis — vazamento comum entre 25.000-35.000 km; óleo no disco = parada imediata',
    body: 'A bengala dianteira da Fazer 150 usa retentores de 33 mm que falham entre 25.000-35.000 km em uso urbano com muitas irregularidades. Sintoma inicial: névoa oleosa na haste. Avançado: gota de óleo escorrendo. PERIGO: óleo no disco dianteiro. Kit retentores 33 mm (Ariete ou SKF): R$50-80 o par. Troca preventiva a cada 30.000 km: R$150-200 (mão de obra inclusa). Não espere o vazamento para trocar — a bengala com pouco óleo perde amortecimento progressivamente.',
  },
  {
    severity: 'WARN',
    title: 'Filtro de ar com vedação rachando — problema relatado especialmente em climas com grande variação de temperatura',
    body: 'A caixa do filtro de ar da Fazer 150 tem uma vedação de borracha que resseca e racha com ciclos de calor/frio. A rachadura permite entrada de ar não filtrado e água — motor com desgaste acelerado. Inspecione a vedação a cada revisão de filtro. Vedação danificada: limpar bem o motor e substituir a borracha (Honda CG tem problema similar). Filtro original Honda é diferente da Fazer — não intercambiável.',
  },
]

// ─── FAZER 250 / FZ25 (2017-2024) ───────────────────────────────────────────

const FAZER250_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 249cc SOHC single com válvulas adm 0,08 mm / esc 0,12 mm — motor DIFERENTE do DOHC 286cc da CB 300R; mecânico de Honda 300 precisa recalibrar referências',
    body: 'A Fazer 250 (FZ25) tem motor 249cc SOHC 2 válvulas — completamente diferente do motor DOHC 4 válvulas da CB 300R/Twister (286cc). Folgas: adm 0,08 ±0,02 mm / esc 0,12 ±0,02 mm (motor frio, PMS compressão). Intervalo: 24.000 km (Yamaha), 12.000 km (recomendado na prática). Mecânico de Honda DOHC: as folgas são diferentes — adm 0,08 aqui vs 0,16 na Honda. Motor único da Yamaha no Brasil na classe 250cc — não tem concorrente direto com mesmo arquitetura.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 MA2, 1,5 L COM filtro — Fazer 250 TEM filtro substituível (diferente da Fazer 150); Hiflofiltro HF145 compatível',
    body: 'Fazer 250 tem filtro de óleo substituível — diferente da Fazer 150. Capacidade: 1,5 L com filtro. Hiflofiltro HF145 (R$18-28) ou Mahle OX176. Óleo: 10W-40 JASO MA2. Troca: 4.000 km (urbano) ou 5.000 km (estrada). Em uso de motoboy: 3.000 km. Filtro: substituir a cada troca de óleo. Dreno do cárter: torque 25 Nm (não aperte demais — cárter de alumínio).',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR8E (gap 0,8 mm) — diferente da Fazer 150; troca a cada 8.000 km; iridium CR8EIX dura 16.000 km',
    body: 'Fazer 250 usa NGK CR8E (R$20-30), gap 0,8 mm. Iridium: NGK CR8EIX (R$65-85). Denso X24ESR-U equivalente. Troca: 8.000 km. Não forçe demais ao apertar — cabeçote de alumínio. Torque: 12 Nm ou "aperto de mão + ¾ de volta" com vela fria. Vela com eletrodo fundido: supercalor — verifique combustível e se não há mistura pobre.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 (mesma da CB 300R) — kit DID 520VX3 coroa 44T pinhão 14T; folga 30-40 mm; lubrificar a cada 500 km',
    body: 'Fazer 250 usa corrente de passo 520, mesma que CB 300R/Twister. DID 520VX3 com o-ring (R$140-200). Coroa original: 44 dentes. Pinhão original: 14 dentes. Modificação popular: pinhão 15T (mais veloz em estrada, menos torque no trânsito). Kit completo: R$280-380. Folga: 30-40 mm medida no ponto mais tenso da corrente. Lubrificar a cada 500 km. Corrente ressecada = desgaste acelerado de coroa e pinhão.',
  },
  {
    severity: 'WARN',
    title: 'Bengala dianteira 41 mm — retentores de vida útil similar à CB 300R (25.000-35.000 km); inspeção obrigatória a cada revisão de pneu',
    body: 'Fazer 250 tem bengala convencional 41 mm com retentores que falham na mesma faixa que a CB 300R. Em uso urbano com muitos buracos: pode falhar antes. Kit retentores 41 mm (Ariete): R$70-100 o par. Ao trocar retentores: troque também o óleo da bengala (Honda SS-7 10W ou Motul Fork Oil 10W, 100-110 mL por tubo). Bengala com óleo vazando sobre o disco: PARADA IMEDIATA.',
  },
  {
    severity: 'OK',
    title: 'Medidor de combustível impreciso por design — a Fazer 250 tem este problema de fábrica; acostume-se com o comportamento do painel e zere o hodômetro a cada abastecimento',
    body: 'O medidor de combustível da Fazer 250 (FZ25) é notoriamente impreciso — fica em "cheio" por muito tempo e despenca para "reserva" rapidamente. Não é defeito isolado: é característica de projeto do sensor do flutuador. Solução prática: zere o hodômetro parcial (Trip A) a cada abastecimento. Autonomia média: 280-340 km (gasolina). No limite: 300 km indicam que é hora de abastecer independente do marcador.',
  },
]

const FAZER250_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção da Fazer 250 (FZ25) por quilometragem — do primeiro serviço até 40.000 km',
    body: 'CRONOGRAMA CONSOLIDADO — Fazer 250/FZ25 (motor SOHC single 249cc): • 1.000 km: revisão de amaciamento gratuita. • 4.000 km e múltiplos: troca de óleo 10W-40 JASO MA2 + filtro (Hiflofiltro HF145), 1,5 L. • 8.000 km: vela NGK CR8E (gap 0,8 mm). • 12.000 km: regulagem de válvulas (adm 0,08 mm / esc 0,12 mm) + filtro de ar. • 20.000 km: kit de corrente completo (520, coroa 44T, pinhão 14T). • 8.000-10.000 km: pastilhas dianteiras (verificar desgaste). • 14.000 km: freio traseiro a tambor + ajuste de pedal. • 30.000 km: retentores da bengala 41 mm (preventivo). • A cada 500 km: lubrificação da corrente. • Anualmente ou ao acender luz de injeção: scanner para leitura de DTCs/TPS. • A cada 6 meses: checagem da bateria YTZ7S. Lembrete: marcador de combustível é impreciso de fábrica — zere o hodômetro parcial a cada abastecimento.',
  },
]

const FAZER250_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Junta do cabeçote — micro-vazamento de óleo a partir de 40.000-60.000 km; mancha escura ao redor da cabeça é o sintoma típico',
    body: 'A junta do cabeçote e as vedações das velas apresentam micro-vazamentos de óleo na Fazer 250 após 40.000-60.000 km. Visible como mancha escura ao redor da cabeça dos cilindros. Sintoma inicial: apenas visual (não perde volume perceptível). Avançado: perda de 50-100 mL por 1.000 km. Reparo: trocar a junta do cabeçote + vedações de vela (R$400-700 incluindo mão de obra). Ignorer = risco de o vazamento atingir a corrente ou outros componentes.',
  },
  {
    severity: 'WARN',
    title: 'Sensor TPS da Fazer 250 — menos frequente que na Fazer 150 mas ainda documentado; marcha lenta instável depois de 30.000 km',
    body: 'A Fazer 250 tem TPS mais robusto que a Fazer 150 mas ainda sujeito à descalibração após muitos quilômetros. Sintoma: rpm oscila na marcha lenta (600-900 rpm sem estabilizar). Diagnóstico: scanner que leia TPS da Yamaha (R$50-80 numa boa oficina). Ajuste: muitas vezes resolve sem troca. Substituição do TPS Fazer 250: R$150-280.',
  },
  {
    severity: 'WARN',
    title: 'Medidor de combustível impreciso — conhecido mas ignorado por revendedores; zerar odômetro a cada abastecimento é a única solução prática',
    body: 'O medidor de combustível da FZ25 é um defeito de projeto aceito pela Yamaha. Não há recall e não está coberto pela garantia (Yamaha considera dentro do normal). O flutuador do sensor oscila em qualquer irregularidade, causando leituras erráticas. Não existe kit de correção oficial. Alternativa aftermarket: sensor digital de nível de combustível aftermarket (R$200-400, instalação complexa). A maioria dos proprietários simplesmente se acostuma com o Trip A.',
  },
]

// ─── MT-03 (2015-2024) ───────────────────────────────────────────────────────

const MT03_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 321cc DOHC parallel twin (mesmo motor do R3) — válvulas a cada 6.000 km (MAIS CURTO que Honda 300cc); custo de manutenção maior mas motor muito mais refinado',
    body: 'A MT-03 tem o motor 321cc paralelo bicilíndrico DOHC 4 válvulas por cilindro = 8 válvulas no total. Yamaha especifica regulagem a cada 6.000 km (sim, 6.000 — não 12.000 como na Honda DOHC ou 24.000 como Fazer 250). Motor frio. Folgas: adm 0,11-0,15 mm / esc 0,21-0,25 mm (verifique o manual — podem variar por geração). 2 cilindros = 2x o trabalho de regulagem vs moto single. Custo: R$300-500 numa concessionária Yamaha. Em mecânico especializado: R$200-350.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 MA2, 2,4 L com filtro (bicilíndrico tem MUITO mais volume que single) — Hiflofiltro HF204 compatível',
    body: 'MT-03 é bicilíndrico: 2,4 L de óleo com filtro. Quase o triplo da Fazer 150 (0,85 L) e mais que o dobro da CG 160 (1,0 L). Hiflofiltro HF204 (R$25-40) compatível. Motul 7100 10W-40 ou Castrol Power1 10W-40: ótimas opções. Troca: 5.000 km (uso normal) ou 4.000 km (pilotagem esportiva frequente). Custo maior que single por volume e filtro. Semi-sintético ou full-sintético: ambos funcionam — o full-sintético reduz friccao e melhora o rendimento.',
  },
  {
    severity: 'OK',
    title: 'Velas NGK CR9EH-9 (gap 0,9 mm) — duas velas (uma por cilindro); trocar em PAR sempre; nunca trocar só uma',
    body: 'MT-03 tem 2 velas (1 por cilindro): NGK CR9EH-9. Gap: 0,9 mm. Iridium: NGK CR9EHIX-9 (R$80-110 cada). Troca: 12.000-16.000 km (manual Yamaha). SEMPRE em par — vela nova com vela velha no cilindro ao lado cria diferença de ignição perceptível em vibração e consumo. Custo de troca das 2 velas: R$40-60 (padrão) ou R$160-220 (iridium par). Acesso à vela do cilindro traseiro (mais recuado): algumas gerações exigem remoção do painel lateral.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 — mesma bitola da CB 300R e Fazer 250; kit DID 520VX3 (coroa 43T / pinhão 16T); exige lubrificação rigorosa',
    body: 'MT-03 usa corrente 520 (mesmo passo que CB 300R). Coroa original: 43 dentes. Pinhão original: 16 dentes (motor mais potente — relação mais longa). DID 520VX3 com o-ring (R$140-200). RK 520KRO com o-ring: alternativa de qualidade. Folga: 30-40 mm. Lubrificar a cada 500 km. MT-03 com pilotagem esportiva (muita aceleração e frenagem): 300-400 km entre lubrificações. Kit completo: R$300-420.',
  },
  {
    severity: 'WARN',
    title: 'Pneus originais IRC com aderência insatisfatória no molhado — substituição por Pirelli Diablo Rosso IV ou Michelin Road 5 é recomendada na primeira troca',
    body: 'Os pneus IRC originais da MT-03 são adequados para uso seco mas perdem significativamente no molhado, especialmente em curvas. Risco real: aquaplanagem em piso molhado com asfalto liso. Na primeira troca: Pirelli Diablo Rosso IV (R$320-450 traseiro, R$260-350 dianteiro) ou Michelin Road 5 (preço similar). Para uso exclusivo em cidade: Pirelli Angel City (mais barato, R$150-200 traseiro) é suficiente. Vida útil dos IRC originais: 8.000-12.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Sliders e proteções — MT-03 naked tem carter do motor completamente exposto; queda leve a baixa velocidade pode danificar o carter de alumínio',
    body: 'A MT-03 é naked sem proteção no motor. Queda a 10 km/h no estacionamento pode lascar o cárter. Kit de sliders (Puig ou Barracuda): R$200-400. Slider de guidão (bar end): R$60-120. Protetor de cárter de motor: R$150-250. Instalação antes da primeira saída em trânsito urbano intenso. Moto usada que chegou sem sliders: inspecione o cárter por trincas antes de comprar. Carter trincado da MT-03: troca R$600-1.200.',
  },
]

const MT03_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vibração de guidão em 4.000-5.500 rpm — característica do motor CP2 em naked (mais sentida que no R3 com carenagem); pesos aftermarket no guidão resolvem',
    body: 'O motor CP2 (crossplane 270°) da MT-03 transmite vibração no guidão na faixa de 4.000-5.500 rpm. Na naked MT-03 esse vibração é mais sentida que no R3 (carenagem absorve parte). Sintoma: formigamento nas mãos após 30+ minutos em viagem. Solução: pesos de guidão mais pesados (Yamaha Racing Handlebar Weight: R$120-200) ou pesos aftermarket (Puig, R$100-180). Segunda geração (2019+): melhorou mas não eliminou completamente.',
  },
  {
    severity: 'WARN',
    title: 'Pinça de freio traseiro com tendência a arrasto — MT-03 usada como commuter tem freio traseiro esquentando mais que o normal em trânsito',
    body: 'A pinça do freio traseiro da MT-03 tem pistão que pode travar parcialmente em uso urbano com muitas paradas (trânsito). Sintoma: disco traseiro aquecendo sem uso do freio, arrasto perceptível. Limpeza e lubrificação dos pistões da pinça: a cada 20.000 km ou ao detectar o problema. Custo: R$100-200. Freio de estacionamento informal (pressionar o freio traseiro com a moto parada): agrava o problema em MT-03 — evite.',
  },
  {
    severity: 'WARN',
    title: 'Regulagem de válvulas a 6.000 km — proprietários acostumados com moto 150cc/300cc single ficam surpresos com o custo; planejar financeiramente antes de comprar',
    body: 'O intervalo de 6.000 km para regulagem de válvulas é o ponto de discussão mais recorrente nos fóruns de MT-03. Em 30.000 km de uso: 5 regulagens de válvulas vs 2,5 de uma Honda CB 300R. Custo total de regulagens em 30.000 km: R$1.500-2.500 (MT-03) vs R$600-1.000 (Honda 300cc DOHC). Positivo: motor paralelo twin da Yamaha é muito mais refinado e tem maior durabilidade comprovada a longo prazo. O custo extra é o preço de ter um motor premium na faixa de 300cc.',
  },
]

const MT03_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção MT-03 321cc por km — do primeiro serviço aos 30.000 km',
    body: 'Revisão 1.000 km (garantia): óleo grátis + aperto geral + regulagem de corrente. 5.000 km: óleo 10W-40 MA2 com filtro (2,4 L, Hiflofiltro HF204) — 4.000 km em pilotagem esportiva frequente. 6.000 km: regulagem de válvulas (adm 0,11-0,15 mm / esc 0,21-0,25 mm, motor frio — confirme no manual da geração) + inspeção do filtro de ar. 10.000 km: óleo. 12.000 km: velas NGK CR9EH-9 (gap 0,9 mm, trocar as 2 juntas) + kit corrente 520 (coroa 43T + pinhão 16T) + pastilhas dianteiras (pinça dupla). 12.000 km: regulagem de válvulas (repete a cada 6.000 km). 15.000 km: óleo. 18.000 km: regulagem de válvulas + óleo. 20.000 km: pastilhas dianteiras + fluido de freio DOT 4 + limpeza/lubrificação dos pistões da pinça traseira (previne o arrasto característico em uso urbano). 24.000 km: regulagem de válvulas + óleo + velas. A cada 300-500 km: lubrificação da corrente 520 (300-400 km em pilotagem esportiva). A cada 6 meses: verificação da bateria. Pneus IRC originais: substituir por Pirelli Diablo Rosso IV ou Michelin Road 5 na primeira troca para melhor grip em molhado.',
  },
]

// ─── FZ15 — Fazer 150 FI/moderna (2019-2024+) ─────────────────────────────────
// Motor 149cc monocilíndrico SOHC 2V, refrigerado a ar, injeção eletrônica Blueflex
// ~14,4cv @ 8.000 rpm (gasolina) / ~14,4cv (etanol), torque ~1,3 kgf.m
// Nomenclatura FIPE: "FZ15 150 FAZER FLEX" e "FZ15 150 FAZER CONNECTED FLEX"
// Versão Connected: painel digital com Bluetooth/app Yamaha Motor On

const FZ15_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 Yamalube JASO MA2 — capacidade ~1,10 L com filtro / ~1,00 L sem filtro; troca a cada 3.000-4.000 km',
    body: 'A FZ15 (Fazer 150 atual, motor FI) usa Yamalube 10W-40 (ou 20W-50) API SL+ JASO MA. Capacidade total com desmontagem: ~1,25 L; troca comum com filtro: ~1,10 L; sem trocar filtro: ~1,00 L. JASO MA obrigatório (embreagem úmida — óleo para carro danifica a embreagem). Troca: 3.000 km em uso urbano intenso (motoboy/app) ou 4.000 km em uso normal. Alternativas de mercado: Motul 3000 10W-40, Lubrax Moto 4T 20W-50 — sempre conferir selo JASO MA na embalagem.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK MR8D — específica da geração FI; não confundir com a CR7HSA da geração antiga/carburada',
    body: 'O motor injetado da FZ15 usa vela NGK MR8D (formato diferente da geração a carburador). Preço: R$25-40. Troca recomendada: 8.000-10.000 km. Vela incorreta ou gap fora do padrão gera falha de partida a frio e consumo irregular — sempre confirme o código exato na embalagem antes de comprar, pois lojistas às vezes oferecem a CR7HSA da geração antiga por engano.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428H com 128 elos — kit coroa 41T / pinhão 14T; DID ou Riffel com retentor para maior durabilidade',
    body: 'Kit de transmissão original FZ15: corrente 428H (128 elos) + coroa 41 dentes + pinhão 14 dentes. Kits com retentor (DID, Riffel, KMC) dobram a vida útil da corrente em uso urbano — R$180-260 o kit completo. Sem retentor: mais barato (R$120-180) mas exige lubrificação mais frequente. Folga recomendada: 15-20 mm com piloto sentado. Lubrificar a cada 400-500 km ou sempre após pegar chuva.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar — modelo específico da versão injetada; verificar vedação da caixa a cada troca de óleo',
    body: 'O filtro de ar da FZ15 é diferente do usado na geração carburada YS 150 — não são intercambiáveis. Troca recomendada: 8.000-12.000 km, mais cedo em cidades com muita poeira/poluição. Verifique a vedação de borracha da caixa do filtro a cada troca de óleo — vedação ressecada permite entrada de ar não filtrado, acelerando o desgaste do cilindro. Filtro sujo em moto injetada causa mistura rica, fuligem na vela e maior consumo.',
  },
  {
    severity: 'OK',
    title: 'Injeção eletrônica Blueflex — flex total (gasolina, etanol ou mistura); sem necessidade de sensor de combustível externo',
    body: 'A FZ15 é flex de fábrica com a tecnologia Blueflex da Yamaha — aceita gasolina, etanol ou qualquer proporção de mistura, com a ECU ajustando o mapa automaticamente. Diferente de conversões flex aftermarket (usadas em motos antigas a carburador), aqui não há sensor externo de combustível — o ajuste é feito por sensores de oxigênio e temperatura já integrados. Etanol: mais potência e motor mais frio. Gasolina: partida a frio mais fácil abaixo de 15°C.',
  },
  {
    severity: 'OK',
    title: 'Versão Connected — painel digital com Bluetooth/app Yamaha Motor On; problemas de pareamento geralmente são do celular, não da moto',
    body: 'A versão "Connected" da FZ15 tem painel LCD com conectividade Bluetooth via app Yamaha Motor On (indicadores de uso, agendamento de manutenção, localização de onde a moto foi estacionada). Problemas de pareamento: geralmente resolvidos reiniciando o Bluetooth do celular e reemparelhando do zero (remover o dispositivo salvo antes). O painel Connected NÃO tem GPS de rastreamento antifurto — é só um lembrete de localização por Bluetooth de curto alcance, não confundir com rastreador veicular.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio com engates duros relatado em unidades novas — normalmente amacia após os primeiros 1.000-2.000 km com troca de óleo correta',
    body: 'Há relatos de câmbio "duro" para engatar em FZ15 0km, principalmente nas primeiras trocas de marcha e reduções. Na maioria dos casos o problema melhora após o amaciamento (1.000-2.000 km) e a primeira troca de óleo — óleo de fábrica mais viscoso para proteção do motor novo pode deixar a embreagem "grudenta". Se persistir após a primeira troca de óleo com produto JASO MA de qualidade, procure a concessionária dentro da garantia — pode ser ajuste de cabo de embreagem ou folga do câmbio.',
  },
  {
    severity: 'WARN',
    title: 'Pinhão/coroa e corrente pendurada — ruído da coifa/protetor de corrente é comum; não é falha estrutural mas incomoda',
    body: 'Proprietários relatam barulho da "comieira" (protetor plástico da corrente) e corrente com folga aparentando estar "pendurada" em baixa velocidade — na maioria dos casos é folga normal de fábrica combinada com vibração do protetor plástico, não risco mecânico. Confirme a folga da corrente (15-20 mm) antes de se preocupar. Se o ruído for metálico e não de plástico, vale inspecionar o parafuso de fixação do protetor, que pode afrouxar com o tempo.',
  },
]

const FZ15_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção da FZ15 (Fazer 150 injetada atual) por quilometragem — do primeiro serviço até 40.000 km',
    body: 'CRONOGRAMA CONSOLIDADO — FZ15/Fazer 150 FI (motor 149cc injeção Blueflex): • 1.000 km: revisão de amaciamento gratuita (torque geral + 1ª troca de óleo). • 3.000-4.000 km e múltiplos: troca de óleo Yamalube 10W-40/20W-50 JASO MA (~1,00-1,10 L com filtro). • 8.000-10.000 km: vela NGK MR8D. • 8.000-12.000 km: filtro de ar (inspeção de vedação da caixa). • 15.000 km: filtro de combustível (se obstruído). • 400-500 km: lubrificação da corrente 428H. • Conforme desgaste: kit de corrente 428H (coroa 41T / pinhão 14T). • 20.000 km: verificação do TPS se marcha lenta oscilar. • A cada 6 meses: checagem da bateria. Reforce a inspeção de vazamento de óleo no motor e ferrugem no quadro/bengalas a cada revisão — pontos com relatos documentados nesta geração.',
  },
]

const FZ15_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vazamento de óleo do motor relatado em unidades com baixa quilometragem — caso raro, mas documentado em reclamações formais',
    body: 'Existem reclamações registradas de vazamento de óleo do motor em unidades FZ15/YS Fazer 150 com pouco uso. Não é um padrão generalizado, mas o suficiente para merecer atenção na inspeção pré-compra (mancha de óleo sob o motor, cárter ou juntas). Se a moto está na garantia, documente o vazamento com fotos e acione a concessionária imediatamente — vazamentos não tratados podem causar dano por baixo nível de óleo.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio duro após troca de óleo — reclamação recorrente; combinação de óleo errado ou cabo de embreagem desregulado',
    body: 'Vários relatos de câmbio ficando duro de engatar logo após a primeira troca de óleo (por volta de 1.000 km), especialmente nas reduções de marcha. Causa mais provável: óleo fora da especificação JASO MA (óleo automotivo comum engorda o disco da embreagem) ou cabo de embreagem que precisa de regulagem. Corrigir: confirme o óleo usado na troca e peça ajuste do cabo de embreagem na revisão gratuita.',
  },
  {
    severity: 'WARN',
    title: 'Parafuso do miolo do contato de ignição soltando — item pequeno mas gera problema de partida se não for resolvido',
    body: 'Relato registrado de parafuso que prende o miolo do contato de ignição soltando e caindo repetidamente. Sintoma: chave "mole" no contato ou dificuldade de girar. Solução: aplicar trava rosca (Loctite azul) no parafuso durante o reaperto — problema recorrente de torque insuficiente de fábrica, não desgaste.',
  },
  {
    severity: 'WARN',
    title: 'Sensor TPS descalibrado — mesmo comportamento herdado da geração anterior; marcha lenta instável após 20.000 km',
    body: 'Assim como a geração antiga (YS 150), a FZ15 pode apresentar marcha lenta oscilante por descalibração do TPS após uso prolongado, embora com menor frequência por ser sistema de injeção mais moderno. Antes de trocar peças, peça um diagnóstico com scanner (R$50-80) — na maioria dos casos resolve com reajuste, sem necessidade de troca do sensor (R$120-200 quando necessário).',
  },
  {
    severity: 'WARN',
    title: 'Ferrugem prematura em pontos de solda e bengala — relatos de oxidação com poucos meses de uso, principalmente em regiões litorâneas',
    body: 'Há reclamações de pontos de ferrugem aparecendo no quadro, bengalas e suporte do descanso lateral com poucos meses/poucos km de uso — mais comum em regiões de maresia ou alta umidade. Prevenção: lavar a moto regularmente (principalmente após chuva ou proximidade do mar) e aplicar óleo protetivo ou cera automotiva em partes cromadas/pintadas expostas. Se aparecer ferrugem prematura ainda na garantia, documente com fotos e acione a concessionária — cobertura pode ser negada alegando falta de manutenção, então mantenha notas fiscais de lavagem/cuidados se possível.',
  },
]

// ─── FZ25 — Fazer 250 FI/moderna (2017-2024+) ─────────────────────────────────
// Motor 249cc monocilíndrico SOHC 2V, refrigerado a ar, injeção eletrônica
// ~21,3cv @ 8.000 rpm (gasolina) / ~21,5cv (etanol), torque ~2,1 kgf.m
// Nomenclatura FIPE: "FZ25 250 FAZER FLEX", "FZ25 250 FAZER CONNECTED",
// "FZ25 FAZER THOR FLEX" (sem "250" no nome) e edições Marvel (Capitã Marvel/Pantera Negra)

const FZ25_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 20W-50 Yamalube JASO MA — capacidade ~1,45 L com filtro / ~1,35 L sem trocar filtro; total ~1,55 L',
    body: 'A FZ25 usa Yamalube 4 tempos 20W-50 API SH JASO MA (ou superior). Capacidade total: ~1,55 L; troca com filtro: ~1,45 L; sem troca de filtro: ~1,35 L. Hiflofiltro HF145 ou Mahle OX176 como alternativas ao filtro original. Troca: 4.000 km em uso urbano, até 5.000 km em uso rodoviário. JASO MA obrigatório — embreagem multidisco banhada a óleo não tolera aditivos de fricção de óleo automotivo.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK DR8EA (gap 0,6-0,7 mm) — atenção: gap MENOR que o usado em versões antigas de referência genérica de 0,8 mm',
    body: 'A FZ25 especifica NGK DR8EA com gap de 0,6-0,7 mm — confira esse valor antes de regular, pois é comum encontrar recomendação genérica de 0,8 mm (de motos similares) circulando errado em oficinas. Preço: R$20-30. Troca: 8.000 km. Torque de aperto: 12 Nm ou "aperto de mão + ¾ de volta" com vela fria em cabeçote de alumínio — não force.',
  },
  {
    severity: 'OK',
    title: 'Folga de válvulas adm 0,08 mm / esc 0,11 mm — motor frio, PMS de compressão; intervalo prático 12.000 km mesmo com manual indicando mais',
    body: 'Folgas oficiais da FZ25: admissão 0,08 mm / escape 0,11 mm (medidas a frio, no PMS de compressão — ambas as válvulas fechadas). Valores próximos aos da geração anterior mas confira sempre a tabela específica do ano do seu manual, pois pequenas revisões técnicas mudam a especificação entre gerações. Intervalo prático recomendado por mecânicos: 12.000 km em uso urbano, mesmo que o manual indique intervalo maior.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428H — kit coroa 45T / pinhão 15T; DID ou Cofap com retentor para uso urbano pesado',
    body: 'Kit de transmissão FZ25: corrente 428H, coroa 45 dentes, pinhão 15 dentes (confira o kit específico do ano — pode variar levemente por versão). Kits com retentor (DID, Riffel, Cofap): R$200-300, dobram a durabilidade. Folga: 15-25 mm dependendo da versão — consulte o manual do ano exato. Lubrificar a cada 500 km, mais frequente com uso intenso ou chuva.',
  },
  {
    severity: 'OK',
    title: 'Versão Connected e edições Marvel (Capitã Marvel, Pantera Negra, Homem de Ferro/Thor) — mesma mecânica, só grafismo e/ou painel digital',
    body: 'As edições especiais da FZ25 (Capitã Marvel, Pantera Negra, Thor/Homem de Ferro) são idênticas mecanicamente à versão padrão — a diferença é apenas visual (grafismo exclusivo) e, em algumas versões, o painel Connected com Bluetooth/app Yamaha Motor On. Toda a manutenção (óleo, vela, corrente, válvulas) é igual entre as versões. Não pague sobrepreço em peças "específicas" para edições especiais — são as mesmas peças da FZ25 comum.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar — trocar junto com o óleo em uso urbano; caixa de filtro compartilha desenho similar à geração anterior mas confirme o código',
    body: 'Troca recomendada: 8.000-12.000 km, priorizando o intervalo menor em cidades com muita poluição ou poeira. Ao comprar peça de reposição, confirme o código exato do filtro para o ano da sua FZ25 — alguns fornecedores vendem o filtro genérico "Fazer 250" sem diferenciar sutilezas entre anos, o que raramente causa problema mas vale conferir o encaixe antes de fechar a compra.',
  },
  {
    severity: 'OK',
    title: 'Torque limitado a 8.000 rpm relatado por alguns proprietários — normalmente é o corte eletrônico de segurança, não defeito',
    body: 'Alguns proprietários relatam a moto "não passar de 8.000 rpm", limitando a velocidade máxima. Na maioria dos casos é o corte de segurança da ECU (limitador de rotação de fábrica) funcionando normalmente — a FZ25 atinge potência máxima próxima dessa faixa e o corte evita dano ao motor. Se a limitação ocorrer em rotação mais baixa que o esperado ou vier acompanhada de luz de injeção acesa, o problema é outro (sensor de rotação, bobina, ou combustível de má qualidade) — peça diagnóstico com scanner.',
  },
]

const FZ25_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção da FZ25 (Fazer 250 injetada atual) por quilometragem — do primeiro serviço até 40.000 km',
    body: 'CRONOGRAMA CONSOLIDADO — FZ25/Fazer 250 FI (motor 249cc SOHC): • 1.000 km: revisão de amaciamento gratuita. • 4.000-5.000 km e múltiplos: troca de óleo Yamalube 20W-50 JASO MA + filtro (~1,45 L com filtro). • 8.000 km: vela NGK DR8EA (gap 0,6-0,7 mm). • 8.000-12.000 km: filtro de ar. • 12.000 km: regulagem de válvulas (adm 0,08 mm / esc 0,11 mm). • 500 km: lubrificação da corrente 428H. • Conforme desgaste: kit de corrente (coroa 45T / pinhão 15T). • 8.000-10.000 km: pastilhas dianteiras. • Mensal: inspeção dos retentores da bengala 41 mm (ponto de atenção documentado nesta geração). • Anualmente ou ao acender luz de injeção: scanner para DTCs. Válido igualmente para as edições especiais Marvel (Capitã Marvel, Pantera Negra, Thor) — mesma mecânica da versão padrão.',
  },
]

const FZ25_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Retentores da bengala dianteira — estouro e vazamento relatado como ponto de atenção recorrente da FZ25',
    body: 'A suspensão dianteira da FZ25 é citada com frequência em reclamações por retentores que estouram e vazam óleo, às vezes com fissura no cilindro cromado da bengala. Inspecione mensalmente (névoa oleosa na haste = estágio inicial). Kit retentores 41 mm (Ariete): R$70-100 o par. Óleo de bengala: Motul Fork Oil 10W, ~100-110 mL por tubo — troque junto com os retentores. Óleo visível sobre o disco dianteiro = pare de rodar imediatamente.',
  },
  {
    severity: 'WARN',
    title: 'Bloco do farol soltando parte interna — relatado principalmente em unidades 2018-2021',
    body: 'Proprietários de FZ25 dos anos 2018-2021 relataram o bloco interno do farol se soltando, afetando o foco e a iluminação noturna. Sintoma: farol "desalinhado" mesmo sem batida ou queda. Verificação: abrir o conjunto do farol e checar a fixação das presilhas plásticas internas — reparo geralmente não precisa de peça nova, apenas reencaixe correto. Se recorrente, considere reforçar com um ponto de cola plástica adequada.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem com falhas relatadas em unidades novas — casos de moto "sem tração" mesmo acelerada',
    body: 'Há reclamações registradas de embreagem com defeito de fábrica que deixa a moto sem tração (patina) mesmo com o motor acelerado normalmente, em unidades com baixa quilometragem. Se isso ocorrer dentro da garantia, não tente ajustar por conta própria — documente e acione a concessionária, pois pode ser platô ou disco de embreagem com defeito de fabricação, coberto por garantia.',
  },
  {
    severity: 'WARN',
    title: 'Ferrugem prematura no quadro, bengalas e suporte de descanso — relatos com poucas semanas de uso',
    body: 'Assim como na FZ15, há relatos de ferrugem aparecendo rapidamente (às vezes com apenas 3.000 km) no quadro, bengalas e suporte do descanso lateral da FZ25. Mais comum perto do litoral. Prevenção: lavagens regulares e produto anticorrosivo em pontos cromados. Caso ocorra na garantia, fotografe e reporte imediatamente — a Yamaha pode negar cobertura alegando desgaste natural se o registro for tardio.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo do bloco do motor em unidades novas — relato recorrente que merece inspeção pré-entrega detalhada',
    body: 'Reclamações registradas de vazamento de óleo do bloco do motor em FZ25 0km ou com baixíssima quilometragem. Na entrega da moto (0km) ou na primeira revisão, verifique atentamente embaixo do motor por manchas de óleo antes de assinar o termo de entrega. Vazamento identificado cedo é reparo simples na garantia; identificado tarde pode gerar discussão sobre cobertura.',
  },
]

// ─── YS 150 — Fazer 150 geração anterior injetada (2014-2018) ────────────────
// Motor 150cc monocilíndrico SOHC 2V, refrigerado a ar, injeção eletrônica bicombustível
// ~12,3cv @ 7.500 rpm, torque ~1,28 kgf.m; freio traseiro a tambor
// CORREÇÃO IMPORTANTE: apesar do nome popular sugerir "carburada", a YS 150 Fazer
// já nasceu com injeção eletrônica bicombustível (obrigatória desde a norma PROMOT
// de 2014 para motos até 150cc) — NÃO tem carburador. A diferença real para a FZ15
// é a geração de chassi/design (anterior ao rebrand FZ) e o freio traseiro a tambor.
// Nomenclatura FIPE: "YS 150 FAZER ED/FLEX" e "YS 150 FAZER SED/ FLEX"

const YS150_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Injeção eletrônica bicombustível de fábrica — a YS 150 NÃO é carburada; motor já nasceu injetado (norma PROMOT 2014)',
    body: 'Diferente do que o nome "geração antiga" sugere, a YS 150 Fazer (2014+) já tem injeção eletrônica bicombustível de fábrica — não existe versão a carburador desta moto no Brasil. A confusão é comum porque ela é a geração anterior ao rebrand "FZ15", mas ambas são injetadas. A real diferença mecânica para a FZ15 é: chassi/design de geração anterior e freio traseiro a tambor (a FZ15 pode ter versões com disco traseiro dependendo do ano).',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 ou 20W-50 Yamalube JASO MA — capacidade ~1,25 L (desmontagem) / ~1,00-1,10 L em troca comum',
    body: 'Mesma especificação de óleo da geração FZ15: Yamalube 10W-40 ou 20W-50, API SL+, JASO MA obrigatório. Capacidade: ~1,25 L com desmontagem completa, ~1,00 L sem trocar filtro / ~1,10 L trocando o filtro em manutenção de rotina. Troca: 3.000 km em uso urbano intenso, 4.000 km em uso normal. Sendo moto mais antiga hoje (muitas unidades já passaram de 40-60 mil km), reforce a checagem de vazamento no cárter a cada troca.',
  },
  {
    severity: 'OK',
    title: 'Freio traseiro a tambor (245 mm disco dianteiro + tambor 130 mm traseiro) — ajuste de curso do pedal a cada revisão',
    body: 'A YS 150 tem freio dianteiro a disco ventilado (245 mm) e freio traseiro a TAMBOR — diferente de versões mais recentes que podem ter disco nas duas rodas. Lona de freio traseiro: Fras-le ou original Yamaha. Curso do pedal correto: 20-25 mm. Tambor ressecado ou lona vitrificada (brilhante) reduz muito a eficiência de frenagem — trocar lona a cada 12.000-15.000 km em uso urbano.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428 — coroa e pinhão específicos da geração YS; verificar o código exato ao comprar kit de reposição',
    body: 'A YS 150 usa corrente de passo 428, mesma bitola da geração posterior, mas confirme o código do kit específico da YS ao comprar peça de reposição — vendedores às vezes confundem com kits da geração FZ15 mais recente, que podem ter relação (número de dentes) diferente. Kit completo com retentor: R$150-220. Lubrificar a cada 400-500 km, ainda mais importante em unidades já com muitos km rodados.',
  },
  {
    severity: 'OK',
    title: 'Peso leve (117 kg em ordem de marcha ~130 kg) — moto ágil para trânsito urbano, boa opção de entrada ainda muito comum no mercado de usados',
    body: 'A YS 150 tem peso seco de 117 kg (rodando ~130 kg) e altura de assento de 785 mm — moto compacta e ágil, muito indicada para trânsito urbano intenso e pilotos iniciantes. Sendo geração descontinuada há alguns anos, é comum encontrar unidades bem depreciadas no mercado de usados: valorize inspeção de corrosão no quadro e desgaste de embreagem antes de comprar, já que motos assim costumam ter rodado bastante como moto de trabalho (entrega/app).',
  },
  {
    severity: 'OK',
    title: 'Tanque de 15,2 litros incluindo reserva — autonomia generosa para a categoria; consumo médio urbano bom por ser motor de baixa cilindrada',
    body: 'Tanque de 15,2 L (com reserva) permite autonomia de aproximadamente 350-450 km dependendo do uso, já que o motor de 150cc consome pouco em ritmo urbano. Ao comprar usada: teste a bomba de combustível e o sensor de nível — em motos com muitos anos de uso o sensor de boia pode ficar impreciso, similar ao problema conhecido da Fazer 250.',
  },
  {
    severity: 'WARN',
    title: 'Peças de reposição cada vez mais restritas a fornecedores aftermarket — geração descontinuada há alguns anos nas concessionárias',
    body: 'Por ser geração anterior à FZ15, peças 100% originais da YS 150 podem já não estar disponíveis em todas as concessionárias, exigindo recorrer a fornecedores aftermarket (Riffel, DID, KMC para transmissão; Fras-le para freios; Hiflofiltro para filtro de óleo). Antes de comprar uma YS 150 usada, pesquise a disponibilidade de peças na sua região — em geral ainda é uma moto bem suprida por ser um dos modelos mais vendidos do Brasil em sua época.',
  },
]

const YS150_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vazamento de óleo do motor — relato documentado mesmo em unidades relativamente recentes da YS 150',
    body: 'Há reclamações formais de vazamento de óleo do motor em unidades YS 150 SED, incluindo modelos mais recentes da geração. Inspecione o cárter e as juntas do motor regularmente, principalmente em compras de motos usadas. Vazamento persistente não tratado pode levar a baixo nível de óleo e desgaste acelerado do motor — não é reparo caro (juntas + mão de obra R$150-300) mas precisa de diagnóstico correto do ponto exato do vazamento.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio com engates duros após troca de óleo — mesma característica documentada na geração FZ15',
    body: 'Relatos de câmbio ficando "duro" para engatar, principalmente nas reduções de marcha, após troca de óleo — reclamação registrada especificamente em unidade SED. Causa mais provável: óleo fora do padrão JASO MA usado na troca, ou necessidade de regulagem do cabo de embreagem. Sempre confirme selo JASO MA na embalagem do óleo usado na sua revisão.',
  },
  {
    severity: 'WARN',
    title: 'Parafuso do contato/miolo de ignição soltando repetidamente — reparo simples mas incômodo se não resolvido definitivamente',
    body: 'Reclamação documentada de parafuso que prende o miolo do contato de ignição afrouxando e caindo repetidamente. Sintoma: chave de ignição "mole" ou com folga ao girar. Solução definitiva: aplicar trava rosca (Loctite azul, média resistência) no parafuso durante o reaperto — resolve o problema de forma permanente.',
  },
  {
    severity: 'WARN',
    title: 'Protetor plástico da corrente (comieira) com ruído — não é falha grave mas é queixa recorrente entre proprietários',
    body: 'Barulho do protetor plástico da corrente (popularmente "comieira") é queixa comum entre donos de YS 150, geralmente por folga normal de fábrica combinada com vibração natural do plástico contra a corrente. Verifique se o parafuso de fixação do protetor está apertado — solto, o ruído piora. Não representa risco mecânico, mas incomoda no dia a dia.',
  },
  {
    severity: 'WARN',
    title: 'Sensor TPS descalibrado — problema conhecido nesta geração; marcha lenta instável após uso prolongado',
    body: 'A YS 150, como toda moto injetada com uso prolongado, pode apresentar marcha lenta oscilante por descalibração do TPS (sensor de posição da borboleta). Sintoma: rpm variando 200-300 na marcha lenta sem estabilizar. Diagnóstico com scanner (R$50-80) resolve a maior parte dos casos com reajuste — substituição do sensor (R$120-200) só quando o defeito é irreparável.',
  },
]

const YS150_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção da YS 150 (Fazer 150 geração anterior) por quilometragem — do primeiro serviço até 40.000 km',
    body: 'CRONOGRAMA CONSOLIDADO — YS 150 Fazer (motor 150cc injeção bicombustível): • 1.000 km: revisão de amaciamento (torque geral + 1ª troca de óleo). • 3.000-4.000 km e múltiplos: troca de óleo Yamalube 10W-40/20W-50 JASO MA (~1,00-1,10 L com filtro). • 8.000 km: inspeção/troca de vela. • 8.000-12.000 km: filtro de ar. • 12.000-15.000 km: lona do freio traseiro a tambor + ajuste do curso do pedal (20-25 mm). • 8.000-10.000 km: pastilhas do freio dianteiro (disco 245 mm). • 400-500 km: lubrificação da corrente 428. • Conforme desgaste: kit de corrente completo (confirme código específico da geração YS ao comprar). • Ao acender luz de injeção ou marcha lenta instável: diagnóstico do TPS com scanner. • A cada 6 meses: checagem da bateria. Sendo moto mais antiga (muitas unidades já com 40.000+ km), redobre a atenção a vazamentos de óleo do motor e corrosão no quadro a cada revisão.',
  },
]

// ─── YS 250 — Fazer 250 geração anterior injetada (2006-2017) ────────────────
// Motor 249cc monocilíndrico SOHC 2V, refrigerado a ar com radiador de óleo,
// injeção eletrônica (2005+: gasolina; 2012+: bicombustível "Blueflex")
// ~21cv @ 8.000 rpm, torque ~2,1 kgf.m; TCI (ignição transistorizada)
// CORREÇÃO IMPORTANTE: mesmo caso da YS 150 — a YS 250 Fazer JÁ NASCEU injetada
// em 2005 (injeção a gasolina) e migrou para bicombustível "Blueflex" a partir de
// ~2012. NÃO existe versão a carburador desta moto no Brasil.
// Nomenclatura FIPE: "YS 250 FAZER/ FAZER L. EDITION /BLUEFLEX"

const YS250_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Injeção eletrônica desde o lançamento (2005) — a YS 250 NÃO é carburada; Blueflex bicombustível a partir de ~2012',
    body: 'A YS 250 Fazer é injetada desde a primeira geração (2005), inicialmente só a gasolina. A partir de aproximadamente 2012 passou a usar a tecnologia Blueflex bicombustível (gasolina e/ou etanol), refletida no nome de mercado "Fazer Blueflex". Ao comprar uma unidade usada, confirme o ano para saber se é a versão só-gasolina (2005-2011) ou bicombustível (2012+) — abastecer etanol em unidade só-gasolina pode causar problemas de mistura e corrosão em componentes não preparados.',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50 Yamalube JASO MA — capacidade total 1,5 L / troca comum 1,45 L',
    body: 'A YS 250 usa Yamalube 20W-50 (ou 10W-40) API SH+ JASO MA. Capacidade total: 1,5 L; troca de rotina: 1,45 L. Motor com cárter úmido e radiador de óleo (não é refrigeração a água — o radiador de óleo ajuda a dissipar calor do motor a ar). Troca: 4.000 km em uso urbano. Verifique o radiador de óleo (localizado geralmente próximo ao motor) por vazamentos ou obstrução por sujeira — comum em unidades mais antigas.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK DR8EA (gap 0,6-0,7 mm) — mesma vela usada em toda a família YS/FZ 250 desde 2005',
    body: 'A YS 250 usa NGK DR8EA, gap 0,6-0,7 mm — mesma vela especificada para a FZ25 atual, o que facilita encontrar a peça em qualquer loja. Preço: R$20-30. Troca: 8.000 km. Em unidades mais antigas (rodando há 10+ anos), vale trocar o cachimbo da vela junto se houver sinal de falha de ignição intermitente (moto "engasgando" em aceleração).',
  },
  {
    severity: 'OK',
    title: 'Corrente 428H — kit coroa 45T / pinhão 15T (código Yamaha 44C-F5445-09 / 44C-E7460-09)',
    body: 'Kit de transmissão original da YS 250: corrente 428H, coroa 45 dentes, pinhão 15 dentes (códigos originais Yamaha 44C-F5445-09 e 44C-E7460-09, válidos para toda a família 2005-2017). Kits completos com retentor (Cofap, Riffel, Nakata): R$150-250. Ignição TCI (transistorizada) — não tem CDI convencional, o que simplifica alguns diagnósticos elétricos comparado a motos com CDI separado.',
  },
  {
    severity: 'OK',
    title: 'Radiador de óleo — item que a FZ25 atual não tem; inspecione mangueiras e aletas em unidades com muitos anos de uso',
    body: 'A YS 250 usa refrigeração a ar COM radiador de óleo (não confundir com radiador de água/líquido) — diferencial mecânico real desta geração. As mangueiras de conexão do radiador ressecam com o tempo em unidades com 10+ anos de uso; inspecione por rachaduras e vazamento de óleo nesse ponto. Aletas do radiador entupidas com sujeira reduzem a eficiência de resfriamento — limpeza simples com ar comprimido a cada revisão maior resolve.',
  },
  {
    severity: 'OK',
    title: 'Pneus 100/80-17 dianteiro e 130/70-17 traseiro — traseiro mais estreito que a geração FZ25 atual (140/70-17)',
    body: 'A YS 250 usa pneu traseiro 130/70-17 — mais estreito que o 140/70-17 da FZ25 atual. Ao comprar pneu de reposição, confirme a medida exata do seu ano/versão antes de fechar a compra, pois é fácil confundir com a medida da geração mais nova. Peso rodando: ~153 kg (mais pesada que a FZ25 atual, que já recebeu otimizações de chassi ao longo dos anos).',
  },
  {
    severity: 'OK',
    title: 'Geração descontinuada — peças cada vez mais dependentes do mercado aftermarket; boa opção custo-benefício no usado',
    body: 'Sendo modelo descontinuado desde ~2017, peças 100% originais Yamaha para a YS 250 vão ficando mais escassas em concessionárias, mas o forte volume de vendas histórico da moto no Brasil garante bom suprimento aftermarket (Cofap, Riffel, Nakata, Hiflofiltro). Antes de comprar usada: cheque histórico de manutenção, estado do radiador de óleo e corrosão no quadro — moto com mais de 10-15 anos de estrada exige atenção redobrada nesses pontos.',
  },
]

const YS250_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Defeitos no sistema de injeção eletrônica — códigos de falha para sensores de motor, ignição e inclinação',
    body: 'Fóruns de proprietários documentam uma variedade de códigos de defeito no painel relacionados a sensores de motor, sensores de ignição e sensor de inclinação (tombamento) na YS 250. Ao acender a luz de injeção, o diagnóstico correto exige scanner compatível com o sistema Yamaha (não é OBD2 padrão automotivo) — procure oficina especializada em motos injetadas com scanner adequado antes de trocar peças por tentativa e erro.',
  },
  {
    severity: 'WARN',
    title: 'Marcha lenta instável — corpo de aceleração sujo ou sensor híbrido (TPS) descalibrado são as causas mais comuns',
    body: 'Marcha lenta irregular na YS 250 costuma ter duas causas principais: sujeira acumulada no corpo de aceleração (limpeza resolve a maioria dos casos) ou sensor híbrido/TPS descalibrado (ajuste com scanner). Se a moto permanecer acelerada mesmo após ajuste de marcha lenta, o atuador FID (válvula de partida a frio/afogador eletrônico) pode estar sujo ou com o-ring ressecado — limpeza e troca do o-ring geralmente resolve.',
  },
  {
    severity: 'WARN',
    title: 'Bateria descarregando sem causa aparente — problema documentado com código de diagnóstico específico (código 46)',
    body: 'Há relatos documentados de bateria da YS 250 descarregando sem motivo aparente, associado ao código de diagnóstico "46" no sistema de injeção. Causas mais comuns: regulador retificador com defeito (não estabiliza a carga corretamente), consumo parasita de algum acessório instalado incorretamente, ou bateria no fim da vida útil (baterias de moto duram tipicamente 2-3 anos). Teste com multímetro: repouso 12,6V mínimo, em marcha 13,5-14,5V — fora dessa faixa, investigue o regulador retificador antes de trocar a bateria.',
  },
  {
    severity: 'WARN',
    title: 'Radiador de óleo — obstrução ou vazamento em unidades antigas prejudica a refrigeração do motor',
    body: 'Sendo uma geração já com muitos anos de estrada, o radiador de óleo (item exclusivo desta geração, ausente na FZ25 atual) pode acumular sujeira nas aletas ou apresentar vazamento nas conexões de mangueira. Sintoma de superaquecimento: perda de potência progressiva em uso prolongado, cheiro de óleo quente. Limpeza das aletas: procedimento simples e barato. Vazamento nas mangueiras: troca preventiva recomendada em unidades com mais de 10 anos, independente de sintoma visível.',
  },
  {
    severity: 'WARN',
    title: 'Disponibilidade de peças originais reduzida — geração fora de linha há alguns anos exige planejamento na manutenção',
    body: 'Por ser modelo descontinuado, algumas peças originais específicas (plásticos de carenagem, componentes elétricos específicos) podem ter prazo de entrega mais longo ou já não estarem mais disponíveis nas concessionárias, exigindo busca em desmanches ou fornecedores aftermarket. Itens de desgaste comum (óleo, filtro, vela, corrente, pastilhas/lona de freio) continuam amplamente disponíveis por ser um modelo historicamente muito vendido no Brasil.',
  },
]

const YS250_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção da YS 250 (Fazer 250 geração anterior) por quilometragem — do primeiro serviço até 40.000 km',
    body: 'CRONOGRAMA CONSOLIDADO — YS 250 Fazer (motor 249cc SOHC, injeção eletrônica): • 1.000 km: revisão de amaciamento. • 4.000 km e múltiplos: troca de óleo Yamalube 20W-50 JASO MA (~1,45 L com filtro). • 8.000 km: vela NGK DR8EA (gap 0,6-0,7 mm). • 8.000-12.000 km: filtro de ar. • 500 km: lubrificação da corrente 428H. • Conforme desgaste: kit de corrente completo (coroa 45T / pinhão 15T, código Yamaha 44C-F5445-09/44C-E7460-09). • 8.000-10.000 km: pastilhas dianteiras. • A cada revisão maior: limpeza das aletas do radiador de óleo + inspeção de mangueiras. • Ao acender luz de injeção ou marcha lenta instável: diagnóstico com scanner compatível Yamaha (corpo de aceleração e atuador FID são pontos comuns de falha). • A cada 6 meses: checagem da bateria e do regulador retificador (histórico de descarga documentado nesta geração). Unidades com 10+ anos de uso: reforce a inspeção de corrosão no quadro e vazamentos no radiador de óleo.',
  },
]

// ─── Tire Pressures ───────────────────────────────────────────────────────────

const TIRE_PRESSURES = [
  {
    modelName: 'FAZER 150',
    yearFrom: 2014, yearTo: 2024,
    tireSize: '100/80-17 (F) · 140/70-17 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Aro 17" em ambos. Com garupa: 33/36 PSI. Pneu 140/70-17 traseiro mais estreito que CB 300R (140/70) — mesma largura mas perfil diferente. Verificar calibragem semanalmente em uso de motoboy.',
  },
  {
    modelName: 'FAZER 250',
    yearFrom: 2017, yearTo: 2024,
    tireSize: '110/70-17 (F) · 140/70-17 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Mesma dimensão que CB 300R. Com garupa: 33/36 PSI. Marcador de combustível impreciso: calibre a pressão quando abastecer como lembrete. Pirelli Sport Demon ou Angel City são as substituições mais comuns.',
  },
  {
    modelName: 'MT-03 321',
    yearFrom: 2015, yearTo: 2024,
    tireSize: '110/70-17 (F) · 140/70-17 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 33, rearPsiLoad: 36,
    notes: 'Aro 17" esportivo. Com garupa: 33/36 PSI. Pneus originais IRC: calibragem correta é crítica em molhado. Troca para Pirelli Diablo Rosso ou Michelin Road 5 muda completamente o comportamento.',
  },
  {
    modelName: 'MT-03 CONNECTED',
    yearFrom: 2015, yearTo: 2024,
    tireSize: '110/70-17 (F) · 140/70-17 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 33, rearPsiLoad: 36,
    notes: 'Mesma moto da MT-03 321, com painel conectado ao smartphone. Aro 17" esportivo. Com garupa: 33/36 PSI. Pneus originais IRC: calibragem correta é crítica em molhado.',
  },
  {
    modelName: 'FZ15',
    yearFrom: 2019, yearTo: 2026,
    tireSize: '100/80-17 (F) · 140/70-17 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Mesma dimensão de pneus da FAZER 150. Com garupa: 33/36 PSI. Versão Connected não altera pneus/pressão. Verificar calibragem semanalmente em uso intenso (app/motoboy).',
  },
  {
    modelName: 'FZ25',
    yearFrom: 2017, yearTo: 2026,
    tireSize: '110/70-17 (F) · 140/70-17 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Mesma dimensão de pneus da FAZER 250. Com garupa: 33/36 PSI. Válido para edições especiais Marvel e versão Connected — mesma mecânica/rodas da versão padrão. Marcador de combustível impreciso: calibre a pressão a cada abastecimento como lembrete.',
  },
  {
    modelName: 'YS 150',
    yearFrom: 2014, yearTo: 2018,
    tireSize: '90/90-18 (F) · 100/90-18 (R) — verificar medida exata do ano/versão',
    frontPsi: 25, rearPsi: 29, frontPsiLoad: 25, rearPsiLoad: 33,
    notes: 'Geração anterior à FZ15 — aro 18" em algumas versões (diferente do aro 17" da geração atual). Com garupa: acrescente 4 PSI no traseiro. Pressão exata pode variar por versão (ED/SED/UBS) — confirme no manual do ano específico antes de calibrar.',
  },
  {
    modelName: 'YS 250',
    yearFrom: 2006, yearTo: 2017,
    tireSize: '100/80-17 (F) · 130/70-17 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Pneu traseiro 130/70-17 — mais ESTREITO que o 140/70-17 da FZ25 atual, não confundir na hora de comprar pneu de reposição. Com garupa: 33/36 PSI. Confirme se sua unidade é 2005-2011 (só gasolina) ou 2012+ (Blueflex bicombustível) antes de abastecer etanol.',
  },
]

// ─── Manutenção ──────────────────────────────────────────────────────────────

const makeFazer150 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-30 JASO MA2 (0,85 L — SEM filtro substituível)', intervalKm: 3000, intervalMonths: 6, notes: 'Dreno direto, sem filtro. Capacidade: 0,85 L. Motoboy: 2.500 km. Nunca enchimento acima do MAX — motor pequeno sem filtro ressente de óleo em excesso.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas (adm 0,07 mm / esc 0,12 mm)', intervalKm: 12000, intervalMonths: 18, notes: 'Manual diz 24.000 km mas mecânicos recomendam 12.000 km em uso urbano. Motor frio, PMS compressão. Folgas DIFERENTES da Honda CG.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK CR7HSA (gap 0,7 mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Iridium CR7HIX: 16.000 km. Gap de 0,7 mm (menor que Honda CG 0,9 mm). Não confundir as velas.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar — inspeção e troca', intervalKm: 8000, intervalMonths: 12, notes: 'Verificar vedação de borracha da caixa do filtro — racha com idade. Troca: 8.000 km (urbano) ou 12.000 km (estrada). Filtro sujo = marcha lenta instável.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Ajuste/calibração do TPS', intervalKm: 12000, intervalMonths: null, notes: 'Marcha lenta oscilante? Verificar TPS primeiro. Ajuste com scanner: R$50-80. Problema recorrente em Fazer 150 com mais de 20.000 km.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 428 — lubrificação e folga (15-20 mm)', intervalKm: 400, intervalMonths: null, notes: 'Coroa 42T / pinhão 15T. DID 428NZ. Lubrificar a cada 400 km. Folga: 15-20 mm.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit corrente 428 (DID 428NZ + coroa 42T + pinhão 15T)', intervalKm: 18000, intervalMonths: null, notes: 'Com lubrificação regular: 18.000-20.000 km. Sem: 12.000 km. Troque o kit completo.', priority: 'HIGH', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Retentores bengala 33 mm + óleo 10W', intervalKm: 30000, intervalMonths: null, notes: 'Inspeção a cada 10.000 km. Ariete 33 mm. Nevoa oleosa: troca a caminho. Óleo no disco: parada imediata.', priority: 'HIGH', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas dianteiras + fluido DOT 4', intervalKm: 8000, intervalMonths: 24, notes: 'Original: 8.000-10.000 km. EBC ou Braking: 14.000-16.000 km. Disco mín 2,5 mm.', priority: 'HIGH', order: 9 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Lona traseira (tambor) + ajuste pedal', intervalKm: 12000, intervalMonths: null, notes: 'Curso do pedal: 20-25 mm. Fras-le ou Yamaha original.', priority: 'MEDIUM', order: 10 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria YTX7L-BS 12V 6Ah — verificação', intervalKm: null, intervalMonths: 6, notes: 'Repouso: 12,6 V. Carga: 13,5-14,5 V em marcha. Bateria fraca: DTCs falsos e partida lenta.', priority: 'MEDIUM', order: 11 },
]

const makeFazer250 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40 JASO MA2 + filtro (1,5 L com filtro)', intervalKm: 4000, intervalMonths: 6, notes: 'Hiflofiltro HF145. Motor SOHC single 249cc. Troca de óleo mais econômica que MT-03.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas (adm 0,08 mm / esc 0,12 mm)', intervalKm: 12000, intervalMonths: 18, notes: 'Motor frio, PMS compressão. SOHC 2 válvulas — mais simples que DOHC 4 válvulas. Manual: 24.000 km; prática: 12.000 km.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK CR8E (gap 0,8 mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Iridium CR8EIX: 16.000 km. Torque: 12 Nm. Não confunda com CR8EH-9 (Honda DOHC).', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar — inspeção e troca', intervalKm: 12000, intervalMonths: 12, notes: 'Verificar vedação da caixa do filtro. Troca mais frequente em uso urbano com poluição intensa.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 520 — lubrificação e folga (30-40 mm)', intervalKm: 500, intervalMonths: null, notes: 'DID 520VX3. Pinhão 14T original. Folga: 30-40 mm. Lubrificar a cada 500 km.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit corrente 520 (DID 520VX3 + coroa 44T + pinhão 14T)', intervalKm: 20000, intervalMonths: null, notes: 'Com lubrificação: 20.000 km. Kit completo sempre.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Retentores bengala 41 mm + óleo 10W', intervalKm: 30000, intervalMonths: null, notes: 'Inspeção a cada 10.000 km. Ariete 41 mm (mesmos que CB 300R). Óleo: Motul Fork Oil 10W.', priority: 'HIGH', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas dianteiras + fluido DOT 4', intervalKm: 8000, intervalMonths: 24, notes: 'Original: 8.000-10.000 km. EBC FA152HH ou Braking para mais duração.', priority: 'HIGH', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Freio traseiro (tambor) + ajuste pedal', intervalKm: 14000, intervalMonths: null, notes: 'Fazer 250 tem tambor traseiro. Lona Fras-le. Curso do pedal: 20-30 mm.', priority: 'MEDIUM', order: 9 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria YTZ7S 12V 7Ah — verificação', intervalKm: null, intervalMonths: 6, notes: 'Repouso: 12,6 V mín. Carga: 13,8-14,5 V. Fazer 250 com partida difícil a frio: verifique bateria primeiro.', priority: 'MEDIUM', order: 10 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Scanner — leitura de DTCs e TPS', intervalKm: null, intervalMonths: 12, notes: 'Anualmente ou ao acender luz de injeção. TPS descalibrado é o DTC mais comum.', priority: 'MEDIUM', order: 11 },
]

const makeMT03 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40 JASO MA2 + filtro (2,4 L com filtro — bicilíndrico)', intervalKm: 5000, intervalMonths: 6, notes: 'Hiflofiltro HF204. Full-sintético (Motul 7100 ou Castrol Power1 10W-40) recomendado para manter o motor refinado. Volume 2,4 L = custo maior que single.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas DOHC 8v (adm 0,11-0,15 mm / esc 0,21-0,25 mm)', intervalKm: 6000, intervalMonths: 12, notes: 'INTERVALO CURTO: 6.000 km conforme manual Yamaha. 8 válvulas = mais trabalho. Exige mecanico com experiência em DOHC twin. Custo: R$300-500.', priority: 'CRITICAL', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Velas NGK CR9EH-9 (gap 0,9 mm) — DUAS velas, trocar em PAR', intervalKm: 12000, intervalMonths: 18, notes: 'NGK CR9EH-9 (par R$40-60). Iridium CR9EHIX-9 (par R$160-220). Sempre em par.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar — inspeção e troca', intervalKm: 12000, intervalMonths: 12, notes: 'Filtro esportivo K&N compatível (lavável). Original: R$35-55. K&N: R$180-240 (investimento único).', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 520 — lubrificação e folga (30-40 mm)', intervalKm: 500, intervalMonths: null, notes: 'DID 520VX3 ou RK 520KRO. Pilotagem esportiva: 300 km. Coroa 43T / pinhão 16T original.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit corrente 520 (DID 520VX3 + coroa + pinhão)', intervalKm: 20000, intervalMonths: null, notes: 'Pilotagem esportiva: 15.000-18.000 km. Kit completo sempre.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Sliders e proteções — verificação de fixação', intervalKm: 5000, intervalMonths: null, notes: 'Sliders soltos são inúteis em queda. Verificar torque de fixação a cada revisão.', priority: 'MEDIUM', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Retentores bengala 41 mm + óleo (Yamaha fork oil 10W)', intervalKm: 30000, intervalMonths: null, notes: 'Inspeção a cada 10.000 km. Pilotagem esportiva frequente: 20.000 km. Motul Fork Oil 10W.', priority: 'HIGH', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas dianteiras (dupla pinça) + fluido DOT 4', intervalKm: 8000, intervalMonths: 24, notes: 'MT-03 tem pinça dianteira com 2 pistões. EBC FA129HH ou Galfer FD290 para melhor performance. DOT 4 a cada 2 anos.', priority: 'HIGH', order: 9 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pinça de freio traseiro — limpeza e lubrificação dos pistões', intervalKm: 20000, intervalMonths: null, notes: 'Pistão da pinça traseira trava em uso urbano. Limpeza preventiva a cada 20.000 km.', priority: 'MEDIUM', order: 10 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria YTZ10S 12V 8,6Ah — verificação', intervalKm: null, intervalMonths: 6, notes: 'Bateria maior que bikes 150cc. Repouso: 12,7 V. Carga: 14,0-14,5 V.', priority: 'MEDIUM', order: 11 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Scanner — leitura de DTCs', intervalKm: null, intervalMonths: 12, notes: 'Anualmente ou ao acender luz de injeção. Motor com sensor lambda, IAT, TPS e sensor de temperatura.', priority: 'MEDIUM', order: 12 },
]

const makeFZ15 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo Yamalube 10W-40/20W-50 JASO MA + filtro (~1,00-1,10 L com filtro)', intervalKm: 3000, intervalMonths: 6, notes: 'Capacidade total ~1,25 L (desmontagem). Motoboy/app: 3.000 km. Uso normal: 4.000 km.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK MR8D', intervalKm: 8000, intervalMonths: 12, notes: 'Vela específica da geração FI — não confundir com CR7HSA da geração carburada/YS.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar — inspeção e troca', intervalKm: 8000, intervalMonths: 12, notes: 'Verificar vedação da caixa do filtro. Filtro diferente do usado na YS 150.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de combustível', intervalKm: 15000, intervalMonths: null, notes: 'Trocar se obstruído (conforme manual do proprietário).', priority: 'MEDIUM', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 428H (128 elos) — lubrificação e folga (15-20 mm)', intervalKm: 400, intervalMonths: null, notes: 'Coroa 41T / pinhão 14T. Lubrificar a cada 400-500 km.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit corrente 428H (coroa 41T + pinhão 14T)', intervalKm: 18000, intervalMonths: null, notes: 'Kits com retentor (DID, Riffel, KMC) dobram a durabilidade.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Ajuste/calibração do TPS', intervalKm: 20000, intervalMonths: null, notes: 'Marcha lenta oscilante após uso prolongado. Diagnóstico com scanner: R$50-80.', priority: 'MEDIUM', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas dianteiras + fluido DOT 4', intervalKm: 8000, intervalMonths: 24, notes: 'Inspeção de desgaste a cada troca de óleo.', priority: 'HIGH', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Inspeção de vazamento de óleo do motor e corrosão no quadro/bengalas', intervalKm: null, intervalMonths: 6, notes: 'Pontos com relatos documentados nesta geração — inspecionar visualmente a cada revisão.', priority: 'MEDIUM', order: 9 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria — verificação', intervalKm: null, intervalMonths: 6, notes: 'Repouso: 12,6 V mín. Carga: 13,5-14,5 V em marcha.', priority: 'MEDIUM', order: 10 },
]

const makeFZ25 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo Yamalube 20W-50 JASO MA + filtro (~1,45 L com filtro)', intervalKm: 4000, intervalMonths: 6, notes: 'Capacidade total ~1,55 L. Uso rodoviário: até 5.000 km.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK DR8EA (gap 0,6-0,7 mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Confirmar gap 0,6-0,7 mm — não confundir com genérico de 0,8 mm.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas (adm 0,08 mm / esc 0,11 mm)', intervalKm: 12000, intervalMonths: 18, notes: 'Motor frio, PMS compressão. Confirme tabela do ano exato do manual.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar — inspeção e troca', intervalKm: 8000, intervalMonths: 12, notes: 'Confirme código exato do filtro para o ano da versão (padrão ou edições Marvel/Connected).', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 428H — lubrificação e folga (15-25 mm)', intervalKm: 500, intervalMonths: null, notes: 'Coroa 45T / pinhão 15T (confira kit específico do ano).', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit corrente 428H (coroa 45T + pinhão 15T)', intervalKm: 20000, intervalMonths: null, notes: 'Kits com retentor (DID, Riffel, Cofap): R$200-300.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Retentores bengala 41 mm — inspeção mensal', intervalKm: null, intervalMonths: 1, notes: 'Ponto de atenção documentado nesta geração — névoa oleosa na haste = estágio inicial.', priority: 'HIGH', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas dianteiras + fluido DOT 4', intervalKm: 8000, intervalMonths: 24, notes: 'Inspeção a cada troca de óleo.', priority: 'HIGH', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Scanner — leitura de DTCs', intervalKm: null, intervalMonths: 12, notes: 'Anualmente ou ao acender luz de injeção.', priority: 'MEDIUM', order: 9 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Inspeção de vazamento de óleo do motor e corrosão no quadro/bengalas', intervalKm: null, intervalMonths: 6, notes: 'Pontos com reclamações documentadas — inspecionar embaixo do motor e chassi.', priority: 'MEDIUM', order: 10 },
]

const makeYS150 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo Yamalube 10W-40/20W-50 JASO MA + filtro (~1,00-1,10 L com filtro)', intervalKm: 3000, intervalMonths: 6, notes: 'Capacidade total ~1,25 L. Unidades com muitos km: reforçar checagem de vazamento no cárter.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela de ignição — inspeção e troca', intervalKm: 8000, intervalMonths: 12, notes: 'Confirme código correto da geração YS ao comprar peça de reposição.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar — inspeção e troca', intervalKm: 8000, intervalMonths: 12, notes: 'Filtro diferente da geração FZ15 mais recente.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 428 — lubrificação e folga (15-20 mm)', intervalKm: 400, intervalMonths: null, notes: 'Confirme código do kit específico da geração YS (pode diferir da FZ15).', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit corrente 428 completo', intervalKm: 18000, intervalMonths: null, notes: 'Kits aftermarket: Riffel, DID, KMC.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Lona do freio traseiro (tambor) + ajuste do pedal', intervalKm: 12000, intervalMonths: null, notes: 'Curso do pedal: 20-25 mm. Fras-le ou original Yamaha.', priority: 'MEDIUM', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas dianteiras (disco 245 mm) + fluido DOT 4', intervalKm: 8000, intervalMonths: 24, notes: 'Inspeção de desgaste a cada troca de óleo.', priority: 'HIGH', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Ajuste/calibração do TPS', intervalKm: 20000, intervalMonths: null, notes: 'Marcha lenta instável após uso prolongado — diagnóstico com scanner primeiro.', priority: 'MEDIUM', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Inspeção de vazamento de óleo do motor e corrosão no quadro', intervalKm: null, intervalMonths: 6, notes: 'Moto mais antiga (geração descontinuada) — reforçar inspeção visual.', priority: 'MEDIUM', order: 9 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria — verificação', intervalKm: null, intervalMonths: 6, notes: 'Repouso: 12,6 V mín. Carga: 13,5-14,5 V.', priority: 'MEDIUM', order: 10 },
]

const makeYS250 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo Yamalube 20W-50 JASO MA (~1,45 L com filtro)', intervalKm: 4000, intervalMonths: 6, notes: 'Capacidade total 1,5 L. Cárter úmido com radiador de óleo.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK DR8EA (gap 0,6-0,7 mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Mesma vela usada em toda a família YS/FZ 250 desde 2005.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar — inspeção e troca', intervalKm: 8000, intervalMonths: 12, notes: 'Verificar vedação da caixa do filtro em unidades mais antigas.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 428H — lubrificação e folga', intervalKm: 500, intervalMonths: null, notes: 'Coroa 45T / pinhão 15T (código Yamaha 44C-F5445-09 / 44C-E7460-09).', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit corrente 428H completo', intervalKm: 20000, intervalMonths: null, notes: 'Aftermarket: Cofap, Riffel, Nakata.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Radiador de óleo — limpeza de aletas e inspeção de mangueiras', intervalKm: null, intervalMonths: 12, notes: 'Item exclusivo desta geração. Unidades com 10+ anos: inspecionar sempre em revisão maior.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas dianteiras + fluido DOT 4', intervalKm: 8000, intervalMonths: 24, notes: 'Inspeção a cada troca de óleo.', priority: 'HIGH', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Scanner — leitura de DTCs (sistema Yamaha, não OBD2 automotivo)', intervalKm: null, intervalMonths: 12, notes: 'Ao acender luz de injeção. Marcha lenta instável: verificar corpo de aceleração e atuador FID.', priority: 'MEDIUM', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria e regulador retificador — verificação', intervalKm: null, intervalMonths: 6, notes: 'Repouso: 12,6 V mín. Carga: 13,5-14,5 V. Histórico de descarga documentado (código 46) — investigar regulador se fora da faixa.', priority: 'MEDIUM', order: 9 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Inspeção de corrosão no quadro e bengalas', intervalKm: null, intervalMonths: 12, notes: 'Geração descontinuada com muitas unidades antigas em uso — atenção redobrada.', priority: 'MEDIUM', order: 10 },
]

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS = [
  { modelName: 'FAZER 150',  yearFrom: 2014, yearTo: 2024, MACETES: FAZER150_MACETES,  PROBLEMAS: FAZER150_PROBLEMAS,  MANUTENCAO: FAZER150_MANUTENCAO },
  { modelName: 'FAZER 250',  yearFrom: 2017, yearTo: 2024, MACETES: FAZER250_MACETES,  PROBLEMAS: FAZER250_PROBLEMAS,  MANUTENCAO: FAZER250_MANUTENCAO },
  { modelName: 'MT-03 321',      yearFrom: 2015, yearTo: 2024, MACETES: MT03_MACETES,   PROBLEMAS: MT03_PROBLEMAS,      MANUTENCAO: MT03_MANUTENCAO },
  { modelName: 'MT-03 CONNECTED', yearFrom: 2015, yearTo: 2024, MACETES: MT03_MACETES, PROBLEMAS: MT03_PROBLEMAS,      MANUTENCAO: MT03_MANUTENCAO },
  { modelName: 'FZ15',       yearFrom: 2019, yearTo: 2026, MACETES: FZ15_MACETES,       PROBLEMAS: FZ15_PROBLEMAS,      MANUTENCAO: FZ15_MANUTENCAO },
  { modelName: 'FZ25',       yearFrom: 2017, yearTo: 2026, MACETES: FZ25_MACETES,       PROBLEMAS: FZ25_PROBLEMAS,      MANUTENCAO: FZ25_MANUTENCAO },
  { modelName: 'YS 150',     yearFrom: 2014, yearTo: 2018, MACETES: YS150_MACETES,      PROBLEMAS: YS150_PROBLEMAS,     MANUTENCAO: YS150_MANUTENCAO },
  { modelName: 'YS 250',     yearFrom: 2006, yearTo: 2017, MACETES: YS250_MACETES,      PROBLEMAS: YS250_PROBLEMAS,     MANUTENCAO: YS250_MANUTENCAO },
]

const ALL_MANUTENCAO: MaintenanceItemInput[] = [
  ...makeFazer150('FAZER 150', 2014, 2024),
  ...makeFazer250('FAZER 250', 2017, 2024),
  ...makeMT03('MT-03 321', 2015, 2024),
  ...makeMT03('MT-03 CONNECTED', 2015, 2024),
  ...makeFZ15('FZ15', 2019, 2026),
  ...makeFZ25('FZ25', 2017, 2026),
  ...makeYS150('YS 150', 2014, 2018),
  ...makeYS250('YS 250', 2006, 2017),
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
