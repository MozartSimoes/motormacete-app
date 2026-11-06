import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notícias Automotivas — MotorMacete',
  description: 'As principais notícias sobre carros, motos, SUVs, elétricos e manutenção automotiva no Brasil. Atualizadas a cada hora.',
  alternates: { canonical: 'https://motormacete.com.br/home/noticias' },
  openGraph: {
    title: 'Notícias Automotivas — MotorMacete',
    url: 'https://motormacete.com.br/home/noticias',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
