'use client'

import { useState } from 'react'
import type { MortgageAnalysis } from '@/types/mortgage'

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function RecommendationBadge({ rec }: { rec: MortgageAnalysis['recommendation'] }) {
  const config = {
    yes: {
      wrapper: 'bg-emerald-50 border-emerald-200',
      badge: 'bg-emerald-600 text-white',
      icon: 'text-emerald-600',
      label: 'Yes, Refinance',
      iconPath: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    no: {
      wrapper: 'bg-red-50 border-red-200',
      badge: 'bg-red-600 text-white',
      icon: 'text-red-600',
      label: "No, Don't Refinance",
      iconPath: 'M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    wait: {
      wrapper: 'bg-amber-50 border-amber-200',
      badge: 'bg-amber-500 text-white',
      icon: 'text-amber-600',
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
            <tr
              key={s.label}
              className={`transition-colors ${i === 0 ? 'text-slate-500' : 'text-slate-800 font-semibold'}`}
            >
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

export default function PaidResults({ analysis }: { analysis: MortgageAnalysis }) {
  const [pdfLoading, setPdfLoading] = useState(false)

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
          label="Total Interest Saved"
          value={formatCurrency(analysis.totalInterestSaved)}
          sub="over life of loan"
        />
        <MetricCard
          label="Net Benefit"
          value={formatCurrency(analysis.netBenefitAfterClosing)}
          sub="after closing costs"
          accent={analysis.netBenefitAfterClosing >= 0}
        />
      </div>

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
