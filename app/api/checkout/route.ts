import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import type { MortgageInputs } from '@/types/mortgage'

export async function POST(req: NextRequest) {
  const body: MortgageInputs = await req.json()

  const { currentRate, newRate, loanBalance, closingCosts } = body

  if (!currentRate || !newRate || !loanBalance || closingCosts === undefined) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    metadata: {
      currentRate: String(currentRate),
      newRate: String(newRate),
      loanBalance: String(loanBalance),
      closingCosts: String(closingCosts),
    },
    success_url: `${baseUrl}/results?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/calculator`,
  })

  return NextResponse.json({ url: session.url })
}
