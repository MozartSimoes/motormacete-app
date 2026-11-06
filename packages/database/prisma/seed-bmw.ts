/**
 * Seed BMW — macetes, problemas e manutenção
 * Cobre os principais modelos BMW Motorrad comercializados no Brasil
 *
 * Fontes: bmw-motorrad.com.br, maintenanceschedule.com, motorcycleparts-hornig.com,
 *         bmwgsbrasil.com.br, reclameaqui.com.br, s1000rrforum.com,
 *         ninetowners.com, advrider.com, ManualsLib (manuals oficiais)
 *
 * Execute: pnpm --filter @motormacete/database db:seed:bmw
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput {
  severity: Sev
  title: string
  body: string
}

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

// ─── G 310 GS ────────────────────────────────────────────────────────────────

const G310GS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Filtro de óleo alternativo: Tecfil PSL633 ou Fram — metade do preço do original',
    body: 'O filtro de óleo original BMW para a G 310 GS custa entre R$ 120–R$ 180 na concessionária. Alternativas homologadas disponíveis no Brasil: Tecfil PSL633 (R$ 25–R$ 40), Fram PH6017A (R$ 30–R$ 50), Vedamotors (R$ 30). Todos são compatíveis com o motor 313cc monocilíndrico. Pesquise no ML: "filtro oleo BMW G 310 GS Tecfil". O filtro de ar também tem substituto: Tecfil ARM459/1 ou Fram FA-1791 — R$ 50–R$ 90 vs R$ 200+ no original. Kit completo filtro óleo + filtro ar alternativo economiza ~R$ 300 por revisão.',
  },
  {
    severity: 'OK',
    title: 'Óleo: 5W-40 JASO MA2 sintético — 1,65L com filtro',
    body: 'A G 310 GS usa 1,65L de óleo com troca do filtro (1,4L sem troca de filtro). Especificação: SAE 5W-40 API SJ, JASO MA2 — obrigatória para embreagem úmida. Opções disponíveis no Brasil: Motul 7100 5W-40 (kit troca ~R$ 350 com filtro Tecfil), Mobil 4T 15W-50 (aceito pelo manual como alternativa), Shell Advance AX7 15W-50. A cada 10.000 km ou 1 ano. Dica: fuja dos 5W-30 e 10W-40 — o manual especifica 5W-40. Temperatura do motor no trânsito de SP: use o sintético, não o semissintético — a cabeça do cilindro virada pra trás aquece mais no tráfego parado.',
  },
  {
    severity: 'WARN',
    title: 'Vela NGK LMAR9D-J: gap 1,2 mm — diferente de qualquer outra moto que você já teve',
    body: 'A G 310 GS usa vela NGK LMAR9D-J com gap de 1,2 ± 0,1 mm — valor incomum e maior que a maioria das motos. Troque a cada 20.000 km. Custo: R$ 80–R$ 150 no ML. Atenção: o motor é fabricado pela TVS na Índia em parceria com BMW — mantenha a vela original NGK (não substitua por Denso ou Bosch sem verificar equivalência certa). O motor 313cc de alto comprimento de curso gera boa torque em baixo, mas é sensível a vela fora do gap — partida difícil a frio é o primeiro sintoma de vela com gap errado ou desgastada.',
  },
  {
    severity: 'OK',
    title: 'Corrente 520: kit completo (corrente + pinhão + coroa) a cada 20.000–25.000 km',
    body: 'A G 310 GS usa corrente 520. Custo do kit completo no Brasil: R$ 550–R$ 800 (DID, RK ou Renthal). Lubrificação: a cada 500 km ou sempre que molhar em chuva. Tensão: folga de 25–30 mm na parte inferior da corrente (moto no cavalete, lado do piloto). A roda traseira de 17" com freio ABS exige atenção ao alinhamento ao ajustar a corrente — siga as marcações dos tensores dos dois lados.',
  },
  {
    severity: 'WARN',
    title: 'Revisão autorizada BMW: primeira a 1.000 km é obrigatória para não perder a garantia',
    body: 'A revisão de 1.000 km na G 310 GS é obrigatória em concessionária autorizada para manter a garantia (2 anos). Custo: R$ 300–R$ 600 (troca de óleo + filtro + checklist geral). A partir da segunda revisão (10.000 km), você pode fazer em oficina independente sem perder a garantia — mas guarde todas as notas fiscais. Dica: o manual de serviço da G 310 GS está disponível no ManualsLib gratuitamente — leve para oficinas independentes que cobram bem menos que a concessionária (R$ 150–R$ 300 vs R$ 500–R$ 900 na dealer).',
  },
  {
    severity: 'OK',
    title: 'ABS: nunca desligue em off-road se não souber o que está fazendo',
    body: 'A G 310 GS tem ABS desligável no modo off-road. Mas atenção: o ABS traseiro desligado em piso solto requer técnica específica — frenagem com bloqueio controlado do traseiro. Se você não tem experiência em off-road, deixe o ABS ligado em todos os terrenos. Em lama, areia e pedregulho, o ABS pode causar distância de frenagem maior que frenagem manual com técnica correta — mas para a maioria dos usuários urbanos, o ABS ligado é sempre mais seguro. Revisão do sistema ABS: verifique os sensores de roda com jato de água suave (acúmulo de lama entupindo o sensor causa luz de falha no painel).',
  },
]

const G310GS_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Módulo de ignição: falha crônica — moto para no meio da rua sem aviso',
    body: 'O módulo de ignição (ECU/ignição eletrônica) da G 310 GS é o problema mais relatado no Reclame Aqui. A moto para abruptamente, não religar. A peça pode demorar 30–60 dias para chegar da Índia via concessionária. Sintomas iniciais: dificuldade de partir a quente, desligamentos esporádicos em baixa rotação, falha ao aquecer. Se a moto já apresentou desligamentos, exija diagnóstico via ferramenta BMW antes de qualquer viagem longa. Solução temporária: ao desligar, aguarde 30s antes de religar (estabiliza o módulo de injeção). Não há solução definitiva com peça aftermarket disponível no Brasil ainda.',
  },
  {
    severity: 'WARN',
    title: 'Vibração excessiva acima de 5.000 RPM: característica do motor monocilíndrico grande',
    body: 'O motor 313cc monocilíndrico da G 310 GS gera vibração notável acima de 5.000 RPM — especialmente nas mãos e nos pés. Isso é normal para o tipo de motor, mas pode ser agravado por: 1) Vela fora do gap (1,2 mm). 2) Filtro de ar sujo. 3) Motor fora da regulagem de ralenti (especificação: 1.200 ± 100 RPM em frio, 1.100 ± 100 RPM em quente). 4) Corrente muito tensa. Se a vibração piorou progressivamente, verifique folga das válvulas (a partir de 20.000 km). Antivibração para mãos: manoplas com foam interno (Oxford OF10, ~R$ 80 no ML).',
  },
  {
    severity: 'WARN',
    title: 'Freio traseiro: pastilha original desgasta rápido em uso urbano',
    body: 'Donos da G 310 GS relatam desgaste acelerado da pastilha de freio traseiro em uso urbano intenso — trânsito de SP ou RJ com frenagens frequentes. Troca necessária por vezes antes de 10.000 km. Alternativa: pastilha EBC FA213 ou Galfer — desempenho igual ou superior ao original por 60–70% do preço. Não use pastilhas sintered (metálicas) em clima quente/urbano sem break-in adequado — produzem ruído e desgaste irregular no disco novo. Disco mínimo: 3,5 mm — meça com paquímetro a cada 20.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Transmissão com engates duros: problema relatado nos primeiros 5.000 km',
    body: 'A G 310 GS apresenta engates duros e parcialmente travados no 1º e 2º marcha nos primeiros 5.000 km — principalmente de frio. Causa: tolerâncias de fabricação da transmissão TVS que melhoram com o uso (rodagem). Solução: rodar a moto com cuidado nos primeiros 3.000 km, evitando engate abrupto. Use óleo sintético 5W-40 (melhora a fluidez da embreagem em frio). Se o problema persistir após 5.000 km, a transmissão pode ter peça com defeito — exija diagnóstico na concessionária sob garantia.',
  },
]

const G310GS_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma G 310 GS: revisões por quilometragem',
    body: '1.000 km — Revisão de rodagem obrigatória (dealer): óleo + filtro, aperto geral, verificação ABS e elétrica. | 10.000 km — Óleo 5W-40 sintético JASO MA2 (1,65L com filtro Tecfil PSL633), filtro de ar inspecionado, corrente lubrificada e tensionada, freios verificados, fluido de freio inspecionado. | 20.000 km — Tudo do 10k + vela NGK LMAR9D-J nova (gap 1,2 mm), filtro de ar NOVO (Tecfil ARM459/1), folga de válvulas verificada e ajustada se necessário, fluido de freio DOT 4 trocado. | 30.000 km — Tudo do 20k + kit corrente 520 (se desgastado), verificação da bengala dianteira (óleo de garfo). | 40.000 km — Óleo de garfo trocado.',
  },
  {
    severity: 'OK',
    title: 'Calibragem de pneus G 310 GS: 1,7 bar frente / 1,9 bar atrás',
    body: 'Pneus frios: dianteiro 110/70 R19 = 1,7 bar (25 psi). Traseiro 150/70 R17 = 1,9 bar (28 psi). Com garupa ou carga: dianteiro 1,9 bar, traseiro 2,1 bar. O aro 19" dianteiro é peculiaridade da GS — pneus de 19" são menos comuns e mais caros que 17". Opções disponíveis no Brasil: Pirelli Scorpion Rally STR (excelente misto), Continental Trail Attack, Metzeler Karoo Street. Nunca ultrapasse 2,5 bar na G 310 GS — o motor monocilíndrico transmite vibração que já desgasta os pneus — pressão alta acelera desgaste irregular.',
  },
]

// ─── G 310 R ─────────────────────────────────────────────────────────────────

const G310R_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor TVS/BMW idêntico à G 310 GS: peças intercambiáveis entre as duas',
    body: 'A G 310 R usa exatamente o mesmo motor, transmissão, freios e sistema elétrico da G 310 GS. Peças como filtro de óleo (Tecfil PSL633), filtro de ar (ARM459/1), vela (NGK LMAR9D-J) e pastilhas de freio são idênticas. O que difere: suspensão (G 310 R tem aro 17" dianteiro em vez de 19"), altura do assento menor e sem parabarro elevado. Essa intercambialidade é uma vantagem enorme — peças em estoque de qualquer modelo servem para o outro.',
  },
  {
    severity: 'OK',
    title: 'Aro 17" nas duas rodas: mais opções de pneus e menor custo de troca',
    body: 'Ao contrário da G 310 GS com aro 19" na frente, a G 310 R tem 17" nos dois eixos — pneus muito mais fáceis de encontrar e mais baratos. Medidas: 110/70-17 (dianteiro) e 150/60-17 (traseiro). Calibragem: 2,0 bar frente / 2,2 bar atrás solo; 2,2 bar frente / 2,5 bar atrás com garupa. Opções de pneus: Pirelli Diablo Rosso III, Michelin Road 5, Continental ContiSportAttack — todos disponíveis no Brasil.',
  },
  {
    severity: 'WARN',
    title: 'Mesmos problemas da GS: módulo de ignição e vibração são os dois pontos críticos',
    body: 'A G 310 R compartilha os problemas da G 310 GS: módulo de ignição com tendência a falhar (desligamentos sem aviso) e vibração acima de 5.000 RPM. Mesmas recomendações: mantenha revisões em dia, use óleo sintético 5W-40, e em viagens longas leve o número de atendimento BMW Brasil (0800 722 4369). Ponto positivo da 310 R vs 310 GS: o peso menor (169 kg vs 174 kg) torna o manejo em tráfego urbano mais fácil.',
  },
]

const G310R_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Acelerador fly-by-wire: delay perceptível no resposta em marcha lenta',
    body: 'O sistema fly-by-wire (acelerador eletrônico sem cabo mecânico) da G 310 R causa um pequeno delay na resposta ao acelerador em baixas rotações — relatado por donos como "moto engasga na saída do semáforo". Isso é comportamento normal do mapeamento de injeção. Melhora significativa: manter o motor em temperatura de operação (2–3 minutos de aquecimento em frio). Não use na rotação de ralenti por tempo prolongado — o mapemento da ECU assume uso imediato após partida.',
  },
  {
    severity: 'WARN',
    title: 'Tanque de 11L: autonomia limitada — planeje paradas a cada 200 km',
    body: 'O tanque de 11L da G 310 R combinado com consumo médio de 20–22 km/L dá autonomia de 220–240 km. Em rodovias a 100–110 km/h (moto a ~6.000–7.000 RPM) o consumo sobe para 17–18 km/L — autonomia cai para ~190 km. Planeje abastecimentos mais frequentes que em motos maiores. Reserva ativa em ~2,5L. Não aguarde a luz de reserva em estradas sem posto visível — em rodovias do interior do Brasil, os postos podem estar a 50+ km.',
  },
]

const G310R_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma G 310 R: idêntico à GS, mas com pneus diferentes',
    body: '1.000 km — Revisão obrigatória no dealer. | 10.000 km — Óleo 5W-40 JASO MA2 + filtro Tecfil PSL633 + correção de tensão de corrente. | 20.000 km — Tudo do 10k + vela NGK LMAR9D-J (gap 1,2 mm) + filtro de ar + folga de válvulas verificada. | 40.000 km — Óleo de garfo. | Calibragem: 2,0 bar frente / 2,2 bar atrás (solo). Pneus de aro 17" mais disponíveis que os da GS — aproveite para escolher um bom esportivo como Pirelli Diablo Rosso III.',
  },
]

// ─── F 800 GS ────────────────────────────────────────────────────────────────

const F800GS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor bicilíndrico paralelo refrigerado a líquido: revisão de 10.000 km, simples e barata',
    body: 'A F 800 GS tem motor de 2 cilindros paralelos refrigerado a líquido com distribuição de 270° — torque vigoroso em baixas e fácil de reparar. O intervalo de 10.000 km é bem definido. Óleo recomendado: SAE 15W-50 sintético API SL, JASO MA — 3,0L com filtro. Filtro de óleo alternativo: Hiflofiltro HF160RC (R$ 35–R$ 60), equivalente ao BMW original. A vela NGK DCPR8E só precisa ser trocada a cada 40.000 km — um dos maiores intervalos de vela em moto de média cilindrada.',
  },
  {
    severity: 'WARN',
    title: 'Aro 21" dianteiro: poucos pneus disponíveis no Brasil — pesquise antes de precisar',
    body: 'A F 800 GS tem aro 21" na frente e 17" atrás. O aro 21" tem disponibilidade menor no Brasil — não encontre de surpresa em viagem. Medida original: 90/90-21. Opções no Brasil: Pirelli Scorpion Rally STR, Continental TKC80, Metzeler Karoo Street. Preço: R$ 350–R$ 600. Traseiro 150/70-17: muito mais fácil de encontrar. Antes de viagens longas, verifique a disponibilidade do dianteiro nas borracharias no trajeto. Dica: carregar o tubo interno sobressalente (se for tubeless, o plugue de reparo) evita a situação de ficar parado.',
  },
  {
    severity: 'DANGER',
    title: 'Bomba d\'água: o tendão de Aquiles da F 800 GS — monitore sempre',
    body: 'A bomba d\'água da F 800 GS é subdimensionada para o motor e é o problema crônico mais grave do modelo. Falha em ~30.000–50.000 km causando vazamento de refrigerante ou mistura com óleo (emulsão branca no óleo). A BMW não emitiu recall oficial — substitui apenas quando o proprietário reclama ("recall branco"). Sinais de alerta: vapor do radiador, temperatura acima do normal, nível de refrigerante caindo sem vazamento visível externo. Ação preventiva: ao comprar uma F 800 GS usada, verifique imediatamente se a bomba d\'água já foi substituída. Peça de reposição: ~R$ 600–R$ 1.200 mais mão de obra.',
  },
  {
    severity: 'WARN',
    title: 'Óleo de garfo: troca a cada 30.000 km — peça subestimada',
    body: 'O óleo de garfo da F 800 GS requer troca a cada 30.000 km (18.000 milhas) — intervalo longo mas crítico. Garfo com óleo degradado perde amortecimento e os retentores ressecos começam a vazar (vedação com anel de borracha). Vazamento de óleo do garfo = mancha escura abaixo da bengala + pneu dianteiro com película oleosa = perigo de derrapagem. Custo da troca do óleo de garfo: R$ 150–R$ 300 em oficina independente. Se os retentores vazaram, a troca inclui os retentores (mais R$ 100–R$ 250 em peças).',
  },
  {
    severity: 'OK',
    title: 'Transmissão por corrente: lubrificação a cada 500 km é fundamental no uso off-road',
    body: 'A F 800 GS usa transmissão por corrente 525 (diferente de motos com cardan). Lubrificação a cada 500 km em uso on-road e a cada 200 km (ou sempre após lama) em off-road. Kit completo (corrente + pinhão + coroa) para F 800 GS: R$ 600–R$ 1.000 — troque a cada 20.000 km ou quando a corrente estiver com desgaste lateral visível. Após off-road: limpe a corrente com querosene (não gasolina — dissolve a graxa interna do O-ring) antes de lubrificar.',
  },
]

const F800GS_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall corrente de transmissão: modelos 2008-2009 — verifique número de chassi',
    body: 'A BMW emitiu recall para F 800 GS (e F 650 GS twin) fabricadas entre março de 2008 e março de 2009 por risco de ruptura da corrente de transmissão. A corrente rompida pode travar na roda traseira causando acidente grave. Verifique se o recall foi realizado na sua moto com o número de chassi (VIN) no site BMW Motorrad Brasil ou em qualquer concessionária autorizada. Recall gratuito mesmo fora da garantia.',
  },
  {
    severity: 'WARN',
    title: 'Retentor de bengala: vazamento comum em motos com mais de 20.000 km',
    body: 'Retentores de bengala (fork seals) da F 800 GS têm tendência a vazar a partir de ~20.000 km, especialmente em unidades usadas em off-road. Sintoma: mancha de óleo abaixo das bengalas ou película oleosa nos tubos cromados. Custo de troca: R$ 200–R$ 400 em peças (retentores) + mão de obra. Não adie essa troca — óleo no disco de freio dianteiro pode causar perda total de frenagem. Em motos usadas: inspecione as bengalas antes de comprar.',
  },
  {
    severity: 'WARN',
    title: 'Sensor de posição da borboleta (TPS): falha causa instabilidade na injeção',
    body: 'O sensor TPS (Throttle Position Sensor) da F 800 GS pode desenvolver falha eletrônica causando comportamento errático da injeção: acelerações abruptas, falhas em rotação constante, luz de falha no painel. Diagnóstico requer ferramenta GS-911 (diagnóstico BMW barato, ~R$ 700 para compra, ou mecânicos especializados que possuem). Peça aftermarket disponível mas de qualidade variável — prefira original BMW ou Bosch equivalente.',
  },
]

const F800GS_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma F 800 GS: intervalos de 10.000 km, válvulas a cada 20.000 km',
    body: '1.000 km — Revisão de rodagem: óleo 15W-50 + filtro HF160RC, checklist geral. | 10.000 km — Óleo + filtro + corrente lubrificada + freios verificados + refrigerante (nível). | 20.000 km — Tudo do 10k + vela NGK DCPR8E nova (gap 0,7 mm) + filtro de ar novo + folga de válvulas verificada + fluido de freio DOT 4 trocado. | 30.000 km — Tudo do 20k + óleo de garfo trocado + kit corrente (se necessário). | 40.000 km — Vela + filtro de ar + válvulas + óleo de garfo. | Refrigerante: troque a cada 4 anos com refrigerante BMW ou equivalente G13.',
  },
  {
    severity: 'OK',
    title: 'Bomba d\'água: inspeção preventiva é a manutenção mais importante da F 800 GS',
    body: 'Além do cronograma padrão, adicione a inspeção da bomba d\'água a cada 20.000 km: 1) Verifique nível de refrigerante no reservatório (deve estar entre MIN e MAX). 2) Verifique coloração do óleo no visor lateral — óleo marrom-claro é normal, óleo branco-leitoso indica mistura com refrigerante (sinal grave de falha da bomba ou junta do cabeçote). 3) Cheque se há vazamento atrás do cilindro (abaixo do radiador). Caso note qualquer sinal, pare a moto imediatamente — andar com motor superaquecido por falha de refrigeração pode fundir o motor.',
  },
]

// ─── F 850 GS ────────────────────────────────────────────────────────────────

const F850GS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Herda o DNA da F 800 GS mas com motor mais potente e problema da bomba resolvido',
    body: 'A F 850 GS (2018+) usa motor bicilíndrico paralelo refrigerado a líquido de 853cc — maior e mais potente que a F 800 GS (76 cv vs 85 cv). A BMW redesenhou a bomba d\'água e resolveu o problema crônico da predecessora. No entanto, inspeções periódicas do refrigerante continuam importantes. Óleo: 5W-40 sintético BMW Advantec Pro ou equivalente, 3,0L com filtro. Alternativa de filtro: HF160RC (Hiflofiltro, R$ 40–R$ 65) ou Mahle OC613.',
  },
  {
    severity: 'WARN',
    title: 'Corrente 525: lubrificação rigorosa essencial — desgaste rápido em off-road pesado',
    body: 'A F 850 GS usa corrente 525 com motor de 85 cv — mais carga na corrente que a F 800 GS. Em off-road pesado (lama, areia, pedra), lubrifique a corrente a cada 200 km. Use spray de corrente para O-ring (não graxa de rolamento — entope o O-ring). Kit corrente F 850 GS: R$ 700–R$ 1.200 (DID 525VX3 ou RK 525MO). Troque ao primeiro sinal de corrente "batendo" lateralmente ou com elos enferrujados fixos. Pinhão e coroa devem ser trocados junto com a corrente — corrente nova em coroas velhas desgasta 3× mais rápido.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK LMAR8J-9E: só a cada 20.000 km — economia nos custos de manutenção',
    body: 'A F 850 GS usa vela NGK LMAR8J-9E — troca a cada 20.000 km. Custo: R$ 80–R$ 150 por vela (são 2 velas, motor bicilíndrico). Totalizando a cada 20.000 km: R$ 160–R$ 300 em velas. Para comparação: a S 1000 RR usa 4 velas a cada 30.000 km, cada uma a R$ 200+. A F 850 GS é relativamente econômica em manutenção para o segmento GS médio.',
  },
  {
    severity: 'OK',
    title: 'GS-911: ferramenta de diagnóstico que todo dono de BMW Motorrad deveria ter',
    body: 'O GS-911 (HEX Code Wireless) é a ferramenta de diagnóstico universal para BMW Motorrad — lê todos os módulos eletrônicos: motor, ABS, ASC, ESA (suspensão eletrônica). Custo: R$ 600–R$ 800 no Mercado Livre (importado, versão sem subscrição para uso pessoal). Com ele você lê e apaga códigos de erro (DTC), reinicia sensores, calibra o ângulo de volante. Essencial antes de gastar R$ 300 em diagnóstico na concessionária. Funciona via Bluetooth com o app GS-911 (iOS e Android).',
  },
  {
    severity: 'WARN',
    title: 'Suspensão eletrônica (ESA): calibre para o seu peso antes de sair do zero',
    body: 'A F 850 GS com ESA (Electronic Suspension Adjustment — versão premium) precisa ter a pré-carga configurada para o peso do piloto antes do uso. Configuração correta: menu no painel > suspensão > piloto solo (até 80 kg), piloto médio (80–100 kg) ou piloto pesado + carga (acima de 100 kg). Suspensão mal calibrada para o peso = moto pulando em estrada e subesterçando em curvas. Versão sem ESA: ajuste manual da pré-carga do monoshock (chave de moto + ferramenta que vem no toolkit).',
  },
]

const F850GS_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Bateria fraca: BMW usa bateria AGM que não aceita carregador convencional',
    body: 'A F 850 GS usa bateria AGM (Absorbed Glass Mat) — não pode ser carregada com carregador de chumbo-ácido convencional. Carregadores comuns de moto danificam a bateria AGM. Use obrigatoriamente carregadores CTEK, Optimate ou equivalente com modo AGM. Custo: R$ 200–R$ 400. Sintoma de bateria fraca: partida lenta, relógio do painel resetando, erros de sensor sem causa. Bateria AGM original BMW: ~R$ 700–R$ 1.200. Alternativa: Yuasa YTX12-BS AGM (R$ 350–R$ 500), compatível. Em períodos sem uso (>3 semanas), ligue o carregador de manutenção.',
  },
  {
    severity: 'WARN',
    title: 'Retentor de bengala: mesma tendência de vazamento da F 800 GS, especialmente em off-road',
    body: 'O uso frequente em off-road da F 850 GS acelera o desgaste dos retentores das bengalas — poeira e areia entram pela manga superior e abrasam o retentor. Recomendação: instale protetores de bengala (fork boots ou neoprene wrap) se for fazer trilha com frequência. Custo: R$ 50–R$ 150 o par no ML. Troca dos retentores: ~R$ 300–R$ 500 em oficina especializada. Óleo de garfo recomendado no reabastecimento: SAE 5W ou BMW fork fluid — não misture viscosidades.',
  },
]

const F850GS_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma F 850 GS: mesmo ritmo da F 800 GS com velas mais duráveis',
    body: '1.000 km — Revisão de rodagem (dealer). | 10.000 km — Óleo 5W-40 sintético (3,0L) + filtro HF160RC + corrente lubrificada + freios verificados. | 20.000 km — Tudo do 10k + 2 velas NGK LMAR8J-9E + filtro de ar (HFA7801 ou Hiflofiltro) + folga de válvulas verificada + fluido de freio DOT 4 + fluido de embreagem (sistema hidráulico — DOT 4 também). | 30.000 km — Tudo do 20k + óleo de garfo + revisão do kit corrente. | Refrigerante: troque a cada 4 anos com refrigerante BMW ou equivalente G12++/G13.',
  },
]

// ─── R 1200 GS ───────────────────────────────────────────────────────────────

const R1200GS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor Boxer Twin air/water: o mais famoso do mundo das motos aventureiras',
    body: 'O motor Boxer Twin da R 1200 GS LC (2013–2018) é refrigerado a ar e óleo com cabeçotes refrigerados a água — a BMW chama de "Wethead". Óleo: SAE 5W-40 API SL/JASO MA2, 4,0L com filtro. Filtro de óleo: BMW 11427721779 ou alternativo Mahle OC605 (R$ 60–R$ 100). Vela: NGK LMAR8D-J, gap 0,8 mm — são 2 velas (uma por cilindro). Troca de velas a cada 20.000 km. O Boxer gira na horizontal — os cilindros ficam expostos ao ar e ao impacto. Instale protetor de cabeçote (cylinder head guard) em uso off-road: R$ 200–R$ 500 o par.',
  },
  {
    severity: 'DANGER',
    title: 'Cardan (eixo de transmissão): recall e problema crônico — inspecione sempre',
    body: 'A BMW emitiu recall para R 1200 GS fabricadas entre maio de 2012 e julho de 2013 por defeito no retentor do eixo cardan. O retentor expulso provoca vazamento de óleo no pneu traseiro — risco gravíssimo de perda de controle. Além do recall, motos R 1200 GS LC 2013–2018 apresentam problemas de desgaste no cardan após 60.000–80.000 km. Sintoma: ruído de "clunk" ao soltar a embreagem, vibração no eixo traseiro em aceleração. Solução: troca do kit de rolamentos e retentor do cardan (~R$ 1.500–R$ 3.000 em peças + mão de obra). Troque o óleo do cardan a cada 20.000 km: 180 ml de óleo 75W-90 GL-5.',
  },
  {
    severity: 'OK',
    title: 'Diagnóstico BMW GS-911: ferramenta indispensável para a R 1200 GS',
    body: 'A R 1200 GS tem dezenas de sensores e módulos eletrônicos (ABS, ASC, ESA, DDC, tire pressure, EVO). O GS-911 WiFi (R$ 600–R$ 900 importado, versão pessoal) lê todos os módulos. Alternativa brasileira: o app "MotoBM" funciona com adaptador OBD2 BMW Motorrad (R$ 150–R$ 300). Com essas ferramentas você: lê e apaga DTCs, calibra o controle de pressão de pneus, reseta o indicador de revisão, calibra o ângulo do volante. Mecânicos especializados em BMW em SP, RJ e BH geralmente possuem o GS-911 Professional — cobram R$ 150–R$ 300 por sessão de diagnóstico.',
  },
  {
    severity: 'WARN',
    title: 'Óleo do câmbio e cardan: dois sistemas separados — não esqueça o câmbio',
    body: 'A R 1200 GS tem dois sistemas de lubrificação além do motor: 1) Caixa de câmbio — óleo SAE 75W-90 GL-5, aproximadamente 0,75–0,85L. Troque a cada 20.000 km (junto com o cardan). 2) Cardan — óleo SAE 75W-90 GL-5, 180 ml. Muitos proprietários novatos só trocam o óleo do motor e esquecem câmbio e cardan por anos. Câmbio com óleo velho: engate mais duro, especialmente de 1ª para 2ª no frio. Cardan com óleo velho: aceleração do desgaste dos rolamentos.',
  },
  {
    severity: 'OK',
    title: 'Proteção para uso off-road: guard kit é essencial em trilhas',
    body: 'Para uso off-road com a R 1200 GS, priorize estes acessórios de proteção: 1) Protetor de motor (engine guard/bash plate) — protege o cárter em pedras e queda. 2) Protetor de cabeçote (cylinder head guard) — os cilindros horizontais são os primeiros a bater em quedas. 3) Protetor de mão (hand guard) — protege os controles em queda em baixa velocidade. 4) Slider deslizante — permite a moto deslizar em queda sem dobrar o guidão. Marcas recomendadas disponíveis no Brasil: Wunderlich, SW-Motech, Touratech.',
  },
]

const R1200GS_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Bengala frontal Telelever: sistema único — não existe em nenhuma outra marca',
    body: 'A R 1200 GS usa o sistema Telelever (ou EVO Telelever) — não é uma bengala convencional. O sistema usa um braço de controle que elimina o mergulho no freio dianteiro. Vantagem: melhor controle em frenagem e curvas. Desvantagem: manutenção mais cara e complexa — o cubo da roda frontal é parte do sistema. Retentores de vedação do Telelever: troque a cada 40.000 km (não exige troca de óleo de garfo como uma bengala convencional). Em quedas laterais, o EVO Telelever pode ser danificado — inspeção visual obrigatória após qualquer queda.',
  },
  {
    severity: 'WARN',
    title: 'Termostato: falha causa superaquecimento do motor Boxer',
    body: 'O termostato da R 1200 GS LC pode falhar "fechado" — motor aquece demais no trânsito urbano. Sintoma: temperatura subindo rapidamente em cidade, ventoinha ligando constantemente, motor difícil de ligar a quente. Solução: troca do termostato (~R$ 200–R$ 400 em peça). Na GS com cabeçotes refrigerados a água, superaquecimento pode empenar junta do cabeçote — pare imediatamente se a temperatura ultrapassar o normal. Custo de troca de junta de cabeçote: R$ 1.500–R$ 3.000 em mão de obra.',
  },
  {
    severity: 'WARN',
    title: 'Válvulas de cabeçote: verificação obrigatória a cada 20.000 km — sistema shim-and-bucket',
    body: 'O cabeçote da R 1200 GS LC usa sistema shim-and-bucket para regulagem de válvulas. A regulagem em si não é cara mas exige desmontagem dos cabeçotes (motor Boxer — cada cilindro é removível separadamente). Folgas: IN 0,10–0,15 mm / EX 0,20–0,25 mm (motor frio). Se ouvir tiquetaque metálico em aceleração leve, as válvulas podem estar folgadas. Válvulas apertadas demais são silenciosas mas queimam os assentos — mais perigoso. Inspeção a cada 20.000 km é obrigatória.',
  },
]

const R1200GS_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma R 1200 GS LC (2013–2018): revisão a cada 10.000 km',
    body: '1.000 km — Revisão de rodagem: óleo 5W-40 + filtro + aperto geral. | 10.000 km — Óleo 5W-40 (4,0L) + filtro Mahle OC605 + freios + nível refrigerante + correia do alternador (se aplicável) + corrente lubrificada. | 20.000 km — Tudo do 10k + 2 velas NGK LMAR8D-J + filtro de ar + folga de válvulas + óleo câmbio (75W-90, 0,8L) + óleo cardan (75W-90, 180 ml) + fluido de freio DOT 4. | 40.000 km — Tudo do 20k + Telelever: inspecione os rolamentos do braço de controle frontal. | Refrigerante (cabeçotes): troque a cada 4 anos.',
  },
]

// ─── R 1250 GS ───────────────────────────────────────────────────────────────

const R1250GS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'ShiftCam: tecnologia variável de válvulas exclusiva da BMW — e exige cuidado extra com óleo',
    body: 'A R 1250 GS (2019+) tem o sistema ShiftCam — variação de timing de válvula eletrônica que a BMW desenvolveu para melhorar torque em baixo e potência em cima. É a única moto de grande produção com VVT (Variable Valve Timing). Isso exige cuidado redobrado com o óleo: use exclusivamente sintético 5W-40 de qualidade certificada (BMW Motorrad Advantec Ultimate ou equivalente Mobil 1 Racing 4T). O ShiftCam é acionado eletrohidraulicamente — óleo velho ou de má qualidade entope os canais internos e danifica o atuador. Troca de óleo: a cada 10.000 km (não estenda).',
  },
  {
    severity: 'WARN',
    title: 'Sensor ASA (Angular Sensor Accelerometer): recalibre após quedas ou desmontagem',
    body: 'A R 1250 GS tem ASA (Sensor Angular Acelerômetro) que monitora inclinação e aceleração para os sistemas DTC (controle de tração), ABS Pro e Hill Start Control. Após qualquer queda, desmontagem da moto ou instalação de acessórios pesados (baús, proteção de motor), recalibre o ASA via GS-911 ou na concessionária. Sistema desalibrado = ABS e DTC reagindo incorretamente. Custo de calibração na dealer: R$ 200–R$ 400.',
  },
  {
    severity: 'OK',
    title: 'Cardan com maior intervalo de troca na R 1250 GS que na R 1200 GS',
    body: 'A R 1250 GS mantém a transmissão por cardan mas com aprimoramentos. Troca do óleo do cardan: a cada 20.000 km (75W-90 GL-5, 180 ml). Câmbio: 75W-90 GL-5, ~0,8L, também a cada 20.000 km. A BMW aprimorou o retentor do cardan após os problemas da R 1200 GS LC — mas a inspeção periódica continua importante. Sinal de vazamento do cardan: mancha de óleo na roda traseira ou no monoshock. Não ignore — óleo no pneu = risco de acidente.',
  },
  {
    severity: 'WARN',
    title: 'Pneus Bridgestone T32 de fábrica: trocá-los muda completamente o comportamento da moto',
    body: 'A R 1250 GS de fábrica vem com Bridgestone Adventure Trail T32 — pneu com boa aderência na chuva e vida útil razoável. Para donos que fazem mais off-road: Metzeler Karoo 4 ou Continental TKC80. Para uso 100% on-road: Bridgestone Battlax A41 ou Michelin Pilot Road 5 Trail. Calibragem: 2,5 bar (36 psi) frente / 2,9 bar (42 psi) atrás solo; 2,5 bar frente / 3,0 bar atrás com garupa. Com baús cheios: acrescente 0,2 bar no traseiro.',
  },
]

const R1250GS_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'ShiftCam: atuador pode apresentar falhas — sintoma é perda de potência em baixo RPM',
    body: 'O atuador do ShiftCam (mecanismo eletromagnético que alterna o perfil de came) pode apresentar sujeira nos canais hidráulicos causando falha no switch de torque para potência. Sintoma: moto "achatada" em baixo RPM, não tem o pull torque característico. Diagnóstico: GS-911 mostra falha no módulo do ShiftCam. Prevenção: use exclusivamente óleo sintético de qualidade certificada e troque a cada 10.000 km sem exceções. Custo de reparo do atuador ShiftCam fora da garantia: R$ 2.000–R$ 5.000.',
  },
  {
    severity: 'WARN',
    title: 'Bateria não segura carga após longos períodos parada: problema comum',
    body: 'R 1250 GS tem muitos módulos eletrônicos em stand-by que drenam a bateria lentamente mesmo com moto desligada (drain de ~5–8 mA). Moto parada mais de 3 semanas sem uso: bateria descarrega. Solução: conectar carregador de manutenção BMW (ou CTEK, Optimate) quando em desuso. Bateria original BMW (AGM, 12 Ah): ~R$ 800–R$ 1.200. Alternativa: Yuasa AGM 12Ah (R$ 400–R$ 600). Não use carregador de chumbo-ácido convencional — danifica a AGM.',
  },
]

const R1250GS_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma R 1250 GS (2019+): ShiftCam exige óleo rigoroso',
    body: '1.000 km — Revisão obrigatória no dealer (ShiftCam exige primeiro aperto rigoroso). | 10.000 km — Óleo sintético 5W-40 BMW Advantec Ultimate (4,0L) + filtro OC605 + freios + nível refrigerante. | 20.000 km — Tudo do 10k + 2 velas NGK LMAR8D-J + filtro de ar + folga de válvulas (IN 0,10–0,15 / EX 0,20–0,25 mm) + óleo câmbio + óleo cardan + fluido de freio DOT 4. | 40.000 km — Tudo do 20k + rolamentos do EVO Telelever. | Calibragem: 2,5 bar frente / 2,9 bar atrás (solo).',
  },
]

// ─── S 1000 RR ───────────────────────────────────────────────────────────────

const S1000RR_MACETES: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Superbike com custo de manutenção proporcional à performance — R$ 2.000–R$ 5.000 por revisão maior',
    body: 'A S 1000 RR é uma superbike de competição homologada para a rua. Revisão maior (30.000 km): inclui 4 velas NGK LMAR9FI-10G (R$ 200+ cada), filtro de ar, folga das 16 válvulas, óleo de garfo + fluido de freio. Total: R$ 2.000–R$ 5.000 em mão de obra + peças na concessionária. Alternativa: mecânicos especializados em motos esportivas cobram 30–50% menos. Necessário: GS-911 ou scanner BMW para configurar TDC e resetar indicadores. Não há atalhos — é uma moto de alto rendimento e cada componente é crítico.',
  },
  {
    severity: 'OK',
    title: 'Óleo: 5W-40 sintético JASO MA2, 4,5L — nunca use óleo de carro',
    body: 'A S 1000 RR usa 4,5L de óleo SAE 5W-40 API SJ/JASO MA2 com filtro. BMW recomenda Motorrad Advantec Ultimate 5W-40. Alternativas de qualidade: Motul 300V Factory (R$ 200+ por litro, literalmente de competição), Mobil 1 Racing 4T 10W-40 (JASO MA2, R$ 60–R$ 80/L). NUNCA use óleo para carro (SJ sem JASO MA) — a embreagem molhada deslizará. Intervalo: 10.000 km ou 1 ano. Em uso em circuito (track day): troque após cada sessão pesada — o óleo degrada muito mais rápido em alta rotação sustentada.',
  },
  {
    severity: 'DANGER',
    title: 'Bateria de lítio original: carregador específico obrigatório, sem exceção',
    body: 'A S 1000 RR (2019+) vem de fábrica com bateria de lítio (LiFePO4) — mais leve que AGM e ótima para performance. Porém: NUNCA carregue com carregador de chumbo-ácido ou AGM — danifica irreversivelmente a química de lítio. Use carregador com modo Lithium explícito: CTEK US 3300 (modo Li), Optimate Lithium 0.8A, ou o carregador BMW original. Custo de bateria de lítio original: R$ 1.500–R$ 2.500. Alternativa: Shorai LFX21A6 ou Ballistic Evo2 (R$ 800–R$ 1.200). Em períodos de guarda longa: remova a bateria e armazene em temperatura ambiente com 50–70% de carga.',
  },
  {
    severity: 'OK',
    title: 'Pneus Pirelli Diablo Supercorsa SP de fábrica: durabilidade MUITO baixa em uso de rua',
    body: 'A S 1000 RR é entregue com Pirelli Diablo Supercorsa SP — pneu de corrida homologado para rua. Durabilidade em uso normal de rua: 3.000–5.000 km (dianteiro) e 2.000–3.500 km (traseiro). Se usar no circuito também, reduz para metade. Alternativa mais durável para uso diário: Pirelli Diablo Rosso IV Corsa (6.000–10.000 km no traseiro), Bridgestone RS11 ou Michelin Power GP2. Calibragem de rua: 2,5 bar frente / 2,9 bar atrás frios. Para circuito: consulte as recomendações específicas de temperatura e carga do pneu.',
  },
  {
    severity: 'WARN',
    title: 'DDC (Dynamic Damping Control): calibre os amortecedores para o seu peso e uso',
    body: 'A S 1000 RR M Package tem amortecedores DDC (eletrônicos). A configuração de fábrica é para uso de pista — pode ser desconfortável para uso na rua. Configure via menu da moto (Road, Dynamic, Rain, Race) ou via BMW Motorrad Connected App. Para uso misto (rua + pista): modo Road com DDC em "conforto" na rua, alterando para "Sport" ou "Dynamic" antes de entrar no circuito. A calibração errada do DDC pode fazer a moto "pular" em lombadas — incômodo e potencialmente perigoso em alta velocidade.',
  },
]

const S1000RR_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Sensor de marcha (gear position sensor): falha em modelos antigos de transmissão automática',
    body: 'Alguns modelos S 1000 RR (2019–2022) apresentaram falha no sensor de posição de marcha, causando leituras incorretas no painel ou erros de marcha no quickshifter. Sintoma: marcha errada no display, quickshifter não funciona, moto "gagueja" em trocas rápidas. Diagnóstico: GS-911. Solução: substituição do sensor de posição ($R 300–R$ 600 peça). A BMW atualizou o firmware em revisões para corrigir comportamentos errôneos — mantenha o software da moto atualizado.',
  },
  {
    severity: 'WARN',
    title: 'Corrente de distribuição (cam chain): ruído a frio indica desgaste prematuro',
    body: 'O motor S 1000 RR de 4 cilindros em linha usa corrente de distribuição (cam chain). Ruído de "chacoalho" nos primeiros segundos após a partida a frio (que some ao aquecer) indica corrente de distribuição desgastada. Isso é mais grave que parece — corrente desgastada pode pular um dente e fundir o motor. Em uso no circuito (altas rotações), o desgaste é acelerado. Troca preventiva recomendada: a cada 40.000–50.000 km ou imediatamente se o ruído aparecer. Custo: R$ 2.000–R$ 4.000 em peças + mão de obra.',
  },
]

const S1000RR_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma S 1000 RR (2019+): intervalos maiores, custo por revisão maior',
    body: '1.000 km — Revisão de rodagem obrigatória (dealer). | 10.000 km — Óleo 5W-40 sintético (4,5L) + filtro HF160 + freios verificados + ar filtrado. | 20.000 km — Tudo do 10k + fluido de freio DOT 4 + fluido de embreagem DOT 4 + verificação da correia de distribuição. | 30.000 km — Tudo do 20k + 4 velas NGK LMAR9FI-10G + filtro de ar + folga das 16 válvulas + óleo de garfo (30.000 km). | Em uso de circuito: óleo a cada 5.000 km ou após 3 sessões pesadas de pista. Calibragem: 2,5 bar frente / 2,9 bar atrás.',
  },
]

// ─── S 1000 R ────────────────────────────────────────────────────────────────

const S1000R_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Naked com o mesmo motor da S 1000 RR — mas mapeado para uso mais civilizado',
    body: 'A S 1000 R usa essencialmente o mesmo motor da S 1000 RR, mas com mapeamento otimizado para conforto e uso na rua — tem curva de torque mais plana e aceleração mais suave. Óleo: 5W-40 sintético JASO MA2, 4,5L. Filtro de óleo: HF160 (Hiflofiltro, R$ 50–R$ 80). Manutenção semelhante à S 1000 RR mas sem a pressão do ambiente de circuito. Intervalo de velas: 30.000 km (4 velas NGK LMAR9FI-10G). Um dos naked com melhor custo-benefício no segmento supernaked — mais prático que a RR no dia a dia.',
  },
  {
    severity: 'WARN',
    title: 'Pneus: calibre corretamente para a riding position agressiva',
    body: 'A S 1000 R tem posição de pilotagem agressiva que carrega mais o pneu dianteiro que motos naked convencionais. Calibragem: 2,5 bar frente / 2,9 bar atrás (solo, frios). Com garupa: 2,5 bar frente / 3,0 bar atrás. Pneus de fábrica: variados conforme o ano — verifique na plaqueta na moto. Para uso misto (rua + curvas) o Pirelli Diablo Rosso IV ou Michelin Power GP2 são os preferidos pelos donos.',
  },
]

const S1000R_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Quickshifter de série: calibração incorreta pode causar falha de marcha em alta RPM',
    body: 'A S 1000 R vem com quickshifter de série. Em alguns exemplares, a calibração pode não estar otimizada para todos os tipos de uso — trocas em RPM muito baixo (abaixo de 4.000) podem gaguejear. Solução: use o quickshifter preferencialmente acima de 4.000 RPM. A BMW disponibiliza atualizações de mapa via concessionária — solicite sempre na revisão.',
  },
]

const S1000R_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma S 1000 R: semelhante à RR com menor demanda de uso de pista',
    body: '10.000 km — Óleo 5W-40 (4,5L) + filtro. | 20.000 km — Óleo + filtro + fluido de freio DOT 4. | 30.000 km — Tudo do 20k + 4 velas NGK LMAR9FI-10G + filtro de ar + folga das 16 válvulas + óleo de garfo. | Calibragem: 2,5 bar frente / 2,9 bar atrás. Freio: pastilha dianteira Galfer ou EBC HH (mais performance e durabilidade que a original a custo similar).',
  },
]

// ─── F 750 GS ────────────────────────────────────────────────────────────────

const F750GS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor compartilhado com a F 850 GS: mesma base, menos potência — manutenção idêntica',
    body: 'A F 750 GS usa o mesmo motor bicilíndrico paralelo da F 850 GS (853cc), mas com mapeamento de injeção para 77 cv (vs 95 cv da F 850 GS). A manutenção é praticamente idêntica: mesmo filtro de óleo (HF160RC), mesma vela (NGK LMAR8J-9E), mesmos intervalos. Isso é vantagem: mecânicos que conhecem a F 850 GS conhecem a F 750 GS. Diferença principal: sem modo off-road ASC+ABS na versão básica.',
  },
  {
    severity: 'OK',
    title: 'Calibragem: 2,2 bar frente / 2,5 bar atrás — aro 19" exige atenção',
    body: 'A F 750 GS tem aro 21" dianteiro (como a F 850 GS). Calibragem: 2,2 bar (32 psi) frente / 2,5 bar (36 psi) atrás solo. Com garupa: 2,3 bar frente / 2,9 bar atrás. Os pneus de aventura de 21" têm parede lateral mais alta — toleram variação de pressão sem deformar visivelmente, mas operam mal fora da faixa correta. Verifique com pneus frios (moto parada há mais de 2h).',
  },
]

const F750GS_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Mesmos riscos da F 850 GS: bateria AGM e retentores de bengala são os pontos críticos',
    body: 'A F 750 GS compartilha os mesmos pontos de atenção da F 850 GS: 1) Bateria AGM que não aceita carregador convencional — use CTEK, Optimate ou BMW original. 2) Retentores de bengala que vazam com uso off-road intenso — instale protetores de bengala preventivamente. 3) Corrente 525 que precisa de lubrificação frequente. Revisão 10.000 km inclui verificação dos dois.',
  },
]

const F750GS_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma F 750 GS: igual ao da F 850 GS',
    body: '1.000 km — Revisão dealer. | 10.000 km — Óleo 5W-40 (3,0L) + filtro HF160RC + corrente + freios. | 20.000 km — Tudo do 10k + 2 velas NGK LMAR8J-9E + filtro de ar + folga de válvulas + fluido de freio DOT 4. | 30.000 km — Óleo de garfo. | Calibragem: 2,2 bar frente / 2,5 bar atrás.',
  },
]

// ─── R nineT ─────────────────────────────────────────────────────────────────

const RNINET_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor Boxer 1.170cc air/oil: a identidade do café racer BMW — manutenção simples e acessível',
    body: 'A R nineT tem motor Boxer Twin 1.170cc air/oil-cooled de 110 cv. Sem água para refrigerar (diferente da R 1200 GS LC "Wethead") — manutenção mais simples. Óleo: SAE 15W-50 API SJ/JASO MA2, 3,8L com filtro. Recomendado: BMW Motorrad Advantec Ultimate ou equivalente Motul 7100 15W-50. Filtro de óleo: Hiflofiltro HF164 (R$ 40–R$ 70) — equivalente ao BMW 11427673541. Intervalo de troca: 10.000 km ou 1 ano.',
  },
  {
    severity: 'WARN',
    title: 'Vela NGK MAR8B-JDS: gap 0,8 mm — são 2 velas (uma por cilindro Boxer)',
    body: 'A R nineT usa 2 velas NGK MAR8B-JDS (uma em cada cilindro horizontal). Gap: 0,8 mm. Troca a cada 20.000 km. Custo: R$ 100–R$ 180 por vela, R$ 200–R$ 360 o par. A mesma vela também é usada na R 1200 GS "Camhead" (anterior ao LC). Acesso às velas no Boxer: o cilindro esquerdo (lado do cavalete) fica acessível facilmente; o cilindro direito exige remover a tampa lateral ou inclinar a moto — aprenda a fazer sozinho (vídeos específicos no YouTube).',
  },
  {
    severity: 'OK',
    title: 'Eixo traseiro com transmissão por cardan: troque o óleo a cada 20.000 km',
    body: 'A R nineT usa transmissão por cardan (eixo cardã) — sem corrente para lubrificar. Troque o óleo do cardan a cada 20.000 km: 180 ml de SAE 70W-80 hipóide. Também troque o óleo do câmbio: ~0,75L de 75W-90 GL-5. Muitos donos de R nineT esquecem esses óleos porque não há corrente visível para lembrar. Sintoma de óleo velho no cardan: ruído "clunk" ao engatar 1ª ou ao liberar a embreagem devagar.',
  },
  {
    severity: 'OK',
    title: 'Personalização: o mercado de acessórios da R nineT é um dos mais ricos do mundo',
    body: 'A R nineT foi projetada para personalização. Marcas de acessórios disponíveis no Brasil (com importação facilitada): Wunderlich, SW-Motech, Hepco & Becker, Motogadget. Para estilo café racer: guidão clip-on Renthal (R$ 300–R$ 600), banco plano monoposto (R$ 500–R$ 1.500), escapamento Akrapovic (R$ 3.000–R$ 8.000 importado). Para touring: mala lateral Hepco & Becker (R$ 2.000–R$ 4.000). O quadro tubular exposto permite instalação de protetor de quadro (sliders) sem danificar a aparência.',
  },
]

const RNINET_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Superaquecimento em trânsito urbano: Boxer air-cooled não gosta de ficar parado',
    body: 'O motor Boxer air/oil-cooled da R nineT é resfriado pelo ar em movimento. No trânsito de SP ou RJ (moto parada 10–15 minutos no calor de 35°C), a temperatura sobe bastante — a ventoinha auxilia mas não é suficiente para trânsito intenso prolongado. Sintomas: aumento da temperatura da carcaça, cheiro forte de óleo quente, piloto sente calor excessivo na perna esquerda (junto ao cilindro). Soluções: 1) Não deixe a moto em ralenti por mais de 5 minutos parada. 2) Use óleo sintético 15W-50 de qualidade (Motul 7100, Shell Advance Racing). 3) Ande sempre que possível — o Boxer precisa do ar.',
  },
  {
    severity: 'WARN',
    title: 'Folga de válvulas: verifique a cada 10.000 km — Boxer exige atenção frequente',
    body: 'O Boxer da R nineT tem folga de válvulas que requer verificação a cada 10.000 km (2× mais frequente que a maioria das motos modernas). Folgas: IN 0,15–0,20 mm / EX 0,25–0,30 mm (motor completamente frio — mínimo 4h parado). A frequência maior é característica dos motores Boxer de alto comprimento de curso. Válvulas apertadas = partida difícil, perda de compressão. Válvulas folgadas = ruído de "tique-taque" em aceleração. Custo de verificação em mecânico especializado: R$ 200–R$ 400 sem troca de shims. Se precisar trocar shims: adicione R$ 100–R$ 300 em peças.',
  },
]

const RNINET_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma R nineT: válvulas a cada 10.000 km é o diferencial',
    body: '1.000 km — Revisão de rodagem: óleo 15W-50 + filtro HF164. | 10.000 km — Óleo 15W-50 (3,8L) + filtro HF164 + folga de válvulas verificada (IN 0,15–0,20 / EX 0,25–0,30 mm) + freios. | 20.000 km — Tudo do 10k + 2 velas NGK MAR8B-JDS (gap 0,8 mm) + filtro de ar + óleo cardan (70W-80, 180ml) + óleo câmbio (75W-90, 0,75L) + fluido de freio DOT 4 + óleo do eixo traseiro. | 40.000 km — Tudo do 20k + óleo de garfo. | Calibragem: 2,5 bar frente / 2,7 bar atrás (solo).',
  },
]

// ─── Blocos de modelos ────────────────────────────────────────────────────────

const bmwModels: ModelBlock[] = [
  {
    modelName: 'G 310 GS',
    yearFrom: 2018,
    yearTo: null,
    MACETES: G310GS_MACETES,
    PROBLEMAS: G310GS_PROBLEMAS,
    MANUTENCAO: G310GS_MANUTENCAO,
  },
  {
    modelName: 'G 310 R',
    yearFrom: 2017,
    yearTo: null,
    MACETES: G310R_MACETES,
    PROBLEMAS: G310R_PROBLEMAS,
    MANUTENCAO: G310R_MANUTENCAO,
  },
  {
    modelName: 'F 800 GS',
    yearFrom: 2008,
    yearTo: 2018,
    MACETES: F800GS_MACETES,
    PROBLEMAS: F800GS_PROBLEMAS,
    MANUTENCAO: F800GS_MANUTENCAO,
  },
  {
    modelName: 'F 850 GS',
    yearFrom: 2018,
    yearTo: null,
    MACETES: F850GS_MACETES,
    PROBLEMAS: F850GS_PROBLEMAS,
    MANUTENCAO: F850GS_MANUTENCAO,
  },
  {
    modelName: 'F 750 GS',
    yearFrom: 2018,
    yearTo: null,
    MACETES: F750GS_MACETES,
    PROBLEMAS: F750GS_PROBLEMAS,
    MANUTENCAO: F750GS_MANUTENCAO,
  },
  {
    modelName: 'R 1200 GS',
    yearFrom: 2013,
    yearTo: 2018,
    MACETES: R1200GS_MACETES,
    PROBLEMAS: R1200GS_PROBLEMAS,
    MANUTENCAO: R1200GS_MANUTENCAO,
  },
  {
    modelName: 'R 1250 GS',
    yearFrom: 2019,
    yearTo: null,
    MACETES: R1250GS_MACETES,
    PROBLEMAS: R1250GS_PROBLEMAS,
    MANUTENCAO: R1250GS_MANUTENCAO,
  },
  {
    modelName: 'S 1000 RR',
    yearFrom: 2019,
    yearTo: null,
    MACETES: S1000RR_MACETES,
    PROBLEMAS: S1000RR_PROBLEMAS,
    MANUTENCAO: S1000RR_MANUTENCAO,
  },
  {
    modelName: 'S 1000 R',
    yearFrom: 2021,
    yearTo: null,
    MACETES: S1000R_MACETES,
    PROBLEMAS: S1000R_PROBLEMAS,
    MANUTENCAO: S1000R_MANUTENCAO,
  },
  {
    modelName: 'R 1200 Nine T',
    yearFrom: 2014,
    yearTo: null,
    MACETES: RNINET_MACETES,
    PROBLEMAS: RNINET_PROBLEMAS,
    MANUTENCAO: RNINET_MANUTENCAO,
  },
]

// ─── Calibragem de pneus ──────────────────────────────────────────────────────

const bmwTirePressures: TirePressureInput[] = [
  {
    modelName: 'G 310 GS',
    yearFrom: 2018,
    yearTo: null,
    tireSize: 'Dianteiro 110/70 R19 | Traseiro 150/70 R17',
    frontPsi: 25,
    rearPsi: 28,
    frontPsiLoad: 28,
    rearPsiLoad: 32,
    notes: 'Aro 19" dianteiro é peculiaridade GS — pneus menos disponíveis no Brasil. Pirelli Scorpion Rally STR ou Continental Trail Attack são as opções mais comuns. Com garupa: dianteiro 28 PSI, traseiro 32 PSI. Verifique sempre com pneus frios (moto parada >2h). Nunca ultrapasse 36 PSI no traseiro — vibração do motor monocilíndrico desgasta pneus com sobrepressão.',
  },
  {
    modelName: 'G 310 R',
    yearFrom: 2017,
    yearTo: null,
    tireSize: 'Dianteiro 110/70-17 | Traseiro 150/60-17',
    frontPsi: 29,
    rearPsi: 32,
    frontPsiLoad: 32,
    rearPsiLoad: 36,
    notes: 'Aro 17" nos dois eixos — muito mais fácil encontrar pneus que a G 310 GS. Pirelli Diablo Rosso III ou IV são as escolhas mais comuns para uso esportivo. Solo: 29/32 PSI. Com garupa ou carga: 32/36 PSI.',
  },
  {
    modelName: 'F 800 GS',
    yearFrom: 2008,
    yearTo: 2018,
    tireSize: 'Dianteiro 90/90-21 | Traseiro 150/70-17',
    frontPsi: 33,
    rearPsi: 36,
    frontPsiLoad: 36,
    rearPsiLoad: 42,
    notes: 'Aro 21" dianteiro — menos comum. On-road: 33/36 PSI. Off-road suave (terra batida): reduzir para 26/29 PSI. Off-road técnico (pedra, lama): 22/26 PSI (cuidado — não fique com pressão baixa por muito tempo em pavimento). Com baús e garupa: 36/42 PSI. Pneus Metzeler Karoo Street ou Continental TKC80 são os preferidos pelos aventureiros.',
  },
  {
    modelName: 'F 850 GS',
    yearFrom: 2018,
    yearTo: null,
    tireSize: 'Dianteiro 90/90-21 | Traseiro 150/70-17',
    frontPsi: 33,
    rearPsi: 36,
    frontPsiLoad: 36,
    rearPsiLoad: 42,
    notes: 'Mesmas medidas e recomendações da F 800 GS. On-road: 33/36 PSI. Off-road suave: 26/29 PSI. Com baús: 36/42 PSI. Pirelli Scorpion Rally STR e Metzeler Karoo 4 são as escolhas mais populares no Brasil para esta versão.',
  },
  {
    modelName: 'F 750 GS',
    yearFrom: 2018,
    yearTo: null,
    tireSize: 'Dianteiro 90/90-21 | Traseiro 150/70-17',
    frontPsi: 32,
    rearPsi: 36,
    frontPsiLoad: 36,
    rearPsiLoad: 42,
    notes: 'Aro 21" dianteiro. On-road: 32/36 PSI (solo). Com garupa: 34/38 PSI. Com garupa e carga máxima: 36/42 PSI. Mesmas recomendações de pneu da F 850 GS.',
  },
  {
    modelName: 'R 1200 GS',
    yearFrom: 2013,
    yearTo: 2018,
    tireSize: 'Dianteiro 120/70 R19 | Traseiro 150/70 R17',
    frontPsi: 36,
    rearPsi: 42,
    frontPsiLoad: 36,
    rearPsiLoad: 42,
    notes: 'R 1200 GS LC (Wethead 2013–2018). Calibragem padrão: 36/42 PSI (2,5/2,9 bar) solo e com garupa. Moto pesada (~247 kg abastecida) — pressão mais alta que motos menores. Off-road: reduzir traseiro para 34 PSI. Pneus de fábrica variam por ano — Bridgestone A41, Metzeler Tourance Next são opções populares.',
  },
  {
    modelName: 'R 1250 GS',
    yearFrom: 2019,
    yearTo: null,
    tireSize: 'Dianteiro 120/70 R19 | Traseiro 150/70 R17',
    frontPsi: 36,
    rearPsi: 42,
    frontPsiLoad: 36,
    rearPsiLoad: 46,
    notes: 'R 1250 GS (2019+). Solo: 36/42 PSI (2,5/2,9 bar). Com garupa e bagagem: 36/46 PSI (adicionar 0,3 bar no traseiro para cada 15 kg de carga). Off-road leve: 33/38 PSI. Moto pesada (~249 kg) — nunca rode com pressão abaixo de 30 PSI no traseiro em pavimento.',
  },
  {
    modelName: 'S 1000 RR',
    yearFrom: 2019,
    yearTo: null,
    tireSize: 'Dianteiro 120/70 ZR17 | Traseiro 190/55 ZR17',
    frontPsi: 36,
    rearPsi: 42,
    frontPsiLoad: null,
    rearPsiLoad: null,
    notes: 'Calibragem de rua: 36/42 PSI (2,5/2,9 bar) frios. Para circuito: consulte as recomendações do pneu específico (geralmente 32/33 PSI quentes = iniciar com 28/30 PSI frios). Pneus Pirelli Supercorsa SP de fábrica têm curva de temperatura específica — não rende frio. Nunca rode com pressão acima de 2,9 bar a frio — aumenta rigidez e piora o feeling.',
  },
  {
    modelName: 'S 1000 R',
    yearFrom: 2021,
    yearTo: null,
    tireSize: 'Dianteiro 120/70 ZR17 | Traseiro 190/55 ZR17',
    frontPsi: 36,
    rearPsi: 42,
    frontPsiLoad: null,
    rearPsiLoad: null,
    notes: 'Mesmas medidas da S 1000 RR. Calibragem de rua: 36/42 PSI (2,5/2,9 bar) frios. A S 1000 R vem com Pirelli Diablo Rosso Corsa II ou similar de fábrica (mais durável que o Supercorsa SP da RR). Verificar sempre com pneus frios.',
  },
  {
    modelName: 'R 1200 Nine T',
    yearFrom: 2014,
    yearTo: null,
    tireSize: 'Dianteiro 120/70 ZR17 | Traseiro 180/55 ZR17',
    frontPsi: 36,
    rearPsi: 39,
    frontPsiLoad: 36,
    rearPsiLoad: 42,
    notes: 'Solo: 36/39 PSI (2,5/2,7 bar). Com garupa: 36/42 PSI. O traseiro 180mm é mais estreito que o da S 1000 RR (190mm) — opções de pneu: Michelin Road 5, Pirelli Diablo Rosso IV, Bridgestone T32. O peso (~222 kg) combinado com o Boxer gera feeling diferente na curva — pressão calibrada é crucial para manter o perfil correto.',
  },
]

// ─── Cronogramas de manutenção ────────────────────────────────────────────────

const bmwMaintenanceItems: MaintenanceItemInput[] = [

  // ── G 310 GS ───────────────────────────────────────────────────────────────
  { modelName: 'G 310 GS', yearFrom: 2018, yearTo: null, order: 0,
    component: 'Óleo do motor (5W-40 JASO MA2 sintético)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume: 1,65L com filtro (1,4L sem). SAE 5W-40 API SJ, JASO MA2 obrigatório. Motul 7100 5W-40, Mobil 4T, Shell Advance AX7 15W-50. Filtro alternativo: Tecfil PSL633 ou Fram PH6017A.' },
  { modelName: 'G 310 GS', yearFrom: 2018, yearTo: null, order: 1,
    component: 'Vela NGK LMAR9D-J (gap 1,2 mm)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Gap incomum de 1,2 ± 0,1 mm. Motor TVS/BMW — use apenas NGK LMAR9D-J. Troca a cada 20.000 km.' },
  { modelName: 'G 310 GS', yearFrom: 2018, yearTo: null, order: 2,
    component: 'Filtro de ar', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Substituto: Tecfil ARM459/1 ou Fram FA-1791 (R$ 50–90 vs R$ 200+ original). Inspecione a cada 10.000 km em uso off-road.' },
  { modelName: 'G 310 GS', yearFrom: 2018, yearTo: null, order: 3,
    component: 'Corrente 520 — lubrificação', intervalKm: 500, intervalMonths: null, priority: 'HIGH',
    notes: 'Lubrificação a cada 500 km (200 km em chuva ou off-road). Tensão: 25–30 mm de folga na parte inferior. Kit completo a cada 20.000–25.000 km.' },
  { modelName: 'G 310 GS', yearFrom: 2018, yearTo: null, order: 4,
    component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'Troque a cada 2 anos. Sistema ABS: fluido degradado compromete a atuação dos solenoides do ABS.' },
  { modelName: 'G 310 GS', yearFrom: 2018, yearTo: null, order: 5,
    component: 'Folga de válvulas', intervalKm: 20000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Motor monocilíndrico. Verificação e ajuste a cada 20.000 km com motor completamente frio.' },
  { modelName: 'G 310 GS', yearFrom: 2018, yearTo: null, order: 6,
    component: 'Óleo de garfo (bengala dianteira)', intervalKm: 40000, intervalMonths: null, priority: 'LOW',
    notes: 'Troca a cada 40.000 km. Garfo convencional (diferente do Telelever da R GS). Inspecione retentores periodicamente.' },

  // ── G 310 R ────────────────────────────────────────────────────────────────
  { modelName: 'G 310 R', yearFrom: 2017, yearTo: null, order: 0,
    component: 'Óleo do motor (5W-40 JASO MA2 sintético)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume: 1,65L com filtro. Idêntico à G 310 GS. Filtro: Tecfil PSL633.' },
  { modelName: 'G 310 R', yearFrom: 2017, yearTo: null, order: 1,
    component: 'Vela NGK LMAR9D-J (gap 1,2 mm)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Mesma vela da G 310 GS. Gap: 1,2 mm.' },
  { modelName: 'G 310 R', yearFrom: 2017, yearTo: null, order: 2,
    component: 'Filtro de ar', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Tecfil ARM459/1 — intercambiável com a G 310 GS.' },
  { modelName: 'G 310 R', yearFrom: 2017, yearTo: null, order: 3,
    component: 'Corrente 520 — lubrificação', intervalKm: 500, intervalMonths: null, priority: 'HIGH',
    notes: 'A cada 500 km. Kit completo a cada 20.000–25.000 km.' },
  { modelName: 'G 310 R', yearFrom: 2017, yearTo: null, order: 4,
    component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'Troque a cada 2 anos.' },
  { modelName: 'G 310 R', yearFrom: 2017, yearTo: null, order: 5,
    component: 'Folga de válvulas', intervalKm: 20000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Verificar a cada 20.000 km com motor frio.' },

  // ── F 800 GS ───────────────────────────────────────────────────────────────
  { modelName: 'F 800 GS', yearFrom: 2008, yearTo: 2018, order: 0,
    component: 'Óleo do motor (15W-50 sintético)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume: 3,0L com filtro. SAE 15W-50 API SL, JASO MA. BMW Advantec Pro ou equivalente. Filtro alternativo: Hiflofiltro HF160RC (R$ 35–60).' },
  { modelName: 'F 800 GS', yearFrom: 2008, yearTo: 2018, order: 1,
    component: 'Vela NGK DCPR8E (2 velas)', intervalKm: 40000, intervalMonths: null, priority: 'HIGH',
    notes: 'Motor bicilíndrico = 2 velas. Gap: 0,7 mm. Troca a cada 40.000 km (intervalo longo).' },
  { modelName: 'F 800 GS', yearFrom: 2008, yearTo: 2018, order: 2,
    component: 'Filtro de ar', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Inspecione a cada 10.000 km. Troque a cada 20.000 km ou antes em uso off-road intenso.' },
  { modelName: 'F 800 GS', yearFrom: 2008, yearTo: 2018, order: 3,
    component: 'Folga de válvulas', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Verificação a cada 20.000 km com motor completamente frio.' },
  { modelName: 'F 800 GS', yearFrom: 2008, yearTo: 2018, order: 4,
    component: 'Corrente 525 — lubrificação', intervalKm: 500, intervalMonths: null, priority: 'HIGH',
    notes: 'A cada 500 km (200 km em off-road). Kit 525 completo a cada 20.000 km.' },
  { modelName: 'F 800 GS', yearFrom: 2008, yearTo: 2018, order: 5,
    component: 'Fluido de freio (DOT 4)', intervalKm: 20000, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'Troque a cada 2 anos ou 20.000 km.' },
  { modelName: 'F 800 GS', yearFrom: 2008, yearTo: 2018, order: 6,
    component: 'Refrigerante (troca completa)', intervalKm: null, intervalMonths: 48, priority: 'MEDIUM',
    notes: 'Troque a cada 4 anos. BMW ou equivalente G12++/G13. Inspecione bomba d\'água ao trocar o refrigerante.' },
  { modelName: 'F 800 GS', yearFrom: 2008, yearTo: 2018, order: 7,
    component: 'Óleo de garfo', intervalKm: 30000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Troque a cada 30.000 km. Retentores: inspecione a cada 10.000 km para vazamento.' },
  { modelName: 'F 800 GS', yearFrom: 2008, yearTo: 2018, order: 8,
    component: 'Bomba d\'água — inspeção', intervalKm: 20000, intervalMonths: null, priority: 'CRITICAL',
    notes: 'Ponto crítico da F 800 GS: inspecione a cada 20.000 km. Verifique o nível do refrigerante e a coloração do óleo (óleo branco-leitoso = mistura com refrigerante = falha grave).' },

  // ── F 850 GS ───────────────────────────────────────────────────────────────
  { modelName: 'F 850 GS', yearFrom: 2018, yearTo: null, order: 0,
    component: 'Óleo do motor (5W-40 sintético)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume: 3,0L com filtro. BMW Advantec Pro 5W-40 ou equivalente 15W-50. Filtro: HF160RC ou Mahle OC613.' },
  { modelName: 'F 850 GS', yearFrom: 2018, yearTo: null, order: 1,
    component: 'Vela NGK LMAR8J-9E (2 velas)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Motor bicilíndrico = 2 velas. Troca a cada 20.000 km.' },
  { modelName: 'F 850 GS', yearFrom: 2018, yearTo: null, order: 2,
    component: 'Filtro de ar (HFA7801)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Hiflofiltro HFA7801 ou Tecfil equivalente. Inspecione a cada 10.000 km.' },
  { modelName: 'F 850 GS', yearFrom: 2018, yearTo: null, order: 3,
    component: 'Folga de válvulas', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Verificação a cada 20.000 km com motor frio.' },
  { modelName: 'F 850 GS', yearFrom: 2018, yearTo: null, order: 4,
    component: 'Corrente 525 — lubrificação', intervalKm: 500, intervalMonths: null, priority: 'HIGH',
    notes: 'A cada 500 km (200 km em off-road). Kit completo a cada 20.000 km.' },
  { modelName: 'F 850 GS', yearFrom: 2018, yearTo: null, order: 5,
    component: 'Fluido de freio e embreagem (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'Sistema de embreagem hidráulico (DOT 4). Troque junto com o fluido de freio a cada 2 anos.' },
  { modelName: 'F 850 GS', yearFrom: 2018, yearTo: null, order: 6,
    component: 'Óleo de garfo', intervalKm: 30000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Troca a cada 30.000 km. Inspecione retentores para vazamento a cada revisão.' },
  { modelName: 'F 850 GS', yearFrom: 2018, yearTo: null, order: 7,
    component: 'Refrigerante (troca completa)', intervalKm: null, intervalMonths: 48, priority: 'LOW',
    notes: 'A cada 4 anos. BMW G12++ ou G13.' },

  // ── F 750 GS ───────────────────────────────────────────────────────────────
  { modelName: 'F 750 GS', yearFrom: 2018, yearTo: null, order: 0,
    component: 'Óleo do motor (5W-40 sintético)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume: 3,0L com filtro. Mesmo motor da F 850 GS — mesmas especificações.' },
  { modelName: 'F 750 GS', yearFrom: 2018, yearTo: null, order: 1,
    component: 'Vela NGK LMAR8J-9E (2 velas)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: '2 velas — mesmas da F 850 GS.' },
  { modelName: 'F 750 GS', yearFrom: 2018, yearTo: null, order: 2,
    component: 'Filtro de ar', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Mesmo filtro da F 850 GS.' },
  { modelName: 'F 750 GS', yearFrom: 2018, yearTo: null, order: 3,
    component: 'Corrente 525 — lubrificação', intervalKm: 500, intervalMonths: null, priority: 'HIGH',
    notes: 'A cada 500 km em uso normal.' },
  { modelName: 'F 750 GS', yearFrom: 2018, yearTo: null, order: 4,
    component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'Troque a cada 2 anos.' },
  { modelName: 'F 750 GS', yearFrom: 2018, yearTo: null, order: 5,
    component: 'Óleo de garfo', intervalKm: 30000, intervalMonths: null, priority: 'LOW',
    notes: 'A cada 30.000 km.' },

  // ── R 1200 GS ──────────────────────────────────────────────────────────────
  { modelName: 'R 1200 GS', yearFrom: 2013, yearTo: 2018, order: 0,
    component: 'Óleo do motor (5W-40 JASO MA2)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume: 4,0L com filtro. SAE 5W-40 API SL/JASO MA2 sintético. Mahle OC605 ou Hiflofiltro equivalente.' },
  { modelName: 'R 1200 GS', yearFrom: 2013, yearTo: 2018, order: 1,
    component: 'Vela NGK LMAR8D-J (2 velas)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Gap: 0,8 mm. Uma vela por cilindro Boxer. Troca a cada 20.000 km.' },
  { modelName: 'R 1200 GS', yearFrom: 2013, yearTo: 2018, order: 2,
    component: 'Filtro de ar', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Troca a cada 20.000 km.' },
  { modelName: 'R 1200 GS', yearFrom: 2013, yearTo: 2018, order: 3,
    component: 'Folga de válvulas (IN 0,10–0,15 / EX 0,20–0,25 mm)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Sistema shim-and-bucket. Motor completamente frio. IN: 0,10–0,15 mm. EX: 0,20–0,25 mm.' },
  { modelName: 'R 1200 GS', yearFrom: 2013, yearTo: 2018, order: 4,
    component: 'Óleo do cardan (75W-90 GL-5)', intervalKm: 20000, intervalMonths: 24, priority: 'HIGH',
    notes: '180 ml de SAE 75W-90 GL-5 hipóide. Não esqueça — transmissão por cardan não tem corrente visível para lembrar.' },
  { modelName: 'R 1200 GS', yearFrom: 2013, yearTo: 2018, order: 5,
    component: 'Óleo do câmbio (75W-90 GL-5)', intervalKm: 20000, intervalMonths: 24, priority: 'MEDIUM',
    notes: '~0,8L SAE 75W-90 GL-5. Troque junto com o cardan a cada 20.000 km.' },
  { modelName: 'R 1200 GS', yearFrom: 2013, yearTo: 2018, order: 6,
    component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 12, priority: 'MEDIUM',
    notes: 'BMW recomenda troca anual na primeira revisão, depois a cada 2 anos.' },
  { modelName: 'R 1200 GS', yearFrom: 2013, yearTo: 2018, order: 7,
    component: 'Refrigerante (cabeçotes refrigerados a água)', intervalKm: null, intervalMonths: 48, priority: 'MEDIUM',
    notes: 'Cabeçotes Wethead: troque a cada 4 anos. Use refrigerante BMW G12++ ou G13.' },

  // ── R 1250 GS ──────────────────────────────────────────────────────────────
  { modelName: 'R 1250 GS', yearFrom: 2019, yearTo: null, order: 0,
    component: 'Óleo do motor (5W-40 sintético — ShiftCam exige qualidade)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume: 4,0L. BMW Motorrad Advantec Ultimate 5W-40 obrigatório para ShiftCam. Mahle OC605 como filtro alternativo. Não use óleo semissintético ou de qualidade inferior.' },
  { modelName: 'R 1250 GS', yearFrom: 2019, yearTo: null, order: 1,
    component: 'Vela NGK LMAR8D-J (2 velas)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Gap: 0,8 mm. Uma por cilindro Boxer.' },
  { modelName: 'R 1250 GS', yearFrom: 2019, yearTo: null, order: 2,
    component: 'Filtro de ar', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Troca a cada 20.000 km.' },
  { modelName: 'R 1250 GS', yearFrom: 2019, yearTo: null, order: 3,
    component: 'Folga de válvulas (IN 0,10–0,15 / EX 0,20–0,25 mm)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Sistema shim-and-bucket. Motor frio. O ShiftCam adiciona complexidade à regulagem — necessário mecânico experiente.' },
  { modelName: 'R 1250 GS', yearFrom: 2019, yearTo: null, order: 4,
    component: 'Óleo do cardan (75W-90 GL-5)', intervalKm: 20000, intervalMonths: 24, priority: 'HIGH',
    notes: '180 ml de 75W-90 GL-5.' },
  { modelName: 'R 1250 GS', yearFrom: 2019, yearTo: null, order: 5,
    component: 'Óleo do câmbio (75W-90 GL-5)', intervalKm: 20000, intervalMonths: 24, priority: 'MEDIUM',
    notes: '~0,8L de 75W-90 GL-5.' },
  { modelName: 'R 1250 GS', yearFrom: 2019, yearTo: null, order: 6,
    component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'Troque a cada 2 anos.' },
  { modelName: 'R 1250 GS', yearFrom: 2019, yearTo: null, order: 7,
    component: 'Refrigerante', intervalKm: null, intervalMonths: 48, priority: 'LOW',
    notes: 'A cada 4 anos. BMW G12++ ou G13.' },

  // ── S 1000 RR ──────────────────────────────────────────────────────────────
  { modelName: 'S 1000 RR', yearFrom: 2019, yearTo: null, order: 0,
    component: 'Óleo do motor (5W-40 sintético JASO MA2)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume: 4,5L com filtro. BMW Advantec Ultimate ou Motul 300V. Filtro: Hiflofiltro HF160. Em uso de pista: troque após cada 3 sessões intensas.' },
  { modelName: 'S 1000 RR', yearFrom: 2019, yearTo: null, order: 1,
    component: 'Vela NGK LMAR9FI-10G (4 velas)', intervalKm: 30000, intervalMonths: null, priority: 'HIGH',
    notes: '4 velas (motor 4 cilindros). Custo ~R$ 200+ cada = R$ 800+ o jogo. Troca a cada 30.000 km.' },
  { modelName: 'S 1000 RR', yearFrom: 2019, yearTo: null, order: 2,
    component: 'Filtro de ar', intervalKm: 30000, intervalMonths: null, priority: 'HIGH',
    notes: 'Troca a cada 30.000 km. Filtro de alto fluxo (K&N ou Pipercross) aumenta performance mas exige limpeza mais frequente.' },
  { modelName: 'S 1000 RR', yearFrom: 2019, yearTo: null, order: 3,
    component: 'Folga das válvulas (16 válvulas)', intervalKm: 30000, intervalMonths: null, priority: 'HIGH',
    notes: 'Motor DOHC 4 cilindros: 16 válvulas. Verificação a cada 30.000 km — serviço complexo e caro.' },
  { modelName: 'S 1000 RR', yearFrom: 2019, yearTo: null, order: 4,
    component: 'Óleo de garfo', intervalKm: 30000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'Troca a cada 30.000 km. Garfo USD invertido — serviço complexo, necessário mecânico especializado.' },
  { modelName: 'S 1000 RR', yearFrom: 2019, yearTo: null, order: 5,
    component: 'Fluido de freio e embreagem (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'Em uso de pista intenso: troque anualmente. Embreagem hidráulica: DOT 4 também.' },

  // ── S 1000 R ───────────────────────────────────────────────────────────────
  { modelName: 'S 1000 R', yearFrom: 2021, yearTo: null, order: 0,
    component: 'Óleo do motor (5W-40 sintético JASO MA2)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume: 4,5L com filtro. Mesmas especificações da S 1000 RR. Filtro: Hiflofiltro HF160.' },
  { modelName: 'S 1000 R', yearFrom: 2021, yearTo: null, order: 1,
    component: 'Vela NGK LMAR9FI-10G (4 velas)', intervalKm: 30000, intervalMonths: null, priority: 'HIGH',
    notes: '4 velas a cada 30.000 km. Custo elevado — planeje financeiramente.' },
  { modelName: 'S 1000 R', yearFrom: 2021, yearTo: null, order: 2,
    component: 'Filtro de ar', intervalKm: 30000, intervalMonths: null, priority: 'HIGH',
    notes: 'Troca a cada 30.000 km.' },
  { modelName: 'S 1000 R', yearFrom: 2021, yearTo: null, order: 3,
    component: 'Folga das válvulas', intervalKm: 30000, intervalMonths: null, priority: 'HIGH',
    notes: '16 válvulas. Verificação a cada 30.000 km.' },
  { modelName: 'S 1000 R', yearFrom: 2021, yearTo: null, order: 4,
    component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'A cada 2 anos.' },

  // ── R nineT ────────────────────────────────────────────────────────────────
  { modelName: 'R 1200 Nine T', yearFrom: 2014, yearTo: null, order: 0,
    component: 'Óleo do motor (15W-50 JASO MA2)', intervalKm: 10000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume: 3,8L com filtro. SAE 15W-50 API SJ/JASO MA2. BMW Advantec Ultimate ou Motul 7100 15W-50. Filtro: Hiflofiltro HF164 (R$ 40–70).' },
  { modelName: 'R 1200 Nine T', yearFrom: 2014, yearTo: null, order: 1,
    component: 'Vela NGK MAR8B-JDS (2 velas, gap 0,8 mm)', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: '2 velas (uma por cilindro Boxer). Gap: 0,8 mm. Troca a cada 20.000 km.' },
  { modelName: 'R 1200 Nine T', yearFrom: 2014, yearTo: null, order: 2,
    component: 'Folga de válvulas (IN 0,15–0,20 / EX 0,25–0,30 mm)', intervalKm: 10000, intervalMonths: null, priority: 'HIGH',
    notes: 'ATENÇÃO: verificação a cada 10.000 km — mais frequente que a maioria das motos. Motor Boxer exige. IN: 0,15–0,20 mm. EX: 0,25–0,30 mm. Motor completamente frio.' },
  { modelName: 'R 1200 Nine T', yearFrom: 2014, yearTo: null, order: 3,
    component: 'Filtro de ar', intervalKm: 20000, intervalMonths: null, priority: 'HIGH',
    notes: 'Troca a cada 20.000 km junto com as velas.' },
  { modelName: 'R 1200 Nine T', yearFrom: 2014, yearTo: null, order: 4,
    component: 'Óleo do cardan (70W-80 hipóide)', intervalKm: 20000, intervalMonths: 24, priority: 'HIGH',
    notes: '180 ml de SAE 70W-80 hipóide. Troca junto com o câmbio.' },
  { modelName: 'R 1200 Nine T', yearFrom: 2014, yearTo: null, order: 5,
    component: 'Óleo do câmbio (75W-90 GL-5)', intervalKm: 20000, intervalMonths: 24, priority: 'MEDIUM',
    notes: '~0,75L de 75W-90 GL-5.' },
  { modelName: 'R 1200 Nine T', yearFrom: 2014, yearTo: null, order: 6,
    component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'MEDIUM',
    notes: 'A cada 2 anos ou 1 ano se uso intenso/circuito.' },
  { modelName: 'R 1200 Nine T', yearFrom: 2014, yearTo: null, order: 7,
    component: 'Óleo de garfo', intervalKm: null, intervalMonths: 72, priority: 'LOW',
    notes: 'A cada 6 anos conforme manual (ou 40.000 km). Garfo convencional de 46 mm.' },
]

// ─── Runner ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed BMW Motorrad iniciando...\n')

  const motoType = await prisma.vehicleType.upsert({
    where: { slug: 'moto' },
    update: {},
    create: { slug: 'moto', label: 'Moto' },
  })

  const bmwBrand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'BMW', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'BMW', vehicleTypeId: motoType.id },
  })
  console.log(`  ✅ Brand: ${bmwBrand.name}`)

  for (const block of bmwModels) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: bmwBrand.id } },
      update: {},
      create: { name: block.modelName, brandId: bmwBrand.id },
    })

    await prisma.tip.deleteMany({ where: { modelName: block.modelName } })

    const allTips: { cat: Cat; tip: TipInput }[] = [
      ...block.MACETES.map(t => ({ cat: 'MACETES' as Cat, tip: t })),
      ...block.PROBLEMAS.map(t => ({ cat: 'PROBLEMAS' as Cat, tip: t })),
      ...block.MANUTENCAO.map(t => ({ cat: 'MANUTENCAO' as Cat, tip: t })),
    ]

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

    const counts = {
      m: block.MACETES.length,
      p: block.PROBLEMAS.length,
      mt: block.MANUTENCAO.length,
    }
    console.log(
      `  🔧 ${block.modelName} (${block.yearFrom ?? '?'}–${block.yearTo ?? 'atual'}): ` +
      `${counts.m} macetes, ${counts.p} problemas, ${counts.mt} manutenção`,
    )
  }

  console.log('\n  📏 Calibragem de pneus...')
  for (const tp of bmwTirePressures) {
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
    console.log(`  ✅ ${tp.modelName}: ${tp.frontPsi}/${tp.rearPsi} PSI`)
  }

  console.log('\n  🔧 Cronogramas de manutenção...')
  const modelNames = [...new Set(bmwMaintenanceItems.map(m => m.modelName))]
  for (const name of modelNames) {
    await prisma.maintenanceItem.deleteMany({ where: { modelName: name } })
  }
  await prisma.maintenanceItem.createMany({
    data: bmwMaintenanceItems.map(item => ({
      modelName: item.modelName,
      yearFrom: item.yearFrom,
      yearTo: item.yearTo,
      component: item.component,
      intervalKm: item.intervalKm,
      intervalMonths: item.intervalMonths,
      notes: item.notes,
      priority: item.priority,
      order: item.order,
    })),
  })
  for (const name of modelNames) {
    const count = bmwMaintenanceItems.filter(m => m.modelName === name).length
    console.log(`  ✅ ${name}: ${count} itens de manutenção`)
  }

  const totalTips = bmwModels.reduce(
    (acc, b) => acc + b.MACETES.length + b.PROBLEMAS.length + b.MANUTENCAO.length,
    0,
  )
  console.log(
    `\n✅ Seed BMW concluído: ${bmwModels.length} modelos, ${totalTips} dicas, ${bmwTirePressures.length} calibragens, ${bmwMaintenanceItems.length} itens de manutenção.`,
  )
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
