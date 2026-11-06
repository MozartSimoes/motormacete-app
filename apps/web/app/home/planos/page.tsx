'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import type { Plan } from '@/lib/plan'

interface PlanInfo { plan: Plan; expiresAt: string | null }

const DRIVER_FEATURES = [
  { text: 'Veículos ilimitados na garagem',       pro: true  },
  { text: '1 veículo no plano grátis',              pro: false },
  { text: 'Mecânico Virtual ilimitado',            pro: true  },
  { text: '5 consultas/mês no plano grátis',       pro: false },
  { text: 'Alertas de manutenção por e-mail',      pro: true  },
  { text: 'Laudo PDF completo para venda',         pro: true  },
  { text: 'Gráficos de gastos por categoria',      pro: true  },
  { text: 'Custo por km rodado',                   pro: true  },
  { text: 'Histórico ilimitado de manutenção',     pro: true  },
  { text: 'Badge Pro no perfil',                   pro: true  },
]

const MECHANIC_FEATURES = [
  { text: 'Ordens de serviço ilimitadas',          pro: true  },
  { text: '10 OS/mês no plano grátis',             pro: false },
  { text: 'Dashboard financeiro completo',         pro: true  },
  { text: 'Relatórios de faturamento em PDF',      pro: true  },
  { text: 'Destaque no mapa de oficinas',          pro: true  },
  { text: 'Mecânico Virtual ilimitado',            pro: true  },
  { text: 'Alertas de manutenção dos clientes',    pro: true  },
  { text: 'Badge Mecânico Verificado',             pro: true  },
  { text: 'Exportação de relatórios',              pro: true  },
]

function FeatureRow({ text, pro, userPro }: { text: string; pro: boolean; userPro: boolean }) {
  const enabled = !pro || userPro
  return (
    <div className="flex items-center gap-3 py-2.5" style={{ borderBottom: '1px solid #2a2a32' }}>
      <span className="text-[16px] shrink-0">
        {enabled ? '✅' : '🔒'}
      </span>
      <span className="text-[14px]" style={{ color: enabled ? '#f0ede8' : '#444' }}>
        {text}
      </span>
      {pro && !userPro && (
        <span className="ml-auto text-[10px] font-bold uppercase tracking-[1px] px-2 py-0.5 rounded-full shrink-0"
          style={{ background: 'rgba(255,102,0,0.15)', color: '#ff8533', fontFamily: 'var(--font-barlow-condensed)' }}>
          PRO
        </span>
      )}
    </div>
  )
}

export default function PlanosPage() {
  const router = useRouter()
  const [planInfo, setPlanInfo] = useState<PlanInfo | null>(null)
  const [loading, setLoading]   = useState(true)
  const [userType, setUserType] = useState<'DRIVER' | 'MECHANIC' | null>(null)

  useEffect(() => {
    Promise.all([
      fetch('/api/plan').then(r => r.json()),
      fetch('/api/auth/me').then(r => r.json()),
    ]).then(([plan, auth]) => {
      setPlanInfo(plan)
      setUserType(auth.user?.type ?? null)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const isPro = planInfo?.plan === 'DRIVER_PRO' || planInfo?.plan === 'MECHANIC_PRO'

  // Fix 1: padrão MENSAL — valor mais baixo na chegada
  const [billing, setBilling]         = useState<'monthly' | 'annual'>('monthly')
  const [checkingOut, setCheckingOut] = useState(false)

  const PRICES = {
    driver:   { monthly: 'R$3,99/mês',   annual: 'R$39,90/ano',  monthlyEquiv: 'R$3,33/mês' },
    mechanic: { monthly: 'R$6,99/mês',   annual: 'R$69,90/ano',  monthlyEquiv: 'R$5,83/mês' },
  }

  async function doCheckout(type: 'driver' | 'mechanic', bill: 'monthly' | 'annual') {
    setCheckingOut(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, billing: bill }),
      })
      const data = await res.json()
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        alert(data.error ?? 'Erro ao iniciar pagamento. Tente novamente.')
      }
    } catch {
      alert('Erro de conexão. Tente novamente.')
    } finally {
      setCheckingOut(false)
    }
  }

  // Se não logado, salva o plano pendente e abre cadastro/login
  // Após login, o listener abaixo detecta o plano pendente e vai para o checkout
  async function handleUpgrade(type: 'driver' | 'mechanic') {
    if (!userType) {
      sessionStorage.setItem('mm_pending_plan', JSON.stringify({ type, billing }))
      window.dispatchEvent(new CustomEvent('mm:open-auth', { detail: { step: 'register', type } }))
      return
    }
    await doCheckout(type, billing)
  }

  // Após login/cadastro, verifica se havia plano pendente (clicou em Assinar antes de logar)
  useEffect(() => {
    function onLoggedIn() {
      const pending = sessionStorage.getItem('mm_pending_plan')
      if (!pending) return
      sessionStorage.removeItem('mm_pending_plan')
      const { type, billing: bill } = JSON.parse(pending)
      setTimeout(() => doCheckout(type, bill), 500)
    }
    window.addEventListener('mm:logged-in', onLoggedIn)
    return () => window.removeEventListener('mm:logged-in', onLoggedIn)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#1c1c22' }}>
      <Header />

      <div className="max-w-[980px] mx-auto px-4 py-12">

        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <p className="text-[12px] font-bold tracking-[3px] uppercase mb-2"
            style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
            Planos MotorMacete
          </p>
          <h1 className="text-[52px] leading-none mb-4"
            style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
            Escolha seu plano
          </h1>
          <p className="text-[16px] max-w-xl mx-auto leading-relaxed" style={{ color: '#666' }}>
            Comece gratuitamente. Faça upgrade quando quiser mais recursos.
            Cancele a qualquer momento.
          </p>
        </div>

        {/* Toggle Mensal / Anual */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <div className="flex items-center gap-1 rounded-2xl p-1" style={{ background: '#28282e', border: '1px solid #3a3a42' }}>
            <button
              onClick={() => setBilling('monthly')}
              className="px-6 py-2.5 rounded-xl text-[13px] font-bold uppercase tracking-[1px] transition-all"
              style={{
                fontFamily: 'var(--font-barlow-condensed)',
                background: billing === 'monthly' ? '#3a3a42' : 'transparent',
                color: billing === 'monthly' ? '#f0ede8' : '#555',
              }}
            >
              Mensal
            </button>
            <button
              onClick={() => setBilling('annual')}
              className="relative px-6 py-2.5 rounded-xl text-[13px] font-bold uppercase tracking-[1px] transition-all"
              style={{
                fontFamily: 'var(--font-barlow-condensed)',
                background: billing === 'annual' ? '#ff6600' : 'transparent',
                color: billing === 'annual' ? '#111' : '#555',
              }}
            >
              Anual
              {billing !== 'annual' && (
                <span className="absolute -top-2.5 -right-2 text-[9px] font-black px-1.5 py-0.5 rounded-full"
                  style={{ background: '#22c55e', color: '#fff', fontFamily: 'var(--font-barlow-condensed)' }}>
                  -25%
                </span>
              )}
            </button>
          </div>
          {billing === 'annual' && (
            <p className="text-[13px]" style={{ color: '#22c55e' }}>
              ✅ Pague uma vez — PIX, boleto ou cartão. 2 meses grátis!
            </p>
          )}
          {billing === 'monthly' && (
            <p className="text-[13px]" style={{ color: '#555' }}>
              Cobrança automática todo mês no cartão de crédito
            </p>
          )}
        </div>

        {/* Plano atual (se logado e Pro) */}
        {isPro && planInfo && (
          <div className="mb-8 rounded-2xl px-6 py-4 flex items-center gap-3"
            style={{ background: 'rgba(255,102,0,0.08)', border: '1px solid rgba(255,102,0,0.3)' }}>
            <span className="text-2xl">⭐</span>
            <div>
              <p className="text-[13px] font-bold" style={{ color: '#ff8533' }}>
                Você já é Pro!
              </p>
              <p className="text-[12px]" style={{ color: '#666' }}>
                Plano {planInfo.plan === 'DRIVER_PRO' ? 'Motorista Pro' : 'Mecânico Pro'}
                {planInfo.expiresAt && ` · Renova em ${new Date(planInfo.expiresAt).toLocaleDateString('pt-BR')}`}
              </p>
            </div>
          </div>
        )}

        {/* Cards de planos */}
        <div className="grid gap-6 md:grid-cols-3 mb-16">

          {/* Grátis */}
          <div className="rounded-2xl p-6 flex flex-col" style={{ background: '#28282e', border: '1px solid #3a3a42' }}>
            <p className="text-[11px] font-bold uppercase tracking-[2px] mb-3" style={{ color: '#555', fontFamily: 'var(--font-barlow-condensed)' }}>Para começar</p>
            <p className="text-[36px] leading-none mb-1" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>Grátis</p>
            <p className="text-[13px] mb-6" style={{ color: '#444' }}>Para sempre</p>
            <div className="flex-1 space-y-1 mb-6">
              {[
                '1 veículo na garagem',
                '5 consultas/mês no Mecânico Virtual',
                'Histórico de manutenção',
                'Pesquisa de macetes ilimitada',
                'Notícias automotivas',
              ].map(f => (
                <div key={f} className="flex items-center gap-2 py-1.5">
                  <span style={{ color: '#555' }}>✓</span>
                  <span className="text-[13px]" style={{ color: '#777' }}>{f}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl py-3 text-center text-[13px] font-bold uppercase tracking-[1px]"
              style={{ background: '#30303a', color: '#444', fontFamily: 'var(--font-barlow-condensed)' }}>
              Plano atual (grátis)
            </div>
          </div>

          {/* Motorista Pro */}
          <div className="rounded-2xl p-6 flex flex-col relative"
            style={{ background: '#28282e', border: '2px solid #ff6600', boxShadow: '0 0 40px rgba(255,102,0,0.12)' }}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-black uppercase tracking-[1.5px]"
              style={{ background: '#ff6600', color: '#111', fontFamily: 'var(--font-barlow-condensed)' }}>
              Mais popular
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[2px] mb-3" style={{ color: '#ff8533', fontFamily: 'var(--font-barlow-condensed)' }}>Motorista Pro</p>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-[42px] leading-none" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
                {billing === 'annual' ? 'R$39,90' : 'R$3,99'}
              </span>
              <span className="text-[13px]" style={{ color: '#555' }}>{billing === 'annual' ? '/ano' : '/mês'}</span>
            </div>
            <p className="text-[12px] mb-6" style={{ color: billing === 'annual' ? '#22c55e' : '#444' }}>
              {billing === 'annual' ? '≈ R$3,33/mês · 2 meses grátis · cartão ou boleto' : '≈ R$0,13/dia · só cartão automático'}
            </p>
            <div className="flex-1 space-y-1 mb-6">
              {[
                'Tudo do plano grátis',
                '✨ Veículos ilimitados',
                '✨ Mecânico Virtual ilimitado',
                '✨ Alertas de manutenção',
                '✨ Laudo PDF para venda',
                '✨ Gráficos de gastos',
                '✨ Badge Pro',
              ].map(f => (
                <div key={f} className="flex items-center gap-2 py-1.5">
                  <span style={{ color: f.startsWith('✨') ? '#ff8533' : '#555' }}>
                    {f.startsWith('✨') ? '⭐' : '✓'}
                  </span>
                  <span className="text-[13px]" style={{ color: f.startsWith('✨') ? '#f0ede8' : '#777' }}>
                    {f.replace('✨ ', '')}
                  </span>
                </div>
              ))}
            </div>
            {isPro && planInfo?.plan === 'DRIVER_PRO' ? (
              <div className="rounded-xl py-3 text-center text-[13px] font-bold uppercase tracking-[1px]"
                style={{ background: 'rgba(255,102,0,0.15)', color: '#ff8533', fontFamily: 'var(--font-barlow-condensed)' }}>
                ✅ Seu plano atual
              </div>
            ) : (
              <button onClick={() => handleUpgrade('driver')} disabled={checkingOut}
                className="rounded-xl py-3.5 text-[14px] font-black uppercase tracking-[1.5px] transition-all active:scale-95 hover:opacity-90 disabled:opacity-60"
                style={{ background: '#ff6600', color: '#111', fontFamily: 'var(--font-barlow-condensed)' }}>
                {checkingOut ? 'Aguarde...' : billing === 'annual' ? 'Assinar por R$39,90/ano' : 'Assinar por R$3,99/mês'}
              </button>
            )}
          </div>

          {/* Mecânico Pro */}
          <div className="rounded-2xl p-6 flex flex-col" style={{ background: '#28282e', border: '1px solid #3a3a42' }}>
            <p className="text-[11px] font-bold uppercase tracking-[2px] mb-3" style={{ color: '#60a5fa', fontFamily: 'var(--font-barlow-condensed)' }}>Mecânico Pro</p>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-[42px] leading-none" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
                {billing === 'annual' ? 'R$69,90' : 'R$6,99'}
              </span>
              <span className="text-[13px]" style={{ color: '#555' }}>{billing === 'annual' ? '/ano' : '/mês'}</span>
            </div>
            <p className="text-[12px] mb-6" style={{ color: billing === 'annual' ? '#22c55e' : '#444' }}>
              {billing === 'annual' ? '≈ R$5,83/mês · 2 meses grátis · cartão ou boleto' : 'Para oficinas e mecânicos profissionais'}
            </p>
            <div className="flex-1 space-y-1 mb-6">
              {[
                'Tudo do Motorista Pro',
                '✨ OS ilimitadas',
                '✨ Dashboard financeiro completo',
                '✨ Relatórios PDF de faturamento',
                '✨ Destaque no mapa de oficinas',
                '✨ Badge Mecânico Verificado',
                '✨ Exportação de relatórios',
              ].map(f => (
                <div key={f} className="flex items-center gap-2 py-1.5">
                  <span style={{ color: f.startsWith('✨') ? '#60a5fa' : '#555' }}>
                    {f.startsWith('✨') ? '🔵' : '✓'}
                  </span>
                  <span className="text-[13px]" style={{ color: f.startsWith('✨') ? '#f0ede8' : '#777' }}>
                    {f.replace('✨ ', '')}
                  </span>
                </div>
              ))}
            </div>
            {isPro && planInfo?.plan === 'MECHANIC_PRO' ? (
              <div className="rounded-xl py-3 text-center text-[13px] font-bold uppercase tracking-[1px]"
                style={{ background: 'rgba(96,165,250,0.15)', color: '#60a5fa', fontFamily: 'var(--font-barlow-condensed)' }}>
                ✅ Seu plano atual
              </div>
            ) : (
              <button onClick={() => handleUpgrade('mechanic')} disabled={checkingOut}
                className="rounded-xl py-3.5 text-[14px] font-black uppercase tracking-[1.5px] transition-all active:scale-95 hover:bg-blue-500/20 disabled:opacity-60"
                style={{ border: '1px solid rgba(96,165,250,0.4)', color: '#60a5fa', fontFamily: 'var(--font-barlow-condensed)' }}>
                {checkingOut ? 'Aguarde...' : billing === 'annual' ? 'Assinar por R$69,90/ano' : 'Assinar por R$6,99/mês'}
              </button>
            )}
          </div>
        </div>

        {/* Comparativo detalhado */}
        <div className="mb-12">
          <h2 className="text-[28px] mb-6" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
            Comparativo completo
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Motorista */}
            <div className="rounded-2xl p-6" style={{ background: '#28282e', border: '1px solid #3a3a42' }}>
              <p className="text-[13px] font-bold uppercase tracking-[2px] mb-4" style={{ color: '#ff8533', fontFamily: 'var(--font-barlow-condensed)' }}>
                Para Motoristas
              </p>
              {DRIVER_FEATURES.map(f => (
                <FeatureRow key={f.text} text={f.text} pro={f.pro} userPro={isPro} />
              ))}
            </div>

            {/* Mecânico */}
            <div className="rounded-2xl p-6" style={{ background: '#28282e', border: '1px solid #3a3a42' }}>
              <p className="text-[13px] font-bold uppercase tracking-[2px] mb-4" style={{ color: '#60a5fa', fontFamily: 'var(--font-barlow-condensed)' }}>
                Para Mecânicos e Oficinas
              </p>
              {MECHANIC_FEATURES.map(f => (
                <FeatureRow key={f.text} text={f.text} pro={f.pro} userPro={isPro} />
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12 rounded-2xl p-8" style={{ background: '#28282e', border: '1px solid #3a3a42' }}>
          <h2 className="text-[24px] mb-6" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>Perguntas frequentes</h2>
          <div className="space-y-5">
            {[
              { q: 'Posso cancelar a qualquer momento?', a: 'Sim. Sem fidelidade, sem multa. Você pode cancelar quando quiser e continua com acesso até o fim do período pago.' },
              { q: 'Quais formas de pagamento?', a: 'Plano anual: PIX, boleto ou cartão — paga uma vez e fica Pro por 12 meses. Plano mensal: apenas cartão de crédito (cobrança automática todo mês).' },
              { q: 'Meus dados ficam salvos se eu cancelar?', a: 'Sim. Seu histórico de manutenção fica salvo. Apenas os recursos Pro são pausados.' },
              { q: 'Qual a diferença do plano anual?', a: 'No plano anual você paga uma única vez (PIX, boleto ou cartão) e fica Pro por 12 meses. Equivale a 2 meses grátis comparado ao mensal. Ideal para quem prefere PIX ou boleto.' },
              { q: 'O app mobile também inclui o Pro?', a: 'Sim! Uma assinatura vale tanto no site quanto no aplicativo.' },
            ].map(item => (
              <div key={item.q} className="border-b pb-4 last:border-0 last:pb-0" style={{ borderColor: '#2a2a32' }}>
                <p className="text-[14px] font-semibold mb-2" style={{ color: '#f0ede8' }}>{item.q}</p>
                <p className="text-[13px] leading-relaxed" style={{ color: '#666' }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}
