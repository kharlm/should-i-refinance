import type { BreakEvenResult } from '@/types/mortgage'

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

export default function BreakEvenResult({ result }: { result: BreakEvenResult }) {
  const { monthlyDifference, breakEvenMonths, currentMonthlyPayment, newMonthlyPayment } = result
  const isSaving = monthlyDifference > 0
  const breakEvenYears = (breakEvenMonths / 12).toFixed(1)

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
      <h2 className="text-base font-semibold text-slate-800">Your Free Results</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500 mb-1">Current Payment</p>
          <p className="text-xl font-bold text-slate-700">{formatCurrency(currentMonthlyPayment)}<span className="text-xs font-normal text-slate-400">/mo</span></p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500 mb-1">New Payment</p>
          <p className="text-xl font-bold text-slate-700">{formatCurrency(newMonthlyPayment)}<span className="text-xs font-normal text-slate-400">/mo</span></p>
        </div>
      </div>

      <div className={`rounded-xl p-4 ${isSaving ? 'bg-emerald-50 border border-emerald-100' : 'bg-red-50 border border-red-100'}`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">Monthly Difference</p>
            <p className={`text-2xl font-bold ${isSaving ? 'text-emerald-600' : 'text-red-600'}`}>
              {isSaving ? '+' : '-'}{formatCurrency(Math.abs(monthlyDifference))}
            </p>
            <p className="text-xs text-slate-500 mt-1">per month</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-slate-500 mb-1">Break-Even</p>
            {breakEvenMonths >= 9999 ? (
              <p className="text-xl font-bold text-slate-700">Never</p>
            ) : (
              <>
                <p className="text-2xl font-bold text-slate-700">{breakEvenMonths}</p>
                <p className="text-xs text-slate-500">{breakEvenYears} years</p>
              </>
            )}
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-600">
          {isSaving && breakEvenMonths < 9999
            ? `You'll save ${formatCurrency(monthlyDifference)} every month and recover your closing costs in ${breakEvenMonths} months.`
            : isSaving
            ? `You'd save ${formatCurrency(monthlyDifference)}/mo but never fully recover closing costs.`
            : 'Refinancing would increase your monthly payment at this rate.'}
        </p>
      </div>
    </div>
  )
}
