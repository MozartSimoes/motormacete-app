'use client'

import { useState, useEffect } from 'react'

function WhatsAppIcon({ size = 24, color = '#fff' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12.001 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2 22l5.112-1.327A9.958 9.958 0 0012.001 22C17.524 22 22 17.523 22 12S17.524 2 12.001 2zm0 1.5c4.687 0 8.5 3.813 8.5 8.5s-3.813 8.5-8.5 8.5a8.46 8.46 0 01-4.4-1.228l-.314-.189-3.254.845.868-3.17-.207-.328A8.458 8.458 0 013.5 12c0-4.687 3.814-8.5 8.501-8.5zm-2.968 4.5c-.175 0-.46.066-.701.328-.242.263-.924.904-.924 2.203s.945 2.555 1.076 2.731c.132.176 1.843 2.94 4.535 4.007.634.274 1.129.438 1.514.561.636.203 1.215.174 1.673.105.51-.076 1.572-.643 1.793-1.264.22-.62.22-1.153.154-1.264-.065-.11-.24-.176-.505-.307-.264-.132-1.57-.774-1.813-.863-.242-.088-.418-.132-.594.132-.175.263-.681.863-.835 1.04-.153.174-.308.197-.572.065-.264-.131-1.113-.41-2.121-1.31-.784-.7-1.313-1.563-1.467-1.826-.153-.264-.017-.407.115-.538.118-.118.264-.308.396-.462.132-.154.176-.263.264-.44.087-.176.044-.329-.022-.462-.066-.132-.594-1.43-.813-1.958-.214-.513-.432-.443-.594-.451l-.506-.009z" />
    </svg>
  )
}

const WA_NUMBER = '5521979281511'

const RATINGS = [
  { emoji: '😊', label: 'Satisfeito',   value: 'satisfeito' },
  { emoji: '😐', label: 'Neutro',       value: 'neutro' },
  { emoji: '😞', label: 'Insatisfeito', value: 'insatisfeito' },
]

interface SessionUser { name: string; type: 'DRIVER' | 'MECHANIC' }

export default function WhatsAppFloat() {
  const [user, setUser] = useState<SessionUser | null>(null)
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState<number | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((d) => { if (d.user) setUser(d.user as SessionUser) })
      .catch(() => {})
  }, [])

  function buildMessage() {
    const name = user?.name ?? 'Visitante'
    const type = user?.type === 'MECHANIC' ? 'Mecânico' : 'Motorista'
    const r = rating !== null ? RATINGS[rating] : null
    const ratingLine = r ? `Avaliação: ${r.emoji} ${r.label}` : ''
    const msgLine = message.trim() ? `\n\n${message.trim()}` : ''
    return `Olá! Sou ${name} (${type}). ${ratingLine}${msgLine}\n\nEnviado pelo MotorMacete`
  }

  function openWhatsApp() {
    const text = encodeURIComponent(buildMessage())
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank')
    setOpen(false)
    setRating(null)
    setMessage('')
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-[#25d366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Falar com suporte"
      >
        <WhatsAppIcon size={30} color="#fff" />
      </button>

      {/* Backdrop + popup */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-start p-4 bg-black/60"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-[#28282e] border border-[#3a3a42] rounded-2xl w-full max-w-sm p-5 mb-16"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-[#25d366]/15 border border-[#25d366]/30 flex items-center justify-center">
                <WhatsAppIcon size={20} color="#25d366" />
              </div>
              <div className="flex-1">
                <p className="text-[#f0ede8] font-bold text-sm">Falar com suporte</p>
                <p className="text-[#555] text-xs mt-0.5">Abre direto no WhatsApp</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-[#555] hover:text-[#aaa] transition-colors">
                ✕
              </button>
            </div>

            {/* Rating */}
            <p className="text-[#aaa] text-xs mb-3">Como está sendo sua experiência?</p>
            <div className="flex gap-2 mb-4">
              {RATINGS.map((r, i) => (
                <button
                  key={r.value}
                  onClick={() => setRating(i)}
                  className={`flex-1 flex flex-col items-center py-3 rounded-xl border transition-colors ${
                    rating === i
                      ? 'border-[#25d366]/50 bg-[#25d366]/10'
                      : 'border-[#3a3a42] bg-[#30303a] hover:border-[#3a3a3e]'
                  }`}
                >
                  <span className="text-2xl mb-1">{r.emoji}</span>
                  <span className={`text-[10px] font-semibold ${rating === i ? 'text-[#25d366]' : 'text-[#555]'}`}>
                    {r.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Message */}
            <textarea
              className="w-full bg-[#30303a] border border-[#3a3a42] rounded-xl p-3 text-[#f0ede8] text-sm placeholder-[#444] resize-none focus:outline-none focus:border-[#3a3a3e] mb-4"
              placeholder="Mensagem (opcional)"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {/* Send */}
            <button
              onClick={openWhatsApp}
              className="w-full bg-[#25d366] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#20bf5c] transition-colors"
            >
              <WhatsAppIcon size={18} color="#fff" />
              Abrir WhatsApp
            </button>
          </div>
        </div>
      )}
    </>
  )
}
