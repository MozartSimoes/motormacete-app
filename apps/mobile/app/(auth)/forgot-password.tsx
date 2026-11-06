import { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { apiFetch } from '../../lib/api'

type Step = 'email' | 'code'

export default function ForgotPasswordScreen() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSendCode() {
    if (!email.trim()) { setError('Informe seu e-mail.'); return }
    setLoading(true)
    setError('')
    try {
      await apiFetch('/api/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      })
      setStep('code')
    } catch {
      setError('Erro de conexão. Verifique sua internet.')
    } finally {
      setLoading(false)
    }
  }

  async function handleReset() {
    if (!code.trim() || !newPassword.trim()) { setError('Preencha todos os campos.'); return }
    if (newPassword.length < 6) { setError('A senha deve ter pelo menos 6 caracteres.'); return }
    if (newPassword !== confirmPassword) { setError('As senhas não conferem.'); return }
    setLoading(true)
    setError('')
    try {
      const res = await apiFetch('/api/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim().toLowerCase(), code: code.trim(), newPassword }),
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
      } else {
        setError(data.error ?? 'Erro ao redefinir senha.')
      }
    } catch {
      setError('Erro de conexão. Verifique sua internet.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.successContainer}>
          <View style={s.successIcon}>
            <Ionicons name="checkmark-circle" size={64} color="#ff6600" />
          </View>
          <Text style={s.successTitle}>Senha redefinida!</Text>
          <Text style={s.successDesc}>Sua senha foi atualizada com sucesso. Faça login com sua nova senha.</Text>
          <TouchableOpacity style={s.btn} onPress={() => router.replace('/(auth)/login')}>
            <Text style={s.btnText}>Ir para o login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
          <TouchableOpacity style={s.back} onPress={() => router.back()}>
            <Text style={s.backText}>← Voltar</Text>
          </TouchableOpacity>

          <Text style={s.logo}>Motor<Text style={s.accent}>Macete</Text></Text>
          <Text style={s.title}>Esqueci a senha</Text>

          {step === 'email' ? (
            <>
              <Text style={s.desc}>
                Informe o e-mail da sua conta. Enviaremos um código de 4 dígitos para você criar uma nova senha.
              </Text>

              {error ? <View style={s.errorBox}><Text style={s.errorText}>{error}</Text></View> : null}

              <Text style={s.label}>E-mail</Text>
              <TextInput
                style={s.input}
                placeholder="seu@email.com"
                placeholderTextColor="#444"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                onSubmitEditing={handleSendCode}
              />

              <TouchableOpacity style={s.btn} onPress={handleSendCode} disabled={loading}>
                {loading
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={s.btnText}>Enviar código</Text>}
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={s.desc}>
                Enviamos um código de 4 dígitos para <Text style={s.emailHighlight}>{email}</Text>. Insira o código e crie sua nova senha.
              </Text>

              {error ? <View style={s.errorBox}><Text style={s.errorText}>{error}</Text></View> : null}

              <Text style={s.label}>Código de verificação</Text>
              <TextInput
                style={[s.input, s.codeInput]}
                placeholder="0000"
                placeholderTextColor="#444"
                keyboardType="number-pad"
                value={code}
                onChangeText={setCode}
                maxLength={4}
              />

              <Text style={s.label}>Nova senha</Text>
              <TextInput
                style={s.input}
                placeholder="Mínimo 6 caracteres"
                placeholderTextColor="#444"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />

              <Text style={s.label}>Confirmar nova senha</Text>
              <TextInput
                style={s.input}
                placeholder="Repita a senha"
                placeholderTextColor="#444"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onSubmitEditing={handleReset}
              />

              <TouchableOpacity style={s.btn} onPress={handleReset} disabled={loading}>
                {loading
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={s.btnText}>Redefinir senha</Text>}
              </TouchableOpacity>

              <TouchableOpacity style={s.resendRow} onPress={() => { setStep('email'); setError(''); setCode('') }}>
                <Text style={s.resendText}>Não recebeu o código? <Text style={s.resendAccent}>Reenviar</Text></Text>
              </TouchableOpacity>
            </>
          )}
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
  title: { fontSize: 22, fontWeight: '700', color: '#f0ede8', marginBottom: 12 },
  desc: { fontSize: 14, color: '#666', lineHeight: 22, marginBottom: 8 },
  emailHighlight: { color: '#f0ede8', fontWeight: '600' },
  errorBox: { backgroundColor: 'rgba(224,48,48,0.12)', borderRadius: 8, padding: 12, marginBottom: 16, marginTop: 8, borderWidth: 1, borderColor: '#e03030' },
  errorText: { color: '#e03030', fontSize: 13 },
  label: { fontSize: 11, fontWeight: '700', color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: '#141416', borderRadius: 10, borderWidth: 1, borderColor: '#2a2a2e', padding: 14, color: '#f0ede8', fontSize: 15 },
  codeInput: { fontSize: 24, fontWeight: '700', letterSpacing: 8, textAlign: 'center' },
  btn: { marginTop: 28, backgroundColor: '#ff6600', borderRadius: 10, padding: 16, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  resendRow: { marginTop: 20, alignItems: 'center' },
  resendText: { color: '#666', fontSize: 14 },
  resendAccent: { color: '#ff6600', fontWeight: '600' },
  successContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  successIcon: { marginBottom: 24 },
  successTitle: { fontSize: 24, fontWeight: '900', color: '#f0ede8', marginBottom: 12 },
  successDesc: { fontSize: 14, color: '#666', textAlign: 'center', lineHeight: 22, marginBottom: 32 },
})
