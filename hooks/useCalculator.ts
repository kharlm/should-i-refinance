'use client'

import { useState, useMemo } from 'react'
import { calculateBreakEven } from '@/lib/calculations'
import type { MortgageInputs, BreakEvenResult } from '@/types/mortgage'

const DEFAULT_INPUTS: MortgageInputs = {
  currentRate: 0,
  newRate: 0,
  loanBalance: 0,
  closingCosts: 3000,
}

export function useCalculator() {
  const [inputs, setInputs] = useState<MortgageInputs>(DEFAULT_INPUTS)

  const isValid = useMemo(() => {
    return (
      inputs.currentRate > 0 &&
      inputs.newRate > 0 &&
      inputs.loanBalance > 0 &&
      inputs.closingCosts >= 0 &&
      inputs.newRate < inputs.currentRate
    )
  }, [inputs])

  const result: BreakEvenResult | null = useMemo(() => {
    if (!isValid) return null
    return calculateBreakEven(inputs)
  }, [inputs, isValid])

  function updateField(field: keyof MortgageInputs, value: number) {
    setInputs(prev => ({ ...prev, [field]: value }))
  }

  return { inputs, updateField, result, isValid }
}
