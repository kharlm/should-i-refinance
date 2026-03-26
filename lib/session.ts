import { SignJWT, jwtVerify } from 'jose'
import type { MortgageAnalysis } from '@/types/mortgage'

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
const COOKIE_NAME = 'refinance_session'
const EXPIRY = '24h'

export async function signAnalysis(analysis: MortgageAnalysis): Promise<string> {
  return new SignJWT({ analysis })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(EXPIRY)
    .setIssuedAt()
    .sign(secret)
}

export async function verifyAnalysis(token: string): Promise<MortgageAnalysis | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload.analysis as MortgageAnalysis
  } catch {
    return null
  }
}

export { COOKIE_NAME }
