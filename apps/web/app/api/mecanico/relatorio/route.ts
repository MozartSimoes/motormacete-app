import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/session'
import { prisma } from '@/lib/db'
import PDFDocument from 'pdfkit'

const STATUS_LABELS: Record<string, string> = {
  OPEN: 'Aberta', IN_PROGRESS: 'Em andamento', WAITING_PARTS: 'Aguard. peças',
  DONE: 'Concluída', CLOSED: 'Fechada', CANCELLED: 'Cancelada',
}

export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session || session.type !== 'MECHANIC') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { plan: true, isAdmin: true, name: true, trialEndsAt: true },
  })
  const isPro = user?.isAdmin || user?.plan !== "FREE" || !!(user?.trialEndsAt && new Date() <= user.trialEndsAt)
  if (!isPro) {
    return NextResponse.json({ error: 'Recurso exclusivo do Mecânico Pro.', code: 'PLAN_LIMIT' }, { status: 403 })
  }

  const workshop = await prisma.workshop.findUnique({
    where: { userId: session.userId },
    select: { id: true, name: true, city: true, state: true },
  })
  if (!workshop) return NextResponse.json({ error: 'Oficina não encontrada' }, { status: 404 })

  const { searchParams } = req.nextUrl
  const now = new Date()
  const month = parseInt(searchParams.get('month') ?? String(now.getMonth() + 1))
  const year  = parseInt(searchParams.get('year')  ?? String(now.getFullYear()))

  const start = new Date(year, month - 1, 1)
  const end   = new Date(year, month, 0, 23, 59, 59)

  const orders = await prisma.serviceOrder.findMany({
    where: { workshopId: workshop.id, createdAt: { gte: start, lte: end } },
    orderBy: { number: 'asc' },
    select: {
      number: true, clientName: true, plate: true,
      vehicleBrand: true, vehicleModel: true, vehicleYear: true,
      status: true, total: true, createdAt: true,
    },
  })

  const totalRevenue  = orders.filter(o => ['DONE','CLOSED'].includes(o.status)).reduce((s,o) => s + o.total, 0)
  const totalAll      = orders.reduce((s,o) => s + o.total, 0)
  const avgTicket     = orders.length > 0 ? totalAll / orders.length : 0
  const byStatus      = orders.reduce<Record<string,{count:number;total:number}>>((acc,o) => {
    if (!acc[o.status]) acc[o.status] = { count:0, total:0 }
    acc[o.status].count++; acc[o.status].total += o.total
    return acc
  }, {})

  const monthName = new Date(year, month-1, 1).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  const today     = new Date().toLocaleDateString('pt-BR', { day:'2-digit', month:'long', year:'numeric' })

  // ── Gera PDF ─────────────────────────────────────────────────────────────────
  const doc    = new PDFDocument({ margin: 50, size: 'A4' })
  const chunks: Buffer[] = []
  doc.on('data', (c: Buffer) => chunks.push(c))

  // Header
  doc.rect(0, 0, doc.page.width, 80).fill('#ff6600')
  doc.fillColor('#fff').fontSize(20).font('Helvetica-Bold').text('MOTORMACETE', 50, 22)
  doc.fontSize(10).font('Helvetica').text('Relatório de Faturamento', 50, 46)
  doc.fillColor('#000')

  // Oficina + período
  let y = 100
  doc.fontSize(16).font('Helvetica-Bold').fillColor('#ff6600').text(workshop.name, 50, y)
  doc.fontSize(11).font('Helvetica').fillColor('#555')
     .text(`${workshop.city ?? ''}${workshop.state ? ` · ${workshop.state}` : ''} · Gerado em ${today}`, 50, y + 20)
  doc.fontSize(13).font('Helvetica-Bold').fillColor('#111')
     .text(`Período: ${monthName.charAt(0).toUpperCase() + monthName.slice(1)}`, 50, y + 38)
  y += 70

  // Cards de resumo
  const cardW = 115; const cardGap = 10
  const cards = [
    { label: 'Total de OS',       value: String(orders.length) },
    { label: 'Faturado (conc.)',  value: `R$ ${totalRevenue.toFixed(0)}` },
    { label: 'Total em aberto',   value: `R$ ${totalAll.toFixed(0)}` },
    { label: 'Ticket médio',      value: `R$ ${avgTicket.toFixed(0)}` },
  ]
  cards.forEach((c, i) => {
    const x = 50 + i * (cardW + cardGap)
    doc.rect(x, y, cardW, 52).fill('#f5f5f5').stroke('#e0e0e0')
    doc.fontSize(8).font('Helvetica').fillColor('#888')
       .text(c.label.toUpperCase(), x + 8, y + 8, { width: cardW - 16 })
    doc.fontSize(14).font('Helvetica-Bold').fillColor('#ff6600')
       .text(c.value, x + 8, y + 22, { width: cardW - 16 })
  })
  y += 70

  // Por status
  doc.fontSize(11).font('Helvetica-Bold').fillColor('#ff6600').text('RESUMO POR STATUS', 50, y)
  doc.moveTo(50, y + 15).lineTo(545, y + 15).strokeColor('#ff6600').lineWidth(0.5).stroke()
  y += 24
  Object.entries(byStatus).forEach(([st, data]) => {
    doc.fontSize(10).font('Helvetica').fillColor('#333')
       .text(`${STATUS_LABELS[st] ?? st}`, 50, y, { width: 150 })
       .text(`${data.count} OS`, 210, y, { width: 80 })
       .text(`R$ ${data.total.toFixed(2).replace('.',',')}`, 310, y, { width: 110 })
    y += 18
  })
  y += 12

  // Lista de OS
  doc.fontSize(11).font('Helvetica-Bold').fillColor('#ff6600').text('ORDENS DE SERVIÇO', 50, y)
  doc.moveTo(50, y + 15).lineTo(545, y + 15).strokeColor('#ff6600').lineWidth(0.5).stroke()
  y += 24

  // Cabeçalho da tabela
  doc.rect(50, y, 495, 18).fill('#f0f0f0')
  doc.fontSize(8).font('Helvetica-Bold').fillColor('#555')
  doc.text('OS',      55, y + 5)
     .text('CLIENTE', 90, y + 5, { width: 120 })
     .text('VEÍCULO',220, y + 5, { width: 110 })
     .text('STATUS',  340, y + 5, { width: 80 })
     .text('TOTAL',   440, y + 5, { width: 100 })
  y += 20

  orders.forEach((o, idx) => {
    if (y > 730) { doc.addPage(); y = 50 }
    if (idx % 2 === 0) doc.rect(50, y - 1, 495, 17).fill('#fafafa')
    doc.fontSize(9).font('Helvetica').fillColor('#222')
    doc.text(`#${o.number}`,      55, y + 2, { width: 32 })
       .text(o.clientName,        90, y + 2, { width: 125 })
       .text(`${o.vehicleBrand} ${o.vehicleModel}`, 220, y + 2, { width: 115 })
       .text(STATUS_LABELS[o.status] ?? o.status, 340, y + 2, { width: 95 })
       .text(`R$ ${o.total.toFixed(2).replace('.',',')}`, 440, y + 2, { width: 100 })
    y += 17
  })

  // Total final
  y += 6
  doc.moveTo(50, y).lineTo(545, y).strokeColor('#ccc').lineWidth(0.5).stroke()
  y += 8
  doc.fontSize(11).font('Helvetica-Bold').fillColor('#111')
     .text(`Faturamento confirmado: R$ ${totalRevenue.toFixed(2).replace('.',',')}`, 300, y, { width: 245, align: 'right' })
  y += 16
  doc.fontSize(9).font('Helvetica').fillColor('#888')
     .text(`Total em ordens (todos os status): R$ ${totalAll.toFixed(2).replace('.',',')}`, 300, y, { width: 245, align: 'right' })

  // Rodapé
  doc.rect(0, doc.page.height - 50, doc.page.width, 50).fill('#30303a')
  doc.fontSize(8).font('Helvetica').fillColor('#666')
     .text(`MotorMacete Pro · ${workshop.name} · ${monthName}`, 50, doc.page.height - 32, { align: 'center', width: doc.page.width - 100 })

  doc.end()
  await new Promise<void>(resolve => doc.on('end', resolve))
  const pdf = Buffer.concat(chunks)

  const filename = `relatorio-${workshop.name.toLowerCase().replace(/\s+/g,'-')}-${year}-${String(month).padStart(2,'0')}.pdf`
  return new NextResponse(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': String(pdf.length),
    },
  })
}
