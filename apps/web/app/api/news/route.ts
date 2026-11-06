import { NextRequest, NextResponse } from 'next/server'

export interface NewsArticle {
  id: string
  title: string
  link: string
  pubDate: string
  source: string
  tag: string
  image?: string
}

// ── Pools de imagens por categoria (round-robin no servidor) ──────────────────

const IMAGE_POOLS: Record<string, string[]> = {
  Carros: [
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=75',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&q=75',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=75',
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=75',
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=75',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=75',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=75',
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=75',
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=75',
    'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&q=75',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=75',
    'https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?w=600&q=75',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=75',
    'https://images.unsplash.com/photo-1552519507-da3b142f9b3d?w=600&q=75',
    'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&q=75',
    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=75',
    'https://images.unsplash.com/photo-1605559424843-9073fd6be290?w=600&q=75',
    'https://images.unsplash.com/photo-1535655685871-dc8158a4bf06?w=600&q=75',
    'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=75',
    'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=600&q=75',
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=75',
    'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?w=600&q=75',
    'https://images.unsplash.com/photo-1583267746897-2cf415887172?w=600&q=75',
    'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=600&q=75',
  ],
  Motos: [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75',
    'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=75',
    'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&q=75',
    'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=75',
    'https://images.unsplash.com/photo-1571188654248-7a89213915f7?w=600&q=75',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=75',
    'https://images.unsplash.com/photo-1525160354320-d8e92641b563?w=600&q=75',
    'https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?w=600&q=75',
    'https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=600&q=75',
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=75',
    'https://images.unsplash.com/photo-1622737133914-8bb52b0d8a34?w=600&q=75',
    'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=75',
    'https://images.unsplash.com/photo-1558981852-426c6b3a2e9a?w=600&q=75',
    'https://images.unsplash.com/photo-1532264523420-881a47db012d?w=600&q=75',
    'https://images.unsplash.com/photo-1609360498099-61eba2bb95e0?w=600&q=75',
    'https://images.unsplash.com/photo-1476357471311-43c0db9fb2b4?w=600&q=75',
  ],
  SUVs: [
    'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=75',
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=75',
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=75',
    'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=600&q=75',
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=75',
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=75',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=75',
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=75',
    'https://images.unsplash.com/photo-1552519507-da3b142f9b3d?w=600&q=75',
    'https://images.unsplash.com/photo-1605559424843-9073fd6be290?w=600&q=75',
    'https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?w=600&q=75',
    'https://images.unsplash.com/photo-1535655685871-dc8158a4bf06?w=600&q=75',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=75',
    'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&q=75',
    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=75',
    'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=600&q=75',
  ],
  Elétricos: [
    'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=75',
    'https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=600&q=75',
    'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=75',
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=75',
    'https://images.unsplash.com/photo-1671723991261-9fde19af5b99?w=600&q=75',
    'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=75',
    'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&q=75',
    'https://images.unsplash.com/photo-1578811218613-b63e8e4d5b20?w=600&q=75',
    'https://images.unsplash.com/photo-1554744512-d6c603f27c54?w=600&q=75',
    'https://images.unsplash.com/photo-1649682203010-e42f1929090a?w=600&q=75',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=75',
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=75',
  ],
  Mercado: [
    'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=600&q=75',
    'https://images.unsplash.com/photo-1453906054378-7e9abe744ecb?w=600&q=75',
    'https://images.unsplash.com/photo-1589792923962-537704632910?w=600&q=75',
    'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=75',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=75',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=75',
    'https://images.unsplash.com/photo-1535655685871-dc8158a4bf06?w=600&q=75',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&q=75',
    'https://images.unsplash.com/photo-1583267746897-2cf415887172?w=600&q=75',
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=75',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=75',
    'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&q=75',
  ],
  Manutenção: [
    'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&q=75',
    'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=600&q=75',
    'https://images.unsplash.com/photo-1635773054018-c59e96279af3?w=600&q=75',
    'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&q=75',
    'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=75',
    'https://images.unsplash.com/photo-1543465077-db45d34b88a5?w=600&q=75',
    'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=75',
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=75',
    'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&q=75',
    'https://images.unsplash.com/photo-1504222490345-c075b626285e?w=600&q=75',
    'https://images.unsplash.com/photo-1590508179966-5e7b7889a5d4?w=600&q=75',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=75',
  ],
}

const FEEDS = [
  { url: 'https://news.google.com/rss/search?q=carros+lançamento+brasil&hl=pt-BR&gl=BR&ceid=BR:pt',           tag: 'Carros' },
  { url: 'https://news.google.com/rss/search?q=motos+lançamento+brasil&hl=pt-BR&gl=BR&ceid=BR:pt',           tag: 'Motos' },
  { url: 'https://news.google.com/rss/search?q=SUV+crossover+lançamento+brasil&hl=pt-BR&gl=BR&ceid=BR:pt',   tag: 'SUVs' },
  { url: 'https://news.google.com/rss/search?q=elétrico+híbrido+carro+brasil&hl=pt-BR&gl=BR&ceid=BR:pt',     tag: 'Elétricos' },
  { url: 'https://news.google.com/rss/search?q=recall+automotivo+brasil&hl=pt-BR&gl=BR&ceid=BR:pt',          tag: 'Mercado' },
  { url: 'https://news.google.com/rss/search?q=manutenção+carro+mecânica+dica&hl=pt-BR&gl=BR&ceid=BR:pt',    tag: 'Manutenção' },
]

// ── RSS parser ────────────────────────────────────────────────────────────────

function cdata(s: string) {
  return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim()
}

function getTag(xml: string, tag: string) {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'))
  return m ? cdata(m[1]) : ''
}

function extractImage(block: string): string {
  // <media:content url="..." medium="image">
  const mc = block.match(/media:content[^>]+url="([^"]+)"/i)
  if (mc) return mc[1]
  // <media:thumbnail url="...">
  const mt = block.match(/media:thumbnail[^>]+url="([^"]+)"/i)
  if (mt) return mt[1]
  // <enclosure url="..." type="image/...">
  const enc = block.match(/<enclosure[^>]+url="([^"]+)"[^>]+type="image/i)
    ?? block.match(/<enclosure[^>]+type="image[^"]*"[^>]+url="([^"]+)"/i)
  if (enc) return enc[1]
  // Ignoramos <img> dentro de <description> pois são imagens aleatórias do site fonte
  return ''
}

function parseItems(xml: string, tag: string): NewsArticle[] {
  const items: NewsArticle[] = []
  const re = /<item>([\s\S]*?)<\/item>/g
  let m: RegExpExecArray | null
  while ((m = re.exec(xml)) !== null) {
    const block    = m[1]
    const rawTitle = getTag(block, 'title')
    const link     = getTag(block, 'link') || getTag(block, 'guid')
    const pubDate  = getTag(block, 'pubDate') || new Date().toISOString()
    const image    = extractImage(block) || undefined

    const dashIdx = rawTitle.lastIndexOf(' - ')
    const title  = dashIdx > 0 ? rawTitle.slice(0, dashIdx).trim() : rawTitle
    const source = dashIdx > 0 ? rawTitle.slice(dashIdx + 3).trim() : 'Notícia'

    if (!title || !link) continue
    items.push({ id: link, title, link, pubDate, source, tag, image })
  }
  return items
}

// ── Cache in-memory 1 hora ────────────────────────────────────────────────────

let cache: { articles: NewsArticle[]; ts: number } | null = null
const TTL = 60 * 60 * 1000

async function refreshCache(): Promise<NewsArticle[]> {
  const results = await Promise.allSettled(
    FEEDS.map(({ url, tag }) =>
      fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MotorMacete/1.0; +https://motormacete.com.br)' },
        signal: AbortSignal.timeout(8000),
      })
        .then(r => r.text())
        .then(xml => parseItems(xml, tag))
        .catch(() => [] as NewsArticle[]),
    ),
  )

  const seen = new Set<string>()
  const allArticles: NewsArticle[] = []

  for (const r of results) {
    if (r.status !== 'fulfilled') continue
    for (const art of r.value) {
      if (seen.has(art.title)) continue
      seen.add(art.title)
      allArticles.push(art)
    }
  }

  allArticles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())

  // Atribui imagens únicas por round-robin por categoria para artigos sem imagem
  const tagCounters: Record<string, number> = {}
  for (const article of allArticles) {
    if (!article.image) {
      const pool = IMAGE_POOLS[article.tag] ?? IMAGE_POOLS.Carros
      const idx = tagCounters[article.tag] ?? 0
      article.image = pool[idx % pool.length]
      tagCounters[article.tag] = idx + 1
    }
  }

  cache = { articles: allArticles, ts: Date.now() }
  return allArticles
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.toLowerCase().trim()

  if (!cache || Date.now() - cache.ts >= TTL) {
    await refreshCache()
  }

  let articles = cache!.articles

  if (q) {
    articles = articles.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.tag.toLowerCase().includes(q) ||
      a.source.toLowerCase().includes(q)
    )
  }

  return NextResponse.json({ articles: articles.slice(0, 60) })
}
