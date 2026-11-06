'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'

const STATUS_LABEL: Record<string, string> = {
  OPEN:          'Aberta',
  IN_PROGRESS:   'Em andamento',
  WAITING_PARTS: 'Aguardando peças',
  DONE:          'Concluída',
  CLOSED:        'Fechada',
  CANCELLED:     'Cancelada',
}
const STATUS_COLOR: Record<string, string> = {
  OPEN:          '#3b82f6',
  IN_PROGRESS:   '#ff8c00',
  WAITING_PARTS: '#a855f7',
  DONE:          '#22c55e',
  CLOSED:        '#555',
  CANCELLED:     '#ef4444',
}

interface RecentOS {
  id: string; number: number; clientName: string
  vehicleBrand: string; vehicleModel: string
  status: string; total: number; createdAt: string
}
interface Stats {
  open: number; inProgress: number
  monthlyCount: number; monthlyRevenue: number
  lastMonthRevenue: number; totalOS: number
}

export default function MechanicDashboard() {
  const router = useRouter()
  const [workshop, setWorkshop] = useState<{ name: string } | null>(null)
  const [stats, setStats]       = useState<Stats | null>(null)
  const [recentOS, setRecentOS] = useState<RecentOS[]>([])
  const [loading, setLoading]   = useState(true)
  const [userPlan, setUserPlan] = useState<string>('FREE')
  const [isAdmin, setIsAdmin]   = useState(false)
  const [isTrialing, setIsTrialing] = useState(false)

  const isPro = isAdmin || isTrialing || userPlan === "MECHANIC_PRO" || userPlan === "DRIVER_PRO"

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => {
      if (d.user) { setUserPlan(d.user.plan ?? "FREE"); setIsAdmin(d.user.isAdmin ?? false); setIsTrialing(d.user.isTrialing ?? false) }
    }).catch(() => {})
  }, [])

  useEffect(() => {
    fetch('/api/mecanico/stats')
      .then((r) => {
        if (r.status === 401) { router.push('/home'); return null }
        return r.json()
      })
      .then((d) => {
        if (!d) return
        setWorkshop(d.workshop)
        setStats(d.stats)
        setRecentOS(d.recentOS)
      })
      .finally(() => setLoading(false))
  }, [router])

  const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#1c1c22' }}>
        <p style={{ color: '#555' }}>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#1c1c22' }}>
      <Header />
      <div className="max-w-[980px] mx-auto px-4 py-10">

        {/* Title */}
        <div className="mb-8">
          <p className="text-[12px] font-bold tracking-[3px] uppercase mb-1"
            style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
            Painel do Mecânico
          </p>
          <div className="flex items-center gap-3 flex-wrap mb-1">
            <h1 className="text-[42px] leading-none"
              style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
              {workshop?.name ?? 'Minha Oficina'}
            </h1>
            {isPro && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-black uppercase tracking-[1px]"
                style={{ background: 'rgba(255,102,0,0.12)', border: '1px solid rgba(255,102,0,0.35)', color: '#ff6600' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Mecânico Verificado
              </span>
            )}
          </div>
          <p className="text-[14px]" style={{ color: '#555' }}>
            {isPro ? 'Plano Mecânico Pro ativo — todos os recursos desbloqueados.' : 'Bem-vindo ao seu painel de controle. Gerencie OS, clientes e financeiro.'}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'OS Abertas',        value: stats?.open ?? 0,          color: '#3b82f6', fmt: String },
            { label: 'Em Andamento',      value: stats?.inProgress ?? 0,    color: '#ff8c00', fmt: String },
            { label: 'OS Este Mês',       value: stats?.monthlyCount ?? 0,  color: '#a855f7', fmt: String },
            { label: 'Faturamento/Mês',   value: stats?.monthlyRevenue ?? 0, color: '#22c55e', fmt: fmt },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl px-5 py-4"
              style={{ background: '#222228', border: '1px solid #2a2a32' }}>
              <p className="text-[26px] font-black leading-none mb-1"
                style={{ color: s.color, fontFamily: 'var(--font-bebas-neue)' }}>
                {s.fmt(s.value as never)}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[1.5px]"
                style={{ color: '#555', fontFamily: 'var(--font-barlow-condensed)' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button onClick={() => router.push('/mecanico/os/nova')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold uppercase tracking-[1px] transition-all active:scale-95 hover:opacity-90"
            style={{ background: '#ff6600', color: '#111', fontFamily: 'var(--font-barlow-condensed)' }}>
            + Nova Ordem de Serviço
          </button>
          <button onClick={() => router.push('/mecanico/os')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold uppercase tracking-[1px] transition-all hover:bg-white/5"
            style={{ border: '1px solid #3a3a42', color: '#aaa', fontFamily: 'var(--font-barlow-condensed)' }}>
            📋 Ver todas as OS
          </button>
          <button onClick={() => router.push('/mecanico/financeiro')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold uppercase tracking-[1px] transition-all hover:bg-white/5"
            style={{ border: '1px solid #3a3a42', color: '#aaa', fontFamily: 'var(--font-barlow-condensed)' }}>
            📊 Financeiro
          </button>
        </div>

        {/* Recent OS */}
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #2a2a32' }}>
          <div className="px-5 py-3 flex items-center justify-between"
            style={{ background: '#222228', borderBottom: '1px solid #2a2a32' }}>
            <p className="text-[13px] font-bold uppercase tracking-[1px]"
              style={{ color: '#aaa', fontFamily: 'var(--font-barlow-condensed)' }}>
              Últimas Ordens de Serviço
            </p>
            <button onClick={() => router.push('/mecanico/os')}
              className="text-[12px] font-bold uppercase tracking-[1px] transition hover:opacity-70"
              style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
              Ver todas →
            </button>
          </div>

          {recentOS.length === 0 ? (
            <div className="px-5 py-10 text-center" style={{ background: '#1c1c22' }}>
              <p className="text-[14px]" style={{ color: '#555' }}>Nenhuma OS registrada ainda.</p>
              <button onClick={() => router.push('/mecanico/os/nova')}
                className="mt-3 px-5 py-2 rounded-xl text-[13px] font-bold uppercase tracking-[1px] transition-all active:scale-95"
                style={{ background: '#ff6600', color: '#111', fontFamily: 'var(--font-barlow-condensed)' }}>
                Criar primeira OS
              </button>
            </div>
          ) : (
            <div style={{ background: '#1c1c22' }}>
              {recentOS.map((os, i) => (
                <div key={os.id}
                  onClick={() => router.push(`/mecanico/os/${os.id}`)}
                  className="px-5 py-3.5 flex items-center gap-4 cursor-pointer transition hover:bg-white/[0.03]"
                  style={{ borderTop: i > 0 ? '1px solid #30303a' : undefined }}>
                  <span className="text-[13px] font-black w-12 shrink-0"
                    style={{ color: '#ff6600', fontFamily: 'var(--font-bebas-neue)' }}>
                    #{os.number.toString().padStart(3, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold truncate" style={{ color: '#f0ede8' }}>
                      {os.clientName}
                    </p>
                    <p className="text-[12px]" style={{ color: '#555' }}>
                      {os.vehicleBrand} {os.vehicleModel}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.5px] shrink-0"
                    style={{ background: `${STATUS_COLOR[os.status]}18`, color: STATUS_COLOR[os.status], border: `1px solid ${STATUS_COLOR[os.status]}30` }}>
                    {STATUS_LABEL[os.status]}
                  </span>
                  <span className="text-[14px] font-bold shrink-0" style={{ color: '#f0ede8' }}>
                    {fmt(os.total)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tools section */}
        <div className="mt-8">
          <p className="text-[12px] font-bold tracking-[2px] uppercase mb-4"
            style={{ color: '#555', fontFamily: 'var(--font-barlow-condensed)' }}>
            Ferramentas Rápidas
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: '🔍', label: 'Macetes',      href: '/home/macetes'  },
              { icon: '💬', label: 'IA Mecânico',  href: '/home/mecanico' },
              { icon: '🔌', label: 'Códigos OBD',  href: '/home/obd'      },
              { icon: '💰', label: 'Tabela FIPE',  href: '/home/macetes'  },
            ].map((t) => (
              <button key={t.label} onClick={() => router.push(t.href)}
                className="rounded-xl px-4 py-3 flex items-center gap-3 transition hover:bg-white/5"
                style={{ background: '#222228', border: '1px solid #2a2a32' }}>
                <span className="text-[20px]">{t.icon}</span>
                <span className="text-[13px] font-bold" style={{ color: '#aaa', fontFamily: 'var(--font-barlow-condensed)' }}>
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
