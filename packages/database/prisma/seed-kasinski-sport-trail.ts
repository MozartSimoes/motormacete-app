// seed-kasinski-sport-trail.ts — Kasinski GF 125 SPEED, CRUISE 125, CRUISE II 125, FÚRIA 250cc, RX 125
// Modelos esportivos e trail Kasinski baseados em motores Hyosung GF125 e V-twin 249cc
// GF 125 SPEED / CRUISE 125 / CRUISE II 125: motor Hyosung GF125, 124cc OHC ar+óleo, 14–14,5 cv
// FÚRIA 250cc: motor Hyosung 249cc V-twin DOHC, ~30 cv (pré-cursor do COMET/MIRAGE 250)
// RX 125: motor Hyosung RX125, 124cc 4T trail/enduro, 12 cv, suspensão off-road
// Execute: pnpm --filter @motormacete/database db:seed:kasinski-sport-trail
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

// ─── GF 125 SPEED ─────────────────────────────────────────────────────────────
// Motor: Hyosung GF125 — 124cc OHC 4V monocilíndrico, ar + óleo
// 14,5 cv @ 8.500 rpm | 1,0 kgf.m @ 7.500 rpm | Câmbio: 5 marchas
// Partida: elétrica + pedal | Vela: NGK CR7E (gap 0,7–0,8mm)
// Óleo: 10W-40 JASO MA, ~1,0–1,2L | Corrente: 428H
// Produção: ~2002–2006 — motor GF125 = base da Hyosung, superior ao motor chinês

const GF125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor Hyosung GF125: superior aos motores chineses genéricos',
    body: 'A GF 125 SPEED usa o motor Hyosung GF125 — 124cc OHC 4 válvulas, refrigerado a ar e óleo. É significativamente mais potente (~14,5 cv) e refinado que os motores CUB 125cc genéricos (~9 cv). Requer manutenção mais cuidadosa: óleo 10W-40 JASO MA (NÃO 20W-50).',
  },
  {
    severity: 'WARN',
    title: 'Óleo: 10W-40 JASO MA — NÃO use 20W-50',
    body: 'Motor Hyosung GF125 requer 10W-40 JASO MA (semissintético ideal). NÃO use 20W-50 que é comum em CUBs 125cc — o GF125 tem folgas menores e trabalha em rotações mais altas (até 10.000 rpm). Capacidade: ~1,0L sem filtro, ~1,2L com filtro. Troca a cada 5.000 km.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR7E (gap 0,7–0,8mm) — superior ao C7HSA',
    body: 'Motor de alto desempenho: use NGK CR7E resistida (gap 0,7–0,8mm), NÃO a C7HSA comum dos CUBs. A resistência elétrica protege a eletrônica do CDI Hyosung. Iridium CR7HIX dura 20.000 km. Torque de aperto: 12–15 Nm.',
  },
  {
    severity: 'OK',
    title: '14,5 cv: explore melhor com ajuste de carburador correto',
    body: 'O motor GF125 usa carburador PB18F com jato principal #108–112. Síntoma de jato gordo: fumaça preta, consumo alto. Para altitude acima de 1.000m, reduza o jato #2–4 números. Limpeza do carburador a cada 10.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Compatibilidade com CRUISE 125 e CRUISE II 125: peças de motor são iguais',
    body: 'GF 125 SPEED, CRUISE 125 e CRUISE II 125 compartilham o mesmo motor Hyosung GF125. Filtro de óleo, vela, kit de embreagem, válvulas e corrente são intercambiáveis. Lojas de Hyosung têm essas peças — pesquise como "Hyosung GF125" ou "Kasinski Cruise 125".',
  },
  {
    severity: 'OK',
    title: 'Retificador/regulador: ponto de atenção em qualquer Hyosung',
    body: 'A eletrônica Hyosung tem o retificador como ponto fraco. Meça tensão: 13,5–14,5V @ 4.000 rpm. Se estiver fora dessa faixa, substitua o retificador antes de queimar CDI ou bobina. Custo de preventiva: R$80–150. Custo de dano em CDI: R$200–400.',
  },
]

const GF125_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Retificador/regulador: causa número 1 de parada na estrada',
    body: 'O retificador Hyosung do GF125 tem vida útil de 30.000–50.000 km em climas quentes brasileiros. Quando falha, drena a bateria rapidamente. Sintoma: moto anda bem mas morre sem aviso, bateria não carrega. Substitua preventivamente aos 40.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pelo retentor da tampa de inspeção de válvulas',
    body: 'Motores GF125 mais antigos podem vazar óleo pela tampa do cabeçote. Junta toridal (O-ring) da tampa de inspeção endurece. Troque o O-ring (R$5–10) e resolva o vazamento antes que cause consumo de óleo e mancha no motor.',
  },
  {
    severity: 'WARN',
    title: 'Carburador: acúmulo de verniz com gasolina velha',
    body: 'Se ficar parada por mais de 30 dias com gasolina no tanque, o carburador acumula verniz (goma). Esvazie o carburador parando o motor com a torneira de combustível fechada. Sintoma de goma: motor que não acelera acima de 4.000 rpm.',
  },
  {
    severity: 'WARN',
    title: 'Peças Hyosung GF125: disponíveis em lojas especializadas',
    body: 'Diferente dos CUBs chineses, o GF125 não usa peças "universais" de 125cc. Filtro de óleo (Hiflofiltro HF153 ou equivalente), vela CR7E e corrente 428H são específicos. Lojas de Hyosung/Kasinski e importadoras de peças coreanas atendem.',
  },
]

const GF125_MANUTENCAO: TipInput[] = [
  { severity: 'WARN', title: 'Óleo 10W-40 JASO MA (1,0–1,2L) — 5.000 km ou 6 meses', body: 'Motor Hyosung GF125. Semissintético 10W-40. Nunca 20W-50. Troca de filtro: +0,2L.' },
  { severity: 'OK', title: 'Vela NGK CR7E (gap 0,7–0,8mm) — 10.000 km', body: 'Inspecionar 5.000 km. Iridium CR7HIX: 20.000 km. Torque 12–15 Nm.' },
  { severity: 'WARN', title: 'Lubrificação corrente 428H — 500 km', body: 'Folga 20–30mm. Spray corrente ou 80W-90.' },
  { severity: 'OK', title: 'Filtro de ar — limpar 5.000 km', body: 'Espuma: querosene + secar + óleo fino.' },
  { severity: 'WARN', title: 'Folga de válvulas (adm 0,05 / esc 0,08mm) — 10.000 km', body: 'Motor 4V Hyosung. Motor frio obrigatório.' },
  { severity: 'DANGER', title: 'Verificação retificador/regulador — anual', body: '13,5–14,5V @ 4.000 rpm. Substituição preventiva aos 40.000 km.' },
  { severity: 'OK', title: 'Filtro de óleo — 10.000 km', body: 'Hiflofiltro HF153 ou equivalente. Aplicar óleo no O-ring.' },
  { severity: 'OK', title: 'Fluido de freio DOT 4 — 2 anos', body: 'Bienal obrigatório.' },
]

// ─── CRUISE 125 ───────────────────────────────────────────────────────────────
// Motor: Hyosung GF125 — 124cc OHC 4V, ar+óleo, 14 cv @ 8.500 rpm
// Estilo: custom cruiser | Tanque: 14L | Peso: 131 kg seco
// Correia/Corrente: corrente 428H | Produção: ~1999–2008

const CRUISE125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesmo motor GF125 que a GF 125 SPEED: idêntica manutenção de motor',
    body: 'CRUISE 125 e GF 125 SPEED compartilham o motor Hyosung GF125. Toda manutenção de motor é idêntica: óleo 10W-40 JASO MA ~1,0–1,2L, vela NGK CR7E gap 0,7–0,8mm, folga válvulas adm 0,05/esc 0,08mm.',
  },
  {
    severity: 'OK',
    title: 'Posição cruiser: banco baixo, guidão alto — confortável para cidades',
    body: 'A posição de pilotagem relaxada da CRUISE 125 é ótima para tráfego urbano. Para viagens longas, o banco original é firme — considere capa de selim com espuma de gel (R$60–100) para mais conforto.',
  },
  {
    severity: 'WARN',
    title: 'Tanque grande (14L): cuidado ao abastecer — transbordamento queima verniz',
    body: 'O tanque de 14L é generoso. Ao abastecer, não encha até a borda — a expansão térmica da gasolina pode fazer transbordar, manchando o tanque. Encha até 1 cm abaixo do bocal.',
  },
  {
    severity: 'WARN',
    title: 'Pneus perfil cruiser: 90/90-19 dianteiro e 130/90-15 traseiro',
    body: 'Tamanhos menos comuns que pneus de esportivas. Marcas com boa disponibilidade: Pirelli Sport Demon (90/90-19 e 130/90-15) ou Metzeler ME77. Verifique a disponibilidade no mercado local antes de precisar trocar.',
  },
  {
    severity: 'OK',
    title: 'Retificador Hyosung: o mesmo ponto fraco da GF 125 SPEED',
    body: 'O retificador da CRUISE 125 é o mesmo componente crítico da família GF125. Mida tensão: 13,5–14,5V @ 4.000 rpm. Substitua preventivamente aos 40.000 km. Evita problema inesperado na estrada.',
  },
]

const CRUISE125_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Retificador: a falha mais comum nos anos de uso',
    body: 'Com 30.000–50.000 km, o retificador Hyosung da CRUISE 125 costuma falhar. Sintoma: moto não carrega bateria, morre no trânsito, bateria esgota rapidamente. Troque preventivamente e mantenha um retificador reserva na garagem.',
  },
  {
    severity: 'WARN',
    title: 'Corrente e pinhão: desgaste pode ser acelerado pelo peso da moto',
    body: 'A CRUISE 125 pesa 131 kg seco — mais pesada que outras 125cc. Isso acelera o desgaste da corrente e pinhão. Lubrifique com DID 428H ou RK 428H com O-ring para maior durabilidade. Kit completo a cada 15.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Banco baixo: cuidado com estradas esburacadas',
    body: 'O banco baixo e a suspensão cruiser da CRUISE 125 não são ideais para estradas ruins. Em buracos fundos, o banco pode bater no conjunto traseiro. Em viagens por estradas precárias, reduza a velocidade e antecipe obstáculos.',
  },
  {
    severity: 'WARN',
    title: 'Carburador PB18: limpeza frequente evita engasgos',
    body: 'O carburador PB18F da CRUISE 125 é sensível à qualidade da gasolina. Com gasolina adulterada ou muito etanol (E25 em excesso), pode engordar a mistura. Limpeza a cada 10.000 km. Jato principal: #108–112.',
  },
]

const CRUISE125_MANUTENCAO: TipInput[] = [
  { severity: 'WARN', title: 'Óleo 10W-40 JASO MA (1,0–1,2L) — 5.000 km', body: 'Motor Hyosung GF125. Semissintético 10W-40 JASO MA.' },
  { severity: 'OK', title: 'Vela NGK CR7E (gap 0,7–0,8mm) — 10.000 km', body: 'Inspecionar 5.000 km. Iridium CR7HIX: 20.000 km.' },
  { severity: 'WARN', title: 'Lubrificação corrente 428H — 500 km', body: 'Folga 20–30mm. Moto pesada: use corrente 428H com O-ring (DID/RK).' },
  { severity: 'OK', title: 'Filtro de ar — limpar 5.000 km', body: 'Espuma: querosene + secar + óleo fino.' },
  { severity: 'WARN', title: 'Folga de válvulas (adm 0,05 / esc 0,08mm) — 10.000 km', body: 'Motor GF125 4V. Motor frio.' },
  { severity: 'DANGER', title: 'Retificador/regulador — verificar anual, trocar preventivo 40.000 km', body: '13,5–14,5V @ 4.000 rpm. Ponto de falha #1.' },
  { severity: 'OK', title: 'Filtro de óleo (Hiflofiltro HF153) — 10.000 km', body: 'Aplicar óleo no O-ring ao montar.' },
  { severity: 'WARN', title: 'Fluido de freio DOT 4 — 2 anos', body: 'Bienal. Freio dianteiro hidráulico.' },
  { severity: 'WARN', title: 'Kit relação 428H — 15.000 km', body: 'Moto pesada: preferência por corrente com O-ring.' },
]

// ─── CRUISE II 125 ────────────────────────────────────────────────────────────
// Motor: Hyosung GF125 — mesma base que CRUISE 125, com atualizações visuais
// Estilo: cruiser atualizado | Produção: ~2003–2008

const CRUISE2_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'CRUISE II 125: evolução do CRUISE 125 — mesma mecânica',
    body: 'A CRUISE II 125 é a versão atualizada do CRUISE 125 com melhorias estéticas. O motor Hyosung GF125 é o mesmo. Toda manutenção é idêntica: óleo 10W-40 JASO MA, vela NGK CR7E gap 0,7–0,8mm, retificador = ponto crítico.',
  },
  {
    severity: 'OK',
    title: 'Diferenças estéticas: tanque, farol e painel podem ser diferentes',
    body: 'A CRUISE II tem visual diferente do CRUISE 125 original — farol oval, tanque com alargador, painel atualizado. Peças estéticas são intercambiáveis apenas dentro da mesma geração. Mecânica: 100% igual.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio de 5 marchas: use sempre a 5ª em velocidades acima de 80 km/h',
    body: 'A 5ª marcha longa é para cruzeiro estradeiro. Em cidade, a 4ª é suficiente para a maioria das situações. Nunca force o câmbio sem apertar a embreagem completamente — os garfos de câmbio são frágeis em motos de médio porte.',
  },
  {
    severity: 'WARN',
    title: 'Freio traseiro: tambor com acionamento mecânico por pedal',
    body: 'Lona de freio traseiro por tambor. Ajuste o cabo do freio traseiro para manter curso do pedal entre 20–30mm. Lona desgastada além de 2mm de espessura = troca urgente. Com embreagem e freio em dia, a moto para bem.',
  },
]

const CRUISE2_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Retificador: mesmo ponto crítico do CRUISE 125',
    body: 'Idêntico ao problema do CRUISE 125. Substitua preventivamente aos 40.000 km. Meça tensão: 13,5–14,5V @ 4.000 rpm. Falha deixa moto na mão.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pelo vedador do eixo de saída',
    body: 'Em exemplares mais velhos (2003–2008), o retentor do eixo de saída da caixa de câmbio pode vazar. Sintoma: mancha de óleo embaixo da moto, lado do pinhão. Peça: retentor ø25mm × ø40mm × 8mm (verifique no desmanche).',
  },
  {
    severity: 'WARN',
    title: 'Partida difícil no frio: enrichecedor pode estar com vedação ruim',
    body: 'O starter/enrichecedor do carburador PB18 pode vazar ar em exemplares velhos. Sintoma: não enriquece a mistura a frio mesmo com starter aberto. Substituição do conjunto do enrichecedor ou carburador completo.',
  },
]

const CRUISE2_MANUTENCAO: TipInput[] = [
  { severity: 'WARN', title: 'Óleo 10W-40 JASO MA (1,0–1,2L) — 5.000 km', body: 'Motor Hyosung GF125. Idêntico ao CRUISE 125.' },
  { severity: 'OK', title: 'Vela NGK CR7E (gap 0,7–0,8mm) — 10.000 km', body: 'Inspecionar 5.000 km.' },
  { severity: 'WARN', title: 'Lubrificação corrente 428H — 500 km', body: 'Folga 20–30mm.' },
  { severity: 'OK', title: 'Filtro de ar — limpar 5.000 km', body: 'Espuma: querosene + secar + óleo fino.' },
  { severity: 'WARN', title: 'Folga de válvulas (adm 0,05 / esc 0,08mm) — 10.000 km', body: 'Motor GF125 4V. Motor frio.' },
  { severity: 'DANGER', title: 'Retificador/regulador — verificar anual, trocar preventivo 40.000 km', body: '13,5–14,5V @ 4.000 rpm. Ponto de falha #1.' },
  { severity: 'WARN', title: 'Fluido de freio DOT 4 — 2 anos', body: 'Bienal. Freio dianteiro hidráulico.' },
  { severity: 'OK', title: 'Kit relação 428H — 15.000 km', body: 'Trocar kit completo.' },
]

// ─── FÚRIA 250cc ──────────────────────────────────────────────────────────────
// Motor: Hyosung 249cc V-twin DOHC, ar + óleo, ~30 cv
// Alimentação: 2× carburadores Mikuni BDS26 | Câmbio: 5 marchas
// Embreagem: multi-disco banhada a óleo
// Precursor do COMET 250cc e GV 250 MIRAGE | Produção: ~2002–2006
// NÃO CONFUNDIR com FÚRIA 250cc = basicamente a família V-twin Hyosung em versão naked

const FURIA250_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor V-twin Hyosung 249cc: idêntico ao COMET 250cc e GV 250 MIRAGE',
    body: 'A FÚRIA 250cc usa o mesmo motor 249cc V-twin DOHC Hyosung dos modelos COMET 250cc e GV 250 MIRAGE. Toda manutenção é idêntica: óleo 10W-40 JASO MA 2,0L, velas NGK CR8E ×2 gap 0,7–0,8mm, sincronização dupla de carburadores Mikuni. Consulte também as dicas do COMET 250cc.',
  },
  {
    severity: 'WARN',
    title: 'Dois carburadores Mikuni BDS26: sincronização é manutenção chave',
    body: 'V-twin com carburadores duplos: a sincronização dos dois carbs é ESSENCIAL a cada 10.000 km. Requer vacuômetro duplo. Dessincronizado: motor tremido, consumo alto, resposta irregular. Busque mecânico especializado em Hyosung.',
  },
  {
    severity: 'WARN',
    title: 'Retificador/regulador: ponto de falha crítico — Hyosung V-twin',
    body: 'O retificador é o ponto fraco de qualquer Kasinski/Hyosung V-twin. Mida a tensão: 13,5–14,5V @ 4.000 rpm. Substitua preventivamente aos 40.000 km. Retificador com defeito drena bateria, danifica CDI e bobinas.',
  },
  {
    severity: 'OK',
    title: 'Peças: compatíveis com COMET 250cc e GV 250 MIRAGE',
    body: 'Motor e transmissão: idênticos ao COMET 250cc (esportivo) e GV 250 MIRAGE (cruiser). Filtro de óleo Hiflofiltro HF152, vela CR8E, kit de embreagem, corrente 520 — tudo compatível. Mais fácil de encontrar na família COMET que como "FÚRIA".',
  },
  {
    severity: 'OK',
    title: 'Modelo naked/standard: posição de pilotagem intermediária',
    body: 'A FÚRIA 250cc tem posição de pilotagem mais erguida que o COMET GT (que é mais deitado). Para pilotos de estatura mediana, é um ponto positivo em uso urbano diário. Guidão mais alto reduz cansaço em trânsito parado.',
  },
]

const FURIA250_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Retificador queimado = motor para no meio da estrada',
    body: 'Mesmo problema do COMET 250cc. Retificador Hyosung V-twin falha silenciosamente. Sintoma: bateria não carrega, moto não parte depois de ligar e apagar. Mantenha um retificador reserva ou substitua preventivamente.',
  },
  {
    severity: 'WARN',
    title: 'Acesso ao cilindro traseiro do V-twin: difícil sem remoção de carenagem',
    body: 'A FÚRIA 250cc tem o cilindro traseiro do V-twin em posição difícil. Para troca de vela traseira e ajuste de válvulas traseiras, é necessário remover partes da carenagem/tanque. Planeje a manutenção com tempo.',
  },
  {
    severity: 'WARN',
    title: 'Modelo raro: peças de carroceria muito difíceis de encontrar',
    body: 'A FÚRIA 250cc foi produzida de 2002 a 2006 em volume menor que o COMET e MIRAGE. Peças estéticas (tanque, farol, rabeta) são raras. Motor, transmissão e freios: compatíveis com a família V-twin Hyosung 250cc.',
  },
  {
    severity: 'WARN',
    title: 'Dessincronização dos carburadores: sintoma de vibração em marcha lenta',
    body: 'Motor V-twin com vibração excessiva em tick-over + consumo irregular = carburadores dessincronizados. Requer sincronização com vacuômetro. Mecânicos sem vacuômetro podem "tentar no ouvido" mas o resultado é impreciso.',
  },
]

const FURIA250_MANUTENCAO: TipInput[] = [
  { severity: 'WARN', title: 'Óleo 10W-40 JASO MA (2,0L s/ filtro / 2,2L c/ filtro) — 5.000 km', body: 'Motor V-twin Hyosung 249cc DOHC. Semissintético. Nunca JASO MB.' },
  { severity: 'WARN', title: 'Velas NGK CR8E ×2 (gap 0,7–0,8mm) — 10.000 km', body: 'Sempre trocar em par. Cilindro traseiro: remover carenagem. Iridium CR8EIX: 20.000 km.' },
  { severity: 'WARN', title: 'Lubrificação corrente 520 — 500 km', body: 'Folga 25–35mm. Kit: pinhão 15T + coroa 45T + corrente 520 × 110.' },
  { severity: 'WARN', title: 'Sincronização carburadores duplos Mikuni BDS26 — 10.000 km', body: 'Vacuômetro duplo obrigatório. Mecânico especializado em Hyosung.' },
  { severity: 'WARN', title: 'Folga de válvulas (adm 0,10 / esc 0,15mm) — 10.000 km', body: 'DOHC 4 válvulas/cilindro × 2 cilindros = 8 válvulas. Motor frio.' },
  { severity: 'DANGER', title: 'Retificador/regulador — verificar anual, trocar 40.000 km', body: '13,5–14,5V @ 4.000 rpm. Ponto de falha #1 da família Hyosung.' },
  { severity: 'OK', title: 'Filtro de óleo (Hiflofiltro HF152) — 10.000 km', body: 'Compatível com toda família Hyosung 250cc.' },
  { severity: 'WARN', title: 'Fluido de freio DOT 4 — 2 anos', body: 'Freio dianteiro e traseiro hidráulicos. Purgar das pinças para o reservatório.' },
]

// ─── RX 125 ───────────────────────────────────────────────────────────────────
// Motor: Hyosung RX125 — 124cc OHC 4T monocilíndrico, ar, 12 cv @ 10.300 rpm
// Câmbio: 5 marchas | Trail/enduro leve
// Suspensão dianteira: bengala invertida ø38mm, curso 250mm
// Suspensão traseira: monoamortecedor, 200mm de curso
// Pneus: 80/100-21 (F) × 100/90-18 (R)
// Produção: ~2003–2010 (Hyosung RX125 = Kasinski RX 125 com CKD coreano)

const RX125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor Hyosung RX125: melhor que CUBs 125cc em desempenho off-road',
    body: 'O motor Hyosung RX125 (124cc OHC, 12 cv @ 10.300 rpm) é mais potente que os genéricos 125cc (9 cv). Usa óleo 10W-40 JASO MA (~1,0L), vela NGK CR7E gap 0,7–0,8mm. Não use 20W-50 de CUBs: o motor opera em rotações mais altas.',
  },
  {
    severity: 'OK',
    title: 'Bengala invertida: mais resistente, mas exige óleo de bengala específico',
    body: 'Bengala invertida ø38mm com 250mm de curso. Óleo de bengala: SAE 5W ou ATF leve, ~350mL por tubo. Inspecione os retentores a cada 20.000 km. Bengala invertida absorve melhor os impactos off-road mas exige mais cuidado.',
  },
  {
    severity: 'WARN',
    title: 'Filtro de ar: limpeza obrigatória após cada saída off-road',
    body: 'O filtro de ar do RX 125 em uso off-road deve ser limpo APÓS CADA SAÍDA com lama, areia ou poeira. Motor em alta rotação aspira muito ar — filtro sujo reduz potência e desgasta anéis de pistão.',
  },
  {
    severity: 'OK',
    title: 'Pneus trail misto: calibragem diferente para asfalto e off-road',
    body: 'Pneus 80/100-21 (diant.) e 100/90-18 (tras.). ASFALTO: F 22 / R 25 PSI. OFF-ROAD: F 15–18 / R 20–22 PSI para melhor tração em terra. Sempre recalibre antes de voltar ao asfalto.',
  },
  {
    severity: 'WARN',
    title: 'Corrente 428H: limpeza imediata após trilha com lama',
    body: 'Após qualquer trilha com lama, limpe a corrente com querosene antes de relubricar. Barro seco age como abrasivo e desgasta corrente e coroas em poucos quilômetros.',
  },
  {
    severity: 'OK',
    title: 'Retificador Hyosung: mesmo ponto de atenção de toda a família',
    body: 'Meça tensão: 13,5–14,5V @ 4.000 rpm. Substitua preventivamente aos 40.000 km. Em uso off-road intenso, vibrações podem acelerar o desgaste dos conectores elétricos — verifique periodicamente.',
  },
]

const RX125_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Peças de carroceria Hyosung RX125: difíceis em lojas comuns',
    body: 'Guarda-lamas, números de placa, protetores e carenagens específicos do RX 125 são raros. Lojas especializadas em Hyosung e importadoras são a melhor opção. Motor e transmissão: compatíveis com GF125.',
  },
  {
    severity: 'WARN',
    title: 'Corrente seca em uso off-road: desgaste em 5.000 km',
    body: 'Em off-road pesado sem lubrificação adequada, a corrente do RX 125 dura 5.000–8.000 km. Com lubrificação a cada 300–500 km (spray penetrante para correntes com O-ring), dura 15.000–20.000 km.',
  },
  {
    severity: 'DANGER',
    title: 'Bengala: NUNCA use com retentor vazando',
    body: 'Se o retentor da bengala vazou e há óleo escorrendo, NÃO use a moto até substituir. Óleo na bengala chega ao disco de freio e reduz a frenagem a zero. Retentor para bengala ø38mm (tamanho: verifique para Hyosung RX125).',
  },
  {
    severity: 'WARN',
    title: 'Embreagem: pode escorregar após uso off-road intenso com óleo incorreto',
    body: 'Se a embreagem escorrega (motor acelera mas a moto não avança), troque o óleo por 10W-40 JASO MA. Em uso off-road intenso, trocar o óleo a cada 2.000–3.000 km é recomendável — impurezas entram no óleo mais rápido.',
  },
]

const RX125_MANUTENCAO: TipInput[] = [
  { severity: 'WARN', title: 'Óleo 10W-40 JASO MA (~1,0L) — 3.000 km off-road / 5.000 km asfalto', body: 'Motor Hyosung RX125. Off-road: intervalo mais curto por maior contaminação.' },
  { severity: 'OK', title: 'Vela NGK CR7E (gap 0,7–0,8mm) — 10.000 km', body: 'Inspecionar 5.000 km.' },
  { severity: 'WARN', title: 'Filtro de ar — off-road: após cada trilha / asfalto: 5.000 km', body: 'Espuma: querosene + secar + óleo. VITAL em uso off-road.' },
  { severity: 'WARN', title: 'Lubrificação corrente 428H — 300–500 km (off-road)', body: 'Após trilha: limpar com querosene antes de lubricar. Folga 20–30mm.' },
  { severity: 'WARN', title: 'Folga de válvulas (adm 0,05 / esc 0,08mm) — 8.000 km (off-road: 5.000 km)', body: 'Motor frio. Off-road exige intervalo mais curto.' },
  { severity: 'DANGER', title: 'Retificador/regulador — verificar anual, trocar 40.000 km', body: '13,5–14,5V @ 4.000 rpm.' },
  { severity: 'OK', title: 'Retentor bengala invertida ø38mm — inspecionar 15.000 km', body: 'Vaza óleo = troca imediata. Óleo SAE 5W, ~350mL/tubo.' },
  { severity: 'OK', title: 'Pastilha freio dianteiro + lona traseira — 8.000 km', body: 'Off-road: inspecionar a cada 5.000 km.' },
  { severity: 'OK', title: 'Kit relação 428H — 15.000 km', body: 'Off-road pesado: inspecionar a 10.000 km.' },
]

// ─── Blocos ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'GF 125 SPEED',
    yearFrom: 2002, yearTo: 2006,
    MACETES: GF125_MACETES,
    PROBLEMAS: GF125_PROBLEMAS,
    MANUTENCAO: GF125_MANUTENCAO,
  },
  {
    modelName: 'CRUISE 125',
    yearFrom: 1999, yearTo: 2008,
    MACETES: CRUISE125_MACETES,
    PROBLEMAS: CRUISE125_PROBLEMAS,
    MANUTENCAO: CRUISE125_MANUTENCAO,
  },
  {
    modelName: 'CRUISE II 125',
    yearFrom: 2003, yearTo: 2008,
    MACETES: CRUISE2_MACETES,
    PROBLEMAS: CRUISE2_PROBLEMAS,
    MANUTENCAO: CRUISE2_MANUTENCAO,
  },
  {
    modelName: 'FÚRIA 250cc',
    yearFrom: 2002, yearTo: 2006,
    MACETES: FURIA250_MACETES,
    PROBLEMAS: FURIA250_PROBLEMAS,
    MANUTENCAO: FURIA250_MANUTENCAO,
  },
  {
    modelName: 'RX 125',
    yearFrom: 2003, yearTo: 2010,
    MACETES: RX125_MACETES,
    PROBLEMAS: RX125_PROBLEMAS,
    MANUTENCAO: RX125_MANUTENCAO,
  },
]

// ─── Calibragens ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'GF 125 SPEED',
    yearFrom: 2002, yearTo: 2006,
    tireSize: '100/80-17 (F) · 130/70-17 (R)',
    frontPsi: 29, rearPsi: 33,
    frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Solo: F 29 / R 33 PSI. Com carona: F 29 / R 36 PSI. Pneus esportivos 17" — confirme tamanhos no manual (podem variar por geração). Recomendados: Pirelli Diablo Strada 100/80-17 (F) / Pirelli Sport Demon 130/70-17 (R).',
  },
  {
    modelName: 'CRUISE 125',
    yearFrom: 1999, yearTo: 2008,
    tireSize: '90/90-19 (F) · 130/90-15 (R)',
    frontPsi: 26, rearPsi: 29,
    frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Solo: F 26 / R 29 PSI. Com carona: F 26 / R 33 PSI. Pneus cruiser: 19" dianteiro e 15" traseiro. Pirelli Sport Demon ou Metzeler ME77 são excelentes opções. Disponibilidade: verifique localmente antes de precisar.',
  },
  {
    modelName: 'CRUISE II 125',
    yearFrom: 2003, yearTo: 2008,
    tireSize: '90/90-19 (F) · 130/90-15 (R)',
    frontPsi: 26, rearPsi: 29,
    frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Solo: F 26 / R 29 PSI. Com carona: F 26 / R 33 PSI. Mesmo padrão do CRUISE 125.',
  },
  {
    modelName: 'FÚRIA 250cc',
    yearFrom: 2002, yearTo: 2006,
    tireSize: '110/70-17 (F) · 150/70-17 (R)',
    frontPsi: 29, rearPsi: 33,
    frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Solo: F 29 / R 33 PSI. Com carona: F 29 / R 36 PSI. Motor V-twin 249cc: pressões idênticas ao COMET 250cc. Recomendados: Pirelli Diablo Strada 110/70-17 (F) / 150/70-17 (R).',
  },
  {
    modelName: 'RX 125',
    yearFrom: 2003, yearTo: 2010,
    tireSize: '80/100-21 (F) · 100/90-18 (R)',
    frontPsi: 22, rearPsi: 25,
    frontPsiLoad: 22, rearPsiLoad: 28,
    notes: 'ASFALTO — Solo: F 22 / R 25 PSI. Com carona: F 22 / R 28 PSI. OFF-ROAD: F 15–18 / R 20–22 PSI para melhor tração. Recalibre SEMPRE ao voltar ao asfalto. Pneus trail: misto TKC70 ou Pirelli MT60 são boas escolhas.',
  },
]

// ─── Manutenção estruturada ───────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // GF 125 SPEED
  { modelName: 'GF 125 SPEED', yearFrom: 2002, yearTo: 2006, component: 'Óleo 10W-40 JASO MA (1,0–1,2L)', intervalKm: 5000, intervalMonths: 6, notes: 'Motor Hyosung GF125. Semissintético. Nunca 20W-50 ou JASO MB.', priority: 'HIGH', order: 1 },
  { modelName: 'GF 125 SPEED', yearFrom: 2002, yearTo: 2006, component: 'Vela NGK CR7E (gap 0,7–0,8mm)', intervalKm: 10000, intervalMonths: null, notes: 'Inspecionar 5.000 km. Torque 12–15 Nm. Iridium CR7HIX: 20.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'GF 125 SPEED', yearFrom: 2002, yearTo: 2006, component: 'Lubrificação corrente 428H', intervalKm: 500, intervalMonths: null, notes: 'Folga 20–30mm. Spray corrente ou 80W-90.', priority: 'HIGH', order: 3 },
  { modelName: 'GF 125 SPEED', yearFrom: 2002, yearTo: 2006, component: 'Filtro de ar — limpar 5.000 km', intervalKm: 5000, intervalMonths: 12, notes: 'Espuma: querosene + secar + óleo fino.', priority: 'MEDIUM', order: 4 },
  { modelName: 'GF 125 SPEED', yearFrom: 2002, yearTo: 2006, component: 'Folga de válvulas (adm 0,05 / esc 0,08mm)', intervalKm: 10000, intervalMonths: 12, notes: 'GF125 OHC 4V. Motor frio.', priority: 'HIGH', order: 5 },
  { modelName: 'GF 125 SPEED', yearFrom: 2002, yearTo: 2006, component: 'Retificador/regulador — verificar tensão', intervalKm: null, intervalMonths: 12, notes: '13,5–14,5V @ 4.000 rpm. Substituição preventiva 40.000 km.', priority: 'CRITICAL', order: 6 },
  { modelName: 'GF 125 SPEED', yearFrom: 2002, yearTo: 2006, component: 'Filtro de óleo (Hiflofiltro HF153)', intervalKm: 10000, intervalMonths: 12, notes: 'Aplicar óleo no O-ring ao montar.', priority: 'MEDIUM', order: 7 },
  { modelName: 'GF 125 SPEED', yearFrom: 2002, yearTo: 2006, component: 'Fluido de freio DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'Bienal obrigatório.', priority: 'HIGH', order: 8 },

  // CRUISE 125
  { modelName: 'CRUISE 125', yearFrom: 1999, yearTo: 2008, component: 'Óleo 10W-40 JASO MA (1,0–1,2L)', intervalKm: 5000, intervalMonths: 6, notes: 'Motor Hyosung GF125.', priority: 'HIGH', order: 1 },
  { modelName: 'CRUISE 125', yearFrom: 1999, yearTo: 2008, component: 'Vela NGK CR7E (gap 0,7–0,8mm)', intervalKm: 10000, intervalMonths: null, notes: 'Inspecionar 5.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'CRUISE 125', yearFrom: 1999, yearTo: 2008, component: 'Lubrificação corrente 428H', intervalKm: 500, intervalMonths: null, notes: 'Folga 20–30mm. Moto pesada: corrente com O-ring (DID/RK).', priority: 'HIGH', order: 3 },
  { modelName: 'CRUISE 125', yearFrom: 1999, yearTo: 2008, component: 'Filtro de ar — limpar 5.000 km', intervalKm: 5000, intervalMonths: 12, notes: 'Espuma: querosene + secar + óleo fino.', priority: 'MEDIUM', order: 4 },
  { modelName: 'CRUISE 125', yearFrom: 1999, yearTo: 2008, component: 'Folga de válvulas (adm 0,05 / esc 0,08mm)', intervalKm: 10000, intervalMonths: 12, notes: 'GF125 4V. Motor frio.', priority: 'HIGH', order: 5 },
  { modelName: 'CRUISE 125', yearFrom: 1999, yearTo: 2008, component: 'Retificador/regulador — verificar anual, trocar 40.000 km', intervalKm: null, intervalMonths: 12, notes: '13,5–14,5V @ 4.000 rpm. Ponto de falha #1.', priority: 'CRITICAL', order: 6 },
  { modelName: 'CRUISE 125', yearFrom: 1999, yearTo: 2008, component: 'Filtro de óleo (Hiflofiltro HF153)', intervalKm: 10000, intervalMonths: 12, notes: 'O-ring com óleo ao montar.', priority: 'MEDIUM', order: 7 },
  { modelName: 'CRUISE 125', yearFrom: 1999, yearTo: 2008, component: 'Fluido de freio DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'Bienal. Freio dianteiro hidráulico.', priority: 'HIGH', order: 8 },
  { modelName: 'CRUISE 125', yearFrom: 1999, yearTo: 2008, component: 'Kit relação 428H', intervalKm: 15000, intervalMonths: null, notes: 'Trocar kit completo. Corrente com O-ring.', priority: 'HIGH', order: 9 },

  // CRUISE II 125
  { modelName: 'CRUISE II 125', yearFrom: 2003, yearTo: 2008, component: 'Óleo 10W-40 JASO MA (1,0–1,2L)', intervalKm: 5000, intervalMonths: 6, notes: 'Motor Hyosung GF125. Idêntico ao CRUISE 125.', priority: 'HIGH', order: 1 },
  { modelName: 'CRUISE II 125', yearFrom: 2003, yearTo: 2008, component: 'Vela NGK CR7E (gap 0,7–0,8mm)', intervalKm: 10000, intervalMonths: null, notes: 'Inspecionar 5.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'CRUISE II 125', yearFrom: 2003, yearTo: 2008, component: 'Lubrificação corrente 428H', intervalKm: 500, intervalMonths: null, notes: 'Folga 20–30mm.', priority: 'HIGH', order: 3 },
  { modelName: 'CRUISE II 125', yearFrom: 2003, yearTo: 2008, component: 'Folga de válvulas (adm 0,05 / esc 0,08mm)', intervalKm: 10000, intervalMonths: 12, notes: 'GF125 4V. Motor frio.', priority: 'HIGH', order: 4 },
  { modelName: 'CRUISE II 125', yearFrom: 2003, yearTo: 2008, component: 'Retificador/regulador — verificar anual, trocar 40.000 km', intervalKm: null, intervalMonths: 12, notes: '13,5–14,5V @ 4.000 rpm. Ponto de falha #1.', priority: 'CRITICAL', order: 5 },
  { modelName: 'CRUISE II 125', yearFrom: 2003, yearTo: 2008, component: 'Fluido de freio DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'Bienal.', priority: 'HIGH', order: 6 },
  { modelName: 'CRUISE II 125', yearFrom: 2003, yearTo: 2008, component: 'Kit relação 428H', intervalKm: 15000, intervalMonths: null, notes: 'Trocar kit completo.', priority: 'HIGH', order: 7 },

  // FÚRIA 250cc
  { modelName: 'FÚRIA 250cc', yearFrom: 2002, yearTo: 2006, component: 'Óleo 10W-40 JASO MA (2,0L s/ filtro / 2,2L c/ filtro)', intervalKm: 5000, intervalMonths: 6, notes: 'Motor Hyosung 249cc V-twin DOHC. Semissintético JASO MA.', priority: 'HIGH', order: 1 },
  { modelName: 'FÚRIA 250cc', yearFrom: 2002, yearTo: 2006, component: 'Velas NGK CR8E ×2 (gap 0,7–0,8mm)', intervalKm: 10000, intervalMonths: null, notes: 'Sempre em par. Cilindro traseiro: acesso difícil. Iridium CR8EIX: 20.000 km.', priority: 'HIGH', order: 2 },
  { modelName: 'FÚRIA 250cc', yearFrom: 2002, yearTo: 2006, component: 'Lubrificação corrente 520', intervalKm: 500, intervalMonths: null, notes: 'Folga 25–35mm. Kit: pinhão 15T + coroa 45T + corrente 520 × 110.', priority: 'HIGH', order: 3 },
  { modelName: 'FÚRIA 250cc', yearFrom: 2002, yearTo: 2006, component: 'Sincronização carburadores duplos Mikuni BDS26', intervalKm: 10000, intervalMonths: 12, notes: 'Vacuômetro duplo. Mecânico especializado em Hyosung.', priority: 'HIGH', order: 4 },
  { modelName: 'FÚRIA 250cc', yearFrom: 2002, yearTo: 2006, component: 'Folga de válvulas (adm 0,10 / esc 0,15mm)', intervalKm: 10000, intervalMonths: 12, notes: 'DOHC 4V/cilindro × 2 = 8 válvulas. Motor frio.', priority: 'HIGH', order: 5 },
  { modelName: 'FÚRIA 250cc', yearFrom: 2002, yearTo: 2006, component: 'Filtro de óleo (Hiflofiltro HF152)', intervalKm: 10000, intervalMonths: 12, notes: 'Compatível com toda família Hyosung 250cc.', priority: 'MEDIUM', order: 6 },
  { modelName: 'FÚRIA 250cc', yearFrom: 2002, yearTo: 2006, component: 'Retificador/regulador — verificar anual, trocar 40.000 km', intervalKm: null, intervalMonths: 12, notes: '13,5–14,5V @ 4.000 rpm. Ponto de falha #1.', priority: 'CRITICAL', order: 7 },
  { modelName: 'FÚRIA 250cc', yearFrom: 2002, yearTo: 2006, component: 'Fluido de freio DOT 4 (frente + trás)', intervalKm: 15000, intervalMonths: 24, notes: 'Bienal. Purgar das pinças para reservatório.', priority: 'HIGH', order: 8 },

  // RX 125
  { modelName: 'RX 125', yearFrom: 2003, yearTo: 2010, component: 'Óleo 10W-40 JASO MA (~1,0L)', intervalKm: 3000, intervalMonths: 6, notes: 'Off-road: 3.000 km. Asfalto: 5.000 km. Motor Hyosung RX125.', priority: 'HIGH', order: 1 },
  { modelName: 'RX 125', yearFrom: 2003, yearTo: 2010, component: 'Vela NGK CR7E (gap 0,7–0,8mm)', intervalKm: 10000, intervalMonths: null, notes: 'Inspecionar 5.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'RX 125', yearFrom: 2003, yearTo: 2010, component: 'Filtro de ar — off-road: após trilha / asfalto: 5.000 km', intervalKm: 5000, intervalMonths: null, notes: 'Espuma: querosene + secar + óleo. VITAL em off-road.', priority: 'HIGH', order: 3 },
  { modelName: 'RX 125', yearFrom: 2003, yearTo: 2010, component: 'Lubrificação corrente 428H', intervalKm: 500, intervalMonths: null, notes: 'Off-road: 300 km. Após trilha: limpar antes de lubricar. Folga 20–30mm.', priority: 'HIGH', order: 4 },
  { modelName: 'RX 125', yearFrom: 2003, yearTo: 2010, component: 'Folga de válvulas (adm 0,05 / esc 0,08mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Off-road: 5.000 km. Motor frio.', priority: 'HIGH', order: 5 },
  { modelName: 'RX 125', yearFrom: 2003, yearTo: 2010, component: 'Retificador/regulador — verificar anual, trocar 40.000 km', intervalKm: null, intervalMonths: 12, notes: '13,5–14,5V @ 4.000 rpm.', priority: 'CRITICAL', order: 6 },
  { modelName: 'RX 125', yearFrom: 2003, yearTo: 2010, component: 'Retentor bengala invertida ø38mm + óleo SAE 5W (350mL/tubo)', intervalKm: 20000, intervalMonths: null, notes: 'Bengala invertida. Troque retentor ao aparecer vazamento.', priority: 'MEDIUM', order: 7 },
  { modelName: 'RX 125', yearFrom: 2003, yearTo: 2010, component: 'Pastilha freio dianteiro + lona traseira', intervalKm: 8000, intervalMonths: null, notes: 'Off-road: inspecionar 5.000 km. Pastilha < 1,5mm / Lona < 2mm = troca.', priority: 'MEDIUM', order: 8 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Kasinski Sport/Trail (GF 125, CRUISE 125/II, FÚRIA 250, RX 125)...')

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

  console.log('✅ Kasinski Sport/Trail concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
