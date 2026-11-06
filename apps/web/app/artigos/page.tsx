import type { Metadata } from 'next'
import Link from 'next/link'
import { ARTICLES, CATEGORY_ORDER, type Article } from '@/lib/artigos'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Artigos sobre Manutenção Automotiva | MotorMacete',
  description: 'Guias técnicos completos sobre manutenção de veículos: correia dentada, óleo do motor, freios, pneus, bateria e muito mais. Escritos por mecânicos experientes.',
  keywords: ['manutenção automotiva', 'guias mecânica', 'correia dentada', 'óleo do motor', 'pastilhas de freio', 'calibragem pneus'],
  alternates: { canonical: 'https://motormacete.com.br/artigos' },
  openGraph: {
    title: 'Artigos sobre Manutenção Automotiva | MotorMacete',
    description: 'Guias técnicos completos sobre manutenção de veículos escritos por mecânicos experientes.',
    url: 'https://motormacete.com.br/artigos',
    siteName: 'MotorMacete',
    locale: 'pt_BR',
    type: 'website',
  },
}

const CATEGORY_COLOR: Record<string, string> = {
  motor:       '#f59e0b',
  freios:      '#ef4444',
  suspensao:   '#3b82f6',
  eletrica:    '#22c55e',
  transmissao: '#8b5cf6',
  manutencao:  '#ff6600',
}

function ArticleCard({ article }: { article: Article }) {
  const color = CATEGORY_COLOR[article.category] ?? '#ff6600'
  const date = new Date(article.updatedAt).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })

  return (
    <Link
      href={`/artigos/${article.slug}`}
      className="group block rounded-2xl border border-white/10 bg-[#0f0f12] p-5 hover:border-orange-600/40 transition-colors"
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className="text-xs font-bold px-2 py-0.5 rounded"
          style={{ background: `${color}20`, color, border: `1px solid ${color}33` }}
        >
          {article.categoryLabel}
        </span>
        <span className="text-xs text-slate-600">{article.readingTime} min de leitura</span>
      </div>
      <h2 className="font-bold text-white text-base leading-snug mb-2 group-hover:text-orange-300 transition-colors">
        {article.title}
      </h2>
      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
        {article.description}
      </p>
      <p className="text-xs text-slate-700 mt-3">Atualizado em {date}</p>
    </Link>
  )
}

export default function ArtigosPage() {
  const byCategory = CATEGORY_ORDER.map(cat => ({
    cat,
    articles: ARTICLES.filter(a => a.category === cat),
  })).filter(g => g.articles.length > 0)

  return (
    <main className="min-h-screen bg-[#050505] text-white">

      <Header />

      <div className="mx-auto max-w-5xl px-6 py-10">

        {/* ── Breadcrumb ── */}
        <nav className="mb-8 flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-orange-300 transition">Início</Link>
          <span>/</span>
          <span className="text-orange-300">Artigos</span>
        </nav>

        {/* ── Hero ── */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.35em] text-orange-300 mb-3">
            Guias técnicos gratuitos
          </p>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-4">
            Artigos sobre <span className="text-orange-600">Manutenção</span>
          </h1>
          <p className="text-base text-slate-400 leading-relaxed max-w-2xl">
            Guias completos escritos por mecânicos profissionais sobre os principais itens de manutenção
            do seu veículo. Aprenda a identificar problemas, entender intervalos de troca e economizar
            em reparos desnecessários.
          </p>
        </div>

        {/* ── Articles by category ── */}
        <div className="space-y-12">
          {byCategory.map(({ cat, articles }) => (
            <section key={cat}>
              <h2
                className="text-xs uppercase tracking-[0.35em] font-bold mb-5"
                style={{ color: CATEGORY_COLOR[cat] }}
              >
                {articles[0].categoryLabel}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map(article => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* ── CTA ── */}
        <section className="mt-16 rounded-[28px] border border-orange-500/20 bg-orange-500/5 p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.3em] text-orange-300 font-semibold mb-2">IA especializada em veículos</p>
              <h2 className="text-xl font-black text-white mb-2">
                Tem dúvida específica sobre o seu carro?
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                O Mecânico Virtual responde dúvidas técnicas sobre sintomas, diagnósticos e custos de reparo
                usando inteligência artificial. As 3 primeiras perguntas são gratuitas, sem cadastro.
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

      </div>
      <Footer />
    </main>
  )
}
