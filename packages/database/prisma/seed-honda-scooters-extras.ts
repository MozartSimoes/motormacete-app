// seed-honda-scooters-extras.ts — Honda ELITE 125 · LEAD 110 · Forza 350
// ELITE 125: scooter urbana 124,9cc eSP OHC PGM-FI (2019+), JASO MA 10W-30, CVT; pneus 90/90-12 (F) 100/90-10 (R)
// LEAD 110: scooter urbana 109cc OHC carburado (2006-2015), JASO MB, CVT
// Forza 350: maxi-scooter 329cc SOHC PGM-FI liquid-cooled (2021+), JASO MB, CVT
// Todos usam CVT (variador + correia) — nenhum tem câmbio manual
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

// ─── ELITE 125 (2019+) — FIPE código 8557 ────────────────────────────────────
// Motor: 124,9cc eSP OHC PGM-FI | Óleo: 10W-30 JASO MA, 0,75 L | Pneus: 90/90-12 (F) / 100/90-10 (R)
// Correia CVT OEM: 23100-K69-601 | Bando 750-20-30-9.5 | Roletes: 14g (6 unidades)
// Bateria: YTZ6V 12V 5Ah (NÃO YTX5L-BS) | Vela: NGK CPR6EA-9 gap 0,9 mm | SEM kickstarter

const ELITE125_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 124,9cc eSP OHC PGM-FI: óleo 10W-30 JASO MA, 0,75 L — troca a cada 4.000 km ou 12 meses; 1ª troca obrigatória em 1.000 km',
    body: 'A Elite 125 usa tecnologia eSP (Enhanced Smart Power): motor OHC de 124,9cc (diâmetro 50,3 mm × curso 63,1 mm), injeção PGM-FI e sistema Idling Stop. Óleo: Honda recomenda SAE 10W-30 API SL JASO MA — 0,75 L na troca normal, 0,8 L na revisão completa com filtro de tela. JASO MA (não MB) conforme manual Honda Elite 125. Opções: Honda Genuine Scooter Oil 10W-30, Motul Scooter Expert MA, Castrol GTX Scooter 10W-30. Troca: a cada 4.000 km ou 12 meses. 1ª revisão (1.000 km): gratuita na concessionária, inclui troca de óleo e ajuste de válvulas. Trânsito pesado/calor intenso: antecipar para 3.000 km.',
  },
  {
    severity: 'OK',
    title: 'Correia CVT: trocar preventivamente a cada 20.000 km; código OEM Honda 23100-K69-601; alternativa Bando 750-20-30-9.5 — nunca deixar romper em movimento',
    body: 'A correia CVT da Elite 125 é trapezoidal especificação: aprox. 750 mm comprimento × 20 mm largura × 30° ângulo do flanco. OEM Honda: código 23100-K69-601 (R$244-289). Alternativas confiáveis: Bando 750-20-30-9.5 (R$169-190), Allen 82961 (R$100-130). Trocar preventivamente a cada 20.000 km — não esperar romper. Sintomas de desgaste: (1) RPM sobem mas velocidade não acompanha; (2) cheiro de borracha queimada; (3) chiado ou fiapos visíveis. Correia rompida em movimento causa perda brusca de tração e pode danificar a caixa do CVT (reparo extra de R$400-800). Inspecionar visualmente rachaduras nas bordas a cada 10.000 km.',
  },
  {
    severity: 'OK',
    title: 'Roletes do variador: 14g originais — verificar ovalização a cada 10.000 km; Dr. Pulley 16x13mm para tuning suave; Kit Honda OEM 22123-KCW-305 (6 roletes)',
    body: 'Os 6 roletes do variador da Elite 125 pesam 14g cada (especificação Honda OEM). Desgaste: ficam ovalizados e/ou mais leves → solavanco ao sair do ponto, velocidade máxima reduzida. Verificar com paquímetro — ovalização >0,5 mm = trocar. Kit OEM Honda 22123-KCW-305 (6 roletes, R$80-120). Alternativas: Tech Pulley 14g (R$40-70), Dr. Pulley SR161365 16×13mm (R$80-150 importado). Tuning: roletes mais leves (12-13g) = melhor aceleração inicial; mais pesados (15-16g) = maior velocidade de cruzeiro em rodovias. Para uso urbano: manter o peso original de 14g.',
  },
  {
    severity: 'OK',
    title: 'Vela NGK CPR6EA-9 — gap 0,9 mm; trocar a cada 8.000 km; iridium CPR6EAIX-9 dura 16.000 km; equivalente Denso U20EPR9',
    body: 'Vela original da Elite 125: NGK CPR6EA-9, gap 0,9 mm. Troca: a cada 8.000 km (cobre) ou 16.000 km (iridium NGK CPR6EAIX-9). Alternativa Denso: U20EPR9 (cobre) ou IU20 (iridium). Preços: cobre NGK R$20-35, iridium NGK R$50-70. Acesso: compartimento central superior sob o banco, ou remoção da tampa lateral esquerda (2-3 clips). Torque: 10-12 N.m — rosca de alumínio no cabeçote, nunca apertar a seco. Sintomas de vela ruim: partida difícil a frio, marcha lenta instável, consumo levemente aumentado.',
  },
  {
    severity: 'OK',
    title: 'Rodagem: primeiros 1.000 km são críticos — max 1/2 acelerador até 500 km; max 3/4 até 1.000 km; 1ª revisão gratuita na concessionária Honda',
    body: 'Nos primeiros 1.000 km da Elite 125: (1) 0-500 km: abrir acelerador no máximo até a metade do curso; variar as rotações constantemente; evitar RPM fixo prolongado; sem viagens longas. (2) 500-1.000 km: pode aumentar o ritmo, mas máximo 3/4 do curso. (3) Primeiro abastecimento: use gasolina de posto confiável — gasolina adulterada nos primeiros km prejudica a regulagem do PGM-FI. (4) 1.000 km: levar à concessionária para a 1ª revisão GRATUITA: inclui troca de óleo, ajuste de válvulas, inspeção geral. Não pular esta revisão — é paga pela garantia Honda e define o estado da moto para os próximos 40.000 km.',
  },
  {
    severity: 'OK',
    title: 'Idling Stop System: botão específico no painel para ativar/desativar; desligar em subidas, trânsito irregular, bateria fraca ou temperatura >35°C',
    body: 'O sistema Idling Stop da Elite 125 desliga o motor automaticamente após 3 segundos parado (sinal, trânsito) e relíga ao abrir o acelerador. Economia declarada Honda: até 10% de combustível em uso urbano intenso. Quando DESLIGAR o Idling Stop: (1) Subidas de rampa — risco de rolar para trás ao religar. (2) Bateria com menos de 12,4 V em repouso — o sistema exige bateria saudável. (3) Temperatura acima de 35°C — o motor pode precisar rodar mais para dissipar calor. (4) Trânsito com arranque e parada rápidos (<3 s) — o motor não chega a desligar, consumindo ciclos de partida desnecessários. O Idling Stop deixa de funcionar automaticamente quando a bateria está fraca — é o primeiro sinal de bateria deteriorando.',
  },
  {
    severity: 'OK',
    title: 'Bateria YTZ6V (12V 5Ah AGM) — NÃO é YTX5L-BS; verificar 12,6V em repouso; ELITE 125 não tem kickstarter — bateria morta = moto parada',
    body: 'A bateria correta da Elite 125 é a **YTZ6V** (114 × 71 × 105 mm, 5 Ah, 90 CCA) — muitas lojas vendem a YTX5L-BS erroneamente (dimensões ligeiramente diferentes). Marcas recomendadas: Yuasa YTZ6V (R$180-220), Moura equivalente (R$150-180), Heliar (R$150-190). Verificação de saúde: com multímetro nos terminais, moto desligada: 12,6V = boa; 12,2V = precisa de recarga; abaixo de 11,5V = morta. Em uso, com motor rodando: 13,5-14,5V = alternador saudável. O Idling Stop e os partidas frequentes do sistema sobrecarregam a bateria em uso urbano intenso — vida útil média: 2-3 anos. Moto parada >7 dias: usar carregador de manutenção (Redeleg, CTEK) ou desconectar o terminal negativo.',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas Elite 125: correia Bando 750-20-30-9.5, pastilha Cobreq N-909 (81×42×7,6mm), pneu Pirelli SL26 90/90-12 + 100/90-10',
    body: 'Peças alternativas confiáveis para Elite 125: CORREIA CVT: Bando 750-20-30-9.5 (R$169-190) ou Allen 82961 (R$100-130). ROLETES: Tech Pulley 14g (R$40-70). VELA: NGK CPR6EAIX-9 iridium (R$50-70) ou Denso IU20. FILTRO DE AR: Vedamotors/Athena (R$30-50), Hiflofiltro Honda CH125 (R$45-65). PASTILHA DIANTEIRA: Cobreq N-909 (81×42×7,6mm, R$35-55) ou Fischer FJ-840 (R$40-60) ou EBC FA-092 (R$60-90). PNEU DIANTEIRO 90/90-12: Pirelli SL26 (R$340-390), Michelin City Grip (R$320-380), Levorin Matrix (R$220-280). PNEU TRASEIRO 100/90-10: Pirelli SL26 (R$290-350), Michelin S1 (R$338-380). Combo Pirelli SL26 (F+R): R$600-750.',
  },
  {
    severity: 'OK',
    title: 'Ajuste de válvulas: IN 0,08 mm / EX 0,12 mm (motor frio) — inspecionar a cada 8.000 km; parafuso+contra-porca (não calços)',
    body: 'O motor eSP da Elite 125 usa sistema de ajuste de válvulas por parafuso com contra-porca (não por calços). Folgas corretas com motor COMPLETAMENTE frio: admissão (IN) 0,08 mm; escape (EX) 0,12 mm. Intervalo: inspeção a cada 8.000 km, incluindo na 1ª revisão (1.000 km). Procedimento: acesso pelo cabeçote após remover o painel superior; posicionar pistão no PMS (ponto morto superior) na fase de compressão; medir com régua de folgas; ajustar se necessário. Válvulas fechadas (folga maior que o especificado): marcha lenta áspera, possível ruído de "bate-válvula". Válvulas abertas (folga menor): compressão reduzida, partida difícil, superaquecimento.',
  },
  {
    severity: 'OK',
    title: 'Baú de 19,7 L sob o banco: cabe capacete aberto tamanho M; cavalete central facilita acesso; lubrificar eixo do cavalete com graxa de lítio a cada 3-6 meses',
    body: 'O baú sob o banco da Elite 125 tem capacidade de 19,7 L — suficiente para capacete aberto tamanho M (nem todo M cabe, depende do modelo). Verificar se o capacete pretendido cabe antes de comprar. Trava do banco: verificar se fecha completamente — trava desgastada pode abrir em movimento. Dobradiças: lubrificar anualmente. Cavalete central: a Elite 125 tem cavalete central que facilita manutenção e estacionamento em terrenos irregulares. Lubrificar o eixo do cavalete a cada 3-6 meses com graxa de lítio (WD-40 Specialist Branca ou Graxa Lítio Orbi). O cavalete ranger/chiar após chuva é queixa unânime dos donos — graxa de lítio no eixo resolve definitivamente.',
  },
  {
    severity: 'WARN',
    title: 'Pneus 90/90-12 (F) e 100/90-10 (R) em chuva: calibrar corretamente (F 29 PSI / R 33 PSI); antecipar frenagem 40%; nunca frear bruscamente em curva',
    body: 'Os pneus da Elite 125 são aro 12" na frente e aro 10" atrás — bem menores que motos de rua. Em chuva: a aderência cai significativamente. Técnica em chuva: (1) Antecipar a frenagem em 30-40% mais distância. (2) Frear principalmente pelo alavanca direita (CBS acopla dianteiro e traseiro — usar com progressividade). (3) Evitar tampas de bueiro, pinturas brancas, folhas — escorregadios. (4) Calibrar sempre na pressão correta — pneu murcho em chuva é ainda mais perigoso. Pneu Pirelli SL26: melhor opção para chuva urbana. Sulco abaixo de 2 mm: trocar antes da estação chuvosa. Em poças: reduzir velocidade antes de entrar, nunca frear dentro da poça.',
  },
]

const ELITE125_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Cavalete central rangendo/chiando após chuva ou uso: problema crônico mais citado pelos donos — solução definitiva: graxa de lítio no eixo do cavalete',
    body: 'O rangido do cavalete central é o problema crônico número 1 da Elite 125 conforme relatos em grupos e fóruns brasileiros. Surge frequentemente após chuva ou após ~45 dias de uso sem lubrificação. A concessionária aplica óleo comum que dura apenas 2-4 semanas. Solução definitiva: (1) Dobrar o cavalete, localizar o eixo transversal de rotação. (2) Remover o cavalete completamente (2 parafusos laterais). (3) Limpar o eixo com pano e aplicar graxa de lítio (WD-40 Specialist Branca, Graxan Lítio ou similar). (4) Remontar. Durabilidade: 3-6 meses por aplicação. Em oficina: R$20-50 de mão de obra. Em casa: 10 minutos com chave certa + R$15 de graxa em spray.',
  },
  {
    severity: 'WARN',
    title: 'Barulho de carenagem (chiado/rangido de plásticos) em piso irregular: problema crônico número 2 — aplicar fita de espuma nos encaixes e graxa de silicone nos clips',
    body: 'Praticamente todos os donos da Elite 125 relatam barulho de carenagem em piso irregular ou lombadas — painéis plásticos que roçam entre si. A Honda não emitiu recall. Soluções paliativas eficazes: (1) Localizar quais painéis estão roçando (apertar diferentes partes enquanto dirige em piso irregular). (2) Aplicar fita de espuma dupla-face (2-3 mm) nas bordas dos painéis que se encostam. (3) Usar graxa de silicone spray nos clips plásticos de fixação. (4) Verificar todos os parafusos de carenagem com torque correto — nem muito apertado (trinca o plástico) nem frouxo. Clips de plástico quebrados: trocar imediatamente (R$5-15 cada), não reutilizar clips com trincas.',
  },
  {
    severity: 'WARN',
    title: 'Bateria YTZ6V descarregando rapidamente: Idling Stop intensifica ciclos de carga/descarga; bateria de fábrica tem qualidade variável — substituir por Yuasa YTZ6V se necessário',
    body: 'A bateria YTZ6V da Elite 125 (5Ah, 12V AGM) é sobrecarregada pelo Idling Stop em uso urbano intenso — cada religamento do motor solicita um pico de corrente da bateria. Em uso com >10 paradas/hora: a bateria não se recupera completamente. Sintomas: (1) Idling Stop para de funcionar espontaneamente — primeiro sinal de bateria fraca. (2) Motor de arranque gira devagar. (3) Painel pisca ao acionar o arranque. A bateria de fábrica em algumas unidades (2019-2022) mostrou qualidade abaixo do esperado conforme relatos no Reclame Aqui. Substituição por Yuasa YTZ6V (R$180-220) resolve definitivamente. ATENÇÃO: A Elite 125 NÃO tem kickstarter — bateria morta = moto imobilizada no local.',
  },
  {
    severity: 'WARN',
    title: 'Ruído agudo (chiado/assobio) no CVT ao arrancar a frio: acúmulo de pó da correia na câmara — desaparece ao aquecer; limpeza preventiva junto com troca de correia',
    body: 'Chiado ou assobio nos primeiros 5-15 segundos após ligar a moto (especialmente a frio) é queixa comum de donos da Elite 125. Causa: acúmulo de pó fino de borracha (resíduo da correia) dentro da câmara do CVT. Quando o CVT aquece, o pó se redistribui e o ruído cessa. Não causa dano imediato, mas indica que o CVT precisa de limpeza. Solução: ao trocar a correia (20.000 km), limpar toda a câmara com pano seco e ar comprimido (nunca solvente ou spray dentro da câmara). Substituir roletes e mola da embreagem centrífuga junto. Serviço completo CVT: R$150-300 mão de obra.',
  },
  {
    severity: 'WARN',
    title: 'Vazamento de óleo para a câmara do CVT: retêm de vedação entre motor e transmissão falha prematuramente — cheiro de óleo queimado, correia deslizando',
    body: 'O retêm (vedação) entre o bloco do motor e a câmara da transmissão CVT pode falhar, permitindo que óleo do motor contamine a câmara do variador. Sintomas: (1) Cheiro forte de óleo queimado, especialmente ao desacelerar. (2) Fumaça leve pela traseira da scooter. (3) Aceleração instável ou correia deslizando — óleo na correia elimina o atrito. (4) Nível de óleo do motor caindo além do normal. Solução: troca do retêm de vedação — serviço em mecânico especializado em scooters (R$150-400 incluso mão de obra). Não ignorar: correia oleada pode escorregar abruptamente em movimento, causando perda brusca de tração.',
  },
  {
    severity: 'WARN',
    title: 'Sensor de nível de combustível errático: marcador oscila ou indica vazio com tanque cheio — limpar contatos da bomba de combustível',
    body: 'Proprietários de Elite 125 relatam o marcador de combustível oscilando ou indicando "vazio" com o tanque cheio — especialmente após 2-3 anos de uso. O sensor de nível fica dentro do tanque, integrado à bomba de combustível elétrica. Não há filtro de combustível externo separado para substituir. Solução: (1) Em caso de leitura errática, abastecer regularmente pelo odômetro (tanque de 5,3 L, consumo ~40 km/L = autonomia ~210 km no real). (2) Para correção definitiva: mecânico especializado acessa a bomba pelo painel lateral e limpa os contatos do sensor. (3) Se persistir: troca do conjunto bomba+sensor (R$300-600). Não misture com bateria fraca — bateria fraca também faz o marcador oscilar.',
  },
  {
    severity: 'WARN',
    title: 'Partida intermitente ("liga quando quer"): motor de arranque com carvões desgastados ou relê de partida oxidado — verificar conectores antes de trocar peças caras',
    body: 'Problema relatado em Elite 125 com mais de 20.000-30.000 km: motor não parte em certas situações mesmo com bateria com tensão boa. Diagnóstico progressivo: (1) Verificar tensão da bateria (YTZ6V) — abaixo de 12,4V em repouso: carregar. (2) Verificar relê de partida (solenoide): ao acionar o botão de partida, deve ouvir um "clique" — sem clique = relê defeituoso. (3) Verificar conectores do chicote elétrico do motor de arranque — oxidade por umidade é comum em clima tropical. Limpar com spray contato elétrico e aplicar graxa dielétrica. (4) Motor de arranque com carvões desgastados: gira devagar mesmo com bateria boa. Troca do motor de arranque: R$200-400.',
  },
  {
    severity: 'DANGER',
    title: 'Falha elétrica nas luzes traseiras/setas em chuva (2019-2022): vedação deficiente do chicote traseiro — aplicar graxa dielétrica nos conectores preventivamente',
    body: 'Unidades da Elite 125 (especialmente 2019-2022) registraram falha elétrica no bloco de luzes traseiro após chuva intensa: setas piscando irregularmente, luz de freio apagando ou fusível queimando repetidamente. Causa: vedação insuficiente no conector do chicote traseiro, permitindo infiltração de água. Verificação preventiva: (1) Remover a carenagem traseira (3-4 parafusos/clips). (2) Localizar o conector principal do chicote na região da lanterna. (3) Desconectar, secar e aplicar graxa dielétrica antes de reconectar. Custo: R$15-25 de graxa dielétrica. Se problema persistir: concessionária Honda — verificar se ainda está na garantia (1 ano ou 20.000 km, o que ocorrer primeiro). Não ignorar falha elétrica traseira — multa e risco de acidente por abalroamento.',
  },
]

// ─── LEAD 110 (2006–2015) ────────────────────────────────────────────────────

const LEAD110_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 109cc OHC carburado (Keihin) — óleo 10W-30 JASO MB, 0,8 L; troca a cada 3.000 km; a LEAD 110 usa carburador, não PGM-FI',
    body: 'A LEAD 110 é anterior à geração com injeção eletrônica: usa carburador Keihin (variado por ano). Diferença de manutenção vs modelos injetados: (1) Carburador precisa ser limpo a cada 15.000-20.000 km ou se ficar parado >3 meses (verniz nos jatos). (2) Afogador manual (choke) no guidão — necessário a frio. (3) Ajuste da mistura ar/combustível é mecânico. Óleo: 10W-30 JASO MB, 0,8 L. Troca: 3.000 km. Vela: NGK CPR6EA-9 ou DPR6EA-9 (confirmar no manual do ano). Consumo médio: 38-42 km/L em uso urbano.',
  },
  {
    severity: 'OK',
    title: 'CVT Lead 110: correia trocar a cada 16.000-18.000 km (vida mais curta que modelos maiores); roletes de 12-13g de série; barulho em "V" = correia quase no fim da vida',
    body: 'O CVT da LEAD 110 é menor que o da Elite 125 e Forza 350: correia mais curta = menor vida. Troca preventiva: 16.000-18.000 km. Sintoma de correia no fim: quando a moto está parada mas acelerando (em rampa, por exemplo), a correia "canta" ou range brevemente ao engajar. Roletes de série: 12-13g (confirmar no manual). Kit completo CVT para LEAD 110 (correia + roletes + mola centrífuga): R$150-300. Honda produz peças para a LEAD 110 até hoje mas disponibilidade de peças genéricas alternativas é maior que OEM. Graxa do variador: HP2 ou similar — nunca graxa de rolamento (muito grossa, entope a câmara).',
  },
  {
    severity: 'OK',
    title: 'Carburador Keihin da LEAD 110: drenar antes de parar por mais de 30 dias; jato principal #80-85; marcha lenta ajustável por parafuso externo',
    body: 'O carburador da LEAD 110 precisa ser drenado antes de guardar a moto por períodos longos (férias, etc.). Procedimento: fechar o pet-cock (torneira de combustível), manter o motor ligado até apagar naturalmente por falta de combustível — isso drena o carburador. Gasolina velha deixa verniz: entope o jato principal (#80-85) e o piloto, causando marcha lenta instável ou motor que para ao desacelerar. Limpeza do carburador com verniz: desmontagem + spray de carburador em todos os jatos (Wurth, Motul Carb Clean). Ajuste de marcha lenta: parafuso externo na tampa do carburador — afinar até encontrar a rotação mais alta e recuar 1/4 de volta.',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas LEAD 110: correia Gates SCT ou Dayco, roletes Kymco de mesmo peso, filtro de ar genérico 110cc — mercado paralelo disponível; peça Honda original ficou escassa',
    body: 'Com a LEAD 110 fora de produção (descontinuada por volta de 2015), as peças Honda OEM ficaram escassas. Boas alternativas: Correia de CVT: Gates SCT (medir comprimento × largura × ângulo da correia original antes de comprar alternativa) — R$80-150. Roletes: qualquer rolete de peso e diâmetro compatível (scooters 110cc Kymco, SYM, Yamaha Fino têm roletes semelhantes). Vela: NGK CPR6EA-9 disponível em qualquer autopeça. Filtro de ar: elemento espuma de scooter 110cc — medir e comprar compatível (R$15-40). Pastilhas de freio dianteiro: EBC SFA série ou Galfer compatível. Para peças maiores (carenagens, quadro): grupos do Facebook "LEAD 110 Brasil" têm peças de motos acidentadas.',
  },
]

const LEAD110_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Puxador de choke travado ou difícil de operar: problema comum na LEAD 110 com mais de 5 anos — cabo de choke resseca; lubrificar o cabo anualmente com óleo fino',
    body: 'O cabo de afogador (choke) da LEAD 110 é longo (passa por dentro da carenagem) e tende a ressecar e travar com o tempo. Sintoma: alavanca de choke que não volta completamente à posição OFF — moto anda com choke parcial aberto → consumo muito alto, marcha lenta instável, motor afoga. Lubrificação anual: injetar óleo fino (Singer, WD-40) no cabo pelo conector superior. Cabo trocado (se ressecar demais): R$30-60 + mão de obra. Verificar também o atuador do choke no carburador — pode travar aberto por ressecamento da borracha.',
  },
  {
    severity: 'WARN',
    title: 'Consumo da LEAD 110 aumentando progressivamente: causas comuns são filtro de ar sujo, carburador fora de regulagem ou vela desgastada — verificar os 3 antes de ir à oficina',
    body: 'Consumo normal da LEAD 110: 38-42 km/L. Se caiu para 30-32 km/L: verificar na ordem (mais barato primeiro): (1) Vela de ignição — gap aumentado ou eletrodo erodido. Troca: R$15-30. (2) Filtro de ar — elemento sujo ou obstruído. Limpeza ou troca: R$15-40. (3) Carburador com jatos entupidos ou mistural desregulada. Limpeza: R$50-100 em mão de obra. (4) Choke parcialmente aberto (ver problema acima). Se consumo voltou ao normal após verificar esses itens: pronto. Se ainda alto: verificar embreagem centrífuga deslizando (roletes ou mola desgastados).',
  },
]

// ─── Forza 350 (2021+) ───────────────────────────────────────────────────────

const FORZA350_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 329cc SOHC liquid-cooled PGM-FI — óleo 10W-30 JASO MB, 1,0 L; troca a cada 4.000 km; motor de maxi-scooter tem mais tolerância que os 125cc, mas manutenção em dia é mais importante',
    body: 'A Forza 350 usa motor 329cc SOHC de 4 válvulas, refrigerado a líquido e injeção PGM-FI. Capacidade de óleo: 1,0 L. JASO MB obrigatório (scooter com CVT — sem embreagem úmida convencional). Troca: a cada 4.000 km (fabricante sugere 6.000 km mas a realidade brasileira de tráfego pesado e temperatura alta justifica 4.000 km). Primeira troca: 1.000 km. Vela: NGK SILMAR9A9 (iridium de série) — gap 0,9 mm; trocar a cada 12.000 km. Motor com menos de 4.000 km mas óleo escuro/viscoso: trocar por conta do calor urbano acumulado.',
  },
  {
    severity: 'OK',
    title: 'CVT da Forza 350: correia mais larga e mais longa que nos 125cc — vida útil maior (25.000-30.000 km) mas sinal de desgaste é o mesmo: RPM sobre mas velocidade não acompanha',
    body: 'O CVT da Forza 350 tem correia trapezoidal mais robusta que nos scooters 125cc. Vida útil: 25.000-30.000 km em uso normal. Sintoma de desgaste: RPM do motor sobe normalmente mas a velocidade "não acompanha" — aceleração se torna suave demais, velocidade máxima cai. Inspeção: a cada 10.000 km, verificar correia para rachaduras e desgaste das bordas. Troca: sempre preventiva antes de romper (correia que rompe em movimento pode danificar a caixa do variador — reparo R$500-1.200). Correia Honda original Forza 350: R$350-500. Kit variador completo (correia + roletes): R$550-800.',
  },
  {
    severity: 'OK',
    title: 'Tanque de 11,5 L e consumo médio 28-32 km/L — autonomia de ~340-350 km; ideal para viagens curtas de fim de semana; etanol sobe consumo ~20%',
    body: 'A Forza 350 tem tanque generoso de 11,5 L para um scooter, com autonomia de ~340 km em uso misto. Consumo: ~32 km/L em estrada a 80-90 km/h, ~28 km/L em uso urbano pesado com trânsito parado. Com etanol (E100): consumo sobe para 20-22 km/L (etanol tem menos energia por litro). Para quem usa flex: gasolina para viagens (mais autonomia e desempenho), etanol para uso diário urbano (mais barato). Motor Forza 350 não é oficialmente flex mas tolera mistura E20-E25 (gasolina comum brasileira). Evitar E100 puro para uso intenso em viagens longas.',
  },
  {
    severity: 'OK',
    title: 'Painel TFT colorido e integração Bluetooth: atualizar firmware do sistema pela concessionária Honda nos primeiros 6 meses; Bluetooth conecta ao Honda App (rastreamento)',
    body: 'A Forza 350 tem display TFT colorido e sistema Honda Smartphone Voice Control System (Bluetooth para celular). Funcionalidades: chamadas telefônicas, música, navegação via app. Atualização de firmware: algumas unidades 2021-2022 tiveram bugs no painel (travar em alta temperatura) corrigidos via update — fazer na concessionária nos primeiros 6 meses. App Honda: Honda My Bike disponível para iOS e Android, monitora odômetro, alertas de manutenção. Problema com Bluetooth não pareando: reiniciar o sistema (desligar ignição, aguardar 10 s, religar) resolve na maioria dos casos. Em caso de painel travado: desligar e religar funciona na maioria dos modelos.',
  },
  {
    severity: 'OK',
    title: 'Forza 350 é adequada para viagens de estrada (velocidade de cruzeiro 110-120 km/h) — posição ereta, parabrisa ajustável, banco confortável para 2 pessoas; verificar pneus antes de viagem longa',
    body: 'Diferente dos scooters 125cc, a Forza 350 é capaz de viagens de estrada com conforto. Velocidade de cruzeiro recomendada: 100-110 km/h (motor em ~6.500-7.000 rpm, dentro da faixa tranquila). Velocidade máxima: ~155-160 km/h. Parabrisa: 3 posições de ajuste — para viagem, posição máxima reduz turbulência significativamente. Banco: 790 mm — mais baixo que a maioria das naked e dual-sports. Garupa: banco traseiro plano e bons espaços para os pés. Bagageiro de 30 L sob o banco (cabem 2 capacetes abertos). Revisão pré-viagem: pneus 120/70-15 (F) e 140/70-14 (R) na pressão correta — consultar plaqueta na moto.',
  },
  {
    severity: 'OK',
    title: 'Peças alternativas Forza 350: correia Gates SCT ou Dayco (verificar especificação), vela NGK Iridium SILMAR9A9, óleo Motul Scooter Expert MA JASO MB — disponibilidade crescente no Brasil',
    body: 'A Forza 350 chegou ao Brasil em 2021 e o suporte de peças aftermarket está crescendo. Peças disponíveis: Filtro de óleo Hiflofiltro HF138 (confirmar compatibilidade com Forza 350) — R$25-45. Pastilhas de freio dianteiro (duplo disco): EBC SFA série ou Galfer — R$80-150 por par. Pneu dianteiro 120/70-15: Pirelli Diablo Scooter, Michelin Pilot Street. Pneu traseiro 140/70-14: Michelin Pilot Street, Maxxis MA-ST. Para correia e variador: preferir Honda OEM até que aftermarket com especificação comprovada esteja disponível no Brasil — o risco de correia fora de especificação é alto no CVT da Forza 350.',
  },
]

const FORZA350_PROBLEMAS: TipInput[] = [
  {
    severity: 'WARN',
    title: 'Líquido de arrefecimento: verificar nível mensalmente — sistema mais complexo que scooters 125cc; perda por vazamento em mangueiras causa superaquecimento rápido',
    body: 'O motor refrigerado a líquido da Forza 350 tem radiador compacto. Qualquer vazamento resulta em superaquecimento rápido — o motor 329cc gera mais calor que um 125cc ar-resfriado. Verificação mensal: nível no reservatório de expansão (transparente, lado direito sob carenagem). Troca do líquido: a cada 2 anos / 24.000 km. Honda Ultra-Cool ou anticongelante OAT diluído 50% em água destilada. Mangueiras: inspecionar a cada troca de óleo — ressecadas ou com inchamento = trocar antes que se rompam. Sinal de superaquecimento: luz de temperatura alta acende no TFT — parar IMEDIATAMENTE, não forçar o motor.',
  },
  {
    severity: 'WARN',
    title: 'Vibração no parabrisa em alta velocidade (problema relatado em algumas Forza 350 2021-2022): apertar parafusos de fixação do parabrisa e verificar folga nos suportes',
    body: 'Alguns proprietários de Forza 350 (2021-2022) relataram vibração/ressonância no parabrisa em velocidades acima de 100 km/h, especialmente no range de 110-130 km/h. Causa: parafusos de fixação do parabrisa com torque insuficiente ou suportes com jogo. Solução: apertar os 4 parafusos de fixação do parabrisa (cuidado para não trincarem o plástico — máximo 2 N.m). Verificar se os suportes metálicos do parabrisa não têm folga nos pivôs. Se vibração persistir: adicionar borracha antivibração (neoprene 1mm) entre o parabrisa e o suporte. Honda pode ter feito recall ou revisão de serviço — verificar na concessionária.',
  },
  {
    severity: 'WARN',
    title: 'Pneu traseiro 140/70-14 (14 polegadas): menos disponível que pneus de moto convencional — verificar estoque antes de viagem longa; substituir sempre com pneu de mesma especificação',
    body: 'O pneu traseiro da Forza 350 usa aro de 14 polegadas — formato menos comum que os 17" de motos de rua. Em cidades menores ou no interior: borracharias podem não ter estoque. Para viagens longas: verificar onde encontrar pneus 140/70-14 na rota. Alternativa: ligar antecipadamente para borracharias nas cidades de parada. Pneus compatíveis: Michelin Pilot Street 140/70-14, Pirelli Diablo Scooter 140/70-14, Maxxis MA-ST 140/70-14. NUNCA substituir por pneu de tamanho diferente — afeta estabilidade, velocímetro e calibragem. Carregar kit de reparo de pneu (plugue + CO2 cartridge) como emergência.',
  },
]

// ─── MANUTENÇÃO ───────────────────────────────────────────────────────────────

const ELITE125_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'ELITE 125', yearFrom: 2019, yearTo: null, component: 'Óleo 10W-30 JASO MA (0,75 L troca / 0,8 L completo)', intervalKm: 4000, intervalMonths: 12, notes: 'API SL JASO MA conforme manual Honda eSP. Honda Genuine Scooter Oil 10W-30 ou Motul Scooter Expert MA. 1ª troca: 1.000 km (1ª revisão gratuita). Trânsito pesado/calor: antecipar para 3.000 km.', priority: 'CRITICAL', order: 1 },
  { modelName: 'ELITE 125', yearFrom: 2019, yearTo: null, component: 'Filtro de tela de óleo — limpeza', intervalKm: 8000, intervalMonths: null, notes: 'Tela interna no cárter. Limpar com solvente e ar comprimido. Fazer junto com troca de óleo do 2º ciclo.', priority: 'HIGH', order: 2 },
  { modelName: 'ELITE 125', yearFrom: 2019, yearTo: null, component: 'Vela NGK CPR6EA-9 — gap 0,9 mm', intervalKm: 8000, intervalMonths: null, notes: 'Iridium CPR6EAIX-9: dura até 16.000 km. Denso equivalente: U20EPR9 (padrão) ou IU20 (iridium). Torque 10-12 N.m.', priority: 'HIGH', order: 3 },
  { modelName: 'ELITE 125', yearFrom: 2019, yearTo: null, component: 'Ajuste de válvulas eSP (IN 0,08 mm / EX 0,12 mm)', intervalKm: 8000, intervalMonths: null, notes: 'Motor completamente frio. Inclui na 1ª revisão (1.000 km). Sistema parafuso+contra-porca. Válvulas fora de folga: marcha lenta áspera, partida difícil.', priority: 'CRITICAL', order: 4 },
  { modelName: 'ELITE 125', yearFrom: 2019, yearTo: null, component: 'Filtro de ar (papel) — inspeção', intervalKm: 8000, intervalMonths: 6, notes: 'OEM: 17210-K80-C00. Bater suavemente para soltar pó — não lavar (papel). Ambientes empoeirados: dobrar frequência.', priority: 'MEDIUM', order: 5 },
  { modelName: 'ELITE 125', yearFrom: 2019, yearTo: null, component: 'Filtro de ar — troca', intervalKm: 16000, intervalMonths: 24, notes: 'Trocar o elemento de papel. Alternativas: Vedamotors, Hiflofiltro Honda CH125 (R$30-65). Nunca rodar sem filtro.', priority: 'HIGH', order: 6 },
  { modelName: 'ELITE 125', yearFrom: 2019, yearTo: null, component: 'Roletes do variador (6 × 14g) — inspeção e troca', intervalKm: 10000, intervalMonths: null, notes: 'OEM: 22123-KCW-305 (R$80-120). Alternativa Tech Pulley 14g (R$40-70). Medir ovalização — >0,5mm: trocar. Sintoma: solavanco ao sair do ponto.', priority: 'HIGH', order: 7 },
  { modelName: 'ELITE 125', yearFrom: 2019, yearTo: null, component: 'Correia CVT — troca preventiva (OEM 23100-K69-601)', intervalKm: 20000, intervalMonths: null, notes: 'Nunca esperar romper. Bando 750-20-30-9.5 (R$169-190) como alternativa. Inspecionar rachaduras a cada 10.000 km.', priority: 'CRITICAL', order: 8 },
  { modelName: 'ELITE 125', yearFrom: 2019, yearTo: null, component: 'Limpeza câmara CVT + mola centrífuga', intervalKm: 20000, intervalMonths: null, notes: 'Fazer junto com troca de correia. Pano seco — NUNCA solvente nas polias. Substituir mola centrífuga se distendida.', priority: 'HIGH', order: 9 },
  { modelName: 'ELITE 125', yearFrom: 2019, yearTo: null, component: 'Pastilha dianteira CBS (disco 190mm)', intervalKm: 8000, intervalMonths: null, notes: 'OEM: 06455-KCW-425 (81×42×7,6 mm). Cobreq N-909 ou Fischer FJ-840 como alternativa. Trocar <1,5 mm. CBS: verificar pinça e fluido.', priority: 'HIGH', order: 10 },
  { modelName: 'ELITE 125', yearFrom: 2019, yearTo: null, component: 'Fluido de freio DOT 4 — troca', intervalKm: 15000, intervalMonths: 24, notes: 'DOT 4. CBS com freio dianteiro (disco) + traseiro (tambor). Absorve umidade — trocar a cada 2 anos independente de km.', priority: 'HIGH', order: 11 },
  { modelName: 'ELITE 125', yearFrom: 2019, yearTo: null, component: 'Bateria YTZ6V (12V 5Ah AGM) — verificação', intervalKm: null, intervalMonths: 6, notes: 'Repouso: ≥12,4 V. Em uso: 13,5-14,5 V (alternador). NÃO usar YTX5L-BS. Yuasa YTZ6V recomendada. Sem kickstarter — bateria morta = moto parada.', priority: 'HIGH', order: 12 },
  { modelName: 'ELITE 125', yearFrom: 2019, yearTo: null, component: 'Cavalete central — lubrificação do eixo', intervalKm: null, intervalMonths: 3, notes: 'Graxa de lítio no eixo de rotação (WD-40 Specialist Branca ou Graxan Lítio). Ranger após chuva: problema crônico. Solução definitiva com graxa de lítio (não óleo).', priority: 'LOW', order: 13 },
]

const LEAD110_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'LEAD 110', yearFrom: 2006, yearTo: 2015, component: 'Óleo 10W-30 JASO MB (0,8 L)', intervalKm: 3000, intervalMonths: 6, notes: 'JASO MB para scooter. Honda Ultra Scooter ou equivalente. Modelo carburado — sem ECU para monitorar qualidade.', priority: 'CRITICAL', order: 1 },
  { modelName: 'LEAD 110', yearFrom: 2006, yearTo: 2015, component: 'Vela NGK CPR6EA-9 ou DPR6EA-9 — gap 0,9 mm', intervalKm: 6000, intervalMonths: 12, notes: 'Confirmar referência no manual do ano específico. Torque 10-12 N.m. Sintoma de vela ruim: partida difícil, marcha lenta instável.', priority: 'HIGH', order: 2 },
  { modelName: 'LEAD 110', yearFrom: 2006, yearTo: 2015, component: 'Limpeza do carburador Keihin', intervalKm: 15000, intervalMonths: 24, notes: 'Drenar carburador se ficar >30 dias parada. Verniz nos jatos causa marcha lenta instável. Spray carburador Wurth ou Motul.', priority: 'HIGH', order: 3 },
  { modelName: 'LEAD 110', yearFrom: 2006, yearTo: 2015, component: 'Filtro de ar — limpeza', intervalKm: 6000, intervalMonths: 6, notes: 'Elemento espuma ou papel. Lavar ou soprar conforme o tipo. Não rodar sem filtro.', priority: 'MEDIUM', order: 4 },
  { modelName: 'LEAD 110', yearFrom: 2006, yearTo: 2015, component: 'Roletes do variador — troca', intervalKm: 10000, intervalMonths: null, notes: 'Roletes 12-13g de série. Kit Gates ou Kymco compatível. Ovalização = solavanco ao sair do ponto.', priority: 'HIGH', order: 5 },
  { modelName: 'LEAD 110', yearFrom: 2006, yearTo: 2015, component: 'Correia CVT — troca preventiva', intervalKm: 16000, intervalMonths: null, notes: 'Vida mais curta que modelos maiores. Nunca esperar romper. Alternativas: Gates SCT de mesma spec dimensional.', priority: 'CRITICAL', order: 6 },
  { modelName: 'LEAD 110', yearFrom: 2006, yearTo: 2015, component: 'Freio traseiro a tambor — ajuste e lona', intervalKm: 8000, intervalMonths: 12, notes: 'Pedal descendo muito sem frenagem = lona gasta ou ajuste necessário. Lona Fras-le compatível.', priority: 'HIGH', order: 7 },
  { modelName: 'LEAD 110', yearFrom: 2006, yearTo: 2015, component: 'Pastilhas dianteiras (disco)', intervalKm: 10000, intervalMonths: null, notes: 'Trocar abaixo de 1,5 mm. EBC SFA ou compatível. Fluido DOT 4 a cada 2 anos.', priority: 'HIGH', order: 8 },
  { modelName: 'LEAD 110', yearFrom: 2006, yearTo: 2015, component: 'Lubrificação do cabo de choke', intervalKm: null, intervalMonths: 12, notes: 'Anual. Óleo fino (Singer) no cabo. Cabo travado com choke parcial aberto = consumo 30-40% maior.', priority: 'MEDIUM', order: 9 },
]

const FORZA350_MANUTENCAO: MaintenanceItemInput[] = [
  { modelName: 'Forza 350', yearFrom: 2021, yearTo: null, component: 'Óleo 10W-30 JASO MB (1,0 L)', intervalKm: 4000, intervalMonths: 6, notes: 'JASO MB. Honda Ultra Scooter ou Motul Scooter Expert. 1ª troca: 1.000 km. Trânsito urbano pesado: 3.500 km.', priority: 'CRITICAL', order: 1 },
  { modelName: 'Forza 350', yearFrom: 2021, yearTo: null, component: 'Vela NGK SILMAR9A9 (iridium) — gap 0,9 mm', intervalKm: 12000, intervalMonths: null, notes: 'Iridium de série. Torque 12-14 N.m. Acesso pelo painel lateral. Sempre com extensão na chave.', priority: 'HIGH', order: 2 },
  { modelName: 'Forza 350', yearFrom: 2021, yearTo: null, component: 'Filtro de ar — inspeção', intervalKm: 6000, intervalMonths: 6, notes: 'Elemento de papel. Não lavar — soprar de fora para dentro. Substituir se preto ou rasgado.', priority: 'MEDIUM', order: 3 },
  { modelName: 'Forza 350', yearFrom: 2021, yearTo: null, component: 'Filtro de ar — troca', intervalKm: 20000, intervalMonths: 24, notes: 'OEM Honda. Alternativo: confirmar compatibilidade exata. Nunca rodas sem filtro.', priority: 'LOW', order: 4 },
  { modelName: 'Forza 350', yearFrom: 2021, yearTo: null, component: 'Roletes do variador — inspeção e troca', intervalKm: 12000, intervalMonths: null, notes: 'Variador maior que nos 125cc. Roletes de 15-16g de série. Verificar ovalização. Sintoma: solavanco ao acelerar.', priority: 'HIGH', order: 5 },
  { modelName: 'Forza 350', yearFrom: 2021, yearTo: null, component: 'Correia CVT — inspeção e troca preventiva', intervalKm: 10000, intervalMonths: null, notes: 'Inspecionar a cada 10.000 km. Trocar preventivamente: 25.000-30.000 km. Honda OEM ou Gates SCT de especificação idêntica.', priority: 'CRITICAL', order: 6 },
  { modelName: 'Forza 350', yearFrom: 2021, yearTo: null, component: 'Limpeza completa do CVT (variador + clutch)', intervalKm: 25000, intervalMonths: null, notes: 'Com a troca de correia. Pano seco apenas — nunca solvente. Mola centrífuga: substituir se distendida.', priority: 'HIGH', order: 7 },
  { modelName: 'Forza 350', yearFrom: 2021, yearTo: null, component: 'Líquido de arrefecimento — verificação e troca', intervalKm: 24000, intervalMonths: 24, notes: 'Honda Ultra-Cool OAT 50/50 em água destilada. Verificar nível mensalmente. NUNCA água pura.', priority: 'HIGH', order: 8 },
  { modelName: 'Forza 350', yearFrom: 2021, yearTo: null, component: 'Pastilhas dianteiras (duplo disco) + pastilhas traseiras (CBS)', intervalKm: 8000, intervalMonths: null, notes: 'CBS interliga F+R. Verificar ambos. Trocar abaixo de 1,5 mm. EBC SFA ou OEM.', priority: 'HIGH', order: 9 },
  { modelName: 'Forza 350', yearFrom: 2021, yearTo: null, component: 'Fluido de freio DOT 4 — troca (F + R + CBS)', intervalKm: null, intervalMonths: 24, notes: 'Sistema CBS com 2 circuitos. Purge completo. DOT 4 — absorve umidade. 2 anos obrigatório.', priority: 'HIGH', order: 10 },
  { modelName: 'Forza 350', yearFrom: 2021, yearTo: null, component: 'Pneus 120/70-15 (F) + 140/70-14 (R) — calibragem e inspeção', intervalKm: 5000, intervalMonths: 3, notes: 'Calibragem: verificar plaqueta na moto. Sulco mín: 1,6 mm. Pneu 14" traseiro: disponibilidade limitada — verificar estoque antes de viagens longas.', priority: 'HIGH', order: 11 },
]

// ─── Calibragens ──────────────────────────────────────────────────────────────

const tirePressures = [
  {
    modelName: 'ELITE 125', yearFrom: 2019, yearTo: null,
    tireSize: '90/90-12 (F) · 100/90-10 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36,
    sparePsi: null,
    notes: 'Solo: F 29 / R 33 PSI. Com garupa: F 29 / R 36 PSI. Pneus de aro pequeno (12" e 10") perdem pressão mais rápido — verificar semanalmente. Nunca abaixo de 22 PSI. Pneus recomendados: Pirelli SL26 (melhor para chuva), Michelin City Grip (F) + S1 (R), Levorin Matrix Scooter. Sulco mínimo: 2 mm (trocar antes).',
  },
  {
    modelName: 'LEAD 110', yearFrom: 2006, yearTo: 2015,
    tireSize: '80/90-14 (F) · 90/90-14 (R)',
    frontPsi: 25, rearPsi: 29, frontPsiLoad: 27, rearPsiLoad: 33,
    sparePsi: null,
    notes: 'Com garupa: R 33 PSI. Pneus pequenos de 14" — verificação semanal obrigatória. Pneu murcho em scooter pequeno = manuseio errático.',
  },
  {
    modelName: 'Forza 350', yearFrom: 2021, yearTo: null,
    tireSize: '120/70-15 (F) · 140/70-14 (R)',
    frontPsi: 29, rearPsi: 33, frontPsiLoad: 32, rearPsiLoad: 36,
    sparePsi: null,
    notes: 'Com garupa: F 32 / R 36 PSI. Viagem estrada: F 29 / R 36 PSI. Verificar plaqueta na própria moto para confirmação do modelo/ano.',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function upsertModel(name: string) {
  const brand = await prisma.brand.findFirst({ where: { name: 'Honda' } })
  if (!brand) throw new Error('Brand Honda não encontrada — rode o seed principal primeiro')
  return prisma.vehicleModel.upsert({
    where: { name_brandId: { name, brandId: brand.id } },
    update: {},
    create: { name, brandId: brand.id },
  })
}

async function upsertTips(modelName: string, category: Cat, tips: TipInput[]) {
  await prisma.tip.deleteMany({ where: { modelName, category } })
  for (let i = 0; i < tips.length; i++) {
    const t = tips[i]
    await prisma.tip.create({
      data: { modelName, category, severity: t.severity, title: t.title, body: t.body, order: i },
    })
  }
}

async function upsertMaintenance(items: MaintenanceItemInput[]) {
  if (items.length === 0) return
  const modelName = items[0].modelName
  await prisma.maintenanceItem.deleteMany({ where: { modelName } })
  await prisma.maintenanceItem.createMany({ data: items })
}

async function upsertTirePressure(tp: typeof tirePressures[0]) {
  await prisma.tirePressure.deleteMany({ where: { modelName: tp.modelName, yearFrom: tp.yearFrom } })
  await prisma.tirePressure.create({ data: tp })
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🛵 Seed Honda Scooters extras (ELITE 125, LEAD 110, Forza 350)...')

  await upsertModel('ELITE 125')
  await upsertTips('ELITE 125', 'MACETES', ELITE125_MACETES)
  await upsertTips('ELITE 125', 'PROBLEMAS', ELITE125_PROBLEMAS)
  await upsertMaintenance(ELITE125_MANUTENCAO)
  console.log('✅ ELITE 125')

  await upsertModel('LEAD 110')
  await upsertTips('LEAD 110', 'MACETES', LEAD110_MACETES)
  await upsertTips('LEAD 110', 'PROBLEMAS', LEAD110_PROBLEMAS)
  await upsertMaintenance(LEAD110_MANUTENCAO)
  console.log('✅ LEAD 110')

  await upsertModel('Forza 350')
  await upsertTips('Forza 350', 'MACETES', FORZA350_MACETES)
  await upsertTips('Forza 350', 'PROBLEMAS', FORZA350_PROBLEMAS)
  await upsertMaintenance(FORZA350_MANUTENCAO)
  console.log('✅ Forza 350')

  for (const tp of tirePressures) {
    await upsertTirePressure(tp)
  }
  console.log('✅ Calibragens scooters')

  const tipCount = await prisma.tip.count({ where: { modelName: { in: ['ELITE 125', 'LEAD 110', 'Forza 350'] } } })
  console.log(`\n📊 ${tipCount} dicas inseridas para scooters Honda`)
  console.log('✅ Seed concluído!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
