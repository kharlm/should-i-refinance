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
      <main className="max-w-xl mx-auto px-6 py-12">
        <PendingConfirmation sessionId={session_id} />
      </main>
    )
  }

  if (!analysis) {
    redirect('/calculator')
  }

  return (
    <main className="max-w-xl mx-auto px-6 py-12">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 rounded-full mb-4">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Full Analysis · Personalized for you
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Your Refinance Analysis</h1>
        <p className="text-slate-500 text-base">Personalized based on your mortgage details</p>
      </div>
      <PaidResults analysis={analysis} />
    </main>
  )
}
