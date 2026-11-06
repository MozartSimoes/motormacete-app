/**
 * Seed Citroën C4 (família completa) — macetes, problemas, manutenção e
 * calibragem. Consolida e substitui o conteúdo de C4 espalhado no seed
 * legado (seed-citroen.ts), corrigindo faixas de ano desatualizadas e
 * adicionando o C4 Picasso (minivan de 7 lugares), ausente até então.
 *
 * C4 Hatch (2005-2014) e C4 Pallas/sedã (2007-2014): plataforma PF2,
 * motor EW10 2.0 16V ou TU5 1.6, câmbio manual ou automático AL4.
 * C4 Picasso 1ª geração (2009-2014): minivan 7 lugares sobre a mesma
 * mecânica EW10/AL4 do Hatch/Pallas. C4 Lounge (2014-2020): sedã que
 * substituiu o Pallas, plataforma EMP2 (compartilhada com Peugeot
 * 408/308), motor 2.0 aspirado ou 1.6 THP turbo, câmbio automático AT6
 * Aisin. C4 Picasso 2ª geração/Turbo (2016-2019): versão importada com
 * motor 1.6 THP + AT6 Aisin, mesma base do Lounge/Cactus. C4 Cactus
 * (2017-2024): motor 1.6 (aspirado ou THP turbo) + AT6 Aisin.
 * Recall real confirmado: airbag Takata, afetando especificamente as
 * linhas VTR/Hatch/Pallas e C4 Lounge. O travamento do câmbio AL4 em
 * 3ª marcha (Hatch/Pallas/Picasso 1ª geração) é um defeito crônico
 * amplamente documentado, mas nunca virou recall oficial.
 * Execute: pnpm --filter @motormacete/database db:seed:citroen-c4
 *
 * Fontes: reclameaqui.com.br, citroenclube.com.br, c4-clube.com,
 *         meucitroen.com.br, omecanico.com.br, garagem360.com.br,
 *         opinautos.com.br, comprecar.com.br, mobycar.pt,
 *         pressaopneus.pt, calibragemdepneu.com.br, webmotors.com.br,
 *         car.blog.br, oficinassp.com.br, maxturbos.com.br
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- C4 Hatch (2005-2014 — motor EW10 2.0 16V ou TU5 1.6, câmbio manual ou AL4) ----------
const MACETES_HATCH: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor, câmbio e boa parte da suspensão são compartilhados com C4 Pallas e C4 Picasso da mesma época',
    body: 'Hatch, Pallas e Picasso (1ª geração) foram construídos sobre a mesma plataforma PF2, com o mesmo motor EW10 2.0 16V (ou TU5 1.6), o mesmo câmbio automático AL4 e boa parte da suspensão dianteira. Ao procurar peça, pesquise também pela aplicação Pallas/Picasso — amplia bastante a oferta de peça alternativa e usada.',
  },
  {
    severity: 'WARN',
    title: 'Direção elétrica: não force no batente por mais de 5 segundos',
    body: 'A direção elétrica do C4 Hatch sobreaquece se você mantiver o volante encostado no batente durante manobras longas (estacionar, por exemplo). O rack elétrico é a peça mais cara do carro (R$ 2.500-5.000) — evite esse hábito para não encurtar a vida útil do componente.',
  },
  {
    severity: 'OK',
    title: 'Lâmpadas do farol (H1) queimam com frequência — use marca de qualidade e não toque no vidro',
    body: 'O alojamento do farol H1 do C4 Hatch acumula calor e favorece queima prematura da lâmpada, com relatos de até 3 trocas em 20.000 km. Use lâmpadas de marca reconhecida (Osram, Philips) e nunca toque o vidro da lâmpada com os dedos — a oleosidade da pele reduz ainda mais a vida útil.',
  },
]

const PROBLEMAS_HATCH: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Câmbio automático AL4 pode travar em 3ª marcha — defeito crônico, mas nunca virou recall oficial',
    body: 'É um problema amplamente documentado e reconhecido pela própria rede Citroën: o câmbio automático AL4 pode entrar em "modo de segurança" e travar na 3ª marcha, acendendo o aviso "SERVICE" no painel — geralmente ligado a falha de solenoide, desgaste interno ou problema eletrônico. Apesar de afetar centenas de veículos da família C4 (Hatch, Pallas, Picasso), nunca houve um recall oficial para esse defeito. Se notar troca de marcha estranha ou o aviso "SERVICE" aceso, procure uma oficina especializada em câmbio AL4 assim que possível — o carro ainda roda no modo de segurança, mas de forma limitada.',
  },
  {
    severity: 'DANGER',
    title: 'RECALL: airbag Takata — linha C4 VTR/Hatch/Pallas está entre os modelos convocados',
    body: 'A Citroën confirma que a linha C4 (VTR, Hatch e Pallas) está entre os principais modelos envolvidos no recall global de airbag Takata, que pode ejetar fragmentos metálicos em caso de acionamento. A verificação pelo número do chassi é a única forma confiável de saber se o seu carro está na lista — consulte pelo 0800 011 8088, no site da Citroën ou no portal Senatran, informando o chassi. O reparo é gratuito.',
  },
]

const MANUTENCAO_HATCH: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Cronograma C4 Hatch 2005-2014 (EW10 2.0 16V ou TU5 1.6)',
    body: '10.000 km — Troca de óleo do motor + filtro. | 60.000-80.000 km — Correia dentada + tensor + roldana + bomba d\'água no motor 2.0 EW10 (motor interferente — no Brasil, por segurança, antecipe para 60.000 km). | 40.000 km — Fluido do câmbio automático AL4 (ELF Renaultmatic D3 SYN). | Sempre — evite forçar a direção elétrica no batente. | Verifique o chassi no recall de airbag Takata.',
  },
]

// ---------- C4 Pallas (2007-2014 — sedã, motor EW10 2.0 16V ou TU5 1.6, câmbio manual ou AL4) ----------
const MACETES_PALLAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesma mecânica do Hatch e do Picasso — pesquise peça por essas aplicações também',
    body: 'O C4 Pallas compartilha motor, câmbio e boa parte da suspensão com o C4 Hatch e o C4 Picasso da mesma época. Peça de motor, câmbio e freio costuma ter o mesmo código entre os três — pesquisar pela aplicação Hatch/Picasso amplia a oferta de peça alternativa.',
  },
  {
    severity: 'WARN',
    title: 'Direção hidráulica: use exclusivamente fluido LHM+ verde mineral — ATF vermelho destrói as vedações',
    body: 'A direção hidráulica do Pallas usa fluido LHM+ mineral verde, específico da Citroën/PSA — jamais complete ou troque por ATF vermelho comum (usado em câmbios automáticos), pois ele ataca e destrói as vedações do rack de direção. O reparo do rack por esse erro custa entre R$ 2.500 e R$ 5.000.',
  },
]

const PROBLEMAS_PALLAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Trocador de calor do câmbio AL4 pode contaminar o líquido de arrefecimento — inspecione a cor do líquido',
    body: 'Nas versões automáticas 2.0, o trocador de calor do câmbio AL4 (que usa o próprio sistema de arrefecimento do motor para resfriar o fluido do câmbio) é um ponto vulnerável: se perfurar, o fluido ATF contamina o líquido de arrefecimento, deixando-o com uma coloração avermelhada. Verifique essa cor periodicamente — identificar cedo evita que o problema avance e danifique o câmbio por completo. Considere instalar um radiador externo de óleo de câmbio (R$ 350-600) como prevenção.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio automático AL4 pode travar em 3ª marcha — mesmo defeito crônico da família C4, sem recall oficial',
    body: 'Assim como no Hatch e no Picasso da mesma geração, o câmbio AL4 do Pallas pode entrar em modo de segurança e travar na 3ª marcha (aviso "SERVICE" no painel). É um defeito crônico reconhecido, mas nunca houve recall oficial — procure uma oficina especializada em AL4 ao notar o sintoma.',
  },
  {
    severity: 'DANGER',
    title: 'RECALL: airbag Takata — linha C4 VTR/Hatch/Pallas está entre os modelos convocados',
    body: 'O Pallas está entre os modelos da linha C4 confirmados no recall global de airbag Takata. Verifique o chassi pelo 0800 011 8088, no site da Citroën ou no portal Senatran — o reparo é gratuito.',
  },
]

const MANUTENCAO_PALLAS: TipInput[] = [
  { severity: 'WARN', title: 'Cronograma C4 Pallas 2007-2014 (EW10 2.0 16V ou TU5 1.6)', body: '10.000 km — Óleo do motor (2.0: 5W40 sintético · 1.6: 5W40 semissintético). | 60.000 km — Correia dentada + 2 tensores + bomba d\'água (motor interferente, antecipe dos 80.000 km oficiais por segurança). | 40.000 km — Fluido do câmbio AL4 (ELF Renaultmatic D3 SYN). | 30.000 km — Verificação do trocador de calor do câmbio (cor do líquido de arrefecimento). | 24 meses — Fluido de direção hidráulica LHM+ (nunca ATF vermelho). | 30.000 km — Filtro de combustível (sob o assoalho). | 15.000 km — Filtro de ar do motor. | 30.000 km — Velas de ignição. | 50.000 km — Inspeção dos amortecedores traseiros. | 40.000 km — Inspeção do sensor de temperatura NTC.' },
]

// ---------- C4 Picasso 1ª geração (2009-2014 — minivan 7 lugares, motor EW10 2.0 16V, câmbio AL4) ----------
const MACETES_PICASSO1: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mecânica idêntica ao Hatch/Pallas da época — só a carroceria de 7 lugares muda',
    body: 'O C4 Picasso dessa geração usa o mesmo motor EW10 2.0 16V e o mesmo câmbio AL4 do Hatch e do Pallas — a diferença está na carroceria (minivan de 7 lugares) e na suspensão traseira, adaptada para o peso extra. Peça de motor, câmbio, freio e boa parte da suspensão dianteira tem o mesmo código do Hatch/Pallas.',
  },
  {
    severity: 'OK',
    title: 'Lubrifique os trilhos e dobradiças da 3ª fileira de bancos periodicamente',
    body: 'Os trilhos e dobradiças dos bancos da terceira fileira (rebatíveis/removíveis) emperram com o tempo se ficarem sem lubrificação, dificultando o rebatimento. Uma limpeza e lubrificação leve a cada poucos meses evita esse desgaste e mantém o mecanismo funcionando suave.',
  },
]

const PROBLEMAS_PICASSO1: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Câmbio automático AL4 pode travar em 3ª marcha — o Picasso está entre os modelos mais citados nesse defeito crônico',
    body: 'Relatos de consumidores apontam o C4 Picasso (e o Grand Picasso) entre os modelos mais afetados pelo travamento do câmbio AL4 em 3ª marcha, com o aviso "SERVICE" aceso no painel — o mesmo defeito crônico do Hatch/Pallas, sem recall oficial até hoje. Ao notar o sintoma, procure uma oficina especializada em AL4; o reparo completo pode custar na faixa de R$ 10.000, então vale buscar diagnóstico antes de fechar orçamento fechado.',
  },
]

const MANUTENCAO_PICASSO1: TipInput[] = [
  { severity: 'WARN', title: 'Cronograma C4 Picasso 2009-2014 (EW10 2.0 16V, câmbio AL4)', body: '10.000 km — Óleo do motor 5W40 sintético. | 60.000 km — Correia dentada + tensores + bomba d\'água (motor interferente, antecipe dos 80.000 km oficiais). | 40.000 km — Fluido do câmbio AL4. | Periodicamente — Lubrificação dos trilhos/dobradiças da 3ª fileira de bancos. | 30.000 km — Verificação do trocador de calor do câmbio (cor do líquido de arrefecimento).' },
]

// ---------- C4 Lounge (2014-2020 — sedã, plataforma EMP2, motor 2.0 aspirado ou 1.6 THP turbo, câmbio AT6 Aisin) ----------
const MACETES_LOUNGE: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Motor 1.6 THP: manutenção em dia evita o principal problema crônico — corrente de comando esticando',
    body: 'O motor 1.6 THP turbo não é "problemático" por natureza, mas é sensível a atraso de revisão e óleo fora de especificação — a má fama vem principalmente de unidades sem manutenção correta. Fique atento a ruído na partida a frio (sinal de folga na corrente de comando) e nunca prolongue o intervalo de troca de óleo além do recomendado, já que a injeção direta favorece acúmulo de carbono nas válvulas quando o óleo está degradado.',
  },
  {
    severity: 'OK',
    title: 'Câmbio automático AT6 (Aisin): robusto, mas peça periódica de óleo é obrigatória — não é vitalício',
    body: 'O câmbio automático de 6 marchas fornecido pela Aisin (AT6), usado em todas as motorizações do Lounge, é considerado robusto para os padrões da categoria, mas seu maior ponto fraco é o conversor de torque — que se beneficia diretamente da troca periódica do óleo do câmbio. Não acredite que essa caixa é "vitalícia": negligenciar a troca acelera o desgaste do conversor.',
  },
]

const PROBLEMAS_LOUNGE: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Ruído na partida a frio no motor 1.6 THP pode ser corrente de comando esticando — não ignore',
    body: 'Há relatos recorrentes e documentados de corrente de comando (corrente de distribuição) esticando prematuramente no motor 1.6 THP do Lounge, em alguns casos já a partir de 30.000 km, mais comumente entre 70.000-100.000 km em carros sem manutenção rigorosa. O sintoma inicial costuma ser ruído metálico na partida a frio, que piora com o tempo. Não normalize esse ruído — o diagnóstico precoce evita dano maior ao motor.',
  },
  {
    severity: 'DANGER',
    title: 'RECALL: airbag Takata — C4 Lounge também está na lista de convocação',
    body: 'A Citroën confirma que o C4 Lounge também está sujeito ao recall global de airbag Takata. Verifique o chassi pelo 0800 011 8088, no site da Citroën ou no portal Senatran — o reparo é gratuito.',
  },
]

const MANUTENCAO_LOUNGE: TipInput[] = [
  { severity: 'WARN', title: 'Cronograma C4 Lounge 2014-2020 (2.0 aspirado ou 1.6 THP turbo, câmbio AT6 Aisin)', body: '10.000 km — Óleo do motor + filtro, sintético de qualidade (essencial no 1.6 THP turbo). | Sempre — atenção a ruído na partida a frio (corrente de comando, motor 1.6 THP). | 40.000-60.000 km — Fluido do câmbio automático AT6 Aisin. | Verifique o chassi no recall de airbag Takata.' },
]

// ---------- C4 Picasso 2ª geração / Turbo (2016-2019 — importado, motor 1.6 THP, câmbio AT6 Aisin) ----------
const MACETES_PICASSO2: TipInput[] = [
  {
    severity: 'OK',
    title: 'Compartilha motor 1.6 THP e câmbio AT6 Aisin com o C4 Lounge e o C4 Cactus da mesma época',
    body: 'Essa segunda geração do Picasso, já totalmente importada e vendida nas versões Seduction e Intensive, usa o mesmo motor 1.6 THP (165cv) e o mesmo câmbio automático AT6 Aisin do Lounge e do Cactus contemporâneos — peça de motor, câmbio e injeção costuma ter o mesmo código entre os três, o que ajuda bastante na hora de orçar peça alternativa.',
  },
]

const PROBLEMAS_PICASSO2: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Mesmo cuidado do Lounge/Cactus: corrente de comando do 1.6 THP exige manutenção rigorosa',
    body: 'Por usar o mesmo motor 1.6 THP do Lounge e do Cactus, o Picasso Turbo herda o mesmo ponto de atenção: corrente de comando sensível a atraso de revisão e óleo fora de especificação, com ruído na partida a frio como primeiro sinal de alerta. Mantenha o intervalo de óleo rigorosamente em dia.',
  },
]

const MANUTENCAO_PICASSO2: TipInput[] = [
  { severity: 'WARN', title: 'Cronograma C4 Picasso Turbo 2016-2019 (1.6 THP, câmbio AT6 Aisin)', body: '10.000 km — Óleo do motor + filtro, sintético de qualidade. | Sempre — atenção a ruído na partida a frio (corrente de comando). | 40.000-60.000 km — Fluido do câmbio automático AT6 Aisin.' },
]

// ---------- C4 Cactus (2017-2024 — motor 1.6 aspirado ou 1.6 THP turbo, câmbio manual ou AT6 Aisin) ----------
const MACETES_CACTUS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Airbumps (paineis laterais) resistem bem a batidas leves, mas amarelam com o tempo — proteja da exposição solar direta',
    body: 'Os painéis "Airbumps" de plástico injetado com ar nas laterais do Cactus absorvem pancadas leves de estacionamento sem marcar a lataria embaixo — uma vantagem real no dia a dia. Com o tempo e exposição solar direta constante, porém, o plástico tende a amarelar visivelmente. Cera/proteção específica para plástico externo e, se possível, evitar sol direto prolongado ajuda a manter a cor original por mais tempo.',
  },
  {
    severity: 'OK',
    title: 'Câmbio AT6 Aisin (versões automáticas): mesmo cuidado do Lounge/Picasso Turbo — troca de óleo não é opcional',
    body: 'As versões automáticas do Cactus (THP) usam o mesmo câmbio AT6 Aisin do Lounge e do Picasso Turbo, com o conversor de torque como principal ponto de desgaste. Respeitar o intervalo de troca do óleo do câmbio é o que mais influencia a durabilidade dessa caixa.',
  },
]

const PROBLEMAS_CACTUS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Motor 1.6 THP: mesmo cuidado com corrente de comando do restante da família — ruído a frio não é normal',
    body: 'Nas versões com motor 1.6 THP turbo, o Cactus compartilha o mesmo ponto de atenção do Lounge e do Picasso Turbo: corrente de comando sensível a atraso de manutenção, com ruído na partida a frio como primeiro sintoma. Não prolongue o intervalo de troca de óleo além do recomendado.',
  },
  {
    severity: 'WARN',
    title: 'Trepidação em marcha lenta com o câmbio engatado: pode ser junta homocinética ou conversor de torque',
    body: 'Há relatos de trepidação/vibração excessiva em marcha lenta com o câmbio automático engatado e parado, e também de desgaste prematuro de junta homocinética (que liga o semieixo ao cubo de roda) mesmo em carros com pouca quilometragem. Se notar vibração fora do normal, peça verificação tanto da junta homocinética quanto do conversor de torque do câmbio antes de fechar diagnóstico.',
  },
]

const MANUTENCAO_CACTUS: TipInput[] = [
  { severity: 'WARN', title: 'Cronograma C4 Cactus 2017-2024 (1.6 aspirado ou 1.6 THP turbo, manual ou AT6 Aisin)', body: '10.000 km — Óleo do motor + filtro, sintético de qualidade (essencial nas versões THP). | Sempre — atenção a ruído na partida a frio nas versões THP (corrente de comando). | 40.000-60.000 km — Fluido do câmbio automático AT6 Aisin (versões automáticas). | Proteja os Airbumps de exposição solar direta prolongada.' },
]

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'C4 Hatch', yearFrom: 2005, yearTo: 2014, tireSize: '205/55 R16 (VTR/Exclusive) ou 195/60 R15 (GLX 1.6)', frontPsi: 30, rearPsi: 30, frontPsiLoad: 32, rearPsiLoad: 36, sparePsi: 60, notes: 'GLX 1.6 com 195/60 R15: 30/30 vazio, 33/36 com carga. Confirme na etiqueta da coluna da porta.' },
  { modelName: 'C4 Pallas', yearFrom: 2007, yearTo: 2014, tireSize: '205/55 R16', frontPsi: 30, rearPsi: 32, frontPsiLoad: 32, rearPsiLoad: 36, sparePsi: 60, notes: 'Pressão traseira ligeiramente maior pela distribuição de peso do sedã.' },
  { modelName: 'C4 Picasso', yearFrom: 2009, yearTo: 2014, tireSize: '205/55 R16 (versões 2.0 automáticas podem usar 215/50 R17)', frontPsi: 32, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 37, sparePsi: 60, notes: 'Minivan com pressão traseira mais alta em carga total pela lotação de 7 lugares. Confirme na etiqueta da coluna da porta.' },
  { modelName: 'C4 Lounge', yearFrom: 2014, yearTo: 2020, tireSize: '205/55 R16 (Feel/Origine) ou 225/45 R17 (Exclusive THP)', frontPsi: 30, rearPsi: 32, frontPsiLoad: 32, rearPsiLoad: 34, sparePsi: 60, notes: 'Versão Exclusive THP (aro 17): 32/32 vazio, 34/36 com carga. Pneu OEM original: Pirelli Cinturato P7.' },
  { modelName: 'C4 Picasso', yearFrom: 2016, yearTo: 2019, tireSize: '215/50 R17 ou 225/45 R18 (conforme versão)', frontPsi: 32, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 37, sparePsi: 60, notes: 'Confirme na etiqueta da coluna da porta — versão importada com rodas maiores.' },
  { modelName: 'C4 Cactus', yearFrom: 2017, yearTo: 2024, tireSize: '195/55 R16 (Feel/Live) ou 205/55 R17 (Shine THP)', frontPsi: 32, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 35, sparePsi: 60, notes: 'Mesma pressão 32/32 vazio entre as rodas de 16 e 17 polegadas.' },
]

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'C4 Hatch', yearFrom: 2005, yearTo: 2014, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'EW10 2.0 16V ou TU5 1.6.', priority: 'CRITICAL', order: 0 },
  { modelName: 'C4 Hatch', yearFrom: 2005, yearTo: 2014, component: 'Correia dentada + tensor + roldana + bomba d\'água', intervalKm: 60000, intervalMonths: 48, notes: 'Motor interferente — antecipe dos 80.000 km oficiais.', priority: 'CRITICAL', order: 1 },
  { modelName: 'C4 Hatch', yearFrom: 2005, yearTo: 2014, component: 'Fluido do câmbio automático AL4', intervalKm: 40000, intervalMonths: 24, notes: 'ELF Renaultmatic D3 SYN.', priority: 'HIGH', order: 2 },
  { modelName: 'C4 Pallas', yearFrom: 2007, yearTo: 2014, component: 'Óleo do motor (2.0 EW10: 5W40 sintético · 1.6 TU5: 5W40 semissintético)', intervalKm: 10000, intervalMonths: 12, notes: 'Total Quartz 9000 5W40 ou Castrol Edge 5W40 API SN.', priority: 'CRITICAL', order: 3 },
  { modelName: 'C4 Pallas', yearFrom: 2007, yearTo: 2014, component: 'Correia dentada 2.0 EW10 (kit completo)', intervalKm: 60000, intervalMonths: 60, notes: 'Motor interferente — antecipe dos 80.000 km oficiais.', priority: 'CRITICAL', order: 4 },
  { modelName: 'C4 Pallas', yearFrom: 2007, yearTo: 2014, component: 'Fluido do câmbio automático AL4', intervalKm: 40000, intervalMonths: 24, notes: 'ELF Renaultmatic D3 SYN, obrigatório.', priority: 'CRITICAL', order: 5 },
  { modelName: 'C4 Pallas', yearFrom: 2007, yearTo: 2014, component: 'Trocador de calor do câmbio — inspeção de contaminação', intervalKm: 30000, intervalMonths: null, notes: 'Cor avermelhada no líquido de arrefecimento indica contaminação com ATF.', priority: 'HIGH', order: 6 },
  { modelName: 'C4 Pallas', yearFrom: 2007, yearTo: 2014, component: 'Direção hidráulica — fluido LHM+', intervalKm: null, intervalMonths: 24, notes: 'Fluido mineral verde exclusivo — jamais ATF vermelho.', priority: 'HIGH', order: 7 },
  { modelName: 'C4 Pallas', yearFrom: 2007, yearTo: 2014, component: 'Filtro de combustível', intervalKm: 30000, intervalMonths: 24, notes: 'Localizado sob o assoalho.', priority: 'MEDIUM', order: 8 },
  { modelName: 'C4 Pallas', yearFrom: 2007, yearTo: 2014, component: 'Filtro de ar do motor', intervalKm: 15000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 9 },
  { modelName: 'C4 Pallas', yearFrom: 2007, yearTo: 2014, component: 'Velas de ignição', intervalKm: 30000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 10 },
  { modelName: 'C4 Pallas', yearFrom: 2007, yearTo: 2014, component: 'Amortecedores traseiros — inspeção', intervalKm: 50000, intervalMonths: null, notes: null, priority: 'MEDIUM', order: 11 },
  { modelName: 'C4 Picasso', yearFrom: 2009, yearTo: 2014, component: 'Óleo do motor', intervalKm: 10000, intervalMonths: 12, notes: 'EW10 2.0 16V, 5W40 sintético.', priority: 'CRITICAL', order: 12 },
  { modelName: 'C4 Picasso', yearFrom: 2009, yearTo: 2014, component: 'Correia dentada + tensores + bomba d\'água', intervalKm: 60000, intervalMonths: 48, notes: 'Motor interferente.', priority: 'CRITICAL', order: 13 },
  { modelName: 'C4 Picasso', yearFrom: 2009, yearTo: 2014, component: 'Fluido do câmbio AL4', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 14 },
  { modelName: 'C4 Lounge', yearFrom: 2014, yearTo: 2020, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: '2.0 aspirado ou 1.6 THP — sintético obrigatório no turbo.', priority: 'CRITICAL', order: 15 },
  { modelName: 'C4 Lounge', yearFrom: 2014, yearTo: 2020, component: 'Fluido do câmbio automático AT6 Aisin', intervalKm: 50000, intervalMonths: 36, notes: 'Não é vitalício — protege o conversor de torque.', priority: 'HIGH', order: 16 },
  { modelName: 'C4 Picasso', yearFrom: 2016, yearTo: 2019, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: '1.6 THP, sintético de qualidade.', priority: 'CRITICAL', order: 17 },
  { modelName: 'C4 Picasso', yearFrom: 2016, yearTo: 2019, component: 'Fluido do câmbio automático AT6 Aisin', intervalKm: 50000, intervalMonths: 36, notes: null, priority: 'HIGH', order: 18 },
  { modelName: 'C4 Cactus', yearFrom: 2017, yearTo: 2024, component: 'Óleo do motor + filtro', intervalKm: 10000, intervalMonths: 12, notes: '1.6 aspirado ou 1.6 THP — sintético obrigatório no turbo.', priority: 'CRITICAL', order: 19 },
  { modelName: 'C4 Cactus', yearFrom: 2017, yearTo: 2024, component: 'Fluido do câmbio automático AT6 Aisin', intervalKm: 50000, intervalMonths: 36, notes: 'Versões automáticas THP.', priority: 'HIGH', order: 20 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'C4 Hatch', yearFrom: 2005, yearTo: 2014, MACETES: MACETES_HATCH, PROBLEMAS: PROBLEMAS_HATCH, MANUTENCAO: MANUTENCAO_HATCH },
  { modelName: 'C4 Pallas', yearFrom: 2007, yearTo: 2014, MACETES: MACETES_PALLAS, PROBLEMAS: PROBLEMAS_PALLAS, MANUTENCAO: MANUTENCAO_PALLAS },
  { modelName: 'C4 Picasso', yearFrom: 2009, yearTo: 2014, MACETES: MACETES_PICASSO1, PROBLEMAS: PROBLEMAS_PICASSO1, MANUTENCAO: MANUTENCAO_PICASSO1 },
  { modelName: 'C4 Lounge', yearFrom: 2014, yearTo: 2020, MACETES: MACETES_LOUNGE, PROBLEMAS: PROBLEMAS_LOUNGE, MANUTENCAO: MANUTENCAO_LOUNGE },
  { modelName: 'C4 Picasso', yearFrom: 2016, yearTo: 2019, MACETES: MACETES_PICASSO2, PROBLEMAS: PROBLEMAS_PICASSO2, MANUTENCAO: MANUTENCAO_PICASSO2 },
  { modelName: 'C4 Cactus', yearFrom: 2017, yearTo: 2024, MACETES: MACETES_CACTUS, PROBLEMAS: PROBLEMAS_CACTUS, MANUTENCAO: MANUTENCAO_CACTUS },
]

const MODEL_NAMES = ['C4 Hatch', 'C4 Pallas', 'C4 Picasso', 'C4 Lounge', 'C4 Cactus']

async function main() {
  console.log('🚗 Seed Citroën C4 (família completa)...')
  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Citroën', vehicleTypeId: carroType.id } },
    update: {}, create: { name: 'Citroën', vehicleTypeId: carroType.id },
  })
  for (const name of MODEL_NAMES) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name, brandId: brand.id } },
      update: {}, create: { name, brandId: brand.id },
    })
  }
  await prisma.tip.deleteMany({ where: { modelName: { in: MODEL_NAMES } } })
  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({ modelName: block.modelName, category: cat, severity: tip.severity, title: tip.title, body: tip.body, yearFrom: block.yearFrom, yearTo: block.yearTo, order: order++ })),
    })
    console.log(`  ✅ ${block.modelName} (${block.yearFrom}-${block.yearTo ?? 'atual'}): ${allTips.length} tips`)
  }
  await prisma.tirePressure.deleteMany({ where: { modelName: { in: MODEL_NAMES } } })
  for (const tp of TIRE_PRESSURES) { await prisma.tirePressure.create({ data: tp }); console.log(`  🔵 TirePressure: ${tp.modelName} (${tp.yearFrom}-${tp.yearTo ?? 'atual'})`) }
  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: MODEL_NAMES } } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)
  console.log('✅ Citroën C4 concluído!')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
