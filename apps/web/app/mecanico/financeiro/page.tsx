'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'

interface MonthStat { month: string; revenue: number; count: number }
interface Stats {
  open: number; inProgress: number
  monthlyCount: number; monthlyRevenue: number
  lastMonthRevenue: number; totalOS: number
}

export default function FinanceiroPage() {
  const router = useRouter()
  const [stats, setStats]   = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [userPlan, setUserPlan] = useState<string>('FREE')
  const [isAdmin, setIsAdmin]   = useState(false)
  const [isTrialing, setIsTrialing] = useState(false)
  const [generatingPdf, setGeneratingPdf] = useState(false)
  const now = new Date()
  const [pdfMonth, setPdfMonth] = useState(now.getMonth() + 1)
  const [pdfYear,  setPdfYear]  = useState(now.getFullYear())

  const isPro = isAdmin || isTrialing || userPlan === "MECHANIC_PRO" || userPlan === "DRIVER_PRO"

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => {
      if (d.user) { setUserPlan(d.user.plan ?? "FREE"); setIsAdmin(d.user.isAdmin ?? false); setIsTrialing(d.user.isTrialing ?? false) }
    }).catch(() => {})
  }, [])

  async function downloadRelatorio() {
    setGeneratingPdf(true)
    try {
      const res = await fetch(`/api/mecanico/relatorio?month=${pdfMonth}&year=${pdfYear}`)
      if (!res.ok) { alert('Erro ao gerar relatório.'); return }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `relatorio-faturamento-${pdfYear}-${String(pdfMonth).padStart(2,'0')}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch { alert('Erro de conexão.') }
    finally { setGeneratingPdf(false) }
  }

  useEffect(() => {
    fetch('/api/mecanico/stats')
      .then((r) => {
        if (r.status === 401) { router.push('/home'); return null }
        return r.json()
      })
      .then((d) => { if (d) setStats(d.stats) })
      .finally(() => setLoading(false))
  }, [router])

  const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  const growth = stats && stats.lastMonthRevenue > 0
    ? ((stats.monthlyRevenue - stats.lastMonthRevenue) / stats.lastMonthRevenue * 100).toFixed(1)
    : null

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#1c1c22' }}>
      <p style={{ color: '#555' }}>Carregando...</p>
    </div>
  )

  return (
    <div className="min-h-screen" style={{ background: '#1c1c22' }}>
      <Header />
      <div className="max-w-[860px] mx-auto px-4 py-10">

        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-[12px] font-bold tracking-[3px] uppercase mb-1"
              style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>Financeiro</p>
            <h1 className="text-[42px] leading-none"
              style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
              Resumo Financeiro
            </h1>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {isPro && (
              <div className="flex items-center gap-2">
                <select value={pdfMonth} onChange={e => setPdfMonth(Number(e.target.value))}
                  className="px-2 py-1.5 rounded-lg text-[12px] outline-none"
                  style={{ background: '#28282e', border: '1px solid #3a3a42', color: '#aaa' }}>
                  {['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'].map((m,i) => (
                    <option key={i} value={i+1}>{m}</option>
                  ))}
                </select>
                <select value={pdfYear} onChange={e => setPdfYear(Number(e.target.value))}
                  className="px-2 py-1.5 rounded-lg text-[12px] outline-none"
                  style={{ background: '#28282e', border: '1px solid #3a3a42', color: '#aaa' }}>
                  {[now.getFullYear()-1, now.getFullYear()].map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                <button onClick={downloadRelatorio} disabled={generatingPdf}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-[12px] font-bold uppercase tracking-[1px] transition-all disabled:opacity-60"
                  style={{ background: 'rgba(255,102,0,0.1)', border: '1px solid rgba(255,102,0,0.3)', color: '#ff8533', fontFamily: 'var(--font-barlow-condensed)' }}>
                  {generatingPdf ? '⏳ Gerando...' : '📄 Relatório PDF'}
                </button>
              </div>
            )}
            <button onClick={() => router.push('/mecanico')}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[16px] hover:bg-white/5"
              style={{ border: '1px solid #3a3a42', color: '#555' }}>✕</button>
          </div>
        </div>

        {/* Main stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-2xl p-6" style={{ background: '#222228', border: '1px solid #2a2a32' }}>
            <p className="text-[11px] font-bold uppercase tracking-[2px] mb-2"
              style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
              Faturamento Este Mês
            </p>
            <p className="text-[36px] font-black leading-none"
              style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
              {fmt(stats?.monthlyRevenue ?? 0)}
            </p>
            {growth !== null && (
              <p className="text-[12px] mt-2 font-bold"
                style={{ color: parseFloat(growth) >= 0 ? '#22c55e' : '#ef4444' }}>
                {parseFloat(growth) >= 0 ? '▲' : '▼'} {Math.abs(parseFloat(growth))}% vs mês anterior
              </p>
            )}
          </div>

          <div className="rounded-2xl p-6" style={{ background: '#222228', border: '1px solid #2a2a32' }}>
            <p className="text-[11px] font-bold uppercase tracking-[2px] mb-2"
              style={{ color: '#aaa', fontFamily: 'var(--font-barlow-condensed)' }}>
              Mês Anterior
            </p>
            <p className="text-[36px] font-black leading-none"
              style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
              {fmt(stats?.lastMonthRevenue ?? 0)}
            </p>
          </div>

          <div className="rounded-2xl p-6" style={{ background: '#222228', border: '1px solid #2a2a32' }}>
            <p className="text-[11px] font-bold uppercase tracking-[2px] mb-2"
              style={{ color: '#aaa', fontFamily: 'var(--font-barlow-condensed)' }}>
              Total de OS
            </p>
            <p className="text-[36px] font-black leading-none"
              style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
              {stats?.totalOS ?? 0}
            </p>
            <p className="text-[12px] mt-2" style={{ color: '#555' }}>
              {stats?.monthlyCount ?? 0} este mês
            </p>
          </div>
        </div>

        {/* OS Status summary */}
        <div className="rounded-2xl p-6 mb-6" style={{ background: '#222228', border: '1px solid #2a2a32' }}>
          <p className="text-[13px] font-bold uppercase tracking-[1.5px] mb-5"
            style={{ color: '#aaa', fontFamily: 'var(--font-barlow-condensed)' }}>
            Status das OS
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Abertas',      value: stats?.open ?? 0,        color: '#3b82f6' },
              { label: 'Em andamento', value: stats?.inProgress ?? 0,  color: '#ff8c00' },
              { label: 'Este mês',     value: stats?.monthlyCount ?? 0, color: '#a855f7' },
              { label: 'Total geral',  value: stats?.totalOS ?? 0,     color: '#22c55e' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl p-4 text-center"
                style={{ background: `${s.color}0d`, border: `1px solid ${s.color}25` }}>
                <p className="text-[28px] font-black"
                  style={{ color: s.color, fontFamily: 'var(--font-bebas-neue)' }}>{s.value}</p>
                <p className="text-[11px] font-bold uppercase tracking-[1px]"
                  style={{ color: s.color, opacity: 0.7, fontFamily: 'var(--font-barlow-condensed)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-6" style={{ background: 'rgba(255,102,0,0.04)', border: '1px solid rgba(255,102,0,0.15)' }}>
          <p className="text-[13px] leading-relaxed" style={{ color: '#777' }}>
            💡 <strong style={{ color: '#ff8533' }}>Dica:</strong> Para ver o histórico completo de faturamento mês a mês,
            registre todas as OS como <strong style={{ color: '#aaa' }}>Concluída</strong> ou <strong style={{ color: '#aaa' }}>Fechada</strong> após a entrega do veículo.
            Isso garante que o valor seja contabilizado corretamente no financeiro.
          </p>
        </div>

      </div>
    </div>
  )
}
