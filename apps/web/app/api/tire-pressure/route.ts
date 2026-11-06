import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { parseModelYear } from '@/lib/data'

// Match stored short name (e.g. "Onix") against a full FIPE name (e.g. "Onix LT 1.0T")
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

export async function GET(request: NextRequest) {
  const modelName = request.nextUrl.searchParams.get('modelName') ?? ''
  const yearCode  = request.nextUrl.searchParams.get('yearCode') ?? undefined

  if (!modelName) {
    return NextResponse.json({ error: 'modelName required' }, { status: 400 })
  }

  const year = yearCode ? parseModelYear(yearCode) : null

  const yearFilter = year !== null ? {
    AND: [
      { OR: [{ yearFrom: null }, { yearFrom: { lte: year } }] },
      { OR: [{ yearTo: null }, { yearTo: { gte: year } }] },
    ],
  } : {}

  // Step 1: find all distinct stored modelNames in tire pressure table
  const knownNames = await prisma.tirePressure.findMany({
    where: { modelName: { not: null } },
    select: { modelName: true },
    distinct: ['modelName'],
  })

  // Step 2: check which stored names appear inside the FIPE full model name
  const matchingNames = knownNames
    .map((r) => r.modelName!)
    .filter((name) => matchesStoredName(modelName, name))

  // Step 3: fetch specific tire pressure data for matched names
  if (matchingNames.length > 0) {
    const specific = await prisma.tirePressure.findMany({
      where: { modelName: { in: matchingNames }, ...yearFilter },
      orderBy: { order: 'asc' },
    })
    if (specific.length > 0) {
      return NextResponse.json({ items: specific, isSpecific: true })
    }
    // Year outside stored range (e.g. FIPE has 2005 but model yearTo is 2004) — serve model data anyway
    const specificNoYear = await prisma.tirePressure.findMany({
      where: { modelName: { in: matchingNames } },
      orderBy: { order: 'asc' },
    })
    if (specificNoYear.length > 0) {
      return NextResponse.json({ items: specificNoYear, isSpecific: true })
    }
  }

  // Fall back to generic (no modelName)
  const generic = await prisma.tirePressure.findMany({
    where: { modelName: null, ...yearFilter },
    orderBy: { order: 'asc' },
  })

  return NextResponse.json({ items: generic, isSpecific: false })
}
