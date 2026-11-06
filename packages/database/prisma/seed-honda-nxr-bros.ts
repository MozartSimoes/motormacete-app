// seed-honda-nxr-bros.ts — Honda NXR Bros (todos os modelos FIPE)
// NXR 125 BROS ES/KS (2004-2006) · NXR 150 BROS ES/ESD/KS (2006-2015) · NXR 160 BROS ESDD/MIX FLEXONE (2015-2024)
// NXR 150: motor 149cc SOHC carburado (familia CG 150) | valvulas adm 0,05 mm / esc 0,10 mm | NGK CPR6EA-9
// NXR 160: motor 162,7cc SOHC PGM-FI (identico ao CG 160) | valvulas adm 0,07 mm / esc 0,08 mm | NGK CPR7EA-9 (iridium)
// NXR 160 ESDD: roda dianteira 21" (aro 21 = diferencial exclusivo da Bros no segmento trail)
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

// ─── NXR 125 BROS KS (2004-2006) ─────────────────────────────────────────────

const NXR125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Carburador Keihin PE24 — limpeza a cada 12.000 km; jateamento original e adequado para altitude ate 1.000 m',
    body: 'Motor 124cc SOHC carburado simples. Carburador PE24 com jato principal 105 e jato de agulha 42. Em cidades acima de 800 m de altitude: jato principal 98-100 melhora a mistura (motor mais rico em altitude). Limpeza completa (cuba, palheta, jatos): R$50-100 em qualquer oficina de moto. Flotador desgastado (moto afogando ou consumo muito alto): R$20-40 nova palheta. Nunca use ar comprimido direto no jato agulha — pode alargar o furo e causar mistura rica cronica.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA — gap 0,6-0,7 mm; troca a cada 8.000 km; C8HSA para uso exclusivo off-road pesado',
    body: 'Vela standard: NGK C7HSA (R$10-18) ou Denso U22FSR-U. Gap: 0,60-0,70 mm — ajuste com calibrador de lâminas. Para off-road pesado com muitas aceleracoes e desaceleracoes em baixa rotacao: C8HSA (grau termico mais quente) previne acumulo de fuligem. Nunca force a vela ao apertar — rosca M12 no cabecote de aluminio — aperto maximo com torquimetro: 12 Nm. Carregar vela reserva + chave de vela em trilhas longas.',
  },
  {
    severity: 'OK',
    title: 'Mecanismo de partida a pe (kick start) — manutencao essencial; KS sem bateria = independencia total',
    body: 'O mecanismo de kick start da NXR 125 KS nao tem bateria nem motor de partida — vantagem em trilhas remotas. Manutencao: engrenagem de kick start requer lubrificacao com graxa EP a cada 10.000 km. Pino de retorno do kick: verificar trinca ou desgaste (peca de R$15-30). Tecnica correta: pedal no PMS de compressao (motor firme no pedal), suba e empurre com o peso do corpo em um golpe continuo — golpes curtos nao geram rotacao suficiente para partir.',
  },
  {
    severity: 'WARN',
    title: 'Valvulas adm 0,05 mm / esc 0,10 mm — motor frio; NXR 125 tem tampa do cabecote diferente do CG 125; ferramenta especifica necessaria',
    body: 'Motor frio, 1ª marcha engatada, PMS de compressao (piston no ponto mais alto com as 2 valvulas fechadas). Folga: admissao 0,05 ±0,02 mm, escape 0,10 ±0,02 mm. Tampa do cabecote tem tampa lateral com 2 parafusos — diferente do CG 125 com tampa superior. Folga de escape zerada queima assento progressivamente sem sintoma por meses ate perder compressao de forma aguda.',
  },
  {
    severity: 'WARN',
    title: 'Bengala dianteira 32 mm — oleo Honda SS-7 10W; troca a cada 15.000 km ou ao primeiro sinal de vazamento',
    body: 'Bengala convencional 32 mm com volume de 100 mL por tubo. Troca com moto no cavalete central, bengala comprimida ate o toco: 4 parafusos no toco superior + parafuso de drenagem inferior. Retentores Ariete ou Honda: R$50-80 o par. Sinal de degradacao: impacto seco em lombada baixa que antes absorvia bem. Oleo escorrendo na haste: nao rode — risco de oleo no pneu dianteiro. Kit completo com retentores + raspapoeira + oleo: R$90-150.',
  },
  {
    severity: 'OK',
    title: 'Pneus 70/100-19 (F) · 90/90-18 (R) — NXR 125 e a unica Bros com aro 19" na frente; nunca confundir com NXR 150 (aro 18")',
    body: 'Pneu dianteiro 19" e especifico da NXR 125 — nao e intercambivel com NXR 150 (18") ou NXR 160 (21"). Opcoes 70/100-19: Pirelli MT15 (R$140-180), Rinaldi BF50 (R$90-120). Traseiro 90/90-18: mesmo que NXR 150 — ampla disponibilidade. Calibragem: 29 PSI dianteiro / 32 PSI traseiro (asfalto). Off-road: reduzir para 22 PSI F / 25 PSI R. Pneu com mais de 5 anos: troque independente do sulco — borracha endurece e perde aderencia em molhado.',
  },
]

const NXR125_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Bengala dianteira de 32 mm com design fragil — curva de impacto em off-road dobra o tubo interno; inspetar apos cada queda',
    body: 'Tubo interno 32 mm e mais fino que os 33-35 mm de enduro moderno. Queda lateral em off-road ou impacto em pedra com velocidade pode empenar o tubo. Sintoma: direcao pesada ou travando em curvas, vazamento de oleo em faixa irregular. Tubo interno Honda NXR 125: R$180-350 (quando disponivel) ou tubo universal 32 mm adaptado. Antes de comprar, verifique alinhamento: moto no cavalete central, rode o pneu — tubo empenado cria oscilacao visivel.',
  },
  {
    severity: 'WARN',
    title: 'Motor de partida ausente (KS) — moto com motor frio e dificil de partir abaixo de 10°C sem tecnica correta',
    body: 'Motor frio abaixo de 15°C: abra o afogador (choke) completamente, nao mexa no acelerador, 2-3 golpes de kick energicos. Se nao pegar em 5 tentativas: espere 30 segundos (vela pode ter afogado). Vela afogada: abra o acelerador completamente (sem afogador) e de 5 golpes para "limpar". Moto que nao parte no frio apos procedimento correto: vela desgastada ou carburador com palheta com vazamento causando afogamento automatico.',
  },
  {
    severity: 'WARN',
    title: 'Pecas originais Honda NXR 125 escassas — producao encerrada em 2006; mercado livre e fornecedores de usados sao as fontes',
    body: 'Honda encerrou a NXR 125 em 2006 — revendas Honda nao tem mais pecas originais no sistema. Fontes confiaveis: Mercado Livre (buscar "peças NXR 125" e conferir compatibilidade), desmanches especializados em moto Honda, e pecas do CG 125 do mesmo periodo que sao intercambiaveis (motor, corrente, vela, filtro de ar). Cabecote, pistao e cilindro: compatibilidade com XLR 125 em alguns casos — consulte um mecanico especializado em trail Honda antes de comprar.',
  },
  {
    severity: 'DANGER',
    title: 'Quadro com trinca nas aletas de solda — problema cronico em motos usadas em off-road pesado; inspecao antes de comprar',
    body: 'NXR 125 usada intensamente em trilha ou carga: inspecionar as soldas do quadro principal (area do eixo traseiro e aletas de fixacao do motor) antes de comprar. Ferrugem sobre solda pode esconder trinca de fadiga. Trinca em solda do quadro = sucateamento — custo de solda TIG certificada quase equivale ao valor da moto. Ao comprar usada: limpe a area com pano umido e examine com lanterna — trinca aparece como linha escura fina no cordo de solda.',
  },
]

// ─── NXR 125 BROS ES (2004-2006) — Partida eletrica + kick backup ────────────

const NXR125ES_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Carburador Keihin PE24 — limpeza a cada 12.000 km; mesmo jateamento do KS: jato principal 105, agulha 42',
    body: 'Motor 124cc SOHC carburado. Carburador PE24 identico ao NXR 125 KS. Jato principal 105 e adequado ate 1.000 m de altitude — acima disso, jato 98-100 melhora a mistura. Limpeza completa (cuba, palheta, jatos): R$50-100. Flotador desgastado (afogando ou consumo excessivo): R$20-40 nova palheta. Nunca use ar comprimido direto no jato agulha — pode alargar o furo causando mistura rica cronica.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA — gap 0,6-0,7 mm; troca a cada 8.000 km; C8HSA para uso exclusivo off-road pesado',
    body: 'Vela standard: NGK C7HSA (R$10-18) ou Denso U22FSR-U. Gap: 0,60-0,70 mm — ajuste com calibrador de laminas. Para off-road pesado: C8HSA (grau termico mais quente) previne acumulo de fuligem em baixa rotacao. Aperto: 12 Nm (rosca M12 no cabecote de aluminio — nunca force). Carregar vela reserva + chave de vela em trilhas longas.',
  },
  {
    severity: 'OK',
    title: 'Motor de partida eletrica + kick de backup — bateria 12V 4Ah manutencao essencial; com bateria boa o kick raramente e necessario',
    body: 'A NXR 125 ES tem motor de partida eletrica (vs kick puro do KS). Bateria: 12V 4Ah (tipo YTX4L-BS ou equivalente — R$60-100). Bateria fraca e o principal motivo de partida "lenta" ou falha. Se a bateria morrer em campo, o kick start de backup funciona normalmente. Manutencao: verifique a tensao da bateria (13,8V com motor ligado, >12,4V parada). Bateria com mais de 3 anos: substitua preventivamente. Nao deixe a moto parada por mais de 30 dias sem carregar — bateria 4Ah descarrega rapido.',
  },
  {
    severity: 'WARN',
    title: 'Valvulas adm 0,05 mm / esc 0,10 mm — motor frio; tampa lateral do cabecote diferente do CG 125; ferramenta especifica necessaria',
    body: 'Motor frio, 1ª marcha engatada, PMS de compressao (piston no ponto mais alto com as 2 valvulas fechadas). Folga: admissao 0,05 ±0,02 mm, escape 0,10 ±0,02 mm. Tampa do cabecote tem tampa lateral com 2 parafusos — diferente do CG 125. Folga de escape zerada queima assento progressivamente sem sintoma por meses ate perder compressao agudamente. Verificar a cada 6.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Bengala dianteira 32 mm — oleo Honda SS-7 10W; troca a cada 15.000 km ou ao primeiro sinal de vazamento',
    body: 'Bengala convencional 32 mm com volume de 100 mL por tubo. Retentores Ariete ou Honda: R$50-80 o par. Sinal de degradacao: impacto seco em lombada que antes absorvia bem. Oleo escorrendo na haste: nao rode — risco de oleo no pneu dianteiro. Kit completo com retentores + raspapoeira + oleo: R$90-150.',
  },
  {
    severity: 'OK',
    title: 'Pneus 70/100-19 (F) · 90/90-18 (R) — NXR 125 tem aro 19" dianteiro exclusivo; nunca confundir com NXR 150 (18") ou NXR 160 (21")',
    body: 'Pneu dianteiro 19" e especifico da NXR 125 — nao intercambivel com NXR 150 (18") ou NXR 160 (21"). Opcoes 70/100-19: Pirelli MT15 (R$140-180), Rinaldi BF50 (R$90-120). Traseiro 90/90-18: mesmo que NXR 150 — ampla disponibilidade. Calibragem: 29 PSI F / 32 PSI R (asfalto). Off-road: 22 PSI F / 25 PSI R. Pneu com mais de 5 anos: troque independente do sulco.',
  },
]

const NXR125ES_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Bengala dianteira 32 mm fragil — impacto em off-road pode empenar o tubo interno; inspecao apos cada queda',
    body: 'Tubo interno 32 mm e mais fino que enduro moderno. Queda lateral ou impacto em pedra pode empenar o tubo. Sintoma: direcao pesada ou travando em curvas, vazamento de oleo em faixa irregular. Tubo interno Honda NXR 125: R$180-350 (quando disponivel) ou tubo universal 32 mm adaptado. Verificar alinhamento: moto no cavalete central, rode o pneu — tubo empenado cria oscilacao visivel.',
  },
  {
    severity: 'WARN',
    title: 'Motor de partida eletrica — escova e coletor desgastam em 30.000-40.000 km; sintoma: partida "roncando" ou girando sem pegar',
    body: 'Motor de partida da NXR 125 ES tem escovas de carvao que desgastam com o tempo. Sintoma de escovas gastas: motor da partida gira devagar ("roncando") mas nao engata com forca — especialmente em motor quente. Motor quente tem resistencia interna maior na bobina do motor de partida, agravando escovas fracas. Kit de escovas: R$30-60 (generico) ou R$80-150 (Honda). Se o motor de partida girar mas o motor nao pegar: possivel defeito na engrenagem Bendix (R$80-150 nova).',
  },
  {
    severity: 'WARN',
    title: 'Pecas originais Honda NXR 125 escassas — producao encerrada em 2006; mercado livre e desmanches sao as fontes confiaveis',
    body: 'Honda encerrou a NXR 125 em 2006 — revendas Honda nao tem mais pecas originais. Pecas intercambiaveis com o CG 125 do mesmo periodo: motor, corrente, vela, filtro de ar, carburador (mesma familia). Motor de partida eletrica: especifico da NXR 125 ES — buscar em desmanches ou Mercado Livre. Cabecote, pistao, cilindro: compatibilidade com XLR 125 em alguns casos — consulte mecanico especializado antes de comprar.',
  },
  {
    severity: 'DANGER',
    title: 'Quadro com trinca nas aletas de solda — problema cronico em motos usadas em off-road pesado; inspecao essencial ao comprar usada',
    body: 'NXR 125 usada em off-road ou carga pesada: inspecionar soldas do quadro (area do eixo traseiro e aletas de fixacao do motor). Ferrugem sobre solda esconde trinca de fadiga. Trinca em solda do quadro = sucateamento — custo de solda TIG certificada quase equivale ao valor da moto. Ao comprar usada: limpe a area com pano umido, examine com lanterna — trinca aparece como linha escura no cordo de solda.',
  },
]

// ─── NXR 150 BROS ES (2006-2012) — Partida eletrica + tambor dianteiro ────────

const NXR150ES_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 149cc carburado — mesmo bloco do CG 150 com estado de afinacao diferente; valvulas adm 0,05 mm / esc 0,10 mm',
    body: 'NXR 150 compartilha bloco motor com CG 150 mas tem carburador recalibrado para uso misto (estrada + terra) com jato principal maior para suportar aceleracoes abruptas em off-road. Oleo: 10W-30 JASO MA2, 1,0 L com filtro. Vela: NGK CPR6EA-9 (gap 0,7 mm) ou CPR7EA-9 para uso intenso de off-road. Valvulas com motor frio: adm 0,05 mm / esc 0,10 mm — mesmas que CG 150. Troca de oleo a cada 3.000 km (uso de estrada) ou 2.000 km (off-road intenso com lama).',
  },
  {
    severity: 'WARN',
    title: 'Tambor dianteiro ES — ajuste de freio a cada 3.000 km; folga do cabo: 10-20 mm na alavanca; cabo e o primeiro a falhar',
    body: 'NXR 150 ES tem freio a tambor nos dois eixos. Freio dianteiro exige manutencao mais frequente que disco — especialmente em uso off-road com lama. Cabo de freio dianteiro: lubrificar com oleo fino (WD-40 ou oleo de maquina de costura) a cada 6.000 km. Cabo fracionado internamente: alavanca mole sem resposta — troca imediata. Lona dianteira: R$30-60 o par (Fras-le ou Honda). Substitua quando espessura atingir 2 mm. NUNCA use parafina ou graxa no tambor — contamina as lonas.',
  },
  {
    severity: 'OK',
    title: 'Pneus 80/100-18 (F) · 90/90-18 (R) — aro 18" nos dois eixos; ES e a versao mais "urbana" da NXR 150',
    body: 'NXR 150 ES e ESD usam 18" nos dois eixos (vs 19" na NXR 125 e 21" na NXR 160). Pneu frontal 80/100-18: Pirelli Super City (asfalto, R$100-140), Pirelli MT15 (misto, R$140-180), Maxxis M6029 (trail, R$130-170). Traseiro 90/90-18: ampla disponibilidade, mesma que CG. Calibragem: 29 PSI F / 32 PSI R (asfalto). Off-road: 22 PSI F / 26 PSI R. Pneus misto dao melhor custo-beneficio para usuario que usa 80% estrada e 20% terra.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar esponja — lavar com gasolina + reimpregar com oleo de motor apos cada trilha; NUNCA limpar com ar comprimido',
    body: 'NXR 150 usa filtro de espuma (nao papel como CG). Em off-road: espuma absorve lama e poeira — entopimento rapido reduz potencia e enriquece mistura. Procedimento apos trilha com lama: retire, lave com gasolina ou solvente, seque ao sol 30 min, aplique 10-15 mL de oleo de motor SAE 30 (oleo mineral) e esprema o excesso. Ar comprimido em espuma: destroi as celulas — nao use. Espuma original Honda: R$30-50. K&N lavavel permanente: nao recomendado para uso off-road com lama (poros abertos).',
  },
  {
    severity: 'WARN',
    title: 'Corrente 428 com pinhao de 14 dentes (padrao trail) — tensionamento mais critico que CG por percursos irregulares',
    body: 'NXR 150 usa pinhao menor que CG 150 para maior reducao em off-road. Folga ideal: 20-30 mm no ponto central inferior (moto no cavalete lateral, piloto fora). Em trilha com buracos e raizes: verificar a folga ao final de cada saida — percurso irregular afroxa a corrente mais rapido. Corrente com elos travados (nao giram lateralmente): troca obrigatoria — corrente travada em off-road pode arrebentar sob carga. Kit completo DID 428NZ: R$150-200 (leve, facil de lavar); DID 428VX: R$190-250 (mais resistente para carga).',
  },
]

const NXR150ES_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Bengala dianteira 35 mm com vedacao fraca — uso off-road intenso aumenta frequencia de vazamento para 15.000-20.000 km',
    body: 'Retentores originais Honda da NXR 150 sao adequados para uso misto moderado mas desgastam mais rapido em trilha intensiva. Oleo escorrendo na haste = nao rode (contamina a lona dianteira ou a pastilha do ESD). Kit retentores + raspapoeira Ariete: R$60-90 o par. Troca exige cavalete central, compressao da mola da bengala, extrator de retentores (ferramenta especifica ou improvisacao com tubo PVC 35 mm). Apos troca: 100 mL oleo 10W por tubo.',
  },
  {
    severity: 'WARN',
    title: 'Motor de partida eletrico com desgaste precoce em motos com mais de 50.000 km — escovas e comutador',
    body: 'Motor de partida da NXR 150 ES/ESD divide o mesmo componente do CG 150. Escovas: troca quando atingirem 5 mm de comprimento restante. Kit de escovas: R$20-35. Comutador (superficie onde as escovas tocam): lixar com lixa d\'agua 400 (aspecto fosco com sulcos). Motor com "click" sem girar: rele de partida ou escovas. Motor girando devagar: escovas desgastadas ou bateria fraca (<12,4V em repouso). Revisao completa do motor de partida: R$80-150.',
  },
  {
    severity: 'WARN',
    title: 'Carburador afogando com etanol de alta graduacao — jateamento original calibrado para gasolina ate E27',
    body: 'NXR 150 carburada e calibrada para gasolina comum (E22-E27). Etanol acima de E50 (mistura com mais alcool) pode causar mistura rica: motor afogando, vela preta, consumo alto. Se precisar usar etanol E100 em posto no interior: abre-se o parafuso de mistura mais 1/4 de volta e jato de agulha uma posicao mais alto. Retorne ao ajuste original ao voltar para gasolina. Nao e recomendado — NXR 150 nao foi projetada para flex.',
  },
  {
    severity: 'DANGER',
    title: 'Lona dianteira contaminada com oleo da bengala — freia com retardo abrupto ou nao freia; situacao de risco imediato',
    body: 'Oleo da bengala escorrendo pelo tubo interno vai direto para o tambor dianteiro quando a bengala comprime. Lona contaminada: frenagem imprevisivel — pode nao travar (oleo lubrifica) ou travar abruptamente (oleo aquecido queima e gruda). Inspecao: retire a roda dianteira, abra o tambor, examine as lonas. Lona com mancha de oleo: troca imediata + conserto do retentor da bengala. Nao tente limpar lona com gasolina — contaminacao interna nos poros da lona nao remove com limpeza.',
  },
]

// ─── NXR 150 BROS ESD (2006-2015) — Partida eletrica + disco dianteiro ────────

const NXR150ESD_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'ESD — disco dianteiro 245 mm + pinca simples de 1 pistao; mesmas pastilhas da CG 150 ESD (Fras-le MA-2011)',
    body: 'NXR 150 ESD adicionou disco dianteiro 245 mm vs tambor da ES — melhoria significativa em frenagem em descidas off-road e controle em condicoes de molhado. Pinca simples flutuante de 1 pistao 30 mm: pastilhas Fras-le MA-2011 (R$30-50) ou EBC FA068HH (R$55-85) — ambas substituem o original Honda. Fluido: DOT 4 (nao DOT 3). Troca de fluido: a cada 24 meses obrigatoriamente — DOT 4 higroscopico reduz ponto de ebulicao de 230°C para <160°C em 2 anos de uso.',
  },
  {
    severity: 'WARN',
    title: 'Disco dianteiro 245 mm — espessura minima 3,0 mm; disco abaixo do minimo causa pinca oscilante e vibracoes em frenagem',
    body: 'Disco original Honda NXR 150: 3,5 mm de espessura. Minimo: 3,0 mm. Com uso off-road, barro e areia atuam como abrasivos no disco — desgaste mais rapido que uso de asfalto. Medicao com micrometro em 4 pontos do disco: se qualquer ponto abaixo de 3,0 mm, troca. Disco Honda original: R$180-280. Disco Braking ou EBC compativel: R$120-190. Disco empenado (vibracoes ao frear): endireitamento em torno especializado (R$60-100) ou troca.',
  },
  {
    severity: 'OK',
    title: 'Sistema disco dianteiro + CBS ausente na NXR 150 — frenagem independente; tecnica de off-road: 70% traseiro + 30% dianteiro em terra',
    body: 'A NXR 150 ESD nao tem CBS (Combined Brake System) — os dois freios sao totalmente independentes. Em off-road: use principalmente o freio traseiro (70-80% da forca de frenagem) e minimo do dianteiro em terra solta. Disco dianteiro travado em areia ou lama = queda certa. No asfalto: inverso — 60-70% no dianteiro. Em descidas off-road inguemes: freio motor + traseiro suave + dianteiro apenas para controle de direcao. Treinar a dosagem dos freios em off-road e fundamental.',
  },
  {
    severity: 'WARN',
    title: 'Pastilha dianteira com lama abrasiva — vida util reduz para 6.000-8.000 km em uso off-road vs 12.000-15.000 km em asfalto',
    body: 'Lama e areia agem como composto de lixa entre pastilha e disco. Em trilhas frequentes, inspecione pastilhas a cada 5.000 km (vs 8.000 km no asfalto). Pastilha com espessura abaixo de 2,0 mm: troca imediata. Rangido metalico ao frear = pastilha no limite. Lama seca acumulada na capa protetora da pinca: lavar com agua limpa apos cada trilha (mangueira de baixa pressao — nao de lavajato direto no disco). Pastilha com lama incrustada: limpar suavemente com escovilhao de nylon — nunca lixa.',
  },
]

const NXR150ESD_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Pinca dianteira travando apos uso off-road com exposicao a agua e lama — pistao enferrujando internamente',
    body: 'Pinca de 1 pistao 30 mm da NXR 150 ESD tem exposicao ao barro e agua maior que pinca de moto de rua. Pistao enferrujado = pinca parcialmente presa = freio arrastando = disco aquecendo e combustivel consumindo mais. Sintoma precoce: freio dianteiro "puxando" sozinho. Rebuild kit com pistao + selos: R$60-100 (Honda) — rebuild e muito mais barato que pinca nova (R$280-450). Apos cada trilha com muita lama: limpar a area da pinca com agua limpa e secar com ar comprimido (distancia segura).',
  },
  {
    severity: 'WARN',
    title: 'Mangueira de freio com rachadura — borracha resseca apos 6-8 anos de sol brasileiro; substituicao preventiva obrigatoria',
    body: 'Mangueira original da NXR 150 ESD com mais de 8 anos: inspecione visualmente em toda a extensao. Trinca superficial: substitua antes do proximo uso (mangueira pode ceder sob pressao de frenagem). Mangueira de arame trancado (aftermarket Venhill ou Goodridge): R$80-150 — mais duravel e transmissao de pressao mais precisa. Nunca torcer ou dobrar a mangueira ao girar o guiador — verifica-se rotacao completa com motor ligado e freio pressionado antes de usar.',
  },
  {
    severity: 'WARN',
    title: 'Disco com empenamento em molhado — imersao em lama fria apos frenagem intensa choca o disco quente; resfriamento progressivo obrigatorio',
    body: 'Frear intensamente em asfalto e entrar imediatamente em poco de lama fria: diferencial termico empenam o disco (metal quente resfriado abruptamente). Prevencao: reduza a velocidade antes da travessia e permita resfriamento progressivo. Disco empenado: vibracoes ao frear, pulsacao no manete. Teste: gire a roda lentamente com pinca montada — pistao oscila com disco empenado. Endireitar disco em torno: R$60-100. Disco novo EBC ou Braking compativel: R$120-190.',
  },
]

// ─── NXR 150 BROS KS (2006-2012) — Apenas partida a pe ───────────────────────

const NXR150KS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'KS 150 — zero dependencia de bateria; moto ideal para regioes remotas sem rede eletrica; mecanismo de kick precisa de manutencao periodica',
    body: 'A NXR 150 KS e a versao sem bateria de partida — literalmente a mais independente da familia Bros. Vantagem real em trilhas longas: sem bateria para descarregar em dias frios. Manutencao do kick start: engrenagem de ratchet requer lubrificacao com graxa litio EP a cada 15.000 km. Pino de parada do kick (detent pin): verificar desgaste ao sentir "click" fraco no kick. Bucha da alavanca: substituir se houver folga lateral excessiva (R$20-35).',
  },
  {
    severity: 'WARN',
    title: 'Partida a frio abaixo de 15°C sem bateria — tecnica com afogador obrigatoria; ignição diz ao mecanismo de partida o que fazer',
    body: 'NXR 150 KS com motor frio: afogador completamente fechado (botao para baixo ou alavanca para direita conforme versao). Nao toque no acelerador. 1-3 golpes de kick energicos com motor no PMS de compressao (resistencia maxima no pedal). Motor deve pegar no 1° ou 2° golpe se carburador e vela estiverem bons. Se nao pegar: afogador totalmente aberto + acelerador totalmente aberto + 5 golpes (motor afogado — remocao do excesso de combustivel). Vela suja e a causa #1 de dificuldade de partida no frio.',
  },
  {
    severity: 'OK',
    title: 'Sem bateria auxiliar — luz de posicao e faro dependem do estator; luzes fracas = estator ou regulador com problema',
    body: 'NXR 150 KS usa sistema elétrico com estator de 6 polos sem bateria principal. Luzes funcionam apenas com motor ligado — iluminacao aumenta proporcionalmente com a rotacao. Luz fraca em marcha lenta: normal. Luz fraca em alta rotacao: estator com espira em curto (R$120-200 novo) ou regulador/retificador com falha (R$60-100). Estator queimado deixa o motor sem faísca a qualquer velocidade — verificar com voltimetro nos terminais do estator (fio amarelo e verde): deve marcar 14-16V CA a 3.000 rpm.',
  },
  {
    severity: 'WARN',
    title: 'Carburador: piloto de marcha lenta critico na KS — sem bateria para compensar partida irregular; ajuste fino obrigatorio',
    body: 'Na KS sem bateria, motor irregular em marcha lenta causa apagamento frequente — sem alternativa de reacionar rapidamente sem esforco. Parafuso de mistura (piloto): ajuste padrao 2,5 voltas abertas. Se motor apaga em marcha lenta quente: abrir mais 1/4 de volta ate estabilizar. Motor "engolindo" em semaforo: fechar 1/4 de volta. Marcha lenta adequada: 1.200-1.400 rpm sem flutuacao. Carburador sujo com verniz de combustivel old (moto guardada por meses): limpeza completa antes de ajustar qualquer parafuso.',
  },
]

const NXR150KS_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Kick start com mola de retorno partida — chute sem retorno do pedal; mola de retorno R$15-30 em desmanches',
    body: 'Mola de retorno do kick start e o componente mais sujeito a fadiga mecanica na NXR 150 KS. Sintoma: pedal nao retorna apos o golpe — precisa levanta-lo manualmente. Ignorar = pedal solto pode causar queda ao trava nos pes do piloto. Mola: R$15-30 (Honda ou universal compativel). Troca simples: remova o protetor lateral esquerdo + parafuso do eixo do kick + mola antiga + instale nova. 15 min de trabalho em qualquer oficina. Em trilha, pedal solto = amarre temporariamente com abraçadeira de cabo.',
  },
  {
    severity: 'DANGER',
    title: 'Ignição falhando em off-road intenso com agua — bobina de ignição submersa durante travessia; impermebilizacao preventiva obrigatoria',
    body: 'Bobina de ignição da NXR 150 KS fica exposta na parte inferior do motor. Em travessias com agua acima do eixo dianteiro: agua penetra no cabo de vela ou no conector da bobina e causa falha de ignição instantanea. Prevencao: apos lavar a moto, seque o cabo de vela com ar comprimido e aplique graxa dieletrica no conector da bobina. Em trilhas com pocos fundos: eleve a parte eletrica da bobina com manga de borracha termorretratil sobre os conectores. Bobina molhada: motor sem faísca ate completo ressecamento (30-60 min em sol forte).',
  },
  {
    severity: 'WARN',
    title: 'Sistema eletrico minimalista — fusivel 10A unico; curto por conector oxidado desliga tudo; revisao dos conectores a cada 2 anos',
    body: 'NXR 150 KS tem sistema eletrico simplificado com apenas um fusivel de 10A. Curto em qualquer ponto desliga farisca e luzes. Conectores eletricos em motos de off-road oxidam mais rapido por exposicao a agua e barro. Revisao preventiva: conectores amarelo, verde e branco do estator + conector do ponto de aterramento no quadro. Limpeza: spray de contato eletrico (WD-40 Contact ou Chemtronics), re-encaixe e aplique graxa dieletrica. Conector com oxidacao verde: lixar os pinos com lixa 400 antes de aplicar graxa.',
  },
]

// ─── NXR 160 BROS ESDD (2015-2024) ───────────────────────────────────────────

const NXR160ESDD_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor PGM-FI identico ao CG 160 — valvulas adm 0,07 mm / esc 0,08 mm; vela NGK CPR7EA-9 (iridium, gap pre-setado, NAO ajustar)',
    body: 'NXR 160 usa o motor GLH162FMJ 162,7cc SOHC PGM-FI — motor identico ao CG 160 TITAN. Folgas: adm 0,07 mm / esc 0,08 mm (DIFERENTES da NXR 150 e CG 150: adm 0,05 mm). Mecanico que so conhece a NXR 150 vai regular errado. Vela iridium CPR7EA-9: gap de fabrica em 0,9 mm — nao ajuste o eletrodo fragil. Oleo: 10W-30 JASO MA2, 1,0 L com filtro. Intervalo: 3.000 km (uso de trilha com exigencia mecanica alta) ou 4.000 km (uso predominante de estrada).',
  },
  {
    severity: 'DANGER',
    title: 'Roda dianteira 21" — diferencial exclusivo da NXR 160 no segmento; pneu 80/100-21 NAO intercambivel com NXR 150 (18") ou CG 160 (17" ou 18")',
    body: 'A roda de 21" no eixo dianteiro e o maior diferencial tecnico da NXR 160 em relacao a NXR 150. Pneu maior = melhor transpasse de obstaculos off-road (pedras, raizes, valas). Pneu 80/100-21 e especifico — NUNCA tente montar 80/100-18 (nao cabe na bengala). Opcoes: Pirelli MT15 (R$160-220), Maxxis M6029 (R$150-200, excelente em terra), Michelin Sirac Street 80/100-21 (R$180-240, misto). Calibragem: 29 PSI asfalto / 22 PSI off-road. Balancear roda 21" com borracharia equipada para motos trail — balancadeira de carro nao serve.',
  },
  {
    severity: 'OK',
    title: 'IACV (valvula de controle de marcha lenta) — mesma da CG 160; limpeza a cada 8.000 km em uso de trail; marcha lenta oscilante = IACV suja',
    body: 'PGM-FI sem sonda lambda de banda larga (ESDD e gasolina, sem FLEXONE). IACV identica a CG 160 — mesma limpeza. Em uso trail: motor acelera e desacelera repetidamente em baixa rotacao — acumulo de verniz no agulhao da IACV e mais rapido que em uso de estrada. Limpeza: 2 parafusos, spray EFI Cleaner, ar comprimido no canal. Custo: R$50-100. DTC 29 confirma IACV com falha mecanica. Nao troque sem limpar primeiro — limpeza resolve 70% dos casos.',
  },
  {
    severity: 'WARN',
    title: 'Bengala invertida 37 mm — requer oleo Honda SS-8 (mais viscoso) ou Motul 7.5W; volume 530-550 mL por tubo; vedacao mais cara que bengala convencional',
    body: 'NXR 160 tem bengala invertida 37 mm (mais rigida, melhor para off-road) vs convencional da NXR 150. Bengala invertida: tubo externo se move, interno e fixo — retentor fica no topo do tubo externo. Troca de retentores exige mais desmontagem. Oleo: Honda SS-8 (7,5W) ou Motul Fork Oil 7.5W — 530-550 mL por tubo (vs 100 mL da NXR 125/150). Kit retentores bengala invertida 37 mm: R$90-150. Oleo escorrendo na parte superior da bengala: retentor do topo falhando. Inspecao: a cada 15.000 km ou sinal visivel de oleo.',
  },
  {
    severity: 'WARN',
    title: 'Protetor de motor — OBRIGATORIO antes da primeira trilha; cárter de aluminio vulneravel a pedra em 40 km/h',
    body: 'Cárter do motor GLH162 e de aluminio fundido — sem protecao, impacto de pedra em off-road perfura ou racha. Protetor original Honda NXR 160: R$380-550 (excelente encaixe mas custo elevado). Alternativa: protetor de aluminio 3 mm Tury ou Bela (R$180-320) com adaptadores de montagem universais. Acrilico nao serve — racha no primeiro impacto serio. Verificar parafusos de fixacao do protetor a cada 5.000 km — vibracao de trilha afrouxa progressivamente. Motor com cárter rachado: prohibido rodar — perde oleo e gripar.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428 — DID 428NZ-V (sem oring, facil de lavar) em uso predominante off-road; DID 428VX (com oring) para misto',
    body: 'Corrente 428 com pinhao 14T + coroa 44T (relacao mais curta que CG 160 para melhor torcao em off-road). Folga ideal: 20-30 mm no ponto central inferior (roda traseira na posicao de uso, sem carga). Em trilha com lama: lave a corrente com agua limpa apos cada saida e lubrifique imediatamente (Motul Chain Lube Off-Road ou DID Lube). Corrente seca em lama = abrasao severa de pinhao e coroa em < 5.000 km. Lubrifique a cada 300-400 km em trilha vs 500 km em asfalto. Troque o kit completo (corrente + pinhao + coroa) — nunca so a corrente.',
  },
  {
    severity: 'OK',
    title: 'Aibox e snorkel de ar — entupimento com lama em trilha fecha o motor imediatamente; limpe sempre antes de entrar em agua',
    body: 'Entrada de ar da NXR 160 fica na carenagem lateral direita, na altura do tanque — pode submerger em travessias profundas. Limite seguro sem adaptacao: agua ate metade da rodante (approx. 30 cm de profundidade). Snorkel elevador de ar (extensao da entrada de ar): peca de R$30-60 que eleva a entrada ate 60-70 cm. Filtro de ar da NXR 160 e de papel (diferente da NXR 150 que e esponja) — mais eficiente mas NAO lavavel. Filtro molhado: deixe secar completamente ao sol antes de usar (3-4 h). Filtro molhado fechado = motor sem ar = motor afoga ou nao parte.',
  },
]

const NXR160ESDD_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Luz FI piscando — DTC 7 (IAT) e o codigo mais comum na NXR 160 ESDD; exposicao a chuva corroi conector mais rapido que em motos de rua',
    body: 'NXR 160 em off-road e exposicao a chuva: conector do sensor IAT oxida mais rapido que em moto de rua. Leitura de DTC via conector SCS (sob o banco). Codigo 7: limpe o conector IAT com spray de contato e aplique graxa dieletrica — resolve em 70% dos casos sem troca. Codigo 8 (TPS): calibracao com scanner HIM antes de qualquer troca de peca. Codigo 21 (sonda lambda): aplica so ao MIX FLEXONE — ESDD (gasolina) nao tem sonda lambda. DTC falso: bateria fraca gera multiplos codigos — carregue a bateria primeiro.',
  },
  {
    severity: 'WARN',
    title: 'Bengala invertida 37 mm — retentor no topo: falha comum entre 20.000-35.000 km; oleo escorrendo na parte alta = parada imediata',
    body: 'Retentor no topo da bengala invertida e o mais solicitado: recebe o peso total da moto + impactos ao pousar. Vida util: 20.000-35.000 km em uso off-road vs 40.000-60.000 km em asfalto. Oleo escorrendo na parte alta da bengala (acima do guardapo): retentor falhando. Nao rode com bengala vazando — oleo no pneu = queda. Kit retentores bengala invertida 37 mm Honda NXR 160: R$90-150. Troca exige ferramentas especificas — se nao tiver experiencia com bengala invertida, leve a um mecanico especializado em trail.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedor traseiro monoshock — original inadequado para uso off-road pesado; fundido em oleo em 15.000 km de trilha intensa',
    body: 'Amortecedor monoshock original da NXR 160 e calibrado para uso misto moderado. Off-road pesado (trilhas tecnicas, saltos, raizes): oleo interno superaquece e perde viscosidade em 15.000 km. Sintoma: moto "batendo fundo" em impactos que antes absorvia. Upgrade recomendado para uso off-road intenso: YSS MZ456-355TRL-10 (especifico NXR 160, R$400-600), WP Performance ou Ohlins (R$800-1.500, qualidade premium). Sem upgrade, desgaste se transmite para o quadro traseiro (fadiga das soldas).',
  },
  {
    severity: 'DANGER',
    title: 'Pinhao de 14 dentes com desgaste rapido em uso off-road — pinhao com dentes em "gancho" destroi corrente nova em < 5.000 km',
    body: 'Pinhao 14T original da NXR 160 desgasta mais rapido que em motos de rua por sobrecarga off-road. Pinhao com dentes em formato de onda ou "gancho" (vs dentes retos simetricos do pinhao novo): troca imediata. Nunca instale corrente nova em pinhao gasto — a corrente nova se encaixa nos dentes gastos de forma incorreta e desgasta em < 5.000 km. Kit JT Sprockets: JTF237 14T (pinhao, R$35-55) + JTR1134 44T (coroa NXR 160) + corrente DID 428VX. Custo total R$220-320 vs kit original Honda R$450-650.',
  },
]

// ─── NXR 160 BROS MIX FLEXONE (2020-2024) ───────────────────────────────────

const NXR160MIX_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'MIX FLEXONE — sonda lambda de banda larga calcula proporcao gasolina/etanol automaticamente; pode abastecer com qualquer mistura',
    body: 'O sufixo FLEXONE indica sistema de injecao de dupla combustivel. Sonda lambda de banda larga mede a composicao de oxigenio no escapamento e ajusta a injecao em tempo real para qualquer mistura E25-E100. Consumo: 35-40 km/L com etanol E100, 38-45 km/L com gasolina (varia muito com uso off-road). Em off-road intenso, consumo pode cair para 25-30 km/L. Tanque 13 L: autonomia mininima de 325 km (pior caso: off-road + etanol). Sensor de detonacao (knock): protege o motor se usar etanol de qualidade ruim.',
  },
  {
    severity: 'WARN',
    title: 'Sonda lambda — DTC 21 na MIX FLEXONE e critico; motor opera com mapa fixo pobre que pode queimar valvula de escape com E100',
    body: 'A sonda lambda e o componente mais exclusivo do MIX FLEXONE vs ESDD. Com falha (DTC 21): ECU usa mapa de injecao fixo — pode ser muito pobre com etanol puro, causando detonacao e risco de queima da valvula de escape em rotacoes altas. Nao rode com DTC 21 ativo e motor a alta rotacao por mais de 100 km. Sonda lambda Denso compativel: R$150-250. Honda original: R$280-380. Em off-road: nao ignore a luz FI — leia o codigo antes de assumir que e algo simples.',
  },
  {
    severity: 'OK',
    title: 'Etanol E100 em off-road — motor frio em dias frios abaixo de 10°C pode ter dificuldade de partida com E100; gasolina facilita a partida',
    body: 'Etanol tem menor pressao de vapor que gasolina — motor frio com E100 abaixo de 10°C pode exigir 3-5 tentativas de partida (normal). O MIX FLEXONE tem aquecimento eletrico do injetor para facilitar partida a frio, mas nao elimina completamente o problema em dias muito frios. Solucao pratica: em dias frios (<10°C), use mistura com pelo menos 30% de gasolina. Em regioes frias (Sul do Brasil, invernos rigorosos): manter a moto com 50% gasolina facilita partidas em dias frios sem nenhuma perda de desempenho.',
  },
  {
    severity: 'WARN',
    title: 'Filtro de ar de papel — MIX FLEXONE tem sistema de admissao identico ao ESDD; filtro molhado ou sujo empobrece mistura flex e gera DTC erroneamente',
    body: 'Filtro de papel da NXR 160 MIX FLEXONE: mesma manutencao que ESDD — inspetar a cada 4.000 km (estrada) ou 2.000 km (trilha). Com filtro parcialmente entupido, o sensor IAT detecta menos fluxo de ar e a ECU do FLEXONE pode interpretar como sensor com falha, gerando DTC ciclico. Causa real: filtro sujo. Troque o filtro antes de diagnosticar qualquer DTC relacionado a ar/combustivel. Filtro original Honda NXR 160: R$40-65. Filtro molhado em trilha: aguarde secar — nao lave nem seque com ar comprimido.',
  },
]

const NXR160MIX_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Limpeza da tela interna da bomba de combustivel — etanol com impureza entope a tela em 20.000 km de uso predominante de alcool',
    body: 'Com uso predominante de etanol E100 (especialmente de usinas locais com qualidade variavel), a tela interna da bomba acumula impurezas do etanol mais rapido que com gasolina. Sintoma: motor falhando em alta rotacao (falta de combustivel) ou pressao de injecao caindo (verificar com manometro: deve ser 2,8-3,2 bar com motor ligado). Limpeza da tela: R$60-100 (desmonte parcial do tanque). Preventivo a cada 20.000 km em uso de alcool. Bomba nova Honda: R$350-500.',
  },
  {
    severity: 'WARN',
    title: 'DTC 21 (sonda lambda) falso por aterramento ruim — antes de comprar sonda nova, limpe o ponto de aterramento do ECU',
    body: 'Sonda lambda Denso da NXR 160 MIX FLEXONE e confiavel — mas o DTC 21 pode ser causado por mau contato no ponto de aterramento do ECU ou conector da sonda oxidado em moto de off-road. Custo de investigacao: R$0 (limpeza do aterramento + conector) vs R$150-380 (sonda nova). Procedimento: localize o parafuso de aterramento do ECU (geralmente no quadro lateral), remova, lixe o ponto de contato ate metal brilhante, reinstale com graxa dieletrica. Faca isso antes de qualquer diagnostico de sonda.',
  },
  {
    severity: 'WARN',
    title: 'Vibracoes acima de 90 km/h com pneu 80/100-21 — aro 21" e mais sensivel a desequilibrio; balancear com balancadeira especifica para moto',
    body: 'Roda 21" com desequilibrio de 5g ja causa vibracao perceptivel acima de 80 km/h — mais sensivel que rodas 17" ou 18". Balancear a roda 21" exige balancadeira de moto (nao de carro). Apos cada troca de pneu: balancear obrigatoriamente. Pneu com carcaca danificada por buraco em velocidade: pode desequilibrar mesmo balanceado externamente (dano interno assimetrico). Vibracao em velocidade especifica mas desaparece em velocidades proximas = desequilibrio de pneu. Vibracao em toda a faixa de velocidade = rolamento de roda ou pino de secao danificado.',
  },
]

// ─── Tire Pressures ───────────────────────────────────────────────────────────

const TIRE_PRESSURES = [
  {
    modelName: 'NXR 125 BROS ES',
    yearFrom: 2004, yearTo: 2006,
    tireSize: '70/100-19 (F) · 90/90-18 (R)',
    frontPsi: 29, rearPsi: 32, frontPsiLoad: 29, rearPsiLoad: 35,
    notes: 'Aro 19" dianteiro exclusivo da NXR 125 — nao confundir com NXR 150 (18") ou NXR 160 (21"). Off-road: 22 PSI F / 26 PSI R. Retorne ao valor de asfalto antes de rodar em velocidade.',
  },
  {
    modelName: 'NXR 125 BROS KS',
    yearFrom: 2004, yearTo: 2006,
    tireSize: '70/100-19 (F) · 90/90-18 (R)',
    frontPsi: 29, rearPsi: 32, frontPsiLoad: 29, rearPsiLoad: 35,
    notes: 'Aro 19" dianteiro exclusivo da NXR 125 — nao confundir com NXR 150 (18") ou NXR 160 (21"). Off-road: 22 PSI F / 26 PSI R. Retorne aos valores de asfalto antes de rodar em velocidade.',
  },
  {
    modelName: 'NXR 150 BROS ES',
    yearFrom: 2006, yearTo: 2012,
    tireSize: '80/100-18 (F) · 90/90-18 (R)',
    frontPsi: 29, rearPsi: 32, frontPsiLoad: 29, rearPsiLoad: 35,
    notes: 'Aro 18" nos dois eixos. Tambor dianteiro: pressao correta evita desgaste irregular da lona. Off-road: 22 PSI F / 26 PSI R. Calibre sempre com pneu frio antes de sair.',
  },
  {
    modelName: 'NXR 150 BROS ESD',
    yearFrom: 2006, yearTo: 2015,
    tireSize: '80/100-18 (F) · 90/90-18 (R)',
    frontPsi: 29, rearPsi: 32, frontPsiLoad: 29, rearPsiLoad: 35,
    notes: 'Aro 18" F e R. Disco dianteiro: pressao incorreta compromete frenagem em off-road (pneu baixo escorrega mais em terra). Off-road: 22 PSI F / 26 PSI R. Retorne ao valor de asfalto antes de rodar em velocidade.',
  },
  {
    modelName: 'NXR 150 BROS KS',
    yearFrom: 2006, yearTo: 2012,
    tireSize: '80/100-18 (F) · 90/90-18 (R)',
    frontPsi: 29, rearPsi: 32, frontPsiLoad: 29, rearPsiLoad: 35,
    notes: 'Mesma especificacao da ES. Off-road: 22 PSI F / 26 PSI R. Sem indicador de pressao no painel — use manometro fisico portátil a cada saida.',
  },
  {
    modelName: 'NXR 160 BROS ESDD',
    yearFrom: 2015, yearTo: 2024,
    tireSize: '80/100-21 (F) · 90/90-18 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Aro 21" dianteiro exclusivo da NXR 160 — balancear com balancadeira especifica para moto trail. Off-road: 22 PSI F / 27 PSI R. Com garupa ou carga: +3 PSI no traseiro. Pneu 21" com mais de 5 anos: troque mesmo com sulco visivel.',
  },
  {
    modelName: 'NXR 160 BROS MIX FLEXONE',
    yearFrom: 2020, yearTo: 2024,
    tireSize: '80/100-21 (F) · 90/90-18 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Identico ao ESDD em rodas e pressoes. Aro 21" F. Off-road: 22 PSI F / 27 PSI R. Balancear apos cada troca — sensivel a desequilibrio acima de 80 km/h.',
  },
]

// ─── Manutencao ───────────────────────────────────────────────────────────────

const makeNXR125 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Oleo do motor 10W-30 JASO MA + troca', intervalKm: 3000, intervalMonths: 6, notes: '~0,9 L (sem filtro remov. no 125). JASO MA obrigatorio — embreagem molhada. Observe particulas metalicas — incomum em motor bem mantido.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de valvulas (adm 0,05 mm / esc 0,10 mm)', intervalKm: 6000, intervalMonths: 12, notes: 'Motor frio, PMS de compressao. Tampa lateral do cabecote. Folga zero no escape queima assento sem sintoma.', priority: 'CRITICAL', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK C7HSA (gap 0,6-0,7 mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Ajuste o gap com calibrador de laminas. Para off-road pesado: C8HSA. Carregar vela reserva em trilhas.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar (espuma) — limpeza e reimpregnar com oleo', intervalKm: 3000, intervalMonths: 6, notes: 'Apos trilha com lama: lave com gasolina, seque, aplique 10 mL oleo SAE 30, esprema o excesso. NUNCA ar comprimido.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Carburador Keihin PE24 — limpeza completa', intervalKm: 12000, intervalMonths: 18, notes: 'Cuba, palheta, jatos. Gasolina velha cria verniz nos jatos em 3-4 meses de inatividade. Custo: R$50-100.', priority: 'MEDIUM', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 428 — lubrificacao e verificacao de folga', intervalKm: 400, intervalMonths: null, notes: 'Folga: 20-30 mm. Lavar apos cada trilha com lama. DID 428NZ-V (off-road) ou DID 428VX (misto).', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit corrente 428 completo (corrente + coroa + pinhao)', intervalKm: 15000, intervalMonths: null, notes: 'Em off-road intenso: 10.000-12.000 km. Nunca troque so a corrente — pinhao/coroa gastos destroem a nova.', priority: 'HIGH', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Oleo da bengala dianteira (Honda SS-7 10W)', intervalKm: 15000, intervalMonths: 24, notes: '100 mL por tubo. Retentores Ariete 32 mm: trocar juntos. Oleo escorrendo na haste = parada imediata.', priority: 'HIGH', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Mecanismo de kick start — lubrificacao', intervalKm: 10000, intervalMonths: 18, notes: 'Graxa EP no mecanismo de ratchet. Mola de retorno: verificar fadiga. Pino detent: checar desgaste.', priority: 'MEDIUM', order: 9 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Lona dianteira + ajuste de cabo (tambor)', intervalKm: 8000, intervalMonths: null, notes: 'Folga no cabo: 10-20 mm na alavanca. Lona com mancha de oleo: troca obrigatoria. NUNCA lubrificar o tambor.', priority: 'HIGH', order: 10 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Lona traseira + ajuste de pedal (tambor)', intervalKm: 10000, intervalMonths: null, notes: 'Curso livre do pedal: 20-30 mm. Pedal com folga excessiva apos ajuste maximo = lonas gastas.', priority: 'MEDIUM', order: 11 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Estator e regulador/retificador (verificar tensao)', intervalKm: null, intervalMonths: 24, notes: 'Com motor a 3.000 rpm: 14-16V CA no estator (fios amarelo e verde). Regulador: 13,8-14,5V CC. Luzes fracas em alta rotacao = estator ou regulador.', priority: 'MEDIUM', order: 12 },
]

const makeNXR150 = (
  m: string, yf: number, yt: number,
  hasFrontDisc: boolean, isKS: boolean
): MaintenanceItemInput[] => {
  const items: MaintenanceItemInput[] = [
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Oleo do motor 10W-30 JASO MA2 + filtro', intervalKm: 3000, intervalMonths: 6, notes: '1,0 L com filtro. JASO MA2 obrigatorio. Off-road: 2.000 km. Hiflofiltro HF303 como alternativa economica ao original Honda.', priority: 'CRITICAL', order: 1 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de valvulas (adm 0,05 mm / esc 0,10 mm)', intervalKm: 6000, intervalMonths: 12, notes: 'Motor frio, PMS de compressao. DIFERENTE da NXR 160 (adm 0,07 mm). Folga zero no escape = queima assento.', priority: 'CRITICAL', order: 2 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK CPR6EA-9 (gap 0,7 mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Gap: 0,70 mm. Para off-road intenso: CPR7EA-9 (grau termico mais quente). Carregar reserva em trilhas longas.', priority: 'HIGH', order: 3 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar (espuma) — limpeza e reimpregnar com oleo', intervalKm: 3000, intervalMonths: 6, notes: 'Trilha com lama: lave com gasolina, seque, aplique 10 mL oleo SAE 30. NUNCA ar comprimido na espuma.', priority: 'HIGH', order: 4 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Carburador — limpeza e regulagem', intervalKm: 12000, intervalMonths: 18, notes: 'Jato principal, agulha, piloto. Parafuso de mistura: 2,5 voltas abertas padrao. Moto guardada por meses: limpeza antes de usar.', priority: 'MEDIUM', order: 5 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 428 — lubrificacao e verificacao de folga', intervalKm: 400, intervalMonths: null, notes: 'Folga: 20-30 mm. Lavar apos trilha com lama. DID 428NZ-V para off-road pesado.', priority: 'HIGH', order: 6 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit corrente 428 completo', intervalKm: 14000, intervalMonths: null, notes: 'Off-road intenso: 10.000 km. Pinhao 14T + coroa 44T + corrente DID 428NZ/VX.', priority: 'HIGH', order: 7 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Oleo da bengala dianteira 35 mm (Honda SS-7 10W)', intervalKm: 15000, intervalMonths: 24, notes: '100 mL por tubo. Retentores Ariete 35 mm. Off-road: vida util reduzida para 12.000-15.000 km.', priority: 'HIGH', order: 8 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Lona traseira + ajuste de pedal (tambor)', intervalKm: 10000, intervalMonths: null, notes: 'Curso livre: 20-30 mm. Fras-le ou Honda original. Tambor: NUNCA aplicar lubrificante.', priority: 'MEDIUM', order: 9 },
  ]

  if (hasFrontDisc) {
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas dianteiras + fluido DOT 4 (disco 245 mm)', intervalKm: 8000, intervalMonths: 24, notes: 'Off-road: 6.000 km. Fras-le MA-2011 ou EBC FA068HH. Fluido DOT 4: 24 meses. Disco: minimo 3,0 mm. Pinca: rebuild a cada 20.000 km.', priority: 'HIGH', order: 10 })
  } else {
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Lona dianteira + ajuste de cabo (tambor)', intervalKm: 8000, intervalMonths: null, notes: 'Cabo: lubrificar a cada 6.000 km. Folga: 10-20 mm na alavanca. Lona com oleo = troca imediata.', priority: 'HIGH', order: 10 })
  }

  if (!isKS) {
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria YTZ5S 12V 5Ah — verificacao de tensao', intervalKm: null, intervalMonths: 6, notes: 'Repouso: 12,6 V. A 4.000 rpm: 13,8-14,5 V. Abaixo de 12,0 V = substituicao. Bateria fraca causa dificuldade de partida a frio.', priority: 'MEDIUM', order: 11 })
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Motor de partida eletrico (escovas e comutador)', intervalKm: 50000, intervalMonths: null, notes: 'Escovas: troca quando < 5 mm. Comutador: lixar com lixa 400. Click sem girar = rele ou escovas.', priority: 'LOW', order: 12 })
  } else {
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Mecanismo de kick start — lubrificacao e mola de retorno', intervalKm: 10000, intervalMonths: 18, notes: 'Graxa EP no ratchet. Mola de retorno: R$15-30 em desmanches. Pino detent: checar desgaste.', priority: 'MEDIUM', order: 11 })
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Estator e regulador — verificar tensao de saida', intervalKm: null, intervalMonths: 24, notes: 'No estator a 3.000 rpm: 14-16V CA. Luzes fracas em alta rotacao = problema no estator.', priority: 'MEDIUM', order: 12 })
  }

  return items
}

const makeNXR160 = (
  m: string, yf: number, yt: number,
  isFlex: boolean
): MaintenanceItemInput[] => {
  const items: MaintenanceItemInput[] = [
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Oleo do motor 10W-30 JASO MA2 + filtro', intervalKm: 3000, intervalMonths: 6, notes: '1,0 L com filtro. JASO MA2 obrigatorio. Off-road: 2.500 km. Hiflofiltro HF303. Motor identico ao CG 160.', priority: 'CRITICAL', order: 1 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de valvulas (adm 0,07 mm / esc 0,08 mm)', intervalKm: 6000, intervalMonths: 12, notes: 'Motor frio. DIFERENTE da NXR 150 (adm 0,05 mm). Mecanico que so conhece NXR 150 vai regular errado. Folga zero = queima assento.', priority: 'CRITICAL', order: 2 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK CPR7EA-9 (iridium, gap pre-setado)', intervalKm: 15000, intervalMonths: 24, notes: 'NAO ajuste o gap — eletrodo de iridium fragil. Gap de fabrica: 0,9 mm. Alternativa: Denso IU24.', priority: 'HIGH', order: 3 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar (papel) — inspecao e troca', intervalKm: 4000, intervalMonths: 12, notes: 'Trilha: inspete a cada 2.000 km. Filtro molhado: deixe secar ao sol (3-4 h) antes de usar. NAO lave. Off-road: troca a cada 8.000 km.', priority: 'HIGH', order: 4 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Limpeza do IACV (Idle Air Control Valve)', intervalKm: 8000, intervalMonths: 12, notes: 'Off-road: marcha lenta oscilante mais frequente. Spray EFI Cleaner + ar comprimido. DTC 29 = IACV com falha confirmada.', priority: 'HIGH', order: 5 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 428 — lubrificacao e verificacao de folga', intervalKm: 400, intervalMonths: null, notes: 'Off-road: a cada 300 km. Lavar lama + relubrifar. DID 428NZ-V (facil de lavar) ou DID 428VX (reforçada). Folga: 20-30 mm.', priority: 'HIGH', order: 6 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit corrente 428 completo (JTF237 14T + JTR1134 44T + DID 428VX)', intervalKm: 13000, intervalMonths: null, notes: 'Off-road intenso: 10.000 km. Pinhao com dentes em "gancho" destroi corrente nova. Troque o kit completo.', priority: 'HIGH', order: 7 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Oleo da bengala invertida 37 mm (Honda SS-8 7,5W)', intervalKm: 15000, intervalMonths: 24, notes: '530-550 mL por tubo. Bengala invertida: retentores no topo — troca mais complexa que convencional. Off-road: 12.000 km.', priority: 'HIGH', order: 8 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas dianteiras + fluido DOT 4 (disco dianteiro)', intervalKm: 8000, intervalMonths: 24, notes: 'Off-road: 6.000 km (lama abrasiva). EBC FA142HH ou Honda original. Disco: minimo 2,5 mm. Fluido DOT 4: 24 meses.', priority: 'HIGH', order: 9 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Lona traseira + ajuste de pedal (tambor)', intervalKm: 10000, intervalMonths: null, notes: 'Curso livre: 20-30 mm. Fras-le ou Honda original. Off-road: inspete a cada 6.000 km.', priority: 'MEDIUM', order: 10 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Scanner PGM-FI — leitura de DTCs', intervalKm: null, intervalMonths: 12, notes: 'Off-road: mais frequente por exposicao a agua/lama. DTC 7 (IAT) e mais comum na NXR 160.', priority: 'MEDIUM', order: 11 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria YTZ7S 12V 7Ah — verificacao de tensao', intervalKm: null, intervalMonths: 6, notes: 'Repouso: 12,6 V. A 4.000 rpm: 13,8-14,5 V. Bateria fraca gera DTCs falsos.', priority: 'MEDIUM', order: 12 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Amortecedor traseiro monoshock — inspecao de oleo e preload', intervalKm: 15000, intervalMonths: null, notes: 'Off-road intenso: fundido em oleo em 15.000 km. Upgrade YSS MZ456-355TRL-10 para uso trail sério.', priority: 'HIGH', order: 13 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Protetor de motor — verificacao de fixacao', intervalKm: 5000, intervalMonths: null, notes: 'Vibracoes de trilha afrouxam parafusos progressivamente. Torque de aperto: 12 Nm. Cárter sem protecao = risco de rachadura em pedras.', priority: 'HIGH', order: 14 },
  ]

  if (isFlex) {
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Sonda lambda — verificacao e conector', intervalKm: 30000, intervalMonths: null, notes: 'DTC 21 = sonda com falha. Motor opera com mapa fixo — risco de mistura pobre com E100. Denso: R$150-250. Limpe o aterramento antes de comprar sonda nova.', priority: 'HIGH', order: 15 })
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Limpeza da tela interna da bomba de combustivel', intervalKm: 20000, intervalMonths: null, notes: 'Com uso predominante de etanol: entope mais rapido. Sintoma: motor falhando em alta rotacao. Limpeza: R$60-100.', priority: 'MEDIUM', order: 16 })
  }

  return items
}

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS = [
  { modelName: 'NXR 125 BROS ES',          yearFrom: 2004, yearTo: 2006, MACETES: NXR125ES_MACETES,    PROBLEMAS: NXR125ES_PROBLEMAS },
  { modelName: 'NXR 125 BROS KS',          yearFrom: 2004, yearTo: 2006, MACETES: NXR125_MACETES,      PROBLEMAS: NXR125_PROBLEMAS  },
  { modelName: 'NXR 150 BROS ES',           yearFrom: 2006, yearTo: 2012, MACETES: NXR150ES_MACETES,    PROBLEMAS: NXR150ES_PROBLEMAS },
  { modelName: 'NXR 150 BROS ESD',          yearFrom: 2006, yearTo: 2015, MACETES: NXR150ESD_MACETES,   PROBLEMAS: NXR150ESD_PROBLEMAS },
  { modelName: 'NXR 150 BROS KS',           yearFrom: 2006, yearTo: 2012, MACETES: NXR150KS_MACETES,    PROBLEMAS: NXR150KS_PROBLEMAS },
  { modelName: 'NXR 160 BROS ESDD',         yearFrom: 2015, yearTo: 2024, MACETES: NXR160ESDD_MACETES,  PROBLEMAS: NXR160ESDD_PROBLEMAS },
  { modelName: 'NXR 160 BROS MIX FLEXONE',  yearFrom: 2020, yearTo: 2024, MACETES: NXR160MIX_MACETES,   PROBLEMAS: NXR160MIX_PROBLEMAS },
]

const ALL_MANUTENCAO: MaintenanceItemInput[] = [
  ...makeNXR125('NXR 125 BROS ES', 2004, 2006),
  ...makeNXR125('NXR 125 BROS KS', 2004, 2006),
  ...makeNXR150('NXR 150 BROS ES',  2006, 2012, false, false),
  ...makeNXR150('NXR 150 BROS ESD', 2006, 2015, true,  false),
  ...makeNXR150('NXR 150 BROS KS',  2006, 2012, false, true),
  ...makeNXR160('NXR 160 BROS ESDD',        2015, 2024, false),
  ...makeNXR160('NXR 160 BROS MIX FLEXONE', 2020, 2024, true),
]

// ─── Runner ───────────────────────────────────────────────────────────────────

async function main() {
  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })

  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Honda', vehicleTypeId: motoType.id } },
    update: {}, create: { name: 'Honda', vehicleTypeId: motoType.id },
  })

  const brand = await prisma.brand.findFirstOrThrow({
    where: { name: 'Honda', vehicleTypeId: motoType.id },
  })

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {}, create: { name: block.modelName, brandId: brand.id },
    })

    const allTips = [
      ...block.MACETES.map(t => ({ ...t, category: 'MACETES' as Cat })),
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
