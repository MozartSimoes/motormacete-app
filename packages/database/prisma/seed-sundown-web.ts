// seed-sundown-web.ts — Sundown Web 97cc e Web EVO 97cc
// Web 97cc: motoneta/street 97,7cc OHC monocilíndrico a ar, carburada, câmbio rotativo 4 marchas.
// Web EVO 97cc: evolução com injeção eletrônica (Sundown SFI monoponto), painel digital, mesma base de motor.
// Sundown (Manaus/AM) é fabricante nacional de menor porte que Honda/Yamaha — rede de concessionárias
// mais restrita e já passou por dificuldades financeiras/paradas de produção ao longo dos anos, o que
// torna peças originais mais escassas em algumas regiões.
// Execute: pnpm --filter @motormacete/database db:seed:sundown-web
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

// ─── WEB 97cc (carburada) ──────────────────────────────────────────────────────
// Motor: 97,7cc OHC monocilíndrico a ar, 2 válvulas | ~7,3 cv @ 7.500 rpm (estimativa) | torque ~0,68 kgf.m
// Carburador tipo PB16 (padrão Mikuni copiado) | Óleo 20W-50 0,8L | Vela NGK C7HSA gap 0,6–0,7mm
// Câmbio manual rotativo 4 marchas | Corrente 415 | Tanque 4,8L | Pneu 60/100-17 (F) / 70/90-17 (R)

const WEB_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 20W-50 mineral — 0,8L na troca; motor pequeno sofre mais com atraso',
    body: 'O motor 97,7cc da Web é de baixa cilindrada e opera em rotação relativamente alta no dia a dia urbano — isso acelera a degradação do óleo. Capacidade: 0,8L (com filtro de tela, sem filtro de papel). Use 20W-50 mineral API SL ou semissintético (Lubrax Moto 4T, Shell Advance AX5 20W-50) — não precisa de sintético caro para este motor. Troque a cada 2.000–2.500 km ou 3 meses, o que vier primeiro. Motor com pouco óleo nesta cilindrada aquece e desgasta o comando de válvulas rapidamente.',
  },
  {
    severity: 'WARN',
    title: 'Carburador PB16: limpe o jato principal a cada 6 meses por causa da gasolina com etanol',
    body: 'O carburador da Web é simples (tipo PB16, sem bomba de aceleração) e o jato principal entope com facilidade quando o combustível fica parado (etanol forma verniz/goma). Sintomas: partida difícil a frio, marcha lenta que morre, "engasgo" na retomada. Limpeza: desmontar a cuba, soprar os jatos com spray de carburador (Bardahl ou WD-40 Injetor) e verificar a boia (nível ~18–20mm da face do corpo). Se a moto ficar parada mais de 30 dias, drene o combustível da cuba antes de guardar.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA gap 0,6–0,7mm — troca a cada 6.000 km',
    body: 'Vela recomendada: NGK C7HSA (equivalente Denso U20FSU). Gap: 0,6–0,7mm, calibrador de palheta. Custo: R$ 12–20. Como o motor da Web trabalha em giro relativamente alto no trânsito urbano, a vela desgasta um pouco mais rápido que em motos maiores — não ultrapasse 8.000 km. Vela com folga aberta demais causa falha na partida a frio, sintoma muito comum relatado por donos de Web em fóruns.',
  },
  {
    severity: 'OK',
    title: 'Corrente 415 — pitch menor, exige lubrificação mais frequente que motos de 125/150cc',
    body: 'A Web usa corrente 415 (passo menor, mais fina que a 428 das motos de 125–150cc), o que significa desgaste mais rápido se não for lubrificada. Lubrifique a cada 400–500 km com spray de corrente ou óleo fino. Folga correta: 15–25mm no trecho inferior — folga maior que isso indica desgaste do kit relação (pinhão/coroa/corrente), que na Web costuma durar 10.000–15.000 km em uso urbano com paradas frequentes.',
  },
  {
    severity: 'WARN',
    title: 'Tanque pequeno (4,8L): planeje abastecimento, autonomia real gira em torno de 130–160 km',
    body: 'Um dos pontos mais criticados pelos donos da Web é o tanque de combustível pequeno — cerca de 4,8L. Com consumo médio de 30–35 km/L em uso urbano, a autonomia fica em torno de 130–160 km antes da reserva. Fique atento ao ponteiro/luz de combustível, pois rodar até secar pode sugar sujeira do fundo do tanque para o carburador. Considere levar sempre uma reserva de combustível em trajetos mais longos.',
  },
  {
    severity: 'OK',
    title: 'Peças compartilhadas com outras motoneta/street de baixa cilindrada facilita manutenção',
    body: 'Muitos componentes de desgaste da Web (retentores, rolamentos de roda, kit relação, cabos de embreagem e acelerador) têm medida compatível com outras motos populares de motor pequeno vendidas no Brasil (Honda Pop 100i, Yamaha Crypton, motos chinesas de 100–110cc). Ao procurar peças em lojas que não têm o item "Sundown" no catálogo, pergunte por medida (mm) em vez do nome da marca — geralmente há equivalente genérico bem mais barato.',
  },
  {
    severity: 'WARN',
    title: 'Plástico da carenagem é frágil: parafusos justos e evite forçar ao remontar',
    body: 'A carenagem plástica da Web, por ser uma motoneta com carenagem completa (diferente das naked como CG), fica mais exposta a rachaduras em pequenas quedas e até apenas no aperto excessivo dos parafusos de fixação. Ao fazer manutenção, aperte os parafusos plásticos apenas até sentir resistência leve — não use torque de parafuso metálico. Peças de reposição (carenagem lateral, para-lama) custam R$ 60–150 cada e nem sempre têm estoque em lojas menores — pesquise em desmanches como alternativa mais barata.',
  },
]

const WEB_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Sistema elétrico frágil: CDI e chicote são pontos de reclamação recorrentes',
    body: 'Donos de Web relatam com frequência problemas de CDI (moto não pega, sem faísca) e conectores do chicote que oxidam e causam falhas intermitentes (pisca-pisca, luz de freio, buzina). Antes de trocar o CDI, teste sempre o aterramento e limpe os conectores com spray de contato elétrico e graxa dielétrica — resolve boa parte dos casos "fantasma". CDI genérico compatível: procure por CDI de 5 ou 6 pinos para motor 100cc rotativo — custo R$ 40–90.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedores traseiros perdem eficiência cedo — troque em par acima de 15.000 km',
    body: 'Os amortecedores traseiros de origem da Web costumam amolecer/perder gás entre 15.000–20.000 km, especialmente em ruas com buracos. Sintoma: solavancos secos, traseira "pulando" em lombadas. Sempre troque o par — um amortecedor novo com um velho desequilibra a moto em curva. Opções de reposição no mercado paralelo (Cofap, Kayaba genérico compatível) custam R$ 80–150 o par.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão em partes metálicas expostas — atenção redobrada em cidades litorâneas',
    body: 'O tratamento anticorrosivo de peças metálicas (escapamento, suportes, parafusaria) da Web é mais básico que o de marcas maiores, e há relatos de ferrugem precoce em regiões de maresia ou muita chuva. Lave a moto regularmente, principalmente a parte de baixo do motor e o escapamento, e aplique óleo protetivo (tipo WD-40) em pontos de articulação e parafusos expostos a cada poucos meses.',
  },
  {
    severity: 'WARN',
    title: 'Rede de concessionárias/peças originais menor — priorize equivalentes genéricos',
    body: 'A Sundown tem rede de assistência e distribuição de peças bem menor que Honda ou Yamaha, e a marca já passou por períodos de instabilidade financeira e paradas de produção ao longo dos anos. Isso significa que peças 100% originais podem demorar para chegar em algumas regiões. Para itens de desgaste comum (filtros, velas, kit relação, retentores, lâmpadas), prefira sempre equivalentes genéricos de mesma medida — encontrados em qualquer loja de peças para motos populares.',
  },
  {
    severity: 'DANGER',
    title: 'Freio a tambor: verifique lonas a cada revisão, desgaste "silencioso" é comum',
    body: 'A Web (versões de entrada) usa freio a tambor nas duas rodas em boa parte da linha. O tambor não avisa desgaste com ruído tão cedo quanto um disco com pastilha gasta, então é fácil rodar com lona fina sem perceber. Verifique visualmente a cada 3.000–5.000 km: espessura mínima de lona é de aproximadamente 2mm. Regule o cabo/vareta do freio sempre que notar curso excessivo no pedal ou manete antes de trocar as lonas.',
  },
]

const WEB_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Calendário completo Web 97cc: revisões mais frequentes que motos de cilindrada maior',
    body: '500 km — Troca de óleo inicial (rodagem). | 1.000 km — Segunda troca de óleo + regulagem de corrente e cabos. | 2.500 km — Troca de óleo (20W-50, 0,8L). Lubrificar corrente. | 5.000 km — Limpeza do carburador (jato principal). Verificar vela. Limpar filtro de ar. | 6.000 km — Troca da vela NGK C7HSA. | 8.000 km — Regular folga de válvulas (adm 0,05mm / esc 0,08mm, motor frio). Trocar filtro de ar. | 10.000 km — Inspecionar kit relação (corrente 415, pinhão, coroa). | 12.000 km — Trocar fluido de freio (se houver disco dianteiro). Inspecionar lonas de tambor. | 15.000 km — Amortecedores traseiros (inspeção/troca do par). Rolamentos de roda.',
  },
]

// ─── WEB EVO 97cc (injeção eletrônica) ─────────────────────────────────────────
// Motor: mesma base 97,7cc OHC a ar, agora com injeção eletrônica monoponto (Sundown SFI)
// ~7,8 cv @ 7.500 rpm (estimativa) | torque ~0,7 kgf.m | Vela NGK CPR7EA (com resistor) gap 0,7–0,8mm
// Óleo 20W-50 0,8L | Painel digital | Bateria maior amperagem (bomba de combustível elétrica)
// Câmbio rotativo 4 marchas | Corrente 415 | Tanque ~5,5L | Pneu 60/100-17 (F) / 70/90-17 (R)

const WEBEVO_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Injeção eletrônica (Sundown SFI): fim dos problemas de carburador, mas exige bateria saudável',
    body: 'A Web EVO trocou o carburador por injeção eletrônica monoponto (corpo de borboleta único com bico injetor e sensor TPS) — resolveu o problema crônico de entupimento por etanol degradado que afeta a Web carburada. Em compensação, o sistema depende de bateria e bomba de combustível elétrica funcionando bem. Mantenha a bateria sempre carregada (tensão de repouso mínima 12,4V); bateria fraca causa partida difícil e, em casos extremos, luz de injeção piscando no painel.',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50 mineral — 0,8L; intervalo pode chegar a 3.000 km com uso urbano moderado',
    body: 'Mesma base de motor da Web carburada, mas a injeção eletrônica proporciona combustão mais estável, reduzindo levemente o estresse térmico do óleo. Capacidade: 0,8L. Use 20W-50 mineral ou semissintético JASO MA (Lubrax Moto 4T, Shell Advance AX5). Intervalo: 3.000 km ou 4 meses em uso urbano moderado; reduza para 2.000 km em trânsito muito parado (calor excessivo no motor).',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CPR7EA (com resistor) — gap 0,7–0,8mm; não use vela sem resistor',
    body: 'Motos com injeção eletrônica precisam de vela com resistor interno (prefixo "R" na nomenclatura NGK) para não gerar interferência eletromagnética no módulo de injeção. Vela correta: NGK CPR7EA, gap 0,7–0,8mm. Usar vela sem resistor pode causar falhas intermitentes na leitura dos sensores e até apagar o painel digital em marcha lenta. Troca a cada 8.000–10.000 km. Custo: R$ 20–35.',
  },
  {
    severity: 'WARN',
    title: 'Corpo de borboleta: limpe o TBI (throttle body) a cada 10.000 km para evitar marcha lenta instável',
    body: 'Mesmo sem carburador, o corpo de injeção acumula resíduo de combustível e carvão ao redor da válvula borboleta, especialmentente em uso urbano com muitas paradas. Sintoma: marcha lenta oscilando, leve engasgo na retomada. Limpeza: spray específico para corpo de borboleta (throttle body cleaner) aplicado com o motor desligado, sem tocar no sensor TPS. Serviço simples, pode ser feito em casa a cada 10.000 km.',
  },
  {
    severity: 'OK',
    title: 'Painel digital: preserve o conector do chicote para não perder informações de injeção',
    body: 'O painel digital da Web EVO também exibe códigos de falha piscando quando há algum sensor de injeção com problema (TPS, sonda de temperatura do motor, etc). Ao notar o painel piscando de forma incomum ou luz de "check" acesa, não ignore — leve a uma oficina com scanner compatível com motos nacionais de injeção simples (muitas oficinas de motos populares já têm esse equipamento, custo de diagnóstico R$ 40–80).',
  },
  {
    severity: 'OK',
    title: 'Corrente 415 e tanque ~5,5L — mesma lógica de manutenção da Web carburada',
    body: 'A Web EVO mantém a corrente 415 (lubrificar a cada 400–500 km, folga 15–25mm) e ganhou um tanque ligeiramente maior (~5,5L) que ajuda um pouco na autonomia, ainda modesta para os padrões de motos maiores. Com o consumo mais eficiente da injeção eletrônica (ganho médio de 10–15% frente à versão carburada), a autonomia sobe para cerca de 160–200 km antes da reserva.',
  },
  {
    severity: 'WARN',
    title: 'Bomba de combustível elétrica: evite rodar com tanque quase vazio com frequência',
    body: 'Diferente da versão carburada (que puxa combustível por gravidade/vácuo), a Web EVO tem bomba de combustível elétrica submersa dentro do tanque. Rodar frequentemente com o tanque quase vazio faz a bomba trabalhar sem refrigeração adequada do próprio combustível, reduzindo sua vida útil. Reabasteça sempre que o marcador chegar perto da reserva — a bomba de reposição custa R$ 150–300 e não é item barato de trocar.',
  },
]

const WEBEVO_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Falha na bomba de combustível ou no relé de injeção impede a partida completamente',
    body: 'Diferente do carburador (que ainda dá partida com bateria fraca via pedal, mesmo que difícil), a injeção eletrônica da Web EVO depende 100% do sistema elétrico funcionando: bomba de combustível, relé de injeção e ECU precisam de tensão adequada. Bateria descarregada ou fusível de injeção queimado = moto simplesmente não liga, mesmo com pedal de partida. Tenha sempre a bateria em dia e verifique o fusível da injeção (geralmente 10–15A) antes de suspeitar de problema mais grave.',
  },
  {
    severity: 'WARN',
    title: 'Sensor TPS (posição da borboleta) desregulado causa marcha lenta alta ou instável',
    body: 'Um dos sintomas mais relatados por donos de Web EVO é marcha lenta oscilando entre alta e baixa, às vezes morrendo no primeiro engate. Na maioria dos casos é o sensor TPS que perdeu a calibração (pode acontecer após limpeza do corpo de borboleta sem cuidado). Solução: recalibração do TPS em oficina com scanner, ou substituição do sensor (R$ 60–120) se o problema persistir após a calibração.',
  },
  {
    severity: 'WARN',
    title: 'Bateria de menor capacidade sofre desgaste acelerado pela demanda extra da injeção',
    body: 'A bateria original da Web EVO tem capacidade relativamente pequena, mas precisa alimentar constantemente a bomba de combustível e a ECU, além da partida. Isso reduz a vida útil média da bateria comparado a motos carburadas — muitos donos relatam troca necessária a cada 12–18 meses. Ao trocar, prefira bateria selada (VRLA) de mesma capacidade nominal ou levemente superior, e evite deixar a moto parada por longos períodos sem uso.',
  },
  {
    severity: 'WARN',
    title: 'Mesmos problemas estruturais da Web base: carenagem frágil e amortecedores traseiros fracos',
    body: 'Como a Web EVO compartilha o chassi e boa parte da parte ciclística da Web carburada, os mesmos pontos fracos se aplicam: carenagem plástica que racha com aperto excessivo ou pequenas quedas, e amortecedores traseiros que perdem eficiência entre 15.000–20.000 km. Veja as dicas da Web 97cc para esses itens — a solução e as peças são as mesmas.',
  },
]

const WEBEVO_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Calendário completo Web EVO 97cc: revisões elétricas ganham peso pela injeção eletrônica',
    body: '500 km — Troca de óleo inicial (rodagem). | 1.000 km — Segunda troca de óleo + checar aperto de conexões elétricas da injeção. | 3.000 km — Troca de óleo (20W-50, 0,8L). Lubrificar corrente. | 5.000 km — Verificar vela CPR7EA. Limpar filtro de ar. Checar tensão da bateria. | 8.000 km — Troca da vela NGK CPR7EA. Regular folga de válvulas (adm 0,05mm / esc 0,08mm, motor frio). | 10.000 km — Limpeza do corpo de borboleta (TBI). Trocar filtro de ar. Inspecionar kit relação. | 12.000 km — Verificar bomba de combustível (ruído/pressão). Fluido de freio se houver disco. | 15.000 km — Amortecedores traseiros. Rolamentos de roda. Diagnóstico de códigos de falha com scanner (preventivo).',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'WEB 97cc',
    yearFrom: 1998,
    yearTo: 2023,
    MACETES: WEB_MACETES,
    PROBLEMAS: WEB_PROBLEMAS,
    MANUTENCAO: WEB_MANUTENCAO,
  },
  {
    modelName: 'WEB EVO 97cc',
    yearFrom: 2018,
    yearTo: null,
    MACETES: WEBEVO_MACETES,
    PROBLEMAS: WEBEVO_PROBLEMAS,
    MANUTENCAO: WEBEVO_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'WEB 97cc',
    yearFrom: 1998, yearTo: 2023,
    tireSize: '60/100-17 (F) · 70/90-17 (R)',
    frontPsi: 22, rearPsi: 28,
    frontPsiLoad: 24, rearPsiLoad: 32,
    notes: 'Solo: F 22 / R 28 PSI. Com carona/carga: F 24 / R 32 PSI. Pneus estreitos típicos de motoneta pequena — verifique semanalmente, perda de calibragem afeta muito a estabilidade neste porte de pneu. Pneus recomendados: Pirelli Formula/Levorin Duna 60/100-17 (F) e 70/90-17 (R).',
  },
  {
    modelName: 'WEB EVO 97cc',
    yearFrom: 2018, yearTo: null,
    tireSize: '60/100-17 (F) · 70/90-17 (R)',
    frontPsi: 22, rearPsi: 28,
    frontPsiLoad: 24, rearPsiLoad: 32,
    notes: 'Solo: F 22 / R 28 PSI. Com carona/carga: F 24 / R 32 PSI. Mesma medida de pneu da Web carburada. Verifique a calibragem sempre a frio, antes de rodar.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // WEB 97cc
  { modelName: 'WEB 97cc', yearFrom: 1998, yearTo: 2023, component: 'Óleo 20W-50 mineral (0,8L)', intervalKm: 2500, intervalMonths: 3, notes: 'Motor 97,7cc pequeno, gira mais alto no urbano — não estender além de 2.500 km.', priority: 'HIGH', order: 1 },
  { modelName: 'WEB 97cc', yearFrom: 1998, yearTo: 2023, component: 'Limpeza do carburador PB16', intervalKm: 5000, intervalMonths: 6, notes: 'Jato principal entope com etanol degradado. Verificar nível da boia (~18–20mm).', priority: 'HIGH', order: 2 },
  { modelName: 'WEB 97cc', yearFrom: 1998, yearTo: 2023, component: 'Lubrificação da corrente 415', intervalKm: 450, intervalMonths: null, notes: 'Pitch fino desgasta rápido sem lubrificação. Folga 15–25mm.', priority: 'HIGH', order: 3 },
  { modelName: 'WEB 97cc', yearFrom: 1998, yearTo: 2023, component: 'Vela NGK C7HSA (gap 0,6–0,7mm)', intervalKm: 6000, intervalMonths: null, notes: 'Motor gira alto no dia a dia urbano — não ultrapassar 8.000 km.', priority: 'MEDIUM', order: 4 },
  { modelName: 'WEB 97cc', yearFrom: 1998, yearTo: 2023, component: 'Filtro de ar — limpeza/troca', intervalKm: 5000, intervalMonths: 12, notes: 'Espuma: lavar com querosene, secar, umedecer com óleo leve.', priority: 'MEDIUM', order: 5 },
  { modelName: 'WEB 97cc', yearFrom: 1998, yearTo: 2023, component: 'Folga de válvulas (adm 0,05mm / esc 0,08mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio. Regulagem por contra-porca.', priority: 'HIGH', order: 6 },
  { modelName: 'WEB 97cc', yearFrom: 1998, yearTo: 2023, component: 'Kit relação 415 (pinhão + coroa + corrente)', intervalKm: 12000, intervalMonths: null, notes: 'Trocar completo — corrente nova com coroa gasta desgasta rápido.', priority: 'HIGH', order: 7 },
  { modelName: 'WEB 97cc', yearFrom: 1998, yearTo: 2023, component: 'Lonas de freio a tambor — inspeção', intervalKm: 4000, intervalMonths: 6, notes: 'Desgaste silencioso. Espessura mínima ~2mm.', priority: 'HIGH', order: 8 },
  { modelName: 'WEB 97cc', yearFrom: 1998, yearTo: 2023, component: 'Amortecedores traseiros (par)', intervalKm: 18000, intervalMonths: null, notes: 'Perdem eficiência entre 15.000–20.000 km. Trocar sempre em par.', priority: 'MEDIUM', order: 9 },
  { modelName: 'WEB 97cc', yearFrom: 1998, yearTo: 2023, component: 'Verificação de conectores/chicote elétrico', intervalKm: null, intervalMonths: 12, notes: 'Ponto fraco recorrente: oxidação causa falhas intermitentes.', priority: 'MEDIUM', order: 10 },

  // WEB EVO 97cc
  { modelName: 'WEB EVO 97cc', yearFrom: 2018, yearTo: null, component: 'Óleo 20W-50 mineral (0,8L)', intervalKm: 3000, intervalMonths: 4, notes: 'Injeção eletrônica proporciona combustão mais estável — pode estender levemente frente à versão carburada.', priority: 'HIGH', order: 1 },
  { modelName: 'WEB EVO 97cc', yearFrom: 2018, yearTo: null, component: 'Vela NGK CPR7EA com resistor (gap 0,7–0,8mm)', intervalKm: 9000, intervalMonths: null, notes: 'Obrigatório usar vela com resistor (prefixo R) em motor injetado.', priority: 'HIGH', order: 2 },
  { modelName: 'WEB EVO 97cc', yearFrom: 2018, yearTo: null, component: 'Limpeza do corpo de borboleta (TBI)', intervalKm: 10000, intervalMonths: 12, notes: 'Evita marcha lenta instável. Não tocar no sensor TPS durante a limpeza.', priority: 'MEDIUM', order: 3 },
  { modelName: 'WEB EVO 97cc', yearFrom: 2018, yearTo: null, component: 'Lubrificação da corrente 415', intervalKm: 450, intervalMonths: null, notes: 'Folga 15–25mm no trecho inferior.', priority: 'HIGH', order: 4 },
  { modelName: 'WEB EVO 97cc', yearFrom: 2018, yearTo: null, component: 'Verificação de tensão da bateria', intervalKm: null, intervalMonths: 6, notes: 'Injeção depende 100% da bateria — mínimo 12,4V em repouso. Bomba de combustível elétrica exige tensão adequada.', priority: 'CRITICAL', order: 5 },
  { modelName: 'WEB EVO 97cc', yearFrom: 2018, yearTo: null, component: 'Filtro de ar — limpeza/troca', intervalKm: 5000, intervalMonths: 12, notes: 'Mesma lógica da Web carburada.', priority: 'MEDIUM', order: 6 },
  { modelName: 'WEB EVO 97cc', yearFrom: 2018, yearTo: null, component: 'Folga de válvulas (adm 0,05mm / esc 0,08mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio.', priority: 'HIGH', order: 7 },
  { modelName: 'WEB EVO 97cc', yearFrom: 2018, yearTo: null, component: 'Kit relação 415 (pinhão + coroa + corrente)', intervalKm: 12000, intervalMonths: null, notes: 'Trocar completo.', priority: 'HIGH', order: 8 },
  { modelName: 'WEB EVO 97cc', yearFrom: 2018, yearTo: null, component: 'Diagnóstico preventivo de códigos de falha (scanner)', intervalKm: 15000, intervalMonths: 12, notes: 'Detecta falhas de sensor (TPS, temperatura) antes de virarem problema maior.', priority: 'MEDIUM', order: 9 },
  { modelName: 'WEB EVO 97cc', yearFrom: 2018, yearTo: null, component: 'Amortecedores traseiros (par)', intervalKm: 18000, intervalMonths: null, notes: 'Mesmo componente da Web carburada — chassi compartilhado.', priority: 'MEDIUM', order: 10 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Sundown Web (97cc / EVO 97cc)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'SUNDOWN', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'SUNDOWN', vehicleTypeId: motoType.id },
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

  console.log('✅ Sundown Web concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
