import { ImageResponse } from 'next/og'

export const alt = 'Should I Refinance? — Free Mortgage Refinance Calculator'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: '#0f172a',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Left: branding + headline */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', gap: 0 }}>
          {/* Logo badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 36 }}>
            <div
              style={{
                width: 52,
                height: 52,
                backgroundColor: '#4f46e5',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              $
            </div>
            <span style={{ color: '#94a3b8', fontSize: 18, fontWeight: 500 }}>calculatemyrefi.com</span>
          </div>

          {/* Headline */}
          <div
            style={{
              color: '#ffffff',
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            Should I Refinance?
          </div>

          {/* Subheadline */}
          <div style={{ color: '#94a3b8', fontSize: 26, fontWeight: 400, lineHeight: 1.4, marginBottom: 44 }}>
            Free break-even calculator for your mortgage.{'\n'}See if refinancing makes sense in seconds.
          </div>

          {/* CTA pill */}
          <div
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              backgroundColor: '#4f46e5',
              color: '#ffffff',
              fontSize: 18,
              fontWeight: 700,
              padding: '14px 28px',
              borderRadius: 40,
            }}
          >
            Try the free calculator →
          </div>
        </div>

        {/* Right: metric cards */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 16,
            width: 320,
            marginLeft: 72,
          }}
        >
          {[
            { label: 'Monthly Savings', value: '$312', sub: 'per month', accent: '#10b981' },
            { label: 'Break-Even', value: '19 months', sub: '1.6 years', accent: '#ffffff' },
            { label: 'Total Interest Saved', value: '$47,200', sub: 'over life of loan', accent: '#ffffff' },
          ].map(card => (
            <div
              key={card.label}
              style={{
                backgroundColor: '#1e293b',
                borderRadius: 16,
                padding: '20px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <div style={{ color: '#64748b', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                {card.label}
              </div>
              <div style={{ color: card.accent, fontSize: 28, fontWeight: 800 }}>{card.value}</div>
              <div style={{ color: '#475569', fontSize: 13 }}>{card.sub}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
