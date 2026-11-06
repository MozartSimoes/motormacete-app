// seed-yamaha-ybr-factor.ts — Yamaha YBR 125 · Factor 125i · Factor 150 · YBR 125i · YBR 150 Factor
// YBR 125 (2001-2016): 124cc SOHC carburado — o mais popular 125cc do Brasil no seu tempo
// Factor 125i (2016-2024): 125cc SOHC injeção — substituto EFI do YBR 125
// Factor 150 (2014-2024): 149cc SOHC FLEXONE injeção — concorrente direta da Honda CG 160
// YBR 125i (2016-2024): nomenclatura FIPE atual "YBR 125i FACTOR ED/FLEX" — geração EFI mais recente,
//   vela NGK MR8D-9 (diferente da CR7HSA do carburado)
// YBR 150 Factor (2021-atual): nomenclatura FIPE atual cobre DX/E/ED/FLEX — 149,3cc FLEXONE,
//   vela NGK MR8D (diferente da CR7HSA da geração 2014-2020)
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

// ─── YBR 125 (2001-2016) ──────────────────────────────────────────────────────

const YBR125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 124cc SOHC carburado — óleo 10W-40 MA/MA2, 0,9 L SEM filtro; válvulas adm 0,05 mm / esc 0,08 mm (motor frio); vela NGK CR7HSA',
    body: 'YBR 125: motor 124cc SOHC carburado. Óleo: 0,9 L sem filtro substituível (dreno direto). 10W-40 JASO MA ou MA2. Troca: 2.500 km (uso de motoboy) ou 3.500 km (uso normal). Válvulas: adm 0,05 mm / esc 0,08 mm (motor FRIO, PMS compressão). Vela: NGK CR7HSA, gap 0,7 mm. Iridium: NGK CR7HIX (R$55-75). As folgas de válvula são MENORES que da Honda CG 150 (adm 0,05 / esc 0,10) — mecânico deve usar calibrador de lâminas finas.',
  },
  {
    severity: 'WARN',
    title: 'Carburador Mikuni VM20 (YBR 125) — entupimento crônico com etanol; esvaziamento do flutuador obrigatório ao guardar >10 dias',
    body: 'O carburador Mikuni VM20 do YBR 125 é sensível ao etanol degradado. Com moto parada >10 dias com etanol: o jato piloto (menor) entupe primeiro, causando marcha lenta instável ou morte do motor no semáforo. Protocolo: feche o registro de combustível + ligue o motor até morrer (esgota o carburador). Jato principal: 110 (gasolina) ou 125 (etanol puro). Jato piloto: 35 (padrão). Limpeza preventiva: a cada 15.000 km ou anual. Gás carburador Yamaha (spray específico): R$20-30.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428 — kit DID 428NZ (coroa 41T / pinhão 14T); folga 15-20 mm; life útil 15.000-18.000 km com boa lubrificação',
    body: 'YBR 125 usa corrente 428 com coroa 41 dentes e pinhão 14 dentes. DID 428NZ (R$55-85) ou EK 428 (R$60-90). Kit completo: R$130-190. Folga: 15-20 mm (medida no ponto mais tenso, com piloto no banco). Lubrificar a cada 400-500 km. Corrente com 3 km de folga excedendo 20 mm já está trocada. Coroa com dentes em formato de onda: troque o kit. Nunca troque só a corrente em coroa gasta.',
  },
  {
    severity: 'OK',
    title: 'Amortecedores traseiros duplos — desgaste em 30.000-40.000 km em uso com garupa; YBR 125 tem os amortecedores mais curtos da categoria',
    body: 'YBR 125 tem amortecedores traseiros duplos de 310 mm. Original Yamaha dura 30.000-40.000 km mas perde eficiência antes (sentida como "esponja" na traseira com garupa). Substituição: KYB 343138 (320 mm, ligeiramente mais comprido, melhora conforto: R$150-220 o par) ou Showa compatível. Sintoma de amortecedor gasto: moto bate o batente ao passar em lombada com garupa. Nunca use amortecedores com alturas diferentes — desequilibra o chassi.',
  },
  {
    severity: 'OK',
    title: 'Registro de combustível (torneira) — componente que falha em YBR 125 com mais de 40.000 km; vazamento de combustível para o carburador quando fechado',
    body: 'O registro de combustível (torneira de gasolina) do YBR 125 tem vedação interna que desgasta. Sintoma: combustível passando mesmo com o registro fechado (vazamento para o carburador quando moto desligada). Resultado: carburador alagado, motor com mistura supérica, difícil de partir ou partida com fumaça preta. Registro novo: R$30-60. Peça fácil de encontrar. Dica: ao ver manchas de combustível no coletor de admissão com motor frio, verifique o registro primeiro.',
  },
]

const YBR125_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção YBR 125 (2001-2016) por km — do zero até 60.000 km',
    body: 'Cronograma consolidado para a YBR 125 carburada: 1.000 km — revisão de amaciamento (troca de óleo obrigatória, sem exceção, aperto geral). 3.000 km — troca de óleo 10W-40 MA/MA2 (0,9 L sem filtro); verificação da folga da corrente. 6.000 km — óleo + filtro de ar (limpeza) + verificação de velas. 8.000 km — troca de vela NGK CR7HSA. 9.000 km — óleo + limpeza do carburador Mikuni VM20. 12.000 km — óleo + regulagem de válvulas (adm 0,05 mm / esc 0,08 mm, motor frio) + troca do filtro de ar. 15.000-18.000 km — kit de corrente 428 completo (DID 428NZ + coroa 41T + pinhão 14T). 20.000 km — óleo + revisão geral de freios (lona traseira + pastilha dianteira) + inspeção de amortecedores. A cada 6 meses, independente de km: verificação da bateria YTX5L-BS (repouso 12,6 V) e do registro de combustível (vedação). Uso de motoboy: reduza todos os intervalos de óleo para 2.500 km. Guardar >10 dias: sempre esvaziar o carburador (fechar registro + deixar morrer o motor).',
  },
]

const YBR125_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Amortecedor traseiro fundido em uso urbano pesado com garupa — YBR 125 usada como mototaxi perde amortecimento em 20.000-25.000 km',
    body: 'YBR 125 em uso de mototaxi (garupa constante + buracos) tem vida útil de amortecedores muito reduzida. 20.000-25.000 km: já apresentam batida no batente. Mototaxista: troca de amortecedores a cada 20.000 km é o custo de operação. KYB ou Gabriel Trail são as marcas mais usadas. Amortecedores gastos afetam a estabilidade em freadas: traseira "dança" ao frear forte.',
  },
  {
    severity: 'WARN',
    title: 'Carburador envernizado após período parado — causa mais comum de YBR 125 "não pega" comprada de segunda mão com km baixo mas anos de guarda',
    body: 'YBR 125 com poucos km mas muitos anos de uso: o carburador envernizou com etanol degradado. Sintoma: parte com ether spray mas não sustenta marcha. Limpeza do carburador: R$80-150 (manual) ou R$130-220 (ultrassom). ANTES de comprar YBR 125 usada: tente partir a moto naturalmente — se precisar de starter de longa duração, carburador está envernizado. Negociar o preço incluindo a limpeza.',
  },
]

// ─── FACTOR 125i (2016-2024) ─────────────────────────────────────────────────

const FACTOR125I_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 125cc SOHC PGM-FI Yamaha (FUEL INJECTION) — sem carburador; sem protocolo de esvaziamento; óleo 0,9 L sem filtro; válvulas adm 0,05 mm / esc 0,08 mm',
    body: 'A Factor 125i é o substituto EFI do YBR 125. Motor similar mas com injeção eletrônica Yamaha (YCC — Yamaha Chip Controlled Fuel Injection). Óleo: 0,9 L sem filtro (mesmo que YBR 125). Válvulas: mesmas folgas (adm 0,05 / esc 0,08 mm). Vela: NGK CR7HSA. Sem carburador = sem envernizamento ao parar. Pode ficar parada por meses sem problemas de motor (diferente do YBR). Partida sempre fácil independente do tempo parada.',
  },
  {
    severity: 'OK',
    title: 'IACV (válvula de marcha lenta) — componente mais crítico da Factor 125i em uso urbano; limpeza a cada 8.000 km evita a marcha lenta instável',
    body: 'A Factor 125i tem IACV (Idle Air Control Valve) que acumula carbono em uso urbano intenso. Sintoma: marcha lenta oscilando (subindo e descendo rpm) ou motor morrendo no semáforo. Limpeza com spray EFI Cleaner: fácil acesso no corpo da borboleta. Custo: R$40-80 numa oficina. Substituição do IACV (quando limpeza não resolve): R$180-280. Muito mais simples de diagnosticar que o carburador do YBR 125.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR7HSA (gap 0,7 mm) — mesma que YBR 125; troca a cada 8.000 km; iridium CR7HIX dura 16.000 km',
    body: 'Factor 125i usa a mesma vela do YBR 125: NGK CR7HSA, gap 0,7 mm. Compatibilidade com YBR 125 facilita encontrar peça em qualquer loja de moto. Iridium: NGK CR7HIX (R$55-75) — recomendado para uso de motoboy por maior resistência à fouling. Troca: 8.000 km. Fouling de vela na Factor 125i: indica IACV sujo ou problema no sensor IAT.',
  },
  {
    severity: 'WARN',
    title: 'Sensor IAP (pressão absoluta do coletor) — ponto fraco documentado; falha em 30.000-40.000 km em uso urbano com muita vibração',
    body: 'O sensor IAP (Intake Air Pressure) da Factor 125i é sensível a vibração e impactos. Falha típica: 30.000-40.000 km em uso de motoboy. DTC aceso: luz de injeção ligada. Moto ainda funciona mas com mapa de combustível degradado (mistura fora do ideal, consumo irregular). Sensor IAP novo Yamaha: R$180-300. Alternativa: usar sensor IAP de outras Yamaha de mesma geração.',
  },
]

const FACTOR125I_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Sensor IAP falhando silenciosamente — a Factor 125i pode rodar meses com sensor ruim sem DTC visível; consumo aumentando e potência caindo são os sinais',
    body: 'O sensor IAP da Factor 125i pode apresentar falha parcial (leitura fora do intervalo mas não completamente morto) sem acender o DTC. A ECU opera com valor padrão fixo e a moto funciona mas: consumo sobe 10-15%, potência cai levemente. Diagnóstico definitivo: scanner que leia o valor do MAP sensor. Scanner genérico OBD2: não funciona na Factor 125i (protocolo proprietário Yamaha). Scanner Yamaha YDS ou similar: R$80-120 para diagnóstico numa boa oficina.',
  },
  {
    severity: 'WARN',
    title: 'Respiro do cárter soltando névoa de óleo — problema documentado após troca de óleo acima do nível ou com óleo mineral; mancha motor e bloco',
    body: 'A Factor 125i (e YBR 125) com óleo acima do nível MAX: respiro do cárter solta névoa de óleo que suja o motor. Solução: após troca de óleo, SEMPRE conferir o nível com a vareta após 5 min de motor ligado e desligado. Nível correto: entre MIN e MAX. Óleo mineral também é mais propenso a vazamento pelo respiro — use MA2 semissintético. Vapor de óleo na airbox (caixa do filtro): limpar com pano seco e verificar o nível.',
  },
]

const FACTOR125I_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção Factor 125i (2016-2024) por km — do zero até 60.000 km',
    body: 'Cronograma consolidado para a Factor 125i injetada: 1.000 km — revisão de amaciamento (troca de óleo obrigatória + aperto geral + checagem de erros na injeção). 3.000 km — troca de óleo 10W-40 MA2 (0,9 L sem filtro). 6.000 km — óleo + limpeza do IACV com spray EFI Cleaner. 8.000 km — troca de vela NGK CR7HSA (gap 0,7 mm). 9.000 km — óleo. 12.000 km — óleo + regulagem de válvulas (adm 0,05 mm / esc 0,08 mm) + troca do filtro de ar. 15.000-18.000 km — kit de corrente 428 completo. 20.000 km — óleo + verificação/calibração do sensor IAP e TPS com scanner Yamaha + revisão de freios. A cada 6 meses: bateria YTX5L-BS (repouso 12,6 V). Diferente do YBR 125 carburado, a Factor 125i não precisa de protocolo de esvaziamento ao ficar parada — mas ainda assim recomenda-se dar partida a cada 30 dias para manter a bateria carregada.',
  },
]

// ─── FACTOR 150 (2014-2024) ──────────────────────────────────────────────────

const FACTOR150_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 149cc SOHC FLEXONE Blue Core — óleo 10W-30 MA2, 0,85 L SEM filtro (mesmo que Fazer 150); válvulas adm 0,07 mm / esc 0,12 mm; vela NGK CR7HSA',
    body: 'A Factor 150 tem motor Blue Core 149cc idêntico ao da Fazer 150 (mesmas folgas, mesmo óleo, mesma vela). Diferenças do motor Factor 150 vs Fazer 150: configuração de admissão diferente, motor mais verticalizado no chassi commuter. Óleo: 0,85 L sem filtro. Válvulas: adm 0,07 / esc 0,12 mm. Vela: NGK CR7HSA (gap 0,7 mm). A Honda CG 160 concorrente usa folgas DIFERENTES (adm 0,10 / esc 0,15 mm) — não confundir ao regulagem.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428 — kit DID 428NZ (coroa 39T / pinhão 14T); Factor 150 tem relação mais curta que Fazer 150 (coroa 42T) para mais torque no trânsito',
    body: 'Factor 150 usa coroa 39 dentes (vs 42T da Fazer 150 — relação mais curta para comcomutting). DID 428NZ (R$60-90). Kit completo: R$150-200. Folga: 15-20 mm. Lubrificar a cada 500 km. Com coroa menor (39T), o motor gira um pouco mais alto em velocidade de estrada — consome mais em rodovias mas tem mais arrancada no trânsito. Modificação popular: coroa 40T (equilíbrio entre torque e velocidade).',
  },
  {
    severity: 'OK',
    title: 'CBS (Combined Braking System) opcional — modelos Factor 150 com CBS têm freio dianteiro e traseiro interligados; fluido DOT 4 obrigatório a cada 24 meses',
    body: 'Alguns modelos da Factor 150 têm CBS (acionar o pedal traseiro também aperta levemente o freio dianteiro). Em modelos com CBS: fluido DOT 4 deve ser trocado a cada 24 meses (sistema fechado absorve umidade com tempo). Pastilhas do sistema CBS são as mesmas sem CBS. Freio dianteiro na Factor 150 com CBS: acionar o manete também aciona o disco dianteiro. Não há independência total dos freios — piloto deve se acostumar com o comportamento diferente do CBS.',
  },
  {
    severity: 'WARN',
    title: 'TPS descalibrado — problema documentado na Factor 150 (mesmo que Fazer 150); marcha lenta oscilante é o primeiro sintoma; ajuste com scanner resolve na maioria dos casos',
    body: 'A Factor 150 compartilha o TPS com a Fazer 150 e apresenta o mesmo problema de descalibração. Em uso urbano pesado com muita vibração: o TPS perde calibração em 20.000-30.000 km. Sintoma: rpm oscila na marcha lenta. Scanner da Yamaha: R$50-80 para ajuste. Substituição do TPS: R$120-200. Diagnóstico errado frequente: muitos mecânicos trocam a vela ou o filtro de ar sem diagnosticar o TPS, sem resolver o problema.',
  },
  {
    severity: 'OK',
    title: 'FLEXONE — Factor 150 aceita gasolina ou etanol; etanol dá mais torque na arrancada; gasolina melhora a autonomia em km/L',
    body: 'Factor 150 FLEXONE: gasolina dá melhor km/L (40-48 km/L vs 35-43 km/L no etanol) mas etanol dá mais torque. Em uso de motoboy (muito trânsito + arrancadas): etanol é preferível (motor mais frio + mais torque). Em uso de estrada (velocidade constante): gasolina dá mais km por R$. Mix 50/50: uma boa opção para quem não quer "pensar" no combustível. ECU FLEXONE adapta o mapa automaticamente — sem necessidade de ajuste manual ao trocar combustível.',
  },
]

const FACTOR150_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'TPS descalibrado — mesmo que Fazer 150, mais frequente na Factor por uso de motoboy (mais quilômetros em menos tempo)',
    body: 'Factor 150 em uso de motoboy acumula km muito rápido (80.000-120.000 km em 3-4 anos). Em 30.000 km: 1-2 regulagens de válvulas e 1-2 ajustes de TPS já são esperados. Proprietário de motoboy deve incluir a verificação de TPS nas revisões. Custo de manutenção estimado por 100.000 km de uso de motoboy: R$800-1.500 (regulagens, velas, filtros, TPS). Factor 150 bem mantida chega a 150.000-200.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Corrente desgastando rápido em uso de motoboy — kit 428 a cada 15.000-18.000 km sem lubrificação rigorosa',
    body: 'Factor 150 em motoboy com lubrificação irregular: kit de corrente em 15.000 km. Com lubrificação a cada 500 km: 20.000-22.000 km. O custo do kit (R$150-200) é mais barato que o desgaste acelerado de coroa e pinhão por corrente seca e esticada. Corrente vibrando (jogo lateral excessivo): kit já está na hora. Nunca troque só a corrente em coroa e pinhão com desgaste visível.',
  },
  {
    severity: 'WARN',
    title: 'Vapores de óleo pelo respiro — Factor 150 mais suscetível por rpm médio mais alto em uso de motoboy (motor sempre acima de 5.000 rpm)',
    body: 'A Factor 150 em uso de motoboy com motor frequentemente a 5.000-7.000 rpm: mais vapores de óleo pelo respiro que em uso de estrada a rotações mais baixas. Verificar nível de óleo mensalmente (não apenas na troca). Com nível correto: vapor mínimo é normal. Com nível acima do MAX: vapor visível e manchas no motor. Troca frequente de óleo (2.500 km em motoboy) também reduz o problema (óleo mais novo tem menos vapor).',
  },
]

const FACTOR150_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção Factor 150 (2014-2024) por km — do zero até 60.000 km',
    body: 'Cronograma consolidado para a Factor 150 FLEXONE: 1.000 km — revisão de amaciamento (troca de óleo obrigatória + aperto geral). 3.000 km — troca de óleo 10W-30 MA2 (0,85 L sem filtro). 6.000 km — óleo + limpeza do IACV + filtro de ar. 8.000 km — troca de vela NGK CR7HSA (gap 0,7 mm). 9.000 km — óleo. 12.000 km — óleo + regulagem de válvulas (adm 0,07 mm / esc 0,12 mm) + calibração do TPS com scanner Yamaha. 15.000-18.000 km — kit de corrente 428 completo (coroa 39T + pinhão 14T). 20.000 km — óleo + revisão de freios (pastilhas dianteiras + lona traseira) + inspeção de amortecedores. 24 meses — troca do fluido de freio DOT 4 em modelos com CBS. A cada 6 meses: bateria YTX7L-BS 12V 6Ah (repouso 12,6 V). Uso de motoboy: reduza intervalos de óleo para 2.500 km e corrente para 15.000 km — a Factor 150 bem mantida chega a 150.000-200.000 km.',
  },
]

// ─── YBR 125i (2016-2024, geração EFI mais recente) ──────────────────────────
// Motor: 124,9cc monocilíndrico SOHC 2V, arrefecido a ar, injeção eletrônica Yamaha (bicombustível)
// Diferença real vs "YBR 125"/"FACTOR 125I" carburada/1ª geração EFI: a "YBR 125i FACTOR ED/FLEX" é a
// nomenclatura atual da FIPE para a Factor 125 injetada e flex (gasolina + etanol), sucessora direta
// da Factor 125i ED lançada em 2016. Potência: 11 cv (gasolina) / 11,1 cv (etanol) a 7.500 rpm.
// Torque: 1,153 kgf.m (gasolina) / 1,163 kgf.m (etanol) a 6.000 rpm. Vela NGK MR8D-9 (diferente da
// CR7HSA do YBR 125 carburado — não confundir ao comprar peça). Fonte: ficha técnica oficial Yamaha /
// magodoscarros.com e manual de serviço Factor YBR125i ED (UBS) BlueFlex.

const YBR125I_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 124,9cc SOHC injeção eletrônica bicombustível — vela NGK MR8D-9 (NÃO é a CR7HSA do YBR 125 carburado); óleo 10W-40 MA2, ~1,0 L sem filtro',
    body: 'A "YBR 125i" (nomenclatura FIPE atual: YBR 125i FACTOR ED/FLEX) é a geração mais recente da linha, com motor 124,9cc SOHC 2V arrefecido a ar e injeção eletrônica flex (aceita gasolina e etanol, com mapa adaptado automaticamente pela ECU). Potência: 11 cv gasolina / 11,1 cv etanol a 7.500 rpm. Vela: NGK MR8D-9 — atenção, é DIFERENTE da NGK CR7HSA usada no YBR 125 carburado antigo e na primeira geração da Factor 125i. Comprar a vela errada é o erro mais comum em lojas de peça que não conferem o ano/geração exata. Óleo: 10W-40 API SJ ou JASO MA2, aproximadamente 1,0 L sem troca de filtro (dreno direto). Troca: 3.000 km (uso normal) ou 2.500 km (motoboy).',
  },
  {
    severity: 'OK',
    title: 'Peça mais barata do mercado de motos — YBR/Factor 125 é a moto mais vendida da história da Yamaha no Brasil; peças genéricas custam metade do preço original',
    body: 'A família YBR/Factor 125 é a moto mais vendida da Yamaha no Brasil desde os anos 2000, com milhões de unidades em circulação. Isso significa a maior rede de peças alternativas/genéricas do mercado nacional: kit relação genérico R$70-100 (vs R$150+ original), jogo de juntas genérico R$25-40, cabo de embreagem genérico R$15-25. Qualidade das genéricas: boa para peças de desgaste (juntas, cabos, filtros); evite genérico em peças de segurança (pastilha de freio, disco) — prefira Fras-le, Cobreq ou original nessas. Qualquer borracharia ou loja de moto de bairro tem peça de YBR/Factor em estoque — vantagem real sobre marcas menos populares.',
  },
  {
    severity: 'OK',
    title: 'IACV e corpo de borboleta — limpeza a cada 8.000 km evita marcha lenta instável; sintoma clássico da injeção eletrônica suja em uso urbano',
    body: 'A YBR 125i tem IACV (Idle Air Control Valve) e corpo de borboleta que acumulam carbono em uso urbano parado no trânsito. Sintoma: marcha lenta oscilando (sobe e desce rpm sozinho) ou morrendo no semáforo. Limpeza preventiva com spray EFI Cleaner a cada 8.000 km (motoboy: 6.000 km): R$40-80 numa oficina de bairro. Diferente do carburador do YBR 125 antigo, não precisa de protocolo de esvaziamento ao guardar a moto — pode ficar parada meses sem envernizar.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428 — mesmo padrão do YBR 125 (coroa 41T / pinhão 14T); DID 428NZ é a referência de mercado por durabilidade e preço',
    body: 'A YBR 125i mantém o padrão de transmissão do YBR 125: corrente 428, coroa 41 dentes, pinhão 14 dentes. DID 428NZ (R$55-85) ou EK 428 (R$60-90) — kit completo R$130-190. Por ser peça compartilhada com toda a linha YBR/Factor 125 desde 2001, encontra-se em qualquer cidade do Brasil, mesmo no interior. Folga ideal: 15-20 mm no ponto mais tenso. Lubrificar a cada 500 km com piloto no banco para medir a folga corretamente.',
  },
  {
    severity: 'OK',
    title: 'Sensor IAP (pressão do coletor) — ponto de atenção da injeção eletrônica; falha silenciosa aumenta consumo sem acender luz de injeção sempre',
    body: 'O sensor IAP (Intake Air Pressure) da YBR 125i é sensível a vibração constante em uso urbano/motoboy. Falha parcial (sem DTC): consumo sobe 10-15%, potência cai levemente — muitos donos não percebem e continuam rodando assim por meses. Falha total: acende luz de injeção no painel. Sensor novo Yamaha: R$180-300. Diagnóstico correto exige scanner específico Yamaha (scanner OBD2 genérico não lê o protocolo proprietário da linha YBR/Factor).',
  },
  {
    severity: 'OK',
    title: 'Pneus 2.75-18 dianteiro / 90/90-18 traseiro — dimensão de aro 18" compartilhada com toda a família YBR, disponível em qualquer borracharia',
    body: 'A YBR 125i usa pneus 2.75-18 (dianteiro) e 90/90-18 (traseiro), medida clássica da linha YBR desde o lançamento em 2001 — encontrada em praticamente qualquer borracharia do país por ser volume de mercado altíssimo. Marcas populares: Metzeler ME Street (original), Pirelli City Dragon, Rinaldi Strada. Preço de pneu genérico/nacional: R$90-140 cada; pneus premium (Pirelli, Metzeler): R$150-220. Boa notícia: por ser aro 18" tradicional, não há escassez regional dessa medida como acontece com aros 17" de motos mais recentes.',
  },
  {
    severity: 'WARN',
    title: 'Cuidado ao comprar peça: existem 3 gerações de vela e carburação diferentes na família YBR/Factor 125 — confirme o ano exato antes de comprar',
    body: 'A confusão mais comum na família YBR/Factor 125: existem gerações carburadas (YBR 125 E/ED/K, vela CR7HSA) e gerações injetadas (YBR 125i FACTOR ED/FLEX, vela MR8D-9) com peças de ignição e alimentação DIFERENTES apesar do motor parecer visualmente similar. Antes de comprar vela, bobina ou peça de ignição, confirme: (1) se a moto tem carburador visível (carburada) ou corpo de borboleta com chicote elétrico (injetada); (2) o ano exato do modelo. Levar o manual ou consultar o chassi na concessionária evita comprar peça errada.',
  },
]

const YBR125I_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Sensor IAP falhando silenciosamente — pode rodar meses com leitura errada sem acender luz de injeção; consumo sobe e potência cai aos poucos',
    body: 'O sensor IAP da YBR 125i pode falhar parcialmente sem acionar o DTC — a ECU assume um valor padrão e a moto continua funcionando, mas com mistura fora do ideal. Sinais: consumo subindo gradualmente (o dono geralmente atribui a trânsito ou combustível ruim) e leve perda de potência em subidas. Diagnóstico definitivo exige scanner Yamaha (R$80-120 numa oficina especializada) — scanner OBD2 genérico de carro não lê o protocolo da linha.',
  },
  {
    severity: 'WARN',
    title: 'IACV sujo causando marcha lenta instável — problema recorrente em uso urbano intenso; muitas oficinas trocam peça sem tentar limpeza primeiro',
    body: 'Marcha lenta oscilando ou moto morrendo no semáforo na YBR 125i quase sempre é IACV ou corpo de borboleta sujo de carbono, não peça quebrada. Erro comum: oficina troca o IACV (R$180-280) sem tentar a limpeza com EFI Cleaner primeiro (R$40-80), que resolve a maioria dos casos. Peça o mecânico para limpar antes de substituir — só troque se a limpeza não resolver.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pelo respiro do cárter com nível acima do MAX — problema autoinduzido em trocas de óleo malfeitas',
    body: 'Assim como no YBR 125 e Factor 125i mais antigos, colocar óleo acima do nível MAX na YBR 125i causa vazamento de névoa de óleo pelo respiro do cárter, sujando o motor e a região do escapamento. Sempre conferir o nível com a vareta 5 minutos após desligar o motor (não com o motor recém-ligado). Óleo mineral piora o problema — prefira semissintético 10W-40 JASO MA2.',
  },
  {
    severity: 'WARN',
    title: 'Peça genérica de qualidade duvidosa em itens de segurança — mercado paralelo grande demais para essa linha traz peça ruim misturada com boa',
    body: 'Por ser a moto mais vendida do Brasil, a YBR/Factor 125i tem um mercado de peças genéricas gigantesco — o que é ótimo para o bolso, mas traz risco em itens de segurança. Casos documentados de pastilha de freio genérica com material de fricção inconsistente (frenagem irregular) e disco de freio genérico empenando cedo. Recomendação: genérico é seguro para juntas, cabos, filtros de ar e peças de acabamento; para pastilha, disco e pneu, prefira marca reconhecida (Fras-le, Cobreq, Pirelli, Metzeler) mesmo pagando mais.',
  },
  {
    severity: 'WARN',
    title: 'Confusão de vela entre gerações — MR8D-9 (injetada) vs CR7HSA (carburada) — vela errada causa falha de partida ou fouling precoce',
    body: 'Um problema recorrente relatado em fóruns: dono ou mecânico compra vela CR7HSA (padrão do YBR 125 carburado antigo) para uma YBR 125i injetada, que na verdade usa NGK MR8D-9. O motor até funciona com a vela errada por um tempo, mas com fouling mais rápido, partida mais difícil a frio e desempenho irregular. Sempre confirmar o modelo exato (carburado vs injetado) antes de comprar a vela — o chassi ou o manual do proprietário confirma a geração.',
  },
]

const YBR125I_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção YBR 125i (2016-2024, geração EFI) por km — do zero até 60.000 km',
    body: 'Cronograma consolidado para a YBR 125i injetada e flex: 1.000 km — revisão de amaciamento (troca de óleo obrigatória + aperto geral + checagem de erros na injeção via scanner). 3.000 km — troca de óleo 10W-40 MA2 (~1,0 L sem filtro). 6.000 km — óleo + limpeza do IACV e corpo de borboleta com spray EFI Cleaner. 8.000 km — troca de vela NGK MR8D-9 (NÃO confundir com a CR7HSA do modelo carburado). 9.000 km — óleo. 12.000 km — óleo + regulagem de válvulas (adm 0,05 mm / esc 0,08 mm, motor frio) + troca do filtro de ar. 15.000-18.000 km — kit de corrente 428 completo (coroa 41T + pinhão 14T). 20.000 km — óleo + verificação do sensor IAP e TPS com scanner Yamaha + revisão de freios (pastilha dianteira + lona traseira). A cada 6 meses: bateria YTX5L-BS (repouso 12,6 V). Uso de motoboy: reduza intervalo de óleo para 2.500 km. Por ser a moto mais vendida do Brasil, peças e mão de obra especializada estão disponíveis em qualquer cidade — manutenção mais barata da categoria.',
  },
]

// ─── YBR 150 Factor (2021-atual, linha DX/E/ED/FLEX) ─────────────────────────
// Motor: 149,3cc monocilíndrico SOHC, arrefecido a ar, injeção eletrônica FLEXONE (gasolina + etanol)
// Nomenclatura FIPE atual cobre 4 variantes: "YBR 150 FACTOR DX FLEX", "YBR 150 FACTOR E/FLEX",
// "YBR 150 FACTOR ED/FLEX" e "YBR 150 FACTOR FLEX" — todas compartilham o mesmo motor-base, variando
// equipamentos (freio a disco/tambor, painel, partida). Potência: ~12,2 cv gasolina / 12,4 cv etanol
// a 7.500 rpm. Torque: ~1,3 kgf.m a 6.000 rpm. Vela NGK MR8D, gap 0,8-0,9 mm (manual oficial Yamaha).
// Óleo: 1,00 L sem troca de filtro / 1,10 L com troca de filtro (manual oficial Factor 150 UBS).
// Fonte: manual do proprietário Factor 150 UBS (Yamaha oficial), motorcyclist.com.br, magodoscarros.com.

const YBR150FACTOR_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 149,3cc SOHC FLEXONE — óleo 1,00 L sem filtro / 1,10 L com filtro (spec oficial do manual); vela NGK MR8D gap 0,8-0,9 mm',
    body: 'A YBR 150 Factor (linha atual DX/E/ED/FLEX) tem motor 149,3cc SOHC monocilíndrico arrefecido a ar com injeção eletrônica flex. Segundo o manual oficial Yamaha (Factor 150 UBS): óleo 1,00 L em troca sem filtro, 1,10 L quando o filtro também é substituído — confira sempre com a vareta, não só pela medida despejada. Vela: NGK MR8D, gap 0,8-0,9 mm (torque de aperto 12-14 Nm). Potência: ~12,2 cv gasolina / 12,4 cv etanol a 7.500 rpm. Diferente da geração anterior "Factor 150" (2014-2020) que usava vela CR7HSA — confirme a geração exata antes de comprar peça de ignição.',
  },
  {
    severity: 'OK',
    title: 'YBR/Factor 150 puxa peça e mão de obra de toda a família 125/150 da Yamaha — maior rede de compatibilidade de peças da categoria commuter',
    body: 'A linha YBR 150 Factor compartilha diversos componentes com a Fazer 150 e com a família YBR/Factor 125 (corrente 428, muitos itens elétricos, padrão de parafusos e torques). Isso barateia muito a manutenção: kit relação genérico R$80-110, jogo de juntas R$30-45, cabos R$15-25. Qualquer cidade média do Brasil tem peça e mecânico experiente nessa linha, por ser a família de motos mais popular do país. Para pastilha e disco de freio, prefira marca reconhecida (Fras-le, Cobreq) mesmo com genérico disponível mais barato.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428 — coroa 39 dentes / pinhão 14 dentes; relação mais curta que a Fazer 150 (42T) para mais arrancada no trânsito urbano',
    body: 'A YBR 150 Factor usa coroa 39 dentes, mais curta que a Fazer 150 (42T) — prioriza arrancada e torque no trânsito em vez de velocidade máxima, coerente com o perfil "commuter urbano" da Factor. DID 428NZ (R$60-90) ou EK 428, kit completo R$150-200. Folga ideal: 15-20 mm. Lubrificar a cada 500 km (motoboy: 300-400 km). Modificação popular entre motoboys: coroa 40T para equilibrar arrancada e economia em trechos de avenida.',
  },
  {
    severity: 'OK',
    title: 'FLEXONE — etanol dá mais torque na arrancada urbana, gasolina rende mais km/L; ECU adapta o mapa automaticamente sem ajuste manual',
    body: 'A YBR 150 Factor FLEXONE aceita gasolina ou etanol livremente, com a ECU ajustando o mapa de injeção automaticamente. Gasolina tende a render mais km/L em uso de estrada/rodovia; etanol entrega mais torque em arrancadas de trânsito urbano intenso (perfil típico de motoboy). Mix 50/50 é uma opção prática para quem não quer calcular. Não é necessário nenhum ajuste manual ou aviso à ECU ao trocar de combustível — diferente de carros flex mais antigos.',
  },
  {
    severity: 'OK',
    title: 'Freio a disco dianteiro (nas versões ED/DX) — pastilha Fras-le dura mais que genérica sem marca; disco mínimo 2,5 mm antes de trocar',
    body: 'As versões com sufixo ED/DX da YBR 150 Factor têm freio a disco dianteiro; versões mais básicas mantêm tambor nos dois eixos. Pastilha Fras-le ou Cobreq: R$35-60 o jogo, dura 10.000-14.000 km em uso urbano. Genérica sem marca: mais barata mas desgasta até 40% mais rápido e pode ter frenagem inconsistente. Espessura mínima do disco: 2,5 mm — meça com paquímetro na revisão, não só visualmente.',
  },
  {
    severity: 'OK',
    title: 'Pneus 70/90-17 (dianteiro) e 80/90-17 (traseiro) — aro 17" moderno, mesma medida de outras 150 commuter populares',
    body: 'A YBR 150 Factor usa aro 17" nas duas rodas (70/90-17 dianteiro, 80/90-17 traseiro), medida compartilhada com diversas 150cc commuter do mercado brasileiro — boa disponibilidade em borracharias mesmo no interior. Pirelli City Dragon, Michelin City Grip ou Metzeler Feelfree são as opções mais buscadas para substituição, na faixa de R$140-220 cada. Nacional/genérico: R$90-130, aceitável para uso urbano mas com menor durabilidade e aderência em chuva.',
  },
  {
    severity: 'OK',
    title: 'IACV e TPS — dupla de sensores que mais causa marcha lenta instável; limpeza e calibração resolvem a maioria dos casos sem troca de peça',
    body: 'Assim como a Factor 125i e a Fazer 150 (motor da mesma família), a YBR 150 Factor pode apresentar marcha lenta oscilante por sujeira no IACV ou descalibração do TPS (Throttle Position Sensor) em uso urbano intenso. Antes de aceitar a troca de peça (R$120-280), peça para o mecânico tentar limpeza do corpo de borboleta com EFI Cleaner (R$40-80) e calibração do TPS com scanner Yamaha (R$50-80) — resolve a maior parte dos casos sem gastar com peça nova.',
  },
]

const YBR150FACTOR_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'TPS descalibrado em uso urbano pesado — sintoma de marcha lenta oscilante; scanner resolve na maioria dos casos sem troca de peça',
    body: 'A YBR 150 Factor compartilha o motor-base com a Fazer 150 e herda a tendência do TPS a descalibrar em uso urbano com muita vibração e paradas frequentes (trânsito, motoboy). Em 20.000-30.000 km já pode aparecer oscilação de marcha lenta. Scanner Yamaha para recalibração: R$50-80. Erro comum: trocar vela ou filtro de ar por tentativa sem diagnosticar o TPS primeiro, gastando sem resolver.',
  },
  {
    severity: 'WARN',
    title: 'Corrente e kit relação desgastando rápido em uso de motoboy — 15.000-18.000 km sem lubrificação rigorosa a cada 500 km',
    body: 'Em uso de motoboy com lubrificação irregular, o kit de corrente 428 da YBR 150 Factor dura 15.000 km; com lubrificação correta a cada 500 km, estende para 20.000-22.000 km. O kit completo (R$150-200) é mais barato que o desgaste acelerado de coroa e pinhão causado por rodar com corrente seca e esticada. Jogo lateral excessivo na corrente é sinal de que o kit já deveria ter sido trocado.',
  },
  {
    severity: 'WARN',
    title: 'Vapores de óleo pelo respiro do cárter — mais frequente em uso de motoboy com motor girando alto e constante',
    body: 'Em uso de motoboy, com o motor frequentemente entre 5.000-7.000 rpm, a YBR 150 Factor apresenta mais vapor de óleo pelo respiro do cárter do que em uso de estrada com rotações mais baixas e constantes. Verificar o nível de óleo mensalmente (não só na troca) evita o problema — nível acima do MAX é a causa mais comum. Troca de óleo mais frequente (2.500 km em motoboy) também reduz a névoa por manter o óleo mais novo e menos volátil.',
  },
  {
    severity: 'WARN',
    title: 'Confusão de vela entre gerações da Factor 150 — MR8D (linha atual) vs CR7HSA (Factor 150 2014-2020) causa fouling e partida difícil',
    body: 'A geração atual da YBR 150 Factor (DX/E/ED/FLEX) usa vela NGK MR8D, diferente da CR7HSA usada na geração anterior "Factor 150" (2014-2020). Comprar a vela errada é um erro recorrente em lojas que não confirmam o ano exato — resulta em fouling mais rápido e partida difícil a frio, sem chegar a impedir o funcionamento (o que atrasa o diagnóstico correto). Confirme sempre o ano e a nomenclatura completa da FIPE antes de comprar peça de ignição.',
  },
  {
    severity: 'WARN',
    title: 'Peça genérica de segurança com qualidade inconsistente — mercado paralelo grande para essa linha popular traz peça ruim misturada com boa',
    body: 'Por ser parte da família de motos mais vendida do Brasil, a YBR 150 Factor tem um mercado de peças genéricas/paralelas muito grande, o que barateia manutenção mas traz risco em itens de segurança. Relatos de disco de freio genérico empenando prematuramente e pastilha com frenagem inconsistente. Recomendação prática: genérico é seguro em juntas, cabos e filtros; para pastilha, disco e pneu, prefira marca reconhecida (Fras-le, Cobreq, Pirelli, Michelin, Metzeler) mesmo pagando mais.',
  },
]

const YBR150FACTOR_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção YBR 150 Factor (2021-atual, linha DX/E/ED/FLEX) por km — do zero até 60.000 km',
    body: 'Cronograma consolidado para a YBR 150 Factor FLEXONE atual: 1.000 km — revisão de amaciamento (troca de óleo obrigatória + aperto geral). 3.000 km — troca de óleo 10W-30 (ou conforme manual) — 1,00 L sem filtro / 1,10 L com troca do filtro. 6.000 km — óleo + limpeza do IACV e corpo de borboleta. 8.000 km — troca de vela NGK MR8D (gap 0,8-0,9 mm) — atenção: diferente da CR7HSA da geração 2014-2020. 9.000 km — óleo. 12.000 km — óleo + regulagem de válvulas + calibração do TPS com scanner Yamaha. 15.000-18.000 km — kit de corrente 428 completo (coroa 39T + pinhão 14T). 20.000 km — óleo + revisão de freios (disco dianteiro nas versões ED/DX + tambor traseiro) + inspeção de amortecedores. A cada 6 meses: verificação de bateria. Uso de motoboy: reduza intervalos de óleo para 2.500 km e corrente para 15.000 km.',
  },
]

// ─── Tire Pressures ───────────────────────────────────────────────────────────

const TIRE_PRESSURES = [
  {
    modelName: 'YBR 125',
    yearFrom: 2001, yearTo: 2016,
    tireSize: '70/90-17 (F) · 80/90-17 (R)',
    frontPsi: 26, rearPsi: 29, frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Aro 17" em ambos os eixos. Com garupa: 29/33 PSI. Pneus originais de perfil alto (90) — mais confortáveis em paralelepípedo. Pirelli City Dragon ou Metzeler Feelfree para substituição.',
  },
  {
    modelName: 'FACTOR 125I',
    yearFrom: 2016, yearTo: 2024,
    tireSize: '70/90-17 (F) · 80/90-17 (R)',
    frontPsi: 26, rearPsi: 29, frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Mesmas dimensões do YBR 125. Com garupa: 29/33 PSI. Pirelli City Dragon é a substituição mais popular.',
  },
  {
    modelName: 'FACTOR 150',
    yearFrom: 2014, yearTo: 2024,
    tireSize: '70/90-17 (F) · 80/90-17 (R)',
    frontPsi: 26, rearPsi: 29, frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Aro 17" em ambos. Com garupa: 29/33 PSI. Mesmos pneus do YBR 125 e Factor 125i. Para uso de motoboy: verificar calibragem 2x por semana — carga constante + irregularidades do trânsito.',
  },
  {
    modelName: 'YBR 125i',
    yearFrom: 2016, yearTo: 2024,
    tireSize: '2.75-18 (F) · 90/90-18 (R)',
    frontPsi: 26, rearPsi: 29, frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Aro 18" em ambos os eixos (medida clássica da linha YBR desde 2001, diferente do aro 17" da Factor 150). Com garupa: 29/33 PSI. Pneu original Metzeler ME Street; Pirelli City Dragon como substituição popular. Medida amplamente disponível em qualquer borracharia do país.',
  },
  {
    modelName: 'YBR 150 FACTOR',
    yearFrom: 2021, yearTo: 2026,
    tireSize: '70/90-17 (F) · 80/90-17 (R)',
    frontPsi: 26, rearPsi: 29, frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Aro 17" em ambos os eixos. Com garupa: 29/33 PSI. Linha atual DX/E/ED/FLEX. Pirelli City Dragon, Michelin City Grip ou Metzeler Feelfree para substituição. Uso de motoboy: verificar calibragem 2x por semana.',
  },
]

// ─── Manutenção ──────────────────────────────────────────────────────────────

const makeYBR125 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40 MA/MA2 (0,9 L — SEM filtro, dreno direto)', intervalKm: 3000, intervalMonths: 6, notes: 'Motoboy: 2.500 km. Dreno direto (sem filtro). Nível: vareta + 5 min após desligar. JASO MA ou MA2.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas (adm 0,05 mm / esc 0,08 mm)', intervalKm: 12000, intervalMonths: 18, notes: 'Motor frio. Folgas MENORES que Honda CG 150 (adm 0,05 vs 0,05 mm; esc 0,08 vs 0,10 mm). Exige calibrador fino.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK CR7HSA (gap 0,7 mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Iridium CR7HIX: 16.000 km. Gap 0,7 mm (menor que Honda CG 0,9 mm). Torque: 12 Nm.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Limpeza do carburador Mikuni VM20', intervalKm: 12000, intervalMonths: 18, notes: 'Preventivo: 12.000 km. OBRIGATÓRIO: esvaziar ao guardar >10 dias com etanol. Gás carburador Yamaha.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar — inspeção e troca', intervalKm: 8000, intervalMonths: 12, notes: 'Espuma original. Lavar com detergente neutro + óleo de filtro. Troca: 12.000 km.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 428 — lubrificação e folga (15-20 mm)', intervalKm: 500, intervalMonths: null, notes: 'DID 428NZ. Coroa 41T / pinhão 14T. Lubrificar a cada 500 km. Folga: 15-20 mm.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit corrente 428 (DID 428NZ + coroa 41T + pinhão 14T)', intervalKm: 18000, intervalMonths: null, notes: 'Com lubrificação: 18.000-20.000 km. Kit completo.', priority: 'HIGH', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Amortecedores traseiros duplos — inspeção', intervalKm: 20000, intervalMonths: null, notes: 'Motoboy: 15.000-20.000 km. KYB ou Gabriel Trail como substituição. Alturas iguais nos dois lados.', priority: 'HIGH', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Registro de combustível (torneira) — inspeção de vedação', intervalKm: 20000, intervalMonths: null, notes: 'Verificar que fecha completamente (sem combustível passando para o carb desligado). Troca se vazar.', priority: 'MEDIUM', order: 9 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas e lona de freio', intervalKm: 10000, intervalMonths: null, notes: 'Lona traseira (tambor) e pastilha dianteira. Fras-le ou original. Ajuste do pedal: 20-25 mm.', priority: 'HIGH', order: 10 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria YTX5L-BS 12V 4Ah — verificação', intervalKm: null, intervalMonths: 6, notes: 'Repouso: 12,6 V. Carga: 13,5-14,5 V. Bateria pequena — não suporta sistema de som ou acessórios.', priority: 'MEDIUM', order: 11 },
]

const makeFactor125i = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40 MA2 (0,9 L — SEM filtro)', intervalKm: 3000, intervalMonths: 6, notes: 'Motoboy: 2.500 km. Mesmo óleo e volume do YBR 125. Dreno direto.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas (adm 0,05 mm / esc 0,08 mm)', intervalKm: 12000, intervalMonths: 18, notes: 'Mesmas folgas do YBR 125. Motor frio. SOHC 2 válvulas simples.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK CR7HSA (gap 0,7 mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Mesma do YBR 125. Iridium CR7HIX: 16.000 km. Fouling = IACV sujo ou sensor IAT.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Limpeza do IACV (Idle Air Control Valve)', intervalKm: 8000, intervalMonths: 12, notes: 'Motoboy: 6.000 km. Spray EFI Cleaner no corpo da borboleta. Marcha lenta oscilante = IACV ou TPS.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar — inspeção e troca', intervalKm: 8000, intervalMonths: 12, notes: 'Espuma ou papel (depende do modelo). Substituir ao detectar dano na vedação da caixa.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Ajuste/calibração do sensor IAP e TPS', intervalKm: 20000, intervalMonths: null, notes: 'Scanner Yamaha. IAP: 30.000-40.000 km em motoboy. DTC aceso: scanner obrigatório.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 428 — lubrificação e folga (15-20 mm)', intervalKm: 500, intervalMonths: null, notes: 'DID 428NZ. Coroa 41T / pinhão 14T. Lubrificar a cada 500 km.', priority: 'HIGH', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit corrente 428', intervalKm: 18000, intervalMonths: null, notes: 'Motoboy: 15.000 km. Kit completo sempre.', priority: 'HIGH', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Amortecedores traseiros duplos — inspeção', intervalKm: 20000, intervalMonths: null, notes: 'Motoboy: 15.000-18.000 km. KYB ou Gabriel Trail.', priority: 'HIGH', order: 9 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas e freio traseiro', intervalKm: 10000, intervalMonths: null, notes: 'Lona traseira e pastilha dianteira. Fras-le.', priority: 'HIGH', order: 10 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria YTX5L-BS 12V 4Ah — verificação', intervalKm: null, intervalMonths: 6, notes: 'Repouso: 12,6 V. Bateria pequena — moto não suporta acessórios elétricos adicionais.', priority: 'MEDIUM', order: 11 },
]

const makeFactor150 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-30 MA2 (0,85 L — SEM filtro)', intervalKm: 3000, intervalMonths: 6, notes: 'Motoboy: 2.500 km. Mesmo óleo e volume da Fazer 150. Dreno direto. JASO MA2 obrigatório.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas (adm 0,07 mm / esc 0,12 mm)', intervalKm: 12000, intervalMonths: 18, notes: 'Motor frio. Mesmo motor que Fazer 150. Motoboy: 10.000 km. DIFERENTE do YBR 125/Factor 125i (adm 0,05/esc 0,08).', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK CR7HSA (gap 0,7 mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Mesmo que YBR 125. Iridium CR7HIX: 16.000 km. Motoboy: 6.000 km.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Limpeza do IACV + calibração TPS', intervalKm: 8000, intervalMonths: 12, notes: 'TPS descalibrado é o mais comum. Spray EFI Cleaner no IACV. Scanner Yamaha para TPS.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar — inspeção e troca', intervalKm: 8000, intervalMonths: 12, notes: 'Verificar vedação da caixa do filtro — racha com idade. Motoboy: 6.000 km.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 428 — lubrificação e folga (15-20 mm)', intervalKm: 500, intervalMonths: null, notes: 'DID 428NZ. Coroa 39T / pinhão 14T. Lubrificar 500 km. Motoboy: 300-400 km.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit corrente 428 (coroa 39T + pinhão 14T)', intervalKm: 18000, intervalMonths: null, notes: 'Motoboy: 15.000 km. Kit completo.', priority: 'HIGH', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Amortecedores traseiros duplos — inspeção', intervalKm: 20000, intervalMonths: null, notes: 'Motoboy com garupa: 15.000-18.000 km. KYB ou Gabriel Trail.', priority: 'HIGH', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas dianteiras + freio traseiro (tambor) + fluido DOT 4 (CBS)', intervalKm: 10000, intervalMonths: 24, notes: 'Modelos com CBS: fluido DOT 4 a cada 24 meses. Lona traseira Fras-le. Disco mín 2,5 mm.', priority: 'HIGH', order: 9 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria YTX7L-BS 12V 6Ah — verificação', intervalKm: null, intervalMonths: 6, notes: 'Bateria levemente maior que YBR/Factor 125i. Motoboy: verificar mensalmente (carga + descarga frequente).', priority: 'MEDIUM', order: 10 },
]

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS = [
  { modelName: 'YBR 125',        yearFrom: 2001, yearTo: 2016, MACETES: YBR125_MACETES,       PROBLEMAS: YBR125_PROBLEMAS,       MANUTENCAO: YBR125_MANUTENCAO },
  { modelName: 'FACTOR 125I',    yearFrom: 2016, yearTo: 2024, MACETES: FACTOR125I_MACETES,    PROBLEMAS: FACTOR125I_PROBLEMAS,   MANUTENCAO: FACTOR125I_MANUTENCAO },
  { modelName: 'FACTOR 150',     yearFrom: 2014, yearTo: 2024, MACETES: FACTOR150_MACETES,     PROBLEMAS: FACTOR150_PROBLEMAS,    MANUTENCAO: FACTOR150_MANUTENCAO },
  { modelName: 'YBR 125i',       yearFrom: 2016, yearTo: 2024, MACETES: YBR125I_MACETES,       PROBLEMAS: YBR125I_PROBLEMAS,      MANUTENCAO: YBR125I_MANUTENCAO },
  { modelName: 'YBR 150 FACTOR', yearFrom: 2021, yearTo: 2026, MACETES: YBR150FACTOR_MACETES,  PROBLEMAS: YBR150FACTOR_PROBLEMAS, MANUTENCAO: YBR150FACTOR_MANUTENCAO },
]

const makeYBR125i = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40 MA2 (~1,0 L — SEM filtro, dreno direto)', intervalKm: 3000, intervalMonths: 6, notes: 'Motoboy: 2.500 km. Dreno direto. Nível: vareta + 5 min após desligar. JASO MA2.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas (adm 0,05 mm / esc 0,08 mm)', intervalKm: 12000, intervalMonths: 18, notes: 'Motor frio. Mesmas folgas do YBR 125 carburado.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK MR8D-9 (geração EFI — NÃO é a CR7HSA do carburado)', intervalKm: 8000, intervalMonths: 12, notes: 'Atenção: modelo de vela diferente do YBR 125 carburado. Confirmar geração antes de comprar.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Limpeza do IACV e corpo de borboleta', intervalKm: 8000, intervalMonths: 12, notes: 'Motoboy: 6.000 km. Spray EFI Cleaner. Marcha lenta oscilante = IACV sujo ou TPS.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar — inspeção e troca', intervalKm: 8000, intervalMonths: 12, notes: 'Verificar vedação da caixa do filtro. Troca: 12.000 km.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Verificação do sensor IAP e TPS', intervalKm: 20000, intervalMonths: null, notes: 'Scanner Yamaha. Falha parcial pode não acender DTC — consumo sobe e potência cai aos poucos.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 428 — lubrificação e folga (15-20 mm)', intervalKm: 500, intervalMonths: null, notes: 'DID 428NZ. Coroa 41T / pinhão 14T. Lubrificar a cada 500 km.', priority: 'HIGH', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit corrente 428 (coroa 41T + pinhão 14T)', intervalKm: 18000, intervalMonths: null, notes: 'Motoboy: 15.000 km. Kit completo — peça disponível em qualquer cidade.', priority: 'HIGH', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas e lona de freio', intervalKm: 10000, intervalMonths: null, notes: 'Lona traseira e pastilha dianteira. Prefira marca reconhecida (Fras-le, Cobreq).', priority: 'HIGH', order: 9 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria YTX5L-BS 12V 4Ah — verificação', intervalKm: null, intervalMonths: 6, notes: 'Repouso: 12,6 V. Bateria pequena — não suporta acessórios elétricos adicionais.', priority: 'MEDIUM', order: 10 },
]

const makeYBR150Factor = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo (1,00 L sem filtro / 1,10 L com troca de filtro)', intervalKm: 3000, intervalMonths: 6, notes: 'Motoboy: 2.500 km. Spec do manual oficial Factor 150 UBS. Confirmar viscosidade na etiqueta do bocal/manual do ano específico.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas', intervalKm: 12000, intervalMonths: 18, notes: 'Motor frio. Motoboy: 10.000 km. Confirmar folga exata no manual do ano específico.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK MR8D (gap 0,8-0,9 mm — geração atual, NÃO é a CR7HSA da Factor 150 2014-2020)', intervalKm: 8000, intervalMonths: 12, notes: 'Spec do manual oficial Yamaha. Confirmar geração antes de comprar peça.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Limpeza do IACV + calibração do TPS', intervalKm: 8000, intervalMonths: 12, notes: 'TPS descalibrado é o problema mais comum. Spray EFI Cleaner + scanner Yamaha.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar — inspeção e troca', intervalKm: 8000, intervalMonths: 12, notes: 'Verificar vedação da caixa do filtro. Motoboy: 6.000 km.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 428 — lubrificação e folga (15-20 mm)', intervalKm: 500, intervalMonths: null, notes: 'DID 428NZ. Coroa 39T / pinhão 14T. Lubrificar 500 km. Motoboy: 300-400 km.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit corrente 428 (coroa 39T + pinhão 14T)', intervalKm: 18000, intervalMonths: null, notes: 'Motoboy: 15.000 km. Kit completo.', priority: 'HIGH', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Amortecedores traseiros duplos — inspeção', intervalKm: 20000, intervalMonths: null, notes: 'Motoboy com garupa: 15.000-18.000 km. KYB ou Gabriel Trail.', priority: 'HIGH', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Freio dianteiro (disco nas versões ED/DX) + traseiro (tambor)', intervalKm: 10000, intervalMonths: null, notes: 'Pastilha Fras-le/Cobreq. Disco mín 2,5 mm. Versões básicas mantêm tambor nos dois eixos.', priority: 'HIGH', order: 9 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria — verificação', intervalKm: null, intervalMonths: 6, notes: 'Repouso: 12,6 V. Confirmar modelo exato de bateria no manual do ano específico.', priority: 'MEDIUM', order: 10 },
]

const ALL_MANUTENCAO: MaintenanceItemInput[] = [
  ...makeYBR125('YBR 125', 2001, 2016),
  ...makeFactor125i('FACTOR 125I', 2016, 2024),
  ...makeFactor150('FACTOR 150', 2014, 2024),
  ...makeYBR125i('YBR 125i', 2016, 2024),
  ...makeYBR150Factor('YBR 150 FACTOR', 2021, 2026),
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
