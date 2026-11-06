import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checklist Pré-Viagem — MotorMacete',
  description: 'Monte seu checklist pré-viagem, compartilhe com o grupo e acompanhe a preparação do seu veículo em tempo real.',
  alternates: { canonical: 'https://motormacete.com.br/home/checklist' },
  openGraph: {
    title: 'Checklist Pré-Viagem — MotorMacete',
    url: 'https://motormacete.com.br/home/checklist',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
