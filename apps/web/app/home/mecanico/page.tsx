'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'

interface BrandOption { code: string; name: string }
interface ModelOption { id: string;   name: string }
interface YearOption  { code: string; name: string }
interface VehicleInfo { brand: string; model: string; year: string; fuel: string }
interface Message     { role: 'user' | 'assistant'; content: string }

const SUGGESTIONS = [
  'Está saindo fumaça preta pelo escapamento, o que pode ser?',
  'Meu carro falha ao acelerar, principalmente em subidas.',
  'O motor está superaquecendo com frequência.',
  'Ouço um barulho de arranhado ao frear.',
  'A luz de check engine acendeu mas o carro parece normal.',
  'O câmbio automático está trocando de forma brusca.',
  'Meu carro não pega no frio, mas quente funciona normal.',
  'Consumo de combustível aumentou muito sem motivo aparente.',
]

function detectFuel(yearName: string): string {
  const n = yearName.toUpperCase()
  if (n.includes('DIESEL')) return 'Diesel'
  if (n.includes('ELÉTRIC') || n.includes('ELETRIC')) return 'Elétrico'
  if (n.includes('HÍBRID') || n.includes('HIBRID')) return 'Híbrido'
  if (n.includes('GASOLINA')) return 'Gasolina'
  return 'Flex'
}

// ── Markdown renderer ─────────────────────────────────────────────────────────
function renderMarkdown(text: string): React.ReactNode {
  return text.split('\n').map((line, li, arr) => {
    const parts: React.ReactNode[] = []
    const regex = /\*\*(.+?)\*\*|\*(.+?)\*/g
    let lastIndex = 0
    let match
    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIndex) parts.push(line.slice(lastIndex, match.index))
      if (match[1] !== undefined) parts.push(<strong key={match.index}>{match[1]}</strong>)
      else if (match[2] !== undefined) parts.push(<em key={match.index}>{match[2]}</em>)
      lastIndex = match.index + match[0].length
    }
    if (lastIndex < line.length) parts.push(line.slice(lastIndex))
    return (
      <span key={li}>
        {parts.length > 0 ? parts : line}
        {li < arr.length - 1 && <br />}
      </span>
    )
  })
}

// ── Streaming text renderer ────────────────────────────────────────────────────
function MechanicMessage({ text, streaming }: { text: string; streaming: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[18px] shrink-0 mt-0.5"
        style={{ background: 'linear-gradient(135deg, #ff8c00, #ff5500)' }}>
        🔧
      </div>
      <div className="flex-1 rounded-2xl rounded-tl-sm px-4 py-3 text-[14px] leading-relaxed"
        style={{ background: '#30303a', border: '1px solid #3a3a42', color: '#ffffff', maxWidth: '80%' }}>
        {renderMarkdown(text)}
        {streaming && (
          <span className="inline-block w-[2px] h-[14px] ml-0.5 rounded-full align-middle"
            style={{ background: '#ff6600', animation: 'blink 0.8s steps(1) infinite' }} />
        )}
      </div>
    </div>
  )
}

function UserMessage({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="rounded-2xl rounded-tr-sm px-4 py-3 text-[14px] leading-relaxed"
        style={{ background: '#ff6600', color: '#111', fontWeight: 500, maxWidth: '75%' }}>
        {text}
      </div>
    </div>
  )
}

// ── Selector card ──────────────────────────────────────────────────────────────
export default function MecanicoPage() {
  const router   = useRouter()
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLTextAreaElement>(null)

  // Vehicle selection
  const [vType,    setVType]    = useState<'carro' | 'moto'>('carro')
  const [brands,   setBrands]   = useState<BrandOption[]>([])
  const [selBrand, setSelBrand] = useState<BrandOption | null>(null)
  const [models,   setModels]   = useState<ModelOption[]>([])
  const [selModel, setSelModel] = useState<ModelOption | null>(null)
  const [years,    setYears]    = useState<YearOption[]>([])
  const [selYear,  setSelYear]  = useState<YearOption | null>(null)
  const [loadingB, setLoadingB] = useState(false)
  const [loadingM, setLoadingM] = useState(false)
  const [loadingY, setLoadingY] = useState(false)

  // Chat
  const [phase,     setPhase]     = useState<'select' | 'chat'>('select')
  const [vehicle,   setVehicle]   = useState<VehicleInfo | null>(null)
  const [messages,  setMessages]  = useState<Message[]>([])
  const [input,     setInput]     = useState('')
  const [streaming, setStreaming] = useState(false)
  const [streamBuf, setStreamBuf] = useState('')

  // Controle de acesso anônimo
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const [anonUsed,   setAnonUsed]   = useState(0)
  const ANON_LIMIT = 3

  // ── Verifica auth e carrega contador anônimo ──────────────────────────────
  useEffect(() => {
    fetch('/api/auth/me').then(r => {
      if (r.ok) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
        const stored = parseInt(localStorage.getItem('mm_anon_queries') ?? '0', 10)
        setAnonUsed(stored)
      }
    })
  }, [])

  // ── Cascades ───────────────────────────────────────────────────────────────
  useEffect(() => {
    setBrands([]); setSelBrand(null); setModels([]); setSelModel(null); setYears([]); setSelYear(null)
    setLoadingB(true)
    fetch(`/api/vehicles?type=${vType}`).then(r => r.json()).then(d => { setBrands(d.brands ?? []); setLoadingB(false) })
  }, [vType])

  useEffect(() => {
    if (!selBrand) { setModels([]); setSelModel(null); setYears([]); setSelYear(null); return }
    setLoadingM(true)
    fetch(`/api/vehicles?type=${vType}&brandCode=${selBrand.code}`).then(r => r.json()).then(d => { setModels(d.models ?? []); setSelModel(null); setYears([]); setSelYear(null); setLoadingM(false) })
  }, [selBrand, vType])

  useEffect(() => {
    if (!selModel || !selBrand) { setYears([]); setSelYear(null); return }
    setLoadingY(true)
    fetch(`/api/vehicles?type=${vType}&brandCode=${selBrand.code}&modelCode=${selModel.id}`).then(r => r.json()).then(d => { setYears(d.years ?? []); setSelYear(null); setLoadingY(false) })
  }, [selModel, selBrand, vType])

  // ── Auto-scroll ───────────────────────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamBuf])

  // ── Start chat ────────────────────────────────────────────────────────────
  function startChat() {
    if (!selBrand || !selModel || !selYear) return
    const fuel = detectFuel(selYear.name)
    const yearNum = selYear.name.slice(0, 4)
    const v: VehicleInfo = { brand: selBrand.name, model: selModel.name, year: yearNum, fuel }
    setVehicle(v)
    setPhase('chat')
    setTimeout(() => inputRef.current?.focus(), 300)
  }

  // ── Send message ──────────────────────────────────────────────────────────
  async function send(text?: string) {
    const question = (text ?? input).trim()
    if (!question || streaming || !vehicle) return
    if (isLoggedIn === false && anonUsed >= ANON_LIMIT) return
    setInput('')

    const userMsg: Message = { role: 'user', content: question }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setStreaming(true)
    setStreamBuf('')

    try {
      const res = await fetch('/api/mecanico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicle,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        setMessages(prev => [...prev, { role: 'assistant', content: err.error ?? 'Desculpe, ocorreu um erro. Tente novamente.' }])
        setStreaming(false)
        return
      }

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let full = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        full += chunk
        setStreamBuf(full)
      }

      setMessages(prev => [...prev, { role: 'assistant', content: full }])
      setStreamBuf('')

      // Incrementa contador de consultas anônimas
      if (isLoggedIn === false) {
        const newCount = anonUsed + 1
        setAnonUsed(newCount)
        localStorage.setItem('mm_anon_queries', String(newCount))
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Falha na conexão. Verifique sua internet e tente novamente.' }])
    } finally {
      setStreaming(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const canStart = !!(selBrand && selModel && selYear)

  const FS = { background: '#222228', border: '1px solid #3a3a42', color: '#f0ede8' }
  const SEL = 'w-full px-4 py-[13px] rounded-xl text-[14px] outline-none appearance-none cursor-pointer disabled:cursor-not-allowed'

  // ── PHASE: SELECT VEHICLE ─────────────────────────────────────────────────
  if (phase === 'select') {
    return (
      <div className="min-h-screen" style={{ background: '#1c1c22' }}>
        <Header />
        <div className="max-w-[620px] mx-auto px-4 py-12">

          {/* Title */}
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <p className="text-[12px] font-bold tracking-[3px] uppercase mb-1"
                style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
                IA Automotiva
              </p>
              <h1 className="text-[42px] leading-none mb-2"
                style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
                Mecânico Virtual
              </h1>
              <p className="text-[14px]" style={{ color: '#666' }}>
                Descreva o problema do seu veículo e receba um diagnóstico detalhado,
                causas prováveis e custo estimado — instantaneamente.
              </p>
            </div>
            <button onClick={() => router.push('/home')}
              className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center text-[16px] hover:bg-white/5 transition-all"
              style={{ border: '1px solid #3a3a42', color: '#555' }}>✕</button>
          </div>

          {/* Vehicle selector card */}
          <div className="rounded-2xl p-6 mb-5" style={{ background: '#28282e', border: '1px solid #3a3a42' }}>
            <p className="text-[12px] font-bold uppercase tracking-[2px] mb-5"
              style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
              Qual é o seu veículo?
            </p>

            {/* Type toggle */}
            <div className="flex gap-2 mb-5">
              {(['carro', 'moto'] as const).map(t => (
                <button key={t} onClick={() => setVType(t)}
                  className="flex-1 py-2.5 rounded-xl text-[13px] font-bold uppercase tracking-[1px] transition-all"
                  style={{
                    fontFamily: 'var(--font-barlow-condensed)',
                    background: vType === t ? '#ff6600' : '#222228',
                    color: vType === t ? '#fff' : '#555',
                    border: `1px solid ${vType === t ? 'transparent' : '#3a3a42'}`,
                  }}>
                  <span className="flex items-center gap-1.5 justify-center">
                    {t === 'carro'
                      ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5a2 2 0 0 1-2 2h-2"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
                      : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h-5l-3 7"/><path d="m9 6 2 7h7"/><path d="M12 6V3"/></svg>
                    }
                    {t === 'carro' ? 'Carro' : 'Moto'}
                  </span>
                </button>
              ))}
            </div>

            {/* Cascades */}
            <div className="flex flex-col gap-3">
              {[
                { label: 'Marca', val: selBrand?.name ?? '', opts: brands.map(b => b.name), loading: loadingB,
                  disabled: false, onChange: (n: string) => { setSelBrand(brands.find(b => b.name === n) ?? null); setSelModel(null); setSelYear(null) } },
                { label: 'Modelo', val: selModel?.name ?? '', opts: models.map(m => m.name), loading: loadingM,
                  disabled: !selBrand, onChange: (n: string) => { setSelModel(models.find(m => m.name === n) ?? null); setSelYear(null) } },
                { label: 'Ano / Versão', val: selYear?.name ?? '', opts: years.map(y => y.name), loading: loadingY,
                  disabled: !selModel, onChange: (n: string) => setSelYear(years.find(y => y.name === n) ?? null) },
              ].map(({ label, val, opts, loading, disabled, onChange }) => (
                <div key={label}>
                  <label className="text-[10px] font-bold uppercase tracking-[1.5px] mb-1.5 block"
                    style={{ color: '#555', fontFamily: 'var(--font-barlow-condensed)' }}>
                    {label}
                  </label>
                  <select className={SEL} style={FS} disabled={disabled || loading}
                    value={val} onChange={e => onChange(e.target.value)}>
                    <option value="">{loading ? 'Carregando...' : '— Selecione —'}</option>
                    {opts.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={startChat}
            disabled={!canStart}
            className="w-full py-4 rounded-xl text-[16px] font-black uppercase tracking-[2px] transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: canStart ? 'linear-gradient(135deg, #ff8c00, #ff5500)' : '#2a2a32',
              color: canStart ? '#fff' : '#555',
              fontFamily: 'var(--font-bebas-neue)',
              boxShadow: canStart ? '0 0 32px #ff660033' : 'none',
            }}
          >
            🔧 Tirar Dúvida com o Mecânico Virtual
          </button>

          {!canStart && (
            <p className="text-center text-[12px] mt-3" style={{ color: '#333' }}>
              Selecione marca, modelo e ano para continuar
            </p>
          )}
        </div>

        <style>{`.blink-cursor { animation: blink 0.8s steps(1) infinite; } @keyframes blink { 50% { opacity: 0; } }`}</style>
      </div>
    )
  }

  // ── PHASE: CHAT ───────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col" style={{ height: '100dvh', background: '#1c1c22' }}>
      <Header />

      {/* Chat header */}
      <div className="shrink-0 px-4 py-3 flex items-center gap-3" style={{ borderBottom: '1px solid #2a2a32', background: '#1c1c22' }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[18px]"
          style={{ background: 'linear-gradient(135deg, #ff8c00, #ff5500)' }}>
          🔧
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold" style={{ color: '#f0ede8' }}>Mecânico Virtual</p>
          <p className="text-[11px] truncate" style={{ color: '#ff6600' }}>
            {vehicle?.brand} {vehicle?.model} {vehicle?.year}
            {vehicle?.fuel ? ` · ${vehicle.fuel}` : ''}
          </p>
        </div>
        <button
          onClick={() => { setPhase('select'); setMessages([]); setStreamBuf('') }}
          className="text-[11px] font-bold uppercase tracking-[1px] px-3 py-1.5 rounded-lg transition-all hover:bg-white/5"
          style={{ border: '1px solid #3a3a42', color: '#555', fontFamily: 'var(--font-barlow-condensed)' }}>
          Trocar veículo
        </button>
        <button onClick={() => router.push('/home')}
          className="w-8 h-8 rounded-xl flex items-center justify-center text-[14px] hover:bg-white/5 transition-all"
          style={{ border: '1px solid #3a3a42', color: '#555' }}>✕</button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-5" style={{ maxWidth: 720, width: '100%', margin: '0 auto', alignSelf: 'stretch' }}>
        <div className="max-w-[720px] mx-auto flex flex-col gap-4">

          {/* Empty state */}
          {messages.length === 0 && !streaming && (
            <>
              <div className="text-center py-8">
                <p className="text-[32px] mb-2">🔧</p>
                <p className="text-[15px] font-semibold mb-1" style={{ color: '#f0ede8' }}>
                  Olá! Sou o Mecânico Virtual do MotorMacete.
                </p>
                <p className="text-[13px]" style={{ color: '#555' }}>
                  Pode me contar qualquer problema com o seu {vehicle?.brand} {vehicle?.model}.
                  Serei direto e honesto sobre causas e custos.
                </p>
              </div>

              <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-center mb-1"
                style={{ color: '#333', fontFamily: 'var(--font-barlow-condensed)' }}>
                Perguntas frequentes
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => send(s)}
                    className="text-[12px] px-3 py-2 rounded-xl text-left transition-all hover:border-orange-600/50 hover:text-white"
                    style={{ background: '#28282e', border: '1px solid #3a3a42', color: '#666', maxWidth: 260 }}>
                    {s}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Conversation */}
          {messages.map((m, i) =>
            m.role === 'user'
              ? <UserMessage key={i} text={m.content} />
              : <MechanicMessage key={i} text={m.content} streaming={false} />
          )}

          {/* Streaming bubble */}
          {streaming && streamBuf && (
            <MechanicMessage text={streamBuf} streaming />
          )}
          {streaming && !streamBuf && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[18px] shrink-0"
                style={{ background: 'linear-gradient(135deg, #ff8c00, #ff5500)' }}>
                🔧
              </div>
              <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-sm"
                style={{ background: '#30303a', border: '1px solid #3a3a42' }}>
                {[0, 1, 2].map(i => (
                  <span key={i} className="w-2 h-2 rounded-full inline-block"
                    style={{ background: '#ff6600', animation: `bounce 1s ${i * 0.2}s ease-in-out infinite alternate` }} />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input bar ou prompt de cadastro */}
      {isLoggedIn === false && anonUsed >= ANON_LIMIT ? (
        <div className="shrink-0 px-4 pb-6 pt-4" style={{ borderTop: '1px solid #2a2a32', background: '#1c1c22' }}>
          <div className="max-w-[720px] mx-auto rounded-2xl p-5 text-center" style={{ background: '#28282e', border: '1px solid #ff6600' }}>
            <p className="text-[22px] mb-1">🔧</p>
            <p className="text-[15px] font-bold mb-1" style={{ color: '#f0ede8' }}>
              Você usou suas {ANON_LIMIT} consultas gratuitas!
            </p>
            <p className="text-[13px] mb-4" style={{ color: '#888' }}>
              Crie sua conta grátis e ganhe <strong style={{ color: '#ff6600' }}>5 consultas por mês</strong> — sem cartão de crédito.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a href="/auth/register"
                className="px-5 py-2.5 rounded-xl text-[13px] font-bold uppercase tracking-[1px] transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #ff8c00, #ff5500)', color: '#fff', fontFamily: 'var(--font-barlow-condensed)' }}>
                Criar conta grátis
              </a>
              <a href="/auth/login"
                className="px-5 py-2.5 rounded-xl text-[13px] font-bold uppercase tracking-[1px] transition-all hover:bg-white/5"
                style={{ border: '1px solid #3a3a42', color: '#888', fontFamily: 'var(--font-barlow-condensed)' }}>
                Já tenho conta
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="shrink-0 px-4 pb-4 pt-3" style={{ borderTop: '1px solid #2a2a32', background: '#1c1c22', maxWidth: 720, width: '100%', margin: '0 auto', alignSelf: 'stretch' }}>
          <div className="max-w-[720px] mx-auto flex gap-3 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Descreva o problema do seu veículo... (Enter para enviar)"
              rows={1}
              className="flex-1 px-4 py-3 rounded-xl text-[14px] outline-none resize-none leading-relaxed"
              style={{
                background: '#28282e', border: '1px solid #3a3a42', color: '#f0ede8',
                fontFamily: 'var(--font-barlow)', minHeight: 48, maxHeight: 140,
              }}
              onInput={e => {
                const t = e.currentTarget
                t.style.height = 'auto'
                t.style.height = Math.min(t.scrollHeight, 140) + 'px'
              }}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || streaming}
              className="w-12 h-12 rounded-xl flex items-center justify-center text-[20px] shrink-0 transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: input.trim() && !streaming ? 'linear-gradient(135deg, #ff8c00, #ff5500)' : '#2a2a32' }}>
              {streaming ? '⏳' : '➤'}
            </button>
          </div>
          {isLoggedIn === false && anonUsed > 0 && (
            <p className="text-center text-[11px] mt-2" style={{ color: '#555' }}>
              {ANON_LIMIT - anonUsed} consulta{ANON_LIMIT - anonUsed !== 1 ? 's' : ''} gratuita{ANON_LIMIT - anonUsed !== 1 ? 's' : ''} restante{ANON_LIMIT - anonUsed !== 1 ? 's' : ''} —{' '}
              <a href="/auth/register" style={{ color: '#ff6600' }}>crie sua conta grátis</a>
            </p>
          )}
          <p className="text-center text-[10px] mt-1" style={{ color: '#3a3a42' }}>
            IA pode cometer erros. Para diagnóstico definitivo, consulte um mecânico profissional.
          </p>
        </div>
      )}

      <style>{`
        @keyframes bounce { from { transform: translateY(0); } to { transform: translateY(-6px); } }
        @keyframes blink  { 50% { opacity: 0; } }
      `}</style>
    </div>
  )
}
