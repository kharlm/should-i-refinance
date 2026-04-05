'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PendingConfirmation({ sessionId }: { sessionId: string }) {
  const router = useRouter()
  const [attempts, setAttempts] = useState(0)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (attempts >= 8) {
      setFailed(true)
      return
    }

    const timer = setTimeout(async () => {
      const res = await fetch(`/api/confirm?session_id=${sessionId}`)
      const data = await res.json()
      if (data.ready) {
        router.refresh()
      } else {
        setAttempts(a => a + 1)
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [attempts, sessionId, router])

  if (failed) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <p className="font-semibold text-slate-800">Still confirming your payment…</p>
        <p className="text-sm text-slate-500">This is taking longer than expected. Please refresh in a moment.</p>
        <button
          onClick={() => router.refresh()}
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 underline underline-offset-2 transition-colors"
        >
          Refresh now
        </button>
      </div>
    )
  }

  return (
    <div className="text-center py-16 space-y-4">
      <div className="w-12 h-12 border-[3px] border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
      <p className="font-semibold text-slate-800">Confirming your payment…</p>
      <p className="text-sm text-slate-400">Hang on, this only takes a second.</p>
    </div>
  )
}
