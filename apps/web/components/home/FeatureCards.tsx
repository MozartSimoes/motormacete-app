const features = [
  {
    icon: '⚡',
    name: 'Macetes reais',
    desc: 'Truques práticos usados por mecânicos experientes no dia a dia da oficina.',
  },
  {
    icon: '🐛',
    name: 'Problemas crônicos',
    desc: 'Conheça os defeitos mais frequentes antes que eles te peguem de surpresa.',
  },
  {
    icon: '📅',
    name: 'Revisões em dia',
    desc: 'Intervalos certos de troca de óleo, correia, filtros e muito mais por modelo.',
  },
]

export function FeatureCards() {
  return (
    <>
      <style>{`
        .mm-feature-card {
          background: #28282e;
          border: 1px solid #2a2a32;
          transition: border-color 0.2s, transform 0.2s;
        }
        .mm-feature-card:hover {
          border-color: rgba(255,102,0,0.30);
          transform: translateY(-2px);
        }
      `}</style>
      <div className="grid grid-cols-3 gap-4 px-6 mb-9 max-sm:grid-cols-1">
        {features.map((f) => (
          <div key={f.name} className="mm-feature-card rounded-2xl p-6 min-h-[170px] flex flex-col justify-between">
            <div>
              <div
                className="w-[38px] h-[38px] rounded-lg flex items-center justify-center mb-4 text-[19px]"
                style={{ background: 'rgba(255,102,0,0.10)' }}
              >
                {f.icon}
              </div>
              <p
                className="text-[15px] font-bold tracking-[0.4px] mb-3"
                style={{ fontFamily: 'var(--font-barlow-condensed)', color: '#dedad4' }}
              >
                {f.name}
              </p>
              <p className="text-sm leading-6" style={{ color: '#bdb9b0' }}>
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
