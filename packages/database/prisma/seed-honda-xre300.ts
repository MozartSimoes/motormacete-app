// seed-honda-xre300.ts — Honda XRE 300 (todos os modelos FIPE)
// XRE 300 (2009-2024) · XRE 300 RALLY (2014-2024) · XRE 300 ABS (2019-2024)
// Motor: 286cc DOHC 4 valvulas (motor compartilhado com CB 300 Twister mas recalibrado)
// Valvulas adm 0,16 mm / esc 0,25 mm (DOHC — regimes de regulagem DIFERENTES do monocilindrico SOHC)
// Pneu dianteiro: 21" (a mais tradicional do segmento trail no Brasil desde 2009)
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

// ─── XRE 300 (2009-2024) ─────────────────────────────────────────────────────

const XRE300_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor DOHC 286cc — valvulas adm 0,16 mm / esc 0,25 mm; MUITO DIFERENTES do CG 150/160 (adm 0,05-0,07 mm); mecanico sem experiencia em DOHC vai errar',
    body: 'O motor da XRE 300 e DOHC 4 valvulas (duas arvores de cames — adm e esc separadas), enquanto CG e NXR sao SOHC 2 valvulas. As folgas de valvula sao significativamente maiores: adm 0,16 ±0,02 mm / esc 0,25 ±0,02 mm. Motor frio, PMS de compressao. DOHC com 4 valvulas = 2 admissao + 2 escape por cilindro = 4 folgas por regulagem (vs 2 no SOHC). Exige calibrador de laminas com laminas de 0,16 mm e 0,25 mm — muitas oficinas de interior nao tem. Intervalo: 12.000 km.',
  },
  {
    severity: 'OK',
    title: 'Oleo 10W-30 JASO MA2, 1,6 L com filtro — motor maior e refrigerado a oleo parcialmente (balanceiro em banho de oleo)',
    body: 'XRE 300 usa 1,6 L de oleo (vs 1,0 L da CG 160 ou NXR 150) — motor maior e com mais pecas em banho de oleo. Hiflofiltro HF303 compativel. Oleo 10W-30 padrao; em uso off-road intenso no verao: 10W-40 melhora a protecao a alta temperatura. Troca: 3.000 km (off-road) ou 4.000 km (uso misto estrada + trilha). Observe particulas metalicas na troca — incomum em motor bem mantido; se presentes com motor com menos de 30.000 km, investigue o balanceiro.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR8EH-9 — gap 0,8 mm; mesma vela da CB 300 Twister; carregar reserva em trilhas remotas',
    body: 'Vela original: NGK CR8EH-9 (R$20-30), gap 0,80 mm. Alternativa: Denso U24EPR9 (R$18-28). Iridium: NGK CR8EHIX-9 (R$70-95) — recomendado para uso off-road com muitas aceleracoes e desaceleracoes em baixa rotacao (evita acumulo de fuligem). Troca: 8.000 km (uso misto) ou 6.000 km (off-road intenso). Vela com deposito de fuligem preta: mistura rica (filtro sujo ou sensor MAF com problema). Vela esbranquicada: mistura pobre (motor superaquecendo ou sensor IAT falhando).',
  },
  {
    severity: 'WARN',
    title: 'Bengala invertida 43 mm (desde 2014) — oleo Honda SS-8 7,5W; 500-530 mL por tubo; retentores de vida util reduzida em off-road intenso',
    body: 'XRE 300 primeira geracao (2009-2013) tem bengala convencional 37 mm. A partir de 2014 (reforma): bengala invertida 43 mm com muito mais capacidade de absorver impactos. Oleo 7,5W: 500-530 mL por tubo. Retentores bengala 43 mm (Ariete ou Honda): R$90-150 o par. Bengala invertida: oleo escorrendo no topo = retentor no topo falhando — parada imediata (oleo no pneu = queda). Troca de retentores de bengala invertida e mais complexa que convencional — exige extrator especifico.',
  },
  {
    severity: 'OK',
    title: 'Protetor de motor de aluminio — OBRIGATORIO antes da primeira trilha; motores DOHC tem carter de aluminio mais extenso e vulneravel',
    body: 'O carter do motor DOHC da XRE 300 e mais largo que motores SOHC de 150cc — area de impacto maior em off-road. Protetor original Honda XRE 300: R$400-600 (encaixe perfeito). Alternativa: protetor Tury aluminio 4 mm (R$220-380). Acrilico ou plastico: NAO servem para off-road serio — rachados no primeiro impacto. Parafusos de fixacao: verificar torque a cada 5.000 km (12 Nm). Protetor que vibra solta parafusos mais rapido. Com mola de tensao adicional na fixacao: protetor permanece fixo mesmo em vibracao intensa.',
  },
  {
    severity: 'OK',
    title: 'Pneus 80/100-21 (F) · 110/90-18 (R) — XRE 300 tem traseiro 18" mais largo que NXR (90/90-18); mais tracao em lama com pneu correto',
    body: 'XRE 300 tem roda traseira 18" com pneu mais largo (110/90-18) que a NXR 160 (90/90-18). Opcoes traseiro 110/90-18: Pirelli MT15 (R$190-250), Metzeler Enduro 3 Sahara (R$220-280), Dunlop D606 (R$200-260). Dianteiro 80/100-21: mesmo da NXR 160. Em uso predominante de asfalto: Pirelli MT60RS (radial, R$280-350 traseiro). Calibragem off-road: 22 PSI F / 26 PSI R. Asfalto: 29 PSI F / 33 PSI R. Pneu traseiro mais largo = mais estabilidade em asfalto mas perde un pouco em trilhas com lama profunda.',
  },
  {
    severity: 'WARN',
    title: 'Corrente 520 — passo maior que CG (428); mais resistente mas exige lubrificante especifico; DID 520VX3 e a referencia para uso misto',
    body: 'XRE 300 usa corrente de passo 520 — mais robusta que a 428 da CG/NXR para suportar o torque maior do motor 286cc DOHC. DID 520VX3 (com oring, R$140-200) para uso misto estrada+trilha. Para off-road com lama: DID 520NZ (sem oring, mais facil de lavar, R$110-160). Coroa: 47 dentes (padrao). Pinhao: 15 dentes (padrao). Folga ideal: 30-40 mm (mais que CG/NXR — motociclo maior). Lubrificar a cada 400 km (asfalto) ou 200 km (trilha). Kit completo (corrente + coroa + pinhao): R$280-400 vs Honda original R$600-800.',
  },
]

const XRE300_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Regulagem de valvulas — intervalo 12.000 km OBRIGATORIO; XRE 300 ja chegou a clientes de concessionaria com folgas erradas de fabrica em alguns lotes',
    body: 'A regulagem de valvulas da XRE 300 e o principal servico negligenciado pelos proprietarios. Motor com folga de valvula zero na escapamento queima o assento silenciosamente — perda de compressao aparece so quando o dano ja e severo. Com motor frio: adm 0,16 ±0,02 mm / esc 0,25 ±0,02 mm. Exige mecanico com experiencia em motor DOHC. Oficina comum de CG/NXR: risco de regulagem incorreta. Custo na concessionaria: R$250-450. Em mecanico especializado em trail Honda: R$150-250.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedor traseiro original — inadequado para trilhas tecnicas; fundido em 20.000-25.000 km de uso off-road; upgrade recomendado antes de primeiro passeio longo',
    body: 'Amortecedor monoshock original da XRE 300 e calibrado para uso misto moderado. Em trilhas com pedras, valas e saltos: oleo interno superaquece e perde viscosidade rapidamente. YSS GD302-320TRL (especifico XRE 300, R$450-650) ou Ohlins S36E (R$1.200-1.800, premium) sao os mais recomendados. Amortecedor fundido: moto bate o batente de borracha em impactos medios — desconforto + risco de dano ao quadro. Sintoma precoce: sensacao de "esponja" na traseira sem firmeza ao empurrar a moto.',
  },
  {
    severity: 'WARN',
    title: 'Bengala invertida com vedacao fraca em uso off-road pesado — vida util dos retentores 15.000-20.000 km vs 40.000 km em asfalto',
    body: 'A bengala invertida 43 mm da XRE 300 (2014+) absorve muito mais impactos que a convencional da NXR. Cada impacto desgasta os retentores. Em trilha intensiva (uma saida de 2 dias por semana): retentores falham em 15.000-20.000 km. Oleo escorrendo no topo da bengala = nao rode sem consertar. Kit retentores 43 mm: R$100-160 o par. Apos cada trilha molhada: limpe a haste da bengala com pano limpo e seco — lama seca na haste raspa o retentor ao comprimir.',
  },
  {
    severity: 'DANGER',
    title: 'Motor 286cc com regulagem de valvulas zero — perde compressao silenciosamente ate nao dar a partida; nao ha sintoma visivel ate a falha avancada',
    body: 'Diferente do motor SOHC da CG que exibe batida metalica ao superaquecer, o motor DOHC da XRE 300 com valvula de escape queimando (por folga zero) perde compressao gradualmente sem barulho especifico. Sintoma inicial: dificuldade de partida a frio. Avancado: moto nao parte mesmo com vela e bateria boas. Compressionometro: pressao normal = 1.200-1.400 kPa. Abaixo de 900 kPa = valvula queimada ou aneis gastos. Reparo: R$800-2.000 dependendo do dano. Prevencao: regulagem de valvulas a cada 12.000 km sem falta.',
  },
]

// ─── XRE 300 RALLY (2014-2024) ───────────────────────────────────────────────

const XRE300RALLY_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'RALLY — mesmo motor DOHC 286cc da XRE 300 padrao; valvulas adm 0,16 mm / esc 0,25 mm; diferenciais: cowl de farol especifico e geometria de suspensao diferente',
    body: 'A XRE 300 RALLY compartilha 100% do motor, transmissao e eletrica com a XRE 300 padrao. Diferenciais exclusivos da RALLY: carenagem dianteira com cowl de farol retangular (visual de rally), guidao mais elevado (postura mais erguida em off-road), assento em posicao diferente para pilotagem em pe. Toda manutencao de motor, valvulas, oleo e corrente e identica a XRE 300 padrao. Pecas de motor: 100% intercambiaveis. Pecas de carenagem: exclusivas da RALLY.',
  },
  {
    severity: 'OK',
    title: 'Guidao mais alto da RALLY — postura de pilotagem em pe mais natural; ajustar espelhos para nova posicao do piloto antes da primeira saida',
    body: 'O guidao mais alto da RALLY melhora o controle em off-road ao pilotar em pe (padrao para trilha tecnica). Espelhos: apos ajustar para a nova postura (em pe), recalibre os retrovisores para a posicao sentado tambem — diferenca de angulo e significativa. Adaptacao: piloto acostumado a scooter ou moto urbana vai sentir fadiga nos bracos nas primeiras horas em trilha. 2-3 saidas para adaptar a musculatura. Guidon amassado apos queda: verificar alinhamento com a roda dianteira antes de usar.',
  },
  {
    severity: 'WARN',
    title: 'Cowl de farol da RALLY — plastico unico e caro; proteja com film de protecao ou grade de farol antes da trilha',
    body: 'O cowl triangular com farol retangular da XRE 300 RALLY e peça exclusiva — sem compatibilidade com XRE 300 padrao. Honda original: R$600-1.200 (caro). Nao ha alternativa nacional de qualidade. Prevencao: grade de farol (acrilico ou aço) por R$80-150 protege o vidro. Film de protecao PPF (mesmo tipo dos carros) pode ser aplicado no plastico para minimizar arranhoes de gravetos. Queda lateral em trilha: protetor de motor + protetor lateral de carenagem minimizam danos ao cowl.',
  },
  {
    severity: 'OK',
    title: 'Suspensao da RALLY com geometria ligeiramente diferente da padrao — nao use partes de suspensao da XRE 300 normal na RALLY sem consultar o manual',
    body: 'A XRE 300 RALLY tem angulacao de castor e offset de bengala ligeiramente diferentes da XRE 300 padrao para melhorar a estabilidade em alta velocidade em trilha. Bengala: mesma marca e diametro (43 mm invertida), mas comprimento de curso pode ser diferente conforme a geracao. Ao substituir bengala: confirme a altura da bengala correta para a RALLY especificamente. Amortecedor traseiro: mesmo que a XRE 300 padrao (comprimento 320 mm) — intercambiaveis.',
  },
]

const XRE300RALLY_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Carenagem exclusiva da RALLY mais vulneravel em quedas — precos de pecas de plastico muito acima da XRE padrao; investir em protecoes antes do uso off-road',
    body: 'Parece paradoxal: a XRE 300 RALLY com mais equipamento off-road tem carenagens mais caras. Protecoes recomendadas antes da primeira trilha: (1) protetor lateral de carenagem (R$80-150 o par), (2) protetor de motor de aluminio (R$220-380), (3) protetor de escape (R$60-120), (4) capacete com guarda-queixo (nao aberto). Custo total de protecoes: R$450-750. Custo de reparo de carenagem apos queda sem protecao: R$800-2.000. Matematica favoravel ao investimento em protecoes.',
  },
  {
    severity: 'WARN',
    title: 'Mesmo defeito da XRE 300 padrao: valvulas com folga zero silenciando o motor progressivamente; RALLY usada em rally-raid real exige inspecao a cada 8.000 km',
    body: 'XRE 300 RALLY usada em competicoes ou treinos intensos: intervalo de regulagem de valvulas deve ser reduzido para 8.000 km (vs 12.000 km do uso normal). Vibracoes maiores + rotacoes mais altas em competicao aceleram o assentamento das valvulas. Sempre leve a XRE para revisao apos um rally-raid (competicao) ou passeio de 4+ dias em trilha. Compressao abaixo de 1.100 kPa: valvulas precisam de atencao antes da proxima saida.',
  },
]

// ─── XRE 300 ABS (2019-2024) ────────────────────────────────────────────────

const XRE300ABS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'ABS Honda (HEABS) — sistema com modo off para off-road; DESABILITAR o ABS ao entrar em trilha evita interferencia em frenagem sobre lama',
    body: 'A XRE 300 ABS tem o sistema Honda HEABS que pode ser desabilitado pressionando o botao no painel (ou longo press dependendo da geracao). EM OFF-ROAD: desabilite o ABS — em terra solta ou lama, o ABS pode impedir que a roda trave parcialmente (o que e desejavel para criar sulco de frenagem). Com ABS ativo em lama: a roda continua girando enquanto o ABS "pulsa" — a moto desliza mais. Ao retornar ao asfalto: REABILITE o ABS. ABS desabilitado automaticamente ao desligar e religar a moto em algumas versoes — confirme no manual.',
  },
  {
    severity: 'WARN',
    title: 'Sensor ABS na roda dianteira — sensor acumula lama e suja apos trilha; limpar apos cada saida off-road para evitar DTC de ABS falso',
    body: 'Anel dentado do ABS (sensor de velocidade) na roda dianteira da XRE 300 ABS fica exposto a lama em off-road. Lama seca sobre o sensor: interferencia no sinal e DTC de ABS (luz amarela de ABS no painel). Limpeza pos-trilha: agua limpa com mangueira suave sobre a roda dianteira, sem pressao de lavajato direto no sensor. Sensor com DTC persistente mesmo limpo: substituicao Honda (R$200-350). Anel dentado amassado (queda lateral): troca do anel (R$80-150).',
  },
  {
    severity: 'OK',
    title: 'Sistema de freio ABS com fluido DOT 4 — dois circuitos com modulo ABS; purge mais complexo que sistema simples; leve a mecanico especializado',
    body: 'O modulo ABS da XRE 300 ABS adiciona complexidade ao sistema de purge de fluido. Fluido DOT 4: troca obrigatoria a cada 24 meses (mesmo que em sistemas sem ABS). O modulo ABS tem acumuladores internos de pressao — purge incorreto deixa ar nos acumuladores e o ABS pode pulsar de forma irregular. Em oficinas sem scanner que acesse o modulo ABS Honda: o purge manual pode ser insuficiente. Recomenda-se scanner com funcao de purge guiado do modulo ABS para trocar o fluido corretamente.',
  },
  {
    severity: 'WARN',
    title: 'Modulo ABS com falha eletrica — custo de substituicao alto (R$800-1.500); DTC de ABS nao impede o uso da moto mas o ABS fica desabilitado permanentemente',
    body: 'Falha no modulo ABS da XRE 300: luz amarela de ABS permanente no painel. A moto continua funcionando normalmente — os freios funcionam sem o ABS (como a XRE 300 padrao). A Honda desabilita o ABS automaticamente ao detectar falha no modulo. Diagnose: scanner Honda HIM ou similar que acesse o sistema ABS. Modulo ABS novo Honda: R$800-1.500. Modulo recondicionado: R$400-700 (qualidade variavel). Em trilha com ABS em falha: moto funciona normalmente — o ABS e um dispositivo de segurança adicional, nao essencial para o funcionamento.',
  },
]

const XRE300ABS_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Sensor ABS entopendo com lama fina — causa mais comum de DTC de ABS em uso off-road; inspecao pos-trilha e limpeza preventiva',
    body: 'Lama fina (diferente de terra grossa) se deposita sobre os dentes do anel do sensor ABS com mais facilidade. A lama seca cria uma camada que interfere no sinal magnetico do sensor. Ao chegar de trilha: mangueira de agua em pressao baixa sobre a roda dianteira. Nao use lavajato — pressao alta pode danificar o sensor. DTC de ABS que aparece ap os trilha mas some apos lavagem = sujeira no sensor. DTC persistente apos lavagem: sensor danificado ou anel dentado amassado.',
  },
  {
    severity: 'WARN',
    title: 'Fluido DOT 4 envelhecendo no modulo ABS — troca de fluido mais critica em sistema ABS por acumuladores internos que reteem fluido velho',
    body: 'O modulo ABS tem acumuladores internos que ficam com fluido aprisionado se o purge for feito sem scanner. Fluido velho no acumulador reduz o ponto de ebulicao do sistema inteiro em frenagens repetidas (descida de morro). Sintoma: luz de ABS pulsando de forma irregular em frenagens de emergencia. Troca com scanner: funcao de purge guiado garante que o fluido dos acumuladores seja substituido. Custo adicional vs sistema sem ABS: R$50-100 de mao de obra extra para o purge guiado.',
  },
]

// ─── Tire Pressures ───────────────────────────────────────────────────────────

const TIRE_PRESSURES = [
  {
    modelName: 'XRE 300',
    yearFrom: 2009, yearTo: 2024,
    tireSize: '80/100-21 (F) · 110/90-18 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Aro 21" F / 18" R. Off-road: 22 PSI F / 26 PSI R. Com garupa: 29/36 PSI asfalto. Aro 21" sensivel a desequilibrio — balancear em cada troca de pneu. Pneu 21" com mais de 4 anos: troque.',
  },
  {
    modelName: 'XRE 300 RALLY',
    yearFrom: 2014, yearTo: 2024,
    tireSize: '80/100-21 (F) · 110/90-18 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Identica a XRE 300 padrao em rodas e pressoes. Em competicao (rally-raid): 20 PSI F / 24 PSI R em terra. Retorne sempre ao padrao antes de rodar em asfalto por distancias longas.',
  },
  {
    modelName: 'XRE 300 ABS',
    yearFrom: 2019, yearTo: 2024,
    tireSize: '80/100-21 (F) · 110/90-18 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Mesmas dimensoes. ABS: pressao muito baixa compromete o funcionamento do sistema (sensor de velocidade). Off-road com ABS off: 22 PSI F / 26 PSI R. Reabilite ABS ao retornar ao asfalto.',
  },
]

// ─── Manutencao ───────────────────────────────────────────────────────────────

const makeXRE300 = (
  m: string, yf: number, yt: number,
  hasABS: boolean, hasInvertedFork: boolean
): MaintenanceItemInput[] => {
  const items: MaintenanceItemInput[] = [
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Oleo do motor 10W-30 JASO MA2 + filtro', intervalKm: 4000, intervalMonths: 6, notes: '1,6 L com filtro. Off-road: 3.000 km. Hiflofiltro HF303. Motor DOHC tem maior volume de oleo que SOHC de 150cc.', priority: 'CRITICAL', order: 1 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de valvulas DOHC (adm 0,16 mm / esc 0,25 mm)', intervalKm: 12000, intervalMonths: 18, notes: 'Motor frio. 4 valvulas = 2 adm + 2 esc. MUITO DIFERENTES do SOHC (adm 0,05-0,07). Exige mecanico com experiencia em DOHC. Off-road intenso: 8.000 km.', priority: 'CRITICAL', order: 2 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK CR8EH-9 (gap 0,8 mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Off-road: 6.000 km. Iridium CR8EHIX-9 para uso intenso. Vela suja indica mistura rica (filtro entupido ou sensor com problema).', priority: 'HIGH', order: 3 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar (papel) — inspecao e troca', intervalKm: 4000, intervalMonths: 6, notes: 'Off-road com lama: inspete apos cada saida. Troca: 8.000 km (trilha) ou 12.000 km (estrada). Filtro molhado: secar completamente antes de usar.', priority: 'HIGH', order: 4 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Limpeza do IACV (Idle Air Control Valve)', intervalKm: 8000, intervalMonths: 12, notes: 'Marcha lenta oscilante ou moto apagando. Spray EFI Cleaner. Off-road: intervalo reduzido.', priority: 'HIGH', order: 5 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 520 — lubrificacao e verificacao de folga', intervalKm: 400, intervalMonths: null, notes: 'Folga: 30-40 mm. Off-road: 200 km. DID 520VX3 (misto) ou DID 520NZ (off-road). Lavar lama + relubrifar.', priority: 'HIGH', order: 6 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit corrente 520 (DID 520VX3 + coroa 47T + pinhao 15T)', intervalKm: 20000, intervalMonths: null, notes: 'Off-road intenso: 15.000 km. Pinhao com dentes em gancho + corrente nova = desgaste prematuro. Troque o kit completo.', priority: 'HIGH', order: 7 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Protetor de motor — verificacao de fixacao', intervalKm: 5000, intervalMonths: null, notes: 'Parafusos de fixacao: 12 Nm. Vibracoes de trilha afrouxam. Carter DOHC e mais largo e mais caro de consertar que SOHC.', priority: 'HIGH', order: 8 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Amortecedor traseiro — inspecao de eficiencia', intervalKm: 20000, intervalMonths: null, notes: 'Off-road intenso: fundido em 20.000-25.000 km. Upgrade YSS GD302-320TRL: R$450-650. Batente sendo atingido = amortecedor gasto.', priority: 'HIGH', order: 9 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas dianteiras + fluido DOT 4 (disco 260 mm)', intervalKm: 10000, intervalMonths: 24, notes: 'Off-road: 8.000 km. EBC FA142HH ou Honda original. Disco: min 3,0 mm. Lama abrasiva acelera desgaste.', priority: 'HIGH', order: 10 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Lona traseira + ajuste de pedal (tambor)', intervalKm: 12000, intervalMonths: null, notes: 'Off-road: inspete a cada 8.000 km. Curso do pedal: 20-30 mm. Fras-le ou Honda original.', priority: 'MEDIUM', order: 11 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria YTZ7S 12V 7Ah — verificacao', intervalKm: null, intervalMonths: 6, notes: 'Repouso: 12,6 V. A 4.000 rpm: 13,8-14,5 V. Bateria fraca gera DTCs falsos na PGM-FI.', priority: 'MEDIUM', order: 12 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Scanner PGM-FI — leitura de DTCs', intervalKm: null, intervalMonths: 12, notes: 'DTC 7 (IAT) mais comum em uso off-road por exposicao a agua. Anualmente ou ao acender a luz FI.', priority: 'MEDIUM', order: 13 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Sonda lambda — verificacao', intervalKm: 30000, intervalMonths: null, notes: 'DTC 21 = sonda com falha. Motor opera com mapa fixo — mistura pobre em alta rotacao. Denso: R$150-250.', priority: 'HIGH', order: 14 },
  ]

  if (hasInvertedFork) {
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Oleo da bengala invertida 43 mm (Honda SS-8 7,5W)', intervalKm: 15000, intervalMonths: 24, notes: '500-530 mL por tubo. Off-road: 12.000 km. Retentores: Ariete 43 mm. Oleo no topo da bengala = parada imediata.', priority: 'HIGH', order: 15 })
  } else {
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Oleo da bengala convencional 37 mm (Honda SS-7 10W)', intervalKm: 15000, intervalMonths: 24, notes: '100 mL por tubo. Retentores Ariete 37 mm. Off-road: 12.000 km.', priority: 'HIGH', order: 15 })
  }

  if (hasABS) {
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Sensor ABS dianteiro — limpeza pos-trilha', intervalKm: null, intervalMonths: 3, notes: 'Lama seca = DTC de ABS falso. Agua limpa em baixa pressao sobre a roda dianteira. Mangueira suave, nunca lavajato direto.', priority: 'MEDIUM', order: 16 })
    items.push({ modelName: m, yearFrom: yf, yearTo: yt, component: 'Fluido DOT 4 do sistema ABS (purge guiado com scanner)', intervalKm: null, intervalMonths: 24, notes: 'Modulo ABS tem acumuladores internos — purge manual nao substitui o fluido dos acumuladores. Exige scanner com funcao de purge guiado.', priority: 'HIGH', order: 17 })
  }

  return items
}

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS = [
  { modelName: 'XRE 300',      yearFrom: 2009, yearTo: 2024, MACETES: XRE300_MACETES,      PROBLEMAS: XRE300_PROBLEMAS      },
  { modelName: 'XRE 300 RALLY', yearFrom: 2014, yearTo: 2024, MACETES: XRE300RALLY_MACETES, PROBLEMAS: XRE300RALLY_PROBLEMAS  },
  { modelName: 'XRE 300 ABS',  yearFrom: 2019, yearTo: 2024, MACETES: XRE300ABS_MACETES,   PROBLEMAS: XRE300ABS_PROBLEMAS    },
]

const ALL_MANUTENCAO: MaintenanceItemInput[] = [
  // XRE 300 2009-2013: bengala convencional 37mm, sem ABS
  ...makeXRE300('XRE 300', 2009, 2013, false, false),
  // XRE 300 2014+: bengala invertida 43mm, sem ABS
  ...makeXRE300('XRE 300', 2014, 2024, false, true),
  // XRE 300 RALLY 2014+: bengala invertida, sem ABS
  ...makeXRE300('XRE 300 RALLY', 2014, 2024, false, true),
  // XRE 300 ABS 2019+: bengala invertida, com ABS
  ...makeXRE300('XRE 300 ABS', 2019, 2024, true, true),
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
