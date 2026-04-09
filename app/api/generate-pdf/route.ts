import { NextRequest, NextResponse } from 'next/server'
import React from 'react'
import { renderToBuffer } from '@react-pdf/renderer'
import { verifyAnalysis, COOKIE_NAME } from '@/lib/session'
import RefinancePdf from './RefinancePdf'
import type { MortgageAnalysis } from '@/types/mortgage'

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

  const buffer = await renderToBuffer(React.createElement(RefinancePdf, { analysis }))

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="refinance-analysis.pdf"',
    },
  })
}
