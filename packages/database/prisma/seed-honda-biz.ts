// seed-honda-biz.ts — Honda Biz 100 / 110i / 125 / 125i
// Mopeds urbanos semi-automáticos: 4 marchas + embreagem centrífuga, transmissão por corrente
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

// ─── Honda Biz 100 (1998–2015) — 97,1cc OHC carburador ───────────────────────

const BIZ100_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA — 0,7 L (1,0 L total); embreagem centrífuga úmida exige MA, nunca MB',
    body: 'Use 10W-30 API SJ/SL JASO MA. Capacidade: 0,7 L na troca normal, 1,0 L no total. A Biz 100 tem embreagem centrífuga multidisco em banho de óleo — o mesmo óleo lubrica motor e embreagem. JASO MB (para scooter CVT com embreagem seca) causa patinação imediata da embreagem e perda de aceleração. Jamais use JASO MB na Biz. Intervalo Honda: 1ª troca aos 1.000 km, depois 1.500 km em uso severo (urbano intenso, poeira, calor) ou 3.000 km em uso normal. Use 3.000 km como máximo absoluto.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK C6HSA — gap 0,6–0,7 mm; troca a cada 8.000–12.000 km',
    body: 'Vela original: NGK C6HSA (rosca M14x1.25, hexágono 18mm). Gap: 0,6–0,7 mm. Inspecione a cada 6.000 km; troque a cada 8.000–12.000 km ou quando o eletrodo central estiver arredondado. Uma vela desgastada no motor OHC 97cc causa dificuldade de partida a frio, marcha lenta instável e perda de aceleração. Torque de aperto: 18–23 N.m. Alternativa equivalente: Champion RN3C. Verifique o gap mesmo em velas novas — podem sair de fábrica fora do especificado.',
  },
  {
    severity: 'OK',
    title: 'Semi-automática 4 marchas — sem alavanca de embreagem; pedal rotativo no pé esquerdo',
    body: 'A Biz 100 tem câmbio rotativo de 4 marchas acionado pelo pé esquerdo, com embreagem centrífuga automática. Não há alavanca de embreagem no guidão. Para sair: ligue o motor, engage a 1ª marcha (pedal para baixo) e acelere suavemente — a embreagem engata sozinha conforme a rotação sobe. Para parar: reduza a rotação, freie e coloque no ponto morto antes de parar completamente. Diferente de CVT scooter (sem marchas) e de moto manual (com alavanca). A transmissão final é por corrente, não correia CVT.',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão — lubrificar a cada 500 km e após chuva; folga 10–20 mm',
    body: 'Lubrifique a corrente a cada 500 km com lubrificante específico (Motul Chain Lube, WD-40 Chain, DID Lube). Com a moto no cavalete central, aplique no lado interno da corrente girando a roda lentamente. Folga correta: 10–20 mm no ponto mais tensionado. Abaixo de 10 mm (muito tensa): sobrecarrega rolamentos. Acima de 30 mm (muito folgada): risco de saltar da coroa. Com 15.000–20.000 km de uso urbano, avalie trocar o kit relação completo (corrente + coroa + pinhão).',
  },
  {
    severity: 'OK',
    title: 'Carburador — limpar preventivamente a cada 10.000–15.000 km e antes de guardar >30 dias',
    body: 'A Biz 100 usa carburador simples de borboleta. Em uso com gasolina adulterada ou parada por mais de 30 dias, os jatos entopem com verniz de combustível oxidado. Sinais de carburador sujo: dificuldade de partida a frio, engasgos ao acelerar, marcha lenta instável, motor apagando em semáforos. Manutenção preventiva: remova, desmonte e limpe com spray limpa-carburador a cada 10.000–15.000 km. Nunca use arame nos jatos. Ao guardar a moto por mais de 30 dias, drene o carburador pelo parafuso inferior.',
  },
  {
    severity: 'OK',
    title: 'Pneus com câmara — 60/100-17 (F) e 80/100-14 (R); calibragem 29/32 PSI solo',
    body: 'A Biz 100 usa pneus com câmara interna (não tubeless). Em furo, a câmara perde pressão rapidamente — carregue sempre um kit básico de reparo de câmara. Calibragem com pneus frios: 29 PSI dianteiro / 32 PSI traseiro em solo; 29/36 PSI com garupa. Pneus murchos reduzem estabilidade, aumentam consumo e desgastam irregularmente. Verificação semanal recomendada. Os modelos 1998–2005 usam medidas em polegadas (2.25-17 / 2.50-14), equivalentes às métricas 60/100-17 / 80/100-14 — na dúvida, use a medida métrica ao buscar câmara.',
  },
  {
    severity: 'OK',
    title: 'Afogador na partida a frio — abrir completamente, fechar após 2 min de aquecimento',
    body: 'Em dias frios ou após parada prolongada: abra o afogador (choke) completamente antes de ligar. Após o motor pegar e estabilizar a marcha lenta (~2 minutos), feche o afogador gradualmente. Nunca ande com afogador aberto: enriquece demais a mistura, dilui o óleo das paredes do cilindro e gera fumaça preta. Em dias quentes, muitas vezes não é necessário usar o afogador. Se o motor não pega mesmo com afogador, verifique carburador, vela e filtro de ar.',
  },
]

const BIZ100_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Carburador — principal causa de falha em motos paradas >30 dias ou com gasolina adulterada',
    body: 'O carburador da Biz 100 é sensível ao ressecamento em períodos de inatividade e à gasolina adulterada. Sintomas: dificuldade de partida a frio, engasgos ao acelerar do neutro, marcha lenta irregular, motor apagando em semáforos. Preventivo: nunca deixe a moto parada por mais de 2 semanas sem ligar; ao guardar por mais tempo, drene o carburador. Se já houver problema: limpeza e calibração com mecânico. Prefer gasolina de postos movimentados de bandeira conhecida.',
  },
  {
    severity: 'WARN',
    title: 'Corrente de transmissão — desgaste precoce sem lubrificação frequente',
    body: 'A corrente da Biz 100 exige lubrificação a cada 500 km — frequência maior que a maioria das motos. Correntes ressecadas esticam rapidamente, fazem barulho metálico ao pedalar e podem saltar da coroa em freadas bruscas. Quando a corrente esticou demais, não adianta apenas apertar o tensor: troque o kit completo (corrente + pinhão + coroa). Instalar corrente nova em pinhão desgastado destrói a corrente em poucos quilômetros.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico — regulador de voltagem e bateria envelhecem após 50.000 km',
    body: 'Em Biz 100 com muitos quilômetros ou anos de uso, os problemas elétricos mais comuns são: bateria que descarrega rápido, regulador de voltagem falhando (sobrecarrega e destrói bateria) e bornes oxidados. Sinais: luz fraca ao ligar, dificuldade de partida elétrica, bateria morrendo em dias. Verifique a tensão: em vazio deve ser 12,6 V; com motor a ~3.000 rpm deve ser 13,7–14,5 V. Valores fora da faixa indicam regulador defeituoso.',
  },
  {
    severity: 'WARN',
    title: 'Pneus com câmara — furo repentino e dificuldade de achar câmaras na medida antiga',
    body: 'Pneus com câmara perdem pressão subitamente em furo (não gradualmente como tubeless). Para modelos 1998–2005 com medidas em polegadas (2.25-17 / 2.50-14), câmaras de reposição podem ser difíceis de encontrar em borracharias menores. Modelos 2013–2015 usam métricas 60/100-17 / 80/100-14, mais acessíveis. Carregue um kit de emergência (remendo, cola, chave de aro). Em furo na rua, não ande mesmo por curta distância — câmara furada e aro podem dobrar.',
  },
]

// ─── Honda Biz 110i (2016–2024) — 109,1cc OHC PGM-FI ────────────────────────

const BIZ110I_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA2 — 0,8 L (1,0 L total); 1ª troca 1.000 km, depois 6.000 km',
    body: 'Use 10W-30 API SL JASO MA2. Capacidade: 0,8 L na troca normal (dreno pelo cárter), 1,0 L no total. A Biz 110i tem embreagem centrífuga multidisco em banho de óleo — JASO MB é PROIBIDO (é para CVT scooter com embreagem seca; causa patinação imediata na Biz). Intervalo oficial Honda: 1ª troca 1.000 km para eliminar partículas de rodagem; depois 6.000 km ou 12 meses, o que vier primeiro. Muitos mecânicos de bairro recomendam 3.000 km por hábito antigo — o manual Honda diz 6.000 km para este modelo.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CPR6EA-9S — gap 0,9 mm; o sufixo "S" é eletrodo superficial, diferente da Biz 125',
    body: 'Vela original: NGK CPR6EA-9S (com "S" — eletrodo de descarga superficial, melhora ignição em motor PGM-FI). Gap: 0,9 mm. ATENÇÃO: a Biz 125 usa CPR6EA-9 SEM sufixo "S" — não são intercambiáveis. Inspecione a cada 8.000 km; troque a cada 16.000 km. Torque de aperto: 10–12 N.m (motor de alumínio com rosca M10 — não aperte demais). Ao instalar, verifique o gap mesmo em velas novas.',
  },
  {
    severity: 'OK',
    title: 'Folga de válvulas IN = EX = 0,05 mm (± 0,02 mm) a cada 6.000 km — motor frio',
    body: 'Motor OHC 2 válvulas: folga com motor frio (abaixo de 35°C) — admissão 0,05 mm e escape 0,05 mm. A mesma folga para as duas válvulas. Regulagem por parafuso e contra-porca (mais simples que shims de motos maiores). Sinais de folga errada: tintilar metálico em marcha lenta (folga excessiva) ou perda de compressão e dificuldade de partida (folga insuficiente). Verifique a cada 6.000 km junto com a troca de óleo. Em motos com >30.000 km sem regulagem prévia, a folga pode estar bem fora do especificado.',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão passo 428 — lubrificar a cada 1.000 km; folga 30–40 mm',
    body: 'Corrente DID/RK passo 428, 106 elos. Lubrifique a cada 1.000 km ou após chuva com lubrificante específico para corrente. Folga correta: 30–40 mm de movimento lateral medido no meio do vão entre pinhão e coroa. Corrente tensa demais (<30 mm) sobrecarrega os rolamentos do câmbio; folgada demais (>50 mm) pode saltar da coroa. Ajuste pelo tensor no eixo traseiro; verifique o alinhamento da roda pelas marcas nas abas do garfo traseiro após ajuste.',
  },
  {
    severity: 'OK',
    title: 'PGM-FI — indicador FI pisca código de erro; 8 piscadas = falha no sensor TPS',
    body: 'Quando há falha no sistema de injeção, o indicador FI no painel pisca em código: conte os flashes para identificar o erro. O código mais comum é o 8 (TPS — sensor de posição da borboleta). A injeção elimina o afogador e a calibração do carburador, mas exige combustível de qualidade. Gasolina adulterada ou com excesso de água entope o bico injetor e contamina o TPS. Não ignore o FI piscando: leve para leitura com scanner Honda. Partida a frio é imediata, sem aguardar aquecimento como no carburador.',
  },
  {
    severity: 'OK',
    title: 'Freios a tambor (frente 130mm + trás 110mm) — ajuste periódico das lonas pelo cabo',
    body: 'Ambas as rodas têm freio a tambor. Com o desgaste das lonas, o curso do manete e do pedal aumenta progressivamente. Ajuste pela porca de regulagem no cabo: o manete dianteiro deve acionar o freio com ~10–15 mm de folga inicial antes de travar. Quando as lonas chegam ao limite, há chiado e redução clara da frenagem — troque o conjunto lona e verifique o tambor. Em chuva, tambores ficam temporariamente menos eficientes que discos. Nunca regule com as lonas completamente gastas: o freio pode falhar subitamente.',
  },
  {
    severity: 'OK',
    title: 'Tanque 5,1 L (reserva 1,4 L) — autonomia de 280–340 km; bomba submersa não gosta de nível baixo',
    body: 'Motor PGM-FI de 109cc é eficiente: 55–65 km/l em uso urbano tranquilo, 45–50 km/l em urbano intenso. Autonomia real do tanque de 5,1 L: 280–320 km. A reserva de 1,4 L acende o indicador no painel. Evite rodar frequentemente com o nível abaixo de 1 L: a bomba de combustível fica submersa no tanque e usa o combustível para se resfriar — nível baixo constante superaquece a bomba e encurta sua vida útil.',
  },
  {
    severity: 'OK',
    title: 'Biz 110i foi descontinuada em 2024 — substituída pela Biz 125 ES; peças ainda disponíveis',
    body: 'A Biz 110i saiu de produção em 2024, substituída pela Biz 125 ES como versão de entrada da linha. As peças de manutenção de consumo (filtro de ar, vela CPR6EA-9S, corrente, lonas de freio) continuarão disponíveis por muitos anos nas redes de peças Honda e distribuidores. Componentes eletrônicos específicos (TPS, medidor de combustível, painel) podem ter prazo de entrega mais longo no futuro. Para quem tem Biz 110i 2024, o suporte de garantia e peças segue normal por pelo menos 5 anos.',
  },
]

const BIZ110I_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Sensor TPS — falha mais relatada; causa marcha lenta irregular e indicador FI piscando',
    body: 'O TPS (Throttle Position Sensor) é o componente eletrônico que mais falha na Biz 110i. Causas: gasolina adulterada com água, lavagem a jato direto no corpo da borboleta, umidade no conector. Sintomas: indicador FI pisca (código 8), marcha lenta sobe e desce entre 800 e 1.500 rpm, engasgos ao acelerar do neutro. Solução: limpeza do TPS e do conector com spray limpa-contato elétrico. Se persistir, troca do sensor TPS — custo acessível. Não ignore: em casos graves, o motor apaga em movimento.',
  },
  {
    severity: 'WARN',
    title: 'Corrente — desgaste precoce em uso urbano com paradas frequentes',
    body: 'Uso intenso em cidade (partidas frequentes da 1ª marcha + corrente sem lubrificação regular) desgasta o kit de transmissão antes dos 20.000 km. Sintomas: barulho de estalo ao pedalar, sensação de pulo na aceleração, corrente visivelmente solta mesmo com tensor no fim do curso. Ao trocar, substitua sempre o kit completo (corrente + pinhão + coroa) — corrente nova em pinhão desgastado dura muito pouco e os dentes do pinhão destroem a corrente nova.',
  },
  {
    severity: 'WARN',
    title: 'Elétrica — oxidação nos bornes da bateria e falhas após exposição prolongada à chuva',
    body: 'Bornes de bateria oxidados (pó branco ou azulado) aumentam a resistência e dificultam a partida elétrica. Limpe os bornes com escova de metal e aplique graxa dielétrica a cada 6.000 km. Conectores elétricos sob a carenagem também oxidam — aplique spray dielétrico nas revisões. Após chuva torrencial, verifique a partida e as luzes; se algo estiver diferente, aguarde o sistema secar antes de continuar. O conector do TPS é o mais vulnerável à umidade.',
  },
  {
    severity: 'OK',
    title: 'Zumbido da bomba de combustível ao ligar a ignição — barulho normal, não é defeito',
    body: 'Ao girar a chave para ON antes de dar partida, a Biz 110i emite um zumbido de 1–2 segundos: é a bomba pressurizando o sistema de injeção. Completamente normal. O que pode indicar problema: zumbido que não para, ausência total de zumbido (bomba morta — moto não pega), ou zumbido muito alto e irregular. Bombas Honda têm vida útil de 60.000–80.000 km em condições normais. Evite rodar com o tanque abaixo de 1 L frequentemente para não superaquecer a bomba submersa.',
  },
]

// ─── Honda Biz 125 (2005–2008) — 124,9cc OHC carburador ─────────────────────

const BIZ125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA — 0,7 L (0,9 L total); 1ª troca 1.000 km, depois 3.000 km',
    body: 'Use 10W-30 API SF/SG JASO MA. Capacidade: 0,7 L na troca normal, 0,9 L no total. Embreagem centrífuga em banho de óleo — JASO MA obrigatório. A geração carburada exigia intervalos mais curtos: 1ª troca 1.000 km; depois 1.500 km em uso urbano severo (trânsito pesado, poeira, calor intenso) ou 3.000 km em uso misto. Em cidades grandes com trânsito parado, adote o ciclo de 1.500 km para prolongar a vida do motor. Após 2009, a versão injeção (Biz 125i) passou para 6.000 km de intervalo.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CPR6EA-9 — gap 0,8–0,9 mm; SEM sufixo "S" (diferente da Biz 110i)',
    body: 'Vela original: NGK CPR6EA-9 (sem sufixo "S"). Gap: 0,8–0,9 mm. Inspecione a cada 6.000 km; troque a cada 12.000 km. A Biz 125 carburada é sensível à qualidade da vela: gap errado ou eletrodo desgastado causa engasgos nas acelerações, especialmente com carburador desregulado. Se usar combustível com alto teor de etanol, verifique a vela com frequência — etanol resseca o eletrodo mais rapidamente em motores de carburador a ar.',
  },
  {
    severity: 'OK',
    title: 'Carburador — afogador obrigatório em partidas frias; calibrar o piloto de marcha lenta',
    body: 'Puxe o afogador completamente em partidas frias ou após longa inatividade. Aguarde 1–2 min antes de fechar. Jamais ande com afogador ligado: enriquece a mistura, lava o óleo das paredes do cilindro e causa fumaça preta. O parafuso piloto (marcha lenta) pode precisar de ajuste após limpeza do carburador ou regulagem. Em altitudes acima de 1.000 m (Belo Horizonte, Curitiba, interior gaúcho), o ar rarefeito deixa a mistura rica — pode ser necessário reduzir o jato principal 1 grau.',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão passo 428 — lubrificar a cada 500–1.000 km; folga 20–30 mm',
    body: 'Corrente 428M, 106 elos. Lubrifique a cada 500–1.000 km e após chuva. Folga correta: 20–30 mm de jogo lateral no ponto médio. O motor 124,9cc tem mais torque que o 97cc da Biz 100 e sobrecarrega mais a corrente em saídas bruscas do semáforo. Nunca use WD-40 como lubrificante permanente de corrente (é desobstruidor, evapora rápido e resseca). Use sempre lubrificante específico para corrente de moto.',
  },
  {
    severity: 'OK',
    title: 'Folga de válvulas IN = EX = 0,05 mm (± 0,02 mm) — a cada 6.000 km, motor frio',
    body: 'Motor OHC 2 válvulas: admissão 0,05 mm e escape 0,05 mm com motor frio. Regulagem por parafuso e contra-porca. Sinais de folga errada: tintilar metálico em marcha lenta (folga grande) ou perda de compressão (folga pequena). Verificação recomendada a cada 6.000 km. Em motos com >30.000 km sem regulagem, a folga costuma estar fora do especificado por desgaste natural do assento de válvula.',
  },
  {
    severity: 'OK',
    title: 'Pneus com câmara — 60/100-17 (F) e 80/100-14 (R); calibragem 25/33 PSI solo',
    body: 'Mesmos pneus da Biz 125i: 60/100-17 dianteiro e 80/100-14 traseiro, ambos com câmara interna. Calibragem com pneus frios: 25 PSI dianteiro / 33 PSI traseiro em solo; 25/41 PSI com garupa. Pneus com câmara perdem pressão subitamente em furo — carregue kit básico de reparo. Verificação semanal essencial. Não use pressão impressa no flanco do pneu (é a máxima estrutural, não a pressão de uso).',
  },
]

const BIZ125_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Carburador entupido — primeira causa de falha em motos paradas ou com gasolina ruim',
    body: 'O carburador da Biz 125 (2005–2008) é o ponto fraco da geração. Gasolina adulterada ou parada por mais de 30 dias deixa depósitos nos jatos. Sintomas: partida difícil, engasgos ao acelerar, marcha lenta que morre no semáforo. Solução: limpeza completa com spray limpa-carburador e agulha de passagem. Nunca use arame nos jatos. Ao guardar a moto por mais de 2 semanas, drene o carburador pelo parafuso de dreno inferior. Modelos com >40.000 km podem precisar de recalibração do piloto por desgaste.',
  },
  {
    severity: 'WARN',
    title: 'Afogador esquecido ligado — dilui o óleo das paredes do cilindro e desgasta o motor',
    body: 'Usar o afogador por mais de 3 minutos ou esquecer ligado durante o trajeto causa enriquecimento excessivo: gasolina diluída penetra nas paredes do cilindro, lavando a película de óleo e aumentando o desgaste do pistão/cilindro. Sinais: fumaça preta pelo escapamento, cheiro forte de gasolina queimada, consumo muito alto. Boa prática: após pegar o motor a frio, aguarde 1–2 min com o afogador, reduza para meio afogador por mais 1 min, depois feche completamente.',
  },
  {
    severity: 'WARN',
    title: 'Corrente de transmissão — desgaste rápido com o torque do motor 125cc',
    body: 'O motor 124,9cc tem torque de 1,04 kgf.m — significativamente mais que o Biz 100. Esse torque, combinado com saídas frequentes de semáforo sem lubrificação regular, desgasta a corrente mais rapidamente. Sintomas de corrente gasta: barulho de estalo ao acelerar, sensação de pulo na transmissão, corrente solta mesmo com tensor no limite. Troque sempre o kit completo (corrente + pinhão + coroa). Instalar corrente nova em pinhão desgastado destrói a corrente nova em poucos milhares de quilômetros.',
  },
]

// ─── Honda Biz 125i (2009–atual) — 124,9cc OHC PGM-FI Flex ──────────────────

const BIZ125I_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Óleo 10W-30 JASO MA2 — 0,7 L (0,9 L total); 1ª troca 1.000 km, depois 6.000 km',
    body: 'Use 10W-30 API SL JASO MA2. Capacidade: 0,7 L na troca normal, 0,9 L no total. Embreagem centrífuga em banho de óleo — JASO MA2 obrigatório; JASO MB é para CVT e causa patinação imediata. Intervalo oficial Honda: 1ª troca 1.000 km, depois 6.000 km ou 12 meses. Muitos mecânicos de bairro recomendam 3.000 km — isso está desatualizado para este modelo; o manual Honda diz 6.000 km. Em cidades com calor intenso e trânsito parado (São Paulo, Manaus), troque com 5.000 km para margem de segurança.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CPR6EA-9 — gap 0,8–0,9 mm; SEM sufixo "S" (Biz 110i usa CPR6EA-9S)',
    body: 'Vela original: NGK CPR6EA-9 (sem sufixo "S"). Gap: 0,8–0,9 mm. Torque de aperto: 10–12 N.m. Inspecione a cada 8.000 km; troque a cada 12.000–16.000 km. A Biz 125i Flex pode precisar de troca mais frequente com uso intenso de etanol puro — combustível queima mais frio e pode carbonizar o eletrodo. Confirme o gap antes de instalar mesmo em velas novas — velas de marcas genéricas frequentemente saem fora do especificado. Não use a vela da Biz 110i (CPR6EA-9S) na Biz 125i.',
  },
  {
    severity: 'OK',
    title: 'Motor Flex (desde 2011) — gasolina E27 ou etanol E100; PGM-FI ajusta automaticamente pela sonda lambda',
    body: 'A Biz 125i Flex funciona com gasolina comum (E27), etanol puro (E100) ou qualquer mistura. A sonda lambda (sensor de O2) ajusta a mistura em tempo real — não é necessário reprogramar ou calibrar. Etanol oferece mais torque em baixa rotação; gasolina dá ~25% mais autonomia. Pode misturar os dois combustíveis sem problema. Se a moto ficou parada >30 dias com tanque cheio de etanol puro, prefira abastecer com gasolina na volta — etanol envelhece mais rápido e pode ressecar vedantes internos do sistema de injeção.',
  },
  {
    severity: 'OK',
    title: 'Folga de válvulas IN = EX = 0,05 mm (± 0,02 mm) — verificar a cada 6.000 km',
    body: 'Motor OHC 2 válvulas: admissão 0,05 mm e escape 0,05 mm com motor frio (abaixo de 35°C). Regulagem por parafuso e contra-porca. Ideal verificar a cada revisão de óleo (6.000 km). Sinais de folga errada: tintilar metálico em marcha lenta (folga grande) ou perda de compressão (folga pequena). Em motos com >40.000 km sem regulagem prévia, o desgaste natural do assento de válvula aumenta a folga — regulagem pode ser necessária com mais frequência.',
  },
  {
    severity: 'OK',
    title: 'Corrente DID 428M — lubrificar a cada 1.000 km; folga 20–30 mm',
    body: 'Corrente passo 428, 106 elos. Lubrifique a cada 1.000 km ou após chuva forte. Folga correta: 20–30 mm de movimento lateral medido no ponto médio. Ajuste pelo tensor no eixo traseiro; verifique o alinhamento da roda pelas marcas nas abas do garfo. Com 20.000 km de uso urbano intenso, avalie trocar o kit completo (corrente + pinhão + coroa). Nunca instale corrente nova em pinhão/coroa desgastados — os dentes velhos destroem a corrente nova em poucos meses.',
  },
  {
    severity: 'OK',
    title: 'Sensor TPS — o erro mais comum; 8 piscadas do FI no painel = falha TPS',
    body: 'O TPS (Throttle Position Sensor) é o componente eletrônico que mais falha na Biz 125i. Causas: gasolina com água, lavagem a jato direto no corpo de borboleta, vibração nos conectores. Código 8 (oito piscadas do indicador FI): TPS. Sintomas: marcha lenta sobe e desce sozinha (800–1.500 rpm), engasgos ao accelerar suavemente do neutro, dificuldade de partida. Solução: limpeza do conector e do sensor com spray limpa-contato. Se persistir, troca do TPS. Não ignore — em piora, o motor apaga em movimento.',
  },
  {
    severity: 'OK',
    title: 'Freio a disco dianteiro 220mm (versão ES) — pastilhas duram 20.000–30.000 km; inspecionar a cada 10.000',
    body: 'A Biz 125 ES tem disco dianteiro de 220mm com pinça de 2 pistões — mais eficiente que o tambor da versão KS. Pastilhas originais duram 20.000–30.000 km em uso misto. Inspecione a espessura a cada 10.000 km: troque quando atingir 2 mm ou menos. O disco deve ser trocado quando a espessura cair abaixo de 3,0 mm (marcado no próprio disco). Fluido DOT 4: troque a cada 2 anos independente do km — fluido velho absorve umidade e perde ponto de ebulição, causando frenagem esponjosa.',
  },
  {
    severity: 'OK',
    title: 'Tanque 5,1 L (reserva 1,5 L) — autonomia de 250–310 km; 80 km/h é o limite saudável',
    body: 'Consumo real: 50–60 km/l em uso misto com PGM-FI bem regulado; autonomia de 255–306 km. A reserva de 1,5 L acende o indicador no painel. Em rodovias: o motor em 4ª marcha a 80 km/h gira em torno de 7.000 rpm — acima da faixa ideal. Para trechos ocasionais de estrada, 80–85 km/h é razoável. Evitar uso constante acima de 90 km/h por longos períodos: motor pequeno de 4 marchas não foi projetado para isso e o desgaste aumenta significativamente.',
  },
]

const BIZ125I_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Sensor TPS — problema crônico da linha; código 8 piscadas FI, marcha lenta irregular',
    body: 'O TPS é o defeito mais relatado pelos donos de Biz 125i em todos os anos do modelo. Acelerado por: gasolina adulterada com água, lavagem a pressão no painel/motor, vibração nos conectores. Código 8 de erro FI. Solução: limpeza do conector e do sensor. Se não resolver, troca do TPS — peça acessível. Não ignore um TPS defeituoso: em casos graves, o motor apaga em movimento com risco de acidente.',
  },
  {
    severity: 'WARN',
    title: 'Painel e carenagens — infiltração de água e rangidos crônicos relatados em todos os anos',
    body: 'Dois problemas amplamente documentados em todos os anos da Biz 125i: 1) Infiltração de água pelo painel digital, causando manchas e falhas nas informações; 2) Rangidos e vibrações das carenagens plásticas, especialmente em estradas com buracos. Para infiltração: reveja a vedação e aplique silicone nas bordas do painel. Para rangidos: aperte os parafusos de carenagem e aplique espuma de vedação nas áreas de contato plástico-plástico. Problema de projeto, não de fabricação — afeta praticamente todos os exemplares após algum uso.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão dianteira — comportamento rígido em piso irregular; limitação de projeto',
    body: 'A suspensão dianteira da Biz 125i é configurada para asfalto urbano e não tem ajuste. Em buracos, paralelepípedos e lombadas, o amortecimento é insuficiente e o piloto sente os impactos no punho. Não é defeito, é característica do projeto commuter urbano. Paliativo: manter a calibragem correta dos pneus (25 PSI dianteiro) — pneu na pressão certa absorve melhor os choques. Os amortecedores traseiros originais também são básicos; upgrade para amortecedores de qualidade melhora o conforto geral.',
  },
  {
    severity: 'WARN',
    title: 'Desempenho em rodovia — 4 marchas sem 5ª; uso acima de 80 km/h sobrecarrega o motor',
    body: 'A Biz 125i tem apenas 4 marchas. A 4ª marcha a 80 km/h mantém o motor próximo de 7.000 rpm — acima da faixa de pico de torque (3.500 rpm). Uso constante acima de 90 km/h aumenta o consumo, o ruído e o desgaste do retento do virabrequim. Para uso regular em rodovias com trechos de >20 km, a CG 160 ou Titan 160 (com 5 marchas e motor maior) são mais adequadas. A Biz 125i é otimizada para velocidades de até 60–70 km/h.',
  },
  {
    severity: 'WARN',
    title: 'Série 2025 — relê de partida com defeito de fábrica relatado; acionar garantia',
    body: 'Donos de Biz 125i 2025 relataram dificuldade de partida elétrica em exemplares zero km: o motor de arranque não gira mesmo com bateria carregada. Causa: relê de partida (starter relay) com defeito de fabricação. Se a moto é 2025 e apresenta esse sintoma nos primeiros meses, acione a garantia Honda (24 meses para defeitos de fabricação). Não tente forçar a partida repetidamente — pode danificar o motor de arranque. Use o pedal KS como alternativa temporária enquanto aguarda o reparo em garantia.',
  },
]

// ─── Blocos de modelos ────────────────────────────────────────────────────────

const BLOCKS: {
  modelName: string; yearFrom: number; yearTo: number | null
  MACETES: TipInput[]; PROBLEMAS: TipInput[]
}[] = [
  { modelName: 'C 100 Biz', yearFrom: 1998, yearTo: 2015, MACETES: BIZ100_MACETES,  PROBLEMAS: BIZ100_PROBLEMAS  },
  { modelName: 'Biz 110i', yearFrom: 2016, yearTo: 2024, MACETES: BIZ110I_MACETES, PROBLEMAS: BIZ110I_PROBLEMAS },
  { modelName: 'Biz 125',     yearFrom: 2003, yearTo: 2013, MACETES: BIZ125_MACETES,  PROBLEMAS: BIZ125_PROBLEMAS  },
  { modelName: 'BIZ 125/125i', yearFrom: 2009, yearTo: null, MACETES: BIZ125I_MACETES, PROBLEMAS: BIZ125I_PROBLEMAS },
]

// ─── Calibragem de pneus ──────────────────────────────────────────────────────

const TIRE_PRESSURES = [
  {
    modelName: 'C 100 Biz',
    yearFrom: 1998, yearTo: 2015,
    tireSize: '60/100-17 (F) · 80/100-14 (R)',
    frontPsi: 29, rearPsi: 32,
    frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Pneus com câmara interna (não tubeless). Em furo, perde pressão subitamente — carregar kit de reparo de câmara. Modelos 1998–2005 usam medidas em polegadas (2.25-17 / 2.50-14), equivalentes métricas das acima. Calibrar sempre com pneus frios (antes de rodar ou após 3h parada). Solo: F 29 PSI / R 32 PSI. Com garupa: F 29 PSI / R 36 PSI.',
  },
  {
    modelName: 'Biz 110i',
    yearFrom: 2016, yearTo: 2024,
    tireSize: '60/100-17 (F) · 80/100-14 (R)',
    frontPsi: 25, rearPsi: 29,
    frontPsiLoad: 25, rearPsiLoad: 33,
    notes: 'Pneus com câmara interna (não tubeless). Calibrar com pneus frios. Solo: F 25 PSI / R 29 PSI. Com garupa: F 25 PSI / R 33 PSI. Pneus murchos comprometem a estabilidade — verificar semanalmente. Em furo, a câmara perde pressão abruptamente; não ande mesmo por distâncias curtas.',
  },
  {
    modelName: 'Biz 125',
    yearFrom: 2003, yearTo: 2013,
    tireSize: '60/100-17 (F) · 80/100-14 (R)',
    frontPsi: 25, rearPsi: 33,
    frontPsiLoad: 25, rearPsiLoad: 41,
    notes: 'Pneus com câmara interna. Calibrar com pneus frios. Solo: F 25 PSI / R 33 PSI. Com garupa: F 25 PSI / R 41 PSI. Motor 125cc aplica mais torque na roda traseira — calibragem traseira correta é ainda mais importante para desgaste uniforme e estabilidade.',
  },
  {
    modelName: 'BIZ 125/125i',
    yearFrom: 2009, yearTo: null,
    tireSize: '60/100-17 (F) · 80/100-14 (R)',
    frontPsi: 25, rearPsi: 33,
    frontPsiLoad: 25, rearPsiLoad: 41,
    notes: 'Pneus com câmara interna (não tubeless). Calibrar sempre com pneus frios. Solo: F 25 PSI / R 33 PSI. Com garupa: F 25 PSI / R 41 PSI. Não use a pressão máxima impressa no flanco do pneu (pressão estrutural máxima, não de uso). Verificação semanal recomendada.',
  },
]

// ─── Itens de manutenção ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // Biz 100
  { modelName: 'C 100 Biz', yearFrom: 1998, yearTo: 2015, component: 'Óleo do motor (1ª revisão)',          intervalKm: 1000,  intervalMonths: null, notes: '10W-30 JASO MA; elimina partículas de assentamento',                                 priority: 'CRITICAL', order: 1  },
  { modelName: 'C 100 Biz', yearFrom: 1998, yearTo: 2015, component: 'Óleo do motor',                       intervalKm: 3000,  intervalMonths: 12,   notes: '10W-30 JASO MA; ~0,7 L; 1.500 km em uso urbano severo',                         priority: 'CRITICAL', order: 2  },
  { modelName: 'C 100 Biz', yearFrom: 1998, yearTo: 2015, component: 'Vela de ignição (NGK C6HSA)',         intervalKm: 12000, intervalMonths: null,  notes: 'Gap 0,6–0,7 mm; inspecionar a 6.000 km',                                        priority: 'HIGH',     order: 3  },
  { modelName: 'C 100 Biz', yearFrom: 1998, yearTo: 2015, component: 'Filtro de ar',                       intervalKm: 12000, intervalMonths: 12,   notes: 'Limpar a 6.000 km; trocar 12.000–18.000 km ou se danificado',                   priority: 'HIGH',     order: 4  },
  { modelName: 'C 100 Biz', yearFrom: 1998, yearTo: 2015, component: 'Folga de válvulas',                  intervalKm: 6000,  intervalMonths: 12,   notes: 'IN = EX = 0,05 mm ± 0,02 mm; motor frio; parafuso + contra-porca',             priority: 'HIGH',     order: 5  },
  { modelName: 'C 100 Biz', yearFrom: 1998, yearTo: 2015, component: 'Corrente — lubrificação',            intervalKm: 500,   intervalMonths: null,  notes: 'Lubrificante específico para corrente; após chuva também',                      priority: 'MEDIUM',   order: 6  },
  { modelName: 'C 100 Biz', yearFrom: 1998, yearTo: 2015, component: 'Corrente — tensão e alinhamento',   intervalKm: 1000,  intervalMonths: null,  notes: 'Folga 10–20 mm no ponto médio; alinhar roda pelas marcas',                     priority: 'MEDIUM',   order: 7  },
  { modelName: 'C 100 Biz', yearFrom: 1998, yearTo: 2015, component: 'Carburador — limpeza preventiva',   intervalKm: 15000, intervalMonths: null,  notes: 'Spray limpa-carburador; jatos, agulha e câmara de flutuador',                   priority: 'MEDIUM',   order: 8  },
  { modelName: 'C 100 Biz', yearFrom: 1998, yearTo: 2015, component: 'Lonas de freio (tambor F+R)',        intervalKm: 20000, intervalMonths: null,  notes: 'Tambor dianteiro 130mm; traseiro 110mm; trocar se com chiado ou curso longo',  priority: 'HIGH',     order: 9  },
  { modelName: 'C 100 Biz', yearFrom: 1998, yearTo: 2015, component: 'Bateria',                            intervalKm: null,  intervalMonths: 36,   notes: 'Tensão em vazio 12,6 V; em carga 13,7–14,5 V; bornes limpos com graxa diel.', priority: 'MEDIUM',   order: 10 },
  // Biz 110i
  { modelName: 'Biz 110i', yearFrom: 2016, yearTo: 2024, component: 'Óleo do motor (1ª revisão)',        intervalKm: 1000,  intervalMonths: null, notes: '10W-30 JASO MA2; 0,8 L; elimina partículas de rodagem',                        priority: 'CRITICAL', order: 1  },
  { modelName: 'Biz 110i', yearFrom: 2016, yearTo: 2024, component: 'Óleo do motor',                     intervalKm: 6000,  intervalMonths: 12,   notes: '10W-30 JASO MA2; 0,8 L na troca normal; JASO MB proibido',                    priority: 'CRITICAL', order: 2  },
  { modelName: 'Biz 110i', yearFrom: 2016, yearTo: 2024, component: 'Vela de ignição (NGK CPR6EA-9S)',   intervalKm: 16000, intervalMonths: null,  notes: 'Com sufixo "S"; gap 0,9 mm; inspecionar a 8.000 km',                           priority: 'HIGH',     order: 3  },
  { modelName: 'Biz 110i', yearFrom: 2016, yearTo: 2024, component: 'Filtro de ar',                     intervalKm: 12000, intervalMonths: 12,   notes: 'Limpar a 4.000–6.000 km; trocar 12.000–18.000 km',                             priority: 'HIGH',     order: 4  },
  { modelName: 'Biz 110i', yearFrom: 2016, yearTo: 2024, component: 'Folga de válvulas',                intervalKm: 6000,  intervalMonths: 12,   notes: 'IN = EX = 0,05 mm ± 0,02 mm; motor frio; parafuso + contra-porca',             priority: 'HIGH',     order: 5  },
  { modelName: 'Biz 110i', yearFrom: 2016, yearTo: 2024, component: 'Corrente — lubrificação',          intervalKm: 1000,  intervalMonths: null,  notes: 'Lubrificante específico para corrente; após chuva também',                      priority: 'MEDIUM',   order: 6  },
  { modelName: 'Biz 110i', yearFrom: 2016, yearTo: 2024, component: 'Corrente — tensão e alinhamento', intervalKm: 1000,  intervalMonths: null,  notes: 'Folga 30–40 mm no ponto médio; passo 428, 106 elos',                           priority: 'MEDIUM',   order: 7  },
  { modelName: 'Biz 110i', yearFrom: 2016, yearTo: 2024, component: 'Filtro de tela de óleo',           intervalKm: 12000, intervalMonths: null,  notes: 'Limpeza; trocar se danificado ou obstruído',                                   priority: 'MEDIUM',   order: 8  },
  { modelName: 'Biz 110i', yearFrom: 2016, yearTo: 2024, component: 'Lonas de freio (tambor F+R)',      intervalKm: 20000, intervalMonths: null,  notes: 'Tambor dianteiro 130mm e traseiro 110mm; chiado indica limite atingido',       priority: 'HIGH',     order: 9  },
  { modelName: 'Biz 110i', yearFrom: 2016, yearTo: 2024, component: 'Bateria',                          intervalKm: null,  intervalMonths: 36,   notes: '12V 4Ah; tensão em vazio 12,6 V; bornes limpos com graxa dielétrica',         priority: 'MEDIUM',   order: 10 },
  // Biz 125 (carburada)
  { modelName: 'Biz 125', yearFrom: 2003, yearTo: 2013, component: 'Óleo do motor (1ª revisão)',         intervalKm: 1000,  intervalMonths: null, notes: '10W-30 JASO MA; 0,7 L; partículas de rodagem',                                 priority: 'CRITICAL', order: 1  },
  { modelName: 'Biz 125', yearFrom: 2003, yearTo: 2013, component: 'Óleo do motor',                      intervalKm: 3000,  intervalMonths: 12,   notes: '10W-30 JASO MA; 0,7 L; 1.500 km em uso urbano severo',                        priority: 'CRITICAL', order: 2  },
  { modelName: 'Biz 125', yearFrom: 2003, yearTo: 2013, component: 'Vela de ignição (NGK CPR6EA-9)',     intervalKm: 12000, intervalMonths: null,  notes: 'Sem sufixo "S"; gap 0,8–0,9 mm; inspecionar a 6.000 km',                      priority: 'HIGH',     order: 3  },
  { modelName: 'Biz 125', yearFrom: 2003, yearTo: 2013, component: 'Filtro de ar',                      intervalKm: 12000, intervalMonths: 12,   notes: 'Limpar a 6.000 km; trocar 12.000–18.000 km',                                   priority: 'HIGH',     order: 4  },
  { modelName: 'Biz 125', yearFrom: 2003, yearTo: 2013, component: 'Folga de válvulas',                 intervalKm: 6000,  intervalMonths: 12,   notes: 'IN = EX = 0,05 mm ± 0,02 mm; motor frio',                                     priority: 'HIGH',     order: 5  },
  { modelName: 'Biz 125', yearFrom: 2003, yearTo: 2013, component: 'Corrente — lubrificação',           intervalKm: 500,   intervalMonths: null,  notes: 'A cada 500–1.000 km; lubrificante específico; pós-chuva obrigatório',          priority: 'MEDIUM',   order: 6  },
  { modelName: 'Biz 125', yearFrom: 2003, yearTo: 2013, component: 'Corrente — tensão e alinhamento',  intervalKm: 1000,  intervalMonths: null,  notes: 'Folga 20–30 mm; passo 428, 106 elos',                                          priority: 'MEDIUM',   order: 7  },
  { modelName: 'Biz 125', yearFrom: 2003, yearTo: 2013, component: 'Carburador — limpeza preventiva',  intervalKm: 15000, intervalMonths: null,  notes: 'Spray limpa-carburador; drenar antes de guardar por >30 dias',                  priority: 'MEDIUM',   order: 8  },
  { modelName: 'Biz 125', yearFrom: 2003, yearTo: 2013, component: 'Lonas de freio (tambor F+R)',       intervalKm: 20000, intervalMonths: null,  notes: 'Chiado ou curso longo do manete/pedal indica troca',                           priority: 'HIGH',     order: 9  },
  { modelName: 'Biz 125', yearFrom: 2003, yearTo: 2013, component: 'Bateria',                           intervalKm: null,  intervalMonths: 36,   notes: 'Tensão em vazio 12,6 V; em carga 13,7–14,5 V',                                 priority: 'MEDIUM',   order: 10 },
  // Biz 125i
  { modelName: 'BIZ 125/125i', yearFrom: 2009, yearTo: null, component: 'Óleo do motor (1ª revisão)',        intervalKm: 1000,  intervalMonths: null, notes: '10W-30 JASO MA2; 0,7 L; partículas de rodagem',                                priority: 'CRITICAL', order: 1  },
  { modelName: 'BIZ 125/125i', yearFrom: 2009, yearTo: null, component: 'Óleo do motor',                     intervalKm: 6000,  intervalMonths: 12,   notes: '10W-30 JASO MA2; 0,7 L; JASO MB proibido',                                    priority: 'CRITICAL', order: 2  },
  { modelName: 'BIZ 125/125i', yearFrom: 2009, yearTo: null, component: 'Vela de ignição (NGK CPR6EA-9)',    intervalKm: 12000, intervalMonths: null,  notes: 'Sem sufixo "S"; gap 0,8–0,9 mm; inspecionar a 8.000 km',                      priority: 'HIGH',     order: 3  },
  { modelName: 'BIZ 125/125i', yearFrom: 2009, yearTo: null, component: 'Filtro de ar',                     intervalKm: 12000, intervalMonths: 12,   notes: 'Limpar a 4.000–6.000 km; trocar 12.000–18.000 km',                             priority: 'HIGH',     order: 4  },
  { modelName: 'BIZ 125/125i', yearFrom: 2009, yearTo: null, component: 'Folga de válvulas',                intervalKm: 6000,  intervalMonths: 12,   notes: 'IN = EX = 0,05 mm ± 0,02 mm; motor frio; parafuso + contra-porca',             priority: 'HIGH',     order: 5  },
  { modelName: 'BIZ 125/125i', yearFrom: 2009, yearTo: null, component: 'Corrente — lubrificação',          intervalKm: 1000,  intervalMonths: null,  notes: 'Lubrificante específico; após chuva também; passo 428, 106 elos',              priority: 'MEDIUM',   order: 6  },
  { modelName: 'BIZ 125/125i', yearFrom: 2009, yearTo: null, component: 'Corrente — tensão e alinhamento', intervalKm: 1000,  intervalMonths: null,  notes: 'Folga 20–30 mm; alinhar roda pelas marcas após ajuste do tensor',              priority: 'MEDIUM',   order: 7  },
  { modelName: 'BIZ 125/125i', yearFrom: 2009, yearTo: null, component: 'Filtro de tela de óleo',           intervalKm: 12000, intervalMonths: null,  notes: 'Limpeza; trocar se danificado',                                                priority: 'MEDIUM',   order: 8  },
  { modelName: 'BIZ 125/125i', yearFrom: 2009, yearTo: null, component: 'Fluido de freio DOT 4 (versão ES)', intervalKm: null, intervalMonths: 24,   notes: 'Versão com disco dianteiro 220mm; trocar a cada 2 anos',                       priority: 'HIGH',     order: 9  },
  { modelName: 'BIZ 125/125i', yearFrom: 2009, yearTo: null, component: 'Pastilhas de freio (versão ES)',   intervalKm: 20000, intervalMonths: null,  notes: 'Disco 220mm 2 pistões; trocar se < 2mm; disco trocar se < 3mm',               priority: 'HIGH',     order: 10 },
  { modelName: 'BIZ 125/125i', yearFrom: 2009, yearTo: null, component: 'Lonas de freio traseiro (tambor)', intervalKm: 20000, intervalMonths: null,  notes: 'Tambor 110mm; chiado ou curso longo do pedal indica troca',                   priority: 'HIGH',     order: 11 },
  { modelName: 'BIZ 125/125i', yearFrom: 2009, yearTo: null, component: 'Bateria',                          intervalKm: null,  intervalMonths: 36,   notes: 'Tensão em vazio 12,6 V; em carga 13,7–14,5 V; bornes com graxa dielétrica',  priority: 'MEDIUM',   order: 12 },
]

// ─── Seed principal ───────────────────────────────────────────────────────────

async function main() {
  // Limpa nomes antigos que foram renomeados (C 100 Biz e BIZ 125/125i)
  const OLD_NAMES = ['Biz 100', 'Biz 125i']
  await prisma.tip.deleteMany({ where: { modelName: { in: OLD_NAMES } } })
  await prisma.tirePressure.deleteMany({ where: { modelName: { in: OLD_NAMES } } })
  await prisma.maintenanceItem.deleteMany({ where: { modelName: { in: OLD_NAMES } } })

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
    await prisma.tirePressure.create({ data: { ...tp } })
  }
  console.log(`🔵 TirePressure: ${TIRE_PRESSURES.map(t => t.modelName).join(', ')}`)

  await prisma.maintenanceItem.deleteMany({
    where: { modelName: { in: BLOCKS.map(b => b.modelName) } },
  })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  const totalTips = BLOCKS.reduce((sum, b) => sum + b.MACETES.length + b.PROBLEMAS.length, 0)
  console.log(`\n✅ Honda Biz seed concluído! ${BLOCKS.length} modelos, ${totalTips} tips, ${TIRE_PRESSURES.length} calibragens, ${MAINTENANCE_ITEMS.length} itens de manutenção`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
