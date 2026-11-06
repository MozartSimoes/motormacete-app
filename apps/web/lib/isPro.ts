import { prisma } from '@/lib/db'

// Centraliza a lógica de verificação de plano Pro (inclui trial de 15 dias)
export async function checkUserPro(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true, isAdmin: true, trialEndsAt: true },
  })
  if (!user) return false
  if (user.isAdmin) return true
  if (user.plan !== 'FREE') return true
  if (user.trialEndsAt && new Date() <= user.trialEndsAt) return true
  return false
}
