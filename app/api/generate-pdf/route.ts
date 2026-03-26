import { NextRequest, NextResponse } from 'next/server'
import { verifyAnalysis, COOKIE_NAME } from '@/lib/session'
import type { MortgageAnalysis } from '@/types/mortgage'

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function generateHtml(analysis: MortgageAnalysis): string {
  const rec = analysis.recommendation.toUpperCase()
  const recColor = analysis.recommendation === 'yes' ? '#059669' : analysis.recommendation === 'no' ? '#dc2626' : '#d97706'

  const scenarioRows = analysis.scenarios.map(s => `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;">${s.label}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;text-align:right;">${formatCurrency(s.monthlyPayment)}/mo</td>
      <td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;text-align:right;">${formatCurrency(s.totalInterest)}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #f1f5f9;text-align:right;">${s.breakEvenMonths >= 9999 ? '—' : s.breakEvenMonths + ' mo'}</td>
    </tr>
  `).join('')

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Refinance Analysis</title></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1e293b;max-width:700px;margin:0 auto;padding:40px 24px;">
  <div style="display:flex;align-items:center;gap:12px;margin-bottom:32px;padding-bottom:24px;border-bottom:2px solid #e2e8f0;">
    <div style="width:36px;height:36px;background:#2563eb;border-radius:8px;display:flex;align-items:center;justify-content:center;">
      <span style="color:white;font-weight:bold;font-size:16px;">$</span>
    </div>
    <div>
      <h1 style="margin:0;font-size:18px;font-weight:700;">Should I Refinance</h1>
      <p style="margin:0;font-size:12px;color:#64748b;">Personalized Refinance Analysis · ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    </div>
  </div>

  <div style="background:#f8fafc;border-radius:12px;padding:20px;margin-bottom:24px;">
    <p style="margin:0 0 8px;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:.05em;">Recommendation</p>
    <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:${recColor};">${rec}</p>
    <p style="margin:0;font-size:13px;color:#475569;line-height:1.5;">${analysis.recommendationReason}</p>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px;">
    <div style="background:white;border:1px solid #e2e8f0;border-radius:10px;padding:16px;">
      <p style="margin:0 0 4px;font-size:11px;color:#64748b;">Monthly Savings</p>
      <p style="margin:0;font-size:20px;font-weight:700;color:#059669;">${formatCurrency(analysis.breakEven.monthlyDifference)}/mo</p>
    </div>
    <div style="background:white;border:1px solid #e2e8f0;border-radius:10px;padding:16px;">
      <p style="margin:0 0 4px;font-size:11px;color:#64748b;">Break-Even</p>
      <p style="margin:0;font-size:20px;font-weight:700;color:#1e293b;">${analysis.breakEven.breakEvenMonths >= 9999 ? 'Never' : analysis.breakEven.breakEvenMonths + ' months'}</p>
    </div>
    <div style="background:white;border:1px solid #e2e8f0;border-radius:10px;padding:16px;">
      <p style="margin:0 0 4px;font-size:11px;color:#64748b;">Total Interest Saved</p>
      <p style="margin:0;font-size:20px;font-weight:700;color:#1e293b;">${formatCurrency(analysis.totalInterestSaved)}</p>
    </div>
    <div style="background:white;border:1px solid #e2e8f0;border-radius:10px;padding:16px;">
      <p style="margin:0 0 4px;font-size:11px;color:#64748b;">Net Benefit</p>
      <p style="margin:0;font-size:20px;font-weight:700;color:${analysis.netBenefitAfterClosing >= 0 ? '#059669' : '#dc2626'};">${formatCurrency(analysis.netBenefitAfterClosing)}</p>
    </div>
  </div>

  <div style="background:white;border:1px solid #e2e8f0;border-radius:10px;padding:20px;margin-bottom:24px;">
    <h2 style="margin:0 0 16px;font-size:14px;font-weight:600;">Scenario Comparison</h2>
    <table style="width:100%;border-collapse:collapse;font-size:13px;">
      <thead>
        <tr style="border-bottom:2px solid #e2e8f0;">
          <th style="padding:8px 12px;text-align:left;color:#64748b;font-weight:500;">Scenario</th>
          <th style="padding:8px 12px;text-align:right;color:#64748b;font-weight:500;">Monthly</th>
          <th style="padding:8px 12px;text-align:right;color:#64748b;font-weight:500;">Total Interest</th>
          <th style="padding:8px 12px;text-align:right;color:#64748b;font-weight:500;">Break-Even</th>
        </tr>
      </thead>
      <tbody>${scenarioRows}</tbody>
    </table>
  </div>

  <div style="background:white;border:1px solid #e2e8f0;border-radius:10px;padding:20px;margin-bottom:32px;">
    <h2 style="margin:0 0 8px;font-size:14px;font-weight:600;">Should You Wait?</h2>
    <p style="margin:0 0 6px;font-size:13px;color:#475569;">${analysis.shouldWait.reason}</p>
    <p style="margin:0;font-size:12px;color:#94a3b8;font-style:italic;">${analysis.shouldWait.currentRateContext}</p>
  </div>

  <p style="font-size:11px;color:#94a3b8;text-align:center;border-top:1px solid #e2e8f0;padding-top:20px;">
    This report is for informational purposes only and does not constitute financial advice.<br>
    Always consult a licensed mortgage professional before making refinancing decisions.
  </p>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const verified = await verifyAnalysis(token)
  if (!verified) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
  }

  const analysis: MortgageAnalysis = await req.json()

  const html = generateHtml(analysis)
  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
      'Content-Disposition': 'attachment; filename="refinance-analysis.html"',
    },
  })
}
