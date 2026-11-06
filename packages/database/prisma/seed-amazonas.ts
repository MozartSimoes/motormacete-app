/**
 * Seed Amazonas — macetes, problemas crônicos, manutenção e calibragem de pneus
 * Cobre a AME 1600 (1978–1988) e a Kahena (1990–1993).
 *
 * Fontes: Revista Duas Rodas, Motorium.com.br, confrariadasmotos.wordpress.com,
 *         Wikipedia AME, flatout.com.br, fusca4ever.com.br, planetabuggy.com.br,
 *         clubedofuscadeararas.blogspot.com, webmotors.com.br (Kahena)
 *
 * Execute: pnpm --filter @motormacete/database tsx prisma/seed-amazonas.ts
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

// ─── Dicas por modelo ─────────────────────────────────────────────────────────

const amazonasTips: ModelBlock[] = [

  // ── AME 1600 (1978–1988) ────────────────────────────────────────────────────
  // Motor: VW 1584cc boxer 4-cil. ar-resfriado, 56cv, 2 carburadores Solex-Brosol 34
  // Câmbio: 4 marchas + ré (caixa VW Brasília), transmissão por corrente
  // Freios: disco duplo diant. 278mm (Corcel), disco simples tras.
  // Pneus: 120/90-16 diant., 130/90-16 tras. | Peso: 384 kg | Tanque: 30 L

  {
    modelName: 'AME 1600', yearFrom: 1978, yearTo: 1988,

    MACETES: [
      {
        severity: 'WARN',
        title: 'Evite trânsito parado prolongado: motor ar-resfriado superaquece',
        body: 'O motor VW 1600 refrigerado a ar depende exclusivamente do fluxo de vento para se manter na temperatura correta. Em colunas de tráfego ou cruzamentos longos, a temperatura pode subir perigosamente em menos de 10 minutos. Se não houver como se mover, desligue o motor e aguarde. Nunca espere a luz de temperatura acender — quando acende, o dano já pode estar feito.',
      },
      {
        severity: 'OK',
        title: 'Marcha ré: use com confiança para manobras com os 384 kg',
        body: 'A AME 1600 foi a primeira moto do mundo com marcha ré de série, herdada da caixa VW Brasília. É uma ferramenta real: ao recuar em estacionamentos ou fazer manobras no peso de 384 kg, engage a ré com o motor em marcha lenta e solte a embreagem suavemente. Sair empurrando uma moto de 384 kg coloca pressão enorme nos joelhos e nas costas.',
      },
      {
        severity: 'OK',
        title: 'Aqueça o motor por 2–3 minutos antes de sair',
        body: 'Motor ar-resfriado frio tem folgas maiores entre pistão e cilindro. Os dois carburadores Solex-Brosol 34 também exigem temperatura estabilizada para mistura correta. Aguarde até o ralenti cair naturalmente (som do motor fica mais grave e estável) antes de colocar carga. Acelerar forçado a frio = desgaste prematuro dos pistões.',
      },
      {
        severity: 'OK',
        title: 'Verifique o nível de óleo antes de cada saída',
        body: 'Motor ar-resfriado usa o óleo para dissipar calor — função ainda mais crítica do que em motores arrefecidos a água. A AME consome em torno de 150–250 mL de óleo a cada 1.000 km em uso normal (válvulas em bom estado). Antes de sair, puxe a vareta e confirme entre o mínimo e o máximo. Abaixo do mínimo: risco de fundição de mancais.',
      },
      {
        severity: 'OK',
        title: 'Peças de reposição: busque em oficinas de Fusca e Kombi',
        body: 'A maioria das peças do motor — pistões, anéis, velas, tuchos, carburador, platinado, condensador, bobina, tensores — é idêntica à do VW Fusca e da Kombi. Peças específicas de moto da AME (quadro, freios Corcel, corrente) são mais difíceis, mas o powertrain tem abastecimento garantido pela rede de peças VW a ar, ainda ativa em todo o Brasil.',
      },
      {
        severity: 'OK',
        title: 'Sincronize os dois carburadores a cada 10.000 km',
        body: 'A AME usa dois carburadores Solex-Brosol 34 (um por par de cilindros). Com o tempo, eles se dessincronizam: o motor anda "com um pulmão só", consumo sobe e o ralenti fica instável. Um mecânico de Fusca com manômetro de vácuo dual consegue sincronizar em menos de 1 hora. Custo: R$ 80–R$ 150. Sintoma claro: moto vibra mais que o normal em marcha lenta.',
      },
      {
        severity: 'WARN',
        title: 'Corrente de transmissão: tensione e lubrifique a cada 500 km',
        body: 'Com 384 kg de moto e o torque do motor VW 1600, a corrente de transmissão sofre desgaste acelerado. A cada 500 km, aplique lubrificante específico para corrente de moto (spray de corrente ou óleo 90 com pincel). Verifique a folga: entre 15 e 25 mm de jogo lateral no ponto central. Corrente com jogo excessivo salta ou parte — consequências graves a 100 km/h.',
      },
      {
        severity: 'OK',
        title: 'Calibre os pneus sempre com a moto fria e use a pressão correta para o peso',
        body: 'Pneus subdesinfados numa moto de 384 kg é muito mais perigoso do que num veículo mais leve — o sidewall colapsa, a moto oscila e o controle é comprometido. Calibre semanalmente: 32 PSI dianteiro e 38 PSI traseiro sem carga. Com garupa: eleve o traseiro para 42 PSI. Sempre calibre com pneu frio — a pressão quente fica até 5 PSI acima da real.',
      },
    ],

    PROBLEMAS: [
      {
        severity: 'DANGER',
        title: 'Superaquecimento: risco mais sério da AME em uso urbano',
        body: 'Motor VW boxer ar-resfriado não tem sistema de arrefecimento líquido — depende 100% do fluxo de ar. Em baixas velocidades ou parado no trânsito, a temperatura dos cilindros e da cabeça sobe rapidamente. Sintomas de crise: cheio de vapor do capo, motor "puxando pesado", ralenti alto. Consequências: empenamento da cabeça (reforma: R$ 2.500–R$ 5.000), funilamento de pistão ou travamento de motor. Solução: nunca ficar parado com o motor ligado por mais de 5 minutos.',
      },
      {
        severity: 'DANGER',
        title: 'Consumo excessivo de óleo: retentores de válvulas degradados',
        body: 'Com o tempo (especialmente acima de 50.000 km ou em motores que já superaqueceram), os retentores de válvulas endurecem e racham, deixando óleo vazar para a câmara de combustão. Sintomas: fumaça azul ao acelerar forte, velas escuras e oleosas, nível de óleo caindo mais de 250 mL a cada 1.000 km. Solução: reforma da cabeça com troca de retentores, guias e retificação das sedes — R$ 1.200–R$ 2.500. Não há outra forma de corrigir.',
      },
      {
        severity: 'DANGER',
        title: 'Peças dos freios (calipres Corcel) difíceis de encontrar',
        body: 'Os discos duplos dianteiros da AME usam calipres adaptados do Ford Corcel 2. O carro saiu de produção em 1986 e as peças originais somem do mercado. Calipres com pistões travados ou com vazamento de fluido precisam de recondicionamento ou fabricação de peças sob encomenda. Custo de recondicionamento: R$ 400–R$ 900 por caliper. Nunca negligencie o freio numa moto de 384 kg — a distância de frenagem já é naturalmente maior.',
      },
      {
        severity: 'WARN',
        title: 'Dessincronização dos carburadores: perda de potência e consumo alto',
        body: 'Os dois Solex-Brosol 34 se dessincronizam com o uso, com o desgaste dos eixos de borboleta ou simples desregulagem da válvula de aceleração. Sintoma claro: vibração excessiva em marcha lenta, moto "engasgando" entre 40 e 60 km/h, consumo subindo de 13 para abaixo de 10 km/L. Diagnóstico: mechânico com manômetro de vácuo ou simples audição. Regulagem: R$ 80–R$ 200.',
      },
      {
        severity: 'WARN',
        title: 'Regulagem de válvulas fora do ponto: desgaste acelerado e ruído',
        body: 'O motor OHV 8V da AME exige regulagem de válvulas a cada 10.000 km (motor frio — pelo menos 3 horas parado). Folga correta: 0,15 mm tanto admissão quanto escape. Válvulas frouxas: barulho metálico tipo "tique-tique" rítmico, mais audível a frio. Válvulas apertadas (mais grave): não vedam completamente, compressão cai, motor perde potência e pode queimar a sede de válvula — reforma cara. Custo da regulagem: R$ 150–R$ 300.',
      },
      {
        severity: 'WARN',
        title: 'Sistema de platinado: regulagem frequente necessária',
        body: 'A ignição da AME é convencional com platinado (ruptor). O platinado desgasta e a abertura (0,4 mm nominal) fecha com o uso, atrasando o ponto de ignição. Sintomas: dificuldade de partida a frio, marcha lenta irregular, perda de potência em cima de 80 km/h. Troca do kit completo (platinado + condensador + rotor + tampa distribuidora): R$ 80–R$ 180. Substituto recomendado: módulo eletrônico Bosch que elimina o platinado — R$ 250–R$ 450, sem mais ajustes periódicos.',
      },
      {
        severity: 'WARN',
        title: 'Caixa de câmbio VW: risco de soltar a ré inadvertidamente',
        body: 'A caixa de câmbio herdada do VW Brasília foi adaptada para moto, mas a posição da marcha ré (geralmente entre 1ª e ré, acionada com movimento específico) pode ser engajada por engano em manobras rápidas. Em andamento, engajar a ré pode danificar a caixa e provocar perda de controle. Estude a lógica de cambio da sua unidade específica antes de rodar em situações de tráfego intenso.',
      },
      {
        severity: 'OK',
        title: 'Gerador VW a ar: carregamento diferente das motos convencionais',
        body: 'A AME usa o sistema de gerador do motor VW ar (dínamo ou alternador integrado ao ventilador). Em baixo RPM (marcha lenta por muito tempo), o sistema não carrega a bateria de forma eficiente. Bateria de 12V 45Ah descarrega em sessões longas de ralenti. Sintoma: partida difícil após moto quente e parada por horas. Solução: manter RPM acima de 1.500 ao parar, ou trocar por regulador de tensão eletrônico atualizado.',
      },
    ],

    MANUTENCAO: [
      {
        severity: 'OK',
        title: 'Óleo: 20W-50 mineral API SJ/SL — troca a cada 5.000 km ou 6 meses',
        body: 'O motor VW 1600 a ar foi projetado para óleos minerais de alta viscosidade. Use SAE 20W-50 mineral API SJ ou SL — a viscosidade 50 é fundamental para manter o filme de óleo na temperatura de operação do motor ar-resfriado (110–130°C). Capacidade: 2,5 litros. NUNCA use óleo sintético 5W40 ou similar: a viscosidade menor a quente deixa o motor sem filme adequado. Marcas testadas: Havoline 20W-50, Lubrax 20W-50, Repsol 20W-50 mineral.',
      },
      {
        severity: 'WARN',
        title: 'Regulagem de válvulas a cada 10.000 km (motor completamente frio)',
        body: 'Folga nominal: 0,15 mm admissão e escape. Motor deve estar parado por mínimo 3 horas. Ferramentas: calibre de lâminas 0,15 mm, chave de boca 13 mm, chave de fenda. Sequência: cilindro 1 (frente direita) → 2 (frente esquerda) → 3 (traseiro direito) → 4 (traseiro esquerdo). Custo em oficina especializada em VW a ar: R$ 150–R$ 300.',
      },
      {
        severity: 'OK',
        title: 'Velas de ignição: NGK B5HS — troca a cada 10.000 km',
        body: 'Especificação: NGK B5HS ou equivalente Bosch W5B. Abertura do eletrodo: 0,5–0,6 mm. São 4 velas (dois cilindros por lado). Custo unitário: R$ 15–R$ 30. Troca junto com platinado e filtro de ar na mesma revisão. Vela escura (rica): carburador desregulado. Vela branca (pobre): mistura magra — risco de superaquecimento local.',
      },
      {
        severity: 'OK',
        title: 'Platinado e condensador: troca a cada 10.000 km',
        body: 'Kit platinado Bosch para motor VW a ar: abre em 0,4 mm. Troca junto com condensador, rotor e tampa do distribuidor. Custo do kit completo: R$ 80–R$ 180. Alternativa duradoura: módulo eletrônico de ignição (CDI adaptado) elimina o platinado definitivamente — R$ 250–R$ 450. Após a conversão, o único item periódico da ignição são as velas.',
      },
      {
        severity: 'OK',
        title: 'Filtro de ar: inspecione a cada 5.000 km, troque a cada 15.000 km',
        body: 'O filtro seco do motor VW 1600 retém sujeira para os dois carburadores. Inspecione batendo levemente contra a palma da mão — se sair pó, já está saturado. Em estradas de terra, troca a cada 7.000 km. Filtro sujo = mistura rica, fumaça preta e consumo elevado. Peça compatível com Fusca e Kombi (mesmo número): R$ 25–R$ 60.',
      },
      {
        severity: 'OK',
        title: 'Sincronização dos carburadores: a cada 10.000 km ou ao sentir vibração',
        body: 'Dois carburadores Solex-Brosol 34 devem ter a mesma depressão no coletor de admissão. Ferramenta: manômetro de vácuo dual (colchão de água ou digital). Ajuste: parafuso de sincronismo no corpo de borboleta. Em oficina de Fusca: R$ 80–R$ 200. Ponto de verificação: ralenti estável abaixo de 1.000 RPM e sem vibração assimétrica.',
      },
      {
        severity: 'WARN',
        title: 'Corrente de transmissão: lubrifique a cada 500 km, tensione a cada 2.000 km',
        body: 'Com 384 kg de peso total e o torque do VW 1600, a corrente de transmissão trabalha muito mais do que em motos leves. Lubrificação: spray de corrente específico (Motul Chain Lube, WD-40 Specialist, Castrol Chain Lube) a cada 500 km. Folga: 15–25 mm de jogo lateral no ponto mais frouxo da corrente. Troca: entre 15.000 e 20.000 km, dependendo da conservação. Corrente de qualidade recomendada: DID ou RK 530.',
      },
      {
        severity: 'OK',
        title: 'Fluido de freio DOT 4: troca a cada 2 anos',
        body: 'Sistema de freio a disco com calipres Ford Corcel. Use DOT 4 — nunca DOT 3 (ponto de ebulição menor). Troca a cada 2 anos independente de quilometragem: o fluido absorve umidade e o ponto de ebulição cai, causando freio "esponjoso" em frenagens fortes. Capacidade do sistema: ~150 mL. Sangria completa (purge) necessária na troca.',
      },
      {
        severity: 'OK',
        title: 'Bateria 12V 45Ah: teste de carga anual',
        body: 'A AME usa bateria 12V 45Ah (mesmo padrão que automóvel médio). O sistema de carga VW a ar tem desempenho limitado em baixo RPM. Faça teste de carga (load test) anual em loja de baterias — rápido e gratuito na maioria. Bateria abaixo de 12,0V em repouso = substituição. Marcas recomendadas: Moura, Heliar, Varta.',
      },
      {
        severity: 'OK',
        title: 'Embreagem monodisco a seco: ajuste do cabo a cada 5.000 km',
        body: 'Embreagem seca de disco único (adaptada do VW). Ajuste da folga do cabo: 10–15 mm de jogo livre na alavanca antes de começar a puxar. Cabo com folga excessiva = embreagem não desengata completamente (troca difícil de marchas). Cabo muito tenso = embreagem patinando, desgaste acelerado do disco. Troca do cabo: R$ 50–R$ 120. Disco de embreagem compatível com VW a ar: R$ 250–R$ 450.',
      },
    ],
  },

  // ── Kahena (1990–1993) ──────────────────────────────────────────────────────
  // Motor: VW 1584cc boxer, 65cv ou 90cv @ 5.800rpm (versão preparada)
  // Câmbio: 4 marchas + ré, transmissão por eixo cardan (versões tardias) ou correia
  // Freios: disco duplo diant., disco simples tras.
  // Pneus: Pirelli 120/70 ZR18 (diant.) e 170/60 ZR17 (tras.) | Peso: 317 kg

  {
    modelName: 'Kahena', yearFrom: 1990, yearTo: 1993,

    MACETES: [
      {
        severity: 'OK',
        title: 'Mesmo motor da AME — toda manutenção do VW a ar se aplica',
        body: 'A Kahena usa o mesmo bloco VW 1584cc boxer ar-resfriado da AME 1600, com as mesmas necessidades de manutenção: óleo 20W-50 mineral a cada 5.000 km, regulagem de válvulas a cada 10.000 km, velas NGK B5HS, platinado 0,4 mm. A versão de 90cv é uma preparação do mesmo motor (carburadores maiores + compressão levemente elevada).',
      },
      {
        severity: 'OK',
        title: 'Eixo cardan: manutenção mais simples que corrente, mas não negligencia',
        body: 'Versões tardias da Kahena usam eixo cardan em vez de corrente. Vantagem: sem lubrificação periódica da corrente. Manutenção necessária: graxa nas juntas universais a cada 20.000 km ou quando perceber vibração ou clique ao engatar a marcha. Graxa específica para juntas CV/cardan (Bosch, Wurth). Custo de revisão do cardan: R$ 300–R$ 600.',
      },
      {
        severity: 'WARN',
        title: 'Pneus ZR (radiais de alta velocidade): verifique a pressão semanalmente',
        body: 'A Kahena usa pneus radiais Pirelli de alta performance: 120/70 ZR18 dianteiro e 170/60 ZR17 traseiro. Diferente dos pneus 90-16 da AME, pneus ZR com pressão baixa se deterioram rapidamente na flanco. Com 317 kg de moto: 33 PSI dianteiro e 40 PSI traseiro sem carga. Com garupa: eleve traseiro para 44–46 PSI.',
      },
      {
        severity: 'OK',
        title: 'Motor 90cv: não use em rotações acima de 5.000 rpm por mais de 30 segundos',
        body: 'A versão de 90 cv da Kahena tem compressão levemente elevada e carburadores maiores — o motor original VW era projetado para 4.200 rpm contínuos. A preparação aumenta a potência mas também o estresse térmico. Em viagem estrada: mantenha entre 3.500 e 4.500 rpm. Acelerações fortes devem ser seguidas de trechos em rotação média para dissipar o calor.',
      },
    ],

    PROBLEMAS: [
      {
        severity: 'DANGER',
        title: 'Superaquecimento: risco ainda presente, agravado pela versão 90cv',
        body: 'A Kahena é mais leve e esportiva, mas continua com motor ar-resfriado. A versão de 90cv gera mais calor ainda. Em trânsito parado ou baixas velocidades por mais de 5 minutos, o motor pode entrar em zona crítica. Evite cidades com tráfego intenso se não tiver estratégia de resfriamento (mover a moto a pé, desligar o motor). Custo de reforma por superaquecimento: R$ 2.500–R$ 5.000.',
      },
      {
        severity: 'WARN',
        title: 'Peças específicas Kahena: muito mais difíceis de encontrar que AME',
        body: 'Enquanto as peças do motor VW se encontram facilmente, as peças de chassi, carroceria, suspensão e elétrica específicas da Kahena são extremamente raras — apenas ~100 unidades foram fabricadas. Antes de comprar uma Kahena, certifique-se de que a unidade está em boa condição estrutural e confirme disponibilidade das peças específicas. Muitos proprietários precisam mandar fabricar peças sob encomenda.',
      },
      {
        severity: 'WARN',
        title: 'Consumo excessivo de óleo na versão 90cv: retentores não suportam a compressão elevada',
        body: 'A preparação para 90cv aumenta levemente a compressão e a temperatura de operação, acelerando o desgaste dos retentores de válvula. Kahenas de 90cv com mais de 30.000 km frequentemente consomem 300–500 mL de óleo a cada 1.000 km. Verificação do nível obrigatória antes de cada saída. Reforma da cabeça com retentores novos: R$ 1.500–R$ 3.000.',
      },
      {
        severity: 'WARN',
        title: 'Junta de cardan (versões tardias): vibração ao acelerar = diagnóstico urgente',
        body: 'A junta universal do eixo cardan pode desenvolver desgaste nas cruzetas, gerando vibração perceptível na aceleração e um "clique" ao sair da inércia. Com 317 kg de moto, junta cardan com problema piora rapidamente. Não ignore: ruptura do cardan em movimento pode travar a roda traseira. Revisão preventiva a cada 20.000 km. Cruzetas: R$ 150–R$ 400.',
      },
    ],

    MANUTENCAO: [
      {
        severity: 'OK',
        title: 'Óleo: 20W-50 mineral a cada 5.000 km — mesma especificação da AME',
        body: 'Mesmo motor VW 1584cc. Capacidade: 2,5 litros. Use mineral 20W-50 API SJ/SL. Versão 90cv: recomendado reduzir o intervalo para 4.000 km em uso intenso (alta rotação) para garantir frescor do óleo sob maior estresse térmico.',
      },
      {
        severity: 'OK',
        title: 'Pneus Pirelli ZR: troca quando a profundidade do sulco chegar a 2 mm',
        body: 'Pneus: 120/70 ZR18 (dianteiro) e 170/60 ZR17 (traseiro). Pneus radiais ZR de performance têm menor perfil e menos tolerância ao desgaste que os pneus do tipo-90 da AME clássica. Profundidade mínima legal: 1,6 mm. Recomendado: trocar ao chegar em 2 mm. Vida útil estimada: 10.000–15.000 km dianteiro; 8.000–12.000 km traseiro (dependendo do estilo de pilotagem). Reposição: Pirelli/Metzeler disponível em aro 17 e 18.',
      },
      {
        severity: 'WARN',
        title: 'Eixo cardan (versões tardias): graxa nas cruzetas a cada 20.000 km',
        body: 'Retire o eixo cardan, limpe as cruzetas com solvente e aplique graxa para juntas homocinéticas (Bosch, Mobil ou Wurth GHE). Inspecione o rolamento de saída da caixa de câmbio e o cone de entrada da caixa de redução final. Custo em oficina especializada: R$ 300–R$ 700.',
      },
      {
        severity: 'OK',
        title: 'Regulagem de válvulas, velas e platinado: mesma rotina da AME',
        body: 'Válvulas: 0,15 mm frio a cada 10.000 km. Velas: NGK B5HS, troca a cada 10.000 km. Platinado Bosch: abertura 0,4 mm, troca a cada 10.000 km. Versão 90cv: considere converter a ignição para módulo eletrônico — o platinado desgasta mais rápido com a compressão elevada.',
      },
    ],
  },

  // ── AME-110 MIX (2006–2009) ────────────────────────────────────────────────
  // Motor: OHC 110cc ar-resfriado, 7,09cv @ 7.000rpm
  // Câmbio: 4V rotativo, embreagem centrífuga automática, corrente
  // Freios: disco diant., tambor tras. | Pneus: aro 18 diant. / aro 17 tras. (off-road)
  // Peso: 95 kg | Tanque: 3,5 L | Relançamento com motor Loncin chinês

  {
    modelName: 'AME-110 MIX', yearFrom: 2006, yearTo: 2009,

    MACETES: [
      {
        severity: 'OK',
        title: 'Embreagem centrífuga: não segure o gás em parada longa',
        body: 'O motor 110cc usa embreagem centrífuga automática — não há alavanca de embreagem. Em paradas longas com motor ligado, mantenha o rotativo abaixo de 2.000 RPM. Segurar o acelerador em marcha lenta alta com a moto parada aquece a embreagem desnecessariamente e acelera o desgaste dos discos centrífugos.',
      },
      {
        severity: 'OK',
        title: 'Pneus off-road em asfalto: calibre um pouco mais alto',
        body: 'Os pneus com desenho off-road da AME-110 MIX são mais largos e macios que pneus de rua. Em uso 100% urbano (asfalto), calibre entre 28–30 PSI dianteiro e 30–32 PSI traseiro — um pouco acima do mínimo. Pneu off-road com pressão baixa em asfalto se desgasta muito mais rápido nas bordas.',
      },
      {
        severity: 'WARN',
        title: 'Tanque de 3,5L: abastecimento frequente obrigatório',
        body: 'Com tanque de apenas 3,5 litros e consumo de 40–45 km/L, a autonomia é de aproximadamente 140–160 km. Em viagens para fora da cidade, planeje abastecimentos a cada 100 km para não ficar a pé. A reserva não é generosa.',
      },
    ],

    PROBLEMAS: [
      {
        severity: 'DANGER',
        title: 'Peças de reposição praticamente inexistentes no Brasil',
        body: 'A Amazonas encerrou as atividades em 2009 e os modelos de relançamento usavam componentes Loncin (China) sem rede de distribuição consolidada. Peças específicas (relógio, carenagens, tanque, guiador, componentes elétricos) são extremamente difíceis de encontrar. Antes de comprar uma AME-110 usada, certifique-se de que a moto está em perfeito estado — qualquer peça quebrada pode exigir importação ou fabricação sob encomenda.',
      },
      {
        severity: 'WARN',
        title: 'Sistema elétrico fraco: partida elétrica falha com frequência',
        body: 'Relatos amplamente documentados de falha da partida elétrica em pouco tempo de uso — inclusive em testes de lançamento da própria imprensa. O sistema elétrico dos motores Loncin 110cc tem componentes de baixa durabilidade (regulador de tensão, bobina de ignição, CDI). Mantenha o pedal de partida sempre funcional como backup. Custo de reparo elétrico: R$ 150–R$ 400.',
      },
      {
        severity: 'WARN',
        title: 'Buzina e acessórios: qualidade inferior ao padrão nacional',
        body: 'Componentes elétricos auxiliares (buzina, lâmpadas, relés) apresentam curta vida útil. Substitua por peças universais da Showa, Valeo ou similares — são compatíveis e muito mais duráveis. Custo unitário: R$ 20–R$ 80 dependendo do componente.',
      },
    ],

    MANUTENCAO: [
      {
        severity: 'OK',
        title: 'Óleo: 20W-50 mineral, 0,9–1,0 L — troca a cada 3.000 km',
        body: 'Motor Loncin 110cc ar-resfriado. Use óleo mineral SAE 20W-50 ou 15W-40 API SJ/SL. Capacidade aproximada: 0,9–1,0 litro (verifique a vareta — não existe um valor universal para os motores Loncin, pois variam por lote). Troca a cada 3.000 km — motor pequeno gera muito calor por litro de óleo.',
      },
      {
        severity: 'OK',
        title: 'Corrente de transmissão: lubrificação a cada 300–500 km',
        body: 'Corrente fina de 420 ou 428 (padrão 110cc). Lubrifique com spray de corrente ou óleo 90 a cada 300–500 km. Tensão: folga lateral de 10–15 mm. Com peças originais difíceis de encontrar, ao trocar a corrente use uma corrente universal de mesmo passo (DID, RK ou similares) — mais duráveis e amplamente disponíveis.',
      },
      {
        severity: 'OK',
        title: 'Vela de ignição: NGK C7HSA ou equivalente — troca a cada 5.000 km',
        body: 'Vela padrão para motores 110cc Loncin/Honda-clone: NGK C7HSA (gap 0,6–0,7 mm). Custo: R$ 15–R$ 25. Vela escurecida = mistura rica (carburador desregulado). Vela branca = mistura pobre ou superaquecimento. Troca a cada 5.000 km preventivamente.',
      },
    ],
  },

  // ── AME-150 TC/ SC (2007–2009) ──────────────────────────────────────────────
  // Motor: monocilíndrico 149,5cc ar-resfriado, 11cv @ 8.000rpm, câmbio CVT automático
  // TC = Trail/City | SC = Scooter (aro 13")

  {
    modelName: 'AME-150 TC/ SC', yearFrom: 2007, yearTo: 2009,

    MACETES: [
      {
        severity: 'OK',
        title: 'CVT: não force aceleração brusca em partidas — desgasta a variadora',
        body: 'O câmbio CVT da AME-150 SC usa polias variáveis e correia. Aceleração suave e progressiva aumenta significativamente a vida útil da correia CVT e das polias. Arranque forte do zero causa escorregamento da correia e desgaste prematuro. Correia CVT de reposição universal (para motores 150cc): R$ 80–R$ 200.',
      },
      {
        severity: 'WARN',
        title: 'Pneus aro 13" (versão SC): verifique pressão semanalmente',
        body: 'A versão scooter usa rodas pequenas de aro 13" — qualquer alteração de pressão é mais perceptível na dirigibilidade. Com pressão baixa, a moto "balança" nas curvas. Calibragem recomendada: 28 PSI dianteiro e 30 PSI traseiro sem carga.',
      },
      {
        severity: 'OK',
        title: 'Compartimento sob banco: não exceda 5 kg de carga',
        body: 'O baú sob o banco da versão SC tem capacidade para um capacete fechado, mas o peso distribuído nessa posição afeta o equilíbrio da moto. Evite usar como carga regular acima de 5 kg — amortecedor traseiro não foi dimensionado para isso.',
      },
    ],

    PROBLEMAS: [
      {
        severity: 'DANGER',
        title: 'Peças de reposição raríssimas — empresa encerrou em 2009',
        body: 'Igual a todos os modelos AME de relançamento: a Amazonas encerrou definitivamente em 2009 sem rede de suporte. Peças específicas do modelo SC (carenagens, painel, rodas aro 13", correia CVT original) são praticamente impossíveis de encontrar. Use apenas se você conseguir mapear uma fonte confiável de peças — ou esteja preparado para garimpar importações.',
      },
      {
        severity: 'WARN',
        title: 'Correia CVT: desgaste acelerado em subidas e cargas',
        body: 'O CVT do 150cc Loncin não é robusto para uso em terrenos com muito declive ou com garupa constante. Correia que patina gera cheiro de borracha queimada — sinal de troca urgente. Ao trocar, use correia de moto 150cc scooter chinesa (Gates, Dayco ou importação direta): largura e comprimento devem ser conferidos com paquímetro na correia velha.',
      },
      {
        severity: 'WARN',
        title: 'Sistema elétrico fraco: mesmo padrão da AME-110 MIX',
        body: 'Componentes elétricos Loncin de qualidade abaixo do padrão do mercado nacional. Partida elétrica, regulador de tensão e bobina de ignição são os pontos mais vulneráveis. Mantenha partida a pedal funcional. Regulador de tensão universal 12V de moto para Loncin 150cc: R$ 50–R$ 120.',
      },
    ],

    MANUTENCAO: [
      {
        severity: 'OK',
        title: 'Óleo: 15W-40 ou 20W-50 mineral, ~1,0 L — troca a cada 3.000 km',
        body: 'Motor 150cc Loncin ar-resfriado. Capacidade aproximada: 1,0–1,1 litros. Use mineral SAE 15W-40 ou 20W-50 API SJ. Intervalo máximo: 3.000 km. Motor pequeno de alta rotação (até 8.000 RPM) degrada o óleo mais rapidamente que motores de maior cilindrada.',
      },
      {
        severity: 'WARN',
        title: 'Correia CVT: inspecione a cada 5.000 km, troque a cada 10.000–15.000 km',
        body: 'A correia CVT se desgasta por atrito e calor. Inspecione visualmente procurando trincas, desgaste nas laterais ou fissuras na superfície. Não há ajuste — correia gasta = troca. Medidas da correia: anote o comprimento, largura máxima e mínima da correia original para encontrar equivalente.',
      },
      {
        severity: 'OK',
        title: 'Vela de ignição: NGK CR7HSA — troca a cada 5.000 km',
        body: 'Motores 150cc scooter Loncin: NGK CR7HSA (versão com resistor, supressão de ruído). Gap: 0,6–0,7 mm. Custo: R$ 20–R$ 35. Troca junto com filtro de ar na mesma revisão.',
      },
    ],
  },

  // ── AME-250 C1 (2007–2009) ──────────────────────────────────────────────────
  // Motor: Loncin OHC 4V 249cc ar-resfriado, 21,5cv @ 6.700rpm, torque 2,56 kgf.m
  // Câmbio: 5V mecânico, embreagem multidisco em banho de óleo, transmissão por corrente
  // Freios: disco duplo diant., disco simples tras. | Pneus: 110/90-16 / 130/90-15
  // Peso: 185 kg | Tanque: 18 L | Óleo: 1,6 L

  {
    modelName: 'AME-250 C1', yearFrom: 2007, yearTo: 2009,

    MACETES: [
      {
        severity: 'OK',
        title: 'Carburador: limpe a cada 10.000 km para evitar engasgos',
        body: 'O motor Loncin 249cc usa carburador de corpo único. Depósitos de verniz de combustível (especialmente com gasolina adulterada ou etanol residual) entopem o jato principal e causam engasgos entre 50–80 km/h. Limpeza preventiva com spray de carburador a cada 10.000 km: R$ 80–R$ 150 em oficina. Sintoma: moto engasga ao abrir o gás em rotação constante.',
      },
      {
        severity: 'OK',
        title: 'Embreagem multidisco em banho de óleo: evite arranques bruscos',
        body: 'Diferente dos modelos menores, a AME-250 C1 tem embreagem manual multidisco em banho de óleo. A embreagem e o motor compartilham o mesmo óleo — usar óleo errado (sem antiderrapagem para embreagem molhada) faz a embreagem patinar. Use óleo específico para motos com embreagem molhada: Motul 7100, Shell Advance, Repsol Moto 4 ou similar com "JASO MA2" na embalagem.',
      },
      {
        severity: 'WARN',
        title: 'Guarde a nota fiscal e o manual: essenciais para diagnóstico futuro',
        body: 'Com peças difíceis de encontrar, toda documentação é valiosa. O manual da AME-250 existe em PDF (traduzido do inglês) e contém as especificações exatas de válvulas, vela, óleo e pneus. Guarde o link: busque "Manual Amazonas 250 AME Português" — há uma versão no Scribd amplamente compartilhada por proprietários.',
      },
    ],

    PROBLEMAS: [
      {
        severity: 'DANGER',
        title: 'Peças de reposição: mercado praticamente inexistente no Brasil',
        body: 'A AME-250 C1 usava componentes Loncin sem rede de distribuição oficial. Com a empresa fechada desde 2009, peças originais são encontradas apenas em desmanche de outras unidades. Peças intercambiáveis com Loncin 250cc genérico (vendido no AliExpress e similares) podem funcionar, mas exigem verificação de compatibilidade dimensional. Proprietários recomendam entrar em grupos de Facebook/WhatsApp de AME-250 para localizar peças.',
      },
      {
        severity: 'WARN',
        title: 'Ruído "toc-toc" rítmico: múltiplas causas conhecidas',
        body: 'Problema muito relatado pelos proprietários: ruído metálico rítmico no motor. Causas em ordem de frequência: (1) cabo da vela solto ou vela não assentada corretamente — verificar e apertar; (2) protetor térmico do escapamento frouxo — apertar os parafusos; (3) folga de válvulas fora do padrão — regular. Comece pelas causas simples antes de abrir o motor. Custo: R$ 0 a R$ 200.',
      },
      {
        severity: 'WARN',
        title: 'Tampa do tanque: não veda corretamente e vaza combustível',
        body: 'Problema relatado por vários proprietários: a tampa do tanque de 18L não veda adequadamente, especialmente com gasolina morna (expansão). Resultado: vazamento de combustível pela tampa em percurso. Solução temporária: fita PTFE (veda rosca) ao redor da vedação da tampa. Solução definitiva: trocar a borracha de vedação por uma genérica de diâmetro compatível.',
      },
      {
        severity: 'WARN',
        title: 'Motor engasga entre 50–80 km/h: carburador desregulado',
        body: 'O engasgo em aceleração constante (cruise control manual) é o problema mecânico mais comum. Causa principal: jato principal do carburador parcialmente entupido ou agulha de dosagem fora da posição. O jato genérico para Loncin 249cc (geralmente Keihin compatível) é encontrado em lojas de peças para motos chinesas. Custo do jato: R$ 10–R$ 30.',
      },
    ],

    MANUTENCAO: [
      {
        severity: 'WARN',
        title: 'Óleo: JASO MA2, 10W-40 semissintético, 1,6 L — troca a cada 3.000–5.000 km',
        body: 'ATENÇÃO: por ter embreagem multidisco em banho de óleo, use OBRIGATORIAMENTE óleo com certificação JASO MA ou MA2. Óleo de carro comum (API SN) tem aditivos antiderrapagem que fazem a embreagem patinar. Recomendado: Motul 5100 10W-40, Shell Advance AX7 10W-40 ou Repsol Moto 4T 10W-40. Capacidade: 1,6 litros exatos. Troca a cada 3.000–5.000 km.',
      },
      {
        severity: 'OK',
        title: 'Regulagem de válvulas a cada 10.000 km: folga admissão 0,06–0,09 mm, escape 0,08–0,11 mm',
        body: 'Motor OHC 4 válvulas Loncin 249cc. Folga de admissão: 0,06–0,09 mm. Folga de escape: 0,08–0,11 mm. Motor completamente frio (mínimo 3 horas parado). Verificação com calibre de lâminas. Fora do padrão: barulho de válvulas e perda de potência a fundo de carga.',
      },
      {
        severity: 'OK',
        title: 'Vela de ignição: abertura 0,6–0,7 mm — troca a cada 8.000 km',
        body: 'Especificação do manual: abertura do eletrodo 0,6–0,7 mm. Equivalente NGK: DR8EA (não elétrica) ou CR8EH-9 (com resistor). Verifique qual se encaixa no motor sem resistor. Custo: R$ 20–R$ 40. Troca junto com filtro de ar.',
      },
      {
        severity: 'OK',
        title: 'Corrente de transmissão: lubrifique a cada 500 km, tensão 20–30 mm',
        body: 'Com 185 kg de moto e motor de 21,5cv, a corrente trabalha mais do que em motos de 110cc. Lubrifique com spray de corrente a cada 500 km. Folga lateral (ponto mais frouxo): 20–30 mm. Corrente padrão 520 ou 525 (verifique com paquímetro). Troca a cada 20.000–25.000 km ou quando apresentar elos rígidos.',
      },
      {
        severity: 'OK',
        title: 'Filtro de ar: inspecione a cada 5.000 km, troque a cada 15.000 km',
        body: 'Filtro de esponja (foam) padrão Loncin 249cc. Limpeza: bata suavemente, sopre com ar comprimido de fora para dentro. Troca preventiva a cada 15.000 km ou quando escurecer visivelmente. Filtro equivalente disponível em lojas de peças para motos 250cc chinesas (busque por "filtro de ar Loncin 250").',
      },
    ],
  },

  // ── AME-LX 125/26 (2006–2009) ──────────────────────────────────────────────
  // Motor: monocilíndrico 125cc ar-resfriado, ~8,5cv, câmbio CVT automático
  // Scooter urbano | Rodas 26" | Freio diant. a disco, tras. a tambor
  // Tanque: 5,5 L | Consumo: 40–50 km/L | Compartimento sob banco

  {
    modelName: 'AME-LX 125/26', yearFrom: 2006, yearTo: 2009,

    MACETES: [
      {
        severity: 'OK',
        title: 'Autonomia real: abasteça sempre que chegar em metade do tanque',
        body: 'Tanque de 5,5L com consumo de 40–50 km/L = autonomia de 220–275 km. Mas o medidor de combustível dos scooters Loncin é pouco preciso — pode indicar "meio tanque" com menos de 1,5L disponível. Hábito seguro: abasteça ao sinal de reserva sem deixar para depois. Trânsito urbano pode variar muito o consumo.',
      },
      {
        severity: 'OK',
        title: 'Compartimento sob banco: 5 kg máximo, capacete fechado é o ideal',
        body: 'O compartimento acomoda um capacete fechado. Cargas acima de 5 kg afetam o equilíbrio (o peso fica alto e atrás do eixo traseiro) e sobrecarregam o amortecedor traseiro, que já é simples. Para compras ou entregas leves, use uma bolsa de guidão ou bag de alforje.',
      },
      {
        severity: 'WARN',
        title: 'Roda de 26 polegadas: cuidado extra em lombadas e buracos',
        body: 'Rodas grandes de 26" proporcionam estabilidade em linha reta, mas a roda dianteira de 26" é mais vulnerável a danos de impacto em lombadas agressivas e buracos. Reduza a velocidade antes de qualquer irregularidade. O aro e os raios (se for raiada) podem dobrar — verificação visual mensal recomendada.',
      },
    ],

    PROBLEMAS: [
      {
        severity: 'DANGER',
        title: 'Peças exclusivas da AME-LX: mercado inexistente',
        body: 'O AME-LX 125/26 usa componentes exclusivos (rodas 26", painel, carenagens, bau traseiro) que não possuem equivalente no mercado nacional. A empresa encerrou em 2009. Comprar uma unidade com peças danificadas pode resultar em moto inoperante permanentemente. Adquira apenas em estado impecável ou com estoque de peças.',
      },
      {
        severity: 'WARN',
        title: 'Sistema elétrico: regulador de tensão falha silenciosamente',
        body: 'O regulador de tensão Loncin 125cc costuma falhar sem sinal claro — quando vai mal, começa a sobretensionar a bateria (bateria "borbulhando"), queimar lâmpadas com frequência e eventualmente matar o CDI. Sintoma precoce: lâmpadas mais brilhantes que o normal. Regulador universal 12V de moto (R$ 50–R$ 100) resolve — verifique o conector antes de instalar.',
      },
      {
        severity: 'WARN',
        title: 'Correia CVT: desgaste acelera em temperaturas altas',
        body: 'CVT de scooter 125cc em cidade quente (Manaus, Cuiabá, Salvador, Rio): o calor encurta a vida da correia. Verifique sinais de desgaste a cada 8.000 km. Barulho de "rangido" ao acelerar = correia patinando = troca urgente. Use correia universal para scooter 125cc chinês (meça a correia velha antes de substituir).',
      },
    ],

    MANUTENCAO: [
      {
        severity: 'OK',
        title: 'Óleo: 10W-40 ou 15W-40 mineral, ~0,9 L — troca a cada 3.000 km',
        body: 'Motor 125cc Loncin ar-resfriado. Capacidade: ~0,9 litros. Use SAE 10W-40 ou 15W-40 API SJ mineral. Para CVT integrado ao motor (se compartilhar o mesmo cárter), use JASO MB (especificação de scooter). Verifique no manual ou na vareta se há compartimento separado para o CVT.',
      },
      {
        severity: 'OK',
        title: 'Correia CVT: inspecione a cada 8.000 km, troque a cada 15.000–20.000 km',
        body: 'Meça a correia com paquímetro: largura máxima, largura mínima e comprimento externo. Com essas medidas, busque equivalente em sites de peças para scooters chineses (Aliexpress, DH Gate ou lojas de peças para moto no atacado). Correia nova: R$ 60–R$ 180 dependendo da marca.',
      },
      {
        severity: 'OK',
        title: 'Vela: NGK CR6HSA — troca a cada 5.000 km',
        body: 'Scooters 125cc Loncin: NGK CR6HSA (com resistor, padrão de scooter). Gap: 0,6–0,7 mm. Custo: R$ 20–R$ 30. Troca junto com filtro de ar.',
      },
    ],
  },
]

// ─── Calibragem de pneus ──────────────────────────────────────────────────────

const amazonasTirePressures = [
  {
    modelName: 'AME 1600',
    yearFrom: 1978,
    yearTo: 1988,
    tireSize: '120/90-16 (diant.) / 130/90-16 (tras.)',
    frontPsi: 32,
    rearPsi: 38,
    frontPsiLoad: 34,
    rearPsiLoad: 42,
    sparePsi: null,
    notes: 'Pressão crítica para uma moto de 384 kg — pneus subpressurizados comprometem gravemente o controle. Calibre SEMPRE com pneu frio (moto parada há pelo menos 2 horas). Com garupa ou bagagem pesada: eleve o traseiro para 42 PSI. Nunca ultrapasse 44 PSI (limite do tipo de pneu). Verifique semanalmente.',
    order: 0,
  },
  {
    modelName: 'Kahena',
    yearFrom: 1990,
    yearTo: 1993,
    tireSize: '120/70 ZR18 (diant.) / 170/60 ZR17 (tras.)',
    frontPsi: 33,
    rearPsi: 40,
    frontPsiLoad: 36,
    rearPsiLoad: 44,
    sparePsi: null,
    notes: 'Pneus radiais ZR de alta performance. Moto pesa 317 kg. Calibre com pneu frio. Com garupa: 36/44 PSI. Pneus ZR com pressão baixa sofrem dano estrutural no flanco — troque imediatamente se perceber deformação lateral. Pneu OEM: Pirelli (aro 17 e 18 disponíveis no Brasil).',
    order: 1,
  },
  {
    modelName: 'AME-110 MIX',
    yearFrom: 2006,
    yearTo: 2009,
    tireSize: 'Off-road aro 18 (diant.) / aro 17 (tras.)',
    frontPsi: 28,
    rearPsi: 30,
    frontPsiLoad: 30,
    rearPsiLoad: 33,
    sparePsi: null,
    notes: 'Pneus com desenho off-road em aros 18/17. Moto leve com 95 kg. Para uso exclusivo em asfalto, eleve para 30/32 PSI (melhora durabilidade do pneu). Calibre sempre frio. Pressão exata não consta no manual — valores baseados em padrão de motos 110cc com pneus off-road.',
    order: 2,
  },
  {
    modelName: 'AME-150 TC/ SC',
    yearFrom: 2007,
    yearTo: 2009,
    tireSize: 'Aro 13" (versão SC scooter)',
    frontPsi: 28,
    rearPsi: 30,
    frontPsiLoad: 30,
    rearPsiLoad: 33,
    sparePsi: null,
    notes: 'Versão SC (scooter) usa rodas compactas de aro 13". Calibragem baseada em padrão para scooters 150cc com roda pequena. Pressão baixa em aro 13" é imediatamente perceptível na dirigibilidade (balança em curvas). Verifique semanalmente.',
    order: 3,
  },
  {
    modelName: 'AME-250 C1',
    yearFrom: 2007,
    yearTo: 2009,
    tireSize: '110/90-16 (diant.) / 130/90-15 (tras.)',
    frontPsi: 28,
    rearPsi: 32,
    frontPsiLoad: 30,
    rearPsiLoad: 36,
    sparePsi: null,
    notes: 'Pneus 110/90-16 dianteiro e 130/90-15 traseiro. Moto de 185 kg. Calibre com pneu frio. Com garupa ou carga: 30/36 PSI. Pressão nominal não consta no manual oficial (há versão em PDF circulando na comunidade AME-250) — valores baseados em padrão para motos 250cc de mesmo peso e perfil de pneu.',
    order: 4,
  },
  {
    modelName: 'AME-LX 125/26',
    yearFrom: 2006,
    yearTo: 2009,
    tireSize: 'Aro 26" (diant. e tras.)',
    frontPsi: 30,
    rearPsi: 32,
    frontPsiLoad: 32,
    rearPsiLoad: 35,
    sparePsi: null,
    notes: 'Scooter com rodas grandes de 26". Pressão baseada em padrão para scooters com rodas de grande diâmetro. Inspecione o aro visualmente a cada mês — rodas de 26" são mais vulneráveis a danos em lombadas. Calibre sempre frio.',
    order: 5,
  },
]

// ─── Modelos a adicionar ao catálogo ─────────────────────────────────────────

const amazonasModels = ['AME 1600', 'Kahena', 'AME-110 MIX', 'AME-150 TC/ SC', 'AME-250 C1', 'AME-LX 125/26']

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🏍️  Iniciando seed Amazonas...')

  const allModelNames = amazonasModels

  // Remove dados existentes de Amazonas para seed limpo
  const deletedTips = await prisma.tip.deleteMany({ where: { modelName: { in: allModelNames } } })
  const deletedTp   = await prisma.tirePressure.deleteMany({ where: { modelName: { in: allModelNames } } })
  console.log(`🗑️  Removidas ${deletedTips.count} dicas e ${deletedTp.count} calibragens antigas de Amazonas`)

  // Insere dicas por modelo
  const cats: Cat[] = ['MACETES', 'PROBLEMAS', 'MANUTENCAO']
  let totalTips = 0

  for (const block of amazonasTips) {
    for (const cat of cats) {
      const tips = block[cat]
      for (let i = 0; i < tips.length; i++) {
        const t = tips[i]
        await prisma.tip.create({
          data: {
            modelName: block.modelName,
            category:  cat,
            severity:  t.severity,
            title:     t.title,
            body:      t.body,
            yearFrom:  null,
            yearTo:    null,
            order:     i,
          },
        })
        totalTips++
      }
    }
  }
  console.log(`✅ ${totalTips} dicas de Amazonas inseridas`)

  // Insere calibragens de pneus
  for (const tp of amazonasTirePressures) {
    await prisma.tirePressure.create({ data: tp })
  }
  console.log(`✅ ${amazonasTirePressures.length} calibragens de Amazonas inseridas`)

  // Adiciona marca e modelos ao catálogo
  const motoType = await prisma.vehicleType.findFirst({ where: { slug: 'moto' } })
  if (motoType) {
    let brand = await prisma.brand.findFirst({ where: { name: 'Amazonas', vehicleTypeId: motoType.id } })
    if (!brand) {
      brand = await prisma.brand.create({
        data: { name: 'Amazonas', vehicleTypeId: motoType.id },
      })
      console.log('✅ Marca Amazonas criada no catálogo')
    }

    let modelsAdded = 0
    for (const modelName of amazonasModels) {
      const exists = await prisma.vehicleModel.findFirst({ where: { name: modelName, brandId: brand.id } })
      if (!exists) {
        await prisma.vehicleModel.create({ data: { name: modelName, brandId: brand.id } })
        modelsAdded++
      }
    }
    console.log(`✅ ${modelsAdded} novos modelos Amazonas adicionados ao catálogo`)
  }

  const tipCount = await prisma.tip.count({ where: { modelName: { in: allModelNames } } })
  const tpCount  = await prisma.tirePressure.count({ where: { modelName: { in: allModelNames } } })
  console.log(`\n📊 Resumo Amazonas: ${tipCount} dicas | ${tpCount} calibragens`)
  console.log('✅ Seed Amazonas concluído!')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
