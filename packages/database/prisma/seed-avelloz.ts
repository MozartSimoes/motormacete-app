/**
 * Seed AVELLOZ — macetes, problemas e manutenção
 * Cobre os modelos Avelloz comercializados no Brasil
 *
 * Grupo Valoriza (Paulista/PE) — importadora-montadora pernambucana
 * 5ª marca mais emplacada do Brasil em 2025 (33.093 unidades)
 * Plataformas CUB chinesas — compatibilidade com peças genéricas
 *
 * Modelos:
 *   AZ 01 50CC  — CUB 49cc carburador semi-auto (FIPE 890001-9)
 *   AZ 125 ALFA — CUB 123cc EFI semi-auto (FIPE 890002-7)
 *   AZ 160 XTREME — Trail 161cc EFI 5 marchas (lançado jan/2025)
 *
 * Fontes: avelloz.com.br, garage311.com.br, motonline.com.br,
 *         Reclame Aqui, grupos Facebook donos Avelloz, Mercado Livre
 *
 * Execute: pnpm --filter @motormacete/database db:seed:avelloz
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

// ─── AZ 01 50CC ─────────────────────────────────────────────────────────────
// Motor CUB 49cc 4T ar/carburador, semi-automático 4 marchas, corrente 420

const AZ01_MACETES: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Peças genéricas CUB chinesas funcionam no AZ1 — pesquise "50cc CUB" no Mercado Livre',
    body: 'O AZ1 usa a mesma plataforma CUB de 50cc fabricada em larga escala na China. Muitas peças têm equivalente genérico disponível no Mercado Livre sem precisar da rede autorizada: filtro de óleo e filtro de ar (pesquise "filtro 50cc CUB 4T"), carburador genérico PZ16 ou PE16 (R$ 30–80), cabos de freio e acelerador universais CUB, pinhão e coroa (verificados como compatíveis com Honda Biz e Shineray Phoenix — mesma família de transmissão), vela de ignição NGK. Para peças de carroceria (carenagem, plásticos): a Avelloz passou a produzir internamente em 2025 — procure na rede autorizada ou em revendedores como Garage311.com.br.',
  },
  {
    severity: 'OK',
    title: 'Garage311.com.br: o maior estoque independente de peças para AZ1',
    body: 'O Garage311 (garage311.com.br, tel. 49 99828-0001) é o principal revendedor independente de peças compatíveis para a linha Avelloz no Brasil. Cobrem categorias completas para o AZ 01 50cc (anos 2022–2025): carenagem, elétrica, motor, suspensão, roda, sistema de combustível e transmissão. Antes de importar ou esperar semanas na autorizada, consulte o Garage311. O site oficial da Avelloz (avelloz.com.br/pecas) também tem consulta por modelo/ano para peças originais.',
  },
  {
    severity: 'WARN',
    title: 'Garantia de 6 meses com revisão obrigatória a cada 1.000 km em autorizada — documente tudo',
    body: 'A Avelloz exige revisão a cada 1.000 km ou 3 meses (o que ocorrer primeiro) em concessionária autorizada, com carimbo e assinatura no manual. Qualquer revisão feita fora invalida a garantia. O período de cobertura é de apenas 6 meses (motor e elétrica). Relatos no Reclame Aqui mostram alegações de "mau uso" para defeitos claramente de fábrica. Para se proteger: (1) faça sempre as revisões na autorizada dentro do prazo, (2) guarde todos os comprovantes com data e número de km, (3) registre qualquer problema por escrito (e-mail ou WhatsApp) assim que aparecer, (4) se houver recusa indevida, acione o Procon ou o Reclame Aqui — a empresa responde 100% das reclamações.',
  },
  {
    severity: 'WARN',
    title: 'Sistema elétrico com pontos fracos conhecidos: chave de ignição, velocímetro e sensor de freio',
    body: 'Os três problemas elétricos mais relatados no AZ1: (1) Chave de ignição com defeito — moto não desliga ao girar para "off", continua funcionando. Causa: contato interno que não abre. Solução: troca da chave (peça original via autorizada ou equivalente CUB no ML). (2) Velocímetro oscilante ou que para de funcionar — geralmente o sensor no cubo da roda dianteira perde o ímã ou a fiação afrouxa. Verifique a fixação do sensor e o ímã no cubo. (3) Sensor de parada do freio traseiro sem funcionar — a luz de freio não acende. Solução: ajuste ou troca do interruptor de freio traseiro, peça barata e troca simples.',
  },
  {
    severity: 'OK',
    title: 'Corrente 420: tensão e lubrificação são o que mais prolonga a vida útil da transmissão',
    body: 'O AZ1 usa corrente 420 (passo 1/2", largura estreita) — padrão em motocicletas leves 50–110cc. A corrente deve ter tensão com folga de 15–20 mm medida no ponto mais frouxo da parte inferior. Tensão excessiva força o rolamento da roda traseira e o retento do câmbio; frouxa demais causa tranco e pula dentes. Lubrificação: a cada 500 km ou após chuva, com spray de corrente (não use WD-40 — evapora rápido e não lubrifica). Limpeza: pano úmido + querosene, seque bem antes de lubrificar. Troca: geralmente a cada 8.000–12.000 km junto com pinhão e coroa.',
  },
]

const AZ01_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Chave de ignição com defeito: moto não desliga ao girar para "off"',
    body: 'Um dos problemas mais relatados no AZ1 nos primeiros 6 meses de uso. A chave fica presa internamente e o circuito não abre, fazendo a moto continuar ligada mesmo na posição "off". Diagnóstico: se girou a chave para off e o motor não parou, use o interruptor de motor (kill switch) no guidão para parar. Solução: troca da chave de ignição — leve à autorizada dentro da garantia. Se fora da garantia: chave genérica CUB de 3 fios (on/off/luz) disponível no ML por R$ 20–50. Atenção ao número de posições e formato da chave ao comprar o substituto.',
  },
  {
    severity: 'WARN',
    title: 'Caixa de marchas: neutro que some com o motor quente e ruído em 3ª marcha',
    body: 'Dois problemas de transmissão frequentes no AZ1: (1) Indicador de neutro que para de funcionar quando o motor aquece — às vezes o problema é apenas o sensor de neutro, às vezes é a própria geometria interna do câmbio que começa a desgastar. Se a caixa de marchas engata e desengata normalmente mas o indicador não funciona, provavelmente é apenas o sensor (peça barata). Se o neutro real fica difícil de encontrar = problema mecânico interno. (2) Ruído metálico em 3ª marcha (engrenagem com desgaste prematuro). Ambos os problemas devem ser relatados na autorizada ainda dentro da garantia. Guardar registros de quilometragem ao perceber os primeiros sinais.',
  },
  {
    severity: 'WARN',
    title: 'Boia do reservatório de combustível com vazamento: cheiro forte de gasolina',
    body: 'Reportado com frequência nos primeiros 3–6 meses. O reservatório de combustível do AZ1 tem uma boia de plástico que veda a abertura superior — o ponteiro de boia — e em alguns lotes apresenta vedação deficiente, causando cheiro forte de gasolina dentro da carenagem e, em casos mais graves, respingos de combustível. Diagnóstico: cheiro de gasolina sem vazamento visível externo = provável falha na boia/borracha de vedação do medidor de combustível. Nunca deixe a moto estacionada em local fechado com esse problema — risco de incêndio. Leve imediatamente à autorizada (cobre em garantia).',
  },
  {
    severity: 'WARN',
    title: 'Descanso lateral (bengala) com folga ou frouxo de fábrica',
    body: 'Problema de montagem relatado por vários donos: o descanso lateral sai da posição de recolhido durante a marcha (por folga no pivô) ou não se mantém recolhido de forma segura. Além do incômodo, um descanso solto enquanto a moto anda pode causar acidente se o metal tocar o chão em curva. Verificação: com a moto em pé, balance o descanso para sentir folga. Solução: aperto do parafuso do pivô (geralmente M6 ou M8, com trava de rosca) ou troca do conjunto se a folga for no próprio pino. Faça essa verificação nos primeiros 100 km.',
  },
]

const AZ01_MANUTENCAO: TipInput[] = [
  {
    severity: 'WARN',
    title: '1ª troca de óleo em 300–500 km: essencial em motores novos de origem chinesa',
    body: 'Motores novos de plataforma chinesa (como o 50cc CUB do AZ1) soltam limalha metálica de rodagem nos primeiros quilômetros. A primeira troca de óleo deve ser feita entre 300 e 500 km — não espere os 1.000 km da revisão obrigatória. Especificação: 20W-40 API SL (o manual de alguns lotes cita 20W-50 — verifique a etiqueta no motor). Capacidade: ~0,9 a 1,1L com filtro. Use óleo 4T mineral ou semissintético nas primeiras duas trocas. Após 3.000 km você pode mudar para semissintético. Troque o filtro de óleo junto. Apoio: o óleo 20W-40 está disponível em qualquer posto de combustível ou loja de auto-peças no Brasil.',
  },
  {
    severity: 'OK',
    title: 'Vela de ignição: NGK B6HS ou CR6HS para 50cc 4T CUB — verificar a cada 3.000 km',
    body: 'O motor CUB 50cc 4T usa vela rosca M14x1,25mm, alcance 19mm. Os modelos mais comuns compatíveis: NGK B6HS (sem resistor) ou NGK CR6HS (com resistor — preferível para evitar interferência no velocímetro digital). Encontrada em qualquer loja de motos ou distribuidoras NGK no Brasil por R$ 15–30. Verificação visual: a cada 3.000 km. Troca: a cada 6.000 km ou se a vela estiver preta/molhada (mistura rica), branca (mistura pobre) ou com eletrodo desgastado. Ao instalar: gap de 0,6–0,7 mm, torque de 12 N·m em cabeçote de alumínio (não force).',
  },
  {
    severity: 'OK',
    title: 'Carburador: limpeza do bico injetor e do jato principal a cada 6.000 km ou se engasgando',
    body: 'O AZ1 usa carburador tipo PZ16 ou PE16 (carburador genérico CUB 50cc). A câmara de combustível acumula goma com o tempo, especialmente pelo etanol do combustível brasileiro (E27). Sintomas de carburador sujo: motor engasgando em aceleração, dificuldade de dar partida a frio, consumo aumentado. Limpeza: desmonte a tigela do carburador, limpe o jato principal (bico de latão com furo central) e a agulha de combustível com limpador de carburador (spray). Não alargue o furo do jato principal — mesmo 0,1mm muda a mistura. Carburador substituto genérico PZ16 disponível no ML por R$ 30–80 se não tiver jeito de limpar.',
  },
  {
    severity: 'OK',
    title: 'Regulagem de válvulas: verificação a cada 5.000 km — folga 0,05–0,10 mm admissão e escape',
    body: 'Motores 50cc CUB 4T têm SOHC com 2 válvulas. A folga tende a abrir com o uso e pode causar ruído metálico (barulho de "tique-taque" no cabeçote) e perda de desempenho. Verifique com motor FRIO. Folgas típicas para CUB 50cc: admissão 0,05–0,10 mm, escape 0,05–0,10 mm (confirme no manual, pois o AZ1 pode ter variação). O serviço não é complexo mas exige calibradores (feeler gauges) e experiência em motores 4T — qualquer mecânico de moto experiente consegue fazer em 30–45 minutos.',
  },
]

// ─── AZ 125 ALFA ─────────────────────────────────────────────────────────────
// Motor CUB 123cc 4T ar/EFI, semi-automático 4 marchas, CBS

const AZ125_MACETES: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Injeção eletrônica (EFI): problemas elétricos precisam de scanner — não vá ao mecânico comum primeiro',
    body: 'O AZ 125 Alfa tem injeção eletrônica com ECU que armazena códigos de falha. Quando a luz de injeção acende no painel (ícone de motor) ou a moto apresenta falha de combustível/ignição, o diagnóstico precisa de scanner compatível com o protocolo da ECU. Mecânicos de beira de estrada sem scanner vão "tentear" sem dados — caro e ineficaz. Leve sempre à rede autorizada Avelloz para diagnóstico de EFI (avelloz.com.br para localizar a mais próxima). Se a autorizada for distante, procure um mecânico com scanner genérico que leia ECUs de motos chinesas (protocolo geralmente ISO 9141-2 ou KWP2000).',
  },
  {
    severity: 'OK',
    title: 'Peças genéricas CUB 125cc: filtros, vela e correia no Mercado Livre — motor de família chinesa ampla',
    body: 'O motor 125cc EFI do AZ 125 Alfa é da família CUB chinesa de 125cc, fabricada em larga escala na China. Filtro de ar (papel, genérico para CUB 125), filtro de óleo (genérico CUB), vela NGK CR7HSA (disponível em lojas NGK no Brasil por R$ 20–40) e corrente (420 ou 428) são encontrados no Mercado Livre sem problemas. Pesquise "filtro ar CUB 125cc" ou "filtro oleo CUB 125 4T" para encontrar opções. Para peças do sistema EFI (injetor, sensor MAP, TPS), prefira peças originais via autorizada ou Garage311.com.br.',
  },
  {
    severity: 'WARN',
    title: 'Garantia restritiva: 6 meses, revisão 1.000 km na autorizada — mesmas regras do AZ1',
    body: 'O AZ 125 Alfa tem as mesmas condições de garantia que o AZ1: 6 meses de cobertura (motor e elétrica), revisão obrigatória a cada 1.000 km ou 3 meses na autorizada com carimbo no manual. Sem esse documento, a garantia cai. Donos relatam prazos de reparo que podem superar 30 dias em autorizadas com alta demanda — exija prazo por escrito ao deixar a moto. Se houver discordância na cobertura de defeito de fábrica: Procon e Reclame Aqui têm sido eficazes para forçar resolução (a empresa responde 100% no RA com nota 5,68/10).',
  },
  {
    severity: 'OK',
    title: 'CBS (freio combinado): não tente desativar — é obrigatório por lei no Brasil e protege o piloto',
    body: 'O AZ 125 Alfa tem CBS (Combined Brake System) obrigatório por resolução CONTRAN. O sistema faz o freio dianteiro acionar automaticamente ao acionar o freio traseiro (alavanca esquerda). Muitos donos tentam "desativar" o CBS porque acham que não conseguem frear separadamente, mas isso é ilegal e perigoso: o CBS reduz distância de frenagem e evita capotamento. Se o CBS parecer estranho ("freio pesado" ou "moto puxa para um lado ao frear"), o sistema provavelmente precisa de ajuste ou sangria — não é defeito do conceito. Leve à autorizada.',
  },
]

const AZ125_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Painel eletrônico e sensores com problemas precoces: relato frequente nos primeiros 6 meses',
    body: 'Donos relatam falhas no painel digital (velocímetro que congela ou mostra dados errados, odômetro que reseta), sensor de temperatura, e indicadores de combustível. Parte desses problemas é de conector frouxo (vibração da moto afrouxa conexões de fábrica). Verificação DIY: com a moto fria e chave desligada, desconecte e reconecte todos os conectores elétricos acessíveis (geralmente atrás do painel e sob o selim). Se o problema persistir: ECU ou sensor com defeito — autorizada com scanner é necessária. Se ainda estiver na garantia: leve imediatamente e documente por escrito.',
  },
  {
    severity: 'WARN',
    title: 'Caixa de marchas: neutro instável com calor — mesmo padrão do AZ1 50cc',
    body: 'O AZ 125 Alfa herda da plataforma CUB a tendência de o neutro ficar difícil de encontrar quando o motor está quente. Sintoma: em marcha lenta ou parado no semáforo, o neutro some e a moto "pula" para 1ª ao soltar a alavanca. Causas possíveis: desgaste do garfo seletor de neutro ou da mola de posicionamento. Verificação: se o problema apareceu cedo (primeiros 6 meses), é defeito de fábrica — cubra pela garantia. Após o período de garantia: ajuste do câmbio ou troca do garfo seletor (peça via autorizada ou Garage311.com.br).',
  },
  {
    severity: 'WARN',
    title: 'Prazo de reparo em autorizada pode ultrapassar 30 dias: planeje antes de deixar a moto',
    body: 'A rede de autorizadas Avelloz ainda está em expansão e nem sempre tem técnico disponível imediatamente. Relatos no Reclame Aqui mostram casos de moto parada na autorizada por 30 a 60 dias aguardando peça ou diagnóstico. Estratégia para minimizar o impacto: (1) Ligue antes de ir — confirme se a autorizada tem técnico disponível para seu modelo. (2) Peça prazo estimado por escrito ao entregar a moto. (3) Se o prazo não for cumprido, acione o Reclame Aqui — funciona. (4) O CDC garante veículo reserva após 30 dias de reparo em garantia — conheça seu direito.',
  },
]

const AZ125_MANUTENCAO: TipInput[] = [
  {
    severity: 'WARN',
    title: '1ª troca de óleo em 300–500 km: não espere os 1.000 km da revisão obrigatória',
    body: 'Assim como no AZ1, o motor 125cc EFI novo solta limalha de rodagem. Troque o óleo entre 300 e 500 km (antes da primeira revisão obrigatória em autorizada). Especificação: 20W-50 API SL. Capacidade: 0,9 L com filtro. Após a primeira troca, siga o intervalo de revisão de 1.000 km conforme o manual para manter a garantia. Use óleo 4T mineral nas primeiras duas trocas e pode migrar para semissintético a partir de 3.000 km.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CR7HSA para 125cc EFI: disponível no Brasil, verificar a cada 5.000 km',
    body: 'A vela do motor CUB 125cc EFI tipicamente é NGK CR7HSA (M14x1,25mm, alcance 19mm, com resistor para compatibilidade com EFI). Confirme o modelo no manual ou olhe na vela atual antes de comprar. Disponível em distribuidoras NGK e lojas de motos no Brasil por R$ 20–45. Verificação: a cada 5.000 km. Troca: a cada 10.000 km ou se apresentar sinal de desgaste. Gap: 0,6–0,8 mm. Ao instalar: 12–15 N·m (não aperte demais no cabeçote de alumínio).',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: verificação a cada 3.000 km, troca a cada 6.000–10.000 km',
    body: 'O filtro de ar do AZ 125 Alfa é de papel — não lave com óleo (diferente de filtros de esponja). Verificação visual: a cada 3.000 km. Troca: a cada 6.000–10.000 km, ou antes se você rodar em estradas de terra com frequência. Filtro de ar sujo é a causa número 1 de consumo excessivo e falta de potência em motos CUB. Filtro genérico compatível com CUB 125cc disponível no Mercado Livre (pesquise pela dimensão do filtro original). Filtro original via Garage311.com.br ou autorizada.',
  },
  {
    severity: 'OK',
    title: 'CBS: inspeção anual das pastilhas e do cabo de acionamento combinado',
    body: 'O sistema CBS adiciona um cabo extra que aciona o dianteiro ao freiar atrás. Inspecione anualmente: (1) Espessura das pastilhas dianteiras e da lona traseira — substitua com 1,5 mm de espessura restante. (2) O cabo de acionamento CBS não deve estar ressecado ou frouxa — ajuste pela regulagem no guidão e na pinça. (3) Se sentir o freio "pesado" ou a moto puxar para um lado: verifique se a pastilha dianteira não está agarrando por cabo desregulado. Pastilhas genéricas compatíveis com sistema dianteiro 140mm disponíveis no ML.',
  },
]

// ─── AZ 160 XTREME ───────────────────────────────────────────────────────────
// Motor trail 161.9cc 4T ar/EFI, 5 marchas manual, CBS, trail adventure

const AZ160_MACETES: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Lançada em janeiro/2025: peças específicas ainda escassas — prefira manutenção preventiva',
    body: 'A AZ 160 Xtreme é o modelo mais recente da Avelloz (lançamento jan/2025) e o estoque de peças de reposição específicas ainda está em construção. Recomendações para os primeiros donos: (1) Siga rigorosamente o calendário de revisões para evitar avarias que precisem de peças difíceis de obter. (2) Nas revisões, peça ao técnico que registre quais filtros, retentores e vedações são usados — assim você conhece os equivalentes no mercado. (3) Para peças da família trail 160cc genérica (filtro de ar, filtro de óleo, corrente 428, vela), já há equivalentes no ML — pesquise "trail 160cc" e compare dimensões. O Garage311.com.br já cobre o modelo.',
  },
  {
    severity: 'OK',
    title: 'Trail com 5 marchas manual: calibragem diferente para asfalto e terra — saiba a diferença',
    body: 'A AZ 160 Xtreme é uma trail versátil com pneus 19" (dianteiro) e 17" (traseiro). A calibragem de pneu muda com o uso: para asfalto (uso predominante), calibre conforme especificação oficial (ver aba Calibragem). Para uso em terra/trilha: reduza 4–6 PSI no traseiro para aumentar a pegada do pneu. Em cascalho molhado ou lama: você pode reduzir mais, mas nunca abaixo de 18 PSI no traseiro (risco de pneu desmontar da roda). Após a trilha, recalibre antes de voltar ao asfalto — pneu murcho no asfalto degrada mais rápido e aumenta o risco de capotamento em curvas.',
  },
  {
    severity: 'WARN',
    title: 'Injeção eletrônica EFI: mesmo alerta do AZ125 — problemas elétricos precisam de scanner',
    body: 'A AZ 160 Xtreme tem injeção eletrônica com ECU. Qualquer falha de combustão, aceleração errática ou luz de injeção acesa no painel exige scanner para leitura de códigos antes de qualquer intervenção. Mecânicos sem scanner podem cobrar por serviços desnecessários. A rede Avelloz ainda está em expansão — se não houver autorizada próxima, procure mecânicos com scanner genérico para motos chinesas (protocolos OBD-II ou KWP2000). Evite "tentativas de ajuste" na injeção sem dados — pode piorar o problema.',
  },
  {
    severity: 'OK',
    title: 'Kit transmissão 428 e pneus trail 90/90-19 e 110/90-17 disponíveis no Brasil',
    body: 'A corrente 428 (mais larga e resistente que a 420 do AZ1) é padrão em motos trail 150–200cc e encontrada facilmente no Brasil: marcas RK e DID têm distribuidores nacionais. Os pneus trail são menos comuns que os urbanos mas encontráveis: Pirelli MT66 Route (misto asfalto/terra), Michelin Sirac Street (asfalto com pegada off-road), e genéricos chineses para trilha — verificar disponibilidade no tamanho 90/90-19 (dianteiro) e 110/90-17 (traseiro). Para uso predominante em asfalto, também cabem Pirelli Sport Demon e similares, mas perdem performance em terra.',
  },
]

const AZ160_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Problemas elétricos precoces: padrão da linha Avelloz — verifique conectores preventivamente',
    body: 'A AZ 160 Xtreme segue o padrão da linha Avelloz de problemas elétricos nos primeiros meses de uso. Verificação preventiva nos primeiros 1.000 km: com a moto fria e chave desligada, desconecte e reconecte todos os conectores elétricos visíveis (painel, farol, traseira, sensores de marcha e ponto morto). Aplique spray dielétrico (spray de contato) nos conectores para evitar oxidação — o clima brasileiro é agressivo. Bateria: a AZ 160 usa 12V/7Ah. Se a moto apresentar dificuldade de partida a frio, teste a bateria (voltagem em repouso deve ser 12,6V ou mais).',
  },
  {
    severity: 'WARN',
    title: 'Peças específicas do motor 161cc: sem equivalente genérico fácil — avaria = espera',
    body: 'Diferente do AZ1 50cc (plataforma CUB genérica), o motor 161.9cc da AZ 160 tem geometria mais específica. Peças internas de motor (pistão, segmentos, biela, retentores de virabrequim) e componentes do câmbio não têm equivalente genérico amplamente disponível no mercado brasileiro ainda. Em caso de avaria interna de motor fora da garantia: (1) Consulte primeiro a autorizada para disponibilidade de peças originais. (2) Garage311.com.br como segunda opção. (3) Busque grupos no Facebook de donos AZ 160 para indicação de peças alternativas que já foram testadas. Evite comprar peças "universais" para motor sem confirmar compatibilidade de dimensões.',
  },
  {
    severity: 'WARN',
    title: 'Garantia 6 meses com revisão a cada 1.000 km: mesmas condições — rede ainda em expansão',
    body: 'A AZ 160 tem cobertura de garantia de 6 meses com a mesma exigência de revisão 1.000 km/3 meses na autorizada. A diferença é que, por ser um modelo de lançamento recente (2025), nem todas as autorizadas têm técnicos treinados e peças estocadas para a AZ 160 especificamente. Antes de levar: ligue e confirme se a autorizada já atende o AZ 160 Xtreme. Se houver recusa de cobertura por alegação de mau uso para defeito claramente de fábrica: acione o Procon do seu estado e o Reclame Aqui. O CDC protege o consumidor independente do prazo de garantia contratual para defeitos ocultos.',
  },
]

const AZ160_MANUTENCAO: TipInput[] = [
  {
    severity: 'WARN',
    title: '1ª troca de óleo em 500 km: motor trail 160cc exige rodagem correta',
    body: 'O motor trail 161cc da AZ 160 é maior e mais solicitado que o CUB 50cc. A primeira troca deve ocorrer entre 500 e 700 km para eliminar toda a limalha de rodagem. Especificação: 20W-50 API SL (ou conforme etiqueta no motor). Capacidade: ~1,1 L com filtro. Após a primeira troca, use o intervalo de 1.000 km da revisão obrigatória. Durante o período de rodagem (0–1.000 km): evite rotações acima de 75% da máxima e acelerar bruscamente do zero — o motor precisa assentar.',
  },
  {
    severity: 'OK',
    title: 'Vela para trail 160cc EFI: NGK CR7HSA ou equivalente — verificar a cada 5.000 km',
    body: 'O motor 161.9cc EFI usa vela padrão para trail 160cc. Modelo tipicamente compatível: NGK CR7HSA (M14x1,25mm, alcance 19mm, com resistor). Confirme o código impresso na vela atual ou no manual antes de comprar. Disponível em distribuidoras NGK no Brasil. Verificação: a cada 5.000 km. Troca: a cada 10.000 km. Em uso off-road com lama e umidade: verifique com mais frequência (a cada 3.000 km).',
  },
  {
    severity: 'OK',
    title: 'Filtro de ar: checar a cada 2.000 km em uso off-road, 5.000 km em asfalto',
    body: 'A AZ 160 Xtreme é uma trail — se você usa em estradas de terra, cascalho ou trilhas, o filtro de ar suja muito mais rápido que em uso urbano. Em uso misto ou off-road: verifique o filtro a cada 2.000 km. Em uso só asfalto: a cada 5.000 km. Filtro de papel: não lave, substitua quando sujo. Filtro sujo é causa direta de perda de potência e consumo excessivo em motor de injeção eletrônica — a ECU tenta compensar mas tem limite.',
  },
  {
    severity: 'OK',
    title: 'Corrente 428: tensão e lubrificação mais críticas em uso off-road',
    body: 'A corrente 428 da AZ 160 suporta mais torque que a 420 do AZ1. Em uso off-road, a corrente acumula barro e areia que acelereram o desgaste drasticamente. Lubrificação após cada uso em terra (mesmo que já tenha lubrificado recentemente). Tensão: folga de 20–30 mm na parte inferior. Limpeza: querosene + escova de nylon + spray de corrente. Em uso exclusivo de asfalto: lubrificação a cada 500 km. Em uso misto: a cada 200–300 km ou sempre que ficar em barro. Troca: 10.000–15.000 km em uso misto / 15.000–20.000 km em uso só asfalto.',
  },
]

// ─── Blocos por modelo ──────────────────────────────────────────────────────
const avellozModels: ModelBlock[] = [
  {
    modelName: 'AZ 01 50CC',
    yearFrom: 2020,
    yearTo: null,
    MACETES:    AZ01_MACETES,
    PROBLEMAS:  AZ01_PROBLEMAS,
    MANUTENCAO: AZ01_MANUTENCAO,
  },
  {
    modelName: 'AZ 125 ALFA',
    yearFrom: 2023,
    yearTo: null,
    MACETES:    AZ125_MACETES,
    PROBLEMAS:  AZ125_PROBLEMAS,
    MANUTENCAO: AZ125_MANUTENCAO,
  },
  {
    modelName: 'AZ 160 XTREME',
    yearFrom: 2025,
    yearTo: null,
    MACETES:    AZ160_MACETES,
    PROBLEMAS:  AZ160_PROBLEMAS,
    MANUTENCAO: AZ160_MANUTENCAO,
  },
]

// ─── Calibragem de pneus ────────────────────────────────────────────────────
const avellozPressoes: TirePressureInput[] = [
  {
    modelName: 'AZ 01 50CC',
    yearFrom: 2020,
    yearTo: null,
    tireSize: 'Dianteiro 80/100-18 | Traseiro 90/90-18',
    frontPsi: 28,
    rearPsi: 32,
    frontPsiLoad: 28,
    rearPsiLoad: 36,
    notes: 'CUB urbano aro 18". Calibre sempre a frio. Com garupa: traseiro 36 PSI. Pneus disponíveis no Brasil: Pirelli City Pro, Michelin M45 — verificar disponibilidade no tamanho 80/100-18 e 90/90-18 (aros 18" são menos comuns no varejo, peça por encomenda).',
  },
  {
    modelName: 'AZ 125 ALFA',
    yearFrom: 2023,
    yearTo: null,
    tireSize: 'Dianteiro 2.50-17 | Traseiro 2.75-17',
    frontPsi: 28,
    rearPsi: 32,
    frontPsiLoad: 28,
    rearPsiLoad: 36,
    notes: 'CUB aro 17" com medidas em polegadas (padrão CUB brasileiro). Calibre sempre a frio. Com garupa: traseiro 36 PSI. Pneus equivalentes: Pirelli City Pro 2.50-17 / 2.75-17, Fate Urban 2.75-17 — medidas CUB amplamente disponíveis no Brasil.',
  },
  {
    modelName: 'AZ 160 XTREME',
    yearFrom: 2025,
    yearTo: null,
    tireSize: 'Dianteiro 90/90-19 | Traseiro 110/90-17',
    frontPsi: 25,
    rearPsi: 29,
    frontPsiLoad: 28,
    rearPsiLoad: 33,
    notes: 'Trail aro 19" dianteiro e 17" traseiro. Calibre sempre a frio. Com garupa/carga: dianteiro 28 PSI, traseiro 33 PSI. Para uso off-road/trilha: reduzir 4–6 PSI no traseiro para maior aderência em terra. Pneus disponíveis no Brasil: Pirelli MT66 Route, Michelin Sirac (misto), ou pirelli City Pro para asfalto. Recomende sempre recalibrar ao voltar da trilha para o asfalto.',
  },
]

// ─── Cronogramas de Manutenção por Modelo ────────────────────────────────────

const avellozMaintenanceItems: MaintenanceItemInput[] = [

  // ── AZ 01 50CC (CUB 49cc, carburador, corrente 420, ar refrigerado) ─────────
  { modelName: 'AZ 01 50CC', yearFrom: 2020, yearTo: null, order: 0,
    component: 'Óleo do motor (20W40 ou 20W50 API SL)', intervalKm: 2000, intervalMonths: 6, priority: 'CRITICAL',
    notes: 'Volume: ~0,9 L com filtro. Use 20W40 ou 20W50 4T API SL mineral ou semissintético. ATENÇÃO: primeira troca deve ser feita entre 300–500 km (limalha de rodagem de motor novo). Após isso, troque a cada 2.000 km ou 6 meses — em uso de entrega, reduzir para 1.500 km.' },
  { modelName: 'AZ 01 50CC', yearFrom: 2020, yearTo: null, order: 1,
    component: 'Corrente 420 — lubrificação e tensão', intervalKm: 500, intervalMonths: null, priority: 'HIGH',
    notes: 'Lubrificação a cada 500 km com spray de corrente (não use WD-40 — evapora). Após chuva: lubrificação imediata. Tensão: 15–20 mm de folga na parte inferior no ponto mais frouxo. Kit (corrente + pinhão + coroa) a cada 8.000–12.000 km.' },
  { modelName: 'AZ 01 50CC', yearFrom: 2020, yearTo: null, order: 2,
    component: 'Vela NGK B6HS ou CR6HS', intervalKm: 6000, intervalMonths: null, priority: 'HIGH',
    notes: 'Motor CUB 50cc usa vela M14×1,25mm, alcance 19mm. Prefira CR6HS (com resistor) — evita interferência no velocímetro digital. Gap: 0,6–0,7 mm. Verifique a cada 3.000 km; troque a cada 6.000 km. Disponível em lojas NGK por R$ 15–30. Vela preta = mistura rica (carburador rico); branca = mistura pobre.' },
  { modelName: 'AZ 01 50CC', yearFrom: 2020, yearTo: null, order: 3,
    component: 'Carburador PZ16/PE16 — limpeza do jato', intervalKm: 6000, intervalMonths: null, priority: 'HIGH',
    notes: 'O etanol E27 da gasolina brasileira deposita goma no jato do carburador. Limpe o jato principal (latão com furo central) com spray de carburador a cada 6.000 km ou quando sentir engasgos. Não alargue o furo do jato — 0,1 mm muda a mistura. Carburador substituto PZ16 genérico disponível no ML por R$ 30–80.' },
  { modelName: 'AZ 01 50CC', yearFrom: 2020, yearTo: null, order: 4,
    component: 'Filtro de ar (esponja) — limpeza', intervalKm: 3000, intervalMonths: 6, priority: 'MEDIUM',
    notes: 'Lave com detergente neutro, seque à sombra e aplique óleo de filtro. Troque a cada 6.000 km ou se rasgado/deformado. Filtro sujo é causa direta de aumento de consumo e engasgos no carburador. Em zonas de pó ou terra, reduza o intervalo para 1.500 km.' },
  { modelName: 'AZ 01 50CC', yearFrom: 2020, yearTo: null, order: 5,
    component: 'Folga de válvulas (IN/EX 0,05–0,10 mm)', intervalKm: 5000, intervalMonths: 12, priority: 'MEDIUM',
    notes: 'Motor SOHC com 2 válvulas. Verifique com motor FRIO. Folga admissão e escape: 0,05–0,10 mm (confirme no manual do seu lote). Ruído de "tique-taque" no cabeçote em aceleração = folga aberta. Serviço simples para qualquer mecânico de moto com calibradores (feeler gauges) — cerca de 30–45 min.' },
  { modelName: 'AZ 01 50CC', yearFrom: 2020, yearTo: null, order: 6,
    component: 'Freios (tambor D+T) — ajuste dos cabos', intervalKm: 3000, intervalMonths: null, priority: 'MEDIUM',
    notes: 'O AZ1 tem freio a tambor nas duas rodas. Ajuste o cabo dianteiro e o pedal traseiro para 20–30 mm de jogo livre. Lonas mínimas: 2 mm — espessura abaixo disso reduz frenagem e pode danificar o tambor. Inspecione visualmente a cada 3.000 km.' },
  { modelName: 'AZ 01 50CC', yearFrom: 2020, yearTo: null, order: 7,
    component: 'Bateria e sistema elétrico — verificação', intervalKm: null, intervalMonths: 12, priority: 'LOW',
    notes: 'Verifique anualmente: voltagem da bateria em repouso (deve ser ≥ 12,4 V) e conexões dos conectores elétricos (oxidação causa falhas intermitentes). Aplique spray dielétrico nos conectores. Chave de ignição com defeito é problema frequente no AZ1 — se a moto não desligar no "off", use o kill switch e leve à autorizada.' },

  // ── AZ 125 ALFA (CUB 123cc EFI, CBS, corrente 428, ar refrigerado) ──────────
  { modelName: 'AZ 125 ALFA', yearFrom: 2023, yearTo: null, order: 0,
    component: 'Óleo do motor (20W50 API SL)', intervalKm: 3000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume: 0,9 L com filtro. Use 20W50 4T API SL semissintético. Primeira troca: 300–500 km (limalha de rodagem). Após isso: a cada 3.000 km ou 12 meses. Em uso intenso (entrega diária): reduzir para 2.000 km. Troque também o filtro de óleo a cada 2 trocas.' },
  { modelName: 'AZ 125 ALFA', yearFrom: 2023, yearTo: null, order: 1,
    component: 'Corrente 428 — lubrificação e tensão', intervalKm: 500, intervalMonths: null, priority: 'HIGH',
    notes: 'Lubrificação a cada 500 km com spray específico de corrente. Após chuva: lubrifique imediatamente. Tensão: 15–20 mm de folga na parte inferior. Kit completo (corrente + pinhão + coroa) a cada 10.000–15.000 km. Não troque só a corrente sem as coroas — desgaste cruzado acelera a degradação do kit novo.' },
  { modelName: 'AZ 125 ALFA', yearFrom: 2023, yearTo: null, order: 2,
    component: 'Vela NGK CR7HSA', intervalKm: 10000, intervalMonths: null, priority: 'HIGH',
    notes: 'Motor CUB 125cc EFI usa NGK CR7HSA (M14×1,25mm, alcance 19mm, com resistor — obrigatório para EFI). Gap: 0,6–0,8 mm. Verifique a cada 5.000 km; troque a cada 10.000 km. Disponível em distribuidoras NGK no Brasil por R$ 20–45. Vela preta = mistura rica (sensor MAP ou injetor com problema); branca = mistura pobre.' },
  { modelName: 'AZ 125 ALFA', yearFrom: 2023, yearTo: null, order: 3,
    component: 'CBS — inspeção de pastilhas e cabo de acionamento', intervalKm: null, intervalMonths: 12, priority: 'HIGH',
    notes: 'O CBS aciona o disco dianteiro automaticamente ao frear atrás. Inspecione anualmente: (1) pastilhas dianteiras mínimo 2 mm, (2) lona traseira mínimo 2 mm, (3) cabo extra do CBS sem ressecamento nem folga excessiva. Freio "pesado" ou moto que puxa para um lado = cabo CBS desregulado. Não tente desativar o CBS — é ilegal e perigoso.' },
  { modelName: 'AZ 125 ALFA', yearFrom: 2023, yearTo: null, order: 4,
    component: 'Filtro de ar (papel) — substituição', intervalKm: 6000, intervalMonths: 6, priority: 'MEDIUM',
    notes: 'Filtro de PAPEL — não lave, substitua quando sujo. Verifique a cada 3.000 km; troque a cada 6.000–10.000 km. Em uso em estradas de terra: reduza para 3.000 km. Filtro sujo é a causa número 1 de mau funcionamento da EFI — a ECU tenta compensar mas gera consumo alto e falhas.' },
  { modelName: 'AZ 125 ALFA', yearFrom: 2023, yearTo: null, order: 5,
    component: 'Folga de válvulas (IN/EX 0,05–0,10 mm)', intervalKm: 8000, intervalMonths: 12, priority: 'MEDIUM',
    notes: 'Motor SOHC 2 válvulas. Verifique com motor FRIO. Folga admissão e escape: 0,05–0,10 mm (confirme no manual). Válvulas com folga muito pequena podem não vedar completamente — problema silencioso que causa perda de compressão ao longo do tempo. Mecânico especializado em motos japonesas/chinesas faz o serviço.' },
  { modelName: 'AZ 125 ALFA', yearFrom: 2023, yearTo: null, order: 6,
    component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'LOW',
    notes: 'Troque a cada 2 anos — o DOT 4 absorve umidade e perde ponto de ebulição. No AZ 125 o circuito de freio CBS é hidráulico na parte dianteira. Purge dianteiro (pinça) e reabasteça com DOT 4. Não misture com DOT 5 silicone (incompatível). Fluido escuro ou freio esponjoso = troca imediata.' },
  { modelName: 'AZ 125 ALFA', yearFrom: 2023, yearTo: null, order: 7,
    component: 'Sistema EFI — limpeza do injetor', intervalKm: 20000, intervalMonths: null, priority: 'LOW',
    notes: 'A cada 20.000 km, limpe o injetor com aditivo de tanque (BG 44K ou similar) ou limpeza por ultrassom em oficina. Injetor sujo causa engasgos na abertura rápida e consumo elevado. Se a luz de injeção acender no painel, leve à autorizada com scanner — não tente diagnóstico sem leitor de códigos.' },

  // ── AZ 160 XTREME (Trail 161.9cc EFI, 5 marchas, CBS, uso misto) ───────────
  { modelName: 'AZ 160 XTREME', yearFrom: 2025, yearTo: null, order: 0,
    component: 'Óleo do motor (20W50 API SL)', intervalKm: 3000, intervalMonths: 12, priority: 'CRITICAL',
    notes: 'Volume: ~1,1 L com filtro. Use 20W50 4T API SL semissintético. Primeira troca: 500–700 km (motor trail novo solta mais limalha). Em uso só asfalto: 3.000 km. Em uso off-road/misto: 2.000 km — terra e pó contaminam o óleo mais rápido. Durante rodagem (0–1.000 km): evite rotações acima de 75% da máxima.' },
  { modelName: 'AZ 160 XTREME', yearFrom: 2025, yearTo: null, order: 1,
    component: 'Corrente 428 — lubrificação (250 km off-road / 500 km asfalto)', intervalKm: 500, intervalMonths: null, priority: 'HIGH',
    notes: 'Em uso misto ou off-road: lubrifique a cada 250–300 km ou após cada uso em terra/lama. Em uso só asfalto: a cada 500 km. A lama e areia desgastam a corrente rapidamente — limpe com querosene + escova de nylon antes de lubrificar. Tensão: 20–30 mm de folga. Kit a cada 10.000–15.000 km (misto) ou 18.000 km (asfalto).' },
  { modelName: 'AZ 160 XTREME', yearFrom: 2025, yearTo: null, order: 2,
    component: 'Vela NGK CR7HSA', intervalKm: 10000, intervalMonths: null, priority: 'HIGH',
    notes: 'Motor trail 161.9cc EFI usa NGK CR7HSA (M14×1,25mm, com resistor). Gap: 0,6–0,8 mm. Verifique a cada 5.000 km; troque a cada 10.000 km. Em uso off-road com lama e umidade: inspecione a cada 3.000 km. Vela com depósito de terra no isolador pode causar perda de centelha em condições de alta umidade.' },
  { modelName: 'AZ 160 XTREME', yearFrom: 2025, yearTo: null, order: 3,
    component: 'CBS — inspeção de pastilhas e cabo', intervalKm: null, intervalMonths: 12, priority: 'HIGH',
    notes: 'Inspeção anual do sistema CBS: pastilhas dianteiras mínimo 2 mm, lona traseira mínimo 2 mm, cabo do CBS livre de ressecamento. Uso em trilha aumenta a carga sobre o freio traseiro — inspecione mais frequentemente (a cada 6 meses em uso misto). Fluido DOT 4: verificar nível mensalmente em uso intenso.' },
  { modelName: 'AZ 160 XTREME', yearFrom: 2025, yearTo: null, order: 4,
    component: 'Filtro de ar (papel) — substituição', intervalKm: 3000, intervalMonths: 6, priority: 'MEDIUM',
    notes: 'Filtro de PAPEL — não lave, substitua. Em uso off-road ou terra: inspecione a cada 2.000 km e troque quando sujo. Em uso só asfalto: troque a cada 5.000 km. Filtro sujo é causa direta de perda de potência e consumo excessivo na EFI da trail. Sempre verifique antes de saídas off-road mais longas.' },
  { modelName: 'AZ 160 XTREME', yearFrom: 2025, yearTo: null, order: 5,
    component: 'Pneus trail — calibragem e verificação de desgaste', intervalKm: null, intervalMonths: 1, priority: 'MEDIUM',
    notes: 'Calibre mensalmente: dianteiro 25 PSI / traseiro 29 PSI (asfalto). Em trilha: reduza 4–6 PSI no traseiro para maior aderência, nunca abaixo de 18 PSI (risco de desmontar do aro). Ao voltar da trilha: recalibre antes do asfalto. Pneu 90/90-19 (D) e 110/90-17 (T) — verifique desgaste central e lateral a cada 2.000 km.' },
  { modelName: 'AZ 160 XTREME', yearFrom: 2025, yearTo: null, order: 6,
    component: 'Folga de válvulas (IN/EX: confirmar no manual)', intervalKm: 8000, intervalMonths: 12, priority: 'MEDIUM',
    notes: 'Motor SOHC 2 válvulas. Verifique com motor FRIO a cada 8.000 km. A AZ 160 é modelo novo (2025) — consulte o manual de serviço para as folgas exatas, pois podem diferir do CUB 50cc/125cc. Motorização trail trabalha com carga maior; válvulas fora de folga causam perda de compressão mais rapidamente.' },
  { modelName: 'AZ 160 XTREME', yearFrom: 2025, yearTo: null, order: 7,
    component: 'Fluido de freio (DOT 4)', intervalKm: null, intervalMonths: 24, priority: 'LOW',
    notes: 'Troque a cada 2 anos. O DOT 4 absorve umidade — fluido envelhecido causa freio esponjoso e pode falhar em descidas longas com freio exigido. Em uso off-road, verifique o nível mensalmente — barro pode contaminar o reservatório. Nunca misture com DOT 5 silicone.' },
]

// ─── Runner ─────────────────────────────────────────────────────────────────
async function main() {
  console.log('🏍️  Seed AVELLOZ iniciando...\n')

  const motoType = await prisma.vehicleType.upsert({
    where: { slug: 'moto' },
    update: {},
    create: { slug: 'moto', label: 'Moto' },
  })

  const avellozBrand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'AVELLOZ', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'AVELLOZ', vehicleTypeId: motoType.id },
  })
  console.log(`  ✅ Brand: ${avellozBrand.name}`)

  for (const block of avellozModels) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: avellozBrand.id } },
      update: {},
      create: { name: block.modelName, brandId: avellozBrand.id },
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
  for (const tp of avellozPressoes) {
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
  const modelNames = [...new Set(avellozMaintenanceItems.map(m => m.modelName))]
  for (const name of modelNames) {
    await prisma.maintenanceItem.deleteMany({ where: { modelName: name } })
  }
  await prisma.maintenanceItem.createMany({
    data: avellozMaintenanceItems.map(item => ({
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
    const count = avellozMaintenanceItems.filter(m => m.modelName === name).length
    console.log(`  ✅ ${name}: ${count} itens de manutenção`)
  }

  const totalTips = avellozModels.reduce(
    (acc, b) => acc + b.MACETES.length + b.PROBLEMAS.length + b.MANUTENCAO.length,
    0,
  )
  console.log(
    `\n✅ Seed AVELLOZ concluído: ${avellozModels.length} modelos, ${totalTips} dicas, ${avellozPressoes.length} calibragens, ${avellozMaintenanceItems.length} itens de manutenção.`,
  )
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
