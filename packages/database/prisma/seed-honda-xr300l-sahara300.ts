// seed-honda-xr300l-sahara300.ts — Honda XR 300L TORNADO FLEX (2023+) e SAHARA 300 (2023+)
// Motor 293,5cc SOHC 4v PGM-FI FLEX (24,8 cv) | embreagem assistida e deslizante | ABS 2 canais
// Pneus 90/90-21 (F) / 120/80-18 (R) | corrente 520×104 | vela NGK SIMR7D9DS gap 0,9mm
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

// ─── XR 300L TORNADO FLEX (2023+) e SAHARA 300 (2023+) ─────────────────────
// Motor: 293,5cc SOHC 4v PGM-FI FLEX | 24,3–24,8 cv @ 7.500 rpm | 2,70 kgf.m @ 5.750 rpm
// Óleo: 10W-30 JASO MA/MA2, 1,5L (troca) / 2,0L (completo) | Câmbio: 6 marchas + slipper clutch
// Vela: NGK SIMR7D9DS (iridium) gap 0,9mm | Bateria: YTZ6V 12V 5Ah | Corrente: 520 × 104 elos
// XR 300L TORNADO: trail puro; SAHARA 300 = trail urbano com + conforto | ABS 2 canais em ambos

const XR300L_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA/MA2 — 1,5 L na troca / 2,0 L completo; a cada 6.000 km',
    body: 'Motor 293,5cc SOHC 4 válvulas refrigerado a ar + radiador de óleo. Capacidade: 1,5 L sem filtro / 2,0 L com troca do filtro. Honda Ultra 4T 10W-30 (R$30–40/L), Lubrax Moto 4T 10W-30 (R$20–28/L) ou Motul 3000 10W-30 (R$25–35/L). JASO MA ou MA2 obrigatório (embreagem molhada). Em uso off-road exigente: 4.000 km. Com etanol predominante: troca em 6.000 km é suficiente. Verifique nível pelo visor lateral com moto vertical.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK SIMR7D9DS (iridium) — gap 0,9 mm; troca a cada 12.000–16.000 km',
    body: 'Vela iridium laser original: NGK SIMR7D9DS (R$140–180). Gap: 0,90 mm — não ajuste em iridium. Motor 4 válvulas: potência de ignição mais alta que a XRE 190 (2 válvulas). Alternativa convencional: NGK CPR8EA-9 (R$25–40) para trocar a cada 8.000 km. Vela enegrecida por carbono em uso predominantemente urbano em baixa rotação: normal, limpe com escova de aço. Se eletrodo desgastado ou porcelana trincada: troca imediata — falha de ignição causa aceleração irregular e pode danificar o catalisador.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520 × 104 elos — corrente mais robusta que a da XRE 190; lubrificar a cada 500 km',
    body: 'Pinhão: 14 dentes. Coroa: 40 dentes. Corrente passo 520 (mais grossa que a 428 da XRE 190, mais adequada para os 24+ cv). Folga no ponto médio inferior: 35–45 mm (cavalete central, piloto no banco). Lubrifique com spray de corrente a cada 500 km ou após trilha molhada. Kit de transmissão DID 520 ERT2 (O-ring, dourado): R$350–500. Para uso misto urbano + trilha leve: corrente VX com O-ring dura muito bem. Em trilha pesada com lama: corrente VX-ring ou WX-ring (maior vedação contra abrasivos).',
  },
  {
    severity: 'OK',
    title: 'Embreagem assistida e deslizante (slipper clutch) — novidade vs. XRE 190 e XRE 300',
    body: 'Motor 293cc traz embreagem assistida e deslizante (standard em ambas XR 300L e Sahara 300). A embreagem assistida reduz o esforço na alavanca em ~30% vs. embreagem convencional. O sistema deslizante (slipper) evita o "travamento" do pneu traseiro em reduções bruscas de marcha, impedindo derrapagem de rear-end — grande vantagem em off-road. Não use óleo com friction modifiers (ex: "Energy Conserving" de carros) — reduz a eficiência do slipper. JASO MA2 preserva a correta operação do sistema deslizante.',
  },
  {
    severity: 'OK',
    title: 'Pneu dianteiro 90/90-21 — aro 21 para trilha; pressão 25 PSI solo',
    body: 'Dianteiro: 90/90-21 (aro 21, maior e mais adequado para off-road que o 19" da XRE 190). Traseiro: 120/80-18. Pressões Honda: F 25 PSI / R 29 PSI (solo); F 25 / R 33 PSI (com garupa). Aro 21 permite superar obstáculos maiores e absorver melhor impactos em trilha. No asfalto: rodagem um pouco mais "ondulante" que aro 17 ou 19. Melhores pneus: Michelin Anakee Wild 90/90-21 (R$200–280), Pirelli Scorpion Rally (R$220–300), Continental TrailAttack (R$180–250). Nunca use pneu liso (slick) em trilha mesmo que encharcada: aro 21 com sulco rasteiro é perigoso.',
  },
  {
    severity: 'OK',
    title: 'Freio com ABS 2 canais (dianteiro + traseiro) — diferencial vs. XRE 190',
    body: 'Ambas XR 300L e Sahara 300 têm ABS 2 canais (dianteiro e traseiro), diferente da XRE 190 Adventure que só tem ABS dianteiro. Disco dianteiro: 256 mm. Disco traseiro: 220 mm. Em off-road técnico: alguns pilotos desligam o ABS para ter mais controle de derrapagem controlada (se o modelo tiver essa opção). Fluido de freio DOT 4: troca bienal obrigatória (absorve umidade). Após uso em lama: limpe a pinça e o sensor ABS com água limpa — lama seca bloqueia o sensor e gera DTC falso.',
  },
  {
    severity: 'OK',
    title: 'Painel digital, USB-C e iluminação Full LED — novidades da geração 2023',
    body: 'XR 300L Tornado e Sahara 300 têm painel LCD digital com indicador de marcha, carga de combustível e temperatura. USB-C integrado para carregamento de celular em viagem. Full LED (farol, lanterna e pisca). O ESS (Emergency Stop Signal) pisca os pisca-alertas em frenagem brusca. Manutenção elétrica: evite lavar o painel com lavajato direto — a vedação é boa mas não ideal para lavagem de pressão. Depois de trilha com imersão: deixe o painel secar naturalmente antes de ligar.',
  },
  {
    severity: 'OK',
    title: 'Regulagem de válvulas SOHC 4v — verificar conforme manual; admissão e escape separados',
    body: 'Motor SOHC 4 válvulas (2 de admissão + 2 de escape): regulagem mais complexa que a XRE 190 (2v). Folgas recomendadas (conforme manual de serviços Honda XR 300L): admissão ≈ 0,12 mm / escape ≈ 0,15 mm (com motor FRIO). Verificação: primeira revisão (1.000 km) e depois a cada 6.000 km. Regulagem por contra-porca (sem shims). Barulho metálico a frio indica folga excessiva. Em motor quente, válvulas com folga negativa causam partida difícil e desgaste precoce dos assentos.',
  },
  {
    severity: 'OK',
    title: 'Garfo telescópico 245 mm de curso (XR 300L) — mais curso que a XRE 300 original',
    body: 'Garfo dianteiro: curso de 245 mm, significativamente mais do que a XRE 300 que tinha ~210 mm. Monoamortecedor traseiro com link e ajuste de pré-carga em 7 níveis (Sahara 300) ou 5 níveis (XR 300L). Óleo do garfo: Honda SS-7 (10W) ou similar, ~250 mL por tubo — troca a cada 15.000 km. Retentores: 45 mm (verificar após trilhas pesadas). A maior suspensão permite maior velocidade em trilha sem fundear — mas na estrada, moto fica mais alta e vento lateral afeta mais.',
  },
  {
    severity: 'WARN',
    title: 'Superaquecimento relatado — pausa obrigatória em trilha técnica prolongada',
    body: 'Problema relatado por alguns proprietários do Sahara 300 e XR 300L: superaquecimento em trilha com uso prolongado em baixa velocidade e alta rotação. Motor refrigerado a ar + radiador de óleo: o sistema funciona bem com vento, mas em terreno técnico lento (escaladas, manobrando), o motor pode ficar quente. Prevenção: faça pauses de 5–10 min a cada 30–40 min de trilha difícil. Se o motor estiver visivelmente quente ao toque: pare. Não desligue o motor abruptamente após uso intenso — deixe em marcha lenta 1–2 min para esfriar gradualmente.',
  },
]

const XR300L_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Superaquecimento em trilha lenta — característica do motor 293cc ar+óleo',
    body: 'Principal reclamação nos fóruns brasileiros: superaquecimento em trilha técnica com velocidade baixa e alta rotação por períodos prolongados. A refrigeração por ar + radiador de óleo depende de fluxo de ar — sem vento (em trilha lenta), o calor acumula. Sintoma: batepapo no escapamento fica mais alto, marcha lenta fica instável. Não é defeito, mas característica do sistema. Prevenção: uso com pauses frequentes, evitar uso de plena carga em marcha lenta por mais de 15–20 min consecutivos.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedor central — falha relatada em alguns modelos de fábrica',
    body: 'Problema reportado por proprietários do Sahara 300: amortecedor central com vazamento de óleo precoce em condições de trilha exigente. A Honda realizou revisão de alguns lotes com garantia. Se notar óleo escorrendo pelo amortecedor: fotografe, anote a km e leve à concessionária enquanto em garantia (3 anos). Fora da garantia: amortecedor YSS G-Plus ou Falcon ajustável (R$500–800 instalado) são upgrades diretos para uso intenso em trilha.',
  },
  {
    severity: 'WARN',
    title: 'Partida difícil a frio com etanol — fenômeno normal em baixas temperaturas',
    body: 'Com temperatura abaixo de 15°C e etanol puro (E100) no tanque, a partida a frio pode ser lenta ou exigir mais tentativas. O etanol tem ponto de vaporização mais alto que a gasolina — em dias frios, a mistura fica mais rica e o motor demora mais a pegar. Solução: em regiões frias no inverno, use gasolina ou mistura (50/50). A PGM-FI gerencia melhor o ajuste da mistura, mas abaixo de 10°C com etanol puro a dificuldade aumenta. Mantenha a bateria bem carregada em dias frios.',
  },
  {
    severity: 'WARN',
    title: 'Vibração em velocidades de cruzeiro (70–90 km/h) — paralama e carenagens soltos',
    body: 'Alguns proprietários relatam vibração perceptível na faixa de 70–90 km/h, especialmente em rodovias. Causas comuns: 1) parafusos das carenagens e paralamas com folga (aperte todos os fixadores após 1.000 km de uso); 2) rolamentos de roda com desgaste (inspecionar); 3) pneu traseiro fora de balanceamento — balancear após troca de pneu. Vibrações de motor monocilíndrico 293cc são normais em certas rotações; instale borrachas nos espelhos se o reflexo oscilar muito.',
  },
  {
    severity: 'OK',
    title: 'Acrílico do paravento (Sahara 300 Adventure) — destacando com vibração',
    body: 'Problema específico do Sahara 300 Adventure: o escudo plástico ("bolha") do paravento pode se soltar com vibração do motor, principalmente nas primeiras milhagens. Causa: fixadores da fábrica com pouca torque. Solução: aperte os parafusos do paravento com chave adequada após 500 km de uso e repita a cada 5.000 km. Use arruelas de borracha entre o acrílico e o suporte para absorver vibração. Se o acrílico trincou: reparo com cola de policarbonato transparente ou substituição (peça Honda: R$200–350).',
  },
]

// MACETES específicos do SAHARA 300 (além dos do XR 300L)
const SAHARA300_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'SAHARA 300: painel com indicador de marcha, termômetro e espaço de armazenamento',
    body: 'O Sahara 300 tem painel digital LCD com indicador de marcha, indicador de temperatura do motor, voltímetro e relógio. O compartimento sob o assento acomoda documentos e alguns acessórios. Versão Adventure: paravento ajustável e suporte de proteção lateral. Versão Rally: proteção de motor em alumínio e visual mais agressivo. Para uso como trail urbano diário: Sahara 300 Standard ou Rally são os mais equilibrados. Para viagens longas: Adventure com proteções laterais e paravento é a melhor opção.',
  },
  {
    severity: 'OK',
    title: 'SAHARA 300 vs. XRE 300: por que o Sahara substituiu; diferenças importantes',
    body: 'O Sahara 300 é o sucessor direto da XRE 300 no Brasil, com motor 293,5cc (vs. 291,6cc da XRE 300), mas com mudanças importantes: 1) PGM-FI FLEX (XRE 300 era gasolina apenas); 2) ABS 2 canais de série (XRE 300 ABS era opcional); 3) embreagem assistida e deslizante (XRE 300 não tinha); 4) painel LCD com indicador de marcha; 5) carregador USB-C; 6) Full LED. Peças da XRE 300 NÃO são intercambiáveis com o Sahara 300 — motor novo com dimensões diferentes. Peças Sahara 300: rede distribuidora Honda, preços próximos da XRE 300.',
  },
]

const XR300L_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'XR 300L TORNADO', yearFrom: 2023, yearTo: null, component: 'Óleo 10W-30 JASO MA/MA2 (1,5 L troca / 2,0 L completo)', intervalKm: 6000, intervalMonths: 6, notes: 'Radiador de óleo: verifique entupimento por lama após trilhas. Com uso off-road: 4.000 km.', priority: 'HIGH', order: 1 },
  { modelName: 'XR 300L TORNADO', yearFrom: 2023, yearTo: null, component: 'Filtro de óleo — troca', intervalKm: 6000, intervalMonths: 12, notes: 'Honda original ou equivalente. Verificar se há metal no filtro ao trocar (indica desgaste interno).', priority: 'MEDIUM', order: 2 },
  { modelName: 'XR 300L TORNADO', yearFrom: 2023, yearTo: null, component: 'Vela NGK SIMR7D9DS — iridium gap 0,9 mm', intervalKm: 12000, intervalMonths: null, notes: 'Convencional NGK CPR8EA-9: 8.000 km (R$25–40). Iridium: 12.000–16.000 km (R$140–180).', priority: 'MEDIUM', order: 3 },
  { modelName: 'XR 300L TORNADO', yearFrom: 2023, yearTo: null, component: 'Verificação de válvulas (Adm ~0,12 mm / Esc ~0,15 mm)', intervalKm: 6000, intervalMonths: 12, notes: 'SOHC 4v: mais preciso que 2v. Primeira verificação em 1.000 km. Regulagem por contra-porca.', priority: 'HIGH', order: 4 },
  { modelName: 'XR 300L TORNADO', yearFrom: 2023, yearTo: null, component: 'Filtro de ar — inspeção e limpeza', intervalKm: 6000, intervalMonths: 12, notes: 'Off-road com pó: a cada 3.000 km. Não lavar filtro de papel. Substituir se rasgado ou saturado.', priority: 'MEDIUM', order: 5 },
  { modelName: 'XR 300L TORNADO', yearFrom: 2023, yearTo: null, component: 'Filtro de ar — troca', intervalKm: 12000, intervalMonths: 24, notes: 'Honda original (R$40–60). Off-road frequente: trocar a cada 6.000–8.000 km.', priority: 'MEDIUM', order: 6 },
  { modelName: 'XR 300L TORNADO', yearFrom: 2023, yearTo: null, component: 'Corrente 520 × 104 — lubrificação', intervalKm: 500, intervalMonths: null, notes: 'Spray de corrente a cada 500 km ou após trilha. Folga: 35–45 mm no ponto médio inferior.', priority: 'HIGH', order: 7 },
  { modelName: 'XR 300L TORNADO', yearFrom: 2023, yearTo: null, component: 'Kit de transmissão (corrente 520 + coroa 40T + pinhão 14T)', intervalKm: 25000, intervalMonths: null, notes: 'Off-road intenso: 15.000–18.000 km. DID 520 ERT2 ou VX-ring. Trocar pinhão, coroa e corrente juntos.', priority: 'HIGH', order: 8 },
  { modelName: 'XR 300L TORNADO', yearFrom: 2023, yearTo: null, component: 'Pastilha dianteira (disco 256 mm) + fluido DOT 4', intervalKm: 12000, intervalMonths: 24, notes: 'Inspecionar a cada 6.000 km. ABS 2 canais: rebuild da pinça a cada 25.000 km. Fluido DOT 4: bienal.', priority: 'HIGH', order: 9 },
  { modelName: 'XR 300L TORNADO', yearFrom: 2023, yearTo: null, component: 'Pastilha traseira (disco 220 mm)', intervalKm: 15000, intervalMonths: null, notes: 'Inspecionar espessura a cada 8.000 km. ABS 2 canais no traseiro também. Manter pinça limpa.', priority: 'HIGH', order: 10 },
  { modelName: 'XR 300L TORNADO', yearFrom: 2023, yearTo: null, component: 'Óleo do garfo telescópico (250 mL/tubo)', intervalKm: 15000, intervalMonths: 24, notes: 'Honda SS-7 10W ou equivalente. Retentores 45 mm se vazando. Off-road intenso: 10.000 km.', priority: 'HIGH', order: 11 },
  { modelName: 'XR 300L TORNADO', yearFrom: 2023, yearTo: null, component: 'Bateria YTZ6V (12V 5Ah AGM) — verificação de tensão', intervalKm: null, intervalMonths: 6, notes: 'Sem kickstarter. Repouso: 12,6V. A 4.000 rpm: 13,5–14,5V. Yuasa ou Moura como reposição.', priority: 'HIGH', order: 12 },
  { modelName: 'XR 300L TORNADO', yearFrom: 2023, yearTo: null, component: 'Sensor ABS — limpeza após trilha', intervalKm: null, intervalMonths: 3, notes: 'Lama seca no sensor = DTC falso. Limpar com água limpa após trilhas com barro.', priority: 'MEDIUM', order: 13 },
]

const SAHARA300_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'SAHARA 300', yearFrom: 2023, yearTo: null, component: 'Óleo 10W-30 JASO MA/MA2 (1,5 L troca / 2,0 L completo)', intervalKm: 6000, intervalMonths: 6, notes: 'Mesmo motor do XR 300L. Com uso off-road: 4.000 km. Verificar nível pelo visor lateral.', priority: 'HIGH', order: 1 },
  { modelName: 'SAHARA 300', yearFrom: 2023, yearTo: null, component: 'Filtro de óleo — troca', intervalKm: 6000, intervalMonths: 12, notes: 'Honda original. Inspecionar filtro por partículas metálicas ao trocar.', priority: 'MEDIUM', order: 2 },
  { modelName: 'SAHARA 300', yearFrom: 2023, yearTo: null, component: 'Vela NGK SIMR7D9DS (iridium) gap 0,9 mm', intervalKm: 12000, intervalMonths: null, notes: 'Mesmo especificação do XR 300L Tornado. Alternativa convencional: 8.000 km.', priority: 'MEDIUM', order: 3 },
  { modelName: 'SAHARA 300', yearFrom: 2023, yearTo: null, component: 'Verificação de válvulas SOHC 4v', intervalKm: 6000, intervalMonths: 12, notes: 'Adm ~0,12 mm / Esc ~0,15 mm com motor frio. Primeira em 1.000 km. Por contra-porca.', priority: 'HIGH', order: 4 },
  { modelName: 'SAHARA 300', yearFrom: 2023, yearTo: null, component: 'Filtro de ar — inspeção', intervalKm: 6000, intervalMonths: 12, notes: 'Off-road: a cada 3.000 km. Substituir se sujo ou rasgado.', priority: 'MEDIUM', order: 5 },
  { modelName: 'SAHARA 300', yearFrom: 2023, yearTo: null, component: 'Filtro de ar — troca', intervalKm: 12000, intervalMonths: 24, notes: 'Honda original. Uso off-road regular: antecipar para 8.000 km.', priority: 'MEDIUM', order: 6 },
  { modelName: 'SAHARA 300', yearFrom: 2023, yearTo: null, component: 'Corrente 520 × 104 — lubrificação', intervalKm: 500, intervalMonths: null, notes: 'A cada 500 km ou após trilha. Folga: 35–45 mm. Spray de corrente específico para O-ring.', priority: 'HIGH', order: 7 },
  { modelName: 'SAHARA 300', yearFrom: 2023, yearTo: null, component: 'Kit de transmissão (corrente 520 + pinhão + coroa)', intervalKm: 25000, intervalMonths: null, notes: 'Trocar tudo junto. DID 520 ERT2 recomendado. Off-road intenso: 15.000 km.', priority: 'HIGH', order: 8 },
  { modelName: 'SAHARA 300', yearFrom: 2023, yearTo: null, component: 'Pastilha dianteira ABS (disco 256 mm) + fluido DOT 4', intervalKm: 12000, intervalMonths: 24, notes: 'ABS 2 canais. Rebuild pinça: 25.000 km. Fluido DOT 4: 24 meses (absorve umidade).', priority: 'HIGH', order: 9 },
  { modelName: 'SAHARA 300', yearFrom: 2023, yearTo: null, component: 'Pastilha traseira ABS (disco 220 mm)', intervalKm: 15000, intervalMonths: null, notes: 'Inspecionar a cada 8.000 km. Manter sensor ABS traseiro limpo após trilha.', priority: 'HIGH', order: 10 },
  { modelName: 'SAHARA 300', yearFrom: 2023, yearTo: null, component: 'Amortecedor traseiro com link — verificar óleo e pré-carga', intervalKm: null, intervalMonths: 12, notes: 'Ajuste pré-carga: 7 posições. Verificar vazamento de óleo após 12.000 km. Falha reportada em garantia.', priority: 'HIGH', order: 11 },
  { modelName: 'SAHARA 300', yearFrom: 2023, yearTo: null, component: 'Bateria YTZ6V (12V 5Ah AGM) — verificação', intervalKm: null, intervalMonths: 6, notes: 'Sem kickstarter. Repouso: 12,6V mín. A 4.000 rpm: 13,5–14,5V.', priority: 'HIGH', order: 12 },
  { modelName: 'SAHARA 300', yearFrom: 2023, yearTo: null, component: 'Proteção do motor (versão Rally) — verificar fixadores', intervalKm: null, intervalMonths: 6, notes: 'Versão Rally: protetor em alumínio. Verificar torque dos parafusos a cada 6 meses e após trilhas.', priority: 'LOW', order: 13 },
]

// ─── Calibragens ──────────────────────────────────────────────────────────────

const XR300L_CALIBRAGEM = {
  modelName: 'XR 300L TORNADO',
  yearFrom: 2023, yearTo: null,
  tireSize: '90/90-21 (F) · 120/80-18 (R)',
  frontPsi: 25, rearPsi: 29, frontPsiLoad: 25, rearPsiLoad: 33,
  sparePsi: null,
  notes: 'Solo: F 25 / R 29 PSI. Com garupa: F 25 / R 33 PSI. Pneus trail aro 21: Michelin Anakee Wild, Pirelli Scorpion Rally, Continental TrailAttack. Nunca liso em trilha.',
}

const SAHARA300_CALIBRAGEM = {
  modelName: 'SAHARA 300',
  yearFrom: 2023, yearTo: null,
  tireSize: '90/90-21 (F) · 120/80-18 (R)',
  frontPsi: 25, rearPsi: 29, frontPsiLoad: 25, rearPsiLoad: 33,
  sparePsi: null,
  notes: 'Solo: F 25 / R 29 PSI. Com garupa: F 25 / R 33 PSI. Mesma especificação do XR 300L Tornado. 3 versões: Standard, Adventure e Rally — mesmos pneus.',
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
  console.log('🏍️  Seed Honda XR 300L TORNADO FLEX e SAHARA 300...')

  await upsertVehicleModel('XR 300L TORNADO', 'Honda', 2023, null)
  await upsertVehicleModel('SAHARA 300', 'Honda', 2023, null)

  // XR 300L TORNADO FLEX
  await upsertTips('XR 300L TORNADO', 'MACETES', XR300L_MACETES)
  await upsertTips('XR 300L TORNADO', 'PROBLEMAS', XR300L_PROBLEMAS)
  await upsertMaintenance(XR300L_MANUTENCAO)
  await upsertTirePressure(XR300L_CALIBRAGEM)

  // SAHARA 300 — compartilha PROBLEMAS com XR 300L, macetes próprios
  await upsertTips('SAHARA 300', 'MACETES', [...XR300L_MACETES, ...SAHARA300_MACETES])
  await upsertTips('SAHARA 300', 'PROBLEMAS', XR300L_PROBLEMAS)
  await upsertMaintenance(SAHARA300_MANUTENCAO)
  await upsertTirePressure(SAHARA300_CALIBRAGEM)

  const tipCount = await prisma.tip.count({ where: { modelName: { in: ['XR 300L TORNADO', 'SAHARA 300'] } } })
  const maintCount = await prisma.maintenanceItem.count({ where: { modelName: { in: ['XR 300L TORNADO', 'SAHARA 300'] } } })

  console.log(`✅ XR 300L TORNADO + SAHARA 300 — ${tipCount} dicas, ${maintCount} itens de manutenção`)
  console.log('✅ Seed concluído!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
