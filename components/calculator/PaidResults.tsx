'use client'

import { useState } from 'react'
import type { MortgageAnalysis, RateSensitivityRow } from '@/types/mortgage'

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function RecommendationBadge({ rec }: { rec: MortgageAnalysis['recommendation'] }) {
  const config = {
    yes: {
      wrapper: 'bg-emerald-50 border-emerald-200',
      badge: 'bg-emerald-600 text-white',
      label: 'Yes, Refinance',
      iconPath: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    no: {
      wrapper: 'bg-red-50 border-red-200',
      badge: 'bg-red-600 text-white',
      label: "No, Don't Refinance",
      iconPath: 'M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    wait: {
      wrapper: 'bg-amber-50 border-amber-200',
      badge: 'bg-amber-500 text-white',
      label: 'Wait for Better Rates',
      iconPath: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  }[rec]

  return (
    <div className={`rounded-xl border px-4 py-3 flex items-center gap-3 ${config.wrapper}`}>
      <div className={`inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full ${config.badge}`}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d={config.iconPath} />
        </svg>
        {config.label}
      </div>
    </div>
  )
}

function MetricCard({ label, value, sub, accent = false }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <p className="text-xs text-slate-500 mb-1.5">{label}</p>
      <p className={`text-2xl font-bold tracking-tight ${accent ? 'text-emerald-600' : 'text-slate-800'}`}>{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
    </div>
  )
}

function ScenarioTable({ scenarios }: { scenarios: MortgageAnalysis['scenarios'] }) {
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-sm min-w-[340px]">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-2.5 pr-4 text-xs text-slate-400 font-semibold uppercase tracking-wide">Scenario</th>
            <th className="text-right py-2.5 px-3 text-xs text-slate-400 font-semibold uppercase tracking-wide">Monthly</th>
            <th className="text-right py-2.5 px-3 text-xs text-slate-400 font-semibold uppercase tracking-wide">Total Interest</th>
            <th className="text-right py-2.5 pl-3 text-xs text-slate-400 font-semibold uppercase tracking-wide">Break-Even</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {scenarios.map((s, i) => (
            <tr key={s.label} className={i === 0 ? 'text-slate-500' : 'text-slate-800 font-semibold'}>
              <td className="py-3.5 pr-4 text-xs">{s.label}</td>
              <td className="py-3.5 px-3 text-right text-xs">{formatCurrency(s.monthlyPayment)}</td>
              <td className="py-3.5 px-3 text-right text-xs">{formatCurrency(s.totalInterest)}</td>
              <td className="py-3.5 pl-3 text-right text-xs">
                {s.breakEvenMonths >= 9999 ? '—' : `${s.breakEvenMonths}mo`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function RateSensitivityTable({ rows }: { rows: RateSensitivityRow[] }) {
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-sm min-w-[300px]">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-2.5 pr-4 text-xs text-slate-400 font-semibold uppercase tracking-wide">Rate</th>
            <th className="text-right py-2.5 px-3 text-xs text-slate-400 font-semibold uppercase tracking-wide">Monthly Savings</th>
            <th className="text-right py-2.5 pl-3 text-xs text-slate-400 font-semibold uppercase tracking-wide">Break-Even</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map(row => (
            <tr
              key={row.rate}
              className={row.isQuoted
                ? 'bg-indigo-50 text-indigo-900 font-semibold'
                : 'text-slate-600 hover:bg-slate-50'
              }
            >
              <td className="py-3 pr-4 text-xs">
                <span className="tabular-nums">{row.rate.toFixed(2)}%</span>
                {row.isQuoted && (
                  <span className="ml-2 text-[10px] font-bold text-indigo-500 bg-indigo-100 px-1.5 py-0.5 rounded-full">your quote</span>
                )}
              </td>
              <td className={`py-3 px-3 text-right text-xs tabular-nums ${row.monthlySavings >= 0 ? 'text-emerald-600 font-semibold' : 'text-red-500'}`}>
                {row.monthlySavings >= 0 ? '+' : ''}{formatCurrency(row.monthlySavings)}/mo
              </td>
              <td className="py-3 pl-3 text-right text-xs tabular-nums">
                {row.breakEvenMonths >= 9999 ? '—' : `${row.breakEvenMonths}mo`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function PaidResults({ analysis }: { analysis: MortgageAnalysis }) {
  const [pdfLoading, setPdfLoading] = useState(false)
  const stayYears = analysis.inputs.stayYears ?? 7

  async function handleDownloadPdf() {
    setPdfLoading(true)
    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(analysis),
      })
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'refinance-analysis.pdf'
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setPdfLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Recommendation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Our Recommendation</p>
        <RecommendationBadge rec={analysis.recommendation} />
        <p className="text-sm text-slate-600 leading-relaxed">{analysis.recommendationReason}</p>
      </div>

      {/* Key metrics grid */}
      <div className="grid grid-cols-2 gap-4">
        <MetricCard
          label="Monthly Savings"
          value={formatCurrency(analysis.breakEven.monthlyDifference)}
          sub="per month"
          accent
        />
        <MetricCard
          label="Break-Even"
          value={analysis.breakEven.breakEvenMonths >= 9999 ? 'Never' : `${analysis.breakEven.breakEvenMonths}mo`}
          sub={
            analysis.breakEven.breakEvenMonths < 9999
              ? `${(analysis.breakEven.breakEvenMonths / 12).toFixed(1)} years`
              : 'costs unrecoverable'
          }
        />
        <MetricCard
          label={`Net Benefit at ${stayYears} Years`}
          value={formatCurrency(analysis.stayYearsNetBenefit)}
          sub={`your planned stay duration`}
          accent={analysis.stayYearsNetBenefit >= 0}
        />
        <MetricCard
          label="Total Interest Saved"
          value={formatCurrency(analysis.totalInterestSaved)}
          sub="over life of loan"
        />
      </div>

      {/* PMI analysis */}
      {analysis.pmiAnalysis && (
        <div className={`rounded-2xl border p-5 shadow-sm ${analysis.pmiAnalysis.requiresPmi ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}`}>
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${analysis.pmiAnalysis.requiresPmi ? 'bg-amber-100' : 'bg-emerald-100'}`}>
              <svg className={`w-4 h-4 ${analysis.pmiAnalysis.requiresPmi ? 'text-amber-600' : 'text-emerald-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                {analysis.pmiAnalysis.requiresPmi
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                }
              </svg>
            </div>
            <div>
              <p className={`text-sm font-semibold mb-1 ${analysis.pmiAnalysis.requiresPmi ? 'text-amber-800' : 'text-emerald-800'}`}>
                PMI Analysis · {analysis.pmiAnalysis.currentLtv}% LTV
              </p>
              {analysis.pmiAnalysis.requiresPmi ? (
                <p className="text-xs text-amber-700 leading-relaxed">
                  Your loan-to-value ratio is above 80%, so PMI will likely apply to the new loan — estimated <strong>{formatCurrency(analysis.pmiAnalysis.estimatedMonthlyPmi)}/mo</strong> (based on ~0.8% annual rate). Factor this into your monthly savings figure.
                </p>
              ) : (
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Your loan-to-value ratio is {analysis.pmiAnalysis.currentLtv}% — below 80%, so no PMI will be required on the new loan.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Rate sensitivity */}
      {analysis.rateSensitivity.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-slate-800">Rate Sensitivity</h3>
            <p className="text-xs text-slate-400 mt-0.5">How your savings change if the rate you lock differs from your quote</p>
          </div>
          <RateSensitivityTable rows={analysis.rateSensitivity} />
        </div>
      )}

      {/* Scenario comparison */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-800 mb-5">Scenario Comparison</h3>
        <ScenarioTable scenarios={analysis.scenarios} />
      </div>

      {/* PDF download */}
      <button
        onClick={handleDownloadPdf}
        disabled={pdfLoading}
        className="w-full flex items-center justify-center gap-2.5 border border-slate-200 rounded-2xl py-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 active:bg-slate-100 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
      >
        <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        {pdfLoading ? 'Generating PDF…' : 'Download PDF Summary'}
      </button>
    </div>
  )
}
