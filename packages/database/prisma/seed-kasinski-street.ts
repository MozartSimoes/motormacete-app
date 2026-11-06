// seed-kasinski-street.ts — Kasinski SETA 125, SETA 150, WAY 125, FLASH K 150cc, TN 125
// Motos street/urbanas com motores chineses 125–150cc OHC 4T monocilíndrico
// SETA 125/150: naked street, similar Honda CG Fan — motor chinês OHC
// WAY 125: mesma base que SETA 125, visual diferente
// FLASH K 150cc: naked urbana 150cc, disco dianteiro + tambor traseiro
// TN 125: trail/enduro vintage dos anos 1990–2000, motor 124cc 4T
// Execute: pnpm --filter @motormacete/database db:seed:kasinski-street
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

// ─── SETA 125 ─────────────────────────────────────────────────────────────────
// Motor: 124cc OHC monocilíndrico 4T, ar, ~9–9,5 cv
// Câmbio: 5 marchas | Partida: elétrica + pedal
// Vela: NGK C7HSA (gap 0,6–0,7mm) | Óleo: 20W-50 JASO MA, ~1,0L
// Produção: ~2007–2014

const SETA125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo JASO MA obrigatório — 20W-50 mineral',
    body: 'Motor 124cc OHC 4T com embreagem multi-disco banhada a óleo. Use 20W-50 JASO MA. Nunca use JASO MB — causa patinação da embreagem. Capacidade: ~1,0L com filtro ou ~0,9L no dreno simples.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA: padrão universal CUB/street 125cc chinês',
    body: 'Vela NGK C7HSA, gap 0,6–0,7mm. Equivalente Denso: U22FS-U. Iridium NGK CR7HIX dura até 20.000 km. Torque de aperto: 10–12 Nm. Disponível em qualquer loja de autopeças.',
  },
  {
    severity: 'OK',
    title: 'Economia: 45–55 km/L com manutenção em dia',
    body: 'SETA 125 bem regulada consome 45–55 km/L urbano. Para maximizar: vela nova a 8.000 km, filtro de ar limpo, corrente lubrificada, pneus na pressão certa e pilotagem suave.',
  },
  {
    severity: 'WARN',
    title: 'Peças pós-2016: mercado genérico 125cc chinês cobre a maioria',
    body: 'Kasinski encerrou atividades em 2016. Carenagens específicas são raras. Motor, filtros, vela, corrente, pastilhas e suspensão têm equivalências genéricas. Lojas de motos chinesas ou MercadoLivre são excelentes fontes.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428H: lubrificação a cada 500 km',
    body: 'Lubrifique a cada 500 km com spray ou óleo 80W-90. Folga: 20–30mm no ponto mais baixo. Kit (pinhão 15T + coroa 42T + corrente 428H × 106 elos) dura 15.000–20.000 km com boa manutenção.',
  },
  {
    severity: 'OK',
    title: 'Partida elétrica: bateria YB5L-B (12V 5Ah)',
    body: 'Partida lenta = bateria fraca. Tensão mínima em repouso: 12,4V. YB5L-B custa R$70–100. Verifique fusível (10A) e borne antes de trocar a bateria.',
  },
]

const SETA125_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Engasgos ao acelerar: agulha do carburador desregulada',
    body: 'Se engasga na faixa intermediária, suba o clip da agulha 1 entalhamento (enriquece mistura). Para altitude acima de 800m, desça 1. Jato principal padrão: #100–105.',
  },
  {
    severity: 'WARN',
    title: 'Ruído no cabeçote: folga de válvulas incorreta',
    body: 'Ruído metálico seco = folga de válvulas incorreta. Verifique com motor FRIO: adm 0,05mm / esc 0,08mm. Em motores chineses 125cc, a folga aumenta com uso. Não ignore por mais de 2.000 km.',
  },
  {
    severity: 'DANGER',
    title: 'Óleo JASO MB destrói embreagem em 2.000 km',
    body: 'Se usou óleo de carro ou JASO MB, a embreagem multi-disco perde atrito. Sintoma: moto "escorrega" ao soltar embreagem e acelerar. Troque por 20W-50 JASO MA imediatamente.',
  },
  {
    severity: 'WARN',
    title: 'Pneu traseiro desgastando assimétrico: desalinhamento de roda',
    body: 'Ao ajustar tensão da corrente, use os marcadores dos dois lados do tensor simultaneamente. Roda desalinhada 3mm causa desgaste acelerado e instabilidade.',
  },
  {
    severity: 'WARN',
    title: 'CDI com vida limitada após 40.000–60.000 km',
    body: 'CDIs de 125cc chinesas fabricadas 2007–2012: vida média 40.000–60.000 km. Sintomas: cortes em alta rotação, motor apaga em tick-over. CDI universal 4 pinos DC custa R$30–60.',
  },
]

const SETA125_MANUTENCAO: TipInput[] = [
  { severity: 'WARN', title: 'Óleo 20W-50 JASO MA (0,9–1,0L) — 3.000 km ou 6 meses', body: 'Motor 124cc OHC. Mineral. Nunca JASO MB. Drene com motor morno.' },
  { severity: 'OK', title: 'Vela NGK C7HSA (gap 0,6–0,7mm) — inspecionar 5.000 / trocar 8.000 km', body: 'Torque 10–12 Nm. Eletrodo central: branco = muito quente, cinza = normal, preto = rico.' },
  { severity: 'WARN', title: 'Lubrificação corrente 428H — 500 km', body: 'Folga 20–30mm. Kit (pinhão 15T + coroa 42T) a cada 15.000 km.' },
  { severity: 'OK', title: 'Filtro de ar (espuma) — limpar 5.000 km, trocar 15.000 km', body: 'Querosene + secar + óleo de motor fino antes de reinstalar.' },
  { severity: 'WARN', title: 'Folga de válvulas (adm 0,05 / esc 0,08mm) — 8.000 km', body: 'Motor frio obrigatório. Parafuso + contra-porca.' },
  { severity: 'OK', title: 'Pastilha freio disc. (< 1,5mm = troca) / lona tras. (< 2mm = troca) — 8.000 km', body: 'Inspecionar a cada 6.000 km em uso intenso.' },
  { severity: 'OK', title: 'Bateria YB5L-B — verificar tensão anualmente', body: '12,4V+ em repouso.' },
  { severity: 'OK', title: 'Limpeza carburador VM22/PZ22 — 10.000 km', body: 'Spray carburador + palito fino nos orifícios. Nível boia: ~15mm.' },
]

// ─── SETA 150 ─────────────────────────────────────────────────────────────────
// Motor: 149cc OHC monocilíndrico 4T, ar, ~11 cv | 5 marchas
// Visual similar Honda CG 150 Sport | Produção: ~2010–2014

const SETA150_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 149cc: mesma base do SETA 125, mais potência',
    body: 'SETA 150 usa motor 149cc OHC 4T. Vela NGK C7HSA (gap 0,6–0,7mm), óleo 20W-50 JASO MA (~1,0L), corrente 428H. Peças genéricas 150cc cobrem toda manutenção mecânica.',
  },
  {
    severity: 'OK',
    title: 'Melhor desempenho que SETA 125 em subidas e ultrapassagens',
    body: 'Com ~11 cv vs ~9 cv da SETA 125, a 150cc é mais confortável em subidas longas e ultrapassagens rápidas. Mantenha vela e filtro em bom estado para aproveitar a potência extra.',
  },
  {
    severity: 'WARN',
    title: 'Corrente 428H: inspecione desgaste a cada 5.000 km',
    body: 'Corrente mais fina que modelos japoneses 150cc. Lubrifique a cada 500 km. Kit (pinhão 15T + coroa 42T) a cada 15.000–18.000 km.',
  },
  {
    severity: 'OK',
    title: 'Filtro de óleo cartucho: troque junto com o óleo',
    body: 'Se seu modelo tem filtro cartucho: sempre troque com o óleo. Filtros genéricos para 150cc chinesa custam R$15–30. Aplique óleo no O-ring ao montar.',
  },
]

const SETA150_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Consumo acima de 35 km/L: calibre pneus e verifique vela',
    body: 'Bem regulada faz 40–50 km/L. Se estiver alta: pressão dos pneus (80/100-18 F / 90/90-18 R), estado da vela e filtro de ar sujo.',
  },
  {
    severity: 'WARN',
    title: 'Coroa de aço macio: desgasta mais rápido que modelos japoneses',
    body: 'Sintoma: corrente "pula" nos dentes. Ao trocar kit, escolha coroa em aço temperado (DID ou RK). Evita retorno antes do prazo.',
  },
  {
    severity: 'DANGER',
    title: 'Válvulas: ajuste mais frequente que motos japonesas equivalentes',
    body: 'Em motores 150cc chineses, a folga de válvulas muda mais rápido. Ajuste a cada 8.000 km (máximo 10.000 km). Adm: 0,05mm / Esc: 0,08mm, motor FRIO.',
  },
]

const SETA150_MANUTENCAO: TipInput[] = [
  { severity: 'WARN', title: 'Óleo 20W-50 JASO MA (1,0L) — 3.000 km ou 6 meses', body: 'Motor 149cc OHC. Com filtro cartucho: 1,0L. Tela apenas: 0,9L.' },
  { severity: 'OK', title: 'Vela NGK C7HSA (gap 0,6–0,7mm) — 8.000 km', body: 'Inspecionar a 5.000 km.' },
  { severity: 'WARN', title: 'Lubrificação corrente 428H — 500 km', body: 'Folga 20–30mm. Kit a cada 15.000 km.' },
  { severity: 'OK', title: 'Filtro de ar — limpar 5.000 km', body: 'Espuma: querosene + secar + óleo fino.' },
  { severity: 'WARN', title: 'Folga de válvulas (adm 0,05 / esc 0,08mm) — 8.000 km', body: 'Motor frio obrigatório.' },
  { severity: 'OK', title: 'Freio dianteiro (disco) + traseiro (tambor) — 8.000 km', body: 'Pastilha < 1,5mm = troca. Lona < 2mm = troca.' },
]

// ─── WAY 125 ──────────────────────────────────────────────────────────────────
// Motor: 124cc OHC 4T — MESMO motor SETA 125 | Produção: ~2008–2014

const WAY125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor idêntico ao SETA 125: mesma manutenção',
    body: 'WAY 125 compartilha motor 124cc OHC 4T da SETA 125. Vela NGK C7HSA gap 0,6–0,7mm, óleo 20W-50 JASO MA ~1,0L, corrente 428H, folga válvulas adm 0,05 / esc 0,08mm.',
  },
  {
    severity: 'OK',
    title: 'Visual agressivo, peças estéticas difíceis pós-2016',
    body: 'Carenagem parcial esportiva. Partes estéticas são difíceis de encontrar. Peças mecânicas (motor, suspensão, freios, transmissão) usam genéricas 125cc de ampla disponibilidade.',
  },
  {
    severity: 'WARN',
    title: 'Retentor bengala ø35mm: vaza após 30.000 km',
    body: 'Bengala telescópica ø35mm. Retentores vazam com uso ou queda. Troca: retentor genérico 35×47×11mm. Óleo de bengala: SAE 10W ou ATF, ~180mL/tubo.',
  },
  {
    severity: 'OK',
    title: 'Rodas de liga leve: limpeza com neutro — não use ácidos',
    body: 'Produtos ácidos (água sanitária, limpa-metais forte) corroem alumínio. Use detergente neutro e esponja macia. Verniz de roda protege e facilita limpeza.',
  },
]

const WAY125_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Bengala bate no fundo em buracos grandes',
    body: 'Aumento do nível de óleo da bengala de 180 para 200mL/tubo aumenta resistência hidráulica.',
  },
  {
    severity: 'WARN',
    title: 'Farol H4 original com foco fraco',
    body: 'Substitua por Philips X-tremeVision ou Osram Night Breaker (H4). Ou kit LED H4. Melhora visibilidade e consome menos da bateria.',
  },
  {
    severity: 'WARN',
    title: 'Conectores elétricos oxidam em exemplares com 10+ anos',
    body: 'Falhas intermitentes (faroletes, pisca). Limpe com WD-40 Contato Elétrico + aplique vaselina técnica.',
  },
]

const WAY125_MANUTENCAO: TipInput[] = [
  { severity: 'WARN', title: 'Óleo 20W-50 JASO MA (0,9–1,0L) — 3.000 km', body: 'Motor 124cc OHC. Idêntico ao SETA 125.' },
  { severity: 'OK', title: 'Vela NGK C7HSA (gap 0,6–0,7mm) — 8.000 km', body: 'Inspecionar a 5.000 km.' },
  { severity: 'WARN', title: 'Lubrificação corrente 428H — 500 km', body: 'Folga 20–30mm.' },
  { severity: 'OK', title: 'Filtro de ar — limpar 5.000 km', body: 'Espuma: querosene + secar + óleo fino.' },
  { severity: 'WARN', title: 'Folga de válvulas (adm 0,05 / esc 0,08mm) — 8.000 km', body: 'Motor frio. Parafuso + contra-porca.' },
  { severity: 'OK', title: 'Retentor bengala ø35mm + óleo SAE 10W (180mL/tubo) — 20.000 km', body: 'Retentor genérico 35×47×11mm. Trocar junto com óleo da bengala.' },
]

// ─── FLASH K 150cc ─────────────────────────────────────────────────────────────
// Motor: 149cc OHC monocilíndrico 4T, ar, ~12 cv | 5 marchas
// Freio: disco dianteiro + tambor traseiro | Produção: ~2005–2012

const FLASHK_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 149cc OHC: manutenção igual a CUBs 150cc genéricas',
    body: 'Vela NGK C7HSA (gap 0,6–0,7mm), óleo 20W-50 JASO MA (~1,0L), corrente 428H. Peças do mercado genérico de 150cc cobrem toda manutenção mecânica.',
  },
  {
    severity: 'OK',
    title: 'Disco dianteiro hidráulico: mais eficiente, exige fluido DOT 4 bienal',
    body: 'Fluido DOT 4 é higroscópico: troque a cada 2 anos. Pastilhas compatíveis com 150cc chinesas genéricas (cuidado: confirme diâmetro do disco). Espessura mínima pastilha: 1,5mm.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de 30–35 km/L: carburador pode precisar de jato menor',
    body: 'Consumo maior que SETA 125. Jato principal #100–108. Limpeza do carburador a cada 10.000 km. Para altitudes acima de 800m, reduza jato principal 2–3 números.',
  },
  {
    severity: 'OK',
    title: 'Farol H4 55W: substitua por lâmpada de boa marca',
    body: 'Philips X-tremeVision ou Osram Night Breaker melhora muito a visibilidade noturna. Custo: R$40–80.',
  },
]

const FLASHK_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Mangueira de freio dianteiro pode endurecer após 8+ anos',
    body: 'Sintoma: pedal esponjoso mesmo com fluido novo. Troque por mangueira trançada de aço inox (banjo) — custa R$50–80 e melhora muito o feel do freio.',
  },
  {
    severity: 'DANGER',
    title: 'Parafusos do coletor de escape: gripe por calor',
    body: 'Parafusos de fixação do escape em cabeçote alumínio corroem nas roscas. Ao qualquer trabalho no cabeçote, use penetrante (WD-40) e aplique pasta anti-seize nas roscas ao remontar.',
  },
  {
    severity: 'WARN',
    title: 'Chave de ignição: contatos oxidam em exemplares antigos',
    body: 'Moto não liga ou para inesperadamente. Limpe contatos com WD-40 Contato Elétrico. Chave de reposição universal para motos chinesas: R$20–50.',
  },
]

const FLASHK_MANUTENCAO: TipInput[] = [
  { severity: 'WARN', title: 'Óleo 20W-50 JASO MA (1,0L) — 3.000 km ou 6 meses', body: 'Motor 149cc OHC. Mineral JASO MA.' },
  { severity: 'OK', title: 'Vela NGK C7HSA (gap 0,6–0,7mm) — 8.000 km', body: 'Inspecionar a 5.000 km. Torque 10–12 Nm.' },
  { severity: 'WARN', title: 'Lubrificação corrente 428H — 500 km', body: 'Folga 20–30mm.' },
  { severity: 'OK', title: 'Filtro de ar — limpar 5.000 km', body: 'Espuma: querosene + secar + óleo fino.' },
  { severity: 'WARN', title: 'Folga de válvulas (adm 0,05 / esc 0,08mm) — 8.000 km', body: 'Motor frio obrigatório.' },
  { severity: 'WARN', title: 'Fluido de freio DOT 4 (dianteiro) — 2 anos ou 15.000 km', body: 'Bienal. Não misturar DOT 3 com DOT 4.' },
  { severity: 'OK', title: 'Pastilha freio dianteiro (disco) — 10.000 km', body: 'Espessura mínima 1,5mm. Genérica para 150cc chinesa.' },
  { severity: 'OK', title: 'Lona freio traseiro (tambor) — 15.000 km', body: 'Espessura mínima 2mm.' },
  { severity: 'OK', title: 'Kit relação 428H — 15.000 km', body: 'Trocar kit completo.' },
  { severity: 'OK', title: 'Limpeza carburador — 10.000 km', body: 'Jato principal #100–108. Spray + palito fino.' },
]

// ─── TN 125 ──────────────────────────────────────────────────────────────────
// Motor: 124cc OHC monocilíndrico 4T, ar — trail/enduro vintage
// Produção: ~1995–2000 | Suspensão longa para off-road

const TN125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Trail vintage dos anos 1990: manutenção simples e robusta',
    body: 'Motor 124cc OHC 4T. Manutenção idêntica a qualquer CUB 125cc: óleo 20W-50 JASO MA, vela NGK C7HSA, corrente 428H. Motor durável com manutenção básica em dia.',
  },
  {
    severity: 'WARN',
    title: 'Filtro de ar: essencial em uso off-road',
    body: 'Off-road: limpe a cada 2.000 km ou após cada saída com lama/poeira. Areia sem filtro adequado gripa os anéis do pistão em poucos meses.',
  },
  {
    severity: 'OK',
    title: 'Off-road: reduza pressão dos pneus para 18–22 PSI',
    body: 'Para trilhas, reduza pressão para 18–22 PSI (vs 22–25 PSI no asfalto). Mais tração em terra, areia e cascalho. No asfalto, recalibre antes de retornar à cidade.',
  },
  {
    severity: 'OK',
    title: 'Peças de motor: genéricas 125cc 4T cobrem as necessidades',
    body: 'Vela, corrente, filtro, óleo e anéis de segmento são universais para 125cc chinesa. Peças de carroceria TN 125 são raras — procure em mercados de motos antigas.',
  },
]

const TN125_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Modelo dos anos 1990: peças específicas escassas',
    body: 'Chassis, carenagem, tanque: extremamente difíceis. Mecânicos vintage e feiras de motos antigas são as melhores fontes. Peças mecânicas de motor 125cc funcionam.',
  },
  {
    severity: 'WARN',
    title: 'Juntas de borracha do carburador endurecidas após 25+ anos',
    body: 'Junta da câmara de boia endurece e vaza gasolina (PERIGO DE INCÊNDIO!). Troque o kit de juntas ou substitua por carburador VM22/PZ22 compatível.',
  },
  {
    severity: 'DANGER',
    title: 'Tanque com ferrugem interna: quase certo em exemplares velhos',
    body: 'Tanques de aço dos anos 1990 com gasolina estocada por anos têm ferrugem. Sintoma: carburador entopindo. Trate com selador POR 15 ou proteja o interior.',
  },
  {
    severity: 'WARN',
    title: 'Retificador antigo pode não carregar a bateria',
    body: 'Mida: 13,5–14,5V @ 3.500 rpm. Abaixo ou acima (>15V): troque por retificador universal compatível (RM21).',
  },
]

const TN125_MANUTENCAO: TipInput[] = [
  { severity: 'WARN', title: 'Óleo 20W-50 JASO MA (0,9L) — off-road 2.000 km / asfalto 3.000 km', body: 'Motor vintage: intervalo mais curto.' },
  { severity: 'OK', title: 'Vela NGK C7HSA (gap 0,6–0,7mm) — 8.000 km', body: 'Inspecionar a 5.000 km.' },
  { severity: 'WARN', title: 'Filtro de ar — off-road: após cada trilha / asfalto: 5.000 km', body: 'Espuma: querosene + secar + óleo.' },
  { severity: 'WARN', title: 'Lubrificação corrente 428H — 500 km (após trilha: imediato)', body: 'Folga 20–30mm.' },
  { severity: 'WARN', title: 'Folga de válvulas (adm 0,05 / esc 0,08mm) — 5.000 km', body: 'Off-road: intervalo mais curto. Motor frio.' },
  { severity: 'OK', title: 'Retentor bengala — inspecionar por vazamento 15.000 km', body: 'Bengala ø35mm. Troque se aparecer óleo.' },
  { severity: 'OK', title: 'Lona freio dianteiro e traseiro (tambor) — 10.000 km', body: 'Lona < 2mm = troca.' },
]

// ─── Blocos ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'SETA 125',
    yearFrom: 2007, yearTo: 2014,
    MACETES: SETA125_MACETES,
    PROBLEMAS: SETA125_PROBLEMAS,
    MANUTENCAO: SETA125_MANUTENCAO,
  },
  {
    modelName: 'SETA 150',
    yearFrom: 2010, yearTo: 2014,
    MACETES: SETA150_MACETES,
    PROBLEMAS: SETA150_PROBLEMAS,
    MANUTENCAO: SETA150_MANUTENCAO,
  },
  {
    modelName: 'WAY 125',
    yearFrom: 2008, yearTo: 2014,
    MACETES: WAY125_MACETES,
    PROBLEMAS: WAY125_PROBLEMAS,
    MANUTENCAO: WAY125_MANUTENCAO,
  },
  {
    modelName: 'FLASH K 150cc',
    yearFrom: 2005, yearTo: 2012,
    MACETES: FLASHK_MACETES,
    PROBLEMAS: FLASHK_PROBLEMAS,
    MANUTENCAO: FLASHK_MANUTENCAO,
  },
  {
    modelName: 'TN 125',
    yearFrom: 1995, yearTo: 2000,
    MACETES: TN125_MACETES,
    PROBLEMAS: TN125_PROBLEMAS,
    MANUTENCAO: TN125_MANUTENCAO,
  },
]

// ─── Calibragens ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'SETA 125',
    yearFrom: 2007, yearTo: 2014,
    tireSize: '80/100-18 (F) · 90/90-18 (R)',
    frontPsi: 26, rearPsi: 28,
    frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Solo: F 26 / R 28 PSI. Com carona: F 26 / R 33 PSI. Câmara (não tubeless). Calibre semanalmente. Pneu dianteiro: Pirelli Pilot Street 80/100-18.',
  },
  {
    modelName: 'SETA 150',
    yearFrom: 2010, yearTo: 2014,
    tireSize: '80/100-18 (F) · 90/90-18 (R)',
    frontPsi: 26, rearPsi: 28,
    frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Solo: F 26 / R 28 PSI. Com carona: F 26 / R 33 PSI. Mesmo padrão do SETA 125.',
  },
  {
    modelName: 'WAY 125',
    yearFrom: 2008, yearTo: 2014,
    tireSize: '80/100-18 (F) · 90/90-18 (R)',
    frontPsi: 26, rearPsi: 28,
    frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Solo: F 26 / R 28 PSI. Com carona: F 26 / R 33 PSI. Padrão street 125cc.',
  },
  {
    modelName: 'FLASH K 150cc',
    yearFrom: 2005, yearTo: 2012,
    tireSize: '80/100-18 (F) · 90/90-18 (R)',
    frontPsi: 28, rearPsi: 28,
    frontPsiLoad: 28, rearPsiLoad: 33,
    notes: 'Solo: F 28 / R 28 PSI. Com carona: F 28 / R 33 PSI. Motor 150cc: pressão dianteira levemente maior. Disco dianteiro: pressão correta melhora sensação de frenagem.',
  },
  {
    modelName: 'TN 125',
    yearFrom: 1995, yearTo: 2000,
    tireSize: '2.75/21 (F) · 4.10/18 (R)',
    frontPsi: 22, rearPsi: 25,
    frontPsiLoad: 22, rearPsiLoad: 29,
    notes: 'ASFALTO — Solo: F 22 / R 25 PSI. Com carona: F 22 / R 29 PSI. OFF-ROAD: reduzir para F 18 / R 20 PSI para melhor tração em terra/areia. Retornar ao padrão no asfalto.',
  },
]

// ─── Manutenção estruturada ───────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // SETA 125
  { modelName: 'SETA 125', yearFrom: 2007, yearTo: 2014, component: 'Óleo 20W-50 JASO MA (0,9–1,0L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 124cc OHC. Mineral. Nunca JASO MB.', priority: 'HIGH', order: 1 },
  { modelName: 'SETA 125', yearFrom: 2007, yearTo: 2014, component: 'Vela NGK C7HSA (gap 0,6–0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Inspecionar 5.000 km. Torque 10–12 Nm.', priority: 'MEDIUM', order: 2 },
  { modelName: 'SETA 125', yearFrom: 2007, yearTo: 2014, component: 'Lubrificação corrente 428H', intervalKm: 500, intervalMonths: null, notes: 'Folga 20–30mm. Spray ou 80W-90.', priority: 'HIGH', order: 3 },
  { modelName: 'SETA 125', yearFrom: 2007, yearTo: 2014, component: 'Filtro de ar (espuma) — limpeza', intervalKm: 5000, intervalMonths: 12, notes: 'Querosene + secar + óleo fino.', priority: 'MEDIUM', order: 4 },
  { modelName: 'SETA 125', yearFrom: 2007, yearTo: 2014, component: 'Folga de válvulas (adm 0,05 / esc 0,08mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio obrigatório. Parafuso + contra-porca.', priority: 'HIGH', order: 5 },
  { modelName: 'SETA 125', yearFrom: 2007, yearTo: 2014, component: 'Kit relação 428H (pinhão 15T + coroa 42T + corrente)', intervalKm: 15000, intervalMonths: null, notes: 'Trocar kit completo.', priority: 'HIGH', order: 6 },
  { modelName: 'SETA 125', yearFrom: 2007, yearTo: 2014, component: 'Pastilha freio disc. / lona traseira', intervalKm: 8000, intervalMonths: 12, notes: 'Pastilha < 1,5mm = troca. Lona < 2mm = troca.', priority: 'MEDIUM', order: 7 },
  { modelName: 'SETA 125', yearFrom: 2007, yearTo: 2014, component: 'Bateria YB5L-B — verificar tensão', intervalKm: null, intervalMonths: 12, notes: '12,4V+ em repouso.', priority: 'MEDIUM', order: 8 },
  { modelName: 'SETA 125', yearFrom: 2007, yearTo: 2014, component: 'Limpeza carburador VM22', intervalKm: 10000, intervalMonths: 12, notes: 'Spray + palito fino. Nível boia: ~15mm.', priority: 'MEDIUM', order: 9 },

  // SETA 150
  { modelName: 'SETA 150', yearFrom: 2010, yearTo: 2014, component: 'Óleo 20W-50 JASO MA (1,0L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 149cc OHC. Mineral JASO MA.', priority: 'HIGH', order: 1 },
  { modelName: 'SETA 150', yearFrom: 2010, yearTo: 2014, component: 'Vela NGK C7HSA (gap 0,6–0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Inspecionar 5.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'SETA 150', yearFrom: 2010, yearTo: 2014, component: 'Lubrificação corrente 428H', intervalKm: 500, intervalMonths: null, notes: 'Folga 20–30mm.', priority: 'HIGH', order: 3 },
  { modelName: 'SETA 150', yearFrom: 2010, yearTo: 2014, component: 'Filtro de ar — limpeza', intervalKm: 5000, intervalMonths: 12, notes: 'Espuma: querosene + secar + óleo fino.', priority: 'MEDIUM', order: 4 },
  { modelName: 'SETA 150', yearFrom: 2010, yearTo: 2014, component: 'Folga de válvulas (adm 0,05 / esc 0,08mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 5 },
  { modelName: 'SETA 150', yearFrom: 2010, yearTo: 2014, component: 'Freio dianteiro (disco) + traseiro (tambor) — inspecionar', intervalKm: 8000, intervalMonths: 12, notes: 'Pastilha < 1,5mm = troca. Lona < 2mm = troca.', priority: 'MEDIUM', order: 6 },
  { modelName: 'SETA 150', yearFrom: 2010, yearTo: 2014, component: 'Kit relação 428H', intervalKm: 15000, intervalMonths: null, notes: 'Trocar kit completo.', priority: 'HIGH', order: 7 },

  // WAY 125
  { modelName: 'WAY 125', yearFrom: 2008, yearTo: 2014, component: 'Óleo 20W-50 JASO MA (0,9–1,0L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 124cc OHC. Idêntico ao SETA 125.', priority: 'HIGH', order: 1 },
  { modelName: 'WAY 125', yearFrom: 2008, yearTo: 2014, component: 'Vela NGK C7HSA (gap 0,6–0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Inspecionar 5.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'WAY 125', yearFrom: 2008, yearTo: 2014, component: 'Lubrificação corrente 428H', intervalKm: 500, intervalMonths: null, notes: 'Folga 20–30mm.', priority: 'HIGH', order: 3 },
  { modelName: 'WAY 125', yearFrom: 2008, yearTo: 2014, component: 'Filtro de ar — limpeza', intervalKm: 5000, intervalMonths: 12, notes: 'Espuma: querosene + secar + óleo fino.', priority: 'MEDIUM', order: 4 },
  { modelName: 'WAY 125', yearFrom: 2008, yearTo: 2014, component: 'Folga de válvulas (adm 0,05 / esc 0,08mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio. Parafuso + contra-porca.', priority: 'HIGH', order: 5 },
  { modelName: 'WAY 125', yearFrom: 2008, yearTo: 2014, component: 'Retentor bengala ø35mm + óleo SAE 10W (180mL/tubo)', intervalKm: 20000, intervalMonths: null, notes: 'Retentor genérico 35×47×11mm.', priority: 'MEDIUM', order: 6 },
  { modelName: 'WAY 125', yearFrom: 2008, yearTo: 2014, component: 'Kit relação 428H', intervalKm: 15000, intervalMonths: null, notes: 'Trocar kit completo.', priority: 'HIGH', order: 7 },

  // FLASH K 150cc
  { modelName: 'FLASH K 150cc', yearFrom: 2005, yearTo: 2012, component: 'Óleo 20W-50 JASO MA (1,0L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 149cc OHC. Mineral JASO MA.', priority: 'HIGH', order: 1 },
  { modelName: 'FLASH K 150cc', yearFrom: 2005, yearTo: 2012, component: 'Vela NGK C7HSA (gap 0,6–0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Inspecionar 5.000 km. Torque 10–12 Nm.', priority: 'MEDIUM', order: 2 },
  { modelName: 'FLASH K 150cc', yearFrom: 2005, yearTo: 2012, component: 'Lubrificação corrente 428H', intervalKm: 500, intervalMonths: null, notes: 'Folga 20–30mm.', priority: 'HIGH', order: 3 },
  { modelName: 'FLASH K 150cc', yearFrom: 2005, yearTo: 2012, component: 'Filtro de ar — limpeza', intervalKm: 5000, intervalMonths: 12, notes: 'Espuma: querosene + secar + óleo fino.', priority: 'MEDIUM', order: 4 },
  { modelName: 'FLASH K 150cc', yearFrom: 2005, yearTo: 2012, component: 'Folga de válvulas (adm 0,05 / esc 0,08mm)', intervalKm: 8000, intervalMonths: 12, notes: 'Motor frio obrigatório.', priority: 'HIGH', order: 5 },
  { modelName: 'FLASH K 150cc', yearFrom: 2005, yearTo: 2012, component: 'Fluido de freio DOT 4 (dianteiro)', intervalKm: 15000, intervalMonths: 24, notes: 'Bienal. Não misturar DOT 3 com DOT 4.', priority: 'HIGH', order: 6 },
  { modelName: 'FLASH K 150cc', yearFrom: 2005, yearTo: 2012, component: 'Pastilha freio dianteiro (disco) — 10.000 km', intervalKm: 10000, intervalMonths: null, notes: 'Espessura mínima 1,5mm.', priority: 'MEDIUM', order: 7 },
  { modelName: 'FLASH K 150cc', yearFrom: 2005, yearTo: 2012, component: 'Lona freio traseiro (tambor) — 15.000 km', intervalKm: 15000, intervalMonths: null, notes: 'Espessura mínima 2mm.', priority: 'MEDIUM', order: 8 },
  { modelName: 'FLASH K 150cc', yearFrom: 2005, yearTo: 2012, component: 'Kit relação 428H', intervalKm: 15000, intervalMonths: null, notes: 'Trocar kit completo.', priority: 'HIGH', order: 9 },
  { modelName: 'FLASH K 150cc', yearFrom: 2005, yearTo: 2012, component: 'Limpeza carburador', intervalKm: 10000, intervalMonths: 12, notes: 'Jato principal #100–108. Spray + palito fino.', priority: 'MEDIUM', order: 10 },

  // TN 125
  { modelName: 'TN 125', yearFrom: 1995, yearTo: 2000, component: 'Óleo 20W-50 JASO MA (0,9L)', intervalKm: 2000, intervalMonths: 6, notes: 'Off-road: 2.000 km. Asfalto: 3.000 km.', priority: 'HIGH', order: 1 },
  { modelName: 'TN 125', yearFrom: 1995, yearTo: 2000, component: 'Vela NGK C7HSA (gap 0,6–0,7mm)', intervalKm: 8000, intervalMonths: null, notes: 'Inspecionar 5.000 km.', priority: 'MEDIUM', order: 2 },
  { modelName: 'TN 125', yearFrom: 1995, yearTo: 2000, component: 'Filtro de ar (espuma) — off-road: após trilha / asfalto: 5.000 km', intervalKm: 5000, intervalMonths: null, notes: 'Espuma: querosene + secar + óleo.', priority: 'HIGH', order: 3 },
  { modelName: 'TN 125', yearFrom: 1995, yearTo: 2000, component: 'Lubrificação corrente 428H', intervalKm: 500, intervalMonths: null, notes: 'Folga 20–30mm. Após trilha: limpar antes de lubrificar.', priority: 'HIGH', order: 4 },
  { modelName: 'TN 125', yearFrom: 1995, yearTo: 2000, component: 'Folga de válvulas (adm 0,05 / esc 0,08mm)', intervalKm: 5000, intervalMonths: 12, notes: 'Off-road: intervalo mais curto. Motor frio.', priority: 'HIGH', order: 5 },
  { modelName: 'TN 125', yearFrom: 1995, yearTo: 2000, component: 'Retentor bengala — inspecionar por vazamento', intervalKm: 15000, intervalMonths: null, notes: 'Bengala ø35mm. Troque se aparecer óleo.', priority: 'MEDIUM', order: 6 },
  { modelName: 'TN 125', yearFrom: 1995, yearTo: 2000, component: 'Lona freio dianteiro + traseiro (tambor)', intervalKm: 10000, intervalMonths: null, notes: 'Lona < 2mm = troca.', priority: 'MEDIUM', order: 7 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Kasinski Street (SETA 125, SETA 150, WAY 125, FLASH K 150, TN 125)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'KASINSKI', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'KASINSKI', vehicleTypeId: motoType.id },
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

  console.log('✅ Kasinski Street concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
