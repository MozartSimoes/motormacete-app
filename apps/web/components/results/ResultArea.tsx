'use client'

import { useState, useEffect } from 'react'
import { TipItem } from './TipItem'
import { MaintenanceTable } from './MaintenanceTable'
import { TirePressureCard } from './TirePressureCard'
import type { Tip, Category } from '@/lib/types'

interface MaintenanceItem {
  id: string
  modelName: string | null
  component: string
  intervalKm: number | null
  intervalMonths: number | null
  notes: string | null
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  order: number
}

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

const TABS: { label: string; icon: string; category: Category | 'MANUTENCAO_TABLE' | 'CALIBRAGEM' }[] = [
  { label: 'Macetes',    icon: '🔧', category: 'MACETES' },
  { label: 'Problemas',  icon: '⚠️', category: 'PROBLEMAS' },
  { label: 'Manutenção', icon: '⚙️', category: 'MANUTENCAO_TABLE' },
  { label: 'Calibragem', icon: '🛞', category: 'CALIBRAGEM' },
]

interface Props {
  modelName:    string
  vehicleLabel: string
  vehicleType:  string
  yearCode:     string
  yearName?:    string
}

export function ResultArea({ modelName, vehicleLabel, vehicleType, yearCode, yearName = '' }: Props) {
  const [activeTab, setActiveTab] = useState(0)
  const [tips, setTips] = useState<Tip[]>([])
  const [maintItems, setMaintItems] = useState<MaintenanceItem[]>([])
  const [maintIsSpecific, setMaintIsSpecific] = useState(false)
  const [tireItems, setTireItems] = useState<TirePressureItem[]>([])
  const [tireIsSpecific, setTireIsSpecific] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!modelName) return
    setLoading(true)

    const tab = TABS[activeTab]

    if (tab.category === 'MANUTENCAO_TABLE') {
      fetch(`/api/maintenance?modelName=${encodeURIComponent(modelName)}&yearCode=${encodeURIComponent(yearCode)}&yearName=${encodeURIComponent(yearName)}&vehicleType=${vehicleType}`)
        .then((r) => r.json())
        .then((data) => {
          setMaintItems(data.items ?? [])
          setMaintIsSpecific(data.isSpecific ?? false)
          setLoading(false)
        })
    } else if (tab.category === 'CALIBRAGEM') {
      fetch(`/api/tire-pressure?modelName=${encodeURIComponent(modelName)}&yearCode=${encodeURIComponent(yearCode)}`)
        .then((r) => r.json())
        .then((data) => {
          setTireItems(data.items ?? [])
          setTireIsSpecific(data.isSpecific ?? false)
          setLoading(false)
        })
    } else {
      fetch(`/api/tips?modelName=${encodeURIComponent(modelName)}&category=${tab.category}&yearCode=${encodeURIComponent(yearCode)}&yearName=${encodeURIComponent(yearName)}&vehicleType=${vehicleType}`)
        .then((r) => r.json())
        .then((data) => {
          setTips(data.tips ?? [])
          setLoading(false)
        })
    }
  }, [modelName, yearCode, activeTab])

  const isMaintTab = TABS[activeTab].category === 'MANUTENCAO_TABLE'
  const isTireTab  = TABS[activeTab].category === 'CALIBRAGEM'

  return (
    <div>
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-5 rounded-t-xl border-b-0"
        style={{ background: '#28282e', border: '1px solid #3a3a42', borderBottom: 'none' }}
      >
        <span
          className="text-[28px] tracking-wide"
          style={{ fontFamily: 'var(--font-bebas-neue)', color: '#f0ede8' }}
        >
          {vehicleLabel}
        </span>
        <span
          className="text-[12px] font-semibold tracking-[1px] uppercase px-3 py-1 rounded-full border"
          style={{
            background: 'rgba(255,102,0,0.14)',
            borderColor: 'rgba(255,102,0,0.25)',
            color: '#ff8533',
          }}
        >
          {vehicleType === 'carro' ? '🚗 Carro' : '🏍️ Moto'}
        </span>
      </div>

      {/* Tabs */}
      <div
        className="flex border-x"
        style={{ background: '#222228', borderColor: '#3a3a42' }}
      >
        {TABS.map((tab, i) => (
          <button
            key={tab.category}
            className="flex-1 py-[13px] px-2 text-[14px] font-semibold tracking-[0.5px] uppercase text-center border-b-2 transition-colors duration-150 select-none"
            style={{
              fontFamily: 'var(--font-barlow-condensed)',
              borderColor: activeTab === i ? '#ff6600' : 'transparent',
              color: activeTab === i ? '#ff6600' : '#555',
            }}
            onClick={() => setActiveTab(i)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div
        className="rounded-b-xl p-6 min-h-[180px]"
        style={{ background: '#28282e', border: '1px solid #3a3a42', borderTop: 'none' }}
      >
        {loading ? (
          <div className="flex items-center gap-3 text-sm" style={{ color: '#555' }}>
            <div
              className="w-5 h-5 rounded-full border-2 shrink-0"
              style={{
                borderColor: '#3a3a42',
                borderTopColor: '#ff6600',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            Consultando base técnica...
          </div>
        ) : isMaintTab ? (
          <MaintenanceTable items={maintItems} isSpecific={maintIsSpecific} />
        ) : isTireTab ? (
          <TirePressureCard items={tireItems} isSpecific={tireIsSpecific} />
        ) : tips.length === 0 && TABS[activeTab].category === 'PROBLEMAS' ? (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <span className="text-3xl">✅</span>
            <p className="text-sm font-semibold" style={{ color: '#f0ede8' }}>
              Nenhum problema crônico identificado
            </p>
            <p className="text-xs" style={{ color: '#444' }}>
              Para o veículo selecionado não foram identificados problemas crônicos em nossa base de dados.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-2.5">
            {tips.map((tip, i) => (
              <TipItem key={tip.id} tip={tip} index={i} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
