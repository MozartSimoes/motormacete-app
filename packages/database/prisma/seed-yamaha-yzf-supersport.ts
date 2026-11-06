// seed-yamaha-yzf-supersport.ts — Yamaha YZF Thunderace 1000 · YZF Thundercat 600 ·
// YZF 750 · YZF R-1 1000 · YZF R-1M 1000 · YZF R-3 (321/ABS + CONNECTED + World GP) · YZF R-6 600
//
// YZF 1000 THUNDERACE (1996-2002 BR): 4 cilindros em linha 1002cc DOHC 20V refrigerado a
//   líquido — motorização derivada da FZR1000/Genesis, sport-touring de alta cilindrada.
// YZF 600 THUNDERCAT (1996-2003 BR): 4 cilindros em linha 599cc DOHC 16V refrigerado a
//   líquido — irmã menor da Thunderace, mais ágil, base para a futura R6.
// YZF 750 (1993-1998 BR): 4 cilindros em linha 749cc DOHC 20V (5 válvulas/cilindro,
//   tecnologia "Genesis"), moto esportiva/sport-touring anterior à era R-1/R-6.
// YZF R-1 1000 (1998-2024 BR, várias gerações): 4 cilindros em linha ~998cc DOHC 16V,
//   motor crossplane a partir de 2009 (ordem de explosão irregular tipo MotoGP M1).
// YZF R-1M 1000 (2015-2024 BR): mesma base da R-1 mas com suspensão eletrônica semi-ativa
//   Öhlins ERS, eletrônica de pista mais completa (comunicação com data logger), carbono.
// YZF R-3 (2015-2024 BR, variantes 321/ABS, CONNECTED, World GP): bicilíndrico paralelo
//   321cc DOHC 8V refrigerado a líquido — entry-level esportiva de médio porte.
// YZF R-6 600 (1999-2020 BR): 4 cilindros em linha 599cc DOHC 16V alta rotação (>17.000
//   rpm), motor supersport puro-sangue, referência de pista na categoria 600cc.
//
// ATENÇÃO — matching de modelName com a FIPE (ver apps/web/app/api/tips/route.ts::matchesStoredName):
// testado programaticamente (script node contra as ~145 strings da FIPE Yamaha atual, ver
// scratchpad da sessão): "YZF R-1" bare NÃO bate em "YZF R-1M 1000" (o "M" é caractere de
// palavra colado ao "1", sem boundary ali) — por segurança e clareza, usamos os modelName
// COMPLETOS "YZF R-1 1000" e "YZF R-1M 1000" (cada um bate em exatamente 1 string FIPE).
// "YZF R-3" bare bate nas 4 variantes atuais da FIPE (321/ABS, CONNECTED 321 ABS, CONNECTED
// 321 ABS 70th ANNIVERSARY, World GP 60th ANNIVERSARY ED.) e SÓ nelas — são a mesma mecânica
// (321cc bicilíndrico), só mudando pintura/edição/conectividade, e NÃO colide com "YZF R-15"
// (155cc, já cadastrada em seed-yamaha-street-pequenas.ts) nem com nenhum outro modelName já
// usado nos demais seed-yamaha-*.ts. "YZF R-6" bare é seguro (só existe "YZF R-6 600" na FIPE
// hoje). "YZF 600 THUNDERCAT", "YZF 1000 THUNDERACE" e "YZF 750" batem cada um em exatamente
// 1 string. Nenhuma colisão cruzada verificada com os modelName de outros arquivos seed-yamaha.
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

// ─── YZF 1000 THUNDERACE (1996-2002) ──────────────────────────────────────────

const THUNDERACE_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 1002cc 4 cilindros DOHC 20V (5 válvulas/cilindro, tecnologia Genesis) — óleo 10W-40 sintético, 3,8 L com filtro; troca a cada 6.000 km',
    body: 'A Thunderace usa o bloco Genesis de 4 cilindros em linha, 5 válvulas por cilindro (20 no total), refrigerado a líquido, derivado da FZR1000. Capacidade de óleo: 3,8 L com troca de filtro (3,5 L sem troca de filtro). Óleo recomendado: 10W-40 semissintético ou sintético API SG/SH, JASO MA. Filtro: Hiflofiltro HF303 ou similar (rosca padrão Yamaha grande porte). Troca de óleo: 6.000 km em uso normal, 4.000-5.000 km se rodar em pista/alta rotação com frequência — motor de 5 válvulas sofre mais com óleo degradado em altas RPM sustentadas.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK DPR8EA-9 (gap 0,8-0,9 mm) — 4 velas, acesso pelo tanque; troca a cada 12.000 km',
    body: 'A Thunderace usa 4 velas NGK DPR8EA-9 (gap 0,8-0,9 mm), uma por cilindro. Acesso: necessário levantar/remover o tanque de combustível (carenagem + reservatório de expansão do radiador ficam no caminho). Troca: 12.000 km em uso normal. Iridium NGK DPR8EIX-9: opção de maior durabilidade (até 20.000 km) e ignição mais consistente em alta rotação — recomendado dado o custo de mão de obra para acessar as velas.',
  },
  {
    severity: 'WARN',
    title: 'Corrente de comando (cam chain) e tensionador automático — desgaste com ruído metálico em partida a frio após 40.000-50.000 km; tensionador manual em alguns anos exige regulagem periódica',
    body: 'Motores Genesis de 5 válvulas com muitos km (40.000+) apresentam ruído de corrente de comando na partida a frio, que desaparece após alguns segundos de aquecimento — sinal de tensionador com folga. Nos primeiros anos de fabricação (1996-1998) o tensionador é semi-manual e requer verificação/ajuste periódico; anos posteriores usam tensionador automático hidráulico. Ruído persistente mesmo após aquecido: tensionador falhando, requer substituição (peça de importação, disponibilidade limitada no Brasil — planeje prazo de entrega).',
  },
  {
    severity: 'WARN',
    title: 'Carburadores Mikuni (4x, um por cilindro) — sincronismo desregula com o tempo; sintoma de marcha lenta instável e vibração excessiva; sincronizar a cada 12.000 km',
    body: 'A Thunderace é carburada (4x Mikuni CV, um por cilindro) em toda sua produção no Brasil — não teve versão injetada aqui. Com o uso, os carburadores perdem sincronismo entre si, causando marcha lenta instável, vibração fora do normal e perda de suavidade na resposta do acelerador. Sincronização: mecânico especializado com vacuômetro de 4 vias, a cada 12.000 km ou ao notar sintomas. Boias entupidas com etanol parado (>2-3 semanas): mesmo risco de qualquer carburador flex/gasolina — esgote o combustível do carburador antes de guardar por período longo.',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão 530 com anéis-o — kit completo (corrente + coroa 45T + pinhão 17T, valores de referência) a cada 20.000-25.000 km',
    body: 'Transmissão final por corrente 530 com anéis-o (o-ring), adequada à potência de mais de 140 cv do motor. Kit DID 530VX3 ou RK 530XSO (com anel-o, resistente à alta potência). Lubrificação: a cada 500-600 km, spray específico para corrente com o-ring (não usar querosene ou diesel para limpeza — danifica os anéis-o). Frouxidão: 25-35 mm de folga vertical no ramo inferior, verificar a cada 2.000 km dado o torque elevado do motor.',
  },
  {
    severity: 'WARN',
    title: 'Peça de reposição escassa — moto descontinuada há mais de 20 anos no Brasil; carenagens, discos de embreagem e itens elétricos específicos exigem importação ou desmanche',
    body: 'A Thunderace não é mais vendida/importada oficialmente há duas décadas. Peças de motor de desgaste comum (juntas, retentores, rolamentos) ainda são encontradas em rolamentarias e lojas de peças genéricas por medida. Peças específicas de carenagem, CDI, e componentes elétricos originais: procurar em grupos de owners (fóruns e redes sociais de Thunderace Brasil) ou fornecedores de importação (Reino Unido/Japão, onde a moto teve produção maior e mercado de peças mais aquecido).',
  },
]

const THUNDERACE_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Regulador retificador (rectifier) — ponto fraco documentado de motos Yamaha desta era; falha causa bateria fraca ou sobrecarga do sistema elétrico',
    body: 'O regulador retificador da Thunderace (assim como de muitas Yamaha dos anos 1990) é um ponto de falha conhecido: com o tempo, superaquece e passa a regular mal a carga, resultando em bateria descarregada (sintoma: farol fraco em marcha lenta) ou, no extremo oposto, sobrecarga que danifica a bateria e outros componentes elétricos. Verificação: voltagem na bateria com o motor em 3.000-4.000 rpm deve ficar entre 13,5-14,8V. Fora dessa faixa: regulador suspeito. Substituição preventiva em motos com mais de 60.000 km ou histórico de troca frequente de bateria é recomendada.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo pela junta do cárter e retentores do motor com a idade — comum em motos com 25+ anos de uso; inspeção visual a cada troca de óleo',
    body: 'Dado o tempo de uso (motos fabricadas entre 1996-2002), é comum encontrar pequenos vazamentos de óleo pela junta do cárter, retentor do eixo de manivelas ou retentor da haste do câmbio, causados pelo endurecimento natural das borrachas/juntas com o tempo. Vazamento leve (manchas, sem gotejamento): monitorar. Gotejamento visível: trocar a junta/retentor correspondente — não é falha de projeto, é desgaste natural esperado em motor com décadas de uso.',
  },
  {
    severity: 'WARN',
    title: 'Disponibilidade de pneus originais — medidas 120/70-17 (F) e 170/60-17 ou 180/55-17 (R, conforme ano) ainda disponíveis, mas com menos opções de marca que motos atuais',
    body: 'Os aros e medidas de pneu da Thunderace ainda são fabricados atualmente (aro 17" é padrão até hoje), mas com menos variedade de marcas/modelos comparado a motos recentes — a maioria dos fabricantes foca linhas mais modernas. Pirelli Angel GT, Michelin Pilot Road 4/5 e Metzeler Roadtec 01 são compatíveis nas medidas corretas (confirmar a medida gravada no pneu original antes de comprar, pois pode variar entre anos/versões).',
  },
]

const THUNDERACE_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção Thunderace 1000 por km — motor Genesis 5 válvulas, carburado',
    body: 'Revisão inicial (garantia, quando aplicável): óleo + aperto geral. 6.000 km: óleo 10W-40 (3,8 L com filtro, Hiflofiltro HF303) + filtro de ar. 12.000 km: óleo + filtro + 4 velas NGK DPR8EA-9 (gap 0,8-0,9 mm) + sincronização dos 4 carburadores Mikuni + regulagem de válvulas (consultar manual, folgas específicas por motor 5 válvulas). 18.000 km: óleo + filtro. 20.000-25.000 km: kit de corrente 530 completo (corrente com anel-o + coroa + pinhão). 24.000 km: óleo + filtro + velas + sincronização de carburadores + regulagem de válvulas. A cada 500-600 km: lubrificação da corrente com produto específico para anel-o. A cada 2.000 km: verificação de folga da corrente (25-35 mm). Anualmente ou a cada 12 meses: verificação do regulador retificador (voltagem de carga 13,5-14,8V a 3.000-4.000 rpm) — ponto de falha conhecido desta geração. A cada troca de óleo: inspeção visual de vazamentos no cárter e retentores (natural em motos com décadas de uso). Combustível parado >2-3 semanas: esgotar os carburadores antes de guardar.',
  },
]

// ─── YZF 600 THUNDERCAT (1996-2003) ───────────────────────────────────────────

const THUNDERCAT_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 599cc 4 cilindros DOHC 16V refrigerado a líquido — óleo 10W-40, 3,0-3,3 L com filtro; base mecânica que originou a futura R6',
    body: 'A Thundercat usa motor 4 cilindros em linha 599cc DOHC 16 válvulas (4 por cilindro), refrigerado a líquido — a mesma linhagem de desenvolvimento que deu origem à R6 (lançada em 1999, mais orientada a pista). A Thundercat é mais voltada a uso misto (sport-touring/esportiva de rua) que a R6 (pista pura). Óleo: 10W-40 API SG/SH JASO MA, 3,0-3,3 L com troca de filtro. Filtro: Hiflofiltro HF303 (compatível com a família de 4 cilindros Yamaha desta era). Troca: 6.000 km uso normal, 5.000 km uso esportivo frequente.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK DPR9EA-9 (gap 0,8-0,9 mm) — 4 velas, acesso pelo tanque; troca a cada 10.000-12.000 km',
    body: 'A Thundercat usa 4 velas NGK DPR9EA-9 (gap 0,8-0,9 mm) — uma vela de grau térmico ligeiramente mais quente que a Thunderace, adequada à rotação mais alta deste motor 600cc. Acesso: remoção do tanque necessária. Troca: 10.000-12.000 km. Iridium equivalente (consultar catálogo NGK atualizado): melhora a ignição em alta rotação e estende o intervalo.',
  },
  {
    severity: 'WARN',
    title: 'Carburadores Mikuni (4x) desregulam o sincronismo com o tempo — sintoma de marcha lenta instável; mesmo cuidado da Thunderace com etanol parado no carburador',
    body: 'Assim como a Thunderace, a Thundercat é 100% carburada (4x Mikuni CV) — sem versão injetada no Brasil. Sincronismo entre os 4 carburadores se perde com o uso, causando marcha lenta instável e vibração. Sincronizar a cada 12.000 km com vacuômetro de 4 vias. Etanol parado no carburador por mais de 2-3 semanas: risco de verniz/entupimento — esgotar o combustível do carburador antes de guardar a moto por período longo.',
  },
  {
    severity: 'OK',
    title: 'Alta rotação de trabalho (motor "gira" mais que motos de baixa cilindrada) — troca de óleo mais frequente que a recomendação genérica se o uso for esportivo/pista',
    body: 'Motor de 599cc/16V trabalha em rotações mais altas que motos de cilindrada equivalente com menos válvulas — em uso esportivo (acelerações e frenagens fortes, uso em pista/trackday) o óleo degrada mais rápido. Reduza o intervalo de troca de óleo para 4.000-5.000 km se o uso incluir pista ou condução esportiva frequente em vias públicas.',
  },
  {
    severity: 'WARN',
    title: 'Peça de reposição escassa — moto descontinuada há mais de 20 anos; carenagens e itens específicos exigem importação ou desmanche especializado',
    body: 'A Thundercat não é mais comercializada no Brasil há décadas. Peças de desgaste genérico (retentores, juntas, rolamentos) são fáceis de achar por medida em rolamentarias. Peças específicas de carenagem, CDI e componentes elétricos originais: buscar em grupos de owners ou fornecedores de importação — o mercado de peças da Thundercat no Reino Unido (onde teve produção maior) é mais aquecido que no Brasil.',
  },
]

const THUNDERCAT_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Regulador retificador — mesmo ponto fraco documentado da Thunderace e de motos Yamaha desta era; verificar voltagem de carga periodicamente',
    body: 'A Thundercat compartilha o sistema elétrico da mesma geração da Thunderace, incluindo a vulnerabilidade do regulador retificador. Sintomas: bateria descarregando sem motivo aparente, farol fraco em marcha lenta, ou superaquecimento do bloco regulador (pode ficar quente ao toque em uso prolongado). Verificação: voltagem na bateria a 3.000-4.000 rpm deve estar entre 13,5-14,8V. Substituição preventiva recomendada em motos com uso intenso ou histórico de problema de bateria.',
  },
  {
    severity: 'WARN',
    title: 'Corrente de comando com ruído em partida a frio após muitos km rodados — sinal de tensionador com folga, comum em motores desta geração com uso prolongado',
    body: 'Assim como a Thunderace, motores 4 cilindros Yamaha desta era (1996-2003) podem apresentar ruído metálico de corrente de comando na partida a frio em motos com 40.000+ km, que desaparece após o motor aquecer. É sinal de tensionador com folga — se o ruído persistir mesmo com o motor quente, o tensionador deve ser inspecionado/substituído por mecânico especializado em motor de múltiplos cilindros.',
  },
  {
    severity: 'OK',
    title: 'Vazamentos de óleo pela idade (juntas e retentores) — natural em motos com 20+ anos; inspeção visual a cada troca de óleo',
    body: 'Motos desta idade (fabricadas entre 1996-2003) frequentemente apresentam pequenos vazamentos por endurecimento natural de juntas e retentores. Vazamento leve: monitorar. Gotejamento visível: trocar o componente correspondente. Não é falha de projeto — é desgaste esperado por tempo de uso, independente da quilometragem rodada.',
  },
]

const THUNDERCAT_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção Thundercat 600 por km — motor 4 cilindros 16V, carburado',
    body: 'Revisão inicial (quando aplicável): óleo + aperto geral. 6.000 km: óleo 10W-40 (3,0-3,3 L com filtro, Hiflofiltro HF303) + filtro de ar — reduza para 4.000-5.000 km em uso esportivo/pista frequente. 10.000-12.000 km: óleo + filtro + 4 velas NGK DPR9EA-9 (gap 0,8-0,9 mm) + sincronização dos 4 carburadores Mikuni + regulagem de válvulas (consultar manual). 18.000 km: óleo + filtro. 20.000-24.000 km: kit de corrente completo (corrente com anel-o + coroa + pinhão, medida conforme manual). A cada 500-600 km: lubrificação da corrente com produto específico para anel-o. A cada 2.000 km: verificação de folga da corrente. Anualmente: verificação do regulador retificador (voltagem de carga 13,5-14,8V a 3.000-4.000 rpm). A cada troca de óleo: inspeção visual de vazamentos no cárter e retentores. Combustível parado >2-3 semanas: esgotar os carburadores antes de guardar a moto.',
  },
]

// ─── YZF 750 (1993-1998) ──────────────────────────────────────────────────────

const YZF750_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 749cc 4 cilindros DOHC 20V (5 válvulas/cilindro, tecnologia Genesis) — antecessora direta da linha Thunderace/R-1; óleo 10W-40, ~3,7 L com filtro',
    body: 'A YZF 750 é uma das primeiras Yamaha esportivas de 4 cilindros com tecnologia "Genesis" de 5 válvulas por cilindro (20 válvulas no total) a chegar ao Brasil, anterior à era R-1/R-6 — não confundir com a atual "YZF R-1 1000" ou "YZF R-6 600", motos de gerações e propósitos diferentes lançadas anos depois. Óleo: 10W-40 API SG/SH, aproximadamente 3,7 L com troca de filtro. Filtro: Hiflofiltro compatível com a família Genesis 750/1000 desta era. Troca: 6.000 km em uso normal.',
  },
  {
    severity: 'WARN',
    title: 'Moto com mais de 25 anos de fabricação — peças originais raras; priorize desmanches especializados e grupos de colecionadores/owners para itens específicos',
    body: 'A YZF 750 foi vendida no Brasil entre 1993-1998, tornando-a a mais antiga desta família de motos esportivas Yamaha. Peças de desgaste genérico (juntas, retentores, rolamentos, correntes) são encontráveis por medida em qualquer boa loja de peças. Peças específicas (carenagem, CDI, discos de embreagem originais, componentes elétricos): a disponibilidade é baixa no Brasil — grupos de colecionadores e fóruns internacionais (especialmente Europa, onde a moto teve maior volume de vendas) são a fonte mais confiável.',
  },
  {
    severity: 'WARN',
    title: 'Carburadores Mikuni (4x) — combustível moderno com etanol pede atenção redobrada em moto com décadas de idade; vedações de borracha originais já ressecadas',
    body: 'A YZF 750 foi projetada para gasolina pura da década de 1990, sem qualquer adaptação para etanol brasileiro atual. As vedações de borracha originais dos carburadores (após décadas) provavelmente já estão ressecadas e precisam de substituição preventiva com kits de reparo atualizados (viton, mais resistentes a etanol) antes de rodar com regularidade. Recomenda-se revisão completa dos 4 carburadores por especialista em motos clássicas antes de qualquer uso intenso.',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão — kit completo a cada 20.000 km; considere corrente com anel-o mesmo que o original não tivesse, para maior durabilidade',
    body: 'Ainda que a especificação original de fábrica possa ter usado corrente sem anel-o (tecnologia da época), a reposição atual com corrente com anel-o (o-ring) — DID ou RK equivalente na medida correta — aumenta significativamente a durabilidade e reduz a necessidade de lubrificação frequente. Consultar a medida exata (passo e número de elos) no manual ou com a coroa/pinhão original antes de comprar.',
  },
]

const YZF750_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Sistema elétrico envelhecido — chicote, conectores e regulador retificador com risco elevado de falha por oxidação e ressecamento após 25+ anos',
    body: 'Em uma moto com mais de duas décadas e meia, o maior risco não é o motor (robusto e bem documentado) mas o sistema elétrico: chicotes ressecados, conectores oxidados e regulador retificador original no fim da vida útil. Revisão completa do sistema elétrico (limpeza de contatos, teste de continuidade do chicote, substituição do regulador se necessário) é recomendada antes de uso regular, especialmente se a moto ficou parada por longos períodos antes da aquisição.',
  },
  {
    severity: 'WARN',
    title: 'Vazamentos de óleo generalizados pela idade — juntas e retentores originais já cumpriram vida útil muito além do esperado',
    body: 'É esperado encontrar vazamentos de óleo em diversos pontos (cárter, tampa de válvulas, retentores de eixo) em uma moto desta idade, mesmo com baixa quilometragem — a borracha das vedações se deteriora pelo tempo, não apenas pelo uso. Revisão geral de juntas e retentores é recomendada ao adquirir uma unidade que não teve manutenção preventiva recente documentada.',
  },
  {
    severity: 'OK',
    title: 'Pneus — medidas antigas podem não ter mais tanta variedade de marcas; aro pode diferir de motos esportivas atuais',
    body: 'Verifique a medida exata gravada no pneu original (pode ser diferente das medidas modernas de aro 17" que dominam o mercado atual). Se a medida original estiver em desuso, será necessário migrar para uma medida equivalente disponível atualmente — consulte um especialista em motos clássicas para garantir compatibilidade de geometria e frenagem.',
  },
]

const YZF750_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma de manutenção YZF 750 — motor Genesis 5 válvulas, moto de coleção/uso clássico',
    body: 'Antes do uso regular (moto de coleção ou recém-adquirida): revisão geral completa — troca de todos os fluidos, inspeção de mangueiras de combustível e freio (borracha ressecada após décadas), kits de reparo dos 4 carburadores Mikuni (vedações viton), revisão do sistema elétrico completo (chicote, conectores, regulador retificador). 6.000 km: óleo 10W-40 (~3,7 L com filtro) + filtro de ar. 12.000 km: óleo + filtro + velas NGK (consultar especificação por ano de fabricação) + sincronização dos carburadores + regulagem de válvulas. A cada 500-600 km: lubrificação da corrente. A cada 20.000 km: kit de corrente completo. Anualmente (mesmo com baixo uso): verificação do sistema elétrico e do regulador retificador — moto de coleção que roda pouco tem risco elevado de falha por tempo parado, não por quilometragem. Combustível: nunca deixar etanol parado no carburador por mais de 1-2 semanas — o risco de verniz é ainda maior em vedações originais já envelhecidas.',
  },
]

// ─── YZF R-1 1000 (1998-2024, múltiplas gerações) ─────────────────────────────

const R1_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor ~998cc 4 cilindros DOHC 16V — atenção: gerações pré-2009 têm ordem de explosão convencional (firing order tradicional), 2009+ usa motor CROSSPLANE (ordem irregular, som e entrega de torque característicos tipo MotoGP M1)',
    body: 'A YZF R-1 passou por múltiplas gerações no Brasil desde 1998, com mudanças profundas de motor: até 2008, motor com virabrequim convencional (firing order igualmente espaçado). A partir de 2009, motor CROSSPLANE — virabrequim com pinos a 90°, ordem de explosão irregular que produz som e curva de torque completamente diferentes (mais linear, menos "explosivo" na entrega), tecnologia derivada direto da MotoGP (M1). Para manutenção: identifique a geração/ano antes de comprar peças de motor (virabrequim, bielas, mancais NÃO são intercambiáveis entre pré/pós-2009). Óleo: 10W-40 ou 15W-50 sintético JASO MA2, aproximadamente 3,7-4,0 L com filtro (verificar especificação exata por ano/geração).',
  },
  {
    severity: 'OK',
    title: 'Vela NGK específica por geração — gerações modernas (injeção eletrônica com múltiplos mapas) usam vela iridium de fábrica; troca a cada 12.000-16.000 km',
    body: 'A partir da geração com injeção eletrônica completa (todas as R-1 vendidas no Brasil desde o início dos anos 2000 já são injetadas), a vela de série tende a ser iridium (maior durabilidade). Consulte a especificação exata (NGK) por ano/geração no manual do proprietário, pois a rosca/gap variam entre gerações. Troca: 12.000-16.000 km conforme especificação do fabricante para vela iridium. Acesso: geralmente requer remoção parcial da carenagem/tanque — planejar tempo de serviço maior que motos de rua comuns.',
  },
  {
    severity: 'WARN',
    title: 'Embreagem antihopping (slipper clutch, gerações 2009+) — regulagem e desgaste de discos exigem atenção redobrada em uso de pista/trackday',
    body: 'A partir da geração crossplane (2009+), a R-1 passou a equipar embreagem antihopping (slipper clutch), que reduz o efeito de "pulo" da roda traseira em reduções de marcha agressivas. Em uso intenso de pista, os discos de fricção e o mecanismo de rampa da embreagem antihopping desgastam mais rápido que em uso de rua — inspeção a cada trackday ou a cada 5.000 km de uso misto. Óleo de motor errado (viscosidade muito baixa ou aditivo de fricção "friction modifier" para carro) pode fazer a embreagem escorregar — use sempre óleo JASO MA/MA2 específico para moto.',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão 530 (verificar medida exata por ano) — kit completo a cada 15.000-18.000 km em uso de pista, 20.000-24.000 km em uso misto',
    body: 'Transmissão final por corrente 530 com anel-o, dimensionada para a alta potência do motor (mais de 170-200 cv conforme a geração). DID ZVM-X ou RK GB530XSO (alta performance, recomendadas para motos de mais de 150 cv). Lubrificação: a cada 400-500 km, mais frequente em uso de pista (calor extremo degrada o lubrificante mais rápido). Kit completo: 15.000-18.000 km em uso de trackday frequente, 20.000-24.000 km em uso predominantemente de rua.',
  },
  {
    severity: 'WARN',
    title: 'Eletrônica de gerenciamento (ECU, mapas de potência, controle de tração, quickshifter conforme geração) — atualização de firmware e calibração devem ser feitas em concessionária/especialista Yamaha',
    body: 'Gerações mais recentes da R-1 (2015+) possuem eletrônica sofisticada: múltiplos mapas de potência, controle de tração ajustável, quickshifter bidirecional (conforme versão), IMU (unidade de medição inercial) para controle de curva. Qualquer sintoma de mau funcionamento eletrônico (luz de injeção acesa, controle de tração atuando de forma anormal) deve ser diagnosticado com scanner específico Yamaha — não é recomendável tentar reparo eletrônico sem equipamento adequado, dado o custo e a complexidade dos módulos.',
  },
  {
    severity: 'OK',
    title: 'Pneus esportivos de alta performance — pressões mais críticas que motos de rua comum; verificar antes de CADA saída, especialmente em uso de pista',
    body: 'A R-1 exige pneus esportivos de alta performance (Pirelli Diablo Supercorsa, Michelin Power GP, Bridgestone Battlax RS11 ou equivalente) nas medidas 120/70-17 (F) e 190/55-17 ou 200/55-17 (R, conforme geração/ano — confirme a medida exata gravada no pneu original). Calibragem crítica: 1-2 PSI a menos ou a mais que a especificação altera significativamente o comportamento em curva a alta velocidade. Verificar SEMPRE antes de rodar, especialmente antes de uso de pista.',
  },
]

const R1_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Superaquecimento em trânsito urbano parado — motor de alta performance não foi projetado para uso predominante em engarrafamento; ventoinha trabalha no limite',
    body: 'Como moto de pista/alta performance, a R-1 tem radiador e ventoinha dimensionados para dissipar calor em movimento (velocidade e fluxo de ar constante). Em trânsito urbano parado por longos períodos, a temperatura pode subir mais que o esperado, com a ventoinha trabalhando continuamente. Não é um defeito, é característica do projeto — evite uso predominantemente urbano parado sem monitorar o marcador de temperatura, e considere desligar o motor em paradas muito longas (acima de 10-15 minutos parado no trânsito).',
  },
  {
    severity: 'WARN',
    title: 'Custo elevado de manutenção e peças — motor de alta performance com componentes de precisão; qualquer serviço de motor exige especialista Yamaha ou oficina de alta performance',
    body: 'Diferente de motos de rua comuns, a R-1 exige mão de obra especializada e peças originais/de alta qualidade para qualquer serviço de motor (regulagem de válvulas, embreagem, eletrônica). O custo de manutenção é significativamente mais alto que motos street/trail da mesma marca — planeje orçamento de manutenção compatível com o perfil de moto esportiva de alta cilindrada antes da compra.',
  },
  {
    severity: 'WARN',
    title: 'Uso predominante de pista acelera desgaste de praticamente todos os componentes — pneus, freios, embreagem e corrente duram muito menos que em uso de rua',
    body: 'Se a R-1 for usada com frequência em trackday/pista, TODOS os intervalos de manutenção deste documento devem ser reduzidos significativamente: pneus podem durar apenas 1-3 trackdays, pastilhas de freio de pista duram poucas sessões, fluido de freio deve ser trocado com maior frequência (absorve umidade mais rápido com o calor extremo de pista, risco de "fading"). Trate os intervalos aqui descritos como valores de uso de RUA — uso de pista exige inspeção após CADA sessão.',
  },
]

const R1_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção YZF R-1 por km — motor de alta performance, gerações pré/pós-crossplane (2009)',
    body: 'Revisão inicial (garantia, quando aplicável): óleo + aperto geral + verificação de torque em parafusos críticos (motor de alta potência gera mais vibração). 6.000 km: óleo sintético 10W-40 ou 15W-50 JASO MA2 (~3,7-4,0 L com filtro, verificar especificação exata por ano) + filtro de ar. 12.000 km: óleo + filtro + vela (consultar especificação por geração) + regulagem de válvulas (consultar manual — folgas variam entre gerações pré/pós-crossplane). 18.000 km: óleo + filtro. 15.000-18.000 km (pista) ou 20.000-24.000 km (rua): kit de corrente 530 completo (corrente de alta performance DID ZVM-X ou RK GB530XSO + coroa + pinhão). A cada 400-500 km: lubrificação da corrente (mais frequente em uso de pista). A cada trackday: inspeção de pastilhas de freio, fluido de freio, pneus e discos de embreagem antihopping (gerações 2009+). A cada 24 meses ou uso intenso de pista: troca de fluido de freio DOT 4 (absorve umidade mais rápido com calor extremo). Eletrônica (gerações 2015+): atualização de firmware e diagnóstico via scanner Yamaha ao notar qualquer anomalia (luz de injeção, controle de tração atuando fora do esperado). Sempre verificar pressão dos pneus antes de cada saída — pneus esportivos são muito sensíveis à calibragem.',
  },
]

// ─── YZF R-1M 1000 (2015-2024) ────────────────────────────────────────────────

const R1M_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesma base mecânica da R-1 padrão (motor crossplane ~998cc) — diferença está na suspensão eletrônica semi-ativa Öhlins ERS e eletrônica de pista mais completa',
    body: 'A R-1M compartilha o motor crossplane 998cc DOHC 16V da R-1 padrão (mesma manutenção de motor: óleo, vela, válvulas, corrente — ver seção da R-1 1000). A diferença está na parte ciclística e eletrônica: suspensão semi-ativa Öhlins ERS (Electronic Racing Suspension) que ajusta amortecimento em tempo real via sensores, carenagem em fibra de carbono, e comunicação de dados com data logger (Yamaha Communication Control Unit) para análise de desempenho em pista. Toda manutenção de motor é idêntica à R-1 1000 padrão.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão semi-ativa Öhlins ERS — NÃO deve ser desmontada/regulada como suspensão convencional; qualquer serviço requer especialista Öhlins ou concessionária Yamaha com equipamento específico',
    body: 'A suspensão eletrônica semi-ativa da R-1M usa atuadores eletrônicos e sensores para ajustar o amortecimento em tempo real conforme o modo de pilotagem selecionado. NÃO tente regular ou desmontar como uma suspensão convencional — requer diagnóstico e calibração com equipamento específico Öhlins/Yamaha. Qualquer sintoma de comportamento anormal da suspensão (dureza excessiva, resposta lenta, códigos de erro) deve ser levado a um especialista com histórico em suspensão eletrônica de moto esportiva.',
  },
  {
    severity: 'WARN',
    title: 'Carenagem em fibra de carbono — reparo diferente de plástico/ABS comum; danos exigem especialista em fibra de carbono, não oficina de funilaria de moto padrão',
    body: 'Diferente da R-1 padrão (carenagem em plástico/ABS), a R-1M usa painéis em fibra de carbono em partes específicas. Qualquer dano estrutural (trincas, lascas) exige reparo por especialista em fibra de carbono — o material não se comporta como plástico termoformado e reparos malfeitos comprometem a resistência estrutural da peça. Custo de reposição significativamente mais alto que carenagem de plástico da R-1 padrão.',
  },
  {
    severity: 'OK',
    title: 'Data logger e comunicação de telemetria (Yamaha Communication Control Unit) — recurso de análise de desempenho em pista, exclusivo da R-1M',
    body: 'A R-1M vem de fábrica com sistema de comunicação/data logger que permite análise detalhada de dados de pilotagem em pista (velocidade, ângulo de inclinação, uso de freio/acelerador por setor) via aplicativo/software específico Yamaha. Este recurso não tem equivalente de manutenção mecânica — é eletrônico e não requer serviço periódico, apenas atualização de software conforme disponibilizado pela Yamaha.',
  },
]

const R1M_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Custo de manutenção significativamente mais alto que a R-1 padrão — suspensão eletrônica, carbono e eletrônica de pista elevam o custo de qualquer serviço não-motor',
    body: 'Embora o motor seja idêntico à R-1 padrão (mesmo custo de manutenção de motor), a R-1M tem custo muito mais alto em qualquer serviço envolvendo suspensão (eletrônica Öhlins especializada), carenagem (fibra de carbono) e diagnóstico eletrônico avançado. Antes de adquirir, considere que o custo total de propriedade é superior ao da R-1 padrão mesmo com motor idêntico — avalie se os recursos extras (suspensão semi-ativa, data logger) justificam o investimento para o uso pretendido.',
  },
  {
    severity: 'WARN',
    title: 'Disponibilidade de peças de suspensão eletrônica e carenagem em carbono mais restrita que a R-1 padrão — planeje prazo de entrega maior para serviços não-motor',
    body: 'Componentes exclusivos da R-1M (atuadores de suspensão Öhlins ERS, painéis de carbono, módulos de comunicação) têm disponibilidade mais restrita no Brasil que peças da R-1 padrão, por ser uma versão de produção mais limitada e voltada a entusiastas/pista. Planeje prazos de entrega mais longos para qualquer serviço fora do motor (que compartilha peças com a R-1 padrão e tem disponibilidade normal).',
  },
]

const R1M_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção YZF R-1M por km — motor idêntico à R-1 1000, suspensão eletrônica e carenagem em carbono exigem cuidados adicionais',
    body: 'Manutenção de motor: idêntica à R-1 1000 (óleo sintético 10W-40/15W-50 JASO MA2 a cada 6.000 km, vela e regulagem de válvulas a cada 12.000 km, kit de corrente 530 de alta performance a cada 15.000-24.000 km conforme uso rua/pista — ver cronograma completo da R-1 1000). Adicional específico da R-1M: verificação da suspensão eletrônica Öhlins ERS (diagnóstico via software Yamaha) a cada 12 meses ou ao notar qualquer comportamento anormal — NUNCA tentar ajuste manual como suspensão convencional. Inspeção da carenagem de carbono a cada revisão (trincas, lascas — reparo apenas com especialista em fibra de carbono). Atualização de firmware/software do data logger conforme disponibilizado pela Yamaha. A cada trackday: inspeção de pneus, freios e embreagem antihopping (mesmos cuidados da R-1 padrão em uso de pista).',
  },
]

// ─── YZF R-3 (2015-2024, variantes 321/ABS, CONNECTED, World GP) ─────────────

const R3_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 321cc bicilíndrico paralelo DOHC 8V refrigerado a líquido — óleo 10W-40 ou 10W-30 semissintético, 2,4-2,5 L com filtro; motor mais simples e acessível da linha YZF esportiva',
    body: 'A R-3 usa motor bicilíndrico paralelo 321cc DOHC 8 válvulas (4 por cilindro), refrigerado a líquido — mecânica bem mais simples e barata de manter que os 4 cilindros da R-1/R-6/Thunderace/Thundercat. Óleo: 10W-40 ou 10W-30 semissintético API SG/SH JASO MA2, aproximadamente 2,4-2,5 L com troca de filtro. Filtro: Hiflofiltro HF204 ou equivalente. Troca: 6.000 km em uso normal, 5.000 km em uso esportivo frequente. Todas as variantes da FIPE (321/ABS, CONNECTED 321 ABS, CONNECTED 321 ABS 70th ANNIVERSARY, World GP 60th ANNIVERSARY ED.) compartilham exatamente o mesmo motor — diferenças são de pintura/edição especial e, na versão CONNECTED, painel digital conectado ao smartphone.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK LMAR8AI-9 ou equivalente iridium — 2 velas, troca a cada 16.000-20.000 km; motor injetado eletronicamente em toda a produção brasileira',
    body: 'A R-3 é injetada eletronicamente desde o lançamento (sem versão carburada no Brasil). Vela iridium de fábrica (consultar especificação exata NGK no manual — geralmente LMAR8AI-9 ou equivalente), com intervalo de troca mais longo que velas convencionais: 16.000-20.000 km. Acesso relativamente simples comparado às motos de 4 cilindros desta família (menos carenagem para remover).',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão 520 — kit completo (corrente + coroa + pinhão) a cada 20.000-25.000 km; motor de baixa cilindrada gera menos estresse na transmissão que os irmãos maiores',
    body: 'Transmissão final por corrente 520, dimensionada para a potência moderada do motor (cerca de 42 cv) — vida útil mais longa que motos de 4 cilindros de alta potência desta linha. DID 520VX3 ou RK 520SO (com anel-o). Lubrificação: a cada 500-600 km. Kit completo: 20.000-25.000 km em uso normal.',
  },
  {
    severity: 'OK',
    title: 'Moto de entrada na linha esportiva — ideal para quem está migrando de motos de menor cilindrada; manutenção significativamente mais barata que R-1/R-6',
    body: 'A R-3 é a porta de entrada da Yamaha na linha esportiva de fuselagem completa (fairing), com custo de manutenção muito mais próximo de uma moto de médio porte que das irmãs maiores 4 cilindros. Ideal para pilotos migrando de motos de entrada/street ou buscando uma esportiva de manutenção mais acessível para uso diário e eventuais trackdays de nível iniciante/intermediário.',
  },
  {
    severity: 'OK',
    title: 'Versão CONNECTED tem painel digital com conectividade Bluetooth ao smartphone — recurso eletrônico, sem impacto na manutenção mecânica',
    body: 'A variante "CONNECTED" (incluindo a edição 70th ANNIVERSARY) traz painel digital com conectividade Bluetooth ao aplicativo Yamaha (notificações, dados de viagem). É um recurso puramente eletrônico/painel — não altera nada da manutenção mecânica do motor, suspensão ou transmissão, que é idêntica às demais versões (321/ABS padrão e World GP 60th ANNIVERSARY).',
  },
  {
    severity: 'OK',
    title: 'Pneus 110/70-17 (F) e 140/70-17 (R) — dimensões mais acessíveis que R-1/R-6, boa variedade de marcas disponíveis',
    body: 'A R-3 usa pneus 110/70-17 (F) e 140/70-17 (R) — medidas populares com ampla disponibilidade de marcas: Pirelli Diablo Rosso, Michelin Pilot Street Radial, Metzeler Sportec. Calibragem: consultar etiqueta no quadro/manual (tipicamente 28-30 PSI F / 32-36 PSI R, ajustar conforme carga e uso solo/garupa).',
  },
]

const R3_PROBLEMAS: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor simples e confiável — poucos problemas documentados; a maior parte das reclamações de owners é sobre suspensão básica e não sobre o motor',
    body: 'O motor bicilíndrico 321cc da R-3 é considerado robusto e de baixa manutenção comparado às irmãs 4 cilindros. A maioria das reclamações de owners está relacionada à suspensão de entrada (não invertida, calibração voltada a custo) e não ao motor — problemas mecânicos sérios não são comumente reportados nesta linha.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão dianteira convencional (não invertida) — calibração mais básica que R-1/R-6; considere upgrade de mola/óleo para uso esportivo mais intenso',
    body: 'Diferente das irmãs maiores (R-1/R-6, com suspensão invertida de alta performance), a R-3 usa suspensão dianteira convencional com calibração voltada a custo/uso misto. Para uso esportivo mais intenso (trackday), considere upgrade de mola progressiva e óleo de viscosidade adequada — bengala original pode "fundar" em frenagens fortes de pista.',
  },
  {
    severity: 'OK',
    title: 'Baixo custo de manutenção geral — peça acessível e ampla disponibilidade no mercado, diferente de peças de importação das irmãs 4 cilindros desta linha',
    body: 'Por ser um modelo de maior volume de vendas no Brasil (comparado à R-1/R-1M/R-6/Thunderace/Thundercat), a R-3 tem peças de reposição com boa disponibilidade e preço mais acessível — vantagem clara sobre as irmãs maiores desta família, que frequentemente dependem de peças de importação com prazo e custo elevados.',
  },
]

const R3_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção YZF R-3 por km — motor bicilíndrico 321cc, todas as variantes (321/ABS, CONNECTED, World GP)',
    body: 'Revisão 1.000 km (garantia): óleo grátis + aperto geral. 6.000 km: óleo 10W-40 ou 10W-30 semissintético (2,4-2,5 L com filtro, Hiflofiltro HF204) + filtro de ar. 12.000 km: óleo + filtro + regulagem de válvulas (consultar manual, motor DOHC 8V). 16.000-20.000 km: vela NGK iridium (LMAR8AI-9 ou equivalente). 18.000 km: óleo + filtro. 20.000-25.000 km: kit de corrente 520 completo (corrente + coroa + pinhão). 24.000 km: óleo + filtro + válvulas. A cada 500-600 km: lubrificação da corrente. A cada 24 meses: troca de fluido de freio DOT 4. A cada 6 meses: verificação da bateria. Uso de trackday: reduza os intervalos de pneus e pastilhas de freio, e considere upgrade de suspensão dianteira (mola/óleo) para melhor resposta em frenagens fortes. Todas as variantes (321/ABS, CONNECTED 321 ABS, CONNECTED 321 ABS 70th ANNIVERSARY, World GP 60th ANNIVERSARY ED.) seguem exatamente o mesmo cronograma — diferenças são só de pintura/edição/painel.',
  },
]

// ─── YZF R-6 600 (1999-2020) ───────────────────────────────────────────────────

const R6_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 599cc 4 cilindros DOHC 16V de altíssima rotação (redline acima de 17.000 rpm em gerações mais recentes) — óleo 10W-40 sintético, 2,7-3,0 L com filtro; supersport puro-sangue de pista',
    body: 'A R-6 é referência histórica na categoria supersport 600cc, com motor projetado para girar em rotações extremamente altas (redline acima de 17.000 rpm nas gerações 2006+) — muito mais alto que motos de rua comuns. Essa característica exige óleo de alta qualidade e troca rigorosa no intervalo correto: 10W-40 sintético JASO MA2, 2,7-3,0 L com filtro (verificar especificação exata por geração/ano). Filtro: Hiflofiltro HF204 ou equivalente. Troca: 6.000 km em uso de rua, 4.000-5.000 km em uso de pista/trackday frequente — motor de altíssima rotação degrada o óleo mais rápido que motores convencionais.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK iridium específica por geração — motor de alta rotação exige vela de qualidade; troca a cada 10.000-12.000 km (mais frequente que motos de baixa rotação)',
    body: 'Dado o regime de altíssima rotação da R-6, a vela sofre desgaste mais acelerado que em motores convencionais. Vela iridium de fábrica (consultar especificação exata por ano/geração no manual): troca recomendada a cada 10.000-12.000 km, mais frequente que a maioria das motos street. Sinais de vela desgastada em motor de alta rotação: perda de potência em altas RPM, falha de ignição em regime de giro elevado — mais crítico nesta moto que em motos de uso urbano.',
  },
  {
    severity: 'WARN',
    title: 'Regulagem de válvulas com pastilhas (shim-under-bucket) — serviço de precisão que exige especialista; folgas incorretas em motor de altíssima rotação têm consequência mais severa que em motos convencionais',
    body: 'A R-6, como moto supersport de alta rotação, usa sistema de válvulas com pastilhas de regulagem (shim-under-bucket) — serviço que exige desmontagem parcial do motor e substituição de pastilhas por medida certa, mais trabalhoso e caro que o sistema de parafuso/contraporca de motos comuns. Dado o regime de rotação extremo desta moto, folgas de válvula fora da especificação têm consequência mais severa (risco de válvula batendo no pistão em altíssima rotação) — sempre confiar a especialista com experiência em motor supersport de 4 cilindros.',
  },
  {
    severity: 'OK',
    title: 'Corrente de transmissão 520 de alta performance — kit completo a cada 15.000-18.000 km em uso de pista, 20.000-22.000 km em uso de rua',
    body: 'Transmissão final por corrente 520 com anel-o de alta performance (DID ZVM-X ou RK GB520XSO), dimensionada para a potência elevada por cilindrada (mais de 120 cv em motor 600cc). Lubrificação: a cada 400-500 km, mais frequente em uso de pista (calor extremo). Kit completo: 15.000-18.000 km com uso de trackday frequente, 20.000-22.000 km em uso predominante de rua.',
  },
  {
    severity: 'WARN',
    title: 'Não é moto para uso urbano predominante — embreagem, motor e freios sofrem desgaste acelerado em trânsito parado; câmbio "curto" pede rotação alta mesmo em velocidade de rua',
    body: 'A R-6 foi projetada para pista, com relação de câmbio curta e motor que só entrega seu melhor desempenho em altíssima rotação — em uso urbano, o motor trabalha em regime muito abaixo do ideal (baixo torque em rotações baixas), forçando trocas de marcha frequentes e maior desgaste de embreagem. Recomendada para quem já tem experiência com motos esportivas e pretende uso misto rua/pista, não como primeira moto ou uso 100% urbano.',
  },
  {
    severity: 'OK',
    title: 'Pneus esportivos de pista — 120/70-17 (F) e 180/55-17 (R, verificar medida exata por ano/geração); calibragem crítica para desempenho em curva',
    body: 'A R-6 exige pneus esportivos de alta performance (Pirelli Diablo Supercorsa, Michelin Power GP, Bridgestone Battlax RS11) nas medidas 120/70-17 (F) e 180/55-17 (R, confirmar medida exata gravada no pneu original conforme geração). Calibragem: consultar etiqueta/manual — variações de 1-2 PSI alteram significativamente o comportamento em curva a alta velocidade, ainda mais crítico que em motos de rua comum.',
  },
]

const R6_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Motor de altíssima rotação é implacável com manutenção atrasada — óleo vencido ou válvulas desreguladas têm consequências mais graves e caras que em motos convencionais',
    body: 'O regime de rotação extremo da R-6 (redline acima de 17.000 rpm nas gerações mais recentes) significa que qualquer atraso na manutenção (óleo degradado, válvulas fora de especificação, corrente gasta) tem consequências mais severas e caras que em motos de rotação convencional. Um motor de R-6 danificado por negligência de manutenção custa proporcionalmente mais para reparar que motos de rua comum — trate os intervalos de manutenção com rigor.',
  },
  {
    severity: 'WARN',
    title: 'Custo de manutenção elevado — mão de obra especializada obrigatória para regulagem de válvulas com pastilhas e diagnóstico de motor de alta performance',
    body: 'Diferente de motos de válvula com parafuso/contraporca (ajuste simples), a R-6 exige mecânico especialista para regulagem de válvulas (sistema de pastilhas/shim) e qualquer diagnóstico de motor. O custo de mão de obra e peças é significativamente mais alto que motos street/trail — planeje orçamento compatível com o perfil de moto supersport de pista antes da aquisição.',
  },
  {
    severity: 'OK',
    title: 'Uso predominante de pista acelera desgaste de pneus, freios e embreagem drasticamente — trate os intervalos deste documento como valores de uso de RUA',
    body: 'Se a R-6 for usada com frequência em trackday, os intervalos de manutenção (pneus, freios, óleo, corrente) devem ser reduzidos de forma ainda mais agressiva que na R-1 — o motor de altíssima rotação sofrendo em pista degrada componentes mais rápido. Pneus podem durar apenas 1-2 trackdays em uso intenso, fluido de freio deve ser trocado com mais frequência (risco de "fading" em freadas repetidas de pista).',
  },
]

const R6_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma completo de manutenção YZF R-6 por km — motor supersport de altíssima rotação, válvulas com pastilhas',
    body: 'Revisão inicial (garantia, quando aplicável): óleo + aperto geral + verificação de torque (vibração elevada do motor de alta rotação). 6.000 km: óleo sintético 10W-40 JASO MA2 (2,7-3,0 L com filtro, Hiflofiltro HF204) + filtro de ar — reduza para 4.000-5.000 km em uso de pista frequente. 10.000-12.000 km: óleo + filtro + vela iridium (especificação por geração) + regulagem de válvulas com pastilhas (shim-under-bucket, exige especialista). 18.000 km: óleo + filtro. 15.000-18.000 km (pista) ou 20.000-22.000 km (rua): kit de corrente 520 de alta performance completo. A cada 400-500 km: lubrificação da corrente (mais frequente em pista). A cada trackday: inspeção de pneus, pastilhas de freio, fluido de freio e embreagem. A cada 24 meses ou uso intenso de pista: troca de fluido de freio DOT 4. Sempre verificar pressão dos pneus antes de cada saída — calibragem crítica para desempenho em curva. Este cronograma é mais rigoroso que motos de rua comum devido ao regime de rotação extremo do motor — não negligencie os intervalos.',
  },
]

// ─── Tire Pressures ────────────────────────────────────────────────────────────

const TIRE_PRESSURES = [
  {
    modelName: 'YZF 1000 THUNDERACE',
    yearFrom: 1996, yearTo: 2002,
    tireSize: '120/70-17 (F) · 170/60-17 ou 180/55-17 (R, conforme ano)',
    frontPsi: 32, rearPsi: 36, frontPsiLoad: 34, rearPsiLoad: 40,
    notes: 'Sport-touring de alta cilindrada. Confirme a medida traseira exata gravada no pneu original antes de comprar reposição — variou entre anos.',
  },
  {
    modelName: 'YZF 600 THUNDERCAT',
    yearFrom: 1996, yearTo: 2003,
    tireSize: '120/70-17 (F) · 160/60-17 ou 170/60-17 (R, conforme ano)',
    frontPsi: 32, rearPsi: 36, frontPsiLoad: 34, rearPsiLoad: 40,
    notes: 'Base de desenvolvimento da futura R6. Confirme medida traseira exata conforme ano de fabricação.',
  },
  {
    modelName: 'YZF 750',
    yearFrom: 1993, yearTo: 1998,
    tireSize: '120/70-17 (F) · 160/60-17 (R, verificar medida original)',
    frontPsi: 32, rearPsi: 36, frontPsiLoad: 34, rearPsiLoad: 40,
    notes: 'Moto de coleção — verifique disponibilidade de marcas na medida original antes de comprar; pode ser necessário migrar para medida equivalente atual.',
  },
  {
    modelName: 'YZF R-1 1000',
    yearFrom: 1998, yearTo: 2024,
    tireSize: '120/70-17 (F) · 190/55-17 ou 200/55-17 (R, conforme geração)',
    frontPsi: 30, rearPsi: 29, frontPsiLoad: 32, rearPsiLoad: 32,
    notes: 'Pneus esportivos de alta performance (Supercorsa/Power GP/RS11). Calibragem crítica — variações pequenas alteram muito o comportamento em curva. Sempre verificar antes de cada saída, especialmente pista.',
  },
  {
    modelName: 'YZF R-1M 1000',
    yearFrom: 2015, yearTo: 2024,
    tireSize: '120/70-17 (F) · 200/55-17 (R)',
    frontPsi: 30, rearPsi: 29, frontPsiLoad: 32, rearPsiLoad: 32,
    notes: 'Mesmos pneus da R-1 padrão. Suspensão semi-ativa Öhlins ERS ajusta amortecimento — calibragem de pneu ainda assim crítica e independente da suspensão.',
  },
  {
    modelName: 'YZF R-3',
    yearFrom: 2015, yearTo: 2024,
    tireSize: '110/70-17 (F) · 140/70-17 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 30, rearPsiLoad: 36,
    notes: 'Todas as variantes (321/ABS, CONNECTED, World GP). Boa disponibilidade de marcas (Diablo Rosso, Pilot Street Radial, Sportec). Ajustar conforme carga/garupa.',
  },
  {
    modelName: 'YZF R-6 600',
    yearFrom: 1999, yearTo: 2020,
    tireSize: '120/70-17 (F) · 180/55-17 (R, verificar medida por geração)',
    frontPsi: 30, rearPsi: 29, frontPsiLoad: 32, rearPsiLoad: 32,
    notes: 'Supersport de pista. Calibragem ainda mais crítica que a R-1 dado o uso predominante em pista. Verificar sempre antes de rodar.',
  },
]

// ─── Manutenção — geradores ────────────────────────────────────────────────────

const makeThunderace = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40 (3,8 L com filtro, Hiflofiltro HF303)', intervalKm: 6000, intervalMonths: 12, notes: 'Uso de pista frequente: 4.000-5.000 km. Motor Genesis 5 válvulas/cilindro.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas (motor Genesis 20V)', intervalKm: 12000, intervalMonths: 18, notes: 'Consultar manual para folgas exatas. Especialista em motor multi-cilindro.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: '4 velas NGK DPR8EA-9 (gap 0,8-0,9 mm)', intervalKm: 12000, intervalMonths: 18, notes: 'Acesso requer remoção do tanque. Iridium DPR8EIX-9: até 20.000 km.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Sincronização dos 4 carburadores Mikuni', intervalKm: 12000, intervalMonths: 12, notes: 'Vacuômetro de 4 vias. Sintoma de desregulagem: marcha lenta instável, vibração.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 530 com anel-o — lubrificação', intervalKm: 500, intervalMonths: null, notes: 'Produto específico para anel-o. Não usar querosene/diesel para limpeza.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit corrente 530 completo (corrente + coroa 45T + pinhão 17T)', intervalKm: 22000, intervalMonths: null, notes: 'Verificar folga (25-35 mm) a cada 2.000 km dado o torque elevado do motor.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulador retificador — verificação de voltagem de carga', intervalKm: null, intervalMonths: 12, notes: 'Ponto de falha conhecido desta geração Yamaha. 13,5-14,8V a 3.000-4.000 rpm.', priority: 'MEDIUM', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Inspeção visual de vazamentos (cárter, retentores)', intervalKm: 6000, intervalMonths: 12, notes: 'Natural em moto com décadas de uso — endurecimento de borrachas pela idade.', priority: 'MEDIUM', order: 8 },
]

const makeThundercat = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40 (3,0-3,3 L com filtro, Hiflofiltro HF303)', intervalKm: 6000, intervalMonths: 12, notes: 'Uso esportivo/pista frequente: 4.000-5.000 km.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas', intervalKm: 12000, intervalMonths: 18, notes: 'Consultar manual. Motor 4 cilindros 16V.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: '4 velas NGK DPR9EA-9 (gap 0,8-0,9 mm)', intervalKm: 10000, intervalMonths: 12, notes: 'Acesso requer remoção do tanque.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Sincronização dos 4 carburadores Mikuni', intervalKm: 12000, intervalMonths: 12, notes: 'Vacuômetro de 4 vias.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente — lubrificação (anel-o)', intervalKm: 500, intervalMonths: null, notes: 'Produto específico para anel-o.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit de corrente completo', intervalKm: 21000, intervalMonths: null, notes: 'Verificar folga a cada 2.000 km.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulador retificador — verificação', intervalKm: null, intervalMonths: 12, notes: 'Ponto de falha conhecido. 13,5-14,8V a 3.000-4.000 rpm.', priority: 'MEDIUM', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Inspeção visual de vazamentos', intervalKm: 6000, intervalMonths: 12, notes: 'Natural pela idade da moto.', priority: 'MEDIUM', order: 8 },
]

const makeYzf750 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Revisão geral completa (fluidos, mangueiras, vedações)', intervalKm: null, intervalMonths: null, notes: 'Obrigatória antes de uso regular em moto de coleção/recém-adquirida. Kits de reparo dos 4 carburadores em viton.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40 (~3,7 L com filtro)', intervalKm: 6000, intervalMonths: 12, notes: 'Motor Genesis 5 válvulas/cilindro.', priority: 'CRITICAL', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Velas NGK + sincronização de carburadores + regulagem de válvulas', intervalKm: 12000, intervalMonths: 18, notes: 'Consultar especificação exata por ano de fabricação.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente — lubrificação', intervalKm: 500, intervalMonths: null, notes: 'Considerar corrente com anel-o na reposição para maior durabilidade.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit de corrente completo', intervalKm: 20000, intervalMonths: null, notes: 'Confirmar medida exata (passo/elos) antes de comprar.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Sistema elétrico — verificação completa (chicote, conectores, regulador)', intervalKm: null, intervalMonths: 12, notes: 'Risco elevado de falha por oxidação/ressecamento após 25+ anos, mesmo com baixo uso.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Inspeção de vazamentos gerais', intervalKm: 6000, intervalMonths: 12, notes: 'Esperado em juntas/retentores desta idade.', priority: 'MEDIUM', order: 7 },
]

const makeR1 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo sintético 10W-40 ou 15W-50 JASO MA2 (~3,7-4,0 L com filtro)', intervalKm: 6000, intervalMonths: 12, notes: 'Verificar especificação exata por ano/geração (pré/pós-crossplane 2009).', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas', intervalKm: 12000, intervalMonths: 18, notes: 'Folgas variam entre gerações pré/pós-crossplane — consultar manual do ano correto.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela (especificação por geração)', intervalKm: 14000, intervalMonths: 18, notes: 'Iridium de fábrica nas gerações mais recentes.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 530 alta performance — lubrificação', intervalKm: 450, intervalMonths: null, notes: 'Mais frequente em uso de pista (calor extremo degrada lubrificante).', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit corrente 530 (DID ZVM-X ou RK GB530XSO)', intervalKm: 20000, intervalMonths: null, notes: 'Pista: 15.000-18.000 km. Rua: 20.000-24.000 km.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Embreagem antihopping — inspeção de discos (gerações 2009+)', intervalKm: 12000, intervalMonths: null, notes: 'Uso de pista: inspecionar a cada trackday. Usar sempre óleo JASO MA/MA2.', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Uso intenso de pista: trocar com mais frequência (risco de fading).', priority: 'HIGH', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Diagnóstico eletrônico (ECU, controle de tração, quickshifter)', intervalKm: null, intervalMonths: 12, notes: 'Gerações 2015+. Scanner específico Yamaha ao notar qualquer anomalia.', priority: 'MEDIUM', order: 8 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pneus — verificação de pressão', intervalKm: null, intervalMonths: null, notes: 'Antes de CADA saída. Calibragem crítica para comportamento em curva.', priority: 'HIGH', order: 9 },
]

const makeR1m = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  ...makeR1(m, yf, yt).map(item => ({ ...item })),
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Suspensão semi-ativa Öhlins ERS — diagnóstico/calibração', intervalKm: null, intervalMonths: 12, notes: 'NUNCA ajustar manualmente como suspensão convencional. Especialista Öhlins/Yamaha com equipamento específico.', priority: 'HIGH', order: 10 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Inspeção de carenagem em fibra de carbono', intervalKm: null, intervalMonths: 12, notes: 'Trincas/lascas: reparo apenas com especialista em fibra de carbono.', priority: 'MEDIUM', order: 11 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Atualização de firmware do data logger (Communication Control Unit)', intervalKm: null, intervalMonths: 12, notes: 'Conforme disponibilizado pela Yamaha.', priority: 'LOW', order: 12 },
]

const makeR3 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo 10W-40 ou 10W-30 semissintético (2,4-2,5 L com filtro, Hiflofiltro HF204)', intervalKm: 6000, intervalMonths: 12, notes: 'Uso esportivo frequente: 5.000 km.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas (motor DOHC 8V)', intervalKm: 12000, intervalMonths: 18, notes: 'Consultar manual.', priority: 'HIGH', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela NGK iridium (LMAR8AI-9 ou equivalente)', intervalKm: 18000, intervalMonths: 24, notes: 'Intervalo mais longo que velas convencionais.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 520 — lubrificação', intervalKm: 550, intervalMonths: null, notes: 'DID 520VX3 ou RK 520SO.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit corrente 520 completo', intervalKm: 22000, intervalMonths: null, notes: 'Motor de baixa cilindrada gera menos estresse que os irmãos 4 cilindros.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Uso de trackday: reduzir intervalo.', priority: 'MEDIUM', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Bateria — verificação', intervalKm: null, intervalMonths: 6, notes: 'Verificação padrão de moto injetada.', priority: 'MEDIUM', order: 7 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Suspensão dianteira — considerar upgrade de mola/óleo (uso esportivo intenso)', intervalKm: null, intervalMonths: null, notes: 'Suspensão convencional de entrada pode "fundar" em frenagens fortes de pista.', priority: 'LOW', order: 8 },
]

const makeR6 = (m: string, yf: number, yt: number): MaintenanceItemInput[] => [
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Óleo sintético 10W-40 JASO MA2 (2,7-3,0 L com filtro, Hiflofiltro HF204)', intervalKm: 6000, intervalMonths: 12, notes: 'Uso de pista frequente: 4.000-5.000 km. Motor de altíssima rotação degrada óleo mais rápido.', priority: 'CRITICAL', order: 1 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Regulagem de válvulas com pastilhas (shim-under-bucket)', intervalKm: 11000, intervalMonths: 18, notes: 'Serviço de precisão — exige especialista em motor supersport 4 cilindros.', priority: 'CRITICAL', order: 2 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Vela iridium (especificação por geração)', intervalKm: 11000, intervalMonths: 12, notes: 'Motor de alta rotação desgasta vela mais rápido que motores convencionais.', priority: 'HIGH', order: 3 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Corrente 520 alta performance — lubrificação', intervalKm: 450, intervalMonths: null, notes: 'DID ZVM-X ou RK GB520XSO. Mais frequente em pista.', priority: 'HIGH', order: 4 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Kit corrente 520 completo', intervalKm: 20000, intervalMonths: null, notes: 'Pista: 15.000-18.000 km. Rua: 20.000-22.000 km.', priority: 'HIGH', order: 5 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Fluido de freio DOT 4', intervalKm: null, intervalMonths: 24, notes: 'Uso intenso de pista: trocar com mais frequência (risco de fading).', priority: 'HIGH', order: 6 },
  { modelName: m, yearFrom: yf, yearTo: yt, component: 'Pneus e pastilhas de freio — inspeção pós-trackday', intervalKm: null, intervalMonths: null, notes: 'Podem durar apenas 1-2 trackdays em uso intenso.', priority: 'HIGH', order: 7 },
]

// ─── BLOCKS ─────────────────────────────────────────────────────────────────────

const BLOCKS = [
  { modelName: 'YZF 1000 THUNDERACE', yearFrom: 1996, yearTo: 2002, MACETES: THUNDERACE_MACETES, PROBLEMAS: THUNDERACE_PROBLEMAS, MANUTENCAO: THUNDERACE_MANUTENCAO },
  { modelName: 'YZF 600 THUNDERCAT',  yearFrom: 1996, yearTo: 2003, MACETES: THUNDERCAT_MACETES, PROBLEMAS: THUNDERCAT_PROBLEMAS, MANUTENCAO: THUNDERCAT_MANUTENCAO },
  { modelName: 'YZF 750',             yearFrom: 1993, yearTo: 1998, MACETES: YZF750_MACETES,     PROBLEMAS: YZF750_PROBLEMAS,     MANUTENCAO: YZF750_MANUTENCAO     },
  { modelName: 'YZF R-1 1000',        yearFrom: 1998, yearTo: 2024, MACETES: R1_MACETES,         PROBLEMAS: R1_PROBLEMAS,         MANUTENCAO: R1_MANUTENCAO         },
  { modelName: 'YZF R-1M 1000',       yearFrom: 2015, yearTo: 2024, MACETES: R1M_MACETES,        PROBLEMAS: R1M_PROBLEMAS,        MANUTENCAO: R1M_MANUTENCAO        },
  { modelName: 'YZF R-3',             yearFrom: 2015, yearTo: 2024, MACETES: R3_MACETES,         PROBLEMAS: R3_PROBLEMAS,         MANUTENCAO: R3_MANUTENCAO         },
  { modelName: 'YZF R-6 600',         yearFrom: 1999, yearTo: 2020, MACETES: R6_MACETES,         PROBLEMAS: R6_PROBLEMAS,         MANUTENCAO: R6_MANUTENCAO         },
]

const ALL_MANUTENCAO: MaintenanceItemInput[] = [
  ...makeThunderace('YZF 1000 THUNDERACE', 1996, 2002),
  ...makeThundercat('YZF 600 THUNDERCAT', 1996, 2003),
  ...makeYzf750('YZF 750', 1993, 1998),
  ...makeR1('YZF R-1 1000', 1998, 2024),
  ...makeR1m('YZF R-1M 1000', 2015, 2024),
  ...makeR3('YZF R-3', 2015, 2024),
  ...makeR6('YZF R-6 600', 1999, 2020),
]

// ─── Runner ─────────────────────────────────────────────────────────────────────

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
