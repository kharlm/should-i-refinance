import type { BreakEvenResult } from '@/types/mortgage'

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

export default function BreakEvenResult({ result, stayYears }: { result: BreakEvenResult; stayYears: number }) {
  const { monthlyDifference, breakEvenMonths, currentMonthlyPayment, newMonthlyPayment } = result
  const isSaving = monthlyDifference > 0
  const breakEvenYears = (breakEvenMonths / 12).toFixed(1)
  const newBarWidth = Math.round((newMonthlyPayment / currentMonthlyPayment) * 100)
  const stayNetBenefit = (stayYears * 12 * monthlyDifference) - result.breakEvenMonths  // simplified
  const stayNetBenefitDollars = (stayYears * 12 * monthlyDifference)

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 pt-6 pb-5 space-y-5">
        <h2 className="text-base font-semibold text-slate-800">Your Free Results</h2>

        {/* Payment comparison bars */}
        <div className="space-y-3">
          <div className="space-y-1.5">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-slate-500">Current payment</span>
              <span className="text-xs font-semibold text-slate-700">{formatCurrency(currentMonthlyPayment)}<span className="text-slate-400 font-normal">/mo</span></span>
            </div>
            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full w-full transition-all duration-700" />
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-slate-500">New payment</span>
              <span className="text-xs font-semibold text-indigo-600">{formatCurrency(newMonthlyPayment)}<span className="text-slate-400 font-normal">/mo</span></span>
            </div>
            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                style={{ width: `${newBarWidth}%` }}
              />
            </div>
          </div>
        </div>

        {/* Key metrics */}
        <div className={`rounded-xl p-4 ${isSaving ? 'bg-emerald-50 border border-emerald-100' : 'bg-red-50 border border-red-100'}`}>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Monthly Savings</p>
              <p className={`text-xl font-bold tracking-tight ${isSaving ? 'text-emerald-600' : 'text-red-600'}`}>
                {isSaving ? '+' : ''}{formatCurrency(monthlyDifference)}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Break-Even</p>
              {breakEvenMonths >= 9999 ? (
                <p className="text-xl font-bold text-slate-700 tracking-tight">Never</p>
              ) : (
                <>
                  <p className="text-xl font-bold text-slate-700 tracking-tight">{breakEvenMonths}<span className="text-sm font-normal text-slate-400 ml-0.5">mo</span></p>
                  <p className="text-xs text-slate-400">{breakEvenYears} yrs</p>
                </>
              )}
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">At {stayYears} Years</p>
              <p className={`text-xl font-bold tracking-tight ${stayNetBenefitDollars >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {stayNetBenefitDollars >= 0 ? '+' : ''}{formatCurrency(stayNetBenefitDollars)}
              </p>
              <p className="text-xs text-slate-400">total saved</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-600 leading-relaxed">
            {isSaving && breakEvenMonths < 9999
              ? `You'll save ${formatCurrency(monthlyDifference)} every month and recover your closing costs in ${breakEvenMonths} months.`
              : isSaving
              ? `You'd save ${formatCurrency(monthlyDifference)}/mo but never fully recover closing costs.`
              : 'Refinancing would increase your monthly payment at this rate.'}
          </p>
        </div>
      </div>

      {/* Bottom callout */}
      <div className="bg-slate-50 border-t border-slate-100 px-6 py-3">
        <p className="text-xs text-slate-400 text-center">
          Free results · Unlock the full analysis below for $4.99
        </p>
      </div>
    </div>
  )
}
