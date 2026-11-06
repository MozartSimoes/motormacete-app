'use client'

import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface SessionUser { name: string; email: string; type: 'DRIVER' | 'MECHANIC'; plan?: string; isAdmin?: boolean; isTrialing?: boolean; trialDaysLeft?: number }

const DRIVER_NAV = [
  { label: 'Home',        href: '/home'           },
  { label: 'Notícias',   href: '/home/noticias'  },
  { label: 'Macetes',     href: '/home/macetes'   },
  { label: 'Artigos',     href: '/artigos'        },
  { label: 'Recall',      href: '/home/recall'    },
  { label: 'Mecânico',   href: '/home/mecanico'  },
  { label: 'Garagem',    href: '/home/garagem'    },
  { label: 'Checklist',  href: '/home/checklist' },
  { label: 'Comparador', href: '/home/comparar'  },
  { label: 'Calculadora',href: '/home/custos'    },
  { label: 'Oficinas',   href: '/home/oficinas'  },
  { label: 'OBD',        href: '/home/obd'       },
  { label: 'Pro',           href: '/home/planos'   },
]

const MECHANIC_NAV = [
  { label: 'Dashboard',         href: '/mecanico'            },
  { label: 'Ordens de Serviço', href: '/mecanico/os'         },
  { label: 'Financeiro',        href: '/mecanico/financeiro' },
  { label: 'Notícias',         href: '/home/noticias'       },
  { label: 'Macetes',           href: '/home/macetes'        },
  { label: 'Recall',            href: '/home/recall'         },
  { label: 'OBD',               href: '/home/obd'            },
  { label: 'Pro',               href: '/home/planos'        },
]

const WORKSHOP_SPECIALTIES = [
  'Mecânica Geral','Elétrica Automotiva','Funilaria e Pintura','Suspensão e Freios',
  'Câmbio e Transmissão','Ar Condicionado Automotivo','Injeção Eletrônica',
  'Alinhamento e Balanceamento','Borracharia','Diagnóstico Computadorizado',
  'Motor e Retífica','Escapamento',
]

type Step = 'choose' | 'register' | 'login' | 'verify' | 'forgot' | 'reset'
type UserType = 'driver' | 'mechanic'

const initialForm = {
  name:'', email:'', phone:'', password:'', confirmPassword:'',
  workshopName:'', workshopPhone:'', workshopDescription:'',
  workshopCep:'', workshopStreet:'', workshopNumber:'',
  workshopComplement:'', workshopNeighborhood:'', workshopCity:'', workshopState:'',
}

export function Header() {
  const router   = useRouter()
  const pathname = usePathname()

  // ── session ──
  const [user, setUser]   = useState<SessionUser | null>(null)
  const [authReady, setAuthReady] = useState(false)

  // ── mobile menu ──
  const [menuOpen, setMenuOpen] = useState(false)

  // ── modal ──
  const [open, setOpen]   = useState(false)
  const [step, setStep]   = useState<Step>('choose')
  const [userType, setUserType] = useState<UserType>('driver')
  const [form, setForm]   = useState(initialForm)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [keepSignedIn, setKeepSignedIn] = useState(false)
  const [showPwd, setShowPwd] = useState(false)
  const [showPwd2, setShowPwd2] = useState(false)
  const [specialties, setSpecialties] = useState<string[]>([])
  const [forgotEmail, setForgotEmail] = useState('')
  const [resetCode, setResetCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPassword2, setNewPassword2] = useState('')
  const [showNewPwd, setShowNewPwd] = useState(false)
  const [lockedType, setLockedType] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(d => { if (d.user) setUser(d.user as SessionUser) })
      .catch(() => {})
      .finally(() => setAuthReady(true))
  }, [])

  // Permite qualquer página abrir o modal via: window.dispatchEvent(new CustomEvent('mm:open-auth', { detail: { step, type } }))
  useEffect(() => {
    function handler(e: Event) {
      const detail = (e as CustomEvent).detail ?? {}
      openModal(detail.step ?? 'choose', detail.type)
    }
    window.addEventListener('mm:open-auth', handler)
    return () => window.removeEventListener('mm:open-auth', handler)
  }, [])

  // reset modal state when closed
  // close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    if (!open) {
      setStep('choose'); setError(''); setMessage('')
      setForm(initialForm); setShowPwd(false); setShowPwd2(false)
      setSpecialties([]); setLockedType(false)
    }
  }, [open])

  function openModal(initialStep: Step = 'choose', type?: UserType) {
    setStep(initialStep)
    if (type) { setUserType(type); setLockedType(true) }
    else setLockedType(false)
    setOpen(true)
  }

  const isMechanic  = user?.type === 'MECHANIC'
  const NAV_ITEMS   = isMechanic ? MECHANIC_NAV : DRIVER_NAV
  const hasWorkshop = userType === 'mechanic'

  function isActive(href: string) {
    if (href === '/home')     return pathname === '/home'
    if (href === '/mecanico') return pathname === '/mecanico'
    return pathname.startsWith(href)
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    router.push('/home')
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  async function handleCepBlur() {
    const cep = form.workshopCep.replace(/\D/g,'')
    if (cep.length !== 8) return
    try {
      const data = await fetch(`https://viacep.com.br/ws/${cep}/json/`).then(r => r.json())
      if (!data.erro) setForm(f => ({
        ...f,
        workshopStreet: data.logradouro || f.workshopStreet,
        workshopNeighborhood: data.bairro || f.workshopNeighborhood,
        workshopCity: data.localidade || f.workshopCity,
        workshopState: data.uf || f.workshopState,
      }))
    } catch {}
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault(); setError('')
    if (!form.name || !form.email || !form.phone || !form.password || !form.confirmPassword)
      return setError('Preencha todos os campos obrigatórios.')
    if (form.password !== form.confirmPassword)
      return setError('As senhas não conferem.')
    if (hasWorkshop && (!form.workshopName || !form.workshopCep || !form.workshopStreet || !form.workshopNumber || !form.workshopCity))
      return setError('Preencha todos os dados obrigatórios da oficina.')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(),
          password: form.password, type: userType,
          ...(hasWorkshop ? { workshop: {
            name: form.workshopName.trim(), phone: form.workshopPhone.trim() || undefined,
            description: form.workshopDescription.trim() || undefined, specialties,
            cep: form.workshopCep, street: form.workshopStreet.trim(),
            number: form.workshopNumber.trim(), complement: form.workshopComplement.trim() || undefined,
            neighborhood: form.workshopNeighborhood.trim(), city: form.workshopCity.trim(),
            state: form.workshopState,
          }} : {}),
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        // E-mail já cadastrado → convida o usuário a entrar
        if (res.status === 409) {
          setError('__email_taken__')
        } else {
          setError(data.error ?? 'Erro ao criar conta.')
        }
        return
      }
      setMessage(data.emailSent
        ? `Código enviado para ${form.email.trim()}.`
        : 'Cadastro realizado! Não foi possível enviar o e-mail.')
      setStep('verify')
    } catch { setError('Erro de conexão.') }
    finally { setLoading(false) }
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault(); setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email.trim(), password: form.password, keepSignedIn }),
      })
      const data = await res.json()
      if (!res.ok) return setError(data.error ?? 'Erro ao entrar.')
      setUser(data.user as SessionUser)
      setOpen(false)
      window.dispatchEvent(new CustomEvent('mm:logged-in', { detail: data.user }))
      if (!pathname.startsWith('/home') && !pathname.startsWith('/mecanico'))
        router.push(data.user?.type === 'MECHANIC' ? '/mecanico' : '/home')
      else if (data.user?.type === 'MECHANIC' && !pathname.startsWith('/mecanico'))
        router.push('/mecanico')
    } catch { setError('Erro de conexão.') }
    finally { setLoading(false) }
  }

  async function handleVerify(e: FormEvent) {
    e.preventDefault(); setError('')
    const code = (e.currentTarget as HTMLFormElement).querySelector<HTMLInputElement>('[name=code]')?.value?.trim()
    if (!code) return setError('Digite o código.')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email.trim(), code, keepSignedIn }),
      })
      const data = await res.json()
      if (!res.ok) return setError(data.error ?? 'Código inválido.')
      setUser(data.user as SessionUser)
      setOpen(false)
      window.dispatchEvent(new CustomEvent('mm:logged-in', { detail: data.user }))
      if (!pathname.startsWith('/home') && !pathname.startsWith('/mecanico'))
        router.push(data.user?.type === 'MECHANIC' ? '/mecanico' : '/home')
      else if (data.user?.type === 'MECHANIC' && !pathname.startsWith('/mecanico'))
        router.push('/mecanico')
    } catch { setError('Erro de conexão.') }
    finally { setLoading(false) }
  }

  async function handleForgot(e: FormEvent) {
    e.preventDefault(); setError('')
    if (!forgotEmail.trim()) return setError('Informe seu e-mail.')
    setLoading(true)
    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail.trim() }),
      })
      setMessage(`Se o e-mail ${forgotEmail.trim()} estiver cadastrado, você receberá o código em instantes.`)
      setStep('reset')
    } catch { setError('Erro de conexão.') }
    finally { setLoading(false) }
  }

  async function handleReset(e: FormEvent) {
    e.preventDefault(); setError('')
    if (!resetCode.trim()) return setError('Digite o código recebido.')
    if (newPassword.length < 6) return setError('A senha deve ter pelo menos 6 caracteres.')
    if (newPassword !== newPassword2) return setError('As senhas não conferem.')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail.trim(), code: resetCode.trim(), newPassword }),
      })
      const data = await res.json()
      if (!res.ok) return setError(data.error ?? 'Código inválido ou expirado.')
      setMessage('Senha redefinida com sucesso! Faça login com a nova senha.')
      setResetCode(''); setNewPassword(''); setNewPassword2('')
      setStep('login')
      setForm(f => ({ ...f, email: forgotEmail.trim(), password: '' }))
    } catch { setError('Erro de conexão.') }
    finally { setLoading(false) }
  }

  const inputCls = 'mt-2 w-full rounded-2xl border border-white/10 bg-[#222228] px-4 py-3 text-sm text-white outline-none focus:border-orange-500'

  return (
    <>
      {/* ── Header bar ────────────────────────────────────────────────────── */}
      <header
        className="w-full sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-[14px]"
        style={{ borderBottom: '1px solid #222', background: '#000' }}
      >
        {/* Logo */}
        <a href={isMechanic ? '/mecanico' : '/home'} className="flex items-center gap-2.5 shrink-0 no-underline">
          <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0">
            <img src="/logo.svg" alt="" width={36} height={36} />
          </div>
          <span className="text-[22px] tracking-wide" style={{ fontFamily: 'var(--font-bebas-neue)', color: '#f0ede8' }}>
            Motor<span style={{ color: '#ff6600' }}>Macete</span>
          </span>
        </a>

        {/* Nav — desktop apenas (xl+) */}
        <nav className="hidden xl:flex items-center justify-center gap-5 flex-1 mx-6">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href)
            return (
              <a key={item.label} href={item.href}
                className="relative flex items-center gap-1 text-[14px] font-semibold uppercase tracking-[0.5px] transition-all duration-150 whitespace-nowrap"
                style={{ fontFamily: 'var(--font-barlow-condensed)', color: active ? '#f0ede8' : '#666' }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#bbb' }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = '#666' }}
              >
                {item.href === '/home/planos' && (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#ff6600" stroke="#ff6600" strokeWidth="1">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                )}
                {item.label}
                {active && (
                  <span className="absolute -bottom-[18px] left-0 right-0 h-[2px] rounded-full" style={{ background: '#ff6600' }} />
                )}
              </a>
            )
          })}
        </nav>

        {/* Ações direita + hamburger */}
        <div className="flex items-center gap-2 shrink-0">
          {authReady && (
            user ? (
              <>
                <div className="hidden sm:flex items-center gap-2 text-[11px] font-bold tracking-[1px] uppercase px-3 py-1.5 rounded-full border"
                  style={{ background: 'rgba(255,102,0,0.10)', borderColor: 'rgba(255,102,0,0.35)', color: '#ff8533' }}>
                  {user.name.split(' ')[0]}
                  {(user.isAdmin || user.plan === 'DRIVER_PRO' || user.plan === 'MECHANIC_PRO') && (
                    <span className="text-[9px] font-black tracking-[1px] px-1.5 py-0.5 rounded-full"
                      style={{ background: '#ff6600', color: '#fff', lineHeight: 1 }}>
                      PRO
                    </span>
                  )}
                  {user.isTrialing && (
                    <span className="text-[9px] font-black tracking-[1px] px-1.5 py-0.5 rounded-full"
                      style={{ background: '#22c55e', color: '#fff', lineHeight: 1 }}>
                      TRIAL {user.trialDaysLeft}d
                    </span>
                  )}
                </div>
                <button type="button" onClick={handleLogout}
                  className="hidden xl:flex items-center gap-2 text-[11px] font-bold tracking-[1.5px] uppercase px-4 py-1.5 rounded-full border transition hover:bg-white/5"
                  style={{ borderColor: 'rgba(255,255,255,0.10)', color: '#555' }}>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Sair
                </button>
              </>
            ) : (
              <>
                <button type="button" onClick={() => openModal('choose')}
                  className="hidden xl:block text-[11px] font-bold tracking-[1.5px] uppercase px-4 py-1.5 rounded-full border transition hover:bg-orange-600/20"
                  style={{ borderColor: 'rgba(255,102,0,0.4)', color: '#ff8533', background: 'rgba(255,102,0,0.08)' }}>
                  Cadastrar
                </button>
                <button type="button" onClick={() => openModal('login')}
                  className="hidden xl:block text-[11px] font-bold tracking-[1.5px] uppercase px-4 py-1.5 rounded-full border transition hover:bg-white/5"
                  style={{ borderColor: 'rgba(255,255,255,0.10)', color: '#bbb' }}>
                  Entrar
                </button>
              </>
            )
          )}

          {/* Hamburger button — visible below xl */}
          <button
            type="button"
            onClick={() => setMenuOpen(v => !v)}
            className="xl:hidden flex items-center justify-center w-9 h-9 rounded-lg transition hover:bg-white/5"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f0ede8" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f0ede8" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* ── Mobile menu ───────────────────────────────────────────────────── */}
      {menuOpen && (
        <div
          className="xl:hidden fixed inset-0 z-40 flex flex-col"
          style={{ top: '65px', background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(8px)' }}
          onClick={e => { if (e.target === e.currentTarget) setMenuOpen(false) }}
        >
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href)
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-semibold uppercase tracking-[0.5px] transition-all"
                    style={{
                      fontFamily: 'var(--font-barlow-condensed)',
                      color: active ? '#f0ede8' : '#888',
                      background: active ? 'rgba(255,102,0,0.12)' : 'transparent',
                      borderLeft: active ? '3px solid #ff6600' : '3px solid transparent',
                    }}
                  >
                    {item.href === '/home/planos' && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#ff6600" stroke="#ff6600" strokeWidth="1">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    )}
                    {item.label}
                  </a>
                )
              })}
            </nav>

            {/* Auth section no menu mobile */}
            {authReady && (
              <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-3">
                {user ? (
                  <>
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-[13px] font-bold tracking-[1px] uppercase"
                      style={{ background: 'rgba(255,102,0,0.10)', border: '1px solid rgba(255,102,0,0.25)', color: '#ff8533' }}>
                      {user.name}
                      {(user.isAdmin || user.plan === 'DRIVER_PRO' || user.plan === 'MECHANIC_PRO') && (
                        <span className="text-[9px] font-black tracking-[1px] px-1.5 py-0.5 rounded-full ml-auto"
                          style={{ background: '#ff6600', color: '#fff', lineHeight: 1 }}>
                          PRO
                        </span>
                      )}
                    </div>
                    <button type="button" onClick={() => { setMenuOpen(false); handleLogout() }}
                      className="flex items-center justify-center gap-2 text-[12px] font-bold tracking-[1.5px] uppercase px-4 py-3 rounded-xl border transition hover:bg-white/5"
                      style={{ borderColor: 'rgba(255,255,255,0.10)', color: '#666' }}>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                      </svg>
                      Sair
                    </button>
                  </>
                ) : (
                  <>
                    <button type="button" onClick={() => { setMenuOpen(false); openModal('choose') }}
                      className="w-full rounded-xl py-3.5 text-[13px] font-bold uppercase tracking-[0.2em] transition"
                      style={{ background: 'rgba(255,102,0,0.12)', border: '1px solid rgba(255,102,0,0.35)', color: '#ff8533' }}>
                      Cadastrar
                    </button>
                    <button type="button" onClick={() => { setMenuOpen(false); openModal('login') }}
                      className="w-full rounded-xl py-3.5 text-[13px] font-bold uppercase tracking-[0.2em] transition"
                      style={{ border: '1px solid rgba(255,255,255,0.10)', color: '#bbb' }}>
                      Entrar
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Modal de cadastro / login ─────────────────────────────────────── */}
      {open && (
        <div ref={overlayRef} className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 py-6 overflow-y-auto"
          onClick={e => { if (e.target === overlayRef.current) setOpen(false) }}>
          <div className="w-full max-w-lg rounded-[28px] border border-white/10 bg-[#1c1c22] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.6)] mt-8 mb-8">

            {/* Header do modal */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-orange-300 mb-1">
                  {step === 'choose' ? 'Criar conta' : step === 'login' ? 'Entrar' : step === 'verify' ? 'Verificação' : step === 'forgot' ? 'Recuperar acesso' : step === 'reset' ? 'Nova senha' : 'Novo cadastro'}
                </p>
                <h2 className="text-xl font-black text-white">
                  {step === 'choose' ? 'Como você quer se cadastrar?' :
                   step === 'login' ? 'Acesse sua conta' :
                   step === 'verify' ? 'Confirme seu e-mail' :
                   step === 'forgot' ? 'Esqueceu a senha?' :
                   step === 'reset' ? 'Crie sua nova senha' :
                   userType === 'mechanic' ? 'Cadastro de Mecânico' : 'Cadastro de Motorista'}
                </h2>
              </div>
              <button type="button" onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-white/5 shrink-0 transition"
                style={{ border: '1px solid #3a3a42' }}>✕</button>
            </div>

            {/* STEP: choose */}
            {step === 'choose' && (
              <div className="space-y-3">
                <button type="button" onClick={() => { setUserType('driver'); setStep('register') }}
                  className="w-full rounded-2xl bg-orange-600 px-5 py-4 text-left transition hover:bg-orange-500">
                  <p className="text-[11px] font-bold uppercase tracking-[1px] text-orange-200">Motorista</p>
                  <p className="mt-1 text-base font-semibold text-white">Criar conta como Motorista →</p>
                </button>
                <button type="button" onClick={() => { setUserType('mechanic'); setStep('register') }}
                  className="w-full rounded-2xl border border-orange-500/40 bg-[#28282e] px-5 py-4 text-left transition hover:border-orange-500 hover:bg-[#30303a]">
                  <p className="text-[11px] font-bold uppercase tracking-[1px] text-orange-300">Mecânico</p>
                  <p className="mt-1 text-base font-semibold text-white">Criar conta como Mecânico →</p>
                </button>
                <p className="text-center text-sm text-slate-500 pt-1">
                  Já tem conta?{' '}
                  <button type="button" onClick={() => setStep('login')} className="text-orange-400 hover:underline underline-offset-2">Entrar</button>
                </p>
              </div>
            )}

            {/* STEP: verify */}
            {step === 'verify' && (
              <form onSubmit={handleVerify} className="space-y-4">
                <p className="text-sm text-slate-300">{message || `Código enviado para ${form.email}.`}</p>
                <label className="block text-sm text-slate-300">
                  Código de verificação
                  <input name="code" type="text" maxLength={4} placeholder="0000" className={inputCls} />
                </label>
                {error && <p className="text-sm text-red-400">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full rounded-full bg-orange-600 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 transition hover:bg-orange-500 disabled:opacity-60">
                  {loading ? 'Verificando...' : 'Confirmar código'}
                </button>
                <button type="button" onClick={() => { setStep('login'); setMessage('') }}
                  className="w-full rounded-full border border-white/10 py-3 text-sm text-slate-300 transition hover:bg-white/5">
                  Cancelar
                </button>
              </form>
            )}

            {/* STEP: login */}
            {step === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <label className="block text-sm text-slate-300">
                  E-mail
                  <input name="email" type="email" value={form.email} onChange={handleChange} className={inputCls} />
                </label>
                <label className="block text-sm text-slate-300">
                  Senha
                  <div className="relative mt-2">
                    <input name="password" type={showPwd ? 'text' : 'password'} value={form.password} onChange={handleChange}
                      className="w-full rounded-2xl border border-white/10 bg-[#222228] px-4 py-3 pr-12 text-sm text-white outline-none focus:border-orange-500" />
                    <button type="button" onClick={() => setShowPwd(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-300 transition">
                      {showPwd
                        ? <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.05 10.05 0 0 1 12 20c-5 0-9.27-3.11-11-7.5a19.76 19.76 0 0 1 4.12-5.78"/><path d="M1 1l22 22"/></svg>
                        : <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      }
                    </button>
                  </div>
                </label>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-3 text-sm text-slate-300">
                    <input type="checkbox" checked={keepSignedIn} onChange={e => setKeepSignedIn(e.target.checked)}
                      className="h-4 w-4 rounded border-white/10 bg-slate-900 text-orange-600" />
                    Mantenha-me conectado
                  </label>
                  <button type="button" onClick={() => { setForgotEmail(form.email); setError(''); setMessage(''); setStep('forgot') }}
                    className="text-sm text-orange-400 hover:underline underline-offset-2 transition">
                    Esqueci a senha
                  </button>
                </div>
                {error && <p className="text-sm text-red-400">{error}</p>}
                {message && <p className="text-sm text-emerald-400">{message}</p>}
                <button type="submit" disabled={loading}
                  className="w-full rounded-full bg-orange-600 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 transition hover:bg-orange-500 disabled:opacity-60">
                  {loading ? 'Entrando...' : 'Entrar'}
                </button>
                <button type="button" onClick={() => setStep('choose')}
                  className="w-full rounded-full border border-white/10 py-3 text-sm text-slate-300 transition hover:bg-white/5">
                  Criar conta
                </button>
              </form>
            )}

            {/* STEP: register */}
            {step === 'register' && (
              <form onSubmit={handleRegister} className="space-y-4">
                {/* CTA login para quem já tem conta */}
                <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 px-4 py-3 flex items-center justify-between gap-3">
                  <p className="text-sm text-slate-300">Já tem uma conta?</p>
                  <button type="button" onClick={() => { setError(''); setStep('login') }}
                    className="shrink-0 rounded-full bg-orange-600 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:bg-orange-500">
                    Entrar →
                  </button>
                </div>

                {/* tipo toggle — oculto quando tipo vem pré-definido (ex: planos) */}
                {!lockedType && (
                  <div className="flex gap-2 rounded-2xl border border-white/10 bg-[#0a0a0d] p-1">
                    {(['driver','mechanic'] as UserType[]).map(t => (
                      <button key={t} type="button" onClick={() => setUserType(t)}
                        className={`flex-1 rounded-xl py-2 text-sm font-semibold uppercase tracking-[0.15em] transition ${userType === t ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>
                        {t === 'driver' ? 'Motorista' : 'Mecânico'}
                      </button>
                    ))}
                  </div>
                )}

                <label className="block text-sm text-slate-300">Nome completo<input name="name" autoComplete="name" value={form.name} onChange={handleChange} className={inputCls} /></label>
                <label className="block text-sm text-slate-300">E-mail<input name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} className={inputCls} /></label>
                <label className="block text-sm text-slate-300">Telefone<input name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={handleChange} className={inputCls} /></label>
                <label className="block text-sm text-slate-300">
                  Senha
                  <div className="relative mt-2">
                    <input name="password" type={showPwd ? 'text' : 'password'} autoComplete="new-password" value={form.password} onChange={handleChange}
                      className="w-full rounded-2xl border border-white/10 bg-[#222228] px-4 py-3 pr-12 text-sm text-white outline-none focus:border-orange-500" />
                    <button type="button" onClick={() => setShowPwd(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-300 transition">
                      {showPwd ? <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.05 10.05 0 0 1 12 20c-5 0-9.27-3.11-11-7.5a19.76 19.76 0 0 1 4.12-5.78"/><path d="M1 1l22 22"/></svg>
                        : <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                    </button>
                  </div>
                </label>
                <label className="block text-sm text-slate-300">
                  Confirmar senha
                  <div className="relative mt-2">
                    <input name="confirmPassword" type={showPwd2 ? 'text' : 'password'} autoComplete="new-password" value={form.confirmPassword} onChange={handleChange}
                      className="w-full rounded-2xl border border-white/10 bg-[#222228] px-4 py-3 pr-12 text-sm text-white outline-none focus:border-orange-500" />
                    <button type="button" onClick={() => setShowPwd2(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-300 transition">
                      {showPwd2 ? <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.05 10.05 0 0 1 12 20c-5 0-9.27-3.11-11-7.5a19.76 19.76 0 0 1 4.12-5.78"/><path d="M1 1l22 22"/></svg>
                        : <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                    </button>
                  </div>
                </label>

                {/* Campos de oficina */}
                {hasWorkshop && (
                  <>
                    <div className="border-t border-white/10 pt-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-300">Dados da oficina</p>
                    </div>
                    <label className="block text-sm text-slate-300">Nome da oficina<input name="workshopName" value={form.workshopName} onChange={handleChange} className={inputCls} /></label>
                    <label className="block text-sm text-slate-300">Telefone da oficina <span className="text-slate-500">(opcional)</span><input name="workshopPhone" value={form.workshopPhone} onChange={handleChange} className={inputCls} /></label>
                    <label className="block text-sm text-slate-300">CEP<input name="workshopCep" value={form.workshopCep} onChange={handleChange} onBlur={handleCepBlur} maxLength={9} placeholder="00000-000" className={inputCls} /></label>
                    <label className="block text-sm text-slate-300">Logradouro<input name="workshopStreet" value={form.workshopStreet} onChange={handleChange} className={inputCls} /></label>
                    <div className="grid grid-cols-[2fr_1fr] gap-3">
                      <label className="block text-sm text-slate-300">Bairro<input name="workshopNeighborhood" value={form.workshopNeighborhood} onChange={handleChange} className={inputCls} /></label>
                      <label className="block text-sm text-slate-300">Número<input name="workshopNumber" value={form.workshopNumber} onChange={handleChange} className={inputCls} /></label>
                    </div>
                    <div className="grid grid-cols-[3fr_1fr] gap-3">
                      <label className="block text-sm text-slate-300">Cidade<input name="workshopCity" value={form.workshopCity} onChange={handleChange} className={inputCls} /></label>
                      <label className="block text-sm text-slate-300">UF
                        <select value={form.workshopState} onChange={e => setForm(f => ({ ...f, workshopState: e.target.value }))}
                          className={inputCls + ' cursor-pointer appearance-none'}>
                          <option value="">--</option>
                          {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(uf => <option key={uf} value={uf}>{uf}</option>)}
                        </select>
                      </label>
                    </div>
                    <div>
                      <p className="text-sm text-slate-300 mb-2">Especialidades <span className="text-slate-500">(opcional)</span></p>
                      <div className="flex flex-wrap gap-2">
                        {WORKSHOP_SPECIALTIES.map(s => {
                          const active = specialties.includes(s)
                          return (
                            <button key={s} type="button"
                              onClick={() => setSpecialties(p => active ? p.filter(x => x !== s) : [...p, s])}
                              className="px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.5px] transition-colors"
                              style={{ background: active ? '#ff6600' : '#30303a', color: active ? '#111' : '#666', border: `1px solid ${active ? '#ff6600' : '#3a3a42'}` }}>
                              {s}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </>
                )}

                {/* Aviso de trial */}
                <div className="rounded-2xl px-4 py-4" style={{ background: 'rgba(34,197,94,0.09)', border: '1px solid rgba(34,197,94,0.35)' }}>
                  <p className="flex items-center gap-2 text-[14px] font-black uppercase tracking-[0.5px] mb-2" style={{ color: '#4ade80' }}>
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    15 dias grátis com tudo liberado!
                  </p>
                  <p className="text-[13px] leading-relaxed mb-3" style={{ color: '#c0c0c0' }}>
                    Ao criar sua conta, você terá <strong style={{ color: '#f0ede8' }}>15 dias de avaliação gratuita</strong> com acesso completo a todas as funcionalidades Pro. Após esse período, você escolhe continuar no plano gratuito (com limitações) ou assina o Pro para manter o acesso total.
                  </p>
                  <div className="flex gap-2">
                    <div className="flex-1 rounded-xl px-3 py-2 text-center" style={{ background: 'rgba(255,102,0,0.10)', border: '1px solid rgba(255,102,0,0.3)' }}>
                      <p className="text-[11px] font-bold uppercase tracking-[0.5px] mb-0.5" style={{ color: '#ff6600' }}>Motorista PRO</p>
                      <p className="text-[15px] font-black" style={{ color: '#f0ede8' }}>R$ 3,99<span className="text-[11px] font-medium" style={{ color: '#999' }}>/mês</span></p>
                    </div>
                    <div className="flex-1 rounded-xl px-3 py-2 text-center" style={{ background: 'rgba(255,102,0,0.10)', border: '1px solid rgba(255,102,0,0.3)' }}>
                      <p className="text-[11px] font-bold uppercase tracking-[0.5px] mb-0.5" style={{ color: '#ff6600' }}>Mecânico PRO</p>
                      <p className="text-[15px] font-black" style={{ color: '#f0ede8' }}>R$ 6,99<span className="text-[11px] font-medium" style={{ color: '#999' }}>/mês</span></p>
                    </div>
                  </div>
                </div>

                <label className="flex items-center gap-3 text-sm text-slate-300">
                  <input type="checkbox" checked={keepSignedIn} onChange={e => setKeepSignedIn(e.target.checked)}
                    className="h-4 w-4 rounded border-white/10 bg-slate-900 text-orange-600" />
                  Mantenha-me conectado
                </label>

                {error === '__email_taken__' ? (
                  <div className="rounded-2xl px-4 py-3" style={{ background: 'rgba(255,102,0,0.08)', border: '1px solid rgba(255,102,0,0.3)' }}>
                    <p className="text-sm text-orange-300 font-semibold mb-1">Você já tem uma conta!</p>
                    <p className="text-xs text-slate-400 mb-3">Este e-mail já está cadastrado. Clique em Entrar para acessar.</p>
                    <button type="button"
                      onClick={() => { setError(''); setForm(f => ({ ...f, password: '', confirmPassword: '' })); setStep('login') }}
                      className="w-full rounded-full bg-orange-600 py-2.5 text-sm font-bold uppercase tracking-[0.15em] text-slate-950 transition hover:bg-orange-500">
                      Entrar com este e-mail →
                    </button>
                  </div>
                ) : error ? (
                  <p className="text-sm text-red-400">{error}</p>
                ) : null}

                <button type="submit" disabled={loading || error === '__email_taken__'}
                  className="w-full rounded-full bg-orange-600 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 transition hover:bg-orange-500 disabled:opacity-60">
                  {loading ? 'Cadastrando...' : 'Criar conta'}
                </button>
                <button type="button" onClick={() => setStep('choose')}
                  className="w-full rounded-full border border-white/10 py-3 text-sm text-slate-300 transition hover:bg-white/5">
                  Voltar
                </button>
              </form>
            )}

            {/* STEP: forgot */}
            {step === 'forgot' && (
              <form onSubmit={handleForgot} className="space-y-4">
                <p className="text-sm text-slate-400 leading-relaxed">
                  Informe o e-mail cadastrado. Enviaremos um código de 4 dígitos para você criar uma nova senha.
                </p>
                <label className="block text-sm text-slate-300">
                  E-mail
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={e => setForgotEmail(e.target.value)}
                    className={inputCls}
                    placeholder="seu@email.com"
                  />
                </label>
                {error && <p className="text-sm text-red-400">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full rounded-full bg-orange-600 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 transition hover:bg-orange-500 disabled:opacity-60">
                  {loading ? 'Enviando...' : 'Enviar código de recuperação'}
                </button>
                <button type="button" onClick={() => { setError(''); setStep('login') }}
                  className="w-full rounded-full border border-white/10 py-3 text-sm text-slate-300 transition hover:bg-white/5">
                  Voltar ao login
                </button>
              </form>
            )}

            {/* STEP: reset */}
            {step === 'reset' && (
              <form onSubmit={handleReset} className="space-y-4">
                {message && <p className="text-sm text-emerald-400 leading-relaxed">{message}</p>}
                <label className="block text-sm text-slate-300">
                  Código recebido por e-mail
                  <input
                    type="text"
                    maxLength={4}
                    value={resetCode}
                    onChange={e => setResetCode(e.target.value)}
                    placeholder="0000"
                    className={inputCls}
                  />
                </label>
                <label className="block text-sm text-slate-300">
                  Nova senha
                  <div className="relative mt-2">
                    <input
                      type={showNewPwd ? 'text' : 'password'}
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      className="w-full rounded-2xl border border-white/10 bg-[#222228] px-4 py-3 pr-12 text-sm text-white outline-none focus:border-orange-500"
                    />
                    <button type="button" onClick={() => setShowNewPwd(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-300 transition">
                      {showNewPwd
                        ? <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.05 10.05 0 0 1 12 20c-5 0-9.27-3.11-11-7.5a19.76 19.76 0 0 1 4.12-5.78"/><path d="M1 1l22 22"/></svg>
                        : <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      }
                    </button>
                  </div>
                </label>
                <label className="block text-sm text-slate-300">
                  Confirmar nova senha
                  <input
                    type={showNewPwd ? 'text' : 'password'}
                    value={newPassword2}
                    onChange={e => setNewPassword2(e.target.value)}
                    className={inputCls}
                  />
                </label>
                {error && <p className="text-sm text-red-400">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full rounded-full bg-orange-600 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 transition hover:bg-orange-500 disabled:opacity-60">
                  {loading ? 'Salvando...' : 'Redefinir senha'}
                </button>
                <button type="button" onClick={() => { setError(''); setMessage(''); setStep('forgot') }}
                  className="w-full rounded-full border border-white/10 py-3 text-sm text-slate-300 transition hover:bg-white/5">
                  Reenviar código
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
