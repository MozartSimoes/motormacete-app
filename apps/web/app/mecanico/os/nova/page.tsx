'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'

type ItemType = 'LABOR' | 'PART' | 'OTHER'
interface Item { type: ItemType; description: string; quantity: string; unitPrice: string }

const emptyItem = (): Item => ({ type: 'LABOR', description: '', quantity: '1', unitPrice: '' })

const FUELS = ['Gasolina', 'Etanol', 'Flex', 'Diesel', 'GNV', 'Elétrico', 'Híbrido']

const fieldSt = { background: '#18181b', border: '1px solid #333338', color: '#f0ede8', fontFamily: 'var(--font-barlow)' }
const labelSt = { color: '#aaa', fontFamily: 'var(--font-barlow-condensed)' }
const cls = 'w-full px-4 py-3 rounded-xl text-[14px] outline-none transition-colors'

export default function NovaOSPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    clientName: '', clientPhone: '', clientEmail: '',
    plate: '', vehicleBrand: '', vehicleModel: '', vehicleYear: '', vehicleKm: '', vehicleFuel: '',
    status: 'OPEN', diagnosis: '', notes: '',
  })
  const [items, setItems] = useState<Item[]>([emptyItem()])
  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState('')

  const set = (f: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [f]: e.target.value }))

  function updateItem(idx: number, field: keyof Item, val: string) {
    setItems((p) => p.map((it, i) => i === idx ? { ...it, [field]: val } : it))
  }
  function addItem()         { setItems((p) => [...p, emptyItem()]) }
  function removeItem(i: number) { setItems((p) => p.filter((_, j) => j !== i)) }

  const lineTotal = (it: Item) => (parseFloat(it.quantity) || 0) * (parseFloat(it.unitPrice) || 0)
  const total = items.reduce((s, it) => s + lineTotal(it), 0)
  const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  async function handleSave() {
    if (!form.clientName.trim() || !form.vehicleBrand.trim() || !form.vehicleModel.trim()) {
      return setError('Nome do cliente, marca e modelo são obrigatórios.')
    }
    setSaving(true); setError('')
    const res = await fetch('/api/mecanico/os', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        items: items.filter((it) => it.description.trim()),
      }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error ?? 'Erro ao salvar.'); setSaving(false); return }
    router.push(`/mecanico/os/${data.order.id}`)
  }

  return (
    <div className="min-h-screen" style={{ background: '#1c1c22' }}>
      <Header />
      <div className="max-w-[860px] mx-auto px-4 py-10">

        {/* Title */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-[12px] font-bold tracking-[3px] uppercase mb-1"
              style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>Nova OS</p>
            <h1 className="text-[40px] leading-none"
              style={{ color: '#f0ede8', fontFamily: 'var(--font-bebas-neue)' }}>
              Registrar Ordem de Serviço
            </h1>
          </div>
          <button onClick={() => router.back()}
            className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center text-[16px] hover:bg-white/5"
            style={{ border: '1px solid #3a3a42', color: '#555' }}>✕</button>
        </div>

        <div className="flex flex-col gap-6">

          {/* Client */}
          <section className="rounded-2xl p-6" style={{ background: '#222228', border: '1px solid #2a2a32' }}>
            <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-4"
              style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
              👤 Dados do Cliente
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="sm:col-span-3">
                <p className="text-[12px] font-bold tracking-[1.5px] uppercase mb-2" style={labelSt}>Nome *</p>
                <input className={cls} style={fieldSt} placeholder="João da Silva" value={form.clientName} onChange={set('clientName')} />
              </div>
              <div>
                <p className="text-[12px] font-bold tracking-[1.5px] uppercase mb-2" style={labelSt}>Telefone</p>
                <input className={cls} style={fieldSt} placeholder="(11) 99999-9999" value={form.clientPhone} onChange={set('clientPhone')} />
              </div>
              <div className="sm:col-span-2">
                <p className="text-[12px] font-bold tracking-[1.5px] uppercase mb-2" style={labelSt}>E-mail</p>
                <input className={cls} style={fieldSt} placeholder="joao@email.com" value={form.clientEmail} onChange={set('clientEmail')} />
              </div>
            </div>
          </section>

          {/* Vehicle */}
          <section className="rounded-2xl p-6" style={{ background: '#222228', border: '1px solid #2a2a32' }}>
            <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-4"
              style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
              🚗 Dados do Veículo
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <p className="text-[12px] font-bold tracking-[1.5px] uppercase mb-2" style={labelSt}>Placa</p>
                <input className={cls} style={fieldSt} placeholder="ABC1D23" value={form.plate} onChange={set('plate')} />
              </div>
              <div>
                <p className="text-[12px] font-bold tracking-[1.5px] uppercase mb-2" style={labelSt}>Marca *</p>
                <input className={cls} style={fieldSt} placeholder="Honda" value={form.vehicleBrand} onChange={set('vehicleBrand')} />
              </div>
              <div>
                <p className="text-[12px] font-bold tracking-[1.5px] uppercase mb-2" style={labelSt}>Modelo *</p>
                <input className={cls} style={fieldSt} placeholder="Civic LXS" value={form.vehicleModel} onChange={set('vehicleModel')} />
              </div>
              <div>
                <p className="text-[12px] font-bold tracking-[1.5px] uppercase mb-2" style={labelSt}>Ano</p>
                <input type="number" className={cls} style={fieldSt} placeholder="2020" value={form.vehicleYear} onChange={set('vehicleYear')} />
              </div>
              <div>
                <p className="text-[12px] font-bold tracking-[1.5px] uppercase mb-2" style={labelSt}>KM</p>
                <input type="number" className={cls} style={fieldSt} placeholder="87500" value={form.vehicleKm} onChange={set('vehicleKm')} />
              </div>
              <div>
                <p className="text-[12px] font-bold tracking-[1.5px] uppercase mb-2" style={labelSt}>Combustível</p>
                <div className="relative">
                  <select className={`${cls} appearance-none cursor-pointer`} style={fieldSt} value={form.vehicleFuel} onChange={set('vehicleFuel')}>
                    <option value="">Selecione</option>
                    {FUELS.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#555' }}>▾</span>
                </div>
              </div>
            </div>
          </section>

          {/* Diagnosis */}
          <section className="rounded-2xl p-6" style={{ background: '#222228', border: '1px solid #2a2a32' }}>
            <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-4"
              style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
              🔧 Diagnóstico e Observações
            </p>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-[12px] font-bold tracking-[1.5px] uppercase mb-2" style={labelSt}>Diagnóstico</p>
                <textarea className={cls} style={{ ...fieldSt, resize: 'none' }} rows={3}
                  placeholder="Descreva o problema relatado pelo cliente e o diagnóstico técnico..."
                  value={form.diagnosis} onChange={set('diagnosis')} />
              </div>
              <div>
                <p className="text-[12px] font-bold tracking-[1.5px] uppercase mb-2" style={labelSt}>Observações internas</p>
                <textarea className={cls} style={{ ...fieldSt, resize: 'none' }} rows={2}
                  placeholder="Observações para uso interno da oficina..."
                  value={form.notes} onChange={set('notes')} />
              </div>
            </div>
          </section>

          {/* Items */}
          <section className="rounded-2xl p-6" style={{ background: '#222228', border: '1px solid #2a2a32' }}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-[13px] font-bold tracking-[1.5px] uppercase"
                style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
                💰 Peças e Serviços
              </p>
              <button onClick={addItem}
                className="px-3 py-1.5 rounded-lg text-[12px] font-bold uppercase tracking-[0.5px] transition hover:opacity-80"
                style={{ background: 'rgba(255,102,0,0.12)', color: '#ff8533', border: '1px solid rgba(255,102,0,0.25)', fontFamily: 'var(--font-barlow-condensed)' }}>
                + Adicionar item
              </button>
            </div>

            {/* Column headers */}
            <div className="hidden sm:grid grid-cols-[110px_1fr_80px_110px_100px_36px] gap-2 mb-2">
              {['Tipo', 'Descrição', 'Qtd', 'Valor Unit.', 'Total', ''].map((h) => (
                <p key={h} className="text-[11px] font-bold uppercase tracking-[1px]"
                  style={{ color: '#555', fontFamily: 'var(--font-barlow-condensed)' }}>{h}</p>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {items.map((it, i) => (
                <div key={i} className="grid grid-cols-[110px_1fr_80px_110px_100px_36px] gap-2 items-center">
                  <div className="relative">
                    <select className="w-full px-2 py-2.5 rounded-lg text-[13px] outline-none appearance-none cursor-pointer"
                      style={fieldSt} value={it.type}
                      onChange={(e) => updateItem(i, 'type', e.target.value)}>
                      <option value="LABOR">Mão de obra</option>
                      <option value="PART">Peça</option>
                      <option value="OTHER">Outro</option>
                    </select>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[10px]" style={{ color: '#555' }}>▾</span>
                  </div>
                  <input className="w-full px-3 py-2.5 rounded-lg text-[13px] outline-none"
                    style={fieldSt} placeholder="Descrição"
                    value={it.description} onChange={(e) => updateItem(i, 'description', e.target.value)} />
                  <input type="number" className="w-full px-3 py-2.5 rounded-lg text-[13px] outline-none"
                    style={fieldSt} placeholder="1" min="0.01" step="0.01"
                    value={it.quantity} onChange={(e) => updateItem(i, 'quantity', e.target.value)} />
                  <input type="number" className="w-full px-3 py-2.5 rounded-lg text-[13px] outline-none"
                    style={fieldSt} placeholder="0,00" min="0" step="0.01"
                    value={it.unitPrice} onChange={(e) => updateItem(i, 'unitPrice', e.target.value)} />
                  <p className="text-[13px] font-bold px-1" style={{ color: '#f0ede8' }}>
                    {fmt(lineTotal(it))}
                  </p>
                  <button onClick={() => removeItem(i)} disabled={items.length === 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[14px] transition hover:bg-red-500/10 disabled:opacity-20"
                    style={{ color: '#ef4444' }}>✕</button>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 flex justify-end gap-8 items-center"
              style={{ borderTop: '1px solid #2a2a32' }}>
              <p className="text-[13px] uppercase tracking-[1px] font-bold" style={{ color: '#555', fontFamily: 'var(--font-barlow-condensed)' }}>Total</p>
              <p className="text-[24px] font-black" style={{ color: '#ff6600', fontFamily: 'var(--font-bebas-neue)' }}>
                {fmt(total)}
              </p>
            </div>
          </section>

          {/* Status */}
          <section className="rounded-2xl p-6" style={{ background: '#222228', border: '1px solid #2a2a32' }}>
            <p className="text-[13px] font-bold tracking-[1.5px] uppercase mb-4"
              style={{ color: '#ff6600', fontFamily: 'var(--font-barlow-condensed)' }}>
              📌 Status da OS
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'OPEN',         label: 'Aberta',          color: '#3b82f6' },
                { key: 'IN_PROGRESS',  label: 'Em andamento',    color: '#ff8c00' },
                { key: 'WAITING_PARTS',label: 'Aguard. peças',   color: '#a855f7' },
                { key: 'DONE',         label: 'Concluída',       color: '#22c55e' },
              ].map((s) => (
                <button key={s.key} onClick={() => setForm((p) => ({ ...p, status: s.key }))}
                  className="px-4 py-2 rounded-xl text-[12px] font-bold uppercase tracking-[0.5px] transition-colors"
                  style={{
                    background: form.status === s.key ? s.color : '#18181b',
                    color:      form.status === s.key ? '#111'   : '#555',
                    border:     `1px solid ${form.status === s.key ? s.color : '#3a3a42'}`,
                    fontFamily: 'var(--font-barlow-condensed)',
                  }}>
                  {s.label}
                </button>
              ))}
            </div>
          </section>

          {error && <p className="text-[13px]" style={{ color: '#ef4444' }}>{error}</p>}

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={() => router.back()}
              className="flex-1 py-3.5 rounded-xl text-[14px] font-bold uppercase tracking-[1px]"
              style={{ background: '#30303a', color: '#888', fontFamily: 'var(--font-barlow-condensed)' }}>
              Cancelar
            </button>
            <button onClick={handleSave} disabled={saving}
              className="flex-1 py-3.5 rounded-xl text-[14px] font-bold uppercase tracking-[1px] disabled:opacity-60 active:scale-95 transition-all"
              style={{ background: '#ff6600', color: '#111', fontFamily: 'var(--font-barlow-condensed)' }}>
              {saving ? 'Salvando...' : '💾 Salvar OS'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
