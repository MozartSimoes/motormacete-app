import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Allow mobile clients to authenticate via Bearer token by injecting it as a cookie
export function middleware(request: NextRequest) {
  const auth = request.headers.get('Authorization')
  if (auth?.startsWith('Bearer ')) {
    const token = auth.slice(7)
    const headers = new Headers(request.headers)
    const existing = headers.get('cookie') ?? ''
    headers.set('cookie', `mm_session=${token}${existing ? `; ${existing}` : ''}`)
    return NextResponse.next({ request: { headers } })
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
