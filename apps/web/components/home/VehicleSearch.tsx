'use client'

import { useState, useEffect } from 'react'
import { ResultArea }           from '@/components/results/ResultArea'
import { FipePriceCard }        from '@/components/results/FipePriceCard'
import { ChronicProblemsCard }  from '@/components/results/ChronicProblemsCard'

interface ModelOption { id: string; name: string }
interface BrandOption { code: string; name: string }
interface YearOption  { code: string; name: string; fipeModelCode?: string }
interface SubmittedVehicle {
  modelCode:     string
  modelName:     string
  brandCode:     string
  brandName:     string
  yearCode:      string
  yearName:      string
  type:          string
  fipeBrandCode: string | null
  fipeModelCode: string | null
}

export function VehicleSearch() {
  const [vehicleType,       setVehicleType]       = useState('')
  const [brands,            setBrands]            = useState<BrandOption[]>([])
  const [selectedBrand,     setSelectedBrand]     = useState<BrandOption | null>(null)
  const [models,            setModels]            = useState<ModelOption[]>([])
  const [selectedModel,     setSelectedModel]     = useState<ModelOption | null>(null)
  const [years,             setYears]             = useState<YearOption[]>([])
  const [selectedYear,      setSelectedYear]      = useState<YearOption | null>(null)
  const [fipeBrandCode,     setFipeBrandCode]     = useState<string | null>(null)
  const [submittedVehicle,  setSubmittedVehicle]  = useState<SubmittedVehicle | null>(null)
  const [loadingBrands,     setLoadingBrands]     = useState(false)
  const [loadingModels,     setLoadingModels]     = useState(false)
  const [loadingYears,      setLoadingYears]      = useState(false)
  const [fipeUnavailable,   setFipeUnavailable]   = useState(false)

  useEffect(() => {
    if (!vehicleType) {
      setBrands([]); setSelectedBrand(null); setModels([]); setSelectedModel(null)
      setSubmittedVehicle(null)
      return
    }
    setLoadingBrands(true)
    setSubmittedVehicle(null)
    fetch(`/api/vehicles?type=${vehicleType}`)
      .then((r) => r.json())
      .then((data) => {
        setBrands(data.brands ?? [])
        setSelectedBrand(null); setModels([]); setSelectedModel(null)
        setLoadingBrands(false)
      })
  }, [vehicleType])

  useEffect(() => {
    if (!selectedBrand) { setModels([]); setSelectedModel(null); setYears([]); setSelectedYear(null); setFipeBrandCode(null); setSubmittedVehicle(null); return }
    setLoadingModels(true)
    setSubmittedVehicle(null)
    fetch(`/api/vehicles?type=${vehicleType}&brandCode=${selectedBrand.code}&brandName=${encodeURIComponent(selectedBrand.name)}`)
      .then((r) => r.json())
      .then((data) => {
        setModels(data.models ?? [])
        setSelectedModel(null); setYears([]); setSelectedYear(null); setFipeBrandCode(null)
        setLoadingModels(false)
      })
  }, [selectedBrand, vehicleType])

  function fetchYears(brand: BrandOption, model: ModelOption) {
    setLoadingYears(true)
    setFipeUnavailable(false)
    fetch(`/api/vehicles?type=${vehicleType}&brandCode=${brand.code}&modelCode=${model.id}`)
      .then((r) => r.json())
      .then((data) => {
        setYears(data.years ?? [])
        setFipeBrandCode(data.fipeBrandCode ?? null)
        setFipeUnavailable(data.fipeUnavailable ?? false)
        setSelectedYear(null)
        setLoadingYears(false)
      })
  }

  useEffect(() => {
    if (!selectedModel || !selectedBrand) {
      setYears([]); setSelectedYear(null); setFipeBrandCode(null)
      setFipeUnavailable(false); setSubmittedVehicle(null); return
    }
    setSubmittedVehicle(null)
    fetchYears(selectedBrand, selectedModel)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedModel, selectedBrand, vehicleType])

  function handleSearch() {
    if (!selectedModel || !selectedBrand || !selectedYear) return
    setSubmittedVehicle({
      modelCode:     selectedModel.id,
      modelName:     selectedModel.name,
      brandCode:     selectedBrand.code,
      brandName:     selectedBrand.name,
      yearCode:      selectedYear.code,
      yearName:      selectedYear.name,
      type:          vehicleType,
      fipeBrandCode: fipeBrandCode,
      fipeModelCode: selectedYear.fipeModelCode ?? null,
    })
  }

  const selectClass =
    'w-full text-[15px] px-4 py-[13px] rounded-xl border outline-none cursor-pointer transition-colors appearance-none'
  const selectStyle = {
    background: '#222228',
    borderColor: '#3a3a42',
    color: '#f0ede8',
    fontFamily: 'var(--font-barlow)',
  }

  return (
    <div>
      {/* heading */}
      <div className="mb-6 text-center">
        <p
          className="text-[12px] font-bold tracking-[3px] uppercase mb-2"
          style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}
        >
          Pesquise seu veículo
        </p>
        <p
          className="text-[44px] leading-none"
          style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}
        >
          {vehicleType === 'moto' ? 'Qual moto você quer desvendar?' : 'Qual carro você quer desvendar?'}
        </p>
      </div>

      {/* Search card */}
      <div
        className="relative rounded-2xl p-7"
        style={{
          background: '#30303a',
          border: '1px solid rgba(255,102,0,0.35)',
          boxShadow: '0 0 0 1px rgba(255,102,0,0.08), 0 8px 32px rgba(255,102,0,0.10)',
        }}
      >
        {/* gradient border top-left glow */}
        <div
          className="absolute inset-[-1px] rounded-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,102,0,0.22), transparent 50%)',
            zIndex: 0,
          }}
        />
        <div className="relative z-10 space-y-4">
          {/* Row: Tipo + Marca */}
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <div>
              <p className="text-[13px] font-semibold tracking-[1.5px] uppercase mb-2" style={{ color: '#666' }}>
                Tipo
              </p>
              <select
                className={selectClass}
                style={selectStyle}
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="">Selecione...</option>
                <option value="carro">Carro</option>
                <option value="moto">Moto</option>
              </select>
            </div>
            <div>
              <p className="text-[13px] font-semibold tracking-[1.5px] uppercase mb-2" style={{ color: '#666' }}>
                Marca
              </p>
              <select
                className={selectClass}
                style={selectStyle}
                value={selectedBrand?.code ?? ''}
                onChange={(e) => {
                  const b = brands.find((b) => b.code === e.target.value) ?? null
                  setSelectedBrand(b)
                }}
                disabled={brands.length === 0 || loadingBrands}
              >
                <option value="">
                  {loadingBrands ? 'Carregando...' : brands.length === 0 ? 'Selecione o tipo primeiro' : 'Selecione a marca'}
                </option>
                {brands.map((b) => (
                  <option key={b.code} value={b.code}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Modelo + Ano */}
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <div>
              <p className="text-[13px] font-semibold tracking-[1.5px] uppercase mb-2" style={{ color: '#666' }}>
                Modelo
              </p>
              <select
                className={selectClass}
                style={selectStyle}
                value={selectedModel?.id ?? ''}
                onChange={(e) => {
                  const m = models.find((m) => m.id === e.target.value) ?? null
                  setSelectedModel(m)
                }}
                disabled={models.length === 0 || loadingModels}
              >
                <option value="">
                  {loadingModels ? 'Carregando...' : models.length === 0 ? 'Selecione a marca primeiro' : 'Selecione o modelo'}
                </option>
                {models.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-[13px] font-semibold tracking-[1.5px] uppercase mb-2" style={{ color: '#666' }}>
                Ano / Combustível
              </p>
              <select
                className={selectClass}
                style={selectStyle}
                value={selectedYear?.code ?? ''}
                onChange={(e) => {
                  const y = years.find((y) => y.code === e.target.value) ?? null
                  setSelectedYear(y)
                  setSubmittedVehicle(null)
                }}
                disabled={years.length === 0 || loadingYears}
              >
                <option value="">
                  {loadingYears
                    ? 'Carregando...'
                    : fipeUnavailable
                      ? 'FIPE indisponível'
                      : years.length === 0
                        ? 'Selecione o modelo primeiro'
                        : 'Selecione o ano'}
                </option>
                {years.map((y) => (
                  <option key={y.code} value={y.code}>{y.name}</option>
                ))}
              </select>
              {fipeUnavailable && !loadingYears && selectedModel && selectedBrand && (
                <button
                  onClick={() => fetchYears(selectedBrand, selectedModel)}
                  className="mt-1.5 text-[12px] font-semibold flex items-center gap-1 transition-opacity hover:opacity-80"
                  style={{ color: '#ff6600', fontFamily: 'var(--font-barlow)' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>
                  </svg>
                  Tentar novamente
                </button>
              )}
            </div>
          </div>

          {/* Button */}
          <button
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white text-xl font-bold tracking-[2px] uppercase transition-all duration-150 active:scale-[0.98] disabled:cursor-not-allowed mt-1"
            style={{
              fontFamily: 'var(--font-barlow-condensed)',
              background: selectedYear ? '#ff6600' : '#30303a',
              color: selectedYear ? '#fff' : '#444',
            }}
            disabled={!selectedYear || loadingYears}
            onClick={handleSearch}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            Revelar os Macetes
          </button>
        </div>
      </div>

      {/* Results */}
      {submittedVehicle && (
        <div className="mt-8 space-y-4">
          <FipePriceCard
            type={submittedVehicle.type}
            brandCode={submittedVehicle.brandCode}
            modelCode={submittedVehicle.modelCode}
            yearCode={submittedVehicle.yearCode}
            vehicleLabel={`${submittedVehicle.brandName} ${submittedVehicle.modelName} ${submittedVehicle.yearName}`}
            fipeBrandCode={submittedVehicle.fipeBrandCode ?? undefined}
            fipeModelCode={submittedVehicle.fipeModelCode ?? undefined}
          />
          <ChronicProblemsCard
            modelName={submittedVehicle.modelName}
            yearCode={submittedVehicle.yearCode}
            yearName={submittedVehicle.yearName}
            vehicleLabel={`${submittedVehicle.brandName} ${submittedVehicle.modelName} ${submittedVehicle.yearName}`}
          />
          <ResultArea
            modelName={submittedVehicle.modelName}
            yearCode={submittedVehicle.yearCode}
            yearName={submittedVehicle.yearName}
            vehicleLabel={`${submittedVehicle.brandName} ${submittedVehicle.modelName} ${submittedVehicle.yearName}`}
            vehicleType={submittedVehicle.type}
          />
        </div>
      )}
    </div>
  )
}
