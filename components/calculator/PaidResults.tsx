'use client'

import { useState } from 'react'
import type { MortgageAnalysis } from '@/types/mortgage'

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function RecommendationBadge({ rec }: { rec: MortgageAnalysis['recommendation'] }) {
  const config = {
    yes: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', label: 'Yes, Refinance' },
    no: { bg: 'bg-red-50 border-red-200', text: 'text-red-700', label: "No, Don't Refinance" },
    wait: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', label: 'Wait for Better Rates' },
  }[rec]

  return (
    <span className={`inline-block text-sm font-semibold px-3 py-1 rounded-full border ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  )
}

function ScenarioTable({ scenarios }: { scenarios: MortgageAnalysis['scenarios'] }) {
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-2 pr-4 text-xs text-slate-500 font-medium">Scenario</th>
            <th className="text-right py-2 px-3 text-xs text-slate-500 font-medium">Monthly</th>
            <th className="text-right py-2 px-3 text-xs text-slate-500 font-medium">Total Interest</th>
            <th className="text-right py-2 pl-3 text-xs text-slate-500 font-medium">Break-Even</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {scenarios.map((s, i) => (
            <tr key={s.label} className={i === 0 ? 'text-slate-500' : 'text-slate-800 font-medium'}>
              <td className="py-3 pr-4 text-xs">{s.label}</td>
              <td className="py-3 px-3 text-right text-xs">{formatCurrency(s.monthlyPayment)}</td>
              <td className="py-3 px-3 text-right text-xs">{formatCurrency(s.totalInterest)}</td>
              <td className="py-3 pl-3 text-right text-xs">
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
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Our Recommendation</p>
        <RecommendationBadge rec={analysis.recommendation} />
        <p className="text-sm text-slate-600 leading-relaxed">{analysis.recommendationReason}</p>
      </div>

      {/* Key numbers */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Monthly Savings</p>
          <p className="text-xl font-bold text-emerald-600">
            {formatCurrency(analysis.breakEven.monthlyDifference)}
          </p>
          <p className="text-xs text-slate-400">per month</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Break-Even</p>
          <p className="text-xl font-bold text-slate-700">
            {analysis.breakEven.breakEvenMonths >= 9999 ? 'Never' : `${analysis.breakEven.breakEvenMonths}mo`}
          </p>
          <p className="text-xs text-slate-400">
            {analysis.breakEven.breakEvenMonths < 9999
              ? `${(analysis.breakEven.breakEvenMonths / 12).toFixed(1)} years`
              : 'costs unrecoverable'}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Total Interest Saved</p>
          <p className="text-xl font-bold text-slate-700">{formatCurrency(analysis.totalInterestSaved)}</p>
          <p className="text-xs text-slate-400">over life of loan</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Net Benefit</p>
          <p className={`text-xl font-bold ${analysis.netBenefitAfterClosing >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            {formatCurrency(analysis.netBenefitAfterClosing)}
          </p>
          <p className="text-xs text-slate-400">after closing costs</p>
        </div>
      </div>

      {/* Scenario comparison */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Scenario Comparison</h3>
        <ScenarioTable scenarios={analysis.scenarios} />
      </div>

      {/* Should I wait */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-2">
        <h3 className="text-sm font-semibold text-slate-800">Should You Wait for Lower Rates?</h3>
        <div className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${
          analysis.shouldWait.verdict
            ? 'bg-amber-50 text-amber-700 border border-amber-200'
            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
        }`}>
          {analysis.shouldWait.verdict ? 'Consider Waiting' : "Don't Wait"}
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">{analysis.shouldWait.reason}</p>
        <p className="text-xs text-slate-400 italic">{analysis.shouldWait.currentRateContext}</p>
      </div>

      {/* PDF download */}
      <button
        onClick={handleDownloadPdf}
        disabled={pdfLoading}
        className="w-full flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-3.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-60"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        {pdfLoading ? 'Generating PDF…' : 'Download PDF Summary'}
      </button>
    </div>
  )
}
