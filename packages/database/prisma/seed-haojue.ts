// seed-haojue.ts — Haojue Motos (SHM / Haojue do Brasil) — 6 modelos vendidos no Brasil (2012–2025)
// Modelos: DR160, DK160, NK150, Lindy 125, Runner 150, HJ125-8EX
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

// ─── DR160 (2018–2025) ────────────────────────────────────────────────────────
const DR160_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA2 — 1,1 L por troca com filtro',
    body: 'Use 10W-40 API SL/SM com certificação JASO MA ou MA2 (obrigatório para embreagem úmida). Capacidade: 1,1 L na troca com limpeza do filtro centrífugo. Marcas: Mobil SUPER MOTO 10W40 (parceira oficial Haojue), Motul 5100, Castrol Power1 4T, Lubrax 4T. Nunca use óleo para carro sem JASO MA — dana a embreagem.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR7HSA — mesma da Honda CG 160 e Fan 160',
    body: 'Vela original equivalente: NGK CR7HSA (R$25–35). Exatamente a mesma usada na Honda CG 160, Fan 160 e Titan 160 — encontrada em qualquer autopeça do Brasil. Abertura: 0,6–0,7 mm. Trocar a cada 6.000 km. Torque de aperto: 12 N.m. Não usar vela sem resistor — causa interferência no painel digital.',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão 428 × 116 elos — compatível com Honda CG 160',
    body: 'A DR160 usa corrente 428 com 116 elos — mesmo tamanho da Honda CG 160. Kits relação (pinhão + coroa + corrente) para Honda CG 160 podem ser usados na Haojue DR160. Correntes VAZ ou Tsubaki 428H duram mais que a corrente original. Lubrificar a cada 500 km com spray de corrente ou óleo 80W90.',
  },
  {
    severity: 'WARN',
    title: 'CRÍTICO: verificar torque dos parafusos do filtro centrífugo a cada 3.000 km',
    body: 'Problema amplamente relatado: os parafusos que fixam o rotor do filtro de óleo centrífugo se soltam com o uso. Quando isso acontece, o motor perde pressão de óleo e pode ser destruído em minutos. Verificar torque a cada revisão — torque correto: 12 N.m. Sintoma de alerta: ruído metálico seco ao acelerar. Não ignore este check.',
  },
  {
    severity: 'OK',
    title: 'Filtro de óleo centrífugo — limpar a cada troca de óleo',
    body: 'A DR160 usa filtro de óleo centrífugo (rotor + tela), diferente do cartucho rosqueado. Na troca de óleo, abrir o rotor e limpar com querosene ou diesel, escovando com pincel macio. A borra preta se acumula rapidamente — filtro sujo sem limpeza compromete a lubrificação do motor.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar tipo espuma — limpar a cada 3.000 km, trocar a cada 12.000 km',
    body: 'O elemento filtrante é de espuma. A cada 3.000 km: limpar com ar comprimido (pressão baixa, fora para dentro). A cada 12.000 km ou quando danificado: substituir. Para limpeza profunda: lavar com água e detergente neutro, secar totalmente (nunca usar fogo ou calor), umedecer levemente em óleo 10W-40 e escorrer antes de montar.',
  },
  {
    severity: 'OK',
    title: 'Pastilha de freio dianteiro: disco 240 mm, pistão 27 mm — genérica funciona',
    body: 'Pastilha do freio dianteiro: pinça com pistão único de 27 mm, disco 240 mm. Pastilhas genéricas para "moto chinesa 150/160cc com disco 240mm pistão 27mm" funcionam bem (R$25–45 o jogo). Marcas: Brakes International, EBC FA244. Substituir quando espessura atingir 1,5 mm ou ao surgir rangido.',
  },
  {
    severity: 'OK',
    title: 'Tensão da corrente: folga de 10–20 mm no ponto mais frouxo',
    body: 'Medir a folga da corrente no ponto mais frouxo (parte inferior, entre pinhão e coroa). Correto: 10–20 mm. Corrente frouxa: bate no protetor e pode pular; muito esticada: desgasta rolamentos da roda traseira e pinhão prematuramente. Verificar a cada 1.000 km.',
  },
  {
    severity: 'OK',
    title: 'Autonomia real: 45–50 km/l com injeção — tanque 12 L = ~550 km',
    body: 'Consumo médio real de 45–50 km/l no uso urbano misto. Tanque de 12 litros → autonomia real de 540–600 km. A injeção eletrônica otimiza bem o consumo. Atenção: o bico reserva acende com ~1,5 L restantes — não espere engarrafamento para abastecer.',
  },
  {
    severity: 'OK',
    title: 'Bateria: 12V 5Ah YTZ5S — alternativas Moura e Heliar',
    body: 'Bateria original: 12V 5Ah (modelo YTZ5S ou YUASA YT5S). Alternativas nacionais compatíveis: Moura MFA5-BS (R$180–220), Heliar HTZ5.5-BS (R$180–230), FREEDOM AGM 5Ah. Verificar polaridade (positivo no lado direito no DR160). Vida útil média: 2–3 anos em uso urbano diário.',
  },
  {
    severity: 'OK',
    title: 'Peças: número de série do motor agiliza pedidos na rede Haojue',
    body: 'Para encontrar peças originais, fornecer o número de série do motor (gravado no bloco, lado esquerdo). A rede de concessionárias JTZ Motos acessa o catálogo ilustrado por número de série, evitando erros de pedido. No Mercado Livre, buscar "Haojue DR160 + código da peça" para encontrar alternativas com entrega mais rápida.',
  },
]

const DR160_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'PERIGO: parafusos do filtro centrífugo se soltam — motor pode fundir',
    body: 'Defeito documentado por múltiplos proprietários: os parafusos do rotor do filtro de óleo centrífugo se soltam progressivamente com a vibração do motor. Resultado: perda abrupta de pressão de óleo e fundição do motor em minutos. Verificar torque (12 N.m) a cada 3.000 km é obrigatório. Se ouvir ruído metálico seco, pare imediatamente e investigue.',
  },
  {
    severity: 'DANGER',
    title: 'Imobilizador eletrônico falha — moto fica completamente inoperante',
    body: 'Modelos 2024–2025 com imobilizador eletrônico apresentam falha no reconhecimento da chave transponder, especialmente após chuva ou lavagem. A moto não parte. Custo de reparo: substituição do módulo de controle (alto). Prazo de reparo em concessionária: até 45 dias. Se acontecer na garantia, exija moto reserva por escrito.',
  },
  {
    severity: 'WARN',
    title: 'Espera de 15–45 dias por peças nas concessionárias — planejamento essencial',
    body: 'Relatado amplamente no Reclame Aqui: concessionárias Haojue frequentemente não têm peças em estoque. Peças chegam em 15–45 dias. Estratégia de sobrevivência: manter estoque pessoal de peças de desgaste (corrente, pastilha dianteira, filtro de ar, vela, filtro centrífugo) para não ficar sem a moto.',
  },
  {
    severity: 'WARN',
    title: 'Luz de injeção (MIL) acende — ler código antes de gastar em peças',
    body: 'A luz de injeção acende com frequência sem falha grave. Causas mais comuns: sensor O2 com mau contato nos conectores (limpar com kontakt 60), sensor TPS descalibrado, ou tensão de bateria baixa. Use um scanner OBD2 com protocolo ISO 9141 / KWP2000 (adaptadores R$40–80 no Mercado Livre) para ler o código antes de comprar peças.',
  },
  {
    severity: 'WARN',
    title: 'Bengalas (suspensão dianteira) com vazamento entre 15.000–25.000 km',
    body: 'Os retentores (vedadores) das bengalas apresentam vazamento precoce, deixando óleo escuro nas hastes. Retentores universais de 33 mm ou 35 mm de diâmetro (dependendo do lote) funcionam e custam R$15–30 o par. Levar a haste para medir na loja. Conserto em borracharia ou oficina local, não é preciso ir à concessionária.',
  },
  {
    severity: 'WARN',
    title: 'Garantia negada indevidamente — documente tudo desde a compra',
    body: 'Há relatos de garantia negada com argumentos contestáveis (ex: "dano externo" em defeito de fábrica). Protocolo defensivo: fotografar a moto completa no dia da compra, guardar todos os comprovantes de revisão dentro do prazo, exigir relatório escrito de qualquer recusa de garantia. Em caso de negativa indevida: Procon → Juizado Especial Cível (causa até R$10.000 sem advogado).',
  },
]

const DR160_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'DR160', yearFrom: 2018, yearTo: 2025, component: 'Óleo do motor (rodagem)', intervalKm: 1000, intervalMonths: 6, notes: 'Primeira troca obrigatória aos 1.000 km. Usar 10W-40 JASO MA2. Limpar filtro centrífugo simultaneamente. 1,1 L.', priority: 'CRITICAL', order: 1 },
  { modelName: 'DR160', yearFrom: 2018, yearTo: 2025, component: 'Óleo do motor', intervalKm: 3000, intervalMonths: 6, notes: 'Troca regular a cada 3.000 km. 10W-40 JASO MA2. 1,1 L. Limpar filtro centrífugo e verificar torque dos parafusos do rotor (12 N.m).', priority: 'CRITICAL', order: 2 },
  { modelName: 'DR160', yearFrom: 2018, yearTo: 2025, component: 'Filtro centrífugo de óleo', intervalKm: 3000, intervalMonths: 6, notes: 'Abrir, limpar com querosene e pincel. Verificar torque dos parafusos de fixação (12 N.m). Parafusos soltos = motor destruído.', priority: 'CRITICAL', order: 3 },
  { modelName: 'DR160', yearFrom: 2018, yearTo: 2025, component: 'Vela de ignição', intervalKm: 6000, intervalMonths: 12, notes: 'NGK CR7HSA. Abertura 0,6–0,7 mm. Torque 12 N.m. Igual à Honda CG 160 — fácil encontrar.', priority: 'HIGH', order: 4 },
  { modelName: 'DR160', yearFrom: 2018, yearTo: 2025, component: 'Filtro de ar', intervalKm: 6000, intervalMonths: 12, notes: 'Limpar espuma a cada 3.000 km. Substituir a cada 12.000 km. Oleificar levemente antes de montar.', priority: 'HIGH', order: 5 },
  { modelName: 'DR160', yearFrom: 2018, yearTo: 2025, component: 'Corrente de transmissão', intervalKm: 1000, intervalMonths: null, notes: 'Verificar tensão (folga 10–20 mm) a cada 1.000 km. Lubrificar a cada 500 km. Corrente 428 × 116 elos.', priority: 'MEDIUM', order: 6 },
  { modelName: 'DR160', yearFrom: 2018, yearTo: 2025, component: 'Fluido de freio dianteiro (DOT 4)', intervalKm: null, intervalMonths: 24, notes: 'Substituir a cada 2 anos. Nível entre MIN e MAX no reservatório. DOT 4.', priority: 'HIGH', order: 7 },
  { modelName: 'DR160', yearFrom: 2018, yearTo: 2025, component: 'Folga das válvulas', intervalKm: 12000, intervalMonths: 24, notes: 'Admissão: 0,05–0,10 mm. Escape: 0,15–0,20 mm. Verificar com motor frio. Mal regulado = perda de potência e consumo elevado.', priority: 'HIGH', order: 8 },
  { modelName: 'DR160', yearFrom: 2018, yearTo: 2025, component: 'Pastilha de freio dianteiro', intervalKm: 6000, intervalMonths: 12, notes: 'Verificar espessura — mínimo 1,5 mm. Substituir ao surgir rangido. Pastilha genérica 27 mm compatível.', priority: 'MEDIUM', order: 9 },
  { modelName: 'DR160', yearFrom: 2018, yearTo: 2025, component: 'Tambor freio traseiro', intervalKm: 12000, intervalMonths: 24, notes: 'Verificar desgaste das lonas e diâmetro interno do tambor. Lavar e secar antes de montar após limpeza.', priority: 'LOW', order: 10 },
  { modelName: 'DR160', yearFrom: 2018, yearTo: 2025, component: 'Kit relação (pinhão + coroa + corrente)', intervalKm: 20000, intervalMonths: null, notes: 'Corrente 428 × 116 elos. Compatível com kit Honda CG 160. Sempre substituir pinhão, coroa e corrente juntos.', priority: 'MEDIUM', order: 11 },
  { modelName: 'DR160', yearFrom: 2018, yearTo: 2025, component: 'Bateria', intervalKm: null, intervalMonths: 30, notes: '12V 5Ah. Verificar tensão em carga (>12,6V). Vida útil média 2–3 anos. Alternativas: Moura MFA5-BS, Heliar HTZ5.5-BS.', priority: 'MEDIUM', order: 12 },
]

// ─── DK160 (2015–2020) ────────────────────────────────────────────────────────
const DK160_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA2 — 1,1 L; troca a cada 3.000 km',
    body: 'Especificação oficial: 10W-40 JASO MA ou MA2, 1,1 L por troca. A DK160 tem motor praticamente idêntico ao DR160. Marcas nacionais funcionam bem: Lubrax 4T 10W-40, Shell Advance, Mobil SUPER MOTO. Em regiões muito quentes (acima de 38°C), donos reportam boa experiência com 20W-50.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR7HSA — mesma usada em toda linha 160cc Haojue',
    body: 'Vela padrão: NGK CR7HSA (R$25–35). Com resistor — essencial para não gerar ruído no painel e no receptor de GPS/Bluetooth. Abertura: 0,6–0,7 mm. Trocar a cada 6.000 km. Alternativa: DENSO U22ESR9 (mesma faixa de temperatura, com resistor).',
  },
  {
    severity: 'OK',
    title: 'Filtro centrífugo — verificar parafusos; problema herdado do DR160',
    body: 'A DK160 compartilha o mesmo design de filtro centrífugo do DR160. Os parafusos do rotor também se soltam. Verificar torque (12 N.m) a cada 3.000 km, junto com a troca de óleo. Sintoma de aviso: trepidação e ruído seco na aceleração.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428 × 116 — kit relação Honda CG 160 é compatível',
    body: 'Corrente de transmissão 428 com 116 elos. Kits relação para Honda CG 160 podem ser usados (pinhão, coroa e corrente). A corrente original dura ~15.000 km com lubrificação regular. Correntes DID ou VAZ 428H duram mais.',
  },
  {
    severity: 'OK',
    title: 'CDI: substituição por unidade genérica 150/160cc quando falhar',
    body: 'Quando o CDI da DK160 falhar (motor para de pegar de repente, sem centelha), o CDI genérico para motos chinesas 150–160cc de 5 pinos funciona. Levar o original para comparar o conector. Custo: R$40–80 em lojas de autopeças para importados. Verificar sempre a bobina de ignição antes — pode ser ela a culpada.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar espuma — limpar a cada 3.000 km',
    body: 'Mesmo elemento espuma do DR160. Limpar a cada 3.000 km com ar comprimido. Em regiões de muita poeira, reduzir para 1.500 km. Substituir a cada 12.000 km. Filtro sujo aumenta consumo e causa fumaça preta pelo escapamento.',
  },
  {
    severity: 'OK',
    title: 'Peças DK160 — modelo descontinuado; estoque nas concessionárias esgota',
    body: 'A DK160 foi descontinuada em favor da DR160. As peças originais estão sumindo das concessionárias. Alternativa: mercado livre com fornecedores de peças para importados, ou buscar equivalentes de motos chinesas com motor similar (GY6 160cc com adaptações). Peças de desgaste (corrente, vela, filtro) encontrar logo e guardar.',
  },
  {
    severity: 'OK',
    title: 'Bengalas 33 mm — retentores universais quando vazar óleo',
    body: 'As bengalas da DK160 têm diâmetro de 33 mm (verificar no seu modelo específico). Ao vazar óleo, os retentores universais de 33 mm custam R$15–25 o par e são encontrados em borracharias especializadas. Não precisa ir à concessionária para este serviço.',
  },
  {
    severity: 'OK',
    title: 'Regulagem de marcha lenta: parafuso na caixa de filtro de ar',
    body: 'O parafuso de regulagem de marcha lenta da injeção eletrônica fica na lateral da caixa de filtro de ar. Marcha lenta ideal: 1.200–1.400 RPM. Abaixo disso: moto apaga nos semáforos. Acima: desgaste prematuro da embreagem e aquecimento.',
  },
]

const DK160_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Parafusos do filtro centrífugo se soltam — mesmo problema do DR160',
    body: 'A DK160 tem o mesmo defeito do DR160: parafusos do rotor do filtro centrífugo de óleo se soltam com a vibração. Se não verificar periodicamente, o motor pode perder pressão de óleo e fundir. Verificar torque (12 N.m) obrigatoriamente a cada 3.000 km. Ruído seco na aceleração = pare e verifique.',
  },
  {
    severity: 'WARN',
    title: 'Escapamento com trincas e vazamento de gases — risco de queimadura',
    body: 'O escapamento original da DK160 tende a trincar na junta do cabeçalho (~10.000–20.000 km), especialmente em uso com passageiro frequente. Sinal: barulho de "pum" rítmico e fumaça fina pelo coletor. Risco de queimadura na perna. Trocar junta de cobre (R$10–20) ou mandar soldar o trincado. Escapamentos paralelos de alta (R$150–300) resolvem definitivamente.',
  },
  {
    severity: 'WARN',
    title: 'Peças originais sumindo do mercado — modelo descontinuado',
    body: 'A DK160 não é mais fabricada. As peças originais nas concessionárias estão esgotando e não serão repostas. Dicas: catalogar as peças principais antes que sumam, buscar sucatas no Mercado Livre, e identificar equivalentes em motos chinesas com motor GY6 162cc.',
  },
  {
    severity: 'WARN',
    title: 'Sensor TPS descalibrado — moto "engasga" ao sair do neutro',
    body: 'Problema relatado na injeção eletrônica: sensor de posição da borboleta (TPS) se descalibra com o tempo. Sintoma: a moto engasga ao sair do neutro em marcha lenta. Solução: limpeza do corpo de borboleta com limpa-carburador em spray e recalibração do TPS (procedimento no manual de serviço). Não precisa trocar a peça na maioria dos casos.',
  },
  {
    severity: 'WARN',
    title: 'Cabo do acelerador encrava no guiador após chuva intensa',
    body: 'O cabo do acelerador entra água após chuva intensa e pode enferrujar por dentro, causando resistência ou travamento. Solução preventiva: injetar óleo WD-40 no cabo a cada 6 meses. Quando apresentar resistência, trocar o cabo (R$30–50 genérico de moto chinesa 160cc) — não tente lubrificar o cabo corroído internamente.',
  },
]

const DK160_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'DK160', yearFrom: 2015, yearTo: 2020, component: 'Óleo do motor (rodagem)', intervalKm: 1000, intervalMonths: 6, notes: 'Primeira troca aos 1.000 km. 10W-40 JASO MA2. 1,1 L. Limpar filtro centrífugo.', priority: 'CRITICAL', order: 1 },
  { modelName: 'DK160', yearFrom: 2015, yearTo: 2020, component: 'Óleo do motor', intervalKm: 3000, intervalMonths: 6, notes: 'Troca regular. 10W-40 JASO MA2. 1,1 L. Verificar torque parafusos filtro centrífugo (12 N.m).', priority: 'CRITICAL', order: 2 },
  { modelName: 'DK160', yearFrom: 2015, yearTo: 2020, component: 'Filtro centrífugo de óleo', intervalKm: 3000, intervalMonths: 6, notes: 'Limpar com querosene. Verificar torque dos parafusos de fixação (12 N.m). Parafusos soltos destroem o motor.', priority: 'CRITICAL', order: 3 },
  { modelName: 'DK160', yearFrom: 2015, yearTo: 2020, component: 'Vela de ignição', intervalKm: 6000, intervalMonths: 12, notes: 'NGK CR7HSA. Abertura 0,6–0,7 mm. Alternativa: DENSO U22ESR9.', priority: 'HIGH', order: 4 },
  { modelName: 'DK160', yearFrom: 2015, yearTo: 2020, component: 'Filtro de ar (espuma)', intervalKm: 6000, intervalMonths: 12, notes: 'Limpar a cada 3.000 km. Substituir a cada 12.000 km ou quando danificado. Em uso com muito pó: reduzir intervalo.', priority: 'HIGH', order: 5 },
  { modelName: 'DK160', yearFrom: 2015, yearTo: 2020, component: 'Corrente de transmissão', intervalKm: 1000, intervalMonths: null, notes: 'Verificar tensão (folga 10–20 mm) a cada 1.000 km. Lubrificar a cada 500 km com spray de corrente.', priority: 'MEDIUM', order: 6 },
  { modelName: 'DK160', yearFrom: 2015, yearTo: 2020, component: 'Folga das válvulas', intervalKm: 12000, intervalMonths: 24, notes: 'Admissão: 0,05–0,10 mm. Escape: 0,15–0,20 mm. Verificar com motor frio.', priority: 'HIGH', order: 7 },
  { modelName: 'DK160', yearFrom: 2015, yearTo: 2020, component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, notes: 'Substituir a cada 2 anos. Nível no reservatório entre MIN e MAX.', priority: 'HIGH', order: 8 },
  { modelName: 'DK160', yearFrom: 2015, yearTo: 2020, component: 'Pastilha e tambor de freio', intervalKm: 6000, intervalMonths: 12, notes: 'Pastilha mínima 1,5 mm. Tambor traseiro verificar desgaste das lonas.', priority: 'MEDIUM', order: 9 },
  { modelName: 'DK160', yearFrom: 2015, yearTo: 2020, component: 'Junta do escapamento', intervalKm: 12000, intervalMonths: null, notes: 'Verificar vazamento de gases no cabeçalho. Junta de cobre R$10–20. Substituir ao surgir ruído de "pum" rítmico.', priority: 'LOW', order: 10 },
  { modelName: 'DK160', yearFrom: 2015, yearTo: 2020, component: 'Kit relação (pinhão + coroa + corrente)', intervalKm: 18000, intervalMonths: null, notes: 'Corrente 428 × 116. Kit Honda CG 160 compatível. Substituir conjunto completo.', priority: 'MEDIUM', order: 11 },
]

// ─── NK150 (2019–2025) ────────────────────────────────────────────────────────
const NK150_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA2 — 1,0 L; trocar a cada 3.000 km',
    body: 'Motor 150cc da NK150 leva 1,0 L de óleo 10W-40 JASO MA/MA2. Em uso misto (trilha + asfalto), reduzir o intervalo para 2.000 km — o off-road exige mais do motor. Usar óleo com JASO MA2 sempre: a embreagem úmida depende disso.',
  },
  {
    severity: 'OK',
    title: 'Calibragem: 22 PSI dianteiro, 29 PSI traseiro no asfalto',
    body: 'Pressões para uso no asfalto: dianteiro 22 PSI, traseiro 29 PSI (solo). Para chuva ou curvas rápidas: reduzir 1–2 PSI. Para off-road leve (terra batida): dianteiro 18–20 PSI, traseiro 22–25 PSI — maior contato com o solo. Calibrar sempre com pneus frios.',
  },
  {
    severity: 'OK',
    title: 'Pneu MT60 original fraco no off-road — Pirelli MT90 ou Michelin Sirac são melhores',
    body: 'Os pneus originais Metzeler/MT60 da NK150 são mediocres em trilha solta. Upgrade recomendado: Pirelli MT90 Attack (traseiro 110/90-17, R$220–280) ou Michelin Sirac Street (versátil, R$200–260). Para trilha pesada: Dunlop Trailmax D604 — mas verificar se o para-lama dianteiro tem espaço.',
  },
  {
    severity: 'OK',
    title: 'Corrente reforçada para off-road: DID 428HD ou VAZ 428H',
    body: 'A corrente original 428 da NK150 é leve para uso off-road. Em uso misto, a corrente original dura ~8.000–10.000 km. Upgrade: DID 428HD (Heavy Duty) ou VAZ 428H — duram o dobro em condições de trilha, lama e areia. Lubrificar a cada 300–500 km no off-road (lama remove o lubrificante rapidamente).',
  },
  {
    severity: 'OK',
    title: 'ABS: sistema CBS (Combined Brake System), não ABS convencional',
    body: 'A NK150 usa CBS (freio combinado), não ABS com sensor de roda. No CBS, acionar o freio traseiro aciona parte do freio dianteiro automaticamente. Em off-road, isso pode causar travamento e queda. Técnica: usar apenas o freio traseiro em areia e lama solta. No asfalto, o CBS funciona bem para uso diário.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: limpar a cada 1.500 km em trilha, 3.000 km no asfalto',
    body: 'Em uso off-road com poeira, o filtro de ar entope rapidamente. Limpar a cada 1.500 km ou sempre que retornar de trilha com muita lama. O elemento espuma da NK150 pode ser lavado com água e detergente neutro (secar completamente antes de montar). Em trilha pesada: proteção adicional com meias de filtro externo.',
  },
  {
    severity: 'OK',
    title: 'Protetor de motor (slider) — essencial para off-road',
    body: 'A NK150 não vem com protetor de motor de fábrica. Em off-road, pedras e raízes danificam o cárter. Protetores de motor para "moto trail 150–160cc" custam R$80–150. Verificar modelos para Honda CG 160 (mesma distância ao solo ~195mm) — alguns adaptam com pequenas modificações.',
  },
  {
    severity: 'OK',
    title: 'Suspensão com maior curso que DR160 — sem ajuste de pré-carga',
    body: 'A NK150 tem suspensão com maior curso (frontal 130 mm, traseira 135 mm) para off-road leve. A suspensão traseira não tem ajuste de pré-carga de fábrica. Para uso com garupa frequente, instalar um amortecedor traseiro YSS ou similar com pré-carga ajustável (R$250–400) — melhora muito a estabilidade.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR7HSA — trocar a cada 6.000 km (3.000 em uso off-road intenso)',
    body: 'Vela padrão: NGK CR7HSA. Em uso off-road intenso com variações de carga, a vela desgasta mais rapidamente. Inspecionar a cada 3.000 km em uso misto. Eletrodo muito escuro (carvão) indica mistura rica ou filtro sujo. Cinza claro = OK. Branco = muito pobre (verificar injeção).',
  },
]

const NK150_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'CBS (Combined Braking) pode causar queda em off-road',
    body: 'O sistema CBS acopla freio traseiro ao dianteiro. Em areia, cascalho ou lama, acionar o pedal traseiro ativa também o dianteiro — o que pode travar a roda e causar queda. Em off-road: usar apenas o manípulo dianteiro com moderação ou o freio traseiro isolado com cautela. O CBS não pode ser desativado sem modificação.',
  },
  {
    severity: 'WARN',
    title: 'Pneus originais MT60 — desempenho fraco em trilha molhada',
    body: 'Os pneus de série não aderem bem em trilha com lama ou pedras molhadas. Vários proprietários relatam escorregamento na dianteira em terreno úmido. Substituir com 10.000–15.000 km por pneus mais adequados ao uso off-road (Pirelli MT90, Michelin Sirac, Dunlop D604).',
  },
  {
    severity: 'WARN',
    title: 'Peças específicas da NK150 têm estoque limitado nas concessionárias',
    body: 'A NK150 tem menos volume de vendas que a DR160. Peças específicas (carenagens, suportes de suspensão, painel) têm estoque muito limitado nas concessionárias. Guardar peças sobressalentes de desgaste com antecedência. Para peças de carroceria danificadas no off-road, mercado livre de importados é a melhor opção.',
  },
  {
    severity: 'WARN',
    title: 'Proteção elétrica insuficiente — conectores molham em chuva intensa',
    body: 'Os conectores elétricos da NK150 não têm vedação adequada para chuva pesada ou lavagem com jato d\'água. Após chuva intensa, a moto pode não partir por curto nos conectores. Preventivo: aplicar graxa dielétrica (de vela NGK) em todos os conectores elétricos expostos e cobrir com capa impermeável quando lavada.',
  },
  {
    severity: 'WARN',
    title: 'Rolamentos da roda traseira desgastam mais cedo em off-road',
    body: 'Em uso off-road (choque, impactos laterais, lama abrasiva), os rolamentos da roda traseira desgastam entre 15.000–20.000 km. Sintoma: barulho "hm hm" ao empurrar a moto sem motor, ou vibração na aceleração. Rolamentos 6204 e 6205 (padrão) disponíveis em qualquer loja de rolamentos por R$20–40 cada.',
  },
]

const NK150_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'NK150', yearFrom: 2019, yearTo: 2025, component: 'Óleo do motor', intervalKm: 2000, intervalMonths: 6, notes: 'No off-road reduzir para 2.000 km. No asfalto: 3.000 km. 10W-40 JASO MA2. 1,0 L.', priority: 'CRITICAL', order: 1 },
  { modelName: 'NK150', yearFrom: 2019, yearTo: 2025, component: 'Filtro de ar (espuma)', intervalKm: 3000, intervalMonths: 6, notes: 'No asfalto: 3.000 km. Em trilha/poeira: 1.500 km ou ao retornar de trilha com lama. Lavar, secar e oleificar levemente.', priority: 'HIGH', order: 2 },
  { modelName: 'NK150', yearFrom: 2019, yearTo: 2025, component: 'Corrente de transmissão (428H)', intervalKm: 500, intervalMonths: null, notes: 'Lubrificar a cada 500 km (300 km em off-road). Verificar tensão (folga 15–25 mm). 428H recomendada para uso misto.', priority: 'HIGH', order: 3 },
  { modelName: 'NK150', yearFrom: 2019, yearTo: 2025, component: 'Vela de ignição', intervalKm: 6000, intervalMonths: 12, notes: 'NGK CR7HSA. Em uso off-road intenso verificar a cada 3.000 km.', priority: 'HIGH', order: 4 },
  { modelName: 'NK150', yearFrom: 2019, yearTo: 2025, component: 'Pneus (calibragem e desgaste)', intervalKm: null, intervalMonths: 6, notes: 'Asfalto: dianteiro 22 PSI, traseiro 29 PSI. Off-road leve: 18/22 PSI. Verificar desgaste especialmente no dianteiro.', priority: 'HIGH', order: 5 },
  { modelName: 'NK150', yearFrom: 2019, yearTo: 2025, component: 'Pastilha dianteira e lona traseira', intervalKm: 6000, intervalMonths: 12, notes: 'Verificar espessura mínima. Em off-road o freio traseiro desgasta mais. Lavar com água após uso em lama.', priority: 'MEDIUM', order: 6 },
  { modelName: 'NK150', yearFrom: 2019, yearTo: 2025, component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, notes: 'Substituir a cada 2 anos. DOT 4. Nível entre MIN e MAX.', priority: 'HIGH', order: 7 },
  { modelName: 'NK150', yearFrom: 2019, yearTo: 2025, component: 'Rolamentos das rodas', intervalKm: 15000, intervalMonths: null, notes: 'Verificar a cada 15.000 km ou ao surgir barulho. Em off-road intenso verificar aos 10.000 km. Rolamentos 6204/6205 padrão.', priority: 'MEDIUM', order: 8 },
  { modelName: 'NK150', yearFrom: 2019, yearTo: 2025, component: 'Folga das válvulas', intervalKm: 12000, intervalMonths: 24, notes: 'Admissão: 0,05–0,10 mm. Escape: 0,15–0,20 mm. Verificar com motor frio.', priority: 'HIGH', order: 9 },
  { modelName: 'NK150', yearFrom: 2019, yearTo: 2025, component: 'Conectores elétricos', intervalKm: null, intervalMonths: 12, notes: 'Aplicar graxa dielétrica anualmente em todos os conectores expostos. Essencial para manter a moto funcionando em uso off-road com chuva.', priority: 'MEDIUM', order: 10 },
]

// ─── LINDY 125 (2016–2025) ────────────────────────────────────────────────────
const LINDY125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo CVT: 10W-30 SL — NÃO usar 10W-40 na caixa automática',
    body: 'A Lindy 125 é scooter com CVT (câmbio automático por correia). O motor leva óleo 10W-30 API SL/MA, 0,8 L. NÃO usar 10W-40 na câmbio — há uma caixa de engrenagens separada que leva óleo de câmbio 75W-90 (verificar manual do seu ano específico). Confundir os óleos causa dano à transmissão.',
  },
  {
    severity: 'OK',
    title: 'Correia CVT — vida útil 20.000–25.000 km; sinais de desgaste',
    body: 'A correia CVT é a peça mais crítica da transmissão. Sinais de desgaste: patinamento na aceleração ("puxada preguiçosa"), cheiro de borracha queimada, rangido ao acelerar. Substituir entre 20.000–25.000 km. Correia original Haojue: R$200–350. Correias genéricas para CVT 125cc de scooter chinesa funcionam — levar o comprimento e largura da original para comprar.',
  },
  {
    severity: 'OK',
    title: 'Roletes do variador CVT — substituir junto com a correia',
    body: 'Os roletes do variador (6–8 rolinhos de borracha) se desgastam junto com a correia. Quando ovalizam, causam patinamento e aceleração irregular. Substituir sempre junto com a troca da correia. Roletes com peso entre 12g–16g (verificar o original) — peso errado muda as características de aceleração.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR6HSA — uma escala mais fria que a DR160',
    body: 'Vela padrão da Lindy 125: NGK CR6HSA (motor menor e refrigerado diferente). Não usar CR7HSA do DR160 sem conferir — a escala de temperatura é diferente. Abertura: 0,6–0,7 mm. Trocar a cada 6.000 km. Custo: R$20–30.',
  },
  {
    severity: 'OK',
    title: 'Pneus 90/90-12 — Pirelli City Demon ou Michelin City Grip disponíveis',
    body: 'Pneus dianteiro e traseiro 90/90-12. Alternativas de qualidade: Pirelli City Demon Scooter (R$120–180), Michelin City Grip 2 (R$180–240). Evitar pneus genéricos baratos para scooter — durabilidade muito inferior. Calibragem: dianteiro 29 PSI, traseiro 33 PSI (solo); com garupa: 29/36 PSI.',
  },
  {
    severity: 'OK',
    title: 'Bateria scooter 12V 5Ah — sob o banco, troca simples',
    body: 'Bateria 12V 5Ah acessível pelo banco (chave de banco). Alternativas: Moura MFA5-BS, FREEDOM AGM 5Ah, Yuasa YTZ5S. Em scooter com muitos acessórios elétricos (baú, GPS, USB), a bateria dura menos — verificar tensão a cada ano. Vida útil média: 2–3 anos.',
  },
  {
    severity: 'OK',
    title: 'Limpeza periódica do baú de passagem de ar (CVT)',
    body: 'O sistema CVT é resfriado a ar por um baú de passagem. Esse baú acumula sujeira e pode entupir, causando superaquecimento da correia. A cada 6.000 km, verificar e limpar o canal de ar do CVT (visível removendo o painel lateral). Uma correia superaquecida dura menos da metade.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar da Lindy 125 — papel seco substituível',
    body: 'Diferente das motos com espuma, a Lindy 125 usa filtro de papel seco (verificar o seu modelo). Limpar com ar comprimido a cada 3.000 km. Substituir a cada 12.000 km — filtro de papel não pode ser lavado com água. Filtro genérico para "scooter 125cc chinesa" pode servir se o comprimento e seção forem iguais.',
  },
]

const LINDY125_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Correia CVT quebra sem aviso — moto para instantaneamente',
    body: 'Quando a correia CVT quebra, a transmissão trava e a roda traseira pode bloquear momentaneamente (dependendo da velocidade). Risco de queda se acontecer em movimento. A correia não dá sinais claros de ruptura iminente. Por isso, respeitar o intervalo de troca preventiva (20.000–25.000 km) é crítico — não esperar a correia quebrar para substituir.',
  },
  {
    severity: 'WARN',
    title: 'Rolamentos do CVT — barulho de rangido ao acelerar',
    body: 'Os rolamentos do conjunto variador e polia da correia apresentam desgaste entre 15.000–20.000 km, causando rangido ou vibração ao acelerar. Substituir rolamentos SKF ou NSK (R$15–30 cada em qualquer casa de rolamentos) ao surgir o barulho. Ignorar leva à quebra da polia e danos maiores.',
  },
  {
    severity: 'WARN',
    title: 'Sensor MAP (pressão do coletor) com falha — motor instável em marcha lenta',
    body: 'Falha relatada na injeção eletrônica da Lindy 125: sensor MAP com defeito causa marcha lenta instável (sobe e desce) e partida difícil a frio. Sensor MAP genérico compatível com scooter 125cc injetada custa R$40–70. Verificar antes se é apenas poeira no conector — limpeza com kontakt 60 resolve em muitos casos.',
  },
  {
    severity: 'WARN',
    title: 'Painel digital sensível à umidade — pixels morrem após chuva intensa',
    body: 'O painel digital da Lindy 125 não é totalmente estanque. Após exposição prolongada à chuva sem cobertura, pixels morrem ou o display fica com manchas. Manter uma capa de guidão impermeável. Se já apresentar problema: silicone vedador aplicado nos encaixes da carcaça resolve em alguns casos.',
  },
  {
    severity: 'WARN',
    title: 'Peças de carroceria específicas — difíceis fora das concessionárias',
    body: 'Carenagens e peças plásticas da Lindy 125 são específicas do modelo. Em caso de queda, as peças demoram semanas para chegar. Buscar no Mercado Livre com os termos "Haojue Lindy 125 carenagem" ou em lojas de importados para scooters chinesas. Reparo com massa plástica e tinta spray em cores sólidas é alternativa viável para danos estéticos.',
  },
]

const LINDY125_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'Lindy 125', yearFrom: 2016, yearTo: 2025, component: 'Óleo do motor', intervalKm: 3000, intervalMonths: 6, notes: '10W-30 API SL/MA. 0,8 L. NÃO confundir com o óleo da caixa do CVT (75W-90 separado).', priority: 'CRITICAL', order: 1 },
  { modelName: 'Lindy 125', yearFrom: 2016, yearTo: 2025, component: 'Correia CVT', intervalKm: 20000, intervalMonths: null, notes: 'Substituir preventivamente a cada 20.000–25.000 km. Correia quebrada pode bloquear roda traseira em movimento.', priority: 'CRITICAL', order: 2 },
  { modelName: 'Lindy 125', yearFrom: 2016, yearTo: 2025, component: 'Roletes do variador CVT', intervalKm: 20000, intervalMonths: null, notes: 'Substituir junto com a correia. Peso original dos roletes: verificar no manual (geralmente 12–16g). Peso errado muda a aceleração.', priority: 'HIGH', order: 3 },
  { modelName: 'Lindy 125', yearFrom: 2016, yearTo: 2025, component: 'Vela de ignição', intervalKm: 6000, intervalMonths: 12, notes: 'NGK CR6HSA. Abertura 0,6–0,7 mm. Não usar CR7HSA do DR160 — escala de temperatura diferente.', priority: 'HIGH', order: 4 },
  { modelName: 'Lindy 125', yearFrom: 2016, yearTo: 2025, component: 'Filtro de ar', intervalKm: 6000, intervalMonths: 12, notes: 'Papel seco: limpar com ar comprimido a cada 3.000 km, substituir a cada 12.000 km. NÃO lavar com água.', priority: 'HIGH', order: 5 },
  { modelName: 'Lindy 125', yearFrom: 2016, yearTo: 2025, component: 'Óleo da caixa CVT', intervalKm: 6000, intervalMonths: 12, notes: '75W-90 API GL-4. Quantidade: verificar no manual do modelo específico (~100–150 mL).', priority: 'HIGH', order: 6 },
  { modelName: 'Lindy 125', yearFrom: 2016, yearTo: 2025, component: 'Baú de ventilação do CVT', intervalKm: 6000, intervalMonths: 12, notes: 'Limpar canal de ar do CVT a cada 6.000 km. Entupimento causa superaquecimento da correia e reduz sua vida útil pela metade.', priority: 'MEDIUM', order: 7 },
  { modelName: 'Lindy 125', yearFrom: 2016, yearTo: 2025, component: 'Freios (pastilha dianteira + lona traseira)', intervalKm: 6000, intervalMonths: 12, notes: 'Verificar desgaste. Pastilha mínima 1,5 mm. Trocar fluido de freio (DOT 4) a cada 2 anos.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Lindy 125', yearFrom: 2016, yearTo: 2025, component: 'Pneus (calibragem e desgaste)', intervalKm: null, intervalMonths: 6, notes: 'Dianteiro 29 PSI, traseiro 33 PSI (solo). Com garupa: 29/36 PSI. 90/90-12 dianteiro e traseiro.', priority: 'HIGH', order: 9 },
  { modelName: 'Lindy 125', yearFrom: 2016, yearTo: 2025, component: 'Bateria (12V 5Ah)', intervalKm: null, intervalMonths: 24, notes: 'Verificar tensão anualmente (>12,6V em carga). Vida útil 2–3 anos. Moura MFA5-BS ou FREEDOM AGM compatíveis.', priority: 'MEDIUM', order: 10 },
]

// ─── RUNNER 150 (2013–2018) ───────────────────────────────────────────────────
const RUNNER150_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor carburado 150cc GY6 — carburador PZ26 ou PE24 compatível',
    body: 'A Runner 150 usa motor 150cc air-cooled com carburador (não injetada). O carburador original é equivalente ao PZ26 (26mm) padrão GY6 150cc. Carburadores genéricos PZ26 para "motos chinesas 150cc" custam R$60–120 e são compatíveis. Bico principal: #98 a #105 (verificar no seu carburador). Ajuste da mistura: 2,5 voltas abertas como ponto de partida.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA (sem resistor) ou CR7HSA (com resistor)',
    body: 'Vela padrão: NGK C7HSA (R$15–20). Em motos com painel digital ou Bluetooth, usar CR7HSA (com resistor) para evitar interferência. Abertura: 0,6–0,7 mm. Trocar a cada 6.000 km. A C7HSA é a mesma usada na Honda CG 125/150 carburada — fácil encontrar.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 JASO MA — 1,0 L por troca',
    body: 'Motor 150cc leva 1,0 L de 10W-40 JASO MA. Trocar a cada 3.000 km. Em uso severo (sol forte, trânsito lento) ou clima muito quente, trocar a cada 2.000 km. A corrente de distribuição da Runner 150 é sensível a óleo sujo — não negligenciar o intervalo.',
  },
  {
    severity: 'OK',
    title: 'CDI genérico 150cc de onda AC quando o original falhar',
    body: 'O CDI da Runner 150 (sistema AC) pode falhar causando falta de centelha. CDI genérico para "moto chinesa 150cc AC" (R$40–70) é compatível — levar o original para comparar os conectores. Antes de comprar o CDI, testar a bobina de ignição e o estator (verificar com multímetro em AC — valores no manual).',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar espuma — limpar a cada 2.000–3.000 km',
    body: 'O motor carburado é mais sensível ao filtro de ar sujo que o injetado. Filtro entupido causa mistura rica (fumaça preta, alto consumo). Limpar a cada 2.000–3.000 km com ar comprimido. Oleificar levemente com óleo motor antes de montar. Filtro genérico GY6 150cc substitui o original.',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão 428 — lubrificar a cada 300–500 km',
    body: 'Corrente 428 standard. Em uso diário urbano (parar e arrancar frequente), a corrente desgasta e estica mais rápido. Lubrificar a cada 300–500 km com spray de corrente. Tensão correta: 10–20 mm de folga. Kit relação Honda CG 150 (pinhão 14T, coroa 39T) pode ser adaptado — verificar número de elos.',
  },
  {
    severity: 'OK',
    title: 'Peças: modelo descontinuado — mercado de importados e GY6 é alternativa',
    body: 'A Runner 150 foi descontinuada. Peças originais Haojue estão esgotadas. Estratégia: buscar peças para "GY6 150cc" ou "moto chinesa 150cc carburada" — o motor é baseado nessa plataforma amplamente difundida. Retificação do motor, pistão, segmentos, cabeçote: disponíveis em retíficas como GY6 150. Elétrica: equivalentes CG150 com adaptação de conector.',
  },
  {
    severity: 'OK',
    title: 'Registro de combustível: fechar quando estacionar por mais de um dia',
    body: 'Fechar o registro de combustível (torneira) sempre que a moto ficar parada por mais de um dia. O carburador deixa vazar gasolina pelo bico principal quando o flutuador não veda bem (desgaste natural). Gasolina no cárter dilui o óleo — problema grave. Hábito simples que evita danos sérios.',
  },
]

const RUNNER150_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Carburador vaza para o cárter — diluição do óleo e dano ao motor',
    body: 'O flutuador do carburador perde vedação com o tempo. Gasolina vaza para o cárter misturando com o óleo. Sintoma: nível de óleo sobe, cheiro de gasolina no óleo, fumaça branca pelo escapamento. Se não detectado a tempo, o óleo diluído não lubrifica o motor → dano grave. Verificar: se o dipstick cheirar gasolina, trocar o óleo imediatamente e regular/substituir o carburador.',
  },
  {
    severity: 'WARN',
    title: 'CDI falha entre 20.000–40.000 km — motor não pega de repente',
    body: 'O CDI AC da Runner 150 é um ponto fraco. Falha inesperadamente: motor para de pegar sem centelha, sem nenhum aviso anterior. CDI genérico de moto chinesa 150cc AC resolve (R$40–70). Antes de comprar, verificar com multímetro se há tensão saindo do estator (12–15V AC).',
  },
  {
    severity: 'WARN',
    title: 'Retento traseiro (vedador do motor) com vazamento de óleo',
    body: 'O retento do lado traseiro do motor (eixo de saída de transmissão) vazamente entre 20.000–30.000 km. Sinal: mancha de óleo no pinhão e na corrente. Retento universal do mesmo diâmetro (verificar na loja de rolamentos) custa R$15–25. Ignorar o vazamento suja a corrente e a corrói mais rápido.',
  },
  {
    severity: 'WARN',
    title: 'Peças originais esgotadas — difícil encontrar carenagens e peças de carroceria',
    body: 'Modelo descontinuado desde 2018. Carenagens, retrovisores e peças plásticas específicas não existem mais nas concessionárias. Para danos estéticos: buscar no Mercado Livre por lotes de sucata ou adaptar peças de outras motos chinesas 150cc de design similar.',
  },
  {
    severity: 'WARN',
    title: 'Bobina de ignição superaquece em marcha lenta prolongada',
    body: 'Em engarrafamentos longos com motor no ralenti por mais de 20 minutos, a bobina de ignição pode superaquecer, causando corte de ignição temporário (moto apaga). Solução: se parar por muito tempo, desligar o motor. Bobinas originais são caras (quando encontradas). Bobina genérica para GY6 150cc (R$60–100) é a alternativa.',
  },
]

const RUNNER150_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'Runner 150', yearFrom: 2013, yearTo: 2018, component: 'Óleo do motor', intervalKm: 3000, intervalMonths: 6, notes: '10W-40 JASO MA. 1,0 L. Trocar mais cedo (2.000 km) em uso intenso ou calor extremo.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Runner 150', yearFrom: 2013, yearTo: 2018, component: 'Carburador (limpeza e regulagem)', intervalKm: 6000, intervalMonths: 12, notes: 'Limpar bico principal, agulha e flutuador. Verificar vedação do flutuador para evitar vazamento para o cárter. Ajuste de mistura: 2,5 voltas abertas.', priority: 'HIGH', order: 2 },
  { modelName: 'Runner 150', yearFrom: 2013, yearTo: 2018, component: 'Filtro de ar (espuma)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor carburado é mais sensível a filtro sujo. Limpar com ar comprimido. Oleificar levemente antes de montar.', priority: 'HIGH', order: 3 },
  { modelName: 'Runner 150', yearFrom: 2013, yearTo: 2018, component: 'Vela de ignição', intervalKm: 6000, intervalMonths: 12, notes: 'NGK C7HSA. Abertura 0,6–0,7 mm. Mesma da Honda CG 150 carburada.', priority: 'HIGH', order: 4 },
  { modelName: 'Runner 150', yearFrom: 2013, yearTo: 2018, component: 'Corrente de transmissão', intervalKm: 1000, intervalMonths: null, notes: 'Verificar tensão e lubrificar a cada 500 km. Folga 10–20 mm.', priority: 'MEDIUM', order: 5 },
  { modelName: 'Runner 150', yearFrom: 2013, yearTo: 2018, component: 'Registro de combustível', intervalKm: null, intervalMonths: 6, notes: 'Verificar vedação. Fechar ao estacionar por mais de um dia. Vazamento para o cárter dilui o óleo e dano o motor.', priority: 'HIGH', order: 6 },
  { modelName: 'Runner 150', yearFrom: 2013, yearTo: 2018, component: 'Folga das válvulas', intervalKm: 10000, intervalMonths: 18, notes: 'Admissão: 0,05–0,10 mm. Escape: 0,10–0,15 mm. Verificar com motor frio.', priority: 'HIGH', order: 7 },
  { modelName: 'Runner 150', yearFrom: 2013, yearTo: 2018, component: 'Freios (pastilha + lona traseira)', intervalKm: 6000, intervalMonths: 12, notes: 'Verificar desgaste e limpeza. Pastilha dianteira mínima 1,5 mm.', priority: 'MEDIUM', order: 8 },
  { modelName: 'Runner 150', yearFrom: 2013, yearTo: 2018, component: 'Retento traseiro do motor', intervalKm: 20000, intervalMonths: null, notes: 'Verificar manchas de óleo no pinhão. Retento universal do mesmo diâmetro disponível em qualquer loja de rolamentos (R$15–25).', priority: 'MEDIUM', order: 9 },
]

// ─── HJ125-8EX (2012–2017) ────────────────────────────────────────────────────
const HJ125_8EX_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Carburador PZ22 — mesmo do Honda CG 125 antigo com adaptação',
    body: 'O carburador da HJ125-8EX é do tipo PZ22 (22mm). Carburadores PZ22 genéricos para "moto chinesa 125cc" custam R$50–90 e são compatíveis. O carburador do Honda CG 125 antigo (pré-1999) tem bocal similar, mas o flange de encaixe pode precisar de adaptação. Bico principal: #95 a #100.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C6HSA — escala mais fria que o motor 150cc',
    body: 'A HJ125-8EX usa motor 125cc que opera em temperaturas menores. Vela correta: NGK C6HSA (R$12–18) — não confundir com C7HSA do 150cc. Usar vela mais quente que o recomendado pode causar pré-ignição. Abertura: 0,6–0,7 mm. Alternativa: DENSO U20FS-U.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-30 ou 10W-40 JASO MA — 0,9 L por troca',
    body: 'Motor 125cc leva 0,9 L de óleo 10W-30 (preferido em climas amenos) ou 10W-40 (em climas quentes). JASO MA obrigatório para embreagem úmida. Trocar a cada 3.000 km. Primeira troca em 1.000 km (óleo de rodagem).',
  },
  {
    severity: 'OK',
    title: 'CDI: verificar se é AC ou DC antes de comprar substituto',
    body: 'A HJ125-8EX pode ter CDI AC (controlado pelo alternador) ou DC (controlado pela bateria), dependendo do ano de fabricação. Verificar no catálogo do seu lote ou medir com multímetro (AC: fio do estator vai ao CDI; DC: fio da bateria vai ao CDI). CDI errado não faz a moto funcionar.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428 × 112 elos — mesma plataforma que Honda CG 125',
    body: 'Corrente de transmissão 428 com 112 elos (verificar no seu modelo). Kit relação para Honda CG 125 pode ser adaptado. Lubrificar a cada 500 km e verificar tensão (folga 10–20 mm) a cada 1.000 km.',
  },
  {
    severity: 'OK',
    title: 'Peças de elétrica: equivalentes de motos chinesas 125cc são compatíveis',
    body: 'Para peças elétricas da HJ125-8EX: retificador genérico 125cc, bobina de ignição GY6 125cc, regulador de tensão genérico 12V. A plataforma elétrica é padrão para motos chinesas 125cc dos anos 2010–2017. Levar o original para comparar conectores — pinos são padronizados.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar — espuma, limpar a cada 2.000–3.000 km',
    body: 'Motor carburado 125cc é sensível ao filtro de ar entupido. Limpar a cada 2.000–3.000 km. Em uso em estradas de terra ou cidades com muito pó: reduzir para 1.500 km. Filtro genérico GY6 125cc substitui o original.',
  },
  {
    severity: 'OK',
    title: 'Autonomia real: 50–55 km/l — tanque ~13 L = ~650 km',
    body: 'Motor 125cc carburado é muito econômico. Consumo médio real de 50–55 km/l. Com tanque de ~13 L, autonomia de 600–700 km. Ideal para uso urbano diário. Gasolina comum funciona bem — não há necessidade de aditivada.',
  },
]

const HJ125_8EX_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'CDI falha sem aviso — moto para abruptamente em movimento',
    body: 'O CDI da HJ125-8EX falha de forma abrupta: a moto apaga em movimento sem nenhum aviso. Principal suspeito em toda falha de ignição. CDI genérico 125cc AC (R$40–60) resolve na maioria dos casos. Manter uma unidade reserva é aconselhável para evitar ficar preso longe de uma loja.',
  },
  {
    severity: 'WARN',
    title: 'Carburador entope com gasolina parada — moto difícil de pegar após descanso longo',
    body: 'Gasolina parada por mais de 2–3 semanas forma verniz que entope o bico do carburador. Sintoma: moto não pega ou pega com dificuldade após período sem uso. Solução: fechar o registro antes de guardar, drenar o carburador pela parafuso de escoamento ou limpar o bico com arame fino e ar comprimido.',
  },
  {
    severity: 'WARN',
    title: 'Rolamento da roda traseira com barulho precoce',
    body: 'Rolamento da roda traseira (geralmente 6204 ou 6205) apresenta barulho entre 15.000–20.000 km. Sintoma: vibração e ruído "hm" constante que aumenta com a velocidade. Rolamentos SKF ou NSK custam R$20–30 cada. Qualquer oficina mecânica consegue fazer a troca.',
  },
  {
    severity: 'WARN',
    title: 'Peças específicas HJ125-8EX — modelo mais antigo da linha',
    body: 'Modelo dos primeiros anos da Haojue no Brasil. Peças originais praticamente inexistentes. Estratégia: identificar equivalentes no universo GY6 125cc (motor amplamente difundido em motos chinesas). Para o chassi e freios, buscar por "moto chinesa 125cc 2012" em lojas de importados e Mercado Livre.',
  },
  {
    severity: 'WARN',
    title: 'Tensão de bateria baixa — alternador 125cc gera pouca corrente',
    body: 'O alternador de 125cc gera menos corrente que os de 160cc. Com acessórios elétricos adicionais (farol de xenon, USB), a bateria pode não se recarregar adequadamente, levando a partidas difíceis. Solução: não adicionar mais de um acessório elétrico de grande consumo ao circuito original.',
  },
]

const HJ125_8EX_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'HJ125-8EX', yearFrom: 2012, yearTo: 2017, component: 'Óleo do motor (rodagem)', intervalKm: 1000, intervalMonths: null, notes: 'Primeira troca aos 1.000 km. 10W-30 ou 10W-40 JASO MA. 0,9 L.', priority: 'CRITICAL', order: 1 },
  { modelName: 'HJ125-8EX', yearFrom: 2012, yearTo: 2017, component: 'Óleo do motor', intervalKm: 3000, intervalMonths: 6, notes: 'Troca regular. 10W-30 ou 10W-40 JASO MA. 0,9 L.', priority: 'CRITICAL', order: 2 },
  { modelName: 'HJ125-8EX', yearFrom: 2012, yearTo: 2017, component: 'Carburador (limpeza)', intervalKm: 6000, intervalMonths: 12, notes: 'Limpar bico principal, agulha e câmara do flutuador. Fechar registro antes de guardar a moto por mais de 2 semanas.', priority: 'HIGH', order: 3 },
  { modelName: 'HJ125-8EX', yearFrom: 2012, yearTo: 2017, component: 'Filtro de ar (espuma)', intervalKm: 3000, intervalMonths: 6, notes: 'Limpar com ar comprimido. Oleificar levemente antes de montar. Filtro GY6 125cc substitui.', priority: 'HIGH', order: 4 },
  { modelName: 'HJ125-8EX', yearFrom: 2012, yearTo: 2017, component: 'Vela de ignição', intervalKm: 6000, intervalMonths: 12, notes: 'NGK C6HSA. Abertura 0,6–0,7 mm. NÃO confundir com C7HSA do 150cc.', priority: 'HIGH', order: 5 },
  { modelName: 'HJ125-8EX', yearFrom: 2012, yearTo: 2017, component: 'Corrente de transmissão', intervalKm: 1000, intervalMonths: null, notes: 'Verificar tensão (folga 10–20 mm) e lubrificar a cada 500 km.', priority: 'MEDIUM', order: 6 },
  { modelName: 'HJ125-8EX', yearFrom: 2012, yearTo: 2017, component: 'Folga das válvulas', intervalKm: 10000, intervalMonths: 18, notes: 'Admissão: 0,05–0,10 mm. Escape: 0,10–0,15 mm. Verificar com motor frio.', priority: 'HIGH', order: 7 },
  { modelName: 'HJ125-8EX', yearFrom: 2012, yearTo: 2017, component: 'Freios (pastilha + lona)', intervalKm: 6000, intervalMonths: 12, notes: 'Verificar espessura e limpeza. Pastilha mínima 1,5 mm. Lona traseira: verificar desgaste das marcas.', priority: 'MEDIUM', order: 8 },
  { modelName: 'HJ125-8EX', yearFrom: 2012, yearTo: 2017, component: 'Rolamentos das rodas', intervalKm: 15000, intervalMonths: null, notes: 'Verificar ao surgir barulho. Rolamentos 6204/6205 padrão — disponíveis em qualquer loja de rolamentos (R$20–30).', priority: 'MEDIUM', order: 9 },
  { modelName: 'HJ125-8EX', yearFrom: 2012, yearTo: 2017, component: 'Kit relação (pinhão + coroa + corrente)', intervalKm: 18000, intervalMonths: null, notes: 'Corrente 428 × 112 elos. Substituir conjunto completo. Equivalente GY6 125cc disponível.', priority: 'MEDIUM', order: 10 },
]

// ─── BLOCKS (só MACETES + PROBLEMAS — TipInput[]) ────────────────────────────
const BLOCKS = [
  { modelName: 'DR160',     yearFrom: 2018, yearTo: 2025, MACETES: DR160_MACETES,     PROBLEMAS: DR160_PROBLEMAS     },
  { modelName: 'DK160',     yearFrom: 2015, yearTo: 2020, MACETES: DK160_MACETES,     PROBLEMAS: DK160_PROBLEMAS     },
  { modelName: 'NK150',     yearFrom: 2019, yearTo: 2025, MACETES: NK150_MACETES,     PROBLEMAS: NK150_PROBLEMAS     },
  { modelName: 'Lindy 125', yearFrom: 2016, yearTo: 2025, MACETES: LINDY125_MACETES,  PROBLEMAS: LINDY125_PROBLEMAS  },
  { modelName: 'Runner 150',yearFrom: 2013, yearTo: 2018, MACETES: RUNNER150_MACETES, PROBLEMAS: RUNNER150_PROBLEMAS },
  { modelName: 'HJ125-8EX', yearFrom: 2012, yearTo: 2017, MACETES: HJ125_8EX_MACETES, PROBLEMAS: HJ125_8EX_PROBLEMAS },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────
const TIRE_PRESSURES = [
  {
    modelName: 'DR160', yearFrom: 2018, yearTo: 2025,
    tireSize: '80/100-18 (F) · 100/80-18 (R)',
    frontPsi: 25, rearPsi: 33, frontPsiLoad: 26, rearPsiLoad: 36,
    notes: 'Street 160cc injetada. Calibrar a frio. Com garupa: +1 PSI na frente, +3 PSI atrás. Pneus Pirelli Diablo Street ou Michelin Pilot Street são upgrades populares.',
  },
  {
    modelName: 'DK160', yearFrom: 2015, yearTo: 2020,
    tireSize: '80/100-18 (F) · 100/80-18 (R)',
    frontPsi: 25, rearPsi: 33, frontPsiLoad: 26, rearPsiLoad: 36,
    notes: 'Mesmas medidas e calibragem da DR160. Calibrar sempre a frio (após 3 h de repouso).',
  },
  {
    modelName: 'NK150', yearFrom: 2019, yearTo: 2025,
    tireSize: '90/90-19 MT60 (F) · 110/90-17 MT60 (R)',
    frontPsi: 22, rearPsi: 29, frontPsiLoad: 23, rearPsiLoad: 33,
    notes: 'Dual sport 150cc. Asfalto: 22/29 PSI. Off-road leve: 18–20 (F) / 22–25 (R) PSI para maior aderência. Nunca usar pressão de asfalto em trilha.',
  },
  {
    modelName: 'Lindy 125', yearFrom: 2016, yearTo: 2025,
    tireSize: '90/90-12 (F) · 90/90-12 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Scooter CVT 125cc. Rodas aro 12. Calibrar a frio. Com garupa: manter dianteiro e acrescentar 3 PSI atrás.',
  },
  {
    modelName: 'Runner 150', yearFrom: 2013, yearTo: 2018,
    tireSize: '2.75-18 (F) · 3.00-17 (R)',
    frontPsi: 25, rearPsi: 29, frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Street 150cc carburada. Aro 18 na frente e 17 atrás. Com garupa: +1 PSI dianteiro, +4 PSI traseiro.',
  },
  {
    modelName: 'HJ125-8EX', yearFrom: 2012, yearTo: 2017,
    tireSize: '2.75-18 (F) · 3.00-17 (R)',
    frontPsi: 24, rearPsi: 27, frontPsiLoad: 25, rearPsiLoad: 31,
    notes: 'Entry 125cc carburada. Pressão ligeiramente menor que o 150cc — motor mais leve. Com garupa: +1/+4 PSI.',
  },
]

// ─── MANUTENÇÃO FLAT ──────────────────────────────────────────────────────────
const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  ...DR160_MANUTENCAO,
  ...DK160_MANUTENCAO,
  ...NK150_MANUTENCAO,
  ...LINDY125_MANUTENCAO,
  ...RUNNER150_MANUTENCAO,
  ...HJ125_8EX_MANUTENCAO,
]

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🏍️  Seed Haojue iniciado...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })

  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Haojue', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'Haojue', vehicleTypeId: motoType.id },
  })

  const brand = await prisma.brand.findFirstOrThrow({
    where: { name: 'Haojue', vehicleTypeId: motoType.id },
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

  console.log('\n✅ Haojue seed concluído!')
  console.log(`   ${BLOCKS.length} modelos`)
  console.log(`   ${BLOCKS.reduce((a, b) => a + b.MACETES.length + b.PROBLEMAS.length, 0)} tips (MACETES + PROBLEMAS)`)
  console.log(`   ${TIRE_PRESSURES.length} calibragens`)
  console.log(`   ${MAINTENANCE_ITEMS.length} itens de manutenção`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
