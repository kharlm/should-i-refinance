'use client'

import { useCalculator } from '@/hooks/useCalculator'
import BreakEvenResult from './BreakEvenResult'
import PaywallCard from './PaywallCard'

function InputField({
  label,
  hint,
  prefix,
  suffix,
  value,
  onChange,
  placeholder,
}: {
  label: string
  hint?: string
  prefix?: string
  suffix?: string
  value: number | ''
  onChange: (val: number) => void
  placeholder?: string
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {hint && <span className="ml-1.5 text-xs text-slate-400 font-normal">{hint}</span>}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">{prefix}</span>
        )}
        <input
          type="number"
          inputMode="decimal"
          step="0.01"
          min="0"
          placeholder={placeholder}
          value={value === 0 ? '' : value}
          onChange={e => {
            const v = parseFloat(e.target.value)
            onChange(isNaN(v) ? 0 : v)
          }}
          className={`
            w-full rounded-lg border border-slate-200 bg-white py-3 text-sm text-slate-800
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            placeholder:text-slate-300
            ${prefix ? 'pl-7' : 'pl-3'}
            ${suffix ? 'pr-10' : 'pr-3'}
          `}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">{suffix}</span>
        )}
      </div>
    </div>
  )
}

export default function FreeCalculatorForm() {
  const { inputs, updateField, result, isValid } = useCalculator()

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
        <h2 className="text-base font-semibold text-slate-800">Your Mortgage Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Current Interest Rate"
            suffix="%"
            placeholder="6.50"
            value={inputs.currentRate}
            onChange={v => updateField('currentRate', v)}
          />
          <InputField
            label="New Interest Rate"
            suffix="%"
            placeholder="5.75"
            value={inputs.newRate}
            onChange={v => updateField('newRate', v)}
          />
          <InputField
            label="Remaining Loan Balance"
            prefix="$"
            placeholder="320,000"
            value={inputs.loanBalance}
            onChange={v => updateField('loanBalance', v)}
          />
          <InputField
            label="Estimated Closing Costs"
            hint="(typically 2–5% of loan)"
            prefix="$"
            placeholder="6,000"
            value={inputs.closingCosts}
            onChange={v => updateField('closingCosts', v)}
          />
        </div>

        {inputs.currentRate > 0 && inputs.newRate > 0 && inputs.newRate >= inputs.currentRate && (
          <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
            The new rate must be lower than your current rate to see savings.
          </p>
        )}
      </div>

      {isValid && result && (
        <>
          <BreakEvenResult result={result} />
          <PaywallCard inputs={inputs} />
        </>
      )}

      {!isValid && (
        <div className="text-center py-8 text-sm text-slate-400">
          Fill in all fields above to see your results
        </div>
      )}
    </div>
  )
}
