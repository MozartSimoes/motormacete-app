import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { prisma } from '@/lib/db'
import type { NewsArticle } from '@/app/api/news/route'

const resend = new Resend(process.env.RESEND_API_KEY)
const BASE   = 'https://motormacete.com.br'

const TAG_COLORS: Record<string, string> = {
  Carros:     '#FF6B35',
  Motos:      '#60a5fa',
  SUVs:       '#a78bfa',
  Elétricos:  '#facc15',
  Mercado:    '#4ade80',
  Manutenção: '#fb923c',
}

function articleCard(a: NewsArticle) {
  const color = TAG_COLORS[a.tag] ?? '#FF6B35'
  return `
    <tr>
      <td style="padding:0 0 12px;">
        <a href="${a.link}" target="_blank" style="display:block;background:#28282e;border:1px solid #3a3a42;border-radius:10px;padding:16px 18px;text-decoration:none;">
          <span style="display:inline-block;font-size:0.65rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${color};margin-bottom:6px;">${a.tag}</span>
          <p style="margin:0 0 8px;color:#f0ede8;font-size:0.9rem;font-weight:600;line-height:1.4;">${a.title}</p>
          <span style="color:#555;font-size:0.75rem;">${a.source}</span>
        </a>
      </td>
    </tr>`
}

function buildEmail(articles: NewsArticle[], date: string, unsubLink: string): string {
  const grouped: Record<string, NewsArticle[]> = {}
  for (const a of articles) {
    grouped[a.tag] = grouped[a.tag] ?? []
    if (grouped[a.tag].length < 3) grouped[a.tag].push(a)
  }

  const sections = Object.entries(grouped).map(([tag, arts]) => {
    const color = TAG_COLORS[tag] ?? '#FF6B35'
    return `
      <tr><td style="padding:8px 0 4px;">
        <span style="display:inline-block;font-size:0.7rem;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:${color};border-left:3px solid ${color};padding-left:8px;">${tag}</span>
      </td></tr>
      ${arts.map(articleCard).join('')}
    `
  }).join('')

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="utf-8"/><title>MotorMacete — Feed Diário</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:system-ui,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#1c1c22;border-radius:16px;overflow:hidden;border:1px solid #2a2a32;">

        <!-- Header -->
        <tr><td style="background:#ff6600;padding:22px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td><span style="color:#fff;font-size:1.1rem;font-weight:800;letter-spacing:1px;">MOTORMACETE</span></td>
              <td align="right"><span style="color:rgba(255,255,255,0.85);font-size:0.75rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;">Feed Diário · ${date}</span></td>
            </tr>
          </table>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:28px 32px 0;">
          <h2 style="color:#f0ede8;font-size:1.3rem;font-weight:800;margin:0 0 4px;">Seu resumo automotivo do dia</h2>
          <p style="color:#666;font-size:0.85rem;margin:0 0 24px;">As principais notícias selecionadas para você.</p>

          <table width="100%" cellpadding="0" cellspacing="0">
            ${sections}
          </table>
        </td></tr>

        <!-- CTA -->
        <tr><td style="padding:20px 32px;text-align:center;">
          <a href="${BASE}/home/noticias" style="display:inline-block;background:#ff6600;color:#fff;font-size:0.85rem;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:100px;letter-spacing:0.5px;">
            Ver todas as notícias →
          </a>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:0 32px 24px;border-top:1px solid #2a2a32;margin-top:16px;">
          <p style="color:#444;font-size:0.72rem;margin:16px 0 0;text-align:center;">
            Você assinou o feed diário do MotorMacete.<br/>
            <a href="${unsubLink}" style="color:#555;">Cancelar inscrição</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Busca artigos
  const newsRes = await fetch(`${BASE}/api/news`, {
    headers: { 'User-Agent': 'MotorMacete-Cron/1.0' },
  }).catch(() => null)

  if (!newsRes?.ok) {
    return NextResponse.json({ error: 'Falha ao buscar notícias' }, { status: 502 })
  }

  const { articles }: { articles: NewsArticle[] } = await newsRes.json()

  if (!articles?.length) {
    return NextResponse.json({ sent: 0, reason: 'no articles' })
  }

  const subscribers = await prisma.newsletterSubscription.findMany({
    where: { active: true },
  })

  if (!subscribers.length) {
    return NextResponse.json({ sent: 0, reason: 'no subscribers' })
  }

  const date = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })
  let sent = 0
  const errors: string[] = []

  for (const sub of subscribers) {
    const relevant = sub.topics.length === 0
      ? articles
      : articles.filter(a => sub.topics.includes(a.tag))

    if (!relevant.length) continue

    const unsubLink = `${BASE}/api/news/subscribe?email=${encodeURIComponent(sub.email)}`

    try {
      await resend.emails.send({
        from:    `MotorMacete <${process.env.EMAIL_FROM ?? 'noreply@motormacete.com.br'}>`,
        to:      sub.email,
        subject: `🚗 Seu resumo automotivo — ${new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}`,
        html:    buildEmail(relevant, date, unsubLink),
      })
      sent++
    } catch (e) {
      errors.push(`${sub.email}: ${e}`)
    }
  }

  return NextResponse.json({ sent, total: subscribers.length, errors: errors.length ? errors : undefined })
}
