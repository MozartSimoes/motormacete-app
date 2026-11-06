import { useState } from 'react'
import {
  View, Text, ScrollView, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { apiFetch } from '../../lib/api'

interface Recall {
  id: string
  number: string
  title: string
  brand: string
  models: string[]
  yearFrom: number
  yearTo: number
  status: string
  defect: string
  action: string
  units?: number | null
  source?: string | null
}

function StatusBadge({ status }: { status: string }) {
  const cfg =
    status === 'ATIVO'
      ? { bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.4)',  text: '#ef4444', label: 'Ativo' }
      : status === 'ENCERRADO'
      ? { bg: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.4)',  text: '#22c55e', label: 'Encerrado' }
      : { bg: 'rgba(234,179,8,0.12)',  border: 'rgba(234,179,8,0.4)',  text: '#eab308', label: 'Pendente' }
  return (
    <View style={{ backgroundColor: cfg.bg, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3, borderWidth: 1, borderColor: cfg.border }}>
      <Text style={{ color: cfg.text, fontSize: 11, fontWeight: '700' }}>{cfg.label}</Text>
    </View>
  )
}

export default function RecallScreen() {
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Recall[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSearch() {
    if (!brand.trim() && !model.trim() && !year.trim()) return
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (brand.trim()) params.set('brand', brand.trim())
      if (model.trim()) params.set('model', model.trim())
      if (year.trim()) params.set('year', year.trim())
      const res = await apiFetch(`/api/recalls?${params.toString()}`)
      if (!res.ok) { setError(`Erro ${res.status}: ${res.statusText}`); setResults([]); return }
      const data = await res.json()
      setResults(data.recalls ?? [])
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e))
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={s.root}>
      <ScrollView style={s.container} contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">

        {/* Search card */}
        <View style={s.searchCard}>
          <Text style={s.cardTitle}>Verificar Recall</Text>
          <Text style={s.cardSub}>Pesquise por marca, modelo ou ano do veículo</Text>

          <Text style={s.label}>Marca</Text>
          <TextInput
            style={s.input}
            placeholder="Ex: Honda, Toyota, Fiat..."
            placeholderTextColor="#444"
            value={brand}
            onChangeText={setBrand}
            autoCapitalize="words"
            returnKeyType="next"
          />

          <View style={s.row}>
            <View style={{ flex: 1 }}>
              <Text style={s.label}>Modelo</Text>
              <TextInput
                style={s.input}
                placeholder="Ex: Civic, HRV..."
                placeholderTextColor="#444"
                value={model}
                onChangeText={setModel}
                autoCapitalize="words"
              />
            </View>
            <View style={{ width: 12 }} />
            <View style={{ flex: 0.55 }}>
              <Text style={s.label}>Ano</Text>
              <TextInput
                style={s.input}
                placeholder="2020"
                placeholderTextColor="#444"
                value={year}
                onChangeText={setYear}
                keyboardType="number-pad"
                maxLength={4}
              />
            </View>
          </View>

          <TouchableOpacity style={[s.btn, loading && s.btnDisabled]} onPress={handleSearch} disabled={loading}>
            {loading
              ? <ActivityIndicator color="#fff" size="small" />
              : <>
                  <Ionicons name="search" size={17} color="#fff" />
                  <Text style={s.btnText}>Pesquisar recalls</Text>
                </>
            }
          </TouchableOpacity>
        </View>

        {/* Error */}
        {error && (
          <View style={{ backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(239,68,68,0.3)', padding: 16, marginBottom: 16 }}>
            <Text style={{ color: '#ef4444', fontWeight: '700', marginBottom: 4 }}>Erro na requisição</Text>
            <Text style={{ color: '#ef4444', fontSize: 12 }}>{error}</Text>
            <Text style={{ color: '#666', fontSize: 11, marginTop: 6 }}>API: {process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000'}</Text>
          </View>
        )}

        {/* Results */}
        {results !== null && (
          results.length === 0 ? (
            <View style={s.empty}>
              <Ionicons name="checkmark-circle-outline" size={48} color="#22c55e" style={{ marginBottom: 12 }} />
              <Text style={s.emptyTitle}>Nenhum recall encontrado</Text>
              <Text style={s.emptyDesc}>
                Não foram encontrados recalls para os filtros informados.
              </Text>
            </View>
          ) : (
            <>
              <Text style={s.resultsLabel}>
                {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
              </Text>
              {results.map((r) => (
                <View key={r.id} style={[s.recallCard, r.status === 'ATIVO' && s.recallCardActive]}>
                  <View style={s.recallTop}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                      <Text style={s.recallTitle}>{r.title}</Text>
                      <Text style={s.recallBrand}>{r.brand} · {r.yearFrom}–{r.yearTo}</Text>
                    </View>
                    <StatusBadge status={r.status} />
                  </View>

                  {r.models.length > 0 && (
                    <View style={s.modelsRow}>
                      {r.models.slice(0, 4).map((m) => (
                        <View key={m} style={s.modelChip}>
                          <Text style={s.modelChipText}>{m}</Text>
                        </View>
                      ))}
                      {r.models.length > 4 && (
                        <Text style={s.modelMore}>+{r.models.length - 4}</Text>
                      )}
                    </View>
                  )}

                  <Text style={s.fieldLabel}>Defeito</Text>
                  <Text style={s.recallDefect}>{r.defect}</Text>

                  {!!r.action && (
                    <>
                      <Text style={s.actionLabel}>Providência</Text>
                      <Text style={s.recallAction}>{r.action}</Text>
                    </>
                  )}

                  <View style={s.metaRow}>
                    {r.units != null && (
                      <View style={s.metaItem}>
                        <Ionicons name="car-outline" size={12} color="#555" />
                        <Text style={s.metaText}>{r.units.toLocaleString('pt-BR')} unidades</Text>
                      </View>
                    )}
                    {!!r.number && (
                      <View style={s.metaItem}>
                        <Ionicons name="document-text-outline" size={12} color="#555" />
                        <Text style={s.metaText}>#{r.number}</Text>
                      </View>
                    )}
                    {!!r.source && (
                      <View style={s.metaItem}>
                        <Ionicons name="globe-outline" size={12} color="#555" />
                        <Text style={s.metaText}>{r.source}</Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </>
          )
        )}

        {/* Info panel before first search */}
        {results === null && (
          <View style={s.infoCard}>
            <Ionicons name="warning-outline" size={28} color="#ff6600" style={{ marginBottom: 10 }} />
            <Text style={s.infoTitle}>O que é recall?</Text>
            <Text style={s.infoText}>
              Recall é um chamado do fabricante para corrigir um defeito de segurança
              gratuitamente. Se encontrar um recall ativo para seu veículo, procure a
              concessionária autorizada — os reparos são sem custo algum.
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0e0e0f' },
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 60 },
  searchCard: { backgroundColor: '#141416', borderRadius: 16, borderWidth: 1, borderColor: '#2a2a2e', padding: 20, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: '800', color: '#f0ede8', marginBottom: 4 },
  cardSub: { fontSize: 13, color: '#555', marginBottom: 4 },
  label: { fontSize: 10, fontWeight: '700', color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 7, marginTop: 14 },
  input: { backgroundColor: '#0e0e0f', borderRadius: 10, borderWidth: 1, borderColor: '#2a2a2e', padding: 13, color: '#f0ede8', fontSize: 15 },
  row: { flexDirection: 'row', alignItems: 'flex-end' },
  btn: { marginTop: 20, backgroundColor: '#ff6600', borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  resultsLabel: { fontSize: 11, fontWeight: '700', color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 },
  recallCard: { backgroundColor: '#141416', borderRadius: 14, borderWidth: 1, borderColor: '#2a2a2e', padding: 16, marginBottom: 12 },
  recallCardActive: { borderColor: 'rgba(239,68,68,0.35)', backgroundColor: 'rgba(239,68,68,0.04)' },
  recallTop: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  recallTitle: { fontSize: 14, fontWeight: '700', color: '#f0ede8', lineHeight: 20, marginBottom: 3 },
  recallBrand: { fontSize: 12, color: '#666' },
  modelsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  modelChip: { backgroundColor: 'rgba(255,102,0,0.08)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3, borderWidth: 1, borderColor: 'rgba(255,102,0,0.2)' },
  modelChipText: { color: '#ff8533', fontSize: 11, fontWeight: '600' },
  modelMore: { color: '#555', fontSize: 11, alignSelf: 'center' },
  fieldLabel: { fontSize: 10, fontWeight: '700', color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
  recallDefect: { fontSize: 13, color: '#ccc', lineHeight: 19, marginBottom: 10 },
  actionLabel: { fontSize: 10, fontWeight: '700', color: '#22c55e', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
  recallAction: { fontSize: 13, color: '#aaa', lineHeight: 19, marginBottom: 10 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 4 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 11, color: '#555' },
  empty: { alignItems: 'center', paddingVertical: 40 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: '#f0ede8', marginBottom: 8 },
  emptyDesc: { fontSize: 13, color: '#555', textAlign: 'center', lineHeight: 20 },
  infoCard: { backgroundColor: '#141416', borderRadius: 14, borderWidth: 1, borderColor: '#2a2a2e', padding: 20, alignItems: 'center' },
  infoTitle: { fontSize: 14, fontWeight: '700', color: '#f0ede8', marginBottom: 8 },
  infoText: { fontSize: 13, color: '#666', textAlign: 'center', lineHeight: 20 },
})
