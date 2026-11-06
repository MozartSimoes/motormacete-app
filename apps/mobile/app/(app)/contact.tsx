import { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, Modal, ActivityIndicator,
} from 'react-native'
import { useRouter } from 'expo-router'
import { apiFetch } from '../../lib/api'
import WhatsAppFloat from '../../components/WhatsAppFloat'

const MAX = 500

export default function ContactScreen() {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function handleSend() {
    if (!message.trim()) return
    setSending(true)
    setError('')
    try {
      const res = await apiFetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message.trim() }),
      })
      const data = await res.json()
      if (data.success) {
        setDone(true)
      } else {
        setError(data.error ?? 'Erro ao enviar.')
      }
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setSending(false)
    }
  }

  function handleClose() {
    setDone(false)
    setMessage('')
    router.replace('/(app)/' as any)
  }

  return (
    <KeyboardAvoidingView style={s.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
        <Text style={s.title}>Como podemos ajudar?</Text>
        <Text style={s.sub}>Escreva sua mensagem e entraremos em contato em breve.</Text>

        <View style={s.inputWrap}>
          <TextInput
            style={s.input}
            placeholder="Digite sua mensagem aqui..."
            placeholderTextColor="#444"
            multiline
            maxLength={MAX}
            value={message}
            onChangeText={setMessage}
            textAlignVertical="top"
          />
          <Text style={s.counter}>{message.length}/{MAX}</Text>
        </View>

        {error ? <Text style={s.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={[s.btn, (!message.trim() || sending) && s.btnDisabled]}
          onPress={handleSend}
          disabled={!message.trim() || sending}
          activeOpacity={0.85}
        >
          {sending
            ? <ActivityIndicator color="#fff" size="small" />
            : <Text style={s.btnText}>Enviar</Text>
          }
        </TouchableOpacity>
      </ScrollView>

      {/* Success modal */}
      <Modal visible={done} transparent animationType="fade">
        <View style={s.overlay}>
          <View style={s.modal}>
            <Text style={s.modalIcon}>✅</Text>
            <Text style={s.modalTitle}>Obrigado por nos contactar!</Text>
            <Text style={s.modalSub}>Retornaremos logo!</Text>
            <TouchableOpacity style={s.modalBtn} onPress={handleClose} activeOpacity={0.85}>
              <Text style={s.modalBtnText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <WhatsAppFloat isAuth />
    </KeyboardAvoidingView>
  )
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0e0e0f' },
  content: { padding: 20, paddingBottom: 48 },
  title: { fontSize: 22, fontWeight: '800', color: '#f0ede8', marginBottom: 8 },
  sub: { fontSize: 13, color: '#666', marginBottom: 24, lineHeight: 20 },
  inputWrap: {
    backgroundColor: '#141416', borderRadius: 14,
    borderWidth: 1, borderColor: '#2a2a2e',
    padding: 14, marginBottom: 8,
  },
  input: {
    color: '#f0ede8', fontSize: 15, lineHeight: 22,
    minHeight: 160, textAlignVertical: 'top',
  },
  counter: { fontSize: 11, color: '#444', textAlign: 'right', marginTop: 8 },
  errorText: { color: '#e03030', fontSize: 13, marginBottom: 12 },
  btn: {
    backgroundColor: '#ff6600', borderRadius: 12,
    paddingVertical: 15, alignItems: 'center', marginTop: 8,
  },
  btnDisabled: { backgroundColor: '#2a2a2e' },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center', justifyContent: 'center', padding: 32 },
  modal: {
    backgroundColor: '#141416', borderRadius: 20,
    borderWidth: 1, borderColor: '#2a2a2e',
    padding: 32, alignItems: 'center', width: '100%',
  },
  modalIcon: { fontSize: 48, marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: '800', color: '#f0ede8', textAlign: 'center', marginBottom: 8 },
  modalSub: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 28 },
  modalBtn: {
    backgroundColor: '#ff6600', borderRadius: 12,
    paddingVertical: 13, paddingHorizontal: 40,
  },
  modalBtnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
})
