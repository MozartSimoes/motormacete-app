import { useState, useEffect, useRef } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  TextInput, ActivityIndicator,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import PickerModal, { type PickerItem } from '../../components/PickerModal'

const API = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000'

// ── IPVA por estado ────────────────────────────────────────────────────────────
const IPVA: Record<string, { car: number; moto: number }> = {
  AC:{car:2.0,moto:2.0}, AL:{car:2.5,moto:1.5}, AM:{car:3.0,moto:2.0},
  AP:{car:2.0,moto:1.5}, BA:{car:3.5,moto:2.0}, CE:{car:3.0,moto:1.5},
  DF:{car:3.5,moto:2.5}, ES:{car:2.0,moto:1.0}, GO:{car:3.5,moto:2.0},
  MA:{car:2.5,moto:1.5}, MG:{car:4.0,moto:2.0}, MS:{car:2.5,moto:1.5},
  MT:{car:3.0,moto:1.5}, PA:{car:2.5,moto:1.5}, PB:{car:3.0,moto:2.0},
  PE:{car:3.0,moto:1.5}, PI:{car:2.5,moto:1.5}, PR:{car:3.5,moto:2.0},
  RJ:{car:4.0,moto:2.0}, RN:{car:3.0,moto:2.0}, RO:{car:2.0,moto:1.5},
  RR:{car:2.0,moto:2.0}, RS:{car:3.0,moto:1.5}, SC:{car:2.0,moto:1.0},
  SE:{car:2.5,moto:1.5}, SP:{car:4.0,moto:2.0}, TO:{car:2.5,moto:1.5},
}
const UFS = Object.keys(IPVA).sort()

// ── helpers ───────────────────────────────────────────────────────────────────
function detectFuel(y: string): 'FLEX' | 'GASOLINA' | 'DIESEL' | 'ELETRICO' | 'HIBRIDO' {
  const n = y.toUpperCase()
  if (n.includes('DIESEL'))  return 'DIESEL'
  if (n.includes('ELÉTRIC') || n.includes('ELETRIC')) return 'ELETRICO'
  if (n.includes('HÍBRID')  || n.includes('HIBRID'))  return 'HIBRIDO'
  if (n.includes('GASOLINA')) return 'GASOLINA'
  return 'FLEX'
}
function parseYear(y: string) { return parseInt(y.slice(0, 4)) || new Date().getFullYear() }
function fmtBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

interface Costs {
  ipva: number; licenciamento: number; seguro: number
  combustivel: number; manutencao: number; depreciacao: number; total: number
}
function calcCosts(fipe: number, vType: string, state: string, yearNum: number, kmMonth: number, kmLiter: number, fuelPrice: number): Costs {
  const ipvaRate  = (IPVA[state]?.[vType === 'moto' ? 'moto' : 'car'] ?? 3.0) / 100
  const ipva      = (fipe * ipvaRate) / 12
  const licen     = 160 / 12
  const insRate   = fipe < 30000 ? 0.040 : fipe < 60000 ? 0.050 : fipe < 100000 ? 0.060 : 0.075
  const seguro    = (fipe * insRate) / 12
  const liters    = kmLiter > 0 ? kmMonth / kmLiter : 0
  const comb      = liters * fuelPrice
  const age       = new Date().getFullYear() - yearNum
  const manut     = vType === 'moto' ? (age < 5 ? 90 : 140) : (age < 5 ? 180 : age < 10 ? 260 : 380)
  const deprRate  = (age < 3 ? 0.13 : age < 7 ? 0.09 : age < 12 ? 0.06 : 0.04) / 12
  const depr      = fipe * deprRate
  const total     = ipva + licen + seguro + comb + manut + depr
  return { ipva, licenciamento: licen, seguro, combustivel: comb, manutencao: manut, depreciacao: depr, total }
}

// ── Compact number input ──────────────────────────────────────────────────────
function NumInput({ label, value, onChange, step = 1, suffix = '' }: {
  label: string; value: number; onChange: (v: number) => void; step?: number; suffix?: string
}) {
  return (
    <View style={ni.wrap}>
      <Text style={ni.label}>{label}</Text>
      <View style={ni.row}>
        <TouchableOpacity style={ni.btn} onPress={() => onChange(Math.max(0, +(value - step).toFixed(2)))}>
          <Text style={ni.btnText}>−</Text>
        </TouchableOpacity>
        <TextInput
          style={ni.input}
          value={String(value)}
          onChangeText={t => { const n = parseFloat(t); if (!isNaN(n)) onChange(n) }}
          keyboardType="numeric"
          textAlign="center"
        />
        <TouchableOpacity style={ni.btn} onPress={() => onChange(+(value + step).toFixed(2))}>
          <Text style={ni.btnText}>+</Text>
        </TouchableOpacity>
      </View>
      {suffix ? <Text style={ni.suffix}>{suffix}</Text> : null}
    </View>
  )
}

// ── Cost bar item ─────────────────────────────────────────────────────────────
const COST_ITEMS = [
  { key: 'ipva',         label: 'IPVA',           icon: '🏛️', color: '#ef4444' },
  { key: 'seguro',       label: 'Seguro (est.)',  icon: '🛡️', color: '#f59e0b' },
  { key: 'combustivel',  label: 'Combustível',    icon: '⛽', color: '#3b82f6' },
  { key: 'manutencao',   label: 'Manutenção',     icon: '🔧', color: '#22c55e' },
  { key: 'licenciamento',label: 'Licenciamento',  icon: '📋', color: '#8b5cf6' },
  { key: 'depreciacao',  label: 'Depreciação',    icon: '📉', color: '#64748b' },
] as const

// ── Main screen ───────────────────────────────────────────────────────────────
export default function CostsScreen() {
  const scrollRef  = useRef<ScrollView>(null)
  const resultsRef = useRef<View>(null)

  // vehicle selection
  const [vType, setVType]       = useState<'carro' | 'moto'>('carro')
  const [brands, setBrands]     = useState<PickerItem[]>([])
  const [brand, setBrand]       = useState<PickerItem | null>(null)
  const [models, setModels]     = useState<PickerItem[]>([])
  const [model, setModel]       = useState<PickerItem | null>(null)
  const [years, setYears]       = useState<PickerItem[]>([])
  const [year, setYear]         = useState<PickerItem | null>(null)
  const [loadingV, setLoadingV] = useState(false)

  // FIPE
  const [fipe, setFipe]         = useState<number | null>(null)
  const [fipeMonth, setFipeMonth] = useState('')
  const [loadingFipe, setLoadingFipe] = useState(false)

  // inputs
  const [state, setState]       = useState('SP')
  const [kmMonth, setKmMonth]   = useState(1500)
  const [kmLiter, setKmLiter]   = useState(12)
  const [fuelPrice, setFuelPrice] = useState(6.09)
  const [useFlex, setUseFlex]   = useState<'gas' | 'etanol'>('gas')

  // cascading loads
  useEffect(() => {
    setBrands([]); setBrand(null); setModels([]); setModel(null)
    setYears([]); setYear(null); setFipe(null)
    setLoadingV(true)
    fetch(`${API}/api/vehicles?type=${vType}`)
      .then(r => r.json())
      .then(d => { setBrands(d.brands ?? []); setLoadingV(false) })
  }, [vType])

  useEffect(() => {
    if (!brand) { setModels([]); setModel(null); setYears([]); setYear(null); setFipe(null); return }
    setLoadingV(true)
    fetch(`${API}/api/vehicles?type=${vType}&brandCode=${brand.code}`)
      .then(r => r.json())
      .then(d => { setModels((d.models ?? []).map((m: any) => ({ code: m.id, name: m.name }))); setModel(null); setYears([]); setYear(null); setFipe(null); setLoadingV(false) })
  }, [brand])

  useEffect(() => {
    if (!brand || !model) { setYears([]); setYear(null); setFipe(null); return }
    setLoadingV(true)
    fetch(`${API}/api/vehicles?type=${vType}&brandCode=${brand.code}&modelCode=${model.code}`)
      .then(r => r.json())
      .then(d => { setYears(d.years ?? []); setYear(null); setFipe(null); setLoadingV(false) })
  }, [model])

  useEffect(() => {
    if (!brand || !model || !year) { setFipe(null); return }
    setLoadingFipe(true)
    fetch(`${API}/api/fipe/price?type=${vType}&brandCode=${brand.code}&modelCode=${model.code}&yearCode=${encodeURIComponent(year.code)}`)
      .then(r => r.json())
      .then(d => { setFipe(d.currentFipe ?? null); setFipeMonth(d.referenceMonth ?? ''); setLoadingFipe(false) })
  }, [year])

  // scroll to results when FIPE loads
  useEffect(() => {
    if (!fipe) return
    setTimeout(() => {
      resultsRef.current?.measureLayout(
        scrollRef.current?.getScrollableNode() as any,
        (_x, y) => scrollRef.current?.scrollTo({ y: y - 12, animated: true }),
        () => {},
      )
    }, 300)
  }, [fipe])

  const fuelType     = year ? detectFuel(year.name) : 'FLEX'
  const yearNum      = year ? parseYear(year.name) : new Date().getFullYear()
  const effectivePrice = fuelType === 'FLEX' && useFlex === 'etanol' ? fuelPrice * 0.7 : fuelPrice

  const costs: Costs | null = fipe
    ? calcCosts(fipe, vType, state, yearNum, kmMonth, kmLiter, effectivePrice)
    : null

  const stateItems: PickerItem[] = UFS.map(uf => ({
    code: uf,
    name: `${uf} — ${IPVA[uf]?.[vType === 'moto' ? 'moto' : 'car'] ?? 0}% ${vType === 'moto' ? 'motos' : 'carros'}`,
  }))

  return (
    <ScrollView ref={scrollRef} style={s.container} contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">

      {/* 1 — Vehicle selection */}
      <View style={s.card}>
        <Text style={s.stepLabel}>1. Selecione o veículo</Text>

        <View style={s.typeRow}>
          {(['carro', 'moto'] as const).map(t => (
            <TouchableOpacity key={t}
              style={[s.typeBtn, vType === t && s.typeBtnActive]}
              onPress={() => setVType(t)}>
              {t === 'carro'
                ? <Ionicons name="car-outline" size={16} color={vType === t ? '#fff' : '#9a9a9a'} />
                : <MaterialCommunityIcons name="motorbike" size={16} color={vType === t ? '#fff' : '#9a9a9a'} />}
              <Text style={[s.typeBtnText, vType === t && s.typeBtnTextActive]}>
                {t === 'carro' ? 'Carro' : 'Moto'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {loadingV && <ActivityIndicator color="#ff6600" style={{ marginVertical: 6 }} />}

        <PickerModal label="Marca" placeholder="Selecione a marca"
          items={brands} value={brand}
          onChange={b => { setBrand(b); setModel(null); setYear(null); setFipe(null) }} />

        <PickerModal label="Modelo" placeholder={brand ? 'Selecione o modelo' : 'Selecione a marca primeiro'}
          items={models} value={model} disabled={!brand}
          onChange={m => { setModel(m); setYear(null); setFipe(null) }} />

        <PickerModal label="Ano / Combustível" placeholder={model ? 'Selecione o ano' : 'Selecione o modelo primeiro'}
          items={years} value={year} disabled={!model} searchable={false}
          onChange={y => setYear(y)} />

        {loadingFipe && (
          <View style={s.fipeLoading}>
            <ActivityIndicator color="#ff6600" size="small" />
            <Text style={s.fipeLoadingText}>Buscando valor FIPE...</Text>
          </View>
        )}

        {fipe && !loadingFipe && (
          <View style={s.fipeBadge}>
            <Text style={s.fipeBadgeIcon}>📊</Text>
            <View>
              <Text style={s.fipeBadgeLabel}>Tabela FIPE · {fipeMonth}</Text>
              <Text style={s.fipeBadgeValue}>{fmtBRL(fipe)}</Text>
            </View>
          </View>
        )}
      </View>

      {/* 2 — Inputs */}
      <View style={s.card}>
        <Text style={s.stepLabel}>2. Seus dados de uso</Text>

        <PickerModal label="Estado (IPVA)" placeholder="Selecione o estado"
          items={stateItems} value={stateItems.find(i => i.code === state) ?? null}
          onChange={i => setState(i.code)} searchable={true} />

        <View style={s.inputGrid}>
          <NumInput label="KM por mês" value={kmMonth} onChange={setKmMonth} step={100} suffix="km" />
          <NumInput label="Consumo" value={kmLiter} onChange={setKmLiter} step={0.5} suffix="km/L" />
          <NumInput label="Preço do combustível" value={fuelPrice} onChange={setFuelPrice} step={0.1} suffix="R$/L" />
        </View>

        {fuelType === 'FLEX' && (
          <View>
            <Text style={s.flexLabel}>Combustível usado</Text>
            <View style={s.flexRow}>
              {(['gas', 'etanol'] as const).map(f => (
                <TouchableOpacity key={f}
                  style={[s.flexBtn, useFlex === f && s.flexBtnActive]}
                  onPress={() => setUseFlex(f)}>
                  <Text style={[s.flexBtnText, useFlex === f && s.flexBtnTextActive]}>
                    {f === 'gas' ? 'Gasolina' : 'Etanol'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {useFlex === 'etanol' && (
              <Text style={s.etanolNote}>Etanol equivalente ≈ R${(fuelPrice * 0.7).toFixed(2)}/L</Text>
            )}
            <Text style={s.flexTip}>💡 Use etanol se o preço for abaixo de 70% da gasolina</Text>
          </View>
        )}
      </View>

      {/* 3 — Results */}
      {costs && (
        <View ref={resultsRef}>
          {/* Total header */}
          <View style={s.totalCard}>
            <Text style={s.totalLabel}>Custo Mensal Estimado</Text>
            <Text style={s.totalValue}>{fmtBRL(costs.total)}</Text>
            <Text style={s.totalAnnual}>{fmtBRL(costs.total * 12)} / ano</Text>
            <View style={s.vehicleLabel}>
              {vType === 'moto'
                ? <MaterialCommunityIcons name="motorbike" size={18} color="#ff6600" />
                : <Ionicons name="car-outline" size={18} color="#ff6600" />}
              <Text style={s.vehicleName} numberOfLines={1}>
                {brand?.name} {model?.name} · {yearNum} · {fmtBRL(fipe!)}
              </Text>
            </View>
          </View>

          {/* Breakdown */}
          <View style={s.breakdownCard}>
            {COST_ITEMS.map((item, idx) => {
              const val = costs[item.key]
              const pct = (val / costs.total) * 100
              return (
                <View key={item.key}
                  style={[s.costRow, idx < COST_ITEMS.length - 1 && s.costRowBorder]}>
                  <Text style={s.costIcon}>{item.icon}</Text>
                  <View style={s.costMid}>
                    <Text style={s.costLabel}>{item.label}</Text>
                    <View style={s.costBarTrack}>
                      <View style={[s.costBar, { width: `${pct}%`, backgroundColor: item.color }]} />
                    </View>
                  </View>
                  <View style={s.costRight}>
                    <Text style={s.costValue}>{fmtBRL(val)}</Text>
                    <Text style={s.costPct}>{pct.toFixed(0)}%</Text>
                  </View>
                </View>
              )
            })}

            <Text style={s.breakdownNote}>
              * Valores estimados. IPVA, seguro, consumo e manutenção variam conforme perfil do motorista, cidade e ano do veículo.
            </Text>
          </View>

          {/* Summary card */}
          <View style={s.summaryCard}>
            <Text style={s.summaryTitle}>💡 Resumo financeiro</Text>
            {[
              { label: 'Custo por km rodado',    value: kmMonth > 0 ? `R$ ${(costs.total / kmMonth).toFixed(2)}/km` : '—' },
              { label: 'Custo anual total',       value: fmtBRL(costs.total * 12) },
              { label: 'Custo em 5 anos (est.)',  value: fmtBRL(costs.total * 60) },
              { label: 'Renda mín. recomendada',  value: `${fmtBRL(costs.total * 3)}/mês` },
            ].map(row => (
              <View key={row.label} style={s.summaryRow}>
                <Text style={s.summaryKey}>{row.label}</Text>
                <Text style={s.summaryVal}>{row.value}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {!fipe && !loadingFipe && (
        <View style={s.empty}>
          <Text style={s.emptyIcon}>🧮</Text>
          <Text style={s.emptyTitle}>Selecione o veículo</Text>
          <Text style={s.emptyText}>Escolha marca, modelo e ano para calcular o custo real de propriedade.</Text>
        </View>
      )}
    </ScrollView>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────
const ni = StyleSheet.create({
  wrap: { marginBottom: 12 },
  label: { fontSize: 11, fontWeight: '700', color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111113', borderRadius: 10, borderWidth: 1, borderColor: '#2a2a2e', overflow: 'hidden' },
  btn: { paddingHorizontal: 16, paddingVertical: 13 },
  btnText: { fontSize: 18, color: '#ff6600', fontWeight: '700' },
  input: { flex: 1, color: '#f0ede8', fontSize: 15, fontWeight: '600', paddingVertical: 12 },
  suffix: { fontSize: 10, color: '#555', marginTop: 3, textAlign: 'right' },
})

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0e0e0f' },
  content: { padding: 16, paddingBottom: 48 },
  card: { backgroundColor: '#141416', borderRadius: 16, borderWidth: 1, borderColor: '#2a2a2e', padding: 16, marginBottom: 16 },
  stepLabel: { fontSize: 11, fontWeight: '700', color: '#ff6600', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 },
  typeRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  typeBtn: { flex: 1, paddingVertical: 11, borderRadius: 10, backgroundColor: '#1a1a1c', borderWidth: 1, borderColor: '#2a2a2e', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6 },
  typeBtnActive: { backgroundColor: '#ff6600', borderColor: '#ff6600' },
  typeBtnText: { fontSize: 13, fontWeight: '700', color: '#9a9a9a' },
  typeBtnTextActive: { color: '#fff' },
  fipeLoading: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 },
  fipeLoadingText: { fontSize: 12, color: '#555' },
  fipeBadge: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'rgba(255,102,0,0.08)', borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,102,0,0.2)', padding: 12, marginTop: 10 },
  fipeBadgeIcon: { fontSize: 22 },
  fipeBadgeLabel: { fontSize: 10, fontWeight: '700', color: '#ff6600', textTransform: 'uppercase', letterSpacing: 1 },
  fipeBadgeValue: { fontSize: 20, fontWeight: '900', color: '#f0ede8' },
  inputGrid: { gap: 4 },
  flexLabel: { fontSize: 11, fontWeight: '700', color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8, marginTop: 4 },
  flexRow: { flexDirection: 'row', backgroundColor: '#111113', borderRadius: 10, borderWidth: 1, borderColor: '#2a2a2e', padding: 4, gap: 4 },
  flexBtn: { flex: 1, paddingVertical: 9, borderRadius: 8, alignItems: 'center' },
  flexBtnActive: { backgroundColor: '#ff6600' },
  flexBtnText: { fontSize: 13, fontWeight: '700', color: '#9a9a9a' },
  flexBtnTextActive: { color: '#fff' },
  etanolNote: { fontSize: 11, color: '#888', marginTop: 6 },
  flexTip: { fontSize: 11, color: '#444', marginTop: 4 },
  // Results
  totalCard: { backgroundColor: '#1a0a00', borderRadius: 16, borderWidth: 1, borderColor: '#2a2a2e', padding: 20, marginBottom: 12, alignItems: 'center' },
  totalLabel: { fontSize: 11, fontWeight: '700', color: '#ff6600', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 6 },
  totalValue: { fontSize: 52, fontWeight: '900', color: '#f0ede8', lineHeight: 60 },
  totalAnnual: { fontSize: 13, color: '#888', marginTop: 2, marginBottom: 12 },
  vehicleLabel: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  vehicleIcon: { fontSize: 16 },
  vehicleName: { fontSize: 13, color: '#666', flex: 1 },
  breakdownCard: { backgroundColor: '#141416', borderRadius: 16, borderWidth: 1, borderColor: '#2a2a2e', overflow: 'hidden', marginBottom: 12 },
  costRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  costRowBorder: { borderBottomWidth: 1, borderBottomColor: '#1a1a1c' },
  costIcon: { fontSize: 18, width: 26, textAlign: 'center' },
  costMid: { flex: 1 },
  costLabel: { fontSize: 12, fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 5 },
  costBarTrack: { height: 4, borderRadius: 2, backgroundColor: '#1e1e22', overflow: 'hidden' },
  costBar: { height: '100%', borderRadius: 2 },
  costRight: { alignItems: 'flex-end' },
  costValue: { fontSize: 15, fontWeight: '800', color: '#f0ede8' },
  costPct: { fontSize: 10, color: '#444' },
  breakdownNote: { fontSize: 10, color: '#333', padding: 12, lineHeight: 16 },
  summaryCard: { backgroundColor: '#141416', borderRadius: 16, borderWidth: 1, borderColor: '#2a2a2e', padding: 16, marginBottom: 12, gap: 12 },
  summaryTitle: { fontSize: 13, fontWeight: '700', color: '#ff6600' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryKey: { fontSize: 12, color: '#666' },
  summaryVal: { fontSize: 13, fontWeight: '700', color: '#f0ede8' },
  empty: { alignItems: 'center', paddingVertical: 40, gap: 10 },
  emptyIcon: { fontSize: 48 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#f0ede8' },
  emptyText: { fontSize: 13, color: '#555', textAlign: 'center', lineHeight: 20 },
})
