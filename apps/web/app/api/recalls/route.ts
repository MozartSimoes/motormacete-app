import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  const q     = request.nextUrl.searchParams.get('q')?.trim()
  const brand = request.nextUrl.searchParams.get('brand')?.trim()
  const model = request.nextUrl.searchParams.get('model')?.trim()
  const year  = request.nextUrl.searchParams.get('year')
  const type  = request.nextUrl.searchParams.get('type') // 'carro' | 'moto'

  const yearNum = year ? parseInt(year) : null

  try {
    const where: Record<string, unknown> = {}

    if (brand) {
      where.brand = { contains: brand, mode: 'insensitive' }
    }
    if (type && (type === 'carro' || type === 'moto')) {
      where.vehicleType = type
    }
    if (yearNum) {
      where.yearFrom = { lte: yearNum }
      where.yearTo   = { gte: yearNum }
    }
    if (q) {
      where.OR = [
        { brand:  { contains: q, mode: 'insensitive' } },
        { title:  { contains: q, mode: 'insensitive' } },
        { defect: { contains: q, mode: 'insensitive' } },
      ]
    }

    let recalls = await prisma.recallCampaign.findMany({
      where,
      orderBy: [{ status: 'asc' }, { publishedAt: 'desc' }],
      take: 50,
    })

    // Filtra por modelo (array) no JS, pois Prisma não faz contains em arrays
    if (model) {
      const ml = model.toLowerCase()
      recalls = recalls.filter(r =>
        r.models.some(m => m.toLowerCase().includes(ml))
      )
    }

    return NextResponse.json({ recalls })
  } catch {
    return NextResponse.json({ recalls: [] }, { status: 500 })
  }
}
