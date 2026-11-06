// seed-yamaha-virago-star.ts — Yamaha Virago/Star/Drag Star/V-Max (cruisers/touring pesados)
// 750 VIRAGO (XV750, 1981-1997, gray-market/import no Brasil) · XV 1100 VIRAGO (1986-1998ish,
// gray-market/import) · XV 535 S VIRAGO (1994-2002, vendida oficialmente pela Yamaha do Brasil —
// a mais "nacional" das três Virago) · XVS 650 DRAG STAR (1997-2008, oficial Yamaha do Brasil) ·
// XVS 1100 DRAG STAR (2000-2008, oficial) · XVS 950 MIDNIGHT STAR (2009-2016, oficial — substituiu
// as Drag Star) · ROYAL STAR 1300 (XVZ1300, 1996-2000, import/usado no Brasil) · V-MAX 1200
// (VMX1200, 1985-2007, import — versão sem V-Boost também vendida oficialmente) · V-MAX 1700
// (2009+, import oficial Yamaha, ~R$99.000 em 2014).
//
// TRANSMISSÃO FINAL — ATENÇÃO CRÍTICA: TODOS os modelos desta família usam EIXO CARDÃ (shaft
// drive) — 750 Virago, XV1100 Virago, XV535S Virago, XVS650 Drag Star, XVS1100 Drag Star,
// Royal Star 1300, V-Max 1200 e V-Max 1700 — EXCETO a XVS 950 MIDNIGHT STAR, que usa CORREIA
// (belt drive). Não generalize "toda a linha é cardã" — a Midnight Star quebra o padrão.
// NENHUM modelo desta família usa corrente. Confirmado via especificações de fábrica e fóruns
// (vmaxforum.net, starbikeforums.com, motorcyclespecs.co.za, webike.net) nesta sessão.
//
// ATENÇÃO CRÍTICA — matching de modelName com a FIPE (ver apps/web/app/api/tips/route.ts::
// matchesStoredName): teste de SUBSTRING com \b (word-boundary), e a rota combina tips de TODAS
// as modelName salvas que derem match. NUNCA use "VIRAGO" sozinho como modelName — já existe
// "XV 250 VIRAGO" (250cc, seed-yamaha-street-pequenas.ts) que bateria por substring e misturaria
// conteúdo de motos com mecânica totalmente diferente. Os modelName abaixo usam as strings EXATAS
// da FIPE (confirmadas via fetch de parallelum.com.br/fipe/api/v1/motos/marcas/101/modelos nesta
// sessão) e foram testados programaticamente contra as ~129 strings Yamaha da FIPE: cobertura 100%
// dos 9 alvos, zero colisão cruzada com qualquer outro modelName (novo ou já existente nos outros
// arquivos seed-yamaha-*.ts). "XV 535 S VIRAGO" mantém o "S" no meio propositalmente — é a grafia
// exata da FIPE.
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

// ─── 750 VIRAGO (XV750, 1981-1997 — gray-market/import no Brasil) ────────────
// Motor 748cc V-twin 75°, ar, SOHC 2V, carburado (Mikuni). ~55 cv a 7.000 rpm.
// EIXO CARDÃ. Nunca vendida oficialmente pela Yamaha do Brasil — chegou via importação
// paralela nos anos 80-90. Hoje é moto de colecionador, 40+ anos de idade.

const V750_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 748cc V-twin 75° a ar, SOHC 2 válvulas — óleo 20W-40 API SE, 3,6 L com troca de filtro; ajuste de válvulas por parafuso/contraporca (sem shim)',
    body: 'A 750 Virago usa motor V-twin 748cc refrigerado a ar com um único eixo de comando (SOHC) e 2 válvulas por cilindro. Óleo recomendado: SAE 20W-40 API SE, 3,6 L na troca com filtro. Diferente da XV535 (que usa shim-under-bucket), a 750 e a 1100 Virago usam ajuste de válvulas por parafuso e contraporca — mais simples de fazer sem ferramenta especial. Folga: admissão 0,10 mm / escape 0,15 mm, motor frio.',
  },
  {
    severity: 'OK',
    title: 'Transmissão final por EIXO CARDÃ — sem corrente, mas óleo do diferencial traseiro precisa de troca periódica (óleo hipoide, não é "sem manutenção")',
    body: 'A 750 Virago tem transmissão final por eixo cardã (shaft drive) — não há corrente ou correia para lubrificar ou trocar. Mas isso NÃO significa zero manutenção: o óleo do diferencial/caixa final (SAE 80W GL-4, ~190-200 ml) precisa ser verificado e trocado periodicamente. Muitos donos de moto com cardã ignoram esse item por estarem acostumados com corrente — a falta de troca é causa de desgaste prematuro do conjunto de engrenagens hipoides do cardã, reparo caro e raro de achar peça para moto de 40+ anos.',
  },
  {
    severity: 'WARN',
    title: 'Carburador Mikuni entupindo com etanol/gasolina brasileira parada — moto de 40+ anos com borrachas e diafragmas originais já endurecidos',
    body: 'O carburador Mikuni da 750 Virago sofre com combustível brasileiro (etanol/gasolina) parado por semanas — forma verniz nos jatos e endurece diafragmas e o-rings originais, que já têm décadas de idade na maioria das unidades hoje em circulação. Sintoma: partida difícil, marcha lenta instável, "engasgo" na aceleração. Recomenda-se kit de reparo completo (jatos, agulha, o-rings, diafragma) preventivo em qualquer unidade que tenha ficado parada por muito tempo antes da compra — não assuma que "funciona" significa "está limpo por dentro".',
  },
  {
    severity: 'WARN',
    title: 'Moto de colecionador — sistema de carga (estator/retificador) é o item elétrico mais citado como falho em unidades de 40+ anos',
    body: 'Como a 750 Virago não teve venda oficial no Brasil (chegou só por importação paralela nos anos 80-90), toda unidade hoje em circulação já passou dos 30-40 anos de idade. O estator e o retificador/regulador de tensão são os itens elétricos mais comumente relatados como falhos nessa idade — sintomas incluem bateria fraca mesmo após carga completa, farol "piscando" em marcha lenta, ou dificuldade de partida a frio. Teste o sistema de carga (tensão da bateria em marcha lenta e em regime, 13,5-14,5 V esperado) antes de fechar a compra de qualquer unidade usada.',
  },
]

const V750_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Raridade de peças — moto nunca vendida oficialmente no Brasil; peças de motor e ciclística dependem de importação ou desmanche',
    body: 'Por nunca ter sido distribuída oficialmente pela Yamaha do Brasil, a 750 Virago tem rede de peças muito mais limitada que a XV535S (que teve venda oficial). Peças de motor (pistão, anéis, juntas) às vezes são compartilhadas com a família Virago maior (1100) ou precisam de importação direta. Antes de comprar, verifique com especialistas em motos clássicas Yamaha a disponibilidade de peças de reposição — alguns itens de ciclística (plásticos, emblemas) são praticamente impossíveis de achar novos.',
  },
  {
    severity: 'WARN',
    title: 'Sistema de carga (estator/retificador) — falha comum documentada em toda a família Virago em unidades de alta idade/quilometragem',
    body: 'Estator e retificador/regulador de tensão são pontos fracos documentados em toda a linha Virago clássica, mais evidentes agora que as unidades passaram dos 30-40 anos. Falha do retificador pode causar sobrecarga da bateria (superaquecimento, "fervura" do eletrólito) ou undercharging (bateria sempre fraca). Verificar a resistência do estator (ohmímetro entre os fios amarelos) e a tensão de saída do retificador são testes básicos antes de qualquer viagem longa nesta moto.',
  },
  {
    severity: 'WARN',
    title: 'Carburador Mikuni — jatos e diafragma endurecidos pelo tempo e pelo etanol; problema mais citado por quem restaura ou reativa uma 750 Virago parada',
    body: 'A maior queixa de quem compra ou restaura uma 750 Virago parada há anos é o carburador entupido ou com diafragma ressecado. O etanol da gasolina brasileira acelera a degradação de borrachas antigas dentro do carburador. Recomenda-se kit de reparo Mikuni completo (não apenas limpeza) em qualquer unidade reativada após período longo parada — jatos entupidos com verniz não saem só com spray de limpeza de carburador.',
  },
]

const V750_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma de manutenção 750 Virago — moto de colecionador de 40+ anos, cardã, carburada',
    body: 'Óleo do motor: 20W-40 API SE, 3,6 L com filtro, a cada 3.000-4.000 km ou 6 meses (intervalo mais curto que o original de fábrica é recomendado dado a idade do motor). Válvulas (parafuso/contraporca, sem shim): verificar a cada 6.000 km — folga admissão 0,10 mm / escape 0,15 mm, motor frio. Carburador Mikuni: revisão completa preventiva se a moto ficou parada por mais de 1 mês; drenar a cuba antes de guardar por período longo. Óleo do cardã (diferencial traseiro): SAE 80W GL-4, verificar nível a cada revisão, trocar a cada 10.000-12.000 km — item frequentemente esquecido. Sistema de carga: testar tensão da bateria (13,5-14,5 V em marcha) a cada 6 meses — estator e retificador são pontos fracos documentados nesta idade de moto. Pneus: verificar data de fabricação (não só desgaste) — borracha de 5+ anos perde aderência mesmo com sulco aparente. Freios a tambor/disco conforme o ano: verificar lonas/pastilhas a cada 5.000 km.',
  },
]

// ─── XV 1100 VIRAGO (1986-1998 aprox — gray-market/import no Brasil) ─────────
// Motor 1063cc V-twin 75°, ar, SOHC 2V, carburado (Mikuni duplo). ~63 cv.
// EIXO CARDÃ. Ficou famosa no Brasil por aparecer em comercial de cigarro nos anos 80,
// mas nunca teve distribuição oficial da Yamaha do Brasil — chegou via importação paralela.

const XV1100_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 1063cc V-twin 75° a ar, SOHC 2 válvulas — óleo 3,1 L com filtro; ajuste de válvulas por parafuso/contraporca a cada 12.000 km',
    body: 'A XV1100 Virago compartilha a arquitetura de motor da 750, ampliada para 1063cc. Óleo: 3,1 L na troca com filtro. Válvulas por parafuso e contraporca (sem shim) — verificação inicial aos 1.000 km, depois a cada 12.000 km/12 meses. Vela: NGK BPR7ES ou DENSO W22EPR-U, gap 0,7-0,8 mm. Carburação dupla Mikuni.',
  },
  {
    severity: 'OK',
    title: 'Transmissão final por EIXO CARDÃ — motor de maior torque que a 750/535 acelera o desgaste de estrias e juntas universais se o óleo do diferencial for negligenciado',
    body: 'A XV1100 usa eixo cardã como toda a família Virago/Star. Por ter mais torque que a 750 e a 535, o desgaste de estrias (splines) e da junta universal do cardã é mais citado em fóruns de proprietários quando o óleo do diferencial (SAE 80W GL-4) não é trocado com regularidade. Verifique o nível a cada revisão e troque a cada 10.000-12.000 km. Ruído metálico ou folga ao acelerar/desacelerar bruscamente pode indicar desgaste das estrias — não ignore.',
  },
  {
    severity: 'OK',
    title: 'Moto icônica no Brasil (comercial de cigarro anos 80) mas NUNCA teve venda oficial — toda unidade é importação paralela dos anos 80-90, hoje moto de colecionador',
    body: 'A XV1100 Virago ganhou fama no Brasil por aparecer em um comercial de cigarro marcante nos anos 80, mas a Yamaha do Brasil nunca a distribuiu oficialmente — todas as unidades no país entraram via importação paralela. Isso significa: peças de reposição dependem de importação ou desmanche especializado, e a maioria das unidades hoje tem 25-35+ anos. Compre com inspeção mecânica completa, especialmente do sistema de carga e do carburador duplo.',
  },
]

const XV1100_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Desgaste de estrias e junta universal do cardã — mais citado nesta moto que na 750/535 por conta do maior torque do motor 1100cc',
    body: 'O maior torque da XV1100 (comparado à 750 e à 535 Virago) acelera o desgaste das estrias (spline) e da junta universal (u-joint) do eixo cardã quando o óleo do diferencial é negligenciado. É o ponto de desgaste mais citado em fóruns de longo prazo desta moto — mais recorrente que problemas de motor propriamente ditos. Reparo envolve desmontagem da transmissão final, custo elevado e peça difícil de achar para moto sem distribuição oficial no Brasil.',
  },
  {
    severity: 'WARN',
    title: 'Sistema de carga (estator/retificador) envelhecido — falha comum em unidades de 25-35+ anos, mesmo padrão da família Virago inteira',
    body: 'Como toda a família Virago clássica, a XV1100 sofre com estator e retificador/regulador de tensão envelhecidos. Sintomas: bateria fraca persistente, farol piscando em marcha lenta, dificuldade de partida a frio. Teste a tensão de saída do sistema de carga (13,5-14,5 V em regime) antes de qualquer uso prolongado — muito comum em unidades reativadas após período parado.',
  },
  {
    severity: 'WARN',
    title: 'Carburação dupla Mikuni — sincronização e limpeza são mais trabalhosas que na 750/535 (motor de 2 carburadores); etanol acelera degradação em unidades paradas',
    body: 'A XV1100 tem carburação dupla (2 carburadores Mikuni), o que torna a sincronização e a limpeza mais trabalhosas que nos modelos de carburador único. Etanol da gasolina brasileira, combinado com décadas de idade das borrachas internas, causa entupimento de jatos e endurecimento de diafragmas — problema generalizado em toda unidade que ficou parada por meses. Revisão de carburador em oficina especializada em motos clássicas Yamaha é recomendada antes de qualquer viagem longa.',
  },
]

const XV1100_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma de manutenção XV1100 Virago — cardã, carburação dupla, motor de maior torque da família Virago clássica',
    body: 'Óleo do motor: 3,1 L com filtro, a cada 3.000-4.000 km ou 6 meses (mais frequente que o original de fábrica, dado a idade das unidades hoje). Válvulas: verificação inicial 1.000 km, depois a cada 12.000 km/12 meses (parafuso/contraporca, sem shim). Vela: NGK BPR7ES, gap 0,7-0,8 mm, a cada 8.000-10.000 km. Carburação dupla Mikuni: sincronização e limpeza preventiva a cada 12.000 km ou se a moto ficou parada por mais de 1 mês. Óleo do diferencial do cardã: SAE 80W GL-4, verificar nível a cada revisão, trocar a cada 10.000-12.000 km — atraso nesta troca é a causa mais citada de desgaste de estrias/junta universal nesta moto especificamente. Sistema de carga: testar tensão (13,5-14,5 V) a cada 6 meses. Pneus: verificar idade da borracha, não só desgaste visual.',
  },
]

// ─── XV 535 S VIRAGO (1994-2002 — venda oficial Yamaha do Brasil) ───────────
// Motor 535cc V-twin 70°, ar, SOHC 2V, carburação dupla Mikuni BDS34. 44 cv a 7.500 rpm.
// EIXO CARDÃ (uma das poucas cruisers pequenas com cardã em vez de corrente/correia).
// Válvulas por SHIM (diferente da 750/1100) — item de atenção. Rival direta da Shadow 600
// no mercado brasileiro. A mais "nacional" das três Virago desta safra.

const XV535_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 535cc V-twin 70° a ar, SOHC 2 válvulas — óleo 10W-40 API SE, 2,8 L; válvulas por SHIM-UNDER-BUCKET (diferente da 750/1100 Virago)',
    body: 'A XV535S usa motor 535cc, menor da família Virago clássica no Brasil. Óleo: 10W-40 API SE, 2,8 L. IMPORTANTE: ao contrário da 750 e da 1100 Virago (que usam parafuso/contraporca), a XV535 usa válvulas do tipo shim-under-bucket — exige pastilhas de espessura calibrada para ajuste, serviço mais trabalhoso e que exige mecânico com experiência específica nesse tipo de válvula. Folga: admissão 0,07-0,12 mm / escape 0,12-0,17 mm, verificar a cada 8.000 km.',
  },
  {
    severity: 'OK',
    title: 'Transmissão final por EIXO CARDÃ — era rara entre cruisers pequenas (maioria usa corrente); óleo do diferencial 190 ml SAE 80W GL-4, trocar a cada 12.000 km',
    body: 'A XV535S Virago era uma raridade em sua categoria por usar cardã em vez de corrente ou correia, mesmo sendo uma moto de cilindrada relativamente pequena (535cc). Isso era um diferencial de venda na época. Óleo do diferencial: 190 ml SAE 80W GL-4, trocar a cada 12.000 km. Vantagem: sem corrente para lubrificar/ajustar/trocar. Atenção: ainda assim requer troca do óleo do cardã — não é "zero manutenção".',
  },
  {
    severity: 'OK',
    title: 'A mais "brasileira" das Virago — venda oficial Yamaha do Brasil 1994-2002, rival direta da Honda Shadow 600; peças mais fáceis de achar que a 750/1100',
    body: 'Diferente da 750 e da 1100 Virago (que só chegaram ao Brasil por importação paralela), a XV535S teve distribuição oficial da Yamaha do Brasil entre 1994 e 2002, rivalizando diretamente com a Honda Shadow 600 no segmento de cruisers médias. Isso significa maior disponibilidade de peças de reposição e mais mecânicos familiarizados com o modelo, comparado às Virago maiores.',
  },
  {
    severity: 'WARN',
    title: 'Carburação dupla Mikuni BDS34 — parafuso de ar (~2,5 voltas) sensível a desregulagem; etanol da gasolina brasileira acelera entupimento em uso esporádico',
    body: 'A XV535S usa 2 carburadores Mikuni BDS34, com parafuso de ar de referência ~2,5 voltas abertas (ajuste fino pode variar por unidade/altitude). Etanol combinado com uso esporádico (moto que fica dias/semanas parada) forma verniz nos jatos e endurece diafragmas — problema recorrente em relatos de donos que reativam a moto após período parado. Drenar a cuba do carburador antes de guardar por mais de 2-3 semanas evita boa parte do problema.',
  },
]

const XV535_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Ajuste de válvulas por SHIM negligenciado — muitos mecânicos não especializados desconhecem o procedimento e pulam essa manutenção, risco de dano em folgas muito abertas',
    body: 'Por usar válvulas do tipo shim-under-bucket (diferente da maioria das cruisers concorrentes da época), a XV535S frequentemente tem esse item de manutenção negligenciado por oficinas não especializadas em Yamaha clássica — o procedimento exige a remoção do comando de válvulas e um jogo de pastilhas calibradas, mais trabalhoso que apenas girar um parafuso. Folgas de válvula muito abertas por anos sem verificação podem causar ruído excessivo e, em casos extremos, dano à sede de válvula. Procure oficina com experiência específica em Virago 535 para esse serviço.',
  },
  {
    severity: 'WARN',
    title: 'Carburação Mikuni gomada por etanol em uso esporádico — queixa mais comum entre donos que usam a moto só nos fins de semana',
    body: 'Assim como toda a família Virago/Star carburada, a XV535S sofre com combustível brasileiro parado por semanas nos carburadores. Sintomas: marcha lenta instável, dificuldade de partida a frio, "afogamento" no acelerador. Solução: drenar a cuba antes de guardar por período longo, ou revisão completa de carburador se os sintomas já apareceram.',
  },
  {
    severity: 'WARN',
    title: 'Sistema de carga (estator/retificador) — unidades de 20-30 anos apresentam falhas elétricas com frequência crescente',
    body: 'Estator e retificador/regulador de tensão são os itens elétricos mais citados como ponto fraco em unidades hoje com 20-30 anos de uso. Sintomas: bateria descarregando mesmo com uso regular, farol "pulsando" em marcha lenta. Teste a tensão de carga (13,5-14,5 V em regime) periodicamente, principalmente antes de viagens.',
  },
]

const XV535_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma de manutenção XV535S Virago — cardã, válvulas por shim, carburação dupla, venda oficial 1994-2002',
    body: 'Óleo do motor: 10W-40 API SE, 2,8 L, a cada 3.000 km ou 6 meses. Válvulas (shim-under-bucket): verificar a cada 8.000 km — folga admissão 0,07-0,12 mm / escape 0,12-0,17 mm; procure oficina especializada em Yamaha clássica para esse serviço. Carburação dupla Mikuni BDS34: sincronização e limpeza a cada 10.000 km ou se a moto ficou parada por mais de 2-3 semanas. Óleo do diferencial do cardã: 190 ml SAE 80W GL-4, trocar a cada 12.000 km. Sistema de carga: testar tensão (13,5-14,5 V) a cada 6 meses. Corrente de comando/tensor: verificar ruído de partida a frio a cada revisão (tensor automático em alguns anos, manual em outros — confirme pelo ano). Pneus: 100/90-19 (dianteiro) / 140/90-15 (traseiro) — verificar idade da borracha em unidades de baixa quilometragem anual.',
  },
]

// ─── XVS 650 DRAG STAR (1997-2008 — venda oficial Yamaha do Brasil) ─────────
// Motor 649cc V-twin 75°, ar, SOHC 2V, carburador único Mikuni 28mm downdraft. ~40 cv.
// EIXO CARDÃ ("shaft drive maintenance-free" no marketing da época). Substituiu a XV535S
// no catálogo oficial. Rival direta da Honda Shadow.

const DRAGSTAR650_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 649cc V-twin 75° a ar, SOHC 2 válvulas — óleo 10W-40/20W-50 API SG JASO MA, ~2,7-2,9 L com filtro; carburador único Mikuni 28mm',
    body: 'A Drag Star 650 substituiu a XV535S no catálogo oficial Yamaha do Brasil, com motor maior (649cc) e carburação simplificada para carburador único Mikuni 28mm downdraft (a XV535 tinha 2 carburadores). Óleo: API SG mínimo, JASO MA, 10W-40 ou 20W-50 conforme clima, aproximadamente 2,7-2,9 L com filtro. Óleo do diferencial do cardã: SAE 80 API GL-4. Vela: NGK DPR7EA-9.',
  },
  {
    severity: 'OK',
    title: 'Transmissão final por EIXO CARDÃ — marketing da época chamava de "maintenance-free", mas óleo do diferencial ainda precisa de troca periódica',
    body: 'A Drag Star 650 foi vendida com a transmissão cardã como diferencial de marketing ("praticamente livre de manutenção" comparado a corrente). Isso é parcialmente verdade — sem lubrificação/ajuste de corrente — mas o óleo do diferencial traseiro (SAE 80 GL-4) ainda precisa ser verificado e trocado periodicamente. Não confunda "sem corrente" com "sem manutenção alguma" no cardã.',
  },
  {
    severity: 'WARN',
    title: 'Estator e bobina de ignição/pickup — falhas elétricas são a queixa mais citada em fóruns de proprietários, especialmente acima de 60.000-70.000 km ou após longos períodos parada',
    body: 'Falhas de estator/retificador são o problema elétrico mais citado por donos da Drag Star 650 em fóruns internacionais, principalmente em unidades com mais de 60.000-70.000 km ou que passaram por longos períodos de armazenamento (relevante no Brasil, onde umidade e variação de temperatura na garagem aceleram corrosão de conectores). Falha de bobina de ignição/pickup causando "sem faísca" intermitente também é documentada. Ao comprar usada, teste o sistema de carga (tensão em marcha lenta e em regime) antes de fechar negócio.',
  },
]

const DRAGSTAR650_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Estator/retificador — problema elétrico mais recorrente da linha, principalmente em unidades de alta quilometragem ou que ficaram armazenadas por longos períodos',
    body: 'Esta é a queixa elétrica mais citada em fóruns de proprietários da Drag Star 650: falha de estator ou retificador/regulador de tensão, geralmente acima de 60.000-70.000 km. Sintomas: bateria fraca mesmo após recarga, farol "pulsando" em marcha lenta, dificuldade de partida. Em climas úmidos (litoral brasileiro), a corrosão em conectores elétricos acelera esse tipo de falha. Teste o sistema de carga preventivamente a cada 20.000 km em unidades com mais de 8-10 anos de uso.',
  },
  {
    severity: 'WARN',
    title: 'Carburador Mikuni entupindo com etanol da gasolina brasileira em uso esporádico — jatos e bóia são os pontos mais afetados',
    body: 'O carburador único Mikuni 28mm da Drag Star 650 é sensível a etanol parado — sujeira ou verniz pode entupir os jatos ou prender a bóia/agulha, causando transbordamento ou marcha lenta irregular. Problema mais comum em motos usadas esporadicamente (fins de semana). Drenar a cuba antes de guardar por mais de 2-3 semanas é a prevenção mais simples e eficaz.',
  },
]

const DRAGSTAR650_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma de manutenção Drag Star 650 — cardã, carburador único, venda oficial 1997-2008',
    body: 'Óleo do motor: API SG JASO MA, 10W-40 (clima ameno) ou 20W-50 (clima quente), ~2,7-2,9 L com filtro, a cada 3.000-4.000 km ou 6 meses. Vela NGK DPR7EA-9: a cada 8.000-10.000 km. Carburador Mikuni 28mm: limpeza/sincronização a cada 10.000-12.000 km, ou preventivamente se a moto ficou parada por mais de 2-3 semanas com etanol no tanque. Óleo do diferencial do cardã (SAE 80 GL-4): verificar nível a cada revisão, trocar a cada 12.000-15.000 km. Sistema de carga (estator/retificador): testar a cada 20.000 km em unidades com mais de 8-10 anos — falha elétrica é o problema documentado mais recorrente da linha. Válvulas: verificar folga a cada 12.000 km. Pneus: verificar calibragem e idade da borracha regularmente.',
  },
]

// ─── XVS 1100 DRAG STAR (2000-2008 — venda oficial Yamaha do Brasil) ────────
// Motor 1063cc V-twin 75°, ar, SOHC 2V, carburado (versão atualizada do motor da XV1100
// Virago). ~63 cv a 5.750 rpm, torque 85 Nm a 2.500 rpm. EIXO CARDÃ. Reputação de
// confiabilidade alta, mas desgaste do cardã em alta quilometragem é bem documentado.

const DRAGSTAR1100_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 1063cc V-twin 75° a ar, SOHC 2 válvulas — versão atualizada do motor da XV1100 Virago; óleo 3,0 L, válvulas verificadas a cada 6.000 km (intervalo mais curto que a Virago 1100)',
    body: 'A Drag Star 1100 usa uma versão atualizada do motor 1063cc da Virago 1100, com ~63 cv a 5.750 rpm e bom torque (85 Nm) a apenas 2.500 rpm — motor "de baixo", característico de cruiser. Óleo: 3,0 L na troca. Válvulas: verificar/ajustar a cada 6.000 km/6 meses — intervalo mais curto e mais rigoroso que o da Virago 1100 (12.000 km), então não aplique o cronograma da Virago 1100 nesta moto.',
  },
  {
    severity: 'OK',
    title: 'Transmissão final por EIXO CARDÃ — moto com reputação de confiabilidade alta, mas desgaste do próprio cardã em alta km é o item de maior atenção documentado',
    body: 'A Drag Star 1100 tem reputação de confiabilidade geral acima da média entre cruisers da época, mas relatos de proprietários de alta quilometragem apontam o eixo cardã (não o motor) como o principal item de desgaste no longo prazo: falha de estrias do cubo, desgaste do eixo intermediário e do garfo de câmbio são documentados em unidades de uso muito prolongado. Manter o óleo do diferencial em dia (SAE 80 GL-4) é a prevenção mais eficaz — a maioria dos casos de falha prematura do cardã está ligada a troca de óleo negligenciada, não a defeito de fábrica.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK BPR7ES ou DENSO W22EPR-U — motor carburado, robusto e considerado "sem grandes problemas" pela comunidade de proprietários',
    body: 'Diferente de muitas cruisers de sua época, a Drag Star 1100 é frequentemente descrita por proprietários de longa data como tendo "poucos problemas reais" de motor — os itens de atenção documentados são majoritariamente de desgaste do cardã e do carburador, não do bloco do motor em si. Vela: NGK BPR7ES ou DENSO W22EPR-U.',
  },
]

const DRAGSTAR1100_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Desgaste do eixo cardã em alta quilometragem — estrias do cubo, eixo intermediário e garfo de câmbio são os pontos mais citados em uso muito prolongado',
    body: 'Em unidades de quilometragem muito alta, proprietários da Drag Star 1100 relatam desgaste progressivo em componentes do eixo cardã: estrias do cubo traseiro, eixo intermediário e garfo de câmbio da transmissão. É o principal item de desgaste de longo prazo documentado nesta moto — mais relevante que qualquer problema de motor. Prevenção: manter a troca do óleo do diferencial (SAE 80 GL-4) rigorosamente em dia, a cada 12.000-15.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Carburador — gomeamento por etanol e desregulagem de sincronismo em uso esporádico ou após longos períodos parada',
    body: 'Assim como toda a família Virago/Drag Star carburada, o carburador da 1100 sofre com combustível brasileiro parado, formando verniz nos jatos. Drenar a cuba antes de guardar por período longo evita boa parte do problema. Sincronismo (se aplicável à configuração específica) deve ser verificado periodicamente para evitar marcha lenta irregular.',
  },
  {
    severity: 'WARN',
    title: 'Estator/retificador envelhecido — mesma vulnerabilidade elétrica da família Virago/Star; verificar em unidades de alta quilometragem ou muitos anos de uso',
    body: 'O sistema de carga (estator e retificador/regulador de tensão) é vulnerável ao envelhecimento, como em toda a família Virago/Star. Sintomas: bateria fraca, farol pulsando em marcha lenta. Verificação preventiva da tensão de carga é recomendada a cada 20.000 km em unidades com muitos anos de uso.',
  },
]

const DRAGSTAR1100_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma de manutenção Drag Star 1100 — cardã, carburada, venda oficial no Brasil até 2008',
    body: 'Óleo do motor: 3,0 L, a cada 3.000-4.000 km ou 6 meses. Vela NGK BPR7ES: a cada 8.000-10.000 km. Válvulas: verificar/ajustar a cada 6.000 km/6 meses (intervalo mais curto que a Virago 1100 — não confunda os cronogramas). Carburador: limpeza/sincronismo a cada 10.000-12.000 km, ou preventivo se ficou parada por período longo. Óleo do diferencial do cardã (SAE 80 GL-4): verificar a cada revisão, trocar a cada 12.000-15.000 km — item crítico para prevenir desgaste do cubo/eixo intermediário/garfo de câmbio, o principal ponto de desgaste de longo prazo desta moto. Sistema de carga: testar tensão a cada 20.000 km. Pneus: 110/90-18 (dianteiro) / 170/85-15 (traseiro) — verificar calibragem e idade da borracha.',
  },
]

// ─── XVS 950 MIDNIGHT STAR (2009-2016 — venda oficial Yamaha do Brasil) ─────
// Motor 942cc V-twin 60°, ar, SOHC 4V (4 válvulas por cilindro — mais moderno que o resto
// da família, que usa 2V), injeção eletrônica Mikuni. ~54 cv a 6.000 rpm, torque 77 Nm a
// 3.000 rpm. TRANSMISSÃO POR CORREIA (belt drive) — ÚNICA exceção ao cardã nesta família.
// Substituiu a Drag Star 650/1100 no catálogo oficial a partir de 2008/2009.

const MIDNIGHTSTAR950_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 942cc V-twin 60° a ar, SOHC 4 válvulas por cilindro — mais moderno que a Virago/Drag Star (2V); injeção eletrônica Mikuni elimina o carburador',
    body: 'A Midnight Star 950 trouxe upgrade real de motor em relação à Drag Star: 4 válvulas por cilindro (SOHC 4V) em vez das 2V da família Virago/Drag Star, além de injeção eletrônica Mikuni no lugar do carburador. Isso elimina de vez os problemas de carburador entupido por etanol que afetam TODOS os outros modelos desta família. Óleo: 3,7 L sem filtro / 4,0 L com troca de filtro.',
  },
  {
    severity: 'WARN',
    title: 'ÚNICO modelo desta família com transmissão por CORREIA (belt drive) — não confundir com o cardã do resto da linha Virago/Star/V-Max; folga de 6-8 mm a verificar',
    body: 'Diferente de TODA a família Virago/Drag Star/Royal Star/V-Max (todas com eixo cardã), a Midnight Star 950 usa transmissão final por CORREIA. A correia não precisa de lubrificação como corrente, mas exige verificação de tensão periódica: folga alvo de 6-8 mm ao aplicar força de 45N no ponto de verificação (janela de inspeção na correia). Correias de aramida duram muito mais que corrente, mas inspecione visualmente rachaduras ou desgaste da borda a cada revisão — substituição de correia rompida no meio de uma viagem imobiliza a moto (não há corrente reserva improvisável).',
  },
  {
    severity: 'OK',
    title: 'Válvulas por parafuso tipo rocker (balancim) — AINDA exige ajuste manual periódico; não é motor com comando hidráulico "zero manutenção"',
    body: 'Apesar do motor mais moderno (4V, EFI), a Midnight Star 950 ainda usa ajustadores de válvula tipo parafuso no balancim — não tem comando hidráulico automático. Isso significa que o ajuste de válvulas continua sendo item de manutenção periódica obrigatória, apesar da injeção eletrônica ter eliminado o carburador. Não assuma "moto injetada = sem ajuste de válvula".',
  },
]

const MIDNIGHTSTAR950_PROBLEMAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Muito menos problemas documentados que o resto da família — injeção eletrônica elimina o entupimento por etanol; correia elimina desgaste de cardã',
    body: 'A Midnight Star 950 tem uma reputação de confiabilidade nitidamente melhor que a Virago/Drag Star/Royal Star/V-Max nos fóruns de proprietários — a injeção eletrônica elimina o problema mais recorrente de toda a família (carburador entupindo com etanol), e a transmissão por correia elimina o desgaste de cardã (estrias, junta universal) que afeta o resto da linha. É o modelo mais indicado desta família para quem quer menor manutenção recorrente.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão de conectores elétricos em clima úmido — ponto de atenção da era EFI, mais relevante no litoral brasileiro do que problema de carburador',
    body: 'Sem os problemas clássicos de carburador, o ponto de atenção elétrico da Midnight Star 950 é a corrosão de conectores do chicote em climas úmidos — relevante para o litoral brasileiro. Inspecione conectores da injeção eletrônica e do sistema de ignição a cada revisão, principalmente em motos guardadas perto do mar ou em garagens úmidas. Aplicar graxa dielétrica nos conectores é prevenção simples e eficaz.',
  },
]

const MIDNIGHTSTAR950_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma de manutenção Midnight Star 950 — correia (não cardã!), injeção eletrônica, venda oficial 2009-2016',
    body: 'Óleo do motor: 3,7 L sem filtro / 4,0 L com troca de filtro, a cada 4.000-6.000 km ou 6 meses/12 meses conforme uso. Correia (belt drive): verificar tensão a cada 6.000-10.000 km — folga alvo 6-8 mm com força de 45N no ponto de inspeção; inspecionar visualmente rachaduras/desgaste de borda a cada revisão. Válvulas (parafuso tipo balancim): verificar folga periodicamente conforme manual — motor 4V ainda exige ajuste manual, não é hidráulico. Injeção eletrônica: sem carburador para limpar — inspeção de conectores do chicote a cada revisão, especialmente em clima úmido/litorâneo. Vela: verificar gap conforme manual a cada 10.000 km. Pneus: 130/70-18 (dianteiro) / 170/70-16 (traseiro). Tanque: 17 L.',
  },
]

// ─── ROYAL STAR 1300 (XVZ1300, 1996-2000 — import/usado no Brasil) ──────────
// Motor 1294cc V4, LÍQUIDO-refrigerado, SOHC 2V, 4 carburadores Mikuni 32mm sincronizados
// de fábrica. ~75 cv a 4.750 rpm, torque 112 Nm a 3.500 rpm. EIXO CARDÃ. Touring cruiser
// pesada — único modelo desta família (além dos V-Max) com arrefecimento líquido.

const ROYALSTAR1300_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 1294cc V4 LÍQUIDO-refrigerado, SOHC 2 válvulas — único da família Virago/Drag Star com radiador (junto com os V-Max); óleo 3,7 L, troca a cada 6.000 km',
    body: 'A Royal Star 1300 é a única cruiser desta família (além dos V-Max) com motor V4 e arrefecimento líquido — diferente do resfriamento a ar de toda a linha Virago/Drag Star/Midnight Star. Isso significa manutenção adicional que não existe no resto da família: verificação de nível de líquido de arrefecimento, inspeção de mangueiras e radiador, troca de líquido periódica. Óleo do motor: 3,7 L (10W-40), trocar a cada 6.000 km.',
  },
  {
    severity: 'WARN',
    title: '4 carburadores Mikuni 32mm sincronizados de fábrica — sincronismo é o item de manutenção mais crítico e mais citado por proprietários; NÃO tente ajustar sem instrumento de sincronismo',
    body: 'A Royal Star 1300 usa 4 carburadores Mikuni 32mm, sincronizados de fábrica. O próprio manual Yamaha alerta que reajustes amadores podem causar mau desempenho e até dano ao motor. Com o tempo (vibração, desgaste natural), os 4 carburadores perdem sincronismo, causando marcha lenta irregular e resposta de acelerador inconsistente. Diferente dos modelos V-twin desta família (1 ou 2 carburadores), aqui a sincronização exige jogo de manômetros de vácuo e é serviço para oficina especializada em Yamaha V4 — não é ajuste caseiro.',
  },
  {
    severity: 'OK',
    title: 'Transmissão final por EIXO CARDÃ — óleo do diferencial 200 ml SAE 80 GL-4, trocar a cada 20.000 km; válvulas verificadas a cada 10.000 km',
    body: 'A Royal Star 1300 usa eixo cardã como toda a família (exceto a Midnight Star 950). Óleo do diferencial: 200 ml SAE 80 GL-4, trocar a cada 20.000 km. Válvulas: verificar a cada 10.000 km — folga admissão 0,11-0,15 mm / escape 0,16-0,20 mm, motor frio.',
  },
]

const ROYALSTAR1300_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Perda de sincronismo entre os 4 carburadores — problema nº1 documentado pelos proprietários; causa marcha lenta irregular e resposta de acelerador inconsistente',
    body: 'A queixa mais recorrente entre proprietários da Royal Star 1300 é a perda de sincronismo entre os 4 carburadores Mikuni ao longo do tempo — vibração e desgaste natural desregulam a sincronização de fábrica, causando marcha lenta instável e perda de suavidade na resposta do acelerador. É um problema estrutural do design multi-carburador, não um defeito isolado. Sincronismo profissional a cada 10.000-15.000 km previne o problema — procure oficina especializada em motos Yamaha V4/touring, pois o serviço exige jogo de manômetros de vácuo específico.',
  },
  {
    severity: 'WARN',
    title: 'Falhas de estator, bobina de pickup e módulo de ignição documentadas em unidades envelhecidas — moto de 25-30 anos hoje',
    body: 'Estator, bobina de pickup e módulo de ignição são componentes com falhas documentadas em unidades da Royal Star 1300 já com 25-30 anos de idade. Sintomas: falha de partida, "sem faísca" intermitente, bateria fraca persistente. Como a moto não teve distribuição oficial confirmada da Yamaha do Brasil (chega majoritariamente como usada/importada), a disponibilidade de peças elétricas de reposição é mais limitada que em modelos com venda oficial no país.',
  },
  {
    severity: 'WARN',
    title: 'Sistema de arrefecimento líquido negligenciado — moto pesada de touring, superaquecimento em trânsito parado se radiador/mangueiras não forem inspecionados',
    body: 'Por ser a única cruiser desta família com radiador, o sistema de arrefecimento líquido da Royal Star 1300 é frequentemente negligenciado por mecânicos acostumados só com motos a ar (resto da família Virago/Drag Star). Mangueiras ressecadas, radiador sujo por fora ou nível de líquido baixo podem causar superaquecimento, especialmente em trânsito urbano parado (moto pesada, mais de 300 kg). Inspecione o sistema de arrefecimento a cada revisão — item que não existe no resto da linha e por isso é fácil de esquecer.',
  },
]

const ROYALSTAR1300_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma de manutenção Royal Star 1300 — cardã, V4 líquido-refrigerado, 4 carburadores sincronizados de fábrica',
    body: 'Óleo do motor: 3,7 L (10W-40), a cada 6.000 km. Válvulas: verificar a cada 10.000 km — folga admissão 0,11-0,15 mm / escape 0,16-0,20 mm. Sincronismo dos 4 carburadores Mikuni 32mm: profissional, a cada 10.000-15.000 km — item mais crítico e mais citado como problema recorrente; exige manômetros de vácuo, procure oficina especializada em Yamaha V4. Óleo do diferencial do cardã: 200 ml SAE 80 GL-4, trocar a cada 20.000 km. Sistema de arrefecimento líquido (único da família com radiador): verificar nível, mangueiras e limpeza externa do radiador a cada revisão; trocar líquido de arrefecimento a cada 2 anos. Sistema de carga (estator/pickup/módulo de ignição): testar a cada 15.000-20.000 km em unidades com 20+ anos. Peso elevado (300+ kg): atenção redobrada a pneus, freios e suspensão traseira em uso de garupa/bagagem.',
  },
]

// ─── V-MAX 1200 (VMX1200, 1985-2007 — import, versão sem V-Boost teve venda oficial) ─
// Motor 1198cc V4 70°, LÍQUIDO-refrigerado, DOHC 4V, 4 carburadores Mikuni 35mm (+ V-Boost
// em versões de potência plena). ~145 cv (spec US/V-Boost) a 9.000 rpm. EIXO CARDÃ.
// Muscle bike lendária — starter clutch e retificador são as falhas mais documentadas.

const VMAX1200_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 1198cc V4 70° LÍQUIDO-refrigerado, DOHC 4 válvulas — óleo 3,5 L sem filtro / 3,8 L com filtro, 10W-40; válvulas por shim (job trabalhoso em motor V4 DOHC)',
    body: 'O V-Max 1200 é um V4 DOHC 4 válvulas por cilindro, arrefecido a líquido — motor tecnicamente mais complexo que toda a família Virago/Drag Star. Óleo: 3,5 L sem filtro / 3,8 L com troca de filtro, 10W-40. Válvulas: shim-under-bucket, folga admissão 0,11-0,15 mm / escape 0,26-0,30 mm (repare que a folga de escape é bem mais aberta que nas V-twins desta família) — serviço trabalhoso por ser motor V4 DOHC com acesso apertado pela carenagem/tanque; recomenda-se especialista, não é job de garagem para iniciante.',
  },
  {
    severity: 'OK',
    title: 'Transmissão final por EIXO CARDÃ — escolha rara para uma "muscle bike" de alta performance; feita para durabilidade, não para trocas rápidas de relação como corrente',
    body: 'O V-Max 1200 usa eixo cardã mesmo sendo uma moto de altíssima performance (até 145 cv na versão V-Boost) — escolha de projeto voltada para durabilidade e baixa manutenção em vez do desempenho ajustável de uma transmissão por corrente. Óleo do diferencial: verificar a cada revisão, trocar periodicamente com óleo hipoide apropriado.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem de partida (starter clutch) — falha "clássica" e muito documentada; sintoma é motor de arranque girando/zunindo sem fazer o motor pegar',
    body: 'A falha da embreagem de partida (starter clutch) é considerada praticamente lendária entre proprietários do V-Max 1200, citada com muita frequência em fóruns especializados (vmaxforum.net). Sintoma característico: ao acionar a partida, o motor de arranque gira e faz barulho mas não consegue girar o motor (não "engata"). É item de desgaste conhecido, não indica necessariamente defeito de fábrica ou abuso — mas deve ser verificado em qualquer compra de unidade usada.',
  },
  {
    severity: 'WARN',
    title: 'Retificador de tensão — causa de praticamente todas as reclamações do sistema de carga segundo consenso da comunidade de proprietários; solução caseira documentada é aterramento dedicado',
    body: 'Segundo consenso da comunidade especializada (vmaxforum.net), o retificador de tensão é a causa de cerca de 95% das reclamações de sistema de carga no V-Max 1200 — mais até que o estator. Uma solução caseira documentada e popular entre proprietários é instalar um fio terra dedicado do suporte do retificador até o polo negativo da bateria/chassi, melhorando o aterramento original considerado insuficiente de fábrica. Estator: resistência esperada 0,038-0,045 ohms entre os terminais; tensão de saída esperada 60-65V — leituras na casa dos 50V indicam estator enfraquecendo.',
  },
]

const VMAX1200_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Falha da embreagem de partida (starter clutch) — problema mais citado da moto; motor de arranque gira mas não faz o motor pegar',
    body: 'Esta é a falha mais documentada e discutida em toda a comunidade de proprietários do V-Max 1200. Sintoma inconfundível: partida elétrica aciona, motor de arranque gira e faz ruído, mas o motor não é "puxado" para girar — a embreagem de partida está patinando ou destruída. Reparo exige abertura do motor (lado direito), não é serviço trivial. Ao comprar uma unidade usada, teste a partida a frio várias vezes seguidas para descartar esse problema antes de fechar negócio.',
  },
  {
    severity: 'WARN',
    title: 'Retificador de tensão — principal causa de falha no sistema de carga; estator secundariamente também é ponto fraco documentado',
    body: 'O retificador de tensão é apontado pela comunidade especializada como responsável pela grande maioria das falhas de sistema de carga do V-Max 1200. Sintomas: bateria não segura carga, luzes oscilando, dificuldade de partida a frio por bateria fraca. Verificar a resistência do estator (0,038-0,045 ohms esperado) e a tensão de saída (60-65V esperado) é diagnóstico padrão — leituras abaixo disso indicam componente fraco/falhando.',
  },
  {
    severity: 'WARN',
    title: 'Bloco de jato do carburador (dentro da cuba) — item frequentemente esquecido na revisão de carburador; jato piloto e o-ring/gaxeta sob o bloco são pontos de desgaste',
    body: 'Nos 4 carburadores Mikuni 35mm do V-Max 1200, o bloco de jato (jet block) dentro da cuba de combustível é um componente frequentemente negligenciado durante a revisão — contém o jato piloto (referência ~#37) e um o-ring/gaxeta que também desgasta com o tempo. Revisão completa de carburador deve incluir a desmontagem e limpeza deste bloco, não apenas os jatos principais visíveis de imediato.',
  },
  {
    severity: 'WARN',
    title: 'Recall histórico de bomba de óleo (2008-2011, aplicável a unidades daquele período) e de chicote/sensor de posição (2009) — verificar histórico de recall antes de comprar usada',
    body: 'A Yamaha emitiu recalls documentados para o V-Max relacionados a bomba de óleo (unidades 2008-2011, com risco de desgaste acelerado do eixo da bomba e perda de fluxo de óleo) e a chicote elétrico/sensor de posição do acelerador (2009, resistência elétrica anormal no fio terra podendo gerar sinais falsos para a ECU). Para o V-Max 1200 clássico (pré-2007) esses recalls específicos não se aplicam diretamente (são do 2º geração 1700), mas vale sempre confirmar o histórico de recall pelo chassi antes de comprar qualquer unidade usada.',
  },
]

const VMAX1200_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma de manutenção V-Max 1200 — cardã, V4 DOHC líquido-refrigerado, 4 carburadores com V-Boost',
    body: 'Óleo do motor: 3,5 L sem filtro / 3,8 L com filtro, 10W-40, a cada 4.000-5.000 km. Vela NGK DPR8EA-9 (iridium: DPR8EIX-9), gap 0,8-0,9 mm: a cada 8.000-10.000 km. Válvulas (shim-under-bucket): verificar a cada 12.000-15.000 km — folga admissão 0,11-0,15 mm / escape 0,26-0,30 mm; serviço para especialista em V4 DOHC. Carburação (4x Mikuni 35mm + V-Boost): sincronismo e limpeza do bloco de jato a cada 10.000-12.000 km. Sistema de arrefecimento líquido: verificar nível, mangueiras, radiador a cada revisão; trocar líquido a cada 2 anos. Óleo do diferencial do cardã: verificar a cada revisão, trocar periodicamente conforme manual. Sistema de carga: testar resistência do estator (0,038-0,045 ohms) e tensão do retificador (60-65V) a cada 15.000-20.000 km — falha do retificador é a causa mais comum de problema elétrico nesta moto. Embreagem de partida: testar a partida a frio a cada revisão — falha é item de desgaste conhecido e bem documentado.',
  },
]

// ─── V-MAX 1700 (2009+ — import oficial Yamaha do Brasil) ───────────────────
// Motor 1679cc V4 65°, LÍQUIDO-refrigerado, DOHC 4V, INJEÇÃO ELETRÔNICA com YCC-T
// (acelerador eletrônico) e YCC-I (funis de admissão de comprimento variável). ~200 cv
// a 9.000 rpm, torque 166,8 Nm a 6.500 rpm. EIXO CARDÃ com embreagem de rampa hidráulica
// (anti-hopping). Geração moderna, muito menos problemas documentados que a 1ª geração.

const VMAX1700_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 1679cc V4 65° LÍQUIDO-refrigerado, DOHC 4 válvulas, INJEÇÃO ELETRÔNICA com YCC-T e YCC-I — sem carburador, motor mais moderno de toda esta família de seed',
    body: 'O V-Max 1700 (2ª geração) é o motor mais avançado de toda esta família: injeção eletrônica com acelerador eletrônico YCC-T (Yamaha Chip Controlled Throttle) e funis de admissão de comprimento variável YCC-I (mudam de 150mm para 54mm em 0,3 segundo acima de 6.650 rpm). Isso elimina totalmente os problemas de carburador que afetam Virago/Drag Star/Royal Star/V-Max 1200. Óleo: 4,7 L com troca de filtro.',
  },
  {
    severity: 'OK',
    title: 'Transmissão final por EIXO CARDÃ com embreagem de rampa hidráulica (anti-hopping) — reduz o "pulo" da roda traseira em reduções de marcha agressivas',
    body: 'O V-Max 1700 usa eixo cardã (relação 1,509:1) combinado com uma embreagem de rampa hidráulica (slipper clutch), que ajuda a controlar o "pulo"/travamento da roda traseira em reduções de marcha bruscas — recurso que a 1ª geração (V-Max 1200) não tinha. Óleo do diferencial do cardã: 300 ml, verificar a cada revisão.',
  },
  {
    severity: 'WARN',
    title: 'Válvulas por shim com ferramenta especial Yamaha (YM-33961) — intervalo bem mais longo que a 1ª geração (40.000 km), mas ainda serviço só para especialista',
    body: 'O intervalo de verificação de válvulas do V-Max 1700 é de 40.000 km — bem mais longo que os 12.000-15.000 km do V-Max 1200, refletindo tolerâncias de fabricação mais modernas. Folga: admissão 0,10-0,17 mm / escape 0,22-0,29 mm, motor frio. Ajuste via shim-under-bucket com o comando ainda instalado, usando ferramenta especial Yamaha (YM-33961) — mesmo sendo mais espaçado no tempo, continua sendo um serviço de especialista em V4 DOHC, não um ajuste caseiro.',
  },
  {
    severity: 'WARN',
    title: 'Sistemas eletrônicos YCC-T/YCC-I exigem ferramenta de diagnóstico de concessionária Yamaha — mecânico independente sem o scanner específico não consegue diagnosticar falhas nesses sistemas',
    body: 'Diferente de toda a família carburada desta safra de seed, o V-Max 1700 depende de sistemas eletrônicos proprietários (YCC-T, YCC-I) que exigem a ferramenta de diagnóstico específica da Yamaha para leitura de códigos de falha e calibração. Um mecânico independente sem acesso a esse scanner específico não conseguirá diagnosticar corretamente problemas nesses sistemas — para essa moto, revisões relacionadas à parte eletrônica do motor devem ser feitas em concessionária Yamaha ou oficina com o equipamento certo, não em oficina de bairro genérica.',
  },
]

const VMAX1700_PROBLEMAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Muito menos problemas documentados que a 1ª geração (V-Max 1200) — motor considerado robusto; ausência de carburador elimina o gargalo histórico da linha',
    body: 'O V-Max 1700 tem uma base de proprietários menor e mais recente que o V-Max 1200, e não há um padrão de falha recorrente claro documentado em fóruns especializados até o momento — nada como a "lendária" falha de embreagem de partida do modelo anterior. O motor é geralmente considerado robusto. A ausência total de carburador (substituído por EFI com YCC-T/YCC-I) elimina de vez o gargalo histórico de toda a família Virago/Drag Star/Royal Star/V-Max 1200.',
  },
  {
    severity: 'WARN',
    title: 'Custo e complexidade de diagnóstico dos sistemas eletrônicos — o "problema" real é a dependência de concessionária, não uma falha mecânica específica',
    body: 'O ponto de atenção real do V-Max 1700 não é uma falha recorrente de peça, mas sim a dependência de ferramentas de diagnóstico proprietárias da Yamaha para qualquer problema relacionado aos sistemas YCC-T/YCC-I. Isso torna o custo de manutenção potencialmente mais alto e a disponibilidade de mecânicos qualificados mais restrita (concessionária ou oficina especializada em importados Yamaha), especialmente fora dos grandes centros no Brasil.',
  },
]

const VMAX1700_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma de manutenção V-Max 1700 — cardã com embreagem anti-hopping, V4 DOHC líquido-refrigerado, injeção eletrônica YCC-T/YCC-I',
    body: 'Óleo do motor: 4,7 L com troca de filtro, a cada 6.000 km. Válvulas (shim-under-bucket, ferramenta especial YM-33961): verificar a cada 40.000 km — folga admissão 0,10-0,17 mm / escape 0,22-0,29 mm; serviço exclusivo de especialista/concessionária. Óleo do diferencial do cardã: 300 ml, verificar a cada revisão, trocar conforme manual. Sistemas eletrônicos YCC-T/YCC-I: diagnóstico e eventual recalibração só em concessionária Yamaha ou oficina com scanner específico — mecânica de bairro genérica não tem a ferramenta necessária. Sistema de arrefecimento líquido: verificar nível, mangueiras e radiador a cada revisão; trocar líquido a cada 2 anos. Pneus: 120/70R18 (dianteiro) / 200/50R18 (traseiro) — combo largo, verificar calibragem e desgaste com atenção redobrada por ser moto de mais de 200 cv. Tanque: ~15 L, luz de reserva nos últimos ~4 L.',
  },
]

// ─── Tire Pressures ───────────────────────────────────────────────────────────

const TIRE_PRESSURES = [
  {
    modelName: '750 VIRAGO',
    yearFrom: 1993, yearTo: 1997,
    tireSize: '90/90-19 (F) · 130/90-15 (R) — aproximado, confirmar pelo manual do ano específico',
    frontPsi: 25, rearPsi: 28, frontPsiLoad: 25, rearPsiLoad: 32,
    notes: 'Moto de colecionador (40+ anos) — verificar idade da borracha, não só desgaste. Nunca teve venda oficial no Brasil (importação paralela).',
  },
  {
    modelName: 'XV 1100 VIRAGO',
    yearFrom: 1992, yearTo: 1998,
    tireSize: '110/90-19 (F) · 140/90-15 (R) — aproximado, confirmar pelo manual do ano específico',
    frontPsi: 25, rearPsi: 28, frontPsiLoad: 25, rearPsiLoad: 32,
    notes: 'Motor de maior torque da família Virago clássica. Importação paralela (sem venda oficial Yamaha do Brasil).',
  },
  {
    modelName: 'XV 535 S VIRAGO',
    yearFrom: 1994, yearTo: 2002,
    tireSize: '100/90-19 (F) · 140/90-15 (R)',
    frontPsi: 25, rearPsi: 28, frontPsiLoad: 25, rearPsiLoad: 32,
    notes: 'Venda oficial Yamaha do Brasil 1994-2002 — rival direta da Honda Shadow 600. Cardã raro para a categoria.',
  },
  {
    modelName: 'XVS 650 DRAG STAR',
    yearFrom: 1997, yearTo: 2008,
    tireSize: '130/90-18 (F) · 170/80-15 (R) — confirmar medida dianteira pelo manual do ano específico',
    frontPsi: 25, rearPsi: 28, frontPsiLoad: 25, rearPsiLoad: 32,
    notes: 'Venda oficial Yamaha do Brasil até 2008, substituída pela Midnight Star 950. Cardã "praticamente livre de manutenção" (mas óleo do diferencial ainda precisa de troca).',
  },
  {
    modelName: 'XVS 1100 DRAG STAR',
    yearFrom: 2000, yearTo: 2008,
    tireSize: '110/90-18 (F) · 170/85-15 (R)',
    frontPsi: 26, rearPsi: 29, frontPsiLoad: 26, rearPsiLoad: 33,
    notes: 'Venda oficial Yamaha do Brasil até 2008. Motor robusto — cardã (não o motor) é o item de desgaste mais citado em alta km.',
  },
  {
    modelName: 'XVS 950 MIDNIGHT STAR',
    yearFrom: 2009, yearTo: 2016,
    tireSize: '130/70-18 (F) · 170/70-16 (R)',
    frontPsi: 26, rearPsi: 30, frontPsiLoad: 26, rearPsiLoad: 34,
    notes: 'ÚNICO modelo desta família com transmissão por correia (não cardã) e injeção eletrônica (não carburador). Substituiu a Drag Star 650/1100 em 2008/2009.',
  },
  {
    modelName: 'ROYAL STAR 1300',
    yearFrom: 1996, yearTo: 2000,
    tireSize: '150/80-16 (F) · 150/90-15 (R) — aproximado (touring cruiser pesada), confirmar pelo manual do ano/trim específico',
    frontPsi: 28, rearPsi: 32, frontPsiLoad: 28, rearPsiLoad: 36,
    notes: 'Moto pesada (300+ kg), único V4 líquido-refrigerado desta família além dos V-Max. 4 carburadores sincronizados de fábrica — sincronismo é o item mais crítico.',
  },
  {
    modelName: 'V-MAX 1200',
    yearFrom: 1992, yearTo: 2001,
    tireSize: '110/90V18 (F) · 150/90B15 (R)',
    frontPsi: 25, rearPsi: 29, frontPsiLoad: 25, rearPsiLoad: 33,
    notes: '"Muscle bike" lendária, V4 DOHC líquido-refrigerado com cardã. Embreagem de partida e retificador são as falhas mais documentadas — testar antes de comprar usada.',
  },
  {
    modelName: 'V-MAX 1700',
    yearFrom: 2014, yearTo: 2015,
    tireSize: '120/70R18 (F) · 200/50R18 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Import oficial Yamaha do Brasil, ~R$99.000 em 2014. Combo de pneus muito mais largo que o V-Max 1200 — verificar calibragem com atenção redobrada (200+ cv).',
  },
]

// ─── Manutenção ──────────────────────────────────────────────────────────────

const make750Virago = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 20W-40 API SE (3,6 L com filtro)', intervalKm: 3000, intervalMonths: 6, notes: 'Intervalo mais curto que o original de fábrica é recomendado dado a idade do motor (40+ anos).', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Válvulas (parafuso/contraporca — sem shim): adm 0,10 mm / esc 0,15 mm', intervalKm: 6000, intervalMonths: 12, notes: 'Motor frio. Mais simples que a XV535 (sem shim).', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Carburador Mikuni — revisão completa se ficou parado', intervalKm: null, intervalMonths: 12, notes: 'Kit de reparo completo (jatos, agulha, o-rings, diafragma) se a moto ficou parada por período longo. Etanol degrada borrachas de 40+ anos.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo do diferencial do eixo cardã (SAE 80W GL-4)', intervalKm: 12000, intervalMonths: 24, notes: 'Item frequentemente esquecido por não ter corrente/correia. Transmissão final shaft drive.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Sistema de carga (estator/retificador) — teste de tensão', intervalKm: null, intervalMonths: 6, notes: '13,5-14,5 V em regime esperado. Ponto fraco documentado em toda a família Virago em unidades de 30-40+ anos.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pneus — verificação de idade da borracha', intervalKm: null, intervalMonths: 12, notes: 'Moto de colecionador de baixa quilometragem anual — borracha endurece com o tempo mesmo com sulco aparente.', priority: 'MEDIUM', order: 6 },
]

const makeXV1100 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo (3,1 L com filtro)', intervalKm: 3000, intervalMonths: 6, notes: 'Intervalo mais curto que o original, dado a idade das unidades hoje.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Válvulas (parafuso/contraporca — sem shim)', intervalKm: 12000, intervalMonths: 12, notes: 'Verificação inicial aos 1.000 km. Motor frio.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK BPR7ES / DENSO W22EPR-U (gap 0,7-0,8 mm)', intervalKm: 9000, intervalMonths: 12, notes: 'Verificar a cada revisão em motor de alta idade.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Carburação dupla Mikuni — sincronismo e limpeza', intervalKm: 12000, intervalMonths: 12, notes: 'Preventivo se ficou parada >1 mês. Etanol + borrachas antigas = entupimento.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo do diferencial do eixo cardã (SAE 80W GL-4)', intervalKm: 11000, intervalMonths: 24, notes: 'Atraso nesta troca é a causa mais citada de desgaste de estrias/junta universal nesta moto (maior torque que a 750/535).', priority: 'CRITICAL', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Sistema de carga (estator/retificador) — teste', intervalKm: null, intervalMonths: 6, notes: '13,5-14,5 V em regime. Ponto fraco documentado em unidades de 25-35+ anos.', priority: 'HIGH', order: 6 },
]

const makeXV535 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40 API SE (2,8 L)', intervalKm: 3000, intervalMonths: 6, notes: 'Motor 535cc, o menor da família Virago clássica.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Válvulas SHIM-UNDER-BUCKET: adm 0,07-0,12 mm / esc 0,12-0,17 mm', intervalKm: 8000, intervalMonths: 12, notes: 'Diferente da 750/1100 (parafuso). Exige pastilhas calibradas — procure especialista.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Carburação dupla Mikuni BDS34 — sincronismo/limpeza', intervalKm: 10000, intervalMonths: 12, notes: 'Parafuso de ar ref. ~2,5 voltas. Etanol em uso esporádico gomeia jatos.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo do diferencial do eixo cardã (190 ml SAE 80W GL-4)', intervalKm: 12000, intervalMonths: 24, notes: 'Cardã raro nesta categoria de cilindrada — não esquecer, "sem corrente" não é "sem manutenção".', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Sistema de carga (estator/retificador) — teste', intervalKm: null, intervalMonths: 6, notes: '13,5-14,5 V em regime. Unidades de 20-30 anos.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente/tensor de comando — inspeção de ruído a frio', intervalKm: null, intervalMonths: 12, notes: 'Verificar ruído de partida a frio a cada revisão.', priority: 'MEDIUM', order: 6 },
]

const makeDragStar650 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo API SG JASO MA 10W-40/20W-50 (~2,7-2,9 L com filtro)', intervalKm: 3500, intervalMonths: 6, notes: '10W-40 clima ameno, 20W-50 clima quente.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK DPR7EA-9', intervalKm: 9000, intervalMonths: 12, notes: 'Carburador único Mikuni 28mm (diferente da XV535, que tem 2 carburadores).', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Carburador Mikuni 28mm — limpeza/sincronismo', intervalKm: 11000, intervalMonths: 12, notes: 'Preventivo se ficou parada >2-3 semanas com etanol no tanque.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Válvulas — verificação de folga', intervalKm: 12000, intervalMonths: 12, notes: 'Motor SOHC 2V.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo do diferencial do eixo cardã (SAE 80 GL-4)', intervalKm: 13000, intervalMonths: 24, notes: 'Marketing da época chamava de "maintenance-free" — mas óleo do cardã ainda precisa de troca.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Sistema de carga (estator/retificador) — teste', intervalKm: 20000, intervalMonths: null, notes: 'Falha elétrica é o problema documentado MAIS RECORRENTE da linha, principalmente >60.000-70.000 km ou após armazenamento longo. Corrosão de conectores em clima úmido (litoral).', priority: 'CRITICAL', order: 6 },
]

const makeDragStar1100 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo (3,0 L)', intervalKm: 3500, intervalMonths: 6, notes: 'Versão atualizada do motor da Virago 1100.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Válvulas — verificação de folga', intervalKm: 6000, intervalMonths: 6, notes: 'Intervalo mais CURTO que a Virago 1100 (12.000 km) — não confundir os cronogramas.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK BPR7ES / DENSO W22EPR-U', intervalKm: 9000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Carburador — limpeza/sincronismo', intervalKm: 11000, intervalMonths: 12, notes: 'Drenar cuba antes de guardar por período longo.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo do diferencial do eixo cardã (SAE 80 GL-4)', intervalKm: 13000, intervalMonths: 24, notes: 'CRÍTICO: atraso é a causa mais citada de desgaste do cubo/eixo intermediário/garfo de câmbio — principal ponto de desgaste de longo prazo desta moto.', priority: 'CRITICAL', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Sistema de carga (estator/retificador) — teste', intervalKm: 20000, intervalMonths: null, notes: 'Mesma vulnerabilidade elétrica da família Virago/Star.', priority: 'HIGH', order: 6 },
]

const makeMidnightStar950 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo (3,7 L sem filtro / 4,0 L com filtro)', intervalKm: 5000, intervalMonths: 9, notes: 'Motor 4V SOHC, mais moderno que o resto da família.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Correia de transmissão (belt drive) — verificação de tensão e desgaste', intervalKm: 8000, intervalMonths: 12, notes: 'ÚNICO modelo desta família com correia, não cardã. Folga alvo 6-8 mm com força de 45N. Inspecionar rachaduras/desgaste de borda.', priority: 'CRITICAL', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Válvulas (parafuso tipo balancim) — verificação de folga', intervalKm: 12000, intervalMonths: 12, notes: 'Motor 4V ainda exige ajuste manual — não é comando hidráulico.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Injeção eletrônica — inspeção de conectores do chicote', intervalKm: null, intervalMonths: 12, notes: 'Corrosão em clima úmido/litorâneo. Sem carburador para limpar — ponto de atenção é elétrico, não mecânico-combustível.', priority: 'MEDIUM', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela — verificação de gap', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'MEDIUM', order: 5 },
]

const makeRoyalStar1300 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40 (3,7 L)', intervalKm: 6000, intervalMonths: 12, notes: 'Motor V4 líquido-refrigerado.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Válvulas: adm 0,11-0,15 mm / esc 0,16-0,20 mm', intervalKm: 10000, intervalMonths: 12, notes: 'Motor frio.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Sincronismo dos 4 carburadores Mikuni 32mm', intervalKm: 12000, intervalMonths: 12, notes: 'CRÍTICO: problema nº1 documentado. Exige manômetros de vácuo — só oficina especializada em Yamaha V4.', priority: 'CRITICAL', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo do diferencial do eixo cardã (200 ml SAE 80 GL-4)', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Sistema de arrefecimento líquido — nível, mangueiras, radiador', intervalKm: null, intervalMonths: 12, notes: 'Único da família (além dos V-Max) com radiador — item fácil de esquecer para mecânico acostumado só com moto a ar.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Troca do líquido de arrefecimento', intervalKm: null, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Sistema de carga (estator/pickup/módulo de ignição) — teste', intervalKm: 18000, intervalMonths: null, notes: 'Unidades de 25-30+ anos. Peças elétricas com disponibilidade limitada (sem venda oficial confirmada no Brasil).', priority: 'HIGH', order: 7 },
]

const makeVMax1200 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40 (3,5 L sem filtro / 3,8 L com filtro)', intervalKm: 4500, intervalMonths: 9, notes: 'Motor V4 DOHC líquido-refrigerado.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK DPR8EA-9 / iridium DPR8EIX-9 (gap 0,8-0,9 mm)', intervalKm: 9000, intervalMonths: 12, notes: null, priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Válvulas (shim): adm 0,11-0,15 mm / esc 0,26-0,30 mm', intervalKm: 13000, intervalMonths: 18, notes: 'Serviço para especialista em V4 DOHC — acesso apertado, não é job de garagem.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Carburação (4x Mikuni 35mm + V-Boost) — sincronismo e limpeza do bloco de jato', intervalKm: 11000, intervalMonths: 12, notes: 'Bloco de jato dentro da cuba é frequentemente esquecido na revisão.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Sistema de arrefecimento líquido — nível, mangueiras, radiador', intervalKm: null, intervalMonths: 12, notes: null, priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo do diferencial do eixo cardã', intervalKm: 15000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Sistema de carga — teste de estator (0,038-0,045 ohms) e retificador (60-65V)', intervalKm: 17000, intervalMonths: null, notes: 'Retificador é a causa de ~95% das falhas de sistema de carga segundo a comunidade especializada.', priority: 'CRITICAL', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Embreagem de partida (starter clutch) — teste de partida a frio', intervalKm: null, intervalMonths: 12, notes: 'Falha "lendária" e muito documentada — motor de arranque gira mas não engata. Testar antes de comprar usada.', priority: 'CRITICAL', order: 8 },
]

const makeVMax1700 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo (4,7 L com filtro)', intervalKm: 6000, intervalMonths: 12, notes: 'Motor V4 DOHC injetado, mais moderno da família.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Válvulas (shim, ferramenta YM-33961): adm 0,10-0,17 mm / esc 0,22-0,29 mm', intervalKm: 40000, intervalMonths: null, notes: 'Intervalo bem mais longo que o V-Max 1200 (13.000 km). Só especialista/concessionária.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Sistemas eletrônicos YCC-T/YCC-I — diagnóstico e calibração', intervalKm: null, intervalMonths: 12, notes: 'Exige scanner/ferramenta proprietária Yamaha — só concessionária ou oficina especializada em importados.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo do diferencial do eixo cardã (300 ml)', intervalKm: null, intervalMonths: 24, notes: 'Embreagem de rampa hidráulica (anti-hopping) integrada.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Sistema de arrefecimento líquido — nível, mangueiras, radiador', intervalKm: null, intervalMonths: 12, notes: null, priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Troca do líquido de arrefecimento', intervalKm: null, intervalMonths: 24, notes: null, priority: 'MEDIUM', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pneus — calibragem e desgaste (combo largo 120/70-18 · 200/50-18)', intervalKm: null, intervalMonths: 3, notes: 'Atenção redobrada por ser moto de mais de 200 cv.', priority: 'HIGH', order: 7 },
]

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS = [
  { modelName: '750 VIRAGO',            yearFrom: 1993, yearTo: 1997, MACETES: V750_MACETES,             PROBLEMAS: V750_PROBLEMAS,             MANUTENCAO: V750_MANUTENCAO },
  { modelName: 'XV 1100 VIRAGO',        yearFrom: 1992, yearTo: 1998, MACETES: XV1100_MACETES,           PROBLEMAS: XV1100_PROBLEMAS,           MANUTENCAO: XV1100_MANUTENCAO },
  { modelName: 'XV 535 S VIRAGO',       yearFrom: 1994, yearTo: 2002, MACETES: XV535_MACETES,            PROBLEMAS: XV535_PROBLEMAS,            MANUTENCAO: XV535_MANUTENCAO },
  { modelName: 'XVS 650 DRAG STAR',     yearFrom: 1997, yearTo: 2008, MACETES: DRAGSTAR650_MACETES,      PROBLEMAS: DRAGSTAR650_PROBLEMAS,      MANUTENCAO: DRAGSTAR650_MANUTENCAO },
  { modelName: 'XVS 1100 DRAG STAR',    yearFrom: 2000, yearTo: 2008, MACETES: DRAGSTAR1100_MACETES,     PROBLEMAS: DRAGSTAR1100_PROBLEMAS,     MANUTENCAO: DRAGSTAR1100_MANUTENCAO },
  { modelName: 'XVS 950 MIDNIGHT STAR', yearFrom: 2009, yearTo: 2016, MACETES: MIDNIGHTSTAR950_MACETES,  PROBLEMAS: MIDNIGHTSTAR950_PROBLEMAS,  MANUTENCAO: MIDNIGHTSTAR950_MANUTENCAO },
  { modelName: 'ROYAL STAR 1300',       yearFrom: 1996, yearTo: 2000, MACETES: ROYALSTAR1300_MACETES,    PROBLEMAS: ROYALSTAR1300_PROBLEMAS,    MANUTENCAO: ROYALSTAR1300_MANUTENCAO },
  { modelName: 'V-MAX 1200',            yearFrom: 1992, yearTo: 2001, MACETES: VMAX1200_MACETES,         PROBLEMAS: VMAX1200_PROBLEMAS,         MANUTENCAO: VMAX1200_MANUTENCAO },
  { modelName: 'V-MAX 1700',            yearFrom: 2014, yearTo: 2015, MACETES: VMAX1700_MACETES,         PROBLEMAS: VMAX1700_PROBLEMAS,         MANUTENCAO: VMAX1700_MANUTENCAO },
]

const ALL_MANUTENCAO: MaintenanceItemInput[] = [
  ...make750Virago('750 VIRAGO', 1993, 1997),
  ...makeXV1100('XV 1100 VIRAGO', 1992, 1998),
  ...makeXV535('XV 535 S VIRAGO', 1994, 2002),
  ...makeDragStar650('XVS 650 DRAG STAR', 1997, 2008),
  ...makeDragStar1100('XVS 1100 DRAG STAR', 2000, 2008),
  ...makeMidnightStar950('XVS 950 MIDNIGHT STAR', 2009, 2016),
  ...makeRoyalStar1300('ROYAL STAR 1300', 1996, 2000),
  ...makeVMax1200('V-MAX 1200', 1992, 2001),
  ...makeVMax1700('V-MAX 1700', 2014, 2015),
]

// ─── Runner ───────────────────────────────────────────────────────────────────

async function main() {
  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })

  await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Yamaha', vehicleTypeId: motoType.id } },
    update: {}, create: { name: 'Yamaha', vehicleTypeId: motoType.id },
  })

  const brand = await prisma.brand.findFirstOrThrow({
    where: { name: 'Yamaha', vehicleTypeId: motoType.id },
  })

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {}, create: { name: block.modelName, brandId: brand.id },
    })

    const allTips = [
      ...block.MACETES.map(t => ({ ...t, category: 'MACETES' as Cat })),
      ...block.PROBLEMAS.map(t => ({ ...t, category: 'PROBLEMAS' as Cat })),
      ...block.MANUTENCAO.map(t => ({ ...t, category: 'MANUTENCAO' as Cat })),
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
