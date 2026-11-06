// seed-triumph-rocket3.ts — Triumph Rocket III 2300cc (geração antiga) e Rocket 3 2500cc (geração atual)
// Motor tricilíndrico gigante — maior motor de moto de produção em série do mundo.
// Geração antiga (2004-2017): 2294cc, ~140-146cv, transmissão final por cardã (shaft drive).
// Geração atual (2020+): 2458cc, ~167-180cv, 221-225Nm — maior torque de produção em série do mundo.
// Execute: pnpm --filter @motormacete/database db:seed:triumph-rocket3
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

// ─── ROCKET III 2300cc (geração antiga, 2004-2017) ───────────────────────────
// Motor: 2294cc tricilíndrico em linha, refrigerado a líquido, DOHC 12 válvulas
// Rocket III padrão: 140cv @ 5.750rpm | 200Nm @ 2.500rpm
// Rocket III Roadster: 146cv @ 5.750rpm | 221Nm @ 2.750rpm (torque recorde da categoria na época)
// Rocket III Classic: motor igual ao padrão, guidão pullback + estribos avançados (floorboards)
// Óleo 15W-50 JASO MA API SH ~5,4L com filtro / 5,9L a seco | Vela NGK DPR7EA-9 gap 0,9mm
// Transmissão final por cardã (shaft drive) com bevel box — óleo hipoide 75W-90 GL5
// Pneu: 150/80-17 (F) / 240/50-16 (R) — pneu traseiro mais largo já produzido em série na época
// Peso: ~320kg seco / ~350kg úmido | Tanque: 24L

const ROCKET3_OLD_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 15W-50 JASO MA — 5,4L com filtro, 5,9L a seco',
    body: 'O motor 2294cc usa óleo 15W-50 semissintético/sintético API SH (ou superior) com certificação JASO MA — obrigatório porque o óleo é compartilhado com a embreagem multidisco em banho de óleo. Capacidade: 5,4L na troca com filtro, 5,9L a seco. Marca de referência: Castrol Power 1 4T 15W-50 (equivalentes: Motul 5100 15W-50, Lubrax GT 15W-50). Nunca use óleo sem JASO MA — a embreagem pode escorregar. Intervalo prudente: a cada 10.000 km ou 12 meses.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK DPR7EA-9 gap 0,9mm — motor tricilíndrico, troque as 3 juntas',
    body: 'O motor tricilíndrico tem 3 velas, uma por cilindro: NGK DPR7EA-9, gap 0,9mm (~0,035"). Opção iridium: NGK DPR7EIX-9 — dura mais e melhora a resposta em baixa rotação, que é o forte desse motor de torque gigante. Sempre troque as 3 velas juntas, nunca uma isolada — evita combustão desigual entre cilindros. Intervalo recomendado: 16.000-20.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Cardã: sem corrente para lubrificar, mas não esqueça o óleo do bevel box',
    body: 'A Rocket III usa transmissão final por cardã (shaft drive) — zero corrente, zero lubrificação de corrente, zero ajuste de folga. Mas a caixa de redução final (bevel box), onde o cardã encontra a roda traseira, tem óleo hipoide próprio: Mobil Mobilube 1 SHC 75W-90 (ou equivalente API GL5). Capacidade pequena, ~170mL a seco — complete até o nível indicado pelo bujão, não um volume fixo. Intervalo oficial: a cada 20.000 km, mas muitos proprietários trocam a cada 5.000-8.000 km por relatos de borra metálica se acumulando (limalha das engrenagens internas).',
  },
  {
    severity: 'WARN',
    title: 'Pneu traseiro 240/50-16 — o mais largo de qualquer moto de série na época',
    body: 'Pneu traseiro exclusivo e caro: original Metzeler ME880 Marathon ou Avon Cobra 240/50-16. Poucos borracheiros e lojas mantêm esse pneu em estoque no Brasil — encomende com antecedência. Pressão de referência: 36 PSI (F) / 42 PSI (R) solo. O desgaste é mais rápido que em pneus estreitos por causa do altíssimo torque disponível já nos primeiros graus de giro do acelerador.',
  },
  {
    severity: 'WARN',
    title: 'Peso de 320-350kg — manobre com cuidado em baixa velocidade',
    body: 'Moto pesada: ~320kg seco / ~350kg úmido. Em manobras de estacionamento e marcha à ré (não motorizada), use as pernas e caminhe a moto devagar — não tente "salvar" um desequilíbrio só com o guidão. O selim baixo ajuda a plantar os pés no chão. A maioria das quedas em baixa velocidade acontece em pisos irregulares, rampas de garagem ou aclives/declives.',
  },
  {
    severity: 'OK',
    title: 'Embreagem multidisco em banho de óleo — robusta, mas cara para trocar',
    body: 'O torque gigantesco do motor exige embreagem reforçada com múltiplos discos em banho de óleo. Ela é confiável desde que o óleo correto seja usado (JASO MA), mas peças de reposição são caras — o kit completo de discos pode passar de R$ 2.000 em oficina especializada Triumph. Evite manter a embreagem parcialmente acionada por muito tempo no trânsito — isso acelera o desgaste dos discos.',
  },
  {
    severity: 'OK',
    title: 'Rodagem inicial: respeite os primeiros 1.500 km',
    body: 'O motor gigante tem tolerâncias internas maiores para dissipar calor — a rodagem é mais importante do que em motores pequenos. Primeiros 1.000 km: evite ultrapassar 4.000 rpm. Até 1.500 km: varie a rotação, evite manter regime constante em rodovia por longos trechos. Vale trocar o óleo aos 1.000 km mesmo que o manual não exija — o motor "limpa" resíduos de amaciamento.',
  },
]

const ROCKET3_OLD_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Falhas elétricas de ignição documentadas — moto pode desligar em movimento',
    body: 'A primeira geração da Rocket III ficou conhecida por relatos de falha de ignição, com a moto desligando inesperadamente, inclusive em movimento (documentado em fóruns como o Triumph Rat Motorcycle Forums). Causa comum: conectores do chicote elétrico oxidados ou módulo de ignição com falha intermitente. Verifique periodicamente o aterramento e os conectores da bateria/motor de partida. Se o desligamento persistir, um mecânico especializado em elétrica Triumph deve escanear todo o sistema.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento no retentor de saída do cardã após alta quilometragem',
    body: 'Após 40.000-60.000 km, o retentor de saída do cardã (na caixa de redução final/bevel box) pode começar a vazar óleo hipoide. Sintoma: mancha de óleo na roda traseira ou no pneu — risco real de escorregar em curva se o óleo atingir a banda de rodagem. O retentor de reposição tem código específico Triumph — encomende em concessionária ou fornecedor de peças britânicas. Verifique o nível do bevel box a cada revisão.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem escorregando sob aceleração forte',
    body: 'Há relatos de desgaste prematuro dos discos de embreagem, especialmente em motos usadas com aceleração agressiva desde cedo — o torque de 200-221Nm castiga a embreagem. Sintoma: a rotação sobe sem ganho proporcional de velocidade em marchas altas sob aceleração total. Antes de suspeitar de desgaste real dos discos, verifique o nível e a qualidade do óleo — óleo sem JASO MA acelera bastante o escorregamento.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste acelerado do pneu traseiro 240mm',
    body: 'O pneu traseiro larguíssimo desgasta de forma desigual — mais no centro pela tração constante do motor de altíssimo torque, especialmente em uso urbano com acelerações frequentes. Vida útil: 8.000-12.000 km em uso agressivo, até 15.000-18.000 km em uso tranquilo. Rode com a pressão correta (36/42 PSI) para maximizar a vida útil e evite arrancadas bruscas constantes.',
  },
  {
    severity: 'WARN',
    title: 'Peças cromadas oxidando em clima úmido tropical',
    body: 'Unidades expostas a clima tropical (como o Brasil) sofrem oxidação em peças cromadas — canos de escape, carenagem do motor — mais rápido do que no Reino Unido, onde a moto foi projetada. Lave e encere o cromado regularmente, aplique produto anticorrosivo (tipo ACF-50) antes de temporadas chuvosas, principalmente se a moto ficar exposta ao relento.',
  },
  {
    severity: 'WARN',
    title: 'Peso elevado dificulta a recuperação de quedas em baixa velocidade',
    body: 'Com 320-350kg, uma queda em baixa velocidade (estacionamento, manobra) é difícil de segurar sozinho. Retrovisores, alavancas e a carenagem do tanque quebram com facilidade em tombamentos. Considere protetores de motor (crash bars) aftermarket — a Rocket III não trazia isso de fábrica na maioria das versões.',
  },
]

const ROCKET3_OLD_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo Rocket III 2300cc (padrão/Classic/Roadster)',
    body: '1.000 km — Troca de óleo inicial (recomendado, mesmo com motor de rodagem tolerante). | 10.000 km — Troca de óleo 15W-50 JASO MA (5,4L) + filtro. Verificar velas NGK DPR7EA-9 (gap 0,9mm). | 16.000-20.000 km — Trocar velas (as 3 juntas). Verificar/regular folga de válvulas (motor frio, DOHC 12 válvulas). Verificar nível do óleo do bevel box (cardã) — trocar preventivamente a cada 20.000 km (ou antes, a cada 5.000-8.000 km, por relatos de borra metálica). | 20.000 km / 24 meses — Fluido de freio DOT 4 (frente e trás). Inspecionar embreagem (nível e condição do óleo, desgaste dos discos). | 30.000 km — Inspecionar retentor de saída do cardã. Rolamentos de roda. | 40.000 km — Revisão geral da suspensão traseira monoamortecida e das bengalas dianteiras (retentores).',
  },
]

// ─── ROCKET 3 2500cc (geração atual GT/R, 2020+) ─────────────────────────────
// Motor: 2458cc tricilíndrico DOHC 12v refrigerado a líquido — maior motor de moto de produção em série do mundo
// Rocket 3 R/GT (2020-2023): 167cv @ 6.000rpm | 221Nm @ 4.000rpm — maior torque de produção em série do mundo
// Rocket 3 STORM Edition GT/R (2024+): 180cv @ 7.000rpm | 225Nm @ 4.000rpm
// Black Edition: pacote estético sobre a versão R, mesma mecânica de 167cv/221Nm
// Óleo 15W-50 JASO MA API SH ~4L com filtro (confirme valor exato no manual do ano/versão) | Vela NGK LMAR8A-9 gap 0,9mm
// Transmissão final por cardã com bevel box — óleo hipoide 75W-90 GL5 (~170mL, completar até o nível)
// Pneu: 150/80R17 (F) / 240/50R16 (R) Avon Cobra Chrome | Peso: ~291-320kg conforme versão | Tanque: 18L

const ROCKET3_NEW_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 15W-50 JASO MA — troca a cada 16.000 km/10.000 milhas ou 12 meses',
    body: 'O motor 2458cc (o maior de moto de série do mundo) usa óleo semissintético/sintético 15W-50, no mínimo API SH, com certificação JASO MA — obrigatório pela embreagem multidisco em banho de óleo. Capacidade aproximada de 4L na troca com filtro (confirme a quantidade exata no manual do proprietário do seu ano/versão — há alguma variação entre fontes/anos). Filtro original Triumph T1218001 (equivalente Hiflofiltro HF204RC). Intervalo oficial: 16.000 km/10.000 milhas ou 12 meses.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK LMAR8A-9 gap 0,9mm — troca junto com a folga de válvulas',
    body: 'Vela laser platinum NGK LMAR8A-9, gap de fábrica 0,9mm. Atenção: é diferente da vela da geração antiga (DPR7EA-9) — os códigos não são intercambiáveis, confira antes de comprar. Intervalo: 32.000 km/20.000 milhas, feito junto com a checagem/regulagem da folga de válvulas e do tempo de comando (motor DOHC 12 válvulas).',
  },
  {
    severity: 'WARN',
    title: 'Cardã: verifique o óleo do bevel box a cada 32.000 km',
    body: 'A transmissão final por cardã elimina toda a manutenção de corrente, mas exige atenção ao óleo hipoide 75W-90 API GL5 da caixa de redução final (bevel box). Capacidade pequena (~170mL a seco) — complete até o nível indicado pelo bujão, não um volume fixo. Intervalo oficial: 32.000 km/20.000 milhas. Sinal de alerta: ruído metálico ou folga perceptível na transmissão em baixa rotação.',
  },
  {
    severity: 'WARN',
    title: 'Pneu traseiro 240/50R16 Avon Cobra Chrome — desgaste acelerado pelo torque recorde',
    body: 'Pneu traseiro original Avon Cobra Chrome 240/50R16 — um dos mais largos do mercado. Com 221-225Nm de torque, o desgaste no centro da banda é rápido em uso urbano com acelerações frequentes. Pressão de referência: versão R 33-34 PSI (F) / 42 PSI (R); versão GT 36 PSI (F) / 42 PSI (R). Alternativas quando disponíveis na medida 240/50R16: Metzeler Cruisetec, Bridgestone Battlecruise.',
  },
  {
    severity: 'OK',
    title: 'Diferenças entre GT e R — escolha conforme o uso',
    body: 'A versão R tem guidão baixo e postura mais esportiva/naked (pressão dianteira de referência ~33-34 PSI); a GT tem guidão alto, estribos avançados e postura touring/cruiser mais relaxada (pressão dianteira ~36 PSI, banco mais baixo, a 750mm do chão). A mecânica é idêntica — mesmo motor 2458cc — a escolha entre as duas é só de ergonomia e proposta de uso.',
  },
  {
    severity: 'OK',
    title: 'Black Edition e STORM Edition — confirme a versão exata na hora de comprar peças',
    body: 'A Black Edition é um pacote estético sobre a R (acabamento escurecido em componentes cromados), com a mesma mecânica de 167cv/221Nm. Já a STORM Edition (2024+) tem motor revisado, entregando 180cv @ 7.000rpm e 225Nm @ 4.000rpm — mais potência real, não só visual. Ao comprar peças de motor (pistão, comando, ECU), confirme a versão exata: a Storm não é 100% intercambiável com R/GT anteriores em todos os componentes internos.',
  },
  {
    severity: 'OK',
    title: 'Moto de nicho premium no Brasil — planeje peças e serviço com antecedência',
    body: 'A Rocket 3 é o modelo mais exclusivo e exótico da linha Triumph, com forte apelo no mercado premium brasileiro em expansão — poder aquisitivo maior e procura crescente por exclusividade. A rede de concessionárias Triumph ainda é pequena no Brasil, e peças específicas (componentes do cardã, ECU, suspensão eletrônica Showa) muitas vezes vêm sob encomenda. Planeje revisões com antecedência e mantenha o contato de uma concessionária que atenda a marca na sua região.',
  },
]

const ROCKET3_NEW_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall 2020-2021: ar no sistema de freio ABS traseiro',
    body: 'Recall oficial cobrindo Rocket 3 GT, R e TFC de 2020-2021: ar preso no modulador do ABS podia piorar a eficiência do freio traseiro, aumentando a distância de frenagem e o risco de acidente. A Triumph convocou os proprietários para sangria gratuita do sistema em concessionária. Se você comprou uma unidade usada desse período, confirme pelo número de chassi se o recall já foi executado.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem com relatos de desgaste prematuro/escorregamento',
    body: 'Proprietários relatam escorregamento da embreagem sob aceleração "normal" em algumas unidades, mesmo com poucos km rodados. Antes de suspeitar de desgaste real dos discos, verifique o nível e a qualidade do óleo (JASO MA obrigatório). Se o escorregamento persistir mesmo com óleo correto e nível certo, é caso de inspeção dos discos de embreagem na concessionária.',
  },
  {
    severity: 'WARN',
    title: 'Dificuldade em encontrar o neutro / "falso neutro" na segunda marcha',
    body: 'Relato comum em fóruns de proprietários (R3Owners): dificuldade de engatar o neutro, às vezes precisando descer até a primeira marcha; e um "falso neutro" na segunda marcha, em que a moto se comporta como se estivesse em neutro mesmo estando engatada. Verifique o nível do óleo do motor/câmbio (compartilhado) e a folga da embreagem antes de levar à revisão — muitas vezes é regulagem, não defeito mecânico.',
  },
  {
    severity: 'WARN',
    title: 'Quickshifter — folga ou "clunk" ao reposicionar os comandos',
    body: 'Ao reposicionar os comandos de câmbio (pedaleira) para outra altura, alguns proprietários relatam que o quickshifter perde suavidade e passa a ter uma sensação de "clunk" na atuação completa. Ajuste a haste do sensor de quickshifter proporcionalmente ao novo ângulo da alavanca — na maioria dos casos é desalinhamento mecânico, não defeito de peça.',
  },
  {
    severity: 'WARN',
    title: 'Desgaste acelerado do pneu traseiro 240mm pelo torque monstruoso',
    body: 'Com 221-225Nm de torque, o pneu traseiro 240/50R16 pode durar bem menos que o esperado em uso urbano ou esportivo — há relatos de 6.000-10.000 km em pilotagem agressiva. Rode com a pressão correta e evite arrancadas constantes em primeira/segunda marcha para maximizar a vida útil.',
  },
  {
    severity: 'WARN',
    title: 'Peso elevado (~291-320kg) exige atenção redobrada em manobras',
    body: 'Mesmo sendo mais leve que a geração anterior (redução de dezenas de kg), a Rocket 3 ainda pesa entre 291kg e 320kg conforme a versão — uma das motos de produção em série mais pesadas da categoria naked/cruiser. Em pisos irregulares, rampas de garagem ou meia-volta (U-turn), use as pernas para equilibrar e nunca tente segurá-la só com o guidão em baixa velocidade.',
  },
]

const ROCKET3_NEW_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo Rocket 3 GT/R/Black Edition/STORM Edition',
    body: '1.000 km — Revisão inicial de entrega (verificação geral, torque de parafusos). | 16.000 km / 12 meses — Troca de óleo 15W-50 JASO MA (~4L, confirme no manual) + filtro Triumph T1218001. Trocar filtro de ar e filtro de combustível. | 32.000 km / 24 meses — Trocar velas NGK LMAR8A-9 (gap 0,9mm). Checar/regular folga de válvulas e tempo de comando. Trocar óleo do bevel box (cardã) 75W-90 GL5. | 24 meses — Fluido de freio DOT 4 e fluido de embreagem (ambos hidráulicos). | 36 meses — Trocar líquido de arrefecimento. | 40.000-50.000 km — Inspecionar retentores de bengala/monoamortecedor traseiro Showa, rolamentos de roda; confirmar execução do recall do sistema ABS se a unidade for 2020-2021.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'ROCKET III 2300cc',
    yearFrom: 2004,
    yearTo: 2017,
    MACETES: ROCKET3_OLD_MACETES,
    PROBLEMAS: ROCKET3_OLD_PROBLEMAS,
    MANUTENCAO: ROCKET3_OLD_MANUTENCAO,
  },
  {
    modelName: 'ROCKET III CLASSIC 2300cc',
    yearFrom: 2006,
    yearTo: 2017,
    MACETES: ROCKET3_OLD_MACETES,
    PROBLEMAS: ROCKET3_OLD_PROBLEMAS,
    MANUTENCAO: ROCKET3_OLD_MANUTENCAO,
  },
  {
    modelName: 'ROCKET III ROADSTER 2300cc',
    yearFrom: 2010,
    yearTo: 2017,
    MACETES: ROCKET3_OLD_MACETES,
    PROBLEMAS: ROCKET3_OLD_PROBLEMAS,
    MANUTENCAO: ROCKET3_OLD_MANUTENCAO,
  },
  {
    modelName: 'ROCKET III GT 2500cc',
    yearFrom: 2020,
    yearTo: 2023,
    MACETES: ROCKET3_NEW_MACETES,
    PROBLEMAS: ROCKET3_NEW_PROBLEMAS,
    MANUTENCAO: ROCKET3_NEW_MANUTENCAO,
  },
  {
    modelName: 'ROCKET III R 2500cc',
    yearFrom: 2020,
    yearTo: 2023,
    MACETES: ROCKET3_NEW_MACETES,
    PROBLEMAS: ROCKET3_NEW_PROBLEMAS,
    MANUTENCAO: ROCKET3_NEW_MANUTENCAO,
  },
  {
    modelName: 'ROCKET III R Black Edition 2500cc',
    yearFrom: 2021,
    yearTo: 2023,
    MACETES: ROCKET3_NEW_MACETES,
    PROBLEMAS: ROCKET3_NEW_PROBLEMAS,
    MANUTENCAO: ROCKET3_NEW_MANUTENCAO,
  },
  {
    modelName: 'ROCKET III STORM Edition GT 2500cc',
    yearFrom: 2024,
    yearTo: null,
    MACETES: ROCKET3_NEW_MACETES,
    PROBLEMAS: ROCKET3_NEW_PROBLEMAS,
    MANUTENCAO: ROCKET3_NEW_MANUTENCAO,
  },
  {
    modelName: 'ROCKET III STORM Edition R 2500cc',
    yearFrom: 2024,
    yearTo: null,
    MACETES: ROCKET3_NEW_MACETES,
    PROBLEMAS: ROCKET3_NEW_PROBLEMAS,
    MANUTENCAO: ROCKET3_NEW_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'ROCKET III 2300cc',
    yearFrom: 2004, yearTo: 2017,
    tireSize: '150/80-17 (F) · 240/50-16 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 44,
    notes: 'Solo: F 36 / R 42 PSI. Com carona/bagagem: F 36 / R 44 PSI. Pneu traseiro original Metzeler ME880 Marathon ou Avon Cobra 240/50-16 — o mais largo produzido em série na época. Poucos pontos de venda no Brasil, encomende com antecedência.',
  },
  {
    modelName: 'ROCKET III CLASSIC 2300cc',
    yearFrom: 2006, yearTo: 2017,
    tireSize: '150/80-17 (F) · 240/50-16 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 44,
    notes: 'Solo: F 36 / R 42 PSI. Com carona/bagagem: F 36 / R 44 PSI. Mesma roda/pneu do modelo padrão — versão touring com para-brisa e malas de fábrica.',
  },
  {
    modelName: 'ROCKET III ROADSTER 2300cc',
    yearFrom: 2010, yearTo: 2017,
    tireSize: '150/80-17 (F) · 240/50-16 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 44,
    notes: 'Solo: F 36 / R 42 PSI. Com carona/bagagem: F 36 / R 44 PSI. Versão naked mais esportiva (146cv/221Nm), bengala invertida — mesma medida de pneus do restante da linha.',
  },
  {
    modelName: 'ROCKET III GT 2500cc',
    yearFrom: 2020, yearTo: 2023,
    tireSize: '150/80R17 (F) · 240/50R16 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 44,
    notes: 'Solo: F 36 / R 42 PSI. Com carona/bagagem: F 36 / R 44 PSI. Pneu original Avon Cobra Chrome. Versão touring/cruiser com guidão alto e postura relaxada.',
  },
  {
    modelName: 'ROCKET III R 2500cc',
    yearFrom: 2020, yearTo: 2023,
    tireSize: '150/80R17 (F) · 240/50R16 (R)',
    frontPsi: 33, rearPsi: 42,
    frontPsiLoad: 34, rearPsiLoad: 44,
    notes: 'Solo: F 33 / R 42 PSI. Com carona/bagagem: F 34 / R 44 PSI. Pneu original Avon Cobra Chrome. Versão roadster com guidão baixo — pressão dianteira menor que a GT.',
  },
  {
    modelName: 'ROCKET III R Black Edition 2500cc',
    yearFrom: 2021, yearTo: 2023,
    tireSize: '150/80R17 (F) · 240/50R16 (R)',
    frontPsi: 33, rearPsi: 42,
    frontPsiLoad: 34, rearPsiLoad: 44,
    notes: 'Solo: F 33 / R 42 PSI. Com carona/bagagem: F 34 / R 44 PSI. Pacote estético sobre a R — mesma geometria e pressões de pneu.',
  },
  {
    modelName: 'ROCKET III STORM Edition GT 2500cc',
    yearFrom: 2024, yearTo: null,
    tireSize: '150/80R17 (F) · 240/50R16 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 44,
    notes: 'Solo: F 36 / R 42 PSI. Com carona/bagagem: F 36 / R 44 PSI. Motor revisado (180cv/225Nm) — mesma medida e pressão de pneu da GT anterior.',
  },
  {
    modelName: 'ROCKET III STORM Edition R 2500cc',
    yearFrom: 2024, yearTo: null,
    tireSize: '150/80R17 (F) · 240/50R16 (R)',
    frontPsi: 33, rearPsi: 42,
    frontPsiLoad: 34, rearPsiLoad: 44,
    notes: 'Solo: F 33 / R 42 PSI. Com carona/bagagem: F 34 / R 44 PSI. Motor revisado (180cv/225Nm) — desgaste do pneu traseiro ainda mais rápido pelo ganho de potência.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // ROCKET III 2300cc
  { modelName: 'ROCKET III 2300cc', yearFrom: 2004, yearTo: 2017, component: 'Óleo 15W-50 JASO MA (5,4L com filtro)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 2294cc. Nunca usar óleo sem certificação JASO MA (compartilha com a embreagem).', priority: 'HIGH', order: 1 },
  { modelName: 'ROCKET III 2300cc', yearFrom: 2004, yearTo: 2017, component: 'Velas NGK DPR7EA-9 ×3 (gap 0,9mm)', intervalKm: 16000, intervalMonths: null, notes: 'Motor tricilíndrico — trocar as 3 velas juntas.', priority: 'MEDIUM', order: 2 },
  { modelName: 'ROCKET III 2300cc', yearFrom: 2004, yearTo: 2017, component: 'Óleo do bevel box/cardã 75W-90 GL5', intervalKm: 20000, intervalMonths: null, notes: 'Capacidade ~170mL a seco — completar até o nível do bujão. Muitos donos trocam a cada 5.000-8.000km por relatos de borra metálica.', priority: 'HIGH', order: 3 },
  { modelName: 'ROCKET III 2300cc', yearFrom: 2004, yearTo: 2017, component: 'Folga de válvulas (DOHC 12 válvulas)', intervalKm: 20000, intervalMonths: 24, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 4 },
  { modelName: 'ROCKET III 2300cc', yearFrom: 2004, yearTo: 2017, component: 'Fluido de freio DOT 4 (frente + trás)', intervalKm: null, intervalMonths: 24, notes: 'Trocar a cada 2 anos independente da km rodada.', priority: 'HIGH', order: 5 },
  { modelName: 'ROCKET III 2300cc', yearFrom: 2004, yearTo: 2017, component: 'Verificação da embreagem multidisco (nível/desgaste)', intervalKm: 20000, intervalMonths: 12, notes: 'Óleo sem JASO MA acelera o escorregamento dos discos.', priority: 'MEDIUM', order: 6 },
  { modelName: 'ROCKET III 2300cc', yearFrom: 2004, yearTo: 2017, component: 'Retentor de saída do cardã — inspeção', intervalKm: 40000, intervalMonths: null, notes: 'Vazamento pode atingir o pneu traseiro — risco de derrapagem em curva.', priority: 'MEDIUM', order: 7 },
  { modelName: 'ROCKET III 2300cc', yearFrom: 2004, yearTo: 2017, component: 'Pneu traseiro 240/50-16 — inspeção de desgaste', intervalKm: 8000, intervalMonths: null, notes: 'Vida útil 8.000-18.000km conforme uso. Poucos pontos de venda no Brasil — planeje a compra.', priority: 'MEDIUM', order: 8 },
  { modelName: 'ROCKET III 2300cc', yearFrom: 2004, yearTo: 2017, component: 'Rolamentos de roda — inspeção', intervalKm: 30000, intervalMonths: null, notes: 'Moto pesada (320-350kg) exige atenção redobrada aos rolamentos.', priority: 'LOW', order: 9 },

  // ROCKET III CLASSIC 2300cc
  { modelName: 'ROCKET III CLASSIC 2300cc', yearFrom: 2006, yearTo: 2017, component: 'Óleo 15W-50 JASO MA (5,4L com filtro)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor 2294cc igual ao modelo padrão.', priority: 'HIGH', order: 1 },
  { modelName: 'ROCKET III CLASSIC 2300cc', yearFrom: 2006, yearTo: 2017, component: 'Velas NGK DPR7EA-9 ×3 (gap 0,9mm)', intervalKm: 16000, intervalMonths: null, notes: 'Trocar as 3 velas juntas.', priority: 'MEDIUM', order: 2 },
  { modelName: 'ROCKET III CLASSIC 2300cc', yearFrom: 2006, yearTo: 2017, component: 'Óleo do bevel box/cardã 75W-90 GL5', intervalKm: 20000, intervalMonths: null, notes: 'Capacidade ~170mL a seco — completar até o nível do bujão.', priority: 'HIGH', order: 3 },
  { modelName: 'ROCKET III CLASSIC 2300cc', yearFrom: 2006, yearTo: 2017, component: 'Folga de válvulas (DOHC 12 válvulas)', intervalKm: 20000, intervalMonths: 24, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 4 },
  { modelName: 'ROCKET III CLASSIC 2300cc', yearFrom: 2006, yearTo: 2017, component: 'Fluido de freio DOT 4 (frente + trás)', intervalKm: null, intervalMonths: 24, notes: 'Trocar a cada 2 anos independente da km rodada.', priority: 'HIGH', order: 5 },
  { modelName: 'ROCKET III CLASSIC 2300cc', yearFrom: 2006, yearTo: 2017, component: 'Verificação da embreagem multidisco (nível/desgaste)', intervalKm: 20000, intervalMonths: 12, notes: 'Óleo sem JASO MA acelera o escorregamento.', priority: 'MEDIUM', order: 6 },
  { modelName: 'ROCKET III CLASSIC 2300cc', yearFrom: 2006, yearTo: 2017, component: 'Retentor de saída do cardã — inspeção', intervalKm: 40000, intervalMonths: null, notes: 'Vazamento pode atingir o pneu traseiro.', priority: 'MEDIUM', order: 7 },
  { modelName: 'ROCKET III CLASSIC 2300cc', yearFrom: 2006, yearTo: 2017, component: 'Pneu traseiro 240/50-16 — inspeção de desgaste', intervalKm: 8000, intervalMonths: null, notes: 'Vida útil 8.000-18.000km conforme uso.', priority: 'MEDIUM', order: 8 },
  { modelName: 'ROCKET III CLASSIC 2300cc', yearFrom: 2006, yearTo: 2017, component: 'Rolamentos de roda — inspeção', intervalKm: 30000, intervalMonths: null, notes: 'Moto pesada — atenção redobrada aos rolamentos.', priority: 'LOW', order: 9 },

  // ROCKET III ROADSTER 2300cc
  { modelName: 'ROCKET III ROADSTER 2300cc', yearFrom: 2010, yearTo: 2017, component: 'Óleo 15W-50 JASO MA (5,4L com filtro)', intervalKm: 10000, intervalMonths: 12, notes: 'Motor mais potente da linha antiga (146cv/221Nm).', priority: 'HIGH', order: 1 },
  { modelName: 'ROCKET III ROADSTER 2300cc', yearFrom: 2010, yearTo: 2017, component: 'Velas NGK DPR7EA-9 ×3 (gap 0,9mm)', intervalKm: 16000, intervalMonths: null, notes: 'Trocar as 3 velas juntas.', priority: 'MEDIUM', order: 2 },
  { modelName: 'ROCKET III ROADSTER 2300cc', yearFrom: 2010, yearTo: 2017, component: 'Óleo do bevel box/cardã 75W-90 GL5', intervalKm: 20000, intervalMonths: null, notes: 'Capacidade ~170mL a seco — completar até o nível do bujão. Torque maior acelera o consumo/desgaste.', priority: 'HIGH', order: 3 },
  { modelName: 'ROCKET III ROADSTER 2300cc', yearFrom: 2010, yearTo: 2017, component: 'Folga de válvulas (DOHC 12 válvulas)', intervalKm: 20000, intervalMonths: 24, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 4 },
  { modelName: 'ROCKET III ROADSTER 2300cc', yearFrom: 2010, yearTo: 2017, component: 'Fluido de freio DOT 4 (frente + trás)', intervalKm: null, intervalMonths: 24, notes: 'Trocar a cada 2 anos independente da km rodada.', priority: 'HIGH', order: 5 },
  { modelName: 'ROCKET III ROADSTER 2300cc', yearFrom: 2010, yearTo: 2017, component: 'Verificação da embreagem multidisco (nível/desgaste)', intervalKm: 20000, intervalMonths: 12, notes: 'Torque de 221Nm castiga a embreagem — verifique escorregamento.', priority: 'MEDIUM', order: 6 },
  { modelName: 'ROCKET III ROADSTER 2300cc', yearFrom: 2010, yearTo: 2017, component: 'Retentor de saída do cardã — inspeção', intervalKm: 40000, intervalMonths: null, notes: 'Vazamento pode atingir o pneu traseiro.', priority: 'MEDIUM', order: 7 },
  { modelName: 'ROCKET III ROADSTER 2300cc', yearFrom: 2010, yearTo: 2017, component: 'Pneu traseiro 240/50-16 — inspeção de desgaste', intervalKm: 7000, intervalMonths: null, notes: 'Versão mais esportiva — desgaste um pouco mais rápido que a padrão/Classic.', priority: 'MEDIUM', order: 8 },
  { modelName: 'ROCKET III ROADSTER 2300cc', yearFrom: 2010, yearTo: 2017, component: 'Rolamentos de roda — inspeção', intervalKm: 30000, intervalMonths: null, notes: 'Bengala invertida — inspecionar retentores junto.', priority: 'LOW', order: 9 },

  // ROCKET III GT 2500cc
  { modelName: 'ROCKET III GT 2500cc', yearFrom: 2020, yearTo: 2023, component: 'Óleo 15W-50 JASO MA (~4L com filtro)', intervalKm: 16000, intervalMonths: 12, notes: 'Motor 2458cc. Filtro Triumph T1218001 (equiv. Hiflofiltro HF204RC). Confirme capacidade exata no manual.', priority: 'HIGH', order: 1 },
  { modelName: 'ROCKET III GT 2500cc', yearFrom: 2020, yearTo: 2023, component: 'Velas NGK LMAR8A-9 ×3 (gap 0,9mm)', intervalKm: 32000, intervalMonths: 24, notes: 'Código diferente do modelo antigo (DPR7EA-9) — não intercambiável.', priority: 'MEDIUM', order: 2 },
  { modelName: 'ROCKET III GT 2500cc', yearFrom: 2020, yearTo: 2023, component: 'Folga de válvulas + tempo de comando', intervalKm: 32000, intervalMonths: 24, notes: 'DOHC 12 válvulas. Feito junto com a troca de velas.', priority: 'HIGH', order: 3 },
  { modelName: 'ROCKET III GT 2500cc', yearFrom: 2020, yearTo: 2023, component: 'Óleo do bevel box/cardã 75W-90 GL5', intervalKm: 32000, intervalMonths: null, notes: 'Capacidade ~170mL a seco — completar até o nível do bujão.', priority: 'HIGH', order: 4 },
  { modelName: 'ROCKET III GT 2500cc', yearFrom: 2020, yearTo: 2023, component: 'Fluido de freio DOT 4 + fluido de embreagem', intervalKm: null, intervalMonths: 24, notes: 'Ambos hidráulicos — trocar juntos a cada 2 anos.', priority: 'HIGH', order: 5 },
  { modelName: 'ROCKET III GT 2500cc', yearFrom: 2020, yearTo: 2023, component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 36, notes: 'Trocar a cada 3 anos independente da km.', priority: 'MEDIUM', order: 6 },
  { modelName: 'ROCKET III GT 2500cc', yearFrom: 2020, yearTo: 2023, component: 'Filtro de ar e filtro de combustível', intervalKm: 16000, intervalMonths: 12, notes: 'Trocar junto com a revisão de óleo.', priority: 'MEDIUM', order: 7 },
  { modelName: 'ROCKET III GT 2500cc', yearFrom: 2020, yearTo: 2023, component: 'Pneu traseiro 240/50R16 Avon Cobra Chrome — inspeção', intervalKm: 8000, intervalMonths: null, notes: 'Torque recorde (221Nm) acelera o desgaste no centro da banda.', priority: 'MEDIUM', order: 8 },
  { modelName: 'ROCKET III GT 2500cc', yearFrom: 2020, yearTo: 2023, component: 'Recall ABS (ar no sistema) — verificação', intervalKm: null, intervalMonths: null, notes: 'Unidades 2020-2021: confirme pelo chassi se o recall já foi executado na concessionária.', priority: 'CRITICAL', order: 9 },

  // ROCKET III R 2500cc
  { modelName: 'ROCKET III R 2500cc', yearFrom: 2020, yearTo: 2023, component: 'Óleo 15W-50 JASO MA (~4L com filtro)', intervalKm: 16000, intervalMonths: 12, notes: 'Motor 2458cc. Filtro Triumph T1218001. Confirme capacidade exata no manual.', priority: 'HIGH', order: 1 },
  { modelName: 'ROCKET III R 2500cc', yearFrom: 2020, yearTo: 2023, component: 'Velas NGK LMAR8A-9 ×3 (gap 0,9mm)', intervalKm: 32000, intervalMonths: 24, notes: 'Não intercambiável com a vela da geração antiga.', priority: 'MEDIUM', order: 2 },
  { modelName: 'ROCKET III R 2500cc', yearFrom: 2020, yearTo: 2023, component: 'Folga de válvulas + tempo de comando', intervalKm: 32000, intervalMonths: 24, notes: 'DOHC 12 válvulas. Feito junto com a troca de velas.', priority: 'HIGH', order: 3 },
  { modelName: 'ROCKET III R 2500cc', yearFrom: 2020, yearTo: 2023, component: 'Óleo do bevel box/cardã 75W-90 GL5', intervalKm: 32000, intervalMonths: null, notes: 'Capacidade ~170mL a seco — completar até o nível do bujão.', priority: 'HIGH', order: 4 },
  { modelName: 'ROCKET III R 2500cc', yearFrom: 2020, yearTo: 2023, component: 'Fluido de freio DOT 4 + fluido de embreagem', intervalKm: null, intervalMonths: 24, notes: 'Ambos hidráulicos — trocar juntos a cada 2 anos.', priority: 'HIGH', order: 5 },
  { modelName: 'ROCKET III R 2500cc', yearFrom: 2020, yearTo: 2023, component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 36, notes: 'Trocar a cada 3 anos independente da km.', priority: 'MEDIUM', order: 6 },
  { modelName: 'ROCKET III R 2500cc', yearFrom: 2020, yearTo: 2023, component: 'Filtro de ar e filtro de combustível', intervalKm: 16000, intervalMonths: 12, notes: 'Trocar junto com a revisão de óleo.', priority: 'MEDIUM', order: 7 },
  { modelName: 'ROCKET III R 2500cc', yearFrom: 2020, yearTo: 2023, component: 'Pneu traseiro 240/50R16 Avon Cobra Chrome — inspeção', intervalKm: 7000, intervalMonths: null, notes: 'Postura mais esportiva — desgaste mais rápido que a GT.', priority: 'MEDIUM', order: 8 },
  { modelName: 'ROCKET III R 2500cc', yearFrom: 2020, yearTo: 2023, component: 'Recall ABS (ar no sistema) — verificação', intervalKm: null, intervalMonths: null, notes: 'Unidades 2020-2021: confirme pelo chassi se o recall já foi executado na concessionária.', priority: 'CRITICAL', order: 9 },

  // ROCKET III R Black Edition 2500cc
  { modelName: 'ROCKET III R Black Edition 2500cc', yearFrom: 2021, yearTo: 2023, component: 'Óleo 15W-50 JASO MA (~4L com filtro)', intervalKm: 16000, intervalMonths: 12, notes: 'Mesma mecânica da R (167cv/221Nm) — pacote é só estético.', priority: 'HIGH', order: 1 },
  { modelName: 'ROCKET III R Black Edition 2500cc', yearFrom: 2021, yearTo: 2023, component: 'Velas NGK LMAR8A-9 ×3 (gap 0,9mm)', intervalKm: 32000, intervalMonths: 24, notes: 'Não intercambiável com a vela da geração antiga.', priority: 'MEDIUM', order: 2 },
  { modelName: 'ROCKET III R Black Edition 2500cc', yearFrom: 2021, yearTo: 2023, component: 'Folga de válvulas + tempo de comando', intervalKm: 32000, intervalMonths: 24, notes: 'DOHC 12 válvulas. Feito junto com a troca de velas.', priority: 'HIGH', order: 3 },
  { modelName: 'ROCKET III R Black Edition 2500cc', yearFrom: 2021, yearTo: 2023, component: 'Óleo do bevel box/cardã 75W-90 GL5', intervalKm: 32000, intervalMonths: null, notes: 'Capacidade ~170mL a seco — completar até o nível do bujão.', priority: 'HIGH', order: 4 },
  { modelName: 'ROCKET III R Black Edition 2500cc', yearFrom: 2021, yearTo: 2023, component: 'Fluido de freio DOT 4 + fluido de embreagem', intervalKm: null, intervalMonths: 24, notes: 'Ambos hidráulicos — trocar juntos a cada 2 anos.', priority: 'HIGH', order: 5 },
  { modelName: 'ROCKET III R Black Edition 2500cc', yearFrom: 2021, yearTo: 2023, component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 36, notes: 'Trocar a cada 3 anos independente da km.', priority: 'MEDIUM', order: 6 },
  { modelName: 'ROCKET III R Black Edition 2500cc', yearFrom: 2021, yearTo: 2023, component: 'Filtro de ar e filtro de combustível', intervalKm: 16000, intervalMonths: 12, notes: 'Trocar junto com a revisão de óleo.', priority: 'MEDIUM', order: 7 },
  { modelName: 'ROCKET III R Black Edition 2500cc', yearFrom: 2021, yearTo: 2023, component: 'Pneu traseiro 240/50R16 Avon Cobra Chrome — inspeção', intervalKm: 7000, intervalMonths: null, notes: 'Postura esportiva — desgaste mais rápido que a GT.', priority: 'MEDIUM', order: 8 },
  { modelName: 'ROCKET III R Black Edition 2500cc', yearFrom: 2021, yearTo: 2023, component: 'Recall ABS (ar no sistema) — verificação', intervalKm: null, intervalMonths: null, notes: 'Confirme pelo chassi se o recall de 2020-2021 já foi executado na concessionária.', priority: 'CRITICAL', order: 9 },

  // ROCKET III STORM Edition GT 2500cc
  { modelName: 'ROCKET III STORM Edition GT 2500cc', yearFrom: 2024, yearTo: null, component: 'Óleo 15W-50 JASO MA (~4L com filtro)', intervalKm: 16000, intervalMonths: 12, notes: 'Motor revisado (180cv/225Nm). Filtro Triumph T1218001. Confirme capacidade exata no manual.', priority: 'HIGH', order: 1 },
  { modelName: 'ROCKET III STORM Edition GT 2500cc', yearFrom: 2024, yearTo: null, component: 'Velas NGK LMAR8A-9 ×3 (gap 0,9mm)', intervalKm: 32000, intervalMonths: 24, notes: 'Confirme código na concessionária — motor revisado pode ter especificação atualizada.', priority: 'MEDIUM', order: 2 },
  { modelName: 'ROCKET III STORM Edition GT 2500cc', yearFrom: 2024, yearTo: null, component: 'Folga de válvulas + tempo de comando', intervalKm: 32000, intervalMonths: 24, notes: 'DOHC 12 válvulas. Feito junto com a troca de velas.', priority: 'HIGH', order: 3 },
  { modelName: 'ROCKET III STORM Edition GT 2500cc', yearFrom: 2024, yearTo: null, component: 'Óleo do bevel box/cardã 75W-90 GL5', intervalKm: 32000, intervalMonths: null, notes: 'Capacidade ~170mL a seco — completar até o nível do bujão.', priority: 'HIGH', order: 4 },
  { modelName: 'ROCKET III STORM Edition GT 2500cc', yearFrom: 2024, yearTo: null, component: 'Fluido de freio DOT 4 + fluido de embreagem', intervalKm: null, intervalMonths: 24, notes: 'Ambos hidráulicos — trocar juntos a cada 2 anos.', priority: 'HIGH', order: 5 },
  { modelName: 'ROCKET III STORM Edition GT 2500cc', yearFrom: 2024, yearTo: null, component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 36, notes: 'Trocar a cada 3 anos independente da km.', priority: 'MEDIUM', order: 6 },
  { modelName: 'ROCKET III STORM Edition GT 2500cc', yearFrom: 2024, yearTo: null, component: 'Filtro de ar e filtro de combustível', intervalKm: 16000, intervalMonths: 12, notes: 'Trocar junto com a revisão de óleo.', priority: 'MEDIUM', order: 7 },
  { modelName: 'ROCKET III STORM Edition GT 2500cc', yearFrom: 2024, yearTo: null, component: 'Pneu traseiro 240/50R16 Avon Cobra Chrome — inspeção', intervalKm: 7000, intervalMonths: null, notes: 'Ganho de potência (180cv) acelera ainda mais o desgaste do centro da banda.', priority: 'MEDIUM', order: 8 },

  // ROCKET III STORM Edition R 2500cc
  { modelName: 'ROCKET III STORM Edition R 2500cc', yearFrom: 2024, yearTo: null, component: 'Óleo 15W-50 JASO MA (~4L com filtro)', intervalKm: 16000, intervalMonths: 12, notes: 'Motor revisado (180cv/225Nm). Filtro Triumph T1218001. Confirme capacidade exata no manual.', priority: 'HIGH', order: 1 },
  { modelName: 'ROCKET III STORM Edition R 2500cc', yearFrom: 2024, yearTo: null, component: 'Velas NGK LMAR8A-9 ×3 (gap 0,9mm)', intervalKm: 32000, intervalMonths: 24, notes: 'Confirme código na concessionária — motor revisado pode ter especificação atualizada.', priority: 'MEDIUM', order: 2 },
  { modelName: 'ROCKET III STORM Edition R 2500cc', yearFrom: 2024, yearTo: null, component: 'Folga de válvulas + tempo de comando', intervalKm: 32000, intervalMonths: 24, notes: 'DOHC 12 válvulas. Feito junto com a troca de velas.', priority: 'HIGH', order: 3 },
  { modelName: 'ROCKET III STORM Edition R 2500cc', yearFrom: 2024, yearTo: null, component: 'Óleo do bevel box/cardã 75W-90 GL5', intervalKm: 32000, intervalMonths: null, notes: 'Capacidade ~170mL a seco — completar até o nível do bujão.', priority: 'HIGH', order: 4 },
  { modelName: 'ROCKET III STORM Edition R 2500cc', yearFrom: 2024, yearTo: null, component: 'Fluido de freio DOT 4 + fluido de embreagem', intervalKm: null, intervalMonths: 24, notes: 'Ambos hidráulicos — trocar juntos a cada 2 anos.', priority: 'HIGH', order: 5 },
  { modelName: 'ROCKET III STORM Edition R 2500cc', yearFrom: 2024, yearTo: null, component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 36, notes: 'Trocar a cada 3 anos independente da km.', priority: 'MEDIUM', order: 6 },
  { modelName: 'ROCKET III STORM Edition R 2500cc', yearFrom: 2024, yearTo: null, component: 'Filtro de ar e filtro de combustível', intervalKm: 16000, intervalMonths: 12, notes: 'Trocar junto com a revisão de óleo.', priority: 'MEDIUM', order: 7 },
  { modelName: 'ROCKET III STORM Edition R 2500cc', yearFrom: 2024, yearTo: null, component: 'Pneu traseiro 240/50R16 Avon Cobra Chrome — inspeção', intervalKm: 6000, intervalMonths: null, notes: 'Versão mais potente e mais esportiva da linha — maior desgaste de toda a gama.', priority: 'MEDIUM', order: 8 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Triumph Rocket III / Rocket 3...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'TRIUMPH', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'TRIUMPH', vehicleTypeId: motoType.id },
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

  console.log('✅ Triumph Rocket III / Rocket 3 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
