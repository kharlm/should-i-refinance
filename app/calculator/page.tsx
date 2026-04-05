import type { Metadata } from 'next'
import FreeCalculatorForm from '@/components/calculator/FreeCalculatorForm'

export const metadata: Metadata = {
  title: 'Mortgage Refinance Calculator — Should I Refinance',
  description: 'Enter your current rate, new rate, and loan balance to instantly see your monthly savings and break-even timeline.',
}

export default function CalculatorPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 rounded-full mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shrink-0" />
          Free · No account needed
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
          Mortgage Refinance Calculator
        </h1>
        <p className="text-slate-500 text-base max-w-md mx-auto">
          See your monthly savings instantly. Get the full picture for $4.99.
        </p>
      </div>
      <FreeCalculatorForm />
    </main>
  )
}
