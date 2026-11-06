import { useState, useRef, useEffect } from 'react'
import {
  View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { apiFetch } from '../../lib/api'
import { useAuth } from '../../lib/auth'

interface Message { role: 'user' | 'assistant'; content: string }

const ANON_LIMIT = 3
const ANON_KEY = 'mm_anon_queries'

// ── Markdown renderer para React Native ───────────────────────────────────────
function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split('\n')
  return lines.map((line, li) => {
    const parts: React.ReactNode[] = []
    const regex = /\*\*(.+?)\*\*|\*(.+?)\*/g
    let lastIndex = 0
    let match
    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIndex)
        parts.push(<Text key={`t-${li}-${lastIndex}`}>{line.slice(lastIndex, match.index)}</Text>)
      if (match[1] !== undefined)
        parts.push(<Text key={`b-${li}-${match.index}`} style={{ fontWeight: '700', color: '#ffffff' }}>{match[1]}</Text>)
      else if (match[2] !== undefined)
        parts.push(<Text key={`i-${li}-${match.index}`} style={{ fontStyle: 'italic' }}>{match[2]}</Text>)
      lastIndex = match.index + match[0].length
    }
    if (lastIndex < line.length)
      parts.push(<Text key={`t-${li}-end`}>{line.slice(lastIndex)}</Text>)
    return (
      <Text key={li}>
        {parts.length > 0 ? parts : line}
        {li < lines.length - 1 ? '\n' : ''}
      </Text>
    )
  })
}

export default function MechanicScreen() {
  const { user } = useAuth()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Olá! Sou o Mecânico Virtual do MotorMacete. Descreva o problema ou sintoma do seu veículo e vou ajudar com um diagnóstico.' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [usedChats, setUsedChats] = useState(0)
  const [anonUsed, setAnonUsed] = useState(0)
  const scrollRef = useRef<ScrollView>(null)

  const isAnonymous = !user
  const isPro = !isAnonymous && (user?.isAdmin || user?.plan === 'DRIVER_PRO' || user?.plan === 'MECHANIC_PRO' || user?.isTrialing)
  const LIMIT = 5

  const blocked = isAnonymous
    ? anonUsed >= ANON_LIMIT
    : !isPro && usedChats >= LIMIT

  // Carrega contador: anônimo via SecureStore, logado via API
  useEffect(() => {
    if (isAnonymous) {
      SecureStore.getItemAsync(ANON_KEY)
        .then(val => setAnonUsed(parseInt(val ?? '0', 10)))
        .catch(() => {})
    } else if (!isPro) {
      apiFetch('/api/mecanico').then(r => r.json()).then(d => {
        if (d.used != null) setUsedChats(d.used)
      }).catch(() => {})
    }
  }, [isAnonymous, isPro])

  async function send() {
    const text = input.trim()
    if (!text || loading || blocked) return
    setInput('')
    const newMessages: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setLoading(true)
    try {
      const res = await apiFetch('/api/mecanico', {
        method: 'POST',
        body: JSON.stringify({ messages: newMessages }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        if (err.code === 'PLAN_LIMIT') {
          setUsedChats(LIMIT)
          setMessages([...newMessages, { role: 'assistant', content: '🔒 Você atingiu o limite de 5 consultas mensais do plano Grátis.' }])
        } else {
          setMessages([...newMessages, { role: 'assistant', content: err.error ?? 'Erro ao processar.' }])
        }
        return
      }

      const content = await res.text()
      setMessages([...newMessages, { role: 'assistant', content: content || 'Sem resposta.' }])

      // Incrementa contador
      if (isAnonymous) {
        const newCount = anonUsed + 1
        setAnonUsed(newCount)
        await SecureStore.setItemAsync(ANON_KEY, String(newCount))
      } else if (!isPro) {
        setUsedChats(u => u + 1)
      }
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Erro de conexão. Tente novamente.' }])
    } finally {
      setLoading(false)
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100)
    }
  }

  return (
    <KeyboardAvoidingView style={s.container} behavior="padding" keyboardVerticalOffset={Platform.OS === 'android' ? 120 : 0}>
      {/* Contador de uso */}
      {isAnonymous && anonUsed > 0 && !blocked && (
        <View style={s.usageBar}>
          <Text style={s.usageText}>{ANON_LIMIT - anonUsed} consulta{ANON_LIMIT - anonUsed !== 1 ? 's' : ''} gratuita{ANON_LIMIT - anonUsed !== 1 ? 's' : ''} restante{ANON_LIMIT - anonUsed !== 1 ? 's' : ''}</Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register' as any)} style={s.upgradeBtn}>
            <Text style={s.upgradeBtnText}>Criar conta grátis</Text>
          </TouchableOpacity>
        </View>
      )}
      {!isAnonymous && !isPro && (
        <View style={s.usageBar}>
          <Text style={s.usageText}>{usedChats}/{LIMIT} consultas este mês</Text>
          {blocked
            ? <TouchableOpacity onPress={() => router.push('/(app)/plans' as any)} style={s.upgradeBtn}>
                <Text style={s.upgradeBtnText}>⭐ Assinar Pro</Text>
              </TouchableOpacity>
            : <Text style={[s.usageText, { color: usedChats >= 4 ? '#f59e0b' : '#444' }]}>
                {LIMIT - usedChats} restante{LIMIT - usedChats !== 1 ? 's' : ''}
              </Text>
          }
        </View>
      )}

      <ScrollView
        ref={scrollRef}
        style={s.messages}
        contentContainerStyle={s.messagesContent}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg, i) => (
          <View key={i} style={[s.bubble, msg.role === 'user' ? s.userBubble : s.aiBubble]}>
            {msg.role === 'assistant' && (
              <View style={s.roleLabelRow}>
                <Ionicons name="hardware-chip-outline" size={12} color="#ff6600" />
                <Text style={s.roleLabel}>Mecânico Virtual</Text>
              </View>
            )}
            <Text style={[s.bubbleText, msg.role === 'user' && s.userText]}>
              {msg.role === 'assistant' ? renderMarkdown(msg.content) : msg.content}
            </Text>
          </View>
        ))}
        {loading && (
          <View style={s.aiBubble}>
            <View style={s.roleLabelRow}>
              <Ionicons name="hardware-chip-outline" size={12} color="#ff6600" />
              <Text style={s.roleLabel}>Mecânico Virtual</Text>
            </View>
            <ActivityIndicator color="#ff6600" size="small" style={{ marginTop: 4 }} />
          </View>
        )}
      </ScrollView>

      {blocked ? (
        isAnonymous ? (
          <View style={s.blockedBanner}>
            <Text style={s.blockedTitle}>🔧 Você usou suas {ANON_LIMIT} consultas gratuitas!</Text>
            <Text style={s.blockedDesc}>Crie sua conta grátis e ganhe 5 consultas por mês — sem cartão de crédito.</Text>
            <View style={s.blockedButtons}>
              <TouchableOpacity style={s.blockedBtnPrimary} onPress={() => router.push('/(auth)/register' as any)}>
                <Text style={s.blockedBtnPrimaryText}>Criar conta grátis</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.blockedBtnSecondary} onPress={() => router.push('/(auth)/login' as any)}>
                <Text style={s.blockedBtnSecondaryText}>Já tenho conta</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity style={s.blockedBanner} onPress={() => router.push('/(app)/plans' as any)} activeOpacity={0.85}>
            <Text style={s.blockedTitle}>🔒 Limite atingido — Plano Grátis</Text>
            <Text style={s.blockedDesc}>Assine o Motorista Pro para consultas ilimitadas →</Text>
          </TouchableOpacity>
        )
      ) : (
        <View style={s.inputRow}>
          <TextInput
            style={s.input}
            placeholder="Descreva o problema..."
            placeholderTextColor="#444"
            value={input}
            onChangeText={setInput}
            multiline
            maxLength={500}
          />
          <TouchableOpacity style={[s.sendBtn, !input.trim() && s.sendBtnDisabled]} onPress={send} disabled={!input.trim() || loading}>
            <Ionicons name="send" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0e0e0f' },
  messages: { flex: 1 },
  messagesContent: { padding: 16, gap: 12, paddingBottom: 8 },
  bubble: { borderRadius: 12, padding: 14, maxWidth: '90%' },
  aiBubble: { backgroundColor: '#141416', borderWidth: 1, borderColor: '#2a2a2e', alignSelf: 'flex-start', width: '90%' },
  userBubble: { backgroundColor: 'rgba(255,102,0,0.15)', borderWidth: 1, borderColor: 'rgba(255,102,0,0.3)', alignSelf: 'flex-end' },
  roleLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 6 },
  roleLabel: { fontSize: 11, color: '#ff6600', fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  bubbleText: { fontSize: 14, color: '#ffffff', lineHeight: 22 },
  userText: { color: '#f0ede8' },
  inputRow: { flexDirection: 'row', padding: 12, borderTopWidth: 1, borderTopColor: '#1a1a1c', gap: 10, alignItems: 'flex-end' },
  input: { flex: 1, backgroundColor: '#141416', borderRadius: 10, borderWidth: 1, borderColor: '#2a2a2e', padding: 12, color: '#f0ede8', fontSize: 14, maxHeight: 100 },
  sendBtn: { backgroundColor: '#ff6600', borderRadius: 10, width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  sendBtnDisabled: { backgroundColor: '#2a2a2e' },
  usageBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#1a1a1c' },
  usageText: { fontSize: 12, color: '#555' },
  upgradeBtn: { backgroundColor: 'rgba(255,102,0,0.15)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: 'rgba(255,102,0,0.3)' },
  upgradeBtnText: { fontSize: 11, fontWeight: '700', color: '#ff6600' },
  blockedBanner: { margin: 16, padding: 20, borderRadius: 14, backgroundColor: 'rgba(255,102,0,0.08)', borderWidth: 1, borderColor: 'rgba(255,102,0,0.3)', alignItems: 'center' },
  blockedTitle: { fontSize: 15, fontWeight: '700', color: '#ff6600', marginBottom: 6, textAlign: 'center' },
  blockedDesc: { fontSize: 13, color: '#888', textAlign: 'center', marginBottom: 16, lineHeight: 20 },
  blockedButtons: { flexDirection: 'row', gap: 10 },
  blockedBtnPrimary: { backgroundColor: '#ff6600', borderRadius: 10, paddingHorizontal: 16, paddingVertical: 10 },
  blockedBtnPrimaryText: { fontSize: 13, fontWeight: '700', color: '#fff' },
  blockedBtnSecondary: { borderWidth: 1, borderColor: '#3a3a42', borderRadius: 10, paddingHorizontal: 16, paddingVertical: 10 },
  blockedBtnSecondaryText: { fontSize: 13, fontWeight: '700', color: '#888' },
})
