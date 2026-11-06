import { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Linking, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { apiFetch } from '../../lib/api'

interface Workshop {
  id: string
  name: string
  phone?: string
  specialties?: string[]
  street?: string
  number?: string
  complement?: string
  neighborhood?: string
  city?: string
  state?: string
  isPro?: boolean
  user?: { name: string }
}

function formatAddress(w: Workshop): string {
  const parts: string[] = []
  if (w.street) parts.push(w.street + (w.number ? `, ${w.number}` : ''))
  if (w.complement) parts.push(w.complement)
  if (w.neighborhood) parts.push(w.neighborhood)
  if (w.city) parts.push(w.state ? `${w.city} - ${w.state}` : w.city)
  return parts.join(' · ') || 'Endereço não informado'
}

export default function WorkshopsScreen() {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiFetch('/api/workshops')
      .then((r) => r.json())
      .then((data) => setWorkshops(data.workshops ?? []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <View style={s.center}><ActivityIndicator color="#ff6600" size="large" /></View>
  }

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
      {workshops.length === 0 ? (
        <View style={s.empty}>
          <Ionicons name="build-outline" size={56} color="#333" style={{ marginBottom: 16 }} />
          <Text style={s.emptyTitle}>Nenhuma oficina encontrada</Text>
          <Text style={s.emptyDesc}>Ainda não há oficinas cadastradas na sua região.</Text>
        </View>
      ) : (
        workshops.map((w) => (
          <View key={w.id} style={[s.card, w.isPro && s.cardPro]}>

            {/* Nome + badge Pro */}
            <View style={s.nameRow}>
              <Text style={s.cardName} numberOfLines={1}>{w.name}</Text>
              {w.isPro && (
                <View style={s.proBadge}>
                  <Text style={s.proBadgeText}>⭐ PRO</Text>
                </View>
              )}
            </View>

            {/* Responsável */}
            {w.user?.name && (
              <Text style={s.responsible}>Responsável: {w.user.name}</Text>
            )}

            {/* Endereço */}
            <View style={s.addressRow}>
              <Ionicons name="location-outline" size={13} color="#555" />
              <Text style={s.cardAddress}>{formatAddress(w)}</Text>
            </View>

            {/* Especialidades */}
            {w.specialties && w.specialties.length > 0 && (
              <View style={s.tags}>
                {w.specialties.map((sp) => (
                  <View key={sp} style={[s.tag, w.isPro && s.tagPro]}>
                    <Text style={[s.tagText, w.isPro && s.tagTextPro]}>{sp}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Telefone */}
            {w.phone && (
              <TouchableOpacity style={s.phoneRow} onPress={() => Linking.openURL(`tel:${w.phone}`)}>
                <Ionicons name="call-outline" size={14} color="#ff6600" />
                <Text style={s.phone}>{w.phone}</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      )}
    </ScrollView>
  )
}

const s = StyleSheet.create({
  container:     { flex: 1, backgroundColor: '#0e0e0f' },
  content:       { padding: 20, paddingBottom: 40 },
  center:        { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0e0e0f' },
  empty:         { alignItems: 'center', paddingVertical: 60 },
  emptyTitle:    { fontSize: 18, fontWeight: '700', color: '#f0ede8', marginBottom: 8 },
  emptyDesc:     { fontSize: 13, color: '#555', textAlign: 'center', lineHeight: 20 },

  card:          { backgroundColor: '#141416', borderRadius: 14, borderWidth: 1, borderColor: '#2a2a2e', padding: 16, marginBottom: 12 },
  cardPro:       { backgroundColor: 'rgba(255,102,0,0.04)', borderColor: 'rgba(255,102,0,0.35)',
                   shadowColor: '#ff6600', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 4 },

  nameRow:       { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 3, flexWrap: 'wrap' },
  cardName:      { fontSize: 16, fontWeight: '800', color: '#f0ede8', flexShrink: 1 },
  proBadge:      { backgroundColor: '#ff6600', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3 },
  proBadgeText:  { fontSize: 10, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },

  responsible:   { fontSize: 11, color: '#555', marginBottom: 8 },
  addressRow:    { flexDirection: 'row', alignItems: 'flex-start', gap: 4, marginBottom: 10 },
  cardAddress:   { fontSize: 12, color: '#555', flex: 1, lineHeight: 18 },

  tags:          { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  tag:           { backgroundColor: '#1a1a1c', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: '#2a2a2e' },
  tagPro:        { backgroundColor: 'rgba(255,102,0,0.10)', borderColor: 'rgba(255,102,0,0.25)' },
  tagText:       { fontSize: 11, color: '#777' },
  tagTextPro:    { color: '#ff8533' },

  phoneRow:      { flexDirection: 'row', alignItems: 'center', gap: 6 },
  phone:         { fontSize: 13, color: '#ff6600', fontWeight: '600' },
})
