// seed-yamaha-motocross-big.ts — Yamaha WR 426 F · WR 450 F · YZ 450 F
// WR 426 F (2001-2002): 426cc DOHC 5 válvulas, titânio nas válvulas de admissão — enduro de
//   competição. NUNCA vendida oficialmente pela Yamaha do Brasil (lançada só nos mercados
//   americano/europeu/japonês) — unidades no Brasil são importação particular/grey-market.
//   Substituída globalmente pela WR450F em 2003.
// WR 450 F (2003-atual): 449cc DOHC, sucessora da WR426F, MESMA arquitetura de motor (tanque
//   de óleo no quadro/chassi = cárter semi-seco, óleo compartilhado entre motor e câmbio).
//   VENDIDA OFICIALMENTE pela Yamaha Motor do Brasil — moto de enduro/rally com kit de
//   iluminação de fábrica (farol, lanterna, painel), habilitável para uso em trilha/rally.
// YZ 450 F (motocross, dentro do código FIPE "YFZ 450/ YZ 450 F 449cc"): 449cc DOHC, MESMO
//   bloco de motor da WR450F (95,0x63,4mm, compressão 12,3:1) mas SEM iluminação — moto de
//   motocross pura, NÃO homologada para uso em via pública/emplacamento. Vendida oficialmente
//   no Brasil pela rede "Yamaha Racing Blue" (lançamento 2026 R$88.990, mas o modelo já era
//   trazido por importadores/equipes de competição em anos anteriores).
//
// ATENÇÃO — o código FIPE "YFZ 450/ YZ 450 F 449cc" junta DOIS produtos diferentes sob o mesmo
// registro: "YFZ 450" é um QUADRICICLO/ATV de 4 rodas (a Yamaha vendeu o YFZ450 como quadriciclo
// esportivo) — FORA DO ESCOPO desta plataforma, que cobre apenas motos de 2 rodas. "YZ 450 F" é
// a moto de motocross de 2 rodas, muito popular e vendida separadamente. Esta ficha cobre
// APENAS a versão MOTO (YZ450F) — nenhum conteúdo de quadriciclo/ATV foi incluído. O modelName
// salvo é "YZ 450 F" (com espaços, forma como aparece dentro da string FIPE), que casa por
// substring com "YFZ 450/ YZ 450 F 449cc" sem colidir com "YZ 250 F 250cc" (250cc, já cadastrado
// em seed-yamaha-trail-motocross.ts) nem com nenhum outro modelName em uso.
//
// Verificação de matching (ver apps/web/app/api/tips/route.ts::matchesStoredName): testado
// programaticamente contra as ~127 strings da FIPE Yamaha (marca 101) — "WR 426 F" e "WR 450 F"
// só casam com seus próprios registros (não colidem entre si nem com "WR 250 F", já cadastrado
// em seed-yamaha-trail-motocross.ts); "YZ 450 F" só casa com "YFZ 450/ YZ 450 F 449cc" (não
// colide com "YZ 250 F 250cc"). Nenhum modelName já existente em qualquer seed-yamaha-*.ts
// colide com os três nomes desta ficha.
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

// ─── WR 426 F (2001-2002) — enduro de competição, importação particular ──────

const WR426F_MACETES: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Moto NUNCA vendida oficialmente pela Yamaha do Brasil — toda unidade no país é importação particular; peças e manual em português não existem oficialmente',
    body: 'A WR426F foi vendida pela Yamaha apenas nos mercados americano, europeu e japonês entre 2001-2002, substituída globalmente pela WR450F em 2003. Não há registro de venda oficial pela Yamaha Motor do Brasil. Toda unidade encontrada no país é importação particular (grey-market) ou trazida por competidor/equipe. Isso significa: manual de serviço só em inglês/japonês, peças de reposição via importadores especializados em off-road (não em concessionária Yamaha comum), e suporte técnico limitado a oficinas especializadas em motocross/enduro importado.',
  },
  {
    severity: 'OK',
    title: 'Motor 426cc DOHC 5 válvulas com válvulas de admissão em TITÂNIO — item novo para 2001, mais leve e permite giro mais alto que a antecessora WR400F',
    body: 'A WR426F trouxe válvulas de admissão em titânio (novidade da geração 2001), mais leves que aço, permitindo maior rotação e resposta mais rápida do motor. O motor é DOHC de 5 válvulas (configuração incomum, herdada da linha de competição YZF/WR da época). Por serem mais caras e mais delicadas que válvulas de aço convencionais, o cuidado com a regulagem de folga dentro do intervalo correto é ainda mais importante nesta moto do que em motores de válvula de aço.',
  },
  {
    severity: 'WARN',
    title: 'Óleo COMPARTILHADO entre motor e câmbio, reservatório no próprio quadro (chassi) — NÃO tem cárter convencional embaixo do motor',
    body: 'A WR426F usa arquitetura de cárter semi-seco em que o PRÓPRIO QUADRO da moto funciona como reservatório de óleo — o tampão de enchimento e a vareta ficam entre o tanque de combustível e o tubo de direção, com linhas de óleo descendo para o motor de cada lado do quadro. O óleo é COMPARTILHADO entre motor, embreagem e câmbio (não existe óleo de câmbio separado). Use sempre óleo com especificação JASO MA (embreagem multidisco úmida) — óleo errado causa patinação da embreagem.',
  },
  {
    severity: 'OK',
    title: 'Óleo recomendado: Yamalube 4 20W-40 (clima acima de 5°C) ou Yamalube 4 10W-30 / Yamalube 4-R 15W-50 (clima frio)',
    body: 'A especificação de fábrica varia por faixa de temperatura ambiente: acima de 5°C use Yamalube 4 20W-40; em clima mais frio, Yamalube 4 10W-30 ou o mais específico Yamalube 4-R 15W-50. No Brasil, a faixa 20W-40 atende a maior parte do território o ano todo. Sempre JASO MA — nunca óleo automotivo comum (contém aditivos que reduzem o atrito da embreagem, causando patinação).',
  },
  {
    severity: 'WARN',
    title: 'Folga de válvulas: admissão 0,10-0,15 mm / escape 0,20-0,25 mm (motor frio) — verificação exige jogo de pastilhas (shims) e mecânico especializado',
    body: 'Estas folgas (motor frio, na marca zero/PMS de compressão) são as especificadas em manual para a família de motor WR426F/WR450F/YZ450F. Fora dessa faixa: folga maior que o especificado causa ruído metálico e perda de potência; folga menor que o especificado é mais grave — risco de a válvula não fechar totalmente, batendo no pistão. Regulagem feita por troca de pastilha (shim) de espessura calibrada — serviço de mecânico especializado em motor de competição, não é ajuste caseiro.',
  },
  {
    severity: 'WARN',
    title: 'Mecanismo de descompressão automática (decompressor) — desgaste é queixa comum nos fóruns, causa dificuldade de dar partida a coice',
    body: 'A WR426F (como toda a geração WR/YZF da época) usa um mecanismo de descompressão automática no eixo de comando para facilitar a partida a coice de um motor de alta compressão. O desgaste desse mecanismo é uma queixa documentada nos fóruns de owners — sintoma: partida cada vez mais difícil, exigindo mais chutes ou técnica específica. Inspeção/reforma do mecanismo: serviço de motor completo, procurar oficina especializada em motor de competição 4T.',
  },
  {
    severity: 'WARN',
    title: 'Engate da 5ª marcha ("dogs" das engrenagens) arredondando/quebrando — problema documentado nas unidades 2001-2002; evitar trocas de marcha bruscas sem embreagem',
    body: 'Um problema específico e bem documentado da geração 2001-2002 (WR426F) é o desgaste ou quebra dos "dogs" (dentes de engate) da 5ª marcha do câmbio. Sintoma: a moto "pula" para neutro ou falha ao engatar a 5ª sob carga. Causa mais comum: trocas de marcha bruscas ou sem cortar bem a embreagem, especialmente sob aceleração forte. Prevenção: trocar marchas com o pé firme e embreagem bem cortada, evitar "chutar" a marcha na aceleração plena. Reparo: exige abertura do motor — mais caro em moto sem suporte de peças oficial no Brasil.',
  },
  {
    severity: 'OK',
    title: 'Carburador (não tem injeção eletrônica) — ajuste de agulha/jato para altitude é necessário ao trocar de região; flutuador pode "prender" e causar afogamento',
    body: 'A WR426F usa carburador (a injeção eletrônica só chegou nas WR450F mais recentes). Ao mudar significativamente de altitude (ex: litoral para serra), a mistura ar/combustível pede reajuste de agulha e jato principal — problema comum relatado em fóruns é o flutuador do carburador "prender" e causar afogamento do motor (transbordamento de combustível). Verificar o funcionamento do flutuador ao notar cheiro forte de combustível ou dificuldade de partida a quente.',
  },
]

const WR426F_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Escassez TOTAL de peças novas originais — moto fora de linha há mais de 20 anos e nunca teve distribuição oficial no Brasil',
    body: 'A combinação de "nunca vendida oficialmente no Brasil" + "fora de linha desde 2002" torna a WR426F a moto mais difícil desta ficha em termos de disponibilidade de peças. Peças de motor compartilhadas com a WR450F de primeira geração (2003-2005) podem ser compatíveis em alguns itens (confirmar com mecânico especializado antes de comprar) — mas isso não é garantido em todas as peças. Praticamente toda peça de reposição vem de importação (EUA/Japão) via encomenda, o que encarece e atrasa qualquer reparo.',
  },
  {
    severity: 'WARN',
    title: 'Engate da 5ª marcha quebrando sob uso agressivo — reparo caro e demorado por depender de peça importada',
    body: 'Como não há distribuidor oficial Yamaha para esta moto no Brasil, o reparo do problema documentado de quebra do engate de 5ª marcha (ver Macetes) fica ainda mais caro e demorado do que seria em um mercado com peça original disponível localmente. Muitos proprietários recorrem a peças usadas de desmanche importado ou usinagem sob medida como alternativa.',
  },
  {
    severity: 'WARN',
    title: 'Moto de 20+ anos — vedações, mangueiras e retentores ressecados são esperados independentemente da quilometragem/horas de uso',
    body: 'Por ser uma moto fabricada em 2001-2002, mesmo unidades com poucas horas de uso real sofrem degradação de borracha (retentores de bengala, mangueiras de arrefecimento, o-rings do carburador) só pelo tempo de calendário. Ao adquirir uma unidade usada, inspecione TODAS as vedações de borracha visíveis antes de rodar, independente do que o vendedor disser sobre "poucas horas de uso".',
  },
]

const WR426F_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma WR426F por HORAS de uso — motor de competição de mais de 20 anos, sem suporte oficial Yamaha Brasil',
    body: 'A cada uso: verificar nível de óleo (vareta no quadro/chassi, entre tanque e tubo de direção) e nível de arrefecimento. A cada 5-10 horas de uso (competição/enduro pesado no limite inferior): troca de óleo Yamalube 4 20W-40 (ou 10W-30/4-R 15W-50 em clima frio) — óleo compartilhado motor/câmbio. Filtro de ar: limpar após CADA saída de trilha, sem exceção — item mais crítico de proteção do motor. A cada 15-20 horas: verificação da folga de válvulas (adm 0,10-0,15 mm / esc 0,20-0,25 mm, motor frio) — mecânico especializado com jogo de shims. A cada 20-30 horas: inspeção de embreagem, suspensão (retentores) e revisão geral do motor. Vela: verificar a cor do eletrodo regularmente (indica mistura) e trocar a cada 15-25 horas. Corrente: lubrificar após cada uso, ajustar folga. Ao guardar por período prolongado: esgotar o carburador para evitar verniz de etanol/gasolina antiga. IMPORTANTE: por ser moto sem suporte oficial no Brasil, priorize um mecânico com experiência real em motor de competição 4T Yamaha (WR/YZF) — motor genérico não tem a mesma familiaridade com o tanque de óleo no quadro.',
  },
]

// ─── WR 450 F (2003-atual) — enduro/rally oficial, com iluminação de fábrica ──

const WR450F_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 449cc DOHC (95,0x63,4mm, compressão 12,3:1) — sucessora direta da WR426F, MESMA arquitetura de óleo compartilhado com reservatório no quadro',
    body: 'A WR450F substituiu a WR426F em 2003 mantendo a mesma filosofia de motor: DOHC, cárter semi-seco com reservatório de óleo NO PRÓPRIO QUADRO da moto (não é cárter convencional embaixo do motor), óleo compartilhado entre motor, embreagem e câmbio. Diferente da WR426F, a WR450F É vendida oficialmente pela Yamaha Motor do Brasil — modelo atual no catálogo, com manual em português e peças disponíveis em concessionária Yamaha.',
  },
  {
    severity: 'OK',
    title: 'ÚNICA da linha com kit de iluminação de fábrica — farol, lanterna e painel de instrumentos permitem uso em trilha/rally com placa (conforme legislação local)',
    body: 'Ao contrário da YZ450F (motocross pura, sem qualquer iluminação, não emplacável), a WR450F vem de fábrica com farol dianteiro, lanterna traseira e painel de instrumentos — pensada para uso em enduro/rally onde trechos de ligação por via pública podem ser necessários. Verifique sempre a legislação de trânsito local antes de circular em via pública — a elegibilidade para emplacamento pode variar conforme o estado/órgão de trânsito. O tanque de combustível (7,4 L) é dimensionado para uso de rally com trechos mais longos entre reabastecimentos.',
  },
  {
    severity: 'WARN',
    title: 'Troca de óleo: 5 horas em uso competitivo/agressivo, até 10 horas em uso recreativo — óleo compartilhado motor/câmbio exige disciplina rígida',
    body: 'Por compartilhar óleo entre motor e câmbio (mesma arquitetura da WR426F), a troca de óleo da WR450F precisa ser mais frequente que uma moto de rua equivalente: a cada 5 horas em uso competitivo/agressivo, até 10 horas em uso recreativo mais leve. Óleo Yamalube 4, SAE 10W-30 ou 20W-40 conforme temperatura ambiente (JASO MA obrigatório — embreagem multidisco úmida). Negligenciar esse intervalo acelera o desgaste do câmbio junto com o do motor, já que compartilham o mesmo óleo.',
  },
  {
    severity: 'WARN',
    title: 'Filtro de ar tipo espuma (Twin Air ou similar) — limpar a cada 5-10 horas em competição, até 15 horas em uso recreativo, SEMPRE após uso em lama/poeira',
    body: 'O filtro de ar é o item de manutenção mais crítico desta moto — um motor de alta performance como este é extremamente sensível a partículas de poeira. Use sempre óleo específico para filtro de espuma (Twin Air Filter Oil, Motul A1, Bel-Ray Foam Filter Oil), nunca óleo de motor comum. Em condições de muita lama ou poeira: limpe após CADA saída, independente do número de horas acumuladas. Filtro entupido ou mal vedado é a causa mais comum de desgaste prematuro de motor nesta categoria.',
  },
  {
    severity: 'OK',
    title: 'Suspensão KYB invertida — modelos mais recentes (aprox. 2012+) usam o sistema SSS (Speed Sensitive System); troca de óleo de suspensão é item central de manutenção, não opcional',
    body: 'A WR450F usa garfo dianteiro invertido KYB, com o sistema SSS (Speed Sensitive System, ajuste de amortecimento sensível à velocidade do curso) nos modelos mais recentes (a partir de aproximadamente 2012 — confirme a especificação exata do seu ano de fabricação). A suspensão de curso longo é um dos itens que mais definem o desempenho da moto em terreno técnico — negligenciar a troca de óleo da suspensão (recomendado a cada temporada de uso intenso) degrada a resposta antes que o proprietário perceba visualmente qualquer vazamento.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK família CR8E/CR8EIX (iridium) — confirme código exato para o ano da sua unidade, pois a especificação foi atualizada ao longo da produção',
    body: 'A família de vela para este motor segue a referência CR8E (convencional) ou variantes iridium de rosca longa em anos mais recentes. Como a especificação pode ter mudado entre gerações de 2003 até hoje, sempre confirme o código exato no manual do ano específico da sua unidade antes de comprar. Iridium dura sensivelmente mais que a vela convencional — bom upgrade para reduzir a frequência de troca em uso recreativo.',
  },
]

const WR450F_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Negligenciar o intervalo curto de troca de óleo (pensando em "horas" como se fosse km de moto de rua) é o erro mais caro nesta moto',
    body: 'O erro mais comum de proprietários vindos de motos de rua é aplicar a lógica de "troco a cada X mil km" a uma moto de competição/enduro medida em HORAS de uso. 5-10 horas de uso intenso podem representar poucas centenas de km rodados, mas o desgaste do óleo (que também lubrifica o câmbio) é proporcional ao tempo de motor em alta rotação, não à distância percorrida. Atrasar a troca "porque rodou pouco km" desgasta o motor e o câmbio prematuramente.',
  },
  {
    severity: 'WARN',
    title: 'Retentores de suspensão (dianteira e traseira) desgastando com uso constante em terreno irregular por longas distâncias — típico do uso de enduro/rally',
    body: 'O uso de enduro/rally (distâncias maiores, terrenos variados) desgasta os retentores de suspensão de forma diferente do motocross (uso mais curto e intenso em pista fechada). Sintoma dianteiro: óleo visível no tubo interno do garfo. Sintoma traseiro: perda de amortecimento, vazamento no corpo do amortecedor. Reforma completa recomendada a cada temporada de uso intenso.',
  },
  {
    severity: 'WARN',
    title: 'Uso em trilhas muito lentas e técnicas eleva a temperatura do motor mais que em velocidades maiores — atenção ao líquido de arrefecimento',
    body: 'Por ser refrigerada a líquido, a WR450F pode superaquecer em trechos muito lentos e técnicos (baixa velocidade constante, pouco fluxo de ar no radiador) — situação mais comum em enduro extremo do que em rally aberto. Verifique o nível de líquido de arrefecimento antes de cada saída e evite prolongar demais o motor em marcha lenta parado em terreno muito lento sem necessidade.',
  },
]

const WR450F_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma WR450F por HORAS de uso — moto com suporte oficial Yamaha Brasil, peças disponíveis em concessionária',
    body: 'A cada uso: verificar nível de óleo (vareta no quadro) e nível de arrefecimento; limpar filtro de ar se usado em lama/poeira. A cada 5-10 horas: troca de óleo Yamalube 4 10W-30/20W-40 (JASO MA, compartilhado motor/câmbio) — 5h em uso competitivo, até 10h recreativo. A cada 5-15 horas: limpeza do filtro de ar (espuma com óleo específico Twin Air/Motul A1/Bel-Ray). A cada 15-25 horas: troca de vela NGK CR8E ou iridium (confirme código do ano). A cada 15-20 horas: verificação da folga de válvulas (adm 0,10-0,15 mm / esc 0,20-0,25 mm, motor frio) — mecânico especializado com shims. A cada 20-30 horas: inspeção de embreagem, retentores de suspensão dianteira/traseira (reforma por temporada de uso intenso) e revisão geral do motor por concessionária ou oficina especializada Yamaha. Corrente 520: lubrificar após cada uso, verificar folga. Sistema de iluminação/painel: verificar funcionamento antes de qualquer saída que use via pública. Bateria (partida elétrica conforme versão): manter carregada mesmo com moto parada por período de guarda.',
  },
]

// ─── YZ 450 F — motocross de competição pura, SEM iluminação, não emplacável ─
// Casa com o código FIPE "YFZ 450/ YZ 450 F 449cc". ATENÇÃO: esse código FIPE junta o
// quadriciclo YFZ450 (4 rodas, fora do escopo desta plataforma) com a moto YZ450F (2 rodas).
// Todo o conteúdo abaixo é EXCLUSIVAMENTE sobre a moto YZ450F — nenhuma menção a quadriciclo.

const YZ450F_MACETES: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Esta ficha cobre APENAS a versão MOTO (YZ450F, 2 rodas) — o código da FIPE também lista o quadriciclo YFZ450 (4 rodas), que é OUTRO PRODUTO e não é coberto por esta plataforma',
    body: 'A tabela FIPE registra "YFZ 450/ YZ 450 F 449cc" sob um único código, misturando dois produtos Yamaha diferentes: o YFZ450 é um quadriciclo/ATV esportivo de 4 rodas (fora do escopo desta plataforma, que cobre apenas motos de 2 rodas), e a YZ450F é uma moto de motocross de 2 rodas com motor de mesma cilindrada (449cc) mas chassi, ciclística e uso completamente diferentes. Todo o conteúdo desta ficha — motor, suspensão, manutenção — se refere exclusivamente à YZ450F (moto). Se você possui um quadriciclo YFZ450, esta ficha NÃO se aplica ao seu veículo.',
  },
  {
    severity: 'OK',
    title: 'Moto de motocross PURA — SEM farol, lanterna ou painel de instrumentos de fábrica; NÃO é elegível para emplacamento/uso em via pública',
    body: 'Ao contrário da WR450F (irmã de enduro/rally, com kit de iluminação de fábrica), a YZ450F é uma moto de motocross de competição pura — nunca teve farol, lanterna ou instrumentos de série em nenhuma geração, e não é disponibilizada para emplacamento. Uso é restrito a pista de motocross ou propriedade privada. Não tente adaptar iluminação improvisada para uso em via pública — a moto não foi projetada nem homologada para isso.',
  },
  {
    severity: 'OK',
    title: 'Motor 449cc DOHC (95,0x63,4mm, compressão 12,3:1) — MESMO bloco básico da WR450F, mas com mapa/calibração e câmbio voltados para motocross (uso mais curto e intenso) em vez de enduro (uso mais longo)',
    body: 'A YZ450F compartilha a base de motor com a WR450F: DOHC, 449cc, mesmo bore/stroke e taxa de compressão. As diferenças estão no mapa de ignição/injeção (mais agressivo, voltado para respostas rápidas de pista fechada), relação de câmbio mais curta (motocross tem menos necessidade de velocidade máxima em retas longas) e calibração de suspensão para saltos e batidas mais bruscas. Isso significa boa intercambialidade de peças internas de motor com a WR450F, mas NÃO intercambialidade de componentes de suspensão, câmbio ou ciclística.',
  },
  {
    severity: 'WARN',
    title: 'Óleo COMPARTILHADO motor/câmbio (cárter seco, reservatório no quadro) — capacidade aproximada 0,95 L (só troca) / 1,0 L (com troca de filtro)',
    body: 'A YZ450F usa a mesma arquitetura de cárter seco com reservatório de óleo no quadro/chassi da linha WR — óleo Yamalube 4, SAE 10W-30 ou 20W-40 conforme temperatura, JASO MA obrigatório (embreagem multidisco úmida compartilha o óleo). Capacidade aproximada: 0,95 L em troca periódica sem trocar o filtro, 1,0 L quando o filtro também é trocado. Em uso de competição, a troca é ainda mais frequente que na WR450F por conta da intensidade de uso (giro mais alto e mais constante em pista).',
  },
  {
    severity: 'WARN',
    title: 'Filtro de ar tipo espuma — limpar após CADA sessão em lama/poeira, ou a cada 5-15 horas conforme intensidade de uso; item que mais protege o investimento no motor',
    body: 'Assim como a WR450F, o filtro de ar da YZ450F é o item de manutenção mais crítico. Use sempre óleo específico para espuma (Twin Air Filter Oil, Motul A1, Bel-Ray Foam Filter Oil). Em treino/prova com pista seca e poeirenta: limpar após CADA sessão, sem exceção — pilotos de competição costumam ter filtro reserva já limpo para trocar entre motos/sessões. Negligenciar este item é a causa mais comum de desgaste prematuro em motos desta categoria.',
  },
  {
    severity: 'OK',
    title: '2026: adoção de embreagem HIDRÁULICA (substitui o cabo mecânico usado nos anos anteriores) — folga/purga seguem lógica de sistema hidráulico, não mais ajuste de cabo',
    body: 'A partir da geração 2026, a YZ450F passou a usar embreagem hidráulica (substituindo o acionamento por cabo mecânico das gerações anteriores). Se sua unidade é 2026 ou mais recente: a manutenção da embreagem segue a lógica de sistema hidráulico (verificação de nível de fluido, purga de ar), diferente do ajuste de folga de cabo das unidades mais antigas. Confirme no manual do seu ano específico qual sistema sua unidade usa antes de qualquer serviço de embreagem.',
  },
  {
    severity: 'OK',
    title: 'Suspensão KYB — modelos 2026 trazem ajuste manual de sintonia atualizado; garfo invertido de curso longo é item central de manutenção, não opcional',
    body: 'A YZ450F usa suspensão KYB de alta performance, com atualizações de sintonia manual introduzidas na geração 2026. O garfo invertido de curso longo é calibrado para absorver saltos e pousos de motocross — mais rígido e agressivo que a calibração de enduro/rally da WR450F. A troca de óleo de suspensão a cada temporada de uso competitivo é item central de manutenção — negligenciar isso degrada a resposta da suspensão de forma imperceptível a olho nu até o desempenho cair visivelmente na pista.',
  },
]

const YZ450F_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'NÃO confundir com o quadriciclo YFZ450 ao comprar peças ou consultar preços — mesmo código FIPE, produtos totalmente diferentes',
    body: 'Como o registro FIPE mistura os dois produtos, há risco real de confusão ao pesquisar peças, valor de revenda ou histórico de recall: sempre confirme "moto YZ450F" (2 rodas) versus "quadriciclo YFZ450" (4 rodas) ao contatar vendedores, lojas de peças ou seguradoras. As peças de motor têm nomenclatura similar mas as peças de ciclística (rodas, suspensão, chassi) são completamente diferentes e não são intercambiáveis entre os dois produtos.',
  },
  {
    severity: 'WARN',
    title: 'Moto não emplacável — uso em via pública é ilegal; planeje transporte até a pista em reboque/van',
    body: 'Diferente da WR450F, a YZ450F não tem qualquer possibilidade de emplacamento no Brasil — é uma moto de competição pura, sem iluminação, não homologada para uso em via pública. O transporte até o local de treino/prova deve ser feito em reboque ou veículo de carga — rodar com a YZ450F na rua, mesmo por trechos curtos, é infração de trânsito.',
  },
  {
    severity: 'WARN',
    title: 'Negligenciar a troca de óleo pensando em "km rodados" em vez de horas de motor — erro caro em moto de competição de giro alto e uso intenso em pista',
    body: 'Assim como a WR450F, a YZ450F é medida em horas de uso de motor, não em km — o hodômetro é irrelevante ou ausente na maioria das unidades de competição. Uma sessão de treino de 1 hora em pista de motocross desgasta o óleo (compartilhado com o câmbio) muito mais que 1 hora de estrada. Sempre programe a troca por horas reais de motor ligado, contabilizando treinos e provas.',
  },
]

const YZ450F_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma YZ450F por HORAS de uso — moto de competição pura, sem iluminação, medida em horas de motor não em km',
    body: 'Antes de cada sessão: verificar nível de óleo (vareta no quadro) e nível de arrefecimento; ter filtro de ar reserva já limpo. A cada 5-10 horas de uso competitivo (até 15h em uso recreativo leve): troca de óleo Yamalube 4 10W-30/20W-40 (JASO MA, ~0,95 L só óleo / ~1,0 L com troca de filtro) — óleo compartilhado motor/câmbio. Filtro de ar: limpar após CADA sessão em pista seca/poeirenta, sem exceção. A cada 15-25 horas: troca de vela NGK CR8E ou iridium (confirme código do ano). A cada 15-20 horas: verificação da folga de válvulas (adm 0,10-0,15 mm / esc 0,20-0,25 mm, motor frio) — mecânico especializado com shims. A cada 15-20 horas: inspeção de embreagem (hidráulica a partir de 2026, cabo em anos anteriores) e suspensão KYB (retentores, óleo). A cada 20-30 horas: revisão geral de motor por mecânico especializado em motocross Yamaha, antes de temporada de competição. Corrente 520: lubrificar após cada sessão. Transporte: sempre em reboque/van — moto não é homologada para rodar até a pista.',
  },
]

// ─── Tire Pressures ───────────────────────────────────────────────────────────

const TIRE_PRESSURES = [
  {
    modelName: 'WR 426 F',
    yearFrom: 2001, yearTo: 2002,
    tireSize: 'Aro 21" (F) · 18" (R) — pneu de terra/enduro',
    frontPsi: 13, rearPsi: 13, frontPsiLoad: 15, rearPsiLoad: 15,
    notes: 'Pneus de terra usam pressões bem mais baixas que motos de asfalto — mais grip e absorção de impacto. Ajustar conforme tipo de terreno: 12-13 PSI em terra macia, até 15-16 PSI em terreno mais duro/pedregoso. Calibrar antes de cada saída — pressão baixa demais aumenta risco de "beliscar" o pneu na roda em impactos fortes.',
  },
  {
    modelName: 'WR 450 F',
    yearFrom: 2003, yearTo: null,
    tireSize: 'Aro 21" (F) · 18" (R) — pneu misto enduro/rally',
    frontPsi: 13, rearPsi: 13, frontPsiLoad: 15, rearPsiLoad: 15,
    notes: 'Mesma lógica de pressão baixa de moto de terra. Em trechos de ligação por asfalto (uso de rally/enduro com trecho de estrada): aumentar temporariamente para 18-20 PSI e retornar à pressão de terra antes da trilha. Verificar a cada saída — furos lentos por espinho são comuns em uso off-road.',
  },
  {
    modelName: 'YZ 450 F',
    yearFrom: 2003, yearTo: null,
    tireSize: 'Aro 21" (F) · 19" (R) — pneu de motocross (taco alto)',
    frontPsi: 13, rearPsi: 13, frontPsiLoad: null, rearPsiLoad: null,
    notes: 'Motocross usa pressões ainda mais baixas que enduro em pista de terra solta/areia — muitos pilotos rodam 12-13 PSI ou menos para maximizar tração em curvas e saltos. Não há calibragem "com carga" nesta categoria (moto de competição, sem garupa/bagagem). Calibrar antes de cada bateria de treino — a temperatura da pista e o tipo de solo alteram a pressão ideal ao longo do dia.',
  },
]

// ─── Manutenção ──────────────────────────────────────────────────────────────

const makeWR426F = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo Yamalube 4 20W-40 (ou 10W-30/4-R 15W-50 em clima frio) — compartilhado motor/câmbio', intervalKm: 300, intervalMonths: null, notes: 'A cada 5-10 horas de uso (competição/enduro pesado no limite inferior). Reservatório no quadro/chassi, não cárter convencional. JASO MA obrigatório.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar (espuma com óleo específico Twin Air/Motul A1/Bel-Ray)', intervalKm: 30, intervalMonths: null, notes: 'Limpar após CADA saída de trilha, sem exceção. Item mais crítico de proteção do motor.', priority: 'CRITICAL', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Folga de válvulas (adm 0,10-0,15 mm / esc 0,20-0,25 mm, motor frio)', intervalKm: 600, intervalMonths: null, notes: 'A cada 15-20 horas. Válvulas de admissão em titânio — regulagem via jogo de shims, mecânico especializado.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela — verificar código exato para o ano (referência histórica CR8E)', intervalKm: 500, intervalMonths: null, notes: 'A cada 15-25 horas. Verificar cor do eletrodo regularmente (indica mistura do carburador).', priority: 'MEDIUM', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente — lubrificação e folga', intervalKm: 40, intervalMonths: null, notes: 'Lubrificar após cada uso. Ajustar relação conforme tipo de terreno.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Mecanismo de descompressão automática — inspeção', intervalKm: null, intervalMonths: 12, notes: 'Desgaste documentado nos fóruns causa dificuldade de partida a coice. Serviço de motor especializado.', priority: 'MEDIUM', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Engate da 5ª marcha ("dogs") — inspeção de desgaste', intervalKm: null, intervalMonths: 12, notes: 'Problema documentado nas unidades 2001-2002. Evitar trocas de marcha bruscas sem embreagem bem cortada.', priority: 'HIGH', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Embreagem — inspeção/troca de discos', intervalKm: 700, intervalMonths: null, notes: 'A cada 20-30 horas de uso.', priority: 'MEDIUM', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Suspensão dianteira/traseira — inspeção de retentores', intervalKm: 700, intervalMonths: null, notes: 'A cada 20-30 horas. Vedações ressecadas pela idade (moto de 20+ anos) independem das horas de uso real.', priority: 'HIGH', order: 9 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Carburador — limpeza e ajuste de mistura por altitude', intervalKm: null, intervalMonths: 6, notes: 'Reajustar ao mudar significativamente de altitude. Verificar flutuador se notar afogamento/cheiro forte de combustível.', priority: 'MEDIUM', order: 10 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Revisão geral de motor por mecânico especializado em motor de competição importado', intervalKm: 900, intervalMonths: 12, notes: 'A cada 20-30 horas ou anualmente. Moto sem suporte oficial Yamaha Brasil — priorize oficina com experiência real em WR/YZF.', priority: 'HIGH', order: 11 },
]

const makeWR450F = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo Yamalube 4 10W-30/20W-40 (compartilhado motor/câmbio)', intervalKm: 300, intervalMonths: null, notes: '5 horas em uso competitivo/agressivo, até 10 horas em uso recreativo. Reservatório no quadro/chassi. JASO MA obrigatório.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar (espuma Twin Air/Motul A1/Bel-Ray)', intervalKm: 40, intervalMonths: null, notes: 'A cada 5-10 horas em competição, até 15 horas recreativo. SEMPRE após uso em lama/poeira, independente das horas.', priority: 'CRITICAL', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK CR8E ou iridium (confirme código do ano)', intervalKm: 500, intervalMonths: null, notes: 'A cada 15-25 horas. Iridium dura sensivelmente mais.', priority: 'MEDIUM', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Folga de válvulas (adm 0,10-0,15 mm / esc 0,20-0,25 mm, motor frio)', intervalKm: 600, intervalMonths: null, notes: 'A cada 15-20 horas. Jogo de shims, mecânico especializado ou concessionária Yamaha.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 520 — lubrificação e folga', intervalKm: 40, intervalMonths: null, notes: 'Lubrificar após cada uso.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Embreagem — inspeção/troca de discos', intervalKm: 700, intervalMonths: null, notes: 'A cada 20-30 horas — desgaste maior em enduro técnico.', priority: 'MEDIUM', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Suspensão KYB (SSS em modelos recentes) — retentores e óleo', intervalKm: 700, intervalMonths: null, notes: 'A cada 20-30 horas. Reforma completa a cada temporada de uso intenso — óleo de suspensão é item central, não opcional.', priority: 'HIGH', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Nível de líquido de arrefecimento', intervalKm: 30, intervalMonths: null, notes: 'Verificar antes de cada saída — trilhas lentas/técnicas aquecem mais que velocidade de rally.', priority: 'HIGH', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Sistema de iluminação (farol/lanterna/painel) — verificação', intervalKm: null, intervalMonths: 6, notes: 'Único modelo desta ficha com iluminação de fábrica. Verificar antes de qualquer trecho em via pública.', priority: 'MEDIUM', order: 9 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria (partida elétrica conforme versão)', intervalKm: null, intervalMonths: 6, notes: 'Manter carregada mesmo com moto parada — sistema de injeção e iluminação dependem dela.', priority: 'MEDIUM', order: 10 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Revisão geral de motor por concessionária/oficina especializada Yamaha', intervalKm: 900, intervalMonths: 12, notes: 'A cada 20-30 horas ou anualmente, antes de temporada.', priority: 'HIGH', order: 11 },
]

const makeYZ450F = (m: string, yf: number, yt: number, hydraulicClutch: boolean): MaintenanceItemInput[] => {
  const items: MaintenanceItemInput[] = [
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo Yamalube 4 10W-30/20W-40 (~0,95L só óleo / ~1,0L com filtro) — compartilhado motor/câmbio', intervalKm: 300, intervalMonths: null, notes: '5-10 horas em uso competitivo, até 15 horas recreativo leve. Reservatório no quadro/chassi. JASO MA obrigatório.', priority: 'CRITICAL', order: 1 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar (espuma Twin Air/Motul A1/Bel-Ray)', intervalKm: 30, intervalMonths: null, notes: 'Limpar após CADA sessão em pista seca/poeirenta — ter filtro reserva já limpo para treinos/provas.', priority: 'CRITICAL', order: 2 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK CR8E ou iridium (confirme código do ano)', intervalKm: 500, intervalMonths: null, notes: 'A cada 15-25 horas. Leitura de cor do eletrodo indica calibração da mistura.', priority: 'MEDIUM', order: 3 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Folga de válvulas (adm 0,10-0,15 mm / esc 0,20-0,25 mm, motor frio)', intervalKm: 600, intervalMonths: null, notes: 'A cada 15-20 horas. Jogo de shims, mecânico especializado em motocross Yamaha.', priority: 'HIGH', order: 4 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 520 — lubrificação e folga', intervalKm: 40, intervalMonths: null, notes: 'Lubrificar após cada sessão de treino/prova.', priority: 'HIGH', order: 5 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Suspensão KYB — retentores e óleo', intervalKm: 600, intervalMonths: null, notes: 'A cada 15-20 horas de uso competitivo. Calibração mais rígida que a WR450F (voltada para saltos de motocross).', priority: 'HIGH', order: 6 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Revisão geral de motor por mecânico especializado em motocross', intervalKm: 900, intervalMonths: 12, notes: 'A cada 20-30 horas, antes de temporada de competição.', priority: 'HIGH', order: 7 },
  ]

  if (hydraulicClutch) {
    items.push({
      modelName: m, yearFrom: yf, yearTo: yt,
      component: 'Embreagem hidráulica — nível de fluido e purga',
      intervalKm: null, intervalMonths: 6,
      notes: 'A partir da geração 2026: embreagem passou de cabo mecânico para acionamento hidráulico. Verificar nível de fluido e purgar ar conforme necessário — não é mais ajuste de folga de cabo.',
      priority: 'MEDIUM', order: 8
    })
  } else {
    items.push({
      modelName: m, yearFrom: yf, yearTo: yt,
      component: 'Embreagem a cabo — folga e desgaste de discos',
      intervalKm: 700, intervalMonths: null,
      notes: 'A cada 20-30 horas de uso competitivo. Verificar folga do cabo na alavanca.',
      priority: 'MEDIUM', order: 8
    })
  }

  return items
}

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS = [
  { modelName: 'WR 426 F', yearFrom: 2001, yearTo: 2002, MACETES: WR426F_MACETES, PROBLEMAS: WR426F_PROBLEMAS, MANUTENCAO: WR426F_MANUTENCAO },
  { modelName: 'WR 450 F', yearFrom: 2003, yearTo: null, MACETES: WR450F_MACETES, PROBLEMAS: WR450F_PROBLEMAS, MANUTENCAO: WR450F_MANUTENCAO },
  { modelName: 'YZ 450 F', yearFrom: 2003, yearTo: null, MACETES: YZ450F_MACETES, PROBLEMAS: YZ450F_PROBLEMAS, MANUTENCAO: YZ450F_MANUTENCAO },
]

const ALL_MANUTENCAO: MaintenanceItemInput[] = [
  ...makeWR426F('WR 426 F', 2001, 2002),
  ...makeWR450F('WR 450 F', 2003, 2025),
  // YZ 450 F: cabo (até 2025) e embreagem hidráulica (2026+)
  ...makeYZ450F('YZ 450 F', 2003, 2025, false),
  ...makeYZ450F('YZ 450 F', 2026, null, true),
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
