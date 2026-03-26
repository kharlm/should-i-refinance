import type { Metadata } from 'next'
import FreeCalculatorForm from '@/components/calculator/FreeCalculatorForm'

export const metadata: Metadata = {
  title: 'Mortgage Refinance Calculator — Should I Refinance',
  description: 'Enter your current rate, new rate, and loan balance to instantly see your monthly savings and break-even timeline.',
}

export default function CalculatorPage() {
  return (
    <main className="max-w-xl mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Mortgage Refinance Calculator
        </h1>
        <p className="text-sm text-slate-500">
          See your monthly savings instantly. Get the full picture for $4.99.
        </p>
      </div>
      <FreeCalculatorForm />
    </main>
  )
}
