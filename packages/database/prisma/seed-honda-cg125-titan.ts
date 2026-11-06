// seed-honda-cg125-titan.ts — Honda CG 125 geração vintage/Titan
// Modelos: CG 125 (2785) · CG 125 TODAY (2792) · CG 125 TITAN (2788)
//          CG 125 TITAN-ES (2789) · CG 125 TITAN-KS (2790) · CG 125 TITAN-KSE (2791)
// Motor: 124cc SOHC monocilíndrico refrigerado a ar (mesmo bloco em todas as variantes)
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

// ─── CG 125 (base) — Macetes ──────────────────────────────────────────────────

const CG125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Regulagem de válvulas a cada 6.000 km — o item mais negligenciado e mais importante da CG 125',
    body: 'O motor SOHC de 124cc tem folgas de válvula ajustáveis por parafuso e contra-porca (não por shims). Folgas corretas com motor frio: admissão 0,05 mm / escape 0,08 mm. Folga fora do ponto: motor perde potência, consome mais combustível e produz barulho metálico em aceleração. Em motos de mototaxi e delivery com 100k+ km, a folga está quase sempre errada. Serviço rápido (30 min) em qualquer oficina Honda, R$60–100.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA — capacidade ~1,0 L com filtro; troca a cada 3.000 km',
    body: 'A CG 125 usa 1,0 L de óleo com troca do filtro (ou 0,8 L sem filtro). Use 10W-30 com certificação JASO MA — o diferencial JASO MA é necessário para proteger a embreagem molhada integrada ao cárter. Marcas: Motul 3100 Gold 4T, Castrol Go! 4T, Honda HP4 ou Shell Advance. Nunca use óleo de carro (sem JASO) — destrói os discos de embreagem progressivamente. Em climas frios (Sul/Sudeste no inverno): 10W-40 melhora a partida a frio.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA — gap 0,6–0,7 mm; troca a cada 8.000 km; não use velas "genéricas"',
    body: 'A vela correta é a NGK C7HSA (rosca 10 mm, calor 7, ponta standard). Gap: 0,6–0,7 mm. Velas de marca desconhecida vendidas em borracharias e mercadinhos causam falha de ignição, partida difícil e perda de potência — não vale a economia de R$5. Torque de aperto: 12–15 N.m. Sintoma de vela gasta: partida difícil a frio, "engasga" em aceleração leve, consumo acima do normal. Uma vela nova NGK C7HSA custa R$12–18 e transforma o funcionamento da moto.',
  },
  {
    severity: 'WARN',
    title: 'Carburador Keihin — parafuso de mistura, bóia e agulha; 90% dos problemas de afogamento são do carburador',
    body: 'O carburador Keihin da CG 125 tem 3 ajustes críticos: (1) Parafuso de mistura piloto (mixture screw): normalmente 2,5–3 voltas abertas do fundo — mal-ajustado causa marcha lenta instável; (2) Nível da bóia: alto = mistura rica = fumaça preta + consumo alto; baixo = mistura pobre = dificuldade de partida + motor esquenta; (3) Agulha de dosagem: posição central do clipe é padrão. Antes de regular, limpe o carburador com limpa-carburador spray — jatos entupidos são a causa mais comum de problemas.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428 — lubrifique a cada 500 km; kit DID 428VX + JT Sprockets substitui o original',
    body: 'A CG 125 usa corrente 428 × 96–98 elos. Lubrificação: a cada 500 km com spray de corrente (Motul, Wurth ou Castrol). Ajuste de folga: 20–30 mm de movimento vertical no meio da corrente com a moto carregada. Troque o kit completo (corrente + coroa + pinhão) a cada 15.000–18.000 km — nunca troque a corrente sem trocar os pinhões (desgaste cruzado destroi a nova corrente em quilômetros). Kit recomendado: DID 428VX + JT Sprockets JTF237 (14T) + JTR1134 (41T).',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar de espuma — limpe a cada 3.000 km; filtro sujo = mistura rica = fumaça preta e consumo alto',
    body: 'O filtro de ar da CG 125 é de espuma (não papel), lavável. Limpeza: mergulhe em diesel ou gasolina, esprema suavemente, deixe secar completamente, aplique uma fina camada de óleo de motor na espuma antes de instalar. Filtro sujo restringe a entrada de ar e cria mistura excessivamente rica — fumaça preta no escapamento e consumo acima de 35 km/L são o sintoma. Filtro novo de reposição: ~R$15–25. Em motos de delivery em estradas de terra: limpe a cada 1.500 km.',
  },
  {
    severity: 'WARN',
    title: 'CDI (módulo de ignição) — falha intermitente é o "vilão" clássico da CG 125; diagnóstico simples por substituição',
    body: 'O CDI da CG 125 é um dos itens que mais falham por fadiga térmica após anos de uso. Sintoma clássico: moto para de funcionar com o motor quente, resfria por 10–15 min e volta a funcionar. Também pode causar ausência total de faísca sem aviso. Diagnóstico: troque por outro CDI de mesma especificação — se o problema some, CDI era o culpado. Alternativas ao original Honda: Profield e Tech2000 fabricam CDIs nacionais compatíveis (R$40–90) — qualidade inferior ao Honda original mas funcionam. CDI Honda original: R$150–250.',
  },
  {
    severity: 'OK',
    title: 'Freio a tambor dianteiro e traseiro — ajuste fino a cada 3.000 km ou quando sentir folga excessiva',
    body: 'A CG 125 base/TODAY tem tambor nos dois eixos. Ajuste: dianteiro pelo borboleta na extremidade do cabo (folga na alavanca: 10–20 mm); traseiro pelo garfo de ajuste no cabo (folga no pedal: 20–30 mm). Lonas gastas: ruído metálico constante durante frenagem ou freio ineficaz mesmo apertado a fundo. Lonas de reposição: use somente lonas para CG 125 — lonas genéricas têm espessura e coeficiente de atrito errados. Após troca de lonas: período de "assentamento" de 100–200 km antes do freio atingir eficiência máxima.',
  },
  {
    severity: 'OK',
    title: 'Bobina de ignição — meça resistência antes de culpar CDI ou carburador em problemas de faísca',
    body: 'A bobina de ignição da CG 125 tem resistência primária de ~0,4–0,5 Ohm e secundária de ~10.000–14.000 Ohm (10–14 kOhm). Meça com multímetro nos terminais. Bobina aberta (resistência infinita) = nenhuma faísca. Resistência primária alta (acima de 1 Ohm) = faísca fraca. Muitas bobinas do mercado nacional são de baixa qualidade — use Honda original ou Moto Honda da Amazônia (fabricada no Brasil). Sintoma de bobina fraca: moto funciona em marcha lenta mas para com carga (alta rotação drena a bobina substandard).',
  },
  {
    severity: 'OK',
    title: 'Partida a frio — use o afogador (choke) corretamente; forçar a moto a frio desgasta pistão e cilindro',
    body: 'Procedimento correto: (1) Abra o afogador (puxe a alavanca de choke); (2) NÃO acione o acelerador; (3) Ligue o motor; (4) Aguarde 1–2 minutos com o motor aquecendo; (5) Feche o choke gradualmente. Com motor frio e sem choke, a mistura é pobre demais e o motor "emperra" — muitos pilotos forçam o motor acelerando, o que aumenta o desgaste dos anéis de pistão. Com choke fechado e motor quente: motor afoga e consome 50% mais combustível. Em temperatura acima de 25°C, o choke pode ser desnecessário.',
  },
  {
    severity: 'WARN',
    title: 'Escapamento entupido com borra de combustível — desobstrução com palito e maçarico; nunca fure com prego',
    body: 'Motos com combustível de baixa qualidade ou muito paradas formam borra de carburador e depósito no silenciador. Sintoma: perda progressiva de potência, motor "abafado", consumo alto sem causa aparente. Diagnóstico: com o motor ligado, aproxime a palma (sem tocar) da saída do escapamento — pressão fraca indica entupimento. Limpeza: desconecte o escapamento, use palito de madeira + maçarico para queimar a borra interna + jato de ar comprimido. Nunca fure o silenciador com parafuso — enfraquece a estrutura e cria ruído excessivo.',
  },
  {
    severity: 'OK',
    title: 'Tensão do regulador/retificador — verifique anualmente; bateria que não carrega pode ser regulador, não bateria',
    body: 'A CG 125 com partida elétrica tem regulador/retificador integrado. Tensão correta de carga: 13,8–14,8 V na bateria com motor a 4.000 rpm. Abaixo de 13 V = regulador ou estátor com defeito. Acima de 15 V = regulador com defeito (vai destruir a bateria). Muitos proprietários trocam baterias repetidamente sem checar o regulador — waste de dinheiro. Regulador de reposição: Honda original R$80–150; alternativas nacionais R$40–70. Para modelos sem partida elétrica (KS puro): sem bateria = sem regulador (sistema de ignição por CDI autônomo).',
  },
]

const CG125_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Marcha lenta instável ou motor "flutuando" — 95% das vezes é carburador sujo ou parafuso de mistura desregulado',
    body: 'Motor que sobe e desce de rotação sozinho na marcha lenta (1.000–2.500 rpm oscilando) quase sempre é: (1) jato piloto do carburador entupido com verniz de gasolina velha — limpe com limpa-carburador e agulha de costura no orifício; (2) parafuso de mistura incorreto — tente ajustar entre 2 e 3 voltas abertas em incrementos de 1/4 de volta; (3) diafragma do carburador furado (menos comum na CG 125 que usa carburador VM/VB simples sem diafragma de slide). Não regule o parafuso de marcha lenta (aceleração mínima) para compensar — apenas mascara o problema.',
  },
  {
    severity: 'WARN',
    title: 'Consumo acima de 30 km/L — meta real é 35–42 km/L; acima dessa faixa investigue carburador, filtro e pneus',
    body: 'A CG 125 bem regulada faz 38–45 km/L em uso misto. Consumo acima de 30 km/L indica: (1) Filtro de ar sujo — restringe ar, enriquece mistura; (2) Parafuso de mistura aberto demais; (3) Nível de bóia alto (bóia defeituosa); (4) Pressão dos pneus baixa (pneus moles aumentam 10–15% de consumo); (5) Corrente mal ajustada e sem lubrificação; (6) Freio arrastando (ajuste incorreto do cabo); (7) Válvulas sem folga adequada. Resolve na ordem: verifique pneus → filtro de ar → válvulas → carburador.',
  },
  {
    severity: 'WARN',
    title: 'Perda de potência progressiva em alta quilometragem — anéis de pistão desgastados ou folga de válvulas errada',
    body: 'Motor acima de 60.000 km sem revisão de anéis tende a perder compressão. Diagnóstico: teste de compressão — abaixo de 1.000 kPa (10 kgf/cm²) com válvulas corretas = anéis gastos ou retentores de válvula desgastados. Retifica do cilindro + anéis novos: R$300–600 em oficina especializada. Antes de decidir pela retífica: regule as válvulas e limpe o carburador — muitos motores "sem potência" voltam ao normal apenas com esses dois serviços. Kit de pistão e anéis para CG 125: Honda original ou Maneto (nacional) R$150–300.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pela tampa de válvulas — gaxeta endurecida após anos; troca simples e barata',
    body: 'A gaxeta de borracha da tampa do cabeçote (onde ficam as válvulas e a came) endurece e racha com o calor ao longo dos anos. Resultado: gotejamento de óleo sobre o motor, manchas no chão. Troca: R$10–20 em peças (gaxeta original Honda ou corte de cortiça industrial), serviço de 20 minutos. Nunca use veda-rosca ou silicone como substituto permanente — resseca e vaza novamente em semanas. Aproveite a abertura da tampa para checar as folgas das válvulas. Retorque da tampa: 10 N.m (não aperte excessivamente — cabeçote é alumínio).',
  },
  {
    severity: 'WARN',
    title: 'Corrente de transmissão esticada ou seca — falha mais comum em motos de delivery; quebra em movimento é perigosa',
    body: 'Corrente seca e esticada é o problema número 1 em motos de delivery. Corrente que ultrapassa o limite de ajuste (parafuso de ajuste no fim do curso) deve ser trocada imediatamente — não tem "mais" ajuste possível. Uma corrente que arrebenta em movimento pode prender na roda traseira e causar tombamento. Sintomas: barulho metálico em aceleração, "pulos" de potência, corrente tocando no protetor. Custo do kit completo (corrente + coroa + pinhão): R$120–200 em peças nacionais, R$250–400 em DID + JT importado.',
  },
  {
    severity: 'WARN',
    title: 'Falta de faísca sem causa aparente — CDI ou bobina; teste simples com vela nova ou CDI de mesma especificação',
    body: 'Moto que não liga sem faísca e com combustível e compressão OK: (1) Verifique o cabo de vela (alta tensão) — mede resistência no multímetro, acima de 20 kOhm = cabo com defeito; (2) Bobina: meça resistência primária (0,4–0,5 Ohm) e secundária (10–14 kOhm); (3) CDI: só testável por substituição — leve a uma loja com estoque e peça para testar. Ordem de diagnóstico: cabo de vela → vela → bobina → CDI → sensor de ponto (pick-up). O cabo de vela é o item mais ignorado e mais barato de trocar (R$15–30).',
  },
  {
    severity: 'WARN',
    title: 'Embreagem patinando em aceleração forte — óleo errado ou discos desgastados; nunca use óleo de carro',
    body: 'Embreagem que patina (motor acelera mas a velocidade não aumenta proporcionalmente) tem 2 causas principais: (1) Óleo sem certificação JASO MA — óleo de carro tem aditivos antiatrito que destroem a embreagem molhada; troque para JASO MA e o problema some em 90% dos casos; (2) Discos de embreagem gastos após muita quilometragem — reconstrução da embreagem com kit de discos Honda ou Barnett (R$150–300 em peças). A CG 125 tem regulagem de embreagem pela roldana no cabo — verifique se não está com fio solto ou mal ajustado antes de suspeitar dos discos.',
  },
  {
    severity: 'DANGER',
    title: 'Pneus com pressão baixa ou com código DOT vencido — risco real de queda em curvas ou frenagem',
    body: 'Pneus com pressão baixa causam aquecimento excessivo, desgaste irregular e perda de estabilidade. Pressões corretas: dianteiro 29 PSI / traseiro 33 PSI (solo) ou 36 PSI (com garupa). Verifique semanalmente — pneus de moto perdem pressão mais rápido que carro. Verifique o código DOT (4 dígitos no flanco): pneu com mais de 5 anos tem borracha endurecida que não agarra em piso molhado independente do sulco aparente. Em motos de delivery com pneu carregado e quente, a pressão sobe 4–5 PSI — não esvazie o pneu quente para chegar na pressão a frio.',
  },
]

// ─── CG 125 TODAY — Macetes ───────────────────────────────────────────────────

const CG125TODAY_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'CG 125 TODAY (1990–1994) — mesma mecânica base da CG 125; foco em conservação do modelo vintage',
    body: 'A CG 125 TODAY é a versão com estilo renovado lançada no início dos anos 90. O motor é idêntico ao da CG 125 base — 124cc SOHC, carburado, 4 marchas. As macetes de motor, carburador, válvulas e corrente são as mesmas. Diferencial: peças de carroceria (tanque, carenagem lateral, banco) são específicas da TODAY e cada vez mais difíceis de encontrar originais. Guarde qualquer peça plástica original em bom estado — tem valor crescente no mercado de colecionadores.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA — 1,0 L com filtro; troca a cada 3.000 km; motor de 30+ anos exige frequência maior',
    body: 'Motor de 1990–1994 com 30+ anos de uso tem vedações mais antigas e maior blow-by — reduza o intervalo para 2.500–3.000 km. O óleo retirado turvo indica contaminação por condensação (motor que nunca esquenta adequadamente em trajetos curtos). Nesse caso: faça um trajeto de pelo menos 20 km contínuos para evaporar a água antes de trocar o óleo. Filtro de óleo: modelo clássico da era, busque equivalente por código Honda. Motul 3100, Castrol Go! e Shell Advance são escolhas seguras.',
  },
  {
    severity: 'WARN',
    title: 'Tanque de combustível com ferrugem — problema clássico em TODAY guardada por anos; filtro é obrigatório',
    body: 'Tanque de aço da TODAY parada com combustível velho (gasolina com etanol envelhece em 90 dias) tem alta probabilidade de ferrugem interna. Ferrugem que chega ao carburador entope o jato piloto e a agulha — resultado: marcha lenta errática e dificulade de partida. Antes de qualquer ajuste de carburador, inspecione o interior do tanque com lanterna. Tratamento: POR-15 Tank Sealer ou limpador de ferrugem fosfórico + selante (R$150–300). Instale filtro de combustível inline após o tratamento.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA — mesma especificação de toda a família CG 125; gap 0,6–0,7 mm',
    body: 'Igual à CG 125 base — NGK C7HSA. A TODAY de 30 anos provavelmente nunca teve a vela trocada ou tem uma vela genérica atual. Troque a vela antes de qualquer diagnóstico de motor — custo de R$15 que elimina um suspeito. Verifique também o estado do cabo de alta tensão: após 30 anos, o isolamento de borracha pode estar rachado e criando faísca "vazando" para o motor em vez de chegar à vela.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico vintage — conectores de 30 anos oxidados; limpeza com WD-40 Specialist resolve intermitências',
    body: 'O sistema elétrico de uma TODAY de 1990–1994 tem conectores que oxidaram ao longo de 30 anos. Falhas intermitentes (faróis que piscam, velocímetro que não funciona, motor que corta sem aviso) quase sempre são conectores oxidados. Roteiro: desconecte e reconecte cada conector do chicote; aplique WD-40 Specialist Electrical ou CRC 2-26 em cada pino; reconecte e aplique vaselina técnica. A TODAY da era usava diodos de farol e luz traseira — relâmpagos LED de 18 mm de mesmo soquete são substituições modernas mais duráveis.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428 — kit DID 428VX ou RK M428KLO + JT Sprockets; lubrifique a cada 500 km',
    body: 'Mesma corrente 428 da família CG 125. Em uma TODAY vintage com corrente original: se estiver enferrujada ou esticada além do ajuste, troque o kit completo. Nunca tente lubrificar corrente enferrujada — os links internos estão fragilizados e podem arrebentar. DID 428VX (~R$120) + JT Sprockets são a referência de mercado. Pinhão traseiro (coroa) da TODAY: confira os dentes originais antes de pedir peça — pode variar de exemplar para exemplar em motos de 30 anos com histórico de manutenção desconhecido.',
  },
  {
    severity: 'OK',
    title: 'Freio a tambor dianteiro e traseiro — ajuste periódico e inspeção de lonas em moto vintage',
    body: 'A TODAY tem tambor nos dois eixos. Em motos vintage: (1) verifique se os cabos de freio não estão emperrados internamente — cabo empedrado causa freio que não retorna completamente (aquece o tambor); (2) As sapatas/lonas de 30 anos podem ter óleo impregnado por retentor de eixo com vazamento — lona oleada não freia e não tem recuperação; (3) O fio de controle de abertura do tambor traseiro pode estar quebrado internamente mas aparentemente OK externamente. Lonas de reposição universais por diâmetro e largura ainda são encontradas em autopeças.',
  },
  {
    severity: 'WARN',
    title: 'Peças de carroceria vintage escassas — TODAY tem mercado de colecionador; mantenha originais mesmo com defeitos',
    body: 'Tanque, laterais, guarda-lamas e banco originais da CG 125 TODAY são itens cada vez mais raros. Grupos de Facebook "CG 125 TODAY Clube" e leilões de motos vintage são fontes. Restaurações bem-feitas com peças originais valem 30–50% mais. Para peças plásticas quebradas: fibra de vidro + lixa + tinta (resultado visual bom). Para decalques/adesivos originais: plotters especializados em motos vintage reproduzem fielmente (busque no Instagram "adesivos vintage moto").',
  },
]

const CG125TODAY_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Ligar motor após anos de parada sem preparação — moto de 30 anos precisa de checklist antes da partida',
    body: 'NUNCA ligue uma CG 125 TODAY parada por 2+ anos sem: (1) Trocar óleo + filtro; (2) Verificar e limpar o carburador (bóia grudada, jatos entupidos com verniz); (3) Inspecionar mangueiras de combustível — borracha de 30 anos racha e pode causar incêndio; (4) Verificar se o petcock (torneira de combustível) veda na posição OFF; (5) Substituir a vela. Moto que fica no fundo da garagem por anos: qualidade do combustível, borracharia, eletricidade e mecânica tudo se degrada simultaneamente.',
  },
  {
    severity: 'WARN',
    title: 'CDI com falha intermitente — sintoma clássico de moto que para com motor quente e volta depois de esfriar',
    body: 'O CDI da era TODAY (1990–1994) é um componente que falha por fadiga térmica após 30 anos. Sintoma: motor funciona normalmente, aquece, para repentinamente — fica sem faísca. Após 10–20 minutos resfriando, funciona novamente. Diagnóstico por substituição: o CDI é o único componente que não se testa facilmente com multímetro. Alternativas: CDI nacional da Profield ou Tech2000 (R$50–80), ou busque CDI original Honda NOS (new old stock) em plataformas de peças vintage.',
  },
  {
    severity: 'WARN',
    title: 'Carburador com verniz endurecido — gasolina velha solidifica nos jatos e na agulha; limpeza ultrassônica é o caminho',
    body: 'Gasolina com etanol deixada por meses no carburador forma verniz marrom que entope os minúsculos orifícios dos jatos. Limpeza simples com spray limpa-carburador resolve casos leves. Casos graves (jatos completamente obstruídos): desmonte o carburador completamente e leve para limpeza ultrassônica (R$50–100 em lojas de ultrassom). Nunca use arame ou palito metálico nos orifícios dos jatos — deforma o diâmetro calibrado e o carburador não funciona mais corretamente.',
  },
  {
    severity: 'WARN',
    title: 'Rolamentos de roda com 30 anos — verificação antes de qualquer saída mais intensa',
    body: 'Rolamentos de roda dianteira e traseira de uma TODAY de 30 anos têm graxa envelhecida e podem ter corrosão nas pistas. Diagnóstico: com a moto no cavalete, gire cada roda devagar e sinta com os dedos — crepitação ou "arrastamento" = substitua. Rolamentos universais: anote o número gravado no rolamento e compre equivalente SKF/NSK em loja de rolamentos (R$30–80 cada). Rolamento de direção: teste desmontando o guiador e verificando o cone dianteiro — jogo lateral = substitua.',
  },
  {
    severity: 'WARN',
    title: 'Bateria ausente ou morta (versões ES) — instale bateria nova somente após verificar tensão de carga',
    body: 'A CG 125 TODAY não tem partida elétrica — todo o sistema elétrico funciona por estátor de corrente alternada (AC). Não usa bateria. Porém muitos exemplares sofreram conversão para partida elétrica ao longo dos anos — se o seu tem bateria, verifique o regulador antes de instalar bateria nova. A TODAY base tem apenas gerador AC para farol e freio — farol apaga com motor desligado (normal para o sistema da época).',
  },
  {
    severity: 'WARN',
    title: 'Anel de pistão desgastado — fumaça azul no escapamento e consumo de óleo entre trocas indicam retífica necessária',
    body: 'Motor de 30 anos com 50k+ km provavelmente tem anéis de pistão desgastados. Sintomas: fumaça azul no escapamento em aceleração, necessidade de completar óleo entre trocas, test de compressão abaixo de 900 kPa. Retífica completa (cilindro + pistão + anéis + retentores de válvula): R$400–700 em oficina especializada. Vale a pena em motos conservadas com carroceria boa. Kit de retífica nacional: Maneto ou KMP (R$150–250).',
  },
]

// ─── CG 125 TITAN — Macetes ───────────────────────────────────────────────────

const CG125TITAN_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'CG 125 TITAN (1994–2000) — geração com farol oval e visual renovado; mecânica confiável mas CDI é ponto fraco',
    body: 'A CG 125 TITAN trouxe estilo renovado em 1994 mantendo o motor 124cc SOHC de sempre. A mecânica de motor, carburador, válvulas e corrente segue as mesmas especificações da família CG 125. O ponto fraco desta geração é o CDI — falhas por fadiga térmica são comuns acima de 50.000 km. Mantenha um CDI reserva (R$40–80 nacional) na bolsa — é o item que mais deixa pilotos parados na estrada nessa geração.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA — 1,0 L com filtro; troca a cada 3.000 km; filtro HifloFiltro HF303 como alternativa',
    body: 'A CG 125 TITAN usa filtro de óleo tela (não cartucho) em muitos anos de produção. Verifique o tipo do seu exemplar: tela = limpe a cada troca com gasolina e ar comprimido; cartucho = troque (HifloFiltro HF303 ou similar). Capacidade: 1,0 L com filtro. Óleo 10W-30 JASO MA. Em TITAN usada como delivery com quilometragem alta, troque a cada 2.500–3.000 km — motor suado de delivery degrada óleo mais rápido.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C7HSA — mesma família CG 125; gap 0,6–0,7 mm; troca a cada 8.000 km',
    body: 'Igual à família CG 125 — NGK C7HSA. Na TITAN da era 1994–2000, a vela é acessada pelo lado direito do cabeçote com chave 21 mm. Em TITAN de delivery com alto giro, inspecione a vela a cada 6.000 km — eletrodo desgastado em motores de trabalho mais rápido que em uso urbano normal. Vela com eletrodo gasto: partida difícil e perda de resposta em aceleração abrupta.',
  },
  {
    severity: 'WARN',
    title: 'CDI TITAN (1994–2000) — o "calcanhar de Aquiles" da geração; sintoma: para com motor quente, volta a frio',
    body: 'O CDI da TITAN 1994–2000 é o item que mais falha nessa geração. Diagnóstico: motor aquece normalmente, para subitamente sem faísca; após 15–20 min resfriando, volta a funcionar. Causa: capacitor interno do CDI falha por calor cumulativo. CDI Honda original NOS (R$120–200) ou CDI Profield/Tech2000 nacional (R$40–80). O CDI fica montado atrás do painel do velocímetro — localização que acumula calor do motor. Dica de prevenção: melhore a ventilação ao redor do CDI com pequena folga de espaçador.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428 com lubrificação a cada 500 km — TITAN de delivery desgasta kit em 10.000–12.000 km',
    body: 'Em TITAN usado como mototaxi ou delivery com carga constante, o kit de transmissão (corrente + coroa + pinhão) dura 10.000–12.000 km — menos que os 15.000–18.000 km de uso normal. Inspeção: jogue a corrente para o lado no trecho reto entre pinhão e coroa — movimento lateral acima de 15 mm indica corrente gasta. Coroa desgastada: dentes em formato de onda (um lado do dente claramente mais desgastado). Kit nacional JTA (R$100–150) ou importado DID + JT Sprockets (R$250–400).',
  },
  {
    severity: 'OK',
    title: 'Regulagem de válvulas a cada 6.000 km — TITAN de trabalho esquenta mais e exige intervalo menor',
    body: 'Em TITAN usado para trabalho (delivery, mototaxi), reduza o intervalo de regulagem de válvulas para 5.000–6.000 km. Motor que trabalha em alta temperatura o dia todo causa dilatação diferente do uso esporádico. Folgas corretas: admissão 0,05 mm / escape 0,08 mm. Válvula de escape com folga zero (sem luz entre balancim e came) pode queimar o assento da válvula progressivamente — serviço de retífica do assento: R$150–300.',
  },
  {
    severity: 'OK',
    title: 'Carburador TITAN — jato principal #78 ou #80; mistura pobre em altitudes acima de 800 m pede jato menor',
    body: 'O carburador Keihin da CG 125 TITAN usa jato principal #78 ou #80 dependendo do ano. Em cidades em altitude (Belo Horizonte 852 m, São Paulo 760 m, Brasília 1.172 m): a mistura fica levemente rica — se a moto fuma preto ou consome muito, tente um jato uma numeração menor (#75 em vez de #78). Em cidades litorâneas (Rio, Santos, Recife): mistura OK com jato padrão. Jatos Keihin são peças de R$5–10 em qualquer loja de carburador.',
  },
  {
    severity: 'WARN',
    title: 'Freio dianteiro a tambor — TITAN tem câble pull no tambor dianteiro; desgaste do "ouvido" da sapata é comum',
    body: 'O freio dianteiro a tambor da TITAN tem um ponto de desgaste específico: o "ouvido" onde o cabo de freio conecta à came de acionamento. Após muitos anos, o acionamento fica com folga mesmo com o ajuste no fim. Solução: troca da sapata completa ou solda do ouvido (R$30–50 em funileiro). Lona de freio nova + acionamento correto: freio a tambor dianteiro de CG 125 é surpreendentemente eficaz quando bem ajustado — não subestime.',
  },
  {
    severity: 'OK',
    title: 'Pneus 2.75-18 (F) e 3.00-18 (R) — verifique o código DOT; pneus com 5+ anos devem ser substituídos',
    body: 'A CG 125 TITAN usa pneus de aro 18" com especificação bias-ply: dianteiro 2.75-18 e traseiro 3.00-18. Marcas disponíveis no Brasil: Pirelli Citynet, Rinaldi, Maggion. Verifique o código DOT nos flancos — 4 dígitos (ex: 2119 = 21ª semana de 2019). Pneus com mais de 5 anos têm borracha endurecida que aumenta o risco de queda em curvas molhadas mesmo com sulcos aparentes. Pressão: dianteiro 29 PSI / traseiro 33 PSI (solo) ou 36 PSI (com garupa).',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar de espuma — lave com diesel, seque, aplique óleo fino e recoloque; troca total a cada 20.000 km',
    body: 'A TITAN usa filtro de espuma aberta (open cell foam). Limpeza a cada 3.000 km: mergulhe em diesel por 5 min, esprema (sem torcer), seque ao ar, aplique FINO filme de óleo mineral antes de instalar. Filtro de espuma dura muito mais que filtro de papel se limpo corretamente. Troca total: a cada 20.000 km ou quando a espuma estiver esfarelando. Filtro genérico nacional: R$15–25. Filtro Honda original: R$30–50.',
  },
]

const CG125TITAN_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'CDI com falha térmica — parada súbita com motor quente; carry um CDI reserva sempre',
    body: 'Igual ao padrão da família CG 125 mas mais frequente na TITAN 1994–2000. CDI Profield nacional (R$40–70) é alternativa viável. Se a moto está em uso diário e já passou de 50.000 km, troque o CDI preventivamente — é mais barato que ficar parado no meio da rua esperando o motor esfriar. Leve sempre um CDI reserva embrulhado em plástico na bagagem.',
  },
  {
    severity: 'WARN',
    title: 'Motor sem potência em subidas — carburador sujeiro, válvulas fora do ponto ou anéis desgastados',
    body: 'TITAN que "perde fôlego" em subidas com garupa ou carga: (1) Regule as válvulas (causa mais comum — serviço de R$60); (2) Limpe o jato principal do carburador; (3) Verifique o filtro de ar; (4) Teste a compressão — abaixo de 1.000 kPa indica desgaste interno. Uma TITAN bem regulada deve subir ladeiras moderadas sem perder velocidade com piloto solo. Com garupa: redução de velocidade é normal, mas perda total de tração = problema mecânico.',
  },
  {
    severity: 'WARN',
    title: 'Troca de marcha travada ou difícil — pedal de câmbio dobrado, ajuste do gatilho ou sincronismo da embreagem',
    body: 'Pedal de câmbio que não entra suavemente nas marchas: (1) Pedal de câmbio torto por quedas — endireite ou substitua (R$20–40); (2) Cabo de embreagem mal ajustado — folga correta na alavanca: 10–20 mm; (3) Discos de embreagem desgastados ou com óleo errado. A TITAN era muito comum em mototaxi onde quedas dobram o pedal de câmbio. Pedal dobrado = câmbio que entra na marcha errada ou não entra em nenhuma.',
  },
  {
    severity: 'WARN',
    title: 'Freio que não libera completamente — cabo preso ou ajuste incorreto; aquecimento do tambor em viagens',
    body: 'Freio que não libera totalmente quando a mão/pé soltam causa aquecimento progressivo do tambor. Sintoma: roda com resistência, tambor quente após poucos quilômetros. Causa: cabo de freio com fio preso internamente (não retorna pelo atrito). Solução: lubrificação do cabo com Loctite 8102 ou troca (R$20–35). O cabo seco também causa desgaste desigual das lonas — uma face da lona desgasta mais rápido que a outra.',
  },
  {
    severity: 'WARN',
    title: 'Consumo alto em TITAN de delivery — 25–30 km/L indica manutenção atrasada',
    body: 'TITAN de delivery com consumo abaixo de 35 km/L quase sempre tem: (1) filtro de ar sujo; (2) válvulas desreguladas; (3) corrente mal ajustada e sem lubrificação (aumenta consumo 5–10%); (4) pneu traseiro com pressão baixa (aumento de 15%); (5) carburador com parafuso de mistura aberto demais. Um serviço completo de revisão (R$150–250 em oficina) frequentemente reduz o consumo de 28 para 40+ km/L.',
  },
  {
    severity: 'WARN',
    title: 'Luz de freio não acende — interruptor de freio queimado ou desregulado; multa de trânsito garantida',
    body: 'Interruptor de luz de freio dianteiro (no guidão, acionado pela alavanca) queima com frequência em motos velhas. Sintoma: alavanca de freio acionada mas luz de freio traseira não acende. Interruptor novo: R$10–20 em qualquer moto-peças. O interruptor traseiro (acionado pelo pedal) tem mola de ajuste — verifique se a mola está rompida ou mal ajustada antes de trocar. Multa por luz de freio inoperante em fiscalização: R$293,47 + 5 pontos na CNH.',
  },
  {
    severity: 'WARN',
    title: 'Peças pós-venda de qualidade inferior — parafusos que enferrujam, plásticos que trincam; prefira Honda original',
    body: 'O mercado aftermarket para CG 125 TITAN é enorme mas a qualidade varia muito. Peças críticas onde vale o Honda original: CDI (réplicas nacionais falham mais cedo), retentor de virabrequim (medida errada vaza óleo imediatamente), juntas de cabeçote (selagem inferior). Peças onde alternativas funcionam bem: velas NGK (original), filtro de ar nacional, lonas de freio Fras-le, pneus Rinaldi/Maggion. Evite comprar peças em camelódromo sem procedência — aparência idêntica, qualidade muito inferior.',
  },
]

// ─── CG 125 TITAN-ES — Macetes ────────────────────────────────────────────────

const CG125TITANES_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'CG 125 TITAN-ES (1999–2004) — partida elétrica mais o sistema KS; bateria e motor de partida são itens extras de manutenção',
    body: 'A TITAN-ES introduziu partida elétrica na CG 125. O sistema adiciona bateria, motor de partida (starter), relé (solenóide) e regulador/retificador ao sistema base. Todos esses componentes adicionam pontos de falha. As macetes de motor, carburador, válvulas e corrente são idênticas à TITAN base. Adicionalmente: mantenha a bateria carregada (bateria descarregada que não arranca pelo elétrico = recorra ao pedal de arranque — a ES ainda mantém o pedal KS).',
  },
  {
    severity: 'OK',
    title: 'Bateria YTZ5S ou YB5L-B — verifique tensão de carga antes de instalar bateria nova',
    body: 'A TITAN-ES usa bateria de 12V 5Ah (modelos YTZ5S, YB5L-B ou similares). Antes de instalar uma bateria nova, meça a tensão de carga com motor a 4.000 rpm — deve ser 13,8–14,8 V. Fora dessa faixa: regulador/retificador com defeito vai destruir a nova bateria em semanas. Bateria Yuasa YB5L-B: R$180–250. Moura 5Ah: R$120–160. A TITAN-ES de mototaxi descarrega a bateria rápido em uso com motor ligado/desligado constantemente — cheque a carga mensalmente.',
  },
  {
    severity: 'WARN',
    title: 'Motor de partida elétrica (starter) — escovas desgastadas são a causa mais comum de "starter que gira mas não arranca"',
    body: 'O motor de partida da TITAN-ES tem escovas de carvão que desgastam após 50.000–80.000 km. Sintoma: botão de partida acionado, motor de starter gira mais lento que o normal ou não arranca mas bate. Reposição das escovas: kit de escovas para Honda CG 125 ES, R$20–40. Enquanto o starter funciona mas lentamente: verifique também as conexões dos cabos do starter — terminais oxidados causam queda de tensão e starter preguiçoso.',
  },
  {
    severity: 'WARN',
    title: 'Relé (solenóide) de partida — "clique" sem o motor girar indica relé queimado',
    body: 'O relé de partida da TITAN-ES fica entre a bateria e o motor de arranque. Sintoma de relé queimado: aperto o botão de partida, ouço um "clique", mas o motor não gira. O relé pode ser testado com multímetro: com botão pressionado, meça se há tensão na saída do relé (terminal grosso). Sem tensão na saída = relé queimado. Relé universal de partida 12V 50A: R$20–40 em qualquer autopeças. Confirme os terminais (4 pinos: 2 finos de acionamento + 2 grossos de potência).',
  },
  {
    severity: 'OK',
    title: 'Regulador/retificador TITAN-ES — componente crítico que carrega a bateria e alimenta o sistema elétrico',
    body: 'A TITAN-ES tem regulador/retificador que converte a corrente alternada do estátor em CC para carregar a bateria. Tensão correta: 13,8–14,8 V com motor a 4.000 rpm. Regulador com defeito é a causa mais comum de: (1) bateria que não carrega ou que fica na carga sempre; (2) faróis que flutuam com a rotação; (3) fusíveis que queimam repetidamente. Regulador Honda original: R$80–150. Alternativas nacionais: R$40–70. Verifique o estátor também (0,5–1,0 Ohm por fase).',
  },
  {
    severity: 'OK',
    title: 'CDI TITAN-ES — mesma vulnerabilidade da TITAN KS; falha térmica após 50.000 km; carry reserva',
    body: 'O CDI da TITAN-ES é o mesmo ponto fraco da geração. Com partida elétrica, você pode ser iludido a pensar que "falta de faísca = problema no starter" — mas o CDI é igualmente suspeito. Quando o motor não liga nem com partida elétrica nem com pedal, o CDI é o principal suspeito (após verificar combustível e faísca diretamente). Profield e Tech2000 produzem CDIs nacionais para TITAN-ES (R$50–90). Guarde um CDI sobressalente no porta-objetos.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA — mesmo da família CG 125; 1,0 L com filtro; troca a cada 3.000 km',
    body: 'Mesma especificação de toda a família. Na TITAN-ES de mototaxi com motor ligado/desligado constante, o óleo sofre mais condensação e troca mais frequente (2.500–3.000 km) é recomendada. O ciclo térmico frequente (fria–quente–fria) sem o motor atingir temperatura de operação completa em trajetos curtos piora a contaminação do óleo por umidade.',
  },
  {
    severity: 'WARN',
    title: 'Cabos elétricos do starter oxidados — queda de tensão impede arrancada mesmo com bateria boa',
    body: 'Os cabos grossos de potência entre bateria → relé → motor de starter podem ter terminais oxidados que criam resistência. Resistência nos cabos de potência = queda de tensão = starter fraco (gira lentamente ou não arranca). Diagnóstico: meça a tensão diretamente nos terminais do motor de starter com o botão pressionado — mais de 0,5 V abaixo da tensão da bateria indica resistência no circuito. Limpeza: lixe os terminais com lixa fina + aplique vaselina técnica ou pasta anti-oxidante.',
  },
]

const CG125TITANES_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Starter não arranca mas motor toca no pedal — bateria fraca, relé ou motor de partida; diagnóstico em etapas',
    body: 'Se o pedal de arranque funciona mas o botão elétrico não: (1) Meça a tensão da bateria — abaixo de 11,5 V = bateria descarregada; (2) Ao apertar o botão, você ouve clique? Sim = relé funciona mas starter ou cabos com defeito. Não = relé queimado ou fuse de partida queimado; (3) Se relé clica: meça tensão diretamente no starter — tensão OK mas não gira = escovas gastas ou contato do coletor. Na dúvida: carregue a bateria primeiro — 70% dos problemas de partida são bateria descarregada.',
  },
  {
    severity: 'WARN',
    title: 'Bateria que descarrega rapidamente — regulador com defeito é o suspeito principal, não a bateria',
    body: 'Bateria que dura 1–2 semanas sem rodar ou que descarrega durante o dia: (1) Meça tensão de carga (13,8–14,8 V a 4.000 rpm); (2) Meça o consumo em repouso com multímetro em série na bateria — acima de 20 mA indica drain (vazamento de corrente); alarme, relé defeituoso e regulador com pico de corrente são causas comuns. Nunca compre bateria nova sem checar o regulador — você vai gastar R$180–250 em bateria que vai ser destruída em semanas.',
  },
  {
    severity: 'WARN',
    title: 'CDI queima com o calor — mesmo problema da TITAN KS; duplicado aqui por ser suspeito paralelo ao sistema de partida',
    body: 'Na TITAN-ES, quando o motor para com calor e não arranca nem elétrico nem pedal: CDI é o primeiro suspeito. Verifique faísca diretamente na vela antes de suspeitar do sistema elétrico de partida. Sem faísca = CDI, bobina ou pick-up. Com faísca mas sem arranque = combustível ou compressão. O starter funcionando mas o motor não pegando é diagnóstico diferente de starter que nem gira.',
  },
  {
    severity: 'WARN',
    title: 'Fusível de partida queimado — componente barato que trava o sistema se não encontrado',
    body: 'A TITAN-ES tem fusível dedicado para o circuito de partida elétrica (tipicamente 15–20A). Fusível queimado = botão de partida não faz nada, sem clique, sem reação. Localize a caixa de fusíveis (sob o painel ou sob o banco) — leve sempre 2 fusíveis reserva de cada amperagem. Fusíveis queimam por: sobrecorrente do starter (escovas gastas = corrente alta) ou curto no chicote elétrico.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico misto (CA + CC) — faróis em CA, partida em CC; nunca conecte os circuitos errados',
    body: 'A TITAN-ES tem dois circuitos elétricos: corrente alternada (CA) do estátor para faróis e freio; corrente contínua (CC) da bateria para partida, buzina e pisca. Ao fazer modificações ou reparos: não cruze os circuitos. Conectar um farol de CA na bateria CC queima o farol em segundos. O velocímetro e painel são sempre CC (bateria). Reparos elétricos sem manual de elétrica da TITAN-ES frequentemente geram erros de circuito.',
  },
]

// ─── CG 125 TITAN-KS — Macetes ───────────────────────────────────────────────

const CG125TITANKS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'CG 125 TITAN-KS (1999–2004) — versão econômica sem partida elétrica; sistema elétrico mais simples e confiável',
    body: 'A TITAN-KS é a versão de menor custo sem bateria nem motor de partida elétrica. Vantagem: sistema elétrico mais simples (apenas estátor AC para faróis e freio) = menos pontos de falha. Desvantagem: partida exclusivamente por pedal KS. A mecânica é idêntica à TITAN-ES em motor, carburador, válvulas e corrente. Escolha ideal para quem quer custo de manutenção mínimo — sem bateria para carregar ou starter para revisar.',
  },
  {
    severity: 'OK',
    title: 'Partida a pedal (kickstart) — técnica correta para não matar o joelho; um movimento firme resolve',
    body: 'Técnica de kickstart para CG 125: (1) Com choke aberto se motor frio; (2) Gire a chave para ON; (3) NÃO dê aceleração; (4) Acione o pedal firmemente em um movimento contínuo até o fim do curso (não chute pela metade — a "pegada" do motor acontece no fim do curso); (5) Repita se necessário. Motor quente: sem choke, mesmo procedimento. Motor que não pega após 5–6 tentativas: verifique combustível → faísca → compressão. Nunca "chutar" com força excessiva — pode dobrar o pedal ou machucar o joelho.',
  },
  {
    severity: 'OK',
    title: 'Sistema elétrico AC — faróis acesos apenas com motor ligado; comportamento normal da KS sem bateria',
    body: 'A TITAN-KS sem bateria tem faróis que funcionam somente com motor ligado. É um comportamento normal — não é defeito. A intensidade dos faróis aumenta com a rotação do motor (mais rotação = mais corrente do estátor). Em rotação muito baixa (marcha lenta), os faróis ficam visivelmente mais fracos — também normal. Sem bateria: buzina não funciona com motor parado; velocímetro e pisca-pisca funcionam pela corrente CA do estátor.',
  },
  {
    severity: 'OK',
    title: 'CDI da TITAN-KS — mesmo ponto fraco da família; carry sempre um reserva',
    body: 'O CDI da TITAN-KS é o mesmo suspeito número 1 em falhas de ignição. Com a KS, o diagnóstico é mais fácil: sem bateria e partida elétrica, a causa de "não liga" é imediatamente fuel system ou ignição. Teste de faísca: desconecte a vela, conecte na cap e deixe o metal da vela tocar o motor, acione o KS — deve aparecer faísca azul intensa. Sem faísca: CDI ou bobina. Profield e Tech2000 para TITAN-KS: R$40–70.',
  },
  {
    severity: 'OK',
    title: 'Sem custo de bateria — vantagem da KS em uso esporádico; mas o pedal de kickstart exige motor bem afinado',
    body: 'A TITAN-KS brilha em uso esporádico onde uma bateria ficaria descarregada. Porém: um motor com carburador sujo, válvulas desreguladas ou vela gasta exige MUITAS tentativas de partida pelo pedal — cansativo e potencialmente danoso ao joelho. Invista em manutenção preventiva para garantir que o motor pega na primeira ou segunda tentativa. Motor bem afinado: 1–2 accionamentos no KS, mesmo a frio com choke.',
  },
  {
    severity: 'WARN',
    title: 'Pedal de kickstart dobrado por queda — problema clássico em motos de trabalho; troca simples e barata',
    body: 'O pedal de kickstart é o componente mais afetado em quedas laterais da CG 125. Pedal dobrado: dificulta a técnica de partida, exige posição corporal incorreta do piloto. Pedal novo nacional: R$20–40. Honda original: R$60–100. Ao instalar pedal novo: verifique o retentor de posição (mola que mantém o pedal recolhido) — perdido em quedas frequentemente.',
  },
  {
    severity: 'OK',
    title: 'Regulagem de válvulas 6.000 km — ainda mais crítica na KS onde a partida difícil mascara válvulas fechadas',
    body: 'Na KS sem partida elétrica, válvulas fora do ponto se manifestam como "dificulade de dar a manivela" — o piloto culpa a técnica de partida quando na verdade a compressão está baixa por válvula encostada no assento. Teste rápido: tampe a saída de escuso com o polegar e acione o KS — deve sentir resistência forte. Pouca resistência = baixa compressão. Regule as válvulas (R$60–80 em oficina) antes de qualquer outro diagnóstico.',
  },
]

const CG125TITANKS_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Motor não pega no KS após muitas tentativas — elimine faísca, combustível e compressão antes de culpar o pedal',
    body: 'Sequência de diagnóstico para KS que não pega: (1) Faísca — desconecte a vela, apoie o metal no motor, acione o KS. Faísca fraca ou nenhuma = CDI/bobina/cabo; (2) Combustível — abra a torneira ON, aguarde 30 seg, verifique se goteja pelo dreno do carburador quando o dreno é aberto; (3) Compressão — tampa no buraco da vela pelo polegar, acione KS com força; (4) Afogador — certifique-se de usar o choke corretamente a frio. 80% dos casos de "não pega no KS" são carburador sujo ou CDI.',
  },
  {
    severity: 'WARN',
    title: 'Faróis que apagam enquanto o motor desacelera — normal no sistema AC, mas intensidade muito baixa indica estátor desgastado',
    body: 'Na KS sem bateria, os faróis em AC têm intensidade proporcional à rotação — diminuem na desaceleração. Isso é normal. Mas se o farol está muito fraco mesmo em alta rotação (acima de 4.000 rpm): (1) Verifique a amperagem do estátor (bobina do alternador); (2) Meça a tensão AC no fio amarelo do estátor — deve ser >7 VAC a 5.000 rpm para faróis normais. Estátor desgastado: rebobinagem R$180–350 ou estátor novo nacional R$120–200.',
  },
  {
    severity: 'WARN',
    title: 'CDI com falha por calor — mesma vulnerabilidade da família TITAN; parada com motor quente',
    body: 'Na KS, o CDI com defeito térmico se manifesta de forma idêntica: motor funciona, aquece, para. Diferença: sem bateria, você não tem a "âncora" da bateria para manter faróis e confirmar que é problema elétrico. Teste definitivo: desmonte o CDI (atrás do painel), coloque na mão ou em superfície fria por 10 minutos e tente ligar novamente — se pegar, CDI térmico confirmado.',
  },
  {
    severity: 'WARN',
    title: 'Mola do kickstart quebrada — pedal não retorna ao lugar após acionamento; risco de interferência com pé do piloto',
    body: 'A mola de retorno do pedal de kickstart pode quebrar em uso intenso (mototaxi). Sem a mola, o pedal fica abaixado após cada acionamento e pode interferir com o pé direito durante a pilotagem — risco de acidente. Mola de reposição: R$10–20 em loja de peças CG. Aproveite para verificar o encaixe do pedal no eixo — folga excessiva indica desgaste do coletor estriado.',
  },
  {
    severity: 'WARN',
    title: 'Câmbio que salta de marcha em aceleração — garfo de câmbio desgastado ou mola de retenção fraca',
    body: 'TITAN que salta de 2ª para neutro em aceleração tem garfo de câmbio desgastado ou mola de retenção (detent spring) fraca. Em motos de delivery com câmbio "chutado" constantemente sob carga, o desgaste é acelerado. Reparo do câmbio exige abertura do motor — serviço de R$250–500 em oficina especializada. Como paliativo temporário: evitar acelerar forte com câmbio em 2ª marcha.',
  },
]

// ─── CG 125 TITAN-KSE — Macetes ──────────────────────────────────────────────

const CG125TITANKSE_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'CG 125 TITAN-KSE (2002–2004) — versão completa com kickstart E elétrico; melhor dos dois mundos na geração',
    body: 'A TITAN-KSE combina partida elétrica (ES) e pedal de kickstart (KS) na mesma moto. Vantagem: se a bateria morrer ou o starter falhar, o pedal de emergência sempre salva. Em manutenção: combine as dicas da TITAN-ES (bateria, starter, relé) com as da TITAN-KS (técnica de KS, cuidados sem bateria). É a versão mais completa da geração TITAN — ideal para uso intenso onde uma falha de partida seria crítica.',
  },
  {
    severity: 'OK',
    title: 'Bateria de 12V 5Ah (YTZ5S ou YB5L-B) — mesma da TITAN-ES; sempre verifique regulador antes de trocar',
    body: 'Mesma bateria da TITAN-ES. Vantagem da KSE: quando a bateria morre, o kickstart ainda salva. Desvantagem: proprietários tendem a negligenciar a bateria por saber que "tem o pedal de reserva" — a bateria morta vai destruir o starter quando usada nesse estado. Mantenha a bateria sempre acima de 12,3 V em repouso.',
  },
  {
    severity: 'WARN',
    title: 'CDI TITAN-KSE — idêntico à família TITAN; falha com motor quente é a vulnerabilidade principal',
    body: 'O CDI da KSE é o mesmo da família TITAN. Única diferença: como a KSE tem starter, o piloto pode confundir "CDI queimado" com "starter com defeito" se não testar faísca. Procedimento: ao motor não ligar, sempre verifique faísca PRIMEIRO (independente de ser partida elétrica ou pedal) antes de diagnosticar o sistema de partida. Sem faísca = ignição (CDI/bobina). Com faísca = combustível ou mecânica.',
  },
  {
    severity: 'OK',
    title: 'Pedal KS como recurso de emergência — mantenha-o funcional mesmo usando principalmente a partida elétrica',
    body: 'Na KSE, muitos proprietários usam exclusivamente o starter elétrico e esquecem do pedal KS. Com o tempo, a mola de retorno do KS pode enferrujar na posição recolhida e emperrar. Acione o pedal KS pelo menos uma vez por mês para manter a mola e o mecanismo lubrificados. Aplique spray de WD-40 no eixo do pedal anualmente.',
  },
  {
    severity: 'OK',
    title: 'Regulagem de válvulas a cada 6.000 km — crítica também na KSE; motor difícil de arrancar elétrico com válvulas fechadas',
    body: 'Na KSE, válvulas com folga zero (fechadas permanentemente) ainda causam baixa compressão — o starter elétrico vai girar o motor mas não vai arrancar. Muitos proprietários culpam a bateria ou o starter quando na verdade é compressão baixa por válvula encostada. Faça o teste: com vela retirada, acione o starter — o motor gira livremente (normal) ou com resistência forte (compressão boa). Folga: adm 0,05 mm / esc 0,08 mm.',
  },
  {
    severity: 'OK',
    title: 'Óleo e corrente — mesmas especificações de toda a família TITAN; 10W-30 JASO MA, 1,0 L, corrente 428',
    body: 'Mecânica 100% idêntica à família TITAN. 10W-30 JASO MA, 1,0 L com filtro, troca a cada 3.000 km. Corrente 428, lubrificação a cada 500 km, kit completo a cada 15.000–18.000 km. Válvulas: adm 0,05 mm / esc 0,08 mm a cada 6.000 km. Vela NGK C7HSA, gap 0,6–0,7 mm, troca a cada 8.000 km. Filtro de ar de espuma: lave a cada 3.000 km.',
  },
]

const CG125TITANKSE_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Starter elétrico lento mas KS pega normal — bateria fraca ou escovas do starter; não indica problema mecânico',
    body: 'Na KSE, se o starter gira lentamente mas o KS arranca bem: (1) Verifique tensão da bateria (< 11,5 V = carregue); (2) Verifique escovas do motor de partida; (3) Verifique terminais dos cabos de potência. Motor que pega bem no KS mas não no elétrico = problema no sistema de partida, não no motor. A disponibilidade do KS na KSE facilita o diagnóstico.',
  },
  {
    severity: 'WARN',
    title: 'Relé de partida (clique sem girar) — diagnóstico rápido pela disponibilidade do KS como comparação',
    body: 'Sintoma: botão elétrico → "clique" → nada. Mas KS arranca normal. Diagnóstico: relé queimado ou cabos de potência. Teste: com chave de fenda, faça ponte direta nos terminais grossos do relé (cuidado: faísca) — se o starter girar, o relé está queimado. Relé universal 12V 50A: R$20–40. A disponibilidade do KS na KSE torna esse diagnóstico muito mais tranquilo (não fica preso).',
  },
  {
    severity: 'WARN',
    title: 'Bateria descarregando rápido + KS funcionando — regulador com defeito; não negligencie a bateria por ter pedal',
    body: 'Um erro comum na KSE: o proprietário nota que a bateria descarrega rápido mas não se preocupa porque o KS resolve. Sem investigar, continua usando com bateria ruim. O resultado: regulador defeituoso (que causou a descarga) continua danificando componentes elétricos. Bateria morta + regulador com 17V de saída = próximo passo é queimar o estátor (R$300+). Investigue qualquer descarga anormal de bateria imediatamente.',
  },
  {
    severity: 'WARN',
    title: 'CDI com falha — mesma vulnerabilidade; diagnostique faísca ANTES de culpar qualquer sistema de partida',
    body: 'Na KSE, sem faísca: o starter gira, o KS toca, mas o motor não pega. Muitos proprietários ficam tentando o starter (que drena a bateria) e depois o KS por horas sem verificar faísca. Sempre teste faísca primeiro: vela fora → cabo de vela em contato com o metal do motor → acione o KS (mais seguro para testar). Faísca fraca ou ausente = CDI. Economize bateria e joelho.',
  },
]

// ─── Tire Pressures ───────────────────────────────────────────────────────────

const TIRE_PRESSURES = [
  {
    modelName:    'CG 125',
    yearFrom:     1990, yearTo: null,
    tireSize:     '2.75-18 (F) · 3.00-18 (R)',
    frontPsi:     29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes:        'Pneus bias-ply 18". Verifique pressão semanalmente — pneu de moto perde pressão mais rápido que carro. Substitutos modernos: Pirelli Citynet, Rinaldi RA50, Maggion.',
  },
  {
    modelName:    'CG 125 TODAY',
    yearFrom:     1990, yearTo: null,
    tireSize:     '2.75-18 (F) · 3.00-18 (R)',
    frontPsi:     29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes:        'Mesmas especificações da CG 125 base. Verifique DOT dos pneus — pneus com mais de 5 anos em moto vintage devem ser trocados mesmo com sulcos bons.',
  },
  {
    modelName:    'CG 125 TITAN',
    yearFrom:     1994, yearTo: null,
    tireSize:     '2.75-18 (F) · 3.00-18 (R)',
    frontPsi:     29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes:        'Pressão baixa aumenta consumo 10–15% e desgaste irregular. Verifique semanalmente. Com garupa pesada ou carga: aumente traseiro para 36 PSI.',
  },
  {
    modelName:    'CG 125 TITAN-ES',
    yearFrom:     1999, yearTo: null,
    tireSize:     '2.75-18 (F) · 3.00-18 (R)',
    frontPsi:     29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes:        'Mesmas especificações da TITAN base. Rinaldi RA50 e Maggion MTR são opções nacionais de boa relação custo-benefício.',
  },
  {
    modelName:    'CG 125 TITAN-KS',
    yearFrom:     1999, yearTo: null,
    tireSize:     '2.75-18 (F) · 3.00-18 (R)',
    frontPsi:     29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes:        'Mesmas especificações. Em motos de mototaxi com piloto + passageiro constante: 33 PSI dianteiro e 36 PSI traseiro.',
  },
  {
    modelName:    'CG 125 TITAN-KSE',
    yearFrom:     2002, yearTo: null,
    tireSize:     '2.75-18 (F) · 3.00-18 (R)',
    frontPsi:     29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes:        'Mesmas especificações da família TITAN. Pressão correta é o ajuste de manutenção mais simples e com maior impacto em consumo e estabilidade.',
  },
]

// ─── Manutenção ───────────────────────────────────────────────────────────────

const makeManutencao = (
  modelName: string, yearFrom: number, yearTo: number,
  hasElectricStart: boolean
): MaintenanceItemInput[] => [
  { modelName, yearFrom, yearTo, component: 'Óleo do motor (10W-30 JASO MA) + filtro', intervalKm: 3000, intervalMonths: 6, notes: 'Capacidade: ~1,0 L com filtro. Motul 3100 Gold 4T, Castrol Go! 4T ou Honda HP4. Em delivery: reduza para 2.500 km.', priority: 'CRITICAL', order: 1 },
  { modelName, yearFrom, yearTo, component: 'Regulagem de válvulas (adm 0,05 mm / esc 0,08 mm)', intervalKm: 6000, intervalMonths: 12, notes: 'Item mais negligenciado. Motor frio. Folga errada = perda de potência, consumo alto, barulho metálico. R$60–100 em oficina.', priority: 'CRITICAL', order: 2 },
  { modelName, yearFrom, yearTo, component: 'Vela de ignição NGK C7HSA', intervalKm: 8000, intervalMonths: 24, notes: 'Gap 0,6–0,7 mm. Torque: 12–15 N.m. Nunca use vela genérica — causa falha de ignição e partida difícil.', priority: 'HIGH', order: 3 },
  { modelName, yearFrom, yearTo, component: 'Filtro de ar (espuma) — limpeza', intervalKm: 3000, intervalMonths: 6, notes: 'Lave com diesel, seque, aplique filme fino de óleo motor. Troca total: a cada 20.000 km ou quando esfarelar.', priority: 'HIGH', order: 4 },
  { modelName, yearFrom, yearTo, component: 'Lubrificação da corrente de transmissão (428)', intervalKm: 500, intervalMonths: null, notes: 'Spray de corrente Motul, Wurth ou Castrol. Ajuste de folga: 20–30 mm vertical no meio da corrente.', priority: 'MEDIUM', order: 5 },
  { modelName, yearFrom, yearTo, component: 'Kit de transmissão (corrente 428 + coroa + pinhão)', intervalKm: 15000, intervalMonths: null, notes: 'DID 428VX + JT Sprockets JTF237 (14T) + JTR1134 (41T). Troque sempre os 3 juntos.', priority: 'HIGH', order: 6 },
  { modelName, yearFrom, yearTo, component: 'Limpeza e regulagem do carburador Keihin', intervalKm: 12000, intervalMonths: 12, notes: 'Parafuso de mistura: 2,5–3 voltas abertas. Jato principal #78 ou #80. Limpe jatos com spray limpa-carburador.', priority: 'HIGH', order: 7 },
  { modelName, yearFrom, yearTo, component: 'Filtro de combustível inline', intervalKm: 12000, intervalMonths: 12, notes: 'Filtro inline universal Ø6mm (R$10–20). Entupimento causa escassez de combustível no carburador.', priority: 'MEDIUM', order: 8 },
  { modelName, yearFrom, yearTo, component: 'Ajuste dos freios (dianteiro e traseiro)', intervalKm: 3000, intervalMonths: 6, notes: 'Freio dianteiro: 10–20 mm de folga na alavanca. Traseiro: 20–30 mm no pedal. Lona gasta: ruído metálico em frenagem.', priority: 'HIGH', order: 9 },
  ...(hasElectricStart ? [
    { modelName, yearFrom, yearTo, component: 'Bateria (12V 5Ah — YTZ5S ou YB5L-B)', intervalKm: null, intervalMonths: 18, notes: 'Verifique tensão de carga (13,8–14,8 V a 4.000 rpm) antes de instalar bateria nova. Yuasa YB5L-B R$180–250.', priority: 'HIGH', order: 10 },
    { modelName, yearFrom, yearTo, component: 'Regulador/retificador + verificação do estátor', intervalKm: null, intervalMonths: 12, notes: 'Tensão de carga: 13,8–14,8 V a 4.000 rpm. Estátor: 0,5–1,0 Ohm/fase. Regulador nacional: R$40–70.', priority: 'HIGH', order: 11 },
    { modelName, yearFrom, yearTo, component: 'Motor de partida elétrica (escovas + comutador)', intervalKm: 50000, intervalMonths: null, notes: 'Escovas desgastadas = starter lento. Kit de escovas para Honda CG 125 ES: R$20–40. Limpe o comutador com lixa fina.', priority: 'MEDIUM', order: 12 },
    { modelName, yearFrom, yearTo, component: 'Verificação do CDI + cabo de vela', intervalKm: null, intervalMonths: 24, notes: 'Cabo de vela: R$15–30 (acima de 20 kOhm = troque). CDI: substitua preventivamente em motos acima de 60.000 km.', priority: 'HIGH', order: 13 },
  ] : [
    { modelName, yearFrom, yearTo, component: 'Verificação do CDI + cabo de vela + bobina', intervalKm: null, intervalMonths: 24, notes: 'Cabo de vela: resistência < 20 kOhm. Bobina: primária 0,4–0,5 Ohm, secundária 10–14 kOhm. CDI: troque preventivamente acima de 60.000 km.', priority: 'HIGH', order: 10 },
    { modelName, yearFrom, yearTo, component: 'Mola e mecanismo do kickstart', intervalKm: null, intervalMonths: 12, notes: 'Aplique WD-40 no eixo do pedal. Mola quebrada = pedal não retorna = risco de interferência com pé. Mola: R$10–20.', priority: 'MEDIUM', order: 11 },
    { modelName, yearFrom, yearTo, component: 'Verificação do estátor (sistema AC para faróis)', intervalKm: null, intervalMonths: 24, notes: 'Meça tensão AC no fio amarelo: >7 VAC a 5.000 rpm para faróis normais. Rebobinagem: R$180–350.', priority: 'MEDIUM', order: 12 },
  ]),
]

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS = [
  { modelName: 'CG 125',         yearFrom: 1990, yearTo: null, MACETES: CG125_MACETES,         PROBLEMAS: CG125_PROBLEMAS },
  { modelName: 'CG 125 TODAY',   yearFrom: 1990, yearTo: null, MACETES: CG125TODAY_MACETES,     PROBLEMAS: CG125TODAY_PROBLEMAS },
  { modelName: 'CG 125 TITAN',   yearFrom: 1994, yearTo: null, MACETES: CG125TITAN_MACETES,     PROBLEMAS: CG125TITAN_PROBLEMAS },
  { modelName: 'CG 125 TITAN-ES', yearFrom: 1999, yearTo: null, MACETES: CG125TITANES_MACETES,  PROBLEMAS: CG125TITANES_PROBLEMAS },
  { modelName: 'CG 125 TITAN-KS', yearFrom: 1999, yearTo: null, MACETES: CG125TITANKS_MACETES, PROBLEMAS: CG125TITANKS_PROBLEMAS },
  { modelName: 'CG 125 TITAN-KSE', yearFrom: 2002, yearTo: null, MACETES: CG125TITANKSE_MACETES, PROBLEMAS: CG125TITANKSE_PROBLEMAS },
]

const ALL_MANUTENCAO: MaintenanceItemInput[] = [
  ...makeManutencao('CG 125',          1990, null, false),
  ...makeManutencao('CG 125 TODAY',    1990, null, false),
  ...makeManutencao('CG 125 TITAN',    1994, null, false),
  ...makeManutencao('CG 125 TITAN-ES', 1999, null, true),
  ...makeManutencao('CG 125 TITAN-KS', 1999, null, false),
  ...makeManutencao('CG 125 TITAN-KSE', 2002, null, true),
]

// ─── Runner ───────────────────────────────────────────────────────────────────

async function main() {
  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })

  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Honda', vehicleTypeId: motoType.id } },
    update: {}, create: { name: 'Honda', vehicleTypeId: motoType.id },
  })

  const brand = await prisma.brand.findFirstOrThrow({
    where: { name: 'Honda', vehicleTypeId: motoType.id },
  })

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {}, create: { name: block.modelName, brandId: brand.id },
    })

    const allTips = [
      ...block.MACETES.map(t => ({ ...t, category: 'MACETES' as Cat })),
      ...block.PROBLEMAS.map(t => ({ ...t, category: 'PROBLEMAS' as Cat })),
    ]

    await prisma.tip.deleteMany({ where: { modelName: block.modelName } })
    await prisma.tip.createMany({
      data: allTips.map((tip, i) => ({
        modelName: block.modelName,
        yearFrom:  null,
        yearTo:    null,
        severity:  tip.severity,
        category:  tip.category,
        title:     tip.title,
        body:      tip.body,
        order:     i,
      })),
    })

    console.log(`✅ ${block.modelName}: ${allTips.length} tips`)
  }

  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName } })
    await prisma.tirePressure.create({ data: tp })
    console.log(`🔵 TirePressure: ${tp.modelName}`)
  }

  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: BLOCKS.map(b => b.modelName) } } })
  await prisma.maintenanceItem.createMany({ data: ALL_MANUTENCAO })
  console.log(`🔧 MaintenanceItems: ${ALL_MANUTENCAO.length} itens`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
