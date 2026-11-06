// seed-shineray-electric.ts — Shineray PT-02/PT-03/PT-04 Pro, SE-1/SE-2, SHE-S
// Linha de scooters elétricas urbanas Shineray no Brasil (fabricação/montagem em Manaus).
// Motor elétrico brushless (hub ou mid-drive) 2000W-3000W, baterias removíveis
// (chumbo-ácido nas versões PT de entrada, lítio (Li-ion/LiFePO4) nas versões
// S/SE/SHE-S de maior potência e autonomia). Sem óleo, sem vela, sem embreagem —
// manutenção concentrada em bateria, freios, pneus e conectores elétricos.
// Fontes: shineraymotos.com.br, manuais de proprietário Shineray, reclameaqui.com.br,
//         grupos de proprietários de scooters elétricas no Facebook/Telegram,
//         comparativos técnicos de scooters elétricas chinesas (motor hub 2000-3000W,
//         baterias 60V/72V, práticas gerais de manutenção de bateria de tração).
// Execute: pnpm --filter @motormacete/database db:seed:shineray-electric
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

// ─── PT-02 2000W (chumbo-ácido, entrada) ──────────────────────────────────────
// Motor hub traseiro 2000W | Bateria 60V chumbo-ácido (geralmente 2-3 baterias
// removíveis 20Ah) | Autonomia real 40-60 km | Vel. máx ~45-50 km/h | Freio a tambor

const PT02_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Bateria de chumbo-ácido: nunca deixe descarregar totalmente — recarregue toda noite',
    body: 'A PT-02 2000W usa baterias de chumbo-ácido seladas (VRLA), tipicamente 2 ou 3 unidades removíveis de 20Ah em 60V. Diferente do lítio, o chumbo-ácido sofre "sulfatação" quando fica descarregado por tempo prolongado — isso reduz a capacidade de forma permanente e é a causa nº1 de baterias "morrendo" cedo. Regra de ouro: carregue todos os dias, mesmo que tenha rodado pouco, e nunca deixe a scooter parada com a bateria vazia por mais de 2-3 dias. Se for guardar a scooter por semanas, carregue antes de guardar e recarregue a cada 15-20 dias.',
  },
  {
    severity: 'OK',
    title: 'Carregador original: 8-10h para carga completa — evite carregadores genéricos',
    body: 'O carregador que acompanha a PT-02 é dimensionado para a curva de carga do chumbo-ácido (corrente constante + tensão constante + flutuação). Carregadores genéricos "universais" vendidos como substitutos costumam ter curva de carga errada e aceleram a degradação das placas internas da bateria. Tempo médio de carga completa: 8-10 horas (carregue à noite). Não interrompa o ciclo de carga no meio com frequência — prefira completar o ciclo sempre que possível.',
  },
  {
    severity: 'OK',
    title: 'Baterias removíveis: leve para carregar dentro de casa em prédios/condomínios',
    body: 'A vantagem da PT-02 é a bateria removível — não precisa estacionar perto de tomada. Retire o conjunto de baterias (geralmente destravam com a chave de ignição + trava física) e carregue dentro de casa, em local ventilado e longe de fontes de calor direto (sol, aquecedor). Chumbo-ácido não tem o mesmo risco de incêndio do lítio, mas ainda libera pequena quantidade de gás hidrogênio durante a carga — não carregue em ambiente hermeticamente fechado.',
  },
  {
    severity: 'WARN',
    title: 'Autonomia real: 40-60 km, bem abaixo do anunciado — depende de peso e relevo',
    body: 'A autonomia anunciada pela Shineray costuma ser medida em condição ideal (piloto leve, piso plano, velocidade constante baixa). Na prática urbana com subidas, paradas frequentes e piloto de 70-90 kg, espere 40-60 km por carga completa. Frio reduz ainda mais (baterias de chumbo-ácido perdem capacidade abaixo de 10°C). Para maximizar autonomia: evite acelerações bruscas, mantenha os pneus calibrados corretamente e ande em velocidade constante sempre que possível.',
  },
  {
    severity: 'OK',
    title: 'Terminais e conectores: limpe e passe graxa dielétrica a cada 2 meses',
    body: 'Os conectores da bateria removível (contatos macho/fêmea) sofrem oxidação com o tempo, especialmente em regiões litorâneas ou de chuva frequente. Sintoma de contato ruim: scooter "engasgando", perda de potência intermitente, luz de bateria piscando sem motivo. Limpe os terminais com escova de aço fina e pano seco a cada 2 meses e aplique uma camada fina de graxa dielétrica (ou vaselina em pasta na falta de graxa específica) para evitar nova oxidação.',
  },
  {
    severity: 'OK',
    title: 'Motor hub 2000W: sem manutenção interna, mas verifique os rolamentos anualmente',
    body: 'O motor elétrico hub (instalado dentro da roda traseira) da PT-02 não tem escovas para trocar nem óleo — é praticamente livre de manutenção mecânica. O ponto de atenção é o rolamento do cubo, que recebe todo o peso da scooter e o torque do motor. Sinal de rolamento gasto: ruído de "rugido" que varia com a velocidade, folga perceptível ao balançar a roda com a mão. Inspeção recomendada 1x por ano em oficina especializada em elétricos/motos.',
  },
  {
    severity: 'WARN',
    title: 'Chuva forte e poças: motor hub e conectores toleram respingo, não submersão',
    body: 'A PT-02 tem vedação básica adequada para chuva normal e poças rasas, mas não é projetada para vadear água profunda (acima do cubo da roda) nem lavagem com jato de alta pressão direto nos conectores e no compartimento de bateria. Se precisar lavar, use pano úmido e evite água direta nas conexões elétricas, no display e na entrada do carregador. Após pegar chuva forte, seque bem os terminais da bateria antes de recarregar.',
  },
]

const PT02_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Degradação acelerada da bateria de chumbo-ácido é o problema mais comum reportado',
    body: 'A reclamação mais frequente entre donos de scooters elétricas de entrada como a PT-02 é a perda rápida de autonomia após 8-12 meses de uso — muitas vezes por sulfatação causada por ciclos de descarga profunda repetidos ou por ficar parada descarregada. Diferente do carro a combustão, não existe "sintoma de aviso" gradual: a bateria de chumbo-ácido tende a perder capacidade de forma relativamente abrupta perto do fim da vida útil. Vida útil típica: 300-500 ciclos de carga (cerca de 1,5-2,5 anos de uso diário urbano). Substituição do conjunto de baterias: custo relevante, pesquise preço antes de comprar a scooter usada.',
  },
  {
    severity: 'WARN',
    title: 'Corrosão nos conectores do carregador: problema recorrente em uso ao ar livre',
    body: 'Proprietários relatam oxidação e corrosão no plugue/porta de carregamento quando a scooter fica exposta ao tempo (chuva, maresia, umidade) sem proteção. Sintoma: carregador não "pega" contato firme, luz do carregador piscando, carga interrompida sozinha. Prevenção: cubra a porta de carregamento com uma capa de silicone (buscar "capa protetora conector carregador scooter elétrica") quando não estiver carregando, e nunca guarde a scooter destampada em área externa sem cobertura.',
  },
  {
    severity: 'WARN',
    title: 'Controlador/BMS: falhas intermitentes de potência relatadas em unidades de baixo custo',
    body: 'O controlador que gerencia a entrega de potência do motor (e o BMS — Battery Management System, no caso de versões com pacote gerenciado) pode apresentar falhas intermitentes: a scooter perde potência subitamente e volta ao normal sozinha, ou entra em "modo de proteção" sem motivo aparente. Geralmente é proteção térmica ou de subtensão acionada por bateria fraca — antes de suspeitar do controlador, teste com bateria totalmente carregada. Se o problema persistir com bateria boa, o controlador pode precisar de substituição (peça de reposição chinesa genérica, disponível em lojas de peças para scooter elétrica).',
  },
  {
    severity: 'WARN',
    title: 'Freio a tambor: resposta mais fraca que disco — ajuste o cabo regularmente',
    body: 'A PT-02 (versão base) usa freio a tambor nas duas rodas — frenagem mais suave e progressiva que o disco, mas que exige ajuste periódico do cabo à medida que a lona desgasta. Sintoma de cabo frouxo: alavanca "funda" (precisa puxar muito para frear). Ajuste o tensor do cabo a cada poucos meses de uso intenso. Se mesmo ajustado a frenagem continuar fraca, a lona pode estar gasta ou vitrificada (brilhante) — nesse caso é preciso trocar a lona, não apenas ajustar o cabo.',
  },
  {
    severity: 'WARN',
    title: 'Display/painel digital: sensível a umidade em unidades mais antigas',
    body: 'O painel digital (velocímetro, indicador de bateria) de scooters elétricas de entrada como a PT-02 tem vedação básica, e alguns donos relatam embaçamento interno do visor ou pixels apagados após exposição repetida a chuva forte. Não é uma falha generalizada, mas evite lavar a scooter com mangueira direto no painel. Se o display apagar por completo, verifique primeiro o fusível/conector antes de trocar a peça — muitas vezes é apenas mau contato.',
  },
]

const PT02_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma PT-02 2000W: manutenção elétrica substitui a manutenção de motor a combustão',
    body: 'Diário — Carregar a bateria (nunca deixar descarregada por dias). | Semanal — Verificar calibragem dos pneus (perda de pressão afeta autonomia e desgaste). | Mensal — Inspeção visual dos freios a tambor (cabo, lona) e testar a frenagem em baixa velocidade. | A cada 2 meses — Limpar e engraxar (graxa dielétrica) os terminais/conectores da bateria removível. | A cada 3 meses — Verificar aperto de parafusos da carenagem, retrovisores e suporte do guidão (vibração afrouxa com o tempo). | Semestral — Inspeção da lona de freio (espessura) e ajuste do cabo/tensor. | Anual — Inspeção dos rolamentos do motor hub e da roda dianteira em oficina especializada. | A cada 1,5-2,5 anos (ou 300-500 ciclos de carga) — Substituição do conjunto de baterias de chumbo-ácido, quando a autonomia cair visivelmente (abaixo de 60-70% da autonomia original).',
  },
]

// ─── PT-02 S 2000W (chumbo-ácido, trim superior — freio a disco + acabamento) ──

const PT02S_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesma base da PT-02: motor 2000W e bateria de chumbo-ácido idênticos, "S" muda o freio e o acabamento',
    body: 'A PT-02 S compartilha motor hub 2000W, sistema de bateria de chumbo-ácido removível e autonomia real (40-60 km) com a PT-02 base. A diferença do trim "S" está no freio dianteiro a disco (em vez de tambor nas duas rodas), suspensão com ajuste ligeiramente mais firme e itens de acabamento (para-lama, banco, iluminação em LED completo). Toda a rotina de cuidado com a bateria de chumbo-ácido descrita para a PT-02 (carga diária, nunca descarregar totalmente, limpeza de conectores) se aplica igualmente aqui.',
  },
  {
    severity: 'OK',
    title: 'Freio a disco dianteiro: resposta mais forte, mas pastilha desgasta mais rápido que a lona a tambor',
    body: 'O disco dianteiro da PT-02 S entrega frenagem mais firme e consistente que o tambor da versão base, especialmente em frenagens de emergência. Em contrapartida, a pastilha de disco desgasta mais rápido em uso urbano com frenagens frequentes. Verifique a espessura da pastilha a cada 2-3 meses (mínimo 1,5mm de material de fricção) e o nível do fluido do reservatório se o sistema for hidráulico, ou o ajuste do cabo se for freio a disco mecânico (mais comum nesse segmento de scooter elétrica de entrada).',
  },
  {
    severity: 'WARN',
    title: 'Disco de freio exposto: proteja contra ferrugem em garagens úmidas',
    body: 'Diferente do tambor (fechado), o disco de freio dianteiro fica exposto ao tempo. Se a scooter ficar parada por muitos dias em ambiente úmido, uma leve camada de ferrugem superficial pode se formar no disco — normal e que some com as primeiras frenagens, mas se persistir pode indicar disco de baixa qualidade (comum em peças genéricas de reposição). Prefira sempre disco e pastilha compatíveis com a especificação original ao trocar.',
  },
  {
    severity: 'OK',
    title: 'LED completo: menor consumo de bateria comparado a lanternas incandescentes',
    body: 'A iluminação em LED da PT-02 S consome bem menos energia da bateria que sistemas incandescentes usados em versões mais antigas/baratas — impacto pequeno mas real na autonomia, especialmente em uso noturno frequente. Mantenha as lentes de LED limpas (acúmulo de sujeira reduz a eficácia luminosa) e verifique o funcionamento de todas as luzes (seta, freio, farol) mensalmente — LEDs individuais queimados em geral precisam trocar o módulo inteiro, não a lâmpada avulsa.',
  },
]

const PT02S_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Mesma vulnerabilidade de bateria de chumbo-ácido da PT-02 base',
    body: 'A PT-02 S sofre do mesmo problema estrutural da PT-02: degradação relativamente rápida da bateria de chumbo-ácido se não for carregada com regularidade ou se ficar descarregada por dias. Vida útil típica 1,5-2,5 anos de uso diário. Antes de comprar usada, teste a autonomia real com bateria cheia — se estiver muito abaixo de 30-35 km, a bateria já está no fim da vida útil.',
  },
  {
    severity: 'WARN',
    title: 'Pinça do freio a disco: presa/emperrada é queixa comum em modelos de entrada',
    body: 'Pinças de freio a disco de scooters elétricas de orçamento reduzido tendem a emperrar (pistão não retorna totalmente) após alguns meses sem lubrificação dos pinos deslizantes, causando arrasto constante (disco "cantando" e esquentando) ou frenagem irregular. Solução: desmontagem e lubrificação dos pinos da pinça a cada 6 meses com graxa específica para freio (resistente a alta temperatura), não graxa comum.',
  },
  {
    severity: 'WARN',
    title: 'Cabo do freio a disco mecânico: esticamento requer reajuste frequente',
    body: 'Em versões com freio a disco mecânico (acionado por cabo, não hidráulico), o cabo estica naturalmente com o uso, exigindo reajuste no tensor a cada poucas semanas de uso intenso para manter a resposta firme na alavanca. Se notar a alavanca "chegando ao guidão" antes de frear com eficácia, é hora de reajustar — não espere o cabo folgar totalmente.',
  },
  {
    severity: 'WARN',
    title: 'Controlador/BMS: mesmas falhas intermitentes de potência da PT-02 base',
    body: 'Por compartilhar motor e eletrônica de potência com a PT-02, a PT-02 S apresenta as mesmas queixas ocasionais de perda de potência intermitente associada a bateria fraca ou proteção térmica do controlador. Antes de suspeitar de defeito, teste sempre com bateria plenamente carregada e temperatura ambiente normal.',
  },
]

const PT02S_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma PT-02 S: rotina da PT-02 base + cuidados específicos do freio a disco',
    body: 'Diário — Carregar a bateria. | Semanal — Calibragem dos pneus. | Mensal — Inspeção da pastilha de freio dianteira (espessura mínima 1,5mm) e teste de frenagem. | A cada 2 meses — Limpeza e graxa dielétrica nos terminais da bateria removível. | A cada 3 meses — Reajuste do cabo do freio a disco (se mecânico) e verificação da pinça (arrasto/emperramento). | Semestral — Lubrificação dos pinos da pinça de freio com graxa própria para alta temperatura; inspeção do freio a tambor traseiro. | Anual — Inspeção dos rolamentos do motor hub. | A cada 1,5-2,5 anos — Substituição do conjunto de baterias de chumbo-ácido conforme perda de autonomia.',
  },
]

// ─── PT-03 2000W (chumbo-ácido, porte médio) ──────────────────────────────────
// Similar à linha PT-02 mas com chassi/carroceria maior, banco duplo e maior
// capacidade de carga. Motor hub 2000W, bateria 60V chumbo-ácido.

const PT03_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Chassi maior que a PT-02: banco duplo e maior capacidade de carga, mesma base elétrica',
    body: 'A PT-03 2000W usa a mesma plataforma elétrica (motor hub 2000W, bateria 60V chumbo-ácido removível) da linha PT-02, mas com carroceria maior, banco para dois ocupantes e maior capacidade de carga no compartimento sob o banco. Com garupa e carga, a autonomia cai proporcionalmente mais que na PT-02 — espere 35-50 km reais em uso com passageiro, contra 40-60 km solo.',
  },
  {
    severity: 'OK',
    title: 'Compartimento sob o banco: útil para levar o carregador, mas cuidado com peso excessivo',
    body: 'O maior porte da PT-03 permite um compartimento sob o banco maior que o da PT-02, ideal para carregar o carregador portátil, capacete extra ou compras leves. Excesso de peso constante no compartimento, somado ao peso de garupa, sobrecarrega o motor hub e acelera o desgaste de pneus e suspensão traseira — respeite a capacidade de carga indicada no manual (normalmente 150-180 kg total, piloto + garupa + carga).',
  },
  {
    severity: 'WARN',
    title: 'Duas pessoas a bordo: frenagem exige mais distância — antecipe o freio',
    body: 'Com garupa, o peso total da PT-03 aumenta significativamente e o sistema de freios (a tambor na versão base) precisa de mais distância para parar com segurança. Antecipe a frenagem em pelo menos 30-50% mais distância quando estiver com passageiro, principalmente em descidas e pista molhada.',
  },
  {
    severity: 'OK',
    title: 'Bateria de chumbo-ácido de maior capacidade: mesma rotina de cuidado da PT-02, ainda mais importante',
    body: 'Como a PT-03 tende a rodar mais carregada (garupa + bagagem), o desgaste do conjunto de baterias de chumbo-ácido é mais acentuado. Reforce a rotina: carregar todo dia, nunca deixar a bateria zerada por mais de 2-3 dias, e limpar os terminais a cada 2 meses. Considere reduzir o número de viagens com garupa em dias de bateria já parcialmente descarregada — isso acelera a degradação das células.',
  },
  {
    severity: 'OK',
    title: 'Suspensão traseira reforçada: verifique amortecedores a cada 6 meses pelo maior peso suportado',
    body: 'Para suportar dois ocupantes e carga, a PT-03 tem suspensão traseira (mono ou dupla, conforme configuração) dimensionada para maior peso. Ainda assim, uso constante no limite de carga acelera o desgaste dos amortecedores. Verifique vazamento de óleo nos amortecedores e teste o "balanço" da traseira (pressionando o banco) a cada 6 meses — amortecedor "duro" ou vazando deve ser trocado em par, nunca só um lado.',
  },
]

const PT03_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Sobrecarga acelera degradação da bateria — uso constante com garupa reduz vida útil',
    body: 'Donos que usam a PT-03 rotineiramente com garupa e carga relatam vida útil da bateria de chumbo-ácido ainda mais curta que a média da linha PT (por vezes menos de 1,5 anos), pela maior corrente exigida do motor sob carga. Se o uso principal for para duas pessoas, considere isso ao avaliar o custo total de propriedade — a reposição do conjunto de bateria será mais frequente.',
  },
  {
    severity: 'WARN',
    title: 'Motor hub sob esforço: ruído e aquecimento maior em subidas com garupa',
    body: 'O motor hub 2000W da PT-03, projetado para uma plataforma que também carrega dois ocupantes, pode aquecer visivelmente (carcaça da roda traseira quente ao toque) e emitir ruído mais perceptível em subidas prolongadas com garupa. Isso é esperado dentro de limites — pare e deixe esfriar se notar perda progressiva de potência (sinal de proteção térmica do controlador ativada). Evitar subidas longas e íngremes com carga máxima prolonga a vida do motor e do controlador.',
  },
  {
    severity: 'WARN',
    title: 'Amortecedor traseiro: vazamento prematuro relatado em uso com carga constante',
    body: 'Uso frequente no limite de carga (dois ocupantes + bagagem) acelera o desgaste dos retentores do amortecedor traseiro, causando vazamento de óleo visível na haste. Sintoma: mancha de óleo, suspensão "afundando" e batendo no fim de curso em buracos. Troca do amortecedor (normalmente em par): peça de reposição genérica compatível disponível em lojas de peças para scooter elétrica chinesa.',
  },
  {
    severity: 'WARN',
    title: 'Freio a tambor: menos eficaz com peso total elevado — considere pastilhas/lonas de melhor qualidade',
    body: 'O freio a tambor de série na PT-03 pode se mostrar insuficiente para frenagens de emergência com dois ocupantes e carga máxima. Alguns donos relatam melhora perceptível trocando a lona original por opções de fricção mais agressiva disponíveis no mercado de reposição para scooters elétricas — pesquise compatibilidade antes de comprar. Mantenha o ajuste do cabo sempre no ponto certo.',
  },
]

const PT03_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma PT-03 2000W: rotina da linha PT reforçada pelo maior peso suportado',
    body: 'Diário — Carregar a bateria (essencial, ainda mais com uso frequente com garupa). | Semanal — Calibragem dos pneus (pressão maior recomendada quando rodar com garupa/carga). | Mensal — Inspeção do freio a tambor (cabo, lona) e teste de frenagem com e sem carga. | A cada 2 meses — Limpeza e graxa dielétrica nos terminais da bateria. | A cada 3 meses — Verificação de aperto geral (carenagem, retrovisores, suporte de bagagem). | Semestral — Inspeção da suspensão traseira (vazamento, dureza) e da lona de freio (espessura). | Anual — Inspeção dos rolamentos do motor hub e das buchas de suspensão. | A cada 1-2 anos (uso constante com carga reduz esse intervalo) — Substituição do conjunto de baterias.',
  },
]

// ─── PT-03 S 3000W (lítio, trim superior — mais potência e autonomia) ─────────
// Upgrade de motor (3000W) e provável migração para bateria de lítio removível
// (mais leve, sem sulfatação, ciclo de vida maior). Freio a disco dianteiro.

const PT03S_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Motor 3000W + bateria de lítio: salto de performance sobre a PT-03 2000W chumbo-ácido',
    body: 'A PT-03 S 3000W sobe de potência (3000W vs 2000W) e tipicamente adota bateria de lítio (Li-ion ou LiFePO4) removível em vez de chumbo-ácido — mais leve, sem o problema de sulfatação por descarga profunda, ciclo de vida maior (800-1200+ ciclos vs 300-500 do chumbo-ácido) e carga mais rápida (4-6h vs 8-10h). Isso justifica o incremento de preço sobre a PT-03 base: menor custo de manutenção da bateria ao longo do tempo, mesmo com o custo inicial mais alto.',
  },
  {
    severity: 'OK',
    title: 'Bateria de lítio: pode ficar parada descarregada sem o mesmo risco do chumbo-ácido, mas evite os extremos',
    body: 'Diferente da bateria de chumbo-ácido, a bateria de lítio da PT-03 S não sofre sulfatação — pode ficar parada por semanas sem degradar tão rapidamente. Ainda assim, evite os dois extremos: não guarde com a bateria 100% cheia por longos períodos (acelera degradação química) nem totalmente vazia (BMS pode entrar em modo de proteção profunda e "travar" a bateria). Ideal para guarda prolongada: 40-60% de carga, em local fresco e seco, longe de luz solar direta.',
  },
  {
    severity: 'OK',
    title: 'BMS de lítio protege contra sobrecarga e descarga excessiva — mas não ignore o carregador certo',
    body: 'A bateria de lítio da PT-03 S tem um BMS (Battery Management System) interno que monitora tensão de cada célula e corta a carga/descarga em situações de risco — proteção que o chumbo-ácido não tem. Mesmo assim, use exclusivamente o carregador original ou um equivalente com perfil de carga específico para lítio (tensão de corte compatível com a química da bateria, geralmente 4,2V/célula para Li-ion ou 3,65V/célula para LiFePO4). Carregador errado pode acionar o BMS constantemente e reduzir a vida útil.',
  },
  {
    severity: 'OK',
    title: 'Autonomia real: 55-75 km — bem superior à linha chumbo-ácido, mas ainda depende do uso',
    body: 'Com motor 3000W mais eficiente e bateria de lítio de maior densidade energética, a PT-03 S entrega autonomia real de aproximadamente 55-75 km em uso urbano misto (contra 40-60 km da PT-03 chumbo-ácido). Vento contrário, subidas, frio intenso e piloto pesado reduzem esse número. Para maximizar: evite acelerações bruscas repetidas (o pico de corrente do motor 3000W consome desproporcionalmente mais bateria) e mantenha os pneus na pressão correta.',
  },
  {
    severity: 'WARN',
    title: 'Freio a disco dianteiro: mais performance exige mais atenção ao desgaste da pastilha',
    body: 'A maior potência e velocidade da PT-03 S tornam o freio a disco dianteiro ainda mais crítico. Verifique a espessura da pastilha a cada 2-3 meses e não espere o "grito" metálico do indicador de desgaste (quando presente) — nesse ponto o disco já pode estar sendo riscado. Troque a pastilha preventivamente antes de viagens mais longas.',
  },
]

const PT03S_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Bateria de lítio: risco de superaquecimento em carregadores incompatíveis ou células danificadas',
    body: 'Embora mais segura no dia a dia que baterias de lítio antigas sem BMS, o pacote de lítio da PT-03 S ainda apresenta risco real de superaquecimento e, em casos raros, incêndio, se carregada com carregador incompatível, se a bateria sofrer impacto físico forte (queda, colisão) ou se ficar exposta a calor extremo (dentro de veículo fechado no sol, por exemplo). Nunca carregue uma bateria de lítio visivelmente danificada (estufada, com odor químico ou vazamento) — descarte-a em ponto de coleta especializado, nunca no lixo comum.',
  },
  {
    severity: 'WARN',
    title: 'BMS pode "travar" a bateria em climas frios intensos — normal, não é defeito',
    body: 'Baterias de lítio (especialmente LiFePO4) têm proteção de BMS que restringe ou bloqueia a carga em temperaturas muito baixas (tipicamente abaixo de 0-5°C), para evitar dano às células. Se a scooter estiver "sem carregar" em dia muito frio, aguarde a bateria atingir temperatura ambiente antes de tentar novamente — não é falha da bateria, é proteção funcionando como esperado.',
  },
  {
    severity: 'WARN',
    title: 'Controlador dimensionado para 3000W: verifique conexões de alta corrente periodicamente',
    body: 'O salto de potência para 3000W exige conectores e chicote elétrico capazes de suportar correntes mais altas. Conexões com contato imperfeito nesse patamar de potência esquentam mais rápido que em motores menores, podendo derreter isolamento de conectores baratos em casos extremos. Inspecione visualmente os principais conectores de potência (entre bateria, controlador e motor) a cada poucos meses, procurando sinais de descoloração por calor (plástico amarelado ou derretido).',
  },
  {
    severity: 'WARN',
    title: 'Pinça do freio a disco: mesma tendência a emperrar de outros modelos da linha PT',
    body: 'Assim como a PT-02 S, a PT-03 S pode apresentar pinça de freio a disco emperrada (pistão que não retorna) após meses sem lubrificação dos pinos deslizantes. Lubrifique com graxa própria para altas temperaturas a cada 6 meses.',
  },
]

const PT03S_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma PT-03 S 3000W: bateria de lítio simplifica a rotina, mas exige atenção à carga correta',
    body: 'Diário — Carregar (ideal manter entre 20-90% no uso diário; carga 100% reservada para dias de maior necessidade de autonomia). | Semanal — Calibragem dos pneus. | Mensal — Inspeção da pastilha de freio dianteira (espessura mínima 1,5mm). | A cada 2 meses — Verificação visual dos conectores de alta corrente (bateria/controlador/motor) e limpeza dos contatos externos. | A cada 3 meses — Lubrificação da pinça de freio a disco (pinos deslizantes). | Semestral — Inspeção da suspensão e revisão geral de aperto (carenagem, guidão, retrovisores). | Anual — Inspeção dos rolamentos do motor e checagem da saúde da bateria (capacidade real vs nominal) em oficina especializada. | Guarda prolongada (mais de 30 dias) — Deixar a bateria com 40-60% de carga, em local fresco e seco.',
  },
]

// ─── PT-04 Pro 3000W (lítio, topo de linha básico) ────────────────────────────
// Motor 3000W, bateria de lítio, suspensão e freios de nível superior à linha PT-02/03.

const PT04PRO_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Topo de linha PT: motor 3000W, bateria de lítio e melhor acabamento geral',
    body: 'A PT-04 Pro 3000W posiciona-se como topo da linha de scooters elétricas de entrada/média da Shineray, com motor hub (ou mid-drive, conforme configuração) de 3000W, bateria de lítio removível e acabamento superior (rodas de liga, painel digital mais completo, suspensão com curso maior). A rotina de cuidado com a bateria de lítio segue a mesma lógica da PT-03 S: evitar os extremos de carga, usar apenas carregador compatível e proteger de calor excessivo.',
  },
  {
    severity: 'OK',
    title: 'Rodas de liga (quando equipada): menos peso rotativo, mas mais sensível a impacto em buracos',
    body: 'Se a versão específica da PT-04 Pro vier com rodas de liga leve em vez de raiadas, o benefício é menor peso não-suspenso (melhora a resposta da suspensão e a eficiência energética), mas o risco de trincar a roda em buracos profundos ou meio-fios é maior que em rodas raiadas. Após qualquer impacto forte em buraco, inspecione a roda visualmente antes de continuar rodando — trinca em roda de liga pode não ser visível a olho nu de imediato.',
  },
  {
    severity: 'OK',
    title: 'Modos de condução (Eco/Normal/Sport, quando disponível): use Eco no dia a dia para poupar bateria',
    body: 'Scooters elétricas de topo de linha como a PT-04 Pro costumam trazer seletor de modo de condução que limita a potência entregue pelo controlador. O modo Eco reduz a aceleração máxima e a velocidade de topo, mas estende significativamente a autonomia por carga — use no trajeto diário. Reserve o modo Sport/Normal para quando precisar de mais retomada (ultrapassagens, subidas).',
  },
  {
    severity: 'OK',
    title: 'Painel digital com indicador de saúde da bateria: acompanhe a degradação ao longo do tempo',
    body: 'Se o painel da PT-04 Pro exibir dados de diagnóstico da bateria (tensão, ciclos, temperatura), consulte periodicamente — é a forma mais confiável de acompanhar a degradação real da bateria de lítio ao longo dos anos, em vez de confiar apenas na sensação de "autonomia caiu". Uma queda superior a 20% na capacidade nominal após 2-3 anos de uso é esperada; queda abrupta e repentina pode indicar célula com defeito.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão com curso maior: lubrifique os pontos de articulação a cada 6 meses',
    body: 'A suspensão de curso maior da PT-04 Pro (traseira em geral do tipo mono ou dupla reforçada) tem mais pontos de articulação que os modelos de entrada da linha PT. Lubrifique buchas e pivôs a cada 6 meses (graxa de lítio comum serve bem aqui, diferente da graxa específica de freio) para evitar ruído e desgaste prematuro dos componentes de borracha/silentblock.',
  },
]

const PT04PRO_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Bateria de lítio: mesmos riscos de superaquecimento/incêndio em caso de dano físico ou carga incompatível',
    body: 'Como toda scooter elétrica de lítio, a PT-04 Pro exige cuidado com quedas e impactos fortes no compartimento da bateria — células danificadas internamente por impacto podem não mostrar sinal externo imediato, mas representam risco de curto-circuito interno e superaquecimento posterior. Após qualquer queda ou colisão relevante, leve para inspeção antes de voltar a carregar normalmente.',
  },
  {
    severity: 'WARN',
    title: 'Peso do conjunto elétrico concentrado atrás: cuidado ao manobrar a scooter parada/desligada',
    body: 'Com motor mais potente e bateria maior, o centro de gravidade da PT-04 Pro tende a ser mais baixo e traseiro que em scooters a combustão equivalentes. Isso é positivo em movimento (mais estável), mas dificulta empurrar/manobrar a scooter desligada em ladeiras ou ao estacionar — planeje o estacionamento de forma que não precise empurrar contra subida.',
  },
  {
    severity: 'WARN',
    title: 'Controlador de 3000W: proteção térmica pode limitar potência em dias muito quentes',
    body: 'Em uso intenso sob sol forte (mais de 35°C ambiente) e trajetos com subidas prolongadas, o controlador do motor de 3000W pode ativar proteção térmica reduzindo a potência entregue temporariamente. Não é defeito — é proteção do componente. Se acontecer com frequência mesmo em clima ameno, verifique ventilação do compartimento do controlador (pode estar obstruído por sujeira acumulada).',
  },
  {
    severity: 'WARN',
    title: 'Pastilhas e disco: maior velocidade de ponta exige atenção redobrada ao desgaste',
    body: 'Sendo o modelo mais rápido da linha PT nesta configuração, frenagens de emergência mais frequentes em velocidade mais alta desgastam pastilha e disco mais rápido que nos modelos de entrada. Inspeção mensal recomendada, com troca preventiva da pastilha assim que restar menos de 1,5-2mm de material.',
  },
]

const PT04PRO_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma PT-04 Pro 3000W: topo de linha exige o mesmo rigor elétrico, com atenção extra à suspensão',
    body: 'Diário — Carregar a bateria (manter entre 20-90% no uso diário, 100% reservado para dias de maior necessidade). | Semanal — Calibragem dos pneus. | Mensal — Inspeção de pastilhas/disco de freio e teste de frenagem. | A cada 2 meses — Verificação dos conectores de alta corrente e limpeza de contatos. | A cada 3 meses — Checagem do modo de condução/eletrônica (sem erros no painel) e lubrificação da pinça de freio. | Semestral — Lubrificação dos pontos de articulação da suspensão; inspeção de rodas (trincas, empenamento). | Anual — Diagnóstico da saúde da bateria em oficina especializada; inspeção dos rolamentos do motor. | Guarda prolongada — Bateria entre 40-60% de carga, local fresco e seco.',
  },
]

// ─── PT-04 Pro S 3000W (lítio, versão mais completa da linha PT-04) ───────────

const PT04PROS_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Mesma base da PT-04 Pro: motor 3000W e bateria de lítio, "S" agrega itens de suspensão/freio/conforto',
    body: 'A PT-04 Pro S mantém o conjunto motor/bateria (3000W, lítio removível) da PT-04 Pro, com incrementos no trim: suspensão dianteira/traseira com regulagem de pré-carga, freio a disco em ambas as rodas (em vez de disco só na dianteira) e itens de conforto adicionais (banco com mais espuma, para-brisa maior, USB de carregamento). Toda a rotina de cuidado com bateria de lítio da PT-04 Pro se aplica igualmente.',
  },
  {
    severity: 'OK',
    title: 'Freio a disco duplo (dianteiro + traseiro): frenagem mais equilibrada, mas dobra a manutenção de pastilhas',
    body: 'Com disco nas duas rodas, a PT-04 Pro S ganha frenagem mais forte e equilibrada, especialmente importante dado o motor mais potente. A contrapartida prática: agora são duas pastilhas para inspecionar e trocar (em vez de uma dianteira + tambor traseiro). Mantenha o mesmo intervalo de inspeção mensal para as duas rodas, não apenas a dianteira.',
  },
  {
    severity: 'OK',
    title: 'Porta USB de carregamento: não deixe ligada continuamente com a scooter desligada',
    body: 'Se equipada com porta USB para celular no painel, evite deixar dispositivos conectados carregando com a scooter completamente desligada por longos períodos — dependendo do circuito, isso pode gerar um pequeno dreno constante na bateria de 12V auxiliar (se houver) ou na própria bateria de tração. Use a porta USB durante o trajeto, não como carregador estacionário.',
  },
  {
    severity: 'OK',
    title: 'Suspensão com pré-carga ajustável: regule conforme o peso do piloto e uso com garupa',
    body: 'A suspensão traseira ajustável da PT-04 Pro S permite aumentar a pré-carga para uso frequente com garupa ou carga extra, evitando que a suspensão "afunde" excessivamente e bata no fim de curso em buracos. Ajuste a pré-carga mais dura ao andar com passageiro e retorne ao ajuste padrão para uso solo — isso reduz o desgaste prematuro do amortecedor.',
  },
  {
    severity: 'WARN',
    title: 'Para-brisa maior: verifique fixações após trajetos em rodovia com vento forte',
    body: 'O para-brisa maior de série reduz o vento no piloto, mas também aumenta a área de resistência ao vento lateral — em trajetos de rodovia com rajadas fortes, verifique periodicamente se os parafusos de fixação do para-brisa não afrouxaram (vibração pode soltá-los ao longo do tempo).',
  },
]

const PT04PROS_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Bateria de lítio: riscos idênticos aos da PT-04 Pro — impacto físico e carregador incompatível',
    body: 'Os mesmos cuidados de segurança com a bateria de lítio da PT-04 Pro se aplicam à versão S: inspecione após quedas/colisões antes de recarregar, use apenas carregador compatível com a química da bateria, e nunca carregue uma bateria com sinais visíveis de dano (estufamento, odor químico).',
  },
  {
    severity: 'WARN',
    title: 'Freio a disco traseiro adicional: pinça traseira também pode emperrar por falta de lubrificação',
    body: 'Com a adição do disco traseiro, surge um novo ponto de atenção: a pinça traseira também precisa da mesma lubrificação periódica dos pinos deslizantes que a dianteira. Donos acostumados a cuidar só do freio dianteiro (comum em modelos anteriores da linha PT) às vezes esquecem o traseiro — inclua as duas pinças na rotina semestral de lubrificação.',
  },
  {
    severity: 'WARN',
    title: 'Porta USB: possível ponto de entrada de umidade se a tampa não vedar bem',
    body: 'Portas USB expostas em painéis de scooters de orçamento controlado às vezes têm vedação de tampa inferior à esperada. Verifique se a tampinha da porta USB fecha firme e substitua se estiver frouxa ou rachada — água entrando por esse ponto pode afetar o chicote elétrico do painel.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão ajustável: regulagem incorreta para o peso pode piorar o conforto, não é defeito da peça',
    body: 'Alguns donos relatam "suspensão dura demais" ou "batendo no fim de curso" na PT-04 Pro S — na maioria dos casos é regulagem de pré-carga inadequada para o peso do piloto/uso, não defeito de fabricação. Ajuste a pré-carga gradualmente até encontrar o ponto ideal antes de considerar troca de peça.',
  },
]

const PT04PROS_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma PT-04 Pro S: dois discos de freio e suspensão ajustável pedem atenção extra',
    body: 'Diário — Carregar a bateria (20-90% no uso diário). | Semanal — Calibragem dos pneus. | Mensal — Inspeção de pastilhas dianteira E traseira (espessura mínima 1,5mm) e teste de frenagem nas duas rodas. | A cada 2 meses — Verificação dos conectores de alta corrente e da tampa da porta USB. | A cada 3 meses — Lubrificação das DUAS pinças de freio a disco (pinos deslizantes). | Semestral — Ajuste/verificação da pré-carga da suspensão conforme uso (solo ou garupa); inspeção do para-brisa e fixações. | Anual — Diagnóstico da saúde da bateria; inspeção dos rolamentos do motor. | Guarda prolongada — Bateria entre 40-60% de carga.',
  },
]

// ─── SE-1 2000W (scooter elétrica compacta, chumbo-ácido) ─────────────────────

const SE1_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Scooter compacta e leve: motor 2000W ideal para trajetos urbanos curtos',
    body: 'A SE-1 2000W é posicionada como a scooter elétrica mais compacta da linha SE da Shineray — mais leve que a linha PT, com rodas menores e foco em mobilidade urbana de curta distância (bairro, últimos km, entregas leves). O motor hub 2000W e a bateria de chumbo-ácido removível (configuração típica de entrada) seguem a mesma lógica de cuidado das demais scooters de chumbo-ácido da marca: carga diária obrigatória, nunca deixar descarregada por dias.',
  },
  {
    severity: 'OK',
    title: 'Rodas menores: mais ágil no trânsito, mas mais sensível a buracos e valetas',
    body: 'O diâmetro de roda reduzido da SE-1 (comum em scooters compactas urbanas) melhora a manobrabilidade em trânsito denso, mas transmite mais impacto de buracos e valetas para o piloto e para a suspensão do que rodas maiores. Reduza a velocidade ao cruzar valetas, lombadas e buracos — o risco de dano à roda ou ao pneu é maior que em scooters de roda grande.',
  },
  {
    severity: 'OK',
    title: 'Peso leve facilita manobra manual, inclusive subir em calçadas/rampas com a scooter desligada',
    body: 'Por ser mais leve que os modelos PT, a SE-1 é mais fácil de manobrar manualmente (empurrar, subir em calçada, guardar em espaço apertado) mesmo desligada. Isso é uma vantagem prática para quem mora em prédio sem elevador de carga ou precisa guardar a scooter em espaço reduzido.',
  },
  {
    severity: 'OK',
    title: 'Autonomia real: 35-50 km — a menor da linha, compatível com o uso compacto proposto',
    body: 'Por ter bateria de menor capacidade física (coerente com o porte compacto), a autonomia real da SE-1 fica em torno de 35-50 km por carga em uso urbano misto. Para quem faz trajetos curtos e recorrentes (menos de 15-20 km ida e volta), é suficiente mesmo com alguma folga de segurança — mas não é a escolha ideal para trajetos longos diários.',
  },
  {
    severity: 'WARN',
    title: 'Pneus menores: calibre com mais frequência — perdem pressão proporcionalmente mais rápido',
    body: 'Pneus de menor volume de ar (típicos de scooters compactas) perdem pressão proporcionalmente mais rápido que pneus maiores, e pressão baixa em roda pequena é sentida com mais intensidade no conforto e na autonomia. Calibre semanalmente, não apenas mensalmente.',
  },
]

const SE1_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Mesma vulnerabilidade de degradação da bateria de chumbo-ácido das demais scooters de entrada',
    body: 'Assim como a linha PT de entrada, a SE-1 sofre com sulfatação e perda de capacidade se a bateria de chumbo-ácido ficar descarregada por dias ou for carregada com carregador incompatível. Vida útil típica 1,5-2,5 anos de uso diário. Ao comprar usada, teste a autonomia real antes de fechar negócio.',
  },
  {
    severity: 'WARN',
    title: 'Roda pequena com pneu fino: risco maior de dano em buracos profundos',
    body: 'Combinação de roda menor e pneu de perfil mais fino (comum em scooters compactas) aumenta o risco de "pinçamento" do pneu (deformação da câmara/aro contra o obstáculo) em buracos profundos, causando furos ou até dano ao aro. Evite trafegar em alta velocidade sobre buracos não identificados previamente — reduza a marcha ao se aproximar de trecho de asfalto irregular.',
  },
  {
    severity: 'WARN',
    title: 'Suspensão mais simples/curta: menos conforto em pista ruim, desgaste de buchas acelerado',
    body: 'Por ser um modelo compacto de entrada, a suspensão da SE-1 tende a ter curso mais curto que os modelos PT maiores, absorvendo menos os impactos — isso acelera o desgaste de buchas e articulações se o uso for constante em pavimento ruim. Lubrifique os pontos de articulação a cada 4-6 meses (mais frequente que em modelos com suspensão de curso maior).',
  },
  {
    severity: 'WARN',
    title: 'Controlador/eletrônica de entrada: mesmas falhas intermitentes reportadas na linha PT-02',
    body: 'A eletrônica de potência da SE-1, por ser de configuração similar à linha PT de entrada, apresenta as mesmas queixas ocasionais de perda de potência intermitente ligada a bateria fraca ou proteção térmica. Sempre teste com bateria plenamente carregada antes de suspeitar de defeito no controlador.',
  },
]

const SE1_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma SE-1 2000W: rotina compacta, com atenção redobrada a pneus e suspensão curta',
    body: 'Diário — Carregar a bateria. | Semanal — Calibragem dos pneus (verificar com mais frequência que em scooters de roda grande). | Mensal — Inspeção dos freios (cabo/lona ou pastilha, conforme configuração) e teste de frenagem. | A cada 2 meses — Limpeza e graxa dielétrica nos terminais da bateria removível. | A cada 4 meses — Lubrificação dos pontos de articulação da suspensão (curso mais curto desgasta mais rápido). | Semestral — Inspeção de aro/pneu por sinais de dano de impacto (buracos); revisão de aperto geral. | Anual — Inspeção dos rolamentos do motor hub. | A cada 1,5-2,5 anos — Substituição do conjunto de baterias de chumbo-ácido.',
  },
]

// ─── SE-2 2300W (scooter elétrica intermediária) ──────────────────────────────

const SE2_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Evolução da SE-1: motor 2300W e porte ligeiramente maior, mesma proposta compacta urbana',
    body: 'A SE-2 2300W é a evolução da SE-1 dentro da linha SE, com motor hub de maior potência (2300W) e geralmente rodas/chassi um pouco maiores, mantendo o foco em mobilidade urbana. Pode vir com bateria de chumbo-ácido ou lítio dependendo da configuração comercializada — verifique o tipo exato na etiqueta/manual do veículo específico, pois a rotina de cuidado muda bastante entre as duas químicas.',
  },
  {
    severity: 'WARN',
    title: 'Identifique a química da bateria antes de definir a rotina de carga',
    body: 'Diferente de modelos com química de bateria fixa e conhecida, a SE-2 pode ter variações de configuração (chumbo-ácido em lotes/regiões, lítio em outros). Verifique o manual do proprietário ou a etiqueta na própria bateria: se for chumbo-ácido (VRLA/selada), carregue todo dia e nunca deixe descarregar totalmente; se for lítio (Li-ion/LiFePO4), mantenha entre 20-90% no uso diário e evite os extremos de carga para guarda prolongada.',
  },
  {
    severity: 'OK',
    title: 'Autonomia real: 45-65 km dependendo da bateria equipada',
    body: 'Com motor mais potente que a SE-1 e, dependendo da configuração, bateria de maior capacidade, a SE-2 entrega autonomia real na faixa de 45-65 km em uso urbano misto — configurações com bateria de lítio tendem para o topo dessa faixa, chumbo-ácido para o piso.',
  },
  {
    severity: 'OK',
    title: 'Motor 2300W: retomada mais forte em subidas leves e semáforos que a SE-1',
    body: 'O incremento de potência sobre a SE-1 melhora a resposta em retomadas e pequenas subidas urbanas, mas ainda é um motor de porte moderado — evite exigir a scooter em subidas longas e íngremes de forma repetida, para não sobrecarregar o controlador termicamente.',
  },
  {
    severity: 'OK',
    title: 'Manutenção geral segue o padrão da linha SE: foco em pneus, freios e conectores elétricos',
    body: 'Assim como as demais scooters elétricas Shineray, a SE-2 não tem óleo de motor, vela ou embreagem para trocar. A manutenção concentra-se em: calibragem e desgaste de pneus, freios (pastilha/lona conforme configuração), limpeza de conectores elétricos e, se aplicável, cuidado com a bateria de chumbo-ácido ou lítio conforme a química equipada.',
  },
]

const SE2_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Se equipada com chumbo-ácido: mesma vulnerabilidade a sulfatação da linha de entrada',
    body: 'Em configurações com bateria de chumbo-ácido, a SE-2 herda a mesma fragilidade das demais scooters de entrada da Shineray: degradação acelerada se ficar descarregada por dias, vida útil de 1,5-2,5 anos de uso diário. Confirme a química da bateria da sua unidade específica ao planejar o custo de manutenção de longo prazo.',
  },
  {
    severity: 'WARN',
    title: 'Motor mais potente sobre chassi compacto: verifique aperto do motor/cubo com mais frequência',
    body: 'O salto de potência sobre a SE-1 exige que o motor hub e seus pontos de fixação suportem mais torque em um chassi de porte compacto/médio — verifique o aperto dos parafusos de fixação da roda motriz a cada poucos meses, já que folga nesse ponto (por vibração acumulada) pode causar ruído e, em caso extremo, comprometer a segurança.',
  },
  {
    severity: 'WARN',
    title: 'Variação de configuração entre unidades: peças de reposição podem não ser universais',
    body: 'Como a SE-2 pode ter variações de bateria (e possivelmente de controlador/freio) entre lotes, ao comprar peça de reposição confirme sempre a especificação exata da sua unidade (número de série, etiqueta da bateria) antes de comprar — peça genérica para "SE-2" pode não ser compatível se a configuração específica divergir.',
  },
  {
    severity: 'WARN',
    title: 'Conectores de potência: inspecione com atenção redobrada pelo aumento de corrente sobre a SE-1',
    body: 'Com mais potência que a SE-1, os conectores de alta corrente da SE-2 estão sujeitos a mais aquecimento em caso de contato imperfeito. Inspecione visualmente a cada poucos meses, procurando descoloração por calor nos plugues entre bateria, controlador e motor.',
  },
]

const SE2_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma SE-2 2300W: rotina padrão da linha SE, adaptada à química da bateria equipada',
    body: 'Diário — Carregar a bateria (chumbo-ácido: sempre; lítio: manter 20-90% no uso diário). | Semanal — Calibragem dos pneus. | Mensal — Inspeção dos freios e teste de frenagem. | A cada 2 meses — Limpeza dos conectores elétricos (terminais da bateria e conexões de potência). | A cada 3 meses — Verificação do aperto dos parafusos de fixação da roda motriz (motor hub). | Semestral — Inspeção da suspensão e revisão geral de aperto. | Anual — Inspeção dos rolamentos do motor; diagnóstico de saúde da bateria (se lítio) em oficina especializada. | Reposição da bateria — 1,5-2,5 anos (chumbo-ácido) ou conforme perda de capacidade (lítio, tipicamente 3-5 anos).',
  },
]

// ─── SHE-S 3000W (topo da linha SE, lítio, mais premium) ──────────────────────

const SHES_MACETES: TipInput[] = [
  {
    severity: 'OK',
    title: 'Topo de linha da família SE: motor 3000W e bateria de lítio de série',
    body: 'A SHE-S 3000W representa o topo da linha de scooters elétricas compactas/urbanas Shineray, com motor 3000W e bateria de lítio removível de série (não apenas em versão opcional). Acabamento e itens de conforto (painel digital completo, iluminação em LED, possivelmente conectividade via app) tendem a ser os mais completos da linha SE. A rotina de cuidado com bateria de lítio (evitar extremos de carga, carregador compatível, proteção contra impacto físico) é a mesma das demais versões de lítio da marca.',
  },
  {
    severity: 'OK',
    title: 'App de conectividade (se disponível): útil para monitorar saúde da bateria e localização',
    body: 'Se a SHE-S tiver aplicativo de conectividade via Bluetooth/celular, use-o para acompanhar tensão da bateria, histórico de carga e, em alguns casos, localização da scooter (útil contra furto). Mantenha o firmware do app e, se aplicável, do controlador atualizados — atualizações costumam trazer melhorias na gestão de energia e correções de bugs do BMS.',
  },
  {
    severity: 'OK',
    title: 'Autonomia real: 60-80 km — a maior da linha SE, mas ainda sensível a uso agressivo',
    body: 'Com motor 3000W eficiente e bateria de lítio de maior capacidade, a SHE-S entrega a maior autonomia real da linha SE (60-80 km em uso urbano misto). Acelerações bruscas repetidas e trajetos com muitas subidas reduzem esse número — para maximizar, prefira aceleração progressiva e mantenha os pneus calibrados.',
  },
  {
    severity: 'OK',
    title: 'Freio a disco em ambas as rodas (configuração típica de topo de linha): inspeção mensal das duas pastilhas',
    body: 'Sendo o modelo de maior potência e provável maior velocidade de ponta da linha SE, a SHE-S tende a vir com freio a disco nas duas rodas. Inclua a pastilha traseira na mesma rotina de inspeção mensal da dianteira — não é incomum donos focarem só no freio dianteiro e esquecerem o traseiro até ele desgastar totalmente.',
  },
  {
    severity: 'OK',
    title: 'Bateria de lítio de maior capacidade: mais pesada para remover — cuidado com a coluna ao carregar',
    body: 'A bateria de lítio de maior capacidade da SHE-S, embora ainda mais leve que uma bateria de chumbo-ácido equivalente em energia, tem peso considerável (tipicamente 8-15 kg dependendo da capacidade). Ao remover para carregar em casa, dobre os joelhos e segure a bateria próxima ao corpo para evitar lesão nas costas — pode parecer trivial, mas é uma reclamação comum de usuários que fazem essa rotina diariamente.',
  },
]

const SHES_PROBLEMAS: TipInput[] = [
  {
    severity: 'DANGER',
    title: 'Bateria de lítio de maior capacidade: mesmos riscos de segurança, com energia armazenada ainda maior',
    body: 'Por ter a maior capacidade de bateria da linha SE, os riscos associados a dano físico, carregador incompatível ou célula defeituosa na SHE-S envolvem mais energia armazenada que nos modelos menores — reforce ainda mais os cuidados: nunca carregue bateria com sinais de dano, use apenas carregador compatível, e evite carregar sem supervisão em ambientes com materiais inflamáveis próximos.',
  },
  {
    severity: 'WARN',
    title: 'Conectividade via app: dependência de conexão pode gerar frustração se o servidor cair',
    body: 'Recursos conectados (app de monitoramento, localização) dependem de servidor do fabricante — se o serviço ficar fora do ar ou for descontinuado, funções como localização remota podem parar de funcionar mesmo com a scooter mecanicamente perfeita. Não dependa exclusivamente do app para segurança contra furto — use trava física adicional como camada extra.',
  },
  {
    severity: 'WARN',
    title: 'Painel digital mais complexo: maior chance de bug de software que em painéis simples',
    body: 'Painéis mais completos (com mais funções, telas e integração eletrônica) têm, estatisticamente, mais chance de apresentar bugs de software (travamento de tela, leitura incorreta de autonomia) que painéis simples de scooters de entrada. Se o painel travar, geralmente um ciclo de desligar/ligar resolve; se persistir, pode ser necessária atualização de firmware em oficina autorizada.',
  },
  {
    severity: 'WARN',
    title: 'Freio a disco duplo: custo de manutenção de pastilhas/discos maior que versões com tambor',
    body: 'Sendo topo de linha com disco nas duas rodas, o custo recorrente de manutenção de freio da SHE-S é maior que o de modelos de entrada com tambor — duas pastilhas e potencialmente dois discos a trocar ao longo da vida útil, em vez de apenas lona de tambor (mais barata e duradoura). Considere isso no orçamento de manutenção de longo prazo.',
  },
]

const SHES_MANUTENCAO: TipInput[] = [
  {
    severity: 'OK',
    title: 'Cronograma SHE-S 3000W: topo de linha exige rotina completa de bateria de lítio e freio a disco duplo',
    body: 'Diário — Carregar a bateria (manter 20-90% no uso diário; 100% reservado para dias de maior necessidade de autonomia). | Semanal — Calibragem dos pneus. | Mensal — Inspeção das pastilhas de freio dianteira E traseira (espessura mínima 1,5-2mm) e teste de frenagem. | A cada 2 meses — Verificação dos conectores de alta corrente e limpeza de contatos externos. | A cada 3 meses — Lubrificação das duas pinças de freio a disco; verificação de atualizações de firmware do app/painel, se aplicável. | Semestral — Inspeção da suspensão e revisão geral de aperto (carenagem, guidão, retrovisores, rodas). | Anual — Diagnóstico completo da saúde da bateria (capacidade real, ciclos, temperatura) em oficina especializada; inspeção dos rolamentos do motor. | Guarda prolongada (mais de 30 dias) — Bateria entre 40-60% de carga, local fresco, seco e longe de luz solar direta.',
  },
]

// ─── BLOCOS ────────────────────────────────────────────────────────────────────

const BLOCKS: ModelBlock[] = [
  {
    modelName: 'PT-02 2000W (Elétrica)',
    yearFrom: 2022,
    yearTo: null,
    MACETES: PT02_MACETES,
    PROBLEMAS: PT02_PROBLEMAS,
    MANUTENCAO: PT02_MANUTENCAO,
  },
  {
    modelName: 'PT-02 S 2000W (Elétrica)',
    yearFrom: 2022,
    yearTo: null,
    MACETES: PT02S_MACETES,
    PROBLEMAS: PT02S_PROBLEMAS,
    MANUTENCAO: PT02S_MANUTENCAO,
  },
  {
    modelName: 'PT-03 2000W (Elétrica)',
    yearFrom: 2022,
    yearTo: null,
    MACETES: PT03_MACETES,
    PROBLEMAS: PT03_PROBLEMAS,
    MANUTENCAO: PT03_MANUTENCAO,
  },
  {
    modelName: 'PT-03 S 3000W (Elétrica)',
    yearFrom: 2023,
    yearTo: null,
    MACETES: PT03S_MACETES,
    PROBLEMAS: PT03S_PROBLEMAS,
    MANUTENCAO: PT03S_MANUTENCAO,
  },
  {
    modelName: 'PT-04 Pro 3000W (Elétrica)',
    yearFrom: 2023,
    yearTo: null,
    MACETES: PT04PRO_MACETES,
    PROBLEMAS: PT04PRO_PROBLEMAS,
    MANUTENCAO: PT04PRO_MANUTENCAO,
  },
  {
    modelName: 'PT-04 Pro S 3000W (Elétrica)',
    yearFrom: 2023,
    yearTo: null,
    MACETES: PT04PROS_MACETES,
    PROBLEMAS: PT04PROS_PROBLEMAS,
    MANUTENCAO: PT04PROS_MANUTENCAO,
  },
  {
    modelName: 'SE-1 2000W (Elétrica)',
    yearFrom: 2022,
    yearTo: null,
    MACETES: SE1_MACETES,
    PROBLEMAS: SE1_PROBLEMAS,
    MANUTENCAO: SE1_MANUTENCAO,
  },
  {
    modelName: 'SE-2 2300W (Elétrica)',
    yearFrom: 2023,
    yearTo: null,
    MACETES: SE2_MACETES,
    PROBLEMAS: SE2_PROBLEMAS,
    MANUTENCAO: SE2_MANUTENCAO,
  },
  {
    modelName: 'SHE-S 3000W (Elétrica)',
    yearFrom: 2023,
    yearTo: null,
    MACETES: SHES_MACETES,
    PROBLEMAS: SHES_PROBLEMAS,
    MANUTENCAO: SHES_MANUTENCAO,
  },
]

// ─── CALIBRAGENS ───────────────────────────────────────────────────────────────

const TIRE_PRESSURES: TirePressureInput[] = [
  {
    modelName: 'PT-02 2000W (Elétrica)',
    yearFrom: 2022, yearTo: null,
    tireSize: '90/90-12 (F) · 90/90-12 (R)',
    frontPsi: 24, rearPsi: 28,
    frontPsiLoad: 26, rearPsiLoad: 32,
    notes: 'Solo: F 24 / R 28 PSI. Com garupa/carga: F 26 / R 32 PSI. Roda 12" típica de scooter urbana compacta. Verifique semanalmente — pressão baixa reduz autonomia e acelera desgaste do pneu.',
  },
  {
    modelName: 'PT-02 S 2000W (Elétrica)',
    yearFrom: 2022, yearTo: null,
    tireSize: '90/90-12 (F) · 90/90-12 (R)',
    frontPsi: 24, rearPsi: 28,
    frontPsiLoad: 26, rearPsiLoad: 32,
    notes: 'Solo: F 24 / R 28 PSI. Com garupa/carga: F 26 / R 32 PSI. Mesma especificação de pneu da PT-02 base.',
  },
  {
    modelName: 'PT-03 2000W (Elétrica)',
    yearFrom: 2022, yearTo: null,
    tireSize: '100/90-12 (F) · 100/90-12 (R)',
    frontPsi: 25, rearPsi: 30,
    frontPsiLoad: 27, rearPsiLoad: 34,
    notes: 'Solo: F 25 / R 30 PSI. Com garupa/carga: F 27 / R 34 PSI. Chassi maior que a PT-02 exige pneu de maior seção e pressão levemente superior, especialmente com dois ocupantes.',
  },
  {
    modelName: 'PT-03 S 3000W (Elétrica)',
    yearFrom: 2023, yearTo: null,
    tireSize: '100/90-12 (F) · 100/90-12 (R)',
    frontPsi: 26, rearPsi: 30,
    frontPsiLoad: 28, rearPsiLoad: 34,
    notes: 'Solo: F 26 / R 30 PSI. Com garupa/carga: F 28 / R 34 PSI. Maior potência do motor 3000W recomenda o limite superior da faixa para reduzir deformação do pneu em acelerações mais fortes.',
  },
  {
    modelName: 'PT-04 Pro 3000W (Elétrica)',
    yearFrom: 2023, yearTo: null,
    tireSize: '100/90-12 (F) · 110/90-12 (R)',
    frontPsi: 26, rearPsi: 32,
    frontPsiLoad: 28, rearPsiLoad: 36,
    notes: 'Solo: F 26 / R 32 PSI. Com garupa/carga: F 28 / R 36 PSI. Traseiro de maior seção pela maior potência entregue ao chão.',
  },
  {
    modelName: 'PT-04 Pro S 3000W (Elétrica)',
    yearFrom: 2023, yearTo: null,
    tireSize: '100/90-12 (F) · 110/90-12 (R)',
    frontPsi: 26, rearPsi: 32,
    frontPsiLoad: 28, rearPsiLoad: 36,
    notes: 'Solo: F 26 / R 32 PSI. Com garupa/carga: F 28 / R 36 PSI. Mesma especificação de pneu da PT-04 Pro base — suspensão ajustável não altera a pressão recomendada de fábrica.',
  },
  {
    modelName: 'SE-1 2000W (Elétrica)',
    yearFrom: 2022, yearTo: null,
    tireSize: '80/90-10 (F) · 80/90-10 (R)',
    frontPsi: 22, rearPsi: 26,
    frontPsiLoad: 24, rearPsiLoad: 30,
    notes: 'Solo: F 22 / R 26 PSI. Com carga: F 24 / R 30 PSI. Roda 10" compacta — verifique a pressão com mais frequência (semanal) que scooters de roda maior, pois perdem ar proporcionalmente mais rápido.',
  },
  {
    modelName: 'SE-2 2300W (Elétrica)',
    yearFrom: 2023, yearTo: null,
    tireSize: '90/90-10 (F) · 90/90-10 (R)',
    frontPsi: 24, rearPsi: 28,
    frontPsiLoad: 26, rearPsiLoad: 32,
    notes: 'Solo: F 24 / R 28 PSI. Com carga: F 26 / R 32 PSI. Pneu levemente maior que a SE-1 pelo motor mais potente e chassi um pouco maior.',
  },
  {
    modelName: 'SHE-S 3000W (Elétrica)',
    yearFrom: 2023, yearTo: null,
    tireSize: '90/90-10 (F) · 100/90-10 (R)',
    frontPsi: 25, rearPsi: 30,
    frontPsiLoad: 27, rearPsiLoad: 34,
    notes: 'Solo: F 25 / R 30 PSI. Com carga: F 27 / R 34 PSI. Traseiro de maior seção — topo de linha da família SE com motor 3000W.',
  },
]

// ─── ITENS DE MANUTENÇÃO ─────────────────────────────────────────────────────

const MAINTENANCE_ITEMS: MaintenanceItemInput[] = [
  // PT-02 2000W
  { modelName: 'PT-02 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Carga da bateria de chumbo-ácido', intervalKm: null, intervalMonths: null, notes: 'Carregar diariamente. Nunca deixar descarregada por mais de 2-3 dias — sulfatação reduz capacidade permanentemente.', priority: 'CRITICAL', order: 1 },
  { modelName: 'PT-02 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Calibragem dos pneus', intervalKm: null, intervalMonths: 1, notes: 'Verificar semanalmente. Pressão baixa reduz autonomia e acelera desgaste.', priority: 'MEDIUM', order: 2 },
  { modelName: 'PT-02 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Freio a tambor — ajuste do cabo e inspeção da lona', intervalKm: null, intervalMonths: 3, notes: 'Verificar folga da alavanca e espessura da lona.', priority: 'HIGH', order: 3 },
  { modelName: 'PT-02 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Limpeza e graxa dielétrica dos terminais da bateria', intervalKm: null, intervalMonths: 2, notes: 'Previne oxidação e falha de contato intermitente.', priority: 'HIGH', order: 4 },
  { modelName: 'PT-02 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Inspeção dos rolamentos do motor hub', intervalKm: null, intervalMonths: 12, notes: 'Verificar ruído e folga na roda traseira em oficina especializada.', priority: 'MEDIUM', order: 5 },
  { modelName: 'PT-02 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Aperto geral (carenagem, retrovisores, guidão)', intervalKm: null, intervalMonths: 3, notes: 'Vibração afrouxa parafusos com o tempo.', priority: 'LOW', order: 6 },
  { modelName: 'PT-02 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Substituição do conjunto de baterias de chumbo-ácido', intervalKm: null, intervalMonths: 24, notes: 'Vida útil típica 1,5-2,5 anos (300-500 ciclos). Trocar quando autonomia cair abaixo de 60-70% da original.', priority: 'CRITICAL', order: 7 },

  // PT-02 S 2000W
  { modelName: 'PT-02 S 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Carga da bateria de chumbo-ácido', intervalKm: null, intervalMonths: null, notes: 'Carregar diariamente. Nunca deixar descarregada por mais de 2-3 dias.', priority: 'CRITICAL', order: 1 },
  { modelName: 'PT-02 S 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Calibragem dos pneus', intervalKm: null, intervalMonths: 1, notes: 'Verificar semanalmente.', priority: 'MEDIUM', order: 2 },
  { modelName: 'PT-02 S 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Pastilha de freio a disco dianteiro — inspeção', intervalKm: null, intervalMonths: 2, notes: 'Espessura mínima 1,5mm de material de fricção.', priority: 'HIGH', order: 3 },
  { modelName: 'PT-02 S 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Lubrificação da pinça de freio a disco (pinos deslizantes)', intervalKm: null, intervalMonths: 6, notes: 'Graxa própria para alta temperatura, não graxa comum. Previne emperramento.', priority: 'MEDIUM', order: 4 },
  { modelName: 'PT-02 S 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Limpeza e graxa dielétrica dos terminais da bateria', intervalKm: null, intervalMonths: 2, notes: 'Previne oxidação e falha de contato intermitente.', priority: 'HIGH', order: 5 },
  { modelName: 'PT-02 S 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Inspeção dos rolamentos do motor hub', intervalKm: null, intervalMonths: 12, notes: 'Verificar ruído e folga.', priority: 'MEDIUM', order: 6 },
  { modelName: 'PT-02 S 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Substituição do conjunto de baterias de chumbo-ácido', intervalKm: null, intervalMonths: 24, notes: 'Vida útil típica 1,5-2,5 anos.', priority: 'CRITICAL', order: 7 },

  // PT-03 2000W
  { modelName: 'PT-03 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Carga da bateria de chumbo-ácido', intervalKm: null, intervalMonths: null, notes: 'Carregar diariamente — ainda mais importante com uso frequente com garupa.', priority: 'CRITICAL', order: 1 },
  { modelName: 'PT-03 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Calibragem dos pneus', intervalKm: null, intervalMonths: 1, notes: 'Pressão maior recomendada ao rodar com garupa/carga.', priority: 'MEDIUM', order: 2 },
  { modelName: 'PT-03 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Freio a tambor — ajuste do cabo e inspeção da lona', intervalKm: null, intervalMonths: 3, notes: 'Testar frenagem com e sem carga.', priority: 'HIGH', order: 3 },
  { modelName: 'PT-03 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Inspeção da suspensão traseira (vazamento, dureza)', intervalKm: null, intervalMonths: 6, notes: 'Uso com carga máxima acelera desgaste dos retentores do amortecedor.', priority: 'HIGH', order: 4 },
  { modelName: 'PT-03 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Limpeza e graxa dielétrica dos terminais da bateria', intervalKm: null, intervalMonths: 2, notes: 'Previne oxidação e falha de contato.', priority: 'HIGH', order: 5 },
  { modelName: 'PT-03 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Inspeção dos rolamentos do motor e buchas de suspensão', intervalKm: null, intervalMonths: 12, notes: 'Verificar em oficina especializada.', priority: 'MEDIUM', order: 6 },
  { modelName: 'PT-03 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Substituição do conjunto de baterias de chumbo-ácido', intervalKm: null, intervalMonths: 18, notes: 'Uso constante com carga reduz o intervalo para cerca de 1-2 anos.', priority: 'CRITICAL', order: 7 },

  // PT-03 S 3000W
  { modelName: 'PT-03 S 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Carga da bateria de lítio', intervalKm: null, intervalMonths: null, notes: 'Manter entre 20-90% no uso diário. Usar apenas carregador compatível com lítio.', priority: 'CRITICAL', order: 1 },
  { modelName: 'PT-03 S 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Calibragem dos pneus', intervalKm: null, intervalMonths: 1, notes: 'Verificar semanalmente.', priority: 'MEDIUM', order: 2 },
  { modelName: 'PT-03 S 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Pastilha de freio a disco dianteiro — inspeção', intervalKm: null, intervalMonths: 2, notes: 'Espessura mínima 1,5mm.', priority: 'HIGH', order: 3 },
  { modelName: 'PT-03 S 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Verificação dos conectores de alta corrente', intervalKm: null, intervalMonths: 2, notes: 'Motor 3000W exige mais corrente — checar descoloração por calor nos plugues.', priority: 'HIGH', order: 4 },
  { modelName: 'PT-03 S 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Lubrificação da pinça de freio a disco', intervalKm: null, intervalMonths: 6, notes: 'Graxa própria para alta temperatura.', priority: 'MEDIUM', order: 5 },
  { modelName: 'PT-03 S 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Diagnóstico de saúde da bateria de lítio', intervalKm: null, intervalMonths: 12, notes: 'Capacidade real vs nominal, em oficina especializada.', priority: 'MEDIUM', order: 6 },
  { modelName: 'PT-03 S 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Inspeção dos rolamentos do motor', intervalKm: null, intervalMonths: 12, notes: 'Verificar ruído e folga.', priority: 'MEDIUM', order: 7 },

  // PT-04 Pro 3000W
  { modelName: 'PT-04 Pro 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Carga da bateria de lítio', intervalKm: null, intervalMonths: null, notes: 'Manter entre 20-90% no uso diário.', priority: 'CRITICAL', order: 1 },
  { modelName: 'PT-04 Pro 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Calibragem dos pneus', intervalKm: null, intervalMonths: 1, notes: 'Verificar semanalmente.', priority: 'MEDIUM', order: 2 },
  { modelName: 'PT-04 Pro 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Pastilha e disco de freio dianteiro — inspeção', intervalKm: null, intervalMonths: 1, notes: 'Modelo mais rápido da linha PT nessa configuração — troca preventiva com menos de 1,5-2mm.', priority: 'HIGH', order: 3 },
  { modelName: 'PT-04 Pro 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Verificação dos conectores de alta corrente', intervalKm: null, intervalMonths: 2, notes: 'Checar descoloração por calor nos plugues de potência.', priority: 'HIGH', order: 4 },
  { modelName: 'PT-04 Pro 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Lubrificação dos pontos de articulação da suspensão', intervalKm: null, intervalMonths: 6, notes: 'Graxa de lítio comum. Suspensão de curso maior.', priority: 'MEDIUM', order: 5 },
  { modelName: 'PT-04 Pro 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Inspeção de rodas (trincas, empenamento)', intervalKm: null, intervalMonths: 6, notes: 'Especialmente relevante se equipada com roda de liga leve.', priority: 'MEDIUM', order: 6 },
  { modelName: 'PT-04 Pro 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Diagnóstico de saúde da bateria de lítio', intervalKm: null, intervalMonths: 12, notes: 'Capacidade, ciclos e temperatura, em oficina especializada.', priority: 'MEDIUM', order: 7 },
  { modelName: 'PT-04 Pro 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Inspeção dos rolamentos do motor', intervalKm: null, intervalMonths: 12, notes: 'Verificar ruído e folga.', priority: 'LOW', order: 8 },

  // PT-04 Pro S 3000W
  { modelName: 'PT-04 Pro S 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Carga da bateria de lítio', intervalKm: null, intervalMonths: null, notes: 'Manter entre 20-90% no uso diário.', priority: 'CRITICAL', order: 1 },
  { modelName: 'PT-04 Pro S 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Calibragem dos pneus', intervalKm: null, intervalMonths: 1, notes: 'Verificar semanalmente.', priority: 'MEDIUM', order: 2 },
  { modelName: 'PT-04 Pro S 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Pastilhas de freio dianteira e traseira — inspeção', intervalKm: null, intervalMonths: 1, notes: 'Disco duplo: incluir a traseira na inspeção, não só a dianteira.', priority: 'HIGH', order: 3 },
  { modelName: 'PT-04 Pro S 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Lubrificação das duas pinças de freio a disco', intervalKm: null, intervalMonths: 3, notes: 'Dianteira e traseira. Graxa própria para alta temperatura.', priority: 'HIGH', order: 4 },
  { modelName: 'PT-04 Pro S 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Ajuste da pré-carga da suspensão conforme uso', intervalKm: null, intervalMonths: 6, notes: 'Aumentar pré-carga com garupa/carga, retornar ao padrão para uso solo.', priority: 'MEDIUM', order: 5 },
  { modelName: 'PT-04 Pro S 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Verificação da tampa da porta USB e conectores de potência', intervalKm: null, intervalMonths: 2, notes: 'Evitar entrada de umidade pela porta USB.', priority: 'MEDIUM', order: 6 },
  { modelName: 'PT-04 Pro S 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Diagnóstico de saúde da bateria de lítio', intervalKm: null, intervalMonths: 12, notes: 'Em oficina especializada.', priority: 'MEDIUM', order: 7 },
  { modelName: 'PT-04 Pro S 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Inspeção dos rolamentos do motor', intervalKm: null, intervalMonths: 12, notes: 'Verificar ruído e folga.', priority: 'LOW', order: 8 },

  // SE-1 2000W
  { modelName: 'SE-1 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Carga da bateria', intervalKm: null, intervalMonths: null, notes: 'Diária. Se chumbo-ácido: nunca descarregar por dias. Confirmar química na etiqueta.', priority: 'CRITICAL', order: 1 },
  { modelName: 'SE-1 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Calibragem dos pneus', intervalKm: null, intervalMonths: 1, notes: 'Roda pequena perde pressão mais rápido — verificar semanalmente.', priority: 'HIGH', order: 2 },
  { modelName: 'SE-1 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Inspeção dos freios e teste de frenagem', intervalKm: null, intervalMonths: 1, notes: 'Cabo/lona ou pastilha conforme configuração.', priority: 'HIGH', order: 3 },
  { modelName: 'SE-1 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Limpeza e graxa dielétrica dos terminais da bateria', intervalKm: null, intervalMonths: 2, notes: 'Previne oxidação.', priority: 'HIGH', order: 4 },
  { modelName: 'SE-1 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Lubrificação dos pontos de articulação da suspensão', intervalKm: null, intervalMonths: 4, notes: 'Suspensão de curso curto desgasta mais rápido.', priority: 'MEDIUM', order: 5 },
  { modelName: 'SE-1 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Inspeção de aro/pneu por dano de impacto', intervalKm: null, intervalMonths: 6, notes: 'Roda pequena é mais sensível a buracos profundos.', priority: 'MEDIUM', order: 6 },
  { modelName: 'SE-1 2000W (Elétrica)', yearFrom: 2022, yearTo: null, component: 'Inspeção dos rolamentos do motor hub', intervalKm: null, intervalMonths: 12, notes: 'Verificar ruído e folga.', priority: 'LOW', order: 7 },

  // SE-2 2300W
  { modelName: 'SE-2 2300W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Carga da bateria', intervalKm: null, intervalMonths: null, notes: 'Diária. Confirmar química (chumbo-ácido ou lítio) na etiqueta antes de definir rotina.', priority: 'CRITICAL', order: 1 },
  { modelName: 'SE-2 2300W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Calibragem dos pneus', intervalKm: null, intervalMonths: 1, notes: 'Verificar semanalmente.', priority: 'MEDIUM', order: 2 },
  { modelName: 'SE-2 2300W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Inspeção dos freios e teste de frenagem', intervalKm: null, intervalMonths: 1, notes: 'Conforme configuração da unidade.', priority: 'HIGH', order: 3 },
  { modelName: 'SE-2 2300W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Limpeza dos conectores elétricos', intervalKm: null, intervalMonths: 2, notes: 'Terminais da bateria e conexões de potência.', priority: 'HIGH', order: 4 },
  { modelName: 'SE-2 2300W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Verificação do aperto dos parafusos de fixação da roda motriz', intervalKm: null, intervalMonths: 3, notes: 'Motor mais potente sobre chassi compacto — vibração pode afrouxar fixação.', priority: 'HIGH', order: 5 },
  { modelName: 'SE-2 2300W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Inspeção dos rolamentos do motor', intervalKm: null, intervalMonths: 12, notes: 'Verificar ruído e folga.', priority: 'MEDIUM', order: 6 },
  { modelName: 'SE-2 2300W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Diagnóstico de saúde da bateria (se lítio)', intervalKm: null, intervalMonths: 12, notes: 'Em oficina especializada.', priority: 'MEDIUM', order: 7 },

  // SHE-S 3000W
  { modelName: 'SHE-S 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Carga da bateria de lítio', intervalKm: null, intervalMonths: null, notes: 'Manter entre 20-90% no uso diário. 100% reservado para dias de maior necessidade.', priority: 'CRITICAL', order: 1 },
  { modelName: 'SHE-S 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Calibragem dos pneus', intervalKm: null, intervalMonths: 1, notes: 'Verificar semanalmente.', priority: 'MEDIUM', order: 2 },
  { modelName: 'SHE-S 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Pastilhas de freio dianteira e traseira — inspeção', intervalKm: null, intervalMonths: 1, notes: 'Espessura mínima 1,5-2mm. Disco duplo.', priority: 'HIGH', order: 3 },
  { modelName: 'SHE-S 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Verificação dos conectores de alta corrente', intervalKm: null, intervalMonths: 2, notes: 'Maior capacidade de bateria da linha SE — checar descoloração por calor.', priority: 'HIGH', order: 4 },
  { modelName: 'SHE-S 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Lubrificação das duas pinças de freio a disco', intervalKm: null, intervalMonths: 3, notes: 'Graxa própria para alta temperatura.', priority: 'MEDIUM', order: 5 },
  { modelName: 'SHE-S 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Verificação de atualizações de firmware do app/painel', intervalKm: null, intervalMonths: 3, notes: 'Se equipada com conectividade.', priority: 'LOW', order: 6 },
  { modelName: 'SHE-S 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Diagnóstico completo de saúde da bateria', intervalKm: null, intervalMonths: 12, notes: 'Capacidade real, ciclos, temperatura — em oficina especializada.', priority: 'MEDIUM', order: 7 },
  { modelName: 'SHE-S 3000W (Elétrica)', yearFrom: 2023, yearTo: null, component: 'Inspeção dos rolamentos do motor', intervalKm: null, intervalMonths: 12, notes: 'Verificar ruído e folga.', priority: 'LOW', order: 8 },
]

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🛵 Seed Shineray Electric (PT-02/03/04, SE-1/2, SHE-S)...')

  const motoType = await prisma.vehicleType.findFirstOrThrow({ where: { slug: 'moto' } })
  const brand = await prisma.brand.upsert({
    where: { name_vehicleTypeId: { name: 'SHINERAY', vehicleTypeId: motoType.id } },
    update: {},
    create: { name: 'SHINERAY', vehicleTypeId: motoType.id },
  })
  console.log(`  ✅ Brand: ${brand.name}`)

  for (const block of BLOCKS) {
    await prisma.vehicleModel.upsert({
      where: { name_brandId: { name: block.modelName, brandId: brand.id } },
      update: {},
      create: { name: block.modelName, brandId: brand.id },
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
        yearFrom: null,
        yearTo: null,
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
    console.log(`  ✅ ${tp.modelName}: ${tp.frontPsi}/${tp.rearPsi} PSI`)
  }

  console.log('\n  🔧 Itens de manutenção...')
  const modelNames = [...new Set(MAINTENANCE_ITEMS.map(m => m.modelName))]
  for (const name of modelNames) {
    await prisma.maintenanceItem.deleteMany({ where: { modelName: name } })
  }
  await prisma.maintenanceItem.createMany({
    data: MAINTENANCE_ITEMS.map(item => ({
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
    const count = MAINTENANCE_ITEMS.filter(m => m.modelName === name).length
    console.log(`  ✅ ${name}: ${count} itens de manutenção`)
  }

  const totalTips = BLOCKS.reduce(
    (acc, b) => acc + b.MACETES.length + b.PROBLEMAS.length + b.MANUTENCAO.length,
    0,
  )
  console.log(
    `\n✅ Seed Shineray Electric concluído: ${BLOCKS.length} modelos, ${totalTips} dicas, ${TIRE_PRESSURES.length} calibragens, ${MAINTENANCE_ITEMS.length} itens de manutenção.`,
  )
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
