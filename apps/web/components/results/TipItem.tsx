import type { Tip } from '@/lib/types'

const severityConfig = {
  OK:     { color: '#ff6600', icon: '✓',  borderColor: '#ff6600' },
  WARN:   { color: '#e0a020', icon: '⚠',  borderColor: '#e0a020' },
  DANGER: { color: '#e03030', icon: '🔥', borderColor: '#e03030' },
}

interface Props {
  tip: Tip
  index: number
}

export function TipItem({ tip, index }: Props) {
  const cfg = severityConfig[tip.severity]

  return (
    <li
      className="flex gap-3.5 items-start p-3.5 rounded-lg animate-fade-in-up"
      style={{
        background: '#222228',
        borderLeft: `3px solid ${cfg.borderColor}`,
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <span className="text-[17px] mt-0.5 shrink-0" style={{ color: cfg.color }}>
        {cfg.icon}
      </span>
      <span className="text-[15px] leading-relaxed" style={{ color: '#e8e5e0' }}>
        <strong className="block mb-1 text-[15px] font-semibold" style={{ color: '#ffffff' }}>
          {tip.title}
        </strong>
        {tip.body}
      </span>
    </li>
  )
}
