import { useState } from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet, Modal,
  TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Linking,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '../lib/auth'


const WA_NUMBER = '5521979281511'

const RATINGS = [
  { emoji: '😊', label: 'Satisfeito',    value: 'satisfeito' },
  { emoji: '😐', label: 'Neutro',        value: 'neutro' },
  { emoji: '😞', label: 'Insatisfeito',  value: 'insatisfeito' },
]

export default function WhatsAppFloat({ isAuth = false }: { isAuth?: boolean }) {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState<number | null>(null)
  const [message, setMessage] = useState('')

  function buildMessage() {
    const name = user?.name ?? 'Visitante'
    const type = user?.type === 'MECHANIC' ? 'Mecânico' : 'Motorista'
    const r = rating !== null ? RATINGS[rating] : null
    const ratingLine = r ? `Avaliação: ${r.emoji} ${r.label}` : ''
    const msgLine = message.trim() ? `\n\n${message.trim()}` : ''
    const source = isAuth ? 'App MotorMacete' : 'Tela Inicial MotorMacete'
    return `Olá! Sou ${name} (${type}). ${ratingLine}${msgLine}\n\nEnviado pelo ${source}`
  }

  async function openWhatsApp() {
    const text = encodeURIComponent(buildMessage())
    await Linking.openURL(`https://wa.me/${WA_NUMBER}?text=${text}`)
    setOpen(false)
    setRating(null)
    setMessage('')
  }

  return (
    <>
      <TouchableOpacity style={s.fab} onPress={() => setOpen(true)} activeOpacity={0.85}>
        <Ionicons name="logo-whatsapp" size={30} color="#fff" />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View style={s.overlay}>
            <TouchableWithoutFeedback>
              <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <View style={s.sheet}>
                  <View style={s.header}>
                    <View style={s.waIcon}><Ionicons name="logo-whatsapp" size={22} color="#25d366" /></View>
                    <View style={{ flex: 1 }}>
                      <Text style={s.title}>Falar com suporte</Text>
                      <Text style={s.subtitle}>Abre direto no WhatsApp</Text>
                    </View>
                    <TouchableOpacity onPress={() => setOpen(false)}>
                      <Ionicons name="close" size={20} color="#555" />
                    </TouchableOpacity>
                  </View>

                  <Text style={s.ratingLabel}>Como está sendo sua experiência?</Text>
                  <View style={s.ratingRow}>
                    {RATINGS.map((r, i) => (
                      <TouchableOpacity
                        key={r.value}
                        style={[s.ratingBtn, rating === i && s.ratingBtnActive]}
                        onPress={() => setRating(i)}
                        activeOpacity={0.8}
                      >
                        <Text style={s.ratingEmoji}>{r.emoji}</Text>
                        <Text style={[s.ratingText, rating === i && s.ratingTextActive]}>{r.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <TextInput
                    style={s.input}
                    placeholder="Mensagem (opcional)"
                    placeholderTextColor="#444"
                    multiline
                    numberOfLines={3}
                    value={message}
                    onChangeText={setMessage}
                  />

                  <TouchableOpacity style={s.sendBtn} onPress={openWhatsApp} activeOpacity={0.85}>
                    <Ionicons name="logo-whatsapp" size={20} color="#fff" />
                    <Text style={s.sendText}>Abrir WhatsApp</Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}

const s = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 28,
    left: 24,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#25d366',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 8,
    zIndex: 999,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#141416',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
    borderTopWidth: 1,
    borderColor: '#2a2a2e',
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  waIcon: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: 'rgba(37,211,102,0.15)',
    borderWidth: 1, borderColor: 'rgba(37,211,102,0.3)',
    alignItems: 'center', justifyContent: 'center',
  },
  title: { fontSize: 16, fontWeight: '700', color: '#f0ede8' },
  subtitle: { fontSize: 12, color: '#555', marginTop: 2 },
  ratingLabel: { fontSize: 13, color: '#aaa', marginBottom: 12 },
  ratingRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  ratingBtn: {
    flex: 1, alignItems: 'center', paddingVertical: 12,
    borderRadius: 12, borderWidth: 1, borderColor: '#2a2a2e',
    backgroundColor: '#1a1a1c',
  },
  ratingBtnActive: { borderColor: '#25d36650', backgroundColor: 'rgba(37,211,102,0.1)' },
  ratingEmoji: { fontSize: 24, marginBottom: 4 },
  ratingText: { fontSize: 11, color: '#9a9a9a', fontWeight: '600' },
  ratingTextActive: { color: '#25d366' },
  input: {
    backgroundColor: '#1a1a1c',
    borderWidth: 1, borderColor: '#2a2a2e',
    borderRadius: 10, padding: 12,
    color: '#f0ede8', fontSize: 14,
    textAlignVertical: 'top',
    minHeight: 72,
    marginBottom: 16,
  },
  sendBtn: {
    backgroundColor: '#25d366',
    borderRadius: 12, paddingVertical: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  sendIcon: { fontSize: 18 },
  sendText: { fontSize: 15, fontWeight: '800', color: '#fff' },
})
