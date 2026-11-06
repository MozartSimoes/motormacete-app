import { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { useAuth } from '../../lib/auth'
import { apiVerifyOtp } from '../../lib/api'

export default function VerifyScreen() {
  const router = useRouter()
  const { email } = useLocalSearchParams<{ email: string }>()
  const { signIn } = useAuth()
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleVerify() {
    if (!code || code.length < 4) { setError('Digite o código recebido no e-mail.'); return }
    setLoading(true)
    setError('')
    try {
      const res = await apiVerifyOtp({ email, code: code.trim(), keepSignedIn: true })
      if (res.success && res.token && res.user) {
        await signIn(res.token, { plan: 'FREE', isAdmin: false, isTrialing: false, trialDaysLeft: 0, trialEndsAt: null, ...res.user })
        router.replace('/(app)')
      } else {
        setError(res.error ?? 'Código inválido ou expirado.')
      }
    } catch {
      setError('Erro de conexão. Verifique sua internet.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
          <TouchableOpacity style={s.back} onPress={() => router.back()}>
            <Text style={s.backText}>← Voltar</Text>
          </TouchableOpacity>

          <Text style={s.logo}>Motor<Text style={s.accent}>Macete</Text></Text>
          <Text style={s.title}>Verificar e-mail</Text>

          <View style={s.infoBox}>
            <Text style={s.infoText}>
              Enviamos um código de verificação para{'\n'}
              <Text style={s.infoEmail}>{email}</Text>
            </Text>
          </View>

          {error ? <View style={s.errorBox}><Text style={s.errorText}>{error}</Text></View> : null}

          <Text style={s.label}>Código de verificação</Text>
          <TextInput
            style={[s.input, s.codeInput]}
            placeholder="0000"
            placeholderTextColor="#444"
            keyboardType="number-pad"
            maxLength={4}
            textAlign="center"
            value={code}
            onChangeText={setCode}
            onSubmitEditing={handleVerify}
          />

          <TouchableOpacity style={s.btn} onPress={handleVerify} disabled={loading}>
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={s.btnText}>Verificar e entrar</Text>}
          </TouchableOpacity>

          <Text style={s.hint}>Não recebeu? Verifique sua caixa de spam.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0e0e0f' },
  scroll: { padding: 24, paddingBottom: 48 },
  back: { marginBottom: 32 },
  backText: { color: '#666', fontSize: 14 },
  logo: { fontSize: 28, fontWeight: '900', color: '#f0ede8', marginBottom: 4 },
  accent: { color: '#ff6600' },
  title: { fontSize: 22, fontWeight: '700', color: '#f0ede8', marginBottom: 20 },
  infoBox: { backgroundColor: '#141416', borderRadius: 10, borderWidth: 1, borderColor: '#2a2a2e', padding: 16, marginBottom: 20 },
  infoText: { color: '#777', fontSize: 14, lineHeight: 22, textAlign: 'center' },
  infoEmail: { color: '#f0ede8', fontWeight: '600' },
  errorBox: { backgroundColor: 'rgba(224,48,48,0.12)', borderRadius: 8, padding: 12, marginBottom: 16, borderWidth: 1, borderColor: '#e03030' },
  errorText: { color: '#e03030', fontSize: 13 },
  label: { fontSize: 11, fontWeight: '700', color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10, marginTop: 8 },
  input: { backgroundColor: '#141416', borderRadius: 10, borderWidth: 1, borderColor: '#2a2a2e', padding: 14, color: '#f0ede8', fontSize: 15 },
  codeInput: { fontSize: 28, fontWeight: '700', letterSpacing: 8, paddingVertical: 20 },
  btn: { marginTop: 28, backgroundColor: '#ff6600', borderRadius: 10, padding: 16, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  hint: { marginTop: 16, textAlign: 'center', color: '#555', fontSize: 13 },
})
