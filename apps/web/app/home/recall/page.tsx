'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

// ── Tipos ─────────────────────────────────────────────────────────────────────

interface RecallCampaign {
  id: string
  number: string
  brand: string
  models: string[]
  vehicleType: string
  yearFrom: number
  yearTo: number
  title: string
  defect: string
  risk: string
  remedy: string
  affectedUnits: number | null
  status: 'OPEN' | 'CLOSED' | 'PARTIAL'
  chassisRange: string | null
  officialUrl: string | null
  publishedAt: string
}

// ── Marcas populares para busca rápida ────────────────────────────────────────

const QUICK_BRANDS = [
  'Honda', 'Chevrolet', 'Volkswagen', 'Fiat', 'Toyota',
  'Renault', 'Hyundai', 'Ford', 'Jeep', 'Yamaha', 'BMW',
]

// ── Utilitários ───────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  OPEN:    { label: 'ABERTO',    bg: 'rgba(239,68,68,0.15)',  color: '#ef4444', dot: '#ef4444' },
  PARTIAL: { label: 'PARCIAL',   bg: 'rgba(234,179,8,0.15)',  color: '#facc15', dot: '#facc15' },
  CLOSED:  { label: 'ENCERRADO', bg: 'rgba(34,197,94,0.12)',  color: '#4ade80', dot: '#4ade80' },
}

function fmt(n: number) {
  return n.toLocaleString('pt-BR')
}

// ── Componente de card de recall ──────────────────────────────────────────────

function RecallCard({ r }: { r: RecallCampaign }) {
  const [open, setOpen] = useState(false)
  const sc = STATUS_CONFIG[r.status]

  return (
    <div
      className="rounded-xl overflow-hidden transition-all"
      style={{ background: '#28282e', border: `1px solid ${r.status === 'OPEN' ? 'rgba(239,68,68,0.3)' : '#3a3a42'}` }}
    >
      {/* Header do card */}
      <button
        className="w-full text-left p-4 flex items-start gap-3"
        onClick={() => setOpen(v => !v)}
      >
        {/* Ícone de severidade */}
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-0.5"
          style={{ background: sc.bg }}
        >
          {r.status === 'OPEN' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={sc.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          ) : r.status === 'PARTIAL' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={sc.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={sc.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: sc.bg, color: sc.color }}
            >
              {sc.label}
            </span>
            <span className="text-xs" style={{ color: '#555' }}>
              {r.brand} · {r.yearFrom === r.yearTo ? r.yearFrom : `${r.yearFrom}–${r.yearTo}`}
            </span>
            {r.affectedUnits && (
              <span className="text-xs" style={{ color: '#444' }}>
                {fmt(r.affectedUnits)} unidades
              </span>
            )}
          </div>
          <p className="font-bold text-sm leading-snug" style={{ color: '#f0ede8' }}>{r.title}</p>
          <p className="text-xs mt-1" style={{ color: '#666' }}>
            {r.models.slice(0, 4).join(' · ')}{r.models.length > 4 ? ` +${r.models.length - 4}` : ''}
          </p>
        </div>

        <svg
          className="flex-shrink-0 mt-1 transition-transform"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', color: '#444' }}
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {/* Detalhes expandidos */}
      {open && (
        <div className="px-4 pb-4 pt-1 border-t" style={{ borderColor: '#3a3a42' }}>
          <div className="grid sm:grid-cols-3 gap-3 mt-3">
            <div className="rounded-lg p-3" style={{ background: '#1e1e24' }}>
              <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#ef4444' }}>Defeito</p>
              <p className="text-xs leading-relaxed" style={{ color: '#aaa' }}>{r.defect}</p>
            </div>
            <div className="rounded-lg p-3" style={{ background: '#1e1e24' }}>
              <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#f97316' }}>Risco</p>
              <p className="text-xs leading-relaxed" style={{ color: '#aaa' }}>{r.risk}</p>
            </div>
            <div className="rounded-lg p-3" style={{ background: '#1e1e24' }}>
              <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#4ade80' }}>Solução</p>
              <p className="text-xs leading-relaxed" style={{ color: '#aaa' }}>{r.remedy}</p>
            </div>
          </div>

          {r.chassisRange && (
            <p className="text-xs mt-3" style={{ color: '#555' }}>
              <span style={{ color: '#666' }}>Faixa de chassi:</span> {r.chassisRange}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mt-3">
            {r.officialUrl && (
              <a
                href={r.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                style={{ background: '#ff6600', color: '#fff' }}
              >
                Agendar reparo na concessionária →
              </a>
            )}
            <span className="text-xs self-center" style={{ color: '#444' }}>
              Nº {r.number} · publicado em {new Date(r.publishedAt).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Página principal ──────────────────────────────────────────────────────────

export default function RecallPage() {
  const [recalls, setRecalls]     = useState<RecallCampaign[]>([])
  const [loading, setLoading]     = useState(false)
  const [searched, setSearched]   = useState(false)
  const [brand, setBrand]         = useState('')
  const [model, setModel]         = useState('')
  const [year, setYear]           = useState('')
  const [vehicleType, setVehicleType] = useState<'todos' | 'carro' | 'moto'>('todos')
  const [chassi, setChassi]       = useState('')
  const [activeTab, setActiveTab] = useState<'modelo' | 'chassi'>('modelo')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const search = useCallback(async (b: string, m: string, y: string, t: string) => {
    if (!b && !m && !y) {
      setRecalls([]); setSearched(false); return
    }
    setLoading(true); setSearched(true)
    const params = new URLSearchParams()
    if (b) params.set('brand', b)
    if (m) params.set('model', m)
    if (y) params.set('year', y)
    if (t !== 'todos') params.set('type', t)
    try {
      const res = await fetch(`/api/recalls?${params}`)
      const data = await res.json()
      setRecalls(data.recalls ?? [])
    } catch {
      setRecalls([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => search(brand, model, year, vehicleType), 350)
  }, [brand, model, year, vehicleType, search])

  const openRecalls  = recalls.filter(r => r.status === 'OPEN')
  const otherRecalls = recalls.filter(r => r.status !== 'OPEN')

  const openChassi = () => {
    const base = 'https://portalservicos.senatran.serpro.gov.br/'
    window.open(base, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen" style={{ background: '#1c1c22' }}>
      <Header />

      {/* ── Banner ────────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: 240,
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.72),rgba(0,0,0,0.72)),url(https://images.unsplash.com/photo-1563720223809-b2a8f9a35de5?w=1920&q=80)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'center',
      }}>
        <div className="max-w-5xl mx-auto px-6 py-10 w-full">
          <p className="text-xs font-bold tracking-widest uppercase mb-2"
            style={{ color: '#ef4444', fontFamily: 'var(--font-barlow-condensed)' }}>
            Segurança Veicular
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-2"
            style={{ fontFamily: 'var(--font-bebas-neue)' }}>
            Recall <span style={{ color: '#ef4444' }}>Brasil</span>
          </h1>
          <p style={{ color: '#9ca3af', fontSize: 14 }}>
            Verifique se seu carro ou moto possui campanha de recall ativa. Fonte: DENATRAN/SENATRAN.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* ── Abas ────────────────────────────────────────────────────────── */}
        <div className="flex gap-1 mb-6 p-1 rounded-xl w-fit" style={{ background: '#28282e' }}>
          {(['modelo', 'chassi'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-2 rounded-lg text-sm font-bold transition-all"
              style={{
                background: activeTab === tab ? '#ff6600' : 'transparent',
                color:      activeTab === tab ? '#fff' : '#555',
              }}
            >
              {tab === 'modelo' ? (
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                  Por Marca / Modelo
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="7" cy="7" r="4"/><path d="M10.9 10.9l8.1 8.1"/><path d="M16 16l2 2-2 2"/>
                  </svg>
                  Por Chassi / Placa
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Busca por Modelo ─────────────────────────────────────────────── */}
        {activeTab === 'modelo' && (
          <div className="mb-8">
            {/* Tipo de veículo */}
            <div className="flex gap-2 mb-4">
              {([['todos', 'Todos'], ['carro', 'Carros'], ['moto', 'Motos']] as const).map(([v, l]) => (
                <button
                  key={v}
                  onClick={() => setVehicleType(v)}
                  className="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
                  style={{
                    background: vehicleType === v ? 'rgba(255,102,0,0.15)' : '#222228',
                    color:      vehicleType === v ? '#ff6600' : '#555',
                    border:     `1px solid ${vehicleType === v ? 'rgba(255,102,0,0.4)' : '#3a3a42'}`,
                  }}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Campos de busca */}
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wide block mb-1" style={{ color: '#555' }}>Marca</label>
                <input
                  type="text"
                  placeholder="ex: Honda, Toyota..."
                  value={brand}
                  onChange={e => setBrand(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: '#28282e', border: '1px solid #3a3a42', color: '#f0ede8' }}
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wide block mb-1" style={{ color: '#555' }}>Modelo</label>
                <input
                  type="text"
                  placeholder="ex: Civic, CG 160..."
                  value={model}
                  onChange={e => setModel(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: '#28282e', border: '1px solid #3a3a42', color: '#f0ede8' }}
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wide block mb-1" style={{ color: '#555' }}>Ano</label>
                <input
                  type="number"
                  placeholder="ex: 2020"
                  value={year}
                  onChange={e => setYear(e.target.value)}
                  min="1990" max="2026"
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: '#28282e', border: '1px solid #3a3a42', color: '#f0ede8' }}
                />
              </div>
            </div>

            {/* Marcas rápidas */}
            <div className="flex flex-wrap gap-2">
              {QUICK_BRANDS.map(b => (
                <button
                  key={b}
                  onClick={() => setBrand(b === brand ? '' : b)}
                  className="px-3 py-1 rounded-full text-xs font-bold transition-all"
                  style={{
                    background: brand === b ? 'rgba(255,102,0,0.15)' : '#222228',
                    color:      brand === b ? '#ff6600' : '#555',
                    border:     `1px solid ${brand === b ? 'rgba(255,102,0,0.3)' : '#2a2a32'}`,
                  }}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Busca por Chassi / Placa ─────────────────────────────────────── */}
        {activeTab === 'chassi' && (
          <div
            className="rounded-2xl p-6 mb-8"
            style={{ background: '#28282e', border: '1px solid #3a3a42' }}
          >
            <div
              className="flex items-start gap-3 mb-5 p-3 rounded-xl"
              style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.2)' }}
            >
              <svg width="16" height="16" className="mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#facc15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p className="text-xs leading-relaxed" style={{ color: '#9ca3af' }}>
                A consulta por chassi ou placa requer acesso ao sistema oficial do SENATRAN/SERPRO.
                O botão abaixo abre o portal gratuito do governo federal onde você pode consultar qualquer veículo.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-wide block mb-1" style={{ color: '#555' }}>Número do Chassi (VIN)</label>
                <input
                  type="text"
                  placeholder="ex: 9BWZZZ377VT004251"
                  value={chassi}
                  onChange={e => setChassi(e.target.value.toUpperCase())}
                  maxLength={17}
                  className="w-full px-3 py-2.5 rounded-xl text-sm font-mono outline-none uppercase"
                  style={{ background: '#1e1e24', border: '1px solid #3a3a42', color: '#f0ede8', letterSpacing: '0.05em' }}
                />
              </div>
              <div className="flex flex-col justify-end">
                <p className="text-xs mb-2" style={{ color: '#555' }}>
                  Chassi de 17 dígitos — encontrado na porta do motorista ou no documento do veículo.
                </p>
              </div>
            </div>

            <button
              onClick={openChassi}
              className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 flex items-center justify-center gap-2"
              style={{ background: '#ef4444', color: '#fff' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 0 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Consultar no Portal SENATRAN (gov.br) →
            </button>

            <p className="text-xs mt-3 text-center" style={{ color: '#444' }}>
              Serviço gratuito do governo federal · Portal oficial do SENATRAN/SERPRO
            </p>
          </div>
        )}

        {/* ── Loading ──────────────────────────────────────────────────────── */}
        {loading && (
          <div className="flex items-center gap-3 py-12 justify-center">
            <div className="w-6 h-6 rounded-full border-2"
              style={{ borderColor: '#2a2a32', borderTopColor: '#ef4444', animation: 'spin 0.8s linear infinite' }} />
            <p style={{ color: '#555', fontSize: 13 }}>Consultando base de recalls...</p>
          </div>
        )}

        {/* ── Nenhum resultado ─────────────────────────────────────────────── */}
        {!loading && searched && recalls.length === 0 && (
          <div className="text-center py-16">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(34,197,94,0.1)' }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <p className="font-bold text-lg mb-1" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
              Nenhum recall encontrado
            </p>
            <p className="text-sm" style={{ color: '#666' }}>
              Nenhuma campanha ativa ou encerrada para esse veículo no nosso banco.
            </p>
            <p className="text-xs mt-3" style={{ color: '#444' }}>
              Para confirmação definitiva, consulte o portal oficial do SENATRAN com o número do chassi.
            </p>
          </div>
        )}

        {/* ── Resultados ───────────────────────────────────────────────────── */}
        {!loading && recalls.length > 0 && (
          <>
            {/* Resumo */}
            <div className="flex flex-wrap gap-3 mb-6">
              {openRecalls.length > 0 && (
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: '#ef4444' }} />
                  <span className="text-sm font-bold" style={{ color: '#ef4444' }}>
                    {openRecalls.length} recall{openRecalls.length > 1 ? 's' : ''} ABERTO{openRecalls.length > 1 ? 'S' : ''}
                  </span>
                </div>
              )}
              {otherRecalls.length > 0 && (
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: '#222228', border: '1px solid #3a3a42' }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: '#4ade80' }} />
                  <span className="text-sm" style={{ color: '#555' }}>
                    {otherRecalls.length} encerrado{otherRecalls.length > 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>

            {/* Cards — abertos primeiro */}
            <div className="flex flex-col gap-3">
              {[...openRecalls, ...otherRecalls].map(r => (
                <RecallCard key={r.id} r={r} />
              ))}
            </div>

            {/* Aviso de verificação oficial */}
            <div
              className="mt-8 p-4 rounded-xl text-center"
              style={{ background: '#222228', border: '1px solid #2a2a32' }}
            >
              <p className="text-xs" style={{ color: '#555' }}>
                Dados baseados em publicações do DENATRAN/SENATRAN. Para verificação definitiva por chassi,{' '}
                <button
                  onClick={openChassi}
                  className="underline"
                  style={{ color: '#666' }}
                >
                  consulte o portal oficial do governo federal
                </button>.
              </p>
            </div>
          </>
        )}

        {/* ── Estado inicial — antes de buscar ─────────────────────────────── */}
        {!loading && !searched && activeTab === 'modelo' && (
          <div className="py-8 text-center">
            <p className="text-sm mb-6" style={{ color: '#555' }}>
              Digite uma marca ou modelo acima para verificar recalls.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <div className="p-4 rounded-xl" style={{ background: '#28282e', border: '1px solid #3a3a42' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3 mx-auto" style={{ background: 'rgba(255,102,0,0.12)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </div>
                <p className="text-sm font-bold mb-1" style={{ color: '#f0ede8' }}>Busca por modelo</p>
                <p className="text-xs" style={{ color: '#555' }}>Digite marca, modelo e ano para ver campanhas de recall ativas e encerradas.</p>
              </div>
              <div className="p-4 rounded-xl" style={{ background: '#28282e', border: '1px solid #3a3a42' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3 mx-auto" style={{ background: 'rgba(255,102,0,0.12)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                  </svg>
                </div>
                <p className="text-sm font-bold mb-1" style={{ color: '#f0ede8' }}>Busca por chassi</p>
                <p className="text-xs" style={{ color: '#555' }}>Use a aba "Por Chassi" para consulta individual pelo número de 17 dígitos via portal SENATRAN.</p>
              </div>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  )
}
