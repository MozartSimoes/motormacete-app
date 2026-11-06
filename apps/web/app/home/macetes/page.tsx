'use client'

import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { VehicleSearch } from '@/components/home/VehicleSearch'
import { Footer } from '@/components/layout/Footer'

export default function MacetesPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen" style={{ background: '#1c1c22' }}>
      <Header />

      <div className="max-w-[980px] mx-auto px-4 py-10">

        {/* Title */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <p
              className="text-[12px] font-bold tracking-[3px] uppercase mb-1"
              style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}
            >
              Pesquisa
            </p>
            <h1
              className="text-[42px] leading-none mb-2"
              style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}
            >
              Macetes & Diagnóstico
            </h1>
            <p className="text-[14px] max-w-xl" style={{ color: '#666' }}>
              Selecione seu veículo para encontrar macetes de mecânicos, problemas crônicos,
              tabela de manutenção e calibragem de pneus.
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

        <VehicleSearch />

      </div>
      <Footer />
    </div>
  )
}
