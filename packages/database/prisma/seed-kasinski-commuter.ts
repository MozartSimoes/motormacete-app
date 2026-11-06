// seed-kasinski-commuter.ts — Kasinski WIN 110, MIDAS FX 110cc, MAGIK 125cc, ERO PLUS 125cc, SUPER CAB 50cc, SUPER CAB 100cc
// Modelos urbanos/commuters com motores chineses 4T (110–125cc) e 2T (50cc)
// WIN 110: motor 109cc OHC monocilíndrico ar — base genérica CUB chinesa
// MIDAS FX 110: 110cc OHC, cub-style, anos 2000
// MAGIK 125 / ERO PLUS 125: 125cc OHC, street urbano
// SUPER CAB 50: 49cc 2T, delivery/commercial scooter cargo
// SUPER CAB 100: 97cc 4T OHC, delivery cargo
// Execute: pnpm --filter @motormacete/database db:seed:kasinski-commuter
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

// ─── WIN 110 ──────────────────────────────────────────────────────────────────
// Motor: 109cc OHC monocilíndrico 4T, ar, ø50mm × 55,5mm
// 7,9 cv @ 7.500 rpm | 0,83 kgf.m @ 4.500 rpm
// Câmbio: 4 marchas manual — pedal seletora convencional
// Vela: NGK C7HSA (gap 0,6–0,7mm) | Óleo: 20W-50 JASO MA, ~0,9L
// Produção: ~2009–2014

const WIN110_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo correto: JASO MA obrigatório',
    body: 'Use sempre 20W-50 JASO MA mineral. Óleo JASO MB (para carros ou motos automáticas) causa patinação da embreagem multi-disco. Capacidade aproximada: 0,9 L no dreno total, 0,8 L na troca simples.',
  },
  {
    severity: 'OK',
    title: 'Vela: NGK C7HSA, gap 0,6–0,7mm',
    body: 'Vela padrão NGK C7HSA (equivalente Denso U22FS-U). Gap 0,6–0,7mm — use calibrador de lâminas, não chute. Iridium NGK CR7HIX dura ~20.000 km. Nunca apertar demais: cabeçote alumínio, torque 10–12 Nm.',
  },
  {
    severity: 'WARN',
    title: 'Corrente 428H: lubrificação é vital',
    body: 'A WIN 110 usa corrente 428H (mesmo padrão de 110cc comuns). Lubrifique a cada 500 km com spray ou óleo 80W-90. Folga ideal: 20–30mm no trecho inferior. Kit de reposição: pinhão 15T × coroa 39T × corrente 428 × 104 elos.',
  },
  {
    severity: 'OK',
    title: 'Carburador: esguicho 98–100 no jato principal',
    body: 'Carburador VM22 ou PZ22. Jato principal #98–100 para altitude até 500m; para cidades acima de 1.000m, reduza para #95. Sintoma de jato gordo: fumaça preta, consumo alto. Limpe o carburador a cada 10.000 km.',
  },
  {
    severity: 'OK',
    title: 'Peças: compatíveis com CG 125 FAN em muitos itens',
    body: 'Filtro de ar, pinhão, corrente e alguns parafusos são compatíveis com Honda CG 125 Fan. O rolamento de roda (6301-2RS) é genérico. Lojas de peças "universais" para motos chinesas 110cc atendem a maioria das necessidades.',
  },
  {
    severity: 'WARN',
    title: 'CDI fraco: substitua por CDI universal de curva avançada',
    body: 'O CDI original da WIN 110 tem avanço conservador. Um CDI universal DC 4 pinos com curva de avanço maior melhora resposta e consumo. Custo: R$30–60. Verifique polaridade dos pinos antes de instalar.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: lavar, não trocar na primeira vez',
    body: 'Filtro de espuma: lave com querosene ou detergente, seque bem e aplique uma fina camada de óleo de motor antes de reinstalar. Só troque quando o filtro estiver danificado ou muito ressecado. Filtro limpo = economia de combustível.',
  },
  {
    severity: 'WARN',
    title: 'Retificador/CDI: tensão entre 13,5–14,5V em marcha lenta',
    body: 'Meça com multímetro nos terminais da bateria a ~3.500 rpm. Abaixo de 13,5V = retificador enfraquecendo. Bateria YB5L-B. Retificador original dura 30.000–50.000 km — tenha um reserva no painel.',
  },
]

const WIN110_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor "bate" na partida fria: provável folga de válvulas',
    body: 'Ruído metálico leve ao ligar a frio que some depois de 1 min = folga de válvulas fora do ajuste. Não ignore: válvula com folga grande queima assento em motores pequenos. Ajuste: adm 0,05mm / esc 0,08mm com motor FRIO.',
  },
  {
    severity: 'WARN',
    title: 'Consumo acima de 35 km/L: carburador ou vela',
    body: 'WIN 110 bem regulada faz 45–55 km/L urbano. Se estiver consumindo mais de 35 km/L: verifique vela (troque), limpe carburador, calibre pneus (veja calibragem recomendada) e inspecione filtro de ar.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem patinando ao acelerar forte',
    body: 'Sintoma: rotação sobe mas aceleração não acompanha. Causa mais comum: óleo errado (JASO MB) ou desgaste das pastilhas de embreagem. Troque o óleo por 20W-50 JASO MA e aguarde. Se persistir, troque o kit de embreagem (~R$60–100).',
  },
  {
    severity: 'WARN',
    title: 'Pneu traseiro mole: verifique frequência de calibragem',
    body: 'Aro 18" com câmara (não tubeless): válvulas de câmara tendem a vazar lentamente. Calibre semanalmente. Pressão baixa cansa o piloto e desgasta câmara por dobramento. Considere substituir câmara por uma de qualidade (Pirelli, Michelin).',
  },
  {
    severity: 'DANGER',
    title: 'Corrente seca: desgasta roda dentada e pinhão',
    body: 'Corrente seca é a causa #1 de desgaste prematuro da transmissão. Com corrente seca, em 5.000 km você pode precisar trocar o kit inteiro (R$80–150). Com lubrificação a cada 500 km, o kit dura 15.000–25.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Dificuldade de partida no frio: enrichecedor ou vela',
    body: 'WIN 110 carburada precisa do enrichecedor (choke) por 1–2 min a frio. Se não liga mesmo com choke: vela gasta, carburador entupido ou bateria fraca. Verifique nessa ordem antes de chamar mecânico.',
  },
  {
    severity: 'WARN',
    title: 'Peças originais difíceis: use equivalências',
    body: 'A Kasinski encerrou atividades em 2016. Peças originais são raras e caras. Substitutos funcionais: filtro de ar (PZ22 genérico), vela NGK C7HSA, corrente DID 428H, rolamentos SKF ou FAG padrão. Mecânicos de motos chinesas conhecem essas equivalências.',
  },
]

const WIN110_MANUTENCAO: TipInput[] = [
  { severity: 'WARN', title: 'Óleo 20W-50 JASO MA — troca a 3.000 km ou 6 meses', body: 'Motor 109cc OHC. Mineral 20W-50. Capacidade: ~0,9L. Drene com motor morno, não frio (o óleo quente leva impurezas).' },
  { severity: 'OK', title: 'Vela NGK C7HSA — inspecionar 5.000 km, trocar 8.000 km', body: 'Gap 0,6–0,7mm. Limpe com escova de arame se eletrodo ainda estiver bom. Troque ao ver desgaste do eletrodo central ou depósito preto.' },
  { severity: 'WARN', title: 'Corrente 428H — lubrificar 500 km, ajustar tensão', body: 'Folga 20–30mm no trecho inferior. Ajuste pelo tensor traseiro. Kit completo (pinhão 15T + coroa 39T + corrente) a cada 15.000 km.' },
  { severity: 'OK', title: 'Filtro de ar (espuma) — lavar 5.000 km, trocar 15.000 km', body: 'Querosene + secagem + camada fina de óleo. Não use solventes agressivos que deformam a espuma.' },
  { severity: 'WARN', title: 'Folga de válvulas (adm 0,05 / esc 0,08mm) — 8.000 km', body: 'Motor frio obrigatório. Ajuste por contra-porca. Não usa shims. Intervalo curto para motores de baixo custo: valvetas tendem a "afundar" com uso.' },
  { severity: 'OK', title: 'Pastilha / lona de freio — inspecionar 6.000 km', body: 'Dianteiro: disco (1 pistão). Traseiro: tambor. Lona abaixo de 2mm = troca. Pastilha abaixo de 1,5mm = troca.' },
  { severity: 'OK', title: 'Pneus 2.75/18 (F) × 90/90-18 (R) — calibrar semanalmente', body: 'Pressão solo: F 26 / R 28 PSI. Com carona: F 26 / R 33 PSI. Câmara: válvula Schrader padrão.' },
  { severity: 'OK', title: 'Cabos (acelerador, embreagem, freio) — lubrificar anualmente', body: 'Lubrificante de cabos ou óleo fino. Cabo duro aumenta esforço e pode quebrar. Troque ao ver fios internos desfibrilando.' },
  { severity: 'OK', title: 'Retificador — verificar tensão anualmente', body: '13,5–14,5V @ 3.500 rpm com multímetro. Retificador RM21 genérico custa R$20–40 e é compatível.' },
]

// ─── MIDAS FX 110cc ──────────────────────────────────────────────────────────
// Motor: 110cc OHC monocilíndrico 4T, ar — motor chinês cub-style
// ~7cv, câmbio 4 marchas manual, corrente 428H
// Produção: ~2003–2008

const MIDAS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo JASO MA: 20W-50, 0,9L',
    body: 'Motor 110cc OHC 4T. Use 20W-50 JASO MA mineral. Nunca JASO MB. Capacidade: ~0,9L. Troca a cada 3.000 km — intervalo curto justificado pelo filtro de óleo simples (tela, não cartucho).',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA (padrão universal CUB 110)',
    body: 'Vela NGK C7HSA, gap 0,6–0,7mm. Mesma vela de dezenas de motos CUB 110cc. Compre em qualquer loja de autopeças. Torque de aperto: 10–12 Nm (não force no cabeçote alumínio).',
  },
  {
    severity: 'WARN',
    title: 'Peças: compatíveis com Dafra Speed 150 e similares',
    body: 'O MIDAS FX compartilha plataforma com várias CUBs de origem chinesa. Filtro de ar PZ22, carburador VM22 e corrente 428H são compatíveis com inúmeras marcas (Dafra, Sundown, Shineray). Pesquise antes de pagar caro por "original".',
  },
  {
    severity: 'OK',
    title: 'Carburador: limpe a cada 10.000 km',
    body: 'Sintoma de carburador sujo: partida difícil, motor afogando em aceleração e consumo alto. Use kit de limpeza (spray carburador) + agulhão fino para os orifícios. Nivel da boia: ~15mm do plano de junta.',
  },
]

const MIDAS_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Dificuldade em encontrar peças "Midas FX"',
    body: 'A Kasinski encerrou atividades em 2016 e o MIDAS FX era modelo de baixo volume. Peças específicas (carenagem, painel) são raras. Motor, corrente, vela e filtros usam padrão universal CUB 110cc — fáceis de encontrar em qualquer mercado de peças.',
  },
  {
    severity: 'WARN',
    title: 'Óleo azulado na descarga = anéis de segmento gastos',
    body: 'Fumaça azulada ao acelerar indica que o óleo está vazando para a câmara de combustão. Em motores CUB 110cc antigos, os anéis perdem vedação por falta de troca de óleo no prazo. Solução: retífica do motor ou substituição dos anéis (~R$150–200 mão de obra).',
  },
  {
    severity: 'DANGER',
    title: 'Folga de válvulas: não ignore se ouvir "batida"',
    body: 'Ruído de "tiquetique" no cabeçote = folga de válvulas incorreta. Adm: 0,05mm / Esc: 0,08mm com motor frio. Válvula apertada demais não fecha corretamente e queima. Válvula folgada demais bate e danifica o assento.',
  },
]

const MIDAS_MANUTENCAO: TipInput[] = [
  { severity: 'WARN', title: 'Óleo 20W-50 JASO MA — 3.000 km ou 6 meses', body: 'Capacidade: 0,9L. Motor 110cc OHC. Sem filtro de cartucho — limpe a tela de óleo ao trocar.' },
  { severity: 'OK', title: 'Vela NGK C7HSA — 8.000 km', body: 'Gap 0,6–0,7mm. Inspecionar a cada 5.000 km.' },
  { severity: 'WARN', title: 'Corrente 428H — lubrificar 500 km', body: 'Folga 20–30mm. Kit: pinhão 15T + coroa 39T + corrente 428H × 104 elos a cada 15.000 km.' },
  { severity: 'OK', title: 'Filtro de ar — limpar 5.000 km', body: 'Espuma: querosene + secar + óleo leve.' },
  { severity: 'WARN', title: 'Folga de válvulas (adm 0,05 / esc 0,08mm) — 8.000 km', body: 'Motor frio obrigatório. Parafuso + contra-porca.' },
]

// ─── MAGIK 125cc ─────────────────────────────────────────────────────────────
// Motor: 124cc OHC monocilíndrico 4T, ar
// ~9–10cv, câmbio 5 marchas, partida elétrica + pedal
// Produção: ~2002–2008 (estilo sport/urbano)

const MAGIK_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesmo motor que Seta 125 / Way 125',
    body: 'A família MAGIK, SETA e WAY 125 compartilham o mesmo motor 124cc OHC monocilíndrico. Vela NGK C7HSA, filtro de ar PZ27, carburador VM22/CV22. Peças são intercambiáveis entre esses modelos.',
  },
  {
    severity: 'OK',
    title: 'Óleo: 20W-50 JASO MA, ~1,0L',
    body: 'Motor 124cc OHC chinês. Use mineral 20W-50 JASO MA. Capacidade: ~1,0L com troca de filtro (se houver), ~0,9L sem. Troca a cada 3.000–4.000 km.',
  },
  {
    severity: 'OK',
    title: 'Partida elétrica: bateria YB5L-B (12V 5Ah)',
    body: 'Se a partida elétrica estiver fraca (motor gira devagar), verifique tensão da bateria: deve estar acima de 12,4V em repouso. Bateria YB5L-B é genérica e custa R$60–90. Guarda-chuva: sempre verifique o fusível (10A) antes de trocar a bateria.',
  },
  {
    severity: 'WARN',
    title: 'Ignição CDI: problema frequente após 5 anos',
    body: 'O CDI original de motos chinesas 125cc da época Kasinski (2002–2008) tem vida média de 40.000–60.000 km. Sintomas de CDI ruim: motor que parte mas apaga no tick-over, cortes em alta rotação, falha de ignição aleatória. CDI universal 4 pinos DC custa R$30–60.',
  },
]

const MAGIK_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Filtro de combustível entupido: causa afogamento',
    body: 'Modelos de 2002–2008 com gasolina do tanque enferrujado: o filtro de combustível (no tubo de abastecimento, antes do carburador) entope facilmente. Troque anualmente. Custa R$5–15 e evita afogamentos no trânsito.',
  },
  {
    severity: 'WARN',
    title: 'Escapamento: prender por falta de lubrificação nos parafusos',
    body: 'Parafusos de fixação do escapamento corroem e gripam. Ao soltar para manutenção, use penetrante (WD-40) e aguarde. Ao remontar, aplique pasta anti-seize nas roscas — salva dor de cabeça no futuro.',
  },
  {
    severity: 'DANGER',
    title: 'Tanque enferrujando por dentro',
    body: 'Tanques de aço de motos chinesas da era 2000–2010 enferrujem por dentro se ficarem com gasolina velha estocada. Sintoma: motor engasga, carburador entope com frequência. Trate o interior do tanque com selador de tanque (R$40–80) ou troque.',
  },
]

const MAGIK_MANUTENCAO: TipInput[] = [
  { severity: 'WARN', title: 'Óleo 20W-50 JASO MA — 3.000–4.000 km', body: 'Motor 124cc OHC. Capacidade: 0,9–1,0L.' },
  { severity: 'OK', title: 'Vela NGK C7HSA — 8.000 km', body: 'Gap 0,6–0,7mm. Torque 10–12 Nm.' },
  { severity: 'WARN', title: 'Corrente 428H — lubrificar 500 km', body: 'Folga 20–30mm. Kit a cada 15.000 km.' },
  { severity: 'OK', title: 'Filtro de ar — limpar 5.000 km', body: 'Espuma: lavar + secar + óleo fino.' },
  { severity: 'WARN', title: 'Folga de válvulas (adm 0,05 / esc 0,08mm) — 8.000 km', body: 'Motor frio.' },
  { severity: 'OK', title: 'Bateria YB5L-B — verificar anualmente', body: '12,4V+ em repouso. Carga com carregador inteligente se ficar parada.' },
]

// ─── ERO PLUS 125cc ───────────────────────────────────────────────────────────
// Motor: 124cc OHC monocilíndrico 4T, ar — cub-style urbano
// Câmbio: 4 marchas, partida pedal + elétrica
// Produção: ~1999–2006

const ERO_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'ERO PLUS 125: cub urbano econômico da era 1999–2006',
    body: 'A ERO PLUS 125cc era uma cub-style (estilo Honda CG) com motor 124cc OHC monocilíndrico 4T. Similar à WIN 110 mas com maior cilindrada. Manutenção idêntica às cubas chinesas 125cc: óleo 20W-50 JASO MA, vela C7HSA, corrente 428H.',
  },
  {
    severity: 'OK',
    title: 'Peças: use equivalências do mercado de motos chinesas',
    body: 'Filtro de ar PZ27, carburador VM22, vela C7HSA e corrente 428H são universais para motos CUB 125cc de origem chinesa. Lojas de "motos chinesas" ou mercados online (MercadoLivre) têm esses itens facilmente.',
  },
  {
    severity: 'WARN',
    title: 'Ajuste da válvula de agulha no carburador: melhora resposta',
    body: 'Se a moto engasga ao abrir o acelerador, suba o clipe da agulha 1 entalhamento (enriquece a mistura intermediária). Em altitudes acima de 800m, desça 1 entalhamento para afinar a mistura.',
  },
]

const ERO_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Modelo antigo: documentação escassa',
    body: 'A ERO PLUS 125cc é um modelo da virada do milênio com pouca documentação online. Para manutenção, use manuais de CUBs 125cc chinesas genéricas — o motor é praticamente idêntico a dezenas de outras marcas.',
  },
  {
    severity: 'WARN',
    title: 'Selim: espuma original desgastada em exemplares antigos',
    body: 'Selins de motos com mais de 15 anos costumam ter a espuma endurecida ou afundada. Retapeçaria de selim custa R$60–120 e melhora muito o conforto em viagens urbanas longas.',
  },
]

const ERO_MANUTENCAO: TipInput[] = [
  { severity: 'WARN', title: 'Óleo 20W-50 JASO MA — 3.000 km', body: 'Capacidade: ~0,9L. Motor 124cc OHC.' },
  { severity: 'OK', title: 'Vela NGK C7HSA — 8.000 km', body: 'Gap 0,6–0,7mm.' },
  { severity: 'WARN', title: 'Corrente 428H — lubrificar 500 km', body: 'Folga 20–30mm. Kit a cada 15.000 km.' },
  { severity: 'OK', title: 'Filtro de ar — limpar 5.000 km', body: 'Espuma: lavar + secar + óleo.' },
  { severity: 'WARN', title: 'Folga de válvulas — 8.000 km', body: 'Adm 0,05mm / Esc 0,08mm. Motor frio.' },
]

// ─── SUPER CAB 50cc ───────────────────────────────────────────────────────────
// Motor: 49cc 2T monocilíndrico, ar forçado — scooter comercial/delivery
// 6,5 cv @ 6.500 rpm | 0,73 kgf.m @ 6.000 rpm
// Transmissão: CVT (variador automático)
// Pneus: 100/80-10 (frente e trás)
// Tanque: 4,8L | Peso: 84 kg
// Produção: ~1999–2008

const SUPERCAB50_MACETES: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Motor 2T: NUNCA use óleo 4T puro',
    body: 'O motor 2T do SUPER CAB 50cc precisa de lubrificação via mistura gasolina + óleo 2T (proporção 50:1 = 20 mL de óleo 2T por litro de gasolina) OU pela bomba de óleo separada (autolubrificante). Sem essa lubrificação, o motor gripa em minutos. Confirme se o seu tem bomba autolubrificante antes de usar sem misturar.',
  },
  {
    severity: 'OK',
    title: 'CVT: não precisa de ajuste, mas precisa de limpeza',
    body: 'A transmissão CVT automática não tem embreagem manual. Não exige ajuste periódico, mas a cada 20.000 km limpe a caixa do variador: acúmulo de pó da correia desgasta os rolos. Use spray de limpeza de freios (seco). Nunca use graxa ou óleo no variador.',
  },
  {
    severity: 'WARN',
    title: 'Rolos do variador (CVT): troque a cada 20.000 km',
    body: 'Rolos ovalizados causam aceleração irregular, "solavancos" ao sair do ponto e ruído metálico no variador. Rolos padrão para scooter 50cc chinesa: ø15mm × 12mm, peso 6g ou 7g. Preço: R$20–40 o kit.',
  },
  {
    severity: 'OK',
    title: 'Entregador: calibre pneus com carga diariamente',
    body: 'Com baú de carga e entregador: pressão traseira 32–35 PSI. Pneu 100/80-10 murcho rasga lateralmente com cargas pesadas. Calibre no início do expediente. Substituição: pneu com câmara 100/80-10 (marca CST ou Pirelli para scooter 10").',
  },
  {
    severity: 'OK',
    title: 'Bico do carburador (2T): limpe a agulha de corte de combustível',
    body: 'Carburadores de scooter 2T entopem com goma de combustível velho. Esvazie o tanque ao parar por mais de 30 dias. Limpe o carburador com spray carburador + palito fino. Jato principal: #68–72 para altitude até 500m.',
  },
]

const SUPERCAB50_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Superaquecimento: motor 2T com pouco óleo gripa sem aviso',
    body: 'Motor 2T sem lubrificação adequada gripa (pisão prende no cilindro) sem sinais prévios. Custo de reparo: R$300–600 (retífica + jogo de pistão). Sempre verifique o nível do reservatório de óleo 2T antes de usar, se o modelo for autolubrificante.',
  },
  {
    severity: 'WARN',
    title: 'Correia do CVT: trocar antes de arrebentar',
    body: 'Correia partida = scooter na mão. A cada 25.000–30.000 km ou se ouvir ranger/vibrar no CVT, substitua preventivamente. Correia universal para scooter 50cc (tipo 669/18/30 ou similar) custa R$30–60.',
  },
  {
    severity: 'WARN',
    title: 'Freio dianteiro hidráulico: pastilha desgasta rápido em uso comercial',
    body: 'Entregador com SUPER CAB carregado: pastilhas dianteiras duram ~8.000–12.000 km. Disco com abaixo de 1mm de espessura na pastilha = risco de metal-metal. Inspecione mensalmente se uso for intenso.',
  },
  {
    severity: 'WARN',
    title: 'Vela 2T: fuligem é normal, mas excesso indica problema',
    body: 'Vela de motor 2T tem depósito de carbono normal (eletrodo preto). Se estiver MUITO grossa (eletrodo coberto): mistura rica demais ou óleo 2T de baixa qualidade. Use óleo 2T sintético ou semissintético de boa marca (Motul, Bardahl). Vela: NGK B7HS, gap 0,6–0,7mm.',
  },
]

const SUPERCAB50_MANUTENCAO: TipInput[] = [
  { severity: 'DANGER', title: 'Óleo 2T — verificar nível DIARIAMENTE', body: 'Se autolubrificante: reservatório sempre acima do mínimo. Se mistura manual: 20mL de óleo 2T por litro de gasolina (50:1). Use óleo 2T JASO FC ou FD.' },
  { severity: 'OK', title: 'Vela NGK B7HS — 6.000 km', body: 'Gap 0,6–0,7mm. Motor 2T: vela suja mais rápido que 4T. Inspecionar a cada 3.000 km.' },
  { severity: 'WARN', title: 'Correia CVT — inspecionar 20.000 km, trocar 30.000 km', body: 'Correia 669/18/30 (verifique medidas do seu modelo). Troca preventiva evita quebra inesperada.' },
  { severity: 'OK', title: 'Rolos do variador (ø15×12mm, 6–7g) — 20.000 km', body: 'Rolos ovalizados causam aceleração irregular. Kit R$20–40.' },
  { severity: 'WARN', title: 'Fluido de freio DOT 4 — 2 anos ou 15.000 km', body: 'Freio dianteiro hidráulico. DOT 4 é higroscópico: troque bienalmente.' },
  { severity: 'OK', title: 'Pneus 100/80-10 — calibrar semanalmente', body: 'Solo: F 25 / R 28 PSI. Com carga: F 25 / R 32 PSI.' },
  { severity: 'OK', title: 'Caixa do variador — limpar 20.000 km', body: 'Spray de freios (seco). Remover pó da correia. Nunca usar óleo ou graxa.' },
]

// ─── SUPER CAB 100cc ──────────────────────────────────────────────────────────
// Motor: 97–100cc OHC 4T monocilíndrico, ar — versão "grande" do SUPER CAB comercial
// CVT automático, scooter para entrega
// Produção: ~1999–2008

const SUPERCAB100_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 4T: óleo 20W-50 JASO MA, ~0,8L',
    body: 'A versão 100cc do SUPER CAB tem motor 4T (diferente da versão 50cc, que é 2T). Use 20W-50 JASO MA. Troca a cada 3.000 km. Nunca use JASO MB. Capacidade: ~0,8L.',
  },
  {
    severity: 'OK',
    title: 'Vela: NGK C7HSA para motores 4T 100cc CUB',
    body: 'Motor 97–100cc OHC 4T. Vela NGK C7HSA, gap 0,6–0,7mm. Mesma vela de qualquer cub 110cc nacional (Honda Pop 100, Shineray 100, etc.).',
  },
  {
    severity: 'WARN',
    title: 'CVT 4T: rolos e correia mesmos critérios da versão 50cc',
    body: 'A transmissão CVT da versão 100cc usa rolos e correia similares à versão 50cc. Inspecione e troque conforme desgaste. Preferência por rolos de peso ligeiramente maior (7–8g) para melhor resposta na arrancada com carga.',
  },
]

const SUPERCAB100_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Modelo raro: peças específicas são difíceis',
    body: 'O SUPER CAB 100cc foi vendido em número limitado. Carenagens e painéis específicos são raros. Motor, corrente e vela: compatíveis com motos CUB 100cc genéricas (Honda Pop 100 tem muitas peças intercambiáveis).',
  },
  {
    severity: 'WARN',
    title: 'Baú de carga: peso extra sobrecarrega suspensão traseira',
    body: 'Uso comercial intenso (>40 kg de carga diária): amortecedor traseiro dura 20.000–30.000 km. Troque por amortecedor universal reforçado (mola mais rígida). Preço: R$80–150 o par.',
  },
]

const SUPERCAB100_MANUTENCAO: TipInput[] = [
  { severity: 'WARN', title: 'Óleo 20W-50 JASO MA — 3.000 km', body: 'Motor 100cc OHC 4T. Capacidade: ~0,8L.' },
  { severity: 'OK', title: 'Vela NGK C7HSA — 8.000 km', body: 'Gap 0,6–0,7mm.' },
  { severity: 'WARN', title: 'Correia CVT — inspecionar 20.000 km, trocar 30.000 km', body: 'Troca preventiva evita quebra.' },
  { severity: 'OK', title: 'Rolos do variador — 20.000 km', body: 'Ovalizados = aceleração irregular.' },
  { severity: 'WARN', title: 'Fluido de freio DOT 4 — 2 anos', body: 'Freio dianteiro hidráulico.' },
  { severity: 'WARN', title: 'Folga de válvulas — 8.000 km', body: 'Adm 0,05 / Esc 0,08mm. Motor frio.' },
]

// ─── Blocos ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'WIN 110',
    yearFrom: 2009, yearTo: 2014,
    MACETES: WIN110_MACETES,
    PROBLEMAS: WIN110_PROBLEMAS,
    MANUTENCAO: WIN110_MANUTENCAO,
  },
  {
    modelName: 'MIDAS FX 110cc',
    yearFrom: 2003, yearTo: 2008,
    MACETES: MIDAS_MACETES,
    PROBLEMAS: MIDAS_PROBLEMAS,
    MANUTENCAO: MIDAS_MANUTENCAO,
  },
  {
    modelName: 'MAGIK 125cc',
    yearFrom: 2002, yearTo: 2008,
    MACETES: MAGIK_MACETES,
    PROBLEMAS: MAGIK_PROBLEMAS,
    MANUTENCAO: MAGIK_MANUTENCAO,
  },
  {
    modelName: 'ERO PLUS 125cc',
    yearFrom: 1999, yearTo: 2006,
    MACETES: ERO_MACETES,
    PROBLEMAS: ERO_PROBLEMAS,
    MANUTENCAO: ERO_MANUTENCAO,
  },
  {
    modelName: 'SUPER CAB 50cc',
    yearFrom: 1999, yearTo: 2008,
    MACETES: SUPERCAB50_MACETES,
    PROBLEMAS: SUPERCAB50_PROBLEMAS,
    MANUTENCAO: SUPERCAB50_MANUTENCAO,
  },
  {
    modelName: 'SUPER CAB 100cc',
    yearFrom: 1999, yearTo: 2008,
    MACETES: SUPERCAB100_MACETES,
    PROBLEMAS: SUPERCAB100_PROBLEMAS,
    MANUTENCAO: SUPERCAB100_MANUTENCAO,
  },
]

// ─── Calibragens ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'WIN 110',
    yearFrom: 2009, yearTo: 2014,
    tireSize: '2.75/18 (F) · 90/90-18 (R)',
    frontPsi: 26, rearPsi: 28,
    frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Solo: F 26 / R 28 PSI. Com carona: F 26 / R 33 PSI. Câmara padrão (não tubeless). Calibre semanalmente. Pneus recomendados: Pirelli Sport Demon 2.75-18 (F) / 90/90-18 (R) ou Metzeler ME77.',
  },
  {
    modelName: 'MIDAS FX 110cc',
    yearFrom: 2003, yearTo: 2008,
    tireSize: '2.75/18 (F) · 90/90-18 (R)',
    frontPsi: 26, rearPsi: 28,
    frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Solo: F 26 / R 28 PSI. Com carona: F 26 / R 33 PSI. Padrão CUB 110cc.',
  },
  {
    modelName: 'MAGIK 125cc',
    yearFrom: 2002, yearTo: 2008,
    tireSize: '80/100-18 (F) · 90/90-18 (R)',
    frontPsi: 26, rearPsi: 28,
    frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Solo: F 26 / R 28 PSI. Com carona: F 26 / R 33 PSI. Perfil sport com câmara.',
  },
  {
    modelName: 'ERO PLUS 125cc',
    yearFrom: 1999, yearTo: 2006,
    tireSize: '2.75/18 (F) · 90/90-18 (R)',
    frontPsi: 26, rearPsi: 28,
    frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Solo: F 26 / R 28 PSI. Com carona: F 26 / R 33 PSI. Padrão CUB 125cc.',
  },
  {
    modelName: 'SUPER CAB 50cc',
    yearFrom: 1999, yearTo: 2008,
    tireSize: '100/80-10 (F) · 100/80-10 (R)',
    frontPsi: 25, rearPsi: 28,
    frontPsiLoad: 25, rearPsiLoad: 33,
    notes: 'Solo: F 25 / R 28 PSI. Com carga (baú + mercadoria): F 25 / R 32–35 PSI. Aro 10" com câmara. Scooter de entrega: calibre DIARIAMENTE.',
  },
  {
    modelName: 'SUPER CAB 100cc',
    yearFrom: 1999, yearTo: 2008,
    tireSize: '100/80-10 (F) · 100/80-10 (R)',
    frontPsi: 25, rearPsi: 28,
    frontPsiLoad: 25, rearPsiLoad: 33,
    notes: 'Solo: F 25 / R 28 PSI. Com carga: F 25 / R 33 PSI. Scooter de entrega: calibre DIARIAMENTE.',
  },
]

// ─── Manutenção ───────────────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // WIN 110
  { modelName: 'WIN 110', yearFrom: 2009, yearTo: 2014, component: 'Óleo 20W-50 JASO MA (0,9L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 109cc OHC. Mineral. Nunca JASO MB.', priority: 'HIGH', order: 1 },
  { modelName: 'WIN 110', yearFrom: 2009, yearTo: 2014, component: 'Vela NGK C7HSA (gap 0,6–0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Inspecionar a cada 5.000 km. Torque 10–12 Nm.', priority: 'MEDIUM', order: 2 },
  { modelName: 'WIN 110', yearFrom: 2009, yearTo: 2014, component: 'Lubrificação corrente 428H', intervalKm: 500, intervalMonths: null, notes: 'Folga 20–30mm. Spray corrente ou 80W-90.', priority: 'HIGH', order: 3 },
  { modelName: 'WIN 110', yearFrom: 2009, yearTo: 2014, component: 'Filtro de ar (espuma) — limpeza', intervalKm: 5000, intervalMonths: 12, notes: 'Querosene + secar + óleo leve.', priority: 'MEDIUM', order: 4 },
  { modelName: 'WIN 110', yearFrom: 2009, yearTo: 2014, component: 'Folga de válvulas (adm 0,05 / esc 0,08mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio. Parafuso + contra-porca.', priority: 'HIGH', order: 5 },
  { modelName: 'WIN 110', yearFrom: 2009, yearTo: 2014, component: 'Kit relação 428H (pinhão 15T + coroa 39T + corrente)', intervalKm: 15000, intervalMonths: null, notes: 'Trocar kit completo.', priority: 'HIGH', order: 6 },
  { modelName: 'WIN 110', yearFrom: 2009, yearTo: 2014, component: 'Pastilha freio dianteiro / lona traseira', intervalKm: 8000, intervalMonths: 12, notes: 'Pastilha < 1,5mm = troca. Lona < 2mm = troca.', priority: 'MEDIUM', order: 7 },
  { modelName: 'WIN 110', yearFrom: 2009, yearTo: 2014, component: 'Verificação retificador e tensão (13,5–14,5V)', intervalKm: null, intervalMonths: 12, notes: '@ 3.500 rpm com multímetro.', priority: 'MEDIUM', order: 8 },
  { modelName: 'WIN 110', yearFrom: 2009, yearTo: 2014, component: 'Limpeza carburador VM22/PZ22', intervalKm: 10000, intervalMonths: 12, notes: 'Spray carburador + palito fino nos orifícios. Nível de boia: ~15mm.', priority: 'MEDIUM', order: 9 },

  // MIDAS FX 110cc
  { modelName: 'MIDAS FX 110cc', yearFrom: 2003, yearTo: 2008, component: 'Óleo 20W-50 JASO MA (0,9L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 110cc OHC. Tela de óleo — limpar ao trocar.', priority: 'HIGH', order: 1 },
  { modelName: 'MIDAS FX 110cc', yearFrom: 2003, yearTo: 2008, component: 'Vela NGK C7HSA (gap 0,6–0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Inspecionar a cada 5.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'MIDAS FX 110cc', yearFrom: 2003, yearTo: 2008, component: 'Lubrificação corrente 428H', intervalKm: 500, intervalMonths: null, notes: 'Folga 20–30mm.', priority: 'HIGH', order: 3 },
  { modelName: 'MIDAS FX 110cc', yearFrom: 2003, yearTo: 2008, component: 'Filtro de ar — limpeza', intervalKm: 5000, intervalMonths: 12, notes: 'Espuma: querosene + secar + óleo fino.', priority: 'MEDIUM', order: 4 },
  { modelName: 'MIDAS FX 110cc', yearFrom: 2003, yearTo: 2008, component: 'Folga de válvulas (adm 0,05 / esc 0,08mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio.', priority: 'HIGH', order: 5 },

  // MAGIK 125cc
  { modelName: 'MAGIK 125cc', yearFrom: 2002, yearTo: 2008, component: 'Óleo 20W-50 JASO MA (0,9–1,0L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 124cc OHC.', priority: 'HIGH', order: 1 },
  { modelName: 'MAGIK 125cc', yearFrom: 2002, yearTo: 2008, component: 'Vela NGK C7HSA (gap 0,6–0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Inspecionar a cada 5.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'MAGIK 125cc', yearFrom: 2002, yearTo: 2008, component: 'Lubrificação corrente 428H', intervalKm: 500, intervalMonths: null, notes: 'Folga 20–30mm.', priority: 'HIGH', order: 3 },
  { modelName: 'MAGIK 125cc', yearFrom: 2002, yearTo: 2008, component: 'Filtro de ar — limpeza', intervalKm: 5000, intervalMonths: 12, notes: 'Espuma: querosene + secar + óleo fino.', priority: 'MEDIUM', order: 4 },
  { modelName: 'MAGIK 125cc', yearFrom: 2002, yearTo: 2008, component: 'Folga de válvulas (adm 0,05 / esc 0,08mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio.', priority: 'HIGH', order: 5 },
  { modelName: 'MAGIK 125cc', yearFrom: 2002, yearTo: 2008, component: 'Bateria YB5L-B — verificar', intervalKm: null, intervalMonths: 12, notes: '12,4V+ em repouso. Carga completa antes do inverno.', priority: 'MEDIUM', order: 6 },

  // ERO PLUS 125cc
  { modelName: 'ERO PLUS 125cc', yearFrom: 1999, yearTo: 2006, component: 'Óleo 20W-50 JASO MA (0,9L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 124cc OHC.', priority: 'HIGH', order: 1 },
  { modelName: 'ERO PLUS 125cc', yearFrom: 1999, yearTo: 2006, component: 'Vela NGK C7HSA (gap 0,6–0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Inspecionar a cada 5.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'ERO PLUS 125cc', yearFrom: 1999, yearTo: 2006, component: 'Lubrificação corrente 428H', intervalKm: 500, intervalMonths: null, notes: 'Folga 20–30mm.', priority: 'HIGH', order: 3 },
  { modelName: 'ERO PLUS 125cc', yearFrom: 1999, yearTo: 2006, component: 'Filtro de ar — limpeza', intervalKm: 5000, intervalMonths: 12, notes: 'Espuma: querosene + secar + óleo leve.', priority: 'MEDIUM', order: 4 },
  { modelName: 'ERO PLUS 125cc', yearFrom: 1999, yearTo: 2006, component: 'Folga de válvulas (adm 0,05 / esc 0,08mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio.', priority: 'HIGH', order: 5 },

  // SUPER CAB 50cc
  { modelName: 'SUPER CAB 50cc', yearFrom: 1999, yearTo: 2008, component: 'Óleo 2T JASO FC/FD — verificar nível diário', intervalKm: null, intervalMonths: null, notes: 'Autolubrificante: reservatório acima do mínimo. Mistura manual: 20mL/litro de gasolina (50:1).', priority: 'CRITICAL', order: 1 },
  { modelName: 'SUPER CAB 50cc', yearFrom: 1999, yearTo: 2008, component: 'Vela NGK B7HS (gap 0,6–0,7mm)', intervalKm: 6000, intervalMonths: null, notes: 'Motor 2T: vela suja mais rápido. Inspecionar a cada 3.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'SUPER CAB 50cc', yearFrom: 1999, yearTo: 2008, component: 'Correia CVT (669/18/30 ou equiv.)', intervalKm: 30000, intervalMonths: null, notes: 'Troca preventiva. Não aguardar arrebentar.', priority: 'HIGH', order: 3 },
  { modelName: 'SUPER CAB 50cc', yearFrom: 1999, yearTo: 2008, component: 'Rolos variador (ø15×12mm, 6–7g)', intervalKm: 20000, intervalMonths: null, notes: 'Ovalizados = aceleração irregular e solavancos.', priority: 'MEDIUM', order: 4 },
  { modelName: 'SUPER CAB 50cc', yearFrom: 1999, yearTo: 2008, component: 'Fluido de freio DOT 4 (freio diant.)', intervalKm: 15000, intervalMonths: 24, notes: 'Troca bienal obrigatória.', priority: 'HIGH', order: 5 },
  { modelName: 'SUPER CAB 50cc', yearFrom: 1999, yearTo: 2008, component: 'Pastilha freio dianteiro + lona traseira', intervalKm: 8000, intervalMonths: 12, notes: 'Uso de entrega: inspecionar mensalmente.', priority: 'HIGH', order: 6 },
  { modelName: 'SUPER CAB 50cc', yearFrom: 1999, yearTo: 2008, component: 'Limpeza caixa variador (CVT)', intervalKm: 20000, intervalMonths: null, notes: 'Spray de freios (seco). Nunca óleo ou graxa no variador.', priority: 'MEDIUM', order: 7 },

  // SUPER CAB 100cc
  { modelName: 'SUPER CAB 100cc', yearFrom: 1999, yearTo: 2008, component: 'Óleo 20W-50 JASO MA (0,8L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 100cc OHC 4T.', priority: 'HIGH', order: 1 },
  { modelName: 'SUPER CAB 100cc', yearFrom: 1999, yearTo: 2008, component: 'Vela NGK C7HSA (gap 0,6–0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Inspecionar a cada 5.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'SUPER CAB 100cc', yearFrom: 1999, yearTo: 2008, component: 'Correia CVT', intervalKm: 30000, intervalMonths: null, notes: 'Troca preventiva.', priority: 'HIGH', order: 3 },
  { modelName: 'SUPER CAB 100cc', yearFrom: 1999, yearTo: 2008, component: 'Rolos variador', intervalKm: 20000, intervalMonths: null, notes: 'Inspecionar ovalizações.', priority: 'MEDIUM', order: 4 },
  { modelName: 'SUPER CAB 100cc', yearFrom: 1999, yearTo: 2008, component: 'Folga de válvulas (adm 0,05 / esc 0,08mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio.', priority: 'HIGH', order: 5 },
  { modelName: 'SUPER CAB 100cc', yearFrom: 1999, yearTo: 2008, component: 'Fluido de freio DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'Freio dianteiro hidráulico.', priority: 'HIGH', order: 6 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Kasinski Commuter (WIN 110, MIDAS FX, MAGIK, ERO PLUS, SUPER CAB)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'KASINSKI', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'KASINSKI', vehicleTypeId: motoType.id },
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

  console.log('✅ Kasinski Commuter concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
