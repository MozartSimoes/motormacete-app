// seed-fym.ts — FYM Motos (Feiying Motorcycle) — 6 modelos vendidos no Brasil (2006–2010)
// Modelos: FY250, FY150-3, FY125-19, FY100-10A, FY150T-18, FY125EY-2
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

// ─── FY250 (2006–2009) ────────────────────────────────────────────────────────
const FY250_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Manual da SYM Wolf 250 é idêntico ao da FYM FY250',
    body: 'O FY250 é baseado na plataforma SYM Wolf 250 / Sachs 250. O manual de serviço da SYM 250 pode ser baixado gratuitamente online e serve para todas as revisões — especificações de torque, folga de válvulas e ajustes são idênticos.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA ou CR7HSA — R$15–25',
    body: 'Vela original equivalente: NGK C7HSA (R$15–20) ou CR7HSA com resistor (recomendada — evita interferência no painel digital). Abertura: 0,6–0,7 mm. Troca a cada 6.000 km. Apertar com torque de 12–14 N.m.',
  },
  {
    severity: 'OK',
    title: 'Óleo 15W-40 API SH — 1,3 L por troca',
    body: 'Especificado no manual: 15W-40 API SH/SJ. Em clima muito quente (acima de 35°C), muitos donos usam 20W-50 com boa experiência. Quantidade: 1,3 L por troca. Marcas nacionais (Lubrax, Shell, Mobil) funcionam bem.',
  },
  {
    severity: 'OK',
    title: 'Upgrade de corrente: kit VAZ 520H é mais resistente que a 428 original',
    body: 'A corrente 428 original desgasta rápido. Kit relação VAZ 520H × 110 elos (pinhão 14T, coroa 30T) — R$90–150 — é significativamente mais durável. O upgrade exige abertura do pinhão de saída da caixa, mas vale o investimento para uso frequente.',
  },
  {
    severity: 'WARN',
    title: 'ATENÇÃO: bateria com polaridade INVERTIDA em relação ao padrão Honda',
    body: 'A FYM FY250 tem o polo positivo e negativo da bateria na posição OPOSTA ao padrão Honda CG/Twister. Antes de trocar a bateria, CONFIRME a polaridade do chicote. Usar Yuasa YB7-A ou Ajax AJ 9 TX BS com adaptação do chicote para não inverter.',
  },
  {
    severity: 'OK',
    title: 'Cabos compatíveis com Honda Twister 250 e Suzuki Intruder 125',
    body: 'Cabo de embreagem: Honda Twister 250 (adaptar ~1 cm na ponta). Cabo do acelerador: Honda Twister 250. Cabo do velocímetro: Suzuki Intruder 125 com pequena adaptação. Disponíveis em qualquer distribuidora de peças Honda.',
  },
  {
    severity: 'OK',
    title: 'Peças elétricas compatíveis com Honda CG 150 e Yes 125',
    body: 'Relé de pisca: Honda CG 150 ou Twister. Farol com bocal: Honda CG 150. Lanterna traseira: Honda Yes 125. Chave de pisca: Honda CG (circuito compatível). CDI: genérico 125–150cc chinês (R$40–80) — levar o original para comparar conector.',
  },
  {
    severity: 'OK',
    title: 'Pastilha de freio: Suzuki Savage ou Traxx são compatíveis',
    body: 'Pastilha do freio dianteiro disco: Suzuki Savage, Traxx ou Shineray são compatíveis por medida. Ao perguntar na loja, dizer "pastilha 250cc moto chinesa custom" e pedir para verificar pelo diâmetro do pistão da pinça.',
  },
  {
    severity: 'OK',
    title: 'Pré-aquecimento de 2–3 minutos é obrigatório antes de sair',
    body: 'O motor da FY250 é sensível à carga com frio. Aguardar 2–3 minutos com motor em marcha lenta antes de sair. Não puxar rotação antes de a temperatura estabilizar — desgaste prematuro dos segmentos.',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: tela interna sem cartucho externo — limpar a cada 3.000 km',
    body: 'O FY250 usa filtro de ar de tela interna, sem cartucho substituível. Limpar com ar comprimido a cada 3.000 km. Lavar com água e sabão neutro a cada 6.000 km, secando completamente antes de reinstalar.',
  },
  {
    severity: 'OK',
    title: 'Pneus: 130/90-15 traseiro compatível com Yamaha Virago 250',
    body: 'Pneu traseiro 130/90-15: tamanho compatível com Yamaha Virago 250 — buscar nessas lojas se não encontrar em distribuidoras comuns. Dianteiro 110/90-16: procurar em lojas especializadas em motos custom clássicas.',
  },
]

const FY250_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'PERIGO: chicote elétrico curto — curto ao virar o guidão completamente',
    body: 'Defeito de fábrica: ao virar o guidão completamente, o chicote estica e pode causar curto no farol ou setas. Verificar folga do chicote LOGO APÓS A COMPRA. Reposicionar e prender com abraçadeira em posição com folga suficiente para toda a amplitude do guidão.',
  },
  {
    severity: 'DANGER',
    title: 'Trinca no chassi relatada após ~30.000 km',
    body: 'Vários donos relataram trinca nos tubos do quadro na região do motor após 29.000–30.000 km. Sintomas: vibração incomum ou "click" ao acelerar. Ao notar qualquer desses sintomas, levar imediatamente a um mecânico para inspeção do chassi antes de continuar usando.',
  },
  {
    severity: 'DANGER',
    title: 'FYM fechou no Brasil em 2010 — peças originais indisponíveis',
    body: 'A FYM encerrou operações no Brasil em 2010. Peças originais praticamente não existem mais. Motolab (São Caetano do Sul/SP) e SF Motos são referências para peças compatíveis. Compatibilidade com SYM Wolf 250 e Honda CG/Twister é o caminho para manutenção.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão dianteira: bengalas batem no fim do curso em buracos',
    body: 'Design com excursão limitada — bengalas batem no fim do curso em buracos fundos. Solução: adicionar buchas internas de amortecimento (espuma de alta densidade cortada no tamanho). Evitar velocidade alta em piso irregular.',
  },
  {
    severity: 'WARN',
    title: 'Escapamento vibra por falta de amortecimento no suporte',
    body: 'Suporte do escapamento sem borracha de amortecimento causa vibração e pode afrouxar a conexão com o motor. Inserir buchas de borracha entre o suporte e o cano. Reapertar parafusos do escapamento a cada 3.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Pisca-pisca (setas) se soltam e quebram com facilidade',
    body: 'Parafusos dos pisca-pisca de baixa qualidade afrouxam com vibração. Substituir por parafusos M6 de aço inox com trava rosca. Verificar e reapertar a cada revisão.',
  },
]

const FY250_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'FY250', yearFrom: 2006, yearTo: 2009, component: 'Troca de óleo — 1ª (rodagem)', intervalKm: 300, intervalMonths: null, notes: 'Primeira troca para remover partículas metálicas de rodagem. Óleo 15W-40 API SH, 1,3 L.', priority: 'CRITICAL', order: 1 },
  { modelName: 'FY250', yearFrom: 2006, yearTo: 2009, component: 'Troca de óleo — 2ª (rodagem)', intervalKm: 600, intervalMonths: null, notes: 'Encerra protocolo de rodagem. Verificar chicote elétrico nessa oportunidade.', priority: 'HIGH', order: 2 },
  { modelName: 'FY250', yearFrom: 2006, yearTo: 2009, component: 'Troca de óleo do motor', intervalKm: 1000, intervalMonths: 6, notes: 'Óleo 15W-40 (ou 20W-50 em clima quente), 1,3 L. Limpar tela do filtro centrífugo a cada troca.', priority: 'HIGH', order: 3 },
  { modelName: 'FY250', yearFrom: 2006, yearTo: 2009, component: 'Tensão e lubrificação da corrente', intervalKm: 500, intervalMonths: null, notes: 'Folga ideal 20–30 mm. Lubrificar com spray de corrente. Corrente 428 original ou 520H (upgrade VAZ).', priority: 'MEDIUM', order: 4 },
  { modelName: 'FY250', yearFrom: 2006, yearTo: 2009, component: 'Limpeza do filtro de ar', intervalKm: 3000, intervalMonths: null, notes: 'Limpar com ar comprimido. Em região com pó, reduzir para 1.500 km.', priority: 'MEDIUM', order: 5 },
  { modelName: 'FY250', yearFrom: 2006, yearTo: 2009, component: 'Inspeção da vela de ignição', intervalKm: 3000, intervalMonths: null, notes: 'NGK C7HSA ou CR7HSA. Abertura 0,6–0,7 mm.', priority: 'MEDIUM', order: 6 },
  { modelName: 'FY250', yearFrom: 2006, yearTo: 2009, component: 'Inspeção dos freios', intervalKm: 3000, intervalMonths: null, notes: 'Pastilha dianteira (compatível Suzuki Savage). Sapata traseira (tambor). Fluido de freio: nível.', priority: 'HIGH', order: 7 },
  { modelName: 'FY250', yearFrom: 2006, yearTo: 2009, component: 'Reaperto do escapamento', intervalKm: 3000, intervalMonths: null, notes: 'Reapertar suporte e conexões do escapamento. Inserir borrachas no suporte se vibrar.', priority: 'LOW', order: 8 },
  { modelName: 'FY250', yearFrom: 2006, yearTo: 2009, component: 'Substituição da vela de ignição', intervalKm: 6000, intervalMonths: null, notes: 'NGK C7HSA ou CR7HSA (R$15–25). Torque 12–14 N.m.', priority: 'HIGH', order: 9 },
  { modelName: 'FY250', yearFrom: 2006, yearTo: 2009, component: 'Lavagem do filtro de ar', intervalKm: 6000, intervalMonths: null, notes: 'Lavar com água e sabão neutro, secar completamente antes de reinstalar.', priority: 'MEDIUM', order: 10 },
  { modelName: 'FY250', yearFrom: 2006, yearTo: 2009, component: 'Regulagem das válvulas', intervalKm: 6000, intervalMonths: null, notes: 'Admissão 0,10 mm / escapamento 0,15 mm (motor frio). Seguir manual SYM 250.', priority: 'HIGH', order: 11 },
  { modelName: 'FY250', yearFrom: 2006, yearTo: 2009, component: 'Inspeção do chassi (trincas)', intervalKm: 10000, intervalMonths: null, notes: 'Verificar trincas nos tubos do quadro — problema relatado após 30.000 km.', priority: 'HIGH', order: 12 },
  { modelName: 'FY250', yearFrom: 2006, yearTo: 2009, component: 'Troca do fluido de freio', intervalKm: 12000, intervalMonths: 24, notes: 'DOT 4 no freio dianteiro hidráulico. Sangrar o sistema para eliminar bolhas.', priority: 'MEDIUM', order: 13 },
  { modelName: 'FY250', yearFrom: 2006, yearTo: 2009, component: 'Troca da corrente e relação', intervalKm: 15000, intervalMonths: null, notes: 'Trocar corrente, pinhão e coroa juntos. Kit VAZ 520H (upgrade recomendado) ou 428 original.', priority: 'HIGH', order: 14 },
]

// ─── FY150-3 (2006–2008) ─────────────────────────────────────────────────────
const FY150_3_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor clone Honda CG 150 — qualquer mecânico Honda atende sem manual específico',
    body: 'O FY150-3 usa motor 149cc OHV derivado da plataforma Honda CG. Mecânicos especializados em Honda CG 125/150 conseguem fazer toda a manutenção. Folgas de válvulas, regulagem de carburador e ajustes são idênticos à CG da mesma época.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C6HSA — R$12–20 em qualquer loja',
    body: 'Vela padrão: NGK C6HSA (R$12–18) ou CR6HSA com resistor. Champion equivalente: N9YC. Abertura 0,6–0,7 mm. Troca a cada 6.000 km. Disponível em todas as distribuidoras de peças para motos.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 API SL — 1,0 L por troca a cada 3.000 km',
    body: 'Motor 150cc menos exigido que o FY250. Óleo 10W-40 API SL, ~1,0 L. Qualquer marca nacional (Lubrax, Mobil, Shell) funciona sem restrição. Troca a cada 3.000 km.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428 — pinhão 15T compatível com Honda Pop 100 (VAZ)',
    body: 'Corrente tamanho 428. Pinhão 15 dentes disponível como "Pinhão 15T Honda Pop 100 / FYM 125/150" da VAZ — ainda encontrado em distribuidores nacionais. Coroa: ~40–42T (verificar catálogo VAZ ao comprar).',
  },
  {
    severity: 'OK',
    title: 'Cabos e peças elétricas compatíveis com Honda CG e Yamaha Yes 125',
    body: 'Cabo de embreagem: Honda CG 125/150 ou Yamaha Yes 125. Cabo do acelerador: Honda Biz 125 (adaptar ponta). Relé de pisca: Honda CG 150. Pastilha de freio dianteiro: compatível Honda CG 150 — verificar diâmetro.',
  },
  {
    severity: 'OK',
    title: 'FY150-3 e FY125-19 compartilham peças de carroceria entre si',
    body: 'Pisca-pisca, câmbio de seta, carenagens laterais e tampas são intercambiáveis entre FY150-3 e FY125-19. Se tiver um modelo e precisar de peça do outro, eles servem.',
  },
  {
    severity: 'OK',
    title: 'Consumo referência: acima de 35 km/L com motor em dia',
    body: 'Motor saudável com carburador calibrado e filtro limpo faz acima de 35 km/L em uso urbano moderado. Se o consumo cair abaixo de 28 km/L, checar carburador (jatos entupidos) e filtro de ar.',
  },
]

const FY150_3_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Peças originais FYM indisponíveis desde 2010 — usar compatíveis Honda CG',
    body: 'A FYM saiu do Brasil em 2010 e peças originais são praticamente inexistentes. A boa notícia: a alta compatibilidade com Honda CG 125/150 cobre a maioria das necessidades. Informe sempre ao mecânico sobre essa compatibilidade antes do diagnóstico.',
  },
  {
    severity: 'WARN',
    title: 'Carburador sujo é a causa mais comum de falha de partida',
    body: 'Antes de qualquer diagnóstico complexo, limpar o carburador: desmontar agulha, jato principal e jato de marcha lenta. Usar limpa-carburador spray (R$15–20). Problema quase sempre resolve com limpeza.',
  },
  {
    severity: 'WARN',
    title: 'Acabamento inferior: borrachas e parafusos oxidam rapidamente',
    body: 'Qualidade de borrachas e parafusos abaixo do padrão Honda. Proteger parafusos expostos com graxa de contato ou cera de parafina. Trocar borrachas de vedação preventivamente antes de rachaduras causarem danos maiores.',
  },
  {
    severity: 'WARN',
    title: 'CDI com vida útil reduzida — substituto genérico disponível',
    body: 'CDI original pode queimar mais cedo que o esperado. Sintomas: motor não pega ou ignição irregular. CDI genérico para moto chinesa 125cc (R$40–60) é substituto funcional — levar o original para comparar o conector ao comprar.',
  },
]

const FY150_3_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'FY150-3', yearFrom: 2006, yearTo: 2008, component: 'Troca de óleo do motor', intervalKm: 3000, intervalMonths: 6, notes: 'Óleo 10W-40 API SL, ~1,0 L. Padrão Honda CG 150.', priority: 'HIGH', order: 1 },
  { modelName: 'FY150-3', yearFrom: 2006, yearTo: 2008, component: 'Tensão e lubrificação da corrente', intervalKm: 500, intervalMonths: null, notes: 'Folga 20–30 mm. Corrente 428, pinhão 15T VAZ disponível.', priority: 'MEDIUM', order: 2 },
  { modelName: 'FY150-3', yearFrom: 2006, yearTo: 2008, component: 'Limpeza do filtro de ar', intervalKm: 3000, intervalMonths: null, notes: 'Limpar com ar comprimido. Em região com pó, reduzir para 1.500 km.', priority: 'MEDIUM', order: 3 },
  { modelName: 'FY150-3', yearFrom: 2006, yearTo: 2008, component: 'Inspeção da vela de ignição', intervalKm: 3000, intervalMonths: null, notes: 'NGK C6HSA ou CR6HSA. Abertura 0,6–0,7 mm.', priority: 'MEDIUM', order: 4 },
  { modelName: 'FY150-3', yearFrom: 2006, yearTo: 2008, component: 'Inspeção dos freios', intervalKm: 3000, intervalMonths: null, notes: 'Pastilha dianteiro: compatível Honda CG 150. Sapata traseira: tambor 127 mm.', priority: 'HIGH', order: 5 },
  { modelName: 'FY150-3', yearFrom: 2006, yearTo: 2008, component: 'Substituição da vela de ignição', intervalKm: 6000, intervalMonths: null, notes: 'NGK C6HSA ou CR6HSA (R$12–20).', priority: 'HIGH', order: 6 },
  { modelName: 'FY150-3', yearFrom: 2006, yearTo: 2008, component: 'Regulagem das válvulas', intervalKm: 6000, intervalMonths: null, notes: 'Admissão 0,05–0,10 mm / escapamento 0,10–0,15 mm (motor frio). Mecânico Honda executa normalmente.', priority: 'HIGH', order: 7 },
  { modelName: 'FY150-3', yearFrom: 2006, yearTo: 2008, component: 'Limpeza do carburador', intervalKm: 6000, intervalMonths: null, notes: 'Limpar jatos, agulha e corpo. Usar limpa-carburador spray (R$15–20).', priority: 'MEDIUM', order: 8 },
  { modelName: 'FY150-3', yearFrom: 2006, yearTo: 2008, component: 'Troca do fluido de freio', intervalKm: 12000, intervalMonths: 24, notes: 'DOT 4 no freio dianteiro hidráulico. Sangrar sistema.', priority: 'MEDIUM', order: 9 },
  { modelName: 'FY150-3', yearFrom: 2006, yearTo: 2008, component: 'Troca da corrente e relação', intervalKm: 15000, intervalMonths: null, notes: 'Corrente 428, pinhão 15T, coroa ~40–42T. Kit disponível em distribuidores Honda.', priority: 'HIGH', order: 10 },
]

// ─── FY125-19 (2006–2008) ────────────────────────────────────────────────────
const FY125_19_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor próximo à Suzuki Yes 125 — mecânicos Suzuki atendem sem dificuldade',
    body: 'A arquitetura do motor FY125-19 é muito semelhante à Suzuki Yes 125. Mecânicos que conhecem a Yes 125 conseguem executar toda a manutenção sem manual específico da FYM. Uma boa dica para encontrar profissional qualificado.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C5HSA ou C6HSA — R$10–18',
    body: 'Vela padrão NGK C5HSA ou C6HSA. Champion equivalente: N9YC. Abertura 0,6–0,7 mm. Troca a cada 6.000 km. Disponível em todas as distribuidoras nacionais.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 API SL — 0,9 L por troca a cada 3.000 km',
    body: 'Motor 125cc com baixo desgaste em manutenção rigorosa. Óleo 10W-40, ~0,9 L, qualquer marca nacional. Trocas em dia prolongam significativamente a vida do motor.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428 — pinhão 15T compatível com Honda Pop 100',
    body: 'Corrente 428. Pinhão 15T disponível como "pinhão Honda Pop 100 / FYM 125/150" na VAZ. Coroa estimada 41–43T — confirmar medida ao comprar kit completo.',
  },
  {
    severity: 'OK',
    title: 'FY125-19 e FY150-3 compartilham peças de carroceria entre si',
    body: 'Pisca-pisca, câmbio de seta e carenagens são intercambiáveis entre FY125-19 e FY150-3. Se precisar de uma peça de carroceria, verificar em ambos os modelos.',
  },
  {
    severity: 'OK',
    title: 'Consumo referência: acima de 38 km/L com motor saudável',
    body: 'Motor 125cc faz acima de 38 km/L em uso misto com manutenção em dia. Se consumo cair abaixo de 30 km/L, investigar carburador, filtro de ar e vela.',
  },
]

const FY125_19_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Peças originais FYM indisponíveis — compatíveis Honda CG 125 e Yes 125',
    body: 'FYM saiu do Brasil em 2010. Usar compatíveis Honda CG 125 e Yamaha Yes 125 cobre a maioria das necessidades. Informar ao mecânico sobre essa compatibilidade para facilitar o diagnóstico e a busca de peças.',
  },
  {
    severity: 'WARN',
    title: 'Carburador com calibração de fábrica abaixo do ideal — vale recalibrar',
    body: 'Carburador original tem jatos de calibração levemente fora do ideal, causando consumo irregular e leve perda de desempenho. Recalibrar o carburador (agulha e jato principal) com mecânico experiente melhora consumo e resposta ao acelerador.',
  },
  {
    severity: 'WARN',
    title: 'Acabamento de baixa qualidade: parafusos oxidam e borrachas endurecem cedo',
    body: 'Parafusos expostos oxidam rápido. Aplicar graxa de contato nos parafusos e silicone spray nas borrachas de vedação. Trocar borrachas preventivamente para evitar infiltrações no motor.',
  },
]

const FY125_19_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'FY125-19', yearFrom: 2006, yearTo: 2008, component: 'Troca de óleo do motor', intervalKm: 3000, intervalMonths: 6, notes: 'Óleo 10W-40 API SL, ~0,9 L. Padrão Honda CG 125.', priority: 'HIGH', order: 1 },
  { modelName: 'FY125-19', yearFrom: 2006, yearTo: 2008, component: 'Tensão e lubrificação da corrente', intervalKm: 500, intervalMonths: null, notes: 'Folga 20–30 mm. Corrente 428, pinhão 15T (compatível Honda Pop 100).', priority: 'MEDIUM', order: 2 },
  { modelName: 'FY125-19', yearFrom: 2006, yearTo: 2008, component: 'Limpeza do filtro de ar', intervalKm: 3000, intervalMonths: null, notes: 'Limpar com ar comprimido. Substituir se danificado.', priority: 'MEDIUM', order: 3 },
  { modelName: 'FY125-19', yearFrom: 2006, yearTo: 2008, component: 'Inspeção da vela de ignição', intervalKm: 3000, intervalMonths: null, notes: 'NGK C5HSA ou C6HSA. Abertura 0,6–0,7 mm.', priority: 'MEDIUM', order: 4 },
  { modelName: 'FY125-19', yearFrom: 2006, yearTo: 2008, component: 'Inspeção dos freios', intervalKm: 3000, intervalMonths: null, notes: 'Pastilha dianteiro (disco) e sapata traseira (tambor). Compatível Honda CG 125.', priority: 'HIGH', order: 5 },
  { modelName: 'FY125-19', yearFrom: 2006, yearTo: 2008, component: 'Substituição da vela de ignição', intervalKm: 6000, intervalMonths: null, notes: 'NGK C5HSA ou C6HSA (R$10–18).', priority: 'HIGH', order: 6 },
  { modelName: 'FY125-19', yearFrom: 2006, yearTo: 2008, component: 'Regulagem das válvulas', intervalKm: 6000, intervalMonths: null, notes: 'Admissão 0,05 mm / escapamento 0,10 mm (motor frio). Mecânico Honda/Suzuki executa normalmente.', priority: 'HIGH', order: 7 },
  { modelName: 'FY125-19', yearFrom: 2006, yearTo: 2008, component: 'Limpeza e calibração do carburador', intervalKm: 6000, intervalMonths: null, notes: 'Limpar jatos e calibrar agulha — melhora consumo e desempenho.', priority: 'MEDIUM', order: 8 },
  { modelName: 'FY125-19', yearFrom: 2006, yearTo: 2008, component: 'Troca do fluido de freio', intervalKm: 12000, intervalMonths: 24, notes: 'DOT 4 no freio dianteiro hidráulico.', priority: 'MEDIUM', order: 9 },
  { modelName: 'FY125-19', yearFrom: 2006, yearTo: 2008, component: 'Troca da corrente e relação', intervalKm: 15000, intervalMonths: null, notes: 'Corrente 428, pinhão 15T, coroa ~41–43T. Kit disponível em distribuidores Honda.', priority: 'HIGH', order: 10 },
]

// ─── FY100-10A (2006–2009) ───────────────────────────────────────────────────
const FY100_10A_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 97cc tipo "cub" semi-automático — peças compatíveis Honda Pop 100 e Shineray',
    body: 'Motor underbone semi-automático (câmbio de 4 marchas sem embreagem manual). Alta padronização entre motores 100cc chineses: peças compatíveis com Honda C100, Honda Pop 100 e Shineray 100 disponíveis em distribuidoras nacionais.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK B6HS — padrão universal para 100cc refrigerados a ar',
    body: 'Vela NGK B6HS (R$8–15) ou Champion N7YC. Troca simples e barata a cada 5.000–6.000 km. Disponível em qualquer loja de peças para motos.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-30 ou 10W-40 — 0,7 L a cada 3.000 km',
    body: 'Motor pequeno e econômico. Óleo 10W-30 ou 10W-40, ~0,7 L. Qualquer marca nacional. Custo de manutenção muito baixo.',
  },
  {
    severity: 'OK',
    title: 'Consumo acima de 40 km/L — ideal para entrega e uso urbano intenso',
    body: 'Com manutenção em dia, o FY100-10A faz acima de 40 km/L. Excelente custo-benefício para uso urbano intenso e entregas. Motor compacto e leve (abaixo de 100 kg).',
  },
  {
    severity: 'OK',
    title: 'Câmbio semi-automático: pequena adaptação para quem vem de manual completo',
    body: 'O câmbio de pedal sem alavanca de embreagem manual pode confundir piloto acostumado com manual completo. Há uma curta fase de adaptação — não ativar a embreagem com a mão (não há), apenas usar o pedal de marchas normalmente.',
  },
]

const FY100_10A_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Peças originais FYM inexistentes — usar compatíveis Honda Pop 100 e Shineray 100',
    body: 'FYM saiu do Brasil em 2010. Motores 100cc chineses são altamente padronizados: peças da Honda Pop 100 e Shineray 100 cobrem a maioria das necessidades. Mencionar "motor 100cc chinês cub" ao mecânico para facilitar a busca.',
  },
  {
    severity: 'WARN',
    title: 'Plásticos fragilizam rapidamente com exposição prolongada ao sol',
    body: 'Acabamento plástico de baixa qualidade resseca e racha com sol intenso. Proteger com capa de moto quando parada ao sol por longos períodos. Aplicar protetor solar para plásticos (Armor All ou similar) nas carenagens.',
  },
]

const FY100_10A_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'FY100-10A', yearFrom: 2006, yearTo: 2009, component: 'Troca de óleo do motor', intervalKm: 3000, intervalMonths: 6, notes: 'Óleo 10W-30 ou 10W-40, ~0,7 L. Motor pequeno e econômico.', priority: 'HIGH', order: 1 },
  { modelName: 'FY100-10A', yearFrom: 2006, yearTo: 2009, component: 'Tensão e lubrificação da corrente', intervalKm: 500, intervalMonths: null, notes: 'Corrente 420 ou 428 (confirmar tamanho na moto). Folga 20–25 mm.', priority: 'MEDIUM', order: 2 },
  { modelName: 'FY100-10A', yearFrom: 2006, yearTo: 2009, component: 'Limpeza do filtro de ar', intervalKm: 3000, intervalMonths: null, notes: 'Filtro de espuma ou tela — limpar com ar comprimido ou lavar com sabão neutro.', priority: 'MEDIUM', order: 3 },
  { modelName: 'FY100-10A', yearFrom: 2006, yearTo: 2009, component: 'Inspeção da vela de ignição', intervalKm: 3000, intervalMonths: null, notes: 'NGK B6HS. Abertura 0,6–0,7 mm.', priority: 'MEDIUM', order: 4 },
  { modelName: 'FY100-10A', yearFrom: 2006, yearTo: 2009, component: 'Inspeção dos freios (tambor D e T)', intervalKm: 3000, intervalMonths: null, notes: 'Tambor dianteiro e traseiro — verificar folga e espessura das sapatas.', priority: 'HIGH', order: 5 },
  { modelName: 'FY100-10A', yearFrom: 2006, yearTo: 2009, component: 'Substituição da vela de ignição', intervalKm: 6000, intervalMonths: null, notes: 'NGK B6HS (R$8–15). Troca simples e barata.', priority: 'HIGH', order: 6 },
  { modelName: 'FY100-10A', yearFrom: 2006, yearTo: 2009, component: 'Troca da corrente e relação', intervalKm: 15000, intervalMonths: null, notes: 'Corrente 420 ou 428. Verificar desgaste das rodas dentadas junto.', priority: 'HIGH', order: 7 },
]

// ─── FY150T-18 (2007–2008) ───────────────────────────────────────────────────
const FY150T_18_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Scooter CVT — correia e roletes GY6 150cc são a chave da manutenção',
    body: 'Transmissão variável automática (CVT) — sem kit de relação convencional. Correia e roletes do variador são os componentes críticos. Peças GY6 150cc amplamente disponíveis no mercado de motos chinesas (Shineray, Traxx, BIZ 150 similares).',
  },
  {
    severity: 'WARN',
    title: 'Correia CVT GY6 150cc: inspecionar a cada 10.000 km, trocar a cada 20.000 km',
    body: 'Correia CVT GY6 150cc (R$50–120 em lojas de peças chinesas). Correia desgastada causa escorregamento na saída da parada e queda de velocidade máxima. Trocar preventivamente a cada 20.000 km ou ao notar rotação alta sem aceleração proporcional.',
  },
  {
    severity: 'WARN',
    title: 'Roletes do variador: achatamento causa arrancada lenta e consumo alto',
    body: 'Roletes GY6 150cc (~13–16 g por unidade). Roletes achatados fazem o scooter demorar para sair da parada e aumentam o consumo. Abrir a tampa do variador e inspecionar visualmente. Kit de roletes: R$30–60 em lojas de peças chinesas.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR6HSA com resistor — padrão scooters 150cc',
    body: 'Vela NGK CR6HSA (com resistor, R$15–25). Padrão para scooters com sistema de ignição eletrônica. Abertura 0,6–0,7 mm. Troca a cada 6.000 km.',
  },
  {
    severity: 'OK',
    title: 'Pneus 110/70-12: Pirelli Diablo Scooter e Michelin City Grip disponíveis',
    body: 'Pneus 110/70-12 (dianteiro e traseiro). Pirelli Diablo Scooter e Michelin City Grip estão disponíveis neste tamanho em lojas de pneus urbanos. Calibragem: 28 PSI dianteiro / 30 PSI traseiro.',
  },
  {
    severity: 'OK',
    title: 'Tanque de 7 L — planejar abastecimento mais frequente',
    body: 'Tanque pequeno de 7 L. Com consumo médio de 28–35 km/L, a autonomia é de ~200–245 km. Planejar abastecimento frequente especialmente em viagens, mesmo curtas.',
  },
]

const FY150T_18_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Peças de CVT originais inexistentes — usar GY6 150cc como substituto',
    body: 'Peças originais FYM do CVT (correia, roletes, embreagem centrífuga) indisponíveis. Usar compatíveis GY6 150cc — padrão amplamente distribuído no mercado de peças chinesas. Mencionar "GY6 150cc" ao mecânico para facilitar a busca.',
  },
  {
    severity: 'WARN',
    title: 'Correia CVT desgastada: rotação sobe sem aceleração proporcional',
    body: 'Sintoma claro de correia gasta: motor aumenta rotação mas a velocidade não acompanha (escorregamento). Trocar imediatamente para evitar parada no meio da rua. Correia GY6 150cc R$50–120.',
  },
  {
    severity: 'WARN',
    title: 'Carburador com jato de marcha lenta sensível — limpar regularmente',
    body: 'Dificuldade de partida ou marcha lenta irregular quase sempre é jato de marcha lenta entupido. Limpar com ar comprimido no jato piloto (orifício menor). Não aumentar o jato — apenas limpar.',
  },
]

const FY150T_18_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'FY150T-18', yearFrom: 2007, yearTo: 2008, component: 'Troca de óleo do motor', intervalKm: 2000, intervalMonths: 6, notes: 'Óleo 10W-40, ~0,9 L. CVT exige óleo limpo para não contaminar o variador.', priority: 'HIGH', order: 1 },
  { modelName: 'FY150T-18', yearFrom: 2007, yearTo: 2008, component: 'Limpeza do filtro de ar', intervalKm: 3000, intervalMonths: null, notes: 'Filtro de espuma — limpar com ar comprimido. Filtro sujo aumenta consumo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'FY150T-18', yearFrom: 2007, yearTo: 2008, component: 'Inspeção da vela de ignição', intervalKm: 3000, intervalMonths: null, notes: 'NGK CR6HSA. Abertura 0,6–0,7 mm.', priority: 'MEDIUM', order: 3 },
  { modelName: 'FY150T-18', yearFrom: 2007, yearTo: 2008, component: 'Inspeção dos freios', intervalKm: 3000, intervalMonths: null, notes: 'Pastilha disco dianteiro e sapata tambor traseiro. Verificar nível do fluido.', priority: 'HIGH', order: 4 },
  { modelName: 'FY150T-18', yearFrom: 2007, yearTo: 2008, component: 'Substituição da vela de ignição', intervalKm: 6000, intervalMonths: null, notes: 'NGK CR6HSA (R$15–25). Com resistor — padrão scooter.', priority: 'HIGH', order: 5 },
  { modelName: 'FY150T-18', yearFrom: 2007, yearTo: 2008, component: 'Inspeção da correia CVT e roletes', intervalKm: 10000, intervalMonths: null, notes: 'Abrir tampa do variador. Verificar correia (desgaste, rachaduras) e roletes (achatamento). Compatível GY6 150cc.', priority: 'HIGH', order: 6 },
  { modelName: 'FY150T-18', yearFrom: 2007, yearTo: 2008, component: 'Troca do fluido de freio', intervalKm: 12000, intervalMonths: 24, notes: 'DOT 4 no freio dianteiro hidráulico. Sangrar o sistema.', priority: 'MEDIUM', order: 7 },
  { modelName: 'FY150T-18', yearFrom: 2007, yearTo: 2008, component: 'Troca dos roletes do variador CVT', intervalKm: 20000, intervalMonths: null, notes: 'Roletes GY6 150cc (~13–16 g). Kit R$30–60 em lojas de peças chinesas.', priority: 'HIGH', order: 8 },
  { modelName: 'FY150T-18', yearFrom: 2007, yearTo: 2008, component: 'Troca da correia CVT', intervalKm: 20000, intervalMonths: null, notes: 'Correia GY6 150cc (R$50–120). Trocar ao notar escorregamento ou preventivamente.', priority: 'HIGH', order: 9 },
]

// ─── FY125EY-2 (2006–2008) ───────────────────────────────────────────────────
const FY125EY_2_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 125cc OHV 4t compatível com Honda XR 125 e CG 125 off-road',
    body: 'Motor monocilíndrico 125cc 4 tempos OHV refrigerado a ar. Compatibilidade com Honda XR 125 e CG 125 para a maioria das peças internas. Mencionar "125cc OHV chinês 4t" ao mecânico de cross para facilitar atendimento.',
  },
  {
    severity: 'WARN',
    title: 'Filtro de ar: limpar SEMPRE após uso em terra, lama ou chuva',
    body: 'Motor 4t em ambientes com poeira ou areia desgasta rapidamente com filtro sujo. Após CADA uso em condições de terra ou chuva, limpar o filtro de ar imediatamente — independente da quilometragem. Não postergar.',
  },
  {
    severity: 'WARN',
    title: 'Corrente 428: lubrificar a cada 200–300 km em uso off-road',
    body: 'Em uso off-road, lama e areia desgastam a corrente muito mais rápido. Lubrificar a cada 200–300 km (ao invés dos 500 km de uso na rua). Usar lubrificante de corrente com proteção a água. Corrente 428.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 a cada 1.500 km em uso off-road intenso',
    body: 'Em uso off-road (aceleração e desaceleração brusca, altos RPMs), reduzir intervalo de troca de óleo de 3.000 km para 1.500 km. Motor trabalha mais nessas condições e o óleo se degrada mais rápido. Quantidade: ~0,9 L.',
  },
  {
    severity: 'OK',
    title: 'Reapertar TODOS os parafusos a cada 1.000 km — vibração off-road afrouxa tudo',
    body: 'Vibração intensa em terreno acidentado afrouxa parafusos do chassi, motor, escapamento e suportes rapidamente. Verificar e reapertar tudo a cada 1.000 km em uso off-road. Usar trava rosca nos parafusos de suporte do motor.',
  },
  {
    severity: 'OK',
    title: 'Freios: limpar lama após uso off-road para manter eficiência',
    body: 'Sapatas e pastilhas acumulam lama e perdem eficiência em uso fora de estrada. Após cada uso em barro ou água, remover a roda e limpar os freios antes de guardar a moto. Manter a eficiência dos freios é crítico para segurança.',
  },
]

const FY125EY_2_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Peças originais FYM inexistentes — usar compatíveis Honda XR 125 ou CG 125',
    body: 'FYM saiu do Brasil em 2010. Para o FY125EY-2, usar compatíveis Honda XR 125 ou CG 125. Em lojas de peças para motos cross, dizer "125cc OHV chinês 4t enduro" para facilitar a busca de peças internas.',
  },
  {
    severity: 'WARN',
    title: 'Parafusos do chassi afrouxam rapidamente em uso off-road',
    body: 'Uso intenso fora de estrada afrouxa parafusos do chassi, fixações do motor e suportes. Inspecionar e reapertar a cada 1.000 km — risco de perda de peças em pista.',
  },
]

const FY125EY_2_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'FY125EY-2', yearFrom: 2006, yearTo: 2008, component: 'Limpeza do filtro de ar (pós uso off-road)', intervalKm: 300, intervalMonths: null, notes: 'Limpar SEMPRE após uso em terra, areia ou chuva. Motor 4t degrada rápido com filtro sujo em poeira.', priority: 'CRITICAL', order: 1 },
  { modelName: 'FY125EY-2', yearFrom: 2006, yearTo: 2008, component: 'Tensão e lubrificação da corrente (off-road)', intervalKm: 300, intervalMonths: null, notes: 'Lubrificar a cada 200–300 km em uso off-road. Corrente 428. Usar lubrificante com proteção a água.', priority: 'HIGH', order: 2 },
  { modelName: 'FY125EY-2', yearFrom: 2006, yearTo: 2008, component: 'Troca de óleo do motor', intervalKm: 1500, intervalMonths: null, notes: 'Óleo 10W-40, ~0,9 L. Em uso off-road intenso, trocar a cada 1.500 km ao invés de 3.000 km.', priority: 'HIGH', order: 3 },
  { modelName: 'FY125EY-2', yearFrom: 2006, yearTo: 2008, component: 'Reaperto geral de parafusos', intervalKm: 1000, intervalMonths: null, notes: 'Verificar e reapertar parafusos do chassi, motor, escapamento e suportes. Vibração off-road afrouxa tudo.', priority: 'HIGH', order: 4 },
  { modelName: 'FY125EY-2', yearFrom: 2006, yearTo: 2008, component: 'Inspeção e limpeza dos freios', intervalKm: 1000, intervalMonths: null, notes: 'Limpar lama das sapatas/pastilhas após uso off-road. Verificar eficiência de frenagem.', priority: 'HIGH', order: 5 },
  { modelName: 'FY125EY-2', yearFrom: 2006, yearTo: 2008, component: 'Inspeção da vela de ignição', intervalKm: 2000, intervalMonths: null, notes: 'NGK C5HSA ou C6HSA. Em uso off-road, inspecionar com mais frequência.', priority: 'MEDIUM', order: 6 },
  { modelName: 'FY125EY-2', yearFrom: 2006, yearTo: 2008, component: 'Substituição da vela de ignição', intervalKm: 5000, intervalMonths: null, notes: 'NGK C5HSA ou C6HSA (R$10–18). Trocar a cada 5.000 km em uso off-road.', priority: 'HIGH', order: 7 },
  { modelName: 'FY125EY-2', yearFrom: 2006, yearTo: 2008, component: 'Regulagem das válvulas', intervalKm: 5000, intervalMonths: null, notes: 'Admissão 0,05 mm / escapamento 0,10 mm (motor frio). Mecânico Honda XR executa normalmente.', priority: 'HIGH', order: 8 },
  { modelName: 'FY125EY-2', yearFrom: 2006, yearTo: 2008, component: 'Troca da corrente e relação', intervalKm: 10000, intervalMonths: null, notes: 'Corrente 428 + pinhão + coroa. Desgaste mais rápido em off-road — inspecionar visualmente a cada 5.000 km.', priority: 'HIGH', order: 9 },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────
const BLOCKS = [
  { modelName: 'FY250',     yearFrom: 2006, yearTo: 2009, MACETES: FY250_MACETES,     PROBLEMAS: FY250_PROBLEMAS     },
  { modelName: 'FY150-3',   yearFrom: 2006, yearTo: 2008, MACETES: FY150_3_MACETES,   PROBLEMAS: FY150_3_PROBLEMAS   },
  { modelName: 'FY125-19',  yearFrom: 2006, yearTo: 2008, MACETES: FY125_19_MACETES,  PROBLEMAS: FY125_19_PROBLEMAS  },
  { modelName: 'FY100-10A', yearFrom: 2006, yearTo: 2009, MACETES: FY100_10A_MACETES, PROBLEMAS: FY100_10A_PROBLEMAS },
  { modelName: 'FY150T-18', yearFrom: 2007, yearTo: 2008, MACETES: FY150T_18_MACETES, PROBLEMAS: FY150T_18_PROBLEMAS },
  { modelName: 'FY125EY-2', yearFrom: 2006, yearTo: 2008, MACETES: FY125EY_2_MACETES, PROBLEMAS: FY125EY_2_PROBLEMAS },
]

// ─── CALIBRAGENS ──────────────────────────────────────────────────────────────
const TIRE_PRESSURES = [
  {
    modelName: 'FY250', yearFrom: 2006, yearTo: 2009,
    tireSize: '110/90-16 (F) · 130/90-15 (R)',
    frontPsi: 32, rearPsi: 36, frontPsiLoad: 33, rearPsiLoad: 40,
    notes: 'Custom 250cc. Traseiro 130/90-15 compatível com Yamaha Virago 250. Dianteiro 110/90-16 em lojas de custom clássicas. Atenção: rodas raiadas — verificar estado dos arames antes de trocar o pneu.',
  },
  {
    modelName: 'FY150-3', yearFrom: 2006, yearTo: 2008,
    tireSize: '2.75-18 / 80/90-18 (F) · 110/90-16 (R)',
    frontPsi: 29, rearPsi: 32, frontPsiLoad: 30, rearPsiLoad: 36,
    notes: 'Street naked 150cc. Rodas raiadas aro 18 (dianteiro) e 16 (traseiro). Padrão similar Honda CG 150 — buscar em lojas Honda.',
  },
  {
    modelName: 'FY125-19', yearFrom: 2006, yearTo: 2008,
    tireSize: '2.75-18 / 80/90-18 (F) · 110/90-16 (R)',
    frontPsi: 29, rearPsi: 32, frontPsiLoad: 30, rearPsiLoad: 36,
    notes: 'Street 125cc. Rodas em liga leve. Mesmas medidas do FY150-3 — peças de pneu intercambiáveis entre os dois modelos.',
  },
  {
    modelName: 'FY100-10A', yearFrom: 2006, yearTo: 2009,
    tireSize: '60/90-17 (F) · 80/90-17 (R)',
    frontPsi: 26, rearPsi: 29, frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Underbone/cub 100cc. Rodas aro 17 com pneus estreitos. Padrão Honda C100/Pop 100 — fácil de encontrar e barato.',
  },
  {
    modelName: 'FY150T-18', yearFrom: 2007, yearTo: 2008,
    tireSize: '110/70-12 (F) · 110/70-12 (R)',
    frontPsi: 28, rearPsi: 30, frontPsiLoad: 29, rearPsiLoad: 34,
    notes: 'Scooter 150cc CVT. Rodas de liga leve aro 12. Pirelli Diablo Scooter e Michelin City Grip disponíveis em 110/70-12.',
  },
  {
    modelName: 'FY125EY-2', yearFrom: 2006, yearTo: 2008,
    tireSize: '2.75-17 (F) · 3.00-17 (R)',
    frontPsi: 24, rearPsi: 27, frontPsiLoad: 25, rearPsiLoad: 31,
    notes: 'Cross/enduro 125cc. Pneus todo-terreno aro 17. Calibragem menor que motos de rua para melhor aderência em off-road.',
  },
]

// ─── MANUTENÇÃO FLAT ──────────────────────────────────────────────────────────
const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  ...FY250_MANUTENCAO,
  ...FY150_3_MANUTENCAO,
  ...FY125_19_MANUTENCAO,
  ...FY100_10A_MANUTENCAO,
  ...FY150T_18_MANUTENCAO,
  ...FY125EY_2_MANUTENCAO,
]

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🏍️  Seed FYM iniciado...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })

  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'FYM', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'FYM', vehicleTypeId: motoType.id },
  })

  for (const block of BLOCKS) {
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

  console.log('\n✅ FYM seed concluído!')
  console.log(`   ${BLOCKS.length} modelos`)
  console.log(`   ${BLOCKS.reduce((a, b) => a + b.MACETES.length + b.PROBLEMAS.length, 0)} tips (MACETES + PROBLEMAS)`)
  console.log(`   ${TIRE_PRESSURES.length} calibragens`)
  console.log(`   ${MAINTENANCE_ITEMS.length} itens de manutenção`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
