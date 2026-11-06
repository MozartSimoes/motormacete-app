// seed-honda-adv-sh-scooters.ts — Honda ADV 150/160 + SH 150i/300i
// ADV 150 (2020+) | ADV 160 (2022+) | SH 150i / SH 150i DLX (2020+) | SH 300i / SH 300i Sport (2012+)
// Scooters Honda de médio/alto padrão — CVT, refrigerado a líquido, JASO MB
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

// ─── ADV 150 (2020+) e ADV 160 (2022+) ───────────────────────────────────────
// ADV 150: 149cc SOHC single-cyl liquid-cooled eSP PGM-FI CVT | ~13,5 cv @ 8.500 rpm
// ADV 160: 160cc SOHC single-cyl liquid-cooled eSP+ PGM-FI CVT | ~15,4 cv @ 8.500 rpm
// JASO MB (CVT — sem embreagem molhada) | Óleo: 10W-30 JASO MB, 0,9 L (150) / 1,1 L (160)
// Pneus ADV: 110/70-13 (F) / 130/70-13 (R) — adventure scooter crossover

const ADV_MACETES: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Óleo JASO MB OBRIGATÓRIO — nunca use JASO MA/MA2 neste scooter CVT',
    body: 'ADV 150 e ADV 160 usam CVT (variador de velocidade). O sistema CVT tem discos de fricção secos no variador — JASO MA/MA2 tem aditivos antifricção que contaminam e destroem as pastilhas de CVT. Use EXCLUSIVAMENTE 10W-30 JASO MB. Honda Ultra S1 10W-30 JASO MB ou Motul Scooter Expert 10W-30 JASO MB (R$25–40/L). Capacidade: ADV 150 = 0,9 L; ADV 160 = 1,1 L. Intervalo: 4.000 km ou 6 meses. Troca de CVT danificado por óleo errado: R$800–1.500 em peças + mão de obra.',
  },
  {
    severity: 'OK',
    title: 'ADV 160: motor eSP+ com injeção aprimorada — consumo e resposta superiores ao ADV 150',
    body: 'O ADV 160 (eSP+) tem injeção eletromagnética de 2ª geração: melhor atomização da gasolina, 7–10% mais eficiente que o ADV 150 eSP. Consumo real: ADV 160 faz 38–45 km/L (estrada) vs 32–38 km/L do ADV 150. ADV 160 também tem HSTC (controle de tração) desabilitável — excelente para chuva. Tanque: 8,1 L (ADV 150) / 8,1 L (ADV 160). Autonomia: 300–360 km. A luz de reserva no ADV acende com ~1,5 L (~55 km de margem — não deixe secar).',
  },
  {
    severity: 'OK',
    title: 'CVT (variador automático) — não há marcha; deixe o scooter acelerar no próprio ritmo',
    body: 'CVT do ADV transmite potência continuamente pelo variador. Para máxima eficiência: acelere suavemente — torques bruscos desgastam a correia do CVT. A correia do CVT tem vida útil de 20.000–30.000 km. Sintoma de correia desgastada: escorregamento (o motor acelera mas a moto não acompanha), cheiro de borracha ao acelerar. Não tente "forçar" a aceleração nas rampas — o CVT seleciona a relação ótima automaticamente. Revisão do CVT (correia + rolete + polia): a cada 20.000 km.',
  },
  {
    severity: 'OK',
    title: 'Pneus 110/70-13 (F) / 130/70-13 (R) — scooter adventure; cuidado em cascalho e terra',
    body: 'O ADV 150/160 tem pneus adventure (Dunlop Scootsmart com desenho misto) em rodas de 13". Esses pneus suportam terra compactada e cascalho leve. NÃO tente trilha pesada ou off-road sério — as rodas pequenas de 13" encaixam em buracos facilmente. Pressão: F 29 / R 29 PSI solo; R 32 PSI com garupa. Pneus aftermarket: Pirelli MT 75 ou Shinko SR703 para uso mais urbano. Troca: 15.000–20.000 km em uso misto.',
  },
  {
    severity: 'OK',
    title: 'Freio CBS (ADV 150) e ABS+HSTC (ADV 160) — use o freio dianteiro como primário',
    body: 'ADV 150: sistema CBS (freio combinado) — o pedal traseiro aciona ambos os freios. Frene progressivamente. ADV 160: ABS + HSTC (controle de tração). No HSTC: em chuva ou cascalho, o sistema reduz potência se detectar patinagem. Desative o HSTC para off-road leve (botão no painel). ABS do ADV 160: evita trava das rodas, mas requer fluido DOT 4 trocado a cada 2 anos. Sempre freie com 2 dedos na alavanca dianteira — controle é melhor.',
  },
  {
    severity: 'OK',
    title: 'Compartimento sob o banco: chave USB e pequeno porta-objetos — não é porta-capacete',
    body: 'O ADV 150/160 tem compartimento sob o banco para objetos pequenos (carteira, chave, capa de chuva) e entrada USB para carregar celular. NÃO cabe capacete. Para viagens: usar baú traseiro (top case) ou alforjes. Top case recomendado: Givi V35 (35 L, R$500–700) ou Kappa K29 (29 L). Suporte de baú: Honda Genuine Accessories para ADV ou universal com adaptação. Com baú completo: autonomia da posição de carga aumentada — adicionar mais 5 PSI traseiro.',
  },
]

const ADV_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Farol LED pode superaquecer se vedação de ar for prejudicada por acessórios',
    body: 'O ADV 160 tem farol LED de projetor. LEDs geram calor atrás da lente. Se instalar carenagem adicional ou protetor de farol muito próximo: pode reter calor e reduzir vida útil do LED. Evite acessórios que cubram a parte traseira do farol. O farol LED do ADV tem vida útil de 50.000+ horas em condições normais — não há necessidade de substituição se bem ventilado.',
  },
  {
    severity: 'WARN',
    title: 'Correia do CVT: troca na revisão programada; ignorar = perda repentina de tração',
    body: 'A correia do CVT se desgasta gradualmente, sem aviso dramático — até quebrar abruptamente. Uma correia quebrada em movimento para a moto instantaneamente (sem proteção adicional). Troca preventiva: a cada 20.000–25.000 km no ADV. Custo: R$80–150 (correia) + R$100–200 (mão de obra). Inclua sempre os roletes (weights) na troca — roletes desgastados afetam o desempenho mesmo com correia nova.',
  },
  {
    severity: 'OK',
    title: 'Suspensão dianteira telescópica curta — não foi projetada para off-road pesado',
    body: 'O ADV tem visual "adventure" mas suspensão de scooter. Longo curso off-road, buracos fundos ou lombadas em alta velocidade: o garfo curto absorve menos do que as expectativas visuais sugerem. Anda bem em piso irregular leve, mas NÃO é uma adventure de verdade. Amortecedor traseiro: sem ajuste (OEM). Upgrade: amortecedor YSS G302 (R$350–500) melhora comportamento em irregularidades.',
  },
]

// ─── SH 150i / SH 150i DLX ───────────────────────────────────────────────────
// Motor: 153cc SOHC single-cyl liquid-cooled eSP PGM-FI CVT | ~13 cv @ 8.000 rpm
// JASO MB | Óleo: 10W-30 JASO MB, 1,0 L | Pneus: 110/70-16 (F) / 130/70-14 (R) | Tanque: 8,5 L
// Premium urban scooter — rodas maiores (16/14") para melhor estabilidade

const SH150I_MACETES: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Óleo JASO MB OBRIGATÓRIO — 1,0 L, a cada 4.000 km; troca negligenciada = CVT danificado',
    body: 'SH 150i usa CVT sem embreagem molhada. JASO MB obrigatório. 10W-30 JASO MB: Honda Ultra S1, Motul Scooter 4T Expert ou Shell Advance Ultra Scooter. Capacidade: 1,0 L. Intervalo: 4.000 km ou 6 meses. Não ultrapasse 5.000 km entre trocas. O eSP (Enhanced Smart Power) tem motor de partida integrado ao alternador que também exige óleo limpo. Troca do CVT por óleo errado ou degradado: R$1.200–1.800 + mão de obra.',
  },
  {
    severity: 'OK',
    title: 'Rodas 16" (dianteira) e 14" (traseira) — mais estáveis que scooters com rodas de 12/13"',
    body: 'A grande vantagem do SH 150i sobre ADV 150 e scooters menores: rodas maiores (16/14"). Em solavancos, buracos e irregularidades urbanas, rodas maiores dão muito mais estabilidade e conforto. Para uso exclusivamente urbano (São Paulo, Rio de Janeiro): o SH 150i é mais seguro e confortável que o ADV 150 nesse quesito. Pneus: 110/70-16 (F) / 130/70-14 (R). Pressão: F 29 / R 32 PSI solo; R 36 PSI com garupa.',
  },
  {
    severity: 'OK',
    title: 'Porta-objetos frontais e sob banco — SH 150i tem o melhor cubage do segmento',
    body: 'SH 150i tem porta-objetos dianteiro (com tomada 12V e entrada USB), porta-capacete lateral e espaço sob o banco (~22 L). O design é altamente funcional para uso urbano diário: cabe capacete integral pequeno, documentos, lanches. Para viagem: top case 35 L (Givi V35) transforma o SH 150i em scooter de turismo leve. Suporte de baú Honda Genuine: R$150–200 para o SH.',
  },
  {
    severity: 'OK',
    title: 'ABS disponível no SH 150i — trave bienal do fluido DOT 4',
    body: 'Versão ABS do SH 150i (frente e trás): o melhor sistema de freio do segmento 150cc. Fluido DOT 4: troca obrigatória a cada 2 anos — absorção de umidade reduz o ponto de ebulição. Purge de ABS: scanner Honda HDS. Pastilhas dianteiras: EBC equivalente para pinça 1 pistão Honda. Versão CBS (sem ABS): freio combinado por cabo — ajuste a cada 5.000 km.',
  },
]

const SH150I_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Caixa do CVT: borracha de vedação pode soltar com calor prolongado em cidades quentes',
    body: 'Em cidades muito quentes (Manaus, Fortaleza, Belém), a caixa do CVT sofre stress térmico. A vedação da caixa do variador pode perder elasticidade com o tempo. Sintoma: pequeno chiado da caixa em desaceleração. Verificação a cada 15.000 km pelo mecânico. Custo de substituição da vedação: R$30–60 em peças + mão de obra.',
  },
  {
    severity: 'WARN',
    title: 'Painel digital: tela pode apresentar reflexo excessivo em dia claro — limitação de design',
    body: 'O painel digital do SH 150i pode ser difícil de ler sob sol forte (reflexo). Não é defeito — é limitação do display LCD. Solução temporária: parasol de painel (R$30–60 no Mercado Livre, modelo específico SH 150i). Versões 2022+ têm tela com melhor contraste. Antes de comprar usada: teste o painel em dia claro.',
  },
]

// ─── SH 300i / SH 300i Sport ─────────────────────────────────────────────────
// Motor: 279cc SOHC single-cyl liquid-cooled PGM-FI CVT | ~26 cv @ 8.000 rpm
// JASO MB (CVT) | Óleo: 10W-30 JASO MB, 1,3 L | Pneus: 120/70-15 (F) / 150/70-13 (R) | Tanque: 11 L
// Top de gama dos scooters Honda — veloz, confortável, bem equipado

const SH300I_MACETES: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Óleo JASO MB obrigatório — 1,3 L, a cada 5.000 km; não use JASO MA/MA2',
    body: '279cc CVT: JASO MB exclusivo. Capacidade: 1,3 L. Honda Ultra G2 10W-30 JASO MB ou Motul Scooter 4T Expert 10W-30. Intervalo: 5.000 km ou 6 meses. O SH 300i tem motor maior — óleo pode durar ligeiramente mais, mas 5.000 km é o limite seguro. Verificação de nível: com motor desligado há 5 min, vareta lateralmente no cárter. Óleo escuro (quase preto) com menos de 4.000 km: motor com problema de combustão (verifique injetor). Óleo normal ao fim do período: castanho escuro.',
  },
  {
    severity: 'OK',
    title: '26 cv em scooter: respeite o CVT em acelerações — correia é o ponto mais fraco',
    body: 'O SH 300i tem desempenho expressivo para scooter: 0–100 km/h em ~6,5s. Com 26 cv, acelerações do sinal podem ser intensas. Para a saúde do CVT: evite acelerações de fundo repetidas sem aquecimento prévio (5 min de aquecimento é essencial). A correia do CVT suporta os 26 cv, mas não indefinidamente em uso agressivo. Troca preventiva: a cada 25.000 km. Correia NGK/Bando Honda-compatible: R$150–250. Mão de obra: R$150–200.',
  },
  {
    severity: 'OK',
    title: 'Rodas 15" (dianteira) / 13" (traseira) — máxima estabilidade para scooter; comportamento quase moto',
    body: 'SH 300i usa as maiores rodas do segmento scooter Honda: 15" na frente e 13" atrás. Estabilidade em alta velocidade (120+ km/h) e em curvas é notavelmente superior a scooters com rodas de 12/13". Para uso em rodovias: SH 300i é confortável até 140 km/h (não recomendado de forma contínua). Pneus: 120/70-15 (F) e 150/70-13 (R). Michelin City Grip 2 ou Pirelli Angel Scooter para uso urbano/estrada.',
  },
  {
    severity: 'OK',
    title: 'ABS de série no SH 300i e Sport — freio dianteiro responsivo; use progressivamente',
    body: 'SH 300i e 300i Sport têm ABS de série. Freio dianteiro de pinça 4 pistões em disco 256 mm: potente. Em frenagem de emergência: ABS evita trava, mas o piloto precisa manter pressão. Técnica: freio firme e progressivo (não bater a alavanca). Fluido DOT 4: troca anual em uso intenso, bienal em uso normal. Pastilhas: EBC FA115HH ou Brembo CC para a pinça radial (Sport).',
  },
  {
    severity: 'OK',
    title: 'Porta-capacete sob banco (30 L) e gaveta frontal com USB — design funcional',
    body: 'SH 300i tem porta-capacete grande (30 L): cabe capacete integral aberto ou fechado pequeno. Gaveta frontal com entrada USB 5V/2A para carregar o celular. Para viagens longas: top case Givi V35 ou B32 Monolock (R$500–800). Suporte de baú: usar suporte Honda Genuine. Com baú: adicione 2–3 PSI no traseiro. O SH 300i Sport tem painel TFT colorido com Bluetooth (conecta ao smartphone para mapas e notificações).',
  },
  {
    severity: 'OK',
    title: 'SH 300i em estrada: confortável até 120 km/h; acima disso cansa por falta de bolha',
    body: 'Bolha OEM do SH 300i protege bem até 110 km/h. Acima disso: turbulência cansa os ombros. Para viagens longas em rodovias: bolha aftermarket (Puig Hi-Tech Touring para SH 300i: R$550–750) melhora significativamente. O para-brisa não é tão eficiente quanto em motos maiores, mas o SH 300i é um excelente viajante leve até 500 km/dia. Amortecedor traseiro: pré-carga no nível 3/5 (padrão) funciona bem para piloto até 80 kg; 4/5 com garupa ou carga.',
  },
]

const SH300I_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'SH 300i importado: peças com prazo de entrega; some estoque na rede Honda',
    body: 'O SH 300i não é fabricado no Brasil (importado). Peças de motor podem ter prazo de 1–3 semanas na rede Honda. Para peças de carenagem: ainda mais difíceis — importação direta pode ser necessária. Ao comprar usada: verifique histórico de manutenção Honda (book de revisões) e o estado das carenagens (peças originais são caras). Grupos SH 300i Brasil no Facebook têm lista de fornecedores e mecânicos especializados.',
  },
  {
    severity: 'WARN',
    title: 'Correia do CVT: desgaste acelerado se o SH 300i for usado em subidas longas frequentemente',
    body: 'Em cidades com muitas subidas (São Paulo, Belo Horizonte, Florianópolis): o CVT trabalha mais. A correia desgasta mais rápido em uso com inclinação constante. Intervalo recomendado em cidades com subidas: 20.000 km. Sintoma de correia no limite: "escorregamento" ao subir rampas (motor acelera mas a velocidade não acompanha) ou cheiro de borracha queimada. Troca imediata ao perceber esses sintomas.',
  },
  {
    severity: 'OK',
    title: 'Preço elevado vs concorrentes: justifica-se com a qualidade de acabamento e confiabilidade',
    body: 'SH 300i é um dos scooters mais caros do mercado brasileiro (R$25.000–35.000 novo). Comparado ao Yamaha NMAX, Vespa GTS, Kymco Xciting: o SH 300i oferece maior confiabilidade mecânica e melhor rede de assistência. Para quem busca o menor custo total de propriedade em scooter 300: SH 300i vence no longo prazo. Depreciação: menor que concorrentes por ser Honda.',
  },
]

// ─── Manutenção ───────────────────────────────────────────────────────────────

const ADV150_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'ADV 150', yearFrom: 2020, yearTo: 2021, component: 'Óleo 10W-30 JASO MB (0,9 L)', intervalKm: 4000, intervalMonths: 6, notes: 'CVT: JASO MB obrigatório. Honda Ultra S1 ou Motul Scooter Expert. Nunca MA/MA2.', priority: 'CRITICAL', order: 1 },
  { modelName: 'ADV 150', yearFrom: 2020, yearTo: 2021, component: 'Filtro de óleo — troca', intervalKm: 4000, intervalMonths: 6, notes: 'Honda original.', priority: 'MEDIUM', order: 2 },
  { modelName: 'ADV 150', yearFrom: 2020, yearTo: 2021, component: 'Correia + roletes do CVT — revisão', intervalKm: 20000, intervalMonths: null, notes: 'Correia desgastada = parada brusca. Troca preventiva. Incluir roletes.', priority: 'HIGH', order: 3 },
  { modelName: 'ADV 150', yearFrom: 2020, yearTo: 2021, component: 'Vela — verificação/troca', intervalKm: 8000, intervalMonths: null, notes: 'Vela NGK CPR9EAIX-9 iridium ou equivalente. Gap: 0,9 mm.', priority: 'MEDIUM', order: 4 },
  { modelName: 'ADV 150', yearFrom: 2020, yearTo: 2021, component: 'Fluido de arrefecimento — troca', intervalKm: null, intervalMonths: 24, notes: 'Long Life Coolant 50/50.', priority: 'HIGH', order: 5 },
  { modelName: 'ADV 150', yearFrom: 2020, yearTo: 2021, component: 'Pastilhas + fluido DOT 4 (ABS bienal)', intervalKm: 12000, intervalMonths: 24, notes: 'CBS ou ABS dependendo da versão. Fluido DOT 4: bienal.', priority: 'HIGH', order: 6 },
]

const ADV160_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'ADV 160', yearFrom: 2022, yearTo: null, component: 'Óleo 10W-30 JASO MB (1,1 L)', intervalKm: 4000, intervalMonths: 6, notes: 'CVT eSP+: JASO MB obrigatório. Motor eSP+ melhora eficiência mas não muda a especificação de óleo.', priority: 'CRITICAL', order: 1 },
  { modelName: 'ADV 160', yearFrom: 2022, yearTo: null, component: 'Correia + roletes + polia do CVT — revisão', intervalKm: 20000, intervalMonths: null, notes: 'Troca preventiva. Incluir roletes e inspecionar polia.', priority: 'HIGH', order: 2 },
  { modelName: 'ADV 160', yearFrom: 2022, yearTo: null, component: 'Vela iridium — troca', intervalKm: 12000, intervalMonths: null, notes: 'Vela iridium NGK CPR9EAIX-9 ou similar. Gap: 0,9 mm.', priority: 'MEDIUM', order: 3 },
  { modelName: 'ADV 160', yearFrom: 2022, yearTo: null, component: 'Fluido de arrefecimento — troca', intervalKm: null, intervalMonths: 24, notes: 'Long Life Coolant 50/50 com água destilada.', priority: 'HIGH', order: 4 },
  { modelName: 'ADV 160', yearFrom: 2022, yearTo: null, component: 'ABS + HSTC — fluido DOT 4 bienal', intervalKm: null, intervalMonths: 24, notes: 'ABS de série. Purge guiado com scanner Honda. HSTC: desabilitar para off-road.', priority: 'HIGH', order: 5 },
]

const SH150I_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'SH 150i', yearFrom: 2020, yearTo: null, component: 'Óleo 10W-30 JASO MB (1,0 L)', intervalKm: 4000, intervalMonths: 6, notes: 'JASO MB obrigatório. Honda Ultra S1 ou equivalente. NÃO use JASO MA.', priority: 'CRITICAL', order: 1 },
  { modelName: 'SH 150i', yearFrom: 2020, yearTo: null, component: 'Correia + roletes do CVT — revisão', intervalKm: 20000, intervalMonths: null, notes: 'Troca preventiva da correia e roletes. Incluir polia se necessário.', priority: 'HIGH', order: 2 },
  { modelName: 'SH 150i', yearFrom: 2020, yearTo: null, component: 'Vela iridium — troca', intervalKm: 10000, intervalMonths: null, notes: 'Iridium Honda original ou NGK equivalente. Gap: 0,9 mm.', priority: 'MEDIUM', order: 3 },
  { modelName: 'SH 150i', yearFrom: 2020, yearTo: null, component: 'Fluido de arrefecimento — troca', intervalKm: null, intervalMonths: 24, notes: 'Long Life Coolant 50/50.', priority: 'HIGH', order: 4 },
  { modelName: 'SH 150i', yearFrom: 2020, yearTo: null, component: 'ABS (bienal) + pastilhas dianteiras', intervalKm: 12000, intervalMonths: 24, notes: 'Fluido DOT 4: bienal. Pastilhas EBC equivalente para pinça 1 pistão Honda.', priority: 'HIGH', order: 5 },
]

const SH300I_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'SH 300i', yearFrom: 2012, yearTo: null, component: 'Óleo 10W-30 JASO MB (1,3 L)', intervalKm: 5000, intervalMonths: 6, notes: 'CVT 279cc: JASO MB obrigatório. Honda Ultra G2 ou Motul Scooter Expert.', priority: 'CRITICAL', order: 1 },
  { modelName: 'SH 300i', yearFrom: 2012, yearTo: null, component: 'Correia + roletes + polia do CVT — revisão', intervalKm: 25000, intervalMonths: null, notes: 'Troca preventiva. Motor de 26 cv exige correia de qualidade.', priority: 'HIGH', order: 2 },
  { modelName: 'SH 300i', yearFrom: 2012, yearTo: null, component: 'Vela iridium — troca', intervalKm: 12000, intervalMonths: null, notes: 'Honda original. Gap: 1,0 mm.', priority: 'MEDIUM', order: 3 },
  { modelName: 'SH 300i', yearFrom: 2012, yearTo: null, component: 'Fluido de arrefecimento — troca', intervalKm: null, intervalMonths: 24, notes: 'Long Life Coolant 50/50.', priority: 'HIGH', order: 4 },
  { modelName: 'SH 300i', yearFrom: 2012, yearTo: null, component: 'ABS de série — fluido DOT 4 bienal + pastilhas', intervalKm: 12000, intervalMonths: 24, notes: 'Pinça 4 pistões dianteira. EBC FA115HH. DOT 4 bienal.', priority: 'HIGH', order: 5 },
  { modelName: 'SH 300i', yearFrom: 2012, yearTo: null, component: 'Bateria YTZ7S (12V 6Ah) — verificação', intervalKm: null, intervalMonths: 12, notes: 'Verificar carga. Vida útil: 3–4 anos. Manter em carregador se parada.', priority: 'MEDIUM', order: 6 },
  // SH 300i Sport herda tudo
  { modelName: 'SH 300i Sport', yearFrom: 2016, yearTo: null, component: 'Óleo 10W-30 JASO MB (1,3 L)', intervalKm: 5000, intervalMonths: 6, notes: 'Mesmo motor SH 300i. JASO MB obrigatório.', priority: 'CRITICAL', order: 1 },
  { modelName: 'SH 300i Sport', yearFrom: 2016, yearTo: null, component: 'Correia + roletes do CVT — revisão', intervalKm: 25000, intervalMonths: null, notes: 'Idêntico ao SH 300i padrão.', priority: 'HIGH', order: 2 },
  { modelName: 'SH 300i Sport', yearFrom: 2016, yearTo: null, component: 'ABS de série — fluido DOT 4 bienal + pastilhas', intervalKm: 12000, intervalMonths: 24, notes: 'Pinça radial Brembo 4 pistões (Sport). EBC ou Brembo CC.', priority: 'HIGH', order: 3 },
]

// ─── Calibragens ──────────────────────────────────────────────────────────────

const ADV150_CALIBRAGEM = {
  modelName: 'ADV 150',
  yearFrom: 2020, yearTo: 2021,
  tireSize: '110/70-13 (F) · 130/70-13 (R)',
  frontPsi: 29, rearPsi: 29, frontPsiLoad: 29, rearPsiLoad: 32,
  sparePsi: null,
  notes: 'Solo: F 29 / R 29 PSI. Com garupa: F 29 / R 32 PSI. Off-road leve: F 25 / R 26 PSI. Pirelli MT 75, Michelin City Grip 2 ou Dunlop Scootsmart.',
}

const ADV160_CALIBRAGEM = {
  modelName: 'ADV 160',
  yearFrom: 2022, yearTo: null,
  tireSize: '110/70-13 (F) · 130/70-13 (R)',
  frontPsi: 29, rearPsi: 29, frontPsiLoad: 29, rearPsiLoad: 32,
  sparePsi: null,
  notes: 'Solo: F 29 / R 29 PSI. Com garupa: F 29 / R 32 PSI. HSTC: desabilitar para off-road. Mesmos pneus da ADV 150.',
}

const SH150I_CALIBRAGEM = {
  modelName: 'SH 150i',
  yearFrom: 2020, yearTo: null,
  tireSize: '110/70-16 (F) · 130/70-14 (R)',
  frontPsi: 29, rearPsi: 32, frontPsiLoad: 29, rearPsiLoad: 36,
  sparePsi: null,
  notes: 'Solo: F 29 / R 32 PSI. Com garupa: F 29 / R 36 PSI. Rodas maiores (16/14") para estabilidade. Pirelli Angel Scooter ou Michelin City Grip 2.',
}

const SH300I_CALIBRAGEM = {
  modelName: 'SH 300i',
  yearFrom: 2012, yearTo: null,
  tireSize: '120/70-15 (F) · 150/70-13 (R)',
  frontPsi: 29, rearPsi: 36, frontPsiLoad: 29, rearPsiLoad: 39,
  sparePsi: null,
  notes: 'Solo: F 29 / R 36 PSI. Com garupa: F 29 / R 39 PSI. Rodas grandes 15/13". Michelin City Grip 2, Pirelli Angel Scooter. Para estrada longa: R 38 PSI solo.',
}

const SH300I_SPORT_CALIBRAGEM = {
  modelName: 'SH 300i Sport',
  yearFrom: 2016, yearTo: null,
  tireSize: '120/70-15 (F) · 150/70-13 (R)',
  frontPsi: 29, rearPsi: 36, frontPsiLoad: 29, rearPsiLoad: 39,
  sparePsi: null,
  notes: 'Mesma calibragem do SH 300i padrão. Verificar sempre a frio.',
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
  console.log('🛵  Seed Honda ADV 150/160 + SH 150i/300i...')

  await upsertVehicleModel('ADV 150', 'Honda', 2020, 2021)
  await upsertVehicleModel('ADV 160', 'Honda', 2022, null)
  await upsertVehicleModel('SH 150i', 'Honda', 2020, null)
  await upsertVehicleModel('SH 300i', 'Honda', 2012, null)
  await upsertVehicleModel('SH 300i Sport', 'Honda', 2016, null)

  // ADV 150
  await upsertTips('ADV 150', 'MACETES', ADV_MACETES)
  await upsertTips('ADV 150', 'PROBLEMAS', ADV_PROBLEMAS)
  await upsertMaintenance(ADV150_MANUTENCAO)
  await upsertTirePressure(ADV150_CALIBRAGEM)

  // ADV 160
  await upsertTips('ADV 160', 'MACETES', ADV_MACETES)
  await upsertTips('ADV 160', 'PROBLEMAS', ADV_PROBLEMAS)
  await upsertMaintenance(ADV160_MANUTENCAO)
  await upsertTirePressure(ADV160_CALIBRAGEM)

  // SH 150i
  await upsertTips('SH 150i', 'MACETES', SH150I_MACETES)
  await upsertTips('SH 150i', 'PROBLEMAS', SH150I_PROBLEMAS)
  await upsertMaintenance(SH150I_MANUTENCAO)
  await upsertTirePressure(SH150I_CALIBRAGEM)

  // SH 300i
  await upsertTips('SH 300i', 'MACETES', SH300I_MACETES)
  await upsertTips('SH 300i', 'PROBLEMAS', SH300I_PROBLEMAS)
  await upsertMaintenance(SH300I_MANUTENCAO.filter(i => i.modelName === 'SH 300i'))
  await upsertTirePressure(SH300I_CALIBRAGEM)

  // SH 300i Sport
  await upsertTips('SH 300i Sport', 'MACETES', SH300I_MACETES)
  await upsertTips('SH 300i Sport', 'PROBLEMAS', SH300I_PROBLEMAS)
  await upsertMaintenance(SH300I_MANUTENCAO.filter(i => i.modelName === 'SH 300i Sport'))
  await upsertTirePressure(SH300I_SPORT_CALIBRAGEM)

  const models = ['ADV 150', 'ADV 160', 'SH 150i', 'SH 300i', 'SH 300i Sport']
  const tipCount = await prisma.tip.count({ where: { modelName: { in: models } } })
  const maintCount = await prisma.maintenanceItem.count({ where: { modelName: { in: models } } })

  console.log(`✅ ADV 150 + ADV 160 + SH 150i + SH 300i + SH 300i Sport — ${tipCount} dicas, ${maintCount} itens de manutenção`)
  console.log('✅ Seed concluído!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
