// seed-yamaha-crosser.ts — Yamaha Crosser 150 · Crosser 160 · Lander 250 · Ténéré 250 · XTZ 250X
// Crosser 150 (2014-2021): 149cc SOHC Blue Core FLEXONE — concorrente direta da NXR Bros
// Crosser 160 (2021-2024): 162cc SOHC atualizado
// Lander 250 (2008-2024): 249cc SOHC (carb até 2019, EFI 2020+)
// Ténéré 250 (2011-2024): 249cc SOHC (mesma mecânica da Lander) — mais off-road
// XTZ 250X (2008-2011): 249cc SOHC (mesmo motor da Lander) — variante SUPERMOTARD, aro 17" e pneus street
//
// ATENÇÃO — matching de modelName com a FIPE (ver apps/web/app/api/tips/route.ts::matchesStoredName):
// a FIPE (marca Yamaha, código 101) usa o padrão "<código> <cilindrada> <nome> <sufixo>" e tem
// inconsistência de espaçamento (espaço duplo em alguns registros) e grafia "TENERE" SEM acento.
// Os modelName legados "CROSSER 150"/"CROSSER 160"/"LANDER 250"/"TÉNÉRÉ 250" NÃO batem com os nomes
// reais da FIPE hoje — foram mantidos por compatibilidade, mas os blocos "CROSSER"/"LANDER"/"TENERE"
// (sem número, sem acento) abaixo são os que efetivamente casam via substring/word-boundary. Ver
// scratchpad de verificação: todas as 9 strings FIPE atuais (XTZ 150 CROSSER E/ED/S/Z FLEX,
// XTZ 250 LANDER .../CAPITÃO AMÉRICA/CONNECTED, XTZ 250 TENERE/TENERE BLUEFLEX, XTZ 250X) têm match.
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

// ─── CROSSER 150 / 160 (2014-2024) ───────────────────────────────────────────

const CROSSER150_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 149cc Blue Core SOHC — óleo 10W-30 MA2, 0,85 L SEM filtro (mesmo que Fazer 150); válvulas adm 0,07 mm / esc 0,12 mm',
    body: 'A Crosser 150 usa o mesmo motor Blue Core 149cc da Fazer 150 — mesma capacidade de óleo (0,85 L), sem filtro substituível, mesmas folgas de válvula (adm 0,07 / esc 0,12 mm). PORÉM: a Crosser é usada em off-road, o que exige troca de óleo mais frequente que a Fazer (que é só asfalto). Em uso misto: 3.000 km. Em trilha intensiva: 2.500 km. Oleo fica mais contaminado por partículas em uso off-road.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar entupindo muito rápido em trilhas — intervalo de inspeção reduzido para 1.000-2.000 km em uso off-road; nunca use sem filtro',
    body: 'A Crosser 150 tem ponto fraco documentado: o filtro de ar entope MUITO mais rápido que a Fazer 150 (mesma caixa de filtro, mas uso off-road). Em trilhas com terra fina: filtro pode entupir em 1.000-2.000 km. Sintoma: motor perde potência progressivamente, consumo aumenta, vela escurece. Inspeção: retirar o filtro e olhar contra a luz — se não passa luz, trocar. Filtro lavável K&N/UNI: alternativa mas requer limpeza mais frequente em off-road.',
  },
  {
    severity: 'WARN',
    title: 'Corrente 428 desgastando MUITO mais rápido que em motos de asfalto — lubrificar a cada 200-300 km em trilha e a cada 400 km em asfalto',
    body: 'A corrente da Crosser em uso off-road sofre abrasão de areia e terra que desgasta os roletes muito mais rápido que em asfalto. DID 428NZ (sem o-ring, mais fácil de lavar) é a escolha de off-roaders. Coroa 42T / pinhão 14T original. Kit em uso off-road: 12.000-15.000 km (vs 20.000 km em asfalto). Lubrificar: DEPOIS de lavar a corrente da trilha — nunca lubrifique corrente suja. Spray de corrente resistente a água e areia (DID Chain Lube ou WD-40 Heavy Duty Chain Lube).',
  },
  {
    severity: 'OK',
    title: 'Pneus aro 21" dianteiro / 18" traseiro (mesmos da NXR Bros/XRE 300) — mas Crosser usa 80/90-21 F e 100/90-18 R (perfil diferente da NXR)',
    body: 'Crosser 150: 80/90-21 (F) e 100/90-18 (R). NXR 160: 80/100-21 (F) e 90/90-18 (R). Os tamanhos são próximos mas não idênticos. Fabricantes compatíveis com Crosser 150: Pirelli MT21 (R$180-240 traseiro), Michelin Anakee Wild (R$250-320), Metzeler Enduro 3 Sahara (R$220-280). Calibragem off-road: 20-22 PSI F / 25-28 PSI R. Asfalto: 28 PSI F / 32 PSI R. Aro 21" dianteiro melhora a passagem em obstáculos — não substitua por aro 19".',
  },
  {
    severity: 'OK',
    title: 'FLEXONE — etanol é a melhor escolha para uso off-road; motor mais frio + mais torque = melhor para subidas e trilhas pesadas',
    body: 'Em uso off-road, etanol traz vantagem sobre gasolina: motor trabalha mais frio (menos aquecimento em subidas longas e esforço contínuo) e entrega mais torque em baixas rotações. Gasolina: melhor partida a frio (<15°C). Não misture combustíveis antes de trilha longa — aguarde a ECU adaptar. Tanque cheio de etanol puro é o setup ideal para trilha de dia inteiro em temperatura acima de 20°C.',
  },
]

const CROSSER150_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Corrente desgastando em 12.000-15.000 km com uso off-road — muito mais rápido que a concorrência; kit 428 completo é custo recorrente da Crosser',
    body: 'Este é o problema mais recorrente nos fóruns de Crosser 150: corrente desgastando muito rápido em uso misto. A solução oficial Yamaha é lubrificação a cada 400 km — em off-road isso não é suficiente. A corrente acumula areia dentro dos roletes entre as lubrificações. DID 428NZ (sem o-ring, fácil de lavar): R$60-90. Kit completo (corrente + coroa + pinhão): R$150-200. O custo de kit a cada 12.000-15.000 km é o "imposto" de usar a Crosser em off-road.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão dianteira telescópica simples — inadequada para trilhas técnicas com pedras; retentores falham em 20.000-25.000 km de uso off-road',
    body: 'A Crosser 150 tem suspensão dianteira telescópica convencional 33 mm (não invertida como a XRE 300 de 2014+). Para trilhas básicas é suficiente. Para trilhas técnicas com pedras e valas: desgaste acelerado dos retentores. Retentores 33 mm (Ariete): R$50-80 o par. Troca preventiva a cada 20.000 km de uso off-road. Bengala com retentor falhando em off-road pesado: mais risco que em asfalto (velocidade de impacto maior). Upgrade: não há bengala invertida aftermarket facilmente adaptável.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedor traseiro original — calibrado para peso leve; com garupa ou carregando bag, o amortecedor "funda" em impactos médios',
    body: 'O amortecedor original da Crosser 150 é adequado para um piloto leve (70 kg) em trilha básica. Com garupa ou piloto acima de 80 kg: amortecedor "funde" em impactos moderados, batendo no batente. YSS MX322-330TRL-09 (específico Crosser 150, R$250-350) ou Gabriel Trail (R$180-250). Amortecedor fundido: desconforto + risco de dano à sub-frame. Sintoma: borracha do batente aparecendo amassada na inspeção.',
  },
]

const CROSSER150_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção Crosser 150/160 por km — do primeiro serviço aos 40.000 km',
    body: 'Revisão 1.000 km (garantia): troca de óleo grátis + aperto geral + regulagem de corrente. 3.000 km: troca de óleo 10W-30 MA2 (0,85 L, sem filtro) — reduza para 2.500 km em uso off-road. 6.000 km: óleo + inspeção do filtro de ar (troque se sujo; em trilha, inspecione a cada 1.000-2.000 km). 8.000 km: vela NGK CR7HSA (gap 0,7 mm) + pastilhas de freio (inspeção). 9.000 km: óleo. 12.000 km: óleo + regulagem de válvulas (adm 0,07 mm / esc 0,12 mm, motor frio) + filtro de ar (troca). 15.000 km: kit de corrente 428 completo (corrente DID 428NZ + coroa 42T + pinhão 14T) — antecipe para 12.000 km em uso off-road intensivo. 18.000 km: óleo. 20.000 km: retentores de bengala 33 mm (Ariete) + verificação do amortecedor traseiro (troque se "fundar" no batente). 24.000 km: óleo + válvulas. A cada 300-400 km: lubrificação da corrente (200-300 km se rodar em trilha). A cada 6 meses: verificação da bateria YTX7L-BS (12,6 V em repouso). Este cronograma cobre uso misto asfalto/off-road — ajuste os intervalos de óleo, filtro de ar e corrente para baixo se o uso for majoritariamente off-road.',
  },
]

// ─── LANDER 250 (2008-2024) ──────────────────────────────────────────────────

const LANDER250_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 249cc SOHC 2 válvulas — carburador até 2019 (Keihin CVK34), EFI Fuel Injection a partir de 2020; manutenção completamente diferente entre gerações',
    body: 'Lander 250 tem duas gerações de motor radicalmente diferentes em manutenção: (1) 2008-2019: carburador Keihin CVK34 — exige limpeza preventiva a cada 12.000 km, esvaziamento ao guardar por >2 semanas com etanol. (2) 2020-2024: sistema de injeção eletrônica — sem carburador, TPS, sensor IAT, IACV. Válvulas: adm 0,08 mm / esc 0,12 mm (ambas as gerações). Óleo: 1,1 L com filtro. Vela: NGK CPR8EA-9 (ambas). Kit relação: 520 (ambas).',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 MA2, 1,1 L com filtro — Lander 250 TEM filtro substituível; Hiflofiltro HF145 compatível',
    body: 'Lander 250 usa 1,1 L de óleo com filtro (mais que a Fazer 150 sem filtro). Hiflofiltro HF145 (mesma família da Fazer 250). Óleo: 10W-40 JASO MA2. Troca: 4.000 km (uso misto asfalto/terra) ou 3.000 km (off-road intenso). Em uso de trilha com temperatura alta: 10W-50 adiciona proteção extra em subidas longas. Dreno: parafuso M12×1,5, torque 23 Nm.',
  },
  {
    severity: 'WARN',
    title: 'Carburador Keihin CVK34 (versões 2008-2019) — entupimento com etanol parado por >2 semanas; solução: esvaziar o flutuador antes de guardar',
    body: 'O carburador CVK34 da Lander 2008-2019 entunga quando etanol fica parado. O álcool fermenta e forma verniz (depósito resinoso) nas passagens do carburador, especialmente no jato principal. Ao guardar a moto por mais de 15 dias: feche o registro de combustível + ligue o motor até esgotamento do carburador + abra o parafuso de dreno do flutuador. Limpeza do carb entupido: ultrassom R$150-250 ou manual por mecânico R$100-180. Jato principal original: 115 (gasolina) ou 128 (etanol puro).',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CPR8EA-9 (gap 0,9 mm) — mesma família que PCX 160 e Lander; troca a cada 8.000 km; iridium CPR8EAIX-9 dura 16.000 km',
    body: 'Lander 250 usa NGK CPR8EA-9 em ambas as gerações (carburador e injeção). Gap 0,9 mm. Iridium: CPR8EAIX-9 (R$70-90). Troca: 8.000 km. Em uso off-road com etanol: a vela tende a carbonizar em baixas rotações — iridium melhora a ignição em regimes baixos. Verificar a vela a cada 4.000 km em uso off-road (inspeção, não necessariamente troca).',
  },
  {
    severity: 'OK',
    title: 'Pneus aro 21" F / 18" R (mesmos da XRE 300 e Crosser 150) — Lander usa 80/100-21 F e 110/90-18 R (mesmos da XRE 300); pneus da XRE 300 são compatíveis',
    body: 'Lander 250 compartilha os mesmos tamanhos de pneu com a XRE 300: 80/100-21 (F) e 110/90-18 (R). TODA peca de pneu e câmara compatível entre Lander 250 e XRE 300. Pirelli MT15 traseiro (R$190-250), Michelin Anakee Wild (R$240-300). Calibragem off-road: 22 PSI F / 26 PSI R. Asfalto: 29 PSI F / 33 PSI R. A Lander com pneu de asfalto roda melhor em estrada mas perde muito em terra — pneu dual-sport (Pirelli MT60 RS) é o equilíbrio.',
  },
  {
    severity: 'WARN',
    title: 'Protetor de motor — AUSENTE de fábrica; carter de alumínio exposto; instalar antes do primeiro off-road',
    body: 'A Lander 250 não tem protetor de motor de fábrica. O carter de alumínio fica completamente exposto a pedras e galhos. Em off-road: pedras no carter = motor quebrado com custo R$800-2.000. Protetor Tury alumínio 3-4 mm (específico Lander 250): R$150-250. Protetor XRE 300 pode ser adaptável (pesquisar no clube de owners). Instalação: antes da primeira saída de terra. Parafusos de fixação: verificar torque a cada 5.000 km.',
  },
]

const LANDER250_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Tanque de combustível de aço — corrosão interna após etanol parado por 3+ semanas; partículas de ferrugem entopem o carb/bico (versão carb E EFI)',
    body: 'O tanque de aço da Lander 250 (todas as gerações) sofre corrosão interna acelerada com etanol. Partículas de ferrugem: passam pelo filtro de combustível e entopem o carburador (2008-2019) ou o injetor (2020+). Tratamento preventivo: kit de tratamento interno de tanque (Rust Oleum ou similar) a cada 3-4 anos. Filtrinho de combustível: trocar a cada 20.000 km. Combustível com cor alaranjada no filtro = ferrugem no tanque — limpar antes de prosseguir.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão dianteira telescópica 43 mm — mais robusta que Crosser 150 mas ainda inadequada para trilhas técnicas sérias; retentores 25.000-30.000 km',
    body: 'A Lander 250 tem bengala 43 mm (mais robusta que a Crosser 150 de 33 mm) mas ainda convencional (não invertida). Para uso off-road moderado é suficiente. Para trilhas sérias com pedras: considere a XRE 300 com bengala invertida. Retentores 43 mm: Ariete (R$80-130 o par). Troca preventiva a cada 25.000-30.000 km. Em trilha, a lama abrasiva na haste acelera o desgaste dos retentores — limpar a haste após cada saída de trilha molhada.',
  },
  {
    severity: 'OK',
    title: 'Amortecedor traseiro original adequado para uso misto mas insuficiente para trilhas pesadas — upgrade YSS é popular na comunidade Lander',
    body: 'O amortecedor original da Lander 250 é calibrado para uso misto. Em trilhas pesadas: YSS MX322-330TRL (R$350-500) oferece muito mais controle. Amortecedor original fundido (atingindo batente em impactos médios): troca mais urgente em Lander 250 do que em Crosser 150 por ser a moto mais usada em aventuras longas. Verificação: comprimir a traseira com a mão — amortecedor gasto não oferece resistência nos últimos 2 cm de curso.',
  },
]

const LANDER250_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção Lander 250 por km — carburada (2008-2019) e injetada (2020-2024)',
    body: 'Revisão 1.000 km (garantia): óleo grátis + aperto geral. 4.000 km: óleo 10W-40 MA2 com filtro (1,1 L, Hiflofiltro HF145) — reduza para 3.000 km em off-road intenso. 8.000 km: óleo + filtro + vela NGK CPR8EA-9 (gap 0,9 mm) + filtro de ar (inspeção/troca; 4.000 km em off-road). 12.000 km: óleo + filtro + regulagem de válvulas (adm 0,08 mm / esc 0,12 mm) — nas versões carburadas (2008-2019), aproveite para limpeza preventiva do carburador Keihin CVK34. 16.000 km: óleo + filtro + vela. 20.000 km: óleo + filtro + kit de corrente 520 completo (coroa 44T + pinhão 16T) + filtro de combustível + retentores de bengala 43 mm (Ariete) se em uso off-road pesado. 24.000 km: óleo + filtro + válvulas. A cada 400 km: lubrificação da corrente (200-300 km em trilha), folga 30-40 mm. A cada 6 meses: verificação da bateria YTX7L-BS. A cada 3 anos: tratamento interno do tanque de aço contra corrosão (Rust Oleum ou similar). Protetor de motor: NÃO vem de fábrica — instale antes do primeiro off-road e verifique fixação a cada 5.000 km. Modelos com EFI (2020+): substitua a limpeza de carburador por leitura anual de DTCs/TPS via scanner.',
  },
]

// ─── TENERE 250 (2011-2024) ───────────────────────────────────────────────────

const TENERE250_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor idêntico ao da Lander 250 — toda manutenção de motor é igual (válvulas, vela, óleo, filtro); diferença está no chassi e posição de pilotagem',
    body: 'A Ténéré 250 compartilha 100% do motor com a Lander 250: 249cc SOHC, óleo 1,1 L com filtro, NGK CPR8EA-9 (gap 0,9 mm), válvulas adm 0,08 / esc 0,12 mm, corrente 520. Carburador Keihin CVK34 (2011-2019) ou EFI (2020+). Diferenças: chassi mais alto (assento 840 mm vs 815 mm), tanque maior (12,3 L vs 12 L), posição de pilotagem mais vertical. Toda peça de motor: intercambiável entre Lander 250 e Ténéré 250.',
  },
  {
    severity: 'WARN',
    title: 'Assento alto (840 mm) — moto indicada para pilotos com mais de 175 cm; baixar o assento com espuma menos densa é a solução mais simples e econômica',
    body: 'A Ténéré 250 tem assento a 840 mm — alta para pilotos de baixa estatura. Em off-road isso é vantagem (mais desfolga para os pés em obstáculos). Para uso diário: assento rebaixado por estofador R$100-200 (remover camada de espuma por baixo do couro). Lowering links (links de rebaixamento): reduzem 20-30 mm mas afetam o ângulo de ataque da suspensão. Muitos pilotos baixos preferem a Lander 250 (assento 815 mm) exatamente por isso.',
  },
  {
    severity: 'OK',
    title: 'Protetor de motor OBRIGATÓRIO — carter mais exposto que na Lander 250 por posição de motor mais avançada no chassi off-road; instale antes da primeira saída',
    body: 'A Ténéré 250 tem o motor ligeiramente mais exposto que a Lander 250 por conta da geometria do chassi off-road (trail mais longo). Em trilha: pedras com mais área de exposição. Protetor de alumínio 3-4 mm é OBRIGATÓRIO antes do primeiro off-road. Se o protetor específico da Ténéré 250 não for facilmente encontrado: o da Lander 250 pode ser adaptável (medir distâncias antes de comprar). Custo do motor quebrado sem protetor: R$1.200-2.500 (mais caro que motor Lander por menor disponibilidade de peças).',
  },
  {
    severity: 'WARN',
    title: 'Tanque grande (12,3 L) vs peso alto — Ténéré 250 pesa 136 kg seca; com tanque cheio (>9 kg) muda o centro de gravidade; importante em manobras de baixa velocidade em trilha',
    body: 'O tanque de 12,3 L da Ténéré é um diferencial (mais autonomia em trilha) mas adiciona peso alto quando cheio. Com tanque cheio em trilha técnica: moto fica mais pesada para segurar em desequilíbrios. Dica de trilha: complete o tanque ao sair, não no meio da trilha. Após 6-7 L consumidos: moto fica mais leve e manobrável nos trechos difíceis. Autonomia típica: 340-400 km (uso misto) ou 280-320 km (off-road pesado).',
  },
]

const TENERE250_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Carburador Keihin CVK34 (2011-2019) — mesmo problema da Lander: verniz de etanol; MAIS crítico por ser moto de aventura que pode ficar parada 1-2 semanas entre saídas',
    body: 'A Ténéré 250 é usada tipicamente em saídas de fim de semana com períodos de 5-14 dias sem uso — tempo suficiente para o etanol começar a degradar no carburador. PROTOCOLO DE GUARDA: após cada saída, feche o registro de combustível e deixe o motor esgotare o carburador. Garante que não haja etanol parado no flutuador. Ténéré que fica parada >3 semanas com etanol: limpeza do carburador antes da próxima saída. Custo da limpeza preventiva: R$80-150.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão do tanque de aço — crítica em moto de aventura que fica em locais úmidos entre viagens; tratamento interno preventivo a cada 3 anos',
    body: 'Tanque de aço da Ténéré 250: mesma vulnerabilidade da Lander mas mais critica porque a moto fica em garagens ao ar livre entre aventuras. Clima úmido + etanol parado = corrosão acelerada. Tratamento interno com Rust Oleum Tank Treatment (R$80-120): 3-4 anos de proteção. Sintoma de corrosão: etanol com coloração avermelhada no filtro de combustível. Motor tropeçando + carb entupindo com frequência = partículas de ferrugem circulando. Limpeza de tanque corroído internamente: R$200-400 (mecânico especializado).',
  },
]

const TENERE250_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção Ténéré 250 por km — motor idêntico à Lander 250, carburada (2011-2019) e injetada (2020-2024)',
    body: 'Revisão 1.000 km (garantia): óleo grátis + aperto geral. 4.000 km: óleo 10W-40 MA2 com filtro (1,1 L, Hiflofiltro HF145) — reduza para 3.000 km em off-road intenso. 8.000 km: óleo + filtro + vela NGK CPR8EA-9 (gap 0,9 mm) + filtro de ar (inspeção/troca; 4.000 km em off-road). 12.000 km: óleo + filtro + regulagem de válvulas (adm 0,08 mm / esc 0,12 mm) — nas versões carburadas (2011-2019), limpeza preventiva do carburador Keihin CVK34 é recomendada neste ponto. 16.000 km: óleo + filtro + vela. 20.000 km: óleo + filtro + kit de corrente 520 completo (coroa 44T + pinhão 16T) + filtro de combustível. 24.000 km: óleo + filtro + válvulas. A cada 400 km: lubrificação da corrente (200-300 km em trilha). PROTOCOLO DE GUARDA (moto de aventura que fica parada entre viagens): sempre esgote o carburador antes de guardar por mais de 5-7 dias nas versões carburadas. A cada 6 meses: verificação da bateria YTX7L-BS — moto parada descarrega em 7-10 dias, use carregador trickle charge. A cada 3 anos: tratamento interno do tanque de aço. Protetor de motor: instalar antes do primeiro off-road (motor mais exposto que a Lander pela geometria do chassi).',
  },
]

// ─── CROSSER (sem número — casa com XTZ 150 CROSSER E/ED/S/Z FLEX da FIPE) ────
// Motor 149cc SOHC Blue Core FLEXONE, 4V, injeção eletrônica, refrigerado a ar,
// ~13,7 cv. Mesma base mecânica da Fazer 150. Reaproveita o conteúdo da Crosser
// 150/160 (mesma moto/mecânica — a FIPE hoje não lista uma "Crosser 160" separada).

const CROSSER_MACETES: TipInput[] = [
  ...CROSSER150_MACETES,
  {
    severity: 'OK',
    title: 'Variantes E/ED/S/Z da FIPE são a mesma mecânica — diferenças são de acabamento/cor, não de motor ou suspensão',
    body: 'A tabela FIPE lista a Crosser como "XTZ 150 CROSSER E/FLEX", "CROSSER ED/FLEX", "CROSSER S FLEX" e "CROSSER Z FLEX" — são variantes de acabamento/ano dentro da mesma geração 149cc Blue Core, não motos com mecânica diferente. Toda a manutenção (óleo, vela, corrente, filtro) é idêntica entre as variantes. Ao procurar peças, use "Crosser 150" ou "XTZ 150" — funciona para qualquer sufixo de letra.',
  },
]

const CROSSER_PROBLEMAS: TipInput[] = [...CROSSER150_PROBLEMAS]
const CROSSER_MANUTENCAO: TipInput[] = [...CROSSER150_MANUTENCAO]

// ─── LANDER (sem número — casa com XTZ 250 LANDER .../CAPITÃO AMÉRICA/CONNECTED) ─
// Motor 249cc SOHC 2V, injeção eletrônica (EFI 2020+) ou carburador Keihin CVK34
// (até 2019), refrigerado a ar, ~20,8 cv. Reaproveita o conteúdo da Lander 250.

const LANDER_MACETES: TipInput[] = [
  ...LANDER250_MACETES,
  {
    severity: 'OK',
    title: 'Variantes "LANDER 249cc/LANDER BLUEFLEX/ABS", "CAPITÃO AMÉRICA FLEX ABS" e "CONNECTED" na FIPE — edições especiais com a MESMA mecânica base',
    body: 'A FIPE lista a Lander em três formas: "XTZ 250 LANDER 249cc/LANDER BLUEFLEX/ABS" (linha regular, com ou sem ABS), "XTZ 250 LANDER CAPITÃO AMÉRICA FLEX ABS" (edição especial temática, sempre com ABS) e "XTZ 250 LANDER CONNECTED" (versão com painel conectado ao smartphone). As três compartilham o mesmo motor 249cc e a mesma manutenção — a diferença está em grafismo, painel (Connected) ou presença de ABS de série. Peças de motor, suspensão e transmissão são intercambiáveis entre as três.',
  },
]

const LANDER_PROBLEMAS: TipInput[] = [...LANDER250_PROBLEMAS]
const LANDER_MANUTENCAO: TipInput[] = [...LANDER250_MANUTENCAO]

// ─── XTZ 250 TENERE (casa com "XTZ 250 TENERE/TENERE BLUEFLEX" da FIPE) ──────
// Motor 249cc SOHC 2V, mesma base da Lander. NÃO confundir com a XT 600/660
// Ténéré ou a XTZ 700/750 S Ténéré (motos muito maiores, cobertas em
// seed-yamaha-tenere-adventure.ts). modelName usa o prefixo "XTZ 250" completo
// (não apenas "TENERE") de propósito: uma stored name bare "TENERE" bateria por
// substring também em "XT 600 Z TENERE" e "XT 1200 Z SUPER TENERE/DX" (que não
// têm acento na FIPE) e misturaria conteúdo de motos completamente diferentes —
// ver apps/web/app/api/tips/route.ts, que combina tips de TODAS as stored names
// que derem match, sem noção de "match mais específico".

const TENERE_MACETES: TipInput[] = [
  ...TENERE250_MACETES,
  {
    severity: 'OK',
    title: 'A FIPE grafa "TENERE" sem acento — não confundir com a XT 600/660 Ténéré e a XTZ 700/750 Ténéré (motos muito maiores)',
    body: 'A tabela FIPE registra o modelo como "XTZ 250 TENERE/TENERE BLUEFLEX", sem acento no "e". É a mesma Ténéré 250 (249cc, mesma mecânica da Lander) — a grafia sem acento é só uma particularidade da base da FIPE, não indica outra moto. Cuidado ao pesquisar peças ou preços: existem também a Yamaha XT 600 Z Ténéré, XT 660 Z Ténéré, XTZ 700 Ténéré e a recém-chegada XTZ 750 S Ténéré, motos muito maiores (1 e 2 cilindros de 600cc a 750cc) com mecânica, preço e propósito completamente diferentes — não confundir as famílias.',
  },
]

const TENERE_PROBLEMAS: TipInput[] = [...TENERE250_PROBLEMAS]
const TENERE_MANUTENCAO: TipInput[] = [...TENERE250_MANUTENCAO]

// ─── XTZ 250X (2008-2011) ──────────────────────────────────────────────────────
// Motor 249cc SOHC 2V (mesmo bloco da Lander 250), injeção eletrônica, ~20,8 cv
// a 8.000 rpm, 2,09 kgf.m a 6.500 rpm. Variante SUPERMOTARD: rodas de liga leve
// aro 17" (F/R) com pneus street/esportivos — ao contrário da Lander (aro 21"/18"
// com raios e pneu misto). Suspensão dianteira com calibração mais rígida.
// Peso seco ~143 kg, tanque 11 L. Produzida só 2008-2011 (~3 anos), descontinuada.
// Fontes: motonline.com.br/guia-de-motos/yamaha/xtz-250-x, revista.moto.com.br,
// motociclismoonline.com.br/testes/xtz-250x-encara-terra-e-asfalto-7.

const XTZ250X_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor idêntico à Lander 250 — toda manutenção de motor (óleo, vela, válvulas, filtro) é igual; o que muda é só a ciclística (rodas 17" e suspensão)',
    body: 'A XTZ 250X compartilha o mesmo motor 249cc SOHC 2 válvulas da Lander 250: óleo 10W-40 MA2 (1,1 L com filtro), vela NGK CPR8EA-9 (gap 0,9 mm), válvulas adm 0,08 mm / esc 0,12 mm, corrente 520. A diferença está inteiramente na parte ciclística: rodas de liga leve aro 17" (F/R) no lugar das rodas raiadas 21"/18" da Lander, pneus street/esportivos no lugar de pneu misto, e suspensão dianteira com calibração mais rígida (mais firme, voltada para asfalto). Toda peça de motor é intercambiável com a Lander 250 e a Ténéré 250.',
  },
  {
    severity: 'WARN',
    title: 'Pneus street aro 17" (Pirelli esportivo original) — moto NÃO foi projetada para terra; grip muito limitado fora do asfalto',
    body: 'Ao contrário da Lander e da Ténéré, a XTZ 250X é uma supermotard: rodas de liga leve aro 17" com pneus street (Pirelli esportivo de origem). Em terra ou cascalho o grip é muito limitado e a suspensão transmite as imperfeições do terreno de forma mais dura ao piloto — não é a moto certa para trilha. Pneus de reposição recomendados: Pirelli Sport Demon ou Technic (aro 17", medidas de moto street/supermotard leve — confirme a medida exata gravada no pneu original antes de comprar, pois pode variar entre 100/80-17 e 110/70-17 conforme o ano). Michelin Pilot Street 2 é outra opção compatível com o uso urbano/asfalto da moto.',
  },
  {
    severity: 'OK',
    title: 'Peça rara e moto descontinuada desde 2011 — produção de só ~3 anos; buscar peças específicas de ciclística (rodas, suspensão) em desmanches ou grupos de owners',
    body: 'A XTZ 250X foi vendida no Brasil apenas entre 2008 e 2011 — produção curta comparada à Lander e Ténéré, que seguem em linha. Peças de motor (compartilhadas com Lander/Ténéré 250) são fáceis de achar em qualquer loja Yamaha. Peças específicas da ciclística supermotard (rodas 17", carenagens, suspensão calibrada) são mais raras — desmanches especializados em Yamaha ou grupos de owners (Facebook "Yamaha XTZ 250X Brasil") costumam ser a melhor fonte. Ao comprar uma usada, verifique a disponibilidade de peças de suspensão antes de fechar negócio.',
  },
  {
    severity: 'OK',
    title: 'Câmbio "curto" — 6ª marcha necessária mesmo em rotações mais altas; boa relação para cidade, menos ideal para rodovia longa',
    body: 'Relatos de teste apontam que a XTZ 250X "pede" a sexta marcha com mais frequência em velocidade de rodovia, sugerindo uma relação de câmbio mais curta (voltada para trânsito urbano/agilidade, coerente com a proposta supermotard). Para uso predominante de estrada, mantenha a rotação monitorada — o motor de 249cc trabalha mais solicitado em velocidades de rodovia longa nesta configuração do que na Lander.',
  },
  {
    severity: 'OK',
    title: 'Refrigeração mista (ar + radiador de óleo) — mesmo sistema da Lander; verificar aletas do radiador de óleo limpas em uso urbano com trânsito parado',
    body: 'A XTZ 250X usa refrigeração mista a ar com radiador de óleo (mesmo sistema da Lander 250). Em uso urbano com trânsito parado por longos períodos, o motor pode aquecer mais que em rodovia — mantenha as aletas do radiador de óleo livres de sujeira e insetos. Não é um motor líquido-refrigerado; não existe reservatório de água para verificar.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão dianteira mais rígida que a Lander — desconfortável em buracos de asfalto urbano; verificar óleo da bengala a cada 20.000 km',
    body: 'A calibração mais firme da suspensão dianteira (voltada para resposta em curva, estilo supermotard) transmite mais os buracos do asfalto urbano brasileiro do que a Lander. Óleo de bengala: trocar a cada 20.000 km (10W, mesma especificação da família XTZ 250). Retentores: Ariete compatível com a medida da bengala da Lander/Ténéré (confirmar diâmetro antes de comprar — pode ter variação por ser versão supermotard).',
  },
  {
    severity: 'OK',
    title: 'FLEXONE — mesma recomendação de combustível da Lander/Ténéré; etanol favorece torque em baixa, gasolina facilita partida a frio',
    body: 'Motor flex, mesma lógica da Lander/Ténéré: etanol entrega mais torque em baixas rotações (bom para trânsito urbano, uso predominante desta moto), gasolina facilita a partida a frio abaixo de 15°C. Como a XTZ 250X é majoritariamente urbana, etanol costuma ser a escolha mais econômica e com bom desempenho no dia a dia.',
  },
]

const XTZ250X_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Escassez de peças de ciclística — moto descontinuada em 2011; rodas 17", carenagens e itens específicos de suspensão ficam cada vez mais difíceis de achar novos',
    body: 'Por ter sido vendida só entre 2008-2011, a XTZ 250X tem oferta de peças de motor garantida (compartilha com Lander/Ténéré, que seguem em produção), mas peças exclusivas da ciclística supermotard — rodas de liga 17", plásticos/carenagens específicos, calibração de suspensão — ficam cada vez mais escassas no mercado novo. Planeje comprar peças de ciclística usadas ou remanufaturadas com antecedência, e evite acidentes que danifiquem carenagem original se possível.',
  },
  {
    severity: 'WARN',
    title: 'Pneus street em uso fora do asfalto — grip insuficiente e maior risco de queda em pista molhada, terra ou cascalho',
    body: 'O conjunto aro 17"/pneu street que diferencia a 250X da Lander é também sua maior limitação seguraça fora do asfalto seco. Testes de época relatam grip "muito limitado" em terra, com a suspensão mais rígida amplificando o desconforto e o risco em piso irregular. Se o uso real inclui trechos de terra com frequência, a Lander ou a Ténéré (aro 21"/18", pneu misto) são escolhas mais seguras — a 250X foi pensada para asfalto urbano.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão do tanque de aço — mesma vulnerabilidade da Lander/Ténéré; agravada em moto usada com menos frequência hoje (peça de coleção/segunda mão)',
    body: 'A XTZ 250X usa o mesmo tanque de aço da família Lander/Ténéré, com a mesma vulnerabilidade a corrosão interna por etanol parado. Como a maioria das unidades hoje é usada/coleção e roda com menos frequência que uma moto em uso diário, o risco de etanol parado por semanas é maior. Tratamento interno preventivo (Rust Oleum Tank Treatment) a cada 3 anos é ainda mais importante nesta moto. Sintoma: coloração avermelhada no filtro de combustível.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão dianteira mais dura — desgaste acelerado em ruas esburacadas; retentores e óleo de bengala pedem atenção redobrada no uso urbano brasileiro',
    body: 'A calibração mais rígida da suspensão, pensada para resposta em curva de asfalto liso, sofre mais com buracos e lombadas do trânsito urbano brasileiro do que a calibração mais complacente da Lander. Isso acelera o desgaste de retentores em uso urbano intenso. Verificação de vazamento de óleo na bengala: a cada 10.000 km (mais frequente que os 20.000-25.000 km recomendados para a Lander).',
  },
  {
    severity: 'OK',
    title: 'Motor compartilhado e maduro — poucos problemas de motor documentados; a maior parte das queixas da 250X é sobre ciclística (peças raras) e não sobre confiabilidade mecânica',
    body: 'Como o motor é idêntico ao da Lander/Ténéré — uma base mecânica com mais de 15 anos de mercado e milhões de km rodados no Brasil —, a XTZ 250X não tem problemas de motor documentados além dos já conhecidos da família 249cc (corrosão de tanque, entupimento de carburador com etanol parado nas versões antigas). A maior parte das reclamações de owners da 250X é sobre disponibilidade de peças de ciclística, não sobre confiabilidade mecânica.',
  },
]

const XTZ250X_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção XTZ 250X por km — motor idêntico à Lander 250, ciclística supermotard aro 17"',
    body: 'Revisão 1.000 km (garantia): óleo grátis + aperto geral. 4.000 km: óleo 10W-40 MA2 com filtro (1,1 L, Hiflofiltro HF145). 8.000 km: óleo + filtro + vela NGK CPR8EA-9 (gap 0,9 mm) + filtro de ar (inspeção/troca). 10.000 km: verificação de vazamento na bengala dianteira (calibração mais rígida desgasta retentor mais rápido que na Lander). 12.000 km: óleo + filtro + regulagem de válvulas (adm 0,08 mm / esc 0,12 mm) + limpeza preventiva do carburador/injeção conforme a versão. 16.000 km: óleo + filtro + vela. 20.000 km: óleo + filtro + kit de corrente 520 completo + filtro de combustível + troca de óleo da bengala (10W). 24.000 km: óleo + filtro + válvulas. A cada 400 km: lubrificação da corrente. A cada 6 meses: verificação da bateria (moto usada com menor frequência hoje — risco de descarga maior). A cada 3 anos: tratamento interno do tanque de aço contra corrosão (prioritário nesta moto por rodar menos km/ano em média). Pneus street aro 17": calibragem 28-30 PSI dianteiro / 32-34 PSI traseiro em uso solo, ajustar conforme carga — sempre consultar a etiqueta de calibragem no quadro ou manual, pois a 250X difere da Lander/Ténéré nesse ponto.',
  },
]

// ─── Tire Pressures ───────────────────────────────────────────────────────────

const TIRE_PRESSURES = [
  {
    modelName: 'CROSSER 150',
    yearFrom: 2014, yearTo: 2021,
    tireSize: '80/90-21 (F) · 100/90-18 (R)',
    frontPsi: 28, rearPsi: 32, frontPsiLoad: 28, rearPsiLoad: 36,
    notes: 'Aro 21" F / 18" R. Off-road: 20-22 PSI F / 25-28 PSI R. Asfalto: 28/32 PSI. Pneus 428 mais estreitos que XRE 300 — sensíveis a calibragem correta em off-road.',
  },
  {
    modelName: 'CROSSER 160',
    yearFrom: 2021, yearTo: 2024,
    tireSize: '80/90-21 (F) · 100/90-18 (R)',
    frontPsi: 28, rearPsi: 32, frontPsiLoad: 28, rearPsiLoad: 36,
    notes: 'Mesmas dimensões da Crosser 150. Off-road: 20 PSI F / 25 PSI R. Pressão baixa em aro 21": risco de desnível de aro em curvas rápidas em asfalto.',
  },
  {
    modelName: 'LANDER 250',
    yearFrom: 2008, yearTo: 2024,
    tireSize: '80/100-21 (F) · 110/90-18 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Iguais à XRE 300. Off-road: 22 PSI F / 26 PSI R. Asfalto: 29/33 PSI. Pirelli MT60 RS para uso misto. Aro 21" + pneu 110/90 traseiro: combo mais estável que XRE 300 em asfalto.',
  },
  {
    modelName: 'TÉNÉRÉ 250',
    yearFrom: 2011, yearTo: 2024,
    tireSize: '80/100-21 (F) · 110/90-18 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Idêntica à Lander 250. Off-road: 22 PSI F / 26 PSI R. Em trilha longa multi-day: checar pressão diariamente — variação de temperatura em camping afeta a calibragem.',
  },
  {
    modelName: 'CROSSER',
    yearFrom: 2014, yearTo: 2024,
    tireSize: '80/90-21 (F) · 100/90-18 (R)',
    frontPsi: 28, rearPsi: 32, frontPsiLoad: 28, rearPsiLoad: 36,
    notes: 'Mesmas dimensões da Crosser 150/160. Off-road: 20-22 PSI F / 25-28 PSI R. Asfalto: 28/32 PSI.',
  },
  {
    modelName: 'LANDER',
    yearFrom: 2008, yearTo: 2024,
    tireSize: '80/100-21 (F) · 110/90-18 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Mesmas dimensões da Lander 250 (linha regular, Capitão América e Connected). Off-road: 22 PSI F / 26 PSI R. Asfalto: 29/33 PSI.',
  },
  {
    modelName: 'XTZ 250 TENERE',
    yearFrom: 2011, yearTo: 2024,
    tireSize: '80/100-21 (F) · 110/90-18 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Idêntica à Ténéré 250 / Lander 250. Off-road: 22 PSI F / 26 PSI R. Grafia FIPE sem acento — mesma moto (não confundir com XT 600/660 ou XTZ 700/750 S Ténéré, motos maiores).',
  },
  {
    modelName: 'XTZ 250X',
    yearFrom: 2008, yearTo: 2011,
    tireSize: 'Aro 17" (F/R) — pneu street/esportivo',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Variante supermotard: rodas de liga leve aro 17" F/R (diferente da Lander, que usa 21"/18"). Confirme a medida exata gravada no pneu original antes de comprar reposição — pode variar conforme o ano. Uso solo/asfalto: 28-30 PSI F / 32-34 PSI R.',
  },
]

// ─── Manutenção ──────────────────────────────────────────────────────────────

const makeCrosser = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-30 MA2 (0,85 L — SEM filtro) + verificação de nível', intervalKm: 3000, intervalMonths: 6, notes: 'Off-road intenso: 2.500 km. Sem filtro = troca mais frequente fundamental. Nível cheio: moto na vertical, esperar 5 min após desligar.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar — inspeção off-road', intervalKm: 1500, intervalMonths: null, notes: 'Off-road em terra fina: 1.000-2.000 km. Asfalto: 8.000 km. Verificar vedação da caixa. Filtro molhado: secar antes de usar.', priority: 'CRITICAL', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas (adm 0,07 mm / esc 0,12 mm)', intervalKm: 12000, intervalMonths: 18, notes: 'Off-road intenso: 10.000 km. Motor frio. Mesmo motor que Fazer 150.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK CR7HSA (gap 0,7 mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Off-road: 6.000 km. Verificar a cada 4.000 km em uso de trilha (inspeção). Iridium CR7HIX: 14.000 km.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 428 — lavagem pós-trilha + lubrificação', intervalKm: 300, intervalMonths: null, notes: 'Off-road: lavar lama + relubrifar. DID 428NZ. Areia nos roletes = desgaste 3x mais rápido. Folga: 15-20 mm.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit corrente 428 (DID 428NZ + coroa 42T + pinhão 14T)', intervalKm: 15000, intervalMonths: null, notes: 'Off-road intenso: 12.000 km. Asfalto: 20.000 km. Troque o kit completo.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Retentores bengala 33 mm + óleo 10W', intervalKm: 20000, intervalMonths: null, notes: 'Off-road: 15.000-18.000 km. Ariete 33 mm. Haste suja de lama = retentor desgastando. Limpar haste após trilha molhada.', priority: 'HIGH', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Amortecedor traseiro — inspeção de eficiência', intervalKm: 15000, intervalMonths: null, notes: 'Batente sendo atingido = amortecedor gasto. YSS MX322 para upgrade. Verificar o parafuso do link traseiro (folga indica desgaste de rolamento).', priority: 'HIGH', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas dianteiras + freio traseiro', intervalKm: 8000, intervalMonths: null, notes: 'Off-road: 6.000 km. Lama abrasiva acelera desgaste. Disco dianteiro mín 2,5 mm.', priority: 'HIGH', order: 9 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Protetor de motor — verificação de fixação', intervalKm: 5000, intervalMonths: null, notes: 'Vibração de trilha afrouxa parafusos. Verificar torque (10-12 Nm) a cada saída longa.', priority: 'HIGH', order: 10 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria YTX7L-BS 12V 6Ah — verificação', intervalKm: null, intervalMonths: 6, notes: 'Repouso: 12,6 V. Carga: 13,5-14,5 V. Moto parada em viagem: bateria descarrega em 7-10 dias.', priority: 'MEDIUM', order: 11 },
]

const makeLander = (m: string, yf: number, yt: number, hasCarb: boolean): MaintenanceItemInput[] => {
  const items: MaintenanceItemInput[] = [
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40 MA2 + filtro (1,1 L com filtro)', intervalKm: 4000, intervalMonths: 6, notes: 'Hiflofiltro HF145. Off-road: 3.000 km. Dreno: 23 Nm. 10W-50 em uso off-road intenso no verão.', priority: 'CRITICAL', order: 1 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas (adm 0,08 mm / esc 0,12 mm)', intervalKm: 12000, intervalMonths: 18, notes: 'Motor frio, PMS compressão. SOHC 2 válvulas. Off-road: 10.000 km.', priority: 'HIGH', order: 2 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK CPR8EA-9 (gap 0,9 mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Iridium CPR8EAIX-9: 16.000 km. Off-road: verificar a cada 4.000 km.', priority: 'HIGH', order: 3 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar — inspeção e troca', intervalKm: 8000, intervalMonths: 12, notes: 'Off-road: 4.000 km. Filtro molhado: secar antes de usar. Tanque de aço: verificar cor do combustível (ferrugem = alaranjado).', priority: 'HIGH', order: 4 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de combustível', intervalKm: 20000, intervalMonths: null, notes: 'Trocar a cada 20.000 km. Ferrugem interna no tanque: trocar com mais frequência. Cor alaranjada no filtro = contaminação.', priority: 'HIGH', order: 5 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 520 — lubrificação + folga (30-40 mm)', intervalKm: 400, intervalMonths: null, notes: 'Off-road: 200-300 km. DID 520NZ (sem oring, fácil de lavar) ou DID 520VX3 (com oring). Lavar lama antes de lubrifar.', priority: 'HIGH', order: 6 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit corrente 520 (coroa 44T + pinhão 16T)', intervalKm: 20000, intervalMonths: null, notes: 'Off-road: 15.000 km. Kit completo sempre.', priority: 'HIGH', order: 7 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Protetor de motor — obrigatório e verificação periódica', intervalKm: 5000, intervalMonths: null, notes: 'Ausente de fábrica! Instalar antes do primeiro off-road. Alumínio 3-4 mm. Parafusos: 12 Nm.', priority: 'CRITICAL', order: 8 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Retentores bengala 43 mm + óleo 10W', intervalKm: 25000, intervalMonths: null, notes: 'Off-road: 20.000 km. Limpar haste após trilha molhada. Ariete 43 mm.', priority: 'HIGH', order: 9 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Amortecedor traseiro — inspeção + batente', intervalKm: 20000, intervalMonths: null, notes: 'Off-road: 15.000-18.000 km. Upgrade YSS MX322-330TRL para uso pesado.', priority: 'HIGH', order: 10 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas dianteiras + fluido DOT 4', intervalKm: 10000, intervalMonths: 24, notes: 'Off-road: 8.000 km. Disco mín 3,0 mm. Fluido DOT 4: 24 meses.', priority: 'HIGH', order: 11 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Tratamento interno do tanque de aço', intervalKm: null, intervalMonths: 36, notes: 'Rust Oleum Tank Treatment. Aplicar a cada 3 anos. Filtro com cor alaranjada = ferrugem presente.', priority: 'MEDIUM', order: 12 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria YTX7L-BS 12V 6Ah — verificação', intervalKm: null, intervalMonths: 6, notes: 'Moto de aventura que fica parada: bateria descarrega em 7-10 dias. Carregador trickle charge para períodos de guarda.', priority: 'MEDIUM', order: 13 },
  ]

  if (hasCarb) {
    items.push({
      modelName: m, yearFrom: yf, yearTo: yt,
      component: 'Limpeza do carburador Keihin CVK34',
      intervalKm: 15000, intervalMonths: 24,
      notes: 'Preventivo: 15.000 km. OBRIGATÓRIO ao guardar >2 semanas com etanol. Esvaziar flutuador. Ultrassom R$150-250. Jato principal: 115 (gasolina) / 128 (etanol puro).',
      priority: 'HIGH', order: 14
    })
  } else {
    items.push({
      modelName: m, yearFrom: yf, yearTo: yt,
      component: 'Scanner — leitura de DTCs e TPS (EFI 2020+)',
      intervalKm: null, intervalMonths: 12,
      notes: 'Anualmente ou ao acender luz de injeção. Sensor IAT mais exposto a água em off-road: DTC 7 é o mais comum.',
      priority: 'MEDIUM', order: 14
    })
  }

  return items
}

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS = [
  { modelName: 'CROSSER 150',  yearFrom: 2014, yearTo: 2021, MACETES: CROSSER150_MACETES, PROBLEMAS: CROSSER150_PROBLEMAS, MANUTENCAO: CROSSER150_MANUTENCAO },
  { modelName: 'CROSSER 160',  yearFrom: 2021, yearTo: 2024, MACETES: CROSSER150_MACETES, PROBLEMAS: CROSSER150_PROBLEMAS, MANUTENCAO: CROSSER150_MANUTENCAO },
  { modelName: 'LANDER 250',   yearFrom: 2008, yearTo: 2024, MACETES: LANDER250_MACETES,  PROBLEMAS: LANDER250_PROBLEMAS,  MANUTENCAO: LANDER250_MANUTENCAO  },
  { modelName: 'TÉNÉRÉ 250',   yearFrom: 2011, yearTo: 2024, MACETES: TENERE250_MACETES,  PROBLEMAS: TENERE250_PROBLEMAS,  MANUTENCAO: TENERE250_MANUTENCAO  },
  { modelName: 'CROSSER',      yearFrom: 2014, yearTo: 2024, MACETES: CROSSER_MACETES,    PROBLEMAS: CROSSER_PROBLEMAS,    MANUTENCAO: CROSSER_MANUTENCAO    },
  { modelName: 'LANDER',       yearFrom: 2008, yearTo: 2024, MACETES: LANDER_MACETES,     PROBLEMAS: LANDER_PROBLEMAS,     MANUTENCAO: LANDER_MANUTENCAO     },
  { modelName: 'XTZ 250 TENERE', yearFrom: 2011, yearTo: 2024, MACETES: TENERE_MACETES,   PROBLEMAS: TENERE_PROBLEMAS,     MANUTENCAO: TENERE_MANUTENCAO     },
  { modelName: 'XTZ 250X',     yearFrom: 2008, yearTo: 2011, MACETES: XTZ250X_MACETES,    PROBLEMAS: XTZ250X_PROBLEMAS,    MANUTENCAO: XTZ250X_MANUTENCAO    },
]

const ALL_MANUTENCAO: MaintenanceItemInput[] = [
  ...makeCrosser('CROSSER 150', 2014, 2021),
  ...makeCrosser('CROSSER 160', 2021, 2024),
  // Lander 250: carb (2008-2019) e EFI (2020-2024)
  ...makeLander('LANDER 250', 2008, 2019, true),
  ...makeLander('LANDER 250', 2020, 2024, false),
  // Ténéré 250: carb (2011-2019) e EFI (2020-2024)
  ...makeLander('TÉNÉRÉ 250', 2011, 2019, true),
  ...makeLander('TÉNÉRÉ 250', 2020, 2024, false),
  // Blocos novos (matching FIPE) — mesma mecânica, reaproveitam os geradores acima
  ...makeCrosser('CROSSER', 2014, 2024),
  ...makeLander('LANDER', 2008, 2019, true),
  ...makeLander('LANDER', 2020, 2024, false),
  ...makeLander('XTZ 250 TENERE', 2011, 2019, true),
  ...makeLander('XTZ 250 TENERE', 2020, 2024, false),
  // XTZ 250X: só produzida 2008-2011, sempre EFI (não teve versão carburada no Brasil)
  ...makeLander('XTZ 250X', 2008, 2011, false),
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
