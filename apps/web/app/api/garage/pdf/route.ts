import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/session'
import { prisma } from '@/lib/db'
import PDFDocument from 'pdfkit'

const FUEL_LABELS: Record<string, string> = {
  FLEX: 'Flex', GASOLINA: 'Gasolina', DIESEL: 'Diesel',
  ELETRICO: 'Elétrico', HIBRIDO: 'Híbrido',
}

export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { plan: true, isAdmin: true, name: true, trialEndsAt: true },
  })

  const isPro = user?.isAdmin || user?.plan !== 'FREE' || !!(user?.trialEndsAt && new Date() <= user.trialEndsAt)
  if (!isPro) {
    return NextResponse.json({ error: 'Recurso exclusivo do plano Pro.', code: 'PLAN_LIMIT' }, { status: 403 })
  }

  const vehicleId = req.nextUrl.searchParams.get('vehicleId')
  if (!vehicleId) return NextResponse.json({ error: 'vehicleId obrigatório' }, { status: 400 })

  const vehicle = await prisma.userVehicle.findFirst({
    where: { id: vehicleId, userId: session.userId },
    include: {
      logs: { orderBy: { date: 'asc' } },
    },
  })
  if (!vehicle) return NextResponse.json({ error: 'Veículo não encontrado' }, { status: 404 })

  // ── Gera o PDF ────────────────────────────────────────────────────────────────
  const doc = new PDFDocument({ margin: 50, size: 'A4' })
  const chunks: Buffer[] = []
  doc.on('data', (chunk: Buffer) => chunks.push(chunk))

  const totalCost = vehicle.logs.reduce((sum, l) => sum + (l.cost ?? 0), 0)
  const today = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
  const vehicleName = vehicle.nickname ?? `${vehicle.brand} ${vehicle.model} ${vehicle.year}`

  // ── Header laranja ────────────────────────────────────────────────────────────
  doc.rect(0, 0, doc.page.width, 80).fill('#ff6600')
  doc.fillColor('#ffffff').fontSize(22).font('Helvetica-Bold')
     .text('MOTORMACETE', 50, 24)
  doc.fontSize(10).font('Helvetica')
     .text('Laudo Completo para Venda', 50, 50)
  doc.fillColor('#000000')

  // ── Dados do veículo ──────────────────────────────────────────────────────────
  let y = 110
  doc.fontSize(14).font('Helvetica-Bold').fillColor('#ff6600').text('DADOS DO VEÍCULO', 50, y)
  doc.moveTo(50, y + 18).lineTo(545, y + 18).strokeColor('#ff6600').lineWidth(1).stroke()
  y += 30

  const fields: [string, string][] = [
    ['Veículo',      vehicleName],
    ['Marca',        vehicle.brand],
    ['Modelo',       vehicle.model],
    ['Ano',          String(vehicle.year)],
    ['Combustível',  FUEL_LABELS[vehicle.fuelType ?? ''] ?? vehicle.fuelType ?? '—'],
    ['Cor',          vehicle.color ?? '—'],
    ['Placa',        vehicle.plate?.toUpperCase() ?? '—'],
    ['KM atual',     vehicle.currentKm ? `${vehicle.currentKm.toLocaleString('pt-BR')} km` : '—'],
  ]

  const col2Start = 300
  fields.forEach(([label, value], i) => {
    const x = i % 2 === 0 ? 50 : col2Start
    if (i % 2 === 0 && i > 0) y += 24
    doc.fontSize(9).font('Helvetica').fillColor('#888888').text(label.toUpperCase(), x, y)
    doc.fontSize(11).font('Helvetica-Bold').fillColor('#111111').text(value, x, y + 12)
  })
  y += 40

  // ── Histórico de manutenção ───────────────────────────────────────────────────
  doc.fontSize(14).font('Helvetica-Bold').fillColor('#ff6600').text('HISTÓRICO DE MANUTENÇÃO', 50, y)
  doc.moveTo(50, y + 18).lineTo(545, y + 18).strokeColor('#ff6600').lineWidth(1).stroke()
  y += 30

  if (vehicle.logs.length === 0) {
    doc.fontSize(11).font('Helvetica').fillColor('#888888').text('Nenhum registro encontrado.', 50, y)
    y += 20
  } else {
    // Cabeçalho da tabela
    doc.rect(50, y, 495, 20).fill('#f5f5f5')
    doc.fontSize(8).font('Helvetica-Bold').fillColor('#555555')
    doc.text('DATA',        55, y + 6)
    doc.text('CATEGORIA',  130, y + 6)
    doc.text('DESCRIÇÃO',  230, y + 6)
    doc.text('KM',         390, y + 6)
    doc.text('CUSTO',      455, y + 6)
    y += 22

    vehicle.logs.forEach((log, idx) => {
      if (y > 720) { doc.addPage(); y = 50 }
      if (idx % 2 === 0) doc.rect(50, y - 2, 495, 20).fill('#fafafa')
      doc.fontSize(9).font('Helvetica').fillColor('#222222')
      doc.text(new Date(log.date).toLocaleDateString('pt-BR'),  55, y + 2, { width: 70 })
      doc.text(log.category,                                    130, y + 2, { width: 95 })
      doc.text(log.description,                                 230, y + 2, { width: 155 })
      doc.text(log.km ? `${log.km.toLocaleString('pt-BR')}` : '—', 390, y + 2, { width: 60 })
      doc.text(log.cost ? `R$ ${log.cost.toFixed(2).replace('.', ',')}` : '—', 455, y + 2, { width: 90 })
      y += 20
    })

    // Total
    y += 8
    doc.moveTo(50, y).lineTo(545, y).strokeColor('#dddddd').lineWidth(0.5).stroke()
    y += 8
    doc.fontSize(11).font('Helvetica-Bold').fillColor('#111111')
    doc.text(`Total investido: R$ ${totalCost.toFixed(2).replace('.', ',')}`, 390, y, { width: 155, align: 'right' })
    y += 24
  }

  // ── Rodapé ────────────────────────────────────────────────────────────────────
  doc.rect(0, doc.page.height - 60, doc.page.width, 60).fill('#30303a')
  doc.fontSize(9).font('Helvetica').fillColor('#888888')
     .text(`Laudo gerado em ${today} por ${user?.name ?? 'usuário'} via MotorMacete Pro`, 50, doc.page.height - 42, { align: 'center', width: doc.page.width - 100 })
  doc.fontSize(8).fillColor('#555555')
     .text('Este documento não substitui vistoria técnica ou cautelar.', 50, doc.page.height - 26, { align: 'center', width: doc.page.width - 100 })

  doc.end()

  await new Promise<void>(resolve => doc.on('end', resolve))
  const pdf = Buffer.concat(chunks)
  const filename = `laudo-${vehicle.brand}-${vehicle.model}-${vehicle.year}.pdf`
    .toLowerCase().replace(/\s+/g, '-')

  return new NextResponse(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': String(pdf.length),
    },
  })
}
