/**
 * Seed tire pressure data into the database.
 * Run: pnpm --filter @motormacete/database exec tsx ../../apps/web/scripts/seed-tire-pressure.ts
 */
import { PrismaClient } from '../lib/generated/prisma/index.js'

const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL })

interface Item {
  tireSize: string
  frontPsi: number
  rearPsi: number
  frontPsiLoad?: number
  rearPsiLoad?: number
  sparePsi?: number
  notes?: string
}

// ─── Genérico (fallback) ──────────────────────────────────────────────────────
const generic: Item = {
  tireSize: 'Consulte a etiqueta na porta do motorista',
  frontPsi: 30,
  rearPsi: 32,
  frontPsiLoad: 33,
  rearPsiLoad: 36,
  sparePsi: 60,
  notes: 'Valores genéricos. Consulte a etiqueta na soleira da porta do motorista ou o manual do proprietário para os valores exatos do seu veículo.',
}

// ─── Específicos por modelo ───────────────────────────────────────────────────
const specific: Record<string, Item[]> = {

  // ── CARROS POPULARES ─────────────────────────────────────────────────────────

  // VW Gol (1997–2023)
  Gol: [
    { tireSize: '175/70 R13', frontPsi: 30, rearPsi: 30, frontPsiLoad: 33, rearPsiLoad: 36, sparePsi: 60, notes: 'Motores 1.0. Versões 1.6 podem usar 185/70 R14 — verifique a etiqueta na porta.' },
    { tireSize: '185/70 R14', frontPsi: 30, rearPsi: 30, frontPsiLoad: 33, rearPsiLoad: 36, sparePsi: 60, notes: 'Motores 1.6 MSI e versões City/Trend 2013+.' },
  ],

  // VW Polo / Virtus (1.0 TSI 2018+)
  Polo: [
    { tireSize: '195/65 R15', frontPsi: 32, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 38, sparePsi: 60, notes: 'Polo e Virtus versões base e Comfortline.' },
    { tireSize: '205/55 R16', frontPsi: 32, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 38, sparePsi: 60, notes: 'Polo e Virtus versões Highline/GTS.' },
  ],

  // Chevy Onix / Onix Plus (2020+)
  Onix: [
    { tireSize: '185/65 R15', frontPsi: 30, rearPsi: 30, frontPsiLoad: 33, rearPsiLoad: 36, sparePsi: 60, notes: 'Onix hatch e Onix Plus sedã. Válvula do estepe no porta-malas — calibre a 60 PSI.' },
  ],

  // Fiat Argo / Cronos (2017+)
  Argo: [
    { tireSize: '185/65 R15', frontPsi: 30, rearPsi: 30, frontPsiLoad: 33, rearPsiLoad: 36, sparePsi: 60, notes: 'Argo 1.0 e 1.3 Drive/Precision. Verifique a etiqueta na soleira da porta do motorista.' },
    { tireSize: '195/55 R16', frontPsi: 32, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 38, sparePsi: 60, notes: 'Argo HGT e versões Toro/top de linha.' },
  ],

  // Ford Ka / EcoSport (Dragon 1.0 / 1.5)
  Ka: [
    { tireSize: '175/65 R14', frontPsi: 30, rearPsi: 32, frontPsiLoad: 33, rearPsiLoad: 36, sparePsi: 60, notes: 'Ka hatch 1.0 e 1.5. Estepe step-size compacto: calibre a 60 PSI.' },
    { tireSize: '195/50 R16', frontPsi: 32, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 36, sparePsi: 60, notes: 'EcoSport Freestyle e FreeStyle 2.0. Estepe sobressalente externo: 60 PSI.' },
  ],

  // Honda Civic (1.5 Turbo 2017+)
  Civic: [
    { tireSize: '215/50 R17', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 38, sparePsi: 60, notes: 'Civic 10ª e 11ª geração. Pneu run-flat opcional — se equipado, não calibre acima de 35 PSI a frio.' },
  ],

  // Jeep Renegade (1.3 Turbo 2020+)
  Renegade: [
    { tireSize: '215/60 R17', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 38, sparePsi: 60, notes: 'Renegade Sport e Longitude. Estepe reserva interno: calibre a 60 PSI.' },
    { tireSize: '215/55 R18', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 38, sparePsi: 60, notes: 'Renegade Limited e Trailhawk 2020+.' },
  ],

  // Jeep Compass (2017+)
  Compass: [
    { tireSize: '215/60 R17', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 38, sparePsi: 60, notes: 'Compass Sport e Longitude.' },
    { tireSize: '225/55 R18', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 38, sparePsi: 60, notes: 'Compass Limited, Trailhawk e S.' },
  ],

  // Chevrolet Tracker (1.0 Turbo 2020+)
  Tracker: [
    { tireSize: '215/55 R17', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 38, sparePsi: 60, notes: 'Tracker LT e Premier 2020+. Sistema TPMS de série — alarme acende abaixo de 26 PSI.' },
  ],

  // VW T-Cross (1.0 TSI 2019+)
  'T-Cross': [
    { tireSize: '195/60 R16', frontPsi: 32, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 38, sparePsi: 60, notes: 'T-Cross Comfortline.' },
    { tireSize: '205/55 R17', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 38, sparePsi: 60, notes: 'T-Cross Highline e Sense.' },
  ],

  // Fiat Toro (2.0 Diesel / 1.3 Turbo)
  Toro: [
    { tireSize: '215/60 R17', frontPsi: 33, rearPsi: 35, frontPsiLoad: 36, rearPsiLoad: 42, sparePsi: 60, notes: 'Toro Freedom, Volcano e Ultra. Traseiro com carga plena: 42 PSI. Versão diesel: traseiro pode requerer mais em uso de trabalho.' },
  ],

  // VW Amarok (2.0 TDI / V6)
  Amarok: [
    { tireSize: '255/60 R18', frontPsi: 36, rearPsi: 38, frontPsiLoad: 40, rearPsiLoad: 51, sparePsi: 60, notes: 'Amarok Highline e Extreme 2011–2022. Traseiro com carga máxima: 51 PSI. Verifique etiqueta na porta — valores variam entre versões.' },
    { tireSize: '245/75 R16', frontPsi: 33, rearPsi: 36, frontPsiLoad: 38, rearPsiLoad: 51, sparePsi: 60, notes: 'Amarok Trendline com pneu misto. Traseiro com carga: 51 PSI.' },
  ],

  // Ford Ranger (2.2 / 3.2 Diesel)
  Ranger: [
    { tireSize: '265/65 R17', frontPsi: 36, rearPsi: 40, frontPsiLoad: 38, rearPsiLoad: 55, sparePsi: 60, notes: 'Ranger XL, XLS, XLT e Limited. Traseiro com carga total: 55 PSI. Estepe externo na caçamba: 60 PSI.' },
  ],

  // Hyundai HB20 (2012+)
  HB20: [
    { tireSize: '185/65 R15', frontPsi: 30, rearPsi: 30, frontPsiLoad: 33, rearPsiLoad: 36, sparePsi: 60, notes: 'HB20 hatch 1.0 e 1.6. Etiqueta na soleira da porta do motorista.' },
    { tireSize: '195/50 R16', frontPsi: 32, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 38, sparePsi: 60, notes: 'HB20 Sport e versões topo. HB20S sedã: 185/65 R15 com 30/30 PSI.' },
  ],

  // Hyundai Creta (2016+)
  Creta: [
    { tireSize: '205/65 R16', frontPsi: 32, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 38, sparePsi: 60, notes: 'Creta Attitude e Smart 2017–2021.' },
    { tireSize: '215/60 R17', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 38, sparePsi: 60, notes: 'Creta Limited e Action 2022+. TPMS de série nas versões Limited.' },
  ],

  // Toyota Corolla (2.0 / 1.8 Hybrid 2019+)
  Corolla: [
    { tireSize: '205/55 R17', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 38, sparePsi: 60, notes: 'Corolla GLi, XLi, XEi e Altis 2019+. TPMS de série — alarme abaixo de 26 PSI.' },
  ],

  // Toyota Hilux (2.8 Diesel 2016+)
  Hilux: [
    { tireSize: '265/65 R17', frontPsi: 36, rearPsi: 40, frontPsiLoad: 40, rearPsiLoad: 55, sparePsi: 60, notes: 'Hilux SR, SRV e SRX diesel. Traseiro com carga total: 55 PSI. Estepe sobressalente externo: 60 PSI.' },
  ],

  // Toyota SW4 (2.8 Diesel)
  SW4: [
    { tireSize: '265/65 R17', frontPsi: 33, rearPsi: 36, frontPsiLoad: 36, rearPsiLoad: 42, sparePsi: 60, notes: 'SW4 SR e SRX 5 e 7 lugares. SUV — pressão menor que a Hilux apesar do mesmo pneu.' },
  ],

  // Toyota Yaris (1.5 2018+)
  Yaris: [
    { tireSize: '195/50 R16', frontPsi: 30, rearPsi: 30, frontPsiLoad: 33, rearPsiLoad: 36, sparePsi: 60, notes: 'Yaris hatch e sedã XL, XS e XLS.' },
  ],

  // Chevrolet S10 (2.8 Duramax)
  S10: [
    { tireSize: '265/65 R17', frontPsi: 36, rearPsi: 40, frontPsiLoad: 40, rearPsiLoad: 55, sparePsi: 60, notes: 'S10 LT e High Country diesel. Traseiro com carga total: 55 PSI. Estepe externo sob a caçamba: 60 PSI.' },
  ],

  // VW Saveiro (1.6 MSI)
  Saveiro: [
    { tireSize: '185/70 R14', frontPsi: 34, rearPsi: 38, frontPsiLoad: 36, rearPsiLoad: 51, sparePsi: 60, notes: 'Saveiro CS e CD. Traseiro com carga máxima na caçamba: 51 PSI. Veículo comercial — traseiro suporta mais carga que carros de passeio.' },
  ],

  // VW Up! (1.0 TSI)
  Up: [
    { tireSize: '175/65 R14', frontPsi: 30, rearPsi: 30, frontPsiLoad: 33, rearPsiLoad: 36, sparePsi: 60, notes: 'Up! TSI Move e high up! Carro leve — valores padrão para veículos compactos.' },
  ],

  // Nissan Kicks (1.6 HR16DE + CVT)
  Kicks: [
    { tireSize: '205/60 R16', frontPsi: 32, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 38, sparePsi: 60, notes: 'Kicks S, SV e SL. TPMS disponível nas versões SL — alarme quando 25% abaixo da pressão recomendada.' },
  ],

  // Nissan Frontier (2.3 Diesel 2017+)
  Frontier: [
    { tireSize: '265/65 R17', frontPsi: 36, rearPsi: 40, frontPsiLoad: 40, rearPsiLoad: 55, sparePsi: 60, notes: 'Frontier XE, LE e PRO-4X diesel. Traseiro com carga total: 55 PSI. Estepe externo: 60 PSI.' },
  ],

  // Mitsubishi Pajero Sport (2.4 Diesel 2016+)
  'Pajero Sport': [
    { tireSize: '265/65 R17', frontPsi: 33, rearPsi: 36, frontPsiLoad: 36, rearPsiLoad: 42, sparePsi: 60, notes: 'Pajero Sport HPE e HPE-S. Em uso off-road pode reduzir para 26 PSI — mas recalibre antes de retornar ao asfalto.' },
  ],

  // Peugeot 208 / 2008 (1.6 THP)
  'Peugeot 208': [
    { tireSize: '185/65 R15', frontPsi: 30, rearPsi: 32, frontPsiLoad: 33, rearPsiLoad: 36, sparePsi: 60, notes: 'Peugeot 208 Active e Allure 2013–2021.' },
    { tireSize: '195/55 R16', frontPsi: 32, rearPsi: 32, frontPsiLoad: 35, rearPsiLoad: 38, sparePsi: 60, notes: 'Peugeot 208 GT Line e 2008. Verifique etiqueta no batente da porta.' },
  ],

  // Chevrolet Cruze (1.4 Turbo)
  Cruze: [
    { tireSize: '215/50 R17', frontPsi: 33, rearPsi: 33, frontPsiLoad: 36, rearPsiLoad: 38, sparePsi: 60, notes: 'Cruze LT, LTZ e Sport6 2012+. TPMS de série nas versões LTZ.' },
  ],

  // Renault Kwid (1.0 SCe)
  Kwid: [
    { tireSize: '165/70 R14', frontPsi: 29, rearPsi: 29, frontPsiLoad: 32, rearPsiLoad: 35, sparePsi: 60, notes: 'Kwid Zen, Life e Intense. Menor carro do segmento — calibragem baixa é normal para este porte.' },
  ],

  // Renault Sandero (1.0 / 1.6)
  Sandero: [
    { tireSize: '185/65 R15', frontPsi: 29, rearPsi: 29, frontPsiLoad: 32, rearPsiLoad: 35, sparePsi: 60, notes: 'Sandero Zen, Life, Stepway e RS.' },
  ],

  // Fiat Strada / Cronos
  Strada: [
    { tireSize: '195/65 R15', frontPsi: 30, rearPsi: 33, frontPsiLoad: 33, rearPsiLoad: 44, sparePsi: 60, notes: 'Strada Freedom CS e CD 2021+. Traseiro com carga: 44 PSI. Veículo comercial — traseiro com carga é crítico.' },
    { tireSize: '185/70 R14', frontPsi: 30, rearPsi: 33, frontPsiLoad: 33, rearPsiLoad: 44, sparePsi: 60, notes: 'Strada Working CS 2019–2021.' },
  ],

  // ── MOTOS ─────────────────────────────────────────────────────────────────────

  // Honda CG 160 / Titan 160
  'CG 160': [
    { tireSize: '80/100-18 (D) · 90/90-18 (T)', frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 41, notes: 'Pressão com garupa: traseiro 41 PSI. Nunca sobrecarregue motos acima de 41 PSI no traseiro. Versão com pneu sem câmara: mesmos valores.' },
  ],

  // Honda Bros 160
  'Bros 160': [
    { tireSize: '80/100-18 (D) · 100/90-18 (T)', frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36, notes: 'Bros em uso off-road pode reduzir dianteiro para 26 PSI em trilhas. Recalibre ao retornar para o asfalto.' },
  ],

  // Honda CB 300F Twister
  'CB 300F Twister': [
    { tireSize: '110/70-17 (D) · 140/70-17 (T)', frontPsi: 29, rearPsi: 36, frontPsiLoad: 32, rearPsiLoad: 42, notes: 'Com garupa: dianteiro 32, traseiro 42 PSI. Pneu sem câmara (tubeless) de série.' },
  ],

  // Honda XRE 300
  'XRE 300': [
    { tireSize: '90/90-21 (D) · 120/80-18 (T)', frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 36, notes: 'Em uso off-road: dianteiro 26 PSI, traseiro 29 PSI. Recalibre para os valores normais no asfalto. Pneu dianteiro maior (21") é especificidade do XRE.' },
  ],

  // Honda PCX 160
  'PCX 160': [
    { tireSize: '110/70-13 (D) · 130/70-13 (T)', frontPsi: 29, rearPsi: 33, frontPsiLoad: 29, rearPsiLoad: 41, notes: 'Com garupa: traseiro 41 PSI. Scooter com pneus menores — importante não exceder 41 PSI. Entregadores: verifique semanalmente.' },
  ],

  // Honda CB 500F / CB 500X
  'CB 500F': [
    { tireSize: '120/70 ZR17 (D) · 160/60 ZR17 (T)', frontPsi: 36, rearPsi: 42, frontPsiLoad: 36, rearPsiLoad: 42, notes: 'CB 500F e CB 500X. Pneu radial Z-rating. Pressão igual solo ou com garupa conforme manual Honda. Verifique a frio.' },
  ],

  // Honda CB 650R
  'CB 650R': [
    { tireSize: '120/70 ZR17 (D) · 180/55 ZR17 (T)', frontPsi: 33, rearPsi: 36, frontPsiLoad: 36, rearPsiLoad: 42, notes: 'CB 650R Neo Sports Café. Com garupa: dianteiro 36, traseiro 42 PSI. Pneu radial de perfil esportivo.' },
  ],

  // Yamaha Fazer 250 / YS 250
  'Fazer 250': [
    { tireSize: '100/80-17 (D) · 130/70-17 (T)', frontPsi: 29, rearPsi: 36, frontPsiLoad: 32, rearPsiLoad: 42, notes: 'Fazer 250 e Ys250 Fazer. Com garupa: dianteiro 32 PSI, traseiro 42 PSI. Verificação mensal recomendada.' },
  ],

  // Yamaha XTZ 150 Crosser
  'XTZ 150 Crosser': [
    { tireSize: '80/100-21 (D) · 100/90-18 (T)', frontPsi: 22, rearPsi: 29, frontPsiLoad: 22, rearPsiLoad: 36, notes: 'XTZ Crosser em uso misto. Off-road: dianteiro 18 PSI, traseiro 22 PSI. Asfalto com garupa: traseiro 36 PSI. Pneu dianteiro 21" típico de enduro.' },
  ],

  // Yamaha MT-03
  'MT-03': [
    { tireSize: '110/70 R17 (D) · 140/70 R17 (T)', frontPsi: 33, rearPsi: 40, frontPsiLoad: 36, rearPsiLoad: 42, notes: 'MT-03 2016+. Com garupa: dianteiro 36, traseiro 42 PSI. Pneu radial de alta performance.' },
  ],

  // Yamaha Ténéré 700
  'Tenere 700': [
    { tireSize: '90/90-21 (D) · 150/70 R18 (T)', frontPsi: 33, rearPsi: 36, frontPsiLoad: 36, rearPsiLoad: 42, notes: 'Ténéré 700 2022+. Off-road: dianteiro 22–26 PSI, traseiro 22–29 PSI. Retorne aos valores normais no asfalto. Pneu traseiro 18" auxilia em terrenos difíceis.' },
  ],

  // Kawasaki Ninja 400 / Z400
  'Ninja 400': [
    { tireSize: '110/70 ZR17 (D) · 150/60 ZR17 (T)', frontPsi: 33, rearPsi: 40, frontPsiLoad: 36, rearPsiLoad: 42, notes: 'Ninja 400 e Z400. Com garupa: dianteiro 36, traseiro 42 PSI. Pneu de perfil esportivo — não ultrapasse 42 PSI a frio.' },
  ],

  // BMW R 1250 GS
  'R 1250 GS': [
    { tireSize: '120/70 ZR19 (D) · 170/60 ZR17 (T)', frontPsi: 36, rearPsi: 42, frontPsiLoad: 36, rearPsiLoad: 42, notes: 'R 1250 GS e Adventure. Off-road: dianteiro 26 PSI, traseiro 29 PSI. Sistema de controle de pressão ESA — alarme integrado. Pneu dianteiro 19" para melhor comportamento em trilhas.' },
  ],

  // Harley-Davidson (geral)
  'Harley-Davidson': [
    { tireSize: 'Varia por modelo', frontPsi: 36, rearPsi: 40, frontPsiLoad: 36, rearPsiLoad: 40, notes: 'Softail e Touring: dianteiro 36 PSI, traseiro 40 PSI (solo) ou 41 PSI (com garupa). Sportster: dianteiro 30, traseiro 36 PSI. SEMPRE consulte a etiqueta na moto — valores variam muito entre modelos.' },
  ],

  // Royal Enfield Classic 350 / Himalayan
  'Royal Enfield': [
    { tireSize: '100/90-19 (D) · 120/80-18 (T)', frontPsi: 22, rearPsi: 26, frontPsiLoad: 26, rearPsiLoad: 33, notes: 'Classic 350 e Meteorite 350. Com garupa: dianteiro 26, traseiro 33 PSI. Pneus de bloco do Himalayan: off-road 18 PSI D/T.' },
  ],
}

// Aliases
const aliases: Record<string, string> = {
  Virtus:         'Polo',
  'Onix Plus':    'Onix',
  Cronos:         'Strada',
  EcoSport:       'Ka',
  Compass:        'Compass',
  Kardian:        'Kwid',
  'Up!':          'Up',
  'Titan 160':    'CG 160',
  'Fan 160':      'CG 160',
  'CB 500X':      'CB 500F',
  Z400:           'Ninja 400',
  'Classic 350':  'Royal Enfield',
  Himalayan:      'Royal Enfield',
  'Peugeot 2008': 'Peugeot 208',
  'SW4':          'SW4',
}

async function main() {
  console.log('🗑️  Limpando calibragens existentes...')
  await (prisma.tirePressure as any).deleteMany()

  const rows: any[] = []

  // Generic (modelName = null)
  rows.push({ modelName: null, order: 0, ...generic })
  console.log('  → 1 entrada genérica')

  // Specific models
  let modelCount = 0
  for (const [model, items] of Object.entries(specific)) {
    items.forEach((item, order) => rows.push({ modelName: model, order, ...item }))
    modelCount++
  }
  console.log(`  → ${modelCount} modelos específicos`)

  // Aliases
  let aliasCount = 0
  for (const [alias, source] of Object.entries(aliases)) {
    if (alias === source) continue // skip self-references
    const sourceItems = specific[source]
    if (sourceItems) {
      sourceItems.forEach((item, order) => rows.push({ modelName: alias, order, ...item }))
      aliasCount++
    }
  }
  console.log(`  → ${aliasCount} aliases`)

  // Insert all
  const batchSize = 50
  for (let i = 0; i < rows.length; i += batchSize) {
    await (prisma.tirePressure as any).createMany({ data: rows.slice(i, i + batchSize) })
  }

  const total = await (prisma.tirePressure as any).count()
  console.log(`\n✅ ${total} entradas de calibragem inseridas`)

  const models = await (prisma.tirePressure as any).groupBy({ by: ['modelName'], _count: true })
  console.log(`   → ${models.filter((m: any) => m.modelName !== null).length} modelos específicos + 1 genérico`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
