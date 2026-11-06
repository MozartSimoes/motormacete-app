// seed-yamaha-mt-series.ts — Yamaha MT-01 · MT-03 660cc (legada) · MT-07 · MT-09 · MT-09 Tracer
// MT-01 (2005-2012 no Brasil): 1.670cc V-twin refrigerado a ar, motor derivado da Royal Star/Warrior
//   (Star Motorcycles), "torcuda" — motor de baixa rotação e muito torque, câmbio de 5 marchas.
// MT-03 660cc (2006-2013, "legada"): motor MONOCILÍNDRICO 660cc baseado na XT660, NADA A VER com a
//   MT-03 atual de 321cc bicilíndrica (essa é coberta em seed-yamaha-fazer.ts como "MT-03 321" e
//   "MT-03 CONNECTED" — não tocar nesse arquivo).
// MT-07 (2015-atual): motor CP2 689cc paralelo-twin crossplane (270°), refrigerado a líquido.
// MT-09 (2015-atual): motor CP3 850/847cc tricilíndrico crossplane, refrigerado a líquido — a naked.
// MT-09 Tracer (2015-atual, "900"/"900 GT"): mesmo motor CP3 da MT-09 mas em configuração touring
//   (carenagem, guidão mais alto, bags, GT com suspensão semi-ativa) — uso bem diferente da naked.
//
// ATENÇÃO — matching de modelName com a FIPE (ver apps/web/app/api/tips/route.ts::matchesStoredName):
// teste de substring com \b (word-boundary). Validado programaticamente contra as 145 strings atuais
// da FIPE Yamaha (marca 101) — cada modelName abaixo bate SOMENTE nas strings FIPE pretendidas:
//   "MT-01"          -> bate só em "MT-01 1.670cc"
//   "MT-03 660cc"    -> bate só em "MT-03 660cc" (NÃO bate em "MT-03 321 ABS Homem de Ferro",
//                        "MT-03 321/ABS" nem "MT-03 CONNECTED 321cc ABS" — essas já são cobertas
//                        por "MT-03 321"/"MT-03 CONNECTED" em seed-yamaha-fazer.ts)
//   "MT-07"          -> bate em "MT-07/MT-07 ABS 689cc" E "MT-07 CONNECTED 689cc ABS" (mesma moto,
//                        mesma mecânica — Connected só muda o painel; conteúdo compartilhado é correto)
//   "MT-09 850cc"    -> bate só em "MT-09 850cc/ABS" (a naked) — NÃO bate em "MT-09 TRACER" nem em
//                        "MT-09 TRACER 900 GT" (testado: "MT-09" bare bateria nas 3, por isso usamos
//                        "MT-09 850cc" que é mais específico e exclui as Tracer)
//   "MT-09 TRACER"   -> bate em "MT-09 TRACER" E "MT-09 TRACER 900 GT" (mesma família touring)
// Nenhum dos modelName acima colide com os já cadastrados em outros arquivos (Crosser, Lander,
// Ténéré, Fazer/FZ/YS/Factor/YBR, scooters, off-road leve, trail, YZ/WR/TT-R).
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

// ─── MT-01 (2005-2012) ────────────────────────────────────────────────────────
// Motor V-twin 1.670cc refrigerado a ar, 2 válvulas por cilindro, SOHC, derivado
// do motor da Star Road Star/Warrior (bloco americano), com diâmetro dos cilindros
// aumentado e 4 carburadores originais substituídos por injeção eletrônica (EFI).
// ~90-96 cv e ~16,3 kgf.m de torque (motor de baixa rotação e MUITO torque —
// apelidada de "torcuda"). Câmbio de 5 marchas. Importação muito limitada no
// Brasil (lote inicial de ~30-40 unidades, só na cor azul). Fontes: motonline.com.br,
// magodoscarros.com, motorium.com.br.

const MT01_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor V-twin 1.670cc refrigerado a AR (não é líquido) — mesmo bloco da Star Road Star/Warrior; óleo 20W-50 mineral/semissintético, ~4,5 L com filtro',
    body: 'A MT-01 usa um motor V-twin 1.670cc SOHC 2 válvulas por cilindro, refrigerado a AR — diferente de todas as outras MT (07/09), que são líquido-refrigeradas. O bloco é derivado da linha Star (cruiser americana Road Star/Warrior), com cilindros retrabalhados e EFI no lugar dos 4 carburadores originais. Óleo recomendado: 20W-50 API SG/SH ou superior, mineral ou semissintético (motor a ar tolera menos sintéticos puros por causa da folga térmica maior). Capacidade: aproximadamente 4,5 L com troca de filtro. Troca: 5.000 km — motor a ar sofre mais com o calor em trânsito parado, então não estenda o intervalo.',
  },
  {
    severity: 'OK',
    title: 'Vela: 2 velas por cilindro (sistema de ignição dupla) — motor V-twin com 4 velas no total; NGK compatível com a linha Star/Warrior',
    body: 'Um detalhe pouco conhecido da MT-01: o motor usa DUAS velas por cilindro (ignição dupla, "twin spark"), totalizando 4 velas na moto (2 por cilindro), uma tecnologia herdada do motor Star para melhorar a queima e reduzir emissões apesar da cilindrada grande. Ao trocar velas, troque as 4 de uma vez — nunca troque só as de um cilindro. Gap e modelo: seguir o manual do proprietário Star Road Star/Warrior equivalente, já que peças de reposição podem precisar ser buscadas com o código do motor. Intervalo: 12.000 km.',
  },
  {
    severity: 'WARN',
    title: 'Moto RARA no Brasil — importação limitada (lote de ~30-40 unidades, só cor azul); peças de ciclística podem exigir importação ou desmanche especializado',
    body: 'A Yamaha importou a MT-01 oficialmente a partir de 2006 em lotes muito pequenos (relatos de 30 a 40 unidades no lote inicial, sempre na cor azul). É uma das motos mais raras da marca no Brasil. Peças de motor compartilhadas com a linha Star (Road Star/Warrior) têm alguma disponibilidade via importação, mas plásticos, painel e itens específicos da MT-01 são muito difíceis de achar — grupos de owners internacionais (fóruns MT-01 dos EUA/Europa, onde a moto teve produção maior) costumam ser a melhor fonte. Antes de comprar uma usada, confirme a disponibilidade de peças de ciclística.',
  },
  {
    severity: 'OK',
    title: 'Câmbio de 5 marchas (não 6) — moto de baixa rotação e muito torque; embreagem multidisco a óleo, robusta, poucos relatos de desgaste prematuro',
    body: 'Ao contrário das MT-07/MT-09 (6 marchas), a MT-01 tem câmbio de apenas 5 marchas — coerente com a filosofia de motor de baixa rotação e torque muito alto desde giros baixos (o apelido "torcuda" vem exatamente disso: pouca necessidade de trocar de marcha com frequência). A embreagem é multidisco em banho de óleo, robusta — poucos relatos de problemas de embreagem na comunidade internacional. Fluido de embreagem: verificar nível a cada 6.000 km (se hidráulica) ou cabo (se mecânica, conforme o ano).',
  },
  {
    severity: 'WARN',
    title: 'Refrigeração a ar em trânsito parado — motor de 1.670cc gera muito calor; evite ficar muito tempo parado em engarrafamento com o motor ligado',
    body: 'Sendo um motor a ar de cilindrada grande (1.670cc), a MT-01 aquece consideravelmente mais em trânsito parado do que as MT líquido-refrigeradas. Em engarrafamentos longos, prefira desligar o motor se possível. Fique atento à temperatura em dias muito quentes (>32°C) com trânsito parado — o motor a ar não tem o alívio de um radiador para dissipar o calor rapidamente. Óleo de boa qualidade e no nível correto é ainda mais crítico aqui, pois o óleo também ajuda a resfriar o motor a ar.',
  },
]

const MT01_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Escassez de peças no Brasil — moto de importação muito limitada; planeje com antecedência para peças de ciclística e elétrica específicas da MT-01',
    body: 'Por ter sido importada em lotes muito pequenos (~30-40 unidades), a MT-01 tem disponibilidade de peças de ciclística (painel, plásticos, componentes elétricos específicos) muito restrita no Brasil. Peças de motor (compartilhadas com a linha Star Road Star/Warrior, vendida em maior volume nos EUA) têm alguma via importação. Recomenda-se contato com clubes/fóruns internacionais de MT-01 antes de precisar de uma peça urgente — a espera por importação pode ser de semanas.',
  },
  {
    severity: 'OK',
    title: 'Motor robusto e maduro (base Star/cruiser americana) — poucos problemas de confiabilidade documentados; maior risco é a raridade de peças, não a mecânica',
    body: 'O motor V-twin 1.670cc da MT-01 é derivado de uma base de motor cruiser (Star Road Star/Warrior) com histórico de robustez e longevidade nos EUA. Os relatos de problemas encontrados sobre a MT-01 são majoritariamente sobre disponibilidade de peças no Brasil, não sobre falhas mecânicas do motor em si. Ainda assim, por ser uma moto rara localmente, encontrar um mecânico com experiência específica na MT-01 pode ser mais difícil do que em motos de maior volume.',
  },
  {
    severity: 'WARN',
    title: 'Peso elevado (~200 kg) combinado com baixa altura do guidão — manobras de baixa velocidade exigem técnica; quedas em manobra são mais comuns que em nakeds menores',
    body: 'A MT-01 é uma moto pesada (em torno de 200 kg em ordem de marcha) com centro de gravidade baixo típico de cruiser/streetfighter. Em manobras de baixa velocidade (estacionar, meia-volta), o peso exige mais técnica do piloto do que em nakeds mais leves como a MT-07. Pilotos inexperientes com motos pesadas relatam mais quedas em manobra parada/baixa velocidade do que em uso normal de estrada.',
  },
]

const MT01_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção MT-01 por km — motor V-twin 1.670cc a ar, base Star Road Star/Warrior',
    body: 'Revisão 1.000 km (garantia): troca de óleo grátis + aperto geral + inspeção da embreagem. 5.000 km: óleo 20W-50 (~4,5 L com filtro) + inspeção do filtro de ar. 10.000 km: óleo + filtro. 12.000 km: as 4 velas (2 por cilindro, sistema de ignição dupla) + regulagem de válvulas (motor frio, consultar manual Star equivalente para folgas exatas). 15.000 km: óleo + filtro. 20.000 km: óleo + filtro + velas + kit de corrente/cardã (verificar no manual se a MT-01 usa transmissão por corrente ou cardã, conforme especificação de importação) + verificação de folga da embreagem. A cada 6 meses: verificação da bateria (moto de baixo uso no Brasil por raridade tende a ficar parada — usar carregador trickle charge). Peças: sempre confirmar disponibilidade antes de agendar serviço, dada a raridade da moto no país — encomendar com antecedência peças de motor da linha Star equivalente quando aplicável.',
  },
]

// ─── MT-03 660cc (legada, 2006-2013) ─────────────────────────────────────────
// ATENÇÃO: motor MONOCILÍNDRICO 660cc (baseado no motor da XT660), refrigerado
// a líquido, 5 válvulas, DOHC. NÃO tem NENHUMA relação com a MT-03 atual (321cc
// bicilíndrica, cadastrada em seed-yamaha-fazer.ts como "MT-03 321"/"MT-03
// CONNECTED"). Mecânica de manutenção completamente diferente: monocilindro de
// baixa rotação e alto curso vs bicilindro moderno. Cerca de 47 cv, 6,3 kgf.m
// de torque. Câmbio de 6 marchas, corrente. Peso seco ~170 kg.

const MT03_660_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor MONOCILÍNDRICO 660cc DOHC 5 válvulas, refrigerado a líquido — base do motor da XT660; NÃO É a MT-03 atual de 321cc bicilíndrica',
    body: 'ATENÇÃO: esta é a MT-03 antiga/legada, vendida no Brasil entre 2006 e 2013, com motor monocilíndrico 660cc DOHC de 5 válvulas por cilindro (a mesma base mecânica da Yamaha XT660 R/X/Z Ténéré), refrigerado a líquido. É uma moto e um motor TOTALMENTE diferentes da MT-03 atual (321cc, dois cilindros, lançada a partir de meados dos anos 2010, cadastrada separadamente no catálogo). Não confunda peças, óleo, filtro nem intervalos entre as duas — são motores de gerações e arquiteturas diferentes.',
  },
  {
    severity: 'OK',
    title: 'Óleo 10W-40 sintético/semissintético, ~2,5-3,0 L com filtro (mesma família de lubrificação da XT660) — troca a cada 6.000 km',
    body: 'Por compartilhar o motor com a XT660, a MT-03 660cc usa óleo 10W-40 API SL/SM ou superior, capacidade aproximada de 2,5-3,0 L com troca de filtro (confirmar volume exato no manual, pode variar ligeiramente conforme o ano). Filtro de óleo: mesma referência da linha XT660. Troca de óleo: 6.000 km. Como é motor monocilíndrico de curso longo com carga térmica alta por cilindrada elevada em 1 pistão só, respeitar rigorosamente o intervalo é fundamental para a vida útil do motor.',
  },
  {
    severity: 'WARN',
    title: 'Vibração de motor monocilíndrico — parafusos e conectores soltam com mais frequência; retificador/regulador tem histórico de problema por sujeira e mau contato',
    body: 'Sendo um monocilindro de 660cc, a MT-03 vibra consideravelmente mais que um bicilindro ou tricilindro de cilindrada equivalente. Essa vibração afrouxa parafusos de carenagem, espelhos e suportes com mais frequência — reaperto geral a cada 6.000-8.000 km é recomendado. Há relatos documentados na comunidade de owners (fóruns MT-03 660) de problemas no retificador/regulador de tensão, com a região do conector ficando suja de óleo e terra por vedação insuficiente — inspecionar e limpar o conector periodicamente evita falhas elétricas intermitentes.',
  },
  {
    severity: 'WARN',
    title: 'Garfo de suspensão traseira — casos documentados de rachadura/quebra em uso em estrada esburacada; inspecionar solda e região de fixação periodicamente',
    body: 'Existem relatos documentados na comunidade de owners de rachadura no garfo (braço) da suspensão traseira da MT-03 660 após uso em pisos irregulares/estrada ruim. Recomenda-se inspeção visual periódica da região de solda e fixação do basculante/garfo traseiro, especialmente se a moto rodar com frequência em vias esburacadas. Ao notar qualquer trinca ou marca de fadiga metálica, interrompa o uso até avaliação de um mecânico especializado — é uma falha estrutural, não cosmética.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK — motor 5 válvulas DOHC monocilíndrico; troca a cada 8.000-10.000 km; folga de válvulas exige atenção pelo alto curso do pistão',
    body: 'O motor 5 válvulas por cilindro (3 admissão + 2 escape, arquitetura da família XT660/MT-03 660) exige regulagem de válvulas mais cuidadosa que um motor de 4 válvulas simples, por ter mais componentes no cabeçote. Vela NGK (consultar referência exata da XT660 equivalente ao ano): troca a cada 8.000-10.000 km. Regulagem de válvulas: a cada 12.000 km, motor frio — este é um motor de curso relativamente longo (alto curso de pistão), então a folga tende a variar mais entre revisões do que em motores de curso curto.',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão, kit relação — desgaste normal de uso rodoviário/urbano; corrente O-ring recomendada pela robustez do motor monocilíndrico de torque alto em baixa rotação',
    body: 'A MT-03 660 usa transmissão por corrente. Como o motor monocilíndrico entrega torque relevante já em baixa rotação, a corrente sofre puxões mais bruscos que em motores multicilindro suaves — corrente com O-ring (mais durável a esse tipo de solicitação) é recomendada. Kit completo (corrente + coroa + pinhão): trocar ao notar folga excessiva ou desgaste visível nos dentes da coroa/pinhão, tipicamente entre 15.000-20.000 km dependendo do uso e da manutenção da lubrificação.',
  },
]

const MT03_660_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Garfo/braço da suspensão traseira — relato documentado de rachadura estrutural em uso rodoviário; inspecione a cada revisão, principalmente em unidades com muitos km rodados em estrada ruim',
    body: 'Existe relato documentado (fórum de owners MT-03 660) de rachadura no garfo da suspensão traseira em uso normal de estrada esburacada. Trata-se de uma falha estrutural que pode comprometer a segurança se não identificada a tempo. Recomendação: inspeção visual da solda e da região de fixação do basculante a cada revisão, com atenção redobrada em unidades com muitos km rodados em vias ruins. Ao notar qualquer trinca, pare de rodar até uma avaliação profissional — não é um item cosmético.',
  },
  {
    severity: 'WARN',
    title: 'Retificador/regulador de tensão — sujeira e mau contato no conector causam falhas elétricas intermitentes (moto apaga, bateria não carrega)',
    body: 'A região do conector do retificador/regulador de tensão da MT-03 660 tem vedação considerada insuficiente pela comunidade de owners, permitindo entrada de sujeira, óleo e água. Isso causa mau contato e falhas elétricas intermitentes — sintomas incluem bateria não carregando corretamente, luzes piscando ou moto apagando sem razão aparente. Solução: limpeza periódica do conector e, se necessário, aplicação de graxa dielétrica para melhorar a vedação. Em caso de falha recorrente, verificar a fiação e o conector antes de trocar o retificador inteiro.',
  },
  {
    severity: 'WARN',
    title: 'Peça rara e moto descontinuada desde 2013 — mais de 10 anos fora de linha; peças de ciclística e elétrica específicas cada vez mais escassas',
    body: 'A MT-03 660 foi vendida no Brasil apenas entre 2006 e 2013. Peças de motor (compartilhadas com a XT660, que teve produção maior e mais longa) ainda têm alguma disponibilidade. Peças específicas de ciclística (painel, carenagem parcial, componentes elétricos únicos da MT-03) ficam cada vez mais raras — desmanches especializados em Yamaha e grupos de owners são a fonte mais confiável. Ao comprar uma usada hoje, avalie a disponibilidade de peças antes de fechar negócio, dado o tempo desde a descontinuação.',
  },
  {
    severity: 'OK',
    title: 'Motor robusto (base XT660, motor consagrado) — problemas documentados são majoritariamente de ciclística/elétrica, não do bloco do motor',
    body: 'O motor monocilíndrico 660cc da MT-03 é derivado da XT660, um motor com histórico de robustez e uso mundial em viagens de longa distância (inclusive rally). Os problemas documentados desta moto no Brasil concentram-se em itens de ciclística (garfo traseiro) e elétrica (retificador), não no bloco do motor em si. Respeitando os intervalos de óleo e válvulas, o motor tende a durar muitos km sem grandes surpresas mecânicas.',
  },
]

const MT03_660_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção MT-03 660cc (legada, monocilíndrica) por km',
    body: 'Revisão 1.000 km (garantia): óleo grátis + aperto geral (reaperto extra por vibração de monocilindro) + inspeção do garfo traseiro. 6.000 km: óleo 10W-40 com filtro (~2,5-3,0 L). 8.000 km: vela NGK (referência XT660 equivalente) + inspeção do filtro de ar. 12.000 km: óleo + filtro + regulagem de válvulas 5V DOHC (motor frio) + reaperto geral de carenagem/suportes (vibração de monocilindro afrouxa parafusos). 16.000 km: óleo + filtro + vela. 18.000-20.000 km: kit de corrente completo (corrente O-ring + coroa + pinhão) conforme desgaste observado. 24.000 km: óleo + filtro + válvulas + inspeção detalhada do garfo/braço da suspensão traseira (solda e fixação). A cada revisão: limpar e inspecionar o conector do retificador/regulador de tensão (histórico de mau contato por sujeira). A cada 6 meses: verificação da bateria. Atenção: moto descontinuada desde 2013 — programe peças de ciclística/elétrica com antecedência por escassez crescente no mercado.',
  },
]

// ─── MT-07 (2015-atual) ───────────────────────────────────────────────────────
// Motor CP2 689cc DOHC 8 válvulas, 2 cilindros em linha, virabrequim crossplane
// (270°) — "sensação de V-twin" com suavidade de paralelo-twin, refrigerado a
// líquido. ~75 cv a 9.000 rpm, ~6,9 kgf.m a 6.500 rpm. Câmbio 6 marchas,
// corrente. Chegou ao Brasil em 2015 (fabricação em Manaus/AM). Motor considerado
// muito confiável — manutenção simples, poucos problemas documentados de motor.
// "CONNECTED" (2020+): mesma mecânica, painel com conectividade via smartphone.

const MT07_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor CP2 689cc — paralelo-twin com virabrequim CROSSPLANE (270°), "sensação de V-twin"; óleo 10W-40 sintético, ~2,8 L com filtro; troca a cada 6.000 km',
    body: 'O motor CP2 da MT-07 é um paralelo-twin de 689cc com virabrequim crossplane (defasagem de 270° entre os pinos de biela), o que dá à moto uma resposta e sonoridade que lembram um V-twin, mas com a suavidade e leveza de um paralelo-twin verdadeiro. É considerado um dos motores mais confiáveis e de manutenção mais simples da linha MT. Óleo: 10W-40 API SL/SM ou superior (sintético recomendado), capacidade aproximada de 2,8 L com troca de filtro. Troca de óleo: 6.000 km. Filtro Hiflofiltro compatível com a linha CP2.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK (referência LMAR8 ou equivalente por ano) — 2 velas, uma por cilindro; troca a cada 12.000-16.000 km; gap conforme manual do ano',
    body: 'A MT-07 usa 2 velas (uma por cilindro do paralelo-twin CP2). Referência típica NGK da família LMAR8 (confirmar código exato e gap no manual do ano específico, pois a especificação pode variar entre gerações 2015-2018 e 2019+). Troca: 12.000-16.000 km em uso normal. O motor CP2 é conhecido por ter combustão eficiente e pouca formação de carbono na vela, o que contribui para os intervalos mais longos que motores de cilindrada similar.',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão — kit completo a cada 20.000-25.000 km em uso normal; lubrificação a cada 500-600 km',
    body: 'A MT-07 usa transmissão por corrente com coroa e pinhão dimensionados para o torque do motor CP2. Em uso normal de rua, o kit de corrente completo (corrente + coroa + pinhão) costuma durar 20.000-25.000 km. Lubrificação: a cada 500-600 km ou após pegar chuva. Folga da corrente: verificar conforme especificação do manual (normalmente 30-45 mm de folga vertical no ponto de menor tensão), ajustar se necessário.',
  },
  {
    severity: 'OK',
    title: 'Manutenção "simples e barata" é reputação consolidada da MT-07 — poucos itens de desgaste crítico além do básico (óleo, vela, corrente, pastilhas)',
    body: 'A MT-07 é amplamente reconhecida (inclusive internacionalmente) por ter custo de manutenção baixo e mecânica muito simples de manter — essencialmente "nada quebra" no motor CP2 quando a manutenção básica é respeitada. Não há itens exóticos ou caros de troca programada além do padrão: óleo, filtro, vela, corrente/kit relação, pastilhas de freio e fluidos. É uma das motos de custo de posse mais baixo da categoria "naked média cilindrada".',
  },
  {
    severity: 'OK',
    title: '"MT-07 CONNECTED" (2020+) tem a mesma mecânica da MT-07/MT-07 ABS — a diferença é só o painel com conectividade Bluetooth/smartphone',
    body: 'A versão "CONNECTED" da MT-07 (a partir de 2020) compartilha 100% do motor CP2 689cc e da ciclística com a MT-07/MT-07 ABS regular. A única diferença relevante é o painel de instrumentos, que ganha conectividade Bluetooth com o smartphone (notificações, dados de trip, etc.). Toda a manutenção mecânica (óleo, vela, corrente, freios) é idêntica entre as duas versões — trate como a mesma moto para fins de revisão e peças de motor/suspensão.',
  },
]

const MT07_PROBLEMAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor CP2 tem excelente reputação de confiabilidade — poucos problemas documentados de motor; queixas na comunidade concentram-se em suspensão e itens de acabamento',
    body: 'O motor CP2 da MT-07 é considerado um dos mais confiáveis da categoria — raramente aparece em listas de problemas recorrentes de motor. As queixas documentadas em fóruns e Reclame Aqui sobre a linha MT no Brasil concentram-se mais em suspensão (vazamento de óleo em amortecedor, avaliado item por item abaixo) e em atendimento de concessionária do que em falhas do bloco do motor CP2 em si.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão — relatos de vazamento de óleo em amortecedor (dianteiro ou traseiro) mesmo com moto parada; verificar vedação periodicamente',
    body: 'Há relatos de owners da linha Yamaha MT no Brasil (incluindo MT-07) sobre vazamento de óleo em amortecedores, em alguns casos com a moto parada na garagem. Recomenda-se inspeção visual periódica das hastes de suspensão dianteira (bengala) e do corpo do amortecedor traseiro, procurando por manchas de óleo ou hastes "encardidas" de graxa misturada com óleo — sinal de retentor comprometido. Ao notar vazamento, não adie a troca do retentor: suspensão comprometida afeta frenagem e estabilidade.',
  },
  {
    severity: 'WARN',
    title: 'Posição de pilotagem naked esportiva (mais inclinada) — desconforto em viagens longas comparado à MT-09 Tracer; não é indicada para touring de longa distância sem acessórios',
    body: 'Como naked de rua, a MT-07 tem posição de pilotagem mais esportiva/inclinada que uma moto de viagem — adequada para trajetos urbanos e estradas de média distância, mas menos confortável em viagens de muitas horas seguidas comparada à MT-09 Tracer (que tem carenagem, guidão mais alto e proteção aerodinâmica). Para quem pretende rodar longas distâncias com frequência, um para-brisa aftermarket e guidão mais alto (risers) são upgrades populares na comunidade.',
  },
]

const MT07_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção MT-07 por km — motor CP2 689cc paralelo-twin crossplane',
    body: 'Revisão 1.000 km (garantia): óleo grátis + aperto geral + regulagem de corrente. 6.000 km: óleo 10W-40 sintético com filtro (~2,8 L). 12.000 km: óleo + filtro + velas (2x, referência do manual do ano) + inspeção do filtro de ar. 18.000 km: óleo + filtro. 20.000-25.000 km: kit de corrente completo (corrente + coroa + pinhão). 24.000 km: óleo + filtro + velas + regulagem de válvulas conforme especificação do manual. A cada 500-600 km: lubrificação da corrente (ou após pegar chuva). A cada revisão: inspeção visual de vazamento em suspensão dianteira e traseira (retentores). Pastilhas de freio: inspecionar a cada 8.000-10.000 km, trocar conforme desgaste. Fluido de freio DOT 4: trocar a cada 24 meses. A cada 6 meses: verificação da bateria. Este cronograma vale igualmente para a versão "CONNECTED" — mesma mecânica, painel diferente.',
  },
]

// ─── MT-09 850cc (naked, 2015-atual) ─────────────────────────────────────────
// Motor CP3 847/850cc DOHC 12 válvulas, 3 cilindros em linha, virabrequim
// crossplane, refrigerado a líquido. ~115 cv a 10.000 rpm, ~8,9 kgf.m a 8.500
// rpm. Câmbio 6 marchas, corrente. Suspensão dianteira invertida 41 mm
// ajustável, monoamortecedor traseiro ajustável. Chegou ao Brasil em 2015
// (fabricação em Manaus/AM). Reclamações documentadas de vazamento em
// amortecedor (dianteiro/traseiro).

const MT09_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor CP3 850cc TRICILÍNDRICO (3 cilindros em linha) — virabrequim crossplane; óleo 10W-40 sintético, ~3,4 L com filtro; TRÊS velas, uma por cilindro',
    body: 'O motor CP3 da MT-09 é um tricilíndrico em linha de 847-850cc (a cilindrada exata varia conforme a fonte/ano) com virabrequim crossplane, entregando cerca de 115 cv a 10.000 rpm e 8,9 kgf.m de torque a 8.500 rpm — bem mais potente que o CP2 da MT-07. Sendo 3 cilindros, a MT-09 tem TRÊS velas (uma por cilindro), diferente das 2 velas da MT-07 (paralelo-twin). Óleo: 10W-40 sintético, capacidade aproximada de 3,4 L com filtro. Troca: 6.000 km.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK — 3 unidades (motor tricilíndrico); troca sempre as 3 juntas mesmo que só uma pareça desgastada, a cada 12.000-16.000 km',
    body: 'Como o motor CP3 tem 3 cilindros, a troca de velas envolve 3 unidades — sempre troque as 3 juntas, mesmo que a inspeção mostre desgaste desigual entre elas, para manter a combustão equilibrada entre os cilindros. Referência NGK conforme manual do ano (a especificação pode variar entre as gerações 2015-2020 e a atualização 2021+, que trouxe motor Euro5 revisado). Intervalo: 12.000-16.000 km.',
  },
  {
    severity: 'OK',
    title: 'Suspensão dianteira invertida 41 mm totalmente ajustável (pré-carga, compressão e retorno) — mais sofisticada que a MT-07; monoamortecedor traseiro também ajustável',
    body: 'A MT-09 vem com garfo dianteiro invertido de 41 mm com ajuste completo (pré-carga, compressão e retorno) e monoamortecedor traseiro também ajustável — suspensão bem mais sofisticada que a MT-07. Isso permite calibrar a moto para o peso do piloto e estilo de uso (rua vs. pista), mas também significa mais pontos de manutenção: verificar vazamento nas hastes invertidas e testar a resposta do amortecedor traseiro periodicamente.',
  },
  {
    severity: 'WARN',
    title: 'Corrente de transmissão sob mais estresse que a MT-07 — mais potência e torque do motor CP3 exige inspeção e lubrificação mais frequentes',
    body: 'Com quase 40% mais potência que a MT-07, a corrente de transmissão da MT-09 fica sob mais estresse mecânico. Recomenda-se lubrificação a cada 400-500 km (um pouco mais frequente que a MT-07) e atenção redobrada à folga correta — corrente com folga incorreta em uso esportivo/agressivo desgasta a coroa e o pinhão mais rápido. Kit completo: geralmente entre 18.000-22.000 km em uso normal, menos em uso mais esportivo.',
  },
]

const MT09_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Suspensão traseira "macia"/undersprung documentada em relatos de owners e testes — amortecedor original pode não ser suficiente para pilotos mais pesados ou uso esportivo',
    body: 'Há reclamações documentadas (fóruns e Reclame Aqui) sobre a suspensão traseira original da MT-09 sendo considerada "mole"/undersprung para pilotos mais pesados ou uso mais esportivo/em curva — a mola de série pode ser subdimensionada para essas condições. A calibragem de pré-carga e retorno ajuda, mas para pilotos acima de 90 kg ou uso frequente em pista/estrada sinuosa, upgrade de mola ou amortecedor aftermarket (Öhlins, YSS) é uma solução popular na comunidade internacional de owners.',
  },
  {
    severity: 'WARN',
    title: 'Relatos de vazamento de óleo em amortecedor (dianteiro ou traseiro) mesmo com moto parada — mesma queixa documentada na linha MT no Brasil (Reclame Aqui)',
    body: 'Assim como na MT-07, há relatos de owners de MT-09 no Brasil sobre vazamento de óleo em amortecedor mesmo com a moto parada na garagem, incluindo um caso relatado de vazamento com acionamento de recall. Inspecione visualmente as hastes do garfo dianteiro invertido e o corpo do monoamortecedor traseiro periodicamente, procurando manchas de óleo. Retentor comprometido: não adiar a troca, pois compromete estabilidade e frenagem em curva (suspensão dianteira invertida é ainda mais crítica para a geometria de direção).',
  },
  {
    severity: 'OK',
    title: 'Motor CP3 tem excelente reputação de confiabilidade — problemas documentados concentram-se em suspensão, não no bloco do motor tricilíndrico',
    body: 'O motor CP3 da MT-09 é considerado robusto e confiável — os problemas mais recorrentes documentados pela comunidade e por reclamações no Brasil giram em torno da suspensão (mola traseira mole, vazamento de amortecedor), não do motor em si. Respeitando os intervalos de óleo e velas, o motor tricilíndrico tende a rodar muitos quilômetros sem grandes surpresas mecânicas.',
  },
]

const MT09_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção MT-09 (naked) por km — motor CP3 850cc tricilíndrico crossplane',
    body: 'Revisão 1.000 km (garantia): óleo grátis + aperto geral + regulagem de corrente. 6.000 km: óleo 10W-40 sintético com filtro (~3,4 L). 12.000 km: óleo + filtro + as 3 velas (troque sempre as 3 juntas) + inspeção do filtro de ar. 18.000 km: óleo + filtro. 18.000-22.000 km: kit de corrente completo (corrente + coroa + pinhão) — antecipe em uso esportivo. 24.000 km: óleo + filtro + velas + regulagem de válvulas conforme manual. A cada 400-500 km: lubrificação da corrente (motor mais potente exige atenção maior que a MT-07). A cada revisão: inspeção de vazamento nas hastes do garfo dianteiro invertido 41 mm e no monoamortecedor traseiro; testar a resposta da suspensão traseira, especialmente se o piloto for mais pesado (considerar upgrade de mola/amortecedor se "fundar" com frequência). Pastilhas de freio: inspecionar a cada 8.000-10.000 km. Fluido de freio DOT 4: 24 meses. A cada 6 meses: verificação da bateria.',
  },
]

// ─── MT-09 TRACER (900 / 900 GT, touring, 2015-atual) ────────────────────────
// Mesmo motor CP3 847/850cc da MT-09 naked, mesma base mecânica de motor —
// mas em configuração TOURING: carenagem frontal, guidão mais alto, banco
// mais confortável, bags laterais (GT de série). GT (2019+): suspensão
// eletrônica semi-ativa, quick shifter bidirecional de série. Uso proposto
// bem diferente da naked: viagens de longa distância vs. uso esportivo urbano.

const MT09TRACER_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesmo motor CP3 850cc tricilíndrico da MT-09 naked — toda manutenção de motor (óleo, 3 velas, válvulas) é IDÊNTICA; o que muda é a proposta de uso (touring vs. naked esportiva)',
    body: 'A MT-09 Tracer (e a Tracer 900 GT) compartilha 100% do motor CP3 847-850cc tricilíndrico com a MT-09 naked: mesmo óleo 10W-40 sintético (~3,4 L com filtro), mesmas 3 velas (uma por cilindro), mesma regulagem de válvulas, mesma corrente de transmissão. A diferença está inteiramente na ciclística: carenagem frontal com para-brisa (ajustável em alguns anos), guidão mais alto e mais próximo do piloto (postura ereta, confortável para viagem), banco mais almofadado, e bagageiro/bags laterais (de série na versão GT). Trate a manutenção mecânica de motor como idêntica à MT-09 naked.',
  },
  {
    severity: 'OK',
    title: 'GT (2019+): suspensão eletrônica semi-ativa que se adapta às condições de pilotagem — requer atenção a mais um sistema eletrônico na manutenção',
    body: 'A versão "900 GT" traz suspensão eletrônica semi-ativa (ajusta amortecimento automaticamente conforme o estilo de pilotagem e carga) e quick shifter bidirecional de série — recursos que a Tracer 900 padrão e a MT-09 naked não têm. Isso significa mais um sistema eletrônico a considerar em diagnósticos: se o comportamento da suspensão parecer inconsistente, verificar códigos de falha (DTC) do módulo de suspensão eletrônica via scanner antes de assumir problema mecânico simples.',
  },
  {
    severity: 'OK',
    title: 'Bags laterais (44 L na GT) e carenagem — uso de touring/viagem; verificar fixação das bags e do para-brisa após estradas ruins ou vento forte em rodovia',
    body: 'A proposta de touring da Tracer inclui bags laterais (capacidade total de 44 litros na versão GT) e carenagem com para-brisa. Em viagens longas por estradas ruins ou com vento lateral forte, verifique periodicamente a fixação das bags e do para-brisa — vibração e vento forte podem afrouxar parafusos de fixação ao longo de uma viagem extensa. Diferente da MT-09 naked (sem esses itens), a Tracer exige essa checagem extra antes de cada viagem longa.',
  },
  {
    severity: 'WARN',
    title: 'Peso maior que a MT-09 naked (carenagem + bags + suspensão eletrônica somam peso) — manobras de baixa velocidade em garagem/estacionamento exigem mais atenção',
    body: 'Com toda a estrutura de touring (carenagem, para-brisa, bags, e na GT a suspensão eletrônica), a MT-09 Tracer é sensivelmente mais pesada que a MT-09 naked. Isso é uma vantagem em estabilidade de rodovia em alta velocidade, mas exige mais atenção em manobras de baixa velocidade (estacionar, sair de garagem) — mantenha os pés firmes e o peso bem distribuído ao manobrar parado ou em velocidade muito baixa.',
  },
]

const MT09TRACER_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Mesma queixa de suspensão traseira "macia" documentada na MT-09 naked — na Tracer, o peso extra de bags/carga em viagem agrava ainda mais o efeito',
    body: 'A queixa de suspensão traseira considerada mole/undersprung, documentada na MT-09 naked, se aplica também à Tracer — e tende a ser mais perceptível aqui porque a moto de touring frequentemente roda com bagagem extra (bags cheias, eventualmente garupa), o que soma peso e evidencia ainda mais a limitação da mola original. Na versão GT, a suspensão eletrônica ajuda a compensar automaticamente, mas na Tracer 900 padrão (suspensão convencional), calibrar bem a pré-carga conforme a carga da viagem é essencial antes de sair de estrada.',
  },
  {
    severity: 'WARN',
    title: 'Sistema de suspensão eletrônica semi-ativa (GT) — mais um ponto de manutenção especializada; diagnóstico requer scanner, não é ajuste manual como na Tracer padrão',
    body: 'Na versão GT, a suspensão semi-ativa eletrônica adiciona complexidade: qualquer comportamento estranho no amortecimento (muito duro, muito mole, não reagindo às mudanças de modo) deve ser diagnosticado com scanner Yamaha antes de qualquer intervenção mecânica manual, já que o sistema é controlado por atuadores eletrônicos, não por ajuste manual de parafusos como na suspensão convencional da Tracer 900 padrão ou da MT-09 naked.',
  },
  {
    severity: 'OK',
    title: 'Motor CP3 mantém a mesma excelente reputação de confiabilidade da MT-09 naked — problemas documentados são de suspensão/eletrônica, não do bloco do motor',
    body: 'Por compartilhar o motor CP3 com a MT-09 naked, a Tracer herda a mesma reputação de confiabilidade mecânica de motor. Os problemas documentados nesta linha concentram-se em suspensão (mola traseira, e na GT o sistema eletrônico) — não há relatos relevantes de falha do bloco do motor tricilíndrico em si.',
  },
]

const MT09TRACER_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção MT-09 Tracer / Tracer 900 GT por km — mesmo motor CP3 850cc da MT-09 naked, ciclística touring',
    body: 'Revisão 1.000 km (garantia): óleo grátis + aperto geral + regulagem de corrente. 6.000 km: óleo 10W-40 sintético com filtro (~3,4 L) — idêntico à MT-09 naked. 12.000 km: óleo + filtro + as 3 velas (troque sempre as 3 juntas) + inspeção do filtro de ar. 18.000 km: óleo + filtro. 18.000-22.000 km: kit de corrente completo. 24.000 km: óleo + filtro + velas + regulagem de válvulas. A cada 400-500 km: lubrificação da corrente. Antes de cada viagem longa: verificar fixação das bags laterais e do para-brisa/carenagem (vibração de estrada ruim afrouxa parafusos). A cada revisão: inspeção de vazamento na suspensão dianteira e no amortecedor traseiro; ajustar pré-carga conforme carga da viagem (bags + garupa). Versão GT: diagnóstico do sistema de suspensão eletrônica semi-ativa via scanner Yamaha se o comportamento parecer inconsistente — não ajustar manualmente. Pastilhas de freio: inspecionar a cada 8.000-10.000 km (peso extra da Tracer pode acelerar o desgaste levemente comparado à naked). Fluido de freio DOT 4: 24 meses. A cada 6 meses: verificação da bateria.',
  },
]

// ─── Tire Pressures ───────────────────────────────────────────────────────────

const TIRE_PRESSURES = [
  {
    modelName: 'MT-01',
    yearFrom: 2005, yearTo: 2012,
    tireSize: '120/70-17 (F) · 190/50-17 (R)',
    frontPsi: 29, rearPsi: 36, frontPsiLoad: 29, rearPsiLoad: 40,
    notes: 'Moto pesada (~200 kg) com pneu traseiro largo (190). Verificar calibragem exata no manual do ano — importação limitada pode ter variação de especificação. Nunca rodar com pneu murcho: moto pesada exige pressão correta para estabilidade.',
  },
  {
    modelName: 'MT-03 660cc',
    yearFrom: 2006, yearTo: 2013,
    tireSize: '110/70-17 (F) · 150/60-17 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'MT-03 legada (monocilíndrica 660cc) — não confundir com a MT-03 atual (321cc). Confirmar medida exata no manual do ano, pode variar entre 2006-2009 e 2010-2013.',
  },
  {
    modelName: 'MT-07',
    yearFrom: 2015, yearTo: 2026,
    tireSize: '120/70-17 (F) · 180/55-17 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Vale para MT-07/MT-07 ABS e MT-07 CONNECTED (mesma mecânica). Uso solo: 29/33 PSI. Com garupa/bagagem: 29/36 PSI. Verificar a cada 15 dias — pneu esportivo perde pressão mais rápido que pneu de uso misto.',
  },
  {
    modelName: 'MT-09 850cc',
    yearFrom: 2015, yearTo: 2026,
    tireSize: '120/70-17 (F) · 180/55-17 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    notes: 'Naked (não confundir com a Tracer). Uso solo: 29/33 PSI. Uso esportivo/pista: consultar tabela específica de pista (geralmente reduz 2-3 PSI). Suspensão invertida 41 mm ajustável — calibrar pré-carga conforme peso do piloto.',
  },
  {
    modelName: 'MT-09 TRACER',
    yearFrom: 2015, yearTo: 2026,
    tireSize: '120/70-17 (F) · 180/55-17 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 39,
    notes: 'Vale para Tracer 900 e Tracer 900 GT. Com bags carregadas + garupa: aumentar para 29/39 PSI traseiro. Verificar calibragem antes de toda viagem longa — peso variável da bagagem afeta diretamente a pressão ideal.',
  },
]

// ─── Manutenção ──────────────────────────────────────────────────────────────

const makeMt01 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 20W-50 mineral/semissintético + filtro (~4,5 L)', intervalKm: 5000, intervalMonths: 6, notes: 'Motor V-twin a AR (não líquido). Sensível ao calor em trânsito parado. Verificar nível com moto na vertical.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Velas (4 unidades — ignição dupla, 2 por cilindro)', intervalKm: 12000, intervalMonths: 18, notes: 'Trocar as 4 juntas. Referência conforme motor Star Road Star/Warrior equivalente.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas', intervalKm: 12000, intervalMonths: 18, notes: 'Motor frio. Consultar manual Star equivalente para folgas exatas.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Inspeção da embreagem multidisco a óleo', intervalKm: 6000, intervalMonths: null, notes: 'Verificar folga do cabo/hidráulica conforme especificação. Poucos relatos de desgaste prematuro.', priority: 'MEDIUM', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Filtro de ar — inspeção/troca', intervalKm: 10000, intervalMonths: 12, notes: 'Inspecionar a cada troca de óleo.', priority: 'MEDIUM', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas de freio + fluido DOT 4', intervalKm: 10000, intervalMonths: 24, notes: 'Moto pesada (~200 kg) — inspecionar desgaste com atenção redobrada.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria — verificação', intervalKm: null, intervalMonths: 6, notes: 'Moto rara/baixo uso no Brasil — usar carregador trickle charge em períodos parados.', priority: 'MEDIUM', order: 7 },
]

const makeMt03_660 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40 + filtro (~2,5-3,0 L)', intervalKm: 6000, intervalMonths: 12, notes: 'Motor MONOCILÍNDRICO 660cc (base XT660) — não confundir com MT-03 321cc atual.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK (referência XT660 equivalente)', intervalKm: 8000, intervalMonths: 12, notes: 'Inspecionar a cada 4.000 km (motor monocilíndrico de curso longo).', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas (5V DOHC)', intervalKm: 12000, intervalMonths: 18, notes: 'Motor frio. 5 válvulas por cilindro — mais componentes que motor 4V simples.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Reaperto geral de carenagem/suportes', intervalKm: 8000, intervalMonths: null, notes: 'Vibração de monocilindro afrouxa parafusos com mais frequência.', priority: 'MEDIUM', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Inspeção do garfo/braço da suspensão traseira', intervalKm: 12000, intervalMonths: 12, notes: 'CRÍTICO: relato documentado de rachadura estrutural. Verificar solda e fixação a cada revisão.', priority: 'CRITICAL', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Limpeza/inspeção do conector do retificador', intervalKm: 8000, intervalMonths: 12, notes: 'Histórico de mau contato por sujeira/vedação insuficiente. Graxa dielétrica ajuda.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit de corrente (O-ring) completo', intervalKm: 18000, intervalMonths: null, notes: 'Motor de torque alto em baixa rotação solicita a corrente mais que multicilindros suaves.', priority: 'HIGH', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria — verificação', intervalKm: null, intervalMonths: 6, notes: 'Moto descontinuada desde 2013 — planeje peças com antecedência.', priority: 'MEDIUM', order: 8 },
]

const makeMt07 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40 sintético + filtro (~2,8 L)', intervalKm: 6000, intervalMonths: 12, notes: 'Motor CP2 689cc paralelo-twin crossplane. Manutenção simples e barata — reputação consolidada.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Velas (2 unidades, uma por cilindro)', intervalKm: 12000, intervalMonths: 18, notes: 'Referência NGK conforme manual do ano.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas', intervalKm: 24000, intervalMonths: 24, notes: 'Motor frio. Intervalo generoso — motor CP2 é conhecido pela durabilidade.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente — lubrificação', intervalKm: 500, intervalMonths: null, notes: 'A cada 500-600 km ou após chuva. Folga conforme manual (30-45 mm).', priority: 'MEDIUM', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit de corrente completo', intervalKm: 22000, intervalMonths: null, notes: 'Coroa + pinhão + corrente. Uso normal de rua: 20.000-25.000 km.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Inspeção de vazamento em suspensão (dianteira/traseira)', intervalKm: 8000, intervalMonths: 12, notes: 'Relatos documentados de vazamento em amortecedor mesmo com moto parada. Verificar hastes e corpo do amortecedor.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas de freio + fluido DOT 4', intervalKm: 9000, intervalMonths: 24, notes: 'Inspecionar a cada 8.000-10.000 km.', priority: 'HIGH', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria — verificação', intervalKm: null, intervalMonths: 6, notes: 'Vale igualmente para a versão CONNECTED — mesma mecânica.', priority: 'MEDIUM', order: 8 },
]

const makeMt09 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40 sintético + filtro (~3,4 L)', intervalKm: 6000, intervalMonths: 12, notes: 'Motor CP3 850cc tricilíndrico crossplane.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Velas (3 unidades, uma por cilindro)', intervalKm: 12000, intervalMonths: 18, notes: 'Trocar sempre as 3 juntas, mesmo com desgaste desigual entre elas.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas', intervalKm: 24000, intervalMonths: 24, notes: 'Motor frio. Conforme especificação do manual do ano.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente — lubrificação', intervalKm: 450, intervalMonths: null, notes: 'Mais frequente que a MT-07: motor mais potente solicita mais a corrente.', priority: 'MEDIUM', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit de corrente completo', intervalKm: 20000, intervalMonths: null, notes: 'Antecipar em uso esportivo/agressivo.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Inspeção de vazamento em suspensão (garfo invertido 41mm + monoamortecedor)', intervalKm: 8000, intervalMonths: 12, notes: 'Relatos documentados de vazamento e de mola traseira "macia"/undersprung. Considerar upgrade se piloto >90 kg ou uso esportivo.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas de freio + fluido DOT 4', intervalKm: 9000, intervalMonths: 24, notes: 'Inspecionar a cada 8.000-10.000 km.', priority: 'HIGH', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria — verificação', intervalKm: null, intervalMonths: 6, notes: null, priority: 'MEDIUM', order: 8 },
]

const makeMt09Tracer = (m: string, yf: number, yt: number, isGT: boolean): MaintenanceItemInput[] => {
  const items: MaintenanceItemInput[] = [
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40 sintético + filtro (~3,4 L)', intervalKm: 6000, intervalMonths: 12, notes: 'Motor CP3 850cc — idêntico à MT-09 naked.', priority: 'CRITICAL', order: 1 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Velas (3 unidades, uma por cilindro)', intervalKm: 12000, intervalMonths: 18, notes: 'Trocar sempre as 3 juntas.', priority: 'HIGH', order: 2 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas', intervalKm: 24000, intervalMonths: 24, notes: 'Motor frio.', priority: 'HIGH', order: 3 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente — lubrificação', intervalKm: 450, intervalMonths: null, notes: 'Igual à MT-09 naked.', priority: 'MEDIUM', order: 4 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit de corrente completo', intervalKm: 20000, intervalMonths: null, notes: null, priority: 'HIGH', order: 5 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Inspeção de vazamento em suspensão + calibração de pré-carga conforme carga de viagem', intervalKm: 8000, intervalMonths: 12, notes: 'Mola traseira mole é mais perceptível com bagagem/garupa. Ajustar pré-carga antes de viagem longa.', priority: 'HIGH', order: 6 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Verificação de fixação de bags laterais e para-brisa/carenagem', intervalKm: null, intervalMonths: null, notes: 'Antes de cada viagem longa — vibração de estrada ruim e vento afrouxam parafusos.', priority: 'MEDIUM', order: 7 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pastilhas de freio + fluido DOT 4', intervalKm: 8500, intervalMonths: 24, notes: 'Peso extra da Tracer pode acelerar levemente o desgaste comparado à naked.', priority: 'HIGH', order: 8 },
    { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria — verificação', intervalKm: null, intervalMonths: 6, notes: null, priority: 'MEDIUM', order: 9 },
  ]

  if (isGT) {
    items.push({
      modelName: m, yearFrom: yf, yearTo: yt,
      component: 'Diagnóstico do sistema de suspensão eletrônica semi-ativa (scanner)',
      intervalKm: null, intervalMonths: 12,
      notes: 'GT: suspensão eletrônica + quick shifter bidirecional de série. Comportamento inconsistente exige leitura de DTC via scanner Yamaha, não ajuste manual.',
      priority: 'MEDIUM', order: 10,
    })
  }

  return items
}

// ─── BLOCKS ───────────────────────────────────────────────────────────────────

const BLOCKS = [
  { modelName: 'MT-01',        yearFrom: 2005, yearTo: 2012, MACETES: MT01_MACETES,        PROBLEMAS: MT01_PROBLEMAS,        MANUTENCAO: MT01_MANUTENCAO        },
  { modelName: 'MT-03 660cc',  yearFrom: 2006, yearTo: 2013, MACETES: MT03_660_MACETES,     PROBLEMAS: MT03_660_PROBLEMAS,    MANUTENCAO: MT03_660_MANUTENCAO    },
  { modelName: 'MT-07',        yearFrom: 2015, yearTo: 2026, MACETES: MT07_MACETES,         PROBLEMAS: MT07_PROBLEMAS,        MANUTENCAO: MT07_MANUTENCAO        },
  { modelName: 'MT-09 850cc',  yearFrom: 2015, yearTo: 2026, MACETES: MT09_MACETES,         PROBLEMAS: MT09_PROBLEMAS,        MANUTENCAO: MT09_MANUTENCAO        },
  { modelName: 'MT-09 TRACER', yearFrom: 2015, yearTo: 2026, MACETES: MT09TRACER_MACETES,   PROBLEMAS: MT09TRACER_PROBLEMAS,  MANUTENCAO: MT09TRACER_MANUTENCAO  },
]

const ALL_MANUTENCAO: MaintenanceItemInput[] = [
  ...makeMt01('MT-01', 2005, 2012),
  ...makeMt03_660('MT-03 660cc', 2006, 2013),
  ...makeMt07('MT-07', 2015, 2026),
  ...makeMt09('MT-09 850cc', 2015, 2026),
  // Tracer 900 padrão (sem suspensão eletrônica): 2015-2018 e Tracer 900/GT convivem depois;
  // aplicamos o bloco "não-GT" para o período inicial e o "GT" a partir de 2019 (chegada da GT).
  ...makeMt09Tracer('MT-09 TRACER', 2015, 2018, false),
  ...makeMt09Tracer('MT-09 TRACER', 2019, 2026, true),
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
