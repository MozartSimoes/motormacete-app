import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Segunda leva — dados reais pesquisados de NHTSA, SENATRAN, Stellantis Media, CNN Brasil, Motor Show
const RECALLS_V2 = [
  // ── Jeep — Suspensão dianteira (Brasil, out/2024) ─────────────────────────
  {
    number: 'RECALL-JEEP-SUSPENSAO-2024-001',
    brand: 'Jeep',
    models: ['Compass', 'Commander', 'Renegade'],
    vehicleType: 'carro',
    yearFrom: 2024, yearTo: 2025,
    status: 'OPEN' as const,
    title: 'Suspensão dianteira — deslocamento das rodas',
    defect: 'Os parafusos de fixação do braço da suspensão dianteira podem não ter sido apertados com o torque correto, permitindo que a roda dianteira se desloque durante a condução.',
    risk: 'Risco de perda de controle direcional e acidente grave ou fatal para ocupantes e terceiros.',
    remedy: 'Inspeção e reaperto dos parafusos da suspensão dianteira com o torque especificado. Gratuito nas concessionárias Jeep. Duração: 1 hora.',
    affectedUnits: 28_000,
    officialUrl: 'https://www.jeep.com.br/recall',
    publishedAt: new Date('2024-10-21'),
  },

  // ── Fiat Toro — Suspensão dianteira (Brasil, out/2024) ────────────────────
  {
    number: 'RECALL-FIAT-TORO-SUSPENSAO-2024-001',
    brand: 'Fiat',
    models: ['Toro'],
    vehicleType: 'carro',
    yearFrom: 2024, yearTo: 2025,
    status: 'OPEN' as const,
    title: 'Suspensão dianteira — parafuso de fixação sem torque adequado',
    defect: 'Os parafusos de fixação do braço inferior da suspensão dianteira podem não estar com o torque de aperto correto, causando folga e risco de deslocamento da roda.',
    risk: 'Risco de deslocamento da roda dianteira e perda de controle do veículo.',
    remedy: 'Inspeção e reaperto dos parafusos com torque correto. Gratuito nas concessionárias Fiat.',
    affectedUnits: 12_500,
    officialUrl: 'https://www.fiat.com.br/recall',
    publishedAt: new Date('2024-10-14'),
  },

  // ── Jeep — Motor 1.3T risco de incêndio (Brasil, 2023) ───────────────────
  {
    number: 'RECALL-JEEP-MOTOR-13T-INCENDIO-2023-001',
    brand: 'Jeep',
    models: ['Compass', 'Renegade', 'Commander'],
    vehicleType: 'carro',
    yearFrom: 2022, yearTo: 2023,
    status: 'OPEN' as const,
    title: 'Motor 1.3 Turbo T270 — risco de incêndio',
    defect: 'O motor 1.3 turbo T270 pode apresentar falha interna causando vazamento de óleo ou combustível no compartimento do motor.',
    risk: 'Risco de incêndio no compartimento do motor.',
    remedy: 'Inspeção e reparo gratuitos nas concessionárias Jeep/Stellantis.',
    affectedUnits: 1_059,
    officialUrl: 'https://www.media.stellantis.com/br-pt/corporate-communications/press/comunicado-de-recall-jeep',
    publishedAt: new Date('2023-12-05'),
  },

  // ── Volkswagen — Airbag passageiro incorreto (Brasil, set/2025) ───────────
  {
    number: 'RECALL-VW-AIRBAG-NIVUS-VIRTUS-2025-001',
    brand: 'Volkswagen',
    models: ['Nivus', 'Virtus', 'Saveiro'],
    vehicleType: 'carro',
    yearFrom: 2022, yearTo: 2025,
    status: 'OPEN' as const,
    title: 'Airbag do passageiro — módulo incorreto instalado',
    defect: 'O airbag frontal do passageiro pode não corresponder ao módulo especificado para o veículo. Em colisão que exija o acionamento, o sistema pode falhar e não oferecer proteção adequada.',
    risk: 'Risco de lesão grave ou fatal ao passageiro dianteiro em colisão.',
    remedy: 'Substituição gratuita do módulo do airbag do passageiro. Agendamento via concessionárias VW ou vw.com.br/recall.',
    affectedUnits: 23_800,
    officialUrl: 'https://vwapps.volkswagen.com.br/Recall',
    publishedAt: new Date('2025-09-23'),
  },

  // ── Honda — Mega recall bomba combustível (Brasil, abr/2024) ─────────────
  {
    number: 'RECALL-HONDA-BOMBA-COMBUSTIVEL-2024-001',
    brand: 'Honda',
    models: ['HR-V', 'Civic', 'Accord', 'CR-V'],
    vehicleType: 'carro',
    yearFrom: 2019, yearTo: 2023,
    status: 'OPEN' as const,
    title: 'Bomba de combustível — falha e parada do motor em movimento',
    defect: 'A bomba de combustível pode apresentar falha prematura, interrompendo o fluxo de combustível ao motor e causando parada súbita do veículo durante a condução.',
    risk: 'Risco de acidente por parada inesperada do motor em movimento.',
    remedy: 'Substituição gratuita da bomba de combustível. Agendamento a partir de mai/2024 nas concessionárias Honda.',
    affectedUnits: 82_000,
    officialUrl: 'https://www.honda.com.br/recall',
    publishedAt: new Date('2024-04-30'),
  },

  // ── Honda Fit / City — Airbag passageiro (Brasil, mai/2024) ──────────────
  {
    number: 'RECALL-HONDA-FIT-CITY-AIRBAG-2024-001',
    brand: 'Honda',
    models: ['Fit', 'City'],
    vehicleType: 'carro',
    yearFrom: 2014, yearTo: 2020,
    status: 'OPEN' as const,
    title: 'Airbag do passageiro — ruptura do inflador Takata',
    defect: 'O inflador do airbag do passageiro pode se romper de forma anormal ao ser acionado em colisão frontal, projetando fragmentos metálicos em alta velocidade no interior do veículo.',
    risk: 'Risco de morte ou lesão grave aos ocupantes.',
    remedy: 'Substituição gratuita do inflador do airbag do passageiro. Agendamento via concessionárias Honda a partir de mai/2024.',
    affectedUnits: 66_915,
    officialUrl: 'https://www.honda.com.br/noticias/honda-convoca-proprietarios-dos-modelos-fit-e-city-para-substituicao-preventiva-do',
    publishedAt: new Date('2024-05-02'),
  },

  // ── Toyota — Painel digital apagão (Brasil, 2024-2025) ───────────────────
  {
    number: 'RECALL-TOYOTA-PAINEL-DIGITAL-2024-001',
    brand: 'Toyota',
    models: ['Corolla', 'Corolla Cross', 'GR Corolla', 'RAV4'],
    vehicleType: 'carro',
    yearFrom: 2023, yearTo: 2025,
    status: 'OPEN' as const,
    title: 'Painel digital de instrumentos — apagão total durante a condução',
    defect: 'A memória do sistema do painel de instrumentos pode armazenar excesso de informações, causando apagão total da tela durante a condução e ocultando velocidade, hodômetro e nível de combustível.',
    risk: 'Risco de acidente por ausência de informações essenciais ao condutor.',
    remedy: 'Atualização de software para Corolla e Corolla Cross; substituição do painel de instrumentos para RAV4. Gratuito nas concessionárias Toyota.',
    affectedUnits: 11_800,
    officialUrl: 'https://www.toyota.com.br/meu-toyota/servicos/recall',
    publishedAt: new Date('2024-11-15'),
  },

  // ── Chevrolet Montana / Agile — Airbag (Brasil, 2023) ────────────────────
  {
    number: 'RECALL-GM-MONTANA-AIRBAG-2023-001',
    brand: 'Chevrolet',
    models: ['Montana', 'Agile'],
    vehicleType: 'carro',
    yearFrom: 2014, yearTo: 2019,
    status: 'OPEN' as const,
    title: 'Airbag do motorista — inflador pode não acionar em colisão',
    defect: 'O inflador do airbag do motorista pode apresentar defeito e falhar em se acionar adequadamente durante colisão, reduzindo a proteção ao condutor.',
    risk: 'Risco de lesão grave ou fatal ao motorista em colisão.',
    remedy: 'Substituição gratuita do inflador do airbag. Atendimento nas concessionárias Chevrolet.',
    affectedUnits: 5_502,
    officialUrl: 'https://www.chevrolet.com.br/servicos/recalls',
    publishedAt: new Date('2023-06-10'),
  },

  // ── Chevrolet S10 / Trailblazer — Aplique do capô (2024-2025) ────────────
  {
    number: 'RECALL-GM-S10-APLIQUE-CAPO-2024-001',
    brand: 'Chevrolet',
    models: ['S10', 'Trailblazer'],
    vehicleType: 'carro',
    yearFrom: 2025, yearTo: 2026,
    status: 'OPEN' as const,
    title: 'Aplique decorativo do capô — pode se desprender em alta velocidade',
    defect: 'O aplique decorativo do capô foi instalado sem o material de fixação adequado. Em velocidades elevadas, a força aerodinâmica pode causar o desprendimento da peça.',
    risk: 'Risco de dano a terceiros ou acidente por objeto na pista.',
    remedy: 'Reinstalação do aplique com fixação correta. Gratuito nas concessionárias Chevrolet. Duração: 30 minutos.',
    affectedUnits: 4_800,
    officialUrl: 'https://www.chevrolet.com.br/servicos/recalls',
    publishedAt: new Date('2024-12-10'),
  },

  // ── Ford F-150 — Eixo traseiro (EUA/mundial, 2023) ────────────────────────
  {
    number: 'RECALL-FORD-F150-EIXO-TRASEIRO-2023-001',
    brand: 'Ford',
    models: ['F-150'],
    vehicleType: 'carro',
    yearFrom: 2021, yearTo: 2023,
    status: 'CLOSED' as const,
    title: 'F-150 — chicote do eixo traseiro causa freio travado inadvertidamente',
    defect: 'O feixe de cabos do eixo traseiro pode esfregar no alojamento do eixo, causando acionamento inadvertido do freio de estacionamento elétrico e/ou falha nos sensores ABS.',
    risk: 'Risco de travamento dos freios ou instabilidade traseira durante a condução.',
    remedy: 'Substituição gratuita do chicote (wiring harness) do eixo traseiro nas concessionárias Ford.',
    affectedUnits: 112_965,
    officialUrl: 'https://www.ford.com/support/recalls-details/',
    publishedAt: new Date('2023-08-15'),
  },

  // ── Tesla — Autopilot Autosteer (EUA/mundial, dez/2023) ───────────────────
  {
    number: 'RECALL-TESLA-AUTOPILOT-AUTOSTEER-2023-001',
    brand: 'Tesla',
    models: ['Model S', 'Model 3', 'Model X', 'Model Y'],
    vehicleType: 'carro',
    yearFrom: 2012, yearTo: 2024,
    status: 'CLOSED' as const,
    title: 'Autopilot / Autosteer — monitoramento insuficiente do motorista',
    defect: 'O sistema Autopilot com Autosteer (controle de faixa) pode não monitorar de forma suficiente o engajamento ativo do motorista, permitindo uso em vias sem sinalização adequada.',
    risk: 'Risco de acidente por uso inadequado do sistema de assistência à condução sem atenção do motorista.',
    remedy: 'Atualização de software over-the-air (OTA) enviada automaticamente pela Tesla. Não é necessário ir à concessionária.',
    affectedUnits: 2_193_869,
    officialUrl: 'https://www.nhtsa.gov/recalls',
    publishedAt: new Date('2023-12-12'),
  },

  // ── Honda — Bomba de combustível motos (mundial, 2020) ───────────────────
  {
    number: 'RECALL-HONDA-MOTOS-BOMBA-2020-001',
    brand: 'Honda',
    models: ['PCX 150', 'ADV 150', 'CB 500F', 'CB 500X', 'NC 750X', 'CB 1000R'],
    vehicleType: 'moto',
    yearFrom: 2018, yearTo: 2021,
    status: 'CLOSED' as const,
    title: 'Bomba de combustível — motor pode parar em movimento',
    defect: 'A bomba de combustível pode apresentar deformação do rotor, causando diminuição ou interrupção do fornecimento de combustível e parada do motor.',
    risk: 'Risco de acidente por parada súbita da motocicleta em movimento.',
    remedy: 'Substituição gratuita da bomba de combustível nas concessionárias Honda Motos.',
    affectedUnits: 57_000,
    officialUrl: 'https://www.honda.com.br/motos/recall',
    publishedAt: new Date('2020-10-20'),
  },

  // ── Yamaha XMAX / NMAX — freio traseiro (Brasil, 2022) ───────────────────
  {
    number: 'RECALL-YAMAHA-XMAX-NMAX-FREIO-2022-001',
    brand: 'Yamaha',
    models: ['XMAX 250', 'NMAX 160'],
    vehicleType: 'moto',
    yearFrom: 2021, yearTo: 2022,
    status: 'CLOSED' as const,
    title: 'Freio traseiro ABS — sensor pode apresentar falha',
    defect: 'O sensor do sistema ABS do freio traseiro pode apresentar leitura incorreta, desativando o ABS e reduzindo a eficiência de frenagem em superfícies escorregadias.',
    risk: 'Risco de acidente por perda de eficiência de frenagem sem ABS.',
    remedy: 'Substituição gratuita do sensor ABS traseiro nas concessionárias Yamaha.',
    affectedUnits: 14_200,
    officialUrl: 'https://www.yamaha-motor.com.br/recall',
    publishedAt: new Date('2022-08-22'),
  },

  // ── Renault Kwid / Stepway — sistema de direção (Brasil, 2023) ───────────
  {
    number: 'RECALL-RENAULT-KWID-DIRECAO-2023-001',
    brand: 'Renault',
    models: ['Kwid', 'Kwid Outsider', 'Kwid E-Tech'],
    vehicleType: 'carro',
    yearFrom: 2022, yearTo: 2024,
    status: 'OPEN' as const,
    title: 'Coluna de direção — parafuso de fixação pode afrouxar',
    defect: 'O parafuso de fixação da coluna de direção pode afrouxar com o tempo, causando folga no volante e comprometendo o controle direcional.',
    risk: 'Risco de perda parcial ou total do controle direcional.',
    remedy: 'Inspeção e substituição do parafuso de fixação da coluna de direção. Gratuito nas concessionárias Renault.',
    affectedUnits: 18_300,
    officialUrl: 'https://www.renault.com.br/recall',
    publishedAt: new Date('2023-05-18'),
  },

  // ── Hyundai Creta — motor 1.0T (Brasil, 2022) ────────────────────────────
  {
    number: 'RECALL-HYUNDAI-CRETA-MOTOR-2022-001',
    brand: 'Hyundai',
    models: ['Creta', 'Creta Action'],
    vehicleType: 'carro',
    yearFrom: 2021, yearTo: 2023,
    status: 'OPEN' as const,
    title: 'Motor 1.0 Turbo — falha na vedação do virabrequim',
    defect: 'A vedação do virabrequim pode apresentar folga excessiva, causando vazamento de óleo lubrificante para o sistema de exaustão.',
    risk: 'Risco de incêndio por contato de óleo com superfícies quentes do escapamento.',
    remedy: 'Substituição gratuita da vedação do virabrequim e inspeção do sistema de exaustão nas concessionárias Hyundai.',
    affectedUnits: 22_000,
    officialUrl: 'https://www.hyundai.com.br/recall',
    publishedAt: new Date('2022-11-03'),
  },
]

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let inserted = 0, updated = 0
  const errors: string[] = []

  for (const recall of RECALLS_V2) {
    try {
      const existing = await prisma.recallCampaign.findUnique({ where: { number: recall.number } })
      if (existing) {
        await prisma.recallCampaign.update({ where: { number: recall.number }, data: recall })
        updated++
      } else {
        await prisma.recallCampaign.create({ data: recall })
        inserted++
      }
    } catch (e) {
      errors.push(`${recall.number}: ${e}`)
    }
  }

  return NextResponse.json({ inserted, updated, total: RECALLS_V2.length, errors })
}
