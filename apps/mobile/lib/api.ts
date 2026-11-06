import * as SecureStore from 'expo-secure-store'

const API_BASE = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000'
const TOKEN_KEY = 'mm_token'

export async function getToken(): Promise<string | null> {
  return SecureStore.getItemAsync(TOKEN_KEY)
}

export async function saveToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(TOKEN_KEY, token)
}

export async function removeToken(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY)
}

async function authHeaders(): Promise<Record<string, string>> {
  const token = await getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const headers = {
    'Content-Type': 'application/json',
    ...(await authHeaders()),
    ...(options.headers as Record<string, string> | undefined),
  }
  return fetch(`${API_BASE}${path}`, { ...options, headers })
}

export interface LoginPayload { email: string; password: string; keepSignedIn?: boolean }
export interface RegisterPayload {
  email: string
  password: string
  name: string
  type: string
  workshop?: {
    name: string
    phone?: string
    cep: string
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
  }
}
export interface VerifyOtpPayload { email: string; code: string; keepSignedIn?: boolean }

export interface AuthResponse {
  success: boolean
  token?: string
  user?: { name: string; email: string; type: 'DRIVER' | 'MECHANIC' }
  error?: string
}

export async function apiLogin(payload: LoginPayload): Promise<AuthResponse> {
  const res = await apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) })
  return res.json()
}

export async function apiRegister(payload: RegisterPayload): Promise<AuthResponse> {
  const res = await apiFetch('/api/auth/register', { method: 'POST', body: JSON.stringify(payload) })
  return res.json()
}

export async function apiVerifyOtp(payload: VerifyOtpPayload): Promise<AuthResponse> {
  const res = await apiFetch('/api/auth/verify-otp', { method: 'POST', body: JSON.stringify(payload) })
  return res.json()
}

export async function apiLogout(): Promise<void> {
  await apiFetch('/api/auth/logout', { method: 'POST' })
  await removeToken()
}
