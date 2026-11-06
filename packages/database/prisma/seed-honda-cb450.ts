// seed-honda-cb450.ts — Honda CB 400 / CB 450 DX / CBR 450 SR — clássicas brasileiras
// CB 400 (1980-1984) | CB 450 DX (1984-1994) | CBR 450 SR (1989-1994)
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

// ─── Honda CB 400 (1980–1984) — 395cc SOHC 3 válvulas, 2 carburadores ────────
const CB400_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA2 — câmbio integrado exige JASO MA',
    body: 'Use óleo 10W-40 JASO MA2 (ou JASO MA). Nunca use JASO MB — é exclusivo para scooters CVT. Capacidade: 2,2 L na troca normal, 2,3 L trocando o filtro também, 3,0 L motor a seco. Troque a cada 3.000–5.000 km. Em motos clássicas com desgaste interno maior, prefira o intervalo menor de 3.000 km.',
  },
  {
    severity: 'OK',
    title: 'Motor SOHC 395 cc com 3 válvulas por cilindro — projeto robusto',
    body: 'O motor da CB 400 usa 3 válvulas por cilindro (2 de admissão, 1 de escapamento), layout eficiente para a época. Verifique a folga das válvulas com motor frio: admissão 0,10 mm / escapamento 0,14 mm. Esse motor dura muito quando o óleo é trocado em dia.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK D8ES-L — gap 0,60–0,70 mm',
    body: 'Vela original: NGK D8ES-L (gap 0,6–0,7 mm). A CB 400 tem 2 cilindros e portanto 2 velas — troque ambas sempre juntas. Troque a cada 8.000–10.000 km ou ao notar dificuldade de partida e marcha lenta irregular. Verifique o gap com calibrador lâmina.',
  },
  {
    severity: 'OK',
    title: 'Dois carburadores — sincronismo é a chave do bom funcionamento',
    body: 'A CB 400 tem um carburador por cilindro (2 ao total). Quando fora de sincronia, a moto trepida, consome mais e perde potência. O sincronismo deve ser verificado a cada 6.000 km com manômetro de vácuo. Se não tiver o equipamento, leve a uma oficina especializada em clássicos — não tente pelo "ouvido" sem experiência.',
  },
  {
    severity: 'OK',
    title: 'Ignição: pontos (1980-1981) x CDI (1982+) — manutenção diferente',
    body: 'Os primeiros CB 400 (1980–1981) usam ignição a pontos (platinadas). A partir de 1982, passaram para CDI eletrônico. Se a sua moto tem platinadas: inspecione e regule a cada 3.000 km, substitua se o desgaste for visível. Com CDI eletrônico, não há manutenção de ignição além de checar o cabo de vela.',
  },
  {
    severity: 'OK',
    title: 'Tanque 14 L (+ 3,5 L de reserva) — torneira com três posições',
    body: 'A torneira de combustível tem posição PRI (prime), ON e RES (reserva de 3,5 L). Em caso de emergência, use PRI apenas para dar partida com tanque vazio — não pilote em PRI. Ao sentir variação de potência, mude para RES e abasteça logo. Não esgote o tanque — sedimentos entopem os jatos dos carburadores.',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão — lubrifique a cada 500 km',
    body: 'A CB 400 usa corrente de transmissão (não identificada a bitola exata — verificar na plaqueta da corrente). Lubrifique com spray de corrente fechada a cada 500 km ou após chuva. Tensão ideal: folga de 20–30 mm no trecho inferior. Troque corrente + coroa + pinhão sempre em conjunto.',
  },
  {
    severity: 'OK',
    title: 'Peças compartilhadas com a CB 450 DX — facilita manutenção',
    body: 'Várias peças da CB 400 são compartilhadas com a CB 450 DX: filtro de óleo, pastilhas e buchas de freio, alguns componentes elétricos, cabos e itens de carburador. Ao buscar peças, verifique compatibilidade com a CB 450 — aumenta as chances de encontrar o item, especialmente em desmanches.',
  },
]

const CB400_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Retificador de voltagem: falha elétrica crônica',
    body: 'O regulador/retificador de voltagem original é o ponto elétrico mais fraco da CB 400. Quando falha, a bateria não carrega e a moto apaga em movimento. Sintoma: bateria nova que descarrega em poucos dias. Alternativo compatível: Solidez ou Magnetron para CB 400/CB 450 (R$80–150). Verifique a tensão em marcha: deve ser 13,5–14,5 V.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico envelhecido — cabos ressecados e conexões oxidadas',
    body: 'Em motos com mais de 30 anos, o isolamento dos cabos elétricos resseca, trica e causa curto-circuitos. Sintomas: falha de ignição intermitente, luz piscando, fusíveis queimando sem causa aparente. Inspecione o chicote elétrico completo ao comprar uma CB 400 usada. Substitua preventivamente os cabos que estiverem endurecidos ou trincados.',
  },
  {
    severity: 'WARN',
    title: 'Carburador entupido por combustível ressequido',
    body: 'Com mais de 3 semanas parada, a gasolina nos carburadores resseca e entope os jatos. Em motos com 30+ anos, os diafragmas dos carburadores costumam estar ressecados e rachados (perda de aceleração progressiva). Verifique o estado dos diafragmas na próxima revisão. A limpeza ultrassônica dos jatos resolve entupimentos; diafragma rasgado exige substituição.',
  },
  {
    severity: 'WARN',
    title: 'Peças cada vez mais raras — moto sai de linha em 1984',
    body: 'A CB 400 saiu de produção em 1984, há mais de 40 anos. Peças originais são raras e caras. Priorize desmanches especializados em Honda clássica e a comunidade "Grupo CB Brasil". Algumas peças da CB 450 DX são compatíveis. Antes de comprar uma CB 400 usada, verifique a disponibilidade das peças específicas do seu modelo.',
  },
  {
    severity: 'WARN',
    title: 'Junta do cabeçote vazando em motores com muita quilometragem',
    body: 'Após 40.000–60.000 km, a junta do cabeçote da CB 400 pode começar a vazar, especialmente se a moto passou por superaquecimentos. Sintomas: fumaça azul ou branca, nível de óleo baixando sem vazamento visível externo, óleo com aspecto leitoso. Substituição da junta exige desmontagem do motor — custo moderado em oficina especializada.',
  },
]

// ─── Honda CB 450 DX (1984–1994) — 447cc SOHC 3 válvulas, evolução da CB 400 ─
const CB450_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA2 — mesma especificação da CB 400',
    body: 'Use 10W-40 JASO MA2. A capacidade é ligeiramente maior que a CB 400: ~2,5 L com filtro. Troque a cada 3.000 km — em motos clássicas com desgaste interno, intervalos curtos preservam o motor. Verifique o visor de nível antes de cada saída.',
  },
  {
    severity: 'OK',
    title: 'Motor 447cc — mesma arquitetura SOHC da CB 400, mas +52 cc mais potência',
    body: 'O motor da CB 450 DX é uma evolução direta da CB 400: SOHC, 3 válvulas por cilindro, 2 carburadores, mas com 447 cc (+52cc) e 43 cv a 8.500 rpm. Folga de válvulas (motor frio): admissão 0,10 mm / escapamento 0,15 mm. A manutenção é muito similar à CB 400.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK D8EA — gap 0,60–0,70 mm',
    body: 'Vela recomendada: NGK D8EA (gap 0,6–0,7 mm). Dois cilindros = duas velas. Troque ambas sempre juntas a cada 8.000–10.000 km. Em motos mais velhas com desgaste de anéis, a vela pode carbonizar mais rápido — inspecione a cada 5.000 km.',
  },
  {
    severity: 'OK',
    title: 'Dois carburadores — sincronismo essencial como na CB 400',
    body: 'A CB 450 DX também usa 2 carburadores (um por cilindro). Sincronismo desregulado causa vibração, consumo alto e perda de potência. Verifique a cada 6.000 km. O parafuso de regulagem da marcha lenta ideal: 1.200–1.400 rpm. Ao desligar a moto por mais de 2 semanas, feche a torneira de combustível para proteger os carburadores.',
  },
  {
    severity: 'OK',
    title: 'CB 450 DX vs TR: diferenças mínimas para a manutenção',
    body: 'O modelo CB 450 TR (1987) foi rebatizado CB 450 DX em 1988. As diferenças são cosméticas (cores, adesivos, instrumentos). Mecanicamente, são idênticos. Manuais e peças são intercambiáveis. O motor, suspensão e sistema elétrico seguem a mesma especificação do início ao fim da produção (1984–1994).',
  },
  {
    severity: 'OK',
    title: 'Calibragem: 26/29 PSI (solo) · 28/33 PSI (com carga)',
    body: 'Pneus 90/90-19 (dianteiro) e 110/90-18 (traseiro). Solo: dianteiro 26 PSI, traseiro 29 PSI. Com garupa ou carga: dianteiro 28 PSI, traseiro 33 PSI. Verifique sempre com pneu frio. Pneus com câmara (tube-type) — verifique a válvula quanto a vazamentos antes de calibrar.',
  },
]

const CB450_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Retificador de voltagem: mesmo problema crônico da CB 400',
    body: 'O regulador/retificador falha progressivamente na CB 450 DX. Alternativo compatível: Solidez CB 400/CB 450 (R$80–150). Verifique com multímetro: tensão em marcha deve estar entre 13,5 e 14,5 V. Acima de 15 V, o retificador está sobrecarregando a bateria; abaixo de 13 V, não está carregando. Substitua preventivamente se a moto tiver mais de 40.000 km ou 10 anos sem troca.',
  },
  {
    severity: 'WARN',
    title: 'Bengalas dianteiras com vazamento de óleo',
    body: 'Os retentores das bengalas da CB 450 DX envelhecem e passam a vazar óleo. Em motos com 30+ anos, isso é praticamente certo se nunca houve troca dos retentores. O óleo escorrendo sobre o disco de freio é risco imediato de segurança. Kit de retentores é relativamente barato (R$60–100); o serviço exige desmontagem das bengalas.',
  },
  {
    severity: 'WARN',
    title: 'Freios com pinças e pistões travados',
    body: 'Em motos paradas por muito tempo, os pistões das pinças de freio e o pistão do cilindro mestre gripam por oxidação. Ao comprar uma CB 450 DX usada, teste os freios com cuidado — inspecione se a moto freia igualmente nos dois discos dianteiros. A revisão das pinças (limpeza + lubrificação do pistão) é simples, mas ignorada com frequência.',
  },
  {
    severity: 'WARN',
    title: 'Peças cada vez mais difíceis de encontrar',
    body: 'A CB 450 DX saiu de produção em 1994. Algumas peças ainda têm boa disponibilidade (elétrica alternativa, filtro de óleo, velas), mas componentes específicos como carburador original, pistão e biela são raros. Comunidade "CB Brasil" (cbbrasil.com.br) é a principal referência para localizar peças e mecânicos especializados.',
  },
  {
    severity: 'WARN',
    title: 'Corrente de distribuição — ruído de cascata indica desgaste',
    body: 'O barulho de "cascata" ao acelerar indica corrente de distribuição esticada. Em motos com 40.000+ km sem histórico de troca, verifique a corrente e o tensor. A substituição exige abertura do motor — custo mais elevado, mas essencial para evitar dano severo se a corrente pular de passo.',
  },
]

// ─── Honda CBR 450 SR (1989–1994) — 447cc SOHC 53 cv, 100% brasileira ────────
const CBR450_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Primeira moto esportiva 100% brasileira — desenvolvimento Honda Manaus',
    body: 'A CBR 450 SR foi projetada inteiramente pelos engenheiros da Honda em Manaus e vendida exclusivamente no Brasil. Baseada no motor da CB 450 DX (447 cc SOHC), recebeu dutos de admissão e exaustão melhorados, alcançando 53 cv vs. 43 cv da CB 450 DX — ganho de 23% de potência sem mudar a cilindrada.',
  },
  {
    severity: 'OK',
    title: 'Tensor automático de corrente — vantagem sobre CB 400 e CB 450 DX',
    body: 'A CBR 450 SR foi a primeira da família a ter tensor automático da corrente de distribuição. Isso elimina o ajuste manual periódico necessário nas CB 400 e CB 450 DX. Ainda assim, monitore o barulho do motor: ruído de "cascata" indica tensor desgastado, mesmo sendo automático.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA2 — mesma especificação da família CB',
    body: 'Use 10W-40 JASO MA2. Motor com câmbio integrado — nunca use JASO MB. Troque a cada 3.000 km. Capacidade: ~2,5 L com filtro. O motor de 53 cv é mais exigido que o da CB 450 DX; intervalos curtos de óleo são especialmente importantes.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK D8EA — gap 0,60–0,70 mm',
    body: 'Mesma vela da CB 450 DX: NGK D8EA (gap 0,6–0,7 mm). Dois cilindros = duas velas. O motor mais potente da CBR 450 SR trabalha com temperaturas ligeiramente mais altas — troque as velas a cada 8.000 km para manter desempenho máximo.',
  },
  {
    severity: 'OK',
    title: 'Pneus esportivos 100/80-17 (F) · 130/70-17 (R) — perfil mais baixo',
    body: 'A CBR 450 SR usa pneus com aro 17" (diferentes da CB 400/450 com aro 18/19"). Pneus originais Pirelli MT 75. Calibragem (frio): solo — dianteiro 33 PSI, traseiro 36 PSI; com garupa — dianteiro 33 PSI, traseiro 41 PSI. O perfil mais baixo e esportivo exige calibragem mais alta que a CB 450 DX.',
  },
  {
    severity: 'OK',
    title: 'Suspensão Pro-Link traseira — mais eficiente que a convencional da CB 450 DX',
    body: 'A CBR 450 SR usa suspensão traseira monoamortecedor com Pro-Link (progressivo), herdada das CBR japonesas. É mais eficiente que os dois amortecedores convencionais da CB 450 DX. Verifique o amortecedor central quanto a vazamentos a cada 20.000 km. Peça de substituição: procure em desmanches de CBR 450 SR ou adapte amortecedores universais de mesma medida.',
  },
]

const CBR450_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Retificador de voltagem: mesma vulnerabilidade da família CB',
    body: 'O retificador de voltagem da CBR 450 SR apresenta o mesmo histórico de falha da CB 400 e CB 450 DX. Alternativo: Magnetron ou Solidez compatíveis (R$80–180). Monitore a tensão em marcha: 13,5–14,5 V é a faixa saudável. Ao notar bateria descarregando inexplicavelmente, priorize o diagnóstico do retificador antes de trocar a bateria.',
  },
  {
    severity: 'WARN',
    title: 'Peças extremamente raras — produção encerrada há 30+ anos',
    body: 'A CBR 450 SR foi produzida exclusivamente para o Brasil e saiu de linha em 1994. Peças exclusivas do modelo (carenagem, instrumentos, sistema Pro-Link) são cada vez mais raras. Partes mecânicas compartilhadas com a CB 450 DX (motor, filtros, velas, corrente) ainda têm disponibilidade razoável. Comunidade "Honda CBR Brasil" (hondacbrbrasil.forumeiros.com) centraliza informações sobre peças alternativas.',
  },
  {
    severity: 'WARN',
    title: 'Carenagem: plásticos velhos e frágeis — cuidado ao desmontar',
    body: 'As carenagens originais da CBR 450 SR têm mais de 30 anos e os plásticos ficam quebradiços com o tempo, especialmente nas bordas e pontos de fixação. Ao desmontar para manutenção, use calor suave (soprador térmico) nos parafusos que estiverem emperrados. Substituição de carenagem original é praticamente impossível — cuide bem da que tem.',
  },
  {
    severity: 'WARN',
    title: 'Sistema de freios com pinças e cilindros gripados',
    body: 'Igual às CB 450 DX: pinças de freio e cilindro mestre gripam por oxidação em motos que ficaram paradas. Inspecione e revise o sistema de freios completo (dianteiro e traseiro) antes de pilotar qualquer CBR 450 SR adquirida sem histórico de manutenção recente.',
  },
]

// ─── Manutenção CB 400 ────────────────────────────────────────────────────────
const CB400_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CB 400', yearFrom: 1980, yearTo: 1984, component: 'Troca de óleo (10W-40 JASO MA2)', intervalKm: 3000, intervalMonths: 12, notes: 'Capacidade: 2,2 L (troca), 2,3 L com filtro, 3,0 L motor seco', priority: 'CRITICAL', order: 1 },
  { modelName: 'CB 400', yearFrom: 1980, yearTo: 1984, component: 'Filtro de óleo', intervalKm: 3000, intervalMonths: 12, notes: 'Trocar junto com o óleo em cada revisão', priority: 'HIGH', order: 2 },
  { modelName: 'CB 400', yearFrom: 1980, yearTo: 1984, component: 'Vela de ignição (NGK D8ES-L)', intervalKm: 8000, intervalMonths: 24, notes: '2 velas — trocar ambas juntas. Gap: 0,60–0,70 mm', priority: 'HIGH', order: 3 },
  { modelName: 'CB 400', yearFrom: 1980, yearTo: 1984, component: 'Platinadas (ignição a pontos — modelos 1980-1981)', intervalKm: 3000, intervalMonths: 12, notes: 'Somente para CB 400 1980–1981 com ignição a pontos. Ajustar folga: 0,3–0,4 mm', priority: 'HIGH', order: 4 },
  { modelName: 'CB 400', yearFrom: 1980, yearTo: 1984, component: 'Sincronismo dos dois carburadores', intervalKm: 6000, intervalMonths: 12, notes: 'Usar manômetro de vácuo. Marcha lenta: 1.200–1.400 rpm', priority: 'HIGH', order: 5 },
  { modelName: 'CB 400', yearFrom: 1980, yearTo: 1984, component: 'Filtro de ar', intervalKm: 10000, intervalMonths: 12, notes: 'Limpar / inspecionar. Substituir se danificado', priority: 'MEDIUM', order: 6 },
  { modelName: 'CB 400', yearFrom: 1980, yearTo: 1984, component: 'Folga das válvulas (IN: 0,10 mm / EX: 0,14 mm)', intervalKm: 10000, intervalMonths: 24, notes: 'Verificar com motor frio. 3 válvulas por cilindro (2 admissão, 1 escape)', priority: 'HIGH', order: 7 },
  { modelName: 'CB 400', yearFrom: 1980, yearTo: 1984, component: 'Tensão e lubrificação da corrente de transmissão', intervalKm: 500, intervalMonths: null, notes: 'Folga ideal: 20–30 mm. Lubrificar com spray de corrente fechada', priority: 'MEDIUM', order: 8 },
  { modelName: 'CB 400', yearFrom: 1980, yearTo: 1984, component: 'Conjunto corrente + coroa + pinhão', intervalKm: 20000, intervalMonths: null, notes: 'Substituir sempre em conjunto', priority: 'HIGH', order: 9 },
  { modelName: 'CB 400', yearFrom: 1980, yearTo: 1984, component: 'Fluido de freio (DOT 3 ou DOT 4)', intervalKm: null, intervalMonths: 24, notes: 'Trocar a cada 2 anos — absorve umidade. Verificar nível mensalmente', priority: 'HIGH', order: 10 },
  { modelName: 'CB 400', yearFrom: 1980, yearTo: 1984, component: 'Retificador de voltagem', intervalKm: null, intervalMonths: 60, notes: 'Verificar tensão em marcha: 13,5–14,5 V. Componente de falha crônica', priority: 'CRITICAL', order: 11 },
  { modelName: 'CB 400', yearFrom: 1980, yearTo: 1984, component: 'Chicote elétrico — inspecionar isolamentos', intervalKm: null, intervalMonths: 24, notes: 'Verificar ressecamento e trincas na borracha dos cabos. Substituir cabos comprometidos', priority: 'HIGH', order: 12 },
  { modelName: 'CB 400', yearFrom: 1980, yearTo: 1984, component: 'Calibragem dos pneus', intervalKm: null, intervalMonths: null, notes: 'Solo: D 26 / T 29 PSI. Com carga: D 28 / T 33 PSI. Pneus com câmara — verificar válvula', priority: 'HIGH', order: 13 },
]

// ─── Manutenção CB 450 DX ─────────────────────────────────────────────────────
const CB450_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CB 450 DX', yearFrom: 1984, yearTo: 1994, component: 'Troca de óleo (10W-40 JASO MA2)', intervalKm: 3000, intervalMonths: 12, notes: 'Capacidade: ~2,5 L com filtro. Usar intervalos curtos em motos com desgaste interno', priority: 'CRITICAL', order: 1 },
  { modelName: 'CB 450 DX', yearFrom: 1984, yearTo: 1994, component: 'Filtro de óleo', intervalKm: 3000, intervalMonths: 12, notes: 'Trocar junto com o óleo. Compatível com filtros CB 400 (verificar referência)', priority: 'HIGH', order: 2 },
  { modelName: 'CB 450 DX', yearFrom: 1984, yearTo: 1994, component: 'Vela de ignição (NGK D8EA)', intervalKm: 8000, intervalMonths: 24, notes: '2 velas — trocar ambas juntas. Gap: 0,60–0,70 mm', priority: 'HIGH', order: 3 },
  { modelName: 'CB 450 DX', yearFrom: 1984, yearTo: 1994, component: 'Sincronismo dos dois carburadores', intervalKm: 6000, intervalMonths: 12, notes: 'Usar manômetro de vácuo. Marcha lenta: 1.200–1.400 rpm', priority: 'HIGH', order: 4 },
  { modelName: 'CB 450 DX', yearFrom: 1984, yearTo: 1994, component: 'Filtro de ar', intervalKm: 10000, intervalMonths: 12, notes: 'Limpar / inspecionar. Substituir se danificado', priority: 'MEDIUM', order: 5 },
  { modelName: 'CB 450 DX', yearFrom: 1984, yearTo: 1994, component: 'Folga das válvulas (IN: 0,10 mm / EX: 0,15 mm)', intervalKm: 10000, intervalMonths: 24, notes: 'Motor frio. SOHC 3 válvulas/cilindro (mesma arquitetura CB 400, folga escape +0,01 mm)', priority: 'HIGH', order: 6 },
  { modelName: 'CB 450 DX', yearFrom: 1984, yearTo: 1994, component: 'Tensor da corrente de distribuição (manual)', intervalKm: 10000, intervalMonths: 24, notes: 'Sem tensor automático — verificar e ajustar manualmente. Ruído de cascata = tensor frouxo', priority: 'HIGH', order: 7 },
  { modelName: 'CB 450 DX', yearFrom: 1984, yearTo: 1994, component: 'Tensão e lubrificação da corrente de transmissão', intervalKm: 500, intervalMonths: null, notes: 'Folga: 20–30 mm. Lubrificar a cada 500 km ou após chuva', priority: 'MEDIUM', order: 8 },
  { modelName: 'CB 450 DX', yearFrom: 1984, yearTo: 1994, component: 'Conjunto corrente + coroa + pinhão', intervalKm: 20000, intervalMonths: null, notes: 'Substituir sempre em conjunto', priority: 'HIGH', order: 9 },
  { modelName: 'CB 450 DX', yearFrom: 1984, yearTo: 1994, component: 'Retentores das bengalas', intervalKm: null, intervalMonths: 48, notes: 'Inspecionar manchas de óleo na haste. Substituir kit se vazar — risco de óleo no disco', priority: 'HIGH', order: 10 },
  { modelName: 'CB 450 DX', yearFrom: 1984, yearTo: 1994, component: 'Revisão das pinças de freio', intervalKm: 20000, intervalMonths: 24, notes: 'Verificar pistão travado por oxidação. Limpar + lubrificar com graxa de silicone', priority: 'HIGH', order: 11 },
  { modelName: 'CB 450 DX', yearFrom: 1984, yearTo: 1994, component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, notes: 'Trocar a cada 2 anos. Dois discos dianteiros + freio traseiro', priority: 'HIGH', order: 12 },
  { modelName: 'CB 450 DX', yearFrom: 1984, yearTo: 1994, component: 'Retificador de voltagem', intervalKm: null, intervalMonths: 60, notes: 'Verificar tensão em marcha: 13,5–14,5 V. Substituir com Solidez ou Magnetron se fora do range', priority: 'CRITICAL', order: 13 },
  { modelName: 'CB 450 DX', yearFrom: 1984, yearTo: 1994, component: 'Calibragem dos pneus', intervalKm: null, intervalMonths: null, notes: 'Solo: D 26 / T 29 PSI. Com carga: D 28 / T 33 PSI. Pneus com câmara — verificar válvula', priority: 'HIGH', order: 14 },
]

// ─── Manutenção CBR 450 SR ────────────────────────────────────────────────────
const CBR450SR_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'CBR 450 SR', yearFrom: 1989, yearTo: 1994, component: 'Troca de óleo (10W-40 JASO MA2)', intervalKm: 3000, intervalMonths: 12, notes: 'Motor de 53 cv trabalhado — prefira intervalo curto de 3.000 km. ~2,5 L com filtro', priority: 'CRITICAL', order: 1 },
  { modelName: 'CBR 450 SR', yearFrom: 1989, yearTo: 1994, component: 'Filtro de óleo', intervalKm: 3000, intervalMonths: 12, notes: 'Trocar junto com o óleo em cada revisão', priority: 'HIGH', order: 2 },
  { modelName: 'CBR 450 SR', yearFrom: 1989, yearTo: 1994, component: 'Vela de ignição (NGK D8EA)', intervalKm: 8000, intervalMonths: 24, notes: '2 velas — trocar ambas juntas. Gap: 0,60–0,70 mm', priority: 'HIGH', order: 3 },
  { modelName: 'CBR 450 SR', yearFrom: 1989, yearTo: 1994, component: 'Sincronismo dos dois carburadores', intervalKm: 6000, intervalMonths: 12, notes: 'Manômetro de vácuo. Motor mais potente — sincronismo mal regulado piora mais o desempenho', priority: 'HIGH', order: 4 },
  { modelName: 'CBR 450 SR', yearFrom: 1989, yearTo: 1994, component: 'Filtro de ar', intervalKm: 10000, intervalMonths: 12, notes: 'Trocar / limpar. Dutos de admissão melhorados exigem filtro limpo para máxima eficiência', priority: 'MEDIUM', order: 5 },
  { modelName: 'CBR 450 SR', yearFrom: 1989, yearTo: 1994, component: 'Folga das válvulas (IN: 0,10 mm / EX: 0,15 mm)', intervalKm: 10000, intervalMonths: 24, notes: 'Motor frio. SOHC 3 válvulas/cilindro — mesma spec da CB 450 DX', priority: 'HIGH', order: 6 },
  { modelName: 'CBR 450 SR', yearFrom: 1989, yearTo: 1994, component: 'Tensor automático da corrente de distribuição', intervalKm: 20000, intervalMonths: null, notes: 'Tensor automático (diferencial vs CB 400/450 DX). Verificar se não há ruído de cascata — tensor pode desgastar', priority: 'MEDIUM', order: 7 },
  { modelName: 'CBR 450 SR', yearFrom: 1989, yearTo: 1994, component: 'Tensão e lubrificação da corrente de transmissão', intervalKm: 500, intervalMonths: null, notes: 'Folga: 20–30 mm. Lubrificar a cada 500 km ou após chuva', priority: 'MEDIUM', order: 8 },
  { modelName: 'CBR 450 SR', yearFrom: 1989, yearTo: 1994, component: 'Conjunto corrente + coroa + pinhão', intervalKm: 20000, intervalMonths: null, notes: 'Substituir sempre em conjunto', priority: 'HIGH', order: 9 },
  { modelName: 'CBR 450 SR', yearFrom: 1989, yearTo: 1994, component: 'Amortecedor Pro-Link traseiro', intervalKm: 20000, intervalMonths: null, notes: 'Verificar vazamento de óleo. Peça rara — preservar', priority: 'MEDIUM', order: 10 },
  { modelName: 'CBR 450 SR', yearFrom: 1989, yearTo: 1994, component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, notes: 'Trocar a cada 2 anos. Frente e traseira', priority: 'HIGH', order: 11 },
  { modelName: 'CBR 450 SR', yearFrom: 1989, yearTo: 1994, component: 'Retificador de voltagem', intervalKm: null, intervalMonths: 60, notes: 'Verificar tensão em marcha: 13,5–14,5 V. Magnetron ou Solidez como alternativo', priority: 'CRITICAL', order: 12 },
  { modelName: 'CBR 450 SR', yearFrom: 1989, yearTo: 1994, component: 'Calibragem dos pneus (100/80-17 F · 130/70-17 R)', intervalKm: null, intervalMonths: null, notes: 'Solo: D 33 / T 36 PSI. Com garupa: D 33 / T 41 PSI. Verificar sempre com pneu frio', priority: 'HIGH', order: 13 },
]

// ─── Estrutura geral ──────────────────────────────────────────────────────────
const BLOCKS = [
  { modelName: 'CB 400',    yearFrom: 1980, yearTo: 1984, MACETES: CB400_MACETES,   PROBLEMAS: CB400_PROBLEMAS   },
  { modelName: 'CB 450 DX', yearFrom: 1984, yearTo: 1994, MACETES: CB450_MACETES,   PROBLEMAS: CB450_PROBLEMAS   },
  { modelName: 'CBR 450 SR', yearFrom: 1989, yearTo: 1994, MACETES: CBR450_MACETES, PROBLEMAS: CBR450_PROBLEMAS  },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  ...CB400_MANUTENCAO,
  ...CB450_MANUTENCAO,
  ...CBR450SR_MANUTENCAO,
]

const TIRE_PRESSURES = [
  {
    modelName: 'CB 400',
    yearFrom: 1980, yearTo: 1984,
    tireSize: '90/90-19 (F) · 110/90-18 (R)',
    frontPsi: 26, rearPsi: 29,
    frontPsiLoad: 28, rearPsiLoad: 33,
    notes: 'Pneus com câmara (tube-type). Verificar a válvula antes de calibrar. Verificar sempre com pneu frio.',
  },
  {
    modelName: 'CB 450 DX',
    yearFrom: 1984, yearTo: 1994,
    tireSize: '90/90-19 (F) · 110/90-18 (R)',
    frontPsi: 26, rearPsi: 29,
    frontPsiLoad: 28, rearPsiLoad: 33,
    notes: 'Pneus com câmara (tube-type). Verificar a válvula antes de calibrar. Verificar sempre com pneu frio.',
  },
  {
    modelName: 'CBR 450 SR',
    yearFrom: 1989, yearTo: 1994,
    tireSize: '100/80-17 (F) · 130/70-17 (R)',
    frontPsi: 33, rearPsi: 36,
    frontPsiLoad: 33, rearPsiLoad: 41,
    notes: 'Pneus esportivos aro 17" (diferente da CB 400/450 DX com aro 18/19"). Pneus originais Pirelli MT 75. Verificar sempre com pneu frio.',
  },
]

// ─── Main ─────────────────────────────────────────────────────────────────────
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
        severity: tip.severity,
        category: tip.category,
        title: tip.title,
        body: tip.body,
        order: i,
      })),
    })

    console.log(`✅ ${block.modelName}: ${allTips.length} tips`)
  }

  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName } })
    await prisma.tirePressure.create({ data: { ...tp } })
  }
  console.log(`🔵 TirePressure: ${TIRE_PRESSURES.map(t => t.modelName).join(', ')}`)

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: BLOCKS.map(b => b.modelName) } },
  })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  const totalTips = BLOCKS.reduce((sum, b) => sum + b.MACETES.length + b.PROBLEMAS.length, 0)
  console.log(`\n✅ Honda CB/CBR seed concluído! ${BLOCKS.length} modelos, ${totalTips} tips, ${TIRE_PRESSURES.length} calibragens, ${MAINTENANCE_ITEMS.length} itens de manutenção`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
