// seed-honda-shadow-cruiser.ts — Honda Shadow cruisers
// SHADOW VT 600 C (583cc) | SHADOW AM 750 + VT 750 SHADOW (745cc) | SHADOW 1100 AC + SHADOW 1100 OURO + SHADOW VT 1100 (1099cc)
// Família de cruisers V-twin Honda — estilo americano, low-rider
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

// ─── Shadow VT 600 C (VLX 600) ───────────────────────────────────────────────
// Motor: 583cc 52° V-twin SOHC 3v/cil liquid-cooled | ~40 cv | corrente (BR) / correia (USA)
// Óleo: 10W-30 JASO MA, 2,2 L (serviço) / 2,6 L (completo) | Vela: NGK DPR7EA-9 gap 0,9 mm
// Bateria: YTX14-BS 12V 12Ah | Pneus: 90/90-19 (F) / 150/80-15 (R) | Tanque: ~11,5 L
// Produzida no Brasil (Manaus) de 1997 a 2004 aprox. Clássica do mercado nacional.

const VT600C_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA — 2,2 L (serviço) / 2,6 L (completo); a cada 5.000 km',
    body: 'Motor 583cc V-twin SOHC: use 10W-30 JASO MA (não MA2 — a viscosidade interfere na embreagem molhada V-twin). Capacidade: 2,2 L na troca simples / 2,6 L com troca do filtro ou enchimento inicial. Honda HP 4T, Motul 5100 10W-30 ou Castrol Power1. Intervalo: 5.000 km ou anual. Em motos paradas por mais de 6 meses: troque o óleo antes de rodar (acidificação). Motor V-twin tem aquecimento desigual entre os cilindros — o frontal aquece mais.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK DPR7EA-9 — gap 0,9 mm; 2 velas; troca a cada 10.000 km',
    body: '2 velas DPR7EA-9 (R$15–25 cada). Gap: 0,9 mm. Acesso: cilindro dianteiro — tampa de vela visível. Cilindro traseiro (inclinado 45°) tem acesso mais difícil. Troque as duas juntas. Alternativa iridium: NGK DPRIEA-9 (R$60–80 cada) — melhor ignição a frio e maior durabilidade (20.000 km). Com mais de 60.000 km: inspecione o estado das velas a cada 6.000 km, não apenas a cada 10.000.',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão 630 — versão brasileira usa corrente (não correia como USA)',
    body: 'A versão brasileira da VT 600 C Shadow (Manaus) usa transmissão por corrente 630, diferente da versão americana (correia). Folga: 30–40 mm de jogo vertical. Lubrifique a cada 500 km com spray para correntes O-ring (Motul Chain Lube, Liqui-Moly HTT). Kit completo (corrente + pinhão + coroa): troca a cada 25.000–30.000 km. A corrente 630 é mais durável que as 520/525, mas exige tensão correta — froxa desgasta engrenagens rapidamente. Peças alternativas: kit corrente JT Sprockets 630 compatível, disponível no Brasil (R$180–280).',
  },
  {
    severity: 'OK',
    title: 'Refrigeração a líquido — fluido, mangueiras e tampão radiador são pontos críticos em clássicas',
    body: 'Motor refrigerado a líquido. Em exemplares com mais de 15 anos: verifique estado das mangueiras (rachaduras, ressecamento) e do radiador (aletas amassadas, vedações do tampão). Fluido: Long Life Coolant 50/50 diluído em água destilada. Se o fluido estiver marrom ou com cheiro forte: troque imediatamente e avalie mangueiras e vedações do cabeçote. Mangueiras alternativas: borracha universal 22 mm e 28 mm cortada no comprimento certo funciona bem como substituto (R$8–15/metro). Troca do fluido: a cada 2 anos em motos regulares, anual em motos antigas.',
  },
  {
    severity: 'OK',
    title: 'Estilo cruiser — torque máximo em ~4.000 rpm; aquecimento mínimo 5 min antes de carga',
    body: 'A Shadow VT 600 C entrega torque máximo em torno de 4.000 rpm: ideal para cruzeiros longos em rotação moderada. Para motos desta geração com mais de 20 anos: não suba além de 6.500 rpm até aquecer bem (mínimo 5 min). O V-twin SOHC tem jogo de válvulas sensível ao frio — pressão de óleo demora para chegar ao cabeçote traseiro. Em inverno ou dias frios: aguarde até a rotação de marcha lenta se estabilizar por conta própria.',
  },
  {
    severity: 'OK',
    title: 'Freio dianteiro disco 296 mm (pinça simples) + traseiro tambor — rebuild a cada 30.000 km',
    body: 'Freio dianteiro: disco 296 mm, pinça simples Honda. Traseiro: tambor (drum) 130 mm. Em motos com mais de 30.000 km: rebuild da pinça (êmbolo + vedações). Sintoma de émbolo travado: freio "grudento" ao liberar a alavanca, calor excessivo no disco. Pastilhas alternativas: EBC FA131HH ou Ferodo FDB600 (compatíveis com pinça piston simples Honda — R$60–90). Fluido DOT 4: troca anual. Tambor traseiro: regulagem do cabo quando pedal ficar com curso longo.',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas e reposição — onde encontrar para a VT 600 C Shadow no Brasil',
    body: 'A VT 600 C Shadow foi produzida em Manaus (1997–2004) com ~15.000 unidades — base sólida de peças usadas. Peças nacionais disponíveis: corrente 630 JT, pastilhas EBC FA131, filtros de óleo HifloFiltro HF111 (alternativo ao Honda original). Peças importadas: motosport.com e bikebandit.com (EUA) enviam ao Brasil — jogo de juntas, vedações, pistão. No Brasil: MercadoLivre com termos "Shadow 600", "VT600", "NTV 600". Grupos Facebook: "Shadow Brasil" e "Honda VT 600 Club" — excelentes para desmanche e peças usadas em bom estado.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar — esponja ou papel; substituição simples e peça acessível',
    body: 'Filtro de ar: caixa de filtro com elemento esponja (tipo foam). Troca: 20.000 km ou quando visivelmente sujo. Alternativa: esponja de filtro universal 30ppi (poliuretano) cortada no tamanho (R$8–15). Produto de limpeza para filtro reutilizável: K&N Filter Cleaner ou sabão neutro + rinse + óleo filtro (K&N Filter Oil). Filtro sujo aumenta consumo e deixa o motor "engasgado" no low end. Em motos que rodam em estrada de terra: inspeção a cada 5.000 km.',
  },
  {
    severity: 'OK',
    title: 'Bateria YTX14-BS (12V 12Ah) — mantença em carregador quando parada por mais de 2 semanas',
    body: 'YTX14-BS Yuasa (R$220–300) ou Moura MTX14-BS (R$180–240). Tensão em repouso: 12,6V. Tensão de carga: 14,2–14,8V em marcha lenta. Em motos paradas: o corrente de stand-by do relógio/alarme descarrega a bateria em 3–4 semanas. Use Battery Tender ou Optimate 4 (carregador de manutenção, R$120–180). Com mais de 3 anos: teste carga a frio (CCA) — bateria envelhecida não consegue girar o motor grande no inverno.',
  },
  {
    severity: 'OK',
    title: 'Customização: acessórios e aftermarket disponíveis para a Shadow 600',
    body: 'A VT 600 C Shadow tem comunidade forte e peças aftermarket acessíveis. Melhorias comuns: escapamento personalizado (Cobra, Snake, artesanais nacionais) — som V-twin característico sem remapeamento necessário; protetor de motor cromado (R$150–250); guidão estilo ape-hanger ou beach-bar (R$100–200 importado). Assento aftermarket: selas personalizadas de couro nacionais custam R$300–500 e elevam conforto significativamente. Personalizar a Shadow é parte da cultura — grupo "Shadow Customs Brasil" no Facebook documenta projetos.',
  },
]

const VT600C_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Carburador entupido por gasolina velha — problema mais comum em motos paradas',
    body: 'A VT 600 C usa carburador (não injeção eletrônica). Gasolina deixada no carb por mais de 3 semanas entope os jatos e forma verniz dourado nas passagens. Sintoma: não parte, marcha lenta instável, afoga no acelerador ao abrir rápido. Prevenção: esvazie o carburador antes de guardar (torneira OFF + rodar até apagar). Limpeza: ultrassom (R$80–120 em oficina) ou desmontagem + spray carburador. Kit de reconstrução completo: jatos + flotador + membrana + O-rings (R$60–100 importado). Em motos paradas há 1+ ano: reconstrua o carburador ANTES de qualquer tentativa de partida.',
  },
  {
    severity: 'DANGER',
    title: 'Tanque com ferrugem interna — entope o carburador e o filtro gradativamente',
    body: 'Tanques de aço acumulam ferrugem quando ficam com pouco combustível por longos períodos. Sintoma inicial: filtro de combustível entupindo com partículas marrom/laranja; depois entupimento nos jatos do carburador. Verificação: abra a torneira do tanque com um copo embaixo — gasolina com pó marrom indica ferrugem. Solução leve: limpar internamente com pedra esmaltada + ácido fosfórico (R$40–80). Caso avançado: KBS Coatings Tank Sealer (kit R$150) ou revestimento epóxi profissional (R$300–500). Prevenção: tanque sempre cheio ao guardar.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pela tampa de válvulas — junta ressecada após 30.000 km',
    body: 'Com mais de 30.000 km ou 20+ anos: a junta de borracha da tampa de válvulas do cilindro dianteiro resseca e vaza. Sintoma: gotejamento de óleo no escapamento quente (fumaça + cheiro), mancha de óleo abaixo do motor. Substituição: junta Honda 12391-KY5-700 ou equivalente (R$25–50). Procedimento simples: remover tampa (4 parafusos M6), limpar superfícies com palito de madeira, instalar junta nova com um toque de silicone APENAS nos cantos curvos. NÃO use silicone geral — ataca o óleo e migra para dentro do motor.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico envelhecido — conectores oxidados causam falhas intermitentes',
    body: 'Com mais de 20 anos, a fiação original tem isolamentos ressecados e conectores oxidados. Sintoma: faróis piscando, velocímetro errático, partida difícil mesmo com bateria nova. Diagnóstico: revisar os conectores principais do chicote (especialmente os do painel de instrumentos e do CDI). Solução: WD-40 Specialist Contact Cleaner + proteção com pasta dielétrica (Dow Corning Molykote 111). Relê de partida oxidado: pode soldar os contatos internos deixando o motor rodando sem parar — verifique em motos antigas ao comprar. Substituto: relê universal 12V 30A (R$25–40).',
  },
  {
    severity: 'WARN',
    title: 'Bombinha de gasolina manual (torneira) travada — fluxo de combustível interrompido',
    body: 'A torneira de gasolina (petcock) do tanque tem posições ON / OFF / RES (reserva). Com o tempo, a membrana interna da torneira pode travar por falta de uso ou por gasolina endurecida. Sintoma: moto para inesperadamente mesmo com gasolina no tanque; ou não consegue passar para RES. Solução: desmonte a torneira (2 parafusos), limpeza das passagens com spray carburador, troque a membrana se rasgada. Peça alternativa: torneira universal para moto vintage (R$30–60 no MercadoLivre, buscar "petcock torneira Honda 600").',
  },
  {
    severity: 'OK',
    title: 'Oxidação e corrosão nos cromados — detalhe estético mas afeta valor de revenda',
    body: 'A VT 600 C tem muitos cromados: ponteiras, protetor de motor, suportes, aros. Oxidação branca + pontos de ferrugem são comuns em motos mal conservadas ou de regiões litorâneas. Limpeza: Bar Keepers Friend + palha de aço 0000 + cera de carnaúba. Oxidação profunda: recromagem profissional (R$80–150 por peça). Cromados em bom estado indicam moto bem cuidada — fator importante na avaliação ao comprar. Proteção: camada de cera Autosol Chrome Sealer após polir previne nova oxidação por até 6 meses.',
  },
]

// ─── Shadow AM 750 e VT 750 SHADOW ───────────────────────────────────────────
// Motor: 745cc 52° V-twin SOHC 3v/cil liquid-cooled | ~45 cv | correia (USA) / corrente (BR)
// Óleo: 10W-30 JASO MA, 2,4 L (serviço) / 2,9 L (completo) | Vela: NGK DPR7EA-9 gap 0,9 mm
// Bateria: YTX14L-BS 12V 12Ah | Pneus: 100/90-19 (F) / 170/80-15 (R) | Tanque: ~14 L

const VT750_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA — 2,4 L (serviço) / 2,9 L (completo); a cada 6.000 km',
    body: 'Motor 745cc V-twin SOHC. Óleo: 10W-30 JASO MA (não MA2). Capacidade: 2,4 L na troca com filtro. Honda HP 4T ou Motul 5100 10W-30. Intervalo: 6.000 km. V-twin tem aquecimento assimétrico: cilindro traseiro (sob o tanque) pode acumular calor. Observe o nível pelo visor com motor quente e moto em pé. Em climas quentes (temperatura ambiente >30°C): considere Motul 7100 15W-50 para maior proteção viscométrica.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK DPR7EA-9 — gap 0,9 mm; 2 velas; troca a cada 10.000 km',
    body: '2 velas DPR7EA-9 (R$15–25 cada). Gap: 0,9 mm. Acesso ao cilindro traseiro: remover a carenagem lateral para acesso mais fácil. Trocar as duas juntas. Iridium NGK DPRIEA-9 (R$60–80 cada): 20.000 km de vida útil. Com mais de 50.000 km: sempre iridium para facilitar a partida a frio.',
  },
  {
    severity: 'OK',
    title: 'Transmissão por correia dentada (versão americana) — inspeção visual periódica',
    body: 'A Shadow 750 americana usa transmissão por correia dentada (belt drive), mais silenciosa e sem necessidade de lubrificação. Inspeção: verificar estado visual da correia a cada 10.000 km — fissuras, desgaste nos dentes, ressecamento. Tensão: verificar manual (geralmente 10–20 mm de deflexão). Vida útil da correia: 40.000–60.000 km com cuidados. Versão brasileira pode ter corrente: siga as instruções da Shadow VT 600 C para lubrificação. NÃO use lubrificante na correia dentada — ataca a borracha.',
  },
  {
    severity: 'OK',
    title: 'Customização cruiser: suporte de peças aftermarket amplo para Shadow 750',
    body: 'A Shadow 750 tem um dos maiores ecossistemas de peças aftermarket para cruiser honda no Brasil. Acessórios disponíveis: guidão personalizado (ape-hanger ou beach bars), assento personalizado (king&queen), protetor de motor cromado, escape personalizado (Cobra, Rush, MAC Exhausts), windshield. Customiações de escape: melhoram o som V-twin sem prejudicar desempenho (sem remapeamento necessário). Grupos Shadow Brasil no Facebook e fóruns como cbamotor.com.br têm listas de fornecedores.',
  },
  {
    severity: 'OK',
    title: 'Freio dianteiro (disco 296 mm) e traseiro (tambor) — manutenção simples',
    body: 'Sistema de freio simples e confiável. Pastilhas dianteiras: EBC FA265HH ou similar para pinça Honda piston simples. Fluido DOT 4: troca bienal. Tambor traseiro: regulagem do cabo traseiro quando o pedal ficar com curso longo (afrouxamento gradual do cabo). Ajuste: parafuso de regulagem do cabo junto à roda traseira. Limpeza das lonas: spray de freio a cada 15.000 km. NÃO use graxa ou lubrificante perto das lonas de freio.',
  },
]

const VT750_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Carburador (versão não-FI) — manutenção preventiva essencial em motos paradas',
    body: 'Versões Shadow 750 com carburador (antes de 2007 aprox.): mesmo problema da VT 600 C. Gasolina velha entope os jatos. Prevenção: esvazie o carb ao guardar a moto. Limpeza bienal do carburador em uso regular, ou imediata ao perceber partida difícil. As versões FI (injetadas) eliminam esse problema. Ao comprar uma Shadow 750 usada: verifique se é carb ou FI. FI paga prêmio no preço mas justifica.',
  },
  {
    severity: 'WARN',
    title: 'Oxidação dos componentes cromados — manutenção estética mas afeta valor',
    body: 'A Shadow 750 tem muito cromo (reservatório, tampas, guidão, suportes). Em motos não conservadas: oxidação esbranquiçada com pontos de ferrugem profunda. Limpeza: Bar Keepers Friend + palha de aço fina 0000. Preservação: cera carnaúba nos cromados após limpeza. Para cromo com oxidação profunda: recromagem profissional (R$100–200/peça). Compra: chrome em bom estado é sinal de moto bem conservada — fator de avaliação ao comprar usada.',
  },
  {
    severity: 'OK',
    title: 'Peso elevado (220–230 kg cheio) — cuidado ao manobrar em estacionamentos',
    body: 'A Shadow 750 pesa 220–230 kg. Em manobras lentas e estacionamentos: a postura low-rider baixa o centro de gravidade, mas o peso é real. Riscos comuns: tombo ao tentar sustentar em declive lateral. Prática recomendada: sempre park em superfície plana; ao estacionar em declive, use a embreagem e o freio de pé para controlar. Cavalete lateral: sempre verificar que está bem travado antes de sair da moto.',
  },
]

// ─── Shadow 1100 (AC, OURO, VT 1100) ─────────────────────────────────────────
// Motor: 1099cc 45° V-twin SOHC 3v/cil liquid-cooled | ~58 cv | transmissão por eixo (shaft drive)
// Óleo: 10W-30 JASO MA, 3,2 L (serviço) / 3,7 L (completo) | Vela: NGK DPR8EA-9 gap 0,9 mm
// Bateria: YTX20L-BS 12V 18Ah | Pneus: 130/90-16 (F) / 180/70-15 (R) | Tanque: 18 L
// Shadow 1100: top de linha das cruisers Honda — shaft drive, sem corrente ou correia

const SHADOW1100_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA — 3,2 L (serviço) / 3,7 L (completo); a cada 6.000 km + óleo da caixa de transmissão',
    body: 'Motor 1099cc V-twin com câmbio integrado: 10W-30 JASO MA (não MA2). 3,2 L na troca com filtro. ATENÇÃO: Shadow 1100 tem transmissão por eixo (shaft drive) com caixa de engrenagem na roda traseira. Esta caixa tem seu PRÓPRIO óleo (hipóide 80W-90 ou Honda Pro-Only 90): verificar nível e trocar a cada 20.000 km. Sono comum: esquecer do óleo do shaft. Consequência: desgaste rápido das coroas cônicas (peça cara e difícil de encontrar). Caixa de shaft: verifique o parafuso de nível lateral na roda traseira.',
  },
  {
    severity: 'OK',
    title: 'Shaft drive (transmissão por eixo) — ZERO manutenção de corrente; inspecione juntas cônicas',
    body: 'A Shadow 1100 não usa corrente nem correia — transmissão por eixo (cardan). Vantagem: sem lubrificação periódica de corrente; transmissão mais silenciosa e durável. Manutenção específica: troca do óleo do diferencial traseiro (80W-90 hipóide GL-5) a cada 20.000 km. Inspeção das juntas homocinéticas (U-joint do eixo): a cada 30.000 km verificar folgas, estalar ao acelerar indica desgaste. Custo de reparo de shaft: R$800–2.000 em peças + mão de obra. Cuide do óleo do shaft para evitar.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK DPR8EA-9 — gap 0,9 mm; 2 velas; troca a cada 10.000 km',
    body: '2 velas DPR8EA-9 (R$15–25 cada). Gap: 0,9 mm. Cilindro traseiro (preso sob o tanque): acesso difícil — remover assento e parte traseira. Troque as duas juntas. Iridium DPRIEA-9 para 20.000 km. O motor 1099cc tem muito torque e baixa rotação — velas duram mais que em motores de alta rotação. Se a moto engasgar ao desacelerar ou tiver dificuldade de partida a frio: velas são o primeiro ponto a verificar.',
  },
  {
    severity: 'OK',
    title: 'Motor 1100 V-twin — aquecimento completo essencial antes de carga total',
    body: '1099cc V-twin de baixa rotação: aguarde 5–8 min de aquecimento antes de qualquer uso em carga (estrada, acelerações). O motor tem tolerâncias amplas, mas folgas das válvulas e vedações de pistão precisam de temperatura de operação para funcionar bem. Em climas frios (<15°C): aquecimento de 10 min. Sinal de aquecimento suficiente: a rotação de marcha lenta se estabiliza sem chicotão (no Honda de carburador: o afogador retrai). Em versões FI: o painel mostra temperatura do motor.',
  },
  {
    severity: 'OK',
    title: 'Bateria YTX20L-BS (12V 18Ah) — bateria grande para motor grande; cuidado com moto parada',
    body: 'O motor 1099cc requer bateria de 18Ah para partida com o torque elevado. YTX20L-BS Yuasa (R$350–500). Em motos paradas por mais de 2 semanas: mantenha a bateria em carregador de manutenção (Battery Tender, Optimate 4). Bateria descarregada completa destrói células internas permanentemente. Com moto parada por mais de 30 dias: desconecte o borne negativo. Resistência interna a frio: verifique com testador de bateria a cada 12 meses.',
  },
  {
    severity: 'OK',
    title: 'Shadow 1100 OURO — versão especial com detalhes em ouro; cuidado extra na estética',
    body: 'A Shadow 1100 OURO é a versão de maior valor estético. Detalhes banhados em ouro (emblemas, peças menores) requerem cuidado especial: não use produtos abrasivos ou com amônia nos componentes dourados. Cera de carnaúba + flanela macia para polir. Para cromados e dourados: evite lavar na pressão diretamente nas peças decorativas. Valor de mercado: exemplares preservados valem 20–40% mais que versões padrão em igual estado mecânico.',
  },
]

const SHADOW1100_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Óleo do shaft drive negligenciado: desgaste do diferencial traseiro — peça cara e difícil',
    body: 'O problema mais grave das Shadow 1100: proprietários esquecem do óleo do diferencial traseiro (shaft). Com óleo velho ou baixo nível, as engrenagens cônicas desgastam silenciosamente. Sintoma tardio: barulho de "estalo" ou "uivo" ao acelerar, piora gradual. Quando chega ao barulho: o dano já é irreversível. Peça: coroa e pinhão cônicos (R$1.200–2.500 importado + mão de obra R$600). Prevenção: troca do óleo do shaft a cada 20.000 km (80W-90 GL-5) é tudo que precisa. Verifique ao comprar usada.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico envelhecido — disjuntores e conectores podem oxidar em motos antigas',
    body: 'Shadow 1100 tem mais de 20 anos no mercado. Fiação envelhecida pode ter isolamentos ressecados, conectores oxidados (especialmente em garagens abertas ou regiões litorâneas). Sintoma: falhas intermitentes de luzes, velocímetro piscando, partida difícil com bateria nova. Diagnóstico: revisar os conectores com spray dielétrico (WD40 Specialist Electrical), verificar terra do motor. Prevenção: use cera de proteção nos conectores elétricos. Em motos reestauradas: substituição completa da fiação por chicote novo.',
  },
  {
    severity: 'WARN',
    title: 'Carburador (versões antigas) — envelhecimento das membranas do carb',
    body: 'Versões com carburador CV (velocidade constante): as membranas de borracha do carb ficam ressecadas com o tempo. Membranas rasgadas causam: marcha lenta errática, sem resposta ao acelerar. Membrana nova: R$40–80 (importada). Diagnóstico: remova o carb, inspecione a membrana (acima do êmbolo) por furos ou ressecamento. Kit de reparo do carburador Honda: inclui membrana + jatos + flotador + O-rings (R$80–150 importado).',
  },
]

// ─── Manutenções ──────────────────────────────────────────────────────────────

const VT600C_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'VT 600 C SHADOW', yearFrom: 1997, yearTo: 2004, component: 'Óleo 10W-30 JASO MA (2,2 L serviço / 2,6 L completo)', intervalKm: 5000, intervalMonths: 12, notes: 'NÃO use JASO MA2. Honda HP 4T, Motul 5100 10W-30 ou Castrol Power1. Verificar visor com motor quente e moto em pé.', priority: 'HIGH', order: 1 },
  { modelName: 'VT 600 C SHADOW', yearFrom: 1997, yearTo: 2004, component: 'Filtro de óleo — troca (HifloFiltro HF111 ou original Honda)', intervalKm: 5000, intervalMonths: 12, notes: 'Alternativo HifloFiltro HF111 (R$20–25). Verificar O-ring antes de instalar.', priority: 'MEDIUM', order: 2 },
  { modelName: 'VT 600 C SHADOW', yearFrom: 1997, yearTo: 2004, component: 'Velas NGK DPR7EA-9 (×2) — gap 0,9 mm', intervalKm: 10000, intervalMonths: null, notes: '2 velas. Cilindro traseiro: acesso difícil. Iridium NGK DPRIEA-9: 20.000 km. Troca em conjunto.', priority: 'MEDIUM', order: 3 },
  { modelName: 'VT 600 C SHADOW', yearFrom: 1997, yearTo: 2004, component: 'Filtro de ar (elemento esponja foam)', intervalKm: 20000, intervalMonths: null, notes: 'Alternativo: esponja foam 30ppi universal cortada (R$8–15). Lavar com sabão neutro, secar, impregnar com óleo de filtro antes de instalar.', priority: 'MEDIUM', order: 4 },
  { modelName: 'VT 600 C SHADOW', yearFrom: 1997, yearTo: 2004, component: 'Limpeza/reconstrução do carburador', intervalKm: 20000, intervalMonths: 24, notes: 'Em uso regular. Moto parada por 3+ semanas: limpar imediatamente. Kit reconstrução: R$60–100 importado.', priority: 'HIGH', order: 5 },
  { modelName: 'VT 600 C SHADOW', yearFrom: 1997, yearTo: 2004, component: 'Fluido de arrefecimento — troca + inspeção de mangueiras', intervalKm: null, intervalMonths: 24, notes: 'Long Life Coolant 50/50. Mangueiras ressecadas: substituir (borracha universal 22/28 mm). Trocar se fluido escuro ou marrom.', priority: 'HIGH', order: 6 },
  { modelName: 'VT 600 C SHADOW', yearFrom: 1997, yearTo: 2004, component: 'Kit transmissão 630 (corrente + pinhão + coroa)', intervalKm: 25000, intervalMonths: null, notes: 'JT Sprockets 630 ou equivalente nacional. Lubrificar corrente a cada 500 km. Folga: 30–40 mm.', priority: 'HIGH', order: 7 },
  { modelName: 'VT 600 C SHADOW', yearFrom: 1997, yearTo: 2004, component: 'Lubrificação corrente 630 — spray O-ring', intervalKm: 500, intervalMonths: null, notes: 'Motul Chain Lube Road ou Liqui-Moly HTT. Aplicar com moto aquecida, nas laterais dos elos.', priority: 'HIGH', order: 8 },
  { modelName: 'VT 600 C SHADOW', yearFrom: 1997, yearTo: 2004, component: 'Pastilha dianteira (disco 296 mm) + fluido DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'EBC FA131HH ou Ferodo FDB600. Rebuild pinça (êmbolo + vedações) a cada 30.000 km. DOT 4 anual.', priority: 'HIGH', order: 9 },
  { modelName: 'VT 600 C SHADOW', yearFrom: 1997, yearTo: 2004, component: 'Junta da tampa de válvulas (cilindro dianteiro)', intervalKm: 30000, intervalMonths: null, notes: 'Honda 12391-KY5-700 ou equivalente (R$25–50). Sintoma de troca necessária: gotejamento de óleo no cabeçote frontal.', priority: 'MEDIUM', order: 10 },
  { modelName: 'VT 600 C SHADOW', yearFrom: 1997, yearTo: 2004, component: 'Bateria YTX14-BS (12V 12Ah) — carga e verificação', intervalKm: null, intervalMonths: 12, notes: 'Yuasa YTX14-BS (R$220–300) ou Moura MTX14-BS (R$180–240). Repouso: 12,6V. Carregador de manutenção quando parada.', priority: 'MEDIUM', order: 11 },
  { modelName: 'VT 600 C SHADOW', yearFrom: 1997, yearTo: 2004, component: 'Torneira de gasolina (petcock) — inspeção e limpeza', intervalKm: null, intervalMonths: 24, notes: 'Verificar funcionamento das posições ON/OFF/RES. Membrana travada: desmontar e limpar com spray carburador. Peça alternativa: torneira universal vintage (R$30–60).', priority: 'MEDIUM', order: 12 },
  { modelName: 'VT 600 C SHADOW', yearFrom: 1997, yearTo: 2004, component: 'Filtro de combustível em linha — inspeção e troca', intervalKm: 10000, intervalMonths: null, notes: 'Filtro em linha entre tanque e carburador. Se houver partículas marrons: inspecionar tanque por ferrugem. Substituir com filtro universal Honda (R$15–25).', priority: 'MEDIUM', order: 13 },
  { modelName: 'VT 600 C SHADOW', yearFrom: 1997, yearTo: 2004, component: 'Jogo de válvulas — folgas (admissão 0,08–0,12 / escape 0,16–0,20 mm)', intervalKm: 20000, intervalMonths: null, notes: 'Motor SOHC V-twin: ajuste de folgas por calços. Folga incorreta: desempenho reduzido e batida em frio.', priority: 'HIGH', order: 14 },
  { modelName: 'VT 600 C SHADOW', yearFrom: 1997, yearTo: 2004, component: 'Conectores elétricos — limpeza com dielétrico', intervalKm: null, intervalMonths: 24, notes: 'WD-40 Specialist Contact Cleaner + pasta dielétrica. Focar no chicote do painel, CDI e relê de partida. Previne falhas intermitentes.', priority: 'MEDIUM', order: 15 },
]

const VT750_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'VT 750 SHADOW', yearFrom: 1997, yearTo: null, component: 'Óleo 10W-30 JASO MA (2,4 L serviço / 2,9 L completo)', intervalKm: 6000, intervalMonths: 12, notes: 'NÃO use JASO MA2. Motul 5100 10W-30 ou Honda HP 4T.', priority: 'HIGH', order: 1 },
  { modelName: 'VT 750 SHADOW', yearFrom: 1997, yearTo: null, component: 'Velas NGK DPR7EA-9 (×2) — gap 0,9 mm', intervalKm: 10000, intervalMonths: null, notes: '2 velas. Iridium: 20.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'VT 750 SHADOW', yearFrom: 1997, yearTo: null, component: 'Correia dentada — inspeção visual e tensão', intervalKm: 10000, intervalMonths: null, notes: 'Fissuras ou desgaste: substituir. NÃO lubrificar. Versão corrente: lubrificar a cada 600 km.', priority: 'HIGH', order: 3 },
  { modelName: 'VT 750 SHADOW', yearFrom: 1997, yearTo: null, component: 'Fluido de arrefecimento — troca', intervalKm: null, intervalMonths: 24, notes: 'Long Life Coolant 50/50.', priority: 'HIGH', order: 4 },
  { modelName: 'VT 750 SHADOW', yearFrom: 1997, yearTo: null, component: 'Pastilha dianteira + fluido DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'Rebuild da pinça a cada 30.000 km em motos antigas.', priority: 'HIGH', order: 5 },
  { modelName: 'SHADOW AM 750', yearFrom: 1997, yearTo: null, component: 'Óleo 10W-30 JASO MA (2,4 L serviço / 2,9 L completo)', intervalKm: 6000, intervalMonths: 12, notes: 'Mesmo motor VT 750. Verificar nível pelo visor com moto em pé e motor quente.', priority: 'HIGH', order: 1 },
  { modelName: 'SHADOW AM 750', yearFrom: 1997, yearTo: null, component: 'Velas NGK DPR7EA-9 (×2) — gap 0,9 mm', intervalKm: 10000, intervalMonths: null, notes: '2 velas. Acesso traseiro: remover carenagem lateral.', priority: 'MEDIUM', order: 2 },
  { modelName: 'SHADOW AM 750', yearFrom: 1997, yearTo: null, component: 'Transmissão (corrente ou correia) — manutenção', intervalKm: null, intervalMonths: 6, notes: 'Corrente: lubrificar a cada 600 km. Correia: inspeção visual a cada 10.000 km.', priority: 'HIGH', order: 3 },
  { modelName: 'SHADOW AM 750', yearFrom: 1997, yearTo: null, component: 'Fluido de arrefecimento + inspeção de mangueiras', intervalKm: null, intervalMonths: 24, notes: 'Mangueiras de borracha envelhecem. Substituir se ressecadas.', priority: 'HIGH', order: 4 },
]

const SHADOW1100_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'SHADOW 1100 AC', yearFrom: 1995, yearTo: null, component: 'Óleo 10W-30 JASO MA (3,2 L serviço / 3,7 L completo)', intervalKm: 6000, intervalMonths: 12, notes: 'NÃO use JASO MA2. Motul 5100 ou Honda HP 4T.', priority: 'HIGH', order: 1 },
  { modelName: 'SHADOW 1100 AC', yearFrom: 1995, yearTo: null, component: 'Óleo do diferencial traseiro (shaft) — 80W-90 GL-5', intervalKm: 20000, intervalMonths: null, notes: 'CRÍTICO: não esquecer! Parafuso de nível na caixa traseira. Volume: ~100 mL. Honda Pro-Only 90 ou 80W-90 GL-5.', priority: 'CRITICAL', order: 2 },
  { modelName: 'SHADOW 1100 AC', yearFrom: 1995, yearTo: null, component: 'Velas NGK DPR8EA-9 (×2) — gap 0,9 mm', intervalKm: 10000, intervalMonths: null, notes: '2 velas. Cilindro traseiro: acesso difícil. Iridium DPRIEA-9: 20.000 km.', priority: 'MEDIUM', order: 3 },
  { modelName: 'SHADOW 1100 AC', yearFrom: 1995, yearTo: null, component: 'Fluido de arrefecimento — troca', intervalKm: null, intervalMonths: 24, notes: 'Long Life Coolant 50/50. Inspecionar mangueiras por ressecamento.', priority: 'HIGH', order: 4 },
  { modelName: 'SHADOW 1100 AC', yearFrom: 1995, yearTo: null, component: 'Pastilha dianteira + fluido DOT 4', intervalKm: 15000, intervalMonths: 24, notes: 'Rebuild da pinça em motos com mais de 30.000 km.', priority: 'HIGH', order: 5 },
  { modelName: 'SHADOW 1100 AC', yearFrom: 1995, yearTo: null, component: 'Bateria YTX20L-BS (12V 18Ah) — verificação', intervalKm: null, intervalMonths: 12, notes: 'Motor 1099cc exige bateria grande. Manter em carregador de manutenção quando parada.', priority: 'HIGH', order: 6 },
  { modelName: 'SHADOW 1100 AC', yearFrom: 1995, yearTo: null, component: 'Inspeção das juntas homocinéticas do shaft', intervalKm: 30000, intervalMonths: null, notes: 'Estalar ao acelerar = desgaste das juntas. Reparação cara — prevenir com inspeção.', priority: 'HIGH', order: 7 },
  // OURO e VT 1100 herdam os mesmos itens de manutenção
  { modelName: 'SHADOW 1100 OURO', yearFrom: 1995, yearTo: null, component: 'Óleo 10W-30 JASO MA (3,2 L serviço / 3,7 L completo)', intervalKm: 6000, intervalMonths: 12, notes: 'Idêntico ao SHADOW 1100 AC. JASO MA (não MA2).', priority: 'HIGH', order: 1 },
  { modelName: 'SHADOW 1100 OURO', yearFrom: 1995, yearTo: null, component: 'Óleo do diferencial traseiro (shaft) — 80W-90 GL-5', intervalKm: 20000, intervalMonths: null, notes: 'CRÍTICO: não esquecer! Caixa traseira do shaft. ~100 mL.', priority: 'CRITICAL', order: 2 },
  { modelName: 'SHADOW 1100 OURO', yearFrom: 1995, yearTo: null, component: 'Manutenção estética cromados e dourados', intervalKm: null, intervalMonths: 6, notes: 'Cera de carnaúba nos cromados. Sem produtos abrasivos nas peças douradas. Valor de mercado depende da estética.', priority: 'MEDIUM', order: 3 },
  { modelName: 'SHADOW VT 1100', yearFrom: 1995, yearTo: null, component: 'Óleo 10W-30 JASO MA (3,2 L serviço / 3,7 L completo)', intervalKm: 6000, intervalMonths: 12, notes: 'Mesmo motor/especificação. JASO MA obrigatório.', priority: 'HIGH', order: 1 },
  { modelName: 'SHADOW VT 1100', yearFrom: 1995, yearTo: null, component: 'Óleo do diferencial traseiro (shaft) — 80W-90 GL-5', intervalKm: 20000, intervalMonths: null, notes: 'CRÍTICO: shaft drive. Não negligenciar. Volume: ~100 mL.', priority: 'CRITICAL', order: 2 },
]

// ─── Calibragens ──────────────────────────────────────────────────────────────

const VT600C_CALIBRAGEM = {
  modelName: 'VT 600 C SHADOW',
  yearFrom: 1997, yearTo: 2004,
  tireSize: '90/90-19 (F) · 150/80-15 (R)',
  frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
  sparePsi: null,
  notes: 'Solo: F 29 / R 33 PSI. Com garupa: F 29 / R 36 PSI. Pneus de perfil alto cruiser. Pirelli City Dragon, Metzeler Roadtec, Dunlop D404.',
}

const VT750_CALIBRAGEM = {
  modelName: 'VT 750 SHADOW',
  yearFrom: 1997, yearTo: null,
  tireSize: '100/90-19 (F) · 170/80-15 (R)',
  frontPsi: 29, rearPsi: 36, frontPsiLoad: 29, rearPsiLoad: 39,
  sparePsi: null,
  notes: 'Solo: F 29 / R 36 PSI. Com garupa: F 29 / R 39 PSI. Pneus cruis. Michelin Commander III, Dunlop D404, Pirelli Night Dragon.',
}

const SHADOW_AM750_CALIBRAGEM = {
  modelName: 'SHADOW AM 750',
  yearFrom: 1997, yearTo: null,
  tireSize: '100/90-19 (F) · 170/80-15 (R)',
  frontPsi: 29, rearPsi: 36, frontPsiLoad: 29, rearPsiLoad: 39,
  sparePsi: null,
  notes: 'Solo: F 29 / R 36 PSI. Com garupa: F 29 / R 39 PSI. Mesma especificação da VT 750 SHADOW.',
}

const SHADOW1100_CALIBRAGEM = {
  modelName: 'SHADOW 1100 AC',
  yearFrom: 1995, yearTo: null,
  tireSize: '130/90-16 (F) · 180/70-15 (R)',
  frontPsi: 33, rearPsi: 36, frontPsiLoad: 33, rearPsiLoad: 39,
  sparePsi: null,
  notes: 'Solo: F 33 / R 36 PSI. Com garupa: F 33 / R 39 PSI. Pneus Michelin Commander III ou Dunlop D404 para cruiser 1100.',
}

const SHADOW1100_OURO_CALIBRAGEM = {
  modelName: 'SHADOW 1100 OURO',
  yearFrom: 1995, yearTo: null,
  tireSize: '130/90-16 (F) · 180/70-15 (R)',
  frontPsi: 33, rearPsi: 36, frontPsiLoad: 33, rearPsiLoad: 39,
  sparePsi: null,
  notes: 'Mesma calibragem da SHADOW 1100 AC. Verificar sempre a frio.',
}

const SHADOW_VT1100_CALIBRAGEM = {
  modelName: 'SHADOW VT 1100',
  yearFrom: 1995, yearTo: null,
  tireSize: '130/90-16 (F) · 180/70-15 (R)',
  frontPsi: 33, rearPsi: 36, frontPsiLoad: 33, rearPsiLoad: 39,
  sparePsi: null,
  notes: 'Mesma especificação da família Shadow 1100. Verificar sempre a frio.',
}

// ─── Upsert helpers ───────────────────────────────────────────────────────────

async function upsertTips(modelName: string, category: Cat, tips: TipInput[]) {
  await prisma.tip.deleteMany({ where: { modelName, category } })
  for (let i = 0; i < tips.length; i++) {
    const t = tips[i]
    await prisma.tip.create({
      data: { modelName, category, order: i + 1, severity: t.severity, title: t.title, body: t.body },
    })
  }
}

async function upsertMaintenance(items: MaintenanceItemInput[]) {
  const modelNames = [...new Set(items.map(i => i.modelName))]
  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: modelNames } } })
  for (const item of items) {
    await prisma.maintenanceItem.create({ data: item })
  }
}

async function upsertTirePressure(tp: { modelName: string; yearFrom: number; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number; rearPsiLoad: number; sparePsi: number | null; notes: string }) {
  await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName } })
  await prisma.tirePressure.create({
    data: tp,
  })
}

async function upsertVehicleModel(name: string, brandName: string, yearFrom: number, yearTo: number | null) {
  const brand = await prisma.brand.findFirst({ where: { name: brandName } })
  if (!brand) { console.warn(`Brand ${brandName} not found`); return }
  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name, brandId: brand.id } },
    create: { name, brandId: brand.id },
    update: {},
  })
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Honda Shadow Cruisers (VT600C / AM750 / VT750 / Shadow 1100)...')

  await upsertVehicleModel('VT 600 C SHADOW', 'Honda', 1997, 2004)
  await upsertVehicleModel('SHADOW AM 750', 'Honda', 1997, 2005)
  await upsertVehicleModel('VT 750 SHADOW', 'Honda', 1997, null)
  await upsertVehicleModel('SHADOW 1100 AC', 'Honda', 1995, null)
  await upsertVehicleModel('SHADOW 1100 OURO', 'Honda', 1995, null)
  await upsertVehicleModel('SHADOW VT 1100', 'Honda', 1995, null)

  // VT 600 C
  await upsertTips('VT 600 C SHADOW', 'MACETES', VT600C_MACETES)
  await upsertTips('VT 600 C SHADOW', 'PROBLEMAS', VT600C_PROBLEMAS)
  await upsertMaintenance(VT600C_MANUTENCAO)
  await upsertTirePressure(VT600C_CALIBRAGEM)

  // VT 750 + AM 750
  await upsertTips('VT 750 SHADOW', 'MACETES', VT750_MACETES)
  await upsertTips('VT 750 SHADOW', 'PROBLEMAS', VT750_PROBLEMAS)
  await upsertTips('SHADOW AM 750', 'MACETES', VT750_MACETES)
  await upsertTips('SHADOW AM 750', 'PROBLEMAS', VT750_PROBLEMAS)
  await upsertMaintenance(VT750_MANUTENCAO)
  await upsertTirePressure(VT750_CALIBRAGEM)
  await upsertTirePressure(SHADOW_AM750_CALIBRAGEM)

  // Shadow 1100 (AC, OURO, VT 1100)
  await upsertTips('SHADOW 1100 AC', 'MACETES', SHADOW1100_MACETES)
  await upsertTips('SHADOW 1100 AC', 'PROBLEMAS', SHADOW1100_PROBLEMAS)
  await upsertTips('SHADOW 1100 OURO', 'MACETES', SHADOW1100_MACETES)
  await upsertTips('SHADOW 1100 OURO', 'PROBLEMAS', SHADOW1100_PROBLEMAS)
  await upsertTips('SHADOW VT 1100', 'MACETES', SHADOW1100_MACETES)
  await upsertTips('SHADOW VT 1100', 'PROBLEMAS', SHADOW1100_PROBLEMAS)
  await upsertMaintenance(SHADOW1100_MANUTENCAO)
  await upsertTirePressure(SHADOW1100_CALIBRAGEM)
  await upsertTirePressure(SHADOW1100_OURO_CALIBRAGEM)
  await upsertTirePressure(SHADOW_VT1100_CALIBRAGEM)

  const models = ['VT 600 C SHADOW', 'VT 750 SHADOW', 'SHADOW AM 750', 'SHADOW 1100 AC', 'SHADOW 1100 OURO', 'SHADOW VT 1100']
  const tipCount = await prisma.tip.count({ where: { modelName: { in: models } } })
  const maintCount = await prisma.maintenanceItem.count({ where: { modelName: { in: models } } })

  console.log(`✅ ${models.length} modelos Shadow — ${tipCount} dicas, ${maintCount} itens de manutenção`)
  console.log('✅ Seed concluído!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
