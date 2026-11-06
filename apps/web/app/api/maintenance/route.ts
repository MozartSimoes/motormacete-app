import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { parseModelYear } from '@/lib/data'

function matchesStoredName(fipeName: string, storedName: string): boolean {
  // Primary: DB name appears inside frontend name (e.g. "Onix" in "Onix LT 1.0T")
  const escStored = storedName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  if (new RegExp(`\\b${escStored}\\b`, 'i').test(fipeName)) return true
  // Reverse: frontend name appears inside DB name (e.g. "Twister" in "CB 250 TWISTER")
  const escFipe = fipeName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  if (new RegExp(`\\b${escFipe}\\b`, 'i').test(storedName)) return true
  // Same words, different order (e.g. "SHADOW VT 600 C" vs "VT 600 C SHADOW")
  const a = fipeName.toLowerCase().split(/\s+/).sort().join(' ')
  const b = storedName.toLowerCase().split(/\s+/).sort().join(' ')
  return a === b
}

function isElectric(yearName: string, modelName: string): boolean {
  const y = yearName.toLowerCase()
  const m = modelName.toLowerCase()
  return y.includes('elétric') || y.includes('eletric') || m.includes(' ev') || m.endsWith(' ev')
}

const EV_MAINTENANCE = [
  { component: 'Fluido de freio (DOT 4)',        intervalKm: null,   intervalMonths: 24,  priority: 'HIGH',   notes: 'Absorve umidade ao longo do tempo — troque a cada 2 anos independente da quilometragem.' },
  { component: 'Fluido de arrefecimento (bateria/motor)', intervalKm: 100000, intervalMonths: 60, priority: 'HIGH', notes: 'Fluido dedicado ao sistema de gerenciamento térmico. Verifique o manual do fabricante.' },
  { component: 'Pneus — calibragem semanal',     intervalKm: null,   intervalMonths: null, priority: 'CRITICAL', notes: 'EVs são mais pesados e têm torque instantâneo — desgastam pneus mais rápido. Calibre sempre frio.' },
  { component: 'Pneus — rotação',                intervalKm: 10000,  intervalMonths: null, priority: 'HIGH',   notes: 'Rotacione a cada 10.000 km para desgaste uniforme. Prioridade em EVs de tração dianteira.' },
  { component: 'Filtro de ar da cabine (HEPA)',  intervalKm: 20000,  intervalMonths: 12,  priority: 'MEDIUM', notes: 'Troque a cada 12 meses ou 20.000 km. Evita odores e mantém o sistema de ventilação eficiente.' },
  { component: 'Sistema de freios — inspeção',   intervalKm: null,   intervalMonths: 12,  priority: 'MEDIUM', notes: 'Inspecione pastilhas e discos anualmente. A frenagem regenerativa pouco usa os freios mecânicos, mas as pastilhas podem oxidar.' },
  { component: 'Bateria de 12V',                 intervalKm: null,   intervalMonths: 36,  priority: 'MEDIUM', notes: 'Mesmo com bateria de tração, o EV tem uma bateria 12V auxiliar para eletrônicos. Dura 3-4 anos. Falha dela deixa o carro inoperante.' },
  { component: 'Software / Atualizações OTA',    intervalKm: null,   intervalMonths: 3,   priority: 'LOW',    notes: 'Verifique atualizações pendentes a cada 3 meses. Corrigem bugs, melhoram autonomia e eficiência.' },
  { component: 'Fluidos e vedações — inspeção',  intervalKm: null,   intervalMonths: 12,  priority: 'LOW',    notes: 'Verifique fluido do diferencial (se houver), vedações das tampas e conectores de carregamento.' },
]

const MOTO_EXCLUDE_KEYWORDS = [
  'cabine', 'para-brisa', 'limpador', 'ar condicionado', 'ar-condicionado',
  'câmbio automático', 'câmbio automatico', 'fluido automático', 'fluido automatico',
  'dexron', 'atf ', 'cvt ', 'dsg', 'cambio automático', 'cambio automatico',
  'rodízio de pneu', 'rodizio de pneu',
]

function isMotoCompatible(item: { component: string; notes: string | null }): boolean {
  const text = `${item.component} ${item.notes ?? ''}`.toLowerCase()
  return !MOTO_EXCLUDE_KEYWORDS.some(kw => text.includes(kw))
}

export async function GET(request: NextRequest) {
  const modelName   = request.nextUrl.searchParams.get('modelName') ?? ''
  const yearCode    = request.nextUrl.searchParams.get('yearCode') ?? undefined
  const yearName    = request.nextUrl.searchParams.get('yearName') ?? ''
  const vehicleType = request.nextUrl.searchParams.get('vehicleType') ?? 'carro'
  const isMoto      = vehicleType === 'moto'

  if (!modelName) {
    return NextResponse.json({ error: 'modelName required' }, { status: 400 })
  }

  const year = yearCode ? parseModelYear(yearCode) : null
  const isEV = isElectric(yearName, modelName)

  const yearFilter = year !== null ? {
    AND: [
      { OR: [{ yearFrom: null }, { yearFrom: { lte: year } }] },
      { OR: [{ yearTo: null }, { yearTo: { gte: year } }] },
    ],
  } : {}

  // Step 1: find all distinct stored modelNames in maintenance table
  const knownNames = await prisma.maintenanceItem.findMany({
    where: { modelName: { not: null } },
    select: { modelName: true },
    distinct: ['modelName'],
  })

  // Step 2: check which stored names appear inside the FIPE full model name
  const matchingNames = knownNames
    .map((r) => r.modelName!)
    .filter((name) => matchesStoredName(modelName, name))

  // Step 3: fetch specific maintenance for matched names
  if (matchingNames.length > 0) {
    const specific = await prisma.maintenanceItem.findMany({
      where: { modelName: { in: matchingNames }, ...yearFilter },
      orderBy: [{ priority: 'asc' }, { order: 'asc' }],
    })
    if (specific.length > 0) {
      return NextResponse.json({ items: specific, isSpecific: true })
    }
    // Year outside stored range (e.g. FIPE has 2005 but model yearTo is 2004) — serve model items anyway
    const specificNoYear = await prisma.maintenanceItem.findMany({
      where: { modelName: { in: matchingNames } },
      orderBy: [{ priority: 'asc' }, { order: 'asc' }],
    })
    if (specificNoYear.length > 0) {
      return NextResponse.json({ items: specificNoYear, isSpecific: true })
    }
  }

  // EV: serve EV-specific maintenance schedule
  if (isEV) {
    const items = EV_MAINTENANCE.map((item, i) => ({
      id: `ev-maint-${i}`,
      modelName: null,
      yearFrom: null,
      yearTo: null,
      ...item,
      order: i,
    }))
    return NextResponse.json({ items, isSpecific: false })
  }

  // Combustion fallback generic schedule
  const generic = await prisma.maintenanceItem.findMany({
    where: { modelName: null, ...yearFilter },
    orderBy: [{ priority: 'asc' }, { order: 'asc' }],
  })

  const filteredGeneric = isMoto ? generic.filter(isMotoCompatible) : generic

  return NextResponse.json({ items: filteredGeneric, isSpecific: false })
}
