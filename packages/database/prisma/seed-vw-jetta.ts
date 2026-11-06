/**
 * Seed Volkswagen Jetta — macetes, problemas, manutenção e calibragem
 * Sedã médio da VW no Brasil em seis fases bem distintas: (1) Jetta III
 * GLX 2.8 VR6 — importação de baixíssimo volume, 1994-1995, item raro de
 * colecionador; (2) Jetta 2.5 20V 150/170cv (5 cilindros) + Variant,
 * importado do México (Puebla), câmbio Tiptronic convencional, 2006-2013;
 * (3) Jetta A6/Mk6 2.0 8V T.Flex (Comfortline manual/Tiptronic) e 2.0 TSI
 * (Highline Tiptronic), 2011-2014; (4) restyle com motor 1.4 TSI 150cv
 * (Trendline/Comfortline), 2015-2018; (5) nova geração MQB, motor 250 TSI
 * 1.4 flex com câmbio automático Aisin 6 marchas convencional (não DSG),
 * Comfortline/Highline/R-Line, 2019-2023 (versões comuns saíram de linha
 * em 2023); (6) Jetta GLI 350 TSI 2.0 com câmbio DSG de dupla embreagem,
 * 2019-atual — único Jetta ainda vendido 0km no Brasil.
 * Execute: pnpm --filter @motormacete/database db:seed:vw-jetta
 *
 * Fontes: car.blog.br, brasal.com.br, despachantedok.com.br,
 *         motoragora.com.br, reclameaqui.com.br, carroclub.com.br,
 *         oficinabrasil.com.br, auto-doc.pt, canaldapeca.com.br,
 *         procon.sp.gov.br, justia.com (auto-recalls), mobiauto.com.br,
 *         fcarros.com.br, tabelafipebrasil.com
 */
import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

type Sev = 'OK' | 'WARN' | 'DANGER'
type Cat = 'MACETES' | 'PROBLEMAS' | 'MANUTENCAO'

interface TipInput { severity: Sev; title: string; body: string }
interface ModelBlock { modelName: string; yearFrom: number | null; yearTo: number | null; MACETES: TipInput[]; PROBLEMAS: TipInput[]; MANUTENCAO: TipInput[] }
interface TirePressureInput { modelName: string; yearFrom: number | null; yearTo: number | null; tireSize: string; frontPsi: number; rearPsi: number; frontPsiLoad: number | null; rearPsiLoad: number | null; sparePsi: number | null; notes: string | null }
interface MaintenanceItemInput { modelName: string; yearFrom: number | null; yearTo: number | null; component: string; intervalKm: number | null; intervalMonths: number | null; notes: string | null; priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'; order: number }

// ---------- JETTA III GLX 2.8 VR6 (1994-1995) — importação de baixo volume ----------

const MACETES_VR6: TipInput[] = [
  { severity: 'OK', title: 'Importação de baixíssimo volume — item raro de colecionador', body: 'O Jetta GLX III 2.8 VR6 foi trazido ao Brasil em quantidade muito pequena em 1994-1995, bem antes do Jetta virar modelo "de linha" nacional (isso só aconteceria em 2006). Hoje é praticamente item de colecionador — antes de comprar, confirme documentação e procedência com atenção redobrada.' },
  { severity: 'OK', title: 'Motor VR6 12V compartilhado com Golf/Passat/Corrado da mesma família VW', body: 'O bloco V6 de 2.8 (174cv) usado nesse Jetta é o mesmo motor VR6 usado em outros modelos VW do período, como Golf VR6, Passat e Corrado. Peça de motor não encontrada catalogada como "Jetta" às vezes aparece catalogada por esses modelos irmãos.' },
  { severity: 'OK', title: 'Câmbio manual — sem os cuidados específicos de automático', body: 'A versão vendida no Brasil veio com câmbio manual. Os cuidados de manutenção seguem o padrão de qualquer manual da época: troca de óleo do câmbio bem mais espaçada que a do motor, e atenção ao desgaste do kit de embreagem em uso urbano.' },
]

const PROBLEMAS_VR6: TipInput[] = [
  { severity: 'WARN', title: 'Peças de reposição raras e caras — planeje com antecedência', body: 'Por ser um modelo importado em volume mínimo, peças específicas (itens de acabamento, elétrica) são raras no mercado nacional e muitas vezes precisam ser importadas ou adaptadas de outros modelos VR6. Clubes de marca e fóruns de entusiastas costumam ser o melhor caminho para localizar peça original.' },
  { severity: 'DANGER', title: 'Correia dentada ressecada pela idade, mesmo com pouca quilometragem rodada', body: 'O motor VR6 12V é interferente (correia dentada comanda os cabeçotes) e usa correia de borracha para o comando de válvulas. Em unidades de 30 anos, o risco não é só a quilometragem — a borracha resseca e perde propriedades com o tempo, mesmo em carros pouco rodados. Troque o kit completo (correia + tensores + bomba d\'água) por prazo, não só por km, se não houver comprovação recente da troca.' },
]

const MANUTENCAO_VR6: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Jetta GLX III VR6 (1994-1995)', body: '7.500-10.000 km — Troca de óleo do motor + filtro. | 60.000 km ou 5 anos (o que vier primeiro, por ser carro de época) — Kit de correia dentada completo (correia + tensores + bomba d\'água) — motor interferente. | 40.000 km — Fluido de freio. | Revisão de borrachas, mangueiras e coxins do motor por idade, não só por uso — item crítico em carro com 30 anos de fabricação.' },
]

// ---------- JETTA 2.5 20V 150/170cv + Variant (2006-2013) — importado do México ----------

const MACETES_25: TipInput[] = [
  { severity: 'OK', title: 'Motor 2.5 20V de 5 cilindros — reconhecível pelo som característico', body: 'O Jetta relançado no Brasil em 2006 trouxe um motor 2.5 de 5 cilindros em linha (150cv na versão manual, 170cv na Tiptronic), incomum no mercado nacional. O som do motor de 5 cilindros é característico — se notar ruído diferente do esperado, compare com outra unidade antes de assumir defeito.' },
  { severity: 'OK', title: 'Câmbio Tiptronic sequencial de 6 marchas — automático convencional, não DSG', body: 'A versão automática usa câmbio Tiptronic convencional de 6 marchas (conversor de torque), não o DSG de dupla embreagem usado em versões mais recentes da VW. Não precisa dos cuidados especiais do DSG (evitar ficar parado engatado), mas siga o intervalo de troca de fluido do câmbio à risca.' },
  { severity: 'OK', title: 'Importado do México (Puebla) — plataforma A5, irmão do Bora/New Beetle da época', body: 'Essa geração do Jetta era fabricada na planta da VW em Puebla, no México, sobre a plataforma A5 (mesma base do New Beetle e próxima ao Bora que ele substituiu no Brasil). Peça mecânica desses modelos irmãos pode ajudar a resolver dúvida de compatibilidade.' },
  { severity: 'OK', title: 'Jetta Variant (perua) seguiu à venda além do sedã', body: 'A versão Variant (perua) desse Jetta seguiu sendo vendida por mais tempo que o sedã equivalente, com a mesma base mecânica (motor 2.5 20V e câmbio Tiptronic). Ao procurar peça, tanto sedã quanto Variant desse período costumam ser compatíveis na maior parte da mecânica.' },
]

const PROBLEMAS_25: TipInput[] = [
  { severity: 'WARN', title: 'Bobinas de ignição individuais ("caneta") com falha frequente', body: 'O motor 2.5 20V usa 5 bobinas de ignição individuais tipo "caneta" (uma por cilindro), e é um dos itens mais citados em relatos de falha — motor falhando, marcha lenta irregular ou luz de injeção acesa intermitente. Ao sentir esses sintomas, peça teste individual das bobinas antes de outros diagnósticos mais caros.' },
  { severity: 'DANGER', title: 'Recall real: módulo ABS pode falhar durante frenagem (verifique pelo chassi)', body: 'A Volkswagen do Brasil convocou o Jetta ano-modelo 2008 a 2010 (chassis 8M068431 a AM137661) e o Jetta Variant ano-modelo 2008 a 2010 (chassis 8M252222 a AM695965) para atualização de software do módulo ABS — ou substituição do módulo, se necessário — após identificar falha do sistema durante sua ativação, com perda da função antitravamento e/ou do controle eletrônico de estabilidade. Reparo gratuito na concessionária. Se sua unidade está nessa faixa de chassi, confirme se o recall já foi feito.' },
  { severity: 'WARN', title: 'Vazamentos de óleo pela tampa de válvulas e/ou cárter', body: 'É comum encontrar vazamento de óleo pela junta da tampa de válvulas ou do cárter em unidades mais rodadas. Não costuma ser grave se identificado cedo, mas fique de olho em manchas de óleo embaixo do carro e no nível entre trocas.' },
  { severity: 'WARN', title: 'Câmbio Tiptronic: engates irregulares e conserto caro em caso de falha maior', body: 'Há relatos de engatamento irregular e vazamento de óleo no câmbio Tiptronic. O reparo de uma falha maior nesse câmbio é caro — a melhor prevenção é não atrasar a troca do fluido e procurar oficina especializada em automáticos ao primeiro sinal de tranco.' },
]

const MANUTENCAO_25: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Jetta 2.5 20V / Variant (2006-2013)', body: '10.000 km/12 meses — Troca de óleo do motor 2.5 20V + filtro. | 10.000 km — Inspeção de freios, suspensão e níveis de fluido. | 20.000 km — Filtro de ar do motor e filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | 60.000 km — Fluido do câmbio Tiptronic — não atrasar. | Testar bobinas de ignição individualmente ao primeiro sinal de falha ou marcha lenta irregular.' },
  { severity: 'DANGER', title: 'Confirmar recall do módulo ABS pelo chassi', body: 'Antes de qualquer coisa, confirme no site da Volkswagen do Brasil ou em uma concessionária se o recall do módulo ABS (Jetta e Jetta Variant, ano-modelo 2008-2010) já foi realizado na sua unidade — é gratuito e trata de item de segurança (freios/ESC).' },
]

// ---------- JETTA A6/Mk6 2.0 8V T.Flex + 2.0 TSI Highline (2011-2014) ----------

const MACETES_20: TipInput[] = [
  { severity: 'OK', title: 'Duas motorizações bem diferentes: 2.0 8V aspirado e 2.0 TSI turbo — confirme qual é a sua', body: 'Essa geração trouxe o motor 2.0 8V T.Flex aspirado (Comfortline, manual ou Tiptronic) e, na versão Highline, o 2.0 TSI turbo com Tiptronic (211cv). São motores com necessidades de manutenção bem diferentes — confirme sempre qual equipa sua unidade antes de comprar peça ou fazer revisão.' },
  { severity: 'OK', title: 'Câmbio Tiptronic de 6 marchas — automático convencional, não DSG', body: 'Assim como a geração anterior, o câmbio automático dessa fase é o Tiptronic convencional de 6 marchas (conversor de torque), não o DSG de dupla embreagem.' },
  { severity: 'OK', title: 'Plataforma compartilhada com Golf e New Beetle do período', body: 'Essa geração do Jetta divide boa parte da plataforma e mecânica com o Golf e o New Beetle vendidos no Brasil na mesma época — útil na hora de comparar peça ou buscar equivalência em oficina.' },
]

const PROBLEMAS_20: TipInput[] = [
  { severity: 'WARN', title: 'Bobinas de ignição com falha recorrente — luz de injeção acesa', body: 'Assim como na geração anterior, as bobinas de ignição individuais aparecem com frequência entre as reclamações — luz de injeção acesa (às vezes intermitente, aparecendo desde poucos milhares de km até depois dos 100.000 km) costuma apontar para esse item.' },
  { severity: 'WARN', title: 'Travas elétricas com mau funcionamento relatado por proprietários', body: 'Há relatos recorrentes de mau funcionamento das travas elétricas nessa geração. Se notar travamento incompleto ou travas que não respondem ao controle, vale investigar o módulo de conforto antes de trocar peça por peça.' },
  { severity: 'WARN', title: 'Câmbio Tiptronic: vazamentos de óleo e engatamento irregular', body: 'Repete-se o padrão de vazamento de óleo e engate irregular no câmbio Tiptronic. Conserto de falha maior é caro — não atrase a troca de fluido e procure oficina especializada em automáticos ao primeiro sinal de tranco.' },
  { severity: 'DANGER', title: 'Recall real: mola espiral do airbag do motorista (ano-modelo 2011-2014)', body: 'A Volkswagen do Brasil convocou Jetta e Jetta Variant ano-modelo 2011 a 2014 (junto com Tiguan, Passat, Passat Variant, CC e EOS — total de 54.179 veículos, campanha iniciada em setembro de 2015) por risco de ruptura do cabo espiral ("clock spring") do airbag frontal do motorista, causada por entrada de impurezas como fios de cabelo ou tecido. A ruptura provoca perda de conexão elétrica e o airbag pode não acionar em uma colisão. Confirme pelo chassi se sua unidade foi convocada — reparo gratuito.' },
]

const MANUTENCAO_20: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Jetta 2.0 8V / 2.0 TSI (2011-2014)', body: '10.000 km/12 meses — Troca de óleo do motor (2.0 8V ou 2.0 TSI, conforme a versão) + filtro. | 10.000 km — Inspeção de freios, suspensão e travas elétricas. | 20.000 km — Filtro de ar do motor e filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento e fluido do câmbio Tiptronic. | Testar bobinas individualmente ao primeiro sinal de falha.' },
  { severity: 'DANGER', title: 'Confirmar recall da mola espiral do airbag pelo chassi', body: 'Verifique no site da Volkswagen do Brasil ou em concessionária se sua unidade (ano-modelo 2011-2014) está na campanha de recall do cabo espiral do airbag do motorista — reparo gratuito e trata de item de segurança.' },
]

// ---------- RESTYLE 1.4 TSI — Trendline/Comfortline (2015-2018) ----------

const MACETES_14TSI: TipInput[] = [
  { severity: 'OK', title: 'Troca de motor: 2.0 aspirado deu lugar ao 1.4 TSI turbo (150cv)', body: 'O restyle de 2015 trouxe a troca do motor 2.0 8V aspirado pelo 1.4 TSI turbo flex (150cv), buscando mais economia com potência parecida. É um motor bem diferente do anterior — downsizing com turbo, mais sensível à qualidade do combustível e à troca de óleo em dia.' },
  { severity: 'OK', title: 'Câmbio automático Tiptronic de 6 marchas — ainda não é DSG', body: 'Nessa fase o câmbio automático continuou sendo o Tiptronic convencional de 6 marchas (conversor de torque), não o DSG de dupla embreagem — isso só mudaria na geração seguinte (GLI 350 TSI).' },
  { severity: 'OK', title: 'Motor 1.4 TSI compartilhado com Golf, Fox e Virtus da época', body: 'O 1.4 TSI 150cv dessa fase é o mesmo usado em outros modelos VW do período, como Golf, Fox e Virtus. Peça de motor desses modelos irmãos costuma ser equivalente.' },
]

const PROBLEMAS_14TSI: TipInput[] = [
  { severity: 'WARN', title: 'Problemas relatados na mecatrônica do câmbio automático', body: 'Há relatos de problemas na mecatrônica do câmbio automático em unidades 1.4 TSI, incluindo indicação de marcha sumindo do painel e trancos ao engatar D ou R. Se notar esses sintomas, procure diagnóstico específico da mecatrônica antes de assumir reparo maior no câmbio.' },
  { severity: 'WARN', title: 'Indicação de marcha e luzes do painel com comportamento instável', body: 'Proprietários relataram o display de marcha engatada desaparecendo do painel e luzes de alerta (como check engine) acendendo sem padrão claro. Vale registrar o comportamento exato (quando acontece, em que velocidade/temperatura) para facilitar o diagnóstico na concessionária.' },
  { severity: 'WARN', title: 'Relatos de superaquecimento do motor em algumas unidades', body: 'Alguns donos relataram temperatura do motor subindo mais que o esperado (próxima de 90°C) mesmo após manutenção. Fique atento ao marcador de temperatura e não ignore luz de alerta — pode envolver desde termostato até vazamento no sistema de arrefecimento.' },
]

const MANUTENCAO_14TSI: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Jetta 1.4 TSI Trendline/Comfortline (2015-2018)', body: '10.000 km/12 meses — Troca de óleo do motor 1.4 TSI (especificação exata do manual) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e sistema de arrefecimento. | 20.000 km — Filtro de ar do motor e filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento e fluido do câmbio Tiptronic (versões automáticas). | Atenção a trancos ou marcha sumindo do painel — sintoma de mecatrônica, reporte cedo.' },
]

// ---------- NOVA GERAÇÃO MQB — 250 TSI 1.4, Comfortline/Highline/R-Line (2019-2023) ----------

const MACETES_250TSI: TipInput[] = [
  { severity: 'OK', title: 'Câmbio automático Aisin de 6 marchas convencional, não DSG', body: 'A nova geração do Jetta (plataforma MQB) trocou o DSG de dupla embreagem por um câmbio automático convencional Aisin de 6 marchas nas versões 250 TSI (Comfortline, Highline, R-Line). Não exige os cuidados específicos do DSG, como evitar ficar parado engatado com o pé no freio.' },
  { severity: 'OK', title: 'Motor 1.4 TSI 250 flex compartilhado com Virtus, T-Cross, Nivus e Taos', body: 'O motor 1.4 TSI 250 (150cv) dessa geração é o mesmo usado em vários outros modelos VW da plataforma MQB no Brasil — Virtus, T-Cross, Nivus e Taos. Peça e conhecimento técnico desses modelos irmãos costumam ajudar quando o cadastro específico do Jetta ainda não existir na loja.' },
  { severity: 'OK', title: 'Três níveis de acabamento: Comfortline, Highline e R-Line', body: 'Essa geração foi vendida em Comfortline (entrada), Highline (topo de linha "normal") e R-Line (visual esportivo, ainda com o motor 1.4 TSI, diferente do GLI que usa motor maior). Confirme a versão exata antes de procurar peça de acabamento ou suspensão específica.' },
  { severity: 'WARN', title: 'A partir de 2023/2024, só o GLI seguiu à venda 0km no Brasil', body: 'As versões Comfortline, Highline e R-Line com motor 1.4 TSI saíram de linha no Brasil a partir de 2023/2024 — desde então, só o Jetta GLI 350 TSI segue sendo vendido novo. Se está comprando uma unidade dessas versões, já são só modelos usados/seminovos.' },
]

const PROBLEMAS_250TSI: TipInput[] = [
  { severity: 'WARN', title: 'Consumo excessivo de óleo relatado por proprietários', body: 'Há vários relatos de consumo de óleo do motor 1.4 TSI acima do esperado, com o nível caindo de forma perceptível entre trocas. Verifique o nível de óleo periodicamente (não só na revisão) e, se precisar completar antes do intervalo normal, registre o padrão para levar à concessionária.' },
  { severity: 'WARN', title: 'Vazamentos de óleo e da bomba d\'água entre as queixas mais citadas', body: 'Vazamento de óleo do motor e da bomba d\'água aparecem entre os problemas mais citados por donos dessa geração. Manchas de óleo embaixo do carro ou queda de nível do fluido de arrefecimento merecem inspeção antes que o problema evolua.' },
  { severity: 'WARN', title: 'Falhas em bobinas de ignição e sensores de injeção', body: 'Falhas intermitentes em bobinas de ignição e no sistema de injeção seguem entre as queixas, muitas vezes exigindo diagnóstico com osciloscópio para identificar a bobina exata com defeito antes de trocar o conjunto todo.' },
  { severity: 'WARN', title: 'Demora na reposição de peças — modelo importado do México', body: 'O Jetta é importado do México, e há relatos de demora na chegada de peças de reposição em caso de reparo em garantia, deixando o carro parado por semanas. Ao abrir um chamado de garantia, pergunte o prazo estimado da peça antes de deixar o carro na concessionária.' },
]

const MANUTENCAO_250TSI: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Jetta 250 TSI 1.4 (2019-2023)', body: '10.000 km/12 meses — Troca de óleo do motor 1.4 TSI (especificação exata do manual) + filtro de óleo. | 10.000 km — Inspeção de freios, suspensão e nível de óleo (atenção ao consumo relatado). | 20.000 km — Filtro de ar do motor. | 20.000 km — Filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento — atenção a vazamento na bomba d\'água. | 60.000-80.000 km — Óleo do câmbio automático Aisin.' },
  { severity: 'WARN', title: 'Monitore o nível de óleo entre as trocas', body: 'Dado o histórico de relatos de consumo de óleo acima do normal nesse motor, verifique o nível manualmente a cada dois ou três abastecimentos, não só na revisão programada.' },
]

// ---------- JETTA GLI 350 TSI 2.0 — câmbio DSG (2019-atual) ----------

const MACETES_GLI: TipInput[] = [
  { severity: 'OK', title: 'Único Jetta com motor 2.0 turbo (350 TSI, família EA888) e câmbio DSG', body: 'O GLI é a versão esportiva de topo, com motor 2.0 turbo 350 TSI (família EA888, cerca de 230cv) e câmbio DSG de dupla embreagem de 6 marchas — mecânica bem diferente das demais versões do Jetta, que usam motor 1.4 e câmbio automático convencional.' },
  { severity: 'WARN', title: 'Câmbio DSG: evite ficar parado engatado com o pé no freio', body: 'Por ser um câmbio de dupla embreagem, evite manter o carro parado por longos períodos engatado em D com o pé no freio — prefira Neutro/Park em paradas longas (semáforos extensos, filas). Esse cuidado reduz o desgaste do conjunto de embreagens, ponto mais sensível desse câmbio.' },
  { severity: 'OK', title: 'Único Jetta ainda vendido 0km no Brasil desde 2023/2024', body: 'Desde que as demais versões (Comfortline, Highline, R-Line 1.4 TSI) saíram de linha, o GLI 350 TSI é o único Jetta que a Volkswagen segue vendendo novo no Brasil.' },
]

const PROBLEMAS_GLI: TipInput[] = [
  { severity: 'WARN', title: 'Vazamento de óleo crônico — inclusive no diferencial/câmbio', body: 'Há relatos recorrentes e bem documentados de vazamento de óleo crônico em unidades do GLI, em alguns casos reincidindo diversas vezes mesmo após reparo em garantia (troca de retentores). Se identificar vazamento, insista para que a concessionária investigue a causa raiz, não só troque a vedação visível.' },
  { severity: 'WARN', title: 'Câmbio DSG: trancos e modo de emergência relatados', body: 'Como em outros modelos VW com DSG, há relatos de trancos ao engatar e casos de o câmbio entrar em modo de emergência (indicação piscando entre D e um ícone de chave no painel). Se acontecer, peça atualização de software da mecatrônica antes de assumir que é necessário trocar peças.' },
  { severity: 'WARN', title: 'Falhas em bobinas de ignição do motor 2.0 turbo', body: 'Falhas intermitentes em bobinas de ignição também aparecem nos relatos do motor 350 TSI, geralmente identificadas por diagnóstico com osciloscópio quando o sintoma é irregular e difícil de reproduzir na oficina.' },
  { severity: 'WARN', title: 'Demora na reposição de peças — modelo importado do México', body: 'Assim como as demais versões do Jetta, o GLI é importado do México, e proprietários relatam demora na chegada de peças em reparos de garantia. Pergunte o prazo estimado da peça antes de deixar o carro na concessionária.' },
]

const MANUTENCAO_GLI: TipInput[] = [
  { severity: 'OK', title: 'Cronograma Jetta GLI 350 TSI (2019-atual)', body: '10.000 km/12 meses — Troca de óleo do motor 2.0 350 TSI (especificação exata do manual) + filtro de óleo. | 10.000 km — Inspeção de freios (pneus/discos maiores, uso mais esportivo) e vazamentos. | 20.000 km — Filtro de ar do motor e filtro de cabine. | 40.000 km — Fluido de freio DOT 4. | 60.000 km — Fluido de arrefecimento. | 60.000 km — Fluido do câmbio DSG — não atrasar, é o principal cuidado preventivo contra trancos e modo de emergência.' },
  { severity: 'WARN', title: 'Investigar causa raiz em caso de vazamento de óleo', body: 'Dado o padrão de vazamentos recorrentes relatado nessa versão, não aceite apenas a troca da vedação visível — peça para a concessionária investigar e documentar a causa raiz do vazamento antes de considerar o reparo concluído.' },
]

// ---------- Calibragem ----------

const TIRE_PRESSURES: TirePressureInput[] = [
  { modelName: 'Jetta', yearFrom: 1994, yearTo: 1995, tireSize: '195/65 R15 (referência)', frontPsi: 30, rearPsi: 28, frontPsiLoad: 32, rearPsiLoad: 32, sparePsi: 60, notes: 'Carro de época/importação rara — confirme o valor original na etiqueta da coluna da porta ou manual, se disponível.' },
  { modelName: 'Jetta', yearFrom: 2006, yearTo: 2013, tireSize: '205/55 R16 (referência)', frontPsi: 32, rearPsi: 30, frontPsiLoad: 35, rearPsiLoad: 38, sparePsi: 60, notes: 'Sedã e Variant. Confirme sempre o valor exato na etiqueta da coluna da porta do motorista.' },
  { modelName: 'Jetta', yearFrom: 2011, yearTo: 2014, tireSize: '205/55 R16 (Comfortline) · 215/45 R17 (Highline TSI)', frontPsi: 32, rearPsi: 30, frontPsiLoad: 35, rearPsiLoad: 38, sparePsi: 60, notes: 'Confirme sempre o valor exato na etiqueta da coluna da porta do motorista.' },
  { modelName: 'Jetta', yearFrom: 2015, yearTo: 2018, tireSize: '205/55 R16 (referência)', frontPsi: 32, rearPsi: 30, frontPsiLoad: 35, rearPsiLoad: 38, sparePsi: 60, notes: 'Confirme sempre o valor exato na etiqueta da coluna da porta do motorista.' },
  { modelName: 'Jetta', yearFrom: 2019, yearTo: 2023, tireSize: '205/55 R16 (Comfortline) · 215/45 R17 (Highline/R-Line)', frontPsi: 32, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 38, sparePsi: 60, notes: 'Valores de referência alinhados à plataforma MQB compartilhada com Virtus/T-Cross/Nivus/Taos. Confirme sempre o valor exato na etiqueta da coluna da porta do motorista.' },
  { modelName: 'Jetta', yearFrom: 2019, yearTo: null, tireSize: '225/40 R18 (GLI 350 TSI)', frontPsi: 35, rearPsi: 33, frontPsiLoad: 38, rearPsiLoad: 41, sparePsi: 60, notes: 'Versão GLI, pneu mais largo e de perfil mais baixo. Confirme sempre o valor exato na etiqueta da coluna da porta do motorista.' },
]

// ---------- Manutenção ----------

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  { modelName: 'Jetta', yearFrom: 1994, yearTo: 1995, component: 'Óleo do motor + filtro', intervalKm: 7500, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 0 },
  { modelName: 'Jetta', yearFrom: 1994, yearTo: 1995, component: 'Kit de correia dentada completo (correia + tensores + bomba d\'água)', intervalKm: 60000, intervalMonths: 60, notes: 'Motor VR6 interferente — priorize a troca por idade, não só por km, em carro de 30 anos.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Jetta', yearFrom: 1994, yearTo: 1995, component: 'Fluido de freio', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 2 },

  { modelName: 'Jetta', yearFrom: 2006, yearTo: 2013, component: 'Óleo do motor 2.5 20V + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 3 },
  { modelName: 'Jetta', yearFrom: 2006, yearTo: 2013, component: 'Fluido do câmbio Tiptronic', intervalKm: 60000, intervalMonths: 48, notes: 'Não atrasar — conserto de falha maior é caro.', priority: 'HIGH', order: 4 },
  { modelName: 'Jetta', yearFrom: 2006, yearTo: 2013, component: 'Verificação do recall do módulo ABS (chassi 2008-2010)', intervalKm: null, intervalMonths: null, notes: 'Confirme pelo chassi na Volkswagen do Brasil — reparo gratuito, item de segurança.', priority: 'CRITICAL', order: 5 },
  { modelName: 'Jetta', yearFrom: 2006, yearTo: 2013, component: 'Bobinas de ignição — teste individual ao 1º sinal de falha', intervalKm: null, intervalMonths: null, notes: 'Item de falha frequente nesse motor 5 cilindros.', priority: 'MEDIUM', order: 6 },
  { modelName: 'Jetta', yearFrom: 2006, yearTo: 2013, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 7 },

  { modelName: 'Jetta', yearFrom: 2011, yearTo: 2014, component: 'Óleo do motor (2.0 8V ou 2.0 TSI) + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Confirme especificação exata conforme motor.', priority: 'CRITICAL', order: 8 },
  { modelName: 'Jetta', yearFrom: 2011, yearTo: 2014, component: 'Fluido do câmbio Tiptronic', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 9 },
  { modelName: 'Jetta', yearFrom: 2011, yearTo: 2014, component: 'Verificação do recall da mola espiral do airbag (ano-modelo 2011-2014)', intervalKm: null, intervalMonths: null, notes: 'Confirme pelo chassi na Volkswagen do Brasil — reparo gratuito, item de segurança.', priority: 'CRITICAL', order: 10 },
  { modelName: 'Jetta', yearFrom: 2011, yearTo: 2014, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 11 },

  { modelName: 'Jetta', yearFrom: 2015, yearTo: 2018, component: 'Óleo do motor 1.4 TSI + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 12 },
  { modelName: 'Jetta', yearFrom: 2015, yearTo: 2018, component: 'Fluido do câmbio Tiptronic (versões automáticas)', intervalKm: 60000, intervalMonths: 48, notes: 'Atenção a trancos ou marcha sumindo do painel — sinal de mecatrônica.', priority: 'HIGH', order: 13 },
  { modelName: 'Jetta', yearFrom: 2015, yearTo: 2018, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 14 },

  { modelName: 'Jetta', yearFrom: 2019, yearTo: 2023, component: 'Óleo do motor 1.4 TSI 250 + filtro', intervalKm: 10000, intervalMonths: 12, notes: 'Monitore o nível entre trocas — relatos de consumo acima do normal.', priority: 'CRITICAL', order: 15 },
  { modelName: 'Jetta', yearFrom: 2019, yearTo: 2023, component: 'Óleo do câmbio automático Aisin', intervalKm: 60000, intervalMonths: 48, notes: null, priority: 'HIGH', order: 16 },
  { modelName: 'Jetta', yearFrom: 2019, yearTo: 2023, component: 'Fluido de freio DOT 4', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 17 },
  { modelName: 'Jetta', yearFrom: 2019, yearTo: 2023, component: 'Fluido de arrefecimento', intervalKm: 60000, intervalMonths: 60, notes: 'Atenção a vazamento na bomba d\'água — item citado com frequência.', priority: 'HIGH', order: 18 },

  { modelName: 'Jetta', yearFrom: 2019, yearTo: null, component: 'Óleo do motor 2.0 350 TSI (GLI) + filtro', intervalKm: 10000, intervalMonths: 12, notes: null, priority: 'CRITICAL', order: 19 },
  { modelName: 'Jetta', yearFrom: 2019, yearTo: null, component: 'Fluido do câmbio DSG (GLI)', intervalKm: 60000, intervalMonths: 48, notes: 'Não atrasar — principal cuidado preventivo contra trancos e modo de emergência.', priority: 'CRITICAL', order: 20 },
  { modelName: 'Jetta', yearFrom: 2019, yearTo: null, component: 'Fluido de freio DOT 4 (GLI)', intervalKm: 40000, intervalMonths: 24, notes: null, priority: 'HIGH', order: 21 },
  { modelName: 'Jetta', yearFrom: 2019, yearTo: null, component: 'Rodízio de pneus', intervalKm: 10000, intervalMonths: null, notes: 'Cruzado.', priority: 'MEDIUM', order: 22 },
]

const BLOCKS: ModelBlock[] = [
  { modelName: 'Jetta', yearFrom: 1994, yearTo: 1995, MACETES: MACETES_VR6, PROBLEMAS: PROBLEMAS_VR6, MANUTENCAO: MANUTENCAO_VR6 },
  { modelName: 'Jetta', yearFrom: 2006, yearTo: 2013, MACETES: MACETES_25, PROBLEMAS: PROBLEMAS_25, MANUTENCAO: MANUTENCAO_25 },
  { modelName: 'Jetta', yearFrom: 2011, yearTo: 2014, MACETES: MACETES_20, PROBLEMAS: PROBLEMAS_20, MANUTENCAO: MANUTENCAO_20 },
  { modelName: 'Jetta', yearFrom: 2015, yearTo: 2018, MACETES: MACETES_14TSI, PROBLEMAS: PROBLEMAS_14TSI, MANUTENCAO: MANUTENCAO_14TSI },
  { modelName: 'Jetta', yearFrom: 2019, yearTo: 2023, MACETES: MACETES_250TSI, PROBLEMAS: PROBLEMAS_250TSI, MANUTENCAO: MANUTENCAO_250TSI },
  { modelName: 'Jetta', yearFrom: 2019, yearTo: null, MACETES: MACETES_GLI, PROBLEMAS: PROBLEMAS_GLI, MANUTENCAO: MANUTENCAO_GLI },
]

async function main() {
  console.log('🚗 Seed Volkswagen Jetta...')

  const carroType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'carro' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'Volkswagen', vehicleTypeId: carroType.id } },
    update: {},
    create: { name: 'Volkswagen', vehicleTypeId: carroType.id },
  })

  await prisma.vehicleModel.upsert({
    where: { name_brandId: { name: 'Jetta', brandId: brand.id } },
    update: {},
    create: { name: 'Jetta', brandId: brand.id },
  })

  // Delete once (não por bloco) — múltiplos blocos usam o mesmo modelName 'Jetta'
  await prisma.tip.deleteMany({ where: { modelName: 'Jetta' } })

  let order = 0
  for (const block of BLOCKS) {
    const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
    const allTips = cats.flatMap((cat) => block[cat].map((tip) => ({ cat, tip })))
    await prisma.tip.createMany({
      data: allTips.map(({ cat, tip }) => ({
        modelName: block.modelName,
        category: cat,
        severity: tip.severity,
        title: tip.title,
        body: tip.body,
        yearFrom: block.yearFrom,
        yearTo: block.yearTo,
        order: order++,
      })),
    })
    console.log(`  ✅ Jetta (${block.yearFrom}-${block.yearTo ?? '...'}): ${allTips.length} tips`)
  }

  await prisma.tirePressure.deleteMany({ where: { modelName: 'Jetta' } })
  for (const tp of TIRE_PRESSURES) {
    await prisma.tirePressure.create({ data: tp })
    console.log(`  🔵 TirePressure: Jetta (${tp.yearFrom}-${tp.yearTo ?? '...'})`)
  }

  await prisma.maintenanceItem.deleteMany({ where: { modelName: 'Jetta' } })
  await prisma.maintenanceItem.createMany({ data: MAINTENANCE_ITEMS })
  console.log(`  🔧 MaintenanceItems: ${MAINTENANCE_ITEMS.length} itens`)

  console.log('✅ Volkswagen Jetta concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
