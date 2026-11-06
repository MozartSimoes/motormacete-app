import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'

const COOKIE_NAME = 'mm_session'

function getSecret() {
  const s = process.env.AUTH_SECRET ?? 'dev-secret-change-in-production-min-32-chars!!'
  return new TextEncoder().encode(s)
}

export interface SessionPayload {
  userId: string
  email: string
  name: string
  type: 'DRIVER' | 'MECHANIC'
}

export async function createSession(payload: SessionPayload, persistent: boolean): Promise<string> {
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(persistent ? '30d' : '1d')
    .sign(getSecret())

  const store = await cookies()
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    ...(persistent ? { maxAge: 60 * 60 * 24 * 30 } : {}),
  })

  return token
}

export async function getSession(): Promise<SessionPayload | null> {
  try {
    const store = await cookies()
    const token = store.get(COOKIE_NAME)?.value
    if (!token) return null
    const { payload } = await jwtVerify(token, getSecret())
    return payload as unknown as SessionPayload
  } catch {
    return null
  }
}

export async function deleteSession() {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

export async function getSessionFromRequest(req: NextRequest): Promise<SessionPayload | null> {
  const auth = req.headers.get('authorization')
  if (auth?.startsWith('Bearer ')) {
    try {
      const { payload } = await jwtVerify(auth.slice(7), getSecret())
      return payload as unknown as SessionPayload
    } catch {
      return null
    }
  }
  return getSession()
}
