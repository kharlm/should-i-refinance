import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { calculateFullAnalysis } from '@/lib/calculations'
import { signAnalysis, COOKIE_NAME } from '@/lib/session'
import type { FullAnalysisInputs } from '@/types/mortgage'

// Fallback for webhook race condition — called by /results if cookie is missing
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id')
  if (!sessionId) return NextResponse.json({ ready: false })

  const session = await stripe.checkout.sessions.retrieve(sessionId)

  if (session.payment_status !== 'paid') {
    return NextResponse.json({ ready: false })
  }

  const meta = session.metadata!
  const inputs: FullAnalysisInputs = {
    currentRate: parseFloat(meta.currentRate),
    newRate: parseFloat(meta.newRate),
    loanBalance: parseFloat(meta.loanBalance),
    closingCosts: parseFloat(meta.closingCosts),
    remainingTermMonths: 360,
    newTermMonths: 360,
  }

  const analysis = calculateFullAnalysis(inputs)
  const token = await signAnalysis(analysis)

  const response = NextResponse.json({ ready: true })
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
    path: '/',
  })
  return response
}
