'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

const FUEL_LABELS: Record<string, string> = {
  FLEX: 'Flex', GASOLINA: 'Gasolina', DIESEL: 'Diesel', ELETRICO: 'Elétrico', HIBRIDO: 'Híbrido',
}

interface Vehicle {
  id: string; nickname: string | null; vehicleType: string
  brand: string; model: string; year: number; fuelType: string | null
  color: string | null; plate: string | null; currentKm: number | null; notes: string | null
  logs: LogEntry[]
}

interface LogEntry {
  id: string; date: string; km: number | null; category: string
  description: string; cost: number | null; workshop: string | null
  notes: string | null; nextKm: number | null; nextDate: string | null
}

function fmtDate(d: string) { return new Date(d).toLocaleDateString('pt-BR') }
function fmtBRL(v: number) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }) }
function fmtKm(v: number) { return v.toLocaleString('pt-BR') + ' km' }

export default function PrintPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    fetch(`/api/garage/${id}`)
      .then((r) => r.json())
      .then((d) => { setVehicle(d.vehicle); setReady(true) })
  }, [id])

  useEffect(() => {
    if (ready && vehicle) {
      const t = setTimeout(() => window.print(), 600)
      return () => clearTimeout(t)
    }
  }, [ready, vehicle])

  if (!vehicle) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Arial', color: '#555' }}>
        Preparando documento...
      </div>
    )
  }

  const totalSpent = vehicle.logs.reduce((s, l) => s + (l.cost ?? 0), 0)
  const vehicleTitle = vehicle.nickname ? `${vehicle.nickname} — ${vehicle.brand} ${vehicle.model}` : `${vehicle.brand} ${vehicle.model}`

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { margin: 0; }
          @page { margin: 18mm 15mm; size: A4; }
        }
        body { font-family: Arial, Helvetica, sans-serif; color: #111; background: #fff; margin: 0; padding: 0; }
        * { box-sizing: border-box; }
      `}</style>

      {/* Print button (hidden when printing) */}
      <div className="no-print" style={{ padding: '16px 24px', background: '#f5f5f5', borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={() => window.print()} style={{ padding: '8px 20px', background: '#ff6600', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
          🖨️ Imprimir / Salvar PDF
        </button>
        <button onClick={() => router.push('/home/garagem')} style={{ padding: '8px 16px', background: '#eee', color: '#333', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
          ✕ Fechar
        </button>
      </div>

      {/* Document */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '3px solid #ff6600', paddingBottom: 16, marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#ff6600', marginBottom: 4 }}>
              MotorMacete · Histórico de Manutenção
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, color: '#111' }}>{vehicleTitle}</div>
            <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>
              {vehicle.year}
              {vehicle.fuelType ? ` · ${FUEL_LABELS[vehicle.fuelType] ?? vehicle.fuelType}` : ''}
              {vehicle.color ? ` · ${vehicle.color}` : ''}
              {vehicle.plate ? ` · Placa: ${vehicle.plate}` : ''}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: '#999', marginBottom: 2 }}>Gerado em</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>{new Date().toLocaleDateString('pt-BR')}</div>
          </div>
        </div>

        {/* Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 28 }}>
          {[
            { label: 'KM Atual', value: vehicle.currentKm ? fmtKm(vehicle.currentKm) : '—' },
            { label: 'Total Registros', value: String(vehicle.logs.length) },
            { label: 'Total Gasto', value: totalSpent > 0 ? fmtBRL(totalSpent) : '—' },
            { label: 'Último Serviço', value: vehicle.logs[0] ? fmtDate(vehicle.logs[0].date) : '—' },
          ].map((s) => (
            <div key={s.label} style={{ border: '1px solid #e5e5e5', borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#999', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: '#111' }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* History table */}
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#ff6600', marginBottom: 10 }}>
          Histórico de Manutenção
        </div>

        {vehicle.logs.length === 0 ? (
          <p style={{ color: '#999', fontSize: 13, fontStyle: 'italic' }}>Nenhum registro encontrado.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                {['Data', 'KM', 'Categoria', 'Descrição', 'Custo', 'Oficina', 'Próx. Revisão'].map((h) => (
                  <th key={h} style={{ padding: '7px 8px', textAlign: 'left', fontWeight: 700, fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: '#555', borderBottom: '2px solid #e5e5e5' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vehicle.logs.map((log, i) => (
                <tr key={log.id} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={{ padding: '7px 8px', borderBottom: '1px solid #eee', whiteSpace: 'nowrap' }}>{fmtDate(log.date)}</td>
                  <td style={{ padding: '7px 8px', borderBottom: '1px solid #eee', whiteSpace: 'nowrap' }}>{log.km ? fmtKm(log.km) : '—'}</td>
                  <td style={{ padding: '7px 8px', borderBottom: '1px solid #eee' }}>
                    <span style={{ background: '#fff3e0', color: '#e65100', borderRadius: 4, padding: '2px 6px', fontSize: 10, fontWeight: 700 }}>
                      {log.category}
                    </span>
                  </td>
                  <td style={{ padding: '7px 8px', borderBottom: '1px solid #eee' }}>
                    <div style={{ fontWeight: 600 }}>{log.description}</div>
                    {log.notes && <div style={{ color: '#777', fontSize: 11, marginTop: 2 }}>{log.notes}</div>}
                  </td>
                  <td style={{ padding: '7px 8px', borderBottom: '1px solid #eee', whiteSpace: 'nowrap', fontWeight: 700, color: log.cost ? '#c84a00' : '#999' }}>
                    {log.cost ? fmtBRL(log.cost) : '—'}
                  </td>
                  <td style={{ padding: '7px 8px', borderBottom: '1px solid #eee', color: '#555' }}>{log.workshop ?? '—'}</td>
                  <td style={{ padding: '7px 8px', borderBottom: '1px solid #eee', fontSize: 11, color: '#555' }}>
                    {log.nextKm ? fmtKm(log.nextKm) : ''}
                    {log.nextKm && log.nextDate ? ' · ' : ''}
                    {log.nextDate ? fmtDate(log.nextDate) : ''}
                    {!log.nextKm && !log.nextDate ? '—' : ''}
                  </td>
                </tr>
              ))}
            </tbody>
            {totalSpent > 0 && (
              <tfoot>
                <tr style={{ background: '#fff8f0' }}>
                  <td colSpan={4} style={{ padding: '8px', fontWeight: 700, fontSize: 12, textAlign: 'right', borderTop: '2px solid #e5e5e5', color: '#333' }}>
                    TOTAL INVESTIDO
                  </td>
                  <td style={{ padding: '8px', fontWeight: 900, fontSize: 14, color: '#c84a00', borderTop: '2px solid #e5e5e5' }}>
                    {fmtBRL(totalSpent)}
                  </td>
                  <td colSpan={2} style={{ borderTop: '2px solid #e5e5e5' }} />
                </tr>
              </tfoot>
            )}
          </table>
        )}

        {/* Footer */}
        <div style={{ marginTop: 32, paddingTop: 12, borderTop: '1px solid #e5e5e5', display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#aaa' }}>
          <span>motormacete.com.br · Histórico gerado automaticamente</span>
          <span>Documento gerado em {new Date().toLocaleString('pt-BR')}</span>
        </div>
      </div>
    </>
  )
}
