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
        <p className="text-slate-700 font-medium">Still confirming your payment…</p>
        <p className="text-sm text-slate-500">This is taking longer than expected. Please refresh in a moment.</p>
        <button
          onClick={() => router.refresh()}
          className="text-sm text-blue-600 underline"
        >
          Refresh now
        </button>
      </div>
    )
  }

  return (
    <div className="text-center py-16 space-y-4">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
      <p className="text-slate-700 font-medium">Confirming your payment…</p>
      <p className="text-sm text-slate-400">Hang on, this only takes a second.</p>
    </div>
  )
}
