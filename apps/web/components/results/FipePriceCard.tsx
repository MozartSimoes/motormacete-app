'use client'

import { useState, useEffect } from 'react'

interface FipeData {
  currentFipe:    number
  fipeCode:       string
  modelYear:      string
  referenceMonth: string
  history:        { month: string; fipe: number }[]
  viewType:       'monthly-ytd' | 'annual-3yr'
}

interface Props {
  type:           string
  brandCode:      string
  modelCode:      string
  yearCode:       string
  vehicleLabel:   string
  fipeBrandCode?: string
  fipeModelCode?: string
}

const MARKET_FACTOR = 1.07

// ── Helpers ──────────────────────────────────────────────────────────────────

function fmtBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

// ── SVG mini chart ────────────────────────────────────────────────────────────

function MiniChart({ data }: { data: { month: string; fipe: number; market: number }[] }) {
  if (data.length < 3) return null

  const W = 480, H = 160
  const pL = 64, pR = 16, pT = 16, pB = 36
  const cW = W - pL - pR
  const cH = H - pT - pB

  const all  = data.flatMap((d) => [d.fipe, d.market])
  const minV = Math.min(...all) * 0.97
  const maxV = Math.max(...all) * 1.03

  const xAt = (i: number) => pL + (i / (data.length - 1)) * cW
  const yAt = (v: number) => pT + cH - ((v - minV) / (maxV - minV)) * cH

  const fipePts   = data.map((d, i) => `${xAt(i)},${yAt(d.fipe)}`).join(' ')
  const marketPts = data.map((d, i) => `${xAt(i)},${yAt(d.market)}`).join(' ')

  const yFmt = (v: number) => `R$${(v / 1000).toFixed(0)}k`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 160 }}>
      {/* grid */}
      {[0, 0.5, 1].map((t) => (
        <line
          key={t}
          x1={pL} y1={pT + (1 - t) * cH}
          x2={W - pR} y2={pT + (1 - t) * cH}
          stroke="#3a3a42" strokeWidth={1}
        />
      ))}
      {/* FIPE line */}
      <polyline
        fill="none" stroke="#ff6600" strokeWidth={2.5}
        strokeLinejoin="round" strokeLinecap="round"
        points={fipePts}
      />
      {/* market line dashed */}
      <polyline
        fill="none" stroke="#4a9eff" strokeWidth={2}
        strokeLinejoin="round" strokeLinecap="round"
        strokeDasharray="6,4"
        points={marketPts}
      />
      {/* dots + month labels */}
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={xAt(i)} cy={yAt(d.fipe)}   r={4.5} fill="#ff6600" />
          <circle cx={xAt(i)} cy={yAt(d.market)} r={4}   fill="#4a9eff" />
          <text x={xAt(i)} y={H - 6} textAnchor="middle" fill="#555" fontSize={11}>
            {d.month}
          </text>
        </g>
      ))}
      {/* y-axis labels */}
      {[0, 0.5, 1].map((t) => {
        const v = minV + t * (maxV - minV)
        return (
          <text
            key={t}
            x={pL - 6}
            y={pT + (1 - t) * cH + 4}
            textAnchor="end"
            fill="#555"
            fontSize={10}
          >
            {yFmt(v)}
          </text>
        )
      })}
    </svg>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function FipePriceCard({ type, brandCode, modelCode, yearCode, vehicleLabel, fipeBrandCode, fipeModelCode }: Props) {
  const [data,    setData]    = useState<FipeData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | false>(false)
  const [open,    setOpen]    = useState(false)

  useEffect(() => {
    if (!brandCode || !modelCode) return
    setLoading(true); setError(false); setData(null)
    const apiBrand = fipeBrandCode ?? brandCode
    const apiModel = fipeModelCode ?? modelCode
    fetch(`/api/fipe/price?type=${type}&brandCode=${apiBrand}&modelCode=${apiModel}&yearCode=${encodeURIComponent(yearCode)}`)
      .then((r) => r.json())
      .then((d) => { d.error ? setError(d.error as string) : setData(d); setLoading(false) })
      .catch(() => { setError('connection'); setLoading(false) })
  }, [type, brandCode, modelCode, yearCode, fipeBrandCode, fipeModelCode])

  const marketNow  = data ? Math.round(data.currentFipe * MARKET_FACTOR) : 0
  const chartData  = data
    ? data.history.map((h) => ({ ...h, market: Math.round(h.fipe * MARKET_FACTOR) }))
    : []

  return (
    <>
      {/* ── Card ─────────────────────────────────────────────────────────── */}
      <div
        className="rounded-xl px-5 py-4 flex items-center justify-between gap-4 cursor-pointer transition-all duration-150"
        style={{ background: '#28282e', border: '1px solid #3a3a42' }}
        onClick={() => !loading && !error && data && setOpen(true)}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-lg"
            style={{ background: 'rgba(255,102,0,0.12)' }}
          >
            📊
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[1px]" style={{ color: '#555' }}>
              Tabela FIPE
            </p>
            {loading && (
              <p className="text-sm mt-0.5" style={{ color: '#444' }}>Consultando...</p>
            )}
            {error && (
              <div className="mt-0.5">
                <p className="text-sm font-semibold" style={{ color: '#f0ede8' }}>
                  {error === 'fipe api error' || error === 'connection'
                    ? 'Serviço FIPE indisponível'
                    : 'Sem cotação na Tabela FIPE'}
                </p>
                <p className="text-[11px] mt-0.5 leading-tight" style={{ color: '#888' }}>
                  {error === 'fipe api error' || error === 'connection'
                    ? 'Tente novamente em instantes'
                    : 'Modelo importado ou fora do período tabelado'}
                </p>
              </div>
            )}
            {data && (
              <p className="text-lg font-bold mt-0.5" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
                {fmtBRL(data.currentFipe)}
                <span className="text-xs font-normal ml-2" style={{ color: '#555' }}>
                  {data.modelYear}
                </span>
              </p>
            )}
          </div>
        </div>
        {data && (
          <span className="text-sm font-semibold shrink-0" style={{ color: '#ff6600' }}>
            Ver histórico →
          </span>
        )}
      </div>

      {/* ── Modal ────────────────────────────────────────────────────────── */}
      {open && data && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.82)' }}
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-[540px] rounded-2xl overflow-hidden"
            style={{ background: '#28282e', border: '1px solid #3a3a42' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-start justify-between px-6 py-4"
              style={{ background: '#222228', borderBottom: '1px solid #3a3a42' }}
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[1px]" style={{ color: '#555' }}>
                  Tabela FIPE · {data.referenceMonth}
                </p>
                <p
                  className="text-2xl tracking-wide mt-0.5"
                  style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}
                >
                  {vehicleLabel}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm mt-0.5 shrink-0 transition-colors"
                style={{ background: '#3a3a42', color: '#888' }}
              >
                ✕
              </button>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 px-6 pt-5">
              <div className="rounded-xl p-4" style={{ background: '#222228', border: '1px solid #3a3a42' }}>
                <p className="text-[11px] font-semibold uppercase tracking-[1px] mb-2" style={{ color: '#555' }}>
                  Valor FIPE
                </p>
                <p className="text-2xl font-bold" style={{ color: '#ff6600', fontFamily: 'var(--font-bebas-neue)' }}>
                  {fmtBRL(data.currentFipe)}
                </p>
                <p className="text-[11px] mt-1.5" style={{ color: '#444' }}>
                  {data.modelYear} · {data.fipeCode}
                </p>
              </div>
              <div className="rounded-xl p-4" style={{ background: '#222228', border: '1px solid #3a3a42' }}>
                <p className="text-[11px] font-semibold uppercase tracking-[1px] mb-2" style={{ color: '#555' }}>
                  Mercado (estimado)
                </p>
                <p className="text-2xl font-bold" style={{ color: '#4a9eff', fontFamily: 'var(--font-bebas-neue)' }}>
                  {fmtBRL(marketNow)}
                </p>
                <p className="text-[11px] mt-1.5" style={{ color: '#444' }}>
                  ~{Math.round((MARKET_FACTOR - 1) * 100)}% acima da FIPE
                </p>
              </div>
            </div>

            {/* Chart */}
            <div className="px-6 pt-5 pb-2">
              <p className="text-[11px] font-semibold uppercase tracking-[1px] mb-3" style={{ color: '#555' }}>
                {data.viewType === 'annual-3yr'
                  ? 'Evolução — últimos 3 anos'
                  : `Evolução — ${new Date().getFullYear()} (Jan – ${data.history.at(-1)?.month ?? ''})`
                }
              </p>
              {chartData.length >= 3 ? (
                <MiniChart data={chartData} />
              ) : (
                <p className="text-sm py-8 text-center" style={{ color: '#444' }}>
                  Histórico indisponível para este modelo
                </p>
              )}
            </div>

            {/* Legend + source */}
            <div
              className="flex items-center justify-between px-6 py-4 mt-1"
              style={{ borderTop: '1px solid #1e1e20' }}
            >
              <div className="flex items-center gap-5 text-xs" style={{ color: '#555' }}>
                <span className="flex items-center gap-1.5">
                  <span className="w-4 h-[2px] rounded inline-block" style={{ background: '#ff6600' }} />
                  FIPE
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-4 inline-block"
                    style={{ borderTop: '2px dashed #4a9eff', display: 'inline-block' }}
                  />
                  Mercado (est.)
                </span>
              </div>
              <p className="text-[10px]" style={{ color: '#333' }}>
                {data.viewType === 'annual-3yr'
                  ? 'Fonte: Tabela FIPE / DENATRAN · valores históricos podem ser estimados'
                  : 'Fonte: Tabela FIPE / DENATRAN'
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
