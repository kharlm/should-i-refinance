import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { calculateFullAnalysis } from '@/lib/calculations'
import { signAnalysis, COOKIE_NAME } from '@/lib/session'
import type { FullAnalysisInputs } from '@/types/mortgage'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const meta = session.metadata!

    const remainingYears = meta.remainingYears ? parseFloat(meta.remainingYears) : 30
    const inputs: FullAnalysisInputs = {
      currentRate: parseFloat(meta.currentRate),
      newRate: parseFloat(meta.newRate),
      loanBalance: parseFloat(meta.loanBalance),
      closingCosts: parseFloat(meta.closingCosts),
      stayYears: meta.stayYears ? parseFloat(meta.stayYears) : 7,
      remainingYears,
      homeValue: meta.homeValue ? parseFloat(meta.homeValue) : undefined,
      remainingTermMonths: Math.round(remainingYears * 12),
      newTermMonths: 360,
    }

    const analysis = calculateFullAnalysis(inputs)
    const token = await signAnalysis(analysis)

    const response = NextResponse.json({ received: true })
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })
    return response
  }

  return NextResponse.json({ received: true })
}
