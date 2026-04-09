import React from 'react'
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'
import type { MortgageAnalysis } from '@/types/mortgage'

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

const colors = {
  navy: '#0f172a',
  indigo: '#4f46e5',
  slate600: '#475569',
  slate400: '#94a3b8',
  slate200: '#e2e8f0',
  slate50: '#f8fafc',
  emerald: '#059669',
  red: '#dc2626',
  amber: '#d97706',
  white: '#ffffff',
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: colors.navy,
    padding: 48,
    backgroundColor: colors.white,
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate200,
  },
  logoBox: {
    width: 32,
    height: 32,
    backgroundColor: colors.indigo,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  logoText: {
    color: colors.white,
    fontFamily: 'Helvetica-Bold',
    fontSize: 14,
  },
  headerTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 14,
    color: colors.navy,
  },
  headerSub: {
    fontSize: 9,
    color: colors.slate400,
    marginTop: 2,
  },
  // Recommendation
  recBox: {
    backgroundColor: colors.slate50,
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  recLabel: {
    fontSize: 8,
    color: colors.slate400,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  recValue: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 18,
    marginBottom: 6,
  },
  recReason: {
    fontSize: 10,
    color: colors.slate600,
    lineHeight: 1.5,
  },
  // Metrics grid
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  metricCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.slate200,
    borderRadius: 8,
    padding: 12,
    backgroundColor: colors.white,
  },
  metricLabel: {
    fontSize: 8,
    color: colors.slate400,
    marginBottom: 4,
  },
  metricValue: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 14,
    color: colors.navy,
  },
  metricSub: {
    fontSize: 8,
    color: colors.slate400,
    marginTop: 2,
  },
  // Scenario table
  tableContainer: {
    borderWidth: 1,
    borderColor: colors.slate200,
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  tableTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    color: colors.navy,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate200,
    backgroundColor: colors.slate50,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.slate200,
    backgroundColor: colors.slate50,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tableHeaderCell: {
    fontSize: 8,
    color: colors.slate400,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.slate200,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  tableRowLast: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  tableCell: {
    fontSize: 10,
    color: colors.slate600,
  },
  tableCellBold: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.navy,
  },
  col1: { flex: 2 },
  col2: { flex: 1.5, textAlign: 'right' },
  col3: { flex: 1.5, textAlign: 'right' },
  col4: { flex: 1, textAlign: 'right' },
  // Disclaimer
  disclaimer: {
    borderTopWidth: 1,
    borderTopColor: colors.slate200,
    paddingTop: 16,
    marginTop: 4,
  },
  disclaimerText: {
    fontSize: 8,
    color: colors.slate400,
    textAlign: 'center',
    lineHeight: 1.6,
  },
})

function recColor(rec: MortgageAnalysis['recommendation']) {
  return rec === 'yes' ? colors.emerald : rec === 'no' ? colors.red : colors.amber
}

function recLabel(rec: MortgageAnalysis['recommendation']) {
  return rec === 'yes' ? 'YES — REFINANCE' : rec === 'no' ? "NO — DON'T REFINANCE" : 'WAIT — FOR BETTER RATES'
}

export default function RefinancePdf({ analysis }: { analysis: MortgageAnalysis }) {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <Document title="Refinance Analysis — Should I Refinance" author="Should I Refinance">
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>$</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>Should I Refinance</Text>
            <Text style={styles.headerSub}>Personalized Refinance Analysis · {date}</Text>
          </View>
        </View>

        {/* Recommendation */}
        <View style={styles.recBox}>
          <Text style={styles.recLabel}>Recommendation</Text>
          <Text style={[styles.recValue, { color: recColor(analysis.recommendation) }]}>
            {recLabel(analysis.recommendation)}
          </Text>
          <Text style={styles.recReason}>{analysis.recommendationReason}</Text>
        </View>

        {/* Metrics — row 1 */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Monthly Savings</Text>
            <Text style={[styles.metricValue, { color: colors.emerald }]}>
              {formatCurrency(analysis.breakEven.monthlyDifference)}
            </Text>
            <Text style={styles.metricSub}>per month</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Break-Even</Text>
            <Text style={styles.metricValue}>
              {analysis.breakEven.breakEvenMonths >= 9999
                ? 'Never'
                : `${analysis.breakEven.breakEvenMonths} months`}
            </Text>
            <Text style={styles.metricSub}>
              {analysis.breakEven.breakEvenMonths < 9999
                ? `${(analysis.breakEven.breakEvenMonths / 12).toFixed(1)} years`
                : 'costs unrecoverable'}
            </Text>
          </View>
        </View>

        {/* Metrics — row 2 */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Total Interest Saved</Text>
            <Text style={styles.metricValue}>{formatCurrency(analysis.totalInterestSaved)}</Text>
            <Text style={styles.metricSub}>over life of loan</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Net Benefit</Text>
            <Text style={[styles.metricValue, {
              color: analysis.netBenefitAfterClosing >= 0 ? colors.emerald : colors.red,
            }]}>
              {formatCurrency(analysis.netBenefitAfterClosing)}
            </Text>
            <Text style={styles.metricSub}>after closing costs</Text>
          </View>
        </View>

        {/* Scenario table */}
        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Scenario Comparison</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.col1]}>Scenario</Text>
            <Text style={[styles.tableHeaderCell, styles.col2]}>Monthly</Text>
            <Text style={[styles.tableHeaderCell, styles.col3]}>Total Interest</Text>
            <Text style={[styles.tableHeaderCell, styles.col4]}>Break-Even</Text>
          </View>
          {analysis.scenarios.map((s, i) => {
            const isLast = i === analysis.scenarios.length - 1
            const rowStyle = isLast ? styles.tableRowLast : styles.tableRow
            const cellStyle = i === 0 ? styles.tableCell : styles.tableCellBold
            return (
              <View key={s.label} style={rowStyle}>
                <Text style={[cellStyle, styles.col1]}>{s.label}</Text>
                <Text style={[cellStyle, styles.col2]}>{formatCurrency(s.monthlyPayment)}/mo</Text>
                <Text style={[cellStyle, styles.col3]}>{formatCurrency(s.totalInterest)}</Text>
                <Text style={[cellStyle, styles.col4]}>
                  {s.breakEvenMonths >= 9999 ? '—' : `${s.breakEvenMonths}mo`}
                </Text>
              </View>
            )
          })}
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            This report is for informational purposes only and does not constitute financial advice.{'\n'}
            Always consult a licensed mortgage professional before making refinancing decisions.
          </Text>
        </View>

      </Page>
    </Document>
  )
}
