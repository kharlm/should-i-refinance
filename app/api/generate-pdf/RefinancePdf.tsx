import React from 'react'
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'
import type { MortgageAnalysis } from '@/types/mortgage'

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

const c = {
  navy: '#0f172a',
  indigo: '#4f46e5',
  indigo100: '#e0e7ff',
  slate600: '#475569',
  slate500: '#64748b',
  slate400: '#94a3b8',
  slate200: '#e2e8f0',
  slate50: '#f8fafc',
  emerald: '#059669',
  emerald50: '#ecfdf5',
  emerald200: '#a7f3d0',
  red: '#dc2626',
  amber: '#d97706',
  amber50: '#fffbeb',
  amber200: '#fde68a',
  white: '#ffffff',
}

const s = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 10, color: c.navy, padding: 44, backgroundColor: c.white },
  // Header
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, paddingBottom: 18, borderBottomWidth: 1, borderBottomColor: c.slate200 },
  logoBox: { width: 30, height: 30, backgroundColor: c.indigo, borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  logoText: { color: c.white, fontFamily: 'Helvetica-Bold', fontSize: 13 },
  headerTitle: { fontFamily: 'Helvetica-Bold', fontSize: 13, color: c.navy },
  headerSub: { fontSize: 9, color: c.slate400, marginTop: 2 },
  // Sections
  section: { marginBottom: 18 },
  sectionTitle: { fontFamily: 'Helvetica-Bold', fontSize: 10, color: c.navy, marginBottom: 8 },
  sectionSub: { fontSize: 8, color: c.slate400, marginBottom: 8 },
  // Recommendation
  recBox: { backgroundColor: c.slate50, borderRadius: 8, padding: 14, marginBottom: 18 },
  recLabel: { fontSize: 8, color: c.slate400, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 5 },
  recValue: { fontFamily: 'Helvetica-Bold', fontSize: 16, marginBottom: 5 },
  recReason: { fontSize: 9, color: c.slate600, lineHeight: 1.5 },
  // Metrics
  metricsRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  metricCard: { flex: 1, borderWidth: 1, borderColor: c.slate200, borderRadius: 7, padding: 10, backgroundColor: c.white },
  metricLabel: { fontSize: 8, color: c.slate400, marginBottom: 3 },
  metricValue: { fontFamily: 'Helvetica-Bold', fontSize: 13, color: c.navy },
  metricSub: { fontSize: 7, color: c.slate400, marginTop: 2 },
  // Table
  tableContainer: { borderWidth: 1, borderColor: c.slate200, borderRadius: 7, marginBottom: 18, overflow: 'hidden' },
  tableHeader: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: c.slate200, backgroundColor: c.slate50, paddingHorizontal: 10, paddingVertical: 7 },
  tableHeaderCell: { fontSize: 7, color: c.slate400, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 0.5 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: c.slate200, paddingHorizontal: 10, paddingVertical: 8 },
  tableRowLast: { flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 8 },
  tableRowHighlight: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: c.slate200, paddingHorizontal: 10, paddingVertical: 8, backgroundColor: c.indigo100 },
  tableCell: { fontSize: 9, color: c.slate600 },
  tableCellBold: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: c.navy },
  tableCellGreen: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: c.emerald },
  col1: { flex: 2 },
  col2: { flex: 1.5, textAlign: 'right' },
  col3: { flex: 1.5, textAlign: 'right' },
  col4: { flex: 1, textAlign: 'right' },
  // PMI
  pmiBox: { borderRadius: 7, padding: 12, marginBottom: 18 },
  pmiTitle: { fontFamily: 'Helvetica-Bold', fontSize: 9, marginBottom: 4 },
  pmiText: { fontSize: 9, lineHeight: 1.5 },
  // Disclaimer
  disclaimer: { borderTopWidth: 1, borderTopColor: c.slate200, paddingTop: 14, marginTop: 4 },
  disclaimerText: { fontSize: 7.5, color: c.slate400, textAlign: 'center', lineHeight: 1.6 },
})

function recColor(rec: MortgageAnalysis['recommendation']) {
  return rec === 'yes' ? c.emerald : rec === 'no' ? c.red : c.amber
}

function recLabel(rec: MortgageAnalysis['recommendation']) {
  return rec === 'yes' ? 'YES — REFINANCE' : rec === 'no' ? "NO — DON'T REFINANCE" : 'WAIT — FOR BETTER RATES'
}

export default function RefinancePdf({ analysis }: { analysis: MortgageAnalysis }) {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const stayYears = analysis.inputs.stayYears ?? 7

  return (
    <Document title="Refinance Analysis — Should I Refinance" author="Should I Refinance">
      <Page size="A4" style={s.page}>

        {/* Header */}
        <View style={s.header}>
          <View style={s.logoBox}><Text style={s.logoText}>$</Text></View>
          <View>
            <Text style={s.headerTitle}>Should I Refinance</Text>
            <Text style={s.headerSub}>Personalized Refinance Analysis · {date}</Text>
          </View>
        </View>

        {/* Recommendation */}
        <View style={s.recBox}>
          <Text style={s.recLabel}>Recommendation</Text>
          <Text style={[s.recValue, { color: recColor(analysis.recommendation) }]}>{recLabel(analysis.recommendation)}</Text>
          <Text style={s.recReason}>{analysis.recommendationReason}</Text>
        </View>

        {/* Metrics row 1 */}
        <View style={s.metricsRow}>
          <View style={s.metricCard}>
            <Text style={s.metricLabel}>Monthly Savings</Text>
            <Text style={[s.metricValue, { color: c.emerald }]}>{formatCurrency(analysis.breakEven.monthlyDifference)}</Text>
            <Text style={s.metricSub}>per month</Text>
          </View>
          <View style={s.metricCard}>
            <Text style={s.metricLabel}>Break-Even</Text>
            <Text style={s.metricValue}>{analysis.breakEven.breakEvenMonths >= 9999 ? 'Never' : `${analysis.breakEven.breakEvenMonths} months`}</Text>
            <Text style={s.metricSub}>{analysis.breakEven.breakEvenMonths < 9999 ? `${(analysis.breakEven.breakEvenMonths / 12).toFixed(1)} years` : 'unrecoverable'}</Text>
          </View>
        </View>

        {/* Metrics row 2 */}
        <View style={s.metricsRow}>
          <View style={s.metricCard}>
            <Text style={s.metricLabel}>Net Benefit at {stayYears} Years</Text>
            <Text style={[s.metricValue, { color: analysis.stayYearsNetBenefit >= 0 ? c.emerald : c.red }]}>
              {formatCurrency(analysis.stayYearsNetBenefit)}
            </Text>
            <Text style={s.metricSub}>your planned stay duration</Text>
          </View>
          <View style={s.metricCard}>
            <Text style={s.metricLabel}>Total Interest Saved</Text>
            <Text style={s.metricValue}>{formatCurrency(analysis.totalInterestSaved)}</Text>
            <Text style={s.metricSub}>over life of loan</Text>
          </View>
        </View>

        {/* PMI analysis */}
        {analysis.pmiAnalysis && (
          <View style={[s.pmiBox, {
            backgroundColor: analysis.pmiAnalysis.requiresPmi ? c.amber50 : c.emerald50,
            borderWidth: 1,
            borderColor: analysis.pmiAnalysis.requiresPmi ? c.amber200 : c.emerald200,
          }]}>
            <Text style={[s.pmiTitle, { color: analysis.pmiAnalysis.requiresPmi ? c.amber : c.emerald }]}>
              PMI Analysis · {analysis.pmiAnalysis.currentLtv}% LTV
            </Text>
            {analysis.pmiAnalysis.requiresPmi ? (
              <Text style={[s.pmiText, { color: '#92400e' }]}>
                Your LTV is above 80%. PMI will likely apply to the new loan — estimated {formatCurrency(analysis.pmiAnalysis.estimatedMonthlyPmi)}/mo (~0.8% annual rate). Factor this into your monthly savings.
              </Text>
            ) : (
              <Text style={[s.pmiText, { color: '#065f46' }]}>
                Your LTV is {analysis.pmiAnalysis.currentLtv}% — below 80%, so no PMI will be required on the new loan.
              </Text>
            )}
          </View>
        )}

        {/* Rate sensitivity */}
        {analysis.rateSensitivity.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Rate Sensitivity</Text>
            <Text style={s.sectionSub}>How your savings change if the rate you lock differs from your quote</Text>
            <View style={s.tableContainer}>
              <View style={s.tableHeader}>
                <Text style={[s.tableHeaderCell, s.col1]}>Rate</Text>
                <Text style={[s.tableHeaderCell, s.col2]}>Monthly Savings</Text>
                <Text style={[s.tableHeaderCell, s.col4]}>Break-Even</Text>
              </View>
              {analysis.rateSensitivity.map((row, i) => {
                const isLast = i === analysis.rateSensitivity.length - 1
                const rowStyle = row.isQuoted ? s.tableRowHighlight : isLast ? s.tableRowLast : s.tableRow
                return (
                  <View key={row.rate} style={rowStyle}>
                    <Text style={[row.isQuoted ? s.tableCellBold : s.tableCell, s.col1]}>
                      {row.rate.toFixed(2)}%{row.isQuoted ? ' (your quote)' : ''}
                    </Text>
                    <Text style={[row.monthlySavings >= 0 ? s.tableCellGreen : s.tableCell, s.col2]}>
                      {row.monthlySavings >= 0 ? '+' : ''}{formatCurrency(row.monthlySavings)}/mo
                    </Text>
                    <Text style={[s.tableCell, s.col4]}>
                      {row.breakEvenMonths >= 9999 ? '—' : `${row.breakEvenMonths}mo`}
                    </Text>
                  </View>
                )
              })}
            </View>
          </View>
        )}

        {/* Scenario comparison */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Scenario Comparison</Text>
          <View style={s.tableContainer}>
            <View style={s.tableHeader}>
              <Text style={[s.tableHeaderCell, s.col1]}>Scenario</Text>
              <Text style={[s.tableHeaderCell, s.col2]}>Monthly</Text>
              <Text style={[s.tableHeaderCell, s.col3]}>Total Interest</Text>
              <Text style={[s.tableHeaderCell, s.col4]}>Break-Even</Text>
            </View>
            {analysis.scenarios.map((sc, i) => {
              const isLast = i === analysis.scenarios.length - 1
              return (
                <View key={sc.label} style={isLast ? s.tableRowLast : s.tableRow}>
                  <Text style={[i === 0 ? s.tableCell : s.tableCellBold, s.col1]}>{sc.label}</Text>
                  <Text style={[i === 0 ? s.tableCell : s.tableCellBold, s.col2]}>{formatCurrency(sc.monthlyPayment)}/mo</Text>
                  <Text style={[i === 0 ? s.tableCell : s.tableCellBold, s.col3]}>{formatCurrency(sc.totalInterest)}</Text>
                  <Text style={[i === 0 ? s.tableCell : s.tableCellBold, s.col4]}>{sc.breakEvenMonths >= 9999 ? '—' : `${sc.breakEvenMonths}mo`}</Text>
                </View>
              )
            })}
          </View>
        </View>

        {/* Disclaimer */}
        <View style={s.disclaimer}>
          <Text style={s.disclaimerText}>
            This report is for informational purposes only and does not constitute financial advice.{'\n'}
            Always consult a licensed mortgage professional before making refinancing decisions.
          </Text>
        </View>

      </Page>
    </Document>
  )
}
