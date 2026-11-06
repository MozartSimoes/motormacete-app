import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recall Automotivo no Brasil — MotorMacete',
  description: 'Consulte recalls de carros e motos no Brasil. Verifique se o seu veículo está incluído em campanhas de recall ativas.',
  alternates: { canonical: 'https://motormacete.com.br/home/recall' },
  openGraph: {
    title: 'Recall Automotivo no Brasil — MotorMacete',
    url: 'https://motormacete.com.br/home/recall',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
