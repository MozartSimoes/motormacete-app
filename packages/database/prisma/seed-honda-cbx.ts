/**
 * Seed Honda CBX — macetes, problemas, manutenção e calibragem
 * Modelos cobertos (FIPE):
 *   CBX 150 AERO      (1990–1993) — 149cc SOHC single, urbana leve
 *   CBX 200 STRADA    (1993–2003) — 199cc SOHC single, urbana/trail
 *   CBX 250 TWISTER   (2001–2008) — 249cc SOHC 4v single, esportiva naked
 *   CBX 750 FOUR      (1990)      — 747cc DOHC inline-4, mesmo RC17E da CBX 750 R
 *   CBX 750 FOUR INDY (1990–1995) — mesma base 747cc, bodywork touring/sport
 *
 * Nota: "CBX 750 FOUR" como modelName cobre FOUR e FOUR INDY no matchesStoredName
 * porque a FIPE retorna "CBX 750 FOUR INDY" e a regex \bCBX 750 FOUR\b faz match.
 *
 * Execute: pnpm --filter @motormacete/database db:seed:honda-cbx
 */
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
  modelName: string; yearFrom: number | null; yearTo: number | null
  tireSize: string; frontPsi: number; rearPsi: number
  frontPsiLoad: number | null; rearPsiLoad: number | null; notes: string | null
}
interface MaintenanceItemInput {
  modelName: string; yearFrom: number | null; yearTo: number | null
  component: string; intervalKm: number | null; intervalMonths: number | null
  notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number
}

// ═══════════════════════════════════════════════════════════════════════════════
// CBX 150 AERO (1990–1993) — 149cc SOHC single, refrigerado a ar
// ═══════════════════════════════════════════════════════════════════════════════

const CBX150AERO_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W40 JASO MA, ~0,8–1,0 L — troque a cada 4.000 km ou 6 meses',
    body: 'O motor 149cc SOHC da CBX 150 AERO tem capacidade de óleo de aproximadamente 0,8 L sem filtro e 1,0 L com filtro novo. Use 10W40 com certificação JASO MA ou MA2 (obrigatório para embreagem molhada). Marcas confiáveis: Motul 7100 4T 10W-40, Shell Advance AX7, Castrol Power1. Em moto de 30+ anos com vedações envelhecidas, não ultrapasse 4.000 km — o blow-by aumenta a contaminação do óleo mais rapidamente do que em motores novos. Óleo escuro e espumoso indica contaminação — diagnóstico imediato.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA — gap 0,6–0,7 mm; inspecione a cada 6.000 km, troque a cada 12.000 km',
    body: 'A vela padrão da CBX 150 AERO é a NGK C7HSA (ou equivalente Denso U22FS-U). Gap correto: 0,6–0,7 mm — use calibrador de lâminas para verificar. Torque de aperto: 12–15 N.m (com arruelas de cobre). Em motor parado por longo período, a vela pode estar com eletrodo oxidado e carbono acumulado — substitua antes da primeira saída. Vela escurecida e oleosa = anéis de segmento desgastados ou consumo excessivo de óleo; vela branca/cinza clara = mistura pobre (carburador entupido ou afiado incorretamente).',
  },
  {
    severity: 'OK',
    title: 'Corrente 420 — lubrifique a cada 500 km; verifique tensão (20–25 mm de folga)',
    body: 'A CBX 150 AERO usa corrente de transmissão padrão 420 com tensor manual. Lubrificação a cada 500 km com spray de corrente ou óleo SAE 90 aplicado com pincel. Tensão ideal: 20–25 mm de folga vertical no ponto mais folgado da corrente (com a moto no cavalete e 1 piloto em cima). Corrente muito tensionada desgasta mancal do eixo traseiro; muito folgada pode pular ou bater no protetor. Kit de relação (corrente + pinhão + coroa) para 150cc Honda: R$120–200 em aftermarket; troque sempre os 3 componentes juntos.',
  },
  {
    severity: 'WARN',
    title: 'Carburador sensível ao etanol — limpeza preventiva a cada 12 meses mesmo sem sintomas',
    body: 'O carburador da CBX 150 AERO usa jets e passagens finas que acumulam verniz de etanol ao longo dos meses, especialmente em moto usada com pouca frequência. Gasolina brasileira com 27% de etanol envelhece em 60–90 dias e deposita resinas que entopem o jato de marcha lenta (menor furo do carburador). Sintoma típico: dificuldade de partir a frio, marcha lenta instável, engasgo ao abrir o acelerador suavemente. Limpeza preventiva anual com kit de reconstrução (R$30–70 em autopeças): jatos, agulha, boia e vedações. Em moto parada por 6+ meses: drene o combustível do carburador antes de guardar — abra a torneira de drenagem ou remova o dreno da cuba.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar tipo esponja — limpe a cada 3.000 km; troque a cada 12.000 km',
    body: 'A CBX 150 AERO usa filtro de ar em esponja de poliuretano na caixa de ar. Limpeza: remova a esponja, lave com água e sabão neutro, enxágue bem, seque à sombra e aplique uma fina camada de óleo de filtro de ar (ou óleo motor 30W) antes de recolocar — a esponja levemente oleada retém mais partículas de poeira. Esponja ressecada, rasgada ou com furos = substituição imediata. Filtro sujo reduz a mistura de combustível e aumenta o consumo em até 15%. Custo da esponja nova: R$15–30 em peças de reposição de ciclone.',
  },
  {
    severity: 'WARN',
    title: 'Regulador/retificador simples — verifique tensão de carga; limite é 14,5 V em 3.000 rpm',
    body: 'O sistema de carga da CBX 150 AERO é simples (estátor + regulador/retificador monofásico), típico de motos de pequena cilindrada da era. O regulador pode falhar causando sobrecarga (acima de 15 V) e destruindo a bateria e o estátor progressivamente. Diagnóstico fácil: multímetro nas bornes da bateria com motor em 3.000 rpm — deve marcar entre 13,5 e 14,5 V. Abaixo de 12,8 V = regulador ou estátor deficientes (moto não carrega). Acima de 15 V = regulador com defeito (destrói bateria). Regulador de reposição: universal para Honda 150cc da era, R$60–120 em autopeças.',
  },
  {
    severity: 'OK',
    title: 'Peças com 30+ anos — achou! Muita compatibilidade com CG 125, XL 125 e outras motos Honda 150cc da época',
    body: 'A CBX 150 AERO compartilha muitas peças com a família Honda de pequena cilindrada dos anos 1990. Antes de pagar preço de peça "específica CBX 150 AERO" (raridade = preço alto), verifique compatibilidade com: juntas de motor da Honda CG 125 (mesma família de cabeçote), vedantes de garfo de outros modelos Honda com o mesmo diâmetro de tubo, filtros de ar de dimensões compatíveis, filtro de combustível universal. Grupos de entusiastas no Facebook Brasil têm mapeamento de equivalências. A vela NGK C7HSA é idêntica à usada em diversas 125–150 Honda — fácil de encontrar.',
  },
]

const CBX150AERO_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Carburador entupido — causa mais comum de marcha lenta errática e dificuldade de partida',
    body: 'Depois de 30 anos e uso irregular com gasolina etanolizada, o carburador da CBX 150 AERO acumula depósitos de verniz nos jatos. Sintomas: não parte a frio sem choke, marcha lenta acima ou abaixo de 1.500 rpm, engasgo ao rolar a manopla suavemente antes de pegar velocidade. Diagnóstico: retire o carburador (simples — 2 abraçadeiras, canaleta de vácuo e cabo do acelerador), remova a cuba e observe os jatos — jato de marcha lenta (menor) entupido é o mais comum. Kit de reconstrução com todos os jatos, agulha e vedações: R$40–80 no mercado. Mecânico que entende de carburador cobra R$80–150 para limpeza completa.',
  },
  {
    severity: 'WARN',
    title: 'Rolamentos de roda com graxa envelhecida — vibração em velocidade e direção imprecisa',
    body: 'Os rolamentos de roda da CBX 150 AERO com 30 anos têm graxa solidificada que perdeu propriedades lubrificantes. Sintoma: vibração em alta velocidade que aumenta progressivamente; ao girar a roda suspensa, sente-se resistência ou crepitação. Diagnóstico: levante a moto com cavalete, gire cada roda lentamente e palpe o cubo — crepitação ou folga perceptível = rolamento ruim. Substituição: rolamentos são universais (número gravado no rolamento, ex: 6302 / 6303). SKF, FAG ou NSK em autopeças especializadas. Custo por roda: R$30–70. Troca de todos os rolamentos de roda (4 rolamentos) é recomendada em moto que não circula há anos.',
  },
  {
    severity: 'WARN',
    title: 'Bengala dianteira com óleo envelhecido ou ressecada — amortecimento perdido',
    body: 'A bengala telescópica da CBX 150 AERO opera com óleo de garfo específico. Após 30+ anos sem troca, o óleo envelheceu e a borracha dos retentores ressecou — resultado: garfo sem amortecimento (desce muito fácil em buracos) ou vedação com vazamento de óleo. Sintoma de retentor com vazamento: mancha de óleo na parte cromada do garfo (cilindro interno). Troca: drene o óleo pelas tampas de drenagem inferiores, encha com Honda SS-8 10W ou Motul Fork Oil Light 7,5W. Quantidade por perna: ~150–200 mL (confirme no manual). Retentores de garfo: medição do diâmetro externo do tubo de garfo (tipicamente 27–30 mm) para achar equivalente.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico de 30 anos — conectores oxidados causam falhas intermitentes de ignição',
    body: 'O chicote elétrico da CBX 150 AERO tem 30+ anos e os conectores de plástico ficam com pinos oxidados. Oxidação cria resistência elétrica que causa falhas intermitentes: moto para na esquina e volta a funcionar sozinha, velocímetro errático, farol fraco. Diagnóstico: desconecte e reconecte cada conector do chicote e observe se o problema some temporariamente — se sim, o conector está oxidado. Solução: limpe cada pino com palito de dente + spray de contato elétrico (WD-40 Specialist Electrical, R$25–40). Aplique vaselina técnica nos pinos após limpeza para evitar reoxidação. Conector de ignição próximo ao farol é o mais crítico nessa moto.',
  },
  {
    severity: 'OK',
    title: 'Peças originais raras — mas muita compatibilidade com Honda CG 125/150 da mesma era',
    body: 'Peças específicas Honda CBX 150 AERO (1990–1993) em concessionárias são praticamente inexistentes. Mas a família de motores Honda 150cc da época tem ampla compatibilidade entre si. Antes de desistir da busca, verifique cruzamento com: juntas completas do motor da CG 125 1993 (mesma família), pistão e anéis de motor Honda 125/150 da era, cubo de roda (confirme diâmetro e número de raios), proteções de escapamento compatíveis por diâmetro. Grupos de colecionadores no Facebook têm listas de equivalências. Alternativa: motor Honda CG 125/150 completo serve como "doador" de peças internas (pistão, anéis, tuchos).',
  },
]

const CBX150AERO_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Ajuste de válvulas (SOHC) — adm 0,05 mm / esc 0,08 mm, a cada 12.000 km com motor frio',
    body: 'O motor SOHC da CBX 150 AERO tem 2 válvulas por cilindro (admissão e escape). Folga de válvulas com motor frio: admissão 0,05–0,08 mm, escape 0,08–0,12 mm (confirme no manual). Válvulas com folga zero ou negativa (afundadas) perdem vedação → motor sem potência e difícil de partir. Válvulas com folga excessiva → ruído metálico a cada rotação e desgaste rápido do came. Em motores de 30 anos, a tendência é que as válvulas fechem (folga diminui) por desgaste dos tuchos — inspecione a cada 12.000 km ou ao notar ruído metálico a frio.',
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// CBX 200 STRADA (1993–2003) — 199cc SOHC single, refrigerado a ar
// ═══════════════════════════════════════════════════════════════════════════════

const CBX200STRADA_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W40 JASO MA, ~1,0–1,2 L com filtro — troque a cada 5.000 km ou 6 meses',
    body: 'O motor 199cc SOHC da CBX 200 STRADA tem capacidade de óleo de ~1,0 L sem filtro e ~1,2 L com filtro novo. Use 10W40 JASO MA ou MA2. Recomendados: Motul 7100 4T 10W-40, Castrol Power1 4T 10W-40, Shell Advance 4T 10W-40. Motores com histórico de manutenção irregular ou com muito quilômetro (acima de 60.000 km): considere 20W50 mineral que sela melhor folgas aumentadas. Intervalo máximo: 5.000 km (motor a ar em clima quente degrada óleo mais rápido que motor refrigerado a líquido). Troque o filtro de óleo junto a cada troca: HifloFiltro HF111 ou K&N equivalente.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK D8EA — gap 0,6–0,7 mm; inspecione a cada 6.000 km, troque a cada 12.000 km',
    body: 'Vela padrão da CBX 200 STRADA: NGK D8EA (roscada longa 19mm, calor 8). Alternativa: Denso T20F-U. Gap: 0,6–0,7 mm — sempre verifique com calibrador antes de instalar. Torque de aperto: 18–20 N.m. Vela com depósito de carbono preto e seco = mistura rica ou filtro de ar sujo. Vela com eletrodo branco e porcelana clara = mistura pobre (carburador com problema ou jato errado). Vela com depósito oleoso = anéis de segmento desgastados. O diagnóstico pela vela é uma das ferramentas mais valiosas em motores de carburador.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428 — lubrifique a cada 500 km; folga ideal 20–30 mm',
    body: 'A CBX 200 STRADA usa corrente 428 (passo 1/2", elos de 8mm de largura). Lubrificação a cada 500 km com spray de corrente para o-ring/x-ring. Tensão: 20–30 mm de folga vertical no ponto mais folgado da corrente com 1 piloto sobre a moto. Verifique desgaste: segure a corrente na lateral da coroa traseira e puxe para fora — se aparecer dente da coroa inteiro, a corrente está estendida além do limite (troque). Kit de relação (corrente + pinhão + coroa) 428 para Honda 200cc: R$150–280 no aftermarket. Sempre troque os 3 componentes juntos.',
  },
  {
    severity: 'OK',
    title: 'Motor durável reconhecido — motor 199cc Honda SOHC é um dos mais confiáveis da história',
    body: 'O motor 199cc SOHC da Honda usado na CBX 200 STRADA é derivado da família XL/XR 200, reconhecidamente um dos motores de moto mais confiáveis e duráveis já produzidos. Com manutenção adequada, motores dessa família alcançam facilmente 100.000–150.000 km sem necessidade de retífica. Os pontos críticos de manutenção são poucos: óleo em dia, vela calibrada, filtro limpo e válvulas ajustadas. A simplicidade do motor (1 carburador, SOHC com 2 válvulas, sem eletrônica) facilita o diagnóstico e o reparo por qualquer mecânico competente.',
  },
  {
    severity: 'WARN',
    title: 'Ajuste de carburador para etanol — jato principal pode precisar de calibração',
    body: 'A CBX 200 STRADA foi produzida entre 1993–2003, quando o teor de etanol na gasolina era diferente do atual. A gasolina comum brasileira atual tem 27% de etanol (E27), contra 22–24% de quando a moto foi fabricada. Etanol exige mistura mais rica (mais combustível por volume de ar). Sintoma de mistura pobre atual: partida difícil a frio, motor "tosse" na aceleração suave, perda de potência. Ajuste: jato principal com 1–2 tamanho acima do original (ex: se original é #105, tente #108 ou #110). Ajuste deve ser feito por mecânico com experiência em carburação — um jato errado afeta o desempenho em toda a faixa de rotação.',
  },
  {
    severity: 'OK',
    title: 'Peças com boa disponibilidade — família XL/XR 200 compartilha componentes internos',
    body: 'A CBX 200 STRADA compartilha componentes internos de motor com a família Honda XL 200, XR 200 e outras 200cc SOHC da época. Pistão, anéis, juntas de motor, tuchos e válvulas têm equivalentes no mercado. Fabricantes como Bross (nacionais), Vertex (italiano) e Wiseco (americano) produzem pistões compatíveis. Filtros de óleo, velas e filtros de ar encontram-se facilmente por cruzamento de referência. A principal dificuldade são peças de carroceria (para-lamas, tampas laterais, tanque) — para essas, grupos de entusiastas no Facebook e mercados de usados são a melhor fonte.',
  },
  {
    severity: 'WARN',
    title: 'Bengala telescópica convencional — substitua óleo e retentores em moto sem histórico de manutenção',
    body: 'A CBX 200 STRADA tem bengala telescópica convencional. Em motos com 20+ anos sem troca do óleo de garfo, o óleo está degradado e os retentores de borracha podem estar ressecados com micro-vazamentos. Resultado: amortecimento insuficiente (garfo afunda demais em buracos) ou retentor vazando visualmente (mancha de óleo no tubo cromado). Troca de óleo: drene pelas tampas inferiores, encha com Honda SS-8 10W ou equivalente, ~150–200 mL por perna. Retentores: medição do diâmetro do tubo de garfo (tipicamente 30–33 mm para 200cc) + busca por kit universal no tamanho correto. Custo completo com mão de obra: R$150–300.',
  },
]

const CBX200STRADA_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Regulador/retificador fraco — sobrecarga destrói bateria e estátor progressivamente',
    body: 'O regulador/retificador original da CBX 200 STRADA é simples e tem histórico de falha em motos com 15+ anos. Quando falha, regula em tensão alta (15–17 V ao invés de 13,5–14,5 V), destruindo a bateria e o estátor do alternador em semanas. Diagnóstico: multímetro nas bornes da bateria com motor em 3.000 rpm. Faixa correta: 13,5–14,5 V. Acima de 15 V = regulador defeituoso. Substituição preventiva: regulador universal para Honda 200cc (R$80–150) antes de instalar bateria nova. Sequência correta: (1) teste o regulador, (2) se OK, instale bateria nova, (3) se defeituoso, troque o regulador primeiro.',
  },
  {
    severity: 'WARN',
    title: 'Carburador com verniz de etanol — causa 80% dos problemas de desempenho em CBX 200 Strada usada',
    body: 'Em CBX 200 STRADA com uso irregular ou parada por meses, o carburador acumula verniz de etanol que entope o jato de marcha lenta e as passagens de vácuo. Sintomas clássicos: motor parte no choke mas morre ao desligar o choke, marcha lenta errática (surge entre 800 e 2.000 rpm), aceleração com tropeço no ponto neutro do carburador (~1/4 de abertura da manopla). Diagnóstico diferencial: verifique PRIMEIRO o filtro de ar (filtro sujo causa sintomas parecidos) e DEPOIS o carburador. Limpeza completa do carburador com kit (jatos, agulha, boia, vedações): R$40–80 em peças + R$80–150 de mão de obra. Após limpeza, ajuste o parafuso de mistura: 2,5 voltas a partir de fechado como ponto de partida.',
  },
  {
    severity: 'WARN',
    title: 'Válvulas fechadas por desgaste — perda gradual de compressão sem sintoma imediato de ruído',
    body: 'O motor SOHC da CBX 200 STRADA tende a ter as válvulas fechando ao longo do tempo por desgaste dos tuchos e assentos. Diferente de outros motores onde válvulas folgadas batem, nesse motor o desgaste reduz a folga até zero — a válvula não fecha completamente na combustão, perde compressão e o motor perde potência gradualmente. Sintoma: motor que "perdeu o gás" ao longo dos anos, dificuldade crescente de partir a frio. Teste de compressão: deve marcar 130–155 PSI (9–11 kgf/cm²) no motor a temperatura de operação. Abaixo de 100 PSI = válvula suja/fechada ou anéis gastos. Ajuste de válvulas a cada 12.000 km é preventivo essencial.',
  },
  {
    severity: 'WARN',
    title: 'Pneus com mais de 6 anos — borracha endurecida perde aderência mesmo com sulcos aparentes',
    body: 'Pneus da CBX 200 STRADA com 6+ anos de fabricação (verifique o código DOT no flanco: últimos 4 dígitos indicam semana/ano de fabricação, ex: "3518" = semana 35 de 2018) devem ser substituídos independentemente do estado visual dos sulcos. A borracha envelhece quimicamente e perde elasticidade — pneu velho escorrega na chuva e em manobras de emergência muito antes de desgastar os sulcos. Pneus para aro 18" da CBX 200 STRADA: Pirelli MT66, Michelin Pilot Street, Dunlop K555 — marcas que fabricam no tamanho correto. Calibragem correta: dianteiro 29 PSI, traseiro 33 PSI (frio).',
  },
  {
    severity: 'OK',
    title: 'Farol com lâmpada H4 35/35W — substitua por LED H4 para melhor visibilidade noturna',
    body: 'O farol original da CBX 200 STRADA usa lâmpada H4 35W (baixo) / 35W (alto), que produz iluminação insuficiente para velocidades acima de 60 km/h. Substituição por LED H4: melhora em 3–5× a quantidade de luz com mesmo ou menor consumo elétrico. Cuidado: LEDs H4 geram calor no driver e devem ser de marcas confiáveis (Osram LEDriving, Philips Ultinon). Lâmpadas LED de baixa qualidade falham em vibração de moto em 2–6 meses. Custo: R$60–150 por LED H4 de qualidade. Alternativa de custo baixo e confiável: lâmpada halógena H4 55/60W (aumento significativo vs original 35/35W, sem modificação elétrica necessária).',
  },
]

const CBX200STRADA_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Ajuste de válvulas (SOHC) — adm 0,05–0,08 mm / esc 0,10–0,12 mm, a cada 12.000 km com motor frio',
    body: 'Motor SOHC de 2 válvulas. Folgas com motor completamente frio (4+ horas após última operação): admissão 0,05–0,08 mm, escape 0,10–0,12 mm. Confirme valores no manual do proprietário pois podem variar por ano de fabricação. Ajuste anual ou a cada 12.000 km é recomendado — motor que perdeu compressão gradualmente muitas vezes tem válvulas fechadas como causa principal.',
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// CBX 250 TWISTER (2001–2008) — 249cc SOHC 4 válvulas single, ar, carburador
// ═══════════════════════════════════════════════════════════════════════════════

const CBX250TWISTER_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W40 JASO MA, ~1,4–1,6 L com filtro — troque a cada 5.000 km ou 6 meses',
    body: 'O motor 249cc SOHC 4 válvulas da CBX 250 Twister usa ~1,4 L sem filtro e ~1,6 L com filtro novo. Use exclusivamente 10W40 com certificação JASO MA ou MA2 — a embreagem molhada integrada exige esse padrão. Não use óleo para carro (API SN/SP) pois os aditivos redutores de fricção degradam a embreagem. Recomendados: Motul 7100 4T 10W-40, Honda HP4, Shell Advance Ultra 4T 10W-40. Troque o filtro de óleo (HifloFiltro HF111 ou K&N KN-111) a cada 2 trocas de óleo no máximo. Motor bem cuidado com óleo em dia tem vida útil de 80.000–120.000 km sem retífica.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR7E ou CPR7EA — gap 0,7–0,8 mm; troque a cada 10.000 km',
    body: 'Vela padrão da CBX 250 Twister: NGK CR7E (roscada curta 12mm, calor 7, ponta reta) ou CPR7EA (iridium, maior durabilidade). Gap: 0,7–0,8 mm. Torque de aperto: 18–20 N.m. Troca a cada 10.000 km. Com vela iridium (NGK CPR7EA-9 ou similar), o intervalo pode ser estendido para 15.000–20.000 km. Vela com eletrodo erodido ou carbon fouling em menos de 5.000 km indica problema de carburação — não troque a vela sem investigar a causa raiz.',
  },
  {
    severity: 'WARN',
    title: 'Corrente 428 — lubrifique a cada 500 km; CRÍTICO porque a Twister é mais rápida que as 150cc',
    body: 'A CBX 250 Twister usa corrente 428 e é significativamente mais rápida e potente que as 150cc. Em velocidades acima de 100 km/h, uma corrente seca aquece rapidamente e pode romper. Lubrifique a cada 500 km sem exceção com spray de corrente para o-ring/x-ring (não use WD-40 — é solvente, remove lubrificante). Tensão: 20–30 mm de folga vertical no ponto mais folgado (consulte o manual pois varia por ano). Desgaste: puxe a corrente lateralmente na coroa traseira — se aparecer dente inteiro, substitua o kit. Kit 428 para Twister: R$180–350. Corrente rompida em velocidade = acidente grave.',
  },
  {
    severity: 'WARN',
    title: 'Ajuste de válvulas SOHC 4v crítico — motor perde compressão silenciosamente se negligenciado',
    body: 'O motor da CBX 250 Twister tem SOHC com 4 válvulas por cilindro (2 admissão + 2 escape) ajustadas por tuchos com pastilhas (shim-under-bucket). Folgas corretas com motor frio: admissão 0,10–0,15 mm, escape 0,15–0,20 mm. O desgaste fecha as válvulas progressivamente — sem ruído, sem sintoma imediato, apenas perda gradual de potência e compressão. Moto que "perdeu o gás" ao longo de 20.000–30.000 km provavelmente precisa de ajuste de válvulas. Inspeção e ajuste exigem desmontagem do cabeçote para trocar pastilhas (shims) — custo em oficina: R$250–450. Intervalo: a cada 12.000 km.',
  },
  {
    severity: 'OK',
    title: 'Carburador CV (diafragma) — diafragma de borracha é ponto de falha após 15+ anos',
    body: 'A CBX 250 Twister usa carburador tipo CV (constant velocity) com diafragma de borracha que controla o slide. Diafragma com furo (borracha envelhecida) causa: marcha lenta acima de 2.000 rpm sem toque no acelerador, engasgo no tiro inicial, consumo anormalmente alto. Diagnóstico: retire a tampa superior do carburador (4 parafusos), levante o slide e inspecione o diafragma contra a luz — qualquer ponto de luz através da borracha = furo. Diafragma de reposição para Twister: R$80–150 importado (All Balls Racing, Keyster) ou nacional R$40–70. Após troca do diafragma, o carburador responde de forma imediatamente diferente.',
  },
  {
    severity: 'OK',
    title: 'Peças amplamente disponíveis — a Twister é uma das motos mais populares do Brasil',
    body: 'A CBX 250 Twister foi produzida por 8 anos (2001–2008) e vendida em grande volume no Brasil. Resultado: peças de reposição amplamente disponíveis em todo o território nacional, mesmo em cidades pequenas. Pastilhas de freio, filtros, correntes, velas, filtros de ar — todos encontráveis em autopeças convencionais. Kit completo de manutenção (vela + filtro de ar + filtro de óleo + óleo): R$80–150. Para peças de motor (pistão, anéis, juntas), fabricantes como Bross, Vertex e Wiseco têm equivalentes. Preços de peças originais Honda costumam ser moderados para essa moto dado o volume de produção.',
  },
  {
    severity: 'OK',
    title: 'Pastilhas de freio dianteiro — EBC HH Sintered ou Ferodo FDB; troque a cada 8.000–12.000 km',
    body: 'A CBX 250 Twister tem freio dianteiro a disco com pinça simples. As pastilhas originais Honda são de qualidade razoável mas as sinterizadas aftermarket (EBC Double-H HH ou Ferodo FDB) oferecem melhor mordida e durabilidade maior. Inspecione o desgaste a cada 6.000 km: pastilha com menos de 1,5 mm de material friccional restante = substitua imediatamente. Nunca deixe pastilha gastar até o metal — o disco é danificado e uma nova pastilha em disco estriado não freia corretamente. Ao trocar pastilhas, limpe os pinos guia da pinça e aplique graxa de alta temperatura nos pinos (não nas pastilhas). Custo do par: R$50–120.',
  },
  {
    severity: 'WARN',
    title: 'Regulador de tensão — verifique antes de instalar bateria nova; faixa correta 13,5–14,8 V a 4.000 rpm',
    body: 'O regulador/retificador da CBX 250 Twister falha com relativa frequência em motos com 10+ anos ou alto quilômetro. Falha típica: tensão acima de 15 V na bateria com motor acelerado — o excesso de tensão destrói a bateria nova em dias ou semanas. Diagnóstico: multímetro nas bornes da bateria com motor em 4.000 rpm; resultado deve ser 13,5–14,8 V. Se acima de 15 V: troque o regulador ANTES de colocar bateria nova. Regulador de reposição para Twister: Honda original R$200–350 ou aftermarket compatível R$100–200. Bateria correta: YTX9-BS (12V, 8Ah) — Yuasa, Moura ou equivalente.',
  },
]

const CBX250TWISTER_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Diafragma do carburador furado — causa mais comum de problemas de desempenho na Twister 10+ anos',
    body: 'Em CBX 250 Twister com 10+ anos, o diafragma de borracha do carburador CV está envelhecido. Um furo microscópico causa sintomas que mecânicos menos experientes atribuem à carburação geral (troca desnecessária de agulha, jatos, boia — sem resultado). Inspeção simples: tampa superior do carburador (4 parafusos), slide para cima, diafragma contra a luz — luz passando = furo. Solução definitiva: diafragma novo. Peça All Balls Racing ou Keyster para Honda CBX 250 Twister. Custo: R$80–150 importado. Após troca, motor responde imediatamente melhor — marcha lenta estabiliza abaixo de 1.500 rpm, aceleração fica suave.',
  },
  {
    severity: 'WARN',
    title: 'Pastilhas de freio dianteiro gastas — piloto jovem e uso intenso desgastam rápido',
    body: 'A Twister é uma moto popular entre jovens pilotos que usam intensamente o freio dianteiro. Pastilhas originais Honda duram ~8.000–12.000 km em uso normal, mas com pilotagem agressiva podem gastar em 5.000 km. Sintoma de pastilha no limite: vibração ao frear, ruído metálico no freio, alavanca indo mais fundo antes de frear. Pastilha zerada = disco riscado = R$200–400 em disco novo além do custo das pastilhas. Inspecione a cada troca de óleo. EBC HH Sintered dura ~50% mais que a original e oferece melhor mordida.',
  },
  {
    severity: 'WARN',
    title: 'Corrente de transmissão não lubrificada — falha prematura e risco de ruptura em velocidade',
    body: 'A CBX 250 Twister é uma moto esportiva que frequentemente é conduzida a altas velocidades. Corrente sem lubrificação adequada a 120–130 km/h aquece rapidamente — o calor elimina a lubrificação interna dos elos, que começam a agarrar. Corrente "dura" (que não articula suavemente) é pré-anúncio de ruptura. Corrente rompida em velocidade pode travar a roda traseira instantaneamente (acidente grave) ou destruir o protetor de corrente e danaificar o motor. Lubrificação a cada 500 km é a manutenção mais crítica da Twister. Corrente original: 428. Kit DID 428 VX ou RK 428KRO são as recomendações de referência para esse modelo.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pela junta do cabeçote — comum em motores com muitos anos e calor intenso',
    body: 'O motor 249cc SOHC da Twister, sendo refrigerado a ar, opera em temperaturas de cabeçote mais altas que motores refrigerados a líquido. Ao longo de anos, a junta do cabeçote pode desenvolver micro-vazamentos. Sintoma: mancha de óleo na junção entre cabeçote e cilindro (parte superior do motor), odor de óleo queimando no escapamento, óleo escorrendo pela parte traseira do motor. Diagnóstico: limpe o motor com pano e solução de limpeza, rode por 20–30 min e identifique de onde vem a mancha. Junta de cabeçote nova + retífica plana do cabeçote (se necessário): R$150–300 em peças + R$300–500 de mão de obra.',
  },
  {
    severity: 'OK',
    title: 'Regulador de tensão deficiente — bateria que descarrega frequentemente raramente é problema da bateria',
    body: 'Quando a bateria da Twister "descarrega sempre", o erro mais comum é trocar a bateria sem checar o regulador. Se o regulador não carrega adequadamente (menos de 13,5 V a 4.000 rpm), qualquer bateria nova se descarregará em dias. Se o regulador sobrecarrega (mais de 15 V), a bateria nova será destruída em semanas por sobretensão. Diagnóstico simples com multímetro: chave ligada, motor a 4.000 rpm, mede-se nas bornes da bateria. Resultado correto: 13,5–14,8 V. Regulador original Honda para Twister: R$200–350. Aftermarket compatível (verificar códigos cruzados): R$80–180.',
  },
]

const CBX250TWISTER_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Ajuste de válvulas SOHC 4v — adm 0,10–0,15 mm / esc 0,15–0,20 mm; a cada 12.000 km com motor frio',
    body: 'Motor SOHC de 4 válvulas por cilindro, ajuste por pastilhas (shim-under-bucket). Folgas corretas com motor completamente frio: admissão 0,10–0,15 mm, escape 0,15–0,20 mm. O ajuste exige desmontagem do cabeçote para substituir as pastilhas pelo tamanho correto — serviço especializado. Realize a cada 12.000 km ou ao notar perda de potência, pois o motor fecha as folgas silenciosamente ao longo do tempo.',
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// CBX 750 FOUR / CBX 750 FOUR INDY (1990–1995) — 747cc inline-4 DOHC RC17E
// Nota: "CBX 750 FOUR" como modelName cobre FOUR e FOUR INDY via matchesStoredName
// ═══════════════════════════════════════════════════════════════════════════════

const CBX750FOUR_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor RC17E 747cc DOHC 16 válvulas — os mesmos 4 carburadores Keihin CV da CBX 750 R; sincronização obrigatória a cada 12.000 km',
    body: 'A CBX 750 FOUR e FOUR INDY compartilham o motor RC17E com a CBX 750 R: 747cc inline-4 DOHC 16 válvulas, refrigerado a ar, com 4 carburadores Keihin CV de 34 mm. A sincronização dos 4 carburadores é o serviço mais importante para esse motor — qualquer desequilíbrio (diferença maior que 2–3 cmHg entre cilindros) causa vibração, perda de potência e marcha lenta instável. Realize a sincronização com vacuômetro de 4 colunas a cada 12.000 km, SEMPRE após limpeza e reconstrução dos carburadores (não adianta sincronizar carburadores sujos). Serviço em oficina especializada em vintage: R$200–400.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA, ~3,5 L com filtro — troque a cada 4.000 km ou 6 meses',
    body: 'Capacidade de óleo do RC17E: ~3,2 L sem filtro / ~3,5 L com filtro novo. Use 10W-40 JASO MA ou MA2 obrigatoriamente. Em motores de 30+ anos com vedações envelhecidas, o intervalo máximo é 4.000 km — blow-by maior contamina o óleo mais rápido. Óleo recomendado: Motul 7100 4T 10W-40, Castrol Power1 Racing 10W-40, Honda HP4. Filtro de óleo: HifloFiltro HF204 (verificar cruzamento). Óleo turvo = contaminação; partículas metálicas brilhantes no filtro = desgaste interno acelerado — diagnóstico urgente.',
  },
  {
    severity: 'OK',
    title: 'Velas NGK DR8ES-L — 4 unidades; gap 0,6–0,7 mm; troque a cada 12.000 km',
    body: 'A CBX 750 FOUR usa 4 velas NGK DR8ES-L (roscada longa 19mm, calor 8, ponta não projetada). Troque sempre o conjunto de 4 velas — uma vela gasta num inline-4 cria desequilíbrio de combustão perceptível como vibração. Gap: 0,6–0,7 mm. Torque: 18–20 N.m com graxa anti-grippante na rosca. Em moto parada por anos: substitua as 4 velas ANTES da primeira partida — eletrodo oxidado impede ignição e pode partir dentro do cabeçote durante remoção se muito tempo parada (use penetrante antes).',
  },
  {
    severity: 'WARN',
    title: 'Regulador/retificador SCRI original de 30+ anos — substitua por MOSFET antes de qualquer saída',
    body: 'O regulador/retificador original tipo SCRI (shunt) da CBX 750 FOUR tem 30+ anos e está no limite da vida útil. Falha característica: regula em 15–17 V ao invés de 13,8–14,8 V → destrói o estátor progressivamente (bobinas queimam por sobretensão). Diagnóstico: multímetro nas bornes da bateria com motor em 4.000 rpm; acima de 15 V = regulador defeituoso. Substituição preventiva: Shindengen SH847-12 ou Rick\'s Motorsport para Honda 3-fases (verifique compatibilidade por fiação). Preço: R$150–350 importado. Verifique o estátor antes da troca (0,5–1,5 Ohm entre cada par de fases com multímetro).',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão 530 — lubrifique a cada 500 km; kit DID 530VX3 ou RK 530GXW é o substituto moderno',
    body: 'O motor 747cc gera torque suficiente para desgastar correntes de baixa qualidade rapidamente. Corrente 530 (passo 5/8", 104 elos). Kits originais Honda descontinuados — use aftermarket DID 530VX3 (x-ring) ou RK 530GXW + JT Sprockets (confirme dentes originais antes de desmontar). Lubrificação a cada 500 km com spray para x-ring/o-ring. Corrente enferrujada: não recupere com graxa — elos enferrujados são frágeis e podem partir em aceleração. Kit novo: R$350–600 importado.',
  },
  {
    severity: 'WARN',
    title: 'Diafragmas dos 4 carburadores Keihin CV — borracha de 30 anos inevitavelmente furada',
    body: 'Os 4 diafragmas de borracha dos carburadores Keihin CV da CBX 750 FOUR têm 30+ anos e estão ressecados. Furo no diafragma causa: marcha lenta acima de 2.000 rpm sem toque no acelerador, engasgo na aceleração, consumo anormalmente alto, impossibilidade de sincronizar os carburadores corretamente. Diagnóstico: tampa superior de cada carburador (4 parafusos), levante o slide, diafragma contra a luz — qualquer ponto com luz passando = furo. Kits de 4 diafragmas: All Balls Racing ou Keyster para Honda CBX 750. Custo: R$400–700 por conjunto de 4. Após instalação, o motor responde de forma radicalmente diferente.',
  },
  {
    severity: 'WARN',
    title: 'CBX 750 FOUR INDY — edição especial de longa produção (1990–1995); componentes idênticos ao FOUR base',
    body: 'A CBX 750 FOUR INDY é a versão produzida de 1990 a 1995, com gráficos esportivos e meio carenado, mas motor e mecânica idênticos ao CBX 750 FOUR. Todos os procedimentos de manutenção desta seção se aplicam igualmente ao FOUR INDY. A principal diferença prática são as peças de carenagem e meia-carenagem do INDY, que estão descontinuadas e são muito difíceis de encontrar. Para a parte mecânica (motor, freios, transmissão, suspensão), os kits e equivalentes do CBX 750 FOUR se aplicam ao FOUR INDY sem restrições.',
  },
  {
    severity: 'OK',
    title: 'Superaquecimento em tráfego parado — inline-4 refrigerado a ar: nunca fique parado mais de 10 minutos com motor ligado',
    body: 'O RC17E é refrigerado apenas por ar — sem radiador nem ventilador elétrico. Parado no trânsito por mais de 10 minutos em dia quente, a temperatura das camisas sobe a ponto de queimar a perna do piloto e estressar o óleo. Medidas preventivas: (1) Prefira horários e rotas com menos congestionamento; (2) Em parada prolongada, desligue o motor; (3) Não bloqueie as aletas de resfriamento com adesivos ou modificações estéticas; (4) Use calça de proteção — o bloco lateral do motor pode causar queimaduras de contato. A CBX 750 FOUR foi projetada para estradas, não para rush urbano.',
  },
  {
    severity: 'OK',
    title: 'Mangueiras de combustível de 30 anos — risco de incêndio por ruptura; substitua por silicone antes de rodar',
    body: 'As mangueiras de combustível de borracha da CBX 750 FOUR têm 30+ anos e estão inevitavelmente ressecadas com microfissuras internas. Uma ruptura entre o petcock e os 4 carburadores derrama gasolina sobre o cabeçote quente (escapamento passa a ~400–600°C) — incêndio imediato. Substituição obrigatória antes de rodar: todas as mangueiras de combustível e vácuo por silicone de combustível (mais resistente, disponível em Ø5–8 mm por metro em autopeças). Inclui a membrana de borracha interna do petcock (torneira de combustível) — inspecione e substitua se não veda na posição OFF. Custo total em material: R$60–130.',
  },
]

const CBX750FOUR_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Mangueiras de combustível ressecadas — risco real de incêndio em motor ligado',
    body: 'A principal causa de incêndio em motos vintage da era CBX 750 é ruptura de mangueira de combustível de borracha ressecada. A gasolina derrama sobre superfícies a 400–600°C (cabeçote e escapamento) e vaporiza instantaneamente — ponto de ignição da gasolina em vapor: ~280°C. O incêndio começa enquanto você pilota. Inspessione TODAS as mangueiras de combustível, vácuo e respiração do motor. Qualquer mangueira ressecada, rachada, deformada ou com mais de 10 anos: substitua IMEDIATAMENTE por silicone de combustível. Este item não é preventivo opcional — é obrigatório de segurança.',
  },
  {
    severity: 'DANGER',
    title: 'Partir o motor após longa parada sem preparação — risco de destruição dos mancais em minutos',
    body: 'NUNCA ligue o motor de uma CBX 750 FOUR parada por 2+ anos sem: (1) Trocar o óleo e filtro antes da partida — óleo velho tem ácidos que atacam mancais de bronze logo na partida a seco; (2) Retirar as 4 velas, borrifar óleo de motor nos cilindros e girar o motor à mão até sentir compressão — lubrifica anéis e paredes de cilindro; (3) Inspecionar todas as mangueiras de combustível (risco de incêndio); (4) Checar o petcock (torneira) — membrana colada = combustível fluindo mesmo com petcock em OFF; (5) Limpar e reconstruir os 4 carburadores. Ligar sem preparo = mancais de biela e árvore de manivelas secos = destruição em 60 segundos de motor seco.',
  },
  {
    severity: 'WARN',
    title: 'Regulador/retificador queimando estátor — diagnose antes de instalar bateria nova',
    body: 'O regulador original tipo SCRI da CBX 750 FOUR falha de forma gradual e silenciosa, passando a regular em 15–17 V ao invés de 13,8–14,8 V. A sobretensão destrói o estátor progressivamente. Sintoma tardio: moto sem carga, bateria descarrega em uso e a moto para na estrada. Estátor queimado = R$800–1.500 de reparo. Diagnóstico preventivo simples: multímetro nas bornes da bateria com motor em 4.000 rpm. Nunca coloque bateria nova sem este teste primeiro. Regulador por MOSFET: Shindengen SH847, Rick\'s Motorsport ou Electrosport para Honda da era 3-fases.',
  },
  {
    severity: 'WARN',
    title: 'Diafragmas dos 4 carburadores Keihin CV — sem diagnóstico correto, nenhum outro ajuste resolve o desempenho',
    body: 'O maior erro em mecânicos tentando resolver problemas de desempenho da CBX 750 FOUR: trocar agulha, jets e boia (R$200+) sem inspecionar os diafragmas. Diafragma furado torna qualquer outro ajuste inútil — ar entra diretamente sem dosagem. Sintomas: marcha lenta instável muito alta (2.000–3.000 rpm), não responde corretamente ao parafuso de mistura, aceleração com engasgo e surge em baixa rotação. Sempre inspecione os 4 diafragmas ANTES de qualquer outra intervenção no carburador. Teste: tampa superior de cada carb, slide para cima, diafragma contra a luz. Furo = troque. Kit de 4 diafragmas: R$400–700.',
  },
  {
    severity: 'WARN',
    title: 'Rolamentos e vedantes de 30+ anos — inspeção obrigatória antes de qualquer saída mais intensa',
    body: 'Os rolamentos de roda, coluna de direção e vedantes de garfo da CBX 750 FOUR têm 30+ anos e foram projetados para vida útil de 15–20 anos. Graxa dos rolamentos endureceu, vedantes ressecaram. Diagnóstico de rolamento de roda: gire a roda suspensa lentamente, palpe o cubo, sinta crepitação ou resistência. Coluna de direção: com a moto no cavalete central, segure a forquilha pela base e mova para frente e para trás — qualquer folga perceptível = rolamento cônico desgastado. Óleo de garfo: drene e substitua antes de rodar se a moto ficou parada por 2+ anos. Kits de rolamento: All Balls Racing para Honda CBX 750 FOUR (conjunto completo).',
  },
  {
    severity: 'WARN',
    title: 'Peças de carenagem e body CBX 750 FOUR INDY — extremamente difíceis de encontrar; preserve as originais',
    body: 'As peças de carroceria da CBX 750 FOUR INDY (meia-carenagem, carenagens laterais, gráficos "Indy") foram descontinuadas há décadas. Restauração estética completa do FOUR INDY original é praticamente impossível com peças originais — mercado de usados é a única fonte, com preços elevados. Recomendação: preserve meticulosamente a carroceria original, mesmo que haja amassados pequenos. Uma queda que destrói a carenagem original pode inviabilizar a restauração estética por completo. Para pintura desbotada: verniz de restauração automotiva (Meguiar\'s) pode trazer de volta parte da cor. Grupos de colecionadores de CBX no Brasil têm redes de troca de peças.',
  },
]

const CBX750FOUR_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Ajuste de válvulas DOHC 16v — a cada 12.000 km com motor frio; adm ~0,10 mm / esc ~0,15 mm',
    body: 'O RC17E tem DOHC com 4 válvulas por cilindro = 16 válvulas no total. Folgas com motor completamente frio: admissão ~0,10 mm / escape ~0,15 mm (confirme no manual RC17 — pode variar levemente). Ajuste de folga fora do spec = potência reduzida e/ou detonação. Em motores de coleção que ficaram parados por anos: inspecione as folgas OBRIGATORIAMENTE antes de rodar — vedantes e tuchos de 30 anos podem ter deslocado as folgas significativamente.',
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// BLOCKS — define quais tips cada modelo recebe
// ═══════════════════════════════════════════════════════════════════════════════

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'CBX 150 AERO',
    yearFrom: 1990,
    yearTo: null,
    MACETES: CBX150AERO_MACETES,
    PROBLEMAS: CBX150AERO_PROBLEMAS,
    MANUTENCAO: CBX150AERO_MANUTENCAO,
  },
  {
    modelName: 'CBX 200 STRADA',
    yearFrom: 1993,
    yearTo: null,
    MACETES: CBX200STRADA_MACETES,
    PROBLEMAS: CBX200STRADA_PROBLEMAS,
    MANUTENCAO: CBX200STRADA_MANUTENCAO,
  },
  {
    modelName: 'CBX 250 TWISTER',
    yearFrom: 2001,
    yearTo: null,
    MACETES: CBX250TWISTER_MACETES,
    PROBLEMAS: CBX250TWISTER_PROBLEMAS,
    MANUTENCAO: CBX250TWISTER_MANUTENCAO,
  },
  {
    // "CBX 750 FOUR" via matchesStoredName \bCBX 750 FOUR\b também casa com "CBX 750 FOUR INDY"
    modelName: 'CBX 750 FOUR',
    yearFrom: 1990,
    yearTo: null,
    MACETES: CBX750FOUR_MACETES,
    PROBLEMAS: CBX750FOUR_PROBLEMAS,
    MANUTENCAO: CBX750FOUR_MANUTENCAO,
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// TIRE PRESSURES
// ═══════════════════════════════════════════════════════════════════════════════

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'CBX 150 AERO',
    yearFrom: 1990, yearTo: null,
    tireSize: '2.75-18 (F) · 3.00-18 (R)',
    frontPsi: 26, rearPsi: 29, frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Pneus de perfil convencional aro 18". Verifique o DOT (semana/ano nos últimos 4 dígitos no flanco) — pneus com mais de 6 anos devem ser substituídos mesmo com sulcos aparentes. Com carregamento traseiro (bolsas), aumente o traseiro para 33 PSI. Calibre sempre com pneu frio.',
  },
  {
    modelName: 'CBX 200 STRADA',
    yearFrom: 1993, yearTo: null,
    tireSize: '2.75-18 (F) · 3.50-18 (R)',
    frontPsi: 28, rearPsi: 31, frontPsiLoad: 28, rearPsiLoad: 35,
    notes: 'Pneus aro 18" bias-ply. Com garupa ou carga traseira: aumente o traseiro para 35 PSI. Compatibilidade de pneus modernos: Pirelli MT66, Dunlop K555, Michelin Pilot Street em aro 18" e dimensões compatíveis. Calibre sempre com pneu frio.',
  },
  {
    modelName: 'CBX 250 TWISTER',
    yearFrom: 2001, yearTo: null,
    tireSize: '100/80-17 (F) · 130/70-17 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Pneus aro 17" radiais ou bias-ply. Com garupa: traseiro 36 PSI. Não ultrapasse 36 PSI no traseiro mesmo com carga. Pneus modernos de alta aderência para aro 17": Pirelli Angel City, Michelin Pilot Street 2, Metzeler Feelflex. Calibre sempre com pneu frio (3+ horas após uso).',
  },
  {
    modelName: 'CBX 750 FOUR',
    yearFrom: 1990, yearTo: null,
    tireSize: '100/90-18 (F) · 130/80-18 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Pneus bias-ply aro 18" (mesmo tamanho da CBX 750 R). Aplica-se ao FOUR e FOUR INDY. Pneus com mais de 6 anos: substitua independentemente do estado dos sulcos. Alternativas modernas compatíveis: Pirelli MT66, Dunlop K555, Metzeler ME77 em aro 18". Com garupa: traseiro 36 PSI. Calibre sempre com pneu frio.',
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// MAINTENANCE ITEMS
// ═══════════════════════════════════════════════════════════════════════════════

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // ── CBX 150 AERO ──────────────────────────────────────────────────────────
  { modelName: 'CBX 150 AERO', yearFrom: 1990, yearTo: null, component: 'Lubrificar corrente de transmissão (420)', intervalKm: 500, intervalMonths: null, notes: 'Spray de corrente ou óleo SAE 90. Verificar tensão (20–25 mm de folga) a cada 2.000 km.', priority: 'HIGH', order: 1 },
  { modelName: 'CBX 150 AERO', yearFrom: 1990, yearTo: null, component: 'Óleo motor (10W40 JASO MA, ~1,0 L com filtro)', intervalKm: 4000, intervalMonths: 6, notes: 'Motul 7100 4T, Shell Advance 4T ou Castrol Power1. Em motor vintage: não ultrapasse 4.000 km.', priority: 'HIGH', order: 2 },
  { modelName: 'CBX 150 AERO', yearFrom: 1990, yearTo: null, component: 'Filtro de ar (esponja de poliuretano) — limpeza', intervalKm: 3000, intervalMonths: null, notes: 'Lave com água e sabão, seque e aplique óleo fino antes de recolocar.', priority: 'MEDIUM', order: 3 },
  { modelName: 'CBX 150 AERO', yearFrom: 1990, yearTo: null, component: 'Vela NGK C7HSA — inspecionar', intervalKm: 6000, intervalMonths: null, notes: 'Gap 0,6–0,7 mm. Troca completa a cada 12.000 km.', priority: 'HIGH', order: 4 },
  { modelName: 'CBX 150 AERO', yearFrom: 1990, yearTo: null, component: 'Verificar tensão da corrente (420)', intervalKm: 2000, intervalMonths: null, notes: 'Folga ideal 20–25 mm no ponto mais folgado com 1 piloto na moto.', priority: 'MEDIUM', order: 5 },
  { modelName: 'CBX 150 AERO', yearFrom: 1990, yearTo: null, component: 'Filtro de ar — trocar esponja', intervalKm: 12000, intervalMonths: null, notes: 'Esponja ressecada ou rasgada = troca imediata. Custo: R$15–30.', priority: 'MEDIUM', order: 6 },
  { modelName: 'CBX 150 AERO', yearFrom: 1990, yearTo: null, component: 'Vela NGK C7HSA — trocar', intervalKm: 12000, intervalMonths: 24, notes: 'Gap 0,6–0,7 mm. Torque 12–15 N.m com arruela de cobre.', priority: 'HIGH', order: 7 },
  { modelName: 'CBX 150 AERO', yearFrom: 1990, yearTo: null, component: 'Ajuste de válvulas (adm 0,05–0,08 / esc 0,08–0,12 mm)', intervalKm: 12000, intervalMonths: 12, notes: 'Motor frio obrigatório. Válvulas fechadas (sem folga) = perda de compressão sem ruído.', priority: 'HIGH', order: 8 },
  { modelName: 'CBX 150 AERO', yearFrom: 1990, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Troca bienal independente da quilometragem. DOT 4 absorve umidade e perde ponto de ebulição.', priority: 'HIGH', order: 9 },
  { modelName: 'CBX 150 AERO', yearFrom: 1990, yearTo: null, component: 'Kit de relação (corrente 420 + pinhão + coroa)', intervalKm: 18000, intervalMonths: null, notes: 'Troque os 3 componentes juntos. Aftermarket 150cc Honda: R$120–200.', priority: 'HIGH', order: 10 },
  { modelName: 'CBX 150 AERO', yearFrom: 1990, yearTo: null, component: 'Verificar regulador/retificador (tensão carga 13,5–14,5 V)', intervalKm: null, intervalMonths: 12, notes: 'Multímetro nas bornes da bateria com motor em 3.000 rpm. Acima de 15 V = regulador defeituoso.', priority: 'HIGH', order: 11 },
  { modelName: 'CBX 150 AERO', yearFrom: 1990, yearTo: null, component: 'Rolamentos de roda (inspeção)', intervalKm: 20000, intervalMonths: null, notes: 'Gire a roda suspensa lentamente — crepitação ou resistência = substituição. Rolamentos universais (número gravado).', priority: 'MEDIUM', order: 12 },

  // ── CBX 200 STRADA ────────────────────────────────────────────────────────
  { modelName: 'CBX 200 STRADA', yearFrom: 1993, yearTo: null, component: 'Lubrificar corrente de transmissão (428)', intervalKm: 500, intervalMonths: null, notes: 'Spray de corrente o-ring/x-ring. Verificar tensão (20–30 mm de folga) a cada 2.000 km.', priority: 'HIGH', order: 1 },
  { modelName: 'CBX 200 STRADA', yearFrom: 1993, yearTo: null, component: 'Óleo motor (10W40 JASO MA, ~1,2 L com filtro)', intervalKm: 5000, intervalMonths: 6, notes: 'HifloFiltro HF111 ou K&N KN-111 junto a cada troca. Motor duravelmente SOHC.', priority: 'HIGH', order: 2 },
  { modelName: 'CBX 200 STRADA', yearFrom: 1993, yearTo: null, component: 'Filtro de ar — limpeza', intervalKm: 3000, intervalMonths: null, notes: 'Tipo esponja: lave, seque e aplique óleo fino antes de recolocar.', priority: 'MEDIUM', order: 3 },
  { modelName: 'CBX 200 STRADA', yearFrom: 1993, yearTo: null, component: 'Verificar tensão da corrente (428)', intervalKm: 2000, intervalMonths: null, notes: 'Folga ideal 20–30 mm. Tensão correta prolonga a vida da corrente e do mancal traseiro.', priority: 'MEDIUM', order: 4 },
  { modelName: 'CBX 200 STRADA', yearFrom: 1993, yearTo: null, component: 'Vela NGK D8EA — inspecionar', intervalKm: 6000, intervalMonths: null, notes: 'Gap 0,6–0,7 mm. Leitura da vela revela estado da carburação.', priority: 'HIGH', order: 5 },
  { modelName: 'CBX 200 STRADA', yearFrom: 1993, yearTo: null, component: 'Filtro de ar — trocar', intervalKm: 12000, intervalMonths: null, notes: 'Esponja ressecada ou rasgada: troca imediata.', priority: 'MEDIUM', order: 6 },
  { modelName: 'CBX 200 STRADA', yearFrom: 1993, yearTo: null, component: 'Vela NGK D8EA — trocar', intervalKm: 12000, intervalMonths: 24, notes: 'Gap 0,6–0,7 mm. Torque 18–20 N.m.', priority: 'HIGH', order: 7 },
  { modelName: 'CBX 200 STRADA', yearFrom: 1993, yearTo: null, component: 'Ajuste de válvulas (adm 0,05–0,08 / esc 0,10–0,12 mm)', intervalKm: 12000, intervalMonths: 12, notes: 'Motor frio. Válvulas fechadas silenciosamente causam perda de compressão sem ruído.', priority: 'HIGH', order: 8 },
  { modelName: 'CBX 200 STRADA', yearFrom: 1993, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Troca bienal. DOT 4 absorve umidade continuamente — vapor lock é risco real em freio velho.', priority: 'HIGH', order: 9 },
  { modelName: 'CBX 200 STRADA', yearFrom: 1993, yearTo: null, component: 'Kit de relação (corrente 428 + pinhão + coroa)', intervalKm: 20000, intervalMonths: null, notes: 'Troque os 3 componentes juntos. Aftermarket para Honda 200cc: R$150–280.', priority: 'HIGH', order: 10 },
  { modelName: 'CBX 200 STRADA', yearFrom: 1993, yearTo: null, component: 'Verificar regulador/retificador (tensão 13,5–14,5 V)', intervalKm: null, intervalMonths: 12, notes: 'Acima de 15 V = regulador defeituoso, troca antes de bateria nova.', priority: 'HIGH', order: 11 },
  { modelName: 'CBX 200 STRADA', yearFrom: 1993, yearTo: null, component: 'Pastilhas de freio dianteiro', intervalKm: 15000, intervalMonths: null, notes: 'Inspecione a cada troca de óleo. Abaixo de 1,5 mm = troca imediata.', priority: 'MEDIUM', order: 12 },
  { modelName: 'CBX 200 STRADA', yearFrom: 1993, yearTo: null, component: 'Óleo de garfo + retentores (bengala)', intervalKm: null, intervalMonths: 36, notes: 'Honda SS-8 10W ou equivalente, ~150–200 mL por perna. Mancha de óleo no tubo cromado = retentor vazando.', priority: 'MEDIUM', order: 13 },

  // ── CBX 250 TWISTER ───────────────────────────────────────────────────────
  { modelName: 'CBX 250 TWISTER', yearFrom: 2001, yearTo: null, component: 'Lubrificar corrente de transmissão (428)', intervalKm: 500, intervalMonths: null, notes: 'Spray de corrente x-ring/o-ring. NÃO use WD-40. Em alta velocidade, corrente seca é risco de ruptura.', priority: 'HIGH', order: 1 },
  { modelName: 'CBX 250 TWISTER', yearFrom: 2001, yearTo: null, component: 'Óleo motor (10W40 JASO MA, ~1,6 L com filtro)', intervalKm: 5000, intervalMonths: 6, notes: 'JASO MA/MA2 obrigatório para embreagem molhada. HifloFiltro HF111 ou K&N KN-111.', priority: 'HIGH', order: 2 },
  { modelName: 'CBX 250 TWISTER', yearFrom: 2001, yearTo: null, component: 'Verificar tensão da corrente (428)', intervalKm: 2000, intervalMonths: null, notes: 'Folga 20–30 mm no ponto mais folgado. Corrigir imediatamente — corrente frouxa pode sair da coroa.', priority: 'MEDIUM', order: 3 },
  { modelName: 'CBX 250 TWISTER', yearFrom: 2001, yearTo: null, component: 'Filtro de ar — limpeza ou troca', intervalKm: 6000, intervalMonths: null, notes: 'Elemento filtrante (papel ou espuma conforme versão). Filtro sujo reduz potência e aumenta consumo.', priority: 'MEDIUM', order: 4 },
  { modelName: 'CBX 250 TWISTER', yearFrom: 2001, yearTo: null, component: 'Pastilhas de freio dianteiro — inspecionar', intervalKm: 6000, intervalMonths: null, notes: 'EBC HH Sintered ou Ferodo FDB. Abaixo de 1,5 mm: troca imediata antes de danificar disco.', priority: 'MEDIUM', order: 5 },
  { modelName: 'CBX 250 TWISTER', yearFrom: 2001, yearTo: null, component: 'Vela NGK CR7E ou CPR7EA — troca', intervalKm: 10000, intervalMonths: null, notes: 'Gap 0,7–0,8 mm. Torque 18–20 N.m. Iridium CPR7EA dura até 20.000 km.', priority: 'HIGH', order: 6 },
  { modelName: 'CBX 250 TWISTER', yearFrom: 2001, yearTo: null, component: 'Filtro de ar — trocar', intervalKm: 10000, intervalMonths: null, notes: 'Troca completa do elemento. Filtro de ar limpo é pré-requisito para diagnóstico de carburação.', priority: 'MEDIUM', order: 7 },
  { modelName: 'CBX 250 TWISTER', yearFrom: 2001, yearTo: null, component: 'Ajuste de válvulas SOHC 4v (adm 0,10–0,15 / esc 0,15–0,20 mm)', intervalKm: 12000, intervalMonths: 12, notes: 'Shim-under-bucket — exige desmontagem do cabeçote para troca das pastilhas. Serviço especializado R$250–450.', priority: 'HIGH', order: 8 },
  { modelName: 'CBX 250 TWISTER', yearFrom: 2001, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Troca bienal. Sistema freio disco dianteiro + traseiro. Vapor lock = perda total de freio.', priority: 'HIGH', order: 9 },
  { modelName: 'CBX 250 TWISTER', yearFrom: 2001, yearTo: null, component: 'Kit de relação (corrente 428 + pinhão + coroa)', intervalKm: 20000, intervalMonths: null, notes: 'DID 428VX ou RK 428KRO + JT Sprockets. Corrente com lubrificação regular pode durar 25.000 km.', priority: 'HIGH', order: 10 },
  { modelName: 'CBX 250 TWISTER', yearFrom: 2001, yearTo: null, component: 'Verificar regulador/retificador (tensão 13,5–14,8 V)', intervalKm: null, intervalMonths: 12, notes: 'Antes de instalar bateria nova. Bateria YTX9-BS (12V 8Ah). Acima de 15 V = troque o regulador primeiro.', priority: 'HIGH', order: 11 },
  { modelName: 'CBX 250 TWISTER', yearFrom: 2001, yearTo: null, component: 'Inspecionar diafragma do carburador CV', intervalKm: null, intervalMonths: 24, notes: 'Tampa superior 4 parafusos, slide para cima, diafragma contra a luz. Furo = All Balls ou Keyster R$80–150.', priority: 'HIGH', order: 12 },
  { modelName: 'CBX 250 TWISTER', yearFrom: 2001, yearTo: null, component: 'Lona de freio traseiro (tambor)', intervalKm: 15000, intervalMonths: null, notes: 'Verifique o indicador de desgaste no tambor. Lona gasta ao metal = tambor riscado = custo maior.', priority: 'MEDIUM', order: 13 },
  { modelName: 'CBX 250 TWISTER', yearFrom: 2001, yearTo: null, component: 'Rolamentos de roda', intervalKm: 30000, intervalMonths: null, notes: 'Inspeção: gire a roda suspensa, palpe o cubo. Crepitação = substitua. Rolamentos universais por número gravado.', priority: 'MEDIUM', order: 14 },

  // ── CBX 750 FOUR / FOUR INDY ───────────────────────────────────────────────
  { modelName: 'CBX 750 FOUR', yearFrom: 1990, yearTo: null, component: 'Lubrificar corrente de transmissão (530)', intervalKm: 500, intervalMonths: null, notes: 'Spray de corrente x-ring/o-ring. Motor 747cc gera torque alto — corrente seca desgasta muito mais rápido.', priority: 'HIGH', order: 1 },
  { modelName: 'CBX 750 FOUR', yearFrom: 1990, yearTo: null, component: 'Óleo motor RC17E (10W-40 JASO MA, ~3,5 L com filtro)', intervalKm: 4000, intervalMonths: 6, notes: 'HifloFiltro HF204. Em motor vintage com 30+ anos: máximo 4.000 km. Motul 7100 4T, Honda HP4.', priority: 'CRITICAL', order: 2 },
  { modelName: 'CBX 750 FOUR', yearFrom: 1990, yearTo: null, component: 'Limpeza e sincronização dos 4 carburadores Keihin CV', intervalKm: 12000, intervalMonths: 12, notes: 'Vacuômetro 4 colunas. Diferença max 2–3 cmHg. Reconstruir carburadores ANTES de sincronizar.', priority: 'HIGH', order: 3 },
  { modelName: 'CBX 750 FOUR', yearFrom: 1990, yearTo: null, component: 'Regulagem de válvulas DOHC 16v (adm ~0,10 / esc ~0,15 mm)', intervalKm: 12000, intervalMonths: 12, notes: 'Motor completamente frio. Confirmar valores no manual RC17. Obrigatório ao reativar moto parada por anos.', priority: 'CRITICAL', order: 4 },
  { modelName: 'CBX 750 FOUR', yearFrom: 1990, yearTo: null, component: 'Velas NGK DR8ES-L — jogo de 4', intervalKm: 12000, intervalMonths: 24, notes: 'Gap 0,6–0,7 mm. Torque 18–20 N.m. Substitua as 4 antes de reativar moto longa parada.', priority: 'HIGH', order: 5 },
  { modelName: 'CBX 750 FOUR', yearFrom: 1990, yearTo: null, component: 'Verificar tensão da corrente (530)', intervalKm: 2000, intervalMonths: null, notes: 'Folga adequada no manual RC17. Corrente enferrujada = troca imediata.', priority: 'MEDIUM', order: 6 },
  { modelName: 'CBX 750 FOUR', yearFrom: 1990, yearTo: null, component: 'Kit de transmissão (corrente 530 + coroa + pinhão)', intervalKm: 18000, intervalMonths: null, notes: 'DID 530VX3 ou RK 530GXW + JT Sprockets. OEM descontinuado. Troque os 3 juntos.', priority: 'HIGH', order: 7 },
  { modelName: 'CBX 750 FOUR', yearFrom: 1990, yearTo: null, component: 'Fluido de freio DOT 4 (dianteiro + traseiro)', intervalKm: null, intervalMonths: 24, notes: 'Vapor lock = perda total de freio. Troca obrigatória em moto de coleção retomando uso.', priority: 'HIGH', order: 8 },
  { modelName: 'CBX 750 FOUR', yearFrom: 1990, yearTo: null, component: 'Pastilhas de freio (2 pinças dianteiras + pinça traseira)', intervalKm: 8000, intervalMonths: null, notes: 'EBC HH Sintered para Honda RC17. Pistões das pinças: verifique oxidação — pistão travado = disco aquece.', priority: 'HIGH', order: 9 },
  { modelName: 'CBX 750 FOUR', yearFrom: 1990, yearTo: null, component: 'Diafragmas dos 4 carburadores Keihin CV', intervalKm: null, intervalMonths: null, notes: 'Borracha de 30 anos inevitavelmente furada. Inspecione ANTES de qualquer outro diagnóstico de carburador.', priority: 'CRITICAL', order: 10 },
  { modelName: 'CBX 750 FOUR', yearFrom: 1990, yearTo: null, component: 'Mangueiras de combustível e vácuo — substituir por silicone', intervalKm: null, intervalMonths: 60, notes: 'Borracha de 30 anos = risco de incêndio. Silicone Ø5–8 mm. Inclui membrana do petcock.', priority: 'CRITICAL', order: 11 },
  { modelName: 'CBX 750 FOUR', yearFrom: 1990, yearTo: null, component: 'Regulador/retificador + estátor (verificar tensão)', intervalKm: 6000, intervalMonths: 12, notes: 'Tensão correta: 13,8–14,8 V a 4.000 rpm. Substituir SCRI por MOSFET (Shindengen SH847). Estátor: 0,5–1,5 Ohm/fase.', priority: 'HIGH', order: 12 },
  { modelName: 'CBX 750 FOUR', yearFrom: 1990, yearTo: null, component: 'Filtro de combustível inline', intervalKm: 12000, intervalMonths: 12, notes: 'Universal Ø6 mm (R$15–30). Obrigatório após tratar ferrugem do tanque. 4 carbs = 4× mais sensível a entupimento.', priority: 'HIGH', order: 13 },
  { modelName: 'CBX 750 FOUR', yearFrom: 1990, yearTo: null, component: 'Tensor da corrente de comando (timing chain)', intervalKm: 24000, intervalMonths: 24, notes: 'Ruído "tatatata" a frio = tensor desgastado. Falha = válvulas colidem com pistões. Emergência.', priority: 'HIGH', order: 14 },
  { modelName: 'CBX 750 FOUR', yearFrom: 1990, yearTo: null, component: 'Óleo de garfo + retentores', intervalKm: null, intervalMonths: 36, notes: 'Honda SS-8 10W ou Motul Fork Oil 10W. Mancha de óleo no tubo cromado = retentor vazando. Kit universal por diâmetro.', priority: 'MEDIUM', order: 15 },
]

// ═══════════════════════════════════════════════════════════════════════════════
// Runner
// ═══════════════════════════════════════════════════════════════════════════════

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
      ...block.MANUTENCAO.map(t => ({ ...t, category: 'MANUTENCAO' as Cat })),
    ]

    await prisma.tip.deleteMany({ where: { modelName: block.modelName } })
    await prisma.tip.createMany({
      data: allTips.map((tip, i) => ({
        modelName: block.modelName,
        yearFrom:  null,
        yearTo:    null,
        severity: tip.severity,
        category: tip.category,
        title: tip.title,
        body: tip.body,
        order: i,
      })),
    })

    console.log(`✅ ${block.modelName}: ${allTips.length} tips`)
  }

  // TirePressures
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName } })
    await prisma.tirePressure.create({ data: tp })
    console.log(`🔵 TirePressure: ${tp.modelName}`)
  }

  // MaintenanceItems
  const modelNames = BLOCKS.map(b => b.modelName)
  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: modelNames } } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
