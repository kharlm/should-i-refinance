'use client'

import { useState } from 'react'
import type { MortgageInputs } from '@/types/mortgage'

const PAID_FEATURES = [
  'Full yes / no / wait recommendation',
  'Total interest saved over life of loan',
  'Net benefit after closing costs',
  '15-yr vs 30-yr scenario comparison',
  'Downloadable PDF summary',
]

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-indigo-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default function PaywallCard({ inputs }: { inputs: MortgageInputs }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCheckout() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="rounded-2xl p-7 text-white shadow-xl shadow-indigo-900/30 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #4338ca 0%, #4f46e5 50%, #6366f1 100%)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-1.5">Full Analysis</p>
          <h3 className="text-xl font-bold leading-snug">Get Your Complete Picture</h3>
        </div>
        <div className="text-right shrink-0 ml-4">
          <p className="text-3xl font-extrabold tracking-tight">$4.99</p>
          <p className="text-xs text-indigo-300 mt-0.5">one-time, no subscription</p>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-2.5 mb-7">
        {PAID_FEATURES.map(feature => (
          <li key={feature} className="flex items-center gap-2.5 text-sm text-indigo-100">
            <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center shrink-0">
              <CheckIcon />
            </div>
            {feature}
          </li>
        ))}
      </ul>

      {error && (
        <p className="text-xs text-red-200 bg-red-900/30 rounded-lg px-3 py-2 mb-4">{error}</p>
      )}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-white text-indigo-700 font-bold text-sm rounded-xl py-4 hover:bg-indigo-50 active:bg-indigo-100 transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
      >
        {loading ? 'Redirecting to checkout…' : 'Get Full Analysis — $4.99'}
      </button>

      <p className="text-center text-xs text-indigo-300 mt-4 flex items-center justify-center gap-1.5">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Secured by Stripe · Instant delivery
      </p>
    </div>
  )
}
