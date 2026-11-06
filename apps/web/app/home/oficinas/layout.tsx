import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Encontre Oficinas Mecânicas — MotorMacete',
  description: 'Encontre oficinas mecânicas de confiança perto de você. Avaliações, especialidades e contato direto.',
  alternates: { canonical: 'https://motormacete.com.br/home/oficinas' },
  openGraph: {
    title: 'Encontre Oficinas Mecânicas — MotorMacete',
    url: 'https://motormacete.com.br/home/oficinas',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
