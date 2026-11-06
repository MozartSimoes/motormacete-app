'use client'

interface MaintenanceItem {
  id: string
  modelName: string | null
  component: string
  intervalKm: number | null
  intervalMonths: number | null
  notes: string | null
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  order: number
}

const priorityConfig = {
  CRITICAL: { label: 'Crítico',  bg: 'rgba(224,48,48,0.12)',  border: '#e03030', dot: '#e03030', textColor: '#e05050' },
  HIGH:     { label: 'Alto',     bg: 'rgba(224,160,32,0.12)', border: '#e0a020', dot: '#e0a020', textColor: '#e0a020' },
  MEDIUM:   { label: 'Médio',    bg: 'rgba(255,102,0,0.10)',  border: '#ff6600', dot: '#ff6600', textColor: '#ff8533' },
  LOW:      { label: 'Baixo',    bg: 'rgba(80,160,80,0.10)',  border: '#4a9a4a', dot: '#4a9a4a', textColor: '#5ab05a' },
}

function formatInterval(km: number | null, months: number | null): string {
  const parts: string[] = []
  if (km) parts.push(`${km.toLocaleString('pt-BR')} km`)
  if (months) parts.push(`${months} ${months === 1 ? 'mês' : 'meses'}`)
  return parts.join(' / ') || '—'
}

export function MaintenanceTable({ items, isSpecific }: { items: MaintenanceItem[]; isSpecific: boolean }) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-center">
        <span className="text-3xl">🔧</span>
        <p className="text-sm font-semibold" style={{ color: '#f0ede8' }}>Sem dados de manutenção</p>
        <p className="text-xs" style={{ color: '#444' }}>Não encontramos cronograma para este veículo.</p>
      </div>
    )
  }

  // Group by priority for section headers
  const order: MaintenanceItem['priority'][] = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']
  const grouped = order.reduce((acc, p) => {
    const group = items.filter((i) => i.priority === p)
    if (group.length > 0) acc[p] = group
    return acc
  }, {} as Record<string, MaintenanceItem[]>)

  return (
    <div className="flex flex-col gap-1">
      {!isSpecific && (
        <p className="text-[12px] mb-2 px-1" style={{ color: '#777' }}>
          * Cronograma genérico — não encontramos dados específicos para este modelo.
        </p>
      )}

      {order.map((priority) => {
        const group = grouped[priority]
        if (!group) return null
        const cfg = priorityConfig[priority]
        return (
          <div key={priority} className="mb-3">
            {/* Priority section header */}
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-md mb-2"
              style={{ background: cfg.bg, border: `1px solid ${cfg.border}33` }}
            >
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: cfg.dot }} />
              <span className="text-[12px] font-bold tracking-[1px] uppercase" style={{ color: cfg.textColor }}>
                {cfg.label} — {group.length} {group.length === 1 ? 'item' : 'itens'}
              </span>
            </div>

            {/* Items */}
            <div className="flex flex-col gap-2 pl-1">
              {group.map((item, i) => (
                <div
                  key={item.id}
                  className="rounded-lg p-3.5 animate-fade-in-up"
                  style={{
                    background: '#222228',
                    borderLeft: `3px solid ${cfg.border}`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                >
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <span className="text-[16px] font-semibold" style={{ color: '#ffffff' }}>
                      {item.component}
                    </span>
                    <span
                      className="text-[12px] font-semibold shrink-0 px-2.5 py-0.5 rounded-full"
                      style={{ background: cfg.bg, color: cfg.textColor, border: `1px solid ${cfg.border}44` }}
                    >
                      {formatInterval(item.intervalKm, item.intervalMonths)}
                    </span>
                  </div>
                  {item.notes && (
                    <p className="text-[14px] mt-1.5 leading-relaxed" style={{ color: '#e0ddd7' }}>
                      {item.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
