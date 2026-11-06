import { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, ActivityIndicator, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '../../lib/auth'
import { apiFetch } from '../../lib/api'

const DRIVER_FEATURES = [
  'Veículos ilimitados na garagem',
  'Consultas ilimitadas ao Mecânico Virtual',
  'Histórico de manutenção completo',
  'Pesquisa de macetes ilimitada',
  'Alertas de manutenção',
  'Notícias automotivas',
]

const MECHANIC_FEATURES = [
  'Ordens de serviço ilimitadas',
  'Dashboard financeiro completo',
  'Relatórios PDF de faturamento',
  'Destaque no mapa de oficinas',
  'Badge Mecânico Verificado',
  'Exportação de relatórios',
]

export default function PlansScreen() {
  const { user } = useAuth()
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')
  const [loading, setLoading] = useState(false)

  const isMechanic = user?.type === 'MECHANIC'
  const features = isMechanic ? MECHANIC_FEATURES : DRIVER_FEATURES
  const monthlyPrice = isMechanic ? 'R$ 6,99' : 'R$ 3,99'
  const annualPrice  = isMechanic ? 'R$ 69,90' : 'R$ 39,90'
  const annualEquiv  = isMechanic ? 'R$ 5,83/mês' : 'R$ 3,33/mês'
  const planLabel    = isMechanic ? 'Mecânico Pro' : 'Motorista Pro'

  async function handleSubscribe() {
    setLoading(true)
    try {
      const res = await apiFetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify({ type: isMechanic ? 'mechanic' : 'driver', billing }),
      })
      const data = await res.json()
      if (!res.ok) {
        Alert.alert('Atenção', data.error ?? 'Erro ao gerar link de pagamento.')
        return
      }
      await Linking.openURL(data.checkoutUrl)
    } catch {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>

      {/* Header */}
      <View style={s.header}>
        <Text style={s.label}>ASSINE O PLANO PRO</Text>
        <Text style={s.title}>{planLabel}</Text>
        <Text style={s.subtitle}>Desbloqueie todos os recursos do MotorMacete</Text>
      </View>

      {/* Billing toggle */}
      <View style={s.toggleRow}>
        <TouchableOpacity
          style={[s.toggleBtn, billing === 'monthly' && s.toggleActive]}
          onPress={() => setBilling('monthly')}>
          <Text style={[s.toggleText, billing === 'monthly' && s.toggleTextActive]}>Mensal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.toggleBtn, billing === 'annual' && s.toggleActive]}
          onPress={() => setBilling('annual')}>
          <Text style={[s.toggleText, billing === 'annual' && s.toggleTextActive]}>Anual</Text>
          <View style={s.saveBadge}><Text style={s.saveBadgeText}>2 meses grátis</Text></View>
        </TouchableOpacity>
      </View>

      {/* Price card */}
      <View style={s.priceCard}>
        <Text style={s.planName}>{planLabel}</Text>
        <View style={s.priceRow}>
          <Text style={s.price}>{billing === 'monthly' ? monthlyPrice : annualPrice}</Text>
          <Text style={s.pricePer}>/{billing === 'monthly' ? 'mês' : 'ano'}</Text>
        </View>
        {billing === 'annual' && (
          <Text style={s.annualEquiv}>≈ {annualEquiv} · 2 meses grátis</Text>
        )}
        {billing === 'monthly' && (
          <Text style={s.annualEquiv}>{isMechanic ? 'Para oficinas e mecânicos profissionais' : '≈ R$ 0,16/dia'}</Text>
        )}

        {/* Features */}
        <View style={s.featureList}>
          {features.map(f => (
            <View key={f} style={s.featureRow}>
              <Ionicons name="checkmark-circle" size={18} color="#ff6600" />
              <Text style={s.featureText}>{f}</Text>
            </View>
          ))}
        </View>

        {/* CTA */}
        <TouchableOpacity style={s.ctaBtn} onPress={handleSubscribe} disabled={loading}>
          {loading
            ? <ActivityIndicator color="#111" />
            : <Text style={s.ctaText}>
                Assinar por {billing === 'monthly' ? monthlyPrice : annualPrice}/{billing === 'monthly' ? 'mês' : 'ano'}
              </Text>
          }
        </TouchableOpacity>

        <Text style={s.secureNote}>
          <Ionicons name="lock-closed-outline" size={12} color="#555" /> Pagamento seguro pelo Mercado Pago
        </Text>
      </View>

      {/* Free plan reminder */}
      <View style={s.freeCard}>
        <Text style={s.freeTitle}>Plano Grátis (atual)</Text>
        <Text style={s.freeDesc}>1 veículo · 5 consultas/mês ao Mecânico · Histórico de manutenção</Text>
      </View>

    </ScrollView>
  )
}

const s = StyleSheet.create({
  container:        { flex: 1, backgroundColor: '#0e0e0f' },
  content:          { padding: 20, paddingBottom: 48 },

  header:           { alignItems: 'center', paddingVertical: 28 },
  label:            { fontSize: 11, fontWeight: '700', color: '#ff6600', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 },
  title:            { fontSize: 30, fontWeight: '900', color: '#f0ede8', marginBottom: 6 },
  subtitle:         { fontSize: 14, color: '#666', textAlign: 'center' },

  toggleRow:        { flexDirection: 'row', backgroundColor: '#141416', borderRadius: 16, padding: 4, marginBottom: 20, borderWidth: 1, borderColor: '#2a2a2e' },
  toggleBtn:        { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6 },
  toggleActive:     { backgroundColor: '#ff6600' },
  toggleText:       { fontSize: 14, fontWeight: '700', color: '#9a9a9a' },
  toggleTextActive: { color: '#fff' },
  saveBadge:        { backgroundColor: 'rgba(34,197,94,0.15)', borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2 },
  saveBadgeText:    { fontSize: 10, fontWeight: '700', color: '#22c55e' },

  priceCard:        { backgroundColor: '#141416', borderRadius: 20, borderWidth: 1, borderColor: '#2a2a2e', padding: 24, marginBottom: 16 },
  planName:         { fontSize: 12, fontWeight: '700', color: '#ff6600', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 },
  priceRow:         { flexDirection: 'row', alignItems: 'flex-end', gap: 4, marginBottom: 4 },
  price:            { fontSize: 42, fontWeight: '900', color: '#f0ede8' },
  pricePer:         { fontSize: 16, color: '#555', marginBottom: 8 },
  annualEquiv:      { fontSize: 12, color: '#22c55e', marginBottom: 20 },

  featureList:      { gap: 12, marginBottom: 24 },
  featureRow:       { flexDirection: 'row', alignItems: 'center', gap: 10 },
  featureText:      { fontSize: 14, color: '#ccc', flex: 1 },

  ctaBtn:           { backgroundColor: '#ff6600', borderRadius: 100, paddingVertical: 16, alignItems: 'center', marginBottom: 12 },
  ctaText:          { fontSize: 14, fontWeight: '800', color: '#111', textTransform: 'uppercase', letterSpacing: 1 },

  secureNote:       { textAlign: 'center', fontSize: 11, color: '#444' },

  freeCard:         { backgroundColor: '#0f0f11', borderRadius: 16, borderWidth: 1, borderColor: '#1a1a1c', padding: 16 },
  freeTitle:        { fontSize: 13, fontWeight: '700', color: '#555', marginBottom: 4 },
  freeDesc:         { fontSize: 12, color: '#444' },
})
