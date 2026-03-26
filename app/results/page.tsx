import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyAnalysis, COOKIE_NAME } from '@/lib/session'
import PaidResults from '@/components/calculator/PaidResults'
import PendingConfirmation from '@/components/calculator/PendingConfirmation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Refinance Analysis — Should I Refinance',
  robots: { index: false, follow: false },
}

interface Props {
  searchParams: Promise<{ session_id?: string }>
}

export default async function ResultsPage({ searchParams }: Props) {
  const { session_id } = await searchParams
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value

  const analysis = token ? await verifyAnalysis(token) : null

  if (!analysis && !session_id) {
    redirect('/calculator')
  }

  if (!analysis && session_id) {
    // Webhook hasn't fired yet — show polling UI
    return (
      <main className="max-w-xl mx-auto px-4 py-10">
        <PendingConfirmation sessionId={session_id} />
      </main>
    )
  }

  if (!analysis) {
    redirect('/calculator')
  }

  return (
    <main className="max-w-xl mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Your Refinance Analysis</h1>
        <p className="text-sm text-slate-500">Personalized based on your mortgage details</p>
      </div>
      <PaidResults analysis={analysis} />
    </main>
  )
}
