'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import type { NewsArticle } from '@/app/api/news/route'

// ── Configuração de categorias ────────────────────────────────────────────────

const TAGS = ['Todos', 'Carros', 'Motos', 'SUVs', 'Elétricos', 'Mercado', 'Manutenção'] as const
type Tag = typeof TAGS[number]

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  Carros:     { bg: 'rgba(255,107,53,0.15)',  color: '#FF6B35' },
  Motos:      { bg: 'rgba(59,130,246,0.15)',  color: '#60a5fa' },
  SUVs:       { bg: 'rgba(167,139,250,0.15)', color: '#a78bfa' },
  Elétricos:  { bg: 'rgba(234,179,8,0.15)',   color: '#facc15' },
  Mercado:    { bg: 'rgba(34,197,94,0.12)',   color: '#4ade80' },
  Manutenção: { bg: 'rgba(251,146,60,0.15)',  color: '#fb923c' },
}

// Imagem de placeholder quando a URL da notícia não carrega
const PLACEHOLDER_ICON = (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2a2a32" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
)

// ── Dica do Dia (rotação por dia do mês) ──────────────────────────────────────

type TipIconType = 'wrench' | 'tire' | 'droplet' | 'battery' | 'brake' | 'wind' | 'zap' | 'lamp' | 'shield' | 'car' | 'leaf' | 'alert' | 'settings' | 'fuel'

const DAILY_TIPS: { icon: TipIconType; tip: string }[] = [
  { icon: 'wrench',   tip: 'Verifique o nível de óleo do motor a cada 1.000 km ou antes de viagens longas.' },
  { icon: 'tire',     tip: 'Calibre os pneus a cada 15 dias — a calibragem correta economiza até 3% de combustível.' },
  { icon: 'droplet',  tip: 'Cheque o nível do líquido do radiador mensalmente para evitar superaquecimento.' },
  { icon: 'battery',  tip: 'Bateria com mais de 3 anos? Faça um teste de carga preventivo a cada revisão.' },
  { icon: 'brake',    tip: 'Fluido de freio deve ser trocado a cada 2 anos, independente da quilometragem.' },
  { icon: 'wind',     tip: 'Filtro de ar entupido aumenta o consumo em até 10%. Troque a cada 15.000 km.' },
  { icon: 'zap',      tip: 'Velas de ignição desgastadas causam falhas e aumentam o consumo. Verifique a cada 20.000 km.' },
  { icon: 'lamp',     tip: 'Escova do limpador de para-brisas deve ser trocada anualmente ou ao primeiro sinal de ruído.' },
  { icon: 'shield',   tip: 'Extintor de incêndio vencido? A multa é pesada e o risco, maior. Verifique a data de validade.' },
  { icon: 'settings', tip: 'Alinhamento e balanceamento: faça a cada 10.000 km ou ao trocar pneus para evitar desgaste irregular.' },
  { icon: 'wind',     tip: 'Filtro de cabine protege o ar do habitáculo. Troca indicada a cada 15.000 km.' },
  { icon: 'droplet',  tip: 'Nível baixo de arrefecimento? Nunca abra o radiador com o motor quente — risco de queimaduras.' },
  { icon: 'tire',     tip: 'Rodízio de pneus a cada 10.000 km garante desgaste uniforme e prolonga a vida útil em até 40%.' },
  { icon: 'zap',      tip: 'Cabo do acelerador ou pedal pesado? Lubrificação preventiva custa quase nada e evita panes.' },
  { icon: 'leaf',     tip: 'Etanol ou gasolina? Com câmbio flex, prefira etanol se o preço for até 70% do da gasolina.' },
  { icon: 'wrench',   tip: 'Correia dentada: troque no prazo certo. Um estouro pode destruir o motor e gerar contas altíssimas.' },
  { icon: 'brake',    tip: 'Barulho ao frear? Pastilhas desgastadas. Não espere chegar no metal — é perigoso e mais caro.' },
  { icon: 'wind',     tip: 'Ar-condicionado com menos de 1 ano? Evite ligar no máximo logo ao entrar — prejudica o compressor.' },
  { icon: 'alert',    tip: 'Luz de advertência acesa no painel? Nunca ignore — pode ser desde algo simples até risco grave.' },
  { icon: 'tire',     tip: 'Pneu careca? Risco de aquaplaning em pista molhada aumenta 5x. Troque ao atingir 1,6 mm de sulco.' },
  { icon: 'wrench',   tip: 'Amortecedor ruim aumenta distância de frenagem em até 20%. Teste: pressione cada canto do carro.' },
  { icon: 'fuel',     tip: 'Completar o tanque reduz condensação interna e ajuda a preservar a bomba de combustível.' },
  { icon: 'settings', tip: 'Aperto dos parafusos das rodas: verifique após trocar pneus e sempre com a chave de torque correta.' },
  { icon: 'lamp',     tip: 'Faróis embaçados reduzem visibilidade à noite em até 50%. Polimento ou troca é essencial para segurança.' },
  { icon: 'droplet',  tip: 'Lavar o motor com água em excesso pode danificar sensores. Use produto específico e compressor de ar.' },
  { icon: 'battery',  tip: 'Deixar o carro parado por mais de 15 dias? Desconecte o negativo da bateria para não descarregar.' },
  { icon: 'fuel',     tip: 'Sistema de injeção sujo? O limpador de bico custa R$ 80 e pode recuperar até 15% de potência.' },
  { icon: 'car',      tip: 'Freio motor em descidas longas preserva as pastilhas e evita superaquecimento do sistema.' },
  { icon: 'lamp',     tip: 'Lâmpada queimada? LED dura 5x mais e consome menos energia. Vale o investimento.' },
  { icon: 'car',      tip: 'Revisão preventiva antes de viagens longas é mais barata que qualquer reboque na estrada.' },
  { icon: 'wrench',   tip: 'Caixa de câmbio automático: troca de óleo a cada 40.000 km prolonga a vida do componente.' },
]

function TipIcon({ type }: { type: TipIconType }) {
  const s = { width: 22, height: 22, fill: 'none' as const, stroke: '#FF6B35', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (type) {
    case 'wrench':   return <svg {...s} viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
    case 'tire':     return <svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="22"/><line x1="2" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="22" y2="12"/></svg>
    case 'droplet':  return <svg {...s} viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
    case 'battery':  return <svg {...s} viewBox="0 0 24 24"><rect x="1" y="6" width="18" height="12" rx="2"/><line x1="23" y1="13" x2="23" y2="11"/><line x1="7" y1="12" x2="7" y2="12"/><polyline points="5 12 7 12 9 8 11 16 13 12 15 12"/></svg>
    case 'brake':    return <svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    case 'wind':     return <svg {...s} viewBox="0 0 24 24"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>
    case 'zap':      return <svg {...s} viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
    case 'lamp':     return <svg {...s} viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="3"/><path d="M4.22 4.22l1.42 1.42M1 12h2m16 0h2M4.22 19.78l1.42-1.42M12 21v2m5.36-16.36l1.42-1.42"/><circle cx="12" cy="12" r="4"/></svg>
    case 'shield':   return <svg {...s} viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    case 'car':      return <svg {...s} viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
    case 'leaf':     return <svg {...s} viewBox="0 0 24 24"><path d="M17 8C8 10 5.9 16.17 3.82 22h3.41l1-2.5c2-5 6-8.5 9.77-11.5z"/><path d="M3 22L21 2"/></svg>
    case 'alert':    return <svg {...s} viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    case 'settings': return <svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    case 'fuel':     return <svg {...s} viewBox="0 0 24 24"><path d="M3 22V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16"/><path d="M3 11h11"/><path d="M14 7h1a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L19 7"/></svg>
  }
}

function getDailyTip() {
  const day = new Date().getDate() + new Date().getMonth() * 31
  return DAILY_TIPS[day % DAILY_TIPS.length]
}

// ── Utilitários ───────────────────────────────────────────────────────────────

function timeAgo(d: string) {
  const diff = Date.now() - new Date(d).getTime()
  const h = Math.floor(diff / 3_600_000)
  if (h < 1) return 'agora'
  if (h < 24) return `há ${h}h`
  const days = Math.floor(h / 24)
  if (days === 1) return 'ontem'
  if (days <= 7) return `há ${days} dias`
  return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

// ── Componente de card de artigo ──────────────────────────────────────────────

function ArticleCard({ article }: { article: NewsArticle }) {
  const tc = TAG_COLORS[article.tag] ?? { bg: 'rgba(255,107,53,0.15)', color: '#FF6B35' }
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-xl overflow-hidden flex flex-col transition-all hover:scale-[1.02] hover:shadow-lg"
      style={{ background: '#28282e', border: '1px solid #3a3a42', textDecoration: 'none' }}
    >
      <div
        className="relative flex-shrink-0 flex items-center justify-center"
        style={{ height: 160, background: '#1e1e24', overflow: 'hidden' }}
      >
        {article.image && !imgFailed && (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        )}
        {(!article.image || imgFailed) && PLACEHOLDER_ICON}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)' }} />
        <span
          className="absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ background: tc.bg, color: tc.color, backdropFilter: 'blur(4px)', border: `1px solid ${tc.color}33` }}
        >
          {article.tag}
        </span>
      </div>
      <div className="p-3 flex flex-col flex-1">
        <p
          className="text-sm font-semibold leading-snug mb-auto group-hover:text-orange-400 transition-colors"
          style={{ color: '#f0ede8' }}
        >
          {article.title.length > 100 ? article.title.slice(0, 100) + '…' : article.title}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs truncate" style={{ color: '#555' }}>{article.source}</span>
          <span className="text-xs shrink-0 ml-2" style={{ color: '#444' }}>{timeAgo(article.pubDate)}</span>
        </div>
      </div>
    </a>
  )
}

// ── Formulário de assinatura ──────────────────────────────────────────────────

function SubscribeForm() {
  const [email, setEmail]   = useState('')
  const [topics, setTopics] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')

  function toggleTopic(t: string) {
    setTopics(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/news/subscribe', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email: email.trim(), topics }),
      })
      setStatus(res.ok ? 'ok' : 'err')
    } catch {
      setStatus('err')
    }
  }

  if (status === 'ok') {
    return (
      <div className="text-center py-6">
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(74,222,128,0.12)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <p className="font-bold" style={{ color: '#f0ede8' }}>Inscrição confirmada!</p>
        <p className="text-sm mt-1" style={{ color: '#666' }}>Você receberá o resumo diário no seu email.</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <input
        type="email"
        required
        placeholder="seu@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full rounded-xl px-4 py-3 text-sm outline-none"
        style={{ background: '#28282e', border: '1px solid #3a3a42', color: '#f0ede8' }}
      />
      <div>
        <p className="text-xs mb-2" style={{ color: '#666' }}>Tópicos de interesse (opcional):</p>
        <div className="flex flex-wrap gap-2">
          {(['Carros', 'Motos', 'SUVs', 'Elétricos', 'Mercado', 'Manutenção'] as const).map(t => {
            const tc = TAG_COLORS[t]
            const active = topics.includes(t)
            return (
              <button
                key={t}
                type="button"
                onClick={() => toggleTopic(t)}
                className="px-3 py-1 rounded-full text-xs font-bold transition-all"
                style={{
                  background: active ? tc.bg : '#222228',
                  color:      active ? tc.color : '#555',
                  border:     `1px solid ${active ? tc.color + '44' : '#3a3a42'}`,
                }}
              >
                {t}
              </button>
            )
          })}
        </div>
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
        style={{ background: '#ff6600', color: '#fff' }}
      >
        {status === 'loading' ? 'Inscrevendo...' : 'Receber resumo diário →'}
      </button>
      {status === 'err' && (
        <p className="text-xs text-center" style={{ color: '#f87171' }}>Erro ao inscrever. Tente novamente.</p>
      )}
    </form>
  )
}

// ── Página principal ──────────────────────────────────────────────────────────

export default function NoticiasPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(false)
  const [activeTag, setActiveTag] = useState<Tag>('Todos')
  const [query, setQuery]       = useState('')
  const [debouncedQ, setDebouncedQ] = useState('')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dailyTip = getDailyTip()

  function load(q?: string) {
    setLoading(true); setError(false)
    const url = q ? `/api/news?q=${encodeURIComponent(q)}` : '/api/news'
    fetch(url)
      .then(r => r.json())
      .then(d => { setArticles(d.articles ?? []); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }

  useEffect(() => { load() }, [])

  const handleSearch = useCallback((value: string) => {
    setQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setDebouncedQ(value)
      setActiveTag('Todos')
      load(value.trim() || undefined)
    }, 400)
  }, [])

  const filtered = activeTag === 'Todos'
    ? articles
    : articles.filter(a => a.tag === activeTag)

  const totalByTag = (tag: Tag) =>
    tag === 'Todos' ? articles.length : articles.filter(a => a.tag === tag).length

  return (
    <div className="min-h-screen" style={{ background: '#1c1c22' }}>
      <Header />

      {/* ── Banner ────────────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: 240,
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.70),rgba(0,0,0,0.70)),url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-10 w-full">
          <p className="text-xs font-bold tracking-widest uppercase mb-2"
            style={{ color: '#FF6B35', fontFamily: 'var(--font-barlow-condensed)' }}>
            Mundo Automotivo
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-2"
            style={{ fontFamily: 'var(--font-bebas-neue)' }}>
            Notícias <span style={{ color: '#FF6B35' }}>& Feed Diário</span>
          </h1>
          <p style={{ color: '#9ca3af', fontSize: 14 }}>
            Carros · Motos · SUVs · Elétricos · Mercado · Manutenção — atualizadas a cada hora.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* ── Dica do Dia ──────────────────────────────────────────────────── */}
        <div
          className="flex items-start gap-4 rounded-2xl p-4 mb-8"
          style={{ background: 'rgba(255,102,0,0.08)', border: '1px solid rgba(255,102,0,0.25)' }}
        >
          <div className="flex-shrink-0 mt-0.5"><TipIcon type={dailyTip.icon} /></div>
          <div>
            <span
              className="text-xs font-bold tracking-widest uppercase block mb-1"
              style={{ color: '#FF6B35', fontFamily: 'var(--font-barlow-condensed)' }}
            >
              Dica do dia
            </span>
            <p className="text-sm leading-relaxed" style={{ color: '#d1d5db' }}>{dailyTip.tip}</p>
          </div>
        </div>

        {/* ── Busca ────────────────────────────────────────────────────────── */}
        <div className="relative mb-6">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Buscar notícia, marca ou assunto..."
            value={query}
            onChange={e => handleSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none"
            style={{ background: '#28282e', border: '1px solid #3a3a42', color: '#f0ede8' }}
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setDebouncedQ(''); load() }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
              style={{ color: '#555' }}
            >
              ✕
            </button>
          )}
        </div>

        {/* ── Filtros de categoria ─────────────────────────────────────────── */}
        {!debouncedQ && (
          <div className="flex flex-wrap gap-2 mb-8">
            {TAGS.map(tag => {
              const tc = TAG_COLORS[tag]
              const isActive = activeTag === tag
              const count = totalByTag(tag)
              return (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all"
                  style={{
                    fontFamily: 'var(--font-barlow-condensed)',
                    background: isActive ? (tc?.bg ?? 'rgba(255,107,53,0.15)') : '#222228',
                    color:      isActive ? (tc?.color ?? '#FF6B35') : '#555',
                    border:     `1px solid ${isActive ? (tc?.color ?? '#FF6B35') + '44' : '#3a3a42'}`,
                  }}
                >
                  {tag}
                  {!loading && count > 0 && (
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: isActive ? 'rgba(0,0,0,0.2)' : '#2a2a32', color: isActive ? (tc?.color ?? '#FF6B35') : '#444' }}
                    >
                      {count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        )}

        {/* ── Estados de loading / erro ─────────────────────────────────────── */}
        {loading && (
          <div className="flex flex-col items-center gap-4 py-24">
            <div
              className="w-8 h-8 rounded-full border-2"
              style={{ borderColor: '#2a2a32', borderTopColor: '#FF6B35', animation: 'spin 0.8s linear infinite' }}
            />
            <p style={{ color: '#555', fontSize: 13 }}>
              {debouncedQ ? `Buscando "${debouncedQ}"…` : 'Carregando notícias…'}
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="flex flex-col items-center gap-3 py-24 text-center">
            <p style={{ color: '#f0ede8', fontSize: 18, fontFamily: 'var(--font-bebas-neue)' }}>
              Não foi possível carregar as notícias
            </p>
            <button
              onClick={() => load()}
              className="mt-2 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wide"
              style={{ background: '#FF6B35', color: '#fff', fontFamily: 'var(--font-barlow-condensed)' }}
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* ── Resultado de busca sem artigos ───────────────────────────────── */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-24 text-center">
            <p style={{ color: '#555', fontSize: 14 }}>
              {debouncedQ
                ? `Nenhuma notícia encontrada para "${debouncedQ}".`
                : 'Nenhuma notícia encontrada para este filtro.'}
            </p>
          </div>
        )}

        {/* ── Grid de artigos ──────────────────────────────────────────────── */}
        {!loading && !error && filtered.length > 0 && (
          <>
            {debouncedQ && (
              <p className="text-xs mb-4" style={{ color: '#555' }}>
                {filtered.length} resultado{filtered.length !== 1 ? 's' : ''} para &quot;{debouncedQ}&quot;
              </p>
            )}
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
              {filtered.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </>
        )}

        {/* ── Banner de assinatura ─────────────────────────────────────────── */}
        {!loading && !error && (
          <div
            className="mt-16 rounded-2xl p-8"
            style={{ background: '#28282e', border: '1px solid #3a3a42' }}
          >
            <div className="max-w-md mx-auto text-center mb-6">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto" style={{ background: 'rgba(255,102,0,0.1)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff6600" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <h2
                className="text-2xl font-bold mt-3 mb-2"
                style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}
              >
                Receba o resumo diário
              </h2>
              <p className="text-sm" style={{ color: '#666' }}>
                As principais notícias automotivas no seu email, toda manhã. Gratuito.
              </p>
            </div>
            <div className="max-w-sm mx-auto">
              <SubscribeForm />
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  )
}
