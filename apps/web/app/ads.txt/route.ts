import { NextResponse } from 'next/server'

export async function GET() {
  return new NextResponse(
    'google.com, pub-7836996287771168, DIRECT, f08c47fec0942fa0\n',
    {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=86400',
      },
    }
  )
}
