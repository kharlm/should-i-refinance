import type {
  MortgageInputs,
  FullAnalysisInputs,
  BreakEvenResult,
  MortgageAnalysis,
  Recommendation,
  ScenarioResult,
} from '@/types/mortgage'

// Monthly payment formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
export function monthlyPayment(principal: number, annualRatePercent: number, termMonths: number): number {
  if (annualRatePercent === 0) return principal / termMonths
  const r = annualRatePercent / 100 / 12
  const n = termMonths
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

export function totalInterest(principal: number, annualRatePercent: number, termMonths: number): number {
  const monthly = monthlyPayment(principal, annualRatePercent, termMonths)
  return monthly * termMonths - principal
}

export function calculateBreakEven(inputs: MortgageInputs): BreakEvenResult {
  const { currentRate, newRate, loanBalance, closingCosts } = inputs

  // Use 30yr as default remaining term for free tier
  const termMonths = 360

  const currentMonthlyPayment = monthlyPayment(loanBalance, currentRate, termMonths)
  const newMonthlyPayment = monthlyPayment(loanBalance, newRate, termMonths)
  const monthlyDifference = currentMonthlyPayment - newMonthlyPayment

  const breakEvenMonths = monthlyDifference > 0
    ? Math.ceil(closingCosts / monthlyDifference)
    : Infinity

  return {
    currentMonthlyPayment,
    newMonthlyPayment,
    monthlyDifference,
    breakEvenMonths: breakEvenMonths === Infinity ? 9999 : breakEvenMonths,
    breakEvenYears: breakEvenMonths === Infinity ? 9999 : breakEvenMonths / 12,
  }
}

function buildScenario(
  label: string,
  balance: number,
  rate: number,
  termMonths: number,
  closingCosts: number,
  currentMonthlyPayment: number,
): ScenarioResult {
  const monthly = monthlyPayment(balance, rate, termMonths)
  const interest = totalInterest(balance, rate, termMonths)
  const monthlySavings = currentMonthlyPayment - monthly
  const breakEven = monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : 9999

  return {
    label,
    termMonths,
    monthlyPayment: monthly,
    totalInterest: interest,
    totalCost: balance + interest,
    breakEvenMonths: breakEven,
  }
}

function getRecommendation(
  monthlyDiff: number,
  breakEvenMonths: number,
  rateDropPercent: number,
): { recommendation: Recommendation; reason: string } {
  if (monthlyDiff <= 0) {
    return {
      recommendation: 'no',
      reason: 'The new rate would increase your monthly payment. Refinancing does not make financial sense right now.',
    }
  }

  if (rateDropPercent < 0.5) {
    return {
      recommendation: 'wait',
      reason: `Your rate would only drop by ${rateDropPercent.toFixed(2)}%. The savings are minimal and may not justify closing costs. Consider waiting for rates to fall further.`,
    }
  }

  if (breakEvenMonths > 84) {
    return {
      recommendation: 'wait',
      reason: `Your break-even point is ${Math.round(breakEvenMonths / 12)} years away. Unless you plan to stay in the home that long, refinancing may not benefit you.`,
    }
  }

  if (breakEvenMonths <= 24) {
    return {
      recommendation: 'yes',
      reason: `You'll recover your closing costs in just ${breakEvenMonths} months and save significantly over the life of your loan.`,
    }
  }

  return {
    recommendation: 'yes',
    reason: `You'll break even in ${breakEvenMonths} months (${(breakEvenMonths / 12).toFixed(1)} years) and come out ahead after that. Refinancing makes sense if you plan to stay in the home.`,
  }
}

// Rate trend context — updated quarterly, last updated Q1 2025
const RATE_CONTEXT = {
  thirtyYearAvg: 6.65,
  trend: 'declining' as const,
  note: 'Rates have been gradually declining from 2024 highs as inflation cools.',
}

function getShouldWait(newRate: number, rateDropPercent: number) {
  const belowAverage = newRate < RATE_CONTEXT.thirtyYearAvg
  const smallDrop = rateDropPercent < 0.75

  if (smallDrop && RATE_CONTEXT.trend === 'declining') {
    return {
      verdict: true,
      reason: 'Rates are trending downward. Waiting 3–6 months could yield a better rate and higher savings.',
      currentRateContext: `The current 30-year average is around ${RATE_CONTEXT.thirtyYearAvg}%. ${RATE_CONTEXT.note}`,
    }
  }

  if (belowAverage) {
    return {
      verdict: false,
      reason: `Your offered rate of ${newRate}% is already below the current national average of ${RATE_CONTEXT.thirtyYearAvg}%. This is a favorable rate — waiting risks rates moving back up.`,
      currentRateContext: `The current 30-year average is around ${RATE_CONTEXT.thirtyYearAvg}%. ${RATE_CONTEXT.note}`,
    }
  }

  return {
    verdict: false,
    reason: 'Rate forecasting is uncertain. If the numbers work for you today, acting sooner locks in your savings.',
    currentRateContext: `The current 30-year average is around ${RATE_CONTEXT.thirtyYearAvg}%. ${RATE_CONTEXT.note}`,
  }
}

export function calculateFullAnalysis(inputs: FullAnalysisInputs): MortgageAnalysis {
  const { currentRate, newRate, loanBalance, closingCosts, remainingTermMonths, newTermMonths } = inputs

  const breakEven = calculateBreakEven({ currentRate, newRate, loanBalance, closingCosts })

  const currentMonthly = monthlyPayment(loanBalance, currentRate, remainingTermMonths)
  const currentTotalInterest = totalInterest(loanBalance, currentRate, remainingTermMonths)

  const newTotalInterest30 = totalInterest(loanBalance, newRate, newTermMonths)
  const totalInterestSaved = currentTotalInterest - newTotalInterest30
  const netBenefitAfterClosing = totalInterestSaved - closingCosts

  const rateDropPercent = currentRate - newRate
  const { recommendation, reason } = getRecommendation(
    breakEven.monthlyDifference,
    breakEven.breakEvenMonths,
    rateDropPercent,
  )

  const scenarios: ScenarioResult[] = [
    buildScenario('Current Loan', loanBalance, currentRate, remainingTermMonths, 0, currentMonthly),
    buildScenario(`${newTermMonths / 12}-Year Refinance`, loanBalance, newRate, newTermMonths, closingCosts, currentMonthly),
  ]

  // Add 15yr comparison if new term is 30yr
  if (newTermMonths === 360) {
    scenarios.push(
      buildScenario('15-Year Refinance', loanBalance, newRate, 180, closingCosts, currentMonthly),
    )
  }

  return {
    inputs,
    breakEven,
    recommendation,
    recommendationReason: reason,
    totalInterestSaved,
    netBenefitAfterClosing,
    lifetimeSavings: netBenefitAfterClosing,
    scenarios,
    shouldWait: getShouldWait(newRate, rateDropPercent),
  }
}
