'use client'

import { useState } from 'react'

export default function ExcluirContaPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const res = await fetch('/api/auth/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    if (res.ok) {
      setStatus('success')
    } else {
      setStatus('error')
      setErrorMsg(data.error ?? 'Erro ao excluir conta.')
    }
  }

  return (
    <main style={{ maxWidth: 540, margin: '60px auto', padding: '0 24px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Excluir conta — MotorMacete</h1>

      <p style={{ color: '#555', marginBottom: 24, lineHeight: 1.6 }}>
        Ao excluir sua conta, todos os seus dados serão permanentemente removidos, incluindo:
      </p>
      <ul style={{ color: '#555', marginBottom: 24, lineHeight: 2, paddingLeft: 20 }}>
        <li>Dados de perfil (nome e e-mail)</li>
        <li>Veículos cadastrados e histórico de manutenção</li>
        <li>Ordens de serviço (se mecânico)</li>
        <li>Histórico de conversas com o Mecânico Virtual</li>
      </ul>
      <p style={{ color: '#555', marginBottom: 32, lineHeight: 1.6 }}>
        Essa ação é <strong>irreversível</strong>. Confirme sua identidade abaixo para prosseguir.
      </p>

      {status === 'success' ? (
        <div style={{ background: '#d4edda', border: '1px solid #c3e6cb', borderRadius: 8, padding: 20, color: '#155724' }}>
          <strong>Conta excluída com sucesso.</strong>
          <p style={{ margin: '8px 0 0' }}>Todos os seus dados foram removidos permanentemente.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #ccc', borderRadius: 6, fontSize: 16, boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #ccc', borderRadius: 6, fontSize: 16, boxSizing: 'border-box' }}
            />
          </div>

          {status === 'error' && (
            <p style={{ color: '#721c24', background: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: 6, padding: '10px 14px', marginBottom: 16 }}>
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            style={{ width: '100%', padding: '12px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: 6, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}
          >
            {status === 'loading' ? 'Excluindo...' : 'Excluir minha conta permanentemente'}
          </button>
        </form>
      )}

      <p style={{ marginTop: 32, color: '#888', fontSize: 14 }}>
        Dúvidas? Entre em contato: <a href="mailto:suporte@motormacete.com.br">suporte@motormacete.com.br</a>
      </p>
    </main>
  )
}
