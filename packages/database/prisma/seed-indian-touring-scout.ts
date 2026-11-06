/**
 * Seed Indian Motorcycle — Touring (Chieftain/Roadmaster) + Scout
 * Modelos FIPE (marca INDIAN, código 202): CHIEFTAIN, CHIEFTAIN DARK HORSE,
 * ROADMASTER, SCOUT, SCOUT BOBBER
 *
 * ─── Nota sobre o mecanismo de casamento de nomes (leia antes de editar) ───
 * O app casa o nome FIPE exato do veículo do usuário contra os `modelName`
 * salvos aqui usando um regex de SUBSTRING com fronteira de palavra:
 *   new RegExp('\\b' + storedName + '\\b', 'i').test(fipeName)
 * Isso significa que \bCHIEFTAIN\b TAMBÉM casa dentro de "CHIEFTAIN DARK HORSE"
 * (CHIEFTAIN aparece como palavra inteira dentro da string), e \bSCOUT\b
 * TAMBÉM casa dentro de "SCOUT BOBBER". A API faz a união de todos os
 * `modelName` que casam — ou seja, um usuário que seleciona "CHIEFTAIN DARK
 * HORSE" recebe o conteúdo salvo em CHIEFTAIN *e* em CHIEFTAIN DARK HORSE
 * combinados (idem para SCOUT / SCOUT BOBBER).
 *
 * Por isso, deliberadamente:
 *  - Conteúdo universal da plataforma Thunder Stroke 111 (motor 1.811cc a ar,
 *    óleo, vela, correia final) fica em `CHIEFTAIN` (o nome base).
 *  - `CHIEFTAIN DARK HORSE` contém APENAS o que diferencia a versão Dark
 *    Horse: acabamento blackout, rodas pretas, tela Ride Command de série,
 *    fob keyless, etc. — sem repetir óleo/vela/correia, que a união já traz.
 *  - Conteúdo universal da plataforma Scout (motor 1.133cc líquido, óleo,
 *    vela, correia, arrefecimento) fica em `SCOUT`.
 *  - `SCOUT BOBBER` contém APENAS o que diferencia a Bobber: suspensão
 *    traseira mais curta, ergonomia mid-mount, acabamento blackout, ausência
 *    de para-brisa/carenagem.
 *  - `ROADMASTER` não tem nenhuma outra variante FIPE que a contenha como
 *    substring, então recebe conteúdo completo e independente (compartilha a
 *    mesma base mecânica Thunder Stroke 111 do Chieftain, mas isso é
 *    documentado em texto, não duplicado estruturalmente).
 *
 * Fontes: indianmotorcycle.com (manuais, self-help, specs), maintenanceschedule.com
 *         (Indian Chief 2014-2020 TS111 / Indian Scout), indianmotorcycles.net
 *         (fórum oficial), engineoiljournal.com, enginepatrol.com, tyreplex.com,
 *         jdpower.com specs, NHTSA TSB/recall bulletins.
 *
 * Execute: pnpm --filter @motormacete/database db:seed:indian-touring-scout
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

// ─── CHIEFTAIN (base — plataforma Thunder Stroke 111, conteúdo compartilhado com Dark Horse) ──
// Motor: Thunder Stroke 111 — 1.811cc, V-twin 49° a ar, bore/stroke 101×103mm, compressão 9,5:1
// Torque: 119 lb-ft (161 Nm) @ 3.000 rpm (2017+; anteriores 103 lb-ft @ 2.600 rpm) | Câmbio 6 marchas
// Transmissão final: correia | Válvulas hidráulicas auto-reguláveis (sem regulagem manual)

const CHIEFTAIN_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor Thunder Stroke 111: válvulas hidráulicas auto-reguláveis — nunca precisa medir folga',
    body: 'O Thunder Stroke 111 (1.811cc, V-twin 49° a ar) usa tuchos hidráulicos que se auto-ajustam — diferente de motos com regulagem manual de válvulas por shim ou contra-porca a cada revisão. Isso simplifica bastante a manutenção de longo prazo: não há item de "folga de válvulas" no cronograma. Se ouvir tiquetaque metálico persistente mesmo com motor quente, não é folga — pode ser tuchos com sujeira interna (óleo trocado fora do prazo) ou desgaste de came. Torque nominal: 119 lb-ft (161 Nm) a apenas 3.000 rpm em versões 2017+ — a moto empurra com força já em giro baixo, típico de bagger americano.',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50 semissintético: capacidade muda conforme o ano de fabricação',
    body: 'Motos fabricadas ANTES de fevereiro de 2019 usam motor com capacidade de 5,5 qt (~5,2L); a partir de fevereiro de 2019 a capacidade subiu para 6,0 qt (~5,7L) — confira o ano de fabricação real (não o ano-modelo) antes de completar. Óleo recomendado: 20W-50 semissintético JASO MA (Indian vende kit oficial com 6 qt + filtro + arruelas). Alternativas de qualidade equivalente: Motul 7100 20W-50, Mobil 1 V-Twin 20W-50. Intervalo: a cada 8.000 km (5.000 mi) ou 12 meses.',
  },
  {
    severity: 'WARN',
    title: 'Vela NGK DCPR8E: gap 0,86mm (0,034") e torque de aperto de 17 Nm — não aperte "no olho"',
    body: 'A vela original do Thunder Stroke 111 é a NGK DCPR8E, gap 0,034" (0,86mm). Upgrade popular entre donos: a versão iridium NGK DCPR8EIX, que dura mais e melhora a partida a frio. Torque de instalação: 12,7 ft-lb (~17 Nm) — motor de alumínio, aperto excessivo danifica a rosca da vela no cabeçote. Intervalo de troca: 24.000 km (15.000 mi) ou 2 anos. São 2 velas (uma por cilindro do V-twin).',
  },
  {
    severity: 'OK',
    title: 'Correia final: inspecione a cada 8.000 km, troque aos 48.000 km',
    body: 'A transmissão final por correia dentada (não corrente) exige inspeção de tensão e desgaste a cada 8.000 km (5.000 mi) e substituição preventiva aos 48.000 km (30.000 mi). Vantagem sobre corrente: não precisa de lubrificação constante nem suja a roda com graxa. Ao inspecionar: procure fios de kevlar expostos, rachaduras nas bordas ou dentes arredondados. Peça original Indian: código 3211168. A correia é mais cara que um kit de corrente (R$ 800–R$ 1.500 importada), mas dura muito mais quilometragem.',
  },
  {
    severity: 'OK',
    title: 'Aro 19" dianteiro fixo: pesquise disponibilidade de pneu antes de precisar em viagem',
    body: 'O Chieftain usa roda dianteira de 19" (fixa, sem garfo telescópico exposto — carenagem integrada ao chassi do garfo). Pneu típico: 130/60B19. É medida menos comum que aros de 17"/18" — nem toda borracharia de estrada tem em estoque. Traseiro: 180/60R16. Antes de uma viagem longa, confirme com a concessionária Indian mais próxima do trajeto se há pneu compatível, ou leve reserva de reparo (kit tubeless, já que ambos os pneus são sem câmara).',
  },
  {
    severity: 'WARN',
    title: 'Peso de ~371 kg em ordem de marcha: técnica de manobra em baixa velocidade evita queda estática',
    body: 'O Chieftain pesa cerca de 371 kg abastecido — significativamente mais que uma naked ou trail média. Em manobras de estacionamento (marcha ré empurrando, giro em U em ladeira), mantenha os pés bem apoiados e o peso do corpo centrado antes de mover a moto. A maioria das quedas em bagger pesada acontece parada ou a passo de homem, não em movimento. Pratique giro em U em local plano e vazio antes de enfrentar ladeiras ou pisos irregulares com a moto carregada.',
  },
  {
    severity: 'OK',
    title: 'Peças intercambiáveis entre Chieftain e Roadmaster: mesma base mecânica Thunder Stroke 111',
    body: 'Chieftain e Roadmaster compartilham motor, câmbio, correia final, sistema de freios e boa parte da eletrônica — ambos usam a plataforma Thunder Stroke 111. Filtro de óleo, vela NGK DCPR8E, kit de correia final e pastilhas de freio são idênticos entre os dois modelos. Isso facilita achar peças em estoque de concessionária ou desmanche — o que serve para um, serve para o outro. A diferença está na carenagem, baú (Roadmaster tem trunk fixo) e peso total.',
  },
]

const CHIEFTAIN_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'TPMS/Ride Command: leitura de pressão dos pneus intermitente é queixa recorrente',
    body: 'Donos relatam nos fóruns Indian Motorcycle Forum que o sensor de pressão dos pneus (TPMS) exibido no painel Ride Command falha em mostrar a leitura ("traços" no lugar do valor) em parte considerável das vezes — alguns relatam que a leitura só aparece corretamente cerca de metade do tempo em determinadas unidades. Isso não indica necessariamente pneu furado — é falha do módulo de leitura/comunicação do sensor, não do pneu em si. Se o painel mostrar traços persistentemente acima de 24 km/h, agende revisão do módulo TPMS na concessionária. Sempre confirme a pressão manualmente com calibrador físico antes de confiar cegamente no display.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento em juntas do cárter primário em alta quilometragem',
    body: 'Motor grande refrigerado a ar sofre dilatação térmica maior que motores líquido-refrigerados — depois de 40.000–60.000 km, é comum surgir leve vazamento de óleo nas juntas do cárter primário (onde fica a corrente/engrenagens que conectam motor à embreagem). Sintoma: mancha de óleo na parte inferior do motor, mais visível após a moto ficar parada por dias. Não é grave se o nível de óleo se mantém estável por semanas — mas se precisar completar entre trocas, vale trocar a junta (custo de peça baixo, mão de obra exige desmontagem parcial).',
  },
  {
    severity: 'WARN',
    title: 'Sistema de carga sob estresse com muitos acessórios elétricos ligados ao mesmo tempo',
    body: 'Grips aquecidos, banco aquecido, tela Ride Command, som e luzes de LED extras somados podem se aproximar do limite do estator em uso constante (trânsito parado, motor em marcha lenta, tudo ligado). Sintoma de sobrecarga: luz de bateria piscando em marcha lenta, painel resetando. Evite usar todos os acessórios elétricos simultaneamente com o motor em ralenti prolongado. Verifique a tensão da bateria AGM periodicamente (deve ficar entre 13,0–14,5V com o motor em rotação de cruzeiro).',
  },
  {
    severity: 'WARN',
    title: 'Ruído de tensionador/corrente de comando em marcha lenta a frio',
    body: 'Alguns proprietários relatam um leve chacoalho nos primeiros segundos após dar partida a frio, que desaparece ao aquecer — geralmente é o tensionador hidráulico da corrente de comando ainda sem pressão de óleo suficiente, e é considerado comportamento normal em boa parte dos casos. Porém, se o ruído persistir por mais de 10–15 segundos ou aparecer também com o motor quente, vale diagnóstico — pode indicar tensionador desgastado. Use sempre óleo dentro da especificação (20W-50 JASO MA) para manter a pressão hidráulica correta.',
  },
  {
    severity: 'OK',
    title: 'Peso elevado exige atenção redobrada em pisos irregulares e rampas de garagem',
    body: 'Com quase 371 kg em ordem de marcha, o Chieftain tem centro de gravidade alto quando carregado com alforjes cheios. Em rampas de garagem íngremes ou pisos de pedra/asfalto irregular, avalie o ângulo antes de comprometer a moto — uma vez que ela começa a tombar acima de determinado ângulo, é praticamente impossível segurar sozinho. Considere calços de nível para garagens com piso desnivelado.',
  },
]

const CHIEFTAIN_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Chieftain (plataforma Thunder Stroke 111)',
    body: '1.000 km — Revisão de amaciamento (concessionária): óleo 20W-50 + filtro, aperto geral, checklist elétrico completo. | 8.000 km — Óleo 20W-50 (5,5 qt em motos pré-fev/2019, 6,0 qt em motos fev/2019+) + filtro + inspeção de tensão/desgaste da correia final + óleo do cárter primário + fluido de freio verificado. | 16.000 km — Tudo do 8k + filtro de ar novo. | 24.000 km — Tudo do 8k + 2 velas NGK DCPR8E novas (gap 0,86mm, torque 17 Nm) + óleo da transmissão trocado + fluido de freio DOT 4 trocado. | 48.000 km — Tudo do 24k + correia final substituída (kit completo, peça 3211168) + revisão geral do sistema elétrico e módulo Ride Command.',
  },
]

// ─── CHIEFTAIN DARK HORSE (apenas diferenças da versão Dark Horse — plataforma herdada de CHIEFTAIN) ──

const CHIEFTAIN_DARK_HORSE_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Acabamento "Thunder Black Smoke": limpeza sem produtos abrasivos preserva o blackout',
    body: 'A Dark Horse troca o cromado do Chieftain padrão por acabamento fosco/preto ("Thunder Black Smoke") em motor, escapamento e rodas. Produtos de polimento para cromo comum (abrasivos) desgastam esse acabamento e revelam o metal por baixo em pouco tempo. Use apenas shampoo neutro para moto + microfibra, e ceras específicas para superfícies foscas/pretas (evite cera com sílica abrasiva). Nunca use palha de aço ou lã de polir — mesmo "suave" — no acabamento Dark Horse.',
  },
  {
    severity: 'OK',
    title: 'Rodas fundidas pretas: cuidado com produtos de limpeza de roda ácidos',
    body: 'As rodas fundidas pretas da Dark Horse reagem mal a produtos de limpeza de roda muito ácidos (comuns para tirar pó de freio de rodas cromadas ou de liga clara) — podem manchar ou embranquecer o acabamento preto de forma irreversível. Prefira limpadores de roda neutros formulados para rodas pintadas/pretas fumê. Reparo de risco ou lascado no preto exige pintura específica em oficina de customização — mais caro que o polimento simples que resolveria numa roda cromada.',
  },
  {
    severity: 'OK',
    title: 'Fob de ignição sem chave (keyless): troque a pilha do controle preventivamente',
    body: 'A Dark Horse vem de série com ignição sem chave (keyless) por proximidade do fob. A pilha do fob é uma CR2032 comum, mas quando descarrega totalmente a moto ainda liga por procedimento de emergência (encostar o fob em local específico perto do painel — confira o manual do proprietário). Troque a pilha preventivamente a cada 24 meses para não ser surpreendido sem conseguir dar partida.',
  },
  {
    severity: 'OK',
    title: 'Tela Ride Command 7" de série: proteja da luz solar direta prolongada',
    body: 'A Dark Horse normalmente já vem equipada de série com a tela touchscreen Ride Command de 7" (item opcional em versões mais básicas do Chieftain). Exposição solar direta e prolongada (moto estacionada ao sol por dias) pode acelerar o desgaste do brilho/contraste da tela ao longo dos anos. Use capa específica quando a moto ficar parada por longos períodos, e mantenha o firmware do Ride Command atualizado via concessionária ou cartão SD conforme instruções do fabricante.',
  },
  {
    severity: 'OK',
    title: 'Escapamento em acabamento preto: atenção a manchas de calor',
    body: 'O escapamento black powder-coat da Dark Horse pode desenvolver manchas amareladas/azuladas por superaquecimento (uso intenso em rodovia, subidas longas) de forma mais visível que o cromado — no cromado a mancha de calor é sutil, no preto fosco ela contrasta mais. Não é defeito, é acúmulo térmico normal, mas evite produtos de limpeza abrasivos tentando "tirar a mancha" — geralmente pioram o acabamento.',
  },
  {
    severity: 'OK',
    title: 'Mecânica idêntica ao Chieftain padrão: siga o cronograma de motor/correia do modelo base',
    body: 'Motor Thunder Stroke 111, câmbio, correia final, freios e suspensão da Dark Horse são idênticos ao Chieftain cromado — só muda o acabamento estético e, em algumas versões, equipamentos de série (tela, alarme). Óleo, vela, correia e fluido de freio seguem exatamente o mesmo intervalo e especificação do Chieftain base — não há cronograma mecânico separado para a Dark Horse.',
  },
]

const CHIEFTAIN_DARK_HORSE_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Desbotamento do acabamento fosco preto com exposição prolongada ao sol/maresia',
    body: 'Regiões litorâneas ou de sol forte o ano todo aceleram o desbotamento do "Thunder Black Smoke" — o acabamento fosco perde profundidade de cor mais rápido que pintura convencional com verniz. Guarde a moto coberta quando possível e evite lavagem com água quente direto no sol (o choque térmico acelera microfissuras no acabamento).',
  },
  {
    severity: 'WARN',
    title: 'Riscos no preto revelam o cromado/metal por baixo — mais visível que em versões cromadas',
    body: 'Qualquer risco profundo no acabamento blackout expõe uma camada de cor bem diferente (metal claro ou cromado por baixo), criando um contraste chamativo que não existe no Chieftain cromado (onde um risco é menos perceptível). Use protetores de guidão, capa de tanque e proteção de perna em viagens para minimizar risco de dano estético em quedas leves ou pedras.',
  },
  {
    severity: 'WARN',
    title: 'Mesmo problema de TPMS/Ride Command intermitente do Chieftain padrão',
    body: 'A Dark Horse compartilha o módulo eletrônico do Chieftain — inclusive a queixa de leitura intermitente de pressão dos pneus no painel Ride Command. Não é uma falha exclusiva da Dark Horse, mas como ela normalmente já vem com a tela de série, o problema é mais visível/relatado por seus donos.',
  },
  {
    severity: 'WARN',
    title: 'Reparo de rodas pretas fundidas é mais caro que polimento de roda cromada',
    body: 'Um amassado ou risco raso em roda cromada muitas vezes se resolve com polimento simples. Na Dark Horse, a mesma avaria na roda preta fundida geralmente exige repintura específica (compatível com o tom "Thunder Black") em oficina especializada — serviço mais raro e mais caro que o polimento de cromo disponível em qualquer borracharia grande.',
  },
  {
    severity: 'WARN',
    title: 'Chicote elétrico adicional do pacote Dark Horse: mais pontos de conexão para oxidar',
    body: 'Grips aquecidos, alarme e outros itens que vêm de série em algumas versões da Dark Horse adicionam conectores extras ao chicote elétrico principal. Em uso sob chuva frequente ou lavagem com jato de alta pressão direcionado à fiação, esses conectores extras têm mais chance de oxidar que num Chieftain básico com menos acessórios elétricos. Evite jato de alta pressão diretamente sobre conectores e caixas elétricas.',
  },
]

const CHIEFTAIN_DARK_HORSE_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Dark Horse: mecânica segue o Chieftain base + cuidados de acabamento',
    body: 'Óleo, vela, correia final e fluido de freio: siga exatamente o cronograma do Chieftain (8k/16k/24k/48k km) — não há diferença mecânica entre as versões. Adicional específico da Dark Horse: a cada 3 meses (ou antes de guardar por período longo), limpe o acabamento blackout com produto neutro e aplique cera para superfície fosca. A cada 12 meses, inspecione visualmente rodas pretas, escapamento e conectores elétricos extras (grips aquecidos/alarme) em busca de oxidação ou desbotamento.',
  },
]

// ─── ROADMASTER (independente — plataforma Thunder Stroke 111, flagship de touring) ──
// Motor: Thunder Stroke 111 (idêntico ao Chieftain) | Baú Tour-Chest fixo + encosto de passageiro
// Peso: ~421 kg em ordem de marcha (mais pesado que o Chieftain pelo baú/equipamentos de série)

const ROADMASTER_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesmo motor Thunder Stroke 111 do Chieftain: peças de motor são intercambiáveis',
    body: 'O Roadmaster usa exatamente o mesmo motor Thunder Stroke 111 (1.811cc, V-twin 49° a ar, 119 lb-ft @ 3.000 rpm em versões 2017+) do Chieftain. Filtro de óleo, vela NGK DCPR8E, correia final e pastilhas de freio são as mesmas peças — o que muda é a carroceria: baú (trunk) fixo, encosto de passageiro de série, para-brisa maior e mais equipamentos elétricos padrão (cruise control, grips e banco aquecidos, iluminação de LED completa já vêm de fábrica em todas as versões, diferente do Chieftain onde alguns itens são opcionais).',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50: mesma capacidade e intervalo do Chieftain, atenção ao ano de fabricação',
    body: 'Capacidade de óleo: 5,5 qt (~5,2L) em motos fabricadas antes de fevereiro de 2019, 6,0 qt (~5,7L) a partir de fevereiro de 2019. Especificação: 20W-50 semissintético JASO MA. Intervalo: 8.000 km (5.000 mi) ou 12 meses. Como o Roadmaster costuma rodar mais quilometragem em viagens longas (é o modelo "de estrada" da linha), programe a troca por tempo também, não só por km — 12 meses corridos mesmo que não bata 8.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Correia final: inspecione tensão com o baú e alforjes carregados, não vazios',
    body: 'A correia final do Roadmaster trabalha com carga extra frequente — baú Tour-Chest cheio, alforjes e garupa são o uso típico do modelo. Ao verificar a tensão da correia (a cada 8.000 km), faça a checagem com a moto na configuração de carga real que você usa no dia a dia (bagagem + passageiro se for o caso), não só com a moto vazia — a tensão ideal muda ligeiramente com o peso sobre a roda traseira. Substituição preventiva: 48.000 km (30.000 mi).',
  },
  {
    severity: 'OK',
    title: 'Baú Tour-Chest: lubrifique dobradiças e travas elétricas para evitar travamento',
    body: 'O baú traseiro fixo (Tour-Chest) do Roadmaster tem trava elétrica e dobradiças que sofrem desgaste com uso frequente em viagem. Lubrifique as dobradiças com spray de silicone (não graxa comum, que atrai poeira) a cada 6 meses. Se a trava elétrica parar de responder, verifique primeiro o fusível específico do baú antes de desmontar o mecanismo — é a causa mais comum e mais barata de resolver.',
  },
  {
    severity: 'OK',
    title: 'Encosto do passageiro e regulagens: verifique o aperto dos parafusos de fixação periodicamente',
    body: 'O encosto de passageiro regulável e o apoio lombar do Roadmaster têm parafusos de fixação que trabalham sob vibração constante em viagens longas. Aperte-os periodicamente (torque conforme manual) — parafusos frouxos nesse ponto criam folga perceptível e desconforto para o passageiro, além de risco de o encosto ceder numa frenagem brusca com garupa.',
  },
  {
    severity: 'OK',
    title: 'Pneu 19" dianteiro / 16" traseiro: calibre diferente para uso solo x uso com bagagem completa',
    body: 'O Roadmaster usa aro 19" na frente (130/60B19) e 16" atrás (180/60R16), mesma configuração do Chieftain, mas por ser mais pesado e normalmente andar mais carregado, a pressão recomendada do traseiro sobe quando com baú+alforjes+garupa cheios. Ajuste a pressão conforme a carga real antes de cada viagem — pneu subcalibrado com carga total é a causa mais comum de desgaste irregular nesse modelo.',
  },
  {
    severity: 'OK',
    title: 'Estribos de reboque (se equipado com engate): confira o torque antes de rebocar trailer',
    body: 'Algumas unidades do Roadmaster são equipadas com engate para trailer/reboque pequeno (comum em uso touring nos EUA, também presente em unidades trazidas ou configuradas no Brasil). Antes de qualquer uso com reboque, confira o torque dos parafusos de fixação do engate e o funcionamento da tomada elétrica de luzes do reboque — a folga nesse ponto sob carga em curva é perigosa.',
  },
]

const ROADMASTER_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'TPMS/Ride Command: mesma falha intermitente de leitura relatada em toda a linha Thunder Stroke',
    body: 'Assim como Chieftain e Dark Horse, o Roadmaster compartilha o módulo Ride Command e a mesma queixa recorrente de leitura intermitente do TPMS (traços no lugar do valor de pressão, especialmente acima de 24 km/h). Confirme sempre a pressão manualmente com calibrador físico antes de confiar apenas no painel.',
  },
  {
    severity: 'DANGER',
    title: 'Peso de ~421 kg é o maior da linha Indian: manobra em baixa velocidade exige prática extra',
    body: 'O Roadmaster é o modelo mais pesado da linha Indian (cerca de 421 kg em ordem de marcha, mais que o Chieftain por causa do baú fixo e equipamentos extras de série). A maioria das quedas relatadas por donos de Roadmaster acontece em manobras de estacionamento ou em rampas de garagem, não em movimento. Pratique giro em U e marcha ré em piso plano antes de rodar carregado; evite parar em ladeiras íngremes sempre que possível.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão traseira sobrecarregada com garupa + baú + alforjes cheios simultaneamente',
    body: 'Com uso máximo de bagagem (baú, dois alforjes) mais passageiro, a suspensão traseira do Roadmaster se aproxima do limite de carga do fabricante. Ajuste a pré-carga da suspensão traseira (ajuste manual ou pneumático, conforme a versão) para a carga total antes de viagens longas — suspensão subdimensionada para a carga causa fundo de curso em buracos e desgaste acelerado dos amortecedores.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento em juntas do cárter primário em alta quilometragem — mesmo ponto de atenção do Chieftain',
    body: 'Por compartilhar o motor Thunder Stroke 111, o Roadmaster tem a mesma tendência de leve vazamento nas juntas do cárter primário depois de 40.000–60.000 km. Monitore o nível de óleo entre trocas se notar manchas.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico sob maior estresse: mais acessórios de série que o Chieftain',
    body: 'O Roadmaster vem de fábrica com mais itens elétricos ativos simultaneamente (cruise control, grips e banco aquecidos, iluminação completa, tela Ride Command, som) que o Chieftain em configuração básica — isso coloca mais carga contínua sobre o estator e a bateria AGM. Verifique a tensão da bateria periodicamente e evite uso prolongado de todos os acessórios com o motor em marcha lenta parado.',
  },
]

const ROADMASTER_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Roadmaster (plataforma Thunder Stroke 111 + itens do baú/encosto)',
    body: '1.000 km — Revisão de amaciamento (concessionária): óleo 20W-50 + filtro, aperto geral, checklist elétrico + baú. | 8.000 km — Óleo 20W-50 (5,5 qt pré-fev/2019 ou 6,0 qt fev/2019+) + filtro + inspeção da correia final (com carga real) + óleo do cárter primário + fluido de freio verificado. | 16.000 km — Tudo do 8k + filtro de ar novo + lubrificação das dobradiças/trava do baú Tour-Chest. | 24.000 km — Tudo do 8k + 2 velas NGK DCPR8E novas (gap 0,86mm) + óleo da transmissão + fluido de freio DOT 4 trocado + aperto dos parafusos do encosto do passageiro. | 48.000 km — Tudo do 24k + correia final substituída (kit completo) + revisão geral do sistema elétrico/Ride Command.',
  },
]

// ─── SCOUT (base — plataforma 1.133cc líquido-refrigerada, conteúdo compartilhado com Scout Bobber) ──
// Motor: 1.133cc DOHC V-twin 60° líquido-refrigerado | ~100 hp no virabrequim | Câmbio 6 marchas
// Transmissão final: correia (22mm de largura, 141 dentes) | Embreagem a cabo (não hidráulica)

const SCOUT_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 1.133cc líquido-refrigerado: plataforma completamente diferente do Thunder Stroke 111',
    body: 'A Scout usa motor DOHC V-twin de 60°, 1.133cc, refrigerado a líquido — não confundir com o Thunder Stroke 111 a ar de 1.811cc dos modelos Chieftain/Roadmaster. É um motor moderno de giro mais alto, ~100 cv no virabrequim, câmbio de 6 marchas e transmissão final por correia (não corrente). Por ser líquido-refrigerado, tem radiador e reservatório de arrefecimento — item que o Thunder Stroke 111 não possui.',
  },
  {
    severity: 'OK',
    title: 'Óleo 20W-50 (~3,3L com filtro): intervalo de 8.000 km, igual à linha touring',
    body: 'Capacidade aproximada: 3,0–3,3L com troca de filtro (até ~5,0L em enchimento completo a seco, conforme o manual de serviço). Use 20W-50 semissintético JASO MA — a Scout compartilha especificação de óleo com o restante da linha Indian. Intervalo: 8.000 km (5.000 mi) ou 12 meses. Estimativa de capacidade baseada em relatos de proprietários e no manual — confirme com o visor de óleo lateral (moto na vertical, motor frio) antes de completar.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK MR7F: intervalo bem mais longo que o Thunder Stroke 111 — 48.000 km',
    body: 'A Scout usa vela NGK MR7F com intervalo de troca recomendado de 48.000 km (30.000 mi) — o dobro do intervalo do Chieftain/Roadmaster (24.000 km). São 2 velas, uma por cilindro do V-twin de 60°. Isso reduz o custo de manutenção de médio prazo em comparação com a linha touring.',
  },
  {
    severity: 'WARN',
    title: 'Correia final: mesma lógica do Chieftain, mas confirme intervalo com sua concessionária',
    body: 'A Scout também usa transmissão final por correia dentada. Inspecione tensão e desgaste a cada 8.000 km e planeje substituição preventiva por volta de 48.000 km — mesma referência da linha touring Thunder Stroke, já que a Indian usa filosofia de manutenção similar entre as famílias. Como a especificação exata de correia difere entre plataformas (largura de 22mm / 141 dentes na Scout), confirme o intervalo oficial atualizado com a concessionária para o ano/modelo específico da sua moto.',
  },
  {
    severity: 'WARN',
    title: 'Sistema de arrefecimento: verifique o nível do líquido a cada revisão',
    body: 'Por ser líquido-refrigerada, a Scout precisa de atenção ao nível do líquido de arrefecimento no reservatório (entre MIN e MAX, motor frio) a cada revisão. Use refrigerante compatível com alumínio (etilenoglicol pré-misturado ou concentrado diluído 50/50 com água destilada) — nunca água comum da torneira, que causa oxidação interna do radiador e das galerias do motor.',
  },
  {
    severity: 'OK',
    title: 'Peças intercambiáveis entre Scout e Scout Bobber: motor, embreagem, freios e correia são idênticos',
    body: 'Scout e Scout Bobber compartilham o mesmo motor 1.133cc, embreagem a cabo, sistema de freios e correia final. A diferença está na suspensão (a Bobber tem curso traseiro mais curto), ergonomia (pedaleiras mais centralizadas na Bobber) e acabamento. Peças de motor, filtro de óleo e vela servem para as duas.',
  },
  {
    severity: 'OK',
    title: 'Embreagem a cabo (não hidráulica): lubrifique o cabo preventivamente',
    body: 'Diferente de muitas motos premium que usam embreagem hidráulica, a Scout usa embreagem acionada por cabo mecânico. Lubrifique o cabo periodicamente (óleo fino ou lubrificante específico de cabo, aplicado com o cabo desconectado ou com aplicador de pressão) para manter o acionamento suave e prevenir desgaste prematuro — ver também o alerta sobre ruptura de cabo de embreagem na seção de problemas.',
  },
]

const SCOUT_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Recall de rachadura no cabeçote — modelos 2020: verifique o número de chassi',
    body: 'A Indian emitiu recall para determinadas unidades da Scout 2020 por risco de rachadura no cabeçote (cylinder head). O defeito pode causar perda de compressão ou vazamento de óleo/líquido de arrefecimento. Verifique se sua moto está na lista de VINs afetados no site da Indian Motorcycle ou em qualquer concessionária autorizada — reparo gratuito mesmo fora da garantia, se o VIN estiver listado.',
  },
  {
    severity: 'DANGER',
    title: 'Recall do sistema de freio ABS — modelos 2017-2019: ar no circuito de freio',
    body: 'A Indian emitiu recall para Scout e Scout Bobber equipadas com ABS dos anos 2017-2019 por presença de ar no circuito de freio, causando manete/pedal "mole" e redução perceptível de eficiência de frenagem. Se sua moto é desse período e a frenagem parece mais fraca ou o manete afunda mais que o normal, procure a concessionária para verificar se o recall já foi realizado no chassi específico.',
  },
  {
    severity: 'WARN',
    title: 'Cabo de embreagem partindo: queixa recorrente que ficou de fora do recall oficial',
    body: 'Proprietários relataram ruptura do cabo de embreagem em uso normal. Quando a Indian emitiu recall para esse problema, a correção oficial cobriu apenas os modelos equipados com motor Thunder Stroke (Chieftain/Roadmaster/Chief), deixando os donos de Scout sem cobertura de recall para a mesma reclamação. Recomendação prática: inspecione visualmente o cabo de embreagem (desgaste, fiapos no revestimento) a cada revisão e troque preventivamente se notar sinais de desgaste, já que não há substituição gratuita garantida para a Scout.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo por juntas, retentores ou bomba de óleo',
    body: 'Como em qualquer motor V-twin, vazamentos de óleo pela junta do cárter, retentores de eixo ou, em casos mais raros, falha da bomba de óleo são relatados por proprietários de Scout ao longo do tempo de uso. Inspecione visualmente embaixo do motor a cada troca de óleo — mancha nova e crescente merece investigação antes de virar problema maior.',
  },
  {
    severity: 'WARN',
    title: 'Consumo de combustível mais alto em rodovia com giro constante elevado',
    body: 'Por ter cilindrada menor (1.133cc) que os modelos touring, a Scout precisa girar mais para manter velocidade de rodovia (100–120 km/h), o que eleva o consumo em viagens longas comparado ao uso urbano. Não é defeito — é característica do motor de giro mais alto comparado ao Thunder Stroke 111 de giro baixo. Planeje paradas de abastecimento mais frequentes em viagens de rodovia.',
  },
]

const SCOUT_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Scout (motor 1.133cc líquido-refrigerado)',
    body: '1.000 km — Revisão de amaciamento (concessionária): óleo 20W-50 + filtro, aperto geral, checklist elétrico. | 8.000 km — Óleo 20W-50 (~3,3L) + filtro + inspeção de tensão/desgaste da correia final + cabo de embreagem lubrificado + nível do líquido de arrefecimento verificado. | 16.000 km — Tudo do 8k + filtro de ar novo. | 24.000 km — Tudo do 8k + fluido de freio DOT 4 trocado + inspeção geral do sistema de arrefecimento (mangueiras, radiador). | 40.000 km — Troca do líquido de arrefecimento. | 48.000 km — Tudo do 24k + 2 velas NGK MR7F novas + correia final substituída (kit completo).',
  },
]

// ─── SCOUT BOBBER (apenas diferenças da versão Bobber — plataforma herdada de SCOUT) ──

const SCOUT_BOBBER_MACETES: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Suspensão traseira mais curta: curso reduzido exige atenção redobrada a buracos',
    body: 'A Scout Bobber tem amortecedores traseiros de curso mais curto que a Scout padrão, resultando em visual mais baixo/agressivo mas absorção de impacto reduzida. Em pisos irregulares, buracos e lombadas mal sinalizadas, o curso curto "bate no fim" com mais facilidade que a Scout convencional. Ajuste a pré-carga conforme seu peso e reduza a velocidade em trechos ruins — a Bobber pune mais o piloto/passageiro em piso irregular que a Scout de suspensão mais longa.',
  },
  {
    severity: 'OK',
    title: 'Ergonomia mid-mount: pedaleiras mais centralizadas que a Scout padrão (que usa forward controls)',
    body: 'A Bobber tem pedaleiras posicionadas mais próximas ao centro da moto (estilo mid-mount), diferente das pedaleiras avançadas (forward controls) da Scout padrão. Isso muda a postura de pilotagem para uma posição mais esportiva/compacta, com joelhos mais dobrados — mais confortável em curva e uso urbano, mas menos relaxante em trechos longos de rodovia comparado à posição esticada da Scout base.',
  },
  {
    severity: 'OK',
    title: 'Acabamento blackout: mesmos cuidados de limpeza da linha Dark Horse',
    body: 'A Bobber vem com motor, escapamento e boa parte dos componentes em acabamento preto fosco/escurecido. Use produtos de limpeza neutros e ceras específicas para superfícies foscas — evite polidores abrasivos formulados para cromo, que desgastam o blackout e revelam o metal por baixo (mesma lógica aplicada à Chieftain Dark Horse).',
  },
  {
    severity: 'OK',
    title: 'Guidão baixo tipo "drag bar": ajuste a altura das manetes para conforto de pulso',
    body: 'O guidão baixo e reto (drag bar) da Bobber muda o ângulo de pulso em relação ao guidão mais alto e recuado da Scout padrão. Se sentir desconforto no punho em uso prolongado, ajuste o ângulo das manetes de freio/embreagem e considere manoplas com maior amortecimento de vibração — pequenos ajustes de ergonomia fazem grande diferença no guidão baixo.',
  },
  {
    severity: 'WARN',
    title: 'Ausência de para-brisa: avalie acessório pós-venda para uso frequente em rodovia',
    body: 'A Bobber não vem com para-brisa nem carenagem — parte do visual minimalista da proposta bobber. Em uso urbano isso não é problema, mas em rodovia a velocidades mais altas o piloto recebe todo o vento direto, o que cansa mais em trechos longos. Há para-brisas destacáveis no mercado de acessórios compatíveis com a Bobber para quem faz viagens ocasionais sem abrir mão do visual limpo no dia a dia.',
  },
  {
    severity: 'OK',
    title: 'Mecânica idêntica à Scout: motor, embreagem, freios e correia seguem o mesmo cronograma',
    body: 'Óleo (20W-50, ~3,3L), vela NGK MR7F, correia final e fluido de freio da Bobber seguem exatamente a mesma especificação e intervalo da Scout padrão — a diferença entre as duas está na suspensão, ergonomia e acabamento, não no motor. Consulte o cronograma da Scout para os itens de motor.',
  },
]

const SCOUT_BOBBER_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Suspensão traseira curta resulta em ride mais duro em pisos ruins',
    body: 'O curso reduzido dos amortecedores traseiros da Bobber (parte do visual baixo característico do estilo bobber) absorve menos impacto que a suspensão da Scout padrão. Em ruas esburacadas ou estradas de terra, o desconforto é perceptivelmente maior — considerado característica do modelo, não defeito, mas vale saber antes de comprar se o uso pretendido inclui muito piso ruim.',
  },
  {
    severity: 'WARN',
    title: 'Altura livre do solo reduzida: risco de raspar em lombadas e valetas',
    body: 'Combinada à suspensão mais curta, a Bobber tem menor distância ao solo que a Scout padrão. Lombadas altas, valetas de entrada de garagem e rampas de estacionamento merecem atenção redobrada — o cavalete central (se equipado) e o escapamento baixo são os primeiros pontos a raspar.',
  },
  {
    severity: 'WARN',
    title: 'Recalls da plataforma Scout também se aplicam à Bobber (cabeçote 2020, ABS 2017-2019)',
    body: 'A Scout Bobber compartilha o motor e sistema de freios da Scout padrão, portanto está sujeita aos mesmos recalls: rachadura de cabeçote em unidades 2020 específicas, e ar no circuito de freio ABS em unidades 2017-2019. Verifique o número de chassi da sua Bobber nos mesmos canais oficiais da Scout.',
  },
  {
    severity: 'WARN',
    title: 'Menor proteção aerodinâmica cansa mais o piloto em viagens de rodovia',
    body: 'Sem carenagem ou para-brisa de fábrica, a Bobber expõe o piloto a mais vento em velocidades de rodovia que a Scout padrão (que também não tem carenagem, mas tem postura mais reclinada que reduz um pouco a resistência percebida). Para uso predominantemente urbano isso não é problema — mas quem pretende rodar rodovia com frequência deve considerar acessórios de proteção.',
  },
  {
    severity: 'WARN',
    title: 'Acabamento preto sujeito a desgaste visual mais evidente que uma versão cromada',
    body: 'Assim como na Dark Horse, riscos e desgaste no acabamento blackout da Bobber aparecem de forma mais visível (contraste com o metal por baixo) que em uma versão cromada equivalente. Proteção de guidão e perna ajuda a preservar a aparência em quedas leves de baixa velocidade.',
  },
]

const SCOUT_BOBBER_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma Bobber: mecânica segue a Scout + inspeção extra de suspensão e acabamento',
    body: 'Óleo, vela, correia final e fluido de freio: siga exatamente o cronograma da Scout padrão (8k/16k/24k/40k/48k km) — motor e transmissão são idênticos. Adicional específico da Bobber: a cada 12.000 km, inspecione vazamento e desgaste dos amortecedores traseiros de curso curto (mais solicitados que na Scout padrão). A cada 3 meses ou antes de guardar por período longo, limpe o acabamento blackout com produto neutro específico para superfícies foscas.',
  },
]

// ─── BLOCOS ───────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'CHIEFTAIN',
    yearFrom: 2014,
    yearTo: null,
    MACETES: CHIEFTAIN_MACETES,
    PROBLEMAS: CHIEFTAIN_PROBLEMAS,
    MANUTENCAO: CHIEFTAIN_MANUTENCAO,
  },
  {
    modelName: 'CHIEFTAIN DARK HORSE',
    yearFrom: 2016,
    yearTo: null,
    MACETES: CHIEFTAIN_DARK_HORSE_MACETES,
    PROBLEMAS: CHIEFTAIN_DARK_HORSE_PROBLEMAS,
    MANUTENCAO: CHIEFTAIN_DARK_HORSE_MANUTENCAO,
  },
  {
    modelName: 'ROADMASTER',
    yearFrom: 2015,
    yearTo: null,
    MACETES: ROADMASTER_MACETES,
    PROBLEMAS: ROADMASTER_PROBLEMAS,
    MANUTENCAO: ROADMASTER_MANUTENCAO,
  },
  {
    modelName: 'SCOUT',
    yearFrom: 2015,
    yearTo: null,
    MACETES: SCOUT_MACETES,
    PROBLEMAS: SCOUT_PROBLEMAS,
    MANUTENCAO: SCOUT_MANUTENCAO,
  },
  {
    modelName: 'SCOUT BOBBER',
    yearFrom: 2018,
    yearTo: null,
    MACETES: SCOUT_BOBBER_MACETES,
    PROBLEMAS: SCOUT_BOBBER_PROBLEMAS,
    MANUTENCAO: SCOUT_BOBBER_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ─────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'CHIEFTAIN',
    yearFrom: 2014, yearTo: null,
    tireSize: '130/60B19 (F) · 180/60R16 (R)',
    frontPsi: 36, rearPsi: 39,
    frontPsiLoad: 38, rearPsiLoad: 41,
    notes: 'Solo: F 36 / R 39 PSI. Com garupa/alforjes: F 38 / R 41 PSI. Roda dianteira fixa de 19" — pneu menos comum, verifique disponibilidade antes de viagens longas. Ambos os pneus são tubeless.',
  },
  {
    modelName: 'CHIEFTAIN DARK HORSE',
    yearFrom: 2016, yearTo: null,
    tireSize: '130/60B19 (F) · 180/60R16 (R)',
    frontPsi: 36, rearPsi: 39,
    frontPsiLoad: 38, rearPsiLoad: 41,
    notes: 'Mesma medida e pressão do Chieftain padrão — a Dark Horse não muda pneus/rodas em relação à plataforma base, apenas o acabamento (rodas fundidas pretas).',
  },
  {
    modelName: 'ROADMASTER',
    yearFrom: 2015, yearTo: null,
    tireSize: '130/60B19 (F) · 180/60R16 (R)',
    frontPsi: 36, rearPsi: 41,
    frontPsiLoad: 38, rearPsiLoad: 44,
    notes: 'Solo: F 36 / R 41 PSI. Com baú + alforjes + garupa: F 38 / R 44 PSI. Pressão traseira de fábrica já é mais alta que o Chieftain por ser o modelo mais pesado da linha (~421 kg). Ambos tubeless.',
  },
  {
    modelName: 'SCOUT',
    yearFrom: 2015, yearTo: null,
    tireSize: '130/90-16 (F) · 150/80-16 (R)',
    frontPsi: 30, rearPsi: 36,
    frontPsiLoad: 30, rearPsiLoad: 40,
    notes: 'Solo: F 30 / R 36 PSI. Com garupa: F 30 / R 40 PSI. Valores estimados a partir de referências de mercado para o segmento cruiser médio da Scout — confirme com o adesivo de calibragem no chassi (localizado perto do cavalete lateral) para o ano/modelo exato.',
  },
  {
    modelName: 'SCOUT BOBBER',
    yearFrom: 2018, yearTo: null,
    tireSize: '130/90H-16 (F) · 150/80H-16 (R)',
    frontPsi: 30, rearPsi: 36,
    frontPsiLoad: 30, rearPsiLoad: 40,
    notes: 'Mesma medida de pneu da Scout padrão (confirmado em especificação oficial de anos recentes), pressão igual. A suspensão de curso mais curto da Bobber não altera a pressão recomendada, mas reduz a margem de absorção de impacto em piso ruim.',
  },
]

// ─── ITENS DE MANUTENÇÃO ──────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // CHIEFTAIN
  { modelName: 'CHIEFTAIN', yearFrom: 2014, yearTo: null, component: 'Óleo 20W-50 (5,5 qt pré-fev/2019 · 6,0 qt fev/2019+)', intervalKm: 8000, intervalMonths: 12, notes: 'Semissintético JASO MA. Confirme o mês real de fabricação, não o ano-modelo.', priority: 'HIGH', order: 1 },
  { modelName: 'CHIEFTAIN', yearFrom: 2014, yearTo: null, component: 'Filtro de óleo', intervalKm: 8000, intervalMonths: 12, notes: 'Troca junto com o óleo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'CHIEFTAIN', yearFrom: 2014, yearTo: null, component: 'Vela NGK DCPR8E ×2 (gap 0,86mm, torque 17 Nm)', intervalKm: 24000, intervalMonths: 24, notes: 'Upgrade iridium: NGK DCPR8EIX.', priority: 'MEDIUM', order: 3 },
  { modelName: 'CHIEFTAIN', yearFrom: 2014, yearTo: null, component: 'Correia final — inspeção de tensão/desgaste', intervalKm: 8000, intervalMonths: null, notes: 'Procure fios de kevlar expostos ou dentes arredondados.', priority: 'HIGH', order: 4 },
  { modelName: 'CHIEFTAIN', yearFrom: 2014, yearTo: null, component: 'Correia final — substituição preventiva', intervalKm: 48000, intervalMonths: null, notes: 'Peça original Indian 3211168.', priority: 'HIGH', order: 5 },
  { modelName: 'CHIEFTAIN', yearFrom: 2014, yearTo: null, component: 'Filtro de ar', intervalKm: 16000, intervalMonths: 24, notes: 'Inspecionar a cada 8.000 km, trocar a cada 16.000 km.', priority: 'MEDIUM', order: 6 },
  { modelName: 'CHIEFTAIN', yearFrom: 2014, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 24000, intervalMonths: 24, notes: 'Sistema de freio compartilhado com o Roadmaster.', priority: 'HIGH', order: 7 },
  { modelName: 'CHIEFTAIN', yearFrom: 2014, yearTo: null, component: 'Óleo do cárter primário', intervalKm: 8000, intervalMonths: 12, notes: 'Sistema separado do óleo do motor.', priority: 'MEDIUM', order: 8 },
  { modelName: 'CHIEFTAIN', yearFrom: 2014, yearTo: null, component: 'Óleo da transmissão', intervalKm: 24000, intervalMonths: 24, notes: 'Sistema separado do cárter primário e do motor.', priority: 'MEDIUM', order: 9 },
  { modelName: 'CHIEFTAIN', yearFrom: 2014, yearTo: null, component: 'Bateria AGM — verificação de tensão', intervalKm: null, intervalMonths: 6, notes: 'Ideal 13,0–14,5V em rotação de cruzeiro. Use carregador de manutenção específico para AGM.', priority: 'HIGH', order: 10 },
  { modelName: 'CHIEFTAIN', yearFrom: 2014, yearTo: null, component: 'Válvulas — sem regulagem manual (tuchos hidráulicos)', intervalKm: null, intervalMonths: null, notes: 'Item informativo: o Thunder Stroke 111 não tem folga de válvulas a regular.', priority: 'LOW', order: 11 },

  // CHIEFTAIN DARK HORSE (apenas itens específicos da versão — mecânica está sob CHIEFTAIN)
  { modelName: 'CHIEFTAIN DARK HORSE', yearFrom: 2016, yearTo: null, component: 'Acabamento blackout — limpeza e cera não abrasiva', intervalKm: null, intervalMonths: 3, notes: 'Evite polidores de cromo abrasivos; usam produto neutro para superfície fosca.', priority: 'LOW', order: 1 },
  { modelName: 'CHIEFTAIN DARK HORSE', yearFrom: 2016, yearTo: null, component: 'Fob de ignição keyless — pilha CR2032', intervalKm: null, intervalMonths: 24, notes: 'Troca preventiva evita ficar sem partida sem aviso.', priority: 'LOW', order: 2 },
  { modelName: 'CHIEFTAIN DARK HORSE', yearFrom: 2016, yearTo: null, component: 'Rodas fundidas pretas — inspeção de riscos/oxidação', intervalKm: null, intervalMonths: 12, notes: 'Reparo exige repintura específica, não polimento simples.', priority: 'LOW', order: 3 },
  { modelName: 'CHIEFTAIN DARK HORSE', yearFrom: 2016, yearTo: null, component: 'Tela Ride Command 7" — atualização de firmware/mapas', intervalKm: null, intervalMonths: 12, notes: 'De série na maioria das configurações Dark Horse.', priority: 'MEDIUM', order: 4 },
  { modelName: 'CHIEFTAIN DARK HORSE', yearFrom: 2016, yearTo: null, component: 'Escapamento black powder-coat — inspeção de descoloração', intervalKm: null, intervalMonths: 12, notes: 'Manchas de calor mais visíveis que em versão cromada; não usar abrasivo para tentar remover.', priority: 'LOW', order: 5 },
  { modelName: 'CHIEFTAIN DARK HORSE', yearFrom: 2016, yearTo: null, component: 'Conectores de grips/banco aquecidos e alarme', intervalKm: null, intervalMonths: 12, notes: 'Chicote adicional em relação ao Chieftain básico — evitar jato de alta pressão direto.', priority: 'MEDIUM', order: 6 },
  { modelName: 'CHIEFTAIN DARK HORSE', yearFrom: 2016, yearTo: null, component: 'Bateria do controle remoto do alarme', intervalKm: null, intervalMonths: 12, notes: 'Se equipado com alarme de série.', priority: 'LOW', order: 7 },

  // ROADMASTER
  { modelName: 'ROADMASTER', yearFrom: 2015, yearTo: null, component: 'Óleo 20W-50 (5,5 qt pré-fev/2019 · 6,0 qt fev/2019+)', intervalKm: 8000, intervalMonths: 12, notes: 'Mesma especificação do Chieftain — motor Thunder Stroke 111 idêntico.', priority: 'HIGH', order: 1 },
  { modelName: 'ROADMASTER', yearFrom: 2015, yearTo: null, component: 'Filtro de óleo', intervalKm: 8000, intervalMonths: 12, notes: 'Troca junto com o óleo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'ROADMASTER', yearFrom: 2015, yearTo: null, component: 'Vela NGK DCPR8E ×2 (gap 0,86mm, torque 17 Nm)', intervalKm: 24000, intervalMonths: 24, notes: 'Mesma peça do Chieftain.', priority: 'MEDIUM', order: 3 },
  { modelName: 'ROADMASTER', yearFrom: 2015, yearTo: null, component: 'Correia final — inspeção de tensão/desgaste', intervalKm: 8000, intervalMonths: null, notes: 'Verifique com carga real (baú + alforjes + garupa), não só com a moto vazia.', priority: 'HIGH', order: 4 },
  { modelName: 'ROADMASTER', yearFrom: 2015, yearTo: null, component: 'Correia final — substituição preventiva', intervalKm: 48000, intervalMonths: null, notes: 'Peça original Indian 3211168.', priority: 'HIGH', order: 5 },
  { modelName: 'ROADMASTER', yearFrom: 2015, yearTo: null, component: 'Filtro de ar', intervalKm: 16000, intervalMonths: 24, notes: 'Inspecionar a cada 8.000 km, trocar a cada 16.000 km.', priority: 'MEDIUM', order: 6 },
  { modelName: 'ROADMASTER', yearFrom: 2015, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 24000, intervalMonths: 24, notes: 'Sistema de freio compartilhado com o Chieftain.', priority: 'HIGH', order: 7 },
  { modelName: 'ROADMASTER', yearFrom: 2015, yearTo: null, component: 'Óleo do cárter primário', intervalKm: 8000, intervalMonths: 12, notes: 'Sistema separado do óleo do motor.', priority: 'MEDIUM', order: 8 },
  { modelName: 'ROADMASTER', yearFrom: 2015, yearTo: null, component: 'Óleo da transmissão', intervalKm: 24000, intervalMonths: 24, notes: 'Sistema separado do cárter primário e do motor.', priority: 'MEDIUM', order: 9 },
  { modelName: 'ROADMASTER', yearFrom: 2015, yearTo: null, component: 'Bateria AGM — verificação de tensão', intervalKm: null, intervalMonths: 6, notes: 'Mais acessórios elétricos de série que o Chieftain — verificação mais frequente recomendada.', priority: 'HIGH', order: 10 },
  { modelName: 'ROADMASTER', yearFrom: 2015, yearTo: null, component: 'Baú Tour-Chest — lubrificação de dobradiças e trava elétrica', intervalKm: null, intervalMonths: 6, notes: 'Spray de silicone, não graxa comum (atrai poeira).', priority: 'LOW', order: 11 },

  // SCOUT
  { modelName: 'SCOUT', yearFrom: 2015, yearTo: null, component: 'Óleo 20W-50 (~3,3L com filtro)', intervalKm: 8000, intervalMonths: 12, notes: 'Semissintético JASO MA. Capacidade aproximada — confirme no visor lateral de óleo.', priority: 'HIGH', order: 1 },
  { modelName: 'SCOUT', yearFrom: 2015, yearTo: null, component: 'Filtro de óleo', intervalKm: 8000, intervalMonths: 12, notes: 'Troca junto com o óleo.', priority: 'MEDIUM', order: 2 },
  { modelName: 'SCOUT', yearFrom: 2015, yearTo: null, component: 'Vela NGK MR7F ×2', intervalKm: 48000, intervalMonths: 24, notes: 'Intervalo bem mais longo que o Thunder Stroke 111.', priority: 'MEDIUM', order: 3 },
  { modelName: 'SCOUT', yearFrom: 2015, yearTo: null, component: 'Correia final — inspeção de tensão/desgaste', intervalKm: 8000, intervalMonths: null, notes: 'Correia de 22mm de largura, 141 dentes.', priority: 'HIGH', order: 4 },
  { modelName: 'SCOUT', yearFrom: 2015, yearTo: null, component: 'Correia final — substituição preventiva', intervalKm: 48000, intervalMonths: null, notes: 'Confirme intervalo oficial atualizado com a concessionária para o ano/modelo específico.', priority: 'HIGH', order: 5 },
  { modelName: 'SCOUT', yearFrom: 2015, yearTo: null, component: 'Líquido de arrefecimento — troca', intervalKm: 40000, intervalMonths: 24, notes: 'Etilenoglicol compatível com alumínio, nunca água comum.', priority: 'HIGH', order: 6 },
  { modelName: 'SCOUT', yearFrom: 2015, yearTo: null, component: 'Filtro de ar', intervalKm: 16000, intervalMonths: 24, notes: 'Inspecionar a cada 8.000 km, trocar a cada 16.000 km.', priority: 'MEDIUM', order: 7 },
  { modelName: 'SCOUT', yearFrom: 2015, yearTo: null, component: 'Fluido de freio DOT 4', intervalKm: 24000, intervalMonths: 24, notes: 'Verifique se o recall de ar no circuito ABS (2017-2019) já foi aplicado, se aplicável.', priority: 'HIGH', order: 8 },
  { modelName: 'SCOUT', yearFrom: 2015, yearTo: null, component: 'Cabo de embreagem — lubrificação/inspeção', intervalKm: 12000, intervalMonths: 12, notes: 'Embreagem a cabo, não hidráulica. Ruptura é queixa recorrente não coberta por recall na Scout.', priority: 'MEDIUM', order: 9 },
  { modelName: 'SCOUT', yearFrom: 2015, yearTo: null, component: 'Bateria — verificação de tensão', intervalKm: null, intervalMonths: 6, notes: 'Tensão de repouso mínima recomendada ~12,4V.', priority: 'HIGH', order: 10 },
  { modelName: 'SCOUT', yearFrom: 2015, yearTo: null, component: 'Cabeçote — verificação de recall (unidades 2020)', intervalKm: null, intervalMonths: 12, notes: 'Confirme número de chassi no site da Indian ou em concessionária autorizada.', priority: 'CRITICAL', order: 11 },

  // SCOUT BOBBER (apenas itens específicos da versão — mecânica está sob SCOUT)
  { modelName: 'SCOUT BOBBER', yearFrom: 2018, yearTo: null, component: 'Amortecedores traseiros de curso curto — inspeção de vazamento/desgaste', intervalKm: 12000, intervalMonths: 12, notes: 'Mais solicitados que na Scout padrão pelo curso reduzido.', priority: 'MEDIUM', order: 1 },
  { modelName: 'SCOUT BOBBER', yearFrom: 2018, yearTo: null, component: 'Acabamento blackout — limpeza não abrasiva', intervalKm: null, intervalMonths: 3, notes: 'Mesma cautela da linha Dark Horse.', priority: 'LOW', order: 2 },
  { modelName: 'SCOUT BOBBER', yearFrom: 2018, yearTo: null, component: 'Guidão drag bar — verificação de aperto de fixação', intervalKm: null, intervalMonths: 12, notes: 'Guidão baixo/reto sob mais vibração direta que o guidão da Scout padrão.', priority: 'MEDIUM', order: 3 },
  { modelName: 'SCOUT BOBBER', yearFrom: 2018, yearTo: null, component: 'Para-lama dianteiro minimalista — verificação de fixação', intervalKm: null, intervalMonths: 12, notes: 'Mais exposto a vibração por ser menor/mais leve que o para-lama da Scout padrão.', priority: 'LOW', order: 4 },
  { modelName: 'SCOUT BOBBER', yearFrom: 2018, yearTo: null, component: 'Banco solo — fixação e amortecedores do assento', intervalKm: null, intervalMonths: 12, notes: 'Verifique folga na fixação do banco solo.', priority: 'LOW', order: 5 },
  { modelName: 'SCOUT BOBBER', yearFrom: 2018, yearTo: null, component: 'Farol único — alinhamento/mira', intervalKm: null, intervalMonths: 12, notes: 'Verificar após qualquer ajuste de suspensão dianteira.', priority: 'LOW', order: 6 },
  { modelName: 'SCOUT BOBBER', yearFrom: 2018, yearTo: null, component: 'Pedaleiras mid-mount — desgaste da borracha', intervalKm: null, intervalMonths: 12, notes: 'Posição mais centralizada que a Scout padrão (forward controls).', priority: 'LOW', order: 7 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Seed Indian Motorcycle (Touring + Scout)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'INDIAN', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'INDIAN', vehicleTypeId: motoType.id },
  })
  console.log(`  ✅ Brand: ${brand.name}`)

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {},
      create: { name: block.modelName, brandId: brand.id },
    })

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
        yearFrom: block.yearFrom,
        yearTo: block.yearTo,
        order: idx,
      })),
    })
    console.log(`  ✅ ${block.modelName}: ${allTips.length} tips (${block.MACETES.length} macetes, ${block.PROBLEMAS.length} problemas, ${block.MANUTENCAO.length} manutenção)`)
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

  console.log('✅ Indian Motorcycle (Touring + Scout) concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
