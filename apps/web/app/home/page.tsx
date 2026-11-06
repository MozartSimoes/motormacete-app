'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import type { NewsArticle } from '@/app/api/news/route'

const CATEGORY_IMAGES: Record<string, string[]> = {
  Carros: [
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&q=80',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&q=80',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?w=400&q=80',
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&q=80',
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&q=80',
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&q=80',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=400&q=80',
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80',
  ],
  Motos: [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&q=80',
    'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=400&q=80',
    'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&q=80',
  ],
  Mercado: [
    'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=400&q=80',
    'https://images.unsplash.com/photo-1453906054378-7e9abe744ecb?w=400&q=80',
    'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&q=80',
    'https://images.unsplash.com/photo-1589792923962-537704632910?w=400&q=80',
  ],
  Elétricos: [
    'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&q=80',
    'https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=400&q=80',
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=80',
    'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400&q=80',
  ],
}
const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80',
  'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=400&q=80',
]

function getImage(tag: string, index: number): string {
  const pool = CATEGORY_IMAGES[tag] ?? DEFAULT_IMAGES
  return pool[index % pool.length]
}

function NewsCarousel({ articles }: { articles: NewsArticle[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const scroll = (dir: 'l' | 'r') =>
    ref.current?.scrollBy({ left: dir === 'l' ? -320 : 320, behavior: 'smooth' })

  return (
    <div className="relative" style={{ paddingLeft: 48, paddingRight: 48 }}>
      {/* arrows */}
      <button onClick={() => scroll('l')}
        className="absolute top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-lg transition hover:scale-110"
        style={{ left: 0, background: '#FF6B35', color: '#fff', border: 'none' }}>←</button>
      <button onClick={() => scroll('r')}
        className="absolute top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-lg transition hover:scale-110"
        style={{ right: 0, background: '#FF6B35', color: '#fff', border: 'none' }}>→</button>
      <div ref={ref}
        className="flex gap-4 overflow-x-auto pb-2"
        style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {articles.map((a, i) => (
          <a key={a.id} href={a.link} target="_blank" rel="noopener noreferrer"
            className="rounded-xl overflow-hidden flex-shrink-0 transition-shadow hover:shadow-lg"
            style={{ width: 260, scrollSnapAlign: 'start', background: '#28282e', border: '1px solid #3a3a42', textDecoration: 'none' }}>
            <img src={getImage(a.tag, i)} alt={a.title}
              className="w-full object-cover" style={{ height: 140 }} loading="lazy" />
            <div className="p-3">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full mb-2 inline-block"
                style={{ background: '#FF6B35', color: '#fff' }}>{a.tag}</span>
              <p className="text-sm font-semibold leading-snug mb-2" style={{ color: '#f0ede8' }}
                dangerouslySetInnerHTML={{ __html: a.title.length > 80 ? a.title.slice(0,80)+'…' : a.title }} />
              <p className="text-xs" style={{ color: '#666' }}>{a.source}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

const FEATURES = [
  {
    title: 'Busca Inteligente',
    desc: 'Encontre macetes de mecânicos organizados por marca, modelo e ano do seu veículo',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    title: 'Histórico Completo',
    desc: 'Acesse problemas crônicos, tabela de manutenção e calibragem de pneus do seu modelo',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    title: 'Oficinas Certificadas',
    desc: 'Encontre oficinas próximas de você com profissionais qualificados na sua região',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
  {
    title: 'Gestão Simplificada',
    desc: 'Controle total sobre seus veículos, custos e manutenções em um só lugar',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
  },
]

const NEWS = [
  {
    category: 'Legislação',
    date: '2 Jun 2026',
    title: 'Nova Lei de Trânsito: O que muda para os motoristas',
    excerpt: 'Entenda as principais mudanças na legislação de trânsito que entram em vigor...',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80',
  },
  {
    category: 'Manutenção',
    date: '1 Jun 2026',
    title: 'Manutenção Preventiva: 5 Itens que Você Não Pode Ignorar',
    excerpt: 'Saiba quais são os cuidados essenciais para manter seu veículo sempre em dia...',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=400&q=80',
  },
  {
    category: 'Tecnologia',
    date: '31 Mai 2026',
    title: 'Carros Elétricos: Vale a Pena Investir em 2026?',
    excerpt: 'Análise completa sobre custos, benefícios e infraestrutura de carros elétricos...',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&q=80',
  },
  {
    category: 'Dicas',
    date: '30 Mai 2026',
    title: 'Como Escolher a Oficina Ideal para Seu Veículo',
    excerpt: 'Confira nosso guia completo para encontrar oficinas confiáveis e qualificadas...',
    image: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=400&q=80',
  },
]

const IconSearch = ({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)

const IconCpu = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
    <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
    <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
    <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
    <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
  </svg>
)

const IconCalendar = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)

export default function Home() {
  const router = useRouter()
  const [news, setNews] = useState<NewsArticle[]>([])
  useEffect(() => {
    fetch('/api/news').then(r => r.json()).then(d => setNews(d.articles ?? [])).catch(() => {})

    // track visit once per browser session
    if (!sessionStorage.getItem('mm_visited')) {
      let sessionId = localStorage.getItem('mm_session')
      if (!sessionId) {
        sessionId = crypto.randomUUID()
        localStorage.setItem('mm_session', sessionId)
      }
      sessionStorage.setItem('mm_visited', '1')
      fetch('/api/visit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId }) }).catch(() => {})
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#1c1c22' }}>
      <Header />

      {/* ── HERO — dark com bg image ───────────────────────────────────────── */}
      <section
        className="relative flex items-center"
        style={{
          minHeight: 600,
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url(https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-20 w-full">
          <h1
            className="text-5xl sm:text-7xl font-bold mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-bebas-neue)' }}
          >
            Seu Veículo,
            <br />
            <span style={{ color: '#FF6B35' }}>Sem Segredos.</span>
          </h1>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl leading-relaxed" style={{ color: '#e5e5e5' }}>
            A MotorMacete traz uma maneira de conhecer tudo sobre seu carro e evitar
            problemas. Encontre oficinas, consulte manutenções e mantenha seu veículo sempre protegido.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => router.push('/home/macetes')}
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:opacity-90 active:scale-95"
              style={{ background: '#FF6B35', color: '#fff' }}
            >
              <IconSearch size={20} color="#fff" />
              Pesquisar meu veículo
            </button>
            <button
              onClick={() => router.push('/home/mecanico')}
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all active:scale-95"
              style={{ border: '2px solid #fff', color: '#fff', background: 'transparent' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.color = '#000' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
            >
              <IconCpu size={20} />
              Mecânico Virtual
            </button>
          </div>
        </div>
      </section>

      {/* ── SEARCH ────────────────────────────────────────────────────────── */}
      <section style={{ background: '#1c1c22', borderBottom: '1px solid #2a2a32' }}>
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#FF6B35', fontFamily: 'var(--font-barlow-condensed)' }}>
              Pesquise seu veículo
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
              Qual carro você quer desvendar?
            </h2>
            <p className="mt-2 text-base" style={{ color: '#aaa' }}>Busque por marca, modelo e ano</p>
          </div>
          <button
            onClick={() => router.push('/home/macetes')}
            className="w-full flex items-center justify-center gap-2 py-5 rounded-2xl font-bold text-lg tracking-widest uppercase transition hover:opacity-90 active:scale-[0.99]"
            style={{ background: '#FF6B35', color: '#fff', fontFamily: 'var(--font-barlow-condensed)' }}
          >
            <IconSearch size={20} color="#fff" />
            Revelar os Macetes
          </button>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────── */}
      <section style={{ background: '#222228', borderBottom: '1px solid #2a2a32' }}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex flex-col items-center text-center rounded-2xl p-6"
                style={{ background: '#28282e', border: '1px solid #3a3a42' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ background: 'rgba(255,107,53,0.10)' }}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-sm mb-2" style={{ color: '#f0ede8' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#666' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECALL BANNER ─────────────────────────────────────────────────── */}
      <section style={{ background: '#1c1c22', borderBottom: '1px solid #2a2a32' }}>
        <div className="max-w-6xl mx-auto px-6 py-10">
          <a href="/home/recall" style={{ textDecoration: 'none' }}>
            <div
              className="flex flex-col sm:flex-row items-center gap-5 rounded-2xl px-8 py-6 transition hover:opacity-90 cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #7c2d12 0%, #991b1b 50%, #7c2d12 100%)', border: '1px solid #dc2626' }}
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(220,38,38,0.3)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fca5a5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#fca5a5' }}>
                  Segurança em primeiro lugar
                </p>
                <h3 className="text-xl sm:text-2xl font-bold mb-1" style={{ color: '#fff', fontFamily: 'var(--font-bebas-neue)' }}>
                  Seu veículo tem recall ativo?
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#fecaca' }}>
                  Consulte por marca, modelo ou chassi. Mais de 20 campanhas ativas — alguns defeitos são risco de incêndio ou falha de freios.
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition"
                  style={{ background: '#dc2626', color: '#fff' }}>
                  Verificar Recall →
                </span>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* ── NEWS CAROUSEL ─────────────────────────────────────────────────── */}
      {news.length > 0 && (
        <section style={{ background: '#1c1c22', borderBottom: '1px solid #2a2a32' }}>
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-1" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
                  Últimas Notícias
                </h2>
                <p className="text-sm" style={{ color: '#aaa' }}>Fique por dentro do mundo automotivo</p>
              </div>
              <a href="/home/noticias" className="font-medium text-sm transition hover:opacity-80" style={{ color: '#FF6B35', textDecoration: 'none' }}>
                Ver todas →
              </a>
            </div>
            <NewsCarousel articles={news.slice(0, 12)} />
          </div>
        </section>
      )}

      {/* ── WORKSHOP CTA ──────────────────────────────────────────────────── */}
      <section style={{ background: '#222228', color: '#fff', borderTop: '1px solid #2a2a32' }}>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-bebas-neue)' }}
          >
            Você é dono de oficina?
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto leading-relaxed" style={{ color: '#aaa' }}>
            Cadastre sua oficina na MotorMacete e conecte-se com milhares de clientes em potencial
          </p>
          <button
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent('mm:open-auth', { detail: { step: 'register', type: 'mechanic' } })
              )
            }
            className="px-10 py-4 rounded-xl font-semibold text-lg transition hover:opacity-90 active:scale-95"
            style={{ background: '#FF6B35', color: '#fff' }}
          >
            Cadastrar Oficina
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
