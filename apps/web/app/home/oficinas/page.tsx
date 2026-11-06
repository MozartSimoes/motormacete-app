'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const SPECIALTIES = [
  'Mecânica Geral',
  'Elétrica Automotiva',
  'Funilaria e Pintura',
  'Suspensão e Freios',
  'Câmbio e Transmissão',
  'Ar Condicionado Automotivo',
  'Injeção Eletrônica',
  'Alinhamento e Balanceamento',
  'Borracharia',
  'Diagnóstico Computadorizado',
  'Motor e Retífica',
  'Escapamento',
]

interface Workshop {
  id: string
  name: string
  phone: string | null
  description: string | null
  specialties: string[]
  street: string
  number: string
  complement: string | null
  neighborhood: string
  city: string
  state: string
  isPro: boolean
  user: { name: string }
}

export default function OficinasPage() {
  const router = useRouter()
  const [city, setCity] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [workshops, setWorkshops] = useState<Workshop[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const search = useCallback(async () => {
    setLoading(true)
    setSearched(true)
    const params = new URLSearchParams()
    if (city.trim())         params.set('city', city.trim())
    if (neighborhood.trim()) params.set('neighborhood', neighborhood.trim())
    if (specialty)           params.set('specialty', specialty)
    const res = await fetch(`/api/workshops?${params}`)
    const data = await res.json()
    setWorkshops(data.workshops ?? [])
    setLoading(false)
  }, [city, neighborhood, specialty])

  function formatAddress(w: Workshop) {
    const compl = w.complement ? `, ${w.complement}` : ''
    return `${w.street}, ${w.number}${compl} — ${w.neighborhood}, ${w.city}/${w.state}`
  }

  return (
    <div className="min-h-screen" style={{ background: '#1c1c22' }}>
      <Header />

      <div className="max-w-[980px] mx-auto px-4 py-10">

        {/* Title row */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <p className="text-[12px] font-bold tracking-[3px] uppercase mb-1"
              style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
              Diretório
            </p>
            <h1 className="text-[42px] leading-none mb-2"
              style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
              Oficinas Cadastradas
            </h1>
            <p className="text-[14px] max-w-xl" style={{ color: '#666' }}>
              Encontre oficinas de mecânicos cadastrados no MotorMacete por cidade, bairro ou especialidade.
            </p>
          </div>
          <button
            onClick={() => router.push('/home')}
            className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center text-[16px] transition-all hover:bg-white/5"
            style={{ border: '1px solid #3a3a42', color: '#555' }}
            title="Voltar para home"
          >
            ✕
          </button>
        </div>

        {/* Legal disclaimer */}
        <div className="rounded-2xl px-5 py-4 mb-8 flex gap-3 items-start"
          style={{ background: 'rgba(255,102,0,0.06)', border: '1px solid rgba(255,102,0,0.20)' }}>
          <span className="shrink-0 mt-0.5" style={{ color: '#ff8533' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </span>
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[1px] mb-1" style={{ color: '#ff8533', fontFamily: 'var(--font-barlow-condensed)' }}>
              Aviso Legal
            </p>
            <p className="text-[13px] leading-relaxed" style={{ color: '#888' }}>
              O MotorMacete <strong style={{ color: '#aaa' }}>não se responsabiliza</strong> pelos serviços prestados pelas oficinas listadas neste diretório.
              As informações são fornecidas pelos próprios mecânicos no momento do cadastro. Recomendamos solicitar orçamentos,
              verificar referências e confirmar dados diretamente com a oficina antes de contratar qualquer serviço.
            </p>
          </div>
        </div>

        {/* Search form */}
        <div className="rounded-2xl p-6 mb-8" style={{ background: '#222228', border: '1px solid #2a2a32' }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            <div>
              <p className="text-[12px] font-bold tracking-[1.5px] uppercase mb-2"
                style={{ color: '#aaa', fontFamily: 'var(--font-barlow-condensed)' }}>
                Cidade
              </p>
              <input
                className="w-full px-4 py-3 rounded-xl text-[15px] outline-none"
                style={{ background: '#18181b', border: '1px solid #333338', color: '#f0ede8' }}
                placeholder="Ex: São Paulo"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && search()}
              />
            </div>
            <div>
              <p className="text-[12px] font-bold tracking-[1.5px] uppercase mb-2"
                style={{ color: '#aaa', fontFamily: 'var(--font-barlow-condensed)' }}>
                Bairro
              </p>
              <input
                className="w-full px-4 py-3 rounded-xl text-[15px] outline-none"
                style={{ background: '#18181b', border: '1px solid #333338', color: '#f0ede8' }}
                placeholder="Ex: Mooca"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && search()}
              />
            </div>
            <div>
              <p className="text-[12px] font-bold tracking-[1.5px] uppercase mb-2"
                style={{ color: '#aaa', fontFamily: 'var(--font-barlow-condensed)' }}>
                Especialidade
              </p>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 rounded-xl text-[15px] outline-none appearance-none cursor-pointer"
                  style={{ background: '#18181b', border: '1px solid #333338', color: specialty ? '#f0ede8' : '#555' }}
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                >
                  <option value="">Todas as especialidades</option>
                  {SPECIALTIES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#555' }}>▾</span>
              </div>
            </div>
          </div>
          <button
            onClick={search}
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-[14px] font-bold uppercase tracking-[1.5px] transition-all active:scale-95 disabled:opacity-60"
            style={{ background: '#ff6600', color: '#111', fontFamily: 'var(--font-barlow-condensed)' }}
          >
            {loading ? 'Buscando...' : (
              <span className="flex items-center gap-1.5 justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                Buscar Oficinas
              </span>
            )}
          </button>
        </div>

        {/* Results */}
        {!searched && (
          <div className="text-center py-16">
            <p className="mb-4 flex justify-center" style={{ color: '#333' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            </p>
            <p className="text-[18px] font-bold" style={{ color: '#333', fontFamily: 'var(--font-bebas-neue)' }}>
              Informe cidade ou bairro para encontrar oficinas
            </p>
          </div>
        )}

        {searched && !loading && workshops !== null && workshops.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[48px] mb-4">😕</p>
            <p className="text-[20px] font-bold mb-2" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
              Nenhuma oficina encontrada
            </p>
            <p className="text-[14px]" style={{ color: '#555' }}>
              Tente buscar por outra cidade ou remover o filtro de especialidade.
            </p>
          </div>
        )}

        {workshops && workshops.length > 0 && (
          <>
            <p className="text-[13px] font-bold uppercase tracking-[1px] mb-4"
              style={{ color: '#555', fontFamily: 'var(--font-barlow-condensed)' }}>
              {workshops.length} oficina{workshops.length !== 1 ? 's' : ''} encontrada{workshops.length !== 1 ? 's' : ''}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {workshops.map((w) => (
                <div key={w.id} className="rounded-2xl p-5 flex flex-col gap-3 relative"
                  style={{
                    background: w.isPro ? 'rgba(255,102,0,0.04)' : '#222228',
                    border: w.isPro ? '1px solid rgba(255,102,0,0.35)' : '1px solid #2a2a32',
                    boxShadow: w.isPro ? '0 0 0 1px rgba(255,102,0,0.1)' : 'none',
                  }}>

                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <p className="text-[18px] font-bold leading-tight" style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
                          {w.name}
                        </p>
                        {w.isPro && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full tracking-[1px]"
                            style={{ background: '#ff6600', color: '#fff' }}>
                            ⭐ VERIFICADO PRO
                          </span>
                        )}
                      </div>
                      <p className="text-[12px]" style={{ color: '#666' }}>
                        Responsável: {w.user.name}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
                      style={{ background: w.isPro ? 'rgba(255,102,0,0.15)' : 'rgba(255,102,0,0.10)', color: '#ff6600' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex gap-2 items-start">
                    <span className="shrink-0 mt-0.5" style={{ color: '#ff6600' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    </span>
                    <p className="text-[13px] leading-snug" style={{ color: '#888' }}>
                      {formatAddress(w)}
                    </p>
                  </div>

                  {/* Phone */}
                  {w.phone && (
                    <div className="flex gap-2 items-center">
                      <span className="text-[14px] shrink-0" style={{ color: '#ff6600' }}>📞</span>
                      <p className="text-[13px]" style={{ color: '#888' }}>{w.phone}</p>
                    </div>
                  )}

                  {/* Description */}
                  {w.description && (
                    <p className="text-[13px] leading-relaxed" style={{ color: '#777' }}>
                      {w.description}
                    </p>
                  )}

                  {/* Specialties */}
                  {w.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {w.specialties.map((s) => (
                        <span key={s}
                          className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.5px]"
                          style={{ background: 'rgba(255,102,0,0.10)', color: '#ff8533', border: '1px solid rgba(255,102,0,0.20)' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

      </div>
      <Footer />
    </div>
  )
}
