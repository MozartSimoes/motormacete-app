'use client'

import { useState } from 'react'

interface TirePressureItem {
  id: string
  modelName: string | null
  tireSize: string
  frontPsi: number
  rearPsi: number
  frontPsiLoad: number | null
  rearPsiLoad: number | null
  sparePsi: number | null
  notes: string | null
  order: number
}

function PsiGauge({ psi, label }: { psi: number; label: string }) {
  const max = 60
  const pct = Math.min((psi / max) * 100, 100)
  const color = psi <= 30 ? '#4a9a4a' : psi <= 38 ? '#ff6600' : '#e03030'

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: 104,
          height: 104,
          background: `conic-gradient(${color} ${pct * 3.6}deg, #222228 ${pct * 3.6}deg)`,
          padding: 4,
        }}
      >
        <div
          className="flex flex-col items-center justify-center rounded-full"
          style={{ width: 92, height: 92, background: '#222228' }}
        >
          <span className="text-[30px] font-black leading-none" style={{ color }}>
            {psi}
          </span>
          <span className="text-[11px] font-bold tracking-[1.5px]" style={{ color: '#888' }}>
            PSI
          </span>
        </div>
      </div>
      <span className="text-[12px] font-bold uppercase tracking-[1px]" style={{ color: '#bbb' }}>
        {label}
      </span>
    </div>
  )
}

export function TirePressureCard({ items, isSpecific }: { items: TirePressureItem[]; isSpecific: boolean }) {
  const [loaded, setLoaded] = useState(false)

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-center">
        <span className="text-3xl">🔴</span>
        <p className="text-sm font-semibold" style={{ color: '#f0ede8' }}>Sem dados de calibragem</p>
        <p className="text-xs" style={{ color: '#444' }}>Não encontramos dados para este veículo.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {!isSpecific && (
        <p className="text-[13px] px-1" style={{ color: '#999' }}>
          * Dados genéricos — não encontramos calibragem específica para este modelo.
        </p>
      )}

      {/* Sem carga / Com carga toggle */}
      <div
        className="flex rounded-lg p-1 self-start"
        style={{ background: '#30303a', border: '1px solid #3a3a42' }}
      >
        <button
          className="px-5 py-2 text-[13px] font-bold uppercase tracking-[1px] rounded-md transition-colors"
          style={{
            background: !loaded ? '#ff6600' : 'transparent',
            color: !loaded ? '#111' : '#888',
          }}
          onClick={() => setLoaded(false)}
        >
          Sem carga
        </button>
        <button
          className="px-5 py-2 text-[13px] font-bold uppercase tracking-[1px] rounded-md transition-colors"
          style={{
            background: loaded ? '#ff6600' : 'transparent',
            color: loaded ? '#111' : '#888',
          }}
          onClick={() => setLoaded(true)}
        >
          Com carga
        </button>
      </div>

      {items.map((item) => {
        const frontPsi = loaded && item.frontPsiLoad ? item.frontPsiLoad : item.frontPsi
        const rearPsi  = loaded && item.rearPsiLoad  ? item.rearPsiLoad  : item.rearPsi
        const hasLoad  = item.frontPsiLoad !== null || item.rearPsiLoad !== null

        return (
          <div
            key={item.id}
            className="rounded-xl p-4"
            style={{ background: '#222228', border: '1px solid #222226' }}
          >
            {/* Tire size badge */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <span style={{ fontSize: 20 }}>🛞</span>
                <span className="text-[17px] font-bold" style={{ color: '#eae6e0' }}>
                  {item.tireSize}
                </span>
              </div>
              {!hasLoad && loaded && (
                <span className="text-[12px] px-3 py-1 rounded-full" style={{ background: '#30303a', color: '#888' }}>
                  Sem dados com carga
                </span>
              )}
            </div>

            {/* Gauges — top-down car diagram */}
            <div className="flex items-center justify-center gap-5 py-3">
              {/* Front column */}
              <div className="flex flex-col items-center gap-4">
                <PsiGauge psi={frontPsi} label="Diant." />
                <PsiGauge psi={frontPsi} label="Diant." />
              </div>

              {/* Car silhouette */}
              <div className="flex flex-col items-center justify-center px-2">
                <svg width="58" height="110" viewBox="0 0 58 110" fill="none">
                  {/* car body top-down */}
                  <rect x="7" y="10" width="44" height="90" rx="12" fill="#1e1e24" stroke="#3a3a42" strokeWidth="1.5"/>
                  <rect x="13" y="22" width="32" height="66" rx="7" fill="#28282e"/>
                  {/* windshield */}
                  <rect x="14" y="17" width="30" height="17" rx="5" fill="#2a2a38" opacity="0.9"/>
                  {/* rear window */}
                  <rect x="14" y="76" width="30" height="14" rx="5" fill="#2a2a38" opacity="0.9"/>
                  {/* front label */}
                  <text x="29" y="7" textAnchor="middle" fontSize="8" fill="#666" fontFamily="sans-serif">FRENTE</text>
                  {/* rear label */}
                  <text x="29" y="108" textAnchor="middle" fontSize="8" fill="#666" fontFamily="sans-serif">TRASEIRO</text>
                </svg>
              </div>

              {/* Rear column */}
              <div className="flex flex-col items-center gap-4">
                <PsiGauge psi={rearPsi} label="Tras." />
                <PsiGauge psi={rearPsi} label="Tras." />
              </div>
            </div>

            {/* kgf/cm² equivalent */}
            <div
              className="mt-4 flex items-center justify-center gap-6 rounded-xl py-3 px-4"
              style={{ background: '#1c1c22', border: '1px solid #2a2a32' }}
            >
              <div className="text-center">
                <p className="text-[11px] uppercase tracking-[1px] mb-1" style={{ color: '#888' }}>Dianteiro</p>
                <p className="text-[14px] font-bold" style={{ color: '#ff8533' }}>
                  {frontPsi} PSI &nbsp;/&nbsp; {(frontPsi * 0.0689476).toFixed(1)} bar &nbsp;/&nbsp; {(frontPsi / 14.504).toFixed(1)} kgf/cm²
                </p>
              </div>
              <div style={{ width: 1, height: 32, background: '#3a3a42' }} />
              <div className="text-center">
                <p className="text-[11px] uppercase tracking-[1px] mb-1" style={{ color: '#888' }}>Traseiro</p>
                <p className="text-[14px] font-bold" style={{ color: '#ff8533' }}>
                  {rearPsi} PSI &nbsp;/&nbsp; {(rearPsi * 0.0689476).toFixed(1)} bar &nbsp;/&nbsp; {(rearPsi / 14.504).toFixed(1)} kgf/cm²
                </p>
              </div>
            </div>

            {/* Spare tire */}
            {item.sparePsi && (
              <div
                className="mt-2 flex items-center gap-2 rounded-xl px-4 py-2.5"
                style={{ background: '#1c1c22', border: '1px solid #2a2a32' }}
              >
                <span className="text-[15px]">🔧</span>
                <span className="text-[13px]" style={{ color: '#aaa' }}>
                  Estepe: <strong style={{ color: '#d4cfca' }}>{item.sparePsi} PSI</strong>
                </span>
              </div>
            )}

            {/* Notes */}
            {item.notes && (
              <p
                className="mt-2 text-[13px] leading-relaxed rounded-xl px-4 py-2.5"
                style={{ color: '#aaa', background: '#1c1c22', border: '1px solid #2a2a32' }}
              >
                💡 {item.notes}
              </p>
            )}
          </div>
        )
      })}

      <p className="text-[12px] px-1 mt-1" style={{ color: '#777' }}>
        Sempre calibre com o pneu frio (antes de rodar ou após no máximo 3 km). Valores do manual do proprietário.
      </p>
    </div>
  )
}
