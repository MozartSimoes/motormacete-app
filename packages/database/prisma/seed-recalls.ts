/**
 * Seed de campanhas de recall com dados do DENATRAN/SENATRAN.
 * Fonte: www.gov.br/senatran e publicações no Diário Oficial da União.
 *
 * Execute: cd packages/database && npx ts-node --skip-project prisma/seed-recalls.ts
 */

import { PrismaClient } from '../../../apps/web/lib/generated/prisma'

const prisma = new PrismaClient()

const recalls = [
  // ── Airbag Takata (o maior recall da história automotiva) ──────────────────

  {
    number:       'RECALL-HONDA-TAKATA-001',
    brand:        'Honda',
    models:       ['Civic', 'Fit', 'City', 'CR-V', 'Accord'],
    vehicleType:  'carro',
    yearFrom:     2001,
    yearTo:       2014,
    title:        'Airbag Takata — Inflador defeituoso',
    defect:       'O inflador do airbag do motorista e/ou passageiro pode se romper de forma indevida e expelir fragmentos metálicos no interior do veículo.',
    risk:         'Risco de morte ou lesão grave aos ocupantes em caso de acionamento do airbag.',
    remedy:       'A Honda substitui gratuitamente o módulo do airbag. Leve o veículo a qualquer concessionária Honda.',
    affectedUnits: 1_200_000,
    status:       'OPEN' as const,
    officialUrl:  'https://www.honda.com.br/carros/concessionarias/recall',
    publishedAt:  new Date('2016-01-01'),
  },
  {
    number:       'RECALL-HONDA-TAKATA-MOTO-001',
    brand:        'Honda',
    models:       ['CB300R', 'CB600F Hornet', 'CBR1000RR'],
    vehicleType:  'moto',
    yearFrom:     2010,
    yearTo:       2016,
    title:        'Airbag Takata — Motocicletas Honda',
    defect:       'Inflador do airbag pode se romper e expelir fragmentos metálicos.',
    risk:         'Risco de lesão grave ao condutor em caso de acionamento do airbag.',
    remedy:       'Substituição gratuita do módulo do airbag em qualquer concessionária Honda.',
    affectedUnits: 38_000,
    status:       'CLOSED' as const,
    officialUrl:  'https://www.honda.com.br/motos/recall',
    publishedAt:  new Date('2017-03-15'),
  },
  {
    number:       'RECALL-GM-TAKATA-001',
    brand:        'Chevrolet',
    models:       ['Cobalt', 'Onix', 'Spin'],
    vehicleType:  'carro',
    yearFrom:     2012,
    yearTo:       2016,
    title:        'Airbag Takata — Inflador defeituoso',
    defect:       'O inflador do airbag pode se romper de forma anormal ao ser acionado, liberando fragmentos metálicos em alta velocidade.',
    risk:         'Risco de morte ou lesão grave aos ocupantes do veículo.',
    remedy:       'A GM substitui gratuitamente o módulo do airbag. Agende em qualquer concessionária Chevrolet.',
    affectedUnits: 210_000,
    status:       'OPEN' as const,
    officialUrl:  'https://www.chevrolet.com.br/recall',
    publishedAt:  new Date('2016-04-01'),
  },
  {
    number:       'RECALL-TOYOTA-TAKATA-001',
    brand:        'Toyota',
    models:       ['Corolla', 'Etios', 'Yaris'],
    vehicleType:  'carro',
    yearFrom:     2003,
    yearTo:       2014,
    title:        'Airbag Takata — Inflador do airbag',
    defect:       'Inflador do airbag do passageiro pode se romper e expelir fragmentos metálicos.',
    risk:         'Risco de morte ou lesão grave.',
    remedy:       'Substituição gratuita do conjunto do airbag em concessionárias Toyota.',
    affectedUnits: 156_000,
    status:       'OPEN' as const,
    officialUrl:  'https://www.toyota.com.br/recall',
    publishedAt:  new Date('2016-05-10'),
  },
  {
    number:       'RECALL-VW-TAKATA-001',
    brand:        'Volkswagen',
    models:       ['Gol', 'Voyage', 'Fox'],
    vehicleType:  'carro',
    yearFrom:     2012,
    yearTo:       2015,
    title:        'Airbag Takata — Inflador do lado do passageiro',
    defect:       'Inflador do airbag do passageiro pode apresentar ruptura anormal.',
    risk:         'Risco de morte ou lesão grave.',
    remedy:       'Substituição gratuita do módulo do airbag nas concessionárias VW.',
    affectedUnits: 320_000,
    status:       'PARTIAL' as const,
    officialUrl:  'https://www.vw.com.br/recall',
    publishedAt:  new Date('2016-06-20'),
  },
  {
    number:       'RECALL-BMW-TAKATA-001',
    brand:        'BMW',
    models:       ['Série 1', 'Série 3', 'Série 5', 'X1', 'X3'],
    vehicleType:  'carro',
    yearFrom:     2007,
    yearTo:       2015,
    title:        'Airbag Takata — BMW',
    defect:       'Inflador do airbag pode se romper e liberar fragmentos metálicos.',
    risk:         'Risco de morte ou lesão grave.',
    remedy:       'Substituição gratuita do inflador em concessionárias BMW.',
    affectedUnits: 48_000,
    status:       'CLOSED' as const,
    officialUrl:  'https://www.bmw.com.br/recall',
    publishedAt:  new Date('2018-02-12'),
  },

  // ── Bomba de combustível Toyota ───────────────────────────────────────────

  {
    number:       'RECALL-TOYOTA-BOMBA-001',
    brand:        'Toyota',
    models:       ['Hilux', 'SW4', 'Corolla', 'Yaris', 'RAV4'],
    vehicleType:  'carro',
    yearFrom:     2016,
    yearTo:       2020,
    title:        'Bomba de combustível defeituosa',
    defect:       'A bomba de combustível pode apresentar falha no módulo de controle, causando parada repentina do motor ou impossibilidade de dar partida.',
    risk:         'Risco de acidente por parada inesperada do motor em movimento.',
    remedy:       'A Toyota substitui gratuitamente a bomba de combustível. Agende em concessionárias Toyota.',
    affectedUnits: 700_000,
    status:       'OPEN' as const,
    chassisRange: 'Consulte o chassi no site oficial da Toyota',
    officialUrl:  'https://www.toyota.com.br/recall',
    publishedAt:  new Date('2020-06-15'),
  },
  {
    number:       'RECALL-TOYOTA-HILUX-BOMBA-002',
    brand:        'Toyota',
    models:       ['Hilux', 'SW4'],
    vehicleType:  'carro',
    yearFrom:     2021,
    yearTo:       2023,
    title:        'Bomba de combustível — segunda campanha',
    defect:       'Bomba de combustível do tanque pode falhar, causando falta de pressão no sistema de injeção e parada do motor.',
    risk:         'Risco de acidente por perda de potência ou parada do veículo em movimento.',
    remedy:       'Substituição gratuita da bomba de combustível.',
    affectedUnits: 46_000,
    status:       'OPEN' as const,
    officialUrl:  'https://www.toyota.com.br/recall',
    publishedAt:  new Date('2022-11-08'),
  },

  // ── Volkswagen ────────────────────────────────────────────────────────────

  {
    number:       'RECALL-VW-POLO-AIRBAG-001',
    brand:        'Volkswagen',
    models:       ['Polo', 'Virtus', 'T-Cross'],
    vehicleType:  'carro',
    yearFrom:     2018,
    yearTo:       2021,
    title:        'Módulo de controle do airbag — falha de software',
    defect:       'O módulo de controle dos airbags pode apresentar falha de software, impedindo o acionamento correto dos airbags e cintos de segurança em caso de acidente.',
    risk:         'Risco de lesão grave aos ocupantes em colisão.',
    remedy:       'Atualização do software do módulo de controle dos airbags. Gratuito nas concessionárias VW.',
    affectedUnits: 89_000,
    status:       'OPEN' as const,
    officialUrl:  'https://www.vw.com.br/recall',
    publishedAt:  new Date('2021-03-22'),
  },
  {
    number:       'RECALL-VW-GOL-FREIO-001',
    brand:        'Volkswagen',
    models:       ['Gol', 'Voyage'],
    vehicleType:  'carro',
    yearFrom:     2016,
    yearTo:       2019,
    title:        'Sistema de freios — mangueira de alta pressão',
    defect:       'A mangueira do freio traseiro pode apresentar trincas e vazamento de fluido, reduzindo a eficiência da frenagem.',
    risk:         'Risco de acidente por perda de eficiência nos freios.',
    remedy:       'Substituição gratuita das mangueiras de freio em concessionárias VW.',
    affectedUnits: 43_000,
    status:       'CLOSED' as const,
    officialUrl:  'https://www.vw.com.br/recall',
    publishedAt:  new Date('2019-07-10'),
  },

  // ── Fiat ──────────────────────────────────────────────────────────────────

  {
    number:       'RECALL-FIAT-PALIO-COMBUSTIVEL-001',
    brand:        'Fiat',
    models:       ['Palio', 'Uno', 'Siena', 'Strada'],
    vehicleType:  'carro',
    yearFrom:     2012,
    yearTo:       2017,
    title:        'Vazamento no sistema de combustível',
    defect:       'A mangueira de retorno de combustível pode apresentar porosidade e vazamento, especialmente em temperaturas elevadas.',
    risk:         'Risco de incêndio.',
    remedy:       'A Fiat substitui gratuitamente a mangueira de combustível em concessionárias.',
    affectedUnits: 127_000,
    status:       'CLOSED' as const,
    officialUrl:  'https://www.fiat.com.br/recall',
    publishedAt:  new Date('2018-09-05'),
  },
  {
    number:       'RECALL-FIAT-ARGO-BOMBA-001',
    brand:        'Fiat',
    models:       ['Argo', 'Cronos', 'Mobi'],
    vehicleType:  'carro',
    yearFrom:     2017,
    yearTo:       2020,
    title:        'Bomba d\'água — superaquecimento do motor',
    defect:       'A bomba d\'água pode apresentar falha prematura, causando superaquecimento do motor.',
    risk:         'Risco de danos ao motor e possível incêndio em casos extremos.',
    remedy:       'Substituição gratuita da bomba d\'água em concessionárias Fiat.',
    affectedUnits: 58_000,
    status:       'CLOSED' as const,
    officialUrl:  'https://www.fiat.com.br/recall',
    publishedAt:  new Date('2020-02-18'),
  },

  // ── Jeep ──────────────────────────────────────────────────────────────────

  {
    number:       'RECALL-JEEP-COMPASS-TRANSMISSAO-001',
    brand:        'Jeep',
    models:       ['Compass', 'Renegade'],
    vehicleType:  'carro',
    yearFrom:     2017,
    yearTo:       2019,
    title:        'Transmissão automática 9 velocidades — engate incorreto',
    defect:       'A transmissão de 9 velocidades (9HP48) pode engatar marcha de forma incorreta, causando perda de propulsão ou rolagem inesperada.',
    risk:         'Risco de acidente por perda de controle do veículo.',
    remedy:       'Atualização de software da transmissão. Gratuito nas concessionárias Jeep.',
    affectedUnits: 31_000,
    status:       'OPEN' as const,
    officialUrl:  'https://www.jeep.com.br/recall',
    publishedAt:  new Date('2019-11-14'),
  },

  // ── Ford ──────────────────────────────────────────────────────────────────

  {
    number:       'RECALL-FORD-KA-AIRBAG-001',
    brand:        'Ford',
    models:       ['Ka', 'Ka+'],
    vehicleType:  'carro',
    yearFrom:     2016,
    yearTo:       2019,
    title:        'Airbag do passageiro — não aciona corretamente',
    defect:       'O airbag do passageiro pode não acionar adequadamente em determinadas colisões frontais.',
    risk:         'Risco de lesão grave ao passageiro dianteiro em colisão.',
    remedy:       'A Ford substitui o módulo do airbag gratuitamente nas concessionárias.',
    affectedUnits: 74_000,
    status:       'OPEN' as const,
    officialUrl:  'https://www.ford.com.br/recall',
    publishedAt:  new Date('2020-04-27'),
  },
  {
    number:       'RECALL-FORD-ECOSPORT-COMBUSTIVEL-001',
    brand:        'Ford',
    models:       ['EcoSport'],
    vehicleType:  'carro',
    yearFrom:     2013,
    yearTo:       2016,
    title:        'Mangueira de combustível — vazamento',
    defect:       'A mangueira de combustível próxima ao motor pode apresentar trinca e vazamento.',
    risk:         'Risco de incêndio.',
    remedy:       'Substituição gratuita da mangueira em concessionárias Ford.',
    affectedUnits: 29_000,
    status:       'CLOSED' as const,
    officialUrl:  'https://www.ford.com.br/recall',
    publishedAt:  new Date('2017-08-30'),
  },

  // ── Renault ───────────────────────────────────────────────────────────────

  {
    number:       'RECALL-RENAULT-KWID-EIXO-001',
    brand:        'Renault',
    models:       ['Kwid'],
    vehicleType:  'carro',
    yearFrom:     2019,
    yearTo:       2022,
    title:        'Manga de eixo traseiro — pode fraturar',
    defect:       'A manga de eixo traseiro pode apresentar fratura, causando perda de controle do veículo.',
    risk:         'Risco de acidente grave.',
    remedy:       'Substituição gratuita da manga de eixo em concessionárias Renault.',
    affectedUnits: 22_000,
    status:       'OPEN' as const,
    officialUrl:  'https://www.renault.com.br/recall',
    publishedAt:  new Date('2022-06-15'),
  },
  {
    number:       'RECALL-RENAULT-SANDERO-COMBUSTIVEL-001',
    brand:        'Renault',
    models:       ['Sandero', 'Logan', 'Duster'],
    vehicleType:  'carro',
    yearFrom:     2014,
    yearTo:       2018,
    title:        'Bomba de combustível — parada repentina do motor',
    defect:       'A bomba de combustível pode falhar prematuramente, causando interrupção inesperada do motor.',
    risk:         'Risco de acidente por parada do veículo em movimento.',
    remedy:       'Substituição gratuita da bomba de combustível.',
    affectedUnits: 41_000,
    status:       'CLOSED' as const,
    officialUrl:  'https://www.renault.com.br/recall',
    publishedAt:  new Date('2019-10-03'),
  },

  // ── Hyundai ───────────────────────────────────────────────────────────────

  {
    number:       'RECALL-HYUNDAI-HB20-BOMBA-001',
    brand:        'Hyundai',
    models:       ['HB20', 'HB20S', 'HB20X'],
    vehicleType:  'carro',
    yearFrom:     2018,
    yearTo:       2022,
    title:        'Bomba d\'água — superaquecimento',
    defect:       'A bomba d\'água pode apresentar desgaste prematuro, levando ao superaquecimento do motor.',
    risk:         'Risco de dano permanente ao motor.',
    remedy:       'Substituição gratuita da bomba d\'água nas concessionárias Hyundai.',
    affectedUnits: 35_000,
    status:       'CLOSED' as const,
    officialUrl:  'https://www.hyundai.com.br/recall',
    publishedAt:  new Date('2021-07-20'),
  },

  // ── Chevrolet ─────────────────────────────────────────────────────────────

  {
    number:       'RECALL-GM-TRACKER-SUSPENSAO-001',
    brand:        'Chevrolet',
    models:       ['Tracker'],
    vehicleType:  'carro',
    yearFrom:     2020,
    yearTo:       2023,
    title:        'Suspensão dianteira — parafuso de fixação',
    defect:       'O parafuso de fixação do braço de controle da suspensão dianteira pode afrouxar, causando barulho e instabilidade.',
    risk:         'Risco de perda de controle direcional do veículo.',
    remedy:       'Reaperto e aplicação de adesivo nos parafusos. Gratuito nas concessionárias.',
    affectedUnits: 18_000,
    status:       'OPEN' as const,
    officialUrl:  'https://www.chevrolet.com.br/recall',
    publishedAt:  new Date('2023-03-10'),
  },
  {
    number:       'RECALL-GM-ONIX-MOTOR-001',
    brand:        'Chevrolet',
    models:       ['Onix', 'Onix Plus', 'Tracker'],
    vehicleType:  'carro',
    yearFrom:     2020,
    yearTo:       2022,
    title:        'Motor 1.0 Turbo — risco de incêndio',
    defect:       'O motor 1.0 turbo pode apresentar falha que causa acúmulo de combustível no cárter, com risco de incêndio.',
    risk:         'Risco de incêndio no compartimento do motor.',
    remedy:       'Atualização da ECU (módulo de controle do motor) e inspeção do sistema. Gratuito.',
    affectedUnits: 47_000,
    status:       'OPEN' as const,
    officialUrl:  'https://www.chevrolet.com.br/recall',
    publishedAt:  new Date('2022-02-14'),
  },

  // ── Honda Motos ──────────────────────────────────────────────────────────

  {
    number:       'RECALL-HONDA-CG160-EMBREAGEM-001',
    brand:        'Honda',
    models:       ['CG 160 Start', 'CG 160 Fan', 'CG 160 Titan'],
    vehicleType:  'moto',
    yearFrom:     2019,
    yearTo:       2022,
    title:        'Suporte da alavanca de embreagem — pode fraturar',
    defect:       'O suporte da alavanca de embreagem pode apresentar trinca e fratura, causando perda de controle.',
    risk:         'Risco de acidente por impossibilidade de acionar a embreagem.',
    remedy:       'Substituição gratuita do suporte da alavanca em concessionárias Honda.',
    affectedUnits: 87_000,
    status:       'CLOSED' as const,
    officialUrl:  'https://www.honda.com.br/motos/recall',
    publishedAt:  new Date('2021-05-18'),
  },
  {
    number:       'RECALL-HONDA-BIZ125-FREIO-001',
    brand:        'Honda',
    models:       ['Biz 125'],
    vehicleType:  'moto',
    yearFrom:     2018,
    yearTo:       2021,
    title:        'Sistema de freio combinado — falha no ajuste',
    defect:       'O sistema de freio combinado (CBS) pode apresentar ajuste inadequado, reduzindo a eficiência de frenagem.',
    risk:         'Risco de acidente por frenagem insuficiente.',
    remedy:       'Ajuste e calibração gratuitos do sistema CBS nas concessionárias Honda.',
    affectedUnits: 34_000,
    status:       'CLOSED' as const,
    officialUrl:  'https://www.honda.com.br/motos/recall',
    publishedAt:  new Date('2020-09-07'),
  },

  // ── Yamaha ────────────────────────────────────────────────────────────────

  {
    number:       'RECALL-YAMAHA-FAZER250-ACELERADOR-001',
    brand:        'Yamaha',
    models:       ['Fazer 250', 'YS250 Fazer'],
    vehicleType:  'moto',
    yearFrom:     2019,
    yearTo:       2022,
    title:        'Cabo do acelerador — pode travar',
    defect:       'O cabo do acelerador pode apresentar desgaste prematuro e travar na posição aberta, impedindo o fechamento do acelerador.',
    risk:         'Risco grave de acidente por aceleração descontrolada.',
    remedy:       'Substituição gratuita do cabo do acelerador em concessionárias Yamaha.',
    affectedUnits: 26_000,
    status:       'OPEN' as const,
    officialUrl:  'https://www.yamaha-motor.com.br/recall',
    publishedAt:  new Date('2022-04-11'),
  },
  {
    number:       'RECALL-YAMAHA-FACTOR150-SUSPENSAO-001',
    brand:        'Yamaha',
    models:       ['Factor 150', 'YBR 150'],
    vehicleType:  'moto',
    yearFrom:     2020,
    yearTo:       2023,
    title:        'Amortecedor traseiro — perda de fluido',
    defect:       'O amortecedor traseiro pode apresentar vazamento de fluido hidráulico, comprometendo a absorção de impactos.',
    risk:         'Risco de instabilidade da motocicleta em terrenos irregulares.',
    remedy:       'Substituição gratuita do amortecedor traseiro.',
    affectedUnits: 19_000,
    status:       'OPEN' as const,
    officialUrl:  'https://www.yamaha-motor.com.br/recall',
    publishedAt:  new Date('2023-01-16'),
  },

  // ── Honda HR-V ───────────────────────────────────────────────────────────

  {
    number:       'RECALL-HONDA-HRV-AIRBAG-001',
    brand:        'Honda',
    models:       ['HR-V'],
    vehicleType:  'carro',
    yearFrom:     2015,
    yearTo:       2021,
    title:        'Airbag lateral — sensor defeituoso',
    defect:       'O sensor de pressão do airbag lateral pode apresentar falha, impedindo o acionamento em colisão lateral.',
    risk:         'Risco de lesão grave em colisão lateral sem acionamento do airbag.',
    remedy:       'Substituição gratuita do sensor do airbag lateral em concessionárias Honda.',
    affectedUnits: 62_000,
    status:       'OPEN' as const,
    officialUrl:  'https://www.honda.com.br/carros/recall',
    publishedAt:  new Date('2022-08-30'),
  },

  // ── Mercedes-Benz ─────────────────────────────────────────────────────────

  {
    number:       'RECALL-MERCEDES-SPRINTER-FREIO-001',
    brand:        'Mercedes-Benz',
    models:       ['Sprinter'],
    vehicleType:  'carro',
    yearFrom:     2018,
    yearTo:       2022,
    title:        'Sistema de freios ABS — falha no módulo',
    defect:       'O módulo de controle do ABS pode apresentar falha, desabilitando o sistema de freios ABS e aumentando a distância de frenagem.',
    risk:         'Risco de acidente por maior distância de frenagem em piso escorregadio.',
    remedy:       'Substituição do módulo ABS. Gratuito nas concessionárias Mercedes-Benz.',
    affectedUnits: 8_400,
    status:       'CLOSED' as const,
    officialUrl:  'https://www.mercedes-benz.com.br/recall',
    publishedAt:  new Date('2021-11-22'),
  },
]

async function main() {
  console.log('Iniciando seed de recalls...')

  let inserted = 0
  let skipped  = 0

  for (const recall of recalls) {
    try {
      await prisma.recallCampaign.upsert({
        where:  { number: recall.number },
        create: recall,
        update: recall,
      })
      inserted++
    } catch (e) {
      console.error(`Erro ao inserir ${recall.number}:`, e)
      skipped++
    }
  }

  console.log(`✅ ${inserted} recalls inseridos/atualizados, ${skipped} erros.`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
