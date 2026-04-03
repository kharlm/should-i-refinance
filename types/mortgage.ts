export interface MortgageInputs {
  currentRate: number       // e.g. 6.5 (percent)
  newRate: number           // e.g. 5.75 (percent)
  loanBalance: number       // remaining principal in dollars
  closingCosts: number      // estimated closing costs in dollars
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

export interface MortgageAnalysis {
  inputs: FullAnalysisInputs
  breakEven: BreakEvenResult
  recommendation: Recommendation
  recommendationReason: string
  totalInterestSaved: number
  netBenefitAfterClosing: number
  lifetimeSavings: number
  scenarios: ScenarioResult[]   // current vs new (30yr) vs new (15yr if applicable)
}
