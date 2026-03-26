import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME } from '@/lib/session'

export function proxy(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value
  const sessionId = req.nextUrl.searchParams.get('session_id')

  // Allow access if they have a valid cookie OR a session_id (pending webhook)
  if (!token && !sessionId) {
    return NextResponse.redirect(new URL('/calculator', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/results'],
}
