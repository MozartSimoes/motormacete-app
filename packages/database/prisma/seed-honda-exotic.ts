// seed-honda-exotic.ts — Honda modelos exóticos/raros no Brasil
// VTX 1800 R/S/C (2002+) | VALKYRIE 1500 (1997–2003) | SUPER HAWK 1000 / VTR 1000F (1997+)
// AMERICA CLASSIC 1600 (2002+)
// Modelos raros e de altíssima cilindrada — coleção e uso esportivo/cruiser extremo
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

// ─── SUPER HAWK 1000 / VTR 1000F (1997+) ─────────────────────────────────────
// Motor: 996cc 90° V-twin DOHC 8v liquid-cooled | 110 cv @ 9.500 rpm | 95 Nm
// Óleo: 10W-30 JASO MA2, 3,5 L (serviço) / 4,0 L (completo)
// Vela: NGK CR9EH-9 ou iridium (×2) gap 0,9 mm
// Pneus: 120/70-ZR17 (F) / 180/55-ZR17 (R) | Tanque: 18 L

const SUPERHAWK_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA2 full sintético — 3,5 L (serviço); a cada 6.000 km',
    body: 'Motor V-twin 90° DOHC 996cc de alto rendimento: use 10W-30 JASO MA2 full sintético. 3,5 L com filtro. Motul 7100 10W-30 ou Motul 300V 10W-40 (para uso esportivo intenso). Intervalo: 6.000 km. O V-twin 90° da Super Hawk é derivado do Firestorm (VTR 1000 europeu) — motor de extrema performance que exige óleo de qualidade. Cilindro traseiro aquece mais pelo posicionamento — óleo sintético compensa melhor.',
  },
  {
    severity: 'OK',
    title: 'Motor V-twin 90° DOHC — som característico; regulagem de válvulas a cada 20.000 km',
    body: 'O 996cc V-twin 90° é um dos motores Honda mais icônicos: som grave a baixa rotação, impulsão violenta a partir de 6.500 rpm. Folgas de válvulas (motor frio): admissão 0,16 mm / escape 0,24 mm. Por shims. Regulagem a cada 20.000 km. Custo oficina especializada: R$800–1.200. O som do twin 90° DOHC a aceleração plena é uma das experiências mais marcantes das motos Honda — por isso este motor foi chamado de "twin V quase perfeito".',
  },
  {
    severity: 'OK',
    title: 'Pneus ZR17 de alta performance — 120/70-17 + 180/55-17; custo e durabilidade',
    body: 'A Super Hawk usa pneus ZR17 de alta performance. Michelin Pilot Power 4S, Pirelli Diablo Rosso IV, Bridgestone Battlax RS11. Com 110 cv e peso relativamente baixo (189 kg seco): a Super Hawk "come" pneu traseiro em 8.000–12.000 km (uso esportivo). Pressão: F 36 / R 42 PSI. A geometria agressiva exige pneu de qualidade — pneu barato em uma Super Hawk é risco real na pista.',
  },
  {
    severity: 'OK',
    title: 'Postura de luta (naked agressiva) — pilotagem exige experiência; não é para iniciantes',
    body: 'A Super Hawk tem postura agressiva: punhos baixos, pedaleiras recuadas. Pilotagem em curvas: a moto vira com facilidade mas requer experiência para não ir além do limite. O twin de 110 cv tem resposta rápida do acelerador — iniciantes podem se surpreender. Recomendação: curso avançado de pilotagem antes de andar agressivamente. Em pista: Super Hawk é uma das melhores "twins" para trackday. Em estrada: respeite os limites e use equipamento completo (proteção articular + capacete fechado).',
  },
]

const SUPERHAWK_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Peças difíceis de encontrar (descontinuada) — planeje com antecedência',
    body: 'Super Hawk (VTR 1000F) foi descontinuada no mercado. Peças de motor: disponíveis via importação dos EUA ou Europa (2–4 semanas). Filtro de óleo, velas e corrente: disponíveis no Brasil. Carenagem: praticamente só réplicas ou peças de desmanche. Comunidades: VTR 1000F Brasil no Facebook, VTRsp.com.br (fórum). Clube de proprietários São Paulo tem a maior rede de indicações de desmanche.',
  },
  {
    severity: 'WARN',
    title: 'Cilindro traseiro com aquecimento excessivo em trânsito — posicionamento V-twin 90°',
    body: 'O cilindro traseiro vertical do V-twin 90° fica em área de pouco fluxo de ar. Em trânsito prolongado (>15 min parado): temperatura sobe. O ventilador do radiador ajuda. Em verões quentes (São Paulo, Nordeste): a Super Hawk não é confortável em trânsito lento. Para uso predominantemente urbano: há melhores opções. A Super Hawk brilha em estradas abertas e pistas.',
  },
  {
    severity: 'OK',
    title: 'Motor V-twin que vibra sensivelmente em 3.000–4.500 rpm — absorção de pilotagem',
    body: 'O V-twin 90° da Super Hawk vibra moderadamente na faixa de 3.000–4.500 rpm — faixa de "oco" do motor (abaixo do torque ideal). Em estrada: mantenha acima de 5.000 rpm para pilotagem mais fluida. Punhos ergonômicos de borracha antivibração (Renthal Grips) e espelhos aftermarket com haste borrachada reduzem a percepção de vibração. Acima de 5.500 rpm: motor suaviza e entrega a potência.',
  },
]

// ─── VTX 1800 R/S/C ───────────────────────────────────────────────────────────
// Motor: 1795cc 52° V-twin SOHC 4v PGM-FI (injeção eletrônica) | 104 cv @ 5.500 rpm
// Óleo: 10W-30 JASO MA, 4,5 L (serviço) / 5,0 L (completo)
// Vela: NGK IZFR6K-11 iridium (×2) gap 1,0 mm
// Pneus: 130/90-18 (F) / 200/50-18 (R) | Tanque: 19 L | Peso: 340 kg (cheio)
// Shaft drive | Três versões: R (Retro), S (Sport), C (Custom)

const VTX1800_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA — 4,5 L (serviço); a cada 8.000 km; NÃO use JASO MA2',
    body: 'Motor V-twin 1795cc SOHC com câmbio integrado e embreagem molhada: JASO MA obrigatório. 4,5 L com filtro. Motul 5100 10W-30 ou Honda HP 4T 10W-30. NUNCA use JASO MA2 (aditivos antifricção destroem a embreagem molhada e geram escorregamento). Intervalo: 8.000 km. Motor de alto torque (163 Nm a 3.500 rpm!) com baixa rotação — óleo de qualidade protege principalmente o câmbio integrado.',
  },
  {
    severity: 'OK',
    title: 'Shaft drive — SEM corrente; óleo do diferencial traseiro a cada 20.000 km',
    body: 'VTX 1800 usa transmissão por eixo (shaft drive). Zero manutenção de corrente. A caixa de engrenagem traseira (diferencial final) usa óleo hipóide 80W-90 GL-5. Volume: ~200 mL. Troca: a cada 20.000 km. Parafuso de nível na lateral da caixa traseira. Negligência do óleo do shaft: desgaste silencioso e progressivo das engrenagens cônicas, acabando em falha catastrófica. Custo de reparo: R$2.000–5.000 em peças + mão de obra.',
  },
  {
    severity: 'OK',
    title: 'Pneu traseiro 200/50-18 — um dos mais largos do mercado; opções limitadas e caras',
    body: 'O pneu traseiro 200/50-18 é o maior do segmento cruiser Honda. Opções: Michelin Commander III 200/55-18 (com adaptação), Dunlop Elite 3 200/50-18, Metzeler ME 880 200/55-18. Custo: R$900–1.400 o traseiro. Vida útil: 15.000–25.000 km (baixa rotação do cruiser preserva pneu). Pressão: R 42 PSI (solo) / R 42–45 PSI (com garupa — pesado!). A roda traseira larga dá o visual "power cruiser" único da VTX 1800.',
  },
  {
    severity: 'OK',
    title: 'PGM-FI (injeção eletrônica) — vantagem sobre os cruisers carburados da época',
    body: 'A VTX 1800 tem injeção eletrônica Honda PGM-FI — rara entre cruisers dos anos 2000 (muitos concorrentes ainda tinham carburador). Benefícios: partida mais fácil a frio, melhor consumo (18–22 km/L), sem necessidade de esvaziamento do carburador ao guardar. Manutenção do sistema FI: limpeza do injetor por ultrassom a cada 30.000 km (R$80–150) e filtro de combustível a cada 20.000 km. Diagnóstico de falhas: requer scanner compatível Honda.',
  },
]

const VTX1800_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Peso de 340 kg (cheio): manobras em estacionamento exigem prática e força',
    body: 'VTX 1800 é uma das motos mais pesadas vendidas no Brasil. 340 kg cheio significa que um tombo em baixa velocidade é um problema sério (para o piloto e para a moto). Em estacionamentos: sempre estacione em posição favorável para saída. Em inclinações: use calço sob o cavalete. Subida em rampa de garagem: velocidade baixa e comprometimento total da frenagem controlada. A baixa altura do assento (690 mm) ajuda: você chega ao chão facilmente.',
  },
  {
    severity: 'WARN',
    title: 'Manutenção do sistema de arrefecimento — motor V-twin de 1795cc em trânsito',
    body: 'Motor refrigerado a líquido de 1795cc em trânsito urbano prolongado: o ventilador pode ligar com frequência. Em temperaturas ambientes >35°C: monitore o painel de temperatura. Radiador: limpeza das aletas anualmente (insetos, poeira). Mangueiras de borracha: inspecionar em motos com mais de 10 anos. Troca do fluido de arrefecimento: a cada 2 anos. Sistema de arrefecimento em dia é vital para um motor de 1,8 L com resfriamento compacto.',
  },
]

// ─── VALKYRIE 1500 (F6C) ──────────────────────────────────────────────────────
// Motor: 1520cc SOHC flat-6 (horizontal 6 cilindros!) liquid-cooled PGM-FI | 98 cv
// Óleo: 10W-30 JASO MA, 4,8 L | 6 carburadores CV (versão carburada) ou FI (F6C)
// Pneus: 130/70-18 (F) / 180/70-16 (R) | Tanque: 21 L | Peso: 360 kg (cheio)
// Motor derivado do GOLD WING 1500 — o cruiser mais exótico da Honda

const VALKYRIE_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor flat-6 de 1520cc — 6 cilindros horizontais; o motor mais único do mercado de motos',
    body: 'A Valkyrie usa motor flat-6 horizontalmente oposto derivado da Gold Wing 1500. Seis cilindros com 130° entre os bancos. Resultado: motor extremamente suave (vibração quase zero), torque colossal (130 Nm a 4.500 rpm). Óleo: 10W-30 JASO MA, 4,8 L. Seis velas (1 por cilindro, acessíveis lateralmente): NGK DPR8EA-9, gap 0,8 mm. Troca em conjunto (6 velas de uma vez). Custo em velas iridium: R$80–120 × 6 = R$480–720. Troque a cada 20.000 km.',
  },
  {
    severity: 'OK',
    title: 'Versão carburada: 6 carburadores sincronizados — manutenção complexa mas possível',
    body: 'A Valkyrie carburada (1997–2003 no Brasil) tem 6 carburadores CV sincronizados em pares. Sincronização: a cada 10.000 km com manômetros de vácuo (balanceamento). Sem sincronização: marcha lenta instável, consumo elevado, engasgo em aceleração. Limpeza dos 6 carburadores: procedimento longo (4–6 horas de mão de obra) — R$400–800 em oficina especializada. Ao comprar usada: exija sincronização recente ou faça imediatamente.',
  },
  {
    severity: 'OK',
    title: 'Shaft drive + overdrive — transmissão por eixo com 5ª marcha overdrive',
    body: 'Valkyrie usa shaft drive (sem corrente). A 5ª marcha é overdrive (relação de transmissão < 1): a 100 km/h, o motor gira em ~3.200 rpm. Resultado: touring extremamente silencioso e econômico. Óleo do shaft: 80W-90 GL-5, ~300 mL, troca a cada 20.000 km. A suavidade do motor flat-6 em baixa rotação na 5ª é inesquecível para quem experimenta. Para viagens longas: Valkyrie é uma das motos mais confortáveis já feitas.',
  },
]

const VALKYRIE_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: '6 carburadores: gasolina velha entope TODOS; esvazie ao guardar por mais de 15 dias',
    body: 'O problema mais crítico da Valkyrie carburada: 6 carburadores para limpar. Se a gasolina envelhece nos 6 carbs, a limpeza pode custar R$600–1.000. Prevenção rigorosa: ao guardar por mais de 2 semanas, SEMPRE feche a torneira e rode até apagar. Em motos paradas por mais de 3 meses: desmontagem e limpeza dos 6 carbs é obrigatória antes de usar. Não existe atalho. Adicionalmente: drene o filtro de gasolina e inspecione o interior do tanque.',
  },
  {
    severity: 'WARN',
    title: 'Peso de 360 kg (cheio) — a mais pesada das Hondas no Brasil; requer experiência',
    body: 'Com 21 L de gasolina cheios: ~375 kg totais. Para movimentar em estacionamento: não é possível empurrar sozinho. Ao inclinar para o lado em baixa velocidade: queda é quase certa. Para quem vem de motos menores: prática específica em espaço aberto é essencial. A Valkyrie é uma moto de estrada — em rotatórias e curvas apertadas urbanas, requer muito mais espaço que motos comuns. A Valkyrie se torna uma moto "fácil" apenas acima de 50 km/h (giroscópio + aerodinâmica ajudam).',
  },
]

// ─── AMERICA CLASSIC 1600 ─────────────────────────────────────────────────────
// Motor: 1601cc SOHC V-twin fuel-injected | ~84 cv @ 4.500 rpm
// Óleo: 10W-30 JASO MA, 3,8 L | Shaft drive | Pneus: 130/80-17 (F) / 170/80-15 (R) | 18 L tank

const AMERICA_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA — 3,8 L (serviço); a cada 8.000 km; shaft drive exige cuidado extra',
    body: 'Motor 1601cc V-twin SOHC: 10W-30 JASO MA. Não JASO MA2. Capacidade: 3,8 L. Honda HP 4T. Intervalo: 8.000 km. Shaft drive: caixa traseira com 80W-90 GL-5, ~200 mL, troca a cada 20.000 km. A America Classic 1600 é uma das motos mais raras no Brasil — poucos mecânicos têm experiência direta. Para manutenção: busque mecânicos com experiência em Gold Wing ou Shadow 1100 (arquitetura similar).',
  },
  {
    severity: 'OK',
    title: 'PGM-FI de 1601cc — sistema de injeção eletrônica com 2 corpos de borboleta grandes',
    body: 'Injeção Honda PGM-FI com corpos de borboleta de 42 mm (grandes para o V-twin). Partida excelente a frio sem uso de afogador. Manutenção: limpeza dos injetores a cada 30.000 km. Diagnóstico: scanner Honda HDS ou genérico compatível. Raro no Brasil: poucos casos de falha do sistema FI relatados. Se aparecer luz MIL: verificar sensores de temperatura, O2 e TPS antes de entrar em pânico.',
  },
]

const AMERICA_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Extrema raridade no Brasil — mecânicos, peças e donos experientes são difíceis de encontrar',
    body: 'A Honda America Classic 1600 é um dos modelos mais raros já vendidos no Brasil. Comunidade praticamente inexistente nacionalmente. Para manutenção e peças: busque importadores Honda diretos (EUA, Portugal, Espanha) e comunidades internacionais (Honda America Classic owners). Para vender ou comprar: anúncios raramente aparecem — preço é difícil de estimar. Esta moto é essencialmente um item de coleção no Brasil.',
  },
]

// ─── Manutenções ──────────────────────────────────────────────────────────────

const SUPERHAWK_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'SUPER HAWK 1000', yearFrom: 1997, yearTo: null, component: 'Óleo 10W-30 JASO MA2 (3,5 L serviço / 4,0 L completo)', intervalKm: 6000, intervalMonths: 12, notes: 'V-twin DOHC 110 cv. Full sintético. Motul 7100 ou 300V.', priority: 'HIGH', order: 1 },
  { modelName: 'SUPER HAWK 1000', yearFrom: 1997, yearTo: null, component: 'Velas NGK CR9EH-9 iridium (×2) — gap 0,9 mm', intervalKm: 16000, intervalMonths: null, notes: '2 velas. Cilindro traseiro: acesso difícil. Troca em conjunto.', priority: 'MEDIUM', order: 2 },
  { modelName: 'SUPER HAWK 1000', yearFrom: 1997, yearTo: null, component: 'Regulagem de válvulas DOHC 8v (×2 cil)', intervalKm: 20000, intervalMonths: null, notes: 'Por shims. Motor frio. Adm 0,16 mm / Esc 0,24 mm.', priority: 'CRITICAL', order: 3 },
  { modelName: 'SUPER HAWK 1000', yearFrom: 1997, yearTo: null, component: 'Fluido de arrefecimento — troca', intervalKm: null, intervalMonths: 24, notes: 'Long Life Coolant 50/50.', priority: 'HIGH', order: 4 },
  { modelName: 'SUPER HAWK 1000', yearFrom: 1997, yearTo: null, component: 'Pastilhas dianteiras ZR17 + fluido DOT 4', intervalKm: 12000, intervalMonths: 24, notes: 'EBC HH series. Discos 296 mm. Uso esportivo: inspecionar a cada 7.000 km.', priority: 'HIGH', order: 5 },
  { modelName: 'SUPER HAWK 1000', yearFrom: 1997, yearTo: null, component: 'Kit transmissão 520 + lubrificação', intervalKm: 20000, intervalMonths: null, notes: 'Lubrificar a cada 600 km. V-twin de alto torque: kit de qualidade (DID 520 ERVT).', priority: 'HIGH', order: 6 },
]

const VTX1800_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'VTX 1800', yearFrom: 2002, yearTo: null, component: 'Óleo 10W-30 JASO MA (4,5 L serviço / 5,0 L completo)', intervalKm: 8000, intervalMonths: 12, notes: 'JASO MA obrigatório (embreagem molhada). Motul 5100 10W-30.', priority: 'CRITICAL', order: 1 },
  { modelName: 'VTX 1800', yearFrom: 2002, yearTo: null, component: 'Óleo do shaft drive (80W-90 GL-5) — ~200 mL', intervalKm: 20000, intervalMonths: null, notes: 'CRÍTICO: diferencial traseiro. Não negligenciar. Parafuso de nível lateral na caixa traseira.', priority: 'CRITICAL', order: 2 },
  { modelName: 'VTX 1800', yearFrom: 2002, yearTo: null, component: 'Velas NGK IZFR6K-11 iridium (×2) — gap 1,0 mm', intervalKm: 20000, intervalMonths: null, notes: '2 velas. Motores de grande cilindrada: velas iridium compensam.', priority: 'MEDIUM', order: 3 },
  { modelName: 'VTX 1800', yearFrom: 2002, yearTo: null, component: 'Fluido de arrefecimento — troca', intervalKm: null, intervalMonths: 24, notes: 'Long Life Coolant 50/50.', priority: 'HIGH', order: 4 },
  { modelName: 'VTX 1800', yearFrom: 2002, yearTo: null, component: 'Bateria YTX20L-BS (12V 18Ah) — verificação', intervalKm: null, intervalMonths: 12, notes: '1795cc: bateria grande necessária. Vida útil: 3–4 anos.', priority: 'HIGH', order: 5 },
]

const VALKYRIE_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'VALKYRIE 1500', yearFrom: 1997, yearTo: 2003, component: 'Óleo 10W-30 JASO MA (4,8 L)', intervalKm: 8000, intervalMonths: 12, notes: 'Flat-6 1520cc. JASO MA obrigatório. Motor Gold Wing compartilhado.', priority: 'HIGH', order: 1 },
  { modelName: 'VALKYRIE 1500', yearFrom: 1997, yearTo: 2003, component: 'Sincronização dos 6 carburadores CV (versão carburada)', intervalKm: 10000, intervalMonths: null, notes: 'Com manômetros de vácuo. Procedimento longo: R$400–800 mão de obra.', priority: 'CRITICAL', order: 2 },
  { modelName: 'VALKYRIE 1500', yearFrom: 1997, yearTo: 2003, component: 'Velas NGK DPR8EA-9 (×6) — gap 0,8 mm', intervalKm: 20000, intervalMonths: null, notes: '6 velas! Acesso lateral. Troca em conjunto. Custo: R$90–180 em velas.', priority: 'MEDIUM', order: 3 },
  { modelName: 'VALKYRIE 1500', yearFrom: 1997, yearTo: 2003, component: 'Óleo do shaft drive (80W-90 GL-5)', intervalKm: 20000, intervalMonths: null, notes: 'Overdrive 5ª marcha. Diferencial cobre maior torque que outros shafts Honda.', priority: 'CRITICAL', order: 4 },
]

const AMERICA_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'AMERICA CLASSIC 1600', yearFrom: 2002, yearTo: null, component: 'Óleo 10W-30 JASO MA (3,8 L)', intervalKm: 8000, intervalMonths: 12, notes: 'V-twin 1601cc FI. JASO MA obrigatório. Mecânico com experiência em Gold Wing/Shadow 1100.', priority: 'HIGH', order: 1 },
  { modelName: 'AMERICA CLASSIC 1600', yearFrom: 2002, yearTo: null, component: 'Óleo do shaft drive (80W-90 GL-5)', intervalKm: 20000, intervalMonths: null, notes: 'Caixa traseira. CRÍTICO: não negligenciar.', priority: 'CRITICAL', order: 2 },
  { modelName: 'AMERICA CLASSIC 1600', yearFrom: 2002, yearTo: null, component: 'Limpeza dos injetores PGM-FI', intervalKm: 30000, intervalMonths: null, notes: 'Scanner diagnóstico Honda. Limpeza ultrassônica a cada 30.000 km.', priority: 'MEDIUM', order: 3 },
]

// ─── Calibragens ──────────────────────────────────────────────────────────────

const SUPERHAWK_CALIBRAGEM = {
  modelName: 'SUPER HAWK 1000',
  yearFrom: 1997, yearTo: null,
  tireSize: '120/70-ZR17 (F) · 180/55-ZR17 (R)',
  frontPsi: 36, rearPsi: 42, frontPsiLoad: 36, rearPsiLoad: 42,
  sparePsi: null,
  notes: 'Solo e com garupa: F 36 / R 42 PSI. ZR17 sport: Michelin Pilot Power 4S, Pirelli Diablo Rosso IV, Bridgestone Battlax RS11.',
}

const VTX1800_CALIBRAGEM = {
  modelName: 'VTX 1800',
  yearFrom: 2002, yearTo: null,
  tireSize: '130/90-18 (F) · 200/50-18 (R)',
  frontPsi: 36, rearPsi: 42, frontPsiLoad: 36, rearPsiLoad: 45,
  sparePsi: null,
  notes: 'Solo: F 36 / R 42 PSI. Com garupa (moto muito pesada): F 36 / R 45 PSI. Pneu 200mm traseiro: Michelin Commander III, Dunlop Elite 3, Metzeler ME 880.',
}

const VALKYRIE_CALIBRAGEM = {
  modelName: 'VALKYRIE 1500',
  yearFrom: 1997, yearTo: 2003,
  tireSize: '130/70-18 (F) · 180/70-16 (R)',
  frontPsi: 33, rearPsi: 39, frontPsiLoad: 33, rearPsiLoad: 42,
  sparePsi: null,
  notes: 'Solo: F 33 / R 39 PSI. Com garupa (360 kg cheio!): F 33 / R 42 PSI. Dunlop Elite 3, Michelin Commander III.',
}

const AMERICA_CALIBRAGEM = {
  modelName: 'AMERICA CLASSIC 1600',
  yearFrom: 2002, yearTo: null,
  tireSize: '130/80-17 (F) · 170/80-15 (R)',
  frontPsi: 36, rearPsi: 39, frontPsiLoad: 36, rearPsiLoad: 42,
  sparePsi: null,
  notes: 'Solo: F 36 / R 39 PSI. Com garupa: F 36 / R 42 PSI. Pneus cruiser perfil alto. Michelin Commander III, Dunlop D404.',
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
  console.log('🏍️  Seed Honda Exóticos (SUPER HAWK / VTX 1800 / VALKYRIE / AMERICA CLASSIC)...')

  await upsertVehicleModel('SUPER HAWK 1000', 'Honda', 1997, null)
  await upsertVehicleModel('VTX 1800', 'Honda', 2002, null)
  await upsertVehicleModel('VALKYRIE 1500', 'Honda', 1997, 2003)
  await upsertVehicleModel('AMERICA CLASSIC 1600', 'Honda', 2002, null)

  await upsertTips('SUPER HAWK 1000', 'MACETES', SUPERHAWK_MACETES)
  await upsertTips('SUPER HAWK 1000', 'PROBLEMAS', SUPERHAWK_PROBLEMAS)
  await upsertMaintenance(SUPERHAWK_MANUTENCAO)
  await upsertTirePressure(SUPERHAWK_CALIBRAGEM)

  await upsertTips('VTX 1800', 'MACETES', VTX1800_MACETES)
  await upsertTips('VTX 1800', 'PROBLEMAS', VTX1800_PROBLEMAS)
  await upsertMaintenance(VTX1800_MANUTENCAO)
  await upsertTirePressure(VTX1800_CALIBRAGEM)

  await upsertTips('VALKYRIE 1500', 'MACETES', VALKYRIE_MACETES)
  await upsertTips('VALKYRIE 1500', 'PROBLEMAS', VALKYRIE_PROBLEMAS)
  await upsertMaintenance(VALKYRIE_MANUTENCAO)
  await upsertTirePressure(VALKYRIE_CALIBRAGEM)

  await upsertTips('AMERICA CLASSIC 1600', 'MACETES', AMERICA_MACETES)
  await upsertTips('AMERICA CLASSIC 1600', 'PROBLEMAS', AMERICA_PROBLEMAS)
  await upsertMaintenance(AMERICA_MANUTENCAO)
  await upsertTirePressure(AMERICA_CALIBRAGEM)

  const models = ['SUPER HAWK 1000', 'VTX 1800', 'VALKYRIE 1500', 'AMERICA CLASSIC 1600']
  const tipCount = await prisma.tip.count({ where: { modelName: { in: models } } })
  const maintCount = await prisma.maintenanceItem.count({ where: { modelName: { in: models } } })

  console.log(`✅ ${models.length} modelos exóticos — ${tipCount} dicas, ${maintCount} itens de manutenção`)
  console.log('✅ Seed concluído!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
