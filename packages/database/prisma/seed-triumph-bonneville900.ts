// seed-triumph-bonneville900.ts — Triumph plataforma "Modern Classics" 900cc (bicilíndrico paralelo
// 270° liquid-cooled): Street Twin, Street Cup, Street Scrambler, Scrambler 900 Stealth/Icon Edition,
// Speed Twin 900 (+ Stealth Edition) — motor 900 High Torque (HT) ~64cv — e Bonneville T100 / T100 Black /
// T100 Stealth Edition — motor 900 High Power (HP) ~64cv em compressão mais alta.
// Triumph tem fábrica em Manaus desde 2017 e essa linha 900cc é a porta de entrada mais popular da marca
// no Brasil (menor imposto de importação, preço mais acessível que Bonneville T120/Speed Twin 1200/Scrambler 1200).
// IMPORTANTE (achado de pesquisa): a Speed Twin 900 é o Street Twin rebatizado em jul/2022 — usa o MESMO
// motor 900 HT (~64cv), NÃO o motor HP mais potente do T100. Não existe uma "Speed Twin 900 High Power" —
// isso só existe na Speed Twin 1200 (motor Thruxton 1200 HP, ~103cv), que é OUTRA plataforma, fora do escopo
// deste seed. Por isso a Speed Twin 900 está classificada aqui junto da família HT (Street Twin/Cup/Scrambler).
// Execute: pnpm --filter @motormacete/database db:seed:triumph-bonneville900
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

// ─── LINHA 900 HT (High Torque) — Street Twin, Street Cup, Street Scrambler, ──
// Scrambler 900 Stealth/Icon Edition, Speed Twin 900 (+ Stealth Edition) ───────
// Motor: 900cc SOHC 8 válvulas, bicilíndrico paralelo 270° liquid-cooled | bore x stroke 84,6 x 80mm
// Compressão 10,55:1 | Potência ~64cv (65PS) @ 7.500 rpm | Torque 80Nm (59 lb-ft) @ 3.800 rpm (geração 2019+)
// Unidades 2016–2018 tinham calibração inicial mais baixa (~54cv) — Triumph reafinou o mapa em 2019.
// Óleo 10W-40 semissintético JASO MA2, 3,2L sem filtro / 3,4L com filtro | Vela NGK LMAR8A-9 gap 0,9–1,0mm
// Corrente 525 | Pneu: Street Twin/Cup/Speed Twin 100/90-18 (F) 18" roda dianteira; Street Scrambler/Scrambler
// 900 100/90-19 (F) 19" roda dianteira (estilo scrambler, maior curso de suspensão) | Tanque: 12L

const HT_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 semissintético JASO MA2 — 3,2L sem filtro / 3,4L com filtro',
    body: 'O motor 900 High Torque (HT) do Street Twin/Cup/Scrambler e da Speed Twin 900 usa embreagem úmida — óleo JASO MA2 é obrigatório (nunca MB, escorrega a embreagem). Capacidade: 3,2L na troca simples, 3,4L quando o filtro também é trocado. Viscosidade recomendada pela Triumph: 10W-40 semissintético (aceita 10W-50/10W-60 full sintético em climas quentes, como o Brasil). Marcas OK: Motul 5100 10W-40, Castrol Power1 10W-40, Mobil Super 4T. Intervalo: 16.000 km ou 12 meses, o que vier primeiro.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK LMAR8A-9 — gap 0,9–1,0mm; iridium de fábrica dura bem',
    body: 'A vela original já é iridium NGK LMAR8A-9 (rosca laser platinum), gap de fábrica 0,9–1,0mm — não regule para menos, é o gap correto para a bobina de ignição do motor 900 HT. Como já vem iridium, a vida útil é longa (na faixa de 16.000–24.000 km), mas vale inspecionar a cada revisão. Custo de reposição: R$ 60–100 a unidade (peça original ou equivalente Denso IUF24).',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 — lubrifique a cada 500–800 km; folga 20–30mm',
    body: 'Toda a família 900 HT usa corrente de transmissão pitch 525. Lubrifique a cada 500–800 km (mais frequente em uso na chuva/poeira) com spray de corrente O-ring compatível (Motul C4, Bardahl). Folga correta no trecho inferior: 20–30mm com a moto no cavalete central. Corrente e kit relação (pinhão + coroa) de referência para a plataforma Bonneville moderna: pitch 525, ~104–108 elos — confirme a contagem exata de elos e dentes na etiqueta do modelo/ano antes de comprar, pois pode variar entre Street Twin, Scrambler e T100.',
  },
  {
    severity: 'WARN',
    title: 'Roda dianteira 18" (Street Twin/Cup/Speed Twin) x 19" (Street Scrambler/Scrambler 900) — não troque pneu sem saber qual é a sua',
    body: 'A família 900 HT tem duas configurações de roda dianteira diferentes: Street Twin, Street Cup e Speed Twin 900 usam roda de 18" com pneu 100/90-18; já o Street Scrambler e as edições Scrambler 900 Stealth/Icon usam roda de 19" (estilo scrambler/off-road, maior curso de suspensão dianteira). Ao comprar pneu de reposição, confirme o aro gravado na lateral da roda — pneus 18" e 19" não são intercambiáveis.',
  },
  {
    severity: 'OK',
    title: 'Folga de válvulas por pastilha sob balde (shim-under-bucket) — verifique a cada 32.000 km',
    body: 'O motor 900 HT usa acionamento de válvulas por balde com pastilha (shim-under-bucket, diâmetro 25mm) — não tem parafuso de regulagem simples como motores mais antigos. Folga de referência: admissão 0,10–0,15mm / escape 0,15–0,20mm, motor frio. O intervalo de checagem é a cada 2 revisões (32.000 km) — mais espaçado que muitos concorrentes japoneses. Esse serviço requer desmontagem do cabeçote e troca de pastilhas por medida — procure oficina especializada em motos britânicas/Triumph, o serviço custa R$ 800–1.500.',
  },
  {
    severity: 'OK',
    title: 'Plataforma compartilhada: peças de suspensão, freio e elétrica intercambiáveis entre variantes',
    body: 'Street Twin, Street Cup, Street Scrambler, Scrambler 900 e Speed Twin 900 compartilham o mesmo chassi tubular de aço e boa parte do motor 900 HT — isso significa que muitas peças de desgaste (pastilhas de freio, retentores de bengala, kit relação, filtro de óleo, bomba d\'água) são intercambiáveis entre as variantes, mesmo com carenagem e guidão diferentes. Útil ao pesquisar peças: procure sempre "Bonneville 900" ou "Street Twin 900" além do nome específico do seu modelo.',
  },
  {
    severity: 'OK',
    title: 'Triumph fabrica no Brasil desde 2017 (Manaus) — linha de entrada da marca mais acessível',
    body: 'A Triumph tem fábrica em Manaus desde 2017, o que reduz a carga de importação e torna a linha 900cc (Street Twin, Street Cup, Street Scrambler, Speed Twin 900) a porta de entrada mais popular da marca no país — mais barata que a Bonneville T120, Speed Twin 1200 ou Scrambler 1200, mas com a mesma identidade retrô britânica. Isso também facilita a disponibilidade de peças de reposição originais em concessionárias, mesmo em cidades menores.',
  },
]

const HT_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Corrosão nos canos de escape cromados — característica de design, não defeito de fábrica',
    body: 'Documentado extensivamente em fóruns Triumph (TriumphRat, The Triumph Forum): os canos de escapamento cromados de parede simples da linha 900 enferrujam/mancham com relativa facilidade, mesmo em unidades novas — o cromado é poroso e não impede 100% a corrosão da base metálica, principalmente sob calor e umidade. Não é falha de garantia coberta na maioria dos casos. Prevenção: aplicar produto anticorrosivo (ACF-50, WD-40 Specialist) após lavagens e no início da estação chuvosa. Manchas leves saem com polidor de metal + palha de aço 0000. Cromado grosso "double wall" (alguns kits pós-venda) resiste mais, mas custa mais caro.',
  },
  {
    severity: 'WARN',
    title: 'Sensor de posição de marcha (gear position sensor) trava e vaza óleo',
    body: 'Problema recorrente na plataforma: o sensor de posição de marcha (que alimenta o indicador de marcha no painel) tem um disco interno que emperra, causando indicador piscando, marcha errada no painel ou travado. Solução caseira reportada em fóruns: remover o sensor, lixar levemente o disco branco interno, regraxar e remontar (~20 min). Também é comum o sensor vazar óleo pelas duas juntas de vedação — troque as juntas (peça barata, R$ 20–40) se notar óleo escorrendo perto da tampa do sensor, geralmente do lado esquerdo do motor.',
  },
  {
    severity: 'WARN',
    title: 'Trepidação de embreagem a frio (clutch judder) — mais comum em unidades 2016–2018',
    body: 'Alguns proprietários (principalmente de unidades de primeira geração, 2016–2018) relatam trepidação/solavanco ao engatar a primeira marcha com o motor frio, como se as placas de embreagem não tivessem atrito consistente. Causas discutidas em fóruns: cabo de embreagem com ponto de acionamento mal ajustado, óleo com viscosidade errada (sempre 10W-40+ JASO MA2, nunca óleo automotivo) ou molas de embreagem fracas. Antes de trocar peças, teste ajustar o cabo de embreagem e trocar o óleo — muitos casos melhoram só com isso.',
  },
  {
    severity: 'WARN',
    title: 'Vazamentos de óleo em múltiplos pontos: cabeçote, bomba d\'água, tampa do pinhão',
    body: 'A família 900 HT tem histórico de pequenos vazamentos de óleo em vários pontos — junta do cabeçote, bomba d\'água (localizada atrás do cilindro dianteiro), sensor de posição de marcha e tampa do pinhão/corrente. Nenhum costuma ser grave isoladamente, mas exige atenção: verifique o chão sob a moto semanalmente e o nível de óleo a cada 1.000 km. Vazamentos persistentes que não somem após reaperto de parafusos (torque de fábrica, não force) indicam troca de junta/retentor — trabalho de oficina especializada, R$ 200–500 dependendo do ponto.',
  },
  {
    severity: 'WARN',
    title: 'Perda de potência/corte em aceleração plena (relatos com "throttle by wire")',
    body: 'Alguns proprietários de Street Twin 900 (principalmente 2022+) relatam perda de potência ou engasgo em aceleração de 90–100% do acelerador, inclusive em ponto morto, sem código de falha genérico no painel. O sistema é throttle-by-wire (acelerador eletrônico, sem cabo mecânico direto). Se isso ocorrer, leve à concessionária para leitura de código específico Triumph (nem sempre aparece em scanner OBD genérico) — pode ser sensor de posição do acelerador (TPS) ou bico injetor sujo. Limpeza de bico injetor em manutenção preventiva (a cada 20.000 km) ajuda a prevenir.',
  },
]

const HT_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Street Twin/Cup/Scrambler/Speed Twin 900 (motor 900 HT)',
    body: '1.000 km — Revisão de amaciamento (verificação geral, sem troca de óleo obrigatória neste motor). | 16.000 km / 12 meses — Troca de óleo (10W-40 JASO MA2, 3,2–3,4L) + filtro de óleo. Verificar vela NGK LMAR8A-9. Lubrificar corrente 525 (a cada 500–800 km, contínuo). Verificar folga de corrente (20–30mm). Trocar filtro de ar. | 32.000 km / 24 meses — Segunda troca de óleo + filtro. Checagem de folga de válvulas (shim-under-bucket, adm 0,10–0,15mm / esc 0,15–0,20mm). Fluido de freio DOT 4 (bienal). Inspeção do sensor de posição de marcha (vazamento/disco travado). | 48.000 km — Kit relação (corrente + pinhão + coroa) se desgastado. Inspeção de bomba d\'água e mangueiras. | Anual — Aplicar anticorrosivo nos canos de escape cromados antes do período chuvoso.',
  },
]

// ─── LINHA 900 HP (High Power) — Bonneville T100, T100 Black, ────────────────
// T100 Stealth Edition ─────────────────────────────────────────────────────────
// Motor: 900cc SOHC 8 válvulas, bicilíndrico paralelo 270° liquid-cooled | bore x stroke 84,6 x 80mm
// Compressão 11:1 (mais alta que o HT) | Potência ~64cv @ 7.400 rpm | Torque 80Nm (59 lb-ft) @ 3.750 rpm
// (geração 2021+; unidades 2016–2020 têm calibração de motor ligeiramente diferente)
// Óleo 10W-40 semissintético JASO MA2, mesma capacidade da linha HT | Vela NGK LMAR8A-9 gap 0,9–1,0mm
// Corrente 525 | Pneu: 100/90-18 (F) · 150/70-17 (R) — rodas raiadas (spoked), exigem câmara de ar
// mesmo com pneu tipo "tubeless" | Tanque: 14,5L

const HP_MACETES: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Roda raiada (spoked) exige câmara de ar — mesmo com pneu marcado "tubeless"',
    body: 'A Bonneville T100 (e variantes Black/Stealth Edition) tem rodas raiadas (com raios), que NÃO vedam ar sozinhas — diferente das rodas de liga fundida do Street Twin. Isso significa que é obrigatório usar câmara de ar internamente, mesmo instalando um pneu com a marcação "tubeless" no flanco. Rodar sem câmara em roda raiada resulta em perda de pressão lenta e risco de desconexão do talão em curva. Ao trocar pneu, informe ao borracheiro que é roda raiada — ele deve montar com câmara nova e talco entre pneu e câmara para reduzir atrito.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 semissintético JASO MA2 — mesma capacidade da linha 900 HT',
    body: 'O motor 900 High Power (HP) da T100 compartilha a base do motor HT, mas com compressão mais alta (11:1 x 10,55:1). Requisitos de óleo são os mesmos: 10W-40 semissintético (ou superior) JASO MA2 obrigatório pela embreagem úmida. Capacidade: 3,2L sem troca de filtro / 3,4L com filtro novo. Intervalo: 16.000 km ou 12 meses. Compressão mais alta gera um pouco mais de calor — em uso intenso (viagens longas, garupa frequente), considere antecipar a troca em climas muito quentes.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK LMAR8A-9 gap 0,9–1,0mm — mesma peça da linha Street Twin',
    body: 'A T100 usa a mesma vela iridium de fábrica NGK LMAR8A-9 (gap 0,9–1,0mm) do restante da plataforma Bonneville 900. Vida útil longa (16.000–24.000 km). Ao comprar peça de reposição em oficinas não especializadas, cuidado: motos de cilindrada parecida às vezes usam vela de rosca/alcance diferente — confirme o código exato antes de instalar.',
  },
  {
    severity: 'OK',
    title: 'Compressão mais alta (11:1) pede combustível de melhor octanagem',
    body: 'A relação de compressão 11:1 da T100 é mais alta que o motor HT do Street Twin (10,55:1) — isso a torna mais sensível a combustível de baixa qualidade/octanagem. Use sempre gasolina aditivada de posto de confiança; evite álcool combustível puro em bombas suspeitas. Sintoma de detonação (pinicagem): ruído metálico agudo em aceleração forte, principalmente em subidas. Se ocorrer com frequência, verifique octanagem do combustível antes de suspeitar de problema mecânico.',
  },
  {
    severity: 'OK',
    title: 'Estilo clássico com acabamento cromado extenso — cuidado redobrado com corrosão',
    body: 'A T100 (e as edições Black e Stealth Edition, com acabamento escurecido) tem mais peças cromadas expostas que o Street Twin — tanque, para-lamas, guidão. Nas versões Black/Stealth com pintura preto fosco, arranhões expõem o metal e criam pontos de corrosão mais visíveis que no cromado polido. Lave a moto regularmente, encere peças cromadas a cada 2–3 meses e evite produtos abrasivos em peças com acabamento fosco.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 — mesma lubrificação e folga da linha HT',
    body: 'A T100 usa corrente pitch 525 igual ao restante da plataforma. Lubrifique a cada 500–800 km, mantenha folga de 20–30mm no trecho inferior. Kit relação de reposição: confirme número de elos e dentes de pinhão/coroa específicos do ano/modelo antes de comprar — pequenas variações existem entre T100 e Street Twin apesar do pitch igual.',
  },
  {
    severity: 'WARN',
    title: 'Tanque maior (14,5L) e peso maior que o Street Twin — ajuste expectativa de consumo/autonomia',
    body: 'A T100 tem tanque de 14,5L (contra ~12L do Street Twin) e é ligeiramente mais pesada por conta do estilo clássico com mais componentes metálicos. Isso significa autonomia maior em km absolutos, mas consumo médio (km/L) semelhante ao resto da família 900cc. Ao planejar viagens, considere o peso adicional na frenagem e no comportamento em curva — suspensão e freios são dimensionados para o conjunto, mas o feedback é ligeiramente mais "pesado" que o Street Twin.',
  },
]

const HP_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Sensor de posição de marcha — mesmo problema da linha HT',
    body: 'A T100 compartilha o mesmo sensor de posição de marcha (gear position sensor) do restante da plataforma Bonneville 900, com o mesmo histórico de travamento do disco interno e vazamento de óleo pelas juntas de vedação. Sintomas: indicador de marcha piscando ou incorreto no painel, mancha de óleo perto da tampa do sensor. Reparo: mesmo procedimento — lixar levemente o disco, regraxar, trocar juntas se houver vazamento.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão de canos de escape cromados — mais visível na T100 pelo estilo clássico',
    body: 'Assim como no Street Twin, os canos de escape cromados de parede simples enferrujam/mancham com uso, mesmo em unidades novas. Na T100, o problema é ainda mais notado porque o design clássico expõe mais cromado à vista (silenciadores gêmeos maiores). Aplique anticorrosivo (ACF-50, WD-40 Specialist) periodicamente e polir manchas leves com palha de aço 0000 + polidor de metal antes que a ferrugem penetre mais fundo no cromado.',
  },
  {
    severity: 'WARN',
    title: 'Trepidação de embreagem a frio — mesmo comportamento da linha HT',
    body: 'Relatos de trepidação/solavanco ao sair em primeira marcha com motor frio também aparecem em unidades T100, principalmente as mais antigas (2016–2018). Antes de suspeitar de embreagem desgastada, verifique o ajuste do cabo de acionamento e confirme que o óleo usado é 10W-40+ JASO MA2 — óleo errado é a causa mais comum e mais barata de resolver.',
  },
  {
    severity: 'WARN',
    title: 'Vazamentos de óleo em cabeçote/bomba d\'água — inspeção visual a cada 1.000 km',
    body: 'Mesmo padrão de pequenos vazamentos do motor 900 HT também ocorre no motor HP da T100 — cabeçote, bomba d\'água atrás do cilindro dianteiro, tampa do pinhão. Verifique o chão sob a moto regularmente. A maioria dos casos é resolvida com reaperto ou troca pontual de junta/retentor (R$ 200–500 em oficina especializada); raramente indica problema estrutural do motor.',
  },
  {
    severity: 'DANGER',
    title: 'Câmara de ar mal instalada ou ausente é a causa nº1 de perda de pressão em oficinas não especializadas',
    body: 'Como a T100 tem roda raiada, é comum um borracheiro sem experiência em motos clássicas instalar um pneu "tubeless" sem câmara, confiando apenas na vedação do pneu — isso NÃO funciona em roda raiada e causa perda lenta e constante de pressão, além de risco de descolamento do talão em curva de alta velocidade. Se sua T100 estiver perdendo pressão sem furo aparente, a primeira suspeita deve ser ausência ou dano na câmara de ar, não o pneu em si.',
  },
]

const HP_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Bonneville T100 / T100 Black / T100 Stealth Edition (motor 900 HP)',
    body: '1.000 km — Revisão de amaciamento (verificação geral). | 16.000 km / 12 meses — Troca de óleo (10W-40 JASO MA2, 3,2–3,4L) + filtro de óleo. Verificar vela NGK LMAR8A-9. Lubrificar corrente 525 (contínuo, a cada 500–800 km). Verificar folga de corrente (20–30mm). Conferir câmara de ar (roda raiada). Trocar filtro de ar. | 32.000 km / 24 meses — Segunda troca de óleo + filtro. Checagem de folga de válvulas (shim-under-bucket, adm 0,10–0,15mm / esc 0,15–0,20mm). Fluido de freio DOT 4 (bienal). Inspeção do sensor de posição de marcha. | 48.000 km — Kit relação se desgastado. Inspeção de bomba d\'água e mangueiras. | Anual — Anticorrosivo nos canos de escape e nas partes cromadas expostas (tanque, para-lamas).',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  // Família 900 HT
  {
    modelName: 'STREET TWIN',
    yearFrom: 2016,
    yearTo: null,
    MACETES: HT_MACETES,
    PROBLEMAS: HT_PROBLEMAS,
    MANUTENCAO: HT_MANUTENCAO,
  },
  {
    modelName: 'STREET CUP',
    yearFrom: 2017,
    yearTo: null,
    MACETES: HT_MACETES,
    PROBLEMAS: HT_PROBLEMAS,
    MANUTENCAO: HT_MANUTENCAO,
  },
  {
    modelName: 'STREET SCRAMBLER',
    yearFrom: 2017,
    yearTo: null,
    MACETES: HT_MACETES,
    PROBLEMAS: HT_PROBLEMAS,
    MANUTENCAO: HT_MANUTENCAO,
  },
  {
    modelName: 'SCRAMBLER 900 STEALTH EDITION',
    yearFrom: 2024,
    yearTo: null,
    MACETES: HT_MACETES,
    PROBLEMAS: HT_PROBLEMAS,
    MANUTENCAO: HT_MANUTENCAO,
  },
  {
    modelName: 'SCRAMBLER 900 ICON EDITION',
    yearFrom: 2024,
    yearTo: null,
    MACETES: HT_MACETES,
    PROBLEMAS: HT_PROBLEMAS,
    MANUTENCAO: HT_MANUTENCAO,
  },
  {
    modelName: 'SPEED TWIN 900',
    yearFrom: 2022,
    yearTo: null,
    MACETES: HT_MACETES,
    PROBLEMAS: HT_PROBLEMAS,
    MANUTENCAO: HT_MANUTENCAO,
  },
  {
    modelName: 'SPEED TWIN 900 STEALTH EDITION',
    yearFrom: 2024,
    yearTo: null,
    MACETES: HT_MACETES,
    PROBLEMAS: HT_PROBLEMAS,
    MANUTENCAO: HT_MANUTENCAO,
  },
  // Família 900 HP
  {
    modelName: 'BONNEVILLE T100',
    yearFrom: 2016,
    yearTo: null,
    MACETES: HP_MACETES,
    PROBLEMAS: HP_PROBLEMAS,
    MANUTENCAO: HP_MANUTENCAO,
  },
  {
    modelName: 'BONNEVILLE T100 BLACK',
    yearFrom: 2019,
    yearTo: null,
    MACETES: HP_MACETES,
    PROBLEMAS: HP_PROBLEMAS,
    MANUTENCAO: HP_MANUTENCAO,
  },
  {
    modelName: 'BONNEVILLE T100 STEALTH EDITION',
    yearFrom: 2024,
    yearTo: null,
    MACETES: HP_MACETES,
    PROBLEMAS: HP_PROBLEMAS,
    MANUTENCAO: HP_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'STREET TWIN',
    yearFrom: 2016, yearTo: null,
    tireSize: '100/90-18 (F) · 150/70R17 (R)',
    frontPsi: 32, rearPsi: 36,
    frontPsiLoad: 32, rearPsiLoad: 39,
    notes: 'Solo: F 32 / R 36 PSI (2,2 / 2,5 bar, valores de manual). Com carona/bagagem: acrescente ~3 PSI no traseiro. Roda de liga fundida — pneu tubeless direto, sem câmara. Pneu original: Pirelli Sportscomp.',
  },
  {
    modelName: 'STREET CUP',
    yearFrom: 2017, yearTo: null,
    tireSize: '100/90-18 (F) · 150/70R17 (R)',
    frontPsi: 32, rearPsi: 36,
    frontPsiLoad: 32, rearPsiLoad: 39,
    notes: 'Mesma calibragem do Street Twin — plataforma e rodas de liga fundida idênticas.',
  },
  {
    modelName: 'STREET SCRAMBLER',
    yearFrom: 2017, yearTo: null,
    tireSize: '100/90-19 (F) · 150/70R17 (R)',
    frontPsi: 35, rearPsi: 42,
    frontPsiLoad: 35, rearPsiLoad: 42,
    notes: 'Roda dianteira 19" (maior que Street Twin/Cup) para perfil scrambler/off-road leve. Há variação entre fontes (32/36 até 35/42) — confirme na etiqueta do balancim ou manual do ano específico antes de calibrar.',
  },
  {
    modelName: 'SCRAMBLER 900 STEALTH EDITION',
    yearFrom: 2024, yearTo: null,
    tireSize: '100/90-19 (F) · 150/70R17 (R)',
    frontPsi: 35, rearPsi: 42,
    frontPsiLoad: 35, rearPsiLoad: 42,
    notes: 'Edição mais recente do Street Scrambler — mesma roda 19"/17" e calibragem.',
  },
  {
    modelName: 'SCRAMBLER 900 ICON EDITION',
    yearFrom: 2024, yearTo: null,
    tireSize: '100/90-19 (F) · 150/70R17 (R)',
    frontPsi: 35, rearPsi: 42,
    frontPsiLoad: 35, rearPsiLoad: 42,
    notes: 'Mesma base do Street Scrambler/Stealth Edition — roda 19"/17".',
  },
  {
    modelName: 'SPEED TWIN 900',
    yearFrom: 2022, yearTo: null,
    tireSize: '100/90-18 (F) · 150/70R17 (R)',
    frontPsi: 32, rearPsi: 36,
    frontPsiLoad: 32, rearPsiLoad: 39,
    notes: 'Speed Twin 900 é o Street Twin rebatizado (jul/2022) — mesma roda de liga fundida 18"/17" e calibragem.',
  },
  {
    modelName: 'SPEED TWIN 900 STEALTH EDITION',
    yearFrom: 2024, yearTo: null,
    tireSize: '100/90-18 (F) · 150/70R17 (R)',
    frontPsi: 32, rearPsi: 36,
    frontPsiLoad: 32, rearPsiLoad: 39,
    notes: 'Edição com acabamento escurecido — mesma base mecânica e calibragem da Speed Twin 900.',
  },
  {
    modelName: 'BONNEVILLE T100',
    yearFrom: 2016, yearTo: null,
    tireSize: '100/90-18 (F) · 150/70-17 (R)',
    frontPsi: 33, rearPsi: 41,
    frontPsiLoad: 33, rearPsiLoad: 41,
    notes: 'Solo e com carona: F 33 / R 41 PSI (2,27 / 2,82 bar, valores de manual). Roda RAIADA (spoked) — exige câmara de ar interna mesmo com pneu marcado "tubeless". Pneu original: Pirelli Phantom Sportscomp (dianteiro bias-ply, traseiro radial).',
  },
  {
    modelName: 'BONNEVILLE T100 BLACK',
    yearFrom: 2019, yearTo: null,
    tireSize: '100/90-18 (F) · 150/70-17 (R)',
    frontPsi: 33, rearPsi: 41,
    frontPsiLoad: 33, rearPsiLoad: 41,
    notes: 'Mesma base mecânica e calibragem da T100 — edição com acabamento escurecido. Roda raiada, exige câmara de ar.',
  },
  {
    modelName: 'BONNEVILLE T100 STEALTH EDITION',
    yearFrom: 2024, yearTo: null,
    tireSize: '100/90-18 (F) · 150/70-17 (R)',
    frontPsi: 33, rearPsi: 41,
    frontPsiLoad: 33, rearPsiLoad: 41,
    notes: 'Edição mais recente da T100 — mesma calibragem e roda raiada (câmara de ar obrigatória).',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // STREET TWIN
  { modelName: 'STREET TWIN', yearFrom: 2016, yearTo: null, component: 'Óleo 10W-40 JASO MA2 (3,2L s/ filtro / 3,4L c/ filtro)', intervalKm: 16000, intervalMonths: 12, notes: 'Motor 900 HT liquid-cooled. Semissintético mínimo, aceita full sintético 10W-50/60.', priority: 'HIGH', order: 1 },
  { modelName: 'STREET TWIN', yearFrom: 2016, yearTo: null, component: 'Vela NGK LMAR8A-9 (gap 0,9–1,0mm)', intervalKm: 16000, intervalMonths: 24, notes: 'Já vem iridium de fábrica. Vida útil longa, inspecionar a cada revisão.', priority: 'MEDIUM', order: 2 },
  { modelName: 'STREET TWIN', yearFrom: 2016, yearTo: null, component: 'Lubrificação da corrente 525', intervalKm: 700, intervalMonths: null, notes: 'Spray O-ring. Folga 20–30mm no trecho inferior.', priority: 'HIGH', order: 3 },
  { modelName: 'STREET TWIN', yearFrom: 2016, yearTo: null, component: 'Filtro de ar', intervalKm: 16000, intervalMonths: 12, notes: 'Trocar (não lavar) — filtro de papel/espuma vedada de fábrica.', priority: 'MEDIUM', order: 4 },
  { modelName: 'STREET TWIN', yearFrom: 2016, yearTo: null, component: 'Folga de válvulas (shim-under-bucket, adm 0,10–0,15mm / esc 0,15–0,20mm)', intervalKm: 32000, intervalMonths: 24, notes: 'Motor frio. Requer pastilhas por medida — serviço especializado.', priority: 'HIGH', order: 5 },
  { modelName: 'STREET TWIN', yearFrom: 2016, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 32000, intervalMonths: 24, notes: 'Bienal. Não misturar com DOT 3/5.', priority: 'HIGH', order: 6 },
  { modelName: 'STREET TWIN', yearFrom: 2016, yearTo: null, component: 'Inspeção sensor de posição de marcha', intervalKm: 16000, intervalMonths: 12, notes: 'Verificar vazamento de óleo pelas juntas e travamento do disco interno.', priority: 'MEDIUM', order: 7 },
  { modelName: 'STREET TWIN', yearFrom: 2016, yearTo: null, component: 'Anticorrosivo nos canos de escape cromados', intervalKm: null, intervalMonths: 12, notes: 'ACF-50 ou WD-40 Specialist antes do período chuvoso. Corrosão é característica de design, não defeito.', priority: 'LOW', order: 8 },

  // STREET CUP
  { modelName: 'STREET CUP', yearFrom: 2017, yearTo: null, component: 'Óleo 10W-40 JASO MA2 (3,2L s/ filtro / 3,4L c/ filtro)', intervalKm: 16000, intervalMonths: 12, notes: 'Motor 900 HT — mesma especificação do Street Twin.', priority: 'HIGH', order: 1 },
  { modelName: 'STREET CUP', yearFrom: 2017, yearTo: null, component: 'Vela NGK LMAR8A-9 (gap 0,9–1,0mm)', intervalKm: 16000, intervalMonths: 24, notes: 'Iridium de fábrica.', priority: 'MEDIUM', order: 2 },
  { modelName: 'STREET CUP', yearFrom: 2017, yearTo: null, component: 'Lubrificação da corrente 525', intervalKm: 700, intervalMonths: null, notes: 'Folga 20–30mm.', priority: 'HIGH', order: 3 },
  { modelName: 'STREET CUP', yearFrom: 2017, yearTo: null, component: 'Folga de válvulas (shim-under-bucket)', intervalKm: 32000, intervalMonths: 24, notes: 'Adm 0,10–0,15mm / esc 0,15–0,20mm, motor frio.', priority: 'HIGH', order: 4 },
  { modelName: 'STREET CUP', yearFrom: 2017, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 32000, intervalMonths: 24, notes: 'Bienal.', priority: 'HIGH', order: 5 },
  { modelName: 'STREET CUP', yearFrom: 2017, yearTo: null, component: 'Inspeção sensor de posição de marcha', intervalKm: 16000, intervalMonths: 12, notes: 'Mesmo ponto de atenção da plataforma.', priority: 'MEDIUM', order: 6 },

  // STREET SCRAMBLER
  { modelName: 'STREET SCRAMBLER', yearFrom: 2017, yearTo: null, component: 'Óleo 10W-40 JASO MA2 (3,2L s/ filtro / 3,4L c/ filtro)', intervalKm: 16000, intervalMonths: 12, notes: 'Motor 900 HT.', priority: 'HIGH', order: 1 },
  { modelName: 'STREET SCRAMBLER', yearFrom: 2017, yearTo: null, component: 'Vela NGK LMAR8A-9 (gap 0,9–1,0mm)', intervalKm: 16000, intervalMonths: 24, notes: 'Iridium de fábrica.', priority: 'MEDIUM', order: 2 },
  { modelName: 'STREET SCRAMBLER', yearFrom: 2017, yearTo: null, component: 'Lubrificação da corrente 525', intervalKm: 700, intervalMonths: null, notes: 'Uso off-road leve: lubrificar com mais frequência após trilha/poeira.', priority: 'HIGH', order: 3 },
  { modelName: 'STREET SCRAMBLER', yearFrom: 2017, yearTo: null, component: 'Folga de válvulas (shim-under-bucket)', intervalKm: 32000, intervalMonths: 24, notes: 'Adm 0,10–0,15mm / esc 0,15–0,20mm.', priority: 'HIGH', order: 4 },
  { modelName: 'STREET SCRAMBLER', yearFrom: 2017, yearTo: null, component: 'Pneu dianteiro 19" — inspeção de desgaste', intervalKm: 8000, intervalMonths: null, notes: 'Roda 19" exclusiva desta variante — confirme aro correto na troca.', priority: 'MEDIUM', order: 5 },

  // SCRAMBLER 900 STEALTH EDITION
  { modelName: 'SCRAMBLER 900 STEALTH EDITION', yearFrom: 2024, yearTo: null, component: 'Óleo 10W-40 JASO MA2 (3,2L s/ filtro / 3,4L c/ filtro)', intervalKm: 16000, intervalMonths: 12, notes: 'Motor 900 HT — mesma base do Street Scrambler.', priority: 'HIGH', order: 1 },
  { modelName: 'SCRAMBLER 900 STEALTH EDITION', yearFrom: 2024, yearTo: null, component: 'Lubrificação da corrente 525', intervalKm: 700, intervalMonths: null, notes: 'Folga 20–30mm.', priority: 'HIGH', order: 2 },
  { modelName: 'SCRAMBLER 900 STEALTH EDITION', yearFrom: 2024, yearTo: null, component: 'Folga de válvulas (shim-under-bucket)', intervalKm: 32000, intervalMonths: 24, notes: 'Adm 0,10–0,15mm / esc 0,15–0,20mm.', priority: 'HIGH', order: 3 },

  // SCRAMBLER 900 ICON EDITION
  { modelName: 'SCRAMBLER 900 ICON EDITION', yearFrom: 2024, yearTo: null, component: 'Óleo 10W-40 JASO MA2 (3,2L s/ filtro / 3,4L c/ filtro)', intervalKm: 16000, intervalMonths: 12, notes: 'Motor 900 HT — mesma base do Street Scrambler.', priority: 'HIGH', order: 1 },
  { modelName: 'SCRAMBLER 900 ICON EDITION', yearFrom: 2024, yearTo: null, component: 'Lubrificação da corrente 525', intervalKm: 700, intervalMonths: null, notes: 'Folga 20–30mm.', priority: 'HIGH', order: 2 },
  { modelName: 'SCRAMBLER 900 ICON EDITION', yearFrom: 2024, yearTo: null, component: 'Folga de válvulas (shim-under-bucket)', intervalKm: 32000, intervalMonths: 24, notes: 'Adm 0,10–0,15mm / esc 0,15–0,20mm.', priority: 'HIGH', order: 3 },

  // SPEED TWIN 900
  { modelName: 'SPEED TWIN 900', yearFrom: 2022, yearTo: null, component: 'Óleo 10W-40 JASO MA2 (3,2L s/ filtro / 3,4L c/ filtro)', intervalKm: 16000, intervalMonths: 12, notes: 'Rebatizado do Street Twin em 2022 — mesmo motor 900 HT, não motor HP.', priority: 'HIGH', order: 1 },
  { modelName: 'SPEED TWIN 900', yearFrom: 2022, yearTo: null, component: 'Vela NGK LMAR8A-9 (gap 0,9–1,0mm)', intervalKm: 16000, intervalMonths: 24, notes: 'Iridium de fábrica.', priority: 'MEDIUM', order: 2 },
  { modelName: 'SPEED TWIN 900', yearFrom: 2022, yearTo: null, component: 'Lubrificação da corrente 525', intervalKm: 700, intervalMonths: null, notes: 'Folga 20–30mm.', priority: 'HIGH', order: 3 },
  { modelName: 'SPEED TWIN 900', yearFrom: 2022, yearTo: null, component: 'Folga de válvulas (shim-under-bucket)', intervalKm: 32000, intervalMonths: 24, notes: 'Adm 0,10–0,15mm / esc 0,15–0,20mm.', priority: 'HIGH', order: 4 },
  { modelName: 'SPEED TWIN 900', yearFrom: 2022, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 32000, intervalMonths: 24, notes: 'Bienal.', priority: 'HIGH', order: 5 },

  // SPEED TWIN 900 STEALTH EDITION
  { modelName: 'SPEED TWIN 900 STEALTH EDITION', yearFrom: 2024, yearTo: null, component: 'Óleo 10W-40 JASO MA2 (3,2L s/ filtro / 3,4L c/ filtro)', intervalKm: 16000, intervalMonths: 12, notes: 'Mesmo motor 900 HT da Speed Twin 900 base.', priority: 'HIGH', order: 1 },
  { modelName: 'SPEED TWIN 900 STEALTH EDITION', yearFrom: 2024, yearTo: null, component: 'Lubrificação da corrente 525', intervalKm: 700, intervalMonths: null, notes: 'Folga 20–30mm.', priority: 'HIGH', order: 2 },
  { modelName: 'SPEED TWIN 900 STEALTH EDITION', yearFrom: 2024, yearTo: null, component: 'Folga de válvulas (shim-under-bucket)', intervalKm: 32000, intervalMonths: 24, notes: 'Adm 0,10–0,15mm / esc 0,15–0,20mm.', priority: 'HIGH', order: 3 },

  // BONNEVILLE T100
  { modelName: 'BONNEVILLE T100', yearFrom: 2016, yearTo: null, component: 'Óleo 10W-40 JASO MA2 (3,2L s/ filtro / 3,4L c/ filtro)', intervalKm: 16000, intervalMonths: 12, notes: 'Motor 900 HP (compressão 11:1). Semissintético mínimo.', priority: 'HIGH', order: 1 },
  { modelName: 'BONNEVILLE T100', yearFrom: 2016, yearTo: null, component: 'Vela NGK LMAR8A-9 (gap 0,9–1,0mm)', intervalKm: 16000, intervalMonths: 24, notes: 'Iridium de fábrica, mesma peça da linha HT.', priority: 'MEDIUM', order: 2 },
  { modelName: 'BONNEVILLE T100', yearFrom: 2016, yearTo: null, component: 'Lubrificação da corrente 525', intervalKm: 700, intervalMonths: null, notes: 'Folga 20–30mm.', priority: 'HIGH', order: 3 },
  { modelName: 'BONNEVILLE T100', yearFrom: 2016, yearTo: null, component: 'Folga de válvulas (shim-under-bucket)', intervalKm: 32000, intervalMonths: 24, notes: 'Adm 0,10–0,15mm / esc 0,15–0,20mm, motor frio.', priority: 'HIGH', order: 4 },
  { modelName: 'BONNEVILLE T100', yearFrom: 2016, yearTo: null, component: 'Câmara de ar (roda raiada) — inspeção', intervalKm: 8000, intervalMonths: 12, notes: 'Obrigatória mesmo com pneu "tubeless". Causa nº1 de perda lenta de pressão.', priority: 'CRITICAL', order: 5 },
  { modelName: 'BONNEVILLE T100', yearFrom: 2016, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 32000, intervalMonths: 24, notes: 'Bienal.', priority: 'HIGH', order: 6 },
  { modelName: 'BONNEVILLE T100', yearFrom: 2016, yearTo: null, component: 'Anticorrosivo nas peças cromadas (tanque, para-lamas, escape)', intervalKm: null, intervalMonths: 12, notes: 'Estilo clássico expõe mais cromado — atenção redobrada vs. Street Twin.', priority: 'LOW', order: 7 },

  // BONNEVILLE T100 BLACK
  { modelName: 'BONNEVILLE T100 BLACK', yearFrom: 2019, yearTo: null, component: 'Óleo 10W-40 JASO MA2 (3,2L s/ filtro / 3,4L c/ filtro)', intervalKm: 16000, intervalMonths: 12, notes: 'Motor 900 HP, mesma base da T100.', priority: 'HIGH', order: 1 },
  { modelName: 'BONNEVILLE T100 BLACK', yearFrom: 2019, yearTo: null, component: 'Lubrificação da corrente 525', intervalKm: 700, intervalMonths: null, notes: 'Folga 20–30mm.', priority: 'HIGH', order: 2 },
  { modelName: 'BONNEVILLE T100 BLACK', yearFrom: 2019, yearTo: null, component: 'Câmara de ar (roda raiada) — inspeção', intervalKm: 8000, intervalMonths: 12, notes: 'Obrigatória mesmo com pneu "tubeless".', priority: 'CRITICAL', order: 3 },
  { modelName: 'BONNEVILLE T100 BLACK', yearFrom: 2019, yearTo: null, component: 'Folga de válvulas (shim-under-bucket)', intervalKm: 32000, intervalMonths: 24, notes: 'Adm 0,10–0,15mm / esc 0,15–0,20mm.', priority: 'HIGH', order: 4 },

  // BONNEVILLE T100 STEALTH EDITION
  { modelName: 'BONNEVILLE T100 STEALTH EDITION', yearFrom: 2024, yearTo: null, component: 'Óleo 10W-40 JASO MA2 (3,2L s/ filtro / 3,4L c/ filtro)', intervalKm: 16000, intervalMonths: 12, notes: 'Motor 900 HP, mesma base da T100.', priority: 'HIGH', order: 1 },
  { modelName: 'BONNEVILLE T100 STEALTH EDITION', yearFrom: 2024, yearTo: null, component: 'Lubrificação da corrente 525', intervalKm: 700, intervalMonths: null, notes: 'Folga 20–30mm.', priority: 'HIGH', order: 2 },
  { modelName: 'BONNEVILLE T100 STEALTH EDITION', yearFrom: 2024, yearTo: null, component: 'Câmara de ar (roda raiada) — inspeção', intervalKm: 8000, intervalMonths: 12, notes: 'Obrigatória mesmo com pneu "tubeless".', priority: 'CRITICAL', order: 3 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Triumph Bonneville 900 (Street Twin/Cup/Scrambler, Scrambler 900, Speed Twin 900, T100)...')

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

  console.log('✅ Triumph Bonneville 900 concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
