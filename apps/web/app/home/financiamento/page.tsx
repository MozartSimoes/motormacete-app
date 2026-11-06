'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'

function fmtBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

const BANK_RATES = [
  { label: 'Banco do Brasil', rate: 1.49 },
  { label: 'Itaú',            rate: 1.52 },
  { label: 'Bradesco',        rate: 1.58 },
  { label: 'Santander',       rate: 1.63 },
  { label: 'Caixa',           rate: 1.70 },
  { label: 'Personalizado',   rate: 0    },
]

const TERMS = [12, 24, 36, 48, 60, 72]

// Price (French amortization) — equal installments
function calcPrice(principal: number, monthlyRate: number, n: number) {
  if (principal <= 0 || n <= 0 || monthlyRate <= 0) return { monthly: principal / (n || 1), total: principal, interest: 0, rows: [] }
  const r     = monthlyRate / 100
  const pmt   = principal * r / (1 - Math.pow(1 + r, -n))
  const total = pmt * n
  const rows: { month: number; payment: number; interest: number; principal: number; balance: number }[] = []
  let balance = principal
  for (let i = 1; i <= n; i++) {
    const intPart  = balance * r
    const prinPart = pmt - intPart
    balance -= prinPart
    rows.push({ month: i, payment: pmt, interest: intPart, principal: prinPart, balance: Math.max(0, balance) })
  }
  return { monthly: pmt, total, interest: total - principal, rows }
}

export default function FinanciamentoPage() {
  const router = useRouter()

  const [price,       setPrice]       = useState(50000)
  const [downPct,     setDownPct]     = useState(20)
  const [term,        setTerm]        = useState(48)
  const [bankIdx,     setBankIdx]     = useState(0)
  const [customRate,  setCustomRate]  = useState(1.49)
  const [showAmort,   setShowAmort]   = useState(false)

  const downValue   = (price * downPct) / 100
  const principal   = price - downValue
  const rate        = bankIdx === BANK_RATES.length - 1 ? customRate : BANK_RATES[bankIdx].rate
  const result      = useMemo(() => calcPrice(principal, rate, term), [principal, rate, term])
  const annualRate  = (Math.pow(1 + rate / 100, 12) - 1) * 100
  const interestPct = result.total > 0 ? (result.interest / principal) * 100 : 0

  const inputStyle = {
    background: '#222228', border: '1px solid #3a3a42', color: '#f0ede8',
    fontFamily: 'var(--font-barlow)',
  }

  return (
    <div className="min-h-screen" style={{ background: '#1c1c22' }}>
      <Header />

      <div className="max-w-[980px] mx-auto px-4 py-10">

        {/* Title */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <p className="text-[12px] font-bold tracking-[3px] uppercase mb-1"
              style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
              Ferramentas
            </p>
            <h1 className="text-[42px] leading-none mb-2"
              style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
              Simulador de Financiamento
            </h1>
            <p className="text-[14px] max-w-xl" style={{ color: '#666' }}>
              Calcule a parcela, o total pago e os juros do financiamento do seu veículo.
              Compare taxas de diferentes bancos antes de assinar o contrato.
            </p>
          </div>
          <button onClick={() => router.push('/home')}
            className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center text-[16px] transition-all hover:bg-white/5"
            style={{ border: '1px solid #3a3a42', color: '#555' }} title="Fechar">✕</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">

          {/* ── LEFT: inputs ─────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-5">

            {/* Vehicle value */}
            <div className="rounded-2xl p-6" style={{ background: '#28282e', border: '1px solid #3a3a42' }}>
              <p className="text-[12px] font-bold uppercase tracking-[2px] mb-4"
                style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
                1. Valor do veículo
              </p>
              <label className="text-[10px] font-bold uppercase tracking-[1.5px] mb-1.5 block"
                style={{ color: '#555', fontFamily: 'var(--font-barlow-condensed)' }}>
                Preço do veículo (R$)
              </label>
              <input
                type="number" min={5000} max={1000000} step={1000}
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                className="w-full px-4 py-[13px] rounded-xl text-[14px] outline-none"
                style={inputStyle}
              />
              <div className="mt-4">
                <div className="flex justify-between mb-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-[1.5px]"
                    style={{ color: '#555', fontFamily: 'var(--font-barlow-condensed)' }}>
                    Entrada — {downPct}% ({fmtBRL(downValue)})
                  </label>
                  <span className="text-[11px]" style={{ color: '#666' }}>
                    Financiado: {fmtBRL(principal)}
                  </span>
                </div>
                <input
                  type="range" min={0} max={80} step={5}
                  value={downPct}
                  onChange={e => setDownPct(Number(e.target.value))}
                  className="w-full accent-orange-500 h-2"
                />
                <div className="flex justify-between mt-0.5 text-[10px]" style={{ color: '#3a3a42' }}>
                  <span>0%</span><span>20%</span><span>40%</span><span>60%</span><span>80%</span>
                </div>
              </div>
            </div>

            {/* Term */}
            <div className="rounded-2xl p-6" style={{ background: '#28282e', border: '1px solid #3a3a42' }}>
              <p className="text-[12px] font-bold uppercase tracking-[2px] mb-4"
                style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
                2. Prazo
              </p>
              <div className="grid grid-cols-6 gap-2">
                {TERMS.map(t => (
                  <button key={t} onClick={() => setTerm(t)}
                    className="py-3 rounded-xl text-[14px] font-black transition-all"
                    style={{
                      fontFamily: 'var(--font-bebas-neue)',
                      background: term === t ? '#ff6600' : '#222228',
                      color: term === t ? '#fff' : '#555',
                      border: `1px solid ${term === t ? 'transparent' : '#3a3a42'}`,
                    }}>
                    {t}x
                  </button>
                ))}
              </div>
            </div>

            {/* Rate */}
            <div className="rounded-2xl p-6" style={{ background: '#28282e', border: '1px solid #3a3a42' }}>
              <p className="text-[12px] font-bold uppercase tracking-[2px] mb-4"
                style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
                3. Taxa de juros
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                {BANK_RATES.map((b, i) => (
                  <button key={b.label} onClick={() => setBankIdx(i)}
                    className="px-3 py-2.5 rounded-xl text-left transition-all"
                    style={{
                      background: bankIdx === i ? '#ff660018' : '#222228',
                      border: `1px solid ${bankIdx === i ? '#ff660055' : '#3a3a42'}`,
                    }}>
                    <p className="text-[11px] font-bold" style={{ color: bankIdx === i ? '#ff6600' : '#666', fontFamily: 'var(--font-barlow-condensed)' }}>
                      {b.label}
                    </p>
                    {i < BANK_RATES.length - 1 && (
                      <p className="text-[13px] font-black" style={{ color: bankIdx === i ? '#f0ede8' : '#444', fontFamily: 'var(--font-bebas-neue)' }}>
                        {b.rate.toFixed(2)}% a.m.
                      </p>
                    )}
                  </button>
                ))}
              </div>
              {bankIdx === BANK_RATES.length - 1 && (
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[1.5px] mb-1.5 block"
                    style={{ color: '#555', fontFamily: 'var(--font-barlow-condensed)' }}>
                    Taxa mensal personalizada (%)
                  </label>
                  <input
                    type="number" min={0.1} max={10} step={0.01}
                    value={customRate}
                    onChange={e => setCustomRate(Number(e.target.value))}
                    className="w-full px-4 py-[13px] rounded-xl text-[14px] outline-none"
                    style={inputStyle}
                  />
                </div>
              )}
            </div>

            {/* Comparison across terms */}
            <div className="rounded-2xl p-6" style={{ background: '#28282e', border: '1px solid #3a3a42' }}>
              <p className="text-[12px] font-bold uppercase tracking-[2px] mb-4"
                style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
                Comparação por prazo
              </p>
              <div className="flex flex-col gap-2">
                {TERMS.map(t => {
                  const r = calcPrice(principal, rate, t)
                  const selected = t === term
                  return (
                    <button key={t} onClick={() => setTerm(t)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all"
                      style={{
                        background: selected ? '#ff660012' : '#222228',
                        border: `1px solid ${selected ? '#ff660055' : '#2a2a32'}`,
                      }}>
                      <span className="font-black w-8" style={{ color: selected ? '#ff6600' : '#555', fontFamily: 'var(--font-bebas-neue)', fontSize: 16 }}>{t}x</span>
                      <span className="flex-1 text-[13px] font-bold" style={{ color: selected ? '#f0ede8' : '#666' }}>{fmtBRL(r.monthly)}/mês</span>
                      <div className="text-right">
                        <p className="text-[11px]" style={{ color: selected ? '#aaa' : '#444' }}>Total: {fmtBRL(r.total)}</p>
                        <p className="text-[10px]" style={{ color: '#ef4444' }}>Juros: {fmtBRL(r.interest)}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ── RIGHT: result sticky panel ──────────────────────────────────── */}
          <div className="lg:sticky lg:top-6 flex flex-col gap-4">

            {/* Main result */}
            <div className="rounded-2xl p-6" style={{ background: '#28282e', border: '1px solid #ff660033' }}>
              <p className="text-[10px] font-bold uppercase tracking-[2px] mb-1"
                style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
                Parcela mensal ({term}x)
              </p>
              <p className="text-[52px] font-black leading-none mb-4"
                style={{ color: '#ff6600', fontFamily: 'var(--font-bebas-neue)' }}>
                {fmtBRL(result.monthly)}
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Valor do veículo',    value: fmtBRL(price),           color: '#f0ede8' },
                  { label: 'Entrada',              value: `${downPct}% · ${fmtBRL(downValue)}`, color: '#f0ede8' },
                  { label: 'Valor financiado',     value: fmtBRL(principal),       color: '#f0ede8' },
                  { label: 'Total a pagar',        value: fmtBRL(result.total),    color: '#f59e0b' },
                  { label: 'Total em juros',       value: fmtBRL(result.interest), color: '#ef4444' },
                  { label: 'Percentual de juros',  value: `${interestPct.toFixed(1)}%`, color: '#ef4444' },
                  { label: 'Taxa mensal',          value: `${rate.toFixed(2)}% a.m.`, color: '#aaa' },
                  { label: 'Taxa anual efetiva',   value: `${annualRate.toFixed(2)}% a.a.`, color: '#aaa' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex justify-between py-1" style={{ borderBottom: '1px solid #2a2a32' }}>
                    <span className="text-[12px]" style={{ color: '#555' }}>{label}</span>
                    <span className="text-[12px] font-bold" style={{ color }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Interest bar */}
              <div className="mt-4">
                <div className="flex justify-between text-[10px] mb-1" style={{ color: '#555' }}>
                  <span>Capital</span><span>Juros</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden flex" style={{ background: '#222228' }}>
                  <div className="h-full" style={{ width: `${100 - interestPct}%`, background: '#22c55e' }} />
                  <div className="h-full flex-1" style={{ background: '#ef4444' }} />
                </div>
                <div className="flex justify-between text-[10px] mt-1" style={{ color: '#555' }}>
                  <span>{fmtBRL(principal)}</span>
                  <span>{fmtBRL(result.interest)}</span>
                </div>
              </div>
            </div>

            {/* Income recommendation */}
            <div className="rounded-2xl p-4" style={{ background: '#28282e', border: '1px solid #3a3a42' }}>
              <p className="text-[10px] font-bold uppercase tracking-[1.5px] mb-1"
                style={{ color: '#555', fontFamily: 'var(--font-barlow-condensed)' }}>
                Renda mínima recomendada
              </p>
              <p className="text-[22px] font-black"
                style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
                {fmtBRL(result.monthly * 3)}
                <span className="text-[13px] font-normal text-[#666]"> /mês</span>
              </p>
              <p className="text-[11px] mt-1" style={{ color: '#444' }}>
                Parcela não deve ultrapassar 30% da renda líquida
              </p>
            </div>

            {/* Amortization table toggle */}
            <button onClick={() => setShowAmort(!showAmort)}
              className="w-full py-3 rounded-xl text-[12px] font-bold uppercase tracking-[1px] transition-all hover:bg-white/5"
              style={{ border: '1px solid #3a3a42', color: '#666', fontFamily: 'var(--font-barlow-condensed)' }}>
              {showAmort ? '▲ Ocultar' : '▼ Ver'} tabela de amortização
            </button>

            {showAmort && (
              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #3a3a42' }}>
                <table className="w-full text-[11px]">
                  <thead>
                    <tr style={{ background: '#30303a' }}>
                      {['Parcela', 'Pagamento', 'Juros', 'Amort.', 'Saldo'].map(h => (
                        <th key={h} className="px-3 py-2 text-left font-bold uppercase tracking-[0.5px]"
                          style={{ color: '#555', fontFamily: 'var(--font-barlow-condensed)' }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows
                      .filter((_, i) => i === 0 || i === 1 || i === 2 || i === result.rows.length - 3 || i === result.rows.length - 2 || i === result.rows.length - 1)
                      .map((row, idx, arr) => (
                        <>
                          {idx === 3 && (
                            <tr key="ellipsis">
                              <td colSpan={5} className="px-3 py-2 text-center" style={{ color: '#333' }}>⋯</td>
                            </tr>
                          )}
                          <tr key={row.month} style={{ background: idx % 2 === 0 ? '#28282e' : '#222228' }}>
                            <td className="px-3 py-2 font-bold" style={{ color: '#666' }}>{row.month}ª</td>
                            <td className="px-3 py-2" style={{ color: '#f0ede8' }}>{fmtBRL(row.payment)}</td>
                            <td className="px-3 py-2" style={{ color: '#ef4444' }}>{fmtBRL(row.interest)}</td>
                            <td className="px-3 py-2" style={{ color: '#22c55e' }}>{fmtBRL(row.principal)}</td>
                            <td className="px-3 py-2" style={{ color: '#888' }}>{fmtBRL(row.balance)}</td>
                          </tr>
                        </>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
