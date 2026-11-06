import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/session'
import { prisma } from '@/lib/db'

const STATUS_LABELS: Record<string, string> = {
  OPEN: 'Aberta', IN_PROGRESS: 'Em andamento', WAITING_PARTS: 'Aguard. peças',
  DONE: 'Concluída', CLOSED: 'Fechada', CANCELLED: 'Cancelada',
}

function escapeCsv(v: string | number | null | undefined): string {
  if (v == null) return ''
  const s = String(v)
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`
  }
  return s
}

export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session || session.type !== 'MECHANIC') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { plan: true, isAdmin: true, trialEndsAt: true },
  })
  const isPro = user?.isAdmin || user?.plan !== "FREE" || !!(user?.trialEndsAt && new Date() <= user.trialEndsAt)
  if (!isPro) {
    return NextResponse.json({ error: 'Recurso exclusivo do Mecânico Pro.', code: 'PLAN_LIMIT' }, { status: 403 })
  }

  const workshop = await prisma.workshop.findUnique({
    where: { userId: session.userId },
    select: { id: true, name: true },
  })
  if (!workshop) return NextResponse.json({ error: 'Oficina não encontrada' }, { status: 404 })

  const { searchParams } = req.nextUrl
  const month  = searchParams.get('month')
  const year   = searchParams.get('year')
  const status = searchParams.get('status')

  let dateFilter = {}
  if (month && year) {
    const m = parseInt(month); const y = parseInt(year)
    dateFilter = { createdAt: { gte: new Date(y, m - 1, 1), lte: new Date(y, m, 0, 23, 59, 59) } }
  } else if (year) {
    const y = parseInt(year)
    dateFilter = { createdAt: { gte: new Date(y, 0, 1), lte: new Date(y, 11, 31, 23, 59, 59) } }
  }

  const orders = await prisma.serviceOrder.findMany({
    where: {
      workshopId: workshop.id,
      ...(status ? { status: status as never } : {}),
      ...dateFilter,
    },
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  })

  // ── Monta CSV ────────────────────────────────────────────────────────────────
  const HEADER = [
    'OS#', 'Data', 'Status', 'Cliente', 'Telefone', 'E-mail',
    'Veículo', 'Ano', 'Placa', 'KM', 'Diagnóstico', 'Observações',
    'Itens (desc)', 'Total (R$)', 'Próx. Revisão Cliente',
  ]

  const rows = orders.map(o => {
    const itemsStr = o.items.map(i => `${i.description} x${i.quantity} R$${i.unitPrice.toFixed(2)}`).join(' | ')
    return [
      o.number,
      new Date(o.createdAt).toLocaleDateString('pt-BR'),
      STATUS_LABELS[o.status] ?? o.status,
      o.clientName,
      o.clientPhone ?? '',
      o.clientEmail ?? '',
      `${o.vehicleBrand} ${o.vehicleModel}`,
      o.vehicleYear ?? '',
      o.plate ?? '',
      o.vehicleKm ?? '',
      o.diagnosis ?? '',
      o.notes ?? '',
      itemsStr,
      o.total.toFixed(2).replace('.', ','),
      o.nextMaintenanceDate ? new Date(o.nextMaintenanceDate).toLocaleDateString('pt-BR') : '',
    ].map(escapeCsv).join(',')
  })

  const csv = [HEADER.join(','), ...rows].join('\r\n')
  // BOM para Excel reconhecer UTF-8
  const bom = '﻿'
  const content = bom + csv

  const now = new Date()
  const suffix = month && year
    ? `${year}-${String(month).padStart(2, '0')}`
    : year ? year : now.getFullYear()
  const filename = `os-${workshop.name.toLowerCase().replace(/\s+/g, '-')}-${suffix}.csv`

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
