import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ARTICLES, getArticle, type Section } from '@/lib/artigos'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const revalidate = 86400

export function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}

  return {
    title: `${article.title} | MotorMacete`,
    description: article.description,
    keywords: [article.categoryLabel, 'manutenção automotiva', 'mecânica', article.title],
    alternates: { canonical: `https://motormacete.com.br/artigos/${slug}` },
    openGraph: {
      title: `${article.title} | MotorMacete`,
      description: article.description,
      url: `https://motormacete.com.br/artigos/${slug}`,
      siteName: 'MotorMacete',
      locale: 'pt_BR',
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: ['MotorMacete'],
    },
  }
}

const BOX_STYLE = {
  tip:    { bg: 'rgba(255,102,0,0.08)', border: 'rgba(255,102,0,0.3)', color: '#ff6600', label: '💡 Dica' },
  warn:   { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.3)', color: '#f59e0b', label: '⚠️ Atenção' },
  danger: { bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.3)', color: '#ef4444', label: '🚨 Importante' },
}

function RenderSection({ s }: { s: Section }) {
  switch (s.t) {
    case 'h2':
      return <h2 className="text-2xl font-black text-white mt-10 mb-4">{s.v}</h2>
    case 'h3':
      return <h3 className="text-lg font-bold text-orange-300 mt-6 mb-3">{s.v}</h3>
    case 'p':
      return <p className="text-slate-300 leading-relaxed mb-4">{s.v}</p>
    case 'ul':
      return (
        <ul className="space-y-2 mb-4 ml-1">
          {s.v.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-slate-300 text-sm leading-relaxed">
              <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500" />
              {item}
            </li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol className="space-y-2 mb-4 ml-1">
          {s.v.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
              <span
                className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                style={{ background: 'rgba(255,102,0,0.2)', color: '#ff6600' }}
              >
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      )
    case 'box': {
      const style = BOX_STYLE[s.kind]
      return (
        <div
          className="rounded-xl p-4 mb-4 text-sm leading-relaxed"
          style={{ background: style.bg, border: `1px solid ${style.border}`, color: style.color }}
        >
          <span className="font-bold">{style.label}: </span>
          <span style={{ color: '#d1d5db' }}>{s.v}</span>
        </div>
      )
    }
    default:
      return null
  }
}

export default async function ArtigoPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const publishedDate = new Date(article.publishedAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
  const updatedDate   = new Date(article.updatedAt).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  const color = {
    motor: '#f59e0b', freios: '#ef4444', suspensao: '#3b82f6',
    eletrica: '#22c55e', transmissao: '#8b5cf6', manutencao: '#ff6600',
  }[article.category] ?? '#ff6600'

  const relatedArticles = ARTICLES
    .filter(a => a.slug !== slug && a.category === article.category)
    .slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        url: `https://motormacete.com.br/artigos/${slug}`,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        author: { '@type': 'Organization', name: 'MotorMacete', url: 'https://motormacete.com.br' },
        publisher: { '@type': 'Organization', name: 'MotorMacete', url: 'https://motormacete.com.br' },
        inLanguage: 'pt-BR',
        about: { '@type': 'Thing', name: 'Manutenção Automotiva' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'MotorMacete', item: 'https://motormacete.com.br' },
          { '@type': 'ListItem', position: 2, name: 'Artigos', item: 'https://motormacete.com.br/artigos' },
          { '@type': 'ListItem', position: 3, name: article.title, item: `https://motormacete.com.br/artigos/${slug}` },
        ],
      },
    ],
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Header />

      <div className="mx-auto max-w-3xl px-6 py-10">

        {/* ── Breadcrumb ── */}
        <nav className="mb-8 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-orange-300 transition">Início</Link>
          <span>/</span>
          <Link href="/artigos" className="hover:text-orange-300 transition">Artigos</Link>
          <span>/</span>
          <span className="text-orange-300 truncate max-w-[200px]">{article.title}</span>
        </nav>

        {/* ── Hero ── */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{ background: `${color}20`, color, border: `1px solid ${color}33` }}
            >
              {article.categoryLabel}
            </span>
            <span className="text-xs text-slate-600">{article.readingTime} min de leitura</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black leading-tight text-white mb-5">
            {article.title}
          </h1>
          <p className="text-base text-slate-400 leading-relaxed mb-5">
            {article.description}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 border-t border-white/5 pt-4">
            <span>Publicado em <time dateTime={article.publishedAt}>{publishedDate}</time></span>
            <span>·</span>
            <span>Atualizado em <time dateTime={article.updatedAt}>{updatedDate}</time></span>
            <span>·</span>
            <span>Equipe MotorMacete</span>
          </div>
        </div>

        {/* ── Content ── */}
        <article className="prose-invert max-w-none">
          {article.content.map((s, i) => (
            <RenderSection key={i} s={s} />
          ))}
        </article>

        {/* ── CTA Mecânico ── */}
        <section className="mt-12 rounded-[28px] border border-orange-500/20 bg-orange-500/5 p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.3em] text-orange-300 font-semibold mb-2">IA especializada em veículos</p>
              <h2 className="text-xl font-black text-white mb-2">
                Ficou com dúvida sobre o seu veículo?
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                O Mecânico Virtual responde perguntas técnicas específicas sobre seu carro, incluindo diagnósticos,
                sintomas e estimativas de custo de reparo. As 3 primeiras perguntas são gratuitas.
              </p>
            </div>
            <Link
              href="/home/mecanico"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-orange-600 px-6 py-3 text-sm font-bold text-white hover:bg-orange-500 transition"
            >
              🔧 Abrir Mecânico Virtual
            </Link>
          </div>
        </section>

        {/* ── Related articles ── */}
        {relatedArticles.length > 0 && (
          <section className="mt-12">
            <h2 className="text-lg font-bold text-white mb-5">
              Artigos relacionados
            </h2>
            <div className="space-y-3">
              {relatedArticles.map(a => (
                <Link
                  key={a.slug}
                  href={`/artigos/${a.slug}`}
                  className="group flex items-start gap-3 rounded-xl border border-white/10 bg-[#0f0f12] p-4 hover:border-orange-600/40 transition-colors"
                >
                  <span className="shrink-0 mt-0.5 text-orange-600">→</span>
                  <div>
                    <p className="font-semibold text-white text-sm group-hover:text-orange-300 transition-colors">
                      {a.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{a.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Back link ── */}
        <div className="mt-10 pt-6 border-t border-white/5">
          <Link href="/artigos" className="text-sm text-slate-500 hover:text-orange-300 transition">
            ← Ver todos os artigos
          </Link>
        </div>

        {/* ── Disclaimer ── */}
        <p className="mt-6 text-xs text-slate-700 leading-relaxed">
          As informações neste artigo são de caráter educativo e informativo. Consulte sempre um mecânico de confiança
          para diagnósticos e serviços no seu veículo. Os intervalos de manutenção podem variar conforme o modelo,
          condições de uso e fabricante das peças.
        </p>

      </div>
      <Footer />
    </main>
  )
}
