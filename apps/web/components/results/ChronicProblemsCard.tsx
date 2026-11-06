'use client'

import { useState, useEffect } from 'react'
import type { Tip, Severity } from '@/lib/types'

interface FetchResult {
  tips:       Tip[]
  isSpecific: boolean
}

interface Props {
  modelName:    string
  vehicleLabel: string
  yearCode:     string
  yearName?:    string
}

// ── Severity helpers ──────────────────────────────────────────────────────────

const SEVERITY_COLOR: Record<Severity, string> = {
  DANGER: '#ef4444',
  WARN:   '#f59e0b',
  OK:     '#22c55e',
}

const SEVERITY_BG: Record<Severity, string> = {
  DANGER: 'rgba(239,68,68,0.10)',
  WARN:   'rgba(245,158,11,0.10)',
  OK:     'rgba(34,197,94,0.10)',
}

const SEVERITY_LABEL: Record<Severity, string> = {
  DANGER: 'GRAVE',
  WARN:   'ATENÇÃO',
  OK:     'LEVE',
}

// ── Main component ────────────────────────────────────────────────────────────

export function ChronicProblemsCard({ modelName, vehicleLabel, yearCode, yearName = '' }: Props) {
  const [result,  setResult]  = useState<FetchResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [open,    setOpen]    = useState(false)

  useEffect(() => {
    if (!modelName) return
    setLoading(true)
    setResult(null)
    fetch(`/api/tips?modelName=${encodeURIComponent(modelName)}&category=PROBLEMAS&yearCode=${encodeURIComponent(yearCode)}&yearName=${encodeURIComponent(yearName)}`)
      .then((r) => r.json())
      .then((d: FetchResult) => { setResult(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [modelName, yearCode])

  const problems = result?.tips ?? []
  const hasData  = result?.isSpecific ?? false
  const danger   = problems.filter((t) => t.severity === 'DANGER').length

  return (
    <>
      {/* ── Card ─────────────────────────────────────────────────────────── */}
      <div
        className="rounded-xl px-5 py-4 flex items-center justify-between gap-4 cursor-pointer transition-all duration-150"
        style={{ background: '#28282e', border: '1px solid #3a3a42' }}
        onClick={() => !loading && setOpen(true)}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-lg"
            style={{ background: hasData && danger > 0 ? 'rgba(239,68,68,0.12)' : 'rgba(245,158,11,0.12)' }}
          >
            🛠️
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[1px]" style={{ color: '#555' }}>
              Problemas Crônicos
            </p>
            {loading && (
              <p className="text-sm mt-0.5" style={{ color: '#444' }}>Consultando...</p>
            )}
            {!loading && result && (
              hasData ? (
                <p className="text-sm font-semibold mt-0.5" style={{ color: danger > 0 ? '#ef4444' : '#f59e0b' }}>
                  {problems.length} problema{problems.length !== 1 ? 's' : ''} identificado{problems.length !== 1 ? 's' : ''}
                  {danger > 0 && (
                    <span className="ml-2 text-xs px-1.5 py-0.5 rounded font-bold" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>
                      {danger} grave{danger !== 1 ? 's' : ''}
                    </span>
                  )}
                </p>
              ) : (
                <p className="text-sm mt-0.5" style={{ color: '#555' }}>Nenhum problema crônico cadastrado</p>
              )
            )}
          </div>
        </div>
        {!loading && (
          <span className="text-sm font-semibold shrink-0" style={{ color: hasData ? '#ef4444' : '#555' }}>
            Ver detalhes →
          </span>
        )}
      </div>

      {/* ── Modal ────────────────────────────────────────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)' }}
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-[560px] rounded-2xl overflow-hidden max-h-[90vh] flex flex-col"
            style={{ background: '#28282e', border: '1px solid #3a3a42' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-start justify-between px-6 py-4 shrink-0"
              style={{ background: '#222228', borderBottom: '1px solid #3a3a42' }}
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[1px]" style={{ color: '#555' }}>
                  Problemas Crônicos
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

            {/* Body */}
            <div className="overflow-y-auto px-6 py-5 flex flex-col gap-3">
              {!hasData ? (
                <div
                  className="rounded-xl p-5 flex flex-col items-center gap-2 text-center"
                  style={{ background: '#222228', border: '1px solid #3a3a42' }}
                >
                  <span className="text-3xl">✅</span>
                  <p className="font-semibold" style={{ color: '#f0ede8' }}>
                    Nenhum problema crônico identificado
                  </p>
                  <p className="text-sm" style={{ color: '#555' }}>
                    Para o veículo selecionado não foram identificados problemas crônicos em nossa base de dados.
                  </p>
                </div>
              ) : (
                problems.map((tip) => (
                  <div
                    key={tip.id}
                    className="rounded-xl p-4"
                    style={{
                      background: SEVERITY_BG[tip.severity],
                      border: `1px solid ${SEVERITY_COLOR[tip.severity]}33`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <p
                        className="text-[15px] font-bold leading-snug"
                        style={{ color: '#f0ede8' }}
                      >
                        {tip.title}
                      </p>
                      <span
                        className="text-[10px] font-bold tracking-[1px] px-2 py-0.5 rounded shrink-0 mt-0.5"
                        style={{
                          background: SEVERITY_BG[tip.severity],
                          color: SEVERITY_COLOR[tip.severity],
                          border: `1px solid ${SEVERITY_COLOR[tip.severity]}44`,
                        }}
                      >
                        {SEVERITY_LABEL[tip.severity]}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: '#999' }}>
                      {tip.body}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div
              className="px-6 py-3 shrink-0"
              style={{ borderTop: '1px solid #1e1e20' }}
            >
              <p className="text-[10px] text-center" style={{ color: '#333' }}>
                Informações baseadas em relatos documentados de proprietários e especialistas. Consulte sempre um mecânico de confiança.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
