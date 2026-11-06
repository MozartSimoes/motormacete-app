import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { getToken, saveToken, removeToken, apiLogout } from './api'

export interface User {
  name: string
  email: string
  type: 'DRIVER' | 'MECHANIC'
  plan: 'FREE' | 'DRIVER_PRO' | 'MECHANIC_PRO'
  isAdmin: boolean
  isTrialing: boolean
  trialDaysLeft: number
  trialEndsAt: string | null
}

interface AuthContextValue {
  user: User | null
  token: string | null
  isLoading: boolean
  signIn: (token: string, user: User) => Promise<void>
  signOut: () => Promise<void>
  updateUser: (patch: Partial<User>) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getToken().then(async (stored) => {
      if (stored) {
        try {
          const parts = stored.split('.')
          const payload = JSON.parse(atob(parts[1]))
          setToken(stored)
          // Busca o plano atualizado do servidor
          const API_BASE = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000'
          const res = await fetch(`${API_BASE}/api/auth/me`, { headers: { Authorization: `Bearer ${stored}` } })
          const data = await res.json()
          setUser({ name: payload.name, email: payload.email, type: payload.type, plan: data.user?.plan ?? 'FREE', isAdmin: data.user?.isAdmin ?? false, isTrialing: data.user?.isTrialing ?? false, trialDaysLeft: data.user?.trialDaysLeft ?? 0, trialEndsAt: data.user?.trialEndsAt ?? null })
        } catch {
          removeToken()
        }
      }
      setIsLoading(false)
    })
  }, [])

  const signIn = useCallback(async (newToken: string, newUser: Omit<User, 'plan'> & { plan?: User['plan'] }) => {
    await saveToken(newToken)
    setToken(newToken)
    // Busca o plano atualizado do servidor após login
    try {
      const API_BASE = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000'
      const res = await fetch(`${API_BASE}/api/auth/me`, { headers: { Authorization: `Bearer ${newToken}` } })
      const data = await res.json()
      setUser({ ...newUser, plan: data.user?.plan ?? 'FREE', isAdmin: data.user?.isAdmin ?? false, isTrialing: data.user?.isTrialing ?? false, trialDaysLeft: data.user?.trialDaysLeft ?? 0, trialEndsAt: data.user?.trialEndsAt ?? null })
    } catch {
      setUser({ ...newUser, plan: newUser.plan ?? 'FREE', isAdmin: false, isTrialing: false, trialDaysLeft: 0, trialEndsAt: null })
    }
  }, [])

  const signOut = useCallback(async () => {
    await apiLogout()
    setToken(null)
    setUser(null)
  }, [])

  const updateUser = useCallback((patch: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...patch } : null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, isLoading, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
