// seed-kawasaki-versys.ts — Kawasaki Versys-X 300, Versys 650, Versys 1000 e Versys 1100
// Linha adventure/touring da Kawasaki. Versys 1000 foi descontinuada no Brasil em 2021/2022,
// substituída pela Versys 1100 (motor 1043cc revisado, mais potência e eletrônica).
// Execute: pnpm --filter @motormacete/database db:seed:kawasaki-versys
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

// ─── VERSYS-X 300 (+ TOURER) ───────────────────────────────────────────────────
// Motor: 296cc DOHC paralelo-twin refrigerado a líquido, 8 válvulas | 40 cv @ 11.500 rpm
// Torque: 2,6 kgf.m @ 10.000 rpm | Injeção eletrônica | Diâmetro x curso: 62,0 x 49,0mm
// Óleo: 10W-40 API SL/JASO MA2 — 2,2L (troca de serviço) / 2,4L (1º enchimento) + 0,2L filtro
// Vela: NGK CR8E gap 0,8mm | Pneu: 100/90-19 (F) / 130/80-17 (R) | Corrente 520
// Tanque: 17L | Adventure de entrada — base compartilhada com Ninja 300/Z300

const VERSYSX300_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA2 — 2,2L na troca de serviço; nunca use óleo de carro',
    body: 'O motor 296cc DOHC paralelo-twin da Versys-X 300 tem embreagem úmida compartilhando óleo com o câmbio — exige classificação JASO MA2 (não use óleo API SN "puro" para carro, ele contém aditivos de fricção que fazem a embreagem escorregar). Capacidade: 2,2L em troca de serviço (com filtro), 2,4L no primeiro enchimento. Marcas recomendadas: Motul 5100 10W-40, Lubrax Moto 4T 10W-40, Shell Advance Ultra 4T. Intervalo Kawasaki: 6.000 km ou 12 meses — pode reduzir para 5.000 km em uso urbano intenso.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR8E gap 0,8mm — troque em par simétrico se notar perda de força',
    body: 'A Versys-X 300 usa vela NGK CR8E (a mesma da Ninja 300/Z300, motor compartilhado), gap 0,8mm. Equivalente iridium: NGK CR8EIX, dura o dobro do intervalo (cerca de 16.000 km) e melhora a resposta em baixa rotação — recomendado para quem roda estrada com frequência. Custo: R$ 25–40 (convencional) ou R$ 70–100 (iridium, o par). Sintoma de vela gasta: partida a frio mais difícil, engasgo leve entre 3.000–5.000 rpm.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 — regule a folga certo, muitos donos relatam divergência do manual',
    body: 'A corrente de transmissão 520 da Versys-X 300 deve ser inspecionada a cada 1.000 km e lubrificada a cada 500–600 km, principalmente após chuva. A folga especificada no manual (cerca de 25–35mm no centro do trecho inferior, com a moto no cavalete lateral) gera dúvida entre proprietários — vídeos de oficinas brasileiras mostram que medir com a moto no cavalete central e roda no ar dá leitura mais confiável. Kit relação (pinhão + coroa + corrente) dura entre 20.000–25.000 km com boa manutenção — marcas DID e RK são as mais recomendadas.',
  },
  {
    severity: 'WARN',
    title: 'Peças de motor são importadas do Japão — planeje prazo e orçamento maior',
    body: 'A Versys-X 300 não é o modelo mais vendido da Kawasaki no Brasil, então peças de motor (pistão, anéis, juntas, componentes do câmbio) frequentemente não ficam em estoque local e são importadas — prazo de 15–40 dias e custo elevado em relação a nacionais/populares. Peças de desgaste rápido (filtro de óleo, velas, pastilhas de freio, corrente) geralmente têm estoque em concessionárias e nas lojas Kawaparts/M3 Parts. Vale manter um filtro de óleo e um jogo de velas reserva na garagem para não ficar parado.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: acesso relativamente fácil, limpe a cada 6.000 km em cidade com poeira',
    body: 'O filtro de ar de papel da Versys-X 300 fica sob o tanque, acesso razoável sem remover carenagens grandes. Intervalo oficial de troca: 12.000 km, mas em uso urbano com muita poeira ou trilhas leves (o forte da moto), inspecione a cada 6.000 km. Filtro sujo é uma das causas mais comuns de perda de resposta e consumo elevado nesse motor pequeno de 296cc. Filtro original Kawasaki ou compatível HifloFiltro HFA2915.',
  },
  {
    severity: 'OK',
    title: 'Pneus 19"/17" com câmara — cuide da pressão para não acelerar desgaste irregular',
    body: 'A configuração de aro 19" dianteiro e 17" traseiro é rara na categoria (a maioria das rivais 300cc usa 17"/17") e existe para dar mais capacidade off-road leve. Pneus recomendados: Pirelli Scorpion Trail II, Michelin Anakee Street ou o original Dunlop Trailmax Mission. Pressão baixa acelera desgaste nas bordas e aumenta risco de "beliscão" na câmara em buracos — confira semanalmente com calibrador confiável, não confie no calibrador de posto.',
  },
  {
    severity: 'OK',
    title: 'Uso misto asfalto/terra: a Versys-X 300 aceita rodas mais altas mas não é trail pesado',
    body: 'A Versys-X 300 (e a Tourer, com bagageiros de fábrica) é uma adventure de entrada — suspensão com curso maior que uma naked, mas ainda é uma moto de rua com pneus rodoviários. Para trilhas leves (estrada de terra batida, cascalho compactado), reduza a pressão dos pneus em 3–4 PSI e ande em velocidade moderada. Não é recomendada para areia fofa ou lama profunda — a moto pesa cerca de 175 kg e o pneu misto original tem grip limitado fora do asfalto.',
  },
]

const VERSYSX300_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Infiltração de água no painel digital — problema reconhecido pela própria Kawasaki',
    body: 'Um dos problemas mais reportados por proprietários brasileiros: entrada de água no painel de instrumentos, causando embaçamento e bolhas no visor após lavagens ou chuva forte. A Kawasaki já reconheceu o problema em atendimentos, mas a solução oficial é apenas desmontar o painel e reforçar a vedação com silicone — não há troca de peça que resolva definitivamente. Evite jato de alta pressão diretamente no painel ao lavar a moto. Se notar umidade interna, leve à concessionária o quanto antes para evitar dano aos componentes eletrônicos.',
  },
  {
    severity: 'WARN',
    title: 'Trepidação (shimmy) em baixa velocidade, especialmente com bauleto instalado',
    body: 'Vários proprietários relatam uma leve trepidação ou "balanço" do guidão em velocidades baixas (até 40 km/h), que piora quando há um bauleto/topcase carregado na traseira. Verifique primeiro o básico: calibragem correta dos pneus, balanceamento das rodas e aperto do eixo do bauleto/suporte. Se persistir mesmo com esses itens em ordem, pode ser característica de geometria do chassi combinada com carga alta na traseira — evite excesso de peso no topcase e prefira distribuir carga entre alforjes laterais quando possível.',
  },
  {
    severity: 'WARN',
    title: 'Bateria com vida útil curta relatada por alguns donos — verifique tensão regularmente',
    body: 'Há relatos de proprietários que precisaram trocar a bateria original com apenas 1,5 ano de uso, mais cedo que o esperado (bateria de moto costuma durar 2–3 anos). Causa provável: uso predominante em trajetos curtos urbanos, que não dá tempo do sistema de carga recompor a bateria totalmente. Meça a tensão em repouso mensalmente (deve ficar acima de 12,4V) e, se a moto ficar parada por mais de 1 semana, use um carregador/mantenedor de bateria (tipo Battery Tender). Bateria original: YTZ7S ou equivalente.',
  },
  {
    severity: 'OK',
    title: 'Ruído de "relógio" (tique-tique) em marcha lenta é normal neste motor',
    body: 'Alguns proprietários notam um ruído semelhante a um tique-tique metálico em marcha lenta ou baixa rotação, geralmente vindo da região do tensor de corrente de comando ou dos comandos de válvula. Esse ruído é reportado como característica do motor DOHC compacto de 296cc (compartilhado com Ninja 300/Z300) e normalmente não indica problema mecânico, desde que não aumente de intensidade nem venha acompanhado de perda de potência. Se o barulho ficar muito alto ou aparecer batida seca, leve para diagnóstico — pode ser folga de válvula fora da especificação.',
  },
  {
    severity: 'WARN',
    title: 'Pontos de ferrugem prematura em parafusos e tubos de bengala relatados por donos',
    body: 'Proprietários em regiões litorâneas ou de clima úmido relatam pontos de oxidação precoce em parafusos externos, pedaleiras e nos tubos da bengala dianteira, mesmo com poucos meses de uso — acabamento de proteção anticorrosiva considerado abaixo do padrão para o segmento. Prevenção: lave a moto regularmente removendo sal/maresia, aplique um spray anticorrosivo (tipo WD-40 Especialista ou similar) em parafusaria exposta a cada 2–3 meses, e troque parafusos muito comprometidos por versão inox quando disponível.',
  },
  {
    severity: 'DANGER',
    title: 'Corrente desregulada além do especificado gera folga perigosa em uso off-road leve',
    body: 'Por ser uma moto adventure usada ocasionalmente fora do asfalto, a corrente da Versys-X 300 sofre mais solicitação de impacto (buracos, pedras) que em uso 100% urbano. Corrente com folga acima do especificado pode saltar do pinhão em movimentos bruscos de suspensão — risco de travamento da roda traseira. Após qualquer trecho de terra ou pedra, pare e verifique a tensão visualmente antes de seguir viagem. Nunca ultrapasse a folga máxima indicada no manual (o excesso de folga além de perigoso acelera desgaste do kit relação).',
  },
]

const VERSYSX300_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo Versys-X 300 / Tourer: baseado no manual Kawasaki + prática de oficinas',
    body: '1.000 km — Revisão de amaciamento: troca de óleo (10W-40, 2,2L) + filtro. Verificar torque de parafusos do motor. | 6.000 km — Troca de óleo + filtro. Lubrificar e regular corrente. Verificar folga de válvulas se aplicável. | 12.000 km — Troca de óleo + filtro. Trocar filtro de ar. Verificar vela CR8E (gap 0,8mm). | 12.000 km — Inspeção da corrente (verificar desgaste de pinhão/coroa). | 18.000 km — Troca de óleo + filtro + vela. Verificar pastilhas de freio. | 24.000 km — Folga de válvulas (checagem obrigatória Kawasaki). Fluido de freio (troca a cada 24 meses). | 36.000 km — Substituição do kit relação completo (corrente + pinhão + coroa).',
  },
]

// ─── VERSYS 650 (+ TOURER / CITY) ───────────────────────────────────────────────
// Nota histórica: existiu uma 1ª geração 2007–2009 (KLE650, visual mais anguloso e sem ABS
// de série) — mecanicamente similar mas com acabamento e eletrônica mais simples que a atual.
// Geração moderna 2010–presente | Motor: 649cc DOHC paralelo-twin líquido, 8 válvulas
// Potência: 69 cv @ 8.500 rpm | Torque: 6,4 kgf.m @ 7.000 rpm | Compressão 10,8:1
// Óleo: 10W-40 API SN/JASO MA — 2,3L (troca de serviço) | Vela: NGK CR9EIA-9 (iridium) gap 0,9mm
// Pneu: 120/70ZR17 (F) / 160/60ZR17 (R) | Corrente 520 | Tanque: 21L

const VERSYS650_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA — 2,3L; troque a cada 6.000 km mesmo rodando pouco',
    body: 'O motor 649cc paralelo-twin da Versys 650 exige óleo 10W-40 API SN ou JASO MA (embreagem úmida). Capacidade na troca de serviço: 2,3L. Marcas recomendadas no Brasil: Motul 5100 10W-40, Shell Advance Ultra 4T, Lubrax Moto 4T. Intervalo Kawasaki: 6.000 km ou 12 meses — respeite o prazo por tempo mesmo se rodar pouco, pois o óleo degrada com a condensação de umidade em uso urbano curto. Filtro de óleo original código 16097-0008 (mesmo filtro usado até nas Versys 1000 mais antigas).',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR9EIA-9 (iridium) de fábrica — gap 0,9mm, dura bem mais que convencional',
    body: 'A Versys 650 já vem de fábrica com vela iridium NGK CR9EIA-9, gap 0,9mm — vida útil de até 20.000–24.000 km, bem superior às velas convencionais. Ao trocar, use sempre a mesma referência ou a convencional NGK CR9EK (mais barata, mas troque a cada 8.000–10.000 km nesse caso). Custo da iridium: R$ 80–120 o par. Não regule o gap para menos de 0,8mm nem mais de 1,0mm — fora dessa faixa a combustão fica irregular.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 — folga e lubrificação corretas evitam desgaste do kit em menos de 15.000 km',
    body: 'Kit relação da Versys 650: coroa 46 dentes, pinhão 15 dentes, corrente 520 com 114–120 elos (varia por ano/versão). Lubrifique a cada 500–600 km com spray específico (Motul Chain Lube ou similar) e verifique a folga a cada 1.000 km — deve ficar entre 25–35mm no trecho inferior central. Kits DID ou RK com O-ring/X-ring duram até 25.000 km bem mantidos; sem manutenção regular, o desgaste pode aparecer já aos 12.000–15.000 km. Kit completo: R$ 400–650.',
  },
  {
    severity: 'OK',
    title: 'Pneus 17"/17" com boa oferta de opções touring e esportivo-touring no Brasil',
    body: 'A Versys 650 usa pneu dianteiro 120/70-17 e traseiro 160/60-17 — medida comum, com ampla disponibilidade nacional. Recomendados para uso touring/estrada: Michelin Road 6, Pirelli Angel GT II, Metzeler Roadtec 01. Para quem roda mais em cidade com foco em durabilidade: Pirelli Sport Demon ou Technomax. Pneus touring de qualidade duram entre 15.000–20.000 km no traseiro com pilotagem moderada.',
  },
  {
    severity: 'WARN',
    title: 'Filtro de óleo compatível é o mesmo desde 2007 — facilita achar peça em qualquer cidade',
    body: 'O filtro de óleo Kawasaki código 16097-0008 é compartilhado entre a Versys 650 (todas as gerações), ER-6n/ER-6f e até a Versys 1000 mais antiga. Isso significa que praticamente qualquer loja de peças para moto ou oficina multimarca no Brasil tem esse filtro em estoque ou equivalente HifloFiltro HF303. Bom para quem viaja longe e precisa de manutenção de emergência fora da cidade base.',
  },
  {
    severity: 'OK',
    title: 'Tanque de 21L dá autonomia de viagem — vale calibrar reserva no painel para não errar cálculo',
    body: 'Com tanque de 21 litros e consumo médio de 20–23 km/L em estrada, a Versys 650 entrega autonomia de 400–480 km por tanque — excelente para viagens longas. O consumo de combustível médio do painel (se equipado) costuma ter uma margem de erro de 5–8%; nas primeiras viagens longas, confirme o consumo real fazendo o cálculo manual (km rodados ÷ litros abastecidos) para calibrar suas expectativas de autonomia antes de trechos sem posto.',
  },
]

const VERSYS650_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Falha do estator (bobina do gerador) é o problema elétrico mais documentado da Versys 650',
    body: 'Em fóruns internacionais (Kawasaki Versys Forum) há dezenas de relatos de falha do estator entre 27.000–33.000 milhas (aproximadamente 43.000–53.000 km), especialmente em unidades que rodam muito em rotação alta constante (viagem/estrada). Sintoma: bateria não carrega (tensão abaixo de 13V com moto ligada em 4.000+ rpm), luz de bateria acende, moto pode morrer em movimento se a bateria descarregar totalmente. Meça a tensão regularmente: em repouso 12,5–12,8V, com moto ligada a 5.000 rpm deve subir para 13,5–14,5V. Estator de reposição (original ou compatível): R$ 400–900.',
  },
  {
    severity: 'WARN',
    title: 'Bomba d\'água: falha crônica de fábrica documentada em unidades da família ER-6/Versys 650',
    body: 'Existe um problema crônico já documentado (inclusive em modelos irmãos como ER-6n) do eixo da bomba d\'água enferrujar internamente e permitir passagem de água para o óleo do motor — sintoma: óleo com aspecto leitoso/acinzentado no visor de nível, nível de líquido de arrefecimento caindo sem vazamento externo visível. Se notar óleo esbranquiçado, PARE de rodar e leve para diagnóstico imediatamente — água misturada ao óleo destrói mancais e bielas rapidamente. Prevenção: troque o líquido de arrefecimento no intervalo correto (a cada 3 anos/36 meses) e não use apenas água na mistura.',
  },
  {
    severity: 'WARN',
    title: 'Conectores do chicote elétrico oxidam e causam falhas intermitentes',
    body: 'Assim como outros modelos Kawasaki de motor bicilíndrico dessa família, a Versys 650 apresenta relatos de conectores do chicote elétrico que oxidam ou derretem levemente por mau contato — sintomas incluem falha intermitente de luzes, sensor de posição do câmbio, ou instrumentos. Inspecione visualmente os principais conectores (atrás do farol, sob o tanque, perto do retificador) a cada 12 meses, aplicando graxa dielétrica nos pontos de contato. Regiões litorâneas/úmidas aceleram esse problema.',
  },
  {
    severity: 'WARN',
    title: 'Vibração em rotação de cruzeiro (5.000–6.500 rpm) é característica do motor paralelo-twin',
    body: 'O motor 649cc da Versys 650 tem uma faixa de vibração mais perceptível entre 5.000–6.500 rpm (velocidades de cruzeiro em rodovia, cerca de 100–120 km/h em 6ª marcha) — isso é uma característica do projeto do virabrequim (270°) e não indica defeito. Se a vibração aumentar de intensidade fora dessa faixa ou vier acompanhada de ruído metálico, verifique o aperto dos coxins do motor no chassi e o balanceamento das rodas antes de suspeitar de problema interno.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pelo retentor da bengala dianteira após uso intenso em estrada ruim',
    body: 'A bengala dianteira (não invertida nas versões mais simples) pode apresentar vazamento pelo retentor após uso prolongado em pavimento ruim ou trilhas leves — sintoma: óleo escuro visível na parte inferior do tubo. Vedante genérico compatível: 41x53x10,5mm (verificar medida exata do ano/versão). Custo do reparo: R$ 200–400 (peça + mão de obra). Ao trocar, use óleo de bengala específico (SAE 10W ou 15W) na quantidade especificada por tubo, não complete "no olho".',
  },
]

const VERSYS650_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Versys 650: geração moderna 2010+ com revisões a cada 6.000 km',
    body: '1.000 km — Revisão de amaciamento: óleo (10W-40, 2,3L) + filtro. Torque geral. | 6.000 km — Óleo + filtro. Corrente (lubrificar + regular). Verificar vela CR9EIA-9. | 12.000 km — Óleo + filtro. Filtro de ar. Fluido de freio (inspeção). | 18.000 km — Óleo + filtro. Verificar folga de válvulas (checagem oficial Kawasaki). Pastilhas de freio. | 24.000 km — Óleo + filtro + vela. Fluido de freio (troca, 24 meses). Líquido de arrefecimento (inspeção). | 30.000 km — Kit relação (avaliar substituição). Verificar tensão do estator (13,5–14,5V @ 5.000 rpm). | 36.000 km — Líquido de arrefecimento (troca, 36 meses). Rolamentos de roda e coluna de direção (inspeção).',
  },
]

// ─── VERSYS 1000 (2015–2021, descontinuada no Brasil, substituída pela 1100) ────
// Motor: 1.043cc DOHC 4 cilindros em linha, líquido, 16 válvulas | Diâmetro x curso: 77,0 x 56,0mm
// Potência: 118–120 cv @ 9.000 rpm | Torque: 10,2–10,4 kgf.m @ 7.700 rpm | Compressão 10,3:1
// Óleo: 10W-40 API SG-SM/JASO MA — 3,2L (sem filtro) / 3,8L (com filtro) | Vela: NGK CR9EIA-9 gap 0,9mm
// Pneu: 120/70ZR17 (F) / 180/55ZR17 (R) | Corrente 525 | Tanque: 21L | KECS (suspensão eletrônica) na GT

const VERSYS1000_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA — 3,8L com troca de filtro; motor de 4 cilindros exige atenção redobrada',
    body: 'O motor 1.043cc de 4 cilindros em linha da Versys 1000 tem maior capacidade de óleo que os irmãos bicilíndricos: 3,2L em troca simples, 3,8L trocando o filtro junto (recomendado sempre). Use 10W-40 sintético ou semissintético JASO MA — Motul 7100 10W-40 ou Shell Advance Ultra 4T são referência. Intervalo: 6.000 km ou 12 meses. Motor de 4 cilindros compacto tem folgas internas menores — respeitar o intervalo rigorosamente evita desgaste acelerado dos comandos de válvula.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR9EIA-9 (iridium) — 4 unidades, acesso trabalhoso pede planejamento',
    body: 'São 4 velas NGK CR9EIA-9, gap 0,9mm — uma por cilindro. O acesso exige remoção do tanque de combustível (basculante em muitas versões, facilita um pouco). Como o acesso é trabalhoso, planeje a troca das 4 velas junto com outra revisão que já exija abrir o conjunto. Vida útil: 20.000–24.000 km. Custo do jogo completo: R$ 250–400. Não compre vela avulsa de marca genérica para esse motor — a iridium original mantém a sincronia de ignição entre os 4 cilindros.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 de maior robustez — adequada para os quase 120cv do motor',
    body: 'A Versys 1000 usa corrente 525 (mais robusta que a 520 das Versys menores), compatível com a potência elevada. Lubrifique a cada 500–600 km e verifique a folga a cada 1.000 km. Kit relação completo (coroa + pinhão + corrente): R$ 600–900 em marcas DID ou RK com retentor X-ring. Bem mantido, dura 20.000–25.000 km; em uso esportivo/agressivo, pode precisar de troca antes dos 18.000 km.',
  },
  {
    severity: 'OK',
    title: 'Descontinuada no Brasil — peças ainda disponíveis, mas planeje com antecedência',
    body: 'A Kawasaki descontinuou a importação da Versys 1000 no Brasil por volta de 2021/2022, substituindo-a pela Versys 1100. Isso não significa falta de peças: motor e chassi compartilham muitos componentes com a Z1000 e a Ninja 1000/Z1000SX, que seguem vendidas — filtro de óleo, corrente, pastilhas de freio e itens de desgaste continuam com boa disponibilidade via concessionárias Kawasaki e distribuidoras de peças. Componentes exclusivos de carenagem/plástico da Versys 1000 podem levar mais tempo para chegar por serem importados sob encomenda.',
  },
  {
    severity: 'OK',
    title: 'Versão Grand Tourer com KECS: cuide da bateria para não perder a calibração da suspensão',
    body: 'A versão Grand Tourer da Versys 1000 tem o sistema KECS (Kawasaki Electronic Control Suspension), com amortecimento semi-ativo controlado por sensores e central eletrônica. Esse sistema é sensível a quedas de tensão da bateria — se a bateria enfraquecer, o painel pode indicar erro na suspensão eletrônica mesmo sem defeito mecânico real. Mantenha a bateria sempre acima de 12,4V em repouso e, ao notar qualquer alerta relacionado à suspensão no painel, teste primeiro a bateria antes de assumir defeito nos amortecedores.',
  },
  {
    severity: 'OK',
    title: 'Pneus 120/70-17 e 180/55-17: opções touring de alta performance para o peso da moto',
    body: 'Com cerca de 250 kg em ordem de marcha, a Versys 1000 exige pneus de boa capacidade de carga. Recomendados: Bridgestone Battlax T32, Michelin Road 6, Pirelli Angel GT II ou Metzeler Roadtec 01 SE — todos com boa reputação para touring de alta performance. Traseiro (180/55-17) costuma durar 10.000–14.000 km em uso misto; dianteiro dura o dobro.',
  },
]

const VERSYS1000_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Vazamento em amortecedor dianteiro (bengala) fora do prazo de garantia é reclamação recorrente',
    body: 'Há relatos de proprietários no Brasil com vazamento de óleo pela bengala dianteira que a Kawasaki não cobriu por estar fora do prazo de garantia, mesmo em quilometragem relativamente baixa. Vedantes de bengala têm vida útil variável conforme uso (pavimento ruim acelera o desgaste). Inspecione visualmente os tubos da bengala a cada 5.000 km — óleo escuro na parte inferior do tubo é sinal de retentor gasto. Reparo preventivo (troca de retentor) é mais barato que esperar o vazamento comprometer o amortecimento.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico e injeção: falhas de partida e glitches em altitude são queixas reportadas',
    body: 'Proprietários da família Z1000/Versys 1000 (motor compartilhado) relatam ocasionalmente problemas de partida difícil a frio e pequenas variações na resposta da injeção em altitudes elevadas — normalmente relacionados a sensores de posição de borboleta ou de temperatura do ar de admissão fora de calibração. Se notar marcha lenta instável ou dificuldade de partida, a limpeza do corpo de borboleta e verificação dos sensores costuma resolver; problema recorrente após isso pode indicar sensor de TPS com defeito.',
  },
  {
    severity: 'WARN',
    title: 'Recall histórico do mangueira de freio dianteiro em modelos da plataforma Z1000/Versys',
    body: 'A Kawasaki emitiu um recall (2010, aplicável a modelos que compartilham chassi/motor com a Z1000, incluindo primeiras Versys 1000) para substituição da mangueira de freio dianteiro — sob compressão extrema da suspensão dianteira, a mangueira poderia encostar no disco de freio e sofrer desgaste prematuro. Se você adquiriu uma Versys 1000 usada, confirme no histórico se o recall foi realizado (consulte o chassi no site da Kawasaki Brasil, seção de recalls).',
  },
  {
    severity: 'WARN',
    title: 'Consumo de óleo levemente acima do normal em motores de alta rotação após rodagem longa',
    body: 'O motor de 4 cilindros de alta rotação (redline acima de 10.000 rpm) da Versys 1000 pode apresentar consumo de óleo perceptível — 200–500mL entre trocas de 6.000 km — especialmente em unidades usadas com frequência em rotações altas. Isso é considerado dentro do aceitável para esse tipo de motor esportivo/touring, mas verifique o nível a cada 1.000 km via visor lateral. Consumo acima de 500mL/6.000km sem vazamento externo visível merece investigação de anéis de pistão ou retentores de válvula.',
  },
  {
    severity: 'OK',
    title: 'Ruído de embreagem em marcha lenta é característica normal do motor multi-cilindro',
    body: 'É comum ouvir um leve ruído mecânico da embreagem em marcha lenta com a moto parada e engatada em ponto morto — a embreagem multidisco a úmido desse motor de 4 cilindros produz esse som mesmo em unidades saudáveis, especialmente quando o óleo está mais velho/fino. Não é sinal de defeito por si só. Fique atento apenas se o ruído mudar de tom para uma batida metálica seca, ou se vier acompanhado de dificuldade para engatar marchas.',
  },
]

const VERSYS1000_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Versys 1000 (2015–2021): motor 4 cilindros pede revisões mais frequentes',
    body: '1.000 km — Revisão de amaciamento: óleo (10W-40, 3,8L com filtro) + filtro. Torque geral do motor. | 6.000 km — Óleo + filtro. Corrente 525 (lubrificar + regular). | 12.000 km — Óleo + filtro. Filtro de ar. Fluido de freio (inspeção, 2 discos dianteiros). | 18.000 km — Óleo + filtro. Verificar as 4 velas CR9EIA-9. Pastilhas de freio (inspeção). | 24.000 km — Óleo + filtro. Folga de válvulas (checagem oficial — motor 4 cilindros, 16 válvulas). Fluido de freio (troca). | 30.000 km — Troca das 4 velas. Kit relação (avaliar substituição). Verificar bateria/sistema KECS (versão GT). | 36.000 km — Líquido de arrefecimento (troca). Rolamentos de roda e direção (inspeção).',
  },
]

// ─── VERSYS 1100 (+ SE GRAND TOURER) ────────────────────────────────────────────
// Motor: 1.043cc DOHC 4 cilindros em linha, líquido, 16 válvulas | Potência: ~140 cv @ 9.000 rpm
// Torque: ~11,2 kgf.m @ 7.600 rpm | Injeção com corpo de borboleta eletrônico (throttle-by-wire)
// Óleo: 10W-40 API SN/JASO MA — aprox. 3,8L (com filtro) | Vela: NGK iridium (4 unid.), gap 0,9mm
// Pneu: 120/70ZR17 (F) / 180/55ZR17 (R) (versão SE pode variar 180/60-17 conforme especificação)
// Corrente 525 | Tanque: 21L | SE GT: suspensão semi-ativa KECS de 2ª geração (Skyhook Showa)

const VERSYS1100_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA — mesma base do motor da Versys 1000, capacidade próxima de 3,8L',
    body: 'O motor 1.043cc da Versys 1100 é uma evolução do motor da Versys 1000, com ajustes na injeção e mais potência (cerca de 140 cv). A capacidade de óleo se mantém próxima: cerca de 3,8L com troca de filtro. Use 10W-40 sintético JASO MA — Motul 7100 ou 300V (para uso mais esportivo/viagem em alta rotação), Shell Advance Ultra 4T. Intervalo Kawasaki: 6.000 km ou 12 meses. Motor com corpo de borboleta eletrônico (throttle-by-wire) é mais sensível a óleo fora de especificação — não economize na qualidade.',
  },
  {
    severity: 'OK',
    title: '4 velas iridium NGK — troca programada junto com outros itens por causa do acesso',
    body: 'Como na Versys 1000, são 4 velas de ignição (iridium NGK, gap aproximado de 0,9mm), uma por cilindro, com acesso que exige remoção do tanque. Vida útil esperada: 20.000–24.000 km. Planeje a troca das 4 velas junto com a revisão de óleo/filtro de mesma quilometragem para economizar mão de obra. Sempre troque as 4 juntas — misturar vela nova com gasta em motor 4 cilindros de alta rotação gera desbalanço de combustão perceptível.',
  },
  {
    severity: 'OK',
    title: 'Corrente 525 e kit relação — mesma robustez da Versys 1000, ajuste eletrônico não substitui manutenção mecânica',
    body: 'A Versys 1100 mantém a corrente 525 de maior robustez. Mesmo com toda eletrônica de assistência (KTRC, modos de potência, cruise control), a corrente exige manutenção manual: lubrificação a cada 500–600 km e verificação de folga a cada 1.000 km. Kit relação DID ou RK com retentor: R$ 700–1.000. A eletrônica da moto não avisa sobre desgaste de corrente — isso é responsabilidade do proprietário/oficina em cada revisão.',
  },
  {
    severity: 'OK',
    title: 'Suspensão semi-ativa KECS (SE Grand Tourer): mantenha o firmware atualizado na concessionária',
    body: 'A versão SE Grand Tourer usa a 2ª geração do sistema KECS com tecnologia Skyhook da Showa — suspensão semi-ativa que ajusta o amortecimento em tempo real conforme sensores de curso e a IMU (unidade de medição inercial). Esse sistema recebe atualizações de calibração da Kawasaki periodicamente. Em revisões na concessionária, pergunte se há atualização de firmware disponível para o módulo de suspensão — isso pode melhorar a resposta do sistema sem custo de peça.',
  },
  {
    severity: 'OK',
    title: 'Modos de potência e cruise control: ajuste conforme o tipo de viagem para economizar combustível',
    body: 'A Versys 1100 (e SE GT) tem modos de potência selecionáveis (Full/Low) e cruise control eletrônico de série. Para viagens longas de estrada reta, o cruise control reduz fadiga e ajuda a manter consumo mais constante. Em uso urbano ou trechos sinuosos, o modo de potência reduzido (Low, cerca de 75% da potência total) facilita o controle e é mais suave para pilotos com menos experiência na moto grande — não compromete a durabilidade do motor usar o modo reduzido no dia a dia.',
  },
  {
    severity: 'OK',
    title: 'Capacidade de carga (piloto + garupa + bagagem) de até 220kg — respeite para não sobrecarregar suspensão',
    body: 'A Versys 1100 tem capacidade de carga útil especificada pela Kawasaki em torno de 220 kg somando piloto, passageiro e bagagem. Em viagens longas com alforjes e topcase cheios mais garupa, é fácil se aproximar desse limite — pese a bagagem antes de sair, especialmente em viagens de vários dias. Excesso de carga acelera desgaste de pneus, suspensão e freios, além de alterar a geometria de direção da moto em curvas.',
  },
]

const VERSYS1100_PROBLEMAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Confiabilidade do motor 4 cilindros é ponto forte — relatos de longo prazo são positivos',
    body: 'Relatos de proprietários de longa data com a plataforma de motor 1043cc (Versys 1000/1100, Z1000, Ninja 1000) indicam boa confiabilidade mecânica geral — casos de motos com 60.000 km reportando apenas troca de retentor e um ajuste inicial no corpo de borboleta, sem quebras estruturais. Isso não substitui a manutenção preventiva, mas é um indicativo de que o motor é robusto quando bem cuidado (óleo em dia, corrente regulada, revisões cumpridas).',
  },
  {
    severity: 'WARN',
    title: 'Custo elevado de manutenção da suspensão eletrônica semi-ativa na versão SE',
    body: 'A suspensão KECS semi-ativa da versão SE Grand Tourer é mais complexa (e cara de reparar) que uma suspensão convencional — sensores, atuadores e a central eletrônica dedicada aumentam o custo de peças em caso de pane. Se o painel indicar erro de suspensão, não ignore: pode ser algo simples (conector solto, bateria fraca) ou algo que exija diagnóstico especializado em concessionária Kawasaki (poucas oficinas independentes têm o scanner específico para esse sistema).',
  },
  {
    severity: 'WARN',
    title: 'Consumo de combustível varia bastante conforme modo de potência e estilo de pilotagem',
    body: 'Por ser um motor de 4 cilindros de alta rotação com quase 140cv, o consumo da Versys 1100 pode variar significativamente entre uso moderado em modo Low (algo como 16–18 km/L) e uso esportivo em modo Full com giros altos (podendo cair para 12–14 km/L). Isso não é defeito, é característica do motor — planeje a autonomia de viagem considerando o estilo de pilotagem real, não apenas a média informada em testes de revista.',
  },
  {
    severity: 'WARN',
    title: 'Corpo de borboleta eletrônico (throttle-by-wire): mantenha atualização e limpeza em dia',
    body: 'O acelerador eletrônico (ride-by-wire) da Versys 1100 depende de sensores e calibração eletrônica para entregar resposta suave. Acúmulo de sujeira/carbono no corpo de borboleta ao longo do tempo pode causar resposta de acelerador irregular ou marcha lenta instável — geralmente resolvido com limpeza especializada na revisão. Evite desligar a moto imediatamente após giros altos sustentados; deixe alguns segundos em marcha lenta para o sistema estabilizar antes de desligar.',
  },
  {
    severity: 'WARN',
    title: 'Peso elevado (~257 kg em ordem de marcha) exige atenção redobrada em manobras a baixa velocidade',
    body: 'A Versys 1100, principalmente a versão SE Grand Tourer equipada com baús e proteções, chega a pesar em torno de 250–260 kg em ordem de marcha. Isso não é um "problema" mecânico, mas é um ponto de atenção real para pilotos menos experientes com motos grandes: em manobras de estacionamento, U-turn ou em piso irregular, o peso exige técnica correta (embreagem/freio traseiro, postura) para evitar queda por perda de equilíbrio em baixíssima velocidade.',
  },
]

const VERSYS1100_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Versys 1100 / SE Grand Tourer: eletrônica avançada não dispensa manutenção mecânica tradicional',
    body: '1.000 km — Revisão de amaciamento: óleo (10W-40, ~3,8L com filtro) + filtro. Torque geral. | 6.000 km — Óleo + filtro. Corrente 525 (lubrificar + regular). Verificar sistema de freios (2 discos dianteiros). | 12.000 km — Óleo + filtro. Filtro de ar. Verificar firmware/atualizações eletrônicas na concessionária (versão SE). | 18.000 km — Óleo + filtro. Verificar 4 velas iridium. Pastilhas de freio (inspeção). | 24.000 km — Óleo + filtro. Folga de válvulas (checagem oficial, 16 válvulas). Fluido de freio (troca). | 30.000 km — Troca das 4 velas. Kit relação (avaliar substituição). Diagnóstico completo da suspensão KECS (versão SE). | 36.000 km — Líquido de arrefecimento (troca). Rolamentos de roda e coluna de direção. Revisão completa de sensores do IMU (versão SE).',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'VERSYS-X 300',
    yearFrom: 2017,
    yearTo: null,
    MACETES: VERSYSX300_MACETES,
    PROBLEMAS: VERSYSX300_PROBLEMAS,
    MANUTENCAO: VERSYSX300_MANUTENCAO,
  },
  {
    modelName: 'VERSYS 650',
    yearFrom: 2010,
    yearTo: null,
    MACETES: VERSYS650_MACETES,
    PROBLEMAS: VERSYS650_PROBLEMAS,
    MANUTENCAO: VERSYS650_MANUTENCAO,
  },
  {
    modelName: 'VERSYS 1000',
    yearFrom: 2015,
    yearTo: 2021,
    MACETES: VERSYS1000_MACETES,
    PROBLEMAS: VERSYS1000_PROBLEMAS,
    MANUTENCAO: VERSYS1000_MANUTENCAO,
  },
  {
    modelName: 'VERSYS 1100',
    yearFrom: 2022,
    yearTo: null,
    MACETES: VERSYS1100_MACETES,
    PROBLEMAS: VERSYS1100_PROBLEMAS,
    MANUTENCAO: VERSYS1100_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'VERSYS-X 300',
    yearFrom: 2017, yearTo: null,
    tireSize: '100/90-19 (F) · 130/80-17 (R)',
    frontPsi: 28, rearPsi: 32,
    frontPsiLoad: 28, rearPsiLoad: 36,
    notes: 'Solo (a frio): F 28 / R 32 PSI (200/225 kPa, conforme manual do proprietário). Com garupa/bagagem: F 28 / R 36 PSI — o dianteiro normalmente não sobe muito com carga, o traseiro sim. Off-road leve (terra/cascalho compactado): reduza 3-4 PSI apenas em trechos de terra, recalibre ao voltar ao asfalto. Pneus recomendados: Pirelli Scorpion Trail II, Dunlop Trailmax Mission (original), Michelin Anakee Street.',
  },
  {
    modelName: 'VERSYS 650',
    yearFrom: 2010, yearTo: null,
    tireSize: '120/70ZR17 (F) · 160/60ZR17 (R)',
    frontPsi: 33, rearPsi: 36,
    frontPsiLoad: 33, rearPsiLoad: 42,
    notes: 'Solo (a frio, até ~150kg): F 33 / R 36 PSI (225/250 kPa, valor oficial do manual do proprietário Kawasaki). Com garupa/bagagem (150-210kg): F 33 / R 42 PSI (225/290 kPa) — o traseiro sobe bastante com carga, o dianteiro se mantém igual. Meça sempre com pneu frio (moto parada há mais de 3h ou rodada menos de 1,5km). Pneus recomendados: Michelin Road 6, Pirelli Angel GT II, Metzeler Roadtec 01.',
  },
  {
    modelName: 'VERSYS 1000',
    yearFrom: 2015, yearTo: 2021,
    tireSize: '120/70ZR17 (F) · 180/55ZR17 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 42,
    notes: 'Valor oficial do manual (Versys 1000 LT): F 36 / R 42 PSI (250/290 kPa) a frio — Kawasaki já especifica esse valor considerando uso com carga/touring típico do modelo. Com bagageiros (alforjes + topcase) cheios: mantenha 42 PSI no traseiro (limite já é o de carga máxima da Kawasaki) e considere reduzir levemente a velocidade de cruzeiro em vez de exceder a pressão. Pneus recomendados: Bridgestone Battlax T32, Michelin Road 6, Metzeler Roadtec 01 SE.',
  },
  {
    modelName: 'VERSYS 1100',
    yearFrom: 2022, yearTo: null,
    tireSize: '120/70ZR17 (F) · 180/55ZR17 (R)',
    frontPsi: 36, rearPsi: 42,
    frontPsiLoad: 36, rearPsiLoad: 42,
    notes: 'Mesma base de pressão da Versys 1000 (motor e chassi evoluídos da mesma plataforma): F 36 / R 42 PSI a frio. NOTA: não localizamos o manual oficial específico da Versys 1100 SE Grand Tourer 2022+ para confirmar se a Kawasaki alterou esse valor com a nova geração — use estes números como referência e confirme na etiqueta de calibragem afixada no basculante/chassi da sua unidade específica, que é sempre a fonte mais confiável. Com bagagem completa (alforjes + topcase, até ~220kg de carga útil): mantenha 42 PSI traseiro, não exceda.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // VERSYS-X 300
  { modelName: 'VERSYS-X 300', yearFrom: 2017, yearTo: null, component: 'Óleo 10W-40 JASO MA2 (2,2L serviço / 2,4L 1º enchimento)', intervalKm: 6000, intervalMonths: 12, notes: 'Motor 296cc DOHC. Embreagem úmida — JASO MA2 obrigatório.', priority: 'HIGH', order: 1 },
  { modelName: 'VERSYS-X 300', yearFrom: 2017, yearTo: null, component: 'Filtro de óleo', intervalKm: 6000, intervalMonths: 12, notes: 'Trocar junto com o óleo. Aplicar óleo no O-ring antes de montar.', priority: 'MEDIUM', order: 2 },
  { modelName: 'VERSYS-X 300', yearFrom: 2017, yearTo: null, component: 'Vela NGK CR8E (gap 0,8mm)', intervalKm: 12000, intervalMonths: null, notes: 'Iridium CR8EIX dura o dobro (~16.000 km). Melhor resposta em baixa rotação.', priority: 'MEDIUM', order: 3 },
  { modelName: 'VERSYS-X 300', yearFrom: 2017, yearTo: null, component: 'Corrente 520 — lubrificação', intervalKm: 500, intervalMonths: null, notes: 'A cada 500-600 km e após chuva/trechos de terra. Verificar folga a cada 1.000 km.', priority: 'HIGH', order: 4 },
  { modelName: 'VERSYS-X 300', yearFrom: 2017, yearTo: null, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Inspecionar a cada 6.000 km em uso com poeira/trilha leve. HifloFiltro HFA2915 compatível.', priority: 'MEDIUM', order: 5 },
  { modelName: 'VERSYS-X 300', yearFrom: 2017, yearTo: null, component: 'Folga de válvulas', intervalKm: 24000, intervalMonths: 24, notes: 'Checagem oficial Kawasaki. Motor frio obrigatório.', priority: 'HIGH', order: 6 },
  { modelName: 'VERSYS-X 300', yearFrom: 2017, yearTo: null, component: 'Kit relação (corrente + pinhão + coroa) 520', intervalKm: 36000, intervalMonths: null, notes: 'DID ou RK. Trocar kit completo, não só a corrente.', priority: 'HIGH', order: 7 },
  { modelName: 'VERSYS-X 300', yearFrom: 2017, yearTo: null, component: 'Pastilhas de freio (dianteiro/traseiro)', intervalKm: 12000, intervalMonths: null, notes: 'Inspecionar a cada revisão. Espessura mínima ~1mm de material.', priority: 'MEDIUM', order: 8 },
  { modelName: 'VERSYS-X 300', yearFrom: 2017, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Troca bienal obrigatória — absorve umidade e perde eficiência.', priority: 'HIGH', order: 9 },
  { modelName: 'VERSYS-X 300', yearFrom: 2017, yearTo: null, component: 'Bateria — verificação de tensão', intervalKm: null, intervalMonths: 6, notes: 'Vida útil curta relatada por donos (~1,5 ano). Verificar >12,4V em repouso. YTZ7S ou equivalente.', priority: 'MEDIUM', order: 10 },

  // VERSYS 650
  { modelName: 'VERSYS 650', yearFrom: 2010, yearTo: null, component: 'Óleo 10W-40 JASO MA (2,3L)', intervalKm: 6000, intervalMonths: 12, notes: 'Motor 649cc DOHC paralelo-twin. Troque por tempo mesmo com pouca km rodada.', priority: 'HIGH', order: 1 },
  { modelName: 'VERSYS 650', yearFrom: 2010, yearTo: null, component: 'Filtro de óleo (código 16097-0008)', intervalKm: 6000, intervalMonths: 12, notes: 'Compartilhado com ER-6n/ER-6f e Versys 1000 antiga. Fácil de achar no Brasil.', priority: 'MEDIUM', order: 2 },
  { modelName: 'VERSYS 650', yearFrom: 2010, yearTo: null, component: 'Vela NGK CR9EIA-9 iridium (gap 0,9mm)', intervalKm: 20000, intervalMonths: null, notes: 'De fábrica já é iridium. Convencional CR9EK: trocar a cada 8-10.000 km.', priority: 'MEDIUM', order: 3 },
  { modelName: 'VERSYS 650', yearFrom: 2010, yearTo: null, component: 'Corrente 520 — lubrificação e regulagem', intervalKm: 500, intervalMonths: null, notes: 'Folga 25-35mm no trecho inferior central. Verificar a cada 1.000 km.', priority: 'HIGH', order: 4 },
  { modelName: 'VERSYS 650', yearFrom: 2010, yearTo: null, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Trocar. Não lavar (filtro de papel).', priority: 'MEDIUM', order: 5 },
  { modelName: 'VERSYS 650', yearFrom: 2010, yearTo: null, component: 'Folga de válvulas', intervalKm: 18000, intervalMonths: 24, notes: 'Checagem oficial Kawasaki. Motor frio.', priority: 'HIGH', order: 6 },
  { modelName: 'VERSYS 650', yearFrom: 2010, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Troca bienal. Não misturar com DOT 3/5.', priority: 'HIGH', order: 7 },
  { modelName: 'VERSYS 650', yearFrom: 2010, yearTo: null, component: 'Kit relação 520 completo', intervalKm: 25000, intervalMonths: null, notes: 'DID/RK com O-ring. Trocar coroa+pinhão+corrente juntos.', priority: 'HIGH', order: 8 },
  { modelName: 'VERSYS 650', yearFrom: 2010, yearTo: null, component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 36, notes: 'Troca trienal. Falha do eixo da bomba d\'água é problema documentado — inspecionar óleo (aspecto leitoso = alerta).', priority: 'CRITICAL', order: 9 },
  { modelName: 'VERSYS 650', yearFrom: 2010, yearTo: null, component: 'Verificação de tensão do estator/carga', intervalKm: null, intervalMonths: 12, notes: 'Falha do estator é o problema elétrico mais documentado (~45-53.000 km). Medir 13,5-14,5V @ 5.000 rpm.', priority: 'CRITICAL', order: 10 },

  // VERSYS 1000
  { modelName: 'VERSYS 1000', yearFrom: 2015, yearTo: 2021, component: 'Óleo 10W-40 JASO MA (3,2L sem filtro / 3,8L com filtro)', intervalKm: 6000, intervalMonths: 12, notes: 'Motor 1.043cc 4 cilindros. Trocar sempre com filtro junto quando possível.', priority: 'HIGH', order: 1 },
  { modelName: 'VERSYS 1000', yearFrom: 2015, yearTo: 2021, component: 'Filtro de óleo', intervalKm: 6000, intervalMonths: 12, notes: 'Compartilhado com Z1000/Ninja 1000 da mesma geração — boa disponibilidade.', priority: 'MEDIUM', order: 2 },
  { modelName: 'VERSYS 1000', yearFrom: 2015, yearTo: 2021, component: 'Velas NGK CR9EIA-9 iridium ×4 (gap 0,9mm)', intervalKm: 20000, intervalMonths: null, notes: 'Acesso exige remoção do tanque. Trocar sempre as 4 juntas.', priority: 'HIGH', order: 3 },
  { modelName: 'VERSYS 1000', yearFrom: 2015, yearTo: 2021, component: 'Corrente 525 — lubrificação e regulagem', intervalKm: 500, intervalMonths: null, notes: 'Motor de quase 120cv exige corrente mais robusta. Verificar folga a cada 1.000 km.', priority: 'HIGH', order: 4 },
  { modelName: 'VERSYS 1000', yearFrom: 2015, yearTo: 2021, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Trocar. Filtro de papel, não lavar.', priority: 'MEDIUM', order: 5 },
  { modelName: 'VERSYS 1000', yearFrom: 2015, yearTo: 2021, component: 'Folga de válvulas', intervalKm: 24000, intervalMonths: 24, notes: 'Motor 16 válvulas DOHC. Checagem oficial obrigatória.', priority: 'HIGH', order: 6 },
  { modelName: 'VERSYS 1000', yearFrom: 2015, yearTo: 2021, component: 'Fluido de freio DOT 4 (2 discos dianteiros)', intervalKm: null, intervalMonths: 24, notes: 'Troca bienal. Purgar das pinças para o reservatório.', priority: 'HIGH', order: 7 },
  { modelName: 'VERSYS 1000', yearFrom: 2015, yearTo: 2021, component: 'Kit relação 525 completo', intervalKm: 25000, intervalMonths: null, notes: 'DID/RK com X-ring. Uso esportivo pode exigir troca antes dos 18.000 km.', priority: 'HIGH', order: 8 },
  { modelName: 'VERSYS 1000', yearFrom: 2015, yearTo: 2021, component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 36, notes: 'Troca trienal.', priority: 'MEDIUM', order: 9 },
  { modelName: 'VERSYS 1000', yearFrom: 2015, yearTo: 2021, component: 'Verificação bateria/sistema KECS (versão Grand Tourer)', intervalKm: null, intervalMonths: 6, notes: 'Suspensão semi-ativa é sensível a queda de tensão. Manter >12,4V em repouso.', priority: 'MEDIUM', order: 10 },

  // VERSYS 1100
  { modelName: 'VERSYS 1100', yearFrom: 2022, yearTo: null, component: 'Óleo 10W-40 JASO MA (~3,8L com filtro)', intervalKm: 6000, intervalMonths: 12, notes: 'Motor 1.043cc evoluído da Versys 1000, ~140cv. Throttle-by-wire sensível a óleo fora de spec.', priority: 'HIGH', order: 1 },
  { modelName: 'VERSYS 1100', yearFrom: 2022, yearTo: null, component: 'Filtro de óleo', intervalKm: 6000, intervalMonths: 12, notes: 'Trocar junto com o óleo em toda revisão.', priority: 'MEDIUM', order: 2 },
  { modelName: 'VERSYS 1100', yearFrom: 2022, yearTo: null, component: 'Velas iridium NGK ×4 (gap ~0,9mm)', intervalKm: 20000, intervalMonths: null, notes: 'Acesso via remoção do tanque. Trocar as 4 juntas.', priority: 'HIGH', order: 3 },
  { modelName: 'VERSYS 1100', yearFrom: 2022, yearTo: null, component: 'Corrente 525 — lubrificação e regulagem', intervalKm: 500, intervalMonths: null, notes: 'Eletrônica não substitui manutenção manual da corrente. Verificar a cada 1.000 km.', priority: 'HIGH', order: 4 },
  { modelName: 'VERSYS 1100', yearFrom: 2022, yearTo: null, component: 'Filtro de ar', intervalKm: 12000, intervalMonths: 12, notes: 'Trocar. Filtro de papel.', priority: 'MEDIUM', order: 5 },
  { modelName: 'VERSYS 1100', yearFrom: 2022, yearTo: null, component: 'Folga de válvulas', intervalKm: 24000, intervalMonths: 24, notes: 'Motor 16 válvulas DOHC. Checagem oficial.', priority: 'HIGH', order: 6 },
  { modelName: 'VERSYS 1100', yearFrom: 2022, yearTo: null, component: 'Fluido de freio DOT 4 (2 discos dianteiros)', intervalKm: null, intervalMonths: 24, notes: 'Troca bienal.', priority: 'HIGH', order: 7 },
  { modelName: 'VERSYS 1100', yearFrom: 2022, yearTo: null, component: 'Kit relação 525 completo', intervalKm: 25000, intervalMonths: null, notes: 'DID/RK com X-ring.', priority: 'HIGH', order: 8 },
  { modelName: 'VERSYS 1100', yearFrom: 2022, yearTo: null, component: 'Diagnóstico/atualização suspensão KECS (versão SE Grand Tourer)', intervalKm: null, intervalMonths: 12, notes: 'Verificar firmware disponível na concessionária. Sistema caro de reparar — não ignore alertas.', priority: 'MEDIUM', order: 9 },
  { modelName: 'VERSYS 1100', yearFrom: 2022, yearTo: null, component: 'Líquido de arrefecimento', intervalKm: null, intervalMonths: 36, notes: 'Troca trienal.', priority: 'MEDIUM', order: 10 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Kawasaki Versys (X 300 / 650 / 1000 / 1100)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'KAWASAKI', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'KAWASAKI', vehicleTypeId: motoType.id },
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

  console.log('✅ Kawasaki Versys concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
