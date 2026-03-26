'use client'

import { useState } from 'react'
import type { MortgageInputs } from '@/types/mortgage'

const PAID_FEATURES = [
  'Full yes / no / wait recommendation',
  'Total interest saved over life of loan',
  'Net benefit after closing costs',
  '15-yr vs 30-yr scenario comparison',
  '"Should I wait?" rate trend analysis',
  'Downloadable PDF summary',
]

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
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-medium text-blue-200 uppercase tracking-wide mb-1">Full Analysis</p>
          <h3 className="text-lg font-bold">Get Your Complete Picture</h3>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">$4.99</p>
          <p className="text-xs text-blue-200">one-time, no subscription</p>
        </div>
      </div>

      <ul className="space-y-2 mb-6">
        {PAID_FEATURES.map(feature => (
          <li key={feature} className="flex items-center gap-2 text-sm text-blue-100">
            <svg className="w-4 h-4 text-blue-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      {error && (
        <p className="text-xs text-red-200 bg-red-900/30 rounded-lg px-3 py-2 mb-3">{error}</p>
      )}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-white text-blue-600 font-semibold text-sm rounded-xl py-3.5 hover:bg-blue-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Redirecting to checkout…' : 'Get Full Analysis — $4.99'}
      </button>

      <p className="text-center text-xs text-blue-200 mt-3">
        Secured by Stripe · Instant delivery
      </p>
    </div>
  )
}
