/**
 * Seed BUELL — macetes, problemas e manutenção
 * Cobre todos os modelos BUELL registrados na tabela FIPE Brasil
 * (Firebolt, Lightning, Lightning Long, Ulysses, 1125R, 1125CR)
 *
 * Fontes: visordown.com, buellxb.com, badweatherbikers.com,
 *         debatemotos.com (fórum BR), manualslib.com (manuais oficiais),
 *         buellmotorcycle.com (novo Buell 2024+)
 *
 * Execute: pnpm --filter @motormacete/database db:seed:buell
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput {
  severity: Sev
  title: string
  body: string
}

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

// ─── FIREBOLT (XB9R 984cc / XB12R 1203cc) ────────────────────────────────────

const FIREBOLT_MACETES: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Óleo 20W50 sintético HD obrigatório — motor e câmbio compartilham o mesmo lubrificante',
    body: 'O motor Buell XB usa o mesmo óleo no motor, na caixa de câmbio e na embreagem primária — um único fluido lubrifica tudo. Por isso, usar óleo convencional ou de baixa qualidade compromete a caixa junto com o motor. Use Harley-Davidson SYN3 20W50, Amsoil V-Twin 20W50 ou Royal Purple Max-Cycle 20W50. Capacidade: ~2,5 L (XB9) ou ~2,8 L (XB12) incluindo filtro. Troca a cada 8.000 km ou 12 meses.',
  },
  {
    severity: 'OK',
    title: 'Velas NGK DCPR9E ou DCPR9EIX iridium — 2 unidades a cada 16.000 km',
    body: 'O XB usa 2 velas NGK DCPR9E (padrão) ou NGK DCPR9EIX iridium (dura 2x mais, recomendada). Troca a cada 16.000 km. Para acessar a vela do cilindro traseiro é necessário remover a carenagem lateral — separar ~1 hora para a operação completa. Custo das velas NGK DCPR9E no Brasil: R$ 30–50 cada; iridium R$ 80–120 cada.',
  },
  {
    severity: 'WARN',
    title: 'O "tanque" aparente é a caixa de ar — combustível fica dentro do chassis tubular',
    body: 'O projeto revolucionário Buell esconde o combustível (14,5 L) no próprio chassis tubular de alumínio. O volume que parece o tanque é apenas a caixa do filtro de ar. Nunca soldar, furar ou bater no tubo principal sem esvaziar completamente o sistema. Ao comprar usada, verificar ausência de trincas ou vazamentos na estrutura. A luz de reserva acende com ~2,5 L restantes.',
  },
  {
    severity: 'OK',
    title: 'Filtro de óleo Harley-Davidson Sportster compatível — sem necessidade de importar',
    body: 'O filtro de óleo original Buell é idêntico ao Harley-Davidson Sportster. No Brasil encontre facilmente: Hiflo HF170C, Mahle OC 191, Baldwin BT214 ou K&N KN-170. Custo: R$ 30–80 em qualquer loja especializada em motos americanas. A cada troca, aplicar óleo na borracha vedante antes de roscar — apertar só na mão + 3/4 de volta.',
  },
  {
    severity: 'DANGER',
    title: 'Instalar tensor de correia aftermarket Free Spirit — rolamento da caixa em risco sem ele',
    body: 'O rolamento de saída da caixa de câmbio nas XB falha prematuramente quando não há tensor de correia adequado. O tensor aftermarket Free Spirit (ou similar) distribui a tensão corretamente e elimina o problema. Sem o tensor, a correia "saltita" levemente e destrói o rolamento de forma silenciosa até a falha catastrófica — troca do rolamento pode custar R$ 800–1.500. O kit Free Spirit custa ~R$ 300 importado e é o upgrade mais rentável da Buell XB.',
  },
  {
    severity: 'WARN',
    title: 'Correia de transmissão: inspecionar a cada 8.000 km, trocar a cada 25.000–30.000 km',
    body: 'A correia dentada substitui corrente/cardan na Buell: sem lubrificação, sem ferrugem, mas exige inspeção regular. Sinais de troca: fissuras laterais, desgaste assimétrico dos dentes, tensão irregular. Uma correia rompida imobiliza a moto imediatamente. Custo da correia original: R$ 400–800 importada. Alternativa: Gates ou Dayco de mesma especificação Harley Sportster (verificar medidas antes de comprar).',
  },
  {
    severity: 'OK',
    title: 'Pneus: Pirelli Diablo Rosso ou Metzeler M5 — evitar Dunlop D616 original',
    body: 'O Dunlop D616 original de fábrica é amplamente criticado pelos donos por escorregamento no molhado. Substitua por: Pirelli Diablo Rosso III (esportivo dia a dia), Metzeler Sportec M5 Interact (rua/estrada), Bridgestone BT-023 (touring). Medidas XB9R/XB12R: 120/70-ZR17 dianteiro e 180/55-ZR17 traseiro — encontradas facilmente no Brasil.',
  },
  {
    severity: 'OK',
    title: 'Pastilhas EBC FA069 ou Braking CM55 superam as OEM em dobro',
    body: 'As pastilhas originais Buell são medíocres em mordida e vida útil. O sistema ZTL (disco no aro, não no cubo) é exclusivo e inovador, mas exige pastilhas de qualidade para extrair o potencial. EBC FA069 (sinterizado) ou Braking CM55 (cerâmica): maior mordida, dissipação de calor superior e vida 2–3x maior. Custo similar às OEM importadas.',
  },
  {
    severity: 'WARN',
    title: 'Bateria AGM 12V obrigatória — V-twin de 45° destrói baterias convencionais',
    body: 'As vibrações características do V-twin Harley de 45° destroem baterias de chumbo-ácido convencionais em 6–12 meses. Use exclusivamente AGM: Yuasa YTX12-BS (referência), Motobatt MBTX12U ou equivalente AGM de 12 Ah ou maior. Custo extra de ~30% que economiza trocas frequentes. Guardar a moto por mais de 2 semanas? Usar desconector de bateria ou carregador de manutenção.',
  },
  {
    severity: 'OK',
    title: 'Peças via importação: buellparts.com, eBay Motors e pinwallcycle.com',
    body: 'A Buell saiu do mercado em 2009 (voltando em 2024 com novos modelos). Peças no Brasil são escassas e caras. Fontes confiáveis nos EUA com envio internacional: buellparts.com, eBay Motors (vendedores pinwallcycle e suncoastcyclesports), genuinemotorcycleparts.com. Para peças genéricas (filtros, velas, pastilhas), fornecedores brasileiros de peças HD suprem a maioria das necessidades sem importação.',
  },
]

const FIREBOLT_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Rolamentos da roda traseira: recall Buell 2003–2005 — exigir comprovante de substituição',
    body: 'Rolamentos da roda traseira com falha precoce foi problema documentado nos modelos 2003–2005, com recall emitido pela Buell. Ao comprar uma Firebolt usada dessas gerações, exija o comprovante de que os rolamentos foram substituídos. Sintomas: vibração em alta velocidade (acima de 100 km/h), ruído tipo zumbido crescente na roda traseira, aquecimento anormal do cubo.',
  },
  {
    severity: 'WARN',
    title: 'Rocker cover traseiro: vazamento de óleo crônico no cabeçote',
    body: 'A vedação do rocker cover (tampa de válvulas) do cilindro traseiro vaza óleo frequentemente — problema crônico relatado por donos do mundo todo. Ao menor sinal de mancha oleosa no topo do cabeçote traseiro, substituir a junta usando selador Hylomar SQ32M ou Permatex Ultra Black. Operação simples mas exige remoção da carenagem. Custo: R$ 30–50 em materiais.',
  },
  {
    severity: 'WARN',
    title: 'Retificador/regulador: falha frequente deixa bateria sem carga',
    body: 'O retificador/regulador de voltagem é o ponto de falha elétrica mais comum nas XB. Sintomas: bateria morrendo progressivamente mesmo com alternador funcionando, carga abaixo de 13V em marcha lenta, piscas instáveis. Diagnóstico: multímetro nos polos da bateria em 3.000 RPM — correto: 13,8–14,5V. Abaixo disso: retificador suspeito. Substituir por upgrade Compufire ou Shindengen SH775AA para maior confiabilidade.',
  },
  {
    severity: 'WARN',
    title: 'Fiação elétrica sob o banco: abrasão causa curtos intermitentes difíceis de diagnosticar',
    body: 'O chicote elétrico roza nas bordas metálicas do banco, causando curtos-circuitos e falhas elétricas intermitentes. Problemas como piscas parando, painel oscilando ou moto apagando aleatoriamente têm 40% de chance de serem fiação sob o banco. Solução preventiva: proteger todos os pontos de contato com corrugado de silicone ou fita alta temperatura. Fazer na próxima revisão sem esperar os sintomas.',
  },
  {
    severity: 'WARN',
    title: 'Disco de freio ZTL no aro: empena com uso intenso ou choque térmico',
    body: 'O disco dianteiro único montado no aro (sistema Zero Torsional Load, exclusivo Buell) é susceptível a empenamento em dois cenários: uso pesado em circuito e choque térmico (jogar água fria no disco quente). Em uso na rua é durável. Sintoma: vibração pulsante na manopla ao frear. Não tem como recuperar o empenamento — o disco precisa ser substituído. Custo: R$ 600–1.200 importado.',
  },
  {
    severity: 'OK',
    title: 'Escapamento original em aço carbono: ferrugem em 500–1.000 km',
    body: 'Até 36% dos donos reportaram oxidação visível no escapamento original antes mesmo de 1.000 km. O aço carbono sem tratamento adequado ferrugeia rapidamente no clima brasileiro (umidade e calor). Solução definitiva: substituir por escapamento inox aftermarket — Akrapovic, Two Brothers Racing, Jardine ou Rinehart. Além de durar indefinidamente, reduz 3–5 kg e melhora o som e a performance.',
  },
]

// ─── LIGHTNING (XB9S 984cc / XB12S 1203cc) ────────────────────────────────────

const LIGHTNING_MACETES: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Óleo 20W50 sintético HD — mesmo sistema de lubrificação compartilhado das XB',
    body: 'Idêntico à Firebolt: motor, câmbio e embreagem primária compartilham o mesmo óleo 20W50 sintético (SYN3, Amsoil, Royal Purple). Capacidade: ~2,5 L (XB9S) ou ~2,8 L (XB12S). Trocar a cada 8.000 km. O filtro Hiflo HF170C é compatível e encontrado no Brasil em lojas de peças HD.',
  },
  {
    severity: 'WARN',
    title: 'Naked sem carenagem: chicote elétrico fica exposto — proteção é essencial',
    body: 'Ao contrário da Firebolt, a Lightning não tem carenagem lateral para proteger os conectores elétricos da chuva, sal e poeira. Aplicar spray dielétrico (WD-40 Specialist Contato Elétrico ou Electrolube) em todos os conectores visíveis semestralmente. Isso previne a oxidação que é responsável por 60% das falhas elétricas intermitentes relatadas por donos brasileiros.',
  },
  {
    severity: 'OK',
    title: 'Modelo ideal para uso urbano: 170 kg, centro de gravidade baixo, ágil no tráfego',
    body: 'A Lightning é a mais urbana da família XB: peso seco de 170 kg (XB9S) com centro de gravidade em 42 cm de altura. A versão City-X (XB9SX) tem guidão mais alto que facilita ainda mais o trânsito. Consumo real: XB9S ~22–24 km/L em uso misto, XB12S ~18–20 km/L. Autonomia com 14,5 L: 280–350 km conforme condução.',
  },
  {
    severity: 'OK',
    title: 'Velas NGK DCPR9E ou DCPR9EIX (iridium) — acesso mais simples que na Firebolt',
    body: 'Na Lightning naked não há carenagem lateral para remover — o acesso às velas é mais direto. Mesma especificação: NGK DCPR9E (padrão) ou NGK DCPR9EIX iridium. 2 unidades a cada 16.000 km. O cilindro dianteiro é acessado pelo lado esquerdo e o traseiro pelo lado direito.',
  },
  {
    severity: 'DANGER',
    title: 'Tensor de correia Free Spirit: mesmo upgrade crítico da Firebolt',
    body: 'A transmissão da Lightning é idêntica à Firebolt — mesmo risco de falha no rolamento de saída da caixa sem tensor. Instalar o tensor Free Spirit ou equivalente antes de atingir 10.000 km é o investimento mais importante na Buell XB. Operação simples: mecânico com experiência em Buell resolve em 30 minutos.',
  },
  {
    severity: 'OK',
    title: 'Para uso urbano intenso com piso molhado: Pirelli Diablo Strada ou Michelin Pilot Street',
    body: 'Para uso diário em cidade com chuvas frequentes (São Paulo, Rio etc.), os melhores pneus são Pirelli Diablo Strada (boa aderência molhado, vida ~8.000 km traseiro) ou Michelin Pilot Street (excelente em piso molhado). Para estrada + cidade: Bridgestone BT-023 ou Metzeler M5 Interact — equilibrio perfeito entre aderência e duração.',
  },
  {
    severity: 'OK',
    title: 'Peça reserva essencial para viagem: vela NGK, filtro de óleo e tensionador de correia',
    body: 'Levar em viagem: 1 vela NGK DCPR9E, 1 filtro Hiflo HF170C e 500 mL de óleo 20W50. Esses 3 itens resolvem 80% das ocorrências em estrada. O manual Buell cabe no painel do banco — manter uma cópia impressa ou no celular. Peso total do kit: menos de 500 g.',
  },
  {
    severity: 'OK',
    title: 'Bateria AGM Yuasa YTX12-BS — evitar convencional de chumbo',
    body: 'Mesma especificação das demais XB. Na Lightning naked, o banco é mais acessível — facilitando verificação e substituição da bateria. Verificar carga a cada 3 meses se a moto ficar mais de 1 semana parada.',
  },
]

const LIGHTNING_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Retificador/regulador: falha mais reportada nos fóruns brasileiros de Buell',
    body: 'Nos fóruns brasileiros (debatemotos.com) o retificador/regulador deficiente é o problema número 1 relatado pelos donos de Lightning. O V-twin gera calor excessivo que acelera a degradação do componente. Diagnóstico: medir voltagem na bateria em 3.000 RPM — deve ser 13,8–14,5V. Upgrade Compufire resolve definitivamente. Custo: R$ 300–500 importado.',
  },
  {
    severity: 'WARN',
    title: 'Fiação sob o banco: proteger preventivamente — na naked a exposição é maior',
    body: 'Na Lightning sem carenagem, o chicote elétrico fica ainda mais exposto à vibração, umidade e atrito do banco. Inspecionar anualmente a integridade de todos os cabos sob o assento. Envolver os pontos críticos com mangueira corrugada de silicone. Falhas intermitentes (moto que apaga e religa, piscas instáveis) têm alta probabilidade de serem originadas aqui.',
  },
  {
    severity: 'WARN',
    title: 'Rocker cover traseiro: mesma junta deficiente da Firebolt — inspecionar visualmente a cada abastecimento',
    body: 'Na Lightning naked, detectar o vazamento do rocker cover é mais fácil: olhar o topo do cabeçote traseiro a cada abastecimento. Ao menor sinal de óleo, substituir a junta com Hylomar ou Permatex Ultra Black antes que o vazamento contamine pneu ou freio. Operação mais acessível na naked do que na Firebolt carenada.',
  },
  {
    severity: 'OK',
    title: 'Escapamento: ferrugem rápida agravada pela ausência de carenagem protetora',
    body: 'Sem carenagem, o escapamento da Lightning fica mais exposto a chuva, lama e umidade. Ferrugem aparece mais rápido do que na Firebolt. Substituição por inox (Akrapovic, Leo Vince, Jardine) é ainda mais urgente neste modelo. Um escapamento inox bem instalado dura a vida útil da moto sem qualquer manutenção.',
  },
]

// ─── LIGHTNING LONG (XB12SS 1203cc) ───────────────────────────────────────────

const LIGHTNINGLONG_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'XB12SS: entre-eixos alongado para maior estabilidade — uso ideal em estradas',
    body: 'A Lightning Long (XB12SS) tem entre-eixos maior que a Lightning padrão, tornando-a mais estável em alta velocidade e ligeiramente menos ágil em manobras urbanas. Motor 1203cc com maior torque em baixas rotações: ideal para pilotar mais relaxado em estradas. O XB12SS é a mais "touring" das Lightning, sem ser pesada como as aventureiras.',
  },
  {
    severity: 'WARN',
    title: 'Óleo 20W50 sintético HD — XB12 gera mais calor e exige qualidade ainda maior',
    body: 'O motor 1203cc opera em temperaturas maiores que o 984cc. Usar obrigatoriamente sintético de alta qualidade: HD SYN3, Amsoil V-Twin 20W50 ou Motul 7100 20W50. Capacidade: 2,8 L com filtro. Trocar a cada 8.000 km ou 12 meses. No calor brasileiro, considerar trocar a cada 6.000 km em uso intenso.',
  },
  {
    severity: 'DANGER',
    title: 'Correia da XB12SS tem comprimento diferente — verificar part number antes de comprar',
    body: 'O entre-eixos maior da Lightning Long exige uma correia de comprimento diferente das demais XB. Antes de comprar a correia de reposição, confirmar o part number específico do modelo XB12SS no catálogo Buell. Instalar a correia errada pode resultar em tensão incorreta e dano ao rolamento da caixa mesmo com o tensor Free Spirit instalado.',
  },
  {
    severity: 'OK',
    title: 'Pneus para touring: Metzeler Sportec M3 ou Pirelli Angel GT',
    body: 'Para o perfil mais relaxado da Lightning Long, pneus touring de alta performance são mais adequados que os esportivos puros. Metzeler Sportec M3 e Pirelli Angel GT oferecem aderência excelente em estrada seca e molhada com vida útil 20–30% maior que os puramente esportivos. Medidas: 120/70-ZR17 / 180/55-ZR17.',
  },
  {
    severity: 'OK',
    title: 'Tensor de correia Free Spirit obrigatório — torque maior do XB12 aumenta estresse',
    body: 'O maior torque do motor 1203cc aumenta a tensão na correia e nos rolamentos em comparação ao XB9. O tensor Free Spirit é ainda mais importante na Long. Instalar antes dos primeiros 10.000 km.',
  },
]

const LIGHTNINGLONG_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Todos os problemas crônicos do XB12 se aplicam — retificador, fiação e rocker cover',
    body: 'Retificador/regulador, fiação sob o banco e vedação do rocker cover traseiro são os mesmos problemas crônicos de todas as XB12. Na Lightning Long, o uso mais frequente em estradas expõe o retificador ao calor por períodos mais longos, acelerando a degradação. Monitorar voltagem da bateria regularmente.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedor traseiro: fadiga acelerada em estradas com pavimento ruim',
    body: 'O amortecedor traseiro da XB12SS pode apresentar fadiga precocemente em uso intenso em estradas brasileiras com pavimento irregular. Sintomas: "soluço" em irregularidades, perda de controle traseiro em buracos leves. Inspecionar o amortecedor a cada 20.000 km; recondicionamento ou substituição por unidade Öhlins ou YSS melhora substancialmente o conforto.',
  },
]

// ─── ULYSSES (XB12X / XB12XT 1203cc) ─────────────────────────────────────────

const ULYSSES_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'A aventureira da família Buell: suspensão longa, guidão alto e pneu misto',
    body: 'A Ulysses XB12X e XB12XT é a Buell mais versátil: suspensão com maior curso, guidão alto, pneus Pirelli Scorpion Sync de série para uso misto. A XB12XT vem com maletas laterais Pelican e top case de fábrica, tornando-a preparada para viagens longas. Mais confortável para pilotar muitas horas seguidas que as versões esportivas.',
  },
  {
    severity: 'WARN',
    title: 'Óleo 20W50 sintético HD (2,8 L) — calor + carga + off-road exige qualidade máxima',
    body: 'Na Ulysses, o motor trabalha mais forte pela combinação de peso, bagagem e eventual uso off-road. Usar óleo sintético de primeira linha: HD SYN3 20W50 ou Amsoil V-Twin 20W50. Trocar a cada 8.000 km. Com uso intenso off-road ou viagens longas em calor forte, considerar trocar a cada 6.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Calibragem específica com carga: traseiro 42–44 PSI com bagagem completa + passageiro',
    body: 'Sem carga: 36/40 PSI (frente/traseiro). Com bagagem completa e passageiro: 36/42–44 PSI. Os pneus Pirelli Scorpion Sync originais permitem reduzir 4–5 PSI em relação ao padrão de asfalto para uso em terra batida leve — melhora tração sem comprometer durabilidade. Verificar sempre a frio antes de cada saída.',
  },
  {
    severity: 'OK',
    title: 'Pneus originais Scorpion Sync: excelentes para 80% asfalto / 20% off-road leve',
    body: 'O Pirelli Scorpion Sync original é muito bem avaliado para o uso misto da Ulysses. Para 100% asfalto touring: Pirelli Angel GT ou Michelin Anakee Road (maior vida útil). Para aventura séria com off-road pesado: Metzeler Tourance ou Continental TKC80. O traseiro 180/55-17 é medida comum encontrada no Brasil.',
  },
  {
    severity: 'DANGER',
    title: 'Tensor de correia Free Spirit URGENTE — quebrar a correia em estrada remota é risco sério',
    body: 'Na Ulysses, o risco de ficar imobilizado com correia rompida é amplificado pelo perfil de uso em viagens e eventual aventura. Com bagagem + passageiro, o estresse na correia e nos rolamentos é maior. Instalar o tensor Free Spirit antes da primeira viagem longa. Trocar a correia preventivamente a cada 25.000 km.',
  },
  {
    severity: 'OK',
    title: 'Autonomia de ~320 km por tanque — confortável para viagens longas',
    body: 'O XB12 na Ulysses entrega ~22–23 km/L em estrada. Com 14,5 L no chassis, a autonomia chega a 320–340 km em uso combinado. Com bagagem e passageiro, contar com ~270–300 km. A luz de reserva acende com ~2,5 L — equivalente a ~55–60 km de reserva.',
  },
  {
    severity: 'OK',
    title: 'Maletas Pelican da XB12XT: borracha de vedação resseca — inspecionar antes de viagens com chuva',
    body: 'As maletas laterais Pelican integradas da XB12XT têm excelente qualidade, mas as borrachas de vedação ressecam com o calor do motor e o tempo. Antes de qualquer viagem com previsão de chuva, verificar o estado das borrachas e aplicar silicone em spray nas vedações. Substituição das borrachas originais Pelican é simples e barata.',
  },
]

const ULYSSES_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Subframe traseiro: risco de trinca em uso off-road intenso — inspecionar a cada 8.000 km',
    body: 'O subframe traseiro da Ulysses apresentou falhas documentadas (quebra nas soldas) em uso off-road pesado. Uma trinca não detectada pode resultar em separação súbita da parte traseira da moto em movimento. Inspecionar visualmente todas as soldas do subframe a cada 8.000 km. Em uso off-road intenso, inspecionar antes de cada saída. Ao menor sinal de trinca: parar de usar e levar a um mecânico para solda.',
  },
  {
    severity: 'OK',
    title: 'Ventoinha do radiador funciona continuamente em baixa velocidade — é normal',
    body: 'A ventoinha do radiador de óleo da Ulysses entra em funcionamento logo abaixo de 80 km/h em dias quentes. O barulho elétrico da ventoinha é normal e esperado — não indica problema. Se a ventoinha PARAR de funcionar em condições de calor, aí sim há um problema: verificar fusível e relé da ventoinha antes de suspeitar do motor elétrico da ventilação.',
  },
  {
    severity: 'WARN',
    title: 'Forquilha dianteira afunda em frenagem brusca — comportamento documentado',
    body: 'A forquilha da Ulysses tende a "afundar" profundamente em frenagens mais fortes e endireitar abruptamente ao soltar o freio, perturbando a geometria na entrada de curvas. Não é defeito estrutural, é característica do projeto com mola mais soft para conforto touring. Upgrade: molas de forquilha Traxxion Dynamics ou Race Tech com taxa maior eliminam o comportamento. Recomendado para quem usa a moto de forma mais esportiva.',
  },
  {
    severity: 'WARN',
    title: 'Retificador/regulador e rocker cover: mesmos problemas crônicos XB12',
    body: 'Todos os problemas crônicos do XB12 se aplicam à Ulysses. Em uso adventure com paradas e arranques frequentes, o retificador degrada mais rápido. Monitorar voltagem a cada abastecimento com aplicativo de voltímetro Bluetooth ou testador portátil na bagagem.',
  },
]

// ─── 1125R (1125cc Rotax Helicon V-Twin refrigerado a líquido) ────────────────

const BUELL1125R_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor Rotax Helicon 1125cc — completamente diferente do V-twin HD das XB',
    body: 'O 1125R usa o motor Rotax Helicon V-twin de 72° refrigerado a LÍQUIDO — 146 cv, desenvolvido pela BRP (mesma empresa da Can-Am). Mais potente e refinado que as XB, mas com maior complexidade de manutenção e peças mais difíceis de encontrar no Brasil. O motor é relacionado ao Rotax usado em algumas Aprilia, o que abre algumas possibilidades de peças internas intercambiáveis.',
  },
  {
    severity: 'WARN',
    title: 'Óleo do motor Rotax: sintético 20W50 aprovado Rotax ou 15W50 — NÃO misturar com HD',
    body: 'O Rotax 1125cc usa sistema de lubrificação seco separado (dry-sump) diferente das XB. Recomendado: HD SYN3 20W50, Motul 5100 15W50 ou Amsoil Metric Motorcycle 10W40. Capacidade total: ~2,8 L. Verificar nível pela janela de inspeção lateral — não tem vareta. Trocar a cada 8.000 km. Diferente das XB, o câmbio e a embreagem têm circuitos separados.',
  },
  {
    severity: 'WARN',
    title: 'Líquido de arrefecimento: verificar a cada 5.000 km, trocar a cada 2 anos',
    body: 'O motor refrigerado a líquido exige manutenção do arrefecimento que as XB ar/óleo não precisam. Usar mistura 50/50 de água destilada + anticongelante com inibidores de corrosão para alumínio (Prestone, Shell ou similar). Nunca usar água comum ou mineral — corrói as passagens finas do alumínio do motor Rotax. Verificar mangueiras por ressecamento e abraçadeiras por aperto a cada inspeção.',
  },
  {
    severity: 'OK',
    title: 'Correia de transmissão idêntica à família XB — todos os mesmos cuidados',
    body: 'Apesar do motor diferente, a 1125R mantém a correia dentada de transmissão Buell. Mesmos cuidados: tensor Free Spirit obrigatório, inspeção a cada 8.000 km, troca preventiva a cada 25.000–30.000 km. A combinação de 146 cv com correia aumenta a importância do tensor.',
  },
  {
    severity: 'WARN',
    title: 'ECU: versão do firmware é crítica — verificar atualização ao comprar usada',
    body: 'As versões 2008 do 1125R tiveram problemas sérios de superaquecimento e solavancos (surging) resolvidos por atualizações de ECU que a Buell lançou até 2010. Ao comprar uma 1125R usada, verificar com um mecânico especializado se a ECU tem o firmware mais recente. Um remapeamento por especialista (mototuning) pode melhorar ainda mais o comportamento do motor no Brasil com nossa gasolina.',
  },
  {
    severity: 'OK',
    title: 'Pneus de alta performance obrigatórios — 146 cv exige pneus à altura',
    body: 'Com 146 cv e refrigeração líquida, o 1125R precisa de pneus de performance para extrair o potencial com segurança. Recomendados: Pirelli Diablo Rosso III, Michelin Power RS ou Bridgestone S21. Evitar pneus touring com baixo índice de velocidade. Medidas: 120/70-ZR17 / 180/55-ZR17 — facilmente encontradas no Brasil.',
  },
  {
    severity: 'WARN',
    title: 'Peças escassas no Brasil: fontes nos EUA são obrigatórias para manutenção',
    body: 'O 1125R é a Buell mais difícil de manter no Brasil por ter motor Rotax único. Fontes: genuinemotorcycleparts.com, buellparts.com, eBay Motors. Peças do motor compartilhadas com algumas Aprilia (motor Rotax da mesma família) — consultar especialista antes de importar para confirmar compatibilidade. Mecânicos especializados em Rotax também fazem manutenção adequada.',
  },
  {
    severity: 'OK',
    title: 'Bateria AGM 12V maior capacidade — Yuasa YTX14-BS (14 Ah)',
    body: 'O sistema elétrico mais complexo do 1125R (injeção sofisticada + arrefecimento ativo) exige bateria de maior capacidade. Usar Yuasa YTX14-BS (14 Ah) em vez do YTX12-BS das XB. Manter sempre carregada — a ECU do Rotax é sensível a queda de voltagem e pode apresentar erros espúrios com bateria fraca.',
  },
]

const BUELL1125R_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Estator do alternador: ponto de falha mais crítico do 1125R — pode deixar sem energia em viagem',
    body: 'O estator do alternador do motor Rotax 1125 é o problema mais sério e documentado do modelo. Falha sem aviso deixando o piloto sem carga elétrica — bateria descarrega progressivamente até apagar a moto. Sintomas precoces: voltagem abaixo de 13V em marcha lenta, bateria precisando recarga frequente. Diagnóstico: multímetro na bateria em 3.000 RPM. Substituição: estator aftermarket compatível com Rotax 1000/1125 de outros modelos pode ser adaptado, reduzindo custo.',
  },
  {
    severity: 'DANGER',
    title: 'Superaquecimento em trânsito lento e calor — problema grave nos modelos 2008',
    body: 'As unidades 2008 sofreram com superaquecimento em tráfego urbano lento em dias quentes — problema semelhante ao recall da Can-Am Spyder RT (mesmo motor Rotax). A Buell lançou atualização de ECU que melhorou o gerenciamento térmico. Verificar: ao comprar um 1125R 2008, exigir comprovante de atualização da ECU. Evitar longos pontos no tráfego parado em dias acima de 30°C sem a atualização.',
  },
  {
    severity: 'WARN',
    title: 'Surging (solavancos) em abertura constante do acelerador em 60–100 km/h',
    body: 'Comportamento documentado: motor "pulsa" ou "soluca" em velocidade de cruzeiro com abertura constante do acelerador — especialmente na faixa 60–100 km/h. Causado pelo mapeamento original da ECU com combustível brasileiro. As versões 2009–2010 melhoraram com firmware revisado. Remapeamento por especialista resolve em grande parte o problema. Não causa dano mecânico, mas compromete o conforto em viagens longas.',
  },
  {
    severity: 'WARN',
    title: 'Slave cylinder da embreagem hidráulica: risco de vazamento progressivo',
    body: 'O slave cylinder (cilindro escravo) da embreagem hidráulica pode desenvolver vazamento de fluido DOT 4 com o tempo. Sintomas: embreagem ficando progressivamente mais pesada, nível baixo no reservatório sem causa aparente, mancha de fluido próximo ao cilindro. Inspecionar a cada revisão; substituir ao menor sinal de vazamento antes que falhe completamente em viagem.',
  },
  {
    severity: 'OK',
    title: 'Calor excessivo no banco e pernas do piloto: estrutural, sem solução definitiva',
    body: 'O motor Rotax 72° concentra muito calor na área central da moto. Em uso urbano lento, o calor no banco e nas pernas do piloto é considerável — problema estrutural do projeto. Mitigações: calça de moto com proteção térmica, evitar trânsito parado prolongado, instalar protetor térmico de fibra de carbono nas carenagens internas. Não afeta a durabilidade do motor.',
  },
  {
    severity: 'WARN',
    title: 'Disco ZTL dianteiro: mesmo sistema das XB — susceptível a empenamento no circuito',
    body: 'O 1125R mantém o sistema ZTL de disco no aro. Com 146 cv e uso em pista, o risco de empenamento do disco é maior que nas XB mais lentas. Para uso exclusivo na rua, é durável. Para pista: pastilhas Brembo SC ou EBC HH reduzem o aquecimento do disco e prolongam sua vida.',
  },
]

// ─── 1125CR (versão café racer do 1125R) ─────────────────────────────────────

const BUELL1125CR_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Versão café racer do 1125R: guidão mais alto, posição mais upright, visual diferenciado',
    body: 'A 1125CR (Café Racer) usa o mesmo motor Rotax 1125cc da 1125R com clipons ligeiramente mais elevados e posição de pilotagem mais ereta. Visual mais clássico americano. Produzida apenas em 2009–2010, é a mais rara das Buell brasileiras. Toda a manutenção e problemas são idênticos ao 1125R.',
  },
  {
    severity: 'WARN',
    title: 'Óleo sintético Rotax 20W50 — mesmas especificações do 1125R',
    body: 'Idêntico ao 1125R: sintético 20W50 (HD SYN3, Motul 5100 ou Amsoil Metric). Capacidade 2,8 L. Trocar a cada 8.000 km. A 1125CR 2009 saiu de fábrica com firmware de ECU revisado — menos propensa ao surging e superaquecimento do 1125R 2008.',
  },
  {
    severity: 'WARN',
    title: 'Arrefecimento líquido: trocar líquido a cada 2 anos com anticongelante para alumínio',
    body: 'Mesmas especificações do 1125R. A 1125CR 2009/2010 já tem sistema de arrefecimento com a calibragem mais conservadora da ECU — melhor gestão térmica. Mesmo assim, manter o fluido sempre em dia e usar apenas mistura 50/50 com anticongelante adequado para motores de alumínio.',
  },
  {
    severity: 'OK',
    title: 'Modelo frequentemente usado como segunda moto (fim de semana) — quilometragem anual baixa facilita manutenção',
    body: 'A 1125CR tende a ser usada com menor intensidade que a 1125R. Com menor quilometragem anual, manter os intervalos de troca por TEMPO além de km: trocar óleo anualmente mesmo sem atingir 8.000 km. Liquido de arrefecimento: a cada 2 anos independente de km. Bateria: checar a cada 3 meses se ficar parada.',
  },
  {
    severity: 'WARN',
    title: 'Peças de carroceria: as mais difíceis de reposição na família Buell',
    body: 'As carenagens e painéis exclusivos da 1125CR são praticamente impossíveis de encontrar no Brasil. Qualquer queda que quebre as carenagens exige importação dos EUA com custo e prazo significativos. Guardar a 1125CR com protetor de carenagem e usar cinto de apoio adequado ao estacionar. Reparos em fibra de vidro por funileiro especializado são alternativa viável.',
  },
  {
    severity: 'OK',
    title: 'Novo Buell está de volta: Hammerhead 1190, 1190SX, Super Cruiser e SuperTouring',
    body: 'A marca Buell voltou em 2024 com novos modelos americanos: Hammerhead 1190 (sport, R$ 120k+), 1190SX (superbike), Super Cruiser (175 cv, R$ 155k+) e SuperTouring (185 cv, 102 Nm). Todos com motor V-twin 1190cc refrigerado a líquido. Ainda sem confirmação de chegada ao Brasil, mas a marca está em expansão global. Donas das antigas podem encontrar comunidade crescente.',
  },
  {
    severity: 'DANGER',
    title: 'Tensor de correia Free Spirit — mesma urgência do 1125R',
    body: 'O tensor é obrigatório na 1125CR como em todo o restante da família Buell XB/1125. Com 146 cv e uso esportivo, a correia trabalha no limite sem o tensor. Instalar antes dos primeiros 10.000 km se não estiver instalado.',
  },
]

const BUELL1125CR_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Estator do alternador: mesma falha crítica do 1125R — substituir preventivamente com 30.000+ km',
    body: 'A 1125CR tem o mesmo estator do alternador problemático do 1125R. Ao comprar usada com histórico desconhecido e mais de 30.000 km, substituir o estator preventivamente antes de uma falha em viagem. Verificar voltagem da bateria regularmente: abaixo de 13,2V em 3.000 RPM é sinal de alerta imediato.',
  },
  {
    severity: 'WARN',
    title: 'Slave cylinder da embreagem: inspecionar a cada revisão',
    body: 'Mesma vulnerabilidade do 1125R. Trocar fluido de embreagem DOT 4 a cada 2 anos. Na posição de pilotagem mais ereta da CR, o calor do motor incide de forma diferente nos componentes hidráulicos. Inspecionar o slave cylinder a cada revisão.',
  },
  {
    severity: 'OK',
    title: 'Calor no banco: problema estrutural sem solução definitiva na 1125CR',
    body: 'Idêntico ao 1125R: o design café racer aproxima mais o piloto do motor Rotax quente. Calça de couro ou têxtil com proteção térmica é essencial para uso prolongado. Evitar trânsito lento em dias quentes.',
  },
]

// ─── BLOCOS COMPLETOS ──────────────────────────────────────────────────────────

const buellModels: ModelBlock[] = [
  {
    modelName: 'Firebolt',
    yearFrom: 2003,
    yearTo: 2010,
    MACETES: FIREBOLT_MACETES,
    PROBLEMAS: FIREBOLT_PROBLEMAS,
    MANUTENCAO: [],
  },
  {
    modelName: 'Lightning',
    yearFrom: 2003,
    yearTo: 2010,
    MACETES: LIGHTNING_MACETES,
    PROBLEMAS: LIGHTNING_PROBLEMAS,
    MANUTENCAO: [],
  },
  {
    modelName: 'Lightning Long',
    yearFrom: 2005,
    yearTo: 2010,
    MACETES: LIGHTNINGLONG_MACETES,
    PROBLEMAS: LIGHTNINGLONG_PROBLEMAS,
    MANUTENCAO: [],
  },
  {
    modelName: 'Ulysses',
    yearFrom: 2006,
    yearTo: 2010,
    MACETES: ULYSSES_MACETES,
    PROBLEMAS: ULYSSES_PROBLEMAS,
    MANUTENCAO: [],
  },
  {
    modelName: '1125R',
    yearFrom: 2008,
    yearTo: 2010,
    MACETES: BUELL1125R_MACETES,
    PROBLEMAS: BUELL1125R_PROBLEMAS,
    MANUTENCAO: [],
  },
  {
    modelName: '1125CR',
    yearFrom: 2009,
    yearTo: 2010,
    MACETES: BUELL1125CR_MACETES,
    PROBLEMAS: BUELL1125CR_PROBLEMAS,
    MANUTENCAO: [],
  },
]

// ─── CALIBRAGEM DE PNEUS ──────────────────────────────────────────────────────

const buellTirePressures: TirePressureInput[] = [
  {
    modelName: 'Firebolt',
    yearFrom: 2003,
    yearTo: 2010,
    tireSize: '120/70-ZR17 / 180/55-ZR17',
    frontPsi: 36,
    rearPsi: 38,
    frontPsiLoad: 36,
    rearPsiLoad: 40,
    notes: 'XB9R/XB12R esportiva: 36 PSI dianteiro / 38 PSI traseiro uso normal. Aumentar 2 PSI em uso esportivo intenso ou pista. Sistema ZTL com disco no aro — calibragem correta é crítica para distribuição de carga no aro.',
  },
  {
    modelName: 'Lightning',
    yearFrom: 2003,
    yearTo: 2010,
    tireSize: '120/70-ZR17 / 180/55-ZR17',
    frontPsi: 36,
    rearPsi: 38,
    frontPsiLoad: 36,
    rearPsiLoad: 40,
    notes: 'XB9S/XB12S: 36 PSI frente / 38 PSI traseiro uso urbano e estrada. City-X (XB9SX): mesma calibragem. Para uso com garupa ocasional: 36/40 PSI.',
  },
  {
    modelName: 'Lightning Long',
    yearFrom: 2005,
    yearTo: 2010,
    tireSize: '120/70-ZR17 / 180/55-ZR17',
    frontPsi: 36,
    rearPsi: 40,
    frontPsiLoad: 36,
    rearPsiLoad: 42,
    notes: 'XB12SS: entre-eixos maior requer maior pressão no traseiro para estabilidade em estrada. 36/40 PSI. Com bagagem ou garupa: traseiro 42 PSI.',
  },
  {
    modelName: 'Ulysses',
    yearFrom: 2006,
    yearTo: 2010,
    tireSize: '120/70-ZR17 / 180/55-ZR17',
    frontPsi: 36,
    rearPsi: 40,
    frontPsiLoad: 36,
    rearPsiLoad: 44,
    notes: 'XB12X/XB12XT sem carga: 36/40 PSI. Bagagem completa + garupa: 36/44 PSI. Off-road leve em terra batida: reduzir 4–5 PSI para melhor tração. Verificar sempre a frio.',
  },
  {
    modelName: '1125R',
    yearFrom: 2008,
    yearTo: 2010,
    tireSize: '120/70-ZR17 / 180/55-ZR17',
    frontPsi: 36,
    rearPsi: 42,
    frontPsiLoad: 36,
    rearPsiLoad: 42,
    notes: '146 cv: usar limite superior para estabilidade esportiva. 36 PSI frente / 42 PSI traseiro com pneus radiais ZR performance. Verificar sempre a frio — a 1125R aquece os pneus rapidamente em uso esportivo.',
  },
  {
    modelName: '1125CR',
    yearFrom: 2009,
    yearTo: 2010,
    tireSize: '120/70-ZR17 / 180/55-ZR17',
    frontPsi: 36,
    rearPsi: 42,
    frontPsiLoad: 36,
    rearPsiLoad: 42,
    notes: 'Mesma calibragem do 1125R: 36/42 PSI. Posição mais ereta do café racer distribui peso levemente diferente — para mais conforto de uso urbano: 36/40 PSI é aceitável.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const buellMaintenanceItems: MaintenanceItemInput[] = [
  // ── Firebolt ────────────────────────────────────────────────────────────────
  { modelName: 'Firebolt', yearFrom: 2003, yearTo: 2010, component: 'Óleo motor/câmbio 20W50 sintético HD + filtro Hiflo HF170C', intervalKm: 8000, intervalMonths: 12, notes: '2,5 L (XB9R) ou 2,8 L (XB12R). Motor e câmbio compartilham o mesmo óleo.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Firebolt', yearFrom: 2003, yearTo: 2010, component: 'Inspeção correia de transmissão (tensão, desgaste e fissuras)', intervalKm: 8000, intervalMonths: null, notes: 'Verificar desgaste lateral dos dentes, fissuras e tensão. Com tensor Free Spirit instalado.', priority: 'HIGH', order: 2 },
  { modelName: 'Firebolt', yearFrom: 2003, yearTo: 2010, component: 'Velas de ignição NGK DCPR9E ou DCPR9EIX — 2 unidades', intervalKm: 16000, intervalMonths: null, notes: 'Remover carenagem lateral para acesso. Gap: 0,9 mm.', priority: 'HIGH', order: 3 },
  { modelName: 'Firebolt', yearFrom: 2003, yearTo: 2010, component: 'Ajuste do jogo de válvulas', intervalKm: 16000, intervalMonths: null, notes: 'Ajuste por calço — exige mecânico especializado em Buell/Harley.', priority: 'HIGH', order: 4 },
  { modelName: 'Firebolt', yearFrom: 2003, yearTo: 2010, component: 'Fluido de freio DOT 4 (dianteiro e traseiro)', intervalKm: null, intervalMonths: 24, notes: 'Trocar a cada 2 anos independentemente de km. Sistema tem 2 circuitos.', priority: 'HIGH', order: 5 },
  { modelName: 'Firebolt', yearFrom: 2003, yearTo: 2010, component: 'Inspeção rolamento de saída da caixa de câmbio', intervalKm: 30000, intervalMonths: null, notes: 'Verificar tensor Free Spirit instalado. Sem tensor: rolamento em risco.', priority: 'CRITICAL', order: 6 },
  { modelName: 'Firebolt', yearFrom: 2003, yearTo: 2010, component: 'Substituição preventiva da correia de transmissão', intervalKm: 25000, intervalMonths: null, notes: 'Trocar preventivamente mesmo sem sinais visíveis de desgaste.', priority: 'HIGH', order: 7 },
  { modelName: 'Firebolt', yearFrom: 2003, yearTo: 2010, component: 'Inspeção rolamentos de roda (dianteiro e traseiro)', intervalKm: 25000, intervalMonths: null, notes: 'Problema histórico 2003–2005 (recall). Inspecionar jogo e ruído.', priority: 'HIGH', order: 8 },
  { modelName: 'Firebolt', yearFrom: 2003, yearTo: 2010, component: 'Teste do retificador/regulador de voltagem (13,8–14,5V em 3.000 RPM)', intervalKm: null, intervalMonths: 24, notes: 'Principal causa de falha elétrica nas XB. Substituir por Compufire se abaixo do especificado.', priority: 'HIGH', order: 9 },
  { modelName: 'Firebolt', yearFrom: 2003, yearTo: 2010, component: 'Inspeção e proteção do chicote elétrico sob o banco', intervalKm: null, intervalMonths: 12, notes: 'Verificar abrasão do chicote nas bordas do banco. Proteger com corrugado de silicone.', priority: 'MEDIUM', order: 10 },
  { modelName: 'Firebolt', yearFrom: 2003, yearTo: 2010, component: 'Inspeção da vedação do rocker cover traseiro', intervalKm: 8000, intervalMonths: null, notes: 'Verificar vazamento de óleo no cabeçote traseiro. Trocar junta com Hylomar se necessário.', priority: 'MEDIUM', order: 11 },

  // ── Lightning ────────────────────────────────────────────────────────────────
  { modelName: 'Lightning', yearFrom: 2003, yearTo: 2010, component: 'Óleo motor/câmbio 20W50 sintético HD + filtro Hiflo HF170C', intervalKm: 8000, intervalMonths: 12, notes: '2,5 L (XB9S) ou 2,8 L (XB12S). Trocar junto com filtro.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Lightning', yearFrom: 2003, yearTo: 2010, component: 'Inspeção correia de transmissão + proteção do chicote elétrico exposto', intervalKm: 8000, intervalMonths: null, notes: 'Naked sem carenagem: chicote mais exposto a umidade e vibração.', priority: 'HIGH', order: 2 },
  { modelName: 'Lightning', yearFrom: 2003, yearTo: 2010, component: 'Velas de ignição NGK DCPR9E ou DCPR9EIX — 2 unidades', intervalKm: 16000, intervalMonths: null, notes: 'Acesso mais simples que na Firebolt — sem carenagem lateral para remover.', priority: 'HIGH', order: 3 },
  { modelName: 'Lightning', yearFrom: 2003, yearTo: 2010, component: 'Aplicação de spray dielétrico em todos os conectores elétricos expostos', intervalKm: null, intervalMonths: 6, notes: 'Naked sem proteção de carenagem — prevenção de oxidação essencial.', priority: 'MEDIUM', order: 4 },
  { modelName: 'Lightning', yearFrom: 2003, yearTo: 2010, component: 'Ajuste do jogo de válvulas', intervalKm: 16000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'Lightning', yearFrom: 2003, yearTo: 2010, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'Lightning', yearFrom: 2003, yearTo: 2010, component: 'Substituição preventiva da correia de transmissão', intervalKm: 25000, intervalMonths: null, notes: null, priority: 'HIGH', order: 7 },
  { modelName: 'Lightning', yearFrom: 2003, yearTo: 2010, component: 'Teste do retificador/regulador de voltagem', intervalKm: null, intervalMonths: 24, notes: 'Falha mais relatada pelos donos brasileiros. 13,8–14,5V em 3.000 RPM.', priority: 'HIGH', order: 8 },

  // ── Lightning Long ───────────────────────────────────────────────────────────
  { modelName: 'Lightning Long', yearFrom: 2005, yearTo: 2010, component: 'Óleo motor/câmbio 20W50 sintético HD (2,8 L XB12) + filtro Hiflo HF170C', intervalKm: 8000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 1 },
  { modelName: 'Lightning Long', yearFrom: 2005, yearTo: 2010, component: 'Inspeção correia de transmissão — confirmar part number específico XB12SS', intervalKm: 8000, intervalMonths: null, notes: 'Correia tem comprimento diferente das demais XB pelo entre-eixos maior.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Lightning Long', yearFrom: 2005, yearTo: 2010, component: 'Velas NGK DCPR9E ou DCPR9EIX — 2 unidades', intervalKm: 16000, intervalMonths: null, notes: null, priority: 'HIGH', order: 3 },
  { modelName: 'Lightning Long', yearFrom: 2005, yearTo: 2010, component: 'Ajuste do jogo de válvulas', intervalKm: 16000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: 'Lightning Long', yearFrom: 2005, yearTo: 2010, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'Lightning Long', yearFrom: 2005, yearTo: 2010, component: 'Substituição preventiva da correia — part number específico XB12SS', intervalKm: 25000, intervalMonths: null, notes: 'Confirmar medida antes de comprar — diferente das Lightning padrão.', priority: 'HIGH', order: 6 },
  { modelName: 'Lightning Long', yearFrom: 2005, yearTo: 2010, component: 'Inspeção do amortecedor traseiro', intervalKm: 20000, intervalMonths: null, notes: 'Fadiga acelerada em estradas com pavimento irregular.', priority: 'MEDIUM', order: 7 },
  { modelName: 'Lightning Long', yearFrom: 2005, yearTo: 2010, component: 'Teste do retificador/regulador de voltagem', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 8 },

  // ── Ulysses ──────────────────────────────────────────────────────────────────
  { modelName: 'Ulysses', yearFrom: 2006, yearTo: 2010, component: 'Óleo motor/câmbio 20W50 sintético HD (2,8 L) + filtro de óleo', intervalKm: 8000, intervalMonths: 12, notes: 'Em uso off-road intenso ou calor forte: considerar troca a cada 6.000 km.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Ulysses', yearFrom: 2006, yearTo: 2010, component: 'Inspeção correia de transmissão + tensor Free Spirit', intervalKm: 8000, intervalMonths: null, notes: 'Com bagagem e passageiro o estresse na correia é maior — inspeção rigorosa.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Ulysses', yearFrom: 2006, yearTo: 2010, component: 'Inspeção visual do subframe traseiro (trincas nas soldas)', intervalKm: 8000, intervalMonths: null, notes: 'CRÍTICO em uso off-road. Trinca não detectada pode resultar em falha catastrófica.', priority: 'CRITICAL', order: 3 },
  { modelName: 'Ulysses', yearFrom: 2006, yearTo: 2010, component: 'Inspeção do filtro de ar (umidade e sujeira pós off-road)', intervalKm: 8000, intervalMonths: null, notes: 'Após uso em terra batida, verificar o filtro mesmo antes de atingir o km.', priority: 'HIGH', order: 4 },
  { modelName: 'Ulysses', yearFrom: 2006, yearTo: 2010, component: 'Velas de ignição NGK DCPR9E ou DCPR9EIX — 2 unidades', intervalKm: 16000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: 'Ulysses', yearFrom: 2006, yearTo: 2010, component: 'Fluido de freio DOT 4 + verificação da ventoinha do radiador de óleo', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 6 },
  { modelName: 'Ulysses', yearFrom: 2006, yearTo: 2010, component: 'Borrachas de vedação das maletas Pelican (XB12XT)', intervalKm: null, intervalMonths: 12, notes: 'Ressecam com calor. Aplicar silicone spray antes de viagens com chuva prevista.', priority: 'LOW', order: 7 },
  { modelName: 'Ulysses', yearFrom: 2006, yearTo: 2010, component: 'Substituição preventiva da correia de transmissão', intervalKm: 25000, intervalMonths: null, notes: null, priority: 'HIGH', order: 8 },
  { modelName: 'Ulysses', yearFrom: 2006, yearTo: 2010, component: 'Inspeção dos rolamentos de roda e direção', intervalKm: 25000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 9 },
  { modelName: 'Ulysses', yearFrom: 2006, yearTo: 2010, component: 'Teste do retificador/regulador de voltagem', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 10 },

  // ── 1125R ────────────────────────────────────────────────────────────────────
  { modelName: '1125R', yearFrom: 2008, yearTo: 2010, component: 'Óleo motor sintético Rotax 20W50 ou 15W50 — verificar pela janela lateral (sem vareta)', intervalKm: 8000, intervalMonths: 12, notes: 'Capacidade: 2,8 L. Não misturar com óleo HD — sistema Rotax é separado.', priority: 'CRITICAL', order: 1 },
  { modelName: '1125R', yearFrom: 2008, yearTo: 2010, component: 'Nível e condição do líquido de arrefecimento', intervalKm: 5000, intervalMonths: null, notes: 'Verificar nível no reservatório de expansão. Cor: deve ser verde/azul limpo.', priority: 'HIGH', order: 2 },
  { modelName: '1125R', yearFrom: 2008, yearTo: 2010, component: 'Inspeção correia de transmissão + tensor Free Spirit + slave cylinder da embreagem', intervalKm: 8000, intervalMonths: null, notes: null, priority: 'HIGH', order: 3 },
  { modelName: '1125R', yearFrom: 2008, yearTo: 2010, component: 'Velas de ignição específicas Rotax 1125', intervalKm: 10000, intervalMonths: null, notes: 'Confirmar part number no manual Rotax — diferente das velas XB.', priority: 'HIGH', order: 4 },
  { modelName: '1125R', yearFrom: 2008, yearTo: 2010, component: 'Ajuste do jogo de válvulas (mecânico especializado Rotax/Buell)', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
  { modelName: '1125R', yearFrom: 2008, yearTo: 2010, component: 'Substituição do líquido de arrefecimento (50/50 água destilada + anticongelante alumínio)', intervalKm: null, intervalMonths: 24, notes: 'Nunca usar água comum. Trocar sempre a cada 2 anos.', priority: 'HIGH', order: 6 },
  { modelName: '1125R', yearFrom: 2008, yearTo: 2010, component: 'Fluido de freio DOT 4 + fluido de embreagem hidráulica DOT 4', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 7 },
  { modelName: '1125R', yearFrom: 2008, yearTo: 2010, component: 'Teste e inspeção do estator do alternador (voltagem 13,8–14,5V em 3.000 RPM)', intervalKm: null, intervalMonths: 24, notes: 'Principal causa de falha do 1125R. Substituir preventivamente se 30.000+ km sem histórico.', priority: 'CRITICAL', order: 8 },
  { modelName: '1125R', yearFrom: 2008, yearTo: 2010, component: 'Substituição preventiva da correia de transmissão', intervalKm: 25000, intervalMonths: null, notes: null, priority: 'HIGH', order: 9 },
  { modelName: '1125R', yearFrom: 2008, yearTo: 2010, component: 'Verificação/atualização do firmware da ECU', intervalKm: null, intervalMonths: null, notes: 'Fazer uma vez ao comprar usada — versão atualizada resolve surging e superaquecimento.', priority: 'MEDIUM', order: 10 },

  // ── 1125CR ───────────────────────────────────────────────────────────────────
  { modelName: '1125CR', yearFrom: 2009, yearTo: 2010, component: 'Óleo motor sintético Rotax 20W50 ou 15W50 (2,8 L)', intervalKm: 8000, intervalMonths: 12, notes: 'Verificar pela janela lateral — sem vareta. ECU 2009 já tem firmware revisado.', priority: 'CRITICAL', order: 1 },
  { modelName: '1125CR', yearFrom: 2009, yearTo: 2010, component: 'Nível do líquido de arrefecimento', intervalKm: 5000, intervalMonths: null, notes: null, priority: 'HIGH', order: 2 },
  { modelName: '1125CR', yearFrom: 2009, yearTo: 2010, component: 'Inspeção correia de transmissão + slave cylinder da embreagem', intervalKm: 8000, intervalMonths: null, notes: null, priority: 'HIGH', order: 3 },
  { modelName: '1125CR', yearFrom: 2009, yearTo: 2010, component: 'Velas de ignição específicas Rotax 1125', intervalKm: 10000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: '1125CR', yearFrom: 2009, yearTo: 2010, component: 'Substituição do líquido de arrefecimento', intervalKm: null, intervalMonths: 24, notes: '50/50 água destilada + anticongelante para alumínio.', priority: 'HIGH', order: 5 },
  { modelName: '1125CR', yearFrom: 2009, yearTo: 2010, component: 'Fluido de freio DOT 4 + fluido embreagem hidráulica', intervalKm: null, intervalMonths: 24, notes: null, priority: 'HIGH', order: 6 },
  { modelName: '1125CR', yearFrom: 2009, yearTo: 2010, component: 'Teste do estator do alternador', intervalKm: null, intervalMonths: 24, notes: 'Ponto crítico de falha — substituir preventivamente com 30.000+ km.', priority: 'CRITICAL', order: 7 },
  { modelName: '1125CR', yearFrom: 2009, yearTo: 2010, component: 'Substituição preventiva da correia de transmissão', intervalKm: 25000, intervalMonths: null, notes: null, priority: 'HIGH', order: 8 },
]

// ─── Runner ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed BUELL iniciando...\n')

  const motoType = await prisma.vehicleType.upsert({
    where: { slug: 'moto' },
    update: {},
    create: { slug: 'moto', label: 'Moto' },
  })

  const buellBrand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'BUELL', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'BUELL', vehicleTypeId: motoType.id },
  })
  console.log(`  ✅ Brand: ${buellBrand.name}`)

  let totalTips = 0

  for (const block of buellModels) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: buellBrand.id } },
      update: {},
      create: { name: block.modelName, brandId: buellBrand.id },
    })

    await prisma.tip.deleteMany({ where: { modelName: block.modelName } })

    const allTips: { cat: Cat; tip: TipInput }[] = [
      ...block.MACETES.map(t => ({ cat: 'MACETES' as Cat, tip: t })),
      ...block.PROBLEMAS.map(t => ({ cat: 'PROBLEMAS' as Cat, tip: t })),
      ...block.MANUTENCAO.map(t => ({ cat: 'MANUTENCAO' as Cat, tip: t })),
    ]

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

    totalTips += allTips.length
    console.log(
      `  🔧 ${block.modelName} (${block.yearFrom ?? '?'}–${block.yearTo ?? 'atual'}): ` +
      `${block.MACETES.length} macetes, ${block.PROBLEMAS.length} problemas`,
    )
  }

  console.log('\n  📏 Calibragem de pneus...')
  for (const tp of buellTirePressures) {
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
    console.log(`  ✅ ${tp.modelName}: ${tp.frontPsi}/${tp.rearPsi} PSI`)
  }

  console.log('\n  🔧 Cronogramas de manutenção...')
  const modelNames = [...new Set(buellMaintenanceItems.map(m => m.modelName))]
  for (const name of modelNames) {
    await prisma.maintenanceItem.deleteMany({ where: { modelName: name } })
  }
  await prisma.maintenanceItem.createMany({
    data: buellMaintenanceItems.map(item => ({
      modelName: item.modelName,
      yearFrom: item.yearFrom,
      yearTo: item.yearTo,
      component: item.component,
      intervalKm: item.intervalKm,
      intervalMonths: item.intervalMonths,
      notes: item.notes,
      priority: item.priority,
      order: item.order,
    })),
  })
  for (const name of modelNames) {
    const count = buellMaintenanceItems.filter(m => m.modelName === name).length
    console.log(`  ✅ ${name}: ${count} itens de manutenção`)
  }

  console.log(
    `\n✅ Seed BUELL concluído: ${buellModels.length} modelos, ${totalTips} dicas, ` +
    `${buellTirePressures.length} calibragens, ${buellMaintenanceItems.length} itens de manutenção.`,
  )
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
