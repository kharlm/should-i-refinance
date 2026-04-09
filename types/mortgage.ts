export interface MortgageInputs {
  currentRate: number       // e.g. 6.5 (percent)
  newRate: number           // e.g. 5.75 (percent)
  loanBalance: number       // remaining principal in dollars
  closingCosts: number      // estimated closing costs in dollars
  stayYears: number         // how long user plans to stay (1–20, default 7)
  homeValue?: number        // optional — used for PMI analysis
}

export interface FullAnalysisInputs extends MortgageInputs {
  remainingTermMonths: number   // e.g. 300 for 25 years left
  newTermMonths: number         // e.g. 360 for 30yr or 180 for 15yr
}

export interface BreakEvenResult {
  currentMonthlyPayment: number
  newMonthlyPayment: number
  monthlyDifference: number     // positive = savings
  breakEvenMonths: number       // months to recoup closing costs
  breakEvenYears: number
}

export type Recommendation = 'yes' | 'no' | 'wait'

export interface ScenarioResult {
  label: string                 // e.g. "30-Year Refinance"
  termMonths: number
  monthlyPayment: number
  totalInterest: number
  totalCost: number             // principal + interest
  breakEvenMonths: number
}

export interface RateSensitivityRow {
  rate: number              // the tested rate
  monthlySavings: number    // vs current payment (negative = costs more)
  breakEvenMonths: number   // 9999 if never
  isQuoted: boolean         // true for the user's actual quoted rate
}

export interface PmiAnalysis {
  currentLtv: number            // loan-to-value as percentage, e.g. 87.5
  requiresPmi: boolean          // LTV > 80%
  estimatedMonthlyPmi: number   // estimated monthly PMI cost (0 if not required)
}

export interface MortgageAnalysis {
  inputs: FullAnalysisInputs
  breakEven: BreakEvenResult
  recommendation: Recommendation
  recommendationReason: string
  totalInterestSaved: number
  netBenefitAfterClosing: number    // lifetime net benefit (30yr)
  stayYearsNetBenefit: number       // net benefit at user's planned stay duration
  lifetimeSavings: number
  scenarios: ScenarioResult[]
  rateSensitivity: RateSensitivityRow[]
  pmiAnalysis: PmiAnalysis | null   // null if no homeValue provided
}
