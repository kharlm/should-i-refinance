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
      <div className="relative group">
        {prefix && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium pointer-events-none">{prefix}</span>
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
            w-full rounded-xl border border-slate-200 bg-white py-3 text-sm text-slate-800 font-medium
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
            hover:border-slate-300 transition-colors duration-150
            placeholder:text-slate-300 placeholder:font-normal
            ${prefix ? 'pl-8' : 'pl-3.5'}
            ${suffix ? 'pr-10' : 'pr-3.5'}
          `}
        />
        {suffix && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">{suffix}</span>
        )}
      </div>
    </div>
  )
}

function StaySlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700">How long do you plan to stay?</label>
        <span className="text-sm font-bold text-indigo-600 tabular-nums">
          {value} {value === 1 ? 'year' : 'years'}
        </span>
      </div>
      <input
        type="range"
        min={1}
        max={20}
        step={1}
        value={value}
        onChange={e => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-600"
      />
      <div className="flex justify-between text-xs text-slate-400">
        <span>1 yr</span>
        <span>5 yrs</span>
        <span>10 yrs</span>
        <span>15 yrs</span>
        <span>20 yrs</span>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-10 text-center h-full flex flex-col items-center justify-center min-h-[280px]">
      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4.026 19.667A2 2 0 016 18h12a2 2 0 011.974 1.667M2 9h20M2 7a2 2 0 012-2h16a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V7z" />
        </svg>
      </div>
      <p className="text-sm font-semibold text-slate-600 mb-1">Your results will appear here</p>
      <p className="text-xs text-slate-400 leading-relaxed max-w-[200px]">Fill in your mortgage details to see your savings instantly</p>
    </div>
  )
}

export default function FreeCalculatorForm() {
  const { inputs, updateField, result, isValid } = useCalculator()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

      {/* Left column: inputs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div>
          <h2 className="text-base font-semibold text-slate-800">Your Mortgage Details</h2>
          <p className="text-xs text-slate-400 mt-0.5">Results update as you type</p>
        </div>

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
            hint="(typically 2–5%)"
            prefix="$"
            placeholder="6,000"
            value={inputs.closingCosts}
            onChange={v => updateField('closingCosts', v)}
          />
        </div>

        {/* Stay years slider */}
        <div className="pt-1">
          <StaySlider
            value={inputs.stayYears}
            onChange={v => updateField('stayYears', v)}
          />
        </div>

        {/* Optional home value for PMI */}
        <div className="pt-1 border-t border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-3">
            Optional — for PMI analysis
          </p>
          <InputField
            label="Home Value"
            hint="(for PMI check)"
            prefix="$"
            placeholder="400,000"
            value={inputs.homeValue ?? ''}
            onChange={v => updateField('homeValue', v || undefined)}
          />
        </div>

        {inputs.currentRate > 0 && inputs.newRate > 0 && inputs.newRate >= inputs.currentRate && (
          <div className="flex items-start gap-2.5 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
            <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            The new rate must be lower than your current rate to see savings.
          </div>
        )}

        <div className="pt-1 border-t border-slate-100">
          <p className="text-xs text-slate-400 text-center">
            Free · No account needed · Results are instant
          </p>
        </div>
      </div>

      {/* Right column: live results */}
      <div className="space-y-5">
        {isValid && result ? (
          <>
            <BreakEvenResult result={result} stayYears={inputs.stayYears} />
            <PaywallCard inputs={inputs} />
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  )
}
