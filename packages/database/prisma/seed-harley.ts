// seed-harley.ts — Harley-Davidson — 6 modelos mais vendidos no Brasil
// Modelos: Street 750, Iron 883, Forty-Eight, Fat Boy 114, Street Bob, Road King
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

// ─── STREET 750 (2015–2021) ───────────────────────────────────────────────────
const STREET750_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo: 20W-50 SH/SJ — cárter único com 3,3 L (SEM óleo separado de primário/câmbio)',
    body: 'O Revolution X 750cc é motor líquido com cárter único — ao contrário dos Big Twins, NÃO há óleo separado para primário ou câmbio. Uma só troca de 3,3 L. Óleo original: H-D Formula+ 20W-50. Alternativas: Motul V-Twin 20W-50 (R$90–130/litro), Castrol Power1 V-Twin 20W-50 (R$80–120), Shell Advance Ultra V-Twin 20W-50. Usar somente SAE 20W-50 — viscosidade errada causa dano ao motor.',
  },
  {
    severity: 'OK',
    title: 'Filtro de óleo: Hiflofiltro HF170B ou K&N KN-170 — muito mais baratos que o original',
    body: 'Filtro original H-D: R$80–120. Substitutos diretos: Hiflofiltro HF170B (R$30–45) ou K&N KN-170 (R$70–90) — mesma rosca e dimensões, qualidade igual ou superior. Trocar junto com o óleo a cada 8.000 km. Apertar apenas a mão + ¾ de volta.',
  },
  {
    severity: 'OK',
    title: 'Correia de transmissão Gates — NÃO lubrifique; inspecione a cada 8.000 km',
    body: 'A Street 750 usa correia de transmissão (belt drive), não corrente. NUNCA lubrificar a correia — qualquer óleo ou graxa a degrada rapidamente. Inspeção a cada 8.000 km: verificar fissuras, desgaste nas bordas e tensão (deflexão de 10–15 mm com leve pressão). Correia Gates 8MGT-1344-30 é a original — substituta direta R$400–600.',
  },
  {
    severity: 'OK',
    title: 'Vela de ignição: NGK DCPR7E — gap 0,9 mm; trocar a cada 16.000 km',
    body: 'Vela original equivalente: NGK DCPR7E (R$25–40 cada, são 2 velas). Gap correto: 0,9 mm (0,035"). Alternativa: Bosch FR7DPP33. Motor DOHC líquido — as velas ficam menos sujeiras que no Evolution a ar, então a cada 16.000 km está OK. Usar torque de 14–18 N.m.',
  },
  {
    severity: 'WARN',
    title: 'ATENÇÃO: motor líquido — verificar nível e trocar fluido de arrefecimento',
    body: 'Diferente de outros HDs, a Street 750 tem radiador e fluido de arrefecimento. Verificar nível no reservatório de expansão mensalmente. Usar anticongelante orgânico (OAT) 50% diluído em água destilada. Trocar a cada 3 anos ou 48.000 km. NUNCA abrir o radiador com motor quente — risco de queimadura grave por vapor.',
  },
  {
    severity: 'OK',
    title: 'Superaquecimento em trânsito: ventilador liga automaticamente a ~109°C',
    body: 'O ventilador elétrico do radiador liga automaticamente quando a temperatura atinge ~109°C. Em engarrafamentos prolongados no sol de verão brasileiro, é normal o ventilador ficar ligado continuamente. Se temperatura subir além do normal, verificar nível de fluido e funcionamento do termostat (falha comum após 30.000 km).',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: K&N HA-8801 aumenta 5–8% de potência e é lavável',
    body: 'Filtro de ar original H-D (R$120–180). Alternativa permanente lavável: K&N HA-8801 (R$280–350) — aumenta levemente a potência e o som do motor, e dura a vida toda da moto. Lavar com kit K&N a cada 50.000 km ou quando visivelmente sujo.',
  },
  {
    severity: 'OK',
    title: 'Pastilha de freio: EBC FA379HH ou SBS 826DS — muito mais baratas que HD original',
    body: 'Pastilha dianteira original H-D: R$200–300. Substitutos: EBC FA379HH sinterizada (R$120–160) ou SBS 826DS (R$130–180) — especificação HH, resistência ao calor superior ao original. Para o disco traseiro: EBC FA196HH. Substituir quando espessura atingir 1,5 mm.',
  },
  {
    severity: 'OK',
    title: 'Bateria: AGM 12V 14Ah — Yuasa YTX14-BS ou Moura MA14-E',
    body: 'Bateria original: AGM 12V 14Ah (ou 12Ah dependendo do ano). Equivalentes: Yuasa YTX14-BS (R$450–550), Moura MA14-E (R$380–460). Usar SOMENTE bateria AGM (absorbed glass mat) — baterias convencionais não resistem às vibrações da HD. Se a bateria viver menos de 2 anos, checar o stator (gerador).',
  },
  {
    severity: 'OK',
    title: 'Plataforma Revolution X compartilhada com Street 500 — aproveitar peças',
    body: 'A Street 750 e a Street 500 usam a mesma plataforma Revolution X e compartilham muitas peças de elétrica, estrutura e suspensão. Em caso de dificuldade para encontrar peças da 750, verificar compatibilidade com Street 500 (mais comum em alguns mercados internacionais). Fóruns específicos: hdforums.com/forum/harley-davidson-street-750-1.',
  },
]

const STREET750_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'RECALL: bomba de combustível pode falhar — verificar VIN no site H-D',
    body: 'Recall oficial H-D em múltiplos anos: falha na bomba de combustível pode fazer a moto perder potência ou apagar em movimento. Verificar se o VIN da sua moto está na lista de recall em www.harley-davidson.com/recall — o reparo é gratuito na rede oficial. Recall também cobriu vazamento de combustível pelo sistema de evaporação de vapores.',
  },
  {
    severity: 'DANGER',
    title: 'Superaquecimento severo em engarrafamentos longos pode danificar a junta do cabeçalho',
    body: 'Em congestionamentos de mais de 30 minutos com temperatura acima de 35°C, o motor pode atingir temperaturas críticas se o sensor do ventilador falhar. Sintoma de aviso: temperatura no painel subindo além da faixa normal. Ação: ligar para um local com sombra e deixar esfriar com motor ligado. Verificar o sensor de temperatura e termostato a cada 30.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Stator (gerador interno) falha entre 20.000–40.000 km — bateria morre sem aviso',
    body: 'O stator da Street 750 é um ponto fraco relatado por proprietários. Sintoma: bateria não recarrega durante a viagem, tensão cai abaixo de 12V com motor em marcha. Teste: multímetro no alternador AC com motor em 3.000 RPM — deve marcar 14–16V AC entre cada par de fios do estator. Stator H-D original: R$800–1.200. Alternativa: stator genérico para Street 750 importado (R$300–500).',
  },
  {
    severity: 'WARN',
    title: 'Vibração excessiva a partir de 100 km/h — característica do motor, mas piora com balanceamento',
    body: 'A Street 750 vibra mais que o esperado para uma moto de 750cc. Em parte é característica do motor V-twin 60°. Mas vibração além do normal pode ser: pneus fora de balanceamento (verificar a cada 10.000 km), filtro de ar solto, ou suportes do motor com folga. Verificar e reapertar parafusos dos suportes do motor a cada 16.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pelo retento do eixo de balanceamento — problema documentado',
    body: 'Relatado por proprietários em múltiplos países: vazamento de óleo pelo retento do eixo de balanceamento lateral do motor. Sinal: poça de óleo na lateral direita do motor. A correção exige desmontagem parcial do motor — garantia cobre se dentro do prazo. Fora da garantia: retificadora com experiência em H-D.',
  },
  {
    severity: 'WARN',
    title: 'Painel digital falha ao molhar — conectores elétricos sensíveis à umidade',
    body: 'O painel digital da Street 750 não é completamente estanque. Após chuva intensa ou lavagem com jato d\'água, pode exibir leituras incorretas ou apagar. Aplicar graxa dielétrica nos conectores traseiros do painel anualmente. Nunca lavar com jato direto na região do painel e medidor.',
  },
]

const STREET750_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'Street 750', yearFrom: 2015, yearTo: 2021, component: 'Óleo do motor (rodagem)', intervalKm: 1000, intervalMonths: null, notes: 'Troca obrigatória aos 1.000 km. H-D Formula+ 20W-50 ou equivalente. 3,3 L. Substituir filtro junto.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Street 750', yearFrom: 2015, yearTo: 2021, component: 'Óleo do motor + filtro', intervalKm: 8000, intervalMonths: 12, notes: 'Troca regular a cada 8.000 km (5.000 mi) ou 12 meses. 20W-50 SH/SJ. 3,3 L. Filtro Hiflofiltro HF170B.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Street 750', yearFrom: 2015, yearTo: 2021, component: 'Filtro de ar', intervalKm: 16000, intervalMonths: 24, notes: 'Substituir a cada 16.000 km. Alternativa permanente: K&N HA-8801 (lavável). Limpar anualmente se usar K&N.', priority: 'HIGH', order: 3 },
  { modelName: 'Street 750', yearFrom: 2015, yearTo: 2021, component: 'Velas de ignição (2 unid.)', intervalKm: 16000, intervalMonths: 24, notes: 'NGK DCPR7E. Gap 0,9 mm. 2 velas. Torque 14–18 N.m. Motor DOHC líquido.', priority: 'HIGH', order: 4 },
  { modelName: 'Street 750', yearFrom: 2015, yearTo: 2021, component: 'Correia de transmissão', intervalKm: 8000, intervalMonths: 12, notes: 'Inspecionar a cada 8.000 km. Deflexão 10–15 mm. NÃO lubrificar. Substituir a cada 40.000 km ou ao surgir fissura/franja.', priority: 'HIGH', order: 5 },
  { modelName: 'Street 750', yearFrom: 2015, yearTo: 2021, component: 'Fluido de arrefecimento', intervalKm: 48000, intervalMonths: 36, notes: 'OAT 50% diluído em água destilada. Trocar a cada 3 anos ou 48.000 km. Não abrir com motor quente.', priority: 'HIGH', order: 6 },
  { modelName: 'Street 750', yearFrom: 2015, yearTo: 2021, component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, notes: 'Substituir a cada 2 anos. DOT 4. Frente e traseiro. Verificar nível mensalmente.', priority: 'HIGH', order: 7 },
  { modelName: 'Street 750', yearFrom: 2015, yearTo: 2021, component: 'Pastilhas de freio', intervalKm: 16000, intervalMonths: null, notes: 'Verificar desgaste a cada 8.000 km. Mínimo 1,5 mm. EBC FA379HH (dianteiro) e FA196HH (traseiro) como alternativa.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Street 750', yearFrom: 2015, yearTo: 2021, component: 'Stator e regulador de tensão', intervalKm: 24000, intervalMonths: null, notes: 'Verificar tensão de carga a cada 24.000 km (14–14,5V DC com motor em 3.000 RPM). Stator falha entre 20k–40k km.', priority: 'HIGH', order: 9 },
  { modelName: 'Street 750', yearFrom: 2015, yearTo: 2021, component: 'Bateria AGM', intervalKm: null, intervalMonths: 36, notes: '12V 14Ah AGM. Yuasa YTX14-BS ou Moura MA14-E. Nunca usar bateria convencional (líquida) em HD.', priority: 'MEDIUM', order: 10 },
]

// ─── IRON 883 (XL883N, 2009–2021) ────────────────────────────────────────────
const IRON883_MACETES: TipInput[] = [
  {
    severity: 'WARN',
    title: 'ATENÇÃO: 3 óleos separados — motor, primário e câmbio; não confundir',
    body: 'O motor Evolution Sportster tem TRÊS compartimentos de óleo independentes, cada um com óleo específico e quantidade diferente: (1) Motor: 2,84 L de 20W-50; (2) Primário (caixa da corrente primária): 0,95 L de H-D Formula+ ou equivalente; (3) Câmbio: 0,95 L de H-D Gear Oil SAE 75W-140. Confundir ou omitir qualquer um dos três causa danos sérios.',
  },
  {
    severity: 'OK',
    title: 'Óleo do motor: 20W-50 JASO MA2 — Motul V-Twin é a melhor alternativa',
    body: 'Motor Evolution 883cc: 2,84 L (3 qt) de SAE 20W-50. Original H-D Formula+ ou Syn3 (R$100–150/litro). Alternativas aprovadas por mecânicos especializados: Motul V-Twin 4T 20W-50 (R$80–120/L), Castrol Power1 V-Twin 20W-50, Red Line Synthetic 20W-50. Trocar a cada 8.000 km. Filtro: Hiflofiltro HF171B (R$30–45).',
  },
  {
    severity: 'OK',
    title: 'Óleo do primário: H-D Formula+ 50 ou equivalente SAE 50 — 0,95 L',
    body: 'Caixa da corrente primária: 0,95 L (1 qt) de H-D Primary Chain Case Lubricant (SAE 50). Alternativa: H-D Formula+ (o mesmo óleo do motor funciona na primária no Sportster, conforme manual). Trocar a cada 16.000 km. Tampa da primária: verificar torque dos parafusos (14 N.m) — vibração solta com o tempo.',
  },
  {
    severity: 'OK',
    title: 'Óleo do câmbio: SAE 75W-140 — 0,95 L; Red Line ShockProof é favorito dos mecânicos',
    body: 'Câmbio: 0,95 L de H-D Gear Oil SAE 75W-140 (R$150–200). Alternativa favorita de mecânicos especializados: Red Line Heavy ShockProof (R$130–180) — reduz notavelmente o tranco entre marchas. Outra opção: Amsoil V-Twin Transmission Fluid ou Motul Gear 300 LS 75W-140. Trocar a cada 16.000 km.',
  },
  {
    severity: 'OK',
    title: 'Filtro de óleo: Hiflofiltro HF171B — mesmo rosqueamento, menos da metade do preço',
    body: 'Filtro original H-D: R$80–140. Substituto direto: Hiflofiltro HF171B (R$30–45) — mesmas dimensões, rosca idêntica (3/4"-16), capacidade de filtração equivalente. Trocar a cada 8.000 km com o óleo do motor. K&N KN-171 (R$70–90) também é substituto direto.',
  },
  {
    severity: 'OK',
    title: 'Correia de transmissão: NUNCA lubrificar — inspecionar fissuras e tensão a cada 8.000 km',
    body: 'A Iron 883 usa belt drive (correia). Qualquer óleo ou graxa destrói a correia. Inspeção: verificar fissuras transversais, bordas desgastadas, e deflexão de 10–15 mm. Correia H-D original: R$600–900. Correia Gates equivalente: R$400–600. Vida útil: 40.000–80.000 km com inspeção regular.',
  },
  {
    severity: 'OK',
    title: 'Vela: NGK DCPR7E ou HD 6R12 — gap 0,9 mm; são 2 velas (1 por cilindro)',
    body: 'Motor Sportster tem 2 cilindros, 2 velas. NGK DCPR7E (R$25–40 cada) é substituto direto da H-D 6R12. Gap: 0,9 mm (0,035"). Trocar a cada 16.000 km. Com motor muito quente (uso em trânsito pesado no calor), verificar a cada 12.000 km — a vela do cilindro traseiro desgasta mais rápido pelo superaquecimento.',
  },
  {
    severity: 'OK',
    title: 'Superaquecimento do cilindro traseiro — posicionamento no semáforo é técnica vital',
    body: 'O cilindro traseiro do Sportster sofre mais com calor em trânsito — a frente do motociclista fica exposta ao calor irradiado. Técnicas: (1) Parar nos semáforos com a moto levemente virada para não ficar de frente ao escape; (2) Nunca apagar o motor parado no trânsito; (3) Instalar escudo térmico no cano de escape (R$50–100).',
  },
  {
    severity: 'OK',
    title: 'Bateria: AGM 12V 20Ah — Yuasa YTX20H-BS; nunca usar bateria de carro',
    body: 'Bateria original Sportster: AGM 12V 20Ah. Equivalentes: Yuasa YTX20H-BS (R$550–700), Moura MA20-E (R$480–600), Heliar HTX20-BS. NUNCA usar bateria de carro (diferente tecnologia, não aguenta as vibrações da HD). Manter em flutuador (tender) quando a moto ficar parada por mais de 2 semanas.',
  },
  {
    severity: 'OK',
    title: 'Air cleaner upgrade: K&N HA-8306 ou filtro esportivo aVo — ganho de som e performance',
    body: 'Filtro de ar original H-D para Iron 883: R$150–250. K&N HA-8306 (R$280–350) ou filtro de reposição K&N para couvercle H-D: ganho de 3–5 cv e sound mais grave. Se instalar Stage 1 com filtro + escapamento, remapear a injeção (H-D Power Vision ou Dynojet) para aproveitar o ganho e não empobrecer a mistura.',
  },
  {
    severity: 'OK',
    title: 'Pastilhas EBC FA129HH — alternativa para frente e traseira',
    body: 'Pastilha dianteira original H-D Iron 883: R$250–350. EBC FA129HH sinterizada (R$130–180) é substituta direta para o disco dianteiro 292mm do Sportster. Para o tambor traseiro (modelos mais antigos) ou disco traseiro: EBC FA196HH. Pastilhas sinterizadas mordem melhor a frio e duram mais.',
  },
]

const IRON883_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Rocker cover (Tampa do balancim) vaza óleo — vedadores endurecem pelo calor crônico',
    body: 'Problema clássico do Evolution Sportster: os vedadores (retentores) da tampa do balancim (rocker cover) endurecem com o calor crônico do motor a ar e passam a vazar óleo, especialmente no cilindro traseiro. Costuma surgir entre 20.000–40.000 km. Solução: substituir os O-rings da tampa — usar O-rings de silicone de alta temperatura (Viton) em vez dos de borracha originais. Resistem muito mais ao calor.',
  },
  {
    severity: 'DANGER',
    title: 'Stator (gerador) falha sem aviso entre 30.000–60.000 km — bateria morre em rota',
    body: 'O stator do Sportster tem vida útil documentada de 30.000–60.000 km. Quando falha, a bateria se esgota em 30–60 min de uso. Sintoma: queda gradual da tensão no painel (abaixo de 12V com motor girando). Teste: voltímetro nos terminais da bateria com motor em 3.000 RPM — deve marcar 14,0–14,5V. Stator original: R$600–900. Stator Cycle Electric ou Compu-Fire (R$400–600): alternativas aprovadas.',
  },
  {
    severity: 'WARN',
    title: 'Regulador de tensão superaquece — plástico derrete e causa curto',
    body: 'O regulador de tensão (voltage regulator) do Sportster fica preso na moldura lateral, recebendo calor do motor e do sol. Em clima brasileiro quente, o plástico da carcaça pode derreter e causar curto-circuito. Solução: relocar o regulador para local ventilado (kit de relocalização disponível) ou substituir pelo modelo Cycle Electric SE-3 com carcaça de alumínio (R$300–450).',
  },
  {
    severity: 'WARN',
    title: 'Cromo enferruja em 12–18 meses no clima úmido brasileiro',
    body: 'As peças cromadas do Sportster — tampas de motor, suportes, escapamento — enferrujam rapidamente no clima úmido e com sal (cidades litorâneas). Manutenção preventiva: passar cera de carnaúba nas peças cromadas mensalmente. Produtos como Autosol Metal Polish (R$40–60) removem ferrugem superficial. Peças muito danificadas: recromagem por galvânica (R$100–300 por peça).',
  },
  {
    severity: 'WARN',
    title: 'Parafuso do suporte do amortecedor traseiro solta com as vibrações',
    body: 'O parafuso inferior do amortecedor traseiro esquerdo da Iron 883 tende a se soltar com as vibrações do motor. Se não percebido, o amortecedor pode sair em movimento. Inspecionar e reapertar esse parafuso a cada 8.000 km (torque: 68 N.m). Usar Loctite azul 242 para evitar que se solte novamente.',
  },
  {
    severity: 'WARN',
    title: 'Primary chain tensioner (esticador da corrente primária) desgasta a partir de 40.000 km',
    body: 'O esticador da corrente primária (primary chain tensioner) é uma sapata de plástico que desgasta com o uso. Quando muito desgastado, causa barulho de "corrente batendo" ao acelerar/desacelerar. Substituir junto com a corrente primária a cada 40.000–60.000 km. Peça H-D + corrente: R$300–500.',
  },
]

const IRON883_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'Iron 883', yearFrom: 2009, yearTo: 2021, component: 'Óleo do motor (rodagem)', intervalKm: 1000, intervalMonths: null, notes: 'Troca obrigatória aos 1.000 km. 20W-50 JASO MA2. 2,84 L (3 qt). Substituir filtro Hiflofiltro HF171B.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Iron 883', yearFrom: 2009, yearTo: 2021, component: 'Óleo do motor + filtro', intervalKm: 8000, intervalMonths: 12, notes: 'Troca regular. 20W-50 JASO MA2. 2,84 L. Filtro HF171B. Em uso severo (calor intenso, trânsito): 5.000 km.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Iron 883', yearFrom: 2009, yearTo: 2021, component: 'Óleo da caixa primária', intervalKm: 16000, intervalMonths: 24, notes: 'H-D Formula+ SAE 50 ou equivalente. 0,95 L (1 qt). Verificar parafusos da tampa (14 N.m) — vibração solta.', priority: 'HIGH', order: 3 },
  { modelName: 'Iron 883', yearFrom: 2009, yearTo: 2021, component: 'Óleo do câmbio', intervalKm: 16000, intervalMonths: 24, notes: 'SAE 75W-140. 0,95 L. Red Line Heavy ShockProof ou Amsoil V-Twin Transmission Fluid reduzem o tranco.', priority: 'HIGH', order: 4 },
  { modelName: 'Iron 883', yearFrom: 2009, yearTo: 2021, component: 'Velas de ignição (2 unid.)', intervalKm: 16000, intervalMonths: 24, notes: 'NGK DCPR7E. Gap 0,9 mm. Cilindro traseiro desgasta mais rápido — verificar mais cedo em uso urbano intenso.', priority: 'HIGH', order: 5 },
  { modelName: 'Iron 883', yearFrom: 2009, yearTo: 2021, component: 'Filtro de ar', intervalKm: 16000, intervalMonths: 24, notes: 'Substituir a cada 16.000 km. K&N HA-8306 permanente (lavável) a cada 50.000 km.', priority: 'HIGH', order: 6 },
  { modelName: 'Iron 883', yearFrom: 2009, yearTo: 2021, component: 'Correia de transmissão', intervalKm: 8000, intervalMonths: 12, notes: 'Inspecionar tensão e fissuras a cada 8.000 km. Deflexão 10–15 mm. NUNCA lubrificar. Substituir a cada 40.000–60.000 km.', priority: 'HIGH', order: 7 },
  { modelName: 'Iron 883', yearFrom: 2009, yearTo: 2021, component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, notes: 'Substituir a cada 2 anos. DOT 4. Verificar nível mensalmente — perda de nível indica vazamento ou desgaste de pastilhas.', priority: 'HIGH', order: 8 },
  { modelName: 'Iron 883', yearFrom: 2009, yearTo: 2021, component: 'Rocker cover O-rings', intervalKm: 32000, intervalMonths: null, notes: 'Substituir vedadores de silicone (Viton) a cada 32.000 km ou ao surgir vazamento de óleo pela tampa do balancim.', priority: 'HIGH', order: 9 },
  { modelName: 'Iron 883', yearFrom: 2009, yearTo: 2021, component: 'Stator — verificação de carga', intervalKm: 16000, intervalMonths: 24, notes: 'Medir tensão de carga: 14,0–14,5V DC com motor em 3.000 RPM. Vida útil: 30.000–60.000 km. Cycle Electric ou Compu-Fire como substitutos.', priority: 'HIGH', order: 10 },
  { modelName: 'Iron 883', yearFrom: 2009, yearTo: 2021, component: 'Corrente primária + esticador', intervalKm: 40000, intervalMonths: null, notes: 'Verificar tensão da corrente primária a cada 16.000 km. Substituir corrente + esticador (sapata plástica) a cada 40.000–60.000 km.', priority: 'MEDIUM', order: 11 },
  { modelName: 'Iron 883', yearFrom: 2009, yearTo: 2021, component: 'Bateria AGM (12V 20Ah)', intervalKm: null, intervalMonths: 42, notes: 'Yuasa YTX20H-BS ou Moura MA20-E. Manter em flutuador (tender) quando inativa por mais de 2 semanas. Vida útil 3–5 anos.', priority: 'MEDIUM', order: 12 },
]

// ─── FORTY-EIGHT (XL1200X, 2010–2021) ────────────────────────────────────────
const FORTYEIGHT_MACETES: TipInput[] = [
  {
    severity: 'WARN',
    title: 'ATENÇÃO: 3 óleos separados iguais ao Iron 883 — motor 2,84 L, primário 0,95 L, câmbio 0,95 L',
    body: 'A Forty-Eight usa o mesmo motor Evolution 1200cc do Sportster, com os mesmos 3 compartimentos de óleo independentes. Motor: 2,84 L de 20W-50. Primário: 0,95 L de H-D Formula+. Câmbio: 0,95 L de SAE 75W-140. Filtro de óleo: Hiflofiltro HF171B (mesmos do Iron 883). A única diferença é o motor de 1200cc — gerações de calor maior que o 883.',
  },
  {
    severity: 'OK',
    title: 'Pneu dianteiro 130/90B16 (Dunlop D402F) — característico da Forty-Eight',
    body: 'A assinatura visual da Forty-Eight é o pneu dianteiro largo 130/90B16 no aro pequeno de 16". Pneu original: Dunlop D402F (R$450–600). Alternativas: Metzeler ME888 130/90B16 (R$500–700), Michelin Commander 3 (R$500–650). ATENÇÃO: verificar pressão a frio — pneu largo perde pressão mais lentamente, mas calibragem errada afeta muito o manuseio.',
  },
  {
    severity: 'OK',
    title: 'Óleo do motor: Motul V-Twin 20W-50 para o 1200cc no calor brasileiro',
    body: 'Motor 1200cc gera mais calor que o 883cc. No clima brasileiro, muitos mecânicos especializados recomendam Motul V-Twin 4T 20W-50 (R$80–120/L) por sua resistência térmica superior. Red Line Synthetic 20W-50 é outra opção premium. Trocar a cada 8.000 km ou 12 meses. Com uso em trânsito pesado no verão, reduzir para 6.000 km.',
  },
  {
    severity: 'OK',
    title: 'Tanque de combustível pequeno (7,9 L) — autonomia ~160–200 km; planejar a rota',
    body: 'A Forty-Eight tem um dos menores tanques de gasolina da linha Harley: 7,9 L. Consumo médio: 18–22 km/L. Autonomia real: 140–180 km. Em rodovias o consumo melhora para 22–25 km/L. Planejamento em viagens longas: nunca passar de 120 km sem parar para abastecer. Tanque estendido "fat" disponível como acessório oficial (14 L, R$2.500–4.000).',
  },
  {
    severity: 'OK',
    title: 'Correia de transmissão: inspecionar a cada 8.000 km — motor 1200cc estica mais rápido',
    body: 'Com o motor 1200cc mais torquento, a correia de transmissão sofre mais que no 883cc. Inspeção: deflexão de 10–15 mm. Verificar também as roldanas da correia — a roldana traseira (no aro) tem pins de borracha que desgastam e causam barulho. Substituir roldana traseira a cada 40.000–60.000 km (R$200–350).',
  },
  {
    severity: 'OK',
    title: 'Upgrade Stage 1 (filtro + escape) aumenta 15–20% de torque na Forty-Eight',
    body: 'A Forty-Eight responde bem ao Stage 1: substituir filtro de ar por kit K&N ou arlen Ness + escape de alto escoamento (Vance & Hines, Rinehart, Freedom Performance). Ganho real: 12–20 cv e 15–25 Nm de torque na roda. OBRIGATÓRIO: remapar a injeção com Dynojet Power Vision CR ou HD TTS Mastertune após Stage 1, senão a mistura fica pobre e danifica válvulas.',
  },
  {
    severity: 'OK',
    title: 'Pastilha EBC FA129HH para o disco dianteiro de 292 mm',
    body: 'Pastilha dianteira 292mm, mesma do Iron 883. EBC FA129HH sinterizada: R$130–180. Pastilha traseira: EBC FA196HH. Atenção: a Forty-Eight com pneu largo 130/90-16 transfere muito peso na frenagem — pastilha sinterizada premium é mais segura que a genérica.',
  },
  {
    severity: 'OK',
    title: 'Bateria: AGM 12V 20Ah — Yuasa YTX20H-BS; manter em flutuador no inverno',
    body: 'Mesma bateria do Iron 883: 12V 20Ah AGM. Yuasa YTX20H-BS (R$550–700) ou Moura MA20-E (R$480–600). No verão brasileiro a bateria sofre mais com o calor irradiado pelo motor 1200cc. Verificar tensão em carga a cada 12 meses. Usar flutuador (battery tender) quando a moto ficar parada por mais de 2 semanas.',
  },
  {
    severity: 'OK',
    title: 'Protetor de motor (engine guard) para uso urbano — recomendado',
    body: 'A Forty-Eight tem baixa distância ao solo e motor exposto. Protetor de motor cromado (engine guard/crash bar) para XL1200X: R$400–800 no Mercado Livre ou lojas de acessórios HD. Fundamental para uso urbano com frequentes manobras lentas — uma queda lateral sem protetor danifica cárter e primária (R$800–1.500 em peças e mão de obra).',
  },
]

const FORTYEIGHT_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Superaquecimento do cilindro traseiro danifica válvulas — crítico no trânsito brasileiro',
    body: 'O motor 1200cc a ar da Forty-Eight sofre mais com o calor do que o 883cc. No trânsito pesado brasileiro em dias quentes, a temperatura do cilindro traseiro pode atingir níveis que deformam sedes de válvulas ao longo do tempo. Sintomas: perda progressiva de potência, mistura rica (fumaça preta). Preventivo: parar o motor em paradas longas de mais de 5 minutos, usar óleo de qualidade premium, e nunca acelerar bruscamente com o motor frio.',
  },
  {
    severity: 'DANGER',
    title: 'Mesmos problemas de stator e rocker cover do Iron 883 — com maior severidade no 1200cc',
    body: 'Todos os problemas do Iron 883 (stator, rocker cover, regulador de tensão) se aplicam à Forty-Eight e tendem a ocorrer mais cedo pelo maior calor gerado pelo motor 1200cc. Stator: verificar tensão a cada 16.000 km. Rocker covers: O-rings de Viton preventivamente a cada 24.000 km na 1200cc (vs. 32.000 na 883cc). Regulador: relocar preventivamente para local ventilado.',
  },
  {
    severity: 'WARN',
    title: 'Tanque pequeno (7,9 L) + baixa autonomia pode deixá-lo sem combustível em rodovias',
    body: 'Vários proprietários relatam ter ficado sem combustível em rodovias com postos muito espaçados. A reserva só avisa quando restam ~1,5 L (~30 km de autonomia). Em rotas pelo interior do Brasil, planejar paradas a cada 120 km. Instalar medidor de combustível aftermarket (R$150–300) pode ser útil — o gauge original do tanque pequeno não é preciso.',
  },
  {
    severity: 'WARN',
    title: 'Roldana da correia traseira (compensating sprocket pins) desgasta e gera barulho',
    body: 'Os pins de borracha da roldana compensadora da correia traseira (compensating sprocket) desgastam entre 30.000–50.000 km, causando barulho seco de "claque-claque" ao acelerar/desacelerar. O barulho é frequentemente confundido com problemas de câmbio. Substituir a roldana (compensating sprocket) — peça H-D: R$600–900; usar roldana aftermarket Mcct ou RevTech: R$400–600.',
  },
  {
    severity: 'WARN',
    title: 'Peças cromadas enferrujam no litoral em 6–12 meses — manutenção mensal necessária',
    body: 'Mesma questão do Iron 883, porém com mais peças cromadas expostas. No litoral (umidade + maresia), as cromagens podem manchar em 6 meses. Cera Autosol mensalmente. Para propriedade na faixa litorânea: considerar black chrome (acabamento fosco) que resiste mais. Escapamento cromado: mais suscetível — polir a cada 2 semanas com produto anti-ferrugem.',
  },
]

const FORTYEIGHT_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'Forty-Eight', yearFrom: 2010, yearTo: 2021, component: 'Óleo do motor (rodagem)', intervalKm: 1000, intervalMonths: null, notes: 'Troca obrigatória aos 1.000 km. 20W-50 JASO MA2. 2,84 L. Filtro HF171B.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Forty-Eight', yearFrom: 2010, yearTo: 2021, component: 'Óleo do motor + filtro', intervalKm: 8000, intervalMonths: 12, notes: 'Motul V-Twin 20W-50 ou H-D Syn3. 2,84 L. Em trânsito intenso no verão: reduzir para 6.000 km.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Forty-Eight', yearFrom: 2010, yearTo: 2021, component: 'Óleo da caixa primária', intervalKm: 16000, intervalMonths: 24, notes: 'H-D Formula+ SAE 50. 0,95 L. Verificar parafusos da tampa (14 N.m) — vibração do 1200cc solta mais rápido.', priority: 'HIGH', order: 3 },
  { modelName: 'Forty-Eight', yearFrom: 2010, yearTo: 2021, component: 'Óleo do câmbio', intervalKm: 16000, intervalMonths: 24, notes: 'SAE 75W-140. 0,95 L. Red Line Heavy ShockProof reduz muito o tranco entre marchas.', priority: 'HIGH', order: 4 },
  { modelName: 'Forty-Eight', yearFrom: 2010, yearTo: 2021, component: 'Velas de ignição (2 unid.)', intervalKm: 12000, intervalMonths: 18, notes: 'NGK DCPR7E. Gap 0,9 mm. Motor 1200cc mais quente — verificar mais cedo que o 883cc. Cilindro traseiro primeiro.', priority: 'HIGH', order: 5 },
  { modelName: 'Forty-Eight', yearFrom: 2010, yearTo: 2021, component: 'Correia de transmissão', intervalKm: 8000, intervalMonths: 12, notes: 'Inspecionar tensão (deflexão 10–15 mm) e desgaste. Roldana traseira: verificar pins de borracha. Substituir a cada 40.000 km.', priority: 'HIGH', order: 6 },
  { modelName: 'Forty-Eight', yearFrom: 2010, yearTo: 2021, component: 'Rocker cover O-rings (Viton)', intervalKm: 24000, intervalMonths: null, notes: 'Motor 1200cc mais quente — substituir vedadores de Viton preventivamente a cada 24.000 km para evitar vazamento de óleo.', priority: 'HIGH', order: 7 },
  { modelName: 'Forty-Eight', yearFrom: 2010, yearTo: 2021, component: 'Stator — verificação de carga', intervalKm: 16000, intervalMonths: 24, notes: 'Medir tensão: 14,0–14,5V com motor em 3.000 RPM. Motor 1200cc é mais pesado para o stator — vida útil pode ser menor.', priority: 'HIGH', order: 8 },
  { modelName: 'Forty-Eight', yearFrom: 2010, yearTo: 2021, component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, notes: 'Substituir a cada 2 anos. DOT 4 frente e traseiro.', priority: 'HIGH', order: 9 },
  { modelName: 'Forty-Eight', yearFrom: 2010, yearTo: 2021, component: 'Roldana compensadora da correia', intervalKm: 40000, intervalMonths: null, notes: 'Verificar pins de borracha a cada 16.000 km. Substituir roldana completa a cada 40.000–50.000 km ou ao surgir barulho de claque na aceleração.', priority: 'MEDIUM', order: 10 },
]

// ─── FAT BOY 114 (FLFBS, 2018–2025) ──────────────────────────────────────────
const FATBOY114_MACETES: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Motor Milwaukee-Eight 114: 3 óleos separados — motor 3,7 L, primário 1,1 L, câmbio 1,1 L',
    body: 'O Big Twin Milwaukee-Eight 114 (1868cc) tem 3 compartimentos de óleo separados: (1) Motor: 3,7 L de H-D Screamin\' Eagle Syn3 20W-50 (ou equivalente 20W-50); (2) Primário: 1,1 L de H-D Primary Chain Case Lubricant; (3) Câmbio 6 velocidades: 1,1 L de H-D Gear Oil SAE 75W-140. Nunca usar o mesmo óleo para os três compartimentos.',
  },
  {
    severity: 'OK',
    title: 'Óleo do motor: Syn3 20W-50 ou Motul V-Twin 20W-50 — trocar a cada 8.000 km',
    body: 'Motor Milwaukee-Eight 114: 3,7 L de 20W-50. H-D Screamin\'Eagle Syn3 (R$120–160/L) é o original sintético. Alternativas premium: Motul V-Twin 4T 20W-50 (R$80–120/L), Red Line Synthetic 20W-50, Amsoil V-Twin 20W-50. Filtro: Hiflofiltro HF170C (Milwaukee-Eight, diferente do filtro do Sportster). Trocar a cada 8.000 km ou 12 meses.',
  },
  {
    severity: 'OK',
    title: 'Filtro de óleo Milwaukee-Eight: Hiflofiltro HF170C — não confundir com HF171B do Sportster',
    body: 'O Milwaukee-Eight usa filtro HF170C (Hiflofiltro, R$30–45) — rosca diferente do HF171B do Sportster. K&N KN-170C é o equivalente K&N. Erro de filtro = vazamento. Trocar junto com o óleo a cada 8.000 km. Apertar: mão + ¾ de volta (nunca usar chave para aperto — veda com borracha).',
  },
  {
    severity: 'OK',
    title: 'Pneu traseiro 240/40R18 — vida útil curta e caro; Metzeler ME888 dura mais',
    body: 'O pneu traseiro largo 240/40R18 (assinatura visual do Fat Boy) tem vida útil de 12.000–16.000 km no uso brasileiro. Pneu original Dunlop D429: R$800–1.100. Alternativas com melhor durabilidade: Metzeler ME888 Marathon Ultra 240/40R18 (R$900–1.200, dura ~20.000 km), Michelin Commander 3 (R$850–1.100). NUNCA usar pneu sem marcação "XT" (extra load) no traseiro.',
  },
  {
    severity: 'OK',
    title: 'Calor nas pernas do piloto — proteção térmica do escape é essencial',
    body: 'O escapamento duplo da Fat Boy passa perto das pernas do piloto e irradia calor intenso, especialmente em trânsito. Instalar proteção térmica (heat shield) nas saídas do escape é quase obrigatório para uso urbano no Brasil. Kits de wrap térmico (fita de lã de basalto) custam R$80–150 e reduzem significativamente o calor irradiado.',
  },
  {
    severity: 'OK',
    title: 'Sistema ABS: verificar aviso no painel antes de sair — sensor de roda pode sujar',
    body: 'O sensor ABS na Fat Boy 2018+ pode acumular partículas magnéticas de metal e disparar o aviso de falha no painel. Na maioria dos casos é falso positivo: limpar o sensor com pano limpo (localizado próximo ao rotor de freio, frente e trás) e reiniciar a moto. Se o aviso persistir, verificar com scanner H-D para descartar falha real.',
  },
  {
    severity: 'OK',
    title: 'Tanque de 18,9 L — consumo real 14–18 km/L; autonomia real ~250–300 km',
    body: 'Motor 1868cc tem consumo médio de 14–18 km/L dependendo do uso. Tanque de 18,9 L → autonomia real de 240–300 km. No Highway com velocidade constante o consumo melhora para 18–20 km/L. A luz de reserva acende com ~3,5 L restantes (~55–65 km).',
  },
  {
    severity: 'OK',
    title: 'Bateria: AGM 12V 18Ah ou 20Ah — Yuasa YTX20HL-BS; manter em flutuador',
    body: 'A Fat Boy consome mais bateria que Sportsters por ter mais eletrônica (ABS, TFT display, cruise control nos modelos Special). Yuasa YTX20HL-BS (R$550–700) ou Yuasa YTX20H-BS. Usar flutuador Battery Tender Plus quando a moto ficar parada por mais de 1 semana — o sistema de gestão eletrônica da Fat Boy drena ~4–5 mA mesmo desligada.',
  },
  {
    severity: 'OK',
    title: 'Escapamento original tem catalisador — remover muda o mapa da injeção',
    body: 'O escapamento original da Fat Boy 2018+ tem catalisador homologado para o PROCONVE. Ao trocar por escapamento de alta performance (Vance & Hines, Rinehart, Screamin\'Eagle), o mapa de injeção precisa ser reprogramado. Sem remapear: a moto funciona, mas com mistura pobre que pode danificar válvulas a longo prazo. Remapar com Dynojet Power Vision CR ou HD TTS Mastertune em oficina especializada.',
  },
]

const FATBOY114_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Calor excessivo nas pernas — queimadura em trânsito pesado é risco real',
    body: 'Em congestionamentos com mais de 20 minutos, o calor irradiado pelo escapamento e pelo motor da Fat Boy pode causar queimaduras nas pernas do piloto através da calça comum. Isso é especialmente grave no trânsito brasileiro em dias quentes. Soluções obrigatórias: calça com proteção térmica e Heat Shield no escape. Nunca usar shorts ou calças finas com esta moto.',
  },
  {
    severity: 'WARN',
    title: 'Pneu traseiro 240mm — substituição cara e ciclos curtos; leve no curvão',
    body: 'Pneu 240/40R18 custa R$800–1.200 e dura apenas 12.000–15.000 km em uso médio brasileiro. Além do custo, o pneu largo dificulta curvas — não é moto para curvas rápidas. Pressão correta é vital: pneu com pressão baixa desgasta excessivamente nas bordas; com pressão alta, desgasta no centro. Verificar calibragem a frio semanalmente.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico drena bateria quando estacionada — usar flutuador obrigatoriamente',
    body: 'A Fat Boy 2018+ com sistema TFT e ABS tem consumo de repouso de 4–5 mA (corrente parasita). Em 3–4 semanas sem uso, a bateria AGM pode ser danificada por descarga profunda. Battery Tender (flutuador) é item obrigatório. Uma bateria AGM danificada por descarga profunda raramente se recupera totalmente mesmo após recarga.',
  },
  {
    severity: 'WARN',
    title: 'Pés dos passageiros: posição faz dormir pernas em viagens longas',
    body: 'A posição do piloto na Fat Boy (pés para frente, estilo cruiser) causa dormência e dor nas pernas em viagens acima de 2 horas. Para uso em estradas: instalar "highway pegs" (apoios adicionais de pé) nos crash bars para variar a posição. Peça fácil de encontrar no mercado de acessórios.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pelo primário entre 20.000–40.000 km',
    body: 'A tampa da caixa primária (primary cover) usa juntas de borracha que endurecem com o calor ao longo do tempo. Sinal: mancha de óleo amarelo-claro na lateral esquerda. Solução: substituir junta da primária (R$30–60) e o O-ring do dreno. Não usar silicone como substituto de junta — silicone desintegra em contato com óleo quente de motor.',
  },
]

const FATBOY114_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'Fat Boy 114', yearFrom: 2018, yearTo: 2025, component: 'Óleo do motor (rodagem)', intervalKm: 1600, intervalMonths: null, notes: 'Primeira troca aos 1.600 km (1.000 mi). Syn3 20W-50 ou Motul V-Twin. 3,7 L. Filtro HF170C.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Fat Boy 114', yearFrom: 2018, yearTo: 2025, component: 'Óleo do motor + filtro', intervalKm: 8000, intervalMonths: 12, notes: 'H-D Syn3 20W-50 ou equivalente. 3,7 L. Filtro Hiflofiltro HF170C. Em uso severo: 6.000 km.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Fat Boy 114', yearFrom: 2018, yearTo: 2025, component: 'Óleo da caixa primária', intervalKm: 16000, intervalMonths: 24, notes: 'H-D Primary Chain Case Lubricant. 1,1 L. Verificar junta da tampa — endurece com calor.', priority: 'HIGH', order: 3 },
  { modelName: 'Fat Boy 114', yearFrom: 2018, yearTo: 2025, component: 'Óleo do câmbio (6 velocidades)', intervalKm: 16000, intervalMonths: 24, notes: 'H-D Gear Oil SAE 75W-140. 1,1 L. Red Line Heavy ShockProof melhora suavidade nas trocas.', priority: 'HIGH', order: 4 },
  { modelName: 'Fat Boy 114', yearFrom: 2018, yearTo: 2025, component: 'Velas de ignição (2 unid.)', intervalKm: 16000, intervalMonths: 24, notes: 'Verificar especificação no manual do ano específico — Milwaukee-Eight usa velas diferentes dos Sportsters.', priority: 'HIGH', order: 5 },
  { modelName: 'Fat Boy 114', yearFrom: 2018, yearTo: 2025, component: 'Correia de transmissão', intervalKm: 8000, intervalMonths: 12, notes: 'Inspecionar tensão e desgaste a cada 8.000 km. NUNCA lubrificar. Vida útil 40.000–60.000 km.', priority: 'HIGH', order: 6 },
  { modelName: 'Fat Boy 114', yearFrom: 2018, yearTo: 2025, component: 'Pneu traseiro 240/40R18', intervalKm: null, intervalMonths: 12, notes: 'Vida útil 12.000–15.000 km. Verificar desgaste e pressão (36 PSI a frio). Metzeler ME888 dura mais que o Dunlop D429 original.', priority: 'HIGH', order: 7 },
  { modelName: 'Fat Boy 114', yearFrom: 2018, yearTo: 2025, component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, notes: 'DOT 4 frente e traseiro. Substituir a cada 2 anos. Verificar nível e ausência de contaminação.', priority: 'HIGH', order: 8 },
  { modelName: 'Fat Boy 114', yearFrom: 2018, yearTo: 2025, component: 'Sensor ABS (limpeza)', intervalKm: 8000, intervalMonths: 12, notes: 'Limpar sensor ABS frente e traseiro com pano seco a cada 8.000 km. Partículas magnéticas causam falso aviso de falha no painel.', priority: 'MEDIUM', order: 9 },
  { modelName: 'Fat Boy 114', yearFrom: 2018, yearTo: 2025, component: 'Bateria AGM (12V 18–20Ah)', intervalKm: null, intervalMonths: 36, notes: 'Manter em flutuador Battery Tender quando parada por mais de 1 semana. Sistema elétrico drena 4–5 mA em repouso. Vida útil 3–5 anos.', priority: 'MEDIUM', order: 10 },
]

// ─── STREET BOB (FXBB Softail, 2018–2025) ────────────────────────────────────
const STREETBOB_MACETES: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Milwaukee-Eight 107: 3 óleos separados — motor 3,5 L, primário 1,1 L, câmbio 1,1 L',
    body: 'Motor Milwaukee-Eight 107 (1746cc). Compartimentos de óleo: (1) Motor: 3,5 L de 20W-50; (2) Primário: 1,1 L de H-D Formula+ ou Primary Lube; (3) Câmbio: 1,1 L de SAE 75W-140. Filtro de óleo: Hiflofiltro HF170C. Mesmo motor do Fat Boy 114 porém menor cilindrada — mesmos cuidados de manutenção.',
  },
  {
    severity: 'OK',
    title: 'Street Bob é a HD mais leve e ágil dos Softails — ideal para uso urbano',
    body: 'Com 317 kg e posição de pilotagem semi-upright, a Street Bob é a mais urbana dos Softails. Motor 107 com injeção eletrônica dá excelente torque desde 2.500 RPM. Consumo: 15–20 km/L. Com 18,9 L no tanque → autonomia real de 270–360 km. Para uso diário: verificar calibragem semanal e óleo mensal.',
  },
  {
    severity: 'OK',
    title: 'Pneus: 130/90 B16 (frente) e 180/70 B16 (traseiro) — Metzeler ME888 são ideais',
    body: 'Pneu dianteiro: 130/90 B16 Dunlop D408F (original). Traseiro: 180/70 B16. Alternativas mais duráveis: Metzeler ME888 (frente 130/90-16 e traseiro 180/70-16, R$500–700 cada), Michelin Commander 3. Pneus H-D originais duram ~15.000–18.000 km — os Metzeler chegam a 25.000 km.',
  },
  {
    severity: 'OK',
    title: 'Embreagem: ajustar cabo a cada 8.000 km para evitar patinamento',
    body: 'O cabo de embreagem da Street Bob precisa de ajuste periódico. Sintoma de cabo frouxo: embreagem engatando muito próxima ao guidão. Sintoma de cabo tenso: embreagem patina (moto não avança com acelerador aberto). Ajuste: rosca de regulagem na alavanca (porca de ajuste) + segunda regulagem no motor. Lubrificar o cabo anualmente com óleo fino 3 em 1.',
  },
  {
    severity: 'OK',
    title: 'Filtro K&N + escape Vance & Hines Short Shots: combo Stage 1 mais popular',
    body: 'O Stage 1 mais popular para a Street Bob no Brasil: K&N air cleaner + Vance & Hines Short Shots (escapamentos de pontão). Ganho: 12–18 cv e melhora significativa no som. Custo: R$800–1.500 filtro + R$3.000–6.000 escapamentos. OBRIGATÓRIO remapar a injeção após Stage 1. Sem remapear, a mistura empobrece e pode queimar válvulas.',
  },
  {
    severity: 'OK',
    title: 'Sistema de suspensão Softail: verificar precarga do amortecedor traseiro',
    body: 'A suspensão traseira Softail tem amortecedor oculto embaixo do motor. A precarga é ajustável mas requer ferramenta especial H-D. Para uso com garupa frequente, aumentar a precarga (tensão da mola) — moto muito "funda" com cargas indica precarga insuficiente. Alguns proprietários optam por amortecedores progressivos aftermarket YSS ou Öhlins (R$1.500–4.000).',
  },
  {
    severity: 'OK',
    title: 'Bateria: usar flutuador Battery Tender quando parada por mais de 5 dias',
    body: 'O sistema de gestão eletrônica da Softail 2018+ drena ~4-5 mA em repouso. Em 2–3 semanas sem flutuador, a bateria pode ser danificada por descarga profunda. Battery Tender Junior (R$180–250) ou Battery Tender Plus (R$300–400) são investimentos essenciais para proprietário de HD moderno.',
  },
  {
    severity: 'OK',
    title: 'Proteção de motor (crash bar) — a Street Bob não vem com protetor de série',
    body: 'A Street Bob tem design minimalista sem crash bars de série. Para uso urbano, instalar protetor de motor: evita dano ao motor, cárter e primária em quedas lentas (que são frequentes em baliza e manobras). Protetor específico para FXBB: R$600–1.200 no mercado de acessórios H-D. Investimento que vale em caso de primeiro acidente.',
  },
]

const STREETBOB_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Calor nas coxas — posição de pilotagem aproxima as pernas do motor',
    body: 'Na Street Bob, a posição dos pés ligeiramente à frente e os pés de apoio traseiros (forward controls) fazem as coxas do piloto ficarem mais próximas ao motor. Em trânsito lento, o calor irradiado é perceptível. Soluções: heat shield no escapamento (essencial) e calça com proteção térmica interna.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pelo joelho da junta de topo — tendência dos Milwaukee-Eight',
    body: 'Proprietários de Softail Milwaukee-Eight relatam tendência de pequeno vazamento de óleo pelo joelho da junta de topo (head gasket) entre 20.000–40.000 km. Sinal: manchinha de óleo escura na cabeça do cilindro. Ação: verificar com mecânico especializado — pode ser apenas ressudação de O-ring ou início de falha de junta. Não ignorar.',
  },
  {
    severity: 'WARN',
    title: 'Troca de marchas dura a frio — normal, mas piora se o câmbio não for revisado',
    body: 'O câmbio da Street Bob é duro e "clicado" especialmente com motor frio — característica do câmbio de 6 velocidades H-D. Mas se a troca está difícil mesmo com motor quente, verificar: (1) nível do óleo do câmbio; (2) ajuste do cabo de embreagem; (3) Red Line Heavy ShockProof como substituto do óleo de câmbio — melhora muito a suavidade.',
  },
  {
    severity: 'WARN',
    title: 'Chave de freio traseiro com má posição — fadiga do tornozelo em viagens longas',
    body: 'A posição dos forward controls (controles avançados) na Street Bob pode causar fadiga no tornozelo e má posição para o freio traseiro em viagens acima de 2 horas. Solução: ajustar a posição dos forward controls (são ajustáveis) ou instalar mid-controls aftermarket (mais centrados) para melhor ergonomia.',
  },
  {
    severity: 'WARN',
    title: 'Correia de transmissão estica mais rápido no primeiro ano — ajuste frequente',
    body: 'A correia nova da Street Bob passa por um período de "assentamento" nos primeiros 5.000 km onde estica mais rapidamente. Verificar a tensão da correia a cada 1.600 km nos primeiros 8.000 km. Depois do assentamento, intervalo de verificação pode ser estendido para 8.000 km.',
  },
]

const STREETBOB_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'Street Bob', yearFrom: 2018, yearTo: 2025, component: 'Óleo do motor (rodagem)', intervalKm: 1600, intervalMonths: null, notes: 'Troca obrigatória aos 1.600 km (1.000 mi). 20W-50. 3,5 L. Filtro HF170C.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Street Bob', yearFrom: 2018, yearTo: 2025, component: 'Óleo do motor + filtro', intervalKm: 8000, intervalMonths: 12, notes: 'H-D Syn3 20W-50 ou Motul V-Twin 20W-50. 3,5 L. Filtro Hiflofiltro HF170C. Milwaukee-Eight 107.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Street Bob', yearFrom: 2018, yearTo: 2025, component: 'Óleo da caixa primária', intervalKm: 16000, intervalMonths: 24, notes: 'H-D Primary Lube. 1,1 L. Verificar parafusos da tampa primária (14 N.m).', priority: 'HIGH', order: 3 },
  { modelName: 'Street Bob', yearFrom: 2018, yearTo: 2025, component: 'Óleo do câmbio (6 vel.)', intervalKm: 16000, intervalMonths: 24, notes: 'SAE 75W-140. 1,1 L. Red Line Heavy ShockProof melhora suavidade das trocas.', priority: 'HIGH', order: 4 },
  { modelName: 'Street Bob', yearFrom: 2018, yearTo: 2025, component: 'Cabo de embreagem', intervalKm: 8000, intervalMonths: 12, notes: 'Verificar ajuste e lubrificar anualmente. Folga correta: embreagem engrena após 1/3 do curso da alavanca.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Street Bob', yearFrom: 2018, yearTo: 2025, component: 'Correia de transmissão', intervalKm: 8000, intervalMonths: 12, notes: 'Inspecionar tensão (deflexão 10–15 mm). Nos primeiros 8.000 km, verificar a cada 1.600 km. NUNCA lubrificar.', priority: 'HIGH', order: 6 },
  { modelName: 'Street Bob', yearFrom: 2018, yearTo: 2025, component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, notes: 'DOT 4 frente e traseiro. Substituir a cada 2 anos.', priority: 'HIGH', order: 7 },
  { modelName: 'Street Bob', yearFrom: 2018, yearTo: 2025, component: 'Velas de ignição (2 unid.)', intervalKm: 16000, intervalMonths: 24, notes: 'Milwaukee-Eight — verificar especificação no manual do ano. Inspecionar gap com motor frio.', priority: 'HIGH', order: 8 },
  { modelName: 'Street Bob', yearFrom: 2018, yearTo: 2025, component: 'Amortecedor traseiro (precarga)', intervalKm: null, intervalMonths: 12, notes: 'Verificar precarga do amortecedor oculto Softail anualmente. Ajustar para carga habitual (solo vs. com garupa frequente).', priority: 'LOW', order: 9 },
  { modelName: 'Street Bob', yearFrom: 2018, yearTo: 2025, component: 'Bateria AGM', intervalKm: null, intervalMonths: 36, notes: 'Manter em flutuador Battery Tender quando parada mais de 5 dias. Descarga profunda danifica permanentemente a AGM.', priority: 'MEDIUM', order: 10 },
]

// ─── ROAD KING (FLHR Touring, 2017–2025) ─────────────────────────────────────
const ROADKING_MACETES: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Milwaukee-Eight 107/114: 3 óleos — motor 3,5–3,7 L, primário 1,1 L, câmbio 1,1 L',
    body: 'A Road King usa o Milwaukee-Eight 107 ou 114 dependendo do ano e versão. Motor: 3,5 L (107) ou 3,7 L (114) de 20W-50. Primário: 1,1 L H-D Primary Chain Case Lubricant. Câmbio 6 vel.: 1,1 L SAE 75W-140. Filtro de óleo: Hiflofiltro HF170C. Verificar o manual do ano específico para confirmar capacidades exatas.',
  },
  {
    severity: 'OK',
    title: 'Revisão a cada 8.000 km — agenda Serviço A / Serviço B alternados',
    body: 'H-D usa o conceito Serviço A (8.000 km / 12 meses): troca de óleo motor + filtro. Serviço B (16.000 km / 24 meses): óleo motor + filtro + óleo primário + óleo câmbio + velas + filtro de ar + correia. Alternativa brasileira: fazer o B a cada 8.000 km pelo calor intenso. Mecânicos independentes certificados H-D no Brasil têm preços 30–50% menores que a rede oficial.',
  },
  {
    severity: 'OK',
    title: 'Pneus Touring: 130/80B17 (frente) e 180/65B16 (traseiro) — Michelin Commander 3',
    body: 'Pneu dianteiro: 130/80B17. Traseiro: 180/65B16. Original: Dunlop D407. Alternativa premium recomendada para touring no Brasil: Michelin Commander 3 (frente + traseiro R$1.400–1.800 o conjunto) — excelente na chuva e vida útil de 20.000–25.000 km. Metzeler ME888 também é ótima opção (R$1.200–1.600 o conjunto).',
  },
  {
    severity: 'OK',
    title: 'Bateria maior: AGM 28Ah ou 30Ah — Yuasa YTX30L-BS; sistema elétrico pesado',
    body: 'A Road King tem sistema elétrico mais pesado: aquecedores de guidão, som, GPS, iluminação LED. Bateria recomendada: Yuasa YTX30L-BS (R$700–900) ou Odyssey PC680 (R$800–1.100). Flutuador Battery Tender Plus é obrigatório — nunca estacionar por mais de uma semana sem flutuador. O estator da Road King também trabalha mais duro.',
  },
  {
    severity: 'OK',
    title: 'Baús laterais: verificar vedação anualmente para não molhar conteúdo',
    body: 'Os baús laterais da Road King têm borrachas de vedação que endurecem com o tempo. Se a moto ficou na chuva e o conteúdo do baú molhou, as borrachas precisam ser substituídas. Borrachas de vedação H-D para baús: R$80–150 o par. Aplicar silicone lubrificante nas borrachas 2x por ano para prolongar a vida útil.',
  },
  {
    severity: 'OK',
    title: 'Sistema de freio integrado ABS — pastilhas EBC HH ou SBS especificação Touring',
    body: 'A Road King tem freio dianteiro com 2 discos e pinças duplas — muito mais potente que os Softails. Pastilha dianteira: EBC FA457HH ou SBS 826HS (para as pinças duplas Brembo/H-D). Traseiro: EBC FA155HH. Trocar quando espessura atingir 1,5 mm. Verificar discos (mínimo 5mm de espessura).',
  },
  {
    severity: 'OK',
    title: 'Lubrificação do ponto de pivô da roda dianteira e rolamentos do guiador',
    body: 'A Road King é uma moto pesada (350 kg) — rolamentos de direção (steering head bearings) e o pivô da roda dianteira precisam de relubrificação a cada 24.000 km. Usar graxa de lítio de alta temperatura. Rolamentos de direção desgastados causam "oscilação" do guiador em altas velocidades (wobble) — problema crítico em touring.',
  },
  {
    severity: 'OK',
    title: 'Aquecedores de punho (grip heaters) no Rio Sul — essencial no frio serrano',
    body: 'Para turistas de Harley que cruzam a Serra Gaúcha, Serra da Mantiqueira ou Planalto Serrano de SC, os aquecedores de punho originais H-D (R$600–900 ou incluso em versões Special) fazem enorme diferença. Verificar fusíveis do sistema de aquecimento antes de viagem — circuito separado para os aquecedores.',
  },
]

const ROADKING_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Peso de 350 kg — queda em manobra baixa velocidade é frequente entre iniciantes',
    body: 'A Road King pesa ~350 kg carregada com baús e garupa. Queda em manobra lenta (estacionamento, curva em U) pode resultar em danos graves à moto (R$3.000–8.000 em peças) e ao piloto (esmagamento do pé/perna). Recomendação: treinar manobras de baixa velocidade antes de usar a Road King regularmente. Usar protetor de motor (engine guard / crash bar) como item obrigatório.',
  },
  {
    severity: 'WARN',
    title: 'Farol original (2017–2018) halógeno fraco — upgrade para LED é quase obrigatório',
    body: 'O farol original da Road King 2017–2019 usa lâmpada H4 halógena com iluminação insuficiente para estradas escuras. Upgrade para kit LED H4 de alta potência: R$200–400. Para os modelos 2020+, o farol LED de série já é adequado. Ao trocar para LED, verificar se o regulador de tensão suporta a demanda adicional.',
  },
  {
    severity: 'WARN',
    title: 'Stator Milwaukee-Eight: vida útil 40.000–70.000 km — programar substituição preventiva',
    body: 'O stator do Milwaukee-Eight é mais robusto que o do Sportster, porém ainda tem vida limitada. O sistema elétrico pesado da Road King (som, GPS, aquecedores) sobrecarrega mais o gerador. Verificar tensão de carga a cada 16.000 km (14,0–14,7V DC com motor em 3.000 RPM). Substituir stator preventivamente ao atingir 50.000 km se for fazer longas viagens.',
  },
  {
    severity: 'WARN',
    title: 'Borrachas dos baús e parabrisa deterioram com UV e calor em 3–5 anos',
    body: 'O clima brasileiro com radiação UV intensa deteriora as borrachas de vedação dos baús, os suportes do parabrisa e as gaxetas do farol mais rapidamente que em países com invernos. Tratar borrachas com produtos específicos (303 Aerospace Protectant ou ArmorAll) 4x por ano prolonga a vida útil. Guardar a moto protegida do sol direto quando possível.',
  },
  {
    severity: 'WARN',
    title: 'Vibração de direção (wobble) em alta velocidade — rolamentos de direção a verificar',
    body: 'Wobble (oscilação do guiador) em velocidades acima de 100 km/h pode ser: (1) rolamentos de direção desgastados; (2) pneus fora de balanceamento; (3) pneus com deformação. A Road King tem estabilizador de direção de série — se o wobble ocorre mesmo com estabilizador, é sinal de rolamentos ou pneus. Balancear pneus a cada 10.000 km.',
  },
]

const ROADKING_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'Road King', yearFrom: 2017, yearTo: 2025, component: 'Óleo do motor (rodagem)', intervalKm: 1600, intervalMonths: null, notes: 'Troca obrigatória aos 1.600 km. 20W-50 Syn3. 3,5–3,7 L (verificar ano). Filtro HF170C.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Road King', yearFrom: 2017, yearTo: 2025, component: 'Óleo do motor + filtro (Serviço A)', intervalKm: 8000, intervalMonths: 12, notes: 'H-D Syn3 20W-50. 3,5–3,7 L. Hiflofiltro HF170C. Serviço A básico.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Road King', yearFrom: 2017, yearTo: 2025, component: 'Óleo primário + câmbio (Serviço B)', intervalKm: 16000, intervalMonths: 24, notes: 'Primário: 1,1 L H-D Primary Lube. Câmbio: 1,1 L SAE 75W-140. Fazer junto com óleo motor no Serviço B.', priority: 'HIGH', order: 3 },
  { modelName: 'Road King', yearFrom: 2017, yearTo: 2025, component: 'Filtro de ar + velas', intervalKm: 16000, intervalMonths: 24, notes: 'Substituir filtro de ar e velas no Serviço B. Verificar especificação de vela no manual do ano.', priority: 'HIGH', order: 4 },
  { modelName: 'Road King', yearFrom: 2017, yearTo: 2025, component: 'Correia de transmissão', intervalKm: 8000, intervalMonths: 12, notes: 'Inspecionar tensão (deflexão 10–15 mm) a cada 8.000 km. NUNCA lubrificar. Vida útil 50.000–80.000 km em touring.', priority: 'HIGH', order: 5 },
  { modelName: 'Road King', yearFrom: 2017, yearTo: 2025, component: 'Pneus (pressão e desgaste)', intervalKm: null, intervalMonths: 6, notes: 'Frente 130/80B17: 36 PSI solo / 38 PSI com garupa. Traseiro 180/65B16: 40 PSI solo / 42 PSI com garupa. Verificar semanalmente.', priority: 'HIGH', order: 6 },
  { modelName: 'Road King', yearFrom: 2017, yearTo: 2025, component: 'Pastilhas de freio (duplo disco)', intervalKm: 16000, intervalMonths: null, notes: 'Verificar espessura. EBC FA457HH (dianteiro, 4 pastilhas — 2 por disco) e FA155HH (traseiro). Mínimo 1,5 mm.', priority: 'HIGH', order: 7 },
  { modelName: 'Road King', yearFrom: 2017, yearTo: 2025, component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, notes: 'Sistema de freio maior — DOT 4 frente e traseiro. Substituir a cada 2 anos.', priority: 'HIGH', order: 8 },
  { modelName: 'Road King', yearFrom: 2017, yearTo: 2025, component: 'Rolamentos de direção', intervalKm: 24000, intervalMonths: null, notes: 'Relubricar com graxa de lítio a cada 24.000 km. Moto de 350 kg — desgaste mais rápido. Wobble em alta velocidade indica desgaste.', priority: 'HIGH', order: 9 },
  { modelName: 'Road King', yearFrom: 2017, yearTo: 2025, component: 'Vedações dos baús e parabrisa', intervalKm: null, intervalMonths: 12, notes: 'Tratar com 303 Aerospace Protectant 4x ao ano. Substituir borrachas a cada 3–5 anos (UV brasileiro é intenso).', priority: 'LOW', order: 10 },
  { modelName: 'Road King', yearFrom: 2017, yearTo: 2025, component: 'Stator — verificação de carga', intervalKm: 16000, intervalMonths: 24, notes: 'Sistema elétrico pesado (som, GPS, aquecedores). Medir 14,0–14,7V com motor em 3.000 RPM. Substituir preventivamente aos 50.000 km.', priority: 'HIGH', order: 11 },
  { modelName: 'Road King', yearFrom: 2017, yearTo: 2025, component: 'Bateria AGM (28–30Ah)', intervalKm: null, intervalMonths: 36, notes: 'Yuasa YTX30L-BS ou Odyssey PC680. Flutuador Battery Tender obrigatório. Vida útil 3–5 anos.', priority: 'MEDIUM', order: 12 },
]

// ─── BLOCKS (só MACETES + PROBLEMAS — TipInput[]) ────────────────────────────
const BLOCKS = [
  { modelName: 'Street 750',  yearFrom: 2015, yearTo: 2021, MACETES: STREET750_MACETES,  PROBLEMAS: STREET750_PROBLEMAS  },
  { modelName: 'Iron 883',    yearFrom: 2009, yearTo: 2021, MACETES: IRON883_MACETES,    PROBLEMAS: IRON883_PROBLEMAS    },
  { modelName: 'Forty-Eight', yearFrom: 2010, yearTo: 2021, MACETES: FORTYEIGHT_MACETES, PROBLEMAS: FORTYEIGHT_PROBLEMAS },
  { modelName: 'Fat Boy 114', yearFrom: 2018, yearTo: 2025, MACETES: FATBOY114_MACETES,  PROBLEMAS: FATBOY114_PROBLEMAS  },
  { modelName: 'Street Bob',  yearFrom: 2018, yearTo: 2025, MACETES: STREETBOB_MACETES,  PROBLEMAS: STREETBOB_PROBLEMAS  },
  { modelName: 'Road King',   yearFrom: 2017, yearTo: 2025, MACETES: ROADKING_MACETES,   PROBLEMAS: ROADKING_PROBLEMAS   },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────
const TIRE_PRESSURES = [
  {
    modelName: 'Street 750', yearFrom: 2015, yearTo: 2021,
    tireSize: '100/80-17 (F) · 150/80-16 (R)',
    frontPsi: 36, rearPsi: 40, frontPsiLoad: 38, rearPsiLoad: 42,
    notes: 'Motor Revolution X líquido. Calibrar a frio. Com garupa: +2 PSI dianteiro, +2 PSI traseiro. Nunca usar acima de 42 PSI no traseiro — manuseiabilidade ruim.',
  },
  {
    modelName: 'Iron 883', yearFrom: 2009, yearTo: 2021,
    tireSize: '100/90-19 (F) · 150/80-16 (R)',
    frontPsi: 36, rearPsi: 40, frontPsiLoad: 38, rearPsiLoad: 42,
    notes: 'Sportster 883cc Evolution. Aro dianteiro 19". Calibrar a frio. Com garupa: +2 PSI dianteiro, +2 PSI traseiro. Verificar semanalmente em uso diário.',
  },
  {
    modelName: 'Forty-Eight', yearFrom: 2010, yearTo: 2021,
    tireSize: '130/90-16 (F) · 150/80-16 (R)',
    frontPsi: 36, rearPsi: 40, frontPsiLoad: 38, rearPsiLoad: 42,
    notes: 'Pneu dianteiro largo 130/90-16 — característica visual da Forty-Eight. Calibrar a frio. Pneu largo perde pressão mais lentamente, mas verificar regularmente — 2 PSI baixo muda muito o manuseio.',
  },
  {
    modelName: 'Fat Boy 114', yearFrom: 2018, yearTo: 2025,
    tireSize: '160/60R18 (F) · 240/40R18 (R)',
    frontPsi: 36, rearPsi: 36, frontPsiLoad: 36, rearPsiLoad: 38,
    notes: 'Pneu traseiro 240mm — verificar pressão a frio semanalmente. Pressão errada no 240mm afeta aderência e desgaste drasticamente. Dunlop D429 original ou Metzeler ME888. Calibrar com balança calibrada — bomba de posto pode não ser precisa para pneu com grande volume.',
  },
  {
    modelName: 'Street Bob', yearFrom: 2018, yearTo: 2025,
    tireSize: '130/90 B16 (F) · 180/70 B16 (R)',
    frontPsi: 36, rearPsi: 40, frontPsiLoad: 38, rearPsiLoad: 42,
    notes: 'Softail Milwaukee-Eight 107. Aro 16" frente e traseiro. Metzeler ME888 ou Michelin Commander 3 são upgrades recomendados sobre o Dunlop D408F original. Calibrar a frio.',
  },
  {
    modelName: 'Road King', yearFrom: 2017, yearTo: 2025,
    tireSize: '130/80 B17 (F) · 180/65 B16 (R)',
    frontPsi: 36, rearPsi: 40, frontPsiLoad: 38, rearPsiLoad: 42,
    notes: 'Touring de 350 kg. Com bagagem cheia (baús + garupa): +2 PSI dianteiro, +2 PSI traseiro. Michelin Commander 3 (R$1.400–1.800 o conjunto) é a escolha padrão entre tourers HD no Brasil. Verificar balanceamento a cada 10.000 km.',
  },
]

// ─── MANUTENÇÃO FLAT ──────────────────────────────────────────────────────────
const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  ...STREET750_MANUTENCAO,
  ...IRON883_MANUTENCAO,
  ...FORTYEIGHT_MANUTENCAO,
  ...FATBOY114_MANUTENCAO,
  ...STREETBOB_MANUTENCAO,
  ...ROADKING_MANUTENCAO,
]

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🏍️  Seed Harley-Davidson iniciado...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })

  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Harley-Davidson', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'Harley-Davidson', vehicleTypeId: motoType.id },
  })

  const brand = await prisma.brand.findFirstOrThrow({
    where: { name: 'Harley-Davidson', vehicleTypeId: motoType.id },
  })

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {},
      create: { name: block.modelName, brandId: brand.id },
    })

    const allTips = [
      ...block.MACETES.map((tip) => ({ cat: 'MACETES' as Cat, tip })),
      ...block.PROBLEMAS.map((tip) => ({ cat: 'PROBLEMAS' as Cat, tip })),
    ]

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

  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: BLOCKS.map((b) => b.modelName) } } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('\n✅ Harley-Davidson seed concluído!')
  console.log(`   ${BLOCKS.length} modelos`)
  console.log(`   ${BLOCKS.reduce((a, b) => a + b.MACETES.length + b.PROBLEMAS.length, 0)} tips (MACETES + PROBLEMAS)`)
  console.log(`   ${TIRE_PRESSURES.length} calibragens`)
  console.log(`   ${MAINTENANCE_ITEMS.length} itens de manutenção`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
